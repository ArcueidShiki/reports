/**
 * Ingest configuration validation.
 * Pure module: no filesystem access.
 */

export const REQUIRED_CONFIG_KEYS = Object.freeze([
  'products',
  'market',
  'alpha',
  'signals',
  'gallery',
  'outputDir',
]);

/**
 * Validates a raw ingest config object.
 *
 * @param {unknown} raw - Parsed JSON config.
 * @returns {Readonly<Record<string, string>>} Frozen copy of the valid config.
 * @throws {Error} With a message naming every missing or invalid key.
 */
export function validateIngestConfig(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('ingest config must be a JSON object');
  }
  const problems = REQUIRED_CONFIG_KEYS.filter((key) => {
    const value = raw[key];
    return typeof value !== 'string' || value.length === 0;
  });
  if (problems.length > 0) {
    throw new Error(
      `ingest config is missing or has invalid keys (must be non-empty strings): ${problems.join(', ')}`,
    );
  }
  return Object.freeze(
    Object.fromEntries(REQUIRED_CONFIG_KEYS.map((key) => [key, raw[key]])),
  );
}
