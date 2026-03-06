/**
 * vinylCanvas.js
 * Draws a realistic vinyl record onto a <canvas> element.
 * Isolated here so it can be reused by both the shelf records
 * and the spinning platter without duplicating logic.
 */

/**
 * @param {HTMLCanvasElement} canvas
 * @param {[string, string]} colors  - two-stop gradient for the centre label
 * @param {number} size              - pixel dimensions (canvas will be resized)
 */
export function drawVinyl(canvas, colors, size) {
    const s = size || canvas.width
    const ctx = canvas.getContext('2d')
    const cx = s / 2, cy = s / 2
  
    canvas.width  = s
    canvas.height = s
  
    // ── Black disc ──
    ctx.beginPath()
    ctx.arc(cx, cy, s / 2 - 1, 0, Math.PI * 2)
    ctx.fillStyle = '#0d0d0d'
    ctx.fill()
  
    // ── Grooves (concentric rings with slight shimmer) ──
    for (let r = 14; r < s / 2 - 4; r += 3.2) {
      const alpha = 0.04 + 0.035 * Math.sin(r * 0.45)
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`
      ctx.lineWidth = 0.6
      ctx.stroke()
    }
  
    // ── Colour label in the centre ──
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.18)
    grad.addColorStop(0, colors[0])
    grad.addColorStop(1, colors[1])
    ctx.beginPath()
    ctx.arc(cx, cy, s * 0.18, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  
    // ── Label ring ──
    ctx.beginPath()
    ctx.arc(cx, cy, s * 0.12, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,.12)'
    ctx.lineWidth = 0.8
    ctx.stroke()
  
    // ── Spindle hole ──
    ctx.beginPath()
    ctx.arc(cx, cy, s * 0.025, 0, Math.PI * 2)
    ctx.fillStyle = '#111'
    ctx.fill()
  }
  