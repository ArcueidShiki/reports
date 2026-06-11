# Alpha Factors Library

Factor files are split by category. Each factor entry records: name, formula, condition, applicable stock types, tags, and source.

## Structure

```
alpha-factors/
├── fundamental/
│   └── value-factors.md      # Profitability, valuation, balance sheet, growth, shareholder returns, multi-factor models
├── technical/
│   └── technical-factors.md  # Price action, momentum, size filters, historical percentile screens
└── sentiment/
    └── sentiment-factors.md  # Insider activity, catalysts, narrative, qualitative gates
```

## Tags Reference

| Tag | Meaning |
|-----|---------|
| `quality` | Profitability / moat signal |
| `valuation` | Price-based cheapness metric |
| `growth` | Revenue or earnings expansion |
| `solvency` / `leverage` | Balance sheet risk |
| `liquidity` | Short-term cash coverage |
| `cash-flow` | FCF or operating cash signals |
| `momentum` | Price trend signal |
| `contrarian` | Mean-reversion / distressed signal |
| `multi-factor` | Combined scoring model |
| `cyclical` | Applies specifically to cyclical businesses |
| `small-cap` | Small-cap specific constraint |
| `graham` | Benjamin Graham criteria |
| `lynch` | Peter Lynch criteria |
| `greenblatt` | Joel Greenblatt Magic Formula |
| `oshaughnessy` | O'Shaughnessy quantitative model |
| `insider` | Insider buying / buyback signal |

## Stock Type Classification (Lynch)

Apply factor sets per stock type:

| Type | Primary Factors |
|------|----------------|
| **Slow-Growth** | Dividend yield, payout sustainability, debt ratio |
| **Stable-Growth** | P/E, earnings consistency, recession performance |
| **Fast-Growth** | PEG, revenue concentration, growth ≥ 20%, expansion capacity |
| **Cyclical** | Inventory vs. revenue growth, supply/demand cycle phase, P/B |
| **Turnaround** | Net cash, debt-to-CF, quick ratio, catalyst, insider buying |
| **Asset-Rich** | P/B vs. tangible assets, hidden asset valuation, M&A revaluation |
