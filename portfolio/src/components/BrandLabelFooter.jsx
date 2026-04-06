import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FABRIC = '#F9F9F7'
const INK = '#1A1A1A'
const EXT = 2
/** Wave length along perimeter (px) — controls zigzag frequency */
const WAVE_LENGTH = 11
const SAMPLE_STEP = 1.15

/**
 * Single closed path: sine wave offset along outward normal; perimeter phase s is continuous
 * so the wave reads as one hand-guided stitch line. Corners connect with short segments (miter).
 */
function buildSineWaveBorderPath(w, h, amp, wavelength) {
  const k = (2 * Math.PI) / wavelength
  const pts = []

  const pushTop = () => {
    for (let x = 0; x <= w; x += SAMPLE_STEP) {
      const xx = Math.min(x, w)
      const s = xx
      pts.push({ x: xx, y: -amp * Math.sin(k * s) })
    }
  }

  const pushRight = () => {
    for (let y = SAMPLE_STEP; y <= h; y += SAMPLE_STEP) {
      const yy = Math.min(y, h)
      const s = w + yy
      pts.push({ x: w + amp * Math.sin(k * s), y: yy })
    }
  }

  const pushBottom = () => {
    for (let x = w; x >= 0; x -= SAMPLE_STEP) {
      const xx = Math.max(x, 0)
      const s = w + h + (w - xx)
      pts.push({ x: xx, y: h + amp * Math.sin(k * s) })
    }
  }

  const pushLeft = () => {
    for (let y = h - SAMPLE_STEP; y >= 0; y -= SAMPLE_STEP) {
      const yy = Math.max(y, 0)
      const s = 2 * w + 2 * h - yy
      pts.push({ x: -amp * Math.sin(k * s), y: yy })
    }
  }

  pushTop()
  pushRight()
  pushBottom()
  pushLeft()

  if (pts.length < 3) return ''

  const d = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ')
  return `${d} Z`
}

function FabricNoise() {
  return (
    <svg className="absolute inset-0 h-full w-full rounded-[2px] pointer-events-none opacity-[0.06] mix-blend-multiply" aria-hidden>
      <defs>
        <filter id="woven-label-noise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" seed="11" result="turb" />
          <feColorMatrix in="turb" type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff" filter="url(#woven-label-noise)" />
    </svg>
  )
}

function OverlockOverlay({ iw, ih }) {
  const pad = EXT + 3
  const vw = iw + 2 * pad
  const vh = ih + 2 * pad
  const ox = pad
  const oy = pad

  const pathD = useMemo(
    () => buildSineWaveBorderPath(iw, ih, EXT, WAVE_LENGTH),
    [iw, ih]
  )

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-[2] overflow-visible"
      width={vw}
      height={vh}
      viewBox={`0 0 ${vw} ${vh}`}
      style={{ marginLeft: -pad, marginTop: -pad }}
      aria-hidden
    >
      <g transform={`translate(${ox} ${oy})`}>
        <path
          d={pathD}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2.6 2.35"
        />
      </g>
    </svg>
  )
}

function AnchorThreads() {
  const thick = 2.4
  const len = 11
  const inset = 2
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0 z-[3]"
      style={{ height: len, marginTop: -len }}
      aria-hidden
    >
      <div
        className="absolute rounded-[1px] bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        style={{
          left: inset,
          width: thick,
          top: 0,
          height: len,
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)',
        }}
      />
      <div
        className="absolute rounded-[1px] bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        style={{
          right: inset,
          width: thick,
          top: 0,
          height: len,
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)',
        }}
      />
    </div>
  )
}

export function BrandLabelFooter() {
  const boxRef = useRef(null)
  const [dims, setDims] = useState({ w: 200, h: 36 })
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const hoverTransition = {
    type: 'spring',
    stiffness: 320,
    damping: 44,
    mass: 1.35,
  }

  return (
    <motion.div
      role="region"
      aria-label="Design credit"
      className="relative z-[1] max-w-[min(16.5rem,calc(100vw-3rem))]"
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : {
              rotate: 3,
              skewX: 2.2,
              skewY: -1.6,
              scale: 1.016,
              transition: hoverTransition,
            }
      }
      style={{ transformOrigin: '18% 90%' }}
    >
      <div className="relative inline-block">
        <AnchorThreads />

        <div
          ref={boxRef}
          className="relative z-[1] overflow-hidden rounded-[2px] px-2.5 py-1.5 text-[10px] leading-snug sm:text-[11px]"
          style={{
            backgroundColor: FABRIC,
            color: INK,
            letterSpacing: '0.08em',
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.55),
              inset 0 -1px 2px rgba(0,0,0,0.06),
              inset 1px 0 1px rgba(0,0,0,0.04),
              inset -1px 0 1px rgba(255,255,255,0.25),
              2px 3px 10px rgba(0,0,0,0.42),
              1px 2px 4px rgba(0,0,0,0.28)
            `,
          }}
        >
          <FabricNoise />
          <p
            className="relative z-[1] m-0 font-sans antialiased"
            style={{
              color: INK,
            }}
          >
            Designed & Hand-Stitched by Hanna Samborska
          </p>
        </div>

        <OverlockOverlay iw={dims.w} ih={dims.h} />
      </div>
    </motion.div>
  )
}
