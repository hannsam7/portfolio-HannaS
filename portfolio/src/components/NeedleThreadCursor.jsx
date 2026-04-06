import { useEffect, useRef, useState, useCallback, useId } from 'react'

const TRAIL_MS = 1500
const SMOOTH = 0.14
const HIGHLIGHT = '255, 59, 74'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

function alphaForAge(ageMs) {
  if (ageMs >= TRAIL_MS) return 0
  return 1 - ageMs / TRAIL_MS
}

export function NeedleThreadCursor() {
  const gradId = useId().replace(/:/g, '')
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const smoothInitRef = useRef(false)
  const trailRef = useRef([])
  const highlightRef = useRef(false)
  const rafRef = useRef(0)
  const [needle, setNeedle] = useState({ x: 0, y: 0, visible: false })
  const [pulseCount, setPulseCount] = useState(0)

  const checkInteractive = useCallback((clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY)
    highlightRef.current = Boolean(el?.closest?.('[data-thread-interactive]'))
  }, [])

  useEffect(() => {
    if (reduced) return

    document.documentElement.classList.add('cursor-thread-active')

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      mouseRef.current = { x, y }
      setNeedle({ x, y, visible: true })
      if (!smoothInitRef.current) {
        smoothRef.current = { x, y }
        smoothInitRef.current = true
      }
      checkInteractive(x, y)
    }

    const onLeave = () => {
      setNeedle((n) => ({ ...n, visible: false }))
    }

    const onDown = () => setPulseCount((c) => c + 1)

    const onScroll = () => {
      const { x, y } = mouseRef.current
      checkInteractive(x, y)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })

    return () => {
      document.documentElement.classList.remove('cursor-thread-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [reduced, checkInteractive])

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      const now = performance.now()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      if (smoothInitRef.current) {
        smoothRef.current.x += (mx - smoothRef.current.x) * SMOOTH
        smoothRef.current.y += (my - smoothRef.current.y) * SMOOTH
        trailRef.current.push({
          x: smoothRef.current.x,
          y: smoothRef.current.y,
          t: now,
        })
      }

      trailRef.current = trailRef.current.filter((p) => now - p.t < TRAIL_MS)

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const pts = trailRef.current
      const hi = highlightRef.current

      if (pts.length >= 2) {
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i]
          const b = pts[i + 1]
          const ageA = now - a.t
          const ageB = now - b.t
          const alpha = Math.min(alphaForAge(ageA), alphaForAge(ageB))
          if (alpha < 0.008) continue

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = hi
            ? `rgba(${HIGHLIGHT}, ${alpha * 0.95})`
            : `rgba(255, 255, 255, ${alpha * 0.88})`
          ctx.stroke()
        }

        ctx.setLineDash([])
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[5]"
        aria-hidden
      />

      <div
        className="pointer-events-none fixed z-[100]"
        style={{
          left: needle.x,
          top: needle.y,
          opacity: needle.visible ? 1 : 0,
        }}
      >
        <div key={pulseCount} className={pulseCount > 0 ? 'needle-tip-pulse' : undefined}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.35)]"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f5f5f5" />
                <stop offset="0.45" stopColor="#c8ccd4" />
                <stop offset="1" stopColor="#8f96a3" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="0"
              x2="26"
              y2="26"
              stroke={`url(#${gradId})`}
              strokeWidth="1.35"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="1.6" fill="#d0d4dc" stroke="#8f96a3" strokeWidth="0.4" />
          </svg>
        </div>
      </div>
    </>
  )
}
