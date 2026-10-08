# Foodcourt47 Hammerbrook: Designkonzept (GuddiWeb-Entwurf, Runde 2)

Das erste Konzept (Abfahrtstafel, Gleise, Monospace) ist verworfen. Maßstab sind jetzt restaurant-beaucoco.com, dasloftwien.at und laperouse.com.

## Idee in drei Sätzen
Foodcourt47 ist ein Abendessen unter Freunden, bei dem jeder etwas anderes bestellt und alle am selben Tisch sitzen.
Die Seite erzählt das wie ein Hospitality-Magazin: große, warme Fotos, wenige Worte und eine Serifenschrift, die nach Menükarte und Tischdecke klingt.
Die drei Küchen bekommen jeweils ihre eigene Bildwelt und einen leisen Farbton, das Haus selbst bleibt in tiefem Grün und Creme.

## Palette
| Rolle | Hex | Einsatz |
|---|---|---|
| Kiefer (Grund dunkel) | `#1E2A24` | Header nach dem Scrollen auf dunklen Seiten, Mittagsband, Footer |
| Creme (Grund hell) | `#F4EEE4` | Seitenhintergrund |
| Leinen | `#E8DFD0` | ruhige Flächen, Bildhintergründe |
| Tinte | `#1D1B18` | Text |
| Messing | `#9C7A4B` | Linien, kursive Akzente, Button-Hover |
| Rauch | `#5F584E` | Nebentext (Kontrast 6,3:1 auf Creme) |

Leise Küchenakzente, nur für dünne Linien und kursive Wörter: Cucino Olive `#6F7748`, Manju Safran `#A8692C`, Sushify Pflaume `#7E4058`.

## Schriften
- **Cormorant Garamond** 400/500/600 und Kursiv (selbst gehostet über Fontsource) für Headlines, Gerichtnamen und Preise.
- **Jost** 300/400/500 (selbst gehostet) für Fließtext, Navigation und Buttons.

## Startseiten-Ablauf
```
┌──────────────────────────────────────────────┐
│ Logo        Küchen  Karte  Mittag … [Reserv.]│  transparent auf dem Foto
│                                              │
│          VOLLBILDFOTO Gastraum               │  leichter Parallax
│   Drei Küchen.                               │
│   Ein Tisch.          (Serif, kursiv)        │
│   Ein Satz.   [Tisch reservieren]  Karte →   │
└──────────────────────────────────────────────┘
        Kurzer Einleitungssatz, zentriert, groß
┌────────────────────────┐
│ Pizza-Foto (groß)      │   Italienisch
│                        │   Cucino Italiano
└────────────────────────┘   zwei Sätze · Zur Karte
   Indisch               ┌────────────────────────┐
   Manju                 │ Curry-Foto (Altseite)  │
   zwei Sätze            └────────────────────────┘
┌────────────────────────┐
│ Sushi-Foto (Altseite)  │   Japanisch · Sushify
└────────────────────────┘
████ Mittagsband in Kiefer: „Mo–Fr 11–16 Uhr, ab 7,50 €“ ████
[foto][foto][foto][foto][foto]  Galerie-Streifen, quer scrollbar
┌──────────────────────────────────────────────┐
│ Foto geteilter Tisch · „Reservieren Sie …“   │  Abschluss
└──────────────────────────────────────────────┘
Footer in Kiefer
```

## Layout-Prinzip
Bild und Text wechseln sich ab, nie mehr als zwei Elemente pro Bildschirm. Bilder sind groß und unterschiedlich geschnitten, Texte kurz und mit viel Luft. Bewegung ist weich: Bilder blenden beim Scrollen ein, der Hero hat leichten Parallax. Bei `prefers-reduced-motion` fällt beides weg.

## Fotos
Echte Fotos: die vier Fotos der Altseite (foodcourt47.de/wp-content/uploads/2023/02/) und die Sushify-Produktfotos (sushify.de/wp-content/uploads/2021/04/).

Stockfotos sind im Code und in `src/content/fotos.json` mit `PLACEHOLDER_PHOTO` markiert und sollen durch eigene Fotos ersetzt werden. Alle stammen von Unsplash (Unsplash License, Hotlink):

| Schlüssel | Motiv | Quelle | Credit |
|---|---|---|---|
| hero-gastraum | Gastraum am Abend, dunkles Holz | images.unsplash.com/photo-1517248135467-4c7edcad34c4 | [Fotograf:in eintragen] |
| cucino-pizza | Neapolitanische Pizza mit Basilikum | images.unsplash.com/photo-1574071318508-1cdbab80d002 | [Fotograf:in eintragen] |
| cucino-pasta | Penne mit Tomatensauce | images.unsplash.com/photo-1621996346565-e3dbc646d9a9 | [Fotograf:in eintragen] |
| manju-currys | Zwei Currys in Kupferschalen | images.unsplash.com/photo-1585937421612-70a008356fbe | [Fotograf:in eintragen] |
| manju-samosa | Samosas mit Chili | images.unsplash.com/photo-1601050690597-df0568f70950 | [Fotograf:in eintragen] |
| tisch-teilen | Gedeckter Tisch, mehrere Gerichte | images.unsplash.com/photo-1424847651672-bf20a4b0982b | [Fotograf:in eintragen] |
| abend-tisch | Teller und Gläser am Abend | images.unsplash.com/photo-1414235077428-338989a2e8c0 | [Fotograf:in eintragen] |
