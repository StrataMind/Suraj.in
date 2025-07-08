/**
 * City Night Background System
 * Global functions for initializing city background effects
 */

window.initCity = function() {
    if (document.getElementById('city').classList.contains('initialized')) return;
    
    createBuildingWindows();
    createCityStars();
    createNeonSigns();
    createTrafficLights();
    createStreetLights();
    createHelicopters();
    createSearchlights();
    createCitySmoke();
    createBillboards();
    createRain();
    createVehicles();
    createAirTraffic();
    
    document.getElementById('city').classList.add('initialized');
};

function createBuildingWindows() {
    const buildings = document.querySelectorAll('#city .building');
    buildings.forEach((building) => {
        const rect = building.getBoundingClientRect();
        const width = parseInt(building.style.width) || rect.width;
        const height = parseInt(building.style.height) || rect.height;
        const windowsPerRow = Math.floor(width / 12);
        const rows = Math.floor(height / 15);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < windowsPerRow; col++) {
                if (Math.random() > 0.3) {
                    const window = document.createElement('div');
                    const colors = ['', 'blue', 'white', 'orange'];
                    window.className = 'window ' + colors[Math.floor(Math.random() * colors.length)];
                    window.style.left = (col * 12 + 3) + 'px';
                    window.style.top = (row * 15 + 5) + 'px';
                    window.style.animationDelay = Math.random() * 4 + 's';
                    building.appendChild(window);
                }
            }
        }
    });
}

function createCityStars() {
    const container = document.querySelector('#city #cityStars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 40 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(star);
    }
}

function createNeonSigns() {
    const container = document.querySelector('#city #neonSigns');
    if (!container) return;
    container.innerHTML = '';
    const signs = [
        { text: 'HOTEL', class: 'neon-pink', left: '10%', top: '40%' },
        { text: 'BAR', class: 'neon-cyan', left: '25%', top: '30%' },
        { text: 'CLUB', class: 'neon-green', left: '40%', top: '35%' },
        { text: 'CAFE', class: 'neon-pink', left: '60%', top: '25%' },
        { text: 'SHOP', class: 'neon-cyan', left: '75%', top: '45%' }
    ];
    
    signs.forEach(sign => {
        const neonSign = document.createElement('div');
        neonSign.className = 'neon-sign ' + sign.class;
        neonSign.style.left = sign.left;
        neonSign.style.top = sign.top;
        neonSign.textContent = sign.text;
        container.appendChild(neonSign);
    });
}

function createTrafficLights() {
    const container = document.querySelector('#city #trafficLights');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.className = Math.random() < 0.3 ? 'traffic-light red' : 'traffic-light white';
        light.style.bottom = '12px';
        light.style.animationDelay = Math.random() * 2 + 's';
        light.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        container.appendChild(light);
    }
}

function createStreetLights() {
    const container = document.querySelector('#city #streetLights');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const light = document.createElement('div');
        light.className = 'street-light';
        light.style.left = (i * 15 + 5) + '%';
        light.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(light);
    }
}

function createHelicopters() {
    const container = document.querySelector('#city #helicopters');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const helicopter = document.createElement('div');
        helicopter.className = 'helicopter';
        helicopter.style.top = Math.random() * 30 + 10 + '%';
        helicopter.style.animationDelay = Math.random() * 20 + 's';
        helicopter.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(helicopter);
    }
}

function createSearchlights() {
    const container = document.querySelector('#city #searchlights');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const searchlight = document.createElement('div');
        searchlight.className = 'searchlight';
        searchlight.style.left = (i * 30 + 15) + '%';
        searchlight.style.bottom = '0px';
        searchlight.style.animationDelay = Math.random() * 12 + 's';
        container.appendChild(searchlight);
    }
}

function createCitySmoke() {
    const container = document.querySelector('#city #citySmoke');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'city-smoke';
        smoke.style.left = Math.random() * 100 + '%';
        smoke.style.bottom = Math.random() * 100 + 150 + 'px';
        smoke.style.animationDelay = Math.random() * 15 + 's';
        smoke.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(smoke);
    }
}

function createBillboards() {
    const container = document.querySelector('#city #billboards');
    if (!container) return;
    container.innerHTML = '';
    const positions = [
        { left: '20%', top: '20%' },
        { left: '45%', top: '15%' },
        { left: '70%', top: '25%' }
    ];
    
    positions.forEach(pos => {
        const billboard = document.createElement('div');
        billboard.className = 'billboard';
        billboard.style.left = pos.left;
        billboard.style.top = pos.top;
        container.appendChild(billboard);
    });
}

function createRain() {
    const container = document.querySelector('#city #rainDrops');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        container.appendChild(drop);
    }
}

function createVehicles() {
    const container = document.querySelector('#city #vehicles');
    if (!container) return;
    container.innerHTML = '';
    
    // Taxi
    const taxi = document.createElement('div');
    taxi.className = 'taxi';
    taxi.style.animationDelay = '0s';
    container.appendChild(taxi);
    
    // Police car
    const police = document.createElement('div');
    police.className = 'police-car';
    police.style.animationDelay = '8s';
    container.appendChild(police);
}

function createAirTraffic() {
    const container = document.querySelector('#city #airTraffic');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        const plane = document.createElement('div');
        plane.className = 'plane';
        plane.style.top = Math.random() * 25 + 10 + '%';
        plane.style.animationDelay = Math.random() * 25 + 's';
        plane.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(plane);
    }
}