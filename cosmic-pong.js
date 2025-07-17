/**
 * ============================================
 * COSMIC PONG - MAIN GAME CONTROLLER
 * ============================================
 * Main game controller that integrates all systems
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Main Cosmic Pong Game Class
 * Coordinates all game systems and provides the main interface
 */
class CosmicPong {
    constructor() {
        this.core = null;
        this.audio = null;
        this.particles = null;
        this.ai = null;
        this.tournament = null;
        
        this.isInitialized = false;
        this.gameLoader = null;
        this.loadingProgress = 0;
        
        // UI elements
        this.elements = {};
        
        // Game state
        this.achievementsSystem = null;
        this.leaderboardSystem = null;
        this.saveSystem = null;
        
        this.init();
    }
    
    /**
     * Initialize the game
     */
    async init() {
        try {
            this.showLoader();
            await this.initializeSystems();
            await this.setupUI();
            await this.loadGameData();
            this.bindEvents();
            await this.hideLoader();
            this.isInitialized = true;
            console.log('Cosmic Pong initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Cosmic Pong:', error);
            this.showError('Failed to initialize game. Please refresh the page.');
        }
    }
    
    /**
     * Initialize all game systems
     */
    async initializeSystems() {
        this.updateLoadingProgress(10, 'Initializing core systems...');
        
        // Initialize core game engine
        this.core = new CosmicPongCore();
        this.updateLoadingProgress(25, 'Loading audio system...');
        
        // Initialize audio system
        this.audio = window.cosmicPongAudio;
        if (!this.audio) {
            this.audio = new CosmicPongAudio();
            await this.audio.init();
        }
        this.updateLoadingProgress(40, 'Creating particle effects...');
        
        // Initialize particle system
        this.particles = new CosmicParticleSystem();
        this.updateLoadingProgress(55, 'Loading AI opponents...');
        
        // Initialize AI system
        this.ai = new CosmicPongAI();
        this.updateLoadingProgress(70, 'Setting up tournaments...');
        
        // Initialize tournament system
        this.tournament = new CosmicPongTournament();
        this.updateLoadingProgress(85, 'Loading game data...');
        
        // Initialize achievement and save systems
        this.achievementsSystem = new AchievementSystem();
        this.leaderboardSystem = new LeaderboardSystem();
        this.saveSystem = new SaveSystem();
        
        this.updateLoadingProgress(100, 'Ready to play!');
    }
    
    /**
     * Setup UI elements and cache references
     */
    async setupUI() {
        // Cache DOM elements
        this.elements = {
            // Menus
            mainMenu: document.getElementById('mainMenu'),
            gameContainer: document.getElementById('gameContainer'),
            pauseMenu: document.getElementById('pauseMenu'),
            settingsModal: document.getElementById('settingsModal'),
            controlsModal: document.getElementById('controlsModal'),
            
            // Buttons
            singlePlayerBtn: document.getElementById('singlePlayerBtn'),
            multiPlayerBtn: document.getElementById('multiPlayerBtn'),
            tournamentBtn: document.getElementById('tournamentBtn'),
            practiceBtn: document.getElementById('practiceBtn'),
            achievementsBtn: document.getElementById('achievementsBtn'),
            leaderboardBtn: document.getElementById('leaderboardBtn'),
            
            // Game controls
            resumeBtn: document.getElementById('resumeBtn'),
            restartBtn: document.getElementById('restartBtn'),
            mainMenuBtn: document.getElementById('mainMenuBtn'),
            
            // Settings
            settingsButton: document.getElementById('settingsButton'),
            closeSettings: document.getElementById('closeSettings'),
            volumeSlider: document.getElementById('volumeSlider'),
            sfxVolumeSlider: document.getElementById('sfxVolumeSlider'),
            musicVolumeSlider: document.getElementById('musicVolumeSlider'),
            difficultySelect: document.getElementById('difficultySelect'),
            particleQuality: document.getElementById('particleQuality'),
            
            // Game display
            player1Score: document.getElementById('player1Score'),
            player2Score: document.getElementById('player2Score'),
            gameTimer: document.getElementById('gameTimer'),
            gameStatus: document.getElementById('gameStatus'),
            
            // Statistics
            highScore: document.getElementById('highScore'),
            gamesPlayed: document.getElementById('gamesPlayed'),
            winRate: document.getElementById('winRate')
        };
        
        this.validateElements();
    }
    
    /**
     * Validate that all required elements exist
     */
    validateElements() {
        const requiredElements = [
            'mainMenu', 'gameContainer', 'singlePlayerBtn', 'multiPlayerBtn'
        ];
        
        for (const elementId of requiredElements) {
            if (!this.elements[elementId]) {
                throw new Error(`Required UI element not found: ${elementId}`);
            }
        }
    }
    
    /**
     * Bind event handlers
     */
    bindEvents() {
        // Main menu buttons
        if (this.elements.singlePlayerBtn) {
            this.elements.singlePlayerBtn.addEventListener('click', () => this.startSinglePlayer());
        }
        if (this.elements.multiPlayerBtn) {
            this.elements.multiPlayerBtn.addEventListener('click', () => this.startMultiPlayer());
        }
        if (this.elements.tournamentBtn) {
            this.elements.tournamentBtn.addEventListener('click', () => this.showTournamentMenu());
        }
        if (this.elements.practiceBtn) {
            this.elements.practiceBtn.addEventListener('click', () => this.startPracticeMode());
        }
        if (this.elements.achievementsBtn) {
            this.elements.achievementsBtn.addEventListener('click', () => this.showAchievements());
        }
        if (this.elements.leaderboardBtn) {
            this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        }
        
        // Game controls
        this.elements.resumeBtn?.addEventListener('click', () => this.resumeGame());
        this.elements.restartBtn?.addEventListener('click', () => this.restartGame());
        this.elements.mainMenuBtn?.addEventListener('click', () => this.returnToMainMenu());
        
        // Settings
        this.elements.settingsButton?.addEventListener('click', () => this.showSettings());
        this.elements.closeSettings?.addEventListener('click', () => this.hideSettings());
        
        // Volume controls
        this.elements.volumeSlider?.addEventListener('input', (e) => {
            this.audio.setMasterVolume(e.target.value / 100);
            document.getElementById('volumeValue').textContent = e.target.value + '%';
        });
        
        this.elements.sfxVolumeSlider?.addEventListener('input', (e) => {
            this.audio.setSfxVolume(e.target.value / 100);
            document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
        });
        
        this.elements.musicVolumeSlider?.addEventListener('input', (e) => {
            this.audio.setMusicVolume(e.target.value / 100);
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });
        
        // Game settings
        this.elements.difficultySelect?.addEventListener('change', (e) => {
            this.ai.setDifficulty(e.target.value);
            this.saveSettings();
        });
        
        this.elements.particleQuality?.addEventListener('change', (e) => {
            this.particles.setParticleQuality(e.target.value);
            this.saveSettings();
        });
        
        // Checkbox settings
        document.getElementById('enableShake')?.addEventListener('change', (e) => {
            this.core.settings.enableShake = e.target.checked;
            this.saveSettings();
        });
        
        document.getElementById('enableTrails')?.addEventListener('change', (e) => {
            this.core.settings.enableTrails = e.target.checked;
            this.saveSettings();
        });
        
        document.getElementById('enablePowerups')?.addEventListener('change', (e) => {
            this.core.settings.enablePowerups = e.target.checked;
            this.saveSettings();
        });
        
        // Modal close handlers
        this.setupModalHandlers();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
        
        // Window events
        window.addEventListener('beforeunload', () => this.saveGameState());
        window.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }
    
    /**
     * Setup modal event handlers
     */
    setupModalHandlers() {
        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
        
        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.classList.remove('active');
            });
        });
    }
    
    /**
     * Handle global keyboard shortcuts
     */
    handleGlobalKeydown(e) {
        switch (e.code) {
            case 'F11':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'KeyH':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.showControls();
                }
                break;
            case 'KeyM':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.audio.toggleAudio();
                }
                break;
        }
    }
    
    /**
     * Game mode starters
     */
    startSinglePlayer() {
        console.log('Starting single player game');
        this.audio.playSound('gameStart');
        this.core.startGame('singlePlayer');
        this.hideMainMenu();
        this.showGameContainer();
        this.updateUI();
    }
    
    startMultiPlayer() {
        this.audio.playSound('gameStart');
        this.core.startGame('multiPlayer');
        this.hideMainMenu();
        this.showGameContainer();
        this.updateUI();
    }
    
    startPracticeMode() {
        this.audio.playSound('gameStart');
        this.core.startGame('practice');
        this.hideMainMenu();
        this.showGameContainer();
        this.updateUI();
    }
    
    /**
     * Tournament system integration
     */
    showTournamentMenu() {
        // Create tournament selection UI
        this.createTournamentSelectionUI();
    }
    
    createTournamentSelectionUI() {
        const modalHTML = `
            <div class="modal active" id="tournamentModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Tournament Selection</h2>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="tournament-content">
                        <div class="tournament-types">
                            ${this.tournament.getAvailableTournamentTypes().map(type => `
                                <div class="tournament-option" data-type="${type.id}">
                                    <h3>${type.name}</h3>
                                    <p>${type.description}</p>
                                    <div class="tournament-details">
                                        <span>Players: ${type.participants}</span>
                                        <span>Rounds: ${type.rounds}</span>
                                        <span>Score to Win: ${type.scoreLimit}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="player-name-input">
                            <label for="playerNameInput">Your Name:</label>
                            <input type="text" id="playerNameInput" value="Player" maxlength="20">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="menu-btn" id="startTournamentBtn">Start Tournament</button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('tournamentModal');
        if (existingModal) existingModal.remove();
        
        // Add new modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Bind events
        this.bindTournamentModalEvents();
    }
    
    bindTournamentModalEvents() {
        const modal = document.getElementById('tournamentModal');
        const options = modal.querySelectorAll('.tournament-option');
        const startBtn = document.getElementById('startTournamentBtn');
        let selectedType = 'standard';
        
        // Tournament type selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedType = option.dataset.type;
            });
        });
        
        // Default selection
        modal.querySelector('[data-type="standard"]')?.classList.add('selected');
        
        // Start tournament
        startBtn.addEventListener('click', () => {
            const playerName = document.getElementById('playerNameInput').value.trim() || 'Player';
            this.startTournament(selectedType, playerName);
            modal.remove();
        });
        
        // Close modal
        modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    startTournament(type, playerName) {
        try {
            this.tournament.createTournament(type, playerName);
            this.tournament.autoProgressTournament(); // Progress AI-only matches
            this.showTournamentBracket();
        } catch (error) {
            console.error('Failed to start tournament:', error);
            this.showError('Failed to start tournament');
        }
    }
    
    showTournamentBracket() {
        // Implementation for tournament bracket display
        // This would show the tournament bracket UI
        console.log('Tournament bracket:', this.tournament.getTournamentBracket());
    }
    
    /**
     * Game control methods
     */
    resumeGame() {
        this.core.resumeGame();
        this.updateUI();
    }
    
    restartGame() {
        this.core.restartGame();
        this.updateUI();
    }
    
    returnToMainMenu() {
        this.core.returnToMenu();
        this.showMainMenu();
        this.hideGameContainer();
        this.updateUI();
    }
    
    /**
     * UI state management
     */
    showMainMenu() {
        this.elements.mainMenu?.classList.add('active');
        this.updateStats();
    }
    
    hideMainMenu() {
        this.elements.mainMenu?.classList.remove('active');
    }
    
    showGameContainer() {
        this.elements.gameContainer?.classList.add('active');
    }
    
    hideGameContainer() {
        this.elements.gameContainer?.classList.remove('active');
    }
    
    showSettings() {
        this.elements.settingsModal?.classList.add('active');
        this.loadSettingsIntoUI();
    }
    
    hideSettings() {
        this.elements.settingsModal?.classList.remove('active');
    }
    
    showControls() {
        this.elements.controlsModal?.classList.add('active');
    }
    
    showAchievements() {
        if (this.achievementsSystem) {
            this.achievementsSystem.showAchievements();
        }
    }
    
    showLeaderboard() {
        if (this.leaderboardSystem) {
            this.leaderboardSystem.showLeaderboard();
        }
    }
    
    /**
     * Update UI elements
     */
    updateUI() {
        this.updateGameDisplay();
        this.updateStats();
    }
    
    updateGameDisplay() {
        if (!this.core) return;
        
        // Update scores
        if (this.elements.player1Score) {
            this.elements.player1Score.textContent = this.core.gameStats.player1Score;
        }
        if (this.elements.player2Score) {
            this.elements.player2Score.textContent = this.core.gameStats.player2Score;
        }
        
        // Update timer
        if (this.elements.gameTimer) {
            const minutes = Math.floor(this.core.gameStats.gameTime / 60);
            const seconds = Math.floor(this.core.gameStats.gameTime % 60);
            this.elements.gameTimer.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateStats() {
        const stats = this.loadStats();
        
        if (this.elements.highScore) {
            this.elements.highScore.textContent = stats.highScore || 0;
        }
        if (this.elements.gamesPlayed) {
            this.elements.gamesPlayed.textContent = stats.gamesPlayed || 0;
        }
        if (this.elements.winRate) {
            const winRate = stats.gamesPlayed ? 
                Math.round((stats.wins || 0) / stats.gamesPlayed * 100) : 0;
            this.elements.winRate.textContent = winRate + '%';
        }
    }
    
    /**
     * Settings management
     */
    loadSettingsIntoUI() {
        const audioSettings = this.audio.getSettings();
        
        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.value = audioSettings.masterVolume * 100;
            document.getElementById('volumeValue').textContent = Math.round(audioSettings.masterVolume * 100) + '%';
        }
        
        if (this.elements.sfxVolumeSlider) {
            this.elements.sfxVolumeSlider.value = audioSettings.sfxVolume * 100;
            document.getElementById('sfxVolumeValue').textContent = Math.round(audioSettings.sfxVolume * 100) + '%';
        }
        
        if (this.elements.musicVolumeSlider) {
            this.elements.musicVolumeSlider.value = audioSettings.musicVolume * 100;
            document.getElementById('musicVolumeValue').textContent = Math.round(audioSettings.musicVolume * 100) + '%';
        }
        
        if (this.elements.difficultySelect) {
            this.elements.difficultySelect.value = this.core.settings.difficulty;
        }
        
        if (this.elements.particleQuality) {
            this.elements.particleQuality.value = this.core.settings.particleQuality;
        }
        
        // Checkboxes
        const enableShake = document.getElementById('enableShake');
        if (enableShake) enableShake.checked = this.core.settings.enableShake;
        
        const enableTrails = document.getElementById('enableTrails');
        if (enableTrails) enableTrails.checked = this.core.settings.enableTrails;
        
        const enablePowerups = document.getElementById('enablePowerups');
        if (enablePowerups) enablePowerups.checked = this.core.settings.enablePowerups;
    }
    
    saveSettings() {
        this.core.saveSettings();
        this.audio.saveSettings();
    }
    
    /**
     * Data persistence
     */
    async loadGameData() {
        // Load any saved game state, settings, etc.
        this.core.loadSettings();
        this.core.updateStatsDisplay();
    }
    
    saveGameState() {
        // Save current game state
        this.saveSettings();
    }
    
    loadStats() {
        try {
            return JSON.parse(localStorage.getItem('cosmicPongStats') || '{}');
        } catch {
            return {};
        }
    }
    
    /**
     * Utility methods
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Failed to enter fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden && this.core.gameState === 'playing') {
            this.core.pauseGame();
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    /**
     * Loading screen management
     */
    showLoader() {
        this.gameLoader = document.getElementById('game-loader');
        if (this.gameLoader) {
            this.gameLoader.classList.remove('hidden');
        }
    }
    
    async hideLoader() {
        if (this.gameLoader) {
            setTimeout(() => {
                this.gameLoader.classList.add('hidden');
            }, 1000);
        }
    }
    
    updateLoadingProgress(progress, message) {
        this.loadingProgress = progress;
        
        const progressFill = document.querySelector('.progress-fill');
        const loadingText = document.querySelector('.loading-text');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (loadingText && message) {
            loadingText.textContent = message;
        }
    }
    
    /**
     * Cleanup and destroy
     */
    destroy() {
        // Cleanup all systems
        if (this.audio) this.audio.cleanup();
        if (this.particles) this.particles.cleanup();
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleGlobalKeydown);
        window.removeEventListener('beforeunload', this.saveGameState);
        window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

/**
 * Simple Achievement System
 */
class AchievementSystem {
    constructor() {
        this.achievements = [
            { id: 'first_win', name: 'First Victory', description: 'Win your first game' },
            { id: 'score_10', name: 'Perfect Game', description: 'Win a game 10-0' },
            { id: 'tournament_win', name: 'Champion', description: 'Win a tournament' },
            { id: 'hard_ai', name: 'AI Slayer', description: 'Beat Hard difficulty AI' },
            { id: 'powerup_master', name: 'Power Player', description: 'Collect 50 power-ups' }
        ];
        
        this.unlockedAchievements = this.loadUnlocked();
    }
    
    showAchievements() {
        console.log('Achievements:', this.achievements);
        // Implementation for achievement display UI
    }
    
    loadUnlocked() {
        try {
            return JSON.parse(localStorage.getItem('cosmicPongAchievements') || '[]');
        } catch {
            return [];
        }
    }
}

/**
 * Simple Leaderboard System
 */
class LeaderboardSystem {
    constructor() {
        this.scores = this.loadScores();
    }
    
    showLeaderboard() {
        console.log('Leaderboard:', this.scores);
        // Implementation for leaderboard display UI
    }
    
    addScore(playerName, score, gameMode) {
        this.scores.push({
            name: playerName,
            score: score,
            mode: gameMode,
            date: Date.now()
        });
        
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, 100); // Keep top 100
        
        this.saveScores();
    }
    
    loadScores() {
        try {
            return JSON.parse(localStorage.getItem('cosmicPongLeaderboard') || '[]');
        } catch {
            return [];
        }
    }
    
    saveScores() {
        localStorage.setItem('cosmicPongLeaderboard', JSON.stringify(this.scores));
    }
}

/**
 * Simple Save System
 */
class SaveSystem {
    constructor() {
        this.saveSlots = 3;
    }
    
    saveGame(slot, gameState) {
        localStorage.setItem(`cosmicPongSave_${slot}`, JSON.stringify(gameState));
    }
    
    loadGame(slot) {
        try {
            return JSON.parse(localStorage.getItem(`cosmicPongSave_${slot}`) || 'null');
        } catch {
            return null;
        }
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicPong = new CosmicPong();
});

// Export for external use
window.CosmicPong = CosmicPong;