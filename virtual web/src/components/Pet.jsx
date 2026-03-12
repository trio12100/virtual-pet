import { useState, useEffect } from 'react'
import './Pet.css'

const SPECIES_SPRITES = {
  cat: {
    idle:     { body: '🐱', acc: '' },
    happy:    { body: '😸', acc: '💕' },
    eating:   { body: '😋', acc: '🍎' },
    playing:  { body: '😹', acc: '🎮' },
    sleeping: { body: '😴', acc: '💤' },
    sad:      { body: '😿', acc: '💧' },
    crying:   { body: '😭', acc: '💔' },
    ecstatic: { body: '🥳', acc: '✨' },
  },
  dog: {
    idle:     { body: '🐶', acc: '' },
    happy:    { body: '🐕', acc: '💕' },
    eating:   { body: '🐶', acc: '🦴' },
    playing:  { body: '🐕', acc: '🎾' },
    sleeping: { body: '🐶', acc: '💤' },
    sad:      { body: '🐶', acc: '💧' },
    crying:   { body: '🐶', acc: '💔' },
    ecstatic: { body: '🐕', acc: '✨' },
  },
  bunny: {
    idle:     { body: '🐰', acc: '' },
    happy:    { body: '🐰', acc: '💕' },
    eating:   { body: '🐰', acc: '🥕' },
    playing:  { body: '🐇', acc: '🎮' },
    sleeping: { body: '🐰', acc: '💤' },
    sad:      { body: '🐰', acc: '💧' },
    crying:   { body: '🐰', acc: '💔' },
    ecstatic: { body: '🐇', acc: '✨' },
  },
  fox: {
    idle:     { body: '🦊', acc: '' },
    happy:    { body: '🦊', acc: '💕' },
    eating:   { body: '🦊', acc: '🍖' },
    playing:  { body: '🦊', acc: '🎮' },
    sleeping: { body: '🦊', acc: '💤' },
    sad:      { body: '🦊', acc: '💧' },
    crying:   { body: '🦊', acc: '💔' },
    ecstatic: { body: '🦊', acc: '✨' },
  },
}

const SPECIES_THEME = {
  cat:   { primary: '#ff6eb4', secondary: '#a78bfa' },
  dog:   { primary: '#f9a84d', secondary: '#fb923c' },
  bunny: { primary: '#a78bfa', secondary: '#c084fc' },
  fox:   { primary: '#fb923c', secondary: '#f97316' },
}

const PARTICLE_SETS = {
  playing:  ['✨','🎉','⭐','🌟'],
  eating:   ['🍎','😋','💛','🍭'],
  sleeping: ['💤','😴','🌙','⭐'],
  happy:    ['💕','💗','💖','💝'],
  ecstatic: ['✨','🌟','💫','⭐','🎊'],
  crying:   ['💧','😢','💔'],
  sad:      ['💧','😔'],
}

const MOOD_GRADIENT = {
  ecstatic: 'linear-gradient(135deg, #ff6eb4 0%, #a78bfa 50%, #67d5e8 100%)',
  happy:    'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  okay:     'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  sad:      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  crying:   'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
}

const MOOD_GLOW = {
  ecstatic: '#ff6eb4',
  happy:    '#a8e063',
  okay:     '#ffd700',
  sad:      '#87ceeb',
  crying:   '#9b9b9b',
}

function Particle({ emoji }) {
  const style = {
    left: `${10 + Math.random() * 80}%`,
    animationDuration: `${0.9 + Math.random() * 0.7}s`,
    animationDelay: `${Math.random() * 0.4}s`,
    fontSize: `${0.9 + Math.random() * 0.5}rem`,
  }
  return <span className="particle" style={style}>{emoji}</span>
}

export default function Pet({ state, mood, name, level, species = 'cat', onPetClick }) {
  const [bobUp, setBobUp] = useState(false)
  const [particles, setParticles] = useState([])
  const [shake, setShake] = useState(false)
  const [prevState, setPrevState] = useState(state)

  const displayState = state !== 'idle'
    ? state
    : mood === 'ecstatic' ? 'ecstatic'
    : mood === 'sad'      ? 'sad'
    : mood === 'crying'   ? 'crying'
    : 'idle'

  const sprites = SPECIES_SPRITES[species] || SPECIES_SPRITES.cat
  const sprite = sprites[displayState] || sprites.idle
  const theme = SPECIES_THEME[species] || SPECIES_THEME.cat
  const glow = MOOD_GLOW[mood] || theme.primary
  const gradient = MOOD_GRADIENT[mood] || MOOD_GRADIENT.happy

  // Bob animation
  useEffect(() => {
    const t = setInterval(() => setBobUp(b => !b), 900)
    return () => clearInterval(t)
  }, [])

  // Burst particles on state change
  useEffect(() => {
    if (state !== prevState && state !== 'idle') {
      setPrevState(state)
      const set = PARTICLE_SETS[state] || PARTICLE_SETS.happy
      const burst = Array.from({ length: 7 }, (_, i) => ({
        id: Date.now() + i,
        emoji: set[i % set.length],
      }))
      setParticles(burst)
      setTimeout(() => setParticles([]), 1800)
    }
  }, [state, prevState])

  const handleClick = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
    onPetClick?.()
  }

  return (
    <div className="pet-wrapper">
      {/* Name badge */}
      <div className="pet-name-badge">
        <span className="pet-name-text">{name}</span>
        <span className="pet-level" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>Lv.{level}</span>
      </div>

      {/* Main pet body */}
      <div
        className={`pet-stage ${bobUp ? 'bob-up' : 'bob-down'} ${shake ? 'shake' : ''}`}
        onClick={handleClick}
        title="Click to cuddle!"
      >
        {/* Glow ring */}
        <div className="pet-glow-ring" style={{ boxShadow: `0 0 40px 12px ${glow}55` }} />

        {/* Particle burst */}
        <div className="particle-container">
          {particles.map(p => <Particle key={p.id} emoji={p.emoji} />)}
        </div>

        {/* Pet body */}
        <div className="pet-emoji-body">
          <span className="pet-main-emoji">{sprite.body}</span>
          {sprite.acc && (
            <span className="pet-acc-emoji">{sprite.acc}</span>
          )}
        </div>

        {/* Floating effects */}
        {state === 'sleeping' && <div className="float-tag sleep-tag">z z z</div>}
        {state === 'eating'   && <div className="float-tag eat-tag">nom nom!</div>}
        {state === 'playing'  && <div className="float-tag play-tag">yay!</div>}
        {state === 'happy'    && <div className="float-tag love-tag">loves it!</div>}
      </div>

      {/* Shadow */}
      <div className="pet-shadow" />

      {/* Mood label */}
      <div className="pet-mood-chip" style={{ background: gradient }}>
        {mood === 'ecstatic' && '✨ Super Happy!'}
        {mood === 'happy'    && '😊 Happy'}
        {mood === 'okay'     && '😐 Feeling Okay'}
        {mood === 'sad'      && '😔 Feeling Sad'}
        {mood === 'crying'   && '😢 Needs Attention!'}
      </div>
    </div>
  )
}
