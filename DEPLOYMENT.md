# DarkPDF Analytics - Deployment Guide

## Quick Deploy to Railway (Recommended - FREE)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (easiest)

### Step 2: Deploy Backend
1. Click "Deploy from GitHub repo"
2. Select your `darkmode` repository
3. Railway will auto-detect Node.js and deploy!

### Step 3: Get Your URL
After deployment, Railway gives you a URL like:
```
https://darkpdf-analytics-production.up.railway.app
```

### Step 4: Update Your Code
Update `script.js` line 406:
```javascript
// Change from:
const API_BASE_URL = 'http://localhost:3001/api';

// To your Railway URL:
const API_BASE_URL = 'https://YOUR-APP.railway.app/api';
```

### Step 5: Push to GitHub
```bash
git add .
git commit -m "Update API URL for production"
git push
```

✅ **Done!** Your GitHub Pages site will now have real-time analytics!

---

## Alternative: Deploy to Render (Also FREE)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Settings:
   - **Name**: darkpdf-analytics
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Get Your URL
Render gives you:
```
https://darkpdf-analytics.onrender.com
```

### Step 4: Update Code
Same as Railway - update `script.js` with your Render URL.

---

## Important Notes

⚠️ **Free tier limitations:**
- Railway: App sleeps after 5 mins of inactivity (wakes in ~1 second)
- Render: App sleeps after 15 mins of inactivity (wakes in ~30 seconds)

💡 **Pro tip:** First visitor might see slight delay as server wakes up, then it's instant!

🔒 **Data persistence:** Your `analytics-data.json` stays on the server, counts won't reset!

---

## Testing After Deployment

1. Visit your GitHub Pages: `https://saimbuilds.github.io/dark-pdf-convertor/`
2. Open browser console (F12)
3. Should see: "API response successful"
4. Visitor count increases!
5. Like button syncs across devices!

Your 40k visitor count and 1020 likes will carry over! 🚀
