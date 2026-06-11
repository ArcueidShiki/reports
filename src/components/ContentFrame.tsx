interface ContentFrameProps {
  readonly src: string;
  readonly title: string;
}

/**
 * Sandboxed iframe for embedding local HTML cards and PDF reports.
 * allow-same-origin (without allow-scripts) keeps embedded documents
 * inert while letting same-origin assets load.
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
