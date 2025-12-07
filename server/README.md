# 📦 BudgetTracker Deployment Files

This folder contains all the files you need for production deployment.

## 📄 Files Overview

### Configuration Files
- **`Dockerfile`** - Docker container configuration for your server
- **`render.yaml`** - Render blueprint for automated deployment
- **`.env.example`** - Template for environment variables (server)
- **`.gitignore`** - Ensures secrets don't get committed

### Documentation
- **`QUICK_DEPLOY.md`** ⚡ - **START HERE** - 30-minute deployment guide
- **`DEPLOYMENT_GUIDE.md`** 📖 - Complete detailed deployment guide
- **`DEPLOYMENT_CHECKLIST.md`** ✅ - Step-by-step checklist

## 🚀 Quick Start

### 1. Choose Your Hosting Platform

**Option A: Render (Recommended for beginners)**
- Free tier available
- PostgreSQL included
- Easy setup via dashboard
- 👉 Follow: `QUICK_DEPLOY.md`
- **Build Command**: `npm ci && npm run build && npx prisma migrate deploy`

**Option B: Railway**
- $5/month credit included
- Auto-detects everything
- Simpler than Render
- Good for quick starts

**Option C: Fly.io**
- More technical
- Better for scaling
- Requires Docker knowledge

### 2. Required Services

Before deploying, sign up for:

1. **Cloudinary** (free) - https://cloudinary.com
   - For profile picture uploads
   - Get: Cloud Name, API Key, API Secret

2. **Email Service** (free options available)
   - Gmail (with App Password) - easiest
   - OR SendGrid - https://sendgrid.com
   - OR Mailgun - https://mailgun.com

3. **Arcjet** (optional, free tier available) - https://arcjet.com
   - For rate limiting and security
   - Get: API Key

### 3. Deployment Steps

```bash
# 1. Ensure code is on GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy on Render (via dashboard)
# Follow QUICK_DEPLOY.md steps 1-6

# 3. Update your React Native app
cd client
echo "EXPO_PUBLIC_API_BASE_URL=https://your-render-url.onrender.com/api" > .env

# 4. Test the API
curl https://your-render-url.onrender.com/health

# 5. Build for Play Store
eas build --platform android --profile production
```

## 🔑 Environment Variables

Your server needs these environment variables. Copy them from `.env.example` to Render dashboard:

### Critical (App Won't Work Without These):
```
DATABASE_URL=postgresql://...           # From Render PostgreSQL
JWT_SECRET_KEY=...                      # Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NODE_ENV=production
PORT=3000
TRUST_PROXY=1
```

### Features (App works but features disabled without these):
```
# Profile Pictures
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Password Reset Emails
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Security & Rate Limiting (optional)
ARCJET_ENV=production
ARCJET_KEY=...
ARCJET_MODE=LIVE

# CORS
ALLOWED_ORIGINS=*
```

## ✅ Verify Deployment

After deploying, test these endpoints:

```bash
# 1. Health Check (should return {"status":"ok","database":"connected"})
curl https://your-api.onrender.com/health

# 2. API Health Check
curl https://your-api.onrender.com/api/health

# 3. Register User
curl -X POST https://your-api.onrender.com/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!","username":"testuser"}'

# 4. Login
curl -X POST https://your-api.onrender.com/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

## 🐛 Troubleshooting

### Build Fails
- ✅ Check Root Directory is set to `server` in Render
- ✅ Verify `package.json` exists in `server/`
- ✅ Check Render build logs for specific errors

### Database Connection Fails
- ✅ Use **Internal Database URL** (not External)
- ✅ Ensure `TRUST_PROXY=1` is set
- ✅ Verify database and web service in same region

### Migrations Fail
- ✅ Check `prisma/migrations/` folder exists
- ✅ Run `npx prisma migrate dev` locally first
- ✅ Push migrations to GitHub before deploying

### Server Starts But Can't Connect
- ✅ Check Render logs for errors
- ✅ Verify all required environment variables are set
- ✅ Test health endpoint: `/health`

### Free Tier Slow
- ⚠️ Free tier sleeps after 15 minutes of inactivity
- ⚠️ First request takes 30-60 seconds to wake up
- 💡 Upgrade to Starter plan ($7/mo) for always-on

## 💰 Pricing

### Development/Testing
```
Render Free Tier:
- PostgreSQL: Free (90 days)
- Web Service: Free (with sleep)
Total: $0/month
```

### Production (Published App)
```
Render Starter:
- PostgreSQL: $7/month (persistent)
- Web Service: $7/month (always-on)
Total: $14/month

OR

Railway:
- Everything included: ~$10/month
```

## 📊 Deployment Timeline

- ⏱️ Setup Render account: 2 minutes
- ⏱️ Create database: 3 minutes
- ⏱️ Deploy server: 5 minutes
- ⏱️ Configure environment: 5 minutes
- ⏱️ Test API: 3 minutes
- ⏱️ Update client: 2 minutes
- ⏱️ Build for Play Store: 10 minutes

**Total: ~30 minutes** 🚀

## 🎯 Next Steps After Deployment

1. ✅ Monitor Render dashboard for errors
2. ✅ Set up database backups (if using paid tier)
3. ✅ Add uptime monitoring (UptimeRobot, etc.)
4. ✅ Complete Play Store listing
5. ✅ Submit app for review
6. ✅ Celebrate! 🎉

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Play Store Publishing](https://support.google.com/googleplay/android-developer)

---

**Need Help?** Open the appropriate guide:
- 🏃 Quick start: `QUICK_DEPLOY.md`
- 📖 Detailed guide: `DEPLOYMENT_GUIDE.md`
- ✅ Step-by-step: `DEPLOYMENT_CHECKLIST.md`
