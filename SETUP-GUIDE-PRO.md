# 🚀 Complete Setup Guide - Automated Booking System

**Last Updated**: November 2025
**For**: Lorraine Turner - Reiki Your Path to Wellness
**Total Setup Time**: 1-2 hours
**Monthly Cost**: ~£8-15 (Koalendar Pro subscription)

---

## 📋 What You're Setting Up

Your fully automated booking workflow:

1. **Client clicks "Book Now"** → Koalendar popup opens
2. **Client books time & pays** → Stripe processes payment
3. **Client receives confirmation email** → With questionnaire link
4. **Client completes questionnaire** → You receive their responses
5. **You respond personally** → Via email or phone
6. **Client attends session** → Journey begins!

---

## Part 1️⃣: Koalendar Pro Setup

### Step 1: Create Your Account

1. Go to **https://koalendar.com**
2. Click "Sign Up"
3. Choose the **Pro Plan** (~£8-10/month or $10/month)
   - This includes Stripe payment integration
   - Unlimited booking pages
   - Custom branding
   - Webhooks & automation

### Step 2: Complete Your Profile

1. **Name**: Lorraine Turner
2. **Business**: Happiness in Harmony
3. **Timezone**: Europe/London (UK)
4. **Location**: Wallington
5. **Upload your logo** (optional but recommended)

### Step 3: Connect Stripe for Payments

1. In Koalendar, go to **Settings** → **Payments**
2. Click **Connect Stripe**
3. If you don't have a Stripe account:
   - Sign up at https://stripe.com (free)
   - Complete business verification
   - Connect your bank account
4. Authorize Koalendar to access Stripe
5. **Important**: Stripe charges 2.9% + 20p per transaction

### Step 4: Create Your 7 Booking Pages

You need to create **7 booking pages** (the 5 original + 2 new ones):

---

#### Booking Page 1: Path to Wellness

**Event Name**: `Path to Wellness - 4-Week Program`
**Duration**: 60 minutes
**Location**: In-Person (Wallington) or Video Call
**Price**: £256

**Description**:
```
Book your first session for the 4-Week Path to Wellness program.

✨ What's Included:
• 4 weekly 60-minute sessions (45 min Reiki + feedback)
• Daily guided meditations (5, 8, 12, 15 mins)
• Health questionnaire & progress reviews
• Plus 10% discount for Reiki for beginners workshop

Program Price: £256
Weekly Themes: Allow, Trust, Connect, Release

After booking, you'll receive a confirmation email with a questionnaire to complete before your first session.
```

**Payment**: Enable payment collection - £256
**Custom Questions**: (Add these in Koalendar)
- "How did you hear about us?" (Text)
- "Any scheduling preferences?" (Text)

**After Booking → Email Settings**:
- Enable "Send confirmation email"
- Customize the email template to include:
  ```
  Thank you for booking! Please complete your wellness questionnaire here:
  https://YOUR-WEBSITE.com/questionnaire.html
  ```

**Copy the URL** from Koalendar → Should look like: `https://koalendar.com/e/path-to-wellness-xxxxx`

---

#### Booking Page 2: Weight Loss & Wellbeing

**Event Name**: `Weight Loss & Wellbeing - 4-Week Program`
**Duration**: 75 minutes
**Location**: In-Person or Video Call
**Price**: £256 (or £80 for case study - create separate booking page)

**Description**:
```
Book your first session for the 4-Week Weight Loss & Wellbeing program.

✨ What's Included:
• 4 weekly 75-minute sessions (45 min Reiki + coaching)
• Daily guided meditations (5, 8, 12, 15 mins)
• Energy transformation & emotional weight release
• Address energetic blocks & old patterns

Program Price: £256
Weekly Themes: Allow, Trust, Connect, Release

After booking, you'll receive a confirmation email with a questionnaire to complete.
```

**Payment**: £256
**Copy the URL** → Use in website

---

#### Booking Page 3: Pathway Through Menopause

**Event Name**: `Pathway Through Menopause - 4-Week Program`
**Duration**: 75 minutes
**Location**: In-Person or Video Call
**Price**: £256 (or £100 for case study - create separate page)

**Description**:
```
Book your first session for the 4-Week Menopause Support program.

✨ What's Included:
• 4 weekly 75-minute sessions (45 min Reiki + coaching)
• Daily guided meditations (5, 8, 12, 15 mins)
• Emotional grounding & energy cleansing
• Reconnect with your true self & radiant presence

Program Price: £256
Weekly Themes: Acceptance, Release, Connect, Renew

Complete the wellness questionnaire after booking (link in confirmation email).
```

**Payment**: £256
**Copy the URL**

---

#### Booking Page 4: Experience Reiki (NEW!)

**Event Name**: `Experience Reiki - Single Session`
**Duration**: 60 minutes
**Location**: In-Person or Video Call
**Price**: £64

**Description**:
```
Try a single Reiki session before committing to a full program.

✨ What's Included:
• 60-minute session (45 min Reiki + feedback)
• Introduction to Reiki energy healing
• Personalized assessment and recommendations
• Perfect for first-time clients
• Can be applied toward a 4-week program

Single Session Price: £64

After booking, please complete the brief wellness questionnaire (link in your confirmation email).
```

**Payment**: £64
**Copy the URL**

---

#### Booking Page 5: Solo Follow-Up Session (NEW!)

**Event Name**: `Solo Follow-Up Session`
**Duration**: 60 minutes
**Location**: In-Person or Video Call
**Price**: £70

**Description**:
```
For clients who have completed a 4-week pathway and want to continue their wellness practice.

✨ What's Included:
• 60-minute session (45 min Reiki + feedback)
• Maintain your wellness momentum
• Address specific challenges or goals
• Flexible scheduling as needed

Session Price: £70
For past pathway program clients only.
```

**Payment**: £70
**Copy the URL**

---

#### Booking Page 6: Reiki Level One Consultation

**Event Name**: `Reiki Level One - Initial Consultation`
**Duration**: 30 minutes
**Location**: Phone or Video Call
**Price**: Free (no payment required)

**Description**:
```
Book a free 30-minute consultation to discuss the Reiki Level One Attunement course.

What You'll Learn in Reiki Level One:
• Understanding Reiki energy
• Hand positions & techniques
• Self-healing practices
• Level One attunement ceremony

This consultation helps answer your questions and ensure Reiki Level One is right for you.
```

**Copy the URL**

---

#### Booking Page 7: Reiki Level Two Consultation

**Event Name**: `Reiki Level Two - Initial Consultation`
**Duration**: 30 minutes
**Location**: Phone or Video Call
**Price**: Free

**Description**:
```
Book a consultation to discuss the Reiki Level Two Attunement course.

What You'll Learn in Reiki Level Two:
• Three sacred Reiki symbols
• Distance healing techniques
• Mental & emotional healing
• Level Two attunement ceremony

Note: Reiki Level One completion required.
```

**Copy the URL**

---

### Step 5: Customize Koalendar Email Templates

1. Go to **Settings** → **Notifications** → **Email Templates**
2. Edit the **Confirmation Email** template
3. Add this text:

```
Hi {Name},

Thank you for booking your {Event} session!

📅 Your Appointment:
Date: {Date}
Time: {Time}
Location: {Location}

💳 Payment Confirmed: {Amount}

📝 IMPORTANT - Next Step:
Please complete your wellness questionnaire before your first session:
👉 https://YOUR-WEBSITE.com/questionnaire.html

This helps Lorraine personalize your Reiki experience.

If you have any questions, contact Lorraine at:
📞 07846 633248
✉️ lorraine@happinessinharmony.co.uk

Looking forward to your session!

Lorraine Turner
Happiness in Harmony
Reiki - Your Path to Wellness
```

4. **Save** the template

---

## Part 2️⃣: EmailJS Setup (for Questionnaire)

EmailJS will send questionnaire responses to you automatically.

### Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com**
2. Click "Sign Up" (free tier = 200 emails/month)
3. Verify your email

### Step 2: Connect Your Email Service

1. In EmailJS dashboard, click **Add New Service**
2. Choose your email provider:
   - **Gmail** (recommended for simplicity)
   - Outlook
   - Yahoo
   - Or use your custom domain
3. Follow the connection steps
4. **Copy your Service ID** → Save it (you'll need this)

### Step 3: Create Email Template for Questionnaire

1. Click **Email Templates** → **Create New Template**
2. **Template Name**: `questionnaire_submission`
3. **Template Content**:

**Subject**:
```
New Wellness Questionnaire: {{fullName}} - {{program}}
```

**Body**:
```
New Wellness Questionnaire Submitted

CLIENT DETAILS:
Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
Program: {{program}}
Submitted: {{submittedDate}}

REIKI EXPERIENCE:
Previous Experience: {{experience}}

WELLNESS GOALS:
{{goals}}

HEALTH CONDITIONS:
{{health}}

CONCERNS/QUESTIONS:
{{concerns}}

PREFERRED CONTACT METHOD:
{{preferences}}

---
Please respond to this client before their first session.
```

4. **Save Template**
5. **Copy Template ID** → Save it

### Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. **Copy your Public Key** → Save it

### Step 5: Update Website Files

You need to add your EmailJS credentials to two places:

**File 1: questionnaire.html**

Find these 3 lines and replace:

```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');  // Line ~14
// Replace with: emailjs.init('your_actual_public_key');

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)  // Line ~189
// Replace YOUR_SERVICE_ID with your actual service ID
// Replace YOUR_TEMPLATE_ID with your template ID (questionnaire_submission)
```

**How to update:**
1. Open `questionnaire.html` in a text editor
2. Press Ctrl+F (Find)
3. Search for `YOUR_EMAILJS_PUBLIC_KEY`
4. Replace with your actual public key
5. Search for `YOUR_SERVICE_ID` → Replace
6. Search for `YOUR_TEMPLATE_ID` → Replace
7. Save the file

---

## Part 3️⃣: Update Website with Koalendar URLs

You need to replace the placeholder URLs in your website with your actual Koalendar booking page URLs.

### File to Update: index.html

Open `index.html` and find/replace these 7 URLs:

| Line | Find | Replace With |
|------|------|--------------|
| ~121 | `https://koalendar.com/e/YOUR-PAGE-WELLNESS` | Your Path to Wellness URL |
| ~140 | `https://koalendar.com/e/YOUR-PAGE-WEIGHTLOSS` | Your Weight Loss URL |
| ~158 | `https://koalendar.com/e/YOUR-PAGE-MENOPAUSE` | Your Menopause URL |
| ~187 | `https://koalendar.com/e/YOUR-PAGE-EXPERIENCE` | Your Experience Reiki URL |
| ~203 | `https://koalendar.com/e/YOUR-PAGE-SOLO` | Your Solo Session URL |
| ~255 | `https://koalendar.com/e/YOUR-PAGE-REIKI1` | Your Reiki Level 1 URL |
| ~267 | `https://koalendar.com/e/YOUR-PAGE-REIKI2` | Your Reiki Level 2 URL |

**Also update the questionnaire link in Koalendar email template** (from Part 1, Step 5):
- Replace `https://YOUR-WEBSITE.com/questionnaire.html`
- With your actual website URL (e.g., `https://reikiwellness.com/questionnaire.html`)

---

## Part 4️⃣: Testing Your Setup

### Test 1: Booking Flow

1. Open your website
2. Click "Book This Program" on the Wellness card
3. **Expected**: Koalendar popup appears
4. Select a test time slot
5. Enter test details (use your own email)
6. **Don't complete payment yet** (unless you want to test the full flow)

### Test 2: Questionnaire

1. Go to `https://your-website.com/questionnaire.html`
2. Fill out the form completely
3. Click Submit
4. **Expected**: Success message appears
5. **Check your email**: You should receive the questionnaire submission

### Test 3: Full End-to-End Test

1. Book a real session (you can cancel/refund yourself later)
2. Complete payment
3. Check confirmation email with questionnaire link
4. Click questionnaire link
5. Complete and submit questionnaire
6. Verify you received the questionnaire email

---

## 📊 What You'll Receive

### When Someone Books:

1. **Koalendar Email Notification**:
   - "New booking: [Client Name]"
   - Date, time, program
   - Payment confirmation

2. **Stripe Payment Notification**:
   - Payment received
   - Amount minus fees
   - Payout schedule

3. **When they complete questionnaire**:
   - EmailJS sends you their full questionnaire
   - All their health info, goals, concerns

---

## 💰 Costs Summary

| Service | Cost | What It Does |
|---------|------|--------------|
| Koalendar Pro | £8-10/month | Booking system + Stripe integration |
| Stripe | 2.9% + 20p per transaction | Payment processing |
| EmailJS | Free (up to 200/month) | Questionnaire email delivery |
| **Total Monthly** | **~£8-15** | Full automation |

**Transaction Example**: £256 program
- Stripe fee: £7.62
- You receive: £248.38
- Monthly Koalendar: £10
- **Net for 4-week program: ~£238**

---

## 🆘 Troubleshooting

### Problem: Koalendar popup doesn't open
**Solution**: Make sure you updated ALL 7 URLs in index.html with your actual Koalendar URLs

### Problem: Questionnaire emails not sending
**Solution**:
1. Check you replaced all 3 EmailJS placeholders in questionnaire.html
2. Verify your EmailJS service is connected
3. Check EmailJS dashboard for error logs

### Problem: Payments not working
**Solution**:
1. Verify Stripe is connected in Koalendar settings
2. Check your Stripe account is fully verified
3. Ensure payment is enabled for each booking page

### Problem: Clients not receiving confirmation email
**Solution**:
1. Check Koalendar email template is saved
2. Verify email notifications are enabled in Settings
3. Check client's spam folder

---

## ✅ Final Checklist

Before going live:

- [ ] Koalendar Pro account created and paid
- [ ] Stripe connected to Koalendar
- [ ] All 7 booking pages created in Koalendar
- [ ] Prices set correctly on each page
- [ ] All 7 Koalendar URLs copied
- [ ] Confirmation email template customized
- [ ] EmailJS account created
- [ ] Email service connected in EmailJS
- [ ] Questionnaire template created in EmailJS
- [ ] All 3 EmailJS credentials added to questionnaire.html
- [ ] All 7 URLs updated in index.html
- [ ] Questionnaire URL updated in Koalendar email template
- [ ] Test booking completed successfully
- [ ] Test questionnaire submitted successfully
- [ ] Received test emails for both

---

## 🎉 You're Live!

Once all checklist items are complete, your automated booking system is fully operational!

**Your clients will**:
1. Book & pay instantly via your website
2. Receive immediate confirmation
3. Complete their questionnaire
4. You respond personally
5. They attend their session

**You'll**:
1. Get instant notifications for new bookings
2. See payments in your Stripe account
3. Receive questionnaire responses via email
4. Have time to prepare for each client personally

---

## 📞 Support Resources

**Koalendar Help**:
- Help Center: https://help.koalendar.com
- Live Chat: In Koalendar dashboard
- Email: support@koalendar.com

**Stripe Support**:
- Help: https://support.stripe.com
- Dashboard: https://dashboard.stripe.com

**EmailJS Support**:
- Docs: https://www.emailjs.com/docs/
- Email: support@emailjs.com

**Website Updates**:
- Contact: Jim (your web developer)

---

**Document Created**: November 2025
**Version**: 2.0 (Pro Setup)
**For questions about website code**: Contact Jim

---

## 🔄 Monthly Maintenance

**Monthly Tasks** (5 minutes):
1. Check Koalendar Pro subscription is active
2. Review Stripe payout schedule
3. Monitor EmailJS email quota (free tier = 200/month)
4. Update availability in Koalendar calendar as needed

**When to Upgrade EmailJS** (if you exceed 200 questionnaires/month):
- Personal Plan: $15/month = 1,000 emails
- You'd need 50+ bookings/month to exceed free tier

---

Good luck with your automated booking system! 🌟
