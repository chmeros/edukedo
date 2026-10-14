---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: FU4
fachgebiet_title: "Programmierung und Softwarelösungen"
thema_code: "FU4-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zu den fachrichtungsübergreifenden Berufsbildpositionen „Entwickeln, Erstellen und Betreuen von IT-Lösungen" und „Programmieren von Softwarelösungen" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 4 und 10 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus FU4 (4.1–4.4) zu einer zusammenhängenden Situation rund um die Brevanta IT-Systemhaus GmbH. Sie sind bewusst auf Grundlagenniveau gehalten und für alle Fachrichtungen geeignet; kurze Codeausschnitte stehen in der Ausgangssituation und müssen gelesen und interpretiert werden. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-FU4-01 · Fallaufgabe

**Themenbezug:** 4.3 (Fehlersuche, Logging) + 4.2 (Kontrollstrukturen, Funktionen) + 4.4 (Spezifikation)

**Ausgangssituation:** Im Smart-Factory-Bereich der Brevanta pflegt Auszubildende Jana Kowalczyk eine kleine Python-Funktion, die für eine Abfüllanlage der Kundin Hellmann Verpackungstechnik GmbH Temperaturwerte prüft. Laut Spezifikation soll ein Alarm ausgelöst werden, sobald der Durchschnitt der letzten Messwerte den Grenzwert erreicht oder überschreitet. Die Anlagenfahrerin meldet zwei Probleme: Bei Messwerten mit Durchschnitt genau 8,0 bei Grenzwert 8,0 kam keine Warnung, und in der Nacht stürzte das Programm ab, als der Sensor kurzzeitig keine Werte lieferte. Hier der Code und ein Auszug der Testausgabe:

```python
def mittelwert(werte):
    summe = 0
    for w in werte:
        summe = summe + w
    return summe / len(werte)

def pruefe_alarm(werte, grenzwert):
    durchschnitt = mittelwert(werte)
    if durchschnitt > grenzwert:
        return "ALARM"
    return "OK"

print(pruefe_alarm([7.5, 8.0, 8.5], 8.0))
print(pruefe_alarm([], 8.0))
```

Ausgabe des Testlaufs: In der ersten Zeile steht OK, danach bricht das Programm mit der Meldung ZeroDivisionError: division by zero ab.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie die beiden gemeldeten Probleme jeweils einer Fehlerart zu (Syntax-, Laufzeit- oder Logikfehler) und begründen Sie Ihre Zuordnung anhand des Codes.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Frau Kowalczyk den Fehler bei der Nachtmeldung systematisch hätte eingrenzen können, und nennen Sie mindestens drei Schritte.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie in Python oder Pseudocode eine korrigierte Fassung der Funktion `pruefe_alarm`, die beide Fehler behebt und bei einer leeren Messwertliste kontrolliert reagiert.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, welche Maßnahmen aus den Bereichen Logging und Testfälle sinnvoll sind, damit solche Fehler künftig früher auffallen.

**Musterlösungshinweise:** Teilaufgabe 1: Das Ausbleiben der Warnung bei genau 8,0 ist ein Logikfehler, weil der Code ohne Fehlermeldung läuft, aber `>` statt `>=` verwendet und damit die Spezifikation „erreicht oder überschreitet" verfehlt; der Absturz bei leerer Liste ist ein Laufzeitfehler, da der Code syntaktisch korrekt ist, aber bei `len(werte) == 0` eine Division durch null auslöst. Syntaxfehler liegt keiner vor.
Teilaufgabe 2: Fehler mit leerer Liste reproduzieren, Fehlermeldung und Zeilennummer im Traceback lesen, die Stelle in `mittelwert` eingrenzen (z. B. Zwischenwerte ausgeben oder im Debugger mit Haltepunkt prüfen), Hypothese „leere Liste" prüfen, Ursache beheben, mit Testfällen kontrollieren und dokumentieren.
Teilaufgabe 3: Z. B. zuerst `if len(werte) == 0:` prüfen und eine definierte Reaktion liefern (etwa `"KEINE_DATEN"` oder Fehlermeldung mit Logeintrag) sowie `if durchschnitt >= grenzwert:` statt `>`; die gewählte Reaktion bei fehlenden Daten sollte begründet und mit dem Kunden abgestimmt sein.
Teilaufgabe 4: Logging mit Stufen (INFO für Prüfergebnis, WARNING/ERROR für fehlende Messwerte) mit Zeitstempel erleichtert die Nachverfolgung nächtlicher Fehler; Testfälle für Normalfall, Grenzwert (Durchschnitt genau gleich Grenzwert) und leere Liste sichern gegen Regressionen; keine sensiblen Daten in Logs.

---

#### F-FU4-02 · Fallaufgabe

**Themenbezug:** 4.2 (Datenstrukturen, Such- und Sortierverfahren, Darstellung) + 4.1 (Sprachauswahl)

**Ausgangssituation:** Im Bereich Managed Services der Brevanta bearbeitet der Service-Desk Störungsmeldungen (Tickets) mehrerer Kunden. Der Fachinformatiker Tobias Brandt prototypisiert ein Hilfsprogramm in Python. Neue Tickets werden hinten angestellt, bearbeitet wird von vorn. Zur Kontrolle hat er folgenden Ausschnitt geschrieben:

```python
from collections import deque

tickets = deque()
tickets.append("T-101")
tickets.append("T-102")
tickets.append("T-103")

bearbeitet = []
bearbeitet.append(tickets.popleft())
tickets.append("T-104")
bearbeitet.append(tickets.popleft())

print(bearbeitet)
print(list(tickets))
```

Außerdem sollen Tickets eine Priorität erhalten (1 = höchste, 4 = niedrigste). Der Teamleiter fordert, dass immer das Ticket mit der höchsten Priorität als Nächstes bearbeitet wird, bei gleicher Priorität das ältere zuerst. Zusätzlich sollen die rund 200.000 abgeschlossenen Tickets aus dem Archiv nach Ticketnummer durchsuchbar sein; die Nummern liegen im Archiv aufsteigend sortiert vor.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Geben Sie an, welche beiden Zeilen das Programm ausgibt, und nennen Sie das Prinzip der verwendeten Datenstruktur.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie, warum die einfache Queue die Forderung des Teamleiters nach Priorisierung allein nicht erfüllt, und schlagen Sie vor, wie sich die Datenhaltung ändern ließe.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Formulieren Sie in Pseudocode einen Algorithmus, der aus einer Liste offener Tickets (jeweils mit Ticketnummer und Priorität) das Ticket mit der höchsten Priorität bestimmt. Erläutern Sie kurz, wie Sie den Fall gleicher Priorität berücksichtigen.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie für die Suche im sortierten Archiv die lineare und die binäre Suche und treffen Sie eine begründete Empfehlung. Nennen Sie außerdem eine Alternative, wenn Tickets sehr häufig über ihre Nummer nachgeschlagen werden.

**Musterlösungshinweise:** Teilaufgabe 1: Ausgabe 1: `['T-101', 'T-102']`; Ausgabe 2: `['T-103', 'T-104']`. Die Queue arbeitet nach dem FIFO-Prinzip (First In, First Out).
Teilaufgabe 2: Eine Queue entnimmt streng in Eingangsreihenfolge und kennt keine Priorität; denkbar sind eine nach Priorität und Eingangszeit sortierte Liste, mehrere Queues je Prioritätsstufe (zuerst die höchste nicht leere Queue bedienen) oder Ticketdaten in einem Dictionary bzw. in Objekten mit dem Attribut Priorität.
Teilaufgabe 3: Beispiel: erstes Ticket als bisher bestes merken; für jedes weitere Ticket prüfen, ob seine Priorität kleiner ist (höhere Dringlichkeit), und es nur dann übernehmen; bei gleicher Priorität wird nicht ersetzt, sodass das zuerst gefundene, also ältere Ticket bei zeitlich geordneter Liste gewinnt (alternativ Vergleich der Eingangszeit); am Ende das gemerkte Ticket ausgeben; leere Liste gesondert behandeln.
Teilaufgabe 4: Die lineare Suche prüft im ungünstigen Fall alle 200.000 Einträge, ist aber einfach; da das Archiv sortiert ist, braucht die binäre Suche nur etwa 18 Vergleiche und ist bei wiederholten Suchen klar zu empfehlen; bei sehr häufigem Nachschlagen über die Nummer bietet sich ein Dictionary (Ticketnummer als Schlüssel) oder eine indizierte Datenhaltung an.

---

#### F-FU4-03 · Fallaufgabe

**Themenbezug:** 4.4 (Spezifikation, Datenmodell, Schnittstellen) + 4.3 (Automatisierung, Zeitplanung) + 4.1 (Sprachauswahl)

**Ausgangssituation:** Die Datenanalyse der Brevanta soll für den Kunden Rheinlicht Metallbau GmbH eine tägliche Ausschussübersicht erstellen. Der Kunde schreibt in seiner Anfrage: „Wir möchten jeden Morgen bis 06:00 Uhr eine Übersicht der Ausschussquote je Maschine für die Nachtschicht. Die Daten holen Sie bitte über die Schnittstelle unseres Fertigungssystems ab. Liegt die Quote über 3 Prozent, soll die Maschine in der Übersicht rot markiert werden. Die Auswertung läuft auf einem unserer Linux-Server. Zugangsdaten stellen wir Ihnen separat zur Verfügung. Mitarbeiternamen dürfen dabei nicht verarbeitet werden." Die Schnittstelle liefert pro Maschine einen JSON-Datensatz, z. B.:

```json
{
  "maschine": "CNC-07",
  "schicht": "Nacht",
  "stueckzahl": 412,
  "ausschuss": 9,
  "gemeldet_am": "2026-10-03T22:00:00"
}
```

Die Ausschussquote ergibt sich aus Ausschuss geteilt durch Stückzahl, multipliziert mit 100. Das Entwicklungsteam überlegt, hierfür ein Python-Skript zu verwenden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie die fünf Wünsche des Kunden (Zeitvorgabe, Datenquelle, Rot-Markierung, Plattform, Datenschutzvorgabe) jeweils einer Kategorie zu (funktionale Anforderung, nicht-funktionale Anforderung oder Randbedingung) und nennen Sie eine Unklarheit, die vor der Umsetzung mit dem Kunden zu klären ist.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen kurzen Spezifikationsausschnitt (Eingaben, Verarbeitung, Ausgabe, mindestens ein Fehlerfall) und leiten Sie aus dem JSON-Beispiel eine passende Datenstruktur ab. Berechnen Sie für das Beispiel die Ausschussquote und geben Sie an, ob die Maschine rot markiert würde.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie das Skript beim Abruf der Daten auf die HTTP-Statuscodes 200, 401, 404 und 500 reagieren sollte.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, wie die tägliche Ausführung zuverlässig und sicher automatisiert werden sollte (Zeitplanung, Fehlerbehandlung, Logging, Umgang mit Zugangsdaten), und begründen Sie, warum Python hier eine sinnvolle Sprachwahl sein kann.

**Musterlösungshinweise:** Teilaufgabe 1: Zeitvorgabe bis 06:00 Uhr: nicht-funktional (Zeit-/Leistungsanforderung); Datenquelle per Schnittstelle: funktional (bzw. Vorgabe zur Datenbeschaffung); Rot-Markierung ab 3 %: funktional; Linux-Server: Randbedingung (Plattform); keine Mitarbeiternamen: Datenschutzvorgabe, nicht-funktional bzw. Randbedingung. Mögliche Unklarheiten: Ist „über 3 Prozent" exklusiv oder inklusive 3 %, in welchem Format wird die Übersicht geliefert (Datei, E-Mail, Weboberfläche), und was geschieht bei fehlenden Maschinendaten.
Teilaufgabe 2: Eingaben: Liste von JSON-Datensätzen mit Maschine, Schicht, Stückzahl, Ausschuss, Zeitpunkt; Verarbeitung: Quote = Ausschuss / Stückzahl * 100, Vergleich mit 3 %; Ausgabe: Übersicht je Maschine mit Quote und Markierung; Fehlerfälle: z. B. Stückzahl 0 (Division durch null vermeiden), fehlende Felder oder unplausible Werte (Ausschuss größer als Stückzahl) verwerfen, protokollieren und kenntlich machen. Datenstruktur z. B. Klasse oder Dictionary mit den fünf Feldern (Text, Text, Ganzzahl, Ganzzahl, Datum/Zeit); Quote 9 / 412 * 100 ≈ 2,18 %, daher keine rote Markierung.
Teilaufgabe 3: 200: Antwort parsen und verarbeiten; 401: Anmeldung/Zugangsdaten ungültig, nicht endlos wiederholen, Fehler protokollieren und melden; 404: Ressource nicht gefunden, Adresse bzw. Maschinenkennung prüfen, protokollieren; 500: Serverfehler, nach kurzer Wartezeit begrenzt wiederholen, danach abbrechen und melden.
Teilaufgabe 4: Zeitplan z. B. per cron so früh genug starten, dass Wiederholungen vor 06:00 Uhr möglich sind (Puffer einplanen); Skript mit Exit-Code und Logdatei, bei Fehlern Benachrichtigung der Verantwortlichen; wiederholbarer Ablauf ohne Schaden bei Doppelstart; Zugangsdaten nicht im Klartext im Skript, sondern über geschützte Konfiguration oder Umgebungsvariablen, Skript mit geringen Rechten; Test in einer Testumgebung und Dokumentation. Python eignet sich wegen guter Bibliotheken für JSON und HTTP, Plattformunabhängigkeit, einfacher Pflege und vorhandenem Team-Know-how, sofern keine Vorgaben des Kunden dagegensprechen.

---

#### F-FU4-04 · Fallaufgabe

**Themenbezug:** 4.2 (Sortier- und Suchverfahren, Ablauftabellen, Aufwand) + 4.3 (Fehlersuche)

**Ausgangssituation:** Im Smart-Factory-Bereich der Brevanta betreut der Auszubildende Niklas Berger ein kleines Python-Programm auf dem Bediengerät einer Abfüllanlage der Kundin Hellmann Verpackungstechnik GmbH. Zur Schichtübergabe gibt das Programm die Stillstandsdauern der letzten sechs Störungen in Minuten aufsteigend sortiert aus. Herr Berger hat dafür einen Insertionsort selbst programmiert: Das jeweils nächste Element rückt durch Vertauschen mit dem linken Nachbarn nach vorn, solange dieser größer ist; je Blick auf den linken Nachbarn wird ein Vergleich gezählt, links vom ersten Element wird nicht verglichen. Seine Testliste lautet [14, 9, 21, 6, 17, 11]. Im Code-Review möchte die Teamleitung das Verfahren mit einer Ablauftabelle nachvollziehen und mit Bubblesort (ohne vorzeitigen Abbruch: n − 1 Durchläufe, im k-ten Durchlauf n − k Vergleiche benachbarter Paare) und Selectionsort (getauscht wird nur, wenn das Minimum nicht schon an seinem Platz steht) vergleichen. Außerdem schlägt das Programm Klartexte zu Fehlercodes in einer aufsteigend sortierten Liste nach: [102, 117, 134, 158, 203, 219, 245, 287, 301, 336, 352, 410]. Herr Berger hat dafür folgende Funktion geschrieben:

```python
def binaere_suche(liste, gesucht):
    links = 0
    rechts = len(liste) - 1
    while links <= rechts:
        mitte = len(liste) // 2
        if liste[mitte] == gesucht:
            return mitte
        elif liste[mitte] < gesucht:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1
```

Beim Test findet die Funktion den Code 245 sofort; bei der Suche nach dem Code 301 reagiert das Bediengerät nicht mehr. Ein Kollege schlägt zudem vor, Herrn Bergers Funktionen auch für das zentrale Störmeldungsarchiv zu verwenden. Dort liegen rund 500.000 Meldungen mehrerer Anlagen, es sind etwa 200 Suchen nach einer Meldungsnummer am Tag zu erwarten, und das Archiv wird vor jeder Suche neu aus den Anlagen unsortiert zusammengeführt. Sein Vorschlag: vor jeder Suche das Archiv mit dem Insertionsort nach Meldungsnummer sortieren und danach binär suchen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Erstellen Sie für die Testliste eine Ablauftabelle des Insertionsorts mit den Spalten Durchlauf, Liste nach dem Durchlauf, Vergleiche und Vertauschungen, und geben Sie die Gesamtzahl der Vergleiche und der Vertauschungen an.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Ermitteln Sie für Bubblesort und Selectionsort an derselben Testliste jeweils die Liste nach dem ersten Durchlauf sowie die Gesamtzahl der Vergleiche und Vertauschungen, und erklären Sie die Unterschiede bei der Zahl der Vertauschungen zwischen den drei Verfahren.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Erklären Sie, warum die Funktion `binaere_suche` den Code 245 findet, bei 301 aber nicht mehr endet, und korrigieren Sie die fehlerhafte Zeile. Führen Sie die Suche mit der korrigierten Funktion für die Codes 301 und 140 als Tabelle durch (links, rechts, mitte, Wert an der Mitte, Entscheidung), und geben Sie jeweils das Ergebnis und die Zahl der Vergleiche an.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie den Vorschlag für das Störmeldungsarchiv anhand der Zahl der Vergleiche im ungünstigsten Fall, und empfehlen Sie ein besseres Vorgehen.

**Musterlösungshinweise:** Teilaufgabe 1 (Punkteraster: Tabelle 3 Punkte, je fehlerhafter Zeile 1 Punkt Abzug; Gesamtzahl der Vergleiche 1 Punkt, der Vertauschungen 1 Punkt): Durchlauf 0 (Ausgangslage): [14, 9, 21, 6, 17, 11]; Durchlauf 1 (9 einfügen): [9, 14, 21, 6, 17, 11], 1 Vergleich, 1 Vertauschung (Index 0 erreicht); Durchlauf 2 (21 einfügen): [9, 14, 21, 6, 17, 11], 1 Vergleich, 0 Vertauschungen; Durchlauf 3 (6 einfügen): [6, 9, 14, 21, 17, 11], 3 Vergleiche, 3 Vertauschungen (an 21, 14 und 9 vorbei bis Index 0); Durchlauf 4 (17 einfügen): [6, 9, 14, 17, 21, 11], 2 Vergleiche, 1 Vertauschung (21 > 17 tauschen, 14 > 17 nein); Durchlauf 5 (11 einfügen): [6, 9, 11, 14, 17, 21], 4 Vergleiche, 3 Vertauschungen (an 21, 17 und 14 vorbei, 9 > 11 nein). Gesamt 1 + 1 + 3 + 2 + 4 = 11 Vergleiche und 8 Vertauschungen.
Teilaufgabe 2 (Punkteraster: Bubblesort 1,5 Punkte und Selectionsort 1,5 Punkte, jeweils Liste nach Durchlauf 1 und beide Gesamtzahlen; Erklärung 2 Punkte): Bubblesort: nach Durchlauf 1 [9, 14, 6, 17, 11, 21]; 15 Vergleiche (5 + 4 + 3 + 2 + 1 = 6 · 5 ÷ 2), 8 Vertauschungen (Durchlauf 1: 4, Durchlauf 2: 2, Durchlauf 3: 2, Durchläufe 4 und 5: 0). Selectionsort: nach Durchlauf 1 [6, 9, 21, 14, 17, 11] (Minimum 6 mit 14 getauscht); 15 Vergleiche, 2 Vertauschungen (Durchlauf 1: 6 mit 14, Durchlauf 3: 11 mit 21; in den Durchläufen 2, 4 und 5 steht das Minimum schon an seinem Platz). Erklärung: Bubblesort und Insertionsort brauchen gleich viele Vertauschungen (je 8), weil sie nur benachbarte, falsch herum stehende Elemente vertauschen und jede solche Vertauschung genau eine Fehlstellung beseitigt (ein Paar, bei dem ein größeres vor einem kleineren Element steht); die Testliste hat 8 Fehlstellungen: (14, 9), (14, 6), (14, 11), (9, 6), (21, 6), (21, 17), (21, 11), (17, 11). Selectionsort tauscht über größere Entfernung und bringt mit jeder Vertauschung ein Element direkt an seinen endgültigen Platz, deshalb höchstens n − 1 = 5 Vertauschungen, hier 2. Anerkannt wird auch der Hinweis, dass Insertionsort mit 11 statt 15 Vergleichen auskommt, weil er abbricht, sobald die Einfügestelle gefunden ist.
Teilaufgabe 3 (Punkteraster: Fehlerursache 1,5 Punkte, Korrektur 1 Punkt, Tabelle 301 und Tabelle 140 je 1 Punkt, Ergebnisse und Vergleichszahlen 0,5 Punkte): `mitte = len(liste) // 2` ist bei zwölf Einträgen immer 6 (Wert 245), unabhängig vom Suchbereich. Bei 245 trifft deshalb gleich der erste Vergleich. Bei 301 wird links auf 7 gesetzt, die Mitte bleibt aber 6, der Vergleich 245 < 301 setzt links immer wieder auf 7, und die Bedingung links <= rechts (7 <= 11) bleibt wahr: Endlosschleife, ein Logikfehler ohne Fehlermeldung (bei 140 entsprechend mit rechts = 5). Korrektur: `mitte = (links + rechts) // 2`. Suche nach 301: Vergleich 1: links 0, rechts 11, mitte 5, Wert 219 < 301, links wird 6; Vergleich 2: links 6, rechts 11, mitte 8, Wert 301, gefunden; Ergebnis Index 8 nach 2 Vergleichen. Suche nach 140: Vergleich 1: links 0, rechts 11, mitte 5, Wert 219 > 140, rechts wird 4; Vergleich 2: links 0, rechts 4, mitte 2, Wert 134 < 140, links wird 3; Vergleich 3: links 3, rechts 4, mitte 3, Wert 158 > 140, rechts wird 2; links 3 > rechts 2, Suchbereich leer; Ergebnis −1 nach 3 Vergleichen. Höchstens wären ⌊log₂ 12⌋ + 1 = 4 Vergleiche nötig; die lineare Suche bräuchte 9 bzw. 12.
Teilaufgabe 4 (Punkteraster: Vergleichszahlen 2 Punkte, Bewertung 1,5 Punkte, Empfehlung 1,5 Punkte): Der Insertionsort braucht im ungünstigsten Fall (absteigend sortierte Daten) n · (n − 1) ÷ 2 = 500.000 · 499.999 ÷ 2 = 124.999.750.000 Vergleiche, und das vor jeder der etwa 200 Suchen am Tag, weil das Archiv jedes Mal unsortiert neu zusammengeführt wird; die binäre Suche danach braucht höchstens ⌊log₂ 500.000⌋ + 1 = 18 + 1 = 19 Vergleiche (2¹⁸ = 262.144 ≤ 500.000 < 524.288). Selbst die lineare Suche ohne Sortieren käme mit höchstens 500.000 Vergleichen je Suche aus, bei 200 Suchen mit höchstens 100.000.000 am Tag. Bewertung: Wiederholtes Sortieren mit einem Verfahren, dessen Aufwand quadratisch wächst, macht den Vorteil der binären Suche um ein Vielfaches zunichte; für die sechs Werte der Schichtübergabe ist der Insertionsort dagegen völlig ausreichend. Empfehlung: das Archiv nicht vor jeder Suche neu zusammenführen, sondern einmal (bzw. bei neuen Meldungen) zusammenführen, mit der optimierten Sortierfunktion der Sprache (z. B. `sorted`) sortieren und sortiert halten (neue Meldungen an passender Stelle einfügen) und dann binär suchen, oder die Meldungen über ein Dictionary mit der Meldungsnummer als Schlüssel bzw. über eine Datenbank mit Index nachschlagen. Anzuerkennen ist auch der Hinweis, dass ein erneuter Insertionsort auf bereits sortierten Daten nur n − 1 = 499.999 Vergleiche braucht; dann ist das wiederholte Sortieren zwar billig, aber überflüssig. Jede schlüssig begründete Lösung, die das Sortieren vor jeder Suche vermeidet, ist anzuerkennen.
Folgefehler: Wird in Teilaufgabe 1 ein Element falsch eingefügt, sind die folgenden Zeilen mit dem falschen Zwischenstand zu bewerten, wenn die Zählregel richtig angewendet wird; die Erklärung in Teilaufgabe 2 wird nach der Schlüssigkeit mit den eigenen Zahlen bewertet. Wird in Teilaufgabe 3 die Mitte konsequent aufgerundet statt abgerundet, ist der Weg als richtig zu werten (301: Mitten 6, 9, 8 mit 3 Vergleichen; 140: Mitten 6, 3, 1, 2 mit 4 Vergleichen und Ergebnis −1), sofern die Mitte aus dem aktuellen Suchbereich berechnet wird.
