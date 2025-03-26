import './styles.css';

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website initialized');
    
    // Initialize all components
    initNavigation();
    initSectionAnimations();
});

/**
 * Updates navigation based on current page and adds interaction effects
 */
function initNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Get current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // Loop through all navigation links
    navLinks.forEach(link => {
        // Add hover effect listeners
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
        
        // Set active class based on current page
        const linkHref = link.getAttribute('href');
        if ((pageName === '' || pageName === '/' || pageName === 'index.html') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === pageName) {
            link.classList.add('active');
        }
    });
}

/**
 * Adds progressive reveal animations to page sections
 */
function initSectionAnimations() {
    // Get all section elements
    const sections = document.querySelectorAll('.section');
    
    // Create intersection observer to detect when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Set initial styles and observe each section
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });
}

/**
 * Utility function to create and manage a simple typewriter effect
 * Usage: typeText(element, text, speed)
 */
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

/**
 * Example implementation of a dark mode toggle
 * This function can be connected to a button or UI element
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Store user preference
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Check if user has previously enabled dark mode and apply it
 */
function checkDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Export public functions for use in other scripts
export { typeText, toggleDarkMode };