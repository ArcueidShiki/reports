interface ContentFrameProps {
  readonly src: string;
  readonly title: string;
}

/**
 * Sandboxed iframe for embedding local HTML cards.
 * allow-same-origin (without allow-scripts) keeps embedded documents
 * inert while letting same-origin assets load.
 * Do NOT use for PDFs: sandboxing disables the plugin-gated Chromium
 * PDF viewer — use PdfFrame instead.
 */
export default function ContentFrame({ src, title }: ContentFrameProps) {
  return (
    <iframe
      className="content-frame"
      src={src}
      title={title}
      sandbox="allow-same-origin"
    />
  );
}
