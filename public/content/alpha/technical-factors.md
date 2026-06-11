# Technical Factors

> Format: Factor Name | Formula/Signal | Condition | Applicable Types | Source

---

## Price Action

### Price Decline Magnitude (Distressed Entry)
- **Formula**: Current Price / 52-week or Market-Cycle High
- **Condition**: ≥ 50% decline vs. market average; 52-week new lows suggest momentum reversal potential
- **Applicable**: All equities; distressed / turnaround candidates
- **Tags**: `contrarian` `entry-signal` `distressed`
- **Source**: Michael Lauer · *Stock Market Wizards* (Jack Schwager)

### 6-Month Price Momentum
- **Formula**: (Current Price − Price 6 months ago) / Price 6 months ago
- **Condition**: Top decile within investable universe (best 6-month appreciation)
- **Applicable**: All equities meeting value screen first
- **Tags**: `momentum` `trend-following` `oshaughnessy`
- **Source**: James O'Shaughnessy · *What Works on Wall Street* (Trend-Value combination strategy)

---

## Valuation Percentile (Historical)

### Historical P/E Percentile
- **Formula**: Current P/E ranked against 3-year rolling P/E distribution
- **Condition**: < 50th percentile (3-year window); screener cutoff ≤ 70th percentile
- **Applicable**: All equities
- **Tags**: `relative-valuation` `screener`
- **Source**: Multiple sources (O'Shaughnessy, general screener practice)

### Industry Valuation Rank
- **Formula**: Stock P/E percentile rank within same industry
- **Condition**: Top 50 within industry (lower P/E = better rank)
- **Applicable**: Sector-comparative analysis
- **Tags**: `relative-valuation` `sector`
- **Source**: Multiple sources

---

## Size Filters

### Market Cap Filter (Small-Cap)
- **Formula**: Market Price × Shares Outstanding
- **Condition**: < $300M (W. Whitney George small-cap definition); < $25/share (George)
- **Applicable**: Small-cap universe
- **Tags**: `size` `small-cap`
- **Source**: W. Whitney George · Royce Funds

### Market Cap Floor (Large-Cap / O'Shaughnessy)
- **Formula**: Market Price × Shares Outstanding
- **Condition**: > $200M (O'Shaughnessy liquidity floor); > $500M (Polen systematic)
- **Applicable**: Liquid mid/large-cap universe
- **Tags**: `size` `liquidity-filter`
- **Source**: James O'Shaughnessy; David Polen

---

## Macro Trend Filter

### CTA Trend Signal (Macro Momentum)
- **Formula**: Moving average crossover or breakout signal across equity index, bonds, commodities, and FX; commonly 50/200-day MA or 12-month momentum
- **Condition**: Risk-on when index above 200-day MA; reduce exposure when below. CTA funds net positioning (COT report) trending bullish = tailwind
- **Applicable**: Portfolio-level risk control; all equities during risk-off regimes; use as macro filter before individual stock entry
- **Tags**: `macro` `trend-following` `cta` `risk-management`
- **Source**: AHL / Man Group CTA research; O'Shaughnessy trend-value combination; COT report (CFTC)
