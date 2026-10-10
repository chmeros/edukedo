# Entwurf: Wortbestand des Büro-Kreuzworträtsels „Controlling“ (FL-BP-29, E-BUE-2, UXT-B-24)

Stand 10.10.2026 · **zur fachlichen Entscheidung vorgelegt, nicht eingespielt** (Rahmenentscheidung R3). Betrifft nur das Set `fachwirt-buero-projektorganisation/kreuzwortraetsel/standard` (Datei `apps/api/src/db/content/game-kreuzwortraetsel-finanzkennzahlen.ts`).

## Befund

Das Rätsel hat 30 Wörter. Bei jedem Start legt der Server das Gitter neu an und zieht zehn Wörter aus diesem Wort-Pool (F-193). Die Wörter 1 bis 10 stammen 1:1 aus der früheren Nutzer-Vorgabe (F-141), die Wörter 11 bis 30 wurden später aus der Kurstheorie ergänzt.

Abgleich mit der Kurstheorie (Suche in allen Dateien von `content/fachwirt-buero-projektorganisation`):

| Nr. | Wort | in der Kurstheorie? |
|---|---|---|
| 1 | UMSATZRENTABILITAET | **nein** (0 Dateien) |
| 2 | EIGENKAPITALQUOTE | ja, Thema 4.1 (Beispiel für Finanzkennzahl) |
| 3 | DECKUNGSBEITRAG | **nein** |
| 4 | VERSCHULDUNGSGRAD | **nein** |
| 5 | LIQUIDITAET | ja, Thema 4.1 (Beispiel für Finanzkennzahl) |
| 6 | JAHRESUEBERSCHUSS | **nein** |
| 7 | EBIT | **nein** |
| 8 | EBITDA | **nein** |
| 9 | CASHFLOW | **nein** |
| 10 | ROHERTRAG | **nein** |
| 11 bis 30 | REPORTING, KENNZAHL, BUDGET, BEDARF, LIEFERZEIT, VERTRAG, ZIEL, QUALITAET, ANGEBOT, EINKAUF, NETZPLAN, AUFWAND, KOSTEN, NUTZEN, LIZENZ, RISIKO, PUFFER, TERMIN, MIETE, PREIS | ja, alle in den Themen 1.2 bis 4.3 |

Acht von zehn Hauptwörtern sind also Stoff eines anderen Kurses (Rechnungswesen, Bilanzanalyse), nicht des Büro-Fachwirts. Sie sind fachlich korrekt, aber bei einer Prüfungsvorbereitung für diesen Kurs ablenkend. Dazu kommen:

- **FL-BP-29:** KOSTEN („Wertmäßiger Aufwand …“) erklärt Kosten über Aufwand und vermengt damit Aufwand (Gewinn- und Verlustrechnung) und Kosten (Kostenrechnung). AUFWAND steht im Kurs im Sinne von Aufwand-Nutzen (Thema 1.3).
- **Verrat der Lösung durch andere Hinweise:** Weil zehn Wörter zufällig gezogen werden, können Hinweise ein anderes gezogenes Wort verraten (Beispiel: der Tipp zu REPORTING nennt „Benchmarking“, der zu KENNZAHL nennt „Fluktuationsrate und Amortisationsdauer“). Das fällt erst auf, wenn Pool-Wörter hinzukommen, die vorher feste Wörter waren (siehe Abschnitt „Hinweise bereinigen“).
- **Abschlussmeldung:** „Besonders wichtig: EBIT und EBITDA, Liquidität und Jahresüberschuss …“ stimmt dann nicht mehr zum Kurs.

## Varianten

- **A. Belassen.** Keine Änderung. Nachteil: Kursfremde Begriffe bleiben, Lernende üben Wörter, die in der Prüfung nicht vorkommen.
- **B. Kürzen.** Die acht kursfremden Wörter streichen. Der Pool schrumpft auf 22 Wörter (zehn je Rätsel, also weniger Abwechslung); der bestehende Test verlangt mindestens 26.
- **C. Ersetzen (Empfehlung).** Die acht kursfremden Wörter durch acht Begriffe aus Thema 4.1 ersetzen. Pool bleibt bei 30 Wörtern, alles ist Kursstoff, die Abwechslung bleibt. EIGENKAPITALQUOTE und LIQUIDITAET bleiben (Beispiele aus 4.1).

Die Begriffe der früheren Nutzer-Vorgabe (EBIT, EBITDA, Cashflow …) fallen bei C und B weg. Falls sie gewünscht sind, wäre ein eigenes Set für einen Kurs mit Bilanzanalyse (zum Beispiel Wirtschaftsfachwirt) der passendere Ort.

## Vorschlag zu Variante C

### Die acht neuen Wörter (alle aus Thema 4.1)

Alle Wörter ohne Gitterposition (wie die Wörter 11 bis 30); `nummer` 1, 3, 4, 6, 7, 8, 9, 10 werden neu belegt.

| Ersetzt | Neu | Hinweis | Tipp | Bestätigung |
|---|---|---|---|---|
| 1 UMSATZRENTABILITAET | CONTROLLING | Systematische Planung, Steuerung und Kontrolle betrieblicher Abläufe. | Elf Buchstaben; beginnt mit C. | Richtig! Controlling plant, steuert und kontrolliert betriebliche Abläufe und stützt sich dafür auf Kennzahlen. |
| 3 DECKUNGSBEITRAG | BENCHMARKING | Vergleich der eigenen Werte mit Wettbewerbern oder internen Referenzwerten. | Zwölf Buchstaben; beginnt mit B. | Genau! Benchmarking setzt die eigenen Kosten und den eigenen Nutzen in Relation zu vergleichbaren Referenzwerten. |
| 4 VERSCHULDUNGSGRAD | NUTZWERTANALYSE | Verfahren, das Handlungsalternativen anhand gewichteter Kriterien systematisch vergleicht. | Hier werden Kriterien gewichtet und Punkte vergeben. | Richtig! Die Nutzwertanalyse macht Entscheidungen nachvollziehbar, weil alle Alternativen nach denselben gewichteten Kriterien bewertet werden. |
| 6 JAHRESUEBERSCHUSS | AMORTISATIONSDAUER | Zeitraum, nach dem sich eine Anschaffung durch ihre Rückflüsse bezahlt gemacht hat. | Eine Investitionskennzahl; gesucht ist ein Zeitraum. | Genau! Die Amortisationsdauer ist die typische Investitionskennzahl für neue Anschaffungen. |
| 7 EBIT | FLUKTUATIONSRATE | Anteil der Beschäftigten, die in einem Zeitraum aus dem Unternehmen ausscheiden. | Eine Personalkennzahl (vgl. Thema 3.1). | Richtig! Die Fluktuationsrate gehört zu den Personalkennzahlen und zeigt, wie stark die Belegschaft wechselt. |
| 8 EBITDA | REKLAMATIONSQUOTE | Anteil der beanstandeten Lieferungen an allen Lieferungen. | Eine Einkaufskennzahl; beginnt mit R. | Genau! Die Reklamationsquote gehört zu den Einkaufskennzahlen und macht die Lieferqualität messbar. |
| 9 CASHFLOW | NACHHALTIGKEIT | Entscheidungskriterium, das neben Kosteneinsparung zunehmend an Bedeutung gewinnt und langfristige Folgen berücksichtigt. | Vierzehn Buchstaben; beginnt mit N. | Richtig! Nachhaltigkeit ist neben Prozessoptimierung, Kundenorientierung und Kosteneinsparung eine der Dimensionen bei der Datenaufbereitung. |
| 10 ROHERTRAG | PROZESSOPTIMIERUNG | Systematische Verbesserung von Abläufen; eine der vier Dimensionen bei der Datenaufbereitung. | Achtzehn Buchstaben; beginnt mit P. | Genau! Prozessoptimierung ist eine der vier Dimensionen, für die Daten aufbereitet werden. |

Bei EIGENKAPITALQUOTE (2) und LIQUIDITAET (5) entfallen nur die Gitterpositionen.

### Hinweise bereinigen (kleine Folgeänderungen)

| Nr. | Wort | Änderung | Grund |
|---|---|---|---|
| 11 | REPORTING | Tipp: „Englisch; ein Steuerungsinstrument, das Kennzahlen regelmäßig weitergibt.“ (statt „… neben Benchmarking.“) | nennt sonst das neue Wort BENCHMARKING |
| 12 | KENNZAHL | Tipp: „Oberbegriff für Größen wie Quoten, Raten und Dauern.“ (statt „Fluktuationsrate und Amortisationsdauer sind Beispiele.“) | nennt sonst zwei neue Wörter |
| 13 | BUDGET | Tipp: „Wird in der Projektkontrolle mit den Ist-Werten verglichen.“ (statt „… Ist-Kosten …“) | nennt sonst KOSTEN |
| 23 | KOSTEN | Hinweis: „In Geld bewerteter Verbrauch an Gütern und Leistungen für einen Vorgang oder ein Projekt.“ Tipp: „Werden in Euro gemessen und im Voraus geplant.“ (statt „… im Budget geplant.“) | FL-BP-29: trennt Kosten von Aufwand; Tipp nannte BUDGET |

Optional, bestehende Hinweise, die ein anderes Pool-Wort nennen (kein Muss):

| Nr. | Wort | Vorschlag | nennt bisher |
|---|---|---|---|
| 18 | QUALITAET | „… bei der Lieferkontrolle geprüft …“ statt „… bei der Vertragserfüllung …“ | VERTRAG |
| 27 | PUFFER | „… im Projektplan verschoben werden darf …“ statt „… im Netzplan …“ | NETZPLAN |
| 30 | PREIS | „… ein Vergleichskriterium beim Lieferantenvergleich.“ statt „… bei Angeboten.“ | ANGEBOT |

### Abschlussmeldung

Neu: „Geschafft! Du hast zehn Begriffe aus Kennzahlen und Controlling erkannt und ihre Bedeutung wiederholt. Besonders wichtig: Controlling, Reporting und Benchmarking sind die drei zentralen Steuerungsinstrumente. Jedes Rätsel ist anders — spiel gern noch eins!“

## Folgen für Technik und Tests

- **Technisch geprüft (Variante C):** Das Schema nimmt den Pool mit den acht neuen Wörtern an (30 Wörter), und der Gitter-Generator legt in 300 Durchläufen mit verschiedenen Seeds jedes Mal zehn Wörter ohne Kreuzungskonflikt (auch mit den Wörtern mit bis zu 18 Buchstaben).
- Ohne Gitterpositionen legt der Server das Gitter bei jedem Start neu an (`buildKreuzwortraetselPuzzle`); es gibt keine feste Gitterprüfung mehr für die Wörter 1 bis 10. Die Tests in `game-logic.test.ts` zu „Gitter ohne Kreuzungskonflikte“ (feste Positionen), `jahresüberschuss` (Nr. 6) und `EBITDA` (Nr. 7) müssen auf die neuen Wörter umgestellt werden.
- Laufende Rätsel: Der Spielstand speichert pro Durchgang Seed und gelöste Wortnummern. Ein Durchgang, der beim Einspielen offen ist, kann danach andere Wörter zeigen; neue Durchgänge sind nicht betroffen. Gelöste Nummern gehen nicht verloren, sie verweisen nur auf andere Wörter.
- Die Datei heißt weiter „…-finanzkennzahlen.ts“ (technischer Name, nicht sichtbar); nur Kommentar und Abschlussmeldung werden angepasst.
- Einspielen: `db:seed-games` in jeder Datenbank.

## Zu entscheiden

1. A, B oder C?
2. Bei C: Sind die acht neuen Wörter mit ihren Hinweisen fachlich richtig, und gibt es Begriffe aus 4.1, die lieber im Rätsel stehen sollen?
3. Sollen die drei optionalen Hinweis-Bereinigungen (QUALITAET, PUFFER, PREIS) mit?

Nicht Teil dieses Entwurfs: das Kennzahlen-Duell „QM und Prozesse“ (E-BUE-2 betrifft es ebenfalls; Begriffe wie First-Pass-Yield und Durchlaufzeit stehen nicht in der Kurstheorie) und die Frage, ob der Typ „Kennzahlen-Duell“ im Büro-Kurs bleibt.
