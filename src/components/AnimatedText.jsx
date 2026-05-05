import { motion } from 'framer-motion'

// Splits text into words, animates each word staggered
export function AnimatedWords({ text, className, delay = 0, duration = 0.6 }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Fade + slide up on scroll
export function RevealOnScroll({ children, delay = 0, className = '', direction = 'up', once = true }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for children
export function StaggerContainer({ children, className = '', delay = 0, stagger = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Number counter animation
export function CountUp({ value, darkMode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
    >
      {value}
    </motion.span>
  )
}

// Magnetic hover effect wrapper
export function MagneticWrapper({ children, strength = 0.3 }) {
  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0,0)'
    e.currentTarget.style.transition = 'transform 0.4s ease'
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease', display: 'inline-block' }}
    >
      {children}
    </div>
  )
}

// Cursor-following spotlight card
export function SpotlightCard({ children, className = '', darkMode }) {
  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      data-dark={darkMode}
    >
      {children}
    </div>
  )
}
