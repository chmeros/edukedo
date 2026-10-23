---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: FU6
fachgebiet_title: "IT-Sicherheit, Datenschutz und Qualitätssicherung"
thema_code: "FU6-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen zur Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 5 und 6 (§ 4 Abs. 2 Nr. 5 und 6), orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "23.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Im Anschluss an die Präsentation der betrieblichen Projektarbeit wird ein Fachgespräch geführt, in dem die Vorgehensweise begründet werden soll (vgl. Regelungen zur betrieblichen Projektarbeit in den §§ 12, 20, 28 und 36 FIAusbV, je nach Fachrichtung). Die Fragen sind nach Thema gruppiert, beziehen sich auf das eigene Projekt und simulieren typische Rückfragen des Prüfungsausschusses zu Qualitätssicherung, IT-Sicherheit und Datenschutz. Sie erfordern freies Formulieren und eine Begründung der eigenen Entscheidungen statt auswendig gelernter Antworten.

### 6.1 IT-Sicherheit: Schutzziele, Bedrohungen und Maßnahmen

- Welche Schutzziele waren in Ihrem Projekt am wichtigsten, und woran haben Sie das festgemacht?
  - Erwartung: Die drei klassischen Schutzziele sind Vertraulichkeit (nur Berechtigte dürfen Informationen einsehen), Integrität (Daten und Systeme bleiben korrekt und unverändert, soweit keine berechtigte Änderung erfolgt) und Verfügbarkeit (Systeme und Daten stehen bei Bedarf zur Verfügung).
  - Erwartung: Ergänzend werden häufig Authentizität (die Echtheit ist nachprüfbar) und Verbindlichkeit bzw. Nichtabstreitbarkeit (eine Handlung lässt sich nachweislich einem Urheber zuordnen) genannt.
  - Erwartung: Die Gewichtung der Schutzziele richtet sich immer nach dem konkreten System und dem Schutzbedarf der Daten und wird daran im Projekt begründet.
  - Erwartung: Schutzziele können in Konflikt geraten: Eine sehr restriktive Zugriffskontrolle stärkt die Vertraulichkeit, kann aber die Verfügbarkeit im Störungsfall einschränken.
  - Rückfrage: Welches Schutzziel trifft Ransomware vor allem?
- Welche drei Bedrohungen haben Sie für Ihr Projekt oder Ihr System als besonders relevant eingeschätzt, und wie haben Sie deren Schadenspotenzial bewertet?
  - Erwartung: Eine Bedrohung ist ein mögliches Ereignis, das ein Schutzziel verletzen kann; eine Schwachstelle lässt sie wirksam werden, und aus beiden zusammen entsteht das Risiko.
  - Erwartung: Bedrohungen sind nicht nur Angriffe von außen, sondern auch menschliche Fehler, technisches Versagen und höhere Gewalt.
  - Erwartung: Jede Bedrohung wird als konkretes Szenario formuliert (wer greift was wie an bzw. welcher Fehler passiert, mit welchen Folgen) und den betroffenen Schutzzielen zugeordnet.
  - Erwartung: Das Schadenspotenzial wird unter wirtschaftlichen und technischen Kriterien eingeschätzt, z. B. Produktionsstillstand, Vertragsstrafen, Reputation und Wiederherstellungsaufwand.
  - Rückfrage: Welche Schutzziele sind bei einem Man-in-the-Middle-Angriff betroffen?
- Wie sind Sie vorgegangen, um Risiken zu priorisieren — und warum haben Sie sich für genau diese Maßnahmen entschieden und gegen andere?
  - Erwartung: Zuerst werden die zu schützenden Werte (Assets) mit ihrem Schutzbedarf erfasst und Bedrohungen und Schwachstellen ermittelt.
  - Erwartung: Das Risiko wird als Eintrittswahrscheinlichkeit mal Schadenshöhe bewertet und z. B. in einer Risikomatrix priorisiert.
  - Erwartung: Für den Umgang mit einem Risiko gibt es vier Strategien: vermeiden, vermindern, übertragen und akzeptieren; die Wahl wird begründet.
  - Erwartung: Gute Konzepte kombinieren technische und organisatorische Maßnahmen und folgen Defense in Depth (mehrere Schutzschichten hintereinander) sowie dem Prinzip der minimalen Rechte.
  - Erwartung: Das verbleibende Restrisiko wird dokumentiert.
  - Rückfrage: Warum kann ein kleiner, aber sehr häufiger Schaden ebenso bedeutsam sein wie ein seltenes Großereignis?
  - Rückfrage: Was bedeutet Defense in Depth?
- Welche betrieblichen Vorgaben zur IT-Sicherheit (z. B. Passwortrichtlinie, Berechtigungskonzept) haben Sie in Ihrem Projekt berücksichtigt, und wie haben Sie deren Einhaltung sichergestellt?
  - Erwartung: Betriebliche Vorgaben wie die Passwortrichtlinie oder die Regeln für mobile Geräte ergeben sich meist aus dem Informationssicherheits-Managementsystem des Unternehmens, das sich häufig an Rahmenwerken wie ISO/IEC 27001 oder dem IT-Grundschutz des BSI orientiert.
  - Erwartung: Diese Vorgaben müssen bekannt sein, eingehalten und im Projekt erkennbar berücksichtigt werden.
  - Erwartung: Ein Berechtigungskonzept folgt dem Prinzip der minimalen Rechte: Jede Person und jedes System erhält nur die Rechte, die für die Aufgabe nötig sind.
  - Erwartung: Die Einhaltung lässt sich prüfen, z. B. durch Konfigurations-Reviews (unnötige Dienste deaktiviert, Standardpasswörter geändert) oder ein Audit anhand von Kriterien und Checklisten.
  - Rückfrage: Wie unterscheiden sich technische und organisatorische Schutzmaßnahmen?
- Wie haben Sie Authentifizierung und Verschlüsselung in Ihrem Projekt umgesetzt oder bewusst nicht umgesetzt, und welches Restrisiko bleibt?
  - Erwartung: Bei der Authentifizierung weist eine Person ihre Identität nach, bei der Autorisierung wird anschließend geprüft, was sie darf; Faktoren sind Wissen, Besitz und Eigenschaft.
  - Erwartung: Mehrfaktor-Authentifizierung kombiniert mindestens zwei unterschiedliche Faktoren und schützt auch dann, wenn ein Passwort abgegriffen wurde; zwei Passwörter sind kein zweiter Faktor.
  - Erwartung: Passwörter werden weder im Klartext noch reversibel verschlüsselt abgelegt, sondern als Hash mit Salt in einem dafür geeigneten, bewusst langsamen Verfahren.
  - Erwartung: Bei der Verschlüsselung wird zwischen symmetrischen Verfahren (derselbe geheime Schlüssel, schnell, aber sicherer Schlüsselaustausch nötig) und asymmetrischen Verfahren (Schlüsselpaar aus öffentlichem und privatem Schlüssel) unterschieden.
  - Erwartung: Wurde eine Maßnahme bewusst nicht umgesetzt, wird das begründet, und das verbleibende Restrisiko wird dokumentiert.
  - Rückfrage: Wie arbeiten symmetrische und asymmetrische Verschlüsselung bei TLS zusammen?

### 6.2 Datenschutz

- Werden in Ihrem Projekt personenbezogene Daten verarbeitet? Wenn ja, welche, und wie haben Sie das für sich geklärt?
  - Erwartung: Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen (Art. 4 Nr. 1 DSGVO).
  - Erwartung: Dazu zählen nicht nur der Name, sondern auch Kundennummer, E-Mail-Adresse, IP-Adresse, Standortdaten und Beschäftigtendaten.
  - Erwartung: Auch Maschinendaten können personenbezogen sein, wenn sie sich einer Person zuordnen lassen, z. B. eine Schicht-ID oder eine Bedienerkennung in den Protokollen einer vernetzten Anlage.
  - Erwartung: Für einige Datenarten, z. B. Gesundheitsdaten oder biometrische Daten zur eindeutigen Identifizierung einer Person, gelten verschärfte Anforderungen (besondere Kategorien, Art. 9 DSGVO).
  - Erwartung: Bleibt unklar, ob Daten personenbezogen sind, wird die oder der Datenschutzbeauftragte einbezogen; eine grundlagenorientierte Einordnung ersetzt keine Rechtsberatung.
  - Rückfrage: Worin unterscheiden sich Pseudonymisierung und Anonymisierung?
  - Rückfrage: Was versteht man im Datenschutz unter Verarbeitung?
- Wie haben Sie die Grundsätze der Datenminimierung und der Zweckbindung in Ihrer Lösung berücksichtigt?
  - Erwartung: Zweckbindung bedeutet, dass Daten für festgelegte, eindeutige Zwecke erhoben und nicht beliebig weiterverwendet werden.
  - Erwartung: Datenminimierung bedeutet, dass nur die Daten verarbeitet werden, die für den Zweck erforderlich sind; nicht jedes Feld in einem Formular ist nötig.
  - Erwartung: Zur Umsetzung gehört, dass Löschfristen technisch umsetzbar sind und Logdateien nicht unnötig personenbezogene Daten enthalten.
  - Erwartung: Beide Grundsätze gehören zu den Grundsätzen nach Art. 5 DSGVO, an denen jede Verarbeitung gemessen wird, neben u. a. Rechtmäßigkeit und Transparenz, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit sowie Rechenschaftspflicht.
  - Erwartung: Datenschutz wird von Beginn an in Anforderungen, Architektur und Standardeinstellungen eingeplant (Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen), nicht erst kurz vor dem Go-live.
  - Rückfrage: Was bedeutet Datenminimierung für ein Anmeldeformular?
  - Rückfrage: Welcher Grundsatz ist betroffen, wenn für die Vertragsabwicklung erhobene Kundendaten für ein nicht vereinbartes Marketing-Profiling genutzt werden sollen?
- Mit welchen Daten haben Sie getestet, und wie haben Sie sichergestellt, dass dabei keine echten personenbezogenen Daten ungeschützt verwendet wurden?
  - Erwartung: Für Test- und Entwicklungssysteme werden statt Echtdaten synthetische oder wirksam anonymisierte Daten verwendet.
  - Erwartung: In Testumgebungen herrschen meist geringere Schutzmaßnahmen, und Echtdaten erhöhen dort das Risiko für Datenpannen.
  - Erwartung: Die Verarbeitung zu Testzwecken kann von der ursprünglichen Zweckbindung abweichen, und Echtdaten in Testumgebungen können gegen Zweckbindung und Datenminimierung verstoßen.
  - Erwartung: Pseudonymisierte Daten bleiben personenbezogen und unterliegen der DSGVO; nur wirksam anonymisierte Daten fallen nicht mehr darunter.
  - Erwartung: Die Wahl der Testdaten und die Schutzmaßnahmen werden dokumentiert, weil der Verantwortliche die Einhaltung nachweisen können muss (Rechenschaftspflicht).
  - Rückfrage: Worin unterscheiden sich Pseudonymisierung und Anonymisierung?
  - Rückfrage: Welche Meldepflicht besteht gegenüber der Aufsichtsbehörde, wenn doch personenbezogene Daten aus einer Testumgebung abhandenkommen?
- Wie ist die Rollenverteilung zwischen Ihrem Ausbildungsbetrieb und dem Kunden, und welche Vereinbarungen sind dafür nötig?
  - Erwartung: Der Verantwortliche entscheidet über Zwecke und Mittel der Verarbeitung; der Auftragsverarbeiter verarbeitet im Auftrag und nach Weisung des Verantwortlichen.
  - Erwartung: Verarbeitet der Ausbildungsbetrieb personenbezogene Daten im Auftrag der Kundschaft, z. B. beim Hosting, bei der Fernwartung oder bei der Auswertung von Kundendaten, handelt er als Auftragsverarbeiter.
  - Erwartung: Dann ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO nötig, der u. a. Gegenstand und Dauer, Art der Daten, Weisungsbindung, Vertraulichkeitsverpflichtungen, Sicherheitsmaßnahmen und den Umgang mit Unterauftragnehmern regelt.
  - Erwartung: Setzt der Ausbildungsbetrieb weitere Dienstleister ein, z. B. einen Cloud-Anbieter, sind diese entsprechend einzubinden; das gilt auch umgekehrt, wenn der Betrieb als Verantwortlicher Dienstleister beauftragt.
  - Erwartung: Die Rechtsgrundlage der Verarbeitung klärt die Kundschaft, gegebenenfalls mit ihrer oder ihrem Datenschutzbeauftragten; der Ausbildungsbetrieb erkennt die Anforderungen und zeigt Gestaltungsoptionen auf.
  - Rückfrage: Wie verfahren Sie, wenn der Ausbildungsbetrieb als Auftragsverarbeiter von einer Datenpanne betroffen ist?
  - Rückfrage: Was ist bei der Übermittlung personenbezogener Daten in Länder außerhalb der EU bzw. des EWR zu beachten?
- Wie haben Sie Ihre Kundschaft oder Ihre Kolleg:innen zu Datenschutz-Anforderungen beraten, und wann haben Sie bewusst die Datenschutzbeauftragte oder den Datenschutzbeauftragten einbezogen?
  - Erwartung: Beratung bedeutet nicht, Rechtsauskünfte zu erteilen, sondern Anforderungen zu erkennen und Gestaltungsoptionen aufzuzeigen.
  - Erwartung: Gute Beratung fragt zunächst nach Zweck und Branche der Kundschaft, macht Datenschutzaspekte früh in Anforderungsgesprächen sichtbar und dokumentiert Absprachen.
  - Erwartung: Typische Beratungsfragen sind: Welche personenbezogenen Daten fallen an, welche Rechtsgrundlage kommt in Frage, welche technischen und organisatorischen Maßnahmen lassen sich umsetzen, welche Löschfristen sind sinnvoll und sind Auftragsverarbeitungsverträge erforderlich?
  - Erwartung: Wo Rechtsfragen über das Fachwissen hinausgehen, wird an die zuständige Fachstelle verwiesen; im Zweifel wird die oder der Datenschutzbeauftragte einbezogen.
  - Erwartung: Die oder der Datenschutzbeauftragte unterrichtet und berät, überwacht die Einhaltung der Vorschriften und arbeitet mit der Aufsichtsbehörde zusammen; sie oder er vollzieht die Verarbeitung nicht selbst und berät unabhängig.
  - Rückfrage: Wie reagieren Sie, wenn Kundschaft von Ihnen die verbindliche Zusage verlangt, dass für ihr Vorhaben keine rechtlichen Risiken bestehen?
  - Rückfrage: Was ist bei einem Vorhaben mit Gesundheitsdaten, etwa einer Plattform für Arztpraxen, besonders zu beachten?
- Wie haben Sie in Ihrem Projekt geklärt, ob Endgeräte der Nutzer:innen angesprochen werden oder Daten in ein Drittland gelangen, und was haben Sie daraufhin technisch umgesetzt?
  - Erwartung: Zugriffe auf das Endgerät sind technikneutral zu betrachten, nicht nur Cookies, sondern auch lokaler Speicher, Gerätekennungen oder auslesende Skripte; außer bei Vorgängen, die für einen ausdrücklich gewünschten Dienst unbedingt erforderlich sind, braucht es eine Einwilligung.
  - Erwartung: Technisch umgesetzt wird sie, indem nicht erforderliche Skripte erst nach der Einwilligung laden, Ablehnen so leicht ist wie Zustimmen, die Entscheidung nachweisbar protokolliert und der Widerruf einfach möglich ist.
  - Erwartung: Bei Cloud- und SaaS-Diensten werden Speicherort, Zugriffe anderer Stellen (Support, Fernwartung), Unterauftragnehmer und Verschlüsselung geklärt; für Drittländer gilt die Rangfolge Angemessenheitsbeschluss, geeignete Garantien wie Standardvertragsklauseln mit Bewertung der Rechtslage im Zielland, nur im Ausnahmefall eine enge Ausnahme.
  - Erwartung: Über Zwecke und Mittel entscheidet die Verantwortliche; als Dienstleister schlägt man Lösungen vor, setzt sie auf Weisung um und weist auf Risiken hin; bei Rechtsfragen wird die Datenschutzbeauftragte einbezogen.
  - Rückfrage: Warum genügt ein Serverstandort in der EU nicht in jedem Fall?
- Wie gehen Sie in Ihrem Projekt oder Betrieb mit Protokollen und Auswertungen von Beschäftigtendaten um, und wer ist dabei zu beteiligen?
  - Erwartung: Protokolle und Auswertungen mit Personenbezug brauchen einen festgelegten Zweck und eine Rechtsgrundlage; Protokolle für Sicherheit und Fehleranalyse werden nicht ohne Weiteres zur Leistungsbewertung genutzt, Zugriff und Speicherdauer sind begrenzt, Beschäftigte werden informiert.
  - Erwartung: Besteht ein Betriebsrat, bestimmt er bei technischen Einrichtungen mit, die Verhalten oder Leistung der Beschäftigten überwachen können; ohne Einigung entscheidet die Einigungsstelle; eine Betriebsvereinbarung darf das Datenschutzrecht nicht aushebeln.
  - Erwartung: Bei voraussichtlich hohem Risiko für die Betroffenen wird vorab eine Datenschutz-Folgenabschätzung durchgeführt, mit Beschreibung, Bewertung von Notwendigkeit und Risiken sowie Abhilfemaßnahmen und mit Rat der Datenschutzbeauftragten; die Entscheidung trifft die Verantwortliche.
  - Rückfrage: Wie gehen Sie vor, wenn eine betroffene Person Auskunft über ihre Daten verlangt, die Anfrage aber nicht bei der Verantwortlichen, sondern bei Ihrem Betrieb als Auftragsverarbeiter eingeht?

### 6.3 Qualitätssicherung und Verbesserungsprozesse

- Welche Qualitätsmerkmale waren Ihrem Kunden wichtig, und wie haben Sie diese messbar gemacht?
  - Erwartung: Qualität bedeutet, dass ein Produkt oder eine Leistung die vereinbarten und die berechtigterweise erwarteten Anforderungen erfüllt; sie hängt von Produkt- und Prozessqualität ab.
  - Erwartung: Qualität wird in Qualitätsmerkmale zerlegt, z. B. funktionale Eignung, Zuverlässigkeit, Leistungseffizienz, Gebrauchstauglichkeit, Sicherheit, Wartbarkeit, Kompatibilität und Übertragbarkeit.
  - Erwartung: Mit den Kund:innen wird vorab vereinbart, welche Merkmale wie gemessen werden.
  - Erwartung: Eine messbare Anforderung ist z. B. eine Antwortzeit unter zwei Sekunden bei 100 gleichzeitigen Nutzer:innen, im Gegensatz zur nicht prüfbaren Aussage „schnell“.
  - Rückfrage: Warum ist „schnell“ keine prüfbare Anforderung?
- Welche Qualitätssicherungsmaßnahmen haben Sie projektbegleitend durchgeführt, und welche davon haben Fehler tatsächlich aufgedeckt?
  - Erwartung: Konstruktive Maßnahmen beugen Fehlern vor (z. B. Coding-Guidelines, Vorlagen, Schulungen, klare Anforderungen, Definition of Done), analytische Maßnahmen prüfen vorhandene Ergebnisse (z. B. Tests, Code-Reviews, Inspektionen, statische Codeanalyse, Abnahmeprüfungen).
  - Erwartung: Tests laufen auf mehreren Ebenen (Unit-, Integrations-, System- und Abnahmetests), ergänzt durch automatisierte Prüfungen in der Build-Pipeline (Continuous Integration, Quality Gates) und Code-Reviews nach dem Vier-Augen-Prinzip.
  - Erwartung: Tests können das Vorhandensein von Fehlern zeigen, aber nicht deren Abwesenheit beweisen; Testfälle werden deshalb sinnvoll gewählt, z. B. mit Grenzwerten und Fehlerfällen.
  - Erwartung: Alle Maßnahmen werden dokumentiert (Testpläne, Testprotokolle, Review-Ergebnisse, Abnahmeprotokolle, Änderungs- und Fehlerhistorie), das macht die Ergebnisse nachvollziehbar und dient als Nachweis gegenüber den Kund:innen.
  - Rückfrage: Worin unterscheiden sich Verifikation und Validierung?
- Wie sind Sie vorgegangen, als ein Fehler oder Mangel auftrat — haben Sie nur das Symptom beseitigt oder auch die Ursache analysiert? Beschreiben Sie das an einem konkreten Beispiel.
  - Erwartung: Es genügt nicht, das Symptom zu beseitigen; eine systematische Ursachenanalyse verhindert, dass derselbe Fehler wiederkehrt.
  - Erwartung: Der Fehler wird erfasst und reproduziert (Ticket mit Schweregrad, Umgebung und Schritten zur Reproduktion); der Schweregrad beschreibt die Auswirkung, die Priorität die Dringlichkeit der Behebung.
  - Erwartung: Die Ursache wird mit Methoden wie 5-Why (bis zu einer beeinflussbaren Ursache), Ishikawa-Diagramm oder Pareto-Analyse ermittelt.
  - Erwartung: Danach folgen die Korrektur des aktuellen Fehlers, eine Korrekturmaßnahme gegen die Ursache (z. B. zusätzlicher Test, geänderter Prozess) und die Dokumentation (Lessons Learned, geänderte Checkliste).
  - Rückfrage: Worin unterscheiden sich Schweregrad und Priorität eines Fehlers?
  - Rückfrage: Warum sollte die 5-Why-Kette nicht bei „Mensch hat sich geirrt“ enden?
- Wie haben Sie einen Soll-Ist-Vergleich durchgeführt, und welche Konsequenzen haben Sie aus der Abweichung gezogen?
  - Erwartung: Beim Soll-Ist-Vergleich werden geplante Zielwerte (Soll) mit den tatsächlich erreichten Werten (Ist) verglichen; die Soll-Werte müssen vorab messbar festgelegt sein, sonst lässt sich der Erfolg nicht belegen.
  - Erwartung: Typische Größen sind Fehlerdichte, Testabdeckung, Behebungsdauer von Tickets, Verfügbarkeit eines Dienstes sowie die Einhaltung von Terminen oder Kosten.
  - Erwartung: Die Abweichung wird analysiert: Ist sie relevant, woran liegt sie, welche Konsequenz folgt?
  - Erwartung: Der Vergleich ist die Check-Phase des PDCA-Zyklus: Bei Erfolg wird die Maßnahme standardisiert und ausgerollt, bei Misserfolg wird nachgesteuert.
  - Rückfrage: Was geschieht in den vier Phasen des PDCA-Zyklus?
- Welche Betriebsrichtlinien oder Qualitätssicherungssysteme Ihres Betriebs haben Sie angewendet, und wie haben Sie Ihre Ergebnisse dokumentiert?
  - Erwartung: Ein betriebliches Qualitätssicherungssystem legt Verantwortlichkeiten, Abläufe, Vorlagen und Prüfpunkte fest und ist oft an Normen wie die ISO 9001 angelehnt.
  - Erwartung: Im Alltag wird es angewendet, z. B. durch Checklisten, Freigabeprozesse, Ticketsysteme, Vorlagen für Testprotokolle und Dokumentationsstandards.
  - Erwartung: Die Ergebnisse werden dokumentiert, z. B. in Testplänen, Testprotokollen, Review-Ergebnissen, Abnahmeprotokollen und der Änderungs- und Fehlerhistorie.
  - Erwartung: Die Dokumentation macht Ergebnisse nachvollziehbar, dient als Nachweis gegenüber den Kund:innen und ist Grundlage für Verbesserungen.
  - Rückfrage: Welche Angaben gehören in ein Testprotokoll?

### 6.4 Wirksamkeit prüfen und nachsteuern

- Woran haben Sie festgestellt, dass die von Ihnen umgesetzten Sicherheits- oder Datenschutzmaßnahmen wirksam sind?
  - Erwartung: Wirksamkeit fragt, ob die Maßnahme das Ziel erreicht; Effizienz fragt, ob der Aufwand in einem sinnvollen Verhältnis zum Nutzen steht.
  - Erwartung: Eine Maßnahme schützt nur dann, wenn sie tatsächlich funktioniert, deshalb wird sie nicht nur umgesetzt, sondern auch geprüft und evaluiert.
  - Erwartung: Technische Maßnahmen lassen sich z. B. mit Schwachstellenscan, Konfigurations- oder Code-Review, Penetrationstest oder Log-Analyse prüfen, organisatorische mit Praxistests wie Restore-Test, Notfallübung oder Phishing-Simulation.
  - Erwartung: Die Prüfergebnisse werden mit vorab festgelegten Zielwerten verglichen (Soll-Ist-Vergleich), und die Umsetzung von Nachbesserungen wird durch einen Retest nachgeprüft.
  - Rückfrage: Wie prüfen Sie, ob ein Backup tatsächlich wirkt?
- Welche Kennzahlen oder Prüfverfahren (z. B. Test, Schwachstellenscan, Log-Auswertung, Audit) haben Sie dafür genutzt, und warum haben Sie diese ausgewählt?
  - Erwartung: Kennzahlen (Key Performance Indicators) sind z. B. Anzahl und Alter offener kritischer Schwachstellen, durchschnittliche Patch-Zeit, Erkennungs- und Reaktionszeiten bei Sicherheitsvorfällen, Klickrate bei Phishing-Simulationen und Restore-Erfolgsquote.
  - Erwartung: Kennzahlen müssen zum Ziel passen: Die Zahl durchgeführter Schulungen beschreibt Aktivität, nicht Wirkung; aussagekräftiger ist z. B., ob sich die Meldequote verdächtiger Mails verbessert.
  - Erwartung: Kennzahlen bringen nur etwas, wenn Zielwerte festgelegt sind und ein Soll-Ist-Vergleich erfolgt.
  - Erwartung: Ein Schwachstellenscan sucht automatisiert nach bekannten Schwachstellen und ordnet sie z. B. per CVSS (Skala 0 bis 10) nach technischem Schweregrad ein; ein Audit prüft systematisch und dokumentiert anhand von Kriterien wie Richtlinien, vertraglichen Vorgaben oder Normen.
  - Rückfrage: Warum reicht der CVSS-Wert allein nicht aus, um eine Schwachstelle zu priorisieren?
  - Rückfrage: Was bedeuten RTO und RPO?
- Was würden Sie im Rückblick in Ihrem Projekt anders machen, um Sicherheit, Datenschutz und Qualität noch besser zu gewährleisten, und welche Bestandteile enthielte Ihr Bericht dazu an die Kundschaft?
  - Erwartung: Prüfergebnisse werden nach Schweregrad, Ausnutzbarkeit und Schadenspotenzial bewertet und priorisiert.
  - Erwartung: Für jede Feststellung wird entschieden, ob sie beseitigt, abgeschwächt, abgesichert oder bewusst akzeptiert wird (mit dokumentiertem Restrisiko).
  - Erwartung: Maßnahmen kommen mit Verantwortlichen und Terminen in einen Maßnahmenplan, ihre Umsetzung wird per Retest nachgeprüft (PDCA: Check und Act), und die Risikobewertung wird bei neuen Erkenntnissen aktualisiert.
  - Erwartung: Der Bericht enthält eine Management Summary (kurz, ohne Fachjargon), einen Detailteil für die technischen Ansprechpersonen, einen priorisierten Maßnahmenplan mit Aufwandsschätzung sowie Hinweise zu Restrisiken.
  - Erwartung: Der Bericht ist vertraulich, geht nur an den vereinbarten Empfängerkreis, ist sachlich ohne Schuldzuweisungen und nennt auch, was gut funktioniert.
  - Rückfrage: Was gehört in eine Management Summary?

### 6.5 Zertifikate und PKI

- Wenn in Ihrem Projekt ein Dienst, eine Schnittstelle oder ein Gerät per Zertifikat abgesichert wird oder würde: Wie sind Sie bei Beantragung und Einrichtung vorgegangen bzw. wie würden Sie vorgehen, und woran erkennen Sie, dass alles korrekt funktioniert?
  - Erwartung: Das Schlüsselpaar wird auf dem Zielsystem oder in einem geschützten Schlüsselspeicher erzeugt; der private Schlüssel verlässt diesen Ort nicht und ist nur für den Dienst und die zuständige Administration lesbar.
  - Erwartung: Die Zertifikatsanforderung (CSR) enthält den öffentlichen Schlüssel und alle Namen, unter denen der Dienst, die Schnittstelle oder das Gerät angesprochen wird, als alternative Namen (SAN); sie ist mit dem privaten Schlüssel signiert.
  - Erwartung: Eine öffentliche Zertifizierungsstelle prüft mindestens die Kontrolle über die Domain (z. B. Datei auf dem Webserver oder TXT-Eintrag im DNS), bei höheren Validierungsstufen auch die Organisation; bei einer internen CA gelten die betrieblichen Freigaberegeln. Danach wird das Zertifikat ausgestellt.
  - Erwartung: Installiert werden Zertifikat und Zwischenzertifikat; geprüft wird unter allen Namen und nicht nur mit einem Browser, sondern auch mit der tatsächlichen Gegenstelle (vollständige Kette, Name, Gültigkeitszeitraum), und das Zertifikat wird mit Ablaufdatum und Zuständigkeit im Zertifikatsinventar dokumentiert.
  - Rückfrage: Warum enthält die Zertifikatsanforderung keinen privaten Schlüssel?
- Welche Art von Zertifikat nutzt Ihre Lösung oder würde sie nutzen (öffentliche Zertifizierungsstelle, interne CA oder selbstsigniert), warum, und welches Restrisiko bleibt?
  - Erwartung: Zertifikate öffentlicher Zertifizierungsstellen werden von den Vertrauensankern in Betriebssystemen und Browsern ohne weitere Einrichtung anerkannt; sie passen für Dienste, die Kund:innen, Partner oder nicht verwaltete Geräte nutzen, setzen aber eine Domänenprüfung und wegen der kurzen Laufzeiten eine automatisierte Erneuerung voraus.
  - Erwartung: Eine interne CA eignet sich für interne Namen, Geräte und Client-Zertifikate; ihr Root-Zertifikat muss auf allen beteiligten Geräten als Vertrauensanker verteilt werden, und die CA selbst muss geschützt, überwacht und dokumentiert betrieben werden.
  - Erwartung: Ein selbstsigniertes Zertifikat hat keine Kette und keine Sperrmöglichkeit; es muss auf jeder Gegenstelle einzeln, nach Vergleich des Fingerabdrucks über einen zweiten Kanal, als vertrauenswürdig hinterlegt werden und eignet sich vor allem für Tests und einzelne Geräte.
  - Erwartung: Gewöhnen sich Nutzer:innen daran, Zertifikatswarnungen wegzuklicken, bleibt ein Man-in-the-Middle-Angriff unbemerkt; die gewählte oder vorgeschlagene Lösung und das verbleibende Restrisiko werden begründet dokumentiert.
  - Rückfrage: Was belegt ein gültiges Zertifikat, und was belegt es nicht?
- Wie stellen Sie im Betrieb Ihrer Lösung sicher, dass Zertifikate nicht unbemerkt ablaufen, und wie gehen Sie vor, wenn ein privater Schlüssel kompromittiert sein könnte?
  - Erwartung: Alle Zertifikate stehen in einem Inventar mit Dienst, Namen, Aussteller, Ablaufdatum, Ort des privaten Schlüssels und verantwortlicher Person; auch Zwischen- und Root-Zertifikate werden erfasst, weil ein Endzertifikat nur so lange nutzbar ist, wie seine ganze Kette gültig ist.
  - Erwartung: Eine Überwachung warnt mit Vorwarnzeit (z. B. 30 Tage) vor dem Ablauf; wo möglich werden Zertifikate automatisch erneuert (z. B. über ACME), und der Erfolg der Erneuerung wird ebenfalls überwacht.
  - Erwartung: Bei Verdacht auf Kompromittierung wird das Zertifikat bei der ausstellenden Zertifizierungsstelle gesperrt, ein neues Schlüsselpaar erzeugt und ein neues Zertifikat eingerichtet; der Vorfall wird nach dem betrieblichen Sicherheitsprozess gemeldet und die Ursache geklärt.
  - Erwartung: Gesperrte Zertifikate werden über Sperrlisten (CRL) oder OCSP bekannt gemacht; weil Clients Sperrungen nicht immer zuverlässig prüfen, begrenzen kurze Laufzeiten den möglichen Schaden zusätzlich.
  - Rückfrage: Worin unterscheiden sich CRL und OCSP?

### 6.6 NIS2, KRITIS und Meldepflichten

- Fällt Ihr Ausbildungsbetrieb oder ein Kunde, den Sie in Ihrem Projekt betreuen, unter die europäischen Cybersicherheitsregeln (NIS2) und ihre deutsche Umsetzung? Wie finden Sie das heraus, und wie gehen Sie in einem Kundengespräch mit der Frage um?
  - Erwartung: Entscheidend sind eine Einrichtungsart aus den gesetzlichen Listen (zum Beispiel digitale Infrastruktur einschließlich Managed Services, Energie, Gesundheit, Lebensmittelproduktion, Maschinenbau), das entgeltliche Angebot an Dritte und die Größe; unterschieden werden besonders wichtige und wichtige Einrichtungen, Betreiber kritischer Anlagen gelten stets als besonders wichtig.
  - Erwartung: Die Beschäftigtenzahl wird in Jahresarbeitseinheiten gezählt, Auszubildende zählen nicht mit; Umsatz, Bilanzsumme und verbundene Unternehmen sind einzubeziehen. Die Einrichtung muss selbst prüfen, ob sie erfasst ist, und sich beim BSI registrieren.
  - Erwartung: Sinnvoll ist, dass ein IT-Dienstleister Orientierung gibt (Sektor, Größe, Sonderfälle prüfen, Annahmen dokumentieren, technische Folgen aufzeigen), aber keine verbindliche Rechtsauskunft und keine Garantien erteilt und dafür an die Rechtsberatung verweist.
  - Erwartung: Reine Softwareentwicklung ohne Betrieb ist keine eigene Einrichtungsart; für Produkte gelten andere Regeln (Cyber Resilience Act), über Verträge können Kundschaft und Lieferkette dennoch Anforderungen weitergeben.
  - Rückfrage: Werden Auszubildende bei der Größenprüfung mitgezählt?
- Stellen Sie sich einen Dienst vor, den Sie in Ihrem Projekt entwickelt, betrieben oder mit Daten versorgt haben und der bei einem Angriff länger ausfallen könnte. Welche Meldungen wären nötig, an wen und bis wann, und wie unterscheidet sich das von der Meldung einer Datenpanne?
  - Erwartung: Ein erheblicher Sicherheitsvorfall (schwerwiegende Betriebsstörung oder finanzielle Verluste, erhebliche Schäden bei anderen) ist bei der gemeinsamen Meldestelle von BSI und BBK zu melden: Frühwarnung binnen 24 Stunden, Meldung mit erster Bewertung binnen 72 Stunden, jeweils ab Kenntnis, Zwischenmeldung auf Ersuchen, Abschlussmeldung einen Monat nach der Meldung (bei andauerndem Vorfall zunächst Fortschrittsmeldung).
  - Erwartung: Die Fristen laufen ab Kenntnis von einem erheblichen Vorfall; zügig bewerten, nicht erst nach Abschluss der Analyse. Ein Beinahevorfall ist nicht meldepflichtig, kann aber freiwillig gemeldet werden.
  - Erwartung: Die Datenpanne betrifft personenbezogene Daten, richtet sich an die Datenschutzaufsicht und gilt für jeden Verantwortlichen, möglichst binnen 72 Stunden; beide Pflichten können zugleich auslösen und bestehen nebeneinander.
  - Erwartung: Wer als Dienstleister Daten im Auftrag verarbeitet, informiert die Verantwortlichen unverzüglich, damit diese ihre Fristen einhalten können; deshalb sind interne Meldewege und eine schnelle Erstbewertung wichtig.
  - Rückfrage: Wann beginnt die Frist: beim ersten Alarm oder später?
- Welche Maßnahmen in Ihrem Projekt oder Ihrem Betrieb gehören zu den gesetzlichen Mindestbereichen des Risikomanagements, und wer trägt im Betrieb die Verantwortung?
  - Erwartung: Zu den Mindestbereichen zählen unter anderem Risikoanalyse und Sicherheitskonzepte, Vorfallbewältigung, Backup und Wiederherstellung, Krisenmanagement, Sicherheit der Lieferkette, Schwachstellenmanagement, Wirksamkeitsprüfung, Schulung, Kryptografie, Zugriffskontrolle und Mehrfaktor-Authentifizierung; die Maßnahmen müssen verhältnismäßig sein, dem Stand der Technik entsprechen und dokumentiert werden.
  - Erwartung: Die Geschäftsleitung muss die Maßnahmen umsetzen und überwachen und regelmäßig an Schulungen teilnehmen; sie haftet der Einrichtung bei schuldhafter Pflichtverletzung nach den Regeln des Gesellschaftsrechts. Beschäftigte setzen die Vorgaben in ihren Aufgaben um.
  - Erwartung: Die Maßnahmen aus den Themen IT-Sicherheit, Zertifikate und Wirksamkeitsprüfung lassen sich den Mindestbereichen zuordnen; Lücken werden dokumentiert und mit Prioritäten nachgesteuert.
  - Erwartung: Betreiber kritischer Anlagen haben zusätzliche Pflichten (Angriffserkennung, Nachweise, Resilienzmaßnahmen nach dem KRITIS-Dachgesetz), die für Industriekundschaft relevant sein können.
  - Rückfrage: Was ist ein Beinahevorfall, und muss er gemeldet werden?

### 6.7 Cyber Resilience Act

- Ihr Unternehmen bringt ein vernetztes Produkt (Gerät oder Software) auf den Markt. Welche Pflichten aus dem Cyber Resilience Act kommen auf den Hersteller zu, und was gilt davon heute schon?
  - Erwartung: Der CRA gilt für Produkte mit digitalen Elementen, die im Rahmen einer Geschäftstätigkeit auf dem Markt bereitgestellt werden, einschließlich der zugehörigen Datenfernverarbeitung; Hersteller ist, wer unter eigenem Namen oder eigener Marke vertreibt, auch wenn Komponenten von Dritten stammen.
  - Erwartung: Die Produkte müssen risikobasiert angemessene Sicherheitsanforderungen erfüllen (zum Beispiel sichere Standardkonfiguration, Updates, Zugriffsschutz); der Hersteller führt eine Risikobewertung durch, hat ein Verfahren zur Behandlung von Schwachstellen (Software-Stückliste, Kontaktstelle, koordinierte Offenlegung, Updates) und legt einen Unterstützungszeitraum von in der Regel mindestens fünf Jahren fest.
  - Erwartung: Konformität wird meist durch Selbstbewertung nachgewiesen (technische Dokumentation, EU-Konformitätserklärung, CE-Kennzeichnung); für wichtige Produkte, etwa bestimmte Netz- und Sicherheitsprodukte, gelten strengere Verfahren.
  - Erwartung: Zeitplan: Die Meldepflichten für aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfälle gelten seit dem 11.09.2026, die übrigen Pflichten ab dem 11.12.2027; früher in Verkehr gebrachte Produkte unterliegen den übrigen Pflichten nur nach einer wesentlichen Änderung.
  - Rückfrage: Gilt die Meldepflicht auch für Produkte, die schon verkauft sind?
- Eine externe Sicherheitsforscherin meldet Ihnen eine Schwachstelle in einem Produkt Ihres Unternehmens. Wie gehen Sie vor, und wann müssen Sie Behörden einbeziehen?
  - Erwartung: Der Hinweis wird über die angegebene Kontaktstelle entgegengenommen und nach dem Verfahren zur koordinierten Offenlegung geprüft, bewertet (ausnutzbar? aktiv ausgenutzt?) und dokumentiert; die Software-Stückliste hilft festzustellen, welche Produkte und Komponenten betroffen sind.
  - Erwartung: Wird die Schwachstelle nicht ausgenutzt, wird sie behandelt, ein Update bereitgestellt und über die behobene Schwachstelle informiert (für nach dem 11.12.2027 in Verkehr gebrachte Produkte Pflicht, für früher in Verkehr gebrachte sachgerecht); eine Meldung ist dann freiwillig möglich.
  - Erwartung: Liegen verlässliche Nachweise einer aktiven Ausnutzung vor, besteht eine Meldepflicht, auch für ältere Produkte: Frühwarnung spätestens 24 Stunden und Meldung spätestens 72 Stunden nach Kenntnis, Abschlussbericht 14 Tage nach Verfügbarkeit einer Korrektur; die Meldung geht gleichzeitig an das zuständige CSIRT und die ENISA über die einheitliche Meldeplattform, außerdem werden die betroffenen Nutzer:innen informiert.
  - Erwartung: Daneben ist zu prüfen, ob weitere Meldewege ausgelöst werden (Datenpanne, Pflichten als Einrichtung); sie haben eigene Voraussetzungen, Fristen und Empfänger. Liegt die Ursache in einer fremden Komponente, wird der Hersteller der Komponente informiert.
  - Rückfrage: Ab wann laufen die Fristen, und wer ist bei einer Schwachstelle in einer Open-Source-Bibliothek verantwortlich?

### 6.8 KI-Verordnung und KI-Einsatz im Projekt

- Haben Sie in Ihrem Projekt KI-Werkzeuge eingesetzt? Wie haben Sie das gegenüber Betrieb, Kundschaft und Prüfungsausschuss offengelegt, und wie haben Sie die Ergebnisse geprüft?
  - Erwartung: Den zulässigen Umfang bestimmen die Vorgaben von Betrieb, Kundschaft, zuständiger Stelle und Prüfungsausschuss; sie werden vorab geklärt und eingehalten.
  - Erwartung: Die eingesetzten Werkzeuge und ihr Zweck werden offengelegt, KI-erzeugte Inhalte werden kenntlich gemacht, und die Nutzung wird nachvollziehbar dokumentiert; ohne Kenntlichmachung droht der Vorwurf der Täuschung.
  - Erwartung: KI-Ergebnisse sind Vorschläge; sie werden wie fremder Code oder fremder Text geprüft (Review, Tests, Gegenprüfung an der Quelle), und die Verantwortung bleibt beim Unternehmen und bei Ihnen.
  - Erwartung: Übernommene Teile müssen im Fachgespräch erklärt und begründet werden können; die Eigenleistung bleibt erkennbar.
  - Rückfrage: Was haben Sie getan, damit keine Kundendaten in einen öffentlichen KI-Dienst gelangen?
- Welche Pflichten und Risiken ergeben sich, wenn Ihre Kundschaft eine KI-Funktion in einem Projektergebnis wünscht? Wenn Ihr Projekt keine KI enthielt: Wie würden Sie vorgehen?
  - Erwartung: Zuerst wird geklärt, ob es sich um ein KI-System handelt, welche Rolle Ihr Betrieb (zum Beispiel Anbieterin) und die Kundschaft (zum Beispiel Betreiberin) haben und welche Zweckbestimmung vorgesehen ist.
  - Erwartung: Die Einstufung bestimmt die Pflichten: verbotene Praktiken sind unzulässig, Hochrisiko-Bereiche wie Personalauswahl oder Bildung lösen strenge Anforderungen aus, Chatbots und erzeugte Inhalte unterliegen Transparenzpflichten; die jeweiligen Geltungsbeginne sind zu beachten.
  - Erwartung: Zweckbestimmung und ausgeschlossene Verwendungen werden in Vertrag und Betriebsanleitung festgehalten, weil eine Zweckänderung die Rolle ändern kann.
  - Erwartung: Verbindliche Rechtsauskünfte gehören nicht zur technischen Beratung; im Grenzfall wird an die Rechtsabteilung, die Datenschutzbeauftragte oder externe Rechtsberatung verwiesen, und Aussagen nennen Stand und Quelle.
  - Rückfrage: Was ändert sich, wenn die Kundschaft den Assistenten später für einen anderen Zweck nutzen möchte?
- Wie ist in Ihrem Betrieb sichergestellt, dass Beschäftigte KI-Werkzeuge sachkundig und regelkonform einsetzen, und wer muss bei der Einführung beteiligt werden?
  - Erwartung: Anbieter und Betreiber ergreifen Maßnahmen, um die KI-Kompetenz ihres Personals zu entwickeln, passend zu Kenntnissen und Einsatz; ein bestimmtes Niveau muss nicht garantiert werden.
  - Erwartung: Geeignet sind rollenbezogene Schulungen, schriftliche Leitlinien (Freigabeliste, Datenklassen, Prüfpflicht), feste Ansprechpersonen und eine Dokumentation der Maßnahmen.
  - Erwartung: Besteht ein Betriebsrat, wird er über die Planung des KI-Einsatzes rechtzeitig unterrichtet und beraten; bei der Beurteilung von KI darf er eine sachverständige Person hinzuziehen, deren Hinzuziehung als erforderlich gilt.
  - Erwartung: Ob ein Werkzeug Verhalten oder Leistung überwachen kann und deshalb mitbestimmungspflichtig ist, und der Datenschutz für Beschäftigtendaten sind zusätzlich zu prüfen.
  - Rückfrage: Welche Daten dürfen Sie nach den Regeln Ihres Betriebs in ein freigegebenes KI-Werkzeug eingeben?
