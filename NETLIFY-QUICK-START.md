# 🚀 Netlify Quick Start - 2 Minute Guide

## Your Setup is Already Complete! ✅

Everything is configured correctly:
- ✅ `netlify.toml` in root directory
- ✅ Build outputs to `dist/public/`
- ✅ `index.html` at `dist/public/index.html`
- ✅ Security headers configured
- ✅ Build command: `npm run build`

## Deploy in 2 Minutes

### Method 1: GitHub Auto-Deploy (Best!)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select `sanjeevbatchali/Sanjeevbatchali-portfolio`
4. Netlify auto-detects settings from `netlify.toml`
5. Click **"Deploy"**
6. ✨ Done! Auto-deploys on every git push

### Method 2: Manual Drag & Drop

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag **the `dist/public` folder** to the dashboard
3. ✨ Done! 

## ⚠️ Important

**Publish Directory**: Your `netlify.toml` is set to `dist/public` (not root, not `dist`)

This is correct! Netlify will find `index.html` at `dist/public/index.html`

## 🆘 If "index.html Not Found"

1. **Check publish directory** in Netlify:
   - Site Settings → Build & deploy → Build settings
   - Should be: `dist/public`

2. **For manual deployment**:
   - Drag only the `dist/public` folder (not the whole repo!)

3. **For GitHub deployment**:
   - Verify build completes successfully in deploy logs
   - Check that `netlify.toml` is in repository root

---

**Full Guide**: See `DEPLOYMENT.md` for detailed instructions and troubleshooting!
