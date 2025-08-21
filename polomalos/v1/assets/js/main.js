// Main JavaScript functionality
console.log('main.js loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM loaded, initializing...');
        
        // Initialize smooth scrolling polyfill first
        initializeSmoothScrollPolyfill();
        
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

// Initialize smooth scroll polyfill for consistent behavior across browsers
function initializeSmoothScrollPolyfill() {
    try {
        // Check if smooth scrolling is natively supported
        if (!CSS.supports('scroll-behavior', 'smooth')) {
            if (typeof smoothscroll !== 'undefined') {
                smoothscroll.polyfill();
            }
        }
    } catch (error) {
        console.error('Error initializing smooth scroll polyfill:', error);
    }
}

// Enhanced smooth scrolling functionality with fallback
function initializeSmoothScrolling() {
    try {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                const target = document.querySelector(href);
                if (target) {
                    smoothScrollTo(target, 80); // Account for fixed navbar
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        });
        
        // Handle logo click (scroll to top/hero)
        const logo = document.querySelector('.nav-logo h2');
        if (logo) {
            logo.addEventListener('click', function() {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    smoothScrollTo(heroSection, 80);
                } else {
                    smoothScrollTo(document.body, 0);
                }
            });
        }
        
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Reliable smooth scroll function with multiple fallbacks
function smoothScrollTo(target, offset = 0) {
    try {
        // Ensure proper offset calculation for fixed header
        const headerHeight = 70; // Height of fixed navbar
        const actualOffset = Math.max(offset, headerHeight);
        const targetPosition = target.offsetTop - actualOffset;
        
        // Use custom animation for reliable smooth scrolling
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        function animate(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentPosition = startPosition + (distance * easeOutCubic);
            
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Final positioning to ensure accuracy
                window.scrollTo(0, targetPosition);
            }
        }
        
        requestAnimationFrame(animate);
        
    } catch (error) {
        console.error('Error in smooth scroll:', error);
        // Ultimate fallback to instant scroll
        const headerHeight = 70;
        const actualOffset = Math.max(offset, headerHeight);
        window.scrollTo(0, target.offsetTop - actualOffset);
    }
}

// Enhanced scroll to section function
function scrollToSection(sectionId) {
    try {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScrollTo(section, 80);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.classList.remove('menu-open');
            }
        }
    } catch (error) {
        console.error('Error scrolling to section:', error);
    }
}

// Enhanced scroll to top function - scrolls to hero section
function scrollToTop() {
    try {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            smoothScrollTo(heroSection, 80); // Account for fixed navbar
        } else {
            // Fallback to top if hero section not found
            smoothScrollTo(document.body, 0);
        }
    } catch (error) {
        console.error('Error scrolling to top:', error);
        // Ultimate fallback
        window.scrollTo(0, 0);
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    try {
        const navbar = document.getElementById('navbar');
        console.log('Navbar element:', navbar);
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                const scrollY = window.scrollY;
                const shouldAddScrolled = scrollY > 50;
                
                if (shouldAddScrolled) {
                    navbar.classList.add('scrolled');
                    console.log('Navbar scrolled class added');
                } else {
                    navbar.classList.remove('scrolled');
                    console.log('Navbar scrolled class removed');
                }
                
                // Update active navigation link
                updateActiveNavLink();
            });
            
            console.log('Navbar scroll initialized successfully');
        } else {
            console.error('Navbar element not found!');
        }
    } catch (error) {
        console.error('Error initializing navbar scroll:', error);
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

// Back to top button
function initializeBackToTop() {
    try {
        const backToTopBtn = document.getElementById('back-to-top');
        console.log('Back to top button element:', backToTopBtn);
        
        if (backToTopBtn) {
            // Handle scroll events to show/hide button
            window.addEventListener('scroll', function() {
                // Show button when user scrolls past hero section
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    const shouldShow = window.scrollY > heroBottom - 100;
                    console.log('Scroll check:', { scrollY: window.scrollY, heroBottom, shouldShow });
                    
                    if (shouldShow) {
                        backToTopBtn.classList.add('show');
                        console.log('Back to top button shown');
                    } else {
                        backToTopBtn.classList.remove('show');
                        console.log('Back to top button hidden');
                    }
                } else {
                    // Fallback: show after 300px scroll
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.add('show');
                        console.log('Back to top button shown (fallback)');
                    } else {
                        backToTopBtn.classList.remove('show');
                        console.log('Back to top button hidden (fallback)');
                    }
                }
            });
            
            // Handle click event to scroll to top
            backToTopBtn.addEventListener('click', function() {
                console.log('Back to top button clicked');
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    smoothScrollTo(heroSection, 80);
                } else {
                    smoothScrollTo(document.body, 0);
                }
            });
            
            console.log('Back to top button initialized successfully');
        } else {
            console.error('Back to top button not found!');
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

// GSAP Scroll Animations
function initializeScrollAnimations() {
    try {
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.log('GSAP or ScrollTrigger not available, using basic animations');
            initializeBasicScrollAnimations();
            return;
        }
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate solution-card elements in the solution section
        const solutionSection = document.querySelector('#solution');
        if (solutionSection) {
            const solutionCards = solutionSection.querySelectorAll('.solution-card');
            
            if (solutionCards.length > 0) {
                // Set initial state for all cards
                gsap.set(solutionCards, {
                    opacity: 0,
                    y: -50,
                    scale: 0.9
                });
                
                // Animate each card with stagger
                gsap.to(solutionCards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: solutionSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }
        
        // Add more animations for other sections if needed
        const catalogSection = document.querySelector('#catalogs');
        if (catalogSection) {
            const catalogCards = catalogSection.querySelectorAll('.catalog-card');
            if (catalogCards.length > 0) {
                gsap.fromTo(catalogCards, 
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: catalogSection,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }
        
        console.log('GSAP scroll animations initialized successfully');
    } catch (error) {
        console.error('Error initializing GSAP animations:', error);
        // Fallback to basic animations
        initializeBasicScrollAnimations();
    }
}

// Fallback function for when GSAP is not available
function initializeBasicScrollAnimations() {
    try {
        if (!('IntersectionObserver' in window)) {
            return;
        }
        
        // Simple fade-in animations for solution cards
        const solutionSection = document.querySelector('#solution');
        if (solutionSection) {
            const solutionCards = solutionSection.querySelectorAll('.solution-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            solutionCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
        
        console.log('Basic scroll animations initialized');
    } catch (error) {
        console.error('Error initializing basic animations:', error);
    }
}

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

// Export global functions
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.smoothScrollTo = smoothScrollTo;
window.toggleFaq = toggleFaq;
window.shareOnSocial = shareOnSocial;
window.copyToClipboard = copyToClipboard;

// Debug information
console.log('=== DEBUG INFO ===');
console.log('Functions exported:');
console.log('- scrollToSection:', typeof window.scrollToSection);
console.log('- scrollToTop:', typeof window.scrollToTop);
console.log('- smoothScrollTo:', typeof window.smoothScrollTo);
console.log('- toggleFaq:', typeof window.toggleFaq);

// Verify basic scroll functionality
console.log('Basic scroll functionality check:');
console.log('CSS.supports scroll-behavior smooth:', CSS.supports('scroll-behavior', 'smooth'));
console.log('window.scrollTo available:', typeof window.scrollTo === 'function');

// Check if all sections exist
console.log('Checking sections:');
console.log('- hero:', document.getElementById('hero'));
console.log('- catalogs:', document.getElementById('catalogs'));
console.log('- about:', document.getElementById('about'));
console.log('- reviews:', document.getElementById('reviews'));
console.log('- contact:', document.getElementById('contact'));

console.log('=== END DEBUG INFO ===');
