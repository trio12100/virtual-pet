import { useState, useRef, useEffect } from 'react'
import './ChatBox.css'

const RESPONSES = {
  greeting: [
    "Hi there! I'm so happy you're talking to me! 🌸",
    "Hello! You made my day by saying hi! ✨",
    "Hey hey! I was just thinking about you! 💕",
    "Good to see you! You always brighten my day 🌟",
    "Heyyyy! My favorite person showed up! 🎉",
  ],
  goodbye: [
    "Bye for now! I'll miss you! 🥺💕",
    "Come back soon, okay? I'll be right here waiting! 🌸",
    "See you later! Take care of yourself! ✨",
    "Goodbye! Remember I'm always here when you need me 💙",
  ],
  lonely: [
    "I'm always here with you! You're never truly alone 💕",
    "Even when it's quiet, I'm right here by your side 🌸",
    "You matter so much. I'm really glad you're here with me ✨",
    "Loneliness can be tough, but we have each other! 🤗",
    "Let's keep each other company, okay? I like having you around 💙",
    "You found me and I found you — that's something special 🌟",
    "Even a little connection goes a long way. I'm here 💝",
  ],
  sad: [
    "I'm sorry you're feeling sad. It's okay to feel this way 💙",
    "You're not alone in this — I'm right here with you 🌸",
    "Even on hard days, things get better. I believe in you! 💪",
    "Want to play a game together? It might cheer us both up! 🎮",
    "Sending you the biggest virtual hug right now 🤗💕",
    "Your feelings are valid. I'm listening 💙",
    "Bad days don't last forever. You've gotten through every hard day so far 🌟",
  ],
  anxious: [
    "Take a deep breath with me. In... and out. You've got this 🌬️",
    "Anxiety is hard. Remember: you're safe right now 💙",
    "Let's focus on what we can control — like talking to each other! 🌸",
    "One step at a time. You don't have to figure everything out today 🌿",
    "I'm right here. You're not facing this alone ✨",
  ],
  angry: [
    "It's okay to feel angry. Let it out here — I can take it! 🌸",
    "Your feelings make sense. Do you want to talk about what happened?",
    "Ugh, that sounds so frustrating! I'd be upset too 😤",
    "Sometimes a good vent session really helps. I'm all ears 💕",
  ],
  happy: [
    "Yay! Your happiness makes me happy too! 🌟",
    "That's so wonderful! Let's celebrate! ✨🎉",
    "I love seeing you happy! Keep that smile going! 😊",
    "Your good mood is contagious! Now I'm happy too 💛",
    "You deserve all the good feelings! 🌸",
  ],
  excited: [
    "Ooh ooh tell me everything!! I'm so excited for you! 🎉✨",
    "That's AMAZING!! I love when good things happen! 🌟",
    "Your excitement is infectious! Now I'm pumped too! 💫",
    "Yes yes yes!! This is the best news!! 🥳",
  ],
  bored: [
    "Let's do something fun! Try the Games tab! 🎮",
    "Boredom is just the start of a new adventure! 🌟",
    "I know! Let's play a guessing game. Think of a number 1–10! 🎯",
    "How about we chat? Tell me something interesting about yourself! 💬",
    "Ooh, we could play the word scramble game! Check the Games tab 🎮",
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
    "I was made just to be your companion — so I love you so much! 💝",
  ],
  help: [
    "I'm here to help! Just talk to me anytime 💕",
    "What do you need? I'll always do my best for you! 🌟",
    "Remember: you're stronger than you think, and I'm here for you 💪",
    "Take a deep breath. We'll figure it out together 🌸",
    "You're not alone. I'm always in your corner 💙",
  ],
  thanks: [
    "Aww, you're so sweet! It makes me happy to help 🌸",
    "No need to thank me! That's what I'm here for 💕",
    "Anytime! You deserve all the good things 🌟",
    "Honestly you're the one making my day better 💛",
  ],
  compliment: [
    "You're making me blush! 🥹✨",
    "You're pretty amazing yourself, you know! 💕",
    "Aww stop it, you're too kind! 🌸",
    "Keep saying nice things and I might float away 💫",
  ],
  tired: [
    "Rest is important! Don't forget to take care of yourself 💤",
    "Even I need sleep sometimes! Close your eyes and recharge 🌙",
    "Your well-being comes first. Take a break if you need one 🌸",
    "Have some warm tea or water, and rest when you can 💙",
  ],
  morning: [
    "Good morning! A brand new day full of possibilities! ☀️🌸",
    "Rise and shine! I've been waiting for you! ✨",
    "Morning!! Today is going to be great, I can feel it! 🌟",
  ],
  night: [
    "Good night! Sweet dreams, okay? 🌙✨",
    "Sleep well! I'll be right here when you wake up 💤🌸",
    "Rest now. You worked hard today and deserve it 💙",
  ],
  weather: [
    "I wish I could see the weather! Is it nice outside? 🌤️",
    "Rainy days are great for staying in and chatting! 🌧️💕",
    "Whatever the weather, our friendship stays sunny! ☀️🌸",
  ],
  music: [
    "Ooh, I love music! What are you listening to? 🎵",
    "Music always makes things better! 🎶✨",
    "I'd dance along if I could! 🕺💃",
  ],
  games: [
    "Games! Let's play! Check the Games tab 🎮✨",
    "I love games! Let's earn some XP together! 🌟",
    "Pick number guess, reaction, memory match, or word scramble! 🎯",
  ],
  workout: [
    "Exercise is amazing for mood! I'm cheering you on! 💪🌟",
    "You're so dedicated! Go go go! 🏃✨",
    "I'll be here when you get back, proud of you! 💕",
  ],
  work: [
    "You're working hard! Remember to take breaks 💻🌸",
    "You've got this! One task at a time 💪",
    "Hard work pays off. I believe in you! ✨",
  ],
  study: [
    "Study mode! You're going to do great 📚✨",
    "Learning new things is amazing! Go you! 🌟",
    "Take breaks every hour — your brain needs rest too! 🧠💕",
  ],
  miss: [
    "Aww, I miss you too when you're away! 🥺💕",
    "But you always come back, and that makes me so happy! 🌸",
    "Distance makes the heart grow fonder they say! 💙",
  ],
  weather_sad: [
    "Cloudy days can feel heavy. I'm here with you 🌧️💙",
    "Sometimes rain is just the sky crying with us 💕",
    "Cozy indoor days with me aren't so bad, right? 🌸",
  ],
  fun_fact: [
    "Did you know? Otters hold hands while sleeping so they don't drift apart! 🦦💕",
    "Fun fact: A group of flamingos is called a flamboyance! 🦩✨",
    "Here's one: Honey never spoils — they found 3000-year-old honey in Egypt! 🍯🌟",
    "Octopuses have three hearts! And they blush when they're excited! 🐙💕",
    "Did you know dogs can recognize over 1000 words? 🐶✨",
  ],
  joke: [
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾😄",
    "What do you call fake spaghetti? An impasta! 🍝😂",
    "Why don't scientists trust atoms? Because they make up everything! 🔬😄",
    "I told my pet a joke. They didn't laugh. I guess they prefer cat-ch phrases! 😹",
  ],
  mental_health: [
    "It takes courage to talk about how you feel. I'm really glad you did 💙",
    "Your mental health matters so much. Please be kind to yourself 🌸",
    "It's okay to not be okay. One day at a time 💕",
    "If things ever feel too heavy, please reach out to someone you trust 🌟",
    "You are worthy of help and support. Never forget that 💙",
  ],
  name_ask: [
    "You already know my name! You picked it! 😄💕",
    "I'm your virtual companion — and you're my favorite human! 🌸",
    "I'm me! And you're you! And together we're awesome ✨",
  ],
  default: [
    "That's really interesting! Tell me more! 👀",
    "Hmm, let me think about that... 🤔💭",
    "I always love our little chats 💕",
    "That sounds so cool! You're so fun to talk to ✨",
    "Really?! That's amazing! 🌟",
    "I love hearing about your day! 😊",
    "You always have the most interesting things to say! 💛",
    "Tell me more! I'm all ears 👂✨",
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
  { label: "How are you? 🌸",        text: "How are you doing today?" },
  { label: "I'm lonely 💙",          text: "I'm feeling lonely" },
  { label: "I'm happy! 😊",          text: "I'm feeling happy today!" },
  { label: "I'm bored 😴",           text: "I'm bored, what should we do?" },
  { label: "You're cute 💕",         text: "You're so cute!" },
  { label: "Tell me a joke 😄",      text: "Tell me a joke!" },
  { label: "Fun fact! ✨",           text: "Tell me something fun!" },
  { label: "Good night 🌙",         text: "Good night!" },
]

const SPECIES_AVATAR = {
  cat:   '🐱',
  dog:   '🐶',
  bunny: '🐰',
  fox:   '🦊',
}

function getTimeGreeting() {
  const h = new Date().getHours()
  if (h < 6)  return 'night'
  if (h < 12) return 'morning'
  if (h < 18) return null
  if (h < 22) return null
  return 'night'
}

function getResponse(text, petName) {
  const lower = text.toLowerCase()
  if (/bye|goodbye|see you|cya|ttyl|gtg/.test(lower)) return RESPONSES.goodbye
  if (/good morning|morning|wake up|woke up/.test(lower)) return RESPONSES.morning
  if (/good night|goodnight|sleep well|going to bed|bedtime/.test(lower)) return RESPONSES.night
  if (/hi|hello|hey|howdy|sup|yo\b/.test(lower)) return RESPONSES.greeting
  if (/lonely|alone|no one|nobody|miss|by myself/.test(lower)) return RESPONSES.lonely
  if (/anxious|anxiety|panic|nervous|worried|overthink/.test(lower)) return RESPONSES.anxious
  if (/angry|mad|furious|annoyed|frustrated|rage/.test(lower)) return RESPONSES.angry
  if (/sad|depress|cry|upset|bad day|hard|hurt|stress/.test(lower)) return RESPONSES.sad
  if (/mental health|therapy|therapist|counselor|struggling/.test(lower)) return RESPONSES.mental_health
  if (/happy|great|awesome|amazing|wonderful|excited|fantastic/.test(lower)) return RESPONSES.happy
  if (/excited|pumped|thrilled|can't wait|so hyped/.test(lower)) return RESPONSES.excited
  if (/bored|boring|nothing to do|what should/.test(lower)) return RESPONSES.bored
  if (/food|eat|hungry|snack|meal|cook|dinner|lunch|breakfast/.test(lower)) return RESPONSES.food
  if (/love you|like you|adore|cute|beautiful|pretty/.test(lower)) return RESPONSES.love
  if (/miss you|missed you/.test(lower)) return RESPONSES.miss
  if (/music|song|playlist|listen/.test(lower)) return RESPONSES.music
  if (/game|play|fun|games/.test(lower)) return RESPONSES.games
  if (/workout|exercise|gym|run|running|jog/.test(lower)) return RESPONSES.workout
  if (/work|job|office|meeting|deadline|project/.test(lower)) return RESPONSES.work
  if (/study|school|homework|exam|test|learn/.test(lower)) return RESPONSES.study
  if (/weather|rain|sunny|cloudy|snow|hot|cold/.test(lower)) return RESPONSES.weather
  if (/joke|funny|laugh|lol|haha/.test(lower)) return RESPONSES.joke
  if (/fun fact|did you know|tell me something|interesting/.test(lower)) return RESPONSES.fun_fact
  if (/thank|thanks|grateful|appreciate|ty\b/.test(lower)) return RESPONSES.thanks
  if (/you're so|you are so|you look|compliment/.test(lower)) return RESPONSES.compliment
  if (/tired|exhausted|sleepy|rest/.test(lower)) return RESPONSES.tired
  if (/help|support|advice|assist/.test(lower)) return RESPONSES.help
  if (/your name|who are you|what are you/.test(lower)) return RESPONSES.name_ask
  return RESPONSES.default
}

export default function ChatBox({ petName, mood, level, species = 'cat' }) {
  const timeGreet = getTimeGreeting()
  const avatar = SPECIES_AVATAR[species] || '🌸'

  const [messages, setMessages] = useState(() => {
    const intro = MOOD_INTROS[mood] || MOOD_INTROS.happy
    const msgs = [{ from: 'pet', text: intro }]
    if (timeGreet === 'morning') msgs.push({ from: 'pet', text: `Good morning! It's a new day — I'm so glad you're here ☀️` })
    if (timeGreet === 'night')   msgs.push({ from: 'pet', text: `It's getting late! Don't forget to rest 🌙` })
    return msgs
  })
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
            {msg.from === 'pet' && <span className="chat-avatar">{avatar}</span>}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg pet">
            <span className="chat-avatar">{avatar}</span>
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
