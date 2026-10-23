# Bericht E: Arbeitszeit-Prüfer, Begriffe-Duell Jugendarbeitsschutz, Memory-Paar JAV

Stand 23.10.2026. Gesetzestext gelesen am 23.10.2026 auf gesetze-im-internet.de (§§ 4, 8, 9, 11, 12, 13, 14, 15 JArbSchG; §§ 3, 4, 5 ArbZG) und gegen `content/ausbildung-der-ausbilder/hf1/1.4-jugendarbeitsschutz-im-betrieb.md` sowie `content/fachwirt-gesundheit-soziales/hb5/5.5-arbeitsrecht.md` gehalten. Nichts committet, nichts geseedet, `kurs-angebot.ts` nicht angefasst, keine Rechtsaussage im Content geändert. Tests grün: `arbeitszeit` (19), Duell und `game-pool-aevo` (14); `tsc --noEmit` in `packages/shared`, `apps/web` und `apps/api` ohne Fehler. (Im vollen `packages/shared`-Lauf scheitert nur `schreibtischtest.test.ts`, weil auf dieser Maschine kein Python installiert ist; unabhängig von dieser Arbeit.)

## 1. Arbeitszeit-Prüfer

### Was war, was jetzt ist

| Abweichung | Vorher | Jetzt |
|---|---|---|
| Jugendliche über 8 Stunden | immer Verstoß | 8 bis 8,5 Std.: **Hinweis** („bitte prüfen“) auf § 8 Abs. 2a (Verkürzung an anderen Werktagen) und Abs. 2 (Fünf-Wochen-Verteilung bei Feiertagen); der Text nennt, ob ein anderer eingetragener Tag unter 8 Std. liegt (dann ist der Ausgleich erkennbar) oder nicht (dann ist es Auslegung, ob ein freier Werktag zählt). Über 8,5 Std.: Verstoß. `REGELN.jugendliche.tagMaxMitAusgleichMin` ist jetzt 510. |
| Jeder Berufsschultag Verstoß | jeder Haken = Verstoß | Nur **ein** Berufsschultag mit mehr als fünf Unterrichtsstunden je Woche ist geschützt (Wortlaut § 9 Abs. 1 Satz 2 Nr. 2 „einmal in der Woche“). Ist einer der markierten Tage beschäftigungsfrei, sind weitere markierte Tage mit Einsatz nur ein Hinweis (Anrechnung der Unterrichtszeit nach Abs. 2 Nr. 3). Ist keiner frei, ist der erste markierte Tag mit Einsatz ein Verstoß, die weiteren ein Hinweis. |
| Mindestlänge der Pause | nicht geprüft | Eine Gesamtpause unter 15 Minuten zählt nicht als Ruhepause: sie wird nicht von der Arbeitszeit abgezogen (Konstante `MIN_RUHEPAUSE_MIN`), dazu ein Hinweis. Reicht die anerkannte Pause nicht für die Stufe, bleibt es ein Verstoß. |
| Schichtzeit § 12 | fehlte | Jugendliche: Schichtzeit (Beginn bis Ende) über 10 Std. = Verstoß (Hinweis auf 11 Std. in Gaststätten, Landwirtschaft, Tierhaltung, Bau- und Montagestellen). Neues Feld `schichtMaxMin`, Paragraf `schicht`. |
| Ruhezeit nur zwischen aufeinanderfolgenden Einträgen | nur Zeile i → i+1, fehlerhafte Zeilen brachen die Prüfung ab | Vergleich mit dem **nächsten gültigen Arbeitstag** (auch über freie oder fehlerhafte Zeilen); `ruhezeitNachMin` bleibt nur bei direkt folgendem Tag gesetzt. Neu: Option `{ wochenwechsel: true }` prüft Sonntag zu Montag der Folgewoche (angenommen: gleiche Lage), nur als Hinweis. Die Web-Oberfläche setzt die Option. |
| `summeMin` rechnet Berufsschultag nicht an | nein | `summeMin` bleibt die Arbeitszeit im Betrieb (so dokumentiert). Neu `schultagAnrechnungMin`: ein beschäftigungsfreier Berufsschultag wird mit dem Durchschnitt der eingetragenen Arbeitstage geschätzt (§ 9 Abs. 2 Nr. 1, „durchschnittliche tägliche Arbeitszeit“). Wochenverstoß (über 40 Std.) bleibt nur für die Betriebszeit; liegt die Summe mit angerechnetem Schultag darüber, gibt es einen **Hinweis** (die Auslegung steht auch in Thema 1.4: „nach verbreiteter Auslegung“). Wichtig für die Bedienung: Berufsschultag auch ohne Betriebseinsatz ankreuzen (steht jetzt in der Tabellenüberschrift und im Aria-Label). |

Zusätzlich, weil der Gesetzestext es hergibt:
- Erwachsene, Ruhezeit 10 bis unter 11 Std.: jetzt **Hinweis** auf die Verkürzung um eine Stunde in Krankenhäusern, Pflege, Gaststätten, Verkehr usw. mit Ausgleich auf 12 Std. (§ 5 Abs. 2 ArbZG, deckt sich mit `hb5/5.5`); unter 10 Std. weiter Verstoß. Jugendliche: weiter Verstoß (§ 13 kennt keine Verkürzung).
- Zeitfenster 6 bis 20 Uhr bleibt Verstoß, der Text nennt jetzt § 14 Abs. 2 bis 7 und die Branchen als nicht abgebildete Ausnahmen.
- `REGEL_STAND` lautet jetzt „gegen den Gesetzestext abgeglichen, noch nicht rechtlich geprüft“.
- Neues Feld `WochenAuswertung.nichtGeprueft` (immer als Hinweis „Bitte prüfen“), in der Oberfläche ein aufklappbarer Abschnitt „Was dieses Werkzeug nicht prüft“. Die Wochenzeile zeigt Verstoß oder Hinweis je nach `art` (vorher stand dort immer „Verstoß“).

### Was bleibt als Hinweis (nicht als Prüfung umgesetzt)
- **Lage und Aufteilung der Pausen** (Einzelpausen mindestens 15 Min., nicht in der ersten und letzten Stunde, höchstens 4,5 Std. bzw. bei Erwachsenen 6 Std. am Stück, im Voraus feststehend): Das Datenmodell kennt nur die Gesamtdauer. Hinweis in `nichtGeprueft`.
- **Fünf-Wochen-Verteilung** (§ 8 Abs. 2) und Zusammenrechnung bei mehreren Arbeitgebern (§ 4 Abs. 5): größerer Umbau (Mehrwochen-Modell); Hinweis.
- **Berufsschule vor 9 Uhr** (auch für berufsschulpflichtige Volljährige), **Blockwochen**, Vortag nach 20 Uhr (§ 14 Abs. 4) und die Anrechnung der übrigen Unterrichtszeit mit Pausen und Wegezeiten (Nr. 3): bräuchte Unterrichtsbeginn und -dauer je Tag; Hinweis.
- **Schichtzeit 11 Std.** in den genannten Branchen, **Samstag/Sonntag/Feiertag** (§§ 16 bis 18), Tarifvertrag (§ 21a), Notfall (§ 21): Branchenwissen nötig; Hinweis bzw. in den Verstoßtexten als nicht abgebildet genannt.
- Die Schätzung des Berufsschultags (Durchschnitt der eingetragenen Tage) ersetzt nicht die vertragliche durchschnittliche Arbeitszeit; deshalb nur Hinweis.
- Hinweis zur Formulierung im Auftrag: Das Gesetz schützt „einmal in der Woche“ **einen** Berufsschultag (nicht erst den zweiten); so ist es umgesetzt, wie in Thema 1.4.

### Geänderte Dateien
- `packages/shared/src/arbeitszeit.ts` (Regelsatz, `pruefeWoche(gruppe, tage, optionen)`, neue Felder `schichtMaxMin`, `schicht`, `schultagAnrechnungMin`, `nichtGeprueft`; bestehende Aufrufer bleiben kompatibel)
- `packages/shared/src/arbeitszeit.test.ts` (19 Tests; geändert: 8,5 Std. jetzt Hinweis, Ruhezeit 10 Std. Erwachsene jetzt Hinweis; neu: Ausgleich, Schichtzeit, Pausen unter 15 Min., Folgewoche, ein Berufsschultag je Woche, Anrechnung, Nicht-geprüft-Liste)
- `apps/web/src/Arbeitszeitpruefer.tsx` (Option `wochenwechsel`, Überblick um Schichtzeit und Berufsschule ergänzt, Hinweis-/Verstoß-Anzeige in der Wochenzeile, Abschnitt „nicht geprüft“, Tabellenüberschrift und Beschriftung zum Berufsschultag)

### Offen für den Auftraggeber
- `apps/api/src/db/export-pruefblaetter.ts` (Prüfblatt 23, `arbeitszeitBlatt`) beschreibt noch den alten Stand („Anrechnung der Berufsschulzeit … nicht abgebildet“, nur Verstoß/Hinweis je Tag, Regeltabelle ohne Schichtzeit). Nicht angefasst (nicht im Auftrag); beim nächsten Export des Blatts ergänzen. Es kompiliert unverändert.
- Der Eintrag im Abschnitt „Werkzeug Arbeitszeit-Prüfer“ in `docs/entwuerfe/aevo-neue-inhalte-hf1-hf2/00-pruefprotokoll.md` kann auf „behoben, Rest als Hinweis“ gesetzt werden. Architekturplanung Abschnitt 13: Eintrag steht noch aus (nicht angelegt, weil nicht beauftragt).

## 2. Begriffe-Duell „Recht der Berufsausbildung“ (Fragen 6 bis 10) und Memory-Paar 17

Gelesen gegen Thema 1.1 (Grundzüge) und Thema 1.4.

| Stelle | Befund | Änderung |
|---|---|---|
| Frage 6 | „Nur für minderjährige Auszubildende“ widerspricht der Ausnahme in Thema 1.4: Das Verbot der Beschäftigung vor Unterricht, der vor 9 Uhr beginnt, gilt auch für noch berufsschulpflichtige Volljährige (§ 9 Abs. 1 Satz 2 Nr. 1). | Antwort A: „**Grundsätzlich** nur für minderjährige Auszubildende“; beide Feedbacktexte nennen die Ausnahme und verweisen auf Thema 1.1 und Thema 1.4. Keine neue Paragrafenangabe, Positivliste im Test unverändert. Kommentar im Kopf der Datei um Thema 1.4 ergänzt. |
| Fragen 7 bis 10 | 8 Std. grundsätzlich, 40 Std., Wochenende/Feiertage grundsätzlich verboten mit Ausnahmen, Freistellung für die Berufsschule: stimmen mit Thema 1.4 und dem Gesetzestext überein (8,5 Std. nur mit Ausgleich, von „grundsätzlich“ gedeckt). | keine |
| Memory-Paar 17 | Begriff „Jugendvertretung (JAV)“ ist nicht die Bezeichnung in Thema 2.2 („Jugend- und Auszubildendenvertretung“); Bedeutung „junge Beschäftigte und Azubis“ unscharf. Der volle Name passt nicht in die Kartenlänge (36 Zeichen). | Begriff „JAV“, Bedeutung „Jugend- und Auszubildendenvertretung im Betrieb“, Bestätigung: vertritt jugendliche Beschäftigte und Auszubildende, bei Kelvinar Sprachrohr über die Fachabteilungen. Keine Rechtsdetails, wie im Pool-Kopf gefordert. |

Geänderte Dateien:
- `apps/api/src/db/content/game-kennzahlen-duell-recht-berufsausbildung.ts`
- `apps/api/src/db/content/game-memory-aevo.ts`

Hinweis: Beide Spiele sind in der Datenbank erst nach dem Seeden wirksam (macht der Auftraggeber); `docs/entwuerfe/spielcode-korrekturen/bericht-C.md` erwähnt Paar 17 als bewusst unangetastet, das ist hiermit erledigt.
