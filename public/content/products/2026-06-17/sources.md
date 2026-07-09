# Raw Research Data — 2026-06-17

Method: WebSearch + web_fetch over public sources. X / LinkedIn / Xiaohongshu are login-gated or client-rendered → used WebSearch public summaries (per task methodology). Product Hunt daily/weekly **featured** data freshest available = **Week 24 (Jun 8–14)**; W25 (Jun 15–21) not yet compiled ("No posts"), daily Jun 15+ not live ("come back in 0 days"). So today's picks deliberately differ from the 06-16 report (which used Bond / Publora / Honen / VC Boom / Asmi / TypingMind) by pulling **untapped W24 products + HN launches + a16z/HN theses + e-commerce/Xiaohongshu**.

---

## 1. Product Hunt — Week of June 8, 2026 (W24, latest live featured board)
Source: https://www.producthunt.com/leaderboard/weekly/2026/24

Full top list (votes / comments):
1. Bond — The AI to-do list that does itself — 682 / 184 *(covered 06-16)*
2. Publora — A publishing API for agents to post on 10 social platforms — 621 / 112 *(covered 06-16)*
3. Honen — Automated teaching + learning infrastructure for any company — 538 / 118 *(covered 06-16)*
4. VC Boom — Score your deck, meet investors who fit, raise more — 509 / 69 *(covered 06-16)*
5. **Browse.sh (Browserbase)** — Give your agents muscle memory for automating the web — **482 / 51** ← PICK
6. Asmi AI — AI that handles your personal chores in the real world — 476 / 145 *(covered 06-16)*
7. TypingMind — Pay per use, no subscription, 18 model providers — 463 / 46 *(covered 06-16)*
8. Respan Gateway (Keywords AI) — One AI gateway with built-in observability and evals — 446 / 52
9. Vercel Drop — Drop it. It's live. — 426 / 16
10. Spotlight by Backplanes — Session reports for Claude Code & Codex — 422 / 111
11. Terminal Mode by Even Realities — Keep coding agents always in sight — 411 / 92
12. Journey Now — Learning copilot for human ambition — 410 / 88
13. Slashspace AI — Canvas-first AI experience for complex work — 379 / 60
14. **Firma.dev** — E-signatures API averaging ~3¢ per envelope — **362 / 43** ← PICK
15. **Vaani** — Lip-synced AI dubbing for creators, brands and studios — **355 / 28** ← PICK
16. ZeroGPU — Compute-efficient layer for AI inference — 351 / 44
17. Slashy — The AI assistant that does email for you — 332 / 102

PH logo/image URLs (imgix, embeddable in HTML):
- Browse.sh: https://ph-files.imgix.net/1b8154c7-3bd8-4972-b306-df4e53b04bb0.png
- Firma.dev: https://ph-files.imgix.net/741ce787-5548-4b55-b7e4-679665893bfc.png
- Vaani: https://ph-files.imgix.net/d0b1de46-abed-4cff-943a-80268107368b.gif
- Wispr Flow banner: https://ph-files.imgix.net/621d030b-3414-4fd8-a8fe-feed3b12d5e7.png

PH trending products (sidebar): Lovable, Screen Studio, bolt.new, Wispr Flow, Framer, Replit, Vapi, Granola.
PH forum signal: "Cursor or Claude Code?"; "How Wispr Flow found PMF through a pivot"; YC P26 application deadline.

## 2. Browse.sh / Browserbase (PICK)
Sources: PitchBook, geo.sig.ai, browserbase.com/pricing, firecrawl best-browser-agents
- Cloud platform to host/run/monitor headless browsers at scale; "infrastructure for AI agents, automation, web scraping."
- Funding: Series B $40M at $300M valuation (Jun 2025); total raised ~$67M (~$300M val).
- Traction: 50M sessions in 2025 across 1,000+ customers incl. **Perplexity, Vercel**. Founded 2024, SF.
- Pricing: Free / Developer $20/mo / Startup $99/mo / custom Scale (enterprise). Per-session (browser-minutes) billing.
- PH W24 #5: 482 upvotes / 51 comments. URL: https://www.producthunt.com/products/browserbase ; https://www.browserbase.com/
- Context: Chrome WebMCP standard (89% token savings) reshaping agent-browser infra; competes w/ Hyperbrowser, Scrapfly.

## 3. Wispr Flow (PICK — PH trending; "found PMF via pivot")
Sources: getlatka, weesperneonflow, droidcrunch, spokenly, getvoibe, bossai
- Mac/desktop dictation: speak naturally, writes in your style in every app; 100+ languages; voice editing.
- Revenue/val: 2025 ~**$10M ARR**; reportedly raising ~**$260M at ~$2B valuation** (Menlo Ventures) — ~3× the $700M val from 6 months earlier. Total prior funding ~$30M.
- Adoption: **270 Fortune 500** incl. **Nvidia, Amazon**.
- Pricing: Pro **$15/mo** ($12 annual); free tier 2,000 words/week (~<300/day).
- Sentiment: **2.7/5 Trustpilot** (Apr 2026) — privacy concern: captures **screenshots** of screen to power AI features. Praised for smoothness, voice editing, multilingual.
- URL: https://www.producthunt.com/products/wisprflow ; https://wisprflow.ai/

## 4. Firma.dev (PICK)
Sources: producthunt.com/products/firma-dev, firma.dev, docs.firma.dev
- E-signature **API** at **€/$0.029 (~3¢) per envelope** — ~**99% cheaper than DocuSign**. Developer-first; clean REST API; embeddable template + signing editors; integrate in hours; free sandbox (real docs, unlimited) before paying.
- Compliance: bank-grade encryption; ESIGN, UETA, GDPR.
- Positioning: "DocuSign alternative for developers / API-first."
- PH W24 #14: 362 upvotes / 43 comments. Co-founder: Derick. URL: https://www.producthunt.com/products/firma-dev ; https://firma.dev/

## 5. Vaani (PICK)
Source: producthunt.com/products/vaani-2 (PH listing)
- "Lip-synced AI dubbing for creators, brands and studios." Category: Productivity / AI / Audio (AI generative media + localization).
- PH W24 #15: 355 upvotes / 28 comments. URL: https://www.producthunt.com/products/vaani-2
- (Limited public financial data — analysis scoped to category + PH signal.)

## 6. Ardent (YC P26) — Launch HN (PICK)
Source: HN front snapshot, tryardent.com
- "Launch HN: Ardent (YC P26) – Postgres sandboxes in seconds with zero migration." 87 points / 35 comments at capture.
- Theme fit: ephemeral / secure dev environments for coding agents — directly matches HN "secure dev environments became a product category."
- URL: https://www.tryardent.com/ ; HN: https://news.ycombinator.com/item?id=48124436

## 7. a16z — "Notes on AI Apps in 2026" (Anish Acharya, Jan 8 2026)
Source: https://a16z.com/notes-on-ai-apps-in-2026/
Key theses:
- **Thinking tools vs Making tools**: all knowledge-work tools today are for *execution* (IDEs, Figma, spreadsheets). The hard problem shifts from "how do I build it" → "**what do I build**." Next-gen tools are *exploration-first* (Cursor, Google Antigravity).
- **Software eats all "service" functions**: every team (legal, finance, HR, procurement) must become **software-first**. "Every team should be a software team." Enterprises can be dramatically more ambitious; "every feature that can be built will be built."
- **Compounding / "thick" AI apps**: AI-native apps diverge from models — orchestration of frontier models + domain UI + cheap-to-build feature surface ("Narrow Startups"). Apps layer NOT subsumed by models (>$1B new coding-startup revenue in 2025).
- **Humans discover "the rest" of AI**: command-line UI held back consumers; Wabi, ChatGPT/Grok Images tab, Apps Directory + Skills exposing more capabilities.
- Notes for CEOs: collapse customer-facing roles (sales/support/collections) into one function; be software-first; demand more ambitious products + prices.
Related a16z articles: "The AI Job Apocalypse Is a Complete Fantasy" (David George); "Top 100 Gen AI Consumer Apps — 6th Edition" (Olivia Moore); "Humans Are for Ideas, AI Is for Execution"; "Of course they're putting ads in AI" (Bryan Kim); "Software's YouTube Moment is Happening Now."

## 8. Hacker News — June 2026 trends (STARTUP EDITION)
Source: https://blog.mean.ceo/hacker-news-trends-june-2026/ (Jun 4 2026) + HN front snapshot
- **Mood shift: wonder → inspection.** Market is "trying to discipline AI," not falling out of love with it.
- **Trust/security becomes the product**: AI-assisted attacks (malicious npm/PyPI packages; Chainguard blocked 99.7% of 8,783 malicious npm pkgs, ~98% of ~3,000 Python); supply-chain risk now board-level for small firms.
- **Secure dev environments = a product category** (not a side feature): governed/policy-driven workspaces for autonomous coding agents; review/approval layers; package verification; provenance.
- **Shutdown fatigue**: Gemini CLI shutdown discussion → buyers value reliability/roadmap over launch buzz; "market wants fewer toys and more dependable systems."
- Hiring threads: AI engineers, agentic dev environments, evals, RAG — "every default technical profile is more generalist + AI-literate."
- Contrarian take: "biggest 2026 opportunity is not another AI app — it's making AI *survivable* inside real workflows" (security, provenance, review, permissions, plain-language UI).
- HN front (snapshot) notable: "I moved my digital stack to Europe" (956 pts — digital sovereignty); "Leaving GitHub for Forgejo" (583); "US winning AI race where it matters: commercialization" (203); Starship V3; MacBook Neo (8GB debate); Kickstarter forced to ban adult content by payment processors (payment-rail power).

## 9. Agent-economy / picks-and-shovels macro
Sources: ainvest, primitivesai substack, vccafe, stackone, presta, mindstudio
- AI agent market: ~$7.84B (2025) → ~$52.62B (2030), ~46.3% CAGR (one est.); enterprise agentic ~$2.6B (2024) → >$24B (2030) (another est.). Cite as ranges.
- Hyperscaler capex >$320B guided for 2026 (picks-and-shovels at infra layer).
- Agent-infra funding signals: **Mem0 $24M Series A** (memory), **Arize $70M Series C** & **Braintrust $80M Series B** (observability/evals); **Anthropic acq. Vercept**; **OpenAI** hosted tool-use infra.
- Pricing-model shift: agents charge by **work completed / outcome**, not per-seat. Every lab has an Agent framework (OpenAI Agents SDK, Google ADK, Anthropic Agent SDK, MS Semantic Kernel/AutoGen, HF Smolagents).

## 10. Consumer / e-commerce + Xiaohongshu (consumer-trend pick)
Sources: TikTok/Amazon trend roundups (accio, findniche, listful); Xiaohongshu 经营趋势 (woshipm, digitaling, traveldaily); Google Trends (demandsage/backlinko)
- TikTok/Amazon viral June 2026: **at-home "spa-ification"** — smart mirrors w/ lighting+BT speaker, aromatherapy diffusers, "innovative shower heads," vacuum sealers, multifunctional chargers; beauty tools, home gadgets, pet accessories; stylus pens / wireless earbuds for creators-students.
- Xiaohongshu (RED) 2026 consumer trends:
  - Skincare: **"肤感/质地" (feel/texture) discussion now outweighs "成分" (ingredients)** — on-skin experience is decision gate #1.
  - Makeup: any innovation that **lowers usage friction (wearable / foolproof "傻瓜式")** can ignite fast.
  - **Anti-aging (抗老)**: very high discussion heat but few brands deeply engaged → lowest-cost / highest-return mindshare whitespace right now.
  - Content: shallow content (short/fast) = acquisition + instant 种草; deep content = trust + conviction. Visual impact (on-face before/after) > 1,000 words; **IP co-brand / gamification** = social-spread "nuclear weapon."
  - Travel: **interest-driven** ("为一场演出赴一座城 / 为一门手艺去一个村") — experiential consumption.
- Google Trends US (June 2026): rising/breakout incl. Costco (+4,600%), "2026" topic (+1,500%), Stranger Things (+400%), YouTube (breakout 12-mo).
