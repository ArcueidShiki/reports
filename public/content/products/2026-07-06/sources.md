# 原始爬取数据 · Raw Research Notes — 2026-07-06 (Monday)

> 方法 / Method: WebSearch（US-only）公开检索摘要。**web_fetch 对外站被 egress 拦截**（allowlist 仅含 npm/pypi/github/anthropic 等），Hacker News、Product Hunt、Sensor Tower、X、LinkedIn、小红书均为登录墙或客户端渲染，**无法直接抓取**；本报告统一采用 WebSearch 返回的新闻、榜单与市场报告摘要替代，无法获取的原始页面已跳过（符合任务对内容限制的要求，不绕过）。
> 去重 / Dedup: 已排除 6/29–7/05 深度分析过的产品（BrowserAct, Skybridge, AgentX, Sibyl, World Model MCP, mixfox, HackerNows, Cursor for iOS, Z-Jail, Weave Isaac 1, Adam CAD, Tabstack, Humalike, Mark by Airtop, Wispr Flow, Glaze, Framer 3.0；消费：collagen/press-ons/blokecore/fibermaxxing/Owala/fruit-vinegar/black-sesame/butter-yellow/Summerween/sleepmaxxing/candle-warmer/黄猫爪）。

---

## A. 开发者 / AI 侧 (Agent-native)

### A1. Context.dev  — #1 Product Hunt (July 2026 月榜第一)
- 定位: "One API to scrape, enrich, and understand the web." 给 AI 产品/agent 的**网页上下文 API**——实时、结构化访问网页数据，免去脆弱的爬虫基建。
- 功能: scrape 任意 URL → 干净 Markdown/HTML；crawl 站点/sitemap；extract 结构化数据到自定义 schema；截图；提取 logo/配色/字体/styleguide/公司数据；交易描述符（transaction descriptor）富化。
- 开发者: typed SDK（TypeScript / Python / Ruby）；YC-backed；no card required；「几分钟接入」，coding agent 也能直接用。
- traction: 5,000+ 企业在用（Mintlify、Daily.dev、Ferndesk 等）。2026 上线。
- URL: https://www.producthunt.com/products/context-dev

### A2. GitHub Copilot App（agent-native desktop）× Vox（语音层）
- GitHub Copilot App: Microsoft Build 2026（6/2 发布），Win11 / macOS / Linux 独立桌面 App。6/8 桌面预览向付费用户开放（Pro/Pro+/Business/Enterprise 技术预览）。
  - My Work view: 跨仓库看所有进行中的 agent session / issue / PR / 后台自动化。
  - 每个 session 跑在自己的 **git worktree**（隔离分支副本），App 自动管理，无需手动建/清理分支。
  - **Canvases**: 人与 agent 共享的工作面，可显示 plan / PR / 浏览器会话 / 终端 / 部署 / dashboard；agent 实时更新，开发者可编辑、重排、批准、改道。
  - **Agent Merge**: agent 跟进 PR 过 review/CI，监控 CI、跟踪必需 reviewer、修复失败检查，满足条件后合并。
  - **1M-token context window**（VS Code / Copilot CLI / App），可配置 reasoning level。
  - 来源: github.blog "GitHub Copilot app: The agent-native desktop experience"；helpnetsecurity 2026-06-08。
- Vox（Product Hunt 2026, 7/3 上榜）: "Voice in, voice out — with GitHub Copilot." Copilot CLI 扩展，`/vox` 打开一个会呼吸的听觉 orb 窗口——你说话、听 agent 回；可语音打断纠正、实时字幕+转录、多轮对话。纯 JS，无 build step，借 Chromium app 模式用浏览器 Web Speech API，一行安装（Win/macOS/Linux）。
  - URL: https://www.producthunt.com/products/vox-5 · https://aasis21.github.io/vox/

### A3. Reflection AI — 自主软件工程师 "Asimov"
- 定位: 不是补全（区别于 Copilot），而是理解**整个代码库 + 文档 + 设计规格 + 团队沟通**，自主完成规划→写→测→优化的全流程。前沿开源模型路线。
- 团队: 2024/03 成立，纽约；两位创始人均 Google DeepMind 老兵——Misha Laskin（Gemini reward modeling lead）、Ioannis Antonoglou（AlphaGo/AlphaZero/MuZero 共同创造者）。
- 融资/估值: A 轮（2025/03）$130M @ ~$545M；B 轮（2025/10）Nvidia 领投 $2B → 估值 $8B；2026 寻求 $2.5B @ **$25B** pre-money（JPMorgan、Disruptive 等）——一年内 $545M→$25B。
- 算力: 2026/06 与 SpaceX 签约，2026/7/1 起至 2029，每月付 SpaceX **$150M** 用 Nvidia GB300（Colossus 2 数据中心，孟菲斯）。
- 来源: PitchBook, Sacra, TFN, tradingkey, pulse2。

## B. 趋势 / 数据 (Data)

### B1. Sensor Tower《State of AI 2026》(6/16 发布)
- AI app H1 2026 全球下载 **10B**（100 亿）。
- AI app 内购收入 H1 2026 破 **$4B**，环比 +36%（HoH）。
- 生成式 AI app 全球时长: 17.2B 小时(H1'25) → **36B 小时(H1'26)**，同比翻倍+。
- ChatGPT 2026/5 成为**史上最快到 10 亿月活**的移动 App（仅 3 年，快于 TikTok/YouTube/Instagram）。
- ChatGPT "true audience" 份额 2026/3 首次跌破 50%；**Claude 为 2026 最快挑战者**——5 月 true audience 同比 **+452%**，美国份额从 4.4% → 近 14%。
- AI 成为**购物的「新前门」**（AI shopping + ads boom；The Neuron 解读）。
- 美国 AI 主题广告创意支出 $1.3B（1–5 月），同比 +48%。
- 来源: sensortower.com/blog/state-of-ai-2026; prnewswire; theneuron.ai。

### B2. a16z「agent-speed / agent-native web」
- 2026 最大基建冲击来自内部：从 human-speed（可预测、低并发）→ **agent-speed**（递归、突发、海量并发）。
- "agent-native" 基建: 把 thundering herd 当默认态；冷启动要更短、延迟方差要收敛、并发上限要数量级跃升；瓶颈变成**协调**（routing / locking / 状态管理 / 策略执行）。
- 主题: AI 从「工具」→「环境 / 系统 / 与人协作的 agent」。
- 来源: a16z.com Big Ideas 2026 系列; a16zcrypto。

## C. 消费趋势 · 欧美 (Consumer US/EU)

### C1. Heatless curlers / 无热卷发（heat-free hairstyling）
- 市场: 全球 heatless hair curler $175.3M(2024) → $185.1M(2025) → **$319.3M(2035)**，CAGR 5.6%（MarketResearchFuture）。2026 预计同比 **+15%**，Gen Z 无热造型偏好驱动。
- 驱动: 头发健康/wellness；~80% 消费者经社媒（TikTok/IG/Pinterest）发现美妆新品。
- 品类: Flexi Rods 主导（多用途、易用）；Ribbon Curls 快速上升。北美最大市场，亚太增速最快。
- 相关 TikTok 夏季趋势: 隔夜软卷棒「晨间揭晓」内容；cloud skin（雾面替代 glass skin）；LED 面膜；便携 KTV 麦；seal plushies（25M+ 销量）；cowhide sandals。
- 来源: marketresearchfuture.com; accio.com; openpr。

## D. 消费趋势 · 中国 (Xiaohongshu)

### D1. 「丰容」(enrichment) + 「观鸟」(birding)
- **丰容**: 借动物园「行为丰容」概念，年轻人通过改变环境/打破日常惯性给生活「加变量」。#家的丰容计划 浏览量破 **10 亿**（另有 5 亿/8 亿口径）；"人你该丰容了" 上线 90 天破亿；衍生旅行丰容/兴趣丰容/认知丰容，辐射家居、美食、穿搭、个护。2026 从短时热点→主流生活方式。
- **观鸟**: 「鸟门」成年轻人新潮户外。#观鸟 近 90 天浏览量 **1.2 亿+**，笔记数 **+70%+**；卖点是「极高沉浸的自然入口」+「逃离都市」的获得感。同期上升: 拼豆、轻运动。
- 决策特征: **质感 > 性价比**（"性价比"互动极低，"高级/氛围感"高互动）；护肤「肤感/质地」讨论压过「成分」；真实、有瑕疵、生活化的内容更被信任；平台把 50%+ 流量倾斜千粉以下素人（3000+ 兴趣圈层精细化）。
- 来源: 东方财富/财富号; sohu.com/a/986948513; itopmarketing.com; woshipm.com; zhihu。

---

## 选定阵容 (Final lineup, 6 deep-dives)
1. Context.dev（PH #1）— 给 agent 的「网页上下文 API」
2. GitHub Copilot App × Vox — IDE 溶解成「agent 编排台」+ 语音
3. Reflection AI — 押注「自主软件工程师」的 $250 亿
4. 【趋势/数据】Sensor Tower《State of AI 2026》× a16z「agent 速度的网」
5. 【消费·欧美】Heatless curlers — 删掉「热」，留住卷
6. 【消费·中国】小红书「丰容」×「观鸟」— 给生活加变量、向自然借共振

**贯穿主题 / Through-line:** 「接口消失，只剩上下文」/ *The interface disappears; what's left is context.*
- Agent 侧: 浏览器/IDE/键盘溶解 → agent 要的是干净**上下文**（Context.dev 把乱网变结构化上下文；Copilot App 把 IDE 变共享画布；Reflection 押注整个 SWE 回路自主化）。
- 人侧: 精致表演溶解 → 剩下真实**质感/环境/自然**（无热=要健康不要热；丰容=重排真实空间；观鸟=向真实世界借共振；质感>性价比）。
- 每个赢家都带「诚实的裂缝」: Reflection $25B 押注未验证的自主性；heatless 出卷不稳定；丰容是「消费主义披上意义」。
