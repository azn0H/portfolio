import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Download, MousePointer2 } from 'lucide-react'

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx % words.length]
    let timeout

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && display === '') {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setDisplay((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? speed / 2 : speed)
    }
    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, words, speed, pause])

  return display
}

// Floating badge
function FloatingBadge({ text, style, delay, color }) {
  const colorMap = {
    cyan:    'from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/30 text-accent-cyan',
    indigo:  'from-accent-indigo/20 to-accent-indigo/5 border-accent-indigo/30 text-accent-indigo',
    violet:  'from-accent-violet/20 to-accent-violet/5 border-accent-violet/30 text-accent-violet',
    emerald: 'from-accent-emerald/20 to-accent-emerald/5 border-accent-emerald/30 text-accent-emerald',
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
        className={`px-3 py-1.5 rounded-xl border bg-gradient-to-br font-mono text-xs font-medium backdrop-blur-sm shadow-card ${colorMap[color]}`}
      >
        {text}
      </motion.div>
    </motion.div>
  )
}

// Orbiting particle
function OrbitRing({ radius, duration, delay, dotColor, reverse = false }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ width: radius * 2, height: radius * 2, top: `calc(50% - ${radius}px)`, left: `calc(50% - ${radius}px)` }}
    >
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
        className="absolute inset-0"
      >
        <div
          className={`absolute w-2.5 h-2.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${dotColor}`}
          style={{ boxShadow: `0 0 8px currentColor` }}
        />
      </motion.div>
      <div className="absolute inset-0 rounded-full border border-dashed opacity-15"
        style={{ borderColor: dotColor.includes('cyan') ? '#22D3EE' : dotColor.includes('emerald') ? '#34D399' : '#818CF8' }} />
    </motion.div>
  )
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } },
}
const slideUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ darkMode, t }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const typeWords = t.lang === 'cs'
    ? ['Frontend vývojář', 'UI nadšenec', 'Design inženýr', 'Web tvůrce']
    : ['Frontend Developer', 'UI Enthusiast', 'Design Engineer', 'Web Craftsman']

  // figure out which word array to use based on presence of Czech chars
  const isCzech = t.hero.title1.includes('ář') || t.hero.title1.includes('dář')
  const words = isCzech
    ? ['Frontend vývojář', 'UI nadšenec', 'Design inženýr', 'Web tvůrce']
    : ['Frontend Developer', 'UI Enthusiast', 'Design Engineer', 'Web Craftsman']

  const typed = useTypewriter(words)

  // Parallax mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const blobX = useTransform(springX, [-400, 400], [-30, 30])
  const blobY = useTransform(springY, [-400, 400], [-20, 20])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full opacity-25 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 65%)', x: blobX, y: blobY }}
        />
        <motion.div
          className="absolute top-1/4 -right-56 w-[550px] h-[550px] rounded-full opacity-18 blur-[110px]"
          style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 65%)', x: useTransform(springX, [-400, 400], [20, -20]) }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-48 left-1/3 w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 65%)' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16">

          {/* Left: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex-1 max-w-2xl"
          >
            {/* Status badge */}
            <motion.div variants={slideUp} className="mb-7">
              <motion.span
                whileHover={{ scale: 1.04 }}
                className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium border cursor-default ${
                  darkMode
                    ? 'border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo'
                    : 'border-indigo-300 bg-indigo-50 text-indigo-600'
                }`}
              >
                <span className="glow-dot w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                {t.hero.badge}
              </motion.span>
            </motion.div>

            {/* Name */}
            <motion.div variants={slideUp} className="mb-3 overflow-hidden">
              <motion.h1
                className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.04] tracking-tight"
              >
                <span className={darkMode ? 'text-white/70' : 'text-gray-500'}>
                  {' '}
                </span>
                <span className="gradient-text">{t.hero.name}</span>
              </motion.h1>
            </motion.div>

            {/* Typewriter title */}
            <motion.div variants={slideUp} className="mb-8 h-10 flex items-center">
              <span
                className={`font-display font-semibold text-xl md:text-2xl ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {typed}
                <span className="typewriter-cursor" />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={slideUp}
              className={`font-body text-base md:text-lg leading-relaxed mb-10 max-w-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {t.hero.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={slideUp} className="flex flex-wrap gap-4 mb-12">
              <motion.button
                onClick={() => go('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary group"
              >
                <span>{t.hero.cta1}</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
              <motion.button
                onClick={() => go('contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`btn-outline ${
                  darkMode
                    ? 'border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5'
                    : 'border-black/15 text-gray-600 hover:text-gray-900 hover:border-black/25 hover:bg-black/3'
                }`}
              >
                <Mail size={16} />
                {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={slideUp}
              className={`flex items-center gap-6 text-sm font-body ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
            >
              {[
                { href: 'https://github.com', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  className={`flex items-center gap-2 transition-colors duration-200 animated-underline ${
                    darkMode ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                  aria-label={label}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </motion.a>
              ))}
              <span className={`w-px h-4 ${darkMode ? 'bg-white/15' : 'bg-black/15'}`} />
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ y: -2, scale: 1.05 }}
                className={`flex items-center gap-2 transition-colors duration-200 animated-underline ${
                  darkMode ? 'hover:text-accent-indigo' : 'hover:text-indigo-600'
                }`}
              >
                <Download size={16} />
                {t.hero.resume}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Orbital illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-1 items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Orbit rings */}
              <OrbitRing radius={140} duration={18} delay={0}   dotColor="bg-accent-indigo" />
              <OrbitRing radius={108} duration={13} delay={0.3} dotColor="bg-accent-cyan" reverse />
              <OrbitRing radius={76}  duration={9}  delay={0.6} dotColor="bg-accent-emerald" />

              {/* Center card */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute inset-[30%] rounded-2xl flex items-center justify-center shadow-card ${
                  darkMode ? 'glass' : 'glass-light'
                }`}
              >
                <div className="text-center">
                  <div className="font-display font-bold text-3xl gradient-text mb-0.5">3+</div>
                  <div className={`font-mono text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.hero.yearsExp}
                  </div>
                </div>
              </motion.div>

              {/* Floating tech badges */}
              <FloatingBadge text="React"      style={{ top: '2%',  right: '-12%' }} delay={0.9} color="cyan" />
              <FloatingBadge text="TypeScript" style={{ bottom: '8%', left: '-16%' }} delay={1.2} color="indigo" />
              <FloatingBadge text="Node.js"    style={{ top: '62%', right: '-22%' }} delay={1.5} color="emerald" />
              <FloatingBadge text="Figma"      style={{ top: '-4%', left: '8%' }}    delay={1.8} color="violet" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className={`w-5 h-8 rounded-full border-2 flex items-start justify-center p-1 ${
              darkMode ? 'border-white/20' : 'border-black/20'
            }`}
          >
            <div className={`w-1 h-2 rounded-full ${darkMode ? 'bg-white/40' : 'bg-black/30'}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
