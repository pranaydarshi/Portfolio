import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton/MagneticButton'
import AnimatedCounter from '../components/AnimatedCounter/AnimatedCounter'
import styles from './Hero.module.css'

const TECH_BADGES = [
  'ASP.NET Core 8',
  'C#',
  'React.js',
  'SQL Server',
  'Azure',
  'EF Core',
  'JWT/RBAC',
  'Clean Architecture',
]

const TAGLINE_WORDS = ['Secure', 'portals,', 'built', 'right.']

const STATS = [
  { target: 2, suffix: '+', label: 'Years experience' },
  { target: 3, suffix: '',  label: 'Enterprise projects' },
  { target: 500, suffix: '+', label: 'Docs/day processed' },
  { target: null, display: 'AZ-900', label: 'Azure Certified' },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const wordReveal = {
  hidden: { y: '110%', opacity: 0 },
  show:   { y: '0%',   opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.inner}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className={styles.availBadge}>
          <span className={styles.availDot} aria-hidden="true" />
          Available for new projects
        </motion.div>

        {/* Main headline */}
        <motion.h1 variants={fadeUp} className={styles.headline}>
          .NET Full Stack Developer
        </motion.h1>

        {/* Tagline with word-reveal */}
        <div className={styles.taglineWrap} aria-label="Secure portals, built right.">
          <motion.div
            className={styles.tagline}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            initial="hidden"
            animate="show"
          >
            {TAGLINE_WORDS.map((word, i) => (
              <span key={i} className={styles.wordClip}>
                <motion.span variants={wordReveal} className={styles.word}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p variants={fadeUp} className={styles.subtext}>
          2+ years delivering enterprise-grade HR onboarding platforms,
          financial document pipelines, and billing systems on{' '}
          <strong>ASP.NET Core 8, React, SQL Server, and Azure</strong> — with
          Clean Architecture, JWT/RBAC security, and production-ready
          background services baked in from day one.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={fadeUp} className={styles.ctaRow}>
          <MagneticButton
            className="btn-primary"
            onClick={() => scrollTo('contact')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Me
          </MagneticButton>

          <MagneticButton
            className="btn-outline"
            onClick={() => scrollTo('projects')}
          >
            View Projects
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Tech badges */}
        <motion.div variants={fadeUp} className={styles.badgeRow}>
          {TECH_BADGES.map((b, i) => (
            <motion.span
              key={b}
              className="badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
            >
              {b}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats bento grid */}
        <motion.div
          className={styles.bento}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
          initial="hidden"
          animate="show"
          aria-label="Key statistics"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.bentoCard}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <span className={styles.bentoNum}>
                {stat.target !== null
                  ? <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  : stat.display
                }
              </span>
              <span className={styles.bentoLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
