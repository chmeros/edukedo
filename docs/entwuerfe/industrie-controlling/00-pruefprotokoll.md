# Prüfprotokoll: Paket P-M „Industriefachwirt: Controlling, Kalkulationsverfahren und Preisuntergrenzen, Finanzierung beurteilen, Ziele und Produktivität“ (Erhebung vom 14.10.2026: IF-01 Rest, IF-20, IF-21, IF-17; Review FL-IF-11, FL-IF-15 Teil KLR)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Kreditsicherungsrecht (Bürgschaft, Grundpfandrechte, Sicherungsübereignung, Abtretung, Eigentumsvorbehalt), Kreditauflagen und Effektivzinsangabe, Bilanzierung und Steuern beim Leasing, Risikofrüherkennung, Wettbewerbsgrenzen für Preise unter Selbstkosten; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Industriefachwirt (Solvitec Elektrowerke GmbH; Werke Nord, Süd, Ost).

- **Neues Thema HQ1 5.4** „Controlling als Steuerungsinstrument: Kennzahlensysteme, Abweichungsanalyse und Frühwarnsystem“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten) und **F-HQ1-04**, 3 Fachgesprächsfragen.
- **Neues Thema WQ2 2.6** „Kalkulationsverfahren, Prozesskostenrechnung und Preisuntergrenzen“ (7 Abschnitte, 14 Karten, 18 Quizfragen, 10 Rechen-Kurzantworten) und **F-WQ2-09**, 3 Fachgesprächsfragen.
- **Ergänzung HQ1 5.2** „Finanzierung beurteilen“ (5 Abschnitte, K-5.2-21 bis -30, Q-5.2-16 bis -27, 8 Rechen-Kurzantworten) und **F-HQ1-05**, 2 Fachgesprächsfragen im bestehenden Abschnitt 5.2.
- **Ergänzung WQ1 1.2** „Ziele, Produktivität und Wirtschaftlichkeit“ (5 Abschnitte, K-1.2-21 bis -28, Q-1.2-13 bis -22, 6 Rechen-Kurzantworten) und **F-WQ1-04**, 2 Fachgesprächsfragen im bestehenden Abschnitt 1.2.
- Zusammen 46 Karten, 56 Quizfragen (32 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 10 Fachgesprächsfragen; **118 neue Item-Schlüssel** (19.210 → 19.328), dazu ändern sich die Theorien von 5.2 und 1.2.
- **Änderungen am Bestand durch das Einspielen:** die Einleitungssätze der Fallaufgaben HQ1 („5.1–5.4“, „vier oder fünf Teilaufgaben“) und WQ2 („2.1–2.6“), der `rechtsstand` im Frontmatter von 5.2 und 1.2 (jetzt vom Einspielskript erledigt, bricht bei fehlender Textstelle ab) und die Einfügung der Ergänzungen in die bestehenden Dateien.
- Dateien: `industrie-5.4-…`, `industrie-2.6-…`, `industrie-5.2-ergaenzung-…`, `industrie-1.2-ergaenzung-…`, `industrie-faelle-a.md` bis `-d.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).
- **Einspielreihenfolge:** Die Teile verweisen aufeinander (5.4 auf 2.6, 5.2 und 1.2 auf 5.4) und werden zusammen eingespielt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (662 Themendateien, 19.328 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen stehen in den richtigen Abschnitten.
2. **Schreiben:** Vier Agenten nach dem Schreibauftrag `auftrag.md` (ein Nutzungslimit unterbrach den ersten Lauf, die Entwürfe waren zu diesem Zeitpunkt bereits geschrieben und wurden vervollständigt); alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand und anderen Kursen:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 1 hoch, 7 mittel, 16 niedrig; Teil B 1 hoch, 4 mittel, 13 niedrig; Teil C 3 mittel, 10 niedrig; Teil D 5 mittel, 12 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | „Mengenabweichung“ der Kostenseite hat in anderen Kursen eine andere Bedeutung (Verbrauchsabweichung) | Kostenseite: „Beschäftigungsbedingte Abweichung (Ausbringungsabweichung)“ mit Hinweis auf abweichenden Sprachgebrauch; beim Umsatz bleibt „Mengenabweichung“ wie in 7.6 |
| A | Soll gleich Plan gegenüber Sollkosten; gestrichelte Linie widerspricht 4.1; Materialaufwandsquote keine Gliederungszahl | Begriffe und Legende geklärt; Anlagenintensität als Beispiel |
| A | Quiz: Q-07 verriet Q-08, Distraktoren trivial, richtige Antwort die längste | Fragen neu gefasst, Sollkostenfrage ergänzt |
| B | Fall TA 5 ohne Opportunitätskosten der Zusatzschicht: Ergebnis, Preisuntergrenze und Empfehlung falsch | Zusatzschicht 1.400 Minuten; Vertrag kostet auch mit Zusatzschicht 8.600 €/Monat, Preisuntergrenze 340 €, Empfehlung: ablehnen oder auf rund 429 € nachverhandeln |
| B | „Angebotspreis“ (2.2) gegenüber Barverkaufspreis (2.6); Materialvolumen widerspricht 2.5; Formel Gesamtprozesskostensatz; K-2.6-13 | Begriffsbrücke; Beispiel auf elektronische Zukaufteile begrenzt; Umlagesatz ÷ 100; Kriterium korrigiert |
| C | Ausfallbürgschaft falsch abgegrenzt; „Beleihungssatz“ doppeldeutig; Annuitätenfaktor ohne Formel | selbstschuldnerische/gewöhnliche/Ausfallbürgschaft getrennt; Beleihungssatz als angesetzter Prozentsatz; Formel ergänzt |
| C | Verschuldungsgrad als Faktor, im Bestand in Prozent; Antwortlisten unvollständig | Prozent und Faktor erklärt; Schreibweisen ergänzt |
| D | Liquidität zugleich Sach- und Formalziel (Q-1.2-13 uneindeutig); Überstunden als Produktivitätsursache; Mengen im Werk Nord passen nicht zu 6.7 | Liquidität Formalziel, Frage neu gefasst; Überstunden nur als Kostenfaktor; Fallmengen durch 10 |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Kreditsicherheiten und Kreditverträge (Bürgschaft, Grundschuld, Sicherungsübereignung, Zession, Covenants, Effektivzinsangabe), Leasing in Bilanz und Steuer, Risikofrüherkennung, Preise unter Selbstkosten.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Ampelschwellen (5 % und 10 %), Beleihungssätze (80 %, 60 %, 50 %), Disagio und Gebühren, Kontokorrentzins, Leasingraten, Prozessmengen und -kosten, Linien- und Prüfzeiten, Verrechnungspreise; alle als Beispielwerte gekennzeichnet.
- **Offen im Paket:** Im Theoriebeispiel von 1.2 benötigt ein einzelner Gehäusetyp rund 19 t Granulat im Jahr, das liegt unter, aber nah an den 25 t des gesamten Werks Nord in 6.7 (Beispielwerte, unabhängig gekennzeichnet).
- **Bestand, nicht Teil von P-M (nur gemeldet):** Werksnamen uneinheitlich (Nord/Süd/Ost gegenüber Villingen/Zwickau/Brünn/West in `wq4/4.1`, `4.2`, `4.3`, `hq4/8.4`, `hq5/9.4`); F-HQ1-01 bis -03 und F-WQ1-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; `wq3/3.3` und `wq3/fachgespraech.md` zitieren den Paragrafen zum Eigentumsvorbehalt; die `quelle` im Frontmatter von 2.2 und 2.5 schließt das Anführungszeichen mit einem geraden `"`; 2.2 hat Quiztypen mit wenig KLR-Bezug; 6.3 definiert keine Ausschussquote; Glossar für HQ1 und WQ2 (Controlling, Sollkosten, DuPont, Book-to-Bill, Prozesskosten) wäre sinnvoll.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
