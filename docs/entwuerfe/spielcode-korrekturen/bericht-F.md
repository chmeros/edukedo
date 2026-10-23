# Bericht Agent F (Immobilien) — Instrumente WEG-Organe, Betriebskosten, DIN-276-Kostengruppen, Duell gendern

Stand: 23.10.2026. Nicht committet, nicht importiert/geseedet, `kurs-angebot.ts` unverändert. Grundlage: Bericht B Abschnitt E, Kurstexte `content/immobilienfachwirt/hb4/4.2`, `hb4/4.4`, `hb5/5.4`, `hb1/1.1`, Kursprofil I-IMM-06.

Prüfung: `npx tsx --env-file=.env src/db/import-content.ts --dry-run` fehlerfrei (nichts geschrieben; Immobilien: 3 neu, Lösung geändert bei Q-4.2-14 bis -17 und Q-5.4-14 bis -17, Fortschritt bleibt erhalten); `npx pnpm db:validate-content`: 712 Themendateien, 23.605 Item-Schlüssel, 0 Verstöße; `npx tsc --noEmit` in `apps/api`, `apps/web`, `packages/shared` ohne Fehler; Tests `npx pnpm test -- content-parser quiz immobilien` (api, 66 grün) und `npx pnpm test -- quiz` (shared, 30 grün).

## 1. WEG-Organe

**War:** drei Zonen (Eigentümerversammlung, Verwalter, Verwaltungsbeirat); die Gemeinschaft der Wohnungseigentümer fehlte, obwohl Kursprofil I-IMM-06 vier Zonen vorsieht und der Kurs sie als eigenen Akteur führt (Theorie 4.2 „Haftung im Außenverhältnis“: Vertragspartnerin, Haftung mit dem Gemeinschaftsvermögen; „Anfechtung von Beschlüssen“: Beklagte der Anfechtungsklage; Theorie 1.1: Verband, der Rechte erwerben, Verbindlichkeiten eingehen, klagen und verklagt werden kann).

**Begründung, dass die vierte Zone sachlich nötig ist:** Die Gemeinschaft ist kein Organ, aber die dritte Seite jeder Zuständigkeitsfrage: Der Verwalter handelt, die Gemeinschaft ist berechtigt und verpflichtet. Ohne die Zone musste der Kurs Aussagen wie „Vertragspartnerin des Handwerksbetriebs“, „Schuldnerin der Rechnung“, „Anspruchsgegnerin bei Pflichtverletzung der Verwaltung“ (Q-4.2-31 fragt genau das als Multiple Choice) entweder dem Verwalter zuordnen (falsch) oder weglassen; die Fachlehrer-Prüfung (FL-IM-19) hatte genau diese Unschärfe bemängelt. Nichts Wesentliches am Instrument ändert sich: Schlüssel und Beschriftung der Modellart („WEG-Organe“) bleiben, bestehende Zuordnungen bleiben gültig. Die Oberfläche benennt die Gemeinschaft in den Anweisungen als „Verband“ (nicht als Organ).

**Jetzt:**
- `QUADRANT_MODELS.wegorgane`: vierte Zone `{ key: "gdwe", label: "Gemeinschaft der Wohnungseigentümer" }`.
- Q-4.2-14 bis -17: je eine Zeile für die Gemeinschaft (Vertragspartnerin; Haftung mit Gemeinschaftsvermögen und Erhaltungsrücklage; Rechnung des Handwerksbetriebs als Verbindlichkeit der Vertragspartnerin; Anspruchsgegnerin bei Pflichtverletzung der Verwaltung), Anweisungen auf „Organ oder Verband“ bzw. „Zone“ umgestellt, Erklärungen um einen Satz ergänzt. Lösung ändert sich im Importvergleich (Hinweis „Fortschritt bleibt erhalten“).
- **Neue Zuordnungsaufgaben mit allen vier Zonen (je zwei Begriffe je Zone):** **Q-4.2-32** (leicht, erinnern: Rollen im Überblick), **Q-4.2-33** (mittel, anwenden: Fahrradabstellanlage im Alltag), **Q-4.2-34** (schwer, analysieren: Anfechtung, Einberufung, Bestellung und Haftung). Belege: Theorie 4.2 (Versammlung, Verwalterpflichten, Wirtschaftsplan, Verwaltungsbeirat, Haftung im Außenverhältnis, Anfechtung) und 1.1. IDs lückenlos an Q-4.2-31 angeschlossen; `git log -S"Q-4.2-32"` bis `-35` ergibt keine früheren Treffer, die IDs waren nie vergeben. Ableitung in Q-4.2-33 (Vergabebegleitung durch den Beirat) ist in der Erklärung als „typisch“ gekennzeichnet.
- Illustration `WegOrganeIllustration`: Kopfkasten jetzt „Gemeinschaft der Wohnungseigentümer“ (hervorgehoben), darunter die drei Organe. Beschreibung in `Instrumente.tsx` ergänzt.
- Parser-Test `content-parser.test.ts`: WEG-Zeile mit Gemeinschaft, Erwartung `["versammlung","verwalter","beirat","gdwe"]`.
- Rechtlich weiter zu prüfen (WEG-Reform, Rechtsstand Oktober 2026), im Prüfblatt-Hinweis vermerkt.

## 2. Betriebskosten

**War:** Zonen „Umlagefähig“, „Nicht umlagefähig“, „Verbrauchsabhängig (Heizkostenverordnung)“. Heiz- und Warmwasserkosten stehen im BetrKV-Katalog (Theorie 4.4: Heizung und Warmwasserversorgung) und sind damit umlagefähig; die dritte Zone war eine Teilmenge der ersten, die Anweisungen mussten die Überschneidung jeweils erklären. Zudem ist „verbrauchsabhängig“ unscharf: Auch die Wasserversorgung wird nach Verbrauch umgelegt (Theorie 4.4), unterliegt aber nicht der Heizkostenverordnung.

**Jetzt (Beschriftungen geändert, Content komplett mitgezogen; Schlüssel `umlagefaehig`, `nichtumlagefaehig`, `verbrauch` unverändert):**
- „Umlagefähig (ohne Heizung und Warmwasser)“
- „Nicht umlagefähig“ (unverändert)
- „Heiz- und Warmwasserkosten (Heizkostenverordnung)“
- Alle 11 Zeilen der ersten und alle 8 Zeilen der dritten Zone in Q-4.4-14 bis -17 angepasst, die vier Anweisungen vereinfacht („Heiz- und Warmwasserkosten … gehören hier nur in die dritte Zone; die erste Zone gilt für die übrigen umlagefähigen Kosten“), Erklärung von Q-4.4-14 um die Trennschärfe-Begründung (Kosten der Wasserversorgung gehören zur ersten Zone) ergänzt. Der Importvergleich meldet keine Lösungsänderung, weil die Zonenschlüssel gleich blieben.
- Geändert in: `packages/shared/src/quiz-logic.ts`, `content/immobilienfachwirt/hb4/4.4-betriebskostenabrechnung.md`, `content/README.md` (Modellliste), `apps/web/src/Instrumente.tsx` (Beschreibung), `InstrumentIllustrations.tsx` (Spalte „Heizkosten“), Parser-Test.

## 3. Kostengruppen (DIN 276)

**War:** sieben Zonen KG 100 bis KG 700; KG 500 hieß „KG 500 Außenanlagen“ (Theorie 5.4 und K-5.4: „Außenanlagen und Freiflächen“); KG 800 Finanzierung (Fassung 2018, Theorie 5.4: „als achte Hauptgruppe“) fehlte als Zone, obwohl der Kurs sie nennt (Theorie, Karte, Fachgespräch).

**Jetzt:**
- `QUADRANT_MODELS.kostengruppen`: „KG 500 Außenanlagen und Freiflächen“; neue achte Zone `kg800` „KG 800 Finanzierung“. Das Frontend rendert beliebig viele Zonen (`QuadrantStep`), die frühere „Zonenobergrenze 7“ ist kein Code-Limit, sondern eine Planungsgrenze (Architekturplanung 13); sie wird hier bewusst überschritten, weil KG 800 zur Fassung 2018 gehört, die der Kurs zugrunde legt.
- Q-5.4-14 bis -17: KG-500-Zeilen auf den neuen Wortlaut, je eine Zeile zu KG 800 (Finanzierungskosten während der Bauzeit), Erklärungen ergänzt (Q-5.4-14: „acht Beispiele … acht Hauptkostengruppen der Fassung 2018“; Q-5.4-17: Finanzierungskosten sind keine Baunebenkosten, als Ableitung aus der Theorie gekennzeichnet). Lösung ändert sich (Importvergleich, Fortschritt bleibt erhalten).
- Theorie 5.4, erster Absatz: „unterscheidet … zunächst sieben Kostengruppen“ und „Als achte Hauptgruppe kommt in der Fassung 2018 die KG 800 Finanzierung hinzu“ (der bisherige Text war in sich widersprüchlich: Fassung 2018 mit sieben Gruppen und achter Gruppe „in der Fassung 2018“).
- Illustration: acht Balken; Beschreibung „acht Kostengruppen von 100 bis 800“; `content/README.md`; Parser-Test (kg500, kg800).
- Unverändert: Karte K-5.4 „sieben Hauptkostengruppen KG 100 bis KG 700“ (nennt KG 800 ausdrücklich zusätzlich); Q-5.4-04 (Zuordnung KG ↔ Inhalt, „Vier der sieben Hauptkostengruppen“) ist inhaltlich richtig für den Kernbereich; Fachgespräch (nennt KG 800 schon).

## 4. Duell `game-kennzahlen-duell-immobilien-aehnlich.ts`

**War:** generisches Maskulinum (Vermieter, Mieter, Eigentümer, Makler, Bauträger, Verwalter, Auftraggeber, Verkaufsinteressent). **Jetzt:** Doppelpunkt nach Hausregel (`docs/entwuerfe/hausregeln-schreibweise.md`): Vermieter:in, Mieter:innen, Eigentümer:innen, Makler:in/Makler:innen, Bauträger:in, Verwalter:in, Auftraggeber:in, Verkaufsinteressent:in; Rundentitel „Bewertung, Makler:innen und Vermarktung“; die Antworten „Nachweismakler:in“ und „Vermittlungsmakler:in“ samt Rückmeldungen (Artikel angepasst). Unverändert gelassen: Zusammensetzungen (Eigentümerversammlung, Eigentümergemeinschaft, Erbengemeinschaft, Maklertyp), neutrale Formen (Gewerbetreibende, Angestellte, Verbandsmitglieder, Bauwilligen). Inhalte, Reihenfolge, richtige Antworten unverändert; 14 Textstellen ersetzt. Test `immobilien` (13 + 2) grün. Hinweis: Die Kurstheorie und die anderen Immobilien-Spiele (Memory, Kreuzworträtsel) schreiben „Nachweismakler“/„Vermittlungsmakler“ noch in der Grundform; falls gewünscht, dort als eigener Schritt angleichen.

## Prüfblatt-Hinweistext (`export-pruefblaetter.ts`, nur Immobilien)

Hinweise zu `wegorgane` (vierte Zone statt „Offen (Code)“), `betriebskosten` (trennscharfe Zonen statt Überschneidungs-Warnung), `kostengruppen` (acht Zonen, KG 800, KG 500 neu benannt) und ein Schreibweise-Punkt im Duell-Nachspann angepasst. Prüfblatt 18 (`docs/pruefblaetter/18-immobilienfachwirt.md`) folgt nach dem nächsten Export (nicht ausgeführt).

## Geänderte Dateien

- `packages/shared/src/quiz-logic.ts`
- `apps/web/src/Instrumente.tsx`, `apps/web/src/InstrumentIllustrations.tsx`
- `apps/api/src/db/content-parser.test.ts`
- `apps/api/src/db/export-pruefblaetter.ts` (nur Immobilien-Teile)
- `apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts`
- `content/immobilienfachwirt/hb4/4.2-weg-verwaltung.md` (Q-4.2-14 bis -17 geändert, **neu Q-4.2-32, -33, -34**)
- `content/immobilienfachwirt/hb4/4.4-betriebskostenabrechnung.md` (Q-4.4-14 bis -17)
- `content/immobilienfachwirt/hb5/5.4-kosten-terminplanung-bau.md` (Theorie Absatz DIN 276, Q-5.4-14 bis -17)
- `content/README.md` (Modellliste F-190)
- `docs/entwuerfe/spielcode-korrekturen/bericht-F.md` (dieser Bericht)

**Offen für den Projektleiter:** Architekturplanung Abschnitt 13 und Entwicklungsplan nicht ergänzt (nicht Teil des Auftrags); Neuexport der Prüfblätter; `db:import` der drei neuen und acht geänderten Items (nicht ausgeführt); Rechtsprüfung der WEG-Items bleibt Teil der Immobilien-Freigabe.
