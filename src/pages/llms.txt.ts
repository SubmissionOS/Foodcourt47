import type { APIRoute } from 'astro';
import { alleKuechen } from '../lib/kuechen';
import { site, zeiten } from '../lib/site';

/** llms.txt nach https://llmstxt.org/: Markdown mit H1, Kurzbeschreibung und Links. Wird aus dem Content erzeugt. */
export const GET: APIRoute = async ({ site: origin }) => {
  const basis = origin ?? new URL(site.url);
  const u = (pfad: string) => new URL(pfad, basis).href;
  const kuechen = await alleKuechen();

  const text = `# ${site.name}

> Drei Küchen unter einem Dach in Hamburg-Hammerbrook: Pizza und Pasta von Cucino Italiano, indische Currys von Manju und Premium-Sushi von Sushify. Mittagstisch Mo–Fr 11–16 Uhr ab 7,50 €, Abendkarte ab 17 Uhr. Familienfreundlich, alle Gerichte auf Wunsch vegan. Betrieben von ${site.impressum.firma}.

## Besuch und Reservierung

- Adresse: ${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}
- Telefon: ${site.telefon}
- E-Mail: ${site.email}
- Öffnungszeiten: ${zeiten.join('; ')}
- [Tisch reservieren](${u('/reservieren')}): Online-Reservierung, Hinweise für Gruppen
- [Kontakt und Anfahrt](${u('/kontakt')}): Adresse, Telefon, E-Mail, Anfahrt

## Speisekarten

- [Speisekarte aller Küchen](${u('/speisekarte')}): Mittags- und Abendkarten mit Preisen
- [Mittagstisch](${u('/mittag')}): alle Mittagsgerichte Mo–Fr 11–16 Uhr auf einen Blick
${kuechen.map((k) => `- [${k.data.name}](${u(`/${k.id}`)}): ${k.data.kurztext}`).join('\n')}

## Weitere Seiten

- [Galerie](${u('/galerie')}): Fotos aus den drei Küchen
- [Impressum](${u('/impressum')})
- [Datenschutz](${u('/datenschutz')})

## Maschinenlesbar

- Strukturierte Daten (schema.org: Restaurant, Menu, BreadcrumbList) stehen als JSON-LD in jeder Seite.
- [Sitemap](${u('/sitemap-index.xml')})
- [Öffnungszeiten, Speisekarten und Kontakt als JSON](${u('/webmcp/daten.json')}), genutzt von den WebMCP-Tools der Seite.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
