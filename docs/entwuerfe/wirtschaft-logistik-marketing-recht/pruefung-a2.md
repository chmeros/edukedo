# Zweitprüfung P-AC Teil A (Wirtschaftsfachwirt, HSQ3 3.5 Entsorgung und Recycling, F-HSQ3-05, Fachgespräch 3.5)

Stand 17.10.2026. Unabhängige Prüfung der **neu aufgebauten** Fassungen von `wf-3.5-entsorgung-recycling.md`, `wf-faelle-a.md`, `rechtsangaben-a.md`, `ersetzungen-a.json` (Inhalt `[]`). `pruefung-a.md` wurde nur gelesen, um zu sehen, was behoben sein muss; jeder Punkt wurde in der neuen Fassung selbst nachgeprüft. Mechanik (Kopie-Test, Parser) bewusst nicht geprüft. Nichts an Entwurfsdateien oder Bestand geändert. Skripte nur im Scratchpad (`pc2-a-rech.cjs`, `pc2-a-len.cjs`).

**Prüfumfang:** rund 105 Werte nachgerechnet (Hamburg-Zeitvergleich in beiden Quartalen mit Prozentpunkten und relativer Änderung, Erlösrückgang, Sortenreinheit, Palettenrechnung Thema, Q-04 bis Q-08, alle fünf Antwortlisten maschinell, Fall: Tabellensummen, Posten A, Palettenprogramm samt Gegenprobe, Angebotsvergleich, Set/Faltkartons, Punkteraster). **Alle Zahlen stimmen.** Rechtsaussagen: 31 der 61 Zeilen der Rechtsangaben-Datei am Gesetzestext bzw. per Websuche geprüft (gesetze-im-internet.de, abgerufen 17.10.2026: VerpackDG §§ 3, 7, 39, 68; KrWG §§ 3, 9a, 17, 22, 53, 54; GewAbfV §§ 3, 4; NachwV §§ 2, 12; AbfBeauftrV § 2 über Suchergebnis); die übrigen Zeilen aus Sachkenntnis plausibel (AVV, ElektroG, Batterierecht, GmbHG, OWiG, KrWG §§ 6, 7, 23, 56).

**Kurzbilanz: 0 hoch, 5 mittel, 11 niedrig.** Die drei hohen Befunde der Erstprüfung (VerpackDG, § 9a, Q-11) sind sauber behoben; auch M1 bis M6 und N1 bis N7 der Erstprüfung sind behoben (Einzelnachweise unten).

---

## Was aus der Erstprüfung behoben ist (selbst nachgeprüft)

- **Verpackungsrecht:** T5 sagt jetzt zutreffend: Verordnung (EU) 2025/40 gilt seit 12.08.2026, VerpackDG hat das Verpackungsgesetz abgelöst (§ 68 VerpackDG: Verpackungsgesetz „bis zum 11. August 2026“, Stichtag 12.08.2026, Fortgeltung von Systembeteiligungen bis 31.12.2026: bestätigt). Im Text kein „VerpackG“ mehr (nur „bisheriges Verpackungsgesetz“). Stützangabe § 3 Abs. 6 und 7 VerpackDG stimmt (Abs. 6: systembeteiligungspflichtig sind auch Transportverpackungen, die typischerweise mehrheitlich bei privaten Haushaltungen oder vergleichbaren Anfallstellen anfallen; Abs. 7: Verwaltungen und Niederlassungen von Freiberuflern ausdrücklich genannt).
- **Rücknahme von Transportverpackungen:** „Ort der Rückgabe und Kostenregelung, nicht die Pflicht selbst“ entspricht § 39 Abs. 1 VerpackDG (unentgeltlich, getrennt sammeln, Verwertung; abweichend nur Ort und Kosten). Q-09, Q-15, K-09, FG 2 sind angepasst; die Rückfrage in FG 2 ist sachgerecht.
- **Vermischungsverbot:** § 9a Abs. 1 KrWG, Wortlaut „andere Kategorien gefährlicher Abfälle sowie sonstige Abfälle, Stoffe, Materialien“, Ausnahme zugelassene Anlage, gleichartige gefährliche Abfälle dürfen zusammen gesammelt werden: korrekt (Abs. 2 hat zusätzliche Bedingungen, der Text nennt nur die Anlage; als Überblick vertretbar).
- **Getrennthaltung:** GewAbfV § 3 Abs. 1 (Fraktionen), Abs. 2 (technisch nicht möglich; Platzmangel ausdrücklich Beispiel; wirtschaftlich nicht zumutbar, etwa sehr geringe Mengen), Abs. 3 (Lagepläne, Lichtbilder, Liefer- oder Wiegescheine; Erklärung der übernehmenden Seite mit Name, Anschrift, Masse, Verwertungsart, Verbleib; Darlegung der Abweichung; elektronisch auf Verlangen): alles zutreffend im Text. § 4: Vorbehandlungsanlage, 90-Prozent-Ausnahme als „Einzelheiten nicht dargestellt“: korrekt. Q-11 ist rechtlich jetzt richtig (Szenario Zeitaufwand und kleine Menge, Platz als Beispiel für Unmöglichkeit).
- **Vorbeteiligung** nur Serviceverpackungen (§ 7 Abs. 2 VerpackDG, unbefüllt): richtig. **Vergleichbare Anfallstellen** als Kernpunkt für Bürokundschaft: richtig und im Fall ausgebaut.
- **Palette** als „Ware/Betriebsmittel“ gegenüber „bereits weggegebene Palette“: § 3 Abs. 24 KrWG (nur Erzeugnisse, die zu Abfällen geworden sind) richtig angewandt (Q-01, Q-03, T3, K-03, FG 3).
- **Nachweise bei Kleinmengen:** NachwV § 2 Abs. 2 (höchstens zwei Tonnen insgesamt, Übernahmescheine nach § 12 und § 16 bleiben unberührt): Q-02, K-12, T4 stimmen jetzt.
- **N1** (Q-04/Q-05 passen jetzt: Bremen 36 t, 40 €/t; 144 t jährlich = 4 × 36 t), **N2** (Büro-Start-Set mit Präsentationskarton, Blisterhülle nur beim Schreibset; Faltkarton-Zeile 75.000 × 0,80 € = 60.000 € stimmt mit Register und `hsq3/3.4`, `wbq1/1.5`), **N3** (Abfallbeauftragte mit Mengenschwellen, § 2 AbfBeauftrV: 100 t zurückgenommene Transportverpackungen), **N5** (kein Gesetzesname mehr in Kartenfragen), **N7** erledigt.

---

## Mittel

**M1 · Karten- und Quizblock folgt noch immer paarweise `hb4/4.4` (K-3.5-05 bis K-3.5-12, Q-3.5-14)**
Die Theorie ist jetzt eigenständig (andere Gliederung, Weg-des-Abfalls-Tabelle mit Beleg und Zuständigkeit, Warengruppentabelle, Zeitvergleich, Wiederverwendung gegen Entsorgung; wörtliche Läufe nach `siebenwort` n=6/7 nur noch Gesetzes- und Konventionsformeln). Die Karten dagegen bilden die Kette von `hb4/4.4` (K-4.4-15 bis -24) weiterhin in gleicher Folge und mit gleicher Fragestellung nach: Abfallbegriff (K-01 ↔ K-4.4-15), Rangfolge (K-03 ↔ -16), Pflichten Gewerbeabfall (K-05 ↔ -17), **Beauftragung (K-07 ↔ K-4.4-18, fast dieselbe Frage: „Loreno beauftragt … Wer trägt die Verantwortung, und worauf achtest du bei der Auswahl?“ gegenüber „NordWert gibt die Abholung … ab. Wer bleibt verantwortlich, und was folgt daraus für die Auswahl?“, Antwort mit denselben vier Bausteinen Verantwortung, Anzeige/Erlaubnis, Fachbetriebszertifikat, Vertrag)**, Hersteller/Vertreiber (K-08 ↔ -19, beide mit „Rolle des Fallunternehmens“), Transportverpackung (K-09 ↔ -22), Elektro/Batterien (K-11 ↔ -23), Dokumente/Kleinmengen (K-12 ↔ -24). Q-3.5-14 (Lückentext zu einem Nachweisdokument mit „Entsorgungsnachweis“ als Distraktor) hat dasselbe Muster wie Q-4.4-28. Fall und Fachgespräch sind dagegen deutlich eigenständig (siehe N2 unten). Das ist kein Totalumbau, aber die Karten wirken als Zwilling des Handelsfachwirt-Blocks.
Korrektur: K-07 als Szenariokarte umbauen („Das Angebot eines Entsorgungsunternehmens nennt keine Anzeige und kein Zertifikat. Was prüfst du, bevor NordWert unterschreibt?“) statt der Verantwortungsfrage; K-08 auf NordWert-Warengruppen zuschneiden („Du übernimmst eine Charge Tischleuchten aus dem Ausland: In welcher Rolle ist NordWert, und was gilt bei den befüllten Faltkartons?“); K-12 so einsteigen lassen, dass Kleinmengen im Mittelpunkt stehen („Was entfällt, was bleibt bei höchstens zwei Tonnen?“) und das Sternchen-Thema in K-02 oder eine andere Karte verlegen; Q-14 auf ein anderes Lückenwort umstellen (zum Beispiel „Übernahmeschein“ mit Distraktoren Begleitschein, Lieferschein, Wiegeschein) oder in einen Zuordnungstyp ändern.

**M2 · Umkarton als Füllmaterial zählt nicht ohne Weiteres als „Vermeidung“ (T1 Tabelle Zeile 2, T3 Tabelle Zeile 1, F-HSQ3-05 TA1 Posten B und Musterlösung; K-02/K-03 nicht betroffen; Rechtsangaben Nr. 5)**
Vermeidung umfasst nach § 3 Abs. 20 KrWG die Wiederverwendung von Nicht-Abfällen; „Wiederverwendung“ ist nach § 3 Abs. 21 KrWG die erneute Verwendung **für denselben Zweck**, für den das Erzeugnis ursprünglich bestimmt war. Ein Umkarton, der als Füllmaterial dient, ändert den Zweck (Umhüllung der gelieferten Ware gegen Polster der Versandstücke). Die Palettenreparatur (Verlängerung der Lebensdauer, gleicher Zweck) und die zweite Wahl (Ware bleibt Ware) sind unproblematisch, der Umkarton ist es nicht. Die Fall-Musterlösung legt sich auf „Stufe 1, Vermeidung“ fest.
Korrektur: In T1, T3 und im Fall das Beispiel durch „sauberer Umkarton wird als Versandkarton für eine eigene Sendung erneut genutzt“ ersetzen (gleicher Zweck, eindeutig Stufe 1), oder in Rechtsangaben Nr. 5 vermerken „Zweckänderung: Einordnung vermutet“ und in der Musterlösung „Vermeidung (Weiterverwendung eines Nicht-Abfalls)“ als Grundsatz ohne den Zusatz „Stufe 1 laut Gesetz“.

**M3 · Fall F-HSQ3-05, Angebot B: „Erlaubnis und Zertifikat nicht nachgewiesen“ passt nicht zu den angebotenen Abfallarten (Ausgangssituation „Angebote“, TA4 Musterlösung)**
Angeboten werden Papier und gemischte Gewerbeabfälle, also nicht gefährliche Abfälle. Nach § 53 KrWG genügt dafür die **Anzeige**; die **Erlaubnis** (§ 54 KrWG) ist nur bei gefährlichen Abfällen nötig (so auch Rechtsannahme (2) des Falls und der Theorietext). Das Zertifikat als Entsorgungsfachbetrieb ist freiwillig. Die Aufgabe behauptet damit indirekt ein Rechtsdefizit, das es für diese Abfallarten nicht gibt; die Musterlösung formuliert („Erlaubnis beziehungsweise Anzeige“) vorsichtiger, der Aufgabentext nicht.
Korrektur: Angebot B: „Anzeige und Zertifikat nicht nachgewiesen, Nachweise nur auf Anfrage“; Musterlösung: „Bei B sind die Anzeige der Tätigkeit und das Zertifikat nicht nachgewiesen; fehlendes Zertifikat ist kein Rechtsverstoß, erschwert aber den Nachweis sorgfältiger Auswahl; die fehlende Anzeige wäre ein Mangel.“ Angebot A: „Entsorgungsfachbetrieb, Zertifikat liegt vor“ bleibt.

**M4 · „Gilt unabhängig davon, ob sie sich rechnet“ widerspricht der Ausnahme der wirtschaftlichen Unzumutbarkeit (T2 Absatz „Trennen und Darlegen“, erster Satz)**
„Die Pflicht zur getrennten Sammlung gilt unabhängig davon, ob sie sich rechnet“ ist als Satz falsch, weil § 3 Abs. 2 GewAbfV die Pflicht entfallen lässt, soweit die Trennung wirtschaftlich nicht zumutbar ist (Kosten außer Verhältnis zu gemischter Sammlung mit Vorbehandlung). Der Text rettet sich zwei Sätze später durch die Ausnahme, aber der erste Satz wird von Lernenden gemerkt. Auch § 9 Abs. 3 KrWG verlangt die Berücksichtigung der Erlöse.
Korrektur: „Die Pflicht zur getrennten Sammlung gilt auch dann, wenn die Trennung etwas kostet; erst ein deutliches Missverhältnis der Kosten gegenüber gemischter Sammlung mit Vorbehandlung macht sie unzumutbar. Aufwand und Zeitdruck allein sind kein Ausnahmegrund.“

**M5 · Rechtsangaben-Datei Nr. 35 und Nr. 57: „§ 39 Abs. 1 Satz 6“ ist falsch**
§ 39 Abs. 1 VerpackDG hat fünf Sätze (Satz 1: Rücknahme, Satz 2: Endvertreiber, Satz 3: Information, Satz 4: wiederkehrende Belieferung, Satz 5: abweichende Vereinbarungen über Ort der Rückgabe und Kostenregelung; zweimal unabhängig abgerufen). Die Rechtsangaben-Datei führt die Zeilen als „Prüfung 17.10.“ bestätigt; die förmliche Prüfung würde auf die falsche Fundstelle treffen. (Der Fehler stammt aus der Erstprüfung.) Im Text und in Karten steht keine Satzangabe.
Korrektur: „Satz 5“ in Nr. 35 und Nr. 57 (oder nur „§ 39 Abs. 1“).

---

## Niedrig

**N1 · „Büros von Freiberuflichen“ statt Wortlaut (T5 Tabelle Zeile 2, K-10, Rechtsangaben Nr. 37)**
§ 3 Abs. 7 VerpackDG nennt „Verwaltungen“ und „Niederlassungen von Freiberuflern“ (außerdem Hotels, Krankenhäuser, Bildungseinrichtungen und weitere). „Büros“ steht nicht dort; „ausdrücklich“ ist für Büros zu stark. Korrektur: „dazu zählen ausdrücklich Verwaltungen und Niederlassungen von Freiberuflichen“ oder „vergleichbare Anfallstellen wie Verwaltungen und Praxen oder Kanzleien“. Gendern „Freiberuflichen“ vertretbar.

**N2 · Rest-Überschneidungen im Fall und im Fachgespräch zu `hb4` (F-HSQ3-05, FG 1)**
Fall: Eigenständig sind Retourenposten, Palettenprogramm mit Fixkosten und Schwelle, Aussagen der Standortleitung, Angebotsvergleich A/B und Preisnachlass; TA1 ist nicht mehr F-HQ2-07 TA1. Offen bleibt nur die thematische Nähe von Rechtsannahme (3) und der Dokumentenliste in TA3 zu F-HB4-07 und von TA4 (Prüfpunkte Entsorgungsunternehmen) zu F-HB4-07 TA4; das ist durch den neuen Rechenteil und das Aussagenformat abgedeckt, kein Befund über niedrig. FG 1 (Audit in Bremen) ist anders eingestiegen als die HB4-Frage; die Erwartungen 3 und 4 (Verantwortung, Kennzahlen) decken sich inhaltlich noch mit `hb4/fachgespraech` und `hq2/6.7`. Optional: Erwartung 4 auf den Zeitvergleich (Prozentpunkte, Menge je 1.000 Aufträge) zuspitzen, weil der in HB4 fehlt.

**N3 · Dangling Bezug „Beispielmengen dieses Themas“ (T4 Absatz nach den Nachweisen)**
„Mit den Beispielmengen dieses Themas (weniger als zwei Tonnen im Jahr) fällt NordWert unter die Kleinmengenregelung“: Das Thema enthält keine Menge gefährlicher Abfälle (nur Q-02 und der Fall nennen eine). Korrektur: „Nimmt man für NordWert weniger als zwei Tonnen gefährliche Abfälle im Jahr an (Q-02, Fall: 0,4 t am Standort Leipzig), gilt die Kleinmengenregelung.“ Dazu Q-02 Anweisung: „die als gefährlicher Abfall eingestuft sind“ und Schritt 1 „einstufen“ widersprechen sich leicht; entweder „Tonerreste, die voraussichtlich als gefährlich einzustufen sind“ oder Schritt 1 „Einstufung und Abfallschlüssel dokumentieren“.

**N4 · Rechtsangaben Nr. 2 „sicher“ ist zu hoch gegriffen**
„Auch ein sortenreiner Pappballen ist bis zur Aufbereitung Abfall“ ist als Grundsatz brauchbar, aber die Abfalleigenschaft endet erst bei Erfüllung der Voraussetzungen des Endes der Abfalleigenschaft (KrWG § 5); ob ein verkaufter Ballen noch Abfall ist, ist Einzelfall. Korrektur: Nr. 2 auf „sicher (Grundsatz); Ende der Abfalleigenschaft nicht dargestellt“ und im Text „in der Regel“ ergänzen.

**N5 · Faltkartons sind im Bestand Handelsware, im Fall zugleich eigene Versandverpackung (F-HSQ3-05 „Eigenmarke und Faltkartons“)**
Im Register und in `wbq1/1.5` sind Faltkartons (75.000 Stück zu 0,80 €) Sortiment. Der Fall behandelt sie als Verpackung, in der NordWert „Ware an Bürokundschaft versendet“. Lernende können fragen, ob sie Ware oder Verpackung sind. Korrektur: ein Satz „Ein Teil der eingekauften Faltkartons nutzt NordWert zugleich als eigene Versandverpackung“ oder „Versandkartons“ statt „Faltkartons“ mit gleichem Lieferunternehmen und demselben Jahreseinkauf.

**N6 · Gendern**
„der Abnehmer“ (Q-02 Erklärung), „Vertreiber dürfen“ (T5 Tabelle Zeile Elektrogeräte, Q-16 Erklärung), „ein Vorlieferant“ (T5 Serviceverpackungen). Als Rollenbegriffe in T2 eingeführt, aber nicht überall als Rollenbegriff erkennbar. Korrektur: „die abnehmende Seite“, „Vertreiberunternehmen“, „ein vorgelagertes Lieferunternehmen“.

**N7 · „zeitkritisch, vermutet“ im Lerntext (K-09 und K-10 Fragezeile, FG 2 Erwartung 1, T5 Einleitungssatz)**
„vermutet“ ist ein Vermerk für die Rechtsangaben-Datei; im Lerntext liest er sich wie eine eigene Unsicherheit. Korrektur: „(Stand Oktober 2026, vor Verwendung prüfen; zeitkritisch)“ und „vermutet“ streichen.

**N8 · Q-06 und Q-07: Eindeutigkeit und Plausibilität**
Q-06 „Ersatz aller 540 Paletten“: Gemeint sind Entsorgung der alten und Kauf neuer Palette; steht nur in der Erklärung vollständig. Korrektur: „… gegenüber dem Ersatz aller 540 Paletten (jede alte Palette wird entsorgt und durch eine neue ersetzt)“. Q-07 nennt für das ganze Unternehmen 5.580 € Entsorgungskosten im Quartal; Hamburg (2.600 €) und Bremen (3.240 €) liegen zusammen schon bei 5.840 €, Leipzig kommt noch hinzu. Alles Beispielwerte, aber sichtbar widersprüchlich. Korrektur: Q-07 für einen einzelnen Standort formulieren („Am Standort Hamburg … im zweiten Quartal 4.000 Aufträge … 2.600 €“ ergäbe 650 €, dann ist die Frage dieselbe wie im Thema) oder 5.580 € auf 8.100 € (900 € je 1.000 Aufträge) für den Betrieb setzen.

**N9 · Zahlenkollision mit Teil B**
2.880 € kommt in Teil A (Hamburg Entsorgungskosten Quartal I) und in `wf-3.6` (3.380 € − 500 € Selbstbehalt = 2.880 €) vor, mit anderer Bedeutung. Harmlos (verschiedene Bedeutung, verschiedene Themen); nur zur Kenntnis, keine Änderung nötig.

**N10 · Distraktoren und Strohmänner (Q-11 Option 2 mit „ausdrücklich unterrichtet hat“, Q-15 Optionen 1 und 2)**
Unwahrscheinliche Optionen („zwingend vom Gesetz festgelegt“, „Genehmigung der Abfallbehörde“) sind leicht auszuschließen. Optional: Option 1 ersetzen durch „Zulässig, aber dann entfällt die Pflicht zur Verwertung, weil NordWert sie selbst übernommen hat“ (plausibler Denkfehler).

**N11 · Verweis auf Thema 3.6 (T4 Zeile Lithium-Akkus, FG 3)**
Teil B behandelt Gefahrgut im Überblick am Beispiel Ware (Spraydosen, Lithium im Sortiment) und bestätigt, dass die Beförderung Gefahrgutrecht ist; der Abfall-Transport (Akkus als Abfall) ist dort nicht eigens behandelt. Der Verweis genügt als Hinweis (kein Widerspruch). Optional in Teil B oder A „(Beförderung auch von Abfällen)“ ergänzen.

---

## Klonprüfung im Einzelnen

- **`siebenwort` n=6 und n=7** gegen `content/` und `docs/entwuerfe/`: Theorie nur noch Gesetzes- und Konventionsformeln (Quelle-Satz des Frontmatters, Kurzverweise, „Stand Oktober 2026 …“, „nicht mit anderen Kategorien gefährlicher Abfälle …“ ≈ `hq3/10.2`, „befüllte Verkaufs- und Versandverpackungen, die typischerweise bei privaten Haushalten oder vergleichbaren Anfallstellen“ ≈ F-HB4-07, „bei höchstens zwei Tonnen im Jahr“). Keine inhaltlichen Satzketten mehr aus `hb4/4.4`.
- **Struktur Theorie:** Reihenfolge und Tabellenlogik gegenüber `hb4/4.4` verändert (Ware/Abfall am Standort → Weg des Abfalls → Rangfolge → gefährliche Abfälle → Rücknahme nach Warengruppen → Kennzahlen und Zeitvergleich → Wiederverwendung/Zielkonflikte). Eigenständig und ohne Entsprechung: Weg-des-Abfalls-Tabelle, Palettenreparatur, Zeitvergleich mit Prozentpunkten, Menge je 1.000 Aufträge, Zielkonflikte. Verbleibende Parallelen sind rechtssystematisch bedingt.
- **Fall:** siehe N2. **Fachgespräch:** drei Fragen mit neuen Auslösern; Erwartungen teils inhaltsgleich mit dem Bestand (Rechtsgrundlagen), kein Strukturklon.
- **Karten/Quiz:** siehe M1 (verbleibender Klon).

## Rechnen (alle Werte stimmen)

Hamburg: Quartal I und II (Summen der Mengen 28,8 t / 30 t; Netto 2.016 € / 1.200 €; 70 € / 40 € je t; Quoten 85 % / 95 % und 65 % / 80 %; 800 € / 650 € und 8,0 t / 7,5 t je 1.000 Aufträge; −42,9 %, +10 und +15 Prozentpunkte, −6,25 %; Erlösrückgang 933,33 €, 1.666,67 €, 55,56 €). Sortenreinheit −42 €, 237 €, 2.844 €. Palette: 0,95 €, 16,05 €, 20.865 €, 5.382 €, 8.346 €, 13.728 €, 7.137 €, 9,15 €. Q-04 = 40; Q-05 = 95 (Recyclingquote 75 %); Q-06 = 4.293; Q-07 = 620; Q-08 = 1.602. Alle fünf Antwortlisten: 20/20/40/20/40 Schreibweisen, keine Duplikate, keine Zusätze. Fall: Posten A 348 / 294 / −12,30 €; Palette 0,90 €, 9,20 €, 640 Paletten, 206,5 → 207, 384 Paletten, 1.632,80 € (Gegenprobe 10.432 € − 8.799,20 €), Altholz 16 t → 6,4 t; Folie 50 € Überschuss; Angebot A 2.062,80 €, B 2.774,40 €, Differenz 711,60 €; Nachlass 1.200 €, Eigenverwertung 104 €, Aufwand 480 €, Vorteil 616 €, Grenzaufwand 45,7 h; Punkte 4+4+4+4+4 = 20, Raster je Teilaufgabe summiert korrekt, Folgefehlerzeile vorhanden, alle Daten in der Ausgangssituation. Zusätzlich: 1.020 € × 0,4 t = 408 €; Tabellensumme 9.502 € / 6.780,80 € (nicht in der Aufgabe benötigt, intern konsistent).

## Hausregeln (soweit geprüft)

Du in Karten/Quiz, Sie in Fall/Fachgespräch, Theorie neutral: ja. Keine Paragrafen in Karten, Quiz und Fall: ja (Skript-Grep). IDs lückenlos K-3.5-01 bis -14, Q-3.5-01 bis -16; 14/16, 5 Kurzantworten (31 %), 3 Fachgesprächsfragen mit 4 bis 5 Erwartungen und Rückfrage. Sortieren und Zuordnung je 4 Elemente, Wahr/Falsch verschieden (Wahr, Falsch). Richtige Antwort nirgends die längste (Q-10 Falsch/Wahr trivial), Positionen 1/2/3 verteilt. Stand-Zusatz bei Rechtszahlen vorhanden. Bestand: Kurzverweise mit Titel und Fachgebiet stimmen (3.3 Wertschöpfungskette und Rationalisierung, 3.4 Bedarfsermittlung …, 3.3 Vertragsgestaltung im Fachgebiet Recht und Steuern, 1.2 Betriebliche Grundfunktionen im Fachgebiet Volks- und Betriebswirtschaft, 2.3 Kosten- und Leistungsrechnung (vertieft)); `ersetzungen-a.json = []` weiter richtig (keine widersprechende Bestandsstelle in `hsq3`, `hsq4`, `wbq1`, `wbq3`).

## Teile B, C, D (Kollisionen)

Keine Begriffs- oder Zahlenkollision, die Korrektur verlangt: nur N9 (2.880) und N11. Teil C nutzt „Recyclinganteil“ für Werbeaussagen (Ware), Teil A grenzt „Recyclinganteil im Sortiment“ von der „Recyclingquote“ ab: konsistent. Teil D (Verpackungsmaterial aus einem Drittland, Zollwert) berührt Verpackungsrecht nicht.
