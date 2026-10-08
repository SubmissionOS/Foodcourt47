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
