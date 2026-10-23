# Bericht Cluster 1 (P-AZ): Glossar-Einträge fu6, ae2, dv4, si5

Stand 23.10.2026 (nach `pruefung-cluster1.md` überarbeitet), alles Entwurf (`Geprüft: nein`), nichts eingespielt, nichts committet.

## Anzahl je Zieldatei

| Zieldatei | Datei | Einträge | Themen |
|---|---|---|---|
| `fu6/glossar.md` (an Bestand anhängen, alle vier Kurse) | `glossar-fu6.md` | 49 | 6.6: 13, 6.7: 16, 6.8: 9, 6.2: 11 |
| `ae2/glossar.md` (neu, nur AE) | `glossar-ae2.md` | 8 | 9.1 |
| `dv4/glossar.md` (neu, nur DV) | `glossar-dv4.md` | 3 | 11.3 |
| `si5/glossar.md` (neu, nur SI) | `glossar-si5.md` | 3 | 12.2 |

Summe 63 (vorher 69). Die Dateien enthalten nur `####`-Blöcke (Kommentarzeile am Anfang, Liste „Bewusst nicht aufgenommen“ nach `---`); Frontmatter und `## Glossar` ergänzt `einspielen-glossar.cjs` bei den neuen Dateien.

## Prüfung

- `node docs/entwuerfe/fachinformatiker-glossar/einspielen-glossar.cjs` (ohne `--schreiben`): „Prüfung bestanden“ (Eindeutigkeit von Begriff und Alias je Kurs gegen Bestand und alle Entwürfe inklusive Cluster 2, Pflichtfelder, Länge höchstens 280 Zeichen, `Abschnitt:` als `###`-Überschrift der Themendatei).
- Fachbegriff-Sucher: Der echte Sucher `packages/shared/src/fachbegriffe.ts` lief über Karten und Quiz aller Themendateien der vier Fachinformatiker-Kurse (Skript im Scratchpad: `sucher.ts`), mit Bestand-Glossaren und allen Entwürfen beider Cluster. Ergebnis: **kein Cluster-1-Eintrag ist mehr tot**, jeder Eintrag erzeugt in mindestens einem Kurs Treffer in Karten oder Quiz (Theorie wird vom Sucher nicht markiert und zählt nicht).

## Umsetzung der Entscheidungen des Koordinators

1. **Sucher-Regel:** Aliase auf die in Karten/Quiz vorkommenden Formen gesetzt: wichtigen Einrichtung, besonders wichtigen Einrichtung, erheblichen Sicherheitsvorfall, aktiv ausgenutzten Schwachstelle, wesentlichen Änderung, kritischen Anlage, koordinierten Offenlegung, wichtige Produkte/wichtigen Produkte, schwerwiegenden Sicherheitsvorfall/schwerwiegende Sicherheitsvorfälle, Hochrisiko-System, unbedingt erforderlich, Cookie, CVE, gebotener Sorgfalt, Bevollmächtigte, privilegierte Konten/privilegierten Konten, Transparenzpflicht, Marktüberwachung, Abschlussbericht, Statische Analyse, Dynamische Tests, CE-Zeichen.
2. **Klammerbegriffe:** ein Eintrag „Hersteller“ (6.7, rechtsübergreifend, Hinweis auf die Maschinenverordnung) statt zwei; „Hersteller (CRA)“, „Hersteller (Maschinenverordnung)“, „Integrator (CRA)“, „Anbieter (KI-Verordnung)“, „Betreiber (KI-Verordnung)“, „Maschine (Maschinenverordnung)“ gestrichen. Für „Anbieter“/„Betreiber“ gibt es in Karten/Quiz keine eindeutige, nicht fremd markierende Form (Sucher-Nachweis in der Prüfung: Fremdtreffer in 8.3, 6.5, 6.6, 11.3).
3. **Streichkandidaten:** Transitive Abhängigkeit (falsche Markierung in fu5/5.1), Maschine, Systemverwaltungssystem, Konzept zur Bewältigung von Sicherheitsvorfällen, Wiederholte Vorfälle, Vorfallprotokoll gestrichen; Alias „Folgenabschätzung“ (Fehlmarkierung in fu7/7.5) und „Transfer Impact Assessment“ (kein Synonym) entfernt. „Sicherheitsbauteil“ und „Konformitätsvermutung“ nach fu6 verschoben (je einmal). „Privilegiertes Konto“ bleibt, weil der Alias „privilegierte Konten“ Treffer erzeugt.
4. **Ergänzungen:** Marktüberwachungsbehörde (Alias Marktüberwachung), Stand der Technik, Einführer, Händler, Bevollmächtigter, Abschlussmeldung (Alias Abschlussbericht, regelwerkneutral), Beinahevorfall, Transparenzpflichten, CE-Kennzeichnung aufgenommen.
5. **Inhalt:** Aktiv ausgenutzte Schwachstelle ohne „nur sie ist meldepflichtig“; Wesentliche Änderung „und das Produkt bereitstellt“; Hochrisiko-KI-System mit Ausnahme laut Theorie (nie bei Profiling); Datenpanne nicht mehr zirkulär; Hedges wiederhergestellt („kann“, „gegenüber der Einrichtung“, „Fernzugriff einer anderen Stelle“, „wird vermutet“, „gilt nur für Managed Service Provider“, „im Sinn der Erläuterung“, „in der Regel“).

Außerdem übernommen: alle weiteren hohen und mittleren Befunde mit den Ersatztexten der Prüfung (H-1 bis H-6, M-1 bis M-16 soweit nicht unten abweichend, M-18, M-21, M-22, M-24) und die Befunde N-1 bis N-7, N-10 bis N-15 sinngemäß (u. a. Alias „Datenschutzbeauftragter“ und „Auskunftsanfragen“ entfernt, „SAST“/„DAST“ als Begriff mit „Statische Analyse“/„Dynamische Tests“ als Alias, Alias „CVE“).

## Abweichungen von der Prüfung (begründet)

- **Verantwortlicher (E-5/M-23) nicht aufgenommen.** Der Begriff ist im Bestand nicht belegt, ohne Alias aber in Karten/Quiz nirgends markierbar, und mit den Aliassen „Verantwortliche/Verantwortlichen“ markiert der Sucher in Karten/Quiz von 1.1, 3.6, 6.4, 6.5, 8.x, 9.x und 10.4 die Projektrolle („mit Verantwortlichen und Terminen“) bzw. das Adjektiv („verantwortliche Entwicklerin“) falsch. Die Erklärung steht im Lerntext 6.2 und im Bestand-Eintrag „Auftragsverarbeiter“.
- **Stand der Technik:** Ersatztext der Prüfung („Entwicklungsstand fortschrittlicher Verfahren“) nicht übernommen, weil die Theorie den Begriff nicht definiert; die Definition beschreibt nur die Verwendung in der Theorie (Recht der Einrichtungen verlangt Einhaltung, Datenschutzmaßnahmen orientieren sich daran) und lässt die Bestimmung offen.
- **Datenpanne:** Ersatztext der Prüfung mit „etwa“ (Verlust, Veränderung, unbefugte Offenlegung) versehen, weil die Theorie nur „Verletzung des Schutzes personenbezogener Daten“ nennt.
- **Betriebstechnik (M-17):** Ersatztext übernommen, Begriff ohne Klammer mit Alias OT, Operational Technology; die Verlegung nach dv2/9.1 nicht vorgenommen (Zieldatei der Aufgabe ist dv4; der Eintrag ist an 11.3 gebunden und erzeugt Treffer in dv1, dv2, dv3 und dv5).
- **Hauptniederlassung (M-20):** in si5 belassen, MSP-Hedge ergänzt (Zuständigkeit des BSI nur für Managed Service Provider). **Lock-Datei (N-9):** in ae2 belassen.
- **Tot gewordene Einträge gestrichen** (Karten/Quiz verwenden keine Form des Begriffs): Konformitätsbewertung, KI-Modell mit allgemeinem Verwendungszweck, Threat Modeling, Verwalter quelloffener Software, Kenntniserlangung (Alias „Kenntnis“ zu allgemein, Fremdbedeutung in 7.6/9.2).
- **Wesentliche Veränderung (N-15):** Hinweis auf die Abgrenzung zum CRA beibehalten; die KI-Verordnung ist nicht erwähnt, weil in den Karten/Quiz von 6.8 nicht vorkommend.

## Auffälligkeiten des Sucher-Laufs (Fremdmarkierungen)

Sachgerechte Fremdmarkierungen (Popover passt): Datenpanne (6.6, 6.7, 12.2), Stand der Technik (6.2, 8.3, 11.3), Marktüberwachungsbehörde (8.3), Lock-Datei (10.1), KI-System (7.5), Drittland (6.8, Einführer), Frühwarnung/Abschlussbericht (6.7, 9.1, 12.1, 11.3), Software-Stückliste, Aktiv ausgenutzte Schwachstelle, Unterstützungszeitraum, Wesentliche Änderung (9.1), Hersteller (8.3, 9.1, 11.3 und weitere Kontexte mit gleicher Grundbedeutung), Betriebstechnik (dv 8.3, 9.1, 10.4, 12.1), Händler/Einführer (6.8), Managed Service Provider (12.2), Wichtige Einrichtung (11.3).

Zu beobachten, aber hingenommen:
- **Cookie** (Alias von „Einwilligung zum Endgerätezugriff“) markiert in ae/9.1 zwei technische Verwendungen (Sitzungs-Cookies, „Zusätzliche Begriffe“). Das Popover erklärt dort die Einwilligung statt des Cookies; bewusst nach Entscheidung des Koordinators.
- **Geschäftsleitung** markiert in dp/8.2 und dp/10.4 die allgemeine Unternehmensführung; der erste Satz der Definition passt, der NIS2-Teil dahinter ist dort nebensächlich.
- **Hersteller** in ae/8.3 (BFSG, „Agentur als Hersteller“) bezeichnet dieselbe Rolle im allgemeinen Sinn.
- „Verantwortlicher“ hätte dagegen echte Falschmarkierungen erzeugt (oben, nicht aufgenommen).

## Weitere Hinweise

- **Cluster-2-Abgleich:** Alle Namen und Aliase beider Cluster sind eindeutig (Einspiel-Skript). „Auftragsverarbeitungsvertrag“ steht nur bei Cluster 1.
- **Unveränderte Lücken:** Ältere Teile von 9.1 (Eingabevalidierung u. a.) und 11.3 (Kennzahlen, Update-Strategie, Zonen) sind unglossiert; „Betriebstechnik“ wird in dv2/9.1 ausführlicher erklärt.
- **Dünne Zieldateien:** dv4 hat nur drei und si5 nur drei Einträge (Theorie 11.3 und 12.2 sind eher Praxis- als Begriffsstoff); das Einspielen der neuen Dateien ist trotzdem möglich.
- **IEC 62443** bleibt als Norm-Begriff drin (kein Gesetzesname); die Definition folgt der Darstellung der Theorie („nach verbreiteter Darstellung“, „gegebenenfalls Konformitätsvermutung“), der Normtext wurde nicht gelesen.
