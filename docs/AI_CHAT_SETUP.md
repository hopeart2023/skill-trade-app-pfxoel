
# AI Chat Setup Guide

## Overview

The SkillTrade app includes an AI-powered chatbot that helps users:
- Find skill matches
- Get learning path suggestions
- Answer questions about skill trading
- Provide guidance on using the platform

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your API key (you won't be able to see it again!)

### 2. Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your OpenAI API key:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important Notes:**
- The prefix `EXPO_PUBLIC_` is required for Expo to expose the variable to your app
- Never commit your `.env` file to version control
- Keep your API key secure and don't share it publicly

### 3. Restart Your Development Server

After adding the environment variable, restart your Expo development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### 4. Test the AI Chat

1. Open the app
2. Navigate to the Messages tab
3. Tap on the "AI Assistant" card at the top
4. Start chatting with the AI!

## Features

### Current Capabilities

- **Skill Matching**: Ask for recommendations on skills to learn or teach
- **Learning Paths**: Get suggestions for structured learning journeys
- **Platform Help**: Learn how to use SkillTrade features
- **General Assistance**: Ask questions about skill trading concepts

### Example Prompts

- "What skills should I learn if I want to become a UI designer?"
- "How do I find someone to trade React Native skills with?"
- "What's the best way to structure a skill trading session?"
- "Can you suggest a learning path for web development?"

## Technical Details

### Model Used

- **Model**: GPT-4o-mini
- **Provider**: OpenAI
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 500 (concise responses)

### API Costs

OpenAI charges per token used. GPT-4o-mini is cost-effective:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens

A typical conversation costs less than $0.01.

### Privacy & Security

- Messages are sent directly to OpenAI's API
- No messages are stored on SkillTrade servers
- Your API key is stored locally in environment variables
- Follow OpenAI's usage policies and terms of service

## Troubleshooting

### "Failed to get response from AI"

**Possible causes:**
1. Invalid or missing API key
2. API key doesn't have sufficient credits
3. Network connectivity issues
4. Rate limiting

**Solutions:**
1. Verify your API key is correct in `.env`
2. Check your OpenAI account has available credits
3. Check your internet connection
4. Wait a moment and try again if rate limited

### "Unauthorized" Error

- Your API key is invalid or expired
- Generate a new API key from OpenAI Platform
- Update your `.env` file with the new key
- Restart the development server

### Environment Variable Not Found

- Make sure your `.env` file is in the project root
- Verify the variable name starts with `EXPO_PUBLIC_`
- Restart the Expo development server
- Clear the cache: `npx expo start -c`

## Future Enhancements

Planned features for the AI chat:
- Voice input/output
- Image sharing and analysis
- Skill assessment quizzes
- Personalized learning recommendations based on profile
- Multi-language support
- Chat history persistence
- Suggested quick replies

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review OpenAI's [API documentation](https://platform.openai.com/docs)
3. Check Expo's [environment variables guide](https://docs.expo.dev/guides/environment-variables/)

## Security Best Practices

1. **Never commit API keys**: Add `.env` to `.gitignore`
2. **Rotate keys regularly**: Generate new keys periodically
3. **Set usage limits**: Configure spending limits in OpenAI dashboard
4. **Monitor usage**: Check your OpenAI usage dashboard regularly
5. **Use separate keys**: Different keys for development and production
