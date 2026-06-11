# 真实数据存证 (provenance) — 2026-06-10

> 每个数值都来自下表官方来源, 并附官网链接、页面位置、截图。
> **核心不变量**: CSV 里的每个数 = 其截图里可见的数 (从被截图的页面读数)。
> 不同指标「能截图证明的最新一期」不同 (混合 vintage), 逐行标注参考期。

> 关于 BLS/DOL/Cboe: 其官网禁止机器人抓取(或非可截图页), 故数值与截图取自
> **FRED 官方镜像**(美联储圣路易斯分行), 页面明确标注原始发行方; 
> 通胀同比另用 **BLS 公开 API** 交叉校验(见交叉校验列)。

| 指标 | 最新值 | 前值 | 参考期 | 发行方 | 官网链接 | 页面位置 | 截图 | 交叉校验 |
|---|---|---|---|---|---|---|---|---|
| CPI 消费者物价指数 (同比) | 4.2% | 3.81% | May 2026 | U.S. Bureau of Labor Statistics | [https://fred.stlouisfed.org/graph/?id=CPIAUCNS&transformation=pc1](https://fred.stlouisfed.org/graph/?id=CPIAUCNS&transformation=pc1) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/cpi_fred.png` | BLS API May 2026=4.25% vs 截图 4.2% (✓一致) |
| 核心 CPI (剔除食品能源, 同比) | 2.9% | 2.75% | May 2026 | U.S. Bureau of Labor Statistics | [https://fred.stlouisfed.org/graph/?id=CPILFENS&transformation=pc1](https://fred.stlouisfed.org/graph/?id=CPILFENS&transformation=pc1) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/core_cpi_fred.png` | BLS API May 2026=2.85% vs 截图 2.9% (✓一致) |
| PPI 生产者物价指数 (同比) | 6.0% | 4.27% | Apr 2026 | U.S. Bureau of Labor Statistics | [https://fred.stlouisfed.org/graph/?id=PPIFIS&transformation=pc1](https://fred.stlouisfed.org/graph/?id=PPIFIS&transformation=pc1) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/ppi_fred.png` | BLS API Apr 2026=5.99% vs 截图 6.0% (✓一致) |
| 非农就业人数 (月度新增, 千人) | 172.0K | 179K | May 2026 | U.S. Bureau of Labor Statistics | [https://fred.stlouisfed.org/graph/?id=PAYEMS&transformation=chg](https://fred.stlouisfed.org/graph/?id=PAYEMS&transformation=chg) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/nonfarm_payrolls_fred.png` | — |
| 失业率 | 4.3% | 4.3% | May 2026 | U.S. Bureau of Labor Statistics | [https://fred.stlouisfed.org/graph/?id=UNRATE&transformation=lin](https://fred.stlouisfed.org/graph/?id=UNRATE&transformation=lin) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/unemployment_rate_fred.png` | — |
| 初请失业金人数 (周) | 225000.0 | — | 2026-05-30 | U.S. Employment and Training Administration (DOL) | [https://fred.stlouisfed.org/graph/?id=ICSA&transformation=lin](https://fred.stlouisfed.org/graph/?id=ICSA&transformation=lin) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/initial_claims_fred.png` | — |
| 续请失业金人数 (周) | 1777000.0 | — | 2026-05-23 | U.S. Employment and Training Administration (DOL) | [https://fred.stlouisfed.org/graph/?id=CCSA&transformation=lin](https://fred.stlouisfed.org/graph/?id=CCSA&transformation=lin) | FRED 图右上「最新观测值」面板 + 图表 | `reports/sources/continued_claims_fred.png` | — |
| 联邦基金有效利率 | 3.62% | 3.62% | 2026 Jun 8 | Federal Reserve Board (H.15) | [https://www.federalreserve.gov/releases/h15/](https://www.federalreserve.gov/releases/h15/) | Federal funds (effective) 行 | `reports/sources/rates_h15.png` | — |
| 10 年期美债收益率 | 4.56% | 4.55% | 2026 Jun 8 | Federal Reserve Board (H.15) | [https://www.federalreserve.gov/releases/h15/](https://www.federalreserve.gov/releases/h15/) | Treasury constant maturities · 10-year 行 | `reports/sources/rates_h15.png` | — |
| 2 年期美债收益率 | 4.15% | 4.17% | 2026 Jun 8 | Federal Reserve Board (H.15) | [https://www.federalreserve.gov/releases/h15/](https://www.federalreserve.gov/releases/h15/) | Treasury constant maturities · 2-year 行 | `reports/sources/rates_h15.png` | — |
| WTI 原油价格 | 95.96$ | 91.16$ | 06/01/26 | U.S. Energy Information Administration | [https://www.eia.gov/dnav/pet/pet_pri_spt_s1_d.htm](https://www.eia.gov/dnav/pet/pet_pri_spt_s1_d.htm) | WTI - Cushing, Oklahoma 行 (现货价表) | `reports/sources/wti_eia.png` | — |
| VIX 波动率指数 | 20.62 | 19.87 | 盘中快照 @ 2026-06-10 | Cboe Global Markets | [https://www.cboe.com/tradable_products/vix/](https://www.cboe.com/tradable_products/vix/) | 页首 Trade Data 现价 + Market Data 区块 PREV. CLOSE | `reports/sources/vix_cboe.png` | — |

## 备注 / 数据口径说明

- **CPI 消费者物价指数 (同比)**: Source: U.S. Bureau of Labor Statistics via FRED®
- **核心 CPI (剔除食品能源, 同比)**: Source: U.S. Bureau of Labor Statistics via FRED®
- **PPI 生产者物价指数 (同比)**: Source: U.S. Bureau of Labor Statistics via FRED®
- **非农就业人数 (月度新增, 千人)**: Source: U.S. Bureau of Labor Statistics via FRED®
- **失业率**: Source: U.S. Bureau of Labor Statistics via FRED®
- **初请失业金人数 (周)**: 前值暂缺: FRED CSV 下载端点被 Akamai 机器人防护拦截; 最新值取自 FRED 页面观测面板(截图为证)。 Source: U.S. Employment and Training Administration via FRED®
- **续请失业金人数 (周)**: 前值暂缺: FRED CSV 下载端点被 Akamai 机器人防护拦截; 最新值取自 FRED 页面观测面板(截图为证)。 Source: U.S. Employment and Training Administration via FRED®
- **联邦基金有效利率**: Release date: June 9, 2026
- **10 年期美债收益率**: Release date: June 9, 2026
- **2 年期美债收益率**: Release date: June 9, 2026
- **VIX 波动率指数**: 现价为抓取时点的盘中快照(非日收盘); 前收盘=PREV. CLOSE。