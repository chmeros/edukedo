# Prüfblatt Daten- und Prozessanalyse — neue Inhalte (Kursprofile Phase 1)

Stand 06.10.2026 · erzeugt aus `content/fachinformatiker-daten-prozessanalyse/` (F-178). **Alle Inhalte sind Entwürfe.** Die neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (`kurs-angebot.ts`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.

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

### Angriffsarten und Schutzmaßnahmen (3 Fragen) — Zonen: Injection · Man-in-the-Middle · Denial of Service (DDoS) · Social Engineering / Phishing · Passwortangriffe

**Besonders prüfen:**
- ⚠ Fünf Zonen (Injection, Man-in-the-Middle, Denial of Service, Social Engineering/Phishing, Passwortangriffe); Malware und ungepatchte Schwachstellen sind bewusst nicht Teil des Instruments. Die Fragen enthalten nur Erkennungsmerkmale und Abwehr, keine Angriffsanleitungen.
- ⚠ Neu ergänzter Theorieabschnitt „Abwehr: Welche Maßnahme passt zu welcher Angriffsart?“ in Thema 6.1 (eigene Formulierung) — Zuordnung der Maßnahmen prüfen (Parametrisierte Abfragen, Rate Limiting, Rückruf über bekannte Nummer, Sperre nach Fehlversuchen).
- ⚠ Grenzfälle: Mehrfaktor-Authentifizierung wirkt auch gegen Phishing, ist in den Fragen aber den Passwortangriffen zugeordnet (erratenes Passwort); Rate Limiting und Verbindungsbegrenzung stehen bei Denial of Service, die Kontosperre bei Passwortangriffen.

#### Q-6.1-23 · Angriffsarten und Schutzmaßnahmen (Leicht)

*Ordne die Aussagen der Angriffsart zu, auf die sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Der Filterwert eines Berichts landet ungeprüft in einer SQL-Abfrage | Injection |
| Ein Dritter liest den Datentransfer zwischen Analysewerkzeug und Datenbank unbemerkt mit | Man-in-the-Middle |
| Der Reporting-Server wird mit sehr vielen Anfragen überlastet und antwortet nicht mehr | Denial of Service (DDoS) |
| Eine Mail im Namen der Fachabteilung bittet um die Zugangsdaten zum Auswertungsportal | Social Engineering / Phishing |
| Für ein Dashboard-Konto werden sehr viele Passwörter nacheinander durchprobiert | Passwortangriffe |
| Parametrisierte Abfragen statt zusammengesetzter SQL-Texte schützen davor | Injection |
| Eine verschlüsselte Übertragung mit Zertifikatsprüfung zwischen Werkzeug und Datenquelle schützt davor | Man-in-the-Middle |

**Erklärung (so sehen Lernende sie):**

> Injection entsteht durch ungeprüfte Eingaben in Befehlen, Man-in-the-Middle durch mitlesbaren oder veränderbaren Verkehr, Denial of Service durch Überlastung, Social Engineering und Phishing durch Täuschung von Menschen und Passwortangriffe durch massenhaftes Ausprobieren von Passwörtern.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-24 · Angriffsarten und Schutzmaßnahmen (Mittel)

*Welche Maßnahme schützt vor welcher Angriffsart?*

| Begriff | Zone |
| --- | --- |
| Filter und Berichtsparameter prüfen und nur über parametrisierte Abfragen verwenden | Injection |
| Dem Datenbankkonto des Berichtswerkzeugs nur die Leserechte geben, die der Bericht braucht | Injection |
| Verbindungen zu Datenquellen verschlüsseln und Zertifikatswarnungen nicht wegklicken | Man-in-the-Middle |
| Anfragen an die Datenschnittstelle begrenzen und Filterdienste des Providers nutzen | Denial of Service (DDoS) |
| Beschäftigte für gefälschte Mails sensibilisieren und Datenfreigaben nur nach Rückruf über eine bekannte Nummer erteilen | Social Engineering / Phishing |
| Das Konto nach mehreren Fehlversuchen sperren oder verzögern | Passwortangriffe |
| Für jeden Dienst ein eigenes Passwort verwenden, damit geleakte Zugangsdaten nicht anderswo passen | Passwortangriffe |

**Erklärung (so sehen Lernende sie):**

> Parametrisierte Abfragen und minimale Rechte begrenzen Injection, TLS mit Zertifikatsprüfung begrenzt Man-in-the-Middle, Filtern und Begrenzen von Anfragen begrenzt Denial of Service, Schulung und feste Abläufe begrenzen Social Engineering, Sperre nach Fehlversuchen und Mehrfaktor-Authentifizierung begrenzen Passwortangriffe.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-25 · Angriffsarten und Schutzmaßnahmen (Schwer)

*Ordne die Szenarien aus einem Analyseprojekt der Angriffsart zu, die sie am besten beschreiben.*

| Begriff | Zone |
| --- | --- |
| Ein Bericht liefert nach einer Eingabe mit Sonderzeichen im Filter plötzlich alle Kundendatensätze | Injection |
| Ein Analyst arbeitet in einem offenen WLAN; jemand schaltet sich dazwischen und verändert die Zahlen auf dem Weg | Man-in-the-Middle |
| Der Anruf einer angeblichen Revision verlangt den sofortigen Export einer Kundentabelle | Social Engineering / Phishing |
| Das Anmeldeportal verzeichnet tausende Fehlversuche mit geleakten Zugangsdaten anderer Dienste | Passwortangriffe |
| Das Datenportal ist nicht erreichbar, weil gleichzeitig Anfragen aus sehr vielen Quellen eingehen | Denial of Service (DDoS) |
| Eine Mail mit einem Link auf eine nachgebaute Anmeldeseite des Portals | Social Engineering / Phishing |
| Messwerte, die ein Skript über eine unverschlüsselte Verbindung abholt, werden unbemerkt verändert | Man-in-the-Middle |

**Erklärung (so sehen Lernende sie):**

> Entscheidend ist das Merkmal im Szenario: ungeprüfte Eingabe (Injection), unbemerkt mitgelesener oder veränderter Verkehr (Man-in-the-Middle), Überlastung aus vielen Quellen (Denial of Service), Täuschung am Telefon oder per Mail (Social Engineering und Phishing), massenhafte Anmeldeversuche (Passwortangriffe).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### BPMN-2.0-Bausteine (4 Fragen) — Zonen: Ereignis · Aktivität · Gateway · Fluss (Sequenz-/Nachrichtenfluss) · Teilnehmer (Pool/Lane)

**Besonders prüfen:**
- ⚠ Auf das Prüfungsübliche begrenzt (Ereignis, Aktivität, Gateway, Fluss, Pool/Lane); konsistent mit Thema 8.2?

#### Q-8.2-15 · BPMN-2.0-Bausteine (Leicht)

*Ordne die Begriffe den passenden Zonen zu.*

| Begriff | Zone |
| --- | --- |
| Kreis mit dünnem Rand am Anfang des Prozesses | Ereignis |
| Kreis mit dickem Rand am Ende des Prozesses | Ereignis |
| Abgerundetes Rechteck mit der Beschriftung „Rechnung prüfen" | Aktivität |
| Rechteck mit Plus-Zeichen für einen zusammengefassten Teilprozess | Aktivität |
| Raute mit der Frage „Betrag über 5.000 €?" und den Ausgängen „ja" und „nein" | Gateway |
| Durchgezogener Pfeil zwischen zwei Schritten im selben Pool | Fluss (Sequenz-/Nachrichtenfluss) |
| Gestrichelte Linie vom Kunden zum Unternehmen | Fluss (Sequenz-/Nachrichtenfluss) |
| Großes Rechteck mit der Bezeichnung „Stadtwerke Lindenau" | Teilnehmer (Pool/Lane) |
| Verantwortungsbereich Buchhaltung innerhalb des Unternehmens | Teilnehmer (Pool/Lane) |

**Erklärung (so sehen Lernende sie):**

> Ereignisse sind Kreise (Start dünn, Ende dick), Aktivitäten abgerundete Rechtecke (Aufgabe oder Teilprozess mit Plus), Gateways Rauten für Verzweigung und Zusammenführung. Der durchgezogene Sequenzfluss legt die Reihenfolge innerhalb eines Pools fest, der gestrichelte Nachrichtenfluss verbindet verschiedene Pools. Pool und Lane gliedern nach Beteiligten: Der Pool steht für das Unternehmen, die Lane für einen Bereich darin. Typische Verwechslung: Eine Raute ist immer ein Gateway, nie eine Aktivität — und eine Entscheidung wird als Frage beschriftet.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-16 · BPMN-2.0-Bausteine (Mittel)

*Ordne die Begriffe den passenden Zonen zu.*

| Begriff | Zone |
| --- | --- |
| Briefumschlag im Kreis: Eine Bestellung geht beim Unternehmen ein | Ereignis |
| Uhr im Kreis: 14 Tage nach Rechnungsstellung wird nachgefasst | Ereignis |
| Service-Aufgabe: Das ERP-System gleicht die Rechnung automatisch ab | Aktivität |
| Benutzeraufgabe: Die Sachbearbeiterin gibt die Zahlung frei | Aktivität |
| Raute mit Plus: Versand und Rechnungsstellung starten gleichzeitig | Gateway |
| Raute mit X: Je nach Abweichung wird genau ein Pfad gewählt | Gateway |
| Pfeil, der die Reihenfolge der Schritte in der Lane Buchhaltung festlegt | Fluss (Sequenz-/Nachrichtenfluss) |
| Nachricht an den externen Lieferanten über die Pool-Grenze hinweg | Fluss (Sequenz-/Nachrichtenfluss) |
| Kunde als leerer Pool ohne eigenen Ablauf (Black Box) | Teilnehmer (Pool/Lane) |
| Lane „Fachabteilung" im Pool des Unternehmens | Teilnehmer (Pool/Lane) |

**Erklärung (so sehen Lernende sie):**

> Ereignisse lösen aus oder beschreiben einen eingetretenen Zustand; Aufgaben sind Aktivitäten, auch wenn ein System sie ausführt (Service-Aufgabe). Gateways steuern Verzweigungen: das parallele (Plus) startet alle Pfade, das exklusive (X) wählt genau einen. Pools und Lanes sind Teilnehmer — auch der Kunde als Black-Box-Pool. Typische Verwechslung: Der Briefumschlag im Kreis ist ein Nachrichten-Ereignis, die gestrichelte Verbindung zwischen Pools dagegen der Nachrichtenfluss; „Nachricht" kann also zu zwei verschiedenen Zonen gehören.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-17 · BPMN-2.0-Bausteine (Mittel)

*Ordne die Ausschnitte aus dem Prozess „Eingangsrechnung" den passenden Zonen zu.*

| Begriff | Zone |
| --- | --- |
| Rechnung eingegangen | Ereignis |
| Rechnung bezahlt (Ende des Prozesses) | Ereignis |
| Zahlung anweisen | Aktivität |
| Abweichung klären (durch die Fachabteilung) | Aktivität |
| Abgleich ohne Abweichung? mit den Ausgängen „ja" und „nein" | Gateway |
| Verzweigung, bei der alle ausgehenden Pfade gleichzeitig gestartet werden | Gateway |
| Auftragsbestätigung vom Unternehmen an den Kunden-Pool | Fluss (Sequenz-/Nachrichtenfluss) |
| Übergang von „Rechnung erfassen" zu „Rechnung abgleichen" im selben Pool | Fluss (Sequenz-/Nachrichtenfluss) |
| Bereich der Geschäftsleitung im Pool des Unternehmens | Teilnehmer (Pool/Lane) |
| Kunde und Unternehmen als zwei getrennte Beteiligte | Teilnehmer (Pool/Lane) |

**Erklärung (so sehen Lernende sie):**

> „Rechnung eingegangen" und „Rechnung bezahlt" sind Zustände (Partizip) und damit Ereignisse, „Zahlung anweisen" und „Abweichung klären" Tätigkeiten (Substantiv + Verb) und damit Aktivitäten. Die Frage mit „ja"/„nein"-Ausgängen und die gleichzeitige Verzweigung sind Gateways. Zwischen verschiedenen Pools läuft der Nachrichtenfluss, im selben Pool der Sequenzfluss — beides gehört zur Zone Fluss. Bereiche und Beteiligte sind Lanes und Pools. Typische Verwechslung: Ein Ereignis wird als Zustand beschriftet, eine Aktivität als Tätigkeit.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-18 · BPMN-2.0-Bausteine (Schwer)

*Ordne die Begriffe den passenden Zonen zu; achte auf die Grenzfälle.*

| Begriff | Zone |
| --- | --- |
| Zwischenereignis mit doppeltem Rand: auf die Antwort des Lieferanten warten | Ereignis |
| Endereignis nach der Ablehnung eines Antrags | Ereignis |
| Teilprozess „Reklamation bearbeiten", der an anderer Stelle detailliert wird | Aktivität |
| Sachbearbeiter erfasst die Rechnung manuell im System | Aktivität |
| Raute mit Kreis: Je nach Bedingung werden ein oder mehrere Pfade durchlaufen | Gateway |
| Raute, an der die Pfade „ja" und „nein" vor „Zahlung anweisen" wieder zusammenlaufen | Gateway |
| Gestrichelte Linie mit offenem Kreis am Anfang und offener Pfeilspitze | Fluss (Sequenz-/Nachrichtenfluss) |
| Pfeil zwischen Schritten in zwei Lanes desselben Pools | Fluss (Sequenz-/Nachrichtenfluss) |
| Pool des Lieferanten, dessen interner Ablauf nicht modelliert wird | Teilnehmer (Pool/Lane) |
| Lane „ERP-System" für automatisierte Schritte | Teilnehmer (Pool/Lane) |

**Erklärung (so sehen Lernende sie):**

> Schwierig sind die Grenzfälle: Ein Zwischenereignis (doppelter Rand) bleibt ein Ereignis, auch wenn es eine Nachricht abwartet; Teilprozess (Plus) und Benutzeraufgabe sind beide Aktivitäten. Das inklusive Gateway (Kreis) steuert ein oder mehrere Pfade, das exklusive führt Pfade wieder zusammen — beides sind Gateways. Zwischen Lanes desselben Pools bleibt es beim Sequenzfluss, nur über Pool-Grenzen hinweg wird der Nachrichtenfluss verwendet. Pool und Lane sind Teilnehmer; auch ein System kann eine Lane sein. Typische Verwechslung: Eine Linie, die zwei Lanes verbindet, ist kein Nachrichtenfluss, solange sie im selben Pool bleibt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Analysewerkzeuge der Prozessanalyse (4 Fragen) — Zonen: Schwachstellenanalyse · Engpassanalyse · Pareto-Analyse · Ursachenanalyse (Ishikawa/5-Why) · Wertstromanalyse · Process Mining

**Besonders prüfen:**
- ⚠ Schwachstellenanalyse = WO liegt das Problem, Ursachenanalyse = WARUM tritt es auf — Grenzfälle: „Warum liegen die Rechnungen so lange bei der Abteilungsleitung?“ (Ursachenanalyse), „Wartezeiten aus Zeitstempeln ermitteln“ (Process Mining).

#### Q-8.3-15 · Analysewerkzeuge der Prozessanalyse (Leicht)

*Ordne die Fragestellungen dem Analysewerkzeug zu, das sie beantwortet.*

| Begriff | Zone |
| --- | --- |
| Welche Station des Rechnungsprozesses hat die geringste Kapazität? | Engpassanalyse |
| Welche Station staut Vorgänge vor sich auf und begrenzt den Durchsatz? | Engpassanalyse |
| Welche 20 % der Ursachen verursachen 80 % der Fehler? | Pareto-Analyse |
| Welche Fehlerarten treten am häufigsten auf? | Pareto-Analyse |
| Aus Ereignisprotokollen den tatsächlichen Ablauf rekonstruieren | Process Mining |
| Welcher Anteil der Durchlaufzeit ist aus Kundensicht wertschöpfend? | Wertstromanalyse |
| Warum wurde die Skontofrist verpasst? Fünfmal nachfragen bis zur Grundursache | Ursachenanalyse (Ishikawa/5-Why) |
| Wo im Prozess liegen Medienbrüche, Liegezeiten und Doppelerfassungen? | Schwachstellenanalyse |

**Erklärung (so sehen Lernende sie):**

> Jedes Werkzeug beantwortet eine eigene Frage: Die Engpassanalyse findet die Station mit der geringsten Kapazität, die Pareto-Analyse zeigt, was am häufigsten vorkommt, Process Mining rekonstruiert den realen Ablauf aus Logdaten, die Wertstromanalyse bewertet Tätigkeiten aus Kundensicht, die Ursachenanalyse fragt nach dem Warum und die Schwachstellenanalyse nach dem Wo. Typische Verwechslung: Pareto zeigt nur, wie häufig etwas auftritt — nicht, warum.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-16 · Analysewerkzeuge der Prozessanalyse (Mittel)

*Ordne die Aufgaben der Prozessanalyse dem passenden Werkzeug zu.*

| Begriff | Zone |
| --- | --- |
| Das Ereignisprotokoll zeigt, an welchen Stellen das Soll-Modell nicht eingehalten wird | Process Mining |
| Wie viele von 1.000 Rechnungen laufen im Standardweg, wie viele mit Klärschleife? | Process Mining |
| Bearbeitungs- und Liegezeit je Schritt vom Kundenwunsch bis zur Lieferung aufnehmen | Wertstromanalyse |
| Welche Schritte sind aus Kundensicht Blindleistung oder Verschwendung? | Wertstromanalyse |
| Ein Fischgräten-Diagramm sammelt mögliche Gründe für verspätete Berichte | Ursachenanalyse (Ishikawa/5-Why) |
| Warum liegen die Rechnungen so lange bei der Abteilungsleitung? | Ursachenanalyse (Ishikawa/5-Why) |
| Mit einer Checkliste die Stellen mit Wartezeiten und Rückfragen finden und priorisieren | Schwachstellenanalyse |
| An welchen Stellen werden Vorgänge unnötig doppelt freigegeben? | Schwachstellenanalyse |
| Fehlerarten absteigend sortieren und mit Summenlinie im Diagramm darstellen | Pareto-Analyse |
| 24 Rechnungen pro Stunde treffen ein, Station B schafft nur 18 | Engpassanalyse |

**Erklärung (so sehen Lernende sie):**

> Kriterium für die Abgrenzung von Schwachstellen- und Ursachenanalyse: Die Schwachstellenanalyse ortet, WO im Prozess Zeit oder Qualität verloren geht; die Ursachenanalyse erklärt, WARUM ein bereits erkanntes Problem auftritt. Process Mining und Wertstromanalyse unterscheiden sich in der Datenbasis (Event-Log gegenüber aufgenommenen Zeiten und Kundensicht). Die Kapazitätsrechnung an Station B (24 − 18 = 6 Vorgänge Rückstau je Stunde) ist Engpassanalyse. Typische Verwechslung: „Warum liegen die Rechnungen so lange?" wirkt wie eine Fundstelle, ist aber eine Warum-Frage und gehört zur Ursachenanalyse.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-17 · Analysewerkzeuge der Prozessanalyse (Mittel)

*Ordne die Situationen aus dem Beratungsalltag dem Analysewerkzeug zu.*

| Begriff | Zone |
| --- | --- |
| Prozess mit Checkliste prüfen, Auffälligkeiten mit Ort und Priorität in einer Liste erfassen | Schwachstellenanalyse |
| Mehrfacherfassung und Medienbrüche zwischen Vertrieb und Buchhaltung aufspüren | Schwachstellenanalyse |
| Nach Erweiterung von Station B (18 je Stunde) begrenzt Station C (24) den Durchsatz | Engpassanalyse |
| Welche Station muss erweitert werden, damit der Gesamtdurchsatz steigt? | Engpassanalyse |
| „Bestellnummer fehlt" und „falsche Kostenstelle" machen zusammen 70 % der Fehler aus | Pareto-Analyse |
| Mögliche Gründe nach Mensch, Methode, IT-System und Daten im Team sammeln | Ursachenanalyse (Ishikawa/5-Why) |
| Vom verpassten Skonto über die Abwesenheit zur fehlenden Vertretungsregel zurückfragen | Ursachenanalyse (Ishikawa/5-Why) |
| Prozesseffizienz berechnen: 140 min Bearbeitungszeit bei 960 min Durchlaufzeit | Wertstromanalyse |
| Case-ID, Aktivität und Zeitstempel je Eintrag auswerten, um Prozessvarianten zu finden | Process Mining |
| Wartezeiten zwischen zwei Aktivitäten aus den Zeitstempeln des Systems ermitteln | Process Mining |

**Erklärung (so sehen Lernende sie):**

> Orten (Schwachstelle), Kapazität (Engpass), Häufigkeit (Pareto), Warum (Ursachen), Zeiten und Kundensicht (Wertstrom) und digitale Spuren (Process Mining) sind die Unterscheidungsmerkmale. Typische Verwechslung: Die Wartezeit-Auswertung aus Zeitstempeln gehört zum Process Mining (Enhancement), weil die Daten aus dem Event-Log stammen; die Wertstromanalyse erfasst Zeiten dagegen durch Prozessaufnahme und Messung, und der Pareto-Anteil von 70 % zeigt nur die Häufigkeit, nicht die Gründe.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.3-18 · Analysewerkzeuge der Prozessanalyse (Schwer)

*Ordne die Befunde dem Werkzeug zu, mit dem sie am besten gewonnen wurden.*

| Begriff | Zone |
| --- | --- |
| Die Nacharbeit häuft sich zwischen Prüfung und Freigabe, nicht bei der Erfassung | Schwachstellenanalyse |
| An der Übergabe zwischen Vertrieb und Buchhaltung ist keine Zuständigkeit festgelegt | Schwachstellenanalyse |
| Weshalb bricht die Datenübernahme jeden Montag ab? Hypothesen werden im Team gesammelt | Ursachenanalyse (Ishikawa/5-Why) |
| Die Rechnung lag im Urlaubsfach, weil es nur einen Papierlauf mit Unterschrift gab | Ursachenanalyse (Ishikawa/5-Why) |
| Zwei von fünf Fehlerarten verursachen die Mehrheit aller Fehlerfälle | Pareto-Analyse |
| Mehr Personal an der Prüfung hebt den Durchsatz nur bis 24 je Stunde | Engpassanalyse |
| Jede Tätigkeit wird nach wertschöpfend, notwendig oder Verschwendung eingeordnet | Wertstromanalyse |
| Von 960 Minuten Durchlaufzeit sind nur 60 Minuten wertschöpfend | Wertstromanalyse |
| 13 % der Rechnungen laufen mit Wiedervorlage, was im Interview niemand erwähnte | Process Mining |
| Im Log wurde die Freigabe bei einigen Fällen übersprungen | Process Mining |

**Erklärung (so sehen Lernende sie):**

> Schwierig sind die Grenzfälle. Schwachstellenanalyse: Sie macht eine Stelle im Prozess dingfest (WO), ohne die Gründe zu klären. Ursachenanalyse: Sie beantwortet das WARUM und geht auf die Grundursache zurück („Papierlauf ohne Vertretung"). Die Engpassanalyse erkennt man daran, dass eine Kapazitätsgrenze den Durchsatz bestimmt, die Pareto-Analyse an der Häufigkeitsrangfolge, die Wertstromanalyse an der Einteilung nach Kundensicht und Zeitanteilen, Process Mining an Aussagen aus dem Event-Log, die niemand im Interview erwähnt hat. Typische Verwechslung: Die Fundstelle („zwischen Prüfung und Freigabe") ist noch keine Ursache; erst die Warum-Frage führt zur Grundursache.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Datenqualitäts-Dimensionen (4 Fragen) — Zonen: Plausibilität · Quantität · Redundanz · Vollständigkeit · Validität

**Besonders prüfen:**
- ⚠ Quantität und Vollständigkeit werden in der Theorie nicht trennscharf geführt; der Sensor-Fall (1 368 statt 1 440 Messwerte) kommt deshalb nicht als Begriff vor. Q-11.1-18: „5.000 Trainingsfälle nötig, 1.200 vorhanden“ = Quantität, „Datensätze der Filiale Nord fehlen“ = Vollständigkeit.
- ⚠ „Fünfstellige PLZ passt nicht zum Ort“ gilt als Plausibilität (Kontextprüfung), könnte auch als Richtigkeit gelesen werden. Die fünf Dimensionen stammen aus der Kursbeschreibung zur FIAusbV; ISO/IEC 25012 kennt weitere (Konsistenz, Aktualität) — Originaltext der Verordnung noch nicht geprüft.

#### Q-11.1-15 · Datenqualitäts-Dimensionen (Leicht)

*Ordne die Befunde der betroffenen Qualitätsdimension zu.*

| Begriff | Zone |
| --- | --- |
| 12 % der Geburtsdaten sind leer | Vollständigkeit |
| Die Lieferung wurde vor der Bestellung erfasst | Plausibilität |
| Ein Mitarbeiter hat laut Tabelle das Geburtsjahr 1850 | Plausibilität |
| Kundin Meier wurde doppelt angelegt | Redundanz |
| Die Postleitzahl hat nur vier statt fünf Ziffern | Validität |
| Im Feld Bestelldatum steht „31.02.2026" | Validität |
| Für die geplante Auswertung liegen nur 40 Datensätze vor | Quantität |

**Erklärung (so sehen Lernende sie):**

> Leere Pflichtfelder gehören zur Vollständigkeit; Dubletten zur Redundanz; formale Verstöße gegen Format und Wertebereich (vier Ziffern, kein gültiges Datum) zur Validität; unglaubwürdige Werte im sachlichen Zusammenhang (Lieferung vor Bestellung, Geburtsjahr 1850) zur Plausibilität; zu wenige Daten für den Zweck zur Quantität. Typische Verwechslung: Auch ein unmögliches Datum wie der 31.02. ist ein formaler Verstoß (Validität), während „Lieferung vor Bestellung" aus gültigen Datumswerten besteht, die erst im Zusammenhang unmöglich sind.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-16 · Datenqualitäts-Dimensionen (Mittel)

*Ordne die Prüfbefunde der Qualitätsdimension zu.*

| Begriff | Zone |
| --- | --- |
| Das Pflichtfeld E-Mail ist bei 300 von 2.000 Kunden nicht befüllt | Vollständigkeit |
| Statt einer Telefonnummer steht in vielen Zeilen der Platzhalter „k. A." | Vollständigkeit |
| Dieselbe Bestellung steht nach dem Import zweimal in der Tabelle | Redundanz |
| „Meier, Jan" und „Meyer, Jan" bezeichnen dieselbe Person | Redundanz |
| Das Statusfeld enthält „vielleicht", erlaubt sind nur „offen" und „erledigt" | Validität |
| Die E-Mail-Adresse „kunde.example.de" enthält kein @-Zeichen | Validität |
| Für die Raumtemperatur im Büro wird 850 °C gemeldet | Plausibilität |
| Für das Prognosemodell stehen nur 200 Datensätze zur Verfügung | Quantität |

**Erklärung (so sehen Lernende sie):**

> Fehlende Angaben und Platzhalter verletzen die Vollständigkeit, mehrfach vorhandene Informationen die Redundanz (auch bei unscharfen Dubletten). Ein Wert, der gegen eine festgelegte Regel für Format oder erlaubte Werte verstößt, ist nicht valide. 850 °C ist als Zahl darstellbar, aber im Büro nicht glaubwürdig (Plausibilität). Typische Verwechslung: Die Zahl 200 sagt nichts über Fehler in den Daten, sondern darüber, ob die Menge für den Zweck reicht (Quantität).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-17 · Datenqualitäts-Dimensionen (Mittel)

*Ordne die Prüfbefunde der Qualitätsdimension zu, gegen die sie verstoßen.*

| Begriff | Zone |
| --- | --- |
| Das Feld Lieferdatum enthält den Text „bald" statt eines Datums | Validität |
| Ein Datum im Format 2026/13/05 entspricht nicht dem Muster JJJJ-MM-TT | Validität |
| Das Einstellungsdatum liegt vor dem Geburtsdatum der Person | Plausibilität |
| Ein Kunde, der sonst 20 Stück bestellt, hat 3 Millionen Stück bestellt | Plausibilität |
| Dieselbe Rechnung wurde aus zwei Exportdateien zweimal importiert | Redundanz |
| Zwei Zeilen haben dieselbe Auftragsnummer, denselben Betrag und dasselbe Datum | Redundanz |
| Bei 8 % der Datensätze ist das Pflichtfeld Kostenstelle nicht befüllt | Vollständigkeit |
| Für ein Zeitreihenmodell liegen nur 30 Tageswerte vor | Quantität |

**Erklärung (so sehen Lernende sie):**

> Abgrenzungskriterium nach der Theorie dieses Themas: Validität = formale Gültigkeit nach festgelegter Regel (Datentyp, Format, erlaubte Werte), Plausibilität = inhaltliche Glaubwürdigkeit im sachlichen Zusammenhang, oft im Vergleich mehrerer Felder oder mit Erfahrungswerten. „bald" und 2026/13/05 verletzen eine Formatregel; ein Einstellungsdatum vor der Geburt ist formal ein korrektes Datum, aber sachlich unmöglich. In der Literatur werden beide Begriffe nicht immer gleich abgegrenzt — wichtig ist die eindeutige Definition in der Dokumentation. Typische Verwechslung: Zwei identische Zeilen sind formal fehlerfrei und damit nicht ungültig — das Problem ist die doppelte Information (Redundanz).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.1-18 · Datenqualitäts-Dimensionen (Schwer)

*Entscheide bei diesen Grenzfällen, welche Dimension der Datenqualität betroffen ist.*

| Begriff | Zone |
| --- | --- |
| Die Telefonnummer eines Kunden enthält Buchstaben | Validität |
| In der Bestellmenge steht der Text „viele" statt einer Zahl | Validität |
| Postleitzahl hat fünf Ziffern, passt aber nicht zum angegebenen Ort | Plausibilität |
| Ein Einzelhandelsgeschäft meldet einen Jahresumsatz von 5 Milliarden Euro | Plausibilität |
| Zwei Systeme führen dieselbe Kundin mit verschiedenen Kundennummern | Redundanz |
| Nach dem Zusammenführen zweier Tabellen verdoppeln sich Umsatzsummen durch doppelte Zeilen | Redundanz |
| Alle Pflichtfelder sind befüllt, aber die Datensätze der Filiale Nord fehlen für März | Vollständigkeit |
| Die Spalte Telefon ist laut Regel Pflicht und bei 30 % der Kunden leer | Vollständigkeit |
| Das Modell braucht mindestens 5.000 Trainingsfälle, vorhanden sind 1.200 | Quantität |
| Die Stichprobe von 25 Befragten trägt keine Aussage über 4.000 Kunden | Quantität |

**Erklärung (so sehen Lernende sie):**

> Validität prüft die formale Regel (nur Ziffern, Zahl statt Text) und kann automatisch erfolgen; Plausibilität prüft die inhaltliche Glaubwürdigkeit und braucht Fachwissen oder Vergleichsfelder: Eine fünfstellige Postleitzahl ist formal gültig, passt aber zum Ort nicht. Vollständigkeit betrifft fehlende Felder oder konkret erwartete Datensätze (Filiale Nord), Quantität dagegen die Gesamtmenge im Verhältnis zum Analysebedarf. Doppelte Information (auch als doppelte Zeilen nach einem Join) ist Redundanz. Typische Verwechslung: „Zu wenig Daten" kann Vollständigkeit oder Quantität sein — entscheidend ist, ob bestimmte erwartete Daten fehlen oder ob die Menge insgesamt nicht reicht. Die Begriffe sind in der Literatur nicht einheitlich abgegrenzt; hier gelten die Definitionen des Themas.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Skalenniveaus (4 Fragen) — Zonen: Nominal · Ordinal · Intervall · Verhältnis

**Besonders prüfen:**
- ⚠ Klassische Streitfälle: Postleitzahl (nominal), Schulnote und Zufriedenheitsskala (ordinal), Temperatur in °C (Intervall), Umsatz (Verhältnis).

#### Q-9.1-14 · Skalenniveaus (Leicht)

*Ordne die Merkmale dem passenden Skalenniveau zu.*

| Begriff | Zone |
| --- | --- |
| Fehlerart eines Tickets (Hardware, Software, Netzwerk) | Nominal |
| Branche des Kundenunternehmens | Nominal |
| Schweregrad eines Fehlers: niedrig, mittel, hoch | Ordinal |
| Datum des Auftragseingangs | Intervall |
| Auftragswert in Euro | Verhältnis |
| Bearbeitungsdauer eines Tickets in Sekunden | Verhältnis |

**Erklärung (so sehen Lernende sie):**

> Nominal sind Merkmale, die nur unterscheiden (Fehlerart, Branche). Der Schweregrad hat eine Rangfolge, aber keine definierten gleichen Abstände (ordinal). Beim Datum sind Differenzen sinnvoll (Tage zwischen zwei Terminen), der Nullpunkt ist aber willkürlich gewählt (intervall). Euro-Beträge und Zeitdauern haben einen echten Nullpunkt, deshalb sind Quotienten wie „doppelt so hoch" sinnvoll (verhältnis). Typische Verwechslung: Intervall und Verhältnis unterscheiden sich nur durch den natürlichen Nullpunkt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-15 · Skalenniveaus (Mittel)

*Ordne die Merkmale ihrem Skalenniveau zu.*

| Begriff | Zone |
| --- | --- |
| Postleitzahl eines Kunden | Nominal |
| Kundennummer im CRM-System | Nominal |
| Schulnote von 1 bis 6 | Ordinal |
| Zufriedenheit auf einer 5er-Skala von „sehr unzufrieden" bis „sehr zufrieden" | Ordinal |
| Temperatur in Grad Celsius | Intervall |
| Baujahr einer Maschine (z. B. 2016) | Intervall |
| Umsatz einer Filiale in Euro | Verhältnis |
| Körpergröße in Zentimetern | Verhältnis |

**Erklärung (so sehen Lernende sie):**

> Postleitzahl und Kundennummer sind Codes: Sie unterscheiden nur, Rechnen mit ihnen ist sinnlos (nominal). Schulnote und Zufriedenheitsskala haben eine Rangfolge, aber keine definierten gleichen Abstände (ordinal) — in der Prüfung gilt die ordinale Lesart. Temperatur in °C und Jahreszahlen haben gleiche Abstände, aber einen willkürlichen Nullpunkt (intervall). Umsatz und Körpergröße haben einen echten Nullpunkt (verhältnis). Typische Verwechslung: Weil Ziffern vorkommen, werden Codes und Noten gern für „metrisch" gehalten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-16 · Skalenniveaus (Mittel)

*Ordne die Merkmale aus dem IT-Betrieb dem passenden Skalenniveau zu.*

| Begriff | Zone |
| --- | --- |
| Betriebssystem eines Rechners (Windows, Linux, macOS) | Nominal |
| Kostenstellennummer einer Abteilung | Nominal |
| Priorität eines Tickets: niedrig, mittel, hoch | Ordinal |
| Rang eines Kunden in der Umsatzrangliste | Ordinal |
| Datum der letzten Wartung eines Servers | Intervall |
| Anzahl der Support-Tickets pro Woche | Verhältnis |
| Bearbeitungsdauer eines Tickets in Stunden | Verhältnis |

**Erklärung (so sehen Lernende sie):**

> Betriebssystem und Kostenstellennummer sind Bezeichner (nominal). Priorität und Rang geben eine Reihenfolge vor, sagen aber nichts über die Größe der Abstände (ordinal): Der Kunde auf Rang 1 hat nicht gleich viel mehr Umsatz als der auf Rang 2 wie dieser mehr als Rang 3. Ein Kalenderdatum erlaubt Differenzen, hat aber keinen natürlichen Nullpunkt (intervall). Anzahlen und Zeitdauern beginnen bei einer echten Null (verhältnis). Typische Verwechslung: Die Kostenstellennummer sieht wie eine Zahl aus, ist aber ein Code.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-17 · Skalenniveaus (Schwer)

*Ordne diese Merkmale dem Skalenniveau zu, das sie nach der üblichen Lesart haben.*

| Begriff | Zone |
| --- | --- |
| Telefonnummer eines Kunden | Nominal |
| Geschlecht (weiblich, männlich, divers) | Nominal |
| Bildungsabschluss (Hauptschule, Realschule, Abitur, Studium) | Ordinal |
| Reifegrad eines Prozesses auf den Stufen 1 bis 5 | Ordinal |
| Außentemperatur in Grad Fahrenheit | Intervall |
| Temperatur in Kelvin | Verhältnis |
| Lebensalter in Jahren | Verhältnis |
| Anzahl der Fehlermeldungen im Log eines Tages | Verhältnis |

**Erklärung (so sehen Lernende sie):**

> Entscheidend sind die Prüffragen: Nur unterscheiden (nominal)? Rangfolge (ordinal)? Gleiche Abstände ohne echte Null (intervall)? Echte Null (verhältnis)? Die Telefonnummer ist ein Code, Bildungsabschluss und Reifegrad sind geordnete Stufen ohne definierte Abstände. Fahrenheit und Celsius haben einen willkürlichen Nullpunkt, Kelvin beginnt am absoluten Nullpunkt — dasselbe physikalische Merkmal kann also je nach Einheit auf verschiedenen Niveaus liegen. Alter und Anzahlen haben eine echte Null. Typische Verwechslung: „Temperatur" lässt sich nicht pauschal einstufen; es kommt auf den Nullpunkt der Skala an.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 2. Neue Theorieabschnitte

### DP1 · Schwachstellen- und Ursachenanalyse abgrenzen

> ### Schwachstellen- und Ursachenanalyse abgrenzen
>
> Beide Begriffe liegen eng beieinander, beantworten aber verschiedene Fragen. Die **Schwachstellenanalyse** fragt: **Wo** im Prozess liegt das Problem? Sie arbeitet am Prozessmodell und an Kennzahlen und endet mit einer priorisierten Schwachstellenliste. Die **Ursachenanalyse** (Ishikawa, 5-Why) fragt: **Warum** tritt das Problem auf? Sie beginnt bei einer bereits erkannten Auffälligkeit und sucht die Grundursache. Die **Engpassanalyse** ist ein Spezialfall der Schwachstellensuche, der sich auf die Kapazität einer Station und den Durchsatz konzentriert. Merkregel: erst orten (Schwachstelle), dann erklären (Ursache), dann gewichten (Pareto).
>
> Für die Prozessanalyse wird häufig die Schreibweise „Process Mining" (englisch) verwendet; gemeint ist dasselbe wie das hier beschriebene „Prozess Mining".

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Absatz zur Schreibweise „Process Mining“ / „Prozess Mining“ — gewünschte Schreibweise festlegen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### DP2 · Skalenniveaus: Streitfälle sicher einstufen

> ### Skalenniveaus: Streitfälle sicher einstufen
>
> Bei der Einstufung hilft eine Reihe von Prüffragen, die man der Reihe nach stellt: Gibt es nur „gleich oder verschieden" (nominal)? Gibt es zusätzlich eine Rangfolge (ordinal)? Sind die Abstände zwischen den Werten gleich groß und sinnvoll (intervall)? Gibt es außerdem einen echten Nullpunkt, bei dem „nichts vorhanden" gemeint ist (verhältnis)? Danach lassen sich die in der Prüfung üblichen Streitfälle entscheiden:
>
> - **Kundennummer, Postleitzahl, Telefonnummer:** nominal — es sind Bezeichner (Codes), die nur unterscheiden; Differenzen und Mittelwerte haben keine Bedeutung, auch wenn Ziffern vorkommen.
> - **Schulnote (1 bis 6):** ordinal — die Rangfolge ist eindeutig, dass der Abstand zwischen 1 und 2 genauso groß ist wie zwischen 5 und 6, wird aber nicht definiert. Ein Notendurchschnitt ist in der Praxis üblich, streng genommen aber nur eine Näherung.
> - **Zufriedenheit auf einer 5er-Skala:** ordinal, aus demselben Grund; Median und Modus sind die sichere Wahl.
> - **Temperatur in °C und Kalenderdatum:** intervall — Differenzen sind sinnvoll, der Nullpunkt ist aber willkürlich festgelegt. In Kelvin (Nullpunkt = absoluter Nullpunkt) wäre die Temperatur dagegen verhältnisskaliert.
> - **Umsatz in €, Körpergröße in cm, Stückzahl:** verhältnis — die Null bedeutet „nichts", daher sind Aussagen wie „doppelt so groß" sinnvoll.
>
> Faustregel: Mit jeder höheren Stufe kommen Auswertungsmöglichkeiten hinzu; man darf ein Merkmal aber immer auch nach den Regeln einer niedrigeren Stufe auswerten (Modus gibt es bei jedem Skalenniveau).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Datum, Baujahr und Fahrenheit gelten als Intervallskala, Lebensalter als Verhältnisskala (folgt der Tabelle in Thema 9.1) — in der Literatur teils anders (z. B. Jahreszahl als ordinal/Intervall).
- ⚠ Notendurchschnitt: in der Praxis üblich, streng genommen nur eine Näherung (Schulnote ordinal).

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________
