export const projects = [
  {
    id: 'Vortex',
    title: 'Vortex',
    year: '2026',
    status: 'Active',
    tags: 'C# · TypeScript · React · Docker API',
    description: {
      cs: 'Centrální login system. Zjednodušuje přístup k aznoh.cz aplikacím. Systém spravuje identitu, SSO, token issuing a globální role v Authentik nebo Zitadel. PostgreSQL uchovává veřejnou a omezenou konfiguraci přístupu pro každou aplikaci.',
      en: 'Central identity and SSO orchestration portal with ASP.NET Core backend. It unifies user identity, token issuance, and role management using Authentik/Zitadel while keeping public and restricted application access configs in PostgreSQL.',
    },
    liveUrl: 'https://sso.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/Vortex',
  },
  {
    id: 'metaport',
    title: 'MetaPort',
    year: '2026',
    status: 'Active',
    tags: 'React · TypeScript · FastAPI · Docker API',
    description: {
      cs: 'Centrální dashboard a orchestrátor pro správu mikro-služeb, monitorování serverové infrastruktury v reálném čase a ovládání Docker kontejnerů přes Docker Engine API.',
      en: 'Central orchestration dashboard for managing microservices, real-time server telemetry, and controlling Docker containers via the Docker Engine API.',
    },
    liveUrl: 'https://metaport.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/MetaPort',
  },
  {
    id: 'qrco',
    title: 'QRco',
    year: '2026',
    status: 'Live',
    tags: 'React · TypeScript · FastAPI · PostgreSQL',
    description: {
      cs: 'Webová aplikace pro generování, vektorový export (SVG/PNG) a analytiku dynamických QR kódů s integrací vlastního loga a asynchronním backendem v Pythonu.',
      en: 'Web application for dynamic QR code generation, vector SVG/PNG styling, custom branding embeds, and scan analytics powered by an async Python backend.',
    },
    liveUrl: 'https://qrco.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/QRco',
  },
  {
    id: 'taskapp',
    title: 'TaskApp',
    year: '2025',
    status: 'Live',
    tags: 'React · TypeScript · PHP API · MySQL',
    description: {
      cs: 'Full-stack systém pro správu týmových úkolů a koordinaci workflow se striktním oddělením React rozhraní od bezstavového REST API a transakční bezpečností v databázi.',
      en: 'Task tracking and workflow coordination platform built with strict separation of React frontend and stateless REST API with transactional database consistency.',
    },
    liveUrl: 'https://taskapp.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/TaskApp',
  },
  {
    id: 'rpi-blog',
    title: 'RPI-Blog',
    year: '2025',
    status: 'Live',
    tags: 'React · FastAPI · Docker · PostgreSQL',
    description: {
      cs: 'Rychlý publikační engine a systém pro správu technického obsahu optimalizovaný pro běh v izolovaných Docker kontejnerech na Raspberry Pi a Linux serverech.',
      en: 'Lightweight publishing engine and tech log platform optimized for containerized deployments on Raspberry Pi and Linux servers.',
    },
    liveUrl: 'https://blog.aznoh.cz',
    githubUrl: 'https://github.com/azn0H/RPI-Blog',
  },
]

export const architectureSkills = [
  {
    category: { cs: 'Frontend', en: 'Frontend' },
    items: 'React, Next.js, TypeScript, Tailwind CSS',
  },
  {
    category: { cs: 'Backend', en: 'Backend' },
    items: 'Python (FastAPI), Node.js, .NET (C#), PostgreSQL, MySQL',
  },
  {
    category: { cs: 'Systémy', en: 'Systems' },
    items: 'Docker, Linux server, Nginx, Self-hosting',
  },
]
