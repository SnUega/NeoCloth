// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM loaded, initializing...');
        
        // Initialize language
        if (typeof initializeLanguage === 'function') {
            initializeLanguage();
        }
        
        // Initialize smooth scrolling
        initializeSmoothScrolling();
        
        // Initialize navbar scroll effect
        initializeNavbarScroll();
        
        // Initialize back to top button
        initializeBackToTop();
        
        // Initialize FAQ functionality
        initializeFAQ();
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Initialize language switcher
        initializeLanguageSwitcher();
        
        // Initialize scroll animations
        initializeScrollAnimations();
        

        
        // Hide loading spinner
        hideLoadingSpinner();
        
        console.log('Landing page initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        // Ensure content is visible even if JS fails
        document.body.style.display = 'block';
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }
});

// Hide loading spinner
function hideLoadingSpinner() {
    try {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            setTimeout(() => {
                spinner.classList.add('hidden');
                // Also hide with display none as fallback
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 500);
            }, 1000);
        }
    } catch (error) {
        console.error('Error hiding spinner:', error);
    }
}





// Smooth scrolling functionality
function initializeSmoothScrolling() {
    try {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    try {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    } catch (error) {
        console.error('Error scrolling to section:', error);
    }
}

// Scroll to top function
function scrollToTop() {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error scrolling to top:', error);
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    try {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing navbar scroll:', error);
    }
}

// Back to top button
function initializeBackToTop() {
    try {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing back to top:', error);
    }
}

// FAQ functionality
function initializeFAQ() {
    try {
        // FAQ items are handled by the toggleFaq function
        console.log('FAQ functionality initialized');
    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

function toggleFaq(button) {
    try {
        const faqItem = button.closest('.faq-item');
        if (!faqItem) return;
        
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    } catch (error) {
        console.error('Error toggling FAQ:', error);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    try {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Language switcher
function initializeLanguageSwitcher() {
    try {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (typeof setLanguage === 'function') {
                    setLanguage(lang);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing language switcher:', error);
    }
}

// Scroll animations
function initializeScrollAnimations() {
    try {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.log('IntersectionObserver not supported, skipping scroll animations');
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(
            '.solution-card, .catalog-section, .about-card, .review-card, .product-card'
        );
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        // Email validation
        if (field.type === 'email' && field.value && !validateEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
        }
    });
    
    return isValid;
}

// Fallback initialization - ensure basic functionality works
window.addEventListener('load', function() {
    try {
        console.log('Window loaded, running fallback initialization...');
        
        // Hide loading spinner if it's still visible
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
        
        // Ensure body is visible
        document.body.style.display = 'block';
        

        
        // Basic mobile menu fallback
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
        
        // Basic smooth scrolling fallback
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        console.log('Fallback initialization completed');
    } catch (error) {
        console.error('Error in fallback initialization:', error);
        // Last resort - force content visibility
        document.body.style.display = 'block';
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    // Ensure content is visible even if there are errors
    document.body.style.display = 'block';
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }

});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Ensure content is visible even if there are errors
    document.body.style.display = 'block';
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
});

// Cookie consent (if needed)
function initializeCookieConsent() {
    const cookieConsent = localStorage.getItem('cookie-consent');
    
    if (!cookieConsent) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <button class="btn btn-primary" onclick="acceptCookies()">Accept</button>
            </div>
        `;
        
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #333;
            color: white;
            padding: 1rem;
            z-index: 2000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(banner);
        
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'true');
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Google Analytics (if needed)
function initializeAnalytics() {
    // Initialize Google Analytics or other tracking
    // This is a placeholder - replace with your actual tracking code
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID');
    }
}

// Social sharing
function shareOnSocial(platform, url = window.location.href, text = '') {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        return new Promise((resolve, reject) => {
            document.execCommand('copy') ? resolve() : reject();
            textArea.remove();
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const mobileToggle = document.getElementById('mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        }
    }
    
    // Ctrl/Cmd + K for search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Open search modal or focus search input
    }
});

// Accessibility improvements
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #333;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.setAttribute('id', 'main-content');
        heroSection.setAttribute('tabindex', '-1');
    }
}

// Initialize accessibility on load
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Language switcher functionality
function initializeLanguageSwitcher() {
    try {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang && typeof setLanguage === 'function') {
                    setLanguage(lang);
                }
            });
        });
        console.log('Language switcher initialized');
    } catch (error) {
        console.error('Error initializing language switcher:', error);
    }
}

// Export global functions
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.toggleFaq = toggleFaq;
window.shareOnSocial = shareOnSocial;
window.copyToClipboard = copyToClipboard;
window.acceptCookies = acceptCookies;
