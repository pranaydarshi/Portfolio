import { motion } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <p className={styles.built}>
          Designed &amp; Built by{' '}
          <span className={styles.name}>Darshi Sai Pranay</span>
        </p>

        <div className={styles.links}>
          <a
            href="mailto:pranaydarshi16102@gmail.com"
            className={styles.link}
            aria-label="Send email"
          >
            Email
          </a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a
            href="https://linkedin.com/in/darshi-sai-pranay-410b51225"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a
            href="https://github.com/pranaydarshi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </div>

        <p className={styles.copy}>
          © {year} Darshi Sai Pranay
        </p>
      </div>
    </motion.footer>
  )
}
