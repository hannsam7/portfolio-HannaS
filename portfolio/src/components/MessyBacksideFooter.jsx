import { useMemo } from 'react'
import { footerContact } from '../data/projectData'

/** Deterministic “frayed fabric” edge — full width, jagged lower silhouette. */
function FrayedFabricEdge() {
  const { pathD, fillPath } = useMemo(() => {
    const w = 1200
    const top = 6
    const bottom = 22
    let topEdge = `M0,${top}`
    for (let x = 0; x <= w; x += 5) {
      const jitter = ((x * 13) % 17) * 0.25 + Math.sin(x / 31) * 2.2
      topEdge += ` L${x},${top + jitter}`
    }
    let fray = topEdge
    for (let x = w; x >= 0; x -= 4) {
      const j = ((x * 7) % 11) * 0.35 + Math.cos(x / 19) * 1.8
      fray += ` L${x},${bottom + j}`
    }
    fray += ' Z'
    return { pathD: topEdge, fillPath: fray }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <svg
        className="block h-10 w-full text-white/40 md:h-12"
        viewBox="0 0 1200 28"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={fillPath} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function buildThreadLayout(text) {
  const chars = [...text]
  const n = chars.length
  const w = 440
  const h = 76
  const positions = chars.map((ch, i) => ({
    x: (w / (n + 1)) * (i + 1),
    y:
      h * 0.48 +
      Math.sin(i * 0.85) * 5 +
      (ch === ' ' ? 10 : 0) +
      ((i * 3) % 5) * 0.4,
  }))

  const paths = []
  for (let i = 0; i < n - 1; i++) {
    const a = positions[i]
    const b = positions[i + 1]
    const midX = (a.x + b.x) / 2
    const midY = (a.y + b.y) / 2 + Math.sin(i * 1.9) * 9 + ((i * 5) % 7) - 3
    paths.push(`M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`)
  }

  return { positions, paths, w, h }
}

export function MessyBacksideFooter() {
  const { displayName, email, socials } = footerContact
  const { positions, paths, w, h } = useMemo(() => buildThreadLayout(displayName), [displayName])

  const mailto = email.startsWith('mailto:') ? email : `mailto:${email}`

  return (
    <footer className="relative mt-8 border-t border-white/[0.06] px-6 pb-20 pt-0">
      <FrayedFabricEdge />

      <div className="mx-auto max-w-3xl">
        <div className="relative pt-14 text-center">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.35em] text-white/35">
            Messy backside — reverse side
          </p>

          <div
            className="relative mx-auto inline-flex max-w-full -scale-x-100 justify-center"
            aria-hidden
          >
            <div className="relative px-2 py-1">
              <p className="font-stitch pointer-events-none relative z-[1] text-3xl leading-tight text-thread/90 md:text-4xl">
                {displayName}
              </p>
              <svg
                className="messy-footer-svg pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible md:pointer-events-auto"
                viewBox={`0 0 ${w} ${h}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <g className="text-thread pointer-events-none">
                  {positions.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="currentColor" />
                  ))}
                </g>
                <g className="text-thread" style={{ opacity: 0.4 }}>
                  {paths.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="thread-path"
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>

          <p className="sr-only">
            Decorative mirrored embroidery: {displayName}. Contact links follow.
          </p>
        </div>

        <nav
          className="mt-14 flex flex-col items-center gap-6 border-t border-white/[0.07] pt-12"
          aria-label="Contact"
        >
          <a
            href={mailto}
            className="hand-tag-label inline-block font-sans text-sm text-thread/95 transition hover:text-thread"
            style={{ transform: 'rotate(-1.4deg)' }}
          >
            {email.replace(/^mailto:/i, '')}
          </a>
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {socials.map((item, i) => (
              <li key={item.href + item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hand-tag-label inline-block font-sans text-xs uppercase tracking-wider text-white/85 transition hover:text-thread md:text-sm"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -2.2 : 1.6}deg)`,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
