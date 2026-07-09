# Raw scraped data — 2026-06-20

Method: WebSearch + web_fetch. Client-rendered/login-gated platforms (X, LinkedIn, 小红书, Sensor Tower, Product Hunt app) accessed via WebSearch public summaries. hunted.space fetched successfully for PH leaderboard. blog.mean.ceo again unparseable via web_fetch → search summaries used.

Exclusion list (covered in past 7 days, 6/13–6/19, NOT re-analyzed): Fundraisly, Wispr Flow, Mina, Leni, Sentinel/Avea, Log Cam, Bond, Asmi, SellerClaw, Astra, Publora, Terminal Mode/Even Realities, OpenClaw, Browserbase/Browse.sh, Lightfield, Vaani, Honen, Tamadoggo, VC Boom, TypingMind, Firma.dev, Ardent, Slashy, Vokal, Goldfish, Minimi, Framer 3.0, OpenCode, BlitzGraph, Copilot metered billing, Sensor Tower State of AI 2026.

---

## Product Hunt — June 2026 ranked feed (hunted.space, fetched 2026-06-19)

### #1 Artificial Intelligence (cumulative monthly votes shown — NOT single-launch upvotes)
- Fundraisly 1027 / 261 comments (excluded)
- **Upstream 609 / 238** ← FRESH, top engagement
- Goldfish 606 (excluded)
- Framer 3.0 509 (excluded)
- Honen 493 (excluded)
- VC Boom 486 (excluded)
- Minimi 485 (excluded)
- Mina 479 (excluded)
- Slashy 462 (excluded)
- Asmi 461 (excluded)

### #3 Developer Tools
- Publora 597 (excluded)
- **InsForge Backend Branching 525 / 186** ← FRESH
- Browse.sh 452 (excluded)
- Respan Gateway (Keywords AI) 441
- superlog 431
- Vercel Drop 422
- Swytchcode CLI 414
- Novu Connect 404

### #10 Marketing
- **Elentaria 580 / 97** ← FRESH (Marketing #1)
- **Honestly 490 / 130** ← FRESH (Marketing #2)
- SocialEcho 2.0 378 / 130
- AutoEdit 297

### Notable model / launch drops in feed
- Ideogram 4.0 (Design/Open Source)
- MAI-Image-2.5 (Microsoft, Design)
- Kimi K2.7 Code (Open Source)
- Google Gemma 4 12B (Open Source)
- Vercel Drop (Vercel Day, 781 launches on June 16)

---

## SELECTED PRODUCTS (raw notes)

### 1. Upstream — collaborative AI-native inbox (humans + agents)
- "The first inbox designed for humans and agents." YC company (French startup).
- Inbox where agents sort messages, draft replies in your exact voice, follow up on time, do what you ask; "email feel light, fast, fun."
- Rebuilt email infra from the ground up to support agents that read/write/organize/act — not assistants bolted onto old clients.
- MCP-compatible: connect Claude / Codex / bring-your-own agents.
- Funding: $3M pre-seed — YC, Connect Ventures, Roosh Ventures, Xavier Niel + 30+ founders/operators (Framer, Algolia, Asana, Alan, Webflow). Announced ~June 3, 2026 (GA).
- Traction: thousands tested in private beta; users cut inbox time from >1hr/day → ~15 min.
- PH: AI #2 by monthly votes (609), 238 comments — highest-engagement fresh product.
- URL: https://www.producthunt.com/products/upstream-3 · https://www.ycombinator.com/companies/upstream
- Reviews: praised for drafting "in your voice" + team transparency; email-client switching cost / trust of agent auto-actions are the usual frictions.

### 2. Elentaria — AI operator for B2B GTM
- "Your GTM: from diagnosis to execution." AI operator for B2B: analyzes your business, scores 22 channels, ships the plan that fits, learns what moved revenue → next week sharper.
- Runs channels week after week "with the judgment of a senior GTM expert"; **nothing ships without your sign-off** (human-in-the-loop).
- PH Marketing #1 (580 votes, 97 comments), launched June 3, 2026; ~1.6K followers.
- a16z-thesis fit: "AI does the work, you guarantee the outcome, customer pays for result" + "fat startup."
- URL: https://www.producthunt.com/products/elentaria
- Reviews: appeal = replaces fragmented GTM stack with one operator; skeptics question whether channel-scoring generalizes across niches.

### 3. InsForge Backend Branching — git-style branching for the whole backend
- "Git-style branching for your entire backend": spin off a branch = full isolated copy of DB, storage, auth, edge functions — for agents to experiment on without touching production.
- Part of InsForge, an AI-optimized / agent-native BaaS (public Nov 2025; 2.0 hit #1 on PH + GitHub Trending early 2026).
- PH Dev Tools #2 (525 votes, 186 comments); Open Source / GitHub categories.
- URL: https://www.producthunt.com/products/insforge-alpha · https://insforge.dev
- Reviews: devs like safe agent sandboxes (no prod blast radius); compared to Supabase branching; questions on cost of full-stack copies.

### 4. Hyper (YC P26) — "company brain" for agentic development
- Launch HN: "Company brain to power agentic development." Founders ex tools-for-thought.
- Thesis: in 2026 models are good enough; the bottleneck is **memory** — persistent, graph-backed memory of the company's decisions, taste, and which facts are stale.
- Argues MCP is structurally unable to solve it: breaks once a task spans weeks not seconds ("MCP forgets everything by lunch").
- HN: 77 upvotes, thread of engineers describing same failure modes. YC also posted "self-driving company brain."
- URL: https://news.ycombinator.com/item?id=48387095
- Reviews: resonates ("I want to build a company brain internally"); debate on graph memory vs RAG, who owns the data.

### 5. Honestly — real reviews from Reddit & YouTube when shopping online
- Surfaces real human reviews from Reddit & YouTube while you shop online (anti-"AI slop"/fake-review play).
- PH Marketing #2 (490 votes, 130 comments). Top 4 on launch day (~350+ upvotes, 40+ comments at the time); scrappy launch (no hunter/demo video, outdated branding) but strong pull = "making something people want."
- URL: https://www.producthunt.com/products/honestly
- Reviews: loved as antidote to SEO-spam/AI-generated review sites; relies on Reddit/YT data access + freshness.

---

## TRENDS (raw notes)

### 6. Image-model wave — open vs closed; text rendering is the battleground
- Microsoft **MAI-Image-2.5** (June 2, 2026): proprietary; #2 image-editing & #3 text-to-image on Arena; beats GPT-Image-1.5 & Nano Banana Pro 2K; +75 overall vs MAI-Image-2, Text Rendering +107, Cartoon/Anime/Fantasy +90. Via Azure AI Foundry / MAI Playground / OpenRouter (no downloadable checkpoint).
- **Ideogram 4.0** (June 3, 2026): frontier text-to-image, **open-weight + commercial license**, downloadable + API, enterprises can fine-tune on brand/product data; closes gap to closed frontier.
- Also: Reve 2 + Ideogram 4 = "layouts in imagegen" (latent.space). Kimi K2.7 Code, Gemma 4 12B in open-source feed.
- Sources: microsoft.ai/news, ideogram.ai/news, 3daistudio, latent.space.

### 7. Consumer — Amazon Movers & Shakers (US): boring problem-solvers + seasonal
- Electronics dominated by AirPods Pro 3 & Apple Watch Series 11.
- Surging: outdoor gear, allergy-season health, sunscreen; spring travel + (earlier) Mother's Day gifting drove waves.
- Viral "problem-solver" SKUs: mini chainsaw, sink faucet mats, microwave popcorn maker, memory-foam seat cushions, resistance paddles, chicken shredder, wasp killer, "bat wings for your cat."
- Pattern: cheap, demonstrable, solves one concrete annoyance; word-of-mouth.
- Sources: amazon.com/gp/movers-and-shakers, aol.com roundups, amzscout.

### 8. China / Xiaohongshu — interest-driven travel种草 + real "一人生活" + measurable种草
- 《2026小红书文旅兴趣出游种草指南》: interest = core travel motive; 追星/非遗/博物馆夜游 rising; "为一场演出赴一座城""为一门手艺去一个村"; niche 烟火小城/边疆秘境/海外避世海岛/非洲 Safari surfaced by interest.
- Content strategy: shallow (短平快, instant种草/拉新) + deep (中长慢, build trust/养熟/心智占领) coexist.
- Lifestyle: 独居 a long-running top topic, 近90天 2亿+ views; vibe shifted 精致vlog → 真实"一人生活".
- Measurable种草 (UVC matrix): 美赞臣 站外进店UV >120% of contract target, 新品搜索量 +300%; 八马茶业 UVC 累计站外进店UV 8万+, 130% of target.
- Sources: traveldaily.cn, woshipm.com, digitaling.com, itopmarketing.com.

---

## Throughline (today)
Yesterday (6/19) = "the metered-AI era / pay per use." Today = **"agents are good enough — the new moats are MEMORY, SAFETY/CONTROL, and TRUST/AUTHENTICITY."**
- Memory: Hyper (company brain), Elentaria (learns what moved revenue), Upstream (context-rich inbox).
- Safety/control: InsForge (branch off prod), Elentaria (nothing ships w/o sign-off), Upstream (rebuilt agent-safe infra), Ideogram (open weights = own it).
- Trust/authenticity: Honestly (real human reviews), Xiaohongshu (活人感/真实一人生活), image models racing on text rendering (usable, trustworthy output), Amazon (boring utility that just works).
