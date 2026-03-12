import './StatAlerts.css'

const ALERTS = [
  { key: 'hunger',    threshold: 20, icon: '🍎', label: 'Hungry!',      msg: 'needs food badly',     color: '#ff6b6b' },
  { key: 'happiness', threshold: 20, icon: '💔', label: 'Unhappy!',     msg: 'needs some love',      color: '#f9a8d4' },
  { key: 'energy',    threshold: 15, icon: '⚡', label: 'Exhausted!',   msg: 'needs to sleep',       color: '#fde68a' },
  { key: 'hygiene',   threshold: 15, icon: '🛁', label: 'Needs a bath!', msg: 'is getting dirty',    color: '#a5f3fc' },
]

export default function StatAlerts({ hunger, happiness, energy, hygiene, petName }) {
  const stats = { hunger, happiness, energy, hygiene }
  const triggered = ALERTS.filter(a => stats[a.key] <= a.threshold)

  if (triggered.length === 0) return null

  return (
    <div className="stat-alerts">
      {triggered.map(a => (
        <div key={a.key} className="stat-alert" style={{ borderColor: `${a.color}55`, background: `${a.color}15` }}>
          <span className="alert-icon">{a.icon}</span>
          <span className="alert-text">
            <strong style={{ color: a.color }}>{petName} {a.label}</strong>
            <span> — {petName} {a.msg}!</span>
          </span>
        </div>
      ))}
    </div>
  )
}
