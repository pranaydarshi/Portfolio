import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className, onClick, type = 'button', disabled, href, target, rel }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={{ x: springX, y: springY, display: 'inline-flex' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-hover="true"
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover="true"
    >
      {children}
    </motion.button>
  )
}
