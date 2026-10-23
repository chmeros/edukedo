# Bericht G: Content-Punkte (23.10.2026)

Prüfung: `import-content.ts --dry-run` (757 Dateien, 23.602 Items, 16 geändert, 0 neu), `db:validate-content` (0 Verstöße). Spielcode wurde nicht geändert, daher keine Spiel-Tests. Nicht committet, nicht importiert.

## 1. Büro: Mustermann GmbH und Bemus AG auf Deko & Büro GmbH

**War:** Platzhalterfirmen Bemus AG (Softwareeinführung, Betriebsfeier) und Mustermann GmbH (60 Beschäftigte, "Büroorganisationsunternehmen").

**Jetzt:**
- `hb1/1.3-projektmanagement.md` Q-1.3-24 bis -27: Bemus AG durch Deko & Büro GmbH ersetzt. Rollen an die Organisation der Register angepasst (Zuordnung zu den Zonen unverändert): Vertriebsleiter / Fachbereichsleiter Vertrieb durch "Leiter des Beratungsteams", "Auszubildende im Vertrieb" durch "Auszubildende im Beratungsteam", "Kundenservice-Team" durch "Projektassistenz", "Vertriebsmitarbeitende" durch "Mitarbeitende im Beratungsteam", "Abteilungsleitung Vertrieb" durch "Teamleitung des Beratungsteams" (auch in der Erklärung von Q-1.3-25), "Vorstand" und "Projektsponsorin im Vorstand" durch Geschäftsführung (eine GmbH hat keinen Vorstand), "Mitarbeitende der Produktion" durch "Mitarbeitende im Lager".
- `hb1/fallaufgaben.md` F-HB1-01 (Z. 21): Deko & Büro GmbH; Abteilungen "Beratungsteam, Projektassistenz, Einkauf" statt Vertrieb, Kundenservice, IT (passt zu F-HB4-07, Einführung der Kundenverwaltung, Beratungsteam als Nutzer). Teilaufgaben und Musterlösung unverändert (sie sprechen nur von "den drei Abteilungen").
- `hb3/fallaufgaben.md` F-HB3-01: "Die Deko & Büro GmbH, die an einem Standort rund 80 Beschäftigte hat und (Annahme) Kaufleute für Büromanagement ausbildet" (passt zu F-HB3-06 bis -09: Standort rund 80, Ausbildung als Annahme). F-HB3-02: "In der Projektassistenz der Deko & Büro GmbH", "Abteilungsleitung" durch "Teamleitung" (Z. 21, 42 ff., drei Stellen); Teilaufgaben/Musterlösung sonst unverändert (Terminkoordination passt zur Projektassistenz). Keine Rechenwerte betroffen.
- `apps/api/src/db/export-pruefblaetter.ts` Z. 1100: Hinweistext "Betrieb der Beispiele" auf Deko & Büro GmbH geändert (kein Spielcode).

**Offen / zu melden:**
- `docs/pruefblaetter/12-buero-projektorganisation.md` (Z. 137, 141, 169, 197, 226) ist ein generiertes Blatt und nennt noch Bemus AG: bei Gelegenheit neu exportieren (Auftraggeber).
- `apps/api/src/db/content-serializer.test.ts` Z. 135, 143 nennt "Bemus AG" nur als Testzeichenfolge des Serialisierers, unabhängig vom Kurs; bewusst nicht geändert.
- `docs/entwuerfe/werkzeuge/deko-buero-register.md`, Abschnitt "Platzhalterfirmen im Bestand", nennt Mustermann/Bemus noch als offen; bei Bedarf auf "umgestellt 23.10.2026" ändern (nicht angefasst).
- Rollenbezeichnungen "Rechtsabteilung", "Außendienst-Mitarbeitende", "Einkaufsleiterin", "Leiterin Finanzen" in den Stakeholder-Fragen sind generisch geblieben und stehen nicht im Register; fachlich unkritisch.

## 2. Gesundheit/Soziales: F-HB3-03 (Rufbereitschaft statt Bereitschaftsdienst)

**War:** "Pflegefachkräfte im Bereitschaftsdienst", "Bereitschaftsteam", Musterlösung "Bereitschaftsdienstplan"; in F-HB3-04 "Bereitschaftshandys".

**Jetzt** (`hb3/fallaufgaben.md`):
- F-HB3-03 Sachverhalt: ergänzt (Annahme) Rufbereitschaft: Aufenthaltsort frei, nachts erreichbar, Fahrt nur im Notfall; "Pflegefachkräfte in der Rufbereitschaft"; Teilaufgabe 3 "Team der Rufbereitschaft"; Musterlösung Teilaufgabe 1 "Rufbereitschaftsplan erstellen" mit anzuerkennendem Hinweis, dass Rufbereitschaft arbeitszeitrechtlich kein Bereitschaftsdienst ist (konsistent zu `hb5/5.5` und F-HB5 Teilaufgabe 5, Modell 1). Punkte und Zahlen unverändert.
- F-HB3-04 Musterlösung (Teilaufgaben 2 und 4): "Bereitschaftshandys" durch "Diensthandys".

## 3. Gesundheit hb4: Abrechnung der Pflegesachleistung

`hb4/4.2-finanzierungssysteme.md`: Antwort der Karte (Z. 104) mit "bei gesetzlich Versicherten ... (bei privat Pflegepflichtversicherten tritt an die Stelle der Sachleistung eine gleich hohe Kostenerstattung)"; Q-4.2-03 Zuordnung (Z. 251) "bei gesetzlich Versicherten direkt mit der Pflegekasse abgerechnet", Erklärung ergänzt; `hb4/fachgespraech.md` Z. 72 wie Karte. Die Theorie (Z. 21, 51 ff.) war bereits richtig. Q-4.2-33 bis -35 nicht angefasst.
**Zu melden (Spielcode, nicht angefasst):** `game-kennzahlen-duell-gesundheit-sozialsystem.ts` Z. 71 und 76 sprechen von der Pflegesachleistung der *sozialen* Pflegeversicherung; Formulierung "direkt mit der Pflegekasse" kommt dort nicht ohne diese Einschränkung vor, daher fachlich in Ordnung.

## 4. Technischer Fachwirt: Not-Aus gegen Not-Halt

**Begriffsentscheidung: Not-Halt.** Begründung: In Thema 10.3 (`hq3`, Theorie, Karten, Quiz, Fachgespräch, Fallaufgabe) steht "Not-Halt" an 17 Stellen (zusätzlich "Notbefehlseinrichtung" als Verordnungsbegriff der BetrSichV; "Notausgang" ist ein anderer Begriff und blieb), in 5.3 und dessen Fachgespräch "Not-Aus" an nur 5 Stellen; das Kreuzworträtsel (`game-kreuzwortraetsel-technik.ts` Z. 208 f.: NOTHALT, "Not-Halt-Einrichtung") nutzt bereits Not-Halt. "Not-Halt" ist zudem der Begriff der Maschinenrichtlinie/Maschinenverordnung und der ISO 13850.
**Jetzt:** `tq1/5.3-elektrotechnische-grundlagen.md` Z. 37 (Theorie mit Hinweis "umgangssprachlich auch Not-Aus, im Kurs gilt Not-Halt"), Q-5.3-08 (Option und Erklärung), Q-5.3-13 (Zuordnung); `tq1/fachgespraech.md` Z. 96. Weil Not-Halt nicht zwingend Trennen von der Energiezufuhr heißt, wurde die Funktion als "setzt die Anlage im Gefahrfall sofort still (je nach Ausführung wird die Energiezufuhr getrennt)" formuliert.
**Spielcode nicht angepasst, bitte nachziehen:** `apps/api/src/db/content/game-kennzahlen-duell-technische-unterscheidungen.ts` Z. 283 (Antwort A "Der Not-Aus-Schalter"), Z. 287 und 289 (Feedbacks: "Der Not-Aus-Schalter trennt ... von der Energiezufuhr"). Vorschlag: "Der Not-Halt-Schalter" und "Der Not-Halt-Schalter setzt eine Anlage im Gefahrfall sofort still". Das Kreuzworträtsel braucht keine Änderung.
