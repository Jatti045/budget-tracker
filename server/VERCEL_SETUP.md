# Vercel Backend Deployment - Complete Setup Guide

## Quick Overview

Your Express/TypeScript backend is now configured for Vercel deployment with automatic builds and TypeScript compilation.

## Step-by-Step Setup

### 1. **Prerequisites**

- Vercel account (free tier works)
- GitHub repository linked to Vercel (or use Vercel CLI)
- PostgreSQL database (Supabase, Railway, Render, or similar)

### 2. **Deploy to Vercel (Option A: Web Dashboard)**

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the root of your project (Budget Tracker)
5. Configure build settings:

   - **Framework Preset:** None (Custom)
   - **Build Command:** `cd server && npm run build`
   - **Output Directory:** `server/dist`
   - **Install Command:** `npm install`
   - **Start Command:** `node dist/server.js` (Vercel handles this automatically)

6. Add Environment Variables (Settings → Environment Variables):

   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET_KEY` - Generate a strong random string
   - `NODE_ENV` - Set to `production`
   - `TRUST_PROXY` - Set to `1`
   - `PORT` - Set to `3000`
   - `HOST` - Set to `0.0.0.0`
   - `ALLOWED_ORIGINS` - Your frontend URL (e.g., `https://yourdomain.com`)
   - Optional: `ARCJET_KEY`, `ARCJET_MODE`, email/Cloudinary credentials

7. Click "Deploy"

### 3. **Deploy to Vercel (Option B: CLI)**

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy from the server directory
cd server
vercel --prod

# Or for a preview deployment
vercel
```

### 4. **Database Setup**

Your database needs to be accessible from Vercel. Recommended options:

**Option A: Supabase (PostgreSQL)**

```
Free tier includes 500 MB storage
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from project settings
4. Set as DATABASE_URL in Vercel environment variables
```

**Option B: Railway**

```
Free tier includes $5/month credits
1. Go to https://railway.app
2. Create PostgreSQL plugin
3. Copy DATABASE_URL
4. Set in Vercel environment variables
```

**Option C: Render**

```
Free tier available (auto-pauses after 15 minutes of inactivity)
1. Go to https://render.com
2. Create PostgreSQL service
3. Copy connection string
4. Set in Vercel environment variables
```

### 5. **Initialize Database with Migrations**

Run this once after deployment:

```bash
# From your local machine with database access
npx prisma migrate deploy

# Or use Prisma's db push (careful with production!)
npx prisma db push
```

### 6. **Verify Deployment**

Test your health endpoint:

```bash
curl https://your-project.vercel.app/api/health
```

Expected response:

```json
{
  "status": "ok",
  "database": "connected",
  "version": "1.0.0",
  "timestamp": "2025-12-15T10:30:00.000Z"
}
```

### 7. **Configure Frontend (Expo/React Native)**

In your client's API configuration, update the base URL:

```typescript
// client/config/apiClient.ts
const API_URL = "https://your-project.vercel.app/api";
```

Update CORS in Vercel environment variables:

- `ALLOWED_ORIGINS` should include your frontend domain/app URL

## Important Configuration Notes

### Environment Variables Required

| Variable          | Description                             | Example                                  |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string            | `postgresql://user:pass@host:5432/db`    |
| `JWT_SECRET_KEY`  | Secret for JWT tokens                   | Generate with: `openssl rand -base64 32` |
| `NODE_ENV`        | Environment mode                        | `production`                             |
| `TRUST_PROXY`     | Trust proxy headers (needed for Vercel) | `1`                                      |
| `ALLOWED_ORIGINS` | CORS allowed domains                    | `https://yourdomain.com`                 |

### Optional Environment Variables

| Variable                | Description                                 |
| ----------------------- | ------------------------------------------- |
| `ARCJET_KEY`            | Security API key (if using Arcjet)          |
| `ARCJET_MODE`           | `OFF`, `DRY_RUN`, or `LIVE`                 |
| `EMAIL_HOST`            | SMTP server for password resets             |
| `EMAIL_USER`            | SMTP username                               |
| `EMAIL_PASS`            | SMTP password (Gmail requires app password) |
| `EMAIL_FROM`            | Sender email address                        |
| `CLOUDINARY_CLOUD_NAME` | For image uploads                           |
| `CLOUDINARY_API_KEY`    | For image uploads                           |
| `CLOUDINARY_API_SECRET` | For image uploads                           |

## Monitoring & Troubleshooting

### View Logs

```bash
# Using Vercel CLI
vercel logs

# In Vercel Dashboard: Deployments → Select deployment → Function Logs
```

### Common Issues

**Build Failures:**

- Check that `npm run build` works locally
- Verify TypeScript compilation: `cd server && npm run build`
- Ensure Prisma schema is valid: `prisma validate`

**Database Connection Errors:**

- Verify `DATABASE_URL` format is correct
- Check database allows connections from Vercel IPs
- Test connection locally: `npx prisma db execute --stdin < connection_test.sql`
- Check if IP whitelisting is needed on your database provider

**Missing Environment Variables:**

- Verify all required variables are set in Vercel dashboard
- Redeploy after adding variables: `vercel --prod`
- Check with: `vercel env list`

**CORS Errors:**

- Update `ALLOWED_ORIGINS` with your frontend URL
- Format: comma-separated URLs (no trailing slashes)
- Example: `https://app.example.com,https://www.example.com`

## Performance Tips

1. **Database Connection Pooling:**

   - Add `?connection_limit=1` to Prisma connection string for Vercel:

   ```
   DATABASE_URL="postgresql://user:pass@host/db?connection_limit=1"
   ```

2. **Disable Prisma Accelerate (if not needed):**

   - Vercel has built-in caching, Accelerate adds cost

3. **Monitor Cold Starts:**
   - Vercel may cold start your functions after 10+ minutes of inactivity
   - This adds 0.5-2 second delay on first request

## Next Steps

1. ✅ Update `vercel.json` - **Done**
2. Deploy to Vercel (use dashboard or CLI)
3. Add environment variables to Vercel dashboard
4. Run database migrations
5. Test health endpoint
6. Update frontend API base URL
7. Test full integration

## Support

- Vercel Docs: https://vercel.com/docs
- Express on Vercel: https://vercel.com/guides/nodejs
- Prisma Docs: https://www.prisma.io/docs
- Check logs in Vercel Dashboard for detailed error messages
