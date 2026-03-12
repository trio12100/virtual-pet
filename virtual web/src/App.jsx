import { useState } from 'react'
import Pet from './components/Pet'
import StatusBars from './components/StatusBars'
import ActionButtons from './components/ActionButtons'
import ChatBox from './components/ChatBox'
import DailyMessage from './components/DailyMessage'
import MiniGame from './components/MiniGame'
import Achievements from './components/Achievements'
import NameSetup from './components/NameSetup'
import { usePet } from './hooks/usePet'
import './App.css'

function App() {
  const { pet, feed, play, sleep, petAction, gainXP, setName, resetPet, newAchievement } = usePet()
  const [activeTab, setActiveTab] = useState('home')
  const [showReset, setShowReset] = useState(false)

  // Show name setup if no name
  if (!pet.name) {
    return <NameSetup onConfirm={setName} />
  }

  const xpPct = (pet.xp / (pet.level * 100)) * 100

  return (
    <div className="app">
      <div className="app-container">

        {/* Achievement toast */}
        {newAchievement && (
          <div className="ach-toast">
            <span>{newAchievement.icon}</span>
            <div>
              <strong>Achievement Unlocked!</strong>
              <p>{newAchievement.label}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <h1 className="app-title">🌸 {pet.name}</h1>
            <p className="app-subtitle">Virtual Companion</p>
          </div>
          <div className="header-right">
            <div className="xp-pill">
              <span className="xp-label">Lv.{pet.level}</span>
              <div className="xp-bar-track">
                <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
              </div>
              <span className="xp-val">{pet.xp}<span className="xp-max">/{pet.level * 100}</span></span>
            </div>
          </div>
        </header>

        {/* Daily Message */}
        <DailyMessage mood={pet.mood} />

        {/* Pet Display */}
        <div className="pet-section">
          <Pet
            state={pet.state}
            mood={pet.mood}
            name={pet.name}
            level={pet.level}
            onPetClick={petAction}
          />
        </div>

        {/* Status Bars */}
        <StatusBars
          hunger={pet.hunger}
          happiness={pet.happiness}
          energy={pet.energy}
          hygiene={pet.hygiene}
        />

        {/* Tabs */}
        <div className="tabs">
          {[
            { id: 'home', icon: '🏠', label: 'Care' },
            { id: 'games', icon: '🎮', label: 'Games' },
            { id: 'chat', icon: '💬', label: 'Chat' },
            { id: 'info', icon: '🏆', label: 'Profile' },
          ].map(t => (
            <button
              key={t.id}
              className={`tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'home' && (
            <ActionButtons onFeed={feed} onPlay={play} onSleep={sleep} onPet={petAction} petState={pet.state} />
          )}
          {activeTab === 'games' && (
            <MiniGame onXPGain={gainXP} />
          )}
          {activeTab === 'chat' && (
            <ChatBox petName={pet.name} mood={pet.mood} level={pet.level} />
          )}
          {activeTab === 'info' && (
            <div className="info-tab">
              <div className="info-card">
                <h3>🌟 {pet.name}'s Stats</h3>
                <div className="stat-row"><span>Level</span><strong>{pet.level}</strong></div>
                <div className="stat-row"><span>XP</span><strong>{pet.xp} / {pet.level * 100}</strong></div>
                <div className="stat-row"><span>Days Together</span><strong>{pet.daysAlive}</strong></div>
                <div className="stat-row"><span>Times Fed</span><strong>{pet.timesFed}</strong></div>
                <div className="stat-row"><span>Times Played</span><strong>{pet.timesPlayed}</strong></div>
                <div className="stat-row"><span>Mood</span><strong style={{ textTransform: 'capitalize' }}>{pet.mood}</strong></div>
              </div>

              <Achievements pet={pet} />

              <div className="info-card tips-card">
                <h3>💡 Care Tips</h3>
                <p>• Feed {pet.name} when hunger is low</p>
                <p>• Play to boost happiness</p>
                <p>• Let them sleep when energy drops</p>
                <p>• Click the pet or tap Cuddle to give love</p>
                <p>• Play mini-games to earn bonus XP!</p>
                <p>• Chat anytime you feel lonely 💕</p>
              </div>

              <button className="reset-btn" onClick={() => setShowReset(true)}>🔄 Start Over</button>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirm Modal */}
      {showReset && (
        <div className="modal-overlay" onClick={() => setShowReset(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Start Over?</h3>
            <p>This will reset your pet completely. Are you sure?</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowReset(false)}>Cancel</button>
              <button className="btn-confirm" onClick={() => { resetPet(); setShowReset(false) }}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
