import { useState } from 'react'
import './NameSetup.css'

const PRESET_NAMES = ['Petal', 'Luna', 'Mochi', 'Boba', 'Pixel', 'Sunny', 'Nova', 'Coco']

const SPECIES = [
  { id: 'cat',    label: 'Cat',    icon: '🐱', color: '#ff6eb4', desc: 'Playful & cuddly' },
  { id: 'dog',    label: 'Dog',    icon: '🐶', color: '#f9a84d', desc: 'Loyal & energetic' },
  { id: 'bunny',  label: 'Bunny',  icon: '🐰', color: '#a78bfa', desc: 'Soft & gentle' },
  { id: 'fox',    label: 'Fox',    icon: '🦊', color: '#fb923c', desc: 'Clever & curious' },
]

export default function NameSetup({ onConfirm }) {
  const [step, setStep] = useState(1) // 1 = species, 2 = name
  const [species, setSpecies] = useState('')
  const [name, setName] = useState('')
  const [selected, setSelected] = useState('')

  const finalName = name.trim() || selected
  const speciesData = SPECIES.find(s => s.id === species)

  const handlePreset = (n) => {
    setSelected(n)
    setName('')
  }

  const handleConfirm = () => {
    if (finalName && species) {
      onConfirm(finalName, species)
    }
  }

  return (
    <div className="setup-overlay">
      <div className="setup-card">
        {step === 1 ? (
          <>
            <div className="setup-pet-preview" style={{ fontSize: '3rem' }}>🌸</div>
            <h2 className="setup-title">Choose your companion!</h2>
            <p className="setup-sub">Pick the pet that speaks to you</p>

            <div className="species-grid">
              {SPECIES.map(s => (
                <button
                  key={s.id}
                  className={`species-btn ${species === s.id ? 'active' : ''}`}
                  style={species === s.id ? { borderColor: s.color, boxShadow: `0 0 18px ${s.color}55` } : {}}
                  onClick={() => setSpecies(s.id)}
                >
                  <span className="species-icon">{s.icon}</span>
                  <strong>{s.label}</strong>
                  <span className="species-desc">{s.desc}</span>
                </button>
              ))}
            </div>

            <button
              className="start-btn"
              onClick={() => setStep(2)}
              disabled={!species}
            >
              Next: Name them 🌸
            </button>
          </>
        ) : (
          <>
            <div className="setup-pet-preview" style={{ fontSize: '5rem' }}>
              {speciesData?.icon}
            </div>
            <h2 className="setup-title">Name your {speciesData?.label}!</h2>
            <p className="setup-sub">What will you call them?</p>

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
              <p className="name-preview">Hi, I'm <strong>{finalName}</strong>! {speciesData?.icon}</p>
            )}

            <div className="setup-btn-row">
              <button className="back-step-btn" onClick={() => setStep(1)}>← Back</button>
              <button
                className="start-btn"
                onClick={handleConfirm}
                disabled={!finalName}
                style={{ flex: 1 }}
              >
                Let's Go! 🚀
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
