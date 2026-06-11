# Arcueid Daily Reports / 每日报告

Bilingual (English / 中文) daily-reports blog, built as a Vite + React + TypeScript SPA
and deployed as Cloudflare Worker static assets at
[https://blog.arcueidshiki.uk](https://blog.arcueidshiki.uk).

中英双语每日报告博客，基于 Vite + React + TypeScript 构建的单页应用，
以 Cloudflare Worker 静态资源形式部署在
[https://blog.arcueidshiki.uk](https://blog.arcueidshiki.uk)。

## Sections / 栏目

| Section | 栏目 | Content source (local, read-only) |
| --- | --- | --- |
| Product Analytics | 产品分析 | `product-analytics/raw/<date>/` — daily product discovery and business-model analysis (`products-analysis.json`) |
| US Market Daily | 美股日报 | `stay-in-the-market/daily-reports/2026/<MM>/` — bilingual `.md` recaps and `.html` cards |
| Alpha Factors | Alpha 因子 | `stay-in-the-market/alpha-factors/` — technical / fundamental / sentiment factor library |
| Signal Calendar | 信号日历 | `signal-calendar/reports/<date>/` — PDF report, GFM signals table, CSV/JSON downloads, posters, FRED source charts |
| Gallery | 每日图集 | `comfyui/output/*.png` — AI-generated images |

The `npm run ingest` script (configured by `ingest.config.json`) copies these sources into
`public/content/` and writes `public/content/manifest.json`. The `public/content/`
directory is intentionally committed so the site deploys as pure static assets.

`npm run ingest` 脚本（由 `ingest.config.json` 配置）把上述内容源复制到
`public/content/` 并生成 `public/content/manifest.json`。`public/content/`
目录有意纳入 git 管理，使站点能以纯静态资源方式部署。

## Quickstart / 快速开始

```bash
npm install        # install dependencies / 安装依赖
npm run ingest     # copy report content into public/content/ / 拉取报告内容
npm run dev        # start the dev server / 启动开发服务器
```

## Testing / 测试

```bash
npm test           # run the vitest suite (scripts + UI) / 运行全部测试
npm run test:watch # watch mode / 监听模式
```

## Build & Deploy / 构建与部署

```bash
npm run build              # type-check + production build into dist/
npx wrangler login         # one-time Cloudflare auth / 首次需登录 Cloudflare
npm run deploy             # build + wrangler deploy
```

Deployment is configured in `wrangler.jsonc`: the `dist/` directory is served as
Worker static assets with SPA fallback, bound to the custom domain
`blog.arcueidshiki.uk`.

部署配置见 `wrangler.jsonc`：`dist/` 目录作为 Worker 静态资源提供服务，
启用 SPA 回退，并绑定自定义域名 `blog.arcueidshiki.uk`。

## Resume backlink / 简历互链

The site footer links back to the resume site at
[https://bpcv.arcueidshiki.uk](https://bpcv.arcueidshiki.uk) ("Resume" / "简历"),
which in turn links to this blog.

站点页脚链接到简历站
[https://bpcv.arcueidshiki.uk](https://bpcv.arcueidshiki.uk)（“Resume” / “简历”），
简历站也回链到本博客。
