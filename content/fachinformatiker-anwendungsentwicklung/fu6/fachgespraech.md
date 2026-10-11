---
kurs_slug: fachinformatiker-anwendungsentwicklung
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
  - Erwartung: Die drei klassischen Schutzziele sind Vertraulichkeit, Integrität und Verfügbarkeit, ergänzend werden häufig Authentizität und Verbindlichkeit genannt.
  - Erwartung: Die Gewichtung richtet sich nach dem konkreten System und dem Schutzbedarf der Daten.
  - Erwartung: Die Verletzung eines Schutzziels wird an Beispielen festgemacht, z. B. gestohlene Zugangsdaten (Vertraulichkeit), manipulierte Messwerte (Integrität) oder Ransomware (Verfügbarkeit).
  - Erwartung: Schutzziele können in Konflikt geraten, z. B. stärkt eine sehr restriktive Zugriffskontrolle die Vertraulichkeit, kann aber die Verfügbarkeit im Störungsfall einschränken.
  - Rückfrage: Welches Schutzziel trifft Ransomware vor allem?
- Welche drei Bedrohungen haben Sie für Ihr Projekt oder Ihr System als besonders relevant eingeschätzt, und wie haben Sie deren Schadenspotenzial bewertet?
  - Erwartung: Eine Bedrohung ist ein mögliches Ereignis, das ein Schutzziel verletzen kann; eine Schwachstelle lässt sie wirksam werden, und das Risiko entsteht aus dem Zusammenspiel beider.
  - Erwartung: Die drei Bedrohungen sind konkret benannt, z. B. Phishing, Ransomware, SQL-Injection, Denial of Service, Man-in-the-Middle oder Passwortangriffe, und den betroffenen Schutzzielen zugeordnet; auch menschliche Fehler, technisches Versagen und höhere Gewalt zählen zu den Bedrohungen.
  - Erwartung: Das Schadenspotenzial wird unter wirtschaftlichen und technischen Kriterien eingeschätzt, also nicht nur „Was kann technisch passieren?“, sondern auch „Was kostet es den Kunden?“ (Produktionsstillstand, Vertragsstrafen, Reputation, Wiederherstellungsaufwand).
  - Erwartung: Ein Bedrohungsszenario beschreibt konkret, wer was wie angreift, welche Folgen eintreten, welche Schutzziele betroffen sind und welche Gegenmaßnahmen möglich sind.
  - Rückfrage: Welche Schutzziele verletzt ein Man-in-the-Middle-Angriff?
- Wie sind Sie vorgegangen, um Risiken zu priorisieren — und warum haben Sie sich für genau diese Maßnahmen entschieden und gegen andere?
  - Erwartung: Zuerst werden Werte und Schutzbedarf erfasst, dann Bedrohungen und Schwachstellen ermittelt, Eintrittswahrscheinlichkeit und Schadenspotenzial eingeschätzt, die Risiken z. B. in einer Risikomatrix priorisiert und die Maßnahmen ausgewählt; das Restrisiko wird dokumentiert.
  - Erwartung: Die einfachste Formel lautet Risiko gleich Eintrittswahrscheinlichkeit mal Schadenshöhe, wobei ein kleiner, aber sehr häufiger Schaden ebenso bedeutsam sein kann wie ein seltenes Großereignis.
  - Erwartung: Für den Umgang mit einem Risiko gibt es die Strategien vermeiden, vermindern, übertragen und akzeptieren.
  - Erwartung: Jede Maßnahme wird dem Risiko zugeordnet, das sie senkt; so lässt sich begründen, warum eine Maßnahme nötig ist und warum eine andere sich nicht lohnt.
  - Rückfrage: Welche Strategie ergibt sich in der vereinfachten Risikomatrix bei hoher Wahrscheinlichkeit und hohem Schaden?
  - Rückfrage: Warum genügt es nicht, sich auf eine einzige Schutzmaßnahme zu verlassen?
- Welche betrieblichen Vorgaben zur IT-Sicherheit (z. B. Passwortrichtlinie, Berechtigungskonzept) haben Sie in Ihrem Projekt berücksichtigt, und wie haben Sie deren Einhaltung sichergestellt?
  - Erwartung: Betriebliche Vorgaben ergeben sich meist aus dem Informationssicherheits-Managementsystem des Unternehmens, das sich häufig an ISO/IEC 27001 oder dem IT-Grundschutz des BSI orientiert.
  - Erwartung: Beispiele für Vorgaben sind die Passwortrichtlinie, Regeln für mobile Geräte, Sicherheitsrichtlinien sowie Rollen- und Berechtigungskonzepte.
  - Erwartung: Die Vorgaben müssen bekannt sein, eingehalten und im Projekt erkennbar berücksichtigt werden, z. B. nach dem Prinzip der minimalen Rechte.
  - Erwartung: Die Einhaltung wird geprüft, z. B. durch Audits anhand von Checklisten oder durch Konfigurations- und Code-Reviews (Standardpasswörter geändert, Eingaben validiert).
  - Rückfrage: Was besagt das Prinzip der minimalen Rechte?
- Wie haben Sie Authentifizierung und Verschlüsselung in Ihrem Projekt umgesetzt oder bewusst nicht umgesetzt, und welches Restrisiko bleibt?
  - Erwartung: Die Authentifizierung weist die Identität nach, die Autorisierung prüft danach, was erlaubt ist; Faktoren sind Wissen, Besitz und Eigenschaft, und Mehrfaktor-Authentifizierung kombiniert mindestens zwei unterschiedliche Faktoren.
  - Erwartung: Passwörter werden nicht im Klartext und nicht reversibel verschlüsselt abgelegt, sondern mit Salt und einem dafür geeigneten, bewusst langsamen Verfahren gehasht.
  - Erwartung: Bei der Verschlüsselung wird zwischen symmetrischen Verfahren (ein gemeinsamer geheimer Schlüssel) und asymmetrischen Verfahren (Schlüsselpaar aus öffentlichem und privatem Schlüssel) unterschieden; bei TLS werden beide kombiniert, und eine verschlüsselte Verbindung mit geprüftem Zertifikat schützt vor Man-in-the-Middle.
  - Erwartung: Eine bewusst nicht umgesetzte Maßnahme wird anhand wirtschaftlicher und technischer Kriterien begründet, und das verbleibende Restrisiko wird dokumentiert.
  - Rückfrage: Warum werden Passwörter gehasht gespeichert und nicht verschlüsselt?

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
  - Erwartung: Qualität bedeutet, dass ein Produkt oder eine Leistung die vereinbarten und die berechtigterweise erwarteten Anforderungen erfüllt.
  - Erwartung: Qualitätsmerkmale für Software sind z. B. funktionale Eignung, Zuverlässigkeit, Leistungseffizienz, Gebrauchstauglichkeit (auch Barrierefreiheit), Sicherheit, Wartbarkeit, Kompatibilität und Übertragbarkeit, wobei die ISO/IEC 25010 eine Orientierung bietet.
  - Erwartung: Mit dem Kunden wird vorab vereinbart, welche Merkmale wie gemessen werden: „schnell“ ist keine prüfbare Anforderung, „Antwortzeit unter zwei Sekunden bei 100 gleichzeitigen Nutzern“ schon.
  - Erwartung: Soll-Werte werden vorab messbar festgelegt, sonst lässt sich der Erfolg einer Maßnahme nicht belegen.
  - Rückfrage: Worin unterscheiden sich Produktqualität und Prozessqualität?
- Welche Qualitätssicherungsmaßnahmen haben Sie projektbegleitend durchgeführt, und welche davon haben Fehler tatsächlich aufgedeckt?
  - Erwartung: Konstruktive Maßnahmen beugen Fehlern vor (z. B. Coding-Guidelines, Architekturvorgaben, Vorlagen, klare Anforderungen, Definition of Done), analytische Maßnahmen prüfen vorhandene Ergebnisse (z. B. Tests, Code-Reviews, statische Codeanalyse, Abnahmeprüfungen).
  - Erwartung: Im Softwareprojekt kommen Tests auf mehreren Ebenen (Unit-, Integrations-, System- und Abnahmetests), automatisierte Prüfungen in der Build-Pipeline und Code-Reviews nach dem Vier-Augen-Prinzip zum Einsatz.
  - Erwartung: Tests können das Vorhandensein von Fehlern zeigen, aber nicht deren Abwesenheit beweisen; deshalb werden Testfälle sinnvoll ausgewählt, z. B. Grenzwerte und Fehlerfälle.
  - Erwartung: Konkret wird benannt, welche Maßnahme welchen Fehler aufgedeckt hat, und alle Maßnahmen sind dokumentiert, z. B. in Testprotokollen und Review-Ergebnissen.
  - Rückfrage: Was unterscheidet Verifikation von Validierung?
- Wie sind Sie vorgegangen, als ein Fehler oder Mangel auftrat — haben Sie nur das Symptom beseitigt oder auch die Ursache analysiert? Beschreiben Sie das an einem konkreten Beispiel.
  - Erwartung: Der Fehler wird erfasst und reproduziert, z. B. als Ticket mit Schweregrad, Umgebung und Schritten zur Reproduktion.
  - Erwartung: Die Ursache wird systematisch ermittelt, z. B. mit der 5-Why-Methode bis zu einer beeinflussbaren Ursache, die nicht bei „Mensch hat sich geirrt“ endet, oder mit Ishikawa-Diagramm und Pareto-Analyse.
  - Erwartung: Auf die Korrektur des aktuellen Fehlers folgt eine Korrekturmaßnahme gegen die Ursache, z. B. ein zusätzlicher Test oder ein geänderter Prozess.
  - Erwartung: Die Ergebnisse werden dokumentiert, z. B. als Lessons Learned, geänderte Checkliste oder Retrospektive.
  - Rückfrage: Was ist der Unterschied zwischen Schweregrad und Priorität eines Fehlers?
- Wie haben Sie einen Soll-Ist-Vergleich durchgeführt, und welche Konsequenzen haben Sie aus der Abweichung gezogen?
  - Erwartung: Die Soll-Werte wurden vorab messbar festgelegt und mit den tatsächlich erreichten Ist-Werten verglichen.
  - Erwartung: Typische Größen sind Fehlerdichte, Testabdeckung, Behebungsdauer von Tickets, Verfügbarkeit eines Dienstes sowie die Einhaltung von Terminen oder Kosten.
  - Erwartung: Die Abweichung wird analysiert: Ist sie relevant, woran liegt sie, und welche Konsequenz folgt?
  - Erwartung: Im PDCA-Zyklus ist der Vergleich die Check-Phase; bei Erfolg wird die Maßnahme standardisiert und ausgerollt, bei Misserfolg wird nachgesteuert und der Zyklus neu begonnen.
  - Rückfrage: Was geschieht in den vier Phasen des PDCA-Zyklus?
- Welche Betriebsrichtlinien oder Qualitätssicherungssysteme Ihres Betriebs haben Sie angewendet, und wie haben Sie Ihre Ergebnisse dokumentiert?
  - Erwartung: Ein betriebliches Qualitätssicherungssystem, oft angelehnt an Normen wie die ISO 9001, legt Verantwortlichkeiten, Abläufe, Vorlagen und Prüfpunkte fest.
  - Erwartung: Im Alltag wird es angewendet durch Checklisten, Freigabeprozesse, Ticketsysteme, Vorlagen für Testprotokolle und Dokumentationsstandards.
  - Erwartung: Dokumentiert werden Testpläne, Testprotokolle (Datum, Testfall, erwartetes und tatsächliches Ergebnis, Tester:in), Review-Ergebnisse, Abnahmeprotokolle sowie Änderungs- und Fehlerhistorie.
  - Erwartung: Die Dokumentation macht Ergebnisse nachvollziehbar, dient als Nachweis gegenüber Kunden und ist Grundlage für Verbesserungen.

### 6.4 Wirksamkeit prüfen und nachsteuern

- Woran haben Sie festgestellt, dass die von Ihnen umgesetzten Sicherheits- oder Datenschutzmaßnahmen wirksam sind?
  - Erwartung: Wirksamkeit fragt, ob die Maßnahme das Ziel erreicht, z. B. ob ein Backup tatsächlich vor Datenverlust schützt oder die Zugriffskontrolle unberechtigte Zugriffe verhindert.
  - Erwartung: Effizienz fragt, ob der Aufwand (Kosten, Zeit, Einschränkung der Nutzung) in einem sinnvollen Verhältnis zum Nutzen steht.
  - Erwartung: Geprüft wird mit geeigneten Verfahren wie Audit, Konfigurations- oder Code-Review, Schwachstellenscan, Log-Analyse oder Praxistests der Prozesse (Restore-Test, Notfallübung).
  - Erwartung: Kennzahlen mit festgelegten Zielwerten und ein Soll-Ist-Vergleich machen die Wirkung messbar.
  - Erwartung: Prüfergebnisse werden in einen Maßnahmenplan mit Verantwortlichen und Terminen überführt und ihre Umsetzung wird nachgeprüft (Retest).
  - Rückfrage: Was prüft ein Restore-Test?
- Welche Kennzahlen oder Prüfverfahren (z. B. Test, Schwachstellenscan, Log-Auswertung, Audit) haben Sie dafür genutzt, und warum haben Sie diese ausgewählt?
  - Erwartung: Ein Audit ist eine systematische, dokumentierte Überprüfung anhand von Kriterien; ein Schwachstellenscan durchsucht Systeme automatisiert nach bekannten Schwachstellen; die Log-Analyse sucht in Protokollen nach Auffälligkeiten wie vielen fehlgeschlagenen Anmeldungen.
  - Erwartung: Typische Kennzahlen sind Anzahl und Alter offener kritischer Schwachstellen, die Patch-Zeit, Erkennungs- und Reaktionszeiten, die Klickrate bei Phishing-Simulationen sowie die Restore-Erfolgsquote.
  - Erwartung: Kennzahlen müssen zum Ziel passen: Die Zahl durchgeführter Schulungen beschreibt Aktivität, nicht Wirkung, und Zielwerte sind nötig, damit ein Soll-Ist-Vergleich möglich ist.
  - Erwartung: Scan-Ergebnisse werden kontextbezogen bewertet, z. B. nach Erreichbarkeit des Systems aus dem Internet und der Kritikalität der Daten, und nicht allein nach dem technischen Schweregrad.
  - Rückfrage: Wodurch geht ein Penetrationstest über einen Schwachstellenscan hinaus?
  - Rückfrage: Wofür stehen RTO und RPO?
- Was würden Sie im Rückblick in Ihrem Projekt anders machen, um Sicherheit, Datenschutz und Qualität noch besser zu gewährleisten, und wie würden Sie den Kunden darüber informieren?
  - Erwartung: Prüfergebnisse werden nach Schweregrad, Ausnutzbarkeit und Schadenspotenzial bewertet; je Feststellung wird entschieden, ob sie beseitigt, abgeschwächt, abgesichert oder bewusst akzeptiert wird, mit dokumentiertem Restrisiko.
  - Erwartung: Daraus werden konkrete Verbesserungen abgeleitet, wobei die Prüfung die Check-Phase und die Nachsteuerung die Act-Phase des PDCA-Zyklus ist.
  - Erwartung: Der Kunde erhält eine Management Summary ohne Fachjargon, einen Detailteil für die technischen Ansprechpersonen und einen priorisierten Maßnahmenplan mit Aufwandsschätzung, Verantwortlichen und Terminen sowie Hinweise zu Restrisiken.
  - Erwartung: Der Bericht ist sachlich ohne Schuldzuweisungen, nennt auch, was gut funktioniert, und wird vertraulich nur an den vereinbarten Empfängerkreis übergeben.
  - Rückfrage: Was gehört in eine Management Summary?
  - Rückfrage: Warum ist ein Prüfbericht vertraulich zu behandeln?
