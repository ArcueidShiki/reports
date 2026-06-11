/**
 * Builds URLs under the static content root, percent-encoding every path
 * segment so Chinese (and other non-ASCII) filenames fetch correctly.
 */
export const CONTENT_BASE = '/content';

export function contentUrl(...segments: readonly string[]): string {
  if (segments.length === 0) {
    throw new Error('contentUrl requires at least one path segment');
  }

  const encoded = segments.map((segment, index) => {
    if (segment === '') {
      throw new Error(`contentUrl segment ${index} is empty`);
    }
    if (segment.includes('/')) {
      throw new Error(
        `contentUrl segment ${index} ("${segment}") must not contain a slash; pass each path segment separately`,
      );
    }
    return encodeURIComponent(segment);
  });

  return `${CONTENT_BASE}/${encoded.join('/')}`;
}
