document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');

    if (openMenu && closeMenu && navLinks) {
        openMenu.addEventListener('click', function () {
            navLinks.classList.add('active');
        });

        closeMenu.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Only prevent default if it's a hash link
            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Testimonial slider
    const testimonialSlider = document.getElementById('testimonial-slider');

    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        let currentSlide = 0;

        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));

            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));

            // Show the current slide
            slides[index].classList.add('active');

            // Add active class to current dot
            if (dots[index]) {
                dots[index].classList.add('active');
            }

            // Update current slide index
            currentSlide = index;
        }

        // Next slide
        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(0);
            }
        }

        // Previous slide
        function prevSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            } else {
                showSlide(slides.length - 1);
            }
        }

        // Event listeners for next and previous buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });

        // Auto slide
        setInterval(nextSlide, 5000);
    }

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    // Gallery items in home page
    const homeGalleryItems = document.querySelectorAll('.home-gallery .gallery-item');
    if (homeGalleryItems.length > 0) {
        homeGalleryItems.forEach(item => {
            item.addEventListener('click', function () {
                window.location.href = 'gallery.html';
            });
        });
    }

    // Booking Modal
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.btn-book');
    const closeModal = document.querySelector('.close-modal');
    const confirmBooking = document.getElementById('confirmBooking');
    const cancelBooking = document.getElementById('cancelBooking');
    const bookingSummary = document.getElementById('bookingSummary');
    const bookingForm = document.getElementById('bookingForm');
    const payWithCard = document.getElementById('payWithCard');
    const payWithTransfer = document.getElementById('payWithTransfer');

    // Open modal when book now button is clicked
    if (bookButtons.length > 0 && modal) {
        bookButtons.forEach(button => {
            button.addEventListener('click', function () {
                const roomType = this.getAttribute('data-room');
                const roomPrice = this.getAttribute('data-price');

                // If there's a booking form on the page, set the room type
                const roomTypeSelect = document.getElementById('roomType');
                if (roomTypeSelect) {
                    // Find the option with the matching text
                    for (let i = 0; i < roomTypeSelect.options.length; i++) {
                        if (roomTypeSelect.options[i].text.includes(roomType)) {
                            roomTypeSelect.selectedIndex = i;
                            break;
                        }
                    }

                    // Scroll to the booking form
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        window.scrollTo({
                            top: contactSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // If we're on a page without a booking form, show the modal directly
                    showBookingSummary(roomType, roomPrice);
                    modal.style.display = 'flex';
                }
            });
        });
    }

    // Function to show booking summary in modal
    function showBookingSummary(roomType, roomPrice) {
        const checkInDate = new Date();
        const checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + 1);

        const nights = 1;
        const totalPrice = roomPrice * nights;

        bookingSummary.innerHTML = `
            <div class="summary-item">
                <strong>Room Type:</strong> ${roomType}
            </div>
            <div class="summary-item">
                <strong>Check-in Date:</strong> ${formatDate(checkInDate)}
            </div>
            <div class="summary-item">
                <strong>Check-out Date:</strong> ${formatDate(checkOutDate)}
            </div>
            <div class="summary-item">
                <strong>Number of Nights:</strong> ${nights}
            </div>
            <div class="summary-item">
                <strong>Price per Night:</strong> ₦${parseInt(roomPrice).toLocaleString()}
            </div>
            <div class="summary-item total">
                <strong>Total Price:</strong> ₦${totalPrice.toLocaleString()}
            </div>
        `;
    }

    // Close modal when X is clicked
    if (closeModal && modal) {
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Close modal when cancel button is clicked
    if (cancelBooking && modal) {
        cancelBooking.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    if (modal) {
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Handle payment options
    if (payWithCard) {
        payWithCard.addEventListener('click', function () {
            alert('Redirecting to payment gateway...');
            // Here you would normally redirect to a payment gateway
        });
    }

    if (payWithTransfer) {
        payWithTransfer.addEventListener('click', function () {
            alert('Bank Details:\nBank: Sample Bank\nAccount Number: 1234567890\nAccount Name: Sedani Haven\n\nPlease send your payment receipt to sedenaltd@yahoo.com');
        });
    }

    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const roomType = document.getElementById('roomType').value;
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const message = document.getElementById('message').value;

            // Calculate number of nights and total price
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

            let roomPrice = 0;
            if (roomType.includes('Economy Room')) {
                roomPrice = 25000;
            } else if (roomType.includes('Business Room')) {
                roomPrice = 30000;
            } else if (roomType.includes('First Class Room')) {
                roomPrice = 40000;
            }

            const totalPrice = roomPrice * nights;

            // Validate dates
            if (checkInDate >= checkOutDate) {
                alert('Check-out date must be after check-in date');
                return;
            }

            // Display booking summary
            bookingSummary.innerHTML = `
                <div class="summary-item">
                    <strong>Name:</strong> ${name}
                </div>
                <div class="summary-item">
                    <strong>Email:</strong> ${email}
                </div>
                <div class="summary-item">
                    <strong>Phone:</strong> ${phone}
                </div>
                <div class="summary-item">
                    <strong>Room Type:</strong> ${roomType}
                </div>
                <div class="summary-item">
                    <strong>Check-in Date:</strong> ${formatDate(checkInDate)}
                </div>
                <div class="summary-item">
                    <strong>Check-out Date:</strong> ${formatDate(checkOutDate)}
                </div>
                <div class="summary-item">
                    <strong>Number of Nights:</strong> ${nights}
                </div>
                <div class="summary-item">
                    <strong>Price per Night:</strong> ₦${roomPrice.toLocaleString()}
                </div>
                <div class="summary-item total">
                    <strong>Total Price:</strong> ₦${totalPrice.toLocaleString()}
                </div>
            `;

            // Show modal
            modal.style.display = 'flex';
        });
    }

    // Handle booking confirmation
    if (confirmBooking) {
        confirmBooking.addEventListener('click', function () {
            alert('Booking confirmed! We will contact you shortly with payment details.');
            modal.style.display = 'none';
            if (bookingForm) {
                bookingForm.reset();
            }
        });
    }

    // Format date for display
    function formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Set minimum dates for check-in and check-out
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkOutInput.min = today;

        // Update check-out min date when check-in changes
        checkInInput.addEventListener('change', function () {
            const checkInDate = this.value;
            checkOutInput.min = checkInDate;

            // If check-out date is before new check-in date, update it
            if (checkOutInput.value < checkInDate) {
                checkOutInput.value = checkInDate;
            }
        });
    }

    // Add CSS styles for summary items
    const style = document.createElement('style');
    style.textContent = `
        .summary-item {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        .summary-item.total {
            font-size: 1.2rem;
            color: var(--primary-color);
            border-top: 2px solid #eee;
            border-bottom: none;
            padding-top: 10px;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add animation class when element is in viewport
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.feature-card, .room-card, .gallery-item, .about-image, .about-text, .mission-text, .mission-image, .value-card, .team-member');

        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .room-card, .gallery-item, .about-image, .about-text, .mission-text, .mission-image, .value-card, .team-member');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Trigger animation for elements in viewport on page load
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});