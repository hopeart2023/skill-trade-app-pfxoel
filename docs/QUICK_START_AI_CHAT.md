
# Quick Start: AI Chat

Get your AI chatbot running in 3 simple steps!

## Step 1: Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

## Step 2: Add API Key to Your Project

Create a `.env` file in your project root:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-actual-key-here
```

## Step 3: Restart and Test

```bash
# Stop your dev server (Ctrl+C)
# Restart it
npm run dev
```

Open the app → Messages tab → Tap "AI Assistant" → Start chatting!

## Example Questions to Try

- "What skills should I learn to become a web developer?"
- "How do I find someone to trade React Native skills with?"
- "Can you suggest a learning path for UI/UX design?"
- "What's the best way to structure a skill trading session?"

## Troubleshooting

**Error: "Failed to get response"**
- Check your API key is correct
- Verify you have credits in your OpenAI account
- Make sure you restarted the dev server

**Error: "API key not found"**
- Ensure `.env` file is in project root
- Variable must start with `EXPO_PUBLIC_`
- Restart the development server

## Cost Information

GPT-4o-mini is very affordable:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- A typical chat costs less than $0.01

## Security Tips

✅ Never commit `.env` to git
✅ Keep your API key private
✅ Set spending limits in OpenAI dashboard
✅ Monitor usage regularly

## Need More Help?

See the full [AI Chat Setup Guide](./AI_CHAT_SETUP.md) for detailed information.
