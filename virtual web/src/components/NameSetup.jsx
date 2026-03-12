import { useState } from 'react'
import './NameSetup.css'

const PRESET_NAMES = ['Petal', 'Luna', 'Mochi', 'Boba', 'Pixel', 'Sunny', 'Nova', 'Coco']

export default function NameSetup({ onConfirm }) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState('')

  const finalName = name.trim() || selected

  const handlePreset = (n) => {
    setSelected(n)
    setName('')
  }

  return (
    <div className="setup-overlay">
      <div className="setup-card">
        <div className="setup-pet-preview">🐱</div>
        <h2 className="setup-title">Meet your new companion!</h2>
        <p className="setup-sub">Give them a name to get started</p>

        <div className="preset-names">
          {PRESET_NAMES.map(n => (
            <button
              key={n}
              className={`preset-btn ${selected === n && !name ? 'active' : ''}`}
              onClick={() => handlePreset(n)}
            >{n}</button>
          ))}
        </div>

        <div className="name-input-row">
          <input
            className="name-input"
            placeholder="Or type your own..."
            value={name}
            onChange={e => { setName(e.target.value); setSelected('') }}
            maxLength={16}
          />
        </div>

        {finalName && (
          <p className="name-preview">Hi, I'm <strong>{finalName}</strong>! 🌸</p>
        )}

        <button
          className="start-btn"
          onClick={() => finalName && onConfirm(finalName)}
          disabled={!finalName}
        >
          Let's Go! 🚀
        </button>
      </div>
    </div>
  )
}
