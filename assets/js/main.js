// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        
        
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
        
        // Initialize confirmation modal functionality
        initializeConfirmationModal();
        
        // Initialize active navigation
        updateActiveNavigation();
        
        // Hide loading spinner
        hideLoadingSpinner();
        

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
                    
                    // Update active navigation immediately
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    const mobileNav = document.getElementById('mobile-nav');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        });
        
        // Smooth scroll for mobile navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a[href^="#"]');
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                const target = document.querySelector(href);
                if (target) {
                    smoothScrollTo(target, 80); // Account for fixed navbar
                    
                    // Close mobile menu
                    const mobileNav = document.getElementById('mobile-nav');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    if (mobileNav && mobileMenuToggle) {
                        mobileNav.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        });
        
        // Handle logo click (scroll to top/hero)
        const logo = document.querySelector('.nav-logo .desktop-logo');
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
        
        // Handle mobile logo click (scroll to top/hero)
        const mobileLogo = document.querySelector('.nav-logo .mobile-logo');
        if (mobileLogo) {
            mobileLogo.addEventListener('click', function() {
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

// Cache for section dimensions to avoid recalculation
let sectionDimensionsCache = null;
let lastScrollPosition = 0;

// Active navigation tracking with debouncing and caching
function updateActiveNavigation() {
    try {
        const currentScrollPosition = window.scrollY;
        
        // Only update if scroll position changed significantly (more than 50px)
        if (Math.abs(currentScrollPosition - lastScrollPosition) < 50) {
            return;
        }
        
        lastScrollPosition = currentScrollPosition;
        
        // Map navigation hrefs to section IDs
        const sectionMap = {
            '#hero': 'hero',
            '#catalogs': 'catalogs', 
            '#about': 'about',
            '#reviews': 'reviews',
            '#contact': 'contact'
        };
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        const scrollPosition = currentScrollPosition + 100; // Offset for better detection
        
        // Cache section dimensions (only recalculate if cache is invalid)
        if (!sectionDimensionsCache) {
            sectionDimensionsCache = [];
            Object.values(sectionMap).forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    sectionDimensionsCache.push({
                        id: sectionId,
                        top: section.offsetTop,
                        bottom: section.offsetTop + section.offsetHeight
                    });
                }
            });
            
            // Sort by top position
            sectionDimensionsCache.sort((a, b) => a.top - b.top);
        }
        
        // Find the active section by checking from bottom to top
        let activeSection = null;
        for (let i = sectionDimensionsCache.length - 1; i >= 0; i--) {
            const section = sectionDimensionsCache[i];
            if (scrollPosition >= section.top) {
                activeSection = section.id;
                break;
            }
        }
        
        // If no section found, default to hero
        if (!activeSection) {
            activeSection = 'hero';
        }
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const isActive = sectionMap[href] === activeSection;
            if (isActive) {
                link.classList.add('active');
            }
        });
        
    } catch (error) {
        console.error('Error updating active navigation:', error);
    }
}

// Function to invalidate cache (call this when page content changes)
function invalidateSectionCache() {
    sectionDimensionsCache = null;
}

// Invalidate cache on window resize
window.addEventListener('resize', invalidateSectionCache);

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
                
                // Update active navigation on scroll
                updateActiveNavigation();
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
            // Handle scroll events to show/hide button
            window.addEventListener('scroll', function() {
                // Show button when user scrolls past hero section
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    if (window.scrollY > heroBottom - 100) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                } else {
                    // Fallback: show after 300px scroll
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                    }
                }
            });
            
            // Handle click event to scroll to top
            backToTopBtn.addEventListener('click', function() {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    smoothScrollTo(heroSection, 80);
                } else {
                    smoothScrollTo(document.body, 0);
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
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileNav.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on a link
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
            
            // Close menu with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
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
window.startConfirmCountdown = startConfirmCountdown;

// Confirmation modal functionality
let confirmTimer;

function startConfirmCountdown() {
    const confirmModal = document.getElementById('confirm-modal');
    if (!confirmModal) return;
    
    // Open confirmation modal
    confirmModal.setAttribute('aria-hidden', 'false');
    
    // 3 seconds progress
    const duration = 3000;
    const start = performance.now();
    cancelAnimationFrame(confirmTimer);
    
    (function frame(t) {
        const elapsed = Math.min(t - start, duration);
        const p = Math.round((elapsed / duration) * 100);
        const progressRing = document.getElementById('progress-ring');
        if (progressRing) {
            progressRing.style.setProperty('--p', p);
        }
        if (elapsed < duration) {
            confirmTimer = requestAnimationFrame(frame);
        } else {
            closeConfirmModal();
        }
    })(start);
}

function closeConfirmModal() {
    const confirmModal = document.getElementById('confirm-modal');
    if (confirmModal) {
        confirmModal.setAttribute('aria-hidden', 'true');
    }
}

function initializeConfirmationModal() {
    // Close confirmation modal by backdrop click
    const confirmModal = document.getElementById('confirm-modal');
    if (confirmModal) {
        confirmModal.addEventListener('click', (e) => {
            if (e.target.matches('[data-close]')) {
                closeConfirmModal();
            }
        });
    }
    
    // Close confirmation modal by close button
    const confirmClose = document.getElementById('confirm-close');
    if (confirmClose) {
        confirmClose.addEventListener('click', closeConfirmModal);
    }
    
    
}
