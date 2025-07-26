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

// Terminal typing animation
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

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    typeWriter();
    createMatrixRain();
    addGlitchEffect();
    createParticles();
    updateLastUpdated();
    initThemeToggle();
});

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