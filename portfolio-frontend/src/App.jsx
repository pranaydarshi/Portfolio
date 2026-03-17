import LeftPanel from './components/LeftPanel/LeftPanel'
import MobileNav from './components/MobileNav/MobileNav'
import CustomCursor from './components/CustomCursor/CustomCursor'
import MouseSpotlight from './components/MouseSpotlight/MouseSpotlight'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import useActiveSection from './hooks/useActiveSection'
import styles from './App.module.css'

const SECTION_IDS = ['hero', 'services', 'projects', 'skills', 'contact']

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <>
      <CustomCursor />
      <MouseSpotlight />
      <MobileNav activeSection={activeSection} />

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <LeftPanel activeSection={activeSection} />
        </div>

        <main className={styles.rightCol} id="main-content">
          <Hero />
          <Services />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  )
}
