document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            const submitUrl = contactForm.getAttribute("action");

            try {
                // Send the data
                const response = await fetch(submitUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" // Important for services like Formspree
                    },
                    body: JSON.stringify(formData)
                });

                const responseMessage = document.getElementById("responseMessage");
                if (response.ok) {
                    // Assuming a successful submission if response.ok is true
                    // Some services might return JSON, others might not for simple success
                    try {
                        const result = await response.json(); // Try to parse JSON
                        responseMessage.textContent = result.message || "Message sent successfully!";
                    } catch (e) {
                        // If response is not JSON, but still ok (e.g. Formspree redirects or sends simple text)
                        responseMessage.textContent = "Message sent successfully!";
                    }
                    responseMessage.style.color = "green";
                    contactForm.reset(); // Clear the form on success
                } else {
                    // Try to get error message from response
                    const errorResult = await response.json().catch(() => ({ error: "Something went wrong!" }));
                    responseMessage.textContent = errorResult.error || `Error: ${response.statusText}`;
                    responseMessage.style.color = "red";
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                const responseMessage = document.getElementById("responseMessage"); // Fixed: Added declaration
                responseMessage.textContent = "An error occurred, please try again.";
                responseMessage.style.color = "red";
            }
        });
    }

    // Project Modal Functionality
    const projectModalElement = document.getElementById('projectModal');
    if (projectModalElement) {
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalTechnologies = document.getElementById('modalTechnologies');
        const modalDescription = document.getElementById('modalDescription');
        const modalGithubLink = document.getElementById('modalGithubLink');
        const closeButton = projectModalElement.querySelector('.close-button'); // Ensure closeButton is queried within modal

        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                modalTitle.textContent = card.dataset.title;
                modalImage.src = card.dataset.image || 'images/default_project.png'; // Fallback image
                modalImage.alt = card.dataset.title + " image";
                modalTechnologies.textContent = card.dataset.technologies;
                modalDescription.textContent = card.dataset.description;
                
                if (card.dataset.githubLink && card.dataset.githubLink !== "YOUR_STUDYBUD_GITHUB_LINK_HERE" && card.dataset.githubLink !== "YOUR_OCR_GITHUB_LINK_HERE" && card.dataset.githubLink !== "YOUR_QADOCS_GITHUB_LINK_HERE") {
                    modalGithubLink.href = card.dataset.githubLink;
                    modalGithubLink.style.display = 'inline-block';
                } else {
                    modalGithubLink.style.display = 'none';
                }

                projectModalElement.style.display = 'block'; // Show modal when card is clicked
            });
        });

        // Setup close listeners only once, outside the forEach loop
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                projectModalElement.style.display = 'none';
            });
        }
    
        // Close modal when clicking outside of the modal content (setup once)
        window.addEventListener('click', (event) => {
            if (event.target === projectModalElement) {
                projectModalElement.style.display = 'none';
            }
        });
    
        // Optional: Close modal with Escape key (setup once)
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && projectModalElement.style.display === 'block') {
                projectModalElement.style.display = 'none';
            }
        });
    }

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('main');
    // Left Sidebar constants
    const PEEK_AMOUNT_LEFT = 40; 
    const SIDEBAR_WIDTH = 260; 

    if (sidebarToggle && sidebar && mainContent) { // Added null check for mainContent
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarToggle.classList.toggle('open');
            sidebarToggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
            if (window.innerWidth > 768) { // Only adjust main margin on desktop
                // On desktop, main content margin is SIDEBAR_WIDTH when open, PEEK_AMOUNT when closed
                mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : PEEK_AMOUNT_LEFT + 'px';
            } else { // On mobile, main content margin is SIDEBAR_WIDTH when open, 0 when closed
                 mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : '0px';
            }
        });
    }

    // Desktop: Sidebar hover to open/close (Restored)
    if (window.innerWidth > 768 && sidebar && mainContent) {
        sidebar.addEventListener('mouseenter', () => {
            // If sidebar is not already open by button click, expand it on hover
            if (!sidebar.classList.contains('open')) {
                sidebar.classList.add('hover-open'); // Mark as hover-opened
                mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
            } else {
                 // If already open by button, ensure margin is full width
                mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
            }
        });
        sidebar.addEventListener('mouseleave', () => {
            // If it was opened by hover (and not by button click)
            if (sidebar.classList.contains('hover-open')) {
                sidebar.classList.remove('hover-open');
                if (!sidebar.classList.contains('open')) { // Check again if button made it open
                    mainContent.style.marginLeft = PEEK_AMOUNT_LEFT + 'px';
                }
            } else if (!sidebar.classList.contains('open')) {
                // If it was never open (neither by button nor hover), ensure it's peeking
                mainContent.style.marginLeft = PEEK_AMOUNT_LEFT + 'px';
            }
            // If sidebar.classList.contains('open') (opened by button), margin stays wide
        });
    }

    // Adjust main content margin on resize for mobile/desktop views
    const adjustMainContentMargin = () => {
        if (mainContent && sidebar) { // Added null check
            if (window.innerWidth <= 768) {
                mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : '0px';
            } else {
                mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : PEEK_AMOUNT_LEFT + 'px'; // Desktop margin is PEEK_AMOUNT when closed
            }
        }
    }; // Fixed: Added missing semicolon

    // Add resize event listener - Fixed: This was missing
    window.addEventListener('resize', adjustMainContentMargin);
    
    // Initial call to set main content margin correctly on page load
    if (mainContent) adjustMainContentMargin(); // Call the simplified function directly
    
    // Close sidebar when a link is clicked (on mobile)
    const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-links .nav-link'); // Renamed to avoid conflict
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open') && mainContent) { // Added null checks
                sidebar.classList.remove('open');
                if (sidebarToggle) sidebarToggle.classList.remove('open'); // Added null check
                if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'false');
                mainContent.style.marginLeft = '0px';
            }
        });
    });

    // Active link highlighting on scroll
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    sidebarNavLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        const linkTargetPage = linkHref.split("#")[0]; // Get the page name from href (e.g., "projects.html")

        // If the link's target page matches the current page
        if (linkTargetPage === currentPage) {
            if (currentPage !== "index.html" || linkHref === "#home" || linkHref === "index.html#home" || linkHref === "index.html") {
                link.classList.add('active');
            }
        }
    });

    if (currentPage === "index.html") {
        const sections = document.querySelectorAll('main section[id]');
        const homeLink = document.querySelector('.sidebar-nav-links .nav-link[href="#home"]');

        const activateLinkOnScroll = () => {
            let currentSectionId = null;
            let minDistance = Infinity;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150; // Adjusted offset

                // Check if section is in viewport or closest to top
                if (window.scrollY >= sectionTop - section.offsetHeight / 2 && window.scrollY < sectionTop + section.offsetHeight / 2) {
                     currentSectionId = section.getAttribute('id');
                }
                // Fallback for sections not perfectly in view (e.g. for very top or bottom)
                const distanceToTop = Math.abs(window.scrollY - sectionTop);
                if (distanceToTop < minDistance) {
                    minDistance = distanceToTop;
                    if (!currentSectionId) currentSectionId = section.getAttribute('id'); // Tentatively set
                }
            });

            if (window.scrollY < (sections.length > 0 ? sections[0].offsetTop - 150 : window.innerHeight / 2)) {
                 currentSectionId = "home";
            }

            sidebarNavLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', activateLinkOnScroll); // Add scroll listener
        activateLinkOnScroll(); // Initial call
    }

    // New Skills Section Interaction
    const accordionItems = document.querySelectorAll('.skill-accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.skill-accordion-header');
            const content = item.querySelector('.sub-skills-content');

            if (header && content) {
                header.addEventListener('click', () => {
                    // Optional: Close all other open items if you want only one open at a time
                    // accordionItems.forEach(otherItem => {
                    //     if (otherItem !== item) {
                    //         otherItem.classList.remove('open');
                    //         otherItem.querySelector('.sub-skills-content').style.maxHeight = null;
                    //     }
                    // });

                    item.classList.toggle('open');
                    if (item.classList.contains('open')) {
                        // Temporarily remove transition while calculating height to get an accurate scrollHeight
                        const originalTransition = content.style.transition;
                        content.style.transition = 'none';

                        // Set padding before calculating scrollHeight
                        content.style.paddingTop = '20px'; // Match CSS padding
                        content.style.paddingBottom = '20px'; // Match CSS padding

                        // Force a reflow. Accessing offsetHeight is a common way to do this.
                        // This ensures that scrollHeight is calculated after any style changes
                        // (like padding changes due to the .open class) have been applied and rendered.
                        content.offsetHeight; // This line forces the browser to recalculate layout.
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.transition = originalTransition; // Restore transition
                    } else {
                        // When closing:
                        // 1. Remove inline padding styles set during opening, so CSS can take over.
                        content.style.paddingTop = '';
                        content.style.paddingBottom = '';
                        // 2. Set maxHeight to 0px to trigger collapse. CSS handles padding transition.
                        content.style.maxHeight = "0px";
                    }
                });
            }
        });
    }

    // Typing JS (moved from inline script in index.html)
    const typedTextElement = document.getElementById("typed-text");
    if (typedTextElement) {
        const textArray = ["Suraj", "Software Engineer", "Machine Learning Engineer"]; // Corrected "Machine Learning Engineer"
        let textIndex = 0;
        let letterIndex = 0; // Represents the number of characters of currentFullString currently displayed
        let isDeleting = false;

        function type() {
            const currentFullString = textArray[textIndex];
            let typeSpeed;

            if (isDeleting) {
                // Deleting
                typedTextElement.textContent = "I am " + currentFullString.substring(0, letterIndex);
                letterIndex--;
                typeSpeed = 100; // Deleting speed

                if (letterIndex < 0) { // Finished deleting
                    isDeleting = false;
                    letterIndex = 0; // Reset for typing next word
                    textIndex = (textIndex + 1) % textArray.length;
                    typeSpeed = 500; // Pause slightly before starting next word
                }
            } else {
                // Typing
                typedTextElement.textContent = "I am " + currentFullString.substring(0, letterIndex + 1);
                letterIndex++;
                typeSpeed = 150; // Typing speed

                if (letterIndex > currentFullString.length) { // Finished typing current word
                    isDeleting = true;
                    letterIndex = currentFullString.length; // Set letterIndex to start deleting from the end
                    typeSpeed = 1000; // Pause at the end of the word
                }
            }
            setTimeout(type, typeSpeed); // Fixed: Changed from 'typingSpeed' to 'typeSpeed'
        }
        type(); // Start the typing animation
    }

    // Footer Accordion Functionality (Mobile)
    const footerAccordionItems = document.querySelectorAll('#Footer .general, #Footer .important-links-certificates');

    if (footerAccordionItems.length > 0) {
        footerAccordionItems.forEach(item => {
            const header = item.querySelector('.footer-accordion-header');
            const content = item.querySelector('ul');

            if (header && content) {
                console.log("Footer accordion header found for:", item.firstElementChild.textContent.trim()); // Log which header is being processed
                header.addEventListener('click', () => {
                    console.log("Header clicked:", header.textContent.trim(), "Window width:", window.innerWidth);
                    if (window.innerWidth <= 768) { // Only enable accordion on mobile
                        console.log("Mobile view detected for accordion.");
                        
                        item.classList.toggle('open');
                        console.log("Item classList after toggle:", item.classList.toString());

                        if (item.classList.contains('open')) {
                            // OPENING
                            console.log("Attempting to open accordion content.");
                            // Use double requestAnimationFrame to ensure styles (padding) are applied before measuring scrollHeight
                            requestAnimationFrame(() => { // First frame: browser processes style changes from .open class
                                requestAnimationFrame(() => { // Second frame: measure after styles are applied
                                    const currentScrollHeight = content.scrollHeight;
                                    console.log("Calculated scrollHeight for content (rAF):", currentScrollHeight);
                                    if (currentScrollHeight > 0) {
                                        content.style.maxHeight = currentScrollHeight + "px";
                                        console.log("maxHeight set to (rAF):", content.style.maxHeight);
                                    } else {
                                        console.warn("scrollHeight (rAF) is 0 or less. Check content and CSS padding on .open ul.");
                                        // If scrollHeight is still 0, it means the content (li) isn't rendering with height
                                        // or padding isn't effectively applied before measurement.
                                    }
                                });
                            });
                        } else {
                            // CLOSING
                            console.log("Attempting to close accordion content.");
                            // CSS transition will handle collapsing from its current maxHeight to 0
                            // when the .open class is removed and padding is reset by CSS.
                            content.style.maxHeight = "0px";
                            console.log("maxHeight set to 0px for closing.");
                        }
                    }
                });
            }
        });
    }
});
