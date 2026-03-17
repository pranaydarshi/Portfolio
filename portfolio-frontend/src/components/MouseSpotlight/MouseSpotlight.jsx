import { useEffect, useState } from 'react'
import styles from './MouseSpotlight.module.css'

export default function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className={styles.spotlight}
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px,
          rgba(0, 212, 255, 0.06) 0%,
          rgba(124, 58, 237, 0.03) 40%,
          transparent 70%)`
      }}
      aria-hidden="true"
    />
  )
}
