/**
 * Edit this file to update copy, media, and links without touching components.
 *
 * Media:
 * - `images`: paths under `public/` e.g. `['/images/hero.jpg']`
 * - `video`: `{ src: '/videos/clip.mp4', poster: '/images/poster.jpg' }` or `null`
 *
 * Links with empty `href` or `href: '#'` are hidden until you set real URLs.
 *
 * Footer: see `footerContact` for mirrored-name block + contact links.
 */

export const heroAbout =
  "I'm a designer and developer focused on clear interaction, readable systems, and work that sits at the intersection of research and buildable prototypes. This site is intentionally minimal—like a blank canvas with stitched type."

export const projectData = [
  {
    id: 'bachelor-oppgave',
    title: 'Bachelor oppgave',
    subtitle: 'Bachelor thesis — interaction & UX',
    description: [
      'Final bachelor project exploring how thoughtful interaction design and visual systems can support a clear narrative from research to prototype.',
      'The project combined qualitative methods, concept development, and iterative prototyping to deliver a coherent product concept with a strong design rationale.',
    ],
    tags: ['Bachelor', 'UX / UI', 'Prototyping'],
    images: [],
    video: null,
    links: [
      { label: 'Live', href: '#' },
      { label: 'GitHub', href: '' },
    ],
    detail: {
      role: 'Solo project — research, concept, UX/UI design, prototyping',
      timeline: 'One semester',
      outcomes: [
        'Structured research report',
        'Concept and user flows',
        'Interactive prototype',
        'Written reflection and documentation',
      ],
    },
  },
  {
    id: 'web-of-things',
    title: 'Web of things',
    subtitle: 'Connected objects on the web',
    description: [
      'Concepts and prototypes for how everyday objects expose data and behaviour through web technologies, focusing on simple, tangible interfaces.',
      'The work included concept sketches, technical exploration, and small prototypes to test ideas around visibility and control of IoT from the browser.',
    ],
    tags: ['IoT', 'Web', 'Prototyping'],
    images: [],
    video: null,
    links: [
      { label: 'Live', href: '#' },
      { label: 'GitHub', href: '' },
    ],
    detail: {
      role: 'Concept development, prototyping, technical exploration',
      timeline: 'Course / project period',
      outcomes: ['Concept documentation', 'Web-based demos', 'Technical proof-of-concepts'],
    },
  },
  {
    id: 'programmering-2',
    title: 'Programmering 2 oblig 5',
    subtitle: 'Frontend development coursework',
    description: [
      'Course assignment focused on structuring a small frontend application, with emphasis on clean JavaScript, components, and maintainable styling.',
      'The assignment emphasised readable JavaScript, sensible state handling, and a UI that was both functional and easy to extend for future tasks.',
    ],
    tags: ['JavaScript', 'Frontend', 'Coursework'],
    images: [],
    video: null,
    links: [
      { label: 'Live', href: '#' },
      { label: 'GitHub', href: '' },
    ],
    detail: {
      role: 'Solo — full implementation',
      timeline: 'Assignment period',
      outcomes: ['Modular JS structure', 'Component-based UI', 'Responsive layout', 'Documented code'],
    },
  },
  {
    id: 'gbs-nettside',
    title: 'GBS nettside',
    subtitle: 'Website for GBS',
    description: [
      'Design and implementation of a small website for GBS, focusing on clear information architecture, responsive layout, and approachable visuals.',
      'From content structure and wireframes through to implementation, the goal was a small but professional site that is easy to update and maintain.',
    ],
    tags: ['Web Design', 'Development', 'Client work'],
    images: [],
    video: null,
    links: [
      { label: 'Live', href: '#' },
      { label: 'GitHub', href: '' },
    ],
    detail: {
      role: 'Design and development',
      timeline: 'Project-based',
      outcomes: [
        'Information architecture',
        'Visual design',
        'Responsive site',
        'Handover and documentation',
      ],
    },
  },
]

/** Footer contact — edit labels and URLs here. */
export const footerContact = {
  displayName: 'Hanna Samborska',
  email: 'hello@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/hannasamborska' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/hannasamborska' },
  ],
}
