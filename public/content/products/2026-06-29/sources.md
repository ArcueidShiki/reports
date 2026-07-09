# Raw Scraped Data · 2026-06-29

> Method: WebSearch + web_fetch on public sources. Product Hunt / X / LinkedIn / Sensor Tower / Xiaohongshu are login-gated or client-rendered; used WebSearch summaries of public listings & discussion. HN `/front` fetch returned a stale cached day (May 13) — used WebSearch for late-June HN trends instead. Where exact metrics weren't public, marked as such.
> Dedup: Excluded products deeply analyzed 6/12–6/20 (Fundraisly, Slashy, Vokal, Goldfish, Minimi, Framer 3.0, OpenCode, BlitzGraph, Wispr Flow, Ardent, etc.). Today = net-new picks.

---

## 1. Product Hunt (producthunt.com)
- **Lyto** — "One AI agent across your browser, tools, and messages." PH leaderboard June 28, 2026. ~150 upvotes. Chrome extension with full browser control (open/close tabs, scroll, click, fill forms, interact w/ DOM). Integrates Gmail, Slack, Google Sheets/Docs, GitHub. Reads pages, fills forms, builds spreadsheets & reports. Standout: text Lyto from WhatsApp/Telegram → it builds a report with graphs → sends finished file to any contact (no laptop). Trust design: mutative actions (send email, edit sheet) go through a confirmation step with a preview before commit; flags messy/inconsistent data and asks for clarification rather than guessing ("never silently do the wrong thing"). URL: https://www.producthunt.com/products/lyto · site: trylyto.com
- **MY AI Agent** — "AI assembles a 3–10 agent team from one sentence." Hire one AI teammate OR assemble a 3–10 specialist agent team from a single goal in ~30 seconds. URL: https://www.producthunt.com/products/my-ai-agent
- Context: AI is now the most competitive PH category; ~800–1,200 upvotes needed to hit #1 in AI. Adjacent agent-team launches: AgentX, AgentCrew, Kodey.ai. Smaller recent launches: Dune Keypad (physical keypad w/ Claude integration, 46), Mina Meeting Assistant (47), Databox MCP (39, business data into Claude via MCP).
- Source: https://www.producthunt.com/leaderboard/daily/2026/6/28 · https://www.producthunt.com/products/my-ai-agent

## 2. Hacker News (news.ycombinator.com)
- June 2026 trend (WebSearch summary): AI still hot, but money/attention shifting toward **trust, security, and controlled workflows** rather than flashy demos. Hiring threads show demand for AI engineers, coding agents, LLM product, **secure dev tools**, full-stack "hybrid builders."
- **Security moved to the center**: rising concern re AI-assisted attacks, malicious packages, software supply-chain risk.
- Notable June 26–27 stories: MicroVMs; "California's 3D printer surveillance scheme"; **Anthropic's Mythos AI release to trusted US organizations**.
- Show HN examples (June): "Google Trends for Hacker News" (18 yrs of comments indexed); TikZ WYSIWYG editor; "Needle: distilled Gemini tool-calling into a 26M model"; "ChartGPU — WebGPU charting, 1M points @ 60fps"; Traceway (MIT-licensed self-hostable observability, ~90s).
- Source: https://blog.mean.ceo/hacker-news-trends-june-2026/ · https://news.ycombinator.com/front

## 3. a16z (a16z.com)
- **Big Ideas 2026 / Notes on AI Apps in 2026**: 2026 defined by agentic systems, "structured intelligence from chaos," deep personalization.
  - **Structure the chaos**: startups will tame unstructured, multimodal enterprise data (PDFs, video, logs) that breaks RAG/agents — structuring + governing it unlocks enterprise value.
  - **Geographic expansion / forward-deployed**: most of the AI opportunity lives outside Silicon Valley; founders use forward-deployed motions into big legacy verticals.
  - **Greenfield distribution**: win companies at formation; grow with them.
  - Even in coding, a thriving startup ecosystem generated **>$1B new revenue in 2025 alone**.
- Source: https://a16z.com/notes-on-ai-apps-in-2026/ · https://a16z.com/newsletter/big-ideas-2026-part-1/ · https://a16z.com/newsletter/big-ideas-2026-part-2/

## 4. Frontier model news — Anthropic Mythos / Fable 5
- **Fable 5** (a Mythos-class model): announced ~June 9, 2026 — first widespread release of a significantly more powerful class; general release to enterprise customers + paid subscribers.
- **Claude Mythos 5**: gated to vetted partners with existing Mythos Preview access; expanded to 150+ orgs across 15+ countries (June 2).
- **Export controls**: US gov ordered an export block over cybersecurity/national-security fears, then (June 26) revised license requirements to allow release to **select trusted companies & government agencies** ("appropriate safeguards in place"). Commerce Sec. Lutnick.
- Source: https://www.cnbc.com/2026/06/09/anthropic-mythos-claude-fable-5.html · https://www.cnn.com/2026/06/26/tech/anthropic-mythos-release · https://fortune.com/2026/06/09/anthropic-releases-its-first-mythos-model-to-the-public/

## 5. Funding — NeuralTrust (AI-agent security)
- **$20M seed**, announced June 17, 2026. **Largest cybersecurity seed by an EU company to date.** Led by **Alstin Capital**; participation from VentureFriends, Seaya, Kibo Ventures, Banc Sabadell, EA Ventures Plug and Play Fund, Finaves (IESE).
- Platform to **identify, secure, and scale AI agents** running across the enterprise. Customers: Air Europa, Abanca, Iberia, Banc Sabadell + global banks/airlines/energy/government.
- Recognition: Gartner Representative Vendor (2 Market Guides); KuppingerCole Leader (2025 GenAI Defense Leadership Compass); MarketsandMarkets Leader (2026 Agentic AI Security Quadrant).
- Source: https://neuraltrust.ai/news/neuraltrust-raises-20m · https://techfundingnews.com/neuraltrust-20m-europe-largest-cybersecurity-seed-ai-agents/
- Broader: AI = 33% of total VC funding in 2026; AI seed valuations carry ~42% premium; Q1 2026 venture funding ~$300B record (Crunchbase). Other June rounds: Flagright $12.5M Series A (compliance infra), Clario $6M seed (AI data quality).

## 6. Sensor Tower (context, from June 16 State of AI 2026 — already covered 6/19, used as backdrop only)
- GenAI app time: 17.2B → 36B hours H1'25→H1'26 (>2×). ChatGPT hit 1B MAU (fastest ever, ~3 yrs). ChatGPT/DeepSeek/Gemini ≈ 90% of AI-assistant time in Q1'26. Claude fastest-growing challenger: US share 4.4% → ~14%; True Audience +452% YoY (May).
- Source: https://sensortower.com/blog/state-of-ai-2026

## 7. E-commerce / Google Trends (consumer, West)
- **Google Summergeist 2026**: "fibermaxxing" +115% in 90 days; Hugo spritz "+2,200%" breakout; black sesame desserts record highs; "frozen yogurt nyc" +120%; jelly slides top trending slide.
- **Fibermaxxing = biggest health movement of 2026** (Gen Z–led TikTok trend). Vitamin Shoppe: fiber category sales **+20% YTD**; "fiber" searches **+59%**, "psyllium husk" **+150%**. ~95% of Americans under-fiber; ~70% actively trying to add fiber. GLP-1 nutrition tie-in. PepsiCo: SunChips Fiber + Smartfood Fiber Pop launching. Momentous: triple-action fermentable fiber (psyllium + rice bran + potato starch + cinnamon, 6g/serving).
- TikTok/Amazon Movers & Shakers summer gadgets: portable AC (#summergadgets), 2-in-1 ice cream machine, reusable magnetic lashes, Korean skincare sets; shift metal → glass straws; mouth tape breakout (sleep aid).
- Source: https://blog.google/products-and-platforms/products/search/summergeist-google-trends/ · http://www.prnewswire.com/news-releases/from-fiber-to-flavor-the-vitamin-shoppe-... · https://www.kten.com/news/state/fibermaxxing-is-the-biggest-health-movement-of-2026/

## 8. Xiaohongshu / RED (consumer, China)
- 2026 themes: **精细化 + 小众兴趣圈层** (precision over "破圈"); **"活人感 / 活人笔记"** (authentic real-person notes win trust & conversion); **肤感/质地 > 成分** (felt experience first, ingredients as trust backup); AI used to detect fake/plagiarized/fabricated accounts; closed-loop e-commerce momentum.
- Social meme: yellow cat-paw greeting stickers + waving = new social meme; ~7亿+ topic heat in 90 days.
- Source: https://zhuanlan.zhihu.com/p/1991105890716247188 · https://www.itopmarketing.com/info22232 · https://www.woshipm.com/operate/6336917.html

---

## Synthesis — candidate picks for 2026-06-29
1. Lyto (product) — agent that *does* the work across browser + messaging, w/ confirmation step
2. MY AI Agent (product) — one sentence → 3–10 agent team
3. NeuralTrust (product/funding) — securing the enterprise agent swarm; $20M EU-record seed
4. Anthropic Mythos / Fable 5 (trend) — frontier capability hits the governance wall
5. a16z Big Ideas 2026 (trend) — structure the chaos + greenfield/forward-deployed
6. Fibermaxxing (consumer, West) — measurable health-maxxing; +20% category sales
7. 小红书 活人感 + 肤感 (consumer, China) — authenticity & felt experience beat hype

### Throughlines
- **AI: from "talk" to "do" → trust is the new product surface.** Agents execute (Lyto, MY AI Agent) ⇒ value & risk move to execution ⇒ confirmation steps, agent-security ($20M to NeuralTrust), and model-level governance (Mythos export controls). HN's June mood = trust/security/control.
- **Orchestration > single model.** Teams of agents; agents across surfaces.
- **Capability gated by governance.** Most powerful models ship behind access controls; most-fundable infra *secures* agents.
- **Consumer: "maxxing" + authenticity.** Fibermaxxing (measurable optimization) + 小红书 活人感 (felt, real). Reward "real / felt / measurable" over hype.
- **Win narrow, grow with them.** a16z greenfield ≈ 小红书 微观场景精细化.
