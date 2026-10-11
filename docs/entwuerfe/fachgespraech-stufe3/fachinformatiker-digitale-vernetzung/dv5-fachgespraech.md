---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: DV5
fachgebiet_title: "Planen und Umsetzen eines Projektes der digitalen Vernetzung"
thema_code: "DV5-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen, orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit nach § 36 Abs. 3 der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250) — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Die Fragen simulieren typische Rückfragen eines Prüfungsausschusses im Anschluss an die Präsentation einer betrieblichen Projektarbeit im Prüfungsbereich „Planen und Umsetzen eines Projektes der digitalen Vernetzung" (§ 36 FIAusbV). Die Präsentation soll höchstens 15 Minuten dauern, Präsentation und Fachgespräch zusammen höchstens 30 Minuten. Die Fragen sind aus der Ich-Perspektive des Prüflings zu beantworten, beziehen sich beispielhaft auf Projekte der Brevanta IT-Systemhaus GmbH im Bereich Smart-Factory-/IoT-Vernetzung (z. B. Maschinenanbindung über ein IIoT-Gateway, Anlagenvernetzung mit Visualisierung, Energiemonitoring, Sensornetz für Lager und Logistik, Integration einer Altanlage, Fernwartungszugang) und erfordern freies, begründetes Formulieren — nicht das Aufsagen auswendig gelernter Definitionen.

### 12.1 Projektwahl, Bestandsanalyse und Anforderungen

- Warum haben Sie genau dieses Projekt für Ihre betriebliche Projektarbeit gewählt, und wie haben Sie geprüft, dass es in höchstens 40 Stunden machbar ist?
  - Erwartung: Das Projekt hat einen realen Kundenbezug, ist also ein betrieblicher Auftrag statt eines Übungsaufbaus.
  - Erwartung: Es ist eine Vernetzungsaufgabe, bei der etwas Bestehendes mit etwas anderem verbunden wird, und nicht nur die Installation einer einzelnen Software oder die Inbetriebnahme eines einzelnen Geräts.
  - Erwartung: Die Machbarkeit im Stundenbudget wurde geprüft, unter anderem darauf, dass das Projekt samt Dokumentation ohne Abhängigkeit von nicht beeinflussbaren Lieferzeiten umsetzbar ist.
  - Erwartung: Der Eigenanteil (eigene Analyse, eigene Entscheidungen, eigene Konfiguration) ist erkennbar.
  - Erwartung: Ein gutes Projekt ist lieber klein und tief als groß und oberflächlich.
  - Rückfrage: Wie haben Sie mit dem Betrieb geklärt, welche Kundendaten in der Dokumentation verwendet werden dürfen?
- Wie ist Ihr Projektziel formuliert, woran haben Sie am Projektende gemessen, ob es erreicht wurde, und was haben Sie bewusst nicht zum Projekt gemacht?
  - Erwartung: Das Projektziel ist überprüfbar nach der SMART-Regel formuliert: spezifisch, messbar, attraktiv bzw. akzeptiert, realistisch, terminiert.
  - Erwartung: Mit messbaren Kriterien und einem Termin (z. B. eine Aktualisierung im Dashboard von höchstens 5 Sekunden) lässt sich am Projektende eindeutig ableiten, ob das Ziel erreicht wurde.
  - Erwartung: Die Zielerreichung wird über Testfälle im Testprotokoll belegt, z. B. über die Aktualisierungsrate des Dashboards.
  - Erwartung: In der Abgrenzung ist ausdrücklich festgehalten, was nicht zum Projekt gehört.
  - Rückfrage: Woran erkennt man, dass ein Projektziel zu allgemein formuliert ist?
- Wie haben Sie die vorhandene Systemarchitektur über die Prozessebenen (von der Feld- bis zur Unternehmensebene) analysiert, und wie haben Sie Ihre Ergebnisse visualisiert?
  - Erwartung: Die Analyse orientiert sich am Ebenenmodell der Automatisierungspyramide: Feld-, Steuerungs-, Prozessleit-/Visualisierungs-, Betriebsleit- und Unternehmensebene.
  - Erwartung: Für jede beteiligte Ebene werden Komponenten sowie Schnittstellen und Protokolle erfasst (z. B. Feldbus, industrielles Ethernet, OPC UA, MQTT, REST).
  - Erwartung: Zusätzlich werden Netztopologie (Segmentierung, VLANs, Übergänge zwischen Büro- und Produktionsnetz), Datenflüsse mit Richtung und Rate, vorhandene Sicherheitsmaßnahmen und Randbedingungen (Verfügbarkeit, Wartungsfenster, Herstellervorgaben, Garantie) betrachtet.
  - Erwartung: Die Bewertung benennt Stärken und Schwächen des Bestands.
  - Erwartung: Visualisiert wird mit einem Architekturdiagramm aus Ebenen, Komponenten, Verbindungen und Protokollen, ergänzt um einen Netzplan und gegebenenfalls ein Datenflussdiagramm, mit Legende, eindeutiger Beschriftung und Farben nie als einzigem Informationsträger.
  - Rückfrage: Was unterscheidet IT und OT, und was folgt daraus für Ihre Eingriffe in die Anlage?
- Welche Schwächen oder Risiken haben Sie in der Ausgangssituation festgestellt (z. B. fehlende Netzwerktrennung, Altprotokolle, fehlende Dokumentation), und wie sind sie in Ihr Konzept eingeflossen?
  - Erwartung: Die Schwächen werden bei der Bestandsanalyse konkret benannt, z. B. eine Altanlage, die nur seriell kommuniziert, fehlende Datenerfassung oder ein nicht vom Büronetz getrenntes Produktionsnetz.
  - Erwartung: Aus der Analyse und dem Gespräch mit dem Kunden werden prüfbare Anforderungen abgeleitet, funktionale ebenso wie nicht-funktionale.
  - Erwartung: Sicherheitsrelevante Schwächen fließen in das Sicherheitskonzept ein, z. B. als Netzwerksegmentierung mit Firewall bzw. DMZ.
  - Erwartung: Zur Planung gehören Risiken (z. B. Hardware nicht rechtzeitig verfügbar, Wartungsfenster entfällt, schlecht dokumentiertes Protokoll der Altanlage) mit Gegenmaßnahmen sowie ein Puffer.
  - Rückfrage: Welche Randbedingungen der Produktion haben Ihre Maßnahmen eingeschränkt?
- Wie haben Sie die Anforderungen an Schnittstellen, Informationssicherheit und Übertragungssystem mit dem Kunden ermittelt und festgehalten?
  - Erwartung: Die Anforderungen entstehen aus der Analyse und dem Gespräch mit dem Kunden und werden prüfbar im Lastenheft (Sicht des Auftraggebers: was und wofür) bzw. Pflichtenheft (Sicht des Auftragnehmers: wie und womit) festgehalten.
  - Erwartung: Bei den Schnittstellen wird geklärt, welche Systeme in welche Richtung mit welchem Protokoll, Datenformat und welcher Taktung zu verbinden sind und was bei Verbindungsausfall passiert (Pufferung, Wiederanlauf).
  - Erwartung: Bei der Informationssicherheit dienen Vertraulichkeit, Integrität und Verfügbarkeit als Orientierung: Wer darf worauf zugreifen, müssen Daten verschlüsselt werden, muss das Produktionsnetz abgetrennt bleiben, wie wird ein Fernzugang abgesichert?
  - Erwartung: Beim Übertragungssystem sind Reichweite, Datenrate, Latenz und Echtzeitfähigkeit, Störanfälligkeit, Energiebedarf, Installationsaufwand, Kosten und Sicherheit die Auswahlkriterien.
  - Rückfrage: Wie haben Sie den Datenbedarf der Übertragungsstrecke abgeschätzt?
- Wie haben Sie Ihre Arbeitspakete auf die 40 Stunden verteilt, wie sicher waren Ihre Schätzungen, und welche Rolle spielten Puffer und Wartungsfenster?
  - Erwartung: Das Gesamtvorhaben ist in Arbeitspakete zerlegt, jedes mit prüfbarem Ergebnis und Stundenansatz.
  - Erwartung: Die Dokumentation steht im Stundenplan, weil Projektarbeit und Dokumentation zusammen im Stundenbudget liegen.
  - Erwartung: Zur Planung gehören ein Puffer sowie Risiken mit Gegenmaßnahmen, weil Schätzungen unsicher sind.
  - Erwartung: Arbeitsstunden und Kalenderdauer werden unterschieden: Lieferzeiten, Wartungsfenster der Produktion und Freigaben des Kunden verbrauchen Kalenderzeit, aber keine Arbeitsstunden.
  - Erwartung: Gantt-Diagramm und Meilensteine (Prüfpunkte ohne eigene Dauer) zeigen Abhängigkeiten über der Kalenderzeit, im Soll-Ist-Vergleich werden Abweichungen später erklärt.
  - Rückfrage: Was ist der Unterschied zwischen Arbeitsstunden und Kalenderdauer?
- Welche Änderungen gegenüber der genehmigten Projektbeschreibung gab es, und wie sind Sie damit umgegangen?
  - Erwartung: Gearbeitet wird erst nach der Genehmigung der Projektbeschreibung.
  - Erwartung: Weicht das Projekt später wesentlich vom Antrag ab, wird das mit der zuständigen Stelle abgestimmt.
  - Erwartung: Die Abweichung wird in der Dokumentation begründet, denn Widersprüche zur genehmigten Projektbeschreibung ohne Begründung sind ein typischer Dokumentationsfehler.
  - Erwartung: Abweichungen bei Zeit und Aufwand sind erlaubt, müssen aber im Soll-Ist-Vergleich erklärt werden.

### 12.2 Architektur, Schnittstellen, Informationssicherheit, Tests und Wirtschaftlichkeit

- Warum haben Sie sich für diese Architektur bzw. Topologie entschieden, welche Alternativen haben Sie betrachtet, und nach welchen Kriterien haben Sie bewertet?
  - Erwartung: Die Antwort nennt die Entscheidung, die dafür ausschlaggebenden Anforderungen bzw. Kriterien, die Alternativen mit dem Grund ihres schlechteren Abschneidens und die Konsequenz.
  - Erwartung: Wesentliche Entscheidungen werden anhand mehrerer Varianten getroffen, z. B. mit einer Nutzwertanalyse (Kriterien in Prozent gewichtet, Summe 100, Bewertung mit Punkten von 1 bis 5, Nutzwert als Summe aus Gewicht mal Punkten) oder einem einfachen Kriterienvergleich.
  - Erwartung: Das Ergebnis wird mit einer Sensitivitätsbetrachtung (Ändert sich die Reihenfolge bei verschobenen Gewichten?) und einer Plausibilitätsprüfung abgesichert, denn die Zahlen ersetzen nicht das Urteil.
  - Erwartung: Die Entscheidung und die betrachteten Alternativen sind in der Dokumentation begründet, und die Grenzen der eigenen Lösung werden benannt.
  - Rückfrage: Wie haben Sie die Kriterien gewichtet?
- Warum haben Sie dieses Protokoll bzw. diese Schnittstelle gewählt (z. B. MQTT, OPC UA, Modbus), und was wäre geschehen, wenn Sie ein anderes eingesetzt hätten?
  - Erwartung: Die Wahl eines Protokolls muss begründet sein, nach Anforderung, Fähigkeiten der Geräte, Sicherheit, Aufwand und Betrieb, und nicht nach Gewohnheit.
  - Erwartung: Die Protokolle werden treffend charakterisiert: Modbus ist ein einfaches, registerbasiertes Protokoll ohne eingebaute Verschlüsselung oder Authentifizierung, OPC UA ein plattformunabhängiger Standard mit Informationsmodell und integrierten Sicherheitsmechanismen, MQTT ein leichtgewichtiges Publish/Subscribe-Protokoll über einen Broker mit Themen (Topics).
  - Erwartung: Ein Gateway übernimmt häufig die Protokollumsetzung (z. B. Modbus auf MQTT) und entkoppelt dabei die Anlage von der Plattform.
  - Erwartung: Die verworfene Alternative wird mit Grund genannt, z. B. OPC UA anlagenseitig nur, wenn die Steuerung es unterstützt, während eine Altsteuerung nur Modbus RTU spricht.
  - Erwartung: Die Antwort zeigt die Grenzen der eigenen Lösung, z. B. dass bei einer neuen Anlage mit OPC-UA-Server neu bewertet würde.
  - Rückfrage: Welche Dienstgüten kennt MQTT?
  - Rückfrage: Wie sichern Sie ein von sich aus ungeschütztes Protokoll wie das klassische Modbus ab?
- Wie haben Sie die Schnittstellen konfiguriert und in Betrieb genommen, und wie haben Sie sichergestellt, dass die Anlage dabei unverändert und rückwirkungsfrei bleibt?
  - Erwartung: Beim Einbinden gilt: erst verstehen, dann ändern; geprüft werden die Voraussetzungen (Ports, Adressen, Spannungsversorgung, Platz im Schaltschrank).
  - Erwartung: Komponenten werden in einer Testumgebung vorkonfiguriert und im abgestimmten Wartungsfenster eingebunden.
  - Erwartung: Die Inbetriebnahme folgt einem geordneten Ablauf: Konfiguration sichern und Rückfallstand festlegen (Rollback), Schnittstelle in der Testumgebung oder im Probebetrieb prüfen, Wartungsfenster abstimmen, Funktionsprüfung, Inbetriebnahmeprotokoll und Übergabe.
  - Erwartung: Die Rückwirkungsfreiheit auf die Anlage wird geprüft und durch die Absicherung der Schnittstelle gestützt, z. B. nur Lesezugriff ohne Schreiben.
  - Erwartung: Arbeitsergebnisse sind gesicherte und versionierte Konfigurationsstände, eine Schnittstellenliste und ein Adress- und Zugangskonzept ohne Klartext-Passwörter.
  - Rückfrage: Was hält das Inbetriebnahmeprotokoll fest?
- Wie haben Sie das Übertragungssystem ausgewählt (Kabel oder Funk, Reichweite, Datenrate, Latenz, Störanfälligkeit) und in die Gesamtinfrastruktur integriert?
  - Erwartung: Ausgewählt wird anhand von Kriterien wie Reichweite, Datenrate, Latenz, Störanfälligkeit (elektromagnetische Verträglichkeit), Energiebedarf, Installationsaufwand, Kosten und Sicherheit.
  - Erwartung: Mehrere Varianten (z. B. industrielles Ethernet, Feldbus, WLAN, Mobilfunk, Low-Power-Funk wie LoRaWAN) werden mit einer Nutzwertanalyse verglichen, wobei die Gewichte zum Anwendungsfall passen, etwa Reichweite und Energiebedarf bei einem batteriebetriebenen Sensornetz im Lager.
  - Erwartung: Der Datenbedarf wird nachgerechnet (Maschinen mal Werte pro Sekunde mal Bytes je Wert) und mit der Kapazität der Strecke verglichen.
  - Erwartung: Nach der Auswahl folgen die Konfiguration (Frequenzen bzw. Kanäle, Verschlüsselung, Adressen, Funkabdeckung messen) und die Integration in die Gesamtinfrastruktur (Anbindung an Netz und Plattform, Überwachung, Dokumentation).
  - Rückfrage: Warum kann eine schlecht bewertete Datenrate trotzdem zur Wahl von LoRaWAN führen?
- Wie haben Sie die Informationssicherheit im Projekt berücksichtigt (Segmentierung, Zugriffsrechte, Verschlüsselung, Fernwartung), und welche Restrisiken bleiben?
  - Erwartung: Maßnahmen werden an den Schutzzielen Vertraulichkeit, Integrität und Verfügbarkeit ausgerichtet, geplant, umgesetzt und begründet.
  - Erwartung: Zur Netzwerksegmentierung gehört, dass das Produktionsnetz vom Büronetz getrennt bleibt, Übergänge über Firewall bzw. DMZ laufen und vom Gateway nach außen nur die benötigten Verbindungen gehen.
  - Erwartung: Das Zugriffskonzept folgt dem Prinzip der geringsten Rechte mit getrennten Konten für Personen und Geräte, Standardpasswörter werden vor der Inbetriebnahme geändert, nicht benötigte Dienste und Ports werden abgeschaltet.
  - Erwartung: Wo ein Protokoll von sich aus ungeschützt ist, wird die Absicherung durch Segmentierung und Gateway erreicht, zur Plattform wird TLS mit Zertifikaten genutzt.
  - Erwartung: Fernwartung läuft nur über VPN, mit Mehrfaktor-Anmeldung, zeitlich befristet freigegeben, protokolliert und mit dem Kunden abgestimmt.
  - Rückfrage: Welche Restrisiken bleiben, und wie dokumentieren Sie sie?
  - Rückfrage: Wie dokumentieren Sie Sicherheitsmaßnahmen, ohne geheime Werte preiszugeben?
- Welche Tests haben Sie durchgeführt (Funktion, Fehlerfälle wie Verbindungsausfall, Last, Sicherheit), wie haben Sie die Testfälle abgeleitet, und was war das Ergebnis?
  - Erwartung: Das Testkonzept umfasst Funktionsprüfung (Stimmt der Wert im Dashboard mit der Anzeige an der Maschine überein?) und Schnittstellentests.
  - Erwartung: Fehlerfälle werden getestet, z. B. Verbindungsausfall, Neustart des Gateways und ungültige Werte.
  - Erwartung: Hinzu kommen Last- und Leistungstests, Sicherheitstests (z. B. Zugriff aus dem falschen Netz, Standardkonto) und die Prüfung der Rückwirkungsfreiheit auf die Anlage.
  - Erwartung: Testfälle werden sinnvoll ausgewählt (z. B. Grenzwerte und Fehlerfälle) und im Testprotokoll mit Testfall, erwartetem und tatsächlichem Ergebnis festgehalten.
  - Erwartung: Auch nicht bestandene Tests und ihre Behebung werden dokumentiert, z. B. eine Aktualisierungsrate, die zunächst 8 Sekunden betrug und nach der Korrektur 3 Sekunden.
  - Rückfrage: Warum dokumentieren Sie auch nicht bestandene Tests?
- Wie beschreiben Sie die Gesamtzusammenhänge Ihrer Lösung in der heterogenen Landschaft des Kunden, und welche Abhängigkeiten und Medienbrüche bleiben bestehen?
  - Erwartung: Eine heterogene Landschaft besteht aus Systemen unterschiedlicher Hersteller, Generationen und Protokolle, von der alten Steuerung bis zur Cloud-Plattform.
  - Erwartung: Beschrieben werden der Systemkontext (welche Systeme beteiligt sind) und die Datenflüsse (woher, wohin, wie oft, in welchem Format).
  - Erwartung: Abhängigkeiten werden benannt, z. B. was ausfällt, wenn das Gateway ausfällt.
  - Erwartung: Medienbrüche, also Stellen mit Übertragung von Hand, werden benannt.
  - Erwartung: Schnittstellen zu Nachbarsystemen (MES, ERP) und Auswirkungen auf andere Systeme gehören dazu, ebenso, was bewusst nicht Teil des Projekts ist.
  - Rückfrage: Wie machen Sie den Weg eines Messwerts durch Ihre Landschaft sichtbar?
- Wie haben Sie die Wirtschaftlichkeit berechnet, welche Annahmen stecken in der Rechnung, und wie belastbar sind sie?
  - Erwartung: Erfasst werden einmalige Kosten (z. B. Gateway, Switch, Montagematerial, Lizenz, Personalkosten aus Stunden mal Stundensatz) und laufende Kosten (z. B. Wartung und Support).
  - Erwartung: Der Nutzen wird quantifizierbar bewertet (z. B. weniger unentdeckter Stillstand, Stunden mal Stundensatz) und um qualitativen Nutzen ergänzt (bessere Transparenz, schnellere Fehlersuche, Datenbasis für Optimierung).
  - Erwartung: Nettonutzen pro Jahr ist der Nutzen abzüglich der laufenden Kosten, die Amortisationsdauer ergibt sich aus den einmaligen Kosten geteilt durch den Nettonutzen.
  - Erwartung: Die Annahmen (z. B. Stundensatz, Stillstandskosten) werden offen gelegt, ihre Belastbarkeit muss erkennbar sein.
  - Erwartung: Stundensätze und Kosten des Betriebs sind interne Angaben, in der Dokumentation kann mit abgestimmten oder anonymisierten Kalkulationssätzen gerechnet werden.
  - Rückfrage: Wie berechnen Sie die Amortisationsdauer?

### 12.3 Soll-Ist-Vergleich, Reflexion und Präsentation

- Wo weicht das Ergebnis von Ihrer Planung ab (Zeit, Kosten, Umfang), und wie erklären Sie diese Abweichungen?
  - Erwartung: Der Soll-Ist-Vergleich stellt Plan und Realität gegenüber, z. B. je Arbeitspaket Soll- und Iststunden mit der Abweichung.
  - Erwartung: Abweichungen sind erlaubt, müssen aber erklärt werden.
  - Erwartung: Als mögliche Ursachen kommen z. B. Unterschätzung, unerwartete technische Probleme, Änderungswünsche und mangelnde Vorgaben in Betracht.
  - Erwartung: Aus den Abweichungen werden Maßnahmen für künftige Planungen abgeleitet, z. B. bessere Schätzvorlagen, früheres Ansprechen von Änderungen und mehr Puffer.
  - Rückfrage: Warum kann ein Projekt in drei Kalenderwochen laufen, obwohl nur 40 Arbeitsstunden anfallen?
- Welches Problem hat Sie im Projekt am meisten Zeit gekostet, wie haben Sie die Ursache eingegrenzt, und warum haben Sie sich für Ihre Lösung entschieden?
  - Erwartung: Das Problem wird beschrieben als Abweichung zwischen Ist-Zustand und Soll-Zustand.
  - Erwartung: Die Ursache wird strukturiert eingegrenzt, z. B. indem der Datenweg Schritt für Schritt geprüft wird, statt wahllos Komponenten zu tauschen, und mit Ishikawa-Diagramm oder 5-Why-Methode bis zu einer beeinflussbaren Grundursache.
  - Erwartung: Lösungsalternativen werden anhand von Kriterien (Kosten, Zeit, Risiko, Kundennutzen) beurteilt, z. B. mit einer einfachen Nutzwertanalyse.
  - Erwartung: Die Entscheidung wird begründet mit Kriterien und verworfenen Alternativen und anschließend umgesetzt und dokumentiert.
  - Rückfrage: Haben Sie nur das Symptom beseitigt oder auch die Ursache?
- Nennen Sie drei Aspekte Ihrer Lösung, die sich ändern oder neu bewertet werden müssten, wenn statt einer Anlage zehn oder statt 20 Maschinen 200 angebunden würden oder die Verbindung zur Plattform dauerhaft instabil wäre, und begründen Sie einen davon.
  - Erwartung: Der Datenbedarf wird neu berechnet (Maschinen mal Werte pro Sekunde mal Bytes je Wert) und mit der Kapazität des Übertragungssystems verglichen, was vor allem bei einer schmalbandigen Funkstrecke relevant ist.
  - Erwartung: Die Wahl von Protokoll, Topologie und Übertragungssystem wird anhand der geänderten Anforderungen (Datenrate, Latenz, Reichweite) neu bewertet.
  - Erwartung: Bei einer instabilen Verbindung sind Pufferung der Daten und Wiederanlauf nach einem Verbindungsausfall nötig, die als Fehlerfall getestet werden (Daten gepuffert, keine Lücke).
  - Erwartung: Last- und Leistungstests prüfen, ob die Plattform die höhere Datenrate aushält.
  - Rückfrage: Was fällt in Ihrer Landschaft aus, wenn das Gateway ausfällt?
- Wie haben Sie die Übergabe und Einweisung beim Kunden vorbereitet, und was haben Sie im Inbetriebnahmeprotokoll festgehalten?
  - Erwartung: Die Einweisung ist vorbereitet nach Zielgruppe (Vorkenntnisse, Rollen), Lernzielen, Inhalten, Methode, Zeitrahmen und Räumen bzw. Technik.
  - Erwartung: Geeignete Methoden sind Live-Demonstration, begleitetes Ausprobieren an realen Aufgaben und Kurzanleitungen; das Verständnis wird geprüft, z. B. durch eine kleine Aufgabe, die die Anwender:innen selbst ausführen.
  - Erwartung: Zur Übergabe gehören die Dokumentationen (Benutzer- und Systemdokumentation, Testprotokolle, Lizenz- und Zugangsinformationen sicher übergeben).
  - Erwartung: Das Inbetriebnahmeprotokoll hält fest, was wann von wem in Betrieb genommen wurde, welche Version und Konfiguration gilt, welche Tests bestanden wurden, welche Restpunkte offen sind und wer die Übergabe bestätigt.
  - Rückfrage: Woran haben Sie erkannt, dass die Anwender:innen die Lösung selbstständig nutzen können?
- Welche Teile des Projekts haben Sie selbst umgesetzt, und welche Unterstützung haben Sie erhalten?
  - Erwartung: Die Antwort trennt klar, was selbst gemacht wurde und wo Unterstützung bestand (z. B. Zertifikatsvergabe über die Administration, Konfiguration des Gateways selbst).
  - Erwartung: Der Eigenanteil zeigt sich in der eigenen Analyse, den eigenen Entscheidungen und der eigenen Konfiguration.
  - Erwartung: Die Formulierung „ich habe“ statt „man hat“ macht die Eigenleistung erkennbar, unklare Eigenleistung ist ein typischer Dokumentationsfehler.
  - Erwartung: Das Fachgespräch prüft, ob der Prüfling das Projekt verstanden und selbst getragen hat.
  - Rückfrage: Woran erkennt der Prüfungsausschuss in Ihrer Dokumentation Ihre Eigenleistung?
- Was würden Sie heute anders machen, und wie haben Sie Ihre Präsentation auf Ihre Zuhörenden zugeschnitten (welche Inhalte haben Sie bewusst weggelassen)?
  - Erwartung: Die Antwort benennt konkretes Verbesserungspotenzial und Schwächen und zeigt die Grenzen der eigenen Lösung, statt auszuweichen.
  - Erwartung: Die Präsentation erzählt eine Geschichte mit Entscheidungen (Problem, Befund, Entscheidung mit Begründung, Ergebnis) und wiederholt nicht die Dokumentation.
  - Erwartung: Inhalt, Sprache und Tiefe sind auf den fachkundigen Prüfungsausschuss abgestimmt, der Kunden, Anlage und Netz nicht kennt: projektspezifische Begriffe werden kurz erklärt, Abkürzungen bei der ersten Verwendung aufgelöst.
  - Erwartung: Bewusst weggelassen werden Details wie Konfigurationsdateien (nur kurze Ausschnitte) und vertrauliche Kundendaten; pro Folie gibt es eine Botschaft mit wenigen Stichworten.
  - Rückfrage: Wie haben Sie Ihre Architektur auf den Folien visualisiert?
  - Rückfrage: Welchen Plan B hatten Sie für eine Live-Demonstration?
