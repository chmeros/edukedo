# Entwurf Fachinformatiker Anwendungsentwicklung, Cyber Resilience Act aus Sicht der Softwareentwicklung: Ergänzung im Thema 9.1

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil C des Pakets P-AY (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, dort „P-AV im Einzelnen“ Teil C; Lücke L-FI-03); nach der Prüfung (`pruefung-c.md`) überarbeitet. Einzufügen **nur im Kurs Anwendungsentwicklung** in `content/fachinformatiker-anwendungsentwicklung/ae2/9.1-sicherheit-in-der-softwareentwicklung.md`: Abschnitt A **vor der Überschrift „### Sicherheit im Entwicklungsprozess verankern“** (die Theorie steht damit hinter „### Abhängigkeiten prüfen“), B an die Karteikarten hinter K-9.1-19, C an das Quiz hinter Q-9.1-12. Bestand gezählt (Stand 23.10.2026): 19 Karteikarten (K-9.1-01 bis -19, lückenlos), 12 Quizfragen (Q-9.1-01 bis -12, lückenlos); `git log -S` auf K-9.1-20, Q-9.1-13 und F-AE2-04 ergibt im Kurs Anwendungsentwicklung keine entfernten IDs. Die neuen IDs sind K-9.1-20 bis -27 (8 Karten) und Q-9.1-13 bis -22 (10 Quizfragen, davon 2 Kurzantworten mit Datum bzw. Zahl). Die Fallaufgabe F-AE2-04 (Bestand F-AE2-01 bis -03) steht in `fi-faelle-c.md` (kein Fachgespräch: `ae2` hat keine `fachgespraech.md`), die Rechtsangaben in `rechtsangaben-c.md`, die Ersetzungen im Bestand in `ersetzungen-c.json` (leer). Der `rechtsstand` von `ae2/9.1` und `ae2/fallaufgaben.md` wird beim Einspielen gesetzt.

**Zweck.** Der Bestand behandelt Sicherheit in der Softwareentwicklung als Qualitätsmerkmal (Security by Design, Schwachstellenarten, Secrets, Abhängigkeiten mit CVE, CVSS, Software Composition Analysis, ein Halbsatz zur Stückliste „SBOM“). Er sagt nicht, dass für Unternehmen, die Software unter eigenem Namen auf dem Markt bereitstellen, hierzu **gesetzliche Pflichten** bestehen. Die Ergänzung zeigt die Sicht des Entwicklungsteams: Risikobewertung, Abhängigkeiten, Stückliste, Schwachstellenbehandlung, Meldeprozess, Releases, Dokumentation. **Nicht wiederholt** werden Rollen, Anwendungsbereich, Anforderungsliste, Konformitätsbewertung, Meldefristen als Tabelle, Sanktionen und Zeitplan im Einzelnen: dafür gilt Thema 6.7 „Cyber Resilience Act“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“ (Teil B); die Pflichten von Einrichtungen stehen in Thema 6.6 „NIS2, KRITIS und Meldepflichten“ (Teil A), die Datenpanne in Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“. Lizenzen und Open-Source-Compliance gehören nicht hierher (Teil K, Thema 2.2).

**Rechtsnah (R4).** Paragrafen und Artikel stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz und Fall. Rechtsgrundlagen am Rohtext gelesen (Verordnung (EU) 2024/2847, deutsche Amtsblattfassung, publications.europa.eu; Einzelheiten in `rechtsangaben-c.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): Zeitplan (Meldepflichten seit 11.09.2026, übrige Pflichten ab 11.12.2027), Leitlinien der Kommission, Format der Stückliste, harmonisierte Normen. Alle Namen, Daten und Zahlen sind frei gewählte Beispielwerte; Brevanta ist hier Herstellerin (Annahme des Pakets), im Fall mit dem Beispielprodukt „Serviceplan“ (Annahme).

---

# Thema 9.1

## A. Theorie-Ergänzung 9.1 (einfügen vor „### Sicherheit im Entwicklungsprozess verankern“)

### Herstellerpflichten: Wo das Entwicklungsteam betroffen ist

Entwickelnde Unternehmen können nach dem Cyber Resilience Act (CRA, Verordnung (EU) 2024/2847) **Hersteller** sein: Wer Software mit einer Datenverbindung zu einem Gerät oder Netz im Rahmen einer Geschäftstätigkeit unter eigenem Namen oder eigener Marke auf dem Markt bereitstellt, trägt die Herstellerpflichten, auch wenn Teile des Codes von Dritten stammen. Die Brevanta IT-Systemhaus GmbH ist in diesem Sinne Herstellerin, sobald sie eine eigene Standardsoftware ausliefert (Annahme dieser Ergänzung). Bei Kundenanwendungen im Auftrag kommt es auf den Einzelfall an; für maßgeschneiderte Produkte erlaubt das Gesetz vertragliche Abweichungen. Rolle, Anwendungsbereich, Anforderungen, Konformitätsbewertung, Meldefristen und Sanktionen erklärt Thema 6.7 „Cyber Resilience Act“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“; die Pflichten von Einrichtungen stehen in Thema 6.6 „NIS2, KRITIS und Meldepflichten“ im selben Fachgebiet. Das ist ein **Überblick**, keine Rechtsberatung; die Aussagen sind nicht förmlich rechtsgeprüft (Stützangaben sind Artikel des CRA). „Praxis“ und „Folgerung“ kennzeichnen Aussagen ohne gesetzliche Vorgabe.

Zeitlich gilt (Stützangabe Art. 69, 71): Die Meldepflichten bestehen seit dem 11.09.2026, auch für Software, die schon bei der Kundschaft läuft. Alle übrigen Herstellerpflichten gelten ab dem 11.12.2027. Ein Produkt, das erstmals nach diesem Stichtag in Verkehr gebracht wird, etwa die Version 1.0 einer neuen Standardsoftware, muss sie schon bei der Bereitstellung erfüllen; die Prozesse müssen deshalb vorher stehen. Früher in Verkehr gebrachte Produkte erfassen sie nur nach einer wesentlichen Änderung. Ob ein neues Release eines älteren Produkts als wesentliche Änderung oder als neues Produkt gilt, ist Auslegung (Leitlinien der Kommission); vorsorglich wird ein Release nach dem Stichtag so vorbereitet, als gälten die Pflichten (Praxis). Stand Oktober 2026, vor Verwendung prüfen.

### Anforderungen in den Entwicklungsprozess übersetzen

Am Anfang steht eine **Bewertung der Cybersicherheitsrisiken**. Sie berücksichtigt Zweckbestimmung, vorhersehbare Verwendung, Betriebsumgebung und Nutzungsdauer, fließt in Planung, Entwicklung, Lieferung und Wartung ein, wird dokumentiert und bei Bedarf aktualisiert. Aus ihr ergibt sich, welche Sicherheitsanforderungen für das Produkt gelten und wie das Team sie erfüllt; wo eine Anforderung nicht passt, wird das begründet und in der technischen Dokumentation abgelegt (Stützangabe Art. 13 Abs. 2 bis 4).

Die Produktanforderungen (Liste in Thema 6.7) sind risikobasiert und gelten, soweit sie zutreffen (Stützangabe Anhang I Teil I Nr. 2). Die bekannten Entwurfsprinzipien dieses Themas decken viele davon ab (Erläuterung): Secure Defaults die sichere Standardkonfiguration, Least Privilege und Autorisierung den Zugriffsschutz, Verschlüsselung die Vertraulichkeit, Datensparsamkeit die Datenminimierung, Minimierung der Angriffsfläche die geringe Angriffsfläche. Hinzu kommt die Vorgabe, ein Produkt **ohne bekannte ausnutzbare Schwachstellen** bereitzustellen. Ausnutzbar heißt: Angreifende könnten sie im realen Betrieb tatsächlich zum Erfolg führen (Stützangabe Anhang I Teil I Nr. 2 Buchst. a, Art. 3 Nr. 41). Ein Scanbefund ist deshalb zunächst zu bewerten: Ist die verwundbare Funktion erreichbar und nutzbar? Das Ergebnis wird dokumentiert (Folgerung). Außerdem ist die Sicherheit regelmäßig und wirksam zu testen; Testberichte gehören zur technischen Dokumentation (Stützangabe Anhang I Teil II Nr. 3, Anhang VII Nr. 6). Stand Oktober 2026, vor Verwendung prüfen.

### Abhängigkeiten, Software-Stückliste und Drittkomponenten

Zum Schwachstellenverfahren gehört eine **Software-Stückliste** (SBOM), eine Aufzeichnung der Komponenten und ihrer Lieferkettenbeziehungen: maschinenlesbar, in einem gängigen Format und mit **mindestens den obersten Abhängigkeiten** (Stützangabe Anhang I Teil II Nr. 1, Art. 3 Nr. 39). Verbreitete Formate sind CycloneDX und SPDX (technische Erläuterung); die Kommission kann Format und Elemente festlegen (Stützangabe Art. 13 Abs. 24). Die obersten Abhängigkeiten sind die direkt eingebundenen Bibliotheken. Die Lock-Datei (Thema 10.1 „Entwicklungsumgebungen und -bibliotheken auswählen und einsetzen“ im Fachgebiet „Planen eines Softwareproduktes“) enthält zusätzlich die **transitiven** Abhängigkeiten. Die Pflicht, Komponenten und Schwachstellen zu ermitteln, reicht nach dem Wortlaut weiter als der Mindestinhalt der Stückliste (Auslegung). Praxis ist, die Stückliste bei jedem Build aus der Lock-Datei zu erzeugen, je Release zu archivieren und mit dem Scanner abzugleichen. Zu **veröffentlichen** braucht der Hersteller sie nicht; als Teil der technischen Dokumentation kann die Marktüberwachung sie begründet anfordern, gibt er sie weiter, nennt er den Abrufort (Stützangabe Anhang VII Nr. 8, Anhang II Nr. 9, Erwägungsgrund 77).

Bei Komponenten Dritter, auch freier und quelloffener Software, muss der Hersteller die **gebotene Sorgfalt** walten lassen; die Verantwortung für das Gesamtprodukt bleibt bei ihm (Stützangabe Art. 13 Abs. 5). Der Umfang richtet sich nach dem Risiko der Komponente. Als Maßnahmen nennen die Erwägungsgründe den Nachweis der Konformität der Komponente (zum Beispiel CE-Kennzeichnung), regelmäßige Sicherheitsaktualisierungen, den Abgleich mit Schwachstellendatenbanken und zusätzliche Sicherheitsprüfungen (Stützangabe Erwägungsgrund 34). Praxis sind weitere Kriterien wie Pflegezustand und Reaktion der Betreuenden. Beim eigenen Unterstützungszeitraum kann der Hersteller die Zeiträume zugekaufter Komponenten mit Kernfunktionen berücksichtigen (Stützangabe Art. 13 Abs. 8). Cybersicherheitsaspekte, Schwachstellen und Informationen Dritter werden systematisch dokumentiert (Stützangabe Art. 13 Abs. 7); die Auswahl der Komponenten gehört dazu (Folgerung). Entdeckt das Team selbst eine Schwachstelle in einer fremden Komponente, auch einer quelloffenen, ist sie **den Betreuenden dieser Komponente zu melden**; zugleich wird sie im eigenen Produkt behoben, und eine selbst geschriebene Korrektur wird an die Betreuenden weitergegeben (Stützangabe Art. 13 Abs. 6). Das ist eine Meldung an die Betreuenden, keine Behördenmeldung. Stand Oktober 2026, vor Verwendung prüfen.

### Schwachstellen behandeln und Meldungen auslösen

**Eingang und Behebung.** Hinweise kommen intern (Scanner, Tests, Review) oder von außen. Der Hersteller hat eine Strategie für die **koordinierte Offenlegung** und gibt eine Kontaktadresse an; sie soll Diagnose und Behebung ermöglichen, bevor Einzelheiten an die Öffentlichkeit gelangen (Stützangabe Anhang I Teil II Nr. 5, 6, Art. 13 Abs. 17, Erwägungsgrund 76). Behoben wird **unverzüglich** über sichere Update-Wege (Einzelheiten in Thema 6.7). Nach dem Update werden Informationen über die beseitigte Schwachstelle veröffentlicht; in begründeten Fällen darf die Veröffentlichung aufgeschoben werden, bis das Update eingespielt werden konnte (Stützangabe Anhang I Teil II Nr. 4). Eine feste Zahl von Tagen nennt das Gesetz nicht; interne Fristen nach Schweregrad, zum Beispiel sieben Tage ab einem CVSS-Wert von 9,0, sind Praxis.

**Meldepflichtig** sind nur eine **aktiv ausgenutzte Schwachstelle** im Produkt und ein **schwerwiegender Sicherheitsvorfall**, der die Produktsicherheit berührt (Stützangabe Art. 14 Abs. 1, 3). Aktiv ausgenutzt ist eine Schwachstelle erst, wenn verlässliche Nachweise belegen, dass Angreifer:innen sie in einem System ohne Einverständnis des Systemeigners genutzt haben (Stützangabe Art. 3 Nr. 42). Schwerwiegend ist ein Vorfall unter anderem, wenn er die Fähigkeit des Produkts beeinträchtigen kann, sensible oder wichtige Daten oder Funktionen zu schützen, oder wenn er böswilligen Code im Produkt oder im Netz der Nutzer:innen eingeführt hat oder einführen kann (Stützangabe Art. 14 Abs. 5). Die Erwägungsgründe nennen als Beispiel Schadcode im Freigabekanal für Sicherheitsaktualisierungen (Stützangabe Erwägungsgrund 68); die Build- und Release-Umgebung ist damit selbst schutzbedürftig (Folgerung). Ein Scanbefund, ein nur theoretisch nutzbarer Fehler oder ein in gutem Glauben durchgeführter Test sind nicht meldepflichtig; sie werden behandelt und können freiwillig gemeldet werden (Stützangabe Art. 15, Erwägungsgrund 68).

**Fristen und Meldeprozess.** Frühwarnung (24 Stunden) und Meldung (72 Stunden) laufen ab der Kenntnis des Herstellers. Der Abschlussbericht ist bei einer aktiv ausgenutzten Schwachstelle spätestens 14 Tage nach Verfügbarkeit einer Korrektur- oder Risikominderungsmaßnahme fällig, bei einem schwerwiegenden Vorfall einen Monat nach der 72-Stunden-Meldung (Stützangabe Art. 14 Abs. 2, 4; Tabelle in Thema 6.7). Weil eine aktiv ausgenutzte Schwachstelle „verlässliche Nachweise“ voraussetzt, beginnt die Pflicht nicht schon bei einem bloßen Verdacht; Einzelheiten ergeben sich aus den unverbindlichen Leitlinien der Kommission. Der Zeitpunkt der Kenntnis ist daher festzuhalten. Ein Meldeprozess regelt (Praxis): wer Hinweise nach welchen Kriterien bewertet; wer meldet und vertritt, auch am Wochenende, weil Stunden durchlaufen; wo Zeitpunkt und Entscheidung dokumentiert werden; wie die betroffenen Nutzer:innen informiert werden, was nach der Kenntnis ebenfalls vorgeschrieben ist (Stützangabe Art. 14 Abs. 8). Meldeweg und Empfänger erklärt Thema 6.7. Die Meldung einer Datenpanne (Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im selben Fachgebiet) und die Pflichten als Einrichtung (Thema 6.6) sind getrennt zu prüfen; sie haben eigene Auslöser, Fristen und Empfänger. Stand Oktober 2026, vor Verwendung prüfen.

### Releases, Versionen und technische Dokumentation

Eine **wesentliche Änderung** liegt vor, wenn eine Änderung nach der Auslieferung die Konformität berührt oder den geprüften Zweck verschiebt (Stützangabe Art. 3 Nr. 30). Die Erwägungsgründe geben Auslegungshilfen: Eine Funktionsaktualisierung kann wesentlich sein, wenn sie die Zweckbestimmung ändert, ohne dass die ursprüngliche Risikobewertung das vorsah, oder wenn sich die Art der Gefahr ändert oder das Risiko steigt; Beispiel ist ein neues Eingabeelement, das eine Eingabevalidierung erfordert. Eine Sicherheitsaktualisierung, die nur das Risiko senkt, gilt nicht als wesentlich, eine geringfügige Anpassung wie eine neue Sprache im Allgemeinen ebenfalls nicht (Stützangabe Erwägungsgrund 39). Daraus folgt für Teams (Praxis): Geplante Funktionen gehören in die Risikobewertung, und jeder Release bekommt die Prüffrage, ob er Zweck oder Angriffsfläche ändert. Bei einer wesentlichen Änderung ist die Konformität neu zu prüfen (Stützangabe Erwägungsgrund 41). Art. 13 Abs. 14 verlangt Verfahren, die die Konformität bei einer Serienherstellung sichern und Änderungen am Entwicklungsverfahren berücksichtigen; auf Software übertragen sind Pipeline-Gates und eine Release-Checkliste ein Weg (Folgerung).

Jede bereitgestellte Sicherheitsaktualisierung bleibt mindestens zehn Jahre oder für die verbleibende Dauer des Unterstützungszeitraums verfügbar, je nachdem, was länger ist (Stützangabe Art. 13 Abs. 9). Bei nacheinander wesentlich geänderten Versionen darf der Hersteller Sicherheitsupdates auf die zuletzt in Verkehr gebrachte Version beschränken, wenn deren Nutzer:innen kostenlos umsteigen können und keine zusätzlichen Anpassungskosten haben (Stützangabe Art. 13 Abs. 10).

Die **technische Dokumentation** entsteht überwiegend im Entwicklungsprozess: Architektur und Entwicklungsbeschreibung, Schwachstellenverfahren samt Stückliste, Risikobewertung, Überlegungen zum Unterstützungszeitraum, Testberichte, Konformitätserklärung (Stützangabe Anhang VII). Sie wird ab dem Inverkehrbringen mindestens zehn Jahre aufbewahrt; dauert der Unterstützungszeitraum länger, bestimmt dieser die Dauer; die Behörde kann sie begründet anfordern (Stützangabe Art. 13 Abs. 13, 22). Praxis: Dokumente mit dem Quellcode versionieren, je Release Stückliste und Testberichte archivieren. Stand Oktober 2026, vor Verwendung prüfen.

### Rechenbeispiele

Alle Werte sind frei gewählte Beispielwerte; die rechtlichen Annahmen entsprechen dem Stand Oktober 2026, vor Verwendung prüfen. Zählweise (Festlegung dieser Beispiele; die Verordnung regelt die Zählung nicht ausdrücklich): Stundenfristen laufen lückenlos weiter, Wochenenden eingeschlossen; bei Tagesfristen bleibt der Tag des Ereignisses unberücksichtigt; ein Monat endet am gleichen Kalendertag des Folgemonats; Verschiebungen des Fristendes wegen Wochenenden oder Feiertagen bleiben außer Betracht.

**Interne Frist und Abschlussbericht.** Der Scanner stellt am Mittwoch, 09.02.2028, eine kritische Schwachstelle fest; die interne Richtlinie (Praxis) verlangt die Behebung binnen sieben Tagen, die Frist endet am Mittwoch, 16.02.2028. Steht für eine aktiv ausgenutzte Schwachstelle am Dienstag, 15.02.2028, eine Korrektur bereit, ist der Abschlussbericht spätestens am Dienstag, 29.02.2028, fällig (Schalttag, Februar 2028 hat 29 Tage). Bei einem schwerwiegenden Vorfall, dessen 72-Stunden-Meldung am Donnerstag, 03.02.2028, übermittelt wurde, endet die Monatsfrist am Freitag, 03.03.2028.

## B. Karteikarten 9.1 (anhängen)

#### K-9.1-20
**Frage:** Womit sollte ein Team nach dem CRA beginnen, bevor es Sicherheitsanforderungen für ein neues Produkt festlegt?
**Antwort:** Mit einer dokumentierten Bewertung der Cybersicherheitsrisiken (Zweck, Umgebung, Nutzungsdauer). Daraus folgt, welche Anforderungen das Produkt erfüllen muss; Abweichungen werden begründet und abgelegt.
`tags: cra, risikobewertung, entwicklungsprozess` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-9.1-21
**Frage:** Was muss die Software-Stückliste (SBOM) nach dem CRA mindestens leisten, und was ist in der Praxis ratsam?
**Antwort:** Mindestens ein gängiges maschinenlesbares Format mit den obersten Abhängigkeiten; veröffentlicht werden muss sie nicht. Ratsam: bei jedem Build aus der Lock-Datei erzeugen, auch transitive Abhängigkeiten erfassen und je Release archivieren.
`tags: cra, sbom, abhaengigkeiten` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-9.1-22
**Frage:** Welche Unterlagen aus dem Entwicklungsprozess gehören zur technischen Dokumentation, und wie lange werden sie aufbewahrt?
**Antwort:** Z. B. Risikobewertung, Architektur, Schwachstellenverfahren samt Stückliste, Testberichte und Konformitätserklärung. Aufbewahrt wird mindestens zehn Jahre; ist der Unterstützungszeitraum länger, gilt er als Maßstab.
`tags: cra, dokumentation, aufbewahrung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-9.1-23
**Frage:** Ein Produkt kommt nach dem 11.12.2027 auf den Markt und enthält eine quelloffene Bibliothek. Wer verantwortet sie, und woran prüfst du sie?
**Antwort:** Der Hersteller des Gesamtprodukts, mit gebotener Sorgfalt. Möglich sind z. B. Konformitätsnachweis der Komponente, regelmäßige Updates, Abgleich mit Schwachstellendatenbanken, zusätzliche Sicherheitsprüfungen; der Umfang folgt dem Risiko.
`tags: cra, drittkomponenten, open-source` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-9.1-24
**Frage:** Dein Team findet in einem Produkt, für das die Herstellerpflichten gelten (ab 11.12.2027), eine unbekannte Schwachstelle in einer Bibliothek. Was verlangt der CRA?
**Antwort:** Meldung an die Betreuenden der Bibliothek, Behebung im eigenen Produkt und Weitergabe einer selbst geschriebenen Korrektur an die Betreuenden. Eine Behördenmeldung ist damit nicht gemeint.
`tags: cra, drittkomponenten, schwachstellen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-9.1-25
**Frage:** Welche zwei Ereignisse muss ein Hersteller melden, und was gilt für einen bloßen Scanbefund?
**Antwort:** Aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfälle, die die Produktsicherheit betreffen. Ein Scanbefund ohne verlässliche Nachweise einer Ausnutzung wird bewertet und behoben, ist aber nicht meldepflichtig.
`tags: cra, meldepflicht, schwachstellen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-9.1-26
**Frage:** Was empfiehlt sich in einem Meldeprozess des Entwicklungsteams, damit Fristen von 24 und 72 Stunden einzuhalten sind?
**Antwort:** Zuständigkeit und Vertretung auch am Wochenende, Kriterien für die Bewertung, Dokumentation des Zeitpunkts der Kenntnis, vorbereiteter Zugang zur Meldeplattform und ein Weg, die betroffenen Nutzer:innen zu informieren.
`tags: cra, meldeprozess, fristen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-9.1-27
**Frage:** Woran erkennst du bei einem Produkt, das schon vor dem 11.12.2027 ausgeliefert wurde, eine eher wesentliche Änderung?
**Antwort:** Eine Funktion ändert den Zweck oder die Art der Gefahr bzw. erhöht das Risiko, ohne dass die Risikobewertung sie vorsah (z. B. neues Eingabeelement). Reine Sicherheitsupdates gelten meist nicht als wesentlich.
`tags: cra, release, wesentliche-aenderung` · `schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 9.1 (anhängen)

#### Q-9.1-13 · Multiple Choice
**Frage:** Eine neue Software soll im Februar 2028 erstmals ausgeliefert werden. Die Prüfung zeigt, dass sich eine Schwachstelle in einer Bibliothek über die Anwendung ausnutzen lässt; Hinweise auf Angriffe gibt es nicht. Was verlangt der CRA?
- [ ] Sofortige Meldung der Schwachstelle über die EU-Meldeplattform an die Behörden
- [ ] Auslieferung ist erlaubt, wenn die Schwachstelle in der Dokumentation vermerkt ist
- [x] Sie wird nicht mitgeliefert; eine Pflichtmeldung entsteht nicht
- [ ] Eine Meldung, sobald ein Update der betroffenen Bibliothek existiert
**Erklärung:** Produkte sollen ohne bekannte ausnutzbare Schwachstellen bereitgestellt werden. Meldepflichtig ist nur eine aktiv ausgenutzte Schwachstelle; dafür gibt es hier keine Nachweise.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.1-14 · Zuordnung
**Anweisung:** Ordne jedes Artefakt des Entwicklungsprozesses seiner Aufgabe zu.
- Risikobewertung ↔ Bestimmt, welche Sicherheitsanforderungen gelten und wie das Team sie umsetzt
- Software-Stückliste ↔ Verzeichnet die Komponenten eines Produkts und ihre Lieferkettenbeziehungen
- Kontaktadresse für Schwachstellenmeldungen ↔ Ermöglicht Hinweise von außen im Verfahren der koordinierten Offenlegung
- Veröffentlichte Information nach einem Update ↔ Erlaubt den Nutzer:innen, die behobene Schwachstelle und ihre Schwere einzuordnen
**Erklärung:** Jedes Artefakt erfüllt eine eigene Funktion in den Herstellerpflichten; zusammen bilden sie große Teile der technischen Dokumentation und des Schwachstellenverfahrens.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-9.1-15 · Wahr/Falsch
**Aussage:** Ein Hersteller muss seine Software-Stückliste öffentlich ins Internet stellen, damit Kundschaft sie einsehen kann.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Die Stückliste gehört zur technischen Dokumentation und wird der Behörde auf begründetes Verlangen vorgelegt. Eine Veröffentlichungspflicht besteht nicht; gibt der Hersteller sie weiter, nennt er den Abrufort.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-9.1-16 · Sortieren
**Anweisung:** Bringe die Schritte bei einer von außen gemeldeten Schwachstelle, für die keine Ausnutzung bekannt ist, in die richtige Reihenfolge.
1. Der Hinweis geht über die angegebene Kontaktadresse beim Team ein
2. Das Team bewertet, ob die Schwachstelle ausnutzbar ist
3. Das Team entwickelt, testet und verteilt ein Sicherheitsupdate
4. Das Team veröffentlicht Informationen über die behobene Schwachstelle
**Erklärung:** Erst nach Eingang und Bewertung wird behoben; die Information zu Schwachstelle und Schwere folgt, sobald das Update bereitgestellt ist, in begründeten Fällen mit Aufschub bis zur Anwendung des Updates.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.1-17 · Mehrfachauswahl
**Frage:** Welche Aussagen zu Drittkomponenten in einem Produkt, für das die Herstellerpflichten ab dem 11.12.2027 gelten, treffen zu?
- [x] Der Hersteller des Gesamtprodukts bleibt auch für quelloffene Bibliotheken verantwortlich.
- [x] Der Hersteller dokumentiert Cybersicherheitsaspekte und Schwachstellen systematisch.
- [ ] Bei einer quelloffenen Bibliothek liegt die Verantwortung für Fehler allein bei den Betreuenden.
- [x] Eine selbst geschriebene Korrektur für eine Bibliothek wird deren Betreuenden mitgeteilt.
- [ ] Eine Schwachstelle in einer Bibliothek muss immer sofort der Behörde gemeldet werden.
**Erklärung:** Quelloffenheit verschiebt die Verantwortung nicht. Gemeldet wird an die Betreuenden der Komponente; eine Behördenmeldung gilt nur für aktiv ausgenutzte Schwachstellen und schwerwiegende Vorfälle.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-9.1-18 · Kurzantwort
**Frage:** Ein Hersteller übermittelt die 72-Stunden-Meldung zu einem schwerwiegenden Sicherheitsvorfall am Freitag, 28.01.2028. Der Abschlussbericht ist einen Monat nach Übermittlung dieser Meldung fällig; ein Monat endet am gleichen Kalendertag des Folgemonats. Bis zu welchem Datum (Format TT.MM.JJJJ) muss er vorliegen?
**Akzeptierte Antworten:** 28.02.2028; 28.02.2028.; 28.2.2028; 28.2.2028.; 28.02.28; 28.02.28.; 28. 02. 2028; 28. 2. 2028; 28. Februar 2028; 28 Februar 2028; Montag, 28.02.2028; Montag 28.02.2028; Mo, 28.02.2028; Mo 28.02.2028
**Erklärung:** Der Abschlussbericht knüpft beim schwerwiegenden Vorfall an die Übermittlung der Meldung an, nicht an die Kenntnis: Freitag, 28.01.2028, plus ein Monat ergibt Montag, 28.02.2028.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.1-19 · Wahr/Falsch
**Aussage:** Ein Hersteller darf die Veröffentlichung von Informationen über eine behobene Schwachstelle in hinreichend begründeten Fällen aufschieben, bis die Nutzer:innen das Update einspielen konnten.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Nach Bereitstellung des Updates werden Informationen über die beseitigte Schwachstelle veröffentlicht; ein Aufschub ist möglich, wenn das Risiko der Veröffentlichung ihren Sicherheitsnutzen überwiegt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-9.1-20 · Was passt nicht dazu
**Frage:** Welches Ereignis löst keine Pflichtmeldung eines Herstellers an die Meldeplattform aus?
- [ ] Eine Schwachstelle im Produkt wird nachweislich von Angreifenden ausgenutzt.
- [ ] Unbekannte schleusen Schadcode in den Kanal ein, über den das Team Sicherheitsupdates freigibt.
- [x] Der Scanner findet in einer Bibliothek eine Lücke ohne bekannte Ausnutzung.
- [ ] Ein Angriff auf das Produkt führt dazu, dass Schadcode im Netz einer Kundin oder eines Kunden läuft.
**Erklärung:** Meldepflichtig sind aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfälle, etwa wenn böswilliger Code im Produkt oder im Netz der Nutzer:innen ausgeführt wird. Ein Scanbefund ohne Nachweis der Ausnutzung wird behandelt und kann freiwillig gemeldet werden.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-9.1-21 · Multiple Choice
**Frage:** Eine Software wurde vor dem 11.12.2027 ausgeliefert und erhält 2028 eine neue Version. Welche Änderung ist am ehesten eine wesentliche Änderung, nach der Risikobewertung und Konformität neu zu prüfen sind?
- [ ] Eine Sicherheitsaktualisierung, die nur eine bekannte Schwachstelle behebt
- [ ] Die Ergänzung einer weiteren Sprache in der Oberfläche
- [x] Ein neues Eingabefeld für Daten von außen, das nicht eingeplant war
- [ ] Ein Austausch der Icons in der Bedienoberfläche
**Erklärung:** Funktionsänderungen, die Art oder Angriffsfläche des Produkts verändern und nicht vorgesehen waren, können wesentlich sein; reine Sicherheitsupdates und geringfügige Anpassungen gelten in der Regel nicht so. Die Abgrenzung im Einzelfall bleibt den Leitlinien überlassen.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-9.1-22 · Kurzantwort
**Frage:** Ein Hersteller legt für sein Produkt einen Unterstützungszeitraum von sieben Jahren fest. Wie viele Jahre muss er die technische Dokumentation nach dem Inverkehrbringen mindestens aufbewahren? Gib die Zahl an.
**Akzeptierte Antworten:** 10; zehn; 10 Jahre; zehn Jahre; 10 J; mindestens 10; mindestens zehn; mindestens 10 Jahre; mindestens zehn Jahre; 10 Jahre lang; zehn Jahre lang; 10 Jahren; zehn Jahren
**Erklärung:** Aufzubewahren sind mindestens zehn Jahre, bei längerem Unterstützungszeitraum entsprechend länger; da sieben Jahre kürzer sind als zehn, bleibt es bei zehn.
`schwierigkeit: mittel` · `bloom: anwenden`
