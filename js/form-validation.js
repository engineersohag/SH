// Form validation specific functions

// Initialize form validation on contact page
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Real-time validation for name
        nameInput.addEventListener('blur', function() {
            validateNameField();
        });
        
        // Real-time validation for email
        emailInput.addEventListener('blur', function() {
            validateEmailField();
        });
        
        // Real-time validation for message
        messageInput.addEventListener('blur', function() {
            validateMessageField();
        });
        
        // Clear validation on focus
        nameInput.addEventListener('focus', clearFieldError);
        emailInput.addEventListener('focus', clearFieldError);
        messageInput.addEventListener('focus', clearFieldError);
    }
});

// Function to validate name field
function validateNameField() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    
    if (name === '') {
        showFieldError(nameInput, nameError, 'Please enter your name.');
        return false;
    } else if (name.length < 2) {
        showFieldError(nameInput, nameError, 'Name must be at least 2 characters long.');
        return false;
    } else {
        clearFieldErrorFor(nameInput, nameError);
        return true;
    }
}

// Function to validate email field
function validateEmailField() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    
    if (email === '') {
        showFieldError(emailInput, emailError, 'Please enter your email address.');
        return false;
    } else if (!isValidEmail(email)) {
        showFieldError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
    } else {
        clearFieldErrorFor(emailInput, emailError);
        return true;
    }
}

// Function to validate message field
function validateMessageField() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    const messageError = document.getElementById('messageError');
    
    if (message === '') {
        showFieldError(messageInput, messageError, 'Please enter your message.');
        return false;
    } else if (message.length < 10) {
        showFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
        return false;
    } else {
        clearFieldErrorFor(messageInput, messageError);
        return true;
    }
}

// Helper function to show field error
function showFieldError(inputElement, errorElement, message) {
    inputElement.classList.add('is-invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to clear field error
function clearFieldError(event) {
    const inputElement = event.target;
    const fieldId = inputElement.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    clearFieldErrorFor(inputElement, errorElement);
}

// Helper function to clear field error for specific elements
function clearFieldErrorFor(inputElement, errorElement) {
    inputElement.classList.remove('is-invalid');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Function to validate entire form
function validateContactForm() {
    const isNameValid = validateNameField();
    const isEmailValid = validateEmailField();
    const isMessageValid = validateMessageField();
    
    return isNameValid && isEmailValid && isMessageValid;
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (validateContactForm()) {
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual fetch/AJAX call in production)
        setTimeout(() => {
            // Show success message
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.classList.remove('d-none');
            }
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.add('d-none');
                }
            }, 5000);
        }, 1500);
    }
}

// Attach form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});