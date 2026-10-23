# Entwurf Fachwirt für Büro- und Projektorganisation, Vertrag, Wareneingang, Mängel und Verzug im Einkauf: Ergänzung im Thema 4.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil a des Pakets P-AX (Auftrag `docs/entwuerfe/buero-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/buero-r4-auswertung.md`, Lücke BP-13 Teil A, Abschnitt „P-AV Büro“). Einzufügen in `content/fachwirt-buero-projektorganisation/hb4/4.2-einkauf-beschaffung.md`: Abschnitt A **vor der Überschrift „### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse“** (Anker; die Theorie steht damit hinter „Vertragserfüllung kontrollieren“), B an die Karteikarten hinter K-4.2-13, C an das Quiz hinter Q-4.2-19. Bestand gezählt (Stand 23.10.2026): 13 Karteikarten (K-4.2-01 bis -13, lückenlos), 19 Quizfragen (Q-4.2-01 bis -19, lückenlos); `git log -S` auf K-4.2-14, Q-4.2-20 und F-HB4-05 ergibt im Kurs keine entfernten IDs. Die neuen IDs sind K-4.2-14 bis -23 (10 Karten) und Q-4.2-20 bis -31 (12 Quizfragen, davon 4 Kurzantworten mit Frist oder Zahl). Teil b (Rechnung, E-Rechnung, Aufbewahrung, Skonto) beginnt lückenlos bei K-4.2-24 und Q-4.2-32 und wird hinter diesem Teil in dieselbe Datei eingefügt. Die Fallaufgabe F-HB4-05 (Bestand F-HB4-01 bis -04, Teil b vergibt F-HB4-06) und zwei Fachgesprächsfragen stehen in `bp-faelle-a.md`, die Rechtsangaben in `rechtsangaben-a.md`, die Ersetzungen im Bestand in `ersetzungen-a.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand beschreibt den Beschaffungsprozess und die Kontrolle der Vertragserfüllung (Lieferfristen, Zahlungsfluss, Qualität), nennt aber nirgends, wie ein Kaufvertrag zustande kommt, was bei einer abweichenden Auftragsbestätigung oder gegensätzlichen Geschäftsbedingungen gilt, was bei Warenannahme und danach rechtlich zu tun ist und welche Rechte bestehen, wenn die Ware mangelhaft ist oder zu spät kommt (Lücke BP-13; der Beleg-Detektiv „Wareneingang“ und der Fall F-HB4-04 hatten keine Theorie). Die Ergänzung wiederholt nichts aus dem Bestand von Thema 4.2 (Bedarfsarten, Rahmenvereinbarung, ABC-Analyse, Bezugspreis, Reklamationsquote). Sie verbindet die Rechtsfolgen mit den Einkaufskennzahlen (Reklamationsquote, durchschnittliche Lieferzeit) und der Lieferantenbewertung im Bestand. Rechnung, E-Rechnung, Skonto und Aufbewahrung gehören zu Teil b und sind nicht Gegenstand; ebenso nicht der Werk- und Dienstvertrag im Kundenprojekt (Entscheidung des Auftraggebers), Verbrauchsgüterkauf und Gewährleistungsrechte gegenüber Verbrauchern, Garantien und Haftungsvereinbarungen im Einzelnen sowie die Insolvenz des Lieferunternehmens. Die Sicht ist die der Einkaufsabteilung und der Projektassistenz der Deko & Büro GmbH, nicht die der Rechtsabteilung.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch. Rechtsgrundlagen am Rohtext von gesetze-im-internet.de gelesen (BGB, HGB, GmbHG; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-a.md`); Rechtsprechung (Einbeziehung von AGB gegenüber Unternehmen, Kollision von Geschäftsbedingungen, kaufmännisches Bestätigungsschreiben) ist nicht am Urteil gelesen und im Text als „nach der Rechtsprechung“ gekennzeichnet. Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): der Basiszinssatz (kein Wert genannt), die geplante Lockerung der AGB-Kontrolle zwischen großen Unternehmen (nicht in Kraft) und mögliche europäische Regeln zum Zahlungsverzug.

---

# Thema 4.2

## A. Theorie-Ergänzung 4.2 (einfügen vor „### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse“)

### Vertragsschluss und Allgemeine Geschäftsbedingungen im Einkauf

Ein Beschaffungsvorgang mündet rechtlich meist in einen **Kaufvertrag**: Das Lieferunternehmen muss die Sache übergeben und das Eigentum verschaffen, und zwar frei von Sach- und Rechtsmängeln; die Käuferseite muss den Preis zahlen und die Sache abnehmen (Stützangabe § 433 BGB; Stand Oktober 2026, vor Verwendung prüfen). Die **Anfrage** des Einkaufs ist unverbindlich. Das **Angebot** ist ein verbindlicher Antrag auf Vertragsschluss: Das anbietende Unternehmen ist daran gebunden, es sei denn, es hat die Bindung ausgeschlossen, etwa durch „freibleibend“. Angenommen werden kann gegenüber Abwesenden nur bis zu dem Zeitpunkt, in dem die Antwort unter regelmäßigen Umständen erwartet werden darf, bei einer gesetzten Frist nur innerhalb dieser Frist (Stützangabe §§ 145 bis 148 BGB).

Die **Bestellung** ist entweder die Annahme eines verbindlichen Angebots, dann ist der Vertrag mit ihrem Zugang geschlossen, oder sie ist selbst der Antrag, den die **Auftragsbestätigung** annimmt. Eine verspätete Annahme gilt als neuer Antrag, eine Annahme mit Änderungen als Ablehnung verbunden mit einem neuen Antrag (Stützangabe § 150 BGB). Eine Auftragsbestätigung mit anderem Preis, anderer Menge oder anderem Liefertermin ist daher ein neuer Antrag, der nur gilt, wenn der Einkauf zustimmt; bloßes Schweigen genügt grundsätzlich nicht. Kommt die Bestätigung erst nach einem bereits geschlossenen Vertrag und ändert sie diesen, ist sie ein Angebot zur Änderung, das ebenfalls nur bei Zustimmung gilt. Eine Ausnahme ist das **kaufmännische Bestätigungsschreiben**: Wird nach mündlichen oder telefonischen Verhandlungen schriftlich festgehalten, was vereinbart wurde, gilt der Inhalt unter Kaufleuten nach der Rechtsprechung als vereinbart, wenn nicht unverzüglich widersprochen wird; das gilt nicht, wenn das Schreiben erheblich vom Verhandelten abweicht. Deshalb gleicht der Einkauf jede Bestätigung mit der Bestellung ab und weist Abweichungen sofort schriftlich zurück.

**Allgemeine Geschäftsbedingungen (AGB)** sind für viele Verträge vorformulierte Bedingungen, die eine Seite der anderen stellt; im Einzelnen Ausgehandeltes ist keine AGB und geht vor (Stützangabe §§ 305, 305b BGB). Die Einbeziehungsregeln für Verbraucher (ausdrücklicher Hinweis, zumutbare Kenntnisnahme) greifen im Unternehmensverkehr nicht (Stützangabe § 310 Abs. 1 BGB). Nach der Rechtsprechung werden die AGB aber nur Vertragsinhalt, wenn die andere Seite einverstanden ist; das kann auch stillschweigend geschehen, etwa bei erkennbarem Hinweis im Angebot, während Hinweise erst auf Lieferschein oder Rechnung in der Regel zu spät kommen. Inhaltlich prüft das Gesetz AGB auch zwischen Unternehmen: Klauseln, die entgegen Treu und Glauben unangemessen benachteiligen, sind unwirksam. Überraschende Klauseln werden nicht Vertragsbestandteil, und bei Unwirksamkeit einer Klausel bleibt der Vertrag in der Regel bestehen (Ausnahme: unzumutbare Härte), es gilt das Gesetz (Stützangabe §§ 305c, 306, 307 BGB). Widersprechen sich Einkaufs- und Verkaufsbedingungen, werden nach der Rechtsprechung nur die übereinstimmenden Regelungen Vertragsinhalt, an die Stelle der widersprechenden tritt das Gesetz.

*Stand Oktober 2026, vor Verwendung prüfen.* Nach dem Koalitionsvertrag ist eine Lockerung der AGB-Kontrolle zwischen großen Unternehmen geplant; ein Gesetz dazu ist nach dem Kenntnisstand von Oktober 2026 nicht in Kraft. Eine enge Ausnahme für bestimmte Finanzgeschäfte besteht bereits (Stützangabe § 310 Abs. 1a BGB); für den Einkauf gelten die dargestellten Regeln unverändert.

### Wareneingang, Untersuchungspflicht und Mängelrechte

**Wareneingangsprüfung.** Bei der Annahme gleicht der Wareneingang Lieferschein und Bestellung ab (Artikel, Menge), prüft Verpackung und äußeren Zustand und vermerkt Abweichungen und sichtbare Schäden auf dem Lieferschein oder Frachtpapier, mit Fotos. Zeigt die empfangende Seite dem Frachtführer einen äußerlich erkennbaren Schaden nicht spätestens bei der Ablieferung an, wird vermutet, dass das Gut vollständig und unbeschädigt abgeliefert wurde; bei äußerlich nicht erkennbaren Schäden gilt die Vermutung, wenn sie nicht innerhalb von sieben Tagen nach Ablieferung angezeigt werden, nach der Ablieferung in Textform (Stützangabe § 438 HGB). Das betrifft die Anzeige gegenüber dem Frachtführer, wenn ein solcher das Gut abliefert, und dessen Haftung; die Rüge gegenüber dem Lieferunternehmen ist davon getrennt. Wer das Transportrisiko trägt, regelt der Liefervertrag; ohne Vereinbarung gelten die gesetzlichen Gefahrübergangsregeln.

**Untersuchungs- und Rügepflicht.** Ist der Kauf für beide Seiten ein Handelsgeschäft, kaufen und verkaufen also Kaufleute im Betrieb ihres Handelsgewerbes (eine GmbH gilt kraft Rechtsform als Handelsgesellschaft; Stützangabe §§ 6, 343, 344 HGB, § 13 Abs. 3 GmbHG), muss die Käuferseite die Ware unverzüglich nach der Ablieferung untersuchen, soweit das nach ordnungsmäßigem Geschäftsgang tunlich ist, und einen Mangel unverzüglich anzeigen (Stützangabe § 377 Abs. 1 HGB). „Unverzüglich“ heißt ohne schuldhaftes Zögern; das Gesetz nennt keine Tage. Die Pflicht erfasst nach dem Wortlaut des Kaufrechts auch zu geringe Mengen und falsche Ware, denn die Menge gehört zur Beschaffenheit, und eine andere Sache steht dem Sachmangel gleich (Stützangabe § 434 Abs. 2, 5 BGB). Unterbleibt die Anzeige, gilt die Ware als genehmigt, und die Mängelrechte entfallen. Das gilt nicht für Mängel, die bei der Untersuchung nicht erkennbar waren; sie sind unverzüglich nach der Entdeckung anzuzeigen, sonst gilt die Ware auch insoweit als genehmigt. Zur Wahrung genügt die rechtzeitige Absendung der Anzeige (Stützangabe § 377 Abs. 2 bis 5 HGB). Nach der Rechtsprechung muss die Anzeige den Mangel konkret bezeichnen; eine Form ist nicht vorgeschrieben.

**Mängelrechte.** Ein Sachmangel liegt vor, wenn die Sache bei Gefahrübergang nicht der vereinbarten oder nicht der üblichen Beschaffenheit entspricht oder ohne das vereinbarte Zubehör und die Anleitungen übergeben wird (Stützangabe § 434 BGB). Die Rechte sind gestuft (Stützangabe § 437 BGB). Zuerst steht die **Nacherfüllung**: Nach Wahl der Käuferseite die Beseitigung des Mangels oder die Lieferung einer mangelfreien Sache, wobei das Lieferunternehmen die gewählte Art bei unverhältnismäßigen Kosten verweigern darf und dann die andere bleibt; die Kosten trägt das Lieferunternehmen, bei einer bestimmungsgemäß eingebauten Sache, deren Mangel erst danach auffiel, auch Aus- und Einbaukosten (Stützangabe § 439 Abs. 1 bis 4 BGB). Erst wenn die Käuferseite eine angemessene Frist zur Nacherfüllung gesetzt hat und sie erfolglos verstrichen ist, kann sie **zurücktreten** oder den Preis **mindern**. Die Frist ist entbehrlich, wenn das Lieferunternehmen die Nacherfüllung ernsthaft und endgültig verweigert, sie fehlgeschlagen oder unzumutbar ist; eine Nachbesserung gilt in der Regel nach dem zweiten erfolglosen Versuch als fehlgeschlagen (Stützangabe §§ 323, 440 BGB). Bei einem unerheblichen Mangel ist der Rücktritt ausgeschlossen, die Minderung bleibt möglich (Stützangabe §§ 323 Abs. 5, 441 Abs. 1 BGB). Die Minderung wird gegenüber dem Lieferunternehmen erklärt und setzt den Preis in dem Verhältnis herab, in dem der tatsächliche Wert der Sache zu ihrem Wert in mangelfreiem Zustand steht, beide zur Zeit des Vertragsschlusses: gemindert = Preis × tatsächlicher Wert ÷ Wert in mangelfreiem Zustand. **Schadensersatz** kommt hinzu, wenn das Lieferunternehmen den Mangel zu vertreten hat; Schadensersatz statt der Leistung verlangt ebenfalls eine erfolglose Frist (Stützangabe §§ 280, 281 BGB). Bis zur Nacherfüllung kann die Käuferseite die eigene Zahlung zurückhalten, soweit das nicht gegen Treu und Glauben verstößt, etwa bei Geringfügigkeit (Stützangabe § 320 BGB; Höhe im Einzelfall).

**Verjährung.** Die Ansprüche auf Nacherfüllung und Schadensersatz verjähren bei beweglichen Sachen in zwei Jahren ab Ablieferung, bei Bauwerken und bei Sachen, die ihrer üblichen Verwendungsweise entsprechend für ein Bauwerk verwendet wurden und dessen Mangel verursacht haben, in fünf Jahren, vorbehaltlich wirksamer abweichender Vereinbarungen. Bei arglistigem Verschweigen gilt die regelmäßige Frist von drei Jahren mit eigenem Fristbeginn (Stützangabe §§ 195, 199, 438 BGB). Der Tag der Ablieferung zählt bei der Fristberechnung nicht mit; eine Frist nach Jahren endet mit Ablauf des Tages, der durch seine Zahl dem Tag der Ablieferung entspricht (Stützangabe §§ 187, 188 Abs. 2 BGB).

*Stand Oktober 2026, vor Verwendung prüfen.* Die Rechtsprechung zur Untersuchungspflicht im Einzelfall (Umfang der Prüfung, Dauer) ist umfangreich und hier nicht vertieft.

### Lieferverzug und Zahlungsverzug im Einkauf

**Lieferverzug.** Das Lieferunternehmen ist im Verzug, wenn die fällige Lieferung ausbleibt, es gemahnt wurde (die Mahnung muss nach Eintritt der Fälligkeit erfolgen) oder die Mahnung entbehrlich ist, und es das Ausbleiben zu vertreten hat (Stützangabe § 286 Abs. 1, 4 BGB). Einer Mahnung bedarf es nicht bei einem nach dem Kalender bestimmten Liefertermin („bis 20. November“), wenn der Lieferung ein Ereignis vorauszugehen hat und die angemessene Zeit sich von diesem an nach dem Kalender berechnen lässt („10 Tage nach Abruf“), bei ernsthafter und endgültiger Verweigerung und bei besonderen Gründen, die den sofortigen Verzug rechtfertigen (Stützangabe § 286 Abs. 2 BGB). Bei Verzug kann die Käuferseite weiter auf Lieferung bestehen und den Verzögerungsschaden ersetzt verlangen (Stützangabe § 280 Abs. 2 BGB). Will sie sich lösen, setzt sie dem Lieferunternehmen, sobald die Lieferung fällig ist, eine **angemessene Nachfrist**; ein festes Datum ist zweckmäßig, damit das Fristende nicht streitig ist, aber nicht vorgeschrieben. Nach erfolglosem Ablauf kann sie vom Vertrag **zurücktreten**, wofür weder Verzug noch Vertretenmüssen nötig sind, und/oder bei Vertretenmüssen **Schadensersatz statt der Leistung** verlangen, etwa die Mehrkosten eines Deckungskaufs; sobald sie Schadensersatz statt der Leistung verlangt hat, ist der Anspruch auf die Lieferung ausgeschlossen (Stützangabe §§ 323, 325, 281 BGB). Ist erst ein Teil geliefert, kann sie vom ganzen Vertrag nur zurücktreten oder Schadensersatz statt der ganzen Leistung verlangen, wenn sie an der Teilleistung kein Interesse hat; sonst bezieht sich beides auf den fehlenden Teil (Stützangabe §§ 323 Abs. 5, 281 Abs. 1 BGB). Die Nachfrist ist entbehrlich bei ernsthafter und endgültiger Verweigerung; beim Rücktritt außerdem bei einem Termin, dessen Einhaltung nach Mitteilung vor Vertragsschluss oder nach den Umständen wesentlich ist, beim Schadensersatz statt der Leistung bei besonderen Umständen, die die sofortige Geltendmachung rechtfertigen (Stützangabe §§ 323 Abs. 2, 281 Abs. 2 BGB). Ist die Lieferung genau zu einer festbestimmten Zeit vereinbart (Fixgeschäft), kann die Käuferseite unter Kaufleuten ohne Nachfrist zurücktreten (Stützangabe § 376 Abs. 1 HGB); ein bloßer Liefertermin macht ein Geschäft noch nicht zum Fixgeschäft.

**Zahlungsverzug der Käuferseite.** Auch die eigene Zahlung kann verspätet sein. Ohne Zahlungsziel ist der Kaufpreis sofort fällig, mit Ziel zum vereinbarten Zeitpunkt. Auch ohne Mahnung gerät die zahlungspflichtige Seite, wenn sie kein Verbraucher ist, in Verzug, sobald sie 30 Tage nach Fälligkeit und Rechnungszugang noch nicht gezahlt hat (bei unsicherem Zugang zählt der Empfang der Gegenleistung); früher tritt er bei Kalendertermin oder Mahnung ein (Stützangabe § 286 Abs. 3 BGB). Bei Entgeltforderungen ohne Beteiligung von Verbrauchern betragen die Verzugszinsen neun Prozentpunkte über dem Basiszinssatz, hinzu kommt eine Pauschale von 40 €; weiterer Schaden bleibt ersetzbar (Stützangabe § 288 Abs. 2, 4, 5 BGB). Kein Verzug besteht, solange die Zahlung aus einem nicht zu vertretenden Umstand unterbleibt (Stützangabe § 286 Abs. 4 BGB).

*Stand Oktober 2026, vor Verwendung prüfen.* Zum Zahlungsverzug zwischen Unternehmen liegt ein europäischer Verordnungsvorschlag vor, der nach dem Kenntnisstand von Oktober 2026 nicht beschlossen ist; maßgeblich ist die geltende Fassung.

## B. Karteikarten 4.2 (anhängen)

#### K-4.2-14
**Frage:** Worin unterscheiden sich Anfrage und Angebot, und wann bindet ein Angebot?
**Antwort:** Die Anfrage holt Angebote ein und ist unverbindlich. Das Angebot ist ein verbindlicher Antrag auf Vertragsschluss; das anbietende Unternehmen ist gebunden, wenn es die Bindung nicht ausgeschlossen hat (etwa durch „freibleibend“), und die Annahme muss rechtzeitig kommen.
`tags: vertragsschluss, angebot` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-4.2-15
**Frage:** Was bewirkt eine Auftragsbestätigung, die von der Bestellung abweicht?
**Antwort:** Eine Annahme mit Änderungen gilt als Ablehnung verbunden mit einem neuen Antrag. Der Kaufvertrag kommt dann nur mit Zustimmung des Einkaufs zustande; Schweigen genügt grundsätzlich nicht. Abweichungen werden deshalb sofort schriftlich zurückgewiesen.
`tags: vertragsschluss, auftragsbestaetigung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.2-16
**Frage:** Was gilt für Allgemeine Geschäftsbedingungen im Geschäft zwischen Unternehmen?
**Antwort:** Nach der Rechtsprechung werden sie nur Vertragsinhalt, wenn die andere Seite einverstanden ist, was auch stillschweigend bei erkennbarem Hinweis im Angebot möglich ist. Die Einbeziehungsregeln für Verbraucher entfallen, unangemessen benachteiligende Klauseln sind trotzdem unwirksam.
`tags: agb, vertragsschluss` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-17
**Frage:** Was gilt, wenn sich die Einkaufsbedingungen und die Verkaufsbedingungen des Lieferunternehmens widersprechen?
**Antwort:** Nach der Rechtsprechung werden nur die übereinstimmenden Regelungen Vertragsinhalt. An die Stelle der widersprechenden Klauseln tritt das Gesetz; der Vertrag bleibt im Übrigen bestehen.
`tags: agb, kollision` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-18
**Frage:** Wie gehst du bei der Warenannahme vor, damit später Rechte nicht verloren gehen?
**Antwort:** Lieferschein mit Bestellung abgleichen (Artikel, Menge), Verpackung und äußeren Zustand prüfen und Abweichungen oder sichtbare Schäden sofort auf Lieferschein oder Frachtpapier vermerken, mit Fotos. Innere Mängel zeigen sich bei der anschließenden Untersuchung.
`tags: wareneingang, dokumentation` · `schwierigkeit: leicht` · `bloom: anwenden`

#### K-4.2-19
**Frage:** Wann gilt die Untersuchungs- und Rügepflicht, und was droht bei Verstoß?
**Antwort:** Sie gilt nur, wenn der Kauf für beide Seiten ein Handelsgeschäft ist (Kaufleute im Betrieb ihres Gewerbes). Die Ware ist unverzüglich zu untersuchen und ein Mangel unverzüglich anzuzeigen; sonst gilt sie als genehmigt, und die Mängelrechte entfallen.
`tags: ruegepflicht, wareneingang` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-20
**Frage:** Welche Rechte hat die Käuferseite bei einem Sachmangel, und in welcher Reihenfolge?
**Antwort:** Zuerst Nacherfüllung, grundsätzlich nach ihrer Wahl (Mangelbeseitigung oder Neulieferung; bei unverhältnismäßigen Kosten darf die Verkaufsseite die gewählte Art verweigern). Nach erfolglos gesetzter Frist Rücktritt oder Minderung; Schadensersatz bei Vertretenmüssen.
`tags: maengelrechte, nacherfuellung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-21
**Frage:** Wie lange verjähren Mängelansprüche beim Kauf einer beweglichen Sache zwischen Unternehmen, und wann beginnt die Frist?
**Antwort:** Zwei Jahre ab Ablieferung der Sache. Bei Bauwerken und dafür verwendeten Sachen sind es fünf Jahre; wurde der Mangel arglistig verschwiegen, gilt die regelmäßige Frist von drei Jahren mit eigenem Fristbeginn.
`tags: verjaehrung, maengelrechte` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.2-22
**Frage:** Wann gerät ein Lieferunternehmen in Verzug, und welche Rechte hat der Einkauf nach einer Nachfrist?
**Antwort:** Bei fälliger, ausbleibender Lieferung nach Mahnung (entbehrlich bei Kalendertermin) und wenn es das zu vertreten hat. Nach erfolglos gesetzter angemessener Nachfrist kann der Einkauf zurücktreten und/oder bei Vertretenmüssen Schadensersatz statt der Leistung verlangen.
`tags: lieferverzug, nachfrist` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-23
**Frage:** Welche Folgen hat es, wenn deine Firma eine Rechnung zwischen Unternehmen zu spät zahlt?
**Antwort:** Ohne Mahnung tritt Verzug ein, wenn 30 Tage nach Fälligkeit und Rechnungszugang nicht gezahlt ist. Dann laufen Verzugszinsen von neun Prozentpunkten über dem Basiszinssatz, dazu eine Pauschale von 40 €; weiterer Schaden bleibt ersetzbar.
`tags: zahlungsverzug, verzugszinsen` · `schwierigkeit: mittel` · `bloom: anwenden`

## C. Quiz 4.2 (anhängen)

#### Q-4.2-20 · Multiple Choice
**Frage:** Ein Lieferunternehmen bietet 20 Schreibtische an und bindet sich schriftlich bis Freitag. Der Einkauf bestellt am Mittwoch ohne Änderungen. Was gilt?
- [ ] Der Vertrag kommt erst mit einer Auftragsbestätigung zustande.
- [ ] Die Bestellung ist nur eine unverbindliche Anfrage.
- [x] Der Vertrag ist mit dem Zugang der Bestellung geschlossen.
- [ ] Der Vertrag entsteht erst, wenn die Ware geliefert wird.
**Erklärung:** Das Angebot ist ein verbindlicher Antrag. Die rechtzeitige Bestellung ohne Änderungen nimmt ihn an; der Vertrag ist damit geschlossen.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.2-21 · Wahr/Falsch
**Aussage:** Eine Auftragsbestätigung mit einem späteren Liefertermin als in der Bestellung ist nach einer schriftlichen Bestellung ohne vorherige mündliche Verhandlung ein neuer Antrag, der nur mit Zustimmung des Einkaufs gilt.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Eine Annahme mit Änderungen gilt als Ablehnung verbunden mit einem neuen Antrag. Schweigen ist grundsätzlich keine Zustimmung; die Ausnahme des kaufmännischen Bestätigungsschreibens betrifft nur zuvor mündlich Verhandeltes.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.2-22 · Mehrfachauswahl
**Frage:** Welche Aussagen zu Allgemeinen Geschäftsbedingungen im Geschäft zwischen Unternehmen treffen zu?
- [x] Sie werden nur Vertragsinhalt, wenn die andere Seite einverstanden ist.
- [ ] Sie werden immer Vertragsinhalt, wenn sie auf der Rechnung stehen.
- [x] Überraschende Klauseln werden nicht Vertragsbestandteil.
- [ ] Eine unangemessen benachteiligende Klausel bleibt wirksam, weil beide Seiten Unternehmen sind.
- [x] Bei einer unwirksamen Klausel bleibt der Vertrag in der Regel im Übrigen bestehen.
**Erklärung:** Einverständnis ist nötig, ein Hinweis erst auf der Rechnung kommt in der Regel zu spät. Die Inhaltskontrolle gilt auch zwischen Unternehmen; fällt eine Klausel weg, tritt das Gesetz an ihre Stelle, und der Vertrag besteht in der Regel fort.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-4.2-23 · Lückentext
**Text:** Ein erkennbarer Mangel muss dem Lieferunternehmen ___unverzüglich___ angezeigt werden, sonst gilt die Ware zwischen Kaufleuten als genehmigt.
**Erklärung:** Unverzüglich heißt ohne schuldhaftes Zögern. Eine feste Tageszahl nennt das Gesetz nicht.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-4.2-24 · Multiple Choice
**Frage:** Die Deko & Büro GmbH kauft Stühle von einem anderen Unternehmen (für beide ein Handelsgeschäft), nimmt sie an und stellt später beim Aufbau fest, dass bei mehreren die Gasdruckfeder defekt ist. Sie war bei der Wareneingangsprüfung nicht erkennbar. Wann muss die Anzeige erfolgen?
- [ ] Sofort bei der Annahme, später ist es nicht mehr möglich.
- [x] Unverzüglich nach der Entdeckung des Mangels.
- [ ] Innerhalb von zwei Jahren ab Ablieferung.
- [ ] Erst, wenn das Lieferunternehmen danach fragt.
**Erklärung:** Bei Mängeln, die bei der Untersuchung nicht erkennbar waren, läuft die Anzeigepflicht ab der Entdeckung. Wird sie versäumt, gilt die Ware auch hinsichtlich dieses Mangels als genehmigt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-25 · Zuordnung
**Anweisung:** Ordne jedes Recht bei einem Sachmangel seiner Bedeutung zu.
- Nacherfüllung ↔ Mangelbeseitigung oder Neulieferung, grundsätzlich nach Wahl der Käuferseite
- Minderung ↔ Herabsetzung des Preises, der Vertrag bleibt bestehen
- Rücktritt ↔ Rückabwicklung des Vertrags
- Schadensersatz ↔ Ausgleich von Folgen, setzt Vertretenmüssen voraus
**Erklärung:** Die Nacherfüllung steht zuerst. Rücktritt, Minderung und Schadensersatz statt der Leistung folgen nach erfolgloser Frist, der Schadensersatz zusätzlich nur bei Vertretenmüssen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.2-26 · Sortieren
**Anweisung:** Bringe die Schritte bei verspäteter Lieferung zu einem nach dem Kalender bestimmten Liefertermin (kein Fixgeschäft) in die richtige Reihenfolge.
1. Der vereinbarte Liefertermin verstreicht ohne Lieferung
2. Der Einkauf setzt eine angemessene Nachfrist
3. Die Nachfrist verstreicht erfolglos
4. Der Einkauf erklärt den Rücktritt oder verlangt Schadensersatz statt der Leistung
**Erklärung:** Die Nachfrist kann erst gesetzt werden, wenn die Lieferung fällig ist, und die Rechte entstehen erst nach ihrem erfolglosen Ablauf. Bei einem kalendermäßig bestimmten Liefertermin ist eine Mahnung zuvor nicht nötig.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-27 · Kurzantwort
**Frage:** Ein Möbelhaus liefert eine Besprechungsgarnitur am Dienstag, 16.03.2027, ab. Mängelansprüche verjähren zwei Jahre ab Ablieferung (Tag der Ablieferung zählt nicht mit). Welches ist das Datum des letzten Tages der Frist? Antworte im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 16.03.2029; 16.3.2029; 16.03.29; 16.3.29; 16. März 2029
**Erklärung:** Eine Frist nach Jahren endet mit Ablauf des Tages, der durch seine Zahl dem Tag der Ablieferung entspricht: 16.03.2029 (ein Freitag).
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-28 · Kurzantwort
**Frage:** Der Einkauf setzt einem Lieferunternehmen eine Nachfrist von sieben Tagen. Das Schreiben geht am Dienstag, 17.11.2026, zu; der Tag des Zugangs zählt nicht mit. Welches ist das Datum, mit dessen Ablauf die Frist endet? Antworte im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 24.11.2026; 24.11.26; 24.11.; 24. November 2026
**Erklärung:** Eine Frist nach Tagen endet mit Ablauf des letzten Tages: 17.11. + 7 Tage = 24.11.2026 (Dienstag).
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.2-29 · Kurzantwort
**Frage:** Eine Rechnung über 4.600,00 € (Entgeltforderung zwischen Unternehmen) wird 45 Tage zu spät bezahlt. Der Basiszinssatz beträgt im Beispiel 2,00 % (angenommen). Wie hoch sind die Verzugszinsen für 45 Zinstage bei einem Zinsjahr von 365 Tagen, auf Cent gerundet, in Euro (ohne Pauschale)?
**Akzeptierte Antworten:** 62,38; 62,38 €; 62,38 Euro; 62,38 EUR; 62,38€; 62.38; 62.38 €; 62.38 Euro; 62.38 EUR
**Erklärung:** Verzugszinssatz = 2,00 % + 9 Prozentpunkte = 11,00 %. 4.600,00 € × 11 % × 45 ÷ 365 = 62,3836 €, gerundet 62,38 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-30 · Kurzantwort
**Frage:** Ein Schrank kostet 1.250,00 €. Er hat einen Mangel; sein tatsächlicher Wert beträgt 1.050,00 €, ohne Mangel wäre er 1.250,00 € wert. Um wie viel Euro darf die Käuferseite den Preis mindern?
**Akzeptierte Antworten:** 200; 200,00; 200 €; 200,00 €; 200 Euro; 200,00 Euro; 200 EUR; 200,00 EUR; 200€; 200,00€; 200.00; 200.00 €
**Erklärung:** Geminderter Preis = 1.250,00 € × 1.050,00 € ÷ 1.250,00 € = 1.050,00 €; Minderung = 1.250,00 € − 1.050,00 € = 200,00 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-31 · Was passt nicht dazu
**Frage:** Welche Maßnahme gehört nicht zu einer rechtssicheren Warenannahme?
- [ ] Lieferschein und Bestellung vergleichen
- [x] Mit der Prüfung der Ware bis zur Zahlung der Rechnung warten
- [ ] Beschädigte Kartons vor dem Quittieren fotografieren
- [ ] Sichtbare Schäden auf dem Lieferschein vermerken
**Erklärung:** Die Ware wird unverzüglich nach der Ablieferung untersucht. Ein Abwarten bis zur Zahlung kann dazu führen, dass erkennbare Mängel nicht mehr rechtzeitig angezeigt werden.
`schwierigkeit: leicht` · `bloom: analysieren`
