/**
 * main.js
 * Application entry point.
 * Imports styles, initialises components, sets up routing.
 */

// ── Styles ──────────────────────────────────────────────
import './styles/base.css'
import './styles/turntable.css'
import './styles/shelf.css'
import './styles/about.css'

// ── Header styles (inlined here, small enough) ──────────
import './styles/nav.css'

// ── Components & Pages ──────────────────────────────────
import { initNav }           from './components/nav.js'
import { initPortfolioPage } from './pages/portfolio.js'
import { initAboutPage }     from './pages/about.js'

// ── Boot ────────────────────────────────────────────────
initNav()
initPortfolioPage()
initAboutPage()