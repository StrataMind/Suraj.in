/**
 * Peace & Tranquility Background System
 * Global functions for initializing peaceful background effects
 */

window.initPeace = function() {
    if (document.getElementById('peace').classList.contains('initialized')) return;
    
    createLotusPetals();
    createWaterRipples();
    createPeaceOrbs();
    createOmSymbols();
    createZenCircles();
    createLeaves();
    createLightRays();
    createMandalas();
    createButterflies();
    createBreathCircles();
    createPeacefulClouds();
    createMeditationParticles();
    
    document.getElementById('peace').classList.add('initialized');
};

function createLotusPetals() {
    const container = document.querySelector('#peace #lotusPetals');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'lotus-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 25 + 's';
        petal.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(petal);
    }
}

function createWaterRipples() {
    const container = document.querySelector('#peace #waterRipples');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = Math.random() * 100 + '%';
        ripple.style.top = Math.random() * 100 + '%';
        ripple.style.animationDelay = Math.random() * 8 + 's';
        ripple.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(ripple);
    }
}

function createPeaceOrbs() {
    const container = document.querySelector('#peace #peaceOrbs');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.className = 'peace-orb';
        orb.style.width = (Math.random() * 50 + 30) + 'px';
        orb.style.height = orb.style.width;
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 20 + 's';
        orb.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(orb);
    }
}

function createOmSymbols() {
    const container = document.querySelector('#peace #omSymbols');
    if (!container) return;
    container.innerHTML = '';
    const symbols = ['ॐ', '☯', '☮', '♦'];
    for (let i = 0; i < 4; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'om-symbol';
        symbol.style.left = Math.random() * 90 + 5 + '%';
        symbol.style.top = Math.random() * 90 + 5 + '%';
        symbol.style.animationDelay = Math.random() * 30 + 's';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        container.appendChild(symbol);
    }
}

function createZenCircles() {
    const container = document.querySelector('#peace #zenCircles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const circle = document.createElement('div');
        circle.className = Math.random() < 0.5 ? 'zen-circle' : 'zen-circle incomplete';
        circle.style.width = (Math.random() * 80 + 60) + 'px';
        circle.style.height = circle.style.width;
        circle.style.left = Math.random() * 100 + '%';
        circle.style.top = Math.random() * 100 + '%';
        circle.style.animationDuration = (Math.random() * 20 + 30) + 's';
        container.appendChild(circle);
    }
}

function createLeaves() {
    const container = document.querySelector('#peace #leaves');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.top = Math.random() * 80 + 10 + '%';
        leaf.style.animationDelay = Math.random() * 35 + 's';
        leaf.style.animationDuration = (Math.random() * 20 + 25) + 's';
        container.appendChild(leaf);
    }
}

function createLightRays() {
    const container = document.querySelector('#peace #lightRays');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        ray.style.left = Math.random() * 100 + '%';
        ray.style.top = Math.random() * 50 + '%';
        ray.style.animationDelay = Math.random() * 15 + 's';
        ray.style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';
        container.appendChild(ray);
    }
}

function createMandalas() {
    const container = document.querySelector('#peace #mandalas');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const mandala = document.createElement('div');
        mandala.className = 'mandala';
        mandala.style.left = Math.random() * 80 + 10 + '%';
        mandala.style.top = Math.random() * 80 + 10 + '%';
        mandala.style.animationDuration = (Math.random() * 30 + 45) + 's';
        container.appendChild(mandala);
    }
}

function createButterflies() {
    const container = document.querySelector('#peace #butterflies');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.style.left = Math.random() * 30 + '%';
        butterfly.style.top = Math.random() * 80 + 10 + '%';
        butterfly.style.animationDelay = Math.random() * 25 + 's';
        butterfly.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(butterfly);
    }
}

function createBreathCircles() {
    const container = document.querySelector('#peace #breathCircles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const circle = document.createElement('div');
        circle.className = 'breath-circle';
        circle.style.width = (Math.random() * 100 + 60) + 'px';
        circle.style.height = circle.style.width;
        circle.style.left = Math.random() * 100 + '%';
        circle.style.top = Math.random() * 100 + '%';
        circle.style.animationDelay = Math.random() * 12 + 's';
        container.appendChild(circle);
    }
}

function createPeacefulClouds() {
    const container = document.querySelector('#peace #peacefulClouds');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'peaceful-cloud';
        cloud.style.width = (Math.random() * 60 + 40) + 'px';
        cloud.style.height = (Math.random() * 25 + 20) + 'px';
        cloud.style.top = Math.random() * 40 + '%';
        cloud.style.animationDelay = Math.random() * 45 + 's';
        cloud.style.animationDuration = (Math.random() * 25 + 35) + 's';
        container.appendChild(cloud);
    }
}

function createMeditationParticles() {
    const container = document.querySelector('#peace #meditationParticles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'meditation-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0px';
        particle.style.animationDelay = Math.random() * 18 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}