# Content-Zwischenformat (edukedo)

Dieses Verzeichnis enthält Lerninhalte im **Zwischenformat** (Markdown mit strukturierten Feldern), wie im Entwicklungsplan (Iteration 0, Content-Bereich) vorgesehen. Es ist absichtlich einfach genug, um ohne Redaktionssystem (F-11) direkt von Hand geschrieben zu werden, aber konsistent genug, um später vom Bulk-Import (F-17) automatisiert eingelesen zu werden. Die Feldnamen orientieren sich bewusst an `content_item`/`content_item_version` aus der Architekturplanung (Abschnitt 4.3), damit der spätere Import kein Mapping raten muss.

## Verzeichnisstruktur

```
content/
  README.md                              ← diese Datei
  fachwirt-buero-projektorganisation/
    hb1/
      1.1-informationsmanagement.md
      1.2-prozess-qualitaetsmanagement.md
      1.3-projektmanagement.md
      1.4-zeit-selbstmanagement.md
      fallaufgaben.md
      fachgespraech.md
    hb2/
      2.1-kundenprojekte.md
      2.2-zielgruppen-marktanalyse.md
      2.3-werbemittel.md
      2.4-veranstaltungsmanagement.md
      2.5-kundenkommunikation-beschwerdemanagement.md
      fallaufgaben.md
      fachgespraech.md
    hb3/
      3.1-personalwirtschaft.md
      3.2-ausbildung.md
      3.3-konfliktmanagement.md
      3.4-moderation.md
      fallaufgaben.md           ← themenübergreifende Situationsaufgaben (F-23)
      fachgespraech.md          ← Fachgesprächsfragen-Sammlung (F-25)
    hb4/
      4.1-kennzahlen-controlling.md
      4.2-einkauf-beschaffung.md
      4.3-it-anwendungen.md
      4.4-wissensmanagement.md
      fallaufgaben.md
      fachgespraech.md
  mathematik-9/
    algebra-funktionen/
      alg1-quadratwurzeln.md
      alg2-potenzen.md
      alg3-quadratische-funktionen.md
      uebungsaufgaben.md        ← gemischte Übungsaufgaben über ALG1-3 (Klassenarbeits-Format)
    geometrie/
      geo1-pythagoras.md
      geo2-trigonometrie.md
      geo3-strahlensaetze.md
      uebungsaufgaben.md
    stochastik/
      sto1-wahrscheinlichkeitsrechnung.md
      uebungsaufgaben.md
  instrumenten-lernpfade/          ← Referenz-Content für F-129/F-130/F-131, siehe eigenes README
    README.md
    user-story-bsc-allgemein-alle-fachwirte.docx
    user-story-bsc-pflegeeinrichtung-fachwirt-gesundheit-soziales.docx
  fachwirt-gesundheit-soziales/    ← dritter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    hb1/
      1.1-rechtliche-rahmenbedingungen.md
      1.2-betriebliche-ziele-strategien.md
      1.3-aufbau-ablauforganisation.md
      1.4-veraenderungsprozesse.md
      fallaufgaben.md
      fachgespraech.md
    hb2/ … 2.1–2.4 + fallaufgaben.md + fachgespraech.md
    hb3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md
    hb4/ … 4.1–4.4 + fallaufgaben.md + fachgespraech.md
    hb5/ … 5.1–5.5 + fallaufgaben.md + fachgespraech.md   ← Pflichtthema des Fachgesprächs bei diesem Kurs
    hb6/ … 6.1–6.3 + fallaufgaben.md + fachgespraech.md
  wirtschaftsfachwirt/             ← vierter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    wbq1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md   ← Volks- und Betriebswirtschaft
    wbq2/ … 2.1–2.3 + fallaufgaben.md + fachgespraech.md   ← Rechnungswesen
    wbq3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md   ← Recht und Steuern
    wbq4/ … 4.1–4.3 + fallaufgaben.md + fachgespraech.md   ← Unternehmensführung
    hsq1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md   ← Betriebliches Management
    hsq2/ … 2.1–2.4 + fallaufgaben.md + fachgespraech.md   ← Investition, Finanzierung, betriebl. Rechnungswesen und Controlling
    hsq3/ … 3.1–3.3 + fallaufgaben.md + fachgespraech.md   ← Logistik
    hsq4/ … 4.1–4.4 + fallaufgaben.md + fachgespraech.md   ← Marketing und Vertrieb
    hsq5/ … 5.1–5.4 + fallaufgaben.md + fachgespraech.md   ← Führung und Zusammenarbeit (Pflichtthema des Fachgesprächs)
  handelsfachwirt/                 ← fünfter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    hb1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md    ← Unternehmensführung und -steuerung
    hb2/ … 2.1–2.4 + fallaufgaben.md + fachgespraech.md    ← Führung, Personalmanagement, Kommunikation und Kooperation
    hb3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Handelsmarketing
    hb4/ … 4.1–4.3 + fallaufgaben.md + fachgespraech.md    ← Beschaffung und Logistik
    wb1/ … 5.1–5.3 + fallaufgaben.md + fachgespraech.md    ← Vertriebssteuerung (Wahlpflicht)
    wb2/ … 6.1–6.2 + fallaufgaben.md + fachgespraech.md    ← Handelslogistik (Wahlpflicht)
    wb3/ … 7.1–7.3 + fallaufgaben.md + fachgespraech.md    ← Einkauf (Wahlpflicht)
    wb4/ … 8.1–8.3 + fallaufgaben.md + fachgespraech.md    ← Außenhandel (Wahlpflicht)
  technischer-fachwirt/            ← sechster Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    wq1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md    ← Volks- und Betriebswirtschaft
    wq2/ … 2.1–2.3 + fallaufgaben.md + fachgespraech.md    ← Rechnungswesen
    wq3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Recht und Steuern
    wq4/ … 4.1–4.3 + fallaufgaben.md + fachgespraech.md    ← Unternehmensführung
    tq1/ … 5.1–5.3 + fallaufgaben.md + fachgespraech.md    ← Naturwissenschaftliche und technische Grundlagen
    tq2/ … 6.1–6.3 + fallaufgaben.md + fachgespraech.md    ← Technische Kommunikation und Werkstofftechnologie
    tq3/ … 7.1–7.4 + fallaufgaben.md + fachgespraech.md    ← Fertigungs- und Betriebstechnik
    hq1/ … 8.1–8.3 + fallaufgaben.md + fachgespraech.md    ← Absatz-, Materialwirtschaft und Logistik
    hq2/ … 9.1–9.3 + fallaufgaben.md + fachgespraech.md    ← Produktionsplanung, -steuerung und -kontrolle
    hq3/ … 10.1–10.3 + fallaufgaben.md + fachgespraech.md  ← Qualitäts- und Umweltmanagement sowie Arbeitsschutz
    hq4/ … 11.1–11.3 + fallaufgaben.md + fachgespraech.md  ← Führung und Zusammenarbeit (Pflichtthema des Fachgesprächs)
  industriefachwirt/               ← siebter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    wq1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md    ← Volks- und Betriebswirtschaft
    wq2/ … 2.1–2.3 + fallaufgaben.md + fachgespraech.md    ← Rechnungswesen
    wq3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Recht und Steuern
    wq4/ … 4.1–4.3 + fallaufgaben.md + fachgespraech.md    ← Unternehmensführung
    hq1/ … 5.1–5.3 + fallaufgaben.md + fachgespraech.md    ← Finanzwirtschaft im Industrieunternehmen
    hq2/ … 6.1–6.4 + fallaufgaben.md + fachgespraech.md    ← Produktionsprozesse
    hq3/ … 7.1–7.4 + fallaufgaben.md + fachgespraech.md    ← Marketing und Vertrieb
    hq4/ … 8.1–8.3 + fallaufgaben.md + fachgespraech.md    ← Wissens- und Transfermanagement im Industrieunternehmen
    hq5/ … 9.1–9.3 + fallaufgaben.md + fachgespraech.md    ← Führung und Zusammenarbeit
  immobilienfachwirt/              ← achter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    hb1/ … 1.1–1.4 + fallaufgaben.md + fachgespraech.md    ← Rahmenbedingungen der Immobilienwirtschaft
    hb2/ … 2.1–2.4 + fallaufgaben.md + fachgespraech.md    ← Unternehmenssteuerung und Kontrolle
    hb3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Personal, Arbeitsorganisation und Qualifizierung
    hb4/ … 4.1–4.4 + fallaufgaben.md + fachgespraech.md    ← Immobilienbewirtschaftung
    hb5/ … 5.1–5.4 + fallaufgaben.md + fachgespraech.md    ← Bauprojektmanagement
    hb6/ … 6.1–6.4 + fallaufgaben.md + fachgespraech.md    ← Marktorientierung und Vertrieb, Maklertätigkeit
  versicherungen-finanzanlagen/    ← neunter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    kb1/ … 1.1–1.5 + fallaufgaben.md + fachgespraech.md    ← Lösungen im Kundenbedarfsfeld Vorsorge (Wahlbereich)
    kb2/ … 2.1–2.5 + fallaufgaben.md + fachgespraech.md    ← Lösungen für Gewerbekunden im Kundenbedarfsfeld Sach- und Vermögensschutz (Wahlbereich)
    kp1/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Kernprozesse gestalten
    kp2/ … 4.1–4.4 + fallaufgaben.md + fachgespraech.md    ← Steuerung, Zusammenarbeit und Leadership
  transport-management-logistics/  ← zehnter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    hb1/ … 1.1–1.5 + fallaufgaben.md + fachgespraech.md    ← Entwickeln und Vermarkten von Güterverkehrs- und Logistikdienstleistungen
    hb2/ … 2.1–2.6 + fallaufgaben.md + fachgespraech.md    ← Erstellen von Güterverkehrs- und Logistikdienstleistungen
    hb3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Kommunikation, Führung und Zusammenarbeit sicherstellen
  ausbildung-der-ausbilder/        ← elfter Kurs, ergänzt 29.09.2026 (siehe Anforderungskatalog Abschnitt 4)
    hf1/ … 1.1–1.3 + fallaufgaben.md + fachgespraech.md    ← Ausbildungsvoraussetzungen prüfen und Ausbildung planen
    hf2/ … 2.1–2.3 + fallaufgaben.md + fachgespraech.md    ← Ausbildung vorbereiten und bei der Einstellung von Auszubildenden mitwirken
    hf3/ … 3.1–3.4 + fallaufgaben.md + fachgespraech.md    ← Ausbildung durchführen
    hf4/ … 4.1–4.2 + fallaufgaben.md + fachgespraech.md    ← Ausbildung abschließen
  fachinformatiker-anwendungsentwicklung/  ← zwölfter Kurs, ergänzt 04.10.2026 (siehe Anforderungskatalog Abschnitt 4)
    fu1/ … 1.1–1.3 + fallaufgaben.md + fachgespraech.md    ← Projekt- und Auftragsabwicklung (fachrichtungsübergreifend)
    fu2/ … 2.1–2.4 + fallaufgaben.md                       ← IT-Systeme beurteilen und IT-Arbeitsplatz einrichten (Prüfungsteil 1)
    fu3/ … 3.1–3.4 + fallaufgaben.md                       ← Netzwerke und IT-Betrieb
    fu4/ … 4.1–4.4 + fallaufgaben.md                       ← Programmierung und Softwarelösungen
    fu5/ … 5.1–5.3 + fallaufgaben.md                       ← Datenbanken und Speicherlösungen
    fu6/ … 6.1–6.4 + fallaufgaben.md + fachgespraech.md    ← IT-Sicherheit, Datenschutz und Qualitätssicherung
    fu7/ … 7.1–7.5 + fallaufgaben.md                       ← Wirtschafts- und Sozialkunde
    ae1/ … 8.1–8.4 + fallaufgaben.md                       ← Konzipieren und Umsetzen von Softwareanwendungen
    ae2/ … 9.1–9.4 + fallaufgaben.md                       ← Sicherstellen der Qualität von Softwareanwendungen
    ae3/ … 10.1–10.3 + fallaufgaben.md                     ← Planen eines Softwareproduktes (Prüfungsbereich § 13)
    ae4/ … 11.1–11.4 + fallaufgaben.md                     ← Entwicklung und Umsetzung von Algorithmen (Prüfungsbereich § 14)
    ae5/ … 12.1–12.3 + fallaufgaben.md + fachgespraech.md  ← Planen und Umsetzen eines Softwareprojektes (Prüfungsbereich § 12)
  fachinformatiker-systemintegration/  ← dreizehnter Kurs, ergänzt 04.10.2026 (siehe Anforderungskatalog Abschnitt 4)
    fu1/ … fu7/                                            ← fachrichtungsübergreifend, Kopien aus fachinformatiker-anwendungsentwicklung (nur kurs_slug unterscheidet sich)
    si1/ … 8.1–8.4 + fallaufgaben.md                       ← Konzipieren und Realisieren von IT-Systemen
    si2/ … 9.1–9.4 + fallaufgaben.md                       ← Installieren und Konfigurieren von Netzwerken (Prüfungsbereich § 22)
    si3/ … 10.1–10.4 + fallaufgaben.md                     ← Administrieren von IT-Systemen (Prüfungsbereich § 21)
    si4/ … 11.1–11.3 + fallaufgaben.md                     ← Automatisierte Systemverwaltung und Speicherlösungen (Prüfungsbereich § 21)
    si5/ … 12.1–12.3 + fallaufgaben.md + fachgespraech.md  ← Planen und Umsetzen eines Projektes der Systemintegration (Prüfungsbereich § 20)
  fachinformatiker-daten-prozessanalyse/  ← vierzehnter Kurs, ergänzt 04.10.2026 (siehe Anforderungskatalog Abschnitt 4)
    fu1/ … fu7/                                            ← fachrichtungsübergreifend, Kopien aus fachinformatiker-anwendungsentwicklung (nur kurs_slug unterscheidet sich)
    dp1/ … 8.1–8.4 + fallaufgaben.md                       ← Analysieren von Arbeits- und Geschäftsprozessen (Prüfungsbereich § 29)
    dp2/ … 9.1–9.3 + fallaufgaben.md                       ← Datenquellen analysieren und Daten bereitstellen
    dp3/ … 10.1–10.4 + fallaufgaben.md                     ← Daten nutzen: Analyse, Statistik und Visualisierung
    dp4/ … 11.1–11.4 + fallaufgaben.md                     ← Datenqualität, Datenschutz und Datensicherheit (Prüfungsbereich § 30)
    dp5/ … 12.1–12.3 + fallaufgaben.md + fachgespraech.md  ← Planen und Durchführen eines Projektes der Datenanalyse (Prüfungsbereich § 28)
  fachinformatiker-digitale-vernetzung/  ← fünfzehnter Kurs, ergänzt 05.10.2026 (siehe Anforderungskatalog Abschnitt 4)
    fu1/ … fu7/                                            ← fachrichtungsübergreifend, Kopien aus fachinformatiker-anwendungsentwicklung (nur kurs_slug unterscheidet sich)
    dv1/ … 8.1–8.4 + fallaufgaben.md                       ← Analysieren und Planen von Systemen zur Vernetzung von Prozessen und Produkten
    dv2/ … 9.1–9.4 + fallaufgaben.md                       ← Errichten, Ändern und Prüfen von vernetzten Systemen
    dv3/ … 10.1–10.4 + fallaufgaben.md                     ← Betreiben vernetzter Systeme, Diagnose und Störungsbeseitigung (Prüfungsbereich § 37)
    dv4/ … 11.1–11.4 + fallaufgaben.md                     ← Betrieb und Erweiterung vernetzter Systeme (Prüfungsbereich § 38)
    dv5/ … 12.1–12.3 + fallaufgaben.md + fachgespraech.md  ← Planen und Umsetzen eines Projektes der digitalen Vernetzung (Prüfungsbereich § 36)
```

**Sonderfall `wirtschaftsfachwirt/`:** Die `wbqN`-/`hsqN`-Ordnernamen spiegeln die zweigeteilte amtliche Prüfungsstruktur dieses Kurses (Wirtschaftsbezogene Qualifikationen/Handlungsspezifische Qualifikationen, siehe Anforderungskatalog Abschnitt 4) — technisch sind beide Teile aber gleichrangige `Fachgebiet`-Zeilen desselben Kurses, keine eigene Modellebene.

**Sonderfall `handelsfachwirt/`:** Die `hbN`-/`wbN`-Ordnernamen spiegeln die Pflicht-/Wahlpflicht-Struktur dieses Kurses (vier verpflichtende Handlungsbereiche plus einer von vier zur Wahl stehenden Handlungsbereichen, §4 HdlFachwPrV, siehe Anforderungskatalog Abschnitt 4) — technisch sind alle acht gleichrangige `Fachgebiet`-Zeilen desselben Kurses, die Wahlpflicht-Eigenschaft ist nur im `fachgebiet_title` vermerkt.

**Sonderfall `technischer-fachwirt/`:** Die `wqN`-/`tqN`-/`hqN`-Ordnernamen spiegeln die dreiteilige amtliche Prüfungsstruktur dieses Kurses (Wirtschaftsbezogene/Technische/Handlungsspezifische Qualifikationen, §§4–6 TechFachwPrV, siehe Anforderungskatalog Abschnitt 4) — technisch sind alle elf Teile gleichrangige `Fachgebiet`-Zeilen desselben Kurses, keine eigene Modellebene. Anders als beim fünften Kurs sind hier alle elf Bereiche verpflichtend, kein Wahlpflicht-Element.

**Sonderfall `versicherungen-finanzanlagen/`:** Anders als bei den bisherigen acht Kursen keine klassische Fachwirt-Prüfung, sondern die neue Nachfolge-Qualifikation „Bachelor Professional in Versicherungen und Finanzanlagen" (BAProVFFPrV, in Kraft seit 01.01.2025, löst den bisherigen „Fachwirt für Versicherungen und Finanzen" ab — Nutzer-Entscheidung vom 29.09.2026, siehe Anforderungskatalog Abschnitt 4). Die `kbN`-Ordner spiegeln die zwei Wahlbereich-Optionen aus Prüfungsteil 1 „Kundenbedarfsfelder", die `kpN`-Ordner die zwei Pflicht-Handlungsbereiche aus Prüfungsteil 2 „Kernprozesse, Steuerung und Zusammenarbeit" — technisch alle vier gleichrangige `Fachgebiet`-Zeilen desselben Kurses. Kleinste Fachgebiets-Anzahl seit dem Piloten (4), dafür mit mehr Themen je Fachgebiet als sonst üblich.

**Sonderfall `industriefachwirt/`:** Die `wqN`-/`hqN`-Ordnernamen spiegeln die zweiteilige amtliche Prüfungsstruktur dieses Kurses (Wirtschaftsbezogene/Handlungsspezifische Qualifikationen, §§4–5 IndFachwirtPrV 2010, siehe Anforderungskatalog Abschnitt 4) — technisch sind alle neun Teile gleichrangige `Fachgebiet`-Zeilen desselben Kurses. Die vier `wqN`-Fachgebiete sind bereits das dritte Mal inhaltlich deckungsgleich mit einem Vorkurs-Fachgebiet (nach `wbqN` beim vierten und `wqN` beim sechsten Kurs) — eigenständig neu formuliert, nicht aus den Vorkurs-Dateien übernommen.

**Sonderfall `transport-management-logistics/`:** Wie beim neunten Kurs keine klassische Fachwirt-Prüfung, sondern die neue Nachfolge-Qualifikation „Bachelor Professional in Transport Management and Logistics" (GüLogFachwBAProFV, in Kraft seit 28.09.2023, löst den bisherigen „Fachwirt für Güterverkehr und Logistik" ab — hier aber, anders als beim neunten Kurs, keine erneute Nutzer-Rückfrage nötig, da die Migration laut DIHK-Statistik 2025 bereits weit fortgeschritten ist [436 von 442 Teilnehmer:innen unter neuem Titel], siehe Anforderungskatalog Abschnitt 4 sowie Architekturplanung Abschnitt 13). Die `hbN`-Ordner spiegeln die drei gleichrangigen Handlungsbereiche einer einteiligen, integrierten Prüfung (kein WQ/HQ- oder Pflicht/Wahlpflicht-Split) — kleinste Fachgebiets-Anzahl bisher (3, kleiner als der Büro-Fachwirt-Pilot mit 4), dafür mit mehr Themen je Fachgebiet als sonst üblich.

**Sonderfall `ausbildung-der-ausbilder/`:** Anders als alle zehn Vorkurse **keine Aufstiegsfortbildung**, sondern die berufspädagogische Eignungsprüfung nach der Ausbilder-Eignungsverordnung (AEVO, in Kraft seit 21.01.2009, live gegen gesetze-im-internet.de/ausbeignv_2009/ verifiziert) — daher auch mit neuem, eigenständigem `kurs.type`-Wert `eignungspruefung` statt der bisherigen Wiederverwendung von `fachwirt` (siehe Architekturplanung Abschnitt 13). Die `hfN`-Ordner spiegeln die vier gleichrangigen Handlungsfelder nach §§ 2/3 AEVO — kein WQ/HQ- oder Pflicht/Wahlpflicht-Split. Deutlich kompaktere Prüfung als jeder Fachwirt-Kurs (schriftlicher Teil nur 3 Std., praktischer Teil max. 30 Min.), daher als einziger Kurs bisher mit bewusst REDUZIERTER statt erhöhter Karteikarten-/Quiz-Dichte je Thema (siehe Umfangs-Absatz unten).

**Sonderfall `fachinformatiker-anwendungsentwicklung/` (und die Folgekurse `fachinformatiker-*`):** Ausbildungsberuf mit gestreckter Abschlussprüfung nach FIAusbV 2020 (weder Fortbildung noch Eignungsprüfung) — daher neuer `kurs.type`-Wert `ausbildungsberuf`. Es gibt vier Fachinformatiker-Kurse (je Fachrichtung einer: Anwendungsentwicklung, Systemintegration, Daten- und Prozessanalyse, Digitale Vernetzung). Die `fuN`-Ordner (`fu1`–`fu7`, „fachrichtungsübergreifend": Rahmenplan Abschnitt A/F, Prüfungsteil 1, Wirtschafts- und Sozialkunde) sind fachrichtungsneutral formuliert und in jedem der vier Kurse **identisch (kopiert, nur `kurs_slug` im Frontmatter unterscheidet sich)** — wer eine dieser Dateien korrigiert, muss die Korrektur in allen `content/fachinformatiker-*/fu*`-Ordnern nachziehen (Grep über alle vier). Die fachrichtungsspezifischen Ordner (`aeN` für Anwendungsentwicklung, `siN` für Systemintegration, `dpN` für Daten- und Prozessanalyse, `dvN` für Digitale Vernetzung — damit sind alle vier Fachrichtungen umgesetzt) setzen die Themen-Nummerierung ab 8 fort, damit `thema_code` kursweit eindeutig bleibt. Beim Kopieren der `fu*`-Ordner in einen neuen Fachinformatiker-Kurs nur die Zeile `kurs_slug:` ersetzen und danach prüfen, dass der Alt-Slug nirgends mehr vorkommt und der Rest byte-identisch bleibt. Fallaufgaben dieser Kurse enthalten teils mehrzeiligen Code, SQL und Klartext-Tabellen in der Ausgangssituation (in der Prüfungssimulation als Festbreitenschrift dargestellt: ```-Codeblöcke sowie Absätze aus mehreren „a | b | c"-Zeilen); Felder in Karteikarten/Quiz bleiben einzeilig, Code dort nur als Inline-Code in Backticks. **Dateien müssen mit LF-Zeilenenden gespeichert sein** — der Frontmatter-Parser erkennt CRLF nicht.

Ein Ordner je Kurs, benannt nach dem `kurs_slug` (`fachwirt-buero-projektorganisation/`, `mathematik-9/`), darin ein Ordner je Fachgebiet (`hb3/`, bzw. bei Mathematik `algebra-funktionen/`, `geometrie/`, `stochastik/`), darin eine Datei je Thema. Das spiegelt die Hierarchie Kurs → Fachgebiet → Thema aus dem Datenmodell. Der Ordnername ist bewusst so spezifisch wie der `kurs_slug` gewählt (nicht nur `fachwirt/`), da laut Anforderungskatalog Abschnitt 9 künftig weitere, andersartige Fachwirt-Qualifikationen als eigene Kurse hinzukommen können — ein generisches `fachwirt/` würde dann kollidieren. Bei Mathematik gibt es keine offiziellen Fachgebiets-/Themen-Nummern wie die Handlungsbereiche beim Fachwirt; die Codes (`ALG1`–`ALG3`, `GEO1`–`GEO3`, `STO1`) sind eine eigene, sprechende Benennung.

**Sonderfall `instrumenten-lernpfade/` (ergänzt 24.09.2026):** Kein Kurs-Ordner im obigen Sinn, sondern Referenz-/Entwurfs-Content für das in Anforderungskatalog F-129/F-130/F-131 beschriebene, noch nicht implementierte Konzept des Instrumenten-Lernpfads — folgt bewusst nicht diesem Zwischenformat und wird vom Bulk-Import nicht gelesen, siehe eigenes README dort.

**Zum Umfang des Fachwirt-Kurses (Stand 15.09.2026):** Alle vier Handlungsbereiche der IHK-Prüfungsstruktur (HB1–HB4, siehe Anforderungskatalog Abschnitt 2/4) sind inzwischen vollständig ausgearbeitet: HB3 zuerst (Pflichtbestandteil der mündlichen Prüfung), anschließend auf ausdrücklichen Wunsch HB1, HB2 und HB4 in einem Zug statt gestaffelt nach KPI-Signal — analog zur bereits zuvor beim Mathematik-Kurs getroffenen Entscheidung, den vollständigen Content unabhängig vom technischen Rollout-Gate vorab zu erstellen (siehe Anforderungskatalog Abschnitt 9/10). Die Themenlisten für HB1, HB2 und HB4 wurden dabei — wie zuvor bei HB3 — anhand des offiziellen DIHK-Rahmenplans verifiziert, nicht mehr nur als vorläufiger Vorschlag übernommen.

**Zum Umfang des dritten Kurses „Fachwirt für Gesundheits- und Sozialwesen" (Stand 29.09.2026):** Alle sechs amtlichen Handlungsbereiche (HB1–HB6, extern recherchiert und gegen die IHK-Prüfungsstruktur abgeglichen — anders als beim Büro-Fachwirt sechs statt vier Handlungsbereiche, siehe Anforderungskatalog Abschnitt 4) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden, statt gestaffelt nach KPI-Signal: 24 Themen, 916 Content-Items nach Import. Anders als bei den ersten beiden Kursen direkt mit `is_published = true` importiert (siehe Anforderungskatalog Abschnitt 9 zur bewussten Ausnahme vom Validierungs-Gate). Gemeinsames Modellunternehmen über alle Handlungsbereiche: der ambulante Pflegedienst „Morgenlicht" (bereits als Referenz-Content für den Instrumenten-Lernpfad vorhanden, siehe oben).

**Zum Umfang des vierten Kurses „Wirtschaftsfachwirt" (Stand 29.09.2026):** Größter Fachwirt-Abschluss nach Teilnehmerzahl im gesamten IHK-System (DIHK-Statistik 2024). Alle neun amtlichen Fachgebiete (4 Wirtschaftsbezogene Qualifikationen + 5 Handlungsspezifische Qualifikationen, extern recherchiert anhand der frei einsehbaren Rechtsverordnung, siehe Anforderungskatalog Abschnitt 4) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 33 Themen, ca. 1.247 Content-Items nach Import — größter Einzelkurs bisher. Direkt mit `is_published = true` importiert wie der dritte Kurs. Gemeinsames Modellunternehmen über alle neun Fachgebiete: der fiktive Großhändler „NordWert Handels GmbH" (bewusst generalistisch statt branchenspezifisch gewählt, im Unterschied zu „Morgenlicht" beim dritten Kurs).

**Zum Umfang des fünften Kurses „Handelsfachwirt" (Stand 29.09.2026):** Größte noch nicht umgesetzte Fachwirt-Qualifikation nach Teilnehmerzahl (DIHK-Fortbildungsstatistik, Berichtsjahr 2025 — aktueller als die beim vierten Kurs genutzte 2024er-Ausgabe). Alle acht amtlichen Fachgebiete (4 Pflicht-Handlungsbereiche HB1–HB4 + 4 Wahlpflicht-Handlungsbereiche WB1–WB4, extern recherchiert anhand der frei einsehbaren Rechtsverordnung HdlFachwPrV, siehe Anforderungskatalog Abschnitt 4) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 28 Themen, 979 Content-Items nach Import. Direkt mit `is_published = true` importiert wie die beiden Vorkurse. Gemeinsames Modellunternehmen über alle acht Fachgebiete: die fiktive Einzelhandelskette „Loreno Mode & Wohnen GmbH" (Mode und Wohnaccessoires, ca. 40 Filialen, Online-Shop, Importe aus Asien/Europa).

**Zum Umfang des sechsten Kurses „Technischer Fachwirt" (Stand 29.09.2026):** Drittgrößte noch nicht umgesetzte Fachwirt-Qualifikation nach Teilnehmerzahl (DIHK-Fortbildungsstatistik, Berichtsjahr 2025). Alle elf amtlichen Fachgebiete (4 Wirtschaftsbezogene + 3 Technische + 4 Handlungsspezifische Qualifikationen, extern recherchiert anhand der frei einsehbaren Rechtsverordnung TechFachwPrV, siehe Anforderungskatalog Abschnitt 4) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 36 Themen, 1.457 Content-Items nach Import — größter Einzelkurs bisher. Direkt mit `is_published = true` importiert wie die beiden Vorkurse. Gemeinsames Modellunternehmen über alle elf Fachgebiete: der fiktive Maschinenbauer „Vantera Präzisionstechnik GmbH" (Präzisionsbauteile für Automobilzulieferer/Maschinenbau, ~350 Beschäftigte, mehrere Fertigungshallen, EU-Export).

**Zum Umfang des siebten Kurses „Industriefachwirt" (Stand 29.09.2026):** Viertgrößte noch nicht umgesetzte Fachwirt-Qualifikation nach Teilnehmerzahl (DIHK-Fortbildungsstatistik, Berichtsjahr 2025). Alle neun amtlichen Fachgebiete (4 Wirtschaftsbezogene + 5 Handlungsspezifische Qualifikationen, extern recherchiert anhand der frei einsehbaren Rechtsverordnung IndFachwirtPrV 2010, siehe Anforderungskatalog Abschnitt 4) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 31 Themen, 1.185 Content-Items nach Import. Direkt mit `is_published = true` importiert wie die drei Vorkurse. Gemeinsames Modellunternehmen über alle neun Fachgebiete: der fiktive Elektrotechnik-Hersteller „Solvitec Elektrowerke GmbH" (Komponenten für industrielle Automatisierung, ~500 Beschäftigte, mehrere Werke, weltweiter Export).

**Zum Umfang des achten Kurses „Immobilienfachwirt" (Stand 29.09.2026):** Fünftgrößte noch nicht umgesetzte Fachwirt-Qualifikation nach Teilnehmerzahl (DIHK-Fortbildungsstatistik, Berichtsjahr 2025). Alle sechs amtlichen Handlungsbereiche (HB1–HB6, extern recherchiert anhand der frei einsehbaren Rechtsverordnung ImmoFachwPrV, siehe Anforderungskatalog Abschnitt 4 — erstmals seit dem dritten Kurs wieder ohne WQ/HQ-Aufteilung) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 24 Themen, 907 Content-Items nach Import. Direkt mit `is_published = true` importiert wie die vier Vorkurse. Gemeinsames Modellunternehmen über alle sechs Fachgebiete: das fiktive Immobilienunternehmen „Ravelin Immobilien GmbH" (Hausverwaltung mit ca. 3.000 verwalteten Einheiten, Maklerabteilung, Bauträgersparte).

**Zum Umfang des neunten Kurses „Versicherungen und Finanzanlagen" (Stand 29.09.2026):** Nachfolge-Qualifikation des auslaufenden „Fachwirt für Versicherungen und Finanzen" (siehe Anforderungskatalog Abschnitt 4). Alle vier amtlichen Fachgebiete (zwei Wahlbereich-Optionen aus Prüfungsteil 1 „Kundenbedarfsfelder", zwei Pflichtbereiche aus Prüfungsteil 2 „Kernprozesse, Steuerung und Zusammenarbeit", extern recherchiert anhand der frei einsehbaren Rechtsverordnung BAProVFFPrV) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 18 Themen, 714 Content-Items nach Import. Direkt mit `is_published = true` importiert wie die acht Vorkurse. Gemeinsames Modellunternehmen über alle vier Fachgebiete: die fiktive „Nordantis Versicherung AG" (Sach-/Kranken-/Lebensversicherung, Privat- und Gewerbekunden, mehrere Regionaldirektionen).

**Zum Umfang des zehnten Kurses „Transport Management and Logistics" (Stand 29.09.2026):** Nachfolge-Qualifikation des größtenteils bereits migrierten „Fachwirt für Güterverkehr und Logistik" (siehe Anforderungskatalog Abschnitt 4) — anders als beim neunten Kurs ohne erneute Nutzer-Rückfrage direkt umgesetzt, da die DIHK-Statistik 2025 die Migration bereits deutlich fortgeschritten zeigt. Alle drei amtlichen Handlungsbereiche (integrierte, einteilige Prüfung, extern recherchiert anhand der frei einsehbaren Rechtsverordnung GüLogFachwBAProFV) sind auf ausdrücklichen Nutzerwunsch direkt vollständig ausgearbeitet worden: 15 Themen, 578 Content-Items nach Import — kleinster Einzelkurs bisher, passend zur kompaktesten Prüfungsstruktur (drei statt vier oder mehr Fachgebiete). Direkt mit `is_published = true` importiert wie die neun Vorkurse. Gemeinsames Modellunternehmen über alle drei Fachgebiete: die fiktive Spedition „Fracora Spedition & Logistik GmbH" (eigener Fuhrpark, Kontraktlogistik/Lagerdienstleistungen für Industriekunden, europaweit tätig mit Partneranbindung für Seefracht, mehrere Standorte).

**Zum Umfang des elften Kurses „Ausbildung der Ausbilder" (Stand 29.09.2026):** Auf direkte Nutzer-Namensvorgabe umgesetzt, kein Statistik-Ranking-Kandidat (siehe Anforderungskatalog Abschnitt 4). Alle vier amtlichen Handlungsfelder (extern recherchiert anhand der frei einsehbaren Ausbilder-Eignungsverordnung AEVO, §§ 2–4) sind vollständig ausgearbeitet worden: 12 Themen, 360 Content-Items nach Import — kleinster Einzelkurs bisher. Anders als bei allen zehn Vorkursen wurde die Karteikarten-/Quiz-Dichte je Thema bewusst REDUZIERT (12–15/8–10 statt der sonst üblichen 15–20/10–15), passend zur deutlich kompakteren AEVO-Prüfung (3 Std. schriftlich statt 5–10 Std. bei den Fachwirt-Kursen). Direkt mit `is_published = true` importiert wie die zehn Vorkurse. Gemeinsames Modellunternehmen über alle vier Fachgebiete: die fiktive „Kelvinar Elektrotechnik GmbH" (ca. 180 Beschäftigte, bildet gleichzeitig in drei Berufen aus — Elektroniker/in für Betriebstechnik, Industriekaufmann/-frau, Fachinformatiker/in Systemintegration).

**Zum Umfang des zwölften Kurses „Fachinformatiker/in Anwendungsentwicklung" (Stand 04.10.2026):** Erster von vier Fachinformatiker-Kursen, auf Nutzer-Vorgabe mit **vollem Ausbildungsrahmenplan** (nicht nur prüfungsorientiert) umgesetzt. Alle Handlungs- und Prüfungsbereiche der Fachrichtung (extern recherchiert anhand der frei einsehbaren FIAusbV, Teil 1 der Abschlussprüfung, Teil 2 Anwendungsentwicklung, Ausbildungsrahmenplan Abschnitte A, B, F) sind vollständig ausgearbeitet worden: 12 Fachgebiete (7 fachrichtungsübergreifende `FU1`–`FU7` + 5 `AE1`–`AE5`), 45 Themen, **1.606 Content-Items** nach Import — größter Einzelkurs bisher (870 Karteikarten, 598 Quiz-Fragen, 45 Theorie-Abschnitte, 36 Fallaufgaben, 57 Fachgesprächsfragen). Direkt mit `is_published = true` importiert wie die elf Vorkurse. Gemeinsames Modellunternehmen über alle zwölf Fachgebiete (und die drei Folgekurse): die fiktive „Brevanta IT-Systemhaus GmbH" (ca. 220 Beschäftigte; Softwareentwicklung für Kunden, Systemintegration/Managed Services, Datenanalyse, Smart-Factory-/IoT-Vernetzung).

**Zum Umfang des dreizehnten Kurses „Fachinformatiker/in Systemintegration" (Stand 04.10.2026):** Zweiter von vier Fachinformatiker-Kursen. Die sieben fachrichtungsübergreifenden Fachgebiete `FU1`–`FU7` sind Kopien aus dem zwölften Kurs (964 Items); neu sind die fünf Systemintegrations-Fachgebiete `SI1`–`SI5` (extern recherchiert anhand der frei einsehbaren FIAusbV, Teil 2 Systemintegration §§ 18–25, Ausbildungsrahmenplan Abschnitt C): 18 neue Themen, 648 neue Content-Items. Gesamt 12 Fachgebiete, 45 Themen, **1.612 Content-Items** nach Import (869 Karteikarten, 604 Quiz-Fragen, 45 Theorie-Abschnitte, 36 Fallaufgaben, 58 Fachgesprächsfragen) — größter Einzelkurs bisher. Direkt mit `is_published = true` importiert wie die zwölf Vorkurse. Modellunternehmen unverändert „Brevanta IT-Systemhaus GmbH", hier mit Schwerpunkt Systemintegration/Managed Services. **Hinweis zum Import:** `db:import-content` löscht und erzeugt Content-Versionen neu und scheitert, sobald in der Datenbank Prüfungsantworten (`exam_answer`, `ON DELETE RESTRICT`) existieren — nur gegen Entwicklungsdatenbanken ohne abgegebene Prüfungsantworten verwenden.

**Zum Umfang des vierzehnten Kurses „Fachinformatiker/in Daten- und Prozessanalyse" (Stand 04.10.2026):** Dritter von vier Fachinformatiker-Kursen. Die sieben fachrichtungsübergreifenden Fachgebiete `FU1`–`FU7` sind Kopien aus dem zwölften Kurs (964 Items); neu sind die fünf Fachgebiete `DP1`–`DP5` (extern recherchiert anhand der frei einsehbaren FIAusbV, Teil 2 Daten- und Prozessanalyse §§ 26–33, Ausbildungsrahmenplan Abschnitt D): 18 neue Themen, 659 neue Content-Items. Gesamt 12 Fachgebiete, 45 Themen, **1.623 Content-Items** nach Import (877 Karteikarten, 607 Quiz-Fragen, 45 Theorie-Abschnitte, 36 Fallaufgaben, 58 Fachgesprächsfragen) — größter Einzelkurs bisher. Direkt mit `is_published = true` importiert wie die dreizehn Vorkurse. Modellunternehmen unverändert „Brevanta IT-Systemhaus GmbH", hier mit Schwerpunkt Datenanalyse.

**Zum Umfang des fünfzehnten Kurses „Fachinformatiker/in Digitale Vernetzung" (Stand 05.10.2026):** Vierter und letzter der Fachinformatiker-Kurse. Die sieben fachrichtungsübergreifenden Fachgebiete `FU1`–`FU7` sind Kopien aus dem zwölften Kurs (964 Items; bei einer Korrektur sind jetzt **vier** Kurse betroffen); neu sind die fünf Fachgebiete `DV1`–`DV5` (extern recherchiert anhand der frei einsehbaren FIAusbV, Teil 2 Digitale Vernetzung §§ 34–41, Ausbildungsrahmenplan Abschnitt E): 19 neue Themen, 677 neue Content-Items. Gesamt 12 Fachgebiete, 46 Themen, **1.641 Content-Items** nach Import (894 Karteikarten, 608 Quiz-Fragen, 46 Theorie-Abschnitte, 36 Fallaufgaben, 57 Fachgesprächsfragen) — größter Einzelkurs bisher. Direkt mit `is_published = true` importiert wie die vierzehn Vorkurse. Modellunternehmen unverändert „Brevanta IT-Systemhaus GmbH", hier mit Schwerpunkt Smart-Factory-/IoT-Vernetzung.

**Zum Umfang des Mathematik-Kurses (Stand 14.09.2026):** Der Anforderungskatalog (Abschnitt 9) sieht als Validierungs-Gate eigentlich vor, den Schulfach-Kurs zunächst mit nur einem vollständig ausgearbeiteten Fachgebiet/Themenblock zu starten. Auf ausdrücklichen Wunsch wurde hiervon abgewichen und der Content für alle drei Themenblöcke (Algebra & Funktionen, Geometrie, Stochastik) auf einmal erstellt — siehe Anforderungskatalog Abschnitt 9/10 für die entsprechende Entscheidungsnotiz. Das *technische* Validierungs-Gate (`kurs.is_published` bleibt zunächst `false`, gestaffelter Live-Gang je nach KPI-Signal) ist davon unberührt: Nur weil der Content vorab existiert, muss er nicht sofort für echte Nutzer:innen live geschaltet werden.

## Aufbau einer Thema-Datei

Jede Thema-Datei beginnt mit einem YAML-Frontmatter-Block für die Thema-Metadaten, gefolgt von drei Abschnitten: Theorie, Karteikarten, Quiz.

```markdown
---
kurs_slug: fachwirt-buero-projektorganisation
fachgebiet_code: HB3
fachgebiet_title: "Führen, Betreuen, Verwalten und Ausbilden im büro- und personalwirtschaftlichen Umfeld"
thema_code: "3.1"
thema_title: "Personalplanung, -beschaffung, -betreuung und -entwicklung"
quelle: "DIHK-Rahmenplan „Geprüfter Fachwirt für Büro- und Projektorganisation", Abschnitt 3.1 — frei formuliert, keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "14.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---
```

Bei Mathematik entfällt das Konzept „Handlungsbereich"; `fachgebiet_code` ist dort z. B. `ALG` (Algebra & Funktionen), `GEO` (Geometrie) oder `STO` (Stochastik), `thema_code` z. B. `ALG1`, `quelle` verweist auf die KMK-Bildungsstandards statt auf einen DIHK-Rahmenplan.

### Abschnitt „## Theorie"

Fließtext (Markdown-Prosa, `###`-Zwischenüberschriften erlaubt). Entspricht `content_item.type = "theorie"`, `payload.body_markdown`.

### Abschnitt „## Karteikarten"

Jede Karteikarte ein `####`-Block mit stabiler ID, Frage/Antwort und einer Metadatenzeile:

```markdown
#### K-3.1-01
**Frage:** ...
**Antwort:** ...
`tags: personalplanung, agg` · `schwierigkeit: leicht` · `bloom: erinnern`
```

→ `content_item.type = "karteikarte"`, `prompt` = Frage, `explanation` = Antwort, `difficulty` = Schwierigkeit, Tags → `tag`/`content_item_tag`.

**Bloom-Tag (`bloom: <stufe>`, entschieden 15.09.2026, ab HB1/HB2/HB4 verbindlich):** Zusätzlich zur `schwierigkeit` (subjektive Lernenden-Einschätzung: leicht/mittel/schwer) klassifiziert `bloom` die kognitive Anforderungsstufe nach der **Bloom'schen Taxonomie** (Anderson/Krathwohl-Revision), unabhängig von der DIHK-eigenen zweistufigen Anwendungstaxonomie (Verstehen/Anwenden, siehe Rahmenplan-Vorwort „Taxonomie der Lernziele" — die bestimmt weiterhin, welches Verb je Qualifikationsinhalt in der Theorie behandelt wird, ersetzt aber nicht das feinere Bloom-Raster auf Ebene der einzelnen Karteikarte/Frage). Zulässige Werte, aufsteigend:

- `erinnern` — Begriffe/Fakten wiedergeben (z. B. „Was ist …?", Definitionen)
- `verstehen` — Zusammenhänge in eigenen Worten erklären, einordnen
- `anwenden` — Gelerntes auf einen neuen, aber ähnlichen Fall übertragen
- `analysieren` — Sachverhalte in Bestandteile zerlegen, Ursache/Wirkung unterscheiden
- `bewerten` — Alternativen anhand von Kriterien gegeneinander abwägen, begründet urteilen
- `erschaffen` — aus Einzelteilen etwas Neues konzipieren (z. B. ein Konzept/einen Plan entwerfen)

Karteikarten liegen meist bei `erinnern`/`verstehen` (Wiederholung ist ihr Zweck); Quiz-Fragen und insbesondere Fallaufgaben-Teilaufgaben decken bewusst auch die höheren Stufen ab, damit nicht nur Faktenwissen, sondern auch Transferfähigkeit trainiert wird — passend zur Handlungsorientierung der IHK-Prüfung (vgl. Rahmenplan-Vorwort).

### Abschnitt „## Quiz"

Vier Fragetypen, je mit eigenem, eindeutig parsbarem Muster:

Alle vier Typen tragen seit HB1/HB2/HB4 zusätzlich das `bloom`-Tag (siehe oben) in derselben Metadatenzeile.

**Multiple Choice** (`type: quiz_mc`) — genau eine oder mehrere Optionen mit `[x]` markiert:
```markdown
#### Q-3.1-01 · Multiple Choice
**Frage:** ...
- [ ] Option A
- [x] Option B
- [ ] Option C
- [ ] Option D
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: verstehen`
```

**Zuordnung** (`type: zuordnung`) — Paare durch `↔` getrennt:
```markdown
#### Q-3.1-05 · Zuordnung
**Anweisung:** Ordne die Begriffe den passenden Beschreibungen zu.
- Begriff A ↔ Beschreibung A
- Begriff B ↔ Beschreibung B
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: verstehen`
```
→ jede Zeile wird beim Import zu zwei `answer_option`-Zeilen mit gemeinsamem `group_key` und `side = "links"`/`"rechts"`.

**Lückentext** (`type: luecken`) — Lücken als `___stichwort___`:
```markdown
#### Q-3.1-08 · Lückentext
**Text:** Die ___Personalbedarfsplanung___ ermittelt, wie viele Mitarbeitende mit welcher Qualifikation zu welchem Zeitpunkt benötigt werden.
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: erinnern`
```
→ `payload.blanks` mit dem markierten Begriff als `accepted`-Wert.

**Kurzantwort** (`type: kurzantwort`):
```markdown
#### Q-3.1-11 · Kurzantwort
**Frage:** ...
**Akzeptierte Antworten:** Begriff A; Begriff B
**Erklärung:** ...
`schwierigkeit: schwer` · `bloom: analysieren`
```

**Zehn weitere Fragetypen (F-113/F-114/F-115/F-116, Nutzer-Feedback vom 18.09.2026, im Bulk-Import-Parser ergänzt am 23.09.2026):** Bis 23.09.2026 waren diese zehn Typen ausschließlich über den Admin-Redaktionsbereich (Einzelanlage) authorierbar — ohne echten Content im Bulk-Import-Format blieben sie in den realen Kursen unsichtbar (siehe Anforderungskatalog Abschnitt 5.3). Alle zehn tragen wie oben das `schwierigkeit`/`bloom`-Metadatenzeilenformat.

**Wahr/Falsch** (`type: wahr_falsch`) — wie Multiple Choice, aber das Feldlabel heißt `**Aussage:**` statt `**Frage:**` (es wird eine Behauptung bewertet, keine Frage gestellt), und die beiden Optionen sind stets „Wahr"/„Falsch":
```markdown
#### Q-3.1-12 · Wahr/Falsch
**Aussage:** Ein Projekt ist eine dauerhaft wiederkehrende Routineaufgabe.
- [ ] Wahr
- [x] Falsch
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: verstehen`
```

**Entweder-Oder** (`type: entweder_oder`) — wie Multiple Choice, aber genau zwei Optionen:
```markdown
#### Q-3.1-13 · Entweder-Oder
**Frage:** ...
- [ ] Option A
- [x] Option B
**Erklärung:** ...
`schwierigkeit: mittel`
```

**Was passt nicht dazu** (`type: was_passt_nicht`) — wie Multiple Choice; die mit `[x]` markierte Option ist der eine nicht dazugehörige Begriff:
```markdown
#### Q-3.1-14 · Was passt nicht dazu
**Frage:** ...
- [ ] Begriff A
- [ ] Begriff B
- [x] Begriff C
- [ ] Begriff D
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: analysieren`
```

**Mehrfachauswahl** (`type: quiz_mc_multi`) — wie Multiple Choice, aber eine, zwei, drei oder alle Optionen können mit `[x]` markiert sein:
```markdown
#### Q-3.1-15 · Mehrfachauswahl
**Frage:** ...
- [x] Option A
- [x] Option B
- [ ] Option C
**Erklärung:** ...
`schwierigkeit: schwer`
```

**Sortieren** (`type: sortieren`) — genau vier Elemente als nummerierte Liste; die Eingabereihenfolge IST die richtige Reihenfolge:
```markdown
#### Q-3.1-16 · Sortieren
**Anweisung:** Bringe die folgenden Schritte in die richtige Reihenfolge.
1. Erster Schritt
2. Zweiter Schritt
3. Dritter Schritt
4. Vierter Schritt
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: anwenden`
```

**SWOT-Matrix / Balanced Scorecard / Ansoff-Matrix / Eisenhower-Matrix / PDCA-Zyklus / Risikomatrix** (`type: swot`/`bsc`/`ansoff`/`eisenhower`/`pdca`/`risiko`, die drei letzten seit F-105/ToDo-Punkt 6 vom 24.09.2026) — Begriffe werden per `→` einer der vier festen Zonen des jeweiligen Modells zugeordnet (Beschriftung, nicht der interne Schlüssel):
- SWOT: Stärken, Schwächen, Chancen, Risiken
- Balanced Scorecard: Finanzen, Kunden, Interne Prozesse, Lernen & Entwicklung
- Ansoff-Matrix: Marktdurchdringung, Marktentwicklung, Produktentwicklung, Diversifikation
- Eisenhower-Matrix: Sofort erledigen, Terminieren, Delegieren, Streichen
- PDCA-Zyklus: Plan, Do, Check, Act
- Risikomatrix: Vermeiden, Absichern, Beobachten, Akzeptieren (vereinfacht auf 2×2 statt der üblichen 3×3, siehe Architekturplanung Abschnitt 13)
- **IT-Instrumente (F-156, Fachinformatiker-Kurse)** — die Beschriftung in der Überschrift ist zugleich die Modellart, die Zonen heißen exakt wie unten:
  - `osi` (**OSI-Modell**, 7 Zonen): Anwendung, Darstellung, Sitzung, Transport, Vermittlung, Sicherung, Bitübertragung
  - `schutzziele` (**Schutzziele der IT-Sicherheit**): Vertraulichkeit, Integrität, Verfügbarkeit, Authentizität
  - `sql` (**SQL-Befehlsgruppen**): DDL, DML, DQL, DCL, TCL
  - `scrum` (**Scrum**, 3 Zonen): Rollen, Events, Artefakte
  - `uml` (**UML-Diagramme**): Klassendiagramm, Use-Case-Diagramm, Sequenzdiagramm, Aktivitätsdiagramm
  - `teststufen` (**Teststufen**): Komponententest, Integrationstest, Systemtest, Abnahmetest
  - `ermodell` (**ER-Modell**, F-162): Entitätstyp, Attribut, Beziehung, Kardinalität
  - `normalisierung` (**Normalformen**, F-162, 3 Zonen): 1. Normalform, 2. Normalform, 3. Normalform
  - `ablauf` (**Ablaufstrukturen**, F-162, 3 Zonen): Sequenz, Verzweigung, Schleife
  - `muster` (**Entwurfs- und Architekturmuster**, F-176, 4 Zonen): Singleton, Fabrikmethode (Factory), Beobachter (Observer), MVC
  - `klassenbeziehungen` (**UML-Klassenbeziehungen**, F-176, 5 Zonen): Assoziation, Aggregation, Komposition, Vererbung (Generalisierung), Abhängigkeit
  - `testverfahren` (**Testverfahren**, F-176, 3 Zonen): Statische Verfahren, Dynamisch: Black-Box, Dynamisch: White-Box
  - `git` (**Git-Bereiche**, F-176, 4 Zonen): Arbeitsverzeichnis, Staging-Bereich (Index), Lokales Repository, Remote-Repository
  - `uml` hat seit F-176 eine fünfte Zone **Zustandsdiagramm**
  - `bpmn` (**BPMN-2.0-Bausteine**, F-178, 5 Zonen): Ereignis, Aktivität, Gateway, Fluss (Sequenz-/Nachrichtenfluss), Teilnehmer (Pool/Lane)
  - `analysewerkzeuge` (**Analysewerkzeuge der Prozessanalyse**, F-178, 6 Zonen): Schwachstellenanalyse, Engpassanalyse, Pareto-Analyse, Ursachenanalyse (Ishikawa/5-Why), Wertstromanalyse, Process Mining
  - `datenqualitaet` (**Datenqualitäts-Dimensionen**, F-178, 5 Zonen): Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität
  - `skalenniveaus` (**Skalenniveaus**, F-178, 4 Zonen): Nominal, Ordinal, Intervall, Verhältnis
  - `pyramide` (**Automatisierungspyramide**, F-179, 5 Zonen): Feldebene, Steuerungsebene, Prozessleitebene (SCADA/HMI), Betriebsleitebene (MES), Unternehmensebene (ERP)
  - `sensoraktor` (**Sensor, Steuerung, Aktor, Kommunikation**, F-179, 4 Zonen): Sensor, Steuerung/Verarbeitung, Aktor, Kommunikation/Gateway
  - `industrieprotokolle` (**Industrie- und IoT-Protokolle**, F-179, 4 Zonen): Feldbus/Industrial Ethernet, Modbus, OPC UA, MQTT
  - `zonenkonzept` (**Zonenkonzept IT/OT**, F-179, 4 Zonen): Büro-IT, DMZ (Übergang), Produktionsnetz (Leitebene), Zelle/Feldebene
  - `sicherungsarten` (**Sicherungsarten**, F-180, 3 Zonen): Vollsicherung, Inkrementelle Sicherung, Differentielle Sicherung
  - `raid` (**RAID-Level**, F-180, 5 Zonen): RAID 0, RAID 1, RAID 5, RAID 6, RAID 10
  - `netzsicherheit` (**Netzwerksicherheits-Bausteine**, F-180, 5 Zonen): Firewall, NAT, VPN, DMZ/Segmentierung, Zugangskontrolle am Netzrand (802.1X/Port-Security)
  - `verzeichnisdienst` (**Verzeichnisdienst und Berechtigungen**, F-180, 5 Zonen): Benutzerkonto, Gruppe, Organisationseinheit (OU), Gruppenrichtlinie (GPO), Berechtigung (ACL)
  - `switching` (**Switching, VLAN, Routing und Redundanz**, F-180, 4 Zonen): Switching (Layer 2), VLAN/Trunking, Routing (Layer 3), Redundanz (Spanning Tree)
  - `handlungsfelder` (**Handlungsfelder der AEVO**, F-181, 4 Zonen): HF 1: Voraussetzungen prüfen, Ausbildung planen · HF 2: Ausbildung vorbereiten, Einstellung · HF 3: Ausbildung durchführen · HF 4: Ausbildung abschließen
  - `vierstufen` (**Vier-Stufen-Methode**, F-181, 4 Zonen): Stufe 1: Vorbereiten, Vormachen und Erklären · Stufe 2: Nachmachen lassen · Stufe 3: Üben lassen · Stufe 4: Selbstständig durchführen lassen
  - `lernzielbereiche` (**Lernzielbereiche**, F-181, 3 Zonen): Kognitiv, Affektiv, Psychomotorisch
  - `beurteilungsfehler` (**Beurteilungsfehler**, F-181, 5 Zonen): Halo-Effekt, Tendenz zur Mitte, Milde- und Strengefehler, Sympathie und Antipathie, Recency-Effekt
  - `regelwerke` (**Regelwerke der Berufsausbildung**, F-181, 4 Zonen): Berufsbildungsgesetz (BBiG), Jugendarbeitsschutzgesetz (JArbSchG), Ausbildungsordnung und Ausbildungsrahmenplan, Rahmenlehrplan der Berufsschule
  - `donabedian` (**Qualitätsdimensionen nach Donabedian**, F-182, 3 Zonen): Strukturqualität, Prozessqualität, Ergebnisqualität
  - `kostentraeger` (**Kostenträger im Gesundheits- und Sozialwesen**, F-182, 4 Zonen): Gesetzliche Krankenversicherung (SGB V), Soziale Pflegeversicherung (SGB XI), Sozialhilfe (SGB XII), Private Krankenversicherung
  - `projektphasen` (**Projektphasen**, F-183, 6 Zonen): Projektauftrag analysieren, Projektstart vorbereiten, Projektablauf steuern, Projektkontrolle durchführen, Projektdokumentation erstellen, Projektevaluation durchführen
  - `stakeholder` (**Stakeholder-Matrix**, F-183, 4 Zonen): Eng einbinden, Zufriedenstellen, Informieren, Beobachten
  - `abc` (**ABC-Analyse**, F-183, 3 Zonen): A-Klasse, B-Klasse, C-Klasse
  - `pps` (**PPS-Aufgaben**, F-184, 4 Zonen): Produktionsprogrammplanung, Mengenplanung, Termin- und Kapazitätsplanung, Produktionssteuerung
  - `beschaffung` (**Beschaffungsstrategien**, F-184, 4 Zonen): Vorratsbeschaffung, Einzelbeschaffung, Just-in-Time (JIT), Just-in-Sequence (JIS)
  - `seci` (**SECI-Modell der Wissensumwandlung**, F-184, 4 Zonen): Sozialisation, Externalisierung, Kombination, Internalisierung
  - `ishikawa` (**Ishikawa-Diagramm (Ursachenkategorien)**, F-184, 6 Zonen): Mensch, Maschine, Material, Methode, Mitwelt, Management
  - `kalkulation` (**Zuschlagskalkulation**, F-184, 5 Zonen): Materialkosten, Fertigungskosten, Herstellkosten, Selbstkosten, Angebotspreis
  - `incoterms` (**Incoterms**, F-184, 4 Zonen): EXW (Ab Werk), FOB (Frei an Bord), CIF (Kosten, Versicherung, Fracht), DDP (Geliefert verzollt)
  Neue Modelle mit festen Zonen braucht keinen Parser-Code mehr: Es genügt ein Eintrag in `QUADRANT_MODELS` (`packages/shared/src/quiz-logic.ts`) — Modellbeschriftung und Zonen-Beschriftungen aus dem Eintrag gelten dann direkt im Content-Zwischenformat.
```markdown
#### Q-2.2-01 · SWOT-Matrix
**Anweisung:** Ordne die Begriffe den passenden Feldern der SWOT-Matrix zu.
- Erfahrenes Team → Stärken
- Hohe Fluktuation → Schwächen
- Neuer Markt → Chancen
- Neuer Wettbewerber → Risiken
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: analysieren`
```
Eine unbekannte Zonen-Beschriftung lässt den Import mit einer Fehlermeldung abbrechen, statt eine ungültige Zuordnung stillschweigend zu erzeugen (Tippfehler-Schutz).

**Gantt-Diagramm** (`type: gantt`) — wie die drei Modelle oben, aber die Zeitabschnitte sind nicht fest vorgegeben, sondern selbst content-autoriert (eigene, semikolon-getrennte `**Zeitabschnitte:**`-Zeile):
```markdown
#### Q-1.3-01 · Gantt-Diagramm
**Anweisung:** Ordne die Arbeitspakete den passenden Zeitabschnitten zu.
**Zeitabschnitte:** Planung; Entwicklung; Testphase; Markteinführung
- Anforderungsanalyse → Planung
- Prototyp erstellen → Entwicklung
- Fehlerbehebung → Testphase
- Rollout → Markteinführung
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: anwenden`
```
Ein Begriff, dessen Zeitabschnitt nicht in der `**Zeitabschnitte:**`-Zeile vorkommt, lässt den Import ebenfalls mit einer Fehlermeldung abbrechen.

**Hierarchie** (`type: hierarchie`, seit F-105/ToDo-Punkt 6 vom 24.09.2026, Nutzer-Entscheidung "echte Baum-/Hierarchie-Darstellung" statt einer vereinfachten flachen Ebenen-Zuordnung, siehe Architekturplanung Abschnitt 13) — Projektstrukturplan/Organigramm: eine feste `**Wurzel:**`-Zeile, danach beliebig viele `- Ebene (unter: ÜbergeordneteEbene)`-Zeilen (bilden einen echten, beliebig tiefen Baum — `unter: Wurzel` heißt "direkt unter der Wurzel", ansonsten muss die übergeordnete Ebene WEITER OBEN im selben Block bereits als eigene Zeile stehen), zuletzt die Begriffe wie bei den übrigen Zonen-Typen per `→`:
```markdown
#### Q-1.3-19 · Hierarchie
**Anweisung:** Ordne die Arbeitspakete in den passenden Projektstrukturplan ein.
**Wurzel:** Projektleitung
- Teilprojekt Konzeption (unter: Wurzel)
- Teilprojekt Umsetzung (unter: Wurzel)
- Arbeitspaket Anforderungsanalyse (unter: Teilprojekt Konzeption)
- Anforderungen mit dem Auftraggeber abstimmen → Arbeitspaket Anforderungsanalyse
- Grobkonzept erstellen → Teilprojekt Konzeption
- Entwicklung/Umsetzung durchführen → Teilprojekt Umsetzung
**Erklärung:** ...
`schwierigkeit: schwer` · `bloom: anwenden`
```
Eine unbekannte übergeordnete Ebene oder ein Begriff mit unbekannter Ebene lassen den Import mit einer Fehlermeldung abbrechen (derselbe Tippfehler-Schutz wie bei den übrigen Zonen-Typen).

**Lückentext (Wortauswahl)** (`type: luecken_auswahl`) — dasselbe `___Stichwort___`-Format wie Lückentext, zusätzlich eine `**Zusätzliche Begriffe:**`-Zeile mit nicht benötigten Begriffen für den Wortpool (bewusst mehr Begriffe als Lücken, siehe Anforderungskatalog F-115):
```markdown
#### Q-1.1-01 · Lückentext (Wortauswahl)
**Text:** Ein ___Projekt___ ist ein zeitlich begrenztes Vorhaben.
**Zusätzliche Begriffe:** Routineaufgabe; Umsatz; Hierarchie
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: erinnern`
```

**Bekannte Einschränkung:** `db:export-content` (F-17, siehe unten) unterstützt bisher nur die ursprünglichen sechs Typen zurück ins Zwischenformat — Items dieser zehn neuen Typen werden beim Export mit einer Warnung übersprungen, statt fehlerhaft exportiert zu werden. Das betrifft nur das Backup-/Diff-Werkzeug, nicht den eigentlichen Bulk-Import (die hier beschriebene, maßgebliche Richtung `content/` → Datenbank).

## Fallaufgaben / Übungsaufgaben-Sammlungen (`fallaufgaben.md` bzw. `uebungsaufgaben.md`)

Mehrschrittige Aufgaben, die mehrere Themen desselben Fachgebiets kombinieren (`type: fallaufgabe`), je mit einer Ausgangssituation/Aufgabenstellung und mehreren Teilaufgaben (`payload.parts`). Der Dateiname unterscheidet sich je Kurstyp, das Format ist identisch:

- Beim Fachwirt-Piloten: `fallaufgaben.md`, mit betrieblicher Fallbeschreibung, wie es der schriftlichen IHK-Prüfung entspricht.
- Bei Mathematik (und künftigen Schulfach-Kursen): `uebungsaufgaben.md`, im Format klassenarbeitsähnlicher Mischaufgaben statt betrieblicher Situationen — inhaltlich passender für diesen Kurstyp, technisch aber derselbe `content_item.type = "fallaufgabe"`.

```markdown
#### F-HB3-01 · Fallaufgabe
**Ausgangssituation:** ...
**Teilaufgabe 1 (X Punkte, bloom: analysieren):** ...
**Teilaufgabe 2 (X Punkte, bloom: bewerten):** ...
**Musterlösungshinweise:** ...
```

Bei Fallaufgaben-Teilaufgaben steht das `bloom`-Tag direkt in der Klammer neben der Punktzahl (statt in einer separaten Metadatenzeile), da jede Teilaufgabe einzeln eingestuft wird — Fallaufgaben liegen als mehrschrittige Transferaufgaben meist bei `anwenden` bis `erschaffen`.

```markdown
#### U-ALG-01 · Übungsaufgabe
**Aufgabenstellung:** ...
**Teilaufgabe 1 (X Punkte):** ...
**Teilaufgabe 2 (X Punkte):** ...
**Lösungsweg:** ...
```

## Fachgesprächsfragen (`fachgespraech.md`)

Einfache Liste typischer mündlicher Prüfungsfragen (F-25), gruppiert nach Thema, ohne weitere Struktur — dient dem Fachgesprächs-Trainer als Fragen-Pool, nicht dem automatisierten Bulk-Import. Nur beim Fachwirt-Piloten relevant: Ein Fachgesprächs-Trainer passt laut Anforderungskatalog (Abschnitt 4, Architektur-Check) bei einem Schulfach-Kurs wie Mathematik in der Regel nicht, daher gibt es dort keine entsprechende Datei.

## Glossar (`glossar.md`, F-165)

Je Fachgebiet kann eine `glossar.md` Fachbegriffe mit Kurzdefinition liefern; der Import führt sie je Kurs zu einem Glossar zusammen (kein Thema, keine Content-Items). Aufbau:

```markdown
---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: FU1
fachgebiet_title: "Projekt- und Auftragsabwicklung"
thema_code: "FU1-glossar"
thema_title: "Glossar (Entwurf)"
---

## Glossar

#### Netzplan
**Auch:** Vorgangsknotennetz
**Thema:** 1.1
**Abschnitt:** Struktur, Reihenfolge und Termine planen
**Definition:** Darstellung der Vorgänge eines Projekts und ihrer Abhängigkeiten. …
**Geprüft:** nein
```

- `#### Begriff`: Schreibweise, wie sie üblicherweise im Text steht; **je Kurs nur einmal** (auch nicht als Alias eines anderen Begriffs).
- `**Auch:**` (optional): kommagetrennte Synonyme, Abkürzungen, Langformen und **unregelmäßige** Beugungen. Einfache Endungen (-e, -en, -er, -es, -n, -s) erkennt die Software selbst; Akronyme (≤ 6 Zeichen, Großbuchstaben) werden exakt, ohne Endung geprüft.
- `**Thema:**`: `thema_code` des Themas (z. B. `1.1`) im selben Fachgebiet, in dem der Begriff erklärt wird — Ziel von „Im Thema nachlesen".
- `**Abschnitt:**` (optional): wörtlich eine `###`-Überschrift der Theorie dieses Themas; das Lesefenster springt dorthin.
- `**Definition:**` (Pflicht): 1–3 Sätze, höchstens ca. 300 Zeichen, **ohne Markdown**, nur Aussagen, die in der Theorie stehen.
- `**Geprüft:**`: `ja` erst nach fachlicher Prüfung (Standard `nein`).

Vermeiden: mehrdeutige Allgemeinwörter („Test", „Prozess", „System"). Die Regeln prüft `apps/api/src/db/glossar-content.test.ts`.

## Redaktions-Werkzeuge (F-17)

Zwei kleine CLI-Werkzeuge in `apps/api/src/db/` nehmen das fehleranfällige manuelle Abtippen der oben beschriebenen Syntax ab:

- **`pnpm --filter @edukedo/api content:scaffold -- new-thema <kurs_slug> <fachgebiet_code> <thema_code> <ziel-datei>`** legt eine neue Thema-Datei mit korrektem Frontmatter (Titel/Quelle als `"TODO"`-Platzhalter zum direkten Ausfüllen) und leeren Theorie-/Karteikarten-/Quiz-Abschnitten an.
- **`pnpm --filter @edukedo/api content:scaffold -- add-item <datei> <typ>`** (`typ` ∈ `karteikarte`, `quiz_mc`, `zuordnung`, `luecken`, `kurzantwort`) hängt an eine bestehende Thema-Datei einen leeren Platzhalter-Block des gewählten Typs an — die nächste freie ID (`K-...`/`Q-...`) wird automatisch aus den bereits vorhandenen Blöcken der Datei ermittelt.
- **`pnpm --filter @edukedo/api db:export-content`** schreibt den aktuellen Datenbank-Content zurück ins Zwischenformat, nach `content-export/` im Repo-Root (gitignored). Gegenstück zu `db:import-content`, gedacht als Backup/Diff-Grundlage bzw. um ein neues Thema auf Basis eines bestehenden zu starten — **kein** Ersatz für die Dateien hier in `content/`: `content_item` speichert weder die ursprünglichen `K-`/`Q-`-IDs noch `quelle`/`rechtsstand`, ein Export erzeugt daher frisch nummerierte IDs und Platzhalter für diese beiden Felder.

## Rechtlicher Hinweis

Sämtliche Inhalte sind frei formuliert und aus öffentlich zugänglichem Fachwissen erstellt — keine 1:1-Übernahme von Prüfungsaufgaben, Musterlösungen oder Lehrbuchtexten (siehe Anforderungskatalog Abschnitt 7). Für den Fachwirt-Piloten orientiert sich die Gliederung am offiziellen DIHK-Rahmenplan; rechtliche Aussagen (Arbeits-/Ausbildungsrecht) sind bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden. Für den Mathematik-Kurs orientiert sich die Gliederung an den KMK-Bildungsstandards (Fassung 2022) und einem punktuellen Abgleich mit einem Landeslehrplan (Bayern, Klasse 9); der Themenkatalog gilt weiterhin als vorläufig und sollte vor Veröffentlichung mit konkretem Schulbuch-/Übungsmaterial für Klasse 9 gegengeprüft werden (siehe Anforderungskatalog Abschnitt 9/10). Für den dritten Kurs (Fachwirt für Gesundheits- und Sozialwesen) orientiert sich die Gliederung an frei zugänglichen Informationen zur amtlichen Prüfungsstruktur (IHK-Kammerseiten, DIHK-Fortbildungsstatistik), nicht am kostenpflichtigen DIHK-Rahmenplan; rechtliche Aussagen (insbesondere SGB V/SGB XI, Arbeitsrecht) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den vierten Kurs (Wirtschaftsfachwirt) orientiert sich die Gliederung an der frei einsehbaren Rechtsverordnung selbst (§§ 4/5 WFachwPrV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; rechtliche Aussagen (insbesondere Recht-und-Steuern-Fachgebiet) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den fünften Kurs (Handelsfachwirt) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§4 HdlFachwPrV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; zoll-/außenwirtschafts- und arbeitsrechtliche Aussagen (insbesondere im Fachgebiet Außenhandel) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den sechsten Kurs (Technischer Fachwirt) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§§4–6 TechFachwPrV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; rechtliche Aussagen (insbesondere im Fachgebiet Recht und Steuern sowie arbeitsschutzrechtliche Passagen im Fachgebiet Qualitäts- und Umweltmanagement sowie Arbeitsschutz) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den siebten Kurs (Industriefachwirt) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§§4–5 IndFachwirtPrV 2010) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; rechtliche Aussagen (insbesondere im Fachgebiet Recht und Steuern) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den achten Kurs (Immobilienfachwirt) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§4 ImmoFachwPrV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; rechtliche Aussagen (insbesondere Miet-/WEG-Recht in den Fachgebieten Rahmenbedingungen der Immobilienwirtschaft und Immobilienbewirtschaftung sowie Baurecht im Fachgebiet Bauprojektmanagement) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den neunten Kurs (Versicherungen und Finanzanlagen) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§§4–9 BAProVFFPrV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; versicherungsvertragsrechtliche Aussagen (insbesondere VVG-Grundzüge in den Fachgebieten Kundenbedarfsfelder und Kernprozesse gestalten) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den zehnten Kurs (Transport Management and Logistics) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§§4–9 GüLogFachwBAProFV) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; zoll-/außenwirtschafts- und gefahrgutrechtliche Aussagen (insbesondere im Fachgebiet Erstellen von Güterverkehrs- und Logistikdienstleistungen) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den elften Kurs (Ausbildung der Ausbilder) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (§§2–4 AEVO) sowie frei zugänglichen IHK-Kammerseiten, nicht an einem kostenpflichtigen Lehrbuch; rechtliche Aussagen (insbesondere BBiG-/HwO-Bezüge und Jugendarbeitsschutz-Passagen im Fachgebiet Ausbildungsvoraussetzungen prüfen und Ausbildung planen) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden (siehe Anforderungskatalog Abschnitt 4/9). Für den zwölften Kurs (Fachinformatiker/in Anwendungsentwicklung) orientiert sich die Gliederung ebenfalls an der frei einsehbaren Rechtsverordnung selbst (FIAusbV, §§1–17 sowie Ausbildungsrahmenplan der Anlage) und nicht an einem kostenpflichtigen Lehrbuch; datenschutz-, arbeits-, sozial- und lizenzrechtliche Aussagen (insbesondere in den Fachgebieten IT-Sicherheit, Datenschutz und Qualitätssicherung sowie Wirtschafts- und Sozialkunde: DSGVO-Artikel und -Fristen, BBiG-Probezeit, Betriebsverfassungsrecht, Zahlenwerte wie Mindeststammkapital) sind ebenfalls bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden, ebenso rechnerische und technische Beispiele (Subnetze, Verfügbarkeit, SQL-Ergebnisse, Kosten/Amortisation) stichprobenartig fachlich (siehe Anforderungskatalog Abschnitt 4/9). Für den dreizehnten Kurs (Fachinformatiker/in Systemintegration) gilt dasselbe für die FIAusbV (Teil 2 Systemintegration, §§ 18–25, Ausbildungsrahmenplan Abschnitt C): Lizenz-, Datenschutz- und Aufbewahrungsaussagen (Fachgebiete `SI1`/`SI3`) sowie Richtwerte und technische Angaben (Kabelreichweiten, WLAN-Pegel, Portnummern in `SI2`; Skript-, RAID- und Speicherrechnungen in `SI4`) sind grundlagenorientiert gehalten und vor Veröffentlichung für echte Lernende fachlich zu prüfen. Für den vierzehnten Kurs (Fachinformatiker/in Daten- und Prozessanalyse) gilt dasselbe für die FIAusbV (Teil 2 Daten- und Prozessanalyse, §§ 26–33, Ausbildungsrahmenplan Abschnitt D): Datenschutz-, Urheber- und Betriebsverfassungsrecht-Aussagen (Fachgebiete `DP2`/`DP4`), statistische und modellbezogene Aussagen einschließlich der nicht ausgeführten pandas-Beispiele (Fachgebiet `DP3`, Thema 10.3) sowie Notationsdetails zu EPK/BPMN/DIN 66001 (Fachgebiet `DP1`) sind grundlagenorientiert gehalten und vor Veröffentlichung für echte Lernende fachlich zu prüfen. Für den fünfzehnten Kurs (Fachinformatiker/in Digitale Vernetzung) gilt dasselbe für die FIAusbV (Teil 2 Digitale Vernetzung, §§ 34–41, Ausbildungsrahmenplan Abschnitt E): Protokoll-, Port- und Signalangaben im Industrie-/IoT-Umfeld (Modbus, MQTT, OPC UA, 4–20 mA, Kabelreichweiten), Sicherheitsaussagen zur OT-Security (IEC 62443 nur als Orientierung) sowie Betriebsrats- und Meldepflichtaussagen (Fachgebiete `DV1`–`DV4`) sind grundlagenorientiert gehalten und vor Veröffentlichung für echte Lernende fachlich zu prüfen.
