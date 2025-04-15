document.addEventListener('DOMContentLoaded', function() {
    // Detect Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
        // Add Android-specific class
        document.body.classList.add('android-device');
        
        // Optimize for Android viewport
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        } else {
            // Add viewport meta if not present
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
            document.head.appendChild(meta);
        }
        
        // Optimize animations for Android hardware
        const animatedElements = document.querySelectorAll('.menu-item, .profile-image, .fade-in, .section-title');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Fix 300ms delay on Android touch events
        const buttons = document.querySelectorAll('.category-button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Fix for Android keyboard adjusting viewport
        const inputs = document.querySelectorAll('input, textarea');
        if (inputs.length > 0) {
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    setTimeout(() => {
                        window.scrollTo(0, window.pageYOffset);
                    }, 300);
                });
            });
        }
        
        // Throttle scrolling for better performance on Android
        let lastScrollTime = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            const now = Date.now();
            if (now - lastScrollTime > 20) { // Throttle to 50fps
                lastScrollTime = now;
                
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, { passive: true });
    }

    // Navbar scroll effect for all devices
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);
    
    // Elements to observe
    const elementsToObserve = document.querySelectorAll('.section-title, .profile-content, .menu-categories, .menu-grid, .fade-in');
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation delay to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Filter functionality for menu categories
    const categoryButtons = document.querySelectorAll('.category-button');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (selectedCategory === 'all') {
                    item.classList.remove('hidden');
                } else if (item.getAttribute('data-category') !== selectedCategory) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
                
                // Reset animation
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = '';
                }, 10);
            });
        });
    });
});