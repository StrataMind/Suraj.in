/**
 * ============================================
 * COSMIC PONG - TOURNAMENT SYSTEM
 * ============================================
 * Complete tournament mode with brackets and progression
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Tournament System Class
 * Handles tournament bracket generation, progression, and management
 */
class CosmicPongTournament {
    constructor() {
        this.currentTournament = null;
        this.tournamentHistory = [];
        this.playerProfile = {
            name: 'Player',
            wins: 0,
            losses: 0,
            tournamentsWon: 0,
            tournamentsPlayed: 0,
            averageScore: 0,
            bestTime: null
        };
        
        // Tournament configurations
        this.tournamentTypes = {
            quick: {
                name: 'Quick Tournament',
                participants: 4,
                rounds: 2,
                scoreLimit: 5,
                description: 'Fast-paced 4-player tournament'
            },
            standard: {
                name: 'Standard Tournament',
                participants: 8,
                rounds: 3,
                scoreLimit: 7,
                description: 'Classic 8-player tournament'
            },
            championship: {
                name: 'Championship',
                participants: 16,
                rounds: 4,
                scoreLimit: 11,
                description: 'Ultimate 16-player challenge'
            },
            gauntlet: {
                name: 'AI Gauntlet',
                participants: 6, // Player + 5 AI with different difficulties
                rounds: 5,
                scoreLimit: 9,
                description: 'Face increasingly difficult AI opponents'
            }
        };
        
        // AI opponents with different personalities and difficulties
        this.aiOpponents = [
            { name: 'Nova', difficulty: 'easy', personality: 'defensive', color: '#4facfe' },
            { name: 'Quasar', difficulty: 'easy', personality: 'balanced', color: '#43e97b' },
            { name: 'Nebula', difficulty: 'normal', personality: 'aggressive', color: '#fa709a' },
            { name: 'Cosmos', difficulty: 'normal', personality: 'adaptive', color: '#fee140' },
            { name: 'Vortex', difficulty: 'hard', personality: 'unpredictable', color: '#a8edea' },
            { name: 'Stellar', difficulty: 'hard', personality: 'aggressive', color: '#d299c2' },
            { name: 'Galaxia', difficulty: 'insane', personality: 'adaptive', color: '#fad0c4' },
            { name: 'Zenith', difficulty: 'insane', personality: 'balanced', color: '#a18cd1' }
        ];
        
        this.init();
    }
    
    /**
     * Initialize tournament system
     */
    init() {
        this.loadPlayerProfile();
        this.loadTournamentHistory();
    }
    
    /**
     * Create a new tournament
     */
    createTournament(type = 'standard', playerName = 'Player') {
        const config = this.tournamentTypes[type];
        if (!config) {
            throw new Error(`Invalid tournament type: ${type}`);
        }
        
        this.currentTournament = {
            id: this.generateTournamentId(),
            type: type,
            config: config,
            playerName: playerName,
            participants: this.generateParticipants(config, playerName),
            bracket: null,
            currentRound: 1,
            currentMatch: 0,
            status: 'ready', // ready, inProgress, completed
            startTime: Date.now(),
            endTime: null,
            winner: null,
            playerPlacement: null
        };
        
        this.generateBracket();
        this.saveTournamentState();
        
        return this.currentTournament;
    }
    
    /**
     * Generate tournament participants
     */
    generateParticipants(config, playerName) {
        const participants = [
            {
                id: 'player',
                name: playerName,
                type: 'human',
                isPlayer: true,
                wins: 0,
                losses: 0,
                color: '#00f4ff'
            }
        ];
        
        // Select AI opponents based on tournament type
        let aiOpponents = [...this.aiOpponents];
        
        if (config.name === 'AI Gauntlet') {
            // Gauntlet mode: select specific progression of difficulty
            aiOpponents = [
                this.aiOpponents[0], // Easy
                this.aiOpponents[1], // Easy
                this.aiOpponents[2], // Normal
                this.aiOpponents[3], // Normal
                this.aiOpponents[6], // Insane
            ];
        } else {
            // Regular tournament: shuffle and select
            aiOpponents = this.shuffleArray([...this.aiOpponents]);
        }
        
        // Add AI participants
        for (let i = 0; i < config.participants - 1; i++) {
            const ai = aiOpponents[i % aiOpponents.length];
            participants.push({
                id: `ai_${i}`,
                name: ai.name,
                type: 'ai',
                difficulty: ai.difficulty,
                personality: ai.personality,
                color: ai.color,
                isPlayer: false,
                wins: 0,
                losses: 0
            });
        }
        
        return participants;
    }
    
    /**
     * Generate tournament bracket
     */
    generateBracket() {
        const participants = [...this.currentTournament.participants];
        this.shuffleArray(participants); // Randomize bracket positions
        
        const bracket = [];
        const rounds = this.currentTournament.config.rounds;
        
        // Generate all rounds
        for (let round = 1; round <= rounds; round++) {
            const roundMatches = [];
            const participantsInRound = Math.pow(2, rounds - round + 1);
            
            if (round === 1) {
                // First round: pair up all participants
                for (let i = 0; i < participants.length; i += 2) {
                    roundMatches.push({
                        id: `r${round}_m${Math.floor(i / 2)}`,
                        round: round,
                        matchNumber: Math.floor(i / 2),
                        participant1: participants[i],
                        participant2: participants[i + 1] || null,
                        winner: null,
                        score1: 0,
                        score2: 0,
                        status: 'pending', // pending, inProgress, completed
                        startTime: null,
                        endTime: null
                    });
                }
            } else {
                // Subsequent rounds: winners from previous round
                const previousRound = bracket[round - 2];
                for (let i = 0; i < participantsInRound / 2; i++) {
                    roundMatches.push({
                        id: `r${round}_m${i}`,
                        round: round,
                        matchNumber: i,
                        participant1: null, // Will be filled by winners
                        participant2: null,
                        winner: null,
                        score1: 0,
                        score2: 0,
                        status: 'pending',
                        startTime: null,
                        endTime: null
                    });
                }
            }
            
            bracket.push(roundMatches);
        }
        
        this.currentTournament.bracket = bracket;
    }
    
    /**
     * Get current match
     */
    getCurrentMatch() {
        if (!this.currentTournament || !this.currentTournament.bracket) {
            return null;
        }
        
        const currentRound = this.currentTournament.bracket[this.currentTournament.currentRound - 1];
        if (!currentRound) return null;
        
        return currentRound[this.currentTournament.currentMatch] || null;
    }
    
    /**
     * Start current match
     */
    startCurrentMatch() {
        const match = this.getCurrentMatch();
        if (!match) return null;
        
        match.status = 'inProgress';
        match.startTime = Date.now();
        this.currentTournament.status = 'inProgress';
        
        this.saveTournamentState();
        return match;
    }
    
    /**
     * Complete current match
     */
    completeMatch(participant1Score, participant2Score) {
        const match = this.getCurrentMatch();
        if (!match) return false;
        
        match.score1 = participant1Score;
        match.score2 = participant2Score;
        match.status = 'completed';
        match.endTime = Date.now();
        
        // Determine winner
        if (participant1Score > participant2Score) {
            match.winner = match.participant1;
            match.participant1.wins++;
            if (match.participant2) match.participant2.losses++;
        } else {
            match.winner = match.participant2;
            match.participant2.wins++;
            if (match.participant1) match.participant1.losses++;
        }
        
        // Advance winner to next round
        this.advanceWinner(match);
        
        // Move to next match
        this.currentTournament.currentMatch++;
        
        // Check if round is complete
        const currentRound = this.currentTournament.bracket[this.currentTournament.currentRound - 1];
        if (this.currentTournament.currentMatch >= currentRound.length) {
            this.completeRound();
        }
        
        this.saveTournamentState();
        return true;
    }
    
    /**
     * Advance winner to next round
     */
    advanceWinner(completedMatch) {
        if (completedMatch.round >= this.currentTournament.config.rounds) {
            // Tournament complete
            this.completeTournament(completedMatch.winner);
            return;
        }
        
        const nextRound = this.currentTournament.bracket[completedMatch.round];
        const nextMatchIndex = Math.floor(completedMatch.matchNumber / 2);
        const nextMatch = nextRound[nextMatchIndex];
        
        if (!nextMatch) return;
        
        // Place winner in appropriate slot
        if (completedMatch.matchNumber % 2 === 0) {
            nextMatch.participant1 = completedMatch.winner;
        } else {
            nextMatch.participant2 = completedMatch.winner;
        }
    }
    
    /**
     * Complete current round
     */
    completeRound() {
        this.currentTournament.currentRound++;
        this.currentTournament.currentMatch = 0;
        
        // Check if tournament is complete
        if (this.currentTournament.currentRound > this.currentTournament.config.rounds) {
            const finalMatch = this.currentTournament.bracket[this.currentTournament.config.rounds - 1][0];
            if (finalMatch && finalMatch.winner) {
                this.completeTournament(finalMatch.winner);
            }
        }
    }
    
    /**
     * Complete tournament
     */
    completeTournament(winner) {
        this.currentTournament.status = 'completed';
        this.currentTournament.endTime = Date.now();
        this.currentTournament.winner = winner;
        
        // Determine player placement
        this.currentTournament.playerPlacement = this.calculatePlayerPlacement();
        
        // Update player profile
        this.updatePlayerProfile(winner.isPlayer);
        
        // Save to history
        this.tournamentHistory.push({
            ...this.currentTournament,
            // Don't save the entire bracket to reduce storage size
            bracket: null
        });
        
        this.saveTournamentHistory();
        this.savePlayerProfile();
    }
    
    /**
     * Calculate player's final placement
     */
    calculatePlayerPlacement() {
        const player = this.currentTournament.participants.find(p => p.isPlayer);
        if (!player) return null;
        
        // If player won, they're first
        if (this.currentTournament.winner && this.currentTournament.winner.isPlayer) {
            return 1;
        }
        
        // Calculate placement based on how far they got
        let placement = this.currentTournament.config.participants;
        
        for (let round = 0; round < this.currentTournament.bracket.length; round++) {
            const roundMatches = this.currentTournament.bracket[round];
            
            for (const match of roundMatches) {
                if ((match.participant1 && match.participant1.isPlayer) ||
                    (match.participant2 && match.participant2.isPlayer)) {
                    
                    if (match.status === 'completed') {
                        if ((match.winner && match.winner.isPlayer)) {
                            // Player won this match, reduce possible placement
                            placement = Math.min(placement, Math.pow(2, this.currentTournament.config.rounds - round - 1));
                        } else {
                            // Player lost this match
                            return Math.pow(2, this.currentTournament.config.rounds - round);
                        }
                    }
                }
            }
        }
        
        return placement;
    }
    
    /**
     * Update player profile stats
     */
    updatePlayerProfile(playerWon) {
        this.playerProfile.tournamentsPlayed++;
        
        if (playerWon) {
            this.playerProfile.tournamentsWon++;
        }
        
        // Calculate average score and best time
        const duration = this.currentTournament.endTime - this.currentTournament.startTime;
        if (!this.playerProfile.bestTime || duration < this.playerProfile.bestTime) {
            this.playerProfile.bestTime = duration;
        }
        
        // Update win/loss record from all matches
        const player = this.currentTournament.participants.find(p => p.isPlayer);
        if (player) {
            this.playerProfile.wins += player.wins;
            this.playerProfile.losses += player.losses;
        }
    }
    
    /**
     * Simulate AI vs AI match for bracket progression
     */
    simulateAIMatch(participant1, participant2) {
        if (!participant1 || !participant2) return null;
        
        // Simple simulation based on difficulty
        const getDifficultyScore = (difficulty) => {
            const scores = { easy: 1, normal: 2, hard: 3, insane: 4 };
            return scores[difficulty] || 2;
        };
        
        const score1Base = getDifficultyScore(participant1.difficulty);
        const score2Base = getDifficultyScore(participant2.difficulty);
        
        // Add some randomness
        const score1 = score1Base + Math.floor(Math.random() * 3);
        const score2 = score2Base + Math.floor(Math.random() * 3);
        
        const targetScore = this.currentTournament.config.scoreLimit;
        
        // Normalize scores to target
        const winner = score1 > score2 ? participant1 : participant2;
        const loser = score1 > score2 ? participant2 : participant1;
        
        const winnerScore = targetScore;
        const loserScore = Math.max(0, targetScore - Math.abs(score1 - score2) - 1);
        
        return {
            participant1Score: score1 > score2 ? winnerScore : loserScore,
            participant2Score: score1 > score2 ? loserScore : winnerScore,
            winner: winner
        };
    }
    
    /**
     * Auto-progress tournament for AI-only matches
     */
    autoProgressTournament() {
        while (this.currentTournament && this.currentTournament.status !== 'completed') {
            const match = this.getCurrentMatch();
            
            if (!match) break;
            
            // If neither participant is the player, simulate the match
            if (match.participant1 && match.participant2 && 
                !match.participant1.isPlayer && !match.participant2.isPlayer) {
                
                const result = this.simulateAIMatch(match.participant1, match.participant2);
                if (result) {
                    this.completeMatch(result.participant1Score, result.participant2Score);
                } else {
                    break;
                }
            } else {
                // Player match - stop auto-progression
                break;
            }
        }
    }
    
    /**
     * Get tournament bracket for display
     */
    getTournamentBracket() {
        if (!this.currentTournament) return null;
        
        return {
            tournament: {
                id: this.currentTournament.id,
                type: this.currentTournament.type,
                name: this.currentTournament.config.name,
                status: this.currentTournament.status,
                currentRound: this.currentTournament.currentRound,
                totalRounds: this.currentTournament.config.rounds
            },
            bracket: this.currentTournament.bracket,
            participants: this.currentTournament.participants
        };
    }
    
    /**
     * Get tournament statistics
     */
    getTournamentStats() {
        return {
            current: this.currentTournament ? {
                type: this.currentTournament.type,
                round: this.currentTournament.currentRound,
                totalRounds: this.currentTournament.config.rounds,
                status: this.currentTournament.status,
                playerName: this.currentTournament.playerName
            } : null,
            
            profile: this.playerProfile,
            
            history: this.tournamentHistory.map(t => ({
                id: t.id,
                type: t.type,
                completed: t.endTime,
                won: t.winner && t.winner.isPlayer,
                placement: t.playerPlacement,
                duration: t.endTime - t.startTime
            })).slice(-10) // Last 10 tournaments
        };
    }
    
    /**
     * Utility functions
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    generateTournamentId() {
        return 'tournament_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Persistence methods
     */
    saveTournamentState() {
        if (this.currentTournament) {
            localStorage.setItem('cosmicPongCurrentTournament', JSON.stringify(this.currentTournament));
        }
    }
    
    loadTournamentState() {
        try {
            const saved = localStorage.getItem('cosmicPongCurrentTournament');
            if (saved) {
                this.currentTournament = JSON.parse(saved);
                return true;
            }
        } catch (error) {
            console.warn('Failed to load tournament state:', error);
        }
        return false;
    }
    
    savePlayerProfile() {
        localStorage.setItem('cosmicPongPlayerProfile', JSON.stringify(this.playerProfile));
    }
    
    loadPlayerProfile() {
        try {
            const saved = localStorage.getItem('cosmicPongPlayerProfile');
            if (saved) {
                this.playerProfile = { ...this.playerProfile, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Failed to load player profile:', error);
        }
    }
    
    saveTournamentHistory() {
        localStorage.setItem('cosmicPongTournamentHistory', JSON.stringify(this.tournamentHistory));
    }
    
    loadTournamentHistory() {
        try {
            const saved = localStorage.getItem('cosmicPongTournamentHistory');
            if (saved) {
                this.tournamentHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load tournament history:', error);
        }
    }
    
    /**
     * Reset tournament system
     */
    resetTournament() {
        this.currentTournament = null;
        localStorage.removeItem('cosmicPongCurrentTournament');
    }
    
    resetPlayerProfile() {
        this.playerProfile = {
            name: 'Player',
            wins: 0,
            losses: 0,
            tournamentsWon: 0,
            tournamentsPlayed: 0,
            averageScore: 0,
            bestTime: null
        };
        this.savePlayerProfile();
    }
    
    /**
     * Get available tournament types
     */
    getAvailableTournamentTypes() {
        return Object.keys(this.tournamentTypes).map(key => ({
            id: key,
            ...this.tournamentTypes[key]
        }));
    }
}

// Export for use in other modules
window.CosmicPongTournament = CosmicPongTournament;