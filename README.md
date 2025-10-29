
# SkillTrade - Trade Skills, Not Money 🎨💻🎵

A modern React Native app built with Expo 54 that enables people worldwide to trade skills directly without monetary exchange. Learn design while teaching coding, master photography while sharing music production skills.

## ✨ Features

### 🔐 Authentication
- Email/Password authentication with verification
- Google OAuth integration (ready to enable)
- Apple Sign In support (coming soon)
- Secure session management
- Profile creation on signup

### 💬 Real-Time Chat
- One-on-one messaging with real-time delivery
- File sharing (images, documents)
- Voice message support (UI ready)
- Read receipts and online status
- Conversation history
- Unread message counts

### 🤖 AI Assistant
- OpenAI GPT-4o-mini powered chatbot
- Skill recommendations
- Learning path suggestions
- Skill matching assistance
- Session planning advice

### 🔄 Trade Request System
- Send/receive skill trade requests
- Accept/reject with status tracking
- Skill matching (teach X, learn Y)
- Request messages for context
- Session scheduling (database ready)

### 🗺️ Location-Based Discovery
- Find nearby skill traders
- Location-based user discovery
- Skill category filtering
- User profiles with ratings

### 👤 User Profiles
- Profile customization
- Avatar upload
- Skills to teach/learn
- Rating and trade history
- Bio and location

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed
- OpenAI API key (for AI chat)
- Supabase account (already configured)

### Installation

1. **Clone and Install**
```bash
npm install
```

2. **Configure Environment**
Create `.env` file:
```env
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

3. **Run the App**
```bash
npm run dev
```

4. **Scan QR Code**
Use Expo Go app on your phone to scan the QR code

## 📱 App Structure

```
app/
├── (tabs)/              # Main tab navigation
│   ├── (home)/         # Home screen
│   ├── messages.tsx    # Messages list
│   ├── ai-chat.tsx     # AI chatbot
│   ├── explore.tsx     # Explore users
│   └── profile.tsx     # User profile
├── auth/               # Authentication screens
│   ├── welcome.tsx
│   ├── login.tsx
│   └── signup.tsx
├── chat/[id].tsx       # Chat screen
├── user/[id].tsx       # User detail
├── trade-requests.tsx  # Trade requests
└── map.tsx            # Map view
```

## 🎨 Design System

### Colors
- **Primary**: #FF7043 (Orange)
- **Secondary**: #FF6B9D (Pink)
- **Accent**: #C158DC (Purple)
- **Success**: #4CAF50
- **Warning**: #FFC107
- **Error**: #F44336

### Components
- Gradient buttons and cards
- Floating tab bar
- Modern input fields
- Avatar placeholders
- Loading states
- Error boundaries

## 🗄️ Database Schema

### Tables
- **profiles** - User profiles with location and ratings
- **skills** - Skill catalog with categories
- **user_skills_teach** - Skills users can teach
- **user_skills_learn** - Skills users want to learn
- **conversations** - Chat conversations
- **messages** - Chat messages with file support
- **trade_requests** - Skill trade requests
- **sessions** - Scheduled learning sessions

### Security
- Row Level Security (RLS) on all tables
- Authenticated user policies
- Private data restrictions
- Realtime channel authorization

## 🔧 Configuration

### Enable Google OAuth

1. Go to Supabase Dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add OAuth credentials
5. Set redirect URL: `https://natively.dev/email-confirmed`

### Get OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to `.env` file

### Supabase Setup

Already configured with:
- URL: `https://kuxbnbplndjuyfauqxop.supabase.co`
- Database with all tables and RLS policies
- Realtime enabled with broadcast triggers
- Authentication configured

## 📚 Key Technologies

- **React Native** - Mobile framework
- **Expo 54** - Development platform
- **Supabase** - Backend and database
- **OpenAI** - AI chatbot
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **Expo Router** - File-based routing
- **Reanimated** - Animations

## 🎯 Usage Examples

### Send a Message
```typescript
const { error } = await supabase.from('messages').insert({
  conversation_id: conversationId,
  sender_id: user.id,
  content: 'Hello!',
  message_type: 'text',
});
```

### Create Trade Request
```typescript
const { error } = await supabase.from('trade_requests').insert({
  sender_id: user.id,
  receiver_id: otherUserId,
  skill_to_teach_id: skillId1,
  skill_to_learn_id: skillId2,
  message: 'Let&apos;s trade skills!',
});
```

### Use AI Chat
```typescript
const { messages, sendMessage } = useAIChat();
await sendMessage('What skills should I learn?');
```

## 🐛 Troubleshooting

### Blank Screen
1. Check console for errors
2. Verify `.env` file exists
3. Restart dev server
4. Clear cache: `npm start -- --clear`

### Authentication Issues
1. Check Supabase dashboard
2. Verify email verification enabled
3. Check redirect URLs
4. Review console logs

### Chat Not Working
1. Check internet connection
2. Verify Supabase Realtime enabled
3. Check RLS policies
4. Monitor WebSocket connections

## 📖 Documentation

- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Detailed feature list
- [Quick Start Guide](./QUICK_START.md) - 5-minute setup
- [AI Chat Setup](./docs/AI_CHAT_SETUP.md) - OpenAI configuration

## 🔒 Security

- Environment variables for sensitive data
- Row Level Security on all tables
- Secure authentication flow
- Email verification required
- OAuth integration ready

## 🚧 Known Limitations

1. **react-native-maps** not supported (placeholder shown)
2. **File uploads** need Supabase Storage implementation
3. **Voice recording** needs implementation
4. **Push notifications** not yet implemented
5. **Video calls** not yet implemented

## 🎉 What's Working

✅ Modern UI with gradients and animations
✅ Complete authentication system
✅ Real-time chat with file sharing UI
✅ AI chatbot with OpenAI
✅ Trade request system
✅ Database with RLS policies
✅ Google OAuth ready
✅ Location-based discovery
✅ User profiles and ratings
✅ Session scheduling (database)

## 📝 License

MIT License - feel free to use this project as you wish!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Future Enhancements

- Video call integration
- Voice message recording
- File upload to Supabase Storage
- Push notifications
- Calendar sync
- Advanced matching algorithm
- Rating and review system
- Analytics dashboard
- In-app payments (optional)

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review console logs
3. Verify environment variables
4. Check Supabase dashboard
5. Test with multiple accounts

---

**Built with ❤️ for the skill trading community**

Trade skills, not money. Learn together, grow together. 🚀
