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
                document.getElementById("responseMessage").textContent = "An error occurred, please try again.";
                responseMessage.style.color = "red";
            }
        });
    }

    // live animation (bgAnimation) - This code is likely redundant due to particles.js
    // and will error if the #bgAnimation element is not in the HTML.
    // Consider removing it if particles.js is your primary background.
    /*
    const bgAnimation = document.getElementById('bgAnimation');
    if (bgAnimation) { // Add a null check
        const numberOfColorBoxes = 400;
        for (let i = 0; i < numberOfColorBoxes; i++) {
            const colorBox = document.createElement('div');
            colorBox.classList.add('colorBox');
            bgAnimation.append(colorBox);
        }
    }
    */

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

                projectModalElement.style.display = 'block';
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                projectModalElement.style.display = 'none';
            });
        }

        // Close modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === projectModalElement) {
                projectModalElement.style.display = 'none';
            }
        });

        // Optional: Close modal with Escape key
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
    const PEEK_AMOUNT = 40; 
    const SIDEBAR_WIDTH = 260; 

    if (sidebarToggle && sidebar && mainContent) { // Added null check for mainContent
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarToggle.classList.toggle('open');
            sidebarToggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
            if (window.innerWidth > 768) { // Only adjust main margin on desktop
                if (sidebar.classList.contains('open')) {
                    mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
                } else {
                    mainContent.style.marginLeft = PEEK_AMOUNT + 'px';
                }
            } else { // On mobile, main content margin is 0 when sidebar is closed
                 mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : '0px';
            }
        });
    }

    // Desktop: Sidebar hover to open/close
    if (window.innerWidth > 768 && sidebar && mainContent) { // Added null check for mainContent
        sidebar.addEventListener('mouseenter', () => {
            if (!sidebar.classList.contains('open')) { // Only trigger if not already opened by button
                 sidebar.classList.add('hover-open'); // Use a different class for hover to distinguish
            }
            mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
        });
        sidebar.addEventListener('mouseleave', () => {
            if (sidebar.classList.contains('hover-open')) {
                sidebar.classList.remove('hover-open');
                 if (!sidebarToggle.classList.contains('open')) { // If button didn't force it open
                    mainContent.style.marginLeft = PEEK_AMOUNT + 'px';
                 }
            } else if (!sidebar.classList.contains('open')) { // If it was never open by button or hover
                mainContent.style.marginLeft = PEEK_AMOUNT + 'px';
            }
            // If sidebar.classList.contains('open') (opened by button), margin stays wide
        });
    }

    // Adjust main content margin on resize for mobile/desktop views
    window.addEventListener('resize', () => {
        if (mainContent && sidebar) { // Added null check
            if (window.innerWidth <= 768) {
                mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : '0px';
            } else {
                mainContent.style.marginLeft = sidebar.classList.contains('open') ? SIDEBAR_WIDTH + 'px' : PEEK_AMOUNT + 'px';
            }
        }
    });
    // Initial call to set margin correctly
    if (mainContent) window.dispatchEvent(new Event('resize'));
    
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

        // If the link's target page matches the current page, and it's not just a hash link on index.html (unless it's the home link)
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
            
            if (window.scrollY < (sections.length > 0 ? sections[0].offsetTop - 150 : window.innerHeight / 2) ) {
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
        window.addEventListener('scroll', activateLinkOnScroll);
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
                    const isOpen = item.classList.contains('open');

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
        const textArray = ["Suraj", "Software Engineer", "Machine Engineer"];
        let textIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        let currentText = "";

        function type() {
            if (!isDeleting) {
                currentText = "I am " + textArray[textIndex].substring(0, letterIndex + 1);
                letterIndex++;
            } else {
                currentText = "I am " + textArray[textIndex].substring(0, letterIndex -1);
                letterIndex--;
            }

            typedTextElement.textContent = currentText;

            if (letterIndex === textArray[textIndex].length + 1 && !isDeleting) { // Adjusted condition
                setTimeout(() => { isDeleting = true; }, 1000);
            }

            if (letterIndex === 0 && isDeleting) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }

            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typingSpeed);
        }
        type(); // Start the typing animation
    }
});