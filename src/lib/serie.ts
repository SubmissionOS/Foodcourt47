/** Die drei Hero-Fotos der Startseite, als Serie gedacht (gleiche Behandlung in HeroStart und KuechenWahl). */
export interface SerienFoto {
  /** Küchen-id, entspricht der Route */
  id: string;
  wort: string;
  /** Schlüssel aus src/content/fotos.json */
  foto: string;
}

export const serie: SerienFoto[] = [
  { id: 'cucino-italiano', wort: 'Pizza', foto: 'cucino-pizza' },
  { id: 'manju', wort: 'Curry', foto: 'manju-currys' },
  { id: 'sushify', wort: 'Sushi', foto: 'sushify-goldify' },
];
