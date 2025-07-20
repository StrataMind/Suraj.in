"use strict";

/**
 * Portfolio App - Main JavaScript Module
 * Handles all interactive functionality for the portfolio website
 */
class PortfolioApp {
  constructor() {
    this.backgroundsInitialized = new Set();
    this.intersectionObserver = null;
    this.currentTheme = 'dark';
    this.typingTexts = [
      'ML Engineer & AI Solutions Developer',
      'Building Intelligent Systems',
      'Deep Learning Enthusiast',
      'Data Science Professional',
      'AI Research Passionate'
    ];
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.handlePageLoad();
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // DOM Content Loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.onDOMReady();
    });

    // Window events
    window.addEventListener("resize", () => {
      this.handleResize();
    });

    window.addEventListener("load", () => {
      this.handleWindowLoad();
    });

    // Error handling for external resources
    window.addEventListener("error", (e) => {
      this.handleResourceError(e);
    });
  }

  /**
   * Handle DOM ready event
   */
  onDOMReady() {
    this.generateSocialLinks();
    this.setupNavigation();
    this.setupAccordions();
    this.setupBackgroundSwitcher();
    this.optimizeForMobile();
    this.setupLazyLoading();
    this.setupThemeToggle();
    this.setupScrollProgress();
    this.initTypingAnimation();
    this.createParticleSystem();
    this.enhanceProjectCards();
    this.initScrollAnimations();
    this.enhanceSkillBars();
  }

  /**
   * Handle page load completion
   */
  handlePageLoad() {
    // Initialize loading rain effects
    this.initLoadingRain();

    // Hide loader after content loads and animations complete
    setTimeout(() => {
      const loader = document.getElementById("page-loader");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }
    }, 4000);
  }

  /**
   * Handle resource loading errors
   */
  handleResourceError(event) {
    const target = event.target;
    
    if (target.tagName === 'IMG') {
      // Fallback for broken images
      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMCAxNkMyMC41NTIzIDE2IDIxIDE1LjU1MjMgMjEgMTVDMjEgMTQuNDQ3NyAyMC41NTIzIDE0IDIwIDE0QzE5LjQ0NzcgMTQgMTkgMTQuNDQ3NyAxOSAxNUMxOSAxNS41NTIzIDE5LjQ0NzcgMTYgMjAgMTZaIiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yNiAyNkwyMCAyMEwxNCAyNkgyNloiIGZpbGw9IiM5Y2EzYWYiLz4KPC9zdmc+';
      target.alt = 'Image not available';
    } else if (target.tagName === 'SCRIPT') {
      console.warn('Script failed to load:', target.src);
    } else if (target.tagName === 'LINK') {
      console.warn('Stylesheet failed to load:', target.href);
    }
  }

  /**
   * Setup lazy loading for background animations
   */
  setupLazyLoading() {
    const backgroundElements = document.querySelectorAll('[id$="-bg"], .bg-option');
    
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.bg) {
            this.lazyInitBackground(entry.target.dataset.bg);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe background switcher options for lazy initialization
    document.querySelectorAll('.bg-option').forEach((option) => {
      this.intersectionObserver.observe(option);
    });
  }

  /**
   * Lazy initialize background animations
   */
  lazyInitBackground(bgType) {
    if (this.backgroundsInitialized.has(bgType)) return;

    switch (bgType) {
      case 'cyberpunk':
        this.initCyberpunk();
        break;
      case 'ghibli':
        this.initGhibli();
        break;
      case 'space':
        this.initSpace();
        break;
      case 'city':
        this.initCity();
        break;
      case 'peace':
        this.initPeace();
        break;
      case 'anime':
        this.initAnime();
        break;
      case 'neural':
        this.initNeural();
        break;
      case 'minimal':
        this.initMinimal();
        break;
      case 'dataviz':
        this.initDataViz();
        break;
    }

    this.backgroundsInitialized.add(bgType);
  }

  /**
   * Initialize loading screen rain effects
   */
  initLoadingRain() {
    this.createLoadingRaindrops();
    this.createLoadingPuddles();
  }

  /**
   * Create raindrops for loading screen
   */
  createLoadingRaindrops() {
    const container = document.getElementById("loading-raindrops");
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const drop = document.createElement("div");
      drop.className = "loading-raindrop";
      drop.style.left = Math.random() * 100 + "%";
      drop.style.animationDelay = Math.random() * 1.5 + "s";
      drop.style.animationDuration = Math.random() * 0.5 + 1 + "s";
      container.appendChild(drop);
    }
  }

  /**
   * Create puddles with ripples for loading screen
   */
  createLoadingPuddles() {
    const container = document.getElementById("loading-puddles");
    if (!container) return;

    for (let i = 0; i < 3; i++) {
      const puddle = document.createElement("div");
      puddle.className = "loading-puddle";
      puddle.style.left = Math.random() * 80 + 10 + "%";
      puddle.style.width = Math.random() * 40 + 60 + "px";

      // Add ripples to puddle
      for (let j = 0; j < 2; j++) {
        const ripple = document.createElement("div");
        ripple.className = "loading-ripple";
        ripple.style.animationDelay = j * 1 + Math.random() * 2 + "s";
        puddle.appendChild(ripple);
      }

      container.appendChild(puddle);
    }
  }

  /**
   * Handle window load event
   */
  handleWindowLoad() {
    // Initialize background - restore from localStorage or use default
    const savedBackground = localStorage.getItem('selectedBackground') || 'flashlight';
    console.log(`PortfolioApp: Loading saved background "${savedBackground}" from localStorage`);
    
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
      this.switchBackground(savedBackground);
    }, 100);
  }

  /**
   * Handle window resize
   */
  handleResize() {
    this.optimizeForMobile();
  }

  /**
   * Generate social links dynamically
   */
  generateSocialLinks() {
    const socialTrack = document.getElementById("socialTrack");
    if (!socialTrack) return;

    const socialLinks = [
      {
        href: "https://drive.google.com/file/d/1XixBxAh00Y827PAbBQPIwGz7wXCSDcej/view?usp=drive_link",
        img: "images/resume-icon.png",
        alt: "Resume",
        label: "Resume",
      },
      {
        href: "https://www.linkedin.com/in/suraj-singh-96b45220a/",
        img: "images/linkedin.png",
        alt: "LinkedIn",
        label: "LinkedIn",
      },
      {
        href: "https://www.kaggle.com/surajnitk2021",
        img: "images/kaggle-icon.png",
        alt: "Kaggle",
        label: "Kaggle",
      },
      {
        href: "https://x.com/SurajSinghNITK",
        img: "images/twitter-icon.png",
        alt: "Twitter",
        label: "Twitter",
      },
      {
        href: "https://github.com/surajsk2003",
        img: "images/github.png",
        alt: "GitHub",
        label: "GitHub",
      },
    ];

    // Generate HTML for social links (duplicate for seamless scrolling)
    const generateLinks = (links) => {
      return links
        .map(
          (link) => `
            <a href="${link.href}" target="_blank" rel="noopener" title="${link.label}">
                <img src="${link.img}" alt="${link.alt}" loading="lazy" onerror="this.style.display='none'">
                <span class="social-label">${link.label}</span>
            </a>
        `
        )
        .join("");
    };

    socialTrack.innerHTML =
      generateLinks(socialLinks) + generateLinks(socialLinks);
  }

  /**
   * Setup navigation functionality
   */
  setupNavigation() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (sidebarToggle && sidebar) {
      // Remove any existing event listeners
      sidebarToggle.removeEventListener("click", this.handleSidebarToggle);
      
      // Create a bound handler for proper removal
      this.handleSidebarToggle = (e) => {
        e.stopPropagation();
        const isOpen = sidebar.classList.toggle("open");
        sidebarToggle.classList.toggle("active", isOpen);
        sidebarToggle.setAttribute("aria-expanded", isOpen);
      };
      
      sidebarToggle.addEventListener("click", this.handleSidebarToggle);
      
      // Close sidebar when clicking outside
      document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          if (sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            sidebarToggle.classList.remove("active");
            sidebarToggle.setAttribute("aria-expanded", "false");
          }
        }
      });
      
      // Close sidebar on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("open")) {
          sidebar.classList.remove("open");
          sidebarToggle.classList.remove("active");
          sidebarToggle.setAttribute("aria-expanded", "false");
          sidebarToggle.focus(); // Return focus to toggle button
        }
      });
    }

    // Active navigation highlighting
    this.updateActiveNavigation();
    window.addEventListener("hashchange", () => {
      this.updateActiveNavigation();
    });
  }

  /**
   * Update active navigation state
   */
  updateActiveNavigation() {
    const currentHash = window.location.hash || "#home";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive =
        href === currentHash ||
        (currentHash === "#home" && href === "#home");

      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * Setup accordion functionality for skills
   */
  setupAccordions() {
    const accordionHeaders = document.querySelectorAll(
      ".skill-accordion-header"
    );

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        this.toggleAccordion(header);
      });

      // Keyboard support
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleAccordion(header);
        }
      });
    });

    // Footer accordions for mobile
    this.setupFooterAccordions();
  }

  /**
   * Toggle accordion item
   */
  toggleAccordion(header) {
    const item = header.parentElement;
    const content = header.nextElementSibling;
    const isOpen = item.classList.contains("open");

    // Toggle state
    item.classList.toggle("open");
    header.setAttribute("aria-expanded", !isOpen);

    // Animate content
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0";
    }
  }

  /**
   * Setup footer accordions for mobile
   */
  setupFooterAccordions() {
    const footerHeaders = document.querySelectorAll(
      ".footer-accordion-header"
    );

    footerHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          const section = header.parentElement;
          const content = section.querySelector("ul");

          section.classList.toggle("open");

          if (section.classList.contains("open")) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            content.style.maxHeight = "0";
          }
        }
      });
    });
  }

  /**
   * Setup background switcher functionality with keyboard navigation
   */
  setupBackgroundSwitcher() {
    const bgMenuButton = document.getElementById("bgMenuButton");
    const bgDropdown = document.getElementById("bgDropdown");
    const bgOptions = document.querySelectorAll(".bg-option");

    if (!bgMenuButton || !bgDropdown) return;

    // Toggle dropdown
    bgMenuButton.addEventListener("click", () => {
      const isOpen = bgDropdown.classList.toggle("show");
      bgMenuButton.setAttribute("aria-expanded", isOpen);
      bgDropdown.setAttribute("aria-hidden", !isOpen);
      
      if (isOpen) {
        // Focus first option when opened
        const firstOption = bgDropdown.querySelector('.bg-option');
        if (firstOption) firstOption.focus();
      }
    });

    // Keyboard navigation for background switcher
    bgMenuButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        bgMenuButton.click();
      } else if (e.key === "ArrowDown" && bgDropdown.classList.contains("show")) {
        e.preventDefault();
        const firstOption = bgDropdown.querySelector('.bg-option');
        if (firstOption) firstOption.focus();
      }
    });

    // Keyboard navigation within dropdown
    bgOptions.forEach((option, index) => {
      option.setAttribute('tabindex', '0');
      
      option.addEventListener("keydown", (e) => {
        const options = Array.from(bgOptions);
        
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            const nextIndex = (index + 1) % options.length;
            options[nextIndex].focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            const prevIndex = (index - 1 + options.length) % options.length;
            options[prevIndex].focus();
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            option.click();
            break;
          case "Escape":
            e.preventDefault();
            this.closeBackgroundDropdown();
            bgMenuButton.focus();
            break;
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !bgMenuButton.contains(event.target) &&
        !bgDropdown.contains(event.target)
      ) {
        this.closeBackgroundDropdown();
      }
    });

    // Background switching
    bgOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const bgType = option.getAttribute("data-bg");
        this.switchBackground(bgType);
        this.closeBackgroundDropdown();
        bgMenuButton.focus(); // Return focus to button
      });
    });
  }

  /**
   * Close background dropdown
   */
  closeBackgroundDropdown() {
    const bgMenuButton = document.getElementById("bgMenuButton");
    const bgDropdown = document.getElementById("bgDropdown");
    
    if (bgDropdown && bgMenuButton) {
      bgDropdown.classList.remove("show");
      bgMenuButton.setAttribute("aria-expanded", "false");
      bgDropdown.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Switch background theme
   */
  switchBackground(type) {
    console.log(`PortfolioApp: Switching background to "${type}"`);
    
    const backgrounds = [
      "flashlight",
      "cyberpunk",
      "ghibli",
      "space",
      "city",
      "peace",
      "anime",
      "neural",
      "minimal",
      "dataviz",
    ];

    // Validate the background type
    if (!backgrounds.includes(type)) {
      console.error(`PortfolioApp: Invalid background type "${type}". Using flashlight as fallback.`);
      type = "flashlight";
    }

    // Remove active class from all backgrounds
    backgrounds.forEach((bg) => {
      const element = document.getElementById(bg);
      if (element) {
        element.classList.remove("active-bg");
      }
    });

    // Remove active class from all options
    document.querySelectorAll(".bg-option").forEach((option) => {
      option.classList.remove("active");
    });

    // Activate selected background
    const selectedBg = document.getElementById(type);
    const selectedOption = document.querySelector(
      `.bg-option[data-bg="${type}"]`
    );

    if (selectedBg) {
      selectedBg.classList.add("active-bg");

      // Lazy initialize backgrounds if selected
      this.lazyInitBackground(type);
    }

    if (selectedOption) {
      selectedOption.classList.add("active");
    }

    // Save the selected background to localStorage for persistence across pages
    localStorage.setItem('selectedBackground', type);
  }

  /**
   * Optimize experience for mobile devices
   */
  optimizeForMobile() {
    // Mobile-specific optimizations can be added here
    if (window.innerWidth <= 768) {
      // Reduce animation intensity on mobile
      document.body.classList.add('mobile-optimized');
    } else {
      document.body.classList.remove('mobile-optimized');
    }
  }

  /**
   * Initialize cyberpunk background
   */
  initCyberpunk() {
    const cyberpunkBg = document.getElementById("cyberpunk");
    if (cyberpunkBg && cyberpunkBg.classList.contains("initialized")) return;

    try {
      this.createParticles();
      this.createCodeRain();
      this.createOrbs();
      this.createShapes();
      this.createPulses();
      this.createDataStreams();

      if (cyberpunkBg) cyberpunkBg.classList.add("initialized");
    } catch (error) {
      console.warn('Error initializing cyberpunk background:', error);
    }
  }

  createParticles() {
    const container = document.querySelector("#cyberpunk #particles");
    if (!container) return;
    
    container.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 3 + 5 + "s";
      container.appendChild(particle);
    }
  }

  createCodeRain() {
    const container = document.querySelector("#cyberpunk #codeRain");
    if (!container) return;
    
    container.innerHTML = "";
    const codeChars = "01アイウエオabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++) {
      const codeString = document.createElement("div");
      codeString.className = "code-rain";
      codeString.style.left = Math.random() * window.innerWidth + "px";
      codeString.style.animationDelay = Math.random() * 10 + "s";
      codeString.style.animationDuration = Math.random() * 5 + 8 + "s";

      let text = "";
      for (let j = 0; j < 15; j++) {
        text +=
          codeChars[Math.floor(Math.random() * codeChars.length)] +
          "<br>";
      }
      codeString.innerHTML = text;
      container.appendChild(codeString);
    }
  }

  createOrbs() {
    const container = document.querySelector("#cyberpunk #orbs");
    if (!container) return;
    
    container.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement("div");
      orb.className = "orb";
      orb.style.width = Math.random() * 80 + 40 + "px";
      orb.style.height = orb.style.width;
      orb.style.left = Math.random() * window.innerWidth + "px";
      orb.style.top = Math.random() * window.innerHeight + "px";
      orb.style.animationDelay = Math.random() * 15 + "s";
      container.appendChild(orb);
    }
  }

  createShapes() {
    const container = document.querySelector("#cyberpunk #shapes");
    if (!container) return;
    
    container.innerHTML = "";
    const shapeTypes = ["triangle", "square", "circle"];

    for (let i = 0; i < 6; i++) {
      const shape = document.createElement("div");
      shape.className =
        "shape " +
        shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.style.left = Math.random() * window.innerWidth + "px";
      shape.style.top = Math.random() * window.innerHeight + "px";
      shape.style.animationDelay = Math.random() * 20 + "s";
      container.appendChild(shape);
    }
  }

  createPulses() {
    const container = document.querySelector("#cyberpunk #pulses");
    if (!container) return;
    
    container.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      const pulse = document.createElement("div");
      pulse.className = "pulse";
      pulse.style.left = Math.random() * window.innerWidth + "px";
      pulse.style.top = Math.random() * window.innerHeight + "px";
      pulse.style.animationDelay = Math.random() * 3 + "s";
      container.appendChild(pulse);
    }
  }

  createDataStreams() {
    const container = document.querySelector("#cyberpunk #dataStreams");
    if (!container) return;
    
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const stream = document.createElement("div");
      stream.className = "data-stream";
      stream.style.left = Math.random() * window.innerWidth + "px";
      stream.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(stream);
    }
  }

  /**
   * Initialize Ghibli background
   */
  initGhibli() {
    try {
      if (window.initGhibli) {
        window.initGhibli();
      }
    } catch (error) {
      console.warn('Error initializing Ghibli background:', error);
    }
  }

  /**
   * Initialize Space background
   */
  initSpace() {
    try {
      if (window.initSpace) {
        window.initSpace();
      }
    } catch (error) {
      console.warn('Error initializing Space background:', error);
    }
  }

  /**
   * Initialize City background
   */
  initCity() {
    try {
      if (window.initCity) {
        window.initCity();
      }
    } catch (error) {
      console.warn('Error initializing City background:', error);
    }
  }

  /**
   * Initialize Peace background
   */
  initPeace() {
    try {
      if (window.initPeace) {
        window.initPeace();
      }
    } catch (error) {
      console.warn('Error initializing Peace background:', error);
    }
  }

  /**
   * Initialize Anime background
   */
  initAnime() {
    try {
      if (window.initAnime) {
        window.initAnime();
      }
    } catch (error) {
      console.warn('Error initializing Anime background:', error);
    }
  }

  /**
   * Initialize other components
   */
  initializeComponents() {
    this.initializeProgressBars();
  }

  /**
   * Initialize progress bar animations
   */
  initializeProgressBars() {
    const progressBars = document.querySelectorAll(".progress-bar");

    // Intersection Observer for progress bar animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.5 }
    );

    progressBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  /**
   * Setup theme toggle functionality
   */
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    });
  }

  /**
   * Set the current theme
   */
  setTheme(theme) {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
      root.classList.add('light-theme');
      themeToggle.classList.remove('dark-mode');
      themeToggle.classList.add('light-mode');
    } else {
      root.classList.remove('light-theme');
      themeToggle.classList.remove('light-mode');
      themeToggle.classList.add('dark-mode');
    }
    
    this.currentTheme = theme;
  }

  /**
   * Setup scroll progress indicator
   */
  setupScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      scrollProgress.style.width = Math.min(progress, 100) + '%';
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
  }

  /**
   * Initialize typing animation
   */
  initTypingAnimation() {
    const typingElement = document.getElementById('typing-animation');
    if (!typingElement) return;

    const typeCharacter = () => {
      const currentText = this.typingTexts[this.currentTextIndex];
      
      if (this.isDeleting) {
        typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
          setTimeout(typeCharacter, 500); // Pause before typing next text
          return;
        }
      } else {
        typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        
        if (this.currentCharIndex === currentText.length) {
          setTimeout(() => {
            this.isDeleting = true;
            typeCharacter();
          }, 2000); // Pause when text is complete
          return;
        }
      }
      
      const speed = this.isDeleting ? 50 : 100;
      setTimeout(typeCharacter, speed);
    };

    // Start typing animation after a short delay
    setTimeout(typeCharacter, 1000);
  }

  /**
   * Create particle system
   */
  createParticleSystem() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random();
      
      if (size < 0.3) {
        particle.className = 'particle small';
      } else if (size > 0.7) {
        particle.className = 'particle large';
      } else {
        particle.className = 'particle';
      }
      
      // Random starting position
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      particleContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particleContainer.contains(particle)) {
          particleContainer.removeChild(particle);
        }
      }, 30000);
    };

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 1000);
    }

    // Continue creating particles
    setInterval(createParticle, 2000);
  }

  /**
   * Enhance project cards with better hover effects
   */
  enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Add magnetic cursor effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const rotateX = deltaY * 5;
        const rotateY = deltaX * 5;
        
        card.style.transform = `
          perspective(1000px)
          rotateX(${-rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-10px)
          scale(1.02)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      // Add click ripple effect
      card.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(0, 169, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
          pointer-events: none;
          z-index: 1000;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
          if (card.contains(ripple)) {
            card.removeChild(ripple);
          }
        }, 600);
      });
    });
    
    // Add ripple animation styles
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Add Three.js-like background enhancement
   */
  enhanceBackgrounds() {
    const activeBackground = document.querySelector('.active-bg');
    if (activeBackground) {
      activeBackground.classList.add('enhanced');
      
      // Add floating orbs
      this.createFloatingOrbs(activeBackground);
    }
  }

  /**
   * Create floating orbs for enhanced backgrounds
   */
  createFloatingOrbs(container) {
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.style.cssText = `
        position: absolute;
        width: ${Math.random() * 100 + 50}px;
        height: ${Math.random() * 100 + 50}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 169, 255, 0.1), transparent);
        animation: floatOrb ${Math.random() * 10 + 10}s infinite ease-in-out;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 1;
      `;
      
      container.appendChild(orb);
    }
    
    // Add orb animation if not exists
    if (!document.getElementById('orb-styles')) {
      const style = document.createElement('style');
      style.id = 'orb-styles';
      style.textContent = `
        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize scroll animations
   */
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Add stagger delay for children if they exist
          const children = entry.target.querySelectorAll('.stagger-children > *');
          children.forEach((child, index) => {
            child.style.setProperty('--stagger-delay', index);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * Enhance skill progress bars
   */
  enhanceSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressFill = entry.target.querySelector('.skill-progress-fill');
          if (progressFill) {
            setTimeout(() => {
              progressFill.classList.add('animate');
            }, 200);
          }
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  /**
   * Initialize Neural Network background
   */
  initNeural() {
    try {
      this.createNeuralNodes();
      this.createNeuralConnections();
      this.createDataPackets();
      this.createBrainWaves();
    } catch (error) {
      console.warn('Error initializing Neural Network background:', error);
    }
  }

  /**
   * Create neural network nodes
   */
  createNeuralNodes() {
    const container = document.querySelector("#neural #neuralNodes");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Create different types of nodes
    const nodeTypes = [
      { count: 20, class: 'neural-node', size: 'small' },
      { count: 8, class: 'neural-node large', size: 'medium' },
      { count: 3, class: 'neural-node hub', size: 'large' }
    ];
    
    nodeTypes.forEach(nodeType => {
      for (let i = 0; i < nodeType.count; i++) {
        const node = document.createElement("div");
        node.className = nodeType.class;
        node.style.left = Math.random() * 90 + 5 + "%";
        node.style.top = Math.random() * 90 + 5 + "%";
        node.style.animationDelay = Math.random() * 3 + "s";
        node.dataset.nodeId = `node-${Date.now()}-${i}`;
        container.appendChild(node);
      }
    });
  }

  /**
   * Create neural network connections
   */
  createNeuralConnections() {
    const container = document.querySelector("#neural #neuralConnections");
    const nodes = document.querySelectorAll("#neural .neural-node");
    if (!container || nodes.length === 0) return;
    
    container.innerHTML = "";
    
    // Create connections between nearby nodes
    const nodePositions = Array.from(nodes).map(node => ({
      x: parseFloat(node.style.left),
      y: parseFloat(node.style.top),
      element: node
    }));
    
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodePositions[i].x - nodePositions[j].x, 2) +
          Math.pow(nodePositions[i].y - nodePositions[j].y, 2)
        );
        
        // Only connect nodes that are close enough
        if (distance < 30) {
          const connection = document.createElement("div");
          connection.className = "neural-connection";
          
          const angle = Math.atan2(
            nodePositions[j].y - nodePositions[i].y,
            nodePositions[j].x - nodePositions[i].x
          );
          
          connection.style.left = nodePositions[i].x + "%";
          connection.style.top = nodePositions[i].y + "%";
          connection.style.width = distance + "%";
          connection.style.transform = `rotate(${angle}rad)`;
          connection.style.animationDelay = Math.random() * 2 + "s";
          
          container.appendChild(connection);
        }
      }
    }
  }

  /**
   * Create data packets
   */
  createDataPackets() {
    const container = document.querySelector("#neural #dataPackets");
    if (!container) return;
    
    container.innerHTML = "";
    
    for (let i = 0; i < 12; i++) {
      const packet = document.createElement("div");
      packet.className = "data-packet";
      packet.style.left = Math.random() * 100 + "%";
      packet.style.top = Math.random() * 100 + "%";
      packet.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(packet);
    }
  }

  /**
   * Create brain waves
   */
  createBrainWaves() {
    const container = document.querySelector("#neural #brainWaves");
    if (!container) return;
    
    container.innerHTML = "";
    
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement("div");
      wave.className = "brain-wave";
      wave.style.top = (i * 20 + 10) + "%";
      wave.style.animationDelay = i * 1.2 + "s";
      container.appendChild(wave);
    }
  }

  /**
   * Initialize Minimalist Professional background
   */
  initMinimal() {
    try {
      this.createGeometricShapes();
      this.createCleanLines();
    } catch (error) {
      console.warn('Error initializing Minimalist background:', error);
    }
  }

  /**
   * Create geometric shapes
   */
  createGeometricShapes() {
    const container = document.querySelector("#minimal #geometricShapes");
    if (!container) return;
    
    container.innerHTML = "";
    
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement("div");
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      shape.className = `geometric-shape ${shapeType}`;
      shape.style.left = Math.random() * 90 + 5 + "%";
      shape.style.top = Math.random() * 90 + 5 + "%";
      shape.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(shape);
    }
  }

  /**
   * Create clean lines
   */
  createCleanLines() {
    const container = document.querySelector("#minimal #cleanLines");
    if (!container) return;
    
    container.innerHTML = "";
    
    for (let i = 0; i < 6; i++) {
      const line = document.createElement("div");
      line.className = "clean-line";
      line.style.top = Math.random() * 80 + 10 + "%";
      line.style.width = Math.random() * 40 + 30 + "%";
      line.style.animationDelay = Math.random() * 6 + "s";
      container.appendChild(line);
    }
  }

  /**
   * Initialize Data Visualization background
   */
  initDataViz() {
    try {
      this.createFloatingCharts();
      this.createCodeSnippets();
      this.createStatisticsDisplay();
    } catch (error) {
      console.warn('Error initializing Data Visualization background:', error);
    }
  }

  /**
   * Create floating charts
   */
  createFloatingCharts() {
    const container = document.querySelector("#dataviz #floatingCharts");
    if (!container) return;
    
    container.innerHTML = "";
    
    for (let i = 0; i < 4; i++) {
      const chart = document.createElement("div");
      chart.className = "floating-chart";
      chart.style.left = Math.random() * 70 + 15 + "%";
      chart.style.top = Math.random() * 70 + 15 + "%";
      chart.style.width = "60px";
      chart.style.height = "40px";
      chart.style.animationDelay = Math.random() * 3 + "s";
      
      // Create chart bars
      for (let j = 0; j < 6; j++) {
        const bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.height = Math.random() * 25 + 10 + "px";
        bar.style.display = "inline-block";
        bar.style.animationDelay = j * 0.2 + "s";
        chart.appendChild(bar);
      }
      
      container.appendChild(chart);
    }
  }

  /**
   * Create code snippets
   */
  createCodeSnippets() {
    const container = document.querySelector("#dataviz #codeSnippets");
    if (!container) return;
    
    container.innerHTML = "";
    
    const codeExamples = [
      "const ai = new ML();",
      "model.fit(X, y);",
      "predict(data);",
      "accuracy: 94.2%",
      "epoch 50/100",
      "loss: 0.0234"
    ];
    
    for (let i = 0; i < 6; i++) {
      const snippet = document.createElement("div");
      snippet.className = "code-snippet";
      snippet.textContent = codeExamples[i];
      snippet.style.left = Math.random() * 80 + 10 + "%";
      snippet.style.top = Math.random() * 80 + 10 + "%";
      snippet.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(snippet);
    }
  }

  /**
   * Create statistics display
   */
  createStatisticsDisplay() {
    const container = document.querySelector("#dataviz #statisticsDisplay");
    if (!container) return;
    
    container.innerHTML = "";
    
    const stats = [
      { label: "Accuracy", value: "94.2%" },
      { label: "Models", value: "12" },
      { label: "Data Points", value: "10K+" },
      { label: "Projects", value: "25+" }
    ];
    
    stats.forEach((stat, index) => {
      const statElement = document.createElement("div");
      statElement.className = "statistic-element";
      statElement.innerHTML = `
        <div style="font-size: 12px; opacity: 0.8;">${stat.label}</div>
        <div style="font-size: 16px; font-weight: bold;">${stat.value}</div>
      `;
      statElement.style.left = (index * 20 + 10) + "%";
      statElement.style.top = Math.random() * 60 + 20 + "%";
      statElement.style.animationDelay = index * 0.5 + "s";
      container.appendChild(statElement);
    });
  }

  /**
   * Initialize other components
   */
  initializeComponents() {
    this.initializeProgressBars();
    this.enhanceBackgrounds();
    this.optimizePerformance();
  }

  /**
   * Optimize performance based on device capabilities
   */
  optimizePerformance() {
    const isMobile = window.innerWidth <= 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEnd) {
      document.body.classList.add('performance-mode');
      console.log('Performance mode enabled for better experience');
    }
  }

  /**
   * Cleanup method for proper resource management
   */
  cleanup() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    // Clean up particle system
    const particleSystem = document.querySelector('.particle-system');
    if (particleSystem) {
      particleSystem.remove();
    }
  }
}

// Initialize the application and make it globally accessible
const portfolioApp = new PortfolioApp();
window.portfolioApp = portfolioApp;

// Signal that PortfolioApp is ready
window.portfolioAppReady = true;
console.log('PortfolioApp initialized and ready');

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  portfolioApp.cleanup();
});