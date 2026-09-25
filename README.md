# VidyaOps Foundation — Website

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)

Official website of **VidyaOps Foundation** — a non-profit that provides free tech education, workshops, and community learning for students, freshers, and knowledge seekers.

**Live site:** https://vidyaopsfoundation.com

---

## Tech Stack

- **Framework:** Angular 18 (standalone components, signals)
- **Language:** TypeScript 5.5
- **Styling:** SCSS (saffron-themed single-page styles)
- **Forms:** Web3Forms (no backend required)
- **Deployment:** Vercel
- **Blog automation:** GitHub Actions + Gemini AI

## Project Structure

```
├── .github/
│   └── workflows/
│       └── daily-blog.yml        # Daily AI blog pipeline (06:00 UTC)
├── public/                       # Copied verbatim to build output
│   ├── assets/                   # mp3 tracks, logo, images
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-blog.js          # Blog generator (Gemini / OpenAI-compatible)
├── src/
│   ├── app/
│   │   ├── core/                 # Services (blog, music, site-content, web3forms)
│   │   │   ├── data/             # Embedded blog fallback data (auto-generated)
│   │   │   ├── models/           # TypeScript interfaces
│   │   │   └── services/
│   │   ├── features/public/pages/  # Pages: home, about, workshops, blog, contact, etc.
│   │   └── shared/               # Reusable components, layouts, pipes
│   ├── assets/
│   │   └── blog-posts.json       # Blog content (source of truth, auto-generated)
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
└── angular.json
```

## Development

```bash
npm install
npm start        # ng serve → http://localhost:4200
npm run build    # production build → dist/
```

## Blog Pipeline

Blog posts are generated automatically every day at 06:00 UTC via a GitHub Action:

1. `daily-blog.yml` runs `scripts/generate-blog.js`.
2. The generator picks the **least-recently-used topic** and a unique per-domain **angle** (5 angles per topic rotate to prevent duplicates).
3. **Gemini** (`gemini-2.5-flash`, OpenAI-compatible endpoint) writes a fresh ~1000-word post; falls back to `OPENAI_API_KEY` if `GEMINI_API_KEY` is absent.
4. Title-collision rejection + unique-slug guard prevent duplicate posts.
5. Commits to `main`; Vercel auto-deploys.

### Manual runs

From the **Actions** tab → **Daily Blog Post** → **Run workflow**, choose a mode:

| Mode | Purpose |
|------|---------|
| `daily` | Add one new post (default) |
| `regenerate-all` | Rewrite every existing post with fresh AI content |
| `dedupe` | Remove duplicate slugs/titles, keeping the first occurrence |

### Required GitHub secrets

- `GEMINI_API_KEY` (primary AI key)
- `GEMINI_MODEL` (defaults to `gemini-2.5-flash`)
- `OPENAI_API_KEY` / `OPENAI_BASE_URL` / `OPENAI_MODEL` (optional fallback)

## Feedback & Contributions

VidyaOps Foundation is community-driven. If you spot an issue or want to contribute, reach out via the contact page or open a GitHub issue.