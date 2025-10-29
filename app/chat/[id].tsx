
import { colors, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Message, Profile } from '@/types/database';
import React, { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/app/integrations/supabase/client';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatScreen() {
  const { id: conversationId } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (conversationId && user) {
      loadConversation();
      loadMessages();
      setupRealtimeSubscription();
    }
  }, [conversationId, user]);

  const loadConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (error) throw error;

      const otherUserId = data.participant1_id === user?.id ? data.participant2_id : data.participant1_id;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', otherUserId)
        .single();

      if (profileError) throw profileError;

      setOtherUser(profileData);
    } catch (error) {
      console.error('Error loading conversation:', error);
      Alert.alert('Error', 'Failed to load conversation');
    }
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
      markMessagesAsRead();
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
          if (payload.new.sender_id !== user?.id) {
            markMessagesAsRead();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markMessagesAsRead = async () => {
    if (!user) return;

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .eq('is_read', false);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const uploadFile = async (uri: string, type: 'image' | 'file'): Promise<string | null> => {
    if (!user) return null;

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${conversationId}/${user.id}/${Date.now()}.${fileExt}`;
      const bucket = type === 'image' ? 'chat-files' : 'chat-files';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, blob, {
          contentType: type === 'image' ? `image/${fileExt}` : 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'file' = 'text', fileUrl?: string, fileName?: string) => {
    if (!user || (!content.trim() && !fileUrl)) return;

    setSending(true);
    try {
      const { error } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: content || fileName || 'File',
        message_type: type,
        file_url: fileUrl,
        file_name: fileName,
      });

      if (error) throw error;

      await supabase
        .from('conversations')
        .update({
          last_message: content || fileName || 'File',
          last_message_at: new Date().toISOString(),
        })
        .eq('id', conversationId);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleSendText = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, 'text');
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to send images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        const fileUrl = await uploadFile(result.assets[0].uri, 'image');
        setUploading(false);

        if (fileUrl) {
          await sendMessage('Image', 'image', fileUrl);
        } else {
          Alert.alert('Error', 'Failed to upload image');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        const fileUrl = await uploadFile(result.assets[0].uri, 'file');
        setUploading(false);

        if (fileUrl) {
          await sendMessage(result.assets[0].name, 'file', fileUrl, result.assets[0].name);
        } else {
          Alert.alert('Error', 'Failed to upload file');
        }
      }
    } catch (error) {
      console.error('Error picking file:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: Message) => {
    const isOwn = message.sender_id === user?.id;

    return (
      <View key={message.id} style={[styles.messageContainer, isOwn && styles.ownMessageContainer]}>
        <View style={[styles.messageBubble, isOwn && styles.ownMessageBubble]}>
          {isOwn && (
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ownMessageGradient}
            >
              {message.message_type === 'image' && message.file_url ? (
                <Image source={{ uri: message.file_url }} style={styles.messageImage} />
              ) : message.message_type === 'file' && message.file_url ? (
                <View style={styles.fileContainer}>
                  <IconSymbol name="doc.fill" size={24} color="#FFFFFF" />
                  <Text style={styles.fileName}>{message.file_name || 'File'}</Text>
                </View>
              ) : (
                <Text style={styles.ownMessageText}>{message.content}</Text>
              )}
              <Text style={styles.ownMessageTime}>{formatTime(message.created_at)}</Text>
            </LinearGradient>
          )}
          {!isOwn && (
            <>
              {message.message_type === 'image' && message.file_url ? (
                <Image source={{ uri: message.file_url }} style={styles.messageImage} />
              ) : message.message_type === 'file' && message.file_url ? (
                <View style={styles.fileContainer}>
                  <IconSymbol name="doc.fill" size={24} color={colors.primary} />
                  <Text style={styles.fileNameOther}>{message.file_name || 'File'}</Text>
                </View>
              ) : (
                <Text style={styles.messageText}>{message.content}</Text>
              )}
              <Text style={styles.messageTime}>{formatTime(message.created_at)}</Text>
            </>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </Pressable>
          
          <View style={styles.headerCenter}>
            {otherUser?.avatar_url ? (
              <Image source={{ uri: otherUser.avatar_url }} style={styles.headerAvatar} />
            ) : (
              <View style={styles.headerAvatarPlaceholder}>
                <IconSymbol name="person.fill" size={20} color="#FFFFFF" />
              </View>
            )}
            <View>
              <Text style={styles.headerName}>{otherUser?.name || 'User'}</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>

          <Pressable style={styles.menuButton}>
            <IconSymbol name="ellipsis" size={24} color="#FFFFFF" />
          </Pressable>
        </LinearGradient>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          {uploading && (
            <View style={styles.uploadingIndicator}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.uploadingText}>Uploading...</Text>
            </View>
          )}
          
          <View style={styles.inputBar}>
            <Pressable onPress={handlePickImage} disabled={uploading || sending}>
              <IconSymbol name="photo.fill" size={24} color={colors.primary} />
            </Pressable>

            <Pressable onPress={handlePickFile} disabled={uploading || sending}>
              <IconSymbol name="paperclip" size={24} color={colors.primary} />
            </Pressable>

            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={1000}
              editable={!uploading && !sending}
            />

            <Pressable 
              onPress={handleSendText} 
              disabled={!newMessage.trim() || uploading || sending}
              style={styles.sendButton}
            >
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendButtonGradient}
              >
                {sending ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <IconSymbol name="arrow.up" size={20} color="#FFFFFF" />
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    padding: 12,
    backgroundColor: colors.card,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  ownMessageBubble: {
    backgroundColor: 'transparent',
  },
  ownMessageGradient: {
    borderRadius: 20,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  ownMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  ownMessageTime: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 4,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  fileName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  fileNameOther: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  uploadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  uploadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
