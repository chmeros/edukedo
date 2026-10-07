# Prüfblatt Spiel — Daten-Detektiv (F-220)

Stand 07.10.2026 · erzeugt aus apps/api/src/db/content/game-datendetektiv-datenqualitaet.ts. **Alle Inhalte sind Entwürfe von Claude.** Alle Namen, Adressen und Werte sind frei erfunden. Das Set `daten` des Beleg-Detektivs für den Kurs Daten- und Prozessanalyse ist **noch nicht sichtbar** (Rahmenentscheidung R3). Die Lernenden tippen auffällige Zeilen an und entscheiden „in Ordnung“ oder „beanstanden“; die Erklärung nennt die Qualitätsdimension nach der Kurstheorie dp4 11.1.

**Prüffragen:** (1) Ist die markierte Auffälligkeit eindeutig ein Mangel, und gibt es keine zweite vertretbare Deutung? (2) Passt die genannte Qualitätsdimension (Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität, Konsistenz) zur Begriffsabgrenzung der Theorie? (3) Sind die fehlerfreien Fälle wirklich fehlerfrei (zum Beispiel die führende Null einer Postleitzahl, die noch offene Lieferung)? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.

### 1. Kundenliste nach dem Import (zu beanstanden)

Aus einem Altsystem wurden vier Kundenzeilen importiert. Jede Kundennummer soll nur einmal vorkommen. Markiere die Zeile, die eine bereits vorhandene Zeile wiederholt.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | K-1042 · Anna Berger · anna.berger@example.test · 50667 Köln | nein | Erste und einzige Zeile zu dieser Kundennummer, alle Angaben sind befüllt und formal gültig. |
| Zeile 2 | K-1043 · Jan Meier · jan.meier@example.test · 20095 Hamburg | nein | Erste Zeile zu dieser Kundennummer; sie ist das Original. |
| Zeile 3 | K-1043 · Jan Meier · jan.meier@example.test · 20095 Hamburg | ja | Redundanz: Die Zeile wiederholt Zeile 2 vollständig (Dublette). Zählungen und Summen würden verfälscht, ein späteres Ändern nur einer Kopie führt zu Widersprüchen. |
| Zeile 4 | K-1044 · Sara Koç · sara.koc@example.test · 40213 Düsseldorf | nein | Eigene Kundennummer, vollständig und gültig. |

*Auflösung:* Zeile 3 ist eine exakte Dublette von Zeile 2 (Redundanz). Exakte Dubletten findet man durch Gruppieren nach den Identifikationsmerkmalen.

### 2. Pflichtfeld E-Mail (zu beanstanden)

Für den Versand der Auftragsbestätigung ist die E-Mail-Adresse eine Pflichtangabe. Prüfe vier importierte Zeilen: Fehlende Angaben und Platzhalter zählen als nicht befüllt.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | K-2010 · Mia Hoffmann · mia.hoffmann@example.test · 50667 Köln | nein | Die Pflichtangabe ist befüllt. |
| Zeile 2 | K-2011 · Lukas Braun · (leer) · 70173 Stuttgart | ja | Vollständigkeit: Das Pflichtfeld E-Mail ist leer. |
| Zeile 3 | K-2012 · Paul Neumann · k. A. · 80331 München | ja | Vollständigkeit: „k. A.“ ist ein Platzhalter und keine E-Mail-Adresse; das Feld gilt als nicht befüllt. |
| Zeile 4 | K-2013 · Julia Roth · julia.roth@example.test · 45127 Essen | nein | Die Pflichtangabe ist befüllt. |

*Auflösung:* Zeile 2 (leer) und Zeile 3 (Platzhalter „k. A.“) haben keine E-Mail-Adresse. Vollständigkeit heißt: Alle für den Zweck nötigen Felder sind wirklich befüllt, nicht nur irgendwie ausgefüllt.

### 3. Postleitzahlen (zu beanstanden)

Eine deutsche Postleitzahl besteht aus genau fünf Ziffern. Prüfe die Postleitzahlen der vier Zeilen auf diese Formatregel.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | K-3001 · Berlin · PLZ 10115 | nein | Fünf Ziffern, formal gültig. |
| Zeile 2 | K-3002 · Köln · PLZ 5067 | ja | Validität: Die Postleitzahl hat nur vier Ziffern und verletzt die Formatregel (vermutlich ging eine führende Null oder eine Ziffer verloren). |
| Zeile 3 | K-3003 · Leipzig · PLZ 4109A | ja | Validität: Eine Postleitzahl enthält nur Ziffern; „A“ verletzt die Formatregel. |
| Zeile 4 | K-3004 · Dresden · PLZ 01067 | nein | Fünf Ziffern; die führende Null gehört zur Postleitzahl und ist gültig. |

*Auflösung:* Zeile 2 (vier Ziffern) und Zeile 3 (Buchstabe) verletzen die Formatregel. Die 01067 ist dagegen gültig: Postleitzahlen müssen als Text gespeichert werden, sonst geht die führende Null verloren.

### 4. Geburtsjahre (zu beanstanden)

In einer Kundendatei vom 7. Oktober 2026 stehen Geburtsjahre. Prüfe, ob sie als Geburtsjahr einer lebenden Person glaubwürdig sind (Format: vierstellige Jahreszahl, alle vier haben das richtige Format).

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | K-4001 · Geburtsjahr 1985 | nein | Glaubwürdig. |
| Zeile 2 | K-4002 · Geburtsjahr 1850 | ja | Plausibilität: Die Angabe wäre über 170 Jahre alt. Das Format ist gültig, der Wert inhaltlich aber unmöglich. |
| Zeile 3 | K-4003 · Geburtsjahr 2031 | ja | Plausibilität: Das Jahr liegt in der Zukunft. |
| Zeile 4 | K-4004 · Geburtsjahr 1962 | nein | Glaubwürdig. |

*Auflösung:* 1850 und 2031 haben das richtige Format (Validität), sind als Geburtsjahre aber unmöglich (Plausibilität). Eine Wertebereichsprüfung findet solche Ausreißer schnell.

### 5. Temperatur im Serverraum (zu beanstanden)

Ein Sensor im klimatisierten Serverraum meldet jede Minute die Raumtemperatur. Hier ein Auszug.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| 10:01 | 21,3 °C | nein | Passt zu einem klimatisierten Raum. |
| 10:02 | 21,5 °C | nein | Kleine Schwankung, normal. |
| 10:03 | 850,0 °C | ja | Plausibilität: 850 °C sind in einem klimatisierten Raum unmöglich. Das ist ein Messfehler oder ein Übertragungsfehler, aber kein echter Wert. |
| 10:04 | 21,4 °C | nein | Passt zur Reihe. |

*Auflösung:* Der Wert 850,0 °C ist ein Ausreißer, den Fachwissen sofort als unmöglich erkennt (Plausibilität). Eine Wertebereichsprüfung mit Mindest- und Höchstwert hätte ihn abgefangen.

### 6. Bestelldaten (zu beanstanden)

Prüfe fünf Bestellungen (keine Gutschriften) auf Gültigkeit und Plausibilität. Das Datumsformat ist JJJJ-MM-TT. Eine noch nicht gelieferte Bestellung ist kein Fehler.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung 7001 | bestellt 2026-02-10 · geliefert 2026-02-12 · 89,90 € | nein | Die Lieferung liegt nach der Bestellung, Datum und Betrag sind gültig. |
| Bestellung 7002 | bestellt 2026-02-10 · geliefert 2026-02-08 · 310,00 € | ja | Plausibilität: Die Lieferung liegt vor der Bestellung. Beide Daten sind einzeln gültig, nur im Zusammenhang unmöglich. |
| Bestellung 7003 | bestellt 2026-13-01 · geliefert 2026-03-04 · 59,00 € | ja | Validität: Der Monat 13 gibt es nicht. Das Format JJJJ-MM-TT ist eingehalten, der Inhalt ist aber kein gültiges Datum. |
| Bestellung 7004 | bestellt 2026-03-02 · geliefert (noch offen) · 75,25 € | nein | Eine noch nicht gelieferte Bestellung ist fachlich in Ordnung. |
| Bestellung 7005 | bestellt 2026-03-05 · geliefert 2026-03-08 · −45,00 € | ja | Plausibilität: Eine Bestellung (keine Gutschrift) hat keinen negativen Betrag. |

*Auflösung:* Drei Zeilen sind auffällig: Lieferung vor Bestellung (Plausibilität), Monat 13 (Validität) und negativer Betrag (Plausibilität). Die offene Lieferung in 7004 ist dagegen erlaubt.

### 7. Statusfeld (zu beanstanden)

Das Feld Status darf nur die Werte „aktiv“ oder „inaktiv“ enthalten. Prüfe vier Kunden.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | K-5001 · Status: aktiv | nein | Zulässiger Wert. |
| Zeile 2 | K-5002 · Status: inaktiv | nein | Zulässiger Wert. |
| Zeile 3 | K-5003 · Status: vielleicht | ja | Validität: „vielleicht“ steht nicht in der Liste der zulässigen Werte. |
| Zeile 4 | K-5004 · Status: aktiv | nein | Zulässiger Wert. |

*Auflösung:* „vielleicht“ verletzt die Regel für das Statusfeld (Validität). Eine Prüfung gegen die Liste der zulässigen Werte findet solche Einträge.

### 8. Mengenabgleich nach der Übertragung (zu beanstanden)

Nach der Übertragung von Kundendaten in ein neues System wird die Datenmenge verglichen. Alle Datensätze des Quellsystems sollen im Zielsystem ankommen.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Quellsystem | 2.500 Datensätze exportiert | nein | Die Sollmenge für den Vergleich. |
| Zielsystem | 2.463 Datensätze importiert | ja | Quantität: Es fehlen 37 Datensätze (2.500 − 2.463). Der Mengenabgleich von Soll und Ist zeigt die Lücke. |
| Importprotokoll | Import abgeschlossen, keine Fehlermeldung | nein | Das Protokoll selbst ist nicht der Fehler, aber „keine Fehlermeldung“ beweist keine Vollständigkeit; erst der Mengenabgleich deckt die fehlenden Zeilen auf. |
| Schlüsselprüfung | Kundennummern im Zielsystem eindeutig | nein | Eine Prüfung auf Eindeutigkeit der Schlüssel ist in Ordnung und ersetzt den Mengenabgleich nicht. |

*Auflösung:* Im Zielsystem fehlen 37 von 2.500 Datensätzen (Quantität). Ohne Mengenabgleich wäre das trotz fehlerfreiem Importprotokoll unbemerkt geblieben.

### 9. Adressen in zwei Systemen (zu beanstanden)

Webshop und Abrechnung führen Kundenadressen getrennt. Die Abrechnung soll mit dem Webshop übereinstimmen; markiere, was von der Gegenseite abweicht.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Webshop | K-6001 · Hauptstraße 5 · 50667 Köln | nein | Vergleichsbasis. |
| Abrechnung | K-6001 · Hauptstraße 5 · 50668 Köln | ja | Konsistenz: Die Postleitzahl weicht vom Webshop ab (50668 statt 50667). Beide sind für sich gültig; welche stimmt, lässt sich nur durch Nachfragen oder einen Referenzvergleich klären (Richtigkeit). |
| Webshop | K-6002 · Lindenallee 12 · 20095 Hamburg | nein | Vergleichsbasis. |
| Abrechnung | K-6002 · Lindenallee 12 · 20095 Hamburg | nein | Stimmt mit dem Webshop überein. |

*Auflösung:* Bei K-6001 widersprechen sich die Systeme in der Postleitzahl (Konsistenz). Validität und Konsistenz sind getrennte Fragen: Beide Werte sind formal gültig, nur einer kann stimmen.

### 10. Lieferantenliste (in Ordnung)

Eine Lieferantenliste soll vor dem Einlesen geprüft werden. Regeln: Nummer eindeutig, Postleitzahl fünf Ziffern, Status aktiv oder inaktiv, alle Felder befüllt.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Zeile 1 | L-100 · Nordlicht Logistik AG · 20095 Hamburg · aktiv | nein | Alle Regeln erfüllt. |
| Zeile 2 | L-101 · Hartmann Metallbau GmbH · 50667 Köln · aktiv | nein | Alle Regeln erfüllt. |
| Zeile 3 | L-102 · Rheinwerk Maschinen GmbH · 40213 Düsseldorf · inaktiv | nein | Alle Regeln erfüllt. |
| Zeile 4 | L-103 · Kaufhaus Brandt · 01067 Dresden · aktiv | nein | Die führende Null der Postleitzahl ist gültig; alle Regeln erfüllt. |

*Auflösung:* Nummern sind verschieden, Postleitzahlen haben fünf Ziffern, der Status ist zulässig, kein Feld ist leer: Die Liste kann eingelesen werden.

### 11. Temperaturreihe im Lager (in Ordnung)

Ein Sensor im Lager (Sollbereich 15 bis 25 °C) meldet jede Minute die Temperatur. Prüfe den Auszug.

| Zeile | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| 14:01 | 18,2 °C | nein | Im Sollbereich. |
| 14:02 | 18,4 °C | nein | Im Sollbereich, kleine Schwankung. |
| 14:03 | 18,9 °C | nein | Im Sollbereich; ein langsamer Anstieg ist bei einem Lager normal. |
| 14:04 | 19,1 °C | nein | Im Sollbereich. |

*Auflösung:* Alle Werte liegen im Sollbereich und folgen einem glaubwürdigen Verlauf. Nicht jeder Datenauszug hat einen Fehler: Auch „in Ordnung“ ist ein Prüfergebnis.
