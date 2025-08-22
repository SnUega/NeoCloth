// Form Security Enhancements

// CSRF Token Management
class CSRFProtection {
    constructor() {
        this.token = this.generateToken();
        this.setupTokenInjection();
    }

    generateToken() {
        return 'csrf_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    setupTokenInjection() {
        // Add CSRF token to all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.querySelector('input[name="csrf_token"]')) {
                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'csrf_token';
                tokenInput.value = this.token;
                form.appendChild(tokenInput);
            }
        });
    }

    validateToken(token) {
        return token === this.token;
    }

    refreshToken() {
        this.token = this.generateToken();
        this.setupTokenInjection();
    }
}

// Form Validation and Sanitization
class FormValidator {
    constructor() {
        this.setupValidation();
    }

    setupValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.validateForm(e));
            form.addEventListener('input', (e) => this.validateField(e.target));
        });
    }

    validateForm(event) {
        const form = event.target;
        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            this.showFormErrors(form);
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Phone validation
        if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        // URL validation
        if (field.type === 'url' && value && !this.isValidURL(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }

        // Length validation
        if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
            isValid = false;
            errorMessage = `Minimum length is ${field.getAttribute('minlength')} characters`;
        }

        if (field.hasAttribute('maxlength') && value.length > field.getAttribute('maxlength')) {
            isValid = false;
            errorMessage = `Maximum length is ${field.getAttribute('maxlength')} characters`;
        }

        // Pattern validation
        if (field.hasAttribute('pattern') && value && !new RegExp(field.getAttribute('pattern')).test(value)) {
            isValid = false;
            errorMessage = 'Please match the requested format';
        }

        // Apply validation result
        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.setAttribute('aria-describedby', 'field-error');
    }

    removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showFormErrors(form) {
        const errorFields = form.querySelectorAll('.error');
        if (errorFields.length > 0) {
            const firstError = errorFields[0];
            firstError.focus();
            
            // Show general form error
            this.showFormGeneralError(form, `Please correct ${errorFields.length} error(s) in the form`);
        }
    }

    showFormGeneralError(form, message) {
        let errorDiv = form.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            form.insertBefore(errorDiv, form.firstChild);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            background: #fdf2f2;
            border: 1px solid #fecaca;
            padding: 0.75rem;
            border-radius: 0.375rem;
            margin-bottom: 1rem;
            display: block;
        `;
    }
}

// Input Sanitization
class InputSanitizer {
    static sanitizeString(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+\s*=/gi, '') // Remove event handlers
            .substring(0, 1000); // Limit length
    }

    static sanitizeEmail(email) {
        return this.sanitizeString(email).toLowerCase();
    }

    static sanitizePhone(phone) {
        return phone.replace(/[^\d\+\-\(\)\s]/g, '');
    }

    static sanitizeURL(url) {
        const sanitized = this.sanitizeString(url);
        if (sanitized && !sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
            return 'https://' + sanitized;
        }
        return sanitized;
    }
}

// Rate Limiting for Form Submissions
class RateLimiter {
    constructor(maxAttempts = 5, timeWindow = 60000) { // 5 attempts per minute
        this.maxAttempts = maxAttempts;
        this.timeWindow = timeWindow;
        this.attempts = new Map();
    }

    canSubmit(formId) {
        const now = Date.now();
        const formAttempts = this.attempts.get(formId) || [];
        
        // Remove old attempts outside the time window
        const recentAttempts = formAttempts.filter(timestamp => now - timestamp < this.timeWindow);
        
        if (recentAttempts.length >= this.maxAttempts) {
            return false;
        }
        
        // Add current attempt
        recentAttempts.push(now);
        this.attempts.set(formId, recentAttempts);
        
        return true;
    }

    getRemainingTime(formId) {
        const formAttempts = this.attempts.get(formId) || [];
        if (formAttempts.length === 0) return 0;
        
        const oldestAttempt = Math.min(...formAttempts);
        const timeElapsed = Date.now() - oldestAttempt;
        return Math.max(0, this.timeWindow - timeElapsed);
    }
}

// Form Submission Security
class FormSubmissionSecurity {
    constructor() {
        this.csrf = new CSRFProtection();
        this.validator = new FormValidator();
        this.rateLimiter = new RateLimiter();
        this.setupSecurity();
    }

    setupSecurity() {
        // Prevent double submission
        this.preventDoubleSubmission();
        
        // Add honeypot fields
        this.addHoneypotFields();
        
        // Monitor for suspicious activity
        this.monitorSuspiciousActivity();
    }

    preventDoubleSubmission() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                    
                    // Re-enable after 5 seconds as fallback
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = submitButton.getAttribute('data-original-text') || 'Submit';
                    }, 5000);
                }
            });
        });
    }

    addHoneypotFields() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.querySelector('.honeypot')) {
                const honeypot = document.createElement('input');
                honeypot.type = 'text';
                honeypot.name = 'website';
                honeypot.className = 'honeypot';
                honeypot.style.cssText = `
                    position: absolute;
                    left: -9999px;
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                    pointer-events: none;
                `;
                
                form.appendChild(honeypot);
                
                // Check honeypot on submission
                form.addEventListener('submit', (e) => {
                    if (honeypot.value) {
                        e.preventDefault();
                        console.warn('Honeypot field filled - potential bot submission');
                        return false;
                    }
                });
            }
        });
    }

    monitorSuspiciousActivity() {
        let rapidClicks = 0;
        let lastClickTime = 0;
        
        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < 100) { // Less than 100ms between clicks
                rapidClicks++;
                if (rapidClicks > 10) {
                    console.warn('Suspicious rapid clicking detected');
                    // Could implement additional security measures here
                }
            } else {
                rapidClicks = 0;
            }
            lastClickTime = now;
        });
    }

    secureFormSubmission(form, data) {
        // Validate CSRF token
        const csrfToken = data.get('csrf_token');
        if (!this.csrf.validateToken(csrfToken)) {
            throw new Error('Invalid CSRF token');
        }

        // Check rate limiting
        const formId = form.id || form.action;
        if (!this.rateLimiter.canSubmit(formId)) {
            const remainingTime = this.rateLimiter.getRemainingTime(formId);
            throw new Error(`Too many submission attempts. Please wait ${Math.ceil(remainingTime / 1000)} seconds.`);
        }

        // Sanitize data
        const sanitizedData = new FormData();
        for (let [key, value] of data.entries()) {
            if (key === 'csrf_token') {
                sanitizedData.append(key, value);
            } else if (key === 'email') {
                sanitizedData.append(key, InputSanitizer.sanitizeEmail(value));
            } else if (key === 'phone') {
                sanitizedData.append(key, InputSanitizer.sanitizePhone(value));
            } else if (key === 'url' || key === 'website') {
                sanitizedData.append(key, InputSanitizer.sanitizeURL(value));
            } else {
                sanitizedData.append(key, InputSanitizer.sanitizeString(value));
            }
        }

        return sanitizedData;
    }
}

// Initialize form security
const formSecurity = new FormSubmissionSecurity();

// Export for global use
window.formSecurity = formSecurity;
window.CSRFProtection = CSRFProtection;
window.FormValidator = FormValidator;
window.InputSanitizer = InputSanitizer;
window.RateLimiter = RateLimiter;
