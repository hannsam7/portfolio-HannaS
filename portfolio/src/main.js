import './styles/base.css'

import { siteInfo, projects, about } from './data/projects.js'

const app = document.getElementById('app')

app.innerHTML = `
  <div class="page">
    <header class="site-header">
      <div class="logo">
        <div class="logo-mark"></div>
        <div class="logo-text">
          <div class="logo-name">${siteInfo.name}</div>
          <div class="logo-role">${siteInfo.role}</div>
        </div>
      </div>
      <nav class="site-nav">
        <button class="nav-pill nav-pill--active" data-target="work">Work</button>
        <button class="nav-pill" data-target="about">About</button>
      </nav>
    </header>

    <main>
      <section class="view view--active" data-view="work">
        <div class="hero">
          <div class="hero-turntable">
            <div class="tt-body">
              <div class="tt-disc">
                <div class="tt-disc-grooves"></div>
                <div class="tt-disc-label" id="disc-label"></div>
                <div class="tt-disc-hole"></div>
              </div>
              <div class="tt-arm-wrap">
                <svg class="tt-arm" id="tonearm" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="arm-metal-new" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#fafafa" />
                      <stop offset="50%" stop-color="#c5c5c5" />
                      <stop offset="100%" stop-color="#7a7a7a" />
                    </linearGradient>
                  </defs>
                  <circle cx="92" cy="22" r="10" fill="#101010" stroke="#3b3b3b" stroke-width="1.4" />
                  <circle cx="92" cy="22" r="4.6" fill="#c7c7c7" />
                  <path d="M88 26 C 74 40, 60 54, 44 66" stroke="url(#arm-metal-new)" stroke-width="4" stroke-linecap="round" />
                  <rect x="30" y="62" width="14" height="7.5" rx="3" fill="#191919" />
                </svg>
              </div>
            </div>
          </div>

          <div class="hero-info">
            <div class="eyebrow">Selected work on rotation</div>
            <h1 id="project-title"></h1>
            <p id="project-desc" class="project-desc"></p>
            <div class="tag-row" id="project-tags"></div>
            <button type="button" id="project-link-btn" class="primary-link">
              View project
            </button>

            <div class="playlist">
              <div class="playlist-label">Now spinning</div>
              <ul class="playlist-list" id="playlist"></ul>
            </div>
          </div>
        </div>
      </section>

      <section class="view" data-view="about">
        <div class="about-layout">
          <div class="about-card">
            <div class="about-initials">${about.initials}</div>
          </div>
          <div class="about-copy">
            <div class="eyebrow">About</div>
            <h2>${about.headline.replace(/\n/g, '<br>')}</h2>
            ${about.bio.map(p => `<p>${p}</p>`).join('')}
            <div class="skills-label">Tools & technologies</div>
            <div class="skills-row">
              ${about.skills.map(s => `<span class="chip">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      </section>
    </main>

    <div class="project-modal" id="project-modal" aria-hidden="true">
      <div class="project-modal-backdrop" id="project-modal-backdrop"></div>
      <div class="project-modal-panel" id="project-modal-panel">
        <button type="button" class="project-modal-close" id="project-modal-close" aria-label="Close">×</button>
        <div class="project-modal-accent" id="project-modal-accent"></div>
        <div class="project-modal-content">
          <div class="project-modal-images" id="project-modal-images"></div>
          <div class="project-modal-eyebrow" id="project-modal-sub"></div>
          <h2 class="project-modal-title" id="project-modal-title"></h2>
          <div class="project-modal-body" id="project-modal-body"></div>
          <div class="project-modal-tags" id="project-modal-tags"></div>
          <div class="project-modal-links" id="project-modal-links"></div>
        </div>
      </div>
    </div>
  </div>
`

// Simple view switching
document.querySelectorAll('.nav-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target
    document.querySelectorAll('.nav-pill').forEach(b => b.classList.toggle('nav-pill--active', b === btn))
    document.querySelectorAll('.view').forEach(v => {
      v.classList.toggle('view--active', v.dataset.view === target)
    })
  })
})

// Record player interactions
let currentProjectIndex = 0
const titleEl   = document.getElementById('project-title')
const descEl    = document.getElementById('project-desc')
const tagsEl    = document.getElementById('project-tags')
const labelEl   = document.getElementById('disc-label')
const armEl     = document.getElementById('tonearm')
const listEl    = document.getElementById('playlist')
const modal     = document.getElementById('project-modal')
const modalBackdrop = document.getElementById('project-modal-backdrop')
const modalClose    = document.getElementById('project-modal-close')
const modalAccent   = document.getElementById('project-modal-accent')
const modalImages   = document.getElementById('project-modal-images')
const modalSub      = document.getElementById('project-modal-sub')
const modalTitle    = document.getElementById('project-modal-title')
const modalBody     = document.getElementById('project-modal-body')
const modalTags     = document.getElementById('project-modal-tags')
const modalLinks    = document.getElementById('project-modal-links')

function renderPlaylist() {
  projects.forEach((p, index) => {
    const li = document.createElement('li')
    li.className = 'playlist-item'
    li.dataset.index = index
    li.innerHTML = `
      <span class="track-num">${String(p.id).padStart(2, '0')}</span>
      <span class="track-meta">
        <span class="track-title">${p.title}</span>
        <span class="track-sub">${p.sub}</span>
      </span>
    `
    li.addEventListener('click', () => setCurrent(index))
    listEl.appendChild(li)
  })
}

function setCurrent(index) {
  const p = projects[index]
  if (!p) return
  currentProjectIndex = index

  // text
  titleEl.textContent = p.title
  descEl.textContent  = p.desc

  // tags
  tagsEl.innerHTML = ''
  p.tags.forEach(tag => {
    const span = document.createElement('span')
    span.className = 'chip'
    span.textContent = tag
    tagsEl.appendChild(span)
  })

  // label colour
  labelEl.style.setProperty('--label-from', p.colors[0])
  labelEl.style.setProperty('--label-to', p.colors[1])

  // playlist active state
  document.querySelectorAll('.playlist-item').forEach(item => {
    item.classList.toggle('is-active', Number(item.dataset.index) === index)
  })

  // motion
  labelEl.classList.remove('is-spinning')
  armEl.classList.remove('is-playing')
  void labelEl.offsetWidth
  labelEl.classList.add('is-spinning')
  requestAnimationFrame(() => armEl.classList.add('is-playing'))
}

function openProjectModal() {
  const p = projects[currentProjectIndex]
  if (!p) return
  const d = p.detail || {}

  modalAccent.style.background = `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`
  modalSub.textContent = p.sub
  modalTitle.textContent = p.title

  // Images: use images[] if present, else single image
  const imgList = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : [])
  if (imgList.length) {
    modalImages.innerHTML = imgList.map(src => `<img src="${src}" alt="" loading="lazy" />`).join('')
    modalImages.classList.add('has-images')
  } else {
    modalImages.innerHTML = ''
    modalImages.classList.remove('has-images')
  }

  let bodyHTML = ''
  if (d.overview && d.overview.length) {
    d.overview.forEach(para => { bodyHTML += `<p>${para}</p>` })
  } else {
    bodyHTML = `<p>${p.desc}</p>`
  }
  if (d.role) bodyHTML += `<p class="project-detail-meta"><strong>Role</strong> ${d.role}</p>`
  if (d.timeline) bodyHTML += `<p class="project-detail-meta"><strong>Timeline</strong> ${d.timeline}</p>`
  if (d.outcomes && d.outcomes.length) {
    bodyHTML += '<p class="project-detail-meta"><strong>Outcomes</strong></p><ul class="project-detail-list">'
    d.outcomes.forEach(item => { bodyHTML += `<li>${item}</li>` })
    bodyHTML += '</ul>'
  }
  modalBody.innerHTML = bodyHTML

  modalTags.innerHTML = ''
  p.tags.forEach(tag => {
    const span = document.createElement('span')
    span.className = 'chip'
    span.textContent = tag
    modalTags.appendChild(span)
  })

  // Links: GitHub + live link
  const links = []
  if (p.github) links.push({ href: p.github, label: 'GitHub', icon: '↗' })
  if (p.link && p.link !== '#') links.push({ href: p.link, label: 'View live', icon: '↗' })
  if (links.length) {
    modalLinks.innerHTML = links.map(l => `<a href="${l.href}" target="_blank" rel="noreferrer" class="project-link">${l.label} ${l.icon}</a>`).join('')
    modalLinks.classList.add('has-links')
  } else {
    modalLinks.innerHTML = ''
    modalLinks.classList.remove('has-links')
  }

  modal.setAttribute('aria-hidden', 'false')
  modal.classList.add('is-open')
  document.body.style.overflow = 'hidden'
}

function closeProjectModal() {
  modal.setAttribute('aria-hidden', 'true')
  modal.classList.remove('is-open')
  document.body.style.overflow = ''
}

document.getElementById('project-link-btn').addEventListener('click', openProjectModal)
modalBackdrop.addEventListener('click', closeProjectModal)
modalClose.addEventListener('click', closeProjectModal)
modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectModal() })

renderPlaylist()
setCurrent(0)