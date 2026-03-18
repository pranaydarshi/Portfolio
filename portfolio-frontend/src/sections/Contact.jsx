import { motion, AnimatePresence } from 'framer-motion'
import useContactForm from '../hooks/useContactForm'
import MagneticButton from '../components/MagneticButton/MagneticButton'
import SectionIntro from '../components/SectionIntro/SectionIntro'
import NextPageFooter from '../components/NextPageFooter/NextPageFooter'
import styles from './Contact.module.css'

export default function Contact() {
  const {
    fields,
    errors,
    status,
    apiError,
    handleChange,
    handleSubmit,
    resetStatus,
  } = useContactForm()

  return (
    <>
    <SectionIntro num="05" label="Get in touch" title="Contact" subtitle="Let's build something great together." />
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* ── Left: copy ── */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Get In Touch</p>
            <h2 className={`section-heading ${styles.heading}`}>
              Let&apos;s work<br />
              <span className={styles.accentText}>together.</span>
            </h2>
            <p className={styles.subtext}>
              I&apos;m open to freelance projects, full-time roles, and
              consulting engagements. If you have an HR portal, billing system,
              or automation challenge — let&apos;s talk.
            </p>

            {/* Contact info tiles */}
            <motion.div
              className={styles.infoList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            >
              {[
                {
                  href: 'mailto:pranaydarshi16102@gmail.com',
                  label: 'Email',
                  value: 'pranaydarshi16102@gmail.com',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                },
                {
                  href: 'tel:+917780196663',
                  label: 'Phone',
                  value: '+91 77801 96663',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://linkedin.com/in/darshi-sai-pranay-410b51225',
                  label: 'LinkedIn',
                  value: 'darshi-sai-pranay-410b51225',
                  target: '_blank',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://github.com/pranaydarshi',
                  label: 'GitHub',
                  value: 'github.com/pranaydarshi',
                  target: '_blank',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel={item.target ? 'noopener noreferrer' : undefined}
                  className={styles.infoItem}
                  aria-label={`${item.label}: ${item.value}`}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className={styles.infoIcon} aria-hidden="true">{item.icon}</div>
                  <div>
                    <p className={styles.infoLabel}>{item.label}</p>
                    <p className={styles.infoValue}>{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.successIcon} aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message sent!</h3>
                  <p className={styles.successText}>
                    Thanks for reaching out. Your message has been saved securely
                    and I&apos;ve received an email notification. I&apos;ll get
                    back to you within 24 hours.
                  </p>
                  <MagneticButton
                    className={`btn-outline ${styles.sendAnother}`}
                    onClick={resetStatus}
                  >
                    Send another message
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.formNote}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Messages go directly to my email and are stored securely.
                  </p>

                  {status === 'error' && apiError && (
                    <div className={styles.errorBanner} role="alert">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {apiError}
                    </div>
                  )}

                  <div className={styles.row}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Name <span className={styles.required} aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text"
                        value={fields.name} onChange={handleChange}
                        placeholder="Priya Sharma"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        autoComplete="name"
                      />
                      {errors.name && <p id="name-error" className={styles.fieldError} role="alert">{errors.name}</p>}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email <span className={styles.required} aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={fields.email} onChange={handleChange}
                        placeholder="priya@company.com"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                      {errors.email && <p id="email-error" className={styles.fieldError} role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="company" className={styles.label}>
                      Company <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="company" name="company" type="text"
                      value={fields.company} onChange={handleChange}
                      placeholder="Acme Startup Pvt. Ltd."
                      className={styles.input}
                      autoComplete="organization"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Message <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={fields.message} onChange={handleChange}
                      placeholder="Tell me about your project — what you're building, your timeline, and any specific challenges..."
                      className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className={styles.fieldError} role="alert">{errors.message}</p>}
                  </div>

                  <MagneticButton
                    type="submit"
                    className={`btn-primary ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <><span className={styles.spinner} aria-hidden="true" />Sending…</>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                          strokeLinejoin="round" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
    <NextPageFooter label="Back to Home" path="/" />
    </>
  )
}
