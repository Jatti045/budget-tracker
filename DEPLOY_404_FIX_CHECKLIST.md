# ✅ Deploy 404 Fix to Vercel - Checklist

## Pre-Deployment Verification

- [ ] Read [VERCEL_404_RESOLUTION.md](VERCEL_404_RESOLUTION.md) to understand what was fixed
- [ ] Verify files exist locally:

  - [ ] `server/api/index.ts` exists
  - [ ] `server/src/server.ts` updated with VERCEL check
  - [ ] `server/vercel.json` points to `api/index.ts`

- [ ] Test locally first:
  ```bash
  cd server
  npm run dev
  # Visit http://localhost:3000/api/health
  # Should return JSON with "status": "ok"
  ```

## Deploy to Vercel

### Option A: Via Git Push (Recommended)

```bash
# From project root
git status                  # Check what changed
git add server/             # Stage the changes
git commit -m "Fix Vercel 404: Use api/index.ts as serverless handler"
git push                    # Push to GitHub
```

- [ ] Changes pushed to GitHub
- [ ] Vercel detected new deployment
- [ ] Waiting for build to complete (1-2 minutes)

### Option B: Via CLI

```bash
vercel --prod
```

- [ ] Deployment started via CLI
- [ ] Watching deployment progress

## Post-Deployment Verification

Once Vercel finishes deploying:

### Step 1: Check Health Endpoint

```bash
# Replace YOUR-PROJECT-NAME with your actual project
curl https://YOUR-PROJECT-NAME.vercel.app/api/health

# Expected response (should see "ok"):
# {"status":"ok","database":"connected",...}
```

- [ ] Health endpoint returns 200 OK
- [ ] Response includes `"status": "ok"`
- [ ] Response includes `"database": "connected"`

### Step 2: Check Vercel Logs

```bash
vercel logs
```

- [ ] No build errors
- [ ] No runtime errors
- [ ] See your startup logs

### Step 3: Check Environment Variables

```bash
vercel env list
```

- [ ] `DATABASE_URL` is set
- [ ] `JWT_SECRET_KEY` is set
- [ ] `NODE_ENV` is set to `production`
- [ ] `TRUST_PROXY` is set to `1`
- [ ] `ALLOWED_ORIGINS` is set

### Step 4: Test Key Endpoints

Test from a browser console or Postman:

```javascript
// Test 1: Health Check
fetch('https://YOUR-PROJECT-NAME.vercel.app/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
  // Should see: {status: "ok", database: "connected", ...}

// Test 2: User endpoints (if available)
fetch('https://YOUR-PROJECT-NAME.vercel.app/api/user/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({...})
})
```

- [ ] Health endpoint works (GET /api/health)
- [ ] User endpoints respond (no 404)
- [ ] Budget endpoints respond (no 404)
- [ ] Transaction endpoints respond (no 404)

### Step 5: Update Frontend

Update your client's API base URL:

```typescript
// client/config/apiClient.ts (or similar)
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://YOUR-PROJECT-NAME.vercel.app/api"
    : "http://localhost:3000/api";
```

- [ ] Frontend API URL updated
- [ ] Frontend redeployed or rebuilt

### Step 6: Test Full Integration

From your app:

- [ ] User registration works
- [ ] User login works
- [ ] Budget operations work
- [ ] Transaction operations work
- [ ] No CORS errors in console
- [ ] No 404 errors

## If Something Goes Wrong

### 404 Still Appears

1. **Check the files:**

   ```bash
   # Verify files exist
   ls -la server/api/index.ts
   ls -la server/src/server.ts
   cat server/vercel.json
   ```

2. **Check logs:**

   ```bash
   vercel logs --tail  # Watch in real-time
   ```

3. **Rebuild:**
   ```bash
   vercel --prod --force
   ```

### Build Fails

1. **Check build output:**

   ```bash
   vercel logs
   ```

2. **Test build locally:**

   ```bash
   cd server
   npm run build
   ```

3. **Check TypeScript:**
   ```bash
   cd server
   npx tsc --noEmit
   ```

### Database Connection Error

1. **Verify DATABASE_URL:**

   ```bash
   vercel env list
   ```

2. **Check connection string format:**

   - Should be: `postgresql://user:password@host:port/database`

3. **Check database allows Vercel IPs:**
   - Go to your database provider dashboard
   - Whitelist Vercel's IP range or allow all connections

### Missing Environment Variables

1. **Add them to Vercel:**

   - Dashboard → Settings → Environment Variables

2. **Redeploy after adding:**
   ```bash
   vercel --prod
   ```

## Success Indicators

You'll know it's working when:

✅ Health endpoint returns `{"status":"ok","database":"connected"}`  
✅ All API routes respond (no 404)  
✅ Database queries work  
✅ No errors in Vercel logs  
✅ Frontend connects without CORS errors  
✅ User registration/login works

---

## 🎯 Summary

| Step             | Status | Command               |
| ---------------- | ------ | --------------------- |
| Test locally     |        | `npm run dev`         |
| Commit changes   |        | `git commit`          |
| Push to GitHub   |        | `git push`            |
| Vercel deploys   | Auto   | Check dashboard       |
| Test health      |        | `curl .../api/health` |
| Check logs       |        | `vercel logs`         |
| Update frontend  |        | Update API_URL        |
| Integration test |        | Test in app           |

---

## 📞 Need Help?

- **Don't understand the fix?** → Read [VERCEL_404_FIX_EXPLAINED.md](VERCEL_404_FIX_EXPLAINED.md)
- **Quick summary?** → Read [VERCEL_404_QUICK_FIX.md](VERCEL_404_QUICK_FIX.md)
- **Full context?** → Read [VERCEL_404_RESOLUTION.md](VERCEL_404_RESOLUTION.md)
- **Check logs?** → Run `vercel logs`

---

**Once all checks pass, your backend is production-ready!** 🚀
