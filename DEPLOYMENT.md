# 🚀 Deployment Guide

Complete guide to deploy Study AI helper.com to production.

## 🟢 Deploy to Vercel (Recommended)

Vercel is the official Next.js hosting platform. It's free to start!

### Step 1: Connect GitHub
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Connect your GitHub account
5. Select the repository

### Step 2: Configure Project
1. Set **Framework Preset** to "Next.js"
2. Click "Environment Variables"
3. Add all variables from `.env.local`:
   ```
   NEXTAUTH_SECRET=your_production_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   OPENAI_API_KEY=sk_...
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site is live! 🎉

### Step 4: Setup Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

## 🐳 Docker Deployment

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Create .dockerignore
```
node_modules
.next
.git
.env.local
```

### Step 3: Build & Run
```bash
docker build -t study-helper-ai .
docker run -p 3000:3000 study-helper-ai
```

## ☁️ Deploy to AWS

### Using AWS Amplify

1. Go to https://console.aws.amazon.com/amplify
2. Click "New App" → "Host Web App"
3. Connect GitHub repository
4. Set build settings
5. Add environment variables
6. Deploy!

### Using EC2 + PM2

```bash
# SSH into server
ssh -i key.pem ec2-user@your-instance

# Install Node & npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18

# Clone repo
git clone your-repo-url
cd study-helper-ai

# Install & build
npm install
npm run build

# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "study-helper" -- start
pm2 startup
pm2 save
```

## 🎯 Deploy to Netlify

### Step 1: Connect Git
1. Go to https://netlify.com
2. Click "Add New Site" → "Import an existing project"
3. Connect GitHub
4. Select repository

### Step 2: Configure
1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. Add environment variables

### Step 3: Deploy
Click "Deploy Site" and wait!

## 🔵 Deploy to Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 2: Create Procfile
```
web: npm start
```

### Step 3: Deploy
```bash
heroku create your-app-name
git push heroku main
heroku config:set NEXTAUTH_SECRET=your_secret
```

## 🔒 Production Security Checklist

- [ ] Change `NEXTAUTH_SECRET` to a strong random string
- [ ] Use `HTTPS` everywhere (automatic on Vercel/Netlify)
- [ ] Enable CORS properly
- [ ] Set secure cookie flags
- [ ] Hide sensitive environment variables
- [ ] Setup rate limiting
- [ ] Enable Web Application Firewall
- [ ] Configure CORS headers
- [ ] Setup monitoring & alerts

### Generate Secure Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📊 Monitor Production

### Setup Error Tracking
```bash
npm install @sentry/nextjs
```

### Setup Performance Monitoring
```bash
npm install next-safe-json
```

### Setup Uptime Monitoring
- Use UptimeRobot (https://uptimerobot.com)
- Get alerts if site goes down

## 💾 Backup Database

### If using MongoDB
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/study_helper"
```

### If using PostgreSQL
```bash
pg_dump -U username dbname > backup.sql
```

## 🔄 Continuous Integration/Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🎯 Performance Optimization

### Enable Caching
```
Next.js automatically caches static pages`
```

### Optimize Images
```bash
npm install next-image-optimization
```

### Enable Compression
```javascript
// next.config.js
module.exports = {
  compress: true,
};
```

## 📝 Post-Deployment

- [ ] Update DNS records
- [ ] Setup SSL certificate
- [ ] Test all features
- [ ] Verify payments work
- [ ] Check analytics
- [ ] Setup monitoring
- [ ] Create runbook for issues
- [ ] Setup CDN for assets
- [ ] Configure email service
- [ ] Test on mobile

## 🆘 Troubleshooting

### Build Fails
```bash
rm -rf .next
npm run build
```

### Env Variables Not Working
- Verify variable names match files
- Restart deployment after adding variables
- Check for typos

### Database Connection Error
- Verify connection string
- Check IP whitelist (MongoDB)
- Test locally first

## 📞 Support Platforms

- **Vercel:** https://vercel.com/support
- **Netlify:** https://docs.netlify.com
- **AWS:** https://aws.amazon.com/support
- **Heroku:** https://devcenter.heroku.com

---

**Your app is now live! 🎉**

Monitor performance, fix bugs, and keep improving!
