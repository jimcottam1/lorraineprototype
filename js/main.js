/* ========================================
   REIKI WELLNESS PLATFORM - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // KOALENDAR POPUP INTEGRATION
    // ========================================

    // Load Koalendar popup script
    const koalendarScript = document.createElement('script');
    koalendarScript.src = 'https://koalendar.com/assets/js/iframe.js';
    koalendarScript.async = true;
    document.head.appendChild(koalendarScript);

    // All booking buttons with class 'koalendar-button' will automatically
    // open Koalendar popup when clicked (no additional JS needed)
    // The Koalendar script handles this automatically based on the href URL


    // ========================================
    // VIDEO HANDLING
    // ========================================

    // Show video if file exists, otherwise show placeholder
    const videoPlaceholder = document.getElementById('introVideo');
    const video = videoPlaceholder.querySelector('video');

    if (video) {
        // Check if video source exists (you'll need to upload your video)
        video.addEventListener('loadeddata', function() {
            videoPlaceholder.querySelector('p').style.display = 'none';
            videoPlaceholder.querySelector('small').style.display = 'none';
            video.style.display = 'block';
        });
    }

    // ========================================
    // IMAGE PLACEHOLDER HANDLING
    // ========================================

    // Hide instruction notes when images successfully load

    // Portrait photo
    const portraitImg = document.getElementById('lorrainePlaceholder');
    if (portraitImg) {
        portraitImg.addEventListener('load', function() {
            const photoNote = this.parentElement.querySelector('.photo-note');
            if (photoNote) {
                photoNote.style.display = 'none';
            }
        });

        // If image fails to load, keep the instruction note visible
        portraitImg.addEventListener('error', function() {
            console.log('Portrait image not found - instruction note will remain visible');
        });
    }

    // Chakra images
    const chakraImages = document.querySelectorAll('.chakra-image');
    chakraImages.forEach(img => {
        img.addEventListener('load', function() {
            const chakraNote = this.parentElement.querySelector('.chakra-note');
            if (chakraNote) {
                chakraNote.style.display = 'none';
            }
        });

        img.addEventListener('error', function() {
            console.log('Chakra image not found - instruction note will remain visible');
        });
    });

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (Optional Enhancement)
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe program cards for fade-in animation
    document.querySelectorAll('.program-card, .course-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

});

// ========================================
// EMAIL INTEGRATION SETUP
// ========================================

/*
TO SEND QUESTIONNAIRE DATA VIA EMAIL:

Option 1: Use EmailJS (Recommended - Free tier available)
---------------------------------------------------------
1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Add this code:

function sendQuestionnaireEmail(data) {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: data.fullName,
        from_email: data.email,
        phone: data.phone,
        program: data.program,
        experience: data.experience,
        goals: data.goals,
        health: data.health,
        preferences: data.preferences
    }).then(function(response) {
        console.log('Email sent successfully!', response);
    }, function(error) {
        console.error('Email failed to send:', error);
    });
}

// Add EmailJS script to your HTML:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
// <script>emailjs.init('YOUR_PUBLIC_KEY');</script>


Option 2: Use FormSpree (Simple alternative)
---------------------------------------------
1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Change the form action to:
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">


Option 3: Use your own backend
-------------------------------
Create a PHP/Node.js backend to handle form submissions and send emails.

*/

// ========================================
// PAYMENT INTEGRATION SETUP
// ========================================

/*
STRIPE PAYMENT INTEGRATION:

1. Sign up for Stripe at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Install Stripe Checkout:

Add to your HTML before </body>:
<script src="https://js.stripe.com/v3/"></script>

4. Create payment products in Stripe Dashboard for:
   - 4-Week Wellness Program
   - Weight Loss Program
   - Menopause Support Program
   - Reiki Level One Course
   - Reiki Level Two Course

5. Add this code to handle payments:

const stripe = Stripe('YOUR_PUBLISHABLE_KEY');

async function handlePayment(programType, amount) {
    const response = await fetch('YOUR_BACKEND_URL/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            program: programType,
            amount: amount
        })
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
        sessionId: session.id
    });

    if (result.error) {
        alert(result.error.message);
    }
}

ALTERNATIVE - PAYPAL:
You can also use PayPal buttons. Visit:
https://www.paypal.com/buttons/smart

*/
