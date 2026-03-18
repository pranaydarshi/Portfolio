import { motion } from 'framer-motion'
import styles from './SectionIntro.module.css'

export default function SectionIntro({ num, label, title, subtitle }) {
  return (
    <div className={styles.intro}>
      {/* Giant background number */}
      <motion.span
        className={styles.bgNum}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        {num}
      </motion.span>

      {/* Label */}
      <motion.p
        className={styles.label}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.p>

      {/* Title */}
      <div className={styles.titleClip}>
        <motion.h1
          className={styles.title}
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <span className={styles.scrollText}>scroll</span>
      </motion.div>
    </div>
  )
}
