# Quick Start Guide
## Get Your Reiki Website Live in 5 Steps

---

## ⚡ 5-Minute Setup

### Step 1: View Your Website (1 minute)
1. Open the `reiki-wellness-platform` folder
2. Double-click `index.html`
3. Your website opens in your browser!

✅ **You now have a working website!**

---

### Step 2: Add Your Content (30 minutes)

**Upload Your Media:**
1. Save your intro video as `media/intro-video.mp4`
2. Save your meditation as `media/sample-meditation.mp3`
3. Refresh the website - they'll appear automatically!

**Update Text:**
1. Right-click `index.html` → Open with Notepad (or any text editor)
2. Find and replace placeholder text with your information
3. Save and refresh your browser

---

### Step 3: Set Up Booking (15 minutes)

**Use Calendly (Free):**
1. Go to [calendly.com](https://calendly.com) → Sign up
2. Create a new event: "Reiki 4-Week Program"
3. Set your availability and duration (60 min recommended)
4. Copy your Calendly link (looks like: `calendly.com/your-name/reiki`)
5. Open `js/main.js` in a text editor
6. Find line 153, uncomment it, and paste your link
7. Uncomment line 163: `loadCalendly();`
8. Save the file

**Done!** People can now book directly on your site.

---

### Step 4: Set Up Payments (10 minutes)

**Use Stripe Payment Links (Easiest):**
1. Go to [stripe.com](https://stripe.com) → Sign up
2. Create a product: "4-Week Reiki Program" with your price
3. Create a Payment Link for it
4. Copy the link
5. Open `index.html`
6. Find the "Book This Program" buttons (lines 149, 168, 187)
7. Replace `href="#book"` with your Stripe payment link
8. Save the file

**Alternative:** Use Calendly's built-in payments (paid plan)

---

### Step 5: Go Live! (10 minutes)

**Deploy to Netlify (Free):**
1. Go to [netlify.com](https://www.netlify.com) → Sign up
2. Click "Add new site" → "Deploy manually"
3. Drag your entire `reiki-wellness-platform` folder
4. Wait 30 seconds
5. **Your site is live!** 🎉

Your free URL: `something.netlify.app`

**Want a custom domain?**
- Buy `yourname-reiki.co.uk` from Namecheap (£10/year)
- Add it in Netlify's Domain Settings
- Follow the simple DNS instructions

---

## 🎯 Priority Checklist

### Essential (Do Today)
- [ ] Add your intro video
- [ ] Add your meditation audio
- [ ] Update your name and contact info
- [ ] Set up Calendly booking

### Important (Do This Week)
- [ ] Set up payment method
- [ ] Deploy to Netlify
- [ ] Test booking on mobile
- [ ] Share with friends for feedback

### Nice to Have (Do This Month)
- [ ] Buy custom domain
- [ ] Set up email automation
- [ ] Add testimonials
- [ ] Create social media posts

---

## 💰 Recommended Pricing

Based on UK market rates for Reiki:

| Program | Duration | Suggested Price |
|---------|----------|----------------|
| General Wellness | 4 weeks (4 sessions) | £120-£180 |
| Weight Loss Support | 4 weeks | £150-£200 |
| Menopause Support | 4 weeks | £150-£200 |
| Single Session | 1 hour | £40-£60 |
| Reiki Level One | 1 day course | £150-£250 |
| Reiki Level Two | 1 day course | £200-£300 |

*Adjust based on your location and experience level.*

---

## 📱 Test Your Website

Before going live, check:

✅ **Mobile test**: Open on your phone - does it look good?
✅ **Click test**: Click every button - do they work?
✅ **Form test**: Fill out the questionnaire - does it submit?
✅ **Booking test**: Try to book a session - is it smooth?
✅ **Link test**: Click social media links - do they go to the right place?

---

## 🆘 Common Questions

**Q: I don't see my video playing**
A: Make sure the file is named exactly `intro-video.mp4` (case-sensitive) and is in the `media` folder

**Q: How do I change the colors?**
A: Open `css/styles.css` and change the colors at the top (lines 7-12)

**Q: Can I edit this on my iPad?**
A: Yes! Use the "Textastic" app or any HTML editor for iPad

**Q: Do I need to pay for hosting?**
A: No! Netlify is completely free for basic sites like this

**Q: How do I get the questionnaire responses?**
A: Set up EmailJS (see full README) or use FormSpree - both send responses to your email

**Q: I'm stuck! What do I do?**
A: Read the full README.md for detailed instructions, or search YouTube for "how to use Calendly" or "how to deploy to Netlify"

---

## 🎨 Customization Tips

### Change Colors
1. Open `css/styles.css`
2. Lines 7-12 have the colors
3. Use [coolors.co](https://coolors.co) to find beautiful color combinations
4. Replace the hex codes (#7B68A6, etc.) with your new colors

### Add Your Logo
1. Save logo as `images/logo.png`
2. Open `index.html`
3. Find line 22
4. Replace the `<h1>` with:
   ```html
   <img src="images/logo.png" alt="Reiki Wellness" style="height: 50px;">
   ```

### Change the Background Photo
1. Find a calming photo on [Unsplash.com](https://unsplash.com) (free)
2. Save it in your `images` folder
3. Open `css/styles.css`
4. Line 245: Replace the image URL with:
   ```css
   background: url('../images/your-photo.jpg') center/cover;
   ```

---

## 📣 Launch Day Checklist

When you're ready to announce your website:

- [ ] Test everything one more time
- [ ] Make sure all links work
- [ ] Check spelling and grammar
- [ ] Add your prices
- [ ] Post on Facebook: "Excited to announce my new website!"
- [ ] Post on Instagram: Story + Feed post
- [ ] Email your existing clients
- [ ] Update your email signature with website link
- [ ] Add website to business cards

---

## 🚀 Next Steps After Launch

### Week 1
- Monitor bookings
- Respond to questionnaire submissions quickly
- Ask early clients for feedback
- Make small tweaks based on feedback

### Month 1
- Add client testimonials
- Create blog posts (optional)
- Start regular social media posting
- Track which program is most popular

### Month 3
- Consider adding more programs
- Create email newsletter
- Run a special promotion
- Evaluate and adjust pricing if needed

---

## 💡 Pro Tips

1. **Start Simple**: Don't try to perfect everything before launching. Get it live, then improve.

2. **Mobile First**: Most people will find you on their phone. Always check how it looks on mobile.

3. **Call to Action**: Make it VERY easy to book. "Book Now" buttons should be everywhere.

4. **Professional Photos**: When you can, invest in professional photos of yourself and your space.

5. **Testimonials**: After each client, ask for a review. Add these to your website.

6. **Regular Updates**: Update your website every month with new content, photos, or blog posts.

7. **Analytics**: Set up Google Analytics (free) to see how many people visit.

8. **Backup**: Save a copy of your `reiki-wellness-platform` folder to a USB drive or cloud storage.

---

## 📞 Need Help?

**For this specific website:**
- Read the detailed `README.md` file
- All code has helpful comments explaining what it does

**For general help:**
- **Calendly**: [calendly.com/help](https://help.calendly.com)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **YouTube**: Search "how to [specific thing]"

**For Reiki business advice:**
- Join Facebook groups for Reiki practitioners
- Follow successful Reiki accounts on Instagram
- Network with local wellness professionals

---

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Accept bookings online
- ✅ Take payments securely
- ✅ Showcase your programs
- ✅ Collect client information
- ✅ Look professional online

**Take a deep breath. You've got this!** 🙏

Start with the essentials, then add more features over time. Your website will grow with your business.

---

*Remember: Done is better than perfect. Launch now, improve later!*
