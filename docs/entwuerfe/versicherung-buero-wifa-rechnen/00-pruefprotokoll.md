# Prüfprotokoll: Rechenaufgaben Versicherungen, Büro und Wirtschaftsfachwirt (Entwurf FL-VF-08 und weitere)

Stand 13.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3).

## Umfang

- **Versicherungen und Finanzanlagen (Nordantis):** fünf Themen (1.3, 2.4, 2.5, 3.1, 4.1) mit Rechenbeispiel in der Theorie, 15 Formelkarten, 25 Kurzantworten, 4 Fallaufgaben (F-KB1-04, F-KB2-04, F-KP1-04, F-KP2-04).
- **Büro und Projektorganisation (Deko & Büro GmbH):** fünf Themen (1.3, 2.4, 3.1, 4.1, 4.2), 15 Formelkarten, 29 Kurzantworten, 4 Fallaufgaben (F-HB1-04 bis F-HB4-04).
- **Wirtschaftsfachwirt (NordWert):** vier Themen (wbq2 2.1, 2.2, 2.3, wbq3 3.4), 15 Formelkarten, 32 Kurzantworten, 3 Fallaufgaben (F-WBQ2-04, F-WBQ2-05, F-WBQ3-04).
- Alle Fallaufgaben haben 20 Punkte, eine Musterlösungszeile je Teilaufgabe und zuletzt die Zeile „Folgefehler“.
- Dateien: `versich-themen.md`, `versich-faelle.md`, `buero-themen.md`, `buero-faelle.md`, `wifa-themen.md`, `wifa-faelle.md`. `einspielen.cjs <Content-Wurzel>` fügt alles in `content/` ein (an einer Kopie erprobt). Die Antwortlisten sind aus Platzhaltern erzeugt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie der drei Kurse eingefügt: `db:validate-content` 0 Verstöße; der Parser erkennt alle 45 Karten, 86 Kurzantworten mit Antwortlisten und alle 11 Fälle mit 20 Punkten.
2. **Unabhängige Nachrechnung (Agent), mit Auftrag zum Abgleich mit dem Kursbestand:** 86 Kurzantworten samt 917 akzeptierten Varianten, rund 210 Zwischen- und Endergebnisse und 11 Punktsummen neu gerechnet. **Keine falsche Zahl, keine falsche Formel, kein Widerspruch zum Bestand mit Stufe hoch.** Zehn mittlere und mehrere niedrige Befunde.

## Eingearbeitete Befunde

| Nr. | Befund | Umsetzung |
|---|---|---|
| 1 | „Kosten der Warenbereitstellung“ kommt im Bestand nicht vor; Verwaltung und Vertrieb werden zusammengefasst | Begriff in Fragen und Fall definiert (Wareneinsatz + Einkaufs- + Lagergemeinkosten), Summenzeile in der Tabelle, Hinweis auf Zusammenfassung von Kostenstellen mit gleicher Bezugsgröße |
| 2 | Preis-/Mengenabweichung: zweite vertretbare Aufteilung | Konvention in Theorie, Karte (mit „Verbrauchsabweichung“ als Synonym) und Fall genannt |
| 3 | Divisionskalkulation und Deckungsbeitrag mit derselben Zahl (15 €) | variable Kosten des Karton-Sets 14 € (Deckungsbeitrag 10 €, Break-even 18.000 Stück, Zusatzauftrag 12.000 €) |
| 4, 5 | „Unterversicherungsgrad“ und „Versicherungsgrad“ nicht definiert; Unterversicherungsverzicht nicht ausgeschlossen | Definition in der Frage, „ohne Unterversicherungsverzicht“ im Fall |
| 6 | F-KP1-04: Kostenbasis | „Kosten wie kalkuliert, also Zuschläge auf die Nettoprämie“ |
| 7 | F-KP2-04 / Stornoquote: Bezugsbestand | „Bestand zu Jahresbeginn“, Quoten darauf bezogen |
| 8 | F-HB3-04: zwei verschiedene Bestände in der Musterlösung | Teilaufgaben nennen den Bezug (durchschnittlicher Bestand, Bestand zum Jahresende) |
| 9 | Personalkostenquote: Bestand-Spiel nutzt den Umsatz | Bezugsgröße Umsatz (Gesamtkosten als Alternative) |
| 10 | Nettopersonalbedarf: Bezeichnung und Teilzeit | „Bruttopersonalbedarf“, Vollzeitstellen und Vollzeitkräfte |
| 11 | Aufrunden bei Break-even-Mengen | Zusatz in den drei Formelkarten |
| 12 | Wiederholte Theoriezahlen in Fällen | geändert in F-KB1-04 (Mitwirkung 40 % und 10 %), F-KB2-04 (Inventar 640.000 €), F-HB3-04 (Zielwerte 9 % und 6 %); nicht geändert: F-WBQ2-04 (gleiche Zuschläge) und F-WBQ3-04 (zufällig gleicher Messbetrag) |
| 13, 14 | „Progression“ nicht ausgeschlossen; weitere Klarstellungen | „ohne Progression“, Totalausfall und gleichmäßiger Rohertrag, Bezug der Zuschläge, Nutzfläche, Skonto nur auf den Warenwert |
| 15 | Bloom-Verben | „Erläutern Sie“ statt „Nennen Sie“ bei den zwei Bewertungsaufgaben |
| 16 | fehlende Schreibweisen (Vorzeichen, „Teilnehmer“, „2,10“, Euro ohne Tausenderpunkt) | Platzhalter für vorzeichenbehaftete Werte, Antwortlisten erweitert |
| 18 | Restwert und Niederstwert nur handelsrechtlich | „handelsrechtlich“ in Theorie und Fall |

## Bewusst nicht umgesetzt

- Generisches Maskulinum „Kunde“ im Versicherungskurs (der Bestand verwendet es durchgängig); „Gutachter“ im Fall ist in „Gutachterin“ geändert.
- Doppelungen mit Bestandskarten (K-2.5-24, K-4.1-21) bleiben als Rechenkarten stehen.
- Rechtsstand: Taxwerte, Mindestanteil der Mitwirkung (25 %), Hebesätze, Lohnanteile, Gewerbeertrag und der degressive Abschreibungssatz sind ausdrücklich als angenommen oder Muster gekennzeichnet; Unterversicherungsformel, Gewerbesteuermesszahl von 3,5 %, Zerlegung nach Arbeitslöhnen und Umsatzsteuersätze entsprechen dem Kursbestand. Nichts davon ist förmlich rechtsgeprüft.
