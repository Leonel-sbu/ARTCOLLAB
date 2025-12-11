// Art Platform Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Art Platform initialized');
    
    // Initialize Firebase (config from firebase-config.js)
    if (typeof initializeFirebase === 'function') {
        initializeFirebase();
    }
    
    // Initialize all components
    initScrollEffects();
    initImageSlider();
    initCardAnimations();
    initSmoothTransitions();
    initLoadingState();
    
    // Check authentication state
    if (typeof checkAuthState === 'function') {
        checkAuthState();
    }
});

// ============= SCROLL EFFECTS =============
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('.highlight-card, .section-title');
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// ============= IMAGE SLIDER =============
function initImageSlider() {
    const slider = document.getElementById('imageSlider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    let isAnimating = false;
    
    // Create dots
    if (sliderDots) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Initialize first slide
    slides[0].classList.add('active');
    
    // Slide functions
    function goToSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Reset current slide
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Apply transform
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Animate new slide
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            isAnimating = false;
        }, 50);
        
        resetAutoSlide();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe for mobile
    let startX = 0;
    let endX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoSlide();
        });
    }
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }
}

// ============= CARD ANIMATIONS =============
function initCardAnimations() {
    const cards = document.querySelectorAll('.highlight-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============= SMOOTH TRANSITIONS =============
function initSmoothTransitions() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image loading animations
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .sign-in-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============= LOADING STATE =============
function initLoadingState() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Wait for all assets to load
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            
            // Animate hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.animation = 'fadeInUp 1s ease-out';
            }
        }, 300);
    });
}

// ============= UTILITY FUNCTIONS =============
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

// ============= FIREBASE INTEGRATION HELPER =============
function updateUserUI(user) {
    const signInBtn = document.querySelector('.sign-in-btn');
    const profileLink = document.querySelector('nav a[href="pages/profile.html"]');
    
    if (!signInBtn) return;
    
    if (user) {
        // User signed in
        signInBtn.textContent = 'Sign Out';
        signInBtn.href = '#';
        
        // Clone to remove existing listeners
        const newBtn = signInBtn.cloneNode(true);
        signInBtn.parentNode.replaceChild(newBtn, signInBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (firebase.auth().signOut) {
                firebase.auth().signOut().then(() => {
                    window.location.href = 'index.html';
                });
            }
        });
        
        if (profileLink) {
            profileLink.textContent = user.displayName || 'Profile';
        }
    } else {
        // User signed out
        signInBtn.textContent = 'Sign In';
        signInBtn.href = 'pages/login.html';
        
        if (profileLink) {
            profileLink.textContent = 'Profile';
        }
    }
}

// ============= RESIZE HANDLER =============
window.addEventListener('resize', debounce(() => {
    // Handle resize events
    console.log('Window resized');
}, 250));