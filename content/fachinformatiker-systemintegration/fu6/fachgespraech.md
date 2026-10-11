---
kurs_slug: fachinformatiker-systemintegration
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
- Wie haben Sie die Grundsätze der Datenminimierung und der Zweckbindung in Ihrer Lösung berücksichtigt?
- Mit welchen Daten haben Sie getestet, und wie haben Sie sichergestellt, dass dabei keine echten personenbezogenen Daten ungeschützt verwendet wurden?
- Wie ist die Rollenverteilung zwischen Ihrem Ausbildungsbetrieb und dem Kunden, und welche Vereinbarungen sind dafür nötig?
- Wie haben Sie Ihre Kundschaft oder Ihre Kolleg:innen zu Datenschutz-Anforderungen beraten, und wann haben Sie bewusst die Datenschutzbeauftragte oder den Datenschutzbeauftragten einbezogen?

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
