import { useEffect, useRef, useState, useCallback, useId } from 'react'

const TRAIL_MS = 1500
const SMOOTH = 0.14
const HIGHLIGHT = '255, 59, 74'

const IDLE_MS = 1000
const MAX_SHADOW_EXTRA = 11
const SPEED_REF = 3200

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

  const lastMoveAtRef = useRef(performance.now())
  const lastPosRef = useRef({ x: 0, y: 0, t: performance.now() })
  const smoothSpeedRef = useRef(0)
  const phaseRef = useRef('hover')

  const [needle, setNeedle] = useState({ x: 0, y: 0, visible: false })
  const [pulseCount, setPulseCount] = useState(0)
  const [speedNorm, setSpeedNorm] = useState(0)
  const [phase, setPhase] = useState('hover')
  const [recoilKey, setRecoilKey] = useState(0)

  phaseRef.current = phase

  const checkInteractive = useCallback((clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY)
    highlightRef.current = Boolean(el?.closest?.('[data-thread-interactive]'))
  }, [])

  const updateVelocity = useCallback((x, y) => {
    const t = performance.now()
    const lp = lastPosRef.current
    const dt = Math.max((t - lp.t) / 1000, 0.001)
    const dist = Math.hypot(x - lp.x, y - lp.y)
    const inst = dist / dt
    lastPosRef.current = { x, y, t }
    smoothSpeedRef.current += (inst - smoothSpeedRef.current) * 0.22
    const n = Math.min(smoothSpeedRef.current / SPEED_REF, 1)
    setSpeedNorm((prev) => (Math.abs(prev - n) < 0.02 ? prev : n))
  }, [])

  useEffect(() => {
    if (reduced) return undefined

    const idleId = window.setInterval(() => {
      if (performance.now() - lastMoveAtRef.current > IDLE_MS && phaseRef.current === 'hover') {
        phaseRef.current = 'sunk'
        setPhase('sunk')
      }
    }, 100)
    return () => window.clearInterval(idleId)
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    document.documentElement.classList.add('cursor-thread-active')

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const now = performance.now()
      mouseRef.current = { x, y }
      setNeedle({ x, y, visible: true })
      lastMoveAtRef.current = now

      if (phaseRef.current === 'sunk') {
        phaseRef.current = 'pulling'
        setPhase('pulling')
        setRecoilKey((k) => k + 1)
      } else if (phaseRef.current !== 'pulling') {
        phaseRef.current = 'hover'
        setPhase('hover')
      }

      if (!smoothInitRef.current) {
        smoothRef.current = { x, y }
        lastPosRef.current = { x, y, t: now }
        smoothInitRef.current = true
      } else {
        updateVelocity(x, y)
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

    const decayId = window.setInterval(() => {
      smoothSpeedRef.current *= 0.94
      setSpeedNorm((prev) => {
        const target = Math.min(smoothSpeedRef.current / SPEED_REF, 1)
        return Math.abs(prev - target) < 0.015 ? prev : prev + (target - prev) * 0.4
      })
    }, 64)

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
      window.clearInterval(decayId)
    }
  }, [reduced, checkInteractive, updateVelocity])

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

  useEffect(() => {
    if (!reduced || phase !== 'pulling') return undefined
    const id = window.setTimeout(() => {
      if (phaseRef.current === 'pulling') {
        phaseRef.current = 'hover'
        setPhase('hover')
      }
    }, 220)
    return () => window.clearTimeout(id)
  }, [reduced, phase, recoilKey])

  const onRecoilEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (phaseRef.current !== 'pulling') return
    if (reduced) return
    phaseRef.current = 'hover'
    setPhase('hover')
  }

  if (reduced) return null

  const extra = speedNorm * MAX_SHADOW_EXTRA
  const showShadow = phase !== 'sunk'
  const shadowOpacity = showShadow ? 0.36 + speedNorm * 0.28 : 0
  const shadowBlur = 2 + speedNorm * 2.5
  const shadowX = 2.5 + extra * 0.55
  const shadowY = 3.5 + extra * 0.85

  const motionWrapClass =
    phase === 'pulling'
      ? reduced
        ? 'needle-recoil-reduced'
        : 'needle-recoil'
      : phase === 'sunk'
        ? 'needle-sunk'
        : ''

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
        {showShadow && (
          <div
            className="needle-tip-shadow pointer-events-none absolute left-0 top-0"
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.52)',
              filter: `blur(${shadowBlur}px)`,
              opacity: shadowOpacity,
              transform: `translate(${shadowX}px, ${shadowY}px) scale(${0.52 + speedNorm * 0.22})`,
              transformOrigin: '0 0',
            }}
            aria-hidden
          />
        )}

        <div
          key={phase === 'pulling' ? `recoil-${recoilKey}` : 'needle-body'}
          className={motionWrapClass}
          style={{ transformOrigin: '0 0' }}
          onAnimationEnd={onRecoilEnd}
        >
          <div key={pulseCount} className={pulseCount > 0 ? 'needle-tip-pulse' : undefined} style={{ transformOrigin: '0 0' }}>
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
      </div>
    </>
  )
}
