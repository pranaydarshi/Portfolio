import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import SectionIntro from '../components/SectionIntro/SectionIntro'
import NextPageFooter from '../components/NextPageFooter/NextPageFooter'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    label: 'HR Automation',
    title: 'Youthworks Employee Onboarding Platform',
    description:
      'End-to-end HR onboarding portal that streamlines document collection, DocuSign e-signatures, and SharePoint folder provisioning for new hires — with a 6-stage background pipeline running on IHostedService.',
    outcome:
      'Removed all manual onboarding document tracking; automated SharePoint folder creation and email notifications for every new hire.',
    highlights: [
      'Clean Architecture Web API with 6 projects, CQS pattern',
      'Custom [NewHireAuthorize] middleware with JWT + TOTP MFA',
      'Thread-safe DocuSign JWT token retrieval from Azure Key Vault',
      'Webhook endpoint for real-time DocuSign signing callbacks',
      '17 xUnit test files across services and API integration flows',
    ],
    stack: [
      'ASP.NET Core 8', 'React.js', 'EF Core', 'DocuSign SDK',
      'SharePoint PnP', 'Azure Blob Storage', 'Azure Key Vault',
      'SQL Server', 'xUnit',
    ],
    accentColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: 'rgba(0, 212, 255, 0.25)',
  },
  {
    label: 'Financial Document Pipeline',
    title: 'MillerKaplan QSF WorkPaper Automation',
    description:
      'Fully automated financial document pipeline for a US accounting firm — ingesting, processing, and routing QSF client PDFs via GoFileRoom REST API with zero manual intervention and guaranteed delivery.',
    outcome:
      'End-to-end automated processing with atomic DB + Service Bus transactions, dead-letter retry recovering 100% of failed messages.',
    highlights: [
      '5-stage IHostedService pipeline: GFR download → Blob upload → Service Bus → step-flip → batch email',
      'Atomic SQL Server + Service Bus publish in a single DB transaction',
      'Dead-letter retry mechanism with 100% message recovery rate',
      'Application Insights telemetry for full pipeline observability',
      'Processes all active QSF clients per cycle automatically',
    ],
    stack: [
      'ASP.NET Core 8', 'EF Core', 'Azure Service Bus', 'Azure Blob Storage',
      'GoFileRoom REST API', 'SQL Server', 'Application Insights',
    ],
    accentColor: 'rgba(124, 58, 237, 0.1)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
  },
  {
    label: 'Agricultural Billing',
    title: 'HarshBerger Agricultural Service Billing',
    description:
      'Full-stack billing management system for a US farm operations business — managing landlords, crop activities, inventory, and automated monthly invoice generation with PeriodicTimer BackgroundService.',
    outcome:
      'Automated monthly invoice generation and email delivery, improving billing accuracy and eliminating manual invoice preparation.',
    highlights: [
      '7-project N-Tier Clean Architecture, dual ORM (EF Core + Dapper)',
      '6 stored procedures for harvest, tillage, and planting queries',
      'PeriodicTimer BackgroundService for monthly invoice lifecycle',
      'HTML rendering → ClosedXML Excel export → SMTP email delivery',
      'JWT/TOTP MFA/RBAC security across all modules',
    ],
    stack: [
      'ASP.NET Core 8', 'EF Core', 'Dapper', 'SQL Server',
      'React.js', 'Bootstrap', 'ClosedXML', 'Azure Communication Services',
    ],
    accentColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.22)',
  },
]

function ProjectCard({ proj, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [4, -4])
  const rotateY = useTransform(x, [-100, 100], [-4, 4])
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative glow border on hover */}
      <div
        className={styles.cardGlow}
        style={{ background: `radial-gradient(circle at 50% 0%, ${proj.accentColor}, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className={styles.cardTop}>
        {/* Project number */}
        <span className={styles.projNum} aria-hidden="true">0{index + 1}</span>

        {/* Label pill */}
        <span className={styles.projLabel} style={{ borderColor: proj.borderColor, color: 'var(--color-text-muted)' }}>
          {proj.label}
        </span>
      </div>

      <h3 className={styles.projTitle}>{proj.title}</h3>
      <p className={styles.projDesc}>{proj.description}</p>

      {/* Highlights */}
      <ul className={styles.highlights} aria-label="Key highlights">
        {proj.highlights.map((h, i) => (
          <motion.li
            key={i}
            className={styles.highlight}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
          >
            <span className={styles.bullet} aria-hidden="true" />
            {h}
          </motion.li>
        ))}
      </ul>

      {/* Outcome callout */}
      <div className={styles.outcome} style={{ borderLeftColor: proj.borderColor }}>
        <span className={styles.outcomeIcon} aria-hidden="true">✦</span>
        <p>{proj.outcome}</p>
      </div>

      {/* Tech stack */}
      <div className={styles.stackRow}>
        {proj.stack.map((t, i) => (
          <motion.span
            key={t}
            className="badge"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.04 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <>
    <SectionIntro num="03" label="Case Studies" title="Projects" subtitle="3 enterprise systems shipped to production." />
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Case Studies</p>
          <h2 className="section-heading">
            Production systems<br />
            <span className={styles.accentText}>shipped end-to-end.</span>
          </h2>
          <p className={styles.subheading}>
            Every project below went through full-cycle development — from
            requirement analysis through deployment and production support —
            in an Agile/Scrum environment.
          </p>
        </motion.div>

        <div className={styles.list}>
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
    <NextPageFooter label="Skills" path="/skills" />
    </>
  )
}
