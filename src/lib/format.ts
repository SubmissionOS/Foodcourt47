const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export function preis(wert: number | null): string {
  return wert === null ? '[Preis]' : euro.format(wert);
}

/** Erkennt Platzhalter in eckigen Klammern. */
export function istPlatzhalter(text: string | null | undefined): boolean {
  return !!text && /\[[^\]]+\]/.test(text);
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Escaped Text, Platzhalter in eckigen Klammern werden sichtbar markiert. */
export function markiere(text: string): string {
  const sicher = text.replace(/[&<>"]/g, (z) => ESC[z]);
  return sicher.replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`);
}
