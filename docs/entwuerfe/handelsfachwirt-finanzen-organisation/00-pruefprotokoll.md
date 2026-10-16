# Prüfprotokoll: Paket P-X „Handelsfachwirt: Unternehmensorganisation und Kooperationen, Darlehensarten und Annuität, Risikokategorien, Anbahnung im Außenhandel, Transportversicherung und Zertifizierung“ (Erhebung vom 14.10.2026: HF-03, HF-09, HF-10, HF-19, HF-20, HF-23; Auswertung `docs/entwuerfe/handelsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Entwurf (R3), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Gesellschafts-, Genossenschafts-, Kartell- und Franchiserecht, Darlehens- und Verbraucherkreditrecht, Versicherungsvertragsrecht, Zoll- und Exportkontrollrecht, Rechtswahl und Gerichtsstand; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH), Fachgebiete HB1 „Unternehmensführung und -steuerung“ und WB4 „Außenhandel (Wahlpflicht)“. Handelsspezifische Entwürfe mit eigenen Zahlen aus dem Modehandel; Industriefachwirt-, Wirtschaftsfachwirt- und Immobilienfachwirt-Themen dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HB1 1.6 „Unternehmensorganisation und Kooperationen“** (7 Abschnitte, 14 Karten, 16 Quizfragen, 4 Rechen-Kurzantworten): Aufgabenanalyse und Stelle, Organigramm, Leitungsspanne und Hierarchieebenen (Rechnung mit Führungszeit und Aufrunden), Leitungssysteme, Gliederung im Handel und Zentralisation, Ablauforganisation und Durchlaufzeit, Kooperationen (Einkaufsgemeinschaft, Einkaufsverbund, Genossenschaft, freiwillige Kette, Franchising nur im Überblick), Wirtschaftlichkeit einer Kooperation (Konditionenvorteil, Break-even); **F-HB1-06** und 3 Fachgesprächsfragen.
- **Teil B, Ergänzung HB1 1.2** (5 Abschnitte, K-1.2-23 bis -32, Q-1.2-19 bis -30, 5 Rechen-Kurzantworten): Darlehensarten, Tilgungsplan und Annuität, Vergleich nach Gesamtzinsen und Liquidität, Kreditvergleich (Disagio, Gebühr, Effektivzins im Überblick), Kapitaldienst; **Ergänzung HB1 1.4** (3 Abschnitte, K-1.4-19 bis -24, Q-1.4-14 bis -21, 1 Rechen-Kurzantwort): neun Risikokategorien, Einordnung nach Ursache und Strategie, Risikokatalog; **F-HB1-07** und 5 Fachgesprächsfragen (3 zu 1.2, 2 zu 1.4).
- **Teil C, Ergänzung WB4 8.1** (5 Abschnitte, K-8.1-19 bis -28, Q-8.1-14 bis -25, 3 Rechen-Kurzantworten): Anbahnung eines Importgeschäfts (Reihenfolge Muster, Erstaudit, Probebestellung, Vertrag), Rechnung je Sendung mit Verweis auf 7.1, Importperspektive; **Ergänzung WB4 8.2** (4 Abschnitte, K-8.2-19 bis -26, Q-8.2-14 bis -23, 3 Rechen-Kurzantworten): Transportversicherung (CIF-Wert, Versicherungswert, Unterversicherung, Deckungsumfang, Schadensabwicklung), Zertifizierung ohne Siegel- und Normnamen mit Wirtschaftlichkeit (Beanstandungsquote); **F-WB4-04** und **F-WB4-05** sowie 4 Fachgesprächsfragen.
- Zusammen 48 Karten, 58 Quizfragen (16 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 12 Fachgesprächsfragen; **123 neue Item-Schlüssel** (20.183 → 20.306, darunter die neue Theorie 1.6), dazu ändern sich die Theorien von 1.2, 1.4, 8.1 und 8.2.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HB1 („1.1–1.5“ → „1.1–1.6“) und der `rechtsstand` von 1.2, 1.4, 8.1, 8.2 und den Sammeldateien in HB1 und WB4 (vom gemeinsamen Skript erledigt). Die WB4-Einleitung bleibt unverändert und passt zu vier Teilaufgaben.
- Dateien: `hf-1.6-…`, `hf-1.2-…`, `hf-1.4-…`, `hf-8.1-…`, `hf-8.2-…`, `hf-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md` bis `pruefung-c.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (677 Themendateien, 20.306 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 20 Punkten und Folgefehler-Zeile (HB1-Fälle 5 Teilaufgaben, WB4-Fälle 4). Textnähe mit `siebenwort`: nur Verweis-, Format- und Konventionsformeln.
2. **Schreiben:** drei Agenten nach dem schlanken Auftrag `auftrag.md` mit den Werkzeugen, alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil, ohne Mechanik):** nachgerechnet wurden 67 Werte (Teil A), rund 190 (B) und rund 120 (C); **kein Rechenfehler**. Befunde: Teil A 1 hoch, 6 mittel, 8 niedrig; Teil B 0 hoch, 5 mittel, 11 niedrig; Teil C 0 hoch, 7 mittel, 12 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren. **Nicht ein zweites Mal unabhängig geprüft** sind die durch Befunde neu gebauten Stellen: Teil A F-HB1-06 Teilaufgabe 3 (Wareneingang mit Lieferavis) und Teilaufgabe 5 (Mengenrisiko), Teil C F-WB4-04 Teilaufgabe 3 (Break-even-Kurs) und Q-8.1-19. Der Auftraggeber hat diese Rechnungen selbst nachgerechnet (333,75 und 223,5 Minuten, Einsparung 33,0 %; Spielraum 2.162 €, Kurs 0,970, Rückgang 6,7 %; Teil-C-Fall 2: 7.700 €, 2.550 €, −1.800 €); alle stimmen. Alle Agenten liefen auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **hoch:** Fall F-HB1-06 widersprüchlich: Mindestabnahme im Text, Teilaufgabe 4 rechnete ohne sie | Mindestabnahme gestrichen, Vertrag bindet drei Jahre; Teilaufgabe 5 rechnet das Mengenrisiko (−6.300 € über die Bindung) |
| A | Fall-Teilaufgabe 3 Klon von F-WQ4-04 (Bearbeitungs- und Liegezeit), Formel- und Rasterkonflikt bei Parallelschritten | neuer Fall: Wareneingang im Zentrallager mit Lieferavis (gewichtete Durchlaufzeit); im Thema Regel „bei gleichzeitigen Zweigen zählt der längere“ |
| A | Leitungsspannen-Beispiel gleiche Lehrfigur wie `wq4/4.1`; Einkaufsgemeinschaft/-verbund und freiwillige Kette/Franchising nicht trennscharf; Liegezeit-Logik bei Auslagerung überzeichnet | Führungszeit mit Aufrunden; Tabelle mit Zweck (Genossenschaft) und Konzept; Auslagerung spart nur Bearbeitungszeit (2.140 statt 1.660 Minuten) |
| B | Reputationsrisiko über Wirkung statt Ursache; „externe Risiken“ zu weit; Beschaffungskategorie nur Ware; Fallereignisse (b), (c) wörtlich aus Quiz/Karte | Sonderstellung der Reputationsrisiken; engere Definition; Investitionsgüter und Dienstleistungen; neue Ereignisse (Kassensoftware, Konjunktureinbruch) |
| B | Quizfragen ohne Laufzeit (Q-1.2-21, -22, -27); Rundung der Fall-Zinssumme; Spaltenüberschrift gleich `industriefachwirt/hq1/5.2` | Laufzeiten ergänzt und Zahlen neu gerechnet; Rundungshalbsatz; Überschrift und Zwei-Angebote-Dramaturgie variiert |
| C | **Audit-Reihenfolge widerspricht `wb3/7.2`, `7.3`, F-WB3-04** (Audit vor Probebestellung) | acht Stufen: Muster, Erstaudit vor Aufnahme, Probebestellung, Vertrag; in Theorie, Karten, Fall und Fachgespräch |
| C | „Warenwert“ zweideutig (8.1 ohne Fracht, 8.2 mit Fracht); „Reklamationsquote“ kollidiert mit `wb2/6.1`; Importkalkulation überschnitt `wb3/7.1` und F-WB3-04 | „CIF-Wert“ in 8.2; „Beanstandungsquote“ mit Abgrenzung; Kalkulation verweist auf 7.1, Fall rechnet Break-even-Kurs statt Angebotsvergleich |
| alle | Kurzverweise ohne Titel und Fachgebiet; „ohne Umsatzsteuer“ fehlt; abwegige Distraktoren; Antwortlisten mit Doppelungen | überall ergänzt bzw. bereinigt |

## Offen / Hinweise

- **Zurückgestellt aus HF-23:** ABC-Kumulation/Konzentrationskurve. Sie gehört zu `hb4/4.1` bzw. `wb2/6.2`, nicht zu `hb1/1.2`; kleiner Zusatz für ein späteres Paket oder den R4-Block.
- **Nicht aufgenommen:** Franchising als Vertragsform, Rechtsformen und Genossenschaftsrecht (R4-Block, HF-02); Teil A nennt Franchising nur im Überblick.
- **Rechtsprüfung (Iteration 22):** Gesellschafts-, Genossenschafts-, Kartell-, Darlehens-, Verbraucherkredit-, Versicherungsvertrags-, Zoll- und Exportkontrollrecht, Rechtswahl und Gerichtsstand.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Darlehenszinssätze, Gebühren und Disagio, Kapitaldienstgrenze 1,50, Führungszeit und Leitungsspannen, Konditionenvorteile und Verbundgebühren, Zollsatz 6 %, Prämiensätze 0,18 % und 0,30 %, Selbstbeteiligung, Beanstandungsquoten und -kosten, Zertifizierungskosten; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-X (nur gemeldet):** `wb4/8.2` und das WB4-Fachgespräch zitieren Rechtsnormen (Artikel- und Paragrafennennung) und widersprechen damit der Hausregel „keine Paragrafen“ (Bestandsfix in einem eigenen Schritt); `wb3/fallaufgaben.md` F-WB3-03 und Q-7.3-04 behandeln die Einfuhrumsatzsteuer als Kostenfaktor, die Ergänzungen als durchlaufenden Posten (K-8.1-26 stellt die Verbindung her); die Wörter „Reklamationsquote“ (Servicelevel in `wb2/6.1`, Sendungen) und „Beanstandungsquote“ (Stücke, Teil C) sind abgegrenzt.
- **Innerhalb des Pakets:** Zahlen 6.300 und 6.720 stehen in Teil A (Mengenrisiko, Jahresbeitrag) und in Teil B (Zinsanteil, Darlehensvergleich) in verschiedenen Zusammenhängen; Filialnamen: Fulda nur in Teil B. Die Vertriebsregion Nord (14 Filialen) kommt nur in Teil A vor.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext. Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
