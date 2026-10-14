# Prüfprotokoll: Paket P-G „Fachinformatiker-Querschnitt“ (Erhebung vom 14.10.2026: G-AE-01, G-AE-02, G-SI-02, G-SI-03, G-SI-04 = G-DV-01)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R5, „Theorie vor Werkzeug“). Rechtsnah: nur Zertifikate/PKI (Rechtswirkung von Signaturen, Vertrauensdienste) als Hinweis ohne Paragrafen; nicht förmlich rechtsgeprüft.

## Umfang

Jedes Thema wird einmal geschrieben (`kurs_slug: KURS_SLUG`) und per `einspielen.cjs` in alle vier Kurse eingespielt (Anwendungsentwicklung, Daten- und Prozessanalyse, Digitale Vernetzung, Systemintegration), weil die `fu`-Ordner bis auf `kurs_slug` identisch sind. Firma der `fu`-Ordner: Brevanta IT-Systemhaus GmbH.

- **FU3 3.5** „Zahlensysteme, Datenmengen und Übertragungszeiten“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten) und **F-FU3-04**. Theorie zum sichtbaren Zahlensystem-Sprint und Rechen-Sprint „IT-Rechnen“.
- **FU3 3.6** „Subnetting vertieft: Adressplanung und VLSM“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 8 Rechen-Kurzantworten) und **F-FU3-05**. Theorie zum Subnetting-Sprint und zum Subnetting-Rechner.
- **FU3 3.7** „DNS, DHCP und IPv6 im Detail“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 4 Kurzantworten) und **F-FU3-06**.
- **FU4 4.2 Ergänzung** „Sortier- und Suchverfahren mit Ablauftabellen“ (5 Abschnitte, 12 Karten K-4.2-20 bis -31, 14 Quizfragen Q-4.2-17 bis -30, 7 Rechen-Kurzantworten) und **F-FU4-04**.
- **FU6 6.5** „Zertifikate und PKI“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 3 Kurzantworten), **F-FU6-04** und 3 Fachgesprächsfragen.
- Zusammen je Kurs 62 Karten, 72 Quizfragen (30 Kurzantworten), 5 Fallaufgaben, 3 Fachgesprächsfragen, 146 Item-Schlüssel; **584 neue Schlüssel** bei vier Kursen.
- **Änderungen am Bestand durch das Einspielen:** nur die Einleitungssätze der Fallaufgaben (`fu3`: Themenbereiche 3.1–3.7, `fu6`: 6.1–6.5) und die Einfügung der 4.2-Ergänzung in die bestehende Datei.
- Dateien: `fachinformatiker-3.5-…`, `-3.6-…`, `-3.7-…`, `-4.2-ergaenzung-…`, `-6.5-…`, `fachinformatiker-faelle-a.md` bis `-e.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>`.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (18.108 → 18.692 Item-Schlüssel, +584); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten, alle fünf Fälle mit 4 Teilaufgaben, 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Fünf Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet; Teil B gegen `subnetting-logic.ts`, Teil D gegen `algorithmen.ts` (Zählung von Vergleichen und Vertauschungen).
3. **Unabhängige Prüfung (fünf Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand, den Spielen und Werkzeugen:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 3 mittel, 12 niedrig; Teil B 1 mittel, 11 niedrig; Teil C 4 mittel, 15 niedrig; Teil D 4 mittel, 10 niedrig; Teil E 6 mittel, 11 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Sortierfrage Q-3.5-03: Erklärung falsch, Bit/Byte-Falle wirkungslos | neue Elemente (7 Mbit, 900 KiB, 1 MB, 1 MiB), Rechnung in Byte |
| A | SSD-Reserve als Grund für kleinere Anzeige falsch; SI-spezifischer Verweis auf Rechenaufgaben | Dateisystem/Wiederherstellungspartitionen; Verweis auf Rechen-Sprint und „übrige Rechenaufgaben der Fachinformatiker-Kurse“ |
| A | Theoriebeispiel 1F90 verrät Q-3.5-12; MAC-Beispiele evtl. echte Hersteller | Beispiel 1A2B = 6.699; Dokumentationsbereich 00:00:5E:00:53:xx |
| B | Fall F-FU3-05: „lückenlos“ stimmt nicht, widerspricht der Theorie zur Zusammenfassung | Bedingungen neu gefasst: Block gehört vollständig dem Standort, freie Bereiche erlaubt |
| B | Präfixtabelle ohne /17 bis /19 (Sprint fragt sie ab) | Zeilen ergänzt |
| C | „nicht autoritativ“ als „aus dem Cache“ gleichgesetzt; „einige Beschäftigte“ widerspricht dem Befund; Forwarder übersehen | nslookup-Aussage präzisiert, Szenario konsistent, Forwarder in der Musterlösung |
| C | Kurzantworten wiederholen Theoriebeispiele; EUI-64 ohne Rechenweg | neue Werte, Rechenweg mit Dokumentations-MAC |
| D | Zählregel der binären Suche uneindeutig (zwei Vergleiche im Programm, einer im Werkzeug); Kontextbezug „Programmbeispiel“; Werkzeug-/Tab-Nennung | Dreiwegevergleich als ein Vergleich, Fragen ohne Kontext, keine Werkzeuge in der Theorie |
| D | Fall: Sortieren vor jeder Suche übersieht erneuten Insertionsort auf sortierten Daten; Zahl wie F-FU4-02 | Ausgangssituation und Musterlösung angepasst, 500.000 Meldungen neu gerechnet |
| E | Firmendomain widerspricht dem Phishing-Spiel; Warnschwelle fällt auf Erneuerungstag; Schlüssellänge nicht auf BSI-Stand; Lückentext mit zwei richtigen Antworten; Fachgespräch setzt Zertifikat voraus | `brevanta-it.example`; Praxisempfehlung 21 Tage; 3.072 Bit mit Hinweis „nicht förmlich geprüft“; CRL außerhalb der Lücke; offene Formulierung |
| E | „Zertifikate sind Secrets“ in ae2/9.1 ungenau | Abgrenzung in der Theorie (Zertifikatsdatei mit privatem Schlüssel) |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Aussagen zur Rechtswirkung von Signaturen und Vertrauensdiensten (nur Hinweis); BSI-Empfehlung zu RSA-Schlüssellängen (aktuelle Richtlinie vor Verwendung prüfen).
- **Erfahrungswerte, nicht Bestand:** Zertifikatslaufzeiten („derzeit etwa ein halbes Jahr“, 90 Tage als Beispiel), Vorwarnzeit 30 Tage, Erneuerung nach zwei Dritteln, Leasedauern, TTL-Werte, Wachstumsreserve 20 bis 25 %, Wortbreite „heute meist 64 Bit“.
- **Bestand, nicht Teil von P-G (nur gemeldet):** `kunde-beispiel.de` in fu3/3.1, K-3.1-17 und Glossar (echte Domain, nicht `.example`); Grammatik „ein Broadcast gibt es in IPv6 nicht“ in 3.1; Schreibweisen „Broadcast-Adresse“ in si2 und Werkzeug-UI; Leerzeichen als Tausendertrenner in si4/11.2 und si4/Fallaufgaben; ae2/9.1 „Zertifikate“ unter Secrets; `game-troubleshooting-netzwerk.ts` ohne Zertifikatswarnung bei https auf IP; `subnetting-logic.ts` Kommentar zu `praefixFuerHosts` („kleinste Präfixlänge“, gemeint längstes Präfix); `game-logic-rechnen.ts` `SORT_DEFINITION.bubble` Zählweise der Durchläufe; `Algorithmen.tsx` Kommentar zur Theorie von Selectionsort/Insertionsort; Zahlensystem-Sprint zeigt die Lösung ungruppiert, die Frage gruppiert; si1/8.2 verweist für DHCP/DNS nur auf 3.1.
- **Glossar:** Einträge zu den neuen Begriffen (Zertifikat, CA, CSR, OCSP, mTLS, Ablauftabelle, Lease, SLAAC u. a.) gehören nicht zu P-G; mögliches Folgepaket.
- **Reihenfolge:** 3.5, 3.6 und 3.7 verweisen aufeinander; sie werden zusammen eingespielt.

## Rechtsstand

Keine Paragrafen, keine Verordnungsnamen im Text (die Quelle im Frontmatter folgt den Nachbarthemen). Alle Zahlen, Firmen-, Personen-, Domain- und Adressangaben sind frei gewählte Beispielwerte (Dokumentationsbereiche, `.example`).
