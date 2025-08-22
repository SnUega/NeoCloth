# Hover эффекты и плавная прокрутка для NeoCloth

## Извлеченные из текущей версии функции для интеграции в рабочую версию

### 1. CSS Hover эффекты

#### Основные кнопки
```css
/* Enhanced button hover effects */
.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Smooth transitions for all interactive elements */
[onclick]:hover, [href]:hover, .clickable:hover {
    transform: translateY(-2px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced link hover effects */
a[href^="#"]:hover {
    transform: translateY(-1px);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### Карточки решений
```css
.solution-card {
    position: relative;
    overflow: hidden;
}

.solution-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(51, 51, 51, 0.05), transparent);
    transition: left 0.6s ease;
}

.solution-card:hover::before {
    left: 100%;
}

.solution-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.solution-card:hover .solution-icon {
    transform: scale(1.1);
    background: #555;
}

.solution-card:hover .solution-icon i {
    transform: scale(1.1);
}
```

#### Карточки продуктов
```css
.product-card {
    position: relative;
    overflow: hidden;
}

.product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(51, 51, 51, 0.05), transparent);
    transition: left 0.6s ease;
    z-index: 1;
}

.product-card:hover::before {
    left: 100%;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.product-card:hover .product-img {
    transform: scale(1.08);
}

.product-actions .btn:hover::before {
    left: 100%;
}
```

#### Карточки about
```css
.about-card {
    position: relative;
    overflow: hidden;
}

.about-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(51, 51, 51, 0.05), transparent);
    transition: left 0.6s ease;
}

.about-card:hover::before {
    left: 100%;
}

.about-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.about-card:hover .about-icon {
    transform: scale(1.1);
    background: #555;
}

.about-card:hover .about-icon i {
    transform: scale(1.1);
}

.about-card:hover h3 {
    color: #000;
}

.about-card:hover p {
    color: #333;
}
```

#### Карточки отзывов
```css
.review-card {
    position: relative;
    overflow: hidden;
}

.review-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(51, 51, 51, 0.05), transparent);
    transition: left 0.6s ease;
}

.review-card:hover::before {
    left: 100%;
}

.review-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    background: #fff;
}

.review-card:hover .review-placeholder {
    transform: scale(1.1);
    background: #333;
    color: #fff;
}

.review-card:hover .review-placeholder i {
    transform: scale(1.1);
}

.review-card:hover .review-stars {
    transform: scale(1.1);
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.review-card:hover .review-content p {
    color: #333;
}

.review-card:hover .review-author {
    color: #000;
    transform: translateY(-2px);
}

.review-card:hover .review-category {
    color: #333;
    font-weight: 500;
}
```

#### FAQ элементы
```css
.faq-question {
    position: relative;
    overflow: hidden;
}

.faq-question::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(51, 51, 51, 0.05), transparent);
    transition: left 0.6s ease;
}

.faq-question:hover::before {
    left: 100%;
}

.faq-question:hover {
    background: #f8f9fa;
    transform: translateX(5px);
}
```

#### Back-to-top кнопка
```css
.back-to-top:hover {
    background: #555;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.back-to-top:active {
    transform: translateY(-1px) scale(0.98);
}
```

#### Модальные окна
```css
.modal-close:hover::before {
    left: 100%;
}

.modal-close:hover {
    background: #f1f3f4;
    color: #333;
}
```

#### Footer ссылки
```css
.footer-section ul li a:hover {
    color: #fff;
}

.social-links a:hover {
    color: #fff;
}
```

#### Навигация
```css
.nav-logo h2:hover {
    transform: scale(1.05);
    color: #555;
}

.nav-menu a:hover {
    color: #666;
}

.nav-menu a:hover::after {
    width: 100%;
}
```

#### Языковые кнопки
```css
.lang-btn:hover::before {
    left: 100%;
}

.lang-btn:hover {
    background: #333;
    color: #fff;
}
```

#### Корзина
```css
.cart-icon:hover {
    transform: scale(1.1);
}

.cart-item-remove:hover {
    background: #f8f9fa;
}
```

### 2. JavaScript плавная прокрутка

#### Основная функция плавной прокрутки
```javascript
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
```

#### Инициализация плавной прокрутки
```javascript
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
```

#### Функция прокрутки к секции
```javascript
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
```

#### Функция прокрутки наверх
```javascript
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
```

#### Обновление активной навигационной ссылки
```javascript
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
```

### 3. Общие CSS переходы

```css
/* Smooth transitions for all sections */
section {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    scroll-margin-top: 80px; /* Account for fixed navbar */
}

/* Enhanced scroll animations */
.scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-animate.animate {
    opacity: 1;
    transform: translateY(0);
}

.scroll-animate > * {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-animate.animate > * {
    opacity: 1;
    transform: translateY(0);
}
```

### 4. Инструкции по интеграции

1. **CSS**: Скопировать все hover эффекты в файл стилей
2. **JavaScript**: Добавить функции плавной прокрутки в main.js
3. **Инициализация**: Вызвать `initializeSmoothScrolling()` в DOMContentLoaded
4. **Обновление навигации**: Добавить `updateActiveNavLink()` в scroll event listener
5. **Back-to-top**: Интегрировать функцию `scrollToTop()` в кнопку

Все функции имеют fallback механизмы и обработку ошибок для надежности.

