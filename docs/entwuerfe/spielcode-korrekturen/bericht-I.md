# Bericht I: Prüfungsablauf „Gelassen bleiben“ für zehn Kurse (23.10.2026)

Stand: Oktober 2026, rechtsnah, **vor Verwendung prüfen** (fachliche Durchsicht durch den Auftraggeber). Nicht committet, nicht importiert.

## Was geändert wurde

- `apps/api/src/db/import-content.ts`: neue Konstante `PRUEFUNGSABLAUF` (Stichpunkte je Kurs-Slug) plus drei Bausteine (`PRUEFUNGSABLAUF_HILFSMITTEL`, `_WIEDERHOLUNG`, `_TEIL1_WIRTSCHAFT`) vor `KURS_META`; eine Schleife nach der `PRAESENTATION_MINUTEN`-Schleife setzt `metadata.pruefungsablauf` je Kurs (gleicher Mechanismus wie bei `presentationMinutes`, deshalb bleiben die `KURS_META`-Einträge und `kurs-angebot.ts` unverändert). Die Stichpunkte stehen **nicht** in `apps/web` oder `packages/shared`; die Seite liest sie über `exam.guide` aus `kurs.metadata.pruefungsablauf` (`kursPruefungsablauf()` in `apps/api/src/pruefungsbereiche.ts`).
- Wirksam wird die Änderung erst nach `apply-kurs-metadata` bzw. dem Import (schreibt `KURS_META` in die DB). Das habe ich nicht ausgeführt.
- Format wie bei den Fachinformatiker-Kursen: Du-Ansprache, Doppelpunkt-Gendern (kein Personenbezug nötig), Zahlen mit Leerzeichen („50 %“, „10 Minuten“). Länge je Stichpunkt 250 bis 380 Zeichen (FI: rund 250), 5 bis 7 Stichpunkte statt 5; mehrteilige Prüfungen (Wirtschafts-, Industrie-, Technischer Fachwirt, Handelsfachwirt, Versicherungen) brauchen den siebten Punkt für Wiederholung.
- Jeder Kurs endet mit dem Stand-Hinweis „Stand Oktober 2026, ohne Gewähr: Verbindlich sind die Prüfungsverordnung und die Einladung deiner IHK“ (im letzten Stichpunkt zusammen mit den Hilfsmitteln). Der Wortlaut „vor Verwendung prüfen“ steht im Code-Kommentar und hier, nicht in der Lernenden-Anzeige.

## Tests

`npx tsc --noEmit` in `apps/api`, `apps/web`, `packages/shared`: ohne Fehler. Tests mit `KURS_META` gibt es nicht (`grep -rn KURS_META apps packages --include=*.test.*`: keine Treffer); der Integrationstest `exam-pruefungsbereiche.integration.test.ts` prüft nur den Durchlauf von `pruefungsablauf` und braucht Docker (nicht gelaufen). Kontrolle per Skript: alle zehn Kurse liefern 5 bis 7 Stichpunkte, die Fachinformatiker-Kurse unverändert 5, Mathematik 9 keine (Schulkurs, eigener Text). Dev-Server/Seite nicht geprüft.

## Quellen je Kurs

Alle Verordnungstexte live von gesetze-im-internet.de am 23.10.2026 abgerufen (per WebFetch, also Zusammenfassung des Seitentextes, nicht Zeile für Zeile gegengelesen), dazu `docs/kursprofile/*.md` (Prüfungsrahmen) und `docs/Anforderungskatalog.md`. Hilfsmittel: Suchtreffer zu den DIHK-/IHK-Hilfsmittellisten (je Fachwirt eine eigene Liste, Taschenrechner nicht netzwerkfähig, Gesetzestexte unkommentiert, Stand-Regeln je Prüfungstermin); Verordnungen selbst nennen keine Hilfsmittel.

| Kurs | Verordnung (abgerufen) | Gilt als vermutet / je Kammer markiert |
|---|---|---|
| Büro- und Projektorganisation | FachkBüroPrV 2012 §§ 3, 4, 7, 9 | „in der Regel auf zwei Tage verteilt“ (nur IHK-Praxis, nicht Verordnung); Fachgespräch „in der Regel etwa 40 Minuten“ (Abruf der Verordnungsseite, vom Kursprofil selbst als gegenzulesen markiert); der IHK-Hinweis „120 Minuten schriftlich“ ist als veraltet verworfen |
| Gesundheits- und Sozialwesen | GesWFachwPrV § 3 (Volltext), § 9; Bestehen (50 Punkte) aus dem Kursprofil, § 7 nicht gelesen | Tagesaufteilung der Kammer; Neuordnung zum Bachelor Professional nicht geprüft/gefunden |
| Wirtschaftsfachwirt | WFachwPrV §§ 2 bis 10 | Aufteilung der 330 Minuten auf die Bereiche (IHK-Angaben teils 75 statt 60 Minuten) bewusst nur als „je nach Kammer“; Ergänzungsprüfung nur als „unter Umständen kurz“ |
| Handelsfachwirt | HdlFachwPrV § 3 (Volltext), § 7, § 9 | Im Verordnungstext ist keine Zulassungsbedingung für die mündliche Prüfung genannt (IHK Nord Westfalen widerspricht dem Kursprofil): im Text nur „folgt nach den schriftlichen, innerhalb eines Jahres“; Aufteilung auf Tage Kammer |
| Technischer Fachwirt | TechFachwPrV §§ 2 bis 12 (§ 3 Volltext) | Aufteilung der 30 Minuten auf Präsentation/Fachgespräch (Kursprofil: „je IHK, z. B. 15 + 15“) als „je nach Kammer“; ob eine Neuordnung zum Bachelor Professional besteht: nicht geprüft. **Hinweis:** `presentationMinutes` steht für diesen Kurs noch auf dem Standard 10 und passt vermutlich nicht |
| Industriefachwirt | IndFachwirtPrV 2010 §§ 2 bis 11 | Vorbereitungszeit (Kursprofil: je IHK unterschiedlich) nur als „legt die Kammer fest“; Aufteilung der 330 Minuten wie Wirtschaftsfachwirt |
| Immobilienfachwirt | ImmoFachwPrV § 3, §§ 6 bis 10 | Einreichungszeitpunkt des Themas „in der Regel mit der ersten schriftlichen Leistung, je nach Kammer“ (Verordnung nennt ihn laut Abruf, Kursprofil sagt je IHK verschieden); Tagesaufteilung Kammer; „Bachelor Professional“-Neuordnung nicht belegt |
| Versicherungen und Finanzanlagen | BAProVFFPrV §§ 3 bis 19 | Reihenfolge/Termine der Teile als „Kammer“ (Verordnung regelt laut Abruf keine feste Reihenfolge); **Widerspruch zum Verordnungsdatum** (26.11.2024 / 01.01.2025 vs. 03.12.2024) bleibt offen, betrifft den Text nicht. Die Dreijahresfrist (§ 10 Abs. 3) steht nicht im Text |
| Transport/Logistik | GüLogFachwBAProFV §§ 3, 7 bis 11, 14 | Zweijahresfrist für das Verfahren aus § 7 (Abruf); Verordnungsdatum 21.09.2023 weiterhin nicht verifiziert (betrifft den Text nicht) |
| AEVO | AusbEignV § 4 (Volltext) | Reihenfolge der Teile nicht geregelt: „Kammer“; Hilfsmittel für AEVO nicht belegt (kein „in der Regel“-Zusatz zu Taschenrechner/Gesetzen); Möglichkeit „praktische Durchführung statt Präsentation“ aus der Verordnung, Umsetzung je Kammer |

## Bewusst weggelassen

Zulassungsvoraussetzungen (Berufspraxis etc.), Fristen zwischen den Prüfungsteilen (Fünfjahresfrist), Prüfungsgebühren, Anmeldeschluss, Prüfungstermine, Befreiungen nach § 56 BBiG, Ausbildereignung als Zusatzprüfung, Zeugnisse: entweder kammerabhängig oder für die Seite „Gelassen bleiben“ zu detailliert.

## Offen für die Gegenprüfung

1. Büro: Fachgespräch „etwa 40 Minuten“ im Verordnungstext im Wortlaut gegenlesen.
2. Gesundheit: § 7 (Bestehen) im Volltext lesen; Zulassung zur mündlichen Prüfung (Abs. 8) wurde nur aus der Zusammenfassung übernommen.
3. Handelsfachwirt: Klären, ob die mündliche Prüfung ein Bestehen der schriftlichen voraussetzt (Verordnung § 3 sagt nichts; im Text daher keine Bedingung).
4. Technischer Fachwirt: `presentationMinutes` (derzeit 10) mit der Kammer-Aufteilung abgleichen.
5. Hilfsmittel: Formulierung „in der Regel ein nicht netzwerkfähiger Taschenrechner und unkommentierte Gesetzestexte“ aus Suchtreffern der DIHK-Listen; vor Livegang gegen eine aktuelle Liste prüfen.
6. Die Seite zeigt weiterhin darunter „Alle Angaben ohne Gewähr — verbindlich sind Prüfungsordnung und Einladung deiner IHK“ (`Pruefungsangst.tsx`); der Stand-Hinweis im Stichpunkt ist dadurch teils doppelt, bewusst belassen.
7. Entwicklungsplan Iteration 23 („Prüfungsablauf je Fachwirt-Kurs (R4)“) und Architekturplanung § 13 sind nicht abgehakt/ergänzt (Auftrag: nicht committen, Protokoll beim Auftraggeber).

## Geänderte Dateien

- `apps/api/src/db/import-content.ts`
- `docs/entwuerfe/spielcode-korrekturen/bericht-I.md` (neu)
