/**
 * Anime Style Background System
 * Global functions for initializing anime background effects
 */

window.initAnime = function() {
    if (document.getElementById('anime').classList.contains('initialized')) return;
    
    createSakuraPetals();
    createSpiritLights();
    createAnimeSparkles();
    createBubbles();
    createCloudHearts();
    createMagicCircles();
    createSpeedLines();
    createKawaiiCats();
    createEnergyAuras();
    
    document.getElementById('anime').classList.add('initialized');
};

function createSakuraPetals() {
    const container = document.querySelector('#anime #sakuraPetals');
    if (!container) return;
    container.innerHTML = '';
    const types = ['', 'white', 'deep'];
    
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'sakura ' + types[Math.floor(Math.random() * types.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 15 + 's';
        petal.style.animationDuration = (Math.random() * 8 + 12) + 's';
        container.appendChild(petal);
    }
}

function createSpiritLights() {
    const container = document.querySelector('#anime #spiritLights');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const light = document.createElement('div');
        light.className = 'spirit-light';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = Math.random() * 100 + '%';
        light.style.animationDelay = Math.random() * 12 + 's';
        light.style.animationDuration = (Math.random() * 8 + 8) + 's';
        container.appendChild(light);
    }
}

function createAnimeSparkles() {
    const container = document.querySelector('#anime #animeSparkles');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['', 'pink', 'blue', 'yellow'];
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'anime-sparkle ' + colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(sparkle);
    }
}

function createBubbles() {
    const container = document.querySelector('#anime #bubbles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = (Math.random() * 30 + 15) + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 20 + 's';
        bubble.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(bubble);
    }
}

function createCloudHearts() {
    const container = document.querySelector('#anime #cloudHearts');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const heart = document.createElement('div');
        heart.className = 'cloud-heart';
        heart.style.top = Math.random() * 80 + 10 + '%';
        heart.style.animationDelay = Math.random() * 25 + 's';
        heart.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(heart);
    }
}

function createMagicCircles() {
    const container = document.querySelector('#anime #magicCircles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'magic-circle';
        circle.style.left = Math.random() * 100 + '%';
        circle.style.top = Math.random() * 100 + '%';
        circle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(circle);
    }
}

function createSpeedLines() {
    const container = document.querySelector('#anime #speedLines');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.width = (Math.random() * 150 + 80) + 'px';
        line.style.animationDelay = Math.random() * 3 + 's';
        line.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(line);
    }
}

function createKawaiiCats() {
    const container = document.querySelector('#anime #kawaiiCats');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const cat = document.createElement('div');
        cat.className = 'kawaii-cat';
        cat.style.left = Math.random() * 90 + 5 + '%';
        cat.style.top = Math.random() * 90 + 5 + '%';
        cat.style.animationDelay = Math.random() * 18 + 's';
        container.appendChild(cat);
    }
}

function createEnergyAuras() {
    const container = document.querySelector('#anime #energyAuras');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const aura = document.createElement('div');
        aura.className = 'energy-aura';
        aura.style.width = (Math.random() * 150 + 80) + 'px';
        aura.style.height = aura.style.width;
        aura.style.left = Math.random() * 100 + '%';
        aura.style.top = Math.random() * 100 + '%';
        aura.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(aura);
    }
}