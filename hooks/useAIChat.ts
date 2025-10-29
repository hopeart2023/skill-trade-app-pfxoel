
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/app/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function useAIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load chat history from database
  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading chat history:', error);
        return;
      }

      if (data && data.length > 0) {
        const loadedMessages: Message[] = data.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        }));
        setMessages(loadedMessages);
      }
    } catch (err) {
      console.error('Error in loadChatHistory:', err);
    }
  };

  const saveChatMessage = async (role: 'user' | 'assistant' | 'system', content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ai_chat_history')
        .insert({
          user_id: user.id,
          role,
          content,
        });

      if (error) {
        console.error('Error saving chat message:', error);
      }
    } catch (err) {
      console.error('Error in saveChatMessage:', err);
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Save user message to database
    await saveChatMessage('user', content);

    try {
      const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for SkillTrade, a platform where people trade skills. Help users find skill partners, improve their profiles, and discover trending skills. Be friendly, encouraging, and provide actionable advice.',
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant message to database
      await saveChatMessage('assistant', assistantMessage.content);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages, user]);

  const clearHistory = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ai_chat_history')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing chat history:', error);
        return;
      }

      setMessages([]);
    } catch (err) {
      console.error('Error in clearHistory:', err);
    }
  }, [user]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearHistory,
  };
}
