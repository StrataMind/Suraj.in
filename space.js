/**
 * Space Universe Background System
 * Global functions for initializing space background effects
 */

window.initSpace = function() {
    if (document.getElementById('space').classList.contains('initialized')) return;
    
    createStars();
    createShootingStars();
    createPlanets();
    createNebulae();
    createGalaxies();
    createSpaceDust();
    createPulsars();
    createBlackHoles();
    createCosmicRays();
    createAsteroids();
    createComets();
    
    document.getElementById('space').classList.add('initialized');
};

function createStars() {
    const container = document.querySelector('#space #stars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        const size = Math.random();
        
        if (size < 0.7) {
            star.className = 'star small';
        } else if (size < 0.9) {
            star.className = 'star medium';
        } else {
            star.className = 'star large';
        }
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);
    }
}

function createShootingStars() {
    const container = document.querySelector('#space #shootingStars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animationDelay = Math.random() * 4 + 's';
        shootingStar.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(shootingStar);
    }
}

function createPlanets() {
    const container = document.querySelector('#space #planets');
    if (!container) return;
    container.innerHTML = '';
    const planetTypes = ['earth', 'mars', 'jupiter'];
    
    for (let i = 0; i < 3; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet ' + planetTypes[i];
        planet.style.left = (20 + i * 30) + '%';
        planet.style.top = (20 + i * 20) + '%';
        planet.style.animationDuration = (60 + i * 30) + 's';
        container.appendChild(planet);
    }
}

function createNebulae() {
    const container = document.querySelector('#space #nebulae');
    if (!container) return;
    container.innerHTML = '';
    const nebulaTypes = ['purple', 'blue', 'pink'];
    
    for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula ' + nebulaTypes[Math.floor(Math.random() * nebulaTypes.length)];
        nebula.style.width = (150 + Math.random() * 200) + 'px';
        nebula.style.height = (100 + Math.random() * 150) + 'px';
        nebula.style.left = Math.random() * 100 + '%';
        nebula.style.top = Math.random() * 100 + '%';
        nebula.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(nebula);
    }
}

function createGalaxies() {
    const container = document.querySelector('#space #galaxies');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const galaxy = document.createElement('div');
        galaxy.className = 'galaxy';
        galaxy.style.left = Math.random() * 100 + '%';
        galaxy.style.top = Math.random() * 100 + '%';
        galaxy.style.animationDuration = (100 + Math.random() * 40) + 's';
        container.appendChild(galaxy);
    }
}

function createSpaceDust() {
    const container = document.querySelector('#space #spaceDust');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const dust = document.createElement('div');
        dust.className = 'space-dust';
        dust.style.animationDelay = Math.random() * 30 + 's';
        dust.style.animationDuration = (Math.random() * 20 + 20) + 's';
        container.appendChild(dust);
    }
}

function createPulsars() {
    const container = document.querySelector('#space #pulsars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const pulsar = document.createElement('div');
        pulsar.className = 'pulsar';
        pulsar.style.left = Math.random() * 100 + '%';
        pulsar.style.top = Math.random() * 100 + '%';
        pulsar.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(pulsar);
    }
}

function createBlackHoles() {
    const container = document.querySelector('#space #blackHoles');
    if (!container) return;
    container.innerHTML = '';
    const blackHole = document.createElement('div');
    blackHole.className = 'black-hole';
    blackHole.style.right = '10%';
    blackHole.style.top = '20%';
    container.appendChild(blackHole);
}

function createCosmicRays() {
    const container = document.querySelector('#space #cosmicRays');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const ray = document.createElement('div');
        ray.className = 'cosmic-ray';
        ray.style.left = Math.random() * 100 + '%';
        ray.style.animationDelay = Math.random() * 8 + 's';
        ray.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(ray);
    }
}

function createAsteroids() {
    const container = document.querySelector('#space #asteroids');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        asteroid.style.width = (Math.random() * 12 + 4) + 'px';
        asteroid.style.height = (Math.random() * 12 + 4) + 'px';
        asteroid.style.top = Math.random() * 100 + '%';
        asteroid.style.animationDelay = Math.random() * 25 + 's';
        asteroid.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(asteroid);
    }
}

function createComets() {
    const container = document.querySelector('#space #comets');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.animationDelay = Math.random() * 15 + 's';
        comet.style.animationDuration = (Math.random() * 5 + 12) + 's';
        container.appendChild(comet);
    }
}