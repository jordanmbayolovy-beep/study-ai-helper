# 🔧 API Integration Guide

This guide explains how to integrate real services with Study AI helper.com.

## 🤖 OpenAI Integration

### Step 1: Get API Key
1. Go to https://platform.openai.com
2. Click "API Keys" in the left sidebar
3. Click "Create new secret key"
4. Copy the key

### Step 2: Add to Environment
Edit `.env.local`:
```
OPENAI_API_KEY=sk_your_actual_key_here
```

### Step 3: Update AI Processing Route
Replace `app/api/ai/process/route.ts` with:

```typescript
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getAIResponse(text: string, grade: number, action: string) {
  const systemPrompt = `You are a helpful study assistant for a Grade ${grade} student. 
Provide ${grade <= 8 ? 'simple, easy to understand' : 'detailed, advanced'} explanations.`;

  const userPrompt = getPromptForAction(text, action);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
  });

  return response.data.choices[0].message?.content || '';
}
```

## 💳 Stripe Payment Integration

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Sign up and verify your account
3. Go to Dashboard → Developers → API Keys
4. Copy **Publishable Key** and **Secret Key**

### Step 2: Add to Environment
Edit `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 3: Install Stripe SDK
```bash
npm install stripe @stripe/stripe-js
```

### Step 4: Update Payment Route
Replace `app/api/payment/upgrade/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Study Helper Pro' },
            unit_amount: 299, // $2.99
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000?success=true',
      cancel_url: 'http://localhost:3000?canceled=true',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
```

## 🗄️ Database Integration

### Using MongoDB

#### Step 1: Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string

#### Step 2: Install Mongoose
```bash
npm install mongoose
```

#### Step 3: Create Models
Create `lib/models/User.ts`:

```typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  grade: Number,
  subscriptionStatus: String,
  usageStats: Object,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
```

#### Step 4: Update API Routes
Replace auth routes to use MongoDB instead of mock database.

### Using PostgreSQL

#### Step 1: Setup Database
```bash
npm install prisma @prisma/client
npx prisma init
```

#### Step 2: Configure .env
```
DATABASE_URL="postgresql://user:password@localhost:5432/study_helper"
```

#### Step 3: Create Schema
`prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  grade     Int
  subscriptionStatus String
  usageStats Json
  createdAt DateTime @default(now())
}
```

## 📧 Email Notifications (SendGrid)

### Step 1: Get API Key
1. Go to https://sendgrid.com
2. Create account and verify
3. Get API Key from Settings

### Step 2: Add to Environment
```
SENDGRID_API_KEY=SG_your_key_here
```

### Step 3: Install SDK
```bash
npm install @sendgrid/mail
```

### Step 4: Send Emails
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: 'user@example.com',
  from: 'noreply@studyhelper.ai',
  subject: 'Welcome to Study Helper!',
  html: '<strong>Get started learning!</strong>',
});
```

## 🔐 OAuth Integration

### Google OAuth

#### Step 1: Setup Google Cloud
1. Go to https://console.cloud.google.com
2. Create new project
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

#### Step 2: Add Keys to .env
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

#### Step 3: Install NextAuth or Similar
```bash
npm install next-auth
```

## 🚀 Monitoring & Logging

### Add Sentry for Error Tracking
```bash
npm install @sentry/nextjs
```

### Setup Environment
```
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 📊 Analytics

### Add Google Analytics
```bash
npm install react-ga4
```

### Setup in Layout
```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-YOUR_GA_ID');
```

## ✅ Pre-Deployment Checklist

- [ ] OpenAI API working
- [ ] Stripe payments tested
- [ ] Database connected
- [ ] Email notifications working
- [ ] OAuth providers configured
- [ ] Environment variables set for production
- [ ] Error logging setup
- [ ] Analytics integrated
- [ ] SSL certificate ready
- [ ] Domain configured

## 🎉 You're Ready!

All these integrations will make Study AI helper.com fully functional and production-ready.

Questions? Check the official documentation for each service!
