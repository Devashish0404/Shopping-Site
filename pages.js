// JavaScript for additional pages

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Pre-fill form from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type')) {
        const roomType = urlParams.get('type');
        const roomTypeSelect = document.getElementById('roomType');
        if (roomTypeSelect) {
            roomTypeSelect.value = roomType;
        }
    }
    if (urlParams.get('checkIn')) {
        const checkInInput = document.getElementById('checkIn');
        if (checkInInput) {
            checkInInput.value = urlParams.get('checkIn');
        }
    }
    if (urlParams.get('checkOut')) {
        const checkOutInput = document.getElementById('checkOut');
        if (checkOutInput) {
            checkOutInput.value = urlParams.get('checkOut');
        }
    }
    if (urlParams.get('guests')) {
        const guestsSelect = document.getElementById('guests');
        if (guestsSelect) {
            guestsSelect.value = urlParams.get('guests');
        }
    }
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            checkIn: this.checkIn.value,
            checkOut: this.checkOut.value,
            guests: this.guests.value,
            roomType: this.roomType.value,
            fullName: this.fullName.value,
            email: this.email.value,
            phone: this.phone.value,
            specialRequests: this.specialRequests.value
        };

        // Validate dates
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            alert('Check-in date cannot be in the past.');
            return;
        }

        if (checkOutDate <= checkInDate) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        // Generate booking reference
        const bookingRef = 'CAP' + Date.now().toString().slice(-8);
        
        // Show success message
        alert(`Booking successful! Your booking reference is: ${bookingRef}\n\nWe will send a confirmation email to ${formData.email}`);
        
        // Reset form
        this.reset();
    });
}

// Track Booking Form
const trackForm = document.getElementById('trackForm');
if (trackForm) {
    trackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookingRef = this.bookingRef.value;
        const email = this.email.value;

        // Simulate booking lookup (in real app, this would be an API call)
        // For demo purposes, accept any reference starting with 'CAP'
        if (bookingRef.startsWith('CAP') && bookingRef.length >= 8) {
            // Show booking details
            document.getElementById('bookingDetails').style.display = 'block';
            document.getElementById('refNumber').textContent = bookingRef;
            document.getElementById('guestName').textContent = 'John Doe'; // Demo data
            document.getElementById('checkInDate').textContent = '2026-02-15';
            document.getElementById('checkOutDate').textContent = '2026-02-18';
            document.getElementById('roomType').textContent = 'Deluxe Room';
            document.getElementById('bookingStatus').textContent = 'Confirmed';
            document.getElementById('totalAmount').textContent = '₹12,000';
            
            // Scroll to details
            document.getElementById('bookingDetails').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Booking not found. Please check your booking reference and email address.');
        }
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Cancel Booking Functions
function showCancelForm() {
    document.getElementById('cancelForm').style.display = 'block';
    document.getElementById('cancelForm').scrollIntoView({ behavior: 'smooth' });
}

function hideCancelForm() {
    document.getElementById('cancelForm').style.display = 'none';
}

function confirmCancellation() {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
        alert('Your booking has been cancelled. A refund will be processed according to our cancellation policy. You will receive a confirmation email shortly.');
        document.getElementById('bookingDetails').style.display = 'none';
        document.getElementById('cancelForm').style.display = 'none';
        trackForm.reset();
    }
}

// Set minimum date for booking forms
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

if (checkInInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    
    checkInInput.addEventListener('change', function() {
        if (checkOutInput) {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOut = checkInDate.toISOString().split('T')[0];
            checkOutInput.setAttribute('min', minCheckOut);
        }
    });
}

