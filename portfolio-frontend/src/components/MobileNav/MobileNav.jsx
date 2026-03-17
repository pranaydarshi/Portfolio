import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MobileNav.module.css'

const NAV_ITEMS = [
  { id: 'hero',     label: 'Home',     num: '01' },
  { id: 'services', label: 'Services', num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'skills',   label: 'Skills',   num: '04' },
  { id: 'contact',  label: 'Contact',  num: '05' },
]

function scrollTo(id, closeMenu) {
  closeMenu()
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, 150)
}

export default function MobileNav({ activeSection }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
    <header className={styles.header} aria-label="Mobile navigation">
      {/* Logo */}
      <button
        className={styles.logo}
        onClick={() => scrollTo('hero', close)}
        aria-label="Go to top"
      >
        DSP<span className={styles.logoDot}>.</span>
      </button>

      {/* Hamburger */}
      <button
        className={styles.hamburger}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.bar1Open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar2Open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar3Open : ''}`} />
      </button>

    </header>

    {/* Portal: renders directly into document.body, escaping header's stacking context */}
    {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Navigation menu"
          >
            <nav className={styles.overlayNav}>
              {NAV_ITEMS.map((navItem, i) => (
                <motion.button
                  key={navItem.id}
                  className={`${styles.overlayLink} ${activeSection === navItem.id ? styles.overlayLinkActive : ''}`}
                  onClick={() => scrollTo(navItem.id, close)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <span className={styles.overlayNum}>{navItem.num}</span>
                  {navItem.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className={styles.overlaySocials}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <a href="https://github.com/pranaydarshi" target="_blank" rel="noopener noreferrer" className={styles.overlaySocialLink}>GitHub</a>
              <span aria-hidden="true">·</span>
              <a href="https://linkedin.com/in/darshi-sai-pranay-410b51225" target="_blank" rel="noopener noreferrer" className={styles.overlaySocialLink}>LinkedIn</a>
              <span aria-hidden="true">·</span>
              <a href="mailto:pranaydarshi16102@gmail.com" className={styles.overlaySocialLink}>Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}
