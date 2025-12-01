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

✅ **Feature Complete** - All code deployed to GitHub  
⚠️ **Rate Limiting Issue** - Email delays implemented, needs testing  
🔄 **Testing Phase** - Awaiting final production verification

---

## Service Architecture & Ownership

### Current Setup: All Under Jim's Profile

| Service | Purpose | Monthly Cost | Notes |
|---------|---------|--------------|-------|
| **MongoDB Atlas** | Database hosting | Free tier | Stores all bookings, questionnaires |
| **Render.com** | Backend hosting | Free tier | Runs Node.js server |
| **Resend** | Email delivery | Free tier | **HAS RATE LIMITING ISSUES** |
| **GitHub** | Code repository | Free | Source code storage |
| **Stripe** | Payment processing | Test mode | **MUST TRANSFER TO LORRAINE** |

### Recommended Ownership Split

#### LORRAINE MUST OWN (Client Business Assets)

**1. Stripe Account** - HIGHEST PRIORITY
- **Why:** Money goes directly to her bank, required for tax/accounting
- **Cost:** Free + 1.5% + 20p per transaction
- **Action:** Create account at stripe.com, verify business, connect bank
- **Timeline:** 2 hours setup + 1-2 days verification

**2. Domain Name** (if applicable)
- **Why:** Owns business web presence
- **Cost:** ~£10-15/year

#### JIM RETAINS (Developer/Operations)

**1-4. All Other Services**
- **Why:** Technical management, reusable for multiple clients
- **Security:** Each client gets separate database
- **Benefit:** Shared infrastructure reduces costs

### Monthly Cost Breakdown

**Minimum (Current - Has Issues):**
- Total: £0/month + Stripe fees
- Problem: Email rate limiting

**Recommended Production:**
- Render: $7/month (£5.50)
- Resend Pro: $20/month (£16) - **FIXES EMAIL ISSUES**
- **Total: £21.50/month** + Stripe fees

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
  - A) Upgrade Resend Pro ($20/month) - RECOMMENDED
  - B) Test 1-second delays - Implemented, needs testing
- Decision: Needs testing OR budget approval

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
- Rate limit tests FAIL → MUST upgrade Resend first ($20/month)
- Who pays for Resend Pro? (Jim infrastructure or Lorraine business expense?)

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
💰 Consider service upgrades for reliability

**Recommended Monthly Cost:** £21.50 for professional service

---

**For Support:** Jim Cottam - jim_cottam@yahoo.co.uk

**Version:** 1.0 | **Date:** December 1, 2025
