---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: AE2
fachgebiet_title: "Sicherstellen der Qualität von Softwareanwendungen"
thema_code: "AE2-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Sicherstellen der Qualität von Softwareanwendungen" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 3 Nr. 2 und Anlage (Ausbildungsrahmenplan) Abschnitt B lfd. Nr. 2 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus AE2 (9.1–9.4) zu zusammenhängenden Situationen aus dem Alltag der Softwareentwicklung bei der Brevanta IT-Systemhaus GmbH, wie sie in der schriftlichen Abschlussprüfung (z. B. im Prüfungsbereich „Planen eines Softwareproduktes") typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-AE2-01 · Fallaufgabe

**Themenbezug:** 9.2 (Testfälle, Grenzwerte, Fehlerbericht, Automatisierung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH entwickelt für den Werkzeughändler Hartmann GmbH eine Auftragsverwaltung mit Webshop-Anbindung. Auszubildende Mira Kaya hat das Modul zur Versandkostenberechnung implementiert. Laut Spezifikation wird der Bestellwert in Euro mit zwei Nachkommastellen übergeben. Bestellwerte von 0,00 € oder weniger sind ungültig und führen zu einer Fehlermeldung. Von 0,01 € bis 49,99 € betragen die Versandkosten 4,90 €, von 50,00 € bis 199,99 € betragen sie 2,90 €, ab 200,00 € ist der Versand kostenlos. In Miras Code steht für die mittlere Stufe die Bedingung „Bestellwert größer als 50,00". Ein Kollege soll nun einen Modultest für diese Funktion erstellen und den Fehlerfall dokumentieren.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Bestimmen Sie die Äquivalenzklassen für den Bestellwert und leiten Sie daraus alle Grenzwerte ab, die getestet werden sollten.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Erstellen Sie eine Testfalltabelle mit Eingabe und erwartetem Ergebnis (alle Grenzwerte sowie je einen Repräsentanten pro Klasse) und ordnen Sie den Test einer Teststufe und einer Testart (Black-Box oder White-Box) zu.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Ermitteln Sie, welche Ihrer Testfälle den Fehler in Miras Code aufdecken, geben Sie erwartetes und tatsächliches Ergebnis an und erklären Sie, warum ein Test mit dem Wert 100,00 den Fehler nicht gefunden hätte. Formulieren Sie außerdem einen aussagekräftigen Titel für den Fehlerbericht.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, ob die Testfälle in die automatische Build-Pipeline (Continuous Integration) aufgenommen werden sollten, und nennen Sie zwei Argumente dafür sowie eine Grenze der Automatisierung.

**Musterlösungshinweise:** Teilaufgabe 1: Vier Äquivalenzklassen: ungültig (kleiner oder gleich 0,00), 0,01 bis 49,99, 50,00 bis 199,99 und ab 200,00. Grenzwerte: 0,00 und 0,01; 49,99 und 50,00; 199,99 und 200,00 (ergänzend ungültige Eingaben anderer Art wie leeres Feld oder Text). Teilaufgabe 2: Z. B. -10,00 → Fehlermeldung; 0,00 → Fehlermeldung; 0,01 → 4,90; 25,00 → 4,90; 49,99 → 4,90; 50,00 → 2,90; 100,00 → 2,90; 199,99 → 2,90; 200,00 → 0,00; 500,00 → 0,00. Teststufe: Modultest; Testart: Black-Box (funktional, spezifikationsbasiert, Äquivalenzklassen und Grenzwertanalyse). Teilaufgabe 3: Der Testfall 50,00 deckt den Fehler auf: erwartet 2,90, tatsächlich 4,90, weil „größer als 50,00" den Wert 50,00 selbst ausschließt. Der Wert 100,00 liegt mitten in der Klasse und liefert in beiden Varianten 2,90; Fehler an Klassengrenzen werden nur durch Grenzwerte gefunden. Titel z. B. „Versandkosten bei Bestellwert genau 50,00 € falsch (4,90 € statt 2,90 €)"; der Bericht enthält zusätzlich Umgebung, Reproduktionsschritte, erwartetes und tatsächliches Ergebnis sowie Schweregrad (mittel bis hoch, da Kund:innen systematisch zu viel berechnet wird). Teilaufgabe 4: Ja — dafür sprechen z. B. wiederholbare, schnelle Ausführung bei jeder Änderung (Regressionsschutz) und frühe Fehlererkennung; Grenzen: Pflegeaufwand bei geänderter Spezifikation, die Tests finden nur vorab festgelegte Fälle und ersetzen weder exploratives Testen noch den Abnahmetest durch den Auftraggeber.

---

#### F-AE2-02 · Fallaufgabe

**Themenbezug:** 9.3 (Git, Konflikte, Teamregeln) + 9.1 (Secrets)

**Ausgangssituation:** Im Projekt „Kundenportal" der Brevanta arbeitet ein Team von sechs Entwickler:innen mit Git; der Hauptzweig heißt main. Lena Vogt hat den Zweig feature/rechnungs-export angelegt und dort zwei Commits erstellt. In ihrem Zweig hat sie die Konstante für den Stammkundenrabatt in der Datei rabatt.py von 0,03 auf 0,05 gesetzt. Währenddessen hat Tobias Brandt dieselbe Konstante aufgrund einer neuen Kundenvorgabe auf 0,07 geändert und in main eingebracht. Als Lena main in ihren Zweig holen will, erhält sie diese Meldung:

```
$ git merge main
Auto-merging rabatt.py
CONFLICT (content): Merge conflict in rabatt.py
Automatic merge failed; fix conflicts and then commit the result.
```

In rabatt.py findet sie folgenden Abschnitt:

```
<<<<<<< HEAD
STAMMKUNDEN_RABATT = 0.05
=======
STAMMKUNDEN_RABATT = 0.07
>>>>>>> main
```

Beim Blick in die Historie von main fällt Lena außerdem auf, dass ein Praktikant vor drei Tagen die Datei config.properties mit dem Passwort der Test-Datenbank committet und gepusht hat.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Erklären Sie anhand der Ausgabe, warum der Konflikt entstanden ist, und erläutern Sie, was die beiden Abschnitte zwischen den Markierungen bedeuten.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Beschreiben Sie Schritt für Schritt mit den passenden Git-Kommandos, wie Lena den Konflikt auflöst und den Merge abschließt, und nennen Sie eine Maßnahme, die vor dem anschließenden Push sinnvoll ist.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Bewerten Sie den Vorfall mit der Datei config.properties: Welche Maßnahmen sind in welcher Reihenfolge nötig, und warum genügt es nicht, die Datei in einem neuen Commit zu löschen?

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie Teamregeln zu Branching, Review und Commit-Nachrichten, die Konflikte dieser Art und das versehentliche Einchecken von Zugangsdaten künftig vermeiden oder früh erkennen.

**Musterlösungshinweise:** Teilaufgabe 1: Beide Zweige haben dieselbe Zeile seit dem gemeinsamen Vorgänger-Commit unterschiedlich geändert (0,03 → 0,05 bzw. 0,03 → 0,07); Git kann nicht automatisch entscheiden, welche Fassung gilt. Der Abschnitt zwischen den Markierungen für HEAD und dem Gleichheitszeichen-Trenner zeigt den Stand des aktuellen Zweigs (Lenas Zweig: 0,05), der Abschnitt danach bis zur schließenden Markierung den Stand aus main (0,07). Teilaufgabe 2: Zuerst fachlich klären, welcher Wert gilt (voraussichtlich 0,07 laut neuer Kundenvorgabe; Abstimmung mit Tobias bzw. Projektleitung), dann die Datei bearbeiten und alle Markierungen entfernen, mit git add rabatt.py als gelöst markieren, mit git commit den Merge abschließen (alternativ git merge --continue; Abbruch wäre git merge --abort), danach Tests ausführen und erst dann git push. Teilaufgabe 3: Das Passwort gilt als kompromittiert und muss sofort geändert bzw. widerrufen werden; danach die Datei aus dem Repository nehmen, in .gitignore eintragen und Zugangsdaten künftig über Umgebungsvariablen oder einen Secret-Manager bereitstellen; Zugriffe auf die Datenbank prüfen und den Vorfall dokumentieren; eine Bereinigung der Historie ist optional und ersetzt die Rotation nicht. Ein Löschen per neuem Commit genügt nicht, weil die Datei samt Passwort in der Historie weiterhin abrufbar bleibt und möglicherweise bereits kopiert wurde. Teilaufgabe 4: Z. B. Hauptzweig schützen (kein direktes Pushen, Merge nur nach Review und erfolgreicher CI), kurzlebige Feature-Branches mit regelmäßigem Einholen des Hauptzweigs, kleine fokussierte Merge-Requests, einheitliche Commit-Konvention (aussagekräftige Betreffzeile, Begründung, Ticketverweis), Secret-Scanner in Pipeline oder als Pre-Commit-Prüfung, vorbereitete .gitignore, Einweisung neuer Teammitglieder und Praktikant:innen sowie Absprachen bei Änderungen an gemeinsam genutzten Konstanten.

---

#### F-AE2-03 · Fallaufgabe

**Themenbezug:** 9.1 (Sicherheitsschwachstellen) + 9.2 (Regressionstests) + 9.4 (Präsentation von Ergebnissen)

**Ausgangssituation:** Für die Nordhaus Haustechnik GmbH betreibt die Brevanta eine webbasierte Wartungs-App mit Kundenportal. Ein externer Prüfer hat vier Befunde dokumentiert. Befund A: Beim Login wird die SQL-Abfrage aus Benutzername und Passwort per Textverkettung zusammengesetzt; mit der Eingabe ' OR '1'='1 im Namensfeld konnte sich der Prüfer ohne gültige Zugangsdaten anmelden. Befund B: Das Suchfeld für Wartungsprotokolle gibt den Suchbegriff ungefiltert auf der Ergebnisseite aus; ein eingegebener Skriptausschnitt wurde im Browser ausgeführt. Befund C: Die Passwörter der Benutzer:innen liegen im Klartext in der Tabelle benutzer. Befund D: Eine eingebundene Bibliothek zur PDF-Erzeugung ist in einer Version im Einsatz, für die eine als kritisch eingestufte, öffentlich bekannte Schwachstelle (CVE) existiert; ein Update ist verfügbar. Die Geschäftsführung des Kunden möchte in einem kurzen Termin wissen, wie ernst die Lage ist und was nun geschieht.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie jeden Befund der passenden Schwachstellenart zu und beschreiben Sie in je einem Satz, was ein Angreifer damit erreichen könnte.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Priorisieren Sie die vier Befunde nach Schadenspotenzial und Ausnutzbarkeit und begründen Sie Ihre Reihenfolge.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Nennen Sie zu jedem Befund eine konkrete Gegenmaßnahme und beschreiben Sie, wie sich die Behebung durch automatisierte Tests oder Prüfungen dauerhaft absichern lässt.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Gliederung einer 10-minütigen Kurzpräsentation für die Geschäftsführung des Kunden, einschließlich der gewählten Darstellungsformen und der Empfehlung.

**Musterlösungshinweise:** Teilaufgabe 1: A = SQL-Injection (Umgehung der Anmeldung, im Extremfall Auslesen oder Verändern von Daten); B = reflektiertes Cross-Site-Scripting (Skriptausführung im Browser anderer Nutzer:innen, z. B. Auslesen von Sitzungsdaten, wenn diese einen präparierten Link öffnen); C = unsichere Passwortspeicherung bzw. fehlerhafte Authentifizierung (bei Datenabfluss sind alle Passwörter sofort nutzbar, auch auf anderen Diensten, wenn sie dort wiederverwendet wurden); D = Schwachstelle in einer Abhängigkeit (je nach Art der Lücke z. B. Ausführung von Schadcode über manipulierte Dokumente). Teilaufgabe 2: Eine begründete Reihenfolge ist entscheidend, andere Gewichtungen sind zulässig. Plausibel: 1. A (leicht ausnutzbar, Zugriff auf alle Kundendaten), 2. C (sehr hoher Schaden bei Datenabfluss, in Kombination mit A besonders kritisch), 3. D (als kritisch eingestuft, Ausnutzbarkeit hängt vom Einsatz der betroffenen Funktion ab, Update aber schnell möglich), 4. B (Ausnutzung erfordert, dass Opfer einen präparierten Link öffnen; geringeres, aber relevantes Risiko). Berücksichtigt werden Eintrittswahrscheinlichkeit, Schadensausmaß und Behebungsaufwand. Teilaufgabe 3: A: parametrisierte Abfragen; Regressionstest mit Injection-Zeichenkette, die abgewiesen werden muss. B: kontextabhängige Ausgabekodierung bzw. Template mit automatischem Escaping; Test, dass Sonderzeichen im Suchbegriff maskiert ausgegeben werden. C: Passwörter nur als gesalzener Hash mit geeignetem Verfahren (z. B. Argon2id oder bcrypt) speichern, bestehende Passwörter migrieren bzw. zurücksetzen lassen; Test, dass keine Klartextwerte gespeichert werden. D: Bibliothek auf die gepatchte Version aktualisieren, danach Regressionstests ausführen; automatisierten Abhängigkeits-Scan in die Pipeline aufnehmen. Ergänzend sinnvoll sind Code-Review-Checklisten und regelmäßige Sicherheitstests. Teilaufgabe 4: Gliederung z. B. 1. Ausgangslage und Prüfauftrag, 2. Ergebnis in einem Satz plus Ampelstatus je Befund, 3. Kennzahlen und Risikodarstellung (z. B. Balkendiagramm der Befunde nach Schweregrad), 4. Maßnahmenplan mit Terminen und Verantwortlichen, 5. Empfehlung und nächste Schritte inklusive Nachtest. Adressatengerecht heißt: verständliche Sprache ohne Stacktraces, Fokus auf Risiko, Aufwand und Entscheidung; technische Details nur im Anhang oder für das Entwicklungsteam; Farben nicht als einziger Informationsträger und die betrieblichen Gestaltungsvorgaben beachten.
