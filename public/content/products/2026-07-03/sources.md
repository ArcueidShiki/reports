# Raw scraped data — 2026-07-03

> Method: WebSearch + web_fetch of public content. Sensor Tower / X / LinkedIn / Xiaohongshu / Product Hunt are often login-gated or client-rendered, so public search summaries, press releases, and news coverage were used as substitutes. Products already deep-analyzed 6/12–7/02 were excluded to keep the day fresh (BrowserAct, Skybridge, AgentX, Propane, Upstream, Framer 3.0, Wispr Flow, Fundraisly, Slashy, Vokal, Goldfish, Minimi, birding/鸟门, Sibyl, World Model MCP, DAG determinism agent, mixfox, HackerNows, World Cup blokecore, Xiaohongshu "precise value").

## Selected trends (7)
1. Cursor for iOS — mobile coding agents (DEV)
2. Z-Jail + agent sandboxing wave (DEV / infra-security)
3. AI-assistant race — Claude's enterprise surge (APPS / macro)
4. Fibermaxxing — fiber wellness supercycle (CONSUMER health)
5. Owala — "status hydration" (CONSUMER goods)
6. 嗜酸星人 / 果醋 fruit-vinegar drinks — China (CONSUMER food)
7. Summer-flavor & spritz wave — black sesame, Hugo spritz (CONSUMER food / global)

---

## 1. Hacker News — Show HN (July 2, 2026)
- PMB — local memory for coding agents that shows if it's used (pmbai.dev)
- GolemUI — Declarative Form Engine (golemui.com)
- Searchable directory of 22k+ products from worker-owned co-ops (workerowned.info)
- **Z-Jail** — 130 KB Linux sandbox in C99 with 7 defense layers, zero deps
- QR code renderer in a TrueType font (qr.jim.sh)
- CLI tool for detecting non-exact code duplication with embedding models
- Source: https://news.ycombinator.com/front , https://news.ycombinator.com/show

## 2. Product Hunt (July 2026)
- **Cursor for iOS** — Build with coding agents from anywhere: https://www.producthunt.com/products/cursor-for-ios
- Acti — agentic keyboard for mobile commands and search
- Marked 3 — Markdown preview / writing to LLMs
- Wispr Flow (excluded — covered previously)
- Framer — Agents on the canvas (excluded — covered previously)
- Source: https://www.producthunt.com/leaderboard/daily/2026/7/1

## 3. Cursor for iOS — detail
- Added to June 29, 2026 changelog; native iOS app in public beta.
- Launch always-on cloud agents, or remote-control agents running on your computer from your phone.
- Voice input + slash commands; inspect UI screenshots, read error logs, view code diffs, annotate screenshots, open/merge PRs from the app.
- Available now in public beta on all paid plans. 75% off Composer 2.5 runs in the mobile app through July 5, 2026.
- Framing (press): "coding has become a job you supervise, not a desk you sit at."
- Sources: https://cursor.com/blog/ios-mobile-app ; https://techcrunch.com/2026/06/29/cursor-now-has-a-mobile-app-for-guiding-your-coding-agent-on-the-go/ ; https://thenextweb.com/news/cursor-mobile-app-coding-agents-phone ; https://startupfortune.com/cursors-mobile-app-signals-that-coding-has-become-a-job-you-supervise-not-a-desk-you-sit-at/

## 4. Z-Jail + agent sandbox landscape
- Z-Jail (Division-36): lightweight multi-layer Linux sandbox — namespaces, pivot_root, seccomp-bpf, capability dropping + evidence-based "verdict engine" (Truthimatics). Prevents native-code escape via chroot/mount/ptrace/socket/process_vm_writev, fork bombs, CPU/mem exhaustion. Built on WSL2 (Kali, GCC 15.2.0), targets Linux 5.4+. Axiom Public License v1.0 — free for independent researchers/labs (budget ≤ $1M); commercial/gov/reverse-eng restricted.
- Ecosystem 2026: agentjail (minimal sandbox for untrusted code), Nono (kernel-enforced sandboxing for AI agents, HN), Fence (sandbox CLI commands with network/FS restrictions, HN), gVisor, microVMs, Northflank guides. seccomp-bpf + namespaces + cgroups are the shared building blocks.
- Sources: https://github.com/Division-36/Z-Jail/ ; https://github.com/bugthesystem/agentjail ; https://news.ycombinator.com/item?id=46849615 ; https://northflank.com/blog/how-to-sandbox-ai-agents ; https://gist.github.com/wincent/2752d8d97727577050c043e4ff9e386e

## 5. Sensor Tower — State of AI 2026 + market share
- Global time on GenAI apps: 17.2B hrs H1 2025 → 36B hrs H1 2026 (>2x YoY).
- Apps mentioning "AI" on track for 10B global downloads in H1 2026.
- AI app IAP revenue on track to surpass $4B in H1 2026 (+36% HoH).
- ChatGPT: fastest app ever to 1B MAU (May 2026), in ~3 years — faster than TikTok/YouTube/Instagram.
- Market share (web visits): ChatGPT 53.9% (May) → 46.4% (June, below 50% first time); Gemini ~27.7%; Claude ~10.3%.
- Users: ChatGPT >1.1B MAU; Gemini 662M; Claude 245M.
- Claude: fastest-growing challenger — 952.6M web visits May, +~855% YoY, +228% QoQ; wins ~70% of head-to-head enterprise deals vs OpenAI; 13% paid conversion (field-leading).
- Five positions: consumer scale (ChatGPT) / ecosystem (Gemini) / enterprise precision (Claude) / social (Grok) / research (Perplexity).
- Sources: https://www.prnewswire.com/news-releases/sensor-tower-state-of-ai-2026-report-... ; https://sensortower.com/blog/state-of-ai-2026 ; https://techcrunch.com/2026/06/16/chatgpts-market-share-slips-below-50-for-first-time/ ; https://firstpagesage.com/reports/top-generative-ai-chatbots/ ; https://momenticmarketing.com/blog/top-ai-chatbots

## 6. Fibermaxxing — fiber wellness
- "Fibermaxxing" TikTok-driven; searches +115% in 90d; dietary-fiber searches at all-time high in 2026 (Google Summergeist).
- Fiber supplements market: $4.76B (2026) → $7.55B (2033), 6.8% CAGR (Coherent). Alt: $16.8B (2025) → $38.4B (2035), 8.7% CAGR (Market.us).
- Psyllium husk = largest segment; "psyllium husk" searches +150% and fiber sales +20% YTD at Vitamin Shoppe.
- ~70% of Americans actively trying to increase fiber. Tailwinds: gut microbiome, metabolic health, GLP-1 nutrition.
- Brands: Metamucil, Benefiber, Citrucel, Garden of Life, Renew Life, Now Foods, Nature Made.
- Sources: https://blog.google/products-and-platforms/products/search/summergeist-google-trends/ ; https://www.nutraingredients.com/Article/2026/06/29/top-trends-shaping-supplement-purchases-in-2026-according-to-the-vitamin-shoppe/ ; https://www.coherentmarketinsights.com/industry-reports/fiber-supplements-market ; https://market.us/report/global-fiber-supplements-market/

## 7. Owala — status hydration
- TikTok-viral; positioned as replacing Stanley in 2026. FreeSip has 100k+ five-star reviews; "durable," "secure & leakproof," "collectable" color range.
- Water bottle market ~doubled over the past year (21% growth in 2024); consumers now buy multiple bottles (wellness + fashion + sustainability).
- Prime Day: FreeSip down to ~$27.
- Sources: https://www.accio.com/business/owala_water_bottle_trend ; https://www.thekitchn.com/best-owala-bottles-23776894 ; https://parade.com/shopping/amazon-owala-freesip-water-bottle-sale-prime-day-2026 ; https://www.amazon.com/gp/movers-and-shakers

## 8. Xiaohongshu / China consumer (小红书)
- #嗜酸星人 topic 60.4M views on Xiaohongshu; 柠檬饮 / 果醋饮 (lemon & fruit-vinegar drinks) selling strongly; 果醋 (fruit vinegar) sales up 4x.
- 泰式奶茶 (Thai milk tea) topic 330M views; core formula "重茶+厚乳+香料" (strong tea + thick milk + spice).
- Backdrop: Xiaohongshu 2026 "文旅兴趣出游" — interest-driven travel (追星/非遗/博物馆夜游, "为一场演出赴一座城/为一门手艺去一个村"); platform tilting to "precise value / niche interest."
- Sources: https://www.itopmarketing.com/info21734 ; https://zhuanlan.zhihu.com/p/1991105890716247188 ; https://m.traveldaily.cn/article/189197 ; https://xh.newrank.cn/

## 9. Google Summergeist 2026 — summer flavors
- Black sesame breakout (also "black sesame ice cream," "black sesame cookies").
- "how to make a hugo spritz at home" +2,200%; "what goes in an aperol spritz" breakout.
- "frozen yogurt nyc" +120% (90d). Hojicha lattes, horchata, chilled einspänner coffee dominating.
- Chilled reds / Sancerre searches "through the roof."
- Sources: https://blog.google/products-and-platforms/products/search/summergeist-google-trends/ ; https://www.yahoo.com/lifestyle/articles/biggest-summer-food-drink-trends-163156557.html ; https://www.thedrinksbusiness.com/2026/06/online-searches-through-the-roof-for-sancerre-and-chilled-reds/

## 10. a16z (context)
- Big Ideas 2026 (Parts 1–3), "Notes on AI Apps in 2026," "The World-Building Doors Are Open, Again."
- Themes: agent-native infrastructure, multimodal creative tools, AI-native data stacks, immersive video; "the price of AI is dropping faster than Moore's Law"; vertical software $100M+ ARR fast.
- Sources: https://a16z.com/newsletter/big-ideas-2026-part-1/ ; https://a16z.com/notes-on-ai-apps-in-2026/

## Sources not directly fetchable
- Sensor Tower dashboards, X/Twitter, LinkedIn feeds, Xiaohongshu app, Product Hunt live vote counts — login-gated / client-rendered. Used public search summaries + press coverage instead.
