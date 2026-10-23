# Bericht Agent C (AEVO/Berufsausbildung), P-BA

Stand 23.10.2026. Quellen: `docs/entwuerfe/aevo-korrekturen-r4/` (P-AR), `aevo-neue-inhalte-hf1-hf2/` (P-AS), `aevo-neue-inhalte-hf4/` (P-AT), Architekturplanung Abschnitt 13; geprüft gegen `content/ausbildung-der-ausbilder/` (hf1/1.3, hf2/2.1, 2.3, hf3/3.1, hf4/4.1, 4.2, 4.3). Nichts committet, nichts geseedet, nichts freigeschaltet.

## Duell `game-kennzahlen-duell-recht-berufsausbildung.ts`

| Fundstelle | Was war | Was jetzt |
|---|---|---|
| Kopfkommentar | „Alle Aussagen, Zahlen und Paragrafen stammen ausschließlich aus den Theorietexten … Rechtsstand 29.09.2026“ | Rechtsstand 22./23.10.2026 (nach P-AR bis P-AT); Kommentar nennt, welche Fragen (3, 11, 12, 15, 18, 20) welchem Thema folgen und dass Frage 15 eine Praxis beschreibt |
| Rundenabschluss Runde 1 | ohne Schriftform | „… Regeln zur Kündigung in der Probezeit (auch die Schriftform) …“ |
| Rundenabschluss Runde 3 | „kennst Form, Anmeldung und Bestandteile des Ausbildungsvertrags“ | „kennst Vertragsabfassung, Anmeldung bei der zuständigen Stelle und den Zusammenhang mit dem Ausbildungsvertrag“ |
| Frage 3 (Probezeitkündigung) | richtige Antwort ohne Schriftform | Antwort B „Ohne Kündigungsfrist und ohne Angabe von Gründen, aber schriftlich“; beide Rückmeldungen nennen die Schriftform (§ 22 Abs. 3 BBiG, E-Mail genügt nicht), wie Thema 3.1 |
| Frage 11 (Form des Vertrags) | „Wie muss ein Berufsausbildungsvertrag nach § 11 BBiG abgeschlossen werden?“, „Schriftlich“ | Umgebaut: „Wie ist der wesentliche Inhalt eines Berufsausbildungsvertrags nach § 11 BBiG abzufassen?“ A „Mündlich genügt“, B „In Textform“; Rückmeldungen: Vertragsabfassung in Textform, unverzüglich nach Vertragsschluss, spätestens vor Beginn; der Vertragsschluss selbst ist formfrei (Thema 2.3) |
| Frage 12 (Anmeldung) | „(§ 34 BBiG)“ für die Anmeldung | „(§ 36 Abs. 1 BBiG)“; Rückmeldungen: Eintragung wird bei der zuständigen Stelle beantragt (§ 36 Abs. 1), die Stelle führt das Verzeichnis (§ 34) |
| Frage 15 (Ausbildungsplan) | „der Vertragsniederschrift beizufügen … fester Bestandteil“ nach § 11 | „Wie wird der betriebliche Ausbildungsplan in der Praxis mit dem Ausbildungsvertrag verbunden?“ A „Er wird getrennt vom Vertrag verwaltet und nie beigefügt“, B „Er wird der Vertragsabfassung als Anlage beigefügt“; Rückmeldung: Praxis, konkretisiert die nach § 11 anzugebende Gliederung, keine gesetzliche Pflicht (Thema 2.1) |
| Frage 18 (Nachteilsausgleich) | Antwort B „… sind angemessen zu berücksichtigen …“ | „… sollen berücksichtigt werden, z. B. durch mehr Zeit“ (§ 65 Abs. 1 BBiG „sollen“, Thema 4.1); Rückmeldungen waren schon neutral und bleiben |
| Frage 20 (Zeugnis) | „qualifiziertes Zeugnis mit Angaben zu Führung und Leistung“, „Art, Dauer und Ziel“, „ausdrücklich verlangt“, Eindruck eines zweiten Zeugnisses | „Wann nimmt der Betrieb in das Ausbildungszeugnis zusätzlich Angaben zu Verhalten und Leistung auf (qualifiziertes Zeugnis)?“ B „Wenn der bzw. die Auszubildende es verlangt“; Rückmeldung nennt auch die erworbenen Fertigkeiten, Kenntnisse und Fähigkeiten (Thema 4.2, K-4.2-03 bis -05) |
| Frage 5 (Betriebsrat § 102) | Protokoll P-AT: „ergänzungsfähig“ | unverändert: Frage und Rückmeldungen stimmen mit hf2/2.2 und hf4/4.3 überein („vor jeder Kündigung“); keine Änderung nötig |
| Fragen 1, 2, 4, 13, 14, 16, 17, 19 | nicht in der Liste | gegen den Content gelesen, kein Widerspruch (Frage 16: „Voraussetzung für die Zulassung“ passt zu § 43 „vorgelegt“) |

Fragen 6 bis 10 (Runde 2, Jugendarbeitsschutz) **nicht angefasst** (Vorgabe). Hinweis: Frage 6 („Nur für minderjährige Auszubildende“ gegen „Für alle, unabhängig vom Alter“) steht neben der Ausnahme berufsschulpflichtiger Volljähriger in Thema 1.4 (§ 9); P-AS hat das als Bestandsspannung vermerkt. Entscheidung beim Auftraggeber.

Test `game-kennzahlen-duell-recht-berufsausbildung.test.ts`: Die Positivliste der Paragrafenangaben (`ERLAUBTE_PARAGRAFEN`) schlug mit „§ 22 Abs. 3 BBiG“ und „§ 36 Abs. 1 BBiG“ fehl. Beide gegen Thema 3.1 und 2.3 geprüft und in die Liste aufgenommen (zwei Zeilen). Das ist eine Datei außerhalb der Zuteilung (Testdatei des zugeteilten Duells); falls nicht gewollt, müssten die beiden Paragrafen aus den Fragetexten entfallen.

## Memory `game-memory-aevo.ts`

| Paar | Was war | Was jetzt |
|---|---|---|
| 5 Personelle Eignung | „Genug passend qualifizierte Ausbilder:innen vorhanden“; „… passendes Verhältnis von Ausbilder:innen zu Azubis“ | Bedeutung „Persönlich und fachlich geeignete Ausbilder:innen sind vorhanden“; Bestätigung „Dazu gehört auch die berufs- und arbeitspädagogische Eignung, die die AEVO regelt“ (das Verhältnis der Zahl der Auszubildenden ist Teil der Eignung der Ausbildungsstätte nach § 27, keine feste Zahl, Thema 1.3) |
| 19 Ausbildungsvertrag | „Der betriebliche Ausbildungsplan wird dem Vertrag beigefügt“ | „In der Praxis wird der betriebliche Ausbildungsplan dem Vertrag als Anlage beigefügt“ (Thema 2.1) |
| 32 Gestreckte Abschlussprüfung | „Erster Teil zur Halbzeit, zweiter Teil am Ende“ | „Teil 1 vor dem Ende der Ausbildung, Teil 2 am Ende“ (Teil 1 je Beruf vor Ende des zweiten Ausbildungsjahres bzw. im vierten Halbjahr) |
| 33 Zulassung | „… ein geführtes Berichtsheft“ | „… ein vorgelegter Ausbildungsnachweis (Berichtsheft)“ (§ 43 Abs. 1 Nr. 2) |
| 37 Qualifiziertes Zeugnis | „Enthält zusätzlich Führung und Leistung“; „Das einfache Zeugnis nennt nur Art, Dauer und Ziel“ | „Enthält zusätzlich Verhalten und Leistung“; Bestätigung nennt auch die erworbenen Fertigkeiten, Kenntnisse und Fähigkeiten und „Verhalten und Leistung kommen auf Verlangen hinzu“ |
| 39 Übernahme | „Weiterbeschäftigung nach bestandener Prüfung“ (Thema nutzt „Weiterarbeit“ für den Fall ohne Vereinbarung, § 24 BBiG) | „Ausdrücklich vereinbarte Beschäftigung nach bestandener Prüfung“; Bestätigung „Darüber spricht Kelvinar üblicherweise in einem Perspektivgespräch …“ statt „Ausbildende“ (keine gesetzliche Pflicht, Thema 4.2) |

Paare 35 (Nachteilsausgleich), 34, 36, 38, 40 gegen den Content gelesen, keine Änderung nötig. Paar 17 (Jugendvertretung) wegen der Vorgabe (Minderjährige) nicht angefasst.

## Kreuzworträtsel `game-kreuzwortraetsel-aevo.ts`

Alle 34 Wörter gegen die Themen gelesen. Einzige Änderung: Wort 32 UEBERNAHME, Bestätigung „Perspektiven, die Ausbildende … aufzeigen“ zu „Ausbilder:innen“ (Aufgabe der Ausbilder:innen, Thema 4.2). Wörter 5, 14, 29, 31 und 34 passen zum Content; keine Rechtsdetails im Gitter (Kopfkommentar bleibt wahr).

## `packages/shared/src/unterweisungsplan.ts`

Nur der Kommentar zu `gesamtMinuten` (vorher „Prüfungsvorgabe, Standard 15“): jetzt „Standard 15; in der AEVO-Prüfung soll die Präsentation 15 Minuten nicht überschreiten, Präsentation und Fachgespräch zusammen höchstens 30 Minuten (§ 4 AEVO, Thema 1.1); einstellbar, Planungsgröße zur Selbstkontrolle“. Keine Verhaltensänderung. `apps/web/src/Unterweisungsplaner.tsx` und die Instrumente-Dateien: keine widersprechende Beschriftung (Text „Vorgabe des Kurses: n Minuten“ bleibt).

## Nicht angefasst / Hinweise

- `packages/shared/src/arbeitszeit.ts` und alles zum Jugendarbeitsschutz: nicht angefasst. Bekannt aus P-AS (nicht neu): Das Werkzeug weicht in mehreren Punkten vom Rohtext des JArbSchG ab (8,5 Stunden im Durchschnitt, Berufsschultag, Pausen, Schichtzeit, Ruhezeit, `summeMin`); es ist nicht freigegeben. Siehe `aevo-neue-inhalte-hf1-hf2/00-pruefprotokoll.md`.
- Prüfblätter `10-aevo.md` und `20-spiele-kreuzwort-memory.md` nicht von Hand geändert; sie müssen nach dieser Änderung neu exportiert werden (Duell 3, 11, 12, 15, 18, 20, Memory 5, 19, 32, 33, 37, 39). Der Export-Quelltext `export-pruefblaetter.ts` wurde nicht berührt; für AEVO ist keine Beschreibungsänderung dort gemeldet.
- Tests: `npx pnpm test -- game-kennzahlen-duell-recht-berufsausbildung game-pool-aevo` (apps/api): 14 von 14 grün (nach der Anpassung der Positivliste); `packages/shared` `unterweisungsplan`: 9 von 9 grün.

## Geänderte Dateien

- `apps/api/src/db/content/game-kennzahlen-duell-recht-berufsausbildung.ts`
- `apps/api/src/db/content/game-memory-aevo.ts`
- `apps/api/src/db/content/game-kreuzwortraetsel-aevo.ts`
- `packages/shared/src/unterweisungsplan.ts` (nur Kommentar)
- `apps/api/src/db/game-kennzahlen-duell-recht-berufsausbildung.test.ts` (zwei Einträge in der Positivliste)
- `docs/entwuerfe/spielcode-korrekturen/bericht-C.md`
