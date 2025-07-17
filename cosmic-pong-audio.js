/**
 * ============================================
 * COSMIC PONG - AUDIO SYSTEM
 * ============================================
 * Enhanced audio system with fallback handling
 * Author: Suraj Kumar
 * ============================================
 */

'use strict';

/**
 * Audio System Class
 * Handles all game audio with proper fallback mechanisms
 */
class CosmicPongAudio {
    constructor() {
        this.audioContext = null;
        this.sounds = new Map();
        this.musicTracks = new Map();
        this.currentMusic = null;
        this.isInitialized = false;
        this.hasUserInteracted = false;
        
        // Audio settings
        this.settings = {
            masterVolume: 0.75,
            sfxVolume: 0.8,
            musicVolume: 0.6,
            enabled: true
        };
        
        // Fallback audio elements
        this.fallbackAudio = new Map();
        this.useWebAudioAPI = false;
        
        // Sound definitions with fallback data
        this.soundDefinitions = {
            paddleHit: {
                type: 'synthetic',
                frequency: 220,
                duration: 0.1,
                waveType: 'square',
                envelope: { attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.04 }
            },
            wallHit: {
                type: 'synthetic',
                frequency: 440,
                duration: 0.15,
                waveType: 'sawtooth',
                envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.05 }
            },
            score: {
                type: 'synthetic',
                frequency: 523,
                duration: 0.5,
                waveType: 'sine',
                envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.2 }
            },
            powerup: {
                type: 'synthetic',
                frequency: 880,
                duration: 0.3,
                waveType: 'triangle',
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.15 }
            },
            gameStart: {
                type: 'sequence',
                notes: [
                    { frequency: 261, duration: 0.2 },
                    { frequency: 329, duration: 0.2 },
                    { frequency: 392, duration: 0.3 }
                ]
            },
            gameOver: {
                type: 'sequence',
                notes: [
                    { frequency: 392, duration: 0.3 },
                    { frequency: 329, duration: 0.3 },
                    { frequency: 261, duration: 0.5 }
                ]
            }
        };
        
        this.init();
    }
    
    /**
     * Initialize audio system
     */
    async init() {
        try {
            // Try to initialize Web Audio API
            await this.initWebAudioAPI();
            this.useWebAudioAPI = true;
            console.log('Web Audio API initialized');
        } catch (error) {
            console.warn('Web Audio API not available, using fallback:', error);
            this.initFallbackAudio();
            this.useWebAudioAPI = false;
        }
        
        // Load settings
        this.loadSettings();
        
        // Setup user interaction detection
        this.setupUserInteractionDetection();
        
        // Pre-generate sounds
        this.preGenerateSounds();
        
        this.isInitialized = true;
    }
    
    /**
     * Initialize Web Audio API
     */
    async initWebAudioAPI() {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            throw new Error('Web Audio API not supported');
        }
        
        this.audioContext = new AudioContext();
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = this.settings.masterVolume;
        
        // Create separate gain nodes for SFX and music
        this.sfxGain = this.audioContext.createGain();
        this.sfxGain.connect(this.masterGain);
        this.sfxGain.gain.value = this.settings.sfxVolume;
        
        this.musicGain = this.audioContext.createGain();
        this.musicGain.connect(this.masterGain);
        this.musicGain.gain.value = this.settings.musicVolume;
        
        // Handle audio context state
        if (this.audioContext.state === 'suspended') {
            console.log('Audio context suspended, waiting for user interaction');
        }
    }
    
    /**
     * Initialize fallback audio system
     */
    initFallbackAudio() {
        // Create audio elements for fallback
        for (const soundName of Object.keys(this.soundDefinitions)) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.volume = this.settings.sfxVolume * this.settings.masterVolume;
            this.fallbackAudio.set(soundName, audio);
        }
    }
    
    /**
     * Setup user interaction detection for audio context
     */
    setupUserInteractionDetection() {
        const handleUserInteraction = async () => {
            if (!this.hasUserInteracted) {
                this.hasUserInteracted = true;
                
                if (this.useWebAudioAPI && this.audioContext && this.audioContext.state === 'suspended') {
                    try {
                        await this.audioContext.resume();
                        console.log('Audio context resumed after user interaction');
                    } catch (error) {
                        console.warn('Failed to resume audio context:', error);
                    }
                }
                
                // Remove event listeners after first interaction
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('keydown', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            }
        };
        
        // Listen for user interactions
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
    }
    
    /**
     * Pre-generate synthetic sounds
     */
    preGenerateSounds() {
        if (!this.useWebAudioAPI) {
            this.preGenerateFallbackSounds();
            return;
        }
        
        for (const [soundName, definition] of Object.entries(this.soundDefinitions)) {
            try {
                if (definition.type === 'synthetic') {
                    const buffer = this.generateSyntheticSound(definition);
                    this.sounds.set(soundName, buffer);
                } else if (definition.type === 'sequence') {
                    const buffer = this.generateSequenceSound(definition);
                    this.sounds.set(soundName, buffer);
                }
            } catch (error) {
                console.warn(`Failed to generate sound ${soundName}:`, error);
            }
        }
    }
    
    /**
     * Generate synthetic sound using Web Audio API
     */
    generateSyntheticSound(definition) {
        if (!this.audioContext) return null;
        
        const sampleRate = this.audioContext.sampleRate;
        const duration = definition.duration;
        const frameCount = sampleRate * duration;
        
        const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        const frequency = definition.frequency;
        const envelope = definition.envelope;
        
        // Calculate envelope phases
        const attackFrames = envelope.attack * sampleRate;
        const decayFrames = envelope.decay * sampleRate;
        const sustainFrames = (duration - envelope.attack - envelope.decay - envelope.release) * sampleRate;
        const releaseFrames = envelope.release * sampleRate;
        
        for (let i = 0; i < frameCount; i++) {
            const time = i / sampleRate;
            let amplitude = 1;
            
            // Apply envelope
            if (i < attackFrames) {
                amplitude = i / attackFrames;
            } else if (i < attackFrames + decayFrames) {
                const decayProgress = (i - attackFrames) / decayFrames;
                amplitude = 1 - (1 - envelope.sustain) * decayProgress;
            } else if (i < attackFrames + decayFrames + sustainFrames) {
                amplitude = envelope.sustain;
            } else {
                const releaseProgress = (i - attackFrames - decayFrames - sustainFrames) / releaseFrames;
                amplitude = envelope.sustain * (1 - releaseProgress);
            }
            
            // Generate waveform
            let sample = 0;
            const phase = 2 * Math.PI * frequency * time;
            
            switch (definition.waveType) {
                case 'sine':
                    sample = Math.sin(phase);
                    break;
                case 'square':
                    sample = Math.sin(phase) > 0 ? 1 : -1;
                    break;
                case 'sawtooth':
                    sample = 2 * (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.5));
                    break;
                case 'triangle':
                    sample = 2 * Math.abs(2 * (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.5))) - 1;
                    break;
            }
            
            channelData[i] = sample * amplitude * 0.3; // Reduce volume to prevent clipping
        }
        
        return buffer;
    }
    
    /**
     * Generate sequence sound (multiple notes)
     */
    generateSequenceSound(definition) {
        if (!this.audioContext) return null;
        
        const sampleRate = this.audioContext.sampleRate;
        const totalDuration = definition.notes.reduce((sum, note) => sum + note.duration, 0);
        const frameCount = sampleRate * totalDuration;
        
        const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        let currentTime = 0;
        
        for (const note of definition.notes) {
            const noteStartFrame = Math.floor(currentTime * sampleRate);
            const noteDuration = note.duration;
            const noteFrameCount = Math.floor(noteDuration * sampleRate);
            
            for (let i = 0; i < noteFrameCount; i++) {
                const frameIndex = noteStartFrame + i;
                if (frameIndex >= frameCount) break;
                
                const time = i / sampleRate;
                const phase = 2 * Math.PI * note.frequency * time;
                
                // Simple envelope for each note
                const envelope = Math.min(1, time * 10) * Math.min(1, (noteDuration - time) * 10);
                const sample = Math.sin(phase) * envelope * 0.3;
                
                channelData[frameIndex] += sample;
            }
            
            currentTime += noteDuration;
        }
        
        return buffer;
    }
    
    /**
     * Pre-generate fallback sounds using data URLs
     */
    preGenerateFallbackSounds() {
        // Generate simple tones as data URLs for fallback
        for (const [soundName, definition] of Object.entries(this.soundDefinitions)) {
            try {
                const dataUrl = this.generateToneDataUrl(definition);
                const audio = this.fallbackAudio.get(soundName);
                if (audio && dataUrl) {
                    audio.src = dataUrl;
                }
            } catch (error) {
                console.warn(`Failed to generate fallback sound ${soundName}:`, error);
            }
        }
    }
    
    /**
     * Generate tone as data URL for fallback
     */
    generateToneDataUrl(definition) {
        // This is a simplified version - in a real implementation,
        // you might want to use a more sophisticated audio generation library
        // For now, we'll return null and rely on silent playback
        return null;
    }
    
    /**
     * Play a sound effect
     */
    async playSound(soundName) {
        if (!this.settings.enabled || !this.isInitialized) return;
        
        try {
            if (this.useWebAudioAPI) {
                await this.playWebAudioSound(soundName);
            } else {
                await this.playFallbackSound(soundName);
            }
        } catch (error) {
            console.warn(`Failed to play sound ${soundName}:`, error);
        }
    }
    
    /**
     * Play sound using Web Audio API
     */
    async playWebAudioSound(soundName) {
        if (!this.audioContext || !this.hasUserInteracted) return;
        
        // Resume audio context if suspended
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (error) {
                console.warn('Failed to resume audio context:', error);
                return;
            }
        }
        
        const buffer = this.sounds.get(soundName);
        if (!buffer) {
            console.warn(`Sound ${soundName} not found`);
            return;
        }
        
        // Create source and connect to destination
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.sfxGain);
        
        // Start playback
        source.start(0);
    }
    
    /**
     * Play sound using fallback audio elements
     */
    async playFallbackSound(soundName) {
        const audio = this.fallbackAudio.get(soundName);
        if (!audio) return;
        
        try {
            // Reset audio to beginning
            audio.currentTime = 0;
            audio.volume = this.settings.sfxVolume * this.settings.masterVolume;
            
            // Play the sound
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                await playPromise;
            }
        } catch (error) {
            // Silently handle autoplay policy errors
            if (error.name !== 'NotAllowedError') {
                console.warn(`Failed to play fallback sound ${soundName}:`, error);
            }
        }
    }
    
    /**
     * Play background music
     */
    async playMusic(trackName, loop = true) {
        if (!this.settings.enabled || !this.musicGain) return;
        
        // Stop current music
        this.stopMusic();
        
        try {
            // In a real implementation, you would load actual music files
            // For this demo, we'll create a simple ambient tone
            await this.playAmbientMusic(loop);
        } catch (error) {
            console.warn(`Failed to play music ${trackName}:`, error);
        }
    }
    
    /**
     * Play ambient background music
     */
    async playAmbientMusic(loop = true) {
        if (!this.audioContext || !this.hasUserInteracted) return;
        
        // Create a simple ambient tone using oscillators
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, this.audioContext.currentTime); // Low A
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(82.5, this.audioContext.currentTime); // Low E
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime); // Very quiet
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.musicGain);
        
        osc1.start();
        osc2.start();
        
        this.currentMusic = { osc1, osc2, gainNode };
        
        // Add slight frequency modulation for ambient effect
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, this.audioContext.currentTime);
        lfoGain.gain.setValueAtTime(1, this.audioContext.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);
        
        lfo.start();
        
        this.currentMusic.lfo = lfo;
        this.currentMusic.lfoGain = lfoGain;
    }
    
    /**
     * Stop background music
     */
    stopMusic() {
        if (this.currentMusic) {
            try {
                this.currentMusic.osc1.stop();
                this.currentMusic.osc2.stop();
                if (this.currentMusic.lfo) {
                    this.currentMusic.lfo.stop();
                }
            } catch (error) {
                // Oscillators may have already stopped
            }
            this.currentMusic = null;
        }
    }
    
    /**
     * Update volume settings
     */
    setMasterVolume(volume) {
        this.settings.masterVolume = Math.max(0, Math.min(1, volume));
        
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(
                this.settings.masterVolume,
                this.audioContext.currentTime
            );
        }
        
        // Update fallback audio volumes
        for (const audio of this.fallbackAudio.values()) {
            audio.volume = this.settings.sfxVolume * this.settings.masterVolume;
        }
        
        this.saveSettings();
    }
    
    setSfxVolume(volume) {
        this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
        
        if (this.sfxGain) {
            this.sfxGain.gain.setValueAtTime(
                this.settings.sfxVolume,
                this.audioContext.currentTime
            );
        }
        
        // Update fallback audio volumes
        for (const audio of this.fallbackAudio.values()) {
            audio.volume = this.settings.sfxVolume * this.settings.masterVolume;
        }
        
        this.saveSettings();
    }
    
    setMusicVolume(volume) {
        this.settings.musicVolume = Math.max(0, Math.min(1, volume));
        
        if (this.musicGain) {
            this.musicGain.gain.setValueAtTime(
                this.settings.musicVolume,
                this.audioContext.currentTime
            );
        }
        
        this.saveSettings();
    }
    
    /**
     * Toggle audio on/off
     */
    toggleAudio() {
        this.settings.enabled = !this.settings.enabled;
        
        if (!this.settings.enabled) {
            this.stopMusic();
        }
        
        this.saveSettings();
    }
    
    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('cosmicPongAudioSettings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.settings = { ...this.settings, ...settings };
                
                // Apply loaded settings
                if (this.masterGain) {
                    this.setMasterVolume(this.settings.masterVolume);
                    this.setSfxVolume(this.settings.sfxVolume);
                    this.setMusicVolume(this.settings.musicVolume);
                }
            }
        } catch (error) {
            console.warn('Failed to load audio settings:', error);
        }
    }
    
    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('cosmicPongAudioSettings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Failed to save audio settings:', error);
        }
    }
    
    /**
     * Get current settings
     */
    getSettings() {
        return { ...this.settings };
    }
    
    /**
     * Clean up audio resources
     */
    cleanup() {
        this.stopMusic();
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        for (const audio of this.fallbackAudio.values()) {
            audio.pause();
            audio.src = '';
        }
        
        this.sounds.clear();
        this.fallbackAudio.clear();
    }
    
    /**
     * Check if audio is available and working
     */
    isAudioAvailable() {
        return this.isInitialized && (this.useWebAudioAPI || this.fallbackAudio.size > 0);
    }
    
    /**
     * Get audio system status for debugging
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            userInteracted: this.hasUserInteracted,
            webAudioAPI: this.useWebAudioAPI,
            audioContextState: this.audioContext ? this.audioContext.state : 'unavailable',
            soundsLoaded: this.sounds.size,
            fallbackSounds: this.fallbackAudio.size,
            enabled: this.settings.enabled
        };
    }
}

// Create global audio instance
window.cosmicPongAudio = new CosmicPongAudio();

// Export for module use
window.CosmicPongAudio = CosmicPongAudio;