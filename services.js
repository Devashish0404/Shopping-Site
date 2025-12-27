// Services Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    setupInquiryForm();
    setMinDate();
});

// Inquiry Form Setup
function setupInquiryForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                service: this.service.value,
                date: this.date.value,
                message: this.message.value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${formData.name}! Your inquiry has been submitted successfully.\n\nWe will contact you at ${formData.email} or ${formData.phone} within 24 hours.\n\nService: ${getServiceName(formData.service)}\n${formData.date ? `Preferred Date: ${formData.date}` : ''}`);
            
            // Reset form
            this.reset();
        });
    }
}

function getServiceName(serviceValue) {
    const services = {
        'restaurant': 'Restaurant',
        'stay': 'Stay Facility',
        'banquet': 'Banquet Hall',
        'other': 'Other'
    };
    return services[serviceValue] || 'General Inquiry';
}

function setMinDate() {
    const dateInput = document.getElementById('inquiryDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

