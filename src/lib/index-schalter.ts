/**
 * Indexierung ist standardmäßig gesperrt. Nur mit PUBLIC_ALLOW_INDEX=true beim Build
 * wird die Seite indexierbar (Meta-Tag, robots.txt). Der X-Robots-Tag in vercel.json
 * folgt derselben Variable (scripts/vercel-json.mjs).
 */
export const erlaubeIndex = import.meta.env.PUBLIC_ALLOW_INDEX === 'true';
