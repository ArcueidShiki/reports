import type { Manifest } from '../lib/manifest';

/** Small manifest mirroring the real ingest output shape. */
export const manifestFixture: Manifest = {
  generatedAt: '2026-06-11T00:00:00.000Z',
  sections: {
    products: [
      {
        date: '2026-06-11',
        analysisJson: 'products-analysis.json',
        otherFiles: ['raw-data.json'],
      },
      {
        date: '2026-06-09',
        analysisJson: 'products-analysis.json',
        otherFiles: [],
      },
    ],
    market: [
      {
        date: '2026-06-10',
        items: [
          {
            file: '2026-06-10-cpi-hits-4-percent.md',
            lang: 'en',
            kind: 'md',
            title: 'cpi hits 4 percent',
          },
          {
            file: '2026-06-10-小红书.md',
            lang: 'zh',
            kind: 'md',
            title: '小红书',
          },
          {
            file: '2026-06-10-小红书卡片.html',
            lang: 'zh',
            kind: 'html',
            title: '小红书卡片',
          },
        ],
      },
      {
        date: '2026-06-08',
        items: [
          {
            file: '2026-06-08-提词器-深度解读.md',
            lang: 'zh',
            kind: 'md',
            title: '提词器 深度解读',
          },
        ],
      },
    ],
    alpha: [
      { id: 'readme', title: 'Alpha Factors Overview', file: 'README.md' },
      { id: 'technical', title: 'Technical Factors', file: 'technical-factors.md' },
      { id: 'value', title: 'Value Factors', file: 'value-factors.md' },
      { id: 'sentiment', title: 'Sentiment Factors', file: 'sentiment-factors.md' },
    ],
    signals: [
      {
        date: '2026-06-11',
        pdf: 'report_2026-06-11.pdf',
        signalsMd: 'signals_2026-06-11.md',
        csv: 'signals_2026-06-11.csv',
        calendarJson: 'calendar_2026-06-11.json',
        posters: ['poster_2026-06-11_1.png', 'poster_2026-06-11_2.png'],
        sources: null,
      },
      {
        date: '2026-06-10',
        pdf: 'report_2026-06-10.pdf',
        signalsMd: 'signals_2026-06-10.md',
        csv: 'signals_2026-06-10.csv',
        calendarJson: 'calendar_2026-06-10.json',
        posters: [],
        sources: {
          images: ['cpi_fred.png', 'vix_cboe.png'],
          provenanceMd: 'provenance_2026-06-10.md',
          officialJson: 'official_2026-06-10.json',
        },
      },
    ],
    gallery: {
      images: ['yr_hero_concert_00001_.png', 'yr_gallery_piano_00001_.png'],
    },
    wisdom: [
      {
        id: 'investing-wisdom',
        title: 'Investing Wisdom',
        file: 'investing-wisdom.md',
      },
    ],
  },
};

export const manifestFixtureJson = JSON.stringify(manifestFixture);
