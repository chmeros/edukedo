# Fachliche Prüfung: Entwurf Ergänzungen Rechnungswesen und Volkswirtschaft (Technischer Fachwirt)

Stand 12.10.2026 · Prüfgegenstand: `docs/entwuerfe/tf-ergaenzungen-rechnungswesen-vwl.md` (acht Theorieabschnitte für WQ2 2.1 bis 2.3 und WQ1 1.1). Geprüft wurden Fachlichkeit, alle Zahlen (eigenes Python-Skript, Decimal-Arithmetik), Widersprüche zu den vorhandenen Texten in `content/technischer-fachwirt/wq2/2.1`, `2.2`, `2.3` und `wq1/1.1`, Verständlichkeit, Hausregeln (`content/README.md`, Abschnitt „Schreibweise“) und Rechtsnähe. Am Entwurf und unter `content/` wurde nichts geändert.

Die Abschnittsnummern entsprechen dem Entwurf (1 Cashflow, 2 Bilanzstruktur, 3 Rückstellungen/RAP, 4 Skonto/Rabatt/Bezugskosten, 5 Wertpapiere/Fremdwährung, 6 BAB/Stufenleiter, 7 Gewinnvergleich, 8 Geld/Inflation/BIP).

## Zusammenfassung

| Art | Anzahl |
|---|---|
| Fehler | 2 |
| ungenau | 15 |
| fehlt | 5 |
| Stil | 5 |
| rechtsnah (eigene Liste, Teil davon deckungsgleich mit obigen Befunden) | 8 |

**Rechnerisch ist der Entwurf sauber.** Alle Zahlen, Buchungsbeträge (inklusive Umsatzsteuer/Vorsteuer und Skontoaufteilung), Kursumrechnungen, die BAB-Tabelle (Zuschlagssätze exakt 10 %, 180 %, 12 %), der Gewinnvergleich, Preisindex, reales BIP und Quantitätsgleichung stimmen (Details im Abschnitt „Rechenprüfung“). Die Buchungssätze haben durchgehend die richtige Soll-/Haben-Seite und gleichen aus. Die Probleme liegen bei Definitionen, einer Rechtsaussage (Fremdwährung), einer geerbten Rentabilitätsformel und der inneren Abstimmung einzelner Beispiele.

Wichtigste Befunde:

1. **F-01 (Abschnitt 5):** Fremdwährungsposten mit Restlaufzeit bis zu einem Jahr: Kursgewinne „dürfen“ berücksichtigt werden. Richtig ist, dass bei Restlaufzeit bis zu einem Jahr zum Stichtagskurs umgerechnet werden muss, Gewinne und Verluste also beide auszuweisen sind (Pflicht, kein Wahlrecht).
2. **F-02 (Abschnitt 7, geerbt aus 2.3):** Die Rentabilität „Gewinn / halbe Anschaffungskosten“ berücksichtigt nicht, dass die kalkulatorischen Zinsen schon als Kosten abgezogen sind. Nach gängiger Lehrbuchformel sind sie wieder zu addieren (A: 21,7 % statt 16,7 %; B: 27,1 % statt 22,1 %).
3. **U-01 (Abschnitt 3):** Die Rückstellungsdefinition („dem Grund nach entstanden“) passt nicht zum eigenen Beispiel „Rechtsstreit“ und zur Abgrenzung zur Verbindlichkeit.
4. **U-04 (Abschnitt 6):** Die Herstellkosten von 16.000.000 € passen nicht zu den im selben BAB gezeigten Einzelkosten und Gemeinkosten (diese ergeben rund 3,61 Mio. €); die Lernenden werden das bemerken.
5. **U-06 (Abschnitt 8):** „Staatsausgaben“ in der BIP-Verwendungsrechnung verleitet dazu, Transferzahlungen einzurechnen.

---

## A. Befunde nach Schwere

### A.1 Fehler

#### F-01 · Abschnitt 5 (Wertpapiere und Fremdwährung) · Art: Fehler · rechtsnah

**Zitat:** „In Worten: **Kursverluste** (die Forderung ist weniger wert, die Verbindlichkeit mehr) werden berücksichtigt; **Kursgewinne** dürfen nach HGB bei Forderungen und Verbindlichkeiten mit einer Restlaufzeit von höchstens einem Jahr ebenfalls berücksichtigt werden, bei längeren Laufzeiten dürfen sie nicht ausgewiesen werden.“

**Begründung:** Seit der Modernisierung des Bilanzrechts (BilMoG) gilt für auf fremde Währung lautende Vermögensgegenstände und Verbindlichkeiten mit einer Restlaufzeit von höchstens einem Jahr: Umrechnung zum Stichtagskurs, ohne Anwendung von Anschaffungskosten- und Realisationsprinzip. Das ist eine Pflicht, kein Wahlrecht; auch unrealisierte Gewinne sind dann auszuweisen. Bei Restlaufzeit über einem Jahr gilt das Vorsichtsprinzip (Verluste ja, Gewinne nein, bei Forderungen Obergrenze Anschaffungskurs, bei Verbindlichkeiten Untergrenze). Der Entwurf formuliert „dürfen“ und erzeugt damit ein Wahlrecht, das es nicht gibt. Außerdem betrifft die Regel nicht nur Forderungen und Verbindlichkeiten, sondern alle Fremdwährungsposten (zum Beispiel Bankguthaben in Fremdwährung). Sicherheit: hoch (rund 90 %); die Vorschrift ist § 256a HGB, die Quelle sollte beim Rechtsstand-Review gegengeprüft werden. Hinweis: Viele ältere Lehrbücher und manche Prüfungsaufgaben lehren noch die rein imparitätische Variante (Forderungen: Niederstwert, Verbindlichkeiten: Höchstwert); das ist für die Klausur zu klären (Aufgabentext, Rechtsstand).

**Korrekturvorschlag (Wortlaut):** „Im Zeitpunkt des Geschäfts wird mit dem Kurs dieses Tages gebucht; am Stichtag werden Fremdwährungsposten neu bewertet. Bei einer Restlaufzeit von höchstens einem Jahr wird zum Stichtagskurs umgerechnet, und Kursgewinne wie Kursverluste werden ausgewiesen. Bei längeren Restlaufzeiten gilt das Vorsichtsprinzip: Kursverluste werden berücksichtigt, Kursgewinne über dem ursprünglichen Wert nicht. Gewinne und Verluste aus dem Kurs werden auf eigenen Konten gebucht (Erträge und Aufwendungen aus der Währungsumrechnung). *Rechtsstand zur Prüfung vorgemerkt.*“ Dazu ein kurzer Satz im Beispiel „Forderung“: „Hätte der Stichtagskurs 3,80 PLN je Euro betragen, wäre die Forderung 52.631,58 € wert gewesen und der Mehrwert von 2.631,58 € wäre als Ertrag auszuweisen.“ (200.000 / 3,80 = 52.631,58.)

---

#### F-02 · Abschnitt 7 (Gewinnvergleichsrechnung) · Art: Fehler (geerbt aus `2.3`, dort ebenfalls zu korrigieren)

**Zitat:** „| Rentabilität (Gewinn / halbe Anschaffungskosten) | 20.000 / 120.000 = 16,7 % | 33.100 / 150.000 = 22,1 % |“ sowie „Bei unterschiedlichem Kapitaleinsatz ergänzt man sie um die Rentabilität“.

**Begründung:** Die Kosten im Gewinnvergleich enthalten die kalkulatorischen Zinsen (6.000 € bei A, 7.500 € bei B). Der Gewinn ist damit der Gewinn nach Abzug der Kapitalverzinsung. Teilt man ihn durch das durchschnittlich gebundene Kapital, erhält man nur die Überrendite über dem kalkulatorischen Zinssatz. Die übliche Lehrbuchformel der statischen Rentabilitätsrechnung lautet: Rentabilität = (durchschnittlicher Gewinn + kalkulatorische Zinsen) / durchschnittlich gebundenes Kapital. Rechnung: A (20.000 + 6.000) / 120.000 = 21,67 %; B (33.100 + 7.500) / 150.000 = 27,07 %. Der Vergleich mit einem „geforderten Mindestzins“ (so der vorhandene Text in 2.3) ist nur mit dieser Größe sinnvoll; sonst wird die Verzinsung doppelt berücksichtigt. Der Entwurf übernimmt die Definition aus 2.3 („20.000 € / (240.000 € / 2) = 16,7 %“), sie ist dort also bereits so formuliert; eine Korrektur gehört in beide Texte (2.3 Theorie „Statische Verfahren rechnen“, Karteikarte zur Rentabilität, Zuordnungsfrage). Sicherheit: etwa 85 %; unterschiedliche Lehrbücher definieren den Gewinn mit oder ohne Zinsen, die Aufgabenstellung muss dann sagen, was gemeint ist. Verwandt: Auch der Rückfluss der Amortisationsrechnung („Gewinn plus Abschreibung“) wird teils um die kalkulatorischen Zinsen ergänzt, da sie keine Auszahlung sind; das ist eine Variante, kein Fehler.

**Korrekturvorschlag (Wortlaut):** Tabellenzeile: „| Rentabilität ((Gewinn + kalkulatorische Zinsen) / halbe Anschaffungskosten) | (20.000 + 6.000) / 120.000 = 21,7 % | (33.100 + 7.500) / 150.000 = 27,1 % |“. Satz im Fließtext: „Die kalkulatorischen Zinsen sind in den Kosten schon abgezogen; für die Rentabilität werden sie wieder zum Gewinn addiert, bevor man mit dem geforderten Mindestzins vergleicht.“ Bei Beibehaltung der alten Definition mindestens: „Der Gewinn ist hier nach Abzug der kalkulatorischen Zinsen gerechnet; die Rentabilität zeigt daher die Verzinsung über den kalkulatorischen Zinssatz hinaus.“

---

### A.2 Ungenau

#### U-01 · Abschnitt 3 · Art: ungenau · rechtsnah

**Zitat:** „**Rückstellungen** sind Verpflichtungen, die ihrem Grund nach schon in der Periode entstanden sind, deren **Höhe oder Fälligkeit aber noch ungewiss** ist. Beispiele sind Gewährleistungen auf gelieferte Bauteile, drohende Kosten aus einem Rechtsstreit oder Pensionsverpflichtungen. […] Ist dagegen alles sicher (Grund, Höhe, Fälligkeit), liegt eine **Verbindlichkeit** vor.“

**Begründung:** Bei einem Rechtsstreit ist gerade ungewiss, **ob** die Verpflichtung besteht; der „Grund“ ist nicht sicher. Auch bei Gewährleistung ist nicht sicher, dass ein bestimmter Anspruch entsteht (Erfahrungswert, Wahrscheinlichkeit). Lehrbuchdefinition: Rückstellungen sind ungewisse Verbindlichkeiten (dem Grund, der Höhe oder dem Zeitpunkt nach ungewiss), bei denen eine Inanspruchnahme wahrscheinlich ist, und drohende Verluste aus schwebenden Geschäften; es muss sich um eine Verpflichtung gegenüber Dritten handeln, die wirtschaftlich in der Periode verursacht ist. Der Entwurf schränkt auf „Grund sicher“ ein und widerspricht damit seinem Beispiel. Sicherheit: hoch (rund 90 %).

**Korrekturvorschlag (Wortlaut):** „**Rückstellungen** sind Verpflichtungen gegenüber Dritten (und drohende Verluste), die wirtschaftlich in der Periode verursacht sind, bei denen aber der **Grund, die Höhe oder der Zeitpunkt der Fälligkeit noch ungewiss** ist und mit einer Inanspruchnahme ernsthaft zu rechnen ist. Beispiele sind […]. Steht dagegen alles fest (Bestehen, Höhe, Fälligkeit), liegt eine **Verbindlichkeit** vor.“

---

#### U-02 · Abschnitt 2 (Bilanzstruktur) · Art: ungenau

**Zitat:** „Der **Anlagendeckungsgrad II** von 125 % erfüllt die goldene Bilanzregel (mindestens 100 %), während der Anlagendeckungsgrad I mit 75 % allein nicht ausreicht.“

**Begründung:** In der Literatur wird die „goldene Bilanzregel“ unterschiedlich weit gefasst: im weiteren Sinn (Grad II mindestens 100 %) und im engeren Sinn (Grad I mindestens 100 %, nur Eigenkapital deckt das Anlagevermögen, wünschenswert, aber selten erreicht). „Nicht ausreicht“ klingt, als sei Grad I unter 100 % ein Verstoß. Das ist nur nach der engeren Auslegung so und widerspricht dem vorhandenen Text („Anlagendeckungsgrad II setzt zusätzlich das langfristige Fremdkapital an“) nicht, ist aber missverständlich. Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „Der **Anlagendeckungsgrad II** von 125 % erfüllt die goldene Bilanzregel im üblichen Sinn (mindestens 100 %). Der Anlagendeckungsgrad I liegt mit 75 % unter 100 %: Das Anlagevermögen ist nicht allein durch Eigenkapital gedeckt, ein Teil ist langfristig fremdfinanziert, was bei ausreichender Deckung durch Grad II unproblematisch ist.“

---

#### U-03 · Abschnitt 2 (Strukturbilanz) · Art: ungenau

**Zitat:** „| mittelfristig (Vorräte) | 4 | 20 % | langfristiges Fremdkapital | 6 | 30 % |“ und „jeweils in kurz-, mittel- und langfristig“.

**Begründung:** Die Tabelle stellt Vermögen und Kapital zeilenweise gegenüber. Dadurch steht „mittelfristig (Vorräte)“ in einer Zeile mit „langfristiges Fremdkapital“, obwohl der Text sagt, beide Seiten würden in kurz-, mittel- und langfristig geordnet. Mittelfristiges Kapital gibt es im Beispiel gar nicht. Wer die Zeilen als Entsprechung liest, vergleicht Vorräte (mittelfristig) mit langfristigem Fremdkapital. Zudem sind die Summen je Fristigkeit (langfristig 12 gegen 15, kurzfristig 4 gegen 5) die eigentliche Aussage und stehen nicht nebeneinander. Sicherheit: hoch (didaktisch).

**Korrekturvorschlag (Wortlaut):** Satz vor der Tabelle: „Mittelfristiges Kapital gibt es im Beispiel nicht; die Zeilen von Vermögen und Kapital gehören deshalb nicht paarweise zusammen.“ Zusätzlich zwei Zeilen im Fließtext: „Langfristig: Vermögen 12, Kapital 9 + 6 = 15. Kurzfristig: Vermögen 4, Kapital 5. Die Vorräte (4) liegen dazwischen und werden von dem langfristigen Überschuss (3) und dem kurzfristigen Überhang (1) finanziert.“

---

#### U-04 · Abschnitt 6 (BAB) · Art: ungenau (geerbt, aber im neuen Abschnitt sichtbar)

**Zitat:** „| Bezugsgröße | | | | 1.500.000 € Materialeinzelkosten | 700.000 € Fertigungslöhne | 16.000.000 € Herstellkosten |“

**Begründung:** Die Herstellkosten der Periode ergeben sich aus den Teilen derselben Tabelle: 1.500.000 + 150.000 (Materialgemeinkosten) + 700.000 + 1.260.000 (Fertigungsgemeinkosten) = 3.610.000 €, nicht 16.000.000 €. Verwaltung und Vertrieb mit 1.920.000 € wären bezogen auf 3,61 Mio. € ein Zuschlag von 53 %. Die Zahl 16 Mio. € stammt aus 2.2 „Zuschlagssätze und Bezugskalkulation“ und ist dort schon unabgestimmt; der Entwurf räumt das nur in „Zu entscheiden“ Punkt 9 ein, nicht im Lehrtext. Im Lehrtext stehen beide Zahlen direkt nebeneinander, sodass aufmerksame Lernende fragen, wo die übrigen 12,4 Mio. € herkommen. Sicherheit: sicher (Rechnung). Ob die Zahl geändert (dann ändert sich der Satz 12 % in 2.2, 2.2-Quiz usw.) oder erklärt wird, ist Entscheidung der Redaktion.

**Korrekturvorschlag (Wortlaut), minimal:** Nach der Tabelle: „Die Herstellkosten von 16.000.000 € umfassen im Beispiel auch Kostenstellen und Einzelkosten, die hier nicht aufgeführt sind (zum Beispiel Montage, Qualitätssicherung und Fremdleistungen); die Tabelle zeigt nur die Umlage der Hilfsstellen auf Material, Zerspanung und Verwaltung und Vertrieb.“ Bessere Lösung: Zahlen in 2.2 und hier so abstimmen, dass die Herstellkosten aus den Teilen folgen.

---

#### U-05 · Abschnitt 6 (BAB) · Art: ungenau

**Zitat:** „Eine andere Reihenfolge der Stufen würde andere Zuschlagssätze liefern; die Reihenfolge ist deshalb zu begründen.“

**Begründung:** Die Aussage stimmt, ist aber im Beispiel kaum erlebbar: Würde man zuerst die Instandhaltung abrechnen (380.000 / 5.000 h = 76,00 € je Stunde) und dann die Energie nur auf Material, Zerspanung und Verwaltung/Vertrieb (200.000 / 360.000 kWh ≈ 0,5556 € je kWh; die 40.000 kWh der Instandhaltung entfielen als Rückleistung an eine bereits abgerechnete Stelle), ergäben sich Gemeinkosten von 149.111 €, 1.260.667 € und 1.920.222 € und damit Zuschlagssätze von 9,94 %, 180,10 % und 12,00 %. Die Abweichung liegt unter einem Zehntel Prozentpunkt. Das Beispiel veranschaulicht die Vereinfachung des Verfahrens („Rückleistungen bleiben unberücksichtigt“) nicht, weil die Energieversorgung überhaupt keine Instandhaltung bezieht. Sicherheit: sicher (Rechnung).

**Korrekturvorschlag (Wortlaut):** „Eine andere Reihenfolge der Stufen würde andere Zuschlagssätze liefern; im Beispiel wären es bei umgekehrter Reihenfolge nur geringfügig andere Werte (rund 9,9 %, 180,1 % und 12,0 %), weil die Hilfsstellen sich kaum gegenseitig beliefern. Je stärker sich die Hilfsstellen gegenseitig Leistungen erbringen, desto größer ist der Unterschied, und desto eher lohnt das Gleichungsverfahren. Die Reihenfolge ist deshalb zu begründen.“

---

#### U-06 · Abschnitt 8 (BIP) · Art: ungenau

**Zitat:** „**BIP = privater Konsum + Investitionen + Staatsausgaben + (Exporte − Importe)**“

**Begründung:** In der Verwendungsrechnung zählen die Konsumausgaben des Staates (Staatsverbrauch) sowie Bruttoinvestitionen einschließlich Vorratsveränderung. Transferzahlungen (Renten, Wohngeld, Subventionen) gehören nicht dazu, weil ihnen keine Produktion gegenübersteht. „Staatsausgaben“ ist im Alltag das gesamte Haushaltsvolumen und verleitet zu diesem Fehler, der in Klausuren häufig vorkommt. Der Entwurf vermerkt die Vereinfachung nur in „Zu entscheiden“ Punkt 8 (c), nicht im Text. Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „**BIP = privater Konsum + Investitionen (brutto) + Staatsverbrauch + (Exporte − Importe)**. Zum Staatsverbrauch zählen nur die Ausgaben des Staates für Güter und Dienstleistungen; Transferzahlungen wie Renten zählen nicht mit, weil ihnen keine Produktion gegenübersteht.“

---

#### U-07 · Abschnitt 8 (reales BIP) · Art: ungenau

**Zitat:** „**reales BIP = nominales BIP / Preisindex · 100**. Der Quotient aus nominalem und realem BIP ist der **BIP-Deflator**.“

**Begründung:** Zwei Ungenauigkeiten. Erstens ist der BIP-Deflator (nominales BIP / reales BIP · 100) ein anderer Index als der im selben Abschnitt vorher erklärte Verbraucherpreisindex nach Laspeyres (Festmenge des Basisjahrs); der Deflator hat wechselnde Mengen (Paasche-Typ). Der Text nennt in der Formel „Preisindex“ und im Beispiel „Deflator“, ohne den Unterschied zu sagen. Zweitens fehlt beim Deflator der Faktor 100 (der Text nutzt selbst „Deflator 100“ im Basisjahr). Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „…**reales BIP = nominales BIP / Preisindex · 100**, wobei für das BIP der Preisindex des gesamten Güterbündels verwendet wird, der **BIP-Deflator**: **BIP-Deflator = nominales BIP / reales BIP · 100**. Er unterscheidet sich vom Verbraucherpreisindex, der nur den Warenkorb der privaten Haushalte misst.“

---

#### U-08 · Abschnitte 1 und 3 (Cashflow) · Art: ungenau

**Zitat:** „**Cashflow = Jahresüberschuss + Abschreibungen + Zuführung zu Rückstellungen**. Auflösungen von Rückstellungen und nicht zahlungswirksame Erträge würden entsprechend abgezogen“ und (Abschnitt 3) „Die Bildung belastet den Gewinn der Periode, obwohl noch nichts bezahlt wurde; deshalb wird sie im Cashflow wieder addiert.“

**Begründung:** Gemeint ist die **Veränderung** der Rückstellungen: Zuführung minus Inanspruchnahme minus Auflösung. Im Abschnitt 3 selbst wird die Rückstellung im Folgejahr durch eine Zahlung (40.460 € Verbindlichkeit) verbraucht; ohne Abzug der Inanspruchnahme würde der Cashflow des Folgejahres überschätzt. Der Entwurf nennt die Auflösung, aber nicht die Inanspruchnahme. Außerdem ist es üblich (und im Hinweis des Entwurfs auch angedeutet), nur langfristige Rückstellungen als Cashflow-Bestandteil zu führen; das hängt von der Definition ab. Sicherheit: mittel bis hoch.

**Korrekturvorschlag (Wortlaut):** „**Cashflow = Jahresüberschuss + Abschreibungen + Zunahme der Rückstellungen** (Zuführungen abzüglich Inanspruchnahme und Auflösung). […]“ und im Abschnitt 3: „…deshalb wird sie im Cashflow wieder addiert; wird die Rückstellung später durch eine Zahlung verbraucht, mindert das den Cashflow dieser Periode.“

---

#### U-09 · Abschnitt 1 (ROI-Zeile) · Art: ungenau

**Zitat:** „| **ROI** | Umsatzrentabilität (mit Gewinn plus Zinsen) · Kapitalumschlag | (1,8 / 22,5) · 1,125 = 8 % · 1,125 = **9 %** |“

**Begründung:** Direkt darüber steht „Umsatzrentabilität = 1,35 / 22,5 = 6 %“. In der ROI-Zeile heißt dieselbe Bezeichnung 8 %. Zwei verschiedene Kennzahlen mit demselben Namen in einer Tabelle sind für Lernende verwirrend und gefährlich für spätere Quiz-Aufgaben (typische falsche Option). Sicherheit: sicher (Verständlichkeit).

**Korrekturvorschlag (Wortlaut):** Zeile: „| **ROI** | Umsatzrendite vor Fremdkapitalzinsen ((Jahresüberschuss + Zinsen) / Umsatzerlöse) · Kapitalumschlag | (1,8 / 22,5) · 1,125 = 8 % · 1,125 = **9 %** |“ und im Fließtext: „Die Umsatzrendite vor Zinsen (8 %) ist nicht die Umsatzrentabilität in der Tabelle oben (6 %); sie hat die Zinsen im Zähler.“

---

#### U-10 · Abschnitt 5 · Art: ungenau

**Zitat:** „**Wertpapiere** gehören zum **Anlagevermögen**, wenn sie dauerhaft gehalten werden sollen (zum Beispiel Beteiligungen)“

**Begründung:** Beteiligungen (zum Beispiel Anteile an einer GmbH) sind keine Wertpapiere im engeren Sinn, sondern eigene Position der Finanzanlagen; typische Wertpapiere des Anlagevermögens sind Anleihen und Aktien, die langfristig gehalten werden. Die Unterscheidung ist in der Klausur relevant (Wertpapiere des Anlagevermögens, Beteiligungen, Wertpapiere des Umlaufvermögens als getrennte Bilanzposten). Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „…zum **Anlagevermögen**, wenn sie dauerhaft gehalten werden sollen (zum Beispiel Anleihen oder Aktien als langfristige Anlage; Beteiligungen sind eine eigene Position der Finanzanlagen) …“

---

#### U-11 · Abschnitt 4 · Art: ungenau

**Zitat:** „Nachträgliche Preisnachlässe (Bonus, Gutschrift, Rücksendung) werden entsprechend gebucht und mindern ebenfalls Erlös beziehungsweise Anschaffungskosten und die Steuer.“

**Begründung:** Eine Rücksendung ist kein Preisnachlass, sondern eine Rückabwicklung der Lieferung (Retoure) mit eigener Gutschrift; sie mindert zwar ebenfalls Menge, Erlös und Steuer, aber auf anderem Weg (Storno). Bonus und Gutschrift wegen Mängeln sind Preisnachlässe. Außerdem: Der Bonus wird oft nachträglich als Prozentsatz des Jahresumsatzes gewährt. Sicherheit: mittel (Wortwahl).

**Korrekturvorschlag (Wortlaut):** „Nachträgliche Preisnachlässe (zum Beispiel Bonus oder Gutschrift wegen Mängeln) werden entsprechend wie der Skonto gebucht: Sie mindern Erlös beziehungsweise Anschaffungskosten und die Steuer. Auch eine Rücksendung mindert Erlös beziehungsweise Anschaffungskosten und Steuer.“

---

#### U-12 · Abschnitt 8 (Quantitätsgleichung) · Art: ungenau

**Zitat:** „(Y = 3.200 Mrd. €, Preisniveau im Ausgangspunkt 1,0)“ und im Absatz davor „Das Basisjahr hat den Indexwert 100.“

**Begründung:** Der Abschnitt rechnet zuerst mit Indexwerten (100, 103, 106), in der Quantitätsgleichung dann mit einem Preisniveau von 1,0 (also 100 / 100). Beide Schreibweisen sind richtig, werden aber nicht verbunden; der Sprung von Indexpunkten auf einen Faktor wird nicht erklärt. Sicherheit: sicher (Verständlichkeit).

**Korrekturvorschlag (Wortlaut):** „…Preisniveau im Ausgangspunkt P = 1,0 (entspricht dem Indexwert 100)…“ und „…auf P = 1,10 (Indexwert 110)“.

---

#### U-13 · Abschnitt 3 (Versicherung, Miete) · Art: ungenau · rechtsnah

**Zitat:** „*Beispiel:* Vantera zahlt am 1. Oktober eine Versicherungsprämie von 12.000 € …“ und „*Beispiel (vereinfacht ohne Umsatzsteuer):* Eine Fremdfirma mietet eine Lagerfläche der Vantera …“

**Begründung:** Der Hinweis „vereinfacht ohne Umsatzsteuer“ steht nur bei der Miete. Bei der Versicherungsprämie fehlt eine Erklärung, warum keine Umsatzsteuer genannt wird (Versicherungsprämien sind umsatzsteuerfrei und unterliegen der Versicherungsteuer, die in der Prämie enthalten ist). Wer „Beträge ohne Umsatzsteuer“ im Kopf hat, fragt sich, ob hier 19 % vergessen wurden. Die Miete ist im Beispiel „vereinfacht“; tatsächlich ist Vermietung an Unternehmen steuerfrei, sofern nicht zur Steuerpflicht optiert wird (Rechtsaussage, vermeiden). Sicherheit: mittel bis hoch.

**Korrekturvorschlag (Wortlaut):** Bei der Versicherung: „(Versicherungsprämien tragen keine Umsatzsteuer, das Beispiel rechnet mit dem Gesamtbetrag.)“ Bei der Miete: „(vereinfacht ohne Umsatzsteuer; steuerliche Besonderheiten bleiben außer Betracht)“.

---

#### U-14 · Abschnitt 3 · Art: ungenau

**Zitat:** „Zum 31. Dezember gehört 1 / 6 = 1.000 € zum alten Jahr, 5 / 6 = **5.000 €** zum neuen. Abgrenzung: **Mieterträge 5.000 € an passive Rechnungsabgrenzung 5.000 €.**“

**Begründung:** Rechnerisch richtig. Beim aktiven Beispiel wird die Auflösung im Folgejahr gezeigt, beim passiven nicht; die Lernenden haben dann nur zur Hälfte gesehen, wie die Posten wieder verschwinden. Die Tabelle am Ende des Abschnitts fasst nur die Bilanzseite zusammen. Sicherheit: sicher.

**Korrekturvorschlag (Wortlaut):** Ergänzen: „Im neuen Jahr wird aufgelöst: **Passive Rechnungsabgrenzung 5.000 € an Mieterträge 5.000 €.**“

---

#### U-15 · Abschnitt 5 (Verbindlichkeitsbeispiel) · Art: ungenau

**Zitat:** „*Beispiel Verbindlichkeit:* Vantera kauft einen Spezialwerkstoff für 30.000 USD. Am Tag der Rechnung gilt 1 € = 1,20 USD: 30.000 / 1,20 = **25.000 €**.“

**Begründung:** Die Ersterfassung (Buchungssatz Rohstoffe 25.000 € an Verbindlichkeiten aus Lieferungen und Leistungen 25.000 €) fehlt, anders als beim Forderungsbeispiel. Außerdem fehlt der Hinweis „umsatzsteuerliche Besonderheiten bleiben außer Betracht“ (Einfuhr aus einem Drittland ist umsatzsteuerlich anders als ein Einkauf im Inland). Die Beträge sind richtig (30.000 / 1,10 = 27.272,73; Differenz 2.272,73). Sicherheit: sicher.

**Korrekturvorschlag (Wortlaut):** Nach „= **25.000 €**.“ einfügen: „Buchung: **Rohstoffe 25.000 € an Verbindlichkeiten aus Lieferungen und Leistungen 25.000 €** (umsatzsteuerliche Besonderheiten der Einfuhr bleiben außer Betracht).“

---

### A.3 Fehlt

#### M-01 · Abschnitt 3 · Art: fehlt

**Zitat:** „Liegt der Zahlungsvorgang erst **nach** dem Stichtag, spricht man von **sonstigen Verbindlichkeiten** und **sonstigen Forderungen**. […] Eine sonstige Forderung entsteht spiegelbildlich, wenn ein Ertrag des alten Jahres erst im neuen Jahr bezahlt wird.“

**Begründung:** Es fehlen die Begriffe **transitorisch** (Rechnungsabgrenzung, Zahlung vor dem Stichtag) und **antizipativ** (sonstige Forderungen und Verbindlichkeiten, Zahlung nach dem Stichtag). Die Begriffe sind in Prüfungen üblich. Ebenso fehlt ein Buchungssatz für die sonstige Forderung (nur „spiegelbildlich“). Bei den Rückstellungen fehlen die übrigen gängigen Arten (drohende Verluste aus schwebenden Geschäften, Kulanz, unterlassene Instandhaltung, Steuerrückstellungen); für den Fachwirt reichen zwei Sätze. Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „Rechnungsabgrenzungsposten heißen auch **transitorische** Posten (die Zahlung liegt vor dem Stichtag); sonstige Forderungen und sonstige Verbindlichkeiten heißen **antizipative** Posten (die Zahlung liegt nach dem Stichtag).“ Und: „*Beispiel sonstige Forderung:* Vantera erhält für ein verliehenes Darlehen von 100.000 € bei 3 % die Zinsen erst im Februar für das Vorjahr; zum 31. Dezember sind 3.000 € Zinsen entstanden. Buchung: **Sonstige Forderungen 3.000 € an Zinserträge 3.000 €.**“ Außerdem: „Weitere Rückstellungen sind zum Beispiel Rückstellungen für drohende Verluste aus Aufträgen, die zu niedrigeren Preisen als den Kosten angenommen wurden.“

---

#### M-02 · Abschnitt 8 (Geld) · Art: fehlt

**Zitat:** Überschrift „Geld, Inflation und BIP rechnen“; im Text kommt „Geld“ nur als „Kaufkraft des Geldes“, „Geldmenge“ und „Umlaufgeschwindigkeit des Geldes“ vor.

**Begründung:** Der Titel verspricht „Geld“, aber Geldfunktionen (Tauschmittel, Recheneinheit, Wertaufbewahrung), Geldarten und Geldmengenabgrenzung (M1 bis M3, zu M-Aggregaten nur Hinweis nötig) und die Rolle der Zentralbank fehlen. Der Entwurf lässt die Zentralbank bewusst weg („Zu entscheiden“ 8 b); die Geldfunktionen sind dagegen zeitlos und rechtsfrei und gehören zu jedem VWL-Rahmenplan. Sicherheit: mittel (Vollständigkeit hängt vom Rahmenplan ab).

**Korrekturvorschlag (Wortlaut):** Einfügen vor „Die **Inflation** ist …“: „**Geld** erfüllt drei Funktionen: Es ist **Tauschmittel** (Käufe ohne Tauschhandel), **Recheneinheit** (Preise sind vergleichbar) und **Wertaufbewahrungsmittel** (Kaufkraft wird in die Zukunft übertragen). Die Wertaufbewahrung leidet unter Inflation, weil dieselbe Geldmenge weniger Güter kauft. Die **Geldmenge** umfasst das Bargeld und die Guthaben, die für Zahlungen verfügbar sind; weitere Abgrenzungen (M1, M2, M3) zählen zusätzlich weniger liquide Anlagen dazu.“

---

#### M-03 · Abschnitt 8 (Preisindex) · Art: fehlt

**Zitat:** „Gemessen wird sie mit einem **Preisindex**, der die Kosten eines **Warenkorbs** typischer Güter und Dienstleistungen (Nahrung, Wohnen, Energie, Mobilität) im Zeitablauf vergleicht.“

**Begründung:** In Deutschland heißt der gemeinte Index **Verbraucherpreisindex (VPI)**, berechnet vom Statistischen Bundesamt. Der Begriff (und der Hinweis auf den europäischen Harmonisierten VPI) ist in Prüfungen und Medien gebräuchlich; im Lehrtext kommt er nicht vor. Ebenfalls fehlen Deflation (sinkendes Preisniveau) und eine Einordnung der Inflationsstärke. Sicherheit: hoch; konkrete Basisjahre und aktuelle Werte bewusst nicht nennen.

**Korrekturvorschlag (Wortlaut):** „…mit einem **Preisindex**, in Deutschland dem **Verbraucherpreisindex (VPI)** des Statistischen Bundesamts, der die Kosten eines Warenkorbs […] vergleicht. Sinkt das Preisniveau anhaltend, spricht man von **Deflation**.“

---

#### M-04 · Abschnitt 5 · Art: fehlt

**Zitat:** „*Beispiel Forderung:* […] Zum Stichtag gilt 1 € = 4,20 PLN […]“

**Begründung:** Das Beispiel zeigt nur den Kursverlust am Stichtag. Da der Abschnitt auch erklärt, wann Kursgewinne ausgewiesen werden dürfen, fehlt der gegenteilige Fall (Gewinn am Stichtag bei Forderung beziehungsweise Verbindlichkeit). Er ist in Klausuren häufig der kritische Fall (siehe F-01). Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** Siehe Zusatzsatz unter F-01 („Hätte der Stichtagskurs 3,80 PLN je Euro betragen …“) sowie ein Verbindlichkeitsbeispiel mit schwächerem Dollar (Kurs 1,30: 30.000 / 1,30 = 23.076,92 €; Ertrag 1.923,08 €, bei Restlaufzeit über einem Jahr nicht auszuweisen).

---

#### M-05 · Abschnitt 6 · Art: fehlt

**Zitat:** „Im BAB werden die Gemeinkosten zunächst den Kostenstellen zugeordnet, die sie verursacht haben (**primäre Gemeinkosten**).“

**Begründung:** Die Umlage zwischen den Kostenstellen heißt im Lehrbuch **innerbetriebliche Leistungsverrechnung** (und wird im vorhandenen Abschnitt 2.2 „Kostenstellenrechnung und Betriebsabrechnungsbogen“ so genannt). Der Entwurf verwendet den Begriff nicht und schafft damit keine Brücke zum vorhandenen Text. Ebenso fehlt der Hinweis, dass die Umlage keine Kosten erzeugt oder vernichtet (steht erst nach der Tabelle: „Die Summe … bleibt unverändert“). Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** „…ihre Kosten müssen daher auf die **Hauptkostenstellen** umgelegt werden (**innerbetriebliche Leistungsverrechnung**, die Kosten heißen danach **sekundäre Gemeinkosten**).“

---

### A.4 Stil

#### S-01 · Abschnitt 5 · Art: Stil

**Zitat:** „In Worten: **Kursverluste** (die Forderung ist weniger wert, die Verbindlichkeit mehr) werden berücksichtigt“

**Begründung:** „In Worten“ meint hier „kurz gesagt“; es steht aber ohne vorherige Formel, weil der Satz davor schon ein Rechenverfahren beschreibt. Der Ausdruck ist unklar. Siehe Korrekturvorschlag bei F-01, der den Satz ersetzt. Sicherheit: sicher.

**Korrekturvorschlag (Wortlaut):** Streichen („Dabei gilt:“ oder gar nichts).

---

#### S-02 · Abschnitte 3, 4, 5 · Art: Stil (Hausregeln)

**Zitat:** „*Rechtsstand zur Prüfung vorgemerkt.*“ (viermal: Abschnitt 3, Abschnitt 4, Abschnitt 5 zweimal)

**Begründung:** Der Satz ist eine interne Redaktionsnotiz, die im Lerntext steht und für Lernende nichts bedeutet. Im vorhandenen Bestand taucht er nirgends auf (Suche in `content/technischer-fachwirt/`). Der Rechtsstand wird im Frontmatter (`rechtsstand`) geführt; die Themen 2.1 bis 2.3 tragen dort schon den Hinweis, rechtliche Passagen vor Verwendung durch echte Lernende zu prüfen. Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** Die vier kursiven Sätze beim Einarbeiten streichen und stattdessen im Frontmatter von `2.1` den `rechtsstand` auf das Einarbeitungsdatum mit Nennung der drei Abschnitte setzen (zum Beispiel „12.10.2026 — Abschnitte Rückstellungen und Rechnungsabgrenzung, Skonto, Wertpapiere und Fremdwährung vor Verwendung durch echte Lernende rechtlich prüfen“).

---

#### S-03 · Abschnitte 3 und 8 · Art: Stil (Länge)

**Zitat:** Abschnitt 8, zweiter Absatz („Die **Inflationsrate** ist die Veränderung …“), rund 230 Wörter mit sieben Rechenschritten in einem Absatz; Abschnitt 3 enthält sieben Fließtextbeispiele.

**Begründung:** Die Verständlichkeit leidet: Inflationsrate, Kaufkraft, Realeinkommen und Realzins stehen in einem Block. Die Teilung, die der Entwurf selbst in „Zu entscheiden“ Punkt 1 vorschlägt, ist fachlich sinnvoll (3: Rückstellungen / Rechnungsabgrenzung und sonstige Posten; 8: Inflation / BIP / Quantitätsgleichung). Sicherheit: hoch.

**Korrekturvorschlag (Wortlaut):** Absatz 8.2 in drei Absätze teilen: (a) Inflationsrate und Kaufkraft; (b) Reallohn; (c) Realzins. Abschnitt 3 in „Rückstellungen“ und „Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten“ teilen.

---

#### S-04 · Abschnitt 4 · Art: Stil

**Zitat:** „Bei 2 % Skonto, 10 Tagen Skontofrist und 30 Tagen Zahlungsziel verzichtet man mit dem Zahlungsziel auf 2 % für 20 Tage.“

**Begründung:** Gemeint ist: Wer erst am Ende des Zahlungsziels zahlt, verzichtet auf den Skonto und nimmt dafür 20 Tage zusätzlichen Kredit. „Verzichtet man mit dem Zahlungsziel auf 2 %“ ist umständlich. Zudem ist 2 / 98 · 360 / 20 = 36,7 % keine „Näherung“ im engen Sinn, sondern die übliche Formel (einfache Verzinsung); das Wort „Näherung“ sollte durch „einfache Verzinsung“ ersetzt werden. Sicherheit: sicher.

**Korrekturvorschlag (Wortlaut):** „Zahlt Vantera nicht am zehnten Tag, sondern erst am Ende des Zahlungsziels von 30 Tagen, nimmt sie 20 Tage Kredit vom Lieferanten in Anspruch und verzichtet dafür auf 2 % Skonto. Der Jahreszins dieses Kredits beträgt bei einfacher Verzinsung 2 / 98 · 360 / 20 ≈ **36,7 %** (Tageszählung mit 360 Tagen).“ (Hinweis: „Lieferant“ ist ein Fachbegriff aus dem Bestand; wenn es als generisches Maskulinum zählt, „Lieferunternehmen“ oder „liefernde Unternehmen“.)

---

#### S-05 · Abschnitt 2 · Art: Stil

**Zitat:** „Der **Verschuldungsgrad** zeigt, wie viel Fremdkapital auf einen Euro Eigenkapital kommt; er hängt rechnerisch mit der Eigenkapitalquote zusammen.“ und „Aus der Strukturbilanz folgt keine Alarmstufe, wohl aber die Frage, …“

**Begründung:** „hängt rechnerisch zusammen“ ist vage; die Beziehung lässt sich in einer Formel angeben (Verschuldungsgrad = (1 − Eigenkapitalquote) / Eigenkapitalquote = 0,55 / 0,45 = 1,22). „Alarmstufe“ ist umgangssprachlich. Sicherheit: sicher.

**Korrekturvorschlag (Wortlaut):** „…er lässt sich aus der Eigenkapitalquote berechnen: (1 − 0,45) / 0,45 ≈ 1,22.“ und „Aus der Strukturbilanz folgt kein akuter Handlungsbedarf, wohl aber die Frage, …“.

---

## B. Rechtsnahe Stellen

Der Entwurf nennt keine Paragraphen, enthält aber an den folgenden Stellen Aussagen, die über allgemeine buchhalterische Grundsätze hinausgehen und vor Verwendung durch echte Lernende einer Rechtsprüfung (Iteration 22) bedürfen. Nach den Freigaberegeln R3/R4 sollten diese Passagen gesperrt bleiben, bis die Rechtsprüfung erfolgt ist; die Entscheidung liegt beim Projektleiter.

| Nr. | Abschnitt | Stelle (wörtlich) | Warum rechtsnah |
|---|---|---|---|
| R-01 | 3 | „Nach den handelsrechtlichen Vorschriften (HGB) sind die Voraussetzungen und die Bewertung im Einzelnen geregelt“ | Verweis auf das Gesetz; die Voraussetzungen des Rückstellungsansatzes (Außenverpflichtung, Wahrscheinlichkeit, wirtschaftliche Verursachung) sind gesetzlich bzw. durch Rechtsprechung bestimmt. |
| R-02 | 3 | „**Rückstellungen** sind Verpflichtungen, die ihrem Grund nach schon in der Periode entstanden sind …“; Beispiel „Pensionsverpflichtungen“ | Definition des Rückstellungsansatzes (siehe U-01); Pensionsrückstellungen unterliegen eigenen Bewertungsvorschriften (Abzinsung, Verfahren), die der Text nicht erwähnt. |
| R-03 | 3 | „… wenn die Zahlung und der Zeitraum, für den sie gilt, in verschiedenen Perioden liegen und der Zeitraum **bestimmt** ist.“ | Voraussetzung der Rechnungsabgrenzung (Abgrenzungspflicht nur für bestimmte Zeit); wörtlich eine Anforderung des Handelsrechts. |
| R-04 | 3 | „Wäre die Nacharbeit teurer geworden als 40.000 €, würde der Mehrbetrag zusätzlich als Aufwand gebucht.“ und „an sonstige betriebliche Erträge“ | Behandlung von Rückstellungsauflösung und Nachholung; Kontozuordnung hängt vom Kontenrahmen und der Gliederung der GuV ab. |
| R-05 | 4 | „… mindert beim Einkauf die **Anschaffungskosten** und die **Vorsteuer**, beim Verkauf die **Erlöse** und die **Umsatzsteuer**.“ und „Die steuerliche Behandlung der Berichtigung von Vorsteuer und Umsatzsteuer beim Skonto …“ | Umsatzsteuerliche Berichtigung (Entgeltminderung) und Anschaffungskostenminderung; der Steuersatz 19 % ist als „Beispielsatz“ markiert, bleibt aber ein steuerlicher Wert. |
| R-06 | 5 | „Beim Anlagevermögen ist eine Abschreibung bei **voraussichtlich dauernder** Wertminderung nötig; bei nur vorübergehender Wertminderung sieht das HGB bei Finanzanlagen ein Wahlrecht vor. Steigt der Kurs später wieder, wird nach HGB bis höchstens zu den Anschaffungskosten zugeschrieben“ | Niederstwertprinzip (strenges und gemildertes), Wahlrecht, Wertaufholungsgebot; ausdrückliche Rechtsaussage mit Nennung des HGB. |
| R-07 | 5 | „**Kursgewinne** dürfen nach HGB … ebenfalls berücksichtigt werden“ | Stichtagsbewertung von Fremdwährungsposten; im Entwurf zudem fachlich falsch (F-01). |
| R-08 | 3, 5 | „Versicherungsprämie“ ohne Umsatzsteuer; „Mieterträge“ ohne Umsatzsteuer; „umsatzsteuerliche Besonderheiten bleiben außer Betracht“ | Steuerrechtliche Behandlung (Versicherungsteuer, Option bei Vermietung, innergemeinschaftliche Lieferung) bleibt unausgesprochen; die Beispiele sind dadurch korrekt vereinfacht, sollten aber wie in U-13 vermerkt werden. |

Keine Rechtsaussage enthalten die Abschnitte 1 (Cashflow), 2 (Bilanzstruktur), 6 (BAB), 7 (Gewinnvergleich) und 8 (VWL).

---

## C. Gesamtbewertung je Abschnitt

| Abschnitt | Bewertung | Begründung kurz |
|---|---|---|
| 1 Cashflow und Rentabilitätskennzahlen | **einarbeiten** (mit den kleinen Präzisierungen U-08, U-09) | Alle Zahlen und Formeln richtig (Leverage-Formel stimmt exakt: 15,0 %), Definitionsvielfalt ist offen benannt. Zwei Präzisierungen empfohlen, kein sachlicher Fehler. |
| 2 Bilanzstruktur und Strukturbilanz | **mit Korrektur einarbeiten** | Zahlen richtig. Korrigieren: Aussage zur goldenen Bilanzregel (U-02), irreführende Zeilenzuordnung in der Strukturbilanz (U-03). |
| 3 Rückstellungen und Rechnungsabgrenzung | **mit Korrektur einarbeiten**, rechtsnahe Teile (R-01 bis R-04, R-08) bis zur Rechtsprüfung gesperrt lassen | Alle Buchungssätze und Beträge richtig. Rückstellungsdefinition anpassen (U-01), Begriffe transitorisch/antizipativ ergänzen (M-01), Auflösung der passiven RAP (U-14). |
| 4 Skonto, Rabatt und Bezugskosten verbuchen | **einarbeiten** (mit kleinen Textkorrekturen U-11, S-04); Rechtsnahes (R-05) unter Vorbehalt | Alle Beträge, Umsatzsteuer-/Vorsteueraufteilung und Buchungssätze stimmen; Einstandspreis 4.530 € passt zur Bezugskalkulation. |
| 5 Wertpapiere und Fremdwährung | **mit Korrektur einarbeiten** | Zahlen und Buchungen richtig, aber F-01 (Kursgewinne bei Restlaufzeit bis zu einem Jahr als „dürfen“) muss geändert werden; Wertpapierdefinition (U-10), Ergänzungen (U-15, M-04). Rechtsnahe Teile (R-06, R-07) bis zur Rechtsprüfung sperren. |
| 6 Kostenstellenumlage im BAB: Stufenleiterverfahren | **mit Korrektur einarbeiten** | Tabelle exakt richtig (10 %, 180 %, 12 %); Reihenfolge und Verfahren richtig beschrieben. Abstimmung der Herstellkosten (U-04), Aussage zur Reihenfolge einordnen (U-05), Begriff innerbetriebliche Leistungsverrechnung (M-05). |
| 7 Gewinnvergleichsrechnung rechnen | **mit Korrektur einarbeiten** | Alle Zahlen richtig und gut abgestimmt auf 2.3. Rentabilität ohne Rückaddition der Zinsen (F-02) ändern, zugleich in 2.3 korrigieren. |
| 8 Geld, Inflation und BIP rechnen | **mit Korrektur einarbeiten** | Alle Zahlen richtig. Verwendungsrechnung und Deflator präzisieren (U-06, U-07), Geldfunktionen und VPI ergänzen (M-02, M-03), Absatz teilen (S-03). |

Zusammenhängende Änderungen im Bestand, die bei der Einarbeitung von Abschnitt 7 mitzuziehen sind: Theorie `2.3` „Statische Verfahren rechnen“ (Rentabilität), Karteikarte „Wie berechnet man Amortisationsdauer und Rentabilität einer Investition?“ und die Zuordnungsfrage zur Rentabilität in `2.3`.

---

## D. Rechenprüfung (eigenes Skript)

Mit einem eigenen Python-Skript (Decimal-Arithmetik, Rundung auf Cent) wurden alle Zahlen des Entwurfs nachgerechnet. Sämtliche Ergebnisse stimmen mit dem Entwurf überein; Abweichungen gab es nicht.

| Abschnitt | geprüft | Ergebnis |
|---|---|---|
| 1 | Cashflow 2,7; Cashflow-Umsatzrate 12 %; Umsatzrentabilität 6 %; Gesamtkapitalrentabilität 9 %; Kapitalumschlag 1,125; ROI 9 %; Entschuldungsdauer 3,70 Jahre; Fremdkapitalzins 4,09 %; Leverage exakt 15,0 % (mit gerundeten 4,1 %: 14,99 %); Zahlenbeispiel 13 % und 1 % | stimmt |
| 2 | 60 %, 40 %, 55 %, 122,2 %, Working Capital 3, Deckungsgrad II 125 %, Anteile der Strukturbilanz, Identität „Überschuss = Working Capital“ | stimmt |
| 3 | 40.000; 6.460; 40.460; 6.000; 3.000 / 9.000; 1.000 / 5.000; 6.000 / 2.000 | stimmt |
| 4 | 855; 5.355; 22,80; 142,80; Skonto 107,10 = 90,00 + 17,10; Zahlung 5.247,90; Anschaffungskosten 4.530; Ausgang 1.368; 8.568; Skonto 171,36 = 144,00 + 27,36; 8.396,64; Skontoverzinsung 36,73 % (365-Tage-Zählung wäre 37,2 %, Effektivzins mit Zinseszins 44,6 %; der Text nennt 360 Tage ausdrücklich) | stimmt; beide Buchungssätze gleichen aus (Summe Soll = Summe Haben) |
| 5 | 42.420; 3.920; 1.580; 50.000; 47.619,05; 48.780,49; 2.380,95; 1.161,44; −1.219,51; 25.000; 27.272,73; 2.272,73 | stimmt |
| 6 | Primäre Summe 3.330.000; Umlagesatz 0,50; Anteile 20.000/10.000/150.000/20.000; Instandhaltung 400.000, 80,00 € je Stunde; nach Umlage 150.000 / 1.260.000 / 1.920.000 (Summe 3.330.000); Zuschlagssätze 10 %, 180 %, 12 % exakt. Umgekehrte Reihenfolge: 149.111 / 1.260.667 / 1.920.222, also 9,94 %, 180,10 %, 12,00 %. Herstellkosten aus den Teilen: 1.500.000 + 150.000 + 700.000 + 1.260.000 = 3.610.000 (nicht 16.000.000) | stimmt; Auffälligkeit siehe U-04 |
| 7 | Erlöse 80.000 / 88.000; Betriebskosten B 9.900; Kosten 60.000 / 54.900; Gewinn 20.000 / 33.100; Stückwerte 30,00 / 24,95 und 10,00 / 15,05; Rentabilität 16,7 % / 22,1 %; Zerlegung 26.000 + 7.100 = 33.100. Zum Vergleich mit Zinsen-Rückaddition: 21,7 % / 27,1 % | stimmt; Definition siehe F-02 |
| 8 | Warenkorb 2.000 / 2.060; Index 103,0; Inflationsrate 2,91 %; Kaufkraft 0,9434 (Verlust 5,66 %); Reallohn 3.000 / 2.973,40 (−0,89 %); Realzins 2,94 %; BIP 3.200; reales BIP 3.300; Wachstum 5,19 % / 3,125 %; V = 4,0; 3.520; P = 1,10; P = 1,068 | stimmt |

**Widerspruchsprüfung gegen die vorhandenen Texte:** Bilanzdaten (12 / 8 / 4 / 3 / 1 / 9 / 11 / 5), Einstandspreis 4.530 €, Zuschlagssätze 10 %, 180 %, 12 % und Bezugsgrößen, Fräsmaschine 240.000 € (6 Jahre) und Maschine B (300.000 €, 8 Jahre), Jahresgewinn 20.000 €, Amortisationsbeispiel und das Beispiel der degressiven/linearen Abschreibung stimmen mit den Texten in `2.1`, `2.2` und `2.3` überein. Echte Widersprüche zu den vorhandenen Texten bestehen nicht; auffällig sind nur die geerbte Rentabilitätsdefinition (F-02) und die geerbte Herstellkostenbasis (U-04).

## E. Hausregeln (Schreibweise)

- **Anrede:** Die Theorietexte sprechen die Lernenden nicht an (kein „Du“, kein „Sie“ als Anrede); „man“ und Passiv sind unproblematisch. In Ordnung.
- **Zahlen:** Tausenderpunkt, Dezimalkomma, Leerzeichen vor „€“, „%“, „Mio.“, „Mrd.“, „kWh“, „PLN“, „USD“ durchgehend eingehalten (Prüfung per Textsuche auf „Zahl%“, „Zahl€“ und vierstellige Zahlen ohne Tausenderpunkt: keine Treffer). In Ordnung.
- **Gendern:** Es kommen keine Personenbezeichnungen im generischen Maskulinum oder Femininum vor, die zu ändern wären („Beschäftigten“, „Kundschaft“, „liefernde Unternehmen“, „Fremdfirma“). Kontenbezeichnungen und Fachbegriffe wie „Kundenskonto“, „Kundenrabatt“, „Lieferantenrabatt“ und „Lieferantenskonto“ stehen so schon im Bestand (2.2) und werden hier übernommen; als Fachbegriffe vertretbar. In Ordnung.
- **Sonstiges:** Der Zusatz „*Rechtsstand zur Prüfung vorgemerkt.*“ ist kein Lerninhalt (siehe S-02).
