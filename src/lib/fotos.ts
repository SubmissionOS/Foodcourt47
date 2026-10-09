import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

// Alle Fotos liegen lokal in src/assets/fotos/<id>.jpg und werden beim Build in AVIF, WebP und JPEG umgerechnet.
const dateien = import.meta.glob<{ default: ImageMetadata }>('/src/assets/fotos/*.{jpg,jpeg,png}', { eager: true });

export interface Foto {
  id: string;
  alt: string;
  /** Stockfoto, später durch eigenes Foto ersetzen (PLACEHOLDER_PHOTO) */
  stock: boolean;
  quelle: string;
  bild: ImageMetadata;
  breite: number;
  hoehe: number;
}

let register: Map<string, { alt: string; stock: boolean; quelle: string }> | undefined;

export async function foto(id: string): Promise<Foto> {
  register ??= new Map((await getCollection('fotos')).map((e) => [e.id, e.data]));
  const eintrag = register.get(id);
  if (!eintrag) throw new Error(`Foto "${id}" fehlt in src/content/fotos.json`);
  const datei = dateien[`/src/assets/fotos/${id}.jpg`];
  if (!datei) throw new Error(`Datei src/assets/fotos/${id}.jpg fehlt`);
  return { id, ...eintrag, bild: datei.default, breite: datei.default.width, hoehe: datei.default.height };
}

export type Format = 'avif' | 'webp';
export type Art = 'normal' | 'hero';

/** Qualität je Format. Hero-Fotos liegen unter einem dunklen Verlauf und vertragen mehr Kompression. */
const qualitaet = (format: Format | 'jpg', art: Art): number => {
  const basis = { avif: 46, webp: 66, jpg: 70 }[format];
  return art === 'hero' ? basis - 8 : basis;
};

export interface Bildsatz {
  quellen: { type: string; srcset: string }[];
  fallback: { src: string };
}

/** Bildquellen für <picture>: AVIF und WebP mit mehreren Breiten, dazu ein JPEG als Rückfall. */
export async function bildsatz(f: Foto, widths: number[], art: Art = 'normal'): Promise<Bildsatz> {
  const formate: Format[] = ['avif', 'webp'];
  const quellen = await Promise.all(
    formate.map(async (format) => {
      const r = await getImage({ src: f.bild, widths, format, quality: qualitaet(format, art) });
      return { type: `image/${format}`, srcset: r.srcSet.attribute };
    }),
  );
  const mitte = widths[Math.min(1, widths.length - 1)];
  const fallback = await getImage({ src: f.bild, width: mitte, format: 'jpg', quality: qualitaet('jpg', art) });
  return { quellen, fallback: { src: fallback.src } };
}

/** Attribute für <link rel="preload" as="image">, identisch zu den AVIF-Quellen von bildsatz(). */
export async function vorladenAttribute(f: Foto, widths: number[], sizes: string, art: Art = 'normal') {
  const r = await getImage({ src: f.bild, widths, format: 'avif', quality: qualitaet('avif', art) });
  return { href: r.src, imagesrcset: r.srcSet.attribute, imagesizes: sizes, type: 'image/avif' };
}

/** Breiten und Größenangaben der Hero-Bilder, an einer Stelle gepflegt (Komponente und Preload nutzen sie gemeinsam). */
export const HERO = {
  seite: { widths: [640, 1024, 1600, 2400], sizes: '100vw' },
  start: { widths: [280, 480, 800, 1200], sizes: '34vw' },
} as const;

/** Open-Graph-Bild: 1200×630 als JPEG, absolute URL. */
export async function ogBild(id: string, site: URL | undefined) {
  const f = await foto(id);
  const r = await getImage({ src: f.bild, width: 1200, height: 630, fit: 'cover', format: 'jpg', quality: 78 });
  return { url: new URL(r.src, site).href, breite: 1200, hoehe: 630, alt: f.alt };
}
