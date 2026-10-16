# Prüfung Paket P-V Teil A (HB3 3.5 Marketingstrategie und Servicepolitik, F-HB3-04, Fachgespräch 3.5)

Stand 16.10.2026, unabhängige Prüfung. Geprüft: `hf-3.5-marketingstrategie-servicepolitik.md`, `hf-faelle-a.md`. Nichts geändert. Kein Befund mit Schweregrad hoch; 7 mittlere, 12 niedrige Befunde.

## Rechnen (Skript `pv-a-pruef.cjs`, Scratchpad)

72 Werte nachgerechnet (Theorie-Rechenbeispiele 28, Karten 4, Quiz 11, Fall 29), alle stimmen; die einzige Meldung war ein Gleitkomma-Artefakt (32.000.000 × 1,025). Zusätzlich die „Akzeptierten Antworten“ aller sechs Kurzantworten (Q-3.5-04, -07, -10, -13, -15, -16) per Skript `pv-a-antw.cjs` gegen alle plausiblen Schreibweisen (Tausenderpunkt, ,00, €/Euro/EUR, Komma/Punkt, %/Prozent, Prozentpunkt-Formen) geprüft: vollständig. Alle Fragen nennen Formel, Basis und Einheit eindeutig. Rundung im Fall: 16,2 %, 7,3 %, 0,2 Prozentpunkte (exakt 0,18, gerundet beides 0,2), 2,3 % stimmig.

## Befunde

### Mittel

**M1 · Theorie, Abschnitt „Servicepolitik“, Absatz „Die Rechnung hat Grenzen“ — fachlich verdreht.**
Fehler: „Mitnahmeeffekte (…) werden leicht überschätzt“. Gemeint ist, dass sie übersehen/unterschätzt und dadurch der Nutzen überschätzt wird (so steht es richtig im Fachgespräch: „werden leicht übersehen“). Wer den Satz wörtlich nimmt, lernt das Gegenteil.
Korrektur: „… zusätzliche Verkäufe sind eine Schätzung, **Mitnahmeeffekte** (Kundschaft hätte auch ohne den Service gekauft) werden leicht übersehen, und der Nutzen wird dadurch überschätzt, …“.

**M2 · F-HB3-04, Ausgangssituation und Teilaufgabe 1/3 — Option B passt nicht zur Marktanteilsrechnung.**
Fehler: Das Marktvolumen (32,0 Mio. €) gilt für das Einzugsgebiet; Option B spricht „Kundschaft im Umland, die bisher nicht erreicht wird“. Zählt das Umland nicht zum Einzugsgebiet, steht dessen Umsatz im Zähler, das Marktvolumen fehlt im Nenner; der Marktanteilsansatz (Mehrumsatz = Zielumsatz − Vorjahr, aufgeteilt auf A/B/C) wäre dann in sich widersprüchlich. Außerdem bleibt offen, ob Online-Umsatz in den Filialumsatz zählt.
Korrektur: In der Ausgangssituation ergänzen: „Das Einzugsgebiet umfasst auch das Umland; Umsatz und Marktvolumen beziehen sich auf dieses Gebiet, und über den Online-Shop an die Filiale zugeordnete Bestellungen zählen zum Filialumsatz.“ Option B dann „Kundschaft im äußeren Einzugsgebiet, die bisher nicht erreicht wird“.

**M3 · Budgetverteilung in Theorie (Rechenbeispiel) und F-HB3-04 — Verkaufsförderung als eigener Posten neben Kommunikation widerspricht der eigenen Definition.**
Fehler: Die Theorie ordnet die Verkaufsförderung der Kommunikationspolitik zu („Werbung, Verkaufsförderung, persönlicher Verkauf und Social Media“, ebenso in Thema 3.3), verteilt das Budget aber auf „Kommunikation 40 %“ und „Verkaufsförderung 20 %“ (Fall: „35 % Kommunikation, 25 % Verkaufsförderung“). Es fehlen Sortiments- und Preispolitik als Budgetposten, ohne dass das erklärt wird. Q-3.5-10 („Kommunikationspolitik“ 45 %) übernimmt den Widerspruch.
Korrektur: Posten umbenennen in „Werbung und Social Media“ und „Verkaufsförderung (beides Kommunikationspolitik)“; im Theorietext einen Satz ergänzen: „Sortiments- und Preispolitik wirken über Wareneinsatz und Marge, nicht über das Marketingbudget; das Budget deckt vor allem Kommunikation, Service und Distributionsmaßnahmen.“ In Q-3.5-10 „45 % für Werbung und Social Media“.

**M4 · „Servicegrad“ kollidiert mit `hb4/4.2` (Warenverfügbarkeit).**
Beurteilung: Der Fließtext benennt die Doppelbedeutung ausdrücklich („Der Begriff wird in der Logistik enger für die Warenverfügbarkeit verwendet (Thema 4.2 …)“), das genügt für die Theorie. Nicht genügt es für **K-3.5-12** (Karte ohne Abgrenzung; neben der Karte in `hb4/4.2` „Servicegrad (Verfügbarkeit)“ ein klarer Widerspruch beim Lernen), für die Positionierungsachse „Preisniveau und Servicegrad“ und für Fachgespräch Frage 2 („der Servicegrad folgt aus der Positionierung“). Im Handelsmarketing ist „Servicegrad“ zwar als Umfang des Serviceangebots verbreitet, ein eindeutigerer Begriff ist aber vorhanden.
Korrektur: Hauptbegriff **„Serviceniveau“** (Umfang und Qualität der Serviceleistungen) in Theorie, K-3.5-12, Positionierung und Fachgespräch; im Theorietext einmal: „(auch Servicegrad genannt; nicht zu verwechseln mit dem Servicegrad als Warenverfügbarkeit in der Logistik, Thema 4.2 …)“. K-3.5-12 neu: „Was ist das Serviceniveau, und wie berechnest du die Servicekostenquote?“

**M5 · Textnähe und Aufbau zu `industriefachwirt/hq3/7.5` (Marketingplanung).**
Fundstellen und Befund (`siebenwort`: 12 Wörter): „in der Wahrnehmung der Zielgruppe im Vergleich zum Wettbewerb einnehmen soll“ steht in Abschnitt Wettbewerbsstrategien/Positionierung fast wörtlich in 7.5 (Markenpositionierung). Darüber hinaus folgen mehrere Teile dem Gerüst von 7.5: Prozess in sechs Schritten mit Regelkreis, ökonomische/psychografische Ziele, dieselbe Dreiteilung komplementär/konkurrierend/indifferent mit demselben Beispiel (Marktanteil durch niedrige Preise gegen Ertragsgröße, hier Rohertragsquote; auch K-3.5-03, Q-3.5-05), Dreiklang Kostenführerschaft/Differenzierung/Nische mit „zwischen den Stühlen“ in gleicher Satzfolge, Kritik am Prozentverfahren („sinkt der Umsatz, wird gerade dann gespart, wenn …“ — 7.5: „obwohl gerade dann zusätzliche Anstrengungen sinnvoll wären“), Marketingkostenquote und Marketing-ROI mit identischer Formelgestalt (Q-3.5-16 gegen Q-7.5-09; Q-3.5-01 Sortieren gegen Q-7.5-01). Fachbegriffe und Formeln dürfen übereinstimmen; die Formulierungsnähe nicht.
Korrektur: Positionierungssatz umformulieren (etwa „Die Positionierung beschreibt, als was die Zielgruppe das Angebot im Vergleich zu den Mitbewerbenden wahrnehmen soll“); Zielkonflikt-Beispiel austauschen (etwa „Servicequalität und Kostenziel“: längere Beratungszeit steigert Zufriedenheit, drückt aber die Kostenquote); Prozentverfahren-Kritik mit eigenem Handelsbeispiel formulieren (Umsatzrückgang durch neuen Wettbewerb → Budget sinkt, obwohl gerade jetzt Kommunikation und Service nötig wären); Q-3.5-16 auf anderes Zahlengewand und Kontext (z. B. Aktion mit Kosten- und Rohertragsvergleich plus Frage nach der Aussage des ROMI) oder durch eine Wiederkauf-Frage ersetzen. Strukturell genügt es, die Reihenfolge der Abschnitte so zu belassen (sie ist durch den Prozess vorgegeben), solange die Formulierungen eigenständig sind. Zu `hsq4/4.2` und `hq3/7.2` keine Klone festgestellt; Ansoff-Beispiele und Fall sind eigenständig, der Fall ähnelt in Aufbau und Szenario weder F-HSQ4-01 noch F-HQ3-05.

**M6 · F-HB3-04, Teilaufgabe 1 (SMART-Ziel) — Musterlösung widerspricht der Aufgabe.**
Fehler: Aufgabe verlangt ein „SMART-Ziel“ (Regel aus Thema 2.6: spezifisch, messbar, akzeptiert, realistisch, terminiert); die Musterlösung bewertet nur „Inhalt, Ausmaß, Zeitbezug und Gebiet“ (Zielinhalt/-ausmaß/-bezug-Schema). Lernende, die die SMART-Buchstaben nutzen, haben kein Bewertungsraster; die Theorie vermengt beide Schemata in einem Satz.
Korrektur: Musterlösung: „Entscheidend sind spezifisch (Marktanteil, Einzugsgebiet), messbar (7,5 % auf 8,5 %), terminiert (Planjahr); zusätzlich kurz akzeptiert/realistisch (Mehrumsatz von rund 16 % ist ambitioniert, aber mit den Optionen A bis C hinterlegt).“ Im Theorietext den Satz zu „Inhalt, Ausmaß, Zeitbezug …“ als Ergänzung zu spezifisch/messbar/terminiert formulieren.

**M7 · Größenordnung „Regionalbereich“ in Q-3.5-10 und Q-3.5-13.**
Fehler: Die Theorie rechnet für einen Regionalbereich mit neun Filialen 24,0 bis 25,0 Mio. € Umsatz. Q-3.5-10 gibt einem „Regionalbereich“ 3.600.000 € Planumsatz, Q-3.5-13 3.900.000 € Ziel; das entspricht einer einzelnen Filiale (Fall: 2,4 bis 2,8 Mio. €).
Korrektur: In beiden Fragen „Filiale“ statt „Regionalbereich“ (Zahlen bleiben).

### Niedrig

**N1 · Q-3.5-15** Marktvolumen steigt um 33 % (42,0 auf 56,0 Mio. €) im Einzugsgebiet; für ein Jahr unrealistisch (Theorie 4 %, Fall 2,5 %). Korrektur: 42,0 → 44,8 Mio. €, Umsatz 3,36 Mio. €: 8,0 % → 7,5 %, 0,5 Prozentpunkte (relativ −6,25 %); Akzeptierte Antworten dann 0,5-Formen (0,5; 0,50; Komma/Punkt; %, Prozent, Prozentpunkt(e), %-Punkte, %-Pkt.; mit „+“ nicht nötig), Erklärung anpassen.

**N2 · Gap-Analyse** Die Quelle trennt oft Gesamtlücke in operative Lücke (Kerngeschäft, Marktdurchdringung) und strategische Lücke (neue Felder). Der Entwurf nennt den gesamten Abstand „strategische Lücke“ (vertretbar, aber nicht einhellig). Korrektur: im Theorietext ein Halbsatz „Manche Quellen teilen diesen Abstand in eine operative Lücke (Maßnahmen im Kerngeschäft) und eine strategische Lücke (neue Produkte oder Märkte); hier wird der gesamte Abstand betrachtet.“ Q-3.5-12 bleibt dann richtig.

**N3 · Verweis „Marketingziele leiten sich aus den Unternehmenszielen ab (Thema 1.1 Geschäftsideen und Businessplanung …)“** Thema 1.1 behandelt „Geschäftsidee und Zielsetzung“ als Businessplan-Baustein, nicht Unternehmensziele im Zielsystem. Titel und Fachgebiet stimmen. Korrektur: Verweis streichen oder „(vgl. Zielsetzung im Businessplan, Thema 1.1 …)“.

**N4 · Ansoff-Tabelle, Zeile Marktentwicklung** „neuer Vertriebsweg“ allein ist für dieselbe Kundschaft keine neue Marktentwicklung (eher Marktdurchdringung). Korrektur: „neuer Vertriebsweg, um neue Kundschaft zu erreichen“.

**N5 · F-HB3-04, Musterlösung Teilaufgabe 3** „die Kundenkarte ist bereits vorhanden“ steht nicht in der Ausgangssituation (dort nur „Kundenkarten-Aktion“). Korrektur: in der Ausgangssituation „über eine Aktion mit der bestehenden Kundenkarte“.

**N6 · F-HB3-04, Musterlösung Teilaufgabe 2** „Stützen sind die gelobte Beratung und die Qualität (auch: Service, fehlende Größen als Ansatz für Verbesserungen)“. Service wird im Fall nicht gelobt (nur Wartezeiten kritisiert), fehlende Größen sind ein Mangel, kein Merkmal. Korrektur: „(auch: treue Stammkundschaft)“; Mängel (Wartezeiten, fehlende Größen) als Handlungsfelder der Differenzierung getrennt nennen.

**N7 · Ansprache-/Themenbezug Fall** `Themenbezug` nennt nur 3.5; der Fall setzt Marktanteil (3.1) und SMART (2.6) voraus. Korrektur: „3.5 (…); Verweis auf 3.1 (Marktanteil) und 2.6 (SMART-Regel)“, passend zum Bestand-Muster.

**N8 · ROMI und ROAS** In der Ergänzung 3.4 (Teil C) stehen WUR/ROAS mit Umsatzbasis, in 3.5 der ROMI mit Rohertragsbasis. Ohne Abgrenzung verwechseln Lernende die Kennzahlen. Korrektur: ein Satz im Controlling-Absatz: „Anders als der ROAS (Thema 3.4, Bestellumsatz je Werbeeuro) rechnet der ROMI mit dem Rohertrag und zieht die Kosten ab.“

**N9 · Q-3.5-09 Lückentext** Lösungswort „Marketing-Mix“ ist mit Bindestrich; „Marketingmix“ oder „Marketing Mix“ werden bei exaktem Vergleich falsch gewertet. Korrektur: Wort ohne Schreibvarianten, z. B. „Die Abfolge aus Situationsanalyse, Zielen, Strategie, Mix, Umsetzung und Kontrolle heißt ___Marketingprozess___.“

**N10 · Positionen der richtigen Antworten** Q-3.5-03 und Q-3.5-11 (Multiple Choice) haben die richtige Antwort beide an zweiter Stelle. Korrektur: Q-3.5-11 richtige Antwort an Position 4 oder 3. Zeichenzahl: in allen MC/Mehrfach/Was-passt-nicht-Fragen ist die richtige Antwort nicht die längste (Q-3.5-03: kürzeste), in Ordnung.

**N11 · Q-3.5-03 Distraktoren** „Keine klare Ausrichtung, um alle Zielgruppen zu erreichen“ und „Rückzug … ohne weitere Prüfung“ sind Strohmänner; nur die Kostenführerschaft ist ein fairer Distraktor. Korrektur: eine Option ersetzen durch „Nischenstrategie ausschließlich für Hochpreiskundschaft ohne Basisangebot“ oder „Preisorientierung am Fast-Fashion-Unternehmen durch Dauerrabatte“ (nicht als richtig mit Differenzierung vereinbar).

**N12 · Redundanz Servicezuordnung** Online-Verfügbarkeitsanzeige, Änderungsservice/Kürzen und Retourenabholung kommen in Q-3.5-06, Q-3.5-08 und der Fall-Teilaufgabe 4 jeweils in gleicher Funktion vor. Korrektur: Q-3.5-08 mit neuen Beispielen (z. B. Parkplatz-Hinweis, Terminbuchung für Stilberatung, Pflegehinweise per E-Mail) bestücken, damit die Items nicht dieselbe Prüfung dreimal stellen. Auch das Rechenbeispiel „Änderungsservice“ (Theorie) zeigt: Der Service wirkt vor dem Kauf als Argument; ein Satz „Zusätzliche Verkäufe entstehen, weil das Angebot schon vor dem Kauf als Kaufargument wirkt“ klärt, warum ein Service „nach dem Kauf“ zusätzliche Käufe auslöst.

## Bestand und Register

- Ansoff: Keine Widersprüche zu `hb1/1.1`; die Theorie erklärt die Felder nicht erneut, sondern verweist; Zuordnung Sortimentsdiversifikation (3.2) und Ansoff-Diversifikation ist richtig abgegrenzt.
- `hb1/1.3`: Weiterempfehlungsrate kommt dort nur als Kartenantwort („Net Promoter Score (Weiterempfehlungsrate)“) und in der Balanced Scorecard (Kundenperspektive) vor; der Verweis ist tragfähig.
- `hb3/3.1` bis `3.4`, `wb1/5.3`: Marktanteil-Formel, Standort/Filialnetz, Omnichannel, Preispositionierung (Mittel- bis Hochpreis) stimmen überein; keine Wiederholung, Kurzverweise vollständig mit Titel und Fachgebiet (alle Kurzverweise geprüft; Titel 3.1, 3.2, 3.3, 3.4, 4.2, 5.3, 1.1, 1.3, 2.6 stimmen mit den `thema_title` im Bestand überein; Thema 5.4 stimmt mit dem Titel in `hf-5.4-kundenzufriedenheit-kundenbindung.md` überein).
- Teile B und D verweisen mit korrektem Titel zurück auf 3.5 („Marketingstrategie und Servicepolitik“ im Fachgebiet Handelsmarketing).
- `hb4/4.2` Servicegrad: siehe M4.
- Register: Filiale Bamberg ist als P-V-Name eingetragen und im Bestand nicht vorhanden; keine Gesamtbeschäftigtenzahl genannt. Passt.
- Zahlenabgleich (`pruefe-paket.cjs zahlen`) gegen Bestand und Teile B bis D: nur übliche Zufallsübereinstimmungen (2.400.000, 64.000, 8,5, 0,75 usw.); keine gleiche Zahlenkonstellation in Teilen B bis D (7,80 € und 8,00 € in `hf-faelle-c.md` sind Bestell-/Retourenkosten, 36.000 € in `hf-3.4` ein Werbekanal-Umsatz).
- Siebenwort-Lauf: außer M5 (hq3/7.5) nur Vorlagenzeilen (Frontmatter-`quelle`, Format von Akzeptierte-Antworten-Listen, Kurzverweistexte, Fallvorlage); Fall: nur Vorlagenzeilen und interne Wiederholungen zum Thema.

## Fachlich, Quiz, Fall, Fachgespräch (ohne Befund)

- Marketing als Führungskonzeption, Marketingprozess (sechs Schritte, Regelkreis), ökonomische/psychografische Ziele, Zielbeziehungen, Ansoff mit Gap-Analyse, Kostenführerschaft/Differenzierung/Nische (ohne Lizenznamen), Handels-Mix mit fünf Politiken und Dienstleistungsmix (Personal, Ausstattung, Prozesse), Servicegliederung vor/beim/nach, Basis-/Zusatzservice, Budgetverfahren (vier), ROMI mit Rohertrag: fachlich richtig.
- Quiz: Sortieren genau 4 Elemente; Zuordnungen eindeutig (Q-3.5-02 vier, Q-3.5-14 fünf Paare, jede rechte Seite einmal); Mehrfachauswahl Q-3.5-06 genau drei richtige, eindeutig; Was-passt-nicht-dazu hat genau eine Lösung; Kurzantworten 6 von 16 (37,5 %, höchstens zwei Drittel erfüllt), davon 6 Rechen-Kurzantworten (Pflicht: 4); Szenariofragen mindestens ein Drittel (Q-3.5-02, -03, -05, -07, -10, -11, -14 und weitere mit Beispielkontext); Typen gemischt (neun Typen vertreten); IDs K-3.5-01 bis -14 und Q-3.5-01 bis -16 lückenlos; Duzen in Karten und Quiz, Siezen in Fall und Fachgespräch; keine Paragrafen oder Gesetzesnamen (Rechtshinweis nur allgemein); keine generischen Maskulina gefunden; Zahlenformat (Tausenderpunkt, Dezimalkomma, Leerzeichen vor €, %) eingehalten.
- Fall F-HB3-04: 20 Punkte (5 × 4), Raster ganzzahlig und eindeutig, Folgefehler neutral, Rechnung vollständig nachvollziehbar; bis auf M2/M6 und N5 bis N7 alle Informationen in der Ausgangssituation. Fachgespräch: drei Fragen, je fünf Erwartungen und eine Rückfrage, passt zum Thema.
