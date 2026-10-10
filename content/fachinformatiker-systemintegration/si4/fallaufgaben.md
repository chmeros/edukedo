---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI4
fachgebiet_title: "Automatisierte Systemverwaltung und Speicherlösungen"
thema_code: "SI4-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen im Prüfungsbereich „Konzeption und Administration von IT-Systemen“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 21 sowie Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 9 und 10 c und Abschnitt C lfd. Nr. 3 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus SI4 (11.1–11.3) zu zusammenhängenden Situationen aus dem Managed-Services-Betrieb der Brevanta IT-Systemhaus GmbH, wie sie in der schriftlichen Abschlussprüfung (Prüfungsbereich „Konzeption und Administration von IT-Systemen“, 90 Minuten) typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-SI4-01 · Fallaufgabe

**Themenbezug:** 11.1 (Skript lesen, Fehler finden, ergänzen, Zeitplanung, Zugangsdaten)

**Ausgangssituation:** Für die Hartmann Werkzeughandel GmbH betreibt die Brevanta einen Linux-Dateiserver. Der Auszubildende Jan Weiß übernimmt von einem ausgeschiedenen Kollegen das Skript aufraeumen.sh, das nachts Logdateien komprimieren und alte Archive löschen soll. Es liegt im Verzeichnis /opt/brevanta und wird mit dem Parameter /var/log/hartmann aufgerufen. Das Skript lautet:

```
#!/bin/bash
# aufraeumen.sh - komprimiert Logdateien und loescht alte Archive
LOGDIR=$1
TAGE=14
DB_PASSWORT="Hartmann2024!"

cd $LOGDIR
for datei in *.log
do
    gzip $datei
done

find $LOGDIR -name "*.gz" -mtime +$TAGE -exec rm {} \;
echo "fertig"
exit 0
```

Die Crontab des Dienstkontos enthält diese Zeile:

```
30 1 * * * aufraeumen.sh /var/log/hartmann
```

Seit einer Woche passiert nachts nichts; in den Systemmeldungen steht „aufraeumen.sh: command not found“. Beim manuellen Test hat Jan das Skript außerdem einmal ohne Parameter aus seiner Anmeldesitzung gestartet. Danach waren in seinem Home-Verzeichnis alle .log-Dateien komprimiert und ältere .gz-Dateien gelöscht.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Nennen Sie mindestens fünf Mängel des Skripts bzw. des Zeitplans und beschreiben Sie jeweils kurz das Risiko. Erklären Sie dabei auch, was beim Aufruf ohne Parameter geschehen ist.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Ergänzen Sie am Skriptanfang eine Parameterprüfung: Ohne Parameter soll eine Hinweismeldung auf der Fehlerausgabe erscheinen und das Skript mit Exit-Code 2 enden; existiert das Verzeichnis nicht, soll es mit Exit-Code 3 enden. Zeigen Sie außerdem, wie der Wechsel in das Verzeichnis abgesichert wird.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Schreiben Sie einen korrigierten Crontab-Eintrag, der das Skript montags bis freitags um 01:30 Uhr startet und Standard- sowie Fehlerausgabe an eine Logdatei anhängt, und nennen Sie zwei weitere Vorkehrungen für den zeitgesteuerten Betrieb.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie den Umgang mit dem Passwort im Skript und legen Sie fest, wie vorzugehen ist. Entscheiden Sie außerdem begründet, ob das korrigierte Skript sofort produktiv laufen darf oder wie die Einführung ablaufen soll.

**Musterlösungshinweise:** Teilaufgabe 1: Mängel (fünf genügen): (a) keine Prüfung des Parameters — bei leerem LOGDIR wechselt cd ohne Argument ins Home-Verzeichnis, die Schleife komprimiert dort alle .log-Dateien, und find ohne Startverzeichnis durchsucht (bei GNU find) das aktuelle Verzeichnis und löscht alte .gz-Dateien; so ist der Vorfall entstanden; (b) der Wechsel mit cd wird nicht auf Erfolg geprüft; (c) Variablen ohne Anführungszeichen — Dateinamen oder Pfade mit Leerzeichen führen zu Fehlern oder falschen Dateien; (d) Klartext-Passwort im Skript, das nicht einmal verwendet wird; (e) immer Exit-Code 0 und Meldung „fertig“, auch bei Fehlern — Überwachung und Cron erkennen keinen Fehlschlag; (f) kein Logging mit Zeitstempel, daher keine Nachvollziehbarkeit; (g) gzip wird auch auf Dateien angewendet, die der Dienst gerade beschreibt, und bei fehlenden .log-Dateien wird das Muster unverändert übergeben, was einen Fehler erzeugt; (h) löschende Aktion ohne Testlauf; (i) im Zeitplan fehlt der absolute Pfad, weil Cron nur eine minimale Umgebung und einen eingeschränkten Suchpfad hat — das erklärt die Meldung „command not found“. Teilaufgabe 2: Z. B. `if [ -z "${1:-}" ]; then echo "Aufruf: $0 LOGVERZEICHNIS" >&2; exit 2; fi` und `if [ ! -d "$1" ]; then echo "Verzeichnis fehlt: $1" >&2; exit 3; fi`; danach `LOGDIR="$1"` und `cd "$LOGDIR" || exit 3`; Variablen sind in Anführungszeichen zu setzen; optional `set -u`. Teilaufgabe 3: `30 1 * * 1-5 /opt/brevanta/aufraeumen.sh /var/log/hartmann >> /var/log/brevanta/aufraeumen-cron.log 2>&1` (Minute 30, Stunde 1, Wochentage 1 bis 5, absoluter Pfad). Weitere Vorkehrungen z. B.: Sperrdatei (flock) gegen Überlappung, Benachrichtigung bei Exit-Code ungleich 0, Dienstkonto mit minimalen Rechten, Dokumentation von Zweck und Zuständigkeit, Logrotation für das eigene Log. Teilaufgabe 4: Das Passwort ist im Klartext lesbar (für alle mit Leserecht, in Sicherungen und eventuell in Repositories) und gilt als kompromittiert: aus dem Skript entfernen und, da es hier gar nicht benötigt wird, ersatzlos streichen; falls das Konto existiert, Passwort ändern und Zugriffe prüfen; künftig Zugangsdaten aus einer geschützten Quelle (nur für das Dienstkonto lesbare Konfiguration, Geheimnis-Verwaltung) beziehen. Produktiv erst nach Test: zuerst mit Testdaten in einer Testumgebung, löschende Schritte zunächst nur auflisten (Testlauf), dann mit Überwachung der ersten Läufe, das Skript versioniert ablegen und von einer zweiten Person prüfen lassen.

---

#### F-SI4-02 · Fallaufgabe

**Themenbezug:** 11.2 (Kapazitätsplanung, RAID, Rebuild, Backup-Fenster, Betriebskonzept)

**Ausgangssituation:** Das Planungsbüro Lindner GmbH (35 Beschäftigte) erhält von der Brevanta ein neues Dateiablage-System (NAS) für Projektdaten und eine kleine Datenbank. Der Datenbestand beträgt heute 8 TB und wächst um 20 Prozent pro Jahr; geplant wird für 3 Jahre (jährliches Wachstum vom jeweiligen Vorjahresstand). Mindestens 20 Prozent der nutzbaren Kapazität sollen dauerhaft frei bleiben. Das Gehäuse hat 8 Einschübe, vorgesehen sind Platten mit je 4 TB. Der Hersteller gibt für den Rebuild im laufenden Betrieb eine effektive Rate von 100 MB/s an. Das Backup-System ist über eine 1-Gbit/s-Leitung angebunden (theoretisch 125 MB/s); das nächtliche Backup-Fenster dauert 8 Stunden. Der Geschäftsführer möchte RAID 5 einsetzen, weil dabei „am meisten Platz übrig bleibt“. Rechnen Sie dezimal (1 TB = 1 000 000 MB).

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie den Datenbestand nach 3 Jahren und die dafür mindestens erforderliche nutzbare Kapazität unter Berücksichtigung der 20 Prozent freien Reserve. Zeigen Sie den Rechenweg.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Ermitteln Sie für 8 Platten zu je 4 TB die nutzbare Kapazität und die Ausfalltoleranz bei RAID 5, RAID 6 und RAID 10 und beurteilen Sie, welche Level die Anforderung aus Teilaufgabe 1 erfüllen.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Berechnen Sie die Dauer des Rebuilds einer 4-TB-Platte bei 100 MB/s und bewerten Sie damit die Forderung des Geschäftsführers nach RAID 5. Geben Sie eine begründete Empfehlung ab.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Prüfen Sie rechnerisch, ob eine Vollsicherung des heutigen Bestands von 8 TB im Backup-Fenster über die 1-Gbit/s-Leitung möglich ist, und entwerfen Sie ein kurzes Betriebskonzept für das System (Snapshots, Backup, Überwachung mit Schwellenwerten, Zugriffsrechte, Verschlüsselung).

**Musterlösungshinweise:** Teilaufgabe 1: 8 TB × 1,2 × 1,2 × 1,2 = 8 × 1,728 = 13,824 TB nach 3 Jahren. Da höchstens 80 Prozent der nutzbaren Kapazität belegt sein sollen, gilt nutzbare Kapazität = 13,824 / 0,8 = 17,28 TB (mindestens). Teilaufgabe 2: RAID 5: (8 − 1) × 4 = 28 TB, Ausfalltoleranz 1 Platte; RAID 6: (8 − 2) × 4 = 24 TB, Ausfalltoleranz 2 beliebige Platten; RAID 10: 8 / 2 × 4 = 16 TB, je Spiegelpaar 1 Platte (mindestens 1, höchstens 4 Ausfälle, wenn jeweils verschiedene Paare betroffen sind). Anforderung 17,28 TB: RAID 5 (28 TB) und RAID 6 (24 TB) erfüllen sie, RAID 10 mit 16 TB nicht; mit 6-TB-Platten ergäbe RAID 10 dagegen 24 TB. Teilaufgabe 3: 4 TB = 4 000 000 MB; 4 000 000 / 100 = 40 000 s, das sind rund 11,1 Stunden. Während dieser Zeit hat RAID 5 keine Redundanz mehr: Ein zweiter Plattenausfall oder ein Lesefehler führt zum Datenverlust des gesamten Verbunds; die Last des Rebuilds belastet zudem die übrigen, gleich alten Platten. Empfehlung: RAID 6 (24 TB, zwei Ausfälle verkraftbar) — erfüllt die Kapazitätsanforderung deutlich; alternativ RAID 6 über 7 Platten plus 1 Hot Spare (7 − 2) × 4 = 20 TB, was mit 17,28 TB ebenfalls reicht. Zusätzlich: RAID ist kein Backup, die Mehrkapazität von RAID 5 rechtfertigt das höhere Risiko nicht, bei Schreiblast ist die Parität bei beiden Leveln aufwendiger als bei RAID 10. Teilaufgabe 4: 8 Stunden = 28 800 s; bei 125 MB/s sind das 28 800 × 125 = 3 600 000 MB = 3,6 TB; 8 TB würden 8 000 000 / 125 = 64 000 s, rund 17,8 Stunden benötigen — die Vollsicherung passt also nicht ins Fenster, theoretisch und in der Praxis noch weniger. Lösungen: Vollsicherung am Wochenende mit längerem Fenster, danach inkrementell bzw. differenziell, schnellere Anbindung (z. B. 10 Gbit/s), Deduplizierung. Betriebskonzept (Beispiele): Snapshots stündlich/täglich mit Aufbewahrungsfrist als schneller Rückfallpunkt (kein Backup), Backup nach 3-2-1-Regel mit Offsite-Kopie und Wiederherstellungstest; Überwachung von Füllstand (Warnung 80 Prozent, kritisch 90 Prozent), RAID-Status, Plattenzustand, Latenz, Wachstumsprognose, Alarmierung ans Monitoring; Zugriffsrechte nach minimalem Prinzip über Gruppen (Projekt-Gruppen aus dem Verzeichnisdienst), Freigabe- und Dateirechte aufeinander abgestimmt, getrennte Administrationskonten; Verschlüsselung at rest für Volumes und Backups sowie in transit (z. B. SMB-Verschlüsselung), Schlüssel getrennt verwaltet; ggf. Quotas je Benutzer bzw. Projekt, Dokumentation und Übergabe.

---

#### F-SI4-03 · Fallaufgabe

**Themenbezug:** 11.3 (Konfigurationsdrift, Konfigurationsmanagement, Rollout, Risiken) und 11.1 (Zeitplanung, Automatisierung)

**Ausgangssituation:** Das Managed-Services-Team der Brevanta betreut 120 Linux-Server in drei Kundenumgebungen. Die Grundkonfiguration (Zeitsynchronisation, Protokollierung, Härtung von Anmeldungen) wurde bisher von Hand eingerichtet. Ein Audit hat die Abweichungen vom freigegebenen Standard festgestellt:

Kunde    | Server | davon abweichend
Hartmann |     48 |                9
Lindner  |     30 |                2
Nordhaus |     42 |                6
Summe    |    120 |               17

Das Team möchte die Grundkonfiguration künftig automatisiert verwalten. Teamleiter Okafor fordert ein Konzept, einen Rollout-Plan für die erste Änderung (neue Zeitquelle auf allen 120 Servern) und eine Einschätzung der Risiken.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Berechnen Sie die Abweichungsquote je Kunde und insgesamt (auf eine Nachkommastelle gerundet), nennen Sie drei mögliche Ursachen der Abweichungen und erklären Sie, warum sie für den Betrieb problematisch sind.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Konzept für die automatisierte Verwaltung der Grundkonfiguration: Ablage und Versionierung, deklarative Beschreibung mit Rollen, Prüfung von Änderungen, Umgang mit Zugangsdaten, Erkennung von Abweichungen.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Planen Sie den Rollout der neuen Zeitquelle in drei Wellen (Pilot 5 Prozent, zweite Welle 20 Prozent, dritte Welle der Rest). Geben Sie die Zahl der Server je Welle an, legen Sie eine Gesundheitsprüfung sowie ein Abbruchkriterium (Fehlerquote größer 5 Prozent je Welle) fest und ermitteln Sie, ab wie vielen fehlerhaften Servern in Welle 2 der Rollout stoppt.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie Nutzen und Risiken der Automatisierung und nennen Sie drei Gegenmaßnahmen. Formulieren Sie außerdem, welche Angaben das Änderungsprotokoll zu diesem Rollout enthalten soll.

**Musterlösungshinweise:** Teilaufgabe 1: Hartmann 9 / 48 = 18,75 Prozent, gerundet 18,8 Prozent; Lindner 2 / 30 = 6,67 Prozent, gerundet 6,7 Prozent; Nordhaus 6 / 42 = 14,29 Prozent, gerundet 14,3 Prozent; insgesamt 17 / 120 = 14,17 Prozent, gerundet 14,2 Prozent. Ursachen z. B. manuelle Einrichtung mit vergessenen Schritten, spätere Einzeländerungen „auf die Schnelle“, unterschiedliche Image-Stände oder Pakete, fehlende Dokumentation und Prüfung. Probleme: Konfigurationsdrift erschwert Fehlersuche, erzeugt unterschiedliches Verhalten gleicher Systeme, schafft Sicherheitslücken (z. B. nicht gehärtete Server) und macht Neuaufbau schwer reproduzierbar. Teilaufgabe 2: Konfiguration, Vorlagen und Skripte in einem Repository (Verzeichnisse für Basis, Rolle, Umgebung), Änderungen über Zweige und Review (Vier-Augen-Prinzip) mit Test in einer Testumgebung; deklarative Beschreibung des Soll-Zustands je Rolle (Paket, Datei aus Vorlage, Dienst), die idempotent angewendet wird; Verteilung per Push oder Pull mit regelmäßigem Abgleich, um Drift zu erkennen und zurückzuführen; Geheimnisse nicht im Repository, sondern in einem Geheimnis-Verwaltungssystem, Automatisierungskonten mit minimalen Rechten und Protokollierung; Baseline als freigegebener Stand, Abweichungen nur als dokumentierte Ausnahme; Images regelmäßig erneuern. Teilaufgabe 3: Welle 1: 5 Prozent von 120 = 6 Server; Welle 2: 20 Prozent von 120 = 24 Server; Welle 3: 120 − 6 − 24 = 90 Server. Pilot mit unkritischen Systemen, möglichst aus jeder Kundenumgebung. Gesundheitsprüfung nach jeder Welle: Zeitdienst läuft und ist synchron, Anwendungen antworten, keine neuen Fehler im Log, Monitoring ohne Alarme. Abbruchkriterium: 5 Prozent von 24 sind 1,2; die Schwelle wird bei 2 fehlerhaften Servern überschritten, der Rollout stoppt dann automatisch und es erfolgt der Rollback auf die Vorversion der Konfiguration. Wartungsfenster und Abstimmung mit den Kunden sowie Aktualisierung redundanter Systeme nacheinander sind zu beachten. Teilaufgabe 4: Nutzen: Einheitlichkeit, Reproduzierbarkeit, weniger Routinefehler, Zeitersparnis, Nachvollziehbarkeit, schnelle Behebung von Drift. Risiken: Fehler verbreiten sich sehr schnell, zu weitreichende Rechte des Automatisierungskontos, Wissensverlust und Blindvertrauen, Pflegeaufwand, ungeprüfte fremde Vorlagen, manuelle Eingriffe. Gegenmaßnahmen: Rollout in Wellen mit Abbruchregel, Testumgebung und Testlauf, Review, minimale Rechte und Geheimnis-Verwaltung, Dokumentation und Schulung, Notfallverfahren für manuelles Eingreifen. Änderungsprotokoll: Datum und Uhrzeit, durchführende Person bzw. Automatisierungslauf, betroffene Systeme je Welle, Art und Begründung der Änderung (neue Zeitquelle), Ticket- bzw. Freigabeverweis, Ergebnis der Gesundheitsprüfung, Rückfallweg und gegebenenfalls aufgetretene Fehler.
