import type { CollectionEntry } from 'astro:content';
import { site, adresseBelegt } from './site';
import { istPlatzhalter } from './format';
import { foto, url } from './fotos';

type Kueche = CollectionEntry<'kuechen'>;

const basis = site.url;

/** Gemeinsame Ortsangaben. Platzhalter werden nicht an Google ausgegeben. */
function ort() {
  const daten: Record<string, unknown> = {};
  if (adresseBelegt()) {
    daten.address = {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.strasse,
      postalCode: site.adresse.plz,
      addressLocality: site.adresse.ort,
      addressCountry: 'DE',
    };
  } else {
    daten.address = { '@type': 'PostalAddress', addressLocality: 'Hamburg', addressRegion: 'Hammerbrook', addressCountry: 'DE' };
  }
  if (!istPlatzhalter(site.telefon)) daten.telephone = site.telefon;
  if (!istPlatzhalter(site.email)) daten.email = site.email;
  return daten;
}

export function foodcourtSchema(kuechen: Kueche[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${basis}/#foodcourt`,
    name: site.name,
    description: site.beschreibung,
    url: basis,
    logo: site.logo.src,
    image: 'https://foodcourt47.de/wp-content/uploads/2023/02/2.jpg',
    servesCuisine: kuechen.map((k) => k.data.kueche),
    hasMenu: `${basis}/speisekarte`,
    acceptsReservations: site.reservierungUrl,
    ...ort(),
    // openingHoursSpecification ergänzen, sobald die regulären Öffnungszeiten feststehen.
    department: kuechen.map((k) => ({ '@id': `${basis}/${k.id}#restaurant` })),
  };
}

export async function kuecheSchema(k: Kueche) {
  const bild = url(await foto(k.data.fotos[0]), 1600);
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${basis}/${k.id}#restaurant`,
    name: `${k.data.name} im ${site.name}`,
    description: k.data.einleitung.join(' '),
    url: `${basis}/${k.id}`,
    sameAs: [k.data.website],
    logo: k.data.logo.src,
    image: bild,
    servesCuisine: k.data.kueche,
    containedInPlace: { '@id': `${basis}/#foodcourt` },
    acceptsReservations: site.reservierungUrl,
    ...ort(),
    hasMenu: {
      '@type': 'Menu',
      name: `Speisekarte ${k.data.name}`,
      hasMenuSection: k.data.karten.map((karte) => ({
        '@type': 'MenuSection',
        name: `${karte.titel} (${karte.zeit})`,
        hasMenuSection: karte.sektionen
          .filter((s) => !istPlatzhalter(s.titel))
          .map((s) => ({
            '@type': 'MenuSection',
            name: s.titel,
            hasMenuItem: s.gerichte
              .filter((g) => !istPlatzhalter(g.name))
              .map((g) => ({
                '@type': 'MenuItem',
                name: g.name,
                description: g.beschreibung ?? undefined,
                offers:
                  g.preis === null
                    ? undefined
                    : { '@type': 'Offer', price: g.preis.toFixed(2), priceCurrency: 'EUR' },
              })),
          })),
      })),
    },
  };
}
