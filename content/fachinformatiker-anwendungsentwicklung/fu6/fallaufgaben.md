---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: FU6
fachgebiet_title: "IT-Sicherheit, Datenschutz und Qualitätssicherung"
thema_code: "FU6-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele zur Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 5 und 6 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus FU6 (6.1–6.5) zu einer zusammenhängenden betrieblichen Situation rund um die Brevanta IT-Systemhaus GmbH, wie sie in der schriftlichen Abschlussprüfung typisch ist. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-FU6-01 · Fallaufgabe

**Themenbezug:** 6.1 (Schutzziele, Bedrohungen, Maßnahmen) + 6.2 (Datenschutz, Kundenberatung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH entwickelt für den „Praxisverbund Rhein-Nahe", einen Zusammenschluss von zehn Arztpraxen, ein webbasiertes Portal zur Terminbuchung und zum Austausch von Befundmitteilungen. Projektleiter Tarek Osmani lässt die Entwicklerin Selin Yücel, eine Umschülerin im zweiten Ausbildungsjahr, das Datenmodell und die Anmeldung der Portalnutzer:innen umsetzen. Im Entwicklungsteam kursiert die Idee, zur schnelleren Fehlersuche regelmäßig einen Auszug der Produktivdatenbank mit echten Patientendaten in die Testumgebung zu kopieren. Das Portal soll aus dem Internet erreichbar sein und von Praxispersonal und Patient:innen genutzt werden. Der Kunde bittet Brevanta um eine Einschätzung, welche Sicherheits- und Datenschutzanforderungen zu beachten sind. Zusätzlich übernimmt Brevanta den Betrieb des Portals im Rechenzentrum als Managed Service.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie das Vorhaben anhand der drei klassischen Schutzziele: Nennen Sie je Schutzziel eine konkrete Bedrohung für das Portal und das betroffene Schadenspotenzial für den Kunden.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Beurteilen Sie, ob die Idee, Auszüge der Produktivdatenbank in die Testumgebung zu kopieren, zulässig und sinnvoll ist. Berücksichtigen Sie dabei mindestens zwei Datenschutzgrundsätze und nennen Sie eine bessere Alternative.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Leiten Sie je zwei technische und zwei organisatorische Maßnahmen für Anmeldung, Datenspeicherung und Betrieb des Portals ab und begründen Sie, welches Risiko jede Maßnahme verringert.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Kernpunkte einer Beratung für den Kunden zu den Datenschutz-Anforderungen. Gehen Sie dabei auf die Rollenverteilung (Verantwortlicher/Auftragsverarbeiter), notwendige Verträge, die besondere Sensibilität der Daten und auf Betroffenenrechte ein, und benennen Sie, wo Sie an die zuständige Datenschutzbeauftragte verweisen würden.

**Musterlösungshinweise:** Teilaufgabe 1: Vertraulichkeit z. B. Zugriff Unbefugter auf Befunddaten durch gestohlene Zugangsdaten oder Injection (Folge: Verletzung der Privatsphäre, Meldepflichten, Vertrauensverlust); Integrität z. B. Manipulation von Terminen oder Befundmitteilungen; Verfügbarkeit z. B. Ransomware oder DDoS auf das Portal (Folge: Praxisbetrieb gestört).
Teilaufgabe 2: Echtdaten in Testsystemen widersprechen meist der Zweckbindung und Datenminimierung und erhöhen das Risiko einer Datenpanne, zumal Gesundheitsdaten besonders geschützt sind; Alternative: synthetische oder wirksam anonymisierte Testdaten.
Teilaufgabe 3: Technisch z. B. TLS, gesalzene Passwort-Hashes, Mehrfaktor-Authentifizierung für Praxispersonal, Rollen- und Rechtekonzept, Verschlüsselung der Datenbank, Protokollierung; organisatorisch z. B. Berechtigungs- und Löschkonzept, Schulung, Notfall- und Meldeprozess, Vier-Augen-Prinzip bei Admin-Zugriffen, jeweils mit Zuordnung zum verringerten Risiko.
Teilaufgabe 4: Praxisverbund als Verantwortlicher, Brevanta als Auftragsverarbeiter, Auftragsverarbeitungsvertrag, besondere Kategorien (Gesundheitsdaten) mit erhöhten Anforderungen, Unterstützung bei Betroffenenrechten (Auskunft, Löschung, Export) durch passende Funktionen, Privacy by Design/Default, Verweis bei Rechtsgrundlagen und ggf. Datenschutz-Folgenabschätzung an die Datenschutzbeauftragten; Dokumentation der Absprachen.

---

#### F-FU6-02 · Fallaufgabe

**Themenbezug:** 6.3 (Qualitätssicherung, Ursachenanalyse, PDCA, Soll-Ist-Vergleich)

**Ausgangssituation:** Das Datenanalyse-Team von Brevanta betreibt für die Kornmüller Backwaren KG ein Dashboard, das täglich Absatzzahlen aus den Kassensystemen von 40 Filialen aufbereitet. In den letzten sechs Wochen haben sich Beschwerden gehäuft: An mehreren Tagen waren Zahlen unvollständig oder doppelt gezählt. Die vereinbarte Soll-Vorgabe lautet: Die Tagesauswertung muss bis 06:00 Uhr vollständig und fehlerfrei vorliegen, Zielwert mindestens 90 % der Tage pro Monat. Im letzten Monat wurde dieser Wert an nur 21 von 30 Tagen erreicht. Ein Blick in das Ticketsystem zeigt: Die meisten Fehler entstanden, wenn eine Filiale ihre Daten verspätet geliefert hat und das Ladeskript trotzdem lief. Eine Checkliste für Änderungen am Ladeskript existiert nicht, Änderungen werden ohne Review direkt eingespielt. Das Team steht unter Zeitdruck, weil gleichzeitig ein neues Kundenprojekt startet.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Führen Sie einen Soll-Ist-Vergleich für den letzten Monat durch (Prozentwerte angeben) und beurteilen Sie die Abweichung.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie die Ursachen mit einer geeigneten Methode: Skizzieren Sie eine 5-Why-Kette ausgehend vom Symptom „Zahlen sind unvollständig" bis zu einer beeinflussbaren Ursache.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen Verbesserungsprozess nach dem PDCA-Zyklus mit konkreten Maßnahmen und messbarem Erfolgskriterium je Phase.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, welche Maßnahmen konstruktiv und welche analytisch sind, und begründen Sie, welche Dokumentation (z. B. Protokolle, Checklisten, Lessons Learned) für den Kunden und das Team nötig ist.

**Musterlösungshinweise:** Teilaufgabe 1: Ist-Wert 21 von 30 Tagen = 70 %; Soll mindestens 90 % bzw. 27 von 30 Tagen; Abweichung 20 Prozentpunkte bzw. 6 Tage — deutlich zu hoch, daher Handlungsbedarf und Information des Kunden.
Teilaufgabe 2: Symptom: unvollständige Zahlen; Warum? Daten einzelner Filialen fehlten beim Laden; Warum? Das Ladeskript lief trotz verspäteter Lieferung; Warum? Es prüft Vollständigkeit/Eingangszeit nicht; Warum? Anforderung wurde bei der Skript-Änderung nicht berücksichtigt; Warum? Keine Checkliste/kein Review-Schritt für Änderungen — beeinflussbare Ursache.
Teilaufgabe 3: Plan: Ursachen aus Analyse (Pareto/Ishikawa), Ziel mindestens 90 %, Maßnahmen Eingangsprüfung im Skript plus Review-Pflicht; Do: Pilot über zwei Wochen mit Checkliste und Vollständigkeitsprüfung; Check: Soll-Ist-Vergleich der Erfolgsquote; Act: bei Erfolg standardisieren und in Qualitätsrichtlinie aufnehmen, sonst nachsteuern.
Teilaufgabe 4: Konstruktiv: Checkliste, Review-Pflicht, Vorgaben; analytisch: Testläufe, Vollständigkeitsprüfung mit Alarm, Monitoring; Dokumentation: Änderungsprotokoll, Testprotokoll, Lessons Learned und Bericht an den Kunden mit Ursache, Maßnahmen und Zielwerten.

---

#### F-FU6-03 · Fallaufgabe

**Themenbezug:** 6.1 (Bedrohungsszenarien) + 6.4 (Wirksamkeit prüfen, Berichte an Kunden)

**Ausgangssituation:** Die Hartmann Maschinenbau GmbH, ein Industriekunde von Brevanta, betreibt eine vernetzte Fertigungslinie. Die Smart-Factory-Gruppe von Brevanta hat vor drei Monaten einen Fernwartungszugang für die Steuerung eingerichtet: VPN, Anmeldung mit Benutzername und Passwort, getrennte Netzsegmente für Büro-IT und Produktion. Nun soll die Wirksamkeit der umgesetzten Maßnahmen geprüft werden. Die Auswertung der Protokolle der letzten vier Wochen zeigt: nachts wiederholt tausende fehlgeschlagene Anmeldeversuche von wenigen externen IP-Adressen, zwei erfolgreiche Anmeldungen außerhalb der Wartungsfenster mit dem Konto eines früheren Servicetechnikers, und fünf Steuerungs-PCs mit seit mehr als 90 Tagen nicht eingespielten Sicherheitsupdates. Das Backup der Prozessdaten wurde laut Plan täglich erstellt, ein Restore-Test wurde nie durchgeführt. Der Kunde bittet um einen Prüfbericht und einen Vorschlag für das weitere Vorgehen. Die Geschäftsführung des Kunden interessiert sich vor allem für Kosten und Produktionssicherheit.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beschreiben Sie anhand der Protokollauffälligkeiten ein konkretes Bedrohungsszenario und beurteilen Sie das Schadenspotenzial für den Kunden unter wirtschaftlichen und technischen Kriterien.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Bewerten Sie die Wirksamkeit der bisherigen Maßnahmen (VPN mit Passwort, Netzsegmentierung, Backup) und benennen Sie die jeweils erkennbaren Schwächen.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Leiten Sie aus den Feststellungen priorisierte Maßnahmen ab, legen Sie je Maßnahme eine geeignete Kennzahl samt Zielwert fest und schlagen Sie vor, wie die Wirksamkeit später nachgeprüft wird.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie den Aufbau des Prüfberichts für die Geschäftsführung und die IT-Verantwortlichen des Kunden und erläutern Sie, wie Sie Kosten und Nutzen der empfohlenen Maßnahmen darstellen.

**Musterlösungshinweise:** Teilaufgabe 1: Szenario z. B. Brute-Force bzw. Zugriff über ein nicht deaktiviertes Konto eines ehemaligen Technikers auf die Fernwartung, anschließend Manipulation oder Stillstand der Fertigungslinie; Schadenspotenzial: Produktionsausfall, Vertragsstrafen, Gefahr für Maschinen und Personen, Wiederherstellungsaufwand, Reputationsschaden; technisch: erreichbarer Zugang, veraltete Systeme.
Teilaufgabe 2: Passwort-VPN allein schwach (kein zweiter Faktor, Konten ehemaliger Beschäftigter nicht deaktiviert); Segmentierung grundsätzlich sinnvoll, aber durch Fernwartungszugang umgehbar und mit veralteten Systemen geschwächt; Backup nicht nachweislich wirksam, da kein Restore-Test; zudem fehlt Patch-Management.
Teilaufgabe 3: Priorität: Konten deaktivieren/Berechtigungs-Review, Mehrfaktor-Authentifizierung, Ratenbegrenzung/Sperren, Patches nach Plan, Restore-Test; Kennzahlen z. B. Anzahl inaktiver, aber aktiver Konten (Ziel 0), Patch-Zeit kritischer Updates (Ziel z. B. 14 Tage), Restore-Erfolgsquote und Wiederanlaufzeit gegenüber RTO, Nachprüfung durch Retest, Log-Auswertung und Audit.
Teilaufgabe 4: Management Summary, Detailbefunde mit Schweregrad und Nachweisen (ohne Klartext-Zugangsdaten), priorisierter Maßnahmenplan mit Aufwand, Terminen und Verantwortlichen, Hinweise zu Restrisiken; Kosten-Nutzen: Maßnahmenkosten gegenüber erwartetem Schaden und Produktionsausfallkosten, Hinweis auf nicht-monetäre Effekte und kostengünstige Sofortmaßnahmen.

---

#### F-FU6-04 · Fallaufgabe

**Themenbezug:** 6.5 (Zertifikate und PKI: Prüfung, Fehlerbilder, Beantragung, Erneuerung, Sperrung, interne CA, Schlüsselverwaltung) + 6.1 (Man-in-the-Middle, Verschlüsselung und Authentifizierung)

**Ausgangssituation:** Die Feldhaus Armaturen GmbH (Beispielname), ein Hersteller mit Webshop, Kundenportal und vernetzter Fertigung, hat den Betrieb ihrer Server zum 01.10.2026 an den Bereich Managed Services der Brevanta IT-Systemhaus GmbH übergeben. Am Montag, dem 12.10.2026, meldet der Kunde mehrere Zertifikatswarnungen. Die Umschülerin Merve Demir erstellt mit ihrem Betreuer Jonas Albrecht eine Bestandsaufnahme (Stichtag 12.10.2026; alle Werte sind Beispielwerte):

```
Nr | Dienst                    | Namen im Zertifikat (SAN)           | Aussteller                          | gültig bis | Meldung
1  | Webshop                   | shop.feldhaus-armaturen.example     | öffentliche Zertifizierungsstelle   | 11.10.2026 | Browser der Kund:innen: „Zertifikat abgelaufen“
2  | Kundenportal              | portal.feldhaus-armaturen.example   | öffentliche Zertifizierungsstelle   | 05.11.2026 | Partnersystem ruft die Schnittstelle desselben Servers seit seiner Umstellung am 08.10.2026 unter api.feldhaus-armaturen.example auf: „Name passt nicht zum Zertifikat“
3  | Intranet                  | intranet.feldhaus-armaturen.example | selbstsigniert                      | 31.12.2027 | „Unbekannte Zertifizierungsstelle“; die Beschäftigten bestätigen die Warnung täglich
4  | MQTT-Broker der Fertigung | broker.feldhaus-armaturen.example   | interne Zwischen-CA des Kunden      | 20.11.2026 | keine; die Sensor-Gateways melden sich mit eigenen Client-Zertifikaten an (mTLS)
```

Außerdem zeigt der Wartungs-PC der Fertigung seit einem Batteriewechsel auf der Hauptplatine bei allen HTTPS-Seiten „Zertifikat noch nicht gültig“; seine Systemuhr steht auf dem 01.01.2020. Eine Überwachung der Zertifikate gibt es bisher nicht. Die interne CA des Kunden wird bisher nur für die Fertigung genutzt; ihr Root-Zertifikat ist nur auf den Fertigungsrechnern als vertrauenswürdig hinterlegt, nicht auf den Büro-PCs. Für den Betrieb gelten künftig die Brevanta-Vorgaben: Überwachung aller Zertifikate mit Warnung 30 Tage vor Ablauf; neue öffentliche Serverzertifikate werden automatisiert mit 90 Tagen Laufzeit ausgestellt und nach 60 Tagen erneuert. Rechenregel: Ablaufdatum = Ausstellungsdatum + Laufzeit in Tagen; Warnbeginn = Ablaufdatum − 30 Tage. Zusätzlich bittet die Webagentur des Kunden darum, ihr den privaten Schlüssel des Webshops per E-Mail zu schicken, damit sie das neue Zertifikat auch auf ihrem Testsystem einspielen kann.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie die Meldungen zu den Zertifikaten Nr. 1 bis 3 und zum Wartungs-PC: Nennen Sie jeweils die Ursache und eine geeignete Abhilfe, und legen Sie begründet fest, welche Meldung zuerst bearbeitet wird.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie für die Zertifikate Nr. 2 und Nr. 4 den Warnbeginn und die verbleibenden Tage vom Stichtag bis zum Ablauf, und geben Sie an, welches der beiden am Stichtag bereits im Warnzeitraum liegt. Berechnen Sie außerdem für ein neues Webshop-Zertifikat, das am 12.10.2026 ausgestellt wird, das Ablaufdatum und das Datum der automatischen Erneuerung.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Beschreiben Sie den Ablauf von der Schlüsselerzeugung bis zur Prüfung nach der Installation für ein neues Zertifikat des Kundenportals, das auch für die Partner-Schnittstelle gelten soll, und beurteilen Sie den Wunsch der Webagentur nach dem privaten Schlüssel des Webshops.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie für das Intranet die drei Möglichkeiten selbstsigniertes Zertifikat, Zertifikat der internen CA und Zertifikat einer öffentlichen Zertifizierungsstelle, und empfehlen Sie eine Lösung einschließlich der Schritte, die dafür beim Kunden nötig sind.

**Musterlösungshinweise:** Teilaufgabe 1 (Punkteraster: je Meldung Ursache und Abhilfe 1 Punkt, begründete Reihenfolge 1 Punkt): Nr. 1: Das Zertifikat ist seit Ablauf des 11.10.2026 ungültig, die Erneuerung wurde versäumt und nicht überwacht; Abhilfe: sofort ein neues Zertifikat mit neuem Schlüsselpaar beschaffen, mit Zwischenzertifikat installieren, prüfen, automatische Erneuerung und Überwachung einrichten. Nr. 2: Seit der Umstellung des Partners am 08.10.2026 wird ein Name aufgerufen, der nicht im Zertifikat steht: api.feldhaus-armaturen.example fehlt in den SAN; Abhilfe: neues Zertifikat mit beiden Namen in den SAN (oder ein eigenes Zertifikat für die Schnittstelle), den Partner nicht auffordern, die Prüfung abzuschalten. Nr. 3: selbstsigniert, auf den Clients ist kein passender Vertrauensanker hinterlegt; das tägliche Wegklicken gewöhnt die Beschäftigten an Warnungen, sodass ein Man-in-the-Middle-Angriff unbemerkt bliebe; Abhilfe: Zertifikat der internen CA und Verteilung des Root-Zertifikats (siehe Teilaufgabe 4). Wartungs-PC: Die Systemuhr steht vor dem „gültig ab“ aller aktuellen Zertifikate, deshalb erscheinen sie als noch nicht gültig; die Zertifikate sind in Ordnung; Abhilfe: Uhrzeit korrigieren, Zeitsynchronisation (NTP) einrichten, Batterie und BIOS-Zeit prüfen. Reihenfolge: zuerst Nr. 1, weil der öffentliche Webshop für alle Kund:innen gestört ist (Umsatz, Vertrauen, Gewöhnung der Kund:innen an Warnungen); danach Nr. 2 (gestörte Partner-Schnittstelle, zudem läuft das Zertifikat in 24 Tagen ab); der Wartungs-PC lässt sich mit wenig Aufwand nebenbei beheben; Nr. 3 ist ein ernstes Risiko, aber planbar. Jede schlüssig begründete andere Reihenfolge ist anzuerkennen.
Teilaufgabe 2 (Punkteraster: Warnbeginn je Zertifikat 1 Punkt, Resttage und Warnzeitraum 1 Punkt, Ablaufdatum und Erneuerungsdatum des neuen Webshop-Zertifikats je 1 Punkt): Nr. 2: Warnbeginn 05.11.2026 − 30 Tage = 06.10.2026; vom 12.10.2026 bis zum 05.11.2026 bleiben 24 Tage; das Zertifikat liegt seit dem 06.10.2026 im Warnzeitraum und muss jetzt erneuert werden. Nr. 4: Warnbeginn 20.11.2026 − 30 Tage = 21.10.2026; es bleiben 39 Tage; am Stichtag noch nicht im Warnzeitraum, die Erneuerung bei der internen CA sollte trotzdem jetzt eingeplant werden, weil sonst die Gateways die Verbindung zum Broker verlieren. Neues Webshop-Zertifikat: Ablaufdatum 12.10.2026 + 90 Tage = 10.01.2027; automatische Erneuerung nach 60 Tagen am 11.12.2026 (das ist zugleich der Warnbeginn 30 Tage vor dem Ablauf; ist das Zertifikat an diesem Tag nicht erneuert, ist die Automatik gescheitert). Zum Vergleich: Für Nr. 1 hätte eine Überwachung bereits ab dem 11.09.2026 gewarnt.
Teilaufgabe 3 (Punkteraster: Ablauf 3 Punkte für mindestens fünf richtige Schritte in schlüssiger Reihenfolge, Beurteilung des Agenturwunsches 2 Punkte): Schlüsselpaar auf dem Portalserver erzeugen (Schlüssellänge nach aktueller Vorgabe, z. B. RSA mit 3.072 Bit oder ein Verfahren auf Basis elliptischer Kurven; 2.048 Bit mit Begründung ebenfalls anerkennen), der private Schlüssel bleibt auf dem Server; CSR mit dem öffentlichen Schlüssel und beiden Namen portal.feldhaus-armaturen.example und api.feldhaus-armaturen.example in den SAN; Domänenprüfung durch die Zertifizierungsstelle für beide Namen (z. B. Datei auf dem Webserver oder TXT-Eintrag im DNS); Ausstellung; Installation mit Zwischenzertifikat und Neuladen des Dienstes; Prüfung unter beiden Namen, auch mit einem Werkzeug oder vom Partnersystem aus (vollständige Kette, Name, Ablaufdatum); Eintrag ins Zertifikatsinventar, Überwachung bzw. automatische Erneuerung, Information des Partners. Agenturwunsch: abzulehnen, weil ein per E-Mail versandter privater Schlüssel in Postfächern, Weiterleitungen und Sicherungen außerhalb der Kontrolle liegt und wer ihn besitzt, sich als Webshop ausgeben könnte; das Testsystem erhält ein eigenes Schlüsselpaar und ein eigenes Zertifikat mit eigenem Namen (z. B. test-shop.feldhaus-armaturen.example) oder ein Zertifikat der internen CA; wurde der Schlüssel bereits versandt, gilt er als kompromittiert: Zertifikat sperren, neues Schlüsselpaar und neues Zertifikat.
Teilaufgabe 4 (Punkteraster: Bewertung der drei Möglichkeiten je 1 Punkt, Empfehlung mit Schritten 2 Punkte): Selbstsigniert: keine Kette und keine Sperrung, jedes Gerät müsste das Zertifikat einzeln hinterlegen; der heutige Zustand führt zum Wegklicken der Warnung und ist für viele Nutzer:innen ungeeignet. Öffentliche Zertifizierungsstelle: wird von allen Geräten ohne Einrichtung anerkannt, setzt aber die Domänenprüfung für einen öffentlichen Namen voraus, macht den internen Namen in öffentlichen Protokollen sichtbar und verlangt wegen der kurzen Laufzeit eine Automatisierung; möglich, für ein reines Intranet aber nicht nötig. Interne CA: beim Kunden bereits vorhanden, freie Wahl interner Namen und Laufzeiten, sperrbar; ihr Root-Zertifikat fehlt aber auf den Büro-PCs, und die CA muss geschützt und überwacht betrieben werden. Empfehlung, zum Beispiel interne CA: Root-Zertifikat nach Vergleich des Fingerabdrucks zentral auf alle verwalteten Büro-PCs verteilen; Schlüsselpaar und CSR für intranet.feldhaus-armaturen.example erstellen; Zertifikat von der internen Zwischen-CA ausstellen lassen; mit Kette installieren und testen; selbstsigniertes Zertifikat entfernen; Beschäftigte informieren, dass Zertifikatswarnungen künftig gemeldet und nicht bestätigt werden; Eintrag in Inventar und Überwachung; dabei bedenken, dass die Büro-PCs damit allen Zertifikaten dieser CA vertrauen, die CA also entsprechend geschützt sein muss. Eine schlüssig begründete Empfehlung für eine öffentliche Zertifizierungsstelle ist ebenfalls anzuerkennen.
Folgefehler: Wird in Teilaufgabe 2 ein falscher Warnbeginn berechnet, ist die Aussage zum Warnzeitraum mit diesem Wert zu bewerten, wenn sie folgerichtig ist; wer statt in Tagen in Monaten rechnet (z. B. 05.10.2026 statt 06.10.2026), verliert nur den Punkt dieser Teilrechnung; ein falsches Ablaufdatum des neuen Webshop-Zertifikats führt beim Erneuerungsdatum nicht zu weiterem Abzug, wenn mit 60 Tagen richtig weitergerechnet wurde; Teilaufgabe 4 wird nach der Schlüssigkeit der Begründung bewertet.
