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

Diese Aufgaben verknüpfen mehrere Themen aus FU6 (6.1–6.4) zu einer zusammenhängenden betrieblichen Situation rund um die Brevanta IT-Systemhaus GmbH, wie sie in der schriftlichen Abschlussprüfung typisch ist. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-FU6-01 · Fallaufgabe

**Themenbezug:** 6.1 (Schutzziele, Bedrohungen, Maßnahmen) + 6.2 (Datenschutz, Kundenberatung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH entwickelt für den „Praxisverbund Rhein-Nahe", einen Zusammenschluss von zehn Arztpraxen, ein webbasiertes Portal zur Terminbuchung und zum Austausch von Befundmitteilungen. Projektleiter Tarek Osmani lässt die Entwicklerin Selin Yücel, eine Umschülerin im zweiten Ausbildungsjahr, das Datenmodell und die Anmeldung der Portalnutzer:innen umsetzen. Im Entwicklungsteam kursiert die Idee, zur schnelleren Fehlersuche regelmäßig einen Auszug der Produktivdatenbank mit echten Patientendaten in die Testumgebung zu kopieren. Das Portal soll aus dem Internet erreichbar sein und von Praxispersonal und Patient:innen genutzt werden. Der Kunde bittet Brevanta um eine Einschätzung, welche Sicherheits- und Datenschutzanforderungen zu beachten sind. Zusätzlich übernimmt Brevanta den Betrieb des Portals im Rechenzentrum als Managed Service.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie das Vorhaben anhand der drei klassischen Schutzziele: Nennen Sie je Schutzziel eine konkrete Bedrohung für das Portal und das betroffene Schadenspotenzial für den Kunden.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Beurteilen Sie, ob die Idee, Auszüge der Produktivdatenbank in die Testumgebung zu kopieren, zulässig und sinnvoll ist. Berücksichtigen Sie dabei mindestens zwei Datenschutzgrundsätze und nennen Sie eine bessere Alternative.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Leiten Sie je zwei technische und zwei organisatorische Maßnahmen für Anmeldung, Datenspeicherung und Betrieb des Portals ab und begründen Sie, welches Risiko jede Maßnahme verringert.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Kernpunkte einer Beratung für den Kunden zu den Datenschutz-Anforderungen. Gehen Sie dabei auf die Rollenverteilung (Verantwortlicher/Auftragsverarbeiter), notwendige Verträge, die besondere Sensibilität der Daten und auf Betroffenenrechte ein, und benennen Sie, wo Sie an die zuständige Datenschutzbeauftragte verweisen würden.

**Musterlösungshinweise:** Teilaufgabe 1: Vertraulichkeit z. B. Zugriff Unbefugter auf Befunddaten durch gestohlene Zugangsdaten oder Injection (Folge: Verletzung der Privatsphäre, Meldepflichten, Vertrauensverlust); Integrität z. B. Manipulation von Terminen oder Befundmitteilungen; Verfügbarkeit z. B. Ransomware oder DDoS auf das Portal (Folge: Praxisbetrieb gestört). Teilaufgabe 2: Echtdaten in Testsystemen widersprechen meist der Zweckbindung und Datenminimierung und erhöhen das Risiko einer Datenpanne, zumal Gesundheitsdaten besonders geschützt sind; Alternative: synthetische oder wirksam anonymisierte Testdaten. Teilaufgabe 3: Technisch z. B. TLS, gesalzene Passwort-Hashes, Mehrfaktor-Authentifizierung für Praxispersonal, Rollen- und Rechtekonzept, Verschlüsselung der Datenbank, Protokollierung; organisatorisch z. B. Berechtigungs- und Löschkonzept, Schulung, Notfall- und Meldeprozess, Vier-Augen-Prinzip bei Admin-Zugriffen, jeweils mit Zuordnung zum verringerten Risiko. Teilaufgabe 4: Praxisverbund als Verantwortlicher, Brevanta als Auftragsverarbeiter, Auftragsverarbeitungsvertrag, besondere Kategorien (Gesundheitsdaten) mit erhöhten Anforderungen, Unterstützung bei Betroffenenrechten (Auskunft, Löschung, Export) durch passende Funktionen, Privacy by Design/Default, Verweis bei Rechtsgrundlagen und ggf. Datenschutz-Folgenabschätzung an die Datenschutzbeauftragten; Dokumentation der Absprachen.

---

#### F-FU6-02 · Fallaufgabe

**Themenbezug:** 6.3 (Qualitätssicherung, Ursachenanalyse, PDCA, Soll-Ist-Vergleich)

**Ausgangssituation:** Das Datenanalyse-Team von Brevanta betreibt für die Kornmüller Backwaren KG ein Dashboard, das täglich Absatzzahlen aus den Kassensystemen von 40 Filialen aufbereitet. In den letzten sechs Wochen haben sich Beschwerden gehäuft: An mehreren Tagen waren Zahlen unvollständig oder doppelt gezählt. Die vereinbarte Soll-Vorgabe lautet: Die Tagesauswertung muss bis 06:00 Uhr vollständig und fehlerfrei vorliegen, Zielwert mindestens 90 % der Tage pro Monat. Im letzten Monat wurde dieser Wert an nur 21 von 30 Tagen erreicht. Ein Blick in das Ticketsystem zeigt: Die meisten Fehler entstanden, wenn eine Filiale ihre Daten verspätet geliefert hat und das Ladeskript trotzdem lief. Eine Checkliste für Änderungen am Ladeskript existiert nicht, Änderungen werden ohne Review direkt eingespielt. Das Team steht unter Zeitdruck, weil gleichzeitig ein neues Kundenprojekt startet.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Führen Sie einen Soll-Ist-Vergleich für den letzten Monat durch (Prozentwerte angeben) und beurteilen Sie die Abweichung.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie die Ursachen mit einer geeigneten Methode: Skizzieren Sie eine 5-Why-Kette ausgehend vom Symptom „Zahlen sind unvollständig" bis zu einer beeinflussbaren Ursache.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen Verbesserungsprozess nach dem PDCA-Zyklus mit konkreten Maßnahmen und messbarem Erfolgskriterium je Phase.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, welche Maßnahmen konstruktiv und welche analytisch sind, und begründen Sie, welche Dokumentation (z. B. Protokolle, Checklisten, Lessons Learned) für den Kunden und das Team nötig ist.

**Musterlösungshinweise:** Teilaufgabe 1: Ist-Wert 21 von 30 Tagen = 70 %; Soll mindestens 90 % bzw. 27 von 30 Tagen; Abweichung 20 Prozentpunkte bzw. 6 Tage — deutlich zu hoch, daher Handlungsbedarf und Information des Kunden. Teilaufgabe 2: Symptom: unvollständige Zahlen; Warum? Daten einzelner Filialen fehlten beim Laden; Warum? Das Ladeskript lief trotz verspäteter Lieferung; Warum? Es prüft Vollständigkeit/Eingangszeit nicht; Warum? Anforderung wurde bei der Skript-Änderung nicht berücksichtigt; Warum? Keine Checkliste/kein Review-Schritt für Änderungen — beeinflussbare Ursache. Teilaufgabe 3: Plan: Ursachen aus Analyse (Pareto/Ishikawa), Ziel mindestens 90 %, Maßnahmen Eingangsprüfung im Skript plus Review-Pflicht; Do: Pilot über zwei Wochen mit Checkliste und Vollständigkeitsprüfung; Check: Soll-Ist-Vergleich der Erfolgsquote; Act: bei Erfolg standardisieren und in Qualitätsrichtlinie aufnehmen, sonst nachsteuern. Teilaufgabe 4: Konstruktiv: Checkliste, Review-Pflicht, Vorgaben; analytisch: Testläufe, Vollständigkeitsprüfung mit Alarm, Monitoring; Dokumentation: Änderungsprotokoll, Testprotokoll, Lessons Learned und Bericht an den Kunden mit Ursache, Maßnahmen und Zielwerten.

---

#### F-FU6-03 · Fallaufgabe

**Themenbezug:** 6.1 (Bedrohungsszenarien) + 6.4 (Wirksamkeit prüfen, Berichte an Kunden)

**Ausgangssituation:** Die Hartmann Maschinenbau GmbH, ein Industriekunde von Brevanta, betreibt eine vernetzte Fertigungslinie. Die Smart-Factory-Gruppe von Brevanta hat vor drei Monaten einen Fernwartungszugang für die Steuerung eingerichtet: VPN, Anmeldung mit Benutzername und Passwort, getrennte Netzsegmente für Büro-IT und Produktion. Nun soll die Wirksamkeit der umgesetzten Maßnahmen geprüft werden. Die Auswertung der Protokolle der letzten vier Wochen zeigt: nachts wiederholt tausende fehlgeschlagene Anmeldeversuche von wenigen externen IP-Adressen, zwei erfolgreiche Anmeldungen außerhalb der Wartungsfenster mit dem Konto eines früheren Servicetechnikers, und fünf Steuerungs-PCs mit seit mehr als 90 Tagen nicht eingespielten Sicherheitsupdates. Das Backup der Prozessdaten wurde laut Plan täglich erstellt, ein Restore-Test wurde nie durchgeführt. Der Kunde bittet um einen Prüfbericht und einen Vorschlag für das weitere Vorgehen. Die Geschäftsführung des Kunden interessiert sich vor allem für Kosten und Produktionssicherheit.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beschreiben Sie anhand der Protokollauffälligkeiten ein konkretes Bedrohungsszenario und beurteilen Sie das Schadenspotenzial für den Kunden unter wirtschaftlichen und technischen Kriterien.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Bewerten Sie die Wirksamkeit der bisherigen Maßnahmen (VPN mit Passwort, Netzsegmentierung, Backup) und benennen Sie die jeweils erkennbaren Schwächen.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Leiten Sie aus den Feststellungen priorisierte Maßnahmen ab, legen Sie je Maßnahme eine geeignete Kennzahl samt Zielwert fest und schlagen Sie vor, wie die Wirksamkeit später nachgeprüft wird.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie den Aufbau des Prüfberichts für die Geschäftsführung und die IT-Verantwortlichen des Kunden und erläutern Sie, wie Sie Kosten und Nutzen der empfohlenen Maßnahmen darstellen.

**Musterlösungshinweise:** Teilaufgabe 1: Szenario z. B. Brute-Force bzw. Zugriff über ein nicht deaktiviertes Konto eines ehemaligen Technikers auf die Fernwartung, anschließend Manipulation oder Stillstand der Fertigungslinie; Schadenspotenzial: Produktionsausfall, Vertragsstrafen, Gefahr für Maschinen und Personen, Wiederherstellungsaufwand, Reputationsschaden; technisch: erreichbarer Zugang, veraltete Systeme. Teilaufgabe 2: Passwort-VPN allein schwach (kein zweiter Faktor, Konten ehemaliger Beschäftigter nicht deaktiviert); Segmentierung grundsätzlich sinnvoll, aber durch Fernwartungszugang umgehbar und mit veralteten Systemen geschwächt; Backup nicht nachweislich wirksam, da kein Restore-Test; zudem fehlt Patch-Management. Teilaufgabe 3: Priorität: Konten deaktivieren/Berechtigungs-Review, Mehrfaktor-Authentifizierung, Ratenbegrenzung/Sperren, Patches nach Plan, Restore-Test; Kennzahlen z. B. Anzahl inaktiver, aber aktiver Konten (Ziel 0), Patch-Zeit kritischer Updates (Ziel z. B. 14 Tage), Restore-Erfolgsquote und Wiederanlaufzeit gegenüber RTO, Nachprüfung durch Retest, Log-Auswertung und Audit. Teilaufgabe 4: Management Summary, Detailbefunde mit Schweregrad und Nachweisen (ohne Klartext-Zugangsdaten), priorisierter Maßnahmenplan mit Aufwand, Terminen und Verantwortlichen, Hinweise zu Restrisiken; Kosten-Nutzen: Maßnahmenkosten gegenüber erwartetem Schaden und Produktionsausfallkosten, Hinweis auf nicht-monetäre Effekte und kostengünstige Sofortmaßnahmen.
