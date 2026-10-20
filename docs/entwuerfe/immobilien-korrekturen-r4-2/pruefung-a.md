# Prüfung P-AM Teil A (Immobilienfachwirt: WEG, Fremdgelder, Rechnungswesen der Verwaltung, Grundbuch, Kündigung)

Stand 20.10.2026. Geprüft: `ersetzungen-a.json` (79 Paare, 10 Dateien), `rechtsangaben-a.md`, `befund-uebersicht-a.md`. Maßstab: `auftrag.md` (P-AM), Auftrag P-AL, Fachlehrer-Bericht (FL-IM-08, 11, 18, 19, 23, 26, 28, 31, 56, 57), Prüfprotokoll P-AL.

**Ergebnis in Kürze:** Mechanik fehlerfrei, kein hoher Befund, 6 mittlere, 10 niedrige. Die drei Abweichungen vom Fachlehrer-Bericht (Beirat nur Vorsitz und Stellvertretung; § 27 WEG ohne Vermögenstrennung; „rechtsfähiger Verband“) sind am Rohtext richtig. Alle Rechtsaussagen im Kurstext stimmen mit dem Rohtext überein; Beanstandungen betreffen Präzision, ein ungenaues Wort (Vormerkung), einen nicht angefassten Bericht-Punkt (GbR) und Hausregeln.

## 1. Mechanik

- Alle 79 alten Zeichenketten treffen den aktuellen Bestand genau einmal und einzeilig (Kopie von `content/immobilienfachwirt/`, Paare nacheinander angewendet, CRLF-frei). Keine identischen Paare.
- **Überschneidung A/B:** gemeinsame Dateien `hb4/fallaufgaben.md` (A 3, B 2), `hb2/fachgespraech.md` (A 2, B 3), `hb1/1.1` (A 14, B 1), `hb1/fachgespraech.md` (A 1, B 2). Keine Textüberlappung der alten Zeichenketten; A dann B und B dann A laufen beide ohne Fehlschlag (0 Probleme). `hb3/*` berührt A nicht.
- Item-IDs unverändert, kein Fachgesprächs-Fragetext geändert (die Rückfrage in `hb2/fachgespraech.md` #2 ist eine Rückfrage, kein Fragetext des Hauptblocks; vertretbar, aber im Auftrag als „Fragetext“ zu lesen: siehe N-5).
- Quizlogik: Q-1.1-02 hat genau eine richtige Option, sie (63 Zeichen) ist nicht die längste (Distraktor 1: 67). Q-4.2-04 Lückentext ein markiertes Wort, Q-4.2-06 Akzeptierte Antworten passen zur neuen Frage, Q-2.3-11 ein Lückenwort. Zonenzeilen Q-4.2-12, -14 bis -17: 1 Zeile je Zeile ersetzt, Zonenzahl und Zonenbezeichnungen unverändert; keine Zeile doppelt zugeordnet.
- Q-4.2-11 hat drei Elemente (Auftraggeber-Entscheidung 08.10., nur Erinnerung: Hausregel „genau 4“).
- Zeichenkettenebene (Kopie in Bestand eingesetzt, Anschlussstellen gelesen): #1, #3, #5, #7, #15, #27, #33, #36, #37 (hb4/4.2), #3 (hb2/2.1), #1 (hb4/fallaufgaben), #10 (hb1/1.1) — Satzzeichen und Anschlüsse stimmen.

## 2. Am Rohtext geprüfte Rechtsaussagen (gesetze-im-internet.de, Abruf 20.10.2026)

38 Normen gelesen: WEG §§ 9a, 9b, 18, 19, 20, 23, 24, 25, 26, 26a, 27, 28, 29, 44, 45, 48; BGB §§ 549, 551, 573a, 705, 713, 719, 873, 883, 892, 925; GBO §§ 1, 3, 47; HGB §§ 242, 264, 267, 267a; MaBV §§ 1, 6, 11, 15; GewO § 34c. Alle von A genannten Fundstellen stimmen:

- § 24 Abs. 4: Textform; Frist **soll** drei Wochen betragen, außer Dringlichkeit. ✓. Abs. 2 (mehr als ein Viertel, Textform), Abs. 3 (Beiratsvorsitz, Vertreter, ermächtigter Eigentümer) ✓. § 23 Abs. 2, 3 (Satz 2 Mehrheitsumlauf), 4 ✓.
- § 19 Abs. 2 Nr. 6, § 18 Abs. 2, § 48 Abs. 4 (ab 01.12.2023; Fiktion bis 01.06.2024), § 26a Abs. 1 (IHK-Prüfung): ✓, Ausnahme „weniger als neun Sondereigentumsrechte, ein Eigentümer als Verwalter, weniger als ein Drittel (§ 25 Abs. 2, Kopfstimmrecht)“ ✓.
- **Beirat** (§ 29 Abs. 1): „ein Vorsitzender und ein Stellvertreter“ bei mehreren Mitgliedern; keine Beisitzer. Abweichung vom Bericht ist richtig. § 29 Abs. 2 (unterstützt und überwacht; Stellungnahme zu Plan und Abrechnung) ✓; § 9b Abs. 2 ✓.
- **§ 27** enthält nur Maßnahmen untergeordneter Bedeutung bzw. Frist/Nachteil (Abs. 1) und Beschlusserweiterung (Abs. 2); keine Vermögenstrennung. Der Autor hat recht. § 9a Abs. 3 verweist auf § 18, § 19 Abs. 1 und § 27 für das Gemeinschaftsvermögen. Ergänzung für die Rechtsangaben: § 34c Abs. 3 Nr. 1 b GewO ermächtigt zu „getrennter Verwaltung“, § 6 MaBV regelt sie, aber § 1 Abs. 2 MaBV schließt § 6 für Wohnimmobilienverwalter aus (nur §§ 11, 15 bis 15b, 18, 19 gelten). Das stützt „MaBV ist nicht die Grundlage“ und „WEG enthält keine ausdrückliche Pflicht“; die Pflicht bleibt Auslegung (Verwaltervertrag/Auftragsrecht, Eigentum der Gemeinschaft): „vermutet“ ist richtig gekennzeichnet.
- § 28 Abs. 1, 2, 4 (Beschluss über Vorschüsse/Rücklagen; Beschluss über Nachschüsse oder Anpassung der Vorschüsse; Vermögensbericht, jedem Eigentümer zur Verfügung zu stellen) ✓. Der Normtext spricht von „Kalenderjahr“, der Kurs von „Wirtschaftsjahr“ (vorbestehend).
- § 9a Abs. 1: Text verwendet weder „rechtsfähig“ noch „teilrechtsfähig“; „rechtsfähiger Verband“ ist die Lehrmeinung, „2005 Rechtsprechung“ (BGH V ZB 32/05) aus Kenntnis. Formulierung in T 1.1/K-1.1-09 ist vertretbar und besser als vorher.
- § 18 Abs. 4: Einsicht gegen die **Gemeinschaft** ✓. § 551 Abs. 3 BGB (getrennte Anlage vom Vermögen des Vermieters) ✓.
- § 873 Abs. 1 (Einigung + Eintragung), § 892 Abs. 1 (öffentlicher Glaube, Widerspruch/Kenntnis), § 883 Abs. 2 (insoweit unwirksam; auch bei Zwangsvollstreckung/Insolvenz), GBO § 1 Abs. 1 (Amtsgerichte), § 3 Abs. 1 (Grundbuchblatt als Grundbuch im Sinn des BGB) ✓.
- HGB § 242 Abs. 3 (Bilanz + GuV), § 264 Abs. 1 Satz 1 und 5 (Anhang; Kleinst: Angaben unter der Bilanz), § 267a Abs. 1 (450.000 / 900.000 / 10) ✓. § 325 (unverändert).
- MaBV § 1 Abs. 1, 2 (Ausnahmeliste für Verwalter) ✓; § 34c Abs. 1 Nr. 1 bis 4 ✓; § 34c Abs. 2a (Weiterbildung) ✓.
- BGB § 573a Abs. 1, 2, § 549 Abs. 2 Nr. 1 bis 3, Abs. 3 ✓ (Kurs deckungsgleich mit `hb4/4.1` Z. 31).
- **Reformen:** WEG-Rohtext zuletzt Art. 1 Gesetz vom 10.10.2024 (nach Seitenkopf); eigene Websuche (WEG-Reform 2026): kein beschlossenes Änderungsgesetz, nur Lobbyregister-Eintrag zur Verwalterqualifizierung und Entwürfe. Mietrecht II: Kabinett 29.04.2026, erste Lesung 09.07.2026, nicht verabschiedet (betrifft u. a. Indexmiete, Möblierungszuschlag, Schonfrist bei ordentlicher Kündigung; nicht das berechtigte Interesse). Kein Widerspruch zu Teil A.
- **„Vermutet“-Zeilen als gesichert dargestellt?** Zeile 15 (Rechtsgrundlage der Trennung): Theorie 2.1 und F-HB2-03 tragen den Hinweis „nicht förmlich rechtsgeprüft“, K-2.1-02, Q-2.1-02, FG 2.1 nicht: siehe M-5. Zeile 25 („rechtsfähiger Verband“): als Tatsache formuliert, vertretbar: N-9.

## 3. Fälle

- **F-HB4-02:** Ausgangssituation, TA2 (Aufgabe unverändert, Musterlösung neu), TA3 („Beschluss, der auf der Jahresabrechnung beruht“) stimmig; Punkte 5+5+5+5 = 20 unverändert; TA3 nennt weiter Klage binnen eines Monats, Begründung in zwei Monaten (§ 45 ✓). Keine neue falsche Rechtsannahme.
- **F-HB2-03 TA1:** „Rücklage gehört zum Vermögen der rechtsfähigen Gemeinschaft“, Trennung „daraus, dass das Geld … nicht der Verwaltung gehört, sowie aus gesetzlichen und vertraglichen Pflichten (Hinweis, nicht förmlich rechtsgeprüft)“: stimmig mit Theorie; Raster 5+6+5+4 = 20 unverändert; TA2 bis TA4 (Teil B/frühere Pakete) widersprechen nicht.

## 4. Bestand (nur gelesen)

Kein Widerspruch zu `hb4/4.1` Z. 31 (Kündigung, Kaution), `hb4/4.3` (nach Änderung), `hb2/2.2` (Rücklagenbeispiel), `hb6/6.1` und `hb2/2.3`. `hb2/2.3` Formeln (ROI = Gewinn vor Fremdkapitalzinsen ÷ Gesamtkapital, Z. 234 und 435) sind mit den neuen ROI-Sätzen konsistent. Prüfblatt 18 Z. 244 bis 246, 281 bis 290, 308 bis 316, 340 bis 344 und `export-pruefblaetter.ts` Z. 1463 tragen den alten Stand (vom Autor korrekt gemeldet). Die Spiele-Dateien enthalten nichts zu den korrigierten WEG-Begriffen; Duell Z. 26, 76 bis 82 nennt „Gesamthandseigentum, etwa bei einer GbR“ (siehe M-2).

## 5. Befunde

### Mittel

**M-1 · `hb1/1.1` #6 (K-1.1-10 Antwort) „spätere Verkäufe oder Belastungen sind … unwirksam“.** Ein zweiter Kaufvertrag bleibt wirksam; unwirksam nach § 883 Abs. 2 sind spätere *Verfügungen* (Übereignung, Belastung). Auch #4 (Theorie) „weitere Verfügungen“ ist korrekt, #6 widerspricht. Korrektur: „… spätere Übereignungen an Dritte oder Belastungen sind dem Käufer gegenüber aber insoweit unwirksam, als sie seinen Anspruch beeinträchtigen.“

**M-2 · FL-IM-31, Bericht-Punkt „GbR als Gesamthand nach MoPeG 2024 zu prüfen“ nicht bearbeitet** (Begründung der Übersicht „nicht im Befundauftrag“ trägt nicht: der Bericht-Eintrag FL-IM-31 enthält ihn und das Paket ist FL-IM-31 zugewiesen). Rohtext: § 705 Abs. 2, § 713 BGB (rechtsfähige GbR hat „Gesellschaftsvermögen“), § 47 Abs. 2 GBO (Eintragung nur der im Gesellschaftsregister eingetragenen GbR). „Gesamthandseigentum – etwa bei einer GbR“ ist seit 01.01.2024 überholt. Fundstellen: `hb1/1.1` Theorie Z. 17, K-1.1-03, Q-1.1-05 (Zeile „Gesamthandseigentum“ bleibt richtig), `hb1/fachgespraech.md` Z. 20; Duell Z. 76 bis 82 (nur melden). Vorschlag: „… Gesamthandseigentum — etwa bei einer Erbengemeinschaft; die rechtsfähige GbR ist seit 2024 selbst Eigentümerin ihres Gesellschaftsvermögens“ in Theorie, K-1.1-03 (Antwort „z. B. Erbengemeinschaft“), Fachgespräch.

**M-3 · Paragrafen in neuen Quiz-Formulierungen** (Hausregel; Rechtsangaben-Datei behauptet das Gegenteil). Neu: Q-4.2-04 Erklärung (#18) „§ 19 Abs. 2 Nr. 6 WEG“ (Bestand nannte nur § 26a); Q-1.1-02 Erklärung (#14) „§ 573a BGB“, „§ 549 BGB“ (Bestand nur § 573). Korrektur: #18 „Die Bestellung eines zertifizierten Verwalters gehört seit dem 01.12.2023 zur ordnungsmäßigen Verwaltung (Zertifikat nach § 26a WEG); …“; #14 „… Ausnahmen gibt es etwa bei der erleichterten Kündigung im selbst bewohnten Haus mit höchstens zwei Wohnungen und bei bestimmten Wohnraumarten wie Wohnheimen; …“. Satz in `rechtsangaben-a.md` Z. 3 anpassen.

**M-4 · Q-4.2-16 #28 „Die Gemeinschaft beschließt mit Mehrheit …“ (Zone Eigentümerversammlung).** Genau der Punkt von FL-IM-19: die Gemeinschaft der Wohnungseigentümer ist rechtlich der Verband, nicht die Versammlung; das Instrument kennt die Zone „Gemeinschaft“ nicht. Korrektur: „Die Wohnungseigentümer:innen beschließen in der Versammlung mit Mehrheit über den Wirtschaftsplan und über die Nachschüsse aus der Jahresabrechnung“ (Anschluss #32 „Dass der Beschluss … bei der Versammlung liegt“ bleibt).

**M-5 · „Gesetzliche … Pflichten“ der Trennung ohne Vorbehalt** in `hb2/2.1` K-2.1-02, Q-2.1-02 (Erklärung), FG `hb2/fachgespraech.md` („Aus den gesetzlichen und vertraglichen Pflichten … folgt …“), T 2.1 („Aus den gesetzlichen und vertraglichen Pflichten“); in der Rechtsangaben-Zeile 15 ist die Grundlage „vermutet“. Gesetzlich gesichert sind nur Kaution (§ 551 Abs. 3 BGB) und die Zuordnung des Gemeinschaftsvermögens (§ 9a). Das Paket hat K-2.1-02/Q-2.1-02/FG-Satz nicht angefasst, obwohl FL-IM-11 genau diese Zeilen nennt (K-2.1-02/-03, Q-2.1-02). Korrektur (ein Paar je Stelle): „… folgt daraus, dass das Geld nicht Ravelin gehört (Eigentum der Vermieter:innen bzw. der Gemeinschaft), und aus den Pflichten des Verwaltervertrags (bei der Kaution zusätzlich gesetzlich)“, oder mindestens den Hinweis „nicht förmlich rechtsgeprüft“ ergänzen. Rechtsangaben-Zeile 15 um § 34c Abs. 3 Nr. 1 b GewO / § 6 und § 1 Abs. 2 MaBV ergänzen (Stützung der Aussage).

**M-6 · Befund-Übersicht/Rechtsangaben: Zählung und Offenes.** (a) Zeile FL-IM-57 steht in `befund-uebersicht-a.md` nach einer Leerzeile außerhalb der Tabelle (Darstellung). (b) Die in der Übersicht genannte offene Frage 2 (Q-4.2-11 drei Elemente) und 3 („rechtsfähig“) bleiben Entscheidung des Auftraggebers; empfohlen: Q-4.2-11 so lassen, „rechtsfähiger Verband“ übernehmen (Gesetzesbegründung und Lehre; Text „2005 Teilrechtsfähigkeit“ erklärt den Alttext).

### Niedrig

- **N-1 · „Wirtschaftsplan beschließen“** (4.2 #5 „Über den Wirtschaftsplan beschließen …“, #21, #28, #32): Der Normtext lässt über die **Vorschüsse und Rücklagen** beschließen (§ 28 Abs. 1), der Verwalter stellt den Plan auf; `hb1/1.1` #2 sagt es präzise („auf seiner Grundlage beschließt …“). Angleichen: „Über die Vorschüsse (Hausgeld) und Rücklagenzuführungen auf Grundlage des Wirtschaftsplans beschließen …“, Zeilen „Beschlussfassung über die Vorschüsse auf Grundlage des Wirtschaftsplans und über Nachschüsse …“.
- **N-2 · `hb4/fachgespraech.md` #4 „weniger als neun Einheiten“:** Gesetz: „Sondereigentumsrechte“ (auch Teileigentum, Stellplätze). Korrektur: „weniger als neun Sondereigentumsrechten (Einheiten)“.
- **N-3 · „Beschluss über einen nicht zertifizierten Verwalter ist anfechtbar“** (4.2 #3, #18, FG #4) als Tatsache; in Rechtsangaben „aus Kenntnis“. Korrektur: „ist in der Regel anfechtbar (Verstoß gegen ordnungsmäßige Verwaltung)“.
- **N-4 · Gendern:** `hb1/1.1` #4 mischt in einem Satz „Käufer:innen“ / „Verkäufer“ / „Käufer“; neu eingeführt: „ein Wohnungseigentümer zum Verwalter bestellt“ (4.2 #3), „Eigentümer als Verwalter“ (#12, #17, FG #4), „Verwalters“ als Rolle vertretbar. Vorschlag: „der Verkäufer oder die Verkäuferin“ bzw. „die Verkäufer:innen“ im Satz, „ein:e Wohnungseigentümer:in zum Verwalter bestellt“; Rechtsbegriff „Verwalter“ beibehalten.
- **N-5 · `hb2/fachgespraech.md` #2 und `hb4/fachgespraech.md`:** Rückfrage-Text geändert (kein Hauptfragetext). Zulässig, aber „Fragetext nie ändern“ des Auftrags P-AL meint auch Rückfragen? Auftraggeber entscheidet; Autor hat es offengelegt.
- **N-6 · Q-4.2-15 #25** „Muss grundsätzlich zertifiziert sein, weil jede:r … verlangen kann“ in Zone Verwalter: Prüfblatt/Handnotiz nannte die Zeile „verkürzt (Anspruch der Eigentümer, keine Verwalterpflicht)“. Besser: „Muss auf Verlangen der Wohnungseigentümer:innen zertifiziert sein (Ausnahme: kleine Gemeinschaften)“.
- **N-7 · Q-4.2-16 #29:** Bedingung „solange ein Verwalter bestellt ist und seine Pflicht erfüllt“ in einer Zuordnungszeile ist umständlich; die Zeile liest sich als Empfänger-Aussage. Vorschlag: „Beruft die jährliche Versammlung mit Ort, Zeit und Tagesordnung in Textform ein, solange er bestellt ist und seine Pflicht erfüllt“.
- **N-8 · 4.2 #5 „ist kein Beschlussgegenstand“** (absolut; Rechtsangaben: Auslegung). Korrektur: „der Bericht informiert und wird nicht beschlossen“ (so schon K-4.2-15/Q-4.2-15).
- **N-9 · T 1.1 #1 „rechtsfähiger Verband“** ohne Vermerk, dass das Gesetz das Wort nicht nennt: vertretbar; ggf. „(§ 9a WEG: kann Rechte erwerben … )“ beibehalten, Wort „rechtsfähig“ stützt die Lehre.
- **N-10 · Nicht im Paket, nur gemeldet:** K-4.2-05 und T 4.2 „potenziellen Käufern Einblick in die Beschluss-Sammlung“: § 24 Abs. 7 Satz 7 gibt Einsicht nur Eigentümer:innen und von ihnen ermächtigten Dritten; „Wirtschaftsjahr“ statt „Kalenderjahr“ (§ 28). Beides Bestand, optional.

## 6. Kennzahlen der Prüfung

79 Paare mechanisch und inhaltlich gelesen (alle), 12 Paare auf Zeichenkettenebene am Anschluss gelesen, 38 Normen am Rohtext gelesen, rund 45 Einzelaussagen mit dem Rohtext verglichen; 2 Websuchen (WEG-Reform 2026, Mietrecht II). Befunde: hoch 0, mittel 6, niedrig 10.
