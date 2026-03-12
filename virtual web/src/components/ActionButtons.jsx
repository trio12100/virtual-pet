import { useState } from 'react'
import './ActionButtons.css'

const ACTIONS = [
  { key: 'feed', label: 'Feed', icon: '🍎', color: '#ff6b6b', desc: 'Give a snack!' },
  { key: 'play', label: 'Play', icon: '🎮', color: '#a8e063', desc: 'Let\'s have fun!' },
  { key: 'sleep', label: 'Sleep', icon: '😴', color: '#9b8fc9', desc: 'Take a nap' },
  { key: 'pet', label: 'Cuddle', icon: '🤗', color: '#ff9ec4', desc: 'Give love!' },
]

export default function ActionButtons({ onFeed, onPlay, onSleep, onPet, petState }) {
  const [lastAction, setLastAction] = useState(null)

  const handlers = { feed: onFeed, play: onPlay, sleep: onSleep, pet: onPet }

  const handleClick = (key) => {
    handlers[key]?.()
    setLastAction(key)
    setTimeout(() => setLastAction(null), 1500)
  }

  const isDisabled = petState === 'sleeping' || petState === 'eating' || petState === 'playing'

  return (
    <div className="action-section">
      {lastAction && (
        <div className="action-feedback">
          {lastAction === 'feed' && '😋 Yummy! Petal is eating!'}
          {lastAction === 'play' && '🎉 Wheee! So fun!'}
          {lastAction === 'sleep' && '😴 Sweet dreams, Petal~'}
          {lastAction === 'pet' && '💕 Petal loves cuddles!'}
        </div>
      )}
      <div className="action-grid">
        {ACTIONS.map(({ key, label, icon, color, desc }) => (
          <button
            key={key}
            className={`action-btn ${lastAction === key ? 'pressed' : ''}`}
            style={{ '--btn-color': color }}
            onClick={() => handleClick(key)}
            disabled={isDisabled && key !== 'sleep'}
          >
            <span className="action-icon">{icon}</span>
            <span className="action-label">{label}</span>
            <span className="action-desc">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
