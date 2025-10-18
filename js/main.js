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
    // MODAL / QUESTIONNAIRE HANDLING
    // ========================================
    const modal = document.getElementById('questionnaireModal');
    const closeBtn = document.querySelector('.close');
    const bookButtons = document.querySelectorAll('[data-program]');
    const questionnaireForm = document.getElementById('questionnaireForm');
    const selectedProgramInput = document.getElementById('selectedProgram');

    // Open modal when clicking any "Book" button
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const program = this.getAttribute('data-program');
            selectedProgramInput.value = program;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ========================================
    // FORM SUBMISSION
    // ========================================
    if (questionnaireForm) {
        questionnaireForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(questionnaireForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log('Questionnaire Data:', data);

            // Here you would normally send this data to your backend
            // For now, we'll store it in localStorage and proceed to booking
            localStorage.setItem('questionnaireData', JSON.stringify(data));

            // Show success message
            alert('Thank you! Your questionnaire has been submitted. You will now be redirected to book your sessions.');

            // Close modal
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Reset form
            questionnaireForm.reset();

            // Scroll to booking calendar
            document.getElementById('calendly-embed').scrollIntoView({ behavior: 'smooth' });

            // TODO: Integrate with your email service or backend
            // sendQuestionnaireEmail(data);
        });
    }

    // ========================================
    // CALENDLY INTEGRATION
    // ========================================

    /*
    SETUP INSTRUCTIONS FOR CALENDLY:

    1. Create a free Calendly account at https://calendly.com

    2. Set up your event types for each program:
       - Reiki 4-Week Wellness Program
       - Reiki for Weight Loss (4 weeks)
       - Reiki for Menopause Support (4 weeks)
       - Reiki Level One Consultation
       - Reiki Level Two Consultation

    3. Get your Calendly embed code:
       - Go to your Calendly event page
       - Click "Share" or "Copy link"
       - Choose "Embed" option
       - Copy the embed code

    4. Replace the code below with your Calendly embed script

    5. For multiple programs, you can use Calendly routing forms or
       create separate event links and dynamically load them based on
       which program button was clicked.

    EXAMPLE CALENDLY EMBED CODE:
    */

    function loadCalendly() {
        const calendlyDiv = document.getElementById('calendly-embed');

        // STEP 1: Add Calendly widget script to page
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        // STEP 2: Replace YOUR_CALENDLY_URL with your actual Calendly link
        // Example: https://calendly.com/your-name/reiki-wellness

        script.onload = function() {
            // Clear the placeholder content
            calendlyDiv.innerHTML = '';

            // Initialize Calendly widget
            // UNCOMMENT AND CUSTOMIZE THIS when you have your Calendly link:

            /*
            Calendly.initInlineWidget({
                url: 'https://calendly.com/YOUR_USERNAME/YOUR_EVENT',
                parentElement: calendlyDiv,
                prefill: {},
                utm: {}
            });
            */
        };
    }

    // Uncomment this line when you're ready to activate Calendly:
    // loadCalendly();

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
