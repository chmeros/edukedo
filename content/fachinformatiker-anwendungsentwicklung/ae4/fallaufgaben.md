---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: AE4
fachgebiet_title: "Entwicklung und Umsetzung von Algorithmen"
thema_code: "AE4-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zum Prüfungsbereich Entwicklung und Umsetzung von Algorithmen der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 14 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus AE4 (11.1–11.4) zu einer zusammenhängenden Situation aus der Softwareentwicklung der Brevanta IT-Systemhaus GmbH, wie sie im schriftlichen Prüfungsbereich „Entwicklung und Umsetzung von Algorithmen" (90 Minuten, § 14 FIAusbV) typisch ist: Code interpretieren, Algorithmen grafisch darstellen, Testdaten ableiten und SQL formulieren. Jede Aufgabe besteht aus einer Ausgangssituation (teils mit Code- oder Tabellenausschnitt) und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-AE4-01 · Fallaufgabe

**Themenbezug:** 11.2 (Code interpretieren) + 11.1 (Struktogramm) + 11.3 (Testdaten) + 11.4 (SQL)

**Ausgangssituation:** Jana Berger entwickelt bei der Brevanta IT-Systemhaus GmbH ein Abrechnungsmodul für Dienstleistungsstunden. Bis einschließlich 20 Stunden gilt der volle Stundensatz, ab mehr als 20 Stunden gibt es 5 Prozent Rabatt auf den Nettobetrag, ab mehr als 40 Stunden 10 Prozent. Danach werden 19 Prozent Umsatzsteuer aufgeschlagen. Die Funktion lautet:

```python
def rechnungsbetrag(stunden, stundensatz):
    netto = stunden * stundensatz
    if stunden > 40:
        netto = netto * 0.9
    elif stunden > 20:
        netto = netto * 0.95
    return round(netto * 1.19, 2)
```

Die Rechnungen werden in einer Datenbank gespeichert (Schema: kunde mit kunde_id als Primärschlüssel und firma; rechnung mit rechnung_id als Primärschlüssel, kunde_id als Fremdschlüssel, datum, betrag, bezahlt mit dem Wert 'J' oder 'N'). Auszug der Daten:

```
kunde:     1 Nordlicht Logistik | 2 Brauerei Hartmann | 3 Stadtwerke Elbtal

rechnung_id | kunde_id | datum      | betrag  | bezahlt
------------+----------+------------+---------+--------
     1      |    1     | 2026-08-05 | 2380.00 |   N
     2      |    1     | 2026-09-02 | 1995.00 |   N
     3      |    2     | 2026-08-20 | 4522.00 |   J
     4      |    3     | 2026-09-10 | 3690.00 |   N
     5      |    3     | 2026-09-15 |  800.00 |   N
     6      |    2     | 2026-09-18 | 1200.00 |   N
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ermitteln Sie schrittweise (z. B. mit einer Trace-Tabelle) die Rückgabewerte der Aufrufe `rechnungsbetrag(50, 100)`, `rechnungsbetrag(30, 80)` und `rechnungsbetrag(20, 90)`.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Stellen Sie den Ablauf der Funktion als Struktogramm dar (eine zeichnerische oder tabellarische Beschreibung der Blöcke genügt) und benennen Sie die verwendeten Grundstrukturen.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Leiten Sie für einen Stundensatz von 100 Euro mindestens sechs Testfälle für die Stundenzahl ab (Normal-, Grenz- und Fehlerfälle) und geben Sie in einer Testdatentabelle jeweils das erwartete Ergebnis an.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** Formulieren Sie eine SQL-Abfrage, die für jeden Kunden (Firma) die Summe der noch nicht bezahlten Rechnungen ausgibt, nur Kunden mit einer offenen Summe von mehr als 3000 Euro berücksichtigt und nach der Summe absteigend sortiert. Geben Sie das Ergebnis für die Beispieldaten an.

**Musterlösungshinweise:** Teilaufgabe 1: (50, 100): netto = 5000, wegen 50 > 40 gilt 5000 * 0,9 = 4500, 4500 * 1,19 = 5355,0. (30, 80): netto = 2400, 30 > 40 ist falsch, 30 > 20 ist wahr, also 2400 * 0,95 = 2280, 2280 * 1,19 = 2713,2. (20, 90): netto = 1800, weder 20 > 40 noch 20 > 20 ist wahr, es gibt keinen Rabatt, 1800 * 1,19 = 2142,0. Teilaufgabe 2: Blockfolge: (1) Sequenz: netto = stunden * stundensatz; (2) Auswahl mit Kopf „stunden > 40?": Zweig „ja" setzt netto = netto * 0,9, Zweig „nein" enthält eine weitere (verschachtelte) Auswahl „stunden > 20?" mit „ja": netto = netto * 0,95 und „nein": leer; (3) Sequenz: Rückgabe round(netto * 1,19; 2). Verwendet werden Sequenz und (verschachtelte) zweiseitige Auswahl, keine Schleife. Teilaufgabe 3 (Beispiel, Stundensatz 100): Stunden 0 → 0,0 (Grenzfall unten); 20 → 2380,0 (höchster Wert ohne Rabatt); 21 → 2374,05 (erster Wert mit 5 Prozent); 40 → 4522,0 (höchster Wert mit 5 Prozent); 41 → 4391,1 (erster Wert mit 10 Prozent); -1 → laut Fachanforderung ungültig, erwartet wird eine Fehlermeldung, die vorliegende Funktion liefert jedoch -119,0 und enthält somit keine Eingabevalidierung. Auffälligkeit: Weil der Rabatt auf den gesamten Betrag gewährt wird, ist die Rechnung bei 21 Stunden (2374,05) niedriger als bei 20 Stunden (2380,0) — fachlich zu klären. Teilaufgabe 4: `SELECT k.firma, SUM(r.betrag) AS offen FROM kunde k JOIN rechnung r ON r.kunde_id = k.kunde_id WHERE r.bezahlt = 'N' GROUP BY k.firma HAVING SUM(r.betrag) > 3000 ORDER BY offen DESC;` Ergebnis: Stadtwerke Elbtal 4490 (3690 + 800) und Nordlicht Logistik 4375 (2380 + 1995); die Brauerei Hartmann hat nur 1200 offen und fällt wegen der HAVING-Bedingung heraus, ihre bezahlte Rechnung 3 ist durch WHERE bereits ausgeschlossen.

---

#### F-AE4-02 · Fallaufgabe

**Themenbezug:** 11.2 (Fehlersuche) + 11.1 (Zustandsdiagramm) + 11.4 (SQL, Manipulation)

**Ausgangssituation:** Im Support-Portal für einen Kunden von Brevanta werden Tickets verwaltet. Ein Entwickler hat eine Funktion geschrieben, die zählen soll, wie viele Tickets mit der Priorität „hoch" noch offen sind. Der Support-Leiter erwartet bei den Testdaten den Wert 2, die Ausgabe lautet aber anders. Code:

```python
tickets = [
    {"id": 1, "prio": "hoch",    "status": "offen"},
    {"id": 2, "prio": "niedrig", "status": "offen"},
    {"id": 3, "prio": "hoch",    "status": "erledigt"},
    {"id": 4, "prio": "niedrig", "status": "offen"},
    {"id": 5, "prio": "hoch",    "status": "offen"},
    {"id": 6, "prio": "mittel",  "status": "offen"},
]

def offene_hohe(tickets):
    anzahl = 0
    for i in range(1, len(tickets)):
        t = tickets[i]
        if t["prio"] == "hoch" and t["status"] == "offen":
            anzahl += 1
    return anzahl

print(offene_hohe(tickets))
```

Dieselben Daten liegen in der Datenbank vor (Tabelle ticket mit ticket_id als Primärschlüssel, titel, prio, status und ma_id als Fremdschlüssel auf mitarbeiter; Tabelle mitarbeiter mit ma_id und name):

```
ticket_id | titel                  | prio    | status   | ma_id
----------+------------------------+---------+----------+------
    1     | Login-Fehler Portal    | hoch    | offen    |   1
    2     | Druckvorlage fehlt     | niedrig | offen    |   4
    3     | Export bricht ab       | hoch    | erledigt |   2
    4     | Schriftgröße anpassen  | niedrig | offen    |   4
    5     | Datenimport hängt      | hoch    | offen    |   2
    6     | Passwort-Reset Mail    | mittel  | offen    |   1

mitarbeiter: 1 Jana Berger | 2 Tom Weiß | 4 Lars Quandt
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Verfolgen Sie die Schleife mit einer Trace-Tabelle (Schleifenvariable i, Ticket-ID, Bedingung erfüllt?, Wert von anzahl nach dem Durchlauf) und geben Sie die Ausgabe des Programms an.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Beurteilen Sie die Funktion: Um welche Fehlerart handelt es sich, was ist die Ursache, und wie lautet eine korrigierte Fassung der Schleife?

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Zustandsdiagramm für den Lebenszyklus eines Tickets mit den Zuständen Neu, In Bearbeitung, Gelöst und Geschlossen. Beschriften Sie die Übergänge mit sinnvollen Ereignissen und berücksichtigen Sie, dass ein gelöstes Ticket vom Kunden zurückgewiesen werden kann.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** (a) Formulieren Sie eine SQL-Anweisung, die alle offenen Tickets mit der Priorität „niedrig" des Mitarbeiters mit der ma_id 4 auf den Status „zurückgestellt" setzt. (b) Formulieren Sie eine Abfrage, die nach dieser Änderung für jeden Mitarbeiter (Name) die Anzahl seiner noch offenen Tickets ausgibt, und geben Sie das Ergebnis für die Beispieldaten an.

**Musterlösungshinweise:** Teilaufgabe 1: Die Schleife läuft mit i = 1 bis 5, also über die Tickets mit den IDs 2 bis 6. i = 1 (Ticket 2, niedrig): Bedingung nicht erfüllt, anzahl 0. i = 2 (Ticket 3, hoch, erledigt): nicht erfüllt, 0. i = 3 (Ticket 4, niedrig): nicht erfüllt, 0. i = 4 (Ticket 5, hoch, offen): erfüllt, anzahl 1. i = 5 (Ticket 6, mittel): nicht erfüllt, 1. Ausgabe: 1. Teilaufgabe 2: Es ist ein Logikfehler (Off-by-one): `range(1, len(tickets))` beginnt bei Index 1 und überspringt damit Index 0, also Ticket 1 (hoch, offen), das mitgezählt werden müsste; richtig wäre der Wert 2 (Tickets 1 und 5). Korrektur: `for i in range(len(tickets)):` oder einfacher `for t in tickets:` mit der Bedingung im Schleifenkörper. Teilaufgabe 3: Startzustand (ausgefüllter Kreis) führt nach „Neu"; Neu zu In Bearbeitung beim Ereignis „Ticket zugewiesen"; In Bearbeitung zu Gelöst bei „Lösung erfasst"; Gelöst zurück zu In Bearbeitung bei „Kunde weist Lösung zurück"; Gelöst zu Geschlossen bei „Kunde bestätigt" (alternativ: Ablauf einer Frist); von Geschlossen führt der Übergang zum Endzustand. Bewertungsraster: Start- und Endzustand 1 Punkt, vier Zustände 1 Punkt, Vorwärtsübergänge mit Ereignissen 2 Punkte, Rückweg 1 Punkt. Teilaufgabe 4: (a) `UPDATE ticket SET status = 'zurückgestellt' WHERE ma_id = 4 AND prio = 'niedrig' AND status = 'offen';` Betroffen sind die Tickets 2 und 4. (b) `SELECT m.name, COUNT(*) AS offen FROM ticket t JOIN mitarbeiter m ON m.ma_id = t.ma_id WHERE t.status = 'offen' GROUP BY m.name;` Ergebnis nach der Änderung: Jana Berger 2 (Tickets 1 und 6) und Tom Weiß 1 (Ticket 5); Lars Quandt erscheint nicht, weil er keine offenen Tickets mehr hat (bei Bedarf wäre ein LEFT JOIN nötig, um auch Mitarbeitende mit 0 aufzulisten).

---

#### F-AE4-03 · Fallaufgabe

**Themenbezug:** 11.1 (PAP) + 11.2 (Schleife, Endlosschleife) + 11.3 (Testdaten, Grenz- und Fehlerfälle) + 11.4 (SQL, Join und Insert)

**Ausgangssituation:** Für einen Kunden entwickelt Brevanta ein Nachbestellmodul für ein Lager. Ein Lieferant liefert nur in ganzen Losen. Die Funktion ermittelt die Nachbestellmenge, die mindestens nötig ist, damit der Bestand nach der Lieferung nicht mehr unter dem Mindestbestand liegt:

```python
def nachbestellmenge(bestand, mindestbestand, losgroesse):
    menge = 0
    while bestand + menge < mindestbestand:
        menge += losgroesse
    return menge
```

Datenbankschema: artikel (artikel_id PK, bezeichnung, bestand, mindestbestand, lieferant_id FK) und lieferant (lieferant_id PK, name). Datenauszug:

```
artikel_id | bezeichnung          | bestand | mindestbestand | lieferant_id
-----------+----------------------+---------+----------------+-------------
     1     | Netzwerkkabel Cat6   |   12    |       50       |      1
     2     | USB-C-Dockingstation |   30    |       20       |      2
     3     | Monitor 27 Zoll      |    4    |       10       |      2
     4     | Tastatur DE          |   25    |       25       |      1
     5     | Headset              |    0    |       15       |      3

lieferant: 1 Kabelwerk Nord | 2 Technikgroßhandel Sommer | 3 AudioPro Handels GmbH
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Führen Sie `nachbestellmenge(12, 50, 20)` mit einer Trace-Tabelle schrittweise aus und geben Sie außerdem die Rückgabewerte für `nachbestellmenge(50, 50, 20)` und `nachbestellmenge(49, 50, 20)` an.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Stellen Sie den Algorithmus als Programmablaufplan dar (Beschreibung der Sinnbilder in Reihenfolge genügt) und benennen Sie dabei die Form und Bedeutung jedes verwendeten Sinnbilds sowie die Art der Schleife.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Beurteilen Sie, was bei einer Losgröße von 0 geschieht, und leiten Sie anschließend mindestens fünf Testfälle (Eingabewerte und erwartetes Ergebnis) ab, darunter Grenz- und Fehlerfälle.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** (a) Formulieren Sie eine SQL-Abfrage, die alle Artikel unter dem Mindestbestand mit Bezeichnung, Lieferantenname und der Fehlmenge (Mindestbestand minus Bestand) ausgibt, absteigend nach Fehlmenge sortiert, und geben Sie das Ergebnis für die Beispieldaten an. (b) Formulieren Sie eine Anweisung, die den neuen Artikel „Webcam HD" mit der artikel_id 6, dem Bestand 8, dem Mindestbestand 10 und dem Lieferanten 3 anlegt.

**Musterlösungshinweise:** Teilaufgabe 1: Trace für (12, 50, 20): Start menge = 0; Prüfung 12 + 0 = 12 < 50 wahr, menge = 20; Prüfung 12 + 20 = 32 < 50 wahr, menge = 40; Prüfung 12 + 40 = 52 < 50 falsch, Schleife endet; Rückgabe 40. Für (50, 50, 20): 50 < 50 ist falsch, die Schleife wird nie betreten, Rückgabe 0. Für (49, 50, 20): 49 < 50 wahr, menge = 20; 69 < 50 falsch; Rückgabe 20. Teilaufgabe 2: Start (abgerundetes Rechteck); Eingabe bestand, mindestbestand, losgroesse (Parallelogramm); menge = 0 (Rechteck, Verarbeitung); Verzweigung „bestand + menge < mindestbestand?" (Raute); Zweig „ja": menge = menge + losgroesse (Rechteck) mit Ablauflinie zurück vor die Raute; Zweig „nein": Ausgabe menge (Parallelogramm); Ende (abgerundetes Rechteck). Die Raute steht vor dem Schleifenkörper, es handelt sich daher um eine kopfgesteuerte Schleife (Abweisschleife). Teilaufgabe 3: Bei losgroesse = 0 und bestand < mindestbestand bleibt menge dauerhaft 0, die Bedingung bleibt wahr, die Schleife terminiert nie (Endlosschleife); bei negativer Losgröße sinkt die Summe sogar weiter. Der Algorithmus verletzt damit die Endlichkeit; erforderlich ist eine Eingabeprüfung (losgroesse muss größer als 0 sein). Testfälle (Bestand, Mindestbestand, Losgröße → erwartet): (50, 50, 20) → 0 (Grenzfall Bestand gleich Minimum); (49, 50, 20) → 20 (Grenzfall knapp darunter); (30, 50, 20) → 20 (Fehlmenge genau ein Los); (0, 50, 25) → 50 (Fehlmenge genau zwei Lose); (60, 50, 20) → 0 (Bestand über Minimum, Normalfall); (10, 50, 0) → Fehlermeldung/Ablehnung erwartet (Fehlerfall, aktuell Endlosschleife); (10, 50, -5) → Fehlermeldung erwartet (aktuell ebenfalls Endlosschleife). Teilaufgabe 4: (a) `SELECT a.bezeichnung, l.name, a.mindestbestand - a.bestand AS fehlmenge FROM artikel a JOIN lieferant l ON l.lieferant_id = a.lieferant_id WHERE a.bestand < a.mindestbestand ORDER BY fehlmenge DESC;` Ergebnis: Netzwerkkabel Cat6, Kabelwerk Nord, 38; Headset, AudioPro Handels GmbH, 15; Monitor 27 Zoll, Technikgroßhandel Sommer, 6. Die Tastatur (25 gegenüber 25) fällt heraus, weil nicht kleiner, die Dockingstation (30 gegenüber 20) liegt über dem Minimum. (b) `INSERT INTO artikel (artikel_id, bezeichnung, bestand, mindestbestand, lieferant_id) VALUES (6, 'Webcam HD', 8, 10, 3);`
