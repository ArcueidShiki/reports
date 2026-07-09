import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewProps {
  readonly markdown: string;
  /**
   * Base URL for resolving relative image/link paths, e.g.
   * "/content/products/2026-07-09". Absolute URLs are left untouched.
   */
  readonly baseUrl?: string;
}

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

function isRelativePath(url: string): boolean {
  return (
    url.length > 0 &&
    !ABSOLUTE_URL_PATTERN.test(url) &&
    !url.startsWith('/') &&
    !url.startsWith('#')
  );
}

/** Prefixes relative URLs with baseUrl; keeps absolute URLs and anchors. */
function resolveUrl(url: string, baseUrl: string | undefined): string {
  if (baseUrl === undefined || !isRelativePath(url)) {
    return url;
  }
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${url}`;
}

/** Renders GitHub-flavored markdown (tables, strikethrough, task lists). */
export default function MarkdownView({ markdown, baseUrl }: MarkdownViewProps) {
  return (
    <div className="markdown-view">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => resolveUrl(defaultUrlTransform(url), baseUrl)}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
