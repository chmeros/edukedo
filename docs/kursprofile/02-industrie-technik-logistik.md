# Kursprofil-Vorschlag: Industrie-, Technik-, Wirtschaftsfachwirt und Logistik (Entscheidungsvorlage)

Stand: 06.10.2026 · Kursgruppe 02 · Kurse: `industriefachwirt`, `technischer-fachwirt`, `wirtschaftsfachwirt`, `transport-management-logistics`
Charakter: reine Entscheidungsvorlage — es wurde nichts am Code oder am Content geändert. Jeder Vorschlag hat eine Freigabezeile.

**Kennungen:** I = Instrument (Quiz-Zuordnung zu einem Modell), S = Spiel (Gaming-Tab), W = Übungswerkzeug (Browser-Komponente), G = Glossar, L = geführter Lernpfad, P = Prüfungs-Rahmen. Kürzel: IND, TEC, WIR, LOG; `…-FW-nn` = gemeinsam für mehrere Kurse (Abschnitt 4). Aufwand: S = klein (nur Content/Konfiguration), M = mittel (neue Komponente oder neues Zonenmodell), L = groß (neuer Spieltyp mit Server-Logik oder umfangreiche Rechenlogik). „unsicher“ heißt: nicht belegt oder nicht prüfbar — bitte nicht als Fakt lesen.

---

## Kurzfassung

1. **Ist-Zustand:** Alle vier Kurse haben heute nur die acht generischen Instrumente (SWOT, BSC, Ansoff, Gantt, Eisenhower, PDCA, Risikomatrix, Hierarchie) als Quiz-Items — verteilt über viele Themen. Sie haben **kein** Übungswerkzeug, **kein** Spiel-Set, **keinen** Lernpfad, **kein** Glossar und **keine** Prüfungsbereiche/Prüfungsablauf-Metadaten (heute nur die freie Mischprüfung, Präsentationsdauer-Standard 10 Min.).
2. **Bestandsurteil:** SWOT, BSC, Ansoff, Eisenhower, PDCA und Hierarchie passen fachlich; **Gantt** wird in vielen Themen nur als reine Phasen-Zuordnung missbraucht (z. B. Kündigungsschutzprozess im Technischen Fachwirt) und ist dort „unsicher/passt nicht“; die **Risikomatrix** ist nur als 2×2-Handlungsstrategie-Raster sinnvoll. Alle neun IT-Instrumente, die IT-Werkzeuge und alle IT-Spiele passen nicht und bleiben ausgeblendet.
3. **Größter gemeinsamer Hebel (Abschnitt 4):** Industrie-, Technischer und Wirtschaftsfachwirt teilen identische Wirtschaftsbezogene Qualifikationen (WBQ-Fachgebiete wq1–wq4/wbq1–wbq4); mehrere Fachwirt-Werkzeuge gelten für alle vier Kurse: **Kalkulations-/Break-even-Rechner (W-FW-01), Bestell- und Lagerrechner mit Andler/Sicherheits-/Meldebestand (W-FW-02), ABC-/XYZ-Trainer (W-FW-03), Investitionsrechner (W-FW-04)**.
4. **Industriefachwirt:** Alleinstellung ist der Handlungsbereich „Wissens- und Transfermanagement“ (SECI-Modell, Stage-Gate sind im Content bereits vorhanden) und die Produktionsprozesse (PPS, Fertigungstypen, Beschaffungsstrategien). Priorität: I-IND-01/02/03/04, P-IND-01.
5. **Technischer Fachwirt:** Alleinstellung sind die Technischen Qualifikationen (Elektrotechnik, Werkstoffe, Zeichnen, Fertigungsverfahren) und Instandhaltung/Arbeitsschutz/Umwelt. Priorität: technischer Rechentrainer (W-TEC-01), Instrumente DIN 8580, DIN 31051, STOP-Prinzip (I-TEC-01/02/03), Störungs-Detektiv (S-TEC-04).
6. **Wirtschaftsfachwirt:** Schwerpunkt Rechnungswesen/Controlling und „Führung und Zusammenarbeit“ (Schwerpunkt der mündlichen Prüfung). Priorität: Break-even-Diagramm, Investitionsverfahren-Raster, Kennzahlenbaum, Vier-Seiten-Modell, Moderationszyklus (I-WIR-01…04, I-FW-03).
7. **Transport/Logistik:** Hat **keine** WBQ-Prüfung (nur 3 Prüfungsbereiche, 2 × 300 Min. schriftlich, mündlich 10 + 20 Min.) — damit eigenständigstes Profil. Priorität: Verkehrsträger-Vergleich, ADR-Gefahrgutklassen, Beförderungsdokumente (I-LOG-01/03/04), Frachtgewichts-/Frachtkostenrechner (W-LOG-01), Lenk-/Ruhezeiten-Planer (W-LOG-02), Betrugs-Detektiv (S-LOG-04).
8. **Prüfungs-Rahmen:** Für alle vier Kurse nur Konfiguration nötig (Aufwand S): `pruefungsablauf`, `pruefungsbereiche`, `presentationMinutes`; die konkreten Minutenwerte stammen aus den Verordnungen, einzelne IHKs weichen ab („unsicher“, siehe Abschnitt 6).
9. **Neue Spieltypen:** „Kalkulations-/Rechen-Sprint“ (S-FW-01, L) und „Prozess-Reihenfolge“ (Verallgemeinerung von Code-Reihenfolge, S-FW-02, M); alles andere sind neue Content-Sets für vorhandene Typen (Kreuzworträtsel, Duell, Memory, Phishing, Troubleshooting, Bug-Hunt).
10. **Wichtigste Content-Lücken** (Instrument wäre sonst ohne Stoff): Andler-Formel, Lean/Verschwendungsarten, Produktlebenszyklus, Lieferkettensicherheit (steht in der Prüfungsverordnung Logistik § 5!), Frachtgewichts-Berechnung — im Content heute nicht oder kaum vorhanden (Stichwortsuche in `content/<slug>/`).

---

## Gelesene Grundlagen und Methode

- Code: `apps/web/src/Instrumente.tsx` (INSTRUMENT_CATALOG), `Spiele.tsx` (GAME_CATALOG), `apps/api/src/db/import-content.ts` (KURS_META), `seed-games.ts`, `seed-instrument-lernpfad.ts`, `content/README.md` (Zonenmodelle, Hierarchie), Anforderungskatalog F-105, F-149, F-150, F-154, F-161, F-165, F-168.
- **Was ein Kurs heute „hat“:** Instrumente = Quiz-Items mit Typ-Überschrift (z. B. `#### Q-2.2-11 · Balanced Scorecard`) in `content/<slug>/`; Zählung per Textsuche. Werkzeuge nur über `kurs.metadata.werkzeuge` (für die vier Kurse nicht gesetzt). Spiele/Lernpfade nur, wenn ein Seed existiert (`seed-games.ts`: nur Büro-Fachwirt und die vier Fachinformatiker; `seed-instrument-lernpfad.ts`: BSC nur Büro-Fachwirt, IT-Pfade nur Fachinformatiker).
- Belege im Content sind Stichwortsuchen (Anzahl Dateien je Kurs); „0 Treffer“ bedeutet nicht, dass das Thema fachlich nie vorkommt, aber dass es nicht gezielt aufbereitet ist.
- Web-Quellen siehe Quellenliste am Ende. Es wurden **keine** Prüfungsaufgaben übernommen, nur Themen und Strukturen.

---

## Industriefachwirt (`industriefachwirt`)

Fachgebiete im Repo: WBQ wq1–wq4 (Volks-/Betriebswirtschaft, Rechnungswesen, Recht/Steuern, Unternehmensführung) und HQ hq1–hq5 (Finanzwirtschaft, Produktionsprozesse inkl. Materialwirtschaft/Logistik, Marketing und Vertrieb, Wissens- und Transfermanagement, Führung und Zusammenarbeit). Fiktivfirma im Content: Solvitec Elektrowerke GmbH.

### 1. Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | Verordnung über die Prüfung zum Geprüften Industriefachwirt (IndFachwirtPrV 2010, vom 25.06.2010, zuletzt geändert 09.12.2019) | [Q1], [Q2] |
| Teil 1: Wirtschaftsbezogene Qualifikationen | vier schriftliche Bereiche: Volks-/Betriebswirtschaft, Rechnungswesen, Recht und Steuern, Unternehmensführung; Verordnung nennt 60/90/60/90 Min. (Summe höchstens 330 Min.); IHK-Seiten nennen teils 75 Min. für zwei Bereiche — **unsicher, bitte gegen den Verordnungstext prüfen**; bei einem mangelhaften Bereich mündliche Ergänzungsprüfung (höchstens 15 Min.) | [Q2], [Q3] |
| Teil 2: Handlungsspezifische Qualifikationen (HQ) | fünf Handlungsbereiche: Finanzwirtschaft; Produktionsprozesse (u. a. Produktionsplanung/-steuerung, Logistik, Bedarfsermittlung, Beschaffung, Lagerwirtschaft, Entsorgungslogistik); Marketing und Vertrieb; Wissens- und Transfermanagement (Organisation, Personalentwicklung, Projektmanagement, Wissensmanagement); Führung und Zusammenarbeit | [Q2], [Q4] |
| Schriftlich HQ | betriebliche Situationsbeschreibung, daraus **zwei gleichgewichtige, aufeinander abgestimmte Aufgabenstellungen**, zusammen 480–510 Min. | [Q4] |
| Mündlich | situationsbezogenes Fachgespräch mit Präsentation, **ca. 30 Min. (Präsentation ca. 10, Fachgespräch ca. 20)**, Gewichtung Präsentation 1/3, Fachgespräch 2/3; Thema muss mindestens zwei Handlungsbereiche berühren; findet erst nach bestandener Schriftlichkeit statt; Vorbereitungszeit je IHK unterschiedlich — **unsicher** | [Q3], [Q5] |
| Gesamtnote | WBQ 25 %, HQ schriftlich 50 %, mündlich 25 %; mindestens 50 Punkte je Bereich/Prüfungsleistung | [Q2] |
| Besonderheiten | Keine eigenständige Fachrichtungsprüfung „Technik“; Entsorgungslogistik und Rechtsaspekte des Marketings sind ausdrücklich genannt | [Q4] |

Heute in der App: nichts hinterlegt (`KURS_META`: nur `zielgruppe`, `kategorie`). Fallaufgaben und Fachgesprächsfragen je Fachgebiet sind vorhanden.

### 2. Bestandsbewertung

Instrumente (Quiz-Items je Typ in `content/industriefachwirt/`):

| Instrument/Werkzeug/Spiel | Heute im Kurs | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT-Matrix | 3 Items (u. a. 7.1 Marktanalyse, 4.3 Analysemethoden) | passt | Marketingplanung/Analyse gehört zu Handlungsbereich „Marketing und Vertrieb“ [Q4] |
| Balanced Scorecard | 3 (7.3, 2.2, 4.3) | passt | „Controlling als Instrument der betriebswirtschaftlichen Steuerung“ [Q4] |
| Ansoff-Matrix | 2 (7.2, 4.3) | passt | Marketing-Mix/Marktstrategie [Q4] |
| Eisenhower-Matrix | 3 (7.3, 9.1, 4.2) | passt | Führung/Selbstmanagement |
| PDCA-Zyklus | 3 (6.1, 8.3, 4.3) | passt | Qualität/Produktion/Wissensmanagement |
| Risikomatrix | 6 | passt mit Vorbehalt | Zonen sind Handlungsstrategien (Vermeiden/Absichern/Beobachten/Akzeptieren) in vereinfachtem 2×2-Raster statt der üblichen Wahrscheinlichkeit × Auswirkung; als „Risikostrategie-Zuordnung“ brauchbar; Titel ggf. anpassen |
| Gantt-Diagramm | 5 (6.1, 7.4, 1.2, 2.2, 4.3) | unsicher | Nur Phasenzuordnung; echte Gantt-Kompetenz (Balken, Dauer, Abhängigkeit) wird nicht geübt. Bei 6.1 Produktionsplanung sinnvoll; bei 1.2/2.2 (betriebliche Grundfunktionen, Kostenrechnung) konstruiert |
| Hierarchie (Projektstrukturplan/Organigramm) | 11 | passt (Titel irreführend) | Funktioniert als Gliederungs-Baum (z. B. 6.4 Materialwirtschaft: Beschaffung → Bedarfsermittlung; Steuerarten). Echtes Organigramm nur in 4.1; Kachel-Titel „Projektstrukturplan / Organigramm“ passt für Taxonomien nicht → Vorschlag: „Gliederungsbaum“ |
| OSI, Schutzziele, SQL, Scrum, UML, Teststufen, ER-Modell, Normalformen, Ablauf (Struktogramm) | 0 | passt nicht | IT-Instrumente, kein Rahmenplanbezug; bleiben ausgeblendet (Schutzziele nur am Rand bei Datenschutz — nicht vorhanden) |
| Netzplan-Trainer | nicht freigeschaltet | unsicher | Rahmenplan nennt Projektmanagement unter „Wissens- und Transfermanagement“ [Q4]; im Content kein Netzplan-Thema (0 Treffer), „kritischer Pfad/Puffer“ in 5 Dateien — nur freischalten, wenn Content ergänzt wird (siehe W-FW-05) |
| Subnetting, SQL-Übung, Terminal, Topologie, Flag-Rätsel | nicht freigeschaltet | passt nicht | IT |
| Spiele (alle 9 Typen) | 0 Sets | — | Typen Kreuzworträtsel/Duell/Memory/Phishing/Troubleshooting passen als Typ, aber kein Content; Bug-Hunt, Code-Reihenfolge, Subnetting-/Zahlensystem-Sprint passen nicht |
| Lernpfad | keiner | — | BSC-Lernpfad existiert nur für Büro-Fachwirt |
| Glossar / Prüfungsbereiche | keine | — | siehe Vorschläge |

### 3. Neue Vorschläge

**Instrumente (kursspezifisch; gemeinsame siehe Abschnitt 4: I-FW-01, 03, 04, 05, 06, 10, 12, 13).**

**I-IND-01 · PPS-Aufgaben (Produktionsplanung und -steuerung)**
- Beschreibung: Ablauf-Erkennung/Zonen mit den PPS-Kernaufgaben Produktionsprogrammplanung, Mengenplanung, Termin-/Kapazitätsplanung, Auftragsveranlassung, Auftragsüberwachung; Begriffe (z. B. Primärbedarf, Stückliste auflösen, Durchlaufterminierung, Kapazitätsabgleich, Rückmeldung) werden zugeordnet.
- Nutzen: Prüfungsbereich Produktionsprozesse; Praxis: Verständnis von ERP/PPS-Abläufen.
- Passung/Beleg: Verordnung § 5 „Produktionsplanung, -steuerung“ [Q4]; Content 6.1 vorhanden; „MRP/PPS“ in 3 Dateien.
- Aufwand: S–M (neues Zonenmodell in `QUADRANT_MODELS`, Illustration, Content). Risiken: Lehrbuchmodelle gliedern PPS verschieden (Aachener Modell u. a.) → Gliederung fachlich prüfen; Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IND-02 · Fertigungstypen und Fertigungsorganisation**
- Beschreibung: 3–4 Zonen Einzel-, Serien-, Massenfertigung (Sortenfertigung optional); zweite Fassung Werkstatt-/Fließ-/Gruppenfertigung mit Merkmalen (Losgröße, Flexibilität, Rüstaufwand).
- Nutzen: klassisches Prüfungsthema Produktionsprozesse; Praxis: Wahl der Fertigungsorganisation.
- Passung/Beleg: „Einzel-/Serien-/Massenfertigung“ in 7 Dateien (Fertigungsorganisation selbst 0 Treffer → Content ergänzen). Aufwand: S. Risiken: Abgrenzung Serien- vs. Sortenfertigung je Lehrbuch unterschiedlich. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IND-03 · Beschaffungsstrategien (Bereitstellungsprinzipien)**
- Beschreibung: 3 Zonen Vorratshaltung, Einzelbeschaffung im Bedarfsfall, fertigungssynchrone Beschaffung (Just-in-Time); Szenarien/Merkmale zuordnen (Bedarf stetig, Lagerkosten hoch, Lieferant nah).
- Nutzen: Beschaffung/Lagerwirtschaft (§ 5, Produktionsprozesse) [Q4]. Passung/Beleg: Treffer zu Vorratshaltung/Einzelbeschaffung/JIT in 6 bzw. 5 Dateien. Aufwand: S. Risiken: gering. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IND-04 · SECI-Modell der Wissensumwandlung (Nonaka/Takeuchi)**
- Beschreibung: 4 Zonen Sozialisation, Externalisierung, Kombination, Internalisierung; Beispiele aus dem Betrieb (Einarbeitung am Arbeitsplatz, Dokumentation von Erfahrungswissen, Wiki-Pflege, Lernen aus Handbüchern) zuordnen.
- Nutzen: Alleinstellung des Industriefachwirts (Handlungsbereich Wissens- und Transfermanagement) [Q4]. Passung/Beleg: SECI/Nonaka in 3 Content-Dateien, „implizit“ in 5. Aufwand: S. Risiken: Fachbegriffe frei formulieren (Urheberrecht unkritisch, Modell ist wissenschaftlich allgemein). Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IND-05 · Stage-Gate-Prozess (Innovationsmanagement)**
- Beschreibung: Ablauf-Erkennung der Phasen und Gates (Ideenfindung, Grobbewertung, Business Case, Entwicklung, Test, Markteinführung); „Was passiert an welchem Gate?“.
- Nutzen: Innovationsmanagement 8.2. Passung/Beleg: Stage-Gate in 3 Dateien. Aufwand: S (nutzt vorhandenes Ablauf-Format). Risiken: Phasennamen variieren je Quelle → eine Quelle festlegen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-IND-06 · Logistikarten (Beschaffungs-, Produktions-, Distributions-, Entsorgungslogistik)**
- Beschreibung: 4 Zonen; Tätigkeiten zuordnen (Wareneingang, Materialbereitstellung an der Linie, Auslieferung, Rücknahme/Recycling). Auch für LOG nutzbar (Variante mit Dienstleister-Blick).
- Nutzen: „Entsorgungslogistik“ ist in der Verordnung ausdrücklich genannt [Q4]. Passung/Beleg: Content 6.4 Materialwirtschaft/Logistik; Entsorgungslogistik gezielt im Content **nicht belegt (unsicher)**. Aufwand: S. Risiken: gering. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Spiele (Typ + Inhalt).**

**S-IND-01 · Kreuzworträtsel „Produktion und Materialwirtschaft“** — 10 Begriffe (Rüstzeit, Durchlaufzeit, Los, Stückliste, Kanban, Meldebestand, Sicherheitsbestand, Kapazität, Takt, ABC-Analyse). Typ vorhanden, nur Content (S). Passung: Content 6.1–6.4. Risiko: Eindeutigkeit der Lösungswörter. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IND-02 · Begriffe-Duell „Kosten und Leistungen“** — A-oder-B: Aufwand/Kosten, Einzel-/Gemeinkosten, fix/variabel, Ausgaben/Aufwand, Auszahlung/Ausgabe, Teilkosten/Vollkosten. Typ vorhanden, Aufwand S. Passung: Content 2.2 Kostenrechnung (Maschinenstundensatz, BAB). Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IND-03 · Memory „Finanzierung und Investition“** — Paare Begriff ↔ Bedeutung/Formel (Kapitalwert, Amortisationsdauer, Innenfinanzierung, Leasing, Factoring, Skonto, Liquidität 1.–3. Grades). Aufwand S. Passung: Content 5.1–5.3. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-IND-04 · Begriffe-Duell „Wissens- und Innovationsmanagement“** — implizit/explizit, Sozialisation/Externalisierung, Open/Closed Innovation, Stage/Gate. Aufwand S. Priorität: niedrig–mittel (Nische, aber kursspezifisch).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Gemeinsam: S-FW-01 Kalkulations-/Rechen-Sprint, S-FW-02 Prozess-Reihenfolge, S-FW-03 Fehlersuche in der Rechnung — Abschnitt 4.)

**Übungswerkzeuge (gemeinsame W-FW-01…W-FW-06, Abschnitt 4).** Kursspezifische Empfehlung: **W-FW-01** (Kalkulation/Break-even/Maschinenstundensatz; Content 2.2), **W-FW-02** (Andler/Losgröße, Meldebestand; Content 6.4), **W-FW-03** (ABC/XYZ; 6 Dateien), **W-FW-04** (Investitionsrechnung; 5.1: „Kapitalwert/Interner Zinsfuß“ in 6 Dateien) und **W-FW-06** (Produktionskennzahlen/OEE; Content 6.1/6.3).

**Glossar — G-IND-01:** ca. 170–190 Einträge (≈ 18–20 je Fachgebiet × 9 Fachgebiete) im Format `glossar.md` je Fachgebiet (F-165): Schwerpunkt Kostenrechnung (BAB, Maschinenstundensatz, Deckungsbeitrag), PPS/Beschaffung (Stückliste, Rüstzeit, Kanban), QM-Begriffe, Wissensmanagement (SECI, implizites Wissen), Marketing (4P, Skimming/Penetration), Controlling-Kennzahlen. WBQ-Einträge einmal für IND/TEC/WIR erstellen (Abschnitt 4). Aufwand M; Risiko: Fachrichtigkeit, daher Prüfblätter wie bei den Fachinformatikern; Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Lernpfade (7 Stationen, Instrument + Fallbeispiel).**
- **L-IND-01 · ABC-/XYZ-Analyse des Materialsortiments bei Solvitec** (Instrument I-FW-04; Fallbeispiel: Komponenten einer Schaltschrank-Linie; Stationen u. a. Daten sichten, ABC bilden, XYZ ergänzen, Dispositionsstrategie ableiten). Aufwand M, Priorität hoch.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____
- **L-IND-02 · Wissen sichern bei Solvitec (SECI, I-IND-04)** — Fallbeispiel: Erfahrungswissen eines ausscheidenden Meisters. Aufwand M, Priorität mittel.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____
- Hinweis: Der vorhandene branchenneutrale **BSC-Lernpfad (Nordstern GmbH)** könnte durch Seed für diese Kurse freigeschaltet werden (L-FW-01, Abschnitt 4).

**Prüfungs-Rahmen — P-IND-01:** Konfiguration `pruefungsablauf` (Stichpunkte aus Tabelle oben, inkl. Gewichtung 25/50/25 und mündlich 10 + 20 Min.), `pruefungsbereiche` (WBQ vier Bereiche mit Dauer 60/90/60/90 → Fachgebiete wq1–wq4; HQ als Situationsaufgabe mit den fünf Handlungsbereichen hq1–hq5; „Dauer unsicher/IHK-abhängig“ vermerken), `presentationMinutes: 10`. Kein „Projekt“-Reiter (kein betriebliches Projekt). Zusatzbedarf: Hinweis, dass das Präsentationsthema mindestens zwei Handlungsbereiche berühren muss (Text im Präsentationstrainer). Aufwand S, Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Geprüfter Technischer Fachwirt (`technischer-fachwirt`)

Fachgebiete im Repo: WBQ wq1–wq4, **Technische Qualifikationen tq1–tq3** (naturwissenschaftlich-technische Grundlagen inkl. Elektrotechnik; Technisches Zeichnen und Werkstoffe/-prüfung; Fertigungs-/Betriebstechnik inkl. Instandhaltung, Arbeitsvorbereitung, Automatisierung), HQ hq1–hq4 (Absatz/Materialwirtschaft/Logistik; Produktionsplanung/-steuerung/-controlling; Qualitäts-/Umweltmanagement/Arbeitsschutz; Führung und Zusammenarbeit). Fiktivfirma: Vantera Präzisionstechnik GmbH.

### 1. Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | TechFachwPrV vom 17.01.2006 (in Kraft seit 01.02.2006, zuletzt geändert 09.12.2019) — ob eine Neuordnung zum „Bachelor Professional“ vorliegt, wurde nicht geprüft (**unsicher**) | [Q6] |
| Prüfungsteile | drei: Wirtschaftsbezogene Qualifikationen (WBQ), **Technische Qualifikationen (TQ)**, Handlungsspezifische Qualifikationen (HQ) | [Q6] |
| WBQ | Volks-/Betriebswirtschaft 60, Rechnungswesen 90, Recht/Steuern 60, Unternehmensführung 90 Min. (Summe max. 330) | [Q6] |
| TQ | Naturwissenschaftliche und technische Grundlagen 60, Technische Kommunikation und Werkstofftechnologie 90, Fertigungs- und Betriebstechnik 120 Min. (Summe max. 330) | [Q6] |
| HQ schriftlich | eine Situationsaufgabe, 240–300 Min.; Bereiche: Absatz-/Materialwirtschaft und Logistik; Produktionsplanung, -steuerung, -kontrolle; Qualitäts- und Umweltmanagement sowie Arbeitsschutz; Führung und Zusammenarbeit | [Q6] |
| Mündlich | situationsbezogenes Fachgespräch mit Präsentation, höchstens 30 Min., Vorbereitung höchstens 30 Min.; Schwerpunkt Absatz-/Materialwirtschaft/Logistik und Produktionsplanung; Aufteilung Präsentation/Fachgespräch je IHK (genannt wurden z. B. ca. 15 + 15 Min.) — **unsicher**; Bewertung Fachgespräch 2/3, Präsentation 1/3 | [Q6], [Q7] |
| Gesamtnote | WBQ 15 %, TQ 15 %, Situationsaufgabe 45 %, Fachgespräch + Präsentation 25 %; mindestens 50 Punkte je Bereich | [Q6] |
| Besonderheiten | Ergänzungsprüfung ca. 15–20 Min. bei einem mangelhaften Bereich; Befreiung nach § 56 BBiG möglich; Zulassung zur HQ nur nach bestandenen WBQ und TQ (nicht älter als 5 Jahre) | [Q6], Suchtreffer IHK |

Heute in der App: nichts hinterlegt. Präsentationsdauer-Standard 10 Min. passt wahrscheinlich nicht (IHK-abhängig, siehe P-TEC-01).

### 2. Bestandsbewertung

| Instrument/Werkzeug/Spiel | Heute im Kurs | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT | 5 (u. a. 7.4 Automatisierungstechnik, 1.2, 1.3, 3.3) | passt (teils konstruiert) | Bei 7.4 (Automatisierung einführen) sinnvoll; bei Vertragsgestaltung 3.3 unsicher |
| BSC | 2 (2.2, 4.3) | passt | Controlling; im Technikteil sonst nicht |
| Ansoff | 2 (1.4, 4.3) | passt | Strategie/Marktbearbeitung |
| Eisenhower | 2 (11.1, 4.2) | passt | Führung/Selbstmanagement |
| PDCA | 7 (9.2, 9.3, 10.1, 6.3, 7.2, 4.3) | passt | Qualität/Instandhaltung/Prüfwesen — fachlich stark |
| Risikomatrix | 7 (u. a. 10.3 Arbeitsschutz, 7.2 Instandhaltung, 9.3) | passt mit Vorbehalt | In 10.3 (Gefährdungsbeurteilung) fachlich passend; 2×2 mit Handlungsstrategien statt Wahrscheinlichkeit × Auswirkung (siehe Abschnitt 2 Industriefachwirt) |
| Gantt | 11 (8.3, 9.1, 9.2, 10.3, 6.3, 7.3, 3.2, 3.3, 2.2, 1.2) | **unsicher / teils passt nicht** | Bei 9.1 Produktionsplanung und 7.3 Arbeitsvorbereitung sinnvoll; bei 3.2 Arbeitsrecht (Kündigungsschutzprozess mit Klagefrist/Gütetermin/Kammertermin) und 3.3 ist es ein Verfahrensablauf, kein Projektplan → besser als Ablauf-/Sortier-Item |
| Hierarchie | 17 | passt (Titel irreführend) | z. B. 6.2 Werkstoffklassifikation (Metalle/Kunststoffe → Eisenmetalle …), Steuerarten; als „Gliederungsbaum“ sinnvoll |
| IT-Instrumente (9) | 0 | passt nicht | IT |
| Netzplan-Trainer | nicht freigeschaltet | unsicher | Arbeitsvorbereitung 7.3 (Terminierung) könnte passen; im Content kein Netzplan (0 Treffer) |
| Subnetting, SQL, Terminal, Topologie, Flag-Rätsel | nicht freigeschaltet | passt nicht | IT |
| Spiele | 0 Sets | — | siehe Industriefachwirt |
| Lernpfad / Glossar / Prüfungsbereiche | keine | — | siehe Vorschläge |

### 3. Neue Vorschläge

**Instrumente (gemeinsame: I-FW-01, 03, 04, 09 [Führungsstile], 10 [Ishikawa], 12 [Incoterms], 14 [Maslow/Herzberg]).**

**I-TEC-01 · Fertigungsverfahren nach DIN 8580**
- Beschreibung: 6 Zonen Urformen, Umformen, Trennen, Fügen, Beschichten, Stoffeigenschaften ändern; Verfahren zuordnen (Gießen, Tiefziehen, Fräsen, Schweißen, Lackieren, Härten). Kriterium der Einteilung: Stoffzusammenhalt wird geschaffen/beibehalten/vermindert/vermehrt [Q8].
- Nutzen: TQ „Fertigungs- und Betriebstechnik“ (120-Min.-Klausur) [Q6]; Praxis: Verfahrensauswahl.
- Passung/Beleg: Content 7.1 Fertigungsverfahren (Treffer „Urformen“/„Fügen“ in 2 bzw. 4 Dateien). Aufwand: S–M (6-Zonen-Modell, Illustration). Risiken: Normtext nicht übernehmen (nur Gruppenbezeichnungen und eigene Beispiele); Norm-Aktualisierung der Hauptgruppe Fügen angekündigt [Q8]. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-02 · Instandhaltung nach DIN 31051 (Grundmaßnahmen)**
- Beschreibung: 4 Zonen Wartung, Inspektion, Instandsetzung, Verbesserung; Tätigkeiten zuordnen (Schmieren, Verschleißmessung, Lagertausch, Umrüsten auf zuverlässigere Bauteile) [Q9].
- Nutzen: TQ 7.2 Betriebsmittel/Instandhaltung; typische Verwechslungsfrage. Passung/Beleg: Instandhaltung/TPM in 10 Dateien. Aufwand: S. Risiken: Normtext nicht kopieren; Begriffe nach DIN 31051:2019 prüfen. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-03 · STOP-Prinzip im Arbeitsschutz**
- Beschreibung: 4 Zonen Substitution, Technische, Organisatorische, Persönliche Schutzmaßnahmen; Maßnahmen an einer Maschine zuordnen (Ersatzstoff, Schutzeinrichtung, Unterweisung, Gehörschutz) [Q10].
- Nutzen: HQ „Qualitäts- und Umweltmanagement sowie Arbeitsschutz“ [Q6]. Passung/Beleg: STOP/TOP in 3, Gefährdungsbeurteilung in 4 Dateien (10.3). Aufwand: S. Risiken: gering (§ 4 ArbSchG-Rangfolge ist eindeutig). Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-04 · Abfallhierarchie (KrWG § 6)**
- Beschreibung: 5 Stufen Vermeidung, Vorbereitung zur Wiederverwendung, Recycling, sonstige Verwertung, Beseitigung; Beispiele zuordnen/ordnen [Q11].
- Nutzen: Umweltmanagement 10.2. Passung/Beleg: Content 10.2 (Abfallhierarchie in 3 Dateien). Aufwand: S (Hierarchie- oder Sortier-Format möglich, Instrument nur bei Wunsch nach Illustration). Risiken: gesetzliche Fassung prüfen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-05 · Spannungs-Dehnungs-Diagramm (Zugversuch)**
- Beschreibung: Zonen-Zuordnung auf einer Kurve: elastischer Bereich, Streckgrenze/Fließen, Verfestigung, Zugfestigkeit/Einschnürung, Bruch; Kennwerte (Re, Rm, E-Modul) den Stellen zuordnen.
- Nutzen: Werkstoffprüfung 6.3. Passung/Beleg: Zugversuch/Streckgrenze in 2–3 Dateien. Aufwand: M (Zonen auf einer Grafik; Illustration aufwendig). Risiken: Normbezeichnungen (Re/ReH/Rp0,2) vereinheitlichen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-06 · Linienarten und Ansichten im technischen Zeichnen**
- Beschreibung: Zonen Linienart (Volllinie breit, schmal, Strichlinie, Strichpunktlinie) ↔ Verwendung (sichtbare Kanten, Maßlinien, verdeckte Kanten, Mittellinien).
- Nutzen: TQ „Technische Kommunikation“ (90 Min.). Passung/Beleg: Content 6.1 (Zeichnungsthemen in 3 Dateien); genaue Abdeckung **unsicher**. Aufwand: M (Illustration). Risiken: Normtabellen nicht kopieren (DIN EN ISO 128). Priorität: niedrig–mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-TEC-07 · Automatisierungspyramide (Ebenen)**
- Beschreibung: 5 Zonen Feld-, Steuerungs-, Prozessleit-, Betriebsleit-, Unternehmensebene (Sensor/SPS/SCADA/MES/ERP zuordnen).
- Nutzen: Automatisierungstechnik 7.4. Passung/Beleg: nur 1 Treffer für Feldebene/Pyramide (**unsicher**; Content müsste ergänzt werden). Aufwand: S. Priorität: niedrig.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Spiele.**

**S-TEC-01 · Kreuzworträtsel „Werkstoffe und Fertigung“** — Begriffe wie Zugfestigkeit, Härte, Thermoplast, Duroplast, Legierung, Toleranz, Passung, Gewinde. Typ vorhanden, Aufwand S, Priorität mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-TEC-02 · Begriffe-Duell „Technische Unterscheidungen“** — Wartung/Inspektion, Spiel-/Presspassung, Thermoplast/Duroplast, Eisen-/NE-Metall, Re/Rm, Wirk-/Blindleistung (nur wenn im Content). Aufwand S, Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-TEC-03 · Memory „Fertigungsverfahren ↔ Hauptgruppe“ und „Normen/Abkürzungen“** (ISO 9001, ISO 14001, ArbSchG, DIN 8580, DIN 31051). Aufwand S, Priorität mittel. Risiko: Normnummern auf Aktualität prüfen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-TEC-04 · Störungs-Detektiv Produktion** (Spieltyp Troubleshooting umgewidmet): zwei Schritte, erst Ursachenbereich nach 5M/6M (Mensch, Maschine, Material, Methode, Milieu, Messung), dann wahrscheinlichste Ursache; Szenarien: Ausschuss bei Zerspanung, Anlage steht, Maßabweichung. Aufwand M (die Schicht-Beschriftung ist heute fest „Schicht“ im Netzwerk-Spiel; Beschriftung konfigurierbar machen), Priorität hoch. Risiko: Szenarien fachlich prüfen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-TEC-05 · Einheiten-/Technik-Sprint** (Variante des Zahlen-Sprints, serverseitig erzeugte Aufgaben): Einheiten umrechnen, Ohmsches Gesetz, Dichte, Druck, Drehzahl/Schnittgeschwindigkeit. Aufwand L (neuer Sprint-Typ mit Token-Logik), Priorität mittel — nur in Kombination mit W-TEC-01 sinnvoll.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Übungswerkzeuge.**

**W-TEC-01 · Technischer Rechentrainer**
- Funktion: zufällige Aufgaben mit Lösungsweg zu Einheitenumrechnung, Ohmsches Gesetz/Leistung, Dreisatz/Prozent, Dichte/Masse, Druck/Kraft, Drehzahl und Schnittgeschwindigkeit; Eingabe: Ergebnis mit Einheit; Ausgabe: richtig/falsch + Rechenweg.
- Nutzen: TQ „Naturwissenschaftliche und technische Grundlagen“ (60-Min.-Klausur mit Rechenaufgaben) [Q6]. Passung/Beleg: Content 5.1–5.3 (Ohm in 11, Spannung in 11 Dateien). Im Browser machbar (reine Formeln, wie Subnetting-Rechner). Aufwand M. Risiken: Formelsammlung des Prüfers unbekannt → nur Standardformeln; keine Normtabellen. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-TEC-02 · Zugversuch-Explorer**
- Funktion: Eingabe Kraft, Ausgangsquerschnitt, Messlänge; Ausgabe Spannung, Dehnung, E-Modul; verschiebbare Kurve mit markierten Punkten (Re, Rm). Passung: Werkstoffprüfung 6.3. Aufwand M, Priorität mittel. Risiko: vereinfachte Kennlinie, nicht für echte Werkstoffdaten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-TEC-03 · Toleranz- und Passungsrechner**
- Funktion: Nennmaß + oberes/unteres Abmaß für Welle und Bohrung → Höchst-/Mindestmaß, Toleranz, Höchst-/Mindestspiel bzw. -übermaß, Passungsart (Spiel/Übergang/Übermaß). Passung: Toleranz in 10 Dateien, ISO-Passung/Spielpassung in 3. Aufwand S–M. Risiken: ISO-Toleranztabellen (DIN EN ISO 286) **nicht** übernehmen (Urheberrecht Normtexte); Abmaße selbst eingeben lassen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Gemeinsame: W-FW-01…W-FW-04 und W-FW-06 mit Instandhaltungs-Kennzahlen: Verfügbarkeit = MTBF/(MTBF + MTTR), „MTBF/MTTR“ in 2 Dateien.)

**Glossar — G-TEC-01:** ca. 200–220 Einträge (11 Fachgebiete × ≈ 20): Werkstoffe, Normen, Fertigungsverfahren, Instandhaltung, Elektrotechnik, QM/Umwelt/Arbeitsschutz plus gemeinsame WBQ-Begriffe. Die Technik-Begriffe sind die stärkste Wirkung des Glossars (Popover nach der Antwort). Aufwand M–L; Priorität hoch; Risiko: Normnummern und Definitionen frei formulieren, Prüfblatt vorsehen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Lernpfade.**
- **L-TEC-01 · Ausschuss in der Zerspanung bei Vantera (Ishikawa/PDCA, I-FW-10)** — Stationen: Problem beschreiben, 6M-Ursachen sammeln, gewichten, Maßnahme planen, prüfen, standardisieren. Aufwand M, Priorität hoch.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____
- **L-TEC-02 · Gefährdungsbeurteilung an einer CNC-Fräse (STOP-Prinzip, I-TEC-03)** — Aufwand M, Priorität mittel.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Prüfungs-Rahmen — P-TEC-01:** `pruefungsbereiche`: WBQ (4 Bereiche, 60/90/60/90 Min.), TQ (3 Bereiche, 60/90/120 Min., Fachgebiete tq1–tq3), HQ (Situationsaufgabe 240–300 Min., Fachgebiete hq1–hq4); `pruefungsablauf` mit Gewichtung 15/15/45/25 und Hinweis auf Zulassungsreihenfolge; `presentationMinutes` je nach Entscheidung (Präsentation ca. 15 Min. laut IHK-Hinweis, **unsicher**). Aufwand S, Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Geprüfter Wirtschaftsfachwirt (`wirtschaftsfachwirt`)

Fachgebiete im Repo: WBQ wbq1–wbq4 sowie HSQ hsq1–hsq5 (Betriebliches Management; Investition/Finanzierung/Rechnungswesen/Controlling; Logistik; Marketing und Vertrieb; Führung und Zusammenarbeit). Laut Kommentar in `KURS_META` (F-145) die Fachwirt-Qualifikation mit den meisten Prüfungsteilnehmer:innen (DIHK-Statistik 2024) — hohe Reichweite, daher lohnt hier die Investition in gemeinsame Werkzeuge besonders.

### 1. Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | WFachwPrV vom 26.08.2008, zuletzt geändert 09.12.2019 | [Q12] |
| Teil 1: WBQ | vier schriftliche Bereiche Volks-/Betriebswirtschaft 60 (IHK-Angaben teils 75), Rechnungswesen 90, Recht/Steuern 60 (teils 75), Unternehmensführung 90 Min. — Abweichung **unsicher** | [Q12], [Q13] |
| Teil 2: HSQ | fünf Handlungsbereiche: Betriebliches Management; Investition, Finanzierung, betriebliches Rechnungswesen und Controlling; Logistik; Marketing und Vertrieb; Führung und Zusammenarbeit | [Q12] |
| Schriftlich HSQ | Situationsbeschreibung mit **zwei gleichgewichtigen Aufgabenstellungen**, zusammen 480–510 Min. (je 240 Min. in Veröffentlichungen der IHK) | [Q12], [Q13] |
| Mündlich | situationsbezogenes Fachgespräch mit Präsentation, höchstens 30 Min., Vorbereitung höchstens 30 Min.; Präsentation 1/3, Fachgespräch 2/3; **Schwerpunkt Handlungsbereich „Führung und Zusammenarbeit“** | [Q12], [Q13] |
| Gesamtnote | WBQ 25 %, HSQ schriftlich 50 %, mündlich 25 %; mindestens 50 Punkte je Bereich | [Q12] |
| Besonderheiten | Vorbereitungszeit für das Fachgespräch (Handreichung der IHK); Ergänzungsprüfung bei einzelnem mangelhaftem WBQ-Bereich | [Q13] |

Heute in der App: nichts hinterlegt.

### 2. Bestandsbewertung

| Instrument/Werkzeug/Spiel | Heute im Kurs | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT | 3 (4.1 Marketingplanung, wbq4 4.3 ×2) | passt | Marketingplanung/Analysemethoden |
| BSC | 1 (2.4 Controlling) | passt | Controlling |
| Ansoff | 1 (4.2) | passt | Marketing-Mix |
| Eisenhower | 1 (1.4 Managementtechniken) | passt | Selbstmanagement |
| PDCA | 1 (1.4) | passt | Managementtechniken |
| Gantt | 1 (3.3 Wertschöpfungskette/Rationalisierung) | unsicher | Phasenzuordnung für Rationalisierungsprojekt; sonst kein Projektthema im Kurs |
| Risikomatrix | **0 Items** | Lücke | Handlungsbereich „Betriebliches Management“ (strategische Planung, Managementtechniken) würde eine Risiko-Zuordnung tragen; heute nicht verfügbar |
| Hierarchie | 3 (u. a. 3.3: Porters Wertschöpfungskette mit primären/unterstützenden Aktivitäten) | passt | „Wertschöpfungskette nach Porter“ ist gezielt aufbereitet |
| IT-Instrumente (9) | 0 | passt nicht | IT; „Informationstechnologie im Management“ 1.3 ist betriebswirtschaftlich (IT-gestützte Entscheidung, Datenschutz), Schutzziele nur bei Wunsch (**unsicher**) |
| Netzplan, IT-Werkzeuge | nicht freigeschaltet | Netzplan unsicher / IT passt nicht | Kein Projektplanungs-Schwerpunkt im Wirtschaftsfachwirt-Rahmenplan; „Projektmoderation“ ist Moderation, kein Netzplan |
| Spiele | 0 Sets | — | siehe Industriefachwirt |
| Lernpfad / Glossar / Prüfungsbereiche | keine | — | siehe Vorschläge |

### 3. Neue Vorschläge

**Instrumente (gemeinsame: I-FW-01, 02, 03, 05 [Marketing-Mix], 06 [BCG], 09 [Führungsstile], 12 [Incoterms], 13 [Finanzierungs-Matrix]).**

**I-WIR-01 · Investitionsrechnungsverfahren-Raster**
- Beschreibung: 2 Zonen statische Verfahren (Kosten-, Gewinn-, Rentabilitätsvergleich, statische Amortisation) und dynamische Verfahren (Kapitalwert, interner Zinsfuß, Annuität, dynamische Amortisation); Merkmale (Zinseffekt, Betrachtung mehrerer Perioden) und Verfahren zuordnen.
- Nutzen: HSQ2 Investition; typische Verwechslung in Klausuren. Passung/Beleg: Content 2.1 (Kapitalwert/IZF in 3 Dateien, Amortisation in 3). Aufwand: S. Risiken: gering. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-WIR-02 · Kennzahlenbaum (ROI/DuPont)**
- Beschreibung: Hierarchie-Format: Root ROI → Umsatzrendite × Kapitalumschlag → Gewinn/Umsatz, Umsatz/Kapital → Posten; Begriffe in den Baum einsortieren.
- Nutzen: Controlling 2.4. Passung/Beleg: „Kennzahlensystem“ in 2, „ROI/DuPont“ in 2 Dateien (**gezielte Abdeckung unsicher**). Aufwand: S (vorhandenes Hierarchie-Format). Risiken: Definition ROI variiert (Gewinn vor/nach Zinsen) → eine Definition festlegen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-WIR-03 · Wertschöpfungskette nach Porter (eigenes Instrument)**
- Beschreibung: Zonen Primäre Aktivitäten (fünf) und Unterstützende Aktivitäten (vier) mit Betriebsbeispielen, Leitfrage „Wo entsteht Marge?“.
- Nutzen: HSQ3 Logistik/Rationalisierung; hängt als Hierarchie-Item bereits im Kurs. Passung/Beleg: 3.3, „Porter“ in 5 Dateien. Aufwand: S–M (Illustration als Kette). Risiken: gering. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-WIR-04 · Vier-Seiten-Modell (Schulz von Thun)**
- Beschreibung: 4 Zonen Sachinhalt, Selbstoffenbarung, Beziehung, Appell; Aussagen aus Mitarbeitergesprächen zuordnen.
- Nutzen: **Schwerpunkt der mündlichen Prüfung** „Führung und Zusammenarbeit“ [Q12]; HSQ5 Kommunikation/Mitarbeitergespräche. Passung/Beleg: „Schulz von Thun“ in 3 Dateien. Aufwand: S. Risiken: Modellbeschriftung ist etabliert, keine Urheberrechtsprobleme bei eigenen Beispielen. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-WIR-05 · Moderationszyklus**
- Beschreibung: Ablauf-Erkennung der Phasen (Einstieg, Themen sammeln, Thema auswählen, Thema bearbeiten, Maßnahmen planen, Abschluss).
- Nutzen: HSQ5.4 „Projektmoderation, Präsentationstechniken“ (laut Prüfungsverordnung Teil von Führung und Zusammenarbeit, analog [Q4]). Passung/Beleg: Content 5.4, „Moderation“ in 3 Dateien. Aufwand: S. Risiken: Phasenbenennung nach Methodenschule (Moderationsmethode vs. Kartenabfrage) vereinheitlichen. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-WIR-06 · Management by Objectives (MbO-Regelkreis)**
- Beschreibung: Ablauf-Erkennung Zielvereinbarung → Umsetzung → Zwischengespräch → Beurteilung → neue Ziele. Passung/Beleg: Content 1.4, „Zielvereinbarung/MbO“ in 9 Dateien. Aufwand: S. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Spiele.**

**S-WIR-01 · Kreuzworträtsel „Kosten- und Leistungsrechnung“** (Deckungsbeitrag, Break-even, Zuschlagssatz, Teilkosten, Kalkulation, Opportunitätskosten …). Aufwand S, Priorität hoch (DB in 9 Dateien).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-WIR-02 · Begriffe-Duell „Finanzierung und Controlling“** (Eigen-/Fremdfinanzierung, Innen-/Außenfinanzierung, statisch/dynamisch, Leasing/Kredit, Kennzahl X oder Y). Aufwand S, Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-WIR-03 · Memory „Marketing-Instrumente und Vertriebswege“** (Preisdifferenzierung, Skimming, Penetration, direkter/indirekter Vertrieb). Aufwand S, Priorität mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-WIR-04 · Gesprächs-Detektiv „Mitarbeitergespräch“** (Variante Phishing-/Detektiv-Typ ohne IT oder Verallgemeinerung von „Prozess-Reihenfolge“): Aussagen in Gesprächssituationen prüfen — Ich-Botschaft? Appell versteckt? Aufwand M (neuer Content-Typ nötig), Priorität niedrig–mittel. Risiko: pädagogische Eindeutigkeit der „richtigen“ Antwort.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Gemeinsame: S-FW-01 Kalkulations-/Rechen-Sprint, S-FW-03 Fehlersuche in der Rechnung.)

**Übungswerkzeuge.** Gemeinsame **W-FW-01** (Kalkulation/Break-even/Deckungsbeitrag; Content 2.3 mit eigener Break-even- und Kalkulationssektion — **bester Passungsfall**), **W-FW-04** (Investitionsrechnung; 2.1), **W-FW-02** (Lager/Bestellmenge; 3.2 Materialwirtschaft: „Bestellmenge“ in 5, „Sicherheitsbestand“ in 5 Dateien), **W-FW-03** (ABC/XYZ; 4 Dateien). Kursspezifisch:

**W-WIR-01 · Nutzwertanalyse-Matrix** — Funktion: Kriterien gewichten (Summe 100 %), Alternativen bewerten (z. B. Skala 0–10), Ergebnis als gewichtete Summe + Rangliste, Sensitivität (Gewicht ändern → Rang). Passung: Content: „Nutzwert“ in 3 Dateien (hsq3 Einkauf/Lieferantenwahl). Aufwand S–M, Priorität mittel. Risiken: gering (reine Rechenlogik).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Glossar — G-WIR-01:** ca. 170 Einträge (9 Fachgebiete × ≈ 19) mit Schwerpunkt Rechnungswesen (Aufwand/Kosten, Deckungsbeitrag, Annuität), Recht/Steuern (Umsatzsteuer, Vorsteuer, Verjährung, Kaufmannseigenschaft), Führung (Herzberg, Blake/Mouton — nur wenn im Content), Marketing. WBQ-Einträge gemeinsam mit IND/TEC. Aufwand M; Priorität mittel–hoch (breiter Stoff, viele Abkürzungen); Risiko: rechtliche Passagen Stand prüfen (Steuer-/Arbeitsrecht ändert sich; Stand-Vermerk wie in `rechtsstand`).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Lernpfade.**
- **L-WIR-01 · Break-even und Deckungsbeitrag: Sortimentsentscheidung** (Instrument I-FW-03; Fallbeispiel eines Produzenten mit drei Produktlinien; zugleich Einstieg in W-FW-01). Aufwand M, Priorität hoch.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____
- **L-WIR-02 · Das schwierige Mitarbeitergespräch (Vier-Seiten-Modell, I-WIR-04)** — passt zum mündlichen Schwerpunkt. Aufwand M, Priorität hoch.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Prüfungs-Rahmen — P-WIR-01:** `pruefungsbereiche` WBQ 4 + HSQ-Situationsaufgaben (hsq1–hsq5) mit Zeitangaben aus der Verordnung (480–510 Min.); `pruefungsablauf` mit Hinweis „**Schwerpunkt mündlich: Führung und Zusammenarbeit**“ → Fachgesprächstrainer standardmäßig auf hsq5 gewichten (bereits Pflichtthema laut `content/README.md`). Zusatz: Präsentationstrainer-Hinweis zu 30 Min. Vorbereitungszeit. Aufwand S, Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Transport-/Logistik-Kurs (`transport-management-logistics`)

Fachgebiete im Repo: HB1 Entwickeln und Vermarkten (Marktanalyse, Dienstleistungsentwicklung, Vertrieb/Angebotskalkulation, Vertragsgestaltung Güterverkehr, Digitalisierung), HB2 Erstellen (Transportplanung, Lager/Bestand, Verkehrsträger/Intermodalität, Zoll/Außenwirtschaft, Gefahrgut, Qualitäts-/Umweltmanagement), HB3 Kommunikation, Führung, Zusammenarbeit (Führung, Kommunikation, Teamarbeit/Konflikte, Berufsausbildung). Fiktivfirma: Fracora. **Keine WBQ** — das ist Absicht der Verordnung.

### 1. Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | Verordnung über die Prüfung zum Fachwirt für Güterverkehr und Logistik / **Bachelor Professional in Transport Management and Logistics** (GüLogFachwBAProFV; laut Content-Metadaten vom 21.09.2023, in Kraft seit 28.09.2023 — Datum nicht erneut verifiziert) | [Q14] |
| Prüfungsbereiche | drei: (1) Entwickeln und Vermarkten von Güterverkehrs- und Logistikdienstleistungen (Qualitäts-/Umweltmanagement, Marktanalyse, Kundenorientierung, Ausschreibungsmanagement, Prozessgestaltung, Angebotserstellung, Marketing); (2) Erstellen von Güterverkehrs- und Logistikdienstleistungen (Planung/Optimierung, Ausschreibungen, Kostenanalyse, Unternehmenskennzahlen, Budgetmanagement, Lieferkettensicherheit, Außenwirtschaft); (3) Kommunikation, Führung und Zusammenarbeit (Kommunikation/Präsentation, Personalauswahl/Personaleinsatz, Führungsmethoden, Berufsausbildung, Weiterbildung, Arbeits-/Gesundheitsschutz) | [Q15], [Q16], [Q17] |
| Schriftlich | zwei aufeinander abgestimmte Aufgabenstellungen aus einer betrieblichen Situation, **je 300 Min.** (insgesamt 10 Std., an zwei Tagen); alle Prüfungsbereiche abgedeckt | [Q18], [Q19] |
| Mündlich | Präsentation **höchstens 10 Min.** (Thema aus Bereich 1 oder 2, verknüpft mit Bereich 3; Kurzbeschreibung und Gliederung zum Termin der zweiten schriftlichen Prüfung einreichen) und Fachgespräch **höchstens 20 Min.**; Gewichtung 1/3 : 2/3 | [Q20], [Q21] |
| Gesamtnote | schriftlich 50 %, mündlich 50 %; mindestens 50 Punkte in beiden Teilen | [Q22] |
| Besonderheiten | Verfahren innerhalb von zwei Jahren abzuschließen (sonst 0 Punkte); Zulassung u. a. über kaufmännische Ausbildung im Bereich Logistik oder Berufspraxis [Q19] | [Q18], [Q19] |

Heute in der App: nichts hinterlegt; der Präsentationsstandard 10 Min. passt zur Verordnung.

### 2. Bestandsbewertung

| Instrument/Werkzeug/Spiel | Heute im Kurs | Urteil | Begründung / Beleg |
|---|---|---|---|
| SWOT | 1 (1.1 Marktanalyse; Abschnitt „Trendanalyse und SWOT“) | passt | HB1 Marktanalyse |
| Ansoff | 1 (1.2 Dienstleistungsentwicklung) | passt | Leistungsangebot entwickeln |
| PDCA | 2 (1.2, 2.6 QM/Umwelt) | passt | Qualitäts-/Umweltmanagement ist Teil von Bereich 1 [Q15] |
| Risikomatrix | 1 (1.5 Digitalisierung) | passt mit Vorbehalt | 2×2-Handlungsstrategie-Raster; zur Lieferkettensicherheit wäre die klassische Matrix besser |
| Eisenhower | 1 (3.1 Führungsmethoden) | passt | Führung |
| Gantt | 2 (1.2, 3.4 Berufsausbildung) | unsicher | Ausbildungsplan als Zeitabschnitte denkbar; sonst kein Projekt-Schwerpunkt |
| BSC | **0** | passt nicht / Lücke | Kein Controlling-Handlungsbereich im Rahmen wie bei Industrie/Wirtschaft, aber Unternehmenskennzahlen in Bereich 2 [Q16] → Lernpfad-Freischaltung BSC nicht sinnvoll ohne Content |
| Hierarchie | 3 (u. a. 1.3 Zuschlagskalkulationsschema: Angebotspreis = Einzelkosten + Gemeinkostenzuschläge + Gewinnzuschlag) | passt | Kalkulationsschema ist prüfungsrelevant |
| IT-Instrumente, IT-Werkzeuge | 0 | passt nicht | IT |
| Netzplan | nicht freigeschaltet | passt nicht | kein Projektmanagement-Schwerpunkt |
| Spiele | 0 Sets | — | Typen als Typ passend, Content fehlt |
| Lernpfad / Glossar / Prüfungsbereiche | keine | — | siehe Vorschläge |

### 3. Neue Vorschläge

**Instrumente (gemeinsame: I-FW-01 [Frachtkalkulation], 04 [ABC/XYZ], 05 [7P Dienstleistungsmarketing], 09, 12 [Incoterms], 14).**

**I-LOG-01 · Verkehrsträger-Vergleich**
- Beschreibung: 4 Zonen Straße, Schiene, Wasserstraße (Binnen-/Seeschiff), Luft; Eigenschaften und Einsatzfälle zuordnen (Haus-zu-Haus-Flexibilität, Massengut, Eilfracht, Fahrplanbindung, Umweltbilanz, Pünktlichkeit).
- Nutzen: Prüfungsbereich 2 (Planung/Optimierung); Praxis: Verkehrsträgerwahl. Passung/Beleg: Content 2.3 „Die vier klassischen Verkehrsträger“, „Kriterien der Verkehrsträgerwahl“. Aufwand: S. Risiken: Aussagen zu Emissionen/Kosten nur qualitativ, keine Zahlen ohne Quelle. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-LOG-02 · Logistikarten nach Funktion** — siehe I-IND-06 (Beschaffungs-, Produktions-, Distributions-, Entsorgungslogistik), im LOG-Kurs mit Dienstleister-Perspektive. Aufwand S, Priorität mittel; Beleg im LOG-Content **unsicher** (Grundlagenkapitel fehlt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-LOG-03 · ADR-Gefahrgutklassen**
- Beschreibung: 9 Zonen (Klasse 1 Explosive Stoffe … Klasse 9 verschiedene gefährliche Stoffe); Beispielstoffe und Gefahrzettel zuordnen [Q23].
- Nutzen: HB2 2.5; sehr prüfungsnah, hoher Merkbedarf. Passung/Beleg: Content 2.5 „Gefahrgutklassen und Kennzeichnung“. Aufwand: M (9 Zonen sind mehr als das bisherige Maximum von 7 beim OSI-Modell; UI auf Handy prüfen). Risiken: ADR wird zweijährlich geändert (**Fassung/Jahr** angeben, Stoffbeispiele aus Frei-Quellen, keine amtlichen Tabellen kopieren). Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-LOG-04 · Beförderungsdokumente nach Verkehrsträger**
- Beschreibung: 4 Zonen Straße (CMR-Frachtbrief), Schiene (CIM-Frachtbrief), See (Konnossement), Luft (Air Waybill); Eigenschaften zuordnen (Wertpapier/Beweisurkunde, Haftungsregime). Passung/Beleg: CMR in 7 Dateien (1.4), Frachtbrief 7. Aufwand: S. Risiken: Haftungsgrenzen und Wertpapiereigenschaften genau prüfen (**Fachrichtigkeit kritisch**; Konnossement ist Wertpapier, CMR-Frachtbrief nicht). Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-LOG-05 · Warenfluss im Lager (Prozesskette)**
- Beschreibung: Ablauf-Erkennung Anlieferung → Wareneingangskontrolle → Einlagerung → Kommissionierung → Verpackung/Verladebereitstellung → Warenausgang. Passung/Beleg: Content 2.2 (Kommissionierung in 10 Dateien — Wareneingang selbst **unsicher**). Aufwand: S. Priorität: mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-LOG-06 · Lagerordnungssysteme und Kommissionierprinzipien**
- Beschreibung: zwei kleine Zonen-Modelle: Festplatz/Freiplatz (chaotisch)/Zonenlagerung; Mann-zur-Ware, Ware-zur-Mann. Passung/Beleg: Fachgesprächsfragen 2.2 nennen feste/chaotische Lagerordnung und Kommissionierverfahren; „Mann-zur-Ware“ in 2 Dateien. Aufwand: S. Risiken: Begriffe der Fachliteratur variieren. Priorität: niedrig–mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Spiele.**

**S-LOG-01 · Kreuzworträtsel „Logistik und Spedition“** (Frachtführer, Spediteur, Kommissionierung, Cross-Docking, Konnossement, Intermodal, Ladungsträger, Disposition, Leerkilometer, Meldebestand). Aufwand S, Priorität mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-LOG-02 · Begriffe-Duell „Spediteur oder Frachtführer?“ / „Wer trägt es?“** — A-oder-B-Szenarien zu Frachtvertrag/Speditionsvertrag, Haftung, Incoterms (Verkäufer/Käufer). Aufwand S; Risiko: Rechtsstand HGB prüfen (rechtliche Passagen!); Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-LOG-03 · Memory „Abkürzungen der Logistik“** — CMR, ADR, ATLAS, EORI, TMS, WMS, EDI, FTL/LTL, TEU, LDM, EXW/FCA/DAP … ↔ Bedeutung. Aufwand S, Priorität hoch (hohe Abkürzungsdichte).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-LOG-04 · Betrugs-Detektiv „Fake-Spedition und Frachtbetrug“** (Typ Phishing-Detektiv, 8 Mails/Frachtbörsenanfragen: Phantomfrachtführer, geänderte Bankverbindung, gefälschte Identität, auffällige E-Mail-Domain). Nutzen: Lieferkettensicherheit ist Prüfungsinhalt (§ 5) [Q16]; die Betrugsmasche ist aktuell stark verbreitet [Q24], [Q25]. Aufwand S (Content-only). Risiken: Szenarien frei erfinden, keine realen Firmennamen. Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-LOG-05 · Störungs-Detektiv Lieferkette** (Typ Troubleshooting umgewidmet): zwei Schritte — Ursachenbereich (Auftrag/Disposition, Transport, Lager, Zoll/Papiere, Ladungssicherung) und konkrete Ursache (fehlende EORI, falsche Incoterm-Annahme, Lenkzeitlimit, Ladeliste fehlerhaft). Aufwand M (Beschriftung konfigurierbar machen), Priorität mittel.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-LOG-06 · Bierspiel-Light (Lieferketten-Simulation)** — Planspiel nach dem MIT „Beer Distribution Game“ (Bullwhip-Effekt) als Browser-Simulation mit automatisierten Mitspielern [Q26], [Q27]; keine Wertung. Aufwand L, Priorität niedrig (Nische, Bullwhip im Content 0 Treffer).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Übungswerkzeuge.**

**W-LOG-01 · Frachtgewicht- und Frachtkostenrechner**
- Funktion: Eingabe Packstücke (L × B × H, Gewicht, Anzahl), Verkehrsträger → Ausgabe tatsächliches Gewicht, Volumengewicht, **frachtpflichtiges Gewicht** (höherer Wert), Lademeter; Frachtpreis = frachtpflichtiges Gewicht × Satz + Zuschläge (Eingabefelder), optionale Zuschlagskalkulation (Anbindung an W-FW-01).
- Faktoren: Luft gängig 1:6 (167 kg/m³), See häufig 1 t = 1 m³ (W/M), Straße oft über Lademeter (z. B. 1 Europalette mit Pauschalgewicht) — die Faktoren sind **vertrags- bzw. branchenabhängig, nicht einheitlich**; im Werkzeug als einstellbare Parameter mit Hinweis führen, genaue Standardwerte vor Freigabe prüfen [Q28]. Die oft genannten 333 kg/m³ und 1.850 kg/ldm sind nicht abgesichert (**unsicher**).
- Nutzen: Prüfungsbereich 2 „Kostenanalyse/Angebotserstellung“; Praxis: Angebotsberechnung. Passung/Beleg: Content 1.3 (Zuschlagskalkulation) — Frachtgewichtsberechnung im Content **nicht belegt** (0 Treffer, Content-Lücke). Aufwand: M. Risiken: Fachrichtigkeit der Standardfaktoren; Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-LOG-02 · Lenk- und Ruhezeiten-Planer**
- Funktion: Fahrtabschnitte, Pausen, Ruhezeiten auf einer Zeitleiste eintragen → Prüfung gegen Grundregeln der VO (EG) 561/2006: tägliche Lenkzeit 9 Std. (zweimal pro Woche 10), Pause 45 Min. nach 4,5 Std. (teilbar 15 + 30), tägliche Ruhezeit 11 Std. (Verkürzung/Teilung beachten), Wochenlenkzeit 56 Std., zwei Wochen 90 Std. [Q29], [Q30]. Ausgabe: Verstoß/Restlenkzeit.
- Nutzen: Tourenplanung/Disposition (Content 2.1 nennt Lenkzeiten, 561/2006 in 2 Dateien). Aufwand: M (Regelwerk mit Ausnahmen nur begrenzt abbilden). Risiken: Regeln und Ausnahmen komplex; Hinweis „Übung, keine Rechtsberatung/kein Fahrtenschreiber-Ersatz“; Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-LOG-03 · Sparverfahren-Trainer (Savings-Algorithmus)**
- Funktion: Distanzmatrix (Depot + 5–6 Kunden) und Fahrzeugkapazität; Nutzer berechnet Einsparungen s_ij = c_0i + c_0j − c_ij, sortiert, bildet Touren unter Kapazitätsgrenze; Tool prüft und zeigt Lösungsweg [Q31]. Zufallsaufgaben mit ganzzahligen Entfernungen.
- Nutzen: Content 2.1 nennt Sparverfahren und Sweep-Verfahren (3 Dateien). Aufwand: M–L. Risiken: Heuristik ist nicht optimal — Tool sagt das deutlich; Priorität: mittel–hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-LOG-04 · Incoterms-Pflichtenmatrix (Nachschlagen und Üben)**
- Funktion: Auswahl einer der 11 Klauseln (EXW, FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU, DDP) → Pflichten Verkäufer/Käufer, Gefahrübergang, Kostenübergang, geeigneter Verkehrsträger; Übungsmodus „Welche Klausel passt?“ [Q32], [Q33].
- Nutzen: Außenwirtschaft (Bereich 2, § 5), Content 2.4 „Incoterms 2020 im Überblick“; Praxis: tägliches Handwerkszeug. Aufwand: S–M. Risiken: Der ICC-Wortlaut ist urheberrechtlich geschützt → nur **eigene** Kurzformulierungen. Priorität: hoch (ergänzt I-FW-12).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

(Gemeinsame: W-FW-01, W-FW-02 [Lagerkennzahlen, Meldebestand — 2.2], W-FW-03 [ABC/XYZ — 3 Dateien].)

**Glossar — G-LOG-01:** ca. 100–120 Einträge (15 Themen), Schwerpunkt Abkürzungen und Rechtsbegriffe (CMR, ADR, ATLAS, EORI, TMS, WMS, EDI, FTL/LTL, TEU, Lademeter, Frachtführer/Spediteur, Konnossement, Cross-Docking, Milk-Run, Kommissionierung). Wirkung hoch, weil die Branche sehr abkürzungsreich ist. Aufwand M; Risiko: Rechtsbegriffe (HGB, CMR) Stand prüfen; Priorität: hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Lernpfade.**
- **L-LOG-01 · Verkehrsträgerwahl für eine Auslandssendung bei Fracora** (Instrument I-LOG-01; Stationen: Anforderungen, Verkehrsträger, Dokumente (I-LOG-04), Incoterm (I-FW-12), Kosten (W-LOG-01), Entscheidung). Aufwand M, Priorität hoch.
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____
- **L-LOG-02 · ABC-/XYZ-Analyse im Lager (I-FW-04)** — Aufwand M, Priorität mittel (gemeinsam mit L-IND-01 entwickelbar).
  - ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Prüfungs-Rahmen — P-LOG-01:** `pruefungsbereiche` = drei Bereiche (hb1–hb3) mit je Aufgabenstellung 300 Min.; `pruefungsablauf` (50/50, 2 × 300 Min., mündlich 10 + 20 Min., Gewichtung 1/3 : 2/3, Zwei-Jahres-Frist); `presentationMinutes: 10`. **Zusatzbedarf:** Checkliste „Kurzbeschreibung und Gliederung zum zweiten schriftlichen Prüfungstermin einreichen“ und Themenregel (Bereich 1 oder 2, verknüpft mit Bereich 3) im Präsentationstrainer. Aufwand S (Zusatz-Checkliste S–M), Priorität hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## 4. Gemeinsames der vier Kurse (damit nichts doppelt gebaut wird)

### 4.1 Gemeinsame Vorschläge

Legende Einsatz: ● hohe Passung (Beleg im Content), ○ möglich/unsicher, – nicht sinnvoll. Spalten: IND / TEC / WIR / LOG.

| Kennung | Vorschlag | Einsatz | Aufwand | Priorität |
|---|---|---|---|---|
| I-FW-01 | Kalkulationsschema (Zuschlagskalkulation) als Zonen-Instrument | ● ● ● ● (LOG: Fracht-Variante) | S | hoch |
| I-FW-02 | Kostenarten-Matrix 2×2 (fix/variabel × Einzel/Gemein) | ● ● ● ○ | S | mittel |
| I-FW-03 | Break-even-/Deckungsbeitragsdiagramm | ● ● ● – (LOG nur Teilkosten, 0 Break-even-Treffer) | S–M | hoch |
| I-FW-04 | ABC-/XYZ-Matrix (3×3) | ● ● ● ● | M | hoch |
| I-FW-05 | Marketing-Mix 4P (LOG: 7P Dienstleistung) | ● ○ ● ○ | S | mittel |
| I-FW-06 | Produktportfolio (BCG-Matrix, 4 Felder) | ● ○ ● ○ | S | mittel |
| I-FW-07 | Produktlebenszyklus (5 Phasen; Content fehlt, 0 Treffer) | ○ – ○ – | S + Content | niedrig |
| I-FW-09 | Führungsstile (autoritär/kooperativ/Laissez-faire) | ● ● ● ● | S | mittel |
| I-FW-10 | Ursache-Wirkungs-Diagramm (Ishikawa, 6M) | ● ● – ○ | S | hoch (TEC, IND) |
| I-FW-12 | Incoterms 2020 nach Gruppen (E, F, C, D) | ● ● ● ● | S | hoch |
| I-FW-13 | Finanzierungs-Matrix (Außen/Innen × Eigen/Fremd) | ● – ● – | S | mittel |
| I-FW-14 | Maslow-Pyramide / Herzberg-Zwei-Faktoren | ● ● ● ○ | S | niedrig–mittel |
| I-FW-15 | Teamphasen nach Tuckman (Forming … Performing) | ● ● ○ ● | S | mittel |
| W-FW-01 | Kalkulations- und Break-even-Rechner | ● ● ● ● | M | hoch |
| W-FW-02 | Bestell- und Lagerrechner (Andler, Sicherheits-/Meldebestand, Umschlag, Lagerdauer) | ● ● ● ● | M | hoch |
| W-FW-03 | ABC-/XYZ-Trainer (Kumulieren, Klassen) | ● ● ● ● | M | hoch |
| W-FW-04 | Investitionsrechner (Amortisation, Kapitalwert, Annuität) | ● ○ ● – | M | mittel |
| W-FW-05 | Netzplan-Trainer freischalten (nur Konfig) | ○ ○ – – | S | niedrig |
| W-FW-06 | Produktions- und Instandhaltungskennzahlen-Rechner (Produktivität, Wirtschaftlichkeit, Auslastung, Ausschussquote, OEE, Verfügbarkeit) | ● ● – – | M | mittel |
| S-FW-01 | Kalkulations-/Rechen-Sprint (serverseitig erzeugte Aufgaben, wie Zahlensysteme-Sprint) | ● ● ● ● | L | mittel |
| S-FW-02 | Prozess-Reihenfolge (Verallgemeinerung von Code-Reihenfolge: Beschaffungs-, Mahn-, Kündigungs-, Wareneingangsprozess) | ● ● ● ● | M | mittel |
| S-FW-03 | Fehlersuche in der Rechnung (Verallgemeinerung von Bug-Hunt: „welche Zeile der Kalkulation ist falsch?“) | ● ● ● ● | M | mittel–hoch |
| G-FW-01 | gemeinsames WBQ-Glossar (wq1–wq4/wbq1–wbq4; 4 Fachgebiete, ≈ 80 Einträge) für IND/TEC/WIR | ● ● ● – | M | hoch |
| L-FW-01 | Freischaltung des vorhandenen BSC-Lernpfads (Nordstern) | ● ● ● – | S (Seed je Kurs) | mittel |
| P-FW-01 | gemeinsame Konfig-Bausteine Prüfungsablauf (Gewichte, Mindestpunkte, Ergänzungsprüfung) | ● ● ● ● | S | hoch |

**Hinweise zu den gemeinsamen Vorschlägen**

- **I-FW-01 Kalkulationsschema.** Zonen: Materialkosten, Fertigungskosten, Herstellkosten, Selbstkosten, Angebotspreis; Begriffe: Fertigungsmaterial, Materialgemeinkosten, Fertigungslöhne, Fertigungsgemeinkosten, Verwaltungs-/Vertriebsgemeinkosten, Gewinnzuschlag, Kundenskonto/-rabatt. Beleg: „Zuschlagskalkulation“ in je 3 Dateien (IND/TEC/WIR/LOG); im Logistik-Content bereits als Hierarchie-Item (Q-1.3-02). Das Instrument ergänzt die Textfrage um das Schema selbst. Risiken: Schemavarianten (Handelskalkulation vs. Industrie) → je Kurs eigene Zonen-/Begriffsliste, aber ein gemeinsames Modell mit konfigurierbaren Zonen-Beschriftungen wäre eleganter (Mehraufwand M).
- **I-FW-03 Break-even-Diagramm.** Zonen/Beschriftungsfelder: Erlöslinie, Gesamtkostenlinie, Fixkostenblock, Break-even-Punkt, Gewinnzone, Verlustzone. Beleg: „Break-even“ in 5 WIR-Dateien (2.3 hat eigenen Abschnitt), 3/3 in IND/TEC.
- **I-FW-04 ABC-/XYZ-Matrix.** 3×3-Felder (AX … CZ) mit Strategien (A/X: Just-in-Time, A/Z: Sicherheitsbestand/Überwachung, C/X: automatisierter Nachschub, C/Z: Lagerhaltungs-Verzicht o. ä.). Beleg: ABC in 6/4/4/3, XYZ in 3/1/4/3 Dateien. 9 Zonen übersteigt das bisherige Maximum (7) → UI-Test auf Handy.
- **W-FW-01 Kalkulations- und Break-even-Rechner.** Eingaben: Einzelkosten, Zuschlagssätze, Gewinnzuschlag, Skonto/Rabatt (Vorwärts-/Rückwärts-/Differenzkalkulation); Stückzahl, Preis, variable Stückkosten, Fixkosten; Maschinenstundensatz (Kalkulatorische Abschreibung + Zinsen + Raum-/Energiekosten ÷ Laufzeit). Ausgaben: Selbstkosten, Angebotspreis, Deckungsbeitrag je Stück/gesamt, Break-even-Menge/-umsatz, Preisuntergrenze, Sicherheitsabstand; Zufallsaufgaben-Modus mit Lösungsweg, wie beim Netzplan-Trainer. Im Browser rein clientseitig machbar. Risiko: einheitliche Rundungsregeln (2 Nachkommastellen) und Schreibweisen der Prüfer (Zuschlag auf welche Basis?) in der Hilfe festhalten.
- **W-FW-02 Bestell- und Lagerrechner.** Optimale Bestellmenge nach Andler: q = √((2 × Jahresbedarf × Bestellkosten) ÷ (Preis × Lagerhaltungskostensatz)) mit den Prämissen konstanter Verbrauch, feste Preise, keine Mengenrabatte [Q34], [Q35]; Meldebestand = Tagesverbrauch × Wiederbeschaffungszeit + Sicherheitsbestand; Durchschnittsbestand, Umschlagshäufigkeit, durchschnittliche Lagerdauer. Für IND auch Losgröße (Rüstkosten statt Bestellkosten). **Content-Lücke:** „Andler“ 0 Treffer, „Bestellmenge“ in 5/3/5/1 Dateien — Theorietexte ergänzen (sonst bleibt der Rechner unbegründet).
- **W-FW-06 Produktionskennzahlen.** OEE = Verfügbarkeit × Leistungsgrad × Qualitätsrate [Q36]; Beleg: OEE in 5 TEC- und 1 IND-Datei.
- **S-FW-01 Kalkulations-/Rechen-Sprint.** Technische Machbarkeit wie beim Subnetting-/Zahlensystem-Sprint (serverseitig erzeugte Aufgaben mit Token); deshalb L. Aufgaben: Prozent-/Dreisatzrechnung, Skonto, Kalkulation, DB, Break-even, Andler (gerundet). Keine Belohnung, nur Bestwert-Anzeige.
- **S-FW-02/-03:** Das Gerüst von Code-Reihenfolge und Bug-Hunt ist Content-getrieben (`zeilen`, `fehlerZeile`), Schriftart und Beschriftung („Code“, „Zeile“) müssten für Fließtextzeilen/Rechenschritte angepasst werden; daher M statt S.

### 4.2 Gemeinsamkeiten und Unterschiede der vier Kurse

| Aspekt | IND | TEC | WIR | LOG |
|---|---|---|---|---|
| WBQ (Wirtschaftsbezogene Qualifikationen) | ja (identisch) | ja (identisch) | ja (identisch) | **nein** |
| Technische Qualifikationen | nein | **ja (TQ)** | nein | nein |
| Handlungsbereiche | 5 | 4 | 5 | 3 |
| Schriftlich HQ | 2 Aufgaben, 480–510 Min. | 1 Situationsaufgabe 240–300 Min. | 2 Aufgaben, 480–510 Min. | 2 × 300 Min. |
| Mündlich | ca. 10 + 20 Min. | ≤ 30 Min. (Aufteilung IHK-abhängig) | ≤ 30 Min., Schwerpunkt Führung | ≤ 10 + ≤ 20 Min. |
| Gesamtnote | 25/50/25 | 15/15/45/25 | 25/50/25 | 50/50 |
| Kern-Instrumente | Produktion, Beschaffung, Wissensmanagement | DIN-Normen, Arbeitsschutz, Werkstoffe | Rechnungswesen, Controlling, Kommunikation | Verkehrsträger, Gefahrgut, Dokumente, Incoterms |
| Kern-Werkzeuge | Kalkulation, Lager, OEE | technischer Rechentrainer, Passungsrechner | Kalkulation, Investition, Nutzwert | Frachtrechner, Lenkzeiten, Tourenplanung |

**Wiederverwendung über die Kursgruppe hinaus:** Kalkulations-/Break-even-Rechner, Lagerrechner, ABC-/XYZ-Trainer und die gemeinsamen Instrumente sind laut Content auch in anderen Fachwirt-Kursen (Handelsfachwirt, Immobilienfachwirt, Büro-Fachwirt) denkbar; hier **nicht** geprüft (andere Kursgruppe) — Abstimmung mit den anderen Kursprofilen empfohlen, damit W-FW-01…04 nur einmal gebaut werden.

**Empfohlene Reihenfolge (Vorschlag, nicht verbindlich):**
1. Konfiguration ohne neue Technik: P-xx-01 (Prüfungs-Rahmen), Ausblendung unpassender Instrumente/Werkzeuge je Kurs, Titel-Anpassung „Hierarchie“ (Aufwand S).
2. Wiederverwendbare Rechenwerkzeuge: W-FW-01, W-FW-02, W-FW-03 (M) — nützen allen vier Kursen.
3. Pro Kurs je 2–3 Kern-Instrumente: I-IND-03/04, I-TEC-01/02/03, I-WIR-01/04, I-LOG-01/03/04.
4. Glossare (G-FW-01 plus kursspezifische) und Spiele-Sets (Content-only).
5. Lernpfade und neue Spieltypen (S-FW-01, S-FW-02) zuletzt.

---

## 5. Offene Fragen an den Produktinhaber

1. **Ausblenden auf Typ- oder Item-Ebene?** Die Kachel hängt am Instrumententyp. Einzelne unpassende Items (z. B. Gantt für den Kündigungsschutzprozess im TEC-Kurs) bleiben bei Typ-Ausblendung sichtbar. Sollen solche Items im Content umgewandelt werden (z. B. in „Sortieren“) oder genügt „Typ je Kurs ausblenden“?
2. **Kachel „Projektstrukturplan / Organigramm“:** Umbenennung in „Gliederungsbaum“ (oder je Kurs eigener Titel) gewünscht?
3. **Risikomatrix:** Beibehalten als 2×2-Handlungsstrategie-Raster oder durch klassische Wahrscheinlichkeit × Auswirkung (3×3) ersetzen? Das betrifft auch den Büro-Fachwirt und alle weiteren Kurse.
4. **Prüfungsdauern:** Es gibt Abweichungen zwischen Verordnungstext (z. B. WBQ 60/90/60/90) und IHK-Veröffentlichungen (teils 75 Min.), und die Aufteilung Präsentation/Fachgespräch beim Technischen Fachwirt ist IHK-abhängig. Soll die App die Verordnungswerte mit Hinweis „Details legt deine IHK fest“ zeigen (Empfehlung) oder eine bestimmte IHK abbilden?
5. **Titelzusatz „Bachelor Professional“:** Für Industrie-, Technischer und Wirtschaftsfachwirt nicht geprüft; Transport/Logistik trägt den Titel bereits. Wunsch?
6. **Content-Lücken vor Instrumenten füllen?** Andler-Formel, Lean/Verschwendungsarten, Produktlebenszyklus, Frachtgewichts-Berechnung, Lieferkettensicherheit (Pflichtinhalt LOG § 5), Entsorgungslogistik, Fertigungsorganisation — jeweils zuerst Theorie/Items ergänzen, dann Instrument/Werkzeug?
7. **Neue Spieltypen:** Ist ein serverseitiger Rechen-Sprint (L) gewünscht, oder genügen die reinen Content-Sets plus das clientseitige Rechenwerkzeug? Soll „Code-Reihenfolge“ verallgemeinert (Prozess-Reihenfolge) oder ein eigener Typ angelegt werden?
8. **Normen und Urheberrecht:** Einverstanden, dass DIN-/ISO-/ICC-Texte (DIN 8580, 31051, ISO 286, Incoterms 2020) nur in eigenen Worten und ohne Tabellen verwendet werden?
9. **Netzplan-Trainer:** Für Industriefachwirt (Projektmanagement im Wissens-/Transfermanagement) freischalten, obwohl kein Netzplan-Content existiert?
10. **Fiktivfirmen für Lernpfade:** Solvitec (IND), Vantera (TEC), Fracora (LOG); für WIR kein Firmenname im Content gefunden (**unsicher**) — neue Fiktivfirma gewünscht?
11. **Prüfblätter:** Soll wie bei den Fachinformatikern je Vorschlag (Glossar, Werkzeuge, Lernpfade) ein Prüfblatt für die fachliche Prüfung erzeugt werden?
12. **Geltungsdatum:** Rechtsstände (ADR, VO 561/2006, HGB, KrWG) ändern sich; Sollen Glossar/Werkzeuge ein „Stand“-Datum anzeigen?

---

## Quellenliste

Die Abrufe erfolgten am 06.10.2026. Hinweis: Web-Zusammenfassungen wurden nur für Prüfungsstruktur-Angaben aus den Rechtsverordnungen verwendet; übrige Angaben stammen aus Lehrbuch-/IHK-Seiten oder dem Content und sind als solche gekennzeichnet; Abweichungen sind im Text mit „unsicher“ markiert.

- [Q1] Industriefachwirt-Prüfungsverordnung, Eingang: https://www.gesetze-im-internet.de/indfachwirtprv_2010/BJNR083300010.html
- [Q2] dieselbe Verordnung (Prüfungsteile, Dauer, Gewichtung): https://www.gesetze-im-internet.de/indfachwirtprv_2010/BJNR083300010.html
- [Q3] DIHK-Bildungs-GmbH, Prüfung Industriefachwirte: https://www.dihk-bildungs-gmbh.de/pruefungen/ihk-pruefungen/industriefachwirte ; IHK, Informationen zur Prüfung Industriefachwirt: https://www.ihk.de/blueprint/servlet/resource/blob/6677756/c598033a3c6292742ffefabb70fc856c/informationen-zur-pruefung-industriefachwirt-data.pdf (nur über Suchergebnis geprüft)
- [Q4] IndFachwirtPrV 2010 § 5 (Handlungsspezifische Qualifikationen): https://www.gesetze-im-internet.de/indfachwirtprv_2010/__5.html
- [Q5] IHK Südlicher Oberrhein, Hinweise zur mündlichen Prüfung Industriefachwirt: https://www.ihk.de/freiburg/bildung/weiterbildung/2weiterbildungspruefungen/industriefachwirt/hinweise-zur-muendlichen-pruefung-indfw-4077762 (Suchergebnis); Merkblatt IHK Arnsberg: https://www.ihk-arnsberg.de/upload/Merkblatt_zum_Situationsbez_Fachgespraech_26682.pdf (PDF nicht lesbar abgerufen)
- [Q6] Technischer Fachwirt (TechFachwPrV): https://www.gesetze-im-internet.de/techfachwprv/BJNR006600006.html
- [Q7] IHK Pfalz, Informationen zum Fachgespräch Technischer Fachwirt: https://www.ihk.de/pfalz/produktmarken/ausbildung/weiterbildungspruefungen/weiterbildungspruefungen/tfw-informationen-zum-situationsbezogenen-fachgespraech-6079458 (Suchergebnis, Zeitaufteilung dort 15 + 15 Min., IHK-abhängig)
- [Q8] DIN 8580, Hauptgruppen: https://de.wikipedia.org/wiki/Fertigungsverfahren ; DIN-Hinweis zur Aktualisierung Hauptgruppe Fügen: https://www.din.de/de/mitwirken/normenausschuesse/natg/aktuelles/ordnungssystem-der-fertigungsverfahren-geplante-aktualisierung-der-hauptgruppe-4-fuegen--1039892
- [Q9] DIN 31051 Grundmaßnahmen: https://adasma.de/blog/din-31051-einfach-erklaert-wartung-inspektion-instandsetzung-und-verbesserung/
- [Q10] STOP-Prinzip: https://www.bg-verkehr.de/arbeitssicherheit-gesundheit/themen/gefahrstoffe/schutzmassnahmen/stop-prinzip ; https://vorschriften.bgn-branchenwissen.de/daten/tr/trgs500/5.htm
- [Q11] KrWG § 6 Abfallhierarchie: https://dejure.org/gesetze/KrWG/6.html
- [Q12] Wirtschaftsfachwirt (WFachwPrV): https://www.gesetze-im-internet.de/wfachwprv/BJNR175200008.html
- [Q13] IHK Nürnberg, Wirtschaftsfachwirt: https://www.ihk-nuernberg.de/weiterbildung/weiterbildungspruefungen/gepruefte-r-wirtschaftsfachwirt-in ; IHK Darmstadt Handreichung: https://www.ihk.de/darmstadt/produktmarken/pruefungen/pruefungeninderweiterbildung/alle-pruefungen-inkl-intranet/wifw-handreichung-6557576 (Suchergebnisse)
- [Q14] GüLogFachwBAProFV, Gesamttext: https://www.gesetze-im-internet.de/g_logfachwbaprofv/
- [Q15] § 4: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__4.html
- [Q16] § 5: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__5.html
- [Q17] § 6: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__6.html
- [Q18] § 7: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__7.html
- [Q19] IHK Köln, Fachwirt Güterverkehr und Logistik (Zulassung, Ablauf): https://www.ihk.de/koeln/hauptnavigation/weiterbildung/fortbildungspruefungen/fachwirt-gueterverkehr-und-logistik-5029110
- [Q20] § 8: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__8.html
- [Q21] § 9: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__9.html
- [Q22] §§ 10–11: https://www.gesetze-im-internet.de/g_logfachwbaprofv/__10.html ; https://www.gesetze-im-internet.de/g_logfachwbaprofv/__11.html
- [Q23] ADR-Klassen: https://www.cargolo.com/de/hilfe/gefahrgutklassen/
- [Q24] KRAVAG zu Betrugsmaschen bei Speditionen: https://www.verkehrsrundschau.de/nachrichten/transport-logistik/kravag-warnt-neue-betrugsmasche-trifft-speditionen-3822320
- [Q25] Eurotransport, Betrugsmaschen im Güterverkehr: https://www.eurotransport.de/logistik/spedition-und-logistik/betrugsmaschen-im-gueterverkehr-nehmen-zu-betrugsmaschen-im-gueterverkehr-nehmen-zu/
- [Q26] Beer distribution game: https://en.wikipedia.org/wiki/Beer_distribution_game
- [Q27] Forio, MIT Beer Game Simulation: https://forio.com/catalog/mit-beer-game-supply-chain-simulation ; Planspiele im Wirtschaftsunterricht: https://lehrerfortbildung-bw.de/u_gewi/wirtschaft/gym/bp2004/fb1_2/06_sim/plan/uebersicht/index.html
- [Q28] Frachtpflichtiges Gewicht (Richtwerte, keine Rechtsgrundlage genannt): https://mhv.systems/lexikon/frachtpflichtiges-gewicht-berechnung-volumen-realgewicht-praxis
- [Q29] VO (EG) 561/2006, IHK-Merkblatt: https://www.ihk.de/blueprint/servlet/resource/blob/3478376/e1880507c2a8fb08ac5e05c490dcc5bf/merkblatt-lenk-und-ruhezeiten-1--data.pdf
- [Q30] Lenk- und Ruhezeiten, Überblick: https://gefahrgut-consulting.de/lenk-und-ruhezeiten/
- [Q31] Savings-Verfahren (Clarke/Wright): https://metricgate.com/docs/vehicle-routing-savings-clarke-wright/ ; http://www.pom-consult.de/PMTHilfe/CWVRP.Htm
- [Q32] Incoterms 2020, IHK: https://www.ihk.de/nordschwarzwald/international/export/allgemeine-grundlagen/incoterms-2010-4579400
- [Q33] Incoterms 2020, IHK Essen: https://www.ihk.de/meo/international/export/zoll-und-verfahrensfragen/incoterms-2020-4851024
- [Q34] Andler-Formel: https://studyflix.de/wirtschaft/optimale-bestellmenge-1524
- [Q35] Optimale Bestellmenge, Prämissen und Grenzen: https://repleno.com/de/blog/optimale-bestellmenge-berechnen
- [Q36] OEE: https://de.wikipedia.org/wiki/Gesamtanlageneffektivit%C3%A4t (genannte Normen: ISO 22400-2, VDI 3423)
- Weitere (nur Hintergrund, nicht zitiert): FMEA/Action Priority: https://gbn-experts.de/qualitaetsmanagement/fmea-nach-vda-aiag/ ; https://www.quality.de/lexikon/rpz-risikobewertung/ (Anlass für den Hinweis, dass die Risikomatrix-/FMEA-Systematik als eigenes Instrument I-xx-FMEA erst nach Content-Aufbau sinnvoll ist — FMEA ist im Content nur in 3 IND- und 2 TEC-Dateien erwähnt und als Instrument nicht vorgeschlagen).
