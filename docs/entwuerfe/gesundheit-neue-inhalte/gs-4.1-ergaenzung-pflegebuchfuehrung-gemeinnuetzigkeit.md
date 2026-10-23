# Entwurf Fachwirt im Gesundheits- und Sozialwesen, Pflege-Buchführung, Kameralistik und Doppik, Gemeinnützigkeit: Ergänzung im Thema 4.1

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil AY-A des Pakets P-AW (Auftrag `docs/entwuerfe/gesundheit-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/gesundheit-r4-auswertung.md`, Lücke GS-16). Einzufügen in `content/fachwirt-gesundheit-soziales/hb4/4.1-rechnungswesen-jahresabschluss.md`: Abschnitt A **vor der Überschrift „### Abschreibungen“** (Anker; die Theorie steht damit hinter „Gewinn- und Verlustrechnung sowie Jahresabschluss“), B an die Karteikarten hinter K-4.1-20, C an das Quiz hinter Q-4.1-17. Bestand gezählt (Stand 23.10.2026): 20 Karteikarten (K-4.1-01 bis -20, lückenlos), 17 Quizfragen (Q-4.1-01 bis -17, lückenlos); `git log -S` auf K-4.1-21, K-4.1-32, Q-4.1-18, Q-4.1-31, F-HB4-07 und F-HB4-09 ergibt im Kurs keine entfernten IDs. Die neuen IDs sind K-4.1-21 bis -32 (12 Karten) und Q-4.1-18 bis -31 (14 Quizfragen, davon 3 Rechen-Kurzantworten und 2 Datums-Kurzantworten). Die Fallaufgabe F-HB4-09 (Bestand F-HB4-01 bis -06, Teil AV-A vergibt F-HB4-07, Teil AV-B F-HB4-08; Einspielreihenfolge AV-A, AV-B, AY-A) und drei Fachgesprächsfragen stehen in `gs-faelle-ay-a.md`, die Rechtsangaben in `rechtsangaben-ay-a.md`, die vier Ersetzungen im Bestand (`hb4/4.1` Zeilen 17, 46 und 153, `hb4/fachgespraech.md` Zeile 21) in `ersetzungen-ay-a.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand behandelt das Rechnungswesen als allgemeines Handelsrecht (doppelte Buchführung, Bilanz, GuV, Abschreibung) und sagt in Thema 1.1 nur, dass die gGmbH nach den Regeln der Gemeinnützigkeit ausgerichtet ist. Es fehlen die besonderen Buchführungspflichten zugelassener Pflegeeinrichtungen (Pflege-Buchführungsverordnung, PBV), der Unterschied von Kameralistik und Doppik bei öffentlichen Trägern sowie die Gemeinnützigkeit aus der Sicht des Rechnungswesens: die vier Sphären, der Zweckbetrieb der Wohlfahrtspflege, die zeitnahe Mittelverwendung und die Rücklagen. Thema 4.1 ist das Zuhause für die zeitnahe Mittelverwendung, die Rücklagen und die 100.000-€-Schwelle (Teil AY-B verweist darauf). Die Ergänzung wiederholt nichts aus den Abschnitten zu Aufbewahrung, Rückstellungen und außerplanmäßiger Abschreibung (letzter Stand: P-AU), nichts aus Thema 1.1 (Rechtsformen, Ausschüttungsverbot der gGmbH) und nichts aus Thema 4.4 (Bilanzkennzahlen); sie verweist darauf. Spendenrecht (Zuwendungsbestätigung, Sponsoring) gehört zu Thema 6.4 (Teil AY-B), die Krankenhaus-Buchführungsverordnung ist nur erwähnt, Haushaltsrecht der Länder und Kommunen nur als „je nach Landesrecht“. Euro-Leistungsbeträge der Pflegekassen und Pflegegrad-Schwellen kommen nicht vor; die Zahlen der Rechenbeispiele sind gekennzeichnete Beispielwerte, die Grenzwerte der Gesetze (zum Beispiel Zahl der Vollzeitkräfte, Besteuerungsgrenze) sind als Gesetzeswerte kenntlich.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch. Rechtsgrundlagen am Rohtext von gesetze-im-internet.de gelesen (PBV, KHBV, Abgabenordnung, HGB, Haushaltsgrundsätzegesetz, KStG, GewStG; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-ay-a.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Schwellen der zeitnahen Mittelverwendung und der Besteuerungsgrenze (zuletzt angehoben), der Anwendungserlass zur Abgabenordnung (geändert durch Schreiben des Bundesfinanzministeriums vom 02.07.2026, im Wortlaut nicht gelesen), die Landesregelungen zum Haushaltsrecht.

---

# Thema 4.1

## A. Theorie-Ergänzung 4.1 (einfügen vor „### Abschreibungen“)

### Pflege-Buchführung für zugelassene Pflegeeinrichtungen

Wie ein Pflegedienst bucht und seinen Jahresabschluss aufstellt, richtet sich nicht allein nach dem Handelsrecht. Für zugelassene Pflegeeinrichtungen gilt eine eigene Verordnung, die Pflege-Buchführungsverordnung (PBV), die auf einer Ermächtigung im Recht der Pflegeversicherung beruht (Stützangabe § 83 Abs. 1 Satz 1 Nr. 3 SGB XI; Stand Oktober 2026, vor Verwendung prüfen).

**Wer betroffen ist.** Pflegeeinrichtungen im Sinne der Verordnung sind ambulante Pflegedienste sowie teilstationäre und vollstationäre Pflegeheime, mit denen ein Versorgungsvertrag nach dem Recht der Pflegeversicherung besteht (Stützangabe § 1 Abs. 2 PBV). Die Pflichten gelten unabhängig von der Rechtsform und davon, ob die Einrichtung Kaufleute im Sinne des Handelsgesetzbuchs betreibt (§ 1 Abs. 1); ein Pflegedienst in der Hand einer Einzelunternehmerin oder eines Vereins bucht deshalb nach diesen Regeln, soweit er nicht befreit ist (siehe unten). Erbringt die Einrichtung neben Pflegeleistungen auch andere Sozialleistungen (gemischte Einrichtung), beschränken sich die Pflichten auf die Leistungen, für die sie zugelassen ist (§ 1 Abs. 2, § 4 Abs. 3). Für Krankenhäuser gilt eine eigene Verordnung (Krankenhaus-Buchführungsverordnung), hier nicht vertieft.

**Was die Verordnung verlangt** (Stützangabe §§ 2 bis 7 PBV). Das Geschäftsjahr ist das Kalenderjahr. Die Bücher werden nach den Regeln der kaufmännischen doppelten Buchführung geführt, die Konten richten sich nach einem vorgegebenen Kontenrahmen; bei abweichendem Kontenplan muss die Umschlüsselung gewährleistet sein. Der Jahresabschluss besteht aus Bilanz, Gewinn- und Verlustrechnung und einem Anhang einschließlich des Anlagen- und Fördernachweises, gegliedert nach den Mustern der Verordnung, und ist innerhalb von sechs Monaten nach Ablauf des Geschäftsjahres aufzustellen. Mit Fördermitteln oder Zuwendungen Dritter angeschaffte Anlagegegenstände stehen mit dem Bruttowert auf der Aktivseite; ein **Sonderposten** auf der Passivseite weist die verwendeten Mittel abzüglich der bisherigen Abschreibungen aus (§ 5 Abs. 2).

Die nicht befreiten zugelassenen Einrichtungen (siehe unten) haben außerdem eine **Kosten- und Leistungsrechnung** zu führen, die Steuerung und Beurteilung der Wirtschaftlichkeit ermöglicht und die Leistungsnachweise für die Vergütungsverfahren erlaubt (§ 7). Mindestanforderungen sind Kostenstellen nach Aufgaben und Struktur, eine nachprüfbare Herleitung der Kosten aus der Buchführung und die verursachungsgerechte Zuordnung zu Kostenstellen und Kostenträgern. Sie ist damit für nicht befreite zugelassene Pflegeeinrichtungen nicht nur ein freiwilliges internes Instrument (zu ihren Methoden siehe Thema 4.3 „Kosten- und Leistungsrechnung“ im selben Fachgebiet).

**Befreiungen.** Kraft Gesetzes befreit sind Pflegedienste mit bis zu sechs Vollzeitkräften (Teilzeitkräfte werden auf Vollzeitkräfte umgerechnet); für kleine teilstationäre und vollstationäre Einrichtungen gelten entsprechende Platzgrenzen. Maßgeblich sind die Durchschnittswerte des abgelaufenen Geschäftsjahres. Die Befreiung gilt **nicht**, wenn die Umsätze aus dem Versorgungsauftrag (ohne Investitionsaufwendungen) im abgelaufenen Geschäftsjahr bei Pflegediensten 250.000 Euro, bei Pflegeheimen 500.000 Euro übersteigen (Stützangabe § 9 Abs. 1). Auf Antrag können Pflegedienste mit sieben bis zehn Vollzeitkräften ganz oder teilweise befreit werden; darüber entscheiden die Landesverbände der Pflegekassen gemeinsam im Einvernehmen mit der zuständigen Landesbehörde nach pflichtgemäßem Ermessen (§ 9 Abs. 2). Die Befreiung gilt für die Verordnung insgesamt, also auch für die Kosten- und Leistungsrechnung; befreite Einrichtungen führen eine vereinfachte Einnahmen- und Ausgabenrechnung nach den Grundsätzen ordnungsmäßiger Buchführung (§ 9 Abs. 3). Die genannten Zahlen sind Gesetzeswerte, keine Beispielwerte.

### Kameralistik und Doppik bei öffentlichen Trägern

Öffentliche Träger haben traditionell **kameral** gerechnet. Die **Kameralistik** ist die Rechnung des öffentlichen Haushalts: Der nach Titeln gegliederte Haushaltsplan wird mit den Einnahmen und Ausgaben (Zahlungen) eines Haushaltsjahres verglichen, um die Einhaltung der bewilligten Mittel nachzuweisen. Die **Doppik** ist die doppelte Buchführung nach kaufmännischem Vorbild; sie erfasst Erträge und Aufwendungen sowie Vermögen und Schulden und bildet den Ressourcenverbrauch einer Periode ab.

| Merkmal | Kameralistik | Doppik |
|---|---|---|
| Rechnungsgrößen | Einnahmen und Ausgaben (Zahlungen) | Erträge und Aufwendungen sowie Vermögen und Schulden |
| Grundlage | Haushaltsplan, gegliedert nach Titeln, je Haushaltsjahr | Erfolgsplan, Finanzplan und Buchführung nach kaufmännischen Grundsätzen |
| Abschreibungen | im Kern kein Aufwand der Periode | Aufwand der Periode |

Für Bund und Länder erlaubt das Haushaltsgrundsätzegesetz beide Formen; die staatliche Doppik folgt den handelsrechtlichen Vorschriften zur Buchführung und Bilanzierung (Stützangabe §§ 1a, 7a HGrG; Stand Oktober 2026, vor Verwendung prüfen). Das kommunale Haushaltsrecht ist Landesrecht; ob Kommunen und ihre Betriebe auf die Doppik umgestellt haben, ist je nach Landesrecht verschieden. Für eine zugelassene Pflegeeinrichtung ändert das nichts an ihrer eigenen Pflicht: Nach dem Wortlaut der Verordnung gilt sie unabhängig von der Rechtsform, und die Bücher sind doppelt zu führen; ob Landesrecht für Einrichtungen öffentlicher Träger etwas Besonderes regelt, ist je Land zu prüfen. Wie die Zahlen in den Haushalt des öffentlichen Trägers eingehen, regelt dessen Haushaltsrecht.

### Gemeinnützigkeit: Voraussetzungen und die vier Sphären

Zu den Rechtsformen gemeinnütziger Träger siehe Thema 1.1 „Rechtliche und institutionelle Rahmenbedingungen von Einrichtungen im Gesundheits- und Sozialwesen“ im Fachgebiet „Planen, Steuern und Organisieren betrieblicher Prozesse“. Hier geht es um Pflichten und Sphären (Stützangabe §§ 51 bis 68 Abgabenordnung, AO; Stand Oktober 2026, vor Verwendung prüfen).

**Voraussetzungen.** Steuerbegünstigt ist eine Körperschaft, die gemeinnützige, mildtätige oder kirchliche Zwecke ausschließlich und unmittelbar verfolgt (§ 51). Gemeinnützig ist, wer die Allgemeinheit selbstlos fördert; anerkannt sind unter anderem die Förderung der Jugend- und Altenhilfe, des Wohlfahrtswesens und des öffentlichen Gesundheitswesens (§ 52). Mildtätig ist, wer Personen selbstlos unterstützt, die infolge ihres körperlichen, geistigen oder seelischen Zustands auf die Hilfe anderer angewiesen oder wirtschaftlich bedürftig sind (§ 53). Drei Grundsätze gelten durchgehend: **Ausschließlichkeit** (nur steuerbegünstigte satzungsmäßige Zwecke, § 56), **Unmittelbarkeit** (die Körperschaft verwirklicht den Zweck selbst oder durch Hilfspersonen, § 57) und **Selbstlosigkeit** (§ 55). Selbstlos handelt, wer nicht in erster Linie eigenwirtschaftliche Zwecke verfolgt und außerdem: Mittel nur für die satzungsmäßigen Zwecke verwendet, Mitgliedern oder Gesellschaftern in dieser Eigenschaft keine Gewinnanteile oder sonstigen Zuwendungen gewährt, keine Person durch zweckfremde Ausgaben oder unverhältnismäßig hohe Vergütungen begünstigt, das Vermögen bei Auflösung an steuerbegünstigte Zwecke bindet (Vermögensbindung) und die Mittel grundsätzlich zeitnah verwendet.

Die Satzung muss Zweck und Art der Verwirklichung genau bestimmen und die vorgeschriebenen Festlegungen enthalten (§ 60); die tatsächliche Geschäftsführung muss der Satzung entsprechen (§ 63 Abs. 1) und wird durch ordnungsmäßige Aufzeichnungen über Einnahmen und Ausgaben nachgewiesen (§ 63 Abs. 3). Steuerlich wirkt die Gemeinnützigkeit vor allem als Befreiung von Körperschaftsteuer und Gewerbesteuer, jeweils nur insoweit, als kein wirtschaftlicher Geschäftsbetrieb unterhalten wird, der nicht Zweckbetrieb ist (Stützangabe § 5 Abs. 1 Nr. 9 KStG, § 3 Nr. 6 GewStG, § 64 Abs. 1 AO). Spendenabzug und Zuwendungsbestätigung behandelt Thema 6.4 „Sozialmarketing, Fundraising und Marketing-Controlling“ im Fachgebiet „Planen und Durchführen von Marketingmaßnahmen“.

**Die vier Sphären.** „Sphären“ ist kein Gesetzesbegriff, ordnet aber die Tätigkeiten einer gemeinnützigen Körperschaft steuerlich verschieden ein; Einnahmen und Ausgaben werden deshalb getrennt erfasst, in der Praxis häufig über eigene Kostenstellen und Konten.

- **Ideeller Bereich:** die satzungsmäßige Tätigkeit ohne Leistungsaustausch, finanziert zum Beispiel durch Mitgliedsbeiträge und Spenden.
- **Vermögensverwaltung:** die Nutzung von Vermögen, zum Beispiel verzinsliche Geldanlage oder Vermietung unbeweglichen Vermögens (Stützangabe § 14 Satz 3 AO); sie ist kein wirtschaftlicher Geschäftsbetrieb.
- **Wirtschaftlicher Geschäftsbetrieb:** eine selbständige nachhaltige Tätigkeit mit Einnahmen, die über die Vermögensverwaltung hinausgeht; Gewinnabsicht ist nicht nötig (§ 14). Beispiele sind eine Cafeteria für Gäste oder ein Basar.
- **Zweckbetrieb:** ein wirtschaftlicher Geschäftsbetrieb, der in seiner Gesamtrichtung den steuerbegünstigten Zwecken dient, dessen Zwecke nur durch einen solchen Betrieb erreichbar sind und der nicht in größerem Umfang als unvermeidbar mit nicht begünstigten Betrieben in Wettbewerb tritt (§ 65). Eine Einrichtung der Wohlfahrtspflege (planmäßige, zum Wohle der Allgemeinheit und nicht des Erwerbs wegen ausgeübte Sorge für notleidende oder gefährdete Mitmenschen, § 66 Abs. 2) ist Zweckbetrieb, wenn sie in besonderem Maß den in § 53 genannten Personen dient; das ist der Fall, wenn diesen mindestens zwei Drittel ihrer Leistungen zugutekommen (§ 66). Für Pflegeheime und Mahlzeitendienste gilt dieselbe Voraussetzung (§ 68 Nr. 1 Buchst. a), für Krankenhäuser eine eigene Regel (§ 67). Wie ein ambulanter Pflegedienst die Schwelle belegt, ist eine Frage der Verwaltungspraxis und hier nicht dargestellt.

Ein steuerpflichtiger wirtschaftlicher Geschäftsbetrieb verliert die Steuerbegünstigung für seine Besteuerungsgrundlagen; mehrere solche Betriebe gelten als ein Betrieb. Übersteigen ihre Einnahmen einschließlich Umsatzsteuer zusammen **50.000 Euro** im Jahr nicht, unterliegen die zugeordneten Besteuerungsgrundlagen nicht der Körperschaftsteuer und der Gewerbesteuer; es ist eine Freigrenze, kein Freibetrag, bei Überschreiten entfällt die Ausnahme für diese Betriebe insgesamt. Eine Aufteilung in mehrere selbständige Körperschaften nur zur mehrfachen Nutzung der Grenze gilt als Missbrauch (§ 64 Abs. 2 bis 4).

### Zeitnahe Mittelverwendung und Rücklagen

Eine gemeinnützige Körperschaft muss ihre Mittel vorbehaltlich der Rücklagenregeln grundsätzlich **zeitnah** für die steuerbegünstigten satzungsmäßigen Zwecke verwenden: spätestens in den auf den Zufluss folgenden zwei Kalender- oder Wirtschaftsjahren; auch die Anschaffung oder Herstellung von Vermögensgegenständen, die satzungsmäßigen Zwecken dienen, zählt als Verwendung (Stützangabe § 55 Abs. 1 Nr. 5 AO). Das Gebot gilt nicht für Körperschaften mit jährlichen Einnahmen von nicht mehr als 100.000 Euro (Stand Oktober 2026, vor Verwendung prüfen). Ansammeln darf die Körperschaft nur, was das Gesetz erlaubt (Stützangabe § 62):

- Eine **zweckgebundene Rücklage**, soweit sie erforderlich ist, um die steuerbegünstigten Zwecke nach dem Stand der Planung zum Zeitpunkt der Bildung nachhaltig zu erfüllen, zum Beispiel für ein geplantes Vorhaben.
- Eine **Rücklage für Wiederbeschaffung** von Wirtschaftsgütern, die für die Zwecke erforderlich sind; die Zuführung bemisst sich nach der regulären Abschreibung des zu ersetzenden Gegenstands (siehe den folgenden Abschnitt „Abschreibungen“), eine höhere Zuführung ist nachzuweisen.
- Eine **freie Rücklage** von höchstens einem Drittel des Überschusses aus der Vermögensverwaltung und darüber hinaus höchstens 10 Prozent der sonstigen zeitnah zu verwendenden Mittel; ein nicht ausgeschöpfter Höchstbetrag kann in den folgenden zwei Jahren nachgeholt werden.
- Eine Rücklage zur Erhaltung der prozentualen Beteiligung an Kapitalgesellschaften, die die freie Rücklage mindert.

Rücklagen werden innerhalb der Verwendungsfrist gebildet; fällt der Grund einer zweckgebundenen, einer Wiederbeschaffungs- oder einer Beteiligungsrücklage weg, ist sie unverzüglich aufzulösen, und die freigewordenen Mittel sind innerhalb der Frist zu verwenden. Von der zeitnahen Verwendung ausgenommen sind bestimmte Zuwendungen, zum Beispiel Erbschaften ohne Vorgabe für den laufenden Aufwand oder ausdrücklich der Vermögensausstattung gewidmete Zuwendungen (§ 62 Abs. 3). Hat die Körperschaft ohne Berechtigung Mittel angesammelt, kann das Finanzamt eine angemessene Frist für die Verwendung setzen (§ 63 Abs. 4). Die Weitergabe von Mitteln an eine andere steuerbegünstigte Körperschaft oder eine juristische Person des öffentlichen Rechts für steuerbegünstigte Zwecke ist unschädlich (§ 58 Nr. 1).

### Rechenbeispiele: Befreiung, Besteuerungsgrenze und Rücklagen

Alle Zahlen dieses Abschnitts sind frei gewählte Beispielwerte (Stand Oktober 2026, vor Verwendung prüfen); die Grenzwerte aus dem Gesetz stehen weiter oben.

- **Befreiung:** Ein Pflegedienst (Annahme) beschäftigt im Durchschnitt des abgelaufenen Geschäftsjahres 4 Vollzeitkräfte und 4 Teilzeitkräfte mit jeweils der Hälfte der Vollzeitarbeitszeit: 4 + 4 × 0,5 = 6 Vollzeitkräfte. Bei Umsätzen aus dem Versorgungsauftrag von 238.500 € ist er befreit, bei 262.500 € wäre er es nicht.
- **Frist:** Der Jahresabschluss 2026 ist sechs Monate nach Ablauf des Geschäftsjahres aufzustellen; das Beispiel zählt ab dem 01.01.2027 und endet mit Ablauf des 30.06.2027.
- **Zweckbetrieb:** Von 17.400 Einsatzstunden entfallen 11.310 auf Menschen des begünstigten Personenkreises: 11.310 ÷ 17.400 = 65 %. Zwei Drittel wären 11.600 Stunden; die Schwelle ist verfehlt (Maßstab des Beispiels: Einsatzstunden).
- **Besteuerungsgrenze:** Eine Cafeteria für Gäste erzielt 29.400 €, ein Basar 9.800 € Einnahmen einschließlich Umsatzsteuer; zusammen 39.200 €, das sind 10.800 € unter der Grenze von 50.000 €.
- **Zeitnahe Verwendung:** Eine Spende ohne Zweckbestimmung geht am 14.04.2026 ein; die Frist endet mit Ablauf des 31.12.2028 (Folgejahre 2027 und 2028; Kalenderjahr gleich Wirtschaftsjahr).
- **Freie Rücklage:** Bei einem Überschuss aus der Vermögensverwaltung von 15.000 € und sonstigen zeitnah zu verwendenden Mitteln von 230.000 € beträgt der Höchstbetrag 15.000 € ÷ 3 + 230.000 € × 10 % = 5.000 € + 23.000 € = 28.000 €.
- **Wiederbeschaffung:** Ein Dienstfahrzeug mit Anschaffungskosten von 42.000 € und acht Jahren Nutzungsdauer wird linear ohne Restwert abgeschrieben: 42.000 € ÷ 8 = 5.250 € je Jahr; in dieser Höhe kann jährlich zugeführt werden.

## B. Karteikarten 4.1 (anhängen)

#### K-4.1-21
**Frage:** Für welche Einrichtungen gelten neben dem Handelsrecht besondere Buchführungsregeln?
**Antwort:** Für zugelassene Pflegeeinrichtungen, also ambulante Dienste und Pflegeheime mit Versorgungsvertrag der Pflegeversicherung. Die Regeln gelten unabhängig von der Rechtsform und davon, ob der Träger Kaufmann im Sinne des Handelsrechts ist.
`tags: pflegebuchfuehrung, rechnungswesen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.1-22
**Frage:** Was verlangen die besonderen Buchführungsregeln für zugelassene Pflegeeinrichtungen?
**Antwort:** Doppelte Buchführung mit vorgegebenem Kontenrahmen, das Kalenderjahr als Geschäftsjahr und einen Jahresabschluss aus Bilanz, GuV und Anhang mit Anlagen- und Fördernachweis, aufzustellen binnen sechs Monaten nach Ablauf des Geschäftsjahres.
`tags: pflegebuchfuehrung, jahresabschluss` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.1-23
**Frage:** Wann ist ein Pflegedienst von den besonderen Buchführungsregeln befreit?
**Antwort:** Kraft Gesetzes bei bis zu sechs Vollzeitkräften (Teilzeit umgerechnet), nicht aber bei Umsätzen über 250.000 € aus dem Versorgungsauftrag. Bei sieben bis zehn Vollzeitkräften ist eine Befreiung auf Antrag möglich. Befreite führen eine vereinfachte Einnahmen-Ausgaben-Rechnung.
`tags: pflegebuchfuehrung, befreiung` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-4.1-24
**Frage:** Was muss die Kosten- und Leistungsrechnung einer nicht befreiten zugelassenen Pflegeeinrichtung leisten?
**Antwort:** Sie muss Steuerung und Wirtschaftlichkeitsbeurteilung ermöglichen, Kosten nachprüfbar aus der Buchführung herleiten, Kosten und Leistungen verursachungsgerecht Kostenstellen und Kostenträgern zuordnen und Leistungsnachweise für die Vergütungsverfahren erlauben.
`tags: pflegebuchfuehrung, kosten-leistungsrechnung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.1-25
**Frage:** Worin unterscheiden sich Kameralistik und Doppik?
**Antwort:** Die Kameralistik rechnet mit Einnahmen und Ausgaben nach dem Haushaltsplan eines Haushaltsjahres. Die Doppik bucht wie die kaufmännische Buchführung Erträge und Aufwendungen, zeigt Vermögen und Schulden in einer Bilanz und erfasst Abschreibungen als Aufwand der Periode.
`tags: kameralistik, doppik` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.1-26
**Frage:** Welche Rechnungsformen lässt das Haushaltsrecht für Bund und Länder zu, und wie bucht eine zugelassene Pflegeeinrichtung eines öffentlichen Trägers?
**Antwort:** Kameralistik oder Doppik; für Kommunen und ihre Betriebe gilt je nach Landesrecht Unterschiedliches. Die Pflegeeinrichtung bucht nach dem Wortlaut der besonderen Pflege-Buchführungsregeln doppelt; Besonderheiten des Landesrechts sind je Land zu prüfen.
`tags: kameralistik, doppik, oeffentliche-traeger` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-4.1-27
**Frage:** Welche Voraussetzungen muss eine Körperschaft für die Gemeinnützigkeit erfüllen?
**Antwort:** Sie muss steuerbegünstigte Zwecke ausschließlich, unmittelbar und selbstlos verfolgen. Satzung und tatsächliche Geschäftsführung müssen dazu passen, und die Geschäftsführung ist durch ordnungsmäßige Aufzeichnungen der Einnahmen und Ausgaben nachzuweisen.
`tags: gemeinnuetzigkeit, voraussetzungen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.1-28
**Frage:** Was gehört zur Selbstlosigkeit einer gemeinnützigen Körperschaft?
**Antwort:** Sie verfolgt nicht in erster Linie eigenwirtschaftliche Zwecke. Dazu gehören Mittel nur für satzungsmäßige Zwecke, keine unverhältnismäßig hohen Vergütungen, Vermögensbindung und zeitnahe Verwendung: spätestens in den zwei auf den Zufluss folgenden Kalender- oder Wirtschaftsjahren.
`tags: gemeinnuetzigkeit, selbstlosigkeit, mittelverwendung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.1-29
**Frage:** Nenne die vier Sphären einer gemeinnützigen Körperschaft mit je einem Beispiel.
**Antwort:** Ideeller Bereich (Mitgliedsbeiträge, Spenden), Vermögensverwaltung (Zinsen, Mieten), Zweckbetrieb (zum Beispiel ein Pflegeheim, das zu mindestens zwei Dritteln Hilfebedürftigen dient) und steuerpflichtiger wirtschaftlicher Geschäftsbetrieb (zum Beispiel eine Cafeteria für Gäste).
`tags: gemeinnuetzigkeit, sphaeren` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.1-30
**Frage:** Wann ist eine Einrichtung der Wohlfahrtspflege ein Zweckbetrieb?
**Antwort:** Wenn sie in besonderem Maß Menschen dient, die auf Hilfe angewiesen oder wirtschaftlich bedürftig sind. Das ist der Fall, wenn diesen mindestens zwei Drittel ihrer Leistungen zugutekommen. Der Betrieb bleibt dann steuerlich begünstigt.
`tags: gemeinnuetzigkeit, zweckbetrieb, wohlfahrtspflege` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-4.1-31
**Frage:** Was gilt für steuerpflichtige wirtschaftliche Geschäftsbetriebe bis zur Besteuerungsgrenze?
**Antwort:** Betragen ihre Einnahmen einschließlich Umsatzsteuer zusammen höchstens 50.000 € im Jahr, unterliegen sie nicht der Körperschaft- und Gewerbesteuer. Mehrere Betriebe werden zusammengerechnet; eine Aufteilung nur zur Mehrfachnutzung ist Missbrauch.
`tags: gemeinnuetzigkeit, wirtschaftlicher-geschaeftsbetrieb, besteuerungsgrenze` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-4.1-32
**Frage:** Welche Rücklagen darf eine gemeinnützige Körperschaft bilden?
**Antwort:** Zweckgebunden nach dem Stand der Planung (etwa für ein Vorhaben), für die Wiederbeschaffung (Höhe nach der Abschreibung), für den Beteiligungserhalt und eine freie Rücklage bis zu einem Drittel des Vermögensverwaltungsüberschusses plus 10 % der übrigen zeitnah zu verwendenden Mittel.
`tags: gemeinnuetzigkeit, ruecklagen` · `schwierigkeit: schwer` · `bloom: verstehen`

## C. Quiz 4.1 (anhängen)

#### Q-4.1-18 · Multiple Choice
**Frage:** Ein Einzelunternehmer betreibt einen zugelassenen ambulanten Pflegedienst und meint, er sei kein Kaufmann und müsse deshalb nur eine einfache Einnahmen-Ausgaben-Rechnung führen. Was gilt für seine Buchführung nach den besonderen Regeln für zugelassene Pflegeeinrichtungen grundsätzlich?
- [ ] Die Regeln gelten nur für Kaufleute, deshalb genügt für ihn die einfache Einnahmen-Ausgaben-Rechnung.
- [x] Sie gelten unabhängig von Rechtsform und Kaufmannseigenschaft, sofern er nicht befreit ist.
- [ ] Die Regeln gelten nur für Pflegeheime; Pflegedienste führen stets die einfache Rechnung.
- [ ] Die Regeln gelten nur, wenn er im Handelsregister eingetragen und nicht befreit ist.
**Erklärung:** Die Regeln knüpfen an die Zulassung durch den Versorgungsvertrag an, nicht an Rechtsform oder Kaufmannseigenschaft. Nur bei einer Befreiung genügt die vereinfachte Einnahmen-Ausgaben-Rechnung.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.1-19 · Wahr/Falsch
**Aussage:** Bei der Prüfung, ob ein Pflegedienst von den besonderen Buchführungsregeln befreit ist, bleiben Teilzeitkräfte unberücksichtigt.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Teilzeitkräfte werden auf Vollzeitkräfte umgerechnet und zählen mit ihrem Anteil. Maßgeblich sind außerdem die Durchschnittswerte des abgelaufenen Geschäftsjahres.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.1-20 · Kurzantwort
**Frage:** Ein Pflegedienst beschäftigt 5 Vollzeitkräfte und 6 Teilzeitkräfte mit jeweils der Hälfte der Vollzeitarbeitszeit. Wie viele Vollzeitkräfte sind das nach Umrechnung? Antworte als Zahl.
**Akzeptierte Antworten:** 8; 8,0; 8,00; 8.0; 8.00; 8 Vollzeitkräfte; 8 VZK
**Erklärung:** 5 + 6 × 0,5 = 8 Vollzeitkräfte. Damit liegt der Dienst über der Grenze für die Befreiung kraft Gesetzes, bei sieben bis zehn Vollzeitkräften ist nur eine Befreiung auf Antrag möglich.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.1-21 · Kurzantwort
**Frage:** Das Geschäftsjahr einer zugelassenen Pflegeeinrichtung ist das Kalenderjahr 2027. Der Jahresabschluss ist innerhalb von sechs Monaten nach Ablauf des Geschäftsjahres aufzustellen; die Frist beginnt am 01.01.2028 und endet mit Ablauf des letzten Tages des sechsten Monats. Bis zu welchem Datum (TT.MM.JJJJ) muss er vorliegen?
**Akzeptierte Antworten:** 30.06.2028; 30.6.2028; 30.06.28; 30.6.28; 30. Juni 2028; 30 Juni 2028; 30.Juni 2028
**Erklärung:** Sechs Monate ab dem 01.01.2028 enden mit Ablauf des 30.06.2028.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.1-22 · Zuordnung
**Anweisung:** Ordne den Begriff seiner Beschreibung zu.
- Kameralistik ↔ Einnahmen und Ausgaben nach dem Haushaltsplan
- Doppik ↔ Erträge und Aufwendungen mit Bilanz
- Titel ↔ Gliederungseinheit des Haushaltsplans
- Haushaltsjahr ↔ Zeitraum, auf den sich der Haushaltsplan bezieht
**Erklärung:** Die Kameralistik rechnet mit Zahlungen nach Haushaltstiteln, die Doppik wie die kaufmännische Buchführung mit Erfolgs- und Vermögensgrößen. Das Haushaltsjahr ist der Zeitraum, auf den sich der Haushaltsplan bezieht.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.1-23 · Entweder-Oder
**Frage:** Der Haushalt einer Gemeinde wird kameral geführt. Die gemeindeeigene Pflegeeinrichtung ist zugelassen und nicht befreit. Welche Buchführungsform verlangen die besonderen Regeln für Pflegeeinrichtungen nach ihrem Wortlaut von der Einrichtung?
- [x] Doppelte Buchführung nach den besonderen Regeln
- [ ] Kameralistik, weil der Haushalt ihres Trägers kameral geführt wird
**Erklärung:** Nach dem Wortlaut gelten die Pflichten unabhängig von der Rechtsform. Wie die Zahlen in den kameralen Haushalt eingehen und ob das Landesrecht etwas Besonderes regelt, ist je Land zu prüfen.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-4.1-24 · Multiple Choice
**Frage:** Ein gemeinnütziger Trägerverein vermietet eine nicht benötigte Wohnung dauerhaft an eine Privatperson. Welcher Sphäre ordnest du die Mieteinnahmen zu?
- [ ] Ideeller Bereich
- [x] Vermögensverwaltung
- [ ] Zweckbetrieb
- [ ] Steuerpflichtiger wirtschaftlicher Geschäftsbetrieb
**Erklärung:** Die Vermietung unbeweglichen Vermögens ist Vermögensverwaltung, ebenso die verzinsliche Anlage von Kapital. Sie gilt nicht als wirtschaftlicher Geschäftsbetrieb.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.1-25 · Mehrfachauswahl
**Frage:** Welche Einnahmen eines gemeinnützigen Trägervereins gehören in den ideellen Bereich?
- [x] Mitgliedsbeiträge
- [x] Spenden ohne Gegenleistung
- [ ] Einnahmen eines Herbstbasars
- [ ] Vergütungen der Pflegekassen für Pflegeleistungen
- [ ] Mieteinnahmen aus einer vermieteten Wohnung
**Erklärung:** Beiträge und Spenden ohne Gegenleistung gehören zum ideellen Bereich. Der Basar ist ein wirtschaftlicher Geschäftsbetrieb, die Pflegevergütungen stammen aus einem Zweckbetrieb, die Miete aus der Vermögensverwaltung.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-4.1-26 · Kurzantwort
**Frage:** Ein gemeinnütziger Verein erzielt aus seinen steuerpflichtigen wirtschaftlichen Geschäftsbetrieben Einnahmen einschließlich Umsatzsteuer von 38.500 € im Jahr. Die gesetzliche Besteuerungsgrenze beträgt 50.000 € im Jahr. Um wie viel Euro dürften die Einnahmen höchstens noch steigen, ohne die Grenze zu überschreiten? Antworte in Euro.
**Akzeptierte Antworten:** 11.500; 11500; 11.500 €; 11500 €; 11.500 Euro; 11500 Euro; 11.500 EUR; 11500 EUR; 11.500,00; 11500,00; 11.500,00 €; 11500,00 €; 11.500,00 Euro; 11500,00 Euro; 11.500,00 EUR; 11500,00 EUR; 11.500.00; 11500.00; 11.500.00 €; 11500.00 €; 11.500.00 Euro; 11500.00 Euro; 11.500.00 EUR; 11500.00 EUR
**Erklärung:** 50.000 € − 38.500 € = 11.500 €. Bleiben die Einnahmen darunter, sind die Besteuerungsgrundlagen von Körperschaft- und Gewerbesteuer ausgenommen.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.1-27 · Lückentext (Wortauswahl)
**Text:** Eine gemeinnützige Körperschaft muss ihre Mittel grundsätzlich ___zeitnah___ für ihre steuerbegünstigten satzungsmäßigen Zwecke verwenden.
**Zusätzliche Begriffe:** rückwirkend; unbefristet; vorsorglich
**Erklärung:** Zeitnah heißt: spätestens in den zwei auf den Zufluss folgenden Kalender- oder Wirtschaftsjahren. Rücklagen sind nur in den gesetzlichen Grenzen zulässig.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-4.1-28 · Kurzantwort
**Frage:** Einem gemeinnützigen Verein fließt am 20.09.2026 eine Spende ohne Zweckbestimmung zu. Die Mittel sind spätestens in den auf den Zufluss folgenden zwei Kalenderjahren zu verwenden (Kalenderjahr gleich Wirtschaftsjahr). Bis zum Ablauf welchen Datums (TT.MM.JJJJ) muss die Verwendung erfolgt sein?
**Akzeptierte Antworten:** 31.12.2028; 31.12.28; 31. Dezember 2028; 31 Dezember 2028; 31.Dezember 2028
**Erklärung:** Die auf den Zufluss im Jahr 2026 folgenden zwei Kalenderjahre sind 2027 und 2028. Die Frist endet mit Ablauf des 31.12.2028.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.1-29 · Multiple Choice
**Frage:** Der Vorstand eines gemeinnützigen Trägervereins will 80.000 € „für schlechte Zeiten“ zurücklegen, ohne ein konkretes Vorhaben zu planen. Was gilt?
- [ ] Das ist zulässig, wenn der Vorstand die Rücklage im Jahresbericht ausführlich begründet.
- [ ] Das ist unzulässig, weil Rücklagen nur für den Bau oder Kauf von Gebäuden erlaubt sind.
- [x] Nur bis zur Obergrenze der freien Rücklage; der Rest ist zeitnah zu verwenden.
- [ ] Das ist zulässig, wenn die Mitgliederversammlung dem Betrag zustimmt.
**Erklärung:** Ohne konkretes Vorhaben kommt nur die freie Rücklage in Betracht, deren Höchstbetrag gesetzlich begrenzt ist. Darüber hinausgehende Mittel unterliegen der zeitnahen Verwendung.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-4.1-30 · Kurzantwort
**Frage:** Ein Verein hat einen Überschuss aus der Vermögensverwaltung von 12.600 € und sonstige zeitnah zu verwendende Mittel von 195.000 €. Der Höchstbetrag der freien Rücklage beträgt ein Drittel des Überschusses plus 10 % der sonstigen Mittel. Wie hoch ist er in Euro?
**Akzeptierte Antworten:** 23.700; 23700; 23.700 €; 23700 €; 23.700 Euro; 23700 Euro; 23.700 EUR; 23700 EUR; 23.700,00; 23700,00; 23.700,00 €; 23700,00 €; 23.700,00 Euro; 23700,00 Euro; 23.700,00 EUR; 23700,00 EUR; 23.700.00; 23700.00; 23.700.00 €; 23700.00 €; 23.700.00 Euro; 23700.00 Euro; 23.700.00 EUR; 23700.00 EUR
**Erklärung:** 12.600 € ÷ 3 = 4.200 € und 195.000 € × 10 % = 19.500 €; zusammen 23.700 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.1-31 · Was passt nicht dazu
**Frage:** Welche Angabe passt nicht zur Selbstlosigkeit einer gemeinnützigen Körperschaft?
- [ ] Mittel nur für satzungsmäßige Zwecke
- [ ] Vermögensbindung bei Auflösung
- [ ] Keine unverhältnismäßig hohen Vergütungen
- [x] Gewinnausschüttung an die Gesellschafter
**Erklärung:** Gewinnanteile an Mitglieder oder Gesellschafter in dieser Eigenschaft sind ausgeschlossen. Die anderen Angaben gehören zu den Voraussetzungen der Selbstlosigkeit.
`schwierigkeit: leicht` · `bloom: analysieren`
