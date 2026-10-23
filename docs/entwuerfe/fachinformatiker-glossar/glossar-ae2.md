<!-- Ziel: content/fachinformatiker-anwendungsentwicklung/ae2/glossar.md (neu, Thema 9.1; Entwurf P-AZ Cluster 1, überarbeitet nach pruefung-cluster1.md; Frontmatter und "## Glossar" beim Einspielen ergänzen) -->

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

---

## Bewusst nicht aufgenommen

- Threat Modeling (9.1): in Karten/Quiz nirgends markierbar (nur im Lerntext); gestrichen.
- Transitive Abhängigkeit (9.1): gestrichen, weil der Begriff in den Normalformen (fu5/5.1) etwas anderes bedeutet und dort falsch markiert würde; die Bedeutung steht in „Lock-Datei“. Thema 10.1 (ae3) erklärt ihn ausführlicher.
- Cyber Resilience Act, Hersteller, Software-Stückliste (SBOM), Aktiv ausgenutzte Schwachstelle, Schwerwiegender Sicherheitsvorfall, Koordinierte Offenlegung, Wesentliche Änderung, Unterstützungszeitraum: stehen in fu6 (Thema 6.7); Einmalvergabe.
- Technische Dokumentation, Bewertung der Cybersicherheitsrisiken (9.1): in fu6 bzw. nur im Fließtext angesprochen.
- Release-Checkliste, Pipeline-Gate, Meldeprozess, interne Fristen nach Schweregrad (9.1): im Lerntext als Praxis oder Folgerung gekennzeichnet.
- Least Privilege, Defense in Depth, Secure Defaults (9.1): „Least Privilege“ und „Defense in Depth“ stehen im Bestand fu6; die übrigen Entwurfsprinzipien sind nicht Teil von P-AY.
- Eingabevalidierung, Ausgabekodierung und die „typischen Schwachstellen“ (9.1): Bestandsteil des Themas, nicht Teil von P-AY.
