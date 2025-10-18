# Deploy Your Website to GitHub Pages (Free!)

GitHub Pages is a **completely free** hosting service that's perfect for your Reiki website. Your site will be live at: `yourusername.github.io/reiki-wellness`

---

## 🎯 Why GitHub Pages?

✅ **Completely Free** - No costs ever
✅ **Automatic HTTPS** - Secure connection included
✅ **Easy Updates** - Upload new files anytime
✅ **Custom Domain Support** - Use your own domain name
✅ **Reliable** - Used by millions of websites
✅ **No Ads** - Clean, professional hosting

---

## 🚀 Method 1: Easy Upload (No Technical Skills Needed)

This is the easiest method - just drag and drop!

### Step 1: Create a GitHub Account (2 minutes)

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Enter your details:
   - **Username**: Choose something professional (e.g., `lorraine-turner` or `happinessinharmony`)
   - **Email**: Your email address
   - **Password**: Create a strong password
4. Verify your email
5. **Done!** You have a GitHub account

---

### Step 2: Create a New Repository (1 minute)

1. Click the **"+"** icon (top right)
2. Select **"New repository"**
3. Repository settings:
   - **Name**: `reiki-wellness` (or any name you like)
   - **Description**: "Reiki wellness treatment programs"
   - **Public** (must be public for free hosting)
   - ✅ Check "Add a README file"
4. Click **"Create repository"**

**You now have a place to store your website!**

---

### Step 3: Upload Your Website Files (3 minutes)

1. In your new repository, click **"Add file"** → **"Upload files"**

2. Open your `reiki-wellness-platform` folder on your computer

3. **Select all files and folders:**
   - `index.html`
   - `css` folder
   - `js` folder
   - `images` folder
   - `media` folder
   - All the `.md` documentation files

4. **Drag and drop** all of them into the GitHub page

5. Scroll down and click **"Commit changes"**

**Your files are now on GitHub!**

---

### Step 4: Enable GitHub Pages (1 minute)

1. Click **"Settings"** (top menu)
2. Scroll down and click **"Pages"** (left sidebar)
3. Under "Source":
   - Select **"Deploy from a branch"**
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
4. Click **"Save"**

**Wait 1-2 minutes for GitHub to build your site...**

---

### Step 5: Get Your Website URL! 🎉

1. Refresh the Settings > Pages page
2. You'll see: **"Your site is live at [URL]"**
3. Your website is now at: `https://yourusername.github.io/reiki-wellness/`

**Click the link and see your website live on the internet!**

---

## 🌐 Your Live Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/reiki-wellness/
```

Example:
```
https://lorraine-turner.github.io/reiki-wellness/
```

**This is your permanent, free website URL!**

---

## 🔄 How to Update Your Website Later

When you make changes (add images, update text, etc.):

1. Go to your GitHub repository
2. Click on the file you want to update
3. Click the **pencil icon** (Edit)
4. Make your changes
5. Scroll down and click **"Commit changes"**

**OR** to upload new files:
1. Click **"Add file"** → **"Upload files"**
2. Drag and drop your updated files
3. Click **"Commit changes"**

**Your website updates automatically in 1-2 minutes!**

---

## 🎨 Method 2: Using GitHub Desktop (Easier for Multiple Updates)

If you plan to update your website frequently, this is better:

### Step 1: Download GitHub Desktop

1. Go to [desktop.github.com](https://desktop.github.com)
2. Download for Windows
3. Install and sign in with your GitHub account

### Step 2: Clone Your Repository

1. Open GitHub Desktop
2. Click **"File"** → **"Clone repository"**
3. Select your `reiki-wellness` repository
4. Choose where to save it on your computer
5. Click **"Clone"**

### Step 3: Add Your Files

1. Copy all files from `reiki-wellness-platform` folder
2. Paste them into the cloned repository folder
3. GitHub Desktop will show all the new files

### Step 4: Commit and Push

1. In GitHub Desktop:
   - Write a commit message: "Initial website upload"
   - Click **"Commit to main"**
   - Click **"Push origin"**

2. Enable GitHub Pages (same as Method 1, Step 4)

**Your website is live!**

### To Update Later:

1. Edit files in your local folder
2. GitHub Desktop shows changes
3. Write a commit message
4. Click **"Commit to main"**
5. Click **"Push origin"**

**Updates go live automatically!**

---

## 🌟 Method 3: Command Line (For Tech-Savvy Users)

If you're comfortable with the command line:

### Initial Setup:

```bash
# Navigate to your website folder
cd C:\Users\jim_c\lorraine\reiki-wellness-platform

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Reiki wellness website"

# Add GitHub as remote (replace YOUR-USERNAME and reiki-wellness)
git remote add origin https://github.com/YOUR-USERNAME/reiki-wellness.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### To Update Later:

```bash
git add .
git commit -m "Updated content"
git push
```

Then enable GitHub Pages in repository settings.

---

## 🏷️ Adding a Custom Domain (Optional)

Want to use `yourname-reiki.co.uk` instead of the GitHub URL?

### Step 1: Buy a Domain

1. Go to [Namecheap.com](https://www.namecheap.com) or [GoDaddy.com](https://www.godaddy.com)
2. Search for your desired domain
3. Purchase (usually £10-15/year)

### Step 2: Configure DNS

In your domain provider's settings, add these DNS records:

**For `www.yourdomain.com`:**
```
Type: CNAME
Host: www
Value: YOUR-USERNAME.github.io
```

**For `yourdomain.com` (root domain):**
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

### Step 3: Configure GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Custom domain", enter: `www.yourdomain.com`
3. Click **"Save"**
4. Wait 24-48 hours for DNS propagation

**Your website will be at your custom domain!**

---

## 📊 Comparison: GitHub vs Netlify

| Feature | GitHub Pages | Netlify |
|---------|-------------|---------|
| **Cost** | Free | Free |
| **Setup** | Slightly technical | Drag & drop |
| **Updates** | Via GitHub | Via dashboard or drag & drop |
| **Custom Domain** | Yes (manual DNS) | Yes (automatic) |
| **HTTPS** | Yes | Yes |
| **Build Time** | 1-2 minutes | 30 seconds |
| **Best For** | Tech-comfortable users | Everyone |

**Both are excellent free options!**

---

## 🆘 Troubleshooting

### "Page not found" after enabling GitHub Pages

**Solution**: Wait 2-3 minutes and refresh. GitHub needs time to build your site.

### Images don't appear

**Solution**:
- Make sure you uploaded the `images` folder
- Check file names match exactly (case-sensitive)
- Clear browser cache (Ctrl + Shift + Delete)

### CSS/styling not working

**Solution**:
- Make sure you uploaded the `css` folder
- Check the file paths in `index.html`
- Hard refresh: Ctrl + Shift + R

### "404 - File not found"

**Solution**:
- Make sure `index.html` is in the root (not in a subfolder)
- Check repository settings → Pages → Branch is set to "main"
- Check folder is set to "/ (root)"

### Changes not appearing

**Solution**:
- Wait 2 minutes after uploading
- Clear browser cache
- Try incognito/private browsing mode

---

## 🔐 Security & Privacy

### Is my website secure?

✅ Yes! GitHub Pages automatically provides HTTPS encryption.

### Can people see my code?

✅ Yes, but that's normal for websites. Everyone can "view source" on any website. This doesn't affect security.

### What about my contact info?

Your phone number and email are already on your flyers, so it's safe to have them on your website.

---

## 📱 Share Your Website

Once live, share your website:

### Social Media:
```
Excited to launch my new website!
Book your Reiki sessions online 🌟
https://yourusername.github.io/reiki-wellness/
```

### Email Signature:
```
Lorraine Turner
Happiness in Harmony
Counselling, Reiki, Coaching
📞 07846 633248
🌐 https://yourusername.github.io/reiki-wellness/
```

### Business Cards:
Add your website URL to new business cards!

---

## 🎯 Post-Launch Checklist

After your website is live:

- [ ] Test all pages on desktop
- [ ] Test all pages on mobile
- [ ] Click every button and link
- [ ] Test the questionnaire form
- [ ] Share with friends for feedback
- [ ] Add website to Google Search Console
- [ ] Add website to Facebook business page
- [ ] Update Instagram bio with website link
- [ ] Add to email signature
- [ ] Tell existing clients

---

## 💡 Pro Tips

### Tip 1: Use a Professional Username
When creating your GitHub account, choose something professional:
- ✅ `lorraine-turner`
- ✅ `happinessinharmony`
- ✅ `lorrainereiki`
- ❌ `cooluser123`

### Tip 2: Repository Name Matters
Your URL will be: `username.github.io/repository-name`
- ✅ `reiki-wellness`
- ✅ `reiki-programs`
- ✅ `path-to-wellness`
- ❌ `my-website`

### Tip 3: Keep Documentation
Upload all the `.md` files (guides) to GitHub too. They won't show on your website, but you'll have them backed up!

### Tip 4: Test Before Sharing
Before posting on social media:
- Test on your phone
- Ask a friend to check
- Make sure booking links work
- Verify contact info is correct

### Tip 5: Monitor Your Site
Set up Google Analytics (free) to see:
- How many visitors you get
- Which programs are most popular
- Where visitors come from
- What devices they use

---

## 🔄 Workflow for Regular Updates

### Quick Text Update:
1. Go to GitHub.com
2. Navigate to the file
3. Click edit (pencil icon)
4. Make changes
5. Commit
6. Wait 2 minutes → Live!

### Adding New Images:
1. Go to `images` folder on GitHub
2. Click "Add file" → "Upload files"
3. Drag your new images
4. Commit
5. Wait 2 minutes → Live!

### Major Updates:
1. Use GitHub Desktop
2. Edit files on your computer
3. Commit and push
4. Wait 2 minutes → Live!

---

## 📈 Track Your Success

### Free Tools to Monitor Your Website:

1. **Google Analytics** (visitor tracking)
   - See how many people visit
   - Where they come from
   - What they click

2. **Google Search Console** (SEO)
   - See how people find you
   - Which keywords work
   - Fix any issues

3. **Facebook Pixel** (social media tracking)
   - Track visitors from Facebook
   - Create targeted ads
   - Measure engagement

---

## 🌟 Advantages of GitHub Pages

### For Your Business:

✅ **Professional URL** - Not just a Facebook page
✅ **Full Control** - You own your content
✅ **No Platform Restrictions** - Unlike social media
✅ **SEO Benefits** - Google can find you
✅ **Backup Included** - Files are safely stored
✅ **Version History** - Can restore old versions
✅ **Free Forever** - No surprise costs

### For Your Clients:

✅ **Easy to Find** - Share one link
✅ **Always Available** - 24/7 access
✅ **Fast Loading** - Professional experience
✅ **Secure** - HTTPS encryption
✅ **Mobile-Friendly** - Works on all devices

---

## 🎊 You're Ready to Deploy!

Choose your method:

### **Easiest**: GitHub Web Upload
- Best for: First-time users
- Time: 10 minutes
- Follow: Method 1 above

### **Best for Updates**: GitHub Desktop
- Best for: Regular updates
- Time: 15 minutes initial setup
- Follow: Method 2 above

### **For Tech Users**: Command Line
- Best for: Developers
- Time: 5 minutes
- Follow: Method 3 above

---

## 📞 Quick Reference

### Your Website Will Be At:
```
https://YOUR-USERNAME.github.io/reiki-wellness/
```

### To Update:
1. Upload new files to GitHub
2. Wait 2 minutes
3. Refresh your browser

### Cost:
**£0 - Completely Free!**

---

## 🤝 Need Help?

### GitHub Help:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community)

### Video Tutorials:
- Search YouTube: "How to use GitHub Pages"
- Lots of beginner-friendly tutorials

### Alternative:
If GitHub seems too technical, use **Netlify** instead:
- Even easier (drag & drop)
- Also completely free
- See `QUICK-START.md` for Netlify instructions

---

**Ready to deploy? Follow Method 1 above and you'll be live in 10 minutes!** 🚀

*Your professional Reiki website, hosted free forever on GitHub Pages!* ✨
