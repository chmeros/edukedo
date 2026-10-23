---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: AE2
fachgebiet_title: "Sicherstellen der Qualität von Softwareanwendungen"
thema_code: "AE2-glossar"
thema_title: "Glossar (Entwurf)"
quelle: "Aus der vorhandenen Theorie der Themen dieses Fachgebiets abgeleitete Kurzdefinitionen"
rechtsstand: "23.10.2026 — Entwurf, vor Livegang fachlich prüfen"
---

## Glossar

#### Security by Design
**Thema:** 9.1
**Abschnitt:** Sicherheit als Qualitätsmerkmal und Security by Design
**Definition:** Sicherheit wird von Beginn an eingeplant und begleitet alle Phasen von den Anforderungen bis zum Betrieb, statt erst kurz vor der Auslieferung aufgesetzt zu werden. Je früher ein Sicherheitsmangel entdeckt wird, desto günstiger ist seine Behebung.
**Geprüft:** nein

#### Secret
**Thema:** 9.1
**Abschnitt:** Umgang mit Secrets
**Definition:** Geheime Zugangsdaten wie Passwörter, API-Schlüssel, Tokens und private Schlüssel. Nicht in Quellcode oder Repository, sondern zur Laufzeit bereitstellen; ein einmal committetes Secret gilt als kompromittiert und wird rotiert.
**Geprüft:** nein

#### CVE-Kennung
**Auch:** CVE, Common Vulnerabilities and Exposures
**Thema:** 9.1
**Abschnitt:** Abhängigkeiten prüfen
**Definition:** Kennung, unter der eine bekannte Schwachstelle in öffentlichen Datenbanken geführt wird. Der Schweregrad wird mit einem CVSS-Wert bewertet.
**Geprüft:** nein

#### Software Composition Analysis
**Thema:** 9.1
**Abschnitt:** Abhängigkeiten prüfen
**Definition:** Werkzeuge, die die eingesetzten Bibliotheken samt Versionen mit Datenbanken bekannter Schwachstellen abgleichen. Gute Praxis ist, das regelmäßig und automatisiert zu tun.
**Geprüft:** nein

#### Lock-Datei
**Thema:** 9.1
**Abschnitt:** Abhängigkeiten, Software-Stückliste und Drittkomponenten
**Definition:** Datei, die die Versionen der eingesetzten Abhängigkeiten festschreibt und zusätzlich die transitiven, also nur mittelbar über andere Bibliotheken benötigten Abhängigkeiten enthält. In der Praxis wird aus ihr bei jedem Build die Software-Stückliste erzeugt.
**Geprüft:** nein

#### Gebotene Sorgfalt
**Auch:** gebotener Sorgfalt
**Thema:** 9.1
**Abschnitt:** Abhängigkeiten, Software-Stückliste und Drittkomponenten
**Definition:** Sorgfaltsmaßstab des Herstellers bei Komponenten Dritter, auch quelloffenen; die Verantwortung für das Gesamtprodukt bleibt bei ihm. Der Umfang richtet sich nach dem Risiko, genannt werden etwa Konformitätsnachweis, regelmäßige Updates und Abgleich mit Schwachstellendatenbanken.
**Geprüft:** nein

#### SAST
**Auch:** Statische Analyse
**Thema:** 9.1
**Abschnitt:** Sicherheit im Entwicklungsprozess verankern
**Definition:** Statische Analyse: Verfahren, das den Quellcode ohne Ausführung auf bekannte Fehlermuster untersucht. Es ergänzt Code-Reviews und lässt sich als automatisierter Scan in die Build-Pipeline einbinden.
**Geprüft:** nein

#### DAST
**Auch:** Dynamische Tests
**Thema:** 9.1
**Abschnitt:** Sicherheit im Entwicklungsprozess verankern
**Definition:** Dynamische Tests: Verfahren, das die laufende Anwendung von außen angreift, um Schwachstellen zu finden. Es ergänzt die statische Analyse, die den Quellcode ohne Ausführung prüft.
**Geprüft:** nein
