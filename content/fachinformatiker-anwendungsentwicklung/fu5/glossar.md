---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: FU5
fachgebiet_title: "Datenbanken und Speicherlösungen"
thema_code: "FU5-glossar"
thema_title: "Glossar (Entwurf)"
quelle: "Aus der vorhandenen Theorie der Themen dieses Fachgebiets abgeleitete Kurzdefinitionen"
rechtsstand: "05.10.2026 — Entwurf, vor Livegang fachlich prüfen"
---

## Glossar

#### Datenbankmanagementsystem (DBMS)
**Auch:** DBMS, Datenbanksystem
**Thema:** 5.1
**Abschnitt:** Warum Datenbanken? Der Ausgangspunkt bei Brevanta
**Definition:** Die Software eines Datenbanksystems, die Speicherung, Abfrage, Mehrbenutzerbetrieb, Konsistenzprüfung und Zugriffsschutz übernimmt. Die Datenbank selbst enthält die gespeicherten Daten samt Struktur.
**Geprüft:** nein

#### Key-Value-Modell
**Auch:** Key-Value-Speicher
**Thema:** 5.1
**Abschnitt:** Datenbankmodelle im Überblick
**Definition:** Datenbankmodell, bei dem zu einem eindeutigen Schlüssel genau ein Wert gespeichert wird, ohne dass das System dessen innere Struktur kennen muss. Es ist sehr schnell und typisch für Zwischenspeicher und Sitzungsdaten.
**Geprüft:** nein

#### ER-Modell
**Auch:** Entity-Relationship-Modell
**Thema:** 5.1
**Abschnitt:** Das ER-Modell: von der Anforderung zum Datenmodell
**Definition:** Werkzeug, um fachliche Anforderungen unabhängig von einem konkreten Datenbanksystem zu beschreiben. Bausteine sind Entitäten, Attribute, Beziehungen und Kardinalitäten.
**Geprüft:** nein

#### Kardinalität
**Auch:** Kardinalitäten
**Thema:** 5.1
**Abschnitt:** Das ER-Modell: von der Anforderung zum Datenmodell
**Definition:** Angabe, wie viele Entitäten auf der einen Seite einer Beziehung mit wie vielen auf der anderen Seite verbunden sein können. Auf Grundlagenniveau unterscheidet man 1:1, 1:n und n:m.
**Geprüft:** nein

#### Primärschlüssel
**Auch:** Primary Key, PK
**Thema:** 5.1
**Abschnitt:** Primär- und Fremdschlüssel
**Definition:** Spalte oder Spaltenkombination, die jede Zeile einer Tabelle eindeutig identifiziert. Der Wert muss eindeutig sein, darf nie leer (NULL) sein und sollte sich nicht ändern.
**Geprüft:** nein

#### Fremdschlüssel
**Auch:** FK
**Thema:** 5.1
**Abschnitt:** Primär- und Fremdschlüssel
**Definition:** Spalte oder Spaltenkombination, die auf den Primärschlüssel einer anderen oder derselben Tabelle verweist. Sie stellt die Beziehung her und ist Grundlage für Joins und die Prüfung der referentiellen Integrität.
**Geprüft:** nein

#### Normalisierung
**Auch:** Normalform, 1NF, 2NF, 3NF
**Thema:** 5.1
**Abschnitt:** Normalisierung: Redundanz vermeiden
**Definition:** Schrittweises Aufteilen von Tabellen, um Redundanz und die daraus entstehenden Anomalien zu beseitigen. Die drei Stufen sind die 1., 2. und 3. Normalform.
**Geprüft:** nein

#### Referentielle Integrität
**Thema:** 5.1
**Abschnitt:** Integritätsbedingungen
**Definition:** Jeder Fremdschlüsselwert muss auf einen vorhandenen Primärschlüsselwert der referenzierten Tabelle verweisen. Für das Löschen oder Ändern referenzierter Zeilen kann etwa RESTRICT, CASCADE oder SET NULL festgelegt werden.
**Geprüft:** nein

#### Aggregatfunktion
**Auch:** COUNT, SUM, AVG, MIN, MAX
**Thema:** 5.2
**Abschnitt:** Aggregatfunktionen, GROUP BY und HAVING
**Definition:** Funktion, die mehrere Zeilen zu einem Wert zusammenfasst, nämlich COUNT (Anzahl), SUM (Summe), AVG (Durchschnitt), MIN und MAX. Sie darf nicht in WHERE stehen.
**Geprüft:** nein

#### GROUP BY
**Thema:** 5.2
**Abschnitt:** Aggregatfunktionen, GROUP BY und HAVING
**Definition:** Klausel, die Zeilen mit gleichem Wert in einer Spalte zu Gruppen zusammenfasst. Die Aggregatfunktion wird dann je Gruppe berechnet.
**Geprüft:** nein

#### HAVING
**Thema:** 5.2
**Abschnitt:** Aggregatfunktionen, GROUP BY und HAVING
**Definition:** Klausel, die Gruppen nach dem Gruppieren filtert. WHERE dagegen filtert bereits die Einzelzeilen vor dem Gruppieren.
**Geprüft:** nein

#### INNER JOIN
**Thema:** 5.2
**Abschnitt:** Joins: Tabellen verknüpfen
**Definition:** Verknüpfung, die nur Zeilen liefert, zu denen auf beiden Seiten ein Partner gemäß Join-Bedingung existiert. Zeilen ohne Partner fehlen im Ergebnis.
**Geprüft:** nein

#### LEFT JOIN
**Thema:** 5.2
**Abschnitt:** Joins: Tabellen verknüpfen
**Definition:** Verknüpfung, die alle Zeilen der linken Tabelle liefert, auch wenn in der rechten Tabelle kein Partner existiert. Die fehlenden Werte erscheinen als NULL.
**Geprüft:** nein

#### Unterabfrage
**Auch:** Subquery
**Thema:** 5.2
**Abschnitt:** Unterabfragen auf Grundlagenniveau
**Definition:** In Klammern stehende SELECT-Anweisung innerhalb einer anderen Abfrage. Sie liefert entweder einen einzelnen Wert oder eine Werteliste.
**Geprüft:** nein

#### Transaktion
**Auch:** COMMIT, ROLLBACK
**Thema:** 5.2
**Abschnitt:** Daten ändern: INSERT, UPDATE, DELETE
**Definition:** Zusammenfassung mehrerer zusammengehöriger Änderungen, die mit COMMIT bestätigt oder mit ROLLBACK vollständig zurückgenommen wird. Dabei gelten die ACID-Eigenschaften.
**Geprüft:** nein

#### DDL
**Auch:** Datendefinition
**Thema:** 5.2
**Abschnitt:** Grundlagen und Beispieldaten
**Definition:** Befehlsgruppe zur Datendefinition, etwa CREATE, ALTER und DROP. Sie legt Strukturen wie Tabellen an und verändert sie.
**Geprüft:** nein

#### NAS
**Auch:** Network Attached Storage
**Thema:** 5.3
**Abschnitt:** Speicherlösungen im Überblick
**Definition:** Speichersystem, das im Netzwerk Dateien und Ordner bereitstellt, typischerweise über Protokolle wie SMB oder NFS. Es bringt sein eigenes Dateisystem mit.
**Geprüft:** nein

#### SAN
**Auch:** Storage Area Network
**Thema:** 5.3
**Abschnitt:** Speicherlösungen im Überblick
**Definition:** Dediziertes Speichernetz, das den Servern Blockspeicher bereitstellt. Die Server nutzen die zugewiesenen Bereiche wie lokale Platten und legen darauf ihr eigenes Dateisystem an.
**Geprüft:** nein

#### Objektspeicher
**Thema:** 5.3
**Abschnitt:** Speicherlösungen im Überblick
**Definition:** Speicher, in dem Daten als Objekte mit Kennung und Metadaten in einem flachen Namensraum liegen und per HTTP angesprochen werden. Er skaliert sehr gut für unstrukturierte Daten, ersetzt aber nicht das Dateisystem einer klassischen Datenbank.
**Geprüft:** nein

#### RAID
**Auch:** RAID 0, RAID 1, RAID 5, RAID 6, RAID 10
**Thema:** 5.3
**Abschnitt:** RAID-Level auf Grundlagenniveau
**Definition:** Zusammenfassung mehrerer physischer Platten zu einem logischen Verbund, um Leistung und Ausfallsicherheit zu verbessern. Es schützt vor dem Ausfall einzelner Platten, ist aber kein Backup.
**Geprüft:** nein

#### SQL-Injection
**Thema:** 5.3
**Abschnitt:** Datenbanksysteme in IT-Systeme integrieren
**Definition:** Gefahr, die entsteht, wenn Eingaben von Benutzern ungeprüft in SQL-Text eingebaut werden. Schutz bieten parametrisierte Abfragen (Prepared Statements), bei denen Werte getrennt vom SQL-Text übergeben werden.
**Geprüft:** nein

#### 3-2-1-Regel
**Thema:** 5.3
**Abschnitt:** Backup: die Grundidee
**Definition:** Backup-Regel: mindestens drei Kopien der Daten, auf zwei verschiedenen Medientypen, davon eine an einem anderen Standort.
**Geprüft:** nein
