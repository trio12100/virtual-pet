import './Achievements.css'

export const ACHIEVEMENT_LIST = [
  { id: 'first_feed',   icon: '🍎', label: 'First Meal',     desc: 'Fed your pet for the first time',  check: p => p.timesFed >= 1 },
  { id: 'fed_10',       icon: '🍽️', label: 'Foodie',         desc: 'Fed your pet 10 times',            check: p => p.timesFed >= 10 },
  { id: 'first_play',   icon: '🎮', label: 'Playtime!',      desc: 'Played with your pet',             check: p => p.timesPlayed >= 1 },
  { id: 'play_10',      icon: '🎉', label: 'Game On',        desc: 'Played 10 times',                  check: p => p.timesPlayed >= 10 },
  { id: 'level_2',      icon: '⭐', label: 'Growing Up',     desc: 'Reached Level 2',                  check: p => p.level >= 2 },
  { id: 'level_5',      icon: '🌟', label: 'Superstar',      desc: 'Reached Level 5',                  check: p => p.level >= 5 },
  { id: 'days_3',       icon: '📅', label: '3 Day Buddy',    desc: 'Cared for pet 3 days',             check: p => p.daysAlive >= 3 },
  { id: 'days_7',       icon: '🗓️', label: 'Week Together',  desc: 'Kept your pet for 7 days',         check: p => p.daysAlive >= 7 },
  { id: 'ecstatic',     icon: '🥳', label: 'Pure Joy',       desc: 'Pet reached ecstatic mood',        check: p => p.mood === 'ecstatic' },
  { id: 'max_stats',    icon: '💯', label: 'Perfect Care',   desc: 'All stats above 90',               check: p => p.hunger > 90 && p.happiness > 90 && p.energy > 90 && p.hygiene > 90 },
]

export default function Achievements({ pet }) {
  const unlocked = new Set(pet.achievements || [])

  const earned   = ACHIEVEMENT_LIST.filter(a => unlocked.has(a.id))
  const locked   = ACHIEVEMENT_LIST.filter(a => !unlocked.has(a.id))

  return (
    <div className="achievements">
      <div className="ach-summary">
        <span className="ach-count">{earned.length}</span>
        <span className="ach-total"> / {ACHIEVEMENT_LIST.length} unlocked</span>
        <div className="ach-bar-track">
          <div className="ach-bar-fill" style={{ width: `${(earned.length / ACHIEVEMENT_LIST.length) * 100}%` }} />
        </div>
      </div>

      {earned.length > 0 && (
        <div className="ach-section">
          <p className="ach-section-label">✅ Unlocked</p>
          <div className="ach-grid">
            {earned.map(a => (
              <div key={a.id} className="ach-badge earned">
                <span className="ach-badge-icon">{a.icon}</span>
                <span className="ach-badge-label">{a.label}</span>
                <span className="ach-badge-desc">{a.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div className="ach-section">
          <p className="ach-section-label">🔒 Locked</p>
          <div className="ach-grid">
            {locked.map(a => (
              <div key={a.id} className="ach-badge locked">
                <span className="ach-badge-icon">🔒</span>
                <span className="ach-badge-label">{a.label}</span>
                <span className="ach-badge-desc">{a.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
