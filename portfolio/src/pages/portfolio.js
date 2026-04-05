/**
 * pages/portfolio.js
 * Entry point for the Work/Portfolio view.
 * Initialises the turntable and the record shelf in order,
 * then auto-loads the first record so the arm / vinyl motion
 * is visible without the user doing anything.
 */

import { initTurntable, loadProject } from '../components/turntable.js'
import { initShelf }                  from '../components/record.js'
import { projects }                   from '../data/projects.js'

export function initPortfolioPage() {
  initTurntable()  // renders HTML into #view-portfolio first
  initShelf()      // then populates the shelf (needs the DOM to exist)

  // After both are in the DOM, softly auto-play the first record
  const firstId = projects[0]?.id
  if (firstId != null) {
    setTimeout(() => loadProject(firstId), 120)
  }
}
