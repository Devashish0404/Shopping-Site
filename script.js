// Mobile Menu Toggle
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value;
        alert('Thank you for subscribing! We will send updates to ' + email);
        this.reset();
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Shop Section - Filter and Sort Functionality
let currentFilter = 'all';
let currentSort = 'newest';

const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.querySelector('.product-grid');
let productCards = Array.from(document.querySelectorAll('.product-card'));

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        currentFilter = button.getAttribute('data-filter');
        applyFilterAndSort();
    });
});

// Sort functionality
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        applyFilterAndSort();
    });
}

function applyFilterAndSort() {
    // First filter
    let filteredCards = productCards.filter(card => {
        if (currentFilter === 'all') {
            return true;
        }
        return card.getAttribute('data-category') === currentFilter;
    });
    
    // Then sort
    filteredCards.sort((a, b) => {
        let comparison = 0;
        
        switch(currentSort) {
            case 'price-low':
                comparison = parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
                break;
            case 'price-high':
                comparison = parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
                break;
            case 'popular':
                comparison = parseInt(b.getAttribute('data-popularity')) - parseInt(a.getAttribute('data-popularity'));
                break;
            case 'newest':
                // Keep original order (based on data-aos-delay)
                const delayA = parseInt(a.getAttribute('data-aos-delay')) || 0;
                const delayB = parseInt(b.getAttribute('data-aos-delay')) || 0;
                comparison = delayA - delayB;
                break;
        }
        
        return comparison;
    });
    
    // Hide all cards first
    productCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Show and reorder filtered cards
    filteredCards.forEach(card => {
        productGrid.appendChild(card);
        card.style.display = 'block';
    });
}

// Quick View functionality - redirect to room details page
const quickViewButtons = document.querySelectorAll('.quick-view');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomType = button.getAttribute('data-room');
        window.location.href = `room-details.html?type=${roomType}`;
    });
});

// Wishlist functionality
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = button.querySelector('i');
        const roomType = button.getAttribute('data-room');
        
        if (icon.classList.contains('fa-solid')) {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            button.style.color = '#666';
        } else {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            button.style.color = '#e74c3c';
        }
    });
});

// Book Now functionality - redirect to room details page
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomType = button.getAttribute('data-room');
        window.location.href = `room-details.html?type=${roomType}`;
    });
});