// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            sidebarToggle.classList.toggle('open');
            sidebarToggle.setAttribute('aria-expanded', 
                sidebarToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }

    // Mobile detection for sidebar hover effect
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Disable hover effect on mobile
    function updateSidebarHoverEffect() {
        if (sidebar) {
            if (isMobile()) {
                sidebar.classList.add('no-hover-effect');
            } else {
                sidebar.classList.remove('no-hover-effect');
            }
        }
    }

    // Initial call and add resize listener
    updateSidebarHoverEffect();
    window.addEventListener('resize', updateSidebarHoverEffect);

    // Skills accordion functionality
    const skillAccordionItems = document.querySelectorAll('.skill-accordion-item');
    
    if (skillAccordionItems.length > 0) {
        skillAccordionItems.forEach(item => {
            const header = item.querySelector('.skill-accordion-header');
            const content = item.querySelector('.sub-skills-content');
            
            header.addEventListener('click', () => {
                // Toggle current item
                const isOpen = item.classList.toggle('open');
                
                // Set appropriate max-height
                if (isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        });
    }

    // Footer accordion for mobile
    const footerAccordionHeaders = document.querySelectorAll('.footer-accordion-header');
    
    if (footerAccordionHeaders.length > 0) {
        footerAccordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    const parent = this.parentElement;
                    const content = parent.querySelector('ul');
                    
                    // Toggle current item
                    const isOpen = parent.classList.toggle('open');
                    
                    // Set appropriate max-height
                    if (isOpen) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    } else {
                        content.style.maxHeight = '0';
                    }
                }
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form data to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    responseMessage.textContent = "Thank you for your message! I'll get back to you soon.";
                    responseMessage.style.color = "#4ecdc4";
                    contactForm.reset();
                } else {
                    responseMessage.textContent = "Oops! There was a problem submitting your form.";
                    responseMessage.style.color = "#ff6b6b";
                }
            })
            .catch(error => {
                responseMessage.textContent = "Oops! There was a problem submitting your form.";
                responseMessage.style.color = "#ff6b6b";
                console.error('Error:', error);
            });
        });
    }

    // Initialize Neural Network Background
    function createNeuralNetwork() {
        const neural = document.querySelector('.neural-bg');
        if (!neural) return;
        
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

    // Background switcher functionality
    function switchBackground(type) {
        // Hide all backgrounds
        document.querySelector('.gradient-animation').classList.remove('active-bg');
        document.querySelector('.gradient-stars').classList.remove('active-bg');
        document.querySelector('.geometric-bg').classList.remove('active-bg');
        document.querySelector('.wave-bg').classList.remove('active-bg');
        document.querySelector('.dots-bg').classList.remove('active-bg');
        document.querySelector('.neural-bg').classList.remove('active-bg');
        
        // Remove active class from all buttons
        document.querySelectorAll('.switch-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activate selected background
        document.querySelector('.' + type).classList.add('active-bg');
        document.querySelector('[data-bg="' + type + '"]').classList.add('active');
        
        // Save preference to localStorage
        localStorage.setItem('preferredBackground', type);
    }

    // Add background switcher buttons
    function addBackgroundSwitcher() {
        // Create background switcher container
        const bgSwitcher = document.createElement('div');
        bgSwitcher.className = 'bg-switcher';
        
        // Create buttons
        const buttons = [
            { name: 'Gradient', type: 'gradient-animation' },
            { name: 'Stars', type: 'gradient-stars' },
            { name: 'Shapes', type: 'geometric-bg' },
            { name: 'Waves', type: 'wave-bg' },
            { name: 'Dots', type: 'dots-bg' },
            { name: 'Neural', type: 'neural-bg' }
        ];
        
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'switch-btn';
            btn.textContent = button.name;
            btn.setAttribute('data-bg', button.type);
            btn.addEventListener('click', () => switchBackground(button.type));
            bgSwitcher.appendChild(btn);
        });
        
        // Add to body
        document.body.appendChild(bgSwitcher);
    }

    // Initialize background effects
    function initBackgroundEffects() {
        // Create wave background if it doesn't exist
        if (!document.querySelector('.wave-bg')) {
            const waveContainer = document.createElement('div');
            waveContainer.className = 'wave-bg';
            
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'wave';
                waveContainer.appendChild(wave);
            }
            
            document.querySelector('.gradient-bg').appendChild(waveContainer);
        }
        
        // Create dots background if it doesn't exist
        if (!document.querySelector('.dots-bg')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'dots-bg';
            document.querySelector('.gradient-bg').appendChild(dotsContainer);
        }
        
        // Create neural background if it doesn't exist
        if (!document.querySelector('.neural-bg')) {
            const neuralContainer = document.createElement('div');
            neuralContainer.className = 'neural-bg';
            document.querySelector('.gradient-bg').appendChild(neuralContainer);
            createNeuralNetwork();
        }
        
        // Add background switcher
        addBackgroundSwitcher();
        
        // Set default or saved background
        const savedBg = localStorage.getItem('preferredBackground') || 'gradient-stars';
        switchBackground(savedBg);
    }
    
    // Initialize background effects
    initBackgroundEffects();
});
// Update active navigation link based on current page or section
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.sidebar-nav-links .nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // First, remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // For index.html, handle section-based navigation
    if (currentPath === 'index.html' || currentPath === '') {
        // Get current section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Set active class for current section
        if (currentSection) {
            const activeLink = document.querySelector(`.sidebar-nav-links .nav-link[href="#${currentSection}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    } else {
        // For other pages, highlight based on current page
        const activeLink = document.querySelector(`.sidebar-nav-links .nav-link[href="${currentPath}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

// Update breadcrumbs based on current page
function updateBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;
    
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Clear existing breadcrumbs
    breadcrumbs.innerHTML = '';
    
    // Always add Home link
    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.textContent = 'Home';
    breadcrumbs.appendChild(homeLink);
    
    // If not on home page, add current page
    if (currentPath !== 'index.html' && currentPath !== '') {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = ' / ';
        breadcrumbs.appendChild(separator);
        
        const pageName = currentPath.replace('.html', '');
        const currentPageSpan = document.createElement('span');
        currentPageSpan.className = 'current-page';
        currentPageSpan.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        breadcrumbs.appendChild(currentPageSpan);
    } else {
        // On home page, check for active section
        const activeSection = document.querySelector('section[id].active');
        if (activeSection) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = ' / ';
            breadcrumbs.appendChild(separator);
            
            const sectionName = activeSection.getAttribute('id');
            const sectionSpan = document.createElement('span');
            sectionSpan.className = 'current-page';
            sectionSpan.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
            breadcrumbs.appendChild(sectionSpan);
        }
    }
}

// Initialize navigation enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initial update
    updateActiveNavLink();
    updateBreadcrumbs();
    
    // Update on scroll for section-based navigation
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateBreadcrumbs();
    });
});