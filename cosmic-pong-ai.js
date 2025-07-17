/**
 * ============================================
 * COSMIC PONG - AI SYSTEM
 * ============================================
 * Advanced AI with multiple personalities and difficulty levels
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * AI System Class
 * Handles intelligent opponent behavior with multiple personalities
 */
class CosmicPongAI {
    constructor() {
        this.difficulty = 'normal';
        this.personality = 'balanced';
        this.reactionTime = 0.2;
        this.accuracy = 0.8;
        this.aggressiveness = 0.5;
        this.adaptability = 0.5;
        
        // AI state
        this.targetY = 0;
        this.lastBallPosition = { x: 0, y: 0 };
        this.ballPrediction = { x: 0, y: 0 };
        this.decisionTimer = 0;
        this.lastDecisionTime = 0;
        
        // Learning system
        this.playerBehavior = {
            averageHitHeight: 0.5,
            preferredAngles: [],
            reactionPattern: [],
            adaptationScore: 0
        };
        
        // Personality traits
        this.personalities = {
            balanced: {
                reactionSpeed: 1.0,
                accuracy: 0.8,
                aggressiveness: 0.5,
                adaptability: 0.5,
                description: 'Well-rounded player'
            },
            defensive: {
                reactionSpeed: 1.2,
                accuracy: 0.9,
                aggressiveness: 0.2,
                adaptability: 0.3,
                description: 'Focuses on blocking shots'
            },
            aggressive: {
                reactionSpeed: 0.9,
                accuracy: 0.7,
                aggressiveness: 0.9,
                adaptability: 0.4,
                description: 'Takes risks for powerful shots'
            },
            adaptive: {
                reactionSpeed: 1.0,
                accuracy: 0.8,
                aggressiveness: 0.6,
                adaptability: 0.9,
                description: 'Learns and adapts to player'
            },
            unpredictable: {
                reactionSpeed: 0.8,
                accuracy: 0.6,
                aggressiveness: 0.7,
                adaptability: 0.3,
                description: 'Random and chaotic playstyle'
            }
        };
        
        this.init();
    }
    
    /**
     * Initialize AI system
     */
    init() {
        this.setDifficulty('normal');
        this.setPersonality('balanced');
    }
    
    /**
     * Set AI difficulty level
     */
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        
        const settings = {
            easy: {
                reactionTime: 0.4,
                accuracy: 0.6,
                maxSpeed: 4,
                predictionAccuracy: 0.5,
                mistakeChance: 0.3
            },
            normal: {
                reactionTime: 0.25,
                accuracy: 0.75,
                maxSpeed: 5.5,
                predictionAccuracy: 0.7,
                mistakeChance: 0.15
            },
            hard: {
                reactionTime: 0.15,
                accuracy: 0.85,
                maxSpeed: 7,
                predictionAccuracy: 0.85,
                mistakeChance: 0.08
            },
            insane: {
                reactionTime: 0.1,
                accuracy: 0.95,
                maxSpeed: 8.5,
                predictionAccuracy: 0.95,
                mistakeChance: 0.03
            }
        };
        
        const config = settings[difficulty] || settings.normal;
        Object.assign(this, config);
    }
    
    /**
     * Set AI personality
     */
    setPersonality(personality) {
        this.personality = personality;
        const traits = this.personalities[personality] || this.personalities.balanced;
        
        // Apply personality modifiers
        this.reactionTime *= (2 - traits.reactionSpeed);
        this.accuracy *= traits.accuracy;
        this.aggressiveness = traits.aggressiveness;
        this.adaptability = traits.adaptability;
    }
    
    /**
     * Update AI logic
     */
    update(deltaTime, gameState) {
        if (!gameState || !gameState.ball || !gameState.player2) return;
        
        this.decisionTimer += deltaTime;
        
        // Update ball tracking
        this.trackBall(gameState.ball);
        
        // Make decisions based on reaction time
        if (this.decisionTimer >= this.reactionTime) {
            this.makeDecision(gameState);
            this.decisionTimer = 0;
            this.lastDecisionTime = Date.now();
        }
        
        // Learn from player behavior
        if (this.adaptability > 0.5) {
            this.learnFromPlayer(gameState);
        }
        
        // Calculate target position
        this.calculateTarget(gameState);
        
        // Apply personality-specific behavior
        this.applyPersonalityBehavior(gameState);
        
        return this.getMovementCommand(gameState.player2);
    }
    
    /**
     * Track ball movement and predict trajectory
     */
    trackBall(ball) {
        // Update ball velocity tracking
        const velocityX = ball.x - this.lastBallPosition.x;
        const velocityY = ball.y - this.lastBallPosition.y;
        
        this.lastBallPosition = { x: ball.x, y: ball.y };
        
        // Predict ball position when it reaches paddle X coordinate
        if (velocityX > 0) { // Ball moving towards AI paddle
            this.predictBallPosition(ball, velocityX, velocityY);
        }
    }
    
    /**
     * Predict where ball will be when it reaches the paddle
     */
    predictBallPosition(ball, velX, velY) {
        if (velX <= 0) return; // Ball not moving towards paddle
        
        const paddleX = 1170; // Approximate AI paddle X position
        const timeToReach = (paddleX - ball.x) / (velX * 60); // Convert to seconds
        
        let predictedY = ball.y + (velY * 60 * timeToReach);
        
        // Account for wall bounces
        const canvasHeight = 800;
        while (predictedY < 0 || predictedY > canvasHeight) {
            if (predictedY < 0) {
                predictedY = -predictedY;
                velY = -velY;
            }
            if (predictedY > canvasHeight) {
                predictedY = 2 * canvasHeight - predictedY;
                velY = -velY;
            }
        }
        
        // Apply accuracy modifier
        const accuracyError = (1 - this.predictionAccuracy) * 100;
        predictedY += (Math.random() - 0.5) * accuracyError;
        
        this.ballPrediction = { x: paddleX, y: predictedY };
    }
    
    /**
     * Make AI decision based on game state
     */
    makeDecision(gameState) {
        const ball = gameState.ball;
        const paddle = gameState.player2;
        
        // Determine if ball is coming towards AI
        const ballComingTowards = ball.velX > 0;
        
        if (ballComingTowards) {
            // Ball is coming - decide on strategy
            this.decideDuringAttack(gameState);
        } else {
            // Ball going away - positioning phase
            this.decideDuringPositioning(gameState);
        }
        
        // Apply difficulty-based mistakes
        if (Math.random() < this.mistakeChance) {
            this.introduceMistake();
        }
    }
    
    /**
     * Decision making when ball is approaching
     */
    decideDuringAttack(gameState) {
        const ball = gameState.ball;
        const paddle = gameState.player2;
        
        // Use prediction for target
        this.targetY = this.ballPrediction.y - paddle.height / 2;
        
        // Apply personality-based modifications
        switch (this.personality) {
            case 'aggressive':
                // Aggressive AI tries to hit corners
                if (ball.y < 200) {
                    this.targetY -= 20; // Hit towards bottom
                } else if (ball.y > 600) {
                    this.targetY += 20; // Hit towards top
                }
                break;
                
            case 'defensive':
                // Defensive AI focuses on safe returns
                this.targetY = this.ballPrediction.y - paddle.height / 2;
                break;
                
            case 'adaptive':
                // Adaptive AI counters player patterns
                this.targetY = this.adaptToPlayerPattern(gameState);
                break;
                
            case 'unpredictable':
                // Unpredictable AI adds randomness
                this.targetY += (Math.random() - 0.5) * 60;
                break;
        }
    }
    
    /**
     * Decision making when ball is going away
     */
    decideDuringPositioning(gameState) {
        const paddle = gameState.player2;
        const centerY = 400 - paddle.height / 2;
        
        // Default to center position
        this.targetY = centerY;
        
        // Apply personality positioning
        switch (this.personality) {
            case 'aggressive':
                // Stay slightly forward
                this.targetY = centerY + (Math.random() - 0.5) * 40;
                break;
                
            case 'defensive':
                // Return to exact center
                this.targetY = centerY;
                break;
                
            case 'adaptive':
                // Position based on learned player behavior
                this.targetY = this.getAdaptivePosition(gameState);
                break;
        }
    }
    
    /**
     * Adapt target based on learned player patterns
     */
    adaptToPlayerPattern(gameState) {
        const ball = gameState.ball;
        const paddle = gameState.player2;
        
        // Analyze player's typical hit heights
        const avgHitHeight = this.playerBehavior.averageHitHeight * 800;
        
        // Counter player's preferred angles
        let counterY = this.ballPrediction.y - paddle.height / 2;
        
        if (this.playerBehavior.preferredAngles.length > 0) {
            const lastAngle = this.playerBehavior.preferredAngles[this.playerBehavior.preferredAngles.length - 1];
            // Counter by hitting to opposite side
            if (lastAngle > 0) {
                counterY -= 30; // Hit low to counter high shots
            } else {
                counterY += 30; // Hit high to counter low shots
            }
        }
        
        return counterY;
    }
    
    /**
     * Get adaptive positioning during non-attack phase
     */
    getAdaptivePosition(gameState) {
        const paddle = gameState.player2;
        const centerY = 400 - paddle.height / 2;
        
        // Position based on player's typical attack zones
        const avgHitHeight = this.playerBehavior.averageHitHeight * 800;
        
        // Slightly favor the area where player typically hits
        return centerY + (avgHitHeight - 400) * 0.3;
    }
    
    /**
     * Learn from player behavior
     */
    learnFromPlayer(gameState) {
        const ball = gameState.ball;
        const player1 = gameState.player1;
        
        // Track player hit heights
        if (this.wasBallHitByPlayer(gameState)) {
            const hitHeight = (ball.y + ball.height / 2) / 800; // Normalize to 0-1
            this.updateAverageHitHeight(hitHeight);
            
            // Track hit angles
            const angle = Math.atan2(ball.velY, ball.velX);
            this.playerBehavior.preferredAngles.push(angle);
            
            // Keep only recent angles
            if (this.playerBehavior.preferredAngles.length > 10) {
                this.playerBehavior.preferredAngles.shift();
            }
        }
        
        // Adapt difficulty based on performance
        this.adaptDifficulty(gameState);
    }
    
    /**
     * Check if ball was recently hit by player
     */
    wasBallHitByPlayer(gameState) {
        const timeSinceHit = Date.now() - gameState.player1.lastHit;
        return timeSinceHit < 100 && gameState.ball.velX > 0;
    }
    
    /**
     * Update running average of player hit heights
     */
    updateAverageHitHeight(newHeight) {
        const smoothing = 0.1; // How quickly to adapt (0-1)
        this.playerBehavior.averageHitHeight = 
            this.playerBehavior.averageHitHeight * (1 - smoothing) + newHeight * smoothing;
    }
    
    /**
     * Adapt AI difficulty based on game performance
     */
    adaptDifficulty(gameState) {
        if (this.adaptability < 0.5) return;
        
        const scoreRatio = gameState.player1Score / Math.max(1, gameState.player2Score);
        
        // If player is winning significantly, make AI slightly easier
        if (scoreRatio > 2) {
            this.accuracy = Math.max(0.5, this.accuracy - 0.01);
            this.reactionTime = Math.min(0.5, this.reactionTime + 0.005);
        }
        // If AI is winning significantly, make it slightly harder for player
        else if (scoreRatio < 0.5) {
            this.accuracy = Math.min(0.9, this.accuracy + 0.01);
            this.reactionTime = Math.max(0.1, this.reactionTime - 0.005);
        }
    }
    
    /**
     * Apply personality-specific behavior modifications
     */
    applyPersonalityBehavior(gameState) {
        const ball = gameState.ball;
        
        switch (this.personality) {
            case 'unpredictable':
                // Random position adjustments
                if (Math.random() < 0.1) {
                    this.targetY += (Math.random() - 0.5) * 80;
                }
                break;
                
            case 'aggressive':
                // Sometimes go for risky shots
                if (Math.random() < 0.2) {
                    const paddle = gameState.player2;
                    this.targetY += (Math.random() > 0.5 ? 1 : -1) * paddle.height * 0.3;
                }
                break;
                
            case 'defensive':
                // Always prefer safe center positioning
                const centerY = 400 - gameState.player2.height / 2;
                this.targetY = this.targetY * 0.7 + centerY * 0.3;
                break;
        }
    }
    
    /**
     * Introduce occasional mistakes based on difficulty
     */
    introduceMistake() {
        // Add error to target position
        const errorMagnitude = (1 - this.accuracy) * 100;
        this.targetY += (Math.random() - 0.5) * errorMagnitude;
        
        // Sometimes completely miss the timing
        if (Math.random() < this.mistakeChance * 0.5) {
            this.decisionTimer = -this.reactionTime; // Delay next decision
        }
    }
    
    /**
     * Calculate movement command for the paddle
     */
    getMovementCommand(paddle) {
        const currentY = paddle.y + paddle.height / 2;
        const diff = this.targetY - currentY;
        
        // Apply speed limits
        const maxSpeed = this.maxSpeed || 6;
        
        let movement = 0;
        if (Math.abs(diff) > 5) { // Dead zone to prevent jittering
            movement = Math.sign(diff) * Math.min(maxSpeed, Math.abs(diff) * 0.1);
        }
        
        // Apply accuracy - sometimes don't move perfectly
        if (Math.random() > this.accuracy) {
            movement *= Math.random() * 0.5; // Reduce movement accuracy
        }
        
        return {
            up: movement < 0,
            down: movement > 0,
            speed: Math.abs(movement)
        };
    }
    
    /**
     * Get AI status for debugging
     */
    getStatus() {
        return {
            difficulty: this.difficulty,
            personality: this.personality,
            reactionTime: this.reactionTime,
            accuracy: this.accuracy,
            targetY: this.targetY,
            ballPrediction: this.ballPrediction,
            playerBehavior: this.playerBehavior
        };
    }
    
    /**
     * Reset AI state
     */
    reset() {
        this.targetY = 400;
        this.lastBallPosition = { x: 0, y: 0 };
        this.ballPrediction = { x: 0, y: 0 };
        this.decisionTimer = 0;
        
        // Reset learning data
        this.playerBehavior = {
            averageHitHeight: 0.5,
            preferredAngles: [],
            reactionPattern: [],
            adaptationScore: 0
        };
    }
    
    /**
     * Get personality description
     */
    getPersonalityDescription() {
        return this.personalities[this.personality]?.description || 'Unknown personality';
    }
    
    /**
     * Get available personalities
     */
    getAvailablePersonalities() {
        return Object.keys(this.personalities).map(key => ({
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1),
            description: this.personalities[key].description
        }));
    }
    
    /**
     * Get available difficulty levels
     */
    getAvailableDifficulties() {
        return [
            { id: 'easy', name: 'Easy', description: 'Relaxed gameplay for beginners' },
            { id: 'normal', name: 'Normal', description: 'Balanced challenge for most players' },
            { id: 'hard', name: 'Hard', description: 'Challenging for experienced players' },
            { id: 'insane', name: 'Insane', description: 'Nearly impossible challenge' }
        ];
    }
}

// Export for use in other modules
window.CosmicPongAI = CosmicPongAI;