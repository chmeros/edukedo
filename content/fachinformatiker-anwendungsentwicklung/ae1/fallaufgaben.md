---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: AE1
fachgebiet_title: "Konzipieren und Umsetzen von Softwareanwendungen"
thema_code: "AE1-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zu den Prüfungsbereichen „Planen und Umsetzen eines Softwareprojektes" und „Planen eines Softwareproduktes" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), §§ 12 und 13, sowie zum Ausbildungsrahmenplan Abschnitt B lfd. Nr. 1 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus AE1 (8.1–8.4) zu einer zusammenhängenden Situation rund um die Brevanta IT-Systemhaus GmbH und deren Kundenprojekte, wie sie in der schriftlichen Abschlussprüfung der Fachrichtung Anwendungsentwicklung typisch ist. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-AE1-01 · Fallaufgabe

**Themenbezug:** 8.1 (Vorgehensmodelle) + 8.2 (Anforderungsanalyse, User Stories, UML)

**Ausgangssituation:** Der Dornfeld Aufzugsservice GmbH (rund 60 Servicetechniker:innen) dokumentiert Wartungen bislang auf Papierformularen. Die Brevanta IT-Systemhaus GmbH soll eine Wartungs-App entwickeln. Im ersten Gespräch mit Frau Lindner, der Leiterin Technik, hat Projektleiter Jonas Kramer folgende Punkte notiert:
- Die Techniker sehen morgens in der App ihre Wartungsaufträge des Tages.
- Zu jedem Auftrag wird ein Wartungsprotokoll mit einer Checkliste ausgefüllt; bei Mängeln werden Fotos angehängt.
- Zum Abschluss unterschreibt der Kunde direkt auf dem Display.
- In Aufzugsschächten gibt es oft keinen Mobilfunkempfang; begonnene Protokolle dürfen nicht verloren gehen.
- Die Disponentinnen und Disponenten planen die Einsätze und weisen sie den Technikern zu.
- Das Budget ist mit 90.000 Euro fest vorgegeben, der Funktionsumfang ist aber noch nicht abschließend geklärt. Der Kunde möchte bereits nach sechs Wochen eine erste Version erproben.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie die notierten Punkte funktionalen und nichtfunktionalen Anforderungen zu, nennen Sie jeweils mindestens zwei, und formulieren Sie eine der nichtfunktionalen Anforderungen so um, dass sie prüfbar ist.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Formulieren Sie zwei User Stories in der üblichen Schablone (eine aus Sicht der Technikerin bzw. des Technikers, eine aus Sicht der Disponentin bzw. des Disponenten) und ergänzen Sie je zwei Akzeptanzkriterien.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Use-Case-Diagramm in Textform für die Wartungs-App mit Akteuren, mindestens fünf Anwendungsfällen sowie mindestens je einer include- und einer extend-Beziehung. Geben Sie die Pfeilrichtung der Beziehungen an.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, welches Vorgehensmodell für dieses Projekt am besten geeignet ist (Festbudget, noch unscharfer Funktionsumfang, früher Test gewünscht), und begründen Sie Ihre Empfehlung anhand von mindestens drei Kriterien. Nennen Sie außerdem ein Risiko, das Sie mit dem Kunden besprechen würden.

**Musterlösungshinweise:** Teilaufgabe 1: Funktional z. B. Aufträge anzeigen, Protokoll mit Checkliste ausfüllen, Fotos anhängen, Kundenunterschrift erfassen, Einsätze planen; nichtfunktional z. B. Funktionsfähigkeit ohne Mobilfunk (Offlinebetrieb ohne Datenverlust), Bedienbarkeit unter Einsatzbedingungen, Budget und Termin als Randbedingungen. Prüfbare Formulierung z. B.: Ein begonnenes Protokoll bleibt bei Verbindungsabbruch vollständig erhalten und wird nach Wiederherstellen der Verbindung automatisch übertragen. Teilaufgabe 2: Schablone Als [Rolle] möchte ich [Ziel], um [Nutzen] zu erreichen, z. B. Als Servicetechniker möchte ich Wartungsprotokolle auch ohne Netzempfang ausfüllen, um im Schacht arbeiten zu können; Akzeptanzkriterien messbar bzw. im Muster Gegeben/Wenn/Dann (z. B. Protokoll bleibt nach App-Neustart erhalten). Als Disponentin möchte ich offene Aufträge nach Dringlichkeit sortieren, um dringende Einsätze zuerst zu vergeben. Teilaufgabe 3: Akteure Techniker, Disponent; Anwendungsfälle z. B. Wartungsauftrag anzeigen, Wartungsprotokoll erfassen, Wartung abschließen, Kundenunterschrift einholen, Foto anhängen, Einsatz planen; include: von Wartung abschließen zu Kundenunterschrift einholen (Pfeil vom Basis- zum eingebundenen Anwendungsfall, da immer erforderlich); extend: von Foto anhängen zu Wartungsprotokoll erfassen (Pfeil vom erweiternden zum Basisfall, da nur bei Mängeln optional). Teilaufgabe 4: Geeignet ist ein iterativ-inkrementelles, agiles Vorgehen (z. B. Scrum mit zweiwöchigen Sprints), da Funktionsumfang unscharf, früh testbare Versionen gewünscht und Rückmeldungen der Techniker wichtig sind; das erste Inkrement nach sechs Wochen liefert z. B. Auftragsanzeige und Protokoll. Ein reines Wasserfallmodell wäre bei unscharfen Anforderungen riskant; ein Festpreis mit starr festem Umfang passt schlecht zu agilem Vorgehen, daher Budgetrahmen mit priorisiertem Product Backlog (z. B. Muss-Funktionen zuerst) vereinbaren. Risiko: Der Umfang könnte das Budget übersteigen; Priorisierung und Abnahmekriterien müssen vereinbart werden, ggf. hybrider Rahmen mit Meilensteinen.

---

#### F-AE1-02 · Fallaufgabe

**Themenbezug:** 8.2 (Klassen-, Zustands- und Sequenzdiagramm) + 8.4 (Schichtenarchitektur)

**Ausgangssituation:** Für die Kellerbach Maschinenbau AG entwickelt Brevanta eine neue Auftragsverwaltung. Der Fachbereich beschreibt die Zusammenhänge so: Ein Kunde (Kundennummer, Name, Lieferadresse) kann beliebig viele Aufträge erteilen; jeder Auftrag gehört genau einem Kunden. Ein Auftrag hat eine Auftragsnummer, ein Datum und einen Status und besteht aus mindestens einer Auftragsposition (Menge, Einzelpreis). Positionen existieren nur innerhalb ihres Auftrags und werden mit diesem gelöscht. Jede Position bezieht sich auf genau einen Artikel (Artikelnummer, Bezeichnung, Preis, Lagerbestand); ein Artikel kann in beliebig vielen Positionen vorkommen. Ein neuer Auftrag erhält den Status angelegt. Er wird freigegeben, wenn die Bonität des Kunden in Ordnung ist; andernfalls bleibt er im Status angelegt. Danach wechselt er in Bearbeitung und anschließend nach dem Versand auf versendet. Nach Zahlungseingang ist er abgeschlossen. Im Status angelegt oder freigegeben kann ein Auftrag storniert werden. Ein Kollege hat für die Funktion „Auftrag freigeben" ein Sequenzdiagramm skizziert: Die Maske (Präsentationsschicht) liest per SQL-Abfrage direkt aus der Datenbank die Bonitätskennzahl des Kunden, vergleicht sie selbst mit einem Schwellenwert und schreibt bei Erfolg den neuen Status per UPDATE direkt in die Datenbank.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Identifizieren Sie aus der Beschreibung die Klassen mit je zwei bis drei Attributen und bestimmen Sie die Beziehungen zwischen ihnen (Art der Beziehung und Multiplizitäten). Begründen Sie, welche Beziehung als Komposition modelliert werden sollte.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Stellen Sie das Klassendiagramm in Textform dar. Verwenden Sie die UML-Notation für Sichtbarkeiten (mindestens bei den Attributen der Klasse Auftrag), Multiplizitäten und die passenden Beziehungsarten, und ergänzen Sie in der Klasse Auftrag zwei sinnvolle Operationen.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie das Zustandsdiagramm für den Lebenszyklus eines Auftrags mit Anfangszustand, Zuständen, Endzuständen und beschrifteten Transitionen (Ereignis und gegebenenfalls Bedingung).

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie den Entwurf des Kollegen im Hinblick auf eine Schichtenarchitektur und die Prinzipien Kapselung und Trennung der Zuständigkeiten. Skizzieren Sie einen verbesserten Ablauf, der die Schichten sinnvoll einbezieht.

**Musterlösungshinweise:** Teilaufgabe 1: Klassen Kunde (kundennr, name, lieferadresse), Auftrag (auftragsnr, datum, status), Auftragsposition (menge, einzelpreis), Artikel (artikelnr, bezeichnung, preis, lagerbestand). Beziehungen: Kunde 1 zu 0..* Auftrag (Assoziation), Auftrag 1 zu 1..* Auftragsposition, Auftragsposition 0..* zu 1 Artikel (Assoziation). Die Beziehung Auftrag zu Auftragsposition ist eine Komposition (gefüllte Raute am Auftrag), weil die Positionen nur innerhalb des Auftrags existieren und mit ihm gelöscht werden. Teilaufgabe 2: Klassen als Rechtecke mit Name, Attributen (z. B. - auftragsnr : String, - datum : Date, - status : Status) und Operationen (z. B. + freigeben() : void, + berechneSumme() : Dezimal, + stornieren() : void); Assoziationen als durchgezogene Linien mit Multiplizitäten, Komposition mit gefüllter Raute beim Auftrag. Teilaufgabe 3: Anfangszustand, dann angelegt; Übergang freigeben [Bonität in Ordnung] zu freigegeben; freigegeben, dann Bearbeitung beginnt, zu in Bearbeitung; versenden zu versendet; Zahlung eingegangen zu abgeschlossen mit Endzustand; aus angelegt und freigegeben jeweils stornieren zu storniert mit Endzustand; bei nicht ausreichender Bonität bleibt der Zustand angelegt. Teilaufgabe 4: Der Entwurf vermischt Darstellung, Geschäftsregel (Bonitätsprüfung) und Datenzugriff in der Präsentationsschicht; die Schichten werden übersprungen, die Geschäftsregel ist nicht wiederverwendbar oder testbar, die Oberfläche ist an die Datenbank gekoppelt. Besser: Die Maske ruft die Fachlogik auf (z. B. ein Dienst oder Controller für die Auftragsfreigabe), die Fachlogik prüft die Bonität und setzt den Status; der Datenzugriff läuft über die Datenzugriffsschicht, die die Datenbank kapselt; die Antwort geht zurück an die Maske.

---

#### F-AE1-03 · Fallaufgabe

**Themenbezug:** 8.3 (Ergonomie, Barrierefreiheit, Responsive Design) + 8.4 (Datenaustausch, Datenquellen, Berichte)

**Ausgangssituation:** Die Stadtwerke Marlenhagen lassen von Brevanta ein Kundenportal entwickeln. Privatkundinnen und -kunden sollen darin Zählerstände melden, ihren Verbrauch ansehen und Rechnungen abrufen. Das bestehende ERP-System liefert Kundenstammdaten und Rechnungen nur als nächtlich erzeugte CSV-Datei (Semikolon-getrennt, Zeichenkodierung nicht dokumentiert) auf einem Dateiserver; Vertragsdaten stehen zusätzlich über eine lesende REST-Schnittstelle zur Verfügung. Die gemeldeten Zählerstände speichert das Portal in einer eigenen Datenbank. Viele Kundinnen und Kunden nutzen ein Smartphone, darunter ältere Menschen und Menschen mit Sehbehinderungen; die Stadtwerke legen großen Wert auf Barrierefreiheit. Die Abrechnungsabteilung wünscht außerdem einen monatlichen Bericht, in dem je Kunde der Name (aus dem ERP) und die Anzahl der gemeldeten Zählerstände samt Verbrauch (aus der Portal-Datenbank) stehen.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie Vor- und Nachteile des CSV-Dateiaustauschs im Vergleich zu einer Echtzeit-Schnittstelle und nennen Sie vier Punkte, die vor dem Realisieren des CSV-Imports geklärt oder gesichert werden müssen.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Entwerfen Sie für das Melden eines Zählerstands eine REST-Schnittstelle: Adresse (URI), HTTP-Methode, ein Beispiel für den JSON-Inhalt der Anfrage sowie drei mögliche Statuscodes der Antwort mit ihrer Bedeutung.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Nennen Sie vier Maßnahmen für Responsive Design und Barrierefreiheit des Portals und bewerten Sie, welche Sie zuerst anhand eines Prototyps mit den Stadtwerken abstimmen würden. Begründen Sie Ihre Wahl.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Konzipieren Sie den gewünschten Datenbestandsbericht: Datenquellen, Verknüpfungsmerkmal, Vorgehen beim Zusammenführen und der Aufbau der Auswertung (Gruppierung und Aggregation). Nennen Sie außerdem einen Datenschutz- und Berechtigungsaspekt.

**Musterlösungshinweise:** Teilaufgabe 1: Vorteile des Dateiaustauschs: einfach, robust, entkoppelt, ohne Verfügbarkeit des Quellsystems zur Abrufzeit; Nachteile: keine Echtzeit, Daten höchstens einen Tag alt, fehleranfällig bei Formatänderungen, kein unmittelbares Fehlerfeedback; Echtzeit-Schnittstelle liefert aktuelle Daten, erfordert aber Verfügbarkeit, Absicherung und Fehlerbehandlung. Zu klären: Zeichenkodierung, Trennzeichen und Anführungszeichen, Dezimal- und Datumsformat, Kopfzeile, Validierung und Fehlerbehandlung (Protokoll, Umgang mit fehlerhaften Zeilen), sichere Übertragung und Zugriffsrechte. Teilaufgabe 2: Z. B. POST auf /api/v1/zaehler/{zaehlernr}/staende; JSON z. B. mit Feldern stand, datum (ISO-Format), meldequelle; Statuscodes z. B. 201 (Zählerstand angelegt), 400 (fehlerhafte Anfrage, z. B. Stand kleiner als der letzte), 401 (nicht angemeldet), 403 (nicht berechtigt, fremder Zähler), 404 (Zähler nicht gefunden). Teilaufgabe 3: Mögliche Maßnahmen: Mobile First mit flexiblem Layout und Media Queries, ausreichender Kontrast (mindestens 4,5 : 1 bei normalem Text auf Stufe AA), vollständige Tastaturbedienbarkeit und sichtbarer Fokus, sichtbare Formularbeschriftungen und verständliche Fehlermeldungen, Information nicht allein über Farbe, skalierbare Schrift und ausreichend große Bedienflächen; sinnvoll ist, zuerst das zentrale Formular zur Zählerstandsmeldung und die Startseite als Wireframe bzw. klickbaren Prototyp abzustimmen, weil hier Navigationsstruktur und Barrierefreiheitsanforderungen die Gesamtgestaltung bestimmen und Änderungen noch günstig sind; zusätzlicher Test mit Anwendern. Teilaufgabe 4: Quellen ERP (Name, Kundennummer; per CSV-Import oder REST) und Portal-Datenbank (Zählerstände); Verknüpfungsmerkmal Kundennummer; Vorgehen z. B. ETL der ERP-Daten in eine Berichtstabelle oder Abruf über eine Zugriffsschicht und Zusammenführen; Auswertung z. B. Join von Zählerständen und Kunden über die Kundennummer, Gruppierung je Kunde mit Anzahl der Meldungen und Verbrauch als Summe, Filter auf den Berichtsmonat, Sortierung nach Name; Datenschutz: nur berechtigte Personen der Abrechnung, personenbezogene Daten nur im notwendigen Umfang, Zugriff protokollieren.
