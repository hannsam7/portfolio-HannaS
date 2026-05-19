# portfolio-HannaS

Personal portfolio for **Hanna Samborska** — projects from NTNU studies and client work. A minimal, fabric-and-thread themed site built with React and Vite.

**Live site:** configure GitHub Pages (see [Deploy](#deploy-to-github-pages)) or run locally.

---

## Tech stack

| Layer | Tools |
|--------|--------|
| UI | React 19, Framer Motion |
| Styling | Tailwind CSS 3 |
| Build | Vite 5 |
| Deploy | `gh-pages` (static build) |

---

## Getting started

All commands run from the `portfolio/` folder:

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
npm run deploy   # build + push to gh-pages branch
```

---

## Project structure

```
portfolio-HannaS/
├── README.md                 # this file
└── portfolio/                # Vite app root
    ├── public/
    │   └── images/projects/  # project screenshots
    ├── src/
    │   ├── App.jsx           # page layout: hero, project list, modal
    │   ├── data/
    │   │   └── projectData.js   # ← edit copy, projects, contact here
    │   ├── components/       # UI pieces (modal, footer, cursor, frames)
    │   ├── hooks/            # scroll tension for stitched titles
    │   └── index.css         # global styles, animations, CRT overlay
    ├── vite.config.js
    └── package.json
```

---

## Editing content

**Most changes only require** `portfolio/src/data/projectData.js`:

| Export | Purpose |
|--------|---------|
| `heroAbout` | About paragraphs on the home section (array of strings) |
| `projectsIntro` | Short text above the project list |
| `projectData` | All projects: titles, descriptions, tags, images, links |
| `footerContact` | Name, email, GitHub / LinkedIn |

### Adding or updating a project

Each item in `projectData` supports:

- `id` — unique key (used in URLs/keys)
- `title`, `subtitle` — shown in list and modal
- `description` — array of paragraphs in the modal
- `tags` — technology labels
- `images` — paths under `public/`, e.g. `['/images/projects/my-shot.png']`
- `video` — optional `{ src, poster }` or `null`
- `links` — `{ label, href }`; empty `href` or `#` hides the link
- `detail` — optional `role`, `timeline`, `outcomes[]`

Put screenshots in `portfolio/public/images/projects/`.

### Contact & links

Update `footerContact.email` and `socials` in the same file. The footer shows a mirrored embroidered name plus mailto and social links.

---

## Deploy to GitHub Pages

**Live domain:** [https://hannasamborska.no](https://hannasamborska.no)

From `portfolio/`:

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the **`gh-pages`** branch.

### GitHub repository settings

1. Open [github.com/hannsam7/portfolio-HannaS/settings/pages](https://github.com/hannsam7/portfolio-HannaS/settings/pages)
2. **Build and deployment → Source:** Deploy from branch **`gh-pages`** / **`/` (root)**
3. **Custom domain:** enter `hannasamborska.no` and save
4. When DNS has propagated, enable **Enforce HTTPS**

The file `portfolio/public/CNAME` tells GitHub Pages which domain to use (copied into each build).

### DNS at your domain registrar (hannasamborska.no)

Add these records where you manage the domain (e.g. Domeneshop, Cloudflare, One.com):

| Type | Host / name | Value |
|------|-------------|--------|
| **A** | `@` (apex / root) | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **CNAME** | `www` | `hannsam7.github.io` |

Optional IPv6 (AAAA) for `@`:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

DNS can take from a few minutes up to 48 hours. GitHub will show **DNS check successful** on the Pages settings page when it works.

**Tip:** If you use Cloudflare, set SSL mode to **Full** (not “Flexible”) once HTTPS is enabled on GitHub.

---

## Design notes

- **Stitched titles** — per-letter reveal on scroll; opens project modal on click.
- **Frayed frames** — decorative thread border around images; threads react to cursor proximity.
- **Needle cursor** — custom cursor + thread trail (disabled when `prefers-reduced-motion` is on).
- **Messy backside footer** — mirrored name with SVG “stitch” paths and hand-tagged contact links.

Fonts: display face `Home Sweet Home` (bundled in `src/assets/fonts/`), body `Inter` via CSS.

---

## License

Personal portfolio — © Hanna Samborska. Project code in this repo is for portfolio use unless otherwise noted.
