
/**
 * OpenAI Service
 * Handles all interactions with the OpenAI API
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

const DEFAULT_SYSTEM_PROMPT = `You are a helpful AI assistant for SkillTrade, a platform where people trade skills directly without money. Help users find skill matches, suggest learning paths, answer questions about skill trading, and provide guidance on how to use the platform effectively. Be friendly, encouraging, and concise.`;

const DEFAULT_OPTIONS: Required<ChatCompletionOptions> = {
  model: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 500,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
};

/**
 * Send a chat completion request to OpenAI
 */
export async function sendChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenAI API key not found. Please set EXPO_PUBLIC_OPENAI_API_KEY in your environment variables."
    );
  }

  const config = { ...DEFAULT_OPTIONS, ...options };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "system",
            content: config.systemPrompt,
          },
          ...messages,
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(
        errorData.error?.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error in sendChatCompletion:", error);
    throw error;
  }
}

/**
 * Get skill recommendations based on user interests
 */
export async function getSkillRecommendations(
  currentSkills: string[],
  interests: string[]
): Promise<string> {
  const prompt = `I currently have these skills: ${currentSkills.join(", ")}. 
I'm interested in: ${interests.join(", ")}. 
What skills should I learn next to complement my current abilities?`;

  return sendChatCompletion([
    {
      role: "user",
      content: prompt,
    },
  ]);
}

/**
 * Get a learning path suggestion
 */
export async function getLearningPath(skill: string, currentLevel: string): Promise<string> {
  const prompt = `I want to learn ${skill}. My current level is ${currentLevel}. 
Can you suggest a structured learning path with milestones?`;

  return sendChatCompletion([
    {
      role: "user",
      content: prompt,
    },
  ]);
}

/**
 * Find potential skill trade matches
 */
export async function findSkillMatches(
  skillsToTeach: string[],
  skillsToLearn: string[]
): Promise<string> {
  const prompt = `I can teach: ${skillsToTeach.join(", ")}. 
I want to learn: ${skillsToLearn.join(", ")}. 
What would be good skill trade matches for me?`;

  return sendChatCompletion([
    {
      role: "user",
      content: prompt,
    },
  ]);
}

/**
 * Get session planning advice
 */
export async function getSessionAdvice(
  skillToTeach: string,
  studentLevel: string,
  sessionDuration: number
): Promise<string> {
  const prompt = `I'm planning to teach ${skillToTeach} to someone at ${studentLevel} level. 
The session will be ${sessionDuration} minutes. 
Can you suggest a session structure and key topics to cover?`;

  return sendChatCompletion([
    {
      role: "user",
      content: prompt,
    },
  ]);
}
