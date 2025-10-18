# Reiki - Your Path to Wellness
## Website Platform Documentation

Welcome to your new Reiki wellness platform! This guide will help you set up, customize, and deploy your website.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [File Structure](#file-structure)
3. [Customization Guide](#customization-guide)
4. [Adding Your Content](#adding-your-content)
5. [Setting Up Booking System](#setting-up-booking-system)
6. [Payment Integration](#payment-integration)
7. [Email Automation](#email-automation)
8. [Deployment Options](#deployment-options)
9. [Social Media Integration](#social-media-integration)
10. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### View Your Website Locally

1. Navigate to the `reiki-wellness-platform` folder
2. Double-click on `index.html` to open it in your web browser
3. Explore the different sections and features

That's it! Your website is now viewable locally.

---

## 📁 File Structure

```
reiki-wellness-platform/
│
├── index.html              # Main website file
├── README.md              # This documentation file
│
├── css/
│   └── styles.css         # All styling and design
│
├── js/
│   └── main.js            # Interactive features and functionality
│
├── images/                # Place your images here
│   └── (your logo, photos, etc.)
│
└── media/                 # Place your video and audio here
    ├── intro-video.mp4    # Your introduction video
    └── sample-meditation.mp3  # Your meditation audio
```

---

## 🎨 Customization Guide

### Changing Colors

Open `css/styles.css` and modify the color variables at the top:

```css
:root {
    --primary-color: #7B68A6;      /* Soft Purple */
    --secondary-color: #8FB2A5;    /* Sage Green */
    --accent-color: #D4A5A5;       /* Dusty Rose */
    --dark-color: #3A3A3A;         /* Charcoal */
    --light-color: #F8F6F3;        /* Warm White */
}
```

Replace these hex codes with your preferred colors.

### Changing Fonts

The website uses:
- **Playfair Display** for headings (elegant serif)
- **Lato** for body text (clean sans-serif)

To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your preferred fonts
3. Replace the font links in `index.html` (lines 8-10)
4. Update the font variables in `css/styles.css` (lines 17-18)

### Updating Text Content

1. Open `index.html` in a text editor (Notepad++, VS Code, or even Notepad)
2. Find the section you want to edit
3. Replace the placeholder text with your own content
4. Save the file

**Key Sections to Update:**
- Hero section (line 38): Main headline and tagline
- About section (line 66): Your introduction and Reiki explanation
- Program descriptions (lines 109-189): Details about your treatment plans
- Course information (lines 206-250): Reiki attunement course details
- Footer (lines 506-538): Contact information

---

## 📸 Adding Your Content

### Adding Your Logo

1. Save your logo as `logo.png` in the `images/` folder
2. Open `index.html`
3. Find line 22 (inside the `<nav-brand>` section)
4. Replace the `<h1>` with:
   ```html
   <img src="images/logo.png" alt="Reiki Wellness" style="height: 50px;">
   ```

### Adding Your Introduction Video

1. Record or prepare your introduction video (recommended: 2-3 minutes)
2. Convert it to MP4 format (use [HandBrake](https://handbrake.fr/) if needed)
3. Save it as `intro-video.mp4` in the `media/` folder
4. The website will automatically detect and display it

**Video Tips:**
- Keep it under 50MB for faster loading
- Resolution: 1920x1080 (Full HD) or 1280x720 (HD)
- Introduce yourself, explain Reiki, and describe your approach

### Adding Your Meditation Audio

1. Record or prepare your 90-second guided meditation
2. Save it as `sample-meditation.mp3` in the `media/` folder
3. The audio player will automatically work

**Audio Tips:**
- Use a quiet room with minimal background noise
- Speak slowly and calmly
- Keep it between 60-90 seconds
- Use recording software like Audacity (free) or your smartphone

### Adding Photos

1. Save your photos in the `images/` folder
2. Use descriptive names: `reiki-session.jpg`, `treatment-room.jpg`, etc.
3. To add photos to the website, edit `index.html` and insert:
   ```html
   <img src="images/your-photo.jpg" alt="Description">
   ```

---

## 📅 Setting Up Booking System

### Option 1: Calendly (Recommended - Free)

**Why Calendly?**
- Free tier available
- Easy to set up
- Accepts payments
- Automatic email reminders
- Calendar syncing

**Setup Steps:**

1. **Create Account**
   - Go to [calendly.com](https://calendly.com)
   - Sign up with your email
   - Choose the free plan

2. **Create Event Types**
   - Click "Create" → "Event Type"
   - Create separate events for:
     - "Reiki 4-Week Wellness Program" (60 min)
     - "Reiki for Weight Loss - Initial Session" (60 min)
     - "Reiki for Menopause Support - Initial Session" (60 min)
     - "Reiki Level One Consultation" (30 min)
     - "Reiki Level Two Consultation" (30 min)

3. **Configure Each Event**
   - Set your availability
   - Add a description
   - Set the session duration
   - Enable email notifications
   - Add custom questions if desired

4. **Get Your Embed Code**
   - Open your event
   - Click "Share"
   - Select "Add to website"
   - Copy the embed code

5. **Add to Your Website**
   - Open `js/main.js`
   - Find line 140 (the Calendly section)
   - Uncomment lines 153-158
   - Replace `YOUR_USERNAME/YOUR_EVENT` with your Calendly link
   - Example: `https://calendly.com/lorraine-reiki/wellness-program`

6. **Activate the Integration**
   - Uncomment line 163: `// loadCalendly();`
   - Save the file

### Option 2: Acuity Scheduling

Similar to Calendly with more advanced features. Visit [acuityscheduling.com](https://acuityscheduling.com)

### Option 3: Square Appointments

Good if you're already using Square for payments. Visit [squareup.com/appointments](https://squareup.com/appointments)

---

## 💳 Payment Integration

### Option 1: Stripe (Recommended)

**Why Stripe?**
- Professional payment processing
- Accepts all major cards
- Low fees (2.9% + 30p per transaction)
- Excellent security
- Easy integration

**Setup Steps:**

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a free account
   - Complete verification (may take 1-2 days)

2. **Create Products**
   - Go to Products → Add Product
   - Create products for:
     - "4-Week Wellness Program" - £XXX
     - "Weight Loss Support (4 weeks)" - £XXX
     - "Menopause Support (4 weeks)" - £XXX
     - "Reiki Level One Course" - £XXX
     - "Reiki Level Two Course" - £XXX

3. **Get Your API Keys**
   - Go to Developers → API Keys
   - Copy your "Publishable key"

4. **Integrate with Website**
   - You'll need a developer or use Stripe's Payment Links feature
   - **Easy Alternative**: Use Stripe Payment Links
     - Create a Payment Link for each program
     - Add these links to your "Book Now" buttons

**Using Stripe Payment Links (Easiest Method):**
1. In Stripe Dashboard, go to Payment Links
2. Create a new payment link for each program
3. Copy the link
4. In `index.html`, find the booking buttons (lines 149, 168, 187)
5. Replace `href="#book"` with `href="YOUR_STRIPE_PAYMENT_LINK"`

### Option 2: PayPal

1. Go to [paypal.com/buttons](https://www.paypal.com/buttons)
2. Create payment buttons for each program
3. Copy the button code
4. Paste into your `index.html`

### Option 3: Square

1. Visit [squareup.com](https://squareup.com)
2. Create an account
3. Use Square's payment forms

### Pricing Recommendations

Typical UK pricing for 4-week Reiki programs:
- **General Wellness Program**: £120-£180 (4 sessions)
- **Weight Loss Support**: £150-£200 (specialized program)
- **Menopause Support**: £150-£200 (specialized program)
- **Reiki Level One Course**: £150-£250 (full day training)
- **Reiki Level Two Course**: £200-£300 (advanced training)

*Adjust based on your location, experience, and local market rates.*

---

## 📧 Email Automation

### Automatic Questionnaire Emails

When someone completes the questionnaire, you'll want to receive their information automatically.

### Option 1: EmailJS (Recommended - Free)

**Setup Steps:**

1. **Create Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up (free tier: 200 emails/month)

2. **Add Email Service**
   - Click "Add New Service"
   - Choose your email provider (Gmail recommended)
   - Follow authorization steps

3. **Create Email Template**
   - Go to Email Templates → Create New
   - Template name: "Reiki Questionnaire Submission"
   - Use these variables:
     ```
     New Questionnaire from {{from_name}}

     Email: {{from_email}}
     Phone: {{phone}}
     Program: {{program}}
     Previous Reiki Experience: {{experience}}

     Goals: {{goals}}

     Health Conditions: {{health}}

     Preferred Times: {{preferences}}
     ```

4. **Get Your Credentials**
   - Copy your Service ID
   - Copy your Template ID
   - Copy your Public Key

5. **Add to Website**
   - Open `index.html`
   - Before the closing `</body>` tag, add:
     ```html
     <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
     <script>
       emailjs.init('YOUR_PUBLIC_KEY');
     </script>
     ```

   - Open `js/main.js`
   - Find the `sendQuestionnaireEmail` function (around line 200)
   - Uncomment it and add your Service ID and Template ID
   - Uncomment the function call in the form submission handler

### Option 2: FormSpree

1. Go to [formspree.io](https://formspree.io/)
2. Sign up (free tier: 50 submissions/month)
3. Create a new form
4. Get your form endpoint
5. In `index.html`, change the form tag (line 373) to:
   ```html
   <form id="questionnaireForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

**Why Netlify?**
- Completely free for basic sites
- Automatic HTTPS
- Free custom domain support
- One-click deployment
- Continuous deployment from updates

**Setup Steps:**

1. **Create Account**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up with email or GitHub

2. **Deploy Your Site**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your entire `reiki-wellness-platform` folder
   - Wait 30 seconds - your site is live!

3. **Get Your URL**
   - Netlify gives you a URL like: `random-name.netlify.app`
   - You can change the name in Site Settings

4. **Add Custom Domain** (Optional)
   - Buy a domain from [Namecheap](https://www.namecheap.com) or [GoDaddy](https://www.godaddy.com)
   - In Netlify: Domain Settings → Add custom domain
   - Follow the DNS setup instructions
   - Example domains:
     - `reikiwellness.co.uk`
     - `yourname-reiki.com`
     - `pathto wellness.co.uk`

**Recommended domains:**
- `reiki-yourname.co.uk` (£10-15/year)
- `yourname-wellness.co.uk`
- `pathto-wellness.co.uk`

### Option 2: GitHub Pages (Free)

1. Create a [GitHub](https://github.com) account
2. Create a new repository called `reiki-wellness`
3. Upload all your files
4. Go to Settings → Pages
5. Enable GitHub Pages
6. Your site will be at: `username.github.io/reiki-wellness`

### Option 3: Traditional Web Hosting

If you prefer traditional hosting:
- **UK Options**: 123 Reg, Fasthosts, SiteGround
- **Cost**: £3-10/month
- Upload files via FTP (hosting provider will give instructions)

---

## 📱 Social Media Integration

### Adding Social Media Links

1. Open `index.html`
2. Find the footer section (line 521)
3. Update the social links:
   ```html
   <li><a href="https://www.facebook.com/profile.php?id=61581203812442" target="_blank">Facebook</a></li>
   <li><a href="https://www.instagram.com/happinessinreiki" target="_blank">Instagram</a></li>
   ```

### Adding Social Share Buttons

To let visitors share your website, add this code in `index.html` where you want share buttons:

```html
<div class="social-share">
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_WEBSITE_URL" target="_blank">
        Share on Facebook
    </a>
    <a href="https://twitter.com/intent/tweet?url=YOUR_WEBSITE_URL&text=Check out this Reiki wellness program" target="_blank">
        Share on Twitter
    </a>
</div>
```

### Social Media Content Ideas

**For Instagram (@happinessinreiki):**
- Before/after energy photos (abstract/artistic)
- Quote graphics about wellness
- Short video clips from your intro video
- Testimonials from clients (with permission)
- Behind-the-scenes of your Reiki space

**For Facebook Business Page:**
- Blog posts about Reiki benefits
- Client success stories
- Live Q&A sessions
- Special offers for programs
- Educational content about different programs

---

## 🛠 Troubleshooting

### Website not displaying correctly?

**Problem**: Styles don't load
- **Solution**: Make sure `css/styles.css` exists in the correct folder
- Check that the file path in `index.html` line 7 is correct

**Problem**: JavaScript features don't work
- **Solution**: Check browser console (F12) for errors
- Ensure `js/main.js` is in the correct location

### Video/Audio not playing?

**Problem**: Media files don't play
- **Solution**:
  - Check file names match exactly (case-sensitive)
  - Ensure files are in MP4 (video) and MP3 (audio) format
  - Try reducing file size if too large

### Forms not submitting?

**Problem**: Questionnaire doesn't send
- **Solution**:
  - Check if you've set up EmailJS or FormSpree
  - Verify your API keys are correct
  - Check browser console for errors

### Mobile menu not working?

**Problem**: Hamburger menu doesn't open
- **Solution**:
  - Clear browser cache
  - Check that `main.js` is loading correctly
  - Try a different browser

---

## 📞 Next Steps

### Immediate Actions (Week 1)

- [ ] Add your logo to `/images` folder
- [ ] Record and add your introduction video
- [ ] Record and add your meditation sample
- [ ] Update all text content with your information
- [ ] Set up Calendly account and create event types
- [ ] Choose payment method (Stripe recommended)
- [ ] Test the website on your phone and computer

### Short Term (Week 2-3)

- [ ] Set up email automation (EmailJS or FormSpree)
- [ ] Create pricing for your programs
- [ ] Write welcome email template for new clients
- [ ] Deploy website to Netlify
- [ ] Register custom domain (optional but recommended)
- [ ] Create social media graphics

### Long Term (Month 1-2)

- [ ] Gather client testimonials to add to website
- [ ] Create blog content about Reiki
- [ ] Set up Google Analytics to track visitors
- [ ] Create downloadable resources (meditation guides, etc.)
- [ ] Start regular social media posting
- [ ] Consider adding a blog section

---

## 💡 Tips for Success

### Website Best Practices

1. **Update regularly**: Keep your website fresh with new content
2. **Mobile-first**: 70% of users will visit on mobile - always test on phone
3. **Fast loading**: Compress images before uploading (use [TinyPNG](https://tinypng.com))
4. **Clear call-to-action**: Make it easy to book - "Book Now" buttons everywhere
5. **Professional photos**: Invest in good photos of your space and yourself

### Marketing Your Website

1. **SEO basics**:
   - Use descriptive page titles
   - Add meta descriptions
   - Use keywords naturally (Reiki, wellness, healing)

2. **Social media**:
   - Post 3-4 times per week
   - Share behind-the-scenes content
   - Engage with followers

3. **Email marketing**:
   - Build an email list
   - Send monthly newsletters
   - Share wellness tips and special offers

4. **Local marketing**:
   - Google My Business listing
   - Local wellness directories
   - Partnerships with yoga studios, health shops

---

## 📚 Additional Resources

### Free Tools
- **Canva** (canva.com) - Create social media graphics
- **Unsplash** (unsplash.com) - Free stock photos
- **TinyPNG** (tinypng.com) - Compress images
- **Google Analytics** (analytics.google.com) - Track website visitors

### Learning Resources
- **YouTube**: Search "Reiki marketing tips"
- **Podcasts**: Wellness business podcasts
- **Books**: "The Wellness Business Bible"

---

## ❓ Getting Help

If you need assistance:

1. **Technical issues**: Check the Troubleshooting section above
2. **Customization help**: Consider hiring a web developer on Fiverr or Upwork
3. **Content questions**: Focus on your unique approach and what makes you different

---

## 🎉 Congratulations!

You now have a professional, fully-functional website for your Reiki business. Take it one step at a time, and don't hesitate to start simple and improve over time.

**Remember**: Your website is a living platform - you can always add, change, and improve it as your business grows.

Good luck with your Reiki journey!

---

*Created with care for your wellness business* ✨
