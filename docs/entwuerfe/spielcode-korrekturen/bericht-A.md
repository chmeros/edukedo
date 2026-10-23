# Bericht Agent A (Gesundheit), Auftrag P-BA, 23.10.2026

Nicht committet, nicht geseedet, nichts freigeschaltet. Geprüft gegen `content/fachwirt-gesundheit-soziales/hb4/4.2-finanzierungssysteme.md` (Abschnitte zur sozialen und privaten Pflegeversicherung, Q-4.2-13 bis 16) und `hb5/5.5-arbeitsrecht.md` (Probezeit, Kündigungsschutz, Betriebsrat).

## Duell `apps/api/src/db/content/game-kennzahlen-duell-gesundheit-sozialsystem.ts`

- **Frage 2** (Pflegegrade): Frage sprach von „soziale Pflegeversicherung“ und ließ privat Pflegeversicherte aus. Jetzt: Frage „…ist … zuständig?“, Antwort B „Die Pflegeversicherung (SGB XI)“; Rückmeldungen nennen soziale Pflegeversicherung (gesetzlich Versicherte) und private Pflegepflichtversicherung mit gleichwertigen Leistungen (privat Krankenversicherte).
- **Frage 3** („direkt mit der Pflegekasse abgerechnet“): Frage jetzt „Leistung der sozialen Pflegeversicherung … zugelassener Pflegedienste“; beide Rückmeldungen ergänzt: Bei privat Versicherten tritt an die Stelle der Sachleistung eine gleich hohe Kostenerstattung.
- **Frage 16** (Probezeit „höchstens zwölf/sechs Monate“): Der Kurstext sagt nicht, dass die Probezeit selbst auf sechs Monate begrenzt ist, sondern dass die verkürzte Kündigungsfrist längstens für die ersten sechs Monate gilt. Frage jetzt: „Für welchen Zeitraum der vereinbarten Probezeit gilt die verkürzte gesetzliche Kündigungsfrist längstens?“; Rückmeldungen mit „längstens“ und Hinweis auf Tarifvertrag.
- **Frage 17** (Kündigungsfrist Probezeit, Distraktor „Vier Wochen“ ohne Erklärung): Frage „in einer vereinbarten Probezeit“; feedbackFalsch erklärt jetzt „Vier Wochen“ als gesetzliche Grundfrist außerhalb der Probezeit (z. B. Kündigung durch Beschäftigte nach der Probezeit), feedbackRichtig nennt die Abgrenzung ebenfalls.
- **Frage 18** (Kündigungsschutz): Antwort B jetzt „im selben Betrieb oder Unternehmen“ (wie Kurstext); Rückmeldungen ergänzt um „in Betrieben mit in der Regel mehr als zehn Arbeitnehmenden“. Antwort A leicht verlängert („…, sobald der Arbeitsvertrag geschlossen ist“), damit B nicht auffällig die längste ist.
- **Frage 20** (Mitarbeitervertretung): Der Kurstext sagt: Betriebsrat ist vor jeder Kündigung zu hören (auch in der Probezeit), für Personalräte und kirchliche Mitarbeitervertretungen gelten eigene Regeln. Frage jetzt „…in einem privatwirtschaftlichen Betrieb ein Betriebsrat besteht?“, Antworten auf „Er“ umgestellt (A leicht angeglichen), Rückmeldungen mit Hinweis auf Personalräte/kirchliche Mitarbeitervertretungen.
- **Runde 4, Abschlussmeldung** (war Zeile „Anhörung der Mitarbeitervertretung“): jetzt „Anhörung des Betriebsrats vor der Kündigung“.
- **Frage 1, 4, 5, Kopfkommentar**: kein Widerspruch (Frage 1 deckt sich mit dem Kurstext „Krankenversicherung“, Frage 4 betrifft nur die Sozialhilfe, Frage 5 nennt die PKV korrekt als häufig kostenerstattend). Unverändert.
- Test: `cd apps/api && npx pnpm test -- game-kennzahlen-duell-gesundheit-sozialsystem` – 12 von 12 grün (keine Ziffern, keine Paragrafen, „siehe Thema x.y“ in jeder Rückmeldung eingehalten).

## Instrument „Kostenträger“ (`packages/shared/src/quiz-logic.ts`, `apps/web/src/Instrumente.tsx`, `InstrumentIllustrations.tsx`, `content-parser.test.ts`)

- **Q-4.2-13, -15, -16 neu gelesen:** Kein Widerspruch zum jetzigen Kurstext. Die Zuordnungen (Pflegesachleistung, Pflegegrade, Teilleistungsprinzip → SGB XI; Rechnung einreichen/zunächst selbst zahlen → PKV; Hilfe zur Pflege → Sozialhilfe) bleiben richtig. Zwei Randpunkte der Inhaltsseite, bewusst nicht im Spielcode änderbar (Content, nicht meine Dateien): (a) „Fünf Pflegegrade, in der Regel vom Medizinischen Dienst begutachtet“ (Q-4.2-13) und „Leistungen richten sich nach der Selbstständigkeit in mehreren Lebensbereichen“ (Q-4.2-16) gelten wegen gleicher Maßstäbe auch in der privaten Pflegepflichtversicherung; als Zuordnung zur Zone „Soziale Pflegeversicherung“ aber vertretbar; (b) die Zone „Private Krankenversicherung“ trägt die private Pflegepflichtversicherung nicht im Namen.
- **Zonen Eingliederungshilfe und Jugendamt (Thema 1.5) – nicht umgesetzt, größer als eine Textkorrektur.** Vorschlag: Zonen `eingliederungshilfe` („Eingliederungshilfe (SGB IX)“) und `jugendhilfe` („Kinder- und Jugendhilfe (SGB VIII)“) in `quiz-logic.ts` (Zonenliste `kostentraeger`), Kachel-Layout in `KostentraegerIllustration` auf sechs Kacheln anpassen, Parser-Test in `content-parser.test.ts` (Zonenliste mit sechs Schlüsseln), Beschreibung in `Instrumente.tsx`, zusätzliche Q-Items im Content (Thema 1.5/4.2, je Zone zwei bis drei Merkmale, Hinweis auf „Eingliederungshilfe ist gegenüber der Pflegeversicherung nicht nachrangig“) sowie Beschreibung/Zonenzählung in `export-pruefblaetter.ts` (nur Agent B darf die Datei ändern) und Prüfblatt-Neuexport. Aufwand: etwa ein halber bis ganzer Tag inkl. Inhalte und Review; Reihenfolge: erst Content, dann Zonen. Das Instrument bleibt wie bisher nicht freigeschaltet (`kurs-angebot.ts` unverändert).
- **Hinweis für `export-pruefblaetter.ts` (Agent B):** Die Hinweiszeilen zu `kostentraeger` (ca. Z. 1046 bis 1050) und die Duell-Beschreibung in `gesNachspann` (ca. Z. 1060) beschreiben das Duell mit „Rechtsstand dort 29.09.2026“ und erwähnen weder privat Pflegeversicherte noch Betriebsrat statt Mitarbeitervertretung; Prüfblatt 11 wird beim Neuexport automatisch aus den Duelldaten befüllt, die Beschreibungszeilen könnten um „Frage 2/3 jetzt mit privater Pflegepflichtversicherung; Frage 20 Betriebsrat“ ergänzt werden.

## Memory und Kreuzworträtsel Gesundheit (nur gelesen)

`game-memory-gesundheit-soziales.ts` (Sachleistungsprinzip, Paar 34) und `game-kreuzwortraetsel-gesundheit-soziales.ts` (KASSE, Nr. 24: „Kranken- und Pflegekassen sind zentrale Kostenträger“): keine Widersprüche zum Content, wie im Protokoll vermerkt. Unverändert.

## Geänderte Dateien

- `apps/api/src/db/content/game-kennzahlen-duell-gesundheit-sozialsystem.ts` (nur diese Datei)
- `docs/entwuerfe/spielcode-korrekturen/bericht-A.md`

Hinweis: Prüfblatt 11 (`docs/pruefblaetter/11-gesundheit-soziales.md`) enthält die geänderten Duell-Fragen und muss vom Auftraggeber neu exportiert werden. Falls ein Seed der Duell-Daten erfolgt (`db:seed-games`), erst danach; das Duell-Set bleibt wie bisher gesperrt.
