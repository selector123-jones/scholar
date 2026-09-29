# Scholaa — responsive scholarship platform

A React + Vite scholarship platform, responsive from 360px phones up to wide
desktops. Real client-side routing, a public site, and an admin-only news
editor.

## Run it

```bash
cd react-app
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build (needs a build first)
```

## Branding

- **The logo** is the supplied `IMG-20260927-WA0000.jpg`, processed by
  `tools/make-logo.mjs`. The source is a square image with a lot of empty navy
  padding, so the script auto-trims to the wordmark and emits:
  - `src/assets/logo-navy.png` — navy wordmark, transparent (light backgrounds)
  - `src/assets/logo-white.png` — white wordmark, transparent (dark backgrounds)
  - `public/favicon.png` — 64px navy tile with the cap monogram

  Recolouring works because the source is one flat colour plus white type, so
  alpha is derived from each pixel's distance from the background. Outputs are
  downscaled to 480px wide (the logo only ever renders ~26px tall). Re-run
  `node tools/make-logo.mjs` after replacing the source image.
- **Previous branding removed.** No old logo, site name, social profiles,
  partner subdomains or externally hosted images remain. Card covers and hero
  backdrops are generated as inline SVG, so the app has no runtime dependency
  on any other host.
- **Original colour palette kept** — `--blue #0E77C2`, `--navy #083352`,
  `--gold #FDC713`.

## Contact details

Set in one place, `src/data/site.js`:

| Channel | Value |
| --- | --- |
| Phone | `0785282974` |
| Instagram | [@scholaa1](https://www.instagram.com/scholaa1/) |
| Email | `scholars250@gmail.com` |

Every "get in touch" button builds a `mailto:` link with the relevant message
pre-filled via the `contactLink()` helper — swap that helper for a form
endpoint if you prefer. Instagram appears in the top bar, mobile drawer,
contact page, footer, floating buttons, and a dedicated follow panel on the
home page.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, stats, scholarships, news, CTA, stories, Instagram, why-us |
| `/applications` | All applications: search, level filter, detail dialog |
| `/courses` | Courses with expandable outcomes |
| `/services` | Success stories slider |
| `/about` | About, four-step process, stats |
| `/contact` | Contact channels + working message form |
| `/faq` | FAQ accordion |
| `/login`, `/signup` | Auth screens (demo — wire to your own endpoint) |
| `/admin` | **Admin only** — news editor |
| `*` | 404 |

## Admin area (`/admin`)

Add, edit and delete news announcements. Reachable from **Admin** in the
footer — deliberately kept out of the main navigation.

Each announcement carries the five requested fields:

| Field | Type |
| --- | --- |
| `country` | select, 18 options |
| `university` | free text |
| `year` | select (2026–2029) |
| `upload` | image file, resized on upload |
| `text` | long text (minimum 20 characters) |

Plus a headline, a "Featured" toggle, and an automatic date.

**Storage.** There is no backend, so entries go to `localStorage`, layered over
the seed list in `src/data/news.js`. Uploads are downscaled to 1000px and
re-encoded as JPEG (~0.78 quality) so a realistic number of entries fits the
browser quota. If storage fills up you get a readable error rather than a
silent failure.

**Security.** Sign-in is a front-end flag only — *any non-empty key unlocks the
editor for that tab*. It is not real authorisation. Move it behind a server
before putting this on the public internet.

**Going live.** `src/store/newsStore.js` is the only module the UI depends on.
Replace its five functions with `fetch` calls and everything else keeps
working:

```js
listNews()             // -> Promise<News[]>
createNews(item)       // -> Promise<News>
updateNews(id, patch)  // -> Promise<News>
deleteNews(id)         // -> Promise<void>
resetNews()            // -> Promise<void>
```

"Reset" in the toolbar restores the shipped list; "Sign out" ends the session.

## Responsive behaviour

Mobile-first CSS. Breakpoints at 480px, 768px, 992px, 1200px.

- Below 992px the desktop menu collapses to a slide-in drawer; the top bar
  (date + contact shortcuts) hides below 768px and is mirrored in the drawer.
- On phones the scholarship listings come *before* the contact sidebar —
  support content should not lead a page someone landed on for listings.
- Card grids step 1 → 2 → 3 columns; the sidebar becomes sticky at 992px.
- The stats strip overlaps the hero on wide screens, stacks 2×2 on phones.
- Buttons go full width under 480px; card footers stack; the admin form
  columns collapse; no horizontal scroll at any width (audited at 360px).
- Fluid type throughout via `clamp()`.

## Structure

```
react-app/
├── index.html
└── src/
    ├── main.jsx                 router + app entry
    ├── App.jsx                  route table, layout, page titles
    ├── styles.css               all styling (mobile-first)
    ├── data/
    │   ├── site.js              content, brand config, SVG generators, icons
    │   └── news.js              seed announcements + form field definitions
    ├── store/newsStore.js       CRUD persistence + image downscaling
    ├── hooks/useUi.js           reveal, scroll, body-lock, first-visit
    ├── components/
    │   ├── Header.jsx           top bar, desktop nav, mobile drawer
    │   ├── Hero.jsx             hero carousel + stats strip
    │   ├── Scholarships.jsx     card grid, sidebar, detail dialog
    │   ├── NewsFeed.jsx         announcements grid + Instagram panel
    │   ├── Testimonials.jsx     story slider (autoplay, swipe, keyboard)
    │   ├── Sections.jsx         CTA band, why-us, footer
    │   ├── Floaties.jsx         email, call and back-to-top buttons
    │   ├── Modal.jsx            accessible dialog shell
    │   └── Bits.jsx             icon, logo, reveal/link helpers
    └── pages/
        ├── Home.jsx        Applications.jsx  Courses.jsx  Faq.jsx
        ├── AboutContact.jsx               Auth.jsx
        └── Admin.jsx
```

## Verification

Two headless scripts drive real Chrome against the production build:

```bash
# 11 routes × 7 viewports: overflow, escapes, console errors, broken images,
# h1 count, logo presence, contact values, nav mode
node audit.mjs

# admin CRUD end to end: sign in, validate, upload, create, verify on the
# public page, edit, delete, plus a 390px pass
node audit-admin.mjs
```

Screenshots land in `audit-shots/`. Override the target with
`AUDIT_BASE=http://localhost:5173`.

## Accessibility

- Skip link, labelled landmarks, `aria-current` on active nav items.
- Dialogs lock scroll, close on Escape and on backdrop click.
- Keyboard support on the story slider; focus pauses autoplay.
- `prefers-reduced-motion` disables reveals, carousel drift and animation.
- News feed and admin list are real lists, not clickable divs.

## Before deploying

Client-side routing needs a server rewrite so unknown paths fall back to
`index.html`. Included: `public/_redirects` (Netlify) and `vercel.json`. For
nginx use `try_files $uri $uri/ /index.html;`.

The newsletter and contact forms are front-end only — wire them to an endpoint.
