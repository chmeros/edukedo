# Prüfung P-AU Fachinformatiker (unabhängige Prüfung von `ersetzungen-fi.json`)

Stand 23.10.2026. Geprüft: alle 44 Paare in 26 Einträgen (vier Kurse), `rechtsangaben-fi.md` (26 Zeilen), `befund-uebersicht-fi.md`, Abgleich mit den Befunden B-FI-01 bis -10 und den Fachlehrer-Berichten. Rohtext von gesetze-im-internet.de per `curl` gelesen: BBiG §§ 11, 22; NachwG § 2; BetrVG §§ 1, 7, 8; EntgFG § 5; SGB IV § 109; BDSG § 38; BGB §§ 107, 108, 634, 634a, 640, 641; FIAusbV §§ 7, 20, 25. Websuche: Stand § 38 BDSG, ISO 9241-110:2020, DIN 31051 (nur Sekundärquellen).

## Gesamturteil

Keine hohen Befunde. Alle am Rohtext geprüften Rechtsaussagen im Lerntext stimmen (22 der 26 Zeilen nachvollzogen, ohne Abweichung). Die Mechanik ist sauber. Drei mittlere Befunde (M1 bis M3), die schnell zu beheben sind; der Rest ist niedrig.

## Mechanik (Gegenprobe mit eigenem Skript)

- Je Kurs und Datei, Paare nacheinander auf den aktuellen Bestand angewendet: **44 von 44 Paaren**, jede alte Zeichenkette genau einmal, einzeilig, kein Paar ohne Wirkung. Keine Item-ID, kein Fachgesprächs-Fragetext geändert (keine `fachgespraech.md` berührt).
- Nach Anwendung sind `fu3/3.3`, `fu6/6.2`, `fu7/7.1`, `fu7/7.2`, `fu7/7.4` in allen vier Kursen wieder identisch (bis auf `kurs_slug`); die Paarsätze der vier Kurse sind für diese Dateien wortgleich.
- **Neue Zeichenkette enthält die alte** bei 7 Paaren: `fu6/6.2` (je Kurs 1, also 4), `dv2/9.4` Paar 3 und 4 (Distraktoren), `dv3/10.3` Paar 0. Anwendung ist in jedem Fall korrekt (`einspielen.cjs` ersetzt die erste Fundstelle), aber ein zweiter Lauf würde den Text verdoppeln. Niedrig, nur als Hinweis an den Auftraggeber: nicht zweimal einspielen.
- Q-9.4-13: richtige Option 97 Zeichen, Distraktoren 102, 87, 93: nicht die längste, nicht gleich lang, genau eine richtige Antwort.
- Zählung der Befund-Übersicht stimmt (AE 10, DP 8, DV 16, SI 10 = 44; je Befund 8/4/4/8/4/7/2/5/2).

## Befunde

### Mittel

**M1. Q-9.4-13 (`dv2/9.4`, Paar 2): unklar, wer sich die Rechte vorbehält.**
Die richtige Option lautet jetzt „Die Mängel in einer Liste mit Fristen festhalten und bei der Abnahme die Rechte daran vorbehalten“. Die Frage („Bei der Abnahme sind zwei geringfügige Mängel offen … Welches Vorgehen ist sachgerecht?“) wird aus Sicht des Auftragnehmers (Brevanta führt die Übergabe durch) gelesen, wie die Distraktoren „Mängel nicht erwähnen, damit die Abnahme nicht gefährdet wird“ zeigen. Den Vorbehalt nach dem Gesetz erklärt aber der Auftraggeber. Die Option lässt offen, wer „die Rechte“ vorbehält; wer sie als Brevanta liest, versteht einen Vorbehalt gegen sich selbst.
Korrektur (Paar 2, neue Zeichenkette): `- [x] Mängelliste mit Fristen führen; der Kunde behält sich im Protokoll seine Rechte vor` (ca. 80 Zeichen, kürzer als alle Distraktoren; die Erklärung bleibt passend). Alternativ den Fragestamm um „mit dem Kunden“ ergänzen.

**M2. `fu7/7.4` Paar 0 (Arbeitsunfähigkeit): zwei Ungenauigkeiten, und Rechtsangabe Nr. 10 begründet sie falsch.**
(a) „Dauert sie länger als drei Kalendertage, ist sie ärztlich nachzuweisen, grundsätzlich spätestens am darauffolgenden Arbeitstag“: Das Gesetz meint den Arbeitstag nach dem dritten Kalendertag. Der Satz lässt sich als „am Arbeitstag nach Beginn der Krankheit“ lesen.
(b) „eine Papierbescheinigung müssen diese Beschäftigten dann nicht vorlegen“ ist kategorisch. § 5 Abs. 1a Satz 3 EntgFG nimmt **gesetzlich Versicherte** aus, die in einem Privathaushalt geringfügig beschäftigt sind oder von einer Ärztin oder einem Arzt außerhalb der vertragsärztlichen Versorgung festgestellt werden; sie legen die Bescheinigung selbst vor. Das „in der Regel“ im Folgesatz („Wer nicht gesetzlich versichert ist, legt … in der Regel weiterhin selbst vor“) deckt diese Ausnahmen nicht ab, anders als `rechtsangaben-fi.md` Nr. 10 behauptet.
Korrektur: „… ist sie ärztlich nachzuweisen, grundsätzlich spätestens an dem Arbeitstag, der auf den dritten Kalendertag folgt; …“ und „… und der Arbeitgeber ruft die Meldung dort ab (eAU); in der Regel müssen diese Beschäftigten dann keine Papierbescheinigung vorlegen, sie müssen die Arbeitsunfähigkeit aber weiterhin ärztlich feststellen lassen (Ausnahmen gibt es zum Beispiel bei einer Feststellung außerhalb der vertragsärztlichen Versorgung).“ Rechtsangaben Nr. 10 entsprechend berichtigen (Ausnahmen betreffen gesetzlich Versicherte).

**M3. `ae1/8.3` Paar 0 (ISO 9241-110): „benennt und gruppiert … teilweise anders; die Grundideen bleiben aber gleich“ steht als Tatsache im Lerntext, ist aber nach eigener Angabe „vermutet“ (Rechtsangaben Nr. 26).**
Die Websuche bestätigt nur Titel („Interaktionsprinzipien“) und Neuausgabe 2020 mit technischen Änderungen, nicht die Liste der Prinzipien. „Gruppiert“ und „Grundideen bleiben gleich“ sind ungeprüft; nach meiner Erinnerung (nicht am Normtext) hat die Fassung von 2020 ein Prinzip ersetzt (statt Individualisierbarkeit „Benutzerbindung“), sodass „Grundideen bleiben gleich“ so nicht stimmen würde. Die Bestandsformulierung war vorsichtiger („neuere Fassungen“). Hausregel: „vermutet“ nicht als gesichert darstellen.
Korrektur (neue Zeichenkette): `Die folgenden sieben Grundsätze stammen aus der Fassung DIN EN ISO 9241-110:2006 (Titel „Grundsätze der Dialoggestaltung"). Die Fassung von 2020 trägt den Titel „Interaktionsprinzipien" und ist überarbeitet; ihre Prinzipien können von dieser Liste abweichen. Welche Fassung gilt, ist vor Verwendung zu prüfen (Stand Oktober 2026).` Karte K-8.3-02 mit „(Fassung von 2006)“ bleibt richtig.

### Niedrig

**N1. Gendern in neu geschriebenem Text.** „Vertreter“ (`fu7/7.1` Paar 1: „die gesetzlichen Vertreter“; das Gesetz selbst nennt „Vertreter oder Vertreterinnen“) → „gesetzlichen Vertreter:innen“. „Arbeitnehmern“ (`fu7/7.2` Paare 0 und 1) → „Arbeitnehmer:innen“. „Einweisung der Anwender“ (`dv5/12.2`) → „der Anwender:innen“ (so schreibt es `fu1/1.3`). „Auftraggeber“ (`dv2/9.4`, mehrfach) ist als Vertragsrolle im Bestand üblich, unkritisch. Alle bis auf den Satz zu den Vertretern standen schon so im Bestand.

**N2. `fu7/7.1` Paar 0: „Dazu gehören unter anderem …“** steht jetzt hinter der Klammer „(§ 11 BBiG; Stand …)“; „Dazu“ bezieht sich nicht mehr eindeutig auf „wesentlichen Inhalt“. Vorschlag: „Zum wesentlichen Inhalt gehören unter anderem“. Der Rest des Satzes ist gegenüber § 11 Abs. 1 und 2 BBiG richtig (Vertragsschluss formfrei, Textform, unverzüglich, spätestens vor Beginn, Übermittlung speicher- und ausdruckbar, Empfangsnachweis).

**N3. `fu7/7.2` Paar 0: „die dem Betrieb seit sechs Monaten angehören“** ohne „in der Regel“. § 8 Abs. 2 BetrVG nimmt neu gegründete Betriebe (unter sechs Monaten) aus; Rechtsangabe Nr. 12 erwähnt das, der Lerntext nicht. Vorschlag: „… die dem Betrieb in der Regel seit sechs Monaten angehören“. Wahlberechtigt ab 16 (§ 7), wählbar ab 18 und sechs Monate (§ 8 Abs. 1), fünf Wahlberechtigte, drei wählbar (§ 1 Abs. 1): am Rohtext bestätigt.

**N4. `fu6/6.2` Paar 0 (BDSG): „in der Diskussion“ untertreibt.** Die Bundesregierung hat die Aufhebung von § 38 Abs. 1 BDSG (Föderale Modernisierungsagenda, Dezember 2025) angekündigt; ein Gesetzentwurf oder Beschluss war laut Websuche nicht zu finden. Schwelle 20 im Rohtext bestätigt. Vorschlag: „… eine Aufhebung der Benennungspflicht ist angekündigt, aber nicht beschlossen.“ Der Seitenkopf-Vermerk in `rechtsangaben-fi.md` Nr. 13 („zuletzt geändert durch Art. 3 G v. 12.5.2026“) war auf der von mir abgerufenen Einzelnormseite nicht zu sehen; unerheblich für die Aussage.

**N5. `si5/12.3` Paar 0: „§ 25 FIAusbV“ statt „§ 25 Absatz 2 FIAusbV“.** Alles, was der neue Satz aussagt (drei Bereiche, schlechter als „ausreichend“, Ausschlag, nur ein Bereich), steht in § 25 **Abs. 2** (Satz 1 Nr. 1 bis 3, Satz 2). Die Begründung der Übersicht („Satz 2 gehört zu Absatz 2, Absatz 3/4 ebenfalls berührt“) führt also zu „Absatz 2“, nicht davon weg. K-12.3-05 und Q-12.3-03 nennen weiter „Abs. 2“. Vorschlag: „nach § 25 Absatz 2 FIAusbV“ beibehalten. Inhalt und `si3/10.1` („§ 25 FIAusbV“, Sammelverweis) sind richtig. Optional in `si3/10.1` ergänzen: Gewichtung 2:1 (Fachlehrer FL-SI-24 nennt sie).

**N6. Normaussage `fu3/3.3` Paar 0 und `dv3/10.3` Paar 0 („heißt dort Instandsetzung (korrektive Instandhaltung)“).** Sekundär bestätigt: DIN 31051 gliedert Instandhaltung in Wartung, Inspektion, Instandsetzung, Verbesserung. „Instandsetzung“ ist eine Grundmaßnahme, „korrektive Instandhaltung“ eine Instandhaltungsart nach EN 13306; „heißt dort“ setzt beide gleich. Vorschlag: „… entspricht dort der Instandsetzung bzw. der korrektiven Instandhaltung“. Stand-Hinweis und „Normen sind keine Rechtsvorschriften“ stehen im Text, Aussage bleibt „aus Kenntnis“ (Rechtsangaben Nr. 23 korrekt so eingestuft). K/Q mit „korrektive/reaktive Wartung“ bleiben mit dem Hinweis vereinbar.

**N7. Praxisempfehlung als Regel (`dv2/9.4` Paar 0): „Der Vorbehalt gehört deshalb in das Abnahmeprotokoll.“** Das Gesetz verlangt nur den Vorbehalt „bei der Abnahme“, keine Form. Vorschlag: „Der Vorbehalt sollte deshalb im Abnahmeprotokoll vermerkt werden.“ Rechtlich im Übrigen am Rohtext bestätigt: § 640 Abs. 1 Satz 2, Abs. 3 (Nr. 1 bis 3 des § 634; Schadensersatz Nr. 4 ausgenommen), § 641 Abs. 1, § 634a Abs. 1, 2.

**N8. `dv5/12.2` Paar 0: Kurzverweis nennt Thema, Titel und Fachgebiet nur als Code** („im Fachgebiet DV2“, „im Fachgebiet FU1“). Register-Regel: Fachgebiet mit Titel. Vorschlag: „im Fachgebiet DV2 „Errichten, Ändern und Prüfen von vernetzten Systemen““ und „im Fachgebiet FU1 „Projekt- und Auftragsabwicklung““. Titel der Themen 9.4 und 1.3 stimmen.

**N9. Rechtsangaben (`rechtsangaben-fi.md`).** Nr. 3: §§ 107, 108 BGB habe ich gelesen (Einwilligung des gesetzlichen Vertreters, Genehmigung) – kann auf „am Gesetzestext gelesen“ angehoben werden. Nr. 10: siehe M2. Nr. 13: siehe N4. Nr. 26 bleibt „vermutet“, siehe M3. Zeile Nr. 7 („Satz 9 … letzter Satz“) stimmt: Satz 9 ist der Fristensatz. Nicht-Änderung `fu7/7.1`: „Kündigung nach der Probezeit schriftlich mit Gründen“ ist richtig; § 22 Abs. 3 BBiG verlangt die Schriftform auch in der Probezeit (Gründe nur nach der Probezeit); der Lerntext sagt das nicht, ist aber nicht falsch (Merkposten wie vom Autor genannt).

## Quiz und Konsistenz nach den Änderungen

- `fu7/7.1`, `7.2`, `7.4`: keine Karte und kein Quiz widerspricht den neuen Theorietexten; K-7.2-15 (Antwort mit „in der Regel“ und „drei wählbar“) ist konsistent zur Theorie; kein Item nennt „wählbar ab 18“, „schriftlich niedergelegt“ oder die alte AU-Fassung. Fall F-FU7-01 und Glossar enthalten keine abweichende Aussage (Probezeit-Kündigung ohne Frist und Gründe bleibt richtig).
- `dv2/9.4`: Q-9.4-13 siehe M1; K-9.4-19, Q-9.4-10 („Einweisung, Dokumentation und Abnahme bilden die Übergabe“) passen zur neuen Fassung von `dv5/12.2`. Fall in `dv2/fallaufgaben.md` Z. 139 bis 144 („keine Schönheitsfehler … Abnahme ohne Nachweis nicht empfehlenswert“) ist mit dem Satz „bei wesentlichen Mängeln darf verweigert werden“ vereinbar. `fu1/1.3` (alle Kurse) führt „Übergabe“ und „Abnahme“ als Nachbarabschnitte, nicht als Ober-/Unterbegriff; kein Widerspruch zum Wortlaut, aber leicht abweichende Lesart (Hinweis, P-AX Teil C).
- `si3/10.1`, `si5/12.3`: Q-12.3-03 (Falsch) und K-12.3-05 bleiben richtig; keine zweite Aussage zur Ergänzungsprüfung in SI widerspricht. In AE, DP und DV (`ae3/10.1`, `ae5/12.1`, `dp5/12.1`, `dp5/12.3`, `dv5/12.1`, `dv5/12.3`) nennen die Texte nur die zulässigen Bereiche (richtig, aber ohne „schlechter als ausreichend“ und „Ausschlag“); Ungleichheit zwischen den Kursen, kein Fehler.
- `ae1/8.3`: K-8.3-02 neue Frage passt zur Antwort (sieben Grundsätze von 2006). `ae3/10.2` Z. 123 und Karte Z. 238 sprechen von „Grundsätze der Dialoggestaltung … ISO 9241-110 (geläufige Bezeichnung)“ ohne Fassung; kein Widerspruch, nur ohne Jahreshinweis.

## Hausregeln

Karten und Quiz: keine neuen Paragrafen und Gesetzesnamen (K-7.2-15, K-8.3-02, Q-9.4-13 ohne). Theorie nennt Paragrafen nur als Stützangabe, jeweils mit „Stand Oktober 2026, vor Verwendung prüfen“ (in `dv5/12.2` nicht nötig, keine Rechtsaussage). Keine Arbeitsvermerke, Ich-Sätze oder Randnummern im Lerntext. Gendern siehe N1. Zielgruppe Erwachsene: die Aussagen zu Minderjährigen in `fu7/7.1` sind Rechtsgrundlagen, keine Ansprache Minderjähriger.

## Bestand und Spiele (nur gelesen)

Suche in `apps/api/src/db/content/game-*.ts` (Memory, Duell, Kreuzworträtsel, Phishing, Prozessreihenfolge), `packages/shared/src` und Prüfblättern nach Ausbildungsvertrag, Nachweisgesetz, wählbar, Betriebsrat, Arbeitsunfähigkeit, Ergänzungsprüfung, Abnahme, Mängel, Instandhaltung, 9241, Textform: keine widersprechende Fundstelle. `game-prozessreihenfolge.ts` Z. 175 bis 177 („Abnahmetest“) bezeichnet die Teststufe, kein Rechtsbegriff.
