import { useState } from 'react'
import './Shop.css'

const ITEMS = [
  { id: 'apple',    icon: '🍎', name: 'Apple',       desc: '+30 Hunger',          cost: 10, stat: 'hunger',    amount: 30 },
  { id: 'cake',     icon: '🎂', name: 'Cake',         desc: '+25 Hunger, +10 Happy', cost: 18, stat: 'both',    amount: 25, bonus: 10 },
  { id: 'toy',      icon: '🧸', name: 'Plush Toy',    desc: '+30 Happiness',       cost: 12, stat: 'happiness', amount: 30 },
  { id: 'balloon',  icon: '🎈', name: 'Balloon',      desc: '+20 Happiness',       cost: 8,  stat: 'happiness', amount: 20 },
  { id: 'pillow',   icon: '🛏️', name: 'Cozy Pillow',  desc: '+35 Energy',          cost: 14, stat: 'energy',   amount: 35 },
  { id: 'coffee',   icon: '☕', name: 'Energy Drink', desc: '+20 Energy',          cost: 9,  stat: 'energy',    amount: 20 },
  { id: 'soap',     icon: '🧼', name: 'Bubble Bath',  desc: '+40 Hygiene',         cost: 12, stat: 'hygiene',   amount: 40 },
  { id: 'spray',    icon: '💐', name: 'Perfume',      desc: '+20 Hygiene, +5 Happy', cost: 10, stat: 'hygieneplus', amount: 20, bonus: 5 },
  { id: 'xppotion', icon: '⭐', name: 'XP Potion',   desc: '+25 XP',              cost: 20, stat: 'xp',        amount: 25 },
  { id: 'lucky',    icon: '🍀', name: 'Lucky Charm',  desc: '+15 All Stats',       cost: 30, stat: 'all',      amount: 15 },
]

export default function Shop({ coins, onBuy }) {
  const [bought, setBought] = useState(null)
  const [insufficient, setInsufficient] = useState(null)

  const handleBuy = (item) => {
    if (coins < item.cost) {
      setInsufficient(item.id)
      setTimeout(() => setInsufficient(null), 1200)
      return
    }
    onBuy(item)
    setBought(item.id)
    setTimeout(() => setBought(null), 1500)
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <p className="shop-coins">🪙 {coins} coins</p>
        <p className="shop-hint">Earn coins by caring for your pet!</p>
      </div>

      <div className="shop-grid">
        {ITEMS.map(item => (
          <div
            key={item.id}
            className={`shop-item ${bought === item.id ? 'bought' : ''} ${insufficient === item.id ? 'shake-no' : ''}`}
          >
            <span className="shop-item-icon">{item.icon}</span>
            <span className="shop-item-name">{item.name}</span>
            <span className="shop-item-desc">{item.desc}</span>
            <button
              className={`shop-buy-btn ${coins < item.cost ? 'cant-afford' : ''}`}
              onClick={() => handleBuy(item)}
            >
              🪙 {item.cost}
            </button>
            {bought === item.id && <div className="shop-bought-flash">✓ Used!</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
