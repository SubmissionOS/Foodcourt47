# Foodcourt47 Hammerbrook (Designentwurf von GuddiWeb)

Astro und TypeScript, Mehrseiten-Website. Inhalte liegen unter `src/content` (Küchen und Speisekarten als JSON, Fotos in `fotos.json`, Rechtstexte als Markdown). Konzept und Entscheidungen: [DESIGN.md](DESIGN.md). Ergänzte, nicht belegte Inhalte: [CONTENT-NOTES.md](CONTENT-NOTES.md).

```
npm install
npm run dev        # lokal entwickeln
npm run build      # prüft (astro check) und baut nach dist/
npm run preview    # Astro-Vorschau
```

## Indexierung: Standard gesperrt

Solange die Variable `PUBLIC_ALLOW_INDEX` nicht auf `true` steht, ist die Seite für Suchmaschinen gesperrt. Dieselbe Variable steuert drei Stellen:

| Stelle | gesperrt (Standard) | `PUBLIC_ALLOW_INDEX=true` |
|---|---|---|
| Meta-Tag `robots` | `noindex, nofollow` | `index, follow, max-image-preview:large` |
| `/robots.txt` | `Disallow: /` | `Allow: /` und Verweis auf die Sitemap |
| Header `X-Robots-Tag` (`vercel.json`) | `noindex, nofollow` | fehlt |

**Wichtig zur `vercel.json`:** Sie wird vor jedem Build von `scripts/vercel-json.mjs` aus `config/headers.mjs` neu geschrieben. Vercel liest die Datei aber vor dem Build, eine Änderung während des Builds greift dort nicht. Für den Livegang also lokal `PUBLIC_ALLOW_INDEX=true npm run config:vercel` ausführen, die geänderte `vercel.json` committen und die Variable in Vercel setzen. Für die Vorschau-Umgebung und im Standard die Variable nicht setzen. Meta-Tag und robots.txt folgen der Variable beim Build automatisch.

## Sicherheits-Header

Alle Header (Content-Security-Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, `X-Frame-Options`) stehen an einer Stelle in `config/headers.mjs`. Die CSP erlaubt nur die eigene Domain: Skripte, Schriften und Bilder sind selbst gehostet, Inline-Skripte gibt es nicht (`assetsInlineLimit: 0`). Erlaubt sind Inline-Styles, weil Astro kleines CSS einbettet und einzelne Elemente Style-Attribute setzen. Kommen neue externe Ressourcen hinzu (Karten, Analytics), muss die CSP dort angepasst werden.

## Fotos

Alle Fotos liegen lokal in `src/assets/fotos/<id>.jpg` und werden beim Build in AVIF, WebP und JPEG mit `srcset` umgerechnet. `src/content/fotos.json` führt Alt-Text, Herkunft (`quelle`) und die Markierung `stock` (Platzhalterfoto). `node scripts/fotos-laden.mjs` lädt fehlende Fotos aus `quelle` nach. Fotos austauschen: Datei mit gleichem Namen ersetzen.

## Lighthouse messen

Gemessen wird mit `PUBLIC_ALLOW_INDEX=true` (sonst scheitert SEO am noindex) gegen einen lokalen Server, der `dist/` wie Vercel ausliefert (Brotli, Header, Immutable-Cache):

```
PUBLIC_ALLOW_INDEX=true npm run build
PUBLIC_ALLOW_INDEX=true node scripts/serve.mjs          # Port 4400
node scripts/lighthouse.mjs docs/lighthouse             # alle Seiten, mobil und Desktop
node scripts/lighthouse.mjs docs/lighthouse start manju # nur einzelne Seiten
node scripts/ergebnis.mjs                               # docs/lighthouse/ERGEBNIS.md
```

Danach `npm run config:vercel` ohne Variable ausführen, damit `vercel.json` wieder dem gesperrten Standard entspricht. Ergebnisse: [docs/lighthouse/ERGEBNIS.md](docs/lighthouse/ERGEBNIS.md).

## Agentic Browsing

- `/llms.txt` wird beim Build aus dem Content erzeugt (`src/pages/llms.txt.ts`).
- Drei schreibgeschützte WebMCP-Tools (Öffnungszeiten, Speisekarte, Reservierung und Kontakt) registrieren sich über `document.modelContext.registerTool`, sobald der Browser die API anbietet (`src/scripts/webmcp.ts`, Daten aus `/webmcp/daten.json`). Laut Chrome-Doku ist WebMCP ein Origin Trial. Ein Token ist nicht hinterlegt: Wer die Tools in Chrome live nutzen will, trägt das Token als `<meta http-equiv="origin-trial">` in `src/layouts/Basis.astro` ein.
- Es gibt keine Formulare, deshalb keine deklarativen Tools. Ein `ai-catalog.json` (ARD) ist optional und nicht vorhanden.
