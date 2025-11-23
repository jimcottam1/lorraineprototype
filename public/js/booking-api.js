// Booking API Integration
// This file handles all booking form submissions to the new backend

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api';

// Program pricing
const PROGRAM_PRICES = {
    'experience': 64,
    'solo': 70,
    'wellness': 256,
    'weightloss': 256,
    'menopause': 256,
    'reiki1': 0,
    'reiki2': 0
};

// Handle booking form submission
async function submitBooking(formData) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Send booking to backend
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Booking failed');
        }

        // If there's a checkout URL (paid program), redirect to Stripe
        if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
        } else {
            // Free consultation - show success message
            alert('Booking submitted successfully! Lorraine will contact you within 24 hours.');
            window.location.href = 'booking-success.html?booking_id=' + data.booking.id;
        }

    } catch (error) {
        console.error('Booking error:', error);
        alert('Booking failed: ' + error.message);

        // Reset button
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Book Now';
        submitBtn.disabled = false;
    }
}

// Initialize booking form
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                program: document.getElementById('program')?.value,
                preferredDays: Array.from(document.querySelectorAll('input[name="preferredDays"]:checked')).map(cb => cb.value),
                preferredTimes: Array.from(document.querySelectorAll('input[name="preferredTimes"]:checked')).map(cb => cb.value),
                notes: document.getElementById('notes')?.value || ''
            };

            // Validate required fields
            if (!formData.fullName || !formData.email || !formData.phone || !formData.program) {
                alert('Please fill in all required fields');
                return;
            }

            // Submit booking
            await submitBooking(formData);
        });

        // Update price display when program changes
        const programSelect = document.getElementById('program');
        if (programSelect) {
            programSelect.addEventListener('change', (e) => {
                const program = e.target.value;
                const price = PROGRAM_PRICES[program];
                const priceDisplay = document.getElementById('priceDisplay');

                if (priceDisplay) {
                    if (price === 0) {
                        priceDisplay.textContent = 'FREE Consultation';
                    } else {
                        priceDisplay.textContent = `£${price}`;
                    }
                }
            });
        }
    }
});
