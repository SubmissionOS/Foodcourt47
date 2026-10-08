// Zeitlogik für die Live-Anzeigen. Läuft im Build und im Browser, immer in Europe/Berlin.

export const MITTAG_VON = 11 * 60;
export const MITTAG_BIS = 16 * 60;
export const ABEND_AB = 17 * 60;

export const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'] as const;
export const TAGE_KURZ = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'] as const;

export interface Jetzt {
  /** 0 = Sonntag … 6 = Samstag */
  tag: number;
  /** Minuten seit Mitternacht */
  minuten: number;
  uhrzeit: string;
  datum: string;
}

export function berlinJetzt(d: Date = new Date()): Jetzt {
  const teile = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(d);
  const wert = (t: string) => teile.find((p) => p.type === t)?.value ?? '';
  const stunde = Number(wert('hour'));
  const minute = Number(wert('minute'));
  const tag = TAGE_KURZ.indexOf(wert('weekday').replace('.', '') as (typeof TAGE_KURZ)[number]);
  const datum = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    day: 'numeric',
    month: 'long',
  }).format(d);
  return {
    tag,
    minuten: stunde * 60 + minute,
    uhrzeit: `${String(stunde).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    datum,
  };
}

export type Phase = 'vorher' | 'laeuft' | 'vorbei' | 'wochenende';

export interface MittagStatus {
  phase: Phase;
  /** Kurzer Text für die Statusspalte der Tafel */
  kurz: string;
  /** Ganzer Satz für Fließtext */
  satz: string;
}

function naechsterWerktag(tag: number): number {
  // Freitag, Samstag, Sonntag springen auf Montag
  if (tag >= 5 || tag === 0) return 1;
  return tag + 1;
}

export function mittagStatus(j: Jetzt): MittagStatus {
  const werktag = j.tag >= 1 && j.tag <= 5;
  if (!werktag) {
    return {
      phase: 'wochenende',
      kurz: 'Mo 11:00',
      satz: 'Am Wochenende gibt es kein Mittagsangebot. Montag ab 11 Uhr geht es weiter.',
    };
  }
  if (j.minuten < MITTAG_VON) {
    return {
      phase: 'vorher',
      kurz: 'ab 11:00',
      satz: `Heute, ${TAGE[j.tag]}, startet das Mittagsangebot um 11 Uhr.`,
    };
  }
  if (j.minuten < MITTAG_BIS) {
    const rest = MITTAG_BIS - j.minuten;
    const restText = rest <= 60 ? `noch ${rest} Minuten` : 'bis 16 Uhr';
    return {
      phase: 'laeuft',
      kurz: 'jetzt',
      satz: `Das Mittagsangebot läuft gerade, ${restText}.`,
    };
  }
  const morgen = naechsterWerktag(j.tag);
  const wann = morgen === j.tag + 1 ? 'Morgen' : TAGE[morgen];
  return {
    phase: 'vorbei',
    kurz: `${TAGE_KURZ[morgen]} 11:00`,
    satz: `Das Mittagsangebot ist für heute vorbei. ${wann} ab 11 Uhr wieder.`,
  };
}

/** Status der Cucino-Abendkarte (ab 17 Uhr belegt, Ende unbekannt). */
export function abendLaeuft(j: Jetzt): boolean {
  return j.minuten >= ABEND_AB;
}
