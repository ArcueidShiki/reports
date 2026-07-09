# Raw scraped data — 2026-06-19

**Method:** WebSearch + web_fetch on public sources. X / LinkedIn / 小红书 / Sensor Tower are login-gated or client-rendered → used WebSearch summaries of public content. `blog.mean.ceo` and `blitzgraph.com` returned non-parseable responses to web_fetch → used WebSearch summaries instead. Product Hunt monthly aggregator "vote" tallies (e.g. Fundraisly 1,027,261) are third-party CUMULATIVE counts, NOT single-launch upvotes → excluded as unreliable.

**Exclusion list (deep-analyzed June 13–18, not repeated today):** Fundraisly, Wispr Flow, Mina, Leni, Sentinel/Avea, Log Cam, Bond, Asmi, SellerClaw, Astra, Publora, Terminal Mode/Even Realities, OpenClaw, Browserbase/Browse.sh, Lightfield, Vaani, Honen, Tamadoggo, VC Boom, TypingMind, Slashy, Vokal, Goldfish, Minimi, Firma.dev, Ardent.

---

## Today's selected products/trends (fresh, not in exclusion list)

### 1. Framer 3.0 (launched June 16, 2026) — #1 Product of the Day
- AI Agents that live INSIDE the design canvas (not a side chat). Generate pages, edit components/styles, write code, manage CMS, audit site (broken links).
- Branching: agent changes land in an isolated branch you review + merge before publishing.
- External Agents: connect Claude Code, Cursor, Codex, Gemini CLI to create/edit/manage Framer projects.
- Rebuilt Community + new AI Credits pricing. No waitlist; everything shipped at once.
- Pricing: AI Credits = usage unit. Free plan 500 credits/day (~2 landing pages, resets daily, no rollover). Editor seat cut $40 → $20; Scale plan retired. Plans Free–$30/mo.
- Framer team: expect "design-grade AI tokens to become cheap or free sooner than most expect."
- Caveats from reviews: Framer-hosted only, no code export; AI inconsistent on complex asks; seat/locale billing surprises drive 1★ reviews.
- Links: https://www.producthunt.com/products/framer ; https://www.framer.com/events/
- Sources: ayautomate.com/blog/framer-3-ai-agents ; oma-kase.com/blog/framer-3-launch ; superdesign.dev/blog/framer-ai-review ; costbench.com/software/ai-design-tools/framer/

### 2. OpenCode (SST / Anomaly) — #1 open-source AI coding agent, June 2026
- Open-source terminal/IDE/desktop AI coding agent. 160K+ GitHub stars, 900 contributors, 13K+ commits, used by 7.5M developers/month. Most-adopted OSS coding agent ever.
- Connects to 75+ AI providers/models; stores none of your code; runs locally.
- Sub-agents (Explorer, Oracle, Librarian, Designer), background tasks, deep LSP/AST (compiler-level understanding), tmux integration for live agent visibility, parallel agents, session sharing (shareable URL to watch a session live).
- Entered #1 in June 2026 AI dev-tool rankings — biggest shift since Cursor's rebuild.
- Link: https://opencode.ai/
- Sources: developersdigest.tech/blog/opencode-developer-guide-2026 ; decisioncrafters.com ; blog.logrocket.com/ai-dev-tool-power-rankings/

### 3. BlitzGraph — "the AI-native backend" / "Supabase for graphs, built for LLM agents"
- Models reality as graphs; agents compose typed JSON queries programmatically — no SQL, joins, or ORMs.
- Entities with multiple kinds, bidirectional relationships, built-in search, automatic auth for agent interactions.
- Available as a remote MCP server; integrates with live backends.
- Positioning: vs Supabase (columns), Convex (documents), MongoDB Atlas (collections) — BlitzGraph thinks in graphs/relationships, the shape agents reason in.
- Surfaced via Show HN June 2026 ("Supabase for graphs, built for LLM agents").
- Link: https://blitzgraph.com/
- Sources: blitzgraph.com ; blog.mean.ceo/hacker-news-trends-june-2026 (summary)

### 4. TREND — Metered AI: GitHub Copilot moves to usage-based AI Credits (June 1, 2026)
- All Copilot plans → usage-based billing. Monthly allotment of GitHub AI Credits; 1 credit = $0.01 (priced by tokens per model API rates).
- Code completions + Next Edit Suggestions stay UNLIMITED; everything else (esp. agentic) metered.
- Plans: Pro $10/mo (incl. $15 credits), Pro+ $39 ($70), Max $100 ($200). 4.7M paid subscribers.
- Backlash: agentic sessions (read large codebases, chain model calls) cost 50–100x autocomplete → power-user bills jump 10x–50x.
- Direct competitors after the change: Cursor $20/mo (reached ~$2B valuation), Windsurf $15/mo.
- Sources: github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing ; techtimes.com/articles/317536 ; usagebox.com ; digitalapplied.com

### 5. TREND/DATA — Sensor Tower "State of AI 2026" (released ~June 16, 2026)
- Global time spent on GenAI apps: H1'25 17.2B hrs → H1'26 36B hrs (>2x YoY). AI-tagged apps on track for ~10B downloads in H1'26. AI in-app-purchase revenue >$4B in H1'26 (+36% vs H2'25).
- ChatGPT: 1B MAU in May 2026 = fastest app ever (3 yrs, beat TikTok/YT/IG); now 1.1B+ MAU. True Audience share fell <50% first time (March 2026).
- Gemini 27.7% / 662M MAU; Claude 10.3% / 245M MAU.
- Claude "explosive": US ARPU $0.50 (Sep'25) → $2.76 (May'26); usage 40 → 120 min/user/mo; US True Audience share more than tripled; Claude beats ChatGPT on revenue-per-user.
- Sources: sensortower.com/blog/state-of-ai-2026 ; prnewswire 302800844 ; thenextweb.com/news/claude-chatgpt-revenue-per-user-sensor-tower ; chaincatcher.com/en/article/2271917

### 6. CONSUMER — TikTok Shop "demo-able commerce" + Amazon practical/space-saving
- TikTok Shop early June: Beauty by Earth self-tanning lotion = top seller week 1 (107 units, $433 commissions). Self-tan = sun-safe + tan look.
- Mood lights <$30 consistently go viral (look stunning on camera, bedroom glow-up content).
- Winning categories: skincare, supplements, cleaning tools, beauty — used regularly, outcome visible in seconds.
- Amazon Movers & Shakers / Best Sellers June: space-saving + declutter (vacuum storage bags), compact multi-use items for apartments/dorms; fitness (neoprene dumbbells), kitchen gadgets (silicone utensils, oil sprayers, grinders).
- TikTok Shop projected 24.1% of US social commerce sales by 2027.
- Sources: accio.com/business/tiktok-shop-best-sellers-2026 ; winninghunter.com ; amazon.com/gp/movers-and-shakers/kitchen ; aol.com/22-movers-shakers

### 7. CONSUMER (China) — 小红书 "种草效果化时代" + "活人笔记" + 兴趣驱动
- WILL 商业大会 2026 主题：「种草进入效果化时代」——内容前置、快速验证、新品测试，更早发现真实使用场景，提升上新效率与爆款命中率。
- 经营趋势：从「爆款破圈」转向人群/场景/兴趣需求的极致精细化运营。
- 内容风向：从「精致仪式感」转向「真实放松」；品牌用「活人笔记」传递真实感、赢得信任。
- 兴趣驱动消费：追星、非遗、博物馆夜游、文旅兴趣出游成核心动机。
- Sources: itopmarketing.com/info22232 ; woshipm.com/share/6360769 ; bbtnews.com.cn/2025/1223/579681 ; m.traveldaily.cn/article/189197

---

## Macro / a16z context
- a16z (Andrew Lee): "fat startups win 2026" — bundle software + data + hardware + human ops; ship OUTCOMES not features; amplify customer economics (more revenue, not just lower cost). Venture = capital + narrative + distribution.
- Hacker News June 2026 mood: AI still dominant but "matured, hardened, commercial." Rising focus on trust, security, supply-chain risk (malicious packages, AI-assisted attacks), and whether generated code creates more mess than value.
- Funding context (NOTE: AMI Labs / Yann LeCun $1.03B seed @ $3.5–4.5B for JEPA world models was MARCH 2026, not June — used as context only, not a "today" pick). BMW i Ventures $300M agentic/physical-AI fund; a voice-AI platform raised $130M (alongside ElevenLabs).
- Sources: blog.mean.ceo/a16z-news-june-2026 ; superframeworks.com/articles/a16z-speedrun-ideas-indie-hackers-2026 ; crescendo.ai/news/latest-vc-investment-deals-in-ai-startups
