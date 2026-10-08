# Fachprüfung Kurs „Fachinformatiker/in Digitale Vernetzung“ (fachinformatiker-digitale-vernetzung)

Prüfung durch Fachlehrer:in/Prüfer:in, Stand 07.10.2026. Geprüft wurde `content/fachinformatiker-digitale-vernetzung/` (68 Dateien, 1.750 Einträge nach Parser-Zählung) einschließlich der Zusatz-Passung zu `KURS_ANGEBOT`/`KURS_ENTWURF`, Topologie-Szenarien, MQTT-Labor, Skalierungs-/Energierechner und Troubleshooting-Set „industrie-iot“. Es wurde nichts geändert, nichts committet; Skripte und Hilfsdateien liegen nur im Scratchpad.

---

## 1. Kurzfazit

| Kriterium | Note (1–6) | Kurzbegründung |
|---|---|---|
| Fachlichkeit | **2** (gut) | Alle nachgerechneten Beispiele stimmen (siehe Abschnitt 2). Genau eine falsch formulierte Aufgabe (Q-11.4-05), eine fachliche Verkürzung bei OPC UA, einige mehrdeutige Zuordnungen in den Zonen-Instrumenten. Normen- und Rechtsaussagen sind zurückhaltend formuliert. |
| Didaktik | **2–3** (gut bis befriedigend) | Klarer Aufbau entlang des Ausbildungsrahmenplans, sehr gute Fallaufgaben und Prüfungsnähe. Abzüge für systematische Antwortmuster im Quiz (Position/Länge), Begriffsinkonsistenzen, Redundanz und einzelne Theorielücken vor Werkzeugen (R5). |

**Freigabeempfehlung: mit Auflagen.**
- Theorie, Karteikarten, Fallaufgaben und Fachgesprächsfragen sind nach Behebung der Befunde FL-DV-01 bis FL-DV-04 freigabefähig (Rest sind Mittel/Niedrig und können nachgezogen werden).
- Die bereits sichtbaren Instrumente (Pyramide, Sensor/Aktor, Industrieprotokolle, Zonenkonzept) brauchen eine Korrekturliste (FL-DV-03 bis FL-DV-07), sie sind bereits live.
- Die Entwurfs-Instrumente (`authfaktoren`, `kryptobausteine`, `angriffsarten`, `monitoring`) und das Set „industrie-iot“: Empfehlung je Instrument in Abschnitt 7.
- Regel R4: Aussagen zu FIAusbV, IEC 62443, Werkvertragsrecht, Datenschutz und Normen wurden von mir **nicht rechtlich freigegeben**. Die Verordnungszitate wurden nur mit dem Gesetzestext abgeglichen (Abschnitt 2); das ist kein Rechtsgutachten.

**Die drei wichtigsten Punkte**
1. Q-11.4-05 fragt nach der „kleinsten Präfixlänge“; die Musterlösung /25 ist aber die *längste* passende Präfixlänge (kleinstes Netz). Aufgabe ist so fachlich falsch gestellt (FL-DV-01).
2. Antwortmuster im Quiz verraten die Lösung: Die richtige Multiple-Choice-Antwort steht in 72 % der Fälle an zweiter Stelle, nie an vierter; bei „Was passt nicht dazu“ in 89 % an letzter Stelle; bei Mehrfachauswahl sind Option 1 und 2 immer richtig; 79 % der Wahr/Falsch-Aussagen sind falsch (FL-DV-02).
3. OPC UA wird als „klassisch Request/Response, Polling“ dargestellt; OPC UA Client/Server kennt aber Subscriptions (Änderungsmeldung). Das macht Zonen-Zuordnungen in Q-11.1-15/16 mehrdeutig (FL-DV-03, FL-DV-04).

---

## 2. Prüfumfang

**Gelesen und geprüft (100 %)**
- DV1 bis DV5: 19 Themen mit Theorie, 372 Karteikarten, 269 Quizfragen (alle Fragetypen, inkl. aller 19 Zuordnungs-/Zonen-Fragen der Instrumente), 15 Fallaufgaben mit Musterlösungshinweisen, 21 Fachgesprächsfragen.
- Alle Rechen-, Zahlen-, Port-, Zeit- und Kostenangaben wurden nachgerechnet (u. a. Datenraten, Subnetze /25 und /26, Verfügbarkeit mit MTBF/MTTR, Reihen- und Parallelschaltung, Perzentil nach Nächster-Rang, Nutzwertanalysen, Kalkulation inkl. 19 % USt, Amortisation, Puffergrößen, ADC-Auflösung, Skalierung 4–20 mA, Latenzsummen, Update-Wellen). **Keine Rechenabweichung gefunden.**
- Prüfblatt 08 vollständig (alle ⚠-Punkte, alle 10 Troubleshooting-Fälle); Abgleich mit der Datenquelle `game-troubleshooting-industrie-iot.ts`.
- `packages/shared/src/kurs-angebot.ts` (DV-Eintrag, `KURS_ENTWURF`), die vier Industrie-Topologien samt Ausführung von Alternativlösungen per Skript, `mqttlabor.ts`, `skalierung.ts`, `energie.ts` (Rechenlogik).

**Stichproben aus den gemeinsamen Dateien (`fu*`)**: 3.1 und 3.3 vollständig, 6.1 (Theorie, Zonen-Fragen Q-6.1-17 bis 23 und weitere Quizfragen), Zahlen/Fristen in 6.2/7.1/7.2 per Suche. Die vier Fachinformatiker-Kurse teilen `fu*`; nur `fu6/6.1` ist im DV-Kurs bewusst abweichend (Zonen-Fragen mit Industriekontext), alle übrigen `fu*`-Dateien sind byte-identisch bis auf `kurs_slug` (per Skript verifiziert).

**Massenchecks per Skript (alle 1.750 Einträge)**: Struktur (Lösung vorhanden, Anzahl richtiger Optionen je Typ, fehlende Erklärung/Tags: **keine Fehler**), Duplikate, Positions- und Längenverteilung, Schwierigkeit gegen Bloom, Kurzantwort-Akzeptanzlisten, Zahlenformate.

**Webabgleich (Quellen)**
- Verordnung über die Berufsausbildung zum Fachinformatiker (FIAusbV): §§ 4, 5, 9, 36, 37, 38, 40, 41 und Anlage Abschnitt A und E, abgeglichen mit [gesetze-im-internet.de/fiausbv](https://www.gesetze-im-internet.de/fiausbv/BJNR025000020.html) und [Anlage](https://www.gesetze-im-internet.de/fiausbv/anlage.html). Alle Zitate im Kurs (Einsatzgebiete § 5 Abs. 4, 40 Stunden und 30/15 Minuten § 36, Gewichtung § 36 Abs. 4 und § 40, Ergänzungsprüfung § 41, 90 Minuten, Buchstaben E.1 bis E.3) stimmen mit dem Text überein.
- OPC UA Subscriptions statt Polling: [Unified Automation, Subscription-Dokumentation](https://documentation.unified-automation.com/uasdkc/1.9.2/html/L2UaSubscription.html) und [RTA, Data Exchange in OPC UA](https://www.rtautomation.com/rtas-blog/data-exchange-in-opc-ua/).
- `BadCertificateTimeInvalid` (0x80140000, „abgelaufen oder noch nicht gültig“, tritt auch bei Zeitabweichung auf): [OPC Foundation Forum](https://opcfoundation.org/forum/opc-ua-standard/opc-server-certificate-expiry/).

**Nicht oder nur teilweise geprüft**: siehe Abschnitt 9.

---

## 3. Befundtabelle

Sicherheit: **belegt** (Skript, Nachrechnung, Quelle) oder **zu prüfen** (Fachwissen ohne Quelle, oder Norm/Recht nach R4).

### Blocker (fachlich falsch/irreführend)

| ID | Datei · Frage/Abschnitt | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-DV-01 | `dv4/11.4-netzwerkinfrastruktur-protokolle-erweitern.md` · **Q-11.4-05** (Kurzantwort) | Frage: „Welche **kleinste Präfixlänge** genügt“, Lösung „/25“. Eine *kleine* Präfixlänge bedeutet ein *großes* Netz; /24, /23 … genügen ebenfalls, /25 ist die *größte* (längste) Präfixlänge, die noch ausreicht. Wortlaut und Lösung widersprechen sich. | Fragen neu formulieren: „Welche Präfixlänge hat das **kleinste** Subnetz, das für 89 Adressen noch genügt (Form /Zahl)?“ Akzeptanzliste („/25; 25“) kann bleiben. Erklärung ergänzen: „Je länger die Präfixlänge, desto kleiner das Netz.“ | belegt |

### Hoch

| ID | Datei · Frage/Abschnitt | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-DV-02 | Systemisch, alle Quizdateien (DV und `fu*`). Besonders sichtbar bei 8.x bis 12.x | **Antwortmuster:** Multiple Choice (157 Fragen): richtige Antwort an Position 2 in 113 Fällen (72 %), Position 3 in 35, Position 1 in 9, **nie an Position 4**; in 111 Fällen (71 %) ist sie die längste Option (DV allein: 41 von 65). „Was passt nicht dazu“ (46): Lösung an letzter Stelle in 41 Fällen (89 %). Mehrfachauswahl (46): Option 1 und 2 sind **immer** richtig, die „falsche“ steht an Position 3 (25 Fälle) oder 4 (18). Entweder-Oder (46): erste Option richtig in 32 Fällen (70 %). Wahr/Falsch (56): „Falsch“ richtig in 44 Fällen (79 %). Der Server mischt MC-Optionen nicht (`shapeQuizItem` gibt `sortOrder` unverändert aus, `QuizSteps` rendert in Dateireihenfolge). Zum Vergleich: Fachwirt Büro/Projekt verteilt die MC-Lösungen auf 30/33/7/2, ist also nicht betroffen. Folge: Rate-Strategie („zweite Antwort“, „längste“, „letzte“) liefert hohe Trefferquoten. | Entweder Optionsreihenfolge in `shapeQuizItem` zufällig mischen (mit festen Ausnahmen für „alle/keine der …“) **oder** Content umverteilen; Distraktoren auf gleiche Länge/Detailtiefe bringen; Wahr/Falsch auf etwa 50 % Wahr ausbalancieren; bei Mehrfachauswahl die richtigen Optionen variieren. | belegt (Skript `p1.py`) |
| FL-DV-03 | `dv4/11.1-einbindung-heterogener-systeme-protokolle.md` Theorie „Kommunikationsmuster“ (Abs. 1); Q-11.1-15 Erklärung; K-11.1-09; `dv2/9.2` (Gateway-Abschnitt) | Theorie ordnet „den klassischen OPC-UA-Betrieb“ dem Request/Response mit Polling zu; Q-11.1-15 Erklärung: „Bei Modbus und OPC UA fragt ein Client ab (Request/Response), bei MQTT veröffentlicht der Sender von sich aus“. OPC UA Client/Server hat **Subscriptions und Monitored Items**: Der Server meldet Wertänderungen selbständig, es wird nicht zyklisch abgefragt. OPC UA kennt zusätzlich PubSub (so im Kurs erwähnt). Die Verkürzung führt zu falschen Schlüssen („Polling = OPC UA“). | Theorie ergänzen: „OPC UA kann abgefragt werden (Read) oder Werte per Subscription melden lassen; Modbus kann nur abgefragt werden.“ Erklärungen in Q-11.1-15/16 anpassen („Modbus: ausschließlich Polling“). Fallaufgabe F-DV4-01 TA1 hat die richtige Formulierung („Lese-/Abonnement-Funktionen“), bitte vereinheitlichen. | belegt (Quellen oben) |
| FL-DV-04 | `dv4/11.1…` · **Q-11.1-15** Zeile 6 und **Q-11.1-16** Zeile 1; ähnlich Q-11.1-14 | Zone-Zuordnungen mit zweiter vertretbarer Zone: (a) „Die Verbindung wird über **Zertifikate** als vertrauenswürdig geprüft und verschlüsselt → OPC UA“: MQTT über TLS (Port 8883, Gerätezertifikate; so in 11.1, 11.3, 12.2 gelehrt) passt ebenso. (b) „Presse liefert Werte an Leitstand, MES und Auswertung, **ohne mehrfach abgefragt** zu werden → MQTT“: passt auch zu OPC UA mit Subscriptions/PubSub. Die App lehnt die jeweils andere richtige Zone ab. | (a) ergänzen „…Zertifikate, Signatur und Verschlüsselung sind **Teil des Standards**“ (so in Q-11.1-14 bereits formuliert) oder auf „Nutzer-/Anwendungsauthentifizierung mit Zertifikaten und Sicherheitsmodus (Sign/SignAndEncrypt)“ schärfen. (b) „…über einen **zwischengeschalteten Broker**, den die Empfänger abonnieren, ohne dass der Sender sie kennt → MQTT“. | belegt |

### Mittel

| ID | Datei · Frage/Abschnitt | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-DV-05 | `dv1/8.2…` · **Q-8.2-16** („Archivierung der Messwerte … Trendanzeige → Prozessleitebene“ gegen „Auswertung der Anlagenauslastung je Schicht → MES“) und **Q-8.2-17** („Temperaturregler → Steuerungsebene, nicht Feldebene“) | Grenzfälle sind in der Literatur uneinheitlich: Historian/Archivierung wird je Modell dem Leitsystem (SCADA) oder der MES-Ebene zugeordnet; abgesetzte Einzelregler gelten oft als Feldgeräte. Die Fragen verlangen eine Lesart als „eindeutig“; die Erklärung nennt die Verwechslung, aber die Zuordnung ist für Lernende nicht aus der Theorie 8.2 ableitbar (dort kein Begriff „Regler“, „Archivierung“, „Charge“). | Zeilen mit eindeutigen Beispielen ersetzen (z. B. „Regler in der SPS-Software“ statt „Temperaturregler am Werkzeug“; „Auftragsbezogene Ist-Zeiten“ statt „Anlagenauslastung je Schicht“) **oder** Theorie 8.2 um „Regler, Historian, Charge“ in je einem Satz ergänzen. | zu prüfen (Fachlesart) |
| FL-DV-06 | `dv2/9.1` (HMI-Definition), `dv1/8.1` K-8.1-05, Zone „Prozessleitebene (SCADA/HMI)“ in Q-8.2-15 bis 18, Q-12.1-02 | 9.1 definiert HMI als **lokale** Bedienoberfläche an der Maschine und SCADA als übergeordnetes System; die Zone nennt „SCADA/HMI“ gemeinsam auf der Leitebene. Ein Maschinen-HMI wäre nach 9.1 Steuerungs-/Feldnähe, nach der Zone Leitebene. | Zonenname auf „Prozessleitebene (SCADA)“ kürzen oder in der Theorie 8.2 klarstellen „HMI an der Maschine (lokal) zählt zur Steuerungsebene, zentrale Visualisierung zur Leitebene“. | belegt (Widerspruch im Text) |
| FL-DV-07 | `dv1/8.2`, `dv4/11.2`, `dv5/12.1`, Zonen-Fragen | Die dritte Ebene heißt viermal anders: „Leitebene (Prozessleit- und Überwachungsebene)“ (8.2), „Leitstandsebene (Prozessleitebene)“ (11.2, Q-11.2-01/02), „Prozessleit-/Visu-Ebene“ (12.1 Tabelle), „Prozessleitebene (SCADA/HMI)“ (Zonen). K-8.2-15, K-11.2-01 und K-12.1-11 fragen dasselbe dreimal mit abweichender Antwort. | Ein Begriff kursweit (Vorschlag: „Leitebene (Prozessleitebene, SCADA)“) und zwei der drei Karten streichen. | belegt |
| FL-DV-08 | `dv3/10.1` Theorie, Q-10.1-05, Q-10.1-14 bis 16 (Instrument `monitoring`, noch Entwurf) | **Theorie vor Werkzeug (R5):** (1) Die Instrument-Kategorien „Ressourcen / Verfügbarkeit / Netzwerk / Ereignisse-Logs“ stehen so nicht in der Kennwerttabelle 10.1 (dort: Rechenleistung, Speicher, Netzwerk, Qualität der Übertragung, Verfügbarkeit, Umgebung; „Ereignisse/Logs“ nur im Abschnitt Protokollierung). (2) „Baseline“ (Q-10.1-05 Distraktor, Q-10.1-16) wird erst in 10.4 und 11.3 eingeführt. (3) „Historian“ (Q-10.1-15) wird nirgends erklärt. (4) Q-10.1-16 Zeile 5 „Die **Verfügbarkeit einer Linie** als Anteil der Betriebszeit auswerten → Verfügbarkeit (Erreichbarkeit/Dienste)“ vermischt Anlagenverfügbarkeit (Kennzahl) mit Erreichbarkeit eines Dienstes. Ähnlich Q-8.2-16/18: Selbsthaltung, Hysterese, Prozessabbild, Zeitglied (erst 9.2). | Vor Freigabe: Absatz „Vier Überwachungskategorien“ in 10.1; Baseline dort definieren; Historian in Karteikarte/Glossar; Q-10.1-16 Zeile 5 ersetzen (z. B. „Dienst läuft nicht, obwohl das Gerät antwortet“ ist schon vorhanden, besser „Ausfallzeiten pro Monat zählen“ eindeutig der Verfügbarkeit). | belegt |
| FL-DV-09 | `dv2/9.4` „Einordnung und Abgrenzung“; „Tests durchführen, Fehler beseitigen“ | Verweist auf „Teststufen, Äquivalenzklassen, Fehlerberichte … aus der Fachrichtung **Anwendungsentwicklung** bekannt“ und „Schweregrad … wie aus der Anwendungsentwicklung bekannt“. Lernende der Digitalen Vernetzung belegen AE nicht. Äquivalenzklassen und Fehlerbericht/Schweregrad kommen im gesamten DV-Kurs nicht vor; Teststufen nur in `fu4/4.3` (Q-4.3-14/15). | Verweis auf `fu4/4.3` und einen Kurzabsatz „Fehlerbericht: ID, Beschreibung, Schweregrad, Status“ in 9.4 ergänzen; AE-Bezug streichen. | belegt |
| FL-DV-10 | Alle Kurzantworten mit Zahlen: Q-8.1-06, Q-8.3-06, Q-9.1-06, Q-9.4-06, Q-10.2-06, Q-11.3-05, Q-12.2-05, Q-8.3-03, Q-12.2-06 u. a. | Prüfung ist **exakter Stringvergleich** (`match_mode: exact`, nur Trim und Kleinschreibung). Es fehlen übliche Eingaben: Dezimalpunkt statt Komma (1.6; 0.2; 0.75; 11.1; 2.5), Tausenderleerzeichen so wie in der Theorie gedruckt („4 320 000“, „1 440“), „120µs“/„120 us“, „2200 €“. Richtig gerechnete Antworten werden als falsch gewertet (frustrierend, besonders bei Prüfungsangst-Zielgruppe). | Akzeptanzlisten um die genannten Varianten erweitern oder die Eingabe vor dem Vergleich normalisieren (Punkt/Komma, Leerzeichen, Einheit optional). | belegt (Code `checkKurzantwort`) |
| FL-DV-11 | Kurs gesamt, Theorie 11.1/11.3/12.2, Q-11.1-14 bis 17, TS-Fall 8 | **Zertifikate** werden vorausgesetzt (OPC UA, MQTT mit TLS, Ablaufüberwachung, Fall 8), aber nirgends erklärt: kein Absatz zu Aussteller/Vertrauenskette, selbst signierten Zertifikaten, Gültigkeitszeitraum, Erneuerung. Suche nach „Zertifizierungsstelle/PKI/selbstsigniert“ ergibt null Treffer in `dv*` und `fu*`. | Kurzabschnitt „Zertifikate im Überblick“ in 9.3 oder 11.3 (Aufbau, Kette, Ablauf, Erneuerung, vertrauenswürdig hinterlegen) und Querverweis aus 11.1/12.2. | belegt |
| FL-DV-12 | `dv2/9.2` Skalierung, `dv1/8.3` PoE-Rechnung; Werkzeuge `skalierung`, `energierechner` | **Theorie vor Werkzeug (R5):** Der Skalierungsrechner verlangt Zweierkomplement, vier Byte-/Wortreihenfolgen (ABCD, CDAB, BADC, DCBA), 32-Bit-Float (IEEE 754), Offset, ADC bis 16 Bit; die Theorie nennt nur „Byte- und Wortreihenfolge muss passen“ und das Rechenbeispiel −20 in 11.1. Der Energierechner führt kWh, Energiekosten und Akkulaufzeit (mAh) ein; die Theorie behandelt nur das PoE-Leistungsbudget. | Theorie 9.2 um „16-Bit mit/ohne Vorzeichen (Zweierkomplement), 32-Bit über zwei Register, vier Anordnungen, Float“ ergänzen; 8.3 um „Energie = Leistung × Zeit, Kosten, Batterielaufzeit“ ergänzen **oder** die Aufgabenarten im Werkzeug auf die Theorie beschränken. | belegt |
| FL-DV-13 | `dv1/8.3` Q-8.3-18, Q-8.3-16; Q-9.2-17 | Mehrdeutigkeit zwischen Instrumenten: „Funk-Gateway, das Messwerte von 40 Sensoren sammelt → Zelle/Feldebene“ (Zonenkonzept) widerspricht der Rolle „Kommunikation/Gateway“ (Sensor/Aktor-Instrument) und ist als Datenübergang zur IT je nach Architektur auch DMZ-nah. In Q-8.3-16 gilt „hohe Verfügbarkeit“ für Produktionsnetz **und** Zelle; die Trennung hängt an „begrenztem eigenem Schutz“. | In Q-8.3-18 Zeile „Gateway“ durch „SPS-nahe Funk-Sensoren“ ersetzen oder Zeile streichen; Q-8.3-16 Zeilen nur durch ein einziges, unterscheidendes Merkmal formulieren. | zu prüfen |
| FL-DV-14 | `dv1/8.1` Q-8.1-08 (Not-Halt), `dv1/8.2` Q-8.2-16 („Motorschutz im Anwenderprogramm“) | Not-Halt wird als Reaktion „in der lokalen Steuerung“ eingeordnet. In der Praxis ist der Not-Halt eine eigenständige Sicherheitsfunktion (festverdrahteter Not-Halt-Kreis bzw. Sicherheitssteuerung), nicht Teil des Standard-Anwenderprogramms und nie netzabhängig. Lernende könnten „Not-Halt = SPS-Programm“ mitnehmen. Der Motorschutz wird ebenfalls meist hardwareseitig ausgelöst. | Antwort formulieren: „in der lokalen, sicherheitsgerichteten Steuerung bzw. im Not-Halt-Kreis, nicht über Netz oder Cloud“; Q-8.2-16 Zeile durch „Verriegelung/Selbsthaltung im Anwenderprogramm“ ersetzen. Normbezug (EN ISO 13850) nach R4 nur als Hinweis. | zu prüfen (Norm, R4) |
| FL-DV-15 | `dv5/12.2` „Übergabe“, `dv2/9.4` | Begriffe Übergabe/Abnahme uneinheitlich: 9.4 „Übergabe besteht aus Einweisung, Dokumentation und Abnahme“; 12.2 „Der Abnahme geht die Übergabe mit Einweisung der Anwender voraus“. Q-9.4-13 spricht von „Abnahme unter Vorbehalt“ (rechtlich: Vorbehalt der Mängelrechte). | Eine Lesart festlegen (Vorschlag: Übergabe umfasst Abnahme), Q-9.4-13 vorsichtiger („Abnahme mit dokumentierter Mängelliste“); Rechtsgehalt nach R4 nicht als geprüft ausweisen. | belegt (Widerspruch), Rechtsaussage zu prüfen |
| FL-DV-16 | Redundanz im Kurs | Exakte oder fast gleiche Fragen im selben Kurs: RPO/RTO dreimal (K-9.3-17, K-5.3-17, K-6.4-13), „minimale Rechte“ fünfmal (K-9.3-18, K-6.1-16, K-5.3-13, K-2.2-09, K-12.2-09), Default Deny dreimal (K-8.3-13, K-9.3-08, K-10.4-16), Pyramidenebenen dreimal (siehe FL-DV-07), Q-8.2-11 = Q-11.2-02, K-12.1-16 = K-6.1-01, K-12.1-15 = K-2.3-03, K-8.1-15 = K-12.1-07, Lastenheft/Pflichtenheft, Schutzziele. Rechenbeispiele wiederholen sich: 253 × 0,1 = 25,3 fünfmal (K-9.2-19, Q-9.2-12, K-11.1-15, Q-11.1-11, 9.4-Beispiel); 12 mA = 5 bar fünfmal (K-11.2-10, Q-11.2-06, Q-9.2-06, 9.2, 12.x); 1.500-Byte-Rahmen dreimal. Im Spaced-Repetition-Stapel erscheinen identische Karten mehrfach. | Pro Begriff eine Karte behalten (im thematisch passendsten Fachgebiet), Rechenbeispiele variieren (z. B. 8 mA, 16 mA, andere Messbereiche). | belegt (`near.py`) |
| FL-DV-17 | Passung Spiele/Instrumente | Das Kern-Memory „Ports und Protokolle“ ist das generische IT-Set (40 Paare); **kein** Modbus 502, MQTT 1883/8883, OPC UA 4840, PROFINET, obwohl K-8.2-12, Q-8.2-12, 11.1 diese Ports als Kernstoff führen. Flag-Rätsel und Lernpfade (`scrum`, `osi`, `schutzziele`) enthalten keinen OT-/Industriebezug. Das Troubleshooting-Set „industrie-iot“ ist die einzige Industrie-Spielübung und noch nicht freigeschaltet. | Memory-Runde „Industrie und IoT“ (Ports, Funktionscodes, QoS) ergänzen; ein Lernpfad „Zonenkonzept und Fernwartung“; optional ein Flag mit Modbus-/MQTT-Mitschnitt. | belegt |

### Niedrig

| ID | Datei · Frage/Abschnitt | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-DV-18 | Topologie `produktionszelle-vlan`, `feldnetz-gateway` (`topologie-sim.ts`) | Lösbarkeit bestätigt (Tests laufen grün). **Eindeutigkeit nicht gegeben:** Die Prüfaufträge testen nicht alle Hosts. Per Skript: Router-eth1 auf .254 statt Leitstand-Gateway auf .1 setzen löst `produktionszelle-vlan` (Adressplan sagt „alle IPs stimmen“; SPS-Gateways stehen auf .1). Ebenso `feldnetz-gateway` mit Feld-Gateway-IP .254 statt SPS-Gateway .1. In `produktionszelle-vlan` bleibt sogar ein falsches SPS1-Gateway (.99) unbemerkt. | Je einen Prüfauftrag „SPS → Gateway/Büro“ ergänzen oder die IP-Felder der Router sperren. | belegt (Skript `alt.ts`, `alt2.ts`) |
| FL-DV-19 | Topologie `wartung-ueber-dmz`, `buero-produktion-firewall` | Musterregel „Jumphost → ganzes Produktionsnetz /24“ ist weiter gefasst als das in 8.3/9.3 gelehrte „Quelle, Ziel, Dienst, Richtung einzeln benennen“; Skript zeigt, dass die engere Regel „Jumphost → SPS 1“ ebenfalls als gelöst zählt (gut). Erklärung nennt weder VPN noch Mehrfaktor (Theorie 9.3: Zugang nur über VPN und MFA). | Musterlösung auf einzelnes Ziel einengen oder in der Erklärung ausdrücklich begründen; Hinweis „VPN/MFA sind hier nicht abgebildet“ ergänzen. | belegt |
| FL-DV-20 | `dv2/9.1`, `dv1/8.2`, `dv4/11.4`, TS-Fälle | Uneinheitliche Beispielwelten: VLAN 10 = Büro (9.1, Kranz) aber VLAN 10 = Maschinennetz (TS-Fall 2, 3, Hallbach) und VLAN 20 = Büro; 11.4 zeigt im Segmentierungsplan VLAN 20 bereits als /25, das Beispiel danach beginnt mit /26 und leitet auf /25 hin; 8.2-Inventarliste und F-DV1-01 verwenden S1/Port-Belegungen unterschiedlich. | Zahlenräume je Kurs vereinheitlichen (z. B. VLAN 10 Büro, 20 Maschinen, 30 Gebäude, 99 Management). 11.4: im Plan /26 zeigen. | belegt |
| FL-DV-21 | `dv5/12.2` „Zahlenformat“, DV2 gesamt | Tausendertrennung wechselt: `dv2/*` verwendet Leerzeichen („86 400“, „4 096“), alle anderen Dateien Punkt („86.400“). In 9.1/9.2 stehen zudem „Erklärungen“ mit Leerzeichen, Akzeptanzlisten mit Punkt. Auch Einheiten („1000 Mbit/s“ in Q-10.1-12 ohne Trenner). | Einheitlich Punkt (oder geschütztes Leerzeichen) im ganzen Kurs. | belegt |
| FL-DV-22 | Gesamter Kurs: Quizanweisungen („Ordne“, „Nenne“) gegen Fallaufgaben/Fachgespräch („Berechnen Sie“, „Ihr Projekt“); Troubleshooting („Du bist …“) | Du/Sie-Mischung: Karten und Quiz duzen im Imperativ, 12.x, Fallaufgaben und Fachgespräch siezen; Theorie meist neutral. Gender-Formen einheitlich (`:innen`), aber „Mitarbeitende“, „Mitarbeiter“ (nur `fu`) und „Techniker“ (generisch) gemischt. | Entscheiden (Empfehlung: Lernmaterial Du, Prüfungssimulation Sie) und in der README festschreiben. | belegt |
| FL-DV-23 | Alle Zonen-Instrumente (Q-8.2-15 bis 18, Q-8.3-15 bis 18, Q-11.1-14 bis 17, Q-9.2-14 bis 17) | Erklärungen sind 400 bis 815 Zeichen lang, enthalten Exkurse (Purdue, IEC 62443, „typische Verwechslung“), und werden bei als „leicht/erinnern“ markierten Fragen angezeigt (Q-8.2-15, Q-8.3-15, Q-11.1-14). | Erklärungen auf 2 bis 3 Sätze kürzen, Exkurse in Tipps oder Theorie. „Leicht“ nur vergeben, wenn kein Grenzfall im Item steckt. | belegt |
| FL-DV-24 | Schwierigkeit/Bloom | Rund 45 Einträge mit „leicht“ und Bloom „analysieren/bewerten“ (fast alle „Was passt nicht dazu“ mit offensichtlich absurdem Distraktor, z. B. „Farbe des Versandkartons“, „IMAP“, „Privatadressen“, „Lieblingshersteller der Projektleitung“, „Gehaltsdaten“), 4 mit „schwer/erinnern“ (Q-8.2-12, Q-6.4-05, K-8.2-12, K-6.4-13). Absurde Distraktoren (auch in Q-8.4-12/13, Q-12.2-01, Q-9.3-01) senken die Trennschärfe. | Distraktoren plausibel machen (typische Fehlvorstellungen) oder Bloom auf „verstehen“ setzen. | belegt |
| FL-DV-25 | `dv1/8.3` TCO-Beispiel, `dv4/11.3`, `dv3/10.1` | Richtwerte für Auslastung uneinheitlich: 50 bis 70 % (8.3), Warnung 70 %/kritisch 90 % (10.1), 70 bis 80 % (11.3); „Warn- und Kritisch“ (10.1) gegen „Warn- und Alarmschwelle“ (11.3). TCO nutzt Netto ohne Reserve (21.870 €) statt der Summe mit Reserve (24.057 €). K-10.3-07 nennt „≈ 4,3 Wochen … etwa viereinhalb Wochen“. | Kurz abgleichen und einen Satz „Richtwerte sind Orientierung“ beibehalten; TCO-Basis benennen; Rundung korrigieren. | belegt |
| FL-DV-26 | `dv3/10.3`, `fu3/3.3` (Begriffe) | „Wartung“ wird für alle vier Strategien verwendet (reaktive, vorbeugende, zustandsorientierte, vorausschauende Wartung). In der Instandhaltungssprache (DIN 31051/EN 13306, R4: nicht geprüft) sind Inspektion, Wartung, Instandsetzung, Verbesserung Teile der **Instandhaltung**; „reaktive Wartung“ ist Instandsetzung. Der Rahmenplan spricht von „präventiver Wartung“, die Wortwahl ist daher defensibel. | Hinweisabsatz „Instandhaltungsstrategien“ ergänzen. | zu prüfen (Norm, R4) |
| FL-DV-27 | Q-6.1-19, Q-6.1-23, Q-6.1-25 (`fu6/6.1`, Instrumente `authfaktoren`, `angriffsarten`, noch Entwurf) | (a) „Code per SMS auf das registrierte Handy → Besitz“: nach heutigem Stand gilt SMS-Einmalcode als schwacher Besitzfaktor (SIM-Swapping), die Einordnung als Besitz bleibt vertretbar. (b) Q-6.1-23: „Ein Gerät liest Messwerte mit“ → „Man-in-the-Middle“: reines Mitlesen ist eher Sniffing; MitM verlangt Einschalten in den Weg. (c) Q-6.1-23 und -25 behandeln Brute-Force und Credential-Stuffing gemeinsam (Zone „Passwortangriffe“, passend). | (a) Erklärung um den Satz „SMS gilt als schwächere Variante“ ergänzen; (b) „…liest und verändert“ oder Zeile „klinkt sich zwischen Sensor-Gateway und Leitsystem ein“ verwenden; keine Änderung für (c). | zu prüfen (a), belegt (b) |
| FL-DV-28 | `skalierung.ts` Übungsgenerator | Der Generator verwendet negative Rohwerte auch für Frequenz, Drehzahl, Durchfluss und Spannung (physikalisch unplausibel); nur Temperatur sinnvoll. | Negative Werte nur für Temperatur/Druck relativ. | belegt |
| FL-DV-29 | `mqttlabor.ts` (Header) | Laborgrenzen sind transparent dokumentiert (kein Keep-Alive, keine persistenten Sitzungen, keine ACL). Diese Themen sind aber Prüfstoff (Q-11.4-12 Keep-Alive, TS-Fall 7 ACL, TS-Fall 10 persistente Sitzung/QoS 1). Auftrag „will“ ist trivial lösbar (jedes Topic, das auch abonniert wird). | Hinweis in der Bedienung; Auftrag um Vorgabe „Topic = werk1/halle2/status“ ergänzen. | belegt |

### Hinweis (kein Fehler)

| ID | Gegenstand | Anmerkung |
|---|---|---|
| FL-DV-30 | Modbus „keine Sicherheit“ (K-11.1-04, Q-11.1-06, Q-11.1-14) | Gilt für das klassische Modbus. Es gibt eine Modbus/TCP-Security-Variante mit TLS (Port 802). Ein Halbsatz „klassisch“ in den Karten reicht. |
| FL-DV-31 | Prüfblatt 08 (Troubleshooting-Tabellen) | In der Darstellung stehen Schicht- und Ursachenoptionen in einer Tabelle nebeneinander; die ✔-Markierungen der beiden Spalten wirken wie zusammengehörige Zeilen (z. B. Fall 3, 4, 9). Die Datenquelle ist korrekt. Gefahr von Fehllesung beim Gegenprüfen. |
| FL-DV-32 | Risikomatrix in Q-6.1-11, Q-8.3-12, Q-9.3-11, Q-10.4-12 | Die Matrix „Vermeiden/Absichern/Beobachten/Akzeptieren“ weicht von den „vier klassischen Strategien“ (vermeiden, vermindern, übertragen, akzeptieren, `fu6/6.1`) ab; der Text erklärt die Vereinfachung. Ein Satz „Absichern ≈ vermindern/übertragen, Beobachten ist keine eigene Strategie“ beugt Verwechslung vor. |
| FL-DV-33 | Fehlende Konfigurationsbeispiele | 9.1 spricht über VLANs, Trunks, SSH, „laufende/gespeicherte Konfiguration“, zeigt aber keinen einzigen Befehls- oder Konfigurationsausschnitt. In der Prüfung „Betrieb und Erweiterung“ und „Diagnose“ sind Ausschnitte (Show-Ausgaben, Logs) typisch; die Fallaufgaben decken das teilweise ab. |

---

## 4. Stellungnahme zu den ⚠-Punkten des Prüfblatts 08

| Punkt des Prüfblatts | Stellungnahme |
|---|---|
| Biometrie als eigene Zone (Q-6.1-17 bis 19) | In Ordnung. Fehlerrate/Datenschutz biometrischer Daten sind kein Prüfziel der Fragen. |
| SMS-Einmalcode als Besitz | Vertretbar, Erklärung ergänzen (FL-DV-27 a). |
| Sicherheitsfrage als Wissen | In Ordnung. |
| Salt/Hash (Q-6.1-20 bis 22) | Fachlich richtig. Verfahrensnamen (Argon2, bcrypt) wären Zusatz, nicht Pflicht. |
| Digitale Signatur → asymmetrisch (Q-6.1-22) | Vertretbar, weil Zeilentext „kombiniert dieses Verfahren mit einem Hashverfahren“ eindeutig auf die asymmetrische Zone zielt. |
| Angriffsarten, Grenzfälle MFA/Rate Limiting | In Ordnung; die Zuordnung ist durch die Theorie „Abwehr: Welche Maßnahme passt zu welcher Angriffsart?“ gedeckt. Hinweis FL-DV-27 b. |
| Monitoring-Kategorien (Grenzfälle Ping/Dienst, Syslog) | Grenzfälle sind sauber erklärt. **Aber** Theorie fehlt (FL-DV-08) und Q-10.1-16 Zeile 5 ist ungünstig. Empfehlung: freigeben **nach** FL-DV-08. |
| Pyramide: Lesart ohne Nummerierung, Beschriftung der dritten Ebene | Lesart plausibel (entspricht ISA-95 Ebene 0 bis 4). Beschriftung: siehe FL-DV-06/07. |
| Sensor/Aktor: Schütz, Öffner, Magnetventil | Alle drei Zuordnungen richtig (Schütz = Aktor, als Öffner verdrahteter Näherungsschalter = Sensor, Magnetventil = Aktor). |
| Protokolle: Modbus eigene Zone, Q-11.1-17 OPC UA | Die Doppelrolle ist erklärt, kein Fehler. OPC-UA-Verkürzung und Zertifikatszeile: FL-DV-03/04. |
| Zonenkonzept: MES im Produktionsnetz, „Conduit“ nur in Erklärungen, Funk-Gateway in der Zelle | Vereinfachung ist als Lehrform benannt und fachlich vertretbar. „Conduit“ in den Erklärungen belassen oder einmal in 8.3 einführen. Funk-Gateway: FL-DV-13. |
| TS-Fall 8: abgelaufenes Zertifikat als Schicht 7, Statuscode | Statuscode `BadCertificateTimeInvalid` existiert (0x80140000) und tritt bei abgelaufenem oder noch nicht gültigem Zertifikat auf; er kann auch bei Uhrenabweichung erscheinen, was der Fall durch „Systemzeit stimmt“ ausschließt. Server lehnt abgelaufene Client-Zertifikate üblicherweise ab. **In Ordnung.** |
| TS-Fall 7: Broker-Log „Subscribe verweigert“ | Realismus eingeschränkt: Je nach Broker/Version meldet nur das SUBACK einen Fehlercode, oder die Subscription wird stillschweigend ohne Zustellung belassen. Als Lehrfall vertretbar. **zu prüfen** am Zielbroker; ggf. Symptom umformulieren („SUBACK-Fehlercode 0x80 / Not authorized“). |
| TS-Fall 10: 4,9 Mio. Nachrichten, 1,8 GB | Rechnung stimmt (150/s × 32.400 s = 4.860.000; rund 370 Byte/Nachricht). Ein unbegrenztes Queue-Limit ist je nach Broker-Default eine Konfigurationsentscheidung (z. B. Mosquitto begrenzt standardmäßig); Szenario daher als „Fehlkonfiguration“ zu erkennen. In Ordnung. |
| TS-Fall 5: Zeitzone gegen freilaufende Uhr | Unterscheidung über wachsende, nicht ganzstündige Abweichung ist stichhaltig. |
| TS-Fall 1: 4–20-mA-Messung im Schaltschrank | Der Fall sagt „Anlage freischalten, nur befugtes Personal“; das reicht für ein Lernspiel. Ergänzung „Arbeiten an elektrischen Anlagen nur Elektrofachkräfte“ wie in 9.4. |
| TS-Fälle 2 und 3 ähneln dem Netzwerk-Set | Eigene Beweisführung (VLAN-Zuordnung, Doppeladresse nach Ersatzteileinbau) vorhanden, kein Fehler. Kleine Ambiguität Fall 3: Doppelte Vergabe durch DHCP wäre bei statischer Steuerungsadresse ebenfalls möglich (DHCP-Pool überlappt feste Adresse); Symptom „Panel aus dem Lager mit alter fester Adresse“ trennt aber ausreichend. |

---

## 5. Lücken gegenüber dem Rahmenplan

**Abdeckung Abschnitt E (Digitale Vernetzung), geprüft gegen die Anlage**

| Rahmenplan | Thema im Kurs | Urteil |
|---|---|---|
| E.1 a bis f (CPS erfassen/visualisieren, Bestand analysieren, Sicherheit und Rahmenbedingungen, Komponenten/Unterlagen/Kosten, Kundenabstimmung, Daten auswerten) | DV1 8.1 bis 8.4 | vollständig, mit Rechenbeispielen und Fallaufgaben |
| E.2 a bis f (Komponenten, Visualisierung, Programme/Signal, Sicherheit/Datensicherung, Tests, Inbetriebnahme) | DV2 9.1 bis 9.4 | vollständig |
| E.3 a bis h (Auslastung, Daten/Störungen, Wartungsintervalle, Diagnose/Schwachstellen, Angriffsszenarien, Anomalien, Sicherheitslösungen, Updates) | DV3 10.1 bis 10.4 | vollständig |
| § 38 Abs. 1 Nr. 1 bis 4 (Prüfungsbereich Betrieb und Erweiterung) | DV4 11.1 bis 11.4 | vollständig |
| § 36 (Projektarbeit, Präsentation, Fachgespräch) | DV5 12.1 bis 12.3 + Fachgespräch | vollständig, sehr prüfungsnah |
| Abschnitt A (Nr. 1 bis 8) | FU1 bis FU7 (gemeinsam) | Zuordnung stimmig (A.1/2/7 FU1, A.3 FU2, A.8 FU3, A.4 FU4/5, A.5/6 FU6); WiSo FU7 |

**Inhaltliche Tiefe/Lücken (Priorität absteigend)**
1. **Zertifikate/PKI** fehlen (FL-DV-11).
2. **Funktionale Sicherheit (Safety)**: nur als Begriff erwähnt (9.3, 10.4); keine Abgrenzung Standard-SPS/Sicherheitssteuerung, kein Hinweis auf Schutzeinrichtungen und Zuständigkeit (FL-DV-14).
3. **Rechtsrahmen OT** (NIS2, KRITIS, Cyber Resilience Act, Maschinenverordnung): im ganzen Kurs 0 Treffer. Nach R4 nur als gekennzeichneter, ungeprüfter Hinweis aufnehmen; Meldepflichten werden in 10.4 nur allgemein genannt.
4. **Weitere Feldbus-/Sensorikstandards**: PROFIBUS/CAN nur als Namen, IO-Link, KNX/BACnet (Gebäudeautomation, in 8.1 genannt) fehlen. Für den Fachrichtungsstandard vertretbar, für das Einsatzgebiet „Logistik/Gebäude“ eine Erwähnung wert.
5. **Netzwerkbetriebssystem-Praxis**: keine Konfigurationsausschnitte (FL-DV-33); kein Beispiel für Linux/Windows-Server-Rollen als „Netzwerkbetriebssystem“.
6. **Zeitsynchronisation/PTP** und **Redundanzprotokolle** (RSTP/MRP/PRP) nur als Idee; ausreichend für Grundlagenniveau.
7. **Fragen ohne Theoriebezug (R5)**: siehe FL-DV-08, FL-DV-11, FL-DV-12 (Baseline, Historian, Zertifikate, Byte-/Wortreihenfolgen, Energie). Alle anderen Fragen sind in der Theorie ihres Themas abgedeckt; ich habe kein Lernziel ohne Fragen gefunden.

---

## 6. Didaktische Empfehlungen

1. **Reihenfolge**: sinnvoll (Ist-Analyse, Planung, Aufbau, Betrieb, Erweiterung, Projekt). Zwei Vorgriffe: Zonen-Instrument 8.2 nutzt SPS-Begriffe aus 9.2 (FL-DV-08); das Zonenkonzept in 8.3 steht vor den Sicherheitsgrundlagen 9.3, was gewollt ist.
2. **Beispielwelt**: Durchgängiger Betrieb „Brevanta“ und fiktive Kunden verbessern die Lesbarkeit; Zahlenräume und VLAN-Nummern vereinheitlichen (FL-DV-20).
3. **Rechenbeispiele**: Sehr gut (jede Rechnung ist ausgeführt und kontrollierbar). Variationen statt Wiederholung (FL-DV-16); Kurzantworten robuster machen (FL-DV-10).
4. **Prüfungsnähe**: Die 15 Fallaufgaben sind Stärke des Kurses: realistische Daten (Logs, Messtabellen, Kommunikationsmatrix), vier Teilaufgaben je 5 Punkte, mit Musterlösung inklusive Rechenweg und Alternativen. Das Fachgespräch ist mit Antwortstrategie und Transferfragen gut vorbereitet.
5. **Quiz**: Typenmix angemessen (MC, Zuordnung, Sortieren, Lücke, Kurzantwort, Mehrfachauswahl), aber die Musterverteilung (FL-DV-02) und absurde Distraktoren (FL-DV-24) schwächen die Aussagekraft; Schwierigkeitsverteilung (DV: 100 leicht, 141 mittel, 28 schwer = 10 % schwer) ist für Prüfungsvorbereitung eher leicht, mehr Transfer-/Fehleranalyse-Fragen wären sinnvoll.
6. **Redundanz abbauen** (FL-DV-16) und Erklärungen der Zonen-Fragen kürzen (FL-DV-23).
7. **Sprache**: Niveau passt zu Auszubildenden und Umschüler:innen; Du/Sie klären (FL-DV-22).

---

## 7. Passung der Instrumente, Spiele und Werkzeuge

| Gegenstand | Befund | Empfehlung |
|---|---|---|
| Sichtbar: Pyramide, Sensor/Aktor, Industrieprotokolle, Zonenkonzept (je 4 Fragen) | Inhalt gut, siehe FL-DV-03 bis 07, 13, 14. Welle 2 wurde ohne Einzelentscheidungen freigegeben. | Korrekturliste umsetzen, danach keine Sperre nötig. |
| Entwurf: `authfaktoren` (3), `kryptobausteine` (3), `angriffsarten` (3) | Fachlich in Ordnung; Hinweise FL-DV-27. | **freigeben** nach kleiner Erklärungsergänzung. |
| Entwurf: `monitoring` (3) | Theorie-Lücke und eine ungünstige Zeile (FL-DV-08). | Freigabe **nach** Theorie-Ergänzung und Ersatz von Q-10.1-16 Zeile 5. |
| Troubleshooting „industrie-iot“ (10 Fälle, nicht sichtbar) | Alle Ursachen aus den Symptomen eindeutig ableitbar, Rechnungen stimmen, Schichtzuordnung vertretbar (Fall 8/5/6/7 als Schicht 7 mit Hinweis). Fall 7 Realismus zu prüfen. | **freigeben** nach Klärung Fall 7; in `kurs-angebot.ts` ergänzen. |
| `TOPOLOGIE_INDUSTRIE` (4 Szenarien) | Lösbar (Tests grün, Musterlösungen stimmig), Aufgabentexte, Soll-Tabellen und Erklärungen fachlich richtig. Eindeutigkeit eingeschränkt (FL-DV-18), Regeln etwas weit (FL-DV-19). | Prüfaufträge ergänzen. |
| `TOPOLOGIE_ALLE` (10 generische Szenarien) | Nicht im Einzelnen reviewt; Tests belegen Lösbarkeit. Stichprobe `drei-standorte-routing`, `server-vlan-firewall`: stimmig. | — |
| MQTT-Labor (8 Aufträge) | Topic-Filter, `#` mit Elternebene, `$`-Topics, Mindest-QoS, Retained, Last Will (nicht bei ordentlichem DISCONNECT) entsprechen MQTT 3.1.1; Aufträge haben eindeutige Lösungen. Laborgrenzen dokumentiert (FL-DV-29). | In Ordnung. |
| Skalierungs-/Modbus-Rechner | Formeln und Byteordnungen korrekt (Tests grün). Theorie fehlt teilweise (FL-DV-12), Generator-Details (FL-DV-28). | Theorie ergänzen. |
| Energierechner | Formeln korrekt, Theorie nur PoE (FL-DV-12). | Theorie ergänzen. |
| Memory „Ports“, Kreuzworträtsel „netzwerk-sicherheit“, Lernpfade | Generisch statt Industrie (FL-DV-17). | Industrierunde/Pfad ergänzen. |
| `terminal`-Szenarien (DV-Liste), `flags` | `prozess-last`, `ssh-angriff`, `mehrstufig`, `flag-dns-tunnel`: passende IT-Sicherheitsübungen, aber kein OT-Bezug. Nicht im Detail geprüft. | — |

---

## 8. Hinweise zu Regel R4 (nicht freigegeben, nur Fehlermeldung)

- FIAusbV-Zitate: stichprobenhaft mit dem Gesetzestext abgeglichen, keine Abweichung. Das ist **keine** Rechtsfreigabe.
- IEC 62443 wird nur als Orientierung genannt („für die Ausbildung genügt das Prinzip“); inhaltlich zutreffend, nicht geprüft.
- Werkvertragsrecht (Abnahme, Q-9.4-13), Betriebsrat/Datenschutz (8.4, 9.3, 10.2, 10.4), Meldepflichten (10.4): nur allgemein und mit „rechtlich prüfen“-Hinweis, keine Fehler festgestellt, **ungeprüft**.
- Not-Halt/Normen (FL-DV-14), DIN 31051/EN 13306 (FL-DV-26): Hinweis, nicht belegt.

---

## 9. Nicht geprüft / Grenzen

- Nicht im Einzelnen gelesen: `fu1`, `fu2`, `fu4`, `fu5`, `fu7` (Theorie, Karten, Quiz, Fallaufgaben, Glossare), `fu3` 3.2/3.4, `fu6` 6.2 bis 6.4. Hier nur Massenchecks, Zahlen-/Fristen-Stichproben und Duplikatsuche. Diese Dateien sind in allen vier FI-Kursen identisch und werden dort mitgeprüft.
- Nicht reviewt: Spielinhalte außer „industrie-iot“ (Memory/Kreuzworträtsel/Phishing/Prozessreihenfolge/Kennzahlen-Duell generisch), Terminal-/Flag-Szenarien, Lernpfad-Inhalte, `TOPOLOGIE_ALLE` im Detail, `verfuegbarkeit.ts`.
- Nicht ausgeführt: Oberfläche/Browser (Darstellung der Aufgaben, Shuffle zur Laufzeit außerhalb des gelesenen Codes), Datenbankimport. Die Aussage zum fehlenden Mischen der Optionen stützt sich auf `shapeQuizItem` und `QuizSteps.tsx` (Reihenfolge nach `sortOrder`); ein Laufzeitmischen in einer anderen Schicht wurde nicht gefunden.
- Der Parser zählt „Einträge“ nach Überschriftenebene (K, Q, F, Glossar); die README nennt für den Kurs 1.641 Items bei 608 Quizfragen; aktuell sind es 663 Quizfragen (inzwischen ergänzte Zonen-Fragen), die README-Zahlen sind veraltet (kein Inhaltsmangel).
- Fachliche Aussagen ohne Quelle (Instandhaltungsbegriffe, Not-Halt-Praxis, SMS-Faktor, Mosquitto-Verhalten) sind als „zu prüfen“ gekennzeichnet.
- Hinweis zum Werkzeug: Die ausgeführten Skripte (Parser, Checks, Alternativlösungen) liegen im Scratchpad unter `…\scratchpad\dvr\` und können zur Nachprüfung erneut laufen.
