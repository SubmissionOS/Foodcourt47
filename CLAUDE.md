# Projektregeln

Dies ist ein GuddiWeb-Gastronomieprojekt. Lade vor jeder Arbeit an Seiten, Layouts oder Komponenten den Skill `guddiweb-restaurant-sites` und halte dich an seine Regeln. Falls der Skill nicht verfügbar ist, gelten diese Regeln direkt:

- Echte Multi-Page-Website (Astro + TypeScript), nie One-Pager. Inhalte in Markdown/JSON unter src/content, damit der Kunde sie leicht ändern lässt.
- Kein Template-Look: keine identischen Karten-Raster, keine Standard-Hero mit Zahl und Verlauf, kein Creme-Terracotta, kein Schwarz mit Neongrün.
- Vor dem Code: Designidee aus der Welt des Ladens in 3 Sätzen, Palette (4–6 Hex-Werte), 1–2 Schriften (selbst gehostet oder Google Fonts), Layout-Prinzip.
- Eine auffällige Sache pro Seite, der Rest ruhig. Bewegung sparsam, prefers-reduced-motion respektieren.
- Speisekarte immer als echte HTML-Seite mit Preisen, nie als PDF-Link. Google-lesbar: Schema.org Restaurant, Öffnungszeiten, Meta-Tags, Sitemap.
- Mobile-first, sichtbarer Tastaturfokus, WCAG-Kontrast, Bilder mit Alt-Text und lazy loading.
- Nichts erfinden: nicht belegte Angaben als sichtbarer Platzhalter in [eckigen Klammern].
- Texte: Deutsch, aktiv, konkret, keine KI-Floskeln, keine Gedankenstriche als Stilmittel.
- Kleine Commits pro Schritt. Am Ende `npm run build` ausführen und Fehler beheben.
