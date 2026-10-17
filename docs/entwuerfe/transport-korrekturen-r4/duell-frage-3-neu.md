# Duell „Spedition und Fracht“: neue Formulierung für Frage 3 und die SZR-Aussage in Frage 4 (Paket P-AH Teil A)

Stand 17.10.2026, Vorschlag für die Datei `apps/api/src/db/content/game-kennzahlen-duell-spedition-fracht.ts` und das Prüfblatt 16. Alles ist ein Entwurf (R4), nicht eingespielt. Aufbau wie im Bestand (zwei Antworten A und B, `richtig`, `feedbackRichtig`, `feedbackFalsch`); keine Zahlen, keine Paragrafen, kein Wort „Euro“ oder „Europa“ (der Test des Duells verbietet es), Verweis „siehe Thema 1.4“ wie bisher. Der Wegfall der Haftungsgrenze steht in Theorie 1.4 (Abschnitt „Wegfall der Haftungsgrenzen: Vorsatz und Leichtfertigkeit mit Bewusstsein“) nach Einspielen der Ergänzung und in „Haftungsgrenzen und Haftungsausschlüsse im Frachtrecht“ nach den Ersetzungen. Die Rechtsaussage ist in `rechtsangaben-a.md` Zeilen 23 bis 25 belegt (HGB am Gesetzestext bestätigt, CMR gelesen). Die richtige Antwort bleibt B, damit sich die Positionsverteilung des Duells nicht ändert.

## Frage 3 (Zeilen 73 bis 80 der Duell-Datei)

- **frage:** „Ein Frachtführer hat einen Schaden nur grob fahrlässig verursacht. Was gilt für seine Haftung?“
- **antwortA:** „Er haftet unbeschränkt“
- **antwortB:** „Die gesetzlichen Haftungshöchstbeträge gelten weiterhin“
- **richtig:** `"B"`
- **feedbackRichtig:** „Richtig! Grobe Fahrlässigkeit allein genügt nicht. Die Haftungshöchstbeträge entfallen erst bei Vorsatz oder leichtfertigem Handeln im Bewusstsein, dass ein Schaden mit Wahrscheinlichkeit eintritt (siehe Thema 1.4).“
- **feedbackFalsch:** „Nicht ganz. Die Haftungshöchstbeträge halten die Risiken des Frachtführers kalkulierbar. Grobe Fahrlässigkeit allein beseitigt sie nicht; sie entfallen erst bei Vorsatz oder leichtfertigem Handeln im Bewusstsein, dass ein Schaden mit Wahrscheinlichkeit eintritt (siehe Thema 1.4).“

Hinweis: Das Wort „nur“ in der Frage ist gewollt (es trennt die grobe Fahrlässigkeit vom Vorsatz). Der bisherige Satz „Haftungsausschlüsse sind etwas anderes, etwa ein Mangel der Verpackung …“ entfällt; wer ihn behalten will: „Haftungsausschlüsse sind etwas anderes, etwa ein Mangel der Verpackung durch den Absender oder ein unabwendbares Ereignis (siehe Thema 1.4).“ Beide Fassungen sind richtig.

## Frage 4, nur `feedbackRichtig` (Zeile 90 der Duell-Datei)

Der Satz „Es sieht eigene Haftungshöchstbeträge vor, ausgedrückt in Sonderziehungsrechten“ stellt die Sonderziehungsrechte als Besonderheit der CMR dar. Neu:

- **feedbackRichtig:** „Genau! Für grenzüberschreitende gewerbliche Gütertransporte auf der Straße gilt regelmäßig das CMR-Übereinkommen, wenn Übernahme- und Ablieferungsort in verschiedenen Staaten liegen und mindestens einer davon Vertragsstaat ist. Wie im HGB-Frachtrecht werden die Haftungshöchstbeträge in Sonderziehungsrechten ausgedrückt; der Unterschied liegt vor allem im Anwendungsbereich (siehe Thema 1.4).“

`feedbackFalsch` von Frage 4 kann bleiben („… gilt regelmäßig stattdessen das CMR-Übereinkommen …“). Dasselbe gilt für das Prüfblatt 16 (Zeilen 294 bis 301 und 317; die Hinweiszeilen 244 und 248 und die entsprechende Zeile in `export-pruefblaetter.ts` Zeile 1340, nach Wunsch ebenso `freigabe-welle-3.md` Zeile 35). Hinweis zu Zeile 254 des Prüfblatts („SZR-Umrechnung aus Rechtsgründen weggelassen“): bleibt richtig, weil die Frage keine Zahlen nennt.
