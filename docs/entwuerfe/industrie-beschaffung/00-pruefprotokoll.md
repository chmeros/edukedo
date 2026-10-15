# Prüfprotokoll: Paket P-K „Industriefachwirt: Beschaffung, Lager und Transport, Entsorgungslogistik, Fertigungsorganisation und Standort“ (Erhebung vom 14.10.2026: IF-05, IF-06, IF-07, IF-08)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3; Entsorgung und Instandhaltung mit rechtsnahen Hinweisen, nicht förmlich rechtsgeprüft). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen und ohne Zahlenwerte: Fracht-, Speditions-, Lager- und Haftungsrecht, Transportversicherung, Zoll, Arbeitsschutz (Teil B); Abfallrecht, Nachweis- und Rücknahmepflichten, gefährliche Stoffe (Teil C); Arbeitsschutz und Normen der Instandhaltung (Teil D).

## Umfang

Kurs Industriefachwirt (Solvitec Elektrowerke GmbH; Werk Nord Kunststoffspritzguss, Werk Süd SMD-Fertigung, Werk Ost Blechbearbeitung und Schaltschrankmontage), Fachgebiet HQ2.

- **Neues Thema 6.5** „Beschaffungsmarkt, Bedarfsermittlung, Make-or-Buy und Einkaufsverhandlung“ (14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten) und **F-HQ2-05**, 3 Fachgesprächsfragen.
- **Neues Thema 6.6** „Lager- und Transportwesen“ (14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten) und **F-HQ2-06**, 3 Fachgesprächsfragen.
- **Neues Thema 6.7** „Entsorgungslogistik und Kreislaufwirtschaft“ (10 Karten, 12 Quizfragen, 5 Rechen-Kurzantworten) und **F-HQ2-07**, 2 Fachgesprächsfragen.
- **Neues Thema 6.8** „Fertigungsorganisation, Fertigungstiefe, Standort und Instandhaltung“ (12 Karten, 14 Quizfragen, 6 Rechen-Kurzantworten) und **F-HQ2-08**, 3 Fachgesprächsfragen.
- Zusammen 50 Karten, 58 Quizfragen (27 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 11 Fachgesprächsfragen; **127 neue Item-Schlüssel** (18.988 → 19.115).
- **Änderungen am Bestand durch das Einspielen:** nur der Einleitungssatz der Fallaufgaben HQ2 („6.1–6.8“) und die Einfügung der Fälle und Fachgesprächsfragen in die bestehenden Dateien.
- Dateien: `industrie-6.5-…`, `-6.6-…`, `-6.7-…`, `-6.8-…`, `industrie-faelle-a.md` bis `-d.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (658 Themendateien, 19.115 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Vier Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand und den anderen Teilen:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 11, Teil B 14, Teil C 16 (1 hoch), Teil D 17 (3 mittel). Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Skonto und Einstandspreis im Fall; Stücklistenauflösung bei Fremdbezug von Baugruppen | Rechnungspreis 6,50 €, Einstandspreis 6,37 €, kritische Menge neu; zugekaufte Baugruppen werden nicht weiter aufgelöst (54.000 statt 90.000 Steckverbinder) |
| A | Nutzwert-Begriffe, Fixkostenaufzählung, ABC-Regel, neutrale Formen | einheitlich Teilnutzwert und Nutzwert, Muss-Kriterien; Formulierungen geschärft; „Zweitlieferant“ → „zweites Lieferunternehmen“ |
| B | Lagerkostensatz im Fall widerspricht der Definition (Personal, Lagerverwaltungssystem) | Ausgangssituation und Teilaufgabe nennen die einbezogenen Kosten; Theorie: Unternehmen legt Kostenarten fest |
| B | Exportbeispiel (16 t je Container unplausibel, Umschlagkosten unklar), Fehlerkosten im Make-or-Buy | rund 10 t je Container (0,16 € gegenüber 0,12 € je Tonnenkilometer, Ersparnis unverändert 320 €); Umschlag nur im Bahn-/Hafenterminal; Fehlerkosten bewusst außen vor, begründet |
| C | **Blechbearbeitung im Werk Nord, in Teil D im Werk Ost** | durchgehend Werk Ost (Blech-Rechenbeispiel 135 t, Vorteil 11.700 €); Werk Nord nur Kunststoffspritzguss |
| C | Mehrwegbehälter widersprüchlich eingeordnet; Mehrweg-Beispiel im Werksverkehr; Kartonage und Folien in der Ballenpresse | einheitlich „Wiederverwenden“ (auch als Vermeiden verstehbar); Beispiel mit Lieferunternehmen; Fall nur Kartonage |
| C | Verwertungsquote zu pauschal; Angüsse als Abfall; Rechtsformulierungen | Quote des Stoffstroms gegenüber Quote des Werks; Angüsse nur Abfall, wenn nicht wieder eingesetzt; „beschreibt“ statt „legt fest“, Leitliniensatz |
| D | **Linienfertigung falsch dem Takt zugeordnet** | Reihenfertigung (auch Linien-/Straßenfertigung) gegenüber Fließ- und Taktfertigung |
| D | Sensorik-Sparte mit 30 Mio. € widerspricht 7.1; MTBF-Laufzeit mehrdeutig | „Baureihe der Standard-Sensoren“; Laufzeit definiert (ohne Ausfall-, Rüst- und Wartezeiten), Q-6.8-11 neu gefasst |
| D | Doppelungen mit 6.5; fast wörtliche Übernahmen aus dem Technischen Fachwirt | Verweise auf 6.5 statt Wiederholung; Fertigungsinsel, K-6.8-03 und Fachgespräch eigenständig formuliert |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Abfallhierarchie, Nachweise, Rücknahme- und Entsorgungspflichten, gefährliche Stoffe (Teil C); Fracht-, Spediteur-, Lagerhalter- und Haftungsrecht, Transportversicherung, Arbeitsschutz im Lager (Teil B); Normbezüge der Instandhaltung (Teil D, nur als Anlehnung); Verhandlungs- und Kartellrecht im Einkauf (Teil A).
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Marktpreise für Schrott und Wertstoffe, Kosten je Tonne, Beispielwerte zu Lager- und Transportkosten, Kennzahlen der Instandhaltung; alle als Beispielwerte gekennzeichnet.
- **Fachbegriff „Dienstleister“:** Zusammensetzungen wie „Logistikdienstleister“ und „Kontraktlogistik-Dienstleister“ bleiben als Fachbegriffe in 6.6 stehen; sonst neutrale Formen.
- **Bestand, nicht Teil von P-K (nur gemeldet):** Werksnamen im Kurs uneinheitlich (Nord/Süd/Ost/West in 6.1, 6.4, WQ2, F-HQ2-04 gegenüber „Werk 1/2“ in F-HQ2-01 und Villingen/Zwickau/Brünn in `wq4/4.1`, `hq4/8.4`, `hq5/9.4`; dort liegt die Sensorik in Zwickau, die Kabelkonfektion in Brünn, die Endmontage in Villingen) – kursweit zu vereinheitlichen; Materialmengen in 6.4 (1 Mio. € Materialverbrauch, ABC-Beispiel) gegenüber WQ2 und den neuen Rechenbeispielen (als Beispielwerte gekennzeichnet); Verweis „Lieferantenbewertung“ in 6.4 ohne eigenen Abschnitt (jetzt in 6.5).
- **Reihenfolge:** 6.5 bis 6.8 verweisen aufeinander (Make-or-Buy 6.5/6.6/6.8, Mehrweg 6.6/6.7) und werden zusammen eingespielt.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
