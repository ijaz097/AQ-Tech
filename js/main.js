// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const typingText = document.querySelector('.dynamic-text');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Typing Animation Configuration
const words = ['Security Solutions', 'Network Systems', 'Smart Technology', 'Multimedia Services'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTyping = false;

// Typing Animation Function
function typeAnimation() {
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting;
    
    // Update text based on direction
    if (shouldDelete) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Handle word completion
    if (!shouldDelete && charIndex === currentWord.length) {
        // Pause at end of word
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (shouldDelete && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    // Set typing speed
    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeAnimation, typingSpeed);
}

// Navigation Menu Toggle
function toggleMenu() {
    navLinks.forEach(link => link.classList.toggle('active'));
    menuBtn.classList.toggle('active');
}

// Close menu when clicking outside
function handleClickOutside(e) {
    if (!menuBtn.contains(e.target) && !navLinks.forEach(link => link.contains(e.target))) {
        navLinks.forEach(link => link.classList.remove('active'));
        menuBtn.classList.remove('active');
    }
}

// Navbar scroll effect
function handleScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth scroll for navigation
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu if open
        navLinks.forEach(link => link.classList.remove('active'));
        menuBtn.classList.remove('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    if (typingText) {
        setTimeout(typeAnimation, 1000);
    }
    
    // Add scroll animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Add event listeners
    menuBtn.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    // Add smooth scroll to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
});

// Package Tab Switching
const packageTabs = document.querySelectorAll('.package-tab');
const packageCategories = document.querySelectorAll('.package-category');

packageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        packageTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all package categories
        packageCategories.forEach(category => {
            category.classList.remove('active');
            category.style.opacity = '0';
        });
        
        // Show selected category with fade effect
        const targetCategory = document.getElementById(`${tab.dataset.type}-packages`);
        if (targetCategory) {
            targetCategory.classList.add('active');
            setTimeout(() => {
                targetCategory.style.opacity = '1';
            }, 50);
        }
    });
});

// Package Details Modal
const detailsBtns = document.querySelectorAll('.details-btn');
detailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const packageType = btn.dataset.package;
        // You can implement a modal here to show more details about each package
        alert('Package details feature coming soon!');
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.menu-btn');
const mobileNavbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
    mobileNavbar.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNavbar.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileNavbar.classList.contains('active')) {
        mobileNavbar.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavbar.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Update active navigation link on scroll
function updateActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            navbar.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Form handling
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !phone || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone validation (allows international formats)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Construct email body
        const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
        `.trim();
        
        // Construct Gmail-specific link
        const subject = `Service Inquiry: ${service}`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=aq.cctvtech@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open Gmail in a new tab
        window.open(gmailLink, '_blank');
        
        // Reset form
        contactForm.reset();
    });

    // Add input validation as user types
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Event Listeners
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// WhatsApp Integration
const whatsappLink = document.querySelector('.whatsapp-link');
if (whatsappLink) {
    whatsappLink.href = 'https://wa.me/923062142514';
}

// Go To Top Button Functionality
const goToTopButton = document.getElementById('goToTop');

if (goToTopButton) {
    // Initial check for scroll position
    if (window.pageYOffset > 300) {
        goToTopButton.classList.add('visible');
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            goToTopButton.classList.add('visible');
        } else {
            goToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    goToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .package-card, .feature, .team-member').forEach(el => {
    observer.observe(el);
});

// Add scroll event listener for header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener for active nav updates
window.addEventListener('scroll', updateActiveNavLink);

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});
