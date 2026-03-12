import './LevelUp.css'

export default function LevelUp({ level, onClose }) {
  return (
    <div className="levelup-overlay" onClick={onClose}>
      <div className="levelup-card" onClick={e => e.stopPropagation()}>
        <div className="levelup-stars">✨ ⭐ ✨</div>
        <div className="levelup-emoji">🥳</div>
        <h2 className="levelup-title">Level Up!</h2>
        <p className="levelup-sub">Your pet is now</p>
        <div className="levelup-level">Level {level}</div>
        <p className="levelup-msg">Keep caring and you'll both grow stronger! 💪</p>
        <button className="levelup-btn" onClick={onClose}>Awesome! 🎉</button>
      </div>
    </div>
  )
}
