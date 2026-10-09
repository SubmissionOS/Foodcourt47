import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const gericht = z.object({
  nr: z.string().optional(),
  name: z.string(),
  beschreibung: z.string().nullable(),
  preis: z.number().nullable(),
});

const karte = z.object({
  id: z.string(),
  titel: z.string(),
  zeit: z.string(),
  hinweis: z.string().optional(),
  sektionen: z.array(z.object({ titel: z.string(), gerichte: z.array(gericht) })),
});

const kuechen = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/kuechen' }),
  schema: z.object({
    name: z.string(),
    reihenfolge: z.number(),
    kategorie: z.string(),
    kueche: z.string(),
    claim: z.string(),
    /** Zwei Sätze für den Küchen-Abschnitt der Startseite */
    kurztext: z.string(),
    einleitung: z.array(z.string()),
    website: z.url(),
    logo: z.object({ src: z.string(), alt: z.string(), breite: z.number(), hoehe: z.number() }),
    /** Schlüssel aus fotos.json, das erste ist das Hero-Foto */
    fotos: z.array(z.string()).min(1),
    karten: z.array(karte),
  }),
});

const fotos = defineCollection({
  loader: file('./src/content/fotos.json'),
  schema: z.object({
    src: z.string(),
    breite: z.number(),
    hoehe: z.number(),
    alt: z.string(),
    /** Stockfoto, später durch eigenes Foto ersetzen (PLACEHOLDER_PHOTO) */
    stock: z.boolean(),
    hinweis: z.string().optional(),
  }),
});

const galerie = defineCollection({
  loader: file('./src/content/galerie.json'),
  schema: z.object({ foto: z.string(), kueche: z.string().optional() }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/seiten' }),
  schema: z.object({ titel: z.string(), stand: z.string() }),
});

export const collections = { kuechen, fotos, galerie, seiten };
