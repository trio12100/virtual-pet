import './StreakBadge.css'

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 6)  return { label: 'Late Night', icon: '🌙' }
  if (h < 12) return { label: 'Morning', icon: '☀️' }
  if (h < 17) return { label: 'Afternoon', icon: '🌤️' }
  if (h < 21) return { label: 'Evening', icon: '🌆' }
  return { label: 'Night', icon: '🌙' }
}

export default function StreakBadge({ streak = 1, daysAlive = 1 }) {
  const time = getTimeOfDay()
  const streakEmoji = streak >= 7 ? '🔥🔥' : streak >= 3 ? '🔥' : '✨'

  return (
    <div className="streak-row">
      <div className="time-chip">
        <span>{time.icon}</span>
        <span>{time.label}</span>
      </div>
      <div className="streak-chip">
        <span>{streakEmoji}</span>
        <span>{streak}-day streak</span>
      </div>
      <div className="days-chip">
        <span>📅</span>
        <span>Day {daysAlive}</span>
      </div>
    </div>
  )
}
