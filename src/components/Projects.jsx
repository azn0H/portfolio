import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects({ darkMode, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState(0) // index into t.projects.filters

  const FILTER_KEYS = ['All', 'Featured', 'React', 'Python', 'TypeScript']

  const filtered = projects.filter((p) => {
    const key = FILTER_KEYS[activeFilter]
    if (key === 'All') return true
    if (key === 'Featured') return p.featured
    return p.tags.some((tag) => tag.toLowerCase().includes(key.toLowerCase()))
  })

  return (
    <section id="projects" className="py-24 relative">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <p className="section-label mb-3">{t.projects.sectionLabel}</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.projects.heading1}{' '}
              <span className="gradient-text">{t.projects.heading2}</span>
            </h2>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {t.projects.filters.map((label, i) => (
            <motion.button
              key={label}
              onClick={() => setActiveFilter(i)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-250 ${
                activeFilter === i
                  ? 'text-white border-transparent'
                  : darkMode
                  ? 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20'
                  : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {activeFilter === i && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)' }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  darkMode={darkMode}
                  t={t}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`col-span-full py-20 text-center font-body ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
              >
                No projects found for this filter.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className={`font-body text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.projects.viewAllSub}
          </p>
          <motion.a
            href="https://github.com/azn0H?tab=repositories"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-body font-medium transition-all duration-300 ${
              darkMode
                ? 'border-white/12 text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/5'
                : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {t.projects.viewAll}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
