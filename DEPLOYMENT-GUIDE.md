# Production Deployment Guide

## 🚀 Deploying Your Admin Panel to Production

This guide walks you through deploying both the backend and frontend to production.

---

## Part 1: Deploy Backend (Render)

Your backend is already on Render at: `https://lorraine-booking-backend.onrender.com`

### Step 1: Commit Your Changes

```bash
git add .
git commit -m "Add content management system with admin panel"
git push origin main
```

### Step 2: Render Will Auto-Deploy

Render automatically deploys when you push to GitHub. The deployment includes:
- ✅ New content management routes
- ✅ Program, Testimonial, and SiteSettings models
- ✅ Extended admin panel with new tabs

### Step 3: Seed Production Database (ONE TIME ONLY)

After the deployment completes on Render:

1. Go to your Render dashboard
2. Click on your `lorraine-booking-backend` service
3. Click **"Shell"** tab
4. Run this command:
   ```bash
   npm run seed
   ```
5. Wait for the success message

**IMPORTANT:** Only run this ONCE to populate initial data. Running it again will clear and re-add all content!

### Step 4: Verify Backend is Working

Test your API endpoints:
- https://lorraine-booking-backend.onrender.com/api/health
- https://lorraine-booking-backend.onrender.com/api/content/programs
- https://lorraine-booking-backend.onrender.com/api/content/testimonials
- https://lorraine-booking-backend.onrender.com/api/content/settings

All should return JSON data.

---

## Part 2: Deploy Frontend

You have several options for hosting the frontend:

### Option A: Netlify (Recommended - Easiest)

1. **Sign up at** https://www.netlify.com (free)

2. **Drag & Drop Deploy:**
   - Create a new site
   - Drag these files/folders into Netlify:
     - `index.html`
     - `booking.html`
     - `questionnaire.html`
     - `booking-confirmation.html`
     - `css/` folder
     - `js/` folder
     - `images/` folder (when you have images)
     - `media/` folder (when you have media files)

3. **Done!** Your site will be at: `https://your-site-name.netlify.app`

4. **Optional:** Add custom domain in Netlify settings

### Option B: Vercel

1. **Sign up at** https://vercel.com (free)

2. **Deploy via GitHub:**
   - Push your frontend files to a GitHub repo
   - Import the repo in Vercel
   - Vercel auto-deploys on every push

3. **Or Drag & Drop:**
   - Similar to Netlify, drag your files

### Option C: GitHub Pages (Free)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy frontend"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages"
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Save

3. **Your site will be at:** `https://yourusername.github.io/repository-name`

### Option D: Same Server as Backend (Render)

If you want everything on one server:

1. Your backend already serves static files from `/public`
2. Move your frontend files to `/public`:
   ```
   booking-backend/
   └── public/
       ├── admin/ (already there)
       ├── index.html (add this)
       ├── booking.html (add this)
       ├── questionnaire.html (add this)
       ├── css/ (add this)
       ├── js/ (add this)
       └── images/ (add this)
   ```
3. Access at: `https://lorraine-booking-backend.onrender.com`
4. Admin at: `https://lorraine-booking-backend.onrender.com/admin`

---

## Part 3: Configure API URL

The frontend needs to know where your backend is.

### Update main.js

Open `js/main.js` and verify the API_URL is correct:

```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://lorraine-booking-backend.onrender.com/api';
```

This automatically uses:
- `localhost:3000` when testing locally
- `lorraine-booking-backend.onrender.com` when in production

**No changes needed!** Already configured correctly.

---

## Part 4: Test Production

### Test the Frontend

1. Visit your deployed frontend URL (Netlify/Vercel/GitHub Pages)
2. Check that programs, testimonials, and settings load
3. Verify phone numbers, social media links work
4. Test booking links

### Test the Admin Panel

1. Visit: `https://lorraine-booking-backend.onrender.com/admin`
2. Login with your admin password
3. Try editing a program
4. Refresh your frontend - changes should appear!

---

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables set on Render (MongoDB URI, JWT_SECRET, etc.)
- [ ] Strong admin password configured
- [ ] CORS configured to only allow your frontend domain (optional)
- [ ] MongoDB connection secure
- [ ] Tested all admin functions in production

---

## 📱 Recommended Deployment Setup

**Best Practice Setup:**

1. **Backend (API + Admin):** Render
   - URL: `https://lorraine-booking-backend.onrender.com`
   - Admin Panel: `https://lorraine-booking-backend.onrender.com/admin`

2. **Frontend (Website):** Netlify or Vercel
   - URL: `https://lorrainereiki.netlify.app` (or custom domain)
   - Cleaner separation
   - Faster static file serving
   - Easy SSL/CDN

3. **Custom Domain (Optional):**
   - Frontend: `https://lorrainereiki.com`
   - Backend: `https://api.lorrainereiki.com`

---

## 🔄 Deployment Workflow

### When You Make Changes

**Backend Changes (models, routes, etc.):**
```bash
cd booking-backend
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

**Frontend Changes (HTML, CSS, JS):**
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Netlify/Vercel auto-deploys
```

**Content Changes (via Admin Panel):**
- No deployment needed!
- Login to admin, make changes, they appear immediately

---

## 🆘 Troubleshooting Production

### Frontend not loading content

**Check:**
1. API URL is correct in `js/main.js`
2. Backend is running (visit /api/health)
3. CORS is not blocking requests
4. Browser console for errors (F12)

**Fix CORS if needed:**

In `booking-backend/server.js`, update CORS:
```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://your-netlify-site.netlify.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### Admin panel not accessible

**Check:**
1. Backend is deployed and running
2. URL is correct: `/admin` (not `/admin.html`)
3. Admin password is set in environment variables

### Database is empty

Run the seed script on Render (one time):
```bash
npm run seed
```

### Images not showing

Upload images to your deployment:
- `images/lorraine-portrait.jpg`
- `images/chakra-body.png`
- `media/intro-video.mp4`
- `media/sample-meditation.mp3`

---

## ✅ Post-Deployment Checklist

After deploying to production:

- [ ] Backend API responding (test /api/health)
- [ ] Database seeded with initial content
- [ ] Admin panel accessible and login works
- [ ] Frontend loading and displaying content
- [ ] Can edit content in admin panel
- [ ] Changes appear on frontend after refresh
- [ ] All links working (booking, social media, etc.)
- [ ] Mobile view working
- [ ] SSL certificate active (HTTPS)
- [ ] Give Lorraine the admin URL and credentials

---

## 🎉 You're Live!

Once deployed, Lorraine can:
- Access admin panel from anywhere
- Edit content on any device
- Make changes without touching code
- See updates appear immediately

No more code deployments for content changes! 🚀
