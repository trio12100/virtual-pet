import { useEffect, useRef } from 'react'
import './Background.css'

const SYMBOLS = ['✨','🌸','⭐','💕','🌟','💫','🌙','🦋']

export default function Background() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const particles = []

    for (let i = 0; i < 18; i++) {
      const span = document.createElement('span')
      span.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      span.className = 'bg-particle'
      span.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${0.6 + Math.random() * 1}rem;
        animation-duration: ${6 + Math.random() * 8}s;
        animation-delay: ${-Math.random() * 8}s;
        opacity: ${0.04 + Math.random() * 0.08};
      `
      el.appendChild(span)
      particles.push(span)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return <div ref={containerRef} className="bg-particles" />
}
