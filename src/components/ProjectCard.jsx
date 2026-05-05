import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const colorMap = {
  indigo:  { tag: 'bg-accent-indigo/10 border-accent-indigo/20 text-accent-indigo', glow: 'hover:shadow-glow-indigo', border: 'hover:border-accent-indigo/35', header: 'from-accent-indigo/25 to-accent-violet/15' },
  cyan:    { tag: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',       glow: 'hover:shadow-glow-cyan',   border: 'hover:border-accent-cyan/35',   header: 'from-accent-cyan/25 to-accent-emerald/15' },
  violet:  { tag: 'bg-accent-violet/10 border-accent-violet/20 text-accent-violet', glow: 'hover:shadow-glow-violet', border: 'hover:border-accent-violet/35', header: 'from-accent-violet/25 to-accent-indigo/15' },
  emerald: { tag: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald', glow: '', border: 'hover:border-accent-emerald/35', header: 'from-accent-emerald/25 to-accent-cyan/15' },
}
const colorMapLight = {
  indigo:  { tag: 'bg-indigo-50 border-indigo-200 text-indigo-600',   glow: 'hover:shadow-lg hover:shadow-indigo-100', border: 'hover:border-indigo-300', header: 'from-indigo-100 to-purple-100' },
  cyan:    { tag: 'bg-cyan-50 border-cyan-200 text-cyan-700',         glow: 'hover:shadow-lg hover:shadow-cyan-100',   border: 'hover:border-cyan-300',   header: 'from-cyan-100 to-emerald-100' },
  violet:  { tag: 'bg-violet-50 border-violet-200 text-violet-700',   glow: 'hover:shadow-lg hover:shadow-violet-100', border: 'hover:border-violet-300', header: 'from-violet-100 to-indigo-100' },
  emerald: { tag: 'bg-emerald-50 border-emerald-200 text-emerald-700', glow: 'hover:shadow-lg hover:shadow-emerald-100', border: 'hover:border-emerald-300', header: 'from-emerald-100 to-cyan-100' },
}

export default function ProjectCard({ project, index, darkMode, t }) {
  const colors = darkMode ? colorMap[project.color] : colorMapLight[project.color]

  // Spotlight effect
  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      onMouseMove={handleMouseMove}
      className={`group spotlight-card relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-350 shadow-card ${colors.glow} ${colors.border} ${
        darkMode ? 'bg-white/4 border-white/8' : 'bg-white border-gray-200'
      }`}
    >
      {/* Top accent line */}
      <div className={`h-px w-full bg-gradient-to-r ${colors.header} opacity-70`} />

      {/* Card visual header */}
      <div className={`h-36 relative overflow-hidden bg-gradient-to-br ${colors.header}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 6 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-52 h-52 rounded-full blur-2xl"
            style={{
              background: project.color === 'cyan' ? '#22D3EE' : project.color === 'violet' ? '#A78BFA' : project.color === 'emerald' ? '#34D399' : '#818CF8',
            }}
          />
        </div>
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        {/* Large index number */}
        <div className={`absolute bottom-3 right-4 font-display font-bold text-7xl opacity-[0.07] leading-none select-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {String(index + 1).padStart(2, '0')}
        </div>
        {/* Arrow - appears on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 6, y: -6 }}
          whileHover={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          className="absolute top-4 right-4"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-white/15' : 'bg-black/10'}`}>
            <ArrowUpRight size={15} className={darkMode ? 'text-white' : 'text-gray-700'} />
          </div>
        </motion.div>
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.07 }}
            className="absolute top-4 left-4"
          >
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
              darkMode ? 'bg-white/15 text-white/80' : 'bg-black/10 text-gray-700'
            }`}>
              ★ Featured
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 pt-5">
        <h3 className={`font-display font-semibold text-xl mb-2.5 tracking-tight transition-colors duration-200 ${
          darkMode ? 'text-white group-hover:text-accent-indigo' : 'text-gray-900 group-hover:text-indigo-600'
        }`}>
          {project.title}
        </h3>
        <p className={`font-body text-sm leading-relaxed mb-5 flex-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + ti * 0.04 }}
              className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-mono font-medium transition-transform duration-200 hover:scale-105 ${colors.tag}`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Buttons */}
        <div className={`flex gap-3 pt-5 border-t ${darkMode ? 'border-white/8' : 'border-gray-100'}`}>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex-1 justify-center py-2.5 text-xs"
          >
            <ExternalLink size={13} />
            {t.projects.liveDemo}
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-xl border text-xs font-body font-medium transition-all duration-200 ${
              darkMode
                ? 'border-white/12 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Github size={13} />
            {t.projects.github}
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
