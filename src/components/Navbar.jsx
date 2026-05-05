import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar({ darkMode, toggleDarkMode, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(['home', 'about', 'projects', 'contact'])

  const NAV_LINKS = [
    { href: '#home',     label: t.nav.home },
    { href: '#about',    label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact',  label: t.nav.contact },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href) => {
    setMobileOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? 'bg-bg/80 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20'
              : 'bg-white/80 backdrop-blur-xl border-b border-black/8 shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); go('#home') }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="font-display font-bold text-lg tracking-tight select-none"
          >
            <span className="gradient-text">aznoh</span>
            <span className={darkMode ? 'text-white/80' : 'text-gray-800'}>.cz</span>
          </motion.a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); go(href) }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors duration-200 ${
                      isActive
                        ? darkMode ? 'text-white' : 'text-gray-900'
                        : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-black/8'}`}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className={`hidden md:flex items-center gap-0.5 p-1 rounded-xl ${darkMode ? 'bg-white/8' : 'bg-black/6'}`}>
              {['cs', 'en'].map((l) => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  whileTap={{ scale: 0.9 }}
                  className={`lang-btn uppercase ${lang === l ? 'active' : darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  {l}
                </motion.button>
              ))}
            </div>

            {/* Dark mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode ? 'text-gray-400 hover:text-yellow-300 hover:bg-white/10' : 'text-gray-500 hover:text-indigo-600 hover:bg-black/8'
              }`}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={darkMode ? 'moon' : 'sun'}
                  initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.4, rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="block"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('#contact') }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium text-white transition-all duration-300 hover:shadow-glow-indigo"
              style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)' }}
            >
              {t.nav.hireMe}
            </motion.a>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/8'}`}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 top-16 z-40 overflow-hidden ${
              darkMode ? 'bg-bg/95 backdrop-blur-xl border-b border-white/10' : 'bg-white/95 backdrop-blur-xl border-b border-black/10'
            }`}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <motion.li
                  key={href}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                >
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); go(href) }}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                className="flex gap-2 px-4 py-2"
              >
                {['en', 'cs'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`lang-btn uppercase ${lang === l ? 'active' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    {l}
                  </button>
                ))}
              </motion.li>
              <motion.li
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                className="pt-2"
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); go('#contact') }}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-white text-center"
                  style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)' }}
                >
                  {t.nav.hireMe}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
