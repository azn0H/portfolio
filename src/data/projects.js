export const projects = [
  {
    id: 1,
    title: 'QRco',
    description:
      'QRco je plnohodnotná webová aplikace pro generování, správu a personalizaci QR kódů. Umožňuje uživatelům vytvářet základní kódy zdarma nebo využívat pokročilé funkce jako vkládání log a změnu barev po registraci.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Axios', 'PostgreSQL', 'Python-QRCode'],
    liveUrl: 'https://qrco.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/QRco',
    featured: true,
    color: 'indigo',
  },
    {
    id: 2,
    title: 'aznoH.cz Blog',
    description:
      'Jednoduchý, rychlý a moderní blogovací systém navržený pro běh na Raspberry Pi (pomocí Dockeru), ale plně funkční i na běžném PC. Aplikace podporuje Dark Mode, Galerii s Lightboxem, Připínání článků a má vlastní administraci.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'PostgreSQL',],
    liveUrl: 'https://blog.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/RPI-Blog',
    featured: false,
    color: 'cyan',
  },
  {
    id: 3,
    title: 'TaskApp',
    description:
      'TaskApp je moderní full-stack webová aplikace navržená pro efektivní správu úkolů a týmovou koordinaci. Aplikace klade důraz na čistý, profesionální uživatelský zážitek (UI/UX) a robustní backendovou bezpečnost. Tento projekt byl vytvořen na základě principu oddělení frontendu (React) od backendu (PHP API), což umožňuje flexibilní nasazení a škálovatelnost.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    liveUrl: 'https://taskapp.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/TaskApp',
    featured: false,
    color: 'violet',
  },
  {
    id: 4,
    title: 'Tiz.cz',
    description:
      'Passwordless authentication SDK for JavaScript apps. Supports magic links, passkeys, and OAuth2. Drop-in solution with full audit logs.',
    tags: ['HTML', 'CSS', 'JSON', 'JavaScript',],
    liveUrl: 'https://tiz.cz',
    githubUrl: 'https://github.com/azn0H/Tiz.cz',
    featured: false,
    color: 'emerald',
  },
]

export const skills = [
  // Languages
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'HTML / CSS', category: 'Language' },
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  // Tools
  { name: 'Docker', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
]
