
import React, { useState, useEffect, useRef } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/app/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Message, Profile } from '@/types/database';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function ChatScreen() {
  const { id: conversationId } = useLocalSearchParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<Profile | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!conversationId || !user) return;

    loadConversation();
    loadMessages();
    setupRealtimeSubscription();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [conversationId, user]);

  const loadConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (error) throw error;

      // Get the other user's profile
      const otherUserId = data.participant1_id === user?.id 
        ? data.participant2_id 
        : data.participant1_id;

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

      // Mark messages as read
      await markMessagesAsRead();
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = async () => {
    if (channelRef.current?.state === 'subscribed') return;

    const channel = supabase.channel(`conversation:${conversationId}`, {
      config: { private: true },
    });

    channelRef.current = channel;

    await supabase.realtime.setAuth();

    channel
      .on('broadcast', { event: 'INSERT' }, (payload: any) => {
        console.log('New message received:', payload);
        if (payload.new) {
          setMessages((prev) => [...prev, payload.new]);
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      })
      .subscribe();
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

  const sendMessage = async (content: string, type: 'text' | 'image' | 'file' = 'text', fileUrl?: string, fileName?: string, fileSize?: number) => {
    if ((!content.trim() && type === 'text') || !user) return;

    setSending(true);
    try {
      const { error } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: content.trim() || fileName || 'File',
        message_type: type,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize,
      });

      if (error) throw error;
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleSendText = () => {
    sendMessage(inputText);
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      // In a real app, upload to Supabase Storage first
      Alert.alert('Image Selected', 'Image upload feature coming soon!');
      // sendMessage('Image', 'image', asset.uri, 'image.jpg', asset.fileSize);
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        Alert.alert('File Selected', 'File upload feature coming soon!');
        // In a real app, upload to Supabase Storage first
        // sendMessage(asset.name, 'file', asset.uri, asset.name, asset.size);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderMessage = (message: Message) => {
    const isOwn = message.sender_id === user?.id;

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isOwn ? styles.ownMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isOwn && otherUser?.avatar_url && (
          <Image source={{ uri: otherUser.avatar_url }} style={styles.avatar} />
        )}

        <View style={[styles.messageBubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
          {message.message_type === 'image' && message.file_url && (
            <Image source={{ uri: message.file_url }} style={styles.messageImage} />
          )}
          {message.message_type === 'file' && (
            <View style={styles.fileContainer}>
              <IconSymbol name="doc.fill" size={24} color={isOwn ? '#FFFFFF' : colors.primary} />
              <Text style={[styles.fileName, isOwn && styles.ownMessageText]}>
                {message.file_name}
              </Text>
            </View>
          )}
          {message.message_type === 'voice' && (
            <View style={styles.voiceContainer}>
              <IconSymbol name="waveform" size={20} color={isOwn ? '#FFFFFF' : colors.primary} />
              <Text style={[styles.voiceDuration, isOwn && styles.ownMessageText]}>
                {message.duration}s
              </Text>
            </View>
          )}
          {(message.message_type === 'text' || !message.file_url) && (
            <Text style={[styles.messageText, isOwn && styles.ownMessageText]}>
              {message.content}
            </Text>
          )}
          <Text style={[styles.messageTime, isOwn && styles.ownMessageTime]}>
            {formatTime(message.created_at)}
          </Text>
        </View>

        {isOwn && profile?.avatar_url && (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
          <View style={styles.headerCenter}>
            {otherUser?.avatar_url && (
              <Image source={{ uri: otherUser.avatar_url }} style={styles.headerAvatar} />
            )}
            <View>
              <Text style={styles.headerTitle}>{otherUser?.name || 'User'}</Text>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>
          </View>
          <Pressable style={styles.moreButton}>
            <IconSymbol name="ellipsis" size={24} color={colors.text} />
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <Pressable style={styles.attachButton} onPress={handlePickFile}>
            <IconSymbol name="paperclip" size={24} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.attachButton} onPress={handlePickImage}>
            <IconSymbol name="photo" size={24} color={colors.textSecondary} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
            editable={!sending}
          />
          <Pressable
            onPress={handleSendText}
            style={[styles.sendButton, (!inputText.trim() || sending) && styles.sendButtonDisabled]}
            disabled={!inputText.trim() || sending}
          >
            <LinearGradient
              colors={
                !inputText.trim() || sending
                  ? [colors.textSecondary, colors.textSecondary]
                  : [colors.primary, colors.secondary]
              }
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.success,
  },
  moreButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
    alignItems: 'flex-end',
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 16,
    padding: 12,
  },
  ownBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.text,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileName: {
    fontSize: 14,
    color: colors.text,
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  voiceDuration: {
    fontSize: 14,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
