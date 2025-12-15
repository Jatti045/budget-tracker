# ⚡ Vercel Deployment - Quick Start

## 1️⃣ Create Database (5 min)

Choose one:

- **Supabase:** https://supabase.com → New project → Copy connection string
- **Railway:** https://railway.app → New PostgreSQL → Copy DATABASE_URL
- **Render:** https://render.com → New PostgreSQL → Copy connection string

## 2️⃣ Generate Secrets (1 min)

```bash
openssl rand -base64 32  # Copy output → JWT_SECRET_KEY
```

## 3️⃣ Deploy to Vercel (3 min)

**Method A: Dashboard (Recommended)**

1. Go to https://vercel.com/dashboard
2. "Add New" → "Project" → Import GitHub repo
3. Build auto-configured ✓

**Method B: CLI**

```bash
npm install -g vercel
vercel login
cd server && vercel --prod
```

## 4️⃣ Set Environment Variables (2 min)

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable          | Value               |
| ----------------- | ------------------- |
| `DATABASE_URL`    | Your PostgreSQL URL |
| `JWT_SECRET_KEY`  | From step 2         |
| `NODE_ENV`        | `production`        |
| `TRUST_PROXY`     | `1`                 |
| `ALLOWED_ORIGINS` | Your frontend URL   |

After adding, **Vercel redeploys automatically**.

## 5️⃣ Test (1 min)

```bash
# Test health endpoint
curl https://YOUR-APP.vercel.app/api/health

# Should return:
# {"status":"ok","database":"connected",...}
```

## 6️⃣ Run Migrations (2 min)

```bash
npx prisma migrate deploy
```

## 7️⃣ Update Frontend

In `client/config/apiClient.ts`:

```typescript
const API_URL = "https://YOUR-APP.vercel.app/api";
```

## ✅ Done!

Your backend is live. Test it by:

1. User registration
2. Login
3. Creating budget/transactions

## 📚 Need Help?

- Detailed guide: [VERCEL_SETUP.md](server/VERCEL_SETUP.md)
- Checklist: [DEPLOYMENT_CHECKLIST_VERCEL.md](server/DEPLOYMENT_CHECKLIST_VERCEL.md)
- Full summary: [VERCEL_CONFIG_SUMMARY.md](VERCEL_CONFIG_SUMMARY.md)
- Validate setup: `bash validate-vercel-config.sh`

## 🔍 Monitor After Deploy

```bash
vercel logs                # View logs
vercel env list           # Check variables
vercel --prod            # Redeploy if needed
```

**Total Time:** ~15 minutes to production ✨
