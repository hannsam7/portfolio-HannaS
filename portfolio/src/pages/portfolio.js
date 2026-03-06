/**
 * pages/portfolio.js
 * Entry point for the Work/Portfolio view.
 * Initialises the turntable and the record shelf in order.
 */

import { initTurntable } from '../components/turntable.js'
import { initShelf }     from '../components/record.js'

export function initPortfolioPage() {
  initTurntable()  // renders HTML into #view-portfolio first
  initShelf()      // then populates the shelf (needs the DOM to exist)
}