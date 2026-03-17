import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const ringX = useSpring(dotX, { stiffness: 120, damping: 18 })
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [dotX, dotY])

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ x: dotX, y: dotY }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.ring}
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      />
    </>
  )
}
