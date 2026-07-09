# 原始数据 · Raw Scrape Notes — 2026-07-09 (Thursday)

> 方法 / Method：WebSearch（US-only）公开检索摘要。**web_fetch / 直接抓站在本环境被 egress 拦截**（allowlist 仅 npm/pypi/github/anthropic 等），Product Hunt / Hacker News / Sensor Tower / X / LinkedIn / 小红书 均为登录墙或客户端渲染，无法直接抓取；统一以新闻、PR、榜单、报告摘要替代。无法获取的原始页面已跳过、未做绕过。
> 今日主题 / Theme：**证明经济 · The Proof Economy** —「说得好不如证明给我看」。在造东西几乎免费的世界里，稀缺的是『证明』：证明它会成（模拟）、证明你能掌控（本地自持）、证明它有真本事（开源打赢闭源 / 消费者要证据）。核心透镜 = **say-do gap（嘴上说的 vs 真正会做的）**。

---

## 排除名单 / Exclusion list（6/29–7/08 已深度分析，今日不重复）
BrowserAct, Skybridge, AgentX, Sibyl, World Model MCP, deterministic-DAG coding agent, mixfox, HackerNows, Cursor for iOS, Z-Jail, Claude/assistant war, Weave Robotics Isaac 1, Adam CAD Copilot, Tabstack/Humalike/Mark by Airtop, Wispr Flow, Glaze by Raycast, **Framer 3.0/Agents**(7/5&7/7 已两次), Context.dev, GitHub Copilot App/Vox, Reflection AI, AnySearch, Stigg 2.0, Rebar, OpenPrinter, Dune Keypad, mcpsnoop, Trase；
消费：Summergeist, collagen/press-ons(拼豆 7/8), blokecore, fibermaxxing, Owala, fruit-vinegar, black sesame/spritz, Summerween, butter-yellow/patina-blue, sleepmaxxing/magnesium, candle-warmers, yellow-cat-paw/放飞真实(7/5), heatless-curlers, 丰容/观鸟, cortisol-cocktail, 新中式养生/户外(7/7), skin-longevity, protein-shots/swicy, 拼豆(7/8)。

---

## 今日精选 / Today's picks (6)

### 1. Talp — AI 人格模拟顾客 / "We Simulate Human Intent"
- Pre-seed at **$20M valuation**；投资方 Formus Capital、Sunshine Lake Ventures、Aito Capital、**a16z Scout Fund** + 天使；Turkish roots；2026 年 7 月宣布。
- 卖点：用有行为模式/决策特质/认知倾向的 AI 人格，在网站/广告/定价场景里**跑一遍**，预测顾客会怎么做、为什么——**替代 survey**，闭合 **say-do gap**（人们不一定照嘴上说的做）。
- 用例：上千 shopper persona 跑 checkout flow，在广告上线前标出价格敏感/弃购点；测内容/标题反应；测店铺/campaign。
- 竞品语境：合成用户研究是窄赛道，"投资胃口跑在营收前面"（Aaru 十亿美元估值 vs 个位数百万 ARR）。
- 链接：https://talp.ai/ ｜ https://techfundingnews.com/meet-talp-ai-startup-with-turkish-roots-raising-20m-pre-seed-valuation-to-simulate-customers-with-ai-personas/ ｜ https://app.dealroom.co/news/note/talp-raises-pre-seed-at-20m-valuation-to-replace-surveys-with-ai-customer-personas

### 2. Rowboat / Rowboat Labs — 本地自持的 AI 同事 / Open-source, local-first alternative to Claude Cowork
- Show HN 本周热门（HN item 48819808，~86 pts / 204 comments）。
- 定位：open-source **AI coworker with memory**，把 Gmail/日历/会议记录/Slack/助手对话织成 Obsidian 式**反链知识图谱**，再用你选的 **Ollama / LM Studio / 托管 LLM** 在本机行动——不锁定 Claude 订阅、不强制云端记忆。**数据默认全留本机（data sovereignty / local-first）。**
- 能力：后台 agent 按事件（新邮件）或定时（每天 8am）跑；连工具、搜网、用浏览器、用 Claude Code/Codex 写代码；本地会议记录器（麦+扬声器→实时转写→更新图谱→出 PDF deck / 语音简报）。
- 数据：GitHub **14.5k stars / 1.5k forks**；**YC 背书**，已融 **$500K**；SF，2024 成立，创始人 Arjun Maheswaran、Akhilesh Sudhakar、Ramnique Singh，5 人。
- 链接：https://github.com/rowboatlabs/rowboat ｜ https://www.rowboatlabs.com/ ｜ https://news.ycombinator.com/item?id=48819808

### 3. Together AI — $800M 押注"开源打赢闭源" / Open beats closed
- **$800M Series C @ $8.3B 估值**，**Aramco Ventures 领投**（Vista、General Catalyst、Emergence、**Nvidia**、March Capital、Pegatron、S Ventures 等）；2026-07-01 宣布。估值 16 个月从 $3.3B→$8.3B（翻倍+）。
- 模式：**从不做自研基座模型**，只做让企业**廉价大规模跑别人开源模型**（DeepSeek / MiniMax / Kimi）的云基建；bookings 已过 **$1.15B ARR**；宣称推理成本比闭源低 **最高 60×**；计划 5 年把算力扩 **~50×**。
- 意义：企业"弃闭投开"的最硬背书——开源推理生意破 $1B。
- 链接：https://techcrunch.com/2026/07/01/neocloud-together-ai-raises-800m-leaps-to-8-3b-valuation/ ｜ https://www.businesswire.com/news/home/20260701243402/en/ ｜ https://thenextweb.com/news/together-ai-800m-series-c-aramco-ventures

### 4.【趋势/数据】证明经济：资本只为"可掌控 + 可量化 + 自有数据"买单
- **Davit**（Show HN，item 48821848，**92 pts / 361 comments**）：SwiftUI 原生 macOS UI for **Apple Containers**（Apple silicon 上跑 Linux 容器，Docker Desktop 平替），直连 container-apiserver over XPC，无 Electron、MIT 开源。by wouterdebie，davit.app。——把云端黑箱换成"本地可见、可掌控"的容器。
- **a16z Big Ideas 2026**：主题=agentic systems；到 2026 约 **~40% 企业软件**将嵌入任务专用 agent；赢家"走窄、占住一条 workflow、给出立刻可量化的 ROI"；护城河=**自有高质量专有数据**（VLex、OpenEvidence）。
- **Sensor Tower State of AI/Mobile 2026**：ChatGPT **史上最快破 10 亿月活**（2026-05，仅 3 年，快过 TikTok/YT/IG）；下载 +148%、时长 +426%；20 万+ App 描述含 AI；AI App H1 2026 约 **100 亿下载**（+25% YoY），2025 绝对营收增量 +$35 亿。
- **Together AI** 亦是此列：只给"能证明省钱/可掌控"的开源基建砸 $800M。
- 链接：https://news.ycombinator.com/item?id=48821848 ｜ https://a16z.com/newsletter/big-ideas-2026-part-1/ ｜ https://finance.yahoo.com/technology/ai/articles/sensor-tower-state-ai-2026-103000739.html

### 5.【消费·欧美】Substance over stunt：Gen Z 只认证据，不认噱头（say-do gap 的消费面）
- 核心：**"viral fame isn't enough to win carts"**——流量噱头卖不动货；Gen Z 要 substance > slogan、consistency/sincerity/real values。
- 证据链取代噱头：信 **peer reviews / UGC / creator-led demo** 胜过品牌content；**micro/nano creator** 参与度 > mega-influencer；**CeraVe**（临床功效、皮肤科背书、functionality over form）成 Gen Z 心智样本。
- 轻趋势：July TikTok **"hot dog summer"**（hot dog nails/cakes/merch）——夏季审美梗；但"substance over stunt"意味着梗只带流量、要真货才有转化。
- 链接：https://www.contentgrip.com/brands-thriving-with-gen-z/ ｜ https://houseofmarketers.com/how-cerave-transformed-gen-z-skincare-brand/ ｜ https://newengen.com/insights/july-tiktok-trends/

### 6.【消费·中国】小红书：从"表演精致"到"证明真实"
- 内容风向：长期热门"独居"从"精致 vlog/仪式感"转向"**失控/松弛**"（端锅吃饭、在家放飞）——真实＝新的可信符号。
- 健康消费：**保健品成"健康/精致/自律"人设的核心道具**（外在形象管理是健康消费顶级入口）。
- 决策第一关：**"肤感/质地"的讨论度压过"成分"**——上身体验＝消费者要的"证据"，成分表说得再好不如肤感证明。
- 结构：**3000+ 兴趣圈**，平台 **50%+ 流量倾斜千粉以下素人**；打法从"爆款破圈"转"农村包围城市"式**极致精细化**（微观场景 × 精准人群 × 小众圈层）——不追破圈，深证一个圈层。
- 链接：https://zhuanlan.zhihu.com/p/1991105890716247188 ｜ https://www.itopmarketing.com/info22232 ｜ https://www.woshipm.com/operate/6336917.html

---

## 未能抓取 / Skipped (blocked or login-walled，未绕过)
Product Hunt 逐日榜（/leaderboard/daily/2026/7/8 等）、Hacker News 原站 item 页、Sensor Tower app 榜原始数据、X/Twitter 帖子、LinkedIn 动态、小红书笔记原文、Amazon Movers & Shakers 实时页——均以 WebSearch 摘要/新闻/报告替代。
