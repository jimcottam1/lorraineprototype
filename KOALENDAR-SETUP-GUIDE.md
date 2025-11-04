# 📅 Koalendar Setup Guide for Lorraine

**Last Updated**: October 21, 2025
**Website**: Reiki - Your Path to Wellness

---

## 🎯 Overview

Your website now uses **Koalendar** for all booking appointments. When visitors click "Book This Program", a Koalendar popup window opens where they can select their appointment time directly.

**What You Need to Do**:
1. Create a free Koalendar account
2. Set up 5 booking pages (one for each program/course)
3. Copy the URLs from Koalendar
4. Paste them into your website files
5. Test the booking flow

**Estimated Time**: 30-45 minutes

---

## Step 1️⃣: Create Your Koalendar Account

### 1. Go to Koalendar
- Visit: **https://koalendar.com**
- Click "Sign Up" or "Get Started"

### 2. Create Your Account
- Enter your email: `lorraine@happinessinharmony.co.uk`
- Create a password
- Verify your email address

### 3. Complete Your Profile
- Add your name: **Lorraine Turner**
- Add your business: **Happiness in Harmony**
- Set your timezone: **Europe/London** (UK time)
- Add your location: **Wallington**

---

## Step 2️⃣: Create Your 5 Booking Pages

You need to create **5 separate booking pages** in Koalendar:

### Booking Page 1: Path to Wellness
**Purpose**: 4-Week Wellness Program

1. Click "**+ New Booking Page**" in your Koalendar dashboard
2. **Event Name**: `Path to Wellness - 4-Week Program`
3. **Duration**: 60 minutes (for first session)
4. **Location**:
   - Choose "Phone Call" or "In-Person"
   - Add address: Your practice location in Wallington
5. **Description**:
   ```
   Book your first session for the 4-Week Path to Wellness program.

   What's Included:
   - 4 weekly 60-minute sessions (45 min Reiki + feedback)
   - Daily guided meditations (5, 8, 12, 15 mins)
   - Health questionnaire & progress reviews
   - Plus 10% discount for Reiki for beginners workshop

   Program Price: £256

   Weekly Themes: Allow, Trust, Connect, Release
   ```
6. **Custom Questions** (Add these to collect info during booking):
   - "Have you experienced Reiki before?" (Yes/No)
   - "What are your wellness goals?" (Text field)
   - "Any health conditions we should know about?" (Text field)
   - "Preferred session times" (Morning/Afternoon/Evening/Flexible)
7. **Availability**: Set your available hours
8. **Save** and **Copy the URL** → It will look like: `https://koalendar.com/e/path-to-wellness-123`

---

### Booking Page 2: Weight Loss & Wellbeing
**Purpose**: 4-Week Weight Loss Program

1. Click "**+ New Booking Page**"
2. **Event Name**: `Weight Loss & Wellbeing - 4-Week Program`
3. **Duration**: 75 minutes
4. **Location**: Phone Call or In-Person
5. **Description**:
   ```
   Book your first session for the 4-Week Weight Loss & Wellbeing program.

   What's Included:
   - 4 weekly 75-minute sessions (45 min Reiki + coaching)
   - Daily guided meditations (5, 8, 12, 15 mins)
   - Energy transformation & emotional weight release
   - Address energetic blocks & old patterns

   Program Price: £256 (£80 case study rate available)

   Weekly Themes: Allow, Trust, Connect, Release
   ```
6. **Custom Questions**: Same as above
7. **Save** and **Copy the URL**

---

### Booking Page 3: Pathway Through Menopause
**Purpose**: 4-Week Menopause Support Program

1. Click "**+ New Booking Page**"
2. **Event Name**: `Pathway Through Menopause - 4-Week Program`
3. **Duration**: 75 minutes
4. **Location**: Phone Call or In-Person
5. **Description**:
   ```
   Book your first session for the 4-Week Menopause Support program.

   What's Included:
   - 4 weekly 75-minute sessions (45 min Reiki + coaching)
   - Daily guided meditations (5, 8, 12, 15 mins)
   - Emotional grounding & energy cleansing
   - Reconnect with your true self & radiant presence

   Program Price: £256 (£100 case study rate available)

   Weekly Themes: Acceptance, Release, Connect, Renew
   ```
6. **Custom Questions**: Same as above
7. **Save** and **Copy the URL**

---

### Booking Page 4: Reiki Level One Attunement
**Purpose**: Reiki Level 1 Course Inquiry

1. Click "**+ New Booking Page**"
2. **Event Name**: `Reiki Level One - Initial Consultation`
3. **Duration**: 30 minutes (consultation call)
4. **Location**: Phone Call
5. **Description**:
   ```
   Book a free 30-minute consultation to discuss the Reiki Level One Attunement course.

   What You'll Learn:
   - Understanding Reiki energy
   - Hand positions & techniques
   - Self-healing practices
   - Level One attunement ceremony

   This consultation helps us answer your questions and ensure Reiki Level One is right for you.
   ```
6. **Custom Questions**:
   - "What interests you about learning Reiki?" (Text field)
   - "Do you have any prior experience with energy healing?" (Yes/No)
7. **Save** and **Copy the URL**

---

### Booking Page 5: Reiki Level Two Attunement
**Purpose**: Reiki Level 2 Course Inquiry

1. Click "**+ New Booking Page**"
2. **Event Name**: `Reiki Level Two - Initial Consultation`
3. **Duration**: 30 minutes
4. **Location**: Phone Call
5. **Description**:
   ```
   Book a consultation to discuss the Reiki Level Two Attunement course.

   What You'll Learn:
   - Three sacred Reiki symbols
   - Distance healing techniques
   - Mental & emotional healing
   - Level Two attunement ceremony

   Note: Reiki Level One completion required.
   ```
6. **Custom Questions**:
   - "When did you complete Reiki Level One?" (Text field)
   - "What do you hope to achieve with Level Two?" (Text field)
7. **Save** and **Copy the URL**

---

## Step 3️⃣: Copy Your Koalendar URLs

After creating each booking page, you'll have **5 URLs**. Write them down here:

```
1. Path to Wellness: https://koalendar.com/e/_______________
2. Weight Loss: https://koalendar.com/e/_______________
3. Menopause: https://koalendar.com/e/_______________
4. Reiki Level 1: https://koalendar.com/e/_______________
5. Reiki Level 2: https://koalendar.com/e/_______________
```

---

## Step 4️⃣: Update Your Website

### Option A: Ask Jim to Update (Recommended)
Send Jim your 5 Koalendar URLs and ask him to update the website.

### Option B: Update Yourself (If You're Comfortable)

1. **Open the file**: `index.html`
2. **Find and replace** the placeholder URLs with your actual URLs:

**Search for** → **Replace with your URL**

```html
Line 124:
https://koalendar.com/e/YOUR-PAGE-WELLNESS
→ Replace with your Path to Wellness URL

Line 144:
https://koalendar.com/e/YOUR-PAGE-WEIGHTLOSS
→ Replace with your Weight Loss URL

Line 163:
https://koalendar.com/e/YOUR-PAGE-MENOPAUSE
→ Replace with your Menopause URL

Line 216:
https://koalendar.com/e/YOUR-PAGE-REIKI1
→ Replace with your Reiki Level 1 URL

Line 229:
https://koalendar.com/e/YOUR-PAGE-REIKI2
→ Replace with your Reiki Level 2 URL
```

3. **Save the file**
4. **Upload to your web server**

---

## Step 5️⃣: Test Your Booking Flow

### Test Each Button:

1. **Open your website** in a browser
2. **Click "Book This Program"** on the Path to Wellness card
3. **Koalendar popup should appear** with your calendar
4. **Try selecting a time** (don't complete the booking)
5. **Repeat for all 5 booking buttons**

### What You Should See:
✅ Popup window opens when clicking "Book This Program"
✅ Your calendar shows available times
✅ Custom questions appear during booking
✅ Confirmation email sent after booking

---

## Step 6️⃣: Configure Koalendar Settings (Optional)

### Email Notifications
1. Go to **Settings** → **Notifications** in Koalendar
2. Enable email confirmations for:
   - You (when someone books)
   - Client (booking confirmation)
3. Customize the email templates

### Calendar Sync
1. Go to **Settings** → **Calendar Sync**
2. Connect your Google Calendar or Outlook
3. This prevents double-bookings

### Payment Integration (Future)
- Koalendar supports Stripe for taking payments
- You can add this later if you want to collect deposits

### Branding
1. Go to **Settings** → **Branding**
2. Upload your logo
3. Customize colors to match your website

---

## 🆘 Troubleshooting

### Problem: Popup doesn't open when clicking "Book This Program"
**Solution**: Make sure you replaced ALL the placeholder URLs in index.html

### Problem: Wrong calendar appears
**Solution**: Double-check you pasted the correct URL for each program

### Problem: Custom questions don't appear
**Solution**: Add them in Koalendar → Edit Booking Page → Custom Questions

### Problem: Times showing in wrong timezone
**Solution**: Update timezone in Koalendar Settings → Profile

---

## 📞 Support

### Koalendar Help
- Help Center: https://help.koalendar.com
- Live Chat: Available in Koalendar dashboard
- Email: support@koalendar.com

### Website Updates
- Contact: Jim (your web developer)

---

## ✅ Checklist

Before going live, confirm:

- [ ] Koalendar account created
- [ ] All 5 booking pages created
- [ ] Custom questions added to each page
- [ ] Availability hours set correctly
- [ ] All 5 URLs copied
- [ ] Website updated with new URLs
- [ ] Tested all 5 booking buttons
- [ ] Email notifications working
- [ ] Calendar sync connected (optional)

---

## 🎉 You're All Set!

Once you've completed these steps, your website will have a fully functional booking system. Clients can click "Book This Program" and schedule their appointments directly through Koalendar.

**Need Help?** Contact Jim or reach out to Koalendar support.

---

**Document created by**: Jim (Web Developer)
**For questions**: Contact Jim about website updates
