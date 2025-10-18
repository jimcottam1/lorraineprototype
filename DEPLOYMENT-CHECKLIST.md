# Website Deployment Checklist
## Track Your Progress to Launch

Use this checklist to track your progress from setup to launch!

---

## 📋 Phase 1: Content Preparation

### Personal Content
- [ ] Record introduction video (2-3 minutes)
- [ ] Convert video to MP4 format
- [ ] Save video as `media/intro-video.mp4`
- [ ] Record 90-second guided meditation
- [ ] Save meditation as `media/sample-meditation.mp3`
- [ ] Take or gather professional photos
- [ ] Create or save logo (if you have one)

### Text Content
- [ ] Write your personal bio/introduction
- [ ] Describe your Reiki approach
- [ ] Write descriptions for each 4-week program
- [ ] Decide on your pricing
- [ ] Prepare course descriptions (Reiki 1 & 2)
- [ ] Write welcome email template

---

## 🎨 Phase 2: Website Customization

### Visual Updates
- [ ] Open `index.html` in text editor
- [ ] Update main headline in hero section
- [ ] Update "About" section with your story
- [ ] Update footer with your information
- [ ] Add social media links (Facebook, Instagram)
- [ ] Upload logo to `images` folder (if applicable)
- [ ] Change colors in `css/styles.css` (optional)

### Program Details
- [ ] Update "General Wellness" program description
- [ ] Update "Weight Loss" program description
- [ ] Update "Menopause Support" program description
- [ ] Update Reiki Level One course details
- [ ] Update Reiki Level Two course details
- [ ] Add your pricing to each program

### Media Integration
- [ ] Upload intro video to `media` folder
- [ ] Upload meditation audio to `media` folder
- [ ] Test video plays correctly
- [ ] Test audio plays correctly
- [ ] Add any additional photos to `images` folder

---

## 💳 Phase 3: Booking & Payment Setup

### Booking System (Choose One)

**Option A: Calendly**
- [ ] Create Calendly account at calendly.com
- [ ] Create "4-Week Wellness Program" event
- [ ] Create "Weight Loss Support" event
- [ ] Create "Menopause Support" event
- [ ] Create "Reiki Level One Inquiry" event
- [ ] Create "Reiki Level Two Inquiry" event
- [ ] Set your availability for each event
- [ ] Add custom questions (optional)
- [ ] Copy your Calendly embed link
- [ ] Add Calendly link to `js/main.js` (line 153)
- [ ] Uncomment line 163 in `js/main.js`
- [ ] Test booking on website

**Option B: Acuity Scheduling**
- [ ] Create Acuity account
- [ ] Set up appointment types
- [ ] Configure availability
- [ ] Get embed code
- [ ] Add to website

### Payment System (Choose One)

**Option A: Stripe Payment Links (Easiest)**
- [ ] Create Stripe account at stripe.com
- [ ] Complete business verification
- [ ] Create "4-Week Wellness" product + price
- [ ] Create "Weight Loss Support" product + price
- [ ] Create "Menopause Support" product + price
- [ ] Create "Reiki Level One" product + price
- [ ] Create "Reiki Level Two" product + price
- [ ] Generate payment link for each product
- [ ] Add payment links to buttons in `index.html`
- [ ] Test each payment link

**Option B: Calendly Payments (requires paid plan)**
- [ ] Upgrade Calendly plan
- [ ] Connect Stripe or PayPal
- [ ] Add pricing to each event type
- [ ] Test booking with payment

**Option C: PayPal**
- [ ] Create PayPal business account
- [ ] Create payment buttons
- [ ] Add buttons to website
- [ ] Test payments

---

## 📧 Phase 4: Email Automation

### Email for Questionnaire (Choose One)

**Option A: EmailJS**
- [ ] Create account at emailjs.com
- [ ] Add email service (Gmail, Outlook, etc.)
- [ ] Authorize email connection
- [ ] Create email template for questionnaire
- [ ] Copy Service ID, Template ID, Public Key
- [ ] Add EmailJS script to `index.html`
- [ ] Initialize EmailJS with public key
- [ ] Update `sendQuestionnaireEmail` in `js/main.js`
- [ ] Test form submission
- [ ] Check email received

**Option B: FormSpree**
- [ ] Create account at formspree.io
- [ ] Create new form
- [ ] Get form endpoint URL
- [ ] Update form action in `index.html`
- [ ] Test form submission
- [ ] Check email received

### Client Communication Templates
- [ ] Write welcome email template
- [ ] Write appointment reminder template
- [ ] Write thank you/follow-up email
- [ ] Write program completion email

---

## 🧪 Phase 5: Testing

### Desktop Testing
- [ ] Open website in Chrome
- [ ] Open website in Firefox
- [ ] Open website in Safari (if Mac)
- [ ] Click all navigation links
- [ ] Click all "Book Now" buttons
- [ ] Fill out and submit questionnaire
- [ ] Test video playback
- [ ] Test audio playback
- [ ] Test all payment links
- [ ] Check all text for spelling/grammar

### Mobile Testing
- [ ] Open website on iPhone/Android
- [ ] Test hamburger menu works
- [ ] Scroll through entire site
- [ ] Click all buttons (touch targets large enough?)
- [ ] Test form on mobile
- [ ] Test booking on mobile
- [ ] Test video on mobile
- [ ] Test audio on mobile

### Cross-Browser Testing
- [ ] Test on Chrome (desktop & mobile)
- [ ] Test on Safari (desktop & mobile)
- [ ] Test on Firefox
- [ ] Test on Edge

### User Flow Testing
- [ ] Can you easily find program info?
- [ ] Is it clear how to book?
- [ ] Do prices make sense?
- [ ] Is contact info visible?
- [ ] Does it work on all screen sizes?

---

## 🌐 Phase 6: Deployment

### Pre-Launch
- [ ] Choose deployment method (Netlify recommended)
- [ ] Backup website folder to USB/cloud
- [ ] Do final spell-check
- [ ] Verify all links work
- [ ] Test one more time!

### Deploy to Netlify (Recommended)
- [ ] Create account at netlify.com
- [ ] Click "Add new site" → "Deploy manually"
- [ ] Drag `reiki-wellness-platform` folder
- [ ] Wait for deployment (30 seconds)
- [ ] Get your site URL (something.netlify.app)
- [ ] Test live site thoroughly
- [ ] Change site name in Netlify settings (optional)

### Custom Domain (Optional)
- [ ] Choose domain name (e.g., yourname-reiki.co.uk)
- [ ] Purchase domain from Namecheap/GoDaddy
- [ ] Add custom domain in Netlify
- [ ] Update DNS settings (Netlify provides instructions)
- [ ] Wait for DNS propagation (can take 24-48 hours)
- [ ] Verify HTTPS is enabled
- [ ] Test custom domain works

### Alternative: GitHub Pages
- [ ] Create GitHub account
- [ ] Create new repository
- [ ] Upload all files
- [ ] Enable GitHub Pages in settings
- [ ] Get your site URL

### Alternative: Traditional Hosting
- [ ] Choose hosting provider
- [ ] Purchase hosting plan
- [ ] Get FTP credentials
- [ ] Upload files via FTP
- [ ] Test live site

---

## 📣 Phase 7: Launch & Promotion

### Pre-Launch Preparation
- [ ] Create social media graphics (use Canva)
- [ ] Write launch announcement posts
- [ ] Prepare email to existing clients
- [ ] Update email signature with website link
- [ ] Order business cards with website URL (optional)

### Launch Day
- [ ] Share on Facebook personal profile
- [ ] Share on Facebook business page
- [ ] Post on Instagram (feed + story)
- [ ] Email existing clients about new website
- [ ] Post in local community groups
- [ ] Tell friends and family
- [ ] Update Google My Business (if you have one)

### Week 1 After Launch
- [ ] Monitor for any technical issues
- [ ] Check questionnaire submissions
- [ ] Respond to all inquiries within 24 hours
- [ ] Post 2-3 times on social media
- [ ] Ask friends for feedback
- [ ] Make any necessary quick fixes

### Month 1 After Launch
- [ ] Collect first testimonials
- [ ] Add testimonials to website
- [ ] Review booking analytics
- [ ] Adjust pricing if needed
- [ ] Create content calendar for social media
- [ ] Write first blog post (optional)

---

## 📊 Phase 8: Analytics & Optimization

### Set Up Tracking
- [ ] Create Google Analytics account
- [ ] Add tracking code to website
- [ ] Set up conversion goals (bookings)
- [ ] Set up Google Search Console
- [ ] Submit sitemap

### SEO Basics
- [ ] Add meta descriptions to pages
- [ ] Optimize page titles
- [ ] Add alt text to images
- [ ] Submit site to Google
- [ ] Create Google My Business listing

### Ongoing Optimization
- [ ] Check analytics weekly
- [ ] Track number of bookings
- [ ] Monitor which programs are most popular
- [ ] A/B test different pricing
- [ ] Update content regularly
- [ ] Add new photos/videos over time

---

## 🎯 Success Metrics

Track these monthly:

### Website Metrics
- [ ] Number of visitors
- [ ] Number of bookings
- [ ] Conversion rate (visitors → bookings)
- [ ] Most popular program
- [ ] Average time on site
- [ ] Mobile vs desktop visitors

### Business Metrics
- [ ] Number of new clients
- [ ] Revenue from each program
- [ ] Client retention rate
- [ ] Testimonials collected
- [ ] Social media followers
- [ ] Email list size

---

## ✅ Final Pre-Launch Checklist

Before you share your website URL with the world:

- [ ] ✅ All content updated and spell-checked
- [ ] ✅ All images and media uploaded
- [ ] ✅ Video and audio working
- [ ] ✅ Booking system functional
- [ ] ✅ Payment links working
- [ ] ✅ Contact form sending emails
- [ ] ✅ All links tested
- [ ] ✅ Mobile-responsive design checked
- [ ] ✅ Social media links correct
- [ ] ✅ Professional email set up
- [ ] ✅ Privacy policy added (if collecting data)
- [ ] ✅ Terms & conditions added (if needed)
- [ ] ✅ SSL certificate active (HTTPS)
- [ ] ✅ Site loads quickly
- [ ] ✅ Asked 2-3 people to test it

---

## 🎊 You're Ready to Launch!

Once all essential items are checked:

1. Take a deep breath
2. Click "Publish" or share your URL
3. Announce on social media
4. Celebrate! 🎉

Remember: Your website doesn't have to be perfect. Launch with the essentials and improve over time.

---

## 📞 Post-Launch Support

### Week 1
- Monitor daily for technical issues
- Respond to all inquiries promptly
- Fix any broken links immediately
- Gather feedback from early visitors

### Month 1
- Add testimonials
- Update based on user feedback
- Create regular content
- Maintain social media presence

### Ongoing
- Monthly content updates
- Quarterly design refreshes
- Annual review and optimization
- Continuous improvement

---

## 💡 Tips for Success

**Don't Overcomplicate**
- Start simple, add features later
- Focus on core programs first
- Perfect is the enemy of done

**Test Everything**
- Click every button yourself
- Book a test session
- Submit a test questionnaire
- Ask friends to try booking

**Stay Consistent**
- Post regularly on social media
- Update website monthly
- Respond to inquiries quickly
- Maintain professional appearance

**Track Results**
- Know your numbers
- What works, what doesn't?
- Adjust based on data
- Celebrate small wins

---

## 🌟 Bonus: 30-Day Launch Plan

### Week 1: Setup
- Monday-Wednesday: Content preparation
- Thursday-Friday: Website customization
- Weekend: Booking/payment setup

### Week 2: Integration
- Monday-Wednesday: Email automation
- Thursday-Friday: Testing
- Weekend: Final tweaks

### Week 3: Deployment
- Monday: Deploy to Netlify
- Tuesday-Wednesday: Domain setup
- Thursday-Friday: Analytics setup
- Weekend: Create launch materials

### Week 4: Launch
- Monday: Soft launch to friends
- Tuesday-Wednesday: Gather feedback
- Thursday: Final adjustments
- Friday: PUBLIC LAUNCH! 🚀
- Weekend: Promotion & engagement

---

**You've got this!** Check off each item as you go, and before you know it, you'll have a professional Reiki website bringing in clients. 🙏✨

*Good luck with your launch!*
