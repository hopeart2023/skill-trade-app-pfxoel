
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAIChat } from "@/hooks/useAIChat";
import { AISetupPrompt } from "@/components/AISetupPrompt";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: DisplayMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your SkillTrade AI assistant. I can help you find skill matches, suggest learning paths, answer questions about skill trading, and more. How can I help you today?",
  timestamp: new Date(),
};

export default function AIChatScreen() {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [showSetupPrompt, setShowSetupPrompt] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { messages, isLoading, error, sendMessage } = useAIChat();

  // Check if API key is configured
  const hasApiKey = !!process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  // Show setup prompt if API key is missing
  useEffect(() => {
    if (!hasApiKey) {
      setShowSetupPrompt(true);
    }
  }, [hasApiKey]);

  // Sync chat messages with display messages
  useEffect(() => {
    if (messages.length > 0) {
      const newDisplayMessages = messages.map((msg, index) => ({
        id: `msg-${index}`,
        role: msg.role as "user" | "assistant",
        content: msg.content,
        timestamp: new Date(),
      }));
      setDisplayMessages([WELCOME_MESSAGE, ...newDisplayMessages]);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [displayMessages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || !hasApiKey) return;

    const messageText = inputText.trim();
    setInputText("");

    await sendMessage(messageText);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderMessage = (message: DisplayMessage) => {
    const isUser = message.role === "user";

    return (
      <View
        key={message.id}
        style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.aiMessageContainer]}
      >
        {!isUser && (
          <View style={styles.aiAvatar}>
            <LinearGradient colors={[colors.primary, colors.secondary, colors.accent]} style={styles.aiAvatarGradient}>
              <IconSymbol name="sparkles" size={20} color="#FFFFFF" />
            </LinearGradient>
          </View>
        )}

        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
            {message.content}
          </Text>
          <Text style={[styles.messageTime, isUser ? styles.userMessageTime : styles.aiMessageTime]}>
            {formatTime(message.timestamp)}
          </Text>
        </View>

        {isUser && (
          <View style={styles.userAvatar}>
            <IconSymbol name="person.fill" size={20} color={colors.primary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.headerIconContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary, colors.accent]}
                style={styles.headerIconGradient}
              >
                <IconSymbol name="sparkles" size={20} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Assistant</Text>
              <Text style={styles.headerSubtitle}>Powered by OpenAI</Text>
            </View>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            Platform.OS !== "ios" && styles.messagesContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Setup Prompt */}
          {showSetupPrompt && !hasApiKey && (
            <AISetupPrompt onDismiss={() => setShowSetupPrompt(false)} />
          )}

          {displayMessages.map(renderMessage)}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.aiAvatar}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary, colors.accent]}
                  style={styles.aiAvatarGradient}
                >
                  <IconSymbol name="sparkles" size={20} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          {!hasApiKey && (
            <View style={styles.warningBanner}>
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.warning} />
              <Text style={styles.warningText}>API key required. See setup guide above.</Text>
            </View>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={hasApiKey ? "Ask me anything..." : "Configure API key to chat..."}
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isLoading && hasApiKey}
              onSubmitEditing={handleSendMessage}
            />
            <Pressable
              onPress={handleSendMessage}
              style={[styles.sendButton, (!inputText.trim() || isLoading || !hasApiKey) && styles.sendButtonDisabled]}
              disabled={!inputText.trim() || isLoading || !hasApiKey}
            >
              <LinearGradient
                colors={
                  !inputText.trim() || isLoading || !hasApiKey
                    ? [colors.textSecondary, colors.textSecondary]
                    : [colors.primary, colors.secondary]
                }
                style={styles.sendButtonGradient}
              >
                <IconSymbol name="arrow.up" size={20} color="#FFFFFF" />
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

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 8,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  headerIconGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  headerRight: {
    width: 40,
  },

  // Messages
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  messagesContentWithTabBar: {
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },

  // Avatars
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  aiAvatarGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.highlight,
    justifyContent: "center",
    alignItems: "center",
  },

  // Message Bubbles
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  aiMessageText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  userMessageTime: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  aiMessageTime: {
    color: colors.textSecondary,
  },

  // Loading
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  loadingBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 16,
    paddingHorizontal: 20,
  },

  // Input
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.highlight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
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
    overflow: "hidden",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
