/**
 * nav.js
 * Renders the site header and handles view switching.
 * Exports `showView(name)` so pages can link to each other.
 */

import { siteInfo } from '../data/projects.js'

/** @type {string} */
let currentView = 'portfolio'

/**
 * Switch the visible view.
 * @param {'portfolio'|'about'} name
 */
export function showView(name) {
  if (name === currentView) return
  currentView = name

  // Hide all views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active')
    v.style.display = 'none'
  })

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
  document.getElementById(`nav-${name}`)?.classList.add('active')

  // Show target view (double rAF so CSS transition fires)
  const target = document.getElementById(`view-${name}`)
  target.style.display = 'block'
  requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('active')))
}

/** Render the header into #site-header */
export function initNav() {
  const header = document.getElementById('site-header')
  header.innerHTML = `
    <div class="header-left">
      <h1>${siteInfo.name}</h1>
      <div class="sub">${siteInfo.role}</div>
    </div>
    <nav>
      <button class="nav-btn active" id="nav-portfolio">Work</button>
      <button class="nav-btn"        id="nav-about">About</button>
    </nav>
  `

  document.getElementById('nav-portfolio').addEventListener('click', () => showView('portfolio'))
  document.getElementById('nav-about').addEventListener('click',     () => showView('about'))
  document.querySelector('.header-left').addEventListener('click',   () => showView('portfolio'))

  // Hide non-active views on load
  document.querySelectorAll('.view').forEach(v => {
    if (!v.classList.contains('active')) v.style.display = 'none'
  })
}
