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
- Wie haben Sie die Grundsätze der Datenminimierung und der Zweckbindung in Ihrer Lösung berücksichtigt?
- Mit welchen Daten haben Sie getestet, und wie haben Sie sichergestellt, dass dabei keine echten personenbezogenen Daten ungeschützt verwendet wurden?
- Wie ist die Rollenverteilung zwischen Ihrem Ausbildungsbetrieb und dem Kunden, und welche Vereinbarungen sind dafür nötig?
- Wie haben Sie Ihren Kunden oder Ihre Kollegen zu Datenschutz-Anforderungen beraten, und wann haben Sie bewusst die Datenschutzbeauftragte oder den Datenschutzbeauftragten einbezogen?

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
