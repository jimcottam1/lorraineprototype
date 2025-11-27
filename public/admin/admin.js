// Configuration
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://lorraine-booking-backend.onrender.com/api';

let authToken = null;

// Check if already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    authToken = localStorage.getItem('adminToken');

    if (authToken) {
        // Verify token is still valid
        verifyToken();
    }
});

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('adminToken', data.token);
            showDashboard();
        } else {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'Connection error. Please try again.';
        errorDiv.style.display = 'block';
    }
});

// Verify token is still valid
async function verifyToken() {
    try {
        const response = await fetch(`${API_URL}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            showDashboard();
        } else {
            // Token invalid, show login
            logout();
        }
    } catch (error) {
        console.error('Token verification error:', error);
        logout();
    }
}

// Show dashboard after successful login
function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';

    loadStats();
    loadBookings();
}

// Logout
function logout() {
    authToken = null;
    localStorage.removeItem('adminToken');
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminContainer').style.display = 'none';
}

// Load dashboard statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        document.getElementById('statTotal').textContent = data.totalBookings || 0;
        document.getElementById('statPending').textContent = data.pendingBookings || 0;
        document.getElementById('statConfirmed').textContent = data.confirmedBookings || 0;
        document.getElementById('statRevenue').textContent = `£${data.totalRevenue || 0}`;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load bookings with filters
async function loadBookings() {
    const status = document.getElementById('filterStatus').value;
    const program = document.getElementById('filterProgram').value;

    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (program) params.append('program', program);

    try {
        const response = await fetch(`${API_URL}/admin/bookings?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        displayBookings(data.bookings || []);
    } catch (error) {
        console.error('Error loading bookings:', error);
        document.getElementById('bookingsTableBody').innerHTML =
            '<tr><td colspan="7" style="text-align:center;color:#d32f2f;">Error loading bookings</td></tr>';
    }
}

// Display bookings in table
function displayBookings(bookings) {
    const tbody = document.getElementById('bookingsTableBody');

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">No bookings found</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${formatDate(booking.createdAt)}</td>
            <td>
                <strong>${booking.fullName}</strong><br>
                <small>${booking.email}</small>
            </td>
            <td>${booking.programName}</td>
            <td>£${booking.price}</td>
            <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
            <td><span class="status-badge status-${booking.paymentStatus}">${booking.paymentStatus}</span></td>
            <td>
                <button class="btn-small" onclick="viewBooking('${booking._id}')">View</button>
            </td>
        </tr>
    `).join('');
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// View booking details
async function viewBooking(bookingId) {
    try {
        const response = await fetch(`${API_URL}/admin/bookings/${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const booking = await response.json();

        showBookingModal(booking);
    } catch (error) {
        console.error('Error loading booking details:', error);
        alert('Failed to load booking details');
    }
}

// Show booking modal with details
function showBookingModal(booking) {
    const modal = document.getElementById('bookingModal');
    const detailsDiv = document.getElementById('bookingDetails');

    detailsDiv.innerHTML = `
        <div class="detail-row">
            <label>Client Name</label>
            <p>${booking.fullName}</p>
        </div>
        <div class="detail-row">
            <label>Email</label>
            <p>${booking.email}</p>
        </div>
        <div class="detail-row">
            <label>Phone</label>
            <p>${booking.phone}</p>
        </div>
        <div class="detail-row">
            <label>Program</label>
            <p>${booking.programName} - £${booking.price}</p>
        </div>
        <div class="detail-row">
            <label>Preferred Days</label>
            <p>${booking.preferredDays?.join(', ') || 'Not specified'}</p>
        </div>
        <div class="detail-row">
            <label>Preferred Times</label>
            <p>${booking.preferredTimes?.join(', ') || 'Not specified'}</p>
        </div>
        <div class="detail-row">
            <label>Client Notes</label>
            <p>${booking.notes || 'None'}</p>
        </div>
        <div class="detail-row">
            <label>Status</label>
            <p>
                <select id="statusSelect" class="status-select" onchange="updateStatus('${booking._id}', this.value)">
                    <option value="pending" ${booking.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="paid" ${booking.status === 'paid' ? 'selected' : ''}>Paid</option>
                    <option value="confirmed" ${booking.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="completed" ${booking.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${booking.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </p>
        </div>
        <div class="detail-row">
            <label>Payment Status</label>
            <p><span class="status-badge status-${booking.paymentStatus}">${booking.paymentStatus}</span></p>
        </div>
        ${booking.confirmedDate ? `
            <div class="detail-row">
                <label>Confirmed Date & Time</label>
                <p>${formatDate(booking.confirmedDate)} at ${booking.confirmedTime}</p>
            </div>
        ` : `
            <div class="detail-row">
                <label>Confirm Session</label>
                <div style="display: flex; gap: 10px;">
                    <input type="date" id="confirmDate" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <input type="time" id="confirmTime" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <button class="btn-small" onclick="confirmBooking('${booking._id}')">Confirm</button>
                </div>
            </div>
        `}
        <div class="detail-row">
            <label>Questionnaire</label>
            <p>${booking.questionnaireCompleted ? '✅ Completed' : '❌ Not completed'}</p>
        </div>
        ${booking.questionnaireCompleted ? `
            <div class="detail-row">
                <label>Questionnaire Data</label>
                <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${JSON.stringify(booking.questionnaireData, null, 2)}</pre>
            </div>
        ` : ''}
        <div class="detail-row">
            <label>Admin Notes</label>
            <textarea id="adminNotes" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">${booking.adminNotes || ''}</textarea>
            <button class="btn-small" onclick="updateNotes('${booking._id}')" style="margin-top: 10px;">Save Notes</button>
        </div>
        <div class="detail-row">
            <label>Booking Created</label>
            <p>${formatDate(booking.createdAt)}</p>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Update booking status
async function updateStatus(bookingId, newStatus) {
    try {
        const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            loadBookings();
            loadStats();
            alert('Status updated successfully');
        } else {
            alert('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating status');
    }
}

// Confirm booking with date/time
async function confirmBooking(bookingId) {
    const confirmedDate = document.getElementById('confirmDate').value;
    const confirmedTime = document.getElementById('confirmTime').value;

    if (!confirmedDate || !confirmedTime) {
        alert('Please select both date and time');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/confirm`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ confirmedDate, confirmedTime })
        });

        if (response.ok) {
            closeModal();
            loadBookings();
            loadStats();
            alert('Booking confirmed successfully');
        } else {
            alert('Failed to confirm booking');
        }
    } catch (error) {
        console.error('Error confirming booking:', error);
        alert('Error confirming booking');
    }
}

// Update admin notes
async function updateNotes(bookingId) {
    const adminNotes = document.getElementById('adminNotes').value;

    try {
        const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/notes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminNotes })
        });

        if (response.ok) {
            alert('Notes saved successfully');
        } else {
            alert('Failed to save notes');
        }
    } catch (error) {
        console.error('Error saving notes:', error);
        alert('Error saving notes');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ====================
// SLOT MANAGEMENT
// ====================

let bulkTimes = [];

// Tab switching
function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide all tabs
    document.getElementById('bookingsTab').style.display = tabName === 'bookings' ? 'block' : 'none';
    document.getElementById('slotsTab').style.display = tabName === 'slots' ? 'block' : 'none';
    document.getElementById('programsTab').style.display = tabName === 'programs' ? 'block' : 'none';
    document.getElementById('testimonialsTab').style.display = tabName === 'testimonials' ? 'block' : 'none';
    document.getElementById('settingsTab').style.display = tabName === 'settings' ? 'block' : 'none';

    // Load data when switching to tabs
    if (tabName === 'slots') {
        loadSlots();
    } else if (tabName === 'programs') {
        loadPrograms();
    } else if (tabName === 'testimonials') {
        loadTestimonials();
    } else if (tabName === 'settings') {
        loadSettings();
    }
}

// Add time to bulk list
function addBulkTime() {
    const timeInput = document.getElementById('bulkTimeInput');
    const time = timeInput.value;

    if (!time) {
        alert('Please select a time');
        return;
    }

    if (bulkTimes.includes(time)) {
        alert('This time is already added');
        return;
    }

    bulkTimes.push(time);
    timeInput.value = '';
    updateBulkTimesList();
}

// Update bulk times list display
function updateBulkTimesList() {
    const container = document.getElementById('bulkTimesList');

    if (bulkTimes.length === 0) {
        container.innerHTML = '<span style="color: #999;">No times added yet</span>';
        return;
    }

    container.innerHTML = bulkTimes.sort().map(time => `
        <span class="time-chip">
            ${time}
            <button onclick="removeBulkTime('${time}')">&times;</button>
        </span>
    `).join('');
}

// Remove time from bulk list
function removeBulkTime(time) {
    bulkTimes = bulkTimes.filter(t => t !== time);
    updateBulkTimesList();
}

// Create single slot
async function createSingleSlot() {
    const date = document.getElementById('singleDate').value;
    const time = document.getElementById('singleTime').value;
    const duration = document.getElementById('singleDuration').value;

    if (!date || !time) {
        alert('Please select both date and time');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/slots`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, time, duration: parseInt(duration) })
        });

        const data = await response.json();

        if (data.success) {
            alert('Slot created successfully!');
            document.getElementById('singleDate').value = '';
            document.getElementById('singleTime').value = '';
            loadSlots();
        } else {
            alert(data.error || 'Failed to create slot');
        }
    } catch (error) {
        console.error('Error creating slot:', error);
        alert('Failed to create slot');
    }
}

// Create bulk slots
async function createBulkSlots() {
    const startDate = document.getElementById('bulkStartDate').value;
    const endDate = document.getElementById('bulkEndDate').value;
    const duration = 60; // Default duration

    if (!startDate || !endDate) {
        alert('Please select start and end dates');
        return;
    }

    if (bulkTimes.length === 0) {
        alert('Please add at least one time');
        return;
    }

    const excludeDays = Array.from(document.querySelectorAll('.exclude-day:checked')).map(cb => cb.value);

    try {
        const response = await fetch(`${API_URL}/slots/bulk`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate,
                endDate,
                times: bulkTimes,
                duration,
                excludeDays
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(`Created ${data.created} slots (${data.total - data.created} duplicates skipped)`);
            // Reset form
            document.getElementById('bulkStartDate').value = '';
            document.getElementById('bulkEndDate').value = '';
            bulkTimes = [];
            updateBulkTimesList();
            document.querySelectorAll('.exclude-day').forEach(cb => cb.checked = false);
            loadSlots();
        } else {
            alert(data.error || 'Failed to create slots');
        }
    } catch (error) {
        console.error('Error creating bulk slots:', error);
        alert('Failed to create slots');
    }
}

// Load all slots
async function loadSlots() {
    try {
        const response = await fetch(`${API_URL}/slots`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (data.success) {
            displaySlots(data.slots);
        } else {
            document.getElementById('slotsListContainer').innerHTML =
                '<p style="text-align: center; color: #d32f2f;">Failed to load slots</p>';
        }
    } catch (error) {
        console.error('Error loading slots:', error);
        document.getElementById('slotsListContainer').innerHTML =
            '<p style="text-align: center; color: #d32f2f;">Error loading slots</p>';
    }
}

// Display slots list
function displaySlots(slots) {
    const container = document.getElementById('slotsListContainer');

    if (slots.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No slots created yet. Create some above!</p>';
        return;
    }

    // Group slots by date
    const groupedSlots = {};
    slots.forEach(slot => {
        if (!groupedSlots[slot.displayDate]) {
            groupedSlots[slot.displayDate] = [];
        }
        groupedSlots[slot.displayDate].push(slot);
    });

    container.innerHTML = Object.keys(groupedSlots).map(date => `
        <div style="margin-bottom: 20px;">
            <h3 style="color: #2c5f4f; margin-bottom: 10px; font-size: 16px;">${date}</h3>
            ${groupedSlots[date].map(slot => `
                <div class="slot-item">
                    <div>
                        <strong>${slot.time}</strong>
                        <span style="color: #666; margin-left: 10px;">(${slot.duration} mins)</span>
                        ${!slot.isAvailable ? '<span style="margin-left: 10px; color: #d32f2f; font-size: 12px;">● BOOKED</span>' : ''}
                        ${slot.booking ? `<span style="margin-left: 10px; color: #666; font-size: 12px;">- ${slot.booking.clientName}</span>` : ''}
                    </div>
                    <div>
                        ${slot.isAvailable ? `
                            <button class="btn-small" onclick="deleteSlot('${slot.id}')" style="background: #d32f2f; padding: 6px 12px;">Delete</button>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Delete slot
async function deleteSlot(slotId) {
    if (!confirm('Are you sure you want to delete this slot?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/slots/${slotId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (data.success) {
            alert('Slot deleted successfully');
            loadSlots();
        } else {
            alert(data.error || 'Failed to delete slot');
        }
    } catch (error) {
        console.error('Error deleting slot:', error);
        alert('Failed to delete slot');
    }
}

// Initialize bulk times list on page load
updateBulkTimesList();

// ====================
// CONTENT MANAGEMENT
// ====================

// ====================
// PROGRAMS MANAGEMENT
// ====================

async function loadPrograms() {
    try {
        const response = await fetch(`${API_URL}/content/programs`);
        const programs = await response.json();
        displayPrograms(programs);
    } catch (error) {
        console.error('Error loading programs:', error);
    }
}

function displayPrograms(programs) {
    const container = document.getElementById('programsList');

    if (programs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No programs yet. Add one above!</p>';
        return;
    }

    container.innerHTML = programs.map(program => `
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 10px 0; color: #2c5f4f;">${program.name}</h3>
                    <p style="margin: 0 0 10px 0; color: #666;">${program.description}</p>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; font-size: 14px;">
                        <span><strong>Type:</strong> ${program.type}</span>
                        <span><strong>Price:</strong> ${program.price}</span>
                        <span><strong>Duration:</strong> ${program.duration}</span>
                        ${program.badge ? `<span class="status-badge status-confirmed">${program.badge}</span>` : ''}
                        ${program.featured ? '<span class="status-badge status-paid">Featured</span>' : ''}
                        <span class="status-badge ${program.active ? 'status-confirmed' : 'status-cancelled'}">${program.active ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-small" onclick="editProgram('${program.id}')">Edit</button>
                    <button class="btn-small" style="background: #d32f2f;" onclick="deleteProgram('${program.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showProgramForm() {
    document.getElementById('programForm').classList.remove('hidden');
    document.getElementById('programFormTitle').textContent = 'Add New Program';
    document.getElementById('programEditForm').reset();
    document.getElementById('programId').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelProgramForm() {
    document.getElementById('programForm').classList.add('hidden');
    document.getElementById('programEditForm').reset();
}

async function editProgram(programId) {
    try {
        const response = await fetch(`${API_URL}/content/programs/${programId}`);
        const program = await response.json();

        document.getElementById('programId').value = program.id;
        document.getElementById('programIdInput').value = program.id;
        document.getElementById('programType').value = program.type;
        document.getElementById('programName').value = program.name;
        document.getElementById('programDescription').value = program.description;
        document.getElementById('programDuration').value = program.duration;
        document.getElementById('programPrice').value = program.price;
        document.getElementById('programCaseStudyPrice').value = program.caseStudyPrice || '';
        document.getElementById('programFeatures').value = program.features.join('\n');
        document.getElementById('programBadge').value = program.badge || '';
        document.getElementById('programFeatured').checked = program.featured;
        document.getElementById('programActive').checked = program.active;
        document.getElementById('programOrder').value = program.order;

        document.getElementById('programFormTitle').textContent = 'Edit Program';
        document.getElementById('programForm').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading program:', error);
        alert('Failed to load program');
    }
}

document.getElementById('programEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const isEdit = !!document.getElementById('programId').value;
    const programId = document.getElementById('programIdInput').value;

    const programData = {
        id: programId,
        type: document.getElementById('programType').value,
        name: document.getElementById('programName').value,
        description: document.getElementById('programDescription').value,
        duration: document.getElementById('programDuration').value,
        price: document.getElementById('programPrice').value,
        caseStudyPrice: document.getElementById('programCaseStudyPrice').value || null,
        features: document.getElementById('programFeatures').value.split('\n').filter(f => f.trim()),
        badge: document.getElementById('programBadge').value || null,
        featured: document.getElementById('programFeatured').checked,
        active: document.getElementById('programActive').checked,
        order: parseInt(document.getElementById('programOrder').value)
    };

    try {
        const response = await fetch(`${API_URL}/content/programs${isEdit ? '/' + programId : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(programData)
        });

        if (response.ok) {
            alert(isEdit ? 'Program updated successfully!' : 'Program created successfully!');
            cancelProgramForm();
            loadPrograms();
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to save program');
        }
    } catch (error) {
        console.error('Error saving program:', error);
        alert('Failed to save program');
    }
});

async function deleteProgram(programId) {
    if (!confirm('Are you sure you want to delete this program?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/content/programs/${programId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            alert('Program deleted successfully');
            loadPrograms();
        } else {
            alert('Failed to delete program');
        }
    } catch (error) {
        console.error('Error deleting program:', error);
        alert('Failed to delete program');
    }
}

// ====================
// TESTIMONIALS MANAGEMENT
// ====================

async function loadTestimonials() {
    try {
        const response = await fetch(`${API_URL}/content/testimonials`);
        const testimonials = await response.json();
        displayTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

function displayTestimonials(testimonials) {
    const container = document.getElementById('testimonialsList');

    if (testimonials.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No testimonials yet. Add one above!</p>';
        return;
    }

    container.innerHTML = testimonials.map(testimonial => `
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div style="font-size: 48px; color: #2c5f4f; line-height: 1; margin-bottom: 10px;">"</div>
                    <p style="margin: 0 0 15px 0; font-style: italic; color: #333;">${testimonial.text}</p>
                    <p style="margin: 0; color: #666; font-weight: 600;">— ${testimonial.author}${testimonial.year ? ', ' + testimonial.year : ''}</p>
                    <p style="margin: 5px 0 0 0; color: #999; font-size: 14px;">${testimonial.program}</p>
                    <span class="status-badge ${testimonial.active ? 'status-confirmed' : 'status-cancelled'}" style="margin-top: 10px; display: inline-block;">${testimonial.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-small" onclick="editTestimonial('${testimonial._id}')">Edit</button>
                    <button class="btn-small" style="background: #d32f2f;" onclick="deleteTestimonial('${testimonial._id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showTestimonialForm() {
    document.getElementById('testimonialForm').classList.remove('hidden');
    document.getElementById('testimonialFormTitle').textContent = 'Add New Testimonial';
    document.getElementById('testimonialEditForm').reset();
    document.getElementById('testimonialId').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelTestimonialForm() {
    document.getElementById('testimonialForm').classList.add('hidden');
    document.getElementById('testimonialEditForm').reset();
}

async function editTestimonial(testimonialId) {
    try {
        const response = await fetch(`${API_URL}/content/testimonials/${testimonialId}`);
        const testimonial = await response.json();

        document.getElementById('testimonialId').value = testimonial._id;
        document.getElementById('testimonialText').value = testimonial.text;
        document.getElementById('testimonialAuthor').value = testimonial.author;
        document.getElementById('testimonialProgram').value = testimonial.program;
        document.getElementById('testimonialYear').value = testimonial.year || '';
        document.getElementById('testimonialActive').checked = testimonial.active;
        document.getElementById('testimonialOrder').value = testimonial.order;

        document.getElementById('testimonialFormTitle').textContent = 'Edit Testimonial';
        document.getElementById('testimonialForm').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading testimonial:', error);
        alert('Failed to load testimonial');
    }
}

document.getElementById('testimonialEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const isEdit = !!document.getElementById('testimonialId').value;
    const testimonialId = document.getElementById('testimonialId').value;

    const testimonialData = {
        text: document.getElementById('testimonialText').value,
        author: document.getElementById('testimonialAuthor').value,
        program: document.getElementById('testimonialProgram').value,
        year: document.getElementById('testimonialYear').value || null,
        active: document.getElementById('testimonialActive').checked,
        order: parseInt(document.getElementById('testimonialOrder').value)
    };

    try {
        const response = await fetch(`${API_URL}/content/testimonials${isEdit ? '/' + testimonialId : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testimonialData)
        });

        if (response.ok) {
            alert(isEdit ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
            cancelTestimonialForm();
            loadTestimonials();
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to save testimonial');
        }
    } catch (error) {
        console.error('Error saving testimonial:', error);
        alert('Failed to save testimonial');
    }
});

async function deleteTestimonial(testimonialId) {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/content/testimonials/${testimonialId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            alert('Testimonial deleted successfully');
            loadTestimonials();
        } else {
            alert('Failed to delete testimonial');
        }
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete testimonial');
    }
}

// ====================
// SITE SETTINGS MANAGEMENT
// ====================

async function loadSettings() {
    try {
        const response = await fetch(`${API_URL}/content/settings`);
        const settings = await response.json();

        document.getElementById('siteTitle').value = settings.siteTitle;
        document.getElementById('tagline').value = settings.tagline;
        document.getElementById('heroDescription').value = settings.heroDescription;
        document.getElementById('phone').value = settings.phone;
        document.getElementById('location').value = settings.location;
        document.getElementById('businessName').value = settings.businessName;
        document.getElementById('businessTagline').value = settings.businessTagline;
        document.getElementById('practitionerName').value = settings.practitionerName;
        document.getElementById('whatIsReiki').value = settings.whatIsReiki;
        document.getElementById('reikiDisclaimer').value = settings.reikiDisclaimer;
        document.getElementById('facebookUrl').value = settings.facebookUrl || '';
        document.getElementById('instagramUrl').value = settings.instagramUrl || '';
        document.getElementById('instagramHandle').value = settings.instagramHandle || '';
        document.getElementById('mainWebsiteUrl').value = settings.mainWebsiteUrl || '';
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const settingsData = {
        siteTitle: document.getElementById('siteTitle').value,
        tagline: document.getElementById('tagline').value,
        heroDescription: document.getElementById('heroDescription').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        businessName: document.getElementById('businessName').value,
        businessTagline: document.getElementById('businessTagline').value,
        practitionerName: document.getElementById('practitionerName').value,
        whatIsReiki: document.getElementById('whatIsReiki').value,
        reikiDisclaimer: document.getElementById('reikiDisclaimer').value,
        facebookUrl: document.getElementById('facebookUrl').value,
        instagramUrl: document.getElementById('instagramUrl').value,
        instagramHandle: document.getElementById('instagramHandle').value,
        mainWebsiteUrl: document.getElementById('mainWebsiteUrl').value
    };

    try {
        const response = await fetch(`${API_URL}/content/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settingsData)
        });

        if (response.ok) {
            alert('Settings saved successfully!');
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to save settings');
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        alert('Failed to save settings');
    }
});
