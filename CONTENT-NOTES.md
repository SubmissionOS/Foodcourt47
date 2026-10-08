# Ergänzte Inhalte (nicht belegt)

Für den Akquise-Entwurf sind alle Platzhalter durch plausible Inhalte ersetzt. Die folgenden Angaben stammen **nicht** vom Kunden und müssen vor dem Livegang bestätigt oder korrigiert werden. Alles andere ist belegt (foodcourt47.de, Impressum, Manju-Speisekarte der Altseite, Sushify-Speisekarte 07/2023).

## Stammdaten (`src/content/site.json`)
| Angabe | Wert | Herkunft |
|---|---|---|
| Adresse | Hammerbrookstraße 47, 20097 Hamburg | Adresse von sushify.de, für den Foodcourt nicht bestätigt |
| Telefon | 040 22 68 99999 | Nummer von sushify.de, für den Foodcourt nicht bestätigt |
| E-Mail | info@foodcourt47.de | Vorgabe GuddiWeb, nicht bestätigt |
| Öffnungszeiten | Mo–Fr 11:00–22:30, Sa 16:30–22:30, So 13:00–22:30 | Vorgabe GuddiWeb (Abendzeiten angelehnt an sushify.de) |
| Abendkarte | ab 17 Uhr für alle Küchen | belegt nur für Cucino, für Manju und Sushify übernommen |
| Anfahrt | S-Bahn Hammerbrook (S3, S5), wenige Gehminuten; Parken in umliegenden Straßen und Parkhäusern | Gehzeit und Parksituation nicht geprüft |

## Speisekarten
- **Cucino Italiano, Abendkarte** (`cucino-italiano.json`): komplett ergänzt, 15 Gerichte mit Preisen: Antipasti (Bruschetta 6,50, Insalata Caprese 8,90), Pizza (Margherita 9,50 bis Quattro Formaggi 13,50), Pasta (Aglio e Olio 10,50 bis Lasagne 13,90), Dolci (Tiramisù 6,50, Panna Cotta 5,90).
- **Manju, Abendkarte** (`manju.json`): Gerichte und Beschreibungen sind belegt (Manju-Speisekarte), **alle Preise ergänzt**: Chicken Pakora 6,90, Samosa 5,90, Veg. Pakora 5,90, Chicken Madras 14,90, Chicken Saag 14,90, Beef Curry 16,50, Beef Saag 16,50, Kicher Curry 12,90, Palak Paneer 13,90. Hinweis „Alle Currys mit Basmatireis“ ist ergänzt (belegt nur für Chicken Madras).
- **Sushify, Karte** (`sushify.json`): Preise belegt, aber Stand Juli 2023. Der Hinweis darauf wird auf der Seite nicht mehr angezeigt. Die Überschrift „täglich“ ist ergänzt.

## Texte auf den Seiten
- **Gruppen** (`/reservieren`): „Für Gruppen ab acht Personen und für Feiern rufen Sie uns bitte an …“
- **Allergene** (`/speisekarte`): „Informationen zu Allergenen und Zusatzstoffen erhalten Sie vor Ort bei unserem Team.“ Die Allergenkennzeichnung muss vor dem Livegang aus den echten Karten übernommen werden.
- **Datenschutz** (`src/content/seiten/datenschutz.md`): Entwurfstext mit Stand Oktober 2026, unter anderem Speicherdauer der Server-Logs (14 Tage) angenommen. Muss fachkundig geprüft werden.
- **Kontakt**: Statt eingebetteter Karte ein Link „Route planen“ zu Google Maps (kein Embed, damit keine Einwilligung nötig ist).

## Impressum
Nur belegte Angaben. **Weggelassen**, weil nicht belegt: USt-IdNr., Telefon und E-Mail im Impressum, Hinweise zur Streitschlichtung. Vor dem Livegang ergänzen, da Pflichtangaben.

## Fotos
Stockfotos sind in `src/content/fotos.json` mit `PLACEHOLDER_PHOTO` markiert, Liste in DESIGN.md.
