import { describe, expect, it } from 'vitest';

import { parseWisdomMarkdown } from './wisdomParse';

const SAMPLE = `# Investing Wisdom

> Bullet point · Author · Source

---

## Mindset & Philosophy

- "Never lose money." · Warren Buffett · Berkshire Hathaway Shareholder Letters
- Focus only on your circle of competence. · Warren Buffett · Berkshire Hathaway Shareholder Letters

## Value & Margin of Safety

- Margin of safety is the cornerstone. · Benjamin Graham · *The Intelligent Investor*
`;

describe('parseWisdomMarkdown', () => {
  it('splits categories on "## " headings and ignores the intro/legend', () => {
    const sections = parseWisdomMarkdown(SAMPLE);

    expect(sections.map((section) => section.category)).toEqual([
      'Mindset & Philosophy',
      'Value & Margin of Safety',
    ]);
    expect(sections[0].items).toHaveLength(2);
    expect(sections[1].items).toHaveLength(1);
  });

  it('parses "text · author · source" bullets into all three fields', () => {
    const [section] = parseWisdomMarkdown(SAMPLE);

    expect(section.items[0]).toEqual({
      text: '"Never lose money."',
      author: 'Warren Buffett',
      source: 'Berkshire Hathaway Shareholder Letters',
    });
  });

  it('parses a two-part bullet into text and author without source', () => {
    const [section] = parseWisdomMarkdown('## A\n\n- Stay invested. · Anonymous\n');

    expect(section.items).toEqual([{ text: 'Stay invested.', author: 'Anonymous' }]);
  });

  it('falls back to the whole line when a bullet has no separator', () => {
    const [section] = parseWisdomMarkdown('## A\n\n- Time in the market beats timing.\n');

    expect(section.items).toEqual([{ text: 'Time in the market beats timing.' }]);
  });

  it('strips surrounding markdown emphasis markers from the source field', () => {
    const [, valueSection] = parseWisdomMarkdown(SAMPLE);

    expect(valueSection.items[0]).toEqual({
      text: 'Margin of safety is the cornerstone.',
      author: 'Benjamin Graham',
      source: 'The Intelligent Investor',
    });
  });

  it('strips bold/underscore emphasis from any field and from fallback lines', () => {
    const [section] = parseWisdomMarkdown(
      '## A\n\n- Stay calm. · **John Bogle** · _Common Sense on Mutual Funds_\n- *A whole line in italics.*\n',
    );

    expect(section.items).toEqual([
      {
        text: 'Stay calm.',
        author: 'John Bogle',
        source: 'Common Sense on Mutual Funds',
      },
      { text: 'A whole line in italics.' },
    ]);
  });

  it('strips emphasis pairs that wrap only part of a field', () => {
    const [section] = parseWisdomMarkdown(
      '## A\n\n- Cut losses fast. · Mark Minervini · *Stock Market Wizards* (Jack Schwager)\n' +
        '- Low P/E wins. · David Dreman · "The Low-P/E Effect," *Financial Analysts Journal*\n',
    );

    expect(section.items).toEqual([
      {
        text: 'Cut losses fast.',
        author: 'Mark Minervini',
        source: 'Stock Market Wizards (Jack Schwager)',
      },
      {
        text: 'Low P/E wins.',
        author: 'David Dreman',
        source: '"The Low-P/E Effect," Financial Analysts Journal',
      },
    ]);
  });

  it('leaves unbalanced emphasis markers untouched', () => {
    const [section] = parseWisdomMarkdown(
      '## A\n\n- Risk 2 * 3 ratios. · X · *Unclosed source\n',
    );

    expect(section.items).toEqual([
      {
        text: 'Risk 2 * 3 ratios.',
        author: 'X',
        source: '*Unclosed source',
      },
    ]);
  });

  it('keeps extra separators inside the quote text', () => {
    const [section] = parseWisdomMarkdown('## A\n\n- Buy · hold · repeat. · Someone · Somewhere\n');

    expect(section.items).toEqual([
      { text: 'Buy · hold · repeat.', author: 'Someone', source: 'Somewhere' },
    ]);
  });

  it('ignores blank lines, rules, and non-bullet prose inside categories', () => {
    const [section] = parseWisdomMarkdown('## A\n\n---\n\nstray prose\n\n- Only quote. · X · Y\n');

    expect(section.items).toHaveLength(1);
  });

  it('returns an empty array when the markdown has no headings', () => {
    expect(parseWisdomMarkdown('just some text\n- a bullet\n')).toEqual([]);
    expect(parseWisdomMarkdown('')).toEqual([]);
  });
});
