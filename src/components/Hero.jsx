import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment, RoundedBox } from '@react-three/drei'

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

function OptimizedUICards({ darkMode }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t / 4) / 4
    groupRef.current.rotation.x = Math.cos(t / 4) / 8
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, -1]}>
        <RoundedBox args={[3, 2, 0.05]} radius={0.05} smoothness={2}>
          <meshStandardMaterial color={darkMode ? '#1E1E2E' : '#E5E7EB'} roughness={0.4} />
        </RoundedBox>
        <mesh position={[-1.1, 0.7, 0.03]}>
          <planeGeometry args={[0.4, 0.1]} />
          <meshBasicMaterial color="#818CF8" />
        </mesh>
        <mesh position={[-0.4, 0.7, 0.03]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color={darkMode ? '#374151' : '#D1D5DB'} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[2.6, 1]} />
          <meshBasicMaterial color={darkMode ? '#111827' : '#FFFFFF'} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[1.2, -0.6, 0.5]}>
        <RoundedBox args={[1.6, 1, 0.05]} radius={0.05} smoothness={2}>
          <meshPhysicalMaterial 
            color={darkMode ? '#A78BFA' : '#6366F1'} 
            transparent={true}
            opacity={0.8}
            roughness={0.2}
            clearcoat={1}
          />
        </RoundedBox>
        <mesh position={[-0.5, 0.2, 0.03]}>
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial color="#FFFFFF" opacity={0.9} transparent />
        </mesh>
        <mesh position={[0.1, 0.2, 0.03]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#FFFFFF" opacity={0.9} transparent />
        </mesh>
        <mesh position={[0.1, -0.1, 0.03]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#FFFFFF" opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.8} floatIntensity={2} position={[-1.5, 0.8, 0.8]}>
        <RoundedBox args={[1, 1, 0.05]} radius={0.05} smoothness={2}>
          <meshPhysicalMaterial 
            color="#22D3EE" 
            transparent={true}
            opacity={0.85}
            roughness={0.1}
            clearcoat={1}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.03]}>
          <torusGeometry args={[0.2, 0.05, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </Float>
    </group>
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

  const isCzech = t.hero.title1.includes('ář') || t.hero.title1.includes('dář')
  const words = isCzech
    ? ['Frontend developer', 'UI Enthusiast', 'Design Engineer', 'Web Craftsman']
    : ['Frontend Developer', 'UI Enthusiast', 'Design Engineer', 'Web Craftsman']

  const typed = useTypewriter(words)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 65%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-48 right-1/4 w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8">
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex-1 max-w-2xl pointer-events-auto"
          >
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

            <motion.div variants={slideUp} className="mb-3 overflow-hidden">
              <motion.h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.04] tracking-tight">
                <span className={darkMode ? 'text-white/70' : 'text-gray-500'}> </span>
                <span className="gradient-text">{t.hero.name}</span>
              </motion.h1>
            </motion.div>

            <motion.div variants={slideUp} className="mb-8 h-10 flex items-center">
              <span className={`font-display font-semibold text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {typed}
                <span className="typewriter-cursor" />
              </span>
            </motion.div>

            <motion.p
              variants={slideUp}
              className={`font-body text-base md:text-lg leading-relaxed mb-10 max-w-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {t.hero.bio}
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-4 mb-12">
              <motion.button onClick={() => go('projects')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary group">
                <span>{t.hero.cta1}</span>
                <motion.span className="inline-block" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
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

            <motion.div variants={slideUp} className={`flex items-center gap-6 text-sm font-body ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {[
                { href: 'https://github.com/azn0H', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/aznoh', icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  className={`flex items-center gap-2 transition-colors duration-200 animated-underline ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}
                  aria-label={label}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </motion.a>
              ))}
             
              
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-1 items-center justify-center h-[500px] w-full"
          >
            <Canvas dpr={[1, 1.5]}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
              <ambientLight intensity={darkMode ? 0.6 : 1} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} />
              <directionalLight position={[-5, -5, -5]} intensity={0.5} />
              <Environment preset="city" />
              <OptimizedUICards darkMode={darkMode} />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
