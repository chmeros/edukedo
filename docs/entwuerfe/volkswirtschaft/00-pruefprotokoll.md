# Prüfprotokoll: Paket P-O „Industriefachwirt und Wirtschaftsfachwirt: Volkswirtschaft – Wirtschaftspolitik, Geld, Inflation, Wachstum und Außenwirtschaft“ (Erhebung vom 14.10.2026: IF-16 = WF-20; Review FL-IF-19)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Zentralbank-, Haushalts- und Schuldenregeln, Arbeitsmarkt-, Zuwanderungs-, Bankenaufsichts-, Zoll- und Außenhandelsrecht; nicht förmlich rechtsgeprüft. Keine tagesaktuellen Zahlen als Tatsachen, keine parteipolitischen Wertungen, keine Zuschreibungen an Länder oder Gruppen.

## Umfang

Zwei gleichnamige neue Themen **1.5 „Wirtschaftspolitik, Geld, Inflation und Wachstum“** mit gemeinsamen fachlichen Festlegungen, aber eigener Modellfirma und eigenen Zahlen (wie im Paket P-B):

- **Industriefachwirt WQ1 1.5** (Solvitec Elektrowerke GmbH): 7 Abschnitte, 14 Karten, 16 Quizfragen (8 Rechen-Kurzantworten); **F-WQ1-05** (Lohnrunde, Zinsanstieg und Realzins, Aufwertung des Euro, Investitionsprogramm) und 3 Fachgesprächsfragen.
- **Wirtschaftsfachwirt WBQ1 1.5** (NordWert Handels GmbH): 7 Abschnitte, 14 Karten, 16 Quizfragen (7 Rechen-Kurzantworten), handelsspezifisch (Einkaufspreisindex, Importe, Kaufkraft); **F-WBQ1-04** (Inflation, Preisweitergabe, Zinsen, Wechselkurs, Multiplikator) und 3 Fachgesprächsfragen.
- Gemeinsame Festlegungen: magisches Viereck und Sechseck; BIP (Entstehung, Verwendung, Verteilung; nominal/real/Deflator); Preisindex, Inflationsrate, Kaufkraft, Realeinkommen, Realzins; Inflationsursachen, Quantitätsgleichung; Giralgeldschöpfung mit Mindestreserve; Geldpolitik der EZB (Zielmarke 2 %, Leitzinsen, Offenmarktgeschäfte, Transmission, Grenzen); Fiskalpolitik und Multiplikator; Arbeitsmarkt; Zahlungsbilanz, Wechselkurs in Mengennotierung, Zoll, Handelsvorteile.
- Zusammen 28 Karten, 32 Quizfragen (15 Kurzantworten), 2 Fallaufgaben zu je 20 Punkten, 6 Fachgesprächsfragen; **70 neue Item-Schlüssel** (19.425 → 19.495).
- **Änderungen am Bestand durch das Einspielen:** die Einleitungssätze der Fallaufgaben WQ1 und WBQ1 („1.1–1.5“) und der `rechtsstand` der Sammeldateien `fallaufgaben.md` und `fachgespraech.md` beider Fachgebiete (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab).
- Dateien: `industrie-1.5-…`, `wifa-1.5-…`, `industrie-faelle.md`, `wifa-faelle.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (666 Themendateien, 19.495 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und beide Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Zwei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet; die Autoren haben sich über die gemeinsamen Formeln und Konventionen abgestimmt.
3. **Unabhängige Prüfung (zwei Agenten, je Kurs), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, anderen Kursen und dem jeweils anderen Entwurf:** jede Zahl neu gerechnet (134 Werte in Teil A), **kein Rechenfehler**; Befunde: Teil A 3 mittel, 15 niedrig; Teil B 4 mittel, 16 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A, B | Gleiche Rechenbeispiele und wörtlich gleiche Sätze in beiden Kursen (BIP-Reihe, Quantitätsgleichung, Multiplikator, Wechselkurs 1,10, Erwerbsquote, Ricardo-Passage) | Teil B mit eigenen Werten (BIP 5.253 Mrd. €, M = 800/V = 5, Multiplikator 25 Mrd. €/c = 0,5), Teil A mit eigenem Kurs (1,05) und eigener Erwerbsquote (75 %); wörtlich gleiche Passagen eigenständig neu gefasst |
| A | Zahlen und Sätze dem Technischen Fachwirt (wq1/1.1) zu ähnlich (Warenkorb, Realeinkommen genau 3.000 €) | Warenkorb und Lohnbeispiel neu, Sätze umformuliert |
| A | Realzins-Deutung im Fall führte in die Irre (5-jähriges Festdarlehen) | Hinweis auf erwartete Inflation: bei 2 % Inflation wäre der Realzins des Angebots rund 3,24 % |
| B | Warenbestand widerspricht wbq2/2.5 (Schlussbestand 12 Mio. € gegenüber Durchschnittsbestand 14 Mio. €) | Durchschnittsbestand 14,0 Mio. €, Kapitalbindung 700.000 € → 910.000 € |
| B | Formel „reales BIP“ ungenau; Fallaufgabe 4 mehrdeutig | reales BIP = nominales BIP ÷ BIP-Deflator × 100; Aufgabe fragt nach gleichem Rohgewinn in Euro, Alternative mit gleicher Rohgewinnquote anerkannt |
| A, B | Gewinner der Inflation, Leverage im Fall, HVPI, Giralgeldschöpfung (Bareinzahlung, freiwillige Reserven), M2/M3, Gendern | fachlich präzisiert, Begriffe zwischen den Teilen abgestimmt |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Zentralbank-, Haushalts-, Schulden-, Bankenaufsichts-, Zoll- und Außenhandelsrecht (nur als Hinweis im Text).
- **Minderjährige:** nicht berührt; die Kurse richten sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Zielmarke 2 % der EZB (als Zielwert gekennzeichnet), Mindestreservesätze (als Lernwerte, ausdrücklich höher als in der Praxis), marginale Konsumquoten, Wirkungsverzögerung der Geldpolitik, Zollsätze, Wechselkurse, Zinssätze; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-O (nur gemeldet):** `wbq1/1.1` enthält keine Wechselkursdarstellung und `hsq4/4.4` behandelt nur Incoterms, CISG und Interkulturelles (der Wechselkurs ist daher in WBQ1 1.5 vollständig eingeführt); der Begriff „magisches Viereck“ ist in `hq2/6.1` für die Produktionsplanung belegt (Abgrenzung im Entwurf); F-WQ1-01 bis -03 und F-WBQ1-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; `quelle` im Frontmatter von `wq1/1.1`, `wbq1/1.1` und den Sammeldateien mit geradem Schlusszeichen; Beschäftigtenzahl „280“ gegenüber „rund 280“ im Wirtschaftsfachwirt; `hq3/7.4` nennt Gesetzesnamen und eine Behörde; `wbq1/1.1` (Q-1.1-09) und F-WBQ1-03 nennen das Bundeskartellamt; Glossar für WQ1 und WBQ1 fehlt (HVPI, Einlagefazilität, Zahlungsbilanz).

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
