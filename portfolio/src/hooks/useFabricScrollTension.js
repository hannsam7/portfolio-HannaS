import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/** px/s — higher = need faster scroll to reach max tension */
const VELOCITY_NORMALIZE = 2600
const MAX_SCALE_Y = 1.05
const MAX_SKEW_DEG = 2.25

/**
 * Subtle vertical scale + skew from scroll velocity (no scroll-jacking).
 * Disabled when prefers-reduced-motion is set.
 */
export function useFabricScrollTension() {
  const prefersReducedMotion = useReducedMotion()
  const targetStretch = useMotionValue(0)
  const stretch = useSpring(targetStretch, {
    stiffness: 400,
    damping: 30,
  })
  const velocitySignRef = useRef(1)
  const idleTimerRef = useRef(null)

  const scaleY = useTransform(stretch, [0, 1], [1, MAX_SCALE_Y])
  const skewY = useTransform(stretch, (s) => s * MAX_SKEW_DEG * velocitySignRef.current)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    let lastY = window.scrollY
    let lastT = performance.now()

    const onScroll = () => {
      const y = window.scrollY
      const t = performance.now()
      const dt = Math.max((t - lastT) / 1000, 0.001)
      const v = (y - lastY) / dt
      lastY = y
      lastT = t

      if (Math.abs(v) > 0.5) {
        velocitySignRef.current = Math.sign(v) || 1
      }

      const n = Math.min(Math.abs(v) / VELOCITY_NORMALIZE, 1)
      targetStretch.set(n)

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        targetStretch.set(0)
        idleTimerRef.current = null
      }, 72)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [prefersReducedMotion, targetStretch])

  if (prefersReducedMotion) {
    return { active: false }
  }

  return { active: true, scaleY, skewY }
}
