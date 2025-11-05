# 🎉 FREE Booking System Setup Guide

**Your new booking system is ready!** This guide will walk you through the final setup steps.

**Total Setup Time**: 30-45 minutes
**Monthly Cost**: £0 (FREE forever)
**What You Need**: Stripe account + EmailJS account

---

## 📋 What's Been Built For You

✅ **booking.html** - Professional booking form with all 7 programs
✅ **booking-confirmation.html** - Thank you page with payment links
✅ **questionnaire.html** - Wellness questionnaire (already set up)
✅ **Updated index.html** - All "Book Now" buttons link to booking form

---

## 🎯 How It Works

### **Client Journey:**
1. Click "Book Experience Reiki" → Goes to booking form
2. Fill out form (name, email, preferences) → Submit
3. See confirmation page with payment link
4. Click "Pay £64 Now" → Pay via Stripe
5. Complete questionnaire
6. Wait for your personal confirmation

### **Your Journey:**
1. Receive email when someone books
2. Check Stripe for payment confirmation
3. Review their questionnaire
4. Reach out personally to schedule exact time

---

## Part 1️⃣: Stripe Payment Links Setup

### Step 1: Create Stripe Account (if you don't have one)

1. Go to **https://stripe.com**
2. Click **"Start now"**
3. Enter email and create password
4. Choose **United Kingdom**
5. Select **Individual** (or Business if you're registered)

**Important**: You'll land in **Test Mode** by default - perfect for testing!

---

### Step 2: Create 5 Payment Links (Paid Programs)

You need to create payment links for the 5 paid programs. Here's how:

#### **Payment Link 1: Experience Reiki (£64)**

1. In Stripe Dashboard, go to **Products** → **Payment links**
2. Click **"+ New"** or **"Create payment link"**
3. Fill in details:

```
Product name: Experience Reiki Session
Description: 60-minute Reiki session with personalized assessment and feedback

Price: £64.00
Currency: GBP

Advanced options:
☑️ Collect customer's billing address
☑️ Collect customer's phone number

After payment:
→ Show confirmation page
→ OR redirect to: https://yourwebsite.com/questionnaire.html
```

4. Click **"Create link"**
5. **Copy the payment link** → It looks like:
   ```
   https://buy.stripe.com/test/xxxxx123
   ```
6. **Save this URL** - you'll need it!

---

#### **Payment Link 2: Solo Follow-Up Session (£70)**

Repeat the same process:

```
Product name: Solo Follow-Up Session
Description: 60-minute Reiki follow-up session for past pathway clients

Price: £70.00
Currency: GBP

☑️ Collect customer's billing address
☑️ Collect customer's phone number
```

**Copy and save the link**

---

#### **Payment Link 3: Path to Wellness (£256)**

```
Product name: Path to Wellness - 4-Week Program
Description: 4 weekly sessions, daily meditations, health questionnaire, and progress reviews

Price: £256.00
Currency: GBP

☑️ Collect customer's billing address
☑️ Collect customer's phone number
```

**Copy and save the link**

---

#### **Payment Link 4: Weight Loss & Wellbeing (£256)**

```
Product name: Weight Loss & Wellbeing - 4-Week Program
Description: 4 weekly sessions focusing on energy transformation and emotional weight release

Price: £256.00
Currency: GBP

☑️ Collect customer's billing address
☑️ Collect customer's phone number
```

**Copy and save the link**

---

#### **Payment Link 5: Pathway Through Menopause (£256)**

```
Product name: Pathway Through Menopause - 4-Week Program
Description: 4 weekly sessions for menopause support with emotional grounding and energy cleansing

Price: £256.00
Currency: GBP

☑️ Collect customer's billing address
☑️ Collect customer's phone number
```

**Copy and save the link**

---

### Step 3: Update Your Website with Payment Links

Now you need to add your Stripe payment links to the website.

**File to edit**: `booking-confirmation.html`

1. Open `booking-confirmation.html` in a text editor
2. Find this section (around line 145-155):

```javascript
// Stripe Payment Links - Replace these with your actual Stripe payment link URLs
const PAYMENT_LINKS = {
    'experience': 'https://buy.stripe.com/test/YOUR-EXPERIENCE-LINK',
    'solo': 'https://buy.stripe.com/test/YOUR-SOLO-LINK',
    'wellness': 'https://buy.stripe.com/test/YOUR-WELLNESS-LINK',
    'weightloss': 'https://buy.stripe.com/test/YOUR-WEIGHTLOSS-LINK',
    'menopause': 'https://buy.stripe.com/test/YOUR-MENOPAUSE-LINK',
    'reiki1': null,
    'reiki2': null
};
```

3. **Replace the placeholder URLs** with your actual Stripe payment links:

```javascript
const PAYMENT_LINKS = {
    'experience': 'https://buy.stripe.com/test/abc123def456',  // Your actual Experience Reiki link
    'solo': 'https://buy.stripe.com/test/ghi789jkl012',  // Your actual Solo Session link
    'wellness': 'https://buy.stripe.com/test/mno345pqr678',  // Your actual Wellness link
    'weightloss': 'https://buy.stripe.com/test/stu901vwx234',  // Your actual Weight Loss link
    'menopause': 'https://buy.stripe.com/test/yza567bcd890',  // Your actual Menopause link
    'reiki1': null,  // Free consultation - no payment needed
    'reiki2': null   // Free consultation - no payment needed
};
```

4. **Save the file**

---

### Step 4: Test with Stripe Test Cards

Before going live, test the payment flow:

1. Go to your website
2. Click "Book Experience Reiki"
3. Fill out the booking form
4. Submit and get to confirmation page
5. Click "Pay £64 Now"
6. Use this **test card**:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (12/26)
CVC: Any 3 digits (123)
Postal Code: Any UK postcode (SW1A 1AA)
```

7. Complete payment
8. Check your Stripe Dashboard → You should see the test payment!

---

## Part 2️⃣: EmailJS Setup for Booking Notifications

When someone submits a booking, you want to receive an email with their details.

### Step 1: Create EmailJS Account (if you don't have one)

1. Go to **https://www.emailjs.com**
2. Click **"Sign Up"**
3. Create account (free tier = 200 emails/month)
4. Verify your email

---

### Step 2: Connect Your Email Service

1. In EmailJS dashboard, click **"Add New Service"**
2. Choose **Gmail** (recommended) or your email provider
3. Click **"Connect Account"**
4. Follow the Gmail authorization steps
5. Once connected, **copy your Service ID** (looks like `service_abc123`)
6. **Save this ID**

---

### Step 3: Create Email Template for Booking Notifications

1. Click **"Email Templates"** in EmailJS
2. Click **"Create New Template"**
3. **Template Name**: `booking_notification`

**Subject Line**:
```
New Booking Request - {{program}}
```

**Email Body**:
```
NEW BOOKING REQUEST

CLIENT DETAILS:
Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
Submitted: {{submittedDate}}

PROGRAM/SESSION:
{{program}}
Price: £{{price}}

SCHEDULING PREFERENCES:
Preferred Days: {{preferredDays}}
Preferred Times: {{preferredTimes}}

ADDITIONAL NOTES:
{{notes}}

---

NEXT STEPS:
1. Check Stripe dashboard for payment: https://dashboard.stripe.com
2. Review their questionnaire (they'll complete it after payment)
3. Contact them within 24 hours to confirm specific time

Payment Link Sent: Yes
```

4. Click **"Save"**
5. **Copy the Template ID** (looks like `template_xyz789`)
6. **Save this ID**

---

### Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Find your **Public Key** (looks like `your_public_key_abc123`)
3. **Copy and save this**

---

### Step 5: Update Website with EmailJS Credentials

You need to add your EmailJS credentials to **2 files**:

#### **File 1: booking.html**

1. Open `booking.html` in a text editor
2. Find line ~14:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```

3. Replace with your actual public key:
```javascript
emailjs.init('your_actual_public_key_123');
```

4. Find line ~290:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', bookingData)
```

5. Replace with your actual IDs:
```javascript
emailjs.send('service_abc123', 'template_xyz789', bookingData)
```

6. **Save the file**

---

#### **File 2: questionnaire.html** (if not already done)

1. Open `questionnaire.html`
2. Find line ~14:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```

3. Replace with your actual public key (same as booking.html)

4. Find line ~189:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
```

5. Replace:
   - `YOUR_SERVICE_ID` → Your service ID
   - `YOUR_TEMPLATE_ID` → Your questionnaire template ID (you already set this up)

6. **Save the file**

---

## Part 3️⃣: Testing Your Complete System

### Test the Full Workflow:

**Step 1: Test Booking**
1. Go to your website
2. Click any "Book Now" button
3. Fill out the booking form
4. Submit

**Expected Result**:
- ✅ You receive email with booking details
- ✅ Client sees confirmation page with payment button

---

**Step 2: Test Payment**
1. Click "Pay £X Now" button
2. Enter test card: `4242 4242 4242 4242`
3. Complete payment

**Expected Result**:
- ✅ Payment succeeds
- ✅ Client sees payment confirmation
- ✅ You see payment in Stripe Dashboard

---

**Step 3: Test Questionnaire**
1. Click "Complete Questionnaire" link
2. Fill out and submit questionnaire

**Expected Result**:
- ✅ You receive email with questionnaire responses

---

**Step 4: Verify All Emails**
Check you received:
- ✅ Booking notification email (from EmailJS)
- ✅ Stripe payment notification (from Stripe)
- ✅ Questionnaire submission (from EmailJS)

---

## Part 4️⃣: Going Live (Switch from Test to Live Mode)

Once you've tested everything and you're ready to accept real payments:

### Step 1: Complete Stripe Verification

1. In Stripe Dashboard, look for **"Activate your account"**
2. Click and complete:
   - Personal identification
   - Business details
   - Bank account for payouts
   - Tax information

**Verification Time**: 1-3 business days

---

### Step 2: Create Live Payment Links

1. In Stripe Dashboard, **toggle Test Mode to OFF**
2. Now you're in **Live Mode**
3. Go to **Products** → **Payment links**
4. **Create the same 5 payment links again** (but in live mode)
5. Copy all 5 live payment link URLs

---

### Step 3: Update Website with Live Links

1. Open `booking-confirmation.html`
2. Find the `PAYMENT_LINKS` section
3. **Replace test links with live links**:

```javascript
const PAYMENT_LINKS = {
    'experience': 'https://buy.stripe.com/abc123...',  // LIVE link (no "test" in URL)
    'solo': 'https://buy.stripe.com/def456...',
    'wellness': 'https://buy.stripe.com/ghi789...',
    'weightloss': 'https://buy.stripe.com/jkl012...',
    'menopause': 'https://buy.stripe.com/mno345...',
    'reiki1': null,
    'reiki2': null
};
```

4. **Save and upload to your web server**

---

### Step 4: Test with Real Card (Small Amount)

Before fully launching:
1. Make a real booking (use £1 or book a real session)
2. Pay with your real card
3. Verify everything works
4. Refund yourself in Stripe Dashboard if needed

---

## ✅ Setup Checklist

Before going live:

**Stripe Setup:**
- [ ] Created Stripe account
- [ ] Created 5 payment links in test mode
- [ ] Updated booking-confirmation.html with test links
- [ ] Tested payment with test card (4242...)
- [ ] Verified payment appears in Stripe dashboard

**EmailJS Setup:**
- [ ] Created EmailJS account
- [ ] Connected email service (Gmail)
- [ ] Created booking notification template
- [ ] Got Service ID, Template ID, Public Key
- [ ] Updated booking.html with EmailJS credentials
- [ ] Updated questionnaire.html with EmailJS credentials
- [ ] Tested booking email notification
- [ ] Tested questionnaire email notification

**Full Workflow Test:**
- [ ] Completed test booking end-to-end
- [ ] Received booking notification email
- [ ] Completed test payment
- [ ] Saw payment in Stripe
- [ ] Completed test questionnaire
- [ ] Received questionnaire email
- [ ] All emails working correctly

**Going Live:**
- [ ] Completed Stripe verification
- [ ] Created live payment links
- [ ] Updated website with live links
- [ ] Tested with real card (small amount)
- [ ] Announced to clients! 🎉

---

## 💰 Cost Breakdown

| Service | Cost | What It Does |
|---------|------|--------------|
| **Stripe** | 2.9% + 20p per transaction | Payment processing |
| **EmailJS** | FREE (up to 200/month) | Booking & questionnaire emails |
| **Website hosting** | Your existing cost | Hosts the booking forms |
| **Total Monthly** | **£0 subscription** | Only pay per transaction |

**Example**: £64 Experience Reiki booking
- Gross: £64.00
- Stripe fee: £2.06
- You receive: £61.94

---

## 🔄 Daily Workflow

### When You Receive a Booking:

**1. Check Email** (5 min)
- Open booking notification email
- Note: Name, program, preferred days/times

**2. Check Stripe** (2 min)
- Go to https://dashboard.stripe.com
- Verify payment received
- Match customer name to booking

**3. Check Questionnaire** (5 min)
- Wait for questionnaire email (usually within 30 min of booking)
- Review their health info and goals

**4. Reach Out Personally** (5 min)
- Email or call client
- Confirm specific date/time based on their preferences
- Answer any questions
- Add to your calendar

**Total Time per Booking**: ~15-20 minutes

---

## 🆘 Troubleshooting

### Problem: Not receiving booking emails

**Solutions**:
1. Check spam/junk folder
2. Verify EmailJS Service ID and Template ID in booking.html
3. Check EmailJS dashboard for failed sends
4. Test EmailJS connection

---

### Problem: Payment link not working

**Solutions**:
1. Verify you copied the full Stripe link
2. Check you're using the correct link for test/live mode
3. Make sure client clicked the "Pay" button (not just viewing page)

---

### Problem: Test card declined

**Solution**:
- Make sure you're using: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- If still declining, you might be in Live mode - switch to Test mode

---

### Problem: Client didn't receive confirmation

**Solution**:
- Check their spam folder
- Verify Stripe sends receipt emails (check Stripe settings)
- You can manually email them the questionnaire link

---

## 📞 Support Resources

**Stripe**:
- Dashboard: https://dashboard.stripe.com
- Support: https://support.stripe.com
- Chat: Available 24/7 in dashboard

**EmailJS**:
- Dashboard: https://dashboard.emailjs.com
- Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com

**Website Issues**:
- Contact: Jim (your web developer)

---

## 🎉 You're All Set!

Once you complete this setup:
- ✅ Clients can book 24/7 from your website
- ✅ They pay securely via Stripe
- ✅ You get instant notifications
- ✅ You personally schedule each session
- ✅ All for FREE (only Stripe transaction fees)

**Next Steps**:
1. Complete the setup checklist above
2. Test everything thoroughly
3. When ready, go live!
4. Share your website and start getting bookings!

---

**Questions?** Contact Jim or reach out to Stripe/EmailJS support.

**Good luck!** 🌟
