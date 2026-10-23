# Bericht Agent B (Immobilien) — P-BA Spielcode angleichen

Stand: 23.10.2026, Arbeit abgeschlossen. Nicht committet, kein `db:seed-games`, nichts freigeschaltet (Duell-Set Immobilien bleibt gesperrt, `kurs-angebot.ts` unberührt). Die Zeilennummern der Prüfprotokolle waren veraltet; gesucht wurde der Text im aktuellen Code und gegen den eingespielten Content gelesen (`content/immobilienfachwirt/hb1/1.1`, `1.3`, `hb2/2.2`, `2.4`, `hb4/4.1` bis `4.4`, `hb5/5.2`, `5.3`, `5.4`, `5.5`, `hb6/6.1` bis `6.3`).

Tests: `cd apps/api && npx pnpm test -- immobilien` (Duell-Set 13 Tests, Spiele-Pools 2 Tests) grün; `npx tsc --noEmit` in `apps/api` ohne Fehler. Die Regeln des Duell-Tests (keine Ziffern außer Themenverweisen, keine Paragrafen, keine Normangaben, nur erlaubte Themenverweise) sind eingehalten.

## A. Duell-Set `apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts`

| Frage / Stelle | Was war | Was jetzt |
|---|---|---|
| Kopfkommentar | „Rechtsstand dort: 29.09.2026“; Themenliste ohne Hinweis auf später eingespielte Themen | „Oktober 2026 (… vor Verwendung prüfen)“; neuer Absatz: Themen 1.5, 2.5, 4.5, 5.5 und die Ergänzungen (Mietpreisbremse, Mieterhöhungsverfahren, WEG, Auftragsarten) werden vom Set nicht abgefragt, kein Widerspruch; Erweiterung wäre eigene Entscheidung (Test begrenzt die Themenverweise) |
| Frage 1 (Sonder-/Gemeinschaftseigentum) | Rückmeldung „Zum Gemeinschaftseigentum zählen Grundstück, …“ (absolut; Thema 1.1 sagt jetzt, Sondereigentum kann sich auf Terrasse/Garten erstrecken) | „zählen typischerweise …“ (die Frage selbst sagte schon „typischerweise“) |
| Frage 3 (Gesamthand), Z. 76–82 | Rückmeldung: „Gesamthandseigentum, etwa bei einer GbR oder einer Erbengemeinschaft“ (die rechtsfähige GbR ist seit 2024 selbst Eigentümerin, Thema 1.1) | „etwa bei einer Erbengemeinschaft“ |
| Frage 4 (Standesregeln/Erlaubnispflicht), Z. 92/94 | Rückmeldung: „Erlaubnispflicht für Makler, Bauträger und Verwalter“ | Erlaubnis gilt für Gewerbetreibende, die als Makler, Bauträger oder Verwalter tätig sind, bei einer GmbH für die Gesellschaft, nicht für einzelne Angestellte (Thema 1.3 und 6.1); „Paragraf“-frei |
| Frage 8 (Kündigung), Z. 135/140/142 | Frage und Richtig-Rückmeldung „stets ein berechtigtes Interesse“; Falsch-Rückmeldung „wiederholt unpünktliche Zahlung“ als Anknüpfung der fristlosen Kündigung (falsch, Thema 4.1: Rückstand über zwei Termine) | „in der Regel“; Ausnahme (erleichterte Kündigung im selbst bewohnten kleinen Haus) erwähnt; fristlose Kündigung knüpft an einen „nicht unerheblichen Zahlungsrückstand über mehrere Termine“ an und braucht kein berechtigtes Interesse; Antwortoptionen unverändert |
| Frage 11 (Wartung), Z. 171/176/178 | „Wartung bewahrt den Sollzustand“ (Thema 4.3 jetzt: Verzögerung des Abbaus des Abnutzungsvorrats, Verschleiß verlangsamen) | beide Rückmeldungen auf „verzögert den Abbau des Abnutzungsvorrats, den Verschleiß also verlangsamt“ umgestellt |
| Frage 20 (Energieausweis), Z. 279–286 | Pflichtangaben ohne Energieeffizienzklasse, ohne Bedingung „sofern ein Energieausweis vorliegt“ | Frage und beide Rückmeldungen mit der Bedingung „sofern bei Aufgabe der Anzeige ein Energieausweis vorliegt“; Richtig-Rückmeldung nennt zusätzlich „bei Wohngebäuden Baujahr und Energieeffizienzklasse“ und den Hinweis, dass sich die genauen Angaben zuletzt geändert haben (ohne Ziffern, ohne Gesetzesnamen; Test verbietet beides) |

Geprüft ohne Befund (kein Widerspruch zum Content, unverändert): Fragen 2, 5, 6, 7, 9, 10, 12–19. Anmerkung zu Frage 5 (Nichtigkeit bei Verstoß gegen zwingendes Recht): Thema 4.2 schränkt später auf „in der Regel nichtig“ ein; die Frage ist für den Zweck (nichtig gegen anfechtbar) vertretbar und blieb, im Prüfblatt ist der Hinweis vermerkt. Das Duell gendert nicht (generisches Maskulinum „Vermieter“, „Mieter“, „Makler“); die Hausregel Doppelpunkt wäre eine eigene, reine Textänderung des ganzen Sets, nicht gemacht.

Das Set bleibt weiterhin nur bis zur Rechtsprüfung gesperrt.

## B. Memory `game-memory-immobilien.ts`

- Paar 26 „Wartung“ (Z. 213): „Bewahrt den Sollzustand einer Anlage“ gegen „Verzögert den Abbau des Abnutzungsvorrats einer Anlage“; Bestätigung: „Wartung verlangsamt den Verschleiß und ist eine der vier Grundmaßnahmen der Instandhaltung“.
- Übrige Paare (Instandsetzung „stellt den Sollzustand nach einem Mangel wieder her“, Inspektion, vorausschauende Instandhaltung, Risikomatrix, Exposé, Vergleichswertverfahren usw.) widersprechen dem Content nicht.

## C. Kreuzworträtsel `game-kreuzwortraetsel-immobilien.ts`

- Wort 18 WARTUNG (Z. 134/137): Hinweis „… die den Sollzustand einer Anlage bewahrt“ gegen „… die den Verschleiß einer Anlage verlangsamt“; Bestätigung: „Wartung verzögert den Abbau des Abnutzungsvorrats, Instandsetzung stellt den Sollzustand nach einem Mangel wieder her.“
- Z. 135 (Exposé) und Z. 57 (Bilanz „neben GuV und Anhang“) bleiben, laut Protokollen harmlos und gegen den Content geprüft (Exposé-Bestandteile, Kapitalgesellschaft). Abnahme (Wort 28), Zuschlag (29), Risiko (9) gegen `5.2`, `5.5`, `2.4` gelesen: kein Widerspruch.

## D. `apps/api/src/db/export-pruefblaetter.ts` (nur Immobilien-Beschreibungstexte)

Sachliche Beschreibungstexte, die das Prüfblatt 18 und Blatt 20 beim nächsten Export erzeugen:

- Spiele-Hinweis Immobilienfachwirt (früher Z. 1570): „Miet-, WEG-, Bau- und Maklerrecht ausgelassen“ gegen „… kommen in Wörtern und Paaren nicht im Detail vor, obwohl der Kurs sie inzwischen behandelt (Mietpreisbremse, Wohnungseigentum, Bauvertragsrecht, Auftragsarten). Wartung folgt dem Kurs (Verzögerung des Abnutzungsvorrats).“
- Zonenhinweise `mieterhoehung` (früher Z. 1457): „Keine Aussagen zu Mietpreisbremse oder landesspezifischen Regelungen“ ersetzt durch Hinweis, dass Mietpreisbremse, Verfahren, Gebietsverordnungen und Modernisierungsumlage jetzt in der Theorie 4.1 stehen, Q-4.1-14 bis -17 aber nur die vier Wege abfragen; Rechtsstand 29.09.2026 gegen „Oktober 2026 … vor Verwendung prüfen (nicht förmlich rechtsgeprüft; zeitkritisch: Landesverordnungen, Entwurf Mietrecht II)“; Satz zu Q-4.1-17 („grundsätzlich“, Ausnahmen bewusst nicht behandelt) an den aktuellen Wortlaut angepasst.
- Zonenhinweise `wegorgane` (früher Z. 1463): Handnotiz zu Q-4.2-15 („verkürzt“, „Ladungsfristen weggelassen“) auf den jetzigen Wortlaut „Muss auf Verlangen … zertifiziert sein (Ausnahme: kleine Gemeinschaften)“ umgestellt; „rechtlich ungeprüft“ beim Verwaltungsbeirat durch „inzwischen mit Gesetzesstützen, nicht förmlich rechtsgeprüft“ ersetzt; Hinweis zur fehlenden Ausnahme (Ermächtigung, Einberufung) an den Text von 4.2 angepasst; neuer Hinweis „Offen (Code): vierte Zone Gemeinschaft der Wohnungseigentümer fehlt“.
- Zonenhinweise `kostengruppen`: Hinweis auf KG 800 (Fassung 2018, in 5.4 genannt, im Instrument keine Zone) und auf die Kurzform „KG 500 Außenanlagen“ (Content-Schlüssel).
- Duell-Beschreibung (Abschnitt 3 des Blatts): Rechtsstand, Fragen 2/3 (GbR), 4 (Erlaubnis für Gewerbetreibende), 7/8 („in der Regel“), 20 (Energieausweis: „schwankt zwischen Energieeinsparverordnung und Gebäudeenergiegesetz“ war überholt), neuer Punkt zu Frage 11 (Wartung); „Weggelassen: Alleinauftrag … Instandhaltung gegen Modernisierung“ ersetzt durch „Nicht abgefragt“ mit Hinweis, dass Thema 6.1 (Auftragsarten) und 4.1 (Erhaltung gegen Modernisierung) sie inzwischen behandeln.

Nicht geändert: die Zeile der Übersichtstabelle (Z. 1857, „mit Miet-, WEG- und Maklerrecht“), weil sie zutrifft. Das Prüfblatt `docs/pruefblaetter/18-immobilienfachwirt.md` und `20-spiele-kreuzwort-memory.md` wurden nicht von Hand geändert; sie folgen beim nächsten Export (`export-pruefblaetter`) und müssen vom Auftraggeber neu erzeugt werden (nicht von mir ausgeführt).

## E. `packages/shared/src/quiz-logic.ts` (Instrument-Beschriftungen Immobilien) — nicht umgesetzt

Die Zonenbeschriftungen sind zugleich Content-Schlüssel des Parsers (`content-parser.ts`, `QUADRANT_MODELS[…].zones[].label`; vgl. Commit `34a0709`); eine Umbenennung bricht den Import der Items. Deshalb keine Änderung, nur Befund und Vorschlag:

| Stelle (heutiger Ort) | Befund | Vorschlag / Aufwand |
|---|---|---|
| `wegorgane` (~Z. 707): Zonen Eigentümerversammlung, Verwalter, Verwaltungsbeirat | Vierte Zone „Gemeinschaft der Wohnungseigentümer“ (Kursprofil I-IMM-06) fehlt. Die Items brauchen sie nicht, nur das Kursprofil | Zone `gdwe` im Modell ergänzen und in Q-4.2-12 sowie -14 bis -17 je eine Zeile (Vertritt vom Verwalter, handelt als Verband, Inhaberin des Verwaltungsvermögens) hinzufügen; Aufwand: eine Zeile Code, Content-Änderung in fünf Items, Parser-/Instrumenttests, Neuexport des Blatts, rechtlich zu prüfen. Instrument bleibt gesperrt |
| `betriebskosten` (~Z. 720): „Verbrauchsabhängig (Heizkostenverordnung)“ | Überschneidung mit „Umlagefähig“ (Heiz- und Warmwasserkosten stehen auch im BetrKV-Katalog); die Anweisungen in Q-4.4-14 bis -17 lösen es auf | Label unverändert lassen (Content nutzt es 6-mal) oder Instrument auf Verteilmaßstab umstellen; Aufwand größer als Textkorrektur, Entscheidung beim Auftraggeber |
| `kostengruppen` (~Z. 730): „KG 500 Außenanlagen“; keine Zone KG 800 | DIN 276:2018 nennt „Außenanlagen und Freiflächen“ und KG 800 Finanzierung; 5.4 erklärt beides im Text, die Zuordnungen kommen ohne aus | Label-Umbenennung nur zusammen mit allen KG-500-Zeilen in 5.4; KG 800 wäre eine achte Zone: Code + Items; kein Widerspruch zum Content, Priorität niedrig |
| `risikomatrix` (~Z. 533): Felder Vermeiden/Absichern/Beobachten/Akzeptieren | Thema 2.4 stellt die vier Felder jetzt ausdrücklich als „vereinfachte Fassung“ der Steuerungsstrategien dar („beobachten“ ist keine eigene Strategie) | kein Widerspruch mehr; keine Änderung |
| `mieterhoehung`, `wertermittlung` | Zonen („Vergleichsmiete“, „Modernisierungsumlage“, „Staffelmiete“, „Indexmiete“; Vergleichs-/Ertrags-/Sachwert) decken sich mit 4.1 und 6.3 | keine Änderung |

## F. Weitere Auffälligkeiten (nicht in meiner Zuteilung, nur gemeldet)

- `packages/shared/src/kurs-angebot.ts` (Z. ~466): Kommentar „Duell-Set immobilien-aehnlich erst nach der Rechtsprüfung des Prüfblatts 18 aufnehmen“ gilt weiter; keine Änderung.
- Nach dem Neuexport sollte `docs/pruefblaetter/18-immobilienfachwirt.md` (Frage 20 Z. 624/978–985, Frage 8 Z. 623/758/763/765, Wartung Z. 814–821) die neuen Texte zeigen; das ist ohne weiteres Zutun der Fall.

## Geänderte Dateien

- `apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts`
- `apps/api/src/db/content/game-memory-immobilien.ts`
- `apps/api/src/db/content/game-kreuzwortraetsel-immobilien.ts`
- `apps/api/src/db/export-pruefblaetter.ts` (nur Immobilien-Beschreibungstexte)
- `docs/entwuerfe/spielcode-korrekturen/bericht-B.md` (dieser Bericht)
