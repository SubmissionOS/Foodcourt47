// WebMCP: stellt Öffnungszeiten, Speisekarten und Reservierung als Tools für Browser-Agenten bereit.
// Imperative API laut https://developer.chrome.com/docs/ai/webmcp/imperative-api (document.modelContext.registerTool).
// Alle Tools sind schreibgeschützt. Ohne Browser-Unterstützung passiert nichts.

interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (args: Record<string, unknown>) => Promise<string>;
}

interface Gericht {
  name: string;
  beschreibung: string | null;
  preis_eur: number | null;
}
interface Daten {
  adresse: string;
  telefon: string;
  email: string;
  anfahrt: string;
  oeffnungszeiten: string[];
  mittagstisch: string;
  abendkarte: string;
  reservierung: { seite: string; online: string };
  kuechen: {
    id: string;
    name: string;
    kueche: string;
    beschreibung: string;
    seite: string;
    karten: { id: string; titel: string; zeit: string; gruppen: { titel: string; gerichte: Gericht[] }[] }[];
  }[];
}

const modelContext = (document as unknown as { modelContext?: { registerTool: (tool: Tool) => Promise<unknown> | unknown } }).modelContext;

if (modelContext && typeof modelContext.registerTool === 'function') {
  let geladen: Promise<Daten> | undefined;
  const daten = () => (geladen ??= fetch('/webmcp/daten.json').then((r) => r.json() as Promise<Daten>));

  const euro = (p: number | null) => (p === null ? '' : ` ${p.toFixed(2).replace('.', ',')} €`);

  const tools: Tool[] = [
    {
      name: 'oeffnungszeiten_abfragen',
      description: 'Öffnungszeiten des Foodcourt47 Hammerbrook in Hamburg, einschließlich Mittagstisch und Beginn der Abendkarte.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const d = await daten();
        return [`Öffnungszeiten:`, ...d.oeffnungszeiten, `Mittagstisch: ${d.mittagstisch}`, `Abendkarte: ${d.abendkarte}`].join('\n');
      },
    },
    {
      name: 'speisekarte_abfragen',
      description: 'Speisekarte mit Preisen. Ohne Angabe alle drei Küchen (Cucino Italiano, Manju, Sushify), optional eine Küche und eine Karte (Mittag oder Abend).',
      inputSchema: {
        type: 'object',
        properties: {
          kueche: { type: 'string', enum: ['cucino-italiano', 'manju', 'sushify'], description: 'Küche, z. B. "manju". Ohne Angabe alle Küchen.' },
          karte: { type: 'string', enum: ['mittag', 'abend', 'karte'], description: 'Mittagskarte (Mo–Fr 11–16 Uhr), Abendkarte (ab 17 Uhr) oder die Sushi-Karte von Sushify.' },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async (args) => {
        const d = await daten();
        const zeilen: string[] = [];
        for (const k of d.kuechen) {
          if (args.kueche && args.kueche !== k.id) continue;
          zeilen.push(`${k.name} (${k.kueche}): ${k.seite}`);
          for (const karte of k.karten) {
            if (args.karte && args.karte !== karte.id) continue;
            zeilen.push(`  ${karte.titel}, ${karte.zeit}`);
            for (const g of karte.gruppen) {
              zeilen.push(`    ${g.titel}`);
              for (const gericht of g.gerichte) zeilen.push(`      ${gericht.name}${euro(gericht.preis_eur)}${gericht.beschreibung ? ` (${gericht.beschreibung})` : ''}`);
            }
          }
        }
        return zeilen.length ? zeilen.join('\n') : 'Keine passende Karte gefunden.';
      },
    },
    {
      name: 'reservierung_und_kontakt',
      description: 'Adresse, Telefon, E-Mail, Anfahrt und der Link zur Online-Reservierung des Foodcourt47 Hammerbrook.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const d = await daten();
        return [
          `Adresse: ${d.adresse}`,
          `Telefon: ${d.telefon}`,
          `E-Mail: ${d.email}`,
          `Anfahrt: ${d.anfahrt}`,
          `Online reservieren: ${d.reservierung.online}`,
          `Infos zur Reservierung: ${d.reservierung.seite}`,
        ].join('\n');
      },
    },
  ];

  for (const tool of tools) {
    try {
      void Promise.resolve(modelContext.registerTool(tool)).catch(() => {});
    } catch {
      // Tool-Registrierung ist optional, die Seite funktioniert auch ohne
    }
  }
}
