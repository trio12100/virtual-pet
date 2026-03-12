import { useState, useRef, useEffect } from 'react'
import './ChatBox.css'

const RESPONSES = {
  greeting: [
    "Hi there! I'm so happy you're talking to me! 🌸",
    "Hello! You made my day by saying hi! ✨",
    "Hey hey! I was just thinking about you! 💕",
    "Good to see you! You always brighten my day 🌟",
  ],
  lonely: [
    "I'm always here with you! You're never truly alone 💕",
    "Even when it's quiet, I'm right here by your side 🌸",
    "You matter so much. I'm really glad you're here with me ✨",
    "Loneliness can be tough, but we have each other! 🤗",
    "Let's keep each other company, okay? I like having you around 💙",
  ],
  sad: [
    "I'm sorry you're feeling sad. It's okay to feel this way 💙",
    "You're not alone in this — I'm right here with you 🌸",
    "Even on hard days, things get better. I believe in you! 💪",
    "Want to play a game together? It might cheer us both up! 🎮",
    "Sending you the biggest virtual hug right now 🤗💕",
  ],
  happy: [
    "Yay! Your happiness makes me happy too! 🌟",
    "That's so wonderful! Let's celebrate! ✨🎉",
    "I love seeing you happy! Keep that smile going! 😊",
    "Your good mood is contagious! Now I'm happy too 💛",
  ],
  bored: [
    "Let's do something fun! Try the Games tab! 🎮",
    "Boredom is just the start of a new adventure! 🌟",
    "I know! Let's play a guessing game. Think of a number 1–10! 🎯",
    "How about we chat? Tell me something interesting about yourself! 💬",
  ],
  food: [
    "Ooh food! Don't forget to feed me too! *puppy eyes* 🍎",
    "Yummy! What are you eating? I'm so jealous! 😋",
    "Food is life! I love snack time! 🍭",
    "You're making me hungry just talking about it! 🥺",
  ],
  love: [
    "Aww, I love you too! You're my absolute favorite! 💕💕",
    "That fills my heart with so much joy! 🌸✨",
    "You're the best human ever! Biggest virtual hugs! 🤗",
    "Hearing that makes my little heart glow! 💖",
  ],
  help: [
    "I'm here to help! Just talk to me anytime 💕",
    "What do you need? I'll always do my best for you! 🌟",
    "Remember: you're stronger than you think, and I'm here for you 💪",
    "Take a deep breath. We'll figure it out together 🌸",
  ],
  thanks: [
    "Aww, you're so sweet! It makes me happy to help 🌸",
    "No need to thank me! That's what I'm here for 💕",
    "Anytime! You deserve all the good things 🌟",
  ],
  compliment: [
    "You're making me blush! 🥹✨",
    "You're pretty amazing yourself, you know! 💕",
    "Aww stop it, you're too kind! 🌸",
  ],
  tired: [
    "Rest is important! Don't forget to take care of yourself 💤",
    "Even I need sleep sometimes! Close your eyes and recharge 🌙",
    "Your well-being comes first. Take a break if you need one 🌸",
  ],
  default: [
    "That's really interesting! Tell me more! 👀",
    "Hmm, let me think about that... 🤔💭",
    "I always love our little chats 💕",
    "That sounds so cool! You're so fun to talk to ✨",
    "Really?! That's amazing! 🌟",
    "I love hearing about your day! 😊",
    "You always have the most interesting things to say! 💛",
  ],
}

const MOOD_INTROS = {
  ecstatic: "I'm SO excited right now!! Talk to me!! ✨🥳",
  happy:    "I'm feeling great! What's on your mind? 😊",
  okay:     "I'm okay... a little hungry maybe 🙂 What's up?",
  sad:      "I'm feeling a bit down... can we talk? 💙",
  crying:   "Please take better care of me! But I still love you 😢",
}

const QUICK_REPLIES = [
  { label: "How are you? 🌸",      text: "How are you doing today?" },
  { label: "I'm lonely 💙",        text: "I'm feeling lonely" },
  { label: "I'm happy! 😊",        text: "I'm feeling happy today!" },
  { label: "I'm bored 😴",         text: "I'm bored, what should we do?" },
  { label: "You're cute 💕",       text: "You're so cute!" },
  { label: "Thank you 🙏",         text: "Thank you so much!" },
  { label: "I'm tired 😩",         text: "I'm really tired today" },
  { label: "Tell me something ✨",  text: "Tell me something fun!" },
]

function getResponse(text, petName) {
  const lower = text.toLowerCase()
  if (/hi|hello|hey|good morning|good night|howdy/.test(lower)) return RESPONSES.greeting
  if (/lonely|alone|no one|nobody|miss|by myself/.test(lower)) return RESPONSES.lonely
  if (/sad|depress|cry|upset|bad day|hard|hurt|anxious|stress/.test(lower)) return RESPONSES.sad
  if (/happy|great|awesome|amazing|good|wonderful|excited|love/.test(lower)) return RESPONSES.happy
  if (/bored|boring|nothing to do|what should/.test(lower)) return RESPONSES.bored
  if (/food|eat|hungry|snack|meal|cook/.test(lower)) return RESPONSES.food
  if (/love you|like you|adore|cute|beautiful|pretty/.test(lower)) return RESPONSES.love
  if (/thank|thanks|grateful|appreciate/.test(lower)) return RESPONSES.thanks
  if (/you're so|you are so|you look|compliment/.test(lower)) return RESPONSES.compliment
  if (/tired|exhausted|sleepy|sleep|rest/.test(lower)) return RESPONSES.tired
  if (/help|support|advice|assist/.test(lower)) return RESPONSES.help
  return RESPONSES.default
}

export default function ChatBox({ petName, mood, level }) {
  const [messages, setMessages] = useState([
    { from: 'pet', text: MOOD_INTROS[mood] || MOOD_INTROS.happy }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const msg = (text || input).trim()
    if (!msg) return
    setInput('')
    setShowQuick(false)
    setMessages(prev => [...prev, { from: 'user', text: msg }])
    setTyping(true)

    const responses = getResponse(msg, petName)
    const reply = responses[Math.floor(Math.random() * responses.length)]
      .replace(/Petal/g, petName)

    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'pet', text: reply }])
    }, 700 + Math.random() * 700)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.from}`}>
            {msg.from === 'pet' && <span className="chat-avatar">🌸</span>}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg pet">
            <span className="chat-avatar">🌸</span>
            <div className="chat-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {showQuick && (
        <div className="quick-replies">
          {QUICK_REPLIES.map((q, i) => (
            <button key={i} className="quick-chip" onClick={() => sendMessage(q.text)}>
              {q.label}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-row">
        <button
          className="quick-toggle"
          onClick={() => setShowQuick(s => !s)}
          title="Quick replies"
        >💬</button>
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Talk to ${petName}...`}
          maxLength={200}
        />
        <button className="chat-send" onClick={() => sendMessage()} disabled={!input.trim()}>
          ➤
        </button>
      </div>
    </div>
  )
}
