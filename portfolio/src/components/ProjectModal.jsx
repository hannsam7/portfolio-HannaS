import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function filterLinks(links) {
  if (!links?.length) return []
  return links.filter((l) => l.href && l.href !== '#')
}

export function ProjectModal({ project, onClose }) {
  const open = Boolean(project)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const links = filterLinks(project?.links)

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex flex-col bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex shrink-0 items-center justify-end border-b border-white/10 px-4 py-3 md:px-8">
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="font-stitch text-lg tracking-widest text-thread transition hover:opacity-70 md:text-xl"
              aria-label="Close project"
            >
              × Close
            </button>
          </div>

          <motion.div
            className="min-h-0 flex-1 overflow-y-auto px-5 py-8 md:px-12 md:py-12"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-stitch text-sm text-white/70 md:text-base">{project.subtitle}</p>
            <h2 id="project-modal-title" className="font-stitch mt-3 text-3xl leading-tight text-thread md:text-5xl">
              {project.title}
            </h2>

            {project.video?.src ? (
              <div className="mt-10 overflow-hidden rounded-sm border border-white/15">
                <video
                  className="w-full"
                  controls
                  playsInline
                  poster={project.video.poster || undefined}
                  src={project.video.src}
                />
              </div>
            ) : null}

            {project.images?.length > 0 && (
              <div className="mt-10 flex flex-col gap-6">
                {project.images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full border border-white/10 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div className="mt-10 max-w-2xl space-y-4 font-sans text-base leading-relaxed text-thread md:text-lg">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {project.detail && (
              <dl className="mt-10 max-w-2xl space-y-3 font-sans text-sm text-white/80 md:text-base">
                {project.detail.role && (
                  <div>
                    <dt className="font-medium text-thread">Role</dt>
                    <dd className="mt-1">{project.detail.role}</dd>
                  </div>
                )}
                {project.detail.timeline && (
                  <div>
                    <dt className="font-medium text-thread">Timeline</dt>
                    <dd className="mt-1">{project.detail.timeline}</dd>
                  </div>
                )}
                {project.detail.outcomes?.length > 0 && (
                  <div>
                    <dt className="font-medium text-thread">Outcomes</dt>
                    <dd className="mt-1">
                      <ul className="list-inside list-disc space-y-1">
                        {project.detail.outcomes.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {project.tags?.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="border border-white/20 px-3 py-1 font-sans text-xs uppercase tracking-wider text-white/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {links.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-10">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm underline underline-offset-4 transition hover:opacity-70 md:text-base"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
