# Lighthouse-Ergebnis Foodcourt47

Gemessen mit Lighthouse 13.5.0 (inklusive experimenteller Kategorie **Agentic Browsing**) in Chrome 154. Alle 12 Seiten, jeweils mobil und Desktop, ein Lauf pro Seite und Gerät.

**Messaufbau:** Build mit `PUBLIC_ALLOW_INDEX=true` (sonst würde SEO wegen noindex scheitern), ausgeliefert von `scripts/serve.mjs` mit Brotli, den echten Sicherheits-Headern aus `config/headers.mjs` (CSP, HSTS und weitere) und Immutable-Cache für `/_astro/`, also so wie auf Vercel. Gedrosselt wird wie bei Lighthouse üblich simuliert. Die Rohberichte (JSON und HTML) liegen in diesem Ordner, neu messen mit `node scripts/serve.mjs` und `node scripts/lighthouse.mjs docs/lighthouse`.

**Wie zu lesen:** Die Kategorie *Agentic Browsing* hat keinen Punktwert. Die Spalte zeigt, wie viele Audits bestanden sind (ok), nicht anwendbar (n. a.) oder durchgefallen (Fehler).

### Mobil (Lighthouse-Standard: Moto G Power, simuliertes langsames 4G)

| Seite | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Start | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,73 s | 0,000 | 0 ms |
| cucino-italiano | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,43 s | 0,000 | 0 ms |
| manju | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,58 s | 0,000 | 0 ms |
| sushify | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,50 s | 0,000 | 0 ms |
| speisekarte | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,50 s | 0,000 | 0 ms |
| mittag | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,65 s | 0,000 | 0 ms |
| galerie | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,65 s | 0,000 | 0 ms |
| reservieren | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,50 s | 0,000 | 0 ms |
| kontakt | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,58 s | 0,000 | 0 ms |
| impressum | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,20 s | 0,000 | 0 ms |
| datenschutz | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,20 s | 0,000 | 0 ms |
| 404 | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 1,35 s | 0,000 | 0 ms |

### Desktop (--preset=desktop)

| Seite | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Start | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,36 s | 0,000 | 0 ms |
| cucino-italiano | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,42 s | 0,000 | 0 ms |
| manju | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,44 s | 0,000 | 0 ms |
| sushify | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,38 s | 0,000 | 0 ms |
| speisekarte | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,38 s | 0,000 | 0 ms |
| mittag | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,42 s | 0,000 | 0 ms |
| galerie | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,42 s | 0,000 | 0 ms |
| reservieren | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,38 s | 0,000 | 0 ms |
| kontakt | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,42 s | 0,000 | 0 ms |
| impressum | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,32 s | 0,000 | 0 ms |
| datenschutz | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,32 s | 0,000 | 0 ms |
| 404 | 100 | 100 | 100 | 100 | 3 ok, 4 n. a. | 0,36 s | 0,000 | 0 ms |

## Vorher und nachher

Vorher ist die Ausgangsmessung dieses Auftrags (alter Stand mit Hotlink-Bildern von Fremd-Domains, die die CSP blockiert, und zwei render-blockierenden CSS-Dateien), nachher der aktuelle Stand.

| Seite | Gerät | Vorher (P / A / BP / SEO) | Nachher (P / A / BP / SEO) |
|---|---|---|---|
| Start | mobil | 98 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| Start | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| cucino-italiano | mobil | 98 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| cucino-italiano | Desktop | 100 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| manju | mobil | 98 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| manju | Desktop | 100 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| sushify | mobil | 98 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| sushify | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| speisekarte | mobil | 98 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| speisekarte | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| mittag | mobil | 98 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| mittag | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| galerie | mobil | 99 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| galerie | Desktop | 100 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| reservieren | mobil | 100 / 96 / 92 / 100 | 100 / 100 / 100 / 100 |
| reservieren | Desktop | 100 / 96 / 92 / 100 | 100 / 100 / 100 / 100 |
| kontakt | mobil | 98 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| kontakt | Desktop | 100 / 95 / 92 / 100 | 100 / 100 / 100 / 100 |
| impressum | mobil | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| impressum | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| datenschutz | mobil | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| datenschutz | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| 404 | mobil | 98 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |
| 404 | Desktop | 100 / 100 / 92 / 100 | 100 / 100 / 100 / 100 |

## Was nicht 100 ist

Alle Seiten erreichen in allen vier Kategorien 100 Punkte, in Agentic Browsing besteht jedes anwendbare Audit.

## Agentic Browsing im Detail

| Audit | Ergebnis | Grund |
|---|---|---|
| agent-accessibility-tree | bestanden | Saubere Namen, Rollen und Beziehungen im Accessibility-Tree (Teilmenge der Axe-Regeln, keine Verstöße). |
| cumulative-layout-shift | bestanden | CLS 0,000 auf allen Seiten. |
| llms-txt | bestanden | `/llms.txt` mit H1, Kurzbeschreibung und Links, wird beim Build aus dem Content erzeugt. |
| webmcp-registered-tools, webmcp-form-coverage, webmcp-schema-validity | nicht anwendbar | Lighthouse meldet diese Audits als nicht anwendbar, solange der Browser WebMCP nicht als unterstützt meldet (Origin Trial laut Chrome-Doku). Die Seite registriert drei schreibgeschützte Tools über `document.modelContext.registerTool` (`oeffnungszeiten_abfragen`, `speisekarte_abfragen`, `reservierung_und_kontakt`), sobald der Browser die API anbietet. Formulare gibt es nicht, deshalb keine deklarativen Tools. Ein Origin-Trial-Token ist nicht hinterlegt. |
| ard-schema | nicht anwendbar | Prüft ein `ai-catalog.json` nach der ARD-Spezifikation, das optional ist. Eine solche Datei existiert nicht, sie wird nicht erfunden. |

## Insights ohne Punktwirkung

Lighthouse 13 listet unter den Performance-Insights weiterhin Hinweise, die keinen Einfluss auf den Punktwert haben, weil dieser nur aus den Metriken berechnet wird. In den Berichten tauchen sie als nicht vollständig erfüllt auf:

- `network-dependency-tree-insight` (Network dependency tree): in 24 von 24 Läufen
- `largest-contentful-paint` (Largest Contentful Paint): in 5 von 24 Läufen
- `image-delivery-insight` (Improve image delivery): in 5 von 24 Läufen

## Hinweise zur Aussagekraft

- Lighthouse-Werte schwanken von Lauf zu Lauf um wenige Punkte, vor allem bei der LCP mobil (simuliert, ca. 1,2 bis 1,8 s). Alle Seiten liegen deutlich unter der Grenze von 2,5 s.
- Gemessen wird lokal. Die echte Auslieferung auf Vercel (CDN, HTTP/2 oder 3) ist eher schneller. Die Sicherheits-Header stammen aus derselben Quelle wie die `vercel.json`.
- Kontrast auf Fotos kann Lighthouse nicht prüfen. Dafür wurde der Text auf allen Foto-Heroes separat gemessen (hellster Bereich hinter jeder Textzeile gegen die Textfarbe, Desktop und Handy): überall mindestens AA.

## Anmerkung zum Messaufbau

Jeder Lauf startet einen frischen Chrome. In einer früheren Fassung des Runners teilten sich alle 24 Läufe einen Browserprozess. Dabei fiel „Galerie, mobil“ in zwei vollständigen Durchläufen reproduzierbar auf 99 (LCP 2,03 s), während dieselbe Seite einzeln oder in kurzen Folgen immer 100 erreichte (LCP 1,65 s). Der Zustand des Browserprozesses verfälschte also den 13. Lauf, nicht die Seite. Seit der Umstellung auf einen frischen Browser je Lauf liegt jeder Wert bei 100.
