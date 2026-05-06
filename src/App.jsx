import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { translations } from './data/translations'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const defaultLang = navigator.language.startsWith('cs') ? 'cs' : 'en'
  const [lang, setLangState] = useState(defaultLang)
  const [langChanging, setLangChanging] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((v) => !v)

  const setLang = (l) => {
    if (l === lang) return
    setLangChanging(true)
    setTimeout(() => {
      setLangState(l)
      setLangChanging(false)
    }, 220)
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-bg text-gray-100' : 'bg-bg-light text-gray-900'}`}>
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      <AnimatePresence>
        {langChanging && (
          <motion.div
            key="lang-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <Hero darkMode={darkMode} t={t} />
          <About darkMode={darkMode} t={t} />
          <Projects darkMode={darkMode} t={t} />
          <Contact darkMode={darkMode} t={t} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}