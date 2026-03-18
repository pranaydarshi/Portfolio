import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MobileNav.module.css'

const NAV_ITEMS = [
  { label: 'Home',     path: '/',        num: '01' },
  { label: 'Services', path: '/services', num: '02' },
  { label: 'Projects', path: '/projects', num: '03' },
  { label: 'Skills',   path: '/skills',   num: '04' },
  { label: 'Contact',  path: '/contact',  num: '05' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  return (
    <>
      <header className={styles.header} aria-label="Mobile navigation">
        <Link to="/" className={styles.logo} aria-label="Go to home" onClick={close}>
          DSP<span className={styles.logoDot}>.</span>
        </Link>

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
                  <motion.div key={navItem.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      to={navItem.path}
                      className={`${styles.overlayLink} ${pathname === navItem.path ? styles.overlayLinkActive : ''}`}
                      onClick={close}
                      aria-current={pathname === navItem.path ? 'page' : undefined}
                    >
                      <span className={styles.overlayNum}>{navItem.num}</span>
                      {navItem.label}
                    </Link>
                  </motion.div>
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
                <a href="https://www.linkedin.com/in/darshi-sai-pranay-410b51225/" target="_blank" rel="noopener noreferrer" className={styles.overlaySocialLink}>LinkedIn</a>
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
