# Prüfung Teil A, Paket P-AB (Wirtschaftsfachwirt, Ergänzung WBQ1 1.3 Sonderformen der Rechtsformen)

Stand 16.10.2026. Geprüft: `wf-1.3-ergaenzung-sonderformen-rechtsformen.md`, `wf-faelle-a.md`, `rechtsangaben-a.md`, `ersetzungen-a.json`. Maßstab: `auftrag.md` (P-AB), P-Z, P-AA, `pruefer-vorlage.md`. Mechanik (Kopie-Test, Parser) nicht geprüft; `siebenwort` und `zahlen` einmal informativ gelaufen.

**Methode und Umfang.** Rechnen: Node-Skript `pb-a-pruef.cjs` (Scratchpad), 45 Werte aus Theorie, Quiz, Karten und Fall nachgerechnet, dazu alle drei Antwortlisten der Kurzantworten (je 40 Schreibweisen) auf Vollständigkeit, Doppelte und Zusätze geprüft: kein Rechenfehler, alle Listen vollständig. Rechtsaussagen: alle 65 Zeilen von `rechtsangaben-a.md` durchgesehen; 21 Normen (HGB §§ 19, 116, 161, 162, 164, 166, 170, 171, 172, 176, 232, 233, 236, 264a; GenG §§ 4, 43, 53; PartGG §§ 2, 8) am aktuellen Gesetzestext auf gesetze-im-internet.de abgerufen (Abruf über ein Zusammenfassungswerkzeug, Wortlaut nicht vollständig wörtlich; den Hauptbefund H1 bitte vor Verwendung am Volltext gegenlesen). Der Rest aus eigenem Wissen.

## Befunde

### H1 (hoch): Widerspruchsrecht der Kommanditist:innen entspricht der Rechtslage vor dem 01.01.2024

Fundstellen: Theorie „Geschäftsführung und Mitsprache“ („können aber Handlungen widersprechen, die über den gewöhnlichen Betrieb hinausgehen (§ 164 HGB)“); Tabelle „Abgrenzung zur Kommanditbeteiligung“, Zeile Mitsprache („Widerspruchsrecht und Kontrollrecht kraft Gesetz“); F-WBQ1-06 Musterlösung Teilaufgabe 2 („gesetzliche Widerspruchsrechte bei außergewöhnlichen Geschäften nur bei der Kommanditbeteiligung“) und Teilaufgabe 3 („kann Handlungen widersprechen, die über den gewöhnlichen Betrieb hinausgehen“); `rechtsangaben-a.md` Zeile 13 („sicher“) und Zeile 6.

Fehler: § 164 HGB lautet nach dem Personengesellschaftsrecht-Reformgesetz (Stand der Gesetzesseite): „Die Kommanditisten sind von der Geschäftsführungsbefugnis ausgeschlossen; § 116 Absatz 2 Satz 1 bleibt unberührt.“ § 116 Abs. 2 verlangt für Geschäfte, die über den gewöhnlichen Betrieb hinausgehen, einen Beschluss aller Gesellschafter. Das alte Widerspruchsrecht (Widerspruch gegen Handlungen der Komplementärin) gibt es in dieser Form nicht mehr; die Kommanditist:innen wirken über den Gesellschafterbeschluss mit (Gesellschaftsvertrag kann das regeln). Die Zeile in `rechtsangaben-a.md` steht als „sicher“ und ist nicht unter den zeitkritischen aufgeführt, obwohl gerade diese Norm geändert wurde. Die Fall-Musterlösung würde sonst eine überholte Rechtslage als Lösung festschreiben.

Korrektur: Theorie: „Die Kommanditist:innen sind von der Geschäftsführung grundsätzlich ausgeschlossen; bei Geschäften, die über den gewöhnlichen Betrieb hinausgehen, ist nach dem Gesetz ein Beschluss der Gesellschafter nötig, an dem sie mitwirken (§ 164, § 116 HGB; der Gesellschaftsvertrag kann das abweichend regeln).“ Tabelle: „Mitwirkung bei außergewöhnlichen Geschäften über den Gesellschafterbeschluss und Informationsrecht kraft Gesetz, mehr nach Vertrag“. Fall TA2/TA3: „Mitwirkung (Gesellschafterbeschluss) bei Geschäften, die über den gewöhnlichen Betrieb hinausgehen“ statt „Widerspruch“; Zeile 13 in `rechtsangaben-a.md` auf „zeitkritisch, Wortlaut nach Reform prüfen“ setzen. Das Wort „Widerspruchsrecht“ in Q-1.3-18-Erklärung gibt es nicht; dort ist nichts zu ändern.

### M1 (mittel): § 233 HGB ist nach der Reform nur noch ein Verweis auf § 166; Zeile 30 nennt „Abs. 1“

Fundstellen: Theorie „Gewinn, Verlust und Kontrolle“ („Die Kontrollrechte sind gering: … (§ 233 HGB)“), Zeile 30 (`§ 233 Abs. 1`), Zeile 14 (§ 166 Abs. 1).

Fehler: Die abgerufene Fassung von § 233 besteht nur aus dem Satz, dass § 166 entsprechend anzuwenden ist; § 166 („Informationsrecht der Kommanditisten“) enthält neben Abschrift des Jahresabschlusses und Bücherprüfung auch ein Auskunftsrecht bei berechtigtem Interesse und erklärt abweichende Vertragsklauseln für unwirksam. „Die Kontrollrechte sind gering … mehr Mitsprache muss der Vertrag vorsehen“ ist deshalb zu schwach beziehungsweise unvollständig; „Abs. 1“ stimmt nicht.

Korrektur: „… kann eine Abschrift des Jahresabschlusses verlangen, seine Richtigkeit anhand der Bücher prüfen und unter Voraussetzungen Auskunft verlangen (§ 233 HGB mit Verweis auf § 166; Einzelheiten nach dem Gesetzestext prüfen)“. Zeile 30: „§ 233 (Verweis auf § 166)“, als zeitkritisch kennzeichnen.

### M2 (mittel): Begriffsangabe zur Haftsumme in Zeile 8 falsch, Zeile 9/10 sind jetzt am Gesetz überprüfbar

Fundstelle: `rechtsangaben-a.md` Zeile 8 („der Begriff „Haftsumme“ ist ein Begriff der Literatur und Rechtsprechung“).

Fehler: „Haftsumme“ ist seit der Reform Gesetzesbegriff (§ 161 Abs. 1, § 162 Abs. 1, § 171 Abs. 1 HGB: Haftung „bis zur Höhe seiner Haftsumme“, ausgeschlossen, „soweit die vereinbarte Einlage geleistet ist“). Die Theorie ist damit richtig (Haftsumme ≠ vereinbarte Einlage), die Rechtsangabe ist es nicht. Zeile 9: § 172 Abs. 4 HGB misst an der **Haftsumme**, nicht an der „geleisteten Einlage“ (Gewinnentnahme, die den Kapitalanteil unter die Haftsumme drückt oder bei bereits darunter liegendem Kapitalanteil); der Text im Thema („unter die Haftsumme“) ist richtig, die Zeile erklärt es anders. Zeile 10: § 176 Abs. 1 HGB knüpft nach dem Gesetzestext an die „Teilnahme am Rechtsverkehr“ vor Eintragung an (nicht mehr an „Geschäftsbeginn“); der Text „Beginnt die KG ihre Geschäfte vor der Eintragung“ ist sinngemäß in Ordnung, könnte aber zu „nimmt die KG vor der Eintragung am Rechtsverkehr teil“ präzisiert werden (Kommanditist:innen, die zugestimmt haben; Ausnahme bei Kenntnis des Gläubigers stimmt).

Korrektur: Zeile 8 streichen/ändern in „Haftsumme: Gesetzesbegriff seit der Reform des Personengesellschaftsrechts; Einlage (vereinbart) und Haftsumme (eingetragen) trennen“; Zeile 9 und 10 auf „am Gesetzestext bestätigt (Stand Abruf), Wortlaut vereinfacht“ umstellen. Zusatz: § 172 Abs. 5 HGB (Einlage in Anteilen an der Komplementärin gilt als nicht geleistet) betrifft genau die in der Theorie genannte Konstellation „Kommanditist:innen sind zugleich Gesellschafter:innen der Komplementär-GmbH“; optional ein Halbsatz „Einlagen durch Anteile an der Komplementär-GmbH zählen den Gläubiger:innen gegenüber nicht (Einzelheiten § 172 HGB)“.

### M3 (mittel): Einordnung der stillen Beteiligung als „Eigenfinanzierung“ zu glatt

Fundstelle: Kopfstück („Die stille Beteiligung ist hier eine Form der Eigenfinanzierung durch Einlage“) und Theorie „Stille Gesellschaft“ („Eigenfinanzierung durch Einlage, Thema 2.2“).

Fehler: Der Bestand `hsq2/2.2` versteht Eigenfinanzierung als Einlage von **Gesellschaftern** (neue Gesellschafter, Anteile). Die stille Gesellschafterin wird nicht Gesellschafterin des Inhabers; je nach Vertrag (Verlustbeteiligung, Nachrang, Laufzeit) ist sie wirtschaftlich Eigen- oder Fremdkapital (Zwischenform, „Mezzanine“). Der Text sagt selbst „zwischen Darlehen und Gesellschafterstellung“, die Klammer widerspricht dem teilweise und kollidiert mit der engeren Bestandsdefinition.

Korrektur: Klammer ersetzen durch „(Beteiligungsfinanzierung, je nach Vertrag wirtschaftlich eher Eigen- oder Fremdkapital; die Finanzierungsarten selbst bleiben in Thema 2.2 „Finanzierungsarten“ im Fachgebiet Investition, Finanzierung, betriebliches Rechnungswesen und Controlling)“; im Kopfstück „Eigenfinanzierung“ streichen.

### M4 (mittel): Strukturnähe zu `handelsfachwirt/hb1/1.7` (Abschnitt „GmbH & Co. KG, Mischformen und Genossenschaft als Rechtsform“, K-1.7-14)

`siebenwort` findet keine inhaltlichen Läufe ab 7 Wörtern im Kursbestand (nur Formeln). Manuell: Der Absatz zur GmbH & Co. KG folgt der Reihenfolge des Handelsfachwirts Satz für Satz: Komplementär-GmbH haftet unbeschränkt nur mit eigenem Gesellschaftsvermögen, Kommanditist:innen oft zugleich Gesellschafter:innen der Komplementär-GmbH, „Der Preis … ist der Aufwand: Zwei Gesellschaften sind zu gründen … zu führen und zu bilanzieren“ (dort: „Der Preis dafür ist ein höherer Aufwand: zwei Gesellschaften sind zu gründen, zu führen und zu bilanzieren“), UG als Komplementärin, Bürgschaft als Haftungsfalle. Der eG-Absatz folgt ebenfalls der dortigen Abfolge (mindestens drei Mitglieder, Satzung, Eintragung; Vorstand, Aufsichtsrat bei kleinen entbehrlich, Generalversammlung, eine Stimme; Nachschüsse ausgeschlossen, begrenzt, unbeschränkt) und endet mit derselben Abgrenzung zur Kooperationsform. K-1.3-21/-22 entsprechen K-1.7-14 im Aufbau. Das Kopfstück behauptet, Aufbau und Beispiele folgten nicht dem Abschnitt im Handelsfachwirt; das trifft nur für Beispiel und Zahlen zu. Die Rechtsbegriffe müssen übereinstimmen; Satzbau und Reihenfolge nicht.

Korrektur: den Satz „Der Preis der Konstruktion ist der Aufwand: Zwei Gesellschaften sind zu gründen …, zu führen und zu bilanzieren“ umformulieren (zum Beispiel über die Folgen für NordWert: zwei Jahresabschlüsse, zwei Anmeldungen, Notarkosten für den Gesellschaftsvertrag der Komplementärin); „Kommanditist:innen sind häufig zugleich Gesellschafter:innen der Komplementär-GmbH“ mit dem Exportbeispiel verknüpfen (hier sind sie es gerade nicht: NordWert und Kapitalgeberin; Wer hält die Komplementär-GmbH?) und in der Reihenfolge der Abschnitte (Haftung vor Konstruktionsgrund) abweichen; Kopfstück-Satz zur Eigenständigkeit relativieren. Der Strukturklon betrifft nur diese zwei Absätze, nicht Fall, Rechenbeispiele, stille Gesellschaft, SE/PartG (keine Treffer in `industriefachwirt/wq1/1.3`, `fachwirt-gesundheit-soziales/hb1/1.1`, `handelsfachwirt/hb1/1.8`).

### N1 (niedrig): Fall F-WBQ1-06, Genossenschaftsteil mehrdeutig

Fundstelle: Ausgangssituation „… die nach dem Beitritt 50 Mitglieder hätte. NordWert würde 12 Geschäftsanteile zu je 500 € übernehmen; das gesamte Geschäftsguthaben aller Mitglieder beträgt 200.000 €.“

Fehler: Unklar, ob die 200.000 € vor oder nach dem Beitritt gelten; die Lösung rechnet 6.000 ÷ 200.000 = 3,0 %, bei „vor dem Beitritt“ wären es 6.000 ÷ 206.000 ≈ 2,9 %. Ferner ist nicht gesagt, dass die Geschäftsanteile voll eingezahlt sind („höchstens 6.000 € verlieren“ gilt nur bei voller Einzahlung beziehungsweise Pflicht zur Einzahlung; sonst kommt die offene Einzahlung hinzu). Außerdem wird Geschäftsanteil (nominelle Beteiligung) und Geschäftsguthaben (eingezahlter Stand) gleichgesetzt, ohne es zu sagen.

Korrektur: „… das gesamte Geschäftsguthaben aller 50 Mitglieder einschließlich NordWert beträgt nach dem Beitritt 200.000 €; die Geschäftsanteile sind voll eingezahlt.“

### N2 (niedrig): Fall Modell B, Ausgangssituation widersprüchlich

„Herr Brodersen bringt sein Unternehmen in die KG ein … Kapitalanteil von 900.000 € (Haftsumme 900.000 €, davon bisher 540.000 € geleistet, der Rest folgt in Raten)“: Wer sein Unternehmen als Sacheinlage einbringt, zahlt nicht in Raten; zudem sagt der Eingangstext, er „kann 900.000 € aufbringen“. Die Rechenaufgabe braucht nur „Einlage in bar, 540.000 € bisher gezahlt“.
Korrektur: „Herr Brodersen führt sein Unternehmen in der KG fort und zahlt seine Bareinlage von 900.000 € in Raten; bisher sind 540.000 € geleistet.“

### N3 (niedrig): Punkteraster Teilaufgabe 5 und 3 unausgewogen

TA5 verlangt vier Gesichtspunkte je Modell (8 Stück), eine Empfehlung und eine Grenze und gibt dafür 3 Punkte; das Raster gibt 1 Punkt für alle acht Gesichtspunkte. TA3 vereint sieben Teilleistungen (Gewinnanteil, Differenz, Fehlbetrag, Zugriff, Ausfall, Geschäftsführung, Rechte, Außenwirkung) in 5 Punkten. Summe 20 stimmt (5+4+5+3+3). Vorschlag: TA5 auf „je ein Gesichtspunkt für und gegen beide Modelle“ kürzen oder die Punkte 5/4/4/3/4 verteilen; Alternative ist akzeptabel, wenn die Erwartung transparent bleibt.

### N4 (niedrig): Modell A und B nicht vergleichbar gestaltet

Modell A gibt NordWert 25 % bei 40 % Kapitalanteil in Modell B (derselbe Einsatz 600.000 €, derselbe Gewinn); atypische Rechte (Wertbeteiligung, Zustimmungsrecht) werden verlangt, aber nicht bepreist. Das Rechenergebnis „78.000 € mehr“ ist damit teilweise Folge der Annahme. Hinweis in der Grenze von TA5 ergänzen („Der Gewinnanteil in Modell A ist verhandelbar; der Unterschied folgt aus den Annahmen“).

### N5 (niedrig): Kurzverweise ohne Titel und Fachgebiet

Nach dem Eingangsabsatz stehen „Thema 3.1“ (zweimal), „Thema 3.4“ (zweimal, in der Tabelle der Abgrenzung), „Thema 2.2“ (zweimal), „Thema 1.4“ (Fall, Musterlösung TA4; Themenbezug nennt nur Fachgebiet) und „Thema 1.7“ nur im Kopfstück ohne Titel. Hausregel: Kurzverweise immer mit Titel und Fachgebiet. Außerdem verweist die Theorie zweimal auf „Thema 3.4“ für die Besteuerung der atypisch stillen Gesellschaft („Einzelheiten Thema 3.4, hier nicht behandelt“); der Bestand `wbq3/3.4` behandelt Mitunternehmerschaft nicht (Suche ohne Treffer), und der Satz ist in sich widersprüchlich. Korrektur: „(steuerliche Einzelheiten sind nicht Gegenstand von Thema 3.4 „Unternehmensrelevantes Steuerrecht“ im Fachgebiet Recht und Steuern)“.

### N6 (niedrig): Hinweissatz ist ein Disclaimer-Absatz; Paragrafendichte

Der Einleitungsabsatz der Theorie besteht aus sechs Sätzen (Hinweis, Gesetze nur Stützangabe, Beträge, Verweise, durchgehendes Beispiel) statt eines Hinweissatzes (P-Z-Auftrag „ein Hinweissatz, kein Disclaimer-Absatz“). In der Theorie stehen rund 23 Paragrafenangaben; gefordert ist „sparsam und nur, wenn sie wirklich helfen“. Vorschlag: auf die tragenden (§ 161, § 171/172, § 19, § 264a HGB; § 13 Abs. 2 GmbHG; § 1 GenG; § 8 PartGG) beschränken; die übrigen (§ 35 GmbHG, § 162, § 164, § 166, § 176, § 230 bis § 233, § 236, § 53, § 54, § 2 GenG) entfallen oder wandern in `rechtsangaben-a.md`. Dort steht die Aussage ohnehin.

### N7 (niedrig): sprachliche Fehler und Stand-Zusätze

- Theorie: „Hinter den Gläubiger:innen der KG steht dann keine natürliche Person mit ihrem Privatvermögen.“ Sinn verfehlt: „Für die Verbindlichkeiten der KG steht dann keine natürliche Person mit ihrem Privatvermögen ein.“
- Q-1.3-15 Zuordnung: „die stille Gesellschafter:in“ ist grammatisch falsch: „stille:r Gesellschafter:in“ oder „die stille Gesellschafterin“; im Kurs sonst „stille Gesellschafter:innen“.
- Generisches Femininum („die Inhaberin“, „die Komplementärin“, „die stille Gesellschafterin“, „die Kapitalgeberin“) in Theorie, Karten, Quiz, obwohl K-1.3-24 „Inhaberin oder Inhaber“ einführt und danach nur „die Inhaberin“ nutzt; Hausregel: Doppelpunkt-Gendern. Für die erfundene Kapitalgeberin als Rolle vertretbar, für die allgemeine Rolle „Inhaber:in“, „stille:r Gesellschafter:in“ vereinheitlichen. Der Handelsfachwirt nutzt „Komplementärin“ für die Rolle der GmbH, das kann bleiben.
- Q-1.3-18, vierte Antwort nennt „25.000 €, dem Mindeststammkapital“ ohne Stand-Zusatz (Distraktor, Erklärung ohne Zahl); Stand-Zusatz in die Frage aufnehmen oder Zahl streichen. T3 „in der Regel mindestens zwei Personen“ (Vorstand) ist eine Rechtszahl ohne Stand-Zusatz.
- K-1.3-28/-29 tragen den Stand-Zusatz in der Frage; zulässig.

### N8 (niedrig): Genossenschaftsrecht, Prüfungsrhythmus anders herum formulieren

Text und Zeile 46: „in jedem zweiten Geschäftsjahr, bei einer Bilanzsumme über zwei Millionen Euro in jedem Geschäftsjahr“. Inhaltlich gleichwertig; das Gesetz formuliert die jährliche Prüfung als Regel und den Zweijahresrhythmus als Erleichterung für Genossenschaften bis zwei Millionen Euro Bilanzsumme. Vorschlag: „in jedem Geschäftsjahr; bei einer Bilanzsumme bis zwei Millionen Euro nur in jedem zweiten Geschäftsjahr (Stand …)“. Zeile 46 kann von „vermutet“ auf „am Gesetzestext bestätigt (§ 53 Abs. 1 GenG, Stand Abruf), zeitkritisch wegen Reformen“ umgestellt werden. Das Gesetz kennt zusätzlich die erweiterte Jahresabschlussprüfung (Abs. 2); im Text nicht dargestellt, ist ausdrücklich zu nennen, wenn „Erleichterungen für sehr kleine Genossenschaften sind hier nicht dargestellt“ stehen bleibt. § 1 GenG nennt auch soziale und kulturelle Belange; die Theorie spricht nur von wirtschaftlichen Belangen (vereinfacht, in Ordnung, Zeile 36 vollständig).

### N9 (niedrig): Ersetzung `ersetzungen-a.json`

Technisch in Ordnung: genau ein Treffer in `wbq1/fallaufgaben.md` (F-WBQ1-02 Musterlösung Teilaufgabe 2), einzeilig. Inhaltlich tragfähig; drei Anmerkungen: (a) „unbeschränkt haften müsste (als natürliche Person mit dem Privatvermögen; …)“ legt nahe, ein Komplementär sei immer eine natürliche Person; besser „(bei einer klassischen KG als natürliche Person mit dem Privatvermögen; …)“. (b) „Abschnitt „GmbH & Co. KG“ in Thema 1.3“ passt nicht zur Überschrift „GmbH & Co. KG: Haftungsbeschränkung in der Kommanditgesellschaft“; Verweis auf „Abschnitt „GmbH & Co. KG: Haftungsbeschränkung in der Kommanditgesellschaft““ oder weglassen. (c) Anführungszeichen: Bestand nutzt „…" (öffnend „, schließend "), die Ersetzung „…“ ist typografisch uneinheitlich. Schließlich ist `ersetzungen` in `einspielen-config.json` leer; ob `ersetzungen-a.json` darüber eingespielt wird, sollte der Auftraggeber sicherstellen (nicht Teil der Prüfung). Weitere Bestandsstellen, die nach der Ergänzung ungenau sind (keine Widersprüche): „im Handelsregister eingetragene Einlage“ der Kommanditist:innen in `1.3` Theorie, K-1.3-12, Q-1.3-02 („eingetragene Einlage“) und `fachgespraech.md` 1.3 („im Handelsregister eingetragenen Einlage“): nach der Unterscheidung Haftsumme/Einlage eigentlich „Haftsumme“; optional mitersetzen oder als bekannte Vereinfachung im Kopfstück belassen (steht dort schon).

## Bestätigt (ohne Befund)

- Rechnen: 45 Werte und alle 3 × 40 Antwortschreibweisen korrekt (Gewinnverteilung 72/28, 270.000/105.000, 15,0 %; stille Beteiligung 75.000, ≈ 10,7 %, 300.000, 30.000 mehr; Verlust 240.000/460.000/510.000/50.000; Haftung 1.400.000, 225.000, 1.175.000, 1.375.000; Q-1.3-14 111.000 und 27,75 %; Q-1.3-17 150.000; Q-1.3-23 70.000 und 105.000; Fall 130.000, 21,7 %, 630.000, 30.000, 208.000, 312.000, 78.000, 1.300.000, 360.000, 385.000, 915.000, 2,0 %, 6.000, 3,0 %). Fall 20 Punkte, Raster je Teilaufgabe summiert richtig, fünf Teilaufgaben, Folgefehler vorhanden. Die Prozentpunkte-Regel entfällt (keine Prozentpunktfragen).
- Fachlich richtig und am Gesetz bestätigt: Haftsumme/Einlage (§ 171 HGB), Wiederaufleben (§ 172 Abs. 4), Haftung vor Eintragung (§ 176), Firmenzusatz (§ 19 Abs. 2), Offenlegung (§ 264a), Verlusttragung nur bis zur Einlage und Anrechnung späterer Gewinne (§ 232 Abs. 2; Zeile 29 kann auf „sicher“), Insolvenz der Inhaberin (§ 236 Abs. 1), Mindestzahl drei Mitglieder (§ 4 GenG), eine Stimme je Mitglied (§ 43 Abs. 3 GenG; Mehrstimmrecht nur unter engen Voraussetzungen), Haftung und Namenszusatz PartG/mbB (§ 8, § 2 PartGG), SE (120.000 €, „SE“, dualistisch/monistisch; aus eigenem Wissen, Art. 4, 11, 38 SE-VO).
- Quiz: 12 Fragen, alle Typen gemischt (2 MC, 3 Kurzantworten, je 1 Zuordnung, W/F, Mehrfachauswahl, Sortieren mit 4 Elementen, Was passt nicht, Entweder-Oder, Lückentext), Kurzantworten 3 von 12, Szenarioanteil sechs von zwölf, richtige Antwort bei MC/Mehrfach/Was passt nicht nie die längste (Zeichenzahl geprüft), Positionen verteilt, nur eine Wahr/Falsch. IDs lückenlos K-1.3-21 bis -30, Q-1.3-13 bis -24 nach Bestand K bis -20, Q bis -12; F-WBQ1-06 folgt auf F-WBQ1-05.
- Keine Frage hängt allein an einer Paragrafennummer; keine Steuer- oder Beitragssätze; Rechtszahlen tragen mit Ausnahme von N7 den Stand-Zusatz.
- Bestand: nur F-WBQ1-02 (Teilaufgabe 2) ist eine Stelle, die ergänzt werden sollte; sonst kein Widerspruch zu `wbq1/1.3`, `1.4`, `hsq2/2.2` (Bürgschaft), `wbq3/3.1`, `wbq3/3.4` (Personengesellschaft: Einkommensteuer), `wbq3/fallaufgaben.md` F-WBQ3-03 (KG im Konzernverbund, kein Widerspruch). Register: keine kollidierenden Werte (280 Beschäftigte, Standorte); neue Namen (Brodersen, Stade, Nordverbund Büro eG, NordWert Export) kommen nirgends sonst vor.
- Kollisionen mit Teilen B, C, D: keine Treffer für die Zahlen und Namen aus Teil A in den Entwürfen B, C, D (Stand der Prüfung, Teil C hat bereits `pruefung-c.md`).

## Zusammenfassung

Zahl der Befunde: 1 hoch, 4 mittel, 9 niedrig (N1 bis N9). Nachgerechnete Werte: 45 plus 3 vollständige Antwortlisten (120 Schreibweisen). Geprüfte Rechtsaussagen: 65 Zeilen durchgesehen, 21 Normen am Gesetzestext abgeglichen.
