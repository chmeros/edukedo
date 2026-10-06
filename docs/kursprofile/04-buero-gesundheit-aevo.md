# Kursprofil-Vorschlag: Fachwirt Büro/Projektorganisation, Fachwirt Gesundheit/Soziales und AEVO (Entscheidungsvorlage)

Stand: 06.10.2026 · Status: **Entwurf zur Freigabe, keine Umsetzung.** Alle Vorschläge sind Angebote; umgesetzt wird nur, was in der Freigabezeile mit „ja“ oder „ändern“ markiert ist.
Blaupause: Fachinformatiker/in Anwendungsentwicklung (Instrumente, Spiele, Übungswerkzeuge, Glossar, geführte Lernpfade, Prüfungs-Rahmen). Mathematik ist nicht Teil dieser Vorlage.

Quellenangaben in eckigen Klammern (z. B. [Q7]) verweisen auf die Quellenliste am Ende. Prüfungsaufgaben Dritter wurden nicht übernommen; abgeleitet wurden nur Themen und Strukturen. Alle fachlichen Inhalte wären neu und in eigenen Worten zu formulieren und vor Livegang fachlich zu prüfen (Prüfblatt-Verfahren wie bei den IT-Inhalten, siehe `docs/pruefblaetter/`).

## Kurzfassung

1. **Bestand:** Nur der Büro-Fachwirt hat heute echte Fachwerkzeuge (8 Zuordnungs-Instrumente, Netzplan-Trainer, 3 Spiele, BSC-Lernpfad). Gesundheit hat 5 Instrumente und sonst nichts; AEVO hat gar nichts (nur Quiz, Fachgespräch, Präsentationstrainer).
2. **Bestandsurteil Büro:** Alle Instrumente und der Netzplan passen. Ansoff ist „unsicher“. Von den drei Spielen passt nur das Personal-Memory sicher; Finanzkennzahlen-Kreuzworträtsel und QM-Duell sind „unsicher“, weil viele Begriffe (EBITDA, Cashflow, Verschuldungsgrad, First-Pass-Yield, Durchlaufzeit) in der Kurstheorie nicht vorkommen.
3. **Büro, Empfehlung:** Projektphasen, Stakeholder-Matrix, ABC-Analyse, Kommunikationsquadrat, Konflikteskalation, Ishikawa, RACI, Tuckman als Instrumente; PM-Begriffe-Duell, Reihenfolge-Spiel, Kennzahlen-Sprint; Netzplan-Editor, Kennzahlen-Rechner, Besprechungsplaner; Glossar (~100); Lernpfade Projektphasen und PDCA; Prüfungs-Rahmen (10-Min.-Präsentation + ca. 40-Min.-Fachgespräch).
4. **Gesundheit, Empfehlung:** Zuerst vorhandene Instrumente mit Inhalt füllen (PDCA, Risikomatrix, BSC), dann Donabedian, Sozialleistungssysteme, Marketing-Mix, Kostenverhalten; Werkzeuge Break-even-Rechner, Personalbedarfsrechner, Dienstplan-Regelcheck; BSC-Lernpfad „Morgenlicht“ (Referenzdokument liegt schon vor); Glossar (~140); Prüfungs-Rahmen (6 Handlungsbereiche, Präsentation ca. 10 Min. + Fachgespräch bis 20 Min.).
5. **Gesundheit, Vorsicht:** Keine pflegerische oder medizinische Beratung, keine Leistungsbeträge/Pflegesätze als feste Zahlen (Rechtsstand ändert sich), keine „Pflegegrad-Rechner für Einzelfälle“.
6. **AEVO, Empfehlung:** Größter Nachholbedarf. Instrumente: Handlungsfelder, Vier-Stufen-Methode, Lernzielbereiche, Lernzielhierarchie, Beurteilungsfehler, Regelwerke, Mitwirkende, Ausbildungsverlauf. Werkzeuge: **Unterweisungs-Planer** (wichtigster Einzelbaustein), Lernziel-Check, Arbeitszeit-Check (JArbSchG), Ausbildungsplan-Zeitplaner.
7. **AEVO, Prüfung:** schriftlich ca. 3 Std. fallbezogen aus allen Handlungsfeldern; praktisch Präsentation (max. 15 Min.) oder praktische Durchführung einer Ausbildungssituation plus Fachgespräch, zusammen höchstens 30 Min. [Q12]. Der Rahmenplan wurde zum 01.07.2024 überarbeitet (Digitalisierung, Nachhaltigkeit, Diversität) [Q13]; im Kurs-Content fehlen „Nachhaltigkeit“ und „Lernziele“ ganz.
8. **Gemeinsames:** Drei neue Spiel-Engines (Reihenfolge, Rechen-Sprint, Dokument-Detektiv), ein gemeinsamer Arbeitszeit-Prüfer (ArbZG/JArbSchG), vier kursübergreifende Zonen-Modelle (Kommunikationsquadrat, Tuckman, Stakeholder, Glasl) sowie ein kursweiser Instrumente-Filter statt „noch nicht verfügbar“.
9. **Aufwand grob:** Zonen-Instrumente je S (Content ~3 Fragen + Illustration); Werkzeuge M; Lernpfade M; Glossar M; Spiele S (Content in vorhandener Engine) bis M (neue Engine).
10. **Offene Fragen** stehen in Abschnitt 5; die wichtigste: Dürfen die zwei „unsicheren“ Büro-Spiele (1:1 aus früherer Nutzer-Vorgabe) gekürzt oder ersetzt werden?

---

## Vorab: Ist-Stand der Plattform (aus dem Code belegt)

- **Instrumente-Katalog** (`apps/web/src/Instrumente.tsx`, `INSTRUMENT_CATALOG`): 8 allgemeine Modelle (SWOT, BSC, Ansoff, Gantt, Eisenhower, PDCA, Risikomatrix, Hierarchie), 9 IT-Modelle, 6 Werkzeuge. Ein Quiz-Instrument erscheint in einem Kurs nur, wenn dort Content mit passendem Typ existiert; sonst steht es eingeklappt unter „Weitere Instrumente … in diesem Kurs noch nicht verfügbar“. Werkzeuge werden über `kurs.metadata.werkzeuge` freigeschaltet (`apps/api/src/db/import-content.ts`).
- **Büro-Fachwirt:** `werkzeuge: ["netzplan"]`; Content mit allen 8 allgemeinen Instrumenten (z. B. `hb1/1.3-projektmanagement.md`: Gantt, Eisenhower, PDCA, Risikomatrix, Hierarchie; `hb2/2.2`: SWOT, Ansoff; `hb4/4.1`: BSC). Spiele: Kreuzworträtsel Finanzkennzahlen, Kennzahlen-Duell QM/Prozesse, Kennzahlen-Memory Personal (`seed-games.ts`). Lernpfad: BSC „Nordstern GmbH“ (`seed-instrument-lernpfad.ts`). Quiz: 177 Fragen, 17 Themen-Dateien.
- **Gesundheit/Soziales:** keine `werkzeuge`, keine Spiele, kein Lernpfad, kein Glossar, kein `pruefungsablauf`. Instrument-Content nur für SWOT (3 Fragen), Hierarchie (2), Eisenhower (1), Gantt (1), Ansoff (1). Quiz: 301 Fragen, 24 Themen. Ein BSC-Lernpfad-Referenzdokument („Morgenlicht“, `content/instrumenten-lernpfade/user-story-bsc-pflegeeinrichtung-fachwirt-gesundheit-soziales.docx`) liegt vor, ist aber nicht importiert; BSC-Quizfragen fehlen im Kurs.
- **AEVO:** nichts außer Quiz (113 Fragen, 12 Themen-Dateien), Fachgespräch-Fragen je Handlungsfeld und `presentationMinutes: 15` (Präsentationstrainer).
- **Prüfungs-Tab** (`Pruefungsvorbereitung.tsx`): Schriftlich, Präsentation, Projekt (nur bei `kurs.metadata.projekt`), Fachgespräch, „Gelassen bleiben“. Letzterer zeigt für diese drei Kurse bislang „Prüfungsablauf hier noch nicht beschrieben“ (`Pruefungsangst.tsx`), weil `pruefungsablauf` fehlt.
- **Glossar** (F-165): content-autoriert in `glossar.md` je Fachgebiet; bei den Fachinformatiker-Kursen 157 Begriffe in 7 Fachgebieten (~22 je Fachgebiet), alle mit „Geprüft: nein“ bis zur Fachprüfung.

---

# Kurs A: Geprüfter Fachwirt für Büro- und Projektorganisation (`fachwirt-buero-projektorganisation`)

## A.1 Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | FachkBüroPrV 2012 (Verordnung vom 09.02.2012, zuletzt geändert 2019) | [Q1], [Q2] |
| Handlungsbereiche | 4: (1) Koordinieren von Entscheidungsprozessen im Rahmen betrieblicher Organisationsstrukturen, (2) Gestalten und Pflegen von Kundenbeziehungen in betrieblichen Leistungsprozessen, (3) Führen, Betreuen, Verwalten und Ausbilden im büro- und personalwirtschaftlichen Umfeld, (4) Steuern von Geschäftsprozessen im bürowirtschaftlichen Umfeld | [Q1] |
| Schriftlich | Auf Basis einer betrieblichen Situationsbeschreibung zwei gleichgewichtige, offene Aufgabenstellungen, alle vier Handlungsbereiche situationsbezogen; Gesamtdauer 600 Minuten (IHK: zweimal 300 Minuten an zwei Tagen) | [Q1], [Q2], [Q3] |
| Mündlich | Setzt bestandenen schriftlichen Teil voraus. Präsentation höchstens 10 Minuten (zählt ein Drittel), Fachgespräch ca. 40 Minuten (zwei Drittel). Thema muss den Bereich „Führen, Betreuen, Verwalten und Ausbilden“ plus einen weiteren Handlungsbereich abdecken; Themenvorschlag (Formblatt) wird vor/zu Beginn der schriftlichen Prüfung eingereicht | [Q1], [Q2], [Q3], [Q4] |
| Bestehen/Gewichtung | In beiden Teilen mindestens 50 Punkte, ohne Rundung; schriftlich und mündlich zu gleichen Teilen | [Q1], [Q2] |
| Besonderheit | Die Prüfung ist situationsorientiert (keine Einzelfragen je Bereich); im Fachgespräch wird Ausbildungsbezug erwartet | [Q4] |

**Unsicherheiten:** (a) Ein IHK-Hinweisblatt nennt für den schriftlichen Teil 120 Minuten [Q5]; das widerspricht Verordnung und anderen IHK-Seiten und ist vermutlich veraltet. Verbindlich ist die Verordnung. (b) Die Fachgespräch-Dauer „ca. 40 Minuten“ stammt aus dem Abruf der Verordnungsseite und zwei IHK-Seiten; vor Übernahme in `pruefungsablauf` den Verordnungstext im Wortlaut gegenlesen. (c) Der DIHK-Rahmenplan [Q6] war nur teilweise lesbar; Inhalte (Netzplantechnik, Moderation, Konfliktmanagement, Prozessoptimierung, Kennzahlen) wurden nur grob bestätigt, nicht Wort für Wort.

## A.2 Bestandsbewertung

| Baustein (heute zugeordnet) | Urteil | Begründung und Beleg |
|---|---|---|
| Gantt-Diagramm (Instrument) | passt | Terminplanung/Projektsteuerung, Thema 1.3/1.2 (`hb1/1.3`, Q-1.3-14); Projektmanagement ist zentraler Bereich der Verordnung [Q1] |
| Eisenhower-Matrix | passt | Zeit- und Selbstmanagement, Thema 1.4 (`hb1/1.4`) |
| PDCA-Zyklus | passt | Qualität/Prozessoptimierung, Thema 1.2 |
| Risikomatrix | passt, mit Vorbehalt | Projektrisiken (Thema 1.3). Vorbehalt: nur 2×2-Vereinfachung statt üblicher 3×3 (Architekturplanung Abschnitt 13); Fachrichtigkeit wäre bei 3×3 höher |
| Hierarchie (PSP/Organigramm) | passt | „Projektstrukturplan erstellen“ in 2.1, Organisationsstrukturen in HB1; 5 Theorie-Dateien erwähnen PSP |
| SWOT-Matrix | passt | Marktanalyse/Zielgruppen, Thema 2.2 |
| Ansoff-Matrix | unsicher | Wachstumsstrategie ist eher Marketing-/Strategie-Stoff (Wirtschafts-/Handelsfachwirt); im Büro-Rahmenplan nicht belegt, nur im Kurs-Content (`hb2/2.2`). Entscheidung Produktinhaber |
| Balanced Scorecard + Lernpfad „Nordstern GmbH“ | passt | Steuerungsinstrument in 4.1 genannt; Lernpfad existiert und ist Blaupause |
| Netzplan-Trainer (Werkzeug) | passt | Netzplan-Theorie samt FAZ/FEZ/Puffer in `hb1/1.2`; Netzplantechnik gehört zu den Rahmenplan-Schwerpunkten [Q6, nur grob bestätigt] |
| Kreuzworträtsel „Finanzkennzahlen“ | unsicher | Begriffe (u. a. EBITDA, Cashflow, Verschuldungsgrad, Deckungsbeitrag) kommen in der Kurstheorie nicht vor (Suche in `content/fachwirt-buero-projektorganisation`: 0 Dateien; „Eigenkapitalquote“ 1 Datei). 4.1 behandelt Kennzahlen „im bürowirtschaftlichen Umfeld“ (Investition, Finanz, Personal …). Quelle des Spiels: frühere Nutzer-Vorgabe 1:1 |
| Kennzahlen-Duell „QM und Prozesse“ | unsicher (teilweise passend) | Reklamations-/Nacharbeitsquote und Terminhaltung passen zu 1.2 (Dienstleistungsqualität, Beschwerden); „Ausschussquote“, „First-Pass-Yield“, „Durchlaufzeit“ sind in der Theorie nicht vorhanden und eher fertigungsnah |
| Kennzahlen-Memory „Personal“ | passt | Personalwirtschaft Thema 3.1; Fluktuation/Krankenstand in der Theorie |
| IT-Instrumente, Subnetting, SQL usw. | passt nicht | kein IT-Bezug; werden künftig ausgeblendet |

**Folge (bei Freigabe):** Anzeige im Büro-Kurs nur für Allowlist-Typen; „Weitere Instrumente … noch nicht verfügbar“ entfällt. Ansoff und die zwei „unsicheren“ Spiele bleiben bis zur Entscheidung unverändert.

## A.3 Neue Vorschläge

### A.3.1 Instrumente (Zonen-Zuordnung, wo nicht anders genannt)

**I-BUE-01 — Projektphasen** (Zonen-Zuordnung, 4 Zonen: Initiierung/Definition · Planung · Durchführung/Steuerung · Abschluss/Evaluation)
- Beschreibung: Tätigkeiten (z. B. Projektauftrag klären, Meilensteine festlegen, Soll-Ist-Vergleich, Abschlussbericht) der Phase zuordnen.
- Nutzen: Strukturgerüst für jede Situationsaufgabe und die Präsentation zum Projektthema.
- Passung: Thema 1.3 gliedert genau so (Projektauftrag analysieren, Start vorbereiten, steuern, kontrollieren, dokumentieren, evaluieren); Rahmenplan-Bereich Projektmanagement [Q6].
- Aufwand: S · Priorität: **hoch**
- Risiken: Phasenbezeichnungen variieren je Lehrbuch/Norm; Bezeichnungen der Kurstheorie verwenden, nicht fremde Standards.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-02 — Stakeholder-Matrix** (4 Zonen: Eng einbinden · Zufriedenstellen · Informieren · Beobachten; Achsen Einfluss/Interesse)
- Beschreibung: Beteiligte eines Beispielprojekts nach Einfluss und Interesse einordnen.
- Nutzen: Prüfungsrelevant für Projektstart/Kommunikation; Alltagswerkzeug.
- Passung: Methode ist Standard bei GPM/IPMA [Q22]. Im Kurs-Content nur 1 Datei mit „Stakeholder“; Theorieabschnitt wäre zu ergänzen. Rahmenplan-Beleg unsicher.
- Aufwand: S (+ kurzer Theorieabschnitt) · Priorität: **hoch**
- Risiken: Feldbezeichnungen uneinheitlich (englisch „manage closely“ usw.); eine deutsche Variante festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-03 — ABC-Analyse** (3 Zonen: A · B · C)
- Beschreibung: Artikel/Lieferanten/Kunden anhand von Mengen- und Wertanteil der Klasse zuordnen und passende Handlungsempfehlung wählen.
- Nutzen: Einkauf/Beschaffung (Thema 4.2) und Priorisierung.
- Passung: „ABC-Analyse“ kommt bereits in 4 Theorie-Dateien vor.
- Aufwand: S · Priorität: **hoch**
- Risiken: Grenzwerte (z. B. 80/15/5) sind Richtwerte; in der Frage als „üblich“ kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-04 — Kommunikationsquadrat** (4 Zonen: Sachinhalt · Selbstoffenbarung · Beziehung · Appell)
- Beschreibung: Botschaften (E-Mail-Sätze, Kundenaussagen) der betonten Seite zuordnen.
- Nutzen: Kundenkommunikation, Beschwerden, Konflikte, Moderation (Themen 2.5, 3.3, 3.4).
- Passung: Büro-Content enthält das Modell nicht (0 Treffer), Gesundheits-Content schon; Rahmenplan-Bereich Kommunikation [Q6, grob]. Gemeinsam mit I-GES-08/AEVO nutzbar (Abschnitt 4).
- Aufwand: S (Modell einmalig, Content je Kurs) · Priorität: mittel
- Risiken: Modell ist ein Lehrmodell, keine Norm; Beispiele eindeutig wählen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-05 — Konflikteskalation nach Glasl** (3 Zonen für die Ebenen: 1 Verhärtung/Debatte, 2 Strategien/Koalitionen, 3 Zerstörung; alternativ 9 Stufen)
- Beschreibung: Konfliktverhalten der Ebene/Stufe zuordnen und passende Intervention wählen.
- Nutzen: Konfliktmanagement (Thema 3.3) ist eigener Prüfungsinhalt.
- Passung: „Eskalation/Glasl“ in 4 Dateien (`hb3/3.3`).
- Aufwand: S · Priorität: mittel
- Risiken: Stufenbezeichnungen unterscheiden sich je Quelle; die der Kurstheorie verwenden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-06 — Ursache-Wirkung nach Ishikawa (6M)** (6 Zonen: Mensch · Maschine · Material · Methode · Milieu · Messung)
- Beschreibung: Ursachen für ein Büroproblem (z. B. verspätete Rechnungen) einer Kategorie zuordnen.
- Nutzen: Prozess-/Qualitätsverbesserung (Thema 1.2).
- Passung: Q7-Werkzeug [Q24, nur Suchtreffer]; im Kurs-Content nicht enthalten; Rahmenplan-Beleg unsicher.
- Aufwand: S (+ Theorieabschnitt) · Priorität: niedrig
- Risiken: Kategorien in Büro-Kontext teils abstrakt (Maschine = IT/Software); Beispiele sorgfältig wählen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-07 — RACI-Verantwortungsmatrix** (4 Zonen: Responsible · Accountable · Consulted · Informed)
- Beschreibung: Aufgaben-Rollen-Beispiele den vier Rollen zuordnen.
- Nutzen: Rollen im Projekt und Delegation.
- Passung: Standardmethode [Q23]; im Kurs-Content 0 Treffer; Rahmenplan-Beleg unsicher.
- Aufwand: S (+ Theorieabschnitt) · Priorität: niedrig
- Risiken: Begriffsvarianten (RASCI, RACI-VS); eine Variante festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-BUE-08 — Teamphasen nach Tuckman** (5 Zonen: Forming · Storming · Norming · Performing · Adjourning)
- Beschreibung: Teamverhalten der Phase zuordnen.
- Nutzen: Personalführung/Teamarbeit, Moderation.
- Passung: Büro-Content 0 Treffer, Gesundheits-Content 3 Dateien (`hb3/3.2`). Gemeinsam mit I-GES-07.
- Aufwand: S (+ Theorieabschnitt) · Priorität: niedrig bis mittel
- Risiken: Fünfte Phase (Adjourning) wird nicht in jedem Lehrbuch geführt; konsistent mit der Kurstheorie halten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### A.3.2 Spiele

**S-BUE-01 — Begriffe-Duell „Projektmanagement: A oder B“** (Typ: Begriffe-Duell, vorhandene Engine)
- Inhalt: 20 Entweder-oder-Fragen in 4 Runden (Auftrag/Planung/Steuerung/Abschluss), z. B. Lastenheft oder Pflichtenheft, Gesamtpuffer oder freier Puffer, Meilenstein oder Vorgang, PSP oder Terminplan.
- Nutzen: Begriffssicherheit für Situationsaufgaben. Passung: Themen 1.2/1.3/2.1. Aufwand: S (nur Content) · Priorität: **hoch**
- Risiken: Eigene Formulierungen; keine Lehrbuchtexte übernehmen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-BUE-02 — Kreuzworträtsel „Büro- und Projektorganisation“** (Typ: Kreuzworträtsel, vorhandene Engine)
- Inhalt: 10 Begriffe aus HB1–HB4 (z. B. Meilenstein, Projektauftrag, Moderation, Beschwerdemanagement, Wissensmanagement); Gitter manuell prüfen (wie beim Bestandsspiel).
- Aufwand: S · Priorität: mittel
- Risiken: Gitterkonstruktion fehleranfällig; vorhandenen Verifizierungstest nutzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-BUE-03 — Reihenfolge-Spiel „Projekt- und Veranstaltungsablauf“** (NEUER Typ, Verallgemeinerung von „Code-Reihenfolge“; gemeinsame Engine, siehe Abschnitt 4)
- Inhalt: 10 Aufgaben, Schritte in die richtige Reihenfolge bringen (Projektphasen, Veranstaltungsablaufplan, Moderationsphasen, Beschwerdeprozess); Rückmeldung je Schritt.
- Nutzen: Ablaufdenken; Passung: Themen 1.3, 2.4, 3.4. Aufwand: M (Engine einmalig, danach S je Kurs) · Priorität: mittel
- Risiken: Mehrere gleichwertige Reihenfolgen vermeiden; nur eindeutige Abläufe.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-BUE-04 — Kennzahlen-Sprint** (Typ: Rechen-Sprint, Muster „Zahlen-Sprint“, zufällig erzeugte Aufgaben)
- Inhalt: Fluktuationsquote, Krankenquote, Amortisationsdauer, ABC-Anteile, Prozentrechnung, Auslastung; drei Stufen; Rechenweg nach der Antwort.
- Nutzen: Kennzahlen-Rechnen aus 3.1/4.1; Passung: Amortisationsdauer und Personalkennzahlen stehen in der Theorie. Aufwand: M · Priorität: mittel
- Risiken: Formeln so wählen, wie die Kurstheorie sie definiert; nur ein Rechenweg je Kennzahl.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-BUE-05 — Dokument-Detektiv „Protokoll und Einladung“** (NEUER Typ, Muster Phishing-/Bug-Hunt: fehlerhafte Stelle anklicken, Typ benennen, Erklärung)
- Inhalt: 8 kurze Dokumente (Einladung ohne Ende/Ort, Protokoll ohne Verantwortliche/Termine, Agenda ohne Zeitbudget, Geschäftsbrief mit Formfehlern).
- Nutzen: Besprechungs- und Kommunikationsstandards (Themen 2.1, 2.5, 3.4). Aufwand: M (Engine einmalig) · Priorität: niedrig bis mittel
- Risiken: Formvorgaben (DIN 5008) nur nennen, wenn die Kurstheorie sie führt.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### A.3.3 Übungswerkzeuge (Browser, ohne Server, ohne Wertung/Speicherung)

**W-BUE-01 — Netzplan-Editor (Erweiterung des Trainers)**
- Funktion: Eigene Vorgänge samt Dauer und Vorgängern eintragen, Netzplan zeichnen, FAZ/FEZ/SAZ/SEZ/GP/FP und kritischen Pfad berechnen; zusätzlich Balkenplan-Ansicht.
- Ein-/Ausgabe: Tabelle der Vorgänge → Netzplan-Grafik + Wertetabelle + Rechenweg. Machbar: Rechenlogik des Trainers ist vorhanden.
- Nutzen: Prüfung (Terminplanung) und Praxis. Aufwand: M · Priorität: mittel
- Risiken: Zyklenerkennung und verständliche Fehlermeldungen nötig.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-BUE-02 — Kennzahlen- und Kosten-Nutzen-Rechner**
- Funktion: Eingabe von Werten, Ausgabe von Fluktuations-, Kranken-, Eigenkapitalquote, Amortisationsdauer, ABC-Klassen (mit Rechenweg).
- Passung: Thema 4.1 („Kosten-Nutzen-Rechnung unterstützen“, Kennzahlen aufbereiten). Aufwand: M · Priorität: mittel
- Risiken: Nur Kennzahlen, die die Kurstheorie definiert; Hinweis „Übung, keine Beratung“.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-BUE-03 — Besprechungsplaner**
- Funktion: Tagesordnungspunkte mit Zeitbudget und Verantwortlichen anlegen, Summe gegen Gesamtdauer prüfen, Protokollvorlage erzeugen (Text zum Kopieren).
- Passung: Themen 2.1 (Projektsitzungen), 3.4 (Moderation). Aufwand: S bis M · Priorität: mittel
- Risiken: Keine Speicherung auf dem Server; Hinweis auf lokalen Entwurf.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-BUE-04 — Projektstrukturplan-Baukasten**
- Funktion: Teilprojekte und Arbeitspakete als Baum anlegen, Prüfregeln anzeigen (Arbeitspaket mit Ergebnis, Verantwortlichem, Aufwand; 100-%-Regel).
- Passung: Thema 2.1 (PSP erstellen); ergänzt die Quiz-Hierarchie. Aufwand: M · Priorität: niedrig
- Risiken: Regeln wie „100-%-Regel“ nur, wenn in der Kurstheorie enthalten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### A.3.4 Glossar

**G-BUE-01 — Glossar Büro/Projektorganisation** (~100 Begriffe, ca. 25 je Handlungsbereich)
- Umfang/Themen: HB1 Informationsfluss, Netzplan, Puffer, Qualität/Beschwerden, Zeitmanagement; HB2 Projektstrukturplan, Zielgruppe, Werbemittel, Veranstaltungsplanung; HB3 Personalplanung, Ausbildung, Konfliktphasen, Moderation; HB4 Kennzahlen, Beschaffung, ABC, Wissensmanagement.
- Format wie F-165 (Begriff, Synonyme, Kurzdefinition, Thema, Abschnitt, „Geprüft: nein“). Aufwand: M · Priorität: **hoch**
- Risiken: Definitionen aus der eigenen Kurstheorie ableiten, nicht aus Lehrbüchern übernehmen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### A.3.5 Lernpfade (7 Stationen, durchgehendes Fallbeispiel, Fortgeschritten-Funktion)

**L-BUE-01 — Projektphasen bei der Nordstern GmbH** (Instrument I-BUE-01, setzt auf bestehende Fiktivfirma auf)
- Fallbeispiel: Kundenprojekt (Kundentag) von Auftrag bis Evaluation; Stationen u. a. Phasen erkennen, Tätigkeiten zuordnen, Entscheidungsrunden (Terminverzug), Abläufe sortieren. Aufwand: M · Priorität: mittel
- Risiken: Konsistenz mit dem BSC-Pfad (gleiche Firma, gleiche Zahlenwelt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-BUE-02 — PDCA: Beschwerdequote senken bei der Nordstern GmbH** (Instrument PDCA, bereits vorhanden)
- Aufwand: M · Priorität: niedrig bis mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### A.3.6 Prüfungs-Rahmen

**P-BUE-01 — Prüfungsablauf-Stichpunkte** (`kurs.metadata.pruefungsablauf`, Seite „Gelassen bleiben“)
- Inhalt (aus [Q1]–[Q4]): zwei Teile, Situationsaufgaben über alle Handlungsbereiche, 600 Minuten, Präsentation max. 10 Minuten (ein Drittel), Fachgespräch ca. 40 Minuten, je Teil mindestens 50 Punkte.
- Aufwand: S · Priorität: **hoch**. Risiko: Fachgespräch-Dauer vorher im Verordnungstext prüfen (siehe A.1).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-BUE-02 — Präsentationsthema-Check** (Variante der Projekt-Hilfe für Fachwirte)
- Inhalt: Checkliste zur Themenwahl (komplexe betriebliche Problemstellung, Bezug zu „Führen, Betreuen, Verwalten und Ausbilden“ plus weiterem Bereich, rechtzeitige Einreichung beim Prüfungsausschuss) [Q4]; Präsentationstrainer nutzt bereits 10 Minuten als Standard.
- Aufwand: S bis M · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-BUE-03 — Lernstand je Handlungsbereich** (Kachel in „Gelassen bleiben“)
- Hinweis: Die schriftliche Prüfung ist nicht je Handlungsbereich getrennt; Darstellung deshalb als „Lernstand je Handlungsbereich“ ohne Minutenangaben (Darstellung der FI-Variante müsste angepasst werden). Aufwand: S · Priorität: niedrig
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Vorhanden und beibehalten: Schriftlich-Simulation, Präsentationstrainer, Fachgesprächs-Fragen je Handlungsbereich (`hbN/fachgespraech.md`), Atemübung/Tipps/Checkliste (kursübergreifend).

---

# Kurs B: Geprüfter Fachwirt im Gesundheits- und Sozialwesen (`fachwirt-gesundheit-soziales`)

## B.1 Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | GesWFachwPrV (Verordnung vom 21.07.2011, geändert 2019) | [Q7] |
| Handlungsbereiche | 6: Planen, Steuern und Organisieren betrieblicher Prozesse · Steuern von Qualitätsmanagementprozessen · Gestalten von Schnittstellen und Projekten · Steuern und Überwachen betriebswirtschaftlicher Prozesse und Ressourcen · Führen und Entwickeln von Personal · Planen und Durchführen von Marketingmaßnahmen | [Q7] |
| Schriftlich | Betriebliche Situationsbeschreibung mit zwei aufeinander abgestimmten, gleichgewichtigen Aufgabenstellungen, alle sechs Bereiche; Gesamtdauer mindestens 600 und höchstens 630 Minuten (IHK-Praxis: 2 × 300) | [Q7], [Q8] |
| Mündlich | Präsentation ca. 10 Minuten (ein Drittel), Fachgespräch höchstens 20 Minuten (zwei Drittel); Thema umfasst „Führen und Entwickeln von Personal“ plus einen weiteren frei wählbaren Bereich | [Q7] |
| Bestehen | Mindestens 50 Punkte im schriftlichen und im mündlichen Teil | [Q7] |
| Besonderheit | Branchenbezogene Situationsaufgaben (Pflege, Sozialwirtschaft); Rahmenplan-Empfehlung 600 Unterrichtsstunden | [Q31, Suchtreffer] |

**Unsicherheiten:** Dauerangaben aus der Verordnungsseite (Abruf) und IHK-Treffern; der Volltext der Verordnung wurde nicht Zeile für Zeile verglichen. Eine IHK-Seite nennt das Fachgespräch mit 20 Minuten als „andere Quelle“ [Q8]. Eine Neuordnung (Bachelor-Professional-Bezeichnung) wurde in der Recherche nicht gefunden; Stand vor Livegang bei der IHK/BIBB erneut prüfen.

## B.2 Bestandsbewertung

| Baustein (heute) | Urteil | Begründung und Beleg |
|---|---|---|
| SWOT-Matrix (3 Fragen) | passt | Strategieentwicklung (`hb1/1.2`, Q-1.2-07/-08), Marketing (`hb6/6.3`, Q-6.3-02) |
| Hierarchie (2 Fragen) | passt | Aufbauorganisation (`hb1/1.3`, Q-1.3-10), Projektrollen (`hb3/3.3`, Q-3.3-02) |
| Eisenhower-Matrix (1 Frage) | passt | Zeit-/Selbstmanagement (`hb2/2.4`, Q-2.4-02) |
| Gantt-Diagramm (1 Frage) | passt | Terminplanung (`hb3/3.4`, Q-3.4-03) |
| Ansoff-Matrix (1 Frage) | passt (Branchenbezug prüfen) | Marketing-Konzepte (`hb6/6.3`); Handlungsbereich „Marketingmaßnahmen“ [Q7]; Übertragbarkeit auf Sozialwirtschaft in Beispielen sauber begründen |
| PDCA, Risikomatrix, BSC | passt, aber ohne Content | Themen existieren (2.1 PDCA und ISO 9001, 2.3 Risikomanagement, 4.4 Controlling-Kennzahlen), aber keine Zuordnungsfragen; derzeit „noch nicht verfügbar“. Siehe I-GES-03 bis -05 |
| Netzplan (Werkzeug, falls freigeschaltet) | unsicher / nicht empfohlen | Gesundheits-Content kennt keinen Netzplan (0 Dateien); Projekte werden mit Phasen, Meilensteinen, Gantt behandelt (`hb3/3.4`). Heute nicht freigeschaltet; so lassen |
| IT-Instrumente, Subnetting, SQL usw. | passt nicht | kein IT-Bezug; ausblenden |
| Spiele, Werkzeuge, Lernpfad, Glossar, Prüfungs-Rahmen | nicht vorhanden | Neuaufbau, siehe B.3 |

## B.3 Neue Vorschläge

### B.3.1 Instrumente

**I-GES-01 — Qualitätsdimensionen nach Donabedian** (3 Zonen: Strukturqualität · Prozessqualität · Ergebnisqualität)
- Beschreibung: Qualitätsmerkmale (Personalqualifikation, Einhaltung von Standards, Zufriedenheit u. a.) der Dimension zuordnen.
- Nutzen: Kern des Handlungsbereichs Qualitätsmanagement; in Praxis (Qualitätsberichte, Indikatoren) allgegenwärtig.
- Passung: „Struktur-/Prozess-/Ergebnisqualität“ in 4 Theorie-Dateien (`hb2/2.1`, `2.2`); Modell beschrieben in [Q25].
- Aufwand: S · Priorität: **hoch**
- Risiken: Beispiele aus Verwaltung/Organisation wählen, nicht aus pflegefachlicher Behandlung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-02 — Sozialleistungssysteme: Wer zahlt was?** (4 Zonen: Gesetzliche Krankenversicherung (SGB V) · Soziale Pflegeversicherung (SGB XI) · Sozialhilfe (SGB XII) · Private Krankenversicherung)
- Beschreibung: Leistungen/Sachverhalte dem Kostenträger zuordnen (z. B. ärztlich verordnete häusliche Krankenpflege, Pflegesachleistung, Hilfe zur Pflege bei Bedürftigkeit).
- Nutzen: Finanzierungssysteme (Thema 4.2) sind prüfungsrelevant und für Praxis zentral; Pflegegrade/Leistungen werden in 7 Dateien erwähnt.
- Passung: Theorie `hb4/4.2` bildet genau diese Systeme ab; Pflegegrad-Systematik [Q21].
- Aufwand: S · Priorität: **hoch**
- Risiken: **Rechtsstand** (Pflegereformen); keine Euro-Beträge, keine Leistungsansprüche im Einzelfall. Ausdrücklich „Übung zur Systematik, keine Sozialberatung“.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-03 — PDCA-Zyklus im Qualitätsmanagement** (bestehender Typ, 4 Zonen; Content ergänzen)
- Beschreibung: Maßnahmen eines Verbesserungsprojekts (z. B. Beschwerdequote, Dokumentationsfehler) Plan/Do/Check/Act zuordnen.
- Passung: Thema 2.1 nennt PDCA (Q-Frage vorhanden, Zuordnung fehlt). Aufwand: S · Priorität: **hoch**
- Risiken: gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-04 — Risikomatrix im Risikomanagement** (bestehender Typ; Content ergänzen)
- Passung: Thema 2.3 „Grundbegriffe des Risikomanagements“. Aufwand: S · Priorität: mittel
- Risiken: nur 2×2-Vereinfachung (Hinweis wie im Büro-Kurs).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-05 — Balanced Scorecard am Pflegedienst „Morgenlicht“** (bestehender Typ; Content ergänzen)
- Passung: Thema 4.4 Controlling/Kennzahlen; Referenzdokument vorhanden (siehe L-GES-01). Aufwand: S · Priorität: mittel bis hoch (Voraussetzung für L-GES-01)
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-06 — Marketing-Mix im Gesundheits- und Sozialwesen** (4 Zonen: Leistung · Preis/Entgelt · Distribution/Zugang · Kommunikation)
- Beschreibung: Maßnahmen (z. B. Beratungszeiten, Infoabend, Angehörigeninformation, Vergütung/Entgelt) dem Instrument zuordnen.
- Passung: `hb6/6.3` „Marketing-Mix“ und Wettbewerbsrecht; Besonderheit Werberecht (Heilmittelwerbegesetz) bleibt Theorie, nicht Zuordnung. Aufwand: S · Priorität: mittel
- Risiken: „Preis“ im Sozialrecht oft nicht frei (Vergütungsvereinbarungen); Zonenbezeichnung „Preis/Entgelt“ und Beispiele entsprechend wählen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-07 — Teamphasen nach Tuckman** (5 Zonen; gemeinsam mit I-BUE-08)
- Passung: Content vorhanden (3 Dateien, `hb3/3.2`). Aufwand: S · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-GES-08 — Kostenverhalten** (3 Zonen: Fixkosten · Variable Kosten · Sprungfixe Kosten)
- Beschreibung: Kostenarten eines ambulanten Dienstes (Miete, Fahrtkosten je Einsatz, zusätzliches Fahrzeug) zuordnen.
- Passung: `hb4/4.3` „Fixe und variable Kosten“, Deckungsbeitrag, Break-even. Aufwand: S · Priorität: mittel bis hoch (Vorstufe für W-GES-01)
- Risiken: „Sprungfix“ nur, wenn in der Kurstheorie enthalten; sonst 2 Zonen oder Mischkosten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Optional gemeinsam gebaut (je S, einmal das Modell, hier nur Content): Kommunikationsquadrat (Content vorhanden, 2 Dateien) und Stakeholder-Matrix (`hb3/3.1`, Stakeholder-Analyse, 2 Dateien) wie I-BUE-04/-02.

### B.3.2 Spiele

**S-GES-01 — Begriffe-Duell „Gesundheits- und Sozialsystem: A oder B“** (vorhandene Engine)
- Inhalt: 20 Fragen in 4 Runden: Kostenträger (SGB V oder SGB XI), Qualitätsdimensionen, Kostenarten, Arbeitsrecht (Probezeit, Kündigung).
- Aufwand: S · Priorität: **hoch**
- Risiken: Rechtsstand; keine Beträge. Fachliche Prüfung durch eine fachkundige Person (Sozial-/Gesundheitsrecht).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-GES-02 — Kreuzworträtsel „Qualitätsmanagement“** (vorhandene Engine)
- Inhalt: 10 Begriffe (z. B. Audit, Zertifizierung, Qualitätsindikator, Beschwerdemanagement, Qualitätsziel). Aufwand: S · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-GES-03 — Memory „Kennzahlen im Pflegedienst“** (vorhandene Engine)
- Inhalt: 24 Begriff-Bedeutung-Paare in 4 Runden (Personal, Auslastung, Kosten, Qualität); Begriffe, die in `hb4/4.4`, `hb5/5.4` belegt sind (Auslastung 6 Dateien, Fluktuation 4 Dateien).
- Aufwand: S · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-GES-04 — Kennzahlen-Sprint „Controlling im Pflegedienst“** (Rechen-Sprint-Engine, siehe Abschnitt 4)
- Inhalt: Zufallsaufgaben zu Auslastungsgrad, Deckungsbeitrag, Break-even-Menge, Fluktuations- und Krankenquote; Rechenweg. Fiktive Werte.
- Aufwand: M (gemeinsame Engine) · Priorität: mittel bis hoch
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-GES-05 — Dienstplan-Detektiv** (Dokument-Detektiv-Engine)
- Inhalt: 8 Dienstpläne/Arbeitsvertragsausschnitte mit Regelverstößen (Ruhezeit unter 11 Stunden ohne Ausgleich, fehlende Pause, Probezeit-/Befristungsfehler); Verstoß anklicken, Regel nennen.
- Passung: „Dienstplan“ in 7 Dateien; Ruhezeit-/Pausenregeln [Q19, Q20]. Aufwand: M · Priorität: mittel
- Risiken: Sonderregeln der Pflege (Ruhezeit um bis zu 1 Stunde verkürzbar mit Ausgleich, § 5 Abs. 2 ArbZG [Q20]) und Tarifverträge; Aufgaben nur mit Gesetzesregel, nicht mit Tarifklauseln.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### B.3.3 Übungswerkzeuge

**W-GES-01 — Kalkulations- und Break-even-Rechner**
- Funktion: Fixkosten, variable Kosten je Einsatz/Leistungseinheit und Erlös je Einheit eingeben; Ausgabe Deckungsbeitrag je Einheit, Break-even-Menge, Gewinn/Verlust bei geplanter Menge, einfache Grafik, Rechenweg; Vergleich Voll-/Teilkosten.
- Passung: `hb4/4.3` „Kalkulation und Break-even“. Im Browser machbar, reine Rechnung. Aufwand: M · Priorität: **hoch**
- Risiken: Nur fiktive Beispielzahlen; Hinweis „keine Kalkulation für Vergütungsverhandlungen“.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-GES-02 — Personalbedarfs- und Auslastungsrechner**
- Funktion: Jahresarbeitszeit abzüglich Urlaub, Krankheit und Fortbildung ergibt Nettoarbeitszeit; daraus Vollzeitäquivalente (Vollkräfte); Auslastungsgrad und Fluktuationsquote.
- Passung: `hb5/5.1` Personalbedarfsplanung; „Vollkraft“ 1 Datei. Aufwand: M · Priorität: mittel
- Risiken: Berechnungsschemata variieren (Personalbemessungsverfahren); als „Übungsmodell“ kennzeichnen und nur das Schema der Kurstheorie verwenden. Keine Vorgaben zu Personalschlüsseln.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-GES-03 — Dienstplan-Regelcheck**
- Funktion: Kleines Raster (Mitarbeitende × Tage, Schichtarten Früh/Spät/Nacht/frei) wird live gegen Arbeitszeitregeln geprüft (tägliche Höchstarbeitszeit, Pausen 30/45 Minuten, Ruhezeit mindestens 11 Stunden) [Q19, Q20]; Verstöße werden markiert und erklärt.
- Aufwand: M bis L (gemeinsamer Arbeitszeit-Prüfer, siehe Abschnitt 4) · Priorität: mittel
- Risiken: Rechtsstand und Ausnahmen (Tarif, § 7 ArbZG, Rufbereitschaft); Regelsatz bewusst klein und als „Grundregeln“ beschriften. Keine Rechtsberatung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Bewusst **nicht** vorgeschlagen: ein „Pflegegrad-Punkterechner“ zur Einstufung (Module und Gewichtung stehen in § 15 SGB XI [Q21]); er wäre leicht als individuelle Begutachtungshilfe misszuverstehen (Risiko pflegerische/sozialrechtliche Beratung). Stattdessen nur das Instrument I-GES-02 und Theorie.

### B.3.4 Glossar

**G-GES-01 — Glossar Gesundheit/Soziales** (~140 Begriffe, ca. 23 je Handlungsbereich)
- Themen: Rechtsformen, Zielsystem, Aufbau-/Ablauforganisation, Change; Qualitätsmanagement, Audit, Indikator, Zertifizierung; Schnittstellen, Stakeholder, Projektphasen; Rechnungswesen, Finanzierung (SGB V/XI/XII), Kosten, Controlling; Personal, Arbeitsrecht; Marketing, UWG, Heilmittelwerbegesetz.
- Aufwand: M bis L (größter Kurs) · Priorität: **hoch**
- Risiken: **Rechts- und Fachrichtigkeit**; Definitionen eng an der Kurstheorie und mit Prüfstatus „nein“, Prüfung durch eine fachkundige Person (Gesundheits-/Sozialrecht, Pflegemanagement). Keine pflegefachlichen Definitionen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### B.3.5 Lernpfade

**L-GES-01 — Balanced Scorecard beim ambulanten Pflegedienst „Morgenlicht“** (Instrument I-GES-05)
- Fallbeispiel: ambulanter Pflegedienst Morgenlicht, 120 betreute Menschen (bereits in `content/instrumenten-lernpfade` ausgearbeitet; Kurs-Content nutzt „Morgenlicht“ durchgängig, 157 Treffer).
- Nutzen: gleiche Mechanik wie Büro-BSC, Beispiel passt zum Kursbeispiel. Aufwand: M (Import des vorhandenen Dokuments in das Lernpfad-Format, plus BSC-Zuordnungsfragen) · Priorität: **hoch**
- Risiken: Dokument ist nutzerseitig fachlich abgestimmt (Original-Wortlaut); Kennzahlen als Übungswerte kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-GES-02 — Qualitätsentwicklung bei Morgenlicht (PDCA/Donabedian)** (Instrument I-GES-03 oder -01)
- Fallbeispiel: Beschwerde- oder Dokumentationsqualität verbessern. Aufwand: M · Priorität: mittel
- Risiken: keine pflegefachlichen Maßnahmen als Beispiel; nur Organisation und Qualitätsmanagement.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### B.3.6 Prüfungs-Rahmen

**P-GES-01 — Prüfungsablauf-Stichpunkte**
- Inhalt (aus [Q7]): zwei Teile, Situationsbeschreibung mit zwei Aufgaben über alle sechs Bereiche, 600 bis 630 Minuten, Präsentation ca. 10 Minuten, Fachgespräch höchstens 20 Minuten, Thema „Führen und Entwickeln von Personal“ plus ein weiterer Bereich, je Teil mindestens 50 Punkte.
- Aufwand: S · Priorität: **hoch**
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-GES-02 — Präsentationsthema-Check**
- Inhalt: Auswahl-Checkliste für Präsentationsthemen (Bezug Personal plus zweiter Bereich, Branchenbeispiel, Zeitrahmen 10 Minuten); Präsentationstrainer unverändert (Standard 10 Minuten).
- Aufwand: S bis M · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-GES-03 — Lernstand je Handlungsbereich** (6 Kacheln)
- Aufwand: S · Priorität: niedrig (wie P-BUE-03)
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

Vorhanden: Schriftlich-Simulation, Fachgesprächs-Fragen je Handlungsbereich (`hbN/fachgespraech.md`), Prüfungsangst-Hilfen.

---

# Kurs C: Ausbildung der Ausbilder (AEVO) (`ausbildung-der-ausbilder`)

## C.1 Prüfungsrahmen (Kurzfassung)

| Punkt | Inhalt | Quelle |
|---|---|---|
| Rechtsgrundlage | Ausbilder-Eignungsverordnung (AusbEignV) vom 21.01.2009; Rahmenplan (BIBB-Empfehlung) 2023, anzuwenden seit 01.07.2024 | [Q10]–[Q13] |
| Handlungsfelder | 4: (1) Ausbildungsvoraussetzungen prüfen und Ausbildung planen, (2) Ausbildung vorbereiten und bei der Einstellung mitwirken, (3) Ausbildung durchführen, (4) Ausbildung abschließen | [Q10], [Q11] |
| Schriftlich | Fallbezogene Aufgaben aus allen Handlungsfeldern, Dauer etwa drei Stunden | [Q12] |
| Praktisch | Präsentation einer berufstypischen Ausbildungssituation (höchstens 15 Minuten) plus Fachgespräch, zusammen höchstens 30 Minuten. Alternativ praktische Durchführung einer Ausbildungssituation; Auswahl und Gestaltung werden im Fachgespräch erläutert | [Q12] |
| Bestehen | Jeder Prüfungsteil mindestens „ausreichend“; Wiederholung zweimal möglich, bestandene Teile werden angerechnet | [Q12] |
| Besonderheit | Praxisprüfung ist der Kern des Prüfungsangst-Risikos; häufig Vier-Stufen-Methode für psychomotorische Lernziele [Q27]. Rahmenplan-Update 2024: Digitalisierung, Nachhaltigkeit, Diversität, mehr Lernprozessbegleitung [Q13] |

**Unsicherheiten:** Details zur schriftlichen Prüfung (Aufgabenarten, bundeseinheitliche Aufgabenerstellung, Hilfsmittel) und Vorbereitungszeit vor der Praxisprüfung wurden nicht belastbar verifiziert; die Verordnung nennt hierzu wenig. Praktikertexte [Q26]–[Q28] sind kommerzielle Lernseiten und dienen nur als Hintergrund für Methodennamen, nicht als Rechtsquelle.

## C.2 Bestandsbewertung

AEVO hat heute **keine** zugeordneten Instrumente, Werkzeuge, Spiele, Lernpfade oder Glossar. Vorhanden: Quiz (113 Fragen), Fallaufgaben und Fachgesprächs-Fragen je Handlungsfeld, Präsentationstrainer (15 Minuten), Prüfungsangst-Hilfen.

| Baustein | Urteil | Begründung |
|---|---|---|
| Gantt, Eisenhower, PDCA, Risikomatrix, SWOT, Ansoff, BSC, Hierarchie (Instrumente) | passt nicht | AEVO ist pädagogisch-rechtlich; kein Strategie-/Controlling-Stoff. Ausnahme Hierarchie als Format (Lernzielhierarchie, siehe I-AEV-04), aber mit neuem Inhalt |
| Netzplan, Subnetting, SQL, Terminal, Topologie, Flag-Rätsel | passt nicht | kein Bezug |
| Alle IT-Instrumente | passt nicht | kein Bezug |
| Gantt-Format als Ausbildungsverlauf | unsicher | Format passt, Inhalt neu (I-AEV-08) |
| Präsentationstrainer (Standard-Gliederung) | passt, aber ausbaubar | Präsentation einer Ausbildungssituation bis 15 Minuten ist gesetzt [Q12]; Trainer ist allgemein, nicht auf Unterweisung zugeschnitten (siehe W-AEV-01, P-AEV-02) |

**Folge:** Im AEVO-Kurs würde der Instrumente-Tab ausschließlich die neuen Typen zeigen; alle heutigen allgemeinen und IT-Typen werden ausgeblendet.

**Inhaltslücken im Kurs-Content (Suche in `content/ausbildung-der-ausbilder`):** „Lernziel“ 0 Treffer, „Nachhaltigkeit“ 0, „Lernprozessbegleitung“ 0, Beurteilungsfehler nur im Fließtext (Halo/Beurteilung nicht als eigenes Modell), „4-Stufen“ 9 Treffer, „Unterweisung“ 5. Mehrere Instrumente brauchen daher zuerst einen Theorieabschnitt (Aufwand im Vorschlag enthalten).

## C.3 Neue Vorschläge

### C.3.1 Instrumente

**I-AEV-01 — Handlungsfelder der AEVO** (4 Zonen: Voraussetzungen prüfen/planen · Ausbildung vorbereiten/Einstellung · Ausbildung durchführen · Ausbildung abschließen)
- Beschreibung: Aufgaben (z. B. Eignung des Betriebs prüfen, Ausbildungsplan erstellen, Probezeit gestalten, Zeugnis erstellen) dem Handlungsfeld zuordnen.
- Nutzen: Schriftliche Prüfung deckt alle Handlungsfelder ab [Q12]; schafft Orientierung im Stoff.
- Passung: Aufbau von Content und Prüfung (§ 2, § 3 [Q10], [Q11]). Aufwand: S · Priorität: **hoch**
- Risiken: Zuordnung einzelner Aufgaben kann mehrdeutig sein; nur eindeutige Tätigkeiten verwenden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-02 — Vier-Stufen-Methode** (4 Zonen: Vorbereiten · Vormachen und erklären · Nachmachen und erklären lassen · Üben und festigen)
- Beschreibung: Handlungen der Ausbilderin/des Azubis der Stufe zuordnen; zusätzlich Sortierfragen.
- Nutzen: Kernstück der praktischen Prüfung für psychomotorische Lernziele [Q27].
- Passung: „4-Stufen“ in 2 Content-Dateien (`hf3/3.2`, Fachgespräch). Aufwand: S · Priorität: **hoch**
- Risiken: Stufenbezeichnungen unterscheiden sich leicht (Üben/Anwenden/Selbstständig üben); die in der Kurstheorie gewählte Fassung einheitlich verwenden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-03 — Lernzielbereiche** (3 Zonen: kognitiv · affektiv · psychomotorisch)
- Beschreibung: Lernziele (z. B. „erklärt die Funktion …“, „geht freundlich auf Kunden zu“, „bohrt …“) dem Bereich zuordnen [Q26].
- Nutzen: Grundlage der Methodenwahl und des Unterweisungsentwurfs.
- Passung: Im Kurs-Content fehlt das Thema (0 Treffer „Lernziel“); Theorieabschnitt in 3.2 oder neues Thema nötig. Aufwand: S + Theorie · Priorität: **hoch**
- Risiken: Taxonomien variieren (Bloom-Stufen innerhalb kognitiv); auf die drei Bereiche beschränken.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-04 — Lernzielhierarchie** (Hierarchie/Baum: Richtziel → Grobziele → Feinziele)
- Beschreibung: Ziele in den passenden Ebenen eines Baums einordnen (Richtziel allgemein, Feinziel überprüfbar) [Q26].
- Nutzen: Unterweisungsentwurf und Ausbildungsplan. Passung: nutzt das vorhandene Baum-Format, kein neues Engine-Teil. Aufwand: S bis M · Priorität: mittel bis hoch
- Risiken: wie I-AEV-03 (Theorie fehlt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-05 — Beurteilungsfehler** (5 Zonen: Halo-Effekt · Tendenz zur Mitte · Milde-/Strengefehler · Sympathie/Antipathie · Korrektur-/Recency-Fehler)
- Beschreibung: Beobachtungen im Beurteilungsgespräch dem Fehler zuordnen [Q28].
- Nutzen: Leistungsbewertung (Thema 3.4); Beurteilung ist häufiger Prüfungsstoff.
- Passung: „Beurteilung“ in 7 Dateien, Theorie vorhanden (3.4). Aufwand: S · Priorität: **hoch**
- Risiken: Benennungen sind je Quelle unterschiedlich (z. B. Kleber-/Hierarchie-Effekt); eine Namensliste festlegen und einheitlich nutzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-06 — Regelwerke der Berufsausbildung** (4 Zonen: Berufsbildungsgesetz · Jugendarbeitsschutzgesetz · Ausbildungsordnung/Ausbildungsrahmenplan · Rahmenlehrplan der Berufsschule)
- Beschreibung: Aussagen (Probezeit 1 bis 4 Monate, 8-Stunden-Tag für Jugendliche, sachliche und zeitliche Gliederung, Lernfelder) dem Regelwerk zuordnen.
- Passung: § 20 BBiG [Q16], § 8 JArbSchG [Q14], § 5 BBiG [Q18]; Rahmenlehrplan als Gegenstück zum betrieblichen Rahmenplan (`hf2/2.2`). Aufwand: S · Priorität: **hoch**
- Risiken: **Rechtsstand**; Zahlenwerte nur, wenn geprüft. Rahmenlehrplan (Länder/Kultusministerkonferenz) kein Bundesrecht, Zuordnung genau formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-07 — Mitwirkende der Ausbildung** (5 Zonen: Ausbildende/Ausbilder · Ausbildungsbeauftragte/Fachkräfte · Betriebsrat/JAV · zuständige Stelle (z. B. IHK) · Berufsschule)
- Beschreibung: Aufgaben und Rechte der richtigen Stelle zuordnen (Eintragung, Prüfung, Mitbestimmung, Lernortkooperation).
- Passung: `hf1/1.3`, `hf2/2.2` („Aufgaben der Mitwirkenden“ ist ausdrücklich Qualifikationsinhalt [Q11]). Aufwand: S · Priorität: mittel
- Risiken: Zuständigkeiten nach Kammerbereich (IHK/HWK) unterscheiden; in Beispielen IHK nutzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**I-AEV-08 — Ausbildungsverlauf** (Gantt-Typ mit eigenen Zeitabschnitten: Einstellung/Vorbereitung · Probezeit · Zwischenprüfung bzw. Teil 1 · Hauptphase · Abschlussprüfung/Zeugnis)
- Beschreibung: Ereignisse (Eintragung beim Ausbildungsvertrag, Probezeit-Beurteilung, Anmeldung zur Prüfung, Zeugnis) dem Abschnitt zuordnen.
- Passung: `hf2` bis `hf4`. Aufwand: S · Priorität: mittel
- Risiken: Prüfungsform (Zwischenprüfung oder gestreckte Prüfung) hängt vom Beruf ab; neutral formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### C.3.2 Spiele

**S-AEV-01 — Reihenfolge-Spiel „Unterweisung in der richtigen Reihenfolge“** (Reihenfolge-Engine, siehe Abschnitt 4)
- Inhalt: 10 Aufgaben mit Schritten einer Unterweisung (Stufen in die richtige Reihenfolge, Schritte innerhalb Stufe), alltagsnahe Tätigkeiten (z. B. Rechnung buchen, Kundenakte anlegen) statt Fachtechnik; Rückmeldung je Schritt.
- Nutzen: Automatisiert die Struktur für die Praxisprüfung. Aufwand: M (Engine) · Priorität: **hoch**
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-AEV-02 — Begriffe-Duell „Recht der Berufsausbildung: A oder B“** (vorhandene Engine)
- Inhalt: 20 Fragen in 4 Runden: Probezeit und Kündigung [Q16], [Q17], Jugendarbeitsschutz [Q14], [Q15], Ausbildungsvertrag, Prüfung und Zeugnis.
- Aufwand: S · Priorität: **hoch**
- Risiken: **Rechtsstand** (Gesetzesstand prüfen, Zahlenwerte aus Gesetzesquelle).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-AEV-03 — Beurteilungsfehler-Detektiv** (Dokument-Detektiv-Engine, Muster Phishing-Detektiv)
- Inhalt: 8 kurze Beurteilungstexte/Gesprächsausschnitte; den Satz mit dem Fehler anklicken, Fehlertyp wählen, Erklärung.
- Nutzen: Anwendungsniveau statt Auswendiglernen. Aufwand: M (Engine einmalig) · Priorität: mittel
- Risiken: Eindeutigkeit der Fehlertypen; bewusst eindeutige Textbeispiele.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-AEV-04 — Begriffe-Memory und Kreuzworträtsel „AEVO-Fachbegriffe“** (vorhandene Engines)
- Inhalt: Begriff-Bedeutung-Paare (Feinziel, Leittext, Lernortkooperation, Verbundausbildung, Halo-Effekt, Ausbildungsrahmenplan …) und 10-Wörter-Rätsel. Aufwand: S · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**S-AEV-05 — Jugendschutz-Sprint** (Rechen-Sprint-Engine)
- Inhalt: zufällig erzeugte Aufgaben (Alter, Arbeitszeit, Pausen, Urlaubsanspruch, Probezeitende berechnen) mit Regelanzeige nach der Antwort.
- Passung: 8 h/40 h [Q14], Pausen 30/60 Minuten [Q15], Probezeit [Q16]. Aufwand: M · Priorität: mittel
- Risiken: Urlaubsanspruch nach § 19 JArbSchG vor Aufnahme **nicht verifiziert**, erst nach Gesetzesabgleich verwenden; Ausnahmen (Branchen) bewusst ausklammern.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### C.3.3 Übungswerkzeuge

**W-AEV-01 — Unterweisungs-Planer** (wichtigster Einzelbaustein)
- Funktion: Formular für einen Unterweisungsentwurf: Thema und Zielgruppe, Richt-/Grob-/Feinziele, Zeitplan der vier Stufen mit Minutenanteilen (Summe gegen Redezeit, z. B. 15 Minuten), Medien, Sicherung/Lernerfolgskontrolle, mögliche Fragen des Prüfungsausschusses. Plausibilitätschecks (jede Stufe befüllt, Zeit überschritten, Feinziel ohne überprüfbares Verb). Ausgabe als Text/Druckansicht.
- Eingabe → Ausgabe: Formularfelder → Entwurfsblatt plus Hinweisliste. Reiner Browser, kein Server; Entwurf nur lokal (Browser) oder zum Kopieren.
- Nutzen: Direkter Prüfungsnutzen (Praxisteil) und Berufspraxis. Passung: AusbEignV § 4 [Q12], Vier-Stufen-Methode [Q27]; baut auf Präsentationstrainer (F-24) auf und kann dort verlinkt werden. Aufwand: M · Priorität: **hoch**
- Risiken: Hinweise sind Heuristiken, keine Bewertung; Mustertexte neutral.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-AEV-02 — Lernziel-Check**
- Funktion: Freitext-Feinziel eingeben; regelbasierte Hinweise (Verb vorhanden? überprüfbar? Bedingung/Standard? Lernzielbereich zuordenbar?). Kein KI-Einsatz.
- Aufwand: S bis M · Priorität: mittel
- Risiken: Verblisten decken nicht alle Formulierungen ab; Ergebnis als „Hinweis, nicht Wertung“.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-AEV-03 — Jugendarbeitsschutz- und Arbeitszeit-Check**
- Funktion: Alter, Beginn, Ende, Pausen, Berufsschultag eingeben; Hinweise zu Höchstarbeitszeit (8 Stunden/40 Stunden) [Q14], Pausen (30 Minuten ab mehr als 4,5 bis 6 Stunden, 60 Minuten ab mehr als 6 Stunden) [Q15] und Ruhezeit. Teilt sich Regelmaschine mit W-GES-03.
- Aufwand: M · Priorität: mittel bis hoch
- Risiken: **Rechtsstand**, Ausnahmen (§§ 14 ff. JArbSchG, Branchen), Berufsschulanrechnung. Beschriftung „Übung zu den Grundregeln, keine Rechtsberatung“. Fachprüfung durch Person mit Arbeitsrechtskenntnis.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**W-AEV-04 — Ausbildungsplan-Zeitplaner**
- Funktion: Ausbildungsdauer und Probezeit festlegen, Abschnitte/Abteilungen mit Wochenzahl anlegen, Summe prüfen, Berufsschulblöcke als Zeiten markieren, sachlich-zeitliche Gliederung als Tabelle ausgeben.
- Passung: Handlungsfeld 2 „betrieblichen Ausbildungsplan erstellen“ [Q11], § 5 BBiG [Q18]. Aufwand: M · Priorität: mittel
- Risiken: Muster mit fiktivem Beruf; keine Wiedergabe echter Ausbildungsrahmenpläne (Urheberrecht/Aktualität).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### C.3.4 Glossar

**G-AEV-01 — Glossar AEVO** (~80 Begriffe, ca. 20 je Handlungsfeld)
- Themen: Ausbildungsordnung, Ausbildungsrahmenplan, Ausbildungsberuf, Verbund-/überbetriebliche Ausbildung, Eignung, Ausbildungsvertrag, Eintragung, Probezeit, Lernziel/Lernzielbereiche, Methoden (Vier-Stufen, Leittext, Projekt), Feedback, Beurteilungsfehler, Nachteilsausgleich, Zeugnis.
- Aufwand: M · Priorität: **hoch**
- Risiken: Rechtsbegriffe eng an Gesetzestext; Prüfstatus „nein“ bis Fachprüfung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### C.3.5 Lernpfade

**L-AEV-01 — Eine Unterweisung nach der Vier-Stufen-Methode** (Instrument I-AEV-02)
- Fallbeispiel: fiktiver Ausbildungsbetrieb (neutrale Fiktivfirma, z. B. Büroservice), Unterweisung einer alltagsnahen Tätigkeit; Stationen: Wissensfragen, Stufen erkennen, grobe und vertiefte Zuordnung, Entscheidungsrunden (Azubi macht beim Nachmachen Fehler), Zusammenhänge (Lernziel ↔ Methode), Abläufe sortieren; Selbsteinschätzung.
- Aufwand: M · Priorität: **hoch**
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**L-AEV-02 — Beurteilungsgespräch zum Ende der Probezeit** (Instrument I-AEV-05)
- Fallbeispiel: Beurteilungen mit eingebauten Fehlern erkennen, Gespräch vorbereiten. Aufwand: M · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### C.3.6 Prüfungs-Rahmen

**P-AEV-01 — Prüfungsablauf-Stichpunkte**
- Inhalt (aus [Q12]): schriftlich ca. 3 Stunden fallbezogen aus allen Handlungsfeldern; praktisch Präsentation (höchstens 15 Minuten) oder praktische Durchführung plus Fachgespräch, zusammen höchstens 30 Minuten; jeder Teil mindestens „ausreichend“; Wiederholung zweimal möglich.
- Aufwand: S · Priorität: **hoch**
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-AEV-02 — Unterweisungs-/Präsentationshilfe** (analog „Projekt-Hilfe“, neuer Reiter oder Erweiterung des Präsentationstrainers)
- Inhalt: Checkliste „Ausbildungssituation für die Prüfung auswählen“ (alltagsnah, in 15 Minuten machbar, Lernziel überprüfbar), Entscheidung Präsentation oder Durchführung, Struktur-Gliederung nach Vier Stufen, Medien, typische Nachfragen im Fachgespräch (Begründung von Methodenwahl, Lernzielen, Zielgruppe). Verknüpfung mit W-AEV-01.
- Aufwand: M · Priorität: **hoch**
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-AEV-03 — Fachgespräch-Fragen erweitern**
- Inhalt: Die vorhandenen Fragen je Handlungsfeld um Fragen zur eigenen Prüfungssituation ergänzen (Begründung der Situation, Alternativen, Lernerfolgskontrolle). Aufwand: S · Priorität: mittel
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**P-AEV-04 — Inhaltsabgleich mit dem Rahmenplan 2024**
- Inhalt: Prüfen, ob Digitalisierung/mobiles Ausbilden, Nachhaltigkeit, Diversität und Lernprozessbegleitung in der Kurstheorie abgedeckt sind (Nachhaltigkeit: 0 Treffer; „digital“: 10 Treffer in 4 Dateien) [Q13]; Themenabschnitte ergänzen.
- Aufwand: M · Priorität: mittel bis hoch (Aktualität gegenüber Prüfungsstoff)
- Risiken: Rahmenplan-Wortlaut nur über BIBB/IHK beziehbar; eigene Formulierung nötig, Urheberrecht beachten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

# 4. Gemeinsames der drei Kurse und Unterschiede

## 4.1 Einmal bauen, mehrfach nutzen

| Baustein | Büro | Gesundheit | AEVO | Einmalaufwand / Hinweis |
|---|---|---|---|---|
| Kommunikationsquadrat (Zonenmodell) | I-BUE-04 | optional (Content vorhanden) | optional (3.1 Feedback, 3.4 Konflikte) | S (Modell + Illustration); Content je Kurs |
| Teamphasen nach Tuckman | I-BUE-08 | I-GES-07 | nein | S |
| Stakeholder-Matrix | I-BUE-02 | optional | nein | S |
| Konflikteskalation nach Glasl | I-BUE-05 | optional (HB5 Konfliktphasen) | optional (3.4 Konflikte) | S |
| PDCA / Risikomatrix / BSC (vorhanden) | vorhanden | I-GES-03/-04/-05 nur Content | nein | nur Content je Kurs |
| Reihenfolge-Spiel (neu, aus „Code-Reihenfolge“) | S-BUE-03 | optional | S-AEV-01 | M einmalig |
| Rechen-Sprint (neu, aus „Zahlen-Sprint“) | S-BUE-04 | S-GES-04 | S-AEV-05 | M einmalig, Aufgabenmodul je Kurs |
| Dokument-Detektiv (neu, aus Phishing/Bug-Hunt) | S-BUE-05 | S-GES-05 | S-AEV-03 | M einmalig |
| Arbeitszeit-Prüfer (Regelmaschine) | nein | W-GES-03 (ArbZG) | W-AEV-03 (JArbSchG) | M bis L einmalig; Regelsätze getrennt halten |
| Zeit-/Plan-Editoren (Tabelle mit Summenprüfung) | W-BUE-01, W-BUE-03, W-BUE-04 | optional | W-AEV-04 | gemeinsame Komponente für Zeiten/Summen |
| Begriffe-Duell, Memory, Kreuzworträtsel (Engines vorhanden) | S-BUE-01, -02 | S-GES-01 bis -03 | S-AEV-02, -04 | nur Content |
| Glossar (F-165) | G-BUE-01 | G-GES-01 | G-AEV-01 | Mechanik vorhanden; insgesamt ~320 Begriffe |
| Lernpfad (7-Stationen-Vorlage) | L-BUE-01/-02 | L-GES-01/-02 | L-AEV-01/-02 | je M; gleiche Pfadvorlage |
| Prüfungs-Rahmen (`pruefungsablauf` + Hilfen) | P-BUE-01 bis -03 | P-GES-01 bis -03 | P-AEV-01 bis -04 | Mechanik vorhanden (F-154/F-161) |
| Kursweiser Instrumente-Filter (Allowlist) | ja | ja | ja | S: Anzeige nur passender Typen, kein „noch nicht verfügbar“ |

Hinweis: Der Reihenfolge-, Rechen- und Detektiv-Engine-Aufwand fällt nur einmal an, auch für die Kurse der anderen Kursgruppen (z. B. Fachwirt Handel, Industrie, Technik); eine Abstimmung mit den anderen Kursprofil-Vorlagen vermeidet Doppelbau.

## 4.2 Unterschiede

- **Büro:** generalistisch, projekt- und prozessnah; Situationsaufgaben über alle vier Bereiche; Werkzeuge rechnen und planen (Netzplan, Kennzahlen, Besprechungen). Prüfungsrahmen kurz (10 Minuten Präsentation, ca. 40 Minuten Fachgespräch).
- **Gesundheit/Soziales:** stärkster Branchenbezug und größter Content (301 Fragen, 24 Themen, durchgängiges Beispiel Morgenlicht). **Fachrichtigkeit und Rechtsstand** (SGB V/XI/XII, ArbZG, Werberecht) sind das Hauptrisiko; keine medizinische/pflegerische Beratung, keine Leistungsbeträge als Zahlen, nur fiktive Übungswerte.
- **AEVO:** pädagogisch-rechtlich, praxisgeprüft (Unterweisung/Präsentation + Fachgespräch). Kleinster Content (113 Fragen), größte Lücken (Lernziele, Rahmenplan 2024) und der größte Nutzen durch Werkzeuge (Unterweisungs-Planer). Zielgruppe sind Erwachsene mit Ausbildungsverantwortung; JArbSchG-Inhalte betreffen Auszubildende, nicht die Lernenden selbst, daher kein Konflikt mit dem Minderjährigen-Gate.

## 4.3 Reihenfolge (Vorschlag, wenn Kapazität begrenzt)

1. Kursweiser Filter + `pruefungsablauf` für alle drei Kurse (S, sofort sichtbarer Nutzen).
2. Inhalte in bestehende Typen: Gesundheit PDCA/Risikomatrix/BSC; AEVO Handlungsfelder/Vier-Stufen/Beurteilungsfehler/Regelwerke (nur Content und kleine Illustrationen).
3. AEVO Unterweisungs-Planer plus Präsentationshilfe; Gesundheit Break-even-Rechner.
4. Glossare (zusammen mit Fachprüfung).
5. Lernpfade (L-GES-01 zuerst, weil Vorlage vorhanden).
6. Neue Spiel-Engines und übrige Werkzeuge.

---

# 5. Offene Fragen an den Produktinhaber

1. **Büro-Spiele:** Finanzkennzahlen-Kreuzworträtsel und QM-Duell stammen 1:1 aus einer früheren Nutzer-Vorgabe, passen aber nur teilweise zum Kurstext. Belassen, auf Kurstext-Begriffe kürzen oder ersetzen (S-BUE-01/-02)?
2. **Ansoff im Büro-Kurs:** ausblenden oder behalten (Kurs-Content enthält die Fragen)?
3. **Netzplan im Gesundheitskurs:** wie vorgeschlagen nicht freischalten?
4. **Fachprüfung:** Wer prüft die Inhalte (Prüfblatt-Verfahren)? Für Gesundheit wäre fachkundige Prüfung im Sozial-/Gesundheitsrecht und Pflegemanagement nötig, für AEVO eine erfahrene Ausbilderin bzw. ein Ausbilder, für Büro eine Fachwirtin/ein Fachwirt.
5. **Rechtsstand:** Dürfen Gesetzesangaben (ArbZG, JArbSchG, BBiG, SGB) mit Stand-Datum im Werkzeug stehen? Empfehlung: ja, mit sichtbarem Stand und Hinweis „Übung, keine Rechtsberatung“.
6. **Gesundheit, Zahlen:** Nur fiktive Übungswerte (Empfehlung), oder auch reale Leistungsbeträge der Pflegeversicherung? Letzteres ändert sich häufig und erfordert Pflege.
7. **AEVO-Prüfungsform:** Soll der Prüfungs-Rahmen beide Varianten (Präsentation und praktische Durchführung) unterstützen? Empfehlung: ja, mit Schwerpunkt Präsentation.
8. **Rahmenplan AEVO 2024:** Soll der Kurs-Content gegen den neuen Rahmenplan (Digitalisierung, Nachhaltigkeit, Diversität, Lernprozessbegleitung) erweitert werden (P-AEV-04)?
9. **Glossarumfang:** ~100/~140/~80 Begriffe wie vorgeschlagen, oder zunächst kleiner (z. B. ~40 je Kurs als Pilot wie bei der Fachinformatik)?
10. **Fachgespräch-Dauer Büro:** „ca. 40 Minuten“ stammt aus mehreren Quellen, widerspricht aber den 30 bis 40 Minuten eines IHK-Hinweisblatts; bitte vor Übernahme mit der örtlichen IHK oder dem Verordnungstext klären.
11. **Bezeichnung:** Kursnamen bleiben „Geprüfter Fachwirt …“; eine Umbenennung nach „Bachelor Professional“ wurde für Büro/Gesundheit nicht gefunden. Nur bei neuer Prüfungsverordnung relevant.
12. **Kapazität:** Gesamtaufwand grob (Instrumente S, Werkzeuge M, Lernpfade M, Glossar M, Engines M); welche Kurse zuerst? Empfehlung: AEVO und Gesundheit vor Büro, weil Büro bereits die meisten Bausteine hat.

---

# Quellenliste

Zugriff am 06.10.2026. Kennzeichnung: **V** = Seite abgerufen und Inhalt ausgewertet; **S** = nur Suchtreffer/Teilauszug, Inhalt nicht Zeile für Zeile geprüft.

- [Q1] V: FachkBüroPrV 2012, Verordnung über die Prüfung zum Geprüften Fachwirt für Büro- und Projektorganisation. https://www.gesetze-im-internet.de/fachkb_roprv_2012/BJNR026800012.html
- [Q2] V: FachkBüroOrgPrV, Gliederung und Durchführung der Prüfung (Buzer). http://www.buzer.de/gesetz/10095/index.htm
- [Q3] V: IHK Darmstadt, Prüfungsablauf Fachwirt Büro- und Projektorganisation. https://www.ihk.de/darmstadt/produktmarken/weiterbildung/pruefungeninderweiterbildung/bup-handreichung-6556924
- [Q4] V: IHK Südlicher Oberrhein, Hinweise zur mündlichen Prüfung. https://www.ihk.de/freiburg/bildung/weiterbildung/2weiterbildungspruefungen/fachwirt-fuer-buero-und-projektorganisation/hinweise-muendliche-pruefung-bueroproj-4076224
- [Q5] V: IHK Bonn/Rhein-Sieg, Hinweise zur Fortbildungsprüfung (abweichende Zeitangabe, vermutlich veraltet). https://www.ihk-bonn.de/fileadmin/dokumente/Branchen/Hinweise_Pruefung_BPO.pdf
- [Q6] S (PDF nur teilweise lesbar): DIHK-Rahmenplan Büro- und Projektorganisation. https://www.dihk-verlag.de/media/md_FF7917E41B956FD8EE6FF9E61137B7D0.pdf
- [Q7] V: GesWFachwPrV, Prüfung Geprüfter Fachwirt im Gesundheits- und Sozialwesen. https://www.gesetze-im-internet.de/geswfachwprv/BJNR167900011.html
- [Q8] S: DIHK Bildungs-GmbH, Prüfung Fachwirte im Gesundheits- und Sozialwesen (Seite ohne Detailangaben, Dauerangaben aus Suchtreffer). https://www.dihk-bildungs-gmbh.de/pruefungen/ihk-pruefungen/fachwirte-im-gesundheits-und-sozialwesen
- [Q10] V: AusbEignV § 2 (Handlungsfelder). https://www.gesetze-im-internet.de/ausbeignv_2009/__2.html
- [Q11] V: AusbEignV § 3 (Qualifikationsinhalte). https://www.gesetze-im-internet.de/ausbeignv_2009/__3.html
- [Q12] V: AusbEignV § 4 (Nachweis der Eignung, Prüfung). https://www.gesetze-im-internet.de/ausbeignv_2009/__4.html
- [Q13] V: IHK Ostwestfalen, neuer AEVO-Rahmenplan ab 01.07.2024 (Blog). https://blog.ostwestfalen.ihk.de/aus-und-weiterbildung/neuer-aevo-rahmenplan-ausbildungspersonal-fit-machen-fuer-die-zukunft/
- [Q14] V: JArbSchG § 8 (Dauer der Arbeitszeit). https://www.gesetze-im-internet.de/jarbschg/__8.html
- [Q15] V: JArbSchG § 11 (Ruhepausen). https://www.gesetze-im-internet.de/jarbschg/__11.html
- [Q16] V: BBiG § 20 (Probezeit). https://www.gesetze-im-internet.de/bbig_2005/__20.html
- [Q17] V: BBiG § 22 (Kündigung). https://www.gesetze-im-internet.de/bbig_2005/__22.html
- [Q18] V: BBiG § 5 (Ausbildungsordnung). https://www.gesetze-im-internet.de/bbig_2005/__5.html
- [Q19] V: ArbZG § 4 (Ruhepausen). https://www.gesetze-im-internet.de/arbzg/__4.html
- [Q20] V: ArbZG § 5 (Ruhezeit). https://www.gesetze-im-internet.de/arbzg/__5.html
- [Q21] V: SGB XI § 15 (Pflegegrade, Module). https://www.gesetze-im-internet.de/sgb_11/__15.html
- [Q22] S: GPM, Stakeholder-Matrix. https://www.gpm-ipma.de/ueber-die-gpm/blog/stakeholder-matrix-so-priorisieren-sie-stakeholder-im-projektmanagement
- [Q23] S: GPM, RACI-Matrix. https://www.gpm-ipma.de/ueber-die-gpm/blog/raci-matrix-im-projektmanagement-rollen-aufgaben-und-verantwortlichkeiten
- [Q24] S: Q7-Qualitätswerkzeuge (Ishikawa/6M, Pareto). https://skriptorium.eu/qualitaetsmanagement/q7-qualitaetswerkzeuge/
- [Q25] S: Qualitätsmodell nach Donabedian (Wikipedia). https://de.wikipedia.org/wiki/Qualit%C3%A4tsmodell_nach_Donabedian
- [Q26] S: Lernzielbereiche und Lernzielhierarchie (Praktikerseiten). https://einfach-aevo.de/lexikon/lernzielbereiche und https://aevo-pruefungsfragen.de/lernziele-aevo-feinlernziele-groblernziele-beispiele/
- [Q27] S: Vier-Stufen-Methode (Praktikerseiten). https://einfach-aevo.de/blog/vier-stufen-methode und https://www.aevoakademie.de/magazin/unterweisung-vier-stufen-methode/
- [Q28] S: Beurteilungsfehler (Praktikerseiten). https://aevo-online.com/beurteilungsfehler-erkennen-und-vermeiden/ und https://ausbilderwelt.de/diese-8-beurteilungsfehler-als-pruefer-vermeiden/
- [Q31] S: Fachwirt im Gesundheits- und Sozialwesen (Wikipedia, Rahmenplan-Empfehlung 600 Stunden aus Suchtreffer). https://de.wikipedia.org/wiki/Fachwirt_im_Gesundheits-_und_Sozialwesen

Interne Belege (Repository): `apps/web/src/Instrumente.tsx`, `apps/web/src/Spiele.tsx`, `apps/web/src/Pruefungsvorbereitung.tsx`, `apps/web/src/Pruefungsangst.tsx`, `apps/api/src/db/import-content.ts`, `apps/api/src/db/seed-games.ts`, `apps/api/src/db/seed-instrument-lernpfad.ts`, `docs/Anforderungskatalog.md` (F-24, F-25, F-105, F-129 bis F-131, F-150, F-154, F-156 bis F-175), `content/<slug>/…`, `content/instrumenten-lernpfade/README.md`.
