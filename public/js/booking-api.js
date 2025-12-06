// Booking API Integration
// This file handles all booking form submissions to the new backend

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://lorraine-booking-backend.onrender.com/api';

// Cache for programs loaded from API
let programsCache = null;

// Load programs from API
async function loadPrograms() {
    if (programsCache) return programsCache;

    try {
        const response = await fetch(`${API_URL}/content/programs?active=true`);
        if (!response.ok) throw new Error('Failed to load programs');
        programsCache = await response.json();
        return programsCache;
    } catch (error) {
        console.error('Error loading programs:', error);
        return [];
    }
}

// Get program details by ID
async function getProgramById(programId) {
    const programs = await loadPrograms();
    return programs.find(p => p.id === programId);
}

// Parse price from program
function parsePrice(priceString) {
    if (!priceString) return 0;
    if (typeof priceString === 'string' && priceString.toLowerCase().includes('free')) return 0;
    if (typeof priceString === 'number') return priceString;

    const cleaned = priceString.replace(/[£$,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}

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
            programSelect.addEventListener('change', async (e) => {
                const programId = e.target.value;
                const priceDisplay = document.getElementById('priceDisplay');

                if (priceDisplay) {
                    try {
                        const program = await getProgramById(programId);
                        if (program) {
                            const price = parsePrice(program.price);
                            if (price === 0) {
                                priceDisplay.textContent = 'FREE Consultation';
                            } else {
                                priceDisplay.textContent = `£${price}`;
                            }
                        }
                    } catch (error) {
                        console.error('Error updating price display:', error);
                    }
                }
            });

            // Load programs on page load to cache them
            loadPrograms();
        }
    }
});
