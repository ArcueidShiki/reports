# Raw research notes — 2026-07-08 (Wednesday)

**Method:** WebSearch (US-only) public-summary retrieval. web_fetch to external sites is blocked by egress allowlist (npm/pypi/github/anthropic only); Product Hunt / Hacker News / Sensor Tower / X / LinkedIn / Xiaohongshu are login-walled or client-rendered and cannot be fetched directly — substituted with news / PR / leaderboard / report summaries via WebSearch. Any page that could not be retrieved was skipped, no bypass attempted.

**Freshness guard — excluded (already deep-analyzed 6/29–7/07):** Lyto, MY AI Agent, NeuralTrust, BrowserAct, Skybridge, AgentX, Sibyl, World Model MCP, deterministic-DAG agent, mixfox, HackerNows, Cursor for iOS, Z-Jail, Weave Robotics, Adam CAD, Tabstack, Humalike, Mark by Airtop, Wispr Flow, Glaze, Framer 3.0, Context.dev, Copilot App, Vox, Reflection AI, AnySearch, Stigg 2.0, Rebar, OpenPrinter, Sail Research. Consumer excluded: fibermaxxing, collagen, press-on nails, cortisol cocktail, Owala, Summerween, butter yellow, Patina blue, sleepmaxxing/magnesium, candle warmers, heatless curlers, black sesame/spritz, fruit vinegar, yellow cat paw, birdwatching/丰容, new-Chinese wellness/outdoor.

---

## 1. Product Hunt (this week, July 2026)
- **Meta-thesis (strong):** "AI apps are no longer apps — they are attachments to surfaces you already use." Last week 6 AI products launched on PH that share ONE move: none ask users to open a new app; they embed into surfaces people already touch.
  - **Dune Keypad** (46 upvotes) — hardware, sits next to keyboard, Claude integration
  - **Mina Meeting Assistant** (47) — video calls
  - **folk** (51) — text threads / CRM
  - **Databox MCP** (39) — plugs business data into Claude via MCP (chat window)
  - **Typeahead** (22) — Mac autocomplete
- Insight: "shipping AI as a new app is the slow path; the fast path is grafting onto a surface the user already touches." (In April, the "just build an agent" strategy stopped working.)
- Source: producthunt.com/products ; hunted.space top-products/latest

### Dune Keypad (Project Mirage) — DETAIL
- Context-aware Mac keypad; sits next to keyboard, its 3 keys change in real time based on foreground app.
- CNC-machined aluminum, mechanical scissor-switch keys, ~size of a stick of gum, plugs into MacBook USB-C. **Price $119.**
- Built for devs living in GitHub, VS Code, Claude, Openclaw; and for anyone running AI agents / in back-to-back Zoom/Teams/Meet meetings.
- **Claude Desktop integration:** describe the shortcut in plain language → Claude writes it & assigns to a key per app (no manual setup). "Build with Claude" connects Dune's MCP directly with Claude.
- **Dune Marketplace:** browse/install community scripts & agentic workflows. This was Dune's **2nd PH launch** (this week), adding Claude + community extensions.
- Coverage: TechCrunch 2026-07-03; Forbes 2026-06-08; Notebookcheck; TrendHunter. projectmirage.ai
- Links: https://www.producthunt.com/products/dune-4 ; https://techcrunch.com/2026/07/03/the-dune-keypad-device-can-be-your-meeting-controller-and-more/

## 2. Hacker News / Show HN (early July 2026)
- **mcpsnoop** — "Wireshark for MCP." Published to GitHub 2026-07-04, posted as Show HN. Transparent proxy inserts into the data path between an AI coding agent and its MCP servers; forwards every byte to the production client while copying each JSON-RPC frame to a live terminal. **First zero-config, single-binary** tool to do this for MCP. Solves: when an agent silently skips a tool call / hangs / negotiates a different capability set, the only way to observe it in real client traffic is to be "in the pipe."
  - Context: MCP = **97M monthly SDK downloads**, **>10,000 active public servers** (as of Mar 2026); native adoption by OpenAI, Google DeepMind, Microsoft, AWS.
  - Source: techtimes.com 2026-07-04 ; news.ycombinator.com/shownew
- (7/7 HN #1 was StreetComplete — OpenStreetMap micro-quests app; noted but an existing app, not emerging.)

## 3. a16z (July 2026)
- **"Notes on AI Apps in 2026"** + **"Top 100 Gen AI Consumer Apps — 6th Edition."**
- Thesis: **2026 = consumer AI gold rush** as developers launch mini-apps INSIDE AI platforms. Distribution via **ChatGPT's 900M users**. Enablers: OpenAI **Apps SDK**, Apple support for mini-apps, ChatGPT **group messaging**, new mini-app networks (Wabi). "Once-in-a-decade gold rush in consumer tech."
- ChatGPT has **85+ apps** across Travel/Shopping/Food/Health/Entertainment (Expedia flights, Instacart groceries, Zillow listings) — "most aggressive play any AI company has made to become a consumer super-app."
- ChatGPT is **2.7× larger than #2 Gemini on web, 2.5× on mobile**; WAU +500M over past year to **900M** (>10% of global population weekly).
- Other a16z themes 2026: "price of AI dropping faster than Moore's Law," system-of-record loses primacy, AI goes multimodal, industrial/physical AI with a "factory mindset."
- Links: https://a16z.com/notes-on-ai-apps-in-2026/ ; https://a16z.com/100-gen-ai-apps-6/

## 4. Sensor Tower (State of AI / State of Mobile 2026)
- Global time on GenAI apps projected to **more than double YoY: 17.2B → 36B hours**.
- **ChatGPT: +148% downloads, +254% IAP revenue, +426% total time**; jumped to #2 in global top-20 apps; **fastest app ever to 1B MAU (3 years)** — faster than TikTok/YouTube/Instagram.
- TikTok topped worldwide downloads, IAP revenue, and time spent in 2025. AI Assistants + Short Drama = breakout subgenres.
- Adjacent: Restaurant/Food Delivery +14% YoY; Credit/Lending +18%; sports betting +24%.
- Links: https://sensortower.com/blog/state-of-mobile-2026 ; Yahoo Finance State of AI 2026

## 5. Funding (July 2026, US-concentrated)
- **Trase — $107M seed**, led by **ARCH Venture Partners** (Red Cell Partners + others). "Trase Origin" = **agentic operating system for regulated / high-stakes industries** (healthcare + defense): patient access/navigation, clinical research, resource optimization, clinician support, care pathway automation, care management, RCM. **Duke University** partnership: cardiology **fax triage** agent for the **5,000+ faxes/month** formerly hand-sorted by MAs/nurses → **7.1× faster than manual**, unlocks **$285,450 annual staff capacity** (reinvested in care, not headcount cuts). BusinessWire 2026-06-25.
  - Links: https://www.businesswire.com/news/home/20260625167565/en/ ; https://www.mobihealthnews.com/news/trase-lands-107m-scale-ai-agents-healthcare-and-high-stakes-industries
- **ElevenLabs — $500M Series D @ $11B** (Sequoia lead; a16z, ICONIQ super-pro-rata; Lightspeed, BOND, Evantic new). **$330M+ ARR** end-2025 (Deutsche Telekom, Revolut); doubling down on **ElevenAgents**; building toward IPO. (Announced **2026-02-04** — used as CONTEXT/supporting data, not "today's" news.) TechCrunch / CNBC / PitchBook.
- Trend: >40% of 2026 seed/Series A went to rounds ≥$100M; ~88% of AI funding to US-HQ companies.
- Other rounds seen: LeapXpert $180M (governed comms), Baseten, Joulent (energy), xCures $46M (healthcare).

## 6. Consumer — West: "Skin Longevity" (skincare)
- **Shift: "anti-aging" → "skin longevity."** Focus on skin health at the **cellular level**, preserving structural integrity/resilience/function over decades (prevention + regeneration, not erasing wrinkles).
- Luxury brands investing: **Shiseido, Lancôme, Dior, Vichy** (Vichy launched a **Longevity Clinic** in Feb 2026).
- Sub-trends: **"skinification"** (skincare-grade actives in makeup/body/hair), **barrier health** (microbiome → barrier & environmental protection), ingredient evolution (peptides, niacinamide, ceramides, antioxidants, growth factors, regenerative actives).
- Market: anti-aging ~**$65.78B (2026) → $151.23B (2035), 9.69% CAGR**.
- WhoWhatWear: "In 2026, skin longevity is in — these 3 trends are out."
- Links: Forbes (2026-04-13) ; whowhatwear.com/beauty/skin/2026-skincare-trends ; beautyindependent.com

## 7. Consumer — West: Functional beverages / "drink = self-expression"
- **Keurig Dr Pepper 2026 State of Beverages report:** Gen Z's drink choice is now a **form of self-expression** (signals identity/mood/values). **63% of Gen A/Z** say what friends/creators/feeds drink influences their choices.
- **Protein shots** = next functional-beverage format; Gen Z **50% more likely** to drink protein beverages weekly, **75% more likely** sports drinks (vs Millennials+).
- "2026 = year of fiber"; functional drinks for gut health / mental clarity / relaxation with adaptogens + botanicals + "adult" branding.
- **"Swicy"** (sweet-heat) maturing → fruit-forward: **mango habanero, guava jalapeño**. Zero-alcohol functional soda (Poppi, Olipop) keeps growing.
- Links: keurigdrpepper.com (State of Beverages) ; Forbes Summer Fancy Food Show 2026 ; vivici.com (protein shots)

## 8. Consumer — China: Xiaohongshu — 拼豆 (perler beads) + interest-circle craft & travel
- **拼豆 (perler/fuse beads)** exploded: Xiaohongshu topic **80B+ (up to ~100B) views**, **+40M interactions in past 30 days** — surpassing cosmetics/fashion/home. Official "我染上了拼豆" campaign run 3×.
- Commerce: Taobao searches **+~500% YoY**; Douyin Z-gen group-buy orders **+9018%** (Spring Festival 2026), New-Year period **+1461% YoY**; 2025 mainstream e-commerce sales **¥2.91B**; 2026 market projected **~¥10B**. Margins reportedly up to **90%** ("new lipstick economy"), overseas **7× markup**.
- Demographics: **90%+ Gen Z (1995–2009) + Millennials.** Listed among Xiaohongshu's ten "strange/niche" viral interests (alongside 谷子/goods, hand-journaling, film photography). **200+ perler experience shops** in each of Beijing/Shanghai/Guangzhou; embeds into hot springs, escape rooms, board-game cafes, self-study rooms.
- **Platform narrative:** 2026 = "效果化 (outcome) era"; strategy shift from chasing破圈 hits to **精细化人群/场景/兴趣圈层** ("农村包围城市" — many precise niches). Interest-driven travel: "为一场演出赴一座城 / 为一门手艺去一个村" (chasing gigs / crafts / museum night-tours / intangible heritage).
- Links: zhuanlan.zhihu.com/p/2020104108586063375 ; chinanews.com.cn 2026-02 ; sohu.com/a/986948513
