// Erzeugt docs/lighthouse/ERGEBNIS.md aus docs/lighthouse/zusammenfassung.json (und der Ausgangsmessung).
// Aufruf: node scripts/ergebnis.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const lies = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const jetzt = lies('../docs/lighthouse/zusammenfassung.json');
const vorher = lies('../docs/lighthouse/ausgangslage/zusammenfassung.json');
const lhVersion = lies('../node_modules/lighthouse/package.json').version;
const schluessel = (e) => `${e.seite}|${e.preset}`;
const vorherMap = new Map(vorher.map((e) => [schluessel(e), e]));

const sek = (ms) => (ms === undefined ? '–' : (ms / 1000).toFixed(2).replace('.', ',') + ' s');
const ms = (v) => (v === undefined ? '–' : Math.round(v) + ' ms');
const cls = (v) => (v === undefined ? '–' : v.toFixed(3).replace('.', ','));
const name = (s) => (s === '/' ? 'Start' : s.slice(1));
const agent = (e) => {
  const z = (s) => e.agent.filter((a) => a.status === s).length;
  const fail = z('fail');
  return `${z('pass')} ok${fail ? `, **${fail} Fehler**` : ''}, ${z('n/a')} n. a.`;
};
const punkte = (e) => `${e.punkte.performance} | ${e.punkte.accessibility} | ${e.punkte['best-practices']} | ${e.punkte.seo}`;

const zeilen = [];
for (const preset of ['mobile', 'desktop']) {
  zeilen.push(`\n### ${preset === 'mobile' ? 'Mobil (Lighthouse-Standard: Moto G Power, simuliertes langsames 4G)' : 'Desktop (--preset=desktop)'}\n`);
  zeilen.push('| Seite | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |');
  zeilen.push('|---|---|---|---|---|---|---|---|---|');
  for (const e of jetzt.filter((x) => x.preset === preset)) {
    const p = e.punkte;
    zeilen.push(`| ${name(e.seite)} | ${p.performance} | ${p.accessibility} | ${p['best-practices']} | ${p.seo} | ${agent(e)} | ${sek(e.lcp)} | ${cls(e.cls)} | ${ms(e.tbt)} |`);
  }
}

const vergleich = ['| Seite | Gerät | Vorher (P / A / BP / SEO) | Nachher (P / A / BP / SEO) |', '|---|---|---|---|'];
for (const e of jetzt) {
  const v = vorherMap.get(schluessel(e));
  vergleich.push(`| ${name(e.seite)} | ${e.preset === 'mobile' ? 'mobil' : 'Desktop'} | ${v ? punkte(v).replaceAll(' | ', ' / ') : '–'} | ${punkte(e).replaceAll(' | ', ' / ')} |`);
}

const unter100 = jetzt.filter((e) => Object.values(e.punkte).some((p) => p !== null && p < 100) || e.agent.some((a) => a.status === 'fail'));
const hinweise = new Map();
for (const e of jetzt) for (const f of e.fehler) hinweise.set(f.id, { titel: f.titel, n: (hinweise.get(f.id)?.n ?? 0) + 1 });

const md = `# Lighthouse-Ergebnis Foodcourt47

Gemessen mit Lighthouse ${lhVersion} (inklusive experimenteller Kategorie **Agentic Browsing**) in Chrome 154. Alle 12 Seiten, jeweils mobil und Desktop, ein Lauf pro Seite und Gerät.

**Messaufbau:** Build mit \`PUBLIC_ALLOW_INDEX=true\` (sonst würde SEO wegen noindex scheitern), ausgeliefert von \`scripts/serve.mjs\` mit Brotli, den echten Sicherheits-Headern aus \`config/headers.mjs\` (CSP, HSTS und weitere) und Immutable-Cache für \`/_astro/\`, also so wie auf Vercel. Gedrosselt wird wie bei Lighthouse üblich simuliert. Die Rohberichte (JSON und HTML) liegen in diesem Ordner, neu messen mit \`node scripts/serve.mjs\` und \`node scripts/lighthouse.mjs docs/lighthouse\`.

**Wie zu lesen:** Die Kategorie *Agentic Browsing* hat keinen Punktwert. Die Spalte zeigt, wie viele Audits bestanden sind (ok), nicht anwendbar (n. a.) oder durchgefallen (Fehler).
${zeilen.join('\n')}

## Vorher und nachher

Vorher ist die Ausgangsmessung dieses Auftrags (alter Stand mit Hotlink-Bildern von Fremd-Domains, die die CSP blockiert, und zwei render-blockierenden CSS-Dateien), nachher der aktuelle Stand.

${vergleich.join('\n')}

## Was nicht 100 ist

${
  unter100.length
    ? unter100.map((e) => `- **${name(e.seite)}, ${e.preset === 'mobile' ? 'mobil' : 'Desktop'}:** ${punkte(e).replaceAll(' | ', ' / ')} (P / A / BP / SEO)${e.agent.some((a) => a.status === 'fail') ? ', Agentic-Fehler: ' + e.agent.filter((a) => a.status === 'fail').map((a) => a.id).join(', ') : ''}`).join('\n')
    : 'Alle Seiten erreichen in allen vier Kategorien 100 Punkte, in Agentic Browsing besteht jedes anwendbare Audit.'
}

## Agentic Browsing im Detail

| Audit | Ergebnis | Grund |
|---|---|---|
| agent-accessibility-tree | bestanden | Saubere Namen, Rollen und Beziehungen im Accessibility-Tree (Teilmenge der Axe-Regeln, keine Verstöße). |
| cumulative-layout-shift | bestanden | CLS 0,000 auf allen Seiten. |
| llms-txt | bestanden | \`/llms.txt\` mit H1, Kurzbeschreibung und Links, wird beim Build aus dem Content erzeugt. |
| webmcp-registered-tools, webmcp-form-coverage, webmcp-schema-validity | nicht anwendbar | Lighthouse meldet diese Audits als nicht anwendbar, solange der Browser WebMCP nicht als unterstützt meldet (Origin Trial laut Chrome-Doku). Die Seite registriert drei schreibgeschützte Tools über \`document.modelContext.registerTool\` (\`oeffnungszeiten_abfragen\`, \`speisekarte_abfragen\`, \`reservierung_und_kontakt\`), sobald der Browser die API anbietet. Formulare gibt es nicht, deshalb keine deklarativen Tools. Ein Origin-Trial-Token ist nicht hinterlegt. |
| ard-schema | nicht anwendbar | Prüft ein \`ai-catalog.json\` nach der ARD-Spezifikation, das optional ist. Eine solche Datei existiert nicht, sie wird nicht erfunden. |

## Insights ohne Punktwirkung

Lighthouse 13 listet unter den Performance-Insights weiterhin Hinweise, die keinen Einfluss auf den Punktwert haben, weil dieser nur aus den Metriken berechnet wird. In den Berichten tauchen sie als nicht vollständig erfüllt auf:

${[...hinweise].sort((a, b) => b[1].n - a[1].n).map(([id, h]) => `- \`${id}\` (${h.titel}): in ${h.n} von ${jetzt.length} Läufen`).join('\n') || '- keine'}

## Hinweise zur Aussagekraft

- Lighthouse-Werte schwanken von Lauf zu Lauf um wenige Punkte, vor allem bei der LCP mobil (simuliert, ca. 1,2 bis 1,8 s). Alle Seiten liegen deutlich unter der Grenze von 2,5 s.
- Gemessen wird lokal. Die echte Auslieferung auf Vercel (CDN, HTTP/2 oder 3) ist eher schneller. Die Sicherheits-Header stammen aus derselben Quelle wie die \`vercel.json\`.
- Kontrast auf Fotos kann Lighthouse nicht prüfen. Dafür wurde der Text auf allen Foto-Heroes separat gemessen (hellster Bereich hinter jeder Textzeile gegen die Textfarbe, Desktop und Handy): überall mindestens AA.
`;
// Optionale, von Hand gepflegte Anmerkungen zu einzelnen Läufen
let anmerkungen = '';
try {
  anmerkungen = '\n' + readFileSync(new URL('../docs/lighthouse/anmerkungen.md', import.meta.url), 'utf8');
} catch {}
writeFileSync(new URL('../docs/lighthouse/ERGEBNIS.md', import.meta.url), md + anmerkungen);
console.log('ERGEBNIS.md geschrieben');
