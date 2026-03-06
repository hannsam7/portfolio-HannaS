// ─────────────────────────────────────────────────────────
//  ALL CONTENT LIVES HERE — edit this file to update your
//  portfolio without touching any logic or styles.
// ─────────────────────────────────────────────────────────

export const siteInfo = {
    name:  'Hanna Samborska',
    role:  'Developer',
    year:  '2026',
  }
  
  // ── Projects ─────────────────────────────────────────────
  // Each project maps to one record on the shelf.
  // `colors` is a two-stop gradient for the vinyl label & sleeve.
  export const projects = [
    {
      id:     1,
      title:  'Wavelength',
      sub:    'Music Streaming App',
      desc:   'A reimagined streaming interface focused on discovery and mood-based listening. Shipped to 200k+ users across iOS and Android.',
      tags:   ['Product Design', 'iOS', 'Figma'],
      colors: ['#2d3561', '#a63d40'],
      link:   'https://example.com',
    },
    {
      id:     2,
      title:  'Canopy',
      sub:    'Environmental Dashboard',
      desc:   'Real-time climate data visualisation for urban planners. Built with D3.js and a custom design system from scratch.',
      tags:   ['Data Viz', 'React', 'D3.js'],
      colors: ['#1a6b4a', '#2ecc71'],
      link:   'https://example.com',
    },
    {
      id:     3,
      title:  'Folio',
      sub:    'Publishing Platform',
      desc:   'A minimal writing tool for independent journalists. Grew from 0 to 18k writers in six months.',
      tags:   ['Web App', 'UX Research', 'Next.js'],
      colors: ['#5c3d2e', '#e0a96d'],
      link:   'https://example.com',
    },
    {
      id:     4,
      title:  'Orbit',
      sub:    'Team Productivity',
      desc:   'Async collaboration tool that replaced daily standups. Reduced meeting time by 60% for a 40-person remote team.',
      tags:   ['SaaS', 'Design System', 'TypeScript'],
      colors: ['#1a1a2e', '#e94560'],
      link:   'https://example.com',
    },
  ]
  
  // ── About ─────────────────────────────────────────────────
  export const about = {
    // Set photo to an image path to replace the initials placeholder.
    // e.g. photo: '/images/portrait.jpg'  (place file in /public/images/)
    photo:    null,
    initials: 'AR',
  
    headline: 'Designing the\nspaces between\nthings.',
  
    bio: [
      "I'm a product designer and developer with eight years of experience building digital products that sit at the intersection of utility and craft.",
      "Before going independent, I led design at two venture-backed startups, shipping products used by millions of people across mobile and web.",
      "Outside of work, I collect vinyl records, shoot 35mm film, and cook elaborate Sunday dinners. The obsession with craft carries over everywhere.",
    ],
  
    skills: [
      'Figma', 'Framer', 'React', 'TypeScript', 'D3.js',
      'Next.js', 'Node.js', 'Postgres', 'Tailwind', 'CSS/SCSS',
      'Motion Design', 'User Research', 'Design Systems', 'Prototyping',
    ],
  
    contact: {
      email:    'hannasamb@gmail.com',
      github:   'github.com/hannsam7',
      linkedin: 'https://www.linkedin.com/in/hannasamborska/',
      resume:   '/resume.pdf',
    },
  
    currentlyListening: 'At last - Etta James',
  }