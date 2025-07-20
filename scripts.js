/**
 * ============================================
 * PORTFOLIO WEBSITE - MAIN SCRIPTS
 * ============================================
 * Organized JavaScript for portfolio functionality
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Main Portfolio Application Class
 * Handles all interactive functionality
 */
class PortfolioApp {
    constructor() {
        this.isMobile = () => window.innerWidth <= 768;
        this.currentBackground = 'gradient-stars';
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.initializeComponents();
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.onDOMReady();
        });

        // Window events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Hash change for navigation
        window.addEventListener('hashchange', () => {
            this.updateActiveNavLink();
        });
    }

    /**
     * Handle DOM ready event
     */
    onDOMReady() {
        this.initSidebar();
        this.initAccordions();
        this.initBackgroundSystem();
        this.initContactForm();
        this.initNavigation();
        this.updateMobileOptimizations();
        this.initThemePersistence();
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.updateMobileOptimizations();
        this.updateSidebarHoverEffect();
    }

    /**
     * Handle window scroll
     */
    handleScroll() {
        this.updateActiveNavLink();
        this.updateBreadcrumbs();
    }

    /**
     * ==========================================
     * SIDEBAR FUNCTIONALITY
     * ==========================================
     */

    /**
     * Initialize sidebar functionality
     */
    initSidebar() {
        // Sidebar functionality is now handled by main.js to avoid conflicts
        // Only initialize hover effect here
        this.updateSidebarHoverEffect();
    }

    /**
     * Update sidebar hover effect based on device type
     */
    updateSidebarHoverEffect() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        if (this.isMobile()) {
            sidebar.classList.add('no-hover-effect');
        } else {
            sidebar.classList.remove('no-hover-effect');
        }
    }

    /**
     * ==========================================
     * ACCORDION FUNCTIONALITY
     * ==========================================
     */

    /**
     * Initialize all accordion functionality
     */
    initAccordions() {
        this.initSkillsAccordion();
        this.initFooterAccordion();
    }

    /**
     * Initialize skills accordion
     */
    initSkillsAccordion() {
        const skillAccordionItems = document.querySelectorAll('.skill-accordion-item');
        
        skillAccordionItems.forEach(item => {
            const header = item.querySelector('.skill-accordion-header');
            const content = item.querySelector('.sub-skills-content');
            
            if (!header || !content) return;

            header.addEventListener('click', () => {
                this.toggleAccordion(item, content);
            });

            // Keyboard accessibility
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccordion(item, content);
                }
            });
        });
    }

    /**
     * Initialize footer accordion for mobile
     */
    initFooterAccordion() {
        const footerHeaders = document.querySelectorAll('.footer-accordion-header');
        
        footerHeaders.forEach(header => {
            header.addEventListener('click', () => {
                if (this.isMobile()) {
                    const parent = header.parentElement;
                    const content = parent.querySelector('ul');
                    
                    if (content) {
                        this.toggleAccordion(parent, content);
                    }
                }
            });
        });
    }

    /**
     * Toggle accordion item
     */
    toggleAccordion(item, content) {
        const isOpen = item.classList.toggle('open');
        
        if (isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }

        // Update ARIA attributes
        const header = item.querySelector('.skill-accordion-header, .footer-accordion-header');
        if (header) {
            header.setAttribute('aria-expanded', isOpen.toString());
        }
    }

    /**
     * ==========================================
     * BACKGROUND SYSTEM
     * ==========================================
     */

    /**
     * Initialize background system
     */
    initBackgroundSystem() {
        this.createBackgroundElements();
        this.initBackgroundSwitcher();
        this.createNeuralNetwork();
        
        // Set theme from sessionStorage (persists until page refresh) or localStorage
        const sessionTheme = sessionStorage.getItem('currentTheme');
        const savedBg = sessionTheme || localStorage.getItem('preferredBackground') || 'gradient-stars';
        this.switchBackground(savedBg);
        
        // Listen for theme changes from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentTheme' && e.newValue) {
                this.switchBackground(e.newValue);
            }
        });
    }

    /**
     * Create background elements dynamically
     */
    createBackgroundElements() {
        // Only create if they don't exist
        this.createElementIfNotExists('wave-bg', () => {
            const container = document.createElement('div');
            container.className = 'wave-bg';
            container.id = 'wave-bg';
            
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'wave';
                container.appendChild(wave);
            }
            
            return container;
        });

        this.createElementIfNotExists('dots-bg', () => {
            const container = document.createElement('div');
            container.className = 'dots-bg';
            container.id = 'dots-bg';
            return container;
        });

        this.createElementIfNotExists('neural-bg', () => {
            const container = document.createElement('div');
            container.className = 'neural-bg';
            container.id = 'neural-bg';
            return container;
        });
    }

    /**
     * Create element if it doesn't exist
     */
    createElementIfNotExists(id, createElement) {
        if (!document.getElementById(id)) {
            const element = createElement();
            document.body.appendChild(element);
        }
    }

    /**
     * Initialize background switcher
     */
    initBackgroundSwitcher() {
        // Check if background switcher already exists
        if (document.querySelector('.bg-switcher')) return;

        const bgSwitcher = document.createElement('div');
        bgSwitcher.className = 'bg-switcher';
        
        const backgrounds = [
            { name: 'Gradient', type: 'gradient-animation' },
            { name: 'Stars', type: 'gradient-stars' },
            { name: 'Shapes', type: 'geometric-bg' },
            { name: 'Waves', type: 'wave-bg' },
            { name: 'Dots', type: 'dots-bg' },
            { name: 'Neural', type: 'neural-bg' },
            { name: 'Ghibli', type: 'ghibli-bg' },
            { name: 'Space', type: 'space-bg' },
            { name: 'City', type: 'city-bg' },
            { name: 'Peace', type: 'peace-bg' },
            { name: 'Anime', type: 'anime-bg' }
        ];
        
        backgrounds.forEach(bg => {
            const btn = document.createElement('button');
            btn.className = 'switch-btn';
            btn.textContent = bg.name;
            btn.setAttribute('data-bg', bg.type);
            btn.setAttribute('aria-label', `Switch to ${bg.name} background`);
            
            btn.addEventListener('click', () => {
                this.switchBackground(bg.type);
            });
            
            bgSwitcher.appendChild(btn);
        });
        
        document.body.appendChild(bgSwitcher);
    }

    /**
     * Switch background theme
     */
    switchBackground(type) {
        try {
            // Hide all backgrounds
            const backgrounds = document.querySelectorAll('[id$="-bg"], .flashlight-bg, .cyberpunk-bg, .ghibli-bg, .space-bg, .city-bg, .peace-bg, .anime-bg');
            backgrounds.forEach(bg => {
                bg.style.display = 'none';
                bg.classList.remove('active-bg');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.bg-option, .switch-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Activate selected background
            const targetBg = document.getElementById(type);
            if (targetBg) {
                targetBg.style.display = 'block';
                targetBg.classList.add('active-bg');
            }
            
            const targetBtn = document.querySelector(`[data-bg="${type}"]`);
            if (targetBtn) {
                targetBtn.classList.add('active');
            }
            
            // Handle special cases
            if (type === 'cyberpunk' && window.initCyberpunk) {
                window.initCyberpunk();
            }
            
            // Save preference for current session (until refresh)
            this.currentBackground = type;
            sessionStorage.setItem('currentTheme', type);
            localStorage.setItem('preferredBackground', type);
            
            // Broadcast theme change to other tabs/pages
            localStorage.setItem('currentTheme', type);
            
        } catch (error) {
            console.warn('Background switching error:', error);
        }
    }

    /**
     * Create neural network background
     */
    createNeuralNetwork() {
        const neural = document.getElementById('neural-bg');
        if (!neural) return;
        
        // Clear existing content
        neural.innerHTML = '';
        
        const nodeCount = 15;
        const nodes = [];

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = Math.random() * 2 + 's';
            neural.appendChild(node);
            nodes.push(node);
        }

        // Create connections
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                if (Math.random() < 0.3) { // 30% chance of connection
                    const line = document.createElement('div');
                    line.className = 'neural-line';
                    
                    const node1 = nodes[i];
                    const node2 = nodes[j];
                    
                    const x1 = parseFloat(node1.style.left);
                    const y1 = parseFloat(node1.style.top);
                    const x2 = parseFloat(node2.style.left);
                    const y2 = parseFloat(node2.style.top);
                    
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    line.style.width = distance + 'vw';
                    line.style.left = x1 + '%';
                    line.style.top = y1 + '%';
                    line.style.transformOrigin = '0 0';
                    line.style.transform = `rotate(${angle}deg)`;
                    line.style.animationDelay = Math.random() * 3 + 's';
                    
                    neural.appendChild(line);
                }
            }
        }
    }

    /**
     * ==========================================
     * CONTACT FORM FUNCTIONALITY
     * ==========================================
     */

    /**
     * Initialize contact form
     */
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const responseMessage = document.getElementById('responseMessage');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            this.handleContactSubmission(e, contactForm, responseMessage);
        });
    }

    /**
     * Handle contact form submission
     */
    async handleContactSubmission(e, form, messageElement) {
        e.preventDefault();
        
        if (!messageElement) return;

        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.ok) {
                this.showMessage(messageElement, "Thank you for your message! I'll get back to you soon.", 'success');
                form.reset();
            } else {
                this.showMessage(messageElement, "Oops! There was a problem submitting your form.", 'error');
            }
            
        } catch (error) {
            this.showMessage(messageElement, "Oops! There was a problem submitting your form.", 'error');
            console.error('Contact form error:', error);
        }
    }

    /**
     * Show message with styling
     */
    showMessage(element, message, type) {
        element.textContent = message;
        element.style.color = type === 'success' ? '#4ecdc4' : '#ff6b6b';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.textContent = '';
        }, 5000);
    }

    /**
     * ==========================================
     * NAVIGATION FUNCTIONALITY
     * ==========================================
     */

    /**
     * Initialize navigation
     */
    initNavigation() {
        this.updateActiveNavLink();
        this.updateBreadcrumbs();
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.sidebar-nav-links .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        // Handle section-based navigation for index page
        if (currentPath === 'index.html' || currentPath === '') {
            const currentSection = this.getCurrentSection();
            
            if (currentSection) {
                const activeLink = document.querySelector(`.sidebar-nav-links .nav-link[href="#${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        } else {
            // Handle page-based navigation
            const activeLink = document.querySelector(`.sidebar-nav-links .nav-link[href="${currentPath}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        }
    }

    /**
     * Get current section based on scroll position
     */
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.pageYOffset;
            const sectionHeight = rect.height;
            
            if (window.pageYOffset >= sectionTop - 100 && 
                window.pageYOffset < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        return currentSection || 'home'; // Default to home if no section detected
    }

    /**
     * Update breadcrumbs
     */
    updateBreadcrumbs() {
        const breadcrumbs = document.querySelector('.breadcrumbs');
        if (!breadcrumbs) return;
        
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Clear existing breadcrumbs
        breadcrumbs.innerHTML = '';
        
        // Create home link
        const homeLink = this.createBreadcrumbLink('index.html', 'Home');
        breadcrumbs.appendChild(homeLink);
        
        // Add current page or section
        if (currentPath !== 'index.html' && currentPath !== '') {
            this.addBreadcrumbSeparator(breadcrumbs);
            const pageName = this.formatPageName(currentPath.replace('.html', ''));
            const currentPageSpan = this.createBreadcrumbSpan(pageName, 'current-page');
            breadcrumbs.appendChild(currentPageSpan);
        } else {
            // On home page, show current section
            const currentSection = this.getCurrentSection();
            if (currentSection && currentSection !== 'home') {
                this.addBreadcrumbSeparator(breadcrumbs);
                const sectionName = this.formatPageName(currentSection);
                const sectionSpan = this.createBreadcrumbSpan(sectionName, 'current-page');
                breadcrumbs.appendChild(sectionSpan);
            }
        }
    }

    /**
     * Create breadcrumb link element
     */
    createBreadcrumbLink(href, text) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = text;
        return link;
    }

    /**
     * Create breadcrumb span element
     */
    createBreadcrumbSpan(text, className) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text;
        return span;
    }

    /**
     * Add breadcrumb separator
     */
    addBreadcrumbSeparator(container) {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = ' / ';
        container.appendChild(separator);
    }

    /**
     * Format page/section name for display
     */
    formatPageName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    /**
     * ==========================================
     * MOBILE OPTIMIZATIONS
     * ==========================================
     */

    /**
     * Update mobile-specific optimizations
     */
    updateMobileOptimizations() {
        this.updateSidebarHoverEffect();
        this.optimizeBackgroundsForMobile();
    }

    /**
     * Optimize backgrounds for mobile performance
     */
    optimizeBackgroundsForMobile() {
        if (this.isMobile()) {
            // Disable complex backgrounds on mobile
            const complexBackgrounds = ['neural-bg', 'cyberpunk-bg'];
            
            if (complexBackgrounds.includes(this.currentBackground)) {
                this.switchBackground('gradient-stars');
            }
            
            // Hide complex background options
            const complexButtons = document.querySelectorAll('[data-bg="neural-bg"], [data-bg="cyberpunk-bg"]');
            complexButtons.forEach(btn => {
                btn.style.display = 'none';
            });
        } else {
            // Show all background options on desktop
            const allButtons = document.querySelectorAll('[data-bg]');
            allButtons.forEach(btn => {
                btn.style.display = 'block';
            });
        }
    }

    /**
     * ==========================================
     * THEME PERSISTENCE
     * ==========================================
     */

    /**
     * Initialize theme persistence across pages
     */
    initThemePersistence() {
        // Check for theme from current session
        const currentTheme = sessionStorage.getItem('currentTheme');
        if (currentTheme) {
            this.switchBackground(currentTheme);
        }
        
        // Listen for theme changes from other pages/tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentTheme' && e.newValue) {
                this.switchBackground(e.newValue);
            }
        });
        
        // Clear session theme on page refresh (F5, Ctrl+R)
        window.addEventListener('beforeunload', () => {
            // Only clear if it's a refresh, not navigation
            if (performance.navigation.type === 1) {
                sessionStorage.removeItem('currentTheme');
            }
        });
    }

    /**
     * ==========================================
     * COMPONENT INITIALIZATION
     * ==========================================
     */

    /**
     * Initialize all components
     */
    initializeComponents() {
        this.initializeProgressBars();
        this.initializeLazyLoading();
    }

    /**
     * Initialize progress bar animations
     */
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    /**
     * Initialize lazy loading for images
     */
    initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if (!window.IntersectionObserver) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * ==========================================
 * UTILITY FUNCTIONS
 * ==========================================
 */

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ==========================================
 * APPLICATION INITIALIZATION
 * ==========================================
 */

// Initialize the portfolio application
const portfolioApp = new PortfolioApp();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio App Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    });
}