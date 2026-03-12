import { useState, useEffect, useRef } from 'react'
import './MiniGame.css'

/* ── Number Guess Game ── */
function NumberGuess({ onWin }) {
  const [secret]  = useState(() => Math.floor(Math.random() * 10) + 1)
  const [guess, setGuess]   = useState('')
  const [hint, setHint]     = useState('Pick a number between 1 and 10!')
  const [tries, setTries]   = useState(0)
  const [won, setWon]       = useState(false)

  const check = () => {
    const g = parseInt(guess)
    if (isNaN(g) || g < 1 || g > 10) { setHint('Please pick a number 1–10!'); return }
    const t = tries + 1
    setTries(t)
    if (g === secret) {
      setHint(`🎉 Correct! You got it in ${t} tries!`)
      setWon(true)
      onWin(Math.max(20 - t * 3, 5))
    } else {
      setHint(g < secret ? '📈 Too low! Try higher!' : '📉 Too high! Try lower!')
    }
    setGuess('')
  }

  return (
    <div className="game-inner">
      <div className="game-icon">🎯</div>
      <h3 className="game-name">Number Guess</h3>
      <p className="game-hint">{hint}</p>
      {!won && (
        <div className="game-controls">
          <input
            className="game-input"
            type="number"
            min="1" max="10"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="1–10"
          />
          <button className="game-btn" onClick={check}>Guess!</button>
        </div>
      )}
      {won && <div className="game-won">+XP earned 🌟</div>}
      <div className="game-tries">Tries: {tries}</div>
    </div>
  )
}

/* ── Reaction Speed Game ── */
function ReactionGame({ onWin }) {
  const [phase, setPhase]   = useState('wait')  // wait | ready | go | result
  const [startTime, setStartTime] = useState(0)
  const [result, setResult] = useState(null)
  const timerRef = useRef(null)

  const startRound = () => {
    setPhase('wait')
    setResult(null)
    const delay = 1500 + Math.random() * 2500
    timerRef.current = setTimeout(() => {
      setPhase('go')
      setStartTime(Date.now())
    }, delay)
  }

  const handleTap = () => {
    if (phase === 'wait') {
      clearTimeout(timerRef.current)
      setPhase('result')
      setResult({ type: 'early' })
      return
    }
    if (phase === 'go') {
      const ms = Date.now() - startTime
      setPhase('result')
      setResult({ type: 'ok', ms })
      if (ms < 600) onWin(15)
      else if (ms < 900) onWin(8)
      else onWin(3)
    }
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div className="game-inner">
      <div className="game-icon">⚡</div>
      <h3 className="game-name">Reaction Speed</h3>

      {phase === 'wait' && (
        <>
          <p className="game-hint">Wait for GREEN then tap!</p>
          <div className="reaction-box waiting" onClick={handleTap}>
            <span>Wait...</span>
          </div>
        </>
      )}
      {phase === 'go' && (
        <div className="reaction-box go" onClick={handleTap}>
          <span>TAP! 🟢</span>
        </div>
      )}
      {phase === 'result' && result && (
        <>
          {result.type === 'early' && <p className="game-hint bad">⚠️ Too early! Try again.</p>}
          {result.type === 'ok' && (
            <p className="game-hint">
              {result.ms < 300 ? '🚀 Insane!' : result.ms < 500 ? '⚡ Fast!' : result.ms < 800 ? '👍 Good!' : '🐢 Slow~'}
              {' '}{result.ms}ms
            </p>
          )}
          <button className="game-btn" onClick={startRound}>Play Again</button>
        </>
      )}
      {phase === 'wait' && <div className="game-hint small">Tap the box when it turns green</div>}
    </div>
  )
}

/* ── Memory Match (Emoji pairs) ── */
const EMOJIS = ['🐱','🐶','🐸','🐼','🦊','🐧','🦄','🐨']

function MemoryGame({ onWin }) {
  const initCards = () =>
    [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))

  const [cards, setCards] = useState(initCards)
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [locked, setLocked] = useState(false)

  const flip = (id) => {
    if (locked || flipped.length === 2) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return

    const newFlipped = [...flipped, id]
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c))
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      setLocked(true)
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid))
      if (a.emoji === b.emoji) {
        setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c))
        setFlipped([])
        setLocked(false)
        // check win
        setCards(prev => {
          const updated = prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c)
          if (updated.every(c => c.matched)) {
            setWon(true)
            onWin(Math.max(25 - moves, 5))
          }
          return updated
        })
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c))
          setFlipped([])
          setLocked(false)
        }, 900)
      }
    }
  }

  return (
    <div className="game-inner">
      <div className="game-icon">🃏</div>
      <h3 className="game-name">Memory Match</h3>
      {won
        ? <p className="game-hint">🎉 Matched all in {moves} moves! +XP!</p>
        : <p className="game-hint">Flip cards to find pairs! Moves: {moves}</p>
      }
      <div className="memory-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'revealed' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => flip(card.id)}
          >
            <span>{card.flipped || card.matched ? card.emoji : '❓'}</span>
          </div>
        ))}
      </div>
      {won && (
        <button className="game-btn" onClick={() => { setCards(initCards()); setMoves(0); setWon(false); setFlipped([]) }}>
          Play Again
        </button>
      )}
    </div>
  )
}

/* ── Word Scramble Game ── */
const WORD_LIST = [
  { word: 'happy',      hint: 'A positive feeling 😊' },
  { word: 'friend',     hint: 'Someone you like a lot 💕' },
  { word: 'sunny',      hint: 'Bright weather ☀️' },
  { word: 'ocean',      hint: 'Big body of water 🌊' },
  { word: 'flower',     hint: 'Pretty and smells nice 🌸' },
  { word: 'smile',      hint: 'What your face does when happy 😄' },
  { word: 'dream',      hint: 'Happens when you sleep 🌙' },
  { word: 'star',       hint: 'Twinkles in the night sky ⭐' },
  { word: 'magic',      hint: 'Something mysterious and wonderful ✨' },
  { word: 'bunny',      hint: 'Fluffy pet with big ears 🐰' },
  { word: 'cozy',       hint: 'Warm and comfortable feeling 🧸' },
  { word: 'cloud',      hint: 'Floats in the sky ☁️' },
  { word: 'brave',      hint: 'Not afraid to face challenges 💪' },
  { word: 'peace',      hint: 'Calm and quiet feeling 🕊️' },
  { word: 'glow',       hint: 'Gives off light ✨' },
]

function scramble(word) {
  const arr = word.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('') === word ? scramble(word) : arr.join('')
}

function WordScramble({ onWin }) {
  const [idx]              = useState(() => Math.floor(Math.random() * WORD_LIST.length))
  const [scrambled]        = useState(() => scramble(WORD_LIST[idx < WORD_LIST.length ? idx : 0].word))
  const [guess, setGuess]  = useState('')
  const [status, setStatus] = useState('playing') // playing | won | hint
  const [showHint, setShowHint] = useState(false)
  const [tries, setTries]  = useState(0)

  const entry = WORD_LIST[idx]

  const check = () => {
    const t = tries + 1
    setTries(t)
    if (guess.trim().toLowerCase() === entry.word) {
      setStatus('won')
      const xp = showHint ? 8 : t <= 2 ? 20 : t <= 4 ? 14 : 8
      onWin(xp)
    } else {
      setGuess('')
      setStatus('wrong')
      setTimeout(() => setStatus('playing'), 800)
    }
  }

  return (
    <div className="game-inner">
      <div className="game-icon">🔤</div>
      <h3 className="game-name">Word Scramble</h3>
      <div className="scramble-word">{scrambled.toUpperCase()}</div>
      {showHint && <p className="game-hint hint-text">💡 Hint: {entry.hint}</p>}
      {!showHint && status !== 'won' && (
        <button className="hint-btn" onClick={() => setShowHint(true)}>Show hint 💡</button>
      )}
      {status === 'wrong' && <p className="game-hint bad">❌ Try again!</p>}
      {status !== 'won' ? (
        <div className="game-controls">
          <input
            className="game-input"
            type="text"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && guess.trim() && check()}
            placeholder="Unscramble it!"
            maxLength={12}
            autoComplete="off"
          />
          <button className="game-btn" onClick={check} disabled={!guess.trim()}>Check!</button>
        </div>
      ) : (
        <div>
          <p className="game-hint">🎉 "{entry.word}" is correct! +XP! 🌟</p>
          <div className="game-won">You got it in {tries} {tries === 1 ? 'try' : 'tries'}!</div>
        </div>
      )}
      <div className="game-tries">Tries: {tries}</div>
    </div>
  )
}

/* ── Root game selector ── */
const GAMES = [
  { id: 'number',   label: 'Number Guess', icon: '🎯', desc: 'Guess the secret number!' },
  { id: 'reaction', label: 'Reaction',     icon: '⚡', desc: 'Test your reaction speed!' },
  { id: 'memory',   label: 'Memory Match', icon: '🃏', desc: 'Flip and match pairs!' },
  { id: 'scramble', label: 'Word Scramble', icon: '🔤', desc: 'Unscramble the hidden word!' },
]

export default function MiniGame({ onXPGain }) {
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')

  const handleWin = (xp) => {
    onXPGain?.(xp)
    setToast(`+${xp} XP earned! 🌟`)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="minigame-section">
      {toast && <div className="xp-toast">{toast}</div>}

      {!selected ? (
        <>
          <p className="game-pick-label">🎮 Pick a game to play!</p>
          <div className="game-list">
            {GAMES.map(g => (
              <button key={g.id} className="game-card" onClick={() => setSelected(g.id)}>
                <span className="gc-icon">{g.icon}</span>
                <div className="gc-info">
                  <strong>{g.label}</strong>
                  <span>{g.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="game-panel">
          <button className="back-btn" onClick={() => setSelected(null)}>← Back</button>
          {selected === 'number'   && <NumberGuess  onWin={handleWin} key={selected + Date.now()} />}
          {selected === 'reaction' && <ReactionGame onWin={handleWin} key={selected} />}
          {selected === 'memory'   && <MemoryGame   onWin={handleWin} key={selected + Date.now()} />}
          {selected === 'scramble' && <WordScramble onWin={handleWin} key={selected + Date.now()} />}
        </div>
      )}
    </div>
  )
}
