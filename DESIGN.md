# Foodcourt47 Hammerbrook: Designkonzept (GuddiWeb-Entwurf)

## Idee in drei Sätzen
Hammerbrook ist ein Viertel aus Bürohäusern, Kanälen und dem S-Bahn-Viadukt. Wer hier mittags essen geht, liest Fahrpläne, Gleisschilder und Abfahrtstafeln.
Foodcourt47 wird deshalb als Bahnhof mit drei Gleisen gestaltet: Cucino Italiano, Manju und Sushify fahren auf je einem Gleis mit eigener Linienfarbe.
Eine echte Abfahrtstafel auf der Startseite zeigt live nach Hamburger Zeit, was gerade „abfährt“: welches Mittagsgericht jetzt gilt und wann das nächste Angebot startet.

## Palette
| Rolle | Hex | Einsatz |
|---|---|---|
| Kanalnebel (Grund) | `#E6E9E8` | Seitenhintergrund, kühles Hellgrau statt Creme |
| Viadukt (Tinte) | `#121A1F` | Text, Tafel, Linien |
| Gleis 1 Cucino | `#1E5A44` | Flaschengrün aus dem Cucino-Logo |
| Gleis 2 Manju | `#B7312A` | Zinnoberrot aus dem Manju-Logo |
| Gleis 3 Sushify | `#A3206F` | Magenta aus dem Sushify-Logo |
| Signalgelb | `#F2C230` | nur „jetzt“-Markierung und Fokusring |

## Schriften
- **Overpass** (selbst gehostet, Fontsource). Abgeleitet von der US-Autobahnschrift Highway Gothic: Beschilderung, kein Agentur-Standard.
- **Overpass Mono** für Tafel, Uhrzeiten und Preise mit festen Ziffernbreiten.

## Layout-Prinzip
Fahrplanraster: Inhalte stehen in waagerechten Zeilen, getrennt von kräftigen Linien. Links steht eine schmale Kennspalte (Gleis, Uhrzeit, Nummer), rechts der Inhalt. Keine abgerundeten Karten, keine gleichförmigen Kachelraster. Jede Seite hat genau ein auffälliges Element (Tafel, Wochenfahrplan, farbiges Gleisschild), alles andere bleibt ruhig. Bewegung gibt es nur einmal: Die Tafel blättert beim Laden um. Bei `prefers-reduced-motion` entfällt das.
