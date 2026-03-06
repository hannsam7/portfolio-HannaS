/**
 * pages/about.js
 * Renders the About Me view into #view-about.
 */

import { about } from '../data/projects.js'

export function initAboutPage() {
  const container = document.getElementById('view-about')

  // ── Portrait ──
  const portraitInner = about.photo
    ? `<img src="${about.photo}" alt="Portrait of ${about.initials}" />`
    : `<div class="portrait-art"><div class="portrait-initials">${about.initials}</div></div>`

  // ── Bio paragraphs ──
  const bioParagraphs = about.bio
    .map(p => `<p>${p}</p>`)
    .join('')

  // ── Contact rows ──
  const { email, location, github, linkedin, resume } = about.contact
  const contactRows = [
    { label: 'Email',    html: `<a href="mailto:${email}">${email}</a>` },
    { label: 'Based',    html: `<span>${location}</span>` },
    { label: 'GitHub',   html: `<a href="https://${github}" target="_blank">${github}</a>` },
    { label: 'LinkedIn', html: `<a href="https://${linkedin}" target="_blank">${linkedin}</a>` },
    { label: 'Resume',   html: `<a href="${resume}" target="_blank">Download PDF</a>` },
  ].map(r => `
    <li>
      <span class="c-label">${r.label}</span>
      ${r.html}
    </li>
  `).join('')

  // ── Headline (supports literal \n for line breaks) ──
  const headlineHTML = about.headline
    .split('\n')
    .join('<br>')

  container.innerHTML = `
    <div class="about-page">

      <div class="about-left">
        <div class="portrait-frame">
          ${portraitInner}
        </div>
        <ul class="contact-list">
          ${contactRows}
        </ul>
      </div>

      <div class="about-right">
        <div class="about-eyebrow">About me</div>
        <h2>${headlineHTML}</h2>
        ${bioParagraphs}
        <div class="skills-label">Tools &amp; Technologies</div>
        <div class="skills-grid" id="skills-grid"></div>
        <div class="currently">
          <div class="currently-mini-disc"></div>
          <div class="currently-text">
            <div class="now">Currently listening to</div>
            <div class="track">${about.currentlyListening}</div>
          </div>
        </div>
      </div>

    </div>
  `

  // ── Skills chips (injected after innerHTML so #skills-grid exists) ──
  const grid = document.getElementById('skills-grid')
  about.skills.forEach(skill => {
    const chip = document.createElement('div')
    chip.className   = 'skill-chip'
    chip.textContent = skill
    grid.appendChild(chip)
  })
}