// Modern Coder Portfolio JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive Terminal About
function initInteractiveTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    
    if (!terminalInput || !terminalHistory) return;
    
    const commands = {
        whoami: 'Suraj Kumar – Final-year EE student @ NITK Surathkal.\n\nCurrently diving deep into AI/ML research\nBuilding the future, one algorithm at a time',
        mission: 'To build intelligent systems that solve real problems.\n\n"The best way to predict the future is to invent it." — Alan Kay',
        origin: 'Born in Nalanda — shaped by ideas and ambition.\n\nFrom the land of ancient wisdom to modern innovation\nWhere Nalanda University once stood, dreams still rise',
        focus: 'AI Research | ML Projects | Human Impact\n\nCurrent obsessions:\n  • Computer Vision & Deep Learning\n  • Natural Language Processing\n  • Building products that matter',
        vision: 'Startup founder. Public servant. Builder of change.\n\nThe plan:\n  1. Master AI/ML technologies\n  2. Launch impactful startups\n  3. Serve society through innovation',
        hobbies: 'Chess, anime, history, self-growth, science, ideas.\n\nStrategic thinking on 64 squares\nAnime: where imagination meets storytelling\nHistory: learning from the past to build the future',
        skills: 'Technical Arsenal:\n\nLanguages: Python, C++, JavaScript, SQL\nML/AI: TensorFlow, PyTorch, Scikit-learn\nCloud: AWS, Docker, Kubernetes\nData: Pandas, NumPy, Matplotlib\nWeb: React, Node.js, HTML/CSS',
        projects: 'E-commerce Recommendation Engine\nHireNet - AI Recruitment Platform\nTalendy Website Design\nQR Code Generator\nProductivity Dashboard\n\nTry: "ecommerce --live" or "hirenet --github"',
        fun: 'Easter Egg Unlocked!\n\nFun Facts About Me:\n  • I debug code better with lo-fi music\n  • My IDE theme changes with my mood\n  • I name my variables after anime characters\n  • Coffee.exe has stopped working... switching to tea\n  • I dream in Python but think in pseudocode',
        quote: '"' + getRandomQuote() + '"',
        matrix: 'MATRIX_EFFECT',
        'projects --live': 'Live Demos Available:\n\nGame Zone: 25+ interactive games\nPublixly: Modern blogging platform\nE-commerce Engine: ML-powered recommendations\n\nScroll down to "Interactive Showcase" to try them!',
        help: 'Available commands:\n\nwhoami, mission, origin, focus, vision, hobbies\nskills, projects, fun, quote, matrix, clear\n\nPro tip: Try "projects --live" for something special!',
        clear: 'CLEAR_COMMAND'
    };
    
    function getRandomQuote() {
        const quotes = [
            'The best way to predict the future is to invent it. — Alan Kay',
            'Innovation distinguishes between a leader and a follower. — Steve Jobs',
            'The only way to do great work is to love what you do. — Steve Jobs',
            'Code is like humor. When you have to explain it, it\'s bad. — Cory House',
            'First, solve the problem. Then, write the code. — John Johnson',
            'Experience is the name everyone gives to their mistakes. — Oscar Wilde',
            'The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    function typeOutput(text, element, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
    
    const projectLinks = {
        'ecommerce': {
            github: 'https://github.com/surajsk2003/ecommerce-recommendation-engine',
            live: 'https://surajsk2003.github.io/ecommerce-recommendation-engine/'
        },
        'hirenet': {
            github: 'https://github.com/surajsk2003/HireNet'
        },
        'talendy': {
            github: 'https://github.com/surajsk2003/talendy-website-design',
            live: 'https://www.figma.com/proto/6zEiQE5TZtyOA1hvBHrquW/2025---Global-Talendy-Website-Design-Hackathon-%7C-Tech-Japan-Inc.?node-id=1-17&p=f&t=S5l2m1u7nn3S319F-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A17'
        },
        'qr': {
            github: 'https://github.com/surajsk2003/Advanced-QR-Code-Generator',
            live: 'https://surajsk2003.github.io/Advanced-QR-Code-Generator/'
        },
        'productivity': {
            github: 'https://github.com/surajsk2003/Productivity-Dashboard',
            live: 'https://surajsk2003.github.io/Productivity-Dashboard/'
        },
        'fitmin': {
            github: 'https://github.com/surajsk2003/FitMind'
        },
        'newsscope': {
            github: 'https://github.com/surajsk2003/NewsScope-AI'
        }
    };
    
    function executeCommand(command) {
        const cmd = command.trim().toLowerCase();
        
        // Check for project link commands
        const projectMatch = cmd.match(/^(\w+)\s+--(live|github)$/);
        if (projectMatch) {
            const [, projectName, linkType] = projectMatch;
            const project = projectLinks[projectName];
            
            const commandLine = document.createElement('div');
            commandLine.className = 'command-line';
            commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
            terminalHistory.appendChild(commandLine);
            
            const outputElement = document.createElement('div');
            
            if (project && project[linkType]) {
                outputElement.className = 'command-output';
                outputElement.textContent = `Opening ${projectName} ${linkType}... Redirecting in 2 seconds.`;
                terminalHistory.appendChild(outputElement);
                
                setTimeout(() => {
                    window.open(project[linkType], '_blank');
                }, 2000);
            } else if (project && !project[linkType]) {
                outputElement.className = 'error-output';
                outputElement.textContent = `Oops! This project is not hosted yet.`;
                terminalHistory.appendChild(outputElement);
            } else {
                outputElement.className = 'error-output';
                outputElement.textContent = `Project "${projectName}" not found.`;
                terminalHistory.appendChild(outputElement);
            }
            
            terminalInput.focus();
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
            return;
        }
        
        // Add command to history
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
        terminalHistory.appendChild(commandLine);
        
        // Handle special commands
        if (cmd === 'clear') {
            setTimeout(() => {
                terminalHistory.innerHTML = '';
                terminalInput.focus();
            }, 200);
            return;
        }
        
        if (cmd === 'matrix') {
            const outputElement = document.createElement('div');
            outputElement.className = 'command-output matrix-effect';
            outputElement.innerHTML = 'Initiating Matrix effect...\n\nTake the red pill: Scroll to see the matrix rain\nTake the blue pill: Type "clear" to return';
            terminalHistory.appendChild(outputElement);
            
            // Trigger matrix effect
            setTimeout(() => {
                document.body.classList.add('matrix-mode');
                setTimeout(() => {
                    document.body.classList.remove('matrix-mode');
                }, 5000);
            }, 1000);
            
            terminalInput.focus();
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
            return;
        }
        
        // Create output element
        const outputElement = document.createElement('div');
        
        if (commands[cmd]) {
            outputElement.className = 'command-output';
            terminalHistory.appendChild(outputElement);
            
            typeOutput(commands[cmd], outputElement, () => {
                terminalInput.focus();
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
            });
        } else {
            outputElement.className = 'error-output';
            outputElement.textContent = `bash: ${command}: command not found`;
            terminalHistory.appendChild(outputElement);
            terminalInput.focus();
        }
        
        // Scroll to bottom
        setTimeout(() => {
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
        }, 100);
    }
    
    // Handle Enter key
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            if (command.trim()) {
                executeCommand(command);
                terminalInput.value = '';
            }
        }
    });
    
    // Focus input on terminal click
    document.querySelector('.terminal-body').addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Focus input when terminal is clicked
    document.querySelector('.terminal-body').addEventListener('click', () => {
        terminalInput.focus();
    });
}

// Legacy terminal typing animation (keep for other sections)
function typeWriter() {
    const commands = [
        'python train_model.py',
        'git commit -m "feat: new AI model"',
        'docker build -t ml-app .',
        'npm run deploy',
        'python -m pytest tests/',
        'git push origin main'
    ];
    
    const typingElement = document.querySelector('.typing .cursor');
    if (!typingElement) return;
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentCommand = commands[commandIndex];
        const typingLine = document.querySelector('.typing');
        
        if (isDeleting) {
            typingLine.innerHTML = `<span class="prompt">$</span> ${currentCommand.substring(0, charIndex - 1)}<span class="cursor">_</span>`;
            charIndex--;
        } else {
            typingLine.innerHTML = `<span class="prompt">$</span> ${currentCommand.substring(0, charIndex + 1)}<span class="cursor">_</span>`;
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Matrix rain effect for background
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#39d353';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Glitch effect for text
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.highlight');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    });
}

// Add CSS for glitch animation
const glitchCSS = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const style = document.createElement('style');
style.textContent = glitchCSS;
document.head.appendChild(style);

// Contact form handling with modern feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        // Show loading state with terminal style
        button.textContent = '> Sending...';
        button.disabled = true;
        button.style.background = '#ffa657';
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = '✓ Message sent!';
            button.style.background = '#39d353';
            
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Active navigation highlighting with terminal style
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav style
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: #39d353 !important;
        text-shadow: 0 0 10px rgba(57, 211, 83, 0.5);
    }
    .nav-links a.active::after {
        content: ' *';
        color: #39d353;
    }
`;
document.head.appendChild(navStyle);

// Particle system for background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#39d353';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Add float animation
const floatCSS = `
@keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(10px) translateX(-10px); }
    75% { transform: translateY(-10px) translateX(5px); }
}
`;

const floatStyle = document.createElement('style');
floatStyle.textContent = floatCSS;
document.head.appendChild(floatStyle);

// Update last updated time in footer
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastUpdatedElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Loading screen handler
function hideLoader() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    if (loader) {
        setTimeout(() => {
            // Remove blur effect
            body.classList.remove('loading');
            
            // Hide loader
            loader.classList.add('hidden');
            
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('switch') || document.getElementById('switch-projects');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = true;
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// Section fade-in animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    typeWriter();
    initInteractiveTerminal();
    createMatrixRain();
    addGlitchEffect();
    createParticles();
    updateLastUpdated();
    initThemeToggle();
    initSectionAnimations();
    initProjectPreviews();
});

// Project card hover preview functionality
function initProjectPreviews() {
    const projectCards = document.querySelectorAll('.project-card.has-live-demo');
    
    projectCards.forEach(card => {
        const iframe = card.querySelector('.project-preview iframe');
        const preview = card.querySelector('.project-preview');
        const liveUrl = card.dataset.liveUrl;
        
        if (!iframe || !liveUrl || !preview) return;
        
        let previewLoaded = false;
        
        card.addEventListener('mouseenter', () => {
            if (!previewLoaded) {
                iframe.src = liveUrl;
                previewLoaded = true;
                
                // Hide loading text when iframe loads
                iframe.addEventListener('load', () => {
                    preview.classList.add('loaded');
                }, { once: true });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Optional: Keep iframe loaded for better UX
            // iframe.src = '';
            // previewLoaded = false;
        });
    });
}

// Add scroll event listener for progress indicator
window.addEventListener('scroll', updateScrollProgress);

// Console easter egg
console.log(`
%c
╔══════════════════════════════════════╗
║                                      ║
║     Welcome to Suraj's Portfolio!    ║
║                                      ║
║  > whoami                            ║
║    AI/ML Engineer & Researcher       ║
║                                      ║
║  > cat skills.txt                    ║
║    Python, TensorFlow, PyTorch       ║
║    Computer Vision, NLP, Deep Learning║
║                                      ║
║  > echo "Let's build something cool!"║
║                                      ║
╚══════════════════════════════════════╝
`, 'color: #39d353; font-family: monospace; font-size: 12px;');

console.log('%cHey there, fellow developer! 👨‍💻', 'color: #58a6ff; font-size: 16px; font-weight: bold;');
console.log('%cLooks like you\'re checking out the console. I like your style!', 'color: #ffa657; font-size: 14px;');
console.log('%cFeel free to reach out if you want to collaborate on something awesome!', 'color: #a5a5ff; font-size: 14px;');