/**
 * Central content config — edit this file to update the site without touching components.
 *
 * @see README.md in the repo root for full field documentation.
 *
 * Media paths are relative to `public/` (e.g. `/images/projects/foo.png`).
 * Links with empty `href` or `href: '#'` are hidden in the project modal.
 */

/** About section on the hero — one string per paragraph. */
export const heroAbout = [
  "I'm a full stack developer, originally from Poland and now calling Norway home. I got into tech because I wanted to build things that actually matter. My bachelor's thesis is a real-time dashboard for emergency medical dispatchers, which says a lot about the kind of work that gets me out of bed.",
  "I'm drawn to systems where the stakes are real and the users aren't just \"users\" — they're people depending on the product to do its job.",
]

/** Intro copy displayed above the scrollable project list. */
export const projectsIntro =
  'Selected projects from my studies and practice — including my bachelor thesis (a live dispatch dashboard), a narrative web experience, coursework, and client work. Click a title to view screenshots, technologies, and links.'

/**
 * Projects shown on the main page. Clicking a title opens ProjectModal with full detail.
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string[]} description
 * @property {string[]} tags
 * @property {string[]} images
 * @property {{ src: string, poster?: string } | null} video
 * @property {{ label: string, href: string }[]} links
 * @property {{ role?: string, timeline?: string, outcomes?: string[] }} [detail]
 */
export const projectData = [
  {
    id: 'life-below-water',
    title: 'Life Below Water',
    subtitle: 'Narrative scroll experience (UN SDG 14)',
    description: [
      'An immersive, single-page story about coral reef loss, told through scroll-driven sections, atmospheric visuals, and restrained typography.',
      'Built to communicate research and urgency without overwhelming the reader — pairing editorial design with lightweight front-end motion.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Scroll storytelling', 'UX / UI'],
    images: ['/images/projects/life-below-water.png'],
    video: null,
    links: [{ label: 'GitHub', href: 'https://github.com/idg1293-2026/final-oblig-hannsam7' }],
    detail: {
      role: 'Solo project — research, concept, UX/UI design, front-end build',
      timeline: 'Course project',
      outcomes: [
        'Research-led narrative structure',
        'Responsive scroll experience',
        'Documented design rationale',
      ],
    },
  },
  {
    id: 'emergency-dashboard',
    title: 'Live Dashboard',
    subtitle: "Bachelor's thesis — real-time analytics for 113 dispatch",
    description: [
      'My bachelor thesis: a live control-room dashboard for emergency medical dispatch, aggregating call response times, regional load, forecasts, and infrastructure alerts.',
      'Designed for at-a-glance situational awareness with high-contrast charts and live-updating panels — built for operators who need the system to work when it counts.',
    ],
    tags: ['React', 'D3.js', 'WebSocket', 'Node.js', 'SARIMAX forecasting'],
    images: ['/images/projects/emergency-dashboard.png'],
    video: null,
    links: [{ label: 'GitHub', href: 'https://github.com/norsto/amk-dashboard' }],
    detail: {
      role: 'Full stack — research, backend integration, data visualisation, front-end build',
      timeline: "Bachelor's thesis — one semester",
      outcomes: [
        'Response-time and queue visualisations',
        'Forecast chart with confidence interval',
        'Alert panel for infrastructure status',
      ],
    },
  },
  {
    id: 'stock-simulator',
    title: 'Stock Market Simulator',
    subtitle: 'Educational stock market game',
    description: [
      'A desktop-style trading simulator where players track portfolio value, browse listed stocks, and study price history before buying or selling.',
      'Focused on clear tab navigation, searchable market tables, and an inline chart for the selected symbol.',
    ],
    tags: ['Java', 'JavaFX', 'Charting', 'Desktop UI'],
    images: ['/images/projects/stock-simulator.png'],
    video: null,
    links: [{ label: 'GitHub', href: 'https://github.com/NTNU-IE-IDI-IDATG/mappe-2026-millions-gruppe-19' }],
    detail: {
      role: 'Solo — application logic, UI, and data modelling',
      timeline: 'Course assignment',
      outcomes: [
        'Market, portfolio, and transaction views',
        'Searchable stock table with live selection',
        'Price chart with high/low summary',
        'Persistent player progress',
      ],
    },
  },
  {
    id: 'gbs-nettside',
    title: 'Company website',
    subtitle: 'Gjøvik ByggService AS',
    description: [
      'Design and implementation of a professional contractor website with a dark palette, gold accents, and a hero that highlights services and team presence.',
      'Structured for clear navigation, responsive layout, and straightforward paths to projects and contact.',
      'Booking and contact forms with minimal user input for injection prevention and spam messages.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive design', 'Client work'],
    images: ['/images/projects/gbs-website.png'],
    video: null,
    links: [{ label: 'Website link', href: 'https://gjovik-byggservice.no' }],
    detail: {
      role: 'Design and development',
      timeline: 'Project-based',
      outcomes: [
        'Information architecture',
        'Visual design system',
        'Responsive marketing site',
        'Handover and documentation',
      ],
    },
  },
]

/** Footer: mirrored name block, email (mailto), and social links. */
export const footerContact = {
  displayName: 'Hanna Samborska',
  email: 'hannasamb@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/hannsam7' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hannasamborska/' },
  ],
}
