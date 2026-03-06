/**
 * turntable.js
 * Renders the turntable HTML and exposes loadProject()
 * which animates the arm, spins the vinyl, and populates
 * the info panel.
 */

import { projects } from '../data/projects.js'
import { drawVinyl } from './vinylCanvas.js'

/** Render turntable markup into #view-portfolio */
export function initTurntable() {
  document.getElementById('view-portfolio').innerHTML = `
    <div class="hint">Hover a record to see the vinyl · Drag onto the turntable to play</div>
    <div class="page">
      <div class="tt-section">

        <div class="turntable" id="turntable">
          <div class="screw3"></div>
          <div class="screw4"></div>
          <div class="platter-wrap">
            <div class="platter-ring"></div>
            <div class="platter-mat"></div>
          </div>
          <div class="spindle"></div>
          <div class="vinyl-on-platter" id="vwrap">
            <canvas id="vcanvas" width="232" height="232"></canvas>
          </div>
          <div class="drop-zone" id="dzone">
            <div class="drop-label" id="dlabel">drop record<br>here</div>
          </div>
          <div class="tonearm-wrap">
            <svg class="tonearm" id="arm" viewBox="0 0 90 90" fill="none">
              <defs>
                <radialGradient id="sg">
                  <stop offset="0%"   stop-color="#aaa"/>
                  <stop offset="100%" stop-color="#555"/>
                </radialGradient>
              </defs>
              <circle cx="62" cy="12" r="10" fill="#222" stroke="#444" stroke-width="1.5"/>
              <circle cx="62" cy="12" r="4"  fill="url(#sg)"/>
              <rect x="59" y="12" width="5" height="58" rx="2.5" fill="#333" transform="rotate(-10 62 12)"/>
              <rect x="9"  y="60" width="18" height="9" rx="3"   fill="#444" transform="rotate(-15 18 64)"/>
              <rect x="13" y="68" width="3"  height="5" rx="1"   fill="#555" transform="rotate(-15 14 70)"/>
            </svg>
          </div>
        </div>

        <div class="info-panel" id="panel">
          <div class="info-num" id="ptag"></div>
          <h2 id="ptitle"></h2>
          <div class="info-sub" id="psub"></div>
          <p class="info-desc" id="pdesc"></p>
          <div class="info-tags" id="ptags"></div>
          <a href="#" class="info-btn" id="plink">View project</a>
        </div>

      </div>
      <div class="shelf-section">
        <div class="shelf-unit">
          <div class="shelf-row"     id="shelf"></div>
          <div class="record-titles" id="titles"></div>
        </div>
      </div>
    </div>
  `
}

/**
 * Load a project onto the turntable.
 * Called by record.js after a successful drop.
 * @param {number} id
 */
export function loadProject(id) {
  const p = projects.find(x => x.id === id)
  if (!p) return

  // Mark the record slot as used (greyed out on shelf)
  document.querySelector(`.record-slot[data-id="${id}"]`)?.classList.add('used')

  // Draw & spin the vinyl
  const canvas = document.getElementById('vcanvas')
  drawVinyl(canvas, p.colors, 232)
  document.getElementById('vwrap').classList.add('playing')

  // Swing the tonearm in
  document.getElementById('arm').classList.add('playing')

  // Hide the drop label
  document.getElementById('dlabel').style.opacity = '0'

  // Populate info panel
  document.getElementById('ptag').textContent   = `— ${String(id).padStart(2, '0')} / ${projects.length} —`
  document.getElementById('ptitle').textContent = p.title
  document.getElementById('psub').textContent   = p.sub
  document.getElementById('pdesc').textContent  = p.desc
  document.getElementById('plink').href         = p.link

  const tagsEl = document.getElementById('ptags')
  tagsEl.innerHTML = ''
  p.tags.forEach(tag => {
    const span = document.createElement('span')
    span.className   = 'info-tag'
    span.textContent = tag
    tagsEl.appendChild(span)
  })

  // Animate panel in
  const panel = document.getElementById('panel')
  panel.classList.remove('visible')
  setTimeout(() => panel.classList.add('visible'), 60)
}
