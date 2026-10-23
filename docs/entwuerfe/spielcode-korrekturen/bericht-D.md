# Bericht Agent D (Büro, Technischer Fachwirt, Industrie, Wirtschaft) – P-BA

Stand 23.10.2026, abgeschlossen. Nichts committet, nichts geseedet, nichts freigeschaltet, keine Sperren geändert. Alle Fundstellen gegen den jetzt eingespielten Content gelesen (Zeilennummern der Protokolle waren veraltet, Text im Code gesucht).

Tests gezielt gelaufen (`npx pnpm test -- game-beleg game-kennzahlen-duell-technische game-kennzahlen-duell-kosten game-kennzahlen-duell-finanzierung game-pool-wirtschaft game-pool-technik`): 6 Dateien, 47 Tests grün.

## Fundstellen

### 1. `game-belegdetektiv-einkauf.ts` (Büro, Handel, Industrie, Technischer Fachwirt, Wirtschaft)
- **War:** Kopfkommentar „Bewusst ohne Rechtsfragen (Mängelrüge, Fristen, Umsatzsteuersätze)“, nach P-AX überholt (`fachwirt-buero-projektorganisation/hb4/4.2-einkauf-beschaffung.md` behandelt Untersuchungs- und Rügepflicht, Mängelrechte, Verjährung). Auflösung Beleg 5 „beim Lieferanten reklamiert“, Beleg 6 „sonst wird die Lieferung reklamiert“.
- **Jetzt:** Kommentar sagt, dass die Fälle Belege prüfen (Menge, Preis, Artikel, Summe, Skonto), nicht die Rechtslage; Untersuchungs- und Rügepflicht, Mängelrechte und Fristen sind kein Prüfgegenstand, die Auflösungen sagen nur „unverzüglich anzeigen“; keine Umsatzsteuersätze, Verzugsregeln, Paragrafen. Beleg 5: „dem Lieferunternehmen unverzüglich angezeigt (Mängelrüge)“, dazu der Satz, dass der Schaden schon bei der Annahme vermerkt werden sollte (deckt sich mit dem Abschnitt „Wareneingangsprüfung“ in 4.2). Beleg 6: „sonst wird die Abweichung dem Lieferunternehmen unverzüglich angezeigt“.
- **Geprüft ohne Änderung:** Beleg 1 (Fehlmenge: Rechnung korrigieren oder nachliefern), Beleg 2 (Preisabweichung), Beleg 4 (Skontofrist: Frist ab Rechnungsdatum, 03.10. + 10 Tage = 13.10., deckt sich mit dem Skonto-Abschnitt in 4.2), Beleg 7 und 8. Kein Widerspruch.
- Die Fälle liegen im Kursinhalt der fünf Kurse; die Rügeaussage ist aus Sicht der Kurse Handel/Industrie/Wirtschaft/TF kein Widerspruch (allgemeine Praxisaussage). Die Rüge gilt nur zwischen Kaufleuten; die Auflösung behauptet das nicht absolut, sie sagt nur „unverzüglich anzeigen“.

### 2. `game-kennzahlen-duell-technische-unterscheidungen.ts` (Technischer Fachwirt)
Gegen `technischer-fachwirt/tq3/7.2`, `hq3/10.3`, `tq1/5.3` gelesen.
- **Frage 12 und 13 / Runde-3-Abschlussmeldung (Instandhaltungsstrategien, FL-TF-22):** Die Theorie benennt jetzt die Kursfassung (vorbeugend = feste Intervalle) und ordnet die Norm ab (vorbeugend = Oberbegriff, intervallbasiert = „vorausbestimmt“, zustandsorientiert = Unterart, „vorausschauend“ = Unterart der zustandsorientierten, kein Synonym). Geändert:
  - Antwort „Vorbeugende Instandhaltung“ (Fr. 12 A) und „Vorbeugende Instandhaltung in festen Intervallen“ (Fr. 13 B) heißen jetzt „Intervallbasierte vorbeugende Instandhaltung“ (Begriff der Kursfassung, eindeutig; richtige Antworten bleiben die jeweils kürzere, nicht die längste).
  - Fr. 12 feedbackFalsch: „im Sinne dieses Kurses“.
  - Fr. 13 feedbackRichtig: „(vorausschauende)“ gestrichen (wäre jetzt ein falsches Synonym); feedbackFalsch weist auf den Normgebrauch hin („in der Norm heißt sie vorausbestimmt, ‚vorbeugend‘ ist dort der Oberbegriff“), ohne Normnummer (Test erlaubt nur „DIN 31051“).
  - Runde-3-Abschlussmeldung: „intervallbasierte vorbeugende“.
  - Kopfkommentar um die Begriffseinordnung ergänzt.
- **Frage 17 (Betriebsarzt/Fachkraft für Arbeitssicherheit):** Theorie 10.3 sagt „insbesondere arbeitsmedizinische Vorsorgeuntersuchungen“ (Betriebsärzt:in) und „Fachkraft berät den Arbeitgeber“. Kein Widerspruch (Frage nutzt bereits „insbesondere“). feedbackFalsch vorsichtiger gefasst: „führt insbesondere … durch; beide Funktionen beraten, die Verantwortung bleibt beim Arbeitgeber“ (wie die Theorie). Offene Fachfrage aus Prüfblatt 14 (Überschneidungen in der Praxis) bleibt eine Fachfrage.
- **Frage 20 (FI-Schutzschalter/Not-Aus):** deckt sich mit `tq1/5.3` (FI schaltet bei gefährlichem Fehlerstrom automatisch ab; Not-Aus trennt im Gefahrfall sofort von der Energiezufuhr). Nicht geändert. Hinweis: `hq3/10.3` und das Technik-Kreuzworträtsel sagen „Not-Halt“ (BetrSichV), `5.3` „Not-Aus“; das ist ein Begriffsunterschied im Content, kein Spielwiderspruch.
- **Frage 16 (TOP):** Theorie hat TOP als Kursfassung und STOP als Erweiterung (Substitution); die Frage vergleicht nur technische Schutzabdeckung mit Gehörschutz. Kein Widerspruch, nicht geändert.
- Memory/Kreuzworträtsel Technik (`game-memory-technik.ts`, `game-kreuzwortraetsel-technik.ts`) auf Instandhaltung, Strategien, DIN-Nummern, Cobot, Werkvertrag, Rückstellung, GbR, Arbeitsrecht, Verzug, IATF gesucht: keine Widersprüche. „Autonome Instandhaltung/TPM“, „FMEA setzt vorbeugend an“ (Z. 262, anderes Thema), „Lieferverzug“ als Pufferbegriff (Z. 224), „Not-Halt“ (Z. 209) und PSA zuletzt passen zum Content. Nicht geändert.

### 3. `game-kennzahlen-duell-kosten-leistungen.ts` (Industriefachwirt)
- **Frage 20 (Prüfblatt 13: absolut formulierte falsche Antwort):** Antwort A „… ist **immer** ein Ablehnungsgrund …“ zu „… ist ein Ablehnungsgrund, auch bei positivem Deckungsbeitrag“ (das „immer“ verriet die falsche Antwort). feedbackRichtig/feedbackFalsch um „kurzfristig sinnvoll; langfristig müssen die Preise alle Kosten (und einen Gewinn) decken“ ergänzt, wie `wq2/2.2` (Rechenbeispiel Zusatzauftrag, kurzfristige Preisuntergrenze) und `wq2/2.6`.
- **Frage 7 (Hallenmiete, „nur im Quiz belegt“):** Theorie nennt Werksmieten als fixe Kosten und Hallenenergie als Gemeinkosten; kein Widerspruch, keine Änderung (Fachfrage).
- **Frage 13 (Selbstkosten, zwei Formulierungen im Kurs):** Frage nennt Einzelkosten plus anteilige Material-, Fertigungs-, Verwaltungs- und Vertriebsgemeinkosten, passt zu `2.2` und zu `2.6` (Selbstkosten je Stück bei der Divisionskalkulation). Nicht geändert.
- Fragen 1 bis 12, 14 bis 19 gegen `wq2/2.2` gelesen: kein Widerspruch.

### 4. `game-kennzahlen-duell-finanzierung-controlling.ts` (Wirtschaftsfachwirt)
Alle 20 Fragen gegen `wirtschaftsfachwirt/hsq2/2.1` bis `2.4` gelesen (auch die später ergänzten Teile aus P-Q: Finanzierung beurteilen, Prozesskosten, Target Costing). Kein Widerspruch: Eigenkapital (zeitlich unbegrenzt, nicht planmäßig zurückgezahlt), Innenfinanzierung, Leasing, statische/dynamische Verfahren, Amortisation als statisches Verfahren, interner Zinsfuß, Preisuntergrenzen, Sicherheitsabstand, Kalkulationsverfahren (Vorwärts-/Rückwärts-, Divisions-, Äquivalenzziffern), operatives/strategisches Controlling, BSC, DuPont, Abweichungsanalyse. **Nicht geändert.**

### 5. `game-kennzahlen-duell-buero-kennzahlen.ts` (Büro)
Gegen `hb4/4.1` und `4.2` gelesen. Frage 19 (Vertragserfüllung: Lieferfristen, Zahlungsfluss, Qualität) deckt sich mit Abschnitt „Vertragserfüllung kontrollieren“, der durch P-AX nur ergänzt (nicht geändert) wurde; die Kennzahlenarten (Frage 6 bis 10) stimmen mit 4.1 überein. Nur der Kopfkommentar („Rechtsstand dort: 15.09.2026“) um den Hinweis auf die P-AX-Ergänzung von 4.2 erweitert. Keine Änderung an Fragen.

### 6. Memory/Kreuzworträtsel Wirtschaft und Industrie
- `game-kreuzwortraetsel-wirtschaft.ts` Nr. 12 VERZUG: Bestätigung ergänzt („setzt in der Regel eine Mahnung (oder einen festen Kalendertermin) voraus und tritt nicht ein, wenn die Verspätung nicht zu vertreten ist“), weil `wbq3/3.3` nach P-AB Mahnung, Entbehrlichkeit bei Kalendertermin und Vertretenmüssen ausdrücklich nennt; Hinweis und Tipp blieben (sie sagen „in der Regel trotz Mahnung“).
- Geprüft ohne Änderung: `game-memory-wirtschaft.ts` (Komplementär/Kommanditist Z. 96 f., Handelsregister, Handlungsvollmacht, Nacherfüllung als vorrangiges Recht), `game-kreuzwortraetsel-wirtschaft.ts` (Firma, Prokura „umfassendste Vertretungsmacht“, Betriebsrat), `game-kreuzwortraetsel-industrie.ts` (ZOLL, AKKREDITIV, LEASING, STELLE), `game-memory-industrie.ts`. Alle gegen die Themendateien gelesen; keine Widersprüche zu P-AB, P-AC, P-AD bis P-AG.
- Industrie: Die Protokolle der Industrie-Pakete (P-AD bis P-AG, P-K bis P-M) nennen keine Spielcode-Fundstelle; Suche nach Selbstkosten, Angebotspreis, Preisuntergrenze, Incoterms, Entsorgung, Ausbildung, Lohnsteuer in den Industrie-Spielen: keine Treffer, die den neuen Inhalten widersprechen.

## Nicht umgesetzt / Hinweise an den Auftraggeber (fremde Dateien, nicht geändert)

- `packages/shared/src/kurs-angebot.ts` Z. 271: Kommentar zum Beleg-Detektiv sagt „frei erfundene Fälle ohne Rechtsaussagen“. Nach dem Kopfkommentar-Update stimmt das für die Fälle weiter; bei Gelegenheit „ohne Rechtsfragen als Prüfgegenstand“ lesen. Kein Handlungsbedarf, rein sprachlich.
- `apps/api/src/db/export-pruefblaetter.ts` Z. 1613 ff. (Blatt 22 Beleg-/Betrugs-Detektiv, nur Agent B darf die Datei ändern): Prüffrage (1) lautet „Ist die Abweichung im Beleg im Einkauf üblicherweise ein Beanstandungsgrund?“. Beim Neuexport erscheinen die geänderten Auflösungen (Beleg 5 und 6, „Mängelrüge“, „unverzüglich“) automatisch. Optional im Intro einen Satz „Die Auflösungen verweisen auf die unverzügliche Anzeige von Abweichungen (Thema 4.2 Büro); die Rechtslage selbst ist nicht Prüfgegenstand“ ergänzen. Aufwand: eine Textzeile.
- Prüfblätter 12, 13, 14, 15, 20, 22 sind nach den Änderungen neu zu exportieren (Duell Technischer Fachwirt Fr. 12, 13, 17; Duell Industrie Fr. 20; Kreuzworträtsel Wirtschaft Nr. 12; Beleg-Detektiv Belege 5 und 6). Nicht von Hand geändert.
- `seed-games` ist nötig, damit die geänderten Texte in die Datenbank kommen (nicht ausgeführt, wie beauftragt). Betroffene Sets: Beleg-Detektiv `belege` (alle fünf Kurse), Duell `technische-unterscheidungen`, Duell `kosten-leistungen`, Kreuzworträtsel Wirtschaft. Die Duell- und Kreuzworträtsel-Sets sind Kursfreigaben unverändert.
- Begriffsunterschied im Content (kein Spielfehler): „Not-Aus“ in `tq1/5.3` gegenüber „Not-Halt“ in `hq3/10.3`.
- Jugendarbeitsschutz/Minderjährige: nicht berührt.

## Geänderte Dateien

- `apps/api/src/db/content/game-belegdetektiv-einkauf.ts` (Kopfkommentar, Auflösungen Beleg 5 und 6)
- `apps/api/src/db/content/game-kennzahlen-duell-technische-unterscheidungen.ts` (Fr. 12, 13, 17, Runde-3-Abschlussmeldung, Kopfkommentar)
- `apps/api/src/db/content/game-kennzahlen-duell-kosten-leistungen.ts` (Fr. 20)
- `apps/api/src/db/content/game-kennzahlen-duell-buero-kennzahlen.ts` (nur Kopfkommentar)
- `apps/api/src/db/content/game-kreuzwortraetsel-wirtschaft.ts` (Nr. 12 Bestätigung)
- `docs/entwuerfe/spielcode-korrekturen/bericht-D.md` (dieser Bericht)

Unverändert nach Prüfung: `game-kennzahlen-duell-finanzierung-controlling.ts`, `game-memory-technik.ts`, `game-memory-industrie.ts`, `game-memory-wirtschaft.ts`, `game-kreuzwortraetsel-technik.ts`, `game-kreuzwortraetsel-industrie.ts`.
