# Bericht H (23.10.2026): drei kleine Content-Aufgaben

## 1. Register Deko & Büro

`docs/entwuerfe/werkzeuge/deko-buero-register.md`: Abschnitt „Platzhalterfirmen“ umgeschrieben auf „erledigt am 23.10.2026“ (Mustermann GmbH und Bemus AG durch Deko & Büro GmbH ersetzt; betroffene Stellen `hb1/1.3` Q-1.3-24 bis -27, `hb1/fallaufgaben.md` F-HB1-01, `hb3/fallaufgaben.md` F-HB3-01 und -02; Verweis auf bericht-G.md). In der Zeile „Rechtsform“ den Verweis auf die Mustermann GmbH entfernt.

## 2. Immobilien: Nachweismakler:in / Vermittlungsmakler:in

Gefunden nur in zwei Dateien (Memory-Spiel und Kreuzworträtsel enthalten die Begriffe nicht; im Kreuzworträtsel steht nur „Makler“ in einem Bestätigungs- und einem Tipptext, unverändert):

- `content/immobilienfachwirt/hb6/6.1-maklerrecht-maklertaetigkeit.md`: Überschrift („Nachweis- und Vermittlungsmakler:innen“), Theorieabsatz (Zeile 25, zusätzlich „einer Verkaufsinteressent:in“ wie im Duell), K-6.1-05 (Frage und Antwort), Zuordnung Q-6.1-02 (beide Begriffe links).
- `content/immobilienfachwirt/hb6/fachgespraech.md`: Frage und drei Erwartungen (gleiche Schreibweise, „Verkaufsinteressent:in“).
- Quizantworten mit `Akzeptierte Antworten` gibt es zu den Begriffen nicht; nichts zu ergänzen.
- Kein Kreuzworträtsel-Lösungswort betroffen.

Folge für den Import (Trockenlauf): 1 neu, 4 geändert, 1 deaktiviert (die Zuordnung Q-6.1-02 hat neue Begriffsschlüssel). Nicht importiert.

## 3. Gesundheit: Theorie 4.2

`content/fachwirt-gesundheit-soziales/hb4/4.2-finanzierungssysteme.md`: neuer Abschnitt „Weitere Leistungssysteme: Eingliederungshilfe und Kinder- und Jugendhilfe“ nach „Sozialhilfe als nachrangiges Sicherungssystem“ (110 Wörter, Stand-Hinweis „Stand Oktober 2026, vor Verwendung prüfen“, keine Beträge/Fristen). Inhalt: Eingliederungshilfe (SGB IX), Kinder- und Jugendhilfe (SGB VIII) neben GKV (Krankenbehandlung und Krankengeld), Pflegeversicherung, Sozialhilfe, PKV; Träger nach Landesrecht (Jugendamt); Abgrenzung zur Pflegeversicherung (Teilhabe statt Pflegebedürftigkeit, Eingliederungshilfe gegenüber der Pflegeversicherung nicht nachrangig, Aufteilung durch Vereinbarung der Träger) nach Thema 1.5 (§ 91 Abs. 3 SGB IX, § 13 SGB XI dort belegt); Verweis auf Thema 1.5 im Fachgebiet HB1. Krankengeld ist in 1.5 nicht belegt, wird aber nur als GKV-Leistung genannt (so schon in Q-4.2-16).

## Prüfung

- `import-content.ts --dry-run`: 757 Dateien, 23605 Items, 1 neu / 4 geändert / 1 deaktiviert.
- `db:validate-content`: 0 Verstöße.
- `tsc --noEmit`: ohne Fehler.
- `pnpm test -- game-`: 31 Dateien, 270 Tests grün; `pnpm test -- immobilien`: 15 Tests grün.
- Nicht committet, nicht importiert/geseedet, `kurs-angebot.ts` unverändert.
