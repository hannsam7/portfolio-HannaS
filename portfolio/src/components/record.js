/**
 * record.js
 * Builds the record shelf and handles pointer-based drag interactions.
 * Calls turntable.loadProject() when a record is dropped on the platter.
 */

import { projects } from '../data/projects.js'
import { drawVinyl } from './vinylCanvas.js'
import { loadProject } from './turntable.js'

// ── Drag state ─────────────────────────────────────────────
let activeDrag = null
let dragId     = null

const dragPreview  = document.getElementById('drag-preview')
const prevSleeve   = document.getElementById('prev-sleeve')
const prevLabel    = document.getElementById('prev-label')
const prevVinyl    = document.getElementById('prev-vinyl')

// ── Helpers ────────────────────────────────────────────────

/** Returns true when pointer (x, y) is inside the drop zone circle */
function isOverDropZone(x, y) {
  const dzone = document.getElementById('dzone')
  const rect  = dzone.getBoundingClientRect()
  const cx    = rect.left + rect.width  / 2
  const cy    = rect.top  + rect.height / 2
  return Math.hypot(x - cx, y - cy) < rect.width / 2
}

// ── Build shelf ────────────────────────────────────────────

export function initShelf() {
  const shelfEl  = document.getElementById('shelf')
  const titlesEl = document.getElementById('titles')

  projects.forEach(p => {
    // ── Slot wrapper ──
    const slot = document.createElement('div')
    slot.className  = 'record-slot'
    slot.dataset.id = p.id
    slot.style.width = '90px'

    // ── Vinyl canvas (pops up on hover) ──
    const vinylCanvas = document.createElement('canvas')
    vinylCanvas.className = 'vinyl-peek'
    drawVinyl(vinylCanvas, p.colors, 86)

    // ── Sleeve ──
    const sleeve = document.createElement('div')
    sleeve.className = 'sleeve'
    sleeve.style.background = `linear-gradient(150deg, ${p.colors[0]}, ${p.colors[1]})`

    const label = document.createElement('span')
    label.className = 'sleeve-label'
    label.textContent = p.sub
    sleeve.appendChild(label)

    slot.appendChild(vinylCanvas)
    slot.appendChild(sleeve)
    shelfEl.appendChild(slot)

    // ── Title strip ──
    const title = document.createElement('div')
    title.className   = 'rec-title'
    title.dataset.id  = p.id
    title.textContent = p.title
    title.addEventListener('click', () => loadProject(p.id))
    titlesEl.appendChild(title)

    // ── Pointer drag events ──
    attachDragEvents(slot)
  })
}

// ── Pointer drag logic ─────────────────────────────────────

function attachDragEvents(slot) {
  slot.addEventListener('pointerdown', onDown)
  slot.addEventListener('pointermove', onMove)
  slot.addEventListener('pointerup',   onUp)
  slot.addEventListener('pointercancel', onCancel)
}

function onDown(e) {
  const slot = e.currentTarget
  e.preventDefault()
  slot.setPointerCapture(e.pointerId)

  activeDrag = slot
  dragId     = parseInt(slot.dataset.id)

  const p = projects.find(x => x.id === dragId)
  prevSleeve.style.background = `linear-gradient(150deg, ${p.colors[0]}, ${p.colors[1]})`
  prevLabel.textContent = p.sub
  drawVinyl(prevVinyl, p.colors, 84)

  dragPreview.style.left    = (e.clientX - 45) + 'px'
  dragPreview.style.top     = (e.clientY - 60) + 'px'
  dragPreview.style.display = 'block'
  slot.style.opacity = '.3'
}

function onMove(e) {
  if (activeDrag !== e.currentTarget) return
  e.preventDefault()

  dragPreview.style.left = (e.clientX - 45) + 'px'
  dragPreview.style.top  = (e.clientY - 60) + 'px'

  const dzone = document.getElementById('dzone')
  dzone.classList.toggle('over', isOverDropZone(e.clientX, e.clientY))
}

function onUp(e) {
  if (activeDrag !== e.currentTarget) return
  e.preventDefault()

  dragPreview.style.display = 'none'
  document.getElementById('dzone').classList.remove('over')
  e.currentTarget.style.opacity = ''

  if (isOverDropZone(e.clientX, e.clientY)) {
    loadProject(dragId)
  }

  activeDrag = null
  dragId     = null
}

function onCancel(e) {
  if (activeDrag !== e.currentTarget) return
  dragPreview.style.display = 'none'
  document.getElementById('dzone').classList.remove('over')
  e.currentTarget.style.opacity = ''
  activeDrag = null
}