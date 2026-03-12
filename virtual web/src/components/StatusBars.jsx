import './StatusBars.css'

function Bar({ label, value, icon, color }) {
  const pct = Math.max(0, Math.min(100, value))
  const level = pct >= 60 ? 'good' : pct >= 30 ? 'ok' : 'low'
  return (
    <div className="bar-row">
      <span className="bar-icon">{icon}</span>
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div
          className={`bar-fill ${level}`}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="bar-value">{Math.round(pct)}</span>
    </div>
  )
}

export default function StatusBars({ hunger, happiness, energy, hygiene }) {
  return (
    <div className="status-bars">
      <Bar label="Hunger" value={hunger} icon="🍎" color="linear-gradient(90deg, #ff6b6b, #ffa07a)" />
      <Bar label="Happy" value={happiness} icon="😊" color="linear-gradient(90deg, #a8e063, #56ab2f)" />
      <Bar label="Energy" value={energy} icon="⚡" color="linear-gradient(90deg, #ffd700, #ff8c00)" />
      <Bar label="Clean" value={hygiene} icon="✨" color="linear-gradient(90deg, #67d5e8, #3fa7c1)" />
    </div>
  )
}
