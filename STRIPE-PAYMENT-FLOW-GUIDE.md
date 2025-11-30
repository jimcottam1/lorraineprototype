# Stripe Payment Flow - Complete Setup Guide

## 🎯 How It Works

Your payment flow is already set up! Here's how it works:

```
Customer Books
    ↓
Backend creates booking + Stripe checkout session
    ↓
Customer redirected to Stripe payment page
    ↓
Customer pays with card
    ↓
Stripe redirects to booking-success.html
    ↓
Stripe webhook calls your backend
    ↓
Backend marks booking as 'paid'
    ↓
Confirmation email sent to customer
```

---

## ✅ What's Already Implemented

### 1. Booking Creation (routes/bookings.js)
When a customer books:
- Creates booking in database (status: 'pending')
- Creates Stripe checkout session
- Returns `checkoutUrl` to redirect customer to payment

### 2. Stripe Checkout
- Customer pays on Stripe's secure page
- After payment succeeds: redirects to `/booking-success.html?session_id=xxx&booking_id=xxx`
- After payment cancelled: redirects to `/booking.html?cancelled=true`

### 3. Webhook Handler (routes/stripe.js)
- Listens for `checkout.session.completed` event
- Updates booking status to 'paid'
- Saves payment details
- Sends confirmation email

### 4. Success Page (public/booking-success.html)
- Verifies payment
- Displays booking details dynamically
- Shows booking reference number

---

## 🔧 Setup for Production

### Step 1: Set Up Stripe Webhook

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/webhooks

2. **Add Endpoint**
   - Click "Add endpoint"
   - Endpoint URL: `https://lorraine-booking-backend.onrender.com/api/webhooks/stripe`

3. **Select Events**
   Choose these events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`

4. **Save Webhook**
   - Click "Add endpoint"
   - Copy the **Signing Secret** (starts with `whsec_...`)

### Step 2: Add Environment Variables on Render

Go to your Render dashboard → Your service → Environment:

```bash
# Your existing variables
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://jimcottam1.github.io/lorraineprototype
JWT_SECRET=your_secret_here
ADMIN_PASSWORD_HASH=your_hash_here

# Add these Stripe variables
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # From Step 1
```

### Step 3: Test in Stripe Test Mode First

Before going live, test with Stripe test mode:

1. **Use test API keys** (starts with `sk_test_`)
2. **Test webhook** with test signing secret
3. **Test with card**: `4242 4242 4242 4242` (any future date, any CVC)

### Step 4: Verify Success Page URL

In `routes/bookings.js` line 134, verify your frontend URL is correct:

```javascript
success_url: `${process.env.FRONTEND_URL}/booking-success.html?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking._id}`
```

Make sure `FRONTEND_URL` environment variable is set to:
- Local: `http://localhost:8080`
- Production: `https://jimcottam1.github.io/lorraineprototype`

---

## 🧪 Testing the Flow

### Local Testing

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd booking-backend
   npm start

   # Terminal 2 - Frontend
   python -m http.server 8080
   ```

2. **Make a test booking:**
   - Go to http://localhost:8080
   - Click a "Book Now" button
   - Fill in booking form
   - Submit
   - Should redirect to Stripe checkout

3. **Test card:** `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - ZIP: any 5 digits

4. **After payment:**
   - Should redirect to booking-success.html
   - Should show booking details
   - Check backend logs for webhook received

### Production Testing

1. **Deploy to production** (already done!)

2. **Test with real Stripe checkout:**
   - Use test mode first
   - Then switch to live mode when ready

3. **Verify webhook is receiving events:**
   - Stripe Dashboard → Webhooks → View logs
   - Should see successful `checkout.session.completed` events

---

## 📊 Monitoring Payments

### In Stripe Dashboard

**Payments:** https://dashboard.stripe.com/payments
- View all successful payments
- See customer details
- Issue refunds if needed

**Webhooks:** https://dashboard.stripe.com/webhooks
- View webhook delivery status
- Retry failed webhook deliveries
- See error logs

### In Your Admin Panel

**http://localhost:3000/admin or production URL:**
- View all bookings
- Filter by payment status
- See payment details
- Update booking status manually if needed

---

## 🔄 Complete Payment Flow Example

### Customer Journey:

1. **Customer visits your website**
   - Browses programs
   - Clicks "Book This Program - £256"

2. **Fills booking form**
   - Name: John Smith
   - Email: john@example.com
   - Phone: 07123456789
   - Submits form

3. **Backend processes:**
   ```javascript
   POST /api/bookings
   {
     fullName: "John Smith",
     email: "john@example.com",
     phone: "07123456789",
     program: "wellness"
   }
   ```

4. **Backend response:**
   ```json
   {
     "success": true,
     "booking": {
       "id": "abc123",
       "status": "pending",
       "paymentStatus": "pending"
     },
     "checkoutUrl": "https://checkout.stripe.com/..."
   }
   ```

5. **Redirect to Stripe:**
   - Customer enters card: 4242 4242 4242 4242
   - Clicks "Pay £256"

6. **Stripe processes payment:**
   - Charges card
   - Payment succeeds

7. **Redirect to success page:**
   ```
   https://jimcottam1.github.io/lorraineprototype/booking-success.html
     ?session_id=cs_test_xxx
     &booking_id=abc123
   ```

8. **Success page loads:**
   - Fetches booking details from API
   - Displays: "Booking Confirmed!"
   - Shows booking reference

9. **Webhook fires (asynchronously):**
   ```
   POST https://lorraine-booking-backend.onrender.com/api/webhooks/stripe
   Event: checkout.session.completed
   ```

10. **Backend updates booking:**
    - Sets `paymentStatus = 'paid'`
    - Sets `status = 'paid'`
    - Saves `stripePaymentId`
    - Sends confirmation email to customer

---

## 🔒 Security Features

✅ **Webhook Signature Verification**
- All webhooks are verified using Stripe signing secret
- Prevents fake/malicious webhook calls

✅ **Idempotent Webhook Processing**
- Safe to receive same webhook multiple times
- Won't create duplicate payments

✅ **Secure Card Handling**
- Customer cards never touch your server
- All handled by Stripe's PCI-compliant system

✅ **Encrypted Communication**
- All data sent via HTTPS
- Stripe uses TLS 1.2+

---

## 🆘 Troubleshooting

### Payment Succeeds but Booking Not Marked as Paid

**Check:**
1. Webhook is configured in Stripe dashboard
2. Webhook signing secret is correct in environment variables
3. Backend is receiving webhook (check logs)
4. No errors in webhook handler (check logs)

**Fix:**
- Go to Stripe Dashboard → Webhooks → Find the event
- Click "Resend" to retry webhook delivery

### Customer Not Redirected After Payment

**Check:**
1. `FRONTEND_URL` environment variable is correct
2. `success_url` in checkout session is valid
3. No typos in URL

### Booking Created but No Checkout URL

**Check:**
1. `STRIPE_SECRET_KEY` is set in environment variables
2. Stripe API key is valid (not revoked)
3. Check backend logs for Stripe errors

### Webhook Returns 401 or 403 Error

**Check:**
1. Webhook signing secret matches Stripe dashboard
2. Webhook endpoint URL is correct
3. Backend is deployed and running

---

## 💡 Pro Tips

### Stripe Test vs Live Mode

**Test Mode:**
- Use test API keys (`sk_test_...`)
- Test card: 4242 4242 4242 4242
- No real money charged
- Perfect for development

**Live Mode:**
- Use live API keys (`sk_live_...`)
- Real cards only
- Real money charged
- For production

**Switch modes:**
1. Update `STRIPE_SECRET_KEY` environment variable
2. Update webhook endpoint to use correct secret
3. Restart backend server

### Email Notifications

Your backend already sends emails when:
- ✅ Booking created (to Lorraine)
- ✅ Payment confirmed (to customer)

Make sure email service is configured in `utils/email.js`

### Refunds

To issue a refund:
1. Go to Stripe Dashboard → Payments
2. Find the payment
3. Click "Refund"
4. Webhook will automatically update booking status to 'refunded'

---

## 📋 Deployment Checklist

Before going live:

- [ ] Stripe live API keys configured in production
- [ ] Webhook endpoint added in Stripe dashboard (live mode)
- [ ] Webhook signing secret added to Render environment
- [ ] `FRONTEND_URL` points to production frontend
- [ ] Test a real booking end-to-end
- [ ] Verify email notifications work
- [ ] Verify success page shows correct details
- [ ] Check webhook logs show successful deliveries

---

## 🎉 You're Ready!

Your payment system is production-ready! The flow is:

1. ✅ Customer books → Stripe checkout
2. ✅ Customer pays → Redirected to success page
3. ✅ Webhook received → Booking marked as paid
4. ✅ Email sent → Customer and Lorraine notified
5. ✅ Admin panel → Lorraine sees paid booking

Everything is automated and secure! 🚀
