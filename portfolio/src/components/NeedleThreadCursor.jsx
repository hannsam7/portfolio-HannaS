import { useEffect, useRef, useState, useCallback } from 'react'

const TRAIL_MS = 1500
const SMOOTH = 0.14
const HIGHLIGHT = '#ff3b4a'
const BASE = 'rgba(255,255,255,0.92)'

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
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef([])
  const highlightRef = useRef(false)
  const rafRef = useRef(0)
  const [needle, setNeedle] = useState({ x: 0, y: 0, visible: false })
  const [pulseKey, setPulseKey] = useState(0)

  const checkInteractive = useCallback((clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY)
    const hit = el?.closest?.('[data-thread-interactive]')
    highlightRef.current = Boolean(hit)
  }, [])

  useEffect(() => {
    if (reduced) return

    document.documentElement.classList.add('cursor-thread-active')

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setNeedle({ x: e.clientX, y: e.clientY, visible: true })
      checkInteractive(e.clientX, e.clientY)
    }

    const onLeave = () => {
      setNeedle((n) => ({ ...n, visible: false }))
    }

    const onDown = () => {
      setPulseKey((k) => k + 1)
    }

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
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
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

      smoothRef.current.x += (mx - smoothRef.current.x) * SMOOTH
      smoothRef.current.y += (my - smoothRef.current.y) * SMOOTH

      trailRef.current.push({
        x: smoothRef.current.x,
        y: smoothRef.current.y,
        t: now,
      })

      trailRef.current = trailRef.current.filter((p) => now - p.t < TRAIL_MS)

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const pts = trailRef.current
      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const hi = highlightRef.current
      const stroke = hi ? HIGHLIGHT : BASE

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
        if (alpha < 0.01) continue

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = hi
          ? `rgba(255, 59, 74, ${alpha * 0.95})`
          : `rgba(255, 255, 255, ${alpha * 0.88})`
        ctx.stroke()
      }

      ctx.setLineDash([])

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
          transform: 'translate(0, 0)',
        }}
      >
        <div
          key={pulseKey}
          className="needle-tip-pulse relative h-8 w-8 -translate-x-0 -translate-y-0"
          style={{ transformOrigin: '0 0' }}
        >
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
              <linearGradient id="needleMetal" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
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
              stroke="url(#needleMetal)"
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
