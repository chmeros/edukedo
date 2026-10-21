# Prüfung P-AN Teil B (Immobilienfachwirt, neues Thema HB4 4.5 „Mietrecht im Bestand“)

Stand 21.10.2026. Geprüft: `im-4.5-mietrecht-im-bestand.md`, `im-faelle-b.md`, `rechtsangaben-b.md`, `ersetzungen-b.json`. Maßstab: `auftrag.md` (mit P-AK, P-AJ, P-AL). Die Mechanik (Kopie-Test, Parser) wurde nicht geprüft. Es wurde keine Entwurfsdatei und nichts im Bestand geändert.

## Ergebnis in Kürze

- **Rechnen:** alle Zahlen, Rechenbeispiele, Quizlösungen, Fallergebnisse und Wochentage stimmen (41 Werte bzw. Daten mit `prb-rechnen.cjs` im Scratchpad nachgerechnet, 0 Abweichungen). Akzeptierte Antworten decken die üblichen Schreibweisen ab. Keine Zahlenkollision mit Teil A, keine mit dem Bestand `content/immobilienfachwirt/`.
- **Recht:** Die Normen (30 BGB-Paragrafen am Rohtext von gesetze-im-internet.de gelesen) und die Sachaussagen sind im Kern richtig. Ich habe 18 Entscheidungen am Volltext (gesetze.co) geprüft und die Drucksache 21/6807 am PDF gelesen. Aktenzeichen und Datum stimmen durchgehend (gesetze.co zeigt bei allen Entscheidungen den Vortag, das ist ein Datenbankversatz; die Kurstexte nennen die richtigen Verkündungstage). Es gibt **keine falsche Rechtsaussage in Karten oder Quiz**, aber mehrere Ungenauigkeiten in der Theorie, falsche Randnummern und eine veraltete Darstellung von VIII ZR 228/23.
- **Hausregeln:** ein **hoher** Befund (Lesestatus-Vermerke und Ich-Form im Lerntext), sonst nur mittlere und niedrige Befunde. IDs lückenlos, Frontmatter wie 4.4, Quiztypen gemischt, Kurzantworten 6 von 16 (37,5 %), Rechen-Kurzantworten 5, Theorie 3.524 Wörter, Ausgangssituation 218 Wörter, Karten-Antworten höchstens 247 Zeichen, keine Paragrafen oder Gesetzesnamen in Karten und Quiz, richtige Antwort nie die längste.

## Befunde

### Hoch

**H-01 · Theorie (7 Abschnitte, Z. 19, 25, 29, 33, 35, 39 bis 46, 59, 63 bis 69, 73, 79 bis 85, 103) · Prüfvermerke und Ich-Form im Lerntext.**
Der Kurstext enthält 26 Mal „gelesen“ (davon „Leitsatz gelesen“ und „nur nach einem Pressebericht gelesen, das Urteil selbst nicht“), 8 Mal „aus Kenntnis“ („nicht nachgeschlagen“) und drei Sätze in der Ich-Form: Z. 43 „das ich selbst nicht gelesen habe, sondern nur aus dem Zitat kenne“, Z. 59 „dieses Urteil habe ich nicht gelesen“, Z. 65 „das Urteil selbst nicht“. Das sind Arbeitsvermerke der Autorin; sie gehören in `rechtsangaben-b.md` (dort stehen sie bereits vollständig). Kein Bestandsthema und kein eingespieltes R4-Thema (P-AJ bis P-AL, Teil A) trägt solche Vermerke; Lernende können damit nichts anfangen, und die Ich-Form bricht den Ton. Das widerspricht auch Teil A in derselben Lieferung.
**Korrektur:** alle „gelesen“-, „Leitsatz gelesen“- und „aus Kenntnis“-Klammern streichen; die Fundstelle (Gericht, Datum, Aktenzeichen, ggf. Randnummer) und „Stand Oktober 2026, vor Verwendung prüfen“ bleiben. Wo der Auftrag „vermutet“ verlangt (Richtwerte der Kleinreparatur, Antwortfrist, Besuch, Rückwirkung der Vorauszahlung, Anwendung von § 193 BGB), bleibt das Wort „vermutet“ in neutraler Formulierung („nach verbreiteter Praxis, nicht abschließend geklärt“). Z. 43: „Bestätigung der Senatsrechtsprechung seit 2015 (VIII ZR 242/13)“ ohne Ich-Satz; Z. 59: Satz mit „dieses Urteil habe ich nicht gelesen“ ganz streichen (die Aussage trägt VIII ZR 79/22 Rn. 20); Z. 65: siehe M-03.

### Mittel

**M-01 · Randnummern falsch (Theorie Z. 41, 44, 81, 85; Rechtsangaben Nr. 14, 22, 26, 29, 31, 58, 61).** Gegen den Volltext geprüft:
- VIII ZR 185/14, flexibler Fristenplan: **Rn. 20** (nicht Rn. 21; Rn. 21 betrifft die Entwicklung der Quotenabgeltung).
- VIII ZR 185/14, „Gesamteindruck einer renovierten Wohnung“ und unerhebliche Spuren: **Rn. 31** (Theorie Z. 44 nennt „Rn. 16 ff., 33 f.“; Rn. 33 behandelt das Übergabeprotokoll, Rn. 34 die Subsumtion). Korrekt: „Rn. 15 ff., 31“.
- VIII ZR 185/14, Beweislast: Mietpartei **Rn. 32**, Beweismittel Übergabeprotokoll, Fotos, Zeugen **Rn. 33**, Vermieterseite für den Ausgleich **Rn. 36** (Theorie Z. 44: „Rn. 35 ff.“; Z. 81 und Rechtsangaben Nr. 58: „Rn. 36“ für das Übergabeprotokoll, richtig ist Rn. 33).
- VIII ZR 402/12, Zurechnung der Kenntnis des Hauswarts: **Rn. 18** (Theorie Z. 85: „Rn. 12, 20“; Rn. 12 „auf Zuruf“ stimmt, Rn. 20 betrifft die offene Bevollmächtigungsfrage).
- VIII ZR 19/14: Der Satz „Soweit eine Einrede besteht, gerät die Mietpartei nicht in Verzug“ steht in **Rn. 45** (Theorie Z. 35 „Rn. 46“, Rechtsangaben Nr. 22 „Rn. 46 und 47“). Rn. 46 und 47 handeln von der Berücksichtigung der Rückstände und von der Minderung (20 % der Bruttomiete). Die amtlichen Leitsätze sind 1 bis 4 (Rechtsangaben Nr. 11 „Leitsatz c, d“ passt nicht; gemeint sind Leitsatz 3 und 4).
**Korrektur:** Randnummern wie genannt berichtigen oder weglassen (im Lerntext genügt „Stützangabe: Entscheidung und Datum“).

**M-02 · Theorie Z. 46 · VIII ZR 163/18 überverallgemeinert.** Der Satz „Verschlechtert sich der Dekorationszustand wesentlich, kann die Mietpartei eine Renovierung verlangen, muss sich dann aber in der Regel hälftig an den Kosten beteiligen“ steht nach „Ist die Klausel unwirksam …“ und gilt dort für jede Unwirksamkeit. Nach Leitsatz 2 der Entscheidung gilt die hälftige Beteiligung nur, wenn die Wohnung **unrenoviert** übergeben wurde (Besserstellung gegenüber dem vertragsgemäßen Anfangszustand). Wer eine renoviert übergebene Wohnung hat (starre Fristen, Fall F-HB4-06 Wohnung 7 ist ohnehin unrenoviert), trägt bei Instandsetzungsbedarf keine Kostenhälfte. Rechtsangaben Nr. 33 formuliert richtig („Verschlechterung des Anfangszustands“).
**Korrektur:** „Bei einer unrenoviert übergebenen Wohnung kann die Mietpartei bei wesentlicher Verschlechterung des Dekorationszustands eine Renovierung verlangen, muss sich aber in der Regel hälftig an den Kosten beteiligen (BGH, Urteil vom 08.07.2020, VIII ZR 163/18). Wurde die Wohnung renoviert übergeben, trägt die Vermieterseite die Instandhaltung allein.“

**M-03 · Theorie Z. 65, Q-4.5-11, K-4.5-11, Rechtsangaben Nr. 43, Fall (Rechtsannahmen „nach Berichten“) · Darstellung von VIII ZR 228/23 veraltet und in einem Punkt unscharf.**
Das Urteil vom 28.01.2026 ist im Volltext verfügbar (gesetze.co; die Quelle ist nicht die Seite des Bundesgerichtshofs). Geprüft: Aktenzeichen, Datum, Beträge (Nettokaltmiete 460 €, vereinbarte Untermiete 962 € netto kalt, zusammen 1.100 € mit Betriebs- und Heizkostenvorauszahlung), Leitsatz 1 (Wunsch nach geringeren Mietaufwendungen ist grundsätzlich berechtigtes Interesse) und Leitsatz 2 („über die Deckung der wohnungsbezogenen Aufwendungen hinausgehende Gewinnerzielung ist hiervon nicht umfasst“) **stimmen mit dem Kurstext überein**. Abweichungen und Ergänzungen:
1. Der Kurstext sagt „Offen bleibt nach dem Bericht, ob etwas anderes gilt, wenn der Gewinn mit der Vermieterseite geteilt wird“ und Q-4.5-11 erklärt, die Folgen für „Gewinnbeteiligung der Vermieterseite seien noch nicht geklärt“. Nach Rn. 27 des Urteils kommt es auf eine Teilhabe der Vermieterseite am Gewinn „nicht an“, es gibt dafür „im Gesetz ohnehin keine Stütze“. Offen gelassen ist dagegen (Rn. 35), ob **zusätzliche Leistungen** der Hauptmietpartei (Möblierung, Service) bei der Gewinnfrage zu berücksichtigen sind. Gewinnbeteiligung als Ausweg ist damit gerade **nicht** offen.
2. Der Fall betraf die Untervermietung der **ganzen** Zweizimmerwohnung während eines Auslandsaufenthalts ohne Erlaubnis; die Vermieterin hatte nach Abmahnung **ordentlich** gekündigt (§ 573 Abs. 2 Nr. 1 BGB), und der Bundesgerichtshof hielt das für wirksam (Rn. 16, 17). Die Theorie nennt bei unerlaubter Untervermietung nur die fristlose Kündigung (§ 543 Abs. 2 Nr. 2); der praktisch wichtigere Weg, die ordentliche Kündigung nach Abmahnung bei erheblicher Pflichtverletzung, fehlt.
3. Die Hauptmiete wurde im Urteil als Nettokaltmiete mit der Untermiete als Nettokaltmiete verglichen und die Betriebskosten als weitere durchgereichte Aufwendungen betrachtet (Rn. 34); der Maßstab „Flächenanteil der Bruttomiete“ ist eine eigene Konvention (Rechtsangaben Nr. 44, korrekt als vermutet geführt).
**Korrektur:** (a) Theorie Z. 65 Satz „Offen bleibt …“ ersetzen: „Offen ist nach dem Urteil, ob zusätzliche Leistungen der Hauptmietpartei (zum Beispiel Möblierung) beim Gewinn berücksichtigt werden; eine Beteiligung der Vermieterseite am Gewinn ersetzt das berechtigte Interesse nicht.“ Den Pressebericht-Vermerk streichen (siehe H-01). (b) Q-4.5-11 Erklärung: „Ihre Folgen für zusätzliche Leistungen der Hauptmietpartei (zum Beispiel Möblierung) sind noch nicht geklärt.“ (c) Theorie Z. 69 ergänzen: „bei erheblicher Pflichtverletzung nach Abmahnung auch die ordentliche Kündigung (§ 573 Abs. 2 Nr. 1 BGB; so im Urteil vom 28.01.2026)“. (d) Fall „Rechtsannahmen“: „(nach Berichten)“ streichen, da das Urteil gelesen werden kann; den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“ behalten. (e) Rechtsangaben Nr. 43 auf „Entscheidung gelesen (Volltext gesetze.co), Rn. 16, 17, 27, 34, 35“ umstellen.

**M-04 · Q-4.5-12 und Fall F-HB4-06 Teilaufgabe 5 · Vergleichsgröße der Untermiete nicht festgelegt.** Q-4.5-12 stellt „960 € Bruttomiete“ gegen „248 € im Monat“ Untermiete; ob die 248 € Nettokaltmiete oder Bruttountermiete (mit Nebenkosten) sind, steht nicht da. Rechnet jemand 248 € als Nettokaltmiete gegen die Bruttoaufwendungen, ist der Vergleich schief; im Fall (310 € „ohne zusätzliche Leistungen“) dasselbe. Die Rechnung selbst (88 € bzw. 76 €) ist richtig und eindeutig, sobald die Annahme gilt.
**Korrektur:** Q-4.5-12: „… für 248 € im Monat einschließlich Nebenkosten unter.“ Fall Ausgangssituation: „verlangt von ihr 310 € im Monat einschließlich Nebenkosten ohne zusätzliche Leistungen“ (Wortzahl bleibt unter 250).

**M-05 · Fall F-HB4-06 Teilaufgabe 5, Musterlösung · Teilzusage als Rechtsfolge dargestellt.** „Soweit die Untermiete die Aufwendungen deckt (bis 234 €), besteht ein Anspruch auf Erlaubnis; für den Gewinnanteil nicht“ und „Erlaubnis … zu einer Untermiete bis 234 €“. Der Bundesgerichtshof hat entschieden, dass für die **geplante gewinnbringende Untervermietung** kein Anspruch besteht; ob und wie ein Anspruch auf eine kostendeckende Untervermietung neben der abgelehnten besteht, ist nicht entschieden. Als Verwaltungsempfehlung (Ravelin lehnt die Untervermietung zu 310 € ab und erteilt die Erlaubnis zu einer Untermiete bis 234 €) ist das vertretbar, als Rechtsaussage nicht.
**Korrektur:** Musterlösung: „Für die geplante Untermiete von 310 € besteht kein Anspruch auf Erlaubnis (Entscheidung vom 28.01.2026). Ein Anspruch besteht bei berechtigtem Interesse für eine Untervermietung, die die anteiligen Aufwendungen nicht übersteigt (hier bis 234 €); Ravelin kann dem Mieter anbieten, die Erlaubnis zu dieser Untermiete zu erteilen.“ Antwortentwurf entsprechend („Ablehnung für 310 €, Zustimmung zu einer Untermiete bis 234 €“ bleibt als Empfehlung).

**M-06 · Q-4.5-14 (Sortieren) · Reihenfolge der Schritte 2 und 3 nicht eindeutig.** Nur Schritt 1 (Vorbereitung) und Schritt 4 (Unterschrift, Fristenkalender) sind zwingend; ob zuerst die Räume begangen und dann Zähler und Schlüssel erfasst werden oder umgekehrt, ist Geschmackssache (im eigenen Text steht in der Checkliste „2 Räume begehen, 3 Zähler und Schlüssel“, in der Praxis beginnt man oft an der Tür mit den Schlüsseln). Das widerspricht „Zuordnungen eindeutig“.
**Korrektur:** Schritt 3 an eine Abhängigkeit binden: „3. Neue Schäden getrennt von normaler Abnutzung im Protokoll festhalten und Fotos beifügen“ (setzt die Begehung voraus) und Schritt 4 „Zählerstände und Schlüssel erfassen, Protokoll mit Vorbehalt weiterer Ansprüche unterschreiben lassen, Verjährungsende eintragen“. Alternativ ein anderes eindeutig geordnetes Quartett (Kündigung prüfen, Fristenplan anlegen, Übergabe durchführen, Verjährungsende eintragen).

**M-07 · K-4.5-14 und Q-4.5-15 · Karte verrät das Rechenergebnis des Quiz.** Das Beispiel der Karte („Rückerhalt 18.08., Ablauf 18.02. des Folgejahres“) ist dasselbe Datum wie in Q-4.5-15 (Dienstag, 18.08.2026, Lösung 18.02.2027). Wer die Karte gelernt hat, rechnet nicht mehr.
**Korrektur:** Karte: „Beispiel: Rückerhalt 03.09., Ablauf 03.03. des Folgejahres.“ (Daten per Skript: 03.09.2026 ist ein Donnerstag, 03.03.2027 ein Mittwoch; kein Feiertag.)

**M-08 · Theorie Z. 21 · Verfahrensstand von „Mietrecht II“ als Tatsache dargestellt.** „erste Lesung war am 09.07.2026, die Anhörung am 14.10.2026, beschlossen ist er nach dem bekannten Stand nicht“. Die Drucksache 21/6807 vom 01.07.2026 habe ich gelesen (Art. 1 Nr. 1: § 536 Abs. 1a soll künftig „Modernisierung nach § 555b Nummer 1 oder 1a“ erfassen; Begründung entsprechend), der Inhalt der Passage stimmt. **Die beiden Daten konnte ich nicht bestätigen** (Websuche ohne Treffer; Rechtsangaben Nr. 7 führt sie zu Recht als „vermutet“). Im Lerntext stehen sie ohne Vorbehalt.
**Korrektur:** Daten streichen: „… will diesen Ausschluss auf Maßnahmen nach der Nr. 1a des § 555b BGB ausdehnen (Entwurf vom 01.07.2026, nach dem bekannten Stand noch nicht beschlossen; vor Verwendung prüfen)“. Das passt zu der Formulierung im Bestand `hb4/4.1`.

**M-09 · Theorie Z. 87, Rechtsangaben Nr. 66 · Anwendung des § 193 BGB auf das Ende der Verjährung ist geklärt.** Der Kurstext sagt, ob bei einem Fristende am Wochenende die Regel zum nächsten Werktag hilft, sei „nicht sicher geklärt (vermutet)“. Der Bundesgerichtshof wendet § 193 BGB auf Verjährungsfristen entsprechend an (Urteil III ZR 146/07, Leitsatz b; NJW-RR 2008, 459; Sekundärquellen NWB/CMS, Volltext von mir nicht eingesehen). Das Vermeiden von Wochenenden in Fall und Quiz ist trotzdem sinnvoll und bleibt unverändert (alle vier Fristenden sind Werktage ohne Feiertag: Do 12.11.2026, Do 18.02.2027, Fr 28.01.2028; Fall und Quiz geprüft).
**Korrektur:** „Fällt das Fristende auf einen Samstag, Sonntag oder Feiertag, verschiebt es sich nach der Rechtsprechung auf den nächsten Werktag (entsprechende Anwendung des § 193 BGB; BGH, III ZR 146/07); die Hemmung wird dennoch nie am letzten Tag vorbereitet.“ Rechtsangaben Nr. 66 entsprechend („Entscheidung nach Leitsatz, Datum vor Verwendung prüfen“).

**M-10 · Fall F-HB4-06 Teilaufgabe 4 und 3 · innere Spannung.** Teilaufgabe 3 kommt zum Ergebnis, Ravelin habe keinen Renovierungsanspruch (2.760 € nicht verlangbar). Teilaufgabe 4 fragt dann, ob der erst am 16.08.2027 vorliegende Kostenvoranschlag **dieses Malerbetriebs** die Verjährung beeinflusst; die Musterlösung muss mit einem Hinweis („voraussichtlich kein Anspruch auf Renovierung; die Frist gilt für sonstige Schäden“) zurückrudern. Das ist für Lernende verwirrend und prüft eine nicht bestehende Forderung.
**Korrektur:** In der Ausgangssituation neben der Renovierungsschätzung einen echten Schadenfall ergänzen (zum Beispiel „Im Wohnzimmer ist das Parkett durch ein schweres Möbelstück beschädigt; der Tischlerbetrieb legt den Kostenvoranschlag über 1.340 € erst am Montag, 16.08.2027, vor“), Teilaufgabe 4 darauf beziehen, Hinweis in der Musterlösung streichen. Neue Zahl vorher per `zahlen` prüfen (1.340 € kommt in `content/immobilienfachwirt/` nicht vor).

**M-11 · Fall F-HB4-06 Teilaufgabe 3, Begründung „unrenoviert ohne Ausgleich“.** Das Einzugsprotokoll nennt nur Wohnzimmer und Flur als abgewohnt („Wände abgewohnt, Tapete stellenweise gelöst“). Nach VIII ZR 185/14 Rn. 31 kommt es auf den Gesamteindruck der überlassenen Wohnung an; zwei von mehreren Räumen belegen das nicht ohne Weiteres. Die Musterlösung formuliert „in Wohnzimmer und Flur nicht im Gesamteindruck renoviert“, was die Maßstabsfrage umgeht. Die erste Begründung (starrer Fristenplan) trägt die Entscheidung allein; die zweite ist als eigenständiger Punkt (1 Punkt der Rasterzeile) angreifbar.
**Korrektur:** Einzugsprotokoll: „… für alle Wohn- und Schlafräume und den Flur: ‚Wände abgewohnt, Tapete stellenweise gelöst‘“ (Gesamteindruck unrenoviert, ohne dass die Räume aufgezählt werden müssen) und in der Musterlösung „die Wohnung vermittelte bei Einzug nicht den Gesamteindruck einer renovierten Wohnung“.

### Niedrig

**N-01 · Theorie Z. 85, Q-4.5-16.** (a) Satz „Gibt die Mietpartei die Schlüssel einem Hauswart, wird die Kenntnis der Vermieterseite nur zugerechnet, wenn er konkret mit der Entgegennahme beauftragt war“: zugerechnet wird die Kenntnis **des Hauswarts**, nicht die der Vermieterseite. Korrektur: „… wird dessen Kenntnis der Vermieterseite nur zugerechnet, …“. (b) Q-4.5-16 (richtig: „Mit der Kenntnis von Ravelin …, hier am Mittwoch“) stimmt mit VIII ZR 402/12 (Leitsatz, Rn. 15, 16, 18) überein. Für Eindeutigkeit ein Halbsatz: „Ravelin erfährt davon erst am folgenden Mittwoch und holt die Schlüssel am selben Tag ab“ (der Besitz kam im Urteil schon vorher über die Besitzdienerin an die Vermieterseite zurück, entscheidend war die Kenntnis).

**N-02 · Quiz, Antwortlängen.** In allen vier Frageformen mit Distraktoren ist die richtige Antwort **die kürzeste oder fast die kürzeste** Option (Q-01: 81 gegen 91, 100, 112 Zeichen; Q-06: 80 gegen 81, 104, 149; Q-07: die drei richtigen 53 bis 61, die falschen 80 und 91; Q-10: 43 gegen 52; nur Q-16: 69 gegen 61, 76, 105). Das ist regelkonform (nie die längste), aber ein Muster, das Lernende erkennen. Korrektur: bei Q-01 und Q-06 zwei Distraktoren kürzen oder die richtige Antwort um einen Halbsatz verlängern (zum Beispiel Q-01 „… kraft Gesetzes gemindert, ohne dass die Mieterin eine Minderung erklären muss“, Länge dann nicht die größte).

**N-03 · Q-4.5-15, Akzeptierte Antworten.** Fehlen übliche Schreibweisen „18.02.2027.“ (Punkt am Ende), „18. 02. 2027“ und „18.2.27“. Ergänzen.

**N-04 · Theorie Z. 39.** Das Klauselbeispiel aus VIII ZR 185/14 nennt auch das „Streichen der Fußböden“ (Volltext, Klausel § 4 Nr. 6); in der Aufzählung fehlt es. Ergänzen oder „unter anderem“ einfügen.

**N-05 · Fall F-HB4-06 Musterlösung Teilaufgabe 3.** „Eigentümer:in“ (in „Kalkulation der Eigentümer:in“) neben „Eigentümerin“ im selben Fall; die Eigentümerin ist eine bestimmte Person, also „Eigentümerin“.

**N-06 · Theorie Z. 77.** Der Hinweis, dass der Samstag bei der Berechnung des dritten Werktags mitzählt, fehlt (§ 573c Abs. 1 Satz 1 BGB, Rohtext gelesen); für die Fristenplanung der Verwaltung nützlich, nicht zwingend.

**N-07 · Theorie Z. 85.** § 548 Abs. 1 Satz 3 BGB (mit der Verjährung des Rückgabeanspruchs verjähren auch die Ersatzansprüche) wird nicht erwähnt; im Rohtext vorhanden, für diesen Kursumfang entbehrlich.

**N-08 · Quellen mit Resten.** VIII ZR 316/06 (12.09.2007): Aktenzeichen und Datum bestätigt (Verzeichnis des Berliner Mietervereins), den Inhalt („renovierte Rückgabe unabhängig vom Zeitpunkt der letzten Renovierung“) habe ich nicht am Volltext prüfen können; er stimmt mit meinem Kenntnisstand überein (Endrenovierungsklausel). VIII ZR 361/03 (23.06.2004) wird in VIII ZR 185/14 Rn. 20 genau so wiedergegeben wie im Kurs. XII ZR 225/03, VIII ZR 347/04, VIII ZR 114/04 (Leitsatz: Verjährung beginnt mit Rückerhalt auch bei später entstehenden Ansprüchen, NJW 2005, 739): Aktenzeichen und Daten stimmen, Volltext nicht eingesehen. Diese Zeilen in `rechtsangaben-b.md` ehrlich als „Aktenzeichen, Datum und Kernaussage bestätigt, Volltext nicht gelesen“ führen, wo die Zeile „Leitsatz gelesen“ behauptet; das betrifft nur die Rechtsangaben, nicht den Lerntext (H-01).

## Prüfung im Einzelnen

### 1. Rechnen (41 Werte und Daten, `prb-rechnen.cjs`)

| Stelle | Rechnung | Ergebnis |
|---|---|---|
| Theorie T2 | 612 + 148 = 760; 760 × 15 % = 114; × 4 = 456 | richtig |
| Theorie T2 | 12 × 612 = 7.344; 7.344 + 1.936 − 456 = 8.824; gezahlt 12 × 760 − 456 = 8.664; Differenz 160; 1.936 − 1.776 = 160 | richtig; das Verfahren entspricht VIII ZR 223/10 Rn. 16 (Gesamtjahresmiete gegen Zahlungen) |
| Theorie T3 | 620 × 12 = 7.440; × 8 % = 595,20; 58 + 87 = 145; 131 über 110 | richtig |
| Theorie T5 | 2.052 ÷ 12 = 171; 12 × 148 = 1.776; Nachzahlung 276 | richtig |
| Theorie T6 | 12.05.2026 = Dienstag; Fristende 12.11.2026 = Donnerstag | richtig |
| Q-4.5-04 | 735 + 170 = 905; × 12 % = 108,60 | richtig, Akzeptierte Antworten vollständig (Komma/Punkt, mit und ohne Null, € / Euro / EUR) |
| Q-4.5-05 | 920 × 10 % = 92; 92 ÷ 30 × 12 = 36,80 (April 30 Tage) | richtig |
| Q-4.5-09 | 585 × 12 = 7.020; × 8 % = 561,60 | richtig |
| Q-4.5-12 | 14 ÷ 84 = 1/6; 960 ÷ 6 = 160; 248 − 160 = 88 | richtig (M-04) |
| Q-4.5-13 | 1.956 ÷ 12 = 163 | richtig |
| Q-4.5-15 | 18.08.2026 = Dienstag; 18.02.2027 = Donnerstag | richtig |
| F TA2 | 690 + 145 = 835; × 20 % = 167; 11. bis 25.01. = 15 Tage; 167 ÷ 31 × 15 = 80,806 → 80,81 | richtig |
| F TA4 | 28.07.2027 = Mittwoch; 28.01.2028 = Freitag; 16.08.2027 = Montag | richtig |
| F TA5 | 18 ÷ 90 = 20 %; 1.170 × 20 % = 234; 310 − 234 = 76 | richtig |
| F | 11.01.2027 = Montag; 26.01.2027 = Dienstag | richtig |

Fristenden: kein Feiertag (12.11.2026, 18.02.2027, 28.01.2028). Zahlenkollisionen mit Teil A (alle 25 genannten Werte gegen Theorie, Quiz und Fall B geprüft): keine. `pruefe-paket.cjs zahlen` (Test-Config im Scratchpad): nur Treffer innerhalb des Pakets und in Entwürfen anderer Kurse (1.275 €, 88,00 €, 2.760 €, 1.170 €, 10,90 €), keiner in `content/immobilienfachwirt/`. Die Nennung „9,10 €, 10,90 €“ im Kopfstück des Falls ist nur der Abgrenzungshinweis. Die Zahlen 960 (Bestand 4.4: Heizkostenbeispiel, ohne Bezug) und 620 (hb2: Mieteingänge, ohne Bezug) im Bestand sind keine Kollision.

### 2. Rechtlicher Faktencheck

Am Rohtext (curl, gesetze-im-internet.de, 21.10.2026) gelesen: §§ 187, 188, 193, 195, 203, 204, 306, 320, 535, 536, 536a, 536b, 536c, 536d, 538, 539, 540, 541, 543, 546, 546a, 548, 553, 555a, 555b, 556, 560, 568, 570, 573c BGB. Alle Stützangaben der Theorie passen zum Wortlaut (zum Beispiel § 536 Abs. 1a „drei Monate … § 555b Nummer 1“, § 536c Abs. 2 Satz 2 Nr. 1 bis 3, § 553 Abs. 1 bis 3, § 548 Abs. 1 Satz 1, 2, Abs. 2, § 560 Abs. 4, § 570). § 555b Nr. 1a (Heizungsanlage) steht im Rohtext. Drucksache 21/6807 (PDF Bundestag, 01.07.2026): Art. 1 Nr. 1 und Begründung gelesen, Inhaltsangabe im Kurs richtig; Verfahrensdaten nicht bestätigt (M-08).

Entscheidungen (Volltext gesetze.co, außer wo vermerkt):

| Entscheidung | Kurs | Befund |
|---|---|---|
| VIII ZR 271/17, 05.12.2018 | Wärmebrücken, zumutbares Heizen und Lüften | Leitsätze 1 und 2 stimmen |
| VIII ZR 19/14, 17.06.2015 | Zurückbehaltung neben Minderung, zeitlich und betragsmäßig begrenzt, „schematische Betrachtung verbietet sich“ | stimmt (Leitsatz 3, 4; Rn. 62 bis 65); Verzug bei Einrede Rn. 45 (M-01) |
| VIII ZR 12/18, 10.04.2019 | Verweigerung der Duldung: keine weitere Minderung, Einbehalt entfällt | Leitsatz 2 stimmt |
| XII ZR 225/03, VIII ZR 347/04 | Bruttomiete als Bemessungsgrundlage | Aktenzeichen bestätigt; Volltext nicht eingesehen; VIII ZR 19/14 Rn. 47 rechnet ebenfalls mit der Bruttomiete |
| VIII ZR 223/10, 13.04.2011 | Minderung und Betriebskostenabrechnung | Rn. 14 bis 16 stimmen, Formel wörtlich |
| VIII ZR 79/22, 06.03.2024 | Schönheitsreparaturen Teil der Instandhaltung, abdingbar; Quotenabgeltung als Formularklausel unwirksam, individuell möglich; Aushandeln | Leitsatz 1 und 2, Rn. 19, 20 (mit Verweis auf VIII ZR 91/88), 24, 25 stimmen |
| VIII ZR 361/03, 23.06.2004 | starre Fristen | über VIII ZR 185/14 Rn. 20 bestätigt |
| VIII ZR 316/06, 12.09.2007 | renovierte Rückgabe | Aktenzeichen und Datum bestätigt, Inhalt nicht am Volltext (N-08) |
| VIII ZR 185/14, 18.03.2015 | unrenoviert ohne Ausgleich, Gesamteindruck, Beweislast | Inhalt stimmt, Randnummern falsch (M-01) |
| VIII ZR 285/12, VIII ZR 242/13 | Quotenabgeltung | Leitsätze gelesen: Aussage trägt |
| VIII ZR 277/16, 22.08.2018 | Ausgleich; Vereinbarung nur Vor-/Folgemieter | Leitsatz 1, 2 stimmen |
| VIII ZR 163/18, 08.07.2020 | Folge der Unwirksamkeit, hälftige Beteiligung | Leitsatz stimmt; Verallgemeinerung falsch (M-02) |
| VIII ZR 349/13, 11.06.2014 | Zimmer behalten = Teil des Wohnraums | Leitsatz 2 stimmt |
| VIII ZR 88/22, 27.09.2023 | berechtigtes Interesse, Kostensenkung genügt, berufliche Nebenwohnung | stimmt (Rn. 17 bis 19, 22, 33, 34) |
| VIII ZR 228/23, 28.01.2026 | Untervermietung mit Gewinn | Aktenzeichen, Datum, 460/962, Leitsätze stimmen; Darstellung der offenen Fragen unscharf (M-03) |
| VIII ZR 168/12, 20.03.2013 | Hunde und Katzen | Leitsatz stimmt |
| VIII ZR 245/11, 15.05.2012 | Anpassung der Vorauszahlung, inhaltlich richtige Abrechnung, Sicherheitszuschlag | Rn. 14 bis 16 stimmen |
| VIII ZR 263/14, 20.07.2016 | Kautionsrückgabe, verjährte Betriebskosten | Leitsatz 1 und 2 stimmen |
| VIII ZR 402/12, 23.10.2013 | Rückerhalt, Kenntnis, Hauswart | Leitsatz und Rn. 12, 15 bis 18 stimmen (Rn. 20 falsch zitiert, M-01) |
| XII ZR 96/23, 29.01.2025 | Schlüsseleinwurf vor Vertragsende, Gewerberaum | Leitsatz 1 bis 3 stimmen; das Datum wird in den Quellen unterschiedlich genannt (Datenbank 28.01., Landesverband, IHK, Mieterverein 29.01.2025); 29.01.2025 ist ein Mittwoch (Sitzungstag des XII. Senats), die Datenbank zeigt auch bei den übrigen Urteilen den Vortag: kein Befund |
| VIII ZR 114/04, 19.01.2005 | Frist beginnt auch für später entstehende Ansprüche | Aktenzeichen und Leitsatz über Sekundärquellen bestätigt |
| III ZR 146/07 | § 193 BGB auf Verjährungsfristen | über NWB/CMS bestätigt (M-09) |

**Kleinreparaturklausel-Richtwerte** (75 bis 120 € je Reparatur, 6 bis 8 % der Jahresnettokaltmiete): im Lerntext zutreffend als Richtwerte der Praxis und als „vermutet“ gekennzeichnet (Stand-Zusatz vorhanden); in den Karten gar nicht genannt, im Quiz (110 €, 8 %) ausdrücklich als Annahme der Aufgabe. Das Urteil VIII ZR 91/88 steht als Verweis in VIII ZR 79/22 Rn. 20 (bestätigt). Nichts als gesichert dargestellt.

**„Vermutet“-Aussagen im Kurstext:** Antwortfrist und Schweigen, Besuch, Rückwirkung der Vorauszahlungsanpassung, Richtwerte Kleinreparatur, Übertragung von XII ZR 96/23 auf Wohnraum (nicht „aus Kenntnis“ als gesichert, sondern als Übertragung gekennzeichnet): keine ist als gesichert dargestellt. Der Wortlaut der Kennzeichnung ist zu bereinigen (H-01).

### 3. Fachlich

- Definitionen (Sachmangel, Rechtsmangel, Minderung, Mängelanzeige, Zurückbehaltungsrecht, Selbstvornahme, Untermietzuschlag, Rückerhalt) richtig. Eine falsche Rechtsannahme im Fall habe ich nicht gefunden (Schimmel/Minderung im Fachgespräch korrekt vorsichtig, Klauselprüfung, Rückgabe und Verjährung stimmen); die Einschränkungen stehen in M-02, M-03, M-05, M-10, M-11.
- Quiz: genau eine richtige Antwort in Q-01, -06, -16; Q-07 drei richtige, zwei falsche (Wirksamkeit der beiden falschen Optionen geprüft: Renovierung nach Bedarf und Ersatz schuldhaft verursachter Schäden sind nicht unwirksam); Q-02 vier eindeutige Paare; Q-03 und -11 eindeutig; Q-10 eindeutig; Q-14 genau 4 Elemente (Eindeutigkeit M-06); jede Frage ohne Kontext beantwortbar (Sachverhaltsvereinfachung in Q-06 genannt, Q-07 nennt „renoviert übergeben“).
- Fall: 20 Punkte, fünf Teilaufgaben je 4 Punkte, jede Rasterzeile summiert auf 4, Folgefehler-Zeile stimmig. Ausgangssituation 218 Wörter, verrät keine Antwort (die Sachverhaltsvereinfachung „unabhängig vom Zustand der Räume“ ist zur Aufgabendefinition nötig). Fachgespräch: 3 Fragen mit 5, 5 und 4 Erwartungen und je einer Rückfrage; Aussagen decken sich mit der Theorie.

### 4. Bestand und Klone

- **Widersprüche** zu `hb4/4.1` (aktueller Stand 20.10.2026: Mietanpassung, Kündigung, Kaution drei Nettokaltmieten, Mahnwesen), `4.3` (Priorisierung), `4.4` (Vorauszahlung „jede Seite durch Erklärung in Textform“, Zwischenablesung, Wartung/Instandhaltung), `hb1/1.1` (Mietminderung, Kündigung) und `hb2/2.1` (Kaution als Fremdgeld): **keine**. Die Verweise nennen Thema und Fachgebiet („Thema 4.1 Mietverwaltung“, „Thema 2.1 Rechnungswesen und Jahresabschluss im Fachgebiet Unternehmenssteuerung und Kontrolle“) und sind richtig. Keine Wiederholung statt Verweis: Kündigungsfristen und Kaution nur im Überblick.
- **Ersetzungen** (`ersetzungen-b.json`): drei Paare; die alten Zeichenketten kommen in `hb1/1.1` (Z. 23), `hb4/4.3` (Z. 37) und `hb4/4.4` (Z. 25) je **genau einmal** und einzeilig vor; der neue Text ist sinnvoll, die Verweise enthalten Titel und Fachgebiet. Der Verweis in `hb4/4.3` ist knapp (ein Satz), in 4.4 ein Klammerzusatz. Die lange Themenbezeichnung wird dreimal vollständig wiederholt; wenn gewünscht, auf „Thema 4.5 Mietrecht im Bestand im Fachgebiet Immobilienbewirtschaftung“ kürzen (kein Befund). Keine Überschneidung mit `ersetzungen-a.json` (die dortige Stelle liegt in `hb4/4.1`).
- **Prüfblatt 18 und Duell-Set Immobilien:** keine Fundstelle zu Minderung, Untervermietung, Schönheitsreparaturen, Rückgabe oder Verjährung (Suche in `docs/pruefblaetter/18-immobilienfachwirt.md` und `apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts`).
- **Klone:** `pruefe-paket.cjs siebenwort`: Treffer nur im eigenen Paket (Rechtsangaben, Teil A, Format-Kopf) und bei Konventionsformeln (`rechtsstand`, „Stand Oktober 2026, vor Verwendung prüfen“, ID-Köpfe). Inhaltliche Läufe in Fremdkursen: keine; der 17-Wörter-Lauf „stand oktober 2026 vor verwendung prüfen x wahr falsch erklärung ein gewinn über die“ im Handelsfachwirt ist reine Struktur. Strukturklone zu Bestandsfragen oder Schwesterkursen: keine (Suche nach Schönheitsreparatur, Mietminderung, Mängelanzeige, Untervermietung, Quotenabgeltung in `content/` und den Entwürfen: nur `hb1/1.1` Mietminderung allgemein).

### 5. Hausregeln

Du/Sie richtig (Karten duzen: K-04 „berechnest du“; Fall und Fachgespräch siezen). Gendern: Mietpartei, Vermieterseite, Eigentümerseite, Mieter:innen; „Mieter“, „Mieterin“, „Hauswart“ nur für bestimmte Einzelpersonen in Fall und Quiz (zulässig). Keine Paragrafen oder Gesetzesnamen in Karten und Quiz (Suche nach §, BGB, Abs., VIII ZR: keine Treffer); in der Theorie stehen Stützangaben. IDs K-4.5-01 bis -14 und Q-4.5-01 bis -16 lückenlos, Fall F-HB4-06. Frontmatter bis auf `thema_code`, `thema_title` und `rechtsstand` identisch mit 4.4 (diff geprüft). Quiztypen: Multiple Choice 3, Mehrfachauswahl 1, Zuordnung 1, Wahr/Falsch 2, Kurzantwort 6, Lückentext 1, Entweder-Oder 1, Sortieren 1. Theorie 7 Abschnitte, 3.524 Wörter (Auftrag: rund 3.500 bis 4.000; durchgängig verständlich, die Abschnitte T1 und T3 sind dicht, aber nicht zu lang). Karten-Antworten 157 bis 247 Zeichen. Position der richtigen Antwort (immer Platz 2 bei den drei Multiple-Choice-Fragen) unkritisch, da die Anwendung die Optionen mischt.

## Zusammenfassung der Korrekturen vor dem Einspielen

1. H-01: alle Lesestatus- und Ich-Vermerke aus dem Lerntext streichen (26 + 8 Stellen, 3 Ich-Sätze).
2. M-01 bis M-03, M-08, M-09: Randnummern berichtigen, VIII ZR 163/18 einschränken, VIII ZR 228/23 und die Verfahrensdaten von „Mietrecht II“ präzisieren, § 193-Aussage ersetzen.
3. M-04 bis M-07, M-10, M-11: Quiz Q-12 und Fall (Untermiete einschließlich Nebenkosten), Q-14 eindeutig ordnen, K-14 ändern, Fallsachverhalt Teilaufgabe 3 und 4 überarbeiten.
4. Niedrige Befunde nach Ermessen; `rechtsangaben-b.md` nach den Änderungen nachführen (Nr. 11, 22, 26, 29, 31, 43, 58, 61, 66).
