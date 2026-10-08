import site from '../content/site.json';
import { istPlatzhalter } from './format';

export { site };

export interface NavPunkt {
  href: string;
  label: string;
  linie?: string;
}

export const navigation: NavPunkt[] = [
  { href: '/speisekarte', label: 'Speisekarte' },
  { href: '/mittag', label: 'Mittag' },
  { href: '/cucino-italiano', label: 'Cucino Italiano', linie: 'cucino-italiano' },
  { href: '/manju', label: 'Manju', linie: 'manju' },
  { href: '/sushify', label: 'Sushify', linie: 'sushify' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/kontakt', label: 'Kontakt' },
];

/** Adresse nur ausgeben, wenn sie belegt ist. */
export function adresseBelegt(): boolean {
  const a = site.adresse;
  return !istPlatzhalter(a.strasse) && !istPlatzhalter(a.plz);
}

/** Öffnungszeiten als Zeilen, z. B. "Montag bis Freitag 11:00–22:30" */
export const zeiten: string[] = site.oeffnungszeiten.map((z) => `${z.tage} ${z.von}–${z.bis}`);

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}`,
)}`;
