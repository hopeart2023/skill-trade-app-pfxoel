
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform,
  Pressable,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { mockUsers } from "@/data/mockData";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface ChatPreview {
  id: string;
  user: typeof mockUsers[0];
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    user: mockUsers[0],
    lastMessage: 'Hey! I&apos;d love to learn React Native from you.',
    timestamp: '2m ago',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    user: mockUsers[1],
    lastMessage: 'Thanks for the design tips! Really helpful.',
    timestamp: '1h ago',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    user: mockUsers[2],
    lastMessage: 'When are you free for our next session?',
    timestamp: '3h ago',
    unread: 1,
    isOnline: true,
  },
  {
    id: '4',
    user: mockUsers[3],
    lastMessage: 'Great session today! See you next week.',
    timestamp: '1d ago',
    unread: 0,
    isOnline: false,
  },
];

export default function MessagesScreen() {
  const renderChatItem = (chat: ChatPreview) => (
    <Pressable key={chat.id} style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.user.profilePhoto }} style={styles.avatar} />
        {chat.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{chat.user.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <Pressable style={styles.composeButton}>
            <IconSymbol name="square.and.pencil" size={24} color={colors.primary} />
          </Pressable>
        </View>

        {/* AI Assistant Card */}
        <Pressable 
          style={styles.aiAssistantCard}
          onPress={() => router.push('/ai-chat')}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiAssistantGradient}
          >
            <View style={styles.aiAssistantContent}>
              <View style={styles.aiIconContainer}>
                <IconSymbol name="sparkles" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.aiTextContainer}>
                <Text style={styles.aiAssistantTitle}>AI Assistant</Text>
                <Text style={styles.aiAssistantSubtitle}>
                  Get help finding skill matches & learning paths
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </Pressable>

        {/* Chats List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {mockChats.map(renderChatItem)}

          {mockChats.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="message.fill" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>No messages yet</Text>
              <Text style={styles.emptyStateText}>
                Start a conversation with a skill trader
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  composeButton: {
    padding: 8,
  },

  // AI Assistant Card
  aiAssistantCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  aiAssistantGradient: {
    padding: 16,
  },
  aiAssistantContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTextContainer: {
    flex: 1,
  },
  aiAssistantTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  aiAssistantSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },

  // Chat Items
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.background,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
