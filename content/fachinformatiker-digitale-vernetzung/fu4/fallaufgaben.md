---
kurs_slug: fachinformatiker-digitale-vernetzung
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

**Musterlösungshinweise:** Teilaufgabe 1: Das Ausbleiben der Warnung bei genau 8,0 ist ein Logikfehler, weil der Code ohne Fehlermeldung läuft, aber `>` statt `>=` verwendet und damit die Spezifikation „erreicht oder überschreitet" verfehlt; der Absturz bei leerer Liste ist ein Laufzeitfehler, da der Code syntaktisch korrekt ist, aber bei `len(werte) == 0` eine Division durch null auslöst. Syntaxfehler liegt keiner vor. Teilaufgabe 2: Fehler mit leerer Liste reproduzieren, Fehlermeldung und Zeilennummer im Traceback lesen, die Stelle in `mittelwert` eingrenzen (z. B. Zwischenwerte ausgeben oder im Debugger mit Haltepunkt prüfen), Hypothese „leere Liste" prüfen, Ursache beheben, mit Testfällen kontrollieren und dokumentieren. Teilaufgabe 3: Z. B. zuerst `if len(werte) == 0:` prüfen und eine definierte Reaktion liefern (etwa `"KEINE_DATEN"` oder Fehlermeldung mit Logeintrag) sowie `if durchschnitt >= grenzwert:` statt `>`; die gewählte Reaktion bei fehlenden Daten sollte begründet und mit dem Kunden abgestimmt sein. Teilaufgabe 4: Logging mit Stufen (INFO für Prüfergebnis, WARNING/ERROR für fehlende Messwerte) mit Zeitstempel erleichtert die Nachverfolgung nächtlicher Fehler; Testfälle für Normalfall, Grenzwert (Durchschnitt genau gleich Grenzwert) und leere Liste sichern gegen Regressionen; keine sensiblen Daten in Logs.

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

**Musterlösungshinweise:** Teilaufgabe 1: Ausgabe 1: `['T-101', 'T-102']`; Ausgabe 2: `['T-103', 'T-104']`. Die Queue arbeitet nach dem FIFO-Prinzip (First In, First Out). Teilaufgabe 2: Eine Queue entnimmt streng in Eingangsreihenfolge und kennt keine Priorität; denkbar sind eine nach Priorität und Eingangszeit sortierte Liste, mehrere Queues je Prioritätsstufe (zuerst die höchste nicht leere Queue bedienen) oder Ticketdaten in einem Dictionary bzw. in Objekten mit dem Attribut Priorität. Teilaufgabe 3: Beispiel: erstes Ticket als bisher bestes merken; für jedes weitere Ticket prüfen, ob seine Priorität kleiner ist (höhere Dringlichkeit), und es nur dann übernehmen; bei gleicher Priorität wird nicht ersetzt, sodass das zuerst gefundene, also ältere Ticket bei zeitlich geordneter Liste gewinnt (alternativ Vergleich der Eingangszeit); am Ende das gemerkte Ticket ausgeben; leere Liste gesondert behandeln. Teilaufgabe 4: Die lineare Suche prüft im ungünstigen Fall alle 200.000 Einträge, ist aber einfach; da das Archiv sortiert ist, braucht die binäre Suche nur etwa 18 Vergleiche und ist bei wiederholten Suchen klar zu empfehlen; bei sehr häufigem Nachschlagen über die Nummer bietet sich ein Dictionary (Ticketnummer als Schlüssel) oder eine indizierte Datenhaltung an.

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

**Musterlösungshinweise:** Teilaufgabe 1: Zeitvorgabe bis 06:00 Uhr: nicht-funktional (Zeit-/Leistungsanforderung); Datenquelle per Schnittstelle: funktional (bzw. Vorgabe zur Datenbeschaffung); Rot-Markierung ab 3 %: funktional; Linux-Server: Randbedingung (Plattform); keine Mitarbeiternamen: Datenschutzvorgabe, nicht-funktional bzw. Randbedingung. Mögliche Unklarheiten: Ist „über 3 Prozent" exklusiv oder inklusive 3 %, in welchem Format wird die Übersicht geliefert (Datei, E-Mail, Weboberfläche), und was geschieht bei fehlenden Maschinendaten. Teilaufgabe 2: Eingaben: Liste von JSON-Datensätzen mit Maschine, Schicht, Stückzahl, Ausschuss, Zeitpunkt; Verarbeitung: Quote = Ausschuss / Stückzahl * 100, Vergleich mit 3 %; Ausgabe: Übersicht je Maschine mit Quote und Markierung; Fehlerfälle: z. B. Stückzahl 0 (Division durch null vermeiden), fehlende Felder oder unplausible Werte (Ausschuss größer als Stückzahl) verwerfen, protokollieren und kenntlich machen. Datenstruktur z. B. Klasse oder Dictionary mit den fünf Feldern (Text, Text, Ganzzahl, Ganzzahl, Datum/Zeit); Quote 9 / 412 * 100 ≈ 2,18 %, daher keine rote Markierung. Teilaufgabe 3: 200: Antwort parsen und verarbeiten; 401: Anmeldung/Zugangsdaten ungültig, nicht endlos wiederholen, Fehler protokollieren und melden; 404: Ressource nicht gefunden, Adresse bzw. Maschinenkennung prüfen, protokollieren; 500: Serverfehler, nach kurzer Wartezeit begrenzt wiederholen, danach abbrechen und melden. Teilaufgabe 4: Zeitplan z. B. per cron so früh genug starten, dass Wiederholungen vor 06:00 Uhr möglich sind (Puffer einplanen); Skript mit Exit-Code und Logdatei, bei Fehlern Benachrichtigung der Verantwortlichen; wiederholbarer Ablauf ohne Schaden bei Doppelstart; Zugangsdaten nicht im Klartext im Skript, sondern über geschützte Konfiguration oder Umgebungsvariablen, Skript mit geringen Rechten; Test in einer Testumgebung und Dokumentation. Python eignet sich wegen guter Bibliotheken für JSON und HTTP, Plattformunabhängigkeit, einfacher Pflege und vorhandenem Team-Know-how, sofern keine Vorgaben des Kunden dagegensprechen.
