
/**
 * AI Chat Constants
 * Configuration and constants for the AI chat feature
 */

export const AI_CHAT_CONFIG = {
  // OpenAI Configuration
  model: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 500,

  // UI Configuration
  maxMessageLength: 500,
  scrollAnimationDuration: 100,
  typingIndicatorDelay: 500,

  // System Prompt
  systemPrompt: `You are a helpful AI assistant for SkillTrade, a platform where people trade skills directly without money. Help users find skill matches, suggest learning paths, answer questions about skill trading, and provide guidance on how to use the platform effectively. Be friendly, encouraging, and concise.`,
};

export const SUGGESTED_PROMPTS = [
  "What skills should I learn to become a web developer?",
  "How do I find someone to trade React Native skills with?",
  "Can you suggest a learning path for UI/UX design?",
  "What's the best way to structure a skill trading session?",
  "How can I improve my profile to attract more skill traders?",
  "What are the most in-demand skills right now?",
];

export const AI_CHAT_TIPS = [
  {
    title: "Be Specific",
    description: "The more specific your question, the better the AI can help you.",
    icon: "target",
  },
  {
    title: "Ask Follow-ups",
    description: "Don't hesitate to ask for clarification or more details.",
    icon: "arrow.triangle.2.circlepath",
  },
  {
    title: "Share Context",
    description: "Tell the AI about your current skills and goals for better recommendations.",
    icon: "person.text.rectangle",
  },
  {
    title: "Explore Ideas",
    description: "Use the AI to brainstorm learning paths and skill combinations.",
    icon: "lightbulb",
  },
];

export const ERROR_MESSAGES = {
  noApiKey: "OpenAI API key not configured. Please add EXPO_PUBLIC_OPENAI_API_KEY to your environment variables.",
  apiError: "Failed to get response from AI. Please check your API key and try again.",
  networkError: "Network error. Please check your internet connection and try again.",
  rateLimitError: "Rate limit exceeded. Please wait a moment and try again.",
  emptyMessage: "Please enter a message before sending.",
  messageTooLong: "Message is too long. Please keep it under 500 characters.",
};

export const WELCOME_MESSAGES = [
  "Hi! I'm your SkillTrade AI assistant. I can help you find skill matches, suggest learning paths, answer questions about skill trading, and more. How can I help you today?",
  "Welcome! I'm here to help you make the most of SkillTrade. Ask me anything about skills, learning, or trading!",
  "Hello! Ready to explore new skills? I can help you find matches, plan your learning journey, and answer any questions you have.",
];

export const QUICK_ACTIONS = [
  {
    id: "find-matches",
    label: "Find Skill Matches",
    prompt: "Can you help me find skill trading matches based on my profile?",
    icon: "person.2.fill",
  },
  {
    id: "learning-path",
    label: "Create Learning Path",
    prompt: "Can you suggest a learning path for [skill name]?",
    icon: "map.fill",
  },
  {
    id: "session-tips",
    label: "Session Tips",
    prompt: "What are some tips for having a successful skill trading session?",
    icon: "lightbulb.fill",
  },
  {
    id: "platform-help",
    label: "Platform Help",
    prompt: "How do I use SkillTrade effectively?",
    icon: "questionmark.circle.fill",
  },
];
