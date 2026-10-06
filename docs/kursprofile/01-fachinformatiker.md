# Kursprofil-Vorschlag: Fachinformatiker-Kurse (Entscheidungsvorlage)

Stand: 06.10.2026 · Status: **Entwurf zur Freigabe — es wurde nichts umgesetzt.** Jede Zeile „☐ ja ☐ nein ☐ ändern" ist eine Entscheidung des Produktinhabers. Quellenkürzel in eckigen Klammern (z. B. [Q5]) verweisen auf die Quellenliste am Ende.

## Kurzfassung

1. **Befund:** Alle vier Fachinformatiker-Kurse haben heute exakt dieselbe Ausstattung (17 Quiz-Instrumente, 6 Übungswerkzeuge, 9 Spieltypen mit identischen Sets, dieselben 5 Lernpfade, dasselbe Glossar aus FU1–FU7). Die Prüfung unterscheidet sich je Fachrichtung aber in Projekt und zwei schriftlichen Teil-2-Bereichen [Q1][Q3].
2. **Bewertungsmaßstab:** „passt (Kern)" = gehört zu den fachrichtungsspezifischen Prüfungsbereichen; „passt (Grundlagen)" = Stoff des gemeinsamen Teils 1 / der gemeinsamen Fachgebiete FU1–FU7; „passt nicht"; „unsicher". Vorschlag: Grundlagen-Angebote bleiben, werden aber in einer eigenen Gruppe „Grundlagen (Teil 1)" geführt, nicht im Kernangebot der Fachrichtung.
3. **Überall ausblenden:** SWOT-Matrix, Balanced Scorecard, Ansoff-Matrix (BWL-Modelle ohne Prüfungsbezug; SWOT im AP1-Katalog 2025 gestrichen [Q7]). Eisenhower-Matrix: unsicher.
4. **Prüfungskatalog-Änderung mit Folgen:** Struktogramm und Programmablaufplan sind seit 2025 aus den IHK-Prüfungskatalogen gestrichen, UML/BPMN rücken nach [Q5]. Das Instrument „Struktogramm und Programmablauf" sollte umgebaut werden (Vorschlag: „Ablaufstrukturen" mit Pseudocode/Aktivitätsdiagramm).
5. **Anwendungsentwicklung (Blaupause, aber ebenfalls zu schärfen):** Netzwerk-Troubleshooting ausblenden; neu vor allem Entwurfsmuster, UML-Klassenbeziehungen, Testverfahren, Git, Anomalien, Schreibtisch-/Sortier-/Testfall-Trainer.
6. **Daten- und Prozessanalyse:** Server-/Netz-Werkzeuge nur noch als Grundlagen; neu BPMN/Notationen, Prozessanalyse-Werkzeuge, Datenqualitäts-Dimensionen (die fünf aus FIAusbV laut Kursinhalt), Statistik-Rechner, Prozess- und Daten-Detektiv.
7. **Digitale Vernetzung:** neu Automatisierungspyramide, Sensor-Steuerung-Aktor, Industrie-Protokolle, Zonenkonzept (IEC 62443), MQTT-Labor, Skalierungs-/Modbus-Rechner, Industrienetz-Szenarien in der Topologie.
8. **Systemintegration:** neu Sicherungsarten, RAID, Netzwerksicherheits-Bausteine, Verzeichnisdienst-Struktur, Backup-/RAID-/Verfügbarkeits-Rechner, Admin-Szenarien im Terminal, Regel-Richter (Firewall/ACL).
9. **Gemeinsam bauen (nicht viermal):** ein **Kursprofil-Mechanismus** (Whitelist je Kurs, Szenarien-/Set-Filter, Gruppe „Grundlagen"), Nutzwert-/Wirtschaftlichkeitsrechner, IT-Rechen-Sprint, Schreibtischtest-Trainer, Angriffsarten, DSGVO-Grundsätze, Monitoring-Kategorien (Abschnitt 4).
10. **Unsicherheiten ehrlich benannt:** Die amtlichen IHK-Prüfungskataloge (U-Form/AkA) sind nicht frei verfügbar; für SI, DPA und DV stützen sich die Themenlisten auf FIAusbV, Rahmenlehrplan, IHK-Erläuterungen und Sekundärquellen. **Jeder neue Inhalt braucht ein Prüfblatt zur fachlichen Prüfung** (Vorgehen wie bisher in `docs/pruefblaetter`). Es wurden keine Prüfungsaufgaben übernommen, nur Themen und Strukturen abgeleitet.

### Legende und Konventionen

- **Urteile:** *passt (Kern)* · *passt (Grundlagen)* · *passt nicht* · *unsicher* (mit Tendenz). „Ausblenden" bedeutet: im Kurs nicht angeboten (nicht nur eingeklappt unter „Weitere Instrumente").
- **Aufwand:** S = reine Daten/Content (Eintrag in `QUADRANT_MODELS`, Illustration, drei Quizfragen im Thema); M = neue Komponente oder generierter Inhalt, überschaubar; L = neue Engine/Editor oder sehr viel Content.
- **Priorität:** hoch / mittel / niedrig (nach Prüfungsnähe und Aufwand-Nutzen).
- **Zonen-Grenze:** Zonen-Instrumente haben heute 3–7 Zonen (`QUADRANT_MODELS`); Vorschläge halten das ein.
- **Theorie-Voraussetzung:** Jeder Instrument-Vorschlag braucht passende Theorie im Kurs (Quizfragen verweisen auf ein Thema). Wo die vorhandene Theorie dünn ist, steht „Theorie-Lücke".
- **Fiktive Kunden** in Fallbeispielen wie im Bestand: Brevanta IT-Systemhaus GmbH, Hartmann Metallbau GmbH, Nordlicht Logistik AG, Sonnenhof Apotheken KG, Rheinwerk Maschinen GmbH, Kaufhaus Brandt.
- Alle Spiele und Werkzeuge vergeben **keine Belohnung** und speichern keinen Fortschritt (F-175); das gilt unverändert für alle Vorschläge.

---

## Ist-Stand der Ausstattung (zur Orientierung)

| Bereich | Heute in allen vier Kursen identisch |
|---|---|
| Instrumente (Quiz mit Illustration) | Mit Content in FU1–FU6: SWOT, Gantt, Eisenhower, PDCA, Risikomatrix, Projektstrukturplan/Organigramm, OSI, Schutzziele, SQL-Befehlsgruppen, Scrum, UML, Teststufen, ER-Modell, Normalformen, Ablaufstrukturen (BSC/Ansoff haben keinen Content). Quelle: `apps/web/src/Instrumente.tsx`, `content/README.md` |
| Übungswerkzeuge | Netzplan, Subnetting-Rechner, SQL-Übungsfläche (18 Aufgaben), Terminal-Szenarien (12), Netzwerk-Topologie (9), Flag-Rätsel (14); freigeschaltet über `kurs.metadata.werkzeuge` (`apps/api/src/db/import-content.ts`) |
| Spiele | Kreuzworträtsel (2 Sets), Begriffe-Duell (2), Memory (2), Phishing-Detektiv, Bug-Hunt, Code-Reihenfolge, Troubleshooting-Detektiv, Subnetting-Sprint, Zahlensystem-Sprint (`apps/api/src/db/seed-games.ts`) |
| Lernpfade | Scrum, OSI, Schutzziele, Normalformen, ER-Modell (derselbe Pfad „Datenmodell" an zwei Instrumenten) (`seed-instrument-lernpfad.ts`) |
| Glossar | 157 Entwurfs-Einträge je Kurs aus FU1–FU7, alle „ungeprüft"; die kursspezifischen Fachgebiete (AE1–5, DP1–5, DV1–5, SI1–5) haben **kein** Glossar |
| Prüfungs-Rahmen | Prüfungsablauf, Prüfungsbereiche in der Simulation, Projekt-Hilfe (80 h bzw. 40 h), Präsentation 15 Min., Fachgespräch-Fragen (FU1, FU6, xx5) — inhaltlich je Kurs weitgehend gleich |

---

## Kurs A — Fachinformatiker/in Anwendungsentwicklung (`fachinformatiker-anwendungsentwicklung`)

### A.1 Prüfungsrahmen (Kurzfassung)

- **Teil 1** (4. Ausbildungshalbjahr, 20 % der Gesamtnote): „Einrichten eines IT-gestützten Arbeitsplatzes", schriftlich, 90 Min., für alle IT-Berufe gleich [Q1][Q3][Q4].
- **Teil 2:** (a) *Planen und Umsetzen eines Softwareprojektes* — betriebliche Projektarbeit bis **80 Std.** mit Dokumentation, Präsentation (höchstens 15 Min.) und Fachgespräch (zusammen höchstens 30 Min.), **50 %**; (b) *Planen eines Softwareproduktes* 90 Min., 10 %; (c) *Entwicklung und Umsetzung von Algorithmen* 90 Min., 10 %; (d) *Wirtschafts- und Sozialkunde* 60 Min., 10 % [Q1].
- **Inhalte laut FIAusbV (nach Abruf-Zusammenfassung, Paragrafen vor Übernahme prüfen):** (b) Entwicklungsumgebungen auswählen, Programmspezifikationen festlegen, Bedienoberflächen konzipieren, Qualitätskontrollen planen; (c) Programmcode interpretieren und Lösungen erstellen, Algorithmen in Programmlogik übertragen, Testszenarien auswählen, Datenbankabfragen erstellen [Q1].
- **Rahmenlehrplan:** gemeinsame Lernfelder 1–9, danach LF 10a Benutzerschnittstellen gestalten und entwickeln, LF 11a Funktionalität in Anwendungen realisieren (Diagramme/Modelle, iteratives Vorgehen, automatisierte Tests), LF 12a Kundenspezifische Anwendungsentwicklung [Q2].
- **Prüfungskatalog (2. Auflage, ab AP1 Frühjahr/AP2 Sommer 2025):** *gestrichen:* Struktogramm und PAP; *neu/verstärkt:* UML und BPMN, Scrum, Design- und Architekturmuster, TDD, Last-/Performancetests, Kapselung/Sichtbarkeit, Sortierverfahren (Bubble/Selection/Insertion), Anomalien und Redundanzen, SQL-Injection/MitM/DDoS, Kerberos, Softwarequalität nach ISO-Norm, einheitliche **Belegsätze** (z. B. SQL-Syntax-Beiblatt in der Prüfung), SQL und RAID nur in Teil 2 [Q5][Q6]. **Widerspruch:** [Q5] nennt KI als neu, [Q6] nennt KI/IoT unter „gestrichenen Trendthemen" → *unsicher*.
- **Häufigkeit in bisherigen AP2-FIAE-Prüfungen (Sekundärquelle):** Datenbanken 83 %, Softwareentwicklung 83 %, UML 78 %, Algorithmen 72 %, SQL 50 %, Testen 50 % [Q8].
- **Hilfsmittel/Bestehen:** nicht programmierbarer Taschenrechner [Q4]; Bestehensregeln und mündliche Ergänzungsprüfung (15 Min.) wie in [Q3].

### A.2 Bestandsbewertung

| Angebot (heute) | Urteil | Begründung / Beleg |
|---|---|---|
| **Instrumente** | | |
| SWOT-Matrix | passt nicht | BWL-Modell; in §§ 12–14 nicht genannt [Q1]; im AP1-Katalog 2025 gestrichen [Q7]. Quizfrage in FU1 1.2 bleibt als normale Frage (zu klären, Frage 3 in Abschnitt 5). |
| Balanced Scorecard | passt nicht | BWL; kein Bezug zu LF 10a–12a [Q2]; im Kurs ohne Content. |
| Ansoff-Matrix | passt nicht | wie BSC. |
| Gantt-Diagramm | passt (Kern) | Projektbeschreibung muss eine Zeitplanung enthalten [Q3]; Projektplanung ist Prüfungsinhalt (§ 12) [Q1]; Gantt in AP1-Aufgaben [Q8]. |
| Eisenhower-Matrix | unsicher (Tendenz: ausblenden) | Berufsbildposition „Projektmanagement und Arbeitsaufgaben-Planung" [Q1], aber kein Prüfungsbeleg gefunden. |
| PDCA-Zyklus | passt (Grundlagen) | Berufsbildposition Qualitätssicherung [Q1]; FU6 6.3; für AE nicht prüfungsprägend. |
| Risikomatrix | passt (Grundlagen) | IT-Sicherheit/Risiko: LF 4 Schutzbedarfsanalyse [Q2]; BSI-Schutzbedarf [Q13]. |
| Projektstrukturplan / Organigramm | passt (Kern) | PSP gehört zur Projektplanung (§ 12) [Q1]; Organigramm: Betriebsorganisation (WiSo, integrative Berufsbildposition) [Q1]. |
| OSI-Modell | passt (Grundlagen) | Netzwerktechnik in ca. 90 % der AP1-Prüfungen [Q8], LF 3/9 [Q2]; kein Teil-2-Bereich der AE. |
| Schutzziele | passt (Kern) | IT-Sicherheit/Datenschutz (Berufsbildposition) [Q1], LF 4 [Q2], AP1 [Q7]; AE2 „Sicherheit in der Softwareentwicklung". |
| SQL-Befehlsgruppen | passt (Kern) | § 14 „Datenbankabfragen erstellen" [Q1]; SQL nur in Teil 2 [Q5]; SQL in ca. 50 % der AP2-AE [Q8]. |
| Scrum | passt (Kern) | Scrum ausdrücklich im Katalog [Q6]; AP1 Wasserfall + Scrum [Q7]; Scrum Guide 2020 [Q20]. |
| UML-Diagramme | passt (Kern) | UML in ca. 78 % der AP2-AE [Q8]; Katalog UML/BPMN [Q5]. Lücke: Zustandsdiagramm fehlt im Instrument. |
| Teststufen (V-Modell) | passt (Kern) | § 13 Qualitätskontrollen planen, § 14 Testszenarien [Q1]; Testen ca. 50 % [Q8]. |
| ER-Modell | passt (Kern) | Datenbanken ca. 83 % [Q8]; ER-Modell auch in AP1 [Q8]. |
| Normalformen | passt (Kern) | Anomalien/Redundanzen im Katalog neu [Q6]; Datenbankdesign [Q9]. |
| Struktogramm und Programmablauf | unsicher (Tendenz: umbauen) | Struktogramm/PAP gestrichen [Q5]; das Konzept Sequenz/Verzweigung/Schleife bleibt über Pseudocode und Aktivitätsdiagramm relevant [Q9]. Vorschlag: umbenennen in „Ablaufstrukturen", Beispiele als Pseudocode/Aktivitätsdiagramm. |
| **Übungswerkzeuge** | | |
| Netzplan | passt (Grundlagen) | Netzplan in AP1-Aufgaben [Q8]; im Katalog 2025 nicht ausdrücklich genannt → Beleg schwach. |
| Subnetting-Rechner | passt (Grundlagen) | IPv4/IPv6 im AP1-Katalog [Q7]; kein AE-Teil-2-Bezug. |
| SQL-Übungsfläche | passt (Kern) | § 14 [Q1]; SQL nur AP2 [Q5]; „Belegsatz" siehe Vorschlag W-FI-04. |
| Terminal-Szenarien | passt (Grundlagen) — nur Stufe „leicht" (4) | Client-Fehlersuche (Standardroute, DNS, APIPA, Festplatte voll) passt zum Arbeitsplatz (AP1, LF 3) [Q2][Q4]; die 8 mittleren/schweren Server-Szenarien (Cron, ufw, Prozesse …) passen nicht zur AE. |
| Netzwerk-Topologie | passt (Grundlagen) — nur Stufe „leicht" (3) | „Clients in Netzwerke einbinden" (LF 3) [Q2]; VLAN/NAT/Firewall/Routing-Szenarien passen nicht. |
| Flag-Rätsel | passt (Grundlagen) — Auswahl | Kodierung/Hash, Passwort-Hashes, JWT, Pfad-Traversal, Phishing-Header passen zu Anwendungssicherheit [Q6]; Logs/SSH/offene Ports/DNS-Tunnel eher SI. |
| **Spiele** | | |
| Kreuzworträtsel (2 Sets) | passt (Grundlagen) | Sets sind generisch; Satz „Netzwerk und IT-Sicherheit" nur Grundlagen. Kein AE-spezifisches Set. |
| Begriffe-Duell (2 Sets) | passt (Kern) | „SQL und Datenmodellierung" passt zu § 14 [Q1]; „IT-Grundlagen" generisch. |
| Memory (2 Sets) | passt (Grundlagen) | „Ports und Protokolle" ist Netzwerkgrundlage; „IT-Begriffe" generisch. |
| Phishing-Detektiv | passt (Grundlagen) | IT-Sicherheit/Datenschutz in AP1 [Q7]. |
| Bug-Hunt | passt (Kern) | § 14 „Programmcode interpretieren" [Q1]; Python/JavaScript/Java/SQL passen. |
| Code-Reihenfolge | passt (Kern) | § 14 „Algorithmen in Programmlogik übertragen" [Q1]; Parsons-Aufgaben sind didaktisch belegt [Q22]. |
| Troubleshooting-Detektiv | passt nicht | Netzwerkstörungen sind kein AE-Prüfungsbereich [Q1]. |
| Subnetting-Sprint | passt (Grundlagen) | wie Subnetting-Rechner. |
| Zahlensystem-Sprint | passt (Grundlagen) | Datenmengen/Übertragungsraten/Hex in AP1 [Q7]. |
| **Zusatzpakete** | | |
| Glossar FU1–FU7 (157) | passt (Grundlagen) | Gemeinsamer Stoff; AE1–5 haben kein Glossar → Vorschlag G-AE-01. |
| Lernpfad Scrum | passt (Kern) | siehe Scrum. |
| Lernpfad OSI | passt (Grundlagen) | siehe OSI. |
| Lernpfad Schutzziele | passt (Kern) | siehe Schutzziele. |
| Lernpfade Normalformen / ER-Modell | passt (Kern) | siehe dort. |
| Prüfungs-Rahmen | passt, zu schärfen | 80-h-Projekt, Bereichszuordnung AE1–3 / AE4+FU4+FU5 vorhanden (`import-content.ts`); Ergänzungen P-AE-01/02. |

**Folge für das Profil (Vorschlag):** Ausblenden: SWOT, BSC, Ansoff, Troubleshooting-Detektiv, die 8 mittleren/schweren Terminal-Szenarien, die 6 mittleren/schweren Topologie-Szenarien; „Grundlagen"-Gruppe: OSI, PDCA, Risikomatrix, Netzplan, Subnetting, Zahlensysteme, Phishing, Terminal/Topologie (leicht), Flag-Rätsel (Auswahl); Eisenhower: Entscheidung offen.

### A.3 Neue Vorschläge

#### Instrumente (Zonen-/Struktur-Zuordnung mit Illustration)

#### I-AE-01 · Entwurfs- und Architekturmuster — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Singleton, Fabrikmethode (Factory), Beobachter (Observer), MVC*. Begriffe sind Situationsbeschreibungen („genau eine Instanz der Konfiguration im ganzen Programm", „Änderungen automatisch an alle Anzeigen melden", „Oberfläche, Logik und Daten trennen").
- **Nutzen/Passung:** Design- und Architekturmuster sind im Katalog genannt [Q5][Q6]; Design Patterns kommen in AP2-AE-Aufgaben vor [Q8]. MVC steht bereits in ae1 8.4.
- **Risiken:** **Theorie-Lücke** (Singleton/Observer kommen im Content nur am Rande vor, MVC in ae1 8.4) → Theorieabschnitt in ae1/ae3 ergänzen. GoF-Entwurfsmuster und MVC (Architekturmuster) sind verschiedene Kategorien; die Erklärung muss das ausweisen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-02 · Sichtbarkeit und Kapselung — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *private, protected, public* (optional „paketweit"); Begriffe sind Codeausschnitte/Zugriffsfälle („Methode wird nur in derselben Klasse aufgerufen", „Unterklasse darf zugreifen").
- **Nutzen/Passung:** Kapselung und Sichtbarkeit im Katalog vertieft [Q6][Q9]; Kapselung in 5 AE-Dateien bereits vorhanden.
- **Risiken:** Sprachabhängig (Java/C#/Python-Konvention). Es genügt die Java/C#-Sicht mit Hinweis auf Python-Konvention.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-03 · UML-Klassenbeziehungen — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Assoziation, Aggregation, Komposition, Vererbung (Generalisierung), Abhängigkeit*. Begriffe sind Sachverhalte („Ein Raum existiert nicht ohne sein Gebäude", „Die Unterklasse erbt von …").
- **Nutzen/Passung:** UML in ca. 78 % der AP2-AE [Q8]; Klassendiagramm gehört zu Programmspezifikation (§ 13) [Q1]. Ergänzt das bestehende Instrument „UML-Diagramme" (Diagrammtypen) um die Beziehungsebene.
- **Risiken:** Aggregation vs. Komposition wird in der Literatur uneinheitlich gelehrt; Erklärtexte müssen die in der Prüfung übliche Lesart festhalten (Prüfblatt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-04 · Testverfahren (statisch / dynamisch, Black-Box / White-Box) — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Statische Verfahren (Review, Schreibtischtest, Codeanalyse), Dynamisch: Black-Box (Äquivalenzklassen, Grenzwerte), Dynamisch: White-Box (Anweisungs-/Zweigüberdeckung)*. Ergänzt „Teststufen" (die V-Modell-Stufe).
- **Nutzen/Passung:** § 14 Testszenarien auswählen [Q1]; „statische und dynamische Testverfahren" ausdrücklich in den Themen [Q9]; Code Coverage, Black-/White-Box in AP2-AE-Aufgaben [Q8]. Theorie vorhanden in ae4 11.3 und ae2 9.2.
- **Risiken:** gering; Abgrenzung Testverfahren/Teststufe/Testart sauber erklären.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-05 · Softwarequalitätsmerkmale (ISO/IEC 25010) — Priorität mittel · Aufwand S
- **Aufbau:** höchstens 7 Zonen, Vorschlag: *Funktionale Eignung, Leistungseffizienz, Benutzbarkeit/Interaktion, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit/Kompatibilität*. Begriffe sind Anforderungssätze („Antwortzeit unter 2 Sekunden" → Leistungseffizienz).
- **Nutzen/Passung:** „Softwarequalitätsmerkmale nach ISO-Norm" neu im Katalog [Q6]; die Norm kennt in der Fassung 2023 neun Merkmale [Q19].
- **Risiken:** **unsicher**, welche Normfassung (2011: acht, 2023: neun Merkmale) die IHK zugrunde legt und wie sie benannt werden; die Zonen-Obergrenze 7 zwingt zu einer Vereinfachung. Erst nach Prüfblatt umsetzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-06 · Git: Wohin wandern die Änderungen? — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Arbeitsverzeichnis, Staging-Bereich (Index), Lokales Repository, Remote-Repository*; Begriffe sind Befehle/Situationen (`git add`, `git commit`, `git push`, `git fetch`/`pull`, „Datei geändert, noch nicht vorgemerkt").
- **Nutzen/Passung:** „Git-Funktionalitäten (Merge, Push, Pull)" in AP2-AE [Q9]; Theorie in ae2 9.3.
- **Risiken:** gering. Befehle, die mehrere Bereiche berühren (`pull` = fetch + merge), erfordern eindeutige Formulierungen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-07 · Datenbank-Anomalien und ACID — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Einfügeanomalie, Änderungsanomalie, Löschanomalie* (3) — optional zweites Instrument *Atomarität, Konsistenz, Isolation, Dauerhaftigkeit* (4). Begriffe sind Tabellenausschnitte/Szenarien.
- **Nutzen/Passung:** „Anomalien und Redundanzen" neu im Katalog [Q6]; ACID in ae2 9.4. Ergänzt „Normalformen" (dort Mängel je Normalform).
- **Risiken:** Überschneidung mit „Normalformen" → eindeutig trennen (Anomalie = Symptom, Normalform = Maßnahme).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-AE-08 · Anforderungsarten (Pflichtenheft) — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Funktionale Anforderung, Nichtfunktionale Anforderung, Randbedingung/Rahmenbedingung*; Begriffe sind Anforderungssätze aus einem Kundenportal-Pflichtenheft.
- **Nutzen/Passung:** Programmspezifikation festlegen (§ 13) [Q1]; Stakeholder-Analyse, Lasten-/Pflichtenheft in AP2-AE [Q8]; Theorie in ae1 8.2 und ae3 10.2.
- **Risiken:** gering; Abgrenzung nichtfunktional vs. Randbedingung ist in der Literatur nicht einheitlich.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Änderungsvorschlag am Bestand:* **I-AE-00 · „Ablaufstrukturen" statt „Struktogramm und Programmablauf"** — Titel und Illustration umbauen (Pseudocode/Aktivitätsdiagramm statt Struktogramm/PAP), Zonen bleiben (Sequenz, Verzweigung, Schleife); UML-Instrument um eine fünfte Zone *Zustandsdiagramm* erweitern (Zustandsdiagramme in AP2-AE [Q6][Q9]). Priorität hoch · Aufwand S. ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Spiele

#### S-AE-01 · Bug-Hunt-Sets für AE — Priorität hoch · Aufwand S
- **Inhalt:** neue Sets desselben Spieltyps: „Schleifen und Off-by-one", „Objektorientierung" (Sichtbarkeit, Vererbung, statische und Instanz-Member), „SQL-Fehler". Je 10–12 Ausschnitte mit Korrektur und Erklärung.
- **Nutzen/Passung:** § 14 Programmcode interpretieren, Fehlerszenarien analysieren [Q1][Q9].
- **Risiken:** Fachrichtigkeit der Codebeispiele (jeder Ausschnitt muss kompilieren/lauffähig sein und genau einen Fehler haben); Urheberrecht unkritisch, wenn selbst geschrieben.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-AE-02 · Code-Reihenfolge-Sets „Algorithmen" — Priorität mittel · Aufwand S
- **Inhalt:** Aufgaben zu binärer Suche, Bubble-/Selection-/Insertion-Sort, Rekursion (Fakultät/Fibonacci), Schleife mit Akkumulator; Zeilen in Reihenfolge bringen (Parsons-Format [Q22]).
- **Nutzen/Passung:** Sortierverfahren neu im Katalog [Q6]; „Algorithmen in Programmlogik übertragen" (§ 14) [Q1].
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-AE-03 · UML-Detektiv (neuer Spieltyp) — Priorität mittel · Aufwand M
- **Inhalt:** Ein Klassen-, Sequenz- oder Aktivitätsdiagramm (aus Daten gezeichnet) enthält **einen** Fehler (Pfeil in falscher Richtung, fehlende Multiplizität, Attribut statt Methode, Aggregation statt Komposition); anklicken, Rückmeldung, Erklärung. Analog zu Bug-Hunt.
- **Nutzen/Passung:** UML in ca. 78 % der AP2-AE [Q8].
- **Risiken:** Fachrichtigkeit/Eindeutigkeit der Fehler (Prüfblatt); Rendering aus Strukturdaten nötig (gemeinsame Komponente für UML-Lernpfad L-AE-01 nutzbar).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-AE-04 · Sets für Duell, Memory, Kreuzworträtsel (AE) — Priorität mittel · Aufwand S
- **Inhalt:** Duell „Objektorientierung und Entwurf" (Klasse/Objekt, Interface/abstrakte Klasse, Überladen/Überschreiben, Unit-/Integrationstest, Stack/Queue); Memory „Git und HTTP/REST" (Befehl ↔ Wirkung, Statuscode ↔ Bedeutung); Kreuzwort „Softwareentwicklung".
- **Nutzen/Passung:** Fachbegriffe der Katalogthemen [Q5][Q9]; Typen vorhanden, nur Content.
- **Risiken:** Begriffs-Eindeutigkeit (Kreuzwort-Hinweise müssen exakt eine Lösung zulassen).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-AE-05 · Sortier-Sprint (generierter Sprint) — Priorität mittel · Aufwand M
- **Inhalt:** Wie Subnetting-/Zahlensystem-Sprint: zufällige Zahlenfolge, Frage „Wie sieht die Folge nach dem 2. Durchlauf von Bubble Sort aus?" (auch Selection/Insertion, Anzahl Vergleiche/Vertauschungen). Aufgabenarten im Sprint-Payload konfigurierbar.
- **Nutzen/Passung:** Sortierverfahren neu im Katalog [Q6]; Schreibtischtest-Fertigkeit [Q7].
- **Risiken:** Definitionen (z. B. Bubble-Sort mit/ohne Abbruchbedingung) müssen eindeutig im Aufgabentext stehen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Übungswerkzeuge

#### W-AE-01 · Algorithmen-Visualisierer (Sortieren/Suchen) — Priorität mittel · Aufwand M
- **Funktion:** Schrittweise Animation von Bubble-, Selection-, Insertion-Sort und linearer/binärer Suche auf eigener Zahlenfolge; Zähler für Vergleiche/Vertauschungen; „Nächster Schritt" und Zustandstabelle. **Eingabe:** Zahlenfolge/Algorithmus; **Ausgabe:** Zustand je Schritt.
- **Browser:** rein clientseitig (vordefinierte Algorithmen, kein Fremdcode).
- **Nutzen/Passung:** Sortierverfahren [Q6]; Programmcode interpretieren (§ 14) [Q1].
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-AE-02 · Testfall-Trainer (Äquivalenzklassen, Grenzwerte, Entscheidungstabelle) — Priorität hoch · Aufwand M
- **Funktion:** Zufällige Spezifikation („Rabatt 5 % ab 100 €, 10 % ab 500 €, Eingabe 0–10 000 €"); Lernende tragen Äquivalenzklassen und Testwerte (Grenzwerte beidseitig) ein; Prüfung gegen berechnete Klassen, Rückmeldung zu fehlenden Fällen. **Eingabe:** Klassen/Testwerte; **Ausgabe:** Abdeckung, fehlende Grenzwerte.
- **Nutzen/Passung:** § 14 „Testszenarien auswählen" [Q1]; Äquivalenzklassen/Grenzwerte in ae2 9.2 und ae4 11.3.
- **Risiken:** Zahlenräume mit offenen/geschlossenen Intervallen sind fehleranfällig → Generator testen; je Aufgabe genau eine Musterlösung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-AE-03 · Git-Szenarien im Terminal-Simulator — Priorität mittel · Aufwand L
- **Funktion:** Erweiterung der vorhandenen Terminal-Simulation um Git (`init, status, add, commit, branch, switch, merge, log, revert, stash`, Merge-Konflikt auflösen); Aufgaben wie „Änderung versehentlich im falschen Branch". **Eingabe:** Befehle; **Ausgabe:** simulierte Git-Ausgabe, Zielzustand geprüft.
- **Browser:** reine Simulation, nichts wird ausgeführt (wie F-171).
- **Nutzen/Passung:** Git-Funktionalitäten in AP2-AE [Q9]; ae2 9.3.
- **Risiken:** Simulation von Git-Ausgaben muss fachlich stimmen (viele Sonderfälle); Umfang begrenzen (kein `rebase -i`).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-AE-04 · Klassendiagramm-Werkstatt — Priorität mittel · Aufwand L
- **Funktion:** Aus einem Kurztext („Kunde, Bestellung, Position, Artikel …") ein Klassendiagramm zusammenstellen (Klassen, Attribute, Beziehungen mit Multiplizität per Auswahlfelder); Prüfung gegen Musterlösung mit toleranten Varianten.
- **Nutzen/Passung:** UML in ca. 78 % der AP2-AE [Q8].
- **Risiken:** „Richtigkeit" bei Modellierung ist nicht eindeutig (mehrere gültige Lösungen) → Bewertung nur nach Kriterien, nicht nach Gleichheit; hoher Aufwand.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Zusätzlich für AE aus Abschnitt 4:* W-FI-02 Schreibtischtest-Trainer (Kern), W-FI-03 Normalisierungs-Werkstatt (Kern), W-FI-04 SQL-Beiblatt-Modus, W-FI-01 Nutzwertanalyse-Rechner (Teil 1/Projekt).

#### Glossar

#### G-AE-01 · AE-Glossar (ca. 100–120 Einträge) — Priorität hoch · Aufwand M
- **Umfang/Themen:** Vorgehensmodelle (Wasserfall, V-Modell, Sprint, Backlog, Increment); UML (Klasse, Objekt, Assoziation, Aggregation, Komposition, Use Case, Akteur …); OOP (Kapselung, Vererbung, Polymorphie, Interface, abstrakte Klasse, Überladen/Überschreiben); Muster (Singleton, Factory, Observer, MVC); Tests (Äquivalenzklasse, Grenzwert, Black-/White-Box, TDD, Mock, Regression, Überdeckung); Git (Commit, Branch, Merge, Pull Request …); Sicherheit (SQL-Injection, XSS, Hash, Salt, Prepared Statement); Datenbank (Primär-/Fremdschlüssel, ACID, Transaktion, Index, JOIN); Algorithmen (Rekursion, Komplexität, Pseudocode); Architektur (Schichten, REST, API, ORM); UI (ISO 9241-110, Barrierefreiheit); Wirtschaft (Pflichtenheft, Nutzwertanalyse, Amortisation).
- **Nutzen/Passung:** Glossar-Mechanismus (F-165) braucht je Fachgebiet eine `glossar.md`; AE1–5 haben keine.
- **Risiken:** Fachrichtigkeit — alle Einträge starten „ungeprüft", Prüfblatt nötig; Doppelungen zu FU4/FU5-Glossar vermeiden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Lernpfade (7 Stationen mit Fallbeispiel)

#### L-AE-01 · UML: Vom Anwendungsfall zur Klasse (Instrument „UML-Diagramme") — Priorität mittel · Aufwand M
- **Fallbeispiel:** Kundenportal der Hartmann Metallbau GmbH (Projekt 101 der SQL-Beispieldaten): Anforderungen → Use-Case-Diagramm → Klassendiagramm → Sequenz einer Bestellung → Aktivität „Retoure".
- **Passung:** UML-Schwerpunkt der AE [Q8]; nutzt vorhandenes Instrument, Beziehungsebene wird mit I-AE-03 vertieft.
- **Risiken:** Fallbeispiel muss in allen Stationen konsistent bleiben (Namensgleichheit der Klassen).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### L-AE-02 · Ein Release des Kundenportals durch alle Teststufen (Instrument „Teststufen") — Priorität mittel · Aufwand M
- **Fallbeispiel:** Gleiches Kundenportal; Komponenten-, Integrations-, System-, Abnahmetest; Testdaten und Abnahmekriterien. Alternative nach Umsetzung von I-AE-04: Pfad „Testverfahren".
- **Passung:** § 13/§ 14 [Q1]; ae2 9.2, ae3 10.3, ae4 11.3.
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Bestehende Lernpfade:* Scrum, Schutzziele, ER-Modell/Normalformen bleiben im AE-Kern; OSI als Grundlagen. Ein AE-Lernpfad „OSI" ist nicht nötig.

#### Prüfungs-Rahmen

#### P-AE-01 · Projekt-Hilfe AE schärfen — Priorität mittel · Aufwand S
- **Inhalt:** Beispiele typischer AE-Projektarten (Web-App, Schnittstelle, Migration, Testautomatisierung); Projektantrag-Check um § 12 ergänzen (Wirtschaftlichkeitsbetrachtung, Test und Einführung); Hinweis auf Dokumentationsbestandteile (Pflichtenheft-Auszug, Testprotokoll, Soll-Ist); typische Fachgesprächsfragen (Warum diese Technologie/Architektur? Wie getestet? Sicherheit?). 80-h-Grenze bleibt.
- **Passung:** FIAusbV § 12 [Q1]; Projektbeschreibung mit Ausgangssituation, Ziel, Zeitplanung [Q3]; Bewertungslogik „Fähigkeit, einen Ablauf zu steuern, nicht das Produkt" [Q4].
- **Risiken:** Umfang und Form legt die zuständige IHK fest — Hinweis im Reiter beibehalten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### P-AE-02 · Prüfungsablauf: Hilfsmittel und Belegsatz — Priorität niedrig · Aufwand S
- **Inhalt:** Zwei Stichpunkte in „Gelassen bleiben": nur nicht programmierbarer Taschenrechner [Q4]; SQL wird mit Syntax-Beiblatt geprüft [Q5]. Außerdem Hinweis auf Katalogänderungen (Struktogramm/PAP nicht mehr Prüfstoff).
- **Passung:** [Q4][Q5].
- **Risiken:** Der Inhalt des Beiblatts ist hier nicht verifiziert (unsicher) — Formulierung vorsichtig halten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Kurs B — Fachinformatiker/in Daten- und Prozessanalyse (`fachinformatiker-daten-prozessanalyse`)

### B.1 Prüfungsrahmen (Kurzfassung)

- **Teil 1:** wie bei allen IT-Berufen (90 Min., 20 %) [Q1][Q4].
- **Teil 2:** (a) *Planen und Durchführen eines Projektes der Datenanalyse* — Projektarbeit bis **40 Std.** mit Dokumentation, Präsentation (höchstens 15 Min.), Fachgespräch (zusammen höchstens 30 Min.), **50 %**; (b) *Durchführen einer Prozessanalyse* 90 Min., 10 %; (c) *Sicherstellen der Datenqualität* 90 Min., 10 %; (d) *Wirtschafts- und Sozialkunde* 60 Min., 10 % [Q1][Q4]. Die drei schriftlichen Bereiche liegen laut IHK-Leitfaden an einem Tag (5 Stunden, zusammen 30 % der Gesamtnote) [Q4].
- **Inhalte laut FIAusbV (nach Abruf-Zusammenfassung):** (b) Prozesse darstellen und Anforderungen abbilden, Analysewerkzeuge anwenden, Optimierungsmaßnahmen vorschlagen, Qualitäts- und Wirtschaftlichkeitskontrolle planen; (c) Daten identifizieren und bereitstellen, Datenqualität prüfen, Datenzugriff und -verfügbarkeit gewährleisten, Datenschutz-/Datensicherheitsbestimmungen einhalten [Q1]. Das **Projekt** verlangt laut Leitfaden: Anforderungen analysieren, Umsetzung unter Beachtung betrieblicher Prozesse planen, Daten identifizieren, klassifizieren, modellieren, mit mathematischen Vorhersagemodellen und statistischen Verfahren analysieren, Datenqualität sichern, Ergebnisse aufbereiten, Optimierungen aufzeigen, dokumentieren [Q4].
- **Rahmenlehrplan:** LF 10c *Werkzeuge des maschinellen Lernens einsetzen*, LF 11c *Prozesse analysieren und gestalten*, LF 12c *Kundenspezifische Prozess- und Datenanalyse* [Q2]; gemeinsam LF 5 (Daten abbilden/verwalten), LF 8 (Daten systemübergreifend bereitstellen) [Q2].
- **Hilfsmittel:** nicht programmierbarer Taschenrechner [Q4]. Projekt: Genehmigung des Antrags vor Beginn; nach IHK-Berlin-Leitfaden max. 15 % der Zeit für die Dokumentation, KI-Nutzung offenzulegen [Q4] (IHK-spezifisch).
- **Prüfungskatalog:** für DPA nicht frei verfügbar gefunden (**unsicher**). Die gemeinsamen Katalogänderungen (UML/BPMN statt Struktogramm/PAP, SQL/RAID nur Teil 2, Belegsätze) gelten für alle IT-Berufe [Q5].
- **Beobachtung zum Bestand (unsicher):** In `import-content.ts` ist DP3 (Statistik, Vorhersagemodelle) dem Bereich „Sicherstellen der Datenqualität" zugeordnet. Die FIAusbV nennt Statistik/Vorhersagemodelle beim **Projekt** (§ 28) [Q1][Q4], nicht in den beiden schriftlichen Bereichen. Die Zuordnung ist eine didaktische (siehe Kommentar im Code); bitte bei der fachlichen Prüfung klären.

### B.2 Bestandsbewertung

| Angebot (heute) | Urteil | Begründung / Beleg |
|---|---|---|
| **Instrumente** | | |
| SWOT-Matrix | passt nicht | BWL-Modell; in §§ 28–30 nicht genannt [Q1]; AP1 2025 gestrichen [Q7]. |
| Balanced Scorecard | passt nicht | BWL; kein Prüfungsbezug; im Kurs ohne Content. |
| Ansoff-Matrix | passt nicht | wie BSC. |
| Gantt-Diagramm | passt (Kern) | Zeitplanung ist Pflichtteil der Projektbeschreibung [Q3][Q4]. |
| Eisenhower-Matrix | unsicher (Tendenz: ausblenden) | Nur über „Arbeitsaufgaben-Planung" [Q1]; kein Prüfungsbeleg. |
| PDCA-Zyklus | passt (Kern) | KVP/Qualitätskontrolle ist Prüfungsinhalt § 29 [Q1]; dp1 8.3 enthält KVP. |
| Risikomatrix | passt (Grundlagen) | Schutzbedarf/Risiko LF 4 [Q2]; für DPA nicht prägend. |
| Projektstrukturplan / Organigramm | passt (Grundlagen) | PSP für Projekt; Organigramm nur als Betriebsorganisation (Teil 1/WiSo). |
| OSI-Modell | passt (Grundlagen) | Netzwerkgrundlagen Teil 1 [Q2][Q8]; kein DPA-Kernbereich. |
| Schutzziele | passt (Kern) | § 30 Datenschutz und Datensicherheit [Q1]; dp4 11.3. |
| SQL-Befehlsgruppen | passt (Kern) | SQL als Analyse- und Prüfwerkzeug (dp3 10.3); Datenqualität/Dubletten; SQL nur Teil 2 [Q5]. |
| Scrum | passt (Grundlagen) | AP1 Wasserfall + Scrum [Q7]. |
| UML-Diagramme | unsicher (Tendenz: ausblenden) | DPA modelliert Prozesse mit BPMN/EPK; im AP1-Katalog nur das Aktivitätsdiagramm neu [Q7]. Aktivitätsdiagramm-Anteil → I-DPA-02. |
| Teststufen (V-Modell) | unsicher (Tendenz: passt nicht) | Software-Teststufen sind kein DPA-Prüfungsinhalt (§§ 28–30) [Q1]; LF 5 nennt Testfälle gemeinsam [Q2]. |
| ER-Modell | passt (Kern) | „Daten modellieren" (Projekt) [Q4]; Datenmodellierung dp2/FU5. |
| Normalformen | passt (Kern) | Redundanz ist Datenqualitätsdimension; Normalisierung vermeidet sie. |
| Struktogramm und Programmablauf | passt nicht | Struktogramm/PAP gestrichen [Q5]; DPA-Prozessdarstellung läuft über BPMN/EPK. |
| **Übungswerkzeuge** | | |
| Netzplan | passt (Grundlagen) | Netzplan in AP1 [Q8]; Beleg im Katalog 2025 schwach. |
| Subnetting-Rechner | passt (Grundlagen) | AP1 IPv4/IPv6 [Q7]. |
| SQL-Übungsfläche | passt (Kern) | wie SQL-Befehlsgruppen; Dubletten/Fehlwerte per SQL (W-DPA-03). |
| Terminal-Szenarien | passt (Grundlagen) — nur „leicht" (4) | Client-Fehlersuche Teil 1; Server-Szenarien passen nicht. |
| Netzwerk-Topologie | passt (Grundlagen) — nur „leicht" (3) | LF 3 [Q2]; Routing/VLAN/Firewall passen nicht. |
| Flag-Rätsel | passt (Grundlagen) — Auswahl | Kodierung vs. Verschlüsselung, Hash/Prüfsumme, Passwort-Hashes, Phishing-Header passen zu Datensicherheit (dp4 11.4); Logs/Ports/SSH passen nicht. |
| **Spiele** | | |
| Kreuzworträtsel (2 Sets) | passt (Grundlagen) | generische IT-Sets; kein DPA-Set. |
| Begriffe-Duell (2 Sets) | „IT-Grundlagen": passt (Grundlagen); „SQL und Datenmodellierung": passt (Kern) | siehe SQL/ER. |
| Memory (2 Sets) | passt (Grundlagen) | „Ports und Protokolle" nur Teil 1. |
| Phishing-Detektiv | passt (Grundlagen) | IT-Sicherheit/Datenschutz AP1 [Q7]. |
| Bug-Hunt | unsicher → Inhalt ersetzen | Typ passt (Python/SQL-Analysecode, dp3 10.3); die Java-/JavaScript-Ausschnitte passen nicht. |
| Code-Reihenfolge | unsicher → Inhalt ersetzen | wie Bug-Hunt (Grundmuster generisch). |
| Troubleshooting-Detektiv | passt nicht | Netzwerkstörungen kein DPA-Bereich [Q1]. |
| Subnetting-Sprint | passt (Grundlagen) | wie Subnetting-Rechner. |
| Zahlensystem-Sprint | passt (Grundlagen) | Datentypen/Datenmengen (AP1) [Q7]. |
| **Zusatzpakete** | | |
| Glossar FU1–FU7 (157) | passt (Grundlagen) | DP1–5 ohne Glossar → G-DPA-01. |
| Lernpfad Scrum | passt (Grundlagen) | siehe Scrum. |
| Lernpfad OSI | passt (Grundlagen) | siehe OSI. |
| Lernpfad Schutzziele | passt (Kern) | siehe Schutzziele. |
| Lernpfade Normalformen / ER | passt (Kern) | siehe dort (Datenmodell-Pfad). |
| Prüfungs-Rahmen | passt, zu schärfen | Bereichszuordnung vorhanden (DP1+FU1 / DP2–DP4+FU5); Ergänzungen P-DPA-01/02; Zuordnung DP3 klären. |

**Folge für das Profil (Vorschlag):** Ausblenden: SWOT, BSC, Ansoff, Struktogramm/Ablauf, Troubleshooting-Detektiv, Server-/Netz-Szenarien (mittel/schwer), UML und Teststufen (bis zur Klärung); „Grundlagen"-Gruppe: OSI, Scrum, Risikomatrix, PSP, Netzplan, Subnetting, Zahlensysteme, Phishing, Flag-Rätsel (Auswahl), Terminal/Topologie (leicht).

### B.3 Neue Vorschläge

#### Instrumente

#### I-DPA-01 · BPMN-2.0-Bausteine — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Ereignis, Aktivität, Gateway, Fluss (Sequenz-/Nachrichtenfluss), Teilnehmer (Pool/Lane)*; Begriffe sind Symbolbeschreibungen und Prozessausschnitte („Entscheidung: Rechnung über 5 000 €?" → Gateway; „Nachricht an externen Lieferanten" → Fluss).
- **Nutzen/Passung:** § 29 „Prozesse darstellen" [Q1]; UML/BPMN rücken im Katalog nach [Q5]; Theorie in dp1 8.2.
- **Risiken:** BPMN hat viele Elementvarianten; auf das Prüfungsübliche begrenzen (Prüfblatt). Illustration mit korrekten BPMN-Symbolen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-02 · Prozessdarstellungen im Vergleich — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Flussdiagramm, Swimlane-Diagramm, EPK, BPMN 2.0* (optional Aktivitätsdiagramm als Brücke zu UML); Begriffe sind Merkmale („Funktion und Ereignis wechseln sich ab" → EPK; „Verantwortliche als Bahnen" → Swimlane).
- **Nutzen/Passung:** dp1 8.2 „Notationen im Vergleich"; § 29 [Q1]; UML-Aktivitätsdiagramm neu in AP1 [Q7].
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-03 · Welches Analysewerkzeug passt wozu? — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Schwachstellenanalyse, Engpassanalyse, Pareto-Analyse, Ursachenanalyse (Ishikawa/5-Why), Wertstromanalyse, Process Mining*; Begriffe sind Fragestellungen („Welche 20 % der Ursachen verursachen 80 % der Fehler?" → Pareto; „Aus Ereignisprotokollen den tatsächlichen Ablauf rekonstruieren" → Process Mining).
- **Nutzen/Passung:** § 29 „Analysewerkzeuge anwenden" [Q1]; dp1 8.3 hat genau diesen Abschnitt.
- **Risiken:** Schwachstellen- und Ursachenanalyse überschneiden sich; Fragen eindeutig formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-04 · Datenqualitäts-Dimensionen — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität*; Begriffe sind Befunde („12 % der Geburtsdaten leer" → Vollständigkeit; „Lieferung vor Bestellung" → Plausibilität; „Kundin doppelt angelegt" → Redundanz).
- **Nutzen/Passung:** § 30 „Datenqualität prüfen" [Q1]; die fünf Dimensionen entsprechen dp4 11.1 (dort als Nennung der Ausbildungsverordnung beschrieben). ISO/IEC 25012 kennt weitere Merkmale (u. a. Konsistenz, Aktualität) [Q18].
- **Risiken:** **unsicher**, ob der Originaltext der FIAusbV genau diese fünf nennt (nur Zusammenfassung abgerufen) → Prüfblatt; Validität/Plausibilität werden in der Literatur nicht einheitlich abgegrenzt.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-05 · Skalenniveaus — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Nominal, Ordinal, Intervall, Verhältnis*; Begriffe sind Merkmale (Postleitzahl, Schulnote, Temperatur in °C, Umsatz in €).
- **Nutzen/Passung:** „Daten klassifizieren" im Projekt [Q4]; Theorie in dp2 9.1 und dp3 10.1.
- **Risiken:** Postleitzahl/Schulnote sind klassische Streitfälle → eindeutige Erklärung.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-06 · Aufgabenarten des maschinellen Lernens — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Regression, Klassifikation, Clustering*; Begriffe sind Aufgabenbeschreibungen („Verkaufspreis vorhersagen", „Mails in Spam/Nicht-Spam einteilen", „Kundengruppen ohne Vorgabe finden"); Erklärung benennt überwachte/unüberwachte Lernart.
- **Nutzen/Passung:** LF 10c [Q2]; Projekt: Vorhersagemodelle/Mustererkennung [Q4]; dp3 10.2.
- **Risiken:** Umfang bewusst auf Grundlagen begrenzen (keine Mathematik der Verfahren).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-07 · ETL: Extract, Transform, Load — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Extract, Transform, Load*; Begriffe sind Tätigkeiten („Datumsformat vereinheitlichen" → Transform; „in das Data Warehouse schreiben" → Load).
- **Nutzen/Passung:** § 30 „Daten bereitstellen" [Q1]; dp2 9.3 (ETL/ELT, Staging).
- **Risiken:** Bereinigung kann Transform oder eigener Schritt (Staging) sein → eindeutig formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DPA-08 · Diagrammwahl — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Vergleich (Balken), Verlauf (Linie), Anteil (Kreis/Stapel), Verteilung (Histogramm/Boxplot), Zusammenhang (Streudiagramm)*; Begriffe sind Fragestellungen.
- **Nutzen/Passung:** Ergebnisse aufbereiten (Projekt) [Q4]; dp3 10.3/10.4.
- **Risiken:** Kreis-/Balkenwahl ist teils Geschmack → Erklärung nennt das Kriterium (Zweck).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Zusätzlich aus Abschnitt 4:* I-FI-03 DSGVO-Grundsätze, I-FI-04 Authentifizierung und Kryptografie-Bausteine (dp4 11.3/11.4).

#### Spiele

#### S-DPA-01 · Prozess-Detektiv (neuer Spieltyp) — Priorität hoch · Aufwand L
- **Inhalt:** Ein kleiner Prozess (BPMN-/Swimlane-Grafik aus Daten) enthält 1–3 Schwachstellen (Medienbruch, Doppelerfassung, lange Liegezeit, fehlendes Ende, Gateway ohne Zusammenführung); anklicken, Erklärung je Fund. Analog zu Phishing-Detektiv.
- **Nutzen/Passung:** § 29 Schwachstellen erkennen und Optimierung vorschlagen [Q1]; dp1 8.3.
- **Risiken:** Fachrichtigkeit der Modelle (Prüfblatt); gemeinsame Zeichenkomponente mit I-DPA-01 und W-DPA-04.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DPA-02 · Daten-Detektiv (neuer Spieltyp) — Priorität hoch · Aufwand M
- **Inhalt:** Eine kleine Tabelle mit eingebauten Fehlern (Dubletten, Leerwerte, Formatfehler, Ausreißer, widersprüchliche Angaben); Zellen anklicken und der passenden Qualitätsdimension zuordnen, Erklärung.
- **Nutzen/Passung:** § 30 [Q1]; dp4 11.1 (Prüfverfahren, Ursachen).
- **Risiken:** Datensätze müssen eindeutig sein (keine zwei gleichwertigen Deutungen); erfundene Daten, kein Datenschutzproblem.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DPA-03 · Statistik-Sprint (generierter Sprint) — Priorität hoch · Aufwand M
- **Inhalt:** Zehn zufällige Aufgaben: Mittelwert, Median, Spannweite, Quartile, Varianz/Standardabweichung (n bzw. n−1), Prozentwerte, Durchlaufzeit/Fehlerquote; Eingabe als Zahl, Toleranz bei Rundung.
- **Nutzen/Passung:** Nur nicht programmierbarer Taschenrechner erlaubt [Q4] → Rechenfertigkeit trainieren; Statistik im Projekt [Q4]; dp3 10.1.
- **Risiken:** Rundungs-/Formelvarianten (n vs. n−1) müssen im Aufgabentext festgelegt sein.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DPA-04 · Diagramm-Doktor (neuer Spieltyp) — Priorität mittel · Aufwand M
- **Inhalt:** Ein irreführendes Diagramm (abgeschnittene Achse, falsche Diagrammart, fehlende Beschriftung, Scheinkorrelation) — Lernende wählen den Fehler und die Korrektur.
- **Nutzen/Passung:** dp3 10.3 „Typische Irreführung in Diagrammen"; Ergebnisse adressatengerecht darstellen [Q4].
- **Risiken:** gering; Diagramme aus Daten per SVG erzeugen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DPA-05 · Sets für vorhandene Spieltypen (DPA) — Priorität mittel · Aufwand S
- **Inhalt:** Duell „Prozessanalyse und Statistik" (Mittelwert/Median, Korrelation/Kausalität, ETL/ELT, Data Warehouse/Data Lake, BPMN/EPK, Overfitting/Underfitting); Memory „Qualitätsdimensionen und Kennzahlen"; Kreuzwort „Prozess- und Datenanalyse"; Bug-Hunt „SQL und pandas"; Code-Reihenfolge „Auswertung mit Python".
- **Nutzen/Passung:** §§ 29/30 [Q1]; dp1–dp4.
- **Risiken:** Python-/pandas-Ausschnitte müssen lauffähig und eindeutig sein.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Übungswerkzeuge

#### W-DPA-01 · Statistik-Trainer — Priorität hoch · Aufwand M
- **Funktion:** Zahlenreihe eingeben oder zufällig erzeugen; Ausgabe mit Rechenweg: Lage-/Streuungsmaße, Quartile, Boxplot, Ausreißer (1,5 · IQR), n vs. n−1; zweite Registerkarte: Streudiagramm mit Korrelationskoeffizient und Ausgleichsgerade (R²), Hinweis „Korrelation ≠ Kausalität". **Browser:** rein clientseitig.
- **Nutzen/Passung:** Projekt: statistische Verfahren, Vorhersagemodelle [Q4]; dp3 10.1/10.2.
- **Risiken:** Definition der Quartile ist nicht einheitlich → eine Methode festlegen und ausweisen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DPA-02 · Prozesskennzahlen-Rechner — Priorität mittel · Aufwand S
- **Funktion:** Zufällige Aufgaben zu Durchlaufzeit, Bearbeitungs- und Liegezeit, Prozesseffizienz (Wertschöpfungszeit/Durchlaufzeit), Fehlerquote, Kapazität, Amortisation einer Prozessverbesserung; Rechenweg und Kontrolle.
- **Nutzen/Passung:** § 29 Wirtschaftlichkeitskontrolle [Q1]; dp1 8.1/8.4 (Rechenbeispiele).
- **Risiken:** Kennzahlendefinitionen müssen mit dem Kursinhalt übereinstimmen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DPA-03 · Datenqualitäts-Aufgaben in der SQL-Übungsfläche — Priorität hoch · Aufwand S–M
- **Funktion:** Zweites Aufgabenpaket mit einer „schmutzigen" Importtabelle (Dubletten, NULL/„k. A.", falsche Formate, unplausible Werte, fehlende Fremdschlüssel). Aufgaben: zählen, finden, bereinigen, Quote berechnen; Prüfung wie bisher gegen Musterlösung. **Eingabe:** SQL; **Ausgabe:** Ergebnistabelle/Prüfung.
- **Nutzen/Passung:** § 30 Datenqualität prüfen [Q1]; dp4 11.1 (Prüfverfahren); Nutzung der vorhandenen Engine (F-167/F-172).
- **Risiken:** Musterlösungen müssen auf SQLite-Dialekt laufen; Datenschutz: nur erfundene Daten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DPA-04 · Prozessmodellierer mit Kriterienprüfung — Priorität mittel · Aufwand L
- **Funktion:** Aus einer Prozessbeschreibung ein BPMN-Diagramm aufbauen (Elemente aus Palette, Verbindungen per Auswahl); Prüfung nach Kriterien (Start/Ende vorhanden, Gateways korrekt zusammengeführt, Verantwortliche in Lanes, keine Sackgassen), nicht nach Gleichheit.
- **Nutzen/Passung:** § 29 „Prozesse darstellen" [Q1]; dp1 8.2.
- **Risiken:** Aufwand hoch; mehrere gültige Modelle. Erst nach I-DPA-01 und S-DPA-01 entscheiden. *Idee ohne Priorität:* ML-Labor (Datenpunkte, Regressionsgerade, Konfusionsmatrix mit Schwellwert).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Zusätzlich aus Abschnitt 4:* W-FI-03 Normalisierungs-Werkstatt, W-FI-04 SQL-Beiblatt-Modus.

#### Glossar

#### G-DPA-01 · DPA-Glossar (ca. 110–130 Einträge) — Priorität hoch · Aufwand M
- **Umfang/Themen:** Prozess (BPMN-Elemente, EPK, Swimlane, Durchlaufzeit, Liegezeit, Engpass, Pareto, Ishikawa, 5-Why, Wertstrom, KVP, Lean, Process Mining, SLA); Statistik (Median, Quartil, Standardabweichung, Korrelation, Stichprobe, Signifikanz, Ausreißer, Normalverteilung); Lernverfahren (Overfitting, Training/Test, Feature, Label, Regression, Klassifikation, Clustering, Konfusionsmatrix, Precision, Recall); Daten (ETL/ELT, Data Warehouse, Data Lake, Staging, Metadaten, Datenkatalog, FAIR, Skalenniveau, Pseudonymisierung, Anonymisierung, Re-Identifikation); BI (Dashboard, KPI, Drill-down); Vorgehen (CRISP-DM mit seinen sechs Phasen [Q17]).
- **Nutzen/Passung:** F-165-Mechanismus; DP1–DP5 ohne Glossar; FAIR-Begriffe stehen in dp4 11.2.
- **Risiken:** Fachrichtigkeit (Prüfblatt); Begriffe wie Validität/Plausibilität einheitlich nach Kursinhalt definieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Lernpfade

#### L-DPA-01 · Prozess analysieren: von der Ist-Aufnahme zur Schwachstelle (Instrument I-DPA-03) — Priorität hoch · Aufwand M
- **Fallbeispiel:** Rechnungsfreigabe der Nordlicht Logistik AG dauert im Schnitt 14 Tage: Ist-Aufnahme → Notation wählen → Werkzeug zuordnen (Pareto, Engpass, Ursachenanalyse) → Optimierung → Wirtschaftlichkeit.
- **Passung:** § 29 [Q1]; dp1 8.1–8.4.
- **Risiken:** Zahlen im Fallbeispiel konsistent halten (Kennzahlen müssen rechnerisch stimmen).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### L-DPA-02 · Datenqualität: von der Beschwerde zum Prüfplan (Instrument I-DPA-04) — Priorität mittel · Aufwand M
- **Fallbeispiel:** Kaufhaus Brandt beschwert sich über doppelte Kundenbriefe: Dimensionen zuordnen → Prüfverfahren wählen → Maßnahmen → Kennzahlen/Kontrolle.
- **Passung:** § 30 [Q1]; dp4 11.1.
- **Risiken:** wie L-DPA-01; Pfad setzt I-DPA-04 voraus.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Prüfungs-Rahmen

#### P-DPA-01 · Projekt-Hilfe für Datenanalyse-Projekte — Priorität mittel · Aufwand S
- **Inhalt:** Projektantrag-Check mit den Kriterien Ausgangssituation (Ist-Zustand, Anforderungen, Geschäftsprozesse erkennbar, Zulieferungen/Schnittstellen), Ziele (Nutzen, Qualitätsmerkmale), Zeitplanung (Stunden je Phase, 40-h-Rahmen); Dokumentations-Check um Datenquellen, Datenschutz, Methodenwahl/Güte, Optimierungsvorschläge ergänzen; Hinweis „Ziel bekannt, Weg wird entwickelt" und „Ergebnis hat keinen maßgeblichen Einfluss" [Q4]; typische Fachgesprächsfragen (Warum diese Methode? Datenqualität? Datenschutz?).
- **Passung:** § 28 [Q1]; Leitfaden [Q4] (IHK-spezifische Zahlen wie 15 % Dokumentation und Seitenzahlen nur als Beispiel kennzeichnen).
- **Risiken:** Umfang und Form regelt die zuständige IHK; keine IHK-spezifischen Vorgaben als allgemeingültig darstellen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### P-DPA-02 · Prüfungsablauf-Stichpunkte DPA — Priorität niedrig · Aufwand S
- **Inhalt:** Drei schriftliche Bereiche mit typischem Ablauf; Taschenrechner-Hinweis; Hinweis auf offene Fragen statt Multiple Choice (außer WiSo) [Q4]; Hinweis zur Offenlegung von KI-Nutzung im Projekt [Q4].
- **Passung:** [Q4]; bestehende Seite „Gelassen bleiben" (F-154).
- **Risiken:** Bezug auf IHK-Berlin-Leitfaden → als „Beispiel einer IHK" kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Kurs C — Fachinformatiker/in Digitale Vernetzung (`fachinformatiker-digitale-vernetzung`)

### C.1 Prüfungsrahmen (Kurzfassung)

- **Teil 1:** wie bei allen IT-Berufen (90 Min., 20 %) [Q1][Q3].
- **Teil 2:** (a) *Planen und Umsetzen eines Projektes der digitalen Vernetzung* — Projektarbeit bis **40 Std.**, Präsentation (höchstens 15 Min.) und Fachgespräch (zusammen höchstens 30 Min.), **50 %**; (b) *Diagnose und Störungsbeseitigung in vernetzten Systemen* 90 Min., 10 %; (c) *Betrieb und Erweiterung von vernetzten Systemen* 90 Min., 10 %; (d) *Wirtschafts- und Sozialkunde* 60 Min., 10 % [Q1][Q3].
- **Inhalte laut FIAusbV/IHK (Zusammenfassungen):** (b) mit Soft-/Hardware Störungen in der Gesamtinfrastruktur lokalisieren, eingrenzen und beseitigen, Testergebnisse sowie Diagnose- und Prozessdaten auswerten und Maßnahmen ableiten, IT-Sicherheitsmaßnahmen; (c) Lösungskonzepte zur Einbindung heterogener Systeme und Protokolle bewerten, Kommunikation der Prozesse und Ebenen prüfen und dokumentieren, Systemressourcen überwachen, Kennzahlen bewerten, Netzwerkinfrastruktur anpassen und erweitern; Projekt: Hardware-/Softwareschnittstellen, Systemarchitektur bewerten, Übertragungssysteme auswählen und integrieren [Q1][Q27].
- **Rahmenlehrplan:** LF 7 *Cyber-physische Systeme ergänzen* (Datenfluss physische Welt ↔ IT, Energie-/Stoff-/Informationsflüsse, Betriebswerte messen, Energiebedarf validieren), LF 10d *Cyber-physische Systeme entwickeln* (Sensoren/Aktoren integrieren, Schnittstellen programmieren, Testkonzepte, Mensch-Maschine-KI inkl. Ethik), LF 11d *Betrieb und Sicherheit vernetzter Systeme gewährleisten* (Risikoanalyse, Schutzmaßnahmen, „relative Sicherheit"), LF 12d *Kundenspezifisches cyber-physisches System optimieren* [Q2].
- **Prüfungskatalog:** nicht frei verfügbar gefunden (**unsicher**); Sekundärquellen nennen u. a. Netzwerktests mit Kommandozeilentools, Monitoring/Logging, IP-Adressierung/Subnetting, DHCP/DNS, WLAN, Firewall/VPN, MQTT/OPC UA/REST [Q12][Q25] — dünne, teils widersprüchliche Quellen, nicht als Beleg für Einzelthemen verwenden. Der AE-Katalog nennt Cyber-physische Systeme (Sensoren, Aktoren) als neu [Q6]; ob und wie Industrie-4.0-Themen im DV-Katalog stehen, ist **offen**.

### C.2 Bestandsbewertung

| Angebot (heute) | Urteil | Begründung / Beleg |
|---|---|---|
| **Instrumente** | | |
| SWOT-Matrix | passt nicht | BWL; kein Bezug zu §§ 36–38 [Q1]; AP1 gestrichen [Q7]. |
| Balanced Scorecard | passt nicht | BWL; ohne Content. |
| Ansoff-Matrix | passt nicht | wie BSC. |
| Gantt-Diagramm | passt (Kern) | Zeitplanung in Projektbeschreibung [Q3]. |
| Eisenhower-Matrix | unsicher (Tendenz: ausblenden) | kein Prüfungsbeleg. |
| PDCA-Zyklus | passt (Grundlagen) | Qualitätssicherung [Q1]; Wartungs-/Verbesserungskreislauf in dv3 möglich, aber nicht prägend. |
| Risikomatrix | passt (Kern) | LF 11d Risikoanalyse vernetzter Systeme [Q2]; Schwachstellen bewerten und priorisieren (dv3 10.4). |
| Projektstrukturplan / Organigramm | passt (Grundlagen) | Projektplanung allgemein. |
| OSI-Modell | passt (Kern) | „Kommunikation der Prozesse und Ebenen prüfen" (§ 38) [Q1][Q27]; Eingrenzen nach Ebenen (dv3 10.2, dv4 11.2). |
| Schutzziele | passt (Kern) | LF 11d: Schutzziele ermitteln [Q2]. |
| SQL-Befehlsgruppen | unsicher (Tendenz: passt nicht) | §§ 36–38 nennen keine Datenbankabfragen [Q1]; SQL nur Teil 2 [Q5]; gemeinsame LF 5/8 enthalten Datenhaltung [Q2]. |
| Scrum | passt (Grundlagen) | AP1 [Q7]. |
| UML-Diagramme | unsicher (Tendenz: passt nicht) | im DV-Prüfungsrahmen nicht genannt [Q1]; AP1 nur Aktivitätsdiagramm [Q7]. |
| Teststufen (V-Modell) | passt (Kern) | Testkonzepte (LF 10d) [Q2]; dv2 9.4 Tests und Inbetriebnahme; Integrations-/Abnahmetest. |
| ER-Modell | unsicher (Tendenz: passt nicht) | kein DV-Bezug in §§ 36–38 [Q1]; nur LF 5 gemeinsam. |
| Normalformen | unsicher (Tendenz: passt nicht) | wie ER-Modell. |
| Struktogramm und Programmablauf | unsicher (Tendenz: passt nicht) | gestrichen [Q5]; DV programmiert Skripte/Schnittstellen (LF 10d), aber nicht als Struktogramm. |
| **Übungswerkzeuge** | | |
| Netzplan | passt (Grundlagen) | Netzplan in AP1 [Q8]. |
| Subnetting-Rechner | passt (Kern) | IP-Adress-/Kapazitätsrechnung (dv4 11.4); Netzwerkinfrastruktur erweitern (§ 38) [Q1]. |
| SQL-Übungsfläche | unsicher (Tendenz: passt nicht) | siehe SQL-Befehlsgruppen. |
| Terminal-Szenarien | passt (Kern) — Auswahl | Diagnose mit Soft-/Hardware (§ 37) [Q1][Q27]: Netz-/Dienst-/Log-Szenarien passen; Cron/Dateirechte eher SI. |
| Netzwerk-Topologie | passt (Kern) | Segmentierung/VLAN/Firewall (dv4 11.4, dv2 9.3); heutige Szenarien sind Büro-/Filialnetze → Industrie-Szenarien fehlen (W-DV-03). |
| Flag-Rätsel | passt (Kern) — Auswahl | Angriffsszenarien/Anomalien (dv3 10.4) [Q1]; Logs, Ports, DNS-Tunnel, Klartext im Mitschnitt passen. |
| **Spiele** | | |
| Kreuzworträtsel (2 Sets) | „Netzwerk und IT-Sicherheit": passt (Kern); „IT-Fachbegriffe": passt (Grundlagen) | kein DV-Set. |
| Begriffe-Duell (2 Sets) | „IT-Grundlagen": passt (Grundlagen); „SQL und Datenmodellierung": unsicher | |
| Memory (2 Sets) | „Ports und Protokolle": passt (Kern); „IT-Begriffe": passt (Grundlagen) | Protokolle/Ports: § 38 [Q1]. |
| Phishing-Detektiv | passt (Grundlagen) | AP1 [Q7]. |
| Bug-Hunt | unsicher → Inhalt ersetzen | Skripte/Schnittstellen programmieren (LF 10d) [Q2], aber Java/JS/SQL-Ausschnitte passen nicht; Sensor-/Gateway-Skripte nötig. |
| Code-Reihenfolge | unsicher → Inhalt ersetzen | wie Bug-Hunt. |
| Troubleshooting-Detektiv | passt (Kern) | § 37 [Q1]; heutige 10 Fälle sind Büro-Netz → Industrie-Set nachziehen (S-DV-01). |
| Subnetting-Sprint | passt (Kern) | wie Subnetting-Rechner. |
| Zahlensystem-Sprint | passt (Kern) | Binär/Hex bei Registern/Adressen (dv2 9.2 Modbus). |
| **Zusatzpakete** | | |
| Glossar FU1–FU7 (157) | passt (Grundlagen) | DV1–5 ohne Glossar → G-DV-01. |
| Lernpfad Scrum | passt (Grundlagen) | siehe Scrum. |
| Lernpfad OSI | passt (Kern) | siehe OSI. |
| Lernpfad Schutzziele | passt (Kern) | siehe Schutzziele. |
| Lernpfade Normalformen / ER | unsicher (Tendenz: passt nicht) | siehe dort. |
| Prüfungs-Rahmen | passt, zu schärfen | Zuordnung DV3+FU3 / DV1+DV2+DV4 vorhanden; Ergänzungen P-DV-01/02. |

**Folge für das Profil (Vorschlag):** Ausblenden: SWOT, BSC, Ansoff, Struktogramm/Ablauf, UML, ER, Normalformen und zwei zugehörige Lernpfade (bis zur Klärung), SQL-Übungsfläche und SQL-Instrument/-Duell (Entscheidung Frage 4 in Abschnitt 5), Cron-/Rechte-Szenarien; „Grundlagen"-Gruppe: PDCA, PSP, Scrum, Netzplan, Phishing, Kreuzwort/Duell „IT-Grundlagen".

### C.3 Neue Vorschläge

#### Instrumente

#### I-DV-01 · Automatisierungspyramide — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Feldebene, Steuerungsebene, Prozessleitebene (SCADA/HMI), Betriebsleitebene (MES), Unternehmensebene (ERP)*; Begriffe sind Geräte/Systeme (Temperatursensor, SPS, Leitstand, Fertigungssteuerung, ERP). Illustration als Pyramide.
- **Nutzen/Passung:** „Kommunikation der unterschiedlichen Prozesse und Ebenen prüfen" (§ 38) [Q1][Q27]; Theorie in dv1 8.2, dv4 11.2; Purdue/ISA-95-Ebenen sind das übliche Modell [Q14].
- **Risiken:** Ebenenbenennung und -zählung variieren (Purdue 0–4, ISA-95, Pyramide mit 4–5 Ebenen) → eine Lesart festlegen und im Prüfblatt belegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-02 · Sensor — Steuerung — Aktor — Kommunikation — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Sensor, Steuerung/Verarbeitung, Aktor, Kommunikation/Gateway*; Begriffe sind Bauteile und Rollen (Lichtschranke, Relais, Stellmotor, Gateway, Mikrocontroller, Temperaturfühler, Ventil).
- **Nutzen/Passung:** LF 7/10d: Sensoren und Aktoren integrieren [Q2]; Berufsbildposition cyber-physische Systeme [Q1]; dv2 9.2.
- **Risiken:** Bauteile mit Doppelrolle (Smart-Sensor mit Auswertung) eindeutig vermeiden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-03 · Industrie- und IoT-Protokolle erkennen — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Feldbus/Industrial Ethernet (z. B. Profinet), Modbus, OPC UA, MQTT*; Begriffe sind Eigenschaften („Publish/Subscribe über einen Broker mit Topics und QoS 0–2" → MQTT [Q15]; „Client/Server mit Informationsmodell und eingebauter Sicherheit" → OPC UA; „einfaches Register-Protokoll ohne eingebaute Sicherheit" → Modbus [Q16]; „zyklischer, echtzeitfähiger Datenaustausch" → Feldbus).
- **Nutzen/Passung:** „Protokolle bewerten" (§ 38) [Q1]; Theorie dv4 11.1, dv2 9.2 (Modbus in 13, MQTT in 18, OPC UA in 12 Dateien).
- **Risiken:** Modbus-Rollen („Master/Slave" vs. „Client/Server") und Profibus/Profinet nicht verwechseln; Ports nur nennen, wenn im Kurs belegt.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-04 · Zonenkonzept IT/OT — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Büro-IT, DMZ (Übergang), Produktionsnetz (Leitebene), Zelle/Feldebene*; Begriffe sind Systeme und Anforderungen (Mailserver, Historian/Datenbroker, SCADA-Server, SPS, Fernwartungs-Gateway).
- **Nutzen/Passung:** Segmentierung und Firewall zwischen Büro-IT und Produktion (dv2 9.3, dv1 8.3); IEC 62443 arbeitet mit Zonen und Übergängen („Conduits") [Q14]; LF 11d [Q2].
- **Risiken:** IEC 62443 definiert Zonen nach Schutzbedarf, nicht nach Pyramidenebene [Q14] — Vereinfachung ausweisen; **Theorie** in dv1 8.3 muss die gewählte Zonierung stützen (Prüfblatt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-05 · Kommunikationsmuster — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Request/Response (Polling), Publish/Subscribe, Zyklischer Echtzeit-Datenaustausch*; Begriffe sind Szenarien („Leitstand fragt alle 5 s die Temperatur ab", „Sensor meldet nur bei Änderung").
- **Nutzen/Passung:** dv1 8.1, dv4 11.1 „Kommunikationsmuster"; § 38 [Q1].
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-06 · Wartungsstrategien — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *reaktiv, präventiv (intervallbasiert), zustandsorientiert, vorausschauend*; Begriffe sind Maßnahmen („Lüfter nach 20 000 Betriebsstunden tauschen" → präventiv).
- **Nutzen/Passung:** dv3 10.3 (Wartungsstrategien, MTBF/MTTR); Diagnose-/Prozessdaten auswerten (§ 37) [Q1].
- **Risiken:** zustandsorientiert vs. vorausschauend sauber abgrenzen (Prüfblatt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-07 · Edge, lokaler Server, Cloud — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Edge, Lokaler Server (On-Premises), Cloud*; Begriffe sind Anforderungen („Reaktion unter 10 ms", „Langzeitarchiv und Modelltraining", „Daten vor dem Upload filtern").
- **Nutzen/Passung:** dv1 8.1 „Edge und Cloud: wohin mit den Daten?"; LF 10d [Q2].
- **Risiken:** Zahlenwerte im Fallbeispiel als Richtwerte kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-DV-08 · Funktechniken im IoT — Priorität niedrig · Aufwand S
- **Aufbau:** Zonen *WLAN, Bluetooth Low Energy, LoRaWAN, Mobilfunk (LTE-M/NB-IoT/5G)*; Begriffe sind Eigenschaften (Reichweite, Datenrate, Energiebedarf).
- **Nutzen/Passung:** dv4 11.4 „WLAN und Funk im Industrieumfeld".
- **Risiken:** **unsicher** — Prüfstoff nicht belegt (LTE/5G wurden aus dem AP1-Katalog gestrichen [Q7]); Theorie zu LoRaWAN/Mobilfunk nur in 2 Dateien. Nur umsetzen, wenn die Theorie vorher geprüft wurde.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Zusätzlich aus Abschnitt 4:* I-FI-02 Angriffsarten (OT-Pool), I-FI-05 Monitoring-Kategorien, I-FI-06 Cloud-Servicemodelle und Virtualisierung (unsicher für DV).

#### Spiele

#### S-DV-01 · Troubleshooting-Sets „Industrie und IoT" — Priorität hoch · Aufwand S–M
- **Inhalt:** Zehn neue Fälle im bekannten Format (erst Ebene, dann Ursache): eingefrorene Sensorwerte (Gateway/Broker), um Faktor 10 falsche Modbus-Werte (Skalierung/Register-Offset), Uhrzeit versetzt (Zeitsynchronisation), 0-mA-Signal (Drahtbruch), Subscriber erhält nichts (Topic/Berechtigung), Port 502 durch Firewall blockiert, Adresskonflikt, VLAN-Fehler.
- **Nutzen/Passung:** § 37 Störungen lokalisieren [Q1]; dv3 10.2, dv4 11.2.
- **Risiken:** Fachrichtigkeit der Fehlerbilder (Prüfblatt); „genau eine plausibelste Ursache" je Fall.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DV-02 · Anomalie-Jäger (neuer Spieltyp) — Priorität mittel · Aufwand M
- **Inhalt:** Liniendiagramm eines Sensors mit einem auffälligen Abschnitt; anklicken und Ursache wählen (Sensorausfall/Flachlinie, Drift, Ausreißer, normale Schwankung, möglicher Angriff); Erklärung.
- **Nutzen/Passung:** Diagnose- und Prozessdaten auswerten (§ 37) [Q1]; dv3 10.1/10.3/10.4.
- **Risiken:** Datensätze eindeutig konstruieren (synthetisch).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DV-03 · MQTT-Sprint (generierter Sprint) — Priorität mittel · Aufwand M
- **Inhalt:** Zufällige Aufgaben: „Passt der Filter `werk/+/temp` auf das Thema `werk/halle2/temp`?" (Platzhalter `+` und `#`), QoS-Wahl für ein Szenario, Wirkung von Retained/Last Will.
- **Nutzen/Passung:** MQTT in 18 DV-Dateien; Regeln eindeutig in der Spezifikation [Q15].
- **Risiken:** Prüfungsbezug von MQTT ist nur über Sekundärquellen belegt [Q12] → Priorität mittel; Aufgaben streng nach Spezifikation prüfen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DV-04 · Betriebs-Sprint (gemeinsam, siehe S-FI-02) — Priorität hoch · Aufwand M
- **Inhalt:** Verfügbarkeit → Ausfallzeit, MTBF/MTTR, Bandbreite/Latenz-Rechnungen. Eigene DV-Konfiguration des gemeinsamen Spiels.
- **Nutzen/Passung:** dv1 8.3 „Rechenbeispiele zu Bandbreite und Latenz", dv3 10.3 „MTBF, MTTR, Verfügbarkeit", dv4 11.3 Kennzahlen; § 38 Kennzahlen bewerten [Q1].
- **Risiken:** siehe S-FI-02.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-DV-05 · Sets für vorhandene Spieltypen (DV) — Priorität mittel · Aufwand S
- **Inhalt:** Duell „Vernetzte Systeme" (Modbus/OPC UA, Sensor/Aktor, SCADA/HMI/MES, analog/digital, Edge/Cloud, MTBF/MTTR, Polling/Ereignis); Memory „Protokoll ↔ Eigenschaft/Port"; Kreuzwort „Cyber-physische Systeme"; Bug-Hunt „Sensor-Skripte (Python/Arduino-C)": Einheiten, ganzzahlige Division, Skalierung.
- **Nutzen/Passung:** §§ 36–38 [Q1]; LF 10d [Q2].
- **Risiken:** Portangaben und Standardwerte vor Aufnahme belegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Übungswerkzeuge

#### W-DV-01 · Skalierungs- und Modbus-Register-Rechner — Priorität hoch · Aufwand S–M
- **Funktion:** Rohwert eines Analogeingangs (z. B. 4–20 mA, 0–10 V) in einen technischen Wert umrechnen (lineare Skalierung, Drahtbruch-Erkennung), Modbus-Registerwerte mit Faktor/Offset/16-Bit/Vorzeichen deuten. **Eingabe:** Rohwert, Bereich, Faktor; **Ausgabe:** technischer Wert, Prozent, Fehlerhinweis, Rechenweg. Zufallsaufgaben mit Kontrolle.
- **Nutzen/Passung:** dv2 9.2 „Beispiel Modbus: Register lesen und skalieren"; Prozessdaten auswerten (§ 37) [Q1].
- **Risiken:** Registerzählung (0- vs. 1-basiert) eindeutig festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DV-02 · MQTT-Labor (Simulation) — Priorität hoch · Aufwand M
- **Funktion:** Simulierter Broker mit mehreren Clients (Sensor, Dashboard, Alarmgeber); Lernende legen Themen und Abonnements an (Platzhalter, QoS, Retained, Last Will) und sehen, wer welche Nachricht erhält; Aufträge wie „Das Dashboard soll nur Temperaturen aus Halle 2 bekommen".
- **Browser:** reine Simulation im Browser, kein Netzwerkverkehr (wie F-171); vergleichbare Browser-Simulatoren existieren als Anregung [Q23].
- **Nutzen/Passung:** § 38 Protokolle/Kommunikation [Q1]; Spezifikation [Q15]; dv4 11.1.
- **Risiken:** Umfang begrenzen (kein TLS/Auth-Detail); Verhalten genau nach MQTT 3.1.1 [Q15].
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DV-03 · Industrienetz-Szenarien in der Topologie — Priorität hoch · Aufwand M
- **Funktion:** Neue Szenarien für den vorhandenen Topologie-Simulator: Produktionszelle im eigenen VLAN, Büro-IT und Produktion über Firewall getrennt (Modbus-Port nur vom Leitsystem erlaubt), Gateway zwischen Feldnetz und Standortnetz, Zugriff der Wartungsfirma über DMZ. Neue Gerätebezeichnungen (SPS, Gateway, Leitstand) auf vorhandenen Gerätetypen oder als neue Typen.
- **Nutzen/Passung:** dv2 9.3, dv4 11.4 (Segmentierung, VLAN, Zonen); LF 11d [Q2].
- **Risiken:** Ob neue Gerätetypen die Simulationslogik berühren, ist offen (M bis L); Trunk-Ports sind bewusst ausgeklammert (F-174).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-DV-04 · Energiebedarf- und Messwert-Rechner — Priorität mittel · Aufwand S
- **Funktion:** Leistungsaufnahme mehrerer Geräte, Netzteil-/PoE-Budget, Akkulaufzeit aus Kapazität und Stromaufnahme, Energiekosten; Messbereich-Prüfung. **Eingabe:** Geräteliste, Spannung, Strom, Laufzeit; **Ausgabe:** Gesamtleistung, kWh, Reserve, Laufzeit.
- **Nutzen/Passung:** LF 7: Energiebedarf validieren, Betriebswerte messen [Q2]; AP1: Strom-/Energiekosten [Q8].
- **Risiken:** Einheiten und Rundung sauber führen. *Idee ohne Priorität:* SPS-Logik-Simulator (UND/ODER, Selbsthaltung, Zeitglieder); Prüfungsbezug nur über dv2 9.2, im Rahmenlehrplan nicht ausdrücklich [Q2] → **unsicher**, L.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Glossar

#### G-DV-01 · DV-Glossar (ca. 110–130 Einträge) — Priorität hoch · Aufwand M
- **Umfang/Themen:** CPS, IoT/IIoT, Industrie 4.0, Edge, Gateway, Sensor, Aktor, SPS, HMI, SCADA, MES, ERP, IT/OT; Feldbus, Profinet, Modbus, OPC UA, MQTT (Broker, Topic, QoS, Retained, Last Will), REST; Latenz, Jitter, Bandbreite, Redundanz, MTBF, MTTR, Verfügbarkeit; Condition Monitoring, Predictive Maintenance; Zone, Conduit, DMZ, Segmentierung, VLAN, Härtung, Patch; Inbetriebnahme, Abnahme, Kommunikationsmatrix, Zeitstempel/NTP, Pufferung.
- **Nutzen/Passung:** F-165-Mechanismus; DV1–5 ohne Glossar.
- **Risiken:** Fachrichtigkeit (Prüfblatt); Begriffe zu Modbus-Rollen und Zonenkonzept vorsichtig definieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Lernpfade

#### L-DV-01 · Vom Sensor zum Dashboard (Instrument I-DV-01) — Priorität hoch · Aufwand M
- **Fallbeispiel:** Temperaturüberwachung am Härteofen der Rheinwerk Maschinen GmbH: Ebenen zuordnen → Sensorsignal → Steuerung → Gateway/Protokoll → Broker → Dashboard → Alarm.
- **Passung:** § 38 Ebenen/Kommunikation [Q1]; LF 7 [Q2]; dv1 8.1/8.2, dv4 11.2.
- **Risiken:** setzt I-DV-01 voraus; technische Werte im Fallbeispiel plausibel halten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### L-DV-02 · Produktionsnetz absichern: Zonen und Übergänge (Instrument I-DV-04) — Priorität mittel · Aufwand M
- **Fallbeispiel:** Rheinwerk Maschinen GmbH öffnet die Produktion für Fernwartung: Systeme den Zonen zuordnen → Übergänge/Firewallregeln → Fernzugang → Risikobewertung → Maßnahmen.
- **Passung:** LF 11d [Q2]; dv2 9.3, dv3 10.4.
- **Risiken:** setzt I-DV-04 voraus; keine Angriffsanleitungen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Bestehende Lernpfade:* OSI und Schutzziele bleiben im DV-Kern; Scrum als Grundlagen; Normalformen/ER bis zur Klärung ausblenden.

#### Prüfungs-Rahmen

#### P-DV-01 · Projekt-Hilfe für Vernetzungsprojekte — Priorität mittel · Aufwand S
- **Inhalt:** Beispiele typischer DV-Projekte (Sensorik an Bestandsanlage anbinden, Gateway-Integration, Netzwerksegmentierung, Monitoring); Projektantrag-Check um Schnittstellen/Übertragungssysteme/Architekturbewertung (§ 36) ergänzen; Dokumentationsbausteine Blockschaltbild, Kommunikationsmatrix, Test- und Inbetriebnahmeprotokoll (dv1 8.1, dv4 11.2, dv2 9.4); typische Fachgesprächsfragen (Warum dieses Protokoll? Was passiert bei Ausfall? Sicherheit im OT-Umfeld?).
- **Passung:** § 36 [Q1][Q27]; 40-h-Rahmen [Q3].
- **Risiken:** Umfang und Form regelt die zuständige IHK.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### P-DV-02 · Zuordnung der Fachgebiete zu den Prüfungsbereichen prüfen — Priorität niedrig · Aufwand S
- **Inhalt:** Im Code stehen DV1 (Analysieren/Planen) und DV2 (Errichten/Prüfen) unter „Betrieb und Erweiterung". Ihr Stoff (Planen, Errichten, Übergabe) gehört inhaltlich stark zum Projektbereich „Planen und Umsetzen" [Q1][Q2]. Vorschlag: bei der Fachprüfung klären und die Zuordnung ggf. anpassen.
- **Passung:** § 36–38 [Q1]; Zuordnung ist laut Code eine didaktische Entscheidung der Plattform, keine amtliche.
- **Risiken:** Eine Änderung wirkt auf die Prüfungssimulation (F-149).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## Kurs D — Fachinformatiker/in Systemintegration (`fachinformatiker-systemintegration`)

### D.1 Prüfungsrahmen (Kurzfassung)

- **Teil 1:** wie bei allen IT-Berufen (90 Min., 20 %) [Q1][Q3].
- **Teil 2:** (a) *Planen und Umsetzen eines Projektes der Systemintegration* — Projektarbeit bis **40 Std.** mit Dokumentation (50 % der Bereichsnote) und Präsentation (höchstens 15 Min.) mit Fachgespräch (zusammen höchstens 30 Min., 50 % der Bereichsnote), Bereich **50 %**; (b) *Konzeption und Administration von IT-Systemen* 90 Min., 10 %; (c) *Analyse und Entwicklung von Netzwerken* 90 Min., 10 %; (d) *Wirtschafts- und Sozialkunde* 60 Min., 10 % [Q1][Q3].
- **Inhalte laut FIAusbV (nach Abruf-Zusammenfassung):** (b) IT-Systeme planen und konfigurieren, administrieren und betreiben, Speicherlösungen integrieren, automatisierte Verwaltungsprogramme erstellen; (c) Netzwerkprotokolle auswählen, Komponenten konfigurieren, IT-Sicherheit umsetzen, Betrieb und Verfügbarkeit überwachen; Projekt: Anforderungen analysieren, Lösungsalternativen vorschlagen, Systemänderungen durchführen, IT-Systeme einführen, Schwachstellen analysieren, dokumentieren [Q1].
- **Rahmenlehrplan:** LF 10b *Serverdienste bereitstellen und Administrationsaufgaben automatisieren* (Konzepte zu Einrichtung, Aktualisierung, Datensicherung, Überwachung; Testverfahren; Automatisierung), LF 11b *Betrieb und Sicherheit vernetzter Systeme gewährleisten* (Risikoanalyse, Schutzmaßnahmen, „relative Sicherheit"), LF 12b *Kundenspezifische Systemintegration* [Q2].
- **Prüfungskatalog:** nicht frei verfügbar gefunden (**unsicher**); Sekundärquellen nennen für Netzwerke u. a. IPv4/IPv6, Subnetting, Routing, VLAN, DNS, DHCP, Firewall, Verfügbarkeit, für Systeme Linux/Windows, Verzeichnisdienste, Virtualisierung/Container, RAID/NAS/SAN, Backuparten, RTO/RPO, Härtung, Monitoring [Q11][Q12]. Gesichert aus [Q5]: SQL und RAID werden nur in Teil 2 geprüft; einheitliche Belegsätze.

### D.2 Bestandsbewertung

| Angebot (heute) | Urteil | Begründung / Beleg |
|---|---|---|
| **Instrumente** | | |
| SWOT-Matrix | passt nicht | BWL; kein Bezug zu §§ 20–22 [Q1]; AP1 gestrichen [Q7]. |
| Balanced Scorecard | passt nicht | BWL; ohne Content. |
| Ansoff-Matrix | passt nicht | wie BSC. |
| Gantt-Diagramm | passt (Kern) | Zeitplanung der Projektbeschreibung [Q3]; Migrationspläne. |
| Eisenhower-Matrix | unsicher (Tendenz: ausblenden) | kein Prüfungsbeleg. |
| PDCA-Zyklus | passt (Grundlagen) | Qualitätssicherung [Q1]. |
| Risikomatrix | passt (Kern) | LF 11b Risikoanalyse [Q2]; Schwachstellenanalyse im Projekt (§ 20) [Q1]. |
| Projektstrukturplan / Organigramm | passt (Grundlagen) | Projektplanung allgemein. |
| OSI-Modell | passt (Kern) | Netzwerkprotokolle auswählen/Störungen eingrenzen (§ 22) [Q1]. |
| Schutzziele | passt (Kern) | LF 11b [Q2]; IT-Sicherheit § 22 [Q1]. |
| SQL-Befehlsgruppen | unsicher (Tendenz: passt nicht) | §§ 20–22 nennen keine Datenbankabfragen [Q1]; SQL nur Teil 2 [Q5]; LF 5/8 gemeinsam [Q2]. |
| Scrum | passt (Grundlagen) | AP1 [Q7]. |
| UML-Diagramme | passt nicht | kein SI-Prüfungsinhalt [Q1]; AP1 nur Aktivitätsdiagramm [Q7]. |
| Teststufen (V-Modell) | passt (Kern) | Testverfahren/Kompatibilität/Testkonzepte (LF 10b [Q2], si1 8.3); Abnahme (si1 8.4). |
| ER-Modell | unsicher (Tendenz: passt nicht) | kein SI-Bezug in §§ 20–22 [Q1]. |
| Normalformen | unsicher (Tendenz: passt nicht) | wie ER-Modell. |
| Struktogramm und Programmablauf | unsicher (Tendenz: passt nicht) | gestrichen [Q5]; Skripte (si4 11.1) brauchen Kontrollstrukturen, aber nicht als Struktogramm. |
| **Übungswerkzeuge** | | |
| Netzplan | passt (Grundlagen) | AP1 [Q8]. |
| Subnetting-Rechner | passt (Kern) | IP-Adressierung/Subnetting, Netzwerke (§ 22) [Q1][Q11]. |
| SQL-Übungsfläche | unsicher (Tendenz: passt nicht) | siehe SQL-Befehlsgruppen. |
| Terminal-Szenarien | passt (Kern) | Serverdienste administrieren/überwachen (LF 10b) [Q2]; alle 12 Szenarien passen, Administration (Benutzer, Backup) fehlt. |
| Netzwerk-Topologie | passt (Kern) | Routing/VLAN/DHCP/NAT/Firewall (§ 22) [Q1][Q11]. |
| Flag-Rätsel | passt (Kern) — Auswahl | IT-Sicherheit § 22 [Q1]; Logs, offene Ports, SSH-Regelreihenfolge, DNS-Tunnel passen; Kodierungsrätsel Grundlagen. |
| **Spiele** | | |
| Kreuzworträtsel (2 Sets) | „Netzwerk und IT-Sicherheit": passt (Kern); „IT-Fachbegriffe": passt (Grundlagen) | kein Server-/Speicher-Set. |
| Begriffe-Duell (2 Sets) | „IT-Grundlagen": passt (Grundlagen); „SQL und Datenmodellierung": unsicher | |
| Memory (2 Sets) | „Ports und Protokolle": passt (Kern); „IT-Begriffe": passt (Grundlagen) | |
| Phishing-Detektiv | passt (Grundlagen) | AP1 IT-Sicherheit [Q7]. |
| Bug-Hunt | unsicher → Inhalt ersetzen | Skripte erstellen (§ 21) [Q1]; Java/JS-Ausschnitte passen nicht, Bash/PowerShell/Python und Konfigurationsdateien fehlen. |
| Code-Reihenfolge | unsicher → Inhalt ersetzen | wie Bug-Hunt. |
| Troubleshooting-Detektiv | passt (Kern) | Störungsanalyse (§ 22) [Q1][Q11]; Server-Fälle fehlen. |
| Subnetting-Sprint | passt (Kern) | wie Subnetting-Rechner. |
| Zahlensystem-Sprint | passt (Kern) | Binär/Hex bei Adressen, Masken, IPv6 [Q7]. |
| **Zusatzpakete** | | |
| Glossar FU1–FU7 (157) | passt (Grundlagen) | SI1–5 ohne Glossar → G-SI-01. |
| Lernpfad Scrum | passt (Grundlagen) | siehe Scrum. |
| Lernpfad OSI | passt (Kern) | siehe OSI. |
| Lernpfad Schutzziele | passt (Kern) | siehe Schutzziele. |
| Lernpfade Normalformen / ER | unsicher (Tendenz: passt nicht) | siehe dort. |
| Prüfungs-Rahmen | passt, zu schärfen | Zuordnung SI1+SI3+SI4 / SI2+FU3 vorhanden (plausibel zu §§ 21/22); Ergänzungen P-SI-01/02. |

**Folge für das Profil (Vorschlag):** Ausblenden: SWOT, BSC, Ansoff, UML, Struktogramm/Ablauf, ER, Normalformen (+ zwei Lernpfade) bis zur Klärung, SQL-Übungsfläche/-Instrument/-Duell (Frage 4 in Abschnitt 5); „Grundlagen"-Gruppe: PDCA, PSP, Scrum, Netzplan, Phishing, Kreuzwort/Duell „IT-Grundlagen".

### D.3 Neue Vorschläge

#### Instrumente

#### I-SI-01 · Sicherungsarten — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Vollsicherung, Inkrementelle Sicherung, Differentielle Sicherung*; Begriffe sind Aussagen und Szenarien („Zum Wiederherstellen werden die letzte Vollsicherung und alle folgenden Sicherungen benötigt" → inkrementell; „… und nur die letzte Sicherung" → differentiell).
- **Nutzen/Passung:** Datensicherung/Wiederherstellung (LF 10b [Q2]; si3 10.3); Backuparten werden als Prüfthema genannt [Q11].
- **Risiken:** gering; Begriffe eindeutig nach üblicher Lesart (Prüfblatt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-02 · RAID-Level — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *RAID 0, RAID 1, RAID 5, RAID 6, RAID 10*; Begriffe sind Eigenschaften („Spiegelung, halbe Nettokapazität" → RAID 1; „zwei Paritätsblöcke, zwei Ausfälle tolerierbar" → RAID 6).
- **Nutzen/Passung:** Speicherlösungen integrieren (§ 21) [Q1]; si4 11.2 mit Kapazitäts-/Ausfallrechnung; RAID nur in Teil 2 [Q5].
- **Risiken:** gering; RAID ist keine Datensicherung (Erklärung). Auch für DV denkbar (Unsicher, Frage 5).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-03 · Netzwerksicherheits-Bausteine — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Firewall, NAT, VPN, DMZ/Segmentierung, Zugangskontrolle am Netzrand (802.1X/Port-Security)*; Begriffe sind Szenarien („Heimarbeitsplatz greift verschlüsselt auf das Firmennetz zu" → VPN; „Webserver aus dem Internet erreichbar, Intranet geschützt" → DMZ).
- **Nutzen/Passung:** IT-Sicherheit implementieren (§ 22) [Q1]; si2 9.3.
- **Risiken:** Bausteine überschneiden sich (Firewall in der DMZ) → Szenarien eindeutig formulieren.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-04 · Verzeichnisdienst und Berechtigungen — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Benutzerkonto, Gruppe, Organisationseinheit (OU), Gruppenrichtlinie (GPO), Berechtigung (ACL)*; Begriffe sind Aufgaben („Alle Vertriebsmitarbeitenden erhalten Zugriff auf das Laufwerk" → Gruppe; „Passwortregeln zentral erzwingen" → GPO; „Verwaltung für die Filiale delegieren" → OU). Optional als Baum-Variante (Gesamtstruktur → Domäne → OU → Objekte).
- **Nutzen/Passung:** Berechtigungen/Verzeichnisdienste (si3 10.1); Benutzer-/Zugriffsverwaltung wird als Prüfthema genannt [Q12].
- **Risiken:** Windows-/Active-Directory-lastig; Gruppenrichtlinien stehen nur in einer Datei (Theorie prüfen); Linux-Entsprechungen ggf. ergänzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-05 · Virtuelle Maschine, Container oder physischer Server — Priorität mittel · Aufwand S
- **Aufbau:** Zonen *Physischer Server, Virtuelle Maschine, Container*; Begriffe sind Eigenschaften („eigener Kernel, Hypervisor" → VM; „teilt den Kernel des Hosts, startet in Sekunden" → Container).
- **Nutzen/Passung:** Virtualisierung/Container-Grundlagen als Prüfthema [Q11]; si1 8.2.
- **Risiken:** Vereinfachungen (Container-Isolation) kennzeichnen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-06 · Migrationsplan (Gantt-Zuordnung) — Priorität mittel · Aufwand S
- **Aufbau:** Gantt-Format: Tätigkeiten den Phasen *Vorbereitung, Pilotbetrieb, Umschaltung/Rollout, Hypercare* zuordnen (Datensicherung, Rollback-Test, Schulung, Datenvalidierung, Abnahme).
- **Nutzen/Passung:** Systemänderungen durchführen/einführen (§ 20) [Q1]; si1 8.4 (Übergabe, Hypercare, Rollback).
- **Risiken:** Phasenbegriffe sind firmenabhängig → am Kurs-Theorietext ausrichten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-07 · Switching, VLAN, Routing und Redundanz — Priorität hoch · Aufwand S
- **Aufbau:** Zonen *Switching (Layer 2), VLAN/Trunking, Routing (Layer 3), Redundanz (Spanning Tree)*; Begriffe sind Problem-Lösungs-Paare („Broadcast-Domäne verkleinern" → VLAN; „Schleife im Layer-2-Netz verhindern" → Spanning Tree).
- **Nutzen/Passung:** „Routing, Switching, VLANs" als Netzwerkthemen [Q11]; Netzwerkprotokolle auswählen (§ 22) [Q1]; si2 9.1.
- **Risiken:** Layer-3-Switch-Grenzfälle vermeiden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-SI-08 · Verkabelung und Medien — Priorität niedrig · Aufwand S
- **Aufbau:** Zonen *Kupfer (Twisted Pair), Glasfaser Multimode, Glasfaser Singlemode, Funk (WLAN)*; Begriffe sind Eigenschaften (Reichweite, PoE, Störanfälligkeit).
- **Nutzen/Passung:** si2 9.2; Komponentenauswahl (§ 22) [Q1].
- **Risiken:** Reichweiten-/Geschwindigkeitswerte sind normabhängig (nur belegte Werte verwenden); Prüfungsbezug nicht gesondert belegt.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Zusätzlich aus Abschnitt 4:* I-FI-02 Angriffsarten, I-FI-05 Monitoring-Kategorien, I-FI-06 Cloud-Servicemodelle und Virtualisierung.

#### Spiele

#### S-SI-01 · Troubleshooting-Sets „Serverdienste" und „Switching/Routing" — Priorität hoch · Aufwand S–M
- **Inhalt:** Zwei neue Sets im bekannten Format (erst Ebene, dann Ursache): Dienst startet nicht (Port belegt, Konfigurationsfehler, Rechte), Zertifikat abgelaufen, DHCP-Pool leer, falsches Gateway, VLAN-Zuordnung, Schleife im Layer 2, DNS-Eintrag veraltet, Platte voll/Quota.
- **Nutzen/Passung:** § 22 Störungsanalyse [Q1]; LF 10b [Q2].
- **Risiken:** Fachrichtigkeit (Prüfblatt); genau eine plausibelste Ursache je Fall.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-SI-02 · Bug-Hunt „Skripte und Konfigurationsdateien" — Priorität hoch · Aufwand S
- **Inhalt:** Zwölf Ausschnitte in Bash/PowerShell/Python und Konfigurationen (sshd_config, nginx, ufw-Regeln, cron): eine fehlerhafte Zeile finden (Quoting, Schleife ohne Abbruch, unsichere Rechte, fehlende Fehlerbehandlung, falsche Regelreihenfolge).
- **Nutzen/Passung:** „automatisierte Verwaltungsprogramme erstellen" (§ 21) [Q1]; si4 11.1/11.3 (Fehlerbehandlung, Idempotenz, Skriptsicherheit).
- **Risiken:** Ausschnitte müssen lauffähig und eindeutig sein; keine gefährlichen Befehle (kein `rm -rf` als Lehrbeispiel ohne Absicherung).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-SI-03 · Betriebs-Sprint (gemeinsam, siehe S-FI-02) — Priorität hoch · Aufwand M
- **Inhalt:** SI-Konfiguration: RAID-Nutzkapazität und Ausfalltoleranz, Restore-Kette bei voll/inkrementell/differentiell, Speicherbedarf bei Aufbewahrungsfristen, Verfügbarkeit → Ausfallzeit, RTO/RPO-Check.
- **Nutzen/Passung:** si3 10.3, si4 11.2, si2 9.4; Speicherlösungen/Verfügbarkeit (§§ 21/22) [Q1].
- **Risiken:** siehe S-FI-02.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-SI-04 · Regel-Richter (neuer Spieltyp) — Priorität mittel · Aufwand M
- **Inhalt:** Ein Regelwerk (Firewall-/ACL-Liste, NTFS-Rechte plus Freigabe) und eine Reihe von Anfragen; Lernende entscheiden „erlaubt" oder „blockiert" (Reihenfolge „erste passende Regel gilt", implizites Verbieten, Verbote vor Erlaubnis, effektive Rechte); Erklärung je Fall.
- **Nutzen/Passung:** Firewall-/Sicherheitskonzepte (§ 22) [Q1]; si2 9.3, si3 10.1; Regelreihenfolge steckt bereits im Flag-Rätsel „Wer zuerst kommt, gilt zuerst" und im ufw-Szenario.
- **Risiken:** Fachrichtigkeit der Windows-Berechtigungslogik (Prüfblatt); Regelwerke bewusst einfach halten.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-SI-05 · Sets für vorhandene Spieltypen (SI) und VLSM — Priorität mittel · Aufwand S (VLSM M)
- **Inhalt:** Duell „Server, Speicher, Netz" (DHCP/DNS, Switch/Router, NAS/SAN, VLAN/Subnetz, Hypervisor Typ 1/2, RTO/RPO, inkrementell/differentiell); Memory „Dienst ↔ Aufgabe/Port"; Kreuzwort „Server, Speicher und Backup"; optional neuer Aufgabentyp im Subnetting-Sprint: Teilnetze nach Hostbedarf planen (VLSM).
- **Nutzen/Passung:** §§ 21/22 [Q1]; heutige Sprint-Typen: Netzadresse, Broadcast, Hosts, Maske, Präfix (`SUBNETTING_TYPEN`).
- **Risiken:** Portangaben belegen; VLSM-Planung braucht eindeutige Reihenfolgeregel (größtes Netz zuerst).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Übungswerkzeuge

#### W-SI-01 · Backup-, RAID- und Verfügbarkeitsrechner — Priorität hoch · Aufwand S–M
- **Funktion:** (1) Backup: Datenmenge, tägliche Änderungsrate, Sicherungsplan (voll/inkrementell/differentiell), Aufbewahrung → Speicherbedarf, Restore-Kette und -Dauer, RTO/RPO-Prüfung; (2) RAID: Plattenzahl/-größe/Level → Nutzkapazität, Ausfalltoleranz; (3) Verfügbarkeit in % → Ausfallzeit pro Jahr/Monat. **Browser:** rein clientseitig mit Rechenweg.
- **Nutzen/Passung:** § 21 Speicherlösungen [Q1]; si3 10.3, si4 11.2, si2 9.4.
- **Risiken:** Rechenmodelle (z. B. Deduplizierung) bewusst weglassen; Annahmen anzeigen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-SI-02 · Terminal-Szenarien „Administration" — Priorität hoch · Aufwand M–L
- **Funktion:** Weitere simulierte Linux-Aufgaben: Benutzer und Gruppen anlegen, `sudo`-Rechte, Dienste starten/aktivieren, Sicherung mit `tar`/`rsync`, Cron-Planung, Logrotation, Speicherstatus (`lsblk`, RAID-Status), SSH-Schlüsselanmeldung. **Eingabe:** Befehle; **Ausgabe:** simulierte Antworten, Zielzustand geprüft (wie F-171/F-174).
- **Nutzen/Passung:** LF 10b [Q2]; § 21 [Q1]; si3/si4.
- **Risiken:** Befehlsumfang und realistische Ausgaben (Fachrichtigkeit); Windows/PowerShell ist nicht abgedeckt (eigene, spätere Entscheidung).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-SI-03 · Berechtigungs- und Verzeichnisdienst-Labor — Priorität mittel · Aufwand M–L
- **Funktion:** Benutzer in Gruppen und OUs einordnen, Berechtigungen auf Ordner setzen, **effektive Rechte** ermitteln (Freigabe plus NTFS, Verbote, Vererbung), Wirkung von Gruppenrichtlinien vorhersagen. **Eingabe:** Zuordnungen/Rechte; **Ausgabe:** Ergebnis und Begründung.
- **Nutzen/Passung:** si3 10.1; Zugriffsverwaltung [Q12].
- **Risiken:** Berechtigungslogik muss exakt stimmen (Prüfblatt); Umfang begrenzen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-SI-04 · Topologie-Szenarien: Inter-VLAN, DMZ, Standortverbund — Priorität mittel · Aufwand M–L
- **Funktion:** Neue Szenarien im Topologie-Simulator: Router mit mehreren VLAN-Schnittstellen, DMZ mit Firewall, Verbindung zweier Standorte (VPN abstrahiert), redundanter Pfad. 
- **Nutzen/Passung:** § 22 [Q1]; si2 9.1/9.3.
- **Risiken:** Trunk-Ports und Layer-2-Schleifen sind laut F-174 bewusst ausgeklammert; die Simulation müsste erweitert werden (L). Nur Szenarien, die ohne Trunk auskommen, wären M.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Glossar

#### G-SI-01 · SI-Glossar (ca. 120–140 Einträge) — Priorität hoch · Aufwand M
- **Umfang/Themen:** Server/Virtualisierung (Hypervisor, VM, Container, Snapshot, Thin Provisioning); Speicher (RAID-Level, NAS, SAN, iSCSI, Block/Datei/Objekt); Sicherung (3-2-1, RTO, RPO, Generationenprinzip, Restore-Test, Desaster Recovery); Netzwerk (VLAN, Trunk, STP, Routing, NAT, DMZ, VPN, 802.1X, PoE, MTU); Dienste (DNS, DHCP, NTP, LDAP, Kerberos, SNMP, Syslog); Verzeichnis (AD, OU, GPO, RBAC); Lizenzen (OEM, Volumen, Subscription); Patch-/Änderungsmanagement; Monitoring (Baseline, Schwellwert); Automatisierung (Infrastructure as Code, idempotent, Cron).
- **Nutzen/Passung:** F-165-Mechanismus; SI1–5 ohne Glossar.
- **Risiken:** Fachrichtigkeit (Prüfblatt).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### Lernpfade

#### L-SI-01 · Datensicherung für die Sonnenhof Apotheken KG (Instrument I-SI-01) — Priorität hoch · Aufwand M
- **Fallbeispiel:** Schutzbedarf der Daten → Sicherungsarten wählen → 3-2-1/Generationen → RTO/RPO festlegen → Restore-Test → Datenschutz bei Sicherungen.
- **Passung:** LF 10b [Q2]; si3 10.3; § 21 [Q1].
- **Risiken:** setzt I-SI-01 voraus; Zahlen im Fallbeispiel müssen rechnerisch stimmen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### L-SI-02 · Netz der Nordlicht Logistik AG absichern (Instrument I-SI-03) — Priorität mittel · Aufwand M
- **Fallbeispiel:** Segmentierung → DMZ → Firewallregeln → VPN für Außendienst → Zugangskontrolle → Dokumentation.
- **Passung:** § 22 [Q1]; LF 11b [Q2]; si2 9.3.
- **Risiken:** setzt I-SI-03 voraus; keine Angriffsanleitungen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

*Bestehende Lernpfade:* OSI und Schutzziele bleiben im SI-Kern; Scrum als Grundlagen; Normalformen/ER bis zur Klärung ausblenden.

#### Prüfungs-Rahmen

#### P-SI-01 · Projekt-Hilfe für SI-Projekte — Priorität mittel · Aufwand S
- **Inhalt:** Beispiele typischer SI-Projekte (Serverablösung/Virtualisierung, Backup-Konzept, Netzsegmentierung, Monitoring-Einführung); Projektantrag-Check um Lösungsalternativen und Schwachstellenanalyse (§ 20) ergänzen; Dokumentationsbausteine Netz-/Systemplan, Konfigurationsdokumentation, Test-/Abnahmeprotokoll, Rollback; typische Fachgesprächsfragen (Alternativen? Ausfallsicherheit? Rollback? Datenschutz bei Sicherungen?).
- **Passung:** § 20 [Q1]; 40-h-Rahmen [Q3].
- **Risiken:** Umfang und Form regelt die zuständige IHK.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### P-SI-02 · Fachgespräch-Fragenpool SI erweitern — Priorität niedrig · Aufwand S
- **Inhalt:** Das vorhandene `si5/fachgespraech.md` um projekttypische Nachfragen zu Alternativen, Verfügbarkeit, Rollback und Sicherheit erweitern; Verknüpfung mit „Mein Projekt" (F-161).
- **Passung:** Fachgespräch bezieht sich auf das Projekt [Q3].
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

---

## 4. Gemeinsames der vier Kurse und Unterschiede

### 4.1 Gemeinsame Bausteine (einmal bauen, viermal nutzen)

#### T-FI-01 · Kursprofil-Mechanismus (Voraussetzung für alles) — Priorität hoch · Aufwand M
- **Beschreibung:** Eine Konfiguration je Kurs (Vorschlag: Erweiterung der `kurs.metadata` neben `werkzeuge`), die festlegt: (1) welche **Instrumente**, **Spiele (Typ + Set)**, **Werkzeuge**, **Lernpfade** der Kurs anbietet, (2) je Eintrag die Gruppe **Kern** oder **Grundlagen (Teil 1)**, (3) bei Terminal/Topologie/Flag-Rätsel/SQL die erlaubten **Szenarien- bzw. Aufgaben-IDs** (z. B. nur Stufe „leicht" für AE/DPA). Die Oberfläche zeigt nur noch Profil-Einträge; der heutige Bereich „Weitere Instrumente/Spiele — in diesem Kurs noch nicht verfügbar" entfällt für Fachinformatiker (ausblenden statt einklappen).
- **Nutzen/Passung:** Setzt den Auftrag „nur Passendes anbieten" technisch um; heute entscheidet allein das Vorhandensein von Content bzw. der Eintrag `werkzeuge` (`Instrumente.tsx`, `import-content.ts`), und alle vier Kurse teilen sich dieselben FU-Inhalte.
- **Risiken:** Betrifft API (`content.instruments`, `game.available`, `courses.list`), Seeds und Import; Entscheidung ist in `docs/Architekturplanung.md` Abschnitt 13 zu dokumentieren (Projektregel). Auch für die Fachwirt-Kurse nutzbar (andere Auftragsgruppe).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

**Weitere technische Beobachtungen ohne Entscheidungsbedarf:** (a) FU1–FU7 liegen als vier Kopien je Kurs vor (nur `kurs_slug` unterscheidet sich); Änderungen am gemeinsamen Stoff müssten viermal gepflegt werden (Vorschlag: Synchronisierungsskript statt Handarbeit). (b) Neue kursspezifische Instrument-Fragen gehören in die eigenen Fachgebiete (AE/DP/DV/SI), nicht in FU. (c) Jedes neue Zonen-Modell braucht einen Eintrag in `QUADRANT_MODELS` (global) und eine Illustration; sichtbar wird es nur in Kursen, deren Profil es führt.

#### I-FI-01 · Vorgehensmodelle — Priorität mittel · Aufwand S · Kurse: alle (AE Kern, übrige Grundlagen)
- **Aufbau:** Zonen *Wasserfallmodell, Iterativ/inkrementell, Scrum (agil)*; Begriffe sind Merkmale („Phasen nacheinander ohne Rücksprung", „fester Zeitrahmen mit Review und Retrospektive"). Ergänzt das bestehende Scrum-Instrument (Rollen/Events/Artefakte).
- **Nutzen/Passung:** AP1-Katalog: Wasserfall und Scrum, andere Modelle gestrichen [Q7]; Scrum Guide 2020 [Q20]; ae1 8.1.
- **Risiken:** **unsicher**, ob das V-Modell noch Prüfstoff ist ([Q7] nennt nur Wasserfall und Scrum; das bestehende Instrument „Teststufen im V-Modell" bleibt davon unberührt, weil die Teststufen im AE-Bereich genannt sind [Q1]).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-FI-02 · Angriffsarten und Schutzmaßnahmen — Priorität hoch · Aufwand S · Kurse: alle (Pools je Kurs)
- **Aufbau:** Zonen *Injection (SQL-Injection), Man-in-the-Middle, Denial of Service (DDoS), Social Engineering/Phishing, Passwortangriffe (Brute-Force)*; Begriffe sind Beschreibungen und Gegenmaßnahmen („Prepared Statements" → Injection; „TLS mit Zertifikatsprüfung" → MitM; „Filterung beim Provider" → DDoS). Fragenpool je Kurs: AE anwendungsnah, SI/DV netz-/OT-nah, DPA daten- und zugangsnah.
- **Nutzen/Passung:** MitM, SQL-Injection, DDoS ausdrücklich im Katalog [Q6]; Angriffsszenarien (dv3 10.4); AP1 IT-Sicherheit [Q7]; OWASP-Top-10 als Orientierung [Q21].
- **Risiken:** Theorie in FU6 6.1 und AE2 9.1 ist knapp (SQL-Injection in 3–5, DDoS in 2 Dateien je Kurs) → Theorie vorher prüfen; **keine Angriffsanleitungen**, nur Erkennen und Abwehr.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-FI-03 · DSGVO-Grundsätze und Betroffenenrechte — Priorität hoch · Aufwand S · Kurse: alle
- **Aufbau:** Variante a: Zonen für die **sieben Grundsätze** (Rechtmäßigkeit/Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechenschaftspflicht); Variante b: **Betroffenenrechte** (Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch).
- **Nutzen/Passung:** AP1 neu: Betroffenenrechte, Anonymisierung/Pseudonymisierung [Q7]; Datenschutz in allen Kursen (FU6 6.2); in DPA Kernstoff (§ 30 [Q1]).
- **Risiken:** Rechtsinhalt — Wortlaut der Verordnung nicht abgerufen; Prüfblatt mit Rechtsabgleich (Recht & Compliance) nötig.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-FI-04 · Authentifizierung und Kryptografie-Bausteine — Priorität mittel · Aufwand S · Kurse: alle
- **Aufbau:** a) Zonen *Wissen, Besitz, Inhärenz (Biometrie)* für Authentifizierungsfaktoren; b) Zonen *Symmetrische Verschlüsselung, Asymmetrische Verschlüsselung, Hashverfahren* (Zuordnung von Aufgaben wie „Integrität prüfen", „Schlüsselaustausch ohne gemeinsames Geheimnis").
- **Nutzen/Passung:** AP1: Hash-Verfahren, Zweifaktor-Authentifizierung [Q7]; Kerberos/Authentifizierung in AE-Katalog [Q6]; Verschlüsselung dp4 11.4.
- **Risiken:** gering; Kodierung (Base64) ≠ Verschlüsselung sauber trennen (steht im Flag-Rätsel).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-FI-05 · Monitoring-Kategorien — Priorität hoch · Aufwand S · Kurse: SI und DV (Kern), AE/DPA nicht
- **Aufbau:** Zonen *Ressourcen (CPU/RAM/Speicher), Verfügbarkeit (Erreichbarkeit/Dienste), Netzwerk (Durchsatz/Latenz/Fehler), Ereignisse/Logs*; Begriffe sind Messwerte und Auffälligkeiten.
- **Nutzen/Passung:** Betrieb/Verfügbarkeit überwachen (§§ 22, 38) [Q1]; si2 9.4, si3 10.4, dv3 10.1, dv4 11.3; Monitoring auch im AE-Katalog neu [Q6].
- **Risiken:** gering; je Kurs eigener Fragenpool (SI Server/Netz, DV OT/Sensorik).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### I-FI-06 · Cloud-Servicemodelle — Priorität mittel · Aufwand S · Kurse: SI (Kern), DV unsicher
- **Aufbau:** Zonen *On-Premises, IaaS, PaaS, SaaS*; Begriffe sind Beispiele und Verantwortungsgrenzen.
- **Nutzen/Passung:** si1 8.2 (Hosting/Housing/Cloud); „Cloud-Modelle" in DV-Sekundärquellen [Q12]; dv1 8.1 Edge/Cloud.
- **Risiken:** für DV nicht belegt (**unsicher**).
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-FI-01 · IT-Rechen-Sprint für Teil 1 — Priorität hoch · Aufwand M · Kurse: alle (Grundlagen)
- **Inhalt:** Generierter Sprint (wie Subnetting-/Zahlensystem-Sprint): Datenmengen und Einheiten (Bit/Byte, KB/KiB), Übertragungsdauer aus Datenrate, Speicherbedarf, Stromkosten (Watt, Stunden, €/kWh), Prozent-/Skonto-/Rabattrechnung, Netto/Brutto.
- **Nutzen/Passung:** AP1: Übertragungsraten und Datenmengen berechnen [Q7]; Dateigrößen und Stromkosten berechnen kommen in AP1-Aufgaben vor [Q8]; nur nicht programmierbarer Taschenrechner [Q4].
- **Risiken:** Einheitenregel (Dezimal-/Binärpräfix) im Aufgabentext festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-FI-02 · Betriebs-Sprint — Priorität hoch · Aufwand M · Kurse: SI und DV
- **Inhalt:** Generierter Sprint mit konfigurierbaren Aufgabenarten: Verfügbarkeit ↔ Ausfallzeit, MTBF/MTTR → Verfügbarkeit, RAID-Nutzkapazität, Restore-Kette, Bandbreite/Latenz. Kurs-Konfiguration: SI mit Speicher/Backup, DV mit MTBF/MTTR und Bandbreite.
- **Nutzen/Passung:** si3 10.3, si4 11.2, dv3 10.3, dv1 8.3, dv4 11.3; §§ 21/22/38 [Q1].
- **Risiken:** Rundung und Formelvarianten festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### S-FI-03 · Teil-1-Sets „Hardware, Arbeitsplatz, Lizenzen" — Priorität mittel · Aufwand S · Kurse: alle (Grundlagen)
- **Inhalt:** Neue Sets für Duell, Memory, Kreuzwort: HDD/SSD, RAM, Schnittstellen, Betriebssysteme, Lizenzmodelle, Domäne, Arbeitsplatz-Übergabe.
- **Nutzen/Passung:** Hardware in 100 % der AP1-Prüfungen [Q8]; HDD/SSD und Domäne neu im Katalog [Q7]; FU2.
- **Risiken:** gering.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-FI-01 · Nutzwert- und Wirtschaftlichkeitsrechner — Priorität hoch · Aufwand M · Kurse: alle (Teil 1 und Projekt)
- **Funktion:** (1) Nutzwertanalyse (Kriterien, Gewichte, Punkte, Rangfolge, Empfindlichkeit); (2) Break-even, Amortisation, TCO, Leasing gegen Kauf, Angebotsvergleich mit Skonto/Rabatt. **Eingabe:** Zahlen oder Zufallsaufgabe; **Ausgabe:** Rechenweg, Ergebnis, Hinweise.
- **Nutzen/Passung:** Wirtschaftlichkeit in 90 % der AP1-Prüfungen, Nutzwertanalyse häufiges Thema [Q8]; „Wirtschaftlichkeit von Projekten bewerten" neu [Q7]; Wirtschaftlichkeitsbetrachtung im AE-Projekt (§ 12) [Q1]; Nutzwertanalyse ist in allen vier Kursen im Content vorhanden.
- **Risiken:** gering; Rechenverfahren im Rahmen der Kursinhalte festlegen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-FI-02 · Schreibtischtest-Trainer — Priorität hoch · Aufwand M · Kurse: alle (AE Kern, übrige Grundlagen)
- **Funktion:** Kleine Programme mit Trace-Tabelle: Lernende füllen Variablenwerte je Durchlauf aus, bekommen Rückmeldung zu jeder Zelle. **Eingabe:** Tabellenzellen; **Ausgabe:** Prüfung, Erklärung. Die Abläufe werden beim Erstellen der Inhalte vorab berechnet (keine Ausführung von Fremdcode im Browser, kein `eval`); AE-Aufgaben objekt-/algorithmennah, übrige einfach.
- **Nutzen/Passung:** AP1 neu: Fehler in Code finden, Schreibtischtests [Q7]; AP2-AE: Programmcode interpretieren (§ 14) [Q1], Schreibtischtest [Q9]; ae4 11.2 (Trace-Tabelle).
- **Risiken:** Vorab berechnete Abläufe müssen mit einem Testskript gegen echte Ausführung geprüft werden.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-FI-03 · Normalisierungs-Werkstatt — Priorität mittel · Aufwand L · Kurse: AE und DPA
- **Funktion:** Eine unnormalisierte Tabelle schrittweise in 1. bis 3. Normalform zerlegen (Spalten auf neue Tabellen verteilen, Schlüssel setzen); Prüfung gegen Musterlösung nach Kriterien (keine Wiederholgruppen, keine partiellen/transitiven Abhängigkeiten); Zusammenspiel mit ER-Modell. 
- **Nutzen/Passung:** Anomalien/Redundanz [Q6]; Redundanz als Datenqualitätsdimension (dp4 11.1); ergänzt die Zuordnungs-Instrumente und den Datenmodell-Lernpfad.
- **Risiken:** Mehrere gültige Zerlegungen → Kriterienprüfung; Aufwand hoch.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### W-FI-04 · SQL-Beiblatt-Modus in der SQL-Übungsfläche — Priorität mittel · Aufwand S · Kurse: AE und DPA
- **Funktion:** Umschaltbarer Prüfungsmodus: Autovervollständigung (F-172) aus, dafür ein selbst erstelltes Syntax-Beiblatt (SELECT/JOIN/GROUP BY/INSERT/UPDATE/DELETE/CREATE) neben dem Editor.
- **Nutzen/Passung:** Einheitliche Belegsätze (SQL-Beiblatt) in den neuen Katalogen [Q5][Q6].
- **Risiken:** Der amtliche Inhalt des Beiblatts ist hier unbekannt (**unsicher**); **kein Kopieren fremder Belegsätze**, eigenes Beiblatt erstellen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### G-FI-01 · Glossar FU1–FU7 prüfen und für Teil 1 ergänzen — Priorität mittel · Aufwand M · Kurse: alle
- **Inhalt:** Die 157 Entwurfs-Einträge fachlich prüfen (Status „ungeprüft"); fehlende AP1-Begriffe ergänzen (Betroffenenrechte, Pseudonymisierung, Hash, Zwei-Faktor, Domäne, IPv6, SSD/HDD, Nutzwertanalyse). Pflege als **eine** Quelle mit Synchronisierung in die vier Kurse.
- **Passung:** [Q7][Q8].
- **Risiken:** Pflegeaufwand durch vierfache Kopie.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

#### P-FI-01 · Prüfungsrahmen-Hinweise für alle vier Kurse — Priorität mittel · Aufwand S
- **Inhalt:** Zwei Stichpunkte in „Gelassen bleiben": Hilfsmittel (nicht programmierbarer Taschenrechner) [Q4]; Hinweis, dass Umfang, Form und Termine der Projektarbeit von der zuständigen IHK geregelt werden und die Offenlegung von KI-Nutzung im Projekt gefordert sein kann [Q4]; mündliche Ergänzungsprüfung (15 Min., Gewichtung 2:1) [Q3].
- **Passung:** [Q3][Q4].
- **Risiken:** IHK-Berlin-Leitfaden nicht als bundesweite Vorgabe darstellen.
- ☐ ja ☐ nein ☐ ändern — Anmerkung: ____

### 4.2 Unterschiede der vier Kurse (Kern / Grundlagen / ausblenden / offen)

K = passt (Kern) · G = passt (Grundlagen, Teil 1) · – = ausblenden · ? = offen/unsicher. Quelle: Bestandsbewertungen A.2, B.2, C.2, D.2.

| Angebot | AE | DPA | DV | SI |
|---|---|---|---|---|
| SWOT / BSC / Ansoff | – | – | – | – |
| Gantt-Diagramm | K | K | K | K |
| Eisenhower-Matrix | ? | ? | ? | ? |
| PDCA-Zyklus | G | K | G | G |
| Risikomatrix | G | G | K | K |
| Projektstrukturplan / Organigramm | K | G | G | G |
| OSI-Modell | G | G | K | K |
| Schutzziele | K | K | K | K |
| SQL-Befehlsgruppen / SQL-Übungsfläche | K | K | ? | ? |
| Scrum | K | G | G | G |
| UML-Diagramme | K | ? | ? | – |
| Teststufen | K | ? | K | K |
| ER-Modell / Normalformen | K | K | ? | ? |
| Struktogramm und Programmablauf | ? (umbauen) | – | ? | ? |
| Netzplan | G | G | G | G |
| Subnetting-Rechner / -Sprint | G | G | K | K |
| Terminal-Szenarien | G (leicht) | G (leicht) | K (Auswahl) | K |
| Netzwerk-Topologie | G (leicht) | G (leicht) | K | K |
| Flag-Rätsel | G (Auswahl) | G (Auswahl) | K (Auswahl) | K (Auswahl) |
| Kreuzwort / Duell / Memory (heutige Sets) | G, Duell-SQL K | G, Duell-SQL K | Netzwerk-/Ports-Set K | Netzwerk-/Ports-Set K |
| Phishing-Detektiv | G | G | G | G |
| Bug-Hunt / Code-Reihenfolge | K | ? (Inhalt ersetzen) | ? (Inhalt ersetzen) | ? (Inhalt ersetzen) |
| Troubleshooting-Detektiv | – | – | K | K |
| Zahlensystem-Sprint | G | G | K | K |
| Lernpfad Scrum | K | G | G | G |
| Lernpfad OSI | G | G | K | K |
| Lernpfad Schutzziele | K | K | K | K |
| Lernpfade Normalformen / ER | K | K | ? | ? |

**Schwerpunkte der Neuvorschläge:** AE — Entwurf/UML/Test/Git/Algorithmen; DPA — Prozessmodellierung und -analyse, Statistik, Datenqualität; DV — Ebenen/Sensorik/Protokolle/OT-Segmentierung; SI — Speicher/Backup, Netzwerk- und Zugriffssicherheit, Administration.

### 4.3 Formate, für die es Vorbilder gibt

- **Parsons-Aufgaben** (Code-Reihenfolge) sind didaktisch untersucht [Q22].
- **Browser-Simulatoren** für Elektronik/IoT und visuelle MQTT-Abläufe existieren (Wokwi, Node-RED) [Q23]; für MQTT-Labor und Szenarien als Anregung, nicht als Einbettung.
- **Spielerische Formate:** SQL-Detektivspiele und Linux-Lernspiele im Capture-the-Flag-Stil (Knight Lab, OverTheWire) [Q24] sind Vorbilder für Flag-Rätsel und Detektiv-Spiele; Aufgaben und Daten werden selbst erfunden.

### 4.4 Vorgeschlagene Reihenfolge (zur Diskussion)

1. **T-FI-01** (Kursprofil) und Ausblenden der „passt nicht"-Einträge — ohne neuen Content sofort sichtbarer Gewinn.
2. Je Kurs die **hoch-priorisierten S-Instrumente** (Zonen-Modelle), da sie nur Daten, Illustration und drei Fragen brauchen.
3. **Gemeinsame Werkzeuge** W-FI-01, W-FI-02, S-FI-01, S-FI-02.
4. **Kursspezifische Werkzeuge/Spiele** nach Priorität (z. B. W-AE-02, W-DPA-01/-03, W-DV-01/-02, W-SI-01/-02).
5. Glossare je Kurs und Lernpfade.
6. L-Aufwände (neue Editoren, Simulationserweiterungen) zuletzt und nur nach Freigabe.

**Umfang der Vorschläge:** 32 kursspezifische Instrument-Vorschläge (8 je Kurs; dazu die Änderung I-AE-00) plus 6 gemeinsame; 20 kursbezogene Spiel-Vorschläge (davon 2 Konfigurationen des gemeinsamen Sprints S-FI-02) plus 3 gemeinsame; 16 kursspezifische Werkzeuge plus 4 gemeinsame; 4 Kurs-Glossare plus 1 gemeinsames; 8 Lernpfade; je Kurs 2 Rahmen-Ergänzungen plus 1 gemeinsame. Das ist eine Auswahl zur Entscheidung, kein Umsetzungsplan — mit „nein" oder „ändern" lässt sich der Umfang je Zeile steuern.

---

## 5. Offene Fragen an den Produktinhaber

1. **Grundlagen sichtbar?** Soll der Stoff des gemeinsamen Teils 1 (FU-Fachgebiete: Subnetting, Phishing, OSI, Netzplan, leichte Terminal-/Topologie-Szenarien …) in jedem Kurs in einer eigenen Gruppe „Grundlagen (Teil 1)" sichtbar bleiben — oder nur das Fachrichtungs-Kernangebot? (Empfehlung: Grundlagen-Gruppe behalten, weil Teil 1 für alle vier Kurse Prüfung ist [Q1][Q3].)
2. **Eisenhower-Matrix:** ausblenden oder als Grundlagen belassen? Es gibt keinen Prüfungsbeleg.
3. **Folge des Ausblendens:** Wenn z. B. die SWOT-Kachel ausgeblendet wird — bleibt die zugehörige Zuordnungsfrage als gewöhnliche Übungsfrage im Thema FU1 1.2 (und in den Fachwirt-Kursen unverändert)? Oder wird die Frage aus den Fachinformatiker-Kursen entfernt?
4. **SQL für Systemintegration und Digitale Vernetzung:** SQL-Instrument, SQL-Übungsfläche und Duell „SQL und Datenmodellierung" ausblenden (die Prüfungsbereiche nennen keine Datenbankabfragen [Q1]) oder als Grundlagen belassen (LF 5/8 sind gemeinsam [Q2])? Dasselbe für ER-Modell/Normalformen und die beiden zugehörigen Lernpfade.
5. **Übernahme zwischen SI und DV:** Sollen RAID, Cloud-Servicemodelle und Sicherungsarten auch im DV-Kurs angeboten werden? Für DV ist der Prüfungsbezug nur über Sekundärquellen belegt [Q12].
6. **Struktogramm/PAP:** Das Instrument zu „Ablaufstrukturen" mit Pseudocode/Aktivitätsdiagramm umbauen (Vorschlag I-AE-00) — und die AE4-Theorie 11.1 („Pseudocode, Struktogramm, PAP") entsprechend gewichten, obwohl der Rahmenlehrplan der Berufsschule die Darstellungsformen noch lehren kann?
7. **Amtliche Prüfungskataloge:** Die Kataloge (U-Form, AkA/ZPA) sind kostenpflichtig bzw. nicht frei abrufbar. Wollen Sie diese für SI/DPA/DV beschaffen, damit die Themenlisten gegen die Originaldokumente geprüft werden? Wer führt die fachliche Prüfung (Prüfblätter) durch?
8. **Prüfstatus:** Sollen neue Instrumente, Spiele und Glossare erst nach Prüfblatt freigeschaltet werden (wie bei den bisherigen IT-Inhalten), oder als „Entwurf" sichtbar sein?
9. **Neue Spieltypen:** Welche der vorgeschlagenen neuen Spieltypen (Prozess-Detektiv, Daten-Detektiv, UML-Detektiv, Diagramm-Doktor, Anomalie-Jäger, Regel-Richter) und Sprint-Typen (Statistik-, Sortier-, MQTT-, Betriebs-, Rechen-Sprint) sind gewollt? Alle sind ohne Belohnung und Speicherung (F-175).
10. **Zuordnung der Fachgebiete zu Prüfungsbereichen:** DP3 (Statistik/Vorhersagemodelle) gehört formal zum Projekt, steht im Code aber im Bereich „Sicherstellen der Datenqualität"; DV1/DV2 stehen unter „Betrieb und Erweiterung" (P-DV-02). Soll das angepasst werden?
11. **Windows und Linux:** Die Terminal-Simulation bildet Linux ab. Reicht das für die Systemintegration, oder soll später eine Windows-/PowerShell-Variante (Verzeichnisdienst, Gruppenrichtlinien) folgen?
12. **KI/ML-Themen:** Maschinelles Lernen ist im Rahmenplan der DPA ausdrücklich (LF 10c) und KI ist laut [Q5] im neuen Katalog Thema; [Q6] behauptet das Gegenteil für Trendthemen. Soll ein Instrument/Glossarteil zu „KI-Grundlagen und Ethik" für alle vier Kurse vorbereitet werden, sobald die Quelle geklärt ist?
13. **Normfassung ISO/IEC 25010:** Welche Fassung soll für I-AE-05 maßgeblich sein (2011 mit acht oder 2023 mit neun Merkmalen)? Ohne Klärung nicht umsetzen.
14. **Fachwirt-Kurse:** Soll T-FI-01 gleich so gebaut werden, dass dieselbe Profil-Logik für die Fachwirt-Kurse der anderen Auftragsgruppen verwendbar ist?

---

## Quellenliste

Abruf am 06.10.2026. „Sekundär" = nicht amtliche Aufbereitung (Podcast, Prüfungsvorbereiter), nur als Hinweis auf Themen verwendet. Wo ein Werkzeug nur eine Zusammenfassung des Dokuments lieferte, ist das vermerkt; Wortlaut vor Übernahme am Original prüfen. Nicht kopiert wurden Prüfungsaufgaben oder Belegsätze; es wurden nur Themen und Strukturen abgeleitet.

**Amtlich / Behörden / Fachverbände**

- [Q1] Verordnung über die Berufsausbildung zum Fachinformatiker und zur Fachinformatikerin (FIAusbV), Prüfungsbereiche und Berufsbildpositionen — <https://www.gesetze-im-internet.de/fiausbv/BJNR025000020.html> (Wiedergabe über Abruf-Zusammenfassung; Paragrafennummern vor Übernahme prüfen).
- [Q2] KMK, Rahmenlehrplan für die Ausbildungsberufe Fachinformatiker/-in u. a. (Lernfelder 1–12, Volltext gelesen) — <https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Fachinformatiker_19-12-13_EL.pdf>
- [Q3] IHK, „Erläuterung zum Prüfungsverfahren" Fachinformatiker/-in Systemintegration (Stand 31.05.2022, Volltext gelesen) — <https://www.ihk.de/blueprint/servlet/resource/blob/5615146/71f1ab8086d09a3245c08cf51c1a4f99/fachinformatiker-vo2020-erlaeuterungen-zum-pruefungsverfahren-systemintegration-data.pdf> und Digitale Vernetzung — <https://www.ihk.de/blueprint/servlet/resource/blob/5615144/3ab48187250a29fa8961ab971c02604d/fachinformatiker-vo2020-erlaeuterungen-zum-pruefungsverfahren-digitale-vernetzung-data.pdf>
- [Q4] IHK-Leitfaden Fachinformatiker/-in Daten- und Prozessanalyse (AO 2020), Stand 10.02.2026 (IHK-spezifisch, Volltext gelesen) — <https://www.ihk.de/blueprint/servlet/resource/blob/6729448/517de9e3b058e53199f4f8849f4e819f/leitfaden-fachiformatikerin-fuer-daten-und-prozessanalyse-data.pdf>
- [Q5] IHK Hannover, „Prüfungskataloge IT-Berufe" (2. Auflage ab AP1 Frühjahr 2025 / AP2 Sommer 2025: Struktogramm und PAP gestrichen, UML/BPMN und KI neu, einheitliche Belegsätze, SQL und RAID nur Teil 2) — <https://www.ihk.de/hannover/hauptnavigation/ausbildung-und-weiterbildung/ausbildung/ausbildung-a-z/neuordnungen/pruefungskataloge-it-berufe-6438900>
- [Q13] BSI, Online-Kurs IT-Grundschutz, Schutzbedarfsfeststellung (Kategorien normal/hoch/sehr hoch) — <https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/Zertifizierte-Informationssicherheit/IT-Grundschutzschulung/Online-Kurs-IT-Grundschutz/Lektion_4_Schutzbedarfsfeststellung/Lektion_4_04/Lektion_4_04_node.html> (nur über Suchergebnis gesichtet).
- [Q27] IHK Nord Westfalen, Fachinformatiker/-in Digitale Vernetzung (Prüfungsinhalte; über Suchergebnis gesichtet) — <https://www.ihk.de/nordwestfalen/bildung/ausbildung/ausbildungsberufe-a-z/fachinformatiker-digitale-vernetzung-4767632>; IHK-AkA Berufsseite Digitale Vernetzung — <https://www.ihk-aka.de/pruefungen/ap/berufe/detail/b1204> (Prüfungsbereiche, ungebundene Prüfung; keine Themenliste).

**Standards und Normen (Fachwissen, nur teilweise geöffnet)**

- [Q15] OASIS, MQTT Version 3.1.1 (QoS 0/1/2, Topics, Filter) — <https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html> (über Suchergebnis gesichtet).
- [Q19] ISO/IEC 25010, Produktqualitätsmodell (Seite zeigt Fassung 2023 mit 9 Merkmalen, nur erste Seite gelesen) — <https://iso25000.com/index.php/en/iso-25000-standards/iso-25010>
- [Q18] ISO/IEC 25012 Datenqualitätsmodell (Überblick) — <https://quality.arc42.org/standards/iso-iec-25012>
- [Q20] Scrum Guide 2020 — <https://scrumguides.org/scrum-guide.html>
- [Q21] OWASP Top 10 (Weiterleitung auf Edition 2025; Kategorien nicht gelesen) — <https://top10.owasp.org/>
- [Q14] IEC 62443 Zonen/Conduits und Purdue-Modell (sekundär, Suchergebnisse) — <https://www.emberot.com/resources/blog/iec-62443-purdue-model/>, <https://softwaretoolbox.com/resources/what-is-purdue-model>
- [Q16] Vergleich Modbus/OPC UA (sekundär) — <https://www.emqx.com/en/blog/efficiency-comparison-opc-ua-modbus-mqtt-sparkplug-http>, <https://www.coppiot.com/en/opc-ua-vs-modbus-which-industrial-protocol-should-you-use/>
- [Q17] CRISP-DM-Phasen (sekundär; Hintergrund für Analyseprojekte) — <https://carpentries-incubator.github.io/python-business/11-crisp/index.html>
- DSGVO Art. 5 und 12–23 (Fachwissen, **nicht abgerufen**; Rechtsabgleich nötig) — <https://eur-lex.europa.eu/eli/reg/2016/679/oj>

**Sekundärquellen zum Prüfungsstoff (geringere Verlässlichkeit)**

- [Q6] IT-Berufe-Podcast #191, Änderungen Prüfungskatalog AP2 FIAE — <https://it-berufe-podcast.de/neuer-pruefungskatalog-fuer-die-ap2-als-fachinformatiker-anwendungsentwicklung-ab-2025-it-berufe-podcast-191/> (nennt IoT/KI als gestrichen, im Widerspruch zu [Q5]).
- [Q7] IT-Berufe-Podcast #190, Änderungen Prüfungskatalog AP1 — <https://it-berufe-podcast.de/neuer-pruefungskatalog-fuer-die-ap1-der-it-berufe-ab-2025-it-berufe-podcast-190/>
- [Q8] IT-Berufe-Podcast, „Themen der schriftlichen IHK-Prüfungen der IT-Berufe" (nur AP1 und AP2-AE dokumentiert) — <https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/themen-der-schriftlichen-ihk-pruefungen-der-it-berufe/>
- [Q9] IT-Berufe-Podcast, „Mögliche Themen von Teil 2 … Anwendungsentwicklung" — <https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/moegliche-themen-von-teil-2-der-gestreckten-abschlusspruefung-gap-fuer-fachinformatiker-anwendungsentwicklung/>
- [Q10] ausbilder.ai, „Neuer IHK-Prüfungskatalog 2026" (geringe Verlässlichkeit; als Hinweis auf Themen, teils widersprüchlich) — <https://ausbilder.ai/neuer-ihk-pruefungskatalog-ap2-fachinformatiker-fiae/>
- [Q11] ausbildung-in-der-it.de, AP-Teil-2-Übersicht und Systemintegration — <https://ausbildung-in-der-it.de/pruefung/ap2>, <https://ausbildung-in-der-it.de/pruefung/ap2/fachinformatiker-systemintegration>; it-abschlusspruefung.de AE-Inhalte — <https://it-abschlusspruefung.de/news-blog/inhalte-abschlusspruefung-teil-2-fachinformatiker-anwendungsentwicklung>
- [Q12] mydigi.academy, Prüfungsvorbereitung DV/SI/DPA (dünn, teils vage) — <https://mydigi.academy/pruefungsvorbereitung/fachinformatiker-digitale-vernetzung/>, <https://mydigi.academy/azubi-ratgeber/pruefungsvorbereitung-fachinformatiker-fuer-systemintegration/>, <https://mydigi.academy/azubi-ratgeber/pruefungsvorbereitung-fachinformatiker-fuer-daten-und-prozessanalyse/>
- [Q25] Pipercat, Prüfungsinformationen Digitale Vernetzung (Lernmaterial, sekundär) — <https://github.com/Pipercat/Pruefungs-informationen>

**Lernformate**

- [Q22] Parsons-Aufgaben — <https://en.wikipedia.org/wiki/Parsons_problem>
- [Q23] Wokwi (Online-Simulator) — <https://wokwi.com>; Node-RED mit MQTT — <https://www.emqx.com/en/blog/using-node-red-to-process-mqtt-data>
- [Q24] SQL-Murder-Mystery-Spiele — <https://sqlprotocol.com/learn/games-like-sql-murder-mystery>; OverTheWire Bandit — <https://github.com/EoinReid/Bandit-OverTheWire>

**Eigene Projektquellen (Ist-Stand)**

- [Q26] `apps/web/src/Instrumente.tsx`, `apps/web/src/Spiele.tsx`, `apps/api/src/db/seed-games.ts`, `apps/api/src/db/seed-instrument-lernpfad.ts`, `apps/api/src/db/import-content.ts`, `packages/shared/src/quiz-logic.ts` (`QUADRANT_MODELS`), `packages/shared/src/schemas/game.ts`, `packages/shared/src/{terminal-sim,topologie-sim,flag-raetsel,sql-uebungen}.ts`, `docs/Anforderungskatalog.md` (F-129–F-175), `content/fachinformatiker-*/` und `content/README.md`.
