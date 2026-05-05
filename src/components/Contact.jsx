import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Send, CheckCircle2, Loader2, Twitter } from 'lucide-react'

export default function Contact({ darkMode, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const c = t.contact

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = c.form.errors.nameRequired
    if (!form.email.trim())   e.email   = c.form.errors.emailRequired
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = c.form.errors.emailInvalid
    if (!form.message.trim()) e.message = c.form.errors.messageRequired
    return e
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  const socials = [
    { icon: Github,   href: 'https://github.com',   ...c.socials[0] },
    { icon: Linkedin, href: 'https://linkedin.com',  ...c.socials[1] },
    { icon: Twitter,  href: 'https://twitter.com',   ...c.socials[2] },
    { icon: Mail,     href: 'mailto:alex@example.com', ...c.socials[3] },
  ]

  return (
    <section id="contact" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-16 text-center"
        >
          <p className="section-label mb-3">{c.sectionLabel}</p>
          <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {c.heading1}{' '}
            <span className="gradient-text">{c.heading2}</span>
          </h2>
          <p className={`font-body text-base md:text-lg max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {c.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full min-h-[360px] flex flex-col items-center justify-center gap-5 p-12 rounded-2xl border text-center ${
                    darkMode ? 'bg-accent-emerald/5 border-accent-emerald/20' : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.55, delay: 0.2 }}
                  >
                    <CheckCircle2 size={56} className={darkMode ? 'text-accent-emerald' : 'text-emerald-500'} />
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className={`font-display font-semibold text-2xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {c.form.successTitle}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className={`font-body ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {c.form.successBody}
                    </motion.p>
                  </div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    onClick={() => setStatus('idle')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`mt-2 px-6 py-2.5 rounded-xl border text-sm font-body font-medium transition-colors ${
                      darkMode ? 'border-white/15 text-gray-400 hover:text-white hover:border-white/30' : 'border-gray-200 text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {c.form.sendAnother}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label={c.form.name}    name="name"    type="text"  placeholder={c.form.namePlaceholder}    value={form.name}    onChange={handleChange} error={errors.name}    darkMode={darkMode} />
                    <FormField label={c.form.email}   name="email"   type="email" placeholder={c.form.emailPlaceholder}   value={form.email}   onChange={handleChange} error={errors.email}   darkMode={darkMode} />
                  </div>
                  <FormField   label={c.form.message} name="message" type="textarea" placeholder={c.form.messagePlaceholder} value={form.message} onChange={handleChange} error={errors.message} darkMode={darkMode} rows={6} />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" />{c.form.sending}</>
                    ) : (
                      <><Send size={16} />{c.form.send}</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Availability */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                darkMode ? 'bg-white/4 border-white/8 hover:border-white/15' : 'bg-white border-gray-200 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="glow-dot relative w-2.5 h-2.5 rounded-full bg-accent-emerald flex-shrink-0" />
                <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${darkMode ? 'text-accent-emerald' : 'text-emerald-600'}`}>
                  {c.availability.label}
                </span>
              </div>
              <p className={`font-body text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {c.availability.text}
              </p>
            </motion.div>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 5, scale: 1.01 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${
                      darkMode
                        ? 'bg-white/4 border-white/8 hover:border-white/20 hover:bg-white/7'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      darkMode ? 'bg-white/8 group-hover:bg-accent-indigo/20' : 'bg-gray-100 group-hover:bg-indigo-50'
                    }`}>
                      <Icon size={18} className={`transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 group-hover:text-accent-indigo' : 'text-gray-500 group-hover:text-indigo-600'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-body font-medium text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {social.label}
                      </div>
                      <div className={`font-body text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {social.description}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="ml-auto flex-shrink-0"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-24 pt-8 border-t text-center ${darkMode ? 'border-white/8' : 'border-gray-200'}`}
      >
        <p className={`font-mono text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          {t.footer.builtBy}{' '}
          <span className="gradient-text font-medium">Alex Morgan</span>
          {' '}· {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  )
}

function FormField({ label, name, type, placeholder, value, onChange, error, darkMode, rows }) {
  const base = `input-field ${!darkMode ? 'input-field-light' : ''}`
  return (
    <div>
      <label htmlFor={name} className={`block font-body text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea id={name} name={name} rows={rows || 4} placeholder={placeholder} value={value} onChange={onChange} className={`${base} resize-none`} />
      ) : (
        <input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={base} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="mt-1.5 font-body text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
