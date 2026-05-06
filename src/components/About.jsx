import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import { skills } from '../data/projects'
import { StaggerContainer, StaggerItem } from './AnimatedText'

const categoryColors = {
  Language: { bg: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',    dot: 'bg-accent-cyan' },
  Frontend: { bg: 'bg-accent-indigo/10 border-accent-indigo/20 text-accent-indigo', dot: 'bg-accent-indigo' },
  Backend:  { bg: 'bg-accent-violet/10 border-accent-violet/20 text-accent-violet', dot: 'bg-accent-violet' },
  Tools:    { bg: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald', dot: 'bg-accent-emerald' },
}

const categoryColorsLight = {
  Language: { bg: 'bg-cyan-50 border-cyan-200 text-cyan-700',       dot: 'bg-cyan-500' },
  Frontend: { bg: 'bg-indigo-50 border-indigo-200 text-indigo-700', dot: 'bg-indigo-500' },
  Backend:  { bg: 'bg-violet-50 border-violet-200 text-violet-700', dot: 'bg-violet-500' },
  Tools:    { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
}

const exploring = ['C++', 'C#']

function BackgroundShapes({ darkMode }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.rotation.x += delta * 0.02
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-5, 0, -10]} scale={2.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={darkMode ? '#A78BFA' : '#6366F1'}
            wireframe={true}
            transparent={true}
            opacity={darkMode ? 0.12 : 0.04}
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[6, 2, -12]} scale={3}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshStandardMaterial
            color={darkMode ? '#22D3EE' : '#06B6D4'}
            wireframe={true}
            transparent={true}
            opacity={darkMode ? 0.12 : 0.04}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function About({ darkMode, t }) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const categories = [...new Set(skills.map((s) => s.category))]

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas dpr={[1, 1.5]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
          <ambientLight intensity={darkMode ? 0.5 : 1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <BackgroundShapes darkMode={darkMode} />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.07] blur-[110px]"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', y: blobY }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <p className="section-label mb-3">{t.about.sectionLabel}</p>
          <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.about.heading1}{' '}
            <span className="gradient-text">{t.about.heading2}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className={`font-body text-base md:text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.about.bio1}
              </p>
              <p className={`font-body text-base md:text-lg leading-relaxed mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.about.bio2}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {t.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className={`p-5 rounded-2xl border cursor-default transition-shadow duration-300 backdrop-blur-sm ${
                    darkMode ? 'bg-white/4 border-white/8 hover:border-white/15' : 'bg-white/70 border-gray-200 hover:border-indigo-200 hover:shadow-md'
                  }`}
                >
                  <div className="font-display font-bold text-3xl gradient-text mb-1">{stat.value}</div>
                  <div className={`font-body text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-8">
              {categories.map((category, ci) => {
                const catSkills = skills.filter((s) => s.category === category)
                const colors = darkMode ? categoryColors[category] : categoryColorsLight[category]
                return (
                  <div key={category}>
                    <p className={`font-mono text-xs font-medium tracking-widest uppercase mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {catSkills.map((skill, si) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.7, y: 10 }}
                          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.38 + ci * 0.07 + si * 0.04, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ scale: 1.08, y: -3 }}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium cursor-default transition-all duration-200 backdrop-blur-md ${colors.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className={`mt-10 p-5 rounded-2xl border backdrop-blur-sm ${
                darkMode ? 'bg-accent-indigo/5 border-accent-indigo/15' : 'bg-indigo-50/70 border-indigo-100'
              }`}
            >
              <p className={`font-mono text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-accent-indigo' : 'text-indigo-500'}`}>
                {t.about.exploring}
              </p>
              <div className="flex flex-wrap gap-2">
                {exploring.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.85 + i * 0.07 }}
                    className={`font-body text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {tech}
                    {i < exploring.length - 1 && (
                      <span className={`ml-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>·</span>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}