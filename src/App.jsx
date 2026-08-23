import { useState, useEffect } from 'react'
import { projects, architectureSkills } from './data/projects'
import { translations } from './data/translations'

export default function App() {
  // Theme state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('aznoh_theme')
    return saved !== null ? saved === 'dark' : true
  })

  // Language state with localStorage persistence & browser language fallback
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('aznoh_lang')
    if (saved === 'cs' || saved === 'en') return saved
    return navigator.language.startsWith('cs') ? 'cs' : 'en'
  })

  const [copied, setCopied] = useState(false)

  const t = translations[lang] || translations.cs

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('aznoh_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((v) => !v)

  const setLang = (newLang) => {
    setLangState(newLang)
    localStorage.setItem('aznoh_lang', newLang)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(t.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-[#0d0e11] text-[#ececed]' : 'bg-[#fafafc] text-[#16171a]'
    }`}>
      {/* Centered Minimalist Developer Index container (max-w-4xl = ~896px) */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* Top Header Controls: Language & Theme Switcher */}
        <header className="flex items-center justify-between pb-10 border-b border-zinc-800/60 text-xs font-mono">
          <div className="text-zinc-500 font-medium">
            aznoh.cz
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Jazyk / Language">
              <button
                onClick={() => setLang('cs')}
                aria-label="Přepnout do češtiny"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 rounded-sm ${
                  lang === 'cs'
                    ? darkMode ? 'text-white font-bold' : 'text-zinc-950 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                CS
              </button>
              <span className="text-zinc-700" aria-hidden="true">/</span>
              <button
                onClick={() => setLang('en')}
                aria-label="Switch to English"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 rounded-sm ${
                  lang === 'en'
                    ? darkMode ? 'text-white font-bold' : 'text-zinc-950 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                EN
              </button>
            </div>

            <span className="text-zinc-800" aria-hidden="true">·</span>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
              className="text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 rounded-sm"
            >
              {darkMode ? 'light' : 'dark'}
            </button>
          </div>
        </header>

        {/* 1. HERO (Dominant typography & visual weight) */}
        <section className="pt-12 sm:pt-14 pb-16 sm:pb-20">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-3 leading-[1.08] ${
              darkMode ? 'text-white' : 'text-zinc-950'
            }`}>
              {t.header.name}
            </h1>
            <p className={`text-lg sm:text-xl font-medium mb-6 ${
              darkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {t.header.subtitle}
            </p>
          </div>

          {/* Optimal line-length constraint (max-w-2xl = ~65ch) */}
          <p className={`text-base leading-relaxed max-w-2xl mb-8 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {t.header.bio}
          </p>

          {/* Underlined Direct Text Links */}
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <a
              href="https://github.com/azn0H"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {t.header.github}
            </a>

            <a
              href="https://www.linkedin.com/in/aznoh/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {t.header.linkedin}
            </a>

            <a
              href="mailto:info@aznoh.cz"
              className="text-link"
            >
              {t.header.email}
            </a>
          </div>
        </section>

        {/* 2. VYBRANÉ PROJEKTY (Asymetrický 2-sloupcový řádek na projekt) */}
        <section className="py-16 sm:py-20 border-t border-zinc-800">
          <h2 className={`text-xl font-bold tracking-tight mb-10 ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            {t.projects.heading}
          </h2>

          <div className="space-y-10">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`grid sm:grid-cols-12 gap-3 sm:gap-10 group ${
                  index !== 0 ? 'pt-10 border-t border-zinc-800/60' : ''
                }`}
              >
                {/* Left Column: Year/Status + Project Name + Tech Stack */}
                <div className="sm:col-span-4 lg:col-span-4">
                  <div className="text-xs font-mono text-zinc-500 mb-1">
                    {project.year} · {project.status}
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-bold text-lg tracking-tight inline-block transition-colors ${
                      darkMode
                        ? 'text-white hover:text-zinc-200'
                        : 'text-zinc-950 hover:text-zinc-700'
                    }`}
                  >
                    {project.title}
                  </a>
                  <div className="text-xs font-mono text-zinc-500 mt-1.5 leading-normal">
                    {project.tags}
                  </div>
                </div>

                {/* Right Column: Description + Links */}
                <div className="sm:col-span-8 lg:col-span-8 space-y-3">
                  <p className={`text-sm sm:text-[15px] leading-relaxed max-w-2xl transition-colors ${
                    darkMode
                      ? 'text-zinc-400 group-hover:text-zinc-300'
                      : 'text-zinc-600 group-hover:text-zinc-800'
                  }`}>
                    {project.description[lang]}
                  </p>

                  <div className="flex items-center gap-6 text-xs font-mono pt-1">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 group/link transition-colors ${
                        darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      <span className={`underline underline-offset-4 ${
                        darkMode
                          ? 'decoration-zinc-600 group-hover/link:decoration-white'
                          : 'decoration-zinc-400 group-hover/link:decoration-zinc-950'
                      }`}>
                        {t.projects.live}
                      </span>
                      <span className="inline-block text-zinc-500 group-hover/link:text-white transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true">
                        ↗
                      </span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 group/link transition-colors ${
                        darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      <span className={`underline underline-offset-4 ${
                        darkMode
                          ? 'decoration-zinc-700 group-hover/link:decoration-white'
                          : 'decoration-zinc-300 group-hover/link:decoration-zinc-950'
                      }`}>
                        {t.projects.github}
                      </span>
                      <span className="inline-block text-zinc-500 group-hover/link:text-white transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. ARCHITEKTURA & ZNALOSTI */}
        <section className="py-16 sm:py-20 border-t border-zinc-800 space-y-6">
          <h2 className={`text-xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            {t.architecture.heading}
          </h2>

          <div className="space-y-3.5 text-sm sm:text-base">
            {architectureSkills.map((domain) => (
              <div key={domain.category.cs} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className={`font-semibold shrink-0 sm:w-28 ${
                  darkMode ? 'text-zinc-200' : 'text-zinc-900'
                }`}>
                  • {domain.category[lang]}:
                </span>
                <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                  {domain.items}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. KONTAKT (Čistý přímý blok bez formuláře) */}
        <section className="py-16 sm:py-20 border-t border-zinc-800 space-y-8">
          <div>
            <h2 className={`text-xl font-bold tracking-tight mb-3 ${
              darkMode ? 'text-white' : 'text-zinc-950'
            }`}>
              {t.contact.heading}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {t.contact.text}
            </p>
          </div>

          <div className="space-y-6">
            {/* Velký e-mail s tlačítkem na kopírování */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${t.contact.email}`}
                className={`text-xl sm:text-2xl font-bold font-mono tracking-tight underline underline-offset-4 transition-colors ${
                  darkMode
                    ? 'text-white decoration-zinc-600 hover:text-white hover:decoration-white'
                    : 'text-zinc-950 decoration-zinc-400 hover:text-zinc-950 hover:decoration-zinc-900'
                }`}
              >
                {t.contact.email}
              </a>

              <button
                onClick={copyEmail}
                aria-label="Kopírovat e-mail do schránky"
                className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  darkMode
                    ? 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:text-white hover:border-zinc-700'
                    : 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-zinc-950'
                }`}
              >
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>

            {/* Přímé textové odkazy se šipkou */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono pt-1">
              <a
                href="https://github.com/azn0H"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 group/link transition-colors ${
                  darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <span className={`underline underline-offset-4 ${
                  darkMode
                    ? 'decoration-zinc-600 group-hover/link:decoration-white'
                    : 'decoration-zinc-400 group-hover/link:decoration-zinc-950'
                }`}>
                  {t.contact.github}
                </span>
                <span className="inline-block text-zinc-500 group-hover/link:text-white transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/aznoh/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 group/link transition-colors ${
                  darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <span className={`underline underline-offset-4 ${
                  darkMode
                    ? 'decoration-zinc-600 group-hover/link:decoration-white'
                    : 'decoration-zinc-400 group-hover/link:decoration-zinc-950'
                }`}>
                  {t.contact.linkedin}
                </span>
                <span className="inline-block text-zinc-500 group-hover/link:text-white transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="pt-12 border-t border-zinc-800/40 flex items-center justify-between text-xs font-mono text-zinc-600">
          <div>{t.footer.copy}</div>
          <div>{new Date().getFullYear()}</div>
        </footer>
      </main>
    </div>
  )
}