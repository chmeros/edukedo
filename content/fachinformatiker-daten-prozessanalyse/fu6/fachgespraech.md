---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: FU6
fachgebiet_title: "IT-Sicherheit, Datenschutz und Qualitätssicherung"
thema_code: "FU6-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen zur Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 5 und 6 (§ 4 Abs. 2 Nr. 5 und 6), orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Im Anschluss an die Präsentation der betrieblichen Projektarbeit wird ein Fachgespräch geführt, in dem die Vorgehensweise begründet werden soll (vgl. Regelungen zur betrieblichen Projektarbeit in den §§ 12, 20, 28 und 36 FIAusbV, je nach Fachrichtung). Die Fragen sind nach Thema gruppiert, beziehen sich auf das eigene Projekt und simulieren typische Rückfragen des Prüfungsausschusses zu Qualitätssicherung, IT-Sicherheit und Datenschutz. Sie erfordern freies Formulieren und eine Begründung der eigenen Entscheidungen statt auswendig gelernter Antworten.

### 6.1 IT-Sicherheit: Schutzziele, Bedrohungen und Maßnahmen

- Welche Schutzziele waren in Ihrem Projekt am wichtigsten, und woran haben Sie das festgemacht?
  - Erwartung: Die drei klassischen Schutzziele sind Vertraulichkeit (nur Berechtigte sehen Informationen), Integrität (Daten und Systeme bleiben korrekt und unverändert) und Verfügbarkeit (Systeme und Daten stehen bei Bedarf zur Verfügung).
  - Erwartung: Ergänzend werden häufig Authentizität und Verbindlichkeit bzw. Nichtabstreitbarkeit genannt.
  - Erwartung: Die Gewichtung richtet sich nach dem konkreten System und dem Schutzbedarf der Daten, der zu Beginn der Risikoanalyse erfasst wird.
  - Erwartung: Schutzziele können in Konflikt geraten: Eine sehr restriktive Zugriffskontrolle stärkt die Vertraulichkeit, kann aber die Verfügbarkeit im Störungsfall einschränken.
  - Rückfrage: Welches Schutzziel trifft Ransomware vor allem?
- Welche drei Bedrohungen haben Sie für Ihr Projekt oder Ihr System als besonders relevant eingeschätzt, und wie haben Sie deren Schadenspotenzial bewertet?
  - Erwartung: Eine Bedrohung ist ein mögliches Ereignis, das ein Schutzziel verletzen kann; eine Schwachstelle lässt sie wirksam werden, und das Risiko entsteht aus beiden zusammen.
  - Erwartung: Bedrohungen sind nicht nur Angriffe von außen, sondern auch menschliche Fehler, technisches Versagen und höhere Gewalt.
  - Erwartung: Typische Angriffsarten sind Malware und Ransomware, Phishing, Social Engineering, DoS bzw. DDoS, Man-in-the-Middle, Injection, Brute-Force bzw. Credential-Stuffing und das Ausnutzen ungepatchter Schwachstellen; jede wird dem betroffenen Schutzziel zugeordnet.
  - Erwartung: Das Schadenspotenzial wird nach wirtschaftlichen und technischen Kriterien eingeschätzt: Produktionsstillstand, Vertragsstrafen, Reputation und Wiederherstellungsaufwand.
  - Erwartung: Ein Bedrohungsszenario beschreibt konkret, wer was wie angreift, welche Folgen eintreten, welche Schutzziele betroffen sind und welche Gegenmaßnahmen möglich sind.
  - Rückfrage: Worin unterscheiden sich Bedrohung, Schwachstelle und Risiko?
- Wie sind Sie vorgegangen, um Risiken zu priorisieren — und warum haben Sie sich für genau diese Maßnahmen entschieden und gegen andere?
  - Erwartung: Das Vorgehen beginnt mit den zu schützenden Werten und ihrem Schutzbedarf, ermittelt Bedrohungen und Schwachstellen, schätzt Eintrittswahrscheinlichkeit und Schadenspotenzial ein, priorisiert z. B. in einer Risikomatrix, wählt Maßnahmen aus und dokumentiert das Restrisiko.
  - Erwartung: Die einfachste Formel lautet: Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe.
  - Erwartung: Für den Umgang mit einem Risiko gibt es vier Strategien: vermeiden, vermindern, übertragen und akzeptieren.
  - Erwartung: Gute Konzepte kombinieren technische und organisatorische Maßnahmen (Defense in Depth, Prinzip der minimalen Rechte) und ordnen jede Maßnahme dem Risiko zu, das sie senkt, weil eine Maßnahme meist nur gegen eine Angriffsart wirkt.
  - Rückfrage: Welche Strategie ergibt sich in der vereinfachten Risikomatrix bei hoher Wahrscheinlichkeit und hohem Schaden?
- Welche betrieblichen Vorgaben zur IT-Sicherheit (z. B. Passwortrichtlinie, Berechtigungskonzept) haben Sie in Ihrem Projekt berücksichtigt, und wie haben Sie deren Einhaltung sichergestellt?
  - Erwartung: Betriebliche Vorgaben wie die Passwortrichtlinie oder die Regeln für mobile Geräte ergeben sich meist aus dem Informationssicherheits-Managementsystem, das sich häufig an Rahmenwerken wie ISO/IEC 27001 oder dem IT-Grundschutz des BSI orientiert.
  - Erwartung: Auszubildende müssen diese Vorgaben kennen, einhalten und im Projekt erkennbar berücksichtigen.
  - Erwartung: Umgesetzt werden sie z. B. durch Rollen- und Berechtigungskonzepte, das Prinzip der minimalen Rechte, das Vier-Augen-Prinzip und Schulungen.
  - Erwartung: Die Einhaltung wird geprüft, z. B. durch Audits anhand betrieblicher Richtlinien sowie durch Konfigurations- und Code-Reviews (unnötige Dienste deaktiviert, Standardpasswörter geändert).
  - Rückfrage: Was besagt das Prinzip der minimalen Rechte?
- Wie haben Sie Authentifizierung und Verschlüsselung in Ihrem Projekt umgesetzt oder bewusst nicht umgesetzt, und welches Restrisiko bleibt?
  - Erwartung: Bei der Authentifizierung weisen Nutzer:innen ihre Identität nach, bei der Autorisierung wird anschließend geprüft, was sie dürfen; Faktoren sind Wissen, Besitz und Eigenschaft.
  - Erwartung: Mehrfaktor-Authentifizierung kombiniert mindestens zwei unterschiedliche Faktoren und schützt auch dann noch, wenn ein Passwort abgegriffen wurde; zwei Passwörter sind kein zweiter Faktor.
  - Erwartung: Passwörter werden nicht im Klartext und nicht reversibel verschlüsselt abgelegt, sondern gehasht mit Salt.
  - Erwartung: Verschlüsselung kann symmetrisch (gleicher Schlüssel, schnell, aber sicherer Schlüsselaustausch nötig) oder asymmetrisch (Schlüsselpaar aus öffentlichem und privatem Schlüssel) erfolgen; bei TLS werden beide kombiniert.
  - Erwartung: Wird eine Maßnahme bewusst nicht umgesetzt, bleibt ein Restrisiko, das dokumentiert und gegebenenfalls bewusst akzeptiert wird, z. B. wenn es gering ist.
  - Rückfrage: Warum schützt Mehrfaktor-Authentifizierung auch bei einem abgegriffenen Passwort?

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

### 6.3 Qualitätssicherung und Verbesserungsprozesse

- Welche Qualitätsmerkmale waren Ihrem Kunden wichtig, und wie haben Sie diese messbar gemacht?
  - Erwartung: Qualität bedeutet, dass ein Produkt oder eine Leistung die vereinbarten und die berechtigterweise erwarteten Anforderungen erfüllt; sie hängt von Produktqualität und Prozessqualität ab.
  - Erwartung: Qualitätsmerkmale für Software sind z. B. funktionale Eignung, Zuverlässigkeit, Leistungseffizienz, Gebrauchstauglichkeit, Sicherheit, Wartbarkeit, Kompatibilität und Übertragbarkeit; bei Datenprodukten kommt die Datenqualität hinzu, bei vernetzten Systemen Verfügbarkeit und Latenz.
  - Erwartung: Mit dem Kunden wird vorab vereinbart, welche Merkmale wie gemessen werden.
  - Erwartung: Messbar wird eine Anforderung durch konkrete Werte: schnell ist nicht prüfbar, Antwortzeit unter zwei Sekunden bei 100 gleichzeitigen Nutzern schon.
  - Rückfrage: Worin unterscheiden sich Produktqualität und Prozessqualität?
- Welche Qualitätssicherungsmaßnahmen haben Sie projektbegleitend durchgeführt, und welche davon haben Fehler tatsächlich aufgedeckt?
  - Erwartung: Konstruktive Maßnahmen beugen Fehlern vor (Coding-Guidelines, Vorlagen, Schulungen, klare Anforderungen, Definition of Done); analytische Maßnahmen prüfen vorhandene Ergebnisse (Tests, Code-Reviews, statische Analyse, Abnahmeprüfungen).
  - Erwartung: Projektbegleitend werden Tests auf mehreren Ebenen (Unit-, Integrations-, System- und Abnahmetests), automatisierte Prüfungen in der Build-Pipeline und Code-Reviews nach dem Vier-Augen-Prinzip eingesetzt.
  - Erwartung: Tests können das Vorhandensein von Fehlern zeigen, aber nicht deren Abwesenheit beweisen; Testfälle werden deshalb sinnvoll ausgewählt, z. B. Grenzwerte und Fehlerfälle.
  - Erwartung: Alle Maßnahmen werden dokumentiert, z. B. in Testplänen, Testprotokollen (Datum, Testfall, erwartetes und tatsächliches Ergebnis, Tester:in), Review-Ergebnissen, Abnahmeprotokollen und der Fehlerhistorie.
  - Rückfrage: Was unterscheidet Verifikation von Validierung?
- Wie sind Sie vorgegangen, als ein Fehler oder Mangel auftrat — haben Sie nur das Symptom beseitigt oder auch die Ursache analysiert? Beschreiben Sie das an einem konkreten Beispiel.
  - Erwartung: Es genügt nicht, das Symptom zu beseitigen; eine systematische Ursachenanalyse verhindert, dass derselbe Fehler wiederkehrt.
  - Erwartung: Der Fehler wird erfasst und reproduziert, z. B. als Ticket mit Schweregrad, Umgebung und Schritten zur Reproduktion.
  - Erwartung: Mit der 5-Why-Methode wird wiederholt nach dem Warum gefragt, bis eine beeinflussbare Ursache erreicht ist; die Kette endet nicht bei Mensch hat sich geirrt.
  - Erwartung: Ein Ishikawa-Diagramm sammelt mögliche Ursachen nach Kategorien (z. B. Mensch, Methode, Technik, Material/Daten, Umgebung, Messung), die tatsächliche Ursache wird durch Prüfung belegt; eine Pareto-Analyse sortiert nach Häufigkeit oder Schaden.
  - Erwartung: Danach folgen die Korrektur des aktuellen Fehlers, eine Korrekturmaßnahme gegen die Ursache (z. B. zusätzlicher Test, geänderter Prozess) und die Dokumentation als Lessons Learned.
  - Rückfrage: Worin unterscheiden sich Schweregrad und Priorität eines Fehlers?
- Wie haben Sie einen Soll-Ist-Vergleich durchgeführt, und welche Konsequenzen haben Sie aus der Abweichung gezogen?
  - Erwartung: Die Soll-Werte werden vorab messbar festgelegt, sonst lässt sich der Erfolg einer Verbesserung nicht belegen.
  - Erwartung: Geplante Zielwerte werden mit den tatsächlich erreichten verglichen, z. B. Fehlerdichte, Testabdeckung, Behebungsdauer von Tickets, Verfügbarkeit eines Dienstes oder Einhaltung von Terminen und Kosten.
  - Erwartung: Die Abweichung wird analysiert: Ist sie relevant, woran liegt sie, welche Konsequenz folgt?
  - Erwartung: Im PDCA-Zyklus findet der Soll-Ist-Vergleich in der Check-Phase statt; bei Erfolg wird die Maßnahme standardisiert, bei Misserfolg wird nachgesteuert und der Zyklus neu begonnen.
  - Rückfrage: Was geschieht in den vier Phasen des PDCA-Zyklus?
- Welche Betriebsrichtlinien oder Qualitätssicherungssysteme Ihres Betriebs haben Sie angewendet, und wie haben Sie Ihre Ergebnisse dokumentiert?
  - Erwartung: Ein betriebliches Qualitätssicherungssystem, oft an Normen wie ISO 9001 angelehnt, legt Verantwortlichkeiten, Abläufe, Vorlagen und Prüfpunkte fest.
  - Erwartung: Beschäftigte wenden es im Alltag an, z. B. durch Checklisten, Freigabeprozesse, Ticketsysteme, Vorlagen für Testprotokolle und Dokumentationsstandards.
  - Erwartung: Die Dokumentation macht Ergebnisse nachvollziehbar, dient als Nachweis gegenüber Kunden und ist Grundlage für Verbesserungen.
  - Erwartung: Zu dokumentieren sind Testpläne, Testprotokolle, Review-Ergebnisse, Abnahmeprotokolle sowie Änderungs- und Fehlerhistorie.
  - Rückfrage: Welche Angaben gehören in ein Testprotokoll?

### 6.4 Wirksamkeit prüfen und nachsteuern

- Woran haben Sie festgestellt, dass die von Ihnen umgesetzten Sicherheits- oder Datenschutzmaßnahmen wirksam sind?
  - Erwartung: Wirksamkeit fragt, ob die Maßnahme ihr Ziel erreicht (z. B. ob das Backup tatsächlich vor Datenverlust schützt), Effizienz fragt, ob der Aufwand in einem sinnvollen Verhältnis zum Nutzen steht.
  - Erwartung: Praxistests prüfen organisatorische Maßnahmen, z. B. ein Restore-Test, eine Notfallübung oder eine Phishing-Simulation.
  - Erwartung: Audits, Konfigurations- und Code-Reviews, Schwachstellenscans und die Auswertung von Protokollen liefern weitere Belege.
  - Erwartung: Kennzahlen mit festgelegten Zielwerten ermöglichen einen Soll-Ist-Vergleich; Prüfergebnisse werden bewertet, Maßnahmen nachgeprüft (Retest).
  - Rückfrage: Worin unterscheiden sich Wirksamkeit und Effizienz einer Maßnahme?
- Welche Kennzahlen oder Prüfverfahren (z. B. Test, Schwachstellenscan, Log-Auswertung, Audit) haben Sie dafür genutzt, und warum haben Sie diese ausgewählt?
  - Erwartung: Audits sind systematische, dokumentierte Überprüfungen anhand von Kriterien (z. B. betrieblichen Richtlinien) mit Checklisten, Stichproben und Interviews; das Ergebnis ist ein Auditbericht.
  - Erwartung: Schwachstellenscans durchsuchen Systeme automatisiert nach bekannten Schwachstellen; die Ergebnisse (z. B. CVSS-Wert von 0 bis 10) müssen kontextbezogen bewertet werden.
  - Erwartung: Die Protokollauswertung sucht in Logs nach Auffälligkeiten wie vielen fehlgeschlagenen Anmeldungen, ungewöhnlichen Zugriffszeiten oder Rechteänderungen.
  - Erwartung: Kennzahlen sind z. B. offene kritische Schwachstellen, Patch-Zeit, Erkennungs- und Reaktionszeiten, Klickrate bei Phishing-Simulationen sowie Restore-Erfolgsquote gegenüber den Vorgaben RTO und RPO.
  - Erwartung: Kennzahlen müssen zum Ziel passen: Die Zahl durchgeführter Schulungen beschreibt Aktivität, nicht Wirkung, und Kennzahlen brauchen Zielwerte.
  - Rückfrage: Was bedeuten RTO und RPO?
- Was würden Sie im Rückblick in Ihrem Projekt anders machen, um Sicherheit, Datenschutz und Qualität noch besser zu gewährleisten, und wie würden Sie den Kunden darüber informieren?
  - Erwartung: Prüfergebnisse werden nach Schweregrad, Ausnutzbarkeit und Schadenspotenzial bewertet; für jede Feststellung wird entschieden, ob sie beseitigt, abgeschwächt, abgesichert oder bewusst akzeptiert wird (mit dokumentiertem Restrisiko).
  - Erwartung: Maßnahmen kommen mit Verantwortlichen und Terminen in einen Maßnahmenplan, ihre Umsetzung wird nachgeprüft (Retest), und die Risikobewertung wird bei neuen Erkenntnissen aktualisiert.
  - Erwartung: Der Bericht an den Kunden enthält eine Management Summary (kurz, ohne Fachjargon), einen Detailteil für die technischen Ansprechpersonen, einen priorisierten Maßnahmenplan und Hinweise zu Restrisiken.
  - Erwartung: Der Bericht ist sachlich ohne Schuldzuweisungen, nennt auch, was gut funktioniert, und wird nur an den vereinbarten Empfängerkreis übergeben.
  - Rückfrage: Warum ist ein Prüfbericht vertraulich zu behandeln?

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
