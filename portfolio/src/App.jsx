import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { heroAbout, projectData } from './data/projectData'
import { ProjectModal } from './components/ProjectModal'
import { StitchedProjectTitle } from './components/StitchedProjectTitle'
import { MessyBacksideFooter } from './components/MessyBacksideFooter'
import { NeedleThreadCursor } from './components/NeedleThreadCursor'

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12%' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <div className="relative min-h-screen bg-ink text-thread">
      <div className="pointer-events-none fixed inset-0 z-[1] aida-grid" aria-hidden />
      <NeedleThreadCursor />
      <div className="relative z-10">
        <section
          className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
          aria-label="Introduction"
        >
          <motion.h1
            className="font-stitch max-w-4xl text-4xl leading-tight tracking-tight text-thread sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Hanna Samborska
          </motion.h1>
          <motion.p
            className="mt-10 max-w-xl font-sans text-base leading-relaxed text-thread md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroAbout}
          </motion.p>
        </section>

        <section className="border-t border-white/10 px-6 pb-32 pt-8" aria-label="Projects">
          <div className="mx-auto max-w-3xl">
            {projectData.map((project) => (
              <motion.article
                key={project.id}
                className="flex min-h-[38vh] flex-col justify-center border-b border-white/10 py-16 last:border-b-0 md:min-h-[42vh] md:py-20"
                {...sectionReveal}
              >
                <StitchedProjectTitle
                  title={project.title}
                  onClick={() => setActiveProject(project)}
                  className="text-left font-stitch text-3xl leading-snug text-thread transition hover:opacity-80 focus:outline-none md:text-4xl lg:text-5xl"
                />
                <p className="mt-4 max-w-xl font-sans text-sm text-white/75 md:text-base">{project.subtitle}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <MessyBacksideFooter />
      </div>

      <div className="crt-overlay pointer-events-none fixed inset-0 z-[20]" aria-hidden />

      <ProjectModal project={activeProject} onClose={closeModal} />
    </div>
  )
}
