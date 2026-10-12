# Unabhängige Prüfung der Ergänzungs-Items (Technischer Fachwirt)

Stand 12.10.2026 · Prüfung von zwölf Entwurfsdateien in fünf Paketen: `tf-ergaenzungen-items-rw` (1.1, 2.1, 2.2, 2.3), `-tq2` (6.1, 6.2, 6.3), `-tq3-71` (7.1), `-tq3-74` (7.4), `-hq2` (9.1, 9.2, 9.3). Geändert wurde nichts an den Entwürfen und unter `content/`.

## Vorgehen

- **Rechnen:** Alle Rechen- und Leseaufgaben (alle 87 Quizfragen, davon rund 70 mit Rechnung, dazu die Zahlenbeispiele der Karteikarten) wurden mit eigenen Python-Skripten gerechnet, bevor die Ergebnisse der Entwurfsagenten angesehen wurden; erst danach wurde verglichen. Die Linienabgleich-Zuordnung (RPW), die Eckpunkte und das Optimum mit zwei Engpässen, die MPM-Vor- und Rückwärtsrechnung sowie die Reihenfolge nach kürzester Operationszeit wurden jeweils programmiert und durch Durchprobieren (alle ganzzahligen Mengen beziehungsweise alle sechs Reihenfolgen) gegengeprüft.
- **Theorie:** Die Items wurden Satz für Satz mit den eingearbeiteten Theorieabschnitten in `content/technischer-fachwirt/` abgeglichen (Formeln, Beispielwerte, Begriffe, Buchungssätze).
- **Format und IDs:** Ein Strukturskript hat Überschriften, Pflichtzeilen, Optionenzahl und Anzahl richtiger Optionen, doppelte Zuordnungs-Seiten, Metazeile, Zeilenenden, lückenlose ID-Folgen und Schreibweise (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten) geprüft. Zusätzlich wurden `content-parser.ts`, `antwort-normalisierung.ts` und `checkKurzantwort` gelesen: Kurzantworten werden nach Kleinschreibung und Entfernen aller Leerzeichen exakt verglichen (`match_mode: "exact"`), Punkt und Komma werden nicht angeglichen; Optionen und Zuordnungsseiten werden beim Anzeigen gemischt (die Position der richtigen Option ist daher unerheblich).
- **Skripte:** `pruefer_*.py` im Arbeitsbereich (Scratchpad), nicht im Repository.

## Ergebnis in Kürze

| Schwere | Anzahl |
|---|---|
| Fehler (fachlich falsch) | 1 |
| Mehrdeutig / inkonsistent | 2 |
| Ungenau / Stil / Format / Hinweis (N1 bis N15) | 15 |

**Alle Zahlenergebnisse stimmen.** Kein Rechenfehler, keine falsche Option mit dem Wert der richtigen Option, keine Rundungsfalle (die knappsten Fälle: 74,65 % zu 74,7 % in Q-7.4-34, 2.086,56 € zu 2.087 € in Q-7.4-39, 302,04 zu 302 in Q-6.3-29, 37,11 % zu 37,1 % in Q-2.1-37; jeweils eindeutig). Alle IDs schließen lückenlos an die Zieldateien an, keine Kollision mit vorhandenen IDs der Zieldateien und mit den übrigen Entwürfen in `docs/entwuerfe/`. Jede Multiple Choice hat vier verschiedene Optionen mit genau einer richtigen, jede Mehrfachauswahl zwei richtige von vier, alle Zuordnungen haben verschiedene linke und rechte Seiten, die Metazeilen sind vollständig, alle Dateien sind LF.

Der einzige fachliche Fehler steht auf einer Karteikarte (K-2.1-29, Buchungssatz zur aktiven Rechnungsabgrenzung verkehrt herum).

---

## 1. Fehler

### F1 · `tf-ergaenzungen-items-rw/2.1-items.md` · K-2.1-29 · Fehler (hoch)

Zitat: „aktive Rechnungsabgrenzung bei einer Auszahlung für Aufwand des neuen Jahres (Aufwandskonto an aktive Rechnungsabgrenzung)“

Begründung: Die Soll/Haben-Seite ist vertauscht. Die aktive Rechnungsabgrenzung ist ein Aktivposten und nimmt zu, steht also im Soll; das Aufwandskonto wird entlastet und steht im Haben. Die Theorie bucht: „Abgrenzung: Aktive Rechnungsabgrenzung 9.000 € an Versicherungsbeiträge 9.000 €.“ Auch Q-2.1-33 (Erklärung) bucht richtig „Aktive Rechnungsabgrenzung 12.000 € an Versicherungsbeiträge 12.000 €“; die Karte widerspricht also dem Quiz. Die drei übrigen Klammern der Karte stimmen (Ertragskonto an passive Rechnungsabgrenzung; sonstige Forderungen an Ertragskonto; Aufwandskonto an sonstige Verbindlichkeiten).

Korrekturvorschlag (Wortlaut): „aktive Rechnungsabgrenzung bei einer Auszahlung für Aufwand des neuen Jahres (aktive Rechnungsabgrenzung an Aufwandskonto)“

---

## 2. Mehrdeutig / inkonsistent

### M1 · `tf-ergaenzungen-items-rw/2.2-items.md` · Q-2.2-31 · inkonsistent mit Q-2.2-29 und Q-2.2-30 (mittel)

Zitat: „Die Montage der Vantera Präzisionstechnik GmbH hat primäre Gemeinkosten von 340.000 €. Aus dem Stufenleiterverfahren kommen 36.000 € aus der Energieversorgung und 74.000 € aus der Instandhaltung hinzu.“

Begründung: Die Übersicht stellt Q-2.2-29 bis 31 als eine zusammenhängende Umlage dar („die dritte die Zuschlagssatzbildung nach der Umlage“). In Q-2.2-29 verteilt sich die Energieversorgung aber auf Instandhaltung, Material, Zerspanung sowie Verwaltung und Vertrieb (30.000 + 10.000 + 150.000 + 10.000 = 200.000 kWh, Umlagesatz 0,60 €/kWh), in Q-2.2-30 die Instandhaltung auf Material, Zerspanung sowie Verwaltung und Vertrieb (2.500 Stunden, 120,00 €/h). Eine Kostenstelle Montage kommt in keinem Schlüssel vor. Die Beträge 36.000 € (= 60.000 kWh · 0,60 €) und 74.000 € (= 616,67 Stunden · 120,00 €) sind mit diesen Schlüsseln nicht vereinbar; wer die Aufgaben als eine Kette liest, findet einen Widerspruch. (Allein gelesen ist Q-2.2-31 rechnerisch eindeutig: 340.000 + 36.000 + 74.000 = 450.000; 450.000 / 500.000 = 90 %.)

Korrekturvorschlag (Wortlaut, mit den Werten aus Q-2.2-29 und Q-2.2-30; gerechnet: Zerspanung erhält 150.000 kWh · 0,60 € = 90.000 € und 2.000 Stunden · 120,00 € = 240.000 €):

- **Frage:** Die Zerspanung der Vantera Präzisionstechnik GmbH hat primäre Gemeinkosten von 340.000 €. Aus dem Stufenleiterverfahren kommen 90.000 € aus der Energieversorgung und 240.000 € aus der Instandhaltung hinzu. Die Fertigungslöhne der Zerspanung betragen 500.000 €. Wie hoch ist der Fertigungsgemeinkostenzuschlag der Zerspanung in Prozent?
- **Akzeptierte Antworten:** 134; 134 %; 134 Prozent; 134,0; 134,0 %; 1,34
- **Erklärung:** Gemeinkosten nach Umlage = 340.000 € + 90.000 € + 240.000 € = 670.000 €. Zuschlagssatz = Gemeinkosten der Kostenstelle / Bezugsgröße · 100 % = 670.000 € / 500.000 € · 100 % = 134 %. Typische Fehler: die Umlagen zu vergessen (340.000 / 500.000 = 68 %) oder nur die Energie zu berücksichtigen (430.000 / 500.000 = 86 %). Die Umlage verteilt nur vorhandene Kosten, erst danach werden die Zuschlagssätze gebildet.

(Alternative: Montage mit eigenen kWh- und Stundenanteilen in Q-2.2-29 und Q-2.2-30 aufnehmen; das ändert beide Aufgaben und ist aufwendiger.)

### M2 · `tf-ergaenzungen-items-tq2/6.3-items.md` · Q-6.3-32 · mehrdeutige Zuordnung (mittel)

Zitat: „Weichere Probe, Eindringtiefe mit Kugel gemessen ↔ Rockwell HRB“ und „Gussgehäuse mit grobem Gefüge, weich bis mittelhart ↔ Brinell HBW“

Begründung: Die beiden Zeilen unterscheiden sich nur über ein Wort. Brinell arbeitet ebenfalls mit einer Kugel (Hartmetallkugel) und eignet sich für weichere Werkstoffe; wer „Weichere Probe“ und „Kugel“ liest, ordnet leicht Brinell zu. Die Theorie unterscheidet die Verfahren über die Messgröße (Eindruckdurchmesser gegen bleibende Eindringtiefe); das steht in der HRB-Zeile nur beiläufig als „Eindringtiefe“, in der Brinell-Zeile gar nicht.

Korrekturvorschlag (Wortlaut):
- „Weichere Werkstoffe, Prüfkörper Kugel, Wert aus der bleibenden Eindringtiefe (Skala B) ↔ Rockwell HRB“
- „Gussgehäuse mit grobem Gefüge, Durchmesser des Kugeleindrucks wird ausgemessen ↔ Brinell HBW“

---

## 3. Ungenau / Stil / Format / Hinweise (niedrig)

### N1 · `tf-ergaenzungen-items-tq2/6.3-items.md` · Q-6.3-31 · Stil (Antwortlänge verrät die Lösung)

Zitat: „- [x] Rm ≈ 665 N/mm²; das sind mehr als 10 % unter dem Zeugniswert, also Nachprüfung (Härte wiederholen, Zeugnis und Charge abgleichen, ggf. Zugversuch).“

Begründung: Die richtige Option ist mehr als doppelt so lang wie die drei anderen. Das ist ein Hinweisreiz, der ohne Rechnung zur Lösung führt. Außerdem „ggf.“ statt „gegebenenfalls“ (sonst im Entwurf ausgeschrieben).

Korrekturvorschlag (Wortlaut der vier Optionen):
- [x] Rm ≈ 665 N/mm²; mehr als 10 % unter dem Zeugniswert, also Nachprüfung
- [ ] Rm ≈ 665 N/mm²; weniger als 10 % unter dem Zeugniswert, also plausibel
- [ ] Rm ≈ 54 N/mm²; weicht stark vom Zeugnis ab, also Nachprüfung
- [ ] Rm ≈ 190 N/mm²; weicht stark vom Zeugnis ab, also Nachprüfung

(Die Maßnahmen „Härte wiederholen, Zeugnis und Charge abgleichen, Zugversuch“ stehen schon in der Erklärung.)

### N2 · `tf-ergaenzungen-items-tq2/6.2-items.md` · Q-6.2-32 · Anweisung passt nicht zur vierten Zeile

Zitat: „Ordne jeder Korrosionsart ihr Schadensbild mit der typischen Gegenmaßnahme zu.“ … „Entzinkung ↔ Zink löst sich aus Messing, ein poröses Kupfergefüge bleibt zurück“

Begründung: Drei Zeilen nennen eine Gegenmaßnahme (Molybdänzusatz, kohlenstoffarme Sorte, Isolierung), die Entzinkung nicht. Die Anweisung verspricht aber überall Schadensbild und Gegenmaßnahme. Die Theorie nennt für die Entzinkung keine Gegenmaßnahme; deshalb besser die Anweisung ändern als eine Maßnahme erfinden.

Korrekturvorschlag (Wortlaut): „Ordne jeder Korrosionsart ihr typisches Schadensbild zu (bei drei Arten steht zusätzlich die übliche Gegenmaßnahme).“

### N3 · `tf-ergaenzungen-items-hq2/9.1-items.md` · Q-9.1-29 · ungenau in der Erklärung

Zitat: „nur die direkten Nachfolger F und G addieren (8 min)“

Begründung: F + G = 3 + 2 = 5 min. Die genannten 8 min ergeben sich erst mit der eigenen Zeit von E (3 + 3 + 2). Der Satz kollidiert mit dem folgenden „die eigene Zeit vergessen (7 min)“: 7 min sind F + G + H (3 + 2 + 2), also alle Nachfolger ohne E.

Korrekturvorschlag (Wortlaut): „Typische Fehler: H doppelt zählen (12 min), nur E und die direkten Nachfolger F und G addieren (3 + 3 + 2 = 8 min) oder die eigene Zeit vergessen (3 + 2 + 2 = 7 min).“

### N4 · `tf-ergaenzungen-items-tq2/6.3-items.md` · Q-6.3-29 · Zwischenwerte der Erklärung passen nicht zum Endergebnis

Zitat: „also D − √(D² − d²) = 0,633 mm. Nenner: π · 10 mm · 0,633 mm = 19,87 mm².“

Begründung: π · 10 · 0,633 = 19,89, nicht 19,87; 19,87 gehört zu 0,6325 mm (genau: 10 − 9,3675 = 0,6325). Mit den gezeigten gerundeten Zwischenwerten käme man auf 301,8; das Endergebnis 302 bleibt richtig, aber nachrechnende Lernende sehen eine Abweichung.

Korrekturvorschlag (Wortlaut): „√(D² − d²) = √(100 − 12,25) = √87,75 ≈ 9,3675 mm, also D − √(D² − d²) ≈ 0,6325 mm. Nenner: π · 10 mm · 0,6325 mm ≈ 19,87 mm². Zähler: 0,102 · 2 · 29.420 ≈ 6.001,7. HBW ≈ 6.001,7 / 19,87 ≈ 302.“

### N5 · `tf-ergaenzungen-items-tq3-74/7.4-items.md` · Q-7.4-39 · akzeptierte Schreibweisen

Zitat: „**Akzeptierte Antworten:** 2.087; 2087; 2.087 €; 2087 €; 2.087 Euro; 2087 Euro“

Begründung: Rechnung eindeutig (0,24 · 280.000 = 67.200 m³; · 0,115 = 7.728 kWh; · 0,27 = 2.086,56 €, gerundet 2.087 €). Die Aufgabe verlangt „gerundet auf volle Euro“, daher ist „2.086,56“ zu Recht nicht akzeptiert. Es fehlen aber die gängigen Schreibweisen mit Nachkommastellen „2.087,00“, die in den übrigen Items (etwa Q-2.1-31, Q-2.1-33, Q-2.1-38) akzeptiert werden.

Korrekturvorschlag (Wortlaut): „**Akzeptierte Antworten:** 2.087; 2087; 2.087 €; 2087 €; 2.087,00; 2087,00; 2.087,00 €; 2087,00 €; 2.087 Euro; 2087 Euro“. Optional im Fragetext: „gerundet auf volle Euro (ohne Cent)“.

### N6 · `tf-ergaenzungen-items-rw/2.1-items.md` · Q-2.1-37 und Q-2.1-28 · akzeptierte Schreibweisen weichen von der Fragestellung ab

Zitate: Q-2.1-37 „runde auf eine Nachkommastelle“ mit „**Akzeptierte Antworten:** 37,1; 37,1 %; 37,1 Prozent; 0,371“; Q-2.1-28 „Berechne den Verschuldungsgrad in Prozent.“ mit „… 150,0 %; 1,5; 1,50“.

Begründung: „0,371“ hat drei Nachkommastellen, obwohl eine verlangt ist; die Fragestellung ist damit nicht ganz deckungsgleich mit der Akzeptanzliste. „1,5“ für einen Wert „in Prozent“ liest sich als 1,5 %. Beides entspricht dem Bestand (dort wird etwa „0,25“ für 25 % akzeptiert) und ist kein Fehler; die Übersicht erwägt die Streichung von „0,371“ selbst.

Korrekturvorschlag: Q-2.1-37 „0,371“ streichen (Akzeptierte Antworten: 37,1; 37,1 %; 37,1 Prozent). Q-2.1-28 unverändert lassen oder „1,5; 1,50“ streichen.

### N7 · `tf-ergaenzungen-items-rw/2.1-items.md` · Q-2.1-26 bis Q-2.1-29 · Hinweis (Zahlen weichen von der Beispielbilanz der Theorie ab)

Zitat: „Gesamtkapital von 24 Mio. €“ (Q-2.1-26), „Gesamtkapital von 12 Mio. €“ (Q-2.1-27), „Aktiva Anlagevermögen 20, Umlaufvermögen 20 … Passiva Eigenkapital 16, Fremdkapital 24“ (Q-2.1-28/29).

Begründung: Die Theorie knüpft ihre Kennzahlenbeispiele an die Bilanz der Vantera mit 20 Mio. € Bilanzsumme und 22,5 Mio. € Umsatz an. Die Aufgaben nennen vier verschiedene Größenordnungen derselben Firma (24, 12, 40 Mio. € Gesamtkapital). Rechnerisch richtig und als „erfundene Werte“ vertretbar; wer die Theorie gerade gelesen hat, kann sich aber fragen, welche Zahlen gelten.

Korrekturvorschlag: In den Fragetexten „(erfundene Beispielwerte)“ ergänzen, zum Beispiel „Die vereinfachte Bilanz der Vantera Präzisionstechnik GmbH (erfundene Beispielwerte, in Mio. €): …“.

### N8 · `tf-ergaenzungen-items-tq3-74/7.4-items.md` · Q-7.4-30 · Aufgabentext verweist auf „die Theorie“

Zitat: „Das Lastmoment bleibt gleich, die Schlupfdrehzahl bleibt wie in der Theorie näherungsweise gleich.“

Begründung: In einer Quizfrage soll die Annahme in der Aufgabe selbst stehen; „wie in der Theorie“ setzt voraus, dass der Lernpfad gelesen wurde, und passt nicht zu den übrigen Aufgaben, die alle Annahmen nennen.

Korrekturvorschlag (Wortlaut): „Das Lastmoment bleibt gleich; vereinfachend bleibt dabei die Schlupfdrehzahl (n_s − n) unverändert.“

### N9 · `tf-ergaenzungen-items-hq2/9.3-items.md` · Q-9.3-21 · Hinweis (Lohngruppe 4 mit anderem Grundlohn als in der Theorie)

Zitat: „21 bis 30 Punkte Lohngruppe 4 mit 19,50 € je Stunde“

Begründung: Die Theorie ordnet „21 bis 30 Punkte“ der Lohngruppe 4 mit 18,00 € zu (Beispielwerte). Die Aufgabe belegt dieselbe Lohngruppe und denselben Bereich mit 19,50 €. Beide sind erfundene Beispielwerte; die Doppelbelegung kann beim Wiederholen verwirren.

Korrekturvorschlag (Wortlaut): „… bis 20 Punkte Lohngruppe A mit 17,00 € je Stunde, 21 bis 30 Punkte Lohngruppe B mit 19,50 € je Stunde, 31 bis 40 Punkte Lohngruppe C mit 22,00 € je Stunde.“ und in der Erklärung entsprechend „Lohngruppe B“.

### N10 · `tf-ergaenzungen-items-tq2/6.2-items.md` · Q-6.2-27 · Erklärung verweist auf Text außerhalb der Aufgabe

Zitat: „EN AW-6082 entspricht dem bei Vantera genannten AlMgSi1.“

Begründung: „bei Vantera genannt“ meint eine andere Stelle der Theorie; in der Aufgabe selbst ist AlMgSi1 nicht erwähnt.

Korrekturvorschlag (Wortlaut): „EN AW-6082 entspricht in der Praxis der älteren Bezeichnung AlMgSi1.“

### N11 · `tf-ergaenzungen-items-tq3-74/7.4-items.md` · Q-7.4-32 · gemischte Kategorien in der Zuordnung

Zitat: „Ordne jeder Antriebsart bzw. jedem Gebertyp das passende Merkmal zu.“

Begründung: Drei Antriebsarten und ein Gebertyp stehen in einer Liste; „Servoantrieb ↔ Geber meldet Lage und Drehzahl zurück“ und „Inkrementalgeber ↔ Liefert Impulse je Umdrehung“ liegen dadurch inhaltlich nahe beieinander. Eindeutig lösbar, aber unnötig verwirrend. Ungewöhnliches „bzw.“ im Du-Anweisungston.

Korrekturvorschlag (Wortlaut): „Ordne jedem Begriff das passende Merkmal zu.“ (Inhalt der vier Zeilen unverändert.)

### N12 · mehrere Entwürfe · Stil (Karteikarten sehr dicht)

Zitate (Anfang der Antworten): K-7.1-29 („Zwecke: Korrosionsschutz, Verschleißschutz …“, sieben Verfahren in einer Antwort), K-7.1-32, K-7.4-31, K-7.4-32 (acht Systeme plus Echtzeit plus Rechnung), K-7.4-34, K-7.4-35, K-2.1-26, K-2.1-27, K-2.1-29, K-2.1-30, K-2.2-28, K-6.2-26, K-6.2-31, K-9.3-24.

Begründung: Karteikarten dienen dem Wiederholen einzelner Fakten; diese Karten verlangen sechs bis zehn Aussagen auf einmal und lassen sich schwer als „richtig/falsch erinnert“ bewerten. Inhaltlich richtig und von den Übersichten selbst als dicht markiert (rw: Punkt 17).

Korrekturvorschlag: Bei Bedarf teilen, etwa K-7.4-32 in „Wie unterscheiden sich PROFIBUS, PROFINET, EtherCAT und CAN?“ und „Was kennzeichnen IO-Link, AS-Interface, Modbus und OPC UA, und was bedeutet Echtzeit?“ sowie K-7.1-29 in „Lackieren, Pulverbeschichten, Galvanisieren“ und „Eloxieren, PVD, CVD“. Neue Karten mit den nächsten freien IDs, nicht durch Umnummerieren.

### N13 · Hinweis zur Theorie (nicht zu den Entwürfen): Feuerverzinken in 6.2 und 7.1 widersprüchlich

Zitate: 6.2 „**Feuerverzinken** liefert dicke Schichten (Richtwert etwa 50 bis 150 µm)“; 7.1 „… dickere Schichten (Richtwert: etwa 45 bis 100 µm, je nach Materialdicke)“.

Begründung: K-7.1-29 übernimmt „45 bis 100 µm“ korrekt aus 7.1; die Theorie in 6.2 nennt einen anderen Richtwert. Die Entwürfe sind davon nicht betroffen, wohl aber eine künftige Frage zur Schichtdicke des Feuerverzinkens.

Korrekturvorschlag: In 6.2 „etwa 45 bis 100 µm (Stückverzinkung)“ angleichen oder in beiden Abschnitten „etwa 45 bis 150 µm je nach Materialdicke“.

### N14 · mehrere Entwürfe · fehlende gängige Schreibweisen bei Kurzantworten

Zitate: Q-6.1-32 „320; 320 Stück“; Q-7.4-36 „5; 5 s; 5,0; 5,0 s“; Q-7.4-41 „2,61; 2,61 l; 2,61 L“; Q-9.2-28 „2; 2 Tage; 2 Tagen“.

Begründung: Da der Vergleich exakt ist, werden natürliche Antworten wie „320 Schrauben“, „5 Sekunden“, „2,61 Liter“ als falsch gewertet. Gering, weil die Einheit meist weggelassen werden kann.

Korrekturvorschlag (Wortlaut): Q-6.1-32 „320; 320 Stück; 320 Schrauben“; Q-7.4-36 „5; 5 s; 5 Sekunden; 5,0; 5,0 s“; Q-7.4-41 „2,61; 2,61 l; 2,61 L; 2,61 Liter“. Q-9.2-28 unverändert.

### N15 · `tf-ergaenzungen-items-hq2/9.1-items.md` · Q-9.1-30 · Hinweis (Zuordnung mit Stationsnummern links)

Zitat: „Station 1 ↔ A und B … Station 5 ↔ F und H“

Begründung: Rechnerisch eindeutig (RPW und Zuordnung stimmen; Station 3 enthält E und G, weil D mit 4 min nicht mehr in die Restzeit von 2 min passt). Formal arbeitet die Zuordnung mit gemischten Rechtsseiten („C“, „D“ als einzelne Buchstaben); bei fünf Paaren und kurzen Rechtsseiten ist Raten durch Ausschließen möglich. Kein Fehler.

Korrekturvorschlag: Keiner nötig. Falls gewünscht, als Kurzantwort „Welche Arbeitsgänge enthält Station 3?“ (Antwort „E und G“, mit Varianten „E, G“, „E und G“).

---

## 4. Geprüft ohne Befund (Auswahl der Ergebnisse, jeweils unabhängig gerechnet)

| Datei | Items | Ergebnis der eigenen Rechnung |
|---|---|---|
| rw/1.1 | Q-1.1-13 bis 17 | 104,0; 5,0 %; 3.630; 4.100 und 2,5 % (nominal 6,6 %); P = 1,2 |
| rw/2.1 | Q-2.1-25 bis 40 | 4,5; 6 % und 10 %; 7,5 %; 150 %; AD II 160 %, Working Capital 12, AI 50 %, AD I 80 %; Buchungssätze Rückstellung, Skonto, Währung seitenrichtig; 4.000; 12.000; 5.000; 6.297,48; 37,1 %; 3.640; 6.000; 2.400 |
| rw/2.2 | Q-2.2-29, 30 | 90.000 € (Anbau-Fehlwert 105.882,35 €); 120,00 €/h |
| rw/2.3 | Q-2.3-26 bis 28 | E 9.000 €, F 18.000 € (Differenz 9.000 €); Rentabilität 19 % |
| tq2/6.1 | Q-6.1-31 bis 33 | 320 Schrauben; 90 mm Papier, Maßzahl 360 |
| tq2/6.2 | Q-6.2-28 bis 37 | 12,36 kg; 0,09 mm; 20 Jahre; Aluminium, 1,22 V; Rand 50 K/s, Kern 15 K/s; 36 %; 0,85 mm |
| tq2/6.3 | Q-6.3-29 bis 31 | HBW 302,04; 55 HRC; Rm 665 N/mm², Abweichung 16,9 % |
| tq3/7.1 | Q-7.1-31, 32, 34, 36, 38, 41 bis 43 | 85,2 g; 100 µm; 11,1 mm; a = 93,75 mm, n₂ = 400 1/min; 31,4 m/s; 47 min; 100 % (180 % begrenzt); 6,69 € |
| tq3/7.4 | Q-7.4-29 bis 31, 34 bis 37, 39, 41, 42 | 5 %; 855 min⁻¹; 36.000 Impulse; 74,7 %; 4,10 ms; 5 s; 0,3 m/s und 15 kN; 2.087 €; 2,61 l; 14,5 l/min |
| hq2/9.1 | Q-9.1-29 bis 34 | RPW(E) = 10; Stationen {A,B}, {C}, {E,G}, {D}, {F,H}; Verlustzeit 2 min; 36.000 €; Eckpunkte (640 ; 480) und (700 ; 300) zulässig, (600 ; 600) und (700 ; 450) unzulässig; Optimum 34.560 € bei 640 und 480 |
| hq2/9.2 | Q-9.2-23 bis 28 | Gewichte 8, 2, 4, −2; Projektdauer 12, Gesamtpuffer C = 1; Rückpfeil −4, Schleifensumme −1; mittlere Durchlaufzeit 8,0 h (Minimum aller sechs Reihenfolgen); Gesamtdauer 11 h, M2 72,7 %, M1 81,8 %; Rückstand 2 Tage |
| hq2/9.3 | Q-9.3-21 bis 23 | 27 Punkte, 19,50 €; 220,80 €; 250 € je Person |

Fachliche Aussagen der Karteikarten und Erklärungen zu Bussystemen (PROFIBUS, CAN, IO-Link, AS-Interface, EtherCAT, OPC UA), Hydraulikmittelstellungen, Drosselung, Werkstoffen (Serien, Standardpotenziale, Wärmebehandlung, Kunststoffe), Härteprüfung, Zeichnungsarten und -ableitung, MPM-Gewichten und Maximalabstand, Linienabgleich und Akkord- und Prämienlohn stimmen mit der Theorie und der Fachlage überein.

---

## 5. Gesamtbewertung je Entwurfsdatei

| Entwurfsdatei | Bewertung | Anmerkung |
|---|---|---|
| `rw/1.1-items.md` | einspielen | keine Befunde |
| `rw/2.1-items.md` | **mit Korrektur einspielen** | F1 (K-2.1-29) zwingend; N6, N7 optional |
| `rw/2.2-items.md` | **mit Korrektur einspielen** | M1 (Q-2.2-31) |
| `rw/2.3-items.md` | einspielen | keine Befunde |
| `tq2/6.1-items.md` | einspielen | keine Befunde |
| `tq2/6.2-items.md` | einspielen | N2, N10 sind Wortlaut-Feinschliff |
| `tq2/6.3-items.md` | **mit Korrektur einspielen** | M2 (Q-6.3-32); N1, N4 empfohlen |
| `tq3-71/7.1-items.md` | einspielen | nur N12 (Dichte der Karten) |
| `tq3-74/7.4-items.md` | einspielen | N5, N8, N11, N14 sind Feinschliff |
| `hq2/9.1-items.md` | einspielen | N3 (Erklärung Q-9.1-29) empfohlen |
| `hq2/9.2-items.md` | einspielen | keine Befunde |
| `hq2/9.3-items.md` | einspielen | N9 optional |

Einspielreihenfolge und IDs bleiben unverändert; keine der Korrekturen ändert eine ID. Q-2.2-31 behält die ID, auch wenn Frage und Antwort geändert werden (die Items sind noch nicht importiert).

## Eingearbeitet

Stand 12.10.2026 · Alle 18 Befunde sind bearbeitet. Geändert wurden die zwölf Entwurfsdateien unter `docs/entwuerfe/tf-ergaenzungen-items-*/` und die Übersichten `docs/entwuerfe/tf-ergaenzungen-items-*.md`; unter `content/` wurde nichts geändert, keine IDs wurden geändert oder neu vergeben. Widersprüche im Bestand stehen in `docs/entwuerfe/tf-ergaenzungen-items-bestand.md` und am Ende der Übersichten zu 6.1 bis 6.3, 7.1 und 9.1 bis 9.3. Bilanz: 11 übernommen, 5 angepasst, 2 abgelehnt.

| Nr. | Entscheidung | Begründung |
|---|---|---|
| F1 | übernommen | K-2.1-29: Der Buchungssatz zur aktiven Rechnungsabgrenzung lautet jetzt „aktive Rechnungsabgrenzung an Aufwandskonto“ (Aktivposten nimmt zu, steht im Soll; Aufwand wird entlastet, steht im Haben). Das stimmt mit der Theorie und mit Q-2.1-33 überein; die drei übrigen Klammern der Karte waren richtig und bleiben. |
| M1 | übernommen | Q-2.2-31 rechnet jetzt die Zerspanung mit den Werten aus Q-2.2-29 und Q-2.2-30 (90.000 € Energie, 240.000 € Instandhaltung; Fertigungsgemeinkostenzuschlag 134 %). Die ganze Kette wurde mit einem eigenen Skript nachgerechnet (Energie 120.000 € / 200.000 kWh = 0,60 € je kWh, Instandhaltung (282.000 € + 18.000 €) / 2.500 Stunden = 120,00 € je Stunde, 340.000 € + 90.000 € + 240.000 € = 670.000 €, 670.000 / 500.000 = 134 %; Fehlwerte 68 %, 86 % und 116 %). Akzeptiert: 134; 134 %; 134 Prozent; 134,0; 134,0 %; 1,34. Erklärung nennt die Herkunft der beiden Umlagen; die Übersicht (Rechenweg-Tabelle, Fehlerliste, Grenzfall 10, Einleitung der Entwurfsdatei) ist angepasst. Jede Aufgabe nennt weiterhin alle Werte und bleibt einzeln lösbar. |
| M2 | angepasst | Q-6.3-32: Wortlaut der beiden Zeilen vom Vorschlag übernommen (HRB: „Prüfkörper Kugel, Wert aus der bleibenden Eindringtiefe (Skala B)“; Brinell: „Durchmesser des Kugeleindrucks wird ausgemessen“). Zusätzlich die HRC-Zeile um „mit Diamantkegel“ ergänzt und die Erklärung um den Unterschied Brinell (Eindruckdurchmesser) gegen Rockwell (Eindringtiefe) erweitert, damit auch HRC und HRB nicht über die Kugel verwechselt werden. |
| N1 | übernommen | Q-6.3-31: Optionen auf gleiche Länge gekürzt, „ggf.“ entfernt; die Maßnahmen (Härte wiederholen, Zeugnis und Charge abgleichen, Zugversuch) stehen schon in der Erklärung. |
| N2 | übernommen | Q-6.2-32: Anweisung lautet „… ihr typisches Schadensbild zu (bei drei Arten steht zusätzlich die übliche Gegenmaßnahme dabei)“. Die Erklärung sagt zusätzlich, dass die Theorie für die Entzinkung keine Gegenmaßnahme nennt; es wurde keine erfunden. |
| N3 | übernommen | Q-9.1-29: Erklärung korrigiert (E + F + G = 3 + 3 + 2 = 8 min, H fehlt; ohne eigene Zeit 3 + 2 + 2 = 7 min; H doppelt 12 min). Per Skript geprüft: RPW(E) = 10. |
| N4 | übernommen | Q-6.3-29: Zwischenwerte 9,3675 mm, 0,6325 mm und 19,87 mm² (π · 10 · 0,6325 = 19,8707); Ergebnis 302 (exakt 302,04) bleibt. Die Rechenweg-Tabelle der Übersicht ist angepasst. |
| N5 | angepasst | Q-7.4-39: Alle gängigen Schreibweisen ergänzt (2.087,00 und 2087,00, jeweils auch mit „€“) und im Fragetext „gerundet auf volle Euro (ohne Cent)“ ergänzt. 2.086,56 bleibt bewusst nicht akzeptiert, weil die Rundung verlangt ist. |
| N6 | angepasst | Q-2.1-37: „0,371“ gestrichen (verlangt sind Prozent mit einer Nachkommastelle, der Vergleich ist exakt). Q-2.1-28 bleibt unverändert, wie der Bericht es zulässt: „1,5“ steht in der Erklärung (1,5 = 150 %) und entspricht der Bestandspraxis, Verhältniszahlen für Prozentwerte zu akzeptieren. Grenzfall 2 der Übersicht angepasst. |
| N7 | übernommen | Q-2.1-26 bis 29: „erfundene Beispielwerte“ in die Fragetexte aufgenommen, damit die Zahlen nicht mit der Beispielbilanz der Theorie verwechselt werden. |
| N8 | übernommen | Q-7.4-30: Annahme steht jetzt in der Aufgabe selbst („vereinfachend bleibt dabei die Schlupfdrehzahl (n_s − n) unverändert“), kein Verweis auf die Theorie mehr. Per Skript bleibt 855 min⁻¹ richtig. |
| N9 | übernommen | Q-9.3-21: Lohngruppen A, B und C statt 3, 4 und 5, damit die Aufgabe nicht der Lohngruppe 4 mit 18,00 € der Theorie widerspricht; Erklärung und Übersicht angepasst. Ergebnis unverändert 19,50 €. |
| N10 | übernommen | Q-6.2-27: „… entspricht in der Praxis der älteren Bezeichnung AlMgSi1.“ |
| N11 | angepasst | Q-7.4-32: Anweisung „Ordne jedem Begriff das passende Merkmal zu.“ Dieselbe Mischformulierung („Bauteil bzw. Mittelstellung“) stand in Q-7.4-38 und lautet dort jetzt „Ordne jedem Begriff aus dem Hydraulikschaltplan seine Wirkung zu.“ Inhalte der Zeilen unverändert. |
| N12 | abgelehnt | Keine Karte geteilt: Der Bericht bewertet die Dichte als „bei Bedarf“ und die Entwürfe als einspielbar; die Karten sind fachlich richtig und die Übersichten weisen die Dichte schon aus. Eine Teilung würde neue IDs und mehr Items bringen (Umfang der Pakete liegt bereits an der Obergrenze) und ist der Projektleitung überlassen. K-2.1-29 wurde wegen F1 trotzdem inhaltlich korrigiert. |
| N13 | übernommen | Als Bestandsänderung geführt, nichts in `content/` geändert: Eintrag B1 in `docs/entwuerfe/tf-ergaenzungen-items-bestand.md` (Zitate aus 6.2 und 7.1, zwei Varianten zur Angleichung). K-7.1-29 im Entwurf folgt unverändert 7.1. |
| N14 | angepasst | Schreibweisen ergänzt: Q-6.1-32 „320 Schrauben“, Q-7.4-36 „5 Sekunden“ und „5,0 Sekunden“, Q-7.4-41 „2,61 Liter“. Q-9.2-28 unverändert, wie vorgeschlagen. Zusätzlich die Schreibweisen mit „,00“ bei Q-9.1-34 und Q-9.3-23 ergänzt, damit sie zu den übrigen Euro-Antworten passen. |
| N15 | abgelehnt | Q-9.1-30 bleibt unverändert: Der Bericht selbst sieht keine Korrektur als nötig an (rechnerisch eindeutig, Raten durch Ausschließen ist bei Zuordnungen üblich). Die vorgeschlagene Kurzantwort „Welche Arbeitsgänge enthält Station 3?“ wurde nicht ergänzt, um keine Items hinzuzufügen. |

Zusätzlich aufgenommen (nicht Teil des Berichts): Eintrag B2 in `docs/entwuerfe/tf-ergaenzungen-items-bestand.md` (K-9.2-07 und Q-9.2-03 nennen die Regel der kürzesten Operationszeit ohne die Einschränkung „an einer einzelnen Maschine“; die Theorie derselben Datei sagt es richtig).

Nach der Einarbeitung wurde das Format aller zwölf Entwurfsdateien erneut per Skript geprüft: 50 Karten und 87 Quizfragen, Überschriften, Pflichtzeilen und Metazeilen, keine Leerzeilen in den Blöcken, bei Multiple Choice genau eine, bei Mehrfachauswahl genau zwei richtige Optionen, Zuordnungen mit verschiedenen linken und rechten Seiten, lückenlose IDs ohne Kollision mit den Zieldateien, alle Schreibweisen der Kurzantworten mit demselben Wert, Leerzeichen vor Einheiten, € und %, Tausenderpunkt, Dezimalkomma, Du-Form, LF-Zeilenenden und UTF-8 ohne BOM. Die geänderten Rechenwerte (Q-2.2-31, Q-6.3-29, Q-6.3-31, Q-9.1-29, Q-7.4-39, Q-2.1-37) wurden erneut nachgerechnet.
