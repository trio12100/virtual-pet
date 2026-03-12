import { useState, useEffect, useRef } from 'react'
import { ACHIEVEMENT_LIST } from '../components/Achievements'

const INITIAL_PET = {
  name: '',
  species: 'cat',
  level: 1,
  xp: 0,
  hunger: 80,
  happiness: 80,
  energy: 80,
  hygiene: 80,
  mood: 'happy',
  state: 'idle',
  daysAlive: 1,
  timesFed: 0,
  timesPlayed: 0,
  streak: 1,
  lastVisit: Date.now(),
  achievements: [],
  lastSaved: Date.now(),
  startDate: Date.now(),
}

function getMood(hunger, happiness, energy, hygiene) {
  const avg = (hunger + happiness + energy + hygiene) / 4
  if (avg >= 80) return 'ecstatic'
  if (avg >= 60) return 'happy'
  if (avg >= 40) return 'okay'
  if (avg >= 20) return 'sad'
  return 'crying'
}

function checkAchievements(pet) {
  const current = new Set(pet.achievements || [])
  const newOnes = []
  for (const ach of ACHIEVEMENT_LIST) {
    if (!current.has(ach.id) && ach.check(pet)) {
      current.add(ach.id)
      newOnes.push(ach.id)
    }
  }
  return { achievements: [...current], newOnes }
}

function loadPet() {
  try {
    const saved = localStorage.getItem('virtual-pet-v2')
    if (!saved) return { ...INITIAL_PET }
    const data = JSON.parse(saved)
    const elapsed = (Date.now() - data.lastSaved) / 1000 / 60
    const decayRate = Math.min(elapsed * 0.5, 30)
    const daysAlive = Math.max(data.daysAlive || 1, Math.floor((Date.now() - (data.startDate || Date.now())) / 86400000) + 1)
    const pet = {
      ...data,
      daysAlive,
      hunger:    Math.max(0, data.hunger    - decayRate),
      happiness: Math.max(0, data.happiness - decayRate * 0.5),
      energy:    Math.max(0, data.energy    - decayRate * 0.3),
      hygiene:   Math.max(0, data.hygiene   - decayRate * 0.2),
    }
    pet.mood = getMood(pet.hunger, pet.happiness, pet.energy, pet.hygiene)
    return pet
  } catch {
    return { ...INITIAL_PET }
  }
}

function savePet(pet) {
  localStorage.setItem('virtual-pet-v2', JSON.stringify({ ...pet, lastSaved: Date.now() }))
}

export function usePet() {
  const [pet, setPet] = useState(() => loadPet())
  const [newAchievement, setNewAchievement] = useState(null)
  const stateTimeoutRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPet(prev => {
        const updated = {
          ...prev,
          hunger:    Math.max(0, prev.hunger    - 1),
          happiness: Math.max(0, prev.happiness - 0.5),
          energy:    Math.max(0, prev.energy    - 0.3),
          hygiene:   Math.max(0, prev.hygiene   - 0.2),
        }
        updated.mood = getMood(updated.hunger, updated.happiness, updated.energy, updated.hygiene)
        savePet(updated)
        return updated
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const applyAndCheck = (updater) => {
    setPet(prev => {
      const updated = updater(prev)
      updated.mood = getMood(updated.hunger, updated.happiness, updated.energy, updated.hygiene)
      const { achievements, newOnes } = checkAchievements(updated)
      updated.achievements = achievements
      if (newOnes.length > 0) {
        const ach = ACHIEVEMENT_LIST.find(a => a.id === newOnes[0])
        if (ach) {
          setNewAchievement(ach)
          setTimeout(() => setNewAchievement(null), 3000)
        }
      }
      savePet(updated)
      return updated
    })
  }

  const triggerState = (state, duration = 2000) => {
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current)
    setPet(prev => ({ ...prev, state }))
    stateTimeoutRef.current = setTimeout(() => {
      setPet(prev => ({ ...prev, state: 'idle' }))
    }, duration)
  }

  const gainXP = (amount) => {
    setPet(prev => {
      const newXP = prev.xp + amount
      const xpNeeded = prev.level * 100
      if (newXP >= xpNeeded) {
        const updated = { ...prev, xp: newXP - xpNeeded, level: prev.level + 1 }
        savePet(updated)
        return updated
      }
      const updated = { ...prev, xp: newXP }
      savePet(updated)
      return updated
    })
  }

  const setName = (name, species = 'cat') => {
    // Update streak on first login of the day
    const today = new Date().toDateString()
    const lastVisitDate = new Date(pet.lastVisit || Date.now()).toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const newStreak = lastVisitDate === today
      ? (pet.streak || 1)
      : lastVisitDate === yesterday
        ? (pet.streak || 1) + 1
        : 1

    setPet(prev => {
      const updated = { ...prev, name, species: species || 'cat', streak: newStreak, lastVisit: Date.now() }
      savePet(updated)
      return updated
    })
  }

  const feed = () => {
    triggerState('eating', 2000)
    applyAndCheck(prev => ({
      ...prev,
      hunger:    Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 5),
      timesFed:  prev.timesFed + 1,
    }))
    gainXP(5)
  }

  const play = () => {
    triggerState('playing', 2500)
    applyAndCheck(prev => ({
      ...prev,
      happiness:   Math.min(100, prev.happiness + 20),
      energy:      Math.max(0,   prev.energy    - 15),
      hygiene:     Math.max(0,   prev.hygiene   - 5),
      timesPlayed: prev.timesPlayed + 1,
    }))
    gainXP(10)
  }

  const sleep = () => {
    triggerState('sleeping', 3000)
    applyAndCheck(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      hunger: Math.max(0,   prev.hunger - 5),
    }))
    gainXP(3)
  }

  const petAction = () => {
    triggerState('happy', 2000)
    applyAndCheck(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      hygiene:   Math.min(100, prev.hygiene   + 10),
    }))
    gainXP(5)
  }

  const resetPet = () => {
    localStorage.removeItem('virtual-pet-v2')
    setPet({ ...INITIAL_PET })
  }

  return { pet, feed, play, sleep, petAction, gainXP, setName, resetPet, newAchievement }
}
