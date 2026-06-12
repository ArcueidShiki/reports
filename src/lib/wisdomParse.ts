/**
 * Pure parser for curated wisdom markdown documents.
 *
 * Expected shape: "## Category" headings followed by bullet lines, each
 * ideally "quote text · Author · Source". Lines before the first heading
 * (title, legend, rules) are ignored; bullets that do not match the
 * separator pattern fall back to a text-only quote.
 */

export interface WisdomQuote {
  readonly text: string;
  readonly author?: string;
  readonly source?: string;
}

export interface WisdomCategory {
  readonly category: string;
  readonly items: readonly WisdomQuote[];
}

const HEADING_PREFIX = '## ';
const BULLET_PREFIX = '- ';
const FIELD_SEPARATOR = ' · ';

/** Splits a bullet body into quote fields, tolerating missing parts. */
function parseQuoteLine(body: string): WisdomQuote {
  const parts = body
    .split(FIELD_SEPARATOR)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (parts.length >= 3) {
    // Extra separators belong to the quote itself; author and source are
    // always the last two fields in the curated format.
    return {
      text: parts.slice(0, -2).join(FIELD_SEPARATOR),
      author: parts[parts.length - 2],
      source: parts[parts.length - 1],
    };
  }
  if (parts.length === 2) {
    return { text: parts[0], author: parts[1] };
  }
  return { text: body.trim() };
}

/**
 * Parses a wisdom markdown document into categories of quotes.
 *
 * Lines before the first heading (title, legend, rules) and non-bullet
 * prose inside categories are skipped rather than failing the document.
 */
export function parseWisdomMarkdown(markdown: string): readonly WisdomCategory[] {
  const lines = markdown.split('\n').map((line) => line.trim());
  const headingIndexes = lines.flatMap((line, index) =>
    line.startsWith(HEADING_PREFIX) ? [index] : [],
  );

  return headingIndexes.map((start, position) => {
    const end = headingIndexes[position + 1] ?? lines.length;
    return {
      category: lines[start].slice(HEADING_PREFIX.length).trim(),
      items: lines
        .slice(start + 1, end)
        .filter((line) => line.startsWith(BULLET_PREFIX))
        .map((line) => parseQuoteLine(line.slice(BULLET_PREFIX.length))),
    };
  });
}
