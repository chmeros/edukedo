---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: DP2
fachgebiet_title: "Datenquellen analysieren und Daten bereitstellen"
thema_code: "DP2-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Analysieren von Datenquellen und Bereitstellen von Daten“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 5 Nr. 2 und Anlage (Ausbildungsrahmenplan) Abschnitt D lfd. Nr. 2 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DP2 (9.1–9.3) zu zusammenhängenden Situationen aus Datenanalyseprojekten der Brevanta IT-Systemhaus GmbH, wie sie in der schriftlichen Abschlussprüfung (z. B. im Prüfungsbereich „Sicherstellen der Datenqualität") typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-DP2-01 · Fallaufgabe

**Themenbezug:** 9.1 (Datenquellen inventarisieren, Datenarten, Skalenniveaus, Klassifizierung, Quellenbewertung)

**Ausgangssituation:** Die Hartwig Kunststofftechnik GmbH, ein Hersteller von Spritzgussteilen, möchte mit Brevanta die Ursachen von Ausschuss in der Fertigung untersuchen. Die Projektleiterin Selin Aydin beauftragt den Umschüler Jonas Berger, die vorhandenen Datenquellen zu inventarisieren. Nach Gesprächen mit Fertigung, Qualitätssicherung und IT liegt folgende Übersicht vor:

```
Nr | Quelle                    | System / Format                 | Inhalt (Auszug)                                                         | Aktualisierung               | Zugriff
1  | ERP "WerkPlan"            | relationale Datenbank           | Aufträge, Artikel, Kunden mit Ansprechpersonen                          | laufend                      | lesendes Konto möglich
2  | Spritzgussmaschinen       | JSON-Dateien je Schicht         | Zeitstempel, Maschinen-ID, Zykluszeit (s), Werkzeugtemperatur (°C), Bediener-ID | täglich bis 06:00 Uhr | Dateifreigabe
3  | Qualitätsprüfung          | Excel-Listen, eine je Woche     | Prüfdatum, Auftragsnr., Ausschuss (Stück), Prüfnote 1-5, Fehlerart (Freitext), Prüfername | wöchentlich, von Hand | Netzlaufwerk
4  | Webshop-Zugriffsprotokoll | Textdateien, eine Zeile je Aufruf | IP-Adresse, Zeit, Aufruf, Warenkorb-ID, Kunden-ID (falls angemeldet) | laufend                      | Export vom Webserver
5  | Rohstoffpreisindex        | CSV-Download des Branchenverbands | Monatswerte, Index (Basis 2020 = 100)                                 | monatlich, 6 Wochen Verzug   | frei, Lizenz CC BY
6  | Reklamationspostfach      | E-Mails mit PDF-Anhängen        | Kundentexte, Fotos, Lieferscheine                                       | laufend                      | Postfachzugriff über IT
```

Die Prüfnote in Quelle 3 reicht von 1 (sehr gut) bis 5 (mangelhaft) für die Oberflächenqualität; als Fehlerart tragen die Prüfer teils Freitext, teils Kürzel wie F07 ein. Auftragsnummern haben das Format 000812 (sechsstellig mit führenden Nullen). Der Auftraggeber fragt, ob sich mit diesen Daten eine Vorhersage der Ausschussquote je Tag erstellen lässt.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie jede der sechs Quellen der Datenart (strukturiert, semistrukturiert, unstrukturiert) zu und geben Sie an, ob die Quelle intern oder extern ist. Begründen Sie Ihre Zuordnung jeweils in einem Satz.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Bestimmen Sie für die Merkmale Zykluszeit, Werkzeugtemperatur, Prüfnote, Fehlerart (Kürzel) und Auftragsnummer das Skalenniveau und einen sinnvollen technischen Datentyp. Nennen Sie außerdem eine Auswertung, die für die Prüfnote nicht oder nur mit Vorsicht zulässig ist.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Stufen Sie die sechs Quellen nach dem üblichen Vier-Stufen-Schema (öffentlich, intern, vertraulich, streng vertraulich) ein und begründen Sie die Einstufung. Benennen Sie zwei Merkmale, die eine höhere Einstufung auslösen, und erklären Sie, wie sich die Einstufung auf Kopien in einer Staging-Tabelle auswirkt.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Quellen 3 (Excel-Listen) und 5 (Rohstoffpreisindex) anhand von Aktualität (Gewicht 40 %), Herkunft (30 %) und Vertrauenswürdigkeit (30 %) mit einer Skala von 1 (schwach) bis 3 (gut) und berechnen Sie die gewichteten Gesamtwerte. Entscheiden Sie begründet, ob und wie beide Quellen für die Vorhersage der täglichen Ausschussquote nutzbar sind.

**Musterlösungshinweise:** Teilaufgabe 1: Quelle 1 strukturiert, intern (feste Tabellenstruktur im ERP). Quelle 2 semistrukturiert, intern (JSON, verschachtelt und selbstbeschreibend). Quelle 3 überwiegend strukturiert, intern (Tabellenform, aber handgepflegt, mit Freitext in der Fehlerart; auch die Einordnung als „eingeschränkt strukturiert" ist begründet vertretbar). Quelle 4 semistrukturiert, intern (Logzeilen mit festem Muster, zerlegbar in Felder; die Daten stammen vom Webserver des Kunden). Quelle 5 strukturiert, extern (Verbandsdaten, Sekundärdaten). Quelle 6 unstrukturiert (Freitexte, Fotos, PDF), im eigenen Postfach gespeichert, inhaltlich von Kund:innen stammend; als intern oder als Mischform mit externem Ursprung einstufbar, wenn begründet. Teilaufgabe 2: Zykluszeit: Verhältnisskala, Dezimalzahl. Werkzeugtemperatur: Intervallskala (kein natürlicher Nullpunkt), Dezimalzahl. Prüfnote: Ordinalskala, Ganzzahl bzw. Kategorie. Fehlerart (Kürzel): nominal, Text. Auftragsnummer: nominal, Text (führende Nullen bleiben erhalten; Rechnen ist sinnlos). Nicht oder nur mit Vorsicht zulässig: der Mittelwert der Prüfnoten, weil die Abstände zwischen den Stufen nicht als gleich gelten; besser Median und Häufigkeitsverteilung. Teilaufgabe 3: Üblicherweise Quelle 1 vertraulich (Kunden- und Auftragsdaten, gegebenenfalls Preise); Quelle 2 vertraulich wegen der Bediener-ID, ohne diese Spalte eventuell intern; Quelle 3 vertraulich (Prüfername, Bezug zu Kundenaufträgen); Quelle 4 vertraulich (IP-Adresse und Kunden-ID sind personenbezogen); Quelle 5 öffentlich (frei verfügbar, die Lizenz CC BY mit Namensnennung ist zu beachten); Quelle 6 vertraulich (Kundenkommunikation, mögliche personenbezogene Angaben und Betriebsinterna). Streng vertraulich ist hier in der Regel nicht erforderlich, außer die Anhänge enthalten z. B. Konstruktionszeichnungen; maßgeblich ist die Richtlinie des Kunden. Höhere Einstufung auslösende Merkmale: Bediener-ID, Prüfername, IP-Adresse, Kunden-ID, gegebenenfalls Freitexte mit Personenbezug. Kopien, Exporte und Staging-Tabellen erben die Einstufung der Quelle, brauchen also dieselben Zugriffsbeschränkungen; nicht benötigte sensible Spalten sollten gar nicht erst übernommen werden. Teilaufgabe 4: Beispielbewertung Excel-Listen: Aktualität 2 (wöchentlich), Herkunft 2 (eigene Prüfung, aber manuell), Vertrauenswürdigkeit 1 (Freitext, keine Eingabeprüfung): 0,4 · 2 + 0,3 · 2 + 0,3 · 1 = 0,8 + 0,6 + 0,3 = 1,7. Rohstoffpreisindex: Aktualität 1 (Monatswerte mit sechs Wochen Verzug), Herkunft 3 (Verband, dokumentierte Methodik), Vertrauenswürdigkeit 3: 0,4 · 1 + 0,3 · 3 + 0,3 · 3 = 0,4 + 0,9 + 0,9 = 2,2. Abweichende Einzelbewertungen sind zulässig, wenn sie begründet sind. Entscheidung: Die Excel-Listen sind die einzige Quelle für den Ausschuss selbst und damit unverzichtbar, trotz des niedrigeren Gesamtwerts; sie müssen vor der Nutzung bereinigt werden (Fehlerart auf Kürzel vereinheitlichen, Plausibilitätsprüfung, einheitliche Spaltenstruktur) und sollten künftig über eine Erfassungsvorlage mit Pflichtfeldern und Auswahllisten gepflegt werden. Der Preisindex ist zwar vertrauenswürdig, aber für eine tagesgenaue Vorhersage zu grob und zu verzögert; er kann höchstens als erklärender Faktor auf Monatsebene dienen. Der Gesamtwert ist nur eine Entscheidungshilfe und ersetzt nicht die Prüfung, ob die Quelle zum Zweck passt.

---

#### F-DP2-02 · Fallaufgabe

**Themenbezug:** 9.2 (Nutzungsberechtigung, Zweckbindung, Lizenzen, Pseudonymisierung/Anonymisierung, Re-Identifikation) + 9.1 (Klassifizierung)

**Ausgangssituation:** Die Nordlicht Haushaltswaren GmbH betreibt einen Webshop und möchte mit Brevanta Kundensegmente bilden, um das Sortiment gezielter zu planen und die Retourenquote zu senken. Brevanta arbeitet dabei im Auftrag des Kunden. Der Projektleiter Daniel Hoffmann hat vier Datenquellen zusammengestellt:

```
Quelle                      | Erhebungszweck                         | Personenbezug              | Besonderheit
A Webshop-Bestellungen      | Vertragsabwicklung                     | ja (Name, Anschrift, Artikel) | enthält Kundennummer
B Newsletter-Verteiler      | Einwilligung "Newsletter mit Angeboten" | ja (E-Mail, Name)          | Einwilligung gilt nur für den Newsletter-Versand
C Kaufkraftindex je PLZ     | gekauft von einem Datenanbieter         | nein (Gebietsebene)        | Lizenz: nur interne Nutzung durch den Lizenznehmer Brevanta, keine Weitergabe an Dritte
D Support-Chatprotokolle    | Kundenservice                          | ja (Freitext)              | Freitext kann Gesundheitsangaben enthalten
```

Geplant sind folgende Vorhaben:

```
V1: Bestellungen (A) mit dem Kaufkraftindex (C) über die Postleitzahl verknüpfen, um Kundensegmente zu bilden.
V2: Bestellungen (A) mit dem Newsletter-Verteiler (B) über die E-Mail-Adresse verknüpfen und das Kaufverhalten einzelner Empfänger:innen für gezielte Werbung auswerten.
V3: Support-Chatprotokolle (D) im Volltext nach Retourengründen auswerten.
V4: Dem Kunden im Ergebnisbericht die Rohwerte des Kaufkraftindex je Postleitzahl mitliefern.
```

Der Datenschutzbeauftragte der Nordlicht GmbH ist bereit, Fragen zu beantworten, und der Auftragsverarbeitungsvertrag zwischen Nordlicht und Brevanta liegt vor.

Für den Ergebnisbericht liegt der folgende Entwurf einer Segmenttabelle vor. Als Quasi-Identifikatoren gelten Altersgruppe und PLZ-Bereich. Intern ist festgelegt, dass keine Gruppe mit weniger als 5 Kund:innen ausgegeben wird.

```
Altersgruppe | PLZ-Bereich | Warengruppe | Anzahl Kund:innen
18-29        | 010xx       | Küche       | 412
18-29        | 010xx       | Garten      | 388
30-49        | 010xx       | Küche       | 2
50-64        | 010xx       | Küche       | 57
65+          | 238xx       | Garten      | 1
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Prüfen Sie die Vorhaben V1 bis V4 anhand der Gesichtspunkte Personenbezug, Zweck bzw. Rechtsgrundlage und Lizenz. Geben Sie für jedes Vorhaben das Ergebnis an (zulässig, zulässig mit Maßnahmen, ohne Klärung nicht durchführen) und begründen Sie es kurz.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Legen Sie für V1 konkrete Maßnahmen fest: Welche Daten werden übernommen, wie wird der Personenbezug verringert, wie wird verknüpft, in welcher Form werden Ergebnisse ausgegeben, und wer erhält Zugriff?

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Bewerten Sie die Segmenttabelle aus dem Entwurf des Ergebnisberichts: Welche Zeilen verletzen die Regel, welches Risiko besteht, wie hoch ist der Anteil der betroffenen Kund:innen an der Gesamtzahl, und welche zwei Maßnahmen schlagen Sie vor?

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie den Eintrag im Prüfprotokoll für V1 (Felder und Inhalte) und beschreiben Sie, wie Sie das Ergebnis und offene Punkte (V2 bis V4) mit dem Kunden und dem Datenschutzbeauftragten abstimmen.

**Musterlösungshinweise:** Teilaufgabe 1: V1: zulässig mit Maßnahmen. Die Bestellungen sind personenbezogen und wurden für die Vertragsabwicklung erhoben; Segmentbildung ist ein anderer Zweck. Er ist im Auftrag des Kunden und mit Abstimmung des Datenschutzbeauftragten vertretbar, wenn auf Gruppenebene ausgewertet und der Personenbezug früh verringert wird; die Lizenz für C erlaubt die interne Nutzung durch Brevanta. V2: ohne Klärung nicht durchführen. Die Einwilligung gilt nur für den Newsletter-Versand; die personenbezogene Verhaltensauswertung für Werbung ist ein anderer Zweck, für den eine zusätzliche Einwilligung oder eine andere tragfähige Rechtsgrundlage nötig ist (Beurteilung durch den Kunden und den Datenschutzbeauftragten). V3: zulässig mit Maßnahmen: Freitexte können besondere Kategorien personenbezogener Daten enthalten; vor der Analyse Namen, Kontaktdaten und weitere Identifikatoren entfernen oder maskieren, nur die Retourengründe kategorisieren, Zugriff auf das Projektteam beschränken, Datenschutzbeauftragten einbinden. V4: ohne Klärung nicht durchführen: Die Weitergabe der Rohwerte an Nordlicht ist eine Weitergabe an einen Dritten; Möglichkeiten: Lizenz auf Nordlicht erweitern bzw. dort beschaffen oder nur aggregierte Segmentergebnisse liefern, aus denen sich der Rohwert nicht rekonstruieren lässt. Teilaufgabe 2: Nur die für die Segmentbildung benötigten Spalten übernehmen (Datensparsamkeit): Kundennummer, Postleitzahl, Bestellmengen und Warengruppen, aber keine Namen, Straßen oder E-Mail-Adressen. Die Kundennummer wird durch ein zufälliges Pseudonym ersetzt, die Zuordnungstabelle verbleibt getrennt beim Kunden. Verknüpft wird über die Postleitzahl (Gebietsebene); in den Ergebnissen wird auf PLZ-Bereiche und Altersgruppen generalisiert und nur aggregiert ausgegeben, mit Mindestgruppengröße 5. Zugriff nur für die Projektbeteiligten (Need-to-know) in der Analyseumgebung, Löschung der Arbeitsdaten nach Projektende, Prüfprotokoll. Teilaufgabe 3: Verletzt wird die Regel in der Zeile 30-49 / 010xx / Küche (2 Kund:innen) und in der Zeile 65+ / 238xx / Garten (1 Kund:in); das kleinste k ist 1. Risiko: Wer eine Person aus dieser Altersgruppe und Region kennt, kann deren Einkaufsverhalten ablesen (Re-Identifikation); bei 1 Person ist sie praktisch eindeutig. Gesamtzahl: 412 + 388 + 2 + 57 + 1 = 860; betroffen sind 2 + 1 = 3 Kund:innen, also 3 / 860 ≈ 0,35 %. Dennoch zählt das Risiko, nicht die Quote. Maßnahmen: Gruppen zusammenfassen (z. B. Altersgruppen ab 30 zu einer Gruppe, gröbere PLZ-Bereiche) oder die Zeilen unterdrücken bzw. mit „weniger als 5" ausgeben; auch Löschen der Zeilen aus dem Bericht ist zulässig. Teilaufgabe 4: Prüfprotokoll V1: Datum, Projekt und Kunde; geprüfte Quellen A und C; geplante Verknüpfung (Postleitzahl, über pseudonymisierte Kundennummer); Zweck (Segmentbildung zur Sortimentsplanung); Einschätzung zu Personenbezug (A ja, C nein), Rechtsgrundlage und Zweckvereinbarkeit (durch den Kunden und den Datenschutzbeauftragten zu bestätigen); Lizenz (C: interne Nutzung durch Brevanta, keine Weitergabe der Rohwerte); Maßnahmen (Spaltenauswahl, Pseudonymisierung, Generalisierung, Mindestgruppengröße 5, Zugriff auf Projektteam, Löschfrist); Freigabe durch benannte Person des Kunden. Abstimmung: Ergebnis schriftlich an Projektleitung und Datenschutzbeauftragten des Kunden, V1 und V3 mit den Auflagen zur Freigabe vorschlagen, V2 und V4 als offene Punkte mit der jeweils nötigen Klärung benennen (zusätzliche Einwilligung bzw. Lizenzerweiterung oder Verzicht); bis zur Klärung werden diese Vorhaben nicht durchgeführt.

---

#### F-DP2-03 · Fallaufgabe

**Themenbezug:** 9.3 (Datenübernahme, Formate und Kodierung, Schnittstellen, Mengen, ETL/ELT, Staging, Bereitstellung, Protokollierung) + 9.2 (Auflagen, Verknüpfung)

**Ausgangssituation:** Die Rheingold Logistik GmbH möchte mit Brevanta die Lieferperformance ihrer Transporte auswerten. Für die Disposition soll eine Analysebasis entstehen, die täglich aktualisiert wird. Die Auszubildende Leila Yıldırım soll die Datenübernahme planen. Die Quellen sind:

```
Quelle                 | Zugriff            | Format und Besonderheiten
TMS (Transportmgmt.)   | REST-API, API-Key  | JSON; 200 Datensätze je Seite; höchstens 30 Aufrufe je Minute; Feld "geaendert_am" (UTC) je Sendung
Telematik              | Dateiablage        | tägliche CSV (Semikolon, Dezimalkomma, Windows-1252); eine Position je Fahrzeug alle 30 s während der Fahrt
Subunternehmer-Preise  | Excel-Datei        | eine Datei je Quartal; Tarifzeilen, teils zusammengeführte Zellen
```

Eckdaten: Das TMS enthält 24 Monate Historie mit 432.000 Sendungen, täglich kommen rund 600 neue oder geänderte Sendungen hinzu. Die 120 Fahrzeuge sind täglich etwa 10 Stunden unterwegs. Ein Telematik-Datensatz hat etwa 80 Byte. Ein Auszug aus der Telematik-Datei:

```
fahrzeug_id;zeit;lat;lon;geschw_kmh;fahrer
LKW-014;03.09.2026 06:15:30;50,9375;6,9603;62;M. Müller
LKW-014;03.09.2026 06:16:00;50,9402;6,9611;58;M. Müller
```

Das Rechenzentrum des Kunden erlaubt nur lesenden Zugriff. Die Zielumgebung ist ein Data Warehouse des Kunden. Für die Disposition soll später ein Data Mart mit den Auswertungen zu Lieferzeiten bereitstehen. Die Telematik-Spalte „fahrer" ist personenbezogen; der Kunde hat festgelegt, dass die Auswertung ohne Fahrernamen erfolgen soll.

Nach den ersten beiden Betriebstagen des Ladeprozesses liegt dieses Protokoll vor:

```
Lauf       | Quelle    | gelesen | geladen | abgelehnt | Status
2026-09-08 | TMS-Delta | 612     | 608     | 4         | OK
2026-09-08 | Telematik | 144.210 | 143.870 | 280       | Hinweis
2026-09-09 | TMS-Delta | 598     | 580     | 12        | Hinweis
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beschreiben Sie je Quelle die technischen Voraussetzungen und möglichen Stolpersteine bei der Übernahme (Zugriff und Authentifizierung, Format, Kodierung und Zeit, Mengen) und nennen Sie eine Folge aus den Vorgaben der Nutzungsprüfung.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie (a) Aufrufzahl und Mindestdauer einer Vollladung der TMS-Historie, (b) die Zahl der Aufrufe für die tägliche Deltaladung, (c) Zeilenzahl und Datenmenge der Telematik pro Tag in Megabyte sowie pro Jahr (365 Tage) in Gigabyte. Leiten Sie daraus eine Ladestrategie ab.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie den Ablauf der Datenübernahme als ETL- oder ELT-Prozess mit Staging, Bereinigungsregeln und Zielstruktur für den Data Mart der Disposition. Begründen Sie die Wahl von ETL oder ELT für die Telematik-Daten.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie das Ladeprotokoll (Bilanz, Auffälligkeiten, nächste Schritte) und beschreiben Sie, wie die Disposition die Daten sicher und reproduzierbar nutzen kann.

**Musterlösungshinweise:** Teilaufgabe 1: TMS: Zugriff per API-Key über ein technisches Konto mit Leserecht; Schlüssel in geschützter Konfiguration, nicht im Skript; Übertragung per TLS; Paginierung und Abrufgrenze beachten (Statuscode 429 bei Überschreitung, daher mit Pausen arbeiten); verschachteltes JSON in Tabellen überführen; Zeitstempel in UTC. Telematik: Datei ist Windows-1252-kodiert, also beim Einlesen die Kodierung angeben bzw. nach UTF-8 umwandeln (sonst entstehen Fehler bei Umlauten); Semikolon als Trennzeichen, Dezimalkomma, Datumsformat TT.MM.JJJJ in lokaler Zeit, die Zeitzone muss beim Zusammenführen mit den UTC-Zeitstempeln des TMS festgelegt und umgerechnet werden (Sommerzeit!); die Spalte „fahrer" ist personenbezogen. Subunternehmer-Preise: Excel mit zusammengeführten Zellen und wechselnder Struktur ist fehleranfällig; die Tarifzeilen müssen in eine feste Tabellenform überführt werden, die Kennungen der Subunternehmer sind mit den Stammdaten abzugleichen. Folge aus der Nutzungsprüfung: Die Fahrernamen werden gar nicht übernommen oder vor dem Laden entfernt bzw. pseudonymisiert. Teilaufgabe 2: (a) 432.000 / 200 = 2.160 Aufrufe; bei 30 Aufrufen je Minute dauert das mindestens 2.160 / 30 = 72 Minuten. (b) 600 / 200 = 3 Aufrufe pro Tag. (c) Pro Fahrzeug 10 h · 3.600 s / 30 s = 1.200 Positionen pro Tag; bei 120 Fahrzeugen 144.000 Zeilen. Bei 80 Byte: 144.000 · 80 = 11.520.000 Byte ≈ 11,5 MB pro Tag; pro Jahr 11,52 MB · 365 ≈ 4.205 MB ≈ 4,2 GB. Strategie: Die Historie wird einmalig vollgeladen (am besten nachts oder am Wochenende, rund 72 Minuten, mit Pausen bei Ratenbegrenzung), danach täglich per Delta über das Feld „geaendert_am" mit nur 3 Aufrufen; die Telematik-Dateien werden täglich übernommen. Die Mengen sind für das Data Warehouse unkritisch, die Rohpositionen können bei Bedarf auf Minuten- oder Tageswerte verdichtet werden. Teilaufgabe 3: Mögliche Gestaltung: Extract: TMS-Delta über die API und Telematik-Datei in die Staging-Area übernehmen, Rohdaten unverändert ablegen, Quelle und Ladezeitpunkt protokollieren. Transform: Kodierung nach UTF-8, Trennzeichen und Dezimalkomma auswerten, Datums- und Zeitstempel auf UTC vereinheitlichen, Datentypen setzen, Dubletten über Fahrzeug und Zeitstempel entfernen, Plausibilitätsregeln (z. B. Geschwindigkeit nicht negativ, Koordinaten im gültigen Bereich), fehlende Werte kennzeichnen, die Spalte „fahrer" entfernen oder durch ein Pseudonym ersetzen, abgelehnte Zeilen in eine Fehlertabelle schreiben. Load: in das Data Warehouse laden (bereinigte Schicht) und daraus den Data Mart Disposition befüllen, z. B. Faktentabelle Sendung mit Lieferzeiten und Dimensionen Kunde, Datum, Region und Subunternehmer. Schluss: Zeilenbilanz und Kontrollsummen prüfen, Lauf protokollieren. Begründung: Für die Telematik spricht ETL, weil die Auflage (keine Fahrernamen) vor dem Laden umgesetzt werden muss; bei ELT würden die Namen zunächst in das Ziel gelangen. Für das TMS wäre ELT möglich, ein einheitlicher Ablauf ist aber einfacher zu betreiben. Teilaufgabe 4: Bilanz Lauf 1: 608 + 4 = 612, stimmt, abgelehnte Quote 4 / 612 ≈ 0,65 %. Lauf 2 (Telematik): 143.870 + 280 = 144.150, gelesen wurden 144.210, also fehlen 60 Datensätze ungeklärt; abgelehnt sind 280 / 144.210 ≈ 0,19 %. Lauf 3: 580 + 12 = 592 bei 598 gelesenen, also 6 ungeklärt; die Ablehnungsquote von 12 / 598 ≈ 2,0 % liegt deutlich höher als am Vortag. Folgerung: Die beiden Läufe mit ungeklärter Differenz sind zu untersuchen (Fehlerprotokoll, Abbruch bei Dubletten, Verarbeitung doppelter Zeilen), die Ursache der höheren Ablehnungsquote zu klären (neue Datenfehler im TMS?), die Läufe zu wiederholen und die Bilanz aufgehen zu lassen, bevor die Disposition auf den Daten arbeitet; Benachrichtigung bei Differenzen einrichten. Bereitstellung: Die Disposition erhält Zugriff auf den Data Mart über Views ohne personenbezogene Spalten, mit Rollen und Leserechten, dokumentiert im Datenkatalog (Bedeutung der Felder, Aktualität, Verantwortliche); Self-Service in einem BI-Werkzeug auf den freigegebenen Views, Exporte nur mit Angabe des Datenstands. Reproduzierbarkeit: Skripte und Konfiguration in der Versionsverwaltung, Rohdatenstand identifizierbar (Datum, Dateiname, Prüfsumme), Läufe idempotent (keine Doppelladung bei Wiederholung), Datenherkunft dokumentiert, Ladeprotokolle aufbewahrt.
