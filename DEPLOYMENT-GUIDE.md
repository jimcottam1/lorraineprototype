# Lorraine's Reiki Booking System - Questionnaire Feature Deployment Guide

**Project:** Reiki Your Path to Wellness - Booking System  
**Feature:** Post-Payment Wellness Questionnaire  
**Date:** December 1, 2025  
**Developer:** Jim Cottam  
**Client:** Lorraine (Reiki Practitioner)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Feature Overview](#feature-overview)
3. [Service Architecture & Ownership](#service-architecture--ownership)
4. [Production Deployment Checklist](#production-deployment-checklist)
5. [Troubleshooting Guide](#troubleshooting-guide)
6. [Ongoing Maintenance](#ongoing-maintenance)

---

## Executive Summary

### What Was Built

A complete wellness questionnaire system that:
- Automatically sends customers a questionnaire link after payment
- Pre-fills customer information to save time
- Stores responses securely in the database
- Displays formatted responses in the admin panel
- Integrates seamlessly with the existing booking flow

### Current Status

✅ **Feature Complete** - All code deployed
⚠️ **Rate Limiting Issue** - Email delays implemented, needs testing
🔄 **Testing Phase** - Awaiting final production verification

---

## What The Site Does (End-User Perspective)

### For Customers (Booking a Reiki Session)

**1. Browse & Learn**
- Visit the website to learn about Lorraine's Reiki services
- Read about different programs (Path to Wellness, Weight Loss, Menopause, etc.)
- See pricing and session details
- Read testimonials from other clients

**2. Book a Session**
- Click "Book Now" on any program
- Fill out a simple booking form with:
  - Your name, email, and phone number
  - Choose your preferred program
  - Select a preferred time slot (if available)
  - Add any notes or questions
- Submit the booking

**3. Receive Confirmation Email**
- Get an immediate email confirming your booking was received
- Email includes:
  - What you booked
  - The price
  - Payment link (if not free consultation)
  - What happens next

**4. Complete Payment**
- Click the secure payment link (powered by Stripe)
- Enter your card details
- Complete payment securely
- Get redirected to a success page

**5. Receive Welcome Emails** ⭐ NEW FEATURE
After payment, you automatically receive:
- **Payment confirmation** - Receipt of your payment
- **Wellness questionnaire invitation** - Personalized link to complete your intake form

**6. Complete Your Wellness Questionnaire** ⭐ NEW FEATURE
- Click the questionnaire link from your email
- Form is pre-filled with your details (saves time!)
- Answer questions about:
  - Your wellness goals
  - Previous Reiki experience
  - Any health conditions
  - Specific concerns or questions
  - Preferred contact method
- Submit - takes 5 minutes

**7. Wait for Lorraine's Contact**
- Lorraine receives all your information
- She reviews your questionnaire
- Contacts you within 24 hours to:
  - Confirm your session time
  - Answer any questions
  - Prepare for your personalized session

**8. Attend Your Session**
- Show up for your confirmed Reiki session
- Lorraine is fully prepared with your wellness information
- Enjoy a personalized healing experience

### For Lorraine (Managing Bookings)

**1. Receive Booking Notifications**
- Get email immediately when someone books
- See all their details:
  - Contact information
  - Program chosen
  - Preferred times
  - Any special notes

**2. Track Payments**
- Get notified when payments come in
- See payment status in admin panel
- All money goes directly to bank account

**3. Review Questionnaires** ⭐ NEW FEATURE
- Log into admin panel
- See which clients have completed questionnaires (green ✓ indicator)
- Click "View" on any booking to see:
  - Client contact details
  - Payment status
  - **Beautifully formatted questionnaire responses**
  - All wellness information organized and easy to read

**4. Manage Sessions**
- Update booking status (pending → confirmed → completed)
- Add admin notes
- Confirm session dates and times
- Send confirmation emails to clients

**5. Create Available Time Slots**
- Add single or multiple time slots
- Set dates and times
- Make slots bookable for clients
- View calendar of all sessions

**6. Customize Email Templates**
- Edit all email templates
- Preview before sending
- Send test emails
- Customize branding and wording

---

## Admin Panel Detailed Functionality

The admin panel is accessed at `/admin` and provides Lorraine with complete control over the booking system:

### Dashboard Overview
- View all bookings in a sortable table
- Filter by status (pending, paid, confirmed, completed, cancelled)
- Quick visual indicators:
  - Payment status badges (colored)
  - Questionnaire completion indicators (📋 ✓)
  - Status labels for each booking

### Booking Details Modal
When clicking "View" on any booking, Lorraine sees:
- **Client Information**: Name, email, phone, preferred contact method
- **Booking Details**: Program name, price, booking date
- **Payment Information**:
  - Payment status (pending/paid/refunded)
  - Stripe payment ID
  - Payment date/time
- **Session Details**:
  - Preferred time slots
  - Confirmed date and time
  - Any special notes from the client
- **Wellness Questionnaire Responses** (if completed):
  - Previous Reiki experience
  - Wellness goals and intentions
  - Health conditions or concerns
  - Specific questions for Lorraine
  - Preferred communication method
  - Submission date
  - All beautifully formatted (not raw data)

### Actions Available
- **Update Status**: Change booking status with dropdown
- **Confirm Session**: Set confirmed date and time, send email to client
- **Add Admin Notes**: Private notes not visible to clients
- **Send Confirmation Email**: Resend session confirmation
- **Delete Booking**: Remove booking from system (with confirmation)

### Time Slot Management
- **View All Slots**: See all available time slots in calendar view
- **Create Single Slot**: Add one time slot with date/time
- **Create Multiple Slots**: Batch create slots for recurring availability
- **Edit Slots**: Modify existing slot times
- **Delete Slots**: Remove slots that are no longer available
- **Slot Status**: See which slots have been booked

### Email Template Editor
- **View All Templates**: List of all system email templates
- **Edit Templates**: WYSIWYG editor for each template
- **Variable Support**: Use {{placeholders}} for dynamic content
- **Preview**: See how emails will look before sending
- **Test Send**: Send test emails to verify formatting
- **Active/Inactive**: Toggle templates on/off

### Statistics (Dashboard)
- Total bookings count
- Revenue tracking
- Completed sessions
- Pending confirmations
- Quick filters for recent activity

---

## Lorraine's Fit & Finish Requests

### Content Updates Completed
The following refinements have been made based on Lorraine's feedback:

**1. Treatment Plans Section**
- ✅ Removed case study figures at price points for Weight Loss and Menopause programmes
- ✅ Changed "Pathway to Wellness" to be marked as "Popular" instead of other programmes
- ✅ Updated spelling throughout site to use British English "programme" (not "program")

**2. Medical Disclaimer Update**
- ✅ Changed "Please Note:" text to:
  > "Reiki is complementary to medical treatment and it is advised you never stop medication without consulting your GP or healthcare professional."

**3. Upcoming Content**
Lorraine plans to add:
- Video introduction to the programmes (recording this week)
- Guided meditation audio/video
- Draft meditation already available for testing purposes

These updates ensure the website reflects Lorraine's professional approach and meets UK healthcare communication standards.

---

## Service Architecture & Deployment

### Current Production Setup

| Service | Purpose | Current Tier | Status |
|---------|---------|--------------|--------|
| **Render.com** | Website hosting (frontend + backend) | Free tier | ✅ Deployed |
| **MongoDB Atlas** | Database (bookings, questionnaires, templates) | Free tier | ✅ Running |
| **Resend** | Email delivery service | Free tier | ⚠️ Rate limiting |
| **Stripe** | Payment processing | Test mode | 🔄 Needs live setup |
| **GitHub** | Source code version control only | Free | ✅ Up to date |

### How It All Works Together

1. **Render.com** - Hosts everything
   - Frontend: Customer-facing booking website
   - Backend: API server handling bookings, emails, database
   - Both deployed on same service

2. **MongoDB Atlas** - Stores all data
   - Customer bookings
   - Questionnaire responses
   - Email templates
   - Admin settings
   - Time slots

3. **Resend** - Sends all emails
   - Booking confirmations
   - Payment receipts
   - **Questionnaire invitations** (NEW)
   - Admin notifications

4. **Stripe** - Handles payments
   - Secure payment processing
   - Webhook notifies server when payment succeeds
   - Money goes to connected bank account

5. **GitHub** - Source code only
   - Not part of live system
   - Just stores code for updates
   - Jim pushes updates from here to Render

### Current Free Tier Status

**What's Working:**
- ✅ Website is live and functional
- ✅ Bookings work
- ✅ Payments process (test mode)
- ✅ Admin panel accessible
- ✅ Database stores everything

**Known Limitation:**
- ⚠️ Email rate limiting: Resend free tier = 2 emails/second
- 🔧 Fix implemented: 1-second delays between emails
- 🧪 Needs testing with real bookings

### Critical Action Items

**1. Switch Stripe to Live Mode**
- Currently using test mode (no real money)
- Need to set up Lorraine's Stripe account
- Update API keys in Render
- Configure live webhook

**2. Test Email Rate Limiting**
- Make test bookings to verify all 3 emails send
- If fails: Consider Resend upgrade
- If passes: Can continue on free tier

---

## Production Deployment Checklist

### Completed
- [x] Code written and deployed
- [x] Email template created
- [x] Auto-seeding implemented
- [x] Rate limiting delays (1 second) added
- [x] Admin panel updated

### Critical Issues

**1. EMAIL RATE LIMITING - BLOCKING PRODUCTION**
- Problem: Resend free = 2 emails/sec, need 3
- Impact: Questionnaire email fails (429 error)
- Solutions:
  - A) Upgrade Resend Pro - RECOMMENDED
  - B) Test 1-second delays - Implemented, needs testing
- Decision: Needs testing

**2. STRIPE OWNERSHIP - BLOCKING GO-LIVE**
- Problem: Using Jim's test account
- Impact: Can't process real payments
- Action: Lorraine creates Stripe account
- Help: Jim assists with setup

### Testing Needed

1. Email Flow Test
   - [ ] Make test booking with payment
   - [ ] Verify ALL 3 emails arrive
   - [ ] Check Render logs for 429 errors

2. Questionnaire Test
   - [ ] Click link, verify pre-fill
   - [ ] Submit questionnaire
   - [ ] Check admin panel shows responses

---

## Troubleshooting Guide

### Questionnaire Email Not Received

**Check Render Logs:**
```
❌ Resend API error: rate_limit_exceeded
statusCode: 429
```

**Solutions:**
1. Check spam folder
2. If rate limiting: Upgrade Resend OR wait between tests
3. Verify template exists in database

### Form Not Pre-filling

**Check:**
- URL format: `?booking_id=ABC123`
- Browser console (F12) for errors
- API: `https://lorraine-booking-backend.onrender.com/api/bookings/ABC123`

---

## Environment Variables (Render)

**MUST UPDATE for Production:**

```
# Stripe - UPDATE WITH LORRAINE'S LIVE KEYS
STRIPE_SECRET_KEY=sk_live_... # Need from Lorraine
STRIPE_WEBHOOK_SECRET=whsec_... # Need from Lorraine

# URLs - UPDATE WITH REAL DOMAIN
FRONTEND_URL=https://yourdomain.com
ADMIN_EMAIL=lorraine@email.com
```

---

## Next Steps

### This Week
1. Test rate limit fix (1-second delays)
2. If fails: MUST upgrade Resend
3. Help Lorraine create Stripe account
4. Update environment variables

### Decision Points
- Rate limit tests PASS → Can go live
- Rate limit tests FAIL → May need to upgrade Resend

---

## Ongoing Maintenance

### Weekly: Check logs, verify emails sending
### Monthly: Review statistics, update dependencies

### Contact Jim When:
- Server down
- Emails failing
- Payments not working
- Need feature updates

---

## Summary

**What Works:**
✅ Questionnaire feature complete
✅ Admin panel shows responses
✅ Form pre-fills customer data
✅ All code deployed

**What Needs Fixing:**
⚠️ Email rate limiting (testing in progress)
🚨 Stripe account (Lorraine must create)

---

**For Support:** Jim Cottam - jim_cottam@yahoo.co.uk

**Version:** 1.0 | **Date:** December 1, 2025
