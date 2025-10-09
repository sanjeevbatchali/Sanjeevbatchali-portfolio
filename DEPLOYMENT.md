# Deployment Guide - Sanjeev Batchali Portfolio

This guide explains how to deploy your portfolio website to Netlify, making it completely independent of Replit.

## 📋 Prerequisites

- GitHub account (you already have this connected!)
- Netlify account (free tier is perfect)
- Your code is already on GitHub: https://github.com/sanjeevbatchali/Sanjeevbatchali-portfolio

## 🚀 Option 1: Deploy via GitHub (Recommended)

This method automatically deploys your site whenever you push changes to GitHub.

### Step 1: Sign Up for Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up" and choose "Sign up with GitHub"
3. Authorize Netlify to access your GitHub account

### Step 2: Create a New Site
1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub" as your Git provider
3. Find and select your repository: `sanjeevbatchali/Sanjeevbatchali-portfolio`
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Node version**: 18 (should auto-detect from netlify.toml)
5. Click "Deploy site"

### Step 3: Wait for Deployment
- Netlify will automatically build and deploy your site
- This takes 2-3 minutes for the first deployment
- You'll get a free URL like: `https://your-site-name.netlify.app`

### Step 4: Custom Domain (Optional)
1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Follow instructions to point your domain to Netlify

### 🎉 That's it! Your site is now live and will auto-deploy when you push to GitHub.

---

## 📦 Option 2: Manual Deployment (Drag & Drop)

Perfect if you just want to deploy the current version without GitHub automation.

### Step 1: Prepare Your Build
Your `dist/public` folder is already built and ready to deploy!

### Step 2: Deploy to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Drag the `dist/public` folder onto the Netlify dashboard
4. Wait 30 seconds for deployment
5. Your site is live!

### Step 3: Update Your Site
When you make changes:
1. Run `npm run build` on Replit (or locally)
2. Download the new `dist/public` folder
3. Drag it to your Netlify site to update

---

## 🔄 Updating Your Live Site

### If Using GitHub Auto-Deploy:
1. Make changes in Replit (or locally)
2. Commit your changes
3. Push to GitHub: `git push origin main`
4. Netlify automatically rebuilds and deploys (takes 2-3 minutes)

### If Using Manual Deployment:
1. Run `npm run build`
2. Download `dist/public` folder
3. Drag to Netlify site dashboard

---

## 🛠️ Working Without Replit

You can develop this project completely independently:

### Setup Local Development:
1. Install [Node.js](https://nodejs.org/) (version 18 or higher)
2. Clone your repository:
   ```bash
   git clone https://github.com/sanjeevbatchali/Sanjeevbatchali-portfolio.git
   cd Sanjeevbatchali-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

Your site will run on `http://localhost:5000`

---

## 📁 Project Structure

```
dist/public/          ← Deploy this folder (production build)
├── index.html
├── assets/           ← JavaScript, CSS, images
├── _headers          ← Security headers
└── (other files)

netlify.toml          ← Netlify configuration
client/               ← Source code (React components)
server/               ← Express server (for development only)
```

---

## ✅ Deployment Checklist

- [x] GitHub repository connected
- [x] `netlify.toml` configuration created
- [x] `_headers` file for security
- [x] Production build ready in `dist/public`
- [ ] Netlify account created
- [ ] Site deployed and live
- [ ] Custom domain configured (optional)

---

## 🆘 Troubleshooting

### Build Fails on Netlify
- Check that Node version is 18 in build settings
- Ensure `netlify.toml` is in the root directory
- Check build logs for specific errors

### Pages Show 404 on Refresh
- Make sure the redirect rule in `netlify.toml` is present
- Check publish directory is set to `dist/public`

### Images Not Loading
- Ensure `_headers` file includes Unsplash CDN in CSP
- Check that images are in `dist/public/assets/`

### Site Not Updating
- Clear Netlify cache: Site settings → Build & deploy → Clear cache
- Trigger manual deploy: Deploys → Trigger deploy → Deploy site

---

## 💡 Pro Tips

1. **Environment Variables**: If you add API keys later, use Netlify's environment variables feature
2. **Preview Deploys**: Enable deploy previews for pull requests
3. **Analytics**: Netlify offers free analytics to track visitors
4. **Forms**: Netlify can handle contact forms without backend code

---

## 🔗 Useful Links

- Your GitHub Repo: https://github.com/sanjeevbatchali/Sanjeevbatchali-portfolio
- Netlify Docs: https://docs.netlify.com
- Node.js Downloads: https://nodejs.org

---

Need help? The configuration files are already set up, so deployment should be straightforward!
