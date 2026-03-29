# ⚡ Quick Start Guide

## 1️⃣ Installation (1 minute)

```bash
npm install
```

## 2️⃣ Start Development Server (30 seconds)

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## 3️⃣ Try It Out!

### Login with Demo Account
- **Email**: `demo@example.com`
- **Password**: `demo123`

### Or Create a New Account
- Go to **Sign Up** page
- Enter your details
- Select your grade (6-12)
- Click **Create Account**

## 🎯 Features to Try

### 1. Make Notes
1. Select your grade
2. Select a subject
3. Paste some text
4. Click **📌 Notes**
5. Get organized study notes!

### 2. Answer Questions
1. Type your question
2. Click **❓ Answer**
3. Get a detailed explanation for your grade level

### 3. Solve Math
1. Switch to **➗ Math** mode
2. Paste a math problem
3. Click **➗ Solve**
4. See step-by-step solution

### 4. Use the Chatbot
1. Switch to **💬 Chat** mode
2. Ask follow-up questions
3. Get fact-checked answers with sources

### 5. Upgrade to Pro
1. Click **🚀 Upgrade to Pro** button
2. See plan comparison
3. Select payment method
4. Enjoy unlimited access!

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',  // Change primary color
  secondary: '#ec4899', // Change secondary color
}
```

### Add Your API Keys
Edit `.env.local`:
- Stripe keys for real payments
- OpenAI key for real AI responses
- SendGrid key for email notifications

### Add More Subjects
Edit `lib/mockDatabase.ts` and add to `subjects` array:
```javascript
{
  id: 'biology',
  name: 'Biology',
  grades: [6, 7, 8, 9, 10, 11, 12],
  topics: ['Cells', 'Genetics', 'Evolution', ...],
}
```

## 📱 Mobile Usage

The app is fully responsive! Try:
- Rotating your phone
- Using on tablets
- Testing on desktop

All layouts adapt automatically.

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### App won't start
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 in use
```bash
npm run dev -- --port 3001
```

### Import errors
Make sure TypeScript is installed:
```bash
npm install --save-dev typescript @types/react @types/node
```

## 📚 Next Steps

1. **Connect OpenAI API** for real AI responses
2. **Setup Stripe** for real payments
3. **Add database** (MongoDB/PostgreSQL)
4. **Deploy to Vercel**
5. **Invite beta testers**

## 💡 Tips

- Use **Grade Selector** first - all explanations adapt to it
- **Copy button** on outputs lets you save responses
- **Dark mode** works across all pages
- **Chat history** clears on page refresh (add persistence if needed)
- **Free plan** shows usage limits

## 📞 Help

Need help? Check:
- `README.md` for full documentation
- `package.json` for available scripts
- `.env.example` for all environment variables
- Individual component files for detailed code comments

---

**Happy Studying! 🎓**
