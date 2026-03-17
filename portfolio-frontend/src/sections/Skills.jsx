import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    accent: 'cyan',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    category: 'Backend',
    accent: 'cyan',
    skills: [
      'ASP.NET Core', 'ASP.NET MVC', 'C#', '.NET 6/8',
      'Web API', 'EF Core', 'Dapper',
    ],
  },
  {
    category: 'Cloud & DevOps',
    accent: 'cyan',
    skills: [
      'Azure Service Bus', 'Azure Blob Storage', 'Azure AD',
      'Azure Key Vault', 'Application Insights', 'CI/CD Pipelines',
    ],
  },
  {
    category: 'Architecture & Patterns',
    accent: 'purple',
    skills: [
      'Clean Architecture', 'N-Tier Architecture', 'Microservices',
      'SOLID', 'CQS', 'Repository Pattern', 'Dependency Injection',
      'REST APIs', 'OOP',
    ],
  },
  {
    category: 'Security',
    accent: 'purple',
    skills: ['JWT Authentication', 'RBAC', 'TOTP MFA', 'bcrypt', 'Azure AD'],
  },
  {
    category: 'Databases',
    accent: 'cyan',
    skills: ['SQL Server', 'Stored Procedures', 'Query Optimization', 'EF Core Migrations'],
  },
  {
    category: 'Testing & Practices',
    accent: 'purple',
    skills: [
      'Unit Testing', 'Integration Testing', 'TDD', 'xUnit',
      'Code Reviews', 'Agile/Scrum', 'Git', 'Postman',
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}

const groupVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

function SkillGroup({ group }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={styles.group}
      variants={groupVariant}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Title with animated underline */}
      <div className={styles.groupTitleWrap}>
        <h3 className={styles.groupTitle}>{group.category}</h3>
        <motion.span
          className={`${styles.groupUnderline} ${group.accent === 'purple' ? styles.purpleUnderline : ''}`}
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ originX: 0 }}
          aria-hidden="true"
        />
      </div>

      <div className={styles.badgeRow}>
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            className={`badge ${styles.skillBadge} ${group.accent === 'purple' ? styles.purpleBadge : ''}`}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">
            Full-stack depth,<br />
            <span className={styles.accentText}>cloud-ready.</span>
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SKILL_GROUPS.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </motion.div>

        {/* Certifications */}
        <div className={styles.certs}>
          <p className="section-label">Certifications</p>
          <div className={styles.certRow}>
            {[
              { name: 'Microsoft Certified: Azure Fundamentals', meta: 'AZ-900 · Aug 2025' },
              { name: 'HackerRank SQL (Advanced)', meta: 'Feb 2026' },
            ].map((cert, i) => (
              <motion.div
                key={cert.name}
                className={styles.certCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className={styles.certIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.certName}>{cert.name}</p>
                  <p className={styles.certMeta}>{cert.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
