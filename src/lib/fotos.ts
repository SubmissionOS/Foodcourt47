import { getCollection, type CollectionEntry } from 'astro:content';

export type Foto = CollectionEntry<'fotos'>['data'] & { id: string };

let cache: Map<string, Foto> | undefined;

export async function foto(id: string): Promise<Foto> {
  if (!cache) {
    cache = new Map((await getCollection('fotos')).map((f) => [f.id, { ...f.data, id: f.id }]));
  }
  const f = cache.get(id);
  if (!f) throw new Error(`Foto "${id}" fehlt in src/content/fotos.json`);
  return f;
}

const istUnsplash = (src: string) => src.startsWith('https://images.unsplash.com/');

/** URL in passender Breite. Unsplash skaliert serverseitig, andere Quellen bleiben unverändert. */
export function url(f: Foto, breite: number): string {
  return istUnsplash(f.src) ? `${f.src}?auto=format&fit=crop&q=75&w=${breite}` : f.src;
}

export function srcset(f: Foto): string | undefined {
  if (!istUnsplash(f.src)) return undefined;
  return [640, 960, 1400, 2000, 2600].map((b) => `${url(f, b)} ${b}w`).join(', ');
}
