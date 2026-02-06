# Deployment Guide

## Prerequisites

- Node.js 18+
- GitHub account
- Vercel account (free)

---

## Step 1: Local Setup

```bash
# Create project
npm create vite@latest ape-academy -- --template react
cd ape-academy
npm install

# Remove default files
rm src/App.css src/index.css src/App.jsx
```

### Files to create/edit:

**src/main.jsx**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**src/App.jsx**
Copy the full App.jsx code from the project.

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#111827" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>Ape Academy</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #111827; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Step 2: Test Locally

```bash
npm run dev
```

Open http://localhost:5173 (or whichever port Vite assigns).

---

## Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "Ape Academy initial commit"
```

Create a new repo at https://github.com/new called `ape-academy` (don't initialize with README).

```bash
git remote add origin https://github.com/YOUR_USERNAME/ape-academy.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `ape-academy` repository
5. Vercel auto-detects Vite — just click **Deploy**
6. Wait ~60 seconds
7. Your app is live at `ape-academy.vercel.app`

---

## Step 5: Custom Domain (Optional)

### In Vercel:
1. Go to Project → **Settings** → **Domains**
2. Add your subdomain: `ape.yourdomain.com`
3. Vercel will show the required DNS record

### In GoDaddy (or your DNS provider):
1. Go to **DNS Management**
2. Add a **CNAME** record:
   - **Type:** CNAME
   - **Name:** `ape` (or your subdomain)
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 600 (or default)
3. Save and wait 5-10 minutes for DNS propagation

### Verify:
Visit `ape.yourdomain.com` — should load your app with HTTPS auto-configured.

---

## Updating the App

After making changes locally:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel automatically redeploys on every push to `main`.

---

## Troubleshooting

### Build fails on Vercel
- Check that `npm run build` works locally first
- Verify no TypeScript errors (we're using plain JSX)

### Custom domain not working
- DNS propagation can take up to 48 hours (usually 5-10 min)
- Verify CNAME record is correct in GoDaddy
- Check Vercel domain settings for any errors

### App not updating after push
- Vercel dashboard shows deployment status
- Check for build errors in Vercel logs