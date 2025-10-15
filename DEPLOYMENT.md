# Netlify Deployment Guide - Sanjeev Batchali Portfolio

This guide explains how to deploy your portfolio website to Netlify successfully.

## 📁 Your Build Structure (Important!)

Your website is built with the following structure:
```
Repository Root/
├── netlify.toml          ← Netlify configuration (already set up!)
├── dist/
│   └── public/           ← THIS is what Netlify will deploy
│       ├── index.html    ← Your main page
│       ├── _headers      ← Security headers
│       └── assets/       ← JavaScript, CSS, images
```

**Key Point**: The `netlify.toml` file is already configured to publish from `dist/public`, so Netlify knows where to find your `index.html`!

---

## 🚀 Option 1: Deploy via GitHub (Recommended - Automatic Updates)

This method automatically deploys your site whenever you push changes to GitHub.

### Step 1: Sign Up for Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Sign up" and choose **"Continue with GitHub"**
3. Authorize Netlify to access your GitHub account

### Step 2: Import Your Repository
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Find and select your repository: `sanjeevbatchali/Sanjeevbatchali-portfolio`
4. **Build Settings** (Netlify should auto-detect these from `netlify.toml`):
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Node version**: 18 (auto-detected from netlify.toml)

5. Click **"Deploy [site-name]"**

### Step 3: Wait for First Deployment
- Netlify will run `npm run build` to create the `dist/public` folder
- Build takes 2-3 minutes for first deployment
- You'll get a free URL: `https://[random-name].netlify.app`

### Step 4: Rename Your Site (Optional)
1. Go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Choose a custom subdomain: `https://sanjeev-portfolio.netlify.app`

### 🎉 Done! Your site auto-deploys when you push to GitHub!

---

## 📦 Option 2: Manual Deployment (Drag & Drop)

Perfect if you want to deploy the current version without GitHub automation.

### Step 1: Ensure Build is Ready
Your `dist/public` folder already contains:
- ✅ index.html
- ✅ _headers (security)
- ✅ assets/ (JavaScript, CSS, images)

### Step 2: Deploy to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. **Important**: Drag the `dist/public` folder (NOT the entire repository) onto the dashboard
4. Drop it in the "Want to deploy a new site without connecting to Git?" area
5. Wait 30 seconds for deployment
6. Your site is live!

### Step 3: Update Your Site (When You Make Changes)
1. Run `npm run build` in Replit
2. Download the `dist/public` folder
3. Go to your Netlify site dashboard
4. Click **"Deploys"** tab
5. Drag the new `dist/public` folder to update

---

## 🔄 Updating Your Live Site

### If Using GitHub Auto-Deploy (Option 1):
1. Make changes in your code
2. Commit your changes: `git add . && git commit -m "Update site"`
3. Push to GitHub: `git push origin main`
4. Netlify automatically rebuilds and deploys (2-3 minutes)

### If Using Manual Deployment (Option 2):
1. Make changes in your code
2. Run `npm run build`
3. Download `dist/public` folder
4. Drag to Netlify site's Deploys tab

---

## ✅ Deployment Checklist

**Before deploying, verify:**
- [x] `netlify.toml` exists in repository root
- [x] `netlify.toml` has `publish = "dist/public"`
- [x] `npm run build` completes successfully
- [x] `dist/public/index.html` exists
- [x] `dist/public/_headers` exists
- [x] `dist/public/assets/` contains JavaScript and CSS files

**After deploying:**
- [ ] Netlify account created
- [ ] Site deployed and live
- [ ] Custom domain configured (optional)

---

## 🆘 Troubleshooting

### ❌ "Page Not Found" / Netlify Can't Find index.html

**Solution 1**: Verify your publish directory
1. In Netlify, go to **Site settings** → **Build & deploy** → **Build settings**
2. Make sure **Publish directory** is set to: `dist/public`
3. If it's wrong, update it and click **"Save"**
4. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

**Solution 2**: Verify your build completed
1. Check **Deploys** tab → Click your latest deploy
2. Look at the **Deploy log**
3. Make sure you see: `✓ built in X.XXs` with no errors
4. Verify it says: `Publishing to dist/public`

**Solution 3**: Manual deployment issue
- If dragging files, make sure you drag **only the `dist/public` folder**
- Do NOT drag the entire repository or the `dist` folder - only `dist/public`!

### ❌ Build Fails on Netlify

**Check Node Version**:
1. **Site settings** → **Build & deploy** → **Environment**
2. Make sure Node version is **18** or higher
3. Add environment variable if needed: `NODE_VERSION = 18`

**Check Build Command**:
1. **Site settings** → **Build & deploy** → **Build settings**
2. Build command should be: `npm run build`
3. If missing, add it and redeploy

### ❌ Pages Show 404 When You Refresh

This is normal for Single Page Apps! The fix is already in your `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

If you still see 404s, make sure the `netlify.toml` file is in your repository root.

### ❌ Images Not Loading (Unsplash)

Your `_headers` file includes Unsplash CDN. If images don't load:
1. Check that `dist/public/_headers` exists
2. Verify it includes: `img-src 'self' data: https://images.unsplash.com`
3. Trigger a fresh deploy

### ❌ Rocket Cursor Not Working

Make sure JavaScript files loaded correctly:
1. Open browser console (F12)
2. Check for any errors
3. Verify `assets/index-[hash].js` is loading

---

## 💡 Pro Tips

1. **Custom Domain**: 
   - Go to **Domain management** → **Add custom domain**
   - Point your domain's DNS to Netlify (they provide instructions)

2. **HTTPS**: Automatically enabled! Netlify provides free SSL certificates

3. **Preview Deploys**: 
   - Enable in **Build & deploy** → **Deploy contexts**
   - Get preview URLs for pull requests

4. **Environment Variables**: 
   - If you add API keys later: **Site settings** → **Environment variables**

5. **Analytics**: 
   - Free analytics available in **Analytics** tab

6. **Clear Cache**: 
   - If changes don't appear: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 🔗 Quick Links

- **Your GitHub Repo**: https://github.com/sanjeevbatchali/Sanjeevbatchali-portfolio
- **Netlify Dashboard**: https://app.netlify.com
- **Netlify Docs**: https://docs.netlify.com

---

## 📞 Need Help?

If you still have issues:

1. **Check deploy logs**: Deploys tab → Click latest deploy → View deploy log
2. **Verify publish directory**: Should be `dist/public` (not `dist` or root)
3. **Test build locally**: Run `npm run build` and verify `dist/public/index.html` exists
4. **Contact Netlify support**: They're very responsive and helpful!

---

**Remember**: Your `netlify.toml` is already configured correctly! Netlify knows to look for `index.html` in `dist/public` - you don't need to move files to the root. ✨
