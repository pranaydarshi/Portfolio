import { motion } from 'framer-motion'
import SectionIntro from '../components/SectionIntro/SectionIntro'
import NextPageFooter from '../components/NextPageFooter/NextPageFooter'
import styles from './Services.module.css'

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'HR Onboarding & Employee Portals',
    description:
      'Automate new-hire document collection, DocuSign e-signatures, SharePoint folder provisioning, and email notifications — eliminating manual tracking entirely.',
    badges: ['ASP.NET Core 8', 'React.js', 'DocuSign SDK', 'SharePoint PnP', 'Azure Blob'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Billing, Invoicing & Financial Workflows',
    description:
      'Automate invoice generation, PDF ingestion pipelines, and financial reporting for accountants and small businesses — with guaranteed delivery and zero manual intervention.',
    badges: ['Azure Service Bus', 'EF Core', 'Dapper', 'ClosedXML', 'Application Insights'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Custom Admin Panels & Internal Tools',
    description:
      'React + ASP.NET Core dashboards so operations teams can manage inventory, users, and data — replacing spreadsheets with purpose-built, role-secured internal tooling.',
    badges: ['React.js', 'JWT/RBAC', 'TOTP MFA', 'SQL Server', 'Clean Architecture'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'API Integrations & Background Automations',
    description:
      'Integrate third-party APIs, orchestrate Azure Service Bus queues, and deploy reliable background workers — so your business runs on autopilot with full observability.',
    badges: ['Azure Service Bus', 'Azure Key Vault', 'IHostedService', 'REST APIs', 'CI/CD'],
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services() {
  return (
    <>
    <SectionIntro num="02" label="What I Build" title="Services" subtitle="Enterprise-grade solutions across the full stack." />
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I Build</p>
          <h2 className="section-heading">
            Solutions that solve real<br />
            <span className={styles.accentText}>business problems.</span>
          </h2>
          <p className={styles.subheading}>
            I work with startups, small businesses, and agencies who need
            reliable, secure backend systems — not just code that runs.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              className={styles.card}
              variants={cardVariant}
              whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            >
              <motion.div
                className={styles.iconWrap}
                aria-hidden="true"
                whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.4 } }}
              >
                {svc.icon}
              </motion.div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.description}</p>
              <div className={styles.badgeRow}>
                {svc.badges.map((b) => (
                  <span key={b} className="badge">{b}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <NextPageFooter label="Projects" path="/projects" />
    </>
  )
}
