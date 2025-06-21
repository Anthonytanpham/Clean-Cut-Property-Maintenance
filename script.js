// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Scroll to section function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .contact-item, .benefits-list li');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // New Testimonials functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    let testimonialInterval;
    let userHasInteracted = false;
    
    function showTestimonial(index) {
        // Remove active from all cards and indicators
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to current card and indicator
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }
    
    function stopAutoAdvance() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
            testimonialInterval = null;
        }
        userHasInteracted = true;
    }
    
    // Event listeners for testimonial navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoAdvance();
            nextTestimonial();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoAdvance();
            prevTestimonial();
        });
    }
    
    // Indicator navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoAdvance();
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials every 6 seconds (only if user hasn't interacted)
    testimonialInterval = setInterval(function() {
        if (!userHasInteracted) {
            nextTestimonial();
        }
    }, 6000);
    
    // Form handling
    const contactForm = document.getElementById('contact-form');
    const applicationForms = document.querySelectorAll('.application-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent. We\'ll get back to you soon!', 'success');
                contactForm.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Application form handling
    applicationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SUBMITTING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your application! We\'ll review it and get back to you soon.', 'success');
                form.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
    
    // Gallery image modal (lightbox effect)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h4').textContent;
            const description = overlay.querySelector('p').textContent;
            
            // Create modal
            showImageModal(title, description);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animations to elements
    const loadingElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card');
    loadingElements.forEach((el, index) => {
        el.classList.add('loading');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Counter animation for stats (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Initialize counters when they come into view
    const counterElements = document.querySelectorAll('[data-counter]');
    counterElements.forEach(counter => {
        observer.observe(counter);
        counter.addEventListener('animationstart', function() {
            const target = parseInt(this.dataset.counter);
            animateCounter(this, target);
        });
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4a7c59' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function showImageModal(title, description) {
    // Create modal backdrop
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeImageModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="modal-placeholder">
                    <i class="fas fa-image"></i>
                    <p>High-resolution image would be displayed here</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }
}

// Performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-dependent code here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Add CSS for modal and notifications
const style = document.createElement('style');
style.textContent = `
    .image-modal {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        cursor: pointer;
    }
    
    .modal-content {
        position: relative;
        background: white;
        border-radius: 15px;
        max-width: 600px;
        max-height: 80vh;
        overflow: auto;
        padding: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #ff4757;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
    }
    
    .modal-close:hover {
        transform: scale(1.1);
    }
    
    .modal-placeholder {
        background: #f8f6f0;
        border: 2px dashed #4a7c59;
        border-radius: 10px;
        padding: 3rem;
        text-align: center;
        color: #6c757d;
        margin-top: 1rem;
    }
    
    .modal-placeholder i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #4a7c59;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style); 