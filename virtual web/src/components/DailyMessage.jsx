import './DailyMessage.css'

const DAILY_MESSAGES = {
  ecstatic: [
    "You're absolutely amazing — never forget that! ✨",
    "Today is a great day because YOU are in it! 🌟",
    "Keep spreading your wonderful energy! 💕",
  ],
  happy: [
    "Good vibes only today! You've got this! 😊",
    "You are loved more than you know 🌸",
    "Small steps every day lead to big changes! 💪",
    "Remember to take breaks and breathe. You deserve rest! 🌿",
  ],
  okay: [
    "Even 'okay' days are worth living. You're doing well! 🙂",
    "Take it one moment at a time. No rush 🌸",
    "Reach out to someone today — connection heals! 💙",
  ],
  sad: [
    "It's okay not to be okay. I'm here with you 💙",
    "You've survived every hard day so far. This one too 💪",
    "Be gentle with yourself today. You deserve kindness 🌸",
  ],
  crying: [
    "Please take care of yourself today — and of me! 💕",
    "Hard times don't last. You are stronger than you feel 💙",
    "One step at a time. You are not alone! 🌟",
  ],
}

export default function DailyMessage({ mood }) {
  const messages = DAILY_MESSAGES[mood] || DAILY_MESSAGES.happy
  const today = new Date().toDateString()
  const idx = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % messages.length

  return (
    <div className="daily-message">
      <span className="daily-icon">💌</span>
      <p>{messages[idx]}</p>
    </div>
  )
}
