import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewProps {
  readonly markdown: string;
}

/** Renders GitHub-flavored markdown (tables, strikethrough, task lists). */
export default function MarkdownView({ markdown }: MarkdownViewProps) {
  return (
    <div className="markdown-view">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
