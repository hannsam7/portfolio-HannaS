// ─────────────────────────────────────────────────────────
//  ALL CONTENT LIVES HERE — edit this file to update your
//  portfolio without touching any logic or styles.
// ─────────────────────────────────────────────────────────

export const siteInfo = {
  name:  'Portfolio',
  role:  'Design & Development',
  year:  '2026',
}

// ── Projects ─────────────────────────────────────────────
// Each project maps to one slot in the playlist / record label colours.
// Add image paths (e.g. '/images/project-hero.jpg') and github URLs to show
// images and links in the project detail modal. Place images in /public/images/
export const projects = [
  {
    id:     1,
    title:  'Bachelor oppgave',
    sub:    'Bachelor thesis — interaction & UX',
    desc:   'Final bachelor project exploring how thoughtful interaction design and visual systems can support a clear narrative from research to prototype.',
    tags:   ['Bachelor', 'UX / UI', 'Prototyping'],
    colors: ['#7b4b3a', '#f2b9a1'],
    link:   '#',
    github: '',  // e.g. 'https://github.com/username/repo'
    image:  '',  // e.g. '/images/bachelor-hero.jpg'
    images: [],  // e.g. ['/images/bachelor-1.jpg', '/images/bachelor-2.jpg']
    detail: {
      overview: [
        'This bachelor thesis explored how interaction design and visual systems can turn research into a clear, readable narrative—from problem framing and user research through to a working prototype.',
        'The project combined qualitative methods, concept development, and iterative prototyping to deliver a coherent product concept with a strong design rationale.',
      ],
      role:    'Solo project — research, concept, UX/UI design, prototyping',
      timeline: 'One semester',
      outcomes: ['Structured research report', 'Concept and user flows', 'Interactive prototype', 'Written reflection and documentation'],
    },
  },
  {
    id:     2,
    title:  'Web of things',
    sub:    'Connected objects on the web',
    desc:   'Concepts and prototypes for how everyday objects expose data and behaviour through web technologies, focusing on simple, tangible interfaces.',
    tags:   ['IoT', 'Web', 'Prototyping'],
    colors: ['#d36fa6', '#f7c1d9'],
    link:   '#',
    github: '',
    image:  '',
    images: [],
    detail: {
      overview: [
        'Web of Things looked at how everyday objects can expose data and behaviour through web technologies—APIs, dashboards, and simple tangible interfaces—so non-experts can understand and interact with connected devices.',
        'The work included concept sketches, technical exploration, and small prototypes to test ideas around visibility and control of IoT from the browser.',
      ],
      role:    'Concept development, prototyping, technical exploration',
      timeline: 'Course / project period',
      outcomes: ['Concept documentation', 'Web-based demos', 'Technical proof-of-concepts'],
    },
  },
  {
    id:     3,
    title:  'Programmering 2 oblig 5',
    sub:    'Frontend development coursework',
    desc:   'Course assignment focused on structuring a small frontend application, with emphasis on clean JavaScript, components, and maintainable styling.',
    tags:   ['JavaScript', 'Frontend', 'Coursework'],
    colors: ['#5b3b5a', '#f4a9b8'],
    link:   '#',
    github: '',
    image:  '',
    images: [],
    detail: {
      overview: [
        'Oblig 5 in Programmering 2 focused on building a well-structured frontend application: clear separation of concerns, reusable components, and maintainable CSS.',
        'The assignment emphasised readable JavaScript, sensible state handling, and a UI that was both functional and easy to extend for future tasks.',
      ],
      role:    'Solo — full implementation',
      timeline: 'Assignment period',
      outcomes: ['Modular JS structure', 'Component-based UI', 'Responsive layout', 'Documented code'],
    },
  },
  {
    id:     4,
    title:  'GBS nettside',
    sub:    'Website for GBS',
    desc:   'Design and implementation of a small website for GBS, focusing on clear information architecture, responsive layout, and approachable visuals.',
    tags:   ['Web Design', 'Development', 'Client work'],
    colors: ['#6a3f3a', '#f0c1b3'],
    link:   '#',
    github: '',
    image:  '',
    images: [],
    detail: {
      overview: [
        'The GBS website was designed and built to present the organisation clearly and accessibly. Priorities were simple navigation, readable content, and a responsive layout that works on different devices.',
        'From content structure and wireframes through to implementation, the goal was a small but professional site that is easy to update and maintain.',
      ],
      role:    'Design and development',
      timeline: 'Project-based',
      outcomes: ['Information architecture', 'Visual design', 'Responsive site', 'Handover and documentation'],
    },
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
    email:    'hanna@example.com',
    location: 'San Francisco, CA',
    github:   'github.com/hannsam7',
    linkedin: 'linkedin.com/in/hannasam7',
    resume:   '/resume.pdf',
  },

  currentlyListening: 'Talk Talk — Spirit of Eden',
}