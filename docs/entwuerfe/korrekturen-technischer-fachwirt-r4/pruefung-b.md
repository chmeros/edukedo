# Prüfung P-AU Teil TF-B (unabhängige Prüfung von `ersetzungen-b.json`)

Stand 23.10.2026. Geprüft: alle 36 Paare in sechs Dateien (`tq2/6.1`, `tq2/fallaufgaben.md`, `tq3/7.2`, `tq3/fachgespraech.md`, `tq3/fallaufgaben.md`, `tq3/7.4`), `rechtsangaben-b.md` (17 Zeilen), `befund-uebersicht-b.md`.

## Gesamturteil

Keine hohen Befunde. Mechanik und Konsistenz in Ordnung. Zwei mittlere Befunde (M1 Dreier-Aussage der Bemaßung der Norm zugeschrieben; M2 Koexistenz-Satz verkürzt Anhang III), sonst niedrig. Die Datums- und Rechtsaussagen der Maschinenverordnung und der BetrSichV stimmen am Rohtext; die Strategiebegriffe der DIN EN 13306 stimmen mit zwei unabhängigen Sekundärquellen überein (Normtext selbst nicht lesbar).

## Mechanik (Gegenprobe mit eigenem Skript)

- 36 Paare: jede alte Zeichenkette genau einmal und einzeilig in ihrer Datei im aktuellen Bestand; in der Reihenfolge der Datei nacheinander anwendbar (jeweils auf dem Zwischenstand getestet); keine neue Zeichenkette enthält ihre alte; kein Paar ist wirkungslos; keine alte Zeichenkette eines Paares kommt in einer neuen oder alten eines anderen Paares derselben Datei vor.
- Gegen `ersetzungen-a.json` (nur `wq1`, `wq3`) keine gemeinsame Datei, also keine Überschneidung. Gegen `ersetzungen-c.json` (alle 38 Dateien, nur Frontmatter-Zeile 7): in den sechs gemeinsamen Dateien bleibt jede C-Zeichenkette nach Anwendung von B genau einmal auffindbar, B-Ersetzungen berühren keine C-Zeichenkette (keine Überlappung in beide Richtungen).
- Keine Item-ID geändert (Zählung der Überschriften `#### X-n.n-nn` in alten und neuen Zeichenketten gleich); keine Fachgesprächs-Fragezeile (`- Frage`) in den Paaren, nur `Erwartung`-Zeilen.
- Punkteraster: F-TQ2-03 5+5+5+5 = 20, F-TQ3-02 4+6+5+5 = 20, unverändert.

## Befunde

### Mittel

**M1. Die „drei Elemente der Bemaßung“ werden der Norm zugeschrieben (Theorie 6.1 „Bemaßung“; K-6.1-09; Q-6.1-09 Frage und Erklärung; F-TQ2-03 TA1; Rechtsangaben Nr. 4).**
Die Aufzählung Maßlinie, Maßhilfslinie, Maßzahl ist eine verbreitete Lehrbuchvereinfachung. Lehrmaterialien (Wikibooks Technisches Zeichnen, TUM-Zeichnungsunterlage) führen als Bemaßungselemente zusätzlich die Maßlinienbegrenzung (Maßpfeil/Punkt) auf; die Theorie selbst spricht von Pfeilspitzen an der Maßlinie. Die DIN-Media-Seite von DIN EN ISO 129-1:2022-02 nennt in ihrer Kurzbeschreibung Maße, Maßlinien, Werte, Symbole und Toleranzen, **nicht** Maßhilfslinien (Rechtsangaben Nr. 4 behauptet „Maßlinien, Maßhilfslinien und Maßzahlen“, das fand ich auf der Katalogseite nicht). „Nach dieser Norm besteht eine vollständige Bemaßung aus drei Elementen“ (und Fragen „… besteht eine vollständige Bemaßung nach DIN EN ISO 129-1 (früher DIN 406)?“) behauptet mehr, als sich belegen lässt. Die Abschwächung „im Kern“ steht nur in der Theorie, nicht in Karte, Quiz und Fall. Auch vor der Änderung war es eine Vereinfachung („nach DIN 406“), neu ist, dass sie jetzt an die aktuelle Norm geknüpft wird.
Korrektur: Normbezug und Dreier-Aussage trennen. Theorie: „Üblicherweise unterscheidet man bei der Bemaßung drei Grundelemente: …“ (Norm-Satz davor stehen lassen). K-6.1-09 Frage: „Welche drei Grundelemente trägt man bei der Bemaßung einer technischen Zeichnung ein?“ Q-6.1-09 Frage: „… (Grundelemente der Bemaßung)?“, Erklärung „… sind die drei Grundelemente …“. F-TQ2-03 TA1: „Nennen Sie die drei Grundelemente einer Bemaßung (Maßeintragung nach DIN EN ISO 129-1, früher DIN 406) …“. Rechtsangaben Nr. 4: „Katalog nennt Maße, Maßlinien, Werte, Symbole, Toleranzen; Dreiteilung ist Lehrbuchvereinfachung“. Verlangt der Auftraggeber die Normbindung beizubehalten, in jeder Fassung „im Kern“ ergänzen.

**M2. Anhang III Nr. 1.3.7 verkürzt wiedergegeben (T 7.4, neuer Satz; Rechtsangaben Nr. 14).**
Rohtext: „… ist folgenden Aspekten Rechnung zu tragen: a) Koexistenz zwischen Mensch und Maschine in einem gemeinsamen Raum **ohne direkte Zusammenarbeit**; b) Mensch-Maschine-Interaktion“. Der Lerntext lässt „ohne direkte Zusammenarbeit“ weg („die Koexistenz von Mensch und Maschine in einem gemeinsamen Raum“). Gerade beim Cobot (direkte Zusammenarbeit) entsteht so der Eindruck, die Koexistenz-Anforderung beschreibe die Kollaboration. Die Rechtsangaben Nr. 14 geben den Zusatz richtig wieder, der Lerntext nicht.
Korrektur (Paar 2 der Datei, Satzteil): „… und verlangt, bei Kontaktrisiken die Koexistenz von Mensch und Maschine in einem gemeinsamen Raum ohne direkte Zusammenarbeit sowie die Mensch-Maschine-Interaktion zu berücksichtigen …“.

### Niedrig

**N1. T 7.4: Maschinenverordnung im Präsens, obwohl bis 19.01.2027 noch die Richtlinie gilt.** „Die Maschinenverordnung … verlangt …“ mit „Geltung ab 20.01.2027“ ist formal gekennzeichnet; in 7.2 steht der Übergang (bis 19.01.2027 Maschinenrichtlinie 2006/42/EG, 9. ProdSV). Vorschlag: in der Klammer ergänzen „bis dahin gilt für neu in Verkehr gebrachte Maschinen noch die Maschinenrichtlinie, siehe Thema 7.2“. Der Grundsatz Risikobeurteilung gilt in der Richtlinie sinngemäß ebenso, die Kontakt-Aspekte (Koexistenz, Mensch-Maschine-Interaktion) sind Text der Verordnung.

**N2. T 7.2: innere Spannung.** Absatz davor: „zustandsorientierte Instandhaltung (im Sprachgebrauch oft „vorausschauend“ genannt)“; Einordnungsabsatz: „vorausschauend … ist also eine Unterart … und kein Synonym“. Vorschlag: „(im Sprachgebrauch oft ungenau „vorausschauend“ genannt, siehe Einordnung unten)“. „Kursfassung“ ist ein interner Begriff (Lernende kennen keine „Fassung“): erwägen „in diesem Kurs“; kein Fehler.

**N3. Q-7.2-12 (Bestand, Erklärung geändert): richtige Antwort ist die längste** (117 gegenüber 53, 63, 63 Zeichen). Der Befund stammt aus dem Bestand, wird aber beim Einspielen berührt. Vorschlag: richtige Option „Weil noch funktionstüchtige Bauteile zu früh getauscht werden können.“ (66), Distraktoren auf 70 bis 90 Zeichen verlängern, zum Beispiel „Weil zeitbasierte Wartung bei CNC-Maschinen grundsätzlich unzulässig ist und deshalb nicht angewendet werden darf.“ Wenn nicht Teil dieses Pakets: als Rest melden.

**N4. Q-7.2-02: Wortecho.** Links jetzt „Intervallbasierte vorbeugende Instandhaltung“, rechts „Feste … Wartungsintervalle“ (Intervall/Intervalle) macht die Zuordnung leichter als zuvor. Kein Fehler. Vorschlag links: „Vorbeugende Instandhaltung nach festem Plan“ oder rechts „Wartung nach festen Zeit- oder Laufleistungsabständen“.

**N5. Q-6.1-11 Akzeptierte Antworten.** Ergänzbar: „ISO 129-1:2018“, „EN ISO 129-1:2019“, „DIN EN ISO 129-1:2020“ (nicht, weil zurückgezogen, nur falls Auftraggeber großzügig sein will). Das Weglassen von „DIN 406“ ist richtig, weil der Fragetext sie nennt.

**N6. Karten/Quiz enthalten die Normzuordnungen ohne „Stand Oktober 2026, vor Verwendung prüfen“** (K-7.2-07, -09; Q-7.2-02, -05, -12; F-TQ3-02 Musterlösung). Der Hinweis steht in der Theorie und bei Q-6.1-11. Hausregel erfüllt (Theorie), Wunsch nur optional. Normbezeichnungen (DIN EN 13306) sind keine Gesetzesnamen; in Karten/Quiz keine Paragrafen und kein Gesetzesname neu eingeführt (geprüft: kein „§“, „BetrSichV“, „Maschinenverordnung“ in Karten/Quiz-Zeichenketten).

**N7. K-7.4-11 (unverändert) „sichere Mensch-Roboter-Kollaboration“** stützt den Absolutismus, den FL-TF-40 beanstandet. Formulierungsvorschlag: „… wird die Mensch-Roboter-Kollaboration eines Cobots abgesichert?“ Kein Muss.

**N8. Neue Norm zur vorausschauenden Instandhaltung.** DIN Media führt „DIN EN IEC 63270-1:2025, Ausgabe 2026-08“ (Allgemeine Anforderungen an die vorausschauende Instandhaltung von Automatisierungsgeräten und -systemen; Verhältnis zur zustandsabhängigen Instandhaltung) als „Norm [NEU]“. Der Lerntext schreibt die Definition ausdrücklich der DIN EN 13306 zu, das ist richtig; in `rechtsangaben-b.md` und bei der förmlichen Prüfung vermerken, dass für Automatisierungsgeräte eine zusätzliche Norm mit eigenem Begriffsverständnis existiert.

**N9. Rechtsangaben Nr. 15 kann angehoben werden:** Die Berichtigung (ABl. L 169 vom 04.07.2023, S. 35 f., Nr. 10) ist am Text gelesen: Art. 54 Abs. 2 „14. Januar 2027“ → „20. Januar 2027“ (siehe unten). Damit Datum gesichert; „vermutet“ entfällt, Wiedervorlage 21.01.2027 bleibt.

## Faktencheck

| Aussage | Prüfung | Ergebnis |
|---|---|---|
| MVO (EU) 2023/1230 Art. 54: Geltung ab 14.01.2027 in der Ursprungsfassung | Rohtext `publications.europa.eu/resource/celex/32023R1230` (deutsch) per `curl` gelesen: Art. 51 Abs. 2, Art. 52 Abs. 1, Art. 54 nennen 14. Januar 2027 | bestätigt: CELEX-Ressource liefert die **unberichtigte** Fassung |
| Berichtigung → 20.01.2027 | Berichtigung ABl. L 169/35 (04.07.2023) gelesen (PDF-Spiegel auf assets.ibf-solutions.com, Originalnummer und Inhalt ausgewiesen, nicht von EUR-Lex): Art. 51 Abs. 2 UAbs. 1, Art. 52 Abs. 1 Satz 1 und Art. 54 Abs. 2 jeweils „20. Januar 2027“; Art. 54 Abs. 3 Buchst. c „19. Juli 2023“ | bestätigt, passt zu 7.2 („in Kraft getreten am 19.07.2023“, „ab 20.01.2027“). Empfehlung: bei der förmlichen Prüfung die Berichtigung zusätzlich direkt in EUR-Lex gegenlesen |
| Anhang III Teil A Buchst. f, g (trennende, nichttrennende Schutzeinrichtung) | Rohtext gelesen | bestätigt |
| Anhang III Teil B Nr. 1 (Risikobeurteilung, iteratives Verfahren, Ausschluss/Minimierung) | Rohtext gelesen | bestätigt |
| Anhang III Nr. 1.3.7 (trennende oder nichttrennende Schutzeinrichtungen, falls Risiken bestehen; Koexistenz, Mensch-Maschine-Interaktion) | Rohtext gelesen | bestätigt; im Lerntext verkürzt, siehe M2 |
| Anhang III Nr. 1.3.8.2 (Wahl bei Teilen, die am Arbeitsprozess beteiligt sind) | Rohtext gelesen | bestätigt |
| BetrSichV § 3 Abs. 1 Satz 1 und 2 (Gefährdungsbeurteilung vor Verwendung; CE-Kennzeichnung entbindet nicht); Abs. 2 Satz 2 Nr. 3 (physische und psychische Belastungen) | Rohtext gesetze-im-internet.de per `curl` gelesen | bestätigt (Rechtsangaben Nr. 16 und 17) |
| DIN EN ISO 129-1:2022-02, „Technische Produktdokumentation (TPD), Angabe von Maßen und Toleranzen, Teil 1: Grundlagen“, aktuell, ersetzt DIN EN ISO 129-1:2020-02 | DIN-Media-Katalogseite gelesen | bestätigt; Ausgabe 2022-02 „AKTUELL“ |
| DIN 406-10:1992-12 zurückgezogen, ersetzt durch DIN EN ISO 129-1:2020-02 | DIN-Media-Katalogseite | bestätigt; DIN 406 ist eine Normenreihe (Teile 10, 11, 12), für Teil 12 empfiehlt DIN-Media den Nachfolger ISO 129-1:2004 und nennt keinen Ersatz. „die frühere DIN 406“ ist für den Kurs vertretbar |
| DIN EN 13306:2018-02 „Dreisprachige Fassung EN 13306:2017“, aktuell, ersetzt DIN EN 13306:2010-12 | DIN-Media-Katalogseiten (2018-02 und 2010-12) | bestätigt |
| DIN 31051:2019-06 aktuell, ersetzt 2012-09; vier Grundmaßnahmen | DIN-Media-Seiten und DGUV-Lexikon (Sekundärquelle für die vier Grundmaßnahmen) | bestätigt; „gleicht Begriffe an DIN EN 13306 an“ stützt sich auf die Ausgabebeschreibung, im Lerntext „nutzt dafür die Begriffe der DIN EN 13306“ vertretbar |
| Unterarten der vorbeugenden Instandhaltung nach DIN EN 13306 (vorausbestimmt ohne vorherige Zustandsprüfung; zustandsorientiert mit Überwachung/Inspektion/Prüfung und Folgemaßnahmen; vorausschauend = zustandsorientiert mit Vorhersage aus Analyse der Verschleißparameter; korrektiv nach Fehlererkennung) | Normtext nicht lesbar; zwei unabhängige Sekundärquellen (Glossare Techniques de l’Ingénieur und Maintmaster mit nahezu wortgleicher Normdefinition) und Fachwissen stimmen mit der Hierarchie überein | **Einordnung der Strategiebegriffe stimmt**; weiterhin „vermutet“ (nicht am Normtext). Im Lerntext als Normaussage mit „Stand Oktober 2026, vor Verwendung prüfen“; darstellbar, weil sehr gut belegt. Vor Echtbetrieb an Normtext (Auslegestelle) belegen |
| „vermutet“-Aussagen im Lerntext als gesichert dargestellt? | Unterarten-Definitionen: ja, als Normaussage mit Stand-Hinweis (vertretbar, siehe oben). Drei Elemente: ja, M1. MVO-Datum: ja, aber jetzt am Berichtigungstext gesichert. | siehe M1, N9 |

## Quiz- und Fallkonsistenz (nach den Änderungen geprüft)

- **Q-6.1-09:** genau eine richtige Antwort (Schriftfeld, 11 Zeichen; Distraktoren 9 bis 14 Zeichen, nicht die längste); inhaltlich siehe M1. **Q-6.1-11:** Fragetext „heute geltende“ passt zu den Akzeptierten Antworten, ohne „DIN 406“; Erklärung konsistent. **K-6.1-09:** Antwort unverändert, Frage konsistent (siehe M1). **F-TQ2-03 TA1:** Aufgabe und Musterlösung (Maßlinie, Maßhilfslinie, Maßzahl) konsistent, Raster 20.
- **7.2:** K-7.2-07 bis -10, Q-7.2-02, -05, -06, -12, -17: widerspruchsfrei zur neuen Theorie; Q-7.2-02 genau vier Zuordnungen, Distraktorwechsel nicht nötig; Q-7.2-05 bleibt „Wahr“ (Aussage jetzt ausdrücklich „in der Norm: vorausbestimmte Instandhaltung“, wahr); Q-7.2-06 Entweder-Oder unverändert eindeutig; Q-7.2-17 Hinweis passt (korrektiv und vorbeugend als Strategien, keine Zonen). Q-7.2-11 (Einführung zustandsorientierter Instandhaltung) und die vier Grundmaßnahmen bleiben mit Norm und Kurs vereinbar. Nur Q-7.2-12 mit längster richtiger Antwort (N3, Bestand). Es gibt kein neues Item ohne ID, keine Item-ID geändert.
- **F-TQ3-02 TA1:** Aufgabe („zustandsorientierte Instandhaltung“) und Musterlösung (Ergänzung zur Norm als „kann genannt werden“) konsistent; Raster 4+6+5+5 = 20.
- **7.4:** K-7.4-10, -19, Q-7.4-02 (vier Zuordnungen, eindeutig), Q-7.4-04 (Akzeptierte Antworten bleiben) konsistent; die längere Frage in Q-7.4-04 beantwortet sich mit „Cobot“ weiterhin ohne Kontext. Nach der Änderung existiert keine absolute Cobot-Aussage mehr in `content/technischer-fachwirt` (Rest: K-7.4-11 „sichere“, N7).
- **Fachgespräch 7.2 und 7.4:** Fragetexte unverändert; Erwartungen konsistent mit Theorie; FG 7.4 hat nun zwei Zeilen „Erwartung“ (nach dem Zaun-Satz eine neue), formal ok (Format `  - Erwartung:`).

## Hausregeln

- Gendern: „Bediener:innen“, „Beschäftigte“ — in den neuen Texten kein Maskulinum. Karten/Quiz duzen/neutral, Fälle siezen (F-TQ2-03, F-TQ3-02 unverändert „Nennen/Erläutern Sie“).
- Karten/Quiz ohne neue Paragrafen und Gesetzesnamen: eingehalten. Paragraf und Gesetzesname (§ 3 BetrSichV, Maschinenverordnung, Anhang III) nur in der Theorie 7.4. Rechtsstand: „Stand Oktober 2026, vor Verwendung prüfen“ steht in 6.1 und 7.2 (Norm) sowie 7.4 (Maschinenverordnung); der Satz zur BetrSichV hat ihn nicht eigens (steht im gleichen Absatz; optional ergänzen).
- Arbeitsvermerke im Lerntext: keine (kein „gelesen“, „vermutet“, Ich-Satz). „Kursfassung“ siehe N2. Praxis nicht als feste Regel: „empfiehlt es sich“ ist didaktisch, in Ordnung.
- Das Frontmatter-Datum `rechtsstand` setzt der Auftraggeber.

## Bestand und Spiele

Bestätigt (von der Autorin gemeldet):
- `apps/api/src/db/content/game-kennzahlen-duell-technische-unterscheidungen.ts`: Z. 37 (Abschlussmeldung Runde 3: „korrektive, vorbeugende und zustandsorientierte“, vereinbar mit der Kursfassung); Nr. 12 Z. 183 (Antwort A „Vorbeugende Instandhaltung“), Z. 189 (Rückmeldung falsch: vorbeugend = „in festen Intervallen“); Nr. 13 Z. 196 (Antwort B „Vorbeugende Instandhaltung in festen Intervallen“), Z. 199 („Die zustandsorientierte (vorausschauende) Instandhaltung …“, steht der neuen Einordnung „kein Synonym“ entgegen), Z. 201 (Rückmeldung falsch). Beide Fragen bleiben lösbar (genau eine richtige Antwort), kein Muss-Fehler. Vorschläge wie in `befund-uebersicht-b.md`; Z. 199 besser „Die zustandsorientierte Instandhaltung (mit zusätzlicher Vorhersage: vorausschauend) …“.
- Prüfblatt `docs/pruefblaetter/14-technischer-fachwirt.md`: Z. 851 (A „Vorbeugende Instandhaltung“), Z. 856 (falsch-Rückmeldung Nr. 12), Z. 870 (B „… in festen Intervallen“), Z. 872 (richtig-Rückmeldung mit „(vorausschauende)“), Z. 874 (falsch-Rückmeldung Nr. 13), Z. 234 (Q-7.2-17, alter Hinweis „wie vorbeugend, korrektiv oder zustandsorientiert sind keine Zonen“), Z. 133 (Grenzfälle, vereinbar). Im Prüfblatt keine Treffer für DIN 406, Maßlinie, Cobot-„ohne Schutzzaun“, DIN EN 13306. `packages/shared/src` und `apps/api/src` außer dem Duell: keine Treffer für die geänderten Begriffe.
- Memory-/Kreuzworträtsel-Technik: keine Treffer.

Nur gemeldet (andere Kurse, nicht Teil dieses Pakets):
- `apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts` Z. 38, 184 bis 190 („Zustandsorientierte (vorausschauende) Instandhaltung“ gegen „Vorbeugende (präventive)“) und `game-memory-immobilien.ts` Z. 233 („Vorausschauende Instandhaltung“).
- `content/immobilienfachwirt/hb4/4.3-instandhaltung-facility-management.md` Z. 19, 62, 67, 143 und `hb4/fachgespraech.md` Z. 149 bis 152 („zustandsorientierte (vorausschauende)“, „vorbeugend = feste Intervalle“): gleiche Kursfassung wie TF vor der Korrektur.
- `content/industriefachwirt/hq2/6.8-fertigungsorganisation-fertigungstiefe-standort.md` Z. 132 bis 133, 215 bis 216, 296 bis 299 und `hq2/fachgespraech.md` Z. 222: grenzt die Normsprache bereits ab (Z. 132 „in der Normsprache ist „präventiv“ …“), wirkt mit der TF-Fassung vereinbar; Wortlaut abgleichen.
- Fachinformatiker-Kurse (`fu3/3.3`, `dv3/10.3`): „präventive Wartung … zeitbasiert oder zustandsorientiert“ entspricht der Norm; dv3/10.3 trennt zustandsorientiert und vorausschauend wie die Norm. Kein Befund.

## Zahl der geprüften Elemente

- 36 Ersetzungspaare mechanisch und inhaltlich geprüft.
- Am Rohtext geprüft: 6 Rechtsaussagen (Rechtsangaben-Zeilen 12, 13, 14, 15, 16, 17), dazu das Berichtigungsdokument zu Art. 54 (Zeile 15). Zeilen 1 bis 3, 6 und 10 gegen DIN-Media-Katalogseiten, Zeilen 7 bis 9 gegen zwei Sekundärquellen; Zeile 4 am Katalog nicht bestätigt (M1); Zeilen 5 und 11 sind Auswahlen/Didaktik ohne Rechtsaussage.
