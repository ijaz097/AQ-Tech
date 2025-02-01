document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.querySelector('#modal-image img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Toggle Dark Mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Show Modal with Product Details
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;

            // Load product details dynamically (example data)
            if (productId === "1") {
                modalImage.src = "images/camera1.jpg";
                modalTitle.textContent = "CCTV Camera 1080P";
                modalDescription.textContent = "High-quality security camera with night vision.";
            } else if (productId === "2") {
                modalImage.src = "images/router1.jpg";
                modalTitle.textContent = "High-Speed Router";
                modalDescription.textContent = "Reliable router with advanced security features.";
            }

            modal.classList.add('show');
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close Modal on Outside Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Service Details Modal
    const serviceDetails = {
        cctv: {
            title: "CCTV Installation",
            description: "Our experts provide a seamless installation process, ensuring full security coverage for your property. This includes optimal camera placement and advanced configuration."
        },
        maintenance: {
            title: "Maintenance & Troubleshooting",
            description: "We offer regular system check-ups and troubleshooting support to keep your security systems running smoothly and minimize downtime."
        },
        networking: {
            title: "Networking Solutions",
            description: "Customized network setups, Wi-Fi optimization, and advanced security measures to keep your home or office connected and secure."
        }
    };

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            alert(`${serviceDetails[service].title}: ${serviceDetails[service].description}`);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Animated Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.dataset.target; // Get the target value from data-target
            const increment = target / 200; // Adjust speed by changing the denominator
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target; // Set final value
                } else {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateNumber);
                }
            };

            updateNumber();
        });
    };

    // Trigger animation when stats section is visible
    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(statsSection); // Stop observing after animation
            }
        });
    });
    observer.observe(statsSection);

    // Carousel for Testimonials
    const carousel = document.querySelector('.carousel');
    let isMouseDown = false;
    let startX, scrollLeft;

    const startDrag = e => {
        isMouseDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    };

    const stopDrag = () => {
        isMouseDown = false;
        carousel.classList.remove('active');
    };

    const moveDrag = e => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    };

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mouseleave', stopDrag);
    carousel.addEventListener('mouseup', stopDrag);
    carousel.addEventListener('mousemove', moveDrag);

    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.textContent = '↑';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            if (link.hash !== '') {
                e.preventDefault();
                const target = document.querySelector(link.hash);
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
