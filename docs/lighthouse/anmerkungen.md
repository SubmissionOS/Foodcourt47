## Anmerkung zum Messaufbau

Jeder Lauf startet einen frischen Chrome. In einer früheren Fassung des Runners teilten sich alle 24 Läufe einen Browserprozess. Dabei fiel „Galerie, mobil“ in zwei vollständigen Durchläufen reproduzierbar auf 99 (LCP 2,03 s), während dieselbe Seite einzeln oder in kurzen Folgen immer 100 erreichte (LCP 1,65 s). Der Zustand des Browserprozesses verfälschte also den 13. Lauf, nicht die Seite. Seit der Umstellung auf einen frischen Browser je Lauf liegt jeder Wert bei 100.
