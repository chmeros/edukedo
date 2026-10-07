# Prüfblatt Spiele — Beleg-Detektiv und Betrugs-Detektiv (F-196)

Stand 07.10.2026 · erzeugt aus apps/api/src/db/content/game-belegdetektiv-einkauf.ts und game-phishing-fracht-betrug.ts. **Alle Inhalte sind Entwürfe von Claude.** Alle Firmen, Artikel und Beträge sind frei erfunden. Der Beleg-Detektiv (Set belege) ist in Handels-, Industrie-, Technischem, Wirtschaftsfachwirt und im Büro-Kurs sichtbar, der Betrugs-Detektiv (Phishing-Set fracht-betrug) in Transport/Logistik (beide freigegeben am 07.10.2026). Die Beträge sind nachgerechnet und per Test geprüft.

**Prüffragen:** (1) Ist die Abweichung im Beleg im Einkauf üblicherweise ein Beanstandungsgrund? (2) Sind die Erklärungen und die Auflösung richtig? (3) Bei den Betrugsmails: Stimmen die Warnzeichen mit der Praxis überein? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.

## Beleg-Detektiv: Wareneingang und Rechnungsprüfung

### 1. Aktenordner (zu beanstanden)

Im Wareneingang liegen Bestellung, Lieferschein und Rechnung für Aktenordner vor. Vergleiche die Angaben.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 120 Aktenordner A4 zu 2,40 € je Stück, Lieferung bis 14.10. | nein | Die Bestellung ist die Vergleichsbasis für Menge und Preis. |
| Lieferschein | Geliefert: 100 Aktenordner A4 (5 Kartons zu je 20 Stück) | ja | Es wurden nur 100 statt 120 Stück geliefert. |
| Rechnung | 120 Aktenordner A4 zu 2,40 € = 288,00 € netto | ja | Berechnet sind 120 Stück, geliefert wurden nur 100. Richtig wären 100 × 2,40 € = 240,00 €. |
| Zahlungsbedingung | Zahlbar innerhalb von 30 Tagen netto | nein | Die Zahlungsbedingung weicht nicht von der Vereinbarung ab. |

*Auflösung:* Geliefert wurden 100 Stück, berechnet 120. Die Rechnung muss auf 240,00 € netto korrigiert werden, oder die fehlenden 20 Stück müssen nachgeliefert werden.

### 2. Kopierpapier (zu beanstanden)

Für Kopierpapier gilt ein vereinbarter Rahmenvertragspreis. Prüfe, ob die Rechnung dazu passt.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 50 Packungen Kopierpapier 80 g zu 4,20 € je Packung (vereinbarter Preis) | nein | Vergleichsbasis: 4,20 € je Packung. |
| Lieferschein | 50 Packungen Kopierpapier 80 g geliefert, Kartons unversehrt | nein | Die Liefermenge entspricht der Bestellung. |
| Rechnung | 50 Packungen Kopierpapier 80 g zu 4,80 € = 240,00 € netto | ja | Der berechnete Stückpreis (4,80 €) liegt über dem vereinbarten (4,20 €). Die Rechnung rechnet in sich stimmig, aber mit dem falschen Preis. |
| Zahlungsbedingung | Zahlungsziel 14 Tage | nein | Kein Widerspruch zur Bestellung. |

*Auflösung:* Der Preis weicht ab: Richtig wären 50 × 4,20 € = 210,00 € netto statt 240,00 €. Die Rechnung wird beim Lieferanten beanstandet.

### 3. Toner (in Ordnung)

Prüfe die Unterlagen zu einer Tonerlieferung, bevor die Rechnung zur Zahlung freigegeben wird.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 30 Toner schwarz zu 64,00 € je Stück | nein | Vergleichsbasis für Menge und Preis. |
| Lieferschein | 30 Toner schwarz geliefert, Verpackung unversehrt | nein | Menge stimmt, kein Hinweis auf Schäden. |
| Rechnung | 30 Toner schwarz zu 64,00 € = 1.920,00 € netto | nein | 30 × 64,00 € = 1.920,00 €, Menge und Preis passen zur Bestellung. |
| Zahlungsbedingung | 10 Tage 2 % Skonto, 30 Tage netto | nein | Eine übliche Skontoregelung, die mit der Rechnung nicht im Widerspruch steht. |

*Auflösung:* Menge, Preis und Summe stimmen überein, die Ware ist unversehrt. Die Rechnung kann zur Zahlung freigegeben werden.

### 4. Skontoabzug (zu beanstanden)

Eine Rechnung wurde bezahlt. Prüfe, ob der Skontoabzug in der Buchhaltung zur Zahlungsbedingung passt.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Rechnung | Rechnungsdatum 03.10., Rechnungsbetrag 2.000,00 € netto | nein | Ausgangspunkt für die Berechnung der Skontofrist. |
| Zahlungsbedingung | 2 % Skonto bei Zahlung innerhalb von 10 Tagen, danach netto | nein | Die Skontofrist läuft vom 03.10. bis zum 13.10. |
| Buchhaltung | Zahlung am 17.10. | ja | Der 17.10. liegt nach dem Ende der Skontofrist (13.10.). |
| Buchhaltung | Überweisung 1.960,00 € (2 % Skonto abgezogen) | ja | Das Skonto wurde abgezogen, obwohl die Frist verstrichen war. Zu zahlen waren 2.000,00 €. |

*Auflösung:* Die Skontofrist endete am 13.10., gezahlt wurde am 17.10. Der Abzug von 40,00 € entspricht nicht der vereinbarten Zahlungsbedingung; es sind 2.000,00 € zu zahlen.

### 5. Bildschirme (zu beanstanden)

Bei der Warenannahme fällt ein Karton auf. Prüfe die Unterlagen und die Wareneingangskontrolle.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 10 Bildschirme 24 Zoll zu 149,00 € je Stück | nein | Vergleichsbasis für Menge und Preis. |
| Lieferschein | 10 Bildschirme geliefert. Karton 4 mit eingedrückter Ecke, bei der Annahme nicht vermerkt. | ja | Die sichtbare Beschädigung des Kartons wurde beim Quittieren nicht festgehalten. |
| Wareneingangskontrolle | Der Bildschirm aus Karton 4 hat einen Riss im Display. | ja | Ein Gerät ist beschädigt und nicht verwendbar. |
| Rechnung | 10 Bildschirme 24 Zoll zu 149,00 € = 1.490,00 € netto | nein | Menge, Preis und Summe passen zur Bestellung (10 × 149,00 € = 1.490,00 €). |

*Auflösung:* Menge und Preis stimmen, aber ein Gerät ist beschädigt. Der Schaden wird dokumentiert (Fotos, schriftlicher Vermerk) und beim Lieferanten reklamiert.

### 6. Etiketten (zu beanstanden)

Vergleiche Artikelnummern und Mengen in den drei Belegen.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | Artikel 4711: Ordnerrücken-Etiketten, 20 Packungen zu 3,10 € | nein | Bestellt wurde der Artikel 4711. |
| Lieferschein | Artikel 4712: Ordnerrücken-Etiketten, selbstklebend, 20 Packungen | ja | Geliefert wurde Artikel 4712, bestellt war 4711. |
| Rechnung | Artikel 4712, 20 Packungen zu 3,10 € = 62,00 € netto | ja | Berechnet ist ebenfalls der abweichende Artikel 4712. |
| Zahlungsbedingung | Zahlbar innerhalb von 14 Tagen netto | nein | Kein Widerspruch zur Bestellung. |

*Auflösung:* Geliefert und berechnet wurde Artikel 4712 statt 4711. Es ist zu klären, ob der Ersatzartikel gleichwertig ist und akzeptiert wird; sonst wird die Lieferung reklamiert.

### 7. Büromöbel (zu beanstanden)

Die Rechnung für Büromöbel hat mehrere Positionen. Prüfe jede Position und die Summe.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 2 Besprechungstische zu 380,00 € und 8 Stühle zu 95,00 € | nein | Vergleichsbasis: 2 Tische und 8 Stühle. |
| Lieferschein | 2 Besprechungstische und 8 Stühle geliefert | nein | Die Liefermenge entspricht der Bestellung. |
| Rechnung, Position 1 | 2 Besprechungstische zu 380,00 € = 760,00 € | nein | 2 × 380,00 € = 760,00 €. |
| Rechnung, Position 2 | 8 Stühle zu 95,00 € = 760,00 € | nein | 8 × 95,00 € = 760,00 €. |
| Rechnung, Position 3 | 8 Stühle zu 95,00 € = 760,00 € | ja | Die Stühle stehen ein zweites Mal auf der Rechnung, geliefert wurden sie nur einmal. |
| Rechnung, Summe | Summe netto: 2.280,00 € | ja | Die Summe enthält die doppelte Position. Richtig wären 760,00 € + 760,00 € = 1.520,00 €. |

*Auflösung:* Die Stühle wurden doppelt berechnet. Richtig sind 1.520,00 € netto statt 2.280,00 €; die Rechnung wird zurückgewiesen.

### 8. Kugelschreiber (in Ordnung)

Die Bestellung sieht zwei Teillieferungen vor. Prüfe, ob die Rechnung zur ersten Teillieferung passt.

| Feld | Angabe | Auffällig | Erklärung |
| --- | --- | --- | --- |
| Bestellung | 200 Kugelschreiber zu 0,35 € je Stück, Lieferung in zwei Teilen zu je 100 Stück | nein | Vereinbart sind zwei Teillieferungen. |
| Lieferschein | Teillieferung 1: 100 Kugelschreiber geliefert | nein | Die erste Teillieferung entspricht der Vereinbarung. |
| Rechnung | Teillieferung 1: 100 Kugelschreiber zu 0,35 € = 35,00 € netto | nein | 100 × 0,35 € = 35,00 €. Berechnet ist genau die gelieferte Menge. |
| Rechnung | Die zweite Teillieferung folgt und wird gesondert berechnet. | nein | Die offene Restmenge ist vereinbart und kein Fehler. |

*Auflösung:* Berechnet ist genau die gelieferte Menge zum vereinbarten Preis. Die zweite Teillieferung ist offen, aber so vereinbart. Die Rechnung ist in Ordnung.

## Betrugs-Detektiv: Fake-Spedition und Frachtbetrug (Transport/Logistik)

### 1. Betrugsversuch

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Disposition <dispo@schnell-fracht-ag.test> | ja | Verdächtig: Die Firma ist unbekannt und hat bisher keinen Auftrag mit euch. Eine neue Adresse mit angeblich großer Spedition ist ohne Prüfung kein Beleg für Echtheit. |
| betreff | DRINGEND: Komplettladung Hamburg - Mailand, Abholung morgen | ja | Verdächtig: Zeitdruck und eine lukrative Komplettladung sollen zu einer schnellen Zusage drängen, bevor jemand den Auftraggeber prüft. |
| text | Wir suchen kurzfristig einen Frachtführer für 24 t Elektronik. Wir zahlen 30 % über Marktpreis und bitten um sofortige Zusage. | ja | Verdächtig: Ein Preis weit über Markt ist ein klassischer Köder. Wer ungewöhnlich viel zahlt, will meist nicht fahren lassen, sondern Ware oder Geld abgreifen. |
| text | Als Sicherheit bitten wir um eine Vorabzahlung von 1.500 € für die Abwicklung der Frachtpapiere. | ja | Verdächtig: Ein Auftraggeber verlangt kein Geld vom Frachtführer. Eine Vorauszahlung für Papiere ist ein typischer Betrugstrick. |
| link | Auftragsdetails → http://frachtboerse-auftrag.test/login | ja | Verdächtig: Das Ziel ist eine unbekannte Seite mit Anmeldung, nicht die bekannte Frachtbörse. Zugangsdaten würden dort abgegriffen. |

*Auflösung:* Das ist ein Betrugsversuch: unbekannter Auftraggeber, Zeitdruck, Preis weit über Markt, Vorauszahlung und eine gefälschte Anmeldeseite. Neue Auftraggeber werden vor einer Zusage geprüft (Handelsregister, Rückruf über die öffentlich bekannte Nummer).

### 2. Betrugsversuch

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Buchhaltung Nordlog <rechnungswesen@nordlog-transporte-gmbh.test> | ja | Verdächtig: Der bekannte Frachtführer schreibt sonst von nordlog-transporte.example. Diese Domain ist ähnlich, aber nicht dieselbe. |
| betreff | Wichtig: neue Bankverbindung ab sofort | ja | Verdächtig: Änderungen von Bankdaten per Mail sind der häufigste Weg zum Rechnungsbetrug. |
| text | Bitte überweisen Sie alle offenen Rechnungen ab sofort auf unser neues Konto bei einer anderen Bank. Die IBAN finden Sie im Anhang. | ja | Verdächtig: Die neue IBAN steht nur in dieser Mail. Eine echte Änderung wird über einen zweiten Weg bestätigt, zum Beispiel per Rückruf. |
| text | Bitte bestätigen Sie die Änderung bis heute Abend, damit es zu keinen Zahlungsverzögerungen kommt. | ja | Verdächtig: Eine knappe Frist verhindert, dass die Änderung in Ruhe geprüft wird. |
| anhang | Neue_Bankverbindung.pdf.exe | ja | Verdächtig: Eine Datei mit der Endung .exe hinter .pdf ist ein Programm und kein Dokument. |
| text | Mit freundlichen Grüßen Buchhaltung | nein | Unauffällig: Eine Grußformel sagt nichts über die Echtheit, sie lässt sich leicht kopieren. |

*Auflösung:* Das ist Rechnungsbetrug: ähnliche Domain, neue Bankdaten per Mail, Frist und ein getarntes Programm im Anhang. Bankdaten ändert man nur nach Rückruf unter der bekannten Nummer, nicht nach einer Mail.

### 3. Betrugsversuch

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Disposition Rhein-Main <disposition.rhein.main@mailbox-gratis.test> | ja | Verdächtig: Eine Spedition schreibt von der eigenen Firmendomain, nicht von einem Gratis-Postfach. |
| betreff | Abholung Sendung 4711 morgen früh | nein | Unauffällig: Der Betreff ist sachlich und beschreibt einen normalen Vorgang. |
| text | Unser Fahrer holt die Sendung morgen um 6:00 Uhr bei Ihnen ab. Er kommt mit einem anderen Fahrzeug als sonst. | ja | Verdächtig: Ein Wechsel von Fahrzeug und Fahrer ohne Vorankündigung ist ein Warnsignal bei Ladungsdiebstahl. |
| text | Bitte übergeben Sie die Ware ohne Abholschein, die Papiere reichen wir nach. | ja | Verdächtig: Ware ohne Papiere und ohne Prüfung zu übergeben, öffnet dem Diebstahl die Tür. Abholer werden immer geprüft. |
| text | Bei Rückfragen erreichen Sie uns nur per Mail, da unsere Telefonanlage gestört ist. | ja | Verdächtig: Der Weg zur Rückfrage wird versperrt, damit niemand unter der bekannten Nummer nachfragt. |

*Auflösung:* Das ist ein Versuch, Ware abzugreifen: Gratis-Postfach, unbekannter Fahrer, keine Papiere und keine Rückfragemöglichkeit. Abholer werden mit Auftrag und Ausweis geprüft und bei Zweifeln wird unter der bekannten Nummer nachgefragt.

### 4. Echte Nachricht

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Anna Weber, Disposition Kontor Nord <disposition@kontor-nord.example> | nein | Unauffällig: Eine bekannte Kundin und eine bekannte Domain, genau wie in früheren Aufträgen. |
| betreff | Auftrag 2024-118: Termin für die Abholung bestätigen | nein | Unauffällig: Der Betreff nennt eine bekannte Auftragsnummer. |
| text | Guten Tag, wie telefonisch besprochen bitten wir um Bestätigung der Abholung am Donnerstag zwischen 8 und 10 Uhr. | nein | Unauffällig: Der Bezug zu einem Telefonat lässt sich nachprüfen, die Bitte ist sachlich. |
| text | Die Ladepapiere liegen am Tor bereit. Rückfragen gern unter der bekannten Durchwahl. | nein | Unauffällig: Der Rückfrageweg bleibt offen und bekannt. |

*Auflösung:* Das ist eine echte Nachricht: bekannter Absender, bekannte Auftragsnummer, sachlicher Ton und ein offener Rückfrageweg.

### 5. Betrugsversuch

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Paket-Zustellung <info@zustell-service-zoll.test> | ja | Verdächtig: Der Absender ist keiner bekannten Zustellfirma zuzuordnen. |
| betreff | Ihre Sendung wurde angehalten: Zollgebühr offen | ja | Verdächtig: Die Meldung nennt keine Sendung, keine Auftragsnummer und keinen Absender. |
| text | Zur Freigabe Ihrer Sendung ist eine Gebühr von 2,99 € zu zahlen. Andernfalls wird sie zurückgeschickt. | ja | Verdächtig: Eine kleine Summe senkt die Hemmschwelle, die Drohung erzeugt Druck. Gesammelt werden dabei Kartendaten. |
| link | Jetzt Gebühr zahlen → http://zustell-gebuehr-zahlen.test/pay | ja | Verdächtig: Die Seite gehört zu keinem bekannten Zusteller und fragt Zahlungsdaten ab. |

*Auflösung:* Das ist Phishing: unbekannter Absender, keine konkrete Sendung, kleine Gebühr als Köder und eine Zahlungsseite, die nicht zu einem bekannten Zusteller gehört.

### 6. Echte Nachricht

| Teil | Angabe | Verdächtig | Erklärung |
| --- | --- | --- | --- |
| absender | Rechnungswesen Nordlog <rechnungswesen@nordlog-transporte.example> | nein | Unauffällig: Dieselbe Domain wie in allen früheren Rechnungen dieses Frachtführers. |
| betreff | Rechnung 2024-0933 zu Auftrag 2024-118 | nein | Unauffällig: Rechnungs- und Auftragsnummer lassen sich im eigenen System finden. |
| text | Anbei die Rechnung zu Ihrem Transportauftrag Hamburg - Kassel. Die Bankverbindung ist unverändert. | nein | Unauffällig: Es gibt keine Änderung der Bankdaten und keinen Zeitdruck. |
| anhang | Rechnung_2024-0933.pdf | nein | Unauffällig: Ein PDF mit einer erwarteten Rechnungsnummer ist der normale Fall. |

*Auflösung:* Das ist eine echte Rechnung: bekannte Domain, zu einem eigenen Auftrag passende Nummern, unveränderte Bankdaten und ein normaler Anhang. Trotzdem wird die Rechnung inhaltlich gegen Auftrag und Lieferung geprüft.
