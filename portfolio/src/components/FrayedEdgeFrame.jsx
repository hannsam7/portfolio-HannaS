import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SHADES = ['#FFFFFF', '#F5F5F5', '#E0E0E0']
const PROX = 50
const MAX_ROT = 14
const MAX_SK = 5

function seededRandom(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0
  return () => {
    h |= 0
    h = (h + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildThreads(seed, countPerSide) {
  const rnd = seededRandom(seed || 'fray')
  const sides = ['top', 'right', 'bottom', 'left']
  const threads = []
  let id = 0
  for (const side of sides) {
    for (let i = 0; i < countPerSide; i++) {
      const offset = 0.06 + rnd() * 0.88
      const length = 4 + Math.floor(rnd() * 9)
      const widthPx = rnd() > 0.45 ? 1.5 : 1
      const color = SHADES[Math.floor(rnd() * SHADES.length)]
      const swayDelay = rnd() * -8
      threads.push({ id: id++, side, offset, length, widthPx, color, swayDelay })
    }
  }
  return threads
}

function threadCenterOnScreen(side, offset, length, rect) {
  const o = offset
  switch (side) {
    case 'top':
      return { x: rect.left + o * rect.width, y: rect.top - length / 2 }
    case 'bottom':
      return { x: rect.left + o * rect.width, y: rect.bottom + length / 2 }
    case 'left':
      return { x: rect.left - length / 2, y: rect.top + o * rect.height }
    case 'right':
      return { x: rect.right + length / 2, y: rect.top + o * rect.height }
    default:
      return { x: 0, y: 0 }
  }
}

function bendForProximity(mx, my, cx, cy) {
  const dx = mx - cx
  const dy = my - cy
  const d = Math.hypot(dx, dy)
  if (d > PROX || d < 0.5) return { rot: '0deg', sk: '0deg' }
  const t = (PROX - d) / PROX
  const ang = Math.atan2(dy, dx)
  const push = t * MAX_ROT
  const rot = -Math.sin(ang) * push
  const sk = Math.cos(ang) * t * MAX_SK
  return { rot: `${rot}deg`, sk: `${sk}deg` }
}

export function FrayedEdgeFrame({ children, className = '', seed = 'fray', variant = 'default', threadsPerSide = 6 }) {
  const wrapRef = useRef(null)
  const threads = useMemo(() => buildThreads(String(seed), threadsPerSide), [seed, threadsPerSide])
  const [bends, setBends] = useState(() => threads.map(() => ({ rot: '0deg', sk: '0deg' })))
  const rafRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    setBends(threads.map(() => ({ rot: '0deg', sk: '0deg' })))
  }, [threads])

  const updateBends = useCallback(() => {
    const el = wrapRef.current
    const { x: mx, y: my } = mouseRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = threads.map((th) => {
      const c = threadCenterOnScreen(th.side, th.offset, th.length, rect)
      return bendForProximity(mx, my, c.x, c.y)
    })
    setBends(next)
  }, [threads])

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateBends)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateBends])

  const rootClass =
    variant === 'fullscreen'
      ? 'fray-frame fray-frame--fullscreen relative flex min-h-0 w-full flex-1 flex-col overflow-visible'
      : 'fray-frame relative w-full overflow-visible'

  return (
    <div ref={wrapRef} className={`${rootClass} ${className}`.trim()}>
      <div className="fray-jagged-ring pointer-events-none" aria-hidden />
      <div className="fray-threads pointer-events-none absolute inset-0 z-[2] overflow-visible" aria-hidden>
        {threads.map((th, i) => (
          <span
            key={th.id}
            className={`fray-thread-wrap fray-thread-wrap--${th.side}`}
            style={{
              '--fray-len': `${th.length}px`,
              '--fray-w': `${th.widthPx}px`,
              '--fray-off': `${th.offset * 100}%`,
              '--sway-delay': `${th.swayDelay}s`,
              '--bend-r': bends[i]?.rot ?? '0deg',
              '--bend-sk': bends[i]?.sk ?? '0deg',
            }}
          >
            <span className="fray-thread-arm" style={{ background: th.color }} />
          </span>
        ))}
      </div>
      <div
        className={
          variant === 'fullscreen'
            ? 'relative z-10 flex min-h-0 flex-1 flex-col'
            : 'relative z-10 min-h-0'
        }
      >
        {children}
      </div>
    </div>
  )
}
