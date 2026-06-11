# Plan: Bilingual Daily Reports Blog (blog.arcueidshiki.uk) + Resume Update

Date: 2026-06-11. Executed via subagent-driven development (implementer → spec review → quality review per task). TDD throughout.

## Goals

1. **reports repo** (`/Users/arcueidpeng/github/reports`, remote `git@github.com:ArcueidShiki/reports.git`):
   a React + TypeScript SPA, EN/中文 switchable, five content sections fed by a local ingest
   pipeline, animated with framer-motion + three.js + Remotion Player, deployed as Cloudflare
   Worker static assets at `blog.arcueidshiki.uk`.
2. **bpcv repo** (`/Users/arcueidpeng/github/bpcv`, remote `https://github.com/ArcueidShiki/bpcv`):
   update `cv2.html` — Reports button under the Wuwa Paint button, new skills, new recent
   project (Financial Budget Management System), in all three language dictionaries (en/jp/zh).
   The blog footer links back to the resume at `https://bpcv.arcueidshiki.uk`.

## Content sources (scouted 2026-06-11)

| Section | Source | Shape |
|---|---|---|
| Product Analytics | `/Users/arcueidpeng/github/product-analytics/raw/<YYYY-MM-DD>/` | `products-analysis.json` (`{scrape_date, note, products:[{name, category, url, ph, business_model, success_factors,...}]}`), plus `sources-raw.json` / `raw-data.json` |
| US Market Daily | `/Users/arcueidpeng/github/stay-in-the-market/daily-reports/2026/<MM>/` | Bilingual `.md` pairs per date (EN slug + 中文 slug), some `.html` cards (小红书卡片). **Exclude** `.srt`, `.sh` (and the huge `tts/`, `video/` dirs — 6.4 GB total, only md/html copied) |
| Alpha Factors | `/Users/arcueidpeng/github/stay-in-the-market/alpha-factors/` | `README.md`, `technical/technical-factors.md`, `fundamental/value-factors.md`, `sentiment/sentiment-factors.md` |
| Signal Calendar | `/Users/arcueidpeng/github/signal-calendar/reports/<YYYY-MM-DD>/` | `report_<date>.pdf`, `signals_<date>.md` (GFM table), `signals_<date>.csv`, `calendar_<date>.json`, `poster_*.png`, optional `sources/` (FRED chart PNGs, `official_<date>.json`, `provenance_<date>.md`) |
| Daily Art Gallery | `/Users/arcueidpeng/comfyui/output/` | 54 PNGs (~57 MB) |

## Architecture

- Vite 6 + React 18 + TypeScript, vitest + jsdom + @testing-library/react.
- Deps: `react-router-dom`, `framer-motion`, `three` + `@react-three/fiber`,
  `@remotion/player` + `remotion`, `react-markdown` + `remark-gfm`.
- i18n: small `LanguageContext` (en/zh), dictionaries in `src/i18n/`, localStorage persistence.
- Ingest: `scripts/ingest.mjs` + pure TDD'd helpers in `scripts/lib/` reading
  `ingest.config.json` (holds the absolute source paths — no paths hardcoded in code),
  copying into `public/content/{products,market,alpha,signals,gallery}/` and emitting
  `public/content/manifest.json`. Missing source dir ⇒ warn and skip, never crash.
  `public/content/` is committed (the deploy is static).
- Routes: `/` home, `/products`, `/market`, `/alpha`, `/signals`, `/gallery`.
- Chinese filenames must be `encodeURIComponent`-ed when fetched.
- Cloudflare: `wrangler.jsonc` `{ name: "blog", assets: { directory: "./dist",
  not_found_handling: "single-page-application" }, routes: [{ pattern:
  "blog.arcueidshiki.uk", custom_domain: true }] }`. Wrangler is NOT logged in on this
  machine ⇒ deploy is `npx wrangler login && npm run deploy` (documented in README);
  attempt deploy anyway and report the outcome.

## Tasks

### R1 — Scaffold
package.json (scripts: dev/build/preview/test/ingest/deploy), tsconfig, vite + vitest config
(jsdom for `src/**`, node env for `scripts/**` tests), index.html, `src/main.tsx`,
`src/App.tsx` shell, wrangler.jsonc, .gitignore (node_modules, dist — NOT public/content),
this plan committed. TDD smoke test (App renders heading). `npm test` + `npm run build` green.

### R2 — Ingest pipeline (TDD)
Pure helpers: `parseDateFromName`, `detectLang` (CJK regex), `classifyMarketFile`
(exclude srt/sh), per-section manifest builders. Then the I/O orchestrator. Run it;
verify manifest lists all five sections with the scouted dates.

### R3 — i18n + layout
LanguageContext (TDD: default, toggle, persistence, missing-key fallback), Nav (6 links +
language toggle), Footer (GitHub `https://github.com/ArcueidShiki`, email
`mailto:pjtpengjingtong@gmail.com`, Resume → `https://bpcv.arcueidshiki.uk` labelled
Resume/简历), lazy routes with placeholders.

### R4 — Section pages
`useManifest` hook (validated fetch, friendly error/loading states), DateSelector,
MarkdownView. Products: cards from `products-analysis.json` (defensive shape validation).
Market: language-aware md (current site language first, fallback to the other), html cards in
sandboxed iframe. Alpha: tabbed md docs. Signals: PDF iframe + md table + poster/sources image
grid + provenance + csv/json download links. Gallery: framer-motion grid + lightbox modal.
Component tests with mocked fetch.

### R5 — Home
R3F starfield hero (lazy, proper dispose), Remotion Player intro (animated title + date,
springs), framer-motion staggered section cards + AnimatePresence page transitions,
`prefers-reduced-motion` respected. Tests mock the heavy canvas pieces.

### R6 — Finalize reports repo
Fresh ingest → full `npm test` → `npm run build` → `vite preview` smoke (curl `/` and
`/content/manifest.json`). Bilingual README (run, ingest, deploy). Conventional commits,
push `origin main` (SSH auth verified).

### B1 — bpcv resume (parallel with R1–R6)
In `cv2.html`: add `<a href="https://blog.arcueidshiki.uk" class="ui-btn" id="reportsBtn">📊 Reports</a>`
immediately after `paintBtn` (the 🎮 Wuwa Paint button, ~line 351). The page renders from
per-language data dictionaries (en/jp/zh) via `renderSkills(d)` / `renderProjects(d)` —
add to **all three**: skills *Claude Code · MCP · Agent Skills*, *ComfyUI*, *Product
Analytics*; recent project *Financial Budget Management System / 财务预算管理系统 /
財務予算管理システム* (first in list, short per-language description). Verify by serving
locally and checking the rendered DOM in each language. Conventional commit, push
`origin main` (HTTPS + osxkeychain).

## Verification gates
Every task: tests written first and observed failing, then green; spec review must pass
before quality review; no task complete with failing tests.
