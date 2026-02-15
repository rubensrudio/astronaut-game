// Audio context for sound effects
let audioContext = null

// Initialize audio context (must be called after user interaction)
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContext
}

// Play ring collection sound (Sonic-style)
function playRingSound() {
    const ctx = initAudio()
    
    // Create oscillator for the "ping" sound
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    // Connect nodes
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Configure sound - high pitched "ping" like Sonic rings
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime) // Start at 800Hz
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05) // Sweep up
    
    // Volume envelope - quick attack and decay
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    
    // Play sound
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
}

// Play jump sound
function playJumpSound() {
    const ctx = initAudio()
    
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
}

// Play game over sound
function playGameOverSound() {
    const ctx = initAudio()
    
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5)
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
}

// Play victory fanfare (upbeat melody)
function playVictorySound() {
    const ctx = initAudio()
    
    // Victory melody: C5 -> E5 -> G5 -> C6 (triumphant arpeggio)
    const notes = [
        { freq: 523.25, time: 0, duration: 0.15 },      // C5
        { freq: 659.25, time: 0.15, duration: 0.15 },   // E5
        { freq: 783.99, time: 0.3, duration: 0.15 },    // G5
        { freq: 1046.50, time: 0.45, duration: 0.4 }    // C6 (longer)
    ]
    
    notes.forEach(note => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.type = 'triangle'
        oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time)
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime + note.time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.time + note.duration)
        
        oscillator.start(ctx.currentTime + note.time)
        oscillator.stop(ctx.currentTime + note.time + note.duration)
    })
    
    // Return total duration of the victory sound
    return 850 // milliseconds
}

// Play defeat sound (sad/quick descending melody)
function playDefeatSound() {
    const ctx = initAudio()
    
    // Defeat melody: G5 -> E5 -> C5 (descending sad notes)
    const notes = [
        { freq: 783.99, time: 0, duration: 0.15 },      // G5
        { freq: 659.25, time: 0.2, duration: 0.15 },    // E5
        { freq: 523.25, time: 0.4, duration: 0.3 }      // C5 (longer, sad)
    ]
    
    notes.forEach(note => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time)
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime + note.time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.time + note.duration)
        
        oscillator.start(ctx.currentTime + note.time)
        oscillator.stop(ctx.currentTime + note.time + note.duration)
    })
    
    // Return total duration of the defeat sound
    return 700 // milliseconds
}

export { initAudio, playRingSound, playJumpSound, playGameOverSound, playVictorySound, playDefeatSound }
