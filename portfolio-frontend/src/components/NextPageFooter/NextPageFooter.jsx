import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import styles from './NextPageFooter.module.css'

export default function NextPageFooter({ label, path }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={styles.footer}
      onClick={() => navigate(path)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(path)}
      aria-label={`Go to ${label}`}
    >
      {/* Hover fill bg */}
      <motion.div
        className={styles.fillBg}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className={styles.content}>
        {/* Top line */}
        <motion.div
          className={styles.topLine}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className={styles.inner}>
          <motion.span
            className={styles.nextLabel}
            animate={{ y: hovered ? -4 : 0, opacity: hovered ? 0.5 : 0.35 }}
            transition={{ duration: 0.3 }}
          >
            Next
          </motion.span>

          <div className={styles.titleRow}>
            <motion.span
              className={styles.nextTitle}
              animate={{ x: hovered ? 16 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {label}
            </motion.span>

            {/* Arrow */}
            <motion.span
              className={styles.arrow}
              animate={{ x: hovered ? 12 : 0, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
