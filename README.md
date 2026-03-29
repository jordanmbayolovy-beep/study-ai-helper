# 📚 Study AI helper.com - Student Learning Platform

A modern, AI-powered study platform designed for students in grades 6-12. Get personalized help with notes, questions, math problems, paraphrasing, and an intelligent chatbot.

## ✨ Features

### 🎯 Core Features
- **Grade-Level System** (6-12): AI adjusts explanations based on student grade
- **Subject Organization**: Math, Science, English, History
- **Input System**: Make notes, answer questions, solve math, paraphrase text
- **AI Chatbot**: Ask follow-up questions with fact-checking and sources
- **Output Formatting**: Structured responses with key points, explanations, and sources

### 💰 Subscription System
- **Free Plan**: 
  - 20 questions/month
  - 15 notes/month
  - Limited chatbot access
  
- **Pro Plan ($2.99/month)**:
  - Unlimited everything
  - Priority processing
  - Full chatbot access
  - Ad-free experience
  - Optional 7-day free trial

### 👤 Authentication
- Email/Password signup
- Google & Apple OAuth (UI ready)
- User account management
- Usage statistics tracking

### 🎨 Design
- Clean, student-friendly interface
- Light & dark mode support
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Emoji-based UI for engagement

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "Study helper  AI"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API keys:
   - `NEXTAUTH_SECRET`: JWT secret
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe public key
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `OPENAI_API_KEY`: OpenAI API key (optional)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Study helper AI/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main dashboard
│   ├── auth/              # Authentication pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── ai/            # AI processing endpoints
│   │   └── payment/       # Payment endpoints
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx
│   ├── GradeSelector.tsx
│   ├── SubjectTabs.tsx
│   ├── InputSection.tsx
│   ├── OutputSection.tsx
│   ├── ChatBot.tsx
│   ├── UpgradeModal.tsx
│   └── LoadingAnimation.tsx
├── lib/                   # Utilities and stores
│   ├── store.ts          # Zustand state management
│   └── mockDatabase.ts   # Mock user data
├── styles/               # Global styles
│   └── globals.css
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔧 Technology Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: JWT + bcryptjs
- **Payment**: Stripe (stripe-js)
- **Database**: Mock (ready for MongoDB/PostgreSQL)
- **Language**: TypeScript

## 📱 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Main study interface |
| Login | `/auth/login` | User login |
| Signup | `/auth/signup` | User registration |
| Profile | `/profile` | User settings (coming soon) |

## 🤖 AI Features

### Supported Actions
1. **Make Notes** 📌
   - Summarizes text into organized notes
   - Key points highlighted
   - Study tips included

2. **Answer Question** ❓
   - Provides detailed answers
   - Includes explanations
   - Sources cited

3. **Paraphrase** 🔄
   - Rephrases text in simpler terms
   - Great for understanding complex content

4. **Solve Math** ➗
   - Step-by-step solutions
   - Shows working
   - Explains the process

### Chatbot 💬
- Ask follow-up questions
- Fact-checking enabled
- Sources provided
- Grade-appropriate responses

## 💳 Payment Integration

Currently using mock payment processing. To integrate real payments:

1. **Setup Stripe Account**
   - Get publishable key
   - Get secret key
   - Add to `.env.local`

2. **Update Payment Route**
   - Replace mock processing in `app/api/payment/upgrade/route.ts`
   - Implement real Stripe API calls

## 🔐 Security Notes

- Passwords are hashed with bcryptjs
- JWT tokens for authentication
- Environment variables for sensitive data
- Ready for HTTPS in production
- Input validation required

## 🚀 Production Deploy

### On Vercel
```bash
npm install -g vercel
vercel
```

### Environment Setup
Add these to Vercel project settings:
- All variables from `.env.local`
- Update `NEXT_PUBLIC_APP_URL` to production domain

## 📚 Demo Credentials

**Free Account**
- Email: `demo@example.com`
- Password: `demo123`

## 🐛 Known Limitations

- Mock AI responses (connect OpenAI API for real AI)
- Mock database (use MongoDB/PostgreSQL for production)
- Payment processing is simulated
- OAuth integration needs backend setup

## 📈 Future Enhancements

- [ ] Integration with OpenAI/Claude for real AI
- [ ] MongoDB/PostgreSQL database
- [ ] Real Stripe payment processing
- [ ] OAuth provider integration
- [ ] Email notifications
- [ ] File upload support
- [ ] Collaborative study groups
- [ ] Performance analytics
- [ ] Video explanations
- [ ] Gamification/rewards system

## 📝 License

MIT License - feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 💬 Support

For questions or issues, please open a GitHub issue or contact support.

---

**Made with ❤️ for students**
