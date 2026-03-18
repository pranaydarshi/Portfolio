import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LeftPanel from './components/LeftPanel/LeftPanel'
import MobileNav from './components/MobileNav/MobileNav'
import CustomCursor from './components/CustomCursor/CustomCursor'
import MouseSpotlight from './components/MouseSpotlight/MouseSpotlight'
import PageTransition from './components/PageTransition/PageTransition'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import styles from './App.module.css'

export default function App() {
  const location = useLocation()

  return (
    <>
      <CustomCursor />
      <MouseSpotlight />
      <MobileNav />

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <LeftPanel />
        </div>

        <main className={styles.rightCol} id="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}
