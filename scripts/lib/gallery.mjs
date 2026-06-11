/**
 * Gallery section builder.
 * Pure module: no filesystem access.
 */

import { compareNamesAsc } from './sort.mjs';

const PNG_SUFFIX = '.png';

/**
 * Builds the gallery section from a directory listing.
 *
 * @param {readonly string[]} fileNames
 * @returns {{images: string[]}} PNG files only, sorted ascending.
 */
export function buildGallerySection(fileNames) {
  return {
    images: fileNames
      .filter((file) => file.toLowerCase().endsWith(PNG_SUFFIX))
      .sort(compareNamesAsc),
  };
}
