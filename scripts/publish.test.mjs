import { describe, expect, it } from 'vitest';
import {
  CONTENT_DIR,
  buildPublishCommitMessage,
  formatPublishDate,
  manifestGeneratedAtMatches,
  parsePublishArgs,
  partitionDirtyPaths,
  partitionStagedPaths,
} from './lib/publish.mjs';

describe('CONTENT_DIR', () => {
  it('points at the committed content output directory', () => {
    expect(CONTENT_DIR).toBe('public/content');
  });
});

describe('parsePublishArgs', () => {
  it('defaults to a full publish run', () => {
    expect(parsePublishArgs([])).toEqual({ dryRun: false, skipDeploy: false, date: null });
  });

  it('parses --dry-run', () => {
    expect(parsePublishArgs(['--dry-run'])).toEqual({
      dryRun: true,
      skipDeploy: false,
      date: null,
    });
  });

  it('parses --skip-deploy', () => {
    expect(parsePublishArgs(['--skip-deploy'])).toEqual({
      dryRun: false,
      skipDeploy: true,
      date: null,
    });
  });

  it('parses --date=YYYY-MM-DD and --date YYYY-MM-DD forms', () => {
    expect(parsePublishArgs(['--date=2026-07-10']).date).toBe('2026-07-10');
    expect(parsePublishArgs(['--date', '2026-07-10']).date).toBe('2026-07-10');
  });

  it('combines flags', () => {
    expect(parsePublishArgs(['--dry-run', '--skip-deploy', '--date=2026-07-10'])).toEqual({
      dryRun: true,
      skipDeploy: true,
      date: '2026-07-10',
    });
  });

  it('rejects malformed --date values', () => {
    expect(() => parsePublishArgs(['--date=2026-7-10'])).toThrow(/date/i);
    expect(() => parsePublishArgs(['--date'])).toThrow(/date/i);
    expect(() => parsePublishArgs(['--date', '--dry-run'])).toThrow(/date/i);
  });

  it('rejects unknown arguments', () => {
    expect(() => parsePublishArgs(['--deploy'])).toThrow(/unknown argument/i);
  });

  it('throws for non-array input', () => {
    expect(() => parsePublishArgs('--dry-run')).toThrow(TypeError);
  });
});

describe('formatPublishDate', () => {
  it('extracts the YYYY-MM-DD date from an ISO timestamp', () => {
    expect(formatPublishDate('2026-07-10T04:05:06.789Z')).toBe('2026-07-10');
  });

  it('accepts timestamps without fractional seconds', () => {
    expect(formatPublishDate('2026-07-10T04:05:06Z')).toBe('2026-07-10');
  });

  it('rejects strings that are not ISO timestamps', () => {
    expect(() => formatPublishDate('not-a-date')).toThrow(/ISO timestamp/i);
    expect(() => formatPublishDate('2026-07-10')).toThrow(/ISO timestamp/i);
    expect(() => formatPublishDate('')).toThrow(/ISO timestamp/i);
  });

  it('throws for non-string input', () => {
    expect(() => formatPublishDate(undefined)).toThrow(TypeError);
  });
});

describe('buildPublishCommitMessage', () => {
  it('builds the conventional content-publish message', () => {
    expect(buildPublishCommitMessage('2026-07-10')).toBe('chore: publish content 2026-07-10');
  });

  it('rejects dates that are not YYYY-MM-DD', () => {
    expect(() => buildPublishCommitMessage('2026-7-10')).toThrow(/YYYY-MM-DD/);
    expect(() => buildPublishCommitMessage('2026-07-10T00:00:00Z')).toThrow(/YYYY-MM-DD/);
  });

  it('throws for non-string input', () => {
    expect(() => buildPublishCommitMessage(null)).toThrow(TypeError);
  });
});

describe('partitionDirtyPaths', () => {
  it('returns empty partitions for a clean tree', () => {
    expect(partitionDirtyPaths('')).toEqual({ contentPaths: [], otherPaths: [] });
  });

  it('classifies public/content paths as content', () => {
    const porcelain =
      ' M public/content/manifest.json\n?? public/content/market/2026-07-10/report.md\n';
    expect(partitionDirtyPaths(porcelain)).toEqual({
      contentPaths: [
        'public/content/manifest.json',
        'public/content/market/2026-07-10/report.md',
      ],
      otherPaths: [],
    });
  });

  it('classifies everything else as other', () => {
    const porcelain = ' M src/App.tsx\n?? scripts/tmp.mjs\n';
    expect(partitionDirtyPaths(porcelain)).toEqual({
      contentPaths: [],
      otherPaths: ['src/App.tsx', 'scripts/tmp.mjs'],
    });
  });

  it('splits mixed status output into both partitions', () => {
    const porcelain = ' M public/content/manifest.json\n M package.json\n';
    expect(partitionDirtyPaths(porcelain)).toEqual({
      contentPaths: ['public/content/manifest.json'],
      otherPaths: ['package.json'],
    });
  });

  it('unquotes paths that git wraps in double quotes', () => {
    const porcelain = '?? "public/content/market/2026-07-10/\\345\\215\\241.html"\n';
    expect(partitionDirtyPaths(porcelain)).toEqual({
      contentPaths: ['public/content/market/2026-07-10/\\345\\215\\241.html'],
      otherPaths: [],
    });
  });

  it('uses the destination path of a rename entry', () => {
    const porcelain = 'R  src/old.ts -> src/new.ts\n';
    expect(partitionDirtyPaths(porcelain)).toEqual({
      contentPaths: [],
      otherPaths: ['src/new.ts'],
    });
  });

  it('does not treat sibling prefixes as content paths', () => {
    expect(partitionDirtyPaths('?? public/contentX.txt\n')).toEqual({
      contentPaths: [],
      otherPaths: ['public/contentX.txt'],
    });
  });

  it('throws for non-string input', () => {
    expect(() => partitionDirtyPaths(undefined)).toThrow(TypeError);
  });
});

describe('partitionStagedPaths', () => {
  it('returns empty partitions when nothing is staged', () => {
    expect(partitionStagedPaths('')).toEqual({ contentPaths: [], otherPaths: [] });
    expect(partitionStagedPaths('\n')).toEqual({ contentPaths: [], otherPaths: [] });
  });

  it('classifies staged public/content paths as content', () => {
    const nameOnly = 'public/content/manifest.json\npublic/content/market/2026-07-10/report.md\n';
    expect(partitionStagedPaths(nameOnly)).toEqual({
      contentPaths: [
        'public/content/manifest.json',
        'public/content/market/2026-07-10/report.md',
      ],
      otherPaths: [],
    });
  });

  it('classifies staged paths outside public/content as other', () => {
    expect(partitionStagedPaths('src/App.tsx\npackage.json\n')).toEqual({
      contentPaths: [],
      otherPaths: ['src/App.tsx', 'package.json'],
    });
  });

  it('splits mixed staged paths into both partitions', () => {
    expect(partitionStagedPaths('public/content/manifest.json\nsrc/App.tsx\n')).toEqual({
      contentPaths: ['public/content/manifest.json'],
      otherPaths: ['src/App.tsx'],
    });
  });

  it('unquotes paths that git wraps in double quotes', () => {
    const nameOnly = '"public/content/market/2026-07-10/\\345\\215\\241.html"\n';
    expect(partitionStagedPaths(nameOnly)).toEqual({
      contentPaths: ['public/content/market/2026-07-10/\\345\\215\\241.html'],
      otherPaths: [],
    });
  });

  it('does not treat sibling prefixes as content paths', () => {
    expect(partitionStagedPaths('public/contentX.txt\n')).toEqual({
      contentPaths: [],
      otherPaths: ['public/contentX.txt'],
    });
  });

  it('throws for non-string input', () => {
    expect(() => partitionStagedPaths(undefined)).toThrow(TypeError);
  });
});

describe('manifestGeneratedAtMatches', () => {
  const local = { generatedAt: '2026-07-10T04:05:06.789Z', sections: {} };

  it('returns true when the remote generatedAt matches', () => {
    expect(manifestGeneratedAtMatches(local, { generatedAt: local.generatedAt })).toBe(true);
  });

  it('returns false when the remote generatedAt differs', () => {
    expect(
      manifestGeneratedAtMatches(local, { generatedAt: '2026-07-09T00:00:00.000Z' }),
    ).toBe(false);
  });

  it('returns false for malformed remote manifests (stale cache tolerant)', () => {
    expect(manifestGeneratedAtMatches(local, null)).toBe(false);
    expect(manifestGeneratedAtMatches(local, {})).toBe(false);
    expect(manifestGeneratedAtMatches(local, { generatedAt: 42 })).toBe(false);
  });

  it('throws when the local manifest is malformed', () => {
    expect(() => manifestGeneratedAtMatches({}, local)).toThrow(/local manifest/i);
    expect(() => manifestGeneratedAtMatches(null, local)).toThrow(/local manifest/i);
  });
});
