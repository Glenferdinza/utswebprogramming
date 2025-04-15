// Tambahkan kode ini ke dalam file JavaScript Anda

document.addEventListener('DOMContentLoaded', function() {
    // Deteksi Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
        // Tambahkan class khusus untuk styling Android
        document.body.classList.add('android-device');
        
        // Optimasi untuk viewport Android
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        } else {
            // Jika belum ada viewport meta, tambahkan
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
            document.head.appendChild(meta);
        }
        
        // Optimalkan animasi untuk hardware Android
        const animatedElements = document.querySelectorAll('.menu-item, .profile-image, .fade-in, .section-title');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Optimasi untuk touch events Android - mengatasi masalah delay 300ms
        const buttons = document.querySelectorAll('.category-button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Fix untuk keyboard Android yang mengubah viewport
        const inputs = document.querySelectorAll('input, textarea');
        if (inputs.length > 0) {
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    // Atur timeout untuk memberi waktu keyboard muncul
                    setTimeout(() => {
                        window.scrollTo(0, window.pageYOffset);
                    }, 300);
                });
            });
        }
        
        // Optimalkan scrolling pada Android dengan throttling
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

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
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
            
            // Get filter value - using consistent attribute names
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
});
