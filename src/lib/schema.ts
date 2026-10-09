import type { CollectionEntry } from 'astro:content';
import { site } from './site';
import { ogBild } from './fotos';

type Kueche = CollectionEntry<'kuechen'>;

const basis = site.url;
const basisUrl = new URL(basis);

/** "040 22 68 99999" wird zu "+49 40 22 68 99999" (international, wie Suchmaschinen es erwarten). */
const telefonIntern = site.telefon.replace(/^0/, '+49 ');

/** Gemeinsame Ortsangaben. */
function ort() {
  return {
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.strasse,
      postalCode: site.adresse.plz,
      addressLocality: site.adresse.ort,
      addressCountry: 'DE',
    },
    telephone: telefonIntern,
    email: site.email,
  };
}

const reservierung = {
  '@type': 'ReserveAction',
  target: { '@type': 'EntryPoint', urlTemplate: `${basis}/reservieren`, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] },
  result: { '@type': 'Reservation', name: 'Tischreservierung' },
};

/** Restaurant auf der Startseite, mit Öffnungszeiten, Küchen und Link zur Speisekarte. */
export async function foodcourtSchema(kuechen: Kueche[]) {
  const bild = await ogBild('cucino-pizza', basisUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${basis}/#foodcourt`,
    name: site.name,
    description: site.beschreibung,
    url: basis,
    logo: site.logo.src,
    image: bild.url,
    servesCuisine: kuechen.map((k) => k.data.kueche),
    hasMenu: `${basis}/speisekarte`,
    acceptsReservations: `${basis}/reservieren`,
    potentialAction: reservierung,
    ...ort(),
    openingHoursSpecification: site.oeffnungszeiten.map((z) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: z.schemaTage.map((t) => `https://schema.org/${t}`),
      opens: z.von,
      closes: z.bis,
    })),
    department: kuechen.map((k) => ({ '@id': `${basis}/${k.id}#restaurant` })),
  };
}

/** Menu, MenuSection und MenuItem einer Küche (Mittags- und Abendkarte). */
export function menuSchema(k: Kueche) {
  return {
    '@type': 'Menu',
    '@id': `${basis}/${k.id}#karte`,
    name: `Speisekarte ${k.data.name}`,
    inLanguage: 'de',
    url: `${basis}/${k.id}`,
    hasMenuSection: k.data.karten.map((karte) => ({
      '@type': 'MenuSection',
      name: `${karte.titel} (${karte.zeit})`,
      hasMenuSection: karte.sektionen.map((s) => ({
        '@type': 'MenuSection',
        name: s.titel,
        hasMenuItem: s.gerichte.map((g) => ({
          '@type': 'MenuItem',
          name: g.name,
          ...(g.beschreibung ? { description: g.beschreibung } : {}),
          ...(g.preis === null ? {} : { offers: { '@type': 'Offer', price: g.preis.toFixed(2), priceCurrency: 'EUR' } }),
        })),
      })),
    })),
  };
}

export async function kuecheSchema(k: Kueche) {
  const bild = await ogBild(k.data.fotos[0], basisUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${basis}/${k.id}#restaurant`,
    name: `${k.data.name} im ${site.name}`,
    description: k.data.einleitung.join(' '),
    url: `${basis}/${k.id}`,
    sameAs: [k.data.website],
    logo: k.data.logo.src,
    image: bild.url,
    servesCuisine: k.data.kueche,
    containedInPlace: { '@id': `${basis}/#foodcourt` },
    acceptsReservations: `${basis}/reservieren`,
    potentialAction: reservierung,
    ...ort(),
    hasMenu: menuSchema(k),
  };
}

/** Alle Speisekarten auf /speisekarte. */
export function speisekarteSchema(kuechen: Kueche[]) {
  return kuechen.map((k) => ({
    '@context': 'https://schema.org',
    ...menuSchema(k),
    '@id': `${basis}/speisekarte#${k.id}`,
    url: `${basis}/speisekarte#${k.id}`,
    provider: { '@id': `${basis}/${k.id}#restaurant` },
  }));
}
