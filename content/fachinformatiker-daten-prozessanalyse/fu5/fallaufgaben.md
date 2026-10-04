---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: FU5
fachgebiet_title: "Datenbanken und Speicherlösungen"
thema_code: "FU5-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zum Fachgebiet Datenbanken und Speicherlösungen; Grundlage ist die Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 4 e und 9 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus FU5 (5.1–5.3) zu zusammenhängenden Situationen rund um die Brevanta IT-Systemhaus GmbH, wie sie in praxisnahen schriftlichen Prüfungsaufgaben typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-FU5-01 · Fallaufgabe

**Themenbezug:** 5.1 (Normalisierung, Schlüssel, Integrität, ER-Modell)

**Ausgangssituation:** Im Smart-Factory-Bereich der Brevanta pflegt das Wartungsteam für einen Industriekunden die Wartungsaufträge bisher in einer einzigen Tabelle. Jede Zeile enthält ein verbautes Ersatzteil eines Wartungsauftrags. Der Primärschlüssel der Tabelle besteht aus der Kombination auftrag_nr und teil_nr. Ein Auszug:

wartung
auftrag_nr | teil_nr | teil_bezeichnung | menge | datum      | anlage_id | anlage_bezeichnung | standort
W-1001     | T-17    | Dichtung 12 mm   | 2     | 2026-09-14 | A-3       | Abfüllanlage 3     | Werk Kassel
W-1001     | T-22    | Temperatursensor | 1     | 2026-09-14 | A-3       | Abfüllanlage 3     | Werk Kassel
W-1002     | T-17    | Dichtung 12 mm   | 4     | 2026-09-20 | A-5       | Fräszentrum 5      | Werk Kassel

Die Tabelle soll in eine relationale Datenbank überführt werden. Die Entwicklerin Mara Hellwig soll das Schema bis zur dritten Normalform entwerfen.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Prüfen Sie, ob die Tabelle die 1. Normalform erfüllt, und analysieren Sie, gegen welche Normalform sie verstößt. Nennen Sie dazu zwei Spalten bzw. Spaltengruppen und von welchem Teil des Primärschlüssels sie abhängen.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Prüfen Sie, welche Abhängigkeit nach Herstellung der 2. Normalform noch die 3. Normalform verletzen würde, und beschreiben Sie eine Anomalie, die dadurch entstehen kann.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Tabellenschema in 3. Normalform. Geben Sie je Tabelle die Spalten an und kennzeichnen Sie Primär- und Fremdschlüssel sowie die Kardinalitäten der Beziehungen.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Der Kunde möchte ausgemusterte Anlagen aus dem Anlagenbestand löschen, die Wartungshistorie muss aber vollständig erhalten bleiben. Bewerten Sie, welche Löschregel (RESTRICT oder CASCADE) für den Fremdschlüssel von der Wartungsauftrags-Tabelle auf die Anlagen-Tabelle geeignet ist, und nennen Sie eine Alternative zum Löschen.

**Musterlösungshinweise:** Teilaufgabe 1: Alle Zellen enthalten atomare Werte, die 1. Normalform ist erfüllt. Verletzt ist die 2. Normalform durch partielle Abhängigkeiten: datum, anlage_id, anlage_bezeichnung und standort hängen nur von auftrag_nr ab, teil_bezeichnung nur von teil_nr; nur menge hängt vom gesamten Schlüssel ab. Teilaufgabe 2: anlage_bezeichnung und standort hängen von anlage_id ab, also nur transitiv vom Auftrag (auftrag_nr → anlage_id → bezeichnung/standort). Anomalie, z. B.: Wird eine Anlage umbenannt, müssen alle Zeilen aller Aufträge dieser Anlage geändert werden (Änderungsanomalie); eine neue Anlage ohne Wartungsauftrag kann nicht erfasst werden (Einfügeanomalie). Teilaufgabe 3: anlage (anlage_id PK, bezeichnung, standort); ersatzteil (teil_nr PK, bezeichnung); wartungsauftrag (auftrag_nr PK, datum, anlage_id FK); wartungsposition (auftrag_nr FK, teil_nr FK, menge; PK aus auftrag_nr und teil_nr). Kardinalitäten: Anlage 1:n Wartungsauftrag; Wartungsauftrag 1:n Wartungsposition; Ersatzteil 1:n Wartungsposition; damit ist die n:m-Beziehung zwischen Wartungsauftrag und Ersatzteil über die Wartungsposition aufgelöst. Teilaufgabe 4: CASCADE wäre ungeeignet, da mit der Anlage auch alle zugehörigen Wartungsaufträge gelöscht würden und die Historie verloren ginge; RESTRICT (Löschen verweigern, solange Aufträge existieren) schützt die Historie. Alternative: die Anlage nicht löschen, sondern über eine zusätzliche Spalte (z. B. Status oder Ausmusterungsdatum) als nicht mehr aktiv kennzeichnen.

---

#### F-FU5-02 · Fallaufgabe

**Themenbezug:** 5.2 (SQL-Abfragen, Joins, Aggregation, Datenänderung) + 5.3 (Backup, Rechte)

**Ausgangssituation:** Das Managed-Services-Team der Brevanta verwaltet Störungsmeldungen seiner Kunden in einer relationalen Datenbank. Sie sollen für den Teamleiter Jonas Berkel Auswertungen erstellen. Auszug der Tabellen:

kunde (kunde_id PK, name, ort, branche)
1 | Hartmann Metallbau GmbH  | Köln       | Industrie
2 | Nordlicht Logistik AG    | Hamburg    | Logistik
3 | Sonnenhof Apotheken KG   | Köln       | Handel
4 | Rheinwerk Maschinen GmbH | Düsseldorf | Industrie
5 | Kaufhaus Brandt          | Hamburg    | Handel

projekt (projekt_id PK, kunde_id FK, titel, bereich, budget)
101 | 1 | Kundenportal        | Softwareentwicklung | 48000
102 | 1 | Maschinenanbindung  | IoT                 | 32000
103 | 2 | Rechenzentrumsumzug | Systemintegration   | 60000
104 | 3 | Absatzanalyse       | Datenanalyse        | 15000
105 | 4 | Sensor-Dashboard    | IoT                 | 27000

ticket (ticket_id PK, projekt_id FK, prioritaet, status, aufwand_std)
1 | 101 | hoch    | offen    | 6
2 | 101 | niedrig | erledigt | 2
3 | 102 | hoch    | offen    | 8
4 | 103 | mittel  | erledigt | 4
5 | 103 | hoch    | erledigt | 10
6 | 105 | mittel  | offen    | 3
7 | 101 | mittel  | offen    | 5

Abfrage A (von einem Kollegen für die Auswertung „Tickets je Kunde" geschrieben):
SELECT k.name, COUNT(t.ticket_id) AS anzahl
FROM kunde k
INNER JOIN projekt p ON p.kunde_id = k.kunde_id
INNER JOIN ticket t ON t.projekt_id = p.projekt_id
GROUP BY k.name;

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Der Teamleiter möchte alle offenen Tickets mit der Priorität „hoch" sehen, mit Kundenname, Projekttitel und Ticketnummer, sortiert nach der Ticketnummer. Formulieren Sie die SQL-Abfrage und geben Sie das Ergebnis an.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Für die Kapazitätsplanung soll je Projekt die Anzahl der Tickets und der Gesamtaufwand in Stunden ermittelt werden, wobei nur Projekte mit einem Gesamtaufwand von mehr als 10 Stunden erscheinen sollen. Formulieren Sie die Abfrage und geben Sie das Ergebnis an.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Ein Kollege hat für die Frage „Wie viele Tickets hat jeder Kunde, auch Kunden ohne Tickets?" die in der Ausgangssituation angegebene Abfrage A geschrieben. Geben Sie an, welches Ergebnis Abfrage A mit den obigen Daten liefert, analysieren Sie die Ursache der Abweichung vom gewünschten Ergebnis und korrigieren Sie die Abfrage.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Ein Praktikant führt auf der Produktivdatenbank versehentlich die Anweisung UPDATE ticket SET status = 'erledigt'; ohne WHERE-Klausel aus. Bewerten Sie die Auswirkung und nennen Sie mindestens drei Maßnahmen, die solche Fehler verhindern bzw. ihre Folgen begrenzen.

**Musterlösungshinweise:** Teilaufgabe 1: SELECT k.name, p.titel, t.ticket_id FROM kunde k INNER JOIN projekt p ON p.kunde_id = k.kunde_id INNER JOIN ticket t ON t.projekt_id = p.projekt_id WHERE t.status = 'offen' AND t.prioritaet = 'hoch' ORDER BY t.ticket_id; Ergebnis: zwei Zeilen, nämlich (Hartmann Metallbau GmbH, Kundenportal, 1) und (Hartmann Metallbau GmbH, Maschinenanbindung, 3). Ticket 5 hat zwar Priorität hoch, ist aber erledigt. Teilaufgabe 2: SELECT projekt_id, COUNT(*) AS anzahl, SUM(aufwand_std) AS aufwand FROM ticket GROUP BY projekt_id HAVING SUM(aufwand_std) > 10; Ergebnis: Projekt 101 mit 3 Tickets und 13 Stunden sowie Projekt 103 mit 2 Tickets und 14 Stunden (Projekt 102 hat 8, Projekt 105 hat 3 Stunden und entfallen). Die Bedingung muss in HAVING stehen, nicht in WHERE. Ein Join mit projekt ist zulässig, wenn der Titel mit ausgegeben wird. Teilaufgabe 3: Ergebnis der fehlerhaften Abfrage: nur drei Zeilen, nämlich Hartmann Metallbau GmbH mit 4, Nordlicht Logistik AG mit 2 und Rheinwerk Maschinen GmbH mit 1. Ursache: Der INNER JOIN liefert nur Kunden, für die über Projekt und Ticket ein Partner existiert; Sonnenhof Apotheken KG (Projekt ohne Ticket) und Kaufhaus Brandt (ohne Projekt) fallen heraus. Korrektur: kunde LEFT JOIN projekt und projekt LEFT JOIN ticket verwenden und COUNT(t.ticket_id) beibehalten, das NULL-Werte nicht zählt; Ergebnis dann fünf Zeilen mit 4, 2, 0, 1 und 0 Tickets. Teilaufgabe 4: Alle sieben Tickets wären als erledigt markiert, die Unterscheidung zwischen offenen und erledigten Tickets ginge verloren (Datenverlust ohne Wiederherstellung nicht rückgängig zu machen). Maßnahmen, z. B.: Änderungen zuerst mit einem SELECT mit derselben WHERE-Bedingung prüfen; in einer Transaktion arbeiten und bei Fehlern mit ROLLBACK zurücknehmen; Datenbank regelmäßig sichern und die Wiederherstellung testen; Praktikant:innen nur die minimal nötigen Rechte geben (z. B. nur lesen, Schreibrechte auf der Produktivdatenbank nur über freigegebene Verfahren); Änderungen zunächst in einer Testumgebung ausführen.

---

#### F-FU5-03 · Fallaufgabe

**Themenbezug:** 5.3 (Speicherlösungen, Integration, Zugriffsrechte, Backup) + 5.1 (Datenbankmodelle)

**Ausgangssituation:** Die Brevanta migriert die Datenbank des Kundenportals der Hartmann Metallbau GmbH auf einen neuen Datenbankserver. Bei der Prüfung des geplanten Aufbaus durch die Systemintegratorin Tamara Öztürk fällt auf: Der Datenbankserver soll zur Vereinfachung des Zugriffs durch den Außendienst direkt aus dem Internet erreichbar sein. Die Portal-Anwendung verbindet sich mit dem Administratorkonto des Datenbanksystems; Benutzername und Passwort stehen im Klartext in einer Konfigurationsdatei, die im Versionsverwaltungs-Repository des Entwicklungsteams liegt. Die Verbindung zwischen Anwendungs- und Datenbankserver ist nicht verschlüsselt. Die Daten liegen auf vier Platten zu je 2 TB im RAID 5; als einzige Sicherung wird nachts ein Export der Datenbank in einen Ordner auf demselben Server geschrieben. Der Kunde verlangt, dass im Störungsfall höchstens die Arbeit eines Tages verloren geht (24 Stunden) und der Betrieb innerhalb von vier Stunden wieder läuft. Drei Gruppen greifen auf die Daten zu: die Portal-Anwendung (lesen und schreiben auf Kunden- und Ticketdaten), das Auswertungsteam der Datenanalyse (nur lesen) und die Administration.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie die geplante Konfiguration und nennen Sie mindestens vier Mängel in Bezug auf Zugriffsschutz, Verschlüsselung oder Datensicherung, jeweils mit kurzer Begründung.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Entwerfen Sie nach dem Prinzip der minimalen Rechte ein Rollenkonzept für die drei genannten Gruppen und formulieren Sie für die Auswertungsrolle ein passendes GRANT-Beispiel.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Berechnen Sie die nutzbare Kapazität des bestehenden RAID-5-Verbunds. Der Kunde möchte mit denselben vier Platten den gleichzeitigen Ausfall von zwei Platten verkraften können: Nennen Sie das geeignete RAID-Level mit nutzbarer Kapazität und erläutern Sie, warum auch dieses Level keine Datensicherung ersetzt.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Backup-Konzept, das die Vorgaben des Kunden (24 Stunden maximaler Datenverlust, vier Stunden Wiederherstellungszeit) und die 3-2-1-Regel erfüllt.

**Musterlösungshinweise:** Teilaufgabe 1, z. B.: (1) Datenbankserver direkt aus dem Internet erreichbar — Angriffsfläche; er sollte nur aus dem internen Netz bzw. vom Anwendungsserver erreichbar sein (Netzsegmentierung, Firewall). (2) Anwendung nutzt das Administratorkonto — verstößt gegen das Prinzip der minimalen Rechte, bei Kompromittierung droht Totalzugriff. (3) Zugangsdaten im Klartext im Repository — jeder mit Repository-Zugriff kennt sie; gehören in geschützte Konfiguration bzw. Geheimnis-Verwaltung. (4) Unverschlüsselte Verbindung — Daten können im Netz mitgelesen werden; Verschlüsselung in transit (TLS) nötig. (5) Backup auf demselben Server — kein Schutz bei Totalausfall, Schadsoftware oder Brand; 3-2-1-Regel nicht erfüllt. Auch möglich: fehlende Verschlüsselung at rest, kein Wiederherstellungstest. Teilaufgabe 2: Rolle Anwendung: Lesen und Schreiben (SELECT, INSERT, UPDATE) nur auf die benötigten Tabellen (Kunden-, Projekt-, Ticketdaten), keine Strukturänderungen, keine Benutzerverwaltung, eigenes Konto der Anwendung; Rolle Auswertung: ausschließlich Lesezugriff (SELECT) auf die benötigten Tabellen; Rolle Administration: administrative Rechte, nur für Administrator:innen und nicht für den Betrieb der Anwendung genutzt. GRANT-Beispiel: GRANT SELECT ON ticket TO rolle_auswertung; Teilaufgabe 3: RAID 5 mit vier Platten zu 2 TB: n minus 1 gleich 3 Platten, also 6 TB nutzbar. Gefordert ist RAID 6 (zwei Paritäten, zwei Plattenausfälle verkraftbar): n minus 2 gleich 2 Platten, also 4 TB nutzbar. Hinweis: RAID 10 würde nur je Spiegelpaar einen Ausfall verkraften und ist daher nicht in jedem Fall geeignet. Kein RAID-Level ersetzt ein Backup, da Löschen, Überschreiben, Schadsoftware, Brand oder Diebstahl auf alle Platten wirken. Teilaufgabe 4, z. B.: tägliche Sicherung der Datenbank (24 Stunden Datenverlust als RPO ist damit erfüllbar), z. B. wöchentliche Vollsicherung und tägliche differenzielle Sicherung, da die Wiederherstellung mit Vollsicherung und letzter differenzieller Sicherung schneller als mit vielen inkrementellen Sicherungen geht (RTO vier Stunden); Kopien auf mindestens zwei verschiedenen Medien bzw. Systemen (z. B. separates Speichersystem im Rechenzentrum und verschlüsselter Cloud-Objektspeicher) und mindestens eine Kopie an einem anderen Standort; Verschlüsselung und Zugriffsbeschränkung der Backups; regelmäßiger Wiederherstellungstest, bei dem die tatsächliche Dauer gemessen und mit den vier Stunden verglichen wird; Dokumentation des Verfahrens.
