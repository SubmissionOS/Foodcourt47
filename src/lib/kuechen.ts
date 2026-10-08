import { getCollection, type CollectionEntry } from 'astro:content';

export type Kueche = CollectionEntry<'kuechen'>;

export async function alleKuechen(): Promise<Kueche[]> {
  return (await getCollection('kuechen')).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
}

export function mittagskarte(k: Kueche) {
  return k.data.karten.find((c) => c.id === 'mittag');
}

export function mittagsgerichte(k: Kueche) {
  return mittagskarte(k)?.sektionen.flatMap((s) => s.gerichte) ?? [];
}

/** Günstigster belegter Mittagspreis einer oder aller Küchen. */
export function abPreis(kuechen: Kueche[]): number | null {
  const preise = kuechen.flatMap(mittagsgerichte).map((g) => g.preis).filter((p): p is number => p !== null);
  return preise.length ? Math.min(...preise) : null;
}
