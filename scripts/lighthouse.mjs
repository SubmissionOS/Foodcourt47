// Lighthouse-Läufe für alle Seiten, mobil und Desktop. Aufruf:
//   node scripts/lighthouse.mjs <ordner> [seite ...]    z. B. node scripts/lighthouse.mjs docs/lighthouse
// Voraussetzung: dist/ mit PUBLIC_ALLOW_INDEX=true gebaut, node scripts/serve.mjs läuft auf Port 4400.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';

const basis = process.env.LH_BASE ?? 'http://localhost:4400';
const [ordner, ...gewaehlt] = process.argv.slice(2);
if (!ordner) throw new Error('Zielordner fehlt');
mkdirSync(ordner, { recursive: true });

const alle = ['/', '/cucino-italiano', '/manju', '/sushify', '/speisekarte', '/mittag', '/galerie', '/reservieren', '/kontakt', '/impressum', '/datenschutz', '/404'];
// Kurznamen erlaubt (start, manju, ...), damit Git Bash "/" nicht in einen Pfad umwandelt
const pfad = (n) => (n === 'start' ? '/' : n.startsWith('/') && !n.includes(':') ? n : '/' + n.replace(/^\/+/, ''));
const seiten = gewaehlt.length ? gewaehlt.map(pfad) : alle;
const presets = process.env.LH_PRESETS ? process.env.LH_PRESETS.split(',') : ['mobile', 'desktop'];
const slug = (s) => (s === '/' ? 'start' : s.slice(1));

const ergebnisse = [];
for (const seite of seiten) {
  for (const preset of presets) {
    // Ohne Vollbild- und Verlaufs-Screenshots: kleinere Berichte, gleiche Messwerte
    // Pro Lauf ein frischer Chrome: sonst beeinflusst der Zustand des Prozesses spätere Läufe (gemessen: ab dem ca. 13. Lauf schlechtere LCP)
    const chrome = await launch({
      chromePath: process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
    });
    const optionen = { port: chrome.port, output: ['json', 'html'], logLevel: 'error', disableFullPageScreenshot: true, skipAudits: ['screenshot-thumbnails', 'final-screenshot'] };
    let lauf;
    try {
      lauf = await lighthouse(basis + seite, optionen, preset === 'desktop' ? desktopConfig : undefined);
    } finally {
      await chrome.kill();
    }
    const [json, html] = lauf.report;
    const name = `${slug(seite)}-${preset}`;
    writeFileSync(join(ordner, name + '.json'), json);
    writeFileSync(join(ordner, name + '.html'), html);

    const lhr = lauf.lhr;
    const punkte = Object.fromEntries(Object.entries(lhr.categories).map(([k, c]) => [k, c.score === null ? null : Math.round(c.score * 100)]));
    const agent = (lhr.categories['agentic-browsing']?.auditRefs ?? []).map((r) => {
      const a = lhr.audits[r.id];
      const status = a.scoreDisplayMode === 'notApplicable' ? 'n/a' : a.scoreDisplayMode === 'informative' ? 'info' : a.score === 1 ? 'pass' : 'fail';
      return { id: r.id, status };
    });
    const falsch = Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 1 && !['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode))
      .map((a) => ({ id: a.id, titel: a.title, score: a.score, anzeige: a.displayValue ?? '' }));
    const m = lhr.audits;
    const eintrag = {
      seite,
      preset,
      punkte,
      agent,
      lcp: m['largest-contentful-paint']?.numericValue,
      cls: m['cumulative-layout-shift']?.numericValue,
      tbt: m['total-blocking-time']?.numericValue,
      fcp: m['first-contentful-paint']?.numericValue,
      si: m['speed-index']?.numericValue,
      fehler: falsch,
      laufzeitFehler: lhr.runtimeError?.message,
    };
    ergebnisse.push(eintrag);
    const a = punkte;
    console.log(
      `${name.padEnd(26)} P${a.performance} A${a.accessibility} B${a['best-practices']} S${a.seo} | agent ${agent.map((x) => x.status).join('/')} | LCP ${Math.round(eintrag.lcp)} CLS ${eintrag.cls?.toFixed(3)} TBT ${Math.round(eintrag.tbt)}${falsch.length ? ' | fail: ' + falsch.map((f) => f.id).join(',') : ''}`,
    );
  }
}
writeFileSync(join(ordner, 'zusammenfassung.json'), JSON.stringify(ergebnisse, null, 2));
