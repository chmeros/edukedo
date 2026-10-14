# Prüfprotokoll: Paket P-C „Präsentation, Moderation und Gesprächsführung“ (Erhebung vom 14.10.2026: HF-08, HF-04, IF-10, IF-11, BP-11)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah ist nur der Verweis auf den Prüfungsablauf (siehe unten).

## Umfang

- **Handelsfachwirt (`hb2`):** neue Themen 2.5 „Präsentation, Moderation und Gesprächsführung“ (9 Abschnitte, 18 Karten, 20 Quizfragen) und 2.6 „Zeit- und Selbstmanagement“ (5 Abschnitte, 12 Karten, 14 Quizfragen); Fall F-HB2-05; je Thema drei Fachgesprächsfragen. 2.6 liefert die Theorie zur Eisenhower-Matrix, die bisher nur abgefragt wurde (Q-2.1-10).
- **Industriefachwirt (`hq5`):** neues Thema 9.4 „Präsentation, Moderation und Mitarbeitergespräche“ (10 Abschnitte, 18 Karten, 20 Quizfragen); Fall F-HQ5-04; drei Fachgesprächsfragen.
- **Büro und Projektorganisation (`hb3`):** Ergänzungen in 3.3 (Konfliktgespräch: 4 Abschnitte, 8 Karten, 8 Quizfragen) und 3.4 (Präsentation: 4 Abschnitte, 8 Karten, 8 Quizfragen); Fall F-HB3-05; Fachgesprächsfragen unter den vorhandenen Überschriften 3.3 und 3.4; Erwartungen für drei bisher leere Bestandsfragen in 3.3 (`bestand-fachgespraech.json`).
- Zusammen 64 Karten, 70 Quizfragen (12 Kurzantworten), 3 Fallaufgaben mit je 20 Punkten, 153 Items.
- **Änderungen am Bestand durch das Einspielen:** Vorname Schulz von Thun in `industriefachwirt/hq5/9.2` und `technischer-fachwirt/hq4/11.2` von „Friedrich“ auf „Friedemann“ korrigiert (Theorie, Karte, Quizantwort; die Quizantwort akzeptiert „Friedemann Schulz von Thun“, „F. Schulz von Thun“ und „Schulz von Thun“); Einleitungssätze der Fallaufgaben und Fachgespräche (Themenbereiche, „vier bis fünf Teilaufgaben“ im Handel); Erwartungen für drei Bestandsfragen im Büro-Fachgespräch.
- Dateien: `handel-2.5-…`, `handel-2.6-…`, `handel-faelle.md`, `industrie-9.4-…`, `industrie-faelle.md`, `buero-themen.md`, `buero-faelle.md`, `bestand-fachgespraech.json`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>`.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt: `db:validate-content` 0 Verstöße (17.638 → 17.791 Item-Schlüssel, +153); der Parser erkennt alle Karten, Quizfragen, Kurzantworten mit Antwortlisten und alle 3 Fälle mit 20 Punkten und Folgefehler-Zeile; Büro-Theorie 3.4 wird vor „Evaluation der Moderation durchführen“ eingefügt, die Fachgesprächsfragen unter die vorhandenen Überschriften (keine doppelten Überschriften).
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; fachliche Modelle waren der Wirtschaftsfachwirt (hsq5/5.1, 5.4), der Technische Fachwirt (hq4/11.2) und die vorhandenen Industrie- und Büro-Themen. Rechenaufgaben (2.6) per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Kurs), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand:** Handel 1 hoch, 4 mittel, 12 niedrig; Industrie 1 hoch, 7 mittel, 7 niedrig; Büro 0 hoch, 6 mittel, 9 niedrig. Alle eingearbeitet. Rechnungen (2.6, F-HB2-05) stimmten.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Kurs | Befund | Umsetzung |
|---|---|---|
| Handel | **Präsentationsdauer:** Der Schreibauftrag nannte pauschal 10 Minuten; für den Handelsfachwirt gelten laut Anforderungskatalog, Kursprofil und App-Einstellung (`PRAESENTATION_MINUTEN`) etwa 15 Minuten, Fachgespräch bis 20 Minuten | Theorie, Zeitplan (auf 15 Minuten umgerechnet), Karte, Quiz und Fall auf 15 Minuten umgestellt |
| Handel | Schlusssatz Rechenbeispiel 2.6 widersprach den eigenen Zahlen | ersetzt: 36 h feste Aufgaben liegen 12 h über der Faustregel |
| Handel | Q-2.5-18 (Halo-Effekt ebenfalls vertretbar); Fall übernahm Theoriebeispiele; Zeitdiebe/Antwortvarianten; Eisenhower-Fragen kursweit nur zwei | Merkmal festgelegt, neue Beispiele, Kurzantwort mit Varianten, dritte Eisenhower-Frage Q-2.6-02 |
| Industrie | **Prüfungsgegenstand:** „Führung und Zusammenarbeit“ als Bezug ist nicht belegt (FL-IF-37); verbindlich ist der Bezug auf mindestens zwei Handlungsbereiche | Formulierung „betriebliche Problemstellung, die mehrere Handlungsbereiche verbindet“; Dauer höchstens etwa 10 Minuten, Fachgespräch bis etwa 20 Minuten |
| Industrie | Werk Brünn: Bezug der Fall- und Theoriebeispiele widersprach der Werkstruktur in wq4/4.1 | Brünn verbaut die Sensormodule in der Endmontage und prüft sie vorher; Qualitätssicherung Villingen; Ortsangabe beim Schaltschrankbau entfernt |
| Industrie | Antwortlängenmuster bei Multiple Choice (FL-IF-33); Sortieraufgabe Kritikgespräch unvollständig; „Zielvereinbarungsgespräch“ ungeklärt; Wortlaut nah an WF/TF | Optionen gleich lang, vier Schritte benannt, Satz zur Zielvereinbarung ergänzt, Definitionen neu formuliert |
| Büro | Fachgesprächsfragen doppelten drei Bestandsfragen ohne Erwartungen; Einfügestelle am Dateiende | Erwartungen für die drei Bestandsfragen aus der neuen Theorie (`bestand-fachgespraech.json`); neue Fragen anders zugeschnitten; Einfügen unter die Abschnittsüberschrift |
| Büro | Klärungsgespräch/Mediation nicht abgegrenzt (FL-BP-25 c); Mediation in F-HB3-05 vertretbar | Begriff und Abgrenzung ergänzt, Musterlösung und Folgefehler-Regel ergänzt |
| Büro | Kernbotschaft fehlte in der Einleitung; Lückentext Metaebene nur eine Schreibweise | in alle Einleitungs-Beschreibungen aufgenommen; Kurzantwort mit Varianten |
| alle | Name Schulz von Thun (Friedemann) im Bestand falsch | im Bestand korrigiert (siehe oben) |

## Offen / Hinweise

- **Prüfungsablauf:** Dauer der Präsentation (Handel 15, Industrie und Büro höchstens 10 Minuten) und des Fachgesprächs (Industrie bis 20, Handel bis 20, Büro „meist rund 30 bis 40 Minuten“) stammen aus Anforderungskatalog, Kursprofilen und App-Einstellung, nicht aus dem Verordnungstext; im Text nur als „üblich“. Das Kursprofil für Büro nennt selbst unterschiedliche Fachgesprächsdauern (ca. 40 Minuten gegenüber 30 bis 40 Minuten).
- **Neue Firmenfakten** (Handel: Filialen Kassel/Erfurt, Regionalleitung/Regionaltagung, Namen; Industrie: Qualitätssicherung in Villingen, Rolle von Brünn; Büro: Steuerberatungskanzlei als Kundin) widersprechen dem Bestand nicht, sind aber neu und gehören bei Gelegenheit ins Firmenprofil.
- **Bestand, nicht Teil von P-C:** FL-WF-28 (Phasen des Moderationszyklus: fünf in Büro 3.4 und WF 5.4, sechs im Technischen Fachwirt; Handel und Industrie nutzen jetzt den sechsstufigen Zyklus und benennen die Abweichung); die Faustregel „Minuten je Folie“ ist kursübergreifend uneinheitlich; Q-2.1-10 (Eisenhower) steht weiter in Handel 2.1, ihre Theorie ist jetzt in 2.6.

## Rechtsstand

Keine Rechtsvorschrift zitiert; der Prüfungsablauf ist nur als „üblich“ beschrieben; Datenschutz im Personalgespräch erscheint nur als Hinweis auf Vertraulichkeit. Alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte.
