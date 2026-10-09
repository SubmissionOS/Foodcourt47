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

## Hero der Startseite (Runde 3)
Das Muster „kleiner Ort über der Headline, Wechsel normal/kursiv, unten links Headline, Einzeiler und zwei Buttons“ ist entfernt, ebenso Überzeilen und kursive Schlusswörter auf allen Seiten.

Zwei Varianten wurden gebaut und bei 1440 px und 390 px verglichen:
- **A, zentriert:** „Drei Küchen unter einem Dach“ mittig, Button darunter. Ruhig, aber austauschbar: So könnte jedes Restaurant beginnen, und die dreizeilige Headline füllt die Bildmitte wie ein Plakat.
- **B, asymmetrisch (gewählt):** „Pizza, Curry“ links oben, „und Sushi.“ rechts darunter, über die ganze Bildbreite gesetzt, der eine Button rechts unter der zweiten Zeile. Die Headline nennt sofort, was es gibt, die Diagonale führt das Auge durch das Foto zum Reservieren-Button, und das Layout funktioniert auch auf 390 px.

Die Speisekarte erreicht man über die Navigation. Ein dezenter Hinweis „Entdecken“ am unteren Rand führt zum Inhalt.

## Hero-Varianten zum Vergleich (Runde 4)
Vergleichsseiten, nicht in der Navigation, `noindex` und nicht in der Sitemap: `/hero-a`, `/hero-b`, `/hero-c`. Die Startseite ist unverändert. Screenshots (1920×1080 und 390 px) liegen in `docs/hero-vergleich/`. Komponente: `src/components/HeroVariante.astro`.

Alle drei: Foodfotos statt Restaurant-Interieur, dunkler Verlauf hinter der Schrift, kein Label über der Headline, kein Wechsel normal/kursiv, ein Reservieren-Button.

| | A | B | C |
|---|---|---|---|
| Schrift | Archivo Black, Versalien | Fraunces, fett, „weich“ (SOFT 100, WONK) | Inter Tight Black, Mischschrift |
| Headline | PIZZA, CURRY UND SUSHI | Hier isst jeder, was er mag. | Pizza. Curry. Sushi. |
| Foto | Triptychon: Pizza, Curry, Sushi nebeneinander | ein Curry-Foto, vollflächig | Foto wechselt je Wort (Hover, Fokus, mobil automatisch alle 2,8 s) |

**A:** Wirkt am meisten nach Foodcourt, nach Beschilderung und Markthalle statt Hochzeit. Das Triptychon zeigt alle drei Küchen sofort, die Headline füllt fast die Bildbreite und sitzt unten links. Schwäche: Das Sushi-Feld ist vor allem schwarz mit einem kleinen Röllchen, weil das Sushify-Material nur 500×350 px misst. Mit eigenem Foto in Bildschirmgröße würde A noch deutlich stärker.

**B:** Warm, appetitlich und ruhig, am nächsten an einem Restaurant. Die weiche Fraunces hat Charakter und wirkt nicht mehr wie Buchdruck. Sie sagt aber nichts über die Küchen aus, die Headline funktioniert für jedes Restaurant, und das Foto zeigt nur eine Küche (Curry). Die sicherste, aber nicht die unverwechselbarste Wahl.

**C:** Die interaktivste Variante, und die einzige, die die drei Küchen als Auswahl erlebbar macht. Jedes Wort ist ein Link zur Küche. Schwächen: Der erste Eindruck (Pizza) gewichtet eine Küche vor den anderen, und mobil bedeutet die Automatik Bewegung, die manche stört (bei `prefers-reduced-motion` bleibt sie aus). Das Sushi-Bild steht auf Schwarz und ist klein.

**Einschätzung:** A als Hero der Startseite, C als Idee für den Abschnitt „Drei Küchen“ darunter. B, wenn der Inhaber ein ruhigeres, klassischeres Auftreten will. Entscheidung offen.

**Fotos:**
- Pizza: Unsplash, `cucino-pizza`, mit `PLACEHOLDER_PHOTO` markiert.
- Curry: Unsplash, `manju-currys`, mit `PLACEHOLDER_PHOTO` markiert.
- Sushi: `sushify.de/wp-content/uploads/2021/04/1504-Goldify.jpg`, echtes Foto, aber nur 500×350 px. Alle Fotos dieser Serie haben dieses Format und zeigen eine Rolle auf reinem Schwarz. Deshalb steht es auf einem schwarzen Feld statt vollflächig.

## Hero-Serie der Startseite: Fotos und Credits (Runde 5)
Hero (Triptychon) und Küchen-Abschnitt nutzen dieselben drei Fotos, alle Unsplash (Unsplash License, Hotlink), alle als `PLACEHOLDER_PHOTO` in `src/content/fotos.json` markiert und später durch eigene Fotos zu ersetzen.

| Küche | Schlüssel | Foto |
|---|---|---|
| Pizza | `cucino-pizza` | images.unsplash.com/photo-1574071318508-1cdbab80d002 |
| Curry | `manju-currys` | images.unsplash.com/photo-1585937421612-70a008356fbe |
| Sushi | `sushi-hero` | images.unsplash.com/photo-1611143669185-af224c5e3252 |

**Credits:** Die Namen der Fotograf:innen sind nicht ermittelt. Die Hotlink-IDs lassen sich ohne Unsplash-API-Schlüssel nicht zu Foto-Seiten auflösen, die Suche und der direkte Abruf brachten kein Ergebnis. Vor dem Livegang ersetzen wir die Fotos ohnehin oder tragen die Credits über die Unsplash-API nach.

**Sushi-Foto:** Gewählt wurde eine scharfe Aufsicht auf eine Sushi-Platte (schwarzer Schiefer, Holztisch), weil Pizza und Curry ebenfalls von oben fotografiert sind. Ein erster Kandidat mit extrem flacher Schärfentiefe (Seitenansicht) war als Vollbild zu unscharf und wurde verworfen. Die Sushify-Produktfotos (500×350 px, Schwarz) bleiben auf der Sushify-Speisekarte, dort klein.

## Schriftsystem (Runde 5)
Die Cormorant-Serif ist komplett ersetzt, auf allen 12 Seiten. Eine Familie für alles, was groß ist:
- **Archivo** (selbst gehostet, Fontsource), Token `--display`: Hero-Headlines und Seiten-Hero 900 in Versalien, Abschnitts-Überschriften 800 in Normalschreibung, Gerichtnamen, Preise und Zwischentitel der Karte 700 bis 800, Logo 900 mit „47“ in 400.
- **Jost** (300 bis 500) bleibt für Fließtext, Navigation und Buttons.
- Keine Kursivschnitte mehr. Betonungen (`<em>`) sind halbfett statt kursiv.
- Rechtsseiten (Impressum, Datenschutz) setzen die Überschrift in Normalschreibung, weil „DATENSCHUTZERKLÄRUNG“ in Versalien auf 390 px überlaufen würde.
