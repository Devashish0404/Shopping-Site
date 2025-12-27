// Room Details Page JavaScript

// Room data configuration
const roomData = {
    standard: {
        title: 'Comfortable Standard Room',
        category: 'Standard Room',
        price: '2,500',
        description: 'Experience comfort and elegance in our well-appointed standard room. Designed with your comfort in mind, this room features modern amenities and a cozy atmosphere perfect for both business and leisure travelers. The room offers a peaceful retreat after a long day of travel or work.',
        bedType: 'King Size Bed',
        capacity: '2 Adults',
        size: '250 sq. ft.',
        view: 'City View',
        images: ['prod1.jpeg', 'prod2.jpg', 'prod3.jpeg', 'prod4.jpeg']
    },
    deluxe: {
        title: 'Spacious Deluxe Room',
        category: 'Deluxe Room',
        price: '4,500',
        description: 'Our deluxe rooms offer enhanced comfort and space with premium furnishings and modern amenities. Perfect for guests seeking extra comfort and luxury. Features include a separate seating area, upgraded bathroom facilities, and premium bedding for a restful night\'s sleep.',
        bedType: 'King Size Bed',
        capacity: '2-3 Adults',
        size: '350 sq. ft.',
        view: 'Garden View',
        images: ['prod2.jpg', 'prod1.jpeg', 'prod3.jpeg', 'prod4.jpeg']
    },
    suite: {
        title: 'Luxurious Suite',
        category: 'Suite',
        price: '7,500',
        description: 'Indulge in the ultimate luxury experience with our spacious suite. Featuring a separate living area, premium furnishings, and exclusive amenities. This suite is perfect for guests who appreciate the finer things in life and desire extra space and comfort during their stay.',
        bedType: 'King Size Bed + Sofa Bed',
        capacity: '2-4 Adults',
        size: '500 sq. ft.',
        view: 'Panoramic City View',
        images: ['prod3.jpeg', 'prod4.jpeg', 'prod1.jpeg', 'prod2.jpg']
    }
};

// Get room type from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const roomType = urlParams.get('type') || 'standard';

// Current image index
let currentImageIndex = 0;
let roomImages = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadRoomData(roomType);
    setupImageGallery();
    setupQuickBooking();
    setMinDates();
});

function loadRoomData(type) {
    const room = roomData[type] || roomData.standard;
    
    // Update page content
    document.getElementById('room-title').textContent = room.title;
    document.getElementById('breadcrumb-room-name').textContent = room.title;
    document.getElementById('room-category').textContent = room.category;
    document.getElementById('room-price').textContent = room.price;
    document.getElementById('room-description').textContent = room.description;
    document.getElementById('bed-type').textContent = room.bedType;
    document.getElementById('room-capacity').textContent = room.capacity;
    document.getElementById('room-size').textContent = room.size;
    document.getElementById('room-view').textContent = room.view;
    
    // Set images
    roomImages = room.images;
    updateMainImage(0);
    updateThumbnails();
}

function setupImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Thumbnail click
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage(index);
            updateActiveThumbnail();
        });
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + roomImages.length) % roomImages.length;
        updateMainImage(currentImageIndex);
        updateActiveThumbnail();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % roomImages.length;
        updateMainImage(currentImageIndex);
        updateActiveThumbnail();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Auto-play gallery (optional)
    // setInterval(() => {
    //     nextBtn.click();
    // }, 5000);
}

function updateMainImage(index) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = roomImages[index];
    mainImage.alt = `Room Image ${index + 1}`;
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index < roomImages.length) {
            thumb.src = roomImages[index];
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    });
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function setupQuickBooking() {
    const form = document.getElementById('quickBookingForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkIn = form.checkIn.value;
        const checkOut = form.checkOut.value;
        const guests = form.guests.value;
        
        // Validate dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
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
        
        // Redirect to booking page with pre-filled data
        const params = new URLSearchParams({
            type: roomType,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests
        });
        
        window.location.href = `booking.html?${params.toString()}`;
    });
}

function setMinDates() {
    const checkInInput = document.getElementById('quickCheckIn');
    const checkOutInput = document.getElementById('quickCheckOut');
    
    if (checkInInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        
        checkInInput.addEventListener('change', () => {
            const checkInDate = new Date(checkInInput.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOut = checkInDate.toISOString().split('T')[0];
            checkOutInput.setAttribute('min', minCheckOut);
        });
    }
}

