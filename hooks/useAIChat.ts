
import { useState, useCallback } from "react";
import { sendChatCompletion, ChatMessage } from "@/services/openai";

interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

export function useAIChat(initialMessages: ChatMessage[] = []): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        role: "user",
        content: content.trim(),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Get conversation history (excluding system messages)
        const conversationHistory = messages.filter((m) => m.role !== "system");

        // Send to OpenAI
        const response = await sendChatCompletion([...conversationHistory, userMessage]);

        // Add assistant response
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: response,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err: any) {
        console.error("Error sending message:", err);
        const errorMessage = err.message || "Failed to send message. Please try again.";
        setError(errorMessage);

        // Add error message to chat
        const errorChatMessage: ChatMessage = {
          role: "assistant",
          content: `I'm sorry, I encountered an error: ${errorMessage}. Please make sure your OpenAI API key is configured correctly.`,
        };
        setMessages((prev) => [...prev, errorChatMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    clearError,
  };
}
