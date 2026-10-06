# Freigabe-Übersicht für die Kursprofil-Inhalte (Prüfblätter 06–14)

Stand 06.10.2026 · Grundlage ist deine Rahmenentscheidung R3: *neue Inhalte werden erst nach fachlicher Prüfung sichtbar*, und R4: *was deine Fachkenntnis übersteigt (v. a. Recht), bleibt „ungeprüft“ und wird nicht freigeschaltet.* Alle Inhalte unten sind Entwürfe von Claude; keiner ist bisher fachlich freigegeben.

## Stand der Freigabe

**Welle 1 ist freigegeben (06.10.2026, Nutzer-Entscheidung „Ja, Welle 1 freischalten“):** 10 Instrumente mit 40 Fragen sind im Kurs sichtbar — Git-Bereiche (Anwendungsentwicklung), BPMN-2.0-Bausteine (Daten- und Prozessanalyse), Sicherungsarten und Switching/VLAN/Routing (Systemintegration), Handlungsfelder und Lernzielbereiche (AEVO), Qualitätsdimensionen nach Donabedian und PDCA-Zyklus (Gesundheit/Soziales), Beschaffungsstrategien und SECI-Modell (Industriefachwirt). In den Tabellen unten sind diese Zeilen mit ✔ markiert. **Welle 2 ist freigegeben (06.10.2026, Nutzer-Entscheidung „Welle 2 freischalten“):** 30 Einheiten (23 Instrumente mit 92 Fragen, vier Bug-Hunt-Sets und drei Begriffe-Duelle) sind im Kurs sichtbar, ebenfalls mit ✔ markiert. Die kurzen Einzelentscheidungen aus der Spalte „Vor der Freigabe zu entscheiden“ wurden dabei **nicht einzeln getroffen**: Die Inhalte gingen unverändert so live, wie sie im jeweiligen Prüfblatt stehen (Lesart des Kurses, Grenzfälle wie dort erklärt). Die ⚠-Hinweise bleiben in den Prüfblättern stehen; wo du eine andere Fassung willst, genügt eine Korrekturliste — ich passe den Inhalt an und importiere neu.

**Noch gesperrt (Welle 3, 6 Instrumente mit 24 Fragen, drei Troubleshooting-Sets, zwei Duelle):** Verzeichnisdienst (SI), Vier-Stufen-Methode und Regelwerke der Berufsausbildung (AEVO), Kostenträger (Gesundheit/Soziales), Incoterms (Industriefachwirt), Instandhaltung nach DIN 31051 (Technischer Fachwirt), die Troubleshooting-Sets „Industrie und IoT“, „Serverdienste“ und „Switching und Routing“ sowie die Begriffe-Duelle „Recht der Berufsausbildung“ und „Gesundheits- und Sozialsystem“ — Recht, Norm oder Aussagen aus Kenntnis.

## 1. Wie die Freigabe technisch funktioniert (F-186)

Je Kurs gibt es eine **Entwurfsliste** (`KURS_ENTWURF` in `packages/shared/src/kurs-angebot.ts`). Für jeden Instrumenttyp darauf gilt:

- Die **Fragen sind inaktiv**: Sie erscheinen weder im Lernen-Quiz noch in „Gemischt lernen“, in der Vorschau, im Instrument, noch zählen sie für den Fortschritt.
- Die **Kachel** im Instrumente-Tab und der Lernpfad-Knopf fehlen, weil der Typ nicht in der Kursliste (`KURS_ANGEBOT`) steht.
- **Spielsets** (Troubleshooting, Bug-Hunt, Begriffe-Duell) stehen nicht in der Kursliste und sind unsichtbar.

**Freigabe eines Instruments** = drei Handgriffe, die ich auf Zuruf erledige: Typ aus `KURS_ENTWURF` nehmen und in `KURS_ANGEBOT` aufnehmen → `pnpm db:freigeben <kurs> <typ>` (aktiviert die Fragen in der Datenbank) → `pnpm db:apply-kurs-metadata` (zeigt die Kachel). **Freigabe eines Spielsets:** Eintrag in `KURS_ANGEBOT.spiele` ergänzen, dann `pnpm db:seed-games`. Was freigegeben ist, kann jederzeit wieder zurückgenommen werden.

### Was schon sichtbar ist (bewusst nicht gesperrt)

- Die **ergänzte Theorie** samt Karteikarten (z. B. Entwurfsmuster, Testverfahren, Git-Bereiche, Lernziele, Beurteilungsfehler, Stakeholder, Zuschlagskalkulation) — sie ist Teil der Themen. Du findest sie in den Prüfblättern unter „Neue Theorieabschnitte“; kurze Änderungen sind jederzeit möglich.
- In der Anwendungsentwicklung: drei Fragen zur neuen Zone **Zustandsdiagramm** im bestehenden Instrument „UML-Diagramme“ und das umbenannte Instrument „Ablaufstrukturen“ (kein neues Instrument, daher nicht über die Entwurfsliste zu sperren).

## 2. Risikostufen

- ● **niedrig:** reine Begriffszuordnung, in der Kurstheorie belegt, nur Randfälle in den Erklärungen.
- ◐ **mittel:** Grenzfälle oder Abweichung von der üblichen Fassung; eine kurze Entscheidung von dir nötig.
- ○ **hoch:** Recht oder Norm, Aussagen aus Kenntnis statt aus einem Lauf (Logzeilen, Fehlermeldungen) oder Inhalt, den eine Fachperson sehen sollte.

## 3. Übersicht je Kurs

Spalte „Fragen“ = Zonen-Fragen bzw. Fälle/Ausschnitte; die ⚠-Hinweise stehen im jeweiligen Prüfblatt.

### Blatt 06 — Anwendungsentwicklung (53 Einträge, 14 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ Git-Bereiche (`git`) | 4 | ● | `git fetch` liegt bei „Lokales Repository“; `reset --soft/--mixed` nur in einer Frage erklärt |
| ✔ Testverfahren (`testverfahren`) | 4 | ◐ | Schreibtischtest und zyklomatische Komplexität als statisch; Abgrenzung Testverfahren/Testart |
| ✔ Entwurfs- und Architekturmuster (`muster`) | 4 | ◐ | MVC heißt hier „Architekturmuster“, in Thema 8.4 „Entwurfsmuster“ |
| ✔ UML-Klassenbeziehungen (`klassenbeziehungen`) | 4 | ◐ | Aggregation/Komposition nach Prüfungslesart; „Ordner und Dateien“, „Warenkorb und Artikel“ |
| ✔ Bug-Hunt: Schleifen, Objektorientierung, SQL (3 Sets) | 34 | ◐ | Code technisch geprüft (JavaScript, Python, Java, C#; SQL nur SQLite); Java Nr. 10 zwei Korrekturen; SQL Nr. 11 |

### Blatt 07 — Daten- und Prozessanalyse (16 Einträge, 8 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ BPMN-2.0-Bausteine (`bpmn`) | 4 | ● | auf das Prüfungsübliche begrenzt |
| ✔ Analysewerkzeuge (`analysewerkzeuge`) | 4 | ◐ | Schwachstellenanalyse (WO) gegen Ursachenanalyse (WARUM); Schreibweise „Process Mining“ |
| ✔ Datenqualitäts-Dimensionen (`datenqualitaet`) | 4 | ◐ | Originaltext der FIAusbV zu den fünf Dimensionen noch nicht geprüft; Quantität/Vollständigkeit; Plausibilität/Richtigkeit |
| ✔ Skalenniveaus (`skalenniveaus`) | 4 | ◐ | Datum/Baujahr als Intervallskala; Notendurchschnitt |

### Blatt 08 — Digitale Vernetzung (26 Einträge, 14 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ Automatisierungspyramide (`pyramide`) | 4 | ◐ | Ebenenlesart des Kurses (ohne Nummerierung); Beschriftung der dritten Ebene |
| ✔ Sensor/Steuerung/Aktor (`sensoraktor`) | 4 | ◐ | Schütz als Aktor; Öffner-Näherungsschalter; Magnetventil |
| ✔ Industrie- und IoT-Protokolle (`industrieprotokolle`) | 4 | ◐ | Modbus als eigene Zone neben der Feldbus-Familie |
| ✔ Zonenkonzept IT/OT (`zonenkonzept`) | 4 | ◐ | MES im Produktionsnetz (Vereinfachung); „Conduit“ nur in Erklärungen |
| Troubleshooting „Industrie und IoT“ (Set) | 10 | ○ | Logzeilen aus Kenntnis (OPC-UA-Statuscode, Broker-Zahlen, Subscribe-Log) |

### Blatt 09 — Systemintegration (52 Einträge, 28 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ Sicherungsarten (`sicherungsarten`) | 4 | ● | Q-10.3-17/-18 leicht zugespitzt |
| ✔ Switching, VLAN, Routing (`switching`) | 4 | ● | Layer-3-Switch-Grenzfälle vermieden |
| ✔ RAID-Level (`raid`) | 4 | ◐ | RAID-5-Szenarien nur über Randbedingungen von RAID 6/10 abgegrenzt |
| ✔ Netzwerksicherheits-Bausteine (`netzsicherheit`) | 4 | ◐ | drei Grenzfälle (Zugriffsmatrix, VLAN nach Anmeldung, VLAN Hopping) |
| Verzeichnisdienst und Berechtigungen (`verzeichnisdienst`) | 4 | ○ | Active-Directory-Aussagen (GPO-Verknüpfung, OU in ACLs); Karteikarte K-10.1-16 angleichen |
| Troubleshooting „Serverdienste“ (Set) | 10 | ○ | eigene fünf Ebenen; Logzeilen und Fehlermeldungen aus Kenntnis |
| Troubleshooting „Switching und Routing“ (Set) | 10 | ○ | Duplex-Mismatch Schicht 1 oder 2; DHCP-Relay Schicht 3 oder 7; Logzeilen aus Kenntnis |
| ✔ Bug-Hunt „Skripte und Konfiguration“ (Set) | 12 | ◐ | Bash/Python/PowerShell geprüft; sshd_config, nginx, ufw nur von Hand; ufw Nr. 12 am schwächsten |

### Blatt 10 — AEVO (40 Einträge, 20 Hinweise, **mit Rechtsfragen**)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ Handlungsfelder der AEVO (`handlungsfelder`) | 4 | ● | „Ausbildungsplan erstellen“ in HF 2 (Stolperfalle, erklärt) |
| ✔ Lernzielbereiche (`lernzielbereiche`) | 4 | ● | „Belege den Konten zuordnen“ als kognitiv |
| ✔ Beurteilungsfehler (`beurteilungsfehler`) | 4 | ◐ | Namensliste (Nikolaus-Effekt beim Recency-Effekt) |
| Vier-Stufen-Methode (`vierstufen`) | 4 | ◐ | **Entscheidung nötig:** Kursfassung (Stufe 1 = Vorbereiten, Vormachen, Erklären) gegen die übliche Fassung mit vier getrennten Stufen — betrifft Theorie, Zonen, Fragen |
| Regelwerke der Berufsausbildung (`regelwerke`) | 4 | ○ | **Recht:** zwei eigene Konkretisierungen (10-Stunden-Schicht, Wochenendeinsatz einer 17-Jährigen); Rahmenlehrplan kein Bundesrecht |
| Begriffe-Duell „Recht der Berufsausbildung“ (Set) | 20 | ○ | **Recht:** Paragrafenzuordnung aus dem Kurs, § 102 BetrVG in der Probezeit, eigene Distraktoren |

### Blatt 11 — Gesundheit/Soziales (32 Einträge, 14 Hinweise, **mit Sozialrecht**)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ Qualitätsdimensionen nach Donabedian (`donabedian`) | 4 | ● | Arbeits- und Gesundheitsschutz als Strukturqualität (Randfall) |
| ✔ PDCA-Zyklus (`pdca`, vorhandenes Instrument) | 4 | ● | keine; wiederherstellen: `liste(OHNE())` statt `OHNE("pdca")` |
| Kostenträger (`kostentraeger`) | 4 | ○ | **Sozialrecht:** häusliche Krankenpflege = GKV (Schlussfolgerung); PKV-Begriffe überschneiden sich; „kommunaler Träger“ in Q-4.2-16 |
| Begriffe-Duell „Gesundheits- und Sozialsystem“ (Set) | 20 | ○ | **Recht:** Probezeit sechs Monate (Arbeitsverhältnis), Kündigungsschutz ohne Betriebsgröße, „Mitarbeitervertretung“ |

### Blatt 12 — Büro- und Projektorganisation (32 Einträge, 14 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ ABC-Analyse (`abc`) | 4 | ◐ | B-Klasse nur Allgemeinwissen; XYZ-Hinweis in Q-4.2-11; keine Prozentgrenzen |
| ✔ Projektphasen (`projektphasen`) | 4 | ◐ | sechs Zonen der Kurstheorie statt vier üblicher Phasen; Steuerung/Kontrolle |
| ✔ Stakeholder-Matrix (`stakeholder`) | 4 | ◐ | nicht im Rahmenplan belegt — soll sie im Kurs bleiben? |
| ✔ Begriffe-Duell „Projektmanagement“ (Set) | 20 | ◐ | Netzplan-Fragen 13–15 (Lesart „B und C parallel“); Lastenheft/Gantt fehlen im Kurs |

*Außerdem offen aus der Kursprofil-Entscheidung:* Ansoff-Matrix, Kreuzworträtsel „Finanzkennzahlen“ und Kennzahlen-Duell „QM und Prozesse“ im Büro-Kurs.

### Blatt 13 — Industriefachwirt (44 Einträge, 21 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ SECI-Modell (`seci`) | 4 | ● | Beispiel „Vergleich mit Bildern“ (Externalisierung) nicht im Kurs |
| ✔ Beschaffungsstrategien (`beschaffung`) | 4 | ● | JIT gegen Einzelbeschaffung über „auftragsbezogen“/„laufend“ getrennt |
| ✔ PPS-Aufgaben (`pps`) | 4 | ◐ | Ablaufplanung/Kapazitätsabgleich zwischen Werken |
| ✔ Ishikawa-Diagramm (`ishikawa`) | 4 | ◐ | „Management“ gedeutet (Kurs nennt nur den Namen); Grenzfälle |
| ✔ Zuschlagskalkulation (`kalkulation`) | 4 | ◐ | „Selbstkosten“ im Kurs in zwei unterschiedlich weiten Formulierungen — Theorie glätten |
| Incoterms (`incoterms`) | 4 | ○ | ICC-Regelwerk (nur eigene Worte); FOB-Aussage zum Seetransport; keine Aussage zu CIF-Gefahrenübergang |
| ✔ Begriffe-Duell „Kosten und Leistungen“ (Set) | 20 | ◐ | Titel „und Leistungen“ dünn gedeckt; Frage 20 absolut formulierte falsche Antwort |

### Blatt 14 — Technischer Fachwirt (40 Einträge, 22 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ✔ TOP-Prinzip (`top`) | 4 | ◐ | Kursfassung TOP statt STOP (Substitution); Unterweisung als organisatorisch |
| ✔ Fertigungsverfahren (`fertigungsverfahren`) | 4 | ◐ | „Stoffeigenschaft ändern“ nur mit Härten belegt (dünne Kursbasis) |
| ✔ Ishikawa-Diagramm 6M (`ishikawa6m`) | 4 | ◐ | „Management“ gedeutet; Milieu (Umwelt) statt Mitwelt |
| ✔ Zuschlagskalkulation (`kalkulation`) | 4 | ◐ | wie Industriefachwirt (Bezugsgrößen Standard, im Kurs bisher nicht ausdrücklich) |
| Instandhaltung nach DIN 31051 (`instandhaltung`) | 4 | ○ | Normbegriffe in der Kursfassung (Rechtsstand-Vermerk „fachlich/rechtlich prüfen“); Beispiele ohne Kursbeleg |
| ✔ Begriffe-Duell „Technische Unterscheidungen“ (Set) | 20 | ◐ | Frage 17 (Betriebsarzt gegen Fachkraft), Frage 20 (FI-Schutzschalter gegen Not-Aus) |

### Blatt 15 — Wirtschaftsfachwirt (nachträglich ergänzt, 8 Fragen und ein Duell-Set, 12 Hinweise)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| Investitionsrechenverfahren (`investition`) | 4 | ◐ | Amortisationsrechnung als statisches Verfahren (Kursfassung); „Kalkulationszinssatz“ gegen „kalkulatorische Zinsen“ in Q-2.1-15; Eindeutigkeit von Q-2.1-17 |
| Vier-Seiten-Modell (`vierseiten`) | 4 | ● | einteilige Beziehungsebene (Kursfassung); Grenzfälle in Q-5.1-16 (Senderabsicht); Ton der Beispielsätze |
| Begriffe-Duell „Finanzierung und Controlling“ (Set) | 20 | ◐ | Frage 8 (Kapitalwert gegen internen Zinsfuß), Frage 17 (ROI-Definition), Frage 9 (Annuität „eignet sich besonders“) |

Alles noch Entwurf (F-187): Instrumente in `KURS_ENTWURF`, Duell nicht in der Kursliste. Vorschlag: Vier-Seiten-Modell und die beiden ◐-Einheiten in der nächsten Freigabewelle.

### Blatt 16 — Transport/Logistik (nachträglich ergänzt, 8 Fragen und ein Duell-Set, **mit Fracht- und Zollrecht**)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| Verkehrsträger (`verkehrstraeger`) | 4 | ◐ | Luft bei „verderblich, schnell beim Empfänger“ (Q-2.3-14, -15); Abgrenzung zu Q-2.3-10 in Q-2.3-16 |
| ABC-Analyse (`abc`) | 4 | ◐ | B-Klasse nur sinngemäß abgeleitet (Q-2.2-14); Q-2.2-16 „Planbarkeit ändert nie die Wertklasse“ |
| Begriffe-Duell „Spedition und Fracht“ (Set) | 20 | ○ | **Recht:** HGB-Frachtrecht (Fragen 1–3), CMR (4, 6), Zollrecht (17–19); Fachperson empfohlen |

Alles noch Entwurf (F-188): Instrumente in `KURS_ENTWURF`, Duell nicht in der Kursliste.

### Blatt 17 — Handelsfachwirt (nachträglich ergänzt, 16 Fragen, ein Duell-Set und zwei neue Theorieabschnitte)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| ABC-Analyse (`abc`) | 4 | ◐ | B-Klasse und Maßnahmen für B/C sind Ableitungen aus „mittlerer Bereich“ (Q-4.1-14, -15) |
| XYZ-Analyse (`xyz`) | 4 | ◐ | Basic-Artikel als X abgeleitet (Q-4.1-17); „Y = mittlere Vorhersagegenauigkeit“ nur in einer Karteikarte (Q-4.1-18) |
| Handelskalkulation (`handelskalkulation`) | 4 | ◐ | neue Theorie ohne Zwischenstufen (Bar-, Ziel-, Zieleinkaufspreis); Q-5.3-17 umformuliert |
| Kraljic-Matrix (`kraljic`) | 4 | ◐ | neue Theorie; Feldbezeichnungen und Normstrategien lehrbuchabhängig |
| Begriffe-Duell „Handel: ähnlich, aber nicht gleich“ (Set) | 20 | ◐ | Fragen 18–20 (Incoterms, Akkreditiv, Ursprung) berühren Außenhandels- und Zollrecht |

Alles noch Entwurf (F-189): Instrumente in `KURS_ENTWURF`, Duell nicht in der Kursliste. **Bereits sichtbar:** die zwei neuen Theorieabschnitte samt je drei Karteikarten (Handelskalkulation in 5.3, Kraljic-Matrix in 7.1).

### Blatt 18 — Immobilienfachwirt (nachträglich ergänzt, 20 Fragen und ein Duell-Set, **mit Miet-, WEG-, Bau- und Maklerrecht**)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| Wertermittlungsverfahren (`wertermittlung`) | 4 | ◐ | Bodenwert in mehreren Verfahren (Q-6.3-13, -16 bewusst mehrdeutig) |
| DIN-276-Kostengruppen (`kostengruppen`) | 4 | ○ | Norm; Theorie 5.4 ordnet die Erschließung der KG 500 zu (nach DIN 276 vermutlich KG 200); KG-600-Beispiele abgeleitet |
| Wege der Mieterhöhung (`mieterhoehung`) | 4 | ○ | **Mietrecht (BGB):** Kurswortlaut mit Paragrafen und Zahlen; Rechtsstand prüfen |
| Betriebskosten (`betriebskosten`) | 4 | ○ | **BetrKV/Heizkostenverordnung:** Zone „Verbrauchsabhängig“ überschneidet sich mit „Umlagefähig“ |
| WEG-Organe (`wegorgane`) | 4 | ○ | **WEG-Recht:** Verwaltungsbeirat nicht durch die Theorie belegt — Theorieabsatz ergänzen oder Zone streichen |
| Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich“ (Set) | 20 | ○ | **Recht:** Fragen 2–5, 7–9, 13, 14, 18, 20; Fachperson empfohlen |

Alles noch Entwurf (F-190): Instrumente in `KURS_ENTWURF`, Duell nicht in der Kursliste. Vorschlag: Wertermittlungsverfahren in der nächsten Freigabewelle; der Rest gehört zur Rechtsprüfung (Welle 3).

### Blatt 19 — Versicherungen/Finanzanlagen (nachträglich ergänzt, 8 Fragen und ein Duell-Set, **mit Versicherungs-, Beratungs- und Steuerrecht**)

| Freigabe-Einheit | Fragen | Risiko | Vor der Freigabe zu entscheiden |
| --- | ---: | :---: | --- |
| Kennzahlen der Versicherungstechnik (`versicherungskennzahlen`) | 4 | ◐ | Kurswortlaut „unter 100 Prozent“ in einem Begriff; Ableitungen in Q-4.1-16 bis -19 |
| Drei-Schichten-Modell der Altersvorsorge (`altersvorsorge`) | 4 | ○ | **Steuer-/Sozialversicherungsrecht:** Ableitungen (Zulagen, Direktversicherung, Pensionsfonds), „grundsätzlich nicht vererbbar“ absoluter formuliert; Rechtsstand prüfen |
| Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich“ (Set) | 20 | ○ | **Recht:** Fragen 1, 4, 5, 11, 12, 13, 16 gegenlesen |

Alles noch Entwurf (F-191): Instrumente in `KURS_ENTWURF`, Duell nicht in der Kursliste. Vorschlag: Kennzahlen der Versicherungstechnik in der nächsten Freigabewelle; der Rest gehört zur Rechtsprüfung (Welle 3).

## 4. Empfohlene Reihenfolge

**Welle 1 — schnell, geringes Risiko (10 Instrumente, 40 Fragen) — erledigt am 06.10.2026:** Git-Bereiche (AE) · BPMN (DPA) · Sicherungsarten und Switching (SI) · Handlungsfelder und Lernzielbereiche (AEVO) · Donabedian und PDCA (Gesundheit/Soziales) · SECI und Beschaffungsstrategien (Industrie). Dafür genügt es, die Fragen im jeweiligen Prüfblatt zu überfliegen und die ⚠-Hinweise zu lesen.

**Welle 2 — mittleres Risiko, je eine kurze Entscheidung — freigegeben am 06.10.2026 (ohne Einzelentscheidungen, siehe oben):** alle übrigen ◐-Instrumente, die drei Bug-Hunt-Sets (Anwendungsentwicklung), das Bug-Hunt-Set „Skripte und Konfiguration“ und die Begriffe-Duelle Projektmanagement, Kosten und Leistungen sowie Technische Unterscheidungen.

**Welle 3 — ○, Fachperson oder Entscheidung nötig:** die drei Troubleshooting-Sets, Verzeichnisdienst, Instandhaltung nach DIN 31051, Incoterms, Regelwerke der Berufsausbildung, Kostenträger, die Duelle mit Recht (AEVO, Gesundheit/Soziales) und die Vier-Stufen-Methode (Fassung klären).

## 5. So gibst du Freigaben

Eine kurze Liste im Gespräch genügt, z. B.:

> Freigegeben: AE git, SI sicherungsarten und switching, IND seci. Ändern: AEVO vierstufen — bitte die übliche Fassung mit vier getrennten Stufen. Streichen: Büro stakeholder. Rest bleibt gesperrt.

Ich setze das um (Entwurfsliste, Kursliste, Datenbank), erzeuge die Prüfblätter bei Änderungen neu und prüfe live, dass genau das Freigegebene sichtbar ist.
