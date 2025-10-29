
# SkillTrade - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Configure OpenAI API Key (Required for AI Chat)

1. Get your API key from https://platform.openai.com/api-keys
2. Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
```

### Step 2: Enable Google OAuth (Optional)

1. Go to https://supabase.com/dashboard/project/kuxbnbplndjuyfauqxop/auth/providers
2. Click on **Google** provider
3. Toggle **Enable Sign in with Google**
4. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
5. Add redirect URL: `https://natively.dev/email-confirmed`

### Step 3: Run the App

```bash
npm run dev
```

## 📱 Test the Features

### 1. Authentication
- Open the app → Welcome screen
- Click **Sign Up** → Create account
- Check your email for verification
- Click **Sign In** → Login with credentials
- Try **Google Sign In** (if configured)

### 2. AI Chat
- Go to **Messages** tab
- Click **AI Assistant** card
- Ask questions like:
  - "What skills should I learn?"
  - "Help me find a skill match"
  - "Suggest a learning path for React Native"

### 3. Real-Time Chat
- Create a second test account
- From account 1, go to **Explore** → Find user → **Message**
- Send messages from both accounts
- See real-time delivery

### 4. Trade Requests
- From home screen, click **Trade Requests**
- Send a trade request to another user
- Accept/reject from the other account
- Schedule a session

### 5. Map & Discovery
- Click **Nearby Traders** from home
- Browse users by location
- View user profiles
- Send connection requests

## 🔧 Troubleshooting

### Blank Screen?
1. Check console for errors
2. Verify `.env` file exists
3. Restart the dev server
4. Clear cache: `npm start -- --clear`

### Authentication Not Working?
1. Check Supabase dashboard is accessible
2. Verify email verification is enabled
3. Check redirect URLs are configured
4. Look for error messages in console

### AI Chat Not Working?
1. Verify OpenAI API key in `.env`
2. Check API key has credits
3. Restart the app after adding key
4. Check console for API errors

### Real-Time Chat Not Working?
1. Check internet connection
2. Verify Supabase Realtime is enabled
3. Check RLS policies in Supabase
4. Look for WebSocket errors in console

## 📊 Database Access

View your data in Supabase:
- Dashboard: https://supabase.com/dashboard/project/kuxbnbplndjuyfauqxop
- Table Editor: Check **profiles**, **messages**, **trade_requests**
- Realtime: Monitor live connections
- Logs: Check for errors

## 🎯 Key Screens

### Navigation Structure
```
app/
├── index.tsx                 # Entry point (redirects based on auth)
├── auth/
│   ├── welcome.tsx          # Welcome screen
│   ├── login.tsx            # Login screen
│   ├── signup.tsx           # Sign up screen
├── (tabs)/
│   ├── (home)/index.tsx     # Home screen
│   ├── messages.tsx         # Messages list
│   ├── ai-chat.tsx          # AI chatbot
│   ├── explore.tsx          # Explore users
│   └── profile.tsx          # User profile
├── chat/[id].tsx            # Chat screen
├── user/[id].tsx            # User detail
├── trade-requests.tsx       # Trade requests
└── map.tsx                  # Map view
```

## 💡 Pro Tips

1. **Multiple Test Accounts**: Create 2-3 accounts to test chat and trade requests
2. **Database Inspection**: Use Supabase dashboard to verify data
3. **Real-Time Monitoring**: Watch Realtime logs in Supabase
4. **API Key Security**: Never commit `.env` to git
5. **Error Logs**: Always check console for detailed errors

## 🎨 Customization

### Change Colors
Edit `styles/commonStyles.ts`:
```typescript
export const colors = {
  primary: '#FF7043',    // Your brand color
  secondary: '#FF6B9D',  // Secondary color
  accent: '#C158DC',     // Accent color
  // ... more colors
};
```

### Add New Skills
Insert into Supabase:
```sql
INSERT INTO skills (name, category, icon) VALUES
  ('Your Skill', 'Category', '🎨');
```

### Modify Chat UI
Edit `app/chat/[id].tsx` for chat interface customization

## 📚 Learn More

- **Supabase Docs**: https://supabase.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **React Native**: https://reactnative.dev/docs
- **Expo**: https://docs.expo.dev

## 🆘 Need Help?

1. Check `IMPLEMENTATION_SUMMARY.md` for detailed info
2. Review console logs for errors
3. Verify environment variables
4. Check Supabase dashboard
5. Test with different accounts

---

**Happy Skill Trading! 🎉**
