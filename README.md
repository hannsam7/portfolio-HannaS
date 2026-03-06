# portfolio-HannaS
My personal portfolio to showcase projects through out my studies at NTNU

# Portfolio

Vinyl record player portfolio site. Built with vanilla JS + Vite.

## Getting started

```bash
npm install
npm run dev        # localhost:5173
```

## Editing your content

Everything you need to update lives in one file:

```
src/data/projects.js
```

- Add/remove projects by editing the `projects` array
- Update bio, skills, and contact info in the `about` object
- Swap your photo by setting `about.photo` to an image path in `/public/`

## Deploying to GitHub Pages

1. Set `base` in `vite.config.js` to match your repo name:
   ```js
   base: '/your-repo-name/'
   ```
2. Run:
   ```bash
   npm run deploy
   ```
3. In your GitHub repo → Settings → Pages → set source to `gh-pages` branch.

Your site will be live at `https://yourusername.github.io/your-repo-name/`

## Self-hosting fonts

See `public/fonts/README.md` for instructions on removing the
Google Fonts dependency.