# Prüfung P-AU Teil A / GS-A (unabhängige Prüfung von `ersetzungen-a.json`)

Stand 23.10.2026. Geprüft: alle 45 Paare, `rechtsangaben-a.md` (29 Zeilen), `befund-uebersicht-a.md`. Rohtext von gesetze-im-internet.de per `curl` gelesen (21 Normen): SGB XI §§ 18, 112, 113, 113a, 114, 114a; InsO §§ 15a, 17, 18, 19; SGB V §§ 37, 132a, 278 (und 411 bis 413 zur Suche nach Übergangsregeln); SGB I § 35; SGB X § 67; StGB § 203; PflBG § 4; HWG §§ 1, 3; BDSG §§ 1, 22. Dazu Websuche und Kabinettsentwurf zum MDK-Reformgesetz (PDF des BMG, per `pdftotext`), vdek-Glossar, FAQ Medizinischer Dienst Sachsen-Anhalt (nur Sekundärquellen; BGBl.-Text des Gesetzes selbst war nicht abrufbar).

## Gesamturteil

Keine hohen Befunde. Alle Rechtsaussagen zu InsO, SGB XI (§§ 18, 112, 113, 114, 114a), SGB V (§§ 37, 278), SGB I § 35, SGB X § 67, PflBG § 4, HWG §§ 1 und 3 stimmen mit dem Rohtext. Die Mechanik ist sauber. Offen sind fünf mittlere Befunde (M1 bis M5) und mehrere niedrige.

## Mechanik (Gegenprobe)

- Alle 45 Paare nacheinander auf dem aktuellen Bestand angewendet (Skript im Scratchpad): jede alte Zeichenkette genau ein Treffer, alle einzeilig, keine neue Zeichenkette enthält ihre alte, kein Paar ohne Wirkung, 0 Fehlschläge.
- Alle `#### `-Überschriften (Item-IDs) je Datei unverändert; in den drei Fachgesprächsdateien sind alle Fragezeilen und alle Rückfragen byte-gleich (51/47/41 Zeilen verglichen). Nur Erwartungen geändert, in `hb3/fachgespraech.md` zwei neu (dort sind die Dateizeilen 167 -> 169; Paar 33 ist mehrzeilig, die Dateien sind CRLF, `einspielen.cjs` wandelt LF/CRLF selbst um, kein Befund).
- Team GS-B: `ersetzungen-b.json` liegt noch nicht vor. Die Dateien von Teil A (hb1, hb3, hb6) und Teil B (hb4, hb5) sind disjunkt; Überschneidung der Zeichenketten ist damit ausgeschlossen, solange Teil B nur HB4/HB5 anfasst (nach Vorliegen erneut prüfen).
- Rest-Suche im Bestand nach den korrigierten Begriffen (MDK, Reform 2020, Insolvenzgründe, Erstbegutachtung, Fachkräften vorbehalten, branchenüblich, HWG-nah, Pflegevisite, § 113 SGB, §§ 67): alle Treffer liegen in Paaren oder sind die gewollt stehenbleibenden Rückfragen (`hb1/fachgespraech.md` Z. 38, 46: "Wie hieß der Medizinische Dienst vor der Reform 2020?"). Kein verbleibender Widerspruch im Kurs.

## Befunde

### Mittel

**M1. Q-1.1-10 Erklärung (Paar 9): Datumsangaben als Tatsache, die laut Rechtsangaben Nr. 10 nur "vermutet" sind, und "Bundesdienst folgte 2022" ist nicht belegt.**
Neue Erklärung: "Die Landesdienste wurden bis 2021 zu eigenständigen Körperschaften ... mit dem Namen Medizinischer Dienst, der Bundesdienst folgte 2022." Meine Prüfung: Gesetz in Kraft 1.1.2020 (Art. 15 Abs. 1 im Kabinettsentwurf, vdek, MD Sachsen-Anhalt); Landesdienste Körperschaften bis 1.7.2021 (Satzungsgenehmigung bis 30.6.2021 im Kabinettsentwurf, FAQ MD Sachsen-Anhalt: "bis zum 1. Juli 2021"). Für den Bundesdienst nennt der Kabinettsentwurf für die Satzung ebenfalls den 30.6.2021 (Art. 8 Abs. 5), vdek nennt nur den **1.1.2022 als Übergang der Trägerschaft** auf die Landesdienste, eine Websuche zusätzlich den 31.12.2021. "Der Bundesdienst folgte 2022" stimmt also so nicht belegbar. Der Fachlehrer-Termin 01.01.2022 betrifft den Bundesdienst (Trägerschaft), nicht die Umbenennung der Landesdienste: das Urteil der Autorin in Nr. 10 bestätigt sich. Die Erklärung im Quiz kann keinen "Stand"-Hinweis tragen und darf nicht mehr behaupten, als belegt ist.
Korrektur (Paar 9, neue Zeichenkette): `**Erklärung:** Die Umbenennung erfolgte im Rahmen der MDK-Reform, deren Gesetz seit 2020 gilt: Die Landesdienste wurden bis Mitte 2021 zu eigenständigen Körperschaften des öffentlichen Rechts mit dem Namen Medizinischer Dienst; die Umstellung insgesamt war 2022 abgeschlossen.` (Das deckt sich mit der vorsichtigeren Theorie "bis 2022 schrittweise umgesetzt".) Rechtsangaben Nr. 10 dann Spalte "Sicherheit": "Sekundärquellen und Kabinettsentwurf; BGBl.-Text nicht gelesen".

**M2. Q-3.2-07 (Paare 28 bis 32): richtige Antwort ist auffällig die kürzeste (38 Zeichen gegen 48, 49, 51).**
Der Befund FL-GS-30 und die Befundübersicht nennen die Auffälligkeit selbst ("38 Zeichen kürzer") und beheben sie durch die Neufassung nicht: neue Distraktoren 49 / 48 / 51 Zeichen, richtige Option unverändert 38. Auftrag: richtige Antwort nie die längste und nicht auffällig die kürzeste.
Korrektur: Paar 29/30/31 so lassen, aber die richtige Option mit einem weiteren Paar auf `- [x] Tourenplanung und Dienstplangestaltung des Teams` (47 Zeichen) ändern, oder Paar 32 und die Option gemeinsam. Alternativ die Distraktoren kürzen (z. B. "Pflegebedarf erheben und planen" statt 48 Zeichen).

**M3. Q-3.2-07 Distraktor "Pflegedokumentation zu den eigenen Einsätzen führen" (Paar 31) kollidiert mit Bestand im selben Thema.**
Q-3.2-03 (unverändert) ordnet "Verwaltung/Pflegedienstleitung ↔ Tourenplanung und Dokumentation" zu, K-3.2-12 und die Theorie nennen Dokumentation als Aufgabe von Verwaltung/Pflegedienstleitung. Als Aufgabe der Pflegefachkraft in Q-3.2-07 ist "Dokumentation" der eigenen Einsätze fachlich richtig, aber Lernende, die Q-3.2-03 gelernt haben, werden irritiert; auch die neue Erklärung nennt Dokumentation als Aufgabe der Pflegefachkraft. Die Eindeutigkeit der Frage bleibt (Tourenplanung ist klar), der Lerneffekt leidet.
Korrektur (Paar 31, neue Zeichenkette): `- [ ] Pflegehilfskräfte bei delegierten Aufgaben anleiten` (Option 51 Zeichen; zusammen mit M2 die Längen neu abgleichen) und in Paar 32 (Erklärung) "und die Dokumentation der eigenen Einsätze" durch "und die Anleitung der Pflegehilfskräfte" ersetzen. Die Distraktorlängen dabei zusammen mit M2 neu auswerten.

**M4. Delegation von Behandlungspflege (T 3.2 Paar 23, FG 3.2 Paar 33; Rechtsangaben Nr. 23 "vermutet"): als Regel formuliert, ohne Normbeleg.**
Rohtext SGB V § 37 und § 132a gelesen: § 37 Abs. 1 verlangt nur "geeignete Pflegekräfte"; § 132a Abs. 1 überträgt Eignung, Qualitätssicherung und Pflegeprozessverantwortung den Rahmenempfehlungen; das Wort Pflegehilfskraft oder Delegation steht in beiden Normen nicht. Die Aussage "Die Pflegefachkraft entscheidet ... welche einzelne Maßnahme sie delegiert, ... bleibt für Auswahl, Anleitung und Kontrolle verantwortlich" ist plausibel, aber nur Sekundärquellen (Kursanbieter, Merkblätter) stützen sie, und diese nennen Länderunterschiede (Landesverträge, z. B. subkutane Injektionen je nach Land). "Entscheidet" liest sich wie eine bundesweite Regel; die FG-Erwartung hat nicht einmal einen "Stand"-Hinweis.
Korrektur (Theorie, Satz in Paar 23): `Welche einzelnen Maßnahmen der Behandlungspflege an entsprechend qualifizierte Pflegehilfskräfte delegiert werden dürfen, richtet sich nach der ärztlichen Verordnung, den Richtlinien und den Verträgen vor Ort (je nach Land unterschiedlich); die Pflegefachkraft bleibt für Auswahl, Anleitung und Kontrolle verantwortlich (Stand Oktober 2026, vor Verwendung prüfen).` FG-Erwartung (Paar 33, zweite Zeile): `Ob und welche einzelnen Maßnahmen der Behandlungspflege an qualifizierte Pflegehilfskräfte delegiert werden dürfen, richtet sich nach Verordnung, Richtlinien und Verträgen; die Pflegefachkraft bleibt für Auswahl, Anleitung und Kontrolle verantwortlich.` Rechtsangaben Nr. 23 bleibt "vermutet", mit Zusatz "§§ 37, 132a SGB V enthalten keine Delegationsregel (Rohtext gelesen)".

**M5. Q-6.3-09 Erklärung (Paar 42): neuer Satz "Das Baugesetzbuch regelt keine Werbung" ist als Absolutaussage angreifbar.**
Werbeanlagen (Außenwerbung) können bauplanungs- und bauordnungsrechtlich geregelt sein (Bebauungspläne, Landesbauordnungen); "regelt keine Werbung" ist in dieser Allgemeinheit zu weit. Neuer Satz im Bestandsquiz, ohne Quelle. Die Option selbst bleibt als Distraktor in Ordnung (BauGB regelt nicht den Inhalt von Werbeaussagen).
Korrektur (Paar 42, letzter Satz): `Das Baugesetzbuch regelt nicht, was Werbeaussagen über Pflegeleistungen enthalten dürfen.`

### Niedrig

**N1. Q-6.3-09 Längenverhältnis.** Mehrfachauswahl mit drei richtigen und einer falschen Option; die falsche ("Das Baugesetzbuch.", 18 Zeichen) ist weit die kürzeste, die längste Option (Berufsordnungen, 83 Zeichen, unverändert) ist richtig. Paar 41 verkürzt die HWG-Option (62 statt 66), verschlimmert nichts. Bestandsmangel; Vorschlag nur bei Gelegenheit: falsche Option länger fassen ("Das Baugesetzbuch (Bauplanungsrecht)." wäre ein neuer Zusatz; Hausregel: keine neuen Gesetzesnamen, deshalb nur Zusatz im Klammertext, keine neue Norm).

**N2. F-HB1-02 (Paar 21/22): "nur wenige Arbeitstage" gegen "zwei Arbeitstage" in der Musterlösung.** Der Fall sollte dasselbe sagen. Korrektur Paar 21: "Prüfungen werden grundsätzlich nur zwei Arbeitstage vorher angekündigt." TA4 im Aufgabentext (unverändert, nicht in Teil A) sagt "die anstehende Qualitätsprüfung"; zur neuen Ausgangslage ("jederzeit bevorstehen kann") passt "mögliche nächste Regelprüfung" besser: ein weiteres Paar auf `Erläutern Sie, worauf sich die anstehende Qualitätsprüfung durch den Medizinischen Dienst typischerweise bezieht` -> `... worauf sich eine Qualitätsprüfung durch den Medizinischen Dienst typischerweise bezieht`. Punkteraster (5+5+5+5 = 20) bleibt unverändert; die Musterlösung nennt allerdings Ankündigungsfrist, Anlassprüfung und Wohnung, die die Aufgabe nicht erfragt. Ergänzung im Aufgabentext optional ("und wie sich der Dienst auf eine kurzfristig angekündigte Prüfung vorbereitet").

**N3. Gendern.** Neue Texte nutzen "der Schuldner" (Paare 10, 12, 13, 14, 18; Karten, Quiz und Fachgespräch). Das ist der Gesetzesbegriff, nach Hausregel besser "Schuldner:in" oder "die Schuldnerin oder der Schuldner" (Theorie), in Karten "der Schuldner bzw. die Schuldnerin". Sonst durchgehend gegendert (Pflegefachpersonen, Gutachter:innen, Ehrenamtliche).

**N4. Theorie 1.1 "Insolvenz": Vereine und Stiftungen.** § 15a Abs. 7 InsO nimmt Vereine und Stiftungen mit § 42 Abs. 2 BGB aus (eigene Regel im BGB). Der Lerntext sagt "juristische Person wie der gGmbH" und ist deshalb nicht falsch, aber in 1.1 stehen Verein und Stiftung als Träger. Optional im Klammertext (Paar 10): "für Vereine und Stiftungen gilt eine eigene Regel im Bürgerlichen Gesetzbuch".

**N5. Theorie 1.1 "Institutionelle Partner" (nicht geändert).** "begutachtet der MD im Einzelfall ... die Pflegebedürftigkeit" (und die FG-Erwartungen Z. 36/48) steht neben dem neuen 1.3-Text "Medizinischer Dienst oder andere unabhängige Gutachter:innen" (§ 18 Abs. 1 SGB XI, Rohtext). Kein Widerspruch, aber ungleich vollständig; Vorschlag für später: "beauftragt der MD oder andere unabhängige Gutachter:innen".

**N6. Theorie 3.2 "Berufserlaubnis nach dem Pflegeberufegesetz" (Paare 23, 33).** § 4 Abs. 1 PflBG sagt "Erlaubnis nach § 1" (zum Führen der Berufsbezeichnung); "Berufserlaubnis" ist vereinfacht (fortgeltende Erlaubnisse nach altem Recht nach § 64 PflBG nicht gelesen, in Rechtsangaben Nr. 21 vermerkt). Vorschlag: "Erlaubnis zum Führen der Berufsbezeichnung nach dem Pflegeberufegesetz".

**N7. F-HB6-03 (Paar 43).** Satzbau "sollte UWG (...), das HWG, soweit die Werbeaussagen einen Krankheitsbezug haben, sowie die ethischen Grundsätze" ist verständlich; kein Befund außer fehlendem "Stand"-Hinweis im Fall (nur Name, keine neue Paragrafennennung, deshalb nicht verlangt).

**N8. `quelle` der Frontmatter.** `hb1/1.1`, `hb3/3.2`, `hb6/6.3` nennen die neu zitierten Normen (SGB I, SGB X, StGB, PflBG, SGB V, InsO) nicht; wie bei früheren Paketen beim Einspielen mitzuziehen (Auftraggeber setzt nur `rechtsstand`).

## Rechtsfaktencheck am Rohtext

| Aussage der Paare | Ergebnis |
|---|---|
| § 112 Abs. 1: Träger bleiben für die Qualität verantwortlich; Abs. 2: zugelassene Einrichtungen sind verpflichtet, Qualitätssicherung und Qualitätsmanagement nach Maßgabe der Vereinbarungen nach § 113 durchzuführen und bei Prüfungen mitzuwirken | bestätigt; FL-GS-13 sauber umgesetzt (Pflicht in § 112, Maßstäbe in § 113) |
| § 113 Abs. 1: Vertragsparteien auf Bundesebene vereinbaren Maßstäbe und Grundsätze für Qualität, Qualitätssicherung, Qualitätsdarstellung und einrichtungsinternes Qualitätsmanagement; unmittelbar verbindlich | bestätigt |
| § 113a | "(weggefallen)", bestätigt; wird zu Recht nicht zitiert |
| § 114 Abs. 1, 2: Prüfaufträge der Landesverbände an MD, PKV-Prüfdienst (10 Prozent) oder Sachverständige; Regelprüfung im Abstand von höchstens einem Jahr, Verlängerung bei guter Qualität nach § 114c; Regelprüfung umfasst auch die nach § 37 SGB V erbrachte häusliche Krankenpflege und die Abrechnung dieser Leistungen | bestätigt (Abs. 1a digitale Prüfaufträge ab 1.1.2028, Plattform bis 31.10.2027, ebenfalls im Rohtext) |
| § 114a Abs. 1 Satz 2: Prüfungen grundsätzlich zwei Arbeitstage zuvor anzukündigen, Anlassprüfungen sollen unangemeldet erfolgen; Abs. 2 Satz 2: ambulante Dienste, Prüfung in der Wohnung mit Einwilligung der versorgten Person | bestätigt (Ausnahme für gemeinschaftliche Wohnformen und Wohnrecht nach Abs. 2 Satz 2 Halbsatz 2 und Satz 3 im Kurs nicht behandelt, in Ordnung) |
| § 18 Abs. 1 SGB XI: Pflegekassen beauftragen MD oder andere unabhängige Gutachter:innen | bestätigt (FL-GS-46) |
| InsO § 17 (Zahlungsunfähigkeit allgemeiner Eröffnungsgrund), § 18 Abs. 1 (drohende Zahlungsunfähigkeit nur auf Antrag des Schuldners; Abs. 3 Vertretungsberechtigung), § 19 Abs. 1 (Überschuldung bei juristischen Personen), § 15a Abs. 1 (Antragspflicht bei Zahlungsunfähigkeit und Überschuldung; drei bzw. sechs Wochen; keine Pflicht bei drohender Zahlungsunfähigkeit) | bestätigt; Lerntext korrekt. § 15a Abs. 7 nimmt Vereine und Stiftungen aus (siehe N4) |
| SGB V § 278 Abs. 1: in jedem Land ein Medizinischer Dienst als Körperschaft des öffentlichen Rechts | bestätigt |
| SGB I § 35 Abs. 1: Sozialgeheimnis gegenüber Leistungsträgern, Verbänden, Arbeitsgemeinschaften u. a.; SGB X § 67 Abs. 2: Sozialdaten = von einer in § 35 SGB I genannten Stelle verarbeitete personenbezogene Daten | bestätigt; Folgerung "binden vor allem die Leistungsträger, nicht ohne Weiteres einen privaten Pflegedienst" vorsichtig und richtig (Abs. 1 nennt zusätzlich "die Stellen, die Aufgaben nach § 67c Absatz 4 SGB X wahrnehmen"; Lerntext sagt "nicht ohne Weiteres") |
| StGB § 203 Abs. 1 Nr. 1: Angehörige eines Heilberufs mit staatlich geregelter Ausbildung | bestätigt; Einordnung der Pflegefachpersonen ist Auslegung, im Lerntext ohne Pflegefachperson-Detail angemessen |
| BDSG § 1 Abs. 1 Satz 2, Abs. 4 (nichtöffentliche Stellen), § 22 (Ausnahmen von Art. 9 Abs. 1 DSGVO) | bestätigt |
| PflBG § 4 Abs. 1 bis 3: vorbehaltene Aufgaben (Pflegebedarf erheben und planen, Pflegeprozess organisieren und steuern, Qualität sichern); Arbeitgeber dürfen sie Personen ohne Erlaubnis nicht übertragen | bestätigt; Streichung "Behandlungspflege ist Fachkräften vorbehalten" richtig |
| SGB V § 37 Abs. 1, 2: häusliche Krankenpflege (Grund- und Behandlungspflege) durch geeignete Pflegekräfte; Behandlungspflege, wenn zur Sicherung des Ziels der ärztlichen Behandlung erforderlich | bestätigt |
| HWG § 1 Abs. 1 Nr. 1, 1a, 2 (Mittel, Verfahren, Behandlungen nur bei Krankheitsbezug u. a.), § 3 Satz 2 Nr. 2 Buchstabe a (Erfolg mit Sicherheit) | bestätigt; kein "Standard"-Maßstab im Gesetz (Negativbefund bestätigt); HWG-Subsumtion für Pflegedienste als "im Einzelfall" richtig vorsichtig |
| MDK-Reformgesetz: Inkrafttreten 1.1.2020; Landesdienste bis 1.7.2021 Körperschaften; MD-Bund-Trägerschaft 1.1.2022 | nur Sekundärquellen und Kabinettsentwurf (siehe M1); Rechtsangaben-Zeile "vermutet" ist die richtige Einstufung |
| Delegation an Pflegehilfskräfte | keine Rohtext-Stütze in SGB V §§ 37, 132a (siehe M4); "vermutet" ist die richtige Einstufung |

Die beiden "vermutet"-Zeilen (10, 23) sind im Lerntext **hedged** dargestellt in der Theorie ("bis 2022 schrittweise umgesetzt", "soweit ... zulassen" plus Stand-Hinweis), aber **nicht** durchgängig: Q-1.1-10 Erklärung (M1) behauptet Jahreszahlen als gesichert, die FG-Erwartung zur Delegation (M4) trägt keinen Hinweis.

## Quiz-/Fallkonsistenz

- K-1.1-04, K-1.1-14, FG 1.1: drei Eröffnungsgründe, Bedingungen und Antragspflicht konsistent; Q-1.1-08 (zwei Gründe, Akzeptierte Antworten unverändert, Frage "beiden ... bei deren Vorliegen ... anmelden muss") bleibt richtig, Erklärung ergänzt; K-1.1-15 passt.
- Q-1.3-09 (Sortieren): genau vier Elemente, Reihenfolge Erstkontakt, Erstbesuch mit Pflegeassessment und Planung, Tour, Leistungserbringung stimmig mit der Erklärung, Theorie 1.3 und FG; keine Längenfrage (Sortieren).
- Q-3.2-07: M2/M3. Q-3.2-03/04 und K-3.2-15 stimmig; Q-3.2-12 Distraktor bleibt zulässig.
- F-HB1-02: N2; Punkteraster 5+5+5+5 = 20 unverändert, Ausgangssituation, Aufgabe und Musterlösung zur zweitägigen Ankündigung sonst konsistent.
- Q-6.3-06 (Erklärung nennt weiter § 5 UWG und § 3 HWG: im Bestand schon vorhanden), Q-6.3-09 (genau drei richtige Optionen, Rest: M5/N1), K-6.3-14/19/22, F-HB6-03 TA4 und FG 6.3: untereinander stimmig; "branchenüblicher Standard" nur noch als Negativaussage.

## Hausregeln

- Keine Arbeitsvermerke im Lerntext (Suche nach "gelesen", "vermutet", "Rohtext", "Ich", "Annahme": kein Treffer in den neuen Zeichenketten). "Stand Oktober 2026, vor Verwendung prüfen" steht in T 1.1 (dreimal), F-HB1-02 TA4, T 3.2, T 6.3.
- Karten/Quiz: keine neue Paragrafennummer, kein neuer Gesetzesname (Datenschutz-Grundverordnung, MDK-Reform, UWG, HWG, BauGB standen schon im Bestand). Paragrafen nur in Theorie, Fall und FG-Erwartungen.
- Karten und Quiz duzen, Fälle und Fachgespräch siezen/neutral: kein Verstoß. Erwachsenenkurs, Minderjährige nicht Zielgruppe: kein Verstoß.
- Praxis nicht als feste Regel: Theorie 6.3 ("In der Praxis ... sollten") unverändert und als Empfehlung formuliert.
- Gendern: N3.

## Bestand und Spiele (nur gelesen)

- Prüfblatt `docs/pruefblaetter/11-gesundheit-soziales.md` Z. 267 ("in der Regel vom Medizinischen Dienst begutachtet") und Z. 332 ("Ärztlich verordnete Behandlungspflege läuft über die Krankenversicherung"): kein Widerspruch.
- `game-kennzahlen-duell-gesundheit-sozialsystem.ts`, `game-memory-gesundheit-soziales.ts`, `game-kreuzwortraetsel-gesundheit-soziales.ts`: Suche nach MDK, Medizinischer Dienst, Insolvenz, Behandlungspflege, HWG, Werbe, Datenschutz, Begutachtung: kein Widerspruch (Kreuzworträtsel Z. 126 bis 129 Ehrenamt "Ersetzt keine ausgebildete Fachkraft", "keine fachpflegerischen Aufgaben": bleibt richtig, wenn auch Wortwahl "Fachkraft" leicht enger als der neue Lerntext; kein Handlungsbedarf).

## Zahlen

45 Paare mechanisch geprüft; 21 Normen am Rohtext gelesen (6 SGB XI, 4 InsO, 3 SGB V, je 1 SGB I, SGB X, StGB, PflBG, 2 HWG, 2 BDSG); 29 Zeilen in `rechtsangaben-a.md` abgeglichen; Befunde: 0 hoch, 5 mittel, 8 niedrig.
