# 🎯 Quick Deployment Guide for BudgetTracker

**Goal**: Get your app hosted and ready for Play Store in 30 minutes!

---

## 🚀 Option 1: Render (Recommended - Easiest)

### 5-Minute Setup

1. **Create Render Account**

   - Go to https://render.com
   - Sign up with GitHub

2. **Deploy Database** (2 minutes)

   - Dashboard → New → PostgreSQL
   - Name: `budgettracker-db`
   - Region: Oregon (or closest to users)
   - Plan: Free
   - Click "Create Database"
   - **📋 COPY the Internal Database URL** (starts with `postgresql://`)

3. **Deploy API Server** (3 minutes)

   - Dashboard → New → Web Service
   - Connect your GitHub repo: `Jatti045/budgee-react-native`
   - Settings:

     - Name: `budgettracker-api`
     - Root Directory: `server`
     - Runtime: Node
     - Build: `npm ci && npm run build && npx prisma migrate deploy`
     - Start: `npm start`
     - Plan: Free

   - Environment Variables (click "Advanced"):
     ```
     DATABASE_URL=<paste Internal URL from step 2>
     NODE_ENV=production
     PORT=3000
     TRUST_PROXY=1
     JWT_SECRET_KEY=<generate below>
     CLOUDINARY_CLOUD_NAME=<your cloudinary name>
     CLOUDINARY_API_KEY=<your cloudinary key>
     CLOUDINARY_API_SECRET=<your cloudinary secret>
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=<your email>
     EMAIL_PASS=<your app password>
     ALLOWED_ORIGINS=*
     ```

4. **Generate JWT Secret**:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Click "Create Web Service"** - Wait 2-3 minutes for deployment

6. **Get Your API URL**:
   - Copy URL like: `https://budgettracker-api.onrender.com`

---

## 📱 Update Your App

1. **Create production environment file**:

   ```bash
   cd client
   echo EXPO_PUBLIC_API_BASE_URL=https://budgettracker-api.onrender.com/api > .env
   ```

2. **Test locally first**:

   ```bash
   npx expo start
   # Test registration, login, budgets, transactions
   ```

3. **Build for Play Store**:
   ```bash
   eas build --platform android --profile production
   ```

---

## ✅ Quick Test

```bash
# 1. Test server health
curl https://budgettracker-api.onrender.com/api/health

# 2. Test registration
curl -X POST https://budgettracker-api.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!","username":"testuser"}'

# 3. If you get responses, you're good to go! ✅
```

---

## 🎮 Alternative: Railway (Even Simpler!)

1. Go to https://railway.app
2. Sign in with GitHub
3. New Project → Deploy from GitHub → Select your repo
4. Railway auto-detects Node.js
5. Add PostgreSQL from services
6. Set environment variables (same as above)
7. Done! Railway gives you a URL automatically

**Cost**: $5/month usage included free

---

## 💰 Cost Comparison

| Service     | Free Tier               | Paid      | Best For      |
| ----------- | ----------------------- | --------- | ------------- |
| **Render**  | Free (with limitations) | $14/mo    | Learning, MVP |
| **Railway** | $5 credit/mo            | ~$10/mo   | Small apps    |
| **Fly.io**  | Free allowance          | Pay-as-go | Scaling       |

---

## 🐛 Common Issues

### "Build failed"

- Check `server/` has `package.json`
- Verify Root Directory is set to `server`
- Check build logs in Render dashboard

### "Database connection failed"

- Use **Internal** Database URL (not External)
- Verify `TRUST_PROXY=1` is set
- Ensure database and web service in same region

### "First request slow"

- Free tier sleeps after 15 min
- First request takes 30-60 sec to wake
- Consider paid tier ($7/mo) for always-on

---

## 📋 Environment Variables You Need

### Required for App to Work:

- ✅ `DATABASE_URL` - From Render database
- ✅ `JWT_SECRET_KEY` - Generate random 32+ chars
- ✅ `NODE_ENV=production`
- ✅ `PORT=3000`
- ✅ `TRUST_PROXY=1`

### Required for Features:

- 📸 `CLOUDINARY_*` - For profile pictures
- 📧 `EMAIL_*` - For password reset
- 🔒 `ARCJET_*` - For security (optional)

### Get Cloudinary (Free):

1. https://cloudinary.com/users/register_free
2. Dashboard → Copy Cloud Name, API Key, API Secret

### Get Gmail App Password:

1. Google Account → Security
2. 2-Step Verification (enable if not already)
3. App Passwords → Generate new
4. Use in `EMAIL_PASS`

---

## 🎊 You're Done!

Your server is live at: `https://your-app.onrender.com`

**Next Steps**:

1. ✅ Test all endpoints work
2. ✅ Update client with production URL
3. ✅ Build APK/AAB with EAS
4. ✅ Submit to Play Store

---

## 📞 Need Help?

Check full guides:

- 📖 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete details
- ✅ [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist
- 🎯 [PLAY_STORE_SETUP.md](./client/PLAY_STORE_SETUP.md) - Play Store submission

---

**Estimated Time**:

- ⏱️ Setup hosting: 10 minutes
- ⏱️ Test API: 5 minutes
- ⏱️ Update & build app: 15 minutes
- **Total: ~30 minutes** 🚀
