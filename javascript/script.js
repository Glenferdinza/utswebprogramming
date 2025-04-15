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