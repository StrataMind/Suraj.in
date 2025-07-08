/**
 * Studio Ghibli Background System
 * Global functions for initializing Ghibli background effects
 */

window.initGhibli = function() {
    if (document.getElementById('ghibli').classList.contains('initialized')) return;
    
    createGrassBlades();
    createSootSprites();
    createPetals();
    createFireflies();
    createSparkles();
    createSeeds();
    createAuras();
    
    document.getElementById('ghibli').classList.add('initialized');
};

function createGrassBlades() {
    const container = document.querySelector('#ghibli #grassBlades');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass-blade';
        blade.style.left = Math.random() * 100 + '%';
        blade.style.height = (Math.random() * 40 + 20) + 'px';
        blade.style.animationDelay = Math.random() * 6 + 's';
        blade.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(blade);
    }
}

function createSootSprites() {
    const container = document.querySelector('#ghibli #sootSprites');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const sprite = document.createElement('div');
        sprite.className = 'soot-sprite';
        sprite.style.left = Math.random() * 100 + '%';
        sprite.style.top = Math.random() * 100 + '%';
        sprite.style.animationDelay = Math.random() * 15 + 's';
        sprite.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(sprite);
    }
}

function createPetals() {
    const container = document.querySelector('#ghibli #petals');
    if (!container) return;
    container.innerHTML = '';
    const petalTypes = ['', 'cherry', 'rose', 'lily'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal ' + petalTypes[Math.floor(Math.random() * petalTypes.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 20 + 's';
        petal.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(petal);
    }
}

function createFireflies() {
    const container = document.querySelector('#ghibli #fireflies');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.animationDelay = Math.random() * 8 + 's';
        firefly.style.animationDuration = (Math.random() * 6 + 6) + 's';
        container.appendChild(firefly);
    }
}

function createSparkles() {
    const container = document.querySelector('#ghibli #sparkles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(sparkle);
    }
}

function createSeeds() {
    const container = document.querySelector('#ghibli #seeds');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const seed = document.createElement('div');
        seed.className = 'seed';
        seed.style.left = Math.random() * 100 + '%';
        seed.style.animationDelay = Math.random() * 25 + 's';
        seed.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(seed);
    }
}

function createAuras() {
    const container = document.querySelector('#ghibli #auras');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const aura = document.createElement('div');
        aura.className = 'aura';
        aura.style.width = (Math.random() * 200 + 100) + 'px';
        aura.style.height = aura.style.width;
        aura.style.left = Math.random() * 100 + '%';
        aura.style.top = Math.random() * 100 + '%';
        aura.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(aura);
    }
}