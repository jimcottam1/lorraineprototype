/* ========================================
   REIKI WELLNESS PLATFORM - JAVASCRIPT
   ======================================== */

// API Configuration
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://lorraine-booking-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic content from CMS
    loadSiteContent();


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
    // BOOKING SYSTEM
    // ========================================

    // Booking is handled via booking.html form
    // No additional JavaScript needed - buttons link directly to booking page


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

// ========================================
// DYNAMIC CONTENT LOADING FROM CMS
// ========================================

async function loadSiteContent() {
    try {
        // Load all content in parallel
        const [settings, programs, testimonials] = await Promise.all([
            fetch(`${API_URL}/content/settings`).then(r => r.json()),
            fetch(`${API_URL}/content/programs?active=true`).then(r => r.json()),
            fetch(`${API_URL}/content/testimonials?active=true`).then(r => r.json())
        ]);

        // Update site settings
        if (settings) {
            updateSiteSettings(settings);
        }

        // Update programs
        if (programs && programs.length > 0) {
            updatePrograms(programs);
        }

        // Update testimonials
        if (testimonials && testimonials.length > 0) {
            updateTestimonials(testimonials);
        }

    } catch (error) {
        console.error('Error loading site content:', error);
        // Fallback to static content if API fails
    }
}

function updateSiteSettings(settings) {
    // Update site title and navigation
    document.title = settings.siteTitle;
    document.querySelector('.nav-brand h1').textContent = settings.siteTitle;

    // Update hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.querySelector('h1').textContent = settings.tagline;
        heroContent.querySelector('p').textContent = settings.heroDescription;
    }

    // Update practitioner info
    const practitionerName = document.querySelector('.practitioner-info h4');
    if (practitionerName) {
        practitionerName.textContent = `Meet ${settings.practitionerName}`;
    }

    const businessInfo = document.querySelector('.practitioner-info p');
    if (businessInfo) {
        businessInfo.innerHTML = `<strong>${settings.businessName}</strong><br>${settings.businessTagline}`;
    }

    // Update contact info
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${settings.phone}`;
        link.textContent = settings.phone;
    });

    const locationText = document.querySelectorAll('p');
    locationText.forEach(p => {
        if (p.innerHTML.includes('Based in')) {
            p.innerHTML = `Based in ${settings.location}<br><a href="tel:${settings.phone}">${settings.phone}</a>`;
        }
    });

    // Update about section
    const whatIsReiki = document.querySelector('.about-text h3');
    if (whatIsReiki && whatIsReiki.nextElementSibling) {
        whatIsReiki.nextElementSibling.textContent = settings.whatIsReiki;
    }

    // Update social media links
    const facebookLink = document.querySelector('a[href*="facebook"]');
    if (facebookLink && settings.facebookUrl) {
        facebookLink.href = settings.facebookUrl;
    }

    const instagramLink = document.querySelector('a[href*="instagram"]');
    if (instagramLink && settings.instagramUrl) {
        instagramLink.href = settings.instagramUrl;
        if (settings.instagramHandle) {
            instagramLink.textContent = `Instagram - ${settings.instagramHandle}`;
        }
    }

    const mainWebsiteLink = document.querySelector('.external-link a');
    if (mainWebsiteLink && settings.mainWebsiteUrl) {
        mainWebsiteLink.href = settings.mainWebsiteUrl;
    }

    // Update footer
    const footerTitle = document.querySelector('.footer-section h3');
    if (footerTitle) {
        footerTitle.textContent = settings.siteTitle;
    }

    const footerLocation = document.querySelectorAll('.footer-section p');
    footerLocation.forEach(p => {
        if (p.innerHTML.includes('Location:')) {
            p.innerHTML = `<strong>Location:</strong> ${settings.location}`;
        }
        if (p.innerHTML.includes('Call')) {
            p.innerHTML = `<strong>Call ${settings.practitionerName.split(' ')[0]}:</strong> <a href="tel:${settings.phone}">${settings.phone}</a>`;
        }
    });
}

function updatePrograms(programs) {
    // Group programs by type
    const fourWeekPrograms = programs.filter(p => p.type === '4-week').sort((a, b) => a.order - b.order);
    const singleSessions = programs.filter(p => p.type === 'single-session').sort((a, b) => a.order - b.order);
    const courses = programs.filter(p => p.type === 'course').sort((a, b) => a.order - b.order);

    // Update 4-week programs
    if (fourWeekPrograms.length > 0) {
        const programsGrid = document.querySelector('.programs-grid');
        if (programsGrid) {
            programsGrid.innerHTML = fourWeekPrograms.map(program => `
                <div class="program-card${program.featured ? ' featured' : ''}">
                    ${program.badge ? `<div class="featured-badge">${program.badge}</div>` : ''}
                    <div class="chakra-image-container">
                        <img src="images/chakra-body.png" alt="Chakra Energy Centers" class="chakra-image">
                        <p class="chakra-note">Add chakra image as: images/chakra-body.png</p>
                    </div>
                    <h3>${program.name}</h3>
                    <div class="program-duration">${program.duration} | ${program.price}${program.caseStudyPrice ? ` (${program.caseStudyPrice} case study)` : ''}</div>
                    <p>${program.description}</p>
                    <ul class="program-features">
                        ${program.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="booking.html?program=${program.id}" class="btn ${program.featured ? 'btn-primary' : 'btn-secondary'}">Book This Program - ${program.price}</a>
                </div>
            `).join('');
        }
    }

    // Update single sessions
    if (singleSessions.length > 0) {
        const sessionsGrid = document.querySelector('.single-sessions-grid');
        if (sessionsGrid) {
            sessionsGrid.innerHTML = singleSessions.map(session => `
                <div class="session-card">
                    ${session.badge ? `<div class="session-badge">${session.badge}</div>` : ''}
                    <h3>${session.name}</h3>
                    <div class="session-duration">${session.duration} | ${session.price}</div>
                    <p>${session.description}</p>
                    <ul class="session-features">
                        ${session.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="booking.html?program=${session.id}" class="btn btn-secondary">Book ${session.name} - ${session.price}</a>
                </div>
            `).join('');
        }
    }

    // Update courses
    if (courses.length > 0) {
        const coursesGrid = document.querySelector('.courses-grid');
        if (coursesGrid) {
            coursesGrid.innerHTML = courses.map(course => `
                <div class="course-card">
                    <h3>${course.name}</h3>
                    <p>${course.description}</p>
                    <ul>
                        ${course.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="booking.html?program=${course.id}" class="btn btn-secondary">Enquire About ${course.name.split(' ').pop()}</a>
                </div>
            `).join('');
        }
    }
}

function updateTestimonials(testimonials) {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;

    // Sort by order
    const sortedTestimonials = testimonials.sort((a, b) => a.order - b.order);

    testimonialsGrid.innerHTML = sortedTestimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="quote-icon">"</div>
            <p class="testimonial-text">${testimonial.text}</p>
            <p class="testimonial-author">— ${testimonial.author}${testimonial.year ? ', ' + testimonial.year : ''}</p>
            <p class="testimonial-program">${testimonial.program}</p>
        </div>
    `).join('');
}
