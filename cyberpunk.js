/**
 * Cyberpunk Background System
 * Global functions for initializing cyberpunk background effects
 */

window.initCyberpunk = function() {
    if (document.getElementById('cyberpunk').classList.contains('initialized')) return;
    
    createParticles();
    createCodeRain();
    createOrbs();
    createShapes();
    createPulses();
    createDataStreams();
    
    document.getElementById('cyberpunk').classList.add('initialized');
};

function createParticles() {
    const container = document.querySelector('#cyberpunk #particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(particle);
    }
}

function createCodeRain() {
    const container = document.querySelector('#cyberpunk #codeRain');
    if (!container) return;
    container.innerHTML = '';
    const codeChars = '01アイウエオabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < 15; i++) {
        const codeString = document.createElement('div');
        codeString.className = 'code-rain';
        codeString.style.left = Math.random() * window.innerWidth + 'px';
        codeString.style.animationDelay = Math.random() * 10 + 's';
        codeString.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        let text = '';
        for (let j = 0; j < 15; j++) {
            text += codeChars[Math.floor(Math.random() * codeChars.length)] + '<br>';
        }
        codeString.innerHTML = text;
        container.appendChild(codeString);
    }
}

function createOrbs() {
    const container = document.querySelector('#cyberpunk #orbs');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.width = (Math.random() * 80 + 40) + 'px';
        orb.style.height = orb.style.width;
        orb.style.left = Math.random() * window.innerWidth + 'px';
        orb.style.top = Math.random() * window.innerHeight + 'px';
        orb.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(orb);
    }
}

function createShapes() {
    const container = document.querySelector('#cyberpunk #shapes');
    if (!container) return;
    container.innerHTML = '';
    const shapeTypes = ['triangle', 'square', 'circle'];
    
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape ' + shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.style.left = Math.random() * window.innerWidth + 'px';
        shape.style.top = Math.random() * window.innerHeight + 'px';
        shape.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(shape);
    }
}

function createPulses() {
    const container = document.querySelector('#cyberpunk #pulses');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const pulse = document.createElement('div');
        pulse.className = 'pulse';
        pulse.style.left = Math.random() * window.innerWidth + 'px';
        pulse.style.top = Math.random() * window.innerHeight + 'px';
        pulse.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(pulse);
    }
}

function createDataStreams() {
    const container = document.querySelector('#cyberpunk #dataStreams');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = Math.random() * window.innerWidth + 'px';
        stream.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(stream);
    }
}