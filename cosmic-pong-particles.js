/**
 * ============================================
 * COSMIC PONG - ENHANCED PARTICLE SYSTEM
 * ============================================
 * Advanced particle effects and cosmic visuals
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Enhanced Particle System Class
 * Handles complex particle effects and cosmic visuals
 */
class CosmicParticleSystem {
    constructor() {
        this.enhancedParticles = [];
        this.cosmicParticles = [];
        this.nebulaeParticles = [];
        this.galaxySpiral = [];
        this.starfield = [];
        
        // Performance settings
        this.particlePool = [];
        this.maxParticles = 1000;
        this.qualityMultiplier = 1.0;
        
        // Cosmic effects
        this.galaxyRotation = 0;
        this.nebulaePulse = 0;
        this.cosmicWave = 0;
        
        this.init();
    }
    
    /**
     * Initialize the particle system
     */
    init() {
        this.createStarfield();
        this.initializeParticlePool();
        this.startCosmicEffects();
    }
    
    /**
     * Create enhanced particles with complex behaviors
     * This function was mentioned as incomplete in the problem statement
     */
    createEnhancedParticles(x, y, type, count = 10, config = {}) {
        const defaultConfig = {
            velocity: { min: 50, max: 200 },
            size: { min: 1, max: 5 },
            life: { min: 1, max: 3 },
            color: '#00f4ff',
            gravity: false,
            magnetic: false,
            orbital: false,
            pulse: false,
            trail: false,
            glow: true
        };
        
        const particleConfig = { ...defaultConfig, ...config };
        const actualCount = Math.floor(count * this.qualityMultiplier);
        
        for (let i = 0; i < actualCount; i++) {
            const particle = this.getParticleFromPool();
            
            if (!particle) continue; // Pool exhausted
            
            // Base properties
            particle.x = x + (Math.random() - 0.5) * 20;
            particle.y = y + (Math.random() - 0.5) * 20;
            particle.startX = particle.x;
            particle.startY = particle.y;
            
            // Velocity
            const angle = Math.random() * Math.PI * 2;
            const speed = particleConfig.velocity.min + 
                         Math.random() * (particleConfig.velocity.max - particleConfig.velocity.min);
            particle.velX = Math.cos(angle) * speed;
            particle.velY = Math.sin(angle) * speed;
            particle.initialVelX = particle.velX;
            particle.initialVelY = particle.velY;
            
            // Size and life
            particle.size = particleConfig.size.min + 
                           Math.random() * (particleConfig.size.max - particleConfig.size.min);
            particle.initialSize = particle.size;
            particle.life = particleConfig.life.min + 
                           Math.random() * (particleConfig.life.max - particleConfig.life.min);
            particle.maxLife = particle.life;
            
            // Color properties
            particle.color = particleConfig.color;
            particle.alpha = 1.0;
            
            // Enhanced properties
            particle.type = type;
            particle.hasGravity = particleConfig.gravity;
            particle.isMagnetic = particleConfig.magnetic;
            particle.isOrbital = particleConfig.orbital;
            particle.shouldPulse = particleConfig.pulse;
            particle.hasTrail = particleConfig.trail;
            particle.hasGlow = particleConfig.glow;
            
            // Special properties based on type
            switch (type) {
                case 'explosion':
                    particle.friction = 0.95;
                    particle.sizeDecay = 0.98;
                    break;
                    
                case 'cosmic':
                    particle.orbital = {
                        centerX: x,
                        centerY: y,
                        radius: Math.random() * 100 + 50,
                        angle: Math.random() * Math.PI * 2,
                        speed: Math.random() * 2 + 1
                    };
                    particle.isOrbital = true;
                    break;
                    
                case 'nebula':
                    particle.wave = {
                        amplitude: Math.random() * 30 + 10,
                        frequency: Math.random() * 0.02 + 0.01,
                        phase: Math.random() * Math.PI * 2
                    };
                    particle.shouldPulse = true;
                    break;
                    
                case 'stellar':
                    particle.twinkle = {
                        phase: Math.random() * Math.PI * 2,
                        speed: Math.random() * 3 + 1
                    };
                    particle.hasGlow = true;
                    break;
                    
                case 'quantum':
                    particle.quantum = {
                        phase: Math.random() * Math.PI * 2,
                        frequency: Math.random() * 0.1 + 0.05,
                        amplitude: Math.random() * 5 + 2
                    };
                    particle.isMagnetic = true;
                    break;
            }
            
            // Trail initialization
            if (particle.hasTrail) {
                particle.trail = [];
                particle.trailLength = Math.floor(particle.life * 20);
            }
            
            // Add to appropriate array
            this.enhancedParticles.push(particle);
        }
    }
    
    /**
     * Update enhanced particles with complex behaviors
     * This function was mentioned as incomplete in the problem statement
     */
    updateEnhancedParticles(deltaTime) {
        for (let i = this.enhancedParticles.length - 1; i >= 0; i--) {
            const particle = this.enhancedParticles[i];
            
            // Update life
            particle.life -= deltaTime;
            const lifeRatio = particle.life / particle.maxLife;
            
            if (particle.life <= 0) {
                this.returnParticleToPool(particle);
                this.enhancedParticles.splice(i, 1);
                continue;
            }
            
            // Update alpha based on life
            particle.alpha = Math.min(1, lifeRatio * 2);
            
            // Update based on particle type and properties
            this.updateParticleMovement(particle, deltaTime);
            this.updateParticleVisuals(particle, deltaTime);
            this.updateParticleTrail(particle, deltaTime);
            
            // Type-specific updates
            switch (particle.type) {
                case 'explosion':
                    this.updateExplosionParticle(particle, deltaTime);
                    break;
                case 'cosmic':
                    this.updateCosmicParticle(particle, deltaTime);
                    break;
                case 'nebula':
                    this.updateNebulaParticle(particle, deltaTime);
                    break;
                case 'stellar':
                    this.updateStellarParticle(particle, deltaTime);
                    break;
                case 'quantum':
                    this.updateQuantumParticle(particle, deltaTime);
                    break;
            }
        }
    }
    
    /**
     * Update particle movement with various forces
     */
    updateParticleMovement(particle, deltaTime) {
        // Apply gravity
        if (particle.hasGravity) {
            particle.velY += 200 * deltaTime;
        }
        
        // Apply friction
        if (particle.friction) {
            particle.velX *= particle.friction;
            particle.velY *= particle.friction;
        }
        
        // Magnetic field effects
        if (particle.isMagnetic && window.cosmicPongCore) {
            const ball = window.cosmicPongCore.ball;
            if (ball) {
                const dx = ball.x - particle.x;
                const dy = ball.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = 50 / (distance + 1);
                    particle.velX += (dx / distance) * force * deltaTime;
                    particle.velY += (dy / distance) * force * deltaTime;
                }
            }
        }
        
        // Orbital motion
        if (particle.isOrbital && particle.orbital) {
            const orbital = particle.orbital;
            orbital.angle += orbital.speed * deltaTime;
            
            particle.x = orbital.centerX + Math.cos(orbital.angle) * orbital.radius;
            particle.y = orbital.centerY + Math.sin(orbital.angle) * orbital.radius;
            
            // Slowly decay orbit
            orbital.radius *= 0.999;
        } else {
            // Normal movement
            particle.x += particle.velX * deltaTime;
            particle.y += particle.velY * deltaTime;
        }
        
        // Wave motion for certain particles
        if (particle.wave) {
            const wave = particle.wave;
            wave.phase += wave.frequency;
            particle.y += Math.sin(wave.phase) * wave.amplitude * deltaTime;
        }
        
        // Quantum uncertainty
        if (particle.quantum) {
            const quantum = particle.quantum;
            quantum.phase += quantum.frequency;
            
            particle.x += Math.cos(quantum.phase) * quantum.amplitude * deltaTime;
            particle.y += Math.sin(quantum.phase * 1.7) * quantum.amplitude * deltaTime;
        }
    }
    
    /**
     * Update particle visual properties
     */
    updateParticleVisuals(particle, deltaTime) {
        // Size decay
        if (particle.sizeDecay) {
            particle.size *= particle.sizeDecay;
        }
        
        // Pulsing effect
        if (particle.shouldPulse) {
            const pulsePhase = (Date.now() * 0.005) + (particle.x * 0.01);
            const pulseFactor = 1 + Math.sin(pulsePhase) * 0.3;
            particle.renderSize = particle.size * pulseFactor;
        } else {
            particle.renderSize = particle.size;
        }
        
        // Twinkling for stellar particles
        if (particle.twinkle) {
            particle.twinkle.phase += particle.twinkle.speed * deltaTime;
            particle.twinkleAlpha = 0.5 + Math.abs(Math.sin(particle.twinkle.phase)) * 0.5;
        }
    }
    
    /**
     * Update particle trail effects
     */
    updateParticleTrail(particle, deltaTime) {
        if (!particle.hasTrail || !particle.trail) return;
        
        // Add current position to trail
        particle.trail.push({
            x: particle.x,
            y: particle.y,
            life: 1.0,
            size: particle.renderSize
        });
        
        // Update trail points
        for (let j = particle.trail.length - 1; j >= 0; j--) {
            const point = particle.trail[j];
            point.life -= deltaTime * 3;
            
            if (point.life <= 0) {
                particle.trail.splice(j, 1);
            }
        }
        
        // Limit trail length
        while (particle.trail.length > particle.trailLength) {
            particle.trail.shift();
        }
    }
    
    /**
     * Update explosion particles
     */
    updateExplosionParticle(particle, deltaTime) {
        // Additional explosion-specific logic
        const lifeRatio = particle.life / particle.maxLife;
        
        // Change color from white to orange to red
        if (lifeRatio > 0.7) {
            particle.color = '#ffffff';
        } else if (lifeRatio > 0.3) {
            particle.color = '#ffaa00';
        } else {
            particle.color = '#ff4400';
        }
    }
    
    /**
     * Update cosmic particles
     */
    updateCosmicParticle(particle, deltaTime) {
        // Cosmic particles have special glow effects
        if (particle.orbital) {
            // Create trailing effect along orbit
            const intensity = Math.sin(particle.orbital.angle * 3) * 0.5 + 0.5;
            particle.glowIntensity = intensity;
        }
    }
    
    /**
     * Update nebula particles
     */
    updateNebulaParticle(particle, deltaTime) {
        // Nebula particles drift slowly and pulse
        particle.velX += (Math.random() - 0.5) * 10 * deltaTime;
        particle.velY += (Math.random() - 0.5) * 10 * deltaTime;
        
        // Damping to prevent excessive movement
        particle.velX *= 0.99;
        particle.velY *= 0.99;
    }
    
    /**
     * Update stellar particles (stars)
     */
    updateStellarParticle(particle, deltaTime) {
        // Stars mostly stay in place but twinkle
        particle.velX *= 0.98;
        particle.velY *= 0.98;
    }
    
    /**
     * Update quantum particles
     */
    updateQuantumParticle(particle, deltaTime) {
        // Quantum particles have uncertainty in position
        if (Math.random() < 0.1) {
            particle.x += (Math.random() - 0.5) * 20;
            particle.y += (Math.random() - 0.5) * 20;
        }
    }
    
    /**
     * Create cosmic background particles
     */
    createCosmicParticles() {
        const container = document.getElementById('cosmicParticles');
        if (!container) return;
        
        container.innerHTML = '';
        
        const particleCount = Math.floor(50 * this.qualityMultiplier);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            // Random color variation
            const hue = Math.random() * 60 + 180; // Blue to cyan range
            particle.style.background = `hsl(${hue}, 100%, 70%)`;
            particle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 70%)`;
            
            container.appendChild(particle);
        }
    }
    
    /**
     * Update cosmic background particles
     */
    updateCosmicParticles(deltaTime) {
        this.cosmicWave += deltaTime;
        
        // Update CSS custom properties for animation
        document.documentElement.style.setProperty('--cosmic-wave', Math.sin(this.cosmicWave) * 0.5 + 0.5);
    }
    
    /**
     * Create enhanced background particles
     */
    createEnhancedBackground() {
        const container = document.getElementById('enhancedParticles');
        if (!container) return;
        
        container.innerHTML = '';
        
        const particleCount = Math.floor(30 * this.qualityMultiplier);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'enhanced-particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
            
            // Random color (purple to pink range)
            const hue = Math.random() * 60 + 280;
            particle.style.background = `hsl(${hue}, 100%, 70%)`;
            particle.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 70%)`;
            
            container.appendChild(particle);
        }
    }
    
    /**
     * Create galaxy spiral effect
     */
    createGalaxySpiral() {
        const container = document.getElementById('galaxySpiral');
        if (!container) return;
        
        container.innerHTML = '';
        
        const spiralArms = 3;
        const pointsPerArm = Math.floor(20 * this.qualityMultiplier);
        
        for (let arm = 0; arm < spiralArms; arm++) {
            for (let point = 0; point < pointsPerArm; point++) {
                const spiral = document.createElement('div');
                spiral.className = 'galaxy-point';
                
                const t = point / pointsPerArm;
                const armAngle = (arm / spiralArms) * Math.PI * 2;
                const spiralAngle = armAngle + t * Math.PI * 4;
                const radius = t * 200;
                
                const x = 50 + (Math.cos(spiralAngle) * radius / window.innerWidth * 100);
                const y = 50 + (Math.sin(spiralAngle) * radius / window.innerHeight * 100);
                
                spiral.style.left = x + '%';
                spiral.style.top = y + '%';
                spiral.style.animationDelay = (t * 2) + 's';
                
                // Size based on position in spiral
                const size = (1 - t) * 3 + 1;
                spiral.style.width = size + 'px';
                spiral.style.height = size + 'px';
                
                container.appendChild(spiral);
            }
        }
    }
    
    /**
     * Update galaxy spiral rotation
     */
    updateGalaxySpiral(deltaTime) {
        this.galaxyRotation += deltaTime * 0.1;
        
        const container = document.getElementById('galaxySpiral');
        if (container) {
            container.style.transform = `translate(-50%, -50%) rotate(${this.galaxyRotation}rad)`;
        }
    }
    
    /**
     * Create starfield background
     */
    createStarfield() {
        const container = document.getElementById('starfield');
        if (!container) return;
        
        container.innerHTML = '';
        
        const starCount = Math.floor(200 * this.qualityMultiplier);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random size and brightness
            const type = Math.random();
            if (type < 0.1) {
                star.classList.add('large');
            } else if (type < 0.3) {
                star.classList.add('moving');
            }
            
            // Random twinkle timing
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            container.appendChild(star);
        }
    }
    
    /**
     * Create nebulae effects
     */
    createNebulae() {
        const container = document.getElementById('nebulae');
        if (!container) return;
        
        // Nebulae are created via CSS, just update their animation
        this.nebulaePulse = 0;
    }
    
    /**
     * Update nebulae effects
     */
    updateNebulae(deltaTime) {
        this.nebulaePulse += deltaTime * 0.5;
        
        const nebulae = document.querySelectorAll('.nebula');
        nebulae.forEach((nebula, index) => {
            const phase = this.nebulaePulse + (index * Math.PI / 3);
            const opacity = 0.1 + Math.sin(phase) * 0.1;
            nebula.style.opacity = opacity;
        });
    }
    
    /**
     * Particle pool management for performance
     */
    initializeParticlePool() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push(this.createEmptyParticle());
        }
    }
    
    createEmptyParticle() {
        return {
            x: 0, y: 0, velX: 0, velY: 0,
            size: 0, life: 0, alpha: 0,
            color: '#ffffff', type: '',
            inUse: false
        };
    }
    
    getParticleFromPool() {
        for (const particle of this.particlePool) {
            if (!particle.inUse) {
                particle.inUse = true;
                return particle;
            }
        }
        return null; // Pool exhausted
    }
    
    returnParticleToPool(particle) {
        particle.inUse = false;
        // Clear particle properties
        Object.assign(particle, this.createEmptyParticle());
    }
    
    /**
     * Start cosmic background effects
     */
    startCosmicEffects() {
        this.createCosmicParticles();
        this.createEnhancedBackground();
        this.createGalaxySpiral();
        this.createNebulae();
        
        // Start update loop for background effects
        this.startBackgroundLoop();
    }
    
    /**
     * Background animation loop
     */
    startBackgroundLoop() {
        let lastTime = 0;
        
        const loop = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;
            
            this.updateCosmicParticles(deltaTime);
            this.updateGalaxySpiral(deltaTime);
            this.updateNebulae(deltaTime);
            
            requestAnimationFrame(loop);
        };
        
        requestAnimationFrame(loop);
    }
    
    /**
     * Set particle quality based on performance settings
     */
    setParticleQuality(quality) {
        switch (quality) {
            case 'low':
                this.qualityMultiplier = 0.3;
                break;
            case 'medium':
                this.qualityMultiplier = 0.7;
                break;
            case 'high':
                this.qualityMultiplier = 1.0;
                break;
            case 'ultra':
                this.qualityMultiplier = 1.5;
                break;
            default:
                this.qualityMultiplier = 1.0;
        }
        
        // Recreate background effects with new quality
        this.startCosmicEffects();
    }
    
    /**
     * Render enhanced particles to canvas
     */
    renderEnhancedParticles(ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        for (const particle of this.enhancedParticles) {
            this.renderSingleParticle(ctx, particle);
        }
        
        ctx.restore();
    }
    
    /**
     * Render a single enhanced particle
     */
    renderSingleParticle(ctx, particle) {
        if (particle.alpha <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        
        // Render trail first
        if (particle.hasTrail && particle.trail) {
            this.renderParticleTrail(ctx, particle);
        }
        
        // Render glow effect
        if (particle.hasGlow) {
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = particle.renderSize * 2;
        }
        
        // Render particle based on type
        switch (particle.type) {
            case 'explosion':
                this.renderExplosionParticle(ctx, particle);
                break;
            case 'cosmic':
                this.renderCosmicParticle(ctx, particle);
                break;
            case 'nebula':
                this.renderNebulaParticle(ctx, particle);
                break;
            case 'stellar':
                this.renderStellarParticle(ctx, particle);
                break;
            case 'quantum':
                this.renderQuantumParticle(ctx, particle);
                break;
            default:
                this.renderDefaultParticle(ctx, particle);
        }
        
        ctx.restore();
    }
    
    /**
     * Render particle trail
     */
    renderParticleTrail(ctx, particle) {
        if (!particle.trail || particle.trail.length === 0) return;
        
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = particle.alpha * 0.5;
        
        ctx.beginPath();
        for (let i = 0; i < particle.trail.length; i++) {
            const point = particle.trail[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
    }
    
    /**
     * Render different particle types
     */
    renderExplosionParticle(ctx, particle) {
        ctx.fillStyle = particle.color;
        ctx.fillRect(
            particle.x - particle.renderSize / 2,
            particle.y - particle.renderSize / 2,
            particle.renderSize,
            particle.renderSize
        );
    }
    
    renderCosmicParticle(ctx, particle) {
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.renderSize
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.renderSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderNebulaParticle(ctx, particle) {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha *= 0.7;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.renderSize * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderStellarParticle(ctx, particle) {
        if (particle.twinkleAlpha) {
            ctx.globalAlpha *= particle.twinkleAlpha;
        }
        
        // Draw star shape
        const spikes = 4;
        const outerRadius = particle.renderSize;
        const innerRadius = outerRadius * 0.5;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = particle.x + Math.cos(angle) * radius;
            const y = particle.y + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
    }
    
    renderQuantumParticle(ctx, particle) {
        // Render multiple overlapping circles for quantum uncertainty
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * particle.renderSize;
            const offsetY = (Math.random() - 0.5) * particle.renderSize;
            
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha * 0.3;
            ctx.beginPath();
            ctx.arc(
                particle.x + offsetX,
                particle.y + offsetY,
                particle.renderSize / 2,
                0, Math.PI * 2
            );
            ctx.fill();
        }
    }
    
    renderDefaultParticle(ctx, particle) {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.renderSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    /**
     * Clean up resources
     */
    cleanup() {
        this.enhancedParticles = [];
        this.cosmicParticles = [];
        this.particlePool.forEach(p => p.inUse = false);
    }
}

// Export for use in other modules
window.CosmicParticleSystem = CosmicParticleSystem;