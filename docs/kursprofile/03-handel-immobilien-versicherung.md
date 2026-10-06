# Kursprofil-Vorschlag: Handels-, Immobilienfachwirt und Versicherungen/Finanzanlagen (Entscheidungsvorlage)

Stand: 06.10.2026 · Status: **Entwurf zur Freigabe, keine Umsetzung** · Kurse: `handelsfachwirt`, `immobilienfachwirt`, `versicherungen-finanzanlagen`
Maßstab ist der Kurs „Fachinformatiker/in Anwendungsentwicklung" (Blaupause: Instrumente, Spiele, Übungswerkzeuge, Glossar, geführte Lernpfade, Prüfungs-Rahmen). Vorgeschlagen wird nur, was fachlich **zum jeweiligen Kurs** passt. Mathe ist nicht Teil dieser Gruppe.

Legende: **Aufwand** S = nur Content/Daten, kein neuer Code (Größenordnung 1–2 Tage) · M = neue Komponente oder neuer Spielmodus (bis ca. 1 Woche) · L = umfangreich (mehr als 1 Woche). **Priorität** hoch/mittel/niedrig. **Kennungen:** I = Instrument, S = Spiel, W = Übungswerkzeug, G = Glossar, L = Lernpfad, P = Prüfungs-Rahmen; `KF` = kursübergreifend gemeinsam. Alle Aufwandsangaben sind Schätzungen; ich habe nichts gebaut oder getestet.

---

## Kurzfassung

1. **Ausgangslage:** Alle drei Kurse haben heute nur die acht *generischen* Management-Instrumente (SWOT, BSC, Ansoff, Gantt, Eisenhower, PDCA, Risikomatrix, Hierarchie; zusammen 13–23 Quiz-Items je Kurs). Dazu kommt bei Immobilien und Versicherungen der Netzplan-Trainer. **Keine** Spiele, **kein** Glossar, **kein** Lernpfad, **kein** hinterlegter Prüfungsablauf. Die 9 IT-Instrumente, 5 IT-Werkzeuge und 6 IT-Spieltypen passen nicht und sollten ausgeblendet werden (nicht nur eingeklappt).
2. **Versicherungskurs zielt auf „Bachelor Professional in Versicherungen und Finanzanlagen (IHK)" nach BAProVFFPrV, nicht auf § 34f GewO.** Der Begriff „Finanzanlagen" steht in § 6 der Verordnung, ist im Content aber praktisch nicht behandelt (0 Treffer zu Anleihe, Zertifikat, Rendite, Magisches Dreieck, Geeignetheit, Nachhaltigkeit). Vor Anlage-Instrumenten braucht es eine Content-Entscheidung (Frage F1).
3. **Handelsfachwirt (hoher Hebel):** Handelskalkulation-Trainer (W-HAN-01), Lagerkennzahlen-Rechner (W-HAN-02), Instrumente Kraljic-Matrix, ABC/XYZ, Kalkulationsschema, Category-Management; Spiele Kreuzworträtsel/Duell/Beleg-Detektiv. Content-Lücke: Handelskalkulation (0 Treffer zu Bezugskalkulation/Kalkulationszuschlag).
4. **Immobilienfachwirt (hoher Hebel):** Wertermittlungs-Instrumente (Verfahren, Ertragswert-Schema, Bewirtschaftungskosten) plus Ertragswert-Rechner (W-IMM-01), Renditeprüfer mit Kaufnebenkosten (W-IMM-03), Betriebskostenabrechnungs-Trainer (W-IMM-04). Content-Lücke: Kaufnebenkosten (0 Treffer).
5. **Versicherungen:** Bedarfs-/Deckungslücken-Rechner (W-VER-01), Unterversicherungs-Rechner (W-VER-02), Risikoausgleich-Simulator (W-VER-03), Instrumente Sparten, Beratungsprozess, Schichtenmodell. Zusätzlich Praxistransferarbeit-Hilfe (P-VER-02) nach dem Muster der Projekt-Hilfe.
6. **Gemeinsam bauen (nicht dreimal):** Rechensprint-Spieltyp mit Aufgabenpaketen (S-KF-01), Beleg-/Fall-Detektiv auf Basis der Phishing-Engine (S-KF-02), Finanzmathe-Kern (W-KF-01), Magisches Dreieck/Viereck der Kapitalanlage (I-KF-01, Immobilien + Versicherung), neutrale Prozesskette (I-KF-02), Prüfungs-Rahmen-Befüllung (P-KF-01).
7. **Prüfungs-Rahmen (hoch, Aufwand S):** Präsentationsdauer weicht vom Standard 10 Minuten ab: Handelsfachwirt 15, Versicherungen 20 (Fachgespräch bis 30), Immobilien 10 (passt). Ohne Eintrag zeigt der Präsentationstrainer für zwei der drei Kurse eine falsche Redezeit.
8. **Bestandsbewertung:** Generische Instrumente passen überwiegend; bedingt problematisch ist die Bezeichnung „Gantt-Diagramm" für reine Phasen-Zuordnungen (z. B. Logistikkette) und die „Risikomatrix"-Items, die Maßnahmen statt Wahrscheinlichkeit/Auswirkung abfragen.
9. **Compliance:** Alle Rechner/Spiele zu Finanz-, Versicherungs- und Immobilienthemen als „Lernwerkzeug, keine Beratung/kein Gutachten" kennzeichnen, nichts speichern, Beispielwerte statt Marktdaten, Rechtsstand (Mietrecht, WEG, VVG, Altersvorsorge) vor Livegang fachlich prüfen.
10. **Empfohlene Reihenfolge:** (1) P-KF-01 + Ausblenden unpassender Einträge, (2) leichte Content-Pakete S (Kreuzworträtsel/Duell, Zonen-Instrumente), (3) Rechner W-HAN-01 / W-IMM-01 / W-VER-02, (4) gemeinsame Engines S-KF-01/-02, (5) Glossare und Lernpfade nach fachlicher Prüfung.

---

## Quellenhinweis zur Belegqualität

„Beleg" nennt Repo-Datei bzw. Web-Quelle (Liste am Ende). Wo ich aus Fachwissen ohne abgerufene Quelle argumentiere, steht **„Beleg: Fachwissen, Quelle vor Umsetzung nachtragen"**. Prüfungsaufgaben wurden nicht übernommen, nur Themen und Strukturen aus Verordnungen und öffentlichen Erklärseiten abgeleitet. Aussagen aus Suchmaschinen-Zusammenfassungen sind als „laut Suchtreffer" markiert und vor Verwendung an der Originalquelle zu prüfen.

---

# A. Handelsfachwirt (`handelsfachwirt`)

Modellunternehmen im Content: **Loreno Mode & Wohnen GmbH** (Einzelhandelskette, ca. 40 Filialen plus Online-Shop). 8 Fachgebiete (HB1–HB4 Pflicht, WB1–WB4 Wahlpflicht), 28 Themen.

## A.1 Prüfungsrahmen

Grundlage: Verordnung über die Prüfung zum anerkannten Fortbildungsabschluss Geprüfter Handelsfachwirt (HdlFachwPrV, im Repo: 13.05.2014), DQR 6.

| Teil | Inhalt | Dauer | Beleg |
|---|---|---|---|
| Schriftlich 1 | Unternehmensführung und -steuerung; Führung, Personalmanagement, Kommunikation und Kooperation | 240 Min. | HdlFachwPrV § 3 |
| Schriftlich 2 | Handelsmarketing (Pflicht), Beschaffung und Logistik (Pflicht), **ein** Wahlbereich: Vertriebssteuerung, Handelslogistik, Einkauf oder Außenhandel | 300 Min. (laut IHK Nord Westfalen: 180 Min. für die beiden Pflichtbereiche, 120 Min. Wahlbereich) | HdlFachwPrV § 3; IHK NW |
| Mündlich | Präsentation (ca. **15** Min.) + situationsbezogenes Fachgespräch (höchstens 20 Min.); Gewichtung 1/3 : 2/3 | 15 + max. 20 Min. | HdlFachwPrV §§ 3, 6 |

Besonderheiten:
- Die beiden schriftlichen Teile werden „auf der Grundlage jeweils einer betrieblichen Situationsbeschreibung" durchgeführt (IHK Nord Westfalen). Das entspricht dem Fallaufgaben-Format der Plattform (`fallaufgaben.md` je Handlungsbereich).
- Präsentationsthema wählt der Prüfling selbst und reicht es vorab ein; es bezieht sich laut Suchtreffer (IHK-Merkblätter) auf **einen** Handlungsbereich. Das Fachgespräch baut auf der Präsentation auf.
- Bestehensregel zur mündlichen Prüfung: IHK Nord Westfalen nennt die mündliche Prüfung als unabhängig vom Bestehen der schriftlichen Teile. **Unsicher** – im Verordnungstext (§§ 3, 7) gegenprüfen, bevor es im Prüfungs-Rahmen steht.
- Innerhalb des 1. schriftlichen Teils ist die Minutenaufteilung auf die beiden Handlungsbereiche in meinen Quellen nicht ausgewiesen: **unsicher**.
- Zulassung (IHK NW, Auszug): u. a. 3-jährige kaufmännische Ausbildung im Handel plus 1 Jahr Praxis, Verkäufer-Ausbildung plus 2 Jahre, oder 5 Jahre Berufspraxis.

Prüfungsgegenstände (HdlFachwPrV § 4, stichpunktartig): Handelsmarketing (Marktanalyse, Sortimentsgestaltung, Verkaufsförderung/Service, Visual Merchandising, Werbekonzepte, E-Commerce); Beschaffung und Logistik (Bedarfsermittlung, Supply-Chain-Management, Waren-/Datenfluss, Transport, Lager); Unternehmensführung (Businessplan, Organisation, **Kosten- und Leistungsrechnung**, Controlling, Finanzierung, Risikomanagement); Führung und Personal; Wahlbereiche (Category Management/Flächenoptimierung/Preis- und Konditionenpolitik; Logistikkette/Investitionsbewertung; Einkaufsstrategien/Lieferantenauswahl/Verhandlung; Außenhandel inkl. Zoll und Finanzierung).

## A.2 Bestandsbewertung (heute zugeordnet)

Technischer Befund: `werkzeuge` ist für Handelsfachwirt leer (`import-content.ts`, `KURS_META.handelsfachwirt`); `seed-games.ts` enthält kein Spiel für den Kurs; kein Lernpfad (`seed-instrument-lernpfad.ts` nur Büro-Fachwirt und Fachinformatiker); kein Glossar; kein `pruefungsablauf`.

| Eintrag | Art | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT-Matrix | Instrument (3 Items: 1.1, 3.1, 5.3) | **passt** | Businessplan/Marktanalyse sind Prüfungsgegenstand (§ 4); Items Q-1.1-05, Q-3.1-06. Q-5.3-12 (Preispolitik): unsicher, ob SWOT dort der passende Rahmen ist. |
| Balanced Scorecard | Instrument (1 Item: 1.3) | **passt** | Controllinginstrumente (§ 4 Unternehmensführung), Q-1.3-03. |
| Ansoff-Matrix | Instrument (0 Items) | **passt, aber ohne Content** | Wachstumsstrategie gehört zu Handelsmarketing/Vertriebssteuerung; Kachel bleibt leer. Reiner Content-Nachtrag (S). |
| Gantt-Diagramm | Instrument (4 Items) | **passt bedingt** | Q-3.3-06 (Kampagne), Q-4.3-09 (LVS-Einführung) sind echte Phasenpläne. Q-6.1-10 (Logistikkette Beschaffung–Distribution) ist ein Prozess, kein Zeitplan; Bezeichnung „Gantt" irreführend. Vorschlag: Anzeige als „Phasen-/Ablaufplan" oder Items umsortieren. |
| Eisenhower-Matrix | Instrument (1 Item: 2.1) | **passt** | Zeit-/Selbstmanagement ist Prüfungsgegenstand (Führung); Q-2.1-10. |
| PDCA-Zyklus | Instrument (2 Items: 1.4, 2.4) | **passt** | Risikomanagement, Arbeits- und Gesundheitsschutz (§ 4). |
| Risikomatrix | Instrument (3 Items: 1.4, 4.2, 6.2) | **passt bedingt** | Lieferketten-/Investitionsrisiken (Q-4.2-07, Q-6.2-12) passen. Die Zonen heißen „Wahrscheinlichkeit/Auswirkung", die Items fragen aber Maßnahmen (vermeiden/absichern/beobachten/akzeptieren): Beschriftung und Item-Text angleichen. |
| Projektstrukturplan/Organigramm | Instrument (4 Items) | **passt** | Sortimentshierarchie (Q-3.2-06), Distributionsnetz (Q-4.3-02), Finanzierungssystematik (Q-1.2-03) sind echte Baumstrukturen. |
| Netzplan-Trainer | Werkzeug | **passt nicht (kein Themenbezug)** | Kein Projektmanagement-Thema in HB1–WB4; heute auch nicht freigeschaltet. Bleibt ausgeblendet. |
| OSI, Schutzziele, SQL-Befehlsgruppen, Scrum, UML, Teststufen, ER-Modell, Normalformen, Struktogramm (9 IT-Instrumente) | Instrumente | **passt nicht** | IT-Fachinhalte; im Handels-Content ohne Entsprechung (Scrum/Netzplan/Phishing: 0 Treffer; „Cyber" 2 Dateien, „Datenschutz" 1). Ausblenden. |
| Subnetting, SQL-Übungsfläche, Terminal, Topologie, Flag-Rätsel | Werkzeuge | **passt nicht** | IT-spezifisch; heute nicht freigeschaltet, nur als „nicht verfügbar" sichtbar. |
| Kreuzworträtsel, Begriffe-Duell, Memory | Spieltypen | **passt (Mechanik)** | Fachneutral; für den Kurs aber noch **kein** Content (`seed-games.ts`). |
| Phishing-Detektiv | Spieltyp | **unsicher** | Inhalt wäre IT-Alltag; nur mit eigenem Handels-Content (siehe S-KF-02) sinnvoll. |
| Bug-Hunt, Code-Reihenfolge, Troubleshooting-Detektiv, Subnetting-Sprint, Zahlensystem-Sprint | Spieltypen | **passt nicht** | Programmier-/Netzwerkinhalte. (Die Mechanik des Sprint-Spiels ist wiederverwendbar, siehe S-KF-01.) |

## A.3 Neue Vorschläge

### Instrumente

**I-HAN-01 · Kraljic-Matrix** (Priorität hoch · Aufwand S)
- Aufbau: Zonen-Zuordnung, 4 Felder: Hebelprodukte, Strategische Produkte, Standard-/unkritische Produkte, Engpassprodukte. Begriffe: Beschaffungsobjekte der Loreno (z. B. Standard-Verpackung, Exklusiv-Kollektion eines Einzellieferanten) → Feld; Achsen Gewinnauswirkung und Versorgungsrisiko.
- Nutzen: Einkaufsstrategien (WB3) und Beschaffung (HB4); Praxis: Lieferantenportfolio.
- Passung/Beleg: HdlFachwPrV § 4 (Einkaufsstrategien, Lieferantenauswahl); Modell-Erklärung welt-der-bwl.de/Kraljic-Matrix. Im Content 0 Treffer „Kraljic" → Theorie-Ergänzung in 7.1 nötig.
- Risiken: Fachrichtigkeit (Feldbezeichnungen variieren je Lehrbuch: „Hebel-/Engpass-/Standard-/strategische Produkte" vereinheitlichen); Urheberrecht unkritisch (Modell).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-02 · ABC-/XYZ-Analyse** (Priorität hoch · Aufwand S, Variante M)
- Aufbau: Variante A (S): zwei getrennte 3-Zonen-Instrumente (A/B/C nach Wertanteil; X/Y/Z nach Verbrauchsregelmäßigkeit). Variante B (M): kombinierte 9-Felder-Matrix – dafür müsste die heutige Zonenobergrenze 7 (Kommentar in `quiz-logic.ts`: „3 bis 7") angehoben werden.
- Nutzen: Sortiments-/Bestandsführung (HB3 3.2, HB4 4.1 und 4.3); in Prüfungen häufiges Rechen-/Zuordnungsthema.
- Passung/Beleg: Im Content 6 Dateien zu ABC/XYZ (u. a. HB4). Erklärung: Uni Duisburg-Essen, ABC-XYZ-Einführung (PDF).
- Risiken: Grenzen (80/15/5) sind Konvention; im Item ausdrücklich nennen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-03 · Kalkulationsschema (Bezugs-, Selbstkosten-, Verkaufskalkulation)** (Priorität hoch · Aufwand S)
- Aufbau: 3 Zonen: Bezugskalkulation, Selbstkostenkalkulation, Verkaufskalkulation. Begriffe: Listeneinkaufspreis, Lieferantenrabatt, Lieferantenskonto, Bezugskosten, Handlungskosten, Gewinn, Kundenskonto, Kundenrabatt, Umsatzsteuer → jeweilige Stufe. Wirkt als Wissenstest vor dem Rechentrainer W-HAN-01.
- Nutzen: Kosten- und Leistungsrechnung (§ 4); Berufspraxis Preisgestaltung.
- Passung/Beleg: Schema laut wirtschaftswissen.de/Handelskalkulation und studyflix.de. **Content-Lücke:** 0 Treffer zu „Bezugskalkulation/Kalkulationszuschlag", „Handelsspanne" nur in 2 Dateien (5.3, 6.2). Ein Theorie-Thema „Handelskalkulation" fehlt in HB1 (Titel 1.1–1.4) – unsicher, ob bewusst unter 1.3 gedacht.
- Risiken: Schreibweise der Stufen („Handlungskosten" vs. „Gemeinkosten") einheitlich festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-04 · Marketing-Mix im Handel** (Priorität mittel · Aufwand S)
- Aufbau: 4 Zonen: Sortimentspolitik, Preis-/Konditionenpolitik, Kommunikationspolitik, Distributionspolitik (inkl. Standort/Online). Begriffe: Maßnahmen der Loreno (Eigenmarke „Loreno Living", Frühjahrsaktion, Click-and-Collect …).
- Nutzen: Handelsmarketing ist ganzer Prüfungsbereich (HB3).
- Passung/Beleg: HdlFachwPrV § 4 Handelsmarketing; Marketing-Mix im Content in 1 Datei erwähnt.
- Risiken: Lehrbuch-Varianten (4P vs. 7P): im Handel 4 Politiken festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-05 · Category-Management: Warengruppenrollen** (Priorität mittel · Aufwand S)
- Aufbau: 4 Zonen laut ECR: Profilierungs-, Pflicht-, Ergänzungs-, Saison-/Impulssortiment (Begriffe vor Umsetzung gegen das GS1-Dossier prüfen, Suchtreffer-Wortlaut war englisch: Profiling/Mandatory/Supplementary/Seasonal-Impulse). Begriffe: Warengruppen der Loreno mit Rolle begründen.
- Nutzen: Wahlbereich Vertriebssteuerung (WB1 5.1), Sortimentsgestaltung (HB3).
- Passung/Beleg: Content: „Category" in 7 Dateien; GS1 Germany Category-Management-Dossier, ecr.digital.
- Risiken: Bezeichnungen je Quelle uneinheitlich → **unsicher**, Fachperson prüfen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-06 · Category-Management: 8-Stufen-Prozess** (Priorität mittel · Aufwand S–M)
- Aufbau: Ablauf-Erkennung mit 8 Stufen (Strategische Ausrichtung, Insights/Definition, Rolle, Bewertung, Zielsetzung, Taktiken, Umsetzung, Kontrolle). Setzt neutrale Prozesskette (I-KF-02) voraus, da das heutige „Ablauf"-Instrument für Struktogramme gebaut ist.
- Nutzen/Passung: WB1 5.1; Quelle ECR/GS1-Dossier (Stufennamen laut Suchtreffer ecr.digital).
- Risiken: 8 Stufen > Zonenobergrenze 7 → als Sortier-Aufgabe (Quiz-Typ „Sortieren") statt Zonen lösbar (S), als Instrument braucht es I-KF-02.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-07 · Incoterms-Gruppen** (Priorität mittel · Aufwand S)
- Aufbau: 4 Zonen: Gruppe E (Abholung), F (Hauptlauf nicht vom Verkäufer bezahlt), C (Verkäufer zahlt Hauptlauf, Gefahr geht früh über), D (Verkäufer liefert bis Bestimmungsort). Begriffe: Klauselbeschreibungen (EXW, FCA, FOB, CIF, CPT, DAP, DDP …) → Gruppe.
- Nutzen: Wahlbereich Außenhandel (WB4 8.1–8.3).
- Passung/Beleg: Content „Incoterms" in 3 Dateien; ICC Germany/IHK-Matrix Incoterms 2020.
- Risiken: **Urheberrecht:** Incoterms-Regeltexte sind ICC-geschützt → nur Klauselnamen und eigene Kurzformulierungen. Zuordnung der Gruppen ist in manchen Erklärseiten verkürzt (Suchtreffer-Zusammenfassung ungenau) → Fachprüfung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-HAN-08 · BCG-Portfolio (Marktanteil/Marktwachstum)** (Priorität niedrig · Aufwand S)
- Aufbau: 4 Zonen: Fragezeichen, Sterne, Cash-Cows, arme Hunde; Begriffe: Sortimentsbereiche der Loreno.
- Nutzen: Sortiments-/Marktanalyse (HB3 3.1, 3.2). Content: „Portfolio/BCG" 0 Treffer → Theorie fehlt.
- Beleg: Fachwissen, Quelle vor Umsetzung nachtragen. Risiko: In neueren Rahmenplänen u. U. nicht prüfungsrelevant → **unsicher**.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Content-Nachtrag ohne Code: Ansoff-Items für Handelsfachwirt (Priorität mittel, S).

### Spiele

**S-HAN-01 · Handels-Rechensprint** (Priorität hoch · Aufwand M als Teil von S-KF-01)
- Spieltyp: Zahlen-Sprint mit zufälligen Aufgaben: Bezugspreis, Handelsspanne, Kalkulationszuschlag, Kalkulationsfaktor, Skontobetrag, Umschlagshäufigkeit, Lagerdauer, Meldebestand.
- Nutzen: Rechenroutine für Kalkulation und Lager (Prüfung und Praxis). Beleg: Formeln siehe Quellen Handelskalkulation/Lagerkennzahlen; im Content sind Umschlagshäufigkeit in 8 Dateien, Meldebestand in 1 Datei.
- Risiken: Rundungsregeln (Prozentpunkte, 2 Nachkommastellen) eindeutig festlegen; keine Bewertung/Belohnung (Spielregel der Plattform).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-HAN-02 · Kreuzworträtsel „Handelsfachbegriffe"** (Priorität hoch · Aufwand S)
- Inhalt: 10 Begriffe, z. B. Sortimentstiefe, Kommissionierung, Cross-Docking, Konditionen, Listung, Handelsspanne, Meldebestand, Skonto, Planogramm, Flächenproduktivität (Hinweise aus der vorhandenen Theorie ableiten).
- Passung: bestehender Spieltyp, nur neue Datei wie `game-kreuzwortraetsel-*.ts`; Begriffe liegen im Content (Flächenproduktivität: 5 Dateien).
- Risiken: Mehrdeutigkeit der Kurzhinweise; Fachprüfung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-HAN-03 · Begriffe-Duell „Handel: ähnlich, aber nicht gleich"** (Priorität hoch · Aufwand S)
- Inhalt: A-oder-B-Paare: Handelsspanne vs. Kalkulationszuschlag; Rabatt vs. Skonto; Sortimentsbreite vs. -tiefe; Zentral- vs. Regionallager; Push vs. Pull; Bonus vs. Rabatt; FCA vs. FOB; Kommissionierung vs. Konfektionierung.
- Passung: Duell-Typ ist genau für „ähnliche Begriffe sicher unterscheiden" gebaut (`Spiele.tsx`).
- Risiken: nur Paare mit eindeutiger Fachdefinition verwenden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-HAN-04 · Beleg-Detektiv Warenein-/Rechnungsprüfung** (Priorität mittel · Aufwand M als Teil von S-KF-02)
- Spieltyp: wie Phishing-Detektiv, aber Dokumente: Bestellung, Lieferschein, Rechnung; Auffälligkeiten anklicken (Mengenabweichung, Preisabweichung, falscher Skonto-Abzug, Mängel bei Wareneingang) und Entscheidung „in Ordnung/Reklamation".
- Nutzen: Warenwirtschaft, Mängelrüge, Rechnungsprüfung im Einkauf (HB4, WB3).
- Passung: Wareneingang im Content (Warenwirtschaft 5 Dateien).
- Risiken: Rechtsfragen zur Mängelrüge (HGB § 377) vor Verwendung fachlich prüfen – **Beleg: Fachwissen, Quelle nachtragen**.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-HAN-05 · Memory „Incoterms und Gefahrübergang" bzw. „Lagerkennzahl und Formel"** (Priorität niedrig · Aufwand S)
- Inhalt: Paare Klausel ↔ „Gefahr geht über bei …" oder Kennzahl ↔ Formel. Nur ein Set wählen.
- Risiken: Incoterms-Text-Urheberrecht (siehe I-HAN-07).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Optional, Priorität niedrig, Aufwand L: **Planogramm-Puzzle** – Artikel nach Regeln ins Regal ziehen (Sicht-/Greifzone, Impulsartikel am Kassenbereich) für Visual Merchandising HB3 3.4. Nur auf Nachfrage.)

### Übungswerkzeuge

**W-HAN-01 · Handelskalkulation-Trainer** (Priorität hoch · Aufwand M)
- Funktion: Vorwärts-, Rückwärts- und Differenzkalkulation. Eingaben: Listeneinkaufspreis, Rabatt-/Skonto-/Zuschlagssätze, Bezugskosten, Handlungskostenzuschlag, Gewinnzuschlag, Kundenskonto, Kundenrabatt, USt-Satz. Ausgabe: ausgefülltes Schema mit Prüfung pro Zeile; Kennzahlen Kalkulationszuschlag, Kalkulationsfaktor, Handelsspanne. Zufallsaufgaben analog Netzplan-Trainer (rein im Browser, ohne Server, ohne Speicherung).
- Nutzen: Kosten- und Leistungsrechnung (§ 4 HdlFachwPrV), tägliche Praxis im Einkauf/Preismanagement.
- Passung/Beleg: Schema und Formeln wirtschaftswissen.de, studyflix.de, gruenderlexikon.de. Content-Lücke Theorie (siehe I-HAN-03).
- Risiken: Rundung und Basis der Prozentsätze (auf Bezugspreis vs. Verkaufspreis) – Aufgabenstellung eindeutig; Handelsspanne vs. Kalkulationszuschlag nicht verwechseln.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-HAN-02 · Lager- und Bestellkennzahlen-Rechner** (Priorität hoch · Aufwand M)
- Funktion: Eingaben Jahresverbrauch/-absatz, Anfangs-/Endbestand, Lieferzeit, Tagesverbrauch, Sicherheitsbestand, Bestellkosten, Lagerkostensatz. Ausgabe: Ø Lagerbestand, Umschlagshäufigkeit, Ø Lagerdauer (Tage), Lagerzinssatz, Meldebestand; optional optimale Bestellmenge (Andler). Übungsmodus mit Zufallswerten.
- Nutzen: HB4 4.1 und 4.3; Content-Formeln liegen bereits vor (Umschlagshäufigkeit 8 Dateien, Meldebestand 1).
- Passung/Beleg: studyflix.de/Lagerkennzahlen, handelsfachwirt-pro.de/Formelsammlung, trainingsmanufaktur.de/Andler-Formel. **Unsicher**, ob die Andler-Formel für die Handelsfachwirt-Prüfung zwingend ist (Content: 0 Treffer) → als optionales Modul.
- Risiken: Verfahrensvarianten (Ø aus Anfang/Ende vs. 12 Monatswerte) benennen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-HAN-03 · ABC-Analyse-Werkstatt** (Priorität mittel · Aufwand M)
- Funktion: Artikelliste mit Jahresumsatz eingeben bzw. vorgegeben; Sortierung, Kumulierung, Lorenz-/Pareto-Kurve, einstellbare Grenzen (Standard 80/15/5); Übungsmodus: Klassen selbst bestimmen, dann prüfen. Optional XYZ aus Monatswerten (Variationskoeffizient).
- Nutzen: Sortiment, Lager, Einkauf. Beleg: Uni Duisburg-Essen, tacto.ai (Lexikon).
- Risiken: Klassengrenzen nur als Konvention darstellen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-HAN-04 · Deckungsbeitrags- und Flächenkennzahlen-Rechner** (Priorität mittel · Aufwand S)
- Funktion: Deckungsbeitrag je Stück/Warengruppe, Break-even-Menge, Umsatz und Rohertrag je m² (Flächenproduktivität). Eingaben: Preis, variable/fixe Kosten, Fläche.
- Nutzen: HB1 1.3 und WB1 5.2. Content: Deckungsbeitrag 6 Dateien, Break-even 2, Flächenproduktivität 5.
- Risiken: gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Glossar (G-HAN-01 · Priorität hoch · Aufwand M, Fachprüfung der Einträge)
- Umfang: ca. 150–170 Einträge (Blaupause: 157 Einträge für 7 Fachgebiete), je Eintrag Begriff, Synonyme, Kurzdefinition, Thema, Abschnitt, Prüfstatus „nein" bis zur Fachprüfung.
- Themen mit hoher Dichte: Handelsmarketing (Sortimentstiefe/-breite, Listung, Visual Merchandising, Planogramm, AIDA), Beschaffung/Logistik (Bezugspreis, Meldebestand, Kommissionierung, Cross-Docking, Lieferbereitschaftsgrad), Unternehmensführung (Deckungsbeitrag, Break-even, BSC, Eigen-/Fremdfinanzierung), Führung/Personal (Mitarbeitergespräch, Arbeitsschutz), Wahlbereiche (Category Management, Konditionen, Incoterms, Akkreditiv).
- Gemeinsamer Grundstock mit anderen Fachwirt-Kursen siehe G-KF-01.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Geführte Lernpfade (7 Stationen mit Fallbeispiel)

**L-HAN-01 · Category-Management für die Warengruppe Wohnaccessoires der Loreno** (Priorität mittel · Aufwand L)
- Instrument: I-HAN-05/-06 (Rollen und 8 Stufen); Fallbeispiel Loreno Mode & Wohnen GmbH (bereits im Content eingeführt).
- Risiken: hängt von I-HAN-05/-06 ab; Lernpfade sind Premium-Funktion (F-130) – Wertentscheidung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-HAN-02 · Balanced Scorecard der Loreno** (Priorität mittel · Aufwand M)
- Instrument: BSC existiert (Q-1.3-03); Mechanik und Stationen vorhanden (heute BSC-Pfad „Nordstern" nur für Büro-Fachwirt). Nur Branchen-Content Handel: Kennzahlen Umsatz je m², Kundenzufriedenheit, Lieferbereitschaftsgrad, Mitarbeiterfluktuation.
- Risiko: alternativ den bestehenden Nordstern-Pfad freischalten (Frage F5).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Prüfungs-Rahmen

**P-HAN-01 · Prüfungsablauf, Prüfungsbereiche, Präsentation 15 Minuten** (Priorität hoch · Aufwand S)
- Inhalt: `pruefungsablauf`-Stichpunkte (zwei schriftliche Teile mit Situationsbeschreibung, 240/300 Min., Wahlbereich, mündlich 15 + ≤20, Gewichtung 1/3:2/3), `presentationMinutes: 15` (heute Standard 10 → falsch), `pruefungsbereiche` (Teil 1: HB1+HB2; Teil 2: HB3+HB4+gewählter WB), Hinweis: Wahlbereich vorab festlegen und Präsentationsthema fristgerecht einreichen (Fristen je IHK verschieden → nur allgemeiner Hinweis).
- Prüfungsangst-Hilfe: bestehende Seite „Gelassen bleiben" (F-154) bleibt gleich; Zusatz kurzer Abschnitt zur Situationsbeschreibung („erst Lage und Aufgabe markieren") und zum Fachgespräch (nutzt `fachgespraech.md`).
- Beleg: HdlFachwPrV, IHK Nord Westfalen. Offen: mündlich unabhängig vom schriftlichen Ergebnis (siehe A.1).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

# B. Immobilienfachwirt (`immobilienfachwirt`)

Modellunternehmen: **Ravelin Immobilien GmbH** (Hausverwaltung mit ca. 3.000 Einheiten, Makler, Bauträgerprojekte). 6 Fachgebiete, 24 Themen.

## B.1 Prüfungsrahmen

Grundlage: Verordnung über die Prüfung zum anerkannten Abschluss Geprüfter Immobilienfachwirt (ImmoFachwPrV vom 25.01.2008, zuletzt geändert 2019), DQR 6. Ob die Fortbildung eine Neuordnung zum „Bachelor Professional" erhalten hat, konnte ich nicht belegen (Suchtreffer erwähnen nur die Titelzusatz-Möglichkeit nach BBiG): **unsicher**, vor Livegang an BIBB-Berufesuche prüfen.

| Teil | Inhalt | Dauer | Beleg |
|---|---|---|---|
| Schriftlich | 6 Handlungsbereiche, anwendungsbezogene Aufgaben: Rahmenbedingungen (60), Unternehmenssteuerung und Kontrolle (90), Personal/Arbeitsorganisation/Qualifizierung (120), Immobilienbewirtschaftung (120), Bauprojektmanagement (120), Marktorientierung und Vertrieb/Maklertätigkeit (120) | gesamt 600–660 Min. | ImmoFachwPrV § 3 |
| Mündlich | Präsentation (höchstens **10** Min.; selbst gewähltes Thema, komplexe betriebliche Problemstellung aus allen Handlungsbereichen) + Fachgespräch (höchstens 20 Min.); Fachgespräch doppelt gewichtet | 10 + max. 20 Min. | ImmoFachwPrV § 3; IHK Köln |

Besonderheiten:
- Zulassung zur mündlichen Prüfung nur bei mindestens „ausreichend" in **allen** schriftlichen Prüfungen (§ 3 Abs. 11 laut Abruf).
- Schriftlicher Teil in der Praxis oft an zwei Tagen (IHK Köln: Tag 1 Rahmenbedingungen, Personal, Bewirtschaftung; Tag 2 Unternehmenssteuerung, Bauprojektmanagement, Vertrieb); Aufteilung **je IHK verschieden**, nicht im Prüfungs-Rahmen festschreiben.
- Präsentationsthema bis zur ersten schriftlichen Prüfung einzureichen (IHK Köln; je IHK verschieden).
- Prüfungsgegenstände (§ 4, Auszug): Mietverträge (privat/gewerblich), WEG-Verwaltung, Instandhaltung/Modernisierung, Bewirtschaftungskosten-Optimierung; Finanzierung, Förderprogramme, Objektrentabilitäts- und Wirtschaftlichkeitsberechnungen; Immobilienbewertung und Marktpreisbildung, An-/Verkauf, Besonderheiten der Maklertätigkeit; Investitions-, Liquiditäts- und Rentabilitätsplanung.

## B.2 Bestandsbewertung (heute zugeordnet)

Technischer Befund: `werkzeuge: ["netzplan"]` (`KURS_META.immobilienfachwirt`); keine Spiele, kein Glossar, kein Lernpfad, kein Prüfungsablauf. 23 Instrument-Items vorhanden.

| Eintrag | Art | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT-Matrix | Instrument (1 Item: 5.1) | **passt** | Standortanalyse in der Projektentwicklung; Q-5.1-13. |
| Balanced Scorecard | Instrument (2 Items: 1.4, 2.3) | **passt** | Controlling/Unternehmenssteuerung (HB2); Q-1.4-11 (ESG als Perspektive), Q-2.3-03. |
| Ansoff-Matrix | Instrument (1 Item: 1.2) | **passt** | Wachstumsschritte der Ravelin (Q-1.2-12), Marktstrukturen. |
| Gantt-Diagramm | Instrument (6 Items) | **passt bedingt** | Echte Zeitbezüge: Q-4.4-12 (Fristenverlauf § 556 Abs. 3 BGB), Q-5.2-11, Q-5.4-11 (Bau). Q-2.2-10 (Finanzierungsbausteine je Projektphase) und Q-6.2-09 (Vermarktungsphasen) sind Phasenzuordnungen; Bezeichnung „Gantt" unscharf. |
| Eisenhower-Matrix | Instrument (3 Items) | **passt bedingt** | Aufgabenpriorisierung (Arbeitsorganisation Q-3.2-11) passt; Q-1.3-12 (Berufsbild) und Q-4.3-12 (Instandhaltung) sind Alltagsbeispiele – für Immobilienwirtschaft nicht spezifisch, aber unschädlich. |
| PDCA-Zyklus | Instrument (2 Items: 1.3, 6.4) | **passt** | Qualitätssicherung im Kundenmanagement; Q-6.4-10. |
| Risikomatrix | Instrument (3 Items) | **passt** | Q-2.4-03 (Risikomanagement), Q-6.1-10 (Haftungsrisiken Makler: Verschweigen von Mängeln etc.). Gleiche Zonen-/Item-Unschärfe wie bei Handel. |
| Projektstrukturplan/Organigramm | Instrument (5 Items) | **passt** | Sehr gute Strukturfälle: WEG-Aufteilung Sonder-/Gemeinschaftseigentum (Q-1.1-13), WEG-Organe (Q-4.2-12), Sachwert-Struktur (Q-6.3-09). |
| Netzplan-Trainer | Werkzeug | **passt** | Bauprojekt-Terminplanung (HB5 5.4). Im Content „kritischer Pfad" in 3 Dateien, „Netzplan" in 1. |
| 9 IT-Instrumente; 5 IT-Werkzeuge | Instrumente/Werkzeuge | **passt nicht** | Kein Bezug zu Immobilienwirtschaft (Scrum/Cyber/Phishing: 0 Treffer). Ausblenden. |
| Kreuzworträtsel, Begriffe-Duell, Memory | Spieltypen | **passt (Mechanik)** | Noch kein Content. |
| Phishing-Detektiv | Spieltyp | **unsicher** | Nur mit Immobilien-Content (siehe S-KF-02: Abrechnungs-/Exposé-Detektiv). |
| Bug-Hunt, Code-Reihenfolge, Troubleshooting, Subnetting-Sprint, Zahlensystem-Sprint | Spieltypen | **passt nicht** | IT-Inhalte; Sprint-Mechanik wiederverwendbar (S-KF-01). |

## B.3 Neue Vorschläge

### Instrumente

**I-IMM-01 · Die drei Wertermittlungsverfahren** (Priorität hoch · Aufwand S)
- Aufbau: Zonen-Zuordnung, 3 Felder: Vergleichswertverfahren, Ertragswertverfahren, Sachwertverfahren. Begriffe: Vergleichsfaktoren/Bodenrichtwert, Liegenschaftszinssatz, Reinertrag, Normalherstellungskosten, Alterswertminderung, Sachwertfaktor, Rohertrag.
- Nutzen: Immobilienbewertung (HB6 6.3); Praxis: Marktpreisbildung/Kundengespräch.
- Passung/Beleg: ImmoFachwPrV § 4 (Bewertung/Marktpreisbildung); ImmoWertV (gesetze-im-internet.de, § 31 Reinertrag/Rohertrag, § 32 Bewirtschaftungskosten). Content: Ertragswert 4 Dateien, Sachwert 4, Vergleichswert 2.
- Risiken: Fachrichtigkeit; ImmoWertV-Begriffe (Sachwertfaktor/Marktanpassung) aktuell halten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-02 · Rechenschema Ertragswertverfahren** (Priorität hoch · Aufwand S–M)
- Aufbau: Schritt-Zuordnung (Zonen = Stufen, 5): Rohertrag → Bewirtschaftungskosten → Reinertrag/Bodenwertverzinsung → Gebäudereinertrag/Barwertfaktor → Ertragswert. Begriffe/Positionen ordnen. Zweites Content-Set für das Sachwertschema (heute nur als Hierarchie Q-6.3-09).
- Nutzen: Wertermittlung ist rechenintensiv; Schema bildet Gedächtnisanker, bevor W-IMM-01 gerechnet wird.
- Beleg: ImmoWertV §§ 31, 32 (Suchtreffer buzer.de/gesetze-im-internet.de); Barwertfaktor-Formel (q^n−1)/(q^n·(q−1)): **Fachwissen, Quelle nachtragen**.
- Risiken: Schemavarianten (allgemeines vs. vereinfachtes Ertragswertverfahren) nur das allgemeine Schema abbilden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-03 · Bewirtschaftungskosten nach ImmoWertV** (Priorität mittel · Aufwand S)
- Aufbau: 3 Zonen: Verwaltungskosten, Instandhaltungskosten, Mietausfallwagnis. Begriffe: Entgelt für Verwalter, Reparaturrücklage je m², Leerstand/Zahlungsausfall, plus Distraktoren (umlagefähige Betriebskosten, Finanzierungskosten).
- Passung/Beleg: ImmoWertV § 32 (laut Suchtreffer drei Bestandteile). Ob **nicht umlagefähige Betriebskosten** als eigene Position geführt werden, ist in meinen Quellen nicht eindeutig: **unsicher**, am Verordnungstext prüfen. Content: „Bewirtschaftungskosten" 3 Dateien.
- Risiken: Verwechslung mit mietrechtlichen Betriebskosten (BetrKV) – bewusst als Lernpunkt (siehe I-IMM-04).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-04 · Betriebskosten: umlagefähig oder nicht** (Priorität hoch · Aufwand S)
- Aufbau: 3 Zonen: umlagefähig (Betriebskostenkatalog), nicht umlagefähig (Verwaltung, Instandhaltung/Reparatur), verbrauchsabhängig nach Heizkostenverordnung. Begriffe: Grundsteuer, Hausmeister, Gartenpflege, Aufzug, Müllabfuhr, Bankgebühren, Reparatur, Verwalterhonorar …
- Nutzen: Betriebskostenabrechnung (HB4 4.4) ist Alltag jeder Verwaltung und häufiger Streitpunkt.
- Passung/Beleg: Betriebskostenverordnung § 2, § 556 BGB; Content: „Betriebskosten" 7 Dateien.
- Risiken: **Rechtsstand/Rechtsberatung:** Gewerbemiete und individuelle Vereinbarungen weichen ab; „sonstige Betriebskosten" nur bei Vereinbarung; Hinweis „Lernmodell, keine Rechtsberatung".
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-05 · Wege der Mieterhöhung** (Priorität hoch · Aufwand S)
- Aufbau: 4 Zonen: Vergleichsmiete (§ 558 BGB), Modernisierungsumlage (§ 559), Staffelmiete (§ 557a), Indexmiete (§ 557b). Begriffe: „15 Monate unverändert", „Kappungsgrenze 20/15 % in drei Jahren", „im Vertrag vorab vereinbarte Stufen", „Bindung an Verbraucherpreisindex", „anteilige Umlage der Kosten".
- Nutzen: Mietverwaltung (HB4 4.1); Content: Staffelmiete/Indexmiete/Kappungsgrenze je 3 Dateien.
- Passung/Beleg: BGB §§ 557a, 557b, 558, 559 (Erklärseiten mietrecht-einfach.de, se-legal.de).
- Risiken: **Rechtsstand hoch veränderlich** (Mietpreisbremse: 0 Treffer im Content; Kappungsgrenzen-Gebiete landesspezifisch); nur Grundprinzipien, Zahlen vor Livegang gegen Gesetz prüfen; keine Rechtsberatung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-06 · WEG: Organe und Zuständigkeiten** (Priorität hoch · Aufwand S)
- Aufbau: 4 Zonen: Eigentümerversammlung, Verwalter, Verwaltungsbeirat, Gemeinschaft der Wohnungseigentümer. Begriffe: Beschlüsse über Wirtschaftsplan/Jahresabrechnung, Vertretung nach außen, Unterstützung/Kontrolle, Träger von Rechten und Pflichten am Gemeinschaftseigentum. Ergänzt die bestehenden Hierarchie-Items (Q-4.2-12) um eine Zonen-Variante und neue Inhalte aus der WEG-Reform 2020.
- Nutzen: WEG-Verwaltung (HB4 4.2); Content: „Eigentümerversammlung" 9 Dateien, „Wirtschaftsplan" 7.
- Passung/Beleg: WEG-Reform 2020 (wohnen-im-eigentum.de): Eigentümerversammlung immer beschlussfähig, einfache Mehrheit (§ 25), Vermögensbericht (§ 28).
- Risiken: **Rechtsstand** (Reform 2020; Verwalterbestellung: 0 Treffer im Content), Fachprüfung zwingend.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-07 · DIN-276-Kostengruppen** (Priorität hoch · Aufwand S)
- Aufbau: 7 Zonen = Kostengruppen 100 Grundstück, 200 Herrichten/Erschließen, 300 Bauwerk – Baukonstruktionen, 400 Bauwerk – Technische Anlagen, 500 Außenanlagen, 600 Ausstattung, 700 Baunebenkosten. Begriffe: Kostenpositionen eines Ravelin-Bauträgerprojekts.
- Nutzen: Kosten- und Terminplanung Bau (HB5 5.4), Objektrentabilität.
- Passung/Beleg: Content: „DIN276" 1 Datei, „Kostengruppe" 3 Dateien; passt genau in die Zonenobergrenze 7.
- Risiken: **Urheberrecht:** DIN-Norm geschützt → nur Gruppennummern/-kurznamen, eigene Positionsbeispiele. Gruppeneinteilung nach DIN 276 (2018) **Fachwissen, Quelle nachtragen**.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IMM-08 · HOAI-Leistungsphasen (gruppiert)** (Priorität niedrig · Aufwand M)
- Aufbau: neun Leistungsphasen sind mehr als 7 Zonen; entweder gruppiert (Planung LP 1–4, Ausführungsvorbereitung LP 5–7, Ausführung LP 8, Betreuung LP 9) oder erst nach Anhebung der Zonenobergrenze/Prozesskette (I-KF-02).
- Nutzen: Bauplanung (HB5 5.2). Content: HOAI 2 Dateien.
- Beleg: Fachwissen, Quelle nachtragen; **unsicher**, wie tief die Prüfung die LP-Struktur verlangt.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Gemeinsam mit Versicherung: I-KF-01 (Magisches Dreieck/Viereck der Kapitalanlage, Investitionsentscheidungen) und I-KF-02 (Prozesskette z. B. Vermietungsprozess).

### Spiele

**S-IMM-01 · Kreuzworträtsel „Immobilienwirtschaft"** (Priorität hoch · Aufwand S)
- Inhalt: Sondereigentum, Teilungserklärung, Grundschuld, Mietspiegel, Courtage, Rohertrag, Bodenrichtwert, Energieausweis, Wirtschaftsplan, Erhaltungsrücklage u. ä. (alle im Content vorhanden: Grundbuch 8, Energieausweis 8, Erhaltungsrücklage 7 Dateien).
- Risiken: Fachprüfung der Hinweise.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IMM-02 · Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich"** (Priorität hoch · Aufwand S)
- Inhalt: Sondereigentum vs. Gemeinschaftseigentum; Grundschuld vs. Hypothek; Kaltmiete vs. Warmmiete; Instandhaltung vs. Modernisierung; Brutto- vs. Nettomietrendite; Verkehrswert vs. Beleihungswert; Alleinauftrag vs. einfacher Maklerauftrag; Betriebskosten umlagefähig vs. nicht.
- Risiken: Beleihungswert-Abgrenzung (Beleg: Fachwissen, BelWertV, Quelle nachtragen).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IMM-03 · Immobilien-Rechensprint** (Priorität hoch · Aufwand M als Teil von S-KF-01)
- Aufgabenpaket: Kaufnebenkosten (Grunderwerbsteuer, Notar/Grundbuch, Provision), Kaufpreisfaktor, Brutto-/Nettomietrendite, Betriebskosten je m², Annuität (Rate = Darlehen × (Zins + Tilgung)), Provision nach Halbteilung.
- Beleg: Sparkasse (Kaufnebenkosten, Mietrendite), von-poll.com (Kaufpreisfaktor), dejure.org BGB § 656c. Content-Lücke: Kaufnebenkosten 0 Treffer, Annuität 1 Datei.
- Risiken: Grunderwerbsteuersätze je Bundesland (3,5–6,5 % laut Sparkasse/Suchtreffer): Aufgabenstellung gibt den Satz vor (keine Echtdaten).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IMM-04 · Abrechnungs-Detektiv (Betriebskostenabrechnung prüfen)** (Priorität mittel · Aufwand M als Teil von S-KF-02)
- Spieltyp: wie Phishing-Detektiv: fehlerhafte Abrechnung, Auffälligkeiten anklicken (nicht umlagefähige Position, falscher Verteilerschlüssel, Rechenfehler, Abrechnungszeitraum über 12 Monate, Zugang nach Ablauf der 12-Monats-Frist), Entscheidung „zulässig/zu beanstanden".
- Beleg: § 556 Abs. 3 BGB (bmgev.de, nebenkosten-assistent.de); Q-4.4-12 im Bestand.
- Risiken: Rechtsberatung/Rechtsstand; Beschränkung auf eindeutige Fehler (keine strittigen BGH-Fragen wie Klauselwirksamkeit).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IMM-05 · Memory „Mietvertragsarten und Merkmale"** (Priorität niedrig · Aufwand S)
- Inhalt: Staffelmiete, Indexmiete, Zeitmietvertrag, Gewerbemiete, Inklusivmiete ↔ Kernmerkmal.
- Risiken: Rechtsstand.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Übungswerkzeuge

**W-IMM-01 · Ertragswert-Rechner / -Trainer** (Priorität hoch · Aufwand M)
- Funktion: Eingaben Grundstücksfläche, Bodenrichtwert, Jahresnettokaltmiete (Rohertrag), Bewirtschaftungskosten (Verwaltung, Instandhaltung €/m², Mietausfallwagnis %), Liegenschaftszinssatz, Restnutzungsdauer. Ausgabe: Schritt-für-Schritt-Schema (Rohertrag → Reinertrag → Bodenwertverzinsung → Gebäudereinertrag → × Barwertfaktor → + Bodenwert = Ertragswert); Übungsmodus mit Zufallsaufgabe und Zeilenprüfung (analog Netzplan-Trainer), alles im Browser, ohne Speicherung.
- Nutzen: Kernrechenverfahren für Bewertungs- und Maklergespräche; Prüfungsgegenstand „Immobilienbewertung/Wirtschaftlichkeitsberechnung".
- Passung/Beleg: ImmoFachwPrV § 4; ImmoWertV §§ 31, 32. Content: Ertragswert 4 Dateien, Liegenschaftszins 3, Rohertrag 3.
- Risiken: **Fachrichtigkeit** (nur vereinfachtes Lehrschema, kein Gutachten); Beispielwerte statt realer Marktdaten; Bodenwertverzinsung mit Restnutzungsdauer- und Zinsformeln sorgfältig testen (Fachprüfung der Rechenkerne).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-IMM-02 · Sachwert- und Vergleichswert-Rechner** (Priorität mittel · Aufwand M, teilt Rechenkern mit W-IMM-01)
- Funktion: Sachwert aus Normalherstellungskosten × Fläche × Baupreisindex, Alterswertminderung (linear Alter/Gesamtnutzungsdauer), Außenanlagen, Bodenwert, Sachwertfaktor; Vergleichswert aus Vergleichspreisen mit Zu-/Abschlägen. Als zweiter und dritter Reiter einer „Wertermittlungs-Werkstatt".
- Beleg: ImmoWertV Sachwert-/Vergleichswertverfahren (Anwendungshinweise); Bestandsitem Q-6.3-09 (Hierarchie Sachwert).
- Risiken: Detailparameter (Sachwertfaktor, Regionalfaktoren) **unsicher**, nur Beispielwerte; Rechtsstand ImmoWertV.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-IMM-03 · Renditeprüfer (Kaufnebenkosten, Mietrendite, Annuität)** (Priorität hoch · Aufwand M, teilt Kern mit W-KF-01)
- Funktion: Eingaben Kaufpreis, Grunderwerbsteuersatz (frei einstellbar), Notar/Grundbuch %, Provision %, Jahreskaltmiete, laufende Kosten, Darlehen/Zins/Tilgung. Ausgabe: Gesamtinvestition, Kaufpreisfaktor, Brutto-/Nettomietrendite, Annuität, Restschuld nach Zinsbindung, jährlicher Cashflow.
- Nutzen: Investitions- und Finanzierungsrechnung (HB2 2.2), Projektentwicklung, Kundenberatung zu Kapitalanlagen.
- Passung/Beleg: Sparkasse (Kaufnebenkosten, Mietrendite), von-poll.com (Kaufpreisfaktor), § 656c BGB.
- Risiken: **Keine Anlageberatung** – Ergebnisse als Rechenbeispiel, ohne Empfehlung; Nettomietrendite-Definitionen variieren (Nebenkosten im Nenner) → im Werkzeug offenlegen; Steuer ausblenden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-IMM-04 · Betriebskostenabrechnungs-Trainer** (Priorität hoch · Aufwand M)
- Funktion: Gesamtkosten je Kostenart, Umlageschlüssel (m², Personen, Einheiten, Verbrauch), Vorauszahlungen, Leerstand, Mieterwechsel unterjährig (Zeitanteil), Ergebnis Nachzahlung/Guthaben je Mieter; Fristenprüfung (Abrechnungszeitraum 12 Monate, Zugang binnen 12 Monaten nach Ende). Übungsmodus mit Zufallsdaten und Zeilenprüfung.
- Nutzen: HB4 4.4; Alltag der Verwaltung.
- Passung/Beleg: § 556 BGB, BetrKV; bmgev.de, nebenkosten-assistent.de. Heizkostenverordnung (Verbrauchsanteil 50–70 %): **Fachwissen, Quelle nachtragen, unsicher**.
- Risiken: Rechtsstand; Heizkosten vereinfachen oder weglassen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Netzplan-Trainer bleibt wie heute.)

### Glossar (G-IMM-01 · Priorität hoch · Aufwand M)
- Umfang: ca. 140–170 Einträge; Schwerpunkte HB4 (Mietverwaltung, WEG: Sondereigentum, Teilungserklärung, GdWE, Wirtschaftsplan, Erhaltungsrücklage, Verwaltungsbeirat, Betriebskosten, Umlageschlüssel), HB6 (Maklervertrag, Provision, Bestellerprinzip, Nachweis-/Vermittlungsmakler, § 34c GewO, Alleinauftrag, Bodenrichtwert, Liegenschaftszins), HB2 (Kapitalwert, interner Zins, Annuität, Beleihungswert), HB5 (Projektentwicklung, DIN 276, HOAI, Baulast, Bauvoranfrage), HB1 (GEG, Energieausweis, ESG).
- Risiken: Rechtsbegriffe → alle Einträge Prüfstatus „nein" bis Fachprüfung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Geführte Lernpfade

**L-IMM-01 · Ertragswert eines Mehrfamilienhauses der Ravelin** (Priorität hoch · Aufwand L)
- Instrument: I-IMM-02 plus W-IMM-01 als Praxisstation; Fallbeispiel Ravelin Immobilien GmbH. Stationen nach Blaupause: Grundlagen, Schema erkennen, Bewirtschaftungskosten zuordnen, Zuordnen vertiefen, Maßnahmen/Plausibilisierung, Zusammenhänge, Ablauf sortieren.
- Risiken: Rechenstationen brauchen Kurzantwort-/Zahlenfragen (Quiz-Typ Kurzantwort/Lückentext vorhanden); Premium-Funktion.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-IMM-02 · Betriebskostenabrechnung der WEG „Am Lindenpark" / eines Ravelin-Mietobjekts** (Priorität mittel · Aufwand M–L)
- Instrument: I-IMM-04 mit Fristen (Bestandsitem Q-4.4-12) und W-IMM-04.
- Risiken: Rechtsstand; hängt von I-IMM-04.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Prüfungs-Rahmen

**P-IMM-01 · Prüfungsablauf und Prüfungsbereiche** (Priorität hoch · Aufwand S)
- Inhalt: `pruefungsablauf` (6 Bereiche mit Minuten, Gesamtzeit 600–660, anwendungsbezogene Aufgaben, Zulassung zur mündlichen Prüfung nur bei mindestens „ausreichend", Präsentation ≤10, Fachgespräch ≤20 doppelt gewichtet); `pruefungsbereiche` (HB1–HB6 mit 60/90/120/120/120/120 Min., direkt auf die Fachgebiete HB1–HB6 abbildbar); `presentationMinutes` 10 (entspricht dem Standard).
- Prüfungsangst-Hilfe: Hinweis auf mehrtägigen schriftlichen Teil (lange Gesamtzeit): Pausen-, Energie-, Tagesplan; Präsentationsthema aus allen Bereichen frei wählbar (Entlastung).
- Beleg: ImmoFachwPrV § 3, IHK Köln.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

# C. Versicherungen/Finanzanlagen (`versicherungen-finanzanlagen`)

## C.1 Prüfungsrahmen

**Abschluss laut Repo und Quellen:** „Bachelor Professional in Versicherungen und Finanzanlagen (IHK)" nach der **BAProVFFPrV** (Nachfolge des „Fachwirt für Versicherungen und Finanzen", VersFachwPrV 2008; DQR 6). Es handelt sich **nicht** um Versicherungsfachmann/-frau (Sachkunde), **nicht** um Finanzanlagenfachmann/-frau nach § 34f GewO. Der Kursordner folgt den vier Handlungsbereichen KB1, KB2, KP1, KP2; Modellunternehmen im Content: **Nordantis Versicherung AG**; fiktiver Gewerbekunde u. a. „Katz Fensterbau GmbH".

**Widerspruch in den Quellen (bitte klären):** Die Suchtreffer nennen Veröffentlichung am 26.11.2024 bzw. Inkrafttreten zum 01.01.2025; der Anforderungskatalog nennt als Datum der Verordnung den 03.12.2024. Das Datum im Verordnungskopf auf gesetze-im-internet.de prüfen.

| Teil | Inhalt | Dauer | Beleg |
|---|---|---|---|
| Prüfungsteil 1 „Kundenbedarfsfelder" (30 % der Gesamtnote) | schriftlich; **Wahlbereich**: „Lösungen im Kundenbedarfsfeld Vorsorge" (§ 6: Risikoanalyse, Bedarfsermittlung, Kranken-/Pflege-/Unfall-/Alters-/Arbeitskraftvorsorge, **Finanzanlagen**, Recht, Nachhaltigkeit, Digitalisierung, Schaden-/Leistungsfall) **oder** „Lösungen für Gewerbekunden im Kundenbedarfsfeld Sach- und Vermögensschutz" (§ 7) | 270 Min. | BAProVFFPrV §§ 4, 6, 7, 11, 15 |
| Prüfungsteil 2 „Kernprozesse, Steuerung und Zusammenarbeit" (70 %) | schriftlich: „Kernprozesse gestalten" (Kunden-, Produkt-, Schaden-/Leistungsmanagement, § 8) und „Steuerung, Zusammenarbeit und Leadership" (§ 9: Unternehmenssteuerung, Vertrieb, Controlling, Führung, Personalplanung/-entwicklung, Projektmanagement, Berufsausbildung) | 300 Min. | §§ 5, 8, 9, 12 |
| Praxisbezogene Prüfung (60 % von Teil 2) | **Praxistransferarbeit** (4–6 Seiten, 25 %), **Präsentation** (höchstens **20** Min., 25 %), **Fachgespräch** (höchstens **30** Min., 50 %) | 20 + 30 Min. | § 13, § 15 |

Weitere Besonderheiten:
- Bestehen: laut IHK Schleswig-Holstein in **jeder** Prüfungsleistung mindestens 50 Punkte ohne Rundung (kein Ausgleich zwischen Teilen). Für das Prüfungsangst-Konzept wichtig: jede Leistung zählt einzeln.
- Zulassung u. a. mit Abschluss Kaufmann/-frau für Versicherungen und Finanzanlagen, Sachkundeprüfung Versicherungsvermittlung plus 2 Jahre Praxis, oder 5 Jahre Berufspraxis (§ 2 laut Abruf).
- Prüfungsaufgaben: Fallbezug und Handlungsorientierung; die DIHK-Seite verweist auf Hilfsmittellisten und Prüfungsinformationen als PDF (nicht ausgewertet).

## C.2 Bestandsbewertung (heute zugeordnet)

Technischer Befund: `werkzeuge: ["netzplan"]`; keine Spiele, kein Glossar, kein Lernpfad, kein Prüfungsablauf; kein Projekt-Reiter (Praxistransferarbeit-Hilfe fehlt); `presentationMinutes` fehlt (Standard 10 statt 20). 13 Instrument-Items.

| Eintrag | Art | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT-Matrix, Ansoff-Matrix | Instrumente (0 Items) | **passt, ohne Content** | Produkt-/Vertriebssteuerung (§ 8/§ 9) könnten sie nutzen; derzeit keine Items. Nicht vorrangig. |
| Balanced Scorecard | Instrument (1 Item: 4.1) | **passt** | Unternehmenssteuerung/Controlling (§ 9); Q-4.1-03. |
| Gantt-Diagramm | Instrument (3 Items) | **passt bedingt** | Q-2.4-11 (Haftzeit der Betriebsunterbrechungsversicherung) und Q-4.3-04 (Projekt) sind echte Zeitbezüge; Q-3.1-11 (Produktentwicklungsphasen) ist eine Phasenzuordnung. Bezeichnung „Gantt" unscharf. |
| Eisenhower-Matrix | Instrument (1 Item: 4.2) | **passt** | Führungsaufgaben (§ 9); Q-4.2-03. |
| PDCA-Zyklus | Instrument (1 Item: 3.3) | **passt** | Schadenmanagement als kontinuierliche Prozessverbesserung; Q-3.3-03. |
| Risikomatrix | Instrument (4 Items) | **passt bedingt** | Fachlich zentral (Risikoanalyse § 6/§ 7). Q-2.5-11 (Katz Fensterbau) nutzt Wahrscheinlichkeit/Schadenhöhe richtig. Q-1.3-11 (Unfallrisiko) und Q-3.4-03 (Betrugsverdacht) ordnen Maßnahmen zu, ohne Wahrscheinlichkeit/Auswirkung zu nennen; Q-3.4-03 (Betrugsprüfung) ist sachlich heikel (Verdachtsstufen vs. Einzelfall). Zonen- und Item-Text angleichen. |
| Projektstrukturplan/Organigramm | Instrument (3 Items) | **passt** | Drei-Schichten-Modell (Q-1.4-10), Vertriebswege Ausschließlichkeit/Makler (Q-3.2-11), Projektstruktur (Q-4.3-05). |
| Netzplan-Trainer | Werkzeug | **passt** | Projektmanagement ist Prüfungsgegenstand (§ 9); Content: „Netzplan" 2 Dateien, „Meilenstein" 2, „Projektstrukturplan" 2. |
| Schutzziele der IT-Sicherheit | Instrument | **unsicher** | Nur sinnvoll, wenn Cyber-/Datenschutzthemen (Content: „Cyber" 6 Dateien, „Datenschutz" 2) mit Content hinterlegt werden; sonst ausblenden. |
| OSI, SQL, Scrum, UML, Teststufen, ER-Modell, Normalformen, Struktogramm; 5 IT-Werkzeuge | Instrumente/Werkzeuge | **passt nicht** | Keine Berührung mit dem Versicherungs-Rahmenplan. Ausblenden. |
| Kreuzworträtsel, Begriffe-Duell, Memory | Spieltypen | **passt (Mechanik)** | Noch kein Content. |
| Phishing-Detektiv | Spieltyp | **unsicher** | Nur falls Datenschutz/Cyber behandelt wird; Content „Phishing" 1 Datei. |
| Bug-Hunt, Code-Reihenfolge, Troubleshooting, Subnetting-Sprint, Zahlensystem-Sprint | Spieltypen | **passt nicht** | IT-Inhalte. |

**Inhaltliche Lücken im Content, die Vorschläge beeinflussen** (Trefferzahlen = Zahl Dateien im Kursordner): Finanzanlagen (Rendite 0, Anleihe 0, Zertifikat 0, Magisches Dreieck 0, Geeignetheit 0, Fonds 2), Nachhaltigkeit 0 (in § 6 und § 7 genannt), IDD 1, Beratungsprotokoll 1, Hausrat 1, Kfz 1, Rechtsschutz 1, Risikoausgleich/Gesetz der großen Zahl 0, Solvabilität 0, Gesetz § 75 VVG 0 (aber „Unterversicherung" 6 Dateien).

## C.3 Neue Vorschläge

### Instrumente

**I-VER-01 · Drei-Schichten-Modell der Altersvorsorge** (Priorität hoch · Aufwand S)
- Aufbau: Zonen-Zuordnung, 3 Felder: Basisversorgung, Zusatzversorgung, private Vorsorge. Begriffe: gesetzliche Rente, Basisrente, bAV (Durchführungswege), Riester, Kapitallebensversicherung, fondsgebundene Rentenversicherung, Fondssparplan.
- Nutzen: KB1 1.4; Wahlbereich Vorsorge (§ 6). Heute nur als Hierarchie (Q-1.4-10) vorhanden; die Zonenvariante gibt eine eigene Kachel im Werkzeugkasten.
- Passung/Beleg: Theorie in `kb1/1.4-altersvorsorge.md`; BAProVFFPrV § 6.
- Risiken: **Rechtsstand** (Reformvorhaben zur privaten Altersvorsorge sind mir nicht verlässlich bekannt: **unsicher**, vor Livegang prüfen); keine Anlageberatung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-02 · Versicherungszweige: Personen-, Sach-, Haftpflicht-/Vermögensschadenversicherung** (Priorität hoch · Aufwand S)
- Aufbau: 3 Zonen (ggf. 4 mit Rechtsschutz). Begriffe: BU, PKV, Pflege, Unfall; Gebäude-/Inhalt-/Maschinen-/Betriebsunterbrechungsversicherung; Betriebs-, Berufs-, Vermögensschaden-Haftpflicht. Spiegelt die Wahlbereiche KB1 (Personen) und KB2 (Sach/Vermögen).
- Nutzen: Orientierung für Wahlbereich; Grundlage des Beratungsgesprächs.
- Passung/Beleg: BAProVFFPrV §§ 6, 7; Content kb1/kb2.
- Risiken: Systematik nach VAG-Sparten vs. Praxis; hier vereinfachte Lerngliederung kenntlich machen; **unsicher**, ob die Prüfung eine bestimmte Systematik erwartet.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-03 · Beratungsprozess (Ablauf) nach VVG** (Priorität hoch · Aufwand M, braucht I-KF-02)
- Aufbau: Ablauf-Zuordnung: Kontakt/Erstgespräch → Wünsche und Bedürfnisse erfragen → Risikoanalyse → Beratung und Begründung → Angebot/Antrag → Dokumentation → Betreuung/Nachbetreuung.
- Nutzen: KP1 3.2 (Kundenmanagement); Praxis und Haftung.
- Passung/Beleg: VVG § 6 und § 61/§ 62 (Befragung, Beratung, Begründung, Dokumentation; Verzicht nur separat schriftlich); IHK Magdeburg-Merkblatt; Content: „Beratungsprotokoll" 1 Datei, „IDD" 1 → Ausbau der Theorie nötig.
- Risiken: **Rechtsberatung/Rechtsstand** (VVG-Änderungen); keine Aussage, was im Einzelfall „ausreichende Beratung" ist.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-04 · Risikopolitik: vermeiden, vermindern, überwälzen, selbst tragen** (Priorität hoch · Aufwand S)
- Aufbau: 4 Zonen; Begriffe: Maßnahmen bei Gewerbekunden (Brandschutz-Investition, Versicherung, Selbstbehalt, Verzicht auf riskante Tätigkeit). Ergänzt/ersetzt die Item-Unschärfe der heutigen Risikomatrix.
- Nutzen: Risikoanalyse Gewerbekunden (KB2 2.5), § 7 BAProVFFPrV.
- Passung: Content: Q-2.5-11 (Katz Fensterbau) und Q-1.3-11 verwenden schon diese vier Maßnahmen (vermeiden/absichern/beobachten/akzeptieren) – andere Begriffe als das Standard-Modell. **Frage F6:** Standardbegriffe einführen oder bestehende Zonen behalten?
- Beleg: Fachwissen, Quelle nachtragen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-05 · Kennzahlen der Versicherungstechnik (Schadenquote, Kostenquote, Combined Ratio)** (Priorität mittel · Aufwand S)
- Aufbau: 3 Zonen (Schadenquote, Kostenquote, Combined Ratio); Begriffe: Schadenaufwendungen, Abschlusskosten, Verwaltungskosten, verdiente Beiträge, Summe aus beiden → Quote.
- Nutzen: KP2 4.1 Controlling; Content: Combined Ratio 5 Dateien, Schadenquote 3.
- Beleg: cometis „100 Versicherungskennzahlen" (Leseprobe), binversichert.de/Combined Ratio.
- Risiken: brutto/netto-Varianten der Quote; eine Variante festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-06 · Leistungsprüfung im Schadenfall (Prüfschritte)** (Priorität mittel · Aufwand S–M, braucht I-KF-02)
- Aufbau: Ablauf: Schadenmeldung → Deckungsprüfung (Vertrag, Versicherungsfall) → Schadenfeststellung → Leistungsentscheidung → Regulierung/Zahlung → Regress. Zonen/Stufen als Reihenfolge-Aufgabe.
- Nutzen: Schaden-/Leistungsmanagement (KP1 3.3/3.4).
- Passung: Content: Regress 3 Dateien, Leistungsprüfung 2, Obliegenheit 1, Betrug 5; Obliegenheit/Leistungsfreiheit ausbauen.
- Risiken: Rechtsstand VVG (Obliegenheiten §§ 28 ff.): **Fachwissen, Quelle nachtragen**.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-07 · Magisches Dreieck bzw. Viereck der Kapitalanlage** (bedingt; siehe I-KF-01) (Priorität mittel, **nur wenn Finanzanlagen-Content entsteht** · Aufwand S)
- Aufbau: Zonen Rendite, Sicherheit, Liquidität (+ Nachhaltigkeit); Begriffe: Anlageformen/Aussagen.
- Passung: § 6 „Finanzanlagen", „Nachhaltigkeit"; Content-Lücke (0 Treffer).
- Risiken: **keine Anlageberatung**; Begriffe nicht als Produktempfehlung darstellen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-VER-08 · Vorsorge-Bedarfsstufen (Existenz – Lebensstandard – Komfort)** (Priorität niedrig · Aufwand S)
- Aufbau: 3 Zonen; Begriffe: Risiken/Absicherungen (Berufsunfähigkeit, Privathaftpflicht, Zahnzusatz …). Vorbild: Bedarfsstufen der Basis-Finanzanalyse nach DIN 77230 (Suchtreffer finanzfluss.de).
- Risiken: **Fachliche Streitfrage** („was ist existenzbedrohend?") und Beratungsnähe; DIN-Norm geschützt → nur Begriffe. **Unsicher**; nur mit Fachperson umsetzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Spiele

**S-VER-01 · Kreuzworträtsel „Versicherungsfachbegriffe"** (Priorität hoch · Aufwand S)
- Inhalt: Obliegenheit, Selbstbeteiligung, Unterversicherung, Haftzeit, Regress, Gefahrerhöhung, Karenzzeit, Police, Versicherungsnehmer, Prämie (Begriffe überwiegend im Content: Anzeigepflicht 4, Haftzeit 4, Selbstbeteiligung 2).
- Risiken: Hinweise juristisch eindeutig formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-VER-02 · Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich"** (Priorität hoch · Aufwand S)
- Inhalt: Versicherungsnehmer vs. versicherte Person; Neuwert vs. Zeitwert; Obliegenheit vs. Anzeigepflicht; Netto- vs. Bruttoprämie; Berufsunfähigkeit vs. Erwerbsminderung; Betriebs- vs. Berufshaftpflicht; Sach- vs. Vermögensschaden; Basisrente vs. Riester.
- Risiken: Rechtsstand; nur eindeutig abgrenzbare Paare.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-VER-03 · Versicherungs-Rechensprint** (Priorität mittel · Aufwand M als Teil von S-KF-01)
- Aufgabenpaket: Unterversicherung (Entschädigung = Schaden × Versicherungssumme / Versicherungswert), Selbstbehalt, Schadenquote, Kostenquote, Combined Ratio, Prämie aus Risikoprämie plus Zuschlägen.
- Beleg: § 75 VVG (lxgesetze.de, haufe.de), cometis Kennzahlen.
- Risiken: Reihenfolge Selbstbehalt/Kürzung nach Bedingungen unterschiedlich → in der Aufgabe fest vorgeben; **Fachprüfung**.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-VER-04 · Fall-Detektiv „Schadenmeldung prüfen"** (Priorität mittel · Aufwand M als Teil von S-KF-02)
- Spieltyp: wie Phishing-Detektiv: Schadenmeldung/Leistungsantrag mit Auffälligkeiten (Schadendatum nach Vertragsende, unvollständige Angaben, Rechnung ohne Datum, Summe über Versicherungswert); Entscheidung „regulieren / nachfordern / prüfen lassen".
- Nutzen: Schaden-/Leistungsmanagement (KP1 3.3/3.4); Content: „Betrug" 5 Dateien.
- Risiken: **Betrugsverdacht und Diskriminierung** – nur formale Plausibilitätsmerkmale, keine Personenmerkmale; Hinweis „Lernszenario".
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-VER-05 · Memory „Schicht und Produkt" / „Sparte und Schutzzweck"** (Priorität niedrig · Aufwand S)
- Inhalt: Produkt ↔ Schicht des Altersvorsorge-Modells, oder Versicherungszweig ↔ Absicherungszweck.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Übungswerkzeuge

**W-VER-01 · Bedarfs- und Deckungslücken-Rechner** (Priorität hoch · Aufwand M)
- Funktion: Eingaben Nettoeinkommen, laufende Ausgaben, bestehende Leistungen (z. B. Erwerbsminderungsrente aus der Renteninformation, bAV, vorhandene BU), Ersatzquote (frei einstellbar, keine Voreinstellung als Empfehlung). Ausgabe: Lücke je Risiko (Berufsunfähigkeit, Tod, Pflege, Alter) als Differenz Bedarf minus Leistung; grafische Gegenüberstellung. Übungsmodus mit vorgegebenen Fallprofilen.
- Nutzen: Bedarfsermittlung ist Kernprüfungsgegenstand von § 6; Alltag der Beratung.
- Passung/Beleg: Formel „benötigtes Einkommen minus erwartete Leistungen = Lücke" (lv1871.de/Versorgungslücke, finanzfluss.de/BU-Rechner); Bedarfsstufen aus der Basis-Finanzanalyse nach DIN 77230 (Suchtreffer).
- Risiken: **Keine Beratung/Empfehlung:** Prozentwerte (z. B. 70–90 % Einkommen) nur als Rechenbeispiel, nicht als Norm; **keine Eingabe realer Daten speichern** (Gesundheits-/Finanzdaten, DSGVO) – reine Browserlogik; Hinweis „Lernwerkzeug".
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-VER-02 · Unterversicherungs- und Versicherungssummen-Rechner** (Priorität hoch · Aufwand S)
- Funktion: Eingaben Versicherungswert, Versicherungssumme, Schadenhöhe, Selbstbehalt, Optionen „Unterversicherungsverzicht" und „Versicherung auf erstes Risiko". Ausgabe: Entschädigung, Eigenanteil, Unterversicherungsgrad; Übungsmodus mit Zufallsfällen. Optional Wohnflächenmodell (Beispielwert je m² einstellbar).
- Nutzen: Sachversicherung (KB2 2.1; Wohngebäude/Inhalt), Praxis: Summenermittlung.
- Passung/Beleg: § 75 VVG; Beispiel Haus 400.000 € / 300.000 € versichert / 100.000 € Schaden → 75.000 € (juraforum.de/haufe.de).
- Risiken: Verfahren je Bedingungswerk verschieden (Reihenfolge Selbstbehalt) – vereinfachtes Lehrmodell, Fachprüfung; Quote darf Versicherungssumme nicht übersteigen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-VER-03 · Risikoausgleich-Simulator** (Priorität hoch · Aufwand M)
- Funktion: Zufallssimulation im Browser: n gleichartige Risiken mit Schadenwahrscheinlichkeit p und Schadenhöhe S; Anzeige der Schwankung der Gesamtschadenquote bei steigender Kollektivgröße (Gesetz der großen Zahl), Beitrag (Nettoprämie) und Sicherheitszuschlag.
- Nutzen: Versicherungsprinzipien/Prämienkalkulation (KP1 3.1 Produktmanagement; „versicherungstechnische Grundlagen" in § 8). Content: „Nettoprämie/Bruttoprämie" 3 Dateien, „Risikoausgleich" 0.
- Beleg: § 8 BAProVFFPrV (versicherungstechnische Grundlagen); Kennzahlen cometis. Simulation selbst: Fachwissen.
- Risiken: Vereinfachung klar benennen (unabhängige, gleichartige Risiken); keine Prognose.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-VER-04 · Quoten- und Prämienrechner** (Priorität mittel · Aufwand S)
- Funktion: Eingaben Schadenaufwand, verdiente Beiträge, Abschluss- und Verwaltungskosten; Ausgabe Schadenquote, Kostenquote, Combined Ratio mit Ampel um die 100-%-Marke; Prämie = Risikoprämie + Sicherheits- und Kostenzuschlag.
- Beleg: cometis, binversichert.de. Risiken: brutto/netto-Definitionen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Zusätzlich W-KF-01 Finanzmathe-Kern für Zinseszins und Sparplan zur Altersvorsorge: nur als Rechenbeispiel ohne Renditeversprechen.)

### Glossar (G-VER-01 · Priorität hoch · Aufwand M)
- Umfang: ca. 140–170 Einträge; Schwerpunkte KB1 (Vorsorge: BU, Erwerbsminderung, Pflegegrade, Basisrente, Riester, bAV-Durchführungswege), KB2 (Haftpflicht, Betriebsunterbrechung, Haftzeit, Vermögensschaden), KP1 (Risikoausgleich, Nettoprämie, Schadenquote, Obliegenheit, Regress), KP2 (Combined Ratio, Projektmanagement, Ausbildungsplan).
- Risiken: juristische Definitionen → Prüfstatus „nein" bis Fachprüfung; Versicherungsbegriffe mit Bedingungs-Abhängigkeit kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Geführte Lernpfade

**L-VER-01 · Risikoanalyse für Gewerbekunden: Katz Fensterbau GmbH** (Priorität hoch · Aufwand M)
- Instrument: Risikomatrix (existiert, 4 Items) plus I-VER-04 (Risikopolitik); Fallbeispiel Katz Fensterbau (bereits in Q-2.4-11 und Q-2.5-11 eingeführt), Brand/Betriebsunterbrechung (Haftzeit).
- Nutzen: Wahlbereich Gewerbekunden (§ 7).
- Risiken: Premium-Funktion; Begriffsabgleich mit I-VER-04 (Frage F6).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-VER-02 · Der Beratungsprozess bei Nordantis** (Priorität mittel · Aufwand L)
- Instrument: I-VER-03; Fallbeispiel eines Privatkunden (Familie, Selbstständiger?) mit Bedarfsermittlung (W-VER-01 als Praxisstation).
- Risiken: Rechtsnähe (VVG-Pflichten), Fachprüfung; keine Produktempfehlung in Lösungen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### Prüfungs-Rahmen

**P-VER-01 · Prüfungsablauf, Prüfungsbereiche, Präsentation 20 Minuten** (Priorität hoch · Aufwand S)
- Inhalt: `pruefungsablauf` (Teil 1 270 Min. Wahlbereich, Teil 2 300 Min., praxisbezogene Prüfung, Gewichte 30/70 und 40/60 mit 25/25/50, Bestehensregel 50 Punkte je Leistung), `presentationMinutes: 20` (heute Standard 10 → falsch), `pruefungsbereiche`: Kundenbedarfsfelder (KB1 oder KB2; 270 Min.) und Kernprozesse (KP1+KP2; 300 Min.). Anzeige des Lernstands je Bereich funktioniert über die Fachgebiete.
- Prüfungsangst: Wahlbereich bewusst früh festlegen; „jede Leistung für sich 50 Punkte" nüchtern erklären; Praxistransferarbeit vorab abgegeben, Präsentation und Fachgespräch bauen darauf auf.
- Beleg: BAProVFFPrV §§ 10–15; IHK Schleswig-Holstein.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-VER-02 · Praxistransferarbeit-Hilfe** (Priorität hoch · Aufwand M, Muster: Projekt-Hilfe F-161)
- Inhalt: Reiter „Praxistransferarbeit" mit Gliederungsvorschlag für 4–6 Seiten (Ausgangslage, Problem/Auftrag, Lösungsweg, Ergebnis, Reflexion), Themenwahl-Checkliste (betrieblicher Bezug, Datenschutz/Anonymisierung von Kundendaten), Bewertungsgewichte 25/25/50 (Arbeit/Präsentation/Fachgespräch), Zeitplan; Präsentationstrainer 20 Minuten und Fachgesprächsfragen (`fachgespraech.md` in allen vier Bereichen vorhanden).
- Risiken: Vorgaben je IHK (Abgabefristen) nicht festschreiben; Hinweis auf zuständige IHK.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

# D. Gemeinsames der Kurse und Unterschiede

Damit nichts doppelt gebaut wird. Alle Vorschläge beziehen sich nur auf diese drei Kurse; vor dem Bauen mit den anderen Kursgruppen (Wirtschafts-, Industrie-, Technischer Fachwirt, Büro-, Gesundheits-Fachwirt, Logistik, AdA) abgleichen, da dort derselbe Bedarf entstehen kann.

**S-KF-01 · Rechensprint mit Aufgabenpaketen** (Priorität hoch · Aufwand M einmal, je Paket S)
- `SprintSpiel` in `WeitereSpiele.tsx` bedient heute nur `subnetting` und `zahlensysteme`. Generalisierung zu „Rechensprint" mit austauschbarem Aufgabengenerator: Handel (Kalkulation, Lager), Immobilien (Kaufnebenkosten, Rendite, Betriebskosten, Annuität), Versicherung (Unterversicherung, Quoten). Auch für die anderen Fachwirt-Kurse (Wirtschaft, Industrie, Technik) nutzbar.
- Risiko: Aufgabengeneratoren brauchen Rundungs-/Basisregeln und Fachprüfung der Lösungswege.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-KF-02 · Beleg-/Fall-Detektiv** (Priorität mittel · Aufwand M einmal, je Paket S)
- Engine des Phishing-Detektivs (Dokument zeigen, Auffälligkeiten anklicken, Entscheidung) für beliebige Dokumente: Handel Lieferschein/Rechnung, Immobilien Betriebskostenabrechnung, Versicherung Schadenmeldung. Ein Spieltyp, drei Content-Pakete.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-KF-01 · Finanzmathe-Kern** (Priorität hoch · Aufwand M)
- Gemeinsame Rechenbausteine (rein im Browser): Zinseszins/Aufzinsung, Barwert/Kapitalwert, Annuitätendarlehen mit Tilgungsplan, Skonto-Effektivzins. Nutzer: Immobilien (W-IMM-03, Barwertfaktor in W-IMM-01), Versicherung (Sparrate/Altersvorsorge-Beispiel), Handel (Skonto, Investitionsbewertung WB2 6.2). Auch für Wirtschafts-/Industriefachwirt (Finanzierung, Investition) nutzbar.
- Risiko: Anlageberatung vermeiden (Beispielzinssätze, keine Prognose).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-KF-01 · Magisches Dreieck/Viereck der Kapitalanlage** (Priorität mittel · Aufwand S)
- Zonen Rendite, Sicherheit, Liquidität (+ Nachhaltigkeit). Immobilien: Kapitalanlage Immobilie (Investition, Finanzierung HB2 2.2); Versicherung: Finanzanlagen (nur wenn Content ergänzt, siehe F1). Möglicherweise auch Wirtschafts-/Industriefachwirt (Finanzierung).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-KF-02 · Neutrale Prozesskette (Ablauf-Zuordnung)** (Priorität mittel · Aufwand M)
- Das vorhandene Instrument „Struktogramm und Programmablauf" (Sequenz/Verzweigung/Schleife) ist IT-spezifisch. Gebraucht wird ein neutrales Instrument „Prozessschritte in Reihenfolge/Phase zuordnen" (auch als Umbenennung/Neufassung der „Gantt"-Phasenaufgaben). Content-Pakete: Handel Category-Management (8 Stufen), Wareneingang; Immobilien Vermietungsprozess, Bauablauf; Versicherung Beratungs- und Schadenprozess.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-KF-01 · Prüfungs-Rahmen für alle drei Kurse befüllen** (Priorität hoch · Aufwand S)
- `kurs.metadata` ergänzen: `pruefungsablauf` (Stichpunkte), `pruefungsbereiche` (mit Minuten und Fachgebietscodes), `presentationMinutes` (Handel 15, Immobilien 10, Versicherung 20). Das Muster `fachinformatikMetadata(...)` in `import-content.ts` zeigt die Struktur. Zusätzlich P-VER-02 (Praxistransfer) nur für Versicherung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**G-KF-01 · Gemeinsamer Glossar-Grundstock für Fachwirt-Kurse** (Priorität mittel · Aufwand M)
- Viele Begriffe sind in allen Fachwirt-Kursen identisch (Controlling, BSC, Deckungsbeitrag, Risikomanagement, Führungsstile, Mitarbeitergespräch, Ausbildung/AEVO, Projektmanagement, Finanzierungsarten). Vorschlag: ca. 40–60 Grundbegriffe einmal schreiben und prüfen, je Kurs referenzieren, dazu kursspezifische Einträge (Handel/Immobilien/Versicherung je ca. 100–120). Ablauf wie bei den Fachinformatikern: Entwurf, Prüfblatt für die Fachperson, Prüfstatus „ja" erst nach Prüfung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-KF-01 · Lernpfade: bestehenden BSC-Pfad oder Branchenvarianten** (Priorität mittel · Aufwand S oder M)
- Die README der Instrumenten-Lernpfade beschreibt den branchenneutralen BSC-Pfad (Nordstern GmbH) als „für alle Fachwirte" gedacht, aktiv ist er nur im Büro-Fachwirt-Kurs. Günstigste Variante: für die drei Kurse freischalten (S); teurere Variante: Branchenfassungen (Loreno, Ravelin, Nordantis; M je Kurs). Siehe Frage F5.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Querschnittsmaßnahme · Unpassendes ausblenden** (Priorität hoch · Aufwand S–M)
- Der Werkzeugkasten zeigt heute jedes Katalog-Element, das im Kurs keinen Content hat, im eingeklappten Bereich „Weitere Instrumente"; Entscheidung des Produktinhabers: nicht Passendes **ausblenden**. Dafür braucht der Katalog (`INSTRUMENT_CATALOG` in `Instrumente.tsx`, `GAME_CATALOG` in `Spiele.tsx`) eine Zuordnung „für Kursgruppe X sichtbar" (nicht nur Content-Vorhandensein). Technische Umsetzung nicht Teil dieser Vorlage.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

## Unterschiede zwischen den drei Kursen

| Thema | Handelsfachwirt | Immobilienfachwirt | Versicherungen/Finanzanlagen |
|---|---|---|---|
| Fachliche Mitte | Waren- und Zahlenfluss (Kalkulation, Lager, Sortiment) | Recht plus Bewertung plus Rechnen (Miete, WEG, Wert) | Beratung/Bedarf plus Prinzipien (Risikoausgleich, Prämie) plus Prozesse |
| Typische Rechenaufgaben | Handelskalkulation, Lagerkennzahlen, Deckungsbeitrag | Ertragswert, Rendite, Kaufnebenkosten, Betriebskosten, Annuität | Unterversicherung, Deckungslücke, Quoten, Prämie |
| Mündliche/Praxisprüfung | Präsentation 15 + Fachgespräch ≤20 | Präsentation ≤10 + Fachgespräch ≤20 | Praxistransferarbeit 4–6 S. + Präsentation ≤20 + Fachgespräch ≤30 |
| Wahlbereiche | 1 von 4 (Vertrieb, Logistik, Einkauf, Außenhandel) | keine | 1 von 2 (Vorsorge oder Gewerbekunden) |
| Haupt-Rechtsrisiko für Lernwerkzeuge | gering (HGB, Kalkulation neutral) | **hoch** (Mietrecht, WEG, ImmoWertV ändern sich) | **hoch** (VVG, IDD, Anlageberatung) |
| Content-Lücke | Handelskalkulation | Kaufnebenkosten/Finanzierung | Finanzanlagen, Nachhaltigkeit, Risikoausgleich |

---

# E. Offene Fragen an den Produktinhaber

- **F1 – Finanzanlagen im Versicherungskurs:** § 6 BAProVFFPrV nennt Finanzanlagen und Nachhaltigkeit, der Content behandelt sie kaum. Sollen neue Themen (Finanzanlagen-Grundlagen, Nachhaltigkeit, Geeignetheit/Beratungsdokumentation) ergänzt werden, bevor I-VER-07/I-KF-01 und Anlage-Spiele entstehen? Soll der Kurs weiterhin ausdrücklich **nicht** auf § 34f GewO ausgerichtet sein?
- **F2 – Datum der BAProVFFPrV:** 26.11.2024 (Suchtreffer) oder 03.12.2024 (Anforderungskatalog)? Bitte am Verordnungskopf klären.
- **F3 – Handelskalkulation:** Soll vor W-HAN-01 ein Theorie-Thema „Handelskalkulation und Kosten-/Leistungsrechnung" in HB1 ergänzt werden (derzeit keine Treffer zu Bezugskalkulation/Kalkulationszuschlag)? Gleiche Frage für „Kaufnebenkosten" im Immobilienkurs.
- **F4 – Wer prüft fachlich?** Rechenkerne und Rechtsinhalte (Mietrecht, WEG, VVG, ImmoWertV, Altersvorsorge) brauchen eine Fachperson mit Freigabe je Kurs. Gibt es sie, oder soll jeder Entwurf als „ungeprüft" gekennzeichnet bleiben?
- **F5 – Lernpfade:** Bestehenden BSC-Pfad „Nordstern" für die drei Kurse freischalten oder eigene Pfade (L-HAN-01/02, L-IMM-01/02, L-VER-01/02)? Lernpfade sind kostenpflichtig (F-130) – lohnt der Aufwand je Kurs?
- **F6 – Risikobegriffe:** Standardbegriffe der Risikopolitik (vermeiden, vermindern, überwälzen, selbst tragen) einführen oder die heutigen Risikomatrix-Zonen (vermeiden, absichern, beobachten, akzeptieren) beibehalten?
- **F7 – Bezeichnung „Gantt":** Phasen-Zuordnungen (z. B. Logistikkette, Produktentwicklung, Vermarktung) sind kein Gantt-Diagramm. Umbenennen in „Phasen-/Ablaufplan" (siehe I-KF-02) oder Items austauschen?
- **F8 – Zonenobergrenze:** Soll sie von 7 auf 9 steigen (ABC/XYZ, HOAI-Leistungsphasen), oder bleiben wir bei Varianten mit ≤7 Zonen?
- **F9 – Hinweistext bei Rechnern:** Einheitlicher Satz „Lernwerkzeug mit Beispielwerten, keine Beratung, kein Gutachten, keine Rechtsberatung" für alle Finanz-/Immobilien-/Versicherungswerkzeuge? Nichts speichern, keine Eingabe sensibler Realdaten.
- **F10 – Beispielwerte statt Marktdaten:** Grunderwerbsteuersätze, Liegenschaftszinsen, Kappungsgrenzen usw. nur als Aufgabenparameter vorgeben (Empfehlung) oder pflegen wir tagesaktuelle Tabellen?
- **F11 – Präsentationsdauer im Prüfungstrainer:** Soll die Standarddauer (heute 10) für Handel auf 15 und Versicherung auf 20 gesetzt werden (nur Metadaten), unabhängig vom Rest?
- **F12 – Mündlich ohne schriftlich bestanden?** Bei Handelsfachwirt widersprechen sich Aussagen (IHK NW: unabhängig; Immobilien: Zulassung nur bei mindestens ausreichend). Wir würden den Verordnungstext prüfen, bevor es im Prüfungs-Rahmen steht.
- **F13 – Umfang Wahlbereiche:** Bei Handel und Versicherung sind Wahlbereiche voll ausgearbeitet; sollen Instrumente/Spiele zuerst für Pflichtbereiche entstehen (Empfehlung) und Wahlbereiche später folgen?

---

# F. Quellen

**Verordnungen und Prüfungsrahmen**
- BAProVFFPrV, Prüfungsstruktur: https://www.gesetze-im-internet.de/baprovffprv/BJNR17A0A0024.html
- IHK Schleswig-Holstein, Bachelor Professional in Versicherungen und Finanzanlagen: https://www.ihk.de/schleswig-holstein/bildung/weiterbildung/fortbildungspruefungen-az/bachelor-professional-in-versicherungen-und-finanzanlagen-6778466
- DIHK-Bildungs-GmbH, Prüfungsseite: https://www.dihk-bildungs-gmbh.de/pruefungen/ihk-pruefungen/bachelor-professional-in-versicherungen-und-finanzanlagen
- BIBB-Berufesuche (nur in Suchtreffern gesehen, nicht abgerufen): https://www.bibb.de/dienst/berufesuche/de/index_berufesuche.php/profile/advanced_training/fwvfi25
- HdlFachwPrV: https://www.gesetze-im-internet.de/hdlfachwprv/BJNR052700014.html
- IHK Nord Westfalen, Handelsfachwirt: https://www.ihk.de/nordwestfalen/bildung/fortbildungspruefungen/a-z/handelsfachwirt-3590434
- ImmoFachwPrV: https://www.gesetze-im-internet.de/immofachwprv/BJNR011700008.html
- IHK Köln, Immobilienfachwirt: https://www.ihk.de/koeln/hauptnavigation/weiterbildung/fortbildungspruefungen/immobilienfachwirt-5138008
- IHK Koblenz Merkblatt Präsentation/Fachgespräch Immobilienfachwirt (PDF, nicht auswertbar): https://www.ihk.de/blueprint/servlet/resource/blob/5462364/81fdb85ae1940197da94d2faab8a16ad/merkblatt-praesentation-fachgespraech-immobilienfachwirt-data.pdf

**Handel**
- Handelskalkulation: https://www.wirtschaftswissen.de/finanzen-steuern/controlling/handelskalkulation/ · https://studyflix.de/wirtschaft/handelskalkulation-1470
- Lagerkennzahlen: https://studyflix.de/wirtschaft/lagerkennzahlen-1620 · Formelsammlung: https://www.handelsfachwirt-pro.de/blog/handelsfachwirt-formelsammlung/ · Andler-Formel: https://trainingsmanufaktur.de/lexikon/andler-formel/
- ABC/XYZ: https://www.uni-due.de/imperia/md/content/tul/download/de_lm01_vo_abc_xyz_analyse_einfuehrung.pdf
- Kraljic-Matrix: https://welt-der-bwl.de/Kraljic-Matrix
- Category Management: https://www.gs1-germany.de/fileadmin/gs1/Themen/shopper-experience/Downloads/gs1-germany-category-management-dossier.pdf · https://www.ecr.digital/enzyklopaedie/category-management/
- Incoterms 2020: https://www.iccgermany.de/standards-incoterms/incoterms-2020-in-der-uebersicht/ · https://www.ihk.de/blueprint/servlet/resource/blob/5142100/b15ed000a6510ef247ed040018c0ffb5/matrix-incoterms-2020--data.pdf

**Immobilien**
- ImmoWertV: https://www.gesetze-im-internet.de/immowertv_2022/BJNR280500021.html · § 31: https://www.buzer.de/31_ImmoWertV.htm
- Kaufnebenkosten: https://www.sparkasse.de/pk/ratgeber/wohnen/immobilie-erwerben/kaufnebenkosten.html · Mietrendite: https://www.sparkasse.de/pk/ratgeber/wohnen/immobilie-erwerben/mietrendite.html · Kaufpreisfaktor: https://www.von-poll.com/de/immobilien-ratgeber/kaufpreisfaktor-berechnen-tabelle
- § 656c BGB: https://dejure.org/gesetze/BGB/656c.html
- Betriebskostenabrechnung: https://www.bmgev.de/mietrecht/tipps/abrechnungsfrist-betriebskosten · https://www.nebenkosten-assistent.de/wissen/556-bgb-grundlagen-der-betriebskostenabrechnung
- WEG-Reform 2020: https://www.wohnen-im-eigentum.de/veraenderungen-die-weg-reform-2020
- Mieterhöhung: https://www.mietrecht-einfach.de/bgb-mietrecht-gesetz/558-bgb-mieterhoehung-bis-zur-ortsueblichen-vergleichsmiete/ · https://se-legal.de/rechtsanwalt/mietrecht/voraussetzungen-einer-wirksamen-mieterhoehung/

**Versicherung/Finanzanlagen**
- § 75 VVG: https://lxgesetze.de/vvg/75 · https://www.haufe.de/id/beitrag/1-versicherungsvertragsrecht-ii-unterversicherung-75-vvg-HI16638746.html · https://www.juraforum.de/lexikon/unterversicherung
- Schadenquote/Combined Ratio: https://www.cometis.de/wp-content/uploads/2016/11/100_Versicherungskennzahlen_Leseprobe.pdf · https://www.binversichert.de/glossar/combined-ratio/
- Beratung und Dokumentation (VVG §§ 6, 61, 62): https://lxgesetze.de/vvg/61 · https://www.ihk.de/magdeburg/recht/finanzdienstleistungen-und-versicherungswirtschaft/recht-versicherungsbranche/grundlegende-informationen/beratungs-dokumentations-und-informationspflichten-4793924
- Finanzanlagenvermittlung (nur zur Abgrenzung): https://www.gesetze-im-internet.de/finvermv/BJNR100610012.html
- Versorgungslücke/BU-Bedarf: https://www.lv1871.de/private-rentenversicherung/versorgungsluecke/ · https://www.finanzfluss.de/rechner/berufsunfaehigkeitsversicherung/

**Repository (intern)**
- `apps/web/src/Instrumente.tsx`, `apps/web/src/Spiele.tsx`, `packages/shared/src/quiz-logic.ts` (QUADRANT_MODELS), `apps/api/src/db/import-content.ts` (KURS_META), `apps/api/src/db/seed-games.ts`, `apps/api/src/db/seed-instrument-lernpfad.ts`, `apps/api/src/pruefungsbereiche.ts`, `docs/Anforderungskatalog.md` (F-105, F-129–F-131, F-154, F-157–F-171), `docs/pruefblaetter/04-lernpfade.md`, `docs/pruefblaetter/05-glossar.md`, `content/handelsfachwirt`, `content/immobilienfachwirt`, `content/versicherungen-finanzanlagen`.
