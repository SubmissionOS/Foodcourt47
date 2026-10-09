// Gemeinsame Quelle für HTTP-Header: vercel.json (scripts/vercel-json.mjs) und der lokale Messserver (scripts/serve.mjs).

/** Content-Security-Policy. Alles kommt von der eigenen Domain, Bilder und Schriften sind selbst gehostet. */
export const csp = [
  "default-src 'self'",
  "script-src 'self'",
  // Inline-Styles: Astro inlined kleines CSS, einzelne Elemente setzen Style-Attribute (z. B. --akzent, aspect-ratio)
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** Sicherheits-Header für alle Seiten. */
export function sicherheitsHeader() {
  return [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
  ];
}

/** Indexierung: gesperrt, solange PUBLIC_ALLOW_INDEX nicht "true" ist. */
export function indexHeader(erlaubeIndex) {
  return erlaubeIndex ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
}

/** Inhalt der vercel.json. */
export function vercelConfig(erlaubeIndex) {
  return {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    cleanUrls: true,
    trailingSlash: false,
    headers: [
      { source: '/(.*)', headers: [...sicherheitsHeader(), ...indexHeader(erlaubeIndex)] },
      { source: '/_astro/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ],
  };
}
