# Prüfblatt Digitale Vernetzung — neue Inhalte (Kursprofile Phase 1)

Stand 06.10.2026 · erzeugt aus `content/fachinformatiker-digitale-vernetzung/` (F-179). **Alle Inhalte sind Entwürfe.** Die neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (`kurs-angebot.ts`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.

## 1. Zonen-Instrumente (Begriffe den Zonen zuordnen)

### Authentifizierungsfaktoren (3 Fragen) — Zonen: Wissen · Besitz · Eigenschaft (Biometrie)

**Besonders prüfen:**
- ⚠ Biometrie als eigene Zone „Eigenschaft“: Die Theorie 6.1 nennt Wissen, Besitz und Eigenschaft (Biometrie). Die Fragen enthalten keine Aussagen zur Fehlerrate oder zum Datenschutz biometrischer Daten.
- ⚠ Einmalcode per SMS gilt hier als Besitz (Gerät mit der registrierten Nummer); in der Praxis wird SMS als schwächere Variante eingestuft — ist die Zuordnung so vertretbar?
- ⚠ Sicherheitsfrage zählt als Wissen; viele Stellen raten davon ab, weil die Antworten erratbar sind. Die Frage stellt nur die Einordnung dar.

#### Q-6.1-17 · Authentifizierungsfaktoren (Leicht)

*Ordne die Anmeldemethoden dem Faktor zu, den sie abfragen.*

| Begriff | Zone |
| --- | --- |
| Das Passwort für das Firmenkonto | Wissen |
| Die PIN der Bankkarte | Wissen |
| Der Einmalcode aus der Authenticator-App auf dem Smartphone | Besitz |
| Ein USB-Sicherheitsschlüssel (Hardware-Token) | Besitz |
| Der Fingerabdruck am Laptop | Eigenschaft (Biometrie) |
| Die Gesichtserkennung am Smartphone | Eigenschaft (Biometrie) |
| Die Antwort auf eine Sicherheitsfrage | Wissen |

**Erklärung (so sehen Lernende sie):**

> Wissen ist, was man sich merkt (Passwort, PIN, Antwort auf eine Frage), Besitz ist ein Gegenstand, den man hat (Token, Smartphone), Eigenschaft ist ein körperliches Merkmal (Biometrie).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-18 · Authentifizierungsfaktoren (Mittel)

*Welcher Faktor wird in diesen Situationen jeweils geprüft?*

| Begriff | Zone |
| --- | --- |
| Der VPN-Zugang verlangt ein Kennwort | Wissen |
| Beim Login erscheint eine Bestätigungsanfrage auf dem registrierten Smartphone | Besitz |
| Das Rechenzentrum lässt Personen nur mit der Zutrittskarte ein | Besitz |
| Der Zugang zum Serverraum öffnet sich nach einem Irisscan | Eigenschaft (Biometrie) |
| Die Support-Hotline fragt nach dem Geburtsnamen der Mutter | Wissen |
| Im Authenticator erzeugt eine App alle 30 Sekunden einen neuen Einmalcode | Besitz |
| Das Notebook entsperrt sich per Fingerabdruckleser | Eigenschaft (Biometrie) |

**Erklärung (so sehen Lernende sie):**

> Maßgeblich ist, was nachgewiesen wird: ein gemerktes Geheimnis (Wissen), ein Gegenstand (Besitz) oder ein körperliches Merkmal (Eigenschaft). Der Einmalcode zeigt, dass jemand das registrierte Gerät besitzt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-19 · Authentifizierungsfaktoren (Schwer)

*Mehrfaktor-Authentifizierung kombiniert mindestens zwei verschiedene Faktoren. Ordne die zweite Hälfte der Aussage dem passenden Faktor zu.*

| Begriff | Zone |
| --- | --- |
| Passwort plus Code aus der Authenticator-App: Der zweite Faktor ist | Besitz |
| Passwort plus Fingerabdruck: Der zweite Faktor ist | Eigenschaft (Biometrie) |
| Hardware-Sicherheitsschlüssel plus PIN: Die PIN gehört zum Faktor | Wissen |
| Chipkarte plus Fingerabdruck: Die Chipkarte gehört zum Faktor | Besitz |
| Passwort plus Sicherheitsfrage: Beides gehört zum selben Faktor, also kein zweiter Faktor, nämlich | Wissen |
| Fingerabdruck plus Gesichtserkennung: Beides gehört zum selben Faktor, also kein zweiter Faktor, nämlich | Eigenschaft (Biometrie) |
| Code per SMS auf das registrierte Handy: Der Code bestätigt den | Besitz |

**Erklärung (so sehen Lernende sie):**

> Zwei Passwörter oder zwei biometrische Merkmale sind kein zweiter Faktor, weil beide zur selben Kategorie gehören. Ein echter zweiter Faktor kommt aus einer anderen Kategorie: Wissen, Besitz oder Eigenschaft. Dann schützt die Anmeldung auch noch, wenn ein Passwort abgegriffen wurde.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Kryptografie-Bausteine (3 Fragen) — Zonen: Symmetrische Verschlüsselung · Asymmetrische Verschlüsselung · Hashverfahren

**Besonders prüfen:**
- ⚠ Der Salt ist nur in der Theorie 6.1 als „zufälliger Zusatz“ erwähnt; die Fragen nennen keine konkreten Verfahren für Passwörter (Argon2, bcrypt).
- ⚠ Eine digitale Signatur ist in der Frage dem asymmetrischen Verfahren zugeordnet (Hash plus asymmetrisches Verfahren); als Kombination wäre auch „Hashverfahren“ vertretbar — Zuordnung prüfen.
- ⚠ TLS: asymmetrisch beim Verbindungsaufbau, symmetrisch für die Nutzdaten — wie in der Theorie.

#### Q-6.1-20 · Kryptografie-Bausteine (Leicht)

*Ordne die Eigenschaften dem passenden Verfahren zu.*

| Begriff | Zone |
| --- | --- |
| Sender und Empfänger nutzen denselben geheimen Schlüssel | Symmetrische Verschlüsselung |
| Jeder Beteiligte hat ein Schlüsselpaar aus öffentlichem und privatem Schlüssel | Asymmetrische Verschlüsselung |
| Aus beliebigen Daten entsteht ein Prüfwert fester Länge | Hashverfahren |
| AES ist ein Beispiel | Symmetrische Verschlüsselung |
| RSA ist ein Beispiel | Asymmetrische Verschlüsselung |
| Das Verfahren ist nicht umkehrbar | Hashverfahren |
| Schnell, aber der Schlüssel muss sicher ausgetauscht werden | Symmetrische Verschlüsselung |

**Erklärung (so sehen Lernende sie):**

> Symmetrisch heißt: ein gemeinsamer geheimer Schlüssel (z. B. AES). Asymmetrisch heißt: Schlüsselpaar (z. B. RSA). Eine Hashfunktion bildet einen Prüfwert fester Länge und lässt sich nicht umkehren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-21 · Kryptografie-Bausteine (Mittel)

*Welches Verfahren passt zur Aufgabe?*

| Begriff | Zone |
| --- | --- |
| Prüfen, ob eine heruntergeladene Datei verändert wurde | Hashverfahren |
| Passwörter in einer Datenbank ablegen (mit Salt und einem dafür geeigneten Verfahren) | Hashverfahren |
| Die eigentlichen Daten einer HTTPS-Verbindung nach dem Verbindungsaufbau übertragen | Symmetrische Verschlüsselung |
| Eine Nachricht so verschlüsseln, dass nur der Empfänger sie mit seinem privaten Schlüssel lesen kann | Asymmetrische Verschlüsselung |
| Eine große Datenmenge schnell verschlüsseln, wenn beide Seiten den Schlüssel bereits sicher besitzen | Symmetrische Verschlüsselung |
| Beim Aufbau einer TLS-Verbindung helfen, ohne vorher ein gemeinsames Geheimnis zu kennen | Asymmetrische Verschlüsselung |
| Die Integrität feststellen, ohne etwas zu verschlüsseln | Hashverfahren |

**Erklärung (so sehen Lernende sie):**

> Hashes prüfen Integrität und speichern Passwörter. Asymmetrische Verfahren helfen beim sicheren Verbindungsaufbau, die eigentlichen Daten werden bei TLS symmetrisch verschlüsselt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-22 · Kryptografie-Bausteine (Schwer)

*Ordne die Aussagen zu Verwechslungen und Zusammenspiel dem Verfahren zu, auf das sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Beim Login wird der Prüfwert des eingegebenen Passworts neu berechnet und mit dem gespeicherten verglichen, nie entschlüsselt | Hashverfahren |
| Der Schlüssel muss vor der Kommunikation sicher zum Empfänger gelangen | Symmetrische Verschlüsselung |
| Der eine Schlüssel darf allen bekannt sein, der andere muss geheim bleiben | Asymmetrische Verschlüsselung |
| Das Ergebnis lässt sich nicht in die ursprünglichen Daten zurückverwandeln | Hashverfahren |
| Wird bei TLS für HTTPS beim Verbindungsaufbau eingesetzt | Asymmetrische Verschlüsselung |
| Wird bei TLS für HTTPS für die übertragenen Daten eingesetzt | Symmetrische Verschlüsselung |
| Eine digitale Signatur kombiniert dieses Verfahren mit einem Hashverfahren | Asymmetrische Verschlüsselung |

**Erklärung (so sehen Lernende sie):**

> Passwörter werden nicht reversibel verschlüsselt abgelegt, sondern gehasht. In der Praxis arbeiten die Verfahren zusammen: asymmetrisch beim Verbindungsaufbau und für Signaturen, symmetrisch für die Nutzdaten, Hashes für Prüfwerte.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Monitoring-Kategorien (3 Fragen) — Zonen: Ressourcen (CPU/RAM/Speicher) · Verfügbarkeit (Erreichbarkeit/Dienste) · Netzwerk (Durchsatz/Latenz/Fehler) · Ereignisse/Logs

**Besonders prüfen:**
- ⚠ Gerätezustand (Temperatur, Lüfter, CPU, Speicher) steht in der Theorie unter „Kennzahlen“; hier der Kategorie Ressourcen zugeordnet. Auslastung und Trends zählen zum Netzwerk, Dienstchecks zur Verfügbarkeit.
- ⚠ Grenzfall: „Ein Server antwortet auf Ping, aber der Dienst nicht“ — Verfügbarkeit (Dienstcheck), nicht Netzwerk.
- ⚠ Grenzfall: Syslog-Meldung „Schnittstelle ausgefallen“ als Ereignis, obwohl sie auch die Verfügbarkeit berührt.

#### Q-10.1-14 · Monitoring-Kategorien (Leicht)

*Ordne die Messwerte und Meldungen der Monitoring-Kategorie zu.*

| Begriff | Zone |
| --- | --- |
| CPU-Auslastung und Zykluszeit einer Steuerung | Ressourcen (CPU/RAM/Speicher) |
| Füllstand des Pufferspeichers im Edge-Gateway | Ressourcen (CPU/RAM/Speicher) |
| Das Gateway antwortet nicht mehr auf Ping | Verfügbarkeit (Erreichbarkeit/Dienste) |
| Der OPC-UA-Server der Anlage ist nicht erreichbar | Verfügbarkeit (Erreichbarkeit/Dienste) |
| Latenz und Jitter einer Funkstrecke | Netzwerk (Durchsatz/Latenz/Fehler) |
| CRC-Fehler und verworfene Pakete an einem Switch-Port | Netzwerk (Durchsatz/Latenz/Fehler) |
| Logeintrag „Verbindung zum Broker verloren“ | Ereignisse/Logs |

**Erklärung (so sehen Lernende sie):**

> Rechenleistung und Speicher zählen zu den Ressourcen, Erreichbarkeit zur Verfügbarkeit, Latenz, Jitter und Fehlerzähler zum Netzwerk, einzelne Meldungen zu Ereignissen und Logs.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.1-15 · Monitoring-Kategorien (Mittel)

*Ordne die Beobachtungen der passenden Monitoring-Kategorie zu.*

| Begriff | Zone |
| --- | --- |
| RAM-Belegung des MQTT-Brokers | Ressourcen (CPU/RAM/Speicher) |
| Auslastung einer Funkstrecke in Prozent der Kapazität | Netzwerk (Durchsatz/Latenz/Fehler) |
| Der Dienstcheck meldet, dass der Datensammler nicht läuft | Verfügbarkeit (Erreichbarkeit/Dienste) |
| Ein Gerät sendet von sich aus einen Alarm über einen Sensorfehler | Ereignisse/Logs |
| Plattenplatz für die Historian-Datenbank | Ressourcen (CPU/RAM/Speicher) |
| Paketverlust zwischen Leitstand und Steuerung | Netzwerk (Durchsatz/Latenz/Fehler) |
| Protokolleinträge über wiederholte Neustarts einer Steuerung | Ereignisse/Logs |

**Erklärung (so sehen Lernende sie):**

> Auslastung bezieht sich immer auf die Kapazität der Verbindung (Netzwerk). Alarme, die ein Gerät von sich aus meldet, und Logeinträge sind Ereignisse; der Dienstcheck prüft die Verfügbarkeit.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.1-16 · Monitoring-Kategorien (Schwer)

*Ordne die Überwachungsaufgaben der Kategorie zu, um die es dabei hauptsächlich geht.*

| Begriff | Zone |
| --- | --- |
| Eine Steuerung ist per Ping erreichbar, antwortet aber nicht auf Modbus-Anfragen | Verfügbarkeit (Erreichbarkeit/Dienste) |
| Der Jitter steigt, obwohl der Durchsatz niedrig bleibt | Netzwerk (Durchsatz/Latenz/Fehler) |
| Vollaufende Logdateien auf einem Gateway | Ressourcen (CPU/RAM/Speicher) |
| Meldungen aller Maschinen zentral sammeln, um Störungen zeitlich zuzuordnen | Ereignisse/Logs |
| Die Verfügbarkeit einer Linie als Anteil der Betriebszeit auswerten | Verfügbarkeit (Erreichbarkeit/Dienste) |
| Dauerhaft hohe CPU-Last eines Edge-Servers | Ressourcen (CPU/RAM/Speicher) |
| Die Auslastung eines Uplinks mit der Baseline vergleichen | Netzwerk (Durchsatz/Latenz/Fehler) |

**Erklärung (so sehen Lernende sie):**

> In der Echtzeitkommunikation ist Jitter oft wichtiger als der Durchsatz (Netzwerk). Ein erreichbares Gerät kann einen ausgefallenen Dienst haben (Verfügbarkeit), vollaufende Logs und dauerhaft hohe Lasten sind Ressourcenprobleme.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Automatisierungspyramide (4 Fragen) — Zonen: Feldebene · Steuerungsebene · Prozessleitebene (SCADA/HMI) · Betriebsleitebene (MES) · Unternehmensebene (ERP)

**Besonders prüfen:**
- ⚠ Ebenenlesart des Kurses (8.2, 11.2): Feld, Steuerung, Leit (SCADA), Betriebsleit (MES), Unternehmen (ERP), ohne Nummerierung; Zählung und Benennung variieren je Quelle (Purdue 0–4, ISA-95). In 11.2 heißt die dritte Ebene „Leitstandsebene (Prozessleitebene)“ — passt die Beschriftung der Zone?

#### Q-8.2-15 · Automatisierungspyramide (Leicht)

*Ordne die Begriffe den passenden Zonen zu.*

| Begriff | Zone |
| --- | --- |
| Temperatursensor am Werkzeug | Feldebene |
| Stellventil in der Kühlwasserleitung | Feldebene |
| SPS einer Fräszelle | Steuerungsebene |
| Robotersteuerung einer Schweißzelle | Steuerungsebene |
| Leitstand mit Visualisierung und Alarmanzeige der Halle | Prozessleitebene (SCADA/HMI) |
| Bedienplatz mit Trendkurven aller Anlagenwerte | Prozessleitebene (SCADA/HMI) |
| Fertigungsauftragssteuerung mit Qualitätsdatenerfassung | Betriebsleitebene (MES) |
| Zuordnung der Fertigungsaufträge zu freien Anlagen | Betriebsleitebene (MES) |
| Materialwirtschaft und Auftragsabwicklung | Unternehmensebene (ERP) |
| Finanzbuchhaltung und Kostenplanung | Unternehmensebene (ERP) |

**Erklärung (so sehen Lernende sie):**

> Dieser Kurs liest die Pyramide mit fünf Ebenen ohne Nummerierung, von unten nach oben: Feldebene (Sensoren, Aktoren), Steuerungsebene (SPS, Robotersteuerung), Leitebene mit Bedienen und Beobachten (SCADA/HMI), Betriebsleitebene (MES) und Unternehmensebene (ERP). In der Literatur variieren Benennung und Zählung, etwa beim Purdue-Modell mit den Stufen 0 bis 4 oder bei Darstellungen mit nur vier Ebenen. Auf die Zuordnung der Geräte wirkt sich das kaum aus, auf die Ebenennummer schon. Typische Verwechslung: Leitstand und MES sind beides „Software über den Maschinen“, aber der Leitstand überwacht und bedient die Anlage, das MES steuert Aufträge und Qualitätsdaten der Fertigung.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-16 · Automatisierungspyramide (Mittel)

*Ordne die Aufgaben der Ebene der Automatisierungspyramide zu, auf der sie üblicherweise erledigt werden.*

| Begriff | Zone |
| --- | --- |
| Füllstandssensor meldet „Behälter voll“ | Feldebene |
| Endschalter meldet 24 V, sobald die Schiebetür geschlossen ist | Feldebene |
| Programm mit Selbsthaltung und Hysterese für eine Füllstandspumpe | Steuerungsebene |
| Abschalten des Motors bei ausgelöstem Motorschutz im Anwenderprogramm, in Millisekunden | Steuerungsebene |
| Zentrale Anzeige aller Messwerte und Zustände der Anlage mit Bedienmöglichkeit | Prozessleitebene (SCADA/HMI) |
| Archivierung der Messwerte einer Anlage für die spätere Trendanzeige | Prozessleitebene (SCADA/HMI) |
| Erfassung der Ist-Zeiten je Fertigungsauftrag | Betriebsleitebene (MES) |
| Auswertung der Anlagenauslastung je Schicht | Betriebsleitebene (MES) |
| Bedarfsplanung und Bestellauslösung für das ganze Unternehmen | Unternehmensebene (ERP) |
| Rechnungsstellung an Kunden nach der Lieferung | Unternehmensebene (ERP) |

**Erklärung (so sehen Lernende sie):**

> Je weiter unten, desto näher am Prozess und desto kürzer die Reaktionszeiten: Sensoren und Endschalter liefern nur Signale, die SPS verarbeitet sie im Zyklus von wenigen Millisekunden. Leitebene und MES arbeiten in Sekunden bis Minuten, das ERP in Minuten bis Stunden. Lesart des Kurses: fünf benannte Ebenen, keine Nummerierung wie beim Purdue-Modell. Typische Verwechslung: Auslastung und Ist-Zeiten je Auftrag gehören ins MES, die reine Messwertanzeige und -archivierung der Anlage in die Leitebene; beide haben mit Daten aus der Fertigung zu tun, aber unterschiedliche Bezugsgrößen (Auftrag und Schicht gegenüber Anlage und Messwert).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-17 · Automatisierungspyramide (Mittel)

*Ordne die Vorgänge aus dem Spritzgießwerk der Hallbach Kunststofftechnik der passenden Ebene zu.*

| Begriff | Zone |
| --- | --- |
| Temperaturfühler am Werkzeug der Spritzgießmaschine | Feldebene |
| Heizpatrone am Werkzeug, vom Regler geschaltet | Feldebene |
| Programmlogik der Spritzgießmaschine in der SPS | Steuerungsebene |
| Temperaturregler, der die Heizzone auf dem Sollwert hält | Steuerungsebene |
| Leitstandsmeldung „Werkzeugtemperatur zu hoch“ mit Quittierung | Prozessleitebene (SCADA/HMI) |
| Übersicht über den Zustand aller Spritzgießmaschinen der Halle | Prozessleitebene (SCADA/HMI) |
| Rückmeldung von Stückzahl und Ausschuss je Fertigungsauftrag | Betriebsleitebene (MES) |
| Rückverfolgung, welche Charge Granulat in welchem Auftrag verarbeitet wurde | Betriebsleitebene (MES) |
| Beschaffung von Granulat nach Lagerbestand und Bedarf | Unternehmensebene (ERP) |
| Kostenrechnung je Kundenauftrag | Unternehmensebene (ERP) |

**Erklärung (so sehen Lernende sie):**

> Heizpatrone und Temperaturfühler sind Aktor und Sensor und liegen auf der Feldebene; der Regler und die SPS-Logik, die beide verbindet, auf der Steuerungsebene. Die Meldung am Leitstand betrifft die ganze Anlage und wird von Menschen quittiert (Leitebene). Das MES arbeitet mit Aufträgen und Chargen, das ERP mit Beschaffung und Kosten. Typische Verwechslung: Der Regler wird oft zur Feldebene gezählt, weil er „am Werkzeug“ sitzt; er verarbeitet jedoch Signale und gehört wie die SPS zur Steuerungsebene. Zur Lesart: Der Kurs unterscheidet fünf Ebenen ohne Nummern; andere Quellen ordnen dieselben Systeme etwa den Stufen 0 bis 4 des Purdue-Modells zu.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-18 · Automatisierungspyramide (Schwer)

*Ordne die Begriffe den Zonen zu und achte auf die Abgrenzung der Ebenen.*

| Begriff | Zone |
| --- | --- |
| Drucksensor mit 4-20-mA-Ausgang | Feldebene |
| Signalleuchte und Hupe am Maschinenrand | Feldebene |
| Prozessabbild der Eingänge, das in jedem Zyklus neu eingelesen wird | Steuerungsebene |
| Zeitglied, das eine Warnung erst nach 5 s ohne Durchfluss auslöst | Steuerungsebene |
| Alarmhistorie der gesamten Anlage mit Zeitstempel und Quittierung | Prozessleitebene (SCADA/HMI) |
| Sollwert einer Anlage vom Leitstand aus verändern | Prozessleitebene (SCADA/HMI) |
| Abgleich von Soll- und Ist-Menge eines Auftrags in der laufenden Schicht | Betriebsleitebene (MES) |
| Freigabe oder Sperrung einer Charge nach der Qualitätsprüfung | Betriebsleitebene (MES) |
| Personalplanung und Lohnabrechnung des Unternehmens | Unternehmensebene (ERP) |
| Langfristige Absatz- und Produktionsplanung über mehrere Werke | Unternehmensebene (ERP) |

**Erklärung (so sehen Lernende sie):**

> Signalleuchte und Hupe zeigen zwar Alarme an, sind aber Aktoren und gehören zur Feldebene; die Alarmhistorie mit Quittierung gehört zur Leitebene. Das Zeitglied und das Prozessabbild sind Bestandteile des SPS-Programms und damit Steuerungsebene. Ein Sollwert, den jemand am Leitstand ändert, wird dort eingegeben, ausgeführt wird er aber von der Steuerung. Das MES bezieht sich auf Aufträge und Chargen, das ERP auf das ganze Unternehmen. Lesart des Kurses: fünf Ebenen von Feld- bis Unternehmensebene ohne feste Nummerierung; Purdue-Modell und andere Darstellungen zählen und benennen teils anders, wodurch einzelne Systeme (etwa ein Gateway zur Cloud) Ebenen überspringen können und in der Analyse besonders betrachtet werden müssen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Sensor, Steuerung, Aktor, Kommunikation (4 Fragen) — Zonen: Sensor · Steuerung/Verarbeitung · Aktor · Kommunikation/Gateway

**Besonders prüfen:**
- ⚠ Schütze und Relais zählt Thema 9.2 ausdrücklich zu den Aktoren (Schütz als Aktor in Q-9.2-15); Signalleuchte und Hupe als Aktoren, Drehzahlgeber und Energiezähler als Sensoren.
- ⚠ Gegenprüfen: „als Öffner verdrahteter Näherungsschalter“ (Q-9.2-17) und „Magnetventil“ (Q-9.2-14).

#### Q-9.2-14 · Sensor, Steuerung, Aktor, Kommunikation (Leicht)

*Ordne die Bauteile ihrer Rolle im vernetzten System zu.*

| Begriff | Zone |
| --- | --- |
| Lichtschranke am Förderband | Sensor |
| Temperaturfühler im Ofen | Sensor |
| SPS einer Abfüllanlage | Steuerung/Verarbeitung |
| Mikrocontroller, der Messwerte auswertet und Schaltbefehle berechnet | Steuerung/Verarbeitung |
| Stellmotor einer Lüftungsklappe | Aktor |
| Magnetventil in der Druckluftleitung | Aktor |
| Gateway, das Modbus-Werte als MQTT-Nachrichten weitergibt | Kommunikation/Gateway |
| Bluetooth-Modul, das fertige Messwerte an ein Smartphone funkt | Kommunikation/Gateway |

**Erklärung (so sehen Lernende sie):**

> Der Signalweg läuft vom Sensor (erfasst eine physikalische Größe) über die Steuerung bzw. Verarbeitung (entscheidet und berechnet) zum Aktor (setzt den Befehl in eine Aktion um); die Kommunikation transportiert Daten zwischen den Teilen und setzt Protokolle um. Typische Verwechslung: Ein Gateway oder ein Funkmodul überträgt und übersetzt, es entscheidet aber nicht über Schaltvorgänge, und ein Stellmotor ist ein Aktor, keine Steuerung, auch wenn er „angesteuert“ wird.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-15 · Sensor, Steuerung, Aktor, Kommunikation (Mittel)

*Ordne die Beschreibungen der passenden Rolle zu.*

| Begriff | Zone |
| --- | --- |
| Liefert 4-20 mA entsprechend einem Druck von 0 bis 10 bar | Sensor |
| Meldet 24 V, sobald ein Metallteil den Schaltabstand unterschreitet | Sensor |
| Liest die Eingänge als Prozessabbild ein, arbeitet das Programm ab und schreibt die Ausgänge | Steuerung/Verarbeitung |
| Rechnet den Rohwert 12 mA im Steuerungsprogramm in 5 bar um | Steuerung/Verarbeitung |
| Setzt ein Steuersignal in eine Drehbewegung um | Aktor |
| Schaltet den Motorstrom ein, sobald die Steuerung den Ausgang setzt (Schütz) | Aktor |
| Bildet Modbus-Register mit Faktor 0,1 auf MQTT-Topics ab | Kommunikation/Gateway |
| Überträgt Daten im Busbetrieb mit mehreren Teilnehmern an einer Leitung (RS-485) | Kommunikation/Gateway |

**Erklärung (so sehen Lernende sie):**

> Sensoren wandeln Messgrößen oder Zustände in elektrische Signale, die Steuerung verarbeitet diese zyklisch und rechnet sie bei Bedarf in technische Einheiten um, Aktoren setzen die Ausgangssignale in Bewegung oder Schalthandlungen um. Die Kommunikation (Bus, Gateway mit Mapping-Tabelle) verbindet die Teile, ohne selbst Steuerungsentscheidungen zu treffen. Typische Verwechslung: Das Schütz schaltet den Strom, entscheidet aber nicht, wann; die Entscheidung liegt im Programm der Steuerung.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-16 · Sensor, Steuerung, Aktor, Kommunikation (Mittel)

*Ordne die Teile der Pressenüberwachung, die Brevanta bei einem Kunden einrichtet, ihrer Rolle zu.*

| Begriff | Zone |
| --- | --- |
| Drucksensor an der Hydraulikleitung der Presse | Sensor |
| Drehzahlgeber an der Antriebswelle | Sensor |
| Programm, das bei Überdruck den Pressenantrieb abschaltet | Steuerung/Verarbeitung |
| Zähler im Programm, der die gefertigten Teile zählt | Steuerung/Verarbeitung |
| Hydraulikventil, das auf das Steuersignal öffnet | Aktor |
| Warnhupe, die bei Alarm ertönt | Aktor |
| MQTT-Broker, der Messwerte an alle Abonnenten verteilt | Kommunikation/Gateway |
| Abschlusswiderstände an den beiden Enden der RS-485-Leitung | Kommunikation/Gateway |

**Erklärung (so sehen Lernende sie):**

> Drucksensor und Drehzahlgeber erfassen Größen, Programm und Zähler gehören zur Verarbeitung in der Steuerung, Ventil und Hupe führen Befehle aus. Broker und Busabschluss sind Teil der Datenübertragung. Typische Verwechslung: Eine Hupe „meldet“ zwar etwas, sie ist aber ein Aktor, der ein Ausgangssignal in Schall umsetzt, kein Sensor; ein Broker verarbeitet keine Messwerte, sondern verteilt sie.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-17 · Sensor, Steuerung, Aktor, Kommunikation (Schwer)

*Ordne die Elemente der passenden Rolle zu und achte auf die Abgrenzung.*

| Begriff | Zone |
| --- | --- |
| Energiezähler, der die Leistungsaufnahme der Presse misst | Sensor |
| Näherungsschalter, als Öffner verdrahtet, damit ein Leitungsbruch auffällt | Sensor |
| Einschaltverzögerung, die die Warnung erst nach 5 s ohne Durchfluss auslöst | Steuerung/Verarbeitung |
| Selbsthaltung, die den Fördermotor nach kurzem Start-Impuls eingeschaltet lässt | Steuerung/Verarbeitung |
| Pneumatikzylinder, der das fertige Teil ausschiebt | Aktor |
| Signalleuchte, die den Zustand „Störung“ anzeigt | Aktor |
| Mapping-Tabelle, die Slave 3, Register 100 mit Faktor 0,1 auf ein Topic abbildet | Kommunikation/Gateway |
| Industrial-Ethernet-Switch, der SPS, Antriebe und Leitstand verbindet | Kommunikation/Gateway |

**Erklärung (so sehen Lernende sie):**

> Energiezähler und Näherungsschalter erfassen Größen und sind Sensoren. Einschaltverzögerung und Selbsthaltung sind Programmbausteine und gehören zur Verarbeitung in der Steuerung, nicht zu den Aktoren, obwohl sie am Ende einen Ausgang beeinflussen. Zylinder und Signalleuchte setzen Befehle um, sind also Aktoren. Mapping-Tabelle und Switch transportieren und übersetzen Daten und gehören zur Kommunikation. Faustregel: Wer entscheidet oder rechnet, ist Verarbeitung; wer misst, ist Sensor; wer ausführt, ist Aktor; wer Daten befördert oder umsetzt, ist Kommunikation. Bauteile mit Doppelrolle, etwa ein Smart-Sensor mit eigener Auswertung, lassen sich nicht eindeutig zuordnen und kommen deshalb hier nicht vor.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Industrie- und IoT-Protokolle (4 Fragen) — Zonen: Feldbus/Industrial Ethernet · Modbus · OPC UA · MQTT

**Besonders prüfen:**
- ⚠ Modbus (RTU/TCP) zählen 8.2 und 9.2 zur Feldbus-/Industrial-Ethernet-Familie; als eigene Zone nur trennbar, wenn der Begriff Register, Slave-Adressen oder fehlende Sicherheit nennt (siehe Erklärung Q-11.1-14).
- ⚠ Q-11.1-17: „OPC UA: klassisch Client/Server, zusätzlich Publish/Subscribe-Variante“; PROFINET und EtherCAT als Industrial Ethernet.

#### Q-11.1-14 · Industrie- und IoT-Protokolle (Leicht)

*Ordne die Eigenschaften dem passenden Protokoll bzw. der passenden Protokollfamilie zu.*

| Begriff | Zone |
| --- | --- |
| Veröffentlicht Nachrichten zu Topics bei einem Broker, Ports 1883 und 8883 | MQTT |
| Abonnenten erhalten Nachrichten mit wählbarer Zustellgüte (QoS 0 bis 2) | MQTT |
| Herstellerübergreifender Standard mit Informationsmodell, üblicher Port 4840 | OPC UA |
| Zertifikate, Signatur und Verschlüsselung sind Teil des Standards | OPC UA |
| Einfaches Register-Protokoll, über TCP üblicherweise Port 502 | Modbus |
| Ohne eigene Authentifizierung und Verschlüsselung, Daten liegen in 16-Bit-Registern | Modbus |
| Serielle, robuste Busse zwischen Steuerung und Sensoren/Aktoren, oft herstellerspezifisch | Feldbus/Industrial Ethernet |
| Ethernet-Technik, für die Automatisierung um Echtzeitverhalten erweitert | Feldbus/Industrial Ethernet |

**Erklärung (so sehen Lernende sie):**

> MQTT arbeitet nachrichtenorientiert über einen Broker, OPC UA bringt ein Informationsmodell und Sicherheit mit, Modbus ist ein schlankes Register-Protokoll ohne Sicherheitsfunktionen, Feldbus und Industrial Ethernet stehen für die echtzeitnahe Kommunikation in der Automatisierung. Hinweis: Der Kurs führt Modbus (RTU wie TCP) an anderer Stelle auch in der Familie der Feldbus- und Industrial-Ethernet-Protokolle auf; in diesem Instrument ist Modbus bewusst eine eigene Zone, weil seine Merkmale (Register, kein Echtzeitversprechen, keine eingebaute Sicherheit) klar vom Rest abweichen. Typische Verwechslung: Ports sind nur Hinweise, kein Beweis für das Protokoll.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-15 · Industrie- und IoT-Protokolle (Mittel)

*Ordne die Situationen dem Protokoll zu, das sie beschreibt.*

| Begriff | Zone |
| --- | --- |
| Ein Gerät liest zyklisch Registerwerte eines anderen Geräts ab (Polling) | Modbus |
| Was ein Registerwert bedeutet, steht nur in der Gerätedokumentation | Modbus |
| Meldung nur bei Änderung an einen zentralen Vermittler, Empfänger kennen den Sender nicht | MQTT |
| Der Vermittler meldet automatisch, wenn ein Gerät unerwartet wegbricht (Last Will) | MQTT |
| Ein Client liest Knoten im Adressraum, Typ und Einheit liefert der Server mit | OPC UA |
| Die Verbindung wird über Zertifikate als vertrauenswürdig geprüft und verschlüsselt | OPC UA |
| Steuerung und Antriebe tauschen im festen Takt Prozessdaten mit garantierter Zykluszeit aus | Feldbus/Industrial Ethernet |
| Zeitverhalten ist vorhersagbar, nicht nur „so schnell wie möglich“ wie im Büronetz | Feldbus/Industrial Ethernet |

**Erklärung (so sehen Lernende sie):**

> Request/Response mit Polling kennzeichnet Modbus, Publish/Subscribe über einen Vermittler (Broker) MQTT, der Adressraum mit Typinformationen und Zertifikaten OPC UA. Feldbus und Industrial Ethernet stehen für zyklischen, zeitlich vorhersagbaren Austausch. Typische Verwechslung: Bei Modbus und OPC UA fragt ein Client ab (Request/Response), bei MQTT veröffentlicht der Sender von sich aus und weiß nicht, wer mitliest. Die Modbus-Rollen heißen je nach Quelle Master/Slave oder Client/Server und meinen dasselbe Prinzip.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-16 · Industrie- und IoT-Protokolle (Mittel)

*Welches Protokoll passt zu welcher Anforderung aus einem Einbindungsprojekt?*

| Begriff | Zone |
| --- | --- |
| Presse liefert Werte an Leitstand, MES und Auswertung, ohne mehrfach abgefragt zu werden | MQTT |
| Neue Abonnenten erhalten sofort den zuletzt gemeldeten Wert (Retained Message) | MQTT |
| Alter Energiezähler mit RS-485, der Halteregister per Funktionscode 3 bereitstellt | Modbus |
| Werte um Faktor 10 zu groß, weil der Faktor aus der Registerbeschreibung fehlt | Modbus |
| Leitsystem liest Maschinen verschiedener Hersteller über einen gesicherten Standard aus | OPC UA |
| Maschine bietet Messwerte mit Name, Datentyp und Einheit als strukturierte Datenpunkte an | OPC UA |
| Antriebsregelung braucht garantierte Zykluszeit von wenigen Millisekunden zur SPS | Feldbus/Industrial Ethernet |
| SPS tauscht zyklisch im Echtzeittakt Daten mit dezentralen Ein-/Ausgabebaugruppen aus | Feldbus/Industrial Ethernet |

**Erklärung (so sehen Lernende sie):**

> Entscheidend ist die Anforderung: Viele Empfänger und Änderungsmeldungen sprechen für MQTT, Altgeräte mit Registern für Modbus (über ein Gateway), herstellerübergreifende Daten mit Bedeutung und Sicherheit für OPC UA, harte Zeitanforderungen für Feldbus oder Industrial Ethernet. Typische Verwechslung: MQTT und OPC UA können beide Daten verteilen, aber nur OPC UA beschreibt Typ, Einheit und Beziehungen selbst mit; bei MQTT legt man Topic- und Nutzlastformat selbst fest, und bei Modbus steht die Bedeutung nur in der Dokumentation.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-17 · Industrie- und IoT-Protokolle (Schwer)

*Ordne die Merkmale zu und achte auf die feinen Unterschiede.*

| Begriff | Zone |
| --- | --- |
| Verbindung zwischen SPS und Antrieb über PROFINET | Feldbus/Industrial Ethernet |
| EtherCAT-Segment einer Verpackungsmaschine mit festem Zyklustakt | Feldbus/Industrial Ethernet |
| Serieller Bus mit Slave-Adressen von 1 bis 247 und 16-Bit-Registern | Modbus |
| 32-Bit-Wert verteilt sich auf zwei Register, Byte- und Wortreihenfolge müssen passen | Modbus |
| Abonnement werk1/halle2/# empfängt alle Topics unterhalb von halle2 | MQTT |
| QoS 1 stellt mindestens einmal zu, Duplikate sind möglich | MQTT |
| Klassisch Client/Server, zusätzlich auch eine Publish/Subscribe-Variante | OPC UA |
| Daten als Knoten in einem Adressraum mit Namen, Typ und Beziehungen | OPC UA |

**Erklärung (so sehen Lernende sie):**

> PROFINET und EtherCAT sind Industrial-Ethernet-Verfahren mit Echtzeitanspruch. Modbus zeigt sich an Slave-Adressen und Registern, bei Werten über 16 Bit an der Wort- und Byte-Reihenfolge. Platzhalter (+ und #), QoS-Stufen und Topics sind MQTT. OPC UA ist klassisch Client/Server und kennt zusätzlich Publish/Subscribe, ist deshalb aber nicht MQTT, denn die Datenpunkte sind selbstbeschreibend modelliert. Typische Verwechslung: PROFINET (Ethernet-basiert, Industrial Ethernet) und PROFIBUS (serieller Feldbus) tragen ähnliche Namen, gehören hier aber beide zur Zone Feldbus/Industrial Ethernet, nicht zu Modbus.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Zonenkonzept IT/OT (4 Fragen) — Zonen: Büro-IT · DMZ (Übergang) · Produktionsnetz (Leitebene) · Zelle/Feldebene

**Besonders prüfen:**
- ⚠ Vereinfachung: MES liegt hier mit dem Leitsystem im Produktionsnetz (Tabelle in 8.3, Q-8.3-13), obwohl die Pyramide es als eigene Ebene führt; IEC 62443 zoniert nach Schutzbedarf, nicht nach Pyramidenebene.
- ⚠ Der Begriff „Conduit“ steht nur in den Erklärungen der Fragen, nicht in der Kurstheorie.
- ⚠ Funk-Gateway mit 40 Sensoren als Zelle/Feldebene (Inventarliste in 8.2).

#### Q-8.3-15 · Zonenkonzept IT/OT (Leicht)

*Ordne die Systeme der passenden Zone zu.*

| Begriff | Zone |
| --- | --- |
| Mailserver des Unternehmens | Büro-IT |
| ERP-System mit Auftrags- und Finanzdaten | Büro-IT |
| Jump-Host, über den Lieferanten Wartungssitzungen beginnen | DMZ (Übergang) |
| Datenbroker, der Produktionsdaten für die Auswertung bereitstellt | DMZ (Übergang) |
| Leitsystem-Server (SCADA) der Halle | Produktionsnetz (Leitebene) |
| MES-Server für Fertigungsaufträge | Produktionsnetz (Leitebene) |
| SPS einer Montagezelle | Zelle/Feldebene |
| Antriebe und Feldgeräte einer Anlage | Zelle/Feldebene |

**Erklärung (so sehen Lernende sie):**

> Der Kurs verwendet in diesem Thema eine vereinfachte Vierteilung: Unternehmenszone (Büro-IT), Übergangszone (Industrial DMZ), Produktionszone und Zellenzone. Sie ist an die Ebenen der Automatisierungspyramide angelehnt, folgt ihnen aber nicht eins zu eins: Das MES liegt hier gemeinsam mit dem Leitsystem im Produktionsnetz, und die Zelle fasst Steuerungen und Feldgeräte zusammen. Die Normenreihe IEC 62443 teilt Zonen dagegen nach Schutzbedarf ein und verbindet sie über kontrollierte Übergänge (Conduits); eine Zone muss dort also nicht einer Pyramidenebene entsprechen. Typische Verwechslung: Jump-Host und Datenbroker sind „Produktions-IT“, stehen aber bewusst in der DMZ, damit keine direkte Verbindung zwischen Büro und Produktion nötig ist.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-16 · Zonenkonzept IT/OT (Mittel)

*Ordne die Anforderungen und Systeme der Zone zu, zu der sie passen.*

| Begriff | Zone |
| --- | --- |
| Hier gelten klassischer IT-Schutz, regelmäßige Updates und Virenschutz | Büro-IT |
| Büroarbeitsplätze mit E-Mail und Internetzugang | Büro-IT |
| Pufferzone: Nichts geht direkt von der Büro-IT in die Produktion durch | DMZ (Übergang) |
| Update-Server, der Patches für Produktionssysteme bereitstellt | DMZ (Übergang) |
| Bedienplatz im Leitstand zur Überwachung der Anlage | Produktionsnetz (Leitebene) |
| Segment mit hohem Schutz und hoher Verfügbarkeit für die zentrale Anlagenüberwachung | Produktionsnetz (Leitebene) |
| Sehr hohe Verfügbarkeitsanforderung bei begrenztem eigenem Schutz der Geräte | Zelle/Feldebene |
| Altsteuerung ohne Sicherheitsfunktionen, nur über die Netzstruktur geschützt | Zelle/Feldebene |

**Erklärung (so sehen Lernende sie):**

> In der Büro-IT zählt der klassische Schutz der Daten. Die DMZ vermittelt zwischen IT und OT; sie hält Dienste vor, die beide Seiten brauchen, damit nie eine direkte Verbindung durch alle Zonen führt. Das Produktionsnetz schützt Leitsysteme mit hoher Verfügbarkeit. In der Zelle sitzen Steuerungen und Antriebe, deren eigener Schutz oft begrenzt ist (Altgeräte) und die deshalb durch Netzstruktur und Firewall geschützt werden. Hinweis zur Vereinfachung: Die Vierteilung ist eine Lehrform; IEC 62443 definiert Zonen nach Schutzbedarf, nicht nach der Ebene der Automatisierungspyramide. Typische Verwechslung: „Hohe Verfügbarkeit“ gilt sowohl für das Produktionsnetz als auch für die Zelle; in der Zelle ist sie noch wichtiger, der eigene Geräteschutz aber geringer.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-17 · Zonenkonzept IT/OT (Mittel)

*Ordne die Systeme eines Werks der Hallbach Kunststofftechnik den Zonen zu.*

| Begriff | Zone |
| --- | --- |
| Dateiserver mit Angebotsvorlagen und Projektunterlagen | Büro-IT |
| Personalverwaltung und Lohnabrechnung | Büro-IT |
| Auswertungsplattform, die Messwerte per MQTT aus der Produktion annimmt | DMZ (Übergang) |
| VPN-Endpunkt, an dem der Maschinenhersteller seine Fernwartung beginnt | DMZ (Übergang) |
| Datenbank der Fertigung mit Messwerten und Chargendaten | Produktionsnetz (Leitebene) |
| Server, der Fertigungsaufträge an die Anlagen freigibt | Produktionsnetz (Leitebene) |
| Robotersteuerung der Schweißzelle | Zelle/Feldebene |
| Sensoren und Aktoren einer Presse, direkt an der Steuerung | Zelle/Feldebene |
| Frequenzumrichter einer Verpackungslinie | Zelle/Feldebene |

**Erklärung (so sehen Lernende sie):**

> Büro-Systeme (Dateiserver, Personalverwaltung) liegen in der Unternehmenszone. Die Auswertungsplattform und der VPN-Endpunkt für Lieferanten stehen in der DMZ, weil dort kontrolliert wird, was zwischen IT und OT fließen darf; die Produktion baut dabei möglichst selbst die Verbindung zur Auswertung auf, statt dass von außen auf sie zugegriffen wird. Datenbank und Auftragsfreigabe gehören ins Produktionsnetz, Steuerung, Sensorik, Aktorik und Antriebe in die Zelle. Typische Verwechslung: Die Auswertungsplattform „gehört“ fachlich zur Produktion, wird aber als vermittelnder Dienst in der DMZ betrieben. Auch hier gilt die Vereinfachung: IEC 62443 bildet Zonen nach Schutzbedarf, nicht nach Systemart.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-18 · Zonenkonzept IT/OT (Schwer)

*Ordne die Systeme und Anforderungen zu und achte auf die Abgrenzung der Zonen.*

| Begriff | Zone |
| --- | --- |
| Büro-Notebook, das E-Mail-Anhänge öffnet und im Internet surft | Büro-IT |
| Domänencontroller mit den Benutzerkonten der Verwaltung | Büro-IT |
| Datensammler, den Büro-Systeme abfragen, ohne die Anlage selbst zu erreichen | DMZ (Übergang) |
| Vermittelnder Dienst, der selbst keine Verbindung in die Zellen aufbauen darf | DMZ (Übergang) |
| Rechner, der Alarme der ganzen Halle sammelt, quittieren lässt und archiviert | Produktionsnetz (Leitebene) |
| Qualitätsdatenerfassung über mehrere Maschinen einer Halle | Produktionsnetz (Leitebene) |
| Funk-Gateway, das Messwerte von 40 Sensoren einer Anlage sammelt | Zelle/Feldebene |
| Maschinensteuerung, die nur mit ihrer Zelle und dem Leitsystem kommuniziert | Zelle/Feldebene |

**Erklärung (so sehen Lernende sie):**

> Das Büro-Notebook ist das typische Einfallstor und hat deshalb keine direkte Verbindung zu Steuerungen; Default Deny an jedem Übergang. Datensammler und der vermittelnde Dienst sind das Wesen der DMZ: Sie entkoppeln Büro und Produktion, ohne dass eine durchgehende Verbindung entsteht. Alarme und Qualitätsdaten einer ganzen Halle liegen im Produktionsnetz, das Funk-Gateway und die Maschinensteuerung in der Zelle (das Funk-Gateway steht in der Inventarliste von Thema 8.2 auf der Feldebene). Typische Verwechslung: Weil das Funk-Gateway „kommuniziert“, wird es leicht der DMZ zugeordnet; die DMZ vermittelt aber zwischen IT und OT, ein Gateway an der Anlage sitzt in der Zelle. Hinweis: IEC 62443 legt Zonen nach Schutzbedarf fest und kann daher mehr oder andere Zonen vorsehen als diese vereinfachte Vierteilung.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 2. Neue Theorieabschnitte

Keine: Die Theorie zu den neuen Instrumenten war in den Themen bereits vorhanden (die Fragen verweisen darauf).

## 3. Troubleshooting-Set „Industrie und IoT“ (Spiel „Troubleshooting-Detektiv“, Kurs Digitale Vernetzung)

Je Fall: erst die **Schicht** wählen, dann die **wahrscheinlichste Ursache**. Es gibt je Fall genau eine richtige Antwort; die Schichten sind dieselben OSI-Schichten wie im Netzwerk-Set (nur Schichten 1, 2, 3, 4 und 7 stehen zur Auswahl). Zu prüfen: Ist die Fehlerursache aus den Symptomen eindeutig ableitbar, die Schicht vertretbar und die Erklärung fachlich richtig?

**Zum Set — besonders prüfen:**
- ⚠ Fall 8: Ein abgelaufenes Zertifikat gehört fachlich eher zu Sitzung/Darstellung (OSI 5/6); hier der Anwendungsschicht zugeordnet, weil das Set keine Schichten 5/6 anbietet. Ist der Statuscode `BadCertificateTimeInvalid` plausibel, und lehnt der Server ein abgelaufenes Client-Zertifikat ab?
- ⚠ Fall 7: Das Broker-Log „Subscribe … verweigert“ ist vereinfacht; je nach Broker/MQTT-Version steht eine verweigerte Subscription nur im SUBACK-Code oder wird nicht geloggt.
- ⚠ Fall 10: Verhalten des Brokers bei persistenter Sitzung mit QoS 1 (Queue ohne Limit, ca. 4,9 Mio. Nachrichten, 1,8 GB, Swap aktiv) — Realismus und Zahlen prüfen.
- ⚠ Fall 5: Grauzone „falsche Zeitzone“ gegen „freilaufende Uhr“ — abgegrenzt über „Zeitstempel in der Zukunft“, wachsende Abweichung, kein voller Stundenwert.
- ⚠ Fall 1: 4–20-mA-Schleife ist kein Netzwerk; auf Schicht 1 gelegt, die Erklärung sagt das ausdrücklich. Die Messungen im Schaltschrank setzen „Anlage freischalten, nur befugtes Personal“ voraus — reicht das?
- ⚠ Fälle 2 und 3 ähneln dem Netzwerk-Set (VLAN, Adresskonflikt), hier mit industriellem Kontext und anderer Beweisführung.

#### industrie-iot · 1 — Druck bleibt bei 0 bar

*Du bist für die Brevanta IT-Systemhaus GmbH bei der Hallbach Kunststofftechnik GmbH im Einsatz. Im Leitstand zeigt der Hydraulikdruck der Presse 04 seit dem Frühdienst 0,0 bar, obwohl die Presse normal arbeitet. Alle übrigen Werte der Presse werden korrekt angezeigt.*

**Symptome:**
- Das mechanische Manometer an der Hydraulikleitung zeigt etwa 6,5 bar; im Leitstand steht 0,0 bar, ohne Fehlermeldung.
- Die Analogbaugruppe der SPS meldet für den Kanal des Drucksensors (4–20 mA entsprechen 0–10 bar) einen Strom von 0,0 mA; die anderen Kanäle derselben Baugruppe liefern plausible Werte.
- Im Schaltschrank liegen an der Klemme des Sensorkabels 24 V DC an; am Sensorstecker vor Ort ist keine Spannung messbar.
- Ein Ersatzsensor am selben Kabel liefert ebenfalls 0,0 mA; die Durchgangsprüfung des freigeschalteten Kabels zeigt bei einer Ader keinen Durchgang.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Anwendung (Schicht 7) | Der Drucksensor ist defekt. |
| ✔ Bitübertragung (Schicht 1) | ✔ Eine Ader der Sensorleitung ist unterbrochen (Drahtbruch im 4–20-mA-Stromkreis). |
| Vermittlung (Schicht 3) | Die Skalierung im Leitstand ist falsch eingestellt. |
| Sicherung (Schicht 2) | Der Industrie-Switch zwischen SPS und Leitstand ist ausgefallen. |

**Richtig:** Bitübertragung (Schicht 1) → Eine Ader der Sensorleitung ist unterbrochen (Drahtbruch im 4–20-mA-Stromkreis).

**Erklärung:**

> Ein 4–20-mA-Signal liegt im Normalbetrieb immer zwischen 4 und 20 mA; 0 mA ist kein Messwert, sondern zeigt einen unterbrochenen Stromkreis (Drahtbruch). Die übrigen Kanäle der Baugruppe arbeiten, die SPS ist also in Ordnung; ein Switchausfall würde alle Werte der Presse treffen, und eine falsche Skalierung im Leitstand ändert das Signal an der SPS nicht. Der Ersatzsensor liefert ebenfalls 0 mA und schließt den Sensor aus; Spannung im Schrank, aber nicht am Sensor, und die fehlende Ader belegen den Leitungsbruch. Das ist kein Netzwerkprotokoll, sondern die physikalische Leitung (unterste Ebene). Maßnahme: Anlage freischalten (nur befugtes Personal), Kabel ersetzen; Werte unter 4 mA künftig als ungültig kennzeichnen statt „0 bar“ anzuzeigen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 2 — Neues Gateway sieht die Steuerung nicht

*Bei der Hallbach Kunststofftechnik GmbH wurde für die Spritzgießmaschine 07 ein neues Edge-Gateway an einem Industrie-Switch in Betrieb genommen. Es soll per Modbus TCP Werte der Maschinensteuerung lesen, meldet aber „Gegenstelle nicht erreichbar“. Das Maschinennetz ist laut Netzplan das VLAN 10 mit 10.10.10.0/24.*

**Symptome:**
- Link-LED am Gateway und Portstatus „up“ (1 Gbit/s, Vollduplex); keine Fehlerzähler am Port.
- Das Gateway hat laut Planung die feste Adresse 10.10.10.50/24; ping 10.10.10.20 (Maschinensteuerung) endet mit einer Zeitüberschreitung, arp -a zeigt für 10.10.10.20 keinen Eintrag.
- Die Portkonfiguration zeigt für den Gateway-Port „Access-VLAN 20 (Büro-IT)“; die Ports der Steuerungen stehen auf „Access-VLAN 10“.
- Wird das Gateway testweise an einen freien Port mit Access-VLAN 10 gesteckt, funktioniert der Ping auf die Steuerung sofort.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Transport (Schicht 4) | Das Patchkabel des Gateways ist defekt. |
| Anwendung (Schicht 7) | Die Maschinensteuerung ist ausgefallen. |
| ✔ Sicherung (Schicht 2) | ✔ Der Switchport des Gateways ist dem falschen VLAN (20 statt 10) zugeordnet. |
| Bitübertragung (Schicht 1) | Die Subnetzmaske des Gateways ist falsch eingetragen. |

**Richtig:** Sicherung (Schicht 2) → Der Switchport des Gateways ist dem falschen VLAN (20 statt 10) zugeordnet.

**Erklärung:**

> Link und Portstatus sind in Ordnung, ein Kabelfehler (Schicht 1) scheidet aus. Adresse und Maske /24 passen zum Maschinennetz, daher liegt auch kein Konfigurationsfehler in der IP-Adressierung vor. Die Steuerung läuft, denn am Port mit VLAN 10 antwortet sie sofort. Entscheidend ist die Portkonfiguration: VLANs trennen Netze auf Schicht 2. Die ARP-Anfrage des Gateways landet in VLAN 20 und erreicht die Steuerung nie, deshalb gibt es keinen ARP-Eintrag. Maßnahme: Konfiguration des Switches vorher sichern, den Port als Access-Port in VLAN 10 setzen, danach Verbindung testen und Netzplan sowie Portbeschriftung anpassen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 3 — Fördertechnik meldet zeitweise Störung

*Im Leitstand der Hallbach Kunststofftechnik GmbH erscheint seit gestern Nachmittag immer wieder „Kommunikationsstörung Fördertechnik“, meist nur für wenige Sekunden. Die Steuerung der Fördertechnik hat die feste Adresse 10.10.10.30. Am Vortag wurde in Halle 3 ein defektes Bedienpanel gegen ein Gerät aus dem Lager getauscht.*

**Symptome:**
- Link-LEDs an Steuerung und Switch leuchten stabil; die Switchports zeigen weder Link-Wechsel noch Fehlerzähler.
- ping 10.10.10.30 liefert abwechselnd Antworten und Zeitüberschreitungen; die Antworten kommen mit normaler Laufzeit (1 ms).
- arp -a am Leitstandrechner zeigt für 10.10.10.30 im Wechsel zwei verschiedene MAC-Adressen.
- Die zweite MAC-Adresse gehört laut Switch-Tabelle zu einem Port in Halle 3, an dem das Ersatz-Bedienpanel hängt.
- Wird das Netzwerkkabel des Ersatzpanels testweise gezogen, antwortet 10.10.10.30 wieder stabil.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Bitübertragung (Schicht 1) | ✔ Steuerung und Ersatz-Bedienpanel verwenden dieselbe feste IP-Adresse (10.10.10.30). |
| ✔ Vermittlung (Schicht 3) | Das Netzwerkkabel der Steuerung hat einen Wackelkontakt. |
| Anwendung (Schicht 7) | Der DHCP-Server vergibt Adressen doppelt. |
| Transport (Schicht 4) | Der Industrie-Switch ist überlastet. |

**Richtig:** Vermittlung (Schicht 3) → Steuerung und Ersatz-Bedienpanel verwenden dieselbe feste IP-Adresse (10.10.10.30).

**Erklärung:**

> Stabile Link-LEDs und fehlerfreie Ports sprechen gegen einen Wackelkontakt (Schicht 1). Eine Überlast des Switches würde Antwortzeiten erhöhen, hier sind sie normal. Die Adresse der Steuerung ist fest eingestellt, ein DHCP-Fehler passt deshalb nicht. Zwei verschiedene MAC-Adressen für dieselbe IP-Adresse sind das typische Bild eines IP-Adresskonflikts: Mal antwortet die Steuerung, mal das Panel, das mit der Adresse aus dem Lager mitgebracht wurde. Der Test mit gezogenem Panelkabel bestätigt es. Das Problem liegt in der Adressierung (Schicht 3). Maßnahme: dem Panel eine freie Adresse geben, die Adressliste (IP-Plan) pflegen und Ersatzteile vor dem Einbau auf Standardeinstellungen prüfen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 4 — Modbus-Verbindung kommt nicht zustande

*Nach der Einführung einer Firewall zwischen Maschinennetz (10.10.10.0/24) und IT-Netz (10.20.5.0/24) liefert das Edge-Gateway 10.20.5.10 bei der Hallbach Kunststofftechnik GmbH keine Werte der Presse 04 mehr. Laut Kommunikationsmatrix baut das Gateway die Modbus-TCP-Verbindung zur Presse (10.10.10.20, Port 502) auf.*

**Symptome:**
- ping 10.10.10.20 und traceroute vom Gateway aus erreichen die Steuerung der Presse ohne Probleme.
- Die Portprüfung vom Gateway auf TCP 502 der Presse endet nach der Wartezeit mit „TcpTestSucceeded: False“; die Weboberfläche der Steuerung auf Port 443 ist vom Gateway aus erreichbar.
- Ein Modbus-Testclient, der direkt im Maschinennetz an der Steuerung hängt, liest die Register ohne Fehler.
- Im Log der Firewall steht: „Drop TCP 10.20.5.10 → 10.10.10.20:502, Regel: Default-Deny“.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Vermittlung (Schicht 3) | Die Modbus-Funktion der Steuerung ist deaktiviert. |
| Sicherung (Schicht 2) | ✔ Die Firewall lässt TCP-Port 502 vom Gateway zur Presse nicht durch (Freigabe fehlt). |
| Bitübertragung (Schicht 1) | Zwischen IT-Netz und Maschinennetz fehlt eine Route. |
| ✔ Transport (Schicht 4) | Die Subnetzmaske des Gateways ist falsch eingetragen. |

**Richtig:** Transport (Schicht 4) → Die Firewall lässt TCP-Port 502 vom Gateway zur Presse nicht durch (Freigabe fehlt).

**Erklärung:**

> Der Ping und traceroute gelingen, damit sind Verkabelung, Routing und Adressierung in Ordnung (Schicht 1 bis 3); eine fehlende Route oder eine falsche Maske scheiden aus. Die Steuerung selbst läuft: Der Testclient im Maschinennetz liest die Register, die Modbus-Funktion ist also aktiv. Nur der Port 502 ist über die Zonengrenze nicht erreichbar, während Port 443 desselben Geräts durchkommt, und das Firewall-Log zeigt das Verwerfen durch die Standardregel. Ports gehören zur Transportschicht (Schicht 4). Maßnahme: Die in der Kommunikationsmatrix beschriebene Verbindung als Regel freigeben (nur vom Gateway zur Presse, nur TCP 502) und die Änderung dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 5 — Uhrzeit der Messwerte weicht ab

*Der Leitstand der Hallbach Kunststofftechnik GmbH zeigt Messwerte der Presse 04 mit Zeitstempeln, die in der Zukunft liegen. Die Werte der anderen Gateways im Werk haben korrekte Zeiten. In der Ereignisliste erscheint deshalb ein Alarm der Presse scheinbar vor seiner Ursache.*

**Symptome:**
- Die Zeitstempel der Werte vom Edge-Gateway der Presse 04 liegen 3 Minuten und 40 Sekunden vor der Leitstandszeit; vor drei Tagen waren es noch etwa 1 Minute, die Abweichung wächst langsam.
- ping zum Zeitserver 10.20.0.2 funktioniert; ein anderes Gerät im selben Netz wie das Gateway gleicht seine Uhr erfolgreich ab (Abweichung unter 1 Sekunde).
- Die Werte treffen im Sekundentakt ein; die Laufzeit zwischen Gateway und Leitstand beträgt wenige Millisekunden.
- In der Zeiteinstellung des Gateways ist als Zeitquelle „lokale Systemuhr“ eingetragen, ein Zeitserver fehlt; das Gerät wurde vor drei Wochen mit Werkseinstellungen in Betrieb genommen.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Transport (Schicht 4) | ✔ Das Gateway ist nicht mit einem Zeitserver synchronisiert; seine Uhr läuft frei und driftet. |
| ✔ Anwendung (Schicht 7) | Der Zeitserver im Werk liefert eine falsche Uhrzeit. |
| Bitübertragung (Schicht 1) | Die Übertragung der Messwerte ist durch Netzlatenz verzögert. |
| Vermittlung (Schicht 3) | Zeitzone oder Sommerzeit sind im Gateway falsch eingestellt. |
| Sicherung (Schicht 2) |  |

**Richtig:** Anwendung (Schicht 7) → Das Gateway ist nicht mit einem Zeitserver synchronisiert; seine Uhr läuft frei und driftet.

**Erklärung:**

> Eine Verzögerung im Netz würde Zeitstempel in der Vergangenheit erzeugen, hier liegen sie in der Zukunft; zudem sind die Laufzeiten kurz. Ein falscher Zeitserver scheidet aus, weil andere Geräte sich erfolgreich abgleichen. Eine falsche Zeitzone ergäbe eine feste Abweichung von ganzen Stunden, die Abweichung hier ist kein Stundenwert und wächst. Zusammen mit der Konfiguration (Zeitquelle lokale Uhr) bleibt: Die Uhr läuft frei und driftet. Wer Ereignisse mehrerer Systeme auswertet, braucht eine gemeinsame Zeitbasis, sonst werden Ursache und Wirkung vertauscht. Maßnahme: NTP-Zeitserver eintragen (UDP 123 laut Matrix), Abweichung überwachen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 6 — Temperatur um den Faktor 10 zu klein

*Im Leitstand der Hallbach Kunststofftechnik GmbH zeigt die Zylindertemperatur der Spritzgießmaschine 07 nur 21,5 °C statt der erwarteten Werte um 215 °C. Das Edge-Gateway wurde am Vortag mit einer neuen Konfiguration für diese Maschine versehen; die Verbindung zur Steuerung besteht.*

**Symptome:**
- Das Display der Steuerung zeigt 215 °C, der Leitstand 21,5 °C. Die Kurve im Leitstand steigt und fällt im gleichen Verlauf wie die echte Temperatur, nur auf einem Zehntel.
- Ein Modbus-Testclient liest Holding-Register 100 der Steuerung und erhält den Rohwert 2150; laut Schnittstellenbeschreibung der Steuerung liegen Temperaturen in Zehntelgrad vor.
- Im Mapping des Gateways steht für den Datenpunkt „Zylindertemperatur“: Register 100, Typ UInt16, Skalierungsfaktor 0,01.
- Ping, Port 502 und die Aktualisierung im Sekundentakt arbeiten fehlerfrei; die Werte anderer Datenpunkte (Drehzahl, Druck) sind richtig.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| ✔ Anwendung (Schicht 7) | Der Temperaturfühler ist falsch kalibriert. |
| Sicherung (Schicht 2) | Das Gateway liest das falsche Register. |
| Vermittlung (Schicht 3) | ✔ Das Gateway rechnet den Rohwert mit dem falschen Skalierungsfaktor um (0,01 statt 0,1). |
| Transport (Schicht 4) | Zeitüberschreitungen im Netz verfälschen die Werte. |
| Bitübertragung (Schicht 1) |  |

**Richtig:** Anwendung (Schicht 7) → Das Gateway rechnet den Rohwert mit dem falschen Skalierungsfaktor um (0,01 statt 0,1).

**Erklärung:**

> Die Datenübertragung funktioniert: Ping, Port, Aktualisierungstakt und die anderen Datenpunkte sind in Ordnung, also liegt weder ein Netz- noch ein Verbindungsproblem vor. Der Rohwert im richtigen Register ist 2150, das Display der Steuerung zeigt 215 °C, damit ist weder der Fühler falsch kalibriert noch das falsche Register gelesen. Der Fehler entsteht erst bei der Umrechnung: 2150 × 0,1 = 215,0 °C, mit 0,01 ergeben sich 21,5 °C. Das ist ein Fehler im Datenmapping auf der Anwendungsebene. Mit der Plausibilisierung (Vergleich mit dem Display) fällt er auf. Maßnahme: Faktor im Mapping korrigieren, danach Ende-zu-Ende prüfen und die Schnittstellenbeschreibung aktualisieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 7 — Energie-Dashboard bleibt leer

*Für das neue Energie-Dashboard der Hallbach Kunststofftechnik GmbH wurde ein Dienst eingerichtet, der Messwerte zur Stromaufnahme vom MQTT-Broker abonnieren soll. Der Dienst startet ohne Fehlermeldung, aber im Dashboard erscheinen keine Werte. Die Gateways veröffentlichen die Werte unter werk1/halle2/energie/…*

**Symptome:**
- Der Dienst baut die Verbindung zum Broker (Port 8883) erfolgreich auf; Benutzername und Passwort werden akzeptiert.
- Ein Test-Abonnent, der sich mit dem Administrator-Konto auf werk1/halle2/energie/# anmeldet, erhält die Werte im Sekundentakt.
- Der Dienst abonniert dasselbe Topic werk1/halle2/energie/#; die Schreibweise stimmt mit den veröffentlichten Topics überein.
- Im Broker-Log steht für den Benutzer „dashboard“: „Subscribe auf werk1/halle2/energie/# verweigert“; die Zugriffsliste erlaubt diesem Benutzer nur das Lesen von werk1/halle2/prozess/#.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Vermittlung (Schicht 3) | Der MQTT-Broker ist ausgefallen. |
| Transport (Schicht 4) | Eine Firewall blockiert den Port 8883. |
| Bitübertragung (Schicht 1) | Die Gateways veröffentlichen keine Energiewerte. |
| Sicherung (Schicht 2) | ✔ Dem Benutzer des Dashboards fehlt in der Zugriffsliste des Brokers die Leseberechtigung für dieses Topic. |
| ✔ Anwendung (Schicht 7) |  |

**Richtig:** Anwendung (Schicht 7) → Dem Benutzer des Dashboards fehlt in der Zugriffsliste des Brokers die Leseberechtigung für dieses Topic.

**Erklärung:**

> Die Verbindung steht und die Anmeldung gelingt, der Broker läuft also und der Port ist offen (Transport und darunter in Ordnung). Der Test-Abonnent mit Administrator-Konto bekommt die Werte, die Gateways veröffentlichen sie demnach. Die Topic-Schreibweise stimmt. Übrig bleibt die Autorisierung: Anmeldung (wer bin ich) und Berechtigung (was darf ich) sind getrennte Schritte, und das Broker-Log nennt die Verweigerung. Das ist eine Frage der Anwendung (Broker-Konfiguration). Maßnahme: der Zugriffsliste für den Benutzer „dashboard“ gezielt Lesen auf werk1/halle2/energie/# hinzufügen (nur so viel wie nötig), danach testen und die Kommunikationsmatrix anpassen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 8 — OPC UA bricht beim Verbindungsaufbau ab

*Seit Montag um Mitternacht erhält das MES der Hallbach Kunststofftechnik GmbH keine Fertigungsdaten mehr von der Abfüllanlage. Die Anbindung läuft über OPC UA zwischen einem Adapter-Dienst (Client) und dem OPC-UA-Server der Anlage. Am Wochenende wurde nichts geändert.*

**Symptome:**
- ping auf den OPC-UA-Server funktioniert; die Portprüfung auf TCP 4840 ist erfolgreich (TcpTestSucceeded: True).
- Im Log des Adapter-Dienstes steht seit Montag 00:00:04 bei jedem Verbindungsversuch: „Sichere Verbindung abgelehnt: BadCertificateTimeInvalid“.
- Das Zertifikat des Adapter-Dienstes ist laut Zertifikatsspeicher „gültig bis Sonntag 23:59 Uhr“ und wurde vor genau einem Jahr ausgestellt.
- Die Systemzeit des Adapter-Rechners ist korrekt (Abweichung unter 1 Sekunde zum Zeitserver).
- Ein Diagnose-Client mit gültigem Zertifikat kann die Knoten des Servers von einem anderen Rechner aus lesen.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Sicherung (Schicht 2) | Eine Firewall blockiert den Port 4840. |
| ✔ Anwendung (Schicht 7) | ✔ Das Zertifikat des OPC-UA-Clients ist abgelaufen; der Server lehnt die sichere Verbindung ab. |
| Transport (Schicht 4) | Die Uhr des Adapter-Rechners geht falsch. |
| Bitübertragung (Schicht 1) | Der OPC-UA-Server der Anlage ist ausgefallen. |
| Vermittlung (Schicht 3) |  |

**Richtig:** Anwendung (Schicht 7) → Das Zertifikat des OPC-UA-Clients ist abgelaufen; der Server lehnt die sichere Verbindung ab.

**Erklärung:**

> Bis zum Verbindungsaufbau auf Port 4840 ist alles in Ordnung: Ping und Portprüfung gelingen, Firewall und Netz sind also nicht schuld. Der Server läuft, ein Diagnose-Client mit gültigem Zertifikat liest ihn problemlos. Die Systemzeit des Adapters stimmt, eine falsche Uhr (die ein Zertifikat fälschlich als abgelaufen erscheinen ließe) scheidet damit aus. Das Log nennt den ungültigen Zeitraum, und das Zertifikat war bis Sonntag 23:59 Uhr gültig: Es ist schlicht abgelaufen, genau zum Ablaufzeitpunkt begann die Störung. Das ist ein Problem der Anwendung (OPC UA, sicherer Kanal). Maßnahme: neues Zertifikat ausstellen und auf dem Server als vertrauenswürdig hinterlegen; Ablaufdaten in einem Zertifikatsinventar überwachen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 9 — Werte stehen seit Mittag still

*Im Leitstand der Hallbach Kunststofftechnik GmbH stehen alle Messwerte der Halle 2 seit 13:12 Uhr unverändert, auch der Zeitstempel bleibt stehen. Alarme gibt es keine. Die Werte aus Halle 1 aktualisieren sich normal. Die Daten laufen von der SPS über das Edge-Gateway der Halle 2 zum MQTT-Broker und von dort zum Leitstand.*

**Symptome:**
- Ein Test-Abonnent auf dem Broker erhält für Topics aus Halle 1 laufend neue Nachrichten, für Topics aus Halle 2 seit 13:12 Uhr keine mehr; der Broker zeigt sonst keine Auffälligkeiten.
- Ein Modbus-Testclient im Maschinennetz liest die Register der SPS der Halle 2: Die Werte ändern sich laufend (z. B. 78,9 °C, im Leitstand steht seit 13:12 Uhr 74,2 °C).
- Vom Gateway aus gelingen der Verbindungstest zum Broker (TCP 8883) und zur SPS (TCP 502).
- Der Dienst „Gateway-Anwendung“ steht im Status „läuft“, belegt aber dauerhaft einen CPU-Kern zu 100 %; das Log der Anwendung enthält seit 13:12 Uhr keinen Eintrag mehr.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Transport (Schicht 4) | Der MQTT-Broker ist ausgefallen. |
| Vermittlung (Schicht 3) | Die Sensoren der Halle 2 liefern einen konstanten Wert. |
| ✔ Anwendung (Schicht 7) | Eine Firewall blockiert die Verbindung zwischen Gateway und Broker. |
| Sicherung (Schicht 2) | ✔ Die Anwendung auf dem Edge-Gateway hängt und veröffentlicht keine neuen Werte mehr. |
| Bitübertragung (Schicht 1) |  |

**Richtig:** Anwendung (Schicht 7) → Die Anwendung auf dem Edge-Gateway hängt und veröffentlicht keine neuen Werte mehr.

**Erklärung:**

> Die Ende-zu-Ende-Prüfung grenzt die Stelle ein: An der SPS ändern sich die Werte, am Broker kommen sie nicht mehr an, die Lücke liegt also dazwischen. Konstante Sensorwerte scheiden damit aus. Der Broker arbeitet für Halle 1 normal, und die Verbindungstests vom Gateway zu Broker und SPS gelingen, daher sind Broker, Firewall und Netz nicht die Ursache. Der Prozess steht auf „läuft“, verbraucht aber Rechenzeit ohne Lebenszeichen im Log, typisch für eine hängende Anwendung. Ein laufender Prozess ist kein funktionierender. Maßnahme: nach Absprache mit dem Anlagenverantwortlichen Log sichern und Dienst neu starten, Ursache klären (Update?) und die Aktualität der Werte überwachen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### industrie-iot · 10 — Broker wird immer langsamer

*Beim MQTT-Broker der Hallbach Kunststofftechnik GmbH steigt seit dem Morgen die Verzögerung: Messwerte erreichen den Leitstand mit zunehmender Verspätung, gegen 07:00 Uhr droht der Broker-Dienst auszufallen. Gestern Abend um 22:00 Uhr wurde der MES-Adapter für Wartungsarbeiten abgeschaltet.*

**Symptome:**
- Der Broker-Rechner hat 97 % des Arbeitsspeichers belegt, der Broker-Prozess allein 1,8 GB; das Betriebssystem lagert bereits aus (Swap aktiv).
- Die Eingangsrate der Gateways ist unverändert (rund 150 Nachrichten pro Sekunde wie an jedem Tag); die Auslastung der Netzwerkports und des Switches ist niedrig.
- Die Broker-Statistik zeigt für den Client „mes-adapter“ (persistente Sitzung, QoS 1, getrennt seit 22:00 Uhr) rund 4,9 Millionen wartende Nachrichten; die Warteschlange ist nicht begrenzt.
- Alle anderen Clients sind verbunden; Zertifikate sind gültig und TLS-Verbindungen kommen zustande.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| ✔ Anwendung (Schicht 7) | Ein Gateway erzeugt durch eine Fehlkonfiguration eine Flut von Nachrichten. |
| Bitübertragung (Schicht 1) | Das Netzwerk zwischen Gateways und Broker ist überlastet. |
| Transport (Schicht 4) | Das TLS-Zertifikat des Brokers ist abgelaufen. |
| Vermittlung (Schicht 3) | ✔ Der Broker staut für den abgeschalteten MES-Adapter (persistente Sitzung) ungebremst Nachrichten auf und gerät in Speichermangel. |
| Sicherung (Schicht 2) |  |

**Richtig:** Anwendung (Schicht 7) → Der Broker staut für den abgeschalteten MES-Adapter (persistente Sitzung) ungebremst Nachrichten auf und gerät in Speichermangel.

**Erklärung:**

> Die Eingangsrate ist normal, es gibt also keine Nachrichtenflut, und die niedrige Auslastung der Ports spricht gegen ein überlastetes Netz. Zertifikate sind gültig, Verbindungen kommen zustande. Die Zahlen passen zur Warteschlange: 150 Nachrichten pro Sekunde über 9 Stunden (32.400 s) sind rund 4,9 Millionen. Bei einer persistenten Sitzung mit QoS 1 hebt der Broker alle Nachrichten für den getrennten Client auf; ohne Begrenzung füllt das den Speicher, bis der Broker langsam wird. Das ist ein Problem der Broker-Konfiguration (Anwendungsebene). Maßnahme: Adapter wieder starten oder die Sitzung löschen, Queue-Limit und Ablaufzeit für Nachrichten setzen und Warteschlangen überwachen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________
