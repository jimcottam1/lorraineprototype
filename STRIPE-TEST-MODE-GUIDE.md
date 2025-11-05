# 💳 Stripe Test Mode Setup Guide

**Purpose**: Test your booking and payment flow without processing real money
**Time**: 20-30 minutes
**Cost**: FREE (no charges in test mode)

---

## 🎯 What You'll Accomplish

By the end of this guide, you'll be able to:
- Accept test bookings with fake credit cards
- See how payments flow through Stripe
- Test the entire customer journey
- Verify emails and confirmations work
- Switch to live mode when ready

---

## Part 1️⃣: Create Your Stripe Account

### Step 1: Sign Up for Stripe

1. Go to **https://stripe.com**
2. Click **"Start now"** or **"Sign up"**
3. Enter your email address
4. Create a password
5. Verify your email

### Step 2: Complete Basic Profile

After signing up, you'll land on the Stripe Dashboard.

1. **Country**: United Kingdom
2. **Business Type**: Individual (unless you have a registered company)
3. **Business Name**: Happiness in Harmony
4. **Industry**: Health & Wellness / Holistic Therapy

**Important**: You can skip detailed verification for now since you're testing. Stripe will let you use test mode immediately.

---

## Part 2️⃣: Understanding Test Mode vs Live Mode

### Test Mode (Starting Point)

When you first create your Stripe account, you'll see a toggle switch in the top right that says **"Test mode"**.

**Test Mode Features**:
- ✅ FREE - No real money is processed
- ✅ Use fake credit card numbers
- ✅ Test your entire booking flow
- ✅ See how transactions appear
- ✅ No risk of accidental charges

**Test Mode Toggle**:
```
[Viewing test data] ← Toggle switch
```

Make sure this is **ON** (showing "Viewing test data") for all testing.

### Live Mode (After Testing)

Once you're ready to accept real payments:
- Complete Stripe business verification
- Add your bank account
- Switch to Live mode
- Use live API keys

---

## Part 3️⃣: Get Your Stripe API Keys

### Step 1: Find Your API Keys

1. In Stripe Dashboard, click **Developers** in the top menu
2. Click **API keys** in the left sidebar
3. You'll see two sets of keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...` - click "Reveal" to see it)

### Step 2: Save Your Test Keys

**IMPORTANT**: Copy and save these somewhere safe (don't share them publicly):

```
Test Publishable Key: pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
Test Secret Key: sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Note**: These are TEST keys - they only work with test card numbers and won't charge real money.

---

## Part 4️⃣: Connect Stripe to Koalendar (Test Mode)

### Step 1: Access Koalendar Settings

1. Log into your **Koalendar** account
2. Go to **Settings** → **Payments**
3. Click **"Connect Stripe"** or **"Add Payment Method"**

### Step 2: Authorize Connection

Koalendar will redirect you to Stripe to authorize the connection:

1. **Sign in to Stripe** (if prompted)
2. **Review permissions** - Koalendar needs access to:
   - Create charges
   - View transactions
   - Issue refunds
3. **Click "Connect"** or **"Authorize"**

### Step 3: Verify Connection

Back in Koalendar, you should see:
- ✅ Stripe Connected
- Your Stripe account email
- Connection status: Active

### Step 4: Enable Test Mode in Koalendar

**IMPORTANT**: Make sure Koalendar knows you're testing:

1. In Koalendar Settings → Payments
2. Look for **"Test Mode"** toggle or checkbox
3. **Enable Test Mode**
4. You should see a banner: "You're in test mode - no real charges will be made"

**Note**: Some versions of Koalendar automatically detect if you connected Stripe in test mode. Check for any "Test Mode" indicators.

---

## Part 5️⃣: Set Up a Test Booking Page

### Step 1: Create or Edit a Booking Page

1. In Koalendar, go to **Booking Pages**
2. Click on one of your existing pages (e.g., "Path to Wellness")
3. Or create a new test page: **"TEST - Experience Reiki"**

### Step 2: Enable Payment Collection

In the booking page settings:

1. Scroll to **"Payment"** or **"Pricing"** section
2. Toggle **"Collect payment"** to ON
3. **Amount**: £10 (or any small amount for testing)
4. **Currency**: GBP
5. **Payment timing**: "At time of booking"

### Step 3: Save and Get URL

1. **Save** the booking page
2. **Copy the URL** (e.g., `https://koalendar.com/e/test-reiki-123`)
3. You'll use this to test bookings

---

## Part 6️⃣: Test the Booking Flow

### Step 1: Make a Test Booking

1. Open your test booking page URL in an incognito/private browser window
2. Select a date and time
3. Fill in your details:
   - Name: Test Customer
   - Email: your-email+test@gmail.com (Gmail ignores +test)
   - Phone: 07700 900000 (UK test number)

### Step 2: Enter Test Payment Details

When you get to the payment screen, use these **Stripe test card numbers**:

**✅ Successful Payment**:
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
Postal Code: Any UK postcode (e.g., SW1A 1AA)
```

**❌ Payment Declined** (to test errors):
```
Card Number: 4000 0000 0000 0002
```

**🔒 3D Secure Authentication Required**:
```
Card Number: 4000 0025 0000 3155
```

**Full list of test cards**: https://stripe.com/docs/testing#cards

### Step 3: Complete the Booking

1. Click **"Pay"** or **"Complete Booking"**
2. Wait for confirmation
3. You should see:
   - ✅ Booking confirmation screen
   - ✅ Confirmation email from Koalendar
   - ✅ (Eventually) Questionnaire link in email

---

## Part 7️⃣: Verify in Stripe Dashboard

### Step 1: Check the Payment

1. Go to your **Stripe Dashboard**
2. Make sure **Test mode** is toggled ON
3. Click **Payments** in the left menu
4. You should see your test payment:
   - Amount: £10.00
   - Status: Succeeded
   - Customer name
   - Date/time

### Step 2: View Payment Details

Click on the payment to see:
- Customer information
- Card details (last 4 digits)
- Timeline of events
- Fees (in test mode, these are simulated)

### Step 3: Test a Refund

1. While viewing the payment, click **"Refund payment"**
2. Enter the amount (full or partial)
3. Click **"Refund"**
4. Status changes to "Refunded"

**Note**: In test mode, refunds are instant. In live mode, they take 5-10 business days.

---

## Part 8️⃣: Test Different Scenarios

### Scenario 1: Successful Booking

✅ **Test**: Use card `4242 4242 4242 4242`
✅ **Expected**: Payment succeeds, booking confirmed, emails sent

### Scenario 2: Declined Card

❌ **Test**: Use card `4000 0000 0000 0002`
❌ **Expected**: Payment fails, error message shown, no booking created

### Scenario 3: Authentication Required

🔒 **Test**: Use card `4000 0025 0000 3155`
🔒 **Expected**: 3D Secure popup appears, click "Authenticate", payment succeeds

### Scenario 4: Insufficient Funds

💳 **Test**: Use card `4000 0000 0000 9995`
💳 **Expected**: Payment declined with "insufficient funds" message

### Scenario 5: Refund

💷 **Test**: Complete a booking, then refund it in Stripe dashboard
💷 **Expected**: Payment status changes to "Refunded"

---

## Part 9️⃣: Test Email Flow

### Test Complete Customer Journey

1. **Make a test booking** with your real email address
2. **Check for confirmation email** from Koalendar
3. **Click questionnaire link** in the email
4. **Complete questionnaire** on questionnaire.html
5. **Check your email** for questionnaire submission
6. **Verify** you received:
   - ✅ Koalendar booking confirmation (to customer)
   - ✅ Koalendar booking notification (to you)
   - ✅ Stripe payment receipt (to customer, if enabled)
   - ✅ EmailJS questionnaire submission (to you)

---

## Part 🔟: Switch to Live Mode (When Ready)

### Before Going Live - Complete Verification

Stripe requires you to verify your business before accepting real payments:

1. In Stripe Dashboard, look for **"Activate your account"** banner
2. Click **"Finish account setup"**
3. Provide:
   - Personal identification (passport/driver's license)
   - Business details
   - Bank account for payouts
   - Tax information (if applicable)

**Verification time**: Usually 1-3 business days

### Step 1: Switch to Live Mode

Once verified:

1. Toggle **Test mode** to **OFF** in Stripe Dashboard
2. You'll now see **"Viewing live data"**
3. Go to **Developers** → **API keys**
4. You'll see your **Live keys**:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### Step 2: Reconnect Koalendar in Live Mode

**Option A - Koalendar automatically switches**:
- Some integrations auto-detect when Stripe moves to live mode
- Check if your bookings are now processing real payments

**Option B - Reconnect manually**:
1. Go to Koalendar Settings → Payments
2. **Disconnect** Stripe
3. **Reconnect** Stripe (it will now use live mode)
4. **Disable Test Mode** in Koalendar

### Step 3: Update Booking Page Prices

Update your test booking pages to real prices:
- Experience Reiki: £10 → £64
- Solo Session: £10 → £70
- 4-Week Programs: £10 → £256

### Step 4: Test with Real Card (Small Amount)

Before announcing:
1. Make a real booking with your own card
2. Use a small amount (£1 test booking)
3. Verify everything works
4. Refund yourself
5. Then go fully live!

---

## 💰 Understanding Stripe Fees

### Test Mode
- **No fees** - completely free
- Simulated fee: 2.9% + 20p (shown but not charged)

### Live Mode
**UK Domestic Cards**:
- **2.9% + 20p** per successful charge

**Example Calculations**:
```
£64 Experience Reiki:
- Gross: £64.00
- Stripe fee: £2.06
- Net: £61.94

£256 4-Week Program:
- Gross: £256.00
- Stripe fee: £7.62
- Net: £248.38
```

**Payout Schedule**:
- Default: Every 2 days to your bank account
- You can change this to weekly/monthly in Settings

---

## 🆘 Troubleshooting

### Problem: Can't Connect Stripe to Koalendar

**Solutions**:
1. Make sure you're signed into the correct Stripe account
2. Try disconnecting and reconnecting
3. Clear browser cache and try again
4. Check Koalendar supports Stripe in your country (UK = Yes)

### Problem: Test Payments Not Showing in Stripe

**Solutions**:
1. Confirm Test Mode is ON in Stripe Dashboard
2. Check you used a test card number (`4242 4242 4242 4242`)
3. Look under Payments in Stripe (not Payouts)
4. Refresh the page

### Problem: Real Card Being Charged in Test Mode

**This should never happen** - Stripe prevents this by design:
- Test mode ONLY accepts test card numbers
- Real cards will be declined in test mode
- If somehow a real charge occurred, contact Stripe immediately

### Problem: Can't Switch to Live Mode

**Solutions**:
1. Complete all verification steps in Stripe
2. Add bank account for payouts
3. Wait for Stripe approval (1-3 days)
4. Contact Stripe support if stuck

---

## ✅ Testing Checklist

Before going live, test:

- [ ] Create test Stripe account
- [ ] Connect Stripe to Koalendar in test mode
- [ ] Create test booking page with small amount
- [ ] Test successful payment (`4242 4242 4242 4242`)
- [ ] Test declined payment (`4000 0000 0000 0002`)
- [ ] Test 3D Secure payment (`4000 0025 0000 3155`)
- [ ] Verify payment appears in Stripe dashboard
- [ ] Test refund process
- [ ] Receive booking confirmation email
- [ ] Click questionnaire link
- [ ] Complete and submit questionnaire
- [ ] Receive questionnaire email
- [ ] Complete Stripe verification
- [ ] Switch to live mode
- [ ] Update prices to real amounts
- [ ] Test with real card (£1 booking)
- [ ] Refund test booking
- [ ] Go live! 🚀

---

## 📊 What to Monitor After Going Live

### Daily
- Check Stripe Dashboard for new payments
- Verify bookings match payments
- Respond to questionnaires

### Weekly
- Review payout schedule
- Check for failed payments
- Monitor refund requests

### Monthly
- Review total revenue
- Calculate Stripe fees
- Reconcile with your accounting

---

## 🔐 Security Best Practices

### Protect Your API Keys

**Never share**:
- ❌ Don't post in public forums
- ❌ Don't commit to GitHub
- ❌ Don't email to anyone
- ❌ Don't screenshot and share

**Safe storage**:
- ✅ Save in password manager
- ✅ Keep in secure notes
- ✅ Store in environment variables (for developers)

### Monitor for Suspicious Activity

Watch for:
- Multiple failed payment attempts
- Unusual booking patterns
- Chargebacks or disputes
- Unfamiliar refund requests

Stripe has built-in fraud detection, but stay vigilant.

---

## 📞 Support Resources

### Stripe Support
- **Dashboard**: https://dashboard.stripe.com
- **Help**: https://support.stripe.com
- **Testing Docs**: https://stripe.com/docs/testing
- **Phone**: Available in dashboard (UK support)
- **Chat**: Available 24/7 in dashboard

### Koalendar Support
- **Help Center**: https://help.koalendar.com
- **Email**: support@koalendar.com
- **Chat**: In Koalendar dashboard

### Payment Issues
- Customer disputes: Handle via Stripe Dashboard
- Refund requests: Process in Stripe Dashboard
- Technical issues: Contact Koalendar support first

---

## 🎓 Learning Resources

### Stripe Testing
- Test Card Numbers: https://stripe.com/docs/testing#cards
- Test Webhooks: https://stripe.com/docs/webhooks/test
- Simulating Scenarios: https://stripe.com/docs/testing#test-mode

### Understanding Payments
- Stripe Dashboard Tour: https://stripe.com/docs/dashboard
- Payment Lifecycle: https://stripe.com/docs/payments/payment-intents
- Handling Refunds: https://stripe.com/docs/refunds

---

## 🚀 Quick Start Summary

**5-Minute Test Setup**:

1. Sign up for Stripe → https://stripe.com
2. Stay in Test Mode (default)
3. Connect to Koalendar (Settings → Payments)
4. Create test booking page (£10 test price)
5. Book with card `4242 4242 4242 4242`
6. Check Stripe Dashboard for payment
7. Test complete! ✅

**When Ready to Go Live**:

1. Complete Stripe verification
2. Switch to Live Mode
3. Update prices to real amounts
4. Test with real card (£1)
5. Launch! 🎉

---

## 📝 Test Mode Reminders

**While Testing**:
- 🔒 Always verify "Viewing test data" is shown in Stripe
- 🔒 Only use test card numbers (start with 4000, 4242, etc.)
- 🔒 Emails will still send (use your real email to test)
- 🔒 No real money will be charged
- 🔒 You can test unlimited times for free

**Ready for Live**:
- ✅ Complete Stripe verification
- ✅ Add bank account
- ✅ Switch to live mode
- ✅ Update all test prices
- ✅ Announce to clients!

---

**Good luck with your testing!** 🎊

If you get stuck, refer to this guide or reach out to Stripe support - they're very helpful and available 24/7.

---

**Document Created**: November 2025
**Version**: 1.0 (Test Mode Guide)
**For questions**: Contact Jim or Stripe Support
