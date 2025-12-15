# Vercel Deployment Checklist

## Pre-Deployment

- [ ] Verify local build works: `npm run build` (from server directory)
- [ ] Test health endpoint locally: `npm run dev` then visit `http://localhost:3000/api/health`
- [ ] Commit all changes to Git
- [ ] GitHub repository is linked to Vercel

## Environment Variables Setup

Set these in Vercel Dashboard (Settings → Environment Variables):

**Required:**

- [ ] `DATABASE_URL` - PostgreSQL connection string from Supabase/Railway/Render
- [ ] `JWT_SECRET_KEY` - Generate: `openssl rand -base64 32`
- [ ] `NODE_ENV` - Set to `production`
- [ ] `TRUST_PROXY` - Set to `1`
- [ ] `ALLOWED_ORIGINS` - Your frontend domain(s)

**Recommended:**

- [ ] `EMAIL_HOST` - For password reset emails
- [ ] `EMAIL_USER` - SMTP username
- [ ] `EMAIL_PASS` - SMTP password
- [ ] `EMAIL_FROM` - Sender email

**Optional (if used):**

- [ ] `ARCJET_KEY` - Security service
- [ ] `CLOUDINARY_CLOUD_NAME` - Image uploads
- [ ] `CLOUDINARY_API_KEY` - Image uploads
- [ ] `CLOUDINARY_API_SECRET` - Image uploads

## Deployment

**Option 1: Vercel Dashboard**

- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository
- [ ] Build settings auto-configured
- [ ] Add environment variables
- [ ] Click "Deploy"

**Option 2: Vercel CLI**

- [ ] Install: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `cd server && vercel --prod`

## Post-Deployment

- [ ] Test health endpoint: `curl https://your-app.vercel.app/api/health`
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Update frontend API base URL to production
- [ ] Test user registration/login endpoints
- [ ] Verify email functionality (if configured)
- [ ] Check Vercel logs for errors: `vercel logs`
- [ ] Monitor database performance

## Troubleshooting

If deployment fails:

1. Check build output in Vercel Dashboard
2. Verify TypeScript compilation: `cd server && npm run build`
3. Verify all environment variables are set
4. Test database connection locally
5. Check `vercel logs` for runtime errors

If health check fails:

1. Verify `DATABASE_URL` is accessible from Vercel
2. Check database IP whitelist/firewall rules
3. Confirm TRUST_PROXY=1 is set
4. Review Prisma connection settings

If API calls fail:

1. Check CORS: Update `ALLOWED_ORIGINS`
2. Verify frontend API base URL is correct
3. Check JWT secret is consistent between deployments
4. Review API endpoint logs

## Useful Commands

```bash
# View all environment variables
vercel env list

# View live logs
vercel logs

# Redeploy
vercel --prod

# Check function size
vercel inspect
```

## Documentation

- Detailed guide: [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- Original guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- Configuration: [vercel.json](./vercel.json)
