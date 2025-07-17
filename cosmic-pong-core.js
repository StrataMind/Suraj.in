/**
 * ============================================
 * COSMIC PONG - CORE GAME MECHANICS
 * ============================================
 * Core game engine and physics system
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Game Core Class - Main game engine
 */
class CosmicPongCore {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.gameMode = 'singlePlayer'; // singlePlayer, multiPlayer, tournament, practice
        
        // Game settings
        this.settings = {
            masterVolume: 0.75,
            sfxVolume: 0.8,
            musicVolume: 0.6,
            difficulty: 'normal',
            particleQuality: 'medium',
            enableShake: true,
            enableTrails: true,
            enablePowerups: true
        };
        
        // Game objects
        this.ball = null;
        this.player1 = null;
        this.player2 = null;
        this.powerups = [];
        this.particles = [];
        this.trails = [];
        
        // Game stats
        this.gameStats = {
            player1Score: 0,
            player2Score: 0,
            gameTime: 0,
            ballSpeed: 5,
            maxScore: 11,
            powerupSpawnTimer: 0,
            lastPowerupSpawn: 0
        };
        
        // Input handling
        this.keys = {};
        this.lastKeys = {};
        
        // Performance
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fps = 60;
        this.frameCount = 0;
        
        // Screen shake
        this.screenShake = { x: 0, y: 0, intensity: 0, duration: 0 };
        
        this.init();
    }
    
    /**
     * Initialize the game core
     */
    init() {
        this.setupCanvas();
        this.setupInputHandlers();
        this.loadSettings();
        this.createGameObjects();
        this.initializeParticleSystem();
        this.startGameLoop();
    }
    
    /**
     * Initialize particle system integration
     */
    initializeParticleSystem() {
        // Create global particle system instance
        if (!window.cosmicParticleSystem) {
            window.cosmicParticleSystem = new CosmicParticleSystem();
        }
    }
    
    /**
     * Setup canvas and context
     */
    setupCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        if (!this.canvas || !this.ctx) {
            throw new Error('Failed to initialize canvas');
        }
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Disable image smoothing for pixel-perfect rendering
        this.ctx.imageSmoothingEnabled = false;
    }
    
    /**
     * Resize canvas maintaining aspect ratio
     */
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        const aspectRatio = 1200 / 800;
        let newWidth = containerWidth;
        let newHeight = containerWidth / aspectRatio;
        
        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = containerHeight * aspectRatio;
        }
        
        this.canvas.style.width = newWidth + 'px';
        this.canvas.style.height = newHeight + 'px';
    }
    
    /**
     * Setup input event handlers
     */
    setupInputHandlers() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Focus handling
        window.addEventListener('blur', () => this.pauseGame());
        window.addEventListener('focus', () => this.resumeGame());
    }
    
    /**
     * Handle key down events
     */
    handleKeyDown(e) {
        this.keys[e.code] = true;
        
        // Handle special keys
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePause();
                break;
            case 'KeyR':
                if (this.gameState === 'playing' || this.gameState === 'paused') {
                    this.restartGame();
                }
                break;
            case 'Escape':
                this.returnToMenu();
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
            case 'KeyH':
                this.toggleControls();
                break;
        }
    }
    
    /**
     * Handle key up events
     */
    handleKeyUp(e) {
        this.keys[e.code] = false;
    }
    
    /**
     * Handle touch events for mobile
     */
    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        
        // Convert touch to paddle movement
        if (x < this.canvas.width / 2) {
            // Left side - Player 1
            if (y < this.canvas.height / 2) {
                this.keys['KeyW'] = true;
                this.keys['KeyS'] = false;
            } else {
                this.keys['KeyW'] = false;
                this.keys['KeyS'] = true;
            }
        } else {
            // Right side - Player 2 (if multiplayer)
            if (this.gameMode === 'multiPlayer') {
                if (y < this.canvas.height / 2) {
                    this.keys['KeyI'] = true;
                    this.keys['KeyK'] = false;
                } else {
                    this.keys['KeyI'] = false;
                    this.keys['KeyK'] = true;
                }
            }
        }
    }
    
    /**
     * Handle touch end events
     */
    handleTouchEnd(e) {
        e.preventDefault();
        // Stop all movement
        this.keys['KeyW'] = false;
        this.keys['KeyS'] = false;
        this.keys['KeyI'] = false;
        this.keys['KeyK'] = false;
    }
    
    /**
     * Create game objects
     */
    createGameObjects() {
        // Create ball
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            width: 12,
            height: 12,
            velX: 0,
            velY: 0,
            speed: 5,
            maxSpeed: 15,
            trail: []
        };
        
        // Create paddles
        const paddleWidth = 12;
        const paddleHeight = 80;
        
        this.player1 = {
            x: 30,
            y: this.canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight,
            speed: 6,
            score: 0,
            powerups: [],
            lastHit: 0
        };
        
        this.player2 = {
            x: this.canvas.width - 30 - paddleWidth,
            y: this.canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight,
            speed: 6,
            score: 0,
            powerups: [],
            lastHit: 0,
            isAI: this.gameMode === 'singlePlayer' || this.gameMode === 'practice'
        };
        
        this.resetBall();
    }
    
    /**
     * Reset ball to center with random direction
     */
    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        
        // Random direction
        const angle = (Math.random() - 0.5) * Math.PI / 3; // ±30 degrees
        const direction = Math.random() < 0.5 ? 1 : -1;
        
        this.ball.velX = Math.cos(angle) * this.ball.speed * direction;
        this.ball.velY = Math.sin(angle) * this.ball.speed;
        
        this.ball.trail = [];
    }
    
    /**
     * Start the main game loop
     */
    startGameLoop() {
        const gameLoop = (currentTime) => {
            this.deltaTime = (currentTime - this.lastTime) / 1000;
            this.lastTime = currentTime;
            
            // Cap delta time to prevent large jumps
            this.deltaTime = Math.min(this.deltaTime, 1/30);
            
            this.update(this.deltaTime);
            this.render();
            
            this.frameCount++;
            
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    }
    
    /**
     * Update game state
     */
    update(dt) {
        if (this.gameState !== 'playing') return;
        
        this.updateInput();
        this.updatePaddles(dt);
        this.updateBall(dt);
        this.updatePowerups(dt);
        this.updateParticles(dt);
        this.updateTrails(dt);
        this.updateScreenShake(dt);
        this.checkCollisions();
        this.updateGameStats(dt);
    }
    
    /**
     * Update input state
     */
    updateInput() {
        this.lastKeys = { ...this.keys };
    }
    
    /**
     * Update paddle positions
     */
    updatePaddles(dt) {
        // Player 1 controls
        if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            this.player1.y -= this.player1.speed * 60 * dt;
        }
        if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            this.player1.y += this.player1.speed * 60 * dt;
        }
        
        // Player 2 controls (human or AI)
        if (this.player2.isAI) {
            this.updateAI(dt);
        } else {
            if (this.keys['KeyI']) {
                this.player2.y -= this.player2.speed * 60 * dt;
            }
            if (this.keys['KeyK']) {
                this.player2.y += this.player2.speed * 60 * dt;
            }
        }
        
        // Keep paddles within bounds
        this.player1.y = Math.max(0, Math.min(this.canvas.height - this.player1.height, this.player1.y));
        this.player2.y = Math.max(0, Math.min(this.canvas.height - this.player2.height, this.player2.y));
    }
    
    /**
     * Simple AI for player 2
     */
    updateAI(dt) {
        const difficulty = this.settings.difficulty;
        const paddleCenter = this.player2.y + this.player2.height / 2;
        const ballCenter = this.ball.y + this.ball.height / 2;
        
        let aiSpeed = this.player2.speed;
        let prediction = ballCenter;
        
        // Adjust AI based on difficulty
        switch (difficulty) {
            case 'easy':
                aiSpeed *= 0.6;
                prediction += (Math.random() - 0.5) * 100;
                break;
            case 'normal':
                aiSpeed *= 0.8;
                prediction += (Math.random() - 0.5) * 50;
                break;
            case 'hard':
                aiSpeed *= 1.0;
                prediction += (Math.random() - 0.5) * 25;
                break;
            case 'insane':
                aiSpeed *= 1.2;
                // Perfect prediction
                break;
        }
        
        // Move towards predicted position
        const diff = prediction - paddleCenter;
        if (Math.abs(diff) > 5) {
            if (diff > 0) {
                this.player2.y += aiSpeed * 60 * dt;
            } else {
                this.player2.y -= aiSpeed * 60 * dt;
            }
        }
    }
    
    /**
     * Update ball physics
     */
    updateBall(dt) {
        // Update position
        this.ball.x += this.ball.velX * 60 * dt;
        this.ball.y += this.ball.velY * 60 * dt;
        
        // Add to trail
        if (this.settings.enableTrails) {
            this.ball.trail.push({
                x: this.ball.x + this.ball.width / 2,
                y: this.ball.y + this.ball.height / 2,
                life: 1.0
            });
            
            // Limit trail length
            if (this.ball.trail.length > 20) {
                this.ball.trail.shift();
            }
        }
        
        // Top and bottom wall collisions
        if (this.ball.y <= 0 || this.ball.y >= this.canvas.height - this.ball.height) {
            this.ball.velY = -this.ball.velY;
            this.ball.y = this.ball.y <= 0 ? 0 : this.canvas.height - this.ball.height;
            
            this.playSound('wallHit');
            this.createImpactParticles(this.ball.x, this.ball.y);
            this.addScreenShake(2, 100);
        }
        
        // Score when ball goes off screen
        if (this.ball.x <= -this.ball.width) {
            this.scorePoint('player2');
        } else if (this.ball.x >= this.canvas.width) {
            this.scorePoint('player1');
        }
    }
    
    /**
     * Update powerups
     */
    updatePowerups(dt) {
        // Spawn powerups
        if (this.settings.enablePowerups) {
            this.gameStats.powerupSpawnTimer += dt;
            if (this.gameStats.powerupSpawnTimer - this.gameStats.lastPowerupSpawn > 10) {
                this.spawnPowerup();
                this.gameStats.lastPowerupSpawn = this.gameStats.powerupSpawnTimer;
            }
        }
        
        // Update existing powerups
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            powerup.rotation += powerup.rotationSpeed * dt;
            powerup.life -= dt;
            
            // Remove expired powerups
            if (powerup.life <= 0) {
                this.powerups.splice(i, 1);
            }
        }
    }
    
    /**
     * Update particles
     */
    updateParticles(dt) {
        // Update basic particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.velX * dt;
            particle.y += particle.velY * dt;
            particle.life -= dt;
            particle.size *= 0.98;
            
            // Apply gravity to some particles
            if (particle.hasGravity) {
                particle.velY += 200 * dt;
            }
            
            if (particle.life <= 0 || particle.size <= 0.1) {
                this.particles.splice(i, 1);
            }
        }
        
        // Update enhanced particles if particle system is available
        if (window.cosmicParticleSystem) {
            window.cosmicParticleSystem.updateEnhancedParticles(dt);
        }
    }
    
    /**
     * Update ball trails
     */
    updateTrails(dt) {
        for (let i = this.ball.trail.length - 1; i >= 0; i--) {
            const trail = this.ball.trail[i];
            trail.life -= dt * 2;
            
            if (trail.life <= 0) {
                this.ball.trail.splice(i, 1);
            }
        }
    }
    
    /**
     * Update screen shake effect
     */
    updateScreenShake(dt) {
        if (this.screenShake.duration > 0) {
            this.screenShake.duration -= dt * 1000;
            const intensity = this.screenShake.intensity * (this.screenShake.duration / 1000);
            
            this.screenShake.x = (Math.random() - 0.5) * intensity;
            this.screenShake.y = (Math.random() - 0.5) * intensity;
        } else {
            this.screenShake.x = 0;
            this.screenShake.y = 0;
        }
    }
    
    /**
     * Check for collisions
     */
    checkCollisions() {
        // Ball vs Paddles
        this.checkPaddleCollision(this.player1);
        this.checkPaddleCollision(this.player2);
        
        // Ball vs Powerups
        if (this.settings.enablePowerups) {
            this.checkPowerupCollisions();
        }
    }
    
    /**
     * Check collision between ball and paddle
     */
    checkPaddleCollision(paddle) {
        if (this.ball.x < paddle.x + paddle.width &&
            this.ball.x + this.ball.width > paddle.x &&
            this.ball.y < paddle.y + paddle.height &&
            this.ball.y + this.ball.height > paddle.y) {
            
            // Calculate collision point
            const paddleCenter = paddle.y + paddle.height / 2;
            const ballCenter = this.ball.y + this.ball.height / 2;
            const diff = ballCenter - paddleCenter;
            const normalizedDiff = diff / (paddle.height / 2);
            
            // Reverse X velocity and apply angle based on hit position
            this.ball.velX = -this.ball.velX;
            this.ball.velY = normalizedDiff * this.ball.speed * 0.5;
            
            // Increase ball speed slightly
            const currentSpeed = Math.sqrt(this.ball.velX * this.ball.velX + this.ball.velY * this.ball.velY);
            if (currentSpeed < this.ball.maxSpeed) {
                const speedMultiplier = 1.05;
                this.ball.velX *= speedMultiplier;
                this.ball.velY *= speedMultiplier;
            }
            
            // Move ball out of paddle
            if (paddle === this.player1) {
                this.ball.x = paddle.x + paddle.width;
            } else {
                this.ball.x = paddle.x - this.ball.width;
            }
            
            paddle.lastHit = Date.now();
            
            this.playSound('paddleHit');
            this.createImpactParticles(this.ball.x, this.ball.y);
            this.addScreenShake(3, 150);
        }
    }
    
    /**
     * Check powerup collisions
     */
    checkPowerupCollisions() {
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            
            if (this.ball.x < powerup.x + powerup.size &&
                this.ball.x + this.ball.width > powerup.x &&
                this.ball.y < powerup.y + powerup.size &&
                this.ball.y + this.ball.height > powerup.y) {
                
                this.activatePowerup(powerup);
                this.powerups.splice(i, 1);
            }
        }
    }
    
    /**
     * Spawn a new powerup
     */
    spawnPowerup() {
        const types = ['speedBoost', 'sizeIncrease', 'multiball', 'freeze'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const powerup = {
            x: this.canvas.width * 0.3 + Math.random() * this.canvas.width * 0.4,
            y: this.canvas.height * 0.2 + Math.random() * this.canvas.height * 0.6,
            size: 30,
            type: type,
            rotation: 0,
            rotationSpeed: 2,
            life: 8, // 8 seconds
            pulsePhase: 0
        };
        
        this.powerups.push(powerup);
    }
    
    /**
     * Activate a collected powerup
     */
    activatePowerup(powerup) {
        this.playSound('powerup');
        this.createPowerupParticles(powerup.x, powerup.y, powerup.type);
        
        switch (powerup.type) {
            case 'speedBoost':
                const currentSpeed = Math.sqrt(this.ball.velX * this.ball.velX + this.ball.velY * this.ball.velY);
                this.ball.velX *= 1.5;
                this.ball.velY *= 1.5;
                setTimeout(() => {
                    this.ball.velX /= 1.5;
                    this.ball.velY /= 1.5;
                }, 3000);
                break;
                
            case 'sizeIncrease':
                this.ball.width *= 1.5;
                this.ball.height *= 1.5;
                setTimeout(() => {
                    this.ball.width /= 1.5;
                    this.ball.height /= 1.5;
                }, 5000);
                break;
                
            case 'freeze':
                const originalSpeed = { x: this.ball.velX, y: this.ball.velY };
                this.ball.velX *= 0.3;
                this.ball.velY *= 0.3;
                setTimeout(() => {
                    this.ball.velX = originalSpeed.x;
                    this.ball.velY = originalSpeed.y;
                }, 2000);
                break;
        }
    }
    
    /**
     * Handle scoring
     */
    scorePoint(player) {
        if (player === 'player1') {
            this.gameStats.player1Score++;
            this.player1.score++;
        } else {
            this.gameStats.player2Score++;
            this.player2.score++;
        }
        
        this.updateScoreDisplay();
        this.playSound('score');
        
        // Check for game end
        if (this.gameStats.player1Score >= this.gameStats.maxScore || 
            this.gameStats.player2Score >= this.gameStats.maxScore) {
            this.endGame();
        } else {
            this.resetBall();
            // Brief pause before next round
            this.ball.velX = 0;
            this.ball.velY = 0;
            setTimeout(() => {
                if (this.gameState === 'playing') {
                    this.resetBall();
                }
            }, 1000);
        }
    }
    
    /**
     * Update game statistics
     */
    updateGameStats(dt) {
        this.gameStats.gameTime += dt;
        this.updateTimerDisplay();
    }
    
    /**
     * Create impact particles
     */
    createImpactParticles(x, y) {
        const particleCount = this.getParticleCount(8);
        
        // Basic particles
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                velX: (Math.random() - 0.5) * 200,
                velY: (Math.random() - 0.5) * 200,
                size: Math.random() * 3 + 1,
                life: Math.random() * 0.5 + 0.5,
                color: `hsl(${180 + Math.random() * 60}, 100%, 70%)`,
                hasGravity: false
            });
        }
        
        // Enhanced particles
        if (window.cosmicParticleSystem) {
            window.cosmicParticleSystem.createEnhancedParticles(
                x, y, 'explosion', particleCount,
                {
                    velocity: { min: 100, max: 300 },
                    size: { min: 2, max: 6 },
                    life: { min: 0.5, max: 1.5 },
                    color: '#00f4ff',
                    glow: true,
                    trail: true
                }
            );
        }
    }
    
    /**
     * Create powerup particles
     */
    createPowerupParticles(x, y, type) {
        const colors = {
            speedBoost: 'hsl(0, 100%, 70%)',
            sizeIncrease: 'hsl(120, 100%, 70%)',
            multiball: 'hsl(240, 100%, 70%)',
            freeze: 'hsl(180, 100%, 70%)'
        };
        
        const particleCount = this.getParticleCount(15);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                velX: (Math.random() - 0.5) * 300,
                velY: (Math.random() - 0.5) * 300,
                size: Math.random() * 4 + 2,
                life: Math.random() * 1 + 1,
                color: colors[type] || 'white',
                hasGravity: true
            });
        }
    }
    
    /**
     * Get particle count based on quality settings
     */
    getParticleCount(baseCount) {
        switch (this.settings.particleQuality) {
            case 'low': return Math.floor(baseCount * 0.5);
            case 'medium': return baseCount;
            case 'high': return Math.floor(baseCount * 1.5);
            case 'ultra': return baseCount * 2;
            default: return baseCount;
        }
    }
    
    /**
     * Add screen shake effect
     */
    addScreenShake(intensity, duration) {
        if (this.settings.enableShake) {
            this.screenShake.intensity = intensity;
            this.screenShake.duration = duration;
        }
    }
    
    /**
     * Render the game
     */
    render() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply screen shake
        this.ctx.save();
        this.ctx.translate(this.screenShake.x, this.screenShake.y);
        
        // Render game objects based on game state
        if (this.gameState === 'playing' || this.gameState === 'paused') {
            this.renderBackground();
            this.renderTrails();
            this.renderPaddles();
            this.renderBall();
            this.renderPowerups();
            this.renderParticles();
        }
        
        // Render enhanced particles if particle system is available
        if (window.cosmicParticleSystem) {
            window.cosmicParticleSystem.renderEnhancedParticles(this.ctx);
        }
        
        this.renderUI();
        
        this.ctx.restore();
    }
    
    /**
     * Render background effects
     */
    renderBackground() {
        // Center line
        this.ctx.strokeStyle = 'rgba(0, 244, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([10, 10]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }
    
    /**
     * Render ball trails
     */
    renderTrails() {
        if (!this.settings.enableTrails || this.ball.trail.length === 0) return;
        
        this.ctx.globalCompositeOperation = 'lighter';
        
        for (let i = 0; i < this.ball.trail.length; i++) {
            const trail = this.ball.trail[i];
            const alpha = trail.life * 0.5;
            const size = 3 + (trail.life * 5);
            
            this.ctx.fillStyle = `rgba(0, 244, 255, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    /**
     * Render paddles
     */
    renderPaddles() {
        // Player 1 paddle
        this.renderPaddle(this.player1, '#00f4ff');
        
        // Player 2 paddle
        this.renderPaddle(this.player2, '#ff0080');
    }
    
    /**
     * Render individual paddle
     */
    renderPaddle(paddle, color) {
        // Glow effect
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 10;
        
        // Paddle body
        this.ctx.fillStyle = color;
        this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        
        // Hit flash effect
        const timeSinceHit = Date.now() - paddle.lastHit;
        if (timeSinceHit < 200) {
            const flashIntensity = 1 - (timeSinceHit / 200);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.8})`;
            this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }
        
        this.ctx.shadowBlur = 0;
    }
    
    /**
     * Render ball
     */
    renderBall() {
        // Glow effect
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 15;
        
        // Ball body
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        
        this.ctx.shadowBlur = 0;
    }
    
    /**
     * Render powerups
     */
    renderPowerups() {
        for (const powerup of this.powerups) {
            this.ctx.save();
            this.ctx.translate(powerup.x + powerup.size / 2, powerup.y + powerup.size / 2);
            this.ctx.rotate(powerup.rotation);
            
            // Pulse effect
            powerup.pulsePhase += 0.1;
            const scale = 1 + Math.sin(powerup.pulsePhase) * 0.1;
            this.ctx.scale(scale, scale);
            
            // Powerup colors
            const colors = {
                speedBoost: '#ff4444',
                sizeIncrease: '#44ff44',
                multiball: '#4444ff',
                freeze: '#44ffff'
            };
            
            // Glow
            this.ctx.shadowColor = colors[powerup.type];
            this.ctx.shadowBlur = 20;
            
            // Draw powerup
            this.ctx.fillStyle = colors[powerup.type];
            this.ctx.fillRect(-powerup.size / 2, -powerup.size / 2, powerup.size, powerup.size);
            
            // Icon
            this.ctx.fillStyle = 'white';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const icons = {
                speedBoost: '⚡',
                sizeIncrease: '⬆',
                multiball: '●',
                freeze: '❄'
            };
            
            this.ctx.fillText(icons[powerup.type], 0, 0);
            
            this.ctx.restore();
        }
    }
    
    /**
     * Render particles
     */
    renderParticles() {
        this.ctx.globalCompositeOperation = 'lighter';
        
        for (const particle of this.particles) {
            const alpha = particle.life;
            this.ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    /**
     * Render UI elements
     */
    renderUI() {
        // Performance info (debug mode)
        if (window.DEBUG_MODE) {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`FPS: ${Math.round(1 / this.deltaTime)}`, 10, 20);
            this.ctx.fillText(`Particles: ${this.particles.length}`, 10, 35);
        }
    }
    
    /**
     * Game state management methods
     */
    startGame(mode = 'singlePlayer') {
        this.gameMode = mode;
        this.gameState = 'playing';
        this.gameStats.player1Score = 0;
        this.gameStats.player2Score = 0;
        this.gameStats.gameTime = 0;
        
        this.player1.score = 0;
        this.player2.score = 0;
        this.player2.isAI = mode === 'singlePlayer' || mode === 'practice';
        
        this.createGameObjects();
        this.updateScoreDisplay();
        this.showGameContainer();
    }
    
    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.showPauseMenu();
        }
    }
    
    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.hidePauseMenu();
        }
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.pauseGame();
        } else if (this.gameState === 'paused') {
            this.resumeGame();
        }
    }
    
    restartGame() {
        this.startGame(this.gameMode);
    }
    
    endGame() {
        this.gameState = 'gameOver';
        const winner = this.gameStats.player1Score > this.gameStats.player2Score ? 'Player 1' : 'Player 2';
        this.showGameStatus(`${winner} Wins!`);
        
        // Update statistics
        this.updateGameStatistics();
        
        // Return to menu after delay
        setTimeout(() => {
            this.returnToMenu();
        }, 3000);
    }
    
    returnToMenu() {
        this.gameState = 'menu';
        this.hideGameContainer();
        this.showMainMenu();
    }
    
    /**
     * UI Management methods
     */
    showGameContainer() {
        const gameContainer = document.getElementById('gameContainer');
        const mainMenu = document.getElementById('mainMenu');
        
        gameContainer.classList.add('active');
        mainMenu.classList.remove('active');
    }
    
    hideGameContainer() {
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.classList.remove('active');
    }
    
    showMainMenu() {
        const mainMenu = document.getElementById('mainMenu');
        mainMenu.classList.add('active');
    }
    
    showPauseMenu() {
        const pauseMenu = document.getElementById('pauseMenu');
        pauseMenu.classList.add('active');
    }
    
    hidePauseMenu() {
        const pauseMenu = document.getElementById('pauseMenu');
        pauseMenu.classList.remove('active');
    }
    
    showGameStatus(message) {
        const gameStatus = document.getElementById('gameStatus');
        gameStatus.textContent = message;
        gameStatus.classList.add('visible');
        
        setTimeout(() => {
            gameStatus.classList.remove('visible');
        }, 2000);
    }
    
    updateScoreDisplay() {
        document.getElementById('player1Score').textContent = this.gameStats.player1Score;
        document.getElementById('player2Score').textContent = this.gameStats.player2Score;
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.gameStats.gameTime / 60);
        const seconds = Math.floor(this.gameStats.gameTime % 60);
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('gameTimer').textContent = timeString;
    }
    
    /**
     * Utility methods
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    toggleControls() {
        const controlsModal = document.getElementById('controlsModal');
        controlsModal.classList.toggle('active');
    }
    
    playSound(soundName) {
        // Will be implemented in audio system
        if (window.cosmicPongAudio) {
            window.cosmicPongAudio.playSound(soundName);
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('cosmicPongSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }
    
    saveSettings() {
        localStorage.setItem('cosmicPongSettings', JSON.stringify(this.settings));
    }
    
    updateGameStatistics() {
        // Update stored game statistics
        const stats = JSON.parse(localStorage.getItem('cosmicPongStats') || '{}');
        
        stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
        stats.totalPlayTime = (stats.totalPlayTime || 0) + this.gameStats.gameTime;
        
        if (this.gameStats.player1Score > this.gameStats.player2Score) {
            stats.wins = (stats.wins || 0) + 1;
        }
        
        stats.highScore = Math.max(stats.highScore || 0, Math.max(this.gameStats.player1Score, this.gameStats.player2Score));
        
        localStorage.setItem('cosmicPongStats', JSON.stringify(stats));
        this.updateStatsDisplay();
    }
    
    updateStatsDisplay() {
        const stats = JSON.parse(localStorage.getItem('cosmicPongStats') || '{}');
        
        document.getElementById('highScore').textContent = stats.highScore || 0;
        document.getElementById('gamesPlayed').textContent = stats.gamesPlayed || 0;
        
        const winRate = stats.gamesPlayed ? Math.round((stats.wins || 0) / stats.gamesPlayed * 100) : 0;
        document.getElementById('winRate').textContent = winRate + '%';
    }
}

// Export for use in other modules
window.CosmicPongCore = CosmicPongCore;