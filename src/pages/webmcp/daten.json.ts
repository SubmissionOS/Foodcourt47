import type { APIRoute } from 'astro';
import { alleKuechen } from '../../lib/kuechen';
import { site, zeiten } from '../../lib/site';

/** Strukturierte Daten für die WebMCP-Tools (src/scripts/webmcp.ts). Wird beim Build aus dem Content erzeugt. */
export const GET: APIRoute = async ({ site: origin }) => {
  const kuechen = await alleKuechen();
  const daten = {
    name: site.name,
    url: origin?.href ?? site.url,
    adresse: `${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}`,
    telefon: site.telefon,
    email: site.email,
    anfahrt: site.anfahrt,
    oeffnungszeiten: zeiten,
    mittagstisch: `${site.mittag.tage} ${site.mittag.von} bis ${site.mittag.bis} Uhr`,
    abendkarte: 'ab 17 Uhr',
    reservierung: { seite: new URL('/reservieren', origin ?? site.url).href, online: site.reservierungUrl },
    kuechen: kuechen.map((k) => ({
      id: k.id,
      name: k.data.name,
      kueche: k.data.kueche,
      beschreibung: k.data.kurztext,
      seite: new URL(`/${k.id}`, origin ?? site.url).href,
      karten: k.data.karten.map((karte) => ({
        id: karte.id,
        titel: karte.titel,
        zeit: karte.zeit,
        gruppen: karte.sektionen.map((s) => ({
          titel: s.titel,
          gerichte: s.gerichte.map((g) => ({ name: g.name, beschreibung: g.beschreibung, preis_eur: g.preis })),
        })),
      })),
    })),
  };
  return new Response(JSON.stringify(daten), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
