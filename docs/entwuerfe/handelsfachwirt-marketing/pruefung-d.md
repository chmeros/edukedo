# Prüfung P-V Teil D (Handelsfachwirt WB1 5.4 „Kundenzufriedenheit und Kundenbindung“, F-WB1-06, Fachgespräch 5.4)

Stand 16.10.2026. Geprüft: `hf-5.4-kundenzufriedenheit-kundenbindung.md` (7 Abschnitte, 14 Karten, 16 Quizfragen) und `hf-faelle-d.md` (F-WB1-06, 3 Fachgesprächsfragen). Maßstab: `auftrag.md`. Keine Entwurfsdatei und kein Bestand geändert. Mechanik (Kopie-Test, Parser) nicht geprüft.

## Gesamturteil

Rechnerisch und fachlich sauber: **kein Rechenfehler, keine falsche Definition, kein Strukturklon, keine Rechtsnorm.** Einspielen erst nach den Korrekturen der Befunde „mittel“. Es gibt keinen Befund „hoch“.

## 1. Rechnen (rund 100 Werte nachgerechnet)

Skripte im Scratchpad: `pv-d-pruef.cjs` (alle Zahlen aus Theorie, Karten, Quiz und Fall) und `pv-d-akz.cjs` (maschineller Abgleich der „Akzeptierten Antworten“ gegen alle Pflichtschreibweisen).

Ergebnis: Alle Rechenwege, Zwischen- und Endwerte stimmen.

- Theorie: Zufriedenheitsindex 1,290 + 0,900 + 0,780 + 0,465 + 0,450 = 3,885 (Gewichte 100 %); NPS 250/500 − 85/500 = +33; Beschwerdequote 1,5 %, mittlere Bearbeitungszeit 720 ÷ 360 = 2,0 Tage, Lösungsquote 270 ÷ 360 = 75 %; Deckungsbeitrag A 208 €, B 182 €; Wiederkaufquote 56 %, Abwanderung 20 %, Lebensdauer 5 Jahre; Gutschein 5 € ÷ 250 Punkte = 2 %; Break-even 200; Rückgewinnung 960 + 960 = 1.920 €, je Rückkehr:in 16,00 €.
- **Zahlentausch beim Bonus bestätigt:** 4.050.000 × 0,02 × 0,70 = 56.700 €; 56.700 ÷ 9.000 = 6,30 € je Person; mit 16 € Bindungskosten 208 − 16 = 192 €, 192 × 5 − 36 = 924 €. Theorie und Karten sind konsistent.
- Karten: K-04 +25, K-05 3,6, K-07 0,6 %, K-11 35 %/12 %/88 %, K-12 2,5 Jahre/170 €: alle richtig.
- Quiz: Q-02 +15, Q-04 46 %, Q-06 19 %, Q-08 110 €, Q-10 38.400 €/6,00 €, Q-12 2,8 Tage, Q-14 147 €, Q-15 4,5 Prozentpunkte (relativ 16,7 %), Q-16 18,25 €: alle richtig, alle Fragen mit Formel, Basis und Einheit.
- Fall F-WB1-06: 42 %/20 %/38 %, NPS +22, +8 Punkte; Beschwerdequote 1,0 %, 750 ÷ 250 = 3,0 Tage, Lösungsquote 70 %, Umtausch/Erstattung 20 % der Fälle und 60 % der Falltage; Deckungsbeitrag 160 €, Bonuskosten 9,60 €, Bindungskosten 12,00 €, DB nach Bindungskosten 148 €, Lebensdauer 4 Jahre, Kundenlebenszeitwert 564 €; Break-even 162,2 → 163; 4.000 × 0,04 = 160; 160 × 148 = 23.680 €; Saldo −320 €; Aktion 1.800 + 1.200 = 3.000 €, 25,00 € je Rückkehr:in (unter 28 €), Zusatz-DB 17.760 €, Saldo +14.760 €. Alles richtig; Raster 4 × 4 = 16 Einzelpunkte plus Zusammenfassungen ergeben je Teilaufgabe 4, Summe 20, ganzzahlig.
- Akzeptierte Antworten: alle Pflichtformen vorhanden (Punkte/Punkt, +, Prozentpunkte-Reihe mit +/−/„−“, ,00 und .00, €/Euro/EUR). Nur optional: bei den Euro-Antworten (Q-08, Q-10, Q-14) fehlt „,0“/„.0“ (z. B. „110,0“); nicht verpflichtend, siehe D-14.

## 2. Befunde

### Mittel

**D-01 · F-WB1-06, Ausgangssituation (Datenlücke bei der Rückgewinnung).** Teilaufgabe 5 verlangt den „zusätzlichen Deckungsbeitrag der Rückkehrenden“, die Musterlösung rechnet 120 × 148 € = 17.760 €. Die Ausgangssituation sagt aber nur für „Club Plus“, dass jede zusätzlich gehaltene Person den Deckungsbeitrag nach Bindungskosten im Folgejahr bringt. Für die Rückkehrenden fehlt die Angabe; wer 148 € nicht annimmt, hat keinen Rechenweg (Hausregel: alle Informationen für die Lösung in der Ausgangssituation).
Korrektur: In der Ausgangssituation ergänzen: „Auch jede zurückgewonnene Person bringt im Folgejahr den Deckungsbeitrag nach Bindungskosten aus der Kundenwertrechnung.“

**D-02 · F-WB1-06, Ausgangssituation (Zeitbezug 4.000 Karten und 1.200 Inaktive).** „Zu Jahresbeginn sind 4.000 Karten aktiv“ und „1.200 Karteninhaber:innen, die im Vorjahr gekauft, im laufenden Jahr aber nicht mehr gekauft haben“ stehen im selben Absatz ohne klaren Bezug. Bei 4.000 aktiven Karten zu Beginn des laufenden Jahres und 25 % Abwanderung wären 1.000 Abgewanderte zu erwarten, genannt werden 1.200 (30 %); wer genau rechnet, stößt auf den Widerspruch. Zusätzlich: Die Wiederkehr der 1.200 fällt nach der Definition in 5.4 unter „kein Kauf in zwölf Monaten“, die Aufgabe sagt „im laufenden Jahr“.
Korrektur: „Planung für das kommende Jahr: Zu dessen Beginn werden 4.000 Karten aktiv sein. … Außerdem sollen 1.200 frühere Karteninhaber:innen, die seit mehr als zwölf Monaten nicht mehr gekauft haben, angeschrieben werden.“ Zahlen bleiben, Musterlösung unverändert.

**D-03 · F-WB1-06, Ausgangssituation (Formel Kundenlebenszeitwert fehlt).** Definiert sind NPS, Bonuskosten, Bindungskosten und Kundenlebensdauer, nicht aber der Kundenlebenszeitwert. „Vereinfacht, ohne Abzinsung“ plus „Gewinnungskosten je neu gewonnene Person“ lässt offen, ob und wie die 28 € eingehen (Hausregel: Frage eindeutig mit Formel).
Korrektur: Satz ergänzen: „Kundenlebenszeitwert = Deckungsbeitrag nach Bindungskosten je Jahr × Kundenlebensdauer − Gewinnungskosten.“ Ebenso nach „Beschwerdequote“ und „Lösungsquote“ je eine Kurzdefinition (Beschwerden ÷ Kaufvorgänge; im Erstkontakt gelöste ÷ alle Beschwerden), da die Aufgabe sonst auf das Thema zurückverweist.

**D-04 · F-WB1-06, Filialname Freiburg kollidiert mit Teil B.** `hf-faelle-b.md` (F-HB3-05) spielt in „der neu eröffneten Filiale in Freiburg“ (erstes Jahr, Sponsoring), F-WB1-06 in der „Filiale Freiburg“ ein Jahr nach Einführung des Loreno Club mit 4.000 aktiven Karten und 25.000 Kaufvorgängen. Das Register nennt Freiburg als P-V-Name; die Kopfzeile von `hf-faelle-d.md` behauptet, der Name sei „in den bisherigen Paketen nicht vergeben“, das stimmt nur für frühere Pakete. Eine „neue“ und eine eingeführte Filiale gleichen Namens widersprechen sich im selben Kurs.
Korrektur: In Teil D die Filiale umbenennen, z. B. „Würzburg“ oder „Heidelberg“ (kein Treffer in `content/handelsfachwirt/`, den Entwürfen und dem Register), und die Kopfzeile von `hf-faelle-d.md` sowie das Register anpassen (Freiburg nur Teil B). Regensburg (nur Teil B, Thema) und Bamberg (Teil A) stoßen mit Teil D nicht zusammen.

**D-05 · Theorie, Abschnitt „Kundenwert und Kennzahlen der Bindung“ (falsche Zählung).** „Für die Bindung kommen vier Quoten und zwei Größen hinzu“; die Liste enthält drei Quoten (Wiederkaufquote, Abwanderungsquote, Bindungsquote) und drei Größen (Kundenlebensdauer, Bindungskosten, Kundenlebenszeitwert). Lernende suchen sonst eine vierte Quote.
Korrektur: „… kommen drei Quoten und drei Größen hinzu.“

**D-06 · Theorie: Kurzverweise ohne Titel und Fachgebiet (Hausregel).** (a) Abschnitt Kundenbindung: „Treuepunktaktionen in Thema 3.3“; (b) Abschnitt Auswertung: „zu Omnichannel siehe Thema 3.4“. Beide ohne Titel und Fachgebiet.
Korrektur: (a) „… in Thema 3.3 Werbekonzepte und Verkaufsförderung im Fachgebiet Handelsmarketing“; (b) „… siehe Thema 3.4 Visual Merchandising und E-Commerce im Fachgebiet Handelsmarketing“. Außerdem ist „im selben Fachgebiet“ bei „Testkäufen siehe Thema 3.1 …“ (Abschnitt Kundenzufriedenheit) irreführend, weil 5.4 im Fachgebiet WB1 steht und 3.1 in HB3: besser „im Fachgebiet Handelsmarketing“ ausschreiben. Gleiches bei „Thema 3.4 … im selben Fachgebiet“ im Kano-Abschnitt (Customer Journey) und bei der ABC-Analyse (dort bereits richtig ausgeschrieben).

**D-07 · Q-5.4-11 (Was passt nicht dazu): Distraktor nicht eindeutig fair.** Gefragt ist, was nicht zu einer „sinnvollen Beschwerdeauswertung“ passt. Option C („Nach der Lösung nachfragen, ob die Kundschaft zufrieden ist“) gehört laut Theorie zur Beschwerdereaktion (Nachfassen), nicht zur Auswertung; die Erklärung rettet das mit „Auswertung und Reaktion“, aus der Frage ergibt sich das nicht. Die richtige Antwort D ist dagegen klar.
Korrektur: Frage umstellen auf „Welche Maßnahme passt nicht zu einem sinnvollen Beschwerdemanagement?“ oder C ersetzen, z. B. „Ergebnisse regelmäßig mit den Filialen besprechen und Verbesserungen verfolgen“. Zeichenlängen: richtige Antwort ist die kürzeste (55 Zeichen gegen 56 bis 61), nicht die längste; in Ordnung.

**D-08 · Quizmischung (Wissensvermittlung unausgewogen bei den Begriffen).** 9 von 16 Fragen sind Kurzantworten (56 %, unter der Obergrenze von zwei Dritteln, über dem Minimum von 8 Rechen-Kurzantworten): formal in Ordnung. Inhaltlich sind Q-5.4-04 und Q-5.4-06 gleich gebaut (ein Quotient mit vorgegebener Definition), Q-5.4-13 prüft dieselbe Definition (Nenner der Abwanderungsquote) noch einmal. Keine Frage prüft Grund- und Zusatznutzen, Erwartung gegenüber Erlebnis (Lieferversprechen), den Zufriedenheitsindex als Begriff, Kano-Dynamik, Verbundenheit gegenüber Gebundenheit (nur indirekt in Q-07), den Ablauf der Rückgewinnung oder das CRM-System; sie stehen nur auf Karten. Echte Szenariofragen ohne Rechnung: eindeutig nur Q-01, Q-03, Q-07 (dazu schwach Q-11, Q-13); das ist knapp unter einem Drittel (5,3 von 16).
Korrektur (ohne die Mindestzahl 8 Rechen-Kurzantworten zu gefährden): Q-5.4-06 ersetzen durch eine Szenariofrage, z. B. Multiple Choice „Loreno wirbt mit ‚Lieferung in 24 Stunden‘ und liefert nach drei Tagen; ohne das Versprechen wäre die Lieferzeit unauffällig gewesen. Was erklärt die Unzufriedenheit? → Erlebnis liegt unter der durch die Werbung geweckten Erwartung (Soll-Ist-Vergleich)“. Dann bleiben 8 Rechen-Kurzantworten (8 von 16, genau die Hälfte) und es gibt 4 klare Szenarien plus die schwachen Q-11/Q-13; Q-13 zusätzlich in eine Situation mit Zahlen kleiden. Optional Q-5.4-09 (Lückentext Kulanz, reine Wiedergabe) in ein Wahr/Falsch zur Kano-Dynamik umwandeln, damit auch dieser Typ vorkommt (aktuell kein Wahr/Falsch).

### Niedrig

**D-09 · Theorie, Beispiel Kundenwert (Kund:in A, Bindungskosten 16 €).** Der Wert „Bindungskosten von 16 €“ ist nicht herleitbar: Der Bonus allein wäre 520 € × 0,02 × 0,70 = 7,28 €, der Rest wäre Kartenbetrieb. Außerdem passt Kund:in A (sechs Bestellungen, Versand, Rücksendung) nicht zur Quote „in den Filialen“ im Absatz davor, und „B hat fast den doppelten Umsatz“ ist bei 900 gegenüber 520 € (+73 %) übertrieben.
Korrektur: „… nach Bindungskosten von 16 € (Bonus und Kartenbetrieb, Beispielwert)“; „B hat rund drei Viertel mehr Umsatz und trotzdem den geringeren Deckungsbeitrag“; den Abwanderungsbeispiel-Satz als „im Online-Shop“ formulieren oder A als Filialkundin mit Rücksendungen ersetzen.

**D-10 · Theorie: Begriff „Bonus“ gegenüber Bestand.** `wb1/5.3` und `wb2/6.2` verwenden „Bonus“ als nachträgliche Lieferantenrückvergütung, `hb2/2.7` als Entgeltbestandteil. In 5.4 meint „Bonusprogramm/Bonuskosten“ den Kundenbonus. Kein Widerspruch, aber Verwechslungsgefahr, zumal im Abschnitt Kundenbindung auf 5.3 verwiesen wird.
Korrektur: Ein Halbsatz: „… (der Kundenbonus an Endkund:innen ist etwas anderes als der Lieferantenbonus in Thema 5.3 Preis- und Konditionenpolitik im selben Fachgebiet)“.

**D-11 · Theorie: Fachbegriff „Customer Lifetime Value (CLV)“ fehlt.** Kundenlebenszeitwert wird eingeführt, der in Prüfung und Praxis übliche englische Begriff nicht.
Korrektur: Beim ersten Vorkommen „(englisch Customer Lifetime Value, CLV)“ ergänzen; ebenso „Churn“ nicht nötig.

**D-12 · Theorie: generische Maskulina.** „ein Wettbewerber“ (Abschnitt Kundenbindung, zweimal; Q-5.4-07), „Lieferant“ („nach Ursache, Warengruppe, Lieferant und Filiale“, Theorie und Q-5.4-11). Hausregel: neutrale Formen für Geschäftspartner. Teil A schreibt „Mitbewerbende“.
Korrektur: „ein Wettbewerbsunternehmen“ bzw. „der Wettbewerb“/„Mitbewerbende“; „Lieferunternehmen“ oder „Lieferbetrieb“.

**D-13 · Theorie: Querbezug zu Teil C.** „Gewinnungskosten je neu gewonnene Person“ entspricht den Neukundengewinnungskosten (CAC) der Ergänzung zu 3.4 (Teil C, dort „Kosten ÷ Zahl der Neukund:innen“), ohne Verweis. Besser gleiche Begriffsbasis nennen.
Korrektur: Im Abschnitt Kundenwert nach der Formel des Kundenlebenszeitwerts: „Die Gewinnungskosten entsprechen den Neukundengewinnungskosten aus Thema 3.4 Visual Merchandising und E-Commerce im Fachgebiet Handelsmarketing.“

**D-14 · Akzeptierte Antworten (nur optional).** Euro-Antworten Q-5.4-08, -10, -14 ohne „110,0“/„110.0“-Formen (bei Prozent und Tagen vorhanden). Für Einheitlichkeit nachziehen; nicht verpflichtend.

**D-15 · Q-5.4-01, Q-5.4-03, Fachgespräch (Hinweise im Fragetext / Doppelung).** Q-5.4-01 verrät die Antwort fast wörtlich („nicht erwartet“, „würde sich niemand beschweren“) und wiederholt das Theoriebeispiel (kostenloser Änderungsservice); Option C übernimmt die Stichworte. Besser den Stamm ohne Definitionswörter formulieren („Kundschaft lobt den Service spontan; sein Fehlen hätte vorher niemand bemerkt“ oder konkrete Stimmen). Fachgesprächsfrage 3 wiederholt das Szenario von F-WB1-06 (Regionalleitung, Zusatzprogramm, Rückgewinnung), Rückfrage 2 das von Q-5.4-11 (Telefonfälle); als Training vertretbar, aber Abwechslung wäre besser. Die letzte Erwartung der dritten Frage („Rechtliche Fragen … hier nicht behandelt“) beschreibt keine Prüflingsleistung; besser „werden gesondert geprüft (nicht Bewertungsgegenstand)“.

**D-16 · F-WB1-06, Plausibilität und Lesbarkeit.** (a) 4.000 aktive Karten × 400 € = 1,6 Mio. € bei 25.000 Kaufvorgängen der Filiale bedeutet nahezu, dass alle Kaufvorgänge Karteninhaber:innen gehören; plausibler wäre z. B. 40.000 Kaufvorgänge oder der Satz „Karteninhaber:innen sind für etwa zwei Drittel der Kaufvorgänge verantwortlich“, die Beschwerdequote ändert sich dann (250 ÷ 40.000 = 0,625 %). (b) Der Absatz ist mit Befragung, Beschwerden, Kundenwert, Planung und Rückgewinnung lang; Zwischenüberschriften in Fettschrift („Befragung:“, „Beschwerden:“ usw.) würden die Lesbarkeit stark verbessern, ohne das einzeilige Teilaufgaben-Format zu berühren. (c) „Gutscheinsatz“ (4 %) wird nicht ausgewiesen, sondern muss aus „100 Punkte = 4 €“ bei „1 Punkt je 1 €“ abgeleitet werden: gewollt, aber im Raster nicht ausdrücklich bepunktet (nur „Bindungskosten und DB danach“); Raster-Hinweis „Bonuskosten 9,60 € zählt zu diesem Punkt“ ergänzen.

## 3. Fachliche Prüfung im Einzelnen

- **Definitionen:** Kano (Basis-, Leistungs-, Begeisterungsmerkmale; dazu gleichgültige und Rückweisungsmerkmale; Dynamik), NPS (Promotor:innen 9/10, Passive 7/8, Kritiker:innen 0 bis 6, Passive nur im Nenner, −100 bis +100), Zufriedenheit als Soll-Ist-Vergleich (Erwartung gegenüber Erlebnis), Beschwerdemanagement (fünf Aufgaben, direkt/indirekt), Verbundenheit/Gebundenheit, Deckungsbeitrag je Kund:in, Lebensdauer = 1 ÷ Abwanderungsquote, vereinfachter Kundenlebenszeitwert, Break-even: **fachlich richtig** und intern einheitlich definiert; Vereinfachungen (ohne Abzinsung, gleichbleibende Quoten) ausdrücklich genannt.
- **Quizmechanik:** Multiple Choice (Q-01) und Entweder-Oder (Q-13) haben genau eine richtige Antwort; Sortieren (Q-05) genau 4 Elemente, Reihenfolge eindeutig (Anweisung nennt „Bearbeitung einer einzelnen Beschwerde“, das vierte Element betrifft die Auswertung vieler Fälle: Anweisung besser „Ablauf des Beschwerdemanagements“); Zuordnung (Q-03) vier eindeutige Paare; Mehrfachauswahl (Q-07) drei richtige, eine klar falsche; Lückentext (Q-09) nur das markierte Wort. Richtige Antwort in Q-01 (46 Zeichen, nicht die längste: B hat 47), in Q-13 (51 gegen 62) und in Q-11 (55, kürzeste) nicht die längste; in Q-07 sind die drei richtigen Optionen (92, 102, 103 Zeichen) etwas länger als die falsche (94), kein starker Hinweis. Jede Frage ohne Kontext beantwortbar.
- **Rückgewinnung, Q-16:** Definition „Kosten aller Anschreiben plus eingelöste Gutscheine geteilt durch Rückkehrende“ in der Frage; 120 Rückkehrende; 18,25 €. Eindeutig.
- **Fall (20 Punkte, Raster 4 × 4 Einzelpunkte, ganzzahlig, Folgefehler neutral):** stimmig zum Thema; Teilaufgabe 2 fordert in einem Punkt Bereich, Begründung und Maßnahme (großzügig, aber vertretbar). Fachgespräch (3 Fragen mit vier bis fünf Erwartungen und je einer Rückfrage) stimmig zu Thema und Fall.
- **„Club Plus“ mit Saldo −320 €:** trägt didaktisch. Das Ergebnis hängt an der richtigen Kette (Deckungsbeitrag nach Bindungskosten, Prozentpunkte, Bezugsgröße 4.000): Ohne Bindungskosten (160 € Deckungsbeitrag) wäre der Saldo +1.600 €, bei 163 gehaltenen Personen 24.124 € und damit gerade kostendeckend; der Break-even liegt bei 4,1 statt 4,0 Prozentpunkten Wirkung. Das macht die Annahme „Wirkung von 4 Punkten“ zum Gegenstand der Beurteilung (Mitnahmeeffekt, Pilot mit Vergleichsgruppe) und verhindert die Schwarz-Weiß-Entscheidung. Risiko: Die Musterlösung formuliert die Beurteilung nur als „zum Beispiel“; da der Saldo nur 1,3 % der Programmkosten ausmacht, sollten Bewertende ausdrücklich Ablehnung wie Pilot wie Einführung gelten lassen, wenn begründet. Empfehlung: Satz ergänzen „Jede Empfehlung (Ablehnung, Pilot, Einführung) ist vertretbar, wenn sie mit den Zahlen und der unsicheren Annahme begründet wird“ und als Erwartung den Hinweis „Break-even-Wirkung ca. 4,1 Prozentpunkte (163 ÷ 4.000)“.

## 4. Bestand und Register

- **Bestand:** Kein Widerspruch. `hb1/1.3` (Kundenperspektive der Balanced Scorecard, Weiterempfehlungsrate/NPS) wird passend verwiesen; `hb2/2.1` (Maslow, Titel „Führungsmethoden und Kommunikation“), `hb2/2.7`, `hb3/3.1` (Mystery Shopping/Testkauf), `3.2`, `3.3` (Treuepunktprogramme als Verkaufsförderung), `3.4` (Omnichannel, Customer Journey), `wb1/5.2` (Deckungsbeitrag), `5.3` (Treuerabatte, Bonus, siehe D-10), `hb4/4.3` (Retourenmanagement) existieren unter den genannten Titeln; alle Kurzverweise haben die richtigen Titel und Fachgebiete (außer D-06). Kundenzufriedenheit/Bindung werden im Bestand nur gestreift, nichts wird doppelt erklärt.
- **Teile A bis C:** Teil A (3.5) behandelt Servicepolitik, Kundenkarte als Marktdurchdringung und Zufriedenheit als Marketingziel; Teil D verweist darauf, ohne zu wiederholen. Teil C definiert Neukundengewinnungskosten (siehe D-13). Teil B nutzt Freiburg (D-04).
- **Register:** `loreno-register.md` führt Bamberg, Freiburg, Regensburg als P-V-Namen: Teil D muss auf einen unbelegten Ort wechseln (D-04). Keine Gesamtbeschäftigtenzahl, keine Personalzahlen.
- **Zahlenabgleich** (`pruefe-paket.cjs zahlen`, auch gegen Teile A bis C): keine verdächtige Doppelung eines kompletten Rechenbeispiels; die Treffer sind Allerweltswerte (1.200, 4.000, 24.000, 25.000, 0,60, 3,0, 16,00 usw.). Auffällig nur: 24.000 € (Programmkosten) und 25.000 Kaufvorgänge kommen auch in Bestandsfällen vor; unkritisch.

## 5. Textnähe und Klone

- `pruefe-paket.cjs siebenwort`: Läufe über sieben Wörter sind ausschließlich Vorlagenbausteine (Quelle-Zeile, Kurzverweise, ID-/Tag-Zeilen, Akzeptierte-Antworten-Listen) und die Teile-A-/D-Kopfzeilen; keine inhaltliche Übernahme aus Bestand, `wirtschaftsfachwirt/hsq4/4.3`, `4.5`, `industriefachwirt/hq3/7.3` oder Büro-/Fachinformatiker-Kursen. Die einzige echte Binnen-Dopplung: der Satz zum NPS steht in Theorie und Fall-Ausgangssituation fast identisch (Definition mit „Anteil der Promotor:innen (9 und 10) minus …“), was gewollt ist.
- **Strukturklone:** keine. `wirtschaftsfachwirt/hsq4/4.3` ist B2B-Vertrieb mit Key Accounts; Büro `hb2/2.5` und Immobilien `hb6/6.4` behandeln Kundenkommunikation ohne NPS, Kano, Lebenszeitwert oder Bindungsrechnung. Der Fall (Loreno Club, Club Plus, Rückgewinnung) hat in keinem Wirtschaftsfachwirt-Thema ein Gegenstück. Binnenähnlichkeit: Q-5.4-10 wiederholt die Bonusrechnung aus dem Theoriebeispiel und der Fall-Teilaufgabe 3 (gleiche Rechenstruktur, andere Zahlen); vertretbar, weil jeweils ein anderer Lernzusammenhang, aber Q-5.4-10 könnte stattdessen die Beschwerdequote oder das Zufriedenheitsindex-Rechnen prüfen (siehe D-08).

## 6. Hausregeln

- Du/Sie: Karten und Quiz duzen, Fall und Fachgespräch siezen, Theorie spricht niemanden an (zitierte Befragungsfragen mit „Sie“ sind Wortlaut einer Befragung, vertretbar). **Gendern:** Doppelpunkt durchgehend, außer D-12.
- Zahlenformat: Tausenderpunkt, Dezimalkomma, Leerzeichen vor €, %, Einheiten, Vorzeichen ohne Leerzeichen (+33 Punkte, −100): in Ordnung; Prozentwerte ohne Leerzeichen nur in den „Akzeptierten Antworten“ (erlaubt).
- Rechtliches: keine Paragrafen oder Gesetzesnamen im Inhalt (die § in `quelle` sind die Vorgabe aus dem Nachbarthema); Datenschutz, Bonusbedingungen, Gewährleistung, Widerruf, Einwilligung nur als Hinweis mit „nicht förmlich rechtsgeprüft“.
- IDs: K-5.4-01 bis -14 und Q-5.4-01 bis -16 lückenlos, im Bestand ungenutzt (`git log -S` ohne Treffer); F-WB1-06 folgt auf F-WB1-05. Frontmatter wie `wb1/5.3` (nur `thema_code`, `thema_title`, `rechtsstand` angepasst; Schlussanführungszeichen „…“ typografisch).
- Quiztypen: 8 Typen vertreten (Wahr/Falsch fehlt, siehe D-08); Rechen-Kurzantworten 9 (Pflicht 8); Karten 14, Quiz 16, Abschnitte 7, Fachgespräch 3: Mengenvorgaben erfüllt.

## 7. Zusammenfassung der Korrekturen (Reihenfolge der Wichtigkeit)

1. D-04 Filiale Freiburg in Teil D tauschen (Teil B behält Freiburg), Kopfzeile und Register anpassen.
2. D-01, D-02, D-03 Ausgangssituation F-WB1-06 ergänzen (Deckungsbeitrag der Rückkehrenden, Zeitbezug 4.000/1.200, Formel Kundenlebenszeitwert; Kurzdefinitionen Beschwerdequote und Lösungsquote).
3. D-05 „drei Quoten und drei Größen“.
4. D-06 Kurzverweise mit Titel und Fachgebiet („Thema 3.3“, „Thema 3.4“, „im selben Fachgebiet“ bei 3.1/3.4).
5. D-07 Q-5.4-11 Frage oder Option C ändern.
6. D-08 Q-5.4-06 durch Szenariofrage ersetzen (Erwartung gegenüber Erlebnis), Q-5.4-13 mit Zahlen oder Situation anreichern.
7. Niedrig: D-09 bis D-16 (Beispielwerte erklären, Bonusbegriff, CLV, Gendern, Querverweis CAC, Akzeptierte Antworten, Fragestamm Q-01, Fall-Plausibilität und Lesbarkeit, Toleranzsatz zu „Club Plus“).
