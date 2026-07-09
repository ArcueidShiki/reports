# Raw Scraped Data — 2026-07-01

Method: WebSearch + web_fetch on public sources. X / LinkedIn / Xiaohongshu / Sensor Tower / Product Hunt are login-gated or client-rendered; used public search summaries + newswire/press coverage instead. BrowserAct GlobeNewswire PR page returned an empty shell (client-rendered) → used search summaries. Excluded products already deep-analyzed on 6/12–6/29 (Fundraisly, Slashy, Vokal, Goldfish, Minimi, Framer 3.0, OpenCode, BlitzGraph, Wispr Flow, Lyto, MY AI Agent, NeuralTrust, fibermaxxing, 观鸟/鸟门).

THROUGHLINE 2026-07-01: "Agents stop borrowing human tools and get their own." The picks-and-shovels day for the agent-native web — a real browser for agents (BrowserAct #1 PH), a framework for agent-native apps (Skybridge/MCP apps), and a QA/eval layer for agents (AgentX). a16z calls the macro shift "agent-native infrastructure"; Sensor Tower shows AI becoming the new front door to shopping.

---

## A. AI / Agent infrastructure (product launches)

### 1. BrowserAct — "a real browser layer for AI agents"
- Reached **No. 1 on Product Hunt** (Product of the Day, ~June 25, 2026). PR via GlobeNewswire/Manila Times/ITNewsOnline dated July 1, 2026: "BrowserAct Reaches No. 1 on Product Hunt, Highlighting Demand for a Real Browser Layer for AI Agents."
- What it is: Browser-as-a-Service (BaaS) / AI-agent browser runtime. Gives agents a real Chrome browser they can control: open pages, read screen, click, type, extract, inspect page state, manage sessions, run multi-step web tasks.
- Browser modes: normal Chrome-based browser; control your current Chrome session; stealth browsers for protected/public pages; separate browser identities for account-based work.
- Anti-bot: automated CAPTCHA solver (reCAPTCHA v2/v3, Cloudflare Turnstile, DataDome, HUMAN Security); bypasses advanced anti-bot + geo-restrictions with human-like interaction + global IP coverage.
- No-code: build automations with natural-language prompts; returns clean, structured data; integrates with Make, n8n, Zapier.
- Pricing: credit-based subscription; 7-day free trial; workflow steps ~5 credits/step, as low as ~$0.0032/step; dynamic proxy ~5,000 credits/GB (~$3.20/GB).
- URLs: https://www.producthunt.com/products/browseract · https://www.browseract.com/pricing · https://www.manilatimes.net/2026/07/01/tmt-newswire/globenewswire/browseract-reaches-no-1-on-product-hunt-highlighting-demand-for-a-real-browser-layer-for-ai-agents/2376169

### 2. Skybridge (by alpic-ai) — full-stack open-source React framework for MCP Apps
- What it is: full-stack TypeScript/React framework for building **MCP Apps** — interactive React widgets that render *inside* AI chatbots (ChatGPT, Claude, VSCode, any MCP-compatible client). "Code once, ship everywhere" to the official app stores.
- Handles the infra + dev loop: MCP server, view rendering, client compatibility, testing tunnel; abstracts client differences.
- Traction: MIT-licensed, 1K+ GitHub stars, ~100k monthly downloads, powers **>10% of apps on the Claude and ChatGPT stores**; users from Fortune 500 to early-stage. V1.0 shipped.
- URLs: https://www.producthunt.com/products/skybridge · https://www.skybridge.tech/ · https://github.com/alpic-ai/skybridge

### 3. AgentX (agentx.so) — build + evaluate + deploy AI agents
- What it is: AI agent platform that goes beyond building — covers **evaluation and deployment**. Drag-and-drop multi-agent workflows with tools, memory, branching logic, human handoff.
- Eval/observability: run agents against test sets before deploy, track regressions, catch hallucinations and broken tool calls before users hit them. "AgentX 2.0 is live" (Product Hunt + social).
- Category context (AI agent observability/eval 2026): SMEs typically $500–$5,000/mo off-the-shelf; non-negotiables = end-to-end multi-agent trace propagation, continuous eval vs golden dataset, checkpoint/rollback. Peers: AgentOps, Langfuse, W&B Weave, Braintrust, Confident AI.
- URLs: https://www.agentx.so/ · https://www.producthunt.com/products/agentx (AgentX 2.0)

### Supporting cast (same agent-infra cluster, PH week of June 22–29)
- **Propane** — "automatic customer context for product teams and agents." (the context layer)
- **Upstream** — top PH product (June 2026); positioning thin in public summaries.
- **BrowserAct / Skybridge / AgentX / Propane** together = the agent stack: a browser to act, a runtime to render, an eval to trust, a context to ground.

## B. Macro thesis + market data

### 4a. a16z — Big Ideas 2026: "agent-native infrastructure"
- Shift from **human-speed** traffic (predictable, low concurrency, 1:1 action→response) to **agent-speed** workloads (recursive, bursty, massive).
- A single agent "target" can fan out to ~5,000 subtasks / DB queries / internal API calls — to traditional DBs and rate limiters it "resembles a DDoS attack."
- New class of agent-native infra: databases with optimistic concurrency instead of locks; API gateways that understand agent context + goals; monitoring that shows *completed tasks*, not requests/sec. "Cold starts must shrink, latency variance must collapse, concurrency limits must jump orders of magnitude." Winners survive the "deluge of tool execution."
- Also in Big Ideas 2026: people will interface with the web *through their agents*; AI breaks the cybersecurity hiring cycle; industrial AI (energy/manufacturing/logistics) goes AI-native; financial services rebuilt as an AI-first OS; "software is no longer enough" — capital wants software attached to hard consequences/infra/regulation/network effects.
- URLs: https://a16z.com/newsletter/big-ideas-2026-part-1/ · /part-2/ · /part-3/ · https://a16zcrypto.com/posts/article/trends-ai-agents-automation-crypto/

### 4b. Sensor Tower — State of AI 2026 (the numbers)
- Time spent on GenAI apps: **17.2B → 36B hours** H1 2025→H1 2026 (more than doubling YoY).
- ~**10B** global downloads of "AI"-described apps in H1 2026; IAP revenue **>$4B** in H1 2026 (+36% vs H2 2025).
- **Claude** fastest-growing challenger: True Audience +452% YoY (May); US market share 4.4% → ~14%; mobile US ARPU $0.50 (Sep 2025) → $2.76 (May 2026).
- **ChatGPT** fastest mobile app ever to **1B MAU** (May 2026, ~3 yrs — faster than TikTok/YouTube/Instagram); ChatGPT+DeepSeek+Gemini ≈ 90% of AI-assistant time spent (Q1); ChatGPT share dipped below 50% for first time (monetization phase).
- **AI = new front door to shopping**: Amazon **Rufus** users converted ~2× non-Rufus (>40% vs ~20% in Q1); Walmart **Sparky** DAU +~50% Dec'25→Apr'26 (MAU share +27%); AI ads **$1.3B** spend / **167B** impressions Q1; **Health & Wellness** ad growth +165% YoY; Shopping + Software ≈ half of ChatGPT ad placements.
- URLs: https://sensortower.com/blog/state-of-ai-2026 · https://www.theneuron.ai/explainer-articles/state-of-ai-2026-report-form-sensor-tower-ai-is-becoming-the-new-front-door-to-shopping/ · https://www.prnewswire.com/news-releases/sensor-tower-state-of-ai-2026-report-global-time-spent-on-generative-ai-apps-projected-to-more-than-double-year-over-year-302800844.html

## C. Consumer — West (Google Summergeist 2026 + Amazon)
- **Google Summergeist 2026** (search-powered summer trend report, US Google Trends):
  - **Hugo Spritz**: "how to make a hugo spritz at home" **+2,200%**; outsearched "Aperol spritz" in 12+ states. Recipe: Prosecco + elderflower liqueur + soda + mint/lime. (Axios, 6/29/2026.)
  - **Jelly slides**: top trending slide type; slide searches spike every June since 2017. "Jelly shoe trends dominate summer 2026" (Who What Wear).
  - **Frozen yogurt** revival: "frozen yogurt nyc" +120% (90 days).
  - **Fiber / magnesium**: dietary-fiber searches all-time high; "fibermaxxing" +115% (90 days); magnesium/supplements sustained.
  - URLs: https://blog.google/products-and-platforms/products/search/summergeist-google-trends/ · https://trends.withgoogle.com/trends/summergeist/ · https://www.axios.com/2026/06/29/hugo-spritz-popular-what-is-it · https://www.whowhatwear.com/fashion/shoes/jelly-shoe-trends-2026
- **Amazon viral (summer 2026)**: Owala FreeSip ("trendiest water bottle 2026"), Stanley Quencher, $13 Glotion highlighter (glycerin/shea, "lit-from-within"), Mighty Patch, $7 foot peeling spray, mushroom lamp (<$40, 1,000+ bought/month), Ninja AF101, Honeywell QuietSet tower fan, wide-leg capri pants, Hanes EcoSmart hoodie.
  - URLs: https://www.today.com/shop/amazon-trending-products-may-2026-rcna344561 · https://www.amazon.com/gp/new-releases

## D. Consumer — China (Xiaohongshu / RED)
- **胶原 / Collagen** went from an ingredient name to a **trusted anti-aging symbol** that self-generates traffic + trust ("胶原"已从成分名变成用户听得懂、愿意相信的抗老符号，自带流量和信任).
  - Recombinant collagen (重组胶原蛋白) market 2022: ¥334.4M, +54.6% YoY; medical dressings 48.53%, functional skincare 45.87% (智研咨询).
  - 小红书 health notes +100% YoY; **47%+ of 18–25 yr-olds'** health-product purchase awareness comes from social media (NielsenIQ × 小红书 healthcare whitepaper 2025–2026).
- **穿戴甲 / press-on (wearable) nails**: proof that "any product innovation that radically lowers the barrier / saves time can quickly ignite the market" (任何能极大降低使用门槛、节省时间的产品创新都有机会快速引爆市场) — the friction-killer thesis.
- Platform context: 小红书 entered the **"种草效果化时代"** (from buzz to measurable outcomes) — users open the app with a problem to solve; core mindset shift "看见具体的人" (see the specific person); authenticity/真诚 beats hard ads.
  - URLs: https://zhuanlan.zhihu.com/p/1991105890716247188 · https://www.itopmarketing.com/info22232 · https://nielseniq.cn/global/zh/insights/report/2025/xiaohongshu-healthcare-whitepaper/ · https://www.bbtnews.com.cn/2025/1223/579681.shtml

---

## Selected for today's report (7 sections)
1. BrowserAct — the real browser layer for agents (#1 PH)
2. Skybridge — the framework for MCP apps (agent-native app runtime)
3. AgentX — evaluate + deploy agents (the QA layer for agents)
4. [Trend/Data] a16z "agent-native infrastructure" + Sensor Tower State of AI 2026
5. [Consumer·West] Google Summergeist 2026 — Hugo Spritz / jelly slides / froyo (search as trend oracle)
6. [Consumer·West] Amazon measurable wellness + aesthetic dupes (magnesium / Owala / Glotion)
7. [Consumer·China] Xiaohongshu — collagen as trust-symbol + 穿戴甲 friction-killer
