# Entwurf Transport Management and Logistics, Lenk- und Ruhezeiten, Fahrtenschreiber, Fahrverbote, Kabotage: Ergänzung im Thema 2.1

Stand 19.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil C des Auftrags P-AJ (Erhebung TL-10). Einzufügen in `content/transport-management-logistics/hb2/2.1-transportplanung-durchfuehrung.md`: Abschnitt A **vor der Überschrift „### Ladungssicherung: Grundprinzipien“** (Anker; die Theorie steht damit hinter dem Abschnitt „Disposition: Fahrzeug- und Personaleinsatz“), B an die Karteikarten hinter K-2.1-20, C an das Quiz hinter Q-2.1-19. Bestand gezählt: 20 Karteikarten (K-2.1-01 bis -20, lückenlos), 19 Quizfragen (Q-2.1-01 bis -19, lückenlos); `git log -S` auf höhere IDs im Kurs fand keine entfernten IDs. Die neuen IDs sind K-2.1-21 bis -32 (12 Karten) und Q-2.1-20 bis -33 (14 Quizfragen, davon sechs Kurzantworten, fünf davon Rechenaufgaben). Die Fallaufgabe F-HB2-08 und die zwei Fachgesprächsfragen stehen in `tl-faelle-c.md`, die Rechtsangaben in `rechtsangaben-c.md`, die Verweise im Bestand (vier Ersetzungspaare in drei Dateien) in `ersetzungen-c.json`. Der `rechtsstand` der berührten Bestandsdateien wird beim Einspielen gesetzt (nicht Teil dieses Entwurfs).

**Zweck.** Der Bestand nennt „EU-Verordnung 561/2006“ und „maximale tägliche Lenkzeit“ ohne jede Zahl und behandelt Fahrtenschreiber, Fahrverbote und Kabotage gar nicht. Die Ergänzung gibt die Zahlen der Lenk- und Ruhezeiten (Zahlenübersicht als Tabelle, so geschnitten, dass ein späterer Lenk-/Ruhezeiten-Planer die Regeln abbilden könnte), erklärt Fahrtenschreiber, Nachweis und Kontrolle, das Sonn- und Feiertagsfahrverbot und die Kabotage und zeigt in einem Rechenbeispiel, wie die Disposition eine Tour nachrechnet. Perspektive durchgehend die der **Disposition der Fracora** als Frachtführerin mit eigenem Fuhrpark; wo Fracora als Spediteurin handelt (Vergabe an Unterfrachtführer), sagt der Text es. Abgrenzung: Das Arbeitszeitrecht (Höchstarbeitszeit, Pausen) steht im neuen Thema 3.7 des Fachgebiets HB3, der Personaleinsatz in Thema 3.5, Sicherheit auf Rastplätzen in Thema 2.9, die Disposition als Aufgabe im Abschnitt „Disposition: Fahrzeug- und Personaleinsatz“ dieses Themas; kein Klon zu Handelsfachwirt `hb2/2.4` (Arbeitszeit) und zu Bestand `hb2/2.1`.

**Rechtsnah (R4).** Gesetze, Verordnungen und Artikel stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz und Fall (die Bestandskarten K-2.1-07 und K-2.1-14 und Q-2.1-02 nennen sie weiter). Alle Rechtszahlen (Lenkzeiten, Pausen, Ruhezeiten, Fristen, Gewichtsgrenze, Uhrzeiten des Fahrverbots, Aufbewahrungs- und Kopierfristen, Bußgeldrahmen) tragen den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“ (in der Theorie als Absatz- oder Tabellenhinweis, in Karten und Quiz in der Frage). Die Zahlen wurden am Text der Verordnungen und Gesetze gelesen (Nachweis in `rechtsangaben-c.md`); Beispielwerte (Strecken, Geschwindigkeiten, Uhrzeiten, Gewichte) sind frei gewählt. Zeitkritisch: Fassung der Verordnungen nach den in `rechtsangaben-c.md` genannten Konsolidierungsständen (spätere Änderungen nicht geprüft), die vom EuGH am 04.10.2024 für nichtig erklärte Fahrzeug-Rückkehrpflicht (nur als Hinweis genannt), die Gewichtsgrenze von 2,5 t seit dem 1. Juli 2026, Bußgeldrahmen, Fahrverbote im Ausland (nur Hinweis).

---

# Thema 2.1

## A. Theorie-Ergänzung 2.1 (einfügen vor „### Ladungssicherung: Grundprinzipien“)

### Lenkzeit, Fahrtunterbrechung und Ruhezeit nach EU-Recht

Die folgenden Rechtsabschnitte wurden nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen) und ersetzen keine Rechtsberatung; die Zahlen sind am Verordnungstext gelesen, die Beispielwerte frei gewählt. Die Lenk- und Ruhezeiten des Fahrpersonals regelt die EU-Verordnung über Sozialvorschriften im Straßenverkehr (Stützangabe Verordnung (EG) Nr. 561/2006, im Folgenden VO 561/2006, in der durch das Mobilitätspaket geänderten Fassung). Sie gilt für die Güterbeförderung mit Fahrzeugen über 3,5 t zulässiger Höchstmasse einschließlich Anhänger; bei grenzüberschreitender Beförderung und bei Kabotage gilt sie seit dem 1. Juli 2026 schon ab 2,5 t (Stützangabe Art. 2). Einzelne Fahrzeugarten sind ausgenommen (Stützangabe Art. 3), etwa nichtgewerbliche Fahrten bis 7,5 t im Umkreis von 100 km mit Material für die Berufsausübung der fahrenden Person.

*Zahlenübersicht (Stand Oktober 2026, vor Verwendung prüfen):*

| Größe | Regel | Stützangabe VO 561/2006 |
|---|---|---|
| Tägliche Lenkzeit | höchstens 9 Stunden, zweimal je Woche höchstens 10 Stunden | Art. 6 Abs. 1 |
| Wöchentliche Lenkzeit | höchstens 56 Stunden | Art. 6 Abs. 2 |
| Zwei aufeinanderfolgende Wochen | höchstens 90 Stunden | Art. 6 Abs. 3 |
| Fahrtunterbrechung | nach 4,5 Stunden Lenkdauer mindestens 45 Minuten, ersatzweise mindestens 15 Minuten, danach mindestens 30 Minuten | Art. 7 |
| Regelmäßige tägliche Ruhezeit | mindestens 11 Stunden, auch zweiteilig (3 und 9 Stunden) | Art. 4 Buchst. g |
| Reduzierte tägliche Ruhezeit | mindestens 9, weniger als 11 Stunden; zwischen zwei Wochenruhezeiten höchstens dreimal | Art. 4 Buchst. g, Art. 8 Abs. 4 |
| Frist für die nächste Ruhezeit | innerhalb von 24 Stunden nach dem Ende der vorigen (Mehrfahrerbetrieb: mindestens 9 Stunden innerhalb von 30 Stunden) | Art. 8 Abs. 2, 5 |
| Regelmäßige Wochenruhezeit | mindestens 45 Stunden | Art. 4 Buchst. h |
| Reduzierte Wochenruhezeit | mindestens 24, weniger als 45 Stunden; Ausgleich bis zum Ende der dritten Woche danach, angehängt an eine Ruhezeit von mindestens 9 Stunden | Art. 8 Abs. 6, 6b, 7 |
| Beginn der Wochenruhezeit | spätestens nach sechs 24-Stunden-Zeiträumen | Art. 8 Abs. 6 |

Die **Lenkdauer** ist die Lenkzeit zwischen zwei Unterbrechungen oder Ruhezeiten; nach 4,5 Stunden ist die Unterbrechung Pflicht, auch wenn nicht am Stück gefahren wurde (Stützangabe Art. 4 Buchst. q). Als **Fahrtunterbrechung** zählt nur Zeit ohne Fahren und ohne andere Arbeit, die ausschließlich der Erholung dient (Stützangabe Art. 4 Buchst. d); Entladen, Papierarbeit und Warten in Bereitschaft sind keine. Eine Lenkzeit von 9 Stunden braucht deshalb eine, von 10 Stunden zwei Unterbrechungen. Eine Woche läuft von Montag 00:00 Uhr bis Sonntag 24:00 Uhr. Weil die nächste Ruhezeit innerhalb von 24 Stunden nach dem Ende der letzten genommen sein muss, bleiben bei ungeteilter regelmäßiger Ruhezeit höchstens 13 Stunden, bei reduzierter von 9 Stunden höchstens 15 Stunden für Fahren, Unterbrechungen und andere Arbeit.

Das **Mobilitätspaket** hat die Wochenruhe verschärft: Die regelmäßige Wochenruhezeit (ebenso jede Wochenruhezeit von mehr als 45 Stunden als Ausgleich) darf nicht im Fahrzeug verbracht werden, sondern in einer geeigneten Unterkunft mit Schlafgelegenheit und sanitären Einrichtungen auf Kosten des Arbeitgebers (Stützangabe Art. 8 Abs. 8). Das Unternehmen plant so, dass jede fahrende Person innerhalb von vier Wochen zur Betriebsstätte oder zum Wohnsitz zurückkehren kann, und dokumentiert dies (Stützangabe Art. 8 Abs. 8a). Zwei reduzierte Wochenruhezeiten hintereinander sind nur im grenzüberschreitenden Güterverkehr unter engen Bedingungen möglich (Stützangabe Art. 8 Abs. 6). Die frühere Pflicht, Fahrzeuge im grenzüberschreitenden Einsatz alle acht Wochen zur Betriebsstätte zurückzuführen, hat der EuGH 2024 für nichtig erklärt (Stützangabe Urteil vom 4. Oktober 2024, verbundene Rechtssachen C‑541/20 bis C‑555/20); die Rückkehr des Fahrpersonals binnen vier Wochen zu planen, gilt weiter (Stand Oktober 2026, vor Verwendung prüfen). Ausnahmen sind eng begrenzt, etwa zum Erreichen eines Halteplatzes oder, unter außergewöhnlichen Umständen, von Betriebsstätte oder Wohnsitz, jeweils mit Vermerk und Ausgleich (Stützangabe Art. 12); für Fähre und Zug gelten Sonderregeln (Stützangabe Art. 9).

### Fahrtenschreiber, Nachweis und Kontrolle

Nachgewiesen wird die Einhaltung mit dem **Fahrtenschreiber**, der in allen Fahrzeugen einzubauen und zu benutzen ist, für die die VO 561/2006 gilt (Stützangabe Art. 3 Abs. 1 der Verordnung (EU) Nr. 165/2014). Es gibt analoge Geräte mit Schaublatt, digitale mit Karten und den **intelligenten Fahrtenschreiber**, der zusätzlich den Standort aufzeichnet: zu Beginn und Ende der täglichen Arbeitszeit, bei jedem Grenzübertritt, bei jeder Be- und Entladung und nach jeweils drei Stunden Lenkzeit (Stützangabe Art. 8 Abs. 1).

Von den vier Kartenarten (Stützangabe Art. 2) gehört die **Fahrerkarte** einer fahrenden Person und speichert ihre Tätigkeiten; mit der **Unternehmenskarte** zeigt das Unternehmen Daten an, lädt sie herunter und druckt sie aus; **Kontrollkarte** und **Werkstattkarte** nutzen Behörden und Werkstätten. Die fahrende Person nutzt ab der Fahrzeugübernahme ihre Karte, darf keine Daten verfälschen (Stützangabe Art. 32 Abs. 3, Art. 34 Abs. 1) und muss bei Kontrollen die Fahrerkarte sowie Aufzeichnungen und Ausdrucke für den laufenden Tag und die vorausgehenden 56 Tage vorlegen können (Stützangabe Art. 36 Abs. 2). Das Unternehmen kopiert die Daten rechtzeitig: Fahrerkartendaten spätestens 28 Kalendertage, Daten des Massenspeichers spätestens 90 Tage nach Aufzeichnung eines Ereignisses (Stützangabe § 2 Abs. 5 FPersV; Stand Oktober 2026, vor Verwendung prüfen). Die Daten sind mindestens zwölf Monate aufzubewahren und Kontrollen zugänglich zu machen (Stützangabe Art. 10 Abs. 5 VO 561/2006).

Verantwortlich ist das **Verkehrsunternehmen**: Es muss die Arbeit so organisieren sowie das Fahrpersonal so anweisen und prüfen, dass die Regeln eingehalten werden, und haftet für Verstöße seines Fahrpersonals (Stützangabe Art. 10 Abs. 2, 3). Auch **Spediteure** und Auftraggeber müssen sicherstellen, dass vertraglich vereinbarte Beförderungszeitpläne nicht gegen die Verordnung verstoßen (Stützangabe Art. 10 Abs. 4; § 20a FPersV). Verstöße sind Ordnungswidrigkeiten (bei Unternehmern und Fahrern bei Vorsatz oder Fahrlässigkeit): Die Geldbuße beträgt höchstens 30.000 € für Unternehmer sowie für Verlader und Spediteure mit unzulässigem Zeitplan, höchstens 5.000 € für die fahrende Person (Stützangabe § 8a Abs. 1 bis 4 FPersG; Stand Oktober 2026, vor Verwendung prüfen).

### Sonn- und Feiertagsfahrverbot

An Sonn- und Feiertagen dürfen von 0:00 bis 22:00 Uhr zur geschäftsmäßigen oder entgeltlichen Beförderung von Gütern Lastkraftwagen mit einer zulässigen Gesamtmasse über 7,5 t sowie Anhänger hinter Lastkraftwagen nicht geführt werden; **Leerfahrten** sind eingeschlossen (Stützangabe § 30 Abs. 3 StVO; Stand Oktober 2026, vor Verwendung prüfen). Ausgenommen sind unter anderem der kombinierte Verkehr Schiene–Straße (bis 200 km zum nächsten geeigneten Bahnhof) und Hafen–Straße (Hafen im Umkreis von höchstens 150 km), frische Milch, frisches Fleisch, frischer Fisch und leicht verderbliches Obst und Gemüse, Pannenhilfe nach Unfall oder Notfall und lebende Bienen. Feiertage sind bundesweit Neujahr, Karfreitag, Ostermontag, 1. Mai, Christi Himmelfahrt, Pfingstmontag, 3. Oktober und beide Weihnachtstage, regional auch Fronleichnam, Reformationstag und Allerheiligen (Stützangabe § 30 Abs. 4 StVO). Eile oder ein Kundentermin sind in der Vorschrift nicht als Ausnahme genannt; im Einzelfall kann die Straßenverkehrsbehörde Ausnahmen genehmigen (Stützangabe § 46 Abs. 1 Nr. 7 StVO). Die Ferienreiseverordnung verbietet außerdem an allen Samstagen vom 1. Juli bis 31. August von 7:00 bis 20:00 Uhr die Fahrt von Lkw über 7,5 t und von Lkw mit Anhänger auf aufgezählten Autobahn- und Bundesstraßenstrecken (Stützangabe § 1 Ferienreiseverordnung). Nachbarstaaten haben eigene Fahrverbote mit anderen Zeiten und Gewichtsgrenzen; sie sind vor jeder Auslandstour zu prüfen (aus Kenntnis, nicht nachgeschlagen). Vom Fahrverbot zu trennen ist das arbeitszeitrechtliche Beschäftigungsverbot an Sonn- und Feiertagen (Thema 3.7 „Arbeits- und Gesundheitsschutz in der Logistik“ im Fachgebiet „Kommunikation, Führung und Zusammenarbeit sicherstellen“).

### Kabotage

**Kabotage** ist der gewerbliche innerstaatliche Verkehr, den ein gebietsfremdes Unternehmen zeitweilig in einem Aufnahmestaat durchführt (Stützangabe Art. 2 Nr. 6 der Verordnung (EG) Nr. 1072/2009, im Folgenden VO 1072/2009). Voraussetzung ist eine Gemeinschaftslizenz, bei Fahrpersonal aus Drittstaaten zusätzlich eine Fahrerbescheinigung (Stützangabe Art. 8 Abs. 1). Nach einer grenzüberschreitenden Beförderung in den Aufnahmestaat sind nach der Auslieferung bis zu **drei** Kabotagebeförderungen mit demselben Fahrzeug erlaubt; die letzte Entladung muss **innerhalb von sieben Tagen** nach der letzten Entladung der eingeführten Sendung erfolgen (Stützangabe Art. 8 Abs. 2). Nach dem Ende der Kabotage gilt eine **Sperrfrist von vier Tagen**: Mit demselben Fahrzeug darf im selben Staat keine neue Kabotage stattfinden (Stützangabe Art. 8 Abs. 2a). Eine Rückladung in den Heimatstaat ist keine Kabotage, sondern grenzüberschreitender Verkehr. Nachzuweisen sind die grenzüberschreitende Beförderung und jede Kabotagebeförderung durch Belege wie Frachtbrief oder elektronischen Frachtbrief mit Angaben zu Absender, Empfänger, Übernahme, Ware, Bruttomasse und Kennzeichen; sie sind bei der Straßenkontrolle auszuhändigen oder elektronisch zu übermitteln (Stützangabe Art. 8 Abs. 3, 4a). Im Aufnahmestaat gelten für Beförderungsvertrag, Gewichte, Gefahrgut, Lenk- und Ruhezeiten und Mehrwertsteuer dessen Vorschriften (Stützangabe Art. 9); bei Verstößen kann er Kabotage zeitweise verbieten (Stützangabe Art. 13 Abs. 2).

### Disposition mit Lenk- und Ruhezeiten

Aus den Zahlen ergibt sich ein Tagesbudget: Je fahrende Person stehen 9 Stunden Lenkzeit (zweimal je Woche 10) in einem Zeitfenster von höchstens 13 Stunden zur Verfügung; Unterbrechungen, Entladen, Warten und Papierarbeit zehren am Fenster, nicht an der Lenkzeit. Die Disposition legt Unterbrechungen auf bewachte Rastplätze (siehe Thema 2.9 „Lieferkettensicherheit und Betrugsprävention“), rechnet mit realistischen Durchschnittsgeschwindigkeiten und baut **Puffer** für Stau und Wartezeiten ein, weil Ausnahmen keine Planungsgrundlage sind. Sprengt eine Tour die Tagesgrenzen, kommen **Fahrerwechsel** oder **Zweier-Besatzung** (Mehrfahrerbetrieb) in Betracht: Die zweite Person verlängert die Einsatzzeit des Fahrzeugs, nicht die Lenkzeit je Person, und die Unterbrechung darf in dem vom anderen gelenkten Fahrzeug genommen werden, wenn die pausierende Person nicht unterstützt (Stützangabe Art. 7 Unterabs. 3). Zusagen an die Kundschaft („Anlieferung bis 14:00 Uhr“) werden erst gegeben, wenn der Plan die Regeln einhält; das gilt auch, wenn Fracora als Spediteurin an Unterfrachtführer vergibt.

### Rechenbeispiel: Tour mit Lenkzeit, Fahrtunterbrechung und Ruhezeit

*(Frei gewählte Beispielwerte; Einzelbesatzung; Stand Oktober 2026, vor Verwendung prüfen.)* Ein Sattelzug der Fracora startet am Dienstag, 10. November 2026. Die fahrende Person beginnt den Dienst um 05:15 Uhr mit Fahrzeugkontrolle und Papieren (15 Minuten andere Arbeit) und lenkt ab 05:30 Uhr. Abschnitt 1 hat 297 km bei durchschnittlich 66 km/h: 297 ÷ 66 = 4,5 Stunden, Ankunft um 10:00 Uhr. Entladen und Papiere dauern 45 Minuten (andere Arbeit) bis 10:45 Uhr. Nach 4,5 Stunden Lenkdauer folgt die Fahrtunterbrechung von 45 Minuten bis 11:30 Uhr. Abschnitt 2 hat 231 km: 231 ÷ 66 = 3,5 Stunden, Ankunft um 15:00 Uhr. Die Lenkzeit beträgt 4,5 + 3,5 = 8 Stunden. Nach 30 Minuten Abschluss endet der Dienst um 15:30 Uhr, die regelmäßige Ruhezeit von 11 Stunden endet am Mittwoch um 02:30 Uhr. Die Frist von 24 Stunden läuft vom Ende der letzten Ruhezeit (Dienstag 05:15 Uhr) bis Mittwoch 05:15 Uhr; eine regelmäßige Ruhezeit müsste also spätestens um 18:15 Uhr beginnen (05:15 Uhr + 13 Stunden), eine reduzierte von 9 Stunden spätestens um 20:15 Uhr.

*Doppelwoche:* Hat die fahrende Person in der ersten Woche 52 Stunden gelenkt, bleiben für die zweite Woche höchstens 90 − 52 = 38 Stunden (die Wochengrenze von 56 Stunden wird dabei nicht erreicht).

*Kabotage:* Entlädt der Sattelzug am Montag, 9. November 2026 eine Sendung in Tschechien (Annahme des Beispiels), müssen bis zu drei Kabotagebeförderungen dort bis Montag, 16. November 2026 entladen sein (der Tag der Entladung zählt nicht mit); nach dem Ende der letzten Kabotagebeförderung gilt für vier Tage eine Sperrfrist (Zählweise im Einzelfall prüfen).

## B. Karteikarten 2.1 (anhängen)

#### K-2.1-21
**Frage:** Wie lang darf die tägliche Lenkzeit sein, und wann darf sie verlängert werden (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Höchstens 9 Stunden. Zweimal in der Woche darf sie auf höchstens 10 Stunden verlängert werden. Die wöchentliche Lenkzeit darf 56 Stunden nicht überschreiten.
`tags: lenkzeiten, recht` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-2.1-22
**Frage:** Wie viel darf in zwei aufeinanderfolgenden Wochen gelenkt werden, und wie rechnest du den Rest der zweiten Woche (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Höchstens 90 Stunden. Rest der zweiten Woche = 90 − Lenkzeit der ersten Woche, höchstens 56 Stunden. Beispiel: 50 Stunden in Woche 1, dann höchstens 40 Stunden in Woche 2.
`tags: lenkzeiten, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-2.1-23
**Frage:** Wann ist eine Fahrtunterbrechung Pflicht, wie lang ist sie, und wie darf sie geteilt werden (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Nach 4,5 Stunden Lenkdauer mindestens 45 Minuten. Teilung nur so: zuerst mindestens 15 Minuten, danach mindestens 30 Minuten. In dieser Zeit wird weder gefahren noch gearbeitet.
`tags: lenkzeiten, pausen` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-24
**Frage:** Welche täglichen Ruhezeiten gibt es, und wann muss die nächste genommen sein (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Regelmäßig mindestens 11 Stunden (auch 3 + 9 Stunden), reduziert mindestens 9 Stunden; zwischen zwei Wochenruhezeiten höchstens dreimal reduziert. Die nächste muss innerhalb von 24 Stunden nach dem Ende der vorigen genommen sein.
`tags: ruhezeiten, recht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-25
**Frage:** Wie lang sind regelmäßige und reduzierte Wochenruhezeit, und wie wird eine Verkürzung ausgeglichen (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Regelmäßig mindestens 45 Stunden, reduziert mindestens 24 Stunden. Der Ausgleich erfolgt bis zum Ende der dritten Woche danach, angehängt an eine Ruhezeit von mindestens 9 Stunden. Beginn spätestens nach sechs 24-Stunden-Zeiträumen.
`tags: ruhezeiten, recht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-26
**Frage:** Wo darf die regelmäßige Wochenruhezeit nicht verbracht werden, und was muss das Unternehmen zur Rückkehr planen (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Nicht im Fahrzeug, sondern in einer geeigneten Unterkunft auf Kosten des Arbeitgebers. Das Unternehmen plant so, dass die fahrende Person innerhalb von vier Wochen zur Betriebsstätte oder zum Wohnsitz zurückkehren kann, und dokumentiert das.
`tags: ruhezeiten, mobilitaetspaket` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.1-27
**Frage:** Wozu dienen Fahrerkarte, Unternehmenskarte und Kontrollkarte beim digitalen Fahrtenschreiber?
**Antwort:** Die Fahrerkarte gehört einer fahrenden Person und speichert ihre Tätigkeiten. Mit der Unternehmenskarte zeigt das Unternehmen Daten an, lädt sie herunter und druckt sie aus. Die Kontrollkarte nutzen Behörden zum Auslesen.
`tags: fahrtenschreiber` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.1-28
**Frage:** Was zeichnet ein intelligenter Fahrtenschreiber zusätzlich zu den Tätigkeiten auf (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Den Standort des Fahrzeugs: zu Beginn und Ende der täglichen Arbeitszeit, bei jedem Grenzübertritt, bei jeder Be- und Entladung und nach jeweils drei Stunden Lenkzeit. Behörden können per Fernkommunikation Hinweise auf Manipulation abfragen.
`tags: fahrtenschreiber` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-29
**Frage:** Wie lange muss ein Unternehmen Fahrtenschreiberdaten aufbewahren, und wie schnell muss es sie kopieren (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Mindestens zwölf Monate aufbewahren. Kopieren: Fahrerkartendaten spätestens 28 Kalendertage, Daten des Massenspeichers im Fahrzeug spätestens 90 Tage nach Aufzeichnung eines Ereignisses.
`tags: fahrtenschreiber, recht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-30
**Frage:** Für wen und wann gilt das Sonn- und Feiertagsfahrverbot im Güterverkehr (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Für Lkw über 7,5 t zulässiger Gesamtmasse und Anhänger hinter Lkw bei gewerblicher Beförderung, auch Leerfahrten, an Sonn- und Feiertagen von 0:00 bis 22:00 Uhr. Ausnahmen u. a. für frische Milch, Pannenhilfe und bestimmten kombinierten Verkehr.
`tags: fahrverbote, recht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.1-31
**Frage:** Was ist Kabotage, und wie viele Beförderungen sind in welcher Frist erlaubt (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Gewerblicher Verkehr innerhalb eines anderen EU-Staats. Nach einer grenzüberschreitenden Beförderung dorthin höchstens drei Kabotagebeförderungen mit demselben Fahrzeug; die letzte Entladung muss innerhalb von sieben Tagen nach der Entladung der eingeführten Sendung erfolgen.
`tags: kabotage, recht` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.1-32
**Frage:** Welche Sperrfrist gilt nach einer Kabotage, und welche Nachweise gehören in den Lkw (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Vier Tage lang keine neue Kabotage mit demselben Fahrzeug im selben Staat. Nachweise: Belege, z. B. Frachtbrief (auch elektronisch), für die grenzüberschreitende Beförderung und jede Kabotagebeförderung; sie sind bei der Kontrolle vorzulegen.
`tags: kabotage, recht` · `schwierigkeit: mittel` · `bloom: erinnern`

## C. Quiz 2.1 (anhängen)

#### Q-2.1-20 · Multiple Choice
**Frage:** Eine Tour von Fracora erfordert mehr als 4,5 Stunden Lenkzeit, und die vorgeschriebene Fahrtunterbrechung soll in zwei Teilen genommen werden (Stand Oktober 2026, vor Verwendung prüfen). Welche Aufteilung ist zulässig?
- [ ] Zuerst 30 Minuten, danach 15 Minuten
- [x] Zuerst 15 Minuten, danach 30 Minuten
- [ ] Drei Teile zu je 15 Minuten
- [ ] Zuerst 20 Minuten, danach 25 Minuten
**Erklärung:** Die Unterbrechung von 45 Minuten darf nur durch mindestens 15 Minuten, gefolgt von mindestens 30 Minuten, ersetzt werden. Die umgekehrte Reihenfolge, drei Teile und 20 plus 25 Minuten erfüllen das nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-21 · Kurzantwort
**Frage:** Eine fahrende Person hat in der ersten Woche 30 Stunden gelenkt. Wie viele Stunden darf sie in der zweiten Woche höchstens lenken, wenn die Grenze für zwei aufeinanderfolgende Wochen und die Wochengrenze beachtet werden (Stand Oktober 2026, vor Verwendung prüfen; Antwort in Stunden)?
**Akzeptierte Antworten:** 56; 56 h; 56 Stunden; 56 Std.; 56,0; 56,00
**Erklärung:** Für zwei Wochen sind höchstens 90 Stunden erlaubt, rechnerisch also 90 − 30 = 60 Stunden. In einer einzelnen Woche sind aber höchstens 56 Stunden zulässig; die engere Grenze gilt, also 56 Stunden.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-22 · Kurzantwort
**Frage:** Eine fahrende Person beginnt um 06:15 Uhr zu lenken und fährt 4 Stunden 30 Minuten ohne Unterbrechung. Danach legt sie die vorgeschriebene Fahrtunterbrechung als einen Block mit der Mindestdauer ein (Stand Oktober 2026, vor Verwendung prüfen). Ab wann darf sie frühestens weiterfahren? Antwort im Format HH:MM.
**Akzeptierte Antworten:** 11:30; 11:30 Uhr; 11.30; 11.30 Uhr; 11:30 h
**Erklärung:** 06:15 Uhr + 4:30 Stunden = 10:45 Uhr; die Fahrtunterbrechung dauert mindestens 45 Minuten, also bis 11:30 Uhr.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-2.1-23 · Kurzantwort
**Frage:** Die letzte tägliche Ruhezeit einer fahrenden Person endete um 05:30 Uhr. Die nächste Ruhezeit soll ungeteilt und regelmäßig sein (Mindestdauer) und innerhalb von 24 Stunden nach dem Ende der letzten Ruhezeit vollständig liegen (Stand Oktober 2026, vor Verwendung prüfen). Zu welcher Uhrzeit muss sie spätestens beginnen? Antwort im Format HH:MM.
**Akzeptierte Antworten:** 18:30; 18:30 Uhr; 18.30; 18.30 Uhr; 18:30 h
**Erklärung:** 24 Stunden − 11 Stunden = 13 Stunden. 05:30 Uhr + 13 Stunden = 18:30 Uhr; beginnt die Ruhezeit später, lässt sich eine regelmäßige Ruhezeit nicht mehr im Zeitraum unterbringen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-24 · Zuordnung
**Anweisung:** Ordne jeder Fahrtenschreiberkarte ihren Zweck zu.
- Fahrerkarte ↔ Persönliche Karte der fahrenden Person, speichert ihre Tätigkeiten
- Unternehmenskarte ↔ Karte des Unternehmens zum Anzeigen, Herunterladen und Ausdrucken von Daten
- Kontrollkarte ↔ Karte der Kontrollbehörde zum Auslesen von Daten
- Werkstattkarte ↔ Karte der Werkstatt zum Prüfen, Kalibrieren und Aktivieren des Geräts
**Erklärung:** Die vier Kartenarten unterscheiden sich nach den Berechtigten: fahrende Person, Unternehmen, Behörde und Werkstatt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-2.1-25 · Wahr/Falsch
**Aussage:** Die regelmäßige wöchentliche Ruhezeit darf in der Schlafkabine des Lkw verbracht werden, wenn die Kabine eine Liege hat.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Sie ist in einer geeigneten Unterkunft mit Schlafgelegenheit und sanitären Einrichtungen zu verbringen, deren Kosten der Arbeitgeber trägt. Für Fähre und Zug gelten eng begrenzte Sonderregeln.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-2.1-26 · Multiple Choice
**Frage:** Die Disposition der Fracora will am Sonntag um 20:00 Uhr einen leeren Sattelzug (40 t) zum Depot zurückfahren lassen (Stand Oktober 2026, vor Verwendung prüfen). Wie ist das zu beurteilen?
- [ ] Erlaubt, weil ohne Ladung keine geschäftsmäßige Beförderung vorliegt.
- [ ] Erlaubt, weil das Verbot nur für Gefahrguttransporte gilt und hier keine Gefahrgüter an Bord sind.
- [x] Verboten: Das Verbot gilt bis 22:00 Uhr und schließt auch Leerfahrten ohne Ladung ein.
- [ ] Erlaubt, weil das Verbot an Sonntagen nur bis 18:00 Uhr gilt und die Fahrt danach beginnt.
**Erklärung:** Für Lkw über 7,5 t zulässiger Gesamtmasse gilt an Sonn- und Feiertagen von 0:00 bis 22:00 Uhr ein Fahrverbot, das auch Leerfahrten im Zusammenhang mit der gewerblichen Beförderung erfasst.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-27 · Mehrfachauswahl
**Frage:** Welche Fahrten sind vom Sonn- und Feiertagsfahrverbot für Lkw über 7,5 t ausgenommen (Stand Oktober 2026, vor Verwendung prüfen)?
- [x] Beförderung frischer Milch und frischer Milcherzeugnisse
- [ ] Eilige Ersatzteillieferung an eine Kundschaft mit drohendem Produktionsstillstand
- [x] Einsatz eines Pannenhilfefahrzeugs nach einem Unfall
- [ ] Beförderung von Papierrollen, die am Montagmorgen bei der Kundschaft sein müssen
**Erklärung:** Frische Milch und Pannenhilfe stehen im Katalog der Ausnahmen. Eile oder ein Montagstermin sind keine gesetzlichen Ausnahmen; in Einzelfällen kann die Straßenverkehrsbehörde eine Ausnahme genehmigen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-28 · Sortieren
**Anweisung:** Bringe die Ruhezeiten nach ihrer Mindestdauer in die Reihenfolge, die kürzeste zuerst.
1. Reduzierte tägliche Ruhezeit
2. Regelmäßige tägliche Ruhezeit
3. Reduzierte wöchentliche Ruhezeit
4. Regelmäßige wöchentliche Ruhezeit
**Erklärung:** Die Mindestdauern betragen 9, 11, 24 und 45 Stunden (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-29 · Kurzantwort
**Frage:** Ein Lkw mit deutscher Zulassung entlädt am Dienstag, 3. November 2026 eine Sendung aus Deutschland in Belgien und führt dort danach Kabotage durch. An welchem Tag muss die letzte Kabotage-Entladung in Belgien spätestens erfolgt sein (Stand Oktober 2026, vor Verwendung prüfen; der Tag der Entladung zählt nicht mit)? Antwort im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 10.11.2026; 10.11.26; 10. November 2026; 10.November 2026
**Erklärung:** Die letzte Entladung muss innerhalb von sieben Tagen nach der letzten Entladung der eingeführten Sendung erfolgen: 3. November + 7 Tage = Dienstag, 10. November 2026.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.1-30 · Kurzantwort
**Frage:** Wie viele Tage lang darf ein Unternehmen nach dem Ende seiner Kabotage in einem Staat dort mit demselben Fahrzeug keine neue Kabotage durchführen (Stand Oktober 2026, vor Verwendung prüfen)?
**Akzeptierte Antworten:** 4; 4 Tage; vier; vier Tage; 4 tagen; vier tagen
**Erklärung:** Es gilt eine Sperrfrist von vier Tagen. Sie verhindert, dass ein Fahrzeug dauerhaft im Aufnahmestaat eingesetzt wird.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-2.1-31 · Lückentext (Wortauswahl)
**Text:** Die tägliche Lenkzeit darf höchstens ___9___ Stunden betragen; zweimal in der Woche darf sie auf höchstens ___10___ Stunden verlängert werden.
**Zusätzliche Begriffe:** 8; 11; 12
**Erklärung:** Die Regelgrenze beträgt 9 Stunden, die verlängerte Grenze 10 Stunden und ist nur zweimal je Woche zulässig (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-2.1-32 · Multiple Choice
**Frage:** Fracora vergibt als Spediteurin eine Tour an einen Unterfrachtführer und vereinbart mit der Kundschaft einen Zeitplan, den der Unterfrachtführer nur mit Verstößen gegen die Lenk- und Ruhezeiten einhalten könnte. Wer kann dafür zur Verantwortung gezogen werden?
- [ ] Nur der Unterfrachtführer, weil er das Fahrpersonal beschäftigt und dessen Einsatz selbst organisiert.
- [ ] Nur die fahrende Person, weil sie das Fahrzeug lenkt und den Fahrtenschreiber bedient.
- [ ] Niemand, solange der Verstoß nicht bei einer Straßenkontrolle festgestellt wird.
- [x] Auch Fracora: Als Spedition muss sie sicherstellen, dass vereinbarte Zeitpläne passen.
**Erklärung:** Verantwortlich sind Verkehrsunternehmen, aber auch Speditionen, Verlader und Auftraggebende, die einen Beförderungszeitplan vereinbaren; der Verstoß ist eine Ordnungswidrigkeit mit Geldbuße.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-2.1-33 · Kurzantwort
**Frage:** Auf einer Fahrerkarte wird am Mittwoch, 4. November 2026 ein Ereignis aufgezeichnet. Die Daten müssen spätestens 28 Kalendertage nach der Aufzeichnung im Betrieb kopiert sein (Stand Oktober 2026, vor Verwendung prüfen; der Tag der Aufzeichnung zählt nicht mit). Bis zu welchem Tag? Antwort im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 02.12.2026; 2.12.2026; 02.12.26; 2.12.26; 2. Dezember 2026; 2.Dezember 2026
**Erklärung:** 4. November 2026 + 28 Tage = Mittwoch, 2. Dezember 2026.
`schwierigkeit: mittel` · `bloom: anwenden`
