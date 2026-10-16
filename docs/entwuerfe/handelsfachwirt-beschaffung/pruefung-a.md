# Prüfung Teil A (P-W): Ergänzung HB4 4.1, F-HB4-05, Fachgespräch 4.1

Geprüft: `hf-4.1-ergaenzung-e-procurement-warenwirtschaft.md`, `hf-faelle-a.md`. Maßstab: `auftrag.md`. Keine Entwurfsdatei und nichts im Bestand geändert.

## Ergebnis in Kürze

- **Rechnen:** 41 Werte per Node-Skript nachgerechnet (Theorie 17, Quiz 4, Fall 20; dazu Hilfsgrößen wie 65,44 % und 3,03 Tage). Alle Ergebnisse, Musterlösungen und „Akzeptierte Antworten“ stimmen. **Eine Rundungsunstimmigkeit** in F-HB4-05 Teilaufgabe 4 (mittel).
- **Fachlich:** keine sachlichen Fehler bei Buchbestand, Inventurdifferenz, Stamm-/Bewegungsdaten, E-Procurement-Formen, EDI. Drei Unschärfen (Aktionsware, „quantitativ = stochastisch“, Abgrenzung heuristisch/qualitativ) und eine nicht trennscharfe Zuordnung (Q-4.1-25).
- **Bestand/Register:** kein Widerspruch zum Bestand. Eine nicht abgegrenzte Begriffsnähe („Kosten je Bestellung“ in `hb3/3.4`), ein ungenauer Verweis im Kopfstück (K-4.2-14/-15 decken nur EDI).
- **Hausregeln:** IDs lückenlos, Quiztypen gemischt, 4 Kurzantworten (alle Rechnen), richtige Antwort nirgends die längste, Szenariofragen 4 eindeutig plus 1 Grenzfall (Soll 4), Fall 3/4/4/4/5 = 20 ganzzahlig, Folgefehler vorhanden.
- **Kein hoher Befund.**

## Befunde

### Mittel

**M1 · F-HB4-05 Teilaufgabe 4 (Musterlösung): Rundungskette widersprüchlich.**
Fehler: Die Musterlösung rechnet „Systemkosten je Bestellung ≈ 9,54 €“ und dann „x = (9,54 € − 0,90 €) ÷ 13,20 € ≈ 0,654, also etwa 65,4 %“. Mit dem gerundeten 9,54 € ergibt die Rechnung aber 8,64 ÷ 13,20 = 0,6545, also **65,5 %**. Nur mit dem ungerundeten Wert (16.215 ÷ 1.700 = 9,5382…) kommt 65,4 % heraus (exakt 14.685 ÷ 22.440 = 0,65441). Wer wie im Lösungsweg zwischenrundet, erhält 65,5 % und verliert den Punkt, obwohl die Aufgabe keine Rundungsregel für Zwischenwerte nennt.
Korrektur: In der Aufgabe ergänzen „ohne Zwischenrundung“ und die Lösung geradlinig rechnen: x = (16.215 € − 1.700 × 0,90 €) ÷ (1.700 × 13,20 €) = 14.685 € ÷ 22.440 € ≈ 0,6544, also 65,4 %. Zusätzlich im Raster „65,4 bis 65,5 % (je nach Zwischenrundung) gelten als richtig“.

**M2 · Theorie „Qualitative Bedarfsermittlung im Modehandel“ (erster Absatz): „Quantitative (stochastische) Verfahren“.**
Fehler: Die Klammer setzt quantitativ mit stochastisch gleich. Die deterministische Ermittlung (Tabelle: „Aktionsware … deterministisch aus dem Aktionsplan“) ist ebenfalls quantitativ. Lernende könnten ableiten, deterministisch sei qualitativ.
Korrektur: „**Quantitative** Verfahren rechnen dagegen mit Zahlen, etwa die stochastischen mit Zahlenreihen der Vergangenheit und die deterministischen mit bekannten Planungsgrößen.“

**M3 · Aktionsware widersprüchlich behandelt (Theorie letzter Absatz, Tabelle, K-4.1-30, Fachgespräch 2).**
Fehler: Die Tabelle ordnet Aktionsware der deterministischen Ermittlung aus dem Aktionsplan zu („ergänzt um eine Schätzung“). Der Schlussabsatz sagt dagegen, bei „neuen Trendartikeln, Aktionsartikeln und AZ-Artikeln bestimmt die Disposition die Menge qualitativ“. K-4.1-30 und das Fachgespräch führen Aktionsartikel zusätzlich unter „Vorschläge besonders prüfen“. Drei verschiedene Zuordnungen für denselben Artikeltyp.
Korrektur: Im Schlussabsatz „Aktionsartikeln“ streichen und einen eigenen Satz setzen: „Bei Aktionsartikeln steht die Menge aus dem Aktionsplan; die Disposition prüft sie gegen die erwartete Nachfrage, weil Aktionen die Verkaufsreihen verzerren.“ K-4.1-30 und Fachgespräch bleiben dann stimmig (Prüfung, nicht rein qualitative Menge).

**M4 · Abgrenzung heuristisch/qualitativ („Art“ gegenüber „Werkzeugen“): im Kurs tragfähig, aber mit Prüfungsrisiko.**
Befund: Zum Bestand besteht kein Widerspruch (`4.1`: Heuristik = Schätzung nach Erfahrungswerten und Trendbeobachtungen, K-4.1-05, Q-4.1-02, F-HB4-01). Die Brücke „heuristisch = Art, qualitative Verfahren = Werkzeuge“ ist eine eigene Konstruktion. In Fachliteratur und Prüfungen werden „heuristisch“ und „qualitativ“ meist gleichbedeutend gebraucht. Zusätzlich nennt der Bestand „Trendbeobachtungen“ bereits als Bestandteil der Heuristik, der Entwurf führt „Trendinformationen“ als Werkzeug dahinter; die Linie ist also nicht ganz scharf.
Korrektur: Im Absatz einen Satz ergänzen: „In der Fachliteratur werden beide Wörter oft gleichbedeutend gebraucht; im Kurs benennt ‚heuristisch‘ die Art der Ermittlung (Schätzung ohne Datenreihe), ‚qualitative Verfahren‘ die Werkzeuge dazu.“ K-4.1-28 entsprechend um „in der Literatur oft gleichbedeutend“ ergänzen.

**M5 · Q-4.1-25 (Zuordnung): Katalogbestellung und Lieferantenportal nicht trennscharf.**
Fehler: Die Theorie fasst das Lieferantenportal als Web-Zugang, „über den bestellt, der Auftragsstatus verfolgt und die Rechnung abgerufen wird“. Die Katalogbestellung hat den Katalog „im eigenen System“. Die Zuordnung formuliert die Katalogbestellung dagegen als „Online-Katalog des Lieferunternehmens … Warenkorb“. Das passt auch zum Portal, das ebenfalls das Bestellen einschließt; die Zuordnung ist dadurch nicht eindeutig.
Korrektur: Element 1: „Eine Filiale wählt Tragetaschen aus dem im eigenen System hinterlegten Katalog mit den vereinbarten Preisen des Lieferunternehmens aus und legt sie in einen Warenkorb“. Element 2 wie bisher (Aufträge, Lieferstatus, Rechnungen im Web-Zugang des Lieferunternehmens).

**M6 · Begriffsnähe „Prozesskosten je Bestellung“ gegenüber „Kosten je Bestellung“ in `hb3/3.4` nicht abgegrenzt.**
Fehler: `hb3/3.4` belegt „Kosten je Bestellung (im Kurs: Bearbeitungskosten je Bestellung)“ für Kundenbestellungen im Online-Shop (Kommissionierung, Versand, Zahlungsentgelte). Das Kopfstück führt „Prozesskosten je Bestellung“ als „neu im Kurs“, ohne die Nachbarbegriffe zu nennen. Der Auftrag verlangt, abweichend belegte Begriffe ausdrücklich abzugrenzen.
Korrektur: In der Theorie vor der Formel einen Satz: „Gemeint sind die Kosten einer **Einkaufsbestellung** bei einem Lieferunternehmen; nicht zu verwechseln mit den Bearbeitungskosten je Kundenbestellung im Online-Shop (Thema 3.4 „Visual Merchandising und E-Commerce“ im Fachgebiet Handelsmarketing).“ Im Kopfstück-Abgleich ergänzen.

### Niedrig

**N1 · Szenariofragen knapp.** Nachgezählt: eindeutig Q-4.1-23, -27, -28, -31 (4 von 12); Q-4.1-25 (Situationen je Form) ist ein Grenzfall. Der Autor zählt 5, Soll ist 4 (ein Drittel von 12). Erfüllt, aber ohne Reserve. Korrektur: Q-4.1-34 als Szenario fassen („Die Disposition der Loreno Mode & Wohnen GmbH erhält vom System einen Nettobedarf von 830 Stück für einen Schal …“) oder Q-4.1-30 mit einer Ausgangslage (Basic-Shirt der Loreno, Meldebestand erreicht) versehen.

**N2 · Q-4.1-23 und F-HB4-05 Teilaufgabe 2 nutzen dieselben Zahlen (6 → 11 Tage) und denselben Lerngedanken.** Das Quiz nimmt die Lösung des Falls vorweg; dazu kommt das Theoriebeispiel (7 → 12 Tage). Korrektur: Q-4.1-23 auf 5 → 9 Tage ändern (Fragetext), Erklärung bleibt.

**N3 · Q-4.1-34: Karton mit 36 Stück ist identisch mit dem Aufrundungsbeispiel in `wirtschaftsfachwirt/hsq3/3.4` (Karton mit 36 Rollen, Aufrunden auf die Verpackungseinheit).** Kein Satzklon, aber gleiche Größe und gleicher Rechenschritt. Korrektur: Karton mit 25 Stück: 830 ÷ 25 = 33,2, aufgerundet 34 Kartons, 34 × 25 = 850 Stück; „Akzeptierte Antworten“ auf 850 / 850,0 / 850.0 / 850,00 / 850.00 und jeweils „ Stück“ umstellen, Erklärung anpassen. (Gleiche Prüfung: die Zahl 36 steht nur in Q-4.1-34.)

**N4 · Kurzverweis ohne Titel und Fachgebiet:** Tabelle E-Procurement, Zeile EDI: „(Technik siehe Thema 4.2)“. Korrektur: „(Technik siehe Thema 4.2 „Supply Chain Management“ im Fachgebiet Beschaffung und Logistik)“.

**N5 · Kopfstück: „EDI und RFID … beschrieben (K-4.2-14 und -15)“.** Die beiden Karten behandeln nur EDI (Abkürzung, Nutzen); RFID steht nur in der Theorie von `4.2`. Korrektur: „EDI (K-4.2-14 und -15) und RFID (Theorie von 4.2)“.

**N6 · F-HB4-05 Teilaufgabe 3: Annahme „volle Wirksamkeit der Zeitersparnis“ steht nur in der Musterlösung** („rechnerisch, bei voller Wirksamkeit“), nicht in der Aufgabe; Teilaufgabe 4 relativiert dann. Korrektur: Teilaufgabe 3 um „Rechnen Sie dabei mit voller Wirksamkeit der Zeitersparnis.“ ergänzen.

**N7 · F-HB4-05 Themenbezug „Verweis auf 4.3 (Retouren im Lager)“:** Im Fall wird nichts aus 4.3 geprüft; Retouren sind nur ein Zugangsposten. Korrektur: Verweis streichen oder durch „Verweis auf 3.4 (Omnichannel, Bestand von Filialen und Online-Shop)“ ersetzen, falls gewünscht.

**N8 · Q-4.1-30:** „Die zuständige Disponent:in“ liest sich holprig. Korrektur: „Die zuständige Disposition prüft den Vorschlag und gibt ihn frei“.

**N9 · Theorie „Schnittstellen“:** „Der Online-Shop … gibt Bestellungen und Retouren zurück“. Korrektur: „meldet Bestellungen und Retouren an das System“.

**N10 · Q-4.1-28 (Wahr/Falsch):** „ohne Korrektur“ ist ein Absolutheitssignal, das Lernende ohne Fachwissen als „falsch“ lesen. Korrektur: „… kann die Verkaufsrate je Filiale und Woche deshalb unverändert auf alle übrigen Filialen übertragen werden, ohne dass die Menge zu hoch ausfällt.“ (optional).

**N11 · Möglicher Zusatzverweis:** Inventurdifferenz steht auch in `hb1/1.5` (kalkulatorisches Wagnis ersetzt festgestellte Inventurverluste). Kein Widerspruch zum Entwurf; ein Satz „Zum Wagnis für Inventurdifferenzen siehe Thema 1.5 „Kosten- und Leistungsrechnung im Handel“ im Fachgebiet Unternehmensführung und -steuerung“ würde die Verbindung zeigen.

## Nachgerechnet (alle OK, Skript `pw-a-rechnen.cjs`)

- Theorie: Wolldecken 820 + 600 − 700 − 120 = 600; −12 Stück = −2,0 %; Strickschal (12 − 7) × 30 = 150; Auszeichnungsmaterial 34 Min → 18,30 €, 14 Min → 7,70 €, Ersparnis 10,60 €, Break-even 800, Ergebnis 7.420 €; Testverkauf 60,0 %, 7,5, 1.800, 1.440; Prognoseabweichung +15,0 %; 6 Prozentpunkte; Karton 1.340 ÷ 48 = 27,9 → 28 → 1.344.
- Quiz: Q-4.1-24 = 510, Q-4.1-26 = 16,30 €, Q-4.1-29 = 7, Q-4.1-34 = 864 (830 ÷ 36 = 23,06 → 24). „Akzeptierte Antworten“ enthalten Komma-/Punktformen, ,0/,00, Einheit, €/Euro/EUR (Leerzeichen werden laut Auftrag beim Vergleich ignoriert).
- F-HB4-05: Buchbestand 1.725; Abgänge 2.970; Tagesverbrauch 99; Inventurdifferenz −21 Packs = −1,2 % (−1,217); Meldebestand 894 / 1.389; Verzögerung 5 Tage; Fehlmenge 195 (Sicherheitsbestand deckt 3,03 Tage); Minuten 38 / 16; Prozesskosten 24,50 € / 10,40 €; Ersparnis 14,10 €, Jahr 23.970 €; Break-even 1.150 (exakt, 14,10 × 1.150 = 16.215); Jahresergebnis 7.755 €; Zeitanteil 13,20 € je Bestellung, Sachkosten 0,90 €, Systemkosten je Bestellung 9,5382 €, Mindestanteil 65,44 % (siehe M1); Verkaufsrate 12,5; Abverkaufsquote 62,5 %; Hochrechnung 2.975; 99,17 → 100 Kartons = 3.000 Stück. Raster 3 + 4 + 4 + 4 + 5 = 20, je Teilaufgabe ganzzahlig und Summe eindeutig (3 × 1; 4 × 1; 4 × 1; 4 × 1; 5 × 1).

## Weitere Prüfungen ohne Befund

- **IDs:** Bestand K-4.1-01 bis -20 und Q-4.1-01 bis -22 lückenlos; `git log -S` findet keine früher vergebenen K-4.1-21, Q-4.1-23 oder F-HB4-05. Neu K-4.1-21 bis -30 (10), Q-4.1-23 bis -34 (12), lückenlos; F-HB4-05 folgt auf F-HB4-04 (letzter Fall im Bestand).
- **Quiztypen:** MC, Kurzantwort ×4, Zuordnung, Mehrfachauswahl, Wahr/Falsch, Sortieren (genau 4), Entweder-Oder, Was passt nicht dazu, Lückentext (Wortauswahl). Kurzantworten 4 von 12 (≤ 6), alle Rechnen (≥ 3). Zuordnung hat 4 Paare.
- **Längste Antwort:** Q-4.1-23 korrekte Option 120 Zeichen bei Maximum 123 (zweitlängste, Optionen 117 bis 123); Q-4.1-27 korrekte 88/89/60 bei Maximum 106; Q-4.1-31 korrekt 110 von 129; Q-4.1-32 korrekt 49 von 59; Wahr/Falsch zählt nicht. Positionen verteilt (3, 1/3/5, 2, 2, 4).
- **Ansprache und Form:** Karten und Quiz duzen, Fall und Fachgespräch siezen, Theorie neutral; Gendern mit Doppelpunkt (nur „Disponent:in“, „Fachleute“, „Lieferunternehmen“, „Lieferantenportal“ als Fachbegriff). Zahlenformat (Tausenderpunkt, Dezimalkomma, Leerzeichen vor €, %, Einheiten, Vorzeichen ohne Leerzeichen) durchgehend korrekt. Keine Paragrafen, Gesetzes- oder Behördennamen; Hinweis „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“ steht in der Theorie.
- **Kurzverweise** (außer N4) mit Titel und Fachgebiet; Titel stimmen mit den Frontmattern überein (3.1, 3.2, 3.4, 4.2, 4.3, 7.1 mit „Einkauf (Wahlpflicht)“).
- **Wiederholung:** keine Wiederholung von Meldebestand, Nettobedarf, ABC/XYZ, Vor-/Nachorder (nur Verweis „siehe oben“); EDI nur eingeordnet, Primär-/Sekundärforschung, Kundenbefragung und Testverkauf nur verwiesen (3.1 nennt Testverkäufe in der Primärforschung; die Mengenseite ist neu). Lagerverwaltungssystem nur Verweis (4.3 nennt LVS nur im Zusammenhang mit chaotischer Lagerung und einem Quiz).
- **`zahlen`:** nur Zufallstreffer bei gängigen Werten (0,50; 0,60; 1.800; 3.000 …); bei Teil B bis D ähnliche Einzelwerte (10,60 in D, 7,70 in C, 1,70 in D, 1,80 in C), jeweils in anderem Zusammenhang, keine Doppelung eines Aufgabenkerns.
- **`siebenwort`:** nur Formelhaftes (Kurzverweisfloskeln, ID-Zeilen, Standardsätze „Bewertet werden die Ergebnisse …“, Folgefehlersatz aus dem Bestand-Muster) und Wiederholungen zwischen Thema und Fall im Paket (Sätze zu Testfilialen und Betriebsbedarf, bewusst konsistent). Kein Satzklon aus `hsq3/3.4`, `hq2/6.4`, `6.5` oder Transport-/Büro-Kursen. Strukturklon: nein (der Bestand rechnet Prozesskosten top-down als Prozesskostensatz, der Entwurf bottom-up mit Minuten × Satz).
- **Fachgespräch:** 2 Fragen mit 5 und 4 Erwartungen (3 bis 5) und je einer Rückfrage, Sie-Form, passt zum Fall.
- **Realismus:** Größenordnungen für den Modehandel stimmig (Personalkostensatz 0,60 € je Minute = 36 € je Stunde, 1.700 Bestellungen für rund 40 Filialen und Zentrale, Retourenanteil Online 135 von 720, Kartons zu 30/36/48, Testverkaufsrate 12,5 Cardigans je Filiale und Woche in großen Innenstadtlagen).
