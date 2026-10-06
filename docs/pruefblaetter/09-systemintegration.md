# Prüfblatt Systemintegration — neue Inhalte (Kursprofile Phase 1)

Stand 06.10.2026 · erzeugt aus `content/fachinformatiker-systemintegration/` (F-180). **Alle Inhalte sind Entwürfe.** Die neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (`kurs-angebot.ts`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.

## 1. Zonen-Instrumente (Begriffe den Zonen zuordnen)

### Sicherungsarten (4 Fragen) — Zonen: Vollsicherung · Inkrementelle Sicherung · Differentielle Sicherung

**Besonders prüfen:**
- ⚠ Q-10.3-18 ist eine Rechenfrage mit den Zahlen der Theorie (800 GB, 20 GB pro Tag); die Zone „Vollsicherung“ steht dort für „täglich komplett sichern“ (gewollte Zuspitzung).
- ⚠ Q-10.3-17: „Am Sonntag wird der gesamte Datenbestand komplett neu kopiert“ gehört zur Vollsicherung — streng genommen läuft die Vollsicherung sonntags auch in den anderen Strategien.

#### Q-10.3-15 · Sicherungsarten (Leicht)

*Ordne die Aussagen der Sicherungsart zu, auf die sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Kopiert bei jedem Lauf alle ausgewählten Daten komplett | Vollsicherung |
| Dauert beim Sichern am längsten und braucht am meisten Platz | Vollsicherung |
| Sichert nur Änderungen seit der letzten Sicherung, egal welcher Art | Inkrementelle Sicherung |
| Hat in der Regel die kleinste Sicherungsmenge und die kürzeste Laufzeit | Inkrementelle Sicherung |
| Sichert alles, was seit der letzten Vollsicherung neu oder geändert ist | Differentielle Sicherung |
| Wird von Tag zu Tag größer, bis wieder eine Vollsicherung läuft | Differentielle Sicherung |

**Erklärung (so sehen Lernende sie):**

> Die drei Arten unterscheiden sich im Bezugspunkt: Die Vollsicherung kopiert immer alles, die inkrementelle Sicherung bezieht sich auf die letzte Sicherung beliebiger Art, die differentielle auf die letzte Vollsicherung. Typische Verwechslung: „Seit der letzten Sicherung" und „seit der letzten Vollsicherung" klingen ähnlich, führen aber zu völlig anderen Mengen und Wiederherstellungswegen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.3-16 · Sicherungsarten (Mittel)

*Ordne die Aussagen zur Wiederherstellung der passenden Sicherungsart zu.*

| Begriff | Zone |
| --- | --- |
| Zum Wiederherstellen genügt ein einziger Sicherungssatz | Vollsicherung |
| Der Restore ist am einfachsten, die Sicherung selbst aber am aufwendigsten | Vollsicherung |
| Es werden die letzte Vollsicherung und alle folgenden Sicherungen benötigt | Inkrementelle Sicherung |
| Ein defekter Satz mitten in der Kette gefährdet alle späteren Stände | Inkrementelle Sicherung |
| Für den Stand von Freitag braucht man die Sonntags-Vollsicherung plus fünf Zusatzsätze | Inkrementelle Sicherung |
| Es werden die letzte Vollsicherung und nur die letzte Sicherung benötigt | Differentielle Sicherung |
| Auch ohne Montagssatz genügen für den Freitag Vollsicherung und Freitagssatz | Differentielle Sicherung |

**Erklärung (so sehen Lernende sie):**

> Bei der inkrementellen Sicherung bauen die Sätze aufeinander auf, deshalb zählt die ganze Kette und jedes Glied ist kritisch. Die differentielle Sicherung enthält immer alles seit der letzten Vollsicherung, daher genügen Vollsicherung und letzter Differenzsatz. Die Vollsicherung steht für sich allein. Typische Verwechslung: Der Wiederherstellungsweg der inkrementellen Sicherung ist lang, ihre Sicherungsläufe sind aber die kürzesten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.3-17 · Sicherungsarten (Mittel)

*Ordne die Szenarien der Sicherungsart zu, die jeweils beschrieben oder am besten geeignet ist.*

| Begriff | Zone |
| --- | --- |
| Kleiner Datenbestand, einfachster Restore ist wichtiger als kurze Sicherungsdauer | Vollsicherung |
| Am Sonntag wird der gesamte Datenbestand komplett neu kopiert | Vollsicherung |
| Knappes Sicherungsfenster und wenig Speicher, eine längere Restore-Kette ist akzeptabel | Inkrementelle Sicherung |
| Jede Nacht kommen nur die 20 GB des Vortags dazu, auch am Samstag | Inkrementelle Sicherung |
| Die Mittwochssicherung enthält die Änderungen von Montag und Dienstag nicht mehr | Inkrementelle Sicherung |
| Der Restore soll mit zwei Sicherungssätzen auskommen, Speicher ist ausreichend vorhanden | Differentielle Sicherung |
| Die Samstagssicherung umfasst alle Änderungen der Woche seit Sonntag | Differentielle Sicherung |
| Die Mittwochssicherung enthält auch die Änderungen von Montag und Dienstag | Differentielle Sicherung |

**Erklärung (so sehen Lernende sie):**

> Inkrementell passt, wenn Zeit und Speicher beim Sichern knapp sind und ein längerer Restore in Kauf genommen wird; differentiell, wenn die Wiederherstellung einfach und schnell sein soll und mehr Speicher zur Verfügung steht. Die Vollsicherung bildet jeweils die Basis und ist bei kleinen Beständen oft die einfachste Lösung. Typische Verwechslung: Die Mittwochssicherung ist inkrementell klein (nur Mittwoch), differentiell dagegen größer (Montag bis Mittwoch).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.3-18 · Sicherungsarten (Schwer)

*Ein Dateiserver hat 800 GB Bestand, täglich kommen 20 GB neue Daten dazu (jeweils andere Dateien). Ordne die Angaben der Strategie zu, auf die sie zutreffen: Vollsicherung = jeden Tag komplett gesichert; inkrementell und differentiell = Vollsicherung am Sonntag, danach täglich Zusatzsicherung.*

| Begriff | Zone |
| --- | --- |
| Die Sicherung am Mittwoch umfasst 860 GB | Vollsicherung |
| Alle Sicherungen einer Woche zusammen: 6.020 GB | Vollsicherung |
| Für den Stand von Freitag genügt ein einziger Satz mit 900 GB | Vollsicherung |
| Die Sicherung am Mittwoch umfasst 20 GB | Inkrementelle Sicherung |
| Alle Sicherungen einer Woche zusammen: 920 GB | Inkrementelle Sicherung |
| Für den Freitagsstand braucht man die Vollsicherung und fünf weitere Sätze | Inkrementelle Sicherung |
| Die Sicherung am Mittwoch umfasst 60 GB | Differentielle Sicherung |
| Alle Sicherungen einer Woche zusammen: 1.220 GB | Differentielle Sicherung |
| Für den Freitagsstand braucht man die Vollsicherung und den Freitagssatz | Differentielle Sicherung |

**Erklärung (so sehen Lernende sie):**

> Tägliche Vollsicherung: 800, 820, …, 920 GB, zusammen 6.020 GB. Inkrementell: 800 GB + 6 × 20 GB = 920 GB. Differentiell: 800 GB + (20 + 40 + 60 + 80 + 100 + 120) GB = 1.220 GB; am Mittwoch sind es 3 × 20 = 60 GB. Typische Verwechslung: Die differentielle Wochensumme liegt zwischen der inkrementellen und der täglichen Vollsicherung, weil die Sätze von Tag zu Tag wachsen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### RAID-Level (4 Fragen) — Zonen: RAID 0 · RAID 1 · RAID 5 · RAID 6 · RAID 10

**Besonders prüfen:**
- ⚠ RAID ist keine Datensicherung (Q-11.2-15 und -18).
- ⚠ Q-11.2-16: Die RAID-5-Szenarien sind nur über die Randbedingungen (Plattenzahl, Schreiblast, ein Ausfall genügt) von RAID 6/10 abgegrenzt — Formulierungen hart genug?
- ⚠ Q-11.2-18: „Zwei 12-TB-Platten ergeben 12 TB nutzbar“ = RAID 1; Zahlen aus der Theorie von 11.2.

#### Q-11.2-15 · RAID-Level (Leicht)

*Ordne die Eigenschaften dem passenden RAID-Level zu.*

| Begriff | Zone |
| --- | --- |
| Kein Ausfallschutz, dafür maximale Geschwindigkeit und volle Kapazität | RAID 0 |
| Fällt eine einzige Platte aus, ist der gesamte Verbund verloren | RAID 0 |
| Zwei Platten mit identischem Inhalt, jede kann allein weiterlaufen | RAID 1 |
| Spiegelung: Bei zwei Platten ist nur die halbe Rohkapazität nutzbar | RAID 1 |
| Ein Paritätsblock je Datenstreifen, eine Platte darf ausfallen | RAID 5 |
| Mindestens drei Platten, nutzbar sind (n − 1) × c | RAID 5 |
| Zwei Paritätsblöcke je Datenstreifen, zwei Ausfälle tolerierbar | RAID 6 |
| Mindestens vier Platten, nutzbar sind (n − 2) × c | RAID 6 |
| Gespiegelte Paare, über die gestreift wird, mindestens vier Platten | RAID 10 |
| Je Spiegelpaar darf eine Platte ausfallen, beide Platten eines Paares dürfen es nicht | RAID 10 |

**Erklärung (so sehen Lernende sie):**

> RAID 0 verteilt Daten nur (Striping) und bietet keine Redundanz. RAID 1 spiegelt, RAID 5 und RAID 6 speichern zusätzlich Parität (eine bzw. zwei Platten Gegenwert), RAID 10 kombiniert Spiegelung und Striping. Typische Verwechslung: RAID 10 und RAID 6 haben beide mindestens vier Platten, tolerieren aber Ausfälle unterschiedlich — RAID 6 immer zwei beliebige, RAID 10 nur einen je Spiegelpaar. Und: Kein RAID-Level ist eine Datensicherung, denn gelöschte oder verschlüsselte Daten sind auf allen Platten sofort mit weg.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.2-16 · RAID-Level (Mittel)

*Ordne die Einsatzszenarien dem RAID-Level zu, das am besten dazu passt.*

| Begriff | Zone |
| --- | --- |
| Zwischenspeicher für jederzeit neu berechenbare Ergebnisse, nur Tempo zählt | RAID 0 |
| Scratch-Laufwerk einer Videoschnittstation, ein Ausfall wäre nur ärgerlich | RAID 0 |
| Systemlaufwerk eines kleinen Servers mit zwei Platten, das einen Defekt überstehen soll | RAID 1 |
| Dateiserver mit fünf Platten, wenig Schreiblast, ein Ausfall als Absicherung genügt | RAID 5 |
| Kleines System mit drei Platten, ein Ausfall abgesichert und möglichst viel nutzbarer Platz | RAID 5 |
| Archiv mit sehr großen Platten: Auch ein zweiter Ausfall beim Rebuild muss verkraftet werden | RAID 6 |
| Verbund aus acht Platten, in dem zwei beliebige Platten gleichzeitig ausfallen dürfen | RAID 6 |
| Datenbankserver mit vielen Schreibzugriffen: Leistung wichtiger als Kapazität | RAID 10 |
| Virtualisierungshost mit vier Platten und hoher Schreiblast, ein Ausfall je Spiegelpaar ok | RAID 10 |

**Erklärung (so sehen Lernende sie):**

> RAID 0 passt nur zu Daten, deren Verlust verkraftbar ist. RAID 1 ist die einfachste Absicherung bei genau zwei Platten. RAID 5 holt bei wenig Schreiblast viel nutzbaren Platz heraus, ist aber nur gegen einen Ausfall geschützt, während RAID 6 bei großen Platten und langem Rebuild den zweiten Ausfall abfängt. Bei vielen Schreibzugriffen ist RAID 10 wegen des geringen Schreibaufwands (2 statt 4 bzw. 6 Plattenzugriffe) oft besser. Typische Verwechslung: Wer nur auf die Kapazität schaut, wählt RAID 5, übersieht dabei aber Schreibleistung und Rebuild-Risiko.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.2-17 · RAID-Level (Mittel)

*Ordne die Angaben zu Plattenzahl, Schreibaufwand und Kapazität dem RAID-Level zu, auf das sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Mindestens zwei Platten, nutzbar sind alle n × c | RAID 0 |
| Sechs 4-TB-Platten ergeben 24 TB nutzbar, aber ohne Ausfalltoleranz | RAID 0 |
| Mindestens zwei Platten, jeder Schreibvorgang landet auf beiden | RAID 1 |
| Aus zwei 4-TB-Platten bleiben 4 TB nutzbar | RAID 1 |
| Mindestens drei Platten, typisch vier Plattenzugriffe je Schreibvorgang | RAID 5 |
| Sechs 4-TB-Platten ergeben 20 TB nutzbar | RAID 5 |
| Mindestens vier Platten, typisch sechs Plattenzugriffe je Schreibvorgang | RAID 6 |
| Sechs 4-TB-Platten ergeben 16 TB nutzbar | RAID 6 |
| Mindestens vier Platten, nur zwei Plattenzugriffe je Schreibvorgang | RAID 10 |
| Sechs 4-TB-Platten ergeben 12 TB nutzbar | RAID 10 |

**Erklärung (so sehen Lernende sie):**

> Mindestplattenzahl: RAID 0 und 1 je zwei, RAID 5 drei, RAID 6 und 10 je vier. Nutzbare Kapazität bei n = 6 und c = 4 TB: RAID 0 = 24 TB, RAID 5 = (6 − 1) × 4 = 20 TB, RAID 6 = (6 − 2) × 4 = 16 TB, RAID 10 = 6 / 2 × 4 = 12 TB. Beim Schreiben kosten die Paritätslevel mehr Plattenzugriffe (RAID 5 typisch 4, RAID 6 typisch 6) als die Spiegellevel (je 2). Typische Verwechslung: RAID 6 und RAID 10 verlangen beide vier Platten, unterscheiden sich aber bei Kapazität und Schreibaufwand.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-11.2-18 · RAID-Level (Schwer)

*Ordne die Situationen dem RAID-Level zu, auf das sie zutreffen (gleich große Platten, Beispiele: acht Platten zu 4 TB bzw. zwei Platten zu 12 TB).*

| Begriff | Zone |
| --- | --- |
| Schon ein einzelner Plattendefekt macht eine Rücksicherung aus dem Backup nötig | RAID 0 |
| Acht 4-TB-Platten ergeben 32 TB nutzbar, aber ohne Ausfallschutz | RAID 0 |
| Zwei 12-TB-Platten ergeben 12 TB nutzbar, der Ausfall einer Platte bleibt folgenlos | RAID 1 |
| Sinnvoll für das Betriebssystem eines kleinen Servers, wenn nur Platz für zwei Platten ist | RAID 1 |
| Acht 4-TB-Platten ergeben 28 TB nutzbar | RAID 5 |
| Beim Rebuild ohne Redundanz: ein zweiter Ausfall oder Lesefehler vernichtet Daten | RAID 5 |
| Acht 4-TB-Platten ergeben 24 TB nutzbar | RAID 6 |
| Beim Rebuild fällt eine zweite, beliebige Platte aus, der Verbund bleibt trotzdem intakt | RAID 6 |
| Acht 4-TB-Platten ergeben 16 TB nutzbar | RAID 10 |
| Nach einem Ausfall führt nur der Ausfall des Spiegelpartners (1 von 7) zu Datenverlust | RAID 10 |

**Erklärung (so sehen Lernende sie):**

> Kapazität bei acht 4-TB-Platten: RAID 0 = 32 TB, RAID 5 = 28 TB, RAID 6 = 24 TB, RAID 10 = 16 TB; zwei 12-TB-Platten als RAID 1 ergeben 12 TB. Beim Rebuild großer Platten (rund 22 Stunden bei 12 TB und 150 MB/s) ist RAID 5 ohne Redundanz, RAID 6 dagegen toleriert einen weiteren beliebigen Ausfall, RAID 10 nur dann, wenn nicht der Spiegelpartner ausfällt (1 von 7, etwa 14 Prozent). Wichtig: RAID schützt nur vor Plattenausfällen und ersetzt kein Backup — gerade beim RAID 0 bleibt nach dem Defekt nur die Rücksicherung. Typische Verwechslung: „Zwei Ausfälle verkraftet“ gilt bei RAID 6 immer, bei RAID 10 nur zufällig.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Netzwerksicherheits-Bausteine (4 Fragen) — Zonen: Firewall · NAT · VPN · DMZ/Segmentierung · Zugangskontrolle am Netzrand (802.1X/Port-Security)

**Besonders prüfen:**
- ⚠ Grenzfälle: „Gäste dürfen laut Zugriffsmatrix nur ins Internet“ (DMZ/Segmentierung, in der Praxis von der Firewall durchgesetzt), „nach erfolgreicher Anmeldung ein bestimmtes VLAN zugewiesen“ (802.1X), „ungewollt ausgehandelte Trunks … VLAN Hopping“ (Segmentierung, wie 9.3 es einordnet).
- ⚠ Einige Begriffe sind mit 95–105 Zeichen länger als vorgesehen (Beispiel Q-9.3-16).

#### Q-9.3-15 · Netzwerksicherheits-Bausteine (Leicht)

*Ordne die Szenarien dem Baustein der Netzwerksicherheit zu, der sie jeweils hauptsächlich löst.*

| Begriff | Zone |
| --- | --- |
| Verkehr zwischen Netzen wird nach Quelle, Ziel, Dienst und Aktion erlaubt oder verboten | Firewall |
| Alles, was nicht ausdrücklich erlaubt ist, wird durch eine abschließende Regel gesperrt | Firewall |
| Viele Büro-PCs mit privaten Adressen teilen sich eine öffentliche Adresse | NAT |
| Eingehende Verbindungen auf einem öffentlichen Port gehen an einen internen Server | NAT |
| Ein Heimarbeitsplatz greift verschlüsselt auf das Firmennetz zu | VPN |
| Zwei Filialen sind über einen verschlüsselten Tunnel durch das Internet gekoppelt | VPN |
| Webserver aus dem Internet erreichbar, Intranet bleibt geschützt | DMZ/Segmentierung |
| Das Gäste-WLAN erhält ein eigenes VLAN und Subnetz nur mit Internetzugang | DMZ/Segmentierung |
| Nur freigegebene Geräte dürfen am Switchport Netzwerkzugang erhalten | Zugangskontrolle am Netzrand (802.1X/Port-Security) |
| Ein Endgerät muss sich per RADIUS anmelden, bevor der Port freigeschaltet wird | Zugangskontrolle am Netzrand (802.1X/Port-Security) |

**Erklärung (so sehen Lernende sie):**

> Die Firewall filtert Verkehr nach Regeln, NAT setzt Adressen um, das VPN schützt die Übertragung durch einen Tunnel, Segmentierung bzw. DMZ trennt Zonen mit unterschiedlichem Schutzbedarf, und die Zugangskontrolle am Netzrand entscheidet, wer überhaupt angeschlossen werden darf. Typische Verwechslung: NAT „versteckt“ interne Adressen, ist aber keine Firewall — der Schutz entsteht erst durch ein Regelwerk.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-16 · Netzwerksicherheits-Bausteine (Mittel)

*Ordne die Situationen dem Baustein zu, um den es dabei im Kern geht.*

| Begriff | Zone |
| --- | --- |
| Büro-PCs dürfen ausgehend nur TCP 80 und 443, die letzte Regel verbietet alles Übrige | Firewall |
| Antworten auf vom Büro aufgebaute Verbindungen kommen durch, unaufgeforderte Pakete nicht | Firewall |
| Der Router setzt die private Quelladresse 192.168.10.25 auf die öffentliche Adresse um | NAT |
| Mehrere interne Server sind von außen über verschiedene Ports einer Adresse erreichbar | NAT |
| Ein Notebook im Hotel baut per Client und Zweitfaktor einen Tunnel ins Firmennetz auf | VPN |
| Die Adressbereiche von Zentrale und Filiale dürfen sich für den Tunnel nicht überlappen | VPN |
| Ein kompromittierter Mail-Gateway im eigenen Netz öffnet nicht den Zugang zum Intranet | DMZ/Segmentierung |
| Produktionsmaschinen mit veralteter Software liegen in einer abgeschirmten Zone | DMZ/Segmentierung |
| Ein fremder Laptop an der Netzwerkdose bekommt keinen Zugang, die MAC-Adresse ist unbekannt | Zugangskontrolle am Netzrand (802.1X/Port-Security) |
| Das Enterprise-WLAN prüft Zertifikat oder Zugangsdaten jeder Person über RADIUS | Zugangskontrolle am Netzrand (802.1X/Port-Security) |

**Erklärung (so sehen Lernende sie):**

> Entscheidend ist, welche Aufgabe im Szenario im Vordergrund steht. Regeln und Verbindungstabelle gehören zur Firewall, Adressumschreibung und Portweiterleitung zu NAT, Tunnel und Client-Anbindung zum VPN, Zonenbildung zur DMZ/Segmentierung und die Anmeldung am Port oder WLAN zur Zugangskontrolle. Die Bausteine überschneiden sich im Alltag: Zwischen den Zonen und am Tunnelende arbeitet ebenfalls eine Firewall, und die DMZ wird mit einer Firewall umgesetzt — gefragt ist hier jeweils der Kern des Szenarios. Typische Verwechslung: Der 802.1X-Server prüft die Anmeldung, er filtert aber keinen Verkehr zwischen Zonen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-17 · Netzwerksicherheits-Bausteine (Mittel)

*Ordne die Beobachtungen aus Kundennetzen dem Baustein zu, auf den sie sich beziehen.*

| Begriff | Zone |
| --- | --- |
| Eine allgemeine Verbotsregel über einer Erlaubnisregel macht die Erlaubnis wirkungslos | Firewall |
| Ausgehender Verkehr eines infizierten Rechners ins Internet soll gezielt blockiert werden | Firewall |
| Private Adressen aus 10.0.0.0/8 erreichen das Internet über eine öffentliche Adresse | NAT |
| Antworten aus dem Internet erreichen dank Umsetzungstabelle das richtige interne Gerät | NAT |
| Beim Split Tunneling läuft nur der Verkehr zum Firmennetz verschlüsselt durch den Tunnel | VPN |
| Zwei Standorte koppeln ihre Netze per IPsec mit Schlüsselaustausch über IKE | VPN |
| Gäste dürfen laut Zugriffsmatrix nur ins Internet, Server sind nur für Arbeitsplätze offen | DMZ/Segmentierung |
| Wird der Webserver angegriffen, erreicht der Angreifer nicht ohne Weiteres das interne Netz | DMZ/Segmentierung |
| Ein Gerät mit unbekannter MAC-Adresse führt zur Sperrung des Switchports | Zugangskontrolle am Netzrand (802.1X/Port-Security) |
| Nach erfolgreicher Anmeldung am Authentifizierungsserver wird ein bestimmtes VLAN zugewiesen | Zugangskontrolle am Netzrand (802.1X/Port-Security) |

**Erklärung (so sehen Lernende sie):**

> Reihenfolge der Regeln und Egress-Filterung sind Themen der Firewall; Umsetzungstabelle und Portzuordnung sind typisch für NAT; Split Tunneling und IKE gehören zum VPN; Zugriffsmatrix und DMZ-Prinzip beschreiben die Zonenbildung; Port-Security und 802.1X regeln den Zugang am Netzrand. Typische Verwechslung: Die Zugriffsmatrix wird in der Praxis von der Firewall durchgesetzt, sie beschreibt aber das Segmentierungskonzept. Ebenso sind NAT-Tabelle und Firewall-Verbindungstabelle zwei verschiedene Dinge, auch wenn sie oft im selben Gerät laufen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-18 · Netzwerksicherheits-Bausteine (Schwer)

*Ordne die fachlichen Aussagen dem Baustein zu, auf den sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Mit „drop“ statt „reject“ erhalten Angreifer an der Außengrenze keine Rückmeldung | Firewall |
| Regeln werden von oben nach unten geprüft, die erste zutreffende beendet die Prüfung | Firewall |
| Bei IPv6 in der Regel nicht nötig, weil genügend öffentliche Adressen vorhanden sind | NAT |
| Eine Portweiterleitung öffnet einen internen Dienst nach außen, möglichst Richtung DMZ | NAT |
| IPsec, TLS-basierte Verfahren und WireGuard sind verbreitete Verfahren dafür | VPN |
| Nur so verfügbar wie die Leitungen an beiden Enden, daher wird ein Ersatzweg geplant | VPN |
| Ungewollt ausgehandelte Trunks an Endgeräteports ermöglichen VLAN Hopping | DMZ/Segmentierung |
| Die Managementzone für Switches, Access Points und Firewall ist von Arbeitsplätzen getrennt | DMZ/Segmentierung |
| Supplicant, Authenticator und RADIUS-Server sind die drei Rollen | Zugangskontrolle am Netzrand (802.1X/Port-Security) |
| MAC-Adressen sind fälschbar, deshalb ist dieser Basisschutz keine starke Authentifizierung | Zugangskontrolle am Netzrand (802.1X/Port-Security) |

**Erklärung (so sehen Lernende sie):**

> Hier geht es um Detailwissen: Regelreihenfolge und drop/reject betreffen die Firewall, IPv6-Bedarf und Portweiterleitung NAT, die Verfahren und die Abhängigkeit von der Leitung das VPN, VLAN Hopping und die Managementzone die Segmentierung, Rollen und MAC-Schwäche die Zugangskontrolle am Netzrand. Typische Verwechslung: Ein VLAN allein trennt nur auf Schicht 2 und ist keine Firewall; die Rollen von 802.1X werden gern mit Firewall-Begriffen vermischt, obwohl der Authenticator (Switch oder Access Point) nur den Port freischaltet oder sperrt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Verzeichnisdienst und Berechtigungen (4 Fragen) — Zonen: Benutzerkonto · Gruppe · Organisationseinheit (OU) · Gruppenrichtlinie (GPO) · Berechtigung (ACL)

**Besonders prüfen:**
- ⚠ Q-10.1-15 enthält einen ausdrücklichen Deny-Eintrag in der ACL; Aussagen zu GPO-Verknüpfung und OU gelten für Active Directory.

#### Q-10.1-14 · Verzeichnisdienst und Berechtigungen (Leicht)

*Ordne die Aufgaben dem passenden Baustein zu.*

| Begriff | Zone |
| --- | --- |
| Eine Person meldet sich mit eigenem Namen und Kennwort an | Benutzerkonto |
| Handlungen im System lassen sich einer einzelnen Person zurechnen | Benutzerkonto |
| Alle Vertriebsmitarbeitenden erhalten Zugriff auf das Laufwerk | Gruppe |
| Beim Abteilungswechsel ändert sich nur die Mitgliedschaft, die Rechte folgen | Gruppe |
| Die Verwaltung für die Filiale wird an eine örtliche Administratorin delegiert | Organisationseinheit (OU) |
| Konten und Computer eines Standorts werden im Verzeichnis nach Abteilung gegliedert | Organisationseinheit (OU) |
| Passwortregeln zentral erzwingen | Gruppenrichtlinie (GPO) |
| Auf allen Arbeitsplätzen soll sich der Bildschirm nach 10 Minuten sperren | Gruppenrichtlinie (GPO) |
| Wer darf diesen Ordner lesen oder ändern? | Berechtigung (ACL) |
| Am Ordner steht, dass die Buchhaltung nur lesen darf | Berechtigung (ACL) |

**Erklärung (so sehen Lernende sie):**

> Das Konto steht für die einzelne Person, die Gruppe bündelt Konten für die Rechtevergabe, die OU gliedert und delegiert die Verwaltung, die GPO verteilt Einstellungen, und die ACL regelt den Zugriff auf eine Ressource. Typische Verwechslung: Gruppe und OU wirken ähnlich („Vertrieb“ gibt es oft als beides), haben aber verschiedene Aufgaben — Rechte gehen an Gruppen, Richtlinien und Delegation an OUs.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.1-15 · Verzeichnisdienst und Berechtigungen (Mittel)

*Ordne die Anforderungen eines Kunden dem Baustein zu, mit dem sie umgesetzt werden.*

| Begriff | Zone |
| --- | --- |
| Ein neuer Auszubildender erhält am ersten Tag eigene Zugangsdaten | Benutzerkonto |
| Eine ausgeschiedene Mitarbeiterin darf sich nicht mehr anmelden, ihr Zugang wird gesperrt | Benutzerkonto |
| Die Rechte auf die Projektablage werden für zwölf Personen gebündelt vergeben | Gruppe |
| Ein Mitarbeiter im Verkauf soll automatisch die Rechte des Verkaufs erhalten | Gruppe |
| Die Standortleitung darf nur Kennwörter ihrer eigenen Abteilung zurücksetzen | Organisationseinheit (OU) |
| Für die Filiale Nord entsteht im Verzeichnis ein eigener Bereich für Konten und Computer | Organisationseinheit (OU) |
| Netzlaufwerke und Drucker werden beim Anmelden automatisch verbunden | Gruppenrichtlinie (GPO) |
| Die Installation nicht freigegebener Software wird auf allen Arbeitsplätzen unterbunden | Gruppenrichtlinie (GPO) |
| Die Leitung darf einen Ordner ändern, die Werkstatt ihn nur lesen | Berechtigung (ACL) |
| Eine einzelne Person soll einen bestimmten Ordner ausdrücklich nicht öffnen dürfen | Berechtigung (ACL) |

**Erklärung (so sehen Lernende sie):**

> Jede Anforderung lässt sich auf die Frage zurückführen: Wer ist die Person (Konto), wer gehört zusammen (Gruppe), wo liegt es und wer verwaltet es (OU), wie sollen Systeme konfiguriert sein (GPO), was darf wer an der Ressource (ACL). Typische Verwechslung: Das automatische Verbinden von Netzlaufwerken ist eine Konfigurationseinstellung (GPO); ob jemand das Laufwerk anschließend öffnen darf, entscheidet die ACL.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.1-16 · Verzeichnisdienst und Berechtigungen (Mittel)

*Ordne die Beobachtungen aus der Praxis dem Baustein zu, auf den sie sich beziehen.*

| Begriff | Zone |
| --- | --- |
| Ein Dienst soll unter eigener Kennung laufen, nicht unter dem Konto einer Person | Benutzerkonto |
| Mehrere Personen teilen sich ein Sammelkonto, Handlungen sind nicht zurechenbar | Benutzerkonto |
| Rechte werden nicht an Einzelpersonen, sondern an eine Sammlung von Konten vergeben | Gruppe |
| Beim Wechsel (Mover) wird die Mitgliedschaft geändert, die Rechte passen sich an | Gruppe |
| Wer hier Verwaltungsrechte erhält, darf nur diesen Teil des Verzeichnisses pflegen | Organisationseinheit (OU) |
| Die Gliederung nach Standort und Abteilung bildet die Hierarchie für vererbte Vorgaben | Organisationseinheit (OU) |
| Die Vorgabe „Bildschirmsperre nach 10 Minuten“ wird technisch durchgesetzt | Gruppenrichtlinie (GPO) |
| Eine neue Vorgabe wird erst an einer Testgruppe erprobt, weil sie sonst alle trifft | Gruppenrichtlinie (GPO) |
| Laut Rollenmatrix darf der Verkauf Kundenakten ändern, die Werkstatt nur lesen | Berechtigung (ACL) |
| Bei Freigabe- und NTFS-Berechtigung gilt effektiv die restriktivere Kombination | Berechtigung (ACL) |

**Erklärung (so sehen Lernende sie):**

> Die Rollenmatrix wird technisch als Einträge an den Ressourcen umgesetzt (ACL), die Bildschirmsperre als zentrale Einstellung (GPO). Vererbung von Vorgaben läuft über die Hierarchie des Verzeichnisses (OU). Typische Verwechslung: Sammelkonten wirken praktisch, verhindern aber die Zurechenbarkeit; sie sind ein Konto-Problem, kein Gruppen-Thema.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-10.1-17 · Verzeichnisdienst und Berechtigungen (Schwer)

*Ordne die Aussagen dem Baustein zu, auf den sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Sammelkonten wie „Werkstatt1“ sind zu vermeiden, Handlungen bleiben sonst nicht zurechenbar | Benutzerkonto |
| Verwaiste Konten ausgeschiedener Beschäftigter sind ein klassisches Sicherheitsrisiko | Benutzerkonto |
| Kann Konten und weitere Gruppen enthalten | Gruppe |
| Rechte werden bevorzugt ihr statt Einzelpersonen zugewiesen, sonst wird es unübersichtlich | Gruppe |
| Dient der Gliederung, taucht aber in keiner Berechtigungsliste eines Ordners auf | Organisationseinheit (OU) |
| Delegation: Der Zuständige verwaltet nur Objekte seines Teils des Verzeichnisses | Organisationseinheit (OU) |
| Wirkt auf alle Benutzer und Computer unterhalb des Containers, mit dem sie verknüpft ist | Gruppenrichtlinie (GPO) |
| Eine Fehleinstellung hier betrifft sofort alle Benutzer und Computer im Container | Gruppenrichtlinie (GPO) |
| Gehört zur Ressource, nicht zum Konto, und enthält Einträge je Konto oder Gruppe | Berechtigung (ACL) |
| Ein Eintrag legt fest: lesen, ändern, löschen oder Rechte verwalten | Berechtigung (ACL) |

**Erklärung (so sehen Lernende sie):**

> Konten sind personenbezogen und müssen gepflegt werden (verwaiste Konten, Sammelkonten). Gruppen bündeln Rechte, OUs gliedern und delegieren, GPOs setzen Einstellungen für einen ganzen Container durch, ACLs hängen an der Ressource. Typische Verwechslung: Eine GPO wird mit einem Container verknüpft (OU, Domäne, Standort), nicht „an eine Person“ vergeben; ihre Wirkung kann zusätzlich auf bestimmte Gruppen eingeschränkt werden, und sie ersetzt keine ACL.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Switching, VLAN, Routing und Redundanz (4 Fragen) — Zonen: Switching (Layer 2) · VLAN/Trunking · Routing (Layer 3) · Redundanz (Spanning Tree)

**Besonders prüfen:**
- ⚠ Q-9.1-17: „Randswitch wird ungewollt Root Bridge, weil seine MAC-Adresse die niedrigste ist“ setzt voraus, dass die Priorität nicht gesetzt wurde (steht in der Erklärung).
- ⚠ Layer-3-Switch-Grenzfälle wurden vermieden.

#### Q-9.1-14 · Switching, VLAN, Routing und Redundanz (Leicht)

*Ordne die Aufgaben bzw. Probleme dem passenden Verfahren zu.*

| Begriff | Zone |
| --- | --- |
| Frames anhand der MAC-Adresstabelle weiterleiten | Switching (Layer 2) |
| Frames mit unbekannter Ziel-MAC-Adresse an alle anderen Ports fluten | Switching (Layer 2) |
| Broadcast-Domäne verkleinern | VLAN/Trunking |
| Mehrere getrennte Netze über einen einzigen Link zwischen zwei Switches übertragen | VLAN/Trunking |
| Pakete anhand der IP-Adresse in ein anderes Netz weiterleiten | Routing (Layer 3) |
| Pakete ohne spezifischere Route über die Default-Route zum Internetzugang schicken | Routing (Layer 3) |
| Schleife im Layer-2-Netz verhindern | Redundanz (Spanning Tree) |
| Bei Ausfall des aktiven Links einen blockierten Weg aktivieren | Redundanz (Spanning Tree) |

**Erklärung (so sehen Lernende sie):**

> Switching leitet innerhalb eines Layer-2-Netzes nach MAC-Adressen weiter, VLANs und Trunks teilen dieses Netz logisch auf und transportieren die Teilnetze, Routing verbindet Netze anhand der IP-Adresse, und Spanning Tree sorgt dafür, dass redundante Wege keine Schleifen erzeugen. Typische Verwechslung: Die MAC-Adresstabelle (Switch) und die Routing-Tabelle (Router) haben ähnliche Aufgaben, arbeiten aber auf verschiedenen Schichten mit verschiedenen Adressen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-15 · Switching, VLAN, Routing und Redundanz (Mittel)

*Ordne die Anforderungen bzw. Beobachtungen dem passenden Verfahren zu.*

| Begriff | Zone |
| --- | --- |
| Der Switch merkt sich die Quell-MAC-Adresse eines Frames zusammen mit dem Eingangsport | Switching (Layer 2) |
| Bei einem Switch bildet jeder Port eine eigene Kollisionsdomäne | Switching (Layer 2) |
| Gäste und Mitarbeitende sollen auf denselben Switches getrennte Layer-2-Netze erhalten | VLAN/Trunking |
| Der PC am Access-Port sendet Frames ohne Tag, die Zugehörigkeit legt der Port fest | VLAN/Trunking |
| Der Eintrag mit dem längsten Präfix bestimmt den nächsten Hop eines Pakets | Routing (Layer 3) |
| Bei vielen Standorten sollen sich die Wege per OSPF bei Änderungen selbst anpassen | Routing (Layer 3) |
| Der Switch mit der niedrigsten Bridge-ID wird Mittelpunkt eines schleifenfreien Baums | Redundanz (Spanning Tree) |
| Redundante Verkabelung soll keinen Broadcast-Sturm mehr auslösen | Redundanz (Spanning Tree) |

**Erklärung (so sehen Lernende sie):**

> MAC-Lernen und Kollisionsdomänen gehören zum Switching, Access-Ports und Tags zu VLANs, Longest Prefix Match und OSPF zum Routing, Root Bridge und Broadcast-Sturm zu Spanning Tree. Typische Verwechslung: Ein VLAN verkleinert die Broadcast-Domäne, verhindert aber keine Schleifen; Spanning Tree verhindert Schleifen, trennt aber keine Netze.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-16 · Switching, VLAN, Routing und Redundanz (Mittel)

*Ordne die Eigenschaften dem Verfahren zu, auf das sie sich beziehen.*

| Begriff | Zone |
| --- | --- |
| Ein einzelner Switch ohne VLANs bildet nur eine einzige Broadcast-Domäne | Switching (Layer 2) |
| Es arbeitet mit MAC-Adressen und Frames, nicht mit IP-Adressen und Paketen | Switching (Layer 2) |
| Nutzbare IDs reichen von 1 bis 4094, das Tag ist 4 Byte lang (IEEE 802.1Q) | VLAN/Trunking |
| Das Native VLAN muss auf beiden Seiten eines Links gleich konfiguriert sein | VLAN/Trunking |
| Die Tabelle enthält Zielnetz, Präfix, nächsten Hop und Schnittstelle | Routing (Layer 3) |
| Distance-Vector- und Link-State-Verfahren tauschen Infos über erreichbare Netze aus | Routing (Layer 3) |
| Frames tragen keine Lebensdauer, deshalb kreisen Broadcasts in Schleifen endlos | Redundanz (Spanning Tree) |
| Die Root Bridge wird bewusst per niedriger Priorität auf den Kernswitch gelegt | Redundanz (Spanning Tree) |

**Erklärung (so sehen Lernende sie):**

> Die Eigenschaften stammen aus unterschiedlichen Schichten und Mechanismen: MAC-Adressen und Broadcast-Domäne (Switching), 802.1Q-Tag und Native VLAN (VLAN/Trunking), Routing-Tabelle und Routing-Protokolle (Routing), Lebensdauer-Problem und Root Bridge (Spanning Tree). Typische Verwechslung: Die Routing-Tabelle wird oft mit der MAC-Adresstabelle gleichgesetzt; die erste verwaltet Netze und nächste Hops, die zweite einzelne Geräte und Ports.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.1-17 · Switching, VLAN, Routing und Redundanz (Schwer)

*Ordne die Fehlerbilder aus Kundennetzen dem Verfahren zu, in dem die Ursache am wahrscheinlichsten liegt.*

| Begriff | Zone |
| --- | --- |
| Ein Unicast-Frame an eine noch unbekannte MAC-Adresse erreicht kurzzeitig alle Ports | Switching (Layer 2) |
| Ein Hub wiederholt jedes Signal an alle Ports, ein Switch sendet nur an den Zielport | Switching (Layer 2) |
| Das Gäste-WLAN fällt aus, weil das Gäste-VLAN nicht getaggt zum Access Point läuft | VLAN/Trunking |
| Zwei PCs im selben Subnetz sehen sich nicht, weil ein Port im falschen VLAN liegt | VLAN/Trunking |
| Ein Paket geht verloren, weil weder passende Route noch Default-Route existiert | Routing (Layer 3) |
| Nach einem Leitungsausfall bleibt der Standort getrennt, es gibt nur statische Routen | Routing (Layer 3) |
| Ein neues Patchkabel zwischen zwei Switches löst einen Broadcast-Sturm aus | Redundanz (Spanning Tree) |
| Ein Randswitch wird ungewollt Root Bridge, weil seine MAC-Adresse die niedrigste ist | Redundanz (Spanning Tree) |

**Erklärung (so sehen Lernende sie):**

> Fehlendes Tagging oder falsche Access-Port-Zuordnung sind VLAN-Themen; fehlende Routen oder fehlende automatische Umschaltung gehören zum Routing; Schleifen ohne wirksames Spanning Tree führen zum Broadcast-Sturm, und ohne gesetzte Priorität entscheidet die niedrigste MAC-Adresse über die Root Bridge. Typische Verwechslung: Wenn zwei Geräte im selben Subnetz sich nicht erreichen, liegt das Problem im Layer-2-Netz (VLAN/Switching), nicht im Routing; Routing wird erst für den Übergang in ein anderes Netz benötigt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 2. Neue Theorieabschnitte

### SI3 · Die Bausteine im Zusammenspiel: Konto, Gruppe, OU, GPO und ACL

> ### Die Bausteine im Zusammenspiel: Konto, Gruppe, OU, GPO und ACL
>
> In einem Windows-Netz mit Active Directory greifen fünf Bausteine ineinander, die leicht verwechselt werden:
>
> - **Benutzerkonto:** bildet eine Person (oder einen Dienst) mit eigenem Namen und Kennwort ab. Es beantwortet die Frage „Wer meldet sich an?“ (Authentifizierung).
> - **Gruppe:** fasst Konten mit gleichem Zugriffsbedarf zusammen und kann auch andere Gruppen enthalten. Sie ist das Mittel der **Rechtevergabe**: Wer Mitglied ist, erhält die Rechte der Gruppe.
> - **Organisationseinheit (OU):** ein Container zur **Gliederung** des Verzeichnisses, etwa nach Standort oder Abteilung. An einer OU lassen sich Verwaltungsaufgaben delegieren (die Filiale pflegt ihre eigenen Objekte) und Richtlinien verknüpfen. Eine OU erteilt aber selbst keine Zugriffsrechte und taucht nicht in den Berechtigungslisten eines Ordners auf.
> - **Gruppenrichtlinie (GPO, Group Policy Object):** eine Sammlung von **Einstellungen** (Passwortregeln, Bildschirmsperre, Netzlaufwerke, Software-Beschränkungen). Sie wird mit einem Container wie einer OU, einer Domäne oder einem Standort verknüpft und wirkt auf die darin enthaltenen Benutzer und Computer. Ihre Wirkung lässt sich zusätzlich auf bestimmte Gruppen einschränken. Sie legt fest, **wie Systeme konfiguriert sind**, nicht, wer auf eine bestimmte Datei zugreifen darf.
> - **Berechtigung (ACL, Access Control List):** die Zugriffskontrollliste einer **Ressource**, z. B. eines Ordners. Jeder Eintrag benennt ein Konto oder eine Gruppe und das erlaubte oder verweigerte Recht (lesen, ändern, löschen, Rechte verwalten). Sie beantwortet „Wer darf diesen Ordner lesen oder ändern?“.
>
> Merkhilfe: Das Konto sagt, **wer** jemand ist, die Gruppe, **wer zusammengehört**, die OU, **wo** etwas im Verzeichnis liegt und wer es verwaltet, die GPO, **wie** Systeme konfiguriert werden, und die ACL, **was** wer an einer Ressource tun darf. Beim Autohaus Brandt liegen die Konten der Werkstatt in der OU „Werkstatt“; eine GPO an dieser OU sperrt dort den Bildschirm nach 10 Minuten; die Gruppe „Werkstatt“ erhält in der ACL des Auftragsordners das Recht „Ändern“. Typische Verwechslung: Rechte auf Ordner werden an Gruppen vergeben, nicht an eine OU — die OU dient der Verwaltung und der Richtlinienzuordnung.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Aussagen gelten für Active Directory: Eine GPO wird an Standort, Domäne oder OU verknüpft und kann per Gruppe eingeschränkt werden; eine OU taucht in keiner ACL als Berechtigte auf.
- ⚠ Die bestehende Karteikarte K-10.1-16 sagt „auf Gruppen von Benutzern oder Computern angewendet“ — etwas lockerer als die neue Fassung (Verknüpfung an Container); angleichen?
- ⚠ Keine Linux-Entsprechung genannt, weil Thema 10.1 sie nicht nennt.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 3. Troubleshooting-Sets (Spiel „Troubleshooting-Detektiv“, Kurs Systemintegration)

Je Fall: erst die **Ebene/Schicht** wählen, dann die **wahrscheinlichste Ursache**; je Fall genau eine richtige Antwort. Zu prüfen: Ist die Ursache aus den Symptomen eindeutig ableitbar, die Ebene vertretbar, die Erklärung fachlich richtig? **Alle Befehlsausgaben, Logzeilen und Fehlermeldungen sind aus Kenntnis geschrieben, nicht aus einem Lauf.**

### Troubleshooting: Serverdienste (10 Fälle, setKey `serverdienste`)

**Zum Set — besonders prüfen:**
- ⚠ Statt OSI-Schichten fünf eigene Ebenen (Netzwerkanbindung, Firewall und Netzfilter, Betriebssystem und Ressourcen, Dienstkonfiguration, Konten/Rechte/Zertifikate), von unten nach oben; „Netzwerkanbindung“ ist nie richtig und dient nur als Ablenker. Das Zertifikat liegt unter „Konten, Rechte und Zertifikate“, nicht unter Dienstkonfiguration — passt das?
- ⚠ Fall 10: Kerberos-Logzeile (`Clock skew too great`) aus dem Gedächtnis; Toleranz 5 Minuten ist Standard, aber konfigurierbar.
- ⚠ Fall 9: Postfix-Meldung („cannot find your hostname“) setzt `reject_unknown_client_hostname` voraus — für Lernende zu speziell?
- ⚠ Fälle 1, 2, 4, 8: Linux-Ausgaben (ss, bind(), Firewall-Log), Windows-Fehler `0x80070070` und Quota-Meldung aus Kenntnis; bei FSRM-Quoten kann die echte Meldung abweichen.

#### serverdienste · 1 — Webdienst startet nach der Wartung nicht

*Die Hansen Baustoffe GmbH betreibt ihr Intranet auf einem Linux-Server (websrv01). Nach dem Wartungsfenster am Wochenende ist die Seite nicht erreichbar. Ein Kollege der Brevanta IT-Systemhaus GmbH hat am Freitag Updates eingespielt und den Server neu gestartet; der Webdienst sollte danach automatisch laufen.*

**Symptome:**
- systemctl status webdienst zeigt „Active: failed (Result: exit-code)“; der Hauptprozess wurde mit „status=1/FAILURE“ beendet.
- Im Journal steht kurz vor dem Abbruch: „bind() to 0.0.0.0:443 failed (98: Address already in use)“.
- ss -tlnp zeigt für Port 443 den Eintrag „LISTEN 0 511 0.0.0.0:443“ mit dem Prozess testproxy (pid=2317); dieser Prozess läuft seit dem Wartungsfenster.
- Die Konfigurationsprüfung des Webdienstes meldet „Syntax OK“; Zertifikat und Dokumentenverzeichnis sind für das Dienstkonto lesbar.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Konfigurationsdatei des Webdienstes enthält einen Syntaxfehler. |
| ✔ Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | Die Host-Firewall des Servers blockiert den Port 443. |
| Firewall und Netzfilter (Erreichbarkeit) | ✔ Ein anderer Prozess (ein Test-Proxy) belegt den Port 443, deshalb kann der Webdienst ihn nicht öffnen. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Dem Dienstkonto fehlen die Rechte auf das Dokumentenverzeichnis. |

**Richtig:** Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) → Ein anderer Prozess (ein Test-Proxy) belegt den Port 443, deshalb kann der Webdienst ihn nicht öffnen.

**Erklärung:**

> Die Fehlermeldung nennt die Stelle genau: Der Webdienst kann den Port nicht öffnen, weil er schon vergeben ist, und ss zeigt, welcher Prozess ihn hält. Ein Syntaxfehler scheidet aus, denn die Konfigurationsprüfung ist in Ordnung. Fehlende Rechte hätten eine „Permission denied“-Meldung zur Folge, und eine Firewall greift erst bei eingehenden Verbindungen, verhindert aber nicht das Starten des Dienstes. Ein Port kann zur selben Zeit nur von einem Prozess belegt werden; das ist ein Ressourcenkonflikt im Betriebssystem. Maßnahme: klären, wer den Test-Proxy installiert hat und ob er noch gebraucht wird, ihn dann beenden und deaktivieren, den Webdienst starten und im Wartungsprotokoll festhalten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 2 — Speichern nicht mehr möglich, obwohl Platz da ist

*In der Steuerkanzlei Rehfeld & Partner (Windows-Dateiserver FS01) meldet eine Sachbearbeiterin, dass sie auf ihrem Home-Laufwerk H: nichts mehr speichern kann. Die Kolleginnen arbeiten ohne Probleme. Im Monitoring des Servers steht seit Wochen keine Warnung zum Speicherplatz.*

**Symptome:**
- Beim Speichern erscheint „Es ist nicht genügend Speicherplatz vorhanden“; Löschen und Lesen funktionieren.
- Das Datenvolumen D: von FS01 hat 4,0 TB Kapazität, 1,9 TB sind frei (Füllstand 52 %); alle anderen Home-Verzeichnisse sind beschreibbar.
- Die Quotenverwaltung zeigt für D:/Home/m.keller eine feste Quote (hard quota) von 20 GB; Verbrauch 20,0 GB, also 100 %.
- Im Home-Verzeichnis liegt ein Archivordner „Postfach-Export“ mit 11 GB; die Berechtigungen des Ordners sind unverändert.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | ✔ Für das Home-Verzeichnis der Benutzerin gilt eine harte Quote, und sie ist ausgeschöpft. |
| Netzwerkanbindung (Verbindung, Adressierung) | Das Datenvolumen D: des Servers ist voll. |
| ✔ Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | Der Benutzerin fehlt die Schreibberechtigung auf ihr Home-Verzeichnis. |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Netzwerkverbindung zum Dateiserver ist gestört. |

**Richtig:** Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) → Für das Home-Verzeichnis der Benutzerin gilt eine harte Quote, und sie ist ausgeschöpft.

**Erklärung:**

> Das Volumen hat reichlich Platz und die Kolleginnen speichern problemlos, also ist weder der Server voll noch das Netz gestört (Verbindung und Lesen funktionieren). Gegen eine fehlende Schreibberechtigung spricht die Meldung zum Speicherplatz: Bei fehlenden Rechten käme „Zugriff verweigert“, und die Berechtigungen sind unverändert. Die Quotenverwaltung nennt die Ursache: Die feste Quote von 20 GB ist erreicht, weitere Schreibvorgänge werden abgewiesen, obwohl das Volumen leer genug ist. Quoten begrenzen den Verbrauch je Benutzer oder Ordner. Maßnahme: mit der Benutzerin den Export aufräumen oder archivieren; ist der Bedarf begründet, die Quote nach Rücksprache mit der Fachabteilung anheben und die Warnschwelle (z. B. 80 %) einrichten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 3 — Neue Geräte bekommen keine Adresse

*Bei der Hausverwaltung Seeberg GmbH melden sich seit heute früh neue Notebooks und Smartphones im Büro-WLAN und im Büronetz ohne gültige Adresse. Bereits angemeldete Geräte arbeiten normal. Der DHCP-Server (Windows Server) steht im selben Netz 10.70.10.0/24 wie die Clients.*

**Symptome:**
- ipconfig /all auf einem betroffenen Notebook zeigt „DHCP aktiviert: Ja“ und eine Adresse 169.254.31.7 mit dem Zusatz „Autokonfiguration“; Link und Signal sind in Ordnung.
- Der Dienst „DHCP-Server“ läuft; im Ereignisprotokoll gibt es keine Fehler, der Server ist autorisiert.
- Die Bereichsstatistik zeigt für 10.70.10.0 einen Adresspool von .100 bis .200 (101 Adressen): 101 vergeben, 0 verfügbar (100 %); die Leasedauer beträgt 8 Tage.
- In der Leaseliste stehen viele Einträge von Geräten, die laut Hostname Smartphones sind und seit Tagen nicht mehr aktiv waren.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Netzwerkanbindung (Verbindung, Adressierung) | Der DHCP-Dienst ist abgestürzt und antwortet nicht mehr. |
| Firewall und Netzfilter (Erreichbarkeit) | ✔ Der Adresspool des DHCP-Bereichs ist erschöpft (zu klein, Leasedauer zu lang), es ist keine freie Adresse mehr vorhanden. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Ein zweiter, nicht autorisierter DHCP-Server verteilt falsche Adressen. |
| ✔ Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Switchports der betroffenen Geräte liegen im falschen VLAN. |

**Richtig:** Dienstkonfiguration (Einstellungen, Zonen, Pools) → Der Adresspool des DHCP-Bereichs ist erschöpft (zu klein, Leasedauer zu lang), es ist keine freie Adresse mehr vorhanden.

**Erklärung:**

> Die Adresse 169.254.x.x vergibt sich das Gerät selbst, wenn es keine Antwort eines DHCP-Servers erhält. Der Dienst läuft jedoch, und die Statistik zeigt 0 verfügbare Adressen: Der Pool ist leer. Ein zweiter DHCP-Server würde Angebote verteilen, die Geräte erhielten dann irgendeine Adresse (aber keine 169.254-Adresse). Ein falsches VLAN passt nicht, da dieselben Ports vorher funktionierten und der Server im selben Netz steht. Ursache sind 8-Tage-Leases von Geräten, die längst weg sind, bei einem für die Zahl der Geräte zu kleinen Pool. Maßnahme: veraltete Leases bereinigen, den Pool vergrößern oder die Leasedauer für das WLAN verkürzen, dazu eine Warnung bei hoher Poolauslastung einrichten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 4 — Neue Anwendung: Verbindung läuft in die Zeitüberschreitung

*Die Spedition Rademacher GmbH hat eine neue Tourenplanung als Webanwendung auf einem Linux-Server (app01, 10.40.0.21) installiert. Sie lauscht auf TCP 8443. Von den Arbeitsplätzen im Büronetz 10.40.10.0/24 lässt sich die Seite nicht aufrufen; der Browser wartet und gibt irgendwann auf.*

**Symptome:**
- Auf app01: ss -tln zeigt „LISTEN 0 4096 0.0.0.0:8443“; curl -k https://localhost:8443 liefert „HTTP/1.1 200 OK“.
- Vom Arbeitsplatz aus: ping app01 antwortet in 1 ms; die Portprüfung auf TCP 8443 endet nach etwa 20 Sekunden mit „TcpTestSucceeded: False“, also ohne sofortige Ablehnung.
- Der SSH-Port 22 desselben Servers ist vom Arbeitsplatz aus erreichbar.
- Die Regelliste der Host-Firewall enthält Freigaben für TCP 22, 80 und 443, die Standardrichtlinie für eingehenden Verkehr lautet „drop“; im Protokoll steht: „DROP IN=ens18 SRC=10.40.10.15 DST=10.40.0.21 PROTO=TCP DPT=8443“.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | Der Dienst der Anwendung läuft nicht. |
| ✔ Firewall und Netzfilter (Erreichbarkeit) | Das Zertifikat der Anwendung ist ungültig. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Zwischen Büronetz und Servernetz fehlt eine Route. |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | ✔ Die Host-Firewall des Servers lässt eingehende Verbindungen auf TCP 8443 nicht zu (Freigabe fehlt). |
| Netzwerkanbindung (Verbindung, Adressierung) |  |

**Richtig:** Firewall und Netzfilter (Erreichbarkeit) → Die Host-Firewall des Servers lässt eingehende Verbindungen auf TCP 8443 nicht zu (Freigabe fehlt).

**Erklärung:**

> Der Dienst läuft und lauscht auf dem Port, denn lokal liefert er eine Antwort. Ping und der SSH-Port zeigen, dass Netz und Routing in Ordnung sind. Ein ungültiges Zertifikat würde eine Browserwarnung nach erfolgreichem Verbindungsaufbau auslösen, nicht eine Zeitüberschreitung. Dass die Verbindung ohne jede Antwort hängt (und nicht sofort mit „Verbindung abgelehnt“ endet), ist typisch für eine Firewall, die Pakete stillschweigend verwirft; das Protokoll belegt es. Ein geschlossener Port ohne Dienst würde dagegen sofort abgewiesen. Maßnahme: eine Regel nur für TCP 8443 aus dem Büronetz hinzufügen, nicht die Firewall abschalten, danach testen und die Freigabe dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 5 — Zugriff verweigert auf die Finanzablage

*Bei der Maschinenbau Kolbe GmbH hat ein neuer Mitarbeiter in der Buchhaltung seinen Arbeitsplatz erhalten. Er kann sich anmelden und arbeiten, aber die Freigabe Finanzen auf dem Windows-Dateiserver FS01 lässt sich nicht öffnen. Seine Kollegin am Nachbartisch öffnet sie ohne Probleme.*

**Symptome:**
- Anmeldung an der Domäne gelingt; die Freigabe Allgemein auf FS01 lässt sich öffnen; beim Öffnen von Finanzen kommt „Zugriff verweigert“.
- Freigabeberechtigungen der Freigabe Finanzen: „Authentifizierte Benutzer: Ändern“. NTFS-Berechtigungen des Ordners: „GG_Finanzen: Ändern, Administratoren: Vollzugriff“.
- Die Gruppenmitgliedschaften des neuen Benutzers: Domänen-Benutzer und GG_Allgemein; GG_Finanzen ist nicht dabei.
- Die Kollegin ist Mitglied der Gruppe GG_Finanzen.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Netzwerkanbindung (Verbindung, Adressierung) | Der Dateidienst auf FS01 ist gestört. |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Freigabeberechtigung der Freigabe Finanzen ist zu streng. |
| Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | ✔ Der Benutzer ist nicht Mitglied der Gruppe, die auf NTFS-Ebene Zugriff auf den Ordner hat (GG_Finanzen). |
| ✔ Konten, Rechte und Zertifikate (Identität, Berechtigung) | Das Benutzerkonto ist gesperrt. |
| Firewall und Netzfilter (Erreichbarkeit) |  |

**Richtig:** Konten, Rechte und Zertifikate (Identität, Berechtigung) → Der Benutzer ist nicht Mitglied der Gruppe, die auf NTFS-Ebene Zugriff auf den Ordner hat (GG_Finanzen).

**Erklärung:**

> Die Anmeldung und die Freigabe Allgemein zeigen, dass Konto, Netz und Dateidienst in Ordnung sind; ein gesperrtes Konto hätte schon die Anmeldung verhindert. Die Freigabeberechtigung lässt alle authentifizierten Benutzer mit „Ändern“ zu und ist daher nicht das Hindernis. Bei einem Zugriff über das Netz gilt immer die strengere der beiden Berechtigungen (Freigabe und NTFS). Hier ist die NTFS-Berechtigung der Engpass: Sie vergibt den Zugriff nur an GG_Finanzen, und der neue Mitarbeiter gehört der Gruppe nicht an. Maßnahme: nach Freigabe durch die Fachabteilung (Prinzip der minimalen Rechte) den Benutzer in die Gruppe aufnehmen, ihn anschließend ab- und wieder anmelden (damit die neue Gruppe wirksam wird) und die Änderung im Ticket festhalten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 6 — Zeiterfassung nur noch per IP-Adresse erreichbar

*Die Rotbuch Metallbau GmbH hat die Webanwendung der Zeiterfassung vor zwei Tagen auf eine neue virtuelle Maschine umgezogen. Seitdem funktioniert der Aufruf über zeit.rotbuch.example an keinem Arbeitsplatz, auch nicht bei Kolleginnen, die den Rechner neu gestartet haben.*

**Symptome:**
- Der Aufruf über http://zeit.rotbuch.example endet in einer Zeitüberschreitung; der Aufruf über http://10.50.0.40 öffnet die Anwendung sofort.
- nslookup zeit.rotbuch.example liefert 10.50.0.25; die neue VM hat laut Umzugsprotokoll die Adresse 10.50.0.40, die alte VM ist abgeschaltet (ping auf 10.50.0.25 ohne Antwort).
- Auch nach ipconfig /flushdns und bei einer Abfrage direkt am DNS-Server (nslookup zeit.rotbuch.example 10.50.0.5) kommt weiterhin 10.50.0.25 zurück.
- In der DNS-Verwaltung steht für zeit der A-Eintrag 10.50.0.25 als „statisch“ ohne Zeitstempel; die Zone ist sonst unauffällig.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Netzwerkanbindung (Verbindung, Adressierung) | Der DNS-Zwischenspeicher der Arbeitsplatzrechner enthält einen veralteten Eintrag. |
| Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | ✔ Der A-Eintrag für zeit in der DNS-Zone zeigt noch auf die alte Adresse 10.50.0.25 und wurde beim Umzug nicht angepasst. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Die Firewall blockiert den Zugriff auf die neue virtuelle Maschine. |
| Firewall und Netzfilter (Erreichbarkeit) | Der Webdienst auf der neuen virtuellen Maschine läuft nicht. |
| ✔ Dienstkonfiguration (Einstellungen, Zonen, Pools) | Der DNS-Server ist ausgefallen. |

**Richtig:** Dienstkonfiguration (Einstellungen, Zonen, Pools) → Der A-Eintrag für zeit in der DNS-Zone zeigt noch auf die alte Adresse 10.50.0.25 und wurde beim Umzug nicht angepasst.

**Erklärung:**

> Über die IP-Adresse funktioniert alles, also laufen die neue VM, ihr Webdienst und der Weg dorthin (Firewall und Netz sind in Ordnung). Der DNS-Server antwortet, ist also nicht ausgefallen, aber mit der alten Adresse. Weil auch die direkte Abfrage am Server die alte Adresse liefert, liegt es nicht am lokalen Zwischenspeicher der Clients: Der Fehler steckt im Eintrag selbst. Er ist statisch und hat keinen Zeitstempel, deshalb räumt auch die automatische Bereinigung ihn nie ab. Maßnahme: den A-Eintrag auf 10.50.0.40 ändern (oder neu anlegen), die Wirkung per nslookup prüfen und den Umzug künftig mit einem Schritt „DNS anpassen“ in der Checkliste führen; die TTL vor Umzügen kurz setzen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 7 — Mandantenportal: Zertifikatswarnung bei allen

*Das Mandantenportal der Steuerkanzlei Rehfeld & Partner läuft auf einem Linux-Server (portal01) hinter einem Webdienst mit HTTPS. Seit heute früh zeigt der Browser bei Mandantinnen und Mitarbeitenden gleichermaßen eine Sicherheitswarnung; vor dem Wochenende war alles in Ordnung.*

**Symptome:**
- Der Browser meldet „Ihre Verbindung ist nicht privat“ mit dem Fehlercode NET::ERR_CERT_DATE_INVALID; mit „Trotzdem fortfahren“ lädt das Portal und arbeitet normal.
- openssl s_client -connect portal01:443 | openssl x509 -noout -dates liefert „notBefore=Oct 5 07:30:12 2025 GMT“ und „notAfter=Oct 5 07:30:12 2026 GMT“.
- Systemzeit von portal01 und der Arbeitsplätze weichen weniger als eine Sekunde vom Zeitserver ab.
- Webdienst und Port 443 laufen unauffällig; das Zertifikat wurde vor genau einem Jahr von Hand ausgestellt, eine automatische Erneuerung ist nicht eingerichtet.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| ✔ Konten, Rechte und Zertifikate (Identität, Berechtigung) | Die Uhr des Servers geht falsch, deshalb gilt das Zertifikat als ungültig. |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | Das Zertifikat wurde von einer nicht vertrauenswürdigen Zertifizierungsstelle ausgestellt. |
| Netzwerkanbindung (Verbindung, Adressierung) | Der Webdienst auf portal01 ist abgestürzt. |
| Firewall und Netzfilter (Erreichbarkeit) | ✔ Das Serverzertifikat von portal01 ist abgelaufen. |
| Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | Der Name im Zertifikat passt nicht zum aufgerufenen Servernamen. |

**Richtig:** Konten, Rechte und Zertifikate (Identität, Berechtigung) → Das Serverzertifikat von portal01 ist abgelaufen.

**Erklärung:**

> Der Fehlercode nennt es direkt: Das Datum liegt außerhalb der Gültigkeit. Der Zeitraum im Zertifikat endete heute früh, und genau dann begann die Warnung. Eine falsche Uhr scheidet aus, weil Server und Clients richtig gehen. Bei einer unbekannten Zertifizierungsstelle käme ein anderer Fehlercode (Authority invalid), bei einem falschen Namen ebenfalls (Common Name invalid). Der Dienst läuft, denn das Portal lädt nach der Warnung. Die Warnung wegzuklicken ist keine Lösung, denn damit lernen Anwender, Sicherheitsmeldungen zu ignorieren. Maßnahme: ein neues Zertifikat beantragen und einspielen, den Dienst neu laden, die Kette prüfen, die Erneuerung automatisieren und Ablaufdaten in einem Inventar mit Erinnerung führen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 8 — Nachtsicherung seit vier Nächten fehlgeschlagen

*Das Monitoring der Hausverwaltung Seeberg GmbH meldet seit vier Nächten den Sicherungsauftrag „FS01-Nachtsicherung“ als fehlgeschlagen. Der Auftrag sichert den Windows-Dateiserver FS01 über das Netz auf den Backup-Server BK01 und lief davor acht Monate ohne Fehler. Es wurde nichts am Auftrag geändert.*

**Symptome:**
- Das Jobprotokoll von BK01 endet nach etwa zwei Stunden mit „Schreiben auf das Sicherungsziel fehlgeschlagen: 0x80070070, Auf dem Datenträger ist nicht genügend Speicherplatz vorhanden“.
- Das Sicherungsvolumen E: auf BK01 ist mit 11,8 TB von 12,0 TB belegt (98 %); die Belegung stieg in den letzten Monaten stetig.
- Das Dienstkonto des Auftrags kann auf E: eine 10-MB-Testdatei anlegen und löschen; ein Ping und ein Durchsatztest zwischen FS01 und BK01 sind unauffällig (rund 940 Mbit/s, kein Paketverlust).
- Die Quelldaten von FS01 lassen sich fehlerfrei lesen; der Datenträger meldet im Zustandsbericht keine Fehler.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Das Dienstkonto des Sicherungsauftrags hat auf dem Ziel keine Schreibrechte mehr. |
| Firewall und Netzfilter (Erreichbarkeit) | Die Netzwerkverbindung zwischen FS01 und BK01 ist instabil. |
| ✔ Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | ✔ Das Speicherziel (Volumen E: auf BK01) ist voll, die neue Sicherung passt nicht mehr hinein. |
| Netzwerkanbindung (Verbindung, Adressierung) | Der Datenträger des Dateiservers FS01 ist defekt. |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) |  |

**Richtig:** Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) → Das Speicherziel (Volumen E: auf BK01) ist voll, die neue Sicherung passt nicht mehr hinein.

**Erklärung:**

> Die Fehlermeldung heißt wörtlich, dass der Platz auf dem Datenträger nicht reicht, und das Sicherungsvolumen ist zu 98 % belegt. Dass das Dienstkonto eine kleine Testdatei schreiben kann, schließt fehlende Rechte aus; die guten Netzwerkwerte sprechen gegen eine instabile Verbindung, und die Quelle ist gesund. Die Sicherung bricht ab, weil für die große Vollsicherung der freie Platz nicht mehr ausreicht, nicht weil etwas kaputt wäre. Das Wachstum zeigt eine Kapazitätsplanung, die versäumt wurde. Maßnahme: sofort Platz schaffen nach dem Aufbewahrungskonzept (nicht wahllos Sicherungen löschen), die Speicherauslastung des Ziels überwachen (Warnung ab 80 %), Kapazität erweitern und danach eine Wiederherstellung testen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 9 — Scan-to-Mail wird abgewiesen

*Bei der Maschinenbau Kolbe GmbH funktioniert Scan-to-Mail an den Multifunktionsgeräten seit gestern nicht mehr. Davor hat der Versand über das interne Mail-Relay (Linux, relay01) problemlos geklappt. Am Vortag hat die Brevanta IT-Systemhaus GmbH den DNS-Server durch eine neue virtuelle Maschine ersetzt; die Namensauflösung wirkt auf den ersten Blick normal.*

**Symptome:**
- Das Display des Geräts meldet „Senden fehlgeschlagen“; Mails von den Arbeitsplätzen über andere Wege sind nicht betroffen.
- Im Mail-Log von relay01 steht: „NOQUEUE: reject: RCPT from unknown[10.60.10.80]: 450 4.7.1 Client host rejected: cannot find your hostname, [10.60.10.80]“.
- Ein Verbindungstest vom Gerätenetz auf relay01 Port 25 gelingt, das Banner „220 relay01 ESMTP“ erscheint; ein Anmeldefehler tritt nicht auf.
- Auf relay01 liefert nslookup mfp-eg.kolbe.example die Adresse 10.60.10.80; nslookup 10.60.10.80 endet mit „** server can't find 80.10.60.10.in-addr.arpa: NXDOMAIN“. Auf dem DNS-Server gibt es nur die Forward-Zone kolbe.example, keine Reverse-Lookupzone.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Netzwerkanbindung (Verbindung, Adressierung) | Die Zugangsdaten des Geräts für den Mailversand sind falsch. |
| ✔ Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Firewall blockiert den SMTP-Port 25 zum Mail-Relay. |
| Firewall und Netzfilter (Erreichbarkeit) | Der Speicherplatz auf relay01 ist voll. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Die Forward-Zone ist unvollständig, der Name des Geräts wird nicht aufgelöst. |
| Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | ✔ Die Reverse-Lookupzone fehlt auf dem neuen DNS-Server, deshalb kann das Relay den Namen des Geräts zur Adresse nicht ermitteln. |

**Richtig:** Dienstkonfiguration (Einstellungen, Zonen, Pools) → Die Reverse-Lookupzone fehlt auf dem neuen DNS-Server, deshalb kann das Relay den Namen des Geräts zur Adresse nicht ermitteln.

**Erklärung:**

> Der Verbindungsaufbau gelingt und das Banner erscheint, Port 25 und Firewall sind also nicht das Problem. Ein falsches Passwort würde eine Anmeldefehlermeldung auslösen, ein voller Datenträger eine Meldung zum Speicher. Das Log nennt die Ablehnung: Das Relay prüft, ob zur Client-Adresse ein Name existiert (Reverse-Lookup), und findet keinen. Die Forward-Auflösung ist in Ordnung, nur die Rückrichtung (PTR-Einträge in der Zone in-addr.arpa) fehlt; der alte DNS-Server hatte diese Zone, die neue VM nicht. Das ist eine unvollständige Auflösung, kein Totalausfall. Maßnahme: die Reverse-Lookupzone für 10.60.10.0/24 anlegen und die PTR-Einträge pflegen oder dynamisch registrieren, die Migration künftig mit Checkliste (alle Zonen) durchführen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### serverdienste · 10 — Domänenanmeldung am Linux-Dateiserver scheitert

*Bei der Rotbuch Metallbau GmbH wurde der Linux-Dateiserver lxfs01 (Mitglied der Windows-Domäne) gestern Abend wegen eines Fehlers aus einer Sicherung wiederhergestellt. Seit heute früh scheitert die Anmeldung von Domänenbenutzern an lxfs01, obwohl die Passwörter korrekt sind. An anderen Domänenmitgliedern klappt dieselbe Anmeldung.*

**Symptome:**
- Der Server antwortet auf Ping, der Freigabedienst läuft; Zugriffe mit lokalen Konten funktionieren, Zugriffe mit Domänenkonten scheitern bei mehreren Benutzern gleichermaßen.
- Im Journal von lxfs01 steht: „krb5_child: Preauthentication failed: Clock skew too great“.
- date auf lxfs01 zeigt 08:29:52, der Domänencontroller 08:41:10 Uhr: Abweichung 11 Minuten 18 Sekunden. timedatectl: „System clock synchronized: no“, „NTP service: inactive“.
- Der Domänencontroller ist erreichbar; Konten sind weder gesperrt noch abgelaufen; die Namensauflösung der Domänencontroller ist in Ordnung.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Dienstkonfiguration (Einstellungen, Zonen, Pools) | Die Konten der Domänenbenutzer sind abgelaufen. |
| Firewall und Netzfilter (Erreichbarkeit) | ✔ Die Systemzeit von lxfs01 weicht mehr als die zulässigen fünf Minuten von der des Domänencontrollers ab, weil keine Zeitsynchronisation läuft; Kerberos lehnt die Anmeldung ab. |
| Konten, Rechte und Zertifikate (Identität, Berechtigung) | Der Domänencontroller ist nicht erreichbar. |
| ✔ Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) | Die Berechtigungen der Freigabe sind falsch gesetzt. |
| Netzwerkanbindung (Verbindung, Adressierung) | Die Domänenmitgliedschaft von lxfs01 wurde gelöscht. |

**Richtig:** Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit) → Die Systemzeit von lxfs01 weicht mehr als die zulässigen fünf Minuten von der des Domänencontrollers ab, weil keine Zeitsynchronisation läuft; Kerberos lehnt die Anmeldung ab.

**Erklärung:**

> Die Meldung „Clock skew too great“ ist eindeutig: Das Anmeldeverfahren Kerberos akzeptiert nur Zeitabweichungen von meist höchstens fünf Minuten, damit abgefangene Tickets nicht später wiederverwendet werden können. Hier sind es über elf Minuten, und der Zeitdienst ist nicht aktiv. Der Domänencontroller ist erreichbar und die Konten sind in Ordnung, also scheidet beides aus. Eine gelöschte Domänenmitgliedschaft hätte eine andere Fehlermeldung und würde auch die Dienstkonten betreffen, und Freigabeberechtigungen kämen erst nach erfolgreicher Anmeldung ins Spiel. Die Wiederherstellung aus der Sicherung hat die Uhr verstellt. Maßnahme: Zeitdienst aktivieren und mit dem Zeitserver synchronisieren, Anmeldung testen, nach jeder Wiederherstellung einer VM die Uhrzeit prüfen und die Zeitabweichung überwachen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Troubleshooting: Switching und Routing (10 Fälle, setKey `switching-routing`)

**Zum Set — besonders prüfen:**
- ⚠ Fall 5 (Duplex-Mismatch): auf Schicht 1 gelegt (Duplex/Autonegotiation); Late Collisions und CRC-Fehler sind MAC-nah, manche Lehrbücher ordnen das Schicht 2 zu — Entscheidung nötig. Zählerwerte sind erfunden.
- ⚠ Fall 7 (DHCP-Relay): Schicht 3, weil das Relay am Router liegt; das Netzwerk-Set ordnet „DHCP-Dienst läuft nicht“ der Anwendungsschicht zu — konsistent genug?
- ⚠ Fall 9: anspruchsvoll (Hin- und Rückweg getrennt betrachten); setzt voraus, dass der Niederlassungs-Router die Route 10.40.0.0/16 kennt (steht in den Symptomen).
- ⚠ CLI-Ausgaben herstellerneutral in Anlehnung an gängige Bezeichnungen (`err-disabled`, `ip helper-address`, `show access-lists`); Wortlaute der Logzeilen aus Kenntnis; Windows-Meldungen (tracert, „Zielhost nicht erreichbar“) nicht live verifiziert.

#### switching-routing · 1 — Neuer Server erreicht andere Netze nicht

*In der Steuerkanzlei Rehfeld & Partner wurde ein neuer Terminalserver (ts02, Linux) mit fester Adresse im Servernetz VLAN 20 (10.20.0.96/28, Router-Schnittstelle 10.20.0.110) in Betrieb genommen. Die Arbeitsplätze im Büronetz VLAN 10 (10.20.0.0/26) erreichen ihn nicht, und er erreicht keine Geräte außerhalb seines Netzes.*

**Symptome:**
- Link-LED und Portstatus sind in Ordnung (1 Gbit/s, Vollduplex, keine Fehlerzähler); der Port gehört zum VLAN 20.
- ts02 hat die Adresse 10.20.0.105 mit der Maske 255.255.255.240; ping auf den Dateiserver 10.20.0.98 im selben Netz antwortet in unter 1 ms.
- ping auf einen Arbeitsplatz (10.20.0.20) und auf das Internet endet mit einer Zeitüberschreitung; die Arbeitsplätze erreichen die anderen Server im VLAN 20 ohne Probleme.
- ip route auf ts02 zeigt „default via 10.20.0.100“; ip neigh zeigt für 10.20.0.100 den Zustand FAILED.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Bitübertragung (Schicht 1) | Der Switchport von ts02 ist dem falschen VLAN zugeordnet. |
| Sicherung (Schicht 2) | ✔ Als Standardgateway ist 10.20.0.100 eingetragen, die Router-Schnittstelle hat aber die Adresse 10.20.0.110. |
| ✔ Vermittlung (Schicht 3) | Der Router der Kanzlei ist ausgefallen. |
| Transport (Schicht 4) | Die Subnetzmaske von ts02 ist falsch eingetragen. |

**Richtig:** Vermittlung (Schicht 3) → Als Standardgateway ist 10.20.0.100 eingetragen, die Router-Schnittstelle hat aber die Adresse 10.20.0.110.

**Erklärung:**

> Im eigenen Netz funktioniert die Kommunikation, daher sind Kabel, Port und VLAN in Ordnung (Schicht 1 und 2) und auch die Maske passt zu 10.20.0.96/28. Ziele außerhalb des Netzes gehen über das Standardgateway: Dort ist 10.20.0.100 eingetragen, eine Adresse, die niemand im Netz hat, daher bleibt der ARP-Eintrag FAILED. Ein ausgefallener Router würde alle Server im VLAN 20 treffen, die Arbeitsplätze erreichen die anderen aber. Das ist ein Fehler in der Adressierung (Schicht 3). Maßnahme: das Gateway auf 10.20.0.110 ändern (Tippfehler), danach Ping in andere Netze testen und die Adressliste prüfen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 2 — Drucker im Nachbarnetz nicht erreichbar

*Bei der Hansen Baustoffe GmbH erreicht ein Arbeitsplatz in der Verwaltung den Netzwerkdrucker nicht, den alle Kolleginnen und Kollegen problemlos nutzen. Das Verwaltungsnetz (VLAN 10) ist laut Netzplan 10.30.1.0/26 mit Gateway 10.30.1.1; der Drucker steht im Drucker-VLAN 30 (10.30.1.64/26) mit der Adresse 10.30.1.70.*

**Symptome:**
- Der Arbeitsplatz hat die feste Adresse 10.30.1.20 mit der Maske 255.255.255.0; das Gateway ist 10.30.1.1.
- ping 10.30.1.1 und ping 10.30.2.10 (Server in einem anderen Netz) funktionieren.
- ping 10.30.1.70 (Drucker) endet mit „Antwort von 10.30.1.20: Zielhost nicht erreichbar“; arp -a zeigt für 10.30.1.70 keinen Eintrag.
- Ein Kollege mit der Maske 255.255.255.192 an der Nachbardose erreicht den Drucker mit Ping und Druckauftrag sofort.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| ✔ Vermittlung (Schicht 3) | Der Drucker ist defekt. |
| Bitübertragung (Schicht 1) | Das Standardgateway des Arbeitsplatzes ist falsch eingetragen. |
| Sicherung (Schicht 2) | Eine Zugriffsliste auf dem Router blockiert den Zugriff auf das Drucker-VLAN. |
| Anwendung (Schicht 7) | ✔ Der Arbeitsplatz verwendet die falsche Subnetzmaske (/24 statt /26); er hält den Drucker für ein Gerät im eigenen Netz. |

**Richtig:** Vermittlung (Schicht 3) → Der Arbeitsplatz verwendet die falsche Subnetzmaske (/24 statt /26); er hält den Drucker für ein Gerät im eigenen Netz.

**Erklärung:**

> Der Drucker ist in Ordnung, denn der Kollege erreicht ihn. Gateway und andere Netze erreicht der Arbeitsplatz, also stimmen Gateway und Verbindung. Auffällig ist die Maske: Mit /24 liegt 10.30.1.70 im selben Netz wie 10.30.1.20, das Gerät sendet keine Anfrage an das Gateway, sondern fragt per ARP direkt nach dem Drucker. Der Drucker liegt aber hinter dem Router in einem anderen VLAN, und die ARP-Anfrage geht ins Leere, deshalb meldet Windows „Zielhost nicht erreichbar“ vom eigenen Rechner. Eine Zugriffsliste hätte den Kollegen ebenfalls getroffen. Das ist eine Frage der Adressierung (Schicht 3). Maßnahme: Maske auf 255.255.255.192 setzen, besser per DHCP vergeben und feste Eintragungen dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 3 — Neuer Büroplatz landet im Gäste-WLAN-Netz

*Bei der Rotbuch Metallbau GmbH wurde ein Arbeitsplatz in einen anderen Raum verlegt und an die Dose 14 angeschlossen. Der Rechner erhält eine Adresse und kommt ins Internet, erreicht aber keinen Server und keine Netzlaufwerke. Das Büronetz ist laut Plan VLAN 10 (10.50.10.0/24); der Dateiserver steht im Servernetz (10.50.20.10).*

**Symptome:**
- Der Link ist aktiv (1 Gbit/s, Vollduplex), am Port gibt es keine Fehlerzähler.
- ipconfig zeigt die vom DHCP vergebene Adresse 10.50.40.87/24 mit Gateway 10.50.40.1; nach Plan müsste die Adresse aus 10.50.10.0/24 stammen.
- Der Zugriff auf Webseiten funktioniert, ping 10.50.20.10 (Dateiserver) endet mit einer Zeitüberschreitung; die Nachbarrechner an den Dosen 13 und 15 erreichen den Server.
- Die Portkonfiguration am Switch zeigt für Port 14: „access, VLAN 40 (Gäste)“; die Nachbarports 13 und 15 stehen auf „access, VLAN 10 (Büro)“.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Transport (Schicht 4) | ✔ Der Access-Port 14 ist dem falschen VLAN zugeordnet (Gäste-VLAN 40 statt Büro-VLAN 10). |
| ✔ Sicherung (Schicht 2) | Der DHCP-Server vergibt fehlerhafte Adressen. |
| Vermittlung (Schicht 3) | Die Firewall blockiert den Zugriff auf den Dateiserver. |
| Bitübertragung (Schicht 1) | Das Patchkabel des Arbeitsplatzes ist defekt. |

**Richtig:** Sicherung (Schicht 2) → Der Access-Port 14 ist dem falschen VLAN zugeordnet (Gäste-VLAN 40 statt Büro-VLAN 10).

**Erklärung:**

> Verbindung und Port sind fehlerfrei, das Kabel ist es also nicht. Der Rechner hat sich korrekt mit einer Adresse versorgt, aber aus dem Gäste-Netz 10.50.40.0/24: Der DHCP-Server vergibt je VLAN passende Adressen und arbeitet damit richtig, es ist kein Fehler des Servers. Eine Firewallregel gegen den Server würde die Nachbarrechner genauso treffen. Der Rechner hängt in einem anderen Layer-2-Netz als gedacht: Der Port wurde früher als Gästeport genutzt und blieb im VLAN 40. VLAN-Zuordnungen wirken auf Schicht 2. Maßnahme: Konfiguration des Switches sichern, Port 14 als Access-Port in VLAN 10 setzen, danach IP-Adresse erneuern, testen und die Portbeschriftung aktualisieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 4 — Dose tot nach dem Notebook-Tausch

*In der Disposition der Spedition Rademacher GmbH wurde heute früh das Notebook eines Disponenten gegen ein Ersatzgerät getauscht. Seitdem ist an dieser Dose (Port 17 des Etagenswitches) keine Verbindung möglich; die Link-LED am Notebook bleibt dunkel, die LED am Switchport leuchtet orange.*

**Symptome:**
- Der Durchgangstest des Patchkabels und der Dose verläuft fehlerfrei; das Notebook funktioniert an einer anderen Dose problemlos.
- Der Portstatus am Switch lautet für Port 17: „err-disabled“.
- Das Switch-Protokoll enthält: „Port 17: Sicherheitsverletzung (Port-Security), neue MAC-Adresse 3C:52:82:A1:07:D4 gesehen, erlaubt: 1 (E0:4F:43:9B:11:20), Port wird abgeschaltet“.
- An Port 17 ist „maximal 1 MAC-Adresse“ eingestellt; die erlaubte Adresse gehört zum alten Notebook.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Anwendung (Schicht 7) | Das Patchkabel zwischen Dose und Notebook ist defekt. |
| Vermittlung (Schicht 3) | Die Netzwerkkarte des Ersatznotebooks ist defekt. |
| Bitübertragung (Schicht 1) | ✔ Port-Security hat den Port abgeschaltet, weil eine nicht erlaubte MAC-Adresse (das Ersatznotebook) angeschlossen wurde. |
| ✔ Sicherung (Schicht 2) | Die Switchport-Hardware ist durch Überspannung beschädigt. |
| Transport (Schicht 4) |  |

**Richtig:** Sicherung (Schicht 2) → Port-Security hat den Port abgeschaltet, weil eine nicht erlaubte MAC-Adresse (das Ersatznotebook) angeschlossen wurde.

**Erklärung:**

> Dunkle Link-LED lässt zuerst an die Bitübertragung denken, doch Kabel und Dose sind getestet, und das Notebook läuft an einer anderen Dose, also ist auch die Netzwerkkarte in Ordnung. Der Switch selbst nennt den Grund: Port-Security erlaubt an diesem Port nur eine bestimmte MAC-Adresse; das Ersatzgerät hat eine andere, deshalb hat der Switch den Port in den Zustand err-disabled versetzt. Das ist gewolltes Verhalten zum Schutz vor unbefugten Geräten, es greift auf Schicht 2 (MAC-Adressen). Maßnahme: nach Rückfrage, dass das Gerät befugt ist, die erlaubte MAC-Adresse im Port-Security-Eintrag anpassen und den Port kontrolliert wieder aktivieren; Port-Security nicht abschalten, und Gerätewechsel künftig im Ticket vermerken.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 5 — Server im Lager sehr langsam, Kabel unauffällig

*Bei der Maschinenbau Kolbe GmbH greifen die Lagerterminals seit zwei Wochen nur sehr langsam auf den Warenwirtschaftsserver zu: Dateikopien dauern ewig, Abfragen hängen. Damals wurde der Access-Switch im Lager getauscht; der Server (dbsrv01) ist an Port 8 des neuen Switches angeschlossen und läuft seit Jahren unverändert.*

**Symptome:**
- Eine Dateikopie zum Server erreicht etwa 3 MB/s statt der üblichen 90 MB/s; ping auf dbsrv01 zeigt 1 ms, aber 3 % Paketverlust.
- Switch, Port 8: „100 Mbit/s, Halbduplex“; Zähler: 4.311 Late Collisions und 18.204 CRC-Fehler, beide steigen.
- Die Netzwerkkarte des Servers ist fest auf „100 Mbit/s, Vollduplex“ eingestellt; die Ports am Switch stehen auf Autonegotiation.
- Das Kabel besteht den Kabeltest (Kategorie 6, bestanden); die Link-LED ist stabil, die Auslastung des Switchs liegt unter 5 %; andere Ports laufen mit 1 Gbit/s Vollduplex fehlerfrei.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Anwendung (Schicht 7) | Das Netzwerkkabel zum Server ist defekt. |
| Vermittlung (Schicht 3) | ✔ Duplex-Mismatch: Die Serverkarte ist fest auf Vollduplex gestellt, der Switchport verhandelt automatisch und fällt auf Halbduplex zurück. |
| Transport (Schicht 4) | Der Switch ist durch den Datenverkehr überlastet. |
| Sicherung (Schicht 2) | Auf dem Server läuft ein Programm, das die Netzwerkkarte auslastet. |
| ✔ Bitübertragung (Schicht 1) |  |

**Richtig:** Bitübertragung (Schicht 1) → Duplex-Mismatch: Die Serverkarte ist fest auf Vollduplex gestellt, der Switchport verhandelt automatisch und fällt auf Halbduplex zurück.

**Erklärung:**

> Das Kabel besteht den Test, der Link ist stabil und andere Ports sind fehlerfrei: eine Überlast ist ausgeschlossen (unter 5 % Auslastung), und ein Programm auf dem Server würde den Port nicht auf Halbduplex bringen. Auffällig sind Late Collisions und CRC-Fehler bei 100 Mbit/s Halbduplex: Eine Seite ist fest auf Vollduplex eingestellt und sendet jederzeit, die andere hat sich per Autonegotiation auf Halbduplex eingestellt und erkennt Kollisionen, wo keine sein dürften. Wenn eine Seite fest konfiguriert ist, kann die andere den Duplex-Modus nicht aushandeln. Geschwindigkeit und Duplex-Modus gehören zu den Übertragungsparametern der physischen Verbindung. Maßnahme: beide Seiten auf Autonegotiation stellen (modern 1 Gbit/s), danach Zähler zurücksetzen und beobachten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 6 — Neues Scanner-VLAN nur an einem Switch erreichbar

*Die Hansen Baustoffe GmbH hat für Lagerscanner das VLAN 25 (10.30.25.0/24, Gateway 10.30.25.1 am Kernswitch SW-KERN) angelegt. Zwei Scanner an SW-HALLE im selben VLAN erreichen sich gegenseitig, aber weder das Gateway noch andere Netze. Alle anderen Geräte in der Halle arbeiten normal.*

**Symptome:**
- VLAN 25 existiert auf SW-HALLE und SW-KERN; die Scanner-Ports an SW-HALLE sind Access-Ports in VLAN 25, die Scanner haben korrekte Adressen und Gateway.
- Der Trunk zwischen SW-HALLE und SW-KERN ist aktiv (1 Gbit/s, Vollduplex), ohne Fehlerzähler; die VLANs 10 und 20 laufen darüber fehlerfrei.
- Erlaubte VLANs auf dem Trunk: SW-KERN: 1, 10, 20, 25, 99; SW-HALLE: 1, 10, 20, 99.
- show mac address-table vlan 25 auf SW-KERN zeigt die MAC-Adresse des Gateways, aber keine der Scanner.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Bitübertragung (Schicht 1) | Der Trunk-Link zwischen den Switches ist defekt. |
| Vermittlung (Schicht 3) | Das VLAN 25 wurde auf SW-HALLE nicht angelegt. |
| ✔ Sicherung (Schicht 2) | Die Scanner haben ein falsches Standardgateway. |
| Transport (Schicht 4) | Eine Zugriffsliste auf dem Kernswitch blockiert das Scanner-Netz. |
| Anwendung (Schicht 7) | ✔ Das neue VLAN 25 fehlt in der Liste der erlaubten VLANs auf dem Trunk-Port von SW-HALLE. |

**Richtig:** Sicherung (Schicht 2) → Das neue VLAN 25 fehlt in der Liste der erlaubten VLANs auf dem Trunk-Port von SW-HALLE.

**Erklärung:**

> Der Trunk ist in Ordnung (aktiv, fehlerfrei) und transportiert VLAN 10 und 20 ohne Probleme, also ist weder das Kabel noch der Link das Problem. Das VLAN 25 existiert auf beiden Switches. Dass sich die Scanner untereinander erreichen, zeigt, dass VLAN und Ports in der Halle stimmen. Die Adressen sind laut Beobachtung korrekt, und eine Zugriffsliste würde nicht dazu führen, dass die MAC-Adressen der Scanner nie auf SW-KERN ankommen. Entscheidend ist die Liste der erlaubten VLANs auf SW-HALLE: Frames des VLAN 25 werden dort nicht auf den Trunk gelegt. Das passiert auf Schicht 2. Maßnahme: Konfiguration sichern, VLAN 25 in die Liste des Trunks aufnehmen (hinzufügen, nicht die Liste ersetzen), prüfen und den VLAN-Plan aktualisieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 7 — Neue Etage bekommt keine Adressen per DHCP

*Die Hausverwaltung Seeberg GmbH hat im neuen Stockwerk das VLAN 50 (10.70.50.0/24, Gateway 10.70.50.1 auf dem Layer-3-Switch) eingerichtet. Alle Geräte dort erhalten per DHCP nur 169.254.x.x-Adressen. Der DHCP-Server (10.70.20.10) steht im Servernetz VLAN 20; die älteren Netze erhalten ihre Adressen von ihm ohne Probleme.*

**Symptome:**
- Eine am Gerät fest eingetragene Adresse 10.70.50.200/24 mit Gateway 10.70.50.1 funktioniert: Der Zugriff auf Server und Internet gelingt.
- Auf dem DHCP-Server ist der Bereich 10.70.50.0 aktiv, 101 von 101 Adressen sind frei; die Statistik zeigt für den Bereich 0 empfangene Anfragen; Anfragen aus den anderen Netzen treffen weiterhin ein.
- Ein Mitschnitt am Client zeigt wiederholte DHCP-Discover-Pakete ohne Antwort; am Server kommt kein Discover aus dem VLAN 50 an.
- Die Schnittstelle VLAN 10 des Layer-3-Switches enthält „ip helper-address 10.70.20.10“; die Schnittstelle VLAN 50 enthält nur „ip address 10.70.50.1 255.255.255.0“.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Anwendung (Schicht 7) | Der DHCP-Dienst auf dem Server ist gestoppt. |
| Sicherung (Schicht 2) | Der Adresspool des DHCP-Servers ist erschöpft. |
| Transport (Schicht 4) | Die Access-Ports im neuen Stockwerk sind dem falschen VLAN zugeordnet. |
| ✔ Vermittlung (Schicht 3) | ✔ Auf der Schnittstelle VLAN 50 fehlt das DHCP-Relay (ip helper-address); die Broadcast-Anfragen der Clients erreichen den Server in einem anderen Netz nicht. |
| Bitübertragung (Schicht 1) |  |

**Richtig:** Vermittlung (Schicht 3) → Auf der Schnittstelle VLAN 50 fehlt das DHCP-Relay (ip helper-address); die Broadcast-Anfragen der Clients erreichen den Server in einem anderen Netz nicht.

**Erklärung:**

> Ein DHCP-Discover ist ein Broadcast und bleibt auf das eigene Netz beschränkt; liegt der Server in einem anderen Subnetz, muss ein Relay (ip helper-address) am Router bzw. Layer-3-Switch die Anfrage per Unicast weitergeben. Beim VLAN 10 ist dieses Relay eingetragen, beim VLAN 50 fehlt es. Der Dienst läuft (andere Netze funktionieren), der Pool ist frei und die statische Konfiguration funktioniert, also sind weder Dienst noch Ports noch Verkabelung schuld. Am Server kommt aus dem VLAN 50 nichts an, die Anfrage wird nicht über die Netzgrenze weitergeleitet. Das ist eine Aufgabe des Routers an der Netzgrenze (Schicht 3). Maßnahme: ip helper-address auf der Schnittstelle VLAN 50 eintragen, Adresse prüfen, Konfiguration sichern und dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 8 — ERP-Seite hängt, Ping geht

*Die Rotbuch Metallbau GmbH hat gestern Abend die Zugriffsregeln zwischen dem Büronetz (VLAN 10, 10.50.10.0/24) und dem Servernetz (VLAN 20, 10.50.20.0/24) auf dem Layer-3-Switch verschärft. Seit heute früh lässt sich die ERP-Webanwendung (https, Server 10.50.20.30) aus dem Büro nicht mehr aufrufen; der Dateiserver ist weiter erreichbar.*

**Symptome:**
- ping 10.50.20.30 aus dem Büro funktioniert (1 ms); der Aufruf der ERP-Seite endet in einer Zeitüberschreitung, die Portprüfung auf TCP 443 liefert „TcpTestSucceeded: False“.
- Der Dateiserver 10.50.20.10 ist aus dem Büro per TCP 445 weiter erreichbar.
- Ein Testrechner im Servernetz (VLAN 20) ruft die ERP-Seite ohne Fehler auf; auf dem ERP-Server lauscht der Webdienst auf Port 443.
- show access-lists (SRV-OUT, ausgehend auf VLAN 20): 10 permit icmp any any (1.530 Treffer); 20 permit tcp 10.50.10.0/24 host 10.50.20.10 eq 445 (844 Treffer); 30 deny ip any any log (212 Treffer, steigend); Log: „deny tcp 10.50.10.37(51322) -> 10.50.20.30(443)“.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Vermittlung (Schicht 3) | ✔ Die Zugriffsliste auf dem Layer-3-Switch erlaubt aus dem Büro nur ICMP und TCP 445 zum Dateiserver; TCP 443 zum ERP-Server wird verworfen (Regel fehlt). |
| ✔ Transport (Schicht 4) | Der Webdienst auf dem ERP-Server ist ausgefallen. |
| Sicherung (Schicht 2) | Zwischen Büronetz und Servernetz fehlt eine Route. |
| Bitübertragung (Schicht 1) | Das Zertifikat des ERP-Servers ist abgelaufen. |
| Anwendung (Schicht 7) |  |

**Richtig:** Transport (Schicht 4) → Die Zugriffsliste auf dem Layer-3-Switch erlaubt aus dem Büro nur ICMP und TCP 445 zum Dateiserver; TCP 443 zum ERP-Server wird verworfen (Regel fehlt).

**Erklärung:**

> Der Ping und der Dateiserver zeigen, dass Verbindung und Routing zwischen den Netzen funktionieren; eine fehlende Route ist ausgeschlossen. Der Webdienst läuft, denn aus dem Servernetz selbst gelingt der Aufruf, ein Zertifikatsproblem würde erst nach dem Verbindungsaufbau und mit einer Warnung auffallen. Das Log der Zugriffsliste nennt die verworfene Verbindung genau: Zielport 443 des ERP-Servers. Die Liste erlaubt dem Büro nur ICMP und TCP 445 zum Dateiserver, alles andere wird durch die abschließende Verweigerung („deny any“) verworfen. Zugriffslisten filtern nach Protokoll und Port, also auf der Transportschicht. Maßnahme: eine eng gefasste Regel für TCP 443 vom Büronetz zum ERP-Server ergänzen, testen und die Regelmatrix dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 9 — Neues Lagernetz in der Niederlassung antwortet nicht

*Die Spedition Rademacher GmbH hat in der Niederlassung ein neues Lagernetz 10.41.8.0/24 (Router-Schnittstelle 10.41.8.1) angelegt. Die Zentrale (10.40.0.0/16) soll es über den bestehenden VPN-Tunnel (10.99.0.1 und 10.99.0.2) erreichen. Zugriffe auf die älteren Niederlassungsnetze funktionieren, auf das Lagernetz nicht.*

**Symptome:**
- tracert 10.41.8.20 von 10.40.10.15 zeigt Hop 1: 10.40.10.1 (Router der Zentrale), Hop 2: 192.0.2.1 (Internet-Gateway), danach nur noch Zeitüberschreitungen.
- Das ältere Netz 10.41.1.0/24 der Niederlassung ist aus der Zentrale erreichbar (Tunnel aktiv, 18 ms).
- Routingtabelle des Zentrale-Routers: 10.41.1.0/24 via 10.99.0.2; 0.0.0.0/0 via 192.0.2.1; für 10.41.8.0/24 gibt es keinen Eintrag. Der Router der Niederlassung hat das Netz direkt angebunden und die Route 10.40.0.0/16 via 10.99.0.1.
- Ein Rechner im Lagernetz (10.41.8.20) erreicht den Router der Niederlassung; ein Mitschnitt am Zentrale-Server zeigt dort Anfragen von 10.41.8.20, die Antworten kommen nicht an.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| ✔ Vermittlung (Schicht 3) | Der VPN-Tunnel zwischen den Standorten ist ausgefallen. |
| Sicherung (Schicht 2) | Die Firewall in der Zentrale blockiert ICMP-Pakete. |
| Transport (Schicht 4) | ✔ Auf dem Router der Zentrale fehlt eine Route zum neuen Netz 10.41.8.0/24; Pakete und Antworten laufen über die Default-Route ins Leere. |
| Anwendung (Schicht 7) | Die Subnetzmaske im Lagernetz der Niederlassung ist falsch. |
| Bitübertragung (Schicht 1) |  |

**Richtig:** Vermittlung (Schicht 3) → Auf dem Router der Zentrale fehlt eine Route zum neuen Netz 10.41.8.0/24; Pakete und Antworten laufen über die Default-Route ins Leere.

**Erklärung:**

> Das Nachbarnetz der Niederlassung funktioniert, der Tunnel ist also aktiv. Gegen eine ICMP-Sperre spricht der Verlauf von traceroute: Die Pakete laufen nicht in den Tunnel, sondern an das Internet-Gateway, weil dem Router der Zentrale für 10.41.8.0/24 nur die Default-Route bleibt. Der Mitschnitt zeigt das Gegenstück: Anfragen aus dem Lagernetz erreichen die Zentrale (der Router der Niederlassung kennt die Route dorthin), die Antworten aber nehmen denselben falschen Weg und gehen verloren. Eine falsche Maske im Lagernetz würde die Verbindung zum Router stören, doch der ist erreichbar. Weiterleitung nach Zielnetz ist Sache der Vermittlungsschicht. Maßnahme: statische Route 10.41.8.0/24 via 10.99.0.2 eintragen (oder per Routing-Protokoll lernen lassen), Hin- und Rückweg testen und das Netz in die Dokumentation aufnehmen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### switching-routing · 10 — Büronetz bricht zusammen

*Um 10:42 Uhr wird das gesamte Büronetz (VLAN 10) der Maschinenbau Kolbe GmbH extrem langsam: Verbindungen brechen ab, Telefonie und Dateizugriffe sind kaum nutzbar, die Switch-LEDs blinken in rasender Folge. Kurz vorher wurde im Besprechungsraum ein zusätzliches Patchkabel gesteckt, um einen weiteren Arbeitsplatz anzuschließen.*

**Symptome:**
- ping auf das Gateway: 40 % Paketverlust, Antwortzeiten bis 300 ms; die Uplinks zeigen 95–100 % Auslastung, die Switch-CPU rund 98 %.
- Der Broadcast-Zähler an den Ports liegt bei etwa 480.000 Paketen pro Sekunde (üblich: unter 300); die Datenmenge ist nicht von außen verursacht, am Internet-Anschluss ist die Auslastung normal.
- Das Switch-Protokoll meldet im Sekundentakt „MAC-Flapping: 3C:52:82:11:A0:01 wechselt zwischen Port 3 und Port 4“; show spanning-tree meldet für SW-BUERO-2: „Spanning Tree deaktiviert“.
- Wird das neue Patchkabel zwischen den beiden Dosen im Besprechungsraum gezogen, normalisiert sich das Netz nach wenigen Sekunden.

| Schicht-Optionen | Ursachen-Optionen |
| --- | --- |
| Anwendung (Schicht 7) | Ein Angriff aus dem Internet überlastet den Internetanschluss. |
| Transport (Schicht 4) | ✔ Das zusätzliche Kabel verbindet zwei Dosen desselben Netzes und erzeugt eine Schleife; ohne Spanning Tree kreisen Broadcasts endlos (Broadcast-Sturm). |
| Vermittlung (Schicht 3) | Eine defekte Netzwerkkarte sendet Dauerbroadcasts. |
| Bitübertragung (Schicht 1) | Der Uplink zwischen den Switches ist zu langsam für den normalen Datenverkehr. |
| ✔ Sicherung (Schicht 2) | Die Zugriffsliste auf dem Router verwirft den Datenverkehr des Büronetzes. |

**Richtig:** Sicherung (Schicht 2) → Das zusätzliche Kabel verbindet zwei Dosen desselben Netzes und erzeugt eine Schleife; ohne Spanning Tree kreisen Broadcasts endlos (Broadcast-Sturm).

**Erklärung:**

> Die Internetauslastung ist normal, ein Angriff von außen scheidet aus; der Datenverkehr entsteht im Büronetz selbst. Dass dieselbe MAC-Adresse ständig zwischen zwei Ports wechselt und der Broadcast-Zähler in die Hunderttausende steigt, ist das typische Bild einer Layer-2-Schleife. Ethernet-Frames haben keine Lebensdauer: Ein Broadcast kreist endlos, vervielfacht sich und füllt in Sekunden alle Links. Eine einzelne defekte Netzwerkkarte würde keinen Port-Wechsel derselben MAC-Adresse verursachen, und das Verschwinden des Problems mit dem gezogenen Kabel bestätigt die Schleife. Spanning Tree würde die überzählige Verbindung blockieren, ist aber auf SW-BUERO-2 abgeschaltet. Maßnahme: Kabel entfernt lassen, Spanning Tree (RSTP) wieder aktivieren und Endgeräteports gegen unbefugte Switches schützen; Kabeländerungen dokumentieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 4. Bug-Hunt-Set „Skripte und Konfigurationsdateien“ (Kurs Systemintegration)

In jedem Ausschnitt steckt genau ein Fehler in genau einer Zeile. **Technisch geprüft:** Bash (Syntax und Läufe), Python (Compile und Läufe), PowerShell 5.1 (Parser und Läufe); **nur von Hand geprüft:** sshd_config, nginx, ufw (kein Interpreter lokal). Zu prüfen bleibt die fachliche Eindeutigkeit der Fehlerzeile und die Erklärung.

**Zum Set — besonders prüfen:**
- ⚠ Nr. 12 (ufw): schwächste Stelle bei der Eindeutigkeit — man könnte statt der Deny-Zeile auch die allgemeine Allow-Zeile 3 als fehlerhaft ansehen; die Korrektur ersetzt Zeile 4 durch `ufw insert 1 deny …`.
- ⚠ Nr. 2 (sshd_config): Sicherheits-, kein Syntaxfehler; moderne OpenSSH-Versionen kennen zusätzlich `KbdInteractiveAuthentication` (nicht Teil der Aufgabe).
- ⚠ Nr. 5 (nginx): genaue Fehlermeldung bei fehlendem Semikolon versionsabhängig; `nginx -t` schlägt in jedem Fall fehl.
- ⚠ Nr. 7 (Bash): `df --output=pcent` ist GNU-spezifisch; Lehrziel ist der Textvergleich mit `>` in `[[ ]]`.
- ⚠ Nr. 8 (PowerShell): in Windows PowerShell 5.1 geprüft; in PowerShell 7 nicht getestet.
- ⚠ Nr. 11 (Python): ein Host-Argument mit führendem „-“ könnte von ping als Option gelesen werden (Optionsinjektion) — nur angedeutet.
- ⚠ Nr. 4 (chmod 777 gegen 600): rein fachlich begründet, unter Windows/Git-Bash nicht aussagekräftig prüfbar.

#### skripte-konfiguration · 1 — Pfad mit Leerzeichen (Bash)

*Das Skript soll den Ordner „Projekt Alpha“ (mit Leerzeichen im Namen) in ein Sicherungsverzeichnis kopieren. Beim Lauf meldet cp aber, dass es „/srv/daten/Projekt“ und „Alpha“ nicht findet.*

```text
 1  #!/bin/bash
 2  quelle="/srv/daten/Projekt Alpha"
 3  ziel="/srv/backup/projekte"
 4  mkdir -p "$ziel"
 5  cp -r $quelle "$ziel"
 6  echo "Sicherung nach $ziel abgeschlossen"
```

**Fehlerzeile:** 5 · **Korrektur:** `cp -r "$quelle" "$ziel"`

**Tipp:** Vergleiche, wie die Variable ziel und wie die Variable quelle im Befehl verwendet werden. Was macht die Shell mit einem Leerzeichen im Wert, wenn nichts es schützt?

**Erklärung:**

> Ohne Anführungszeichen zerlegt die Shell den Inhalt von $quelle an jedem Leerzeichen in zwei Wörter. cp bekommt dann „/srv/daten/Projekt“ und „Alpha“ als zwei getrennte Quellen und findet beide nicht. Variablen, die Pfade oder Benutzereingaben enthalten können, gehören in Bash immer in doppelte Anführungszeichen: "$quelle". Die übrigen Zeilen sind korrekt, ziel ist schon richtig gequotet.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 2 — Anmeldung nur mit Schlüssel (sshd_config)

*Ein Server soll ausschließlich Anmeldungen per SSH-Schlüssel zulassen. Der Root-Login ist verboten, Anmeldungen mit Kennwort sollen es ebenfalls sein. Eine Zeile der Konfiguration widerspricht dieser Vorgabe.*

```text
 1  Port 22
 2  PermitRootLogin no
 3  PasswordAuthentication yes
 4  PubkeyAuthentication yes
 5  MaxAuthTries 3
 6  AllowUsers admin wartung
```

**Fehlerzeile:** 3 · **Korrektur:** `PasswordAuthentication no`

**Tipp:** Suche die Direktive, die steuert, ob ein Kennwort als Anmeldeverfahren akzeptiert wird. Welchen Wert hat sie hier, und welchen Wert verlangt die Vorgabe?

**Erklärung:**

> PasswordAuthentication yes erlaubt die Anmeldung per Kennwort. Dann bleibt der Server für Brute-Force- und Wörterbuchangriffe auf Kennwörter offen, auch wenn Schlüssel erlaubt sind. Mit no werden nur noch Schlüssel akzeptiert. Wichtig ist die Reihenfolge der Arbeitsschritte: Erst prüfen, dass ein Schlüssel für die erlaubten Konten funktioniert, dann das Kennwortverfahren abschalten, sonst sperrt man sich selbst aus.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 3 — Verbindungsversuche zählen (Python)

*Das Skript soll genau dreimal einen Verbindungsversuch melden und danach enden. Beim Start läuft es aber endlos weiter und meldet immer wieder „Verbindungsversuch 2 von 3“.*

```text
 1  import time
 2  versuch = 0
 3  while versuch < 3:
 4      print(f"Verbindungsversuch {versuch + 1} von 3")
 5      time.sleep(1)
 6      versuch =+ 1
 7  print("Abbruch nach drei Versuchen")
```

**Fehlerzeile:** 6 · **Korrektur:** `versuch += 1`

**Tipp:** Gib dir nach jedem Durchlauf den Wert von versuch aus. Verändert sich der Zähler tatsächlich? Lies den Operator in der Zeile ganz genau, Zeichen für Zeichen.

**Erklärung:**

> versuch =+ 1 ist keine Erhöhung, sondern eine Zuweisung: Der Zähler wird auf +1 gesetzt, also immer auf 1. Die Bedingung versuch < 3 bleibt dadurch ewig wahr, die Schleife hat kein Ende. Die vertauschten Zeichen sind leicht zu übersehen. Gemeint ist der Operator += (zu versuch 1 addieren).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 4 — Schlüsseldatei erzeugen (Bash)

*Das Skript legt eine zufällige Schlüsseldatei für die Datensicherung an. Nur der Besitzer darf sie lesen und schreiben, alle anderen Konten sollen keinerlei Zugriff haben.*

```text
 1  #!/bin/bash
 2  schluessel="/srv/daten/schluessel/backup.key"
 3  umask 077
 4  openssl rand -hex 32 > "$schluessel"
 5  chmod 777 "$schluessel"
 6  echo "Schlüssel erzeugt"
```

**Fehlerzeile:** 5 · **Korrektur:** `chmod 600 "$schluessel"`

**Tipp:** Die Zifferngruppe bei chmod steht für Besitzer, Gruppe und Andere. Welche Rechte erhält jede Gruppe bei dieser Zahl?

**Erklärung:**

> chmod 777 gibt jedem Konto auf dem System Lese-, Schreib- und Ausführungsrechte und hebt damit sogar den Schutz der zuvor gesetzten umask 077 wieder auf. Ein geheimer Schlüssel darf aber nur vom Besitzer lesbar sein. 600 bedeutet lesen und schreiben für den Besitzer, nichts für Gruppe und Andere. Ausführungsrechte braucht eine Schlüsseldatei nie.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 5 — Webserver startet nicht (nginx)

*Nach dem Eintragen dieses Server-Blocks meldet der Konfigurationstest von nginx einen Syntaxfehler und der Webserver lädt die Konfiguration nicht. In genau einer Zeile fehlt etwas.*

```text
 1  server {
 2      listen 80;
 3      server_name intranet.example.test;
 4      root /srv/daten/web
 5      index index.html;
 6      location / {
 7          try_files $uri $uri/ =404;
 8      }
 9  }
```

**Fehlerzeile:** 4 · **Korrektur:** `root /srv/daten/web;`

**Tipp:** In nginx endet jede einfache Direktive mit einem bestimmten Zeichen, Blöcke mit geschweiften Klammern dagegen nicht. Prüfe Zeile für Zeile, ob jede Direktive ordentlich abgeschlossen ist.

**Erklärung:**

> Einfache Direktiven wie listen, root oder index müssen in nginx mit einem Semikolon abgeschlossen werden. Fehlt es, liest nginx die folgende Zeile noch als weitere Argumente von root mit und meldet eine ungültige Zahl von Argumenten. Dieser Fehler wird beim Test mit nginx -t gefunden, bevor ein Neuladen den Dienst beeinträchtigt. Deshalb wird nach jeder Änderung zuerst nginx -t ausgeführt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 6 — Ein Konto zu viel (PowerShell)

*Das Skript soll für jeden der drei Namen genau eine Zeile ausgeben. Tatsächlich erscheint eine vierte, leere Zeile „Konto 4:“. Eine Fehlermeldung gibt es nicht.*

```text
 1  $namen = @("Anna", "Ben", "Cem")
 2  Write-Host "Es werden $($namen.Count) Konten geprüft."
 3  for ($i = 0; $i -le $namen.Count; $i++) {
 4      Write-Host "Konto $($i + 1): $($namen[$i])"
 5  }
 6  Write-Host "Prüfung beendet."
```

**Fehlerzeile:** 3 · **Korrektur:** `for ($i = 0; $i -lt $namen.Count; $i++) {`

**Tipp:** Ein Array mit drei Elementen hat die Indizes 0, 1 und 2. Bis zu welchem Wert läuft i in dieser Schleife, und welchen Wert hat Count?

**Erklärung:**

> Die Zählung beginnt bei 0, der letzte gültige Index ist also Count minus 1. Mit -le läuft die Schleife zusätzlich mit i = 3, und $namen[3] ist in PowerShell einfach $null, ohne Fehlermeldung. Das ist ein klassischer Off-by-one-Fehler an der Obergrenze: Bei Start bei 0 gehört -lt statt -le in die Bedingung.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 7 — Falscher Alarm bei der Platte (Bash)

*Das Skript soll warnen, wenn das Datenverzeichnis zu mehr als 80 Prozent belegt ist. Bei einer Belegung von nur 9 Prozent erscheint die Warnung aber trotzdem, bei 100 Prozent bleibt sie dagegen aus.*

```text
 1  #!/bin/bash
 2  belegung=$(df --output=pcent /srv/daten | tail -n 1 | tr -dc '0-9')
 3  if [[ "$belegung" > 80 ]]; then
 4      echo "Warnung: Datenplatte zu ${belegung} Prozent belegt"
 5  fi
```

**Fehlerzeile:** 3 · **Korrektur:** `if [[ "$belegung" -gt 80 ]]; then`

**Tipp:** Das Zeichen > ist in [[ ... ]] ein Textvergleich, kein Zahlenvergleich. Wie sortiert man „9“ und „80“, wenn man sie wie Wörter im Wörterbuch behandelt?

**Erklärung:**

> In [[ ]] vergleicht > die Werte als Text, Zeichen für Zeichen. „9“ kommt dabei hinter „80“, weil „9“ größer als „8“ ist, und die Warnung erscheint zu Unrecht. Für Zahlen gibt es in Bash die Operatoren -eq, -ne, -lt, -le, -gt und -ge. Mit einfachen Klammern [ ] käme es noch schlimmer: Dort würde > als Umleitung gelesen und eine Datei namens 80 angelegt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 8 — Kopieren und Fehler abfangen (PowerShell)

*Das Skript kopiert einen Bericht in den Sicherungsordner. Schlägt das Kopieren fehl, soll der catch-Block eine Fehlermeldung ausgeben. Bei einer fehlenden Quelldatei erscheint aber zuerst eine rote Fehlermeldung, dann die Erfolgsmeldung.*

```text
 1  $quelle = "C:\Daten\Berichte\Monat.xlsx"
 2  $ziel = "D:\Sicherung\Berichte"
 3  try {
 4      Copy-Item -Path $quelle -Destination $ziel
 5      Write-Host "Kopie erfolgreich: $quelle"
 6  }
 7  catch {
 8      Write-Host "Fehler beim Kopieren: $($_.Exception.Message)"
 9  }
```

**Fehlerzeile:** 4 · **Korrektur:** `Copy-Item -Path $quelle -Destination $ziel -ErrorAction Stop`

**Tipp:** Ein catch-Block fängt nur Fehler, die als abbrechend gelten. Viele Cmdlets melden Probleme aber nur als nicht abbrechende Fehler und machen einfach weiter. Wie lässt sich das für diesen einen Aufruf ändern?

**Erklärung:**

> Copy-Item meldet einen Fehler standardmäßig als nicht abbrechend: Die Meldung erscheint, das Skript läuft aber weiter, und der catch-Block wird nie erreicht. Deshalb folgt sogar die Erfolgsmeldung. Mit -ErrorAction Stop wird der Fehler zu einer abbrechenden Ausnahme, die try/catch fängt. Alternativ setzt man $ErrorActionPreference = "Stop" für das ganze Skript.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 9 — Einstellung nur einmal eintragen (Bash)

*Das Skript trägt eine Einstellung in eine Konfigurationsdatei ein. Es wird von der Automatisierung täglich ausgeführt und soll dabei idempotent sein: Die Zeile darf nach beliebig vielen Läufen genau einmal in der Datei stehen.*

```text
 1  #!/bin/bash
 2  konfig="/srv/daten/app/app.conf"
 3  mkdir -p "$(dirname "$konfig")"
 4  echo "max_verbindungen=50" >> "$konfig"
 5  echo "Konfiguration angepasst"
```

**Fehlerzeile:** 4 · **Korrektur:** `grep -qsx "max_verbindungen=50" "$konfig" || echo "max_verbindungen=50" >> "$konfig"`

**Tipp:** Führe das Skript im Kopf dreimal hintereinander aus und sieh dir an, was am Ende in der Datei steht. Was müsste das Skript vor dem Anhängen prüfen?

**Erklärung:**

> >> hängt bei jedem Lauf eine weitere Zeile an, nach drei Läufen steht die Einstellung dreimal in der Datei. Ein idempotentes Skript prüft zuerst, ob der Soll-Zustand schon erreicht ist, und handelt nur, wenn nicht: grep -qsx sucht still (-q, -s) nach der exakt passenden Zeile (-x), und nur wenn sie fehlt (||), wird sie angehängt. Die Zeile mkdir -p ist dagegen schon idempotent, denn -p erzeugt das Verzeichnis nur, falls es fehlt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 10 — Zähler im Funktionsbereich (PowerShell)

*Das Skript zählt, wie viele der geprüften Dienste auf dem Rechner fehlen. Der Dienst „GibtEsNicht“ existiert nicht, deshalb soll am Ende „Fehlende Dienste: 1“ stehen. Ausgegeben wird aber immer 0.*

```text
 1  $fehler = 0
 2  function Test-Dienst {
 3      param([string]$Name)
 4      if (-not (Get-Service -Name $Name -ErrorAction SilentlyContinue)) {
 5          $fehler++
 6      }
 7  }
 8  Test-Dienst -Name "Spooler"
 9  Test-Dienst -Name "GibtEsNicht"
10  Write-Host "Fehlende Dienste: $fehler"
```

**Fehlerzeile:** 5 · **Korrektur:** `$script:fehler++`

**Tipp:** Eine Funktion hat in PowerShell einen eigenen Gültigkeitsbereich (Scope). Wenn sie eine Variable aus dem übergeordneten Bereich hochzählt, was wird dabei tatsächlich verändert?

**Erklärung:**

> Lesen kann die Funktion den Wert des übergeordneten $fehler, zuweisen aber nicht: $fehler++ erzeugt in der Funktion eine neue lokale Variable mit dem Wert 1, die am Ende der Funktion verschwindet. Die Variable im Skriptbereich bleibt bei 0. Mit dem Scope-Präfix $script:fehler wird gezielt die Variable des Skripts verändert. Besser noch: Die Funktion gibt ihr Ergebnis zurück, statt globalen Zustand zu ändern.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 11 — Hostname-Prüfung mit Shell (Python)

*Die Funktion prüft mit ping, ob ein vom Benutzer eingegebener Host erreichbar ist. Gibt jemand statt eines Namens etwas wie „x; echo fremd“ ein, wird der zweite Befehl ebenfalls ausgeführt.*

```text
 1  import subprocess
 2  def erreichbar(host):
 3      ergebnis = subprocess.run(f"ping -c 1 {host}", shell=True)
 4      return ergebnis.returncode == 0
 5  print(erreichbar(input("Hostname: ")))
```

**Fehlerzeile:** 3 · **Korrektur:** `ergebnis = subprocess.run(["ping", "-c", "1", host])`

**Tipp:** Der gesamte Befehl wird als ein Text zusammengebaut und an eine Shell übergeben. Welche Zeichen hat die Shell außer dem Namen noch zu deuten? Wie lässt sich ein Programm mit Argumenten aufrufen, ohne dass eine Shell den Text auswertet?

**Erklärung:**

> Mit shell=True und einem zusammengesetzten Text interpretiert die Shell Sonderzeichen wie ; | & und $(...) in der Eingabe: Ein Angreifer schleust so eigene Befehle ein (Command Injection). Übergibt man den Aufruf als Liste ohne shell=True, startet Python das Programm direkt, und host bleibt ein einzelnes Argument, egal was darin steht. Eingaben sollte man zusätzlich auf erlaubte Zeichen prüfen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### skripte-konfiguration · 12 — Gesperrte Adresse kommt durch (ufw)

*Die Firewall soll SSH für alle erlauben, nur die Adresse 203.0.113.50 soll sich nicht per SSH verbinden können. Nach dem Aktivieren kann sich diese Adresse trotzdem anmelden. Die Regeln werden in der Reihenfolge ausgewertet, in der sie angelegt wurden.*

```text
 1  ufw default deny incoming
 2  ufw default allow outgoing
 3  ufw allow 22/tcp
 4  ufw deny from 203.0.113.50 to any port 22
 5  ufw allow 443/tcp
 6  ufw --force enable
```

**Fehlerzeile:** 4 · **Korrektur:** `ufw insert 1 deny from 203.0.113.50 to any port 22`

**Tipp:** ufw wertet Regeln von oben nach unten aus, die erste passende Regel entscheidet. Welche Regel trifft bei einer Verbindung von 203.0.113.50 auf Port 22 zuerst zu?

**Erklärung:**

> Die allgemeine Freigabe ufw allow 22/tcp steht schon weiter oben und trifft auf jede Verbindung zu Port 22 zu, auch auf die der gesperrten Adresse. Die Sperrregel dahinter kommt nie zum Zug. Die spezifischere Regel muss vor der allgemeinen stehen: ufw insert 1 setzt sie an Position 1 der Regelliste. Die Reihenfolge von Regeln, bei denen die erste Übereinstimmung gilt, ist bei Firewalls ein häufiger Fehler.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________
