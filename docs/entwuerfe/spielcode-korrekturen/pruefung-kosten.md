# Prüfung Q-4.2-33 bis Q-4.2-35 (Instrument „Kostenträger“, sechs Zonen)

Stand 23.10.2026. Geprüft: `content/fachwirt-gesundheit-soziales/hb4/4.2-finanzierungssysteme.md` (Q-4.2-33, -34, -35, im Vergleich zu Q-4.2-13 bis -16), Theorie `hb1/1.5-eingliederungshilfe-kinder-jugendhilfe.md` und `hb4/4.2` (Theorieteil), `rechtsangaben-av-c.md` (Zeilen 17, 19, 20, 37, 51–54, 64, 66). Gesetzestext am 23.10.2026 per curl von gesetze-im-internet.de gelesen: SGB IX §§ 91, 94, 99, 102, 113, 117, 123 und 78; SGB VIII §§ 3, 10, 27, 36, 39, 45, 78a, 78b, 78d; SGB XI § 13; zusätzlich SGB XII §§ 18, 61, 64a. Es wurde keine Datei im Repo geändert außer diesem Bericht.

## 0. Parser-Prüfung (tsx-Skript im Scratchpad, `splitBlocks` und `parseQuizBlock`)

| Aufgabe | Typ | Begriffe | Zonenschlüssel (je 2) | Schwierigkeit / Bloom |
|---|---|---|---|---|
| Q-4.2-33 | kostentraeger | 12 | gkv, pflegeversicherung, sozialhilfe, pkv, eingliederungshilfe, jugendhilfe | mittel / verstehen |
| Q-4.2-34 | kostentraeger | 12 | dieselben sechs | mittel / anwenden |
| Q-4.2-35 | kostentraeger | 12 | dieselben sechs | schwer / analysieren |

Alle drei Blöcke werden ohne Fehler geparst, 12 Begriffe, je Zone genau 2. Das Format ist in Ordnung.

## 1. Zahl der Befunde

hoch 5 (H5 an zwei Stellen), mittel 11, niedrig 7.

## 2. Befunde hoch (Zuordnung nicht eindeutig oder sachlich angreifbar)

**H1 · Q-4.2-35 · „Folgt dem Solidaritätsprinzip: Beiträge hängen vom Einkommen ab, nicht vom persönlichen Risiko → GKV“.**
Problem: Einkommensabhängige, umlagefinanzierte Solidarbeiträge gelten ebenso für die soziale Pflegeversicherung. Das sagt Q-4.2-16 in seiner eigenen Erklärung („gelten für GKV und soziale Pflegeversicherung gleichermaßen“). In Q-4.2-16 trug der Begriff noch den Anker „SGB V“; hier fehlt er. Ohne Anker passt der Begriff zu zwei Zonen.
Ersatz: „Im SGB V verankert: Beiträge hängen vom Einkommen ab, nicht vom persönlichen Krankheitsrisiko, und Versicherte erhalten die Behandlung ohne Vorleistung.“ (Alternativ ohne „Solidarität“ und mit „Krankenbehandlung und Krankengeld“ als Anker.)

**H2 · Q-4.2-35 · „Die Vergütung wird vor dem Vereinbarungszeitraum für die Zukunft vereinbart, nachträgliche Ausgleiche sind nicht zulässig → Eingliederungshilfe“.**
Problem: Die Regel gilt wörtlich in drei Systemen: SGB IX § 123 Abs. 2 (Eingliederungshilfe), SGB VIII § 78d Abs. 1 (Jugendhilfe, in der Theorie 1.5 ausdrücklich „Wie in der Eingliederungshilfe …“) und im Pflegesatzverfahren SGB XI (Theorie 4.2: „im Voraus für einen künftigen Zeitraum“, „rückwirkendes Inkrafttreten nicht zulässig“). Der Begriff passt also zu Eingliederungshilfe, Jugendhilfe und sozialer Pflegeversicherung und ist nicht lösbar. Die Theorie 1.5 benutzt ihn selbst als Gemeinsamkeit.
Ersatz (nur Eingliederungshilfe, ohne Zahl und Frist): „Gliedert ihre Leistungen in medizinische Rehabilitation, Teilhabe am Arbeitsleben, Teilhabe an Bildung und Soziale Teilhabe“ (Theorie 1.5, Absatz Leistungsgruppen; kein anderer Träger der sechs Zonen hat diese Gliederung).

**H3 · Q-4.2-35 · „Gegenüber diesem Träger ist die Eingliederungshilfe nicht nachrangig → Soziale Pflegeversicherung“.**
Problem: (a) „diesem Träger“ hat als Einzelkarte keinen Bezug; der Begriff handelt von der Eingliederungshilfe und lädt dazu ein, ihn in deren Zone zu legen. (b) „nachrangig“ ist die typische Falle: Sozialhilfe und auch Eingliederungshilfe selbst gelten als nachrangig (SGB IX § 91 Abs. 1). (c) SGB XI § 13 Abs. 3 Satz 3 sagt gleich: Auch „die Leistungen der Eingliederungshilfe nach dem Achten Buch“ sind im Verhältnis zur Pflegeversicherung nicht nachrangig; die Aussage trifft also auch die Jugendhilfe-Zone (Eingliederungshilfe nach § 35a). Der Begriff ist daher in zwei Zonen lesbar und nur über den Zonennamen „Träger“ zu lösen.
Ersatz: „Die Pflegekasse vereinbart mit dem Träger der Eingliederungshilfe, wer welche Leistung übernimmt und wie erstattet wird, wenn beide Leistungen zusammentreffen.“ (Theorie 1.5; Anker „Pflegekasse“.) Die Aussage zur Nichtnachrangigkeit gehört in die Erklärung (siehe M7), nicht in einen Zuordnungsbegriff.

**H4 · Q-4.2-35 · „Sie trägt Lebensunterhalt und Wohnkosten, wenn Menschen sie nicht selbst decken können, und ist als Existenzsicherung ausgestaltet → Sozialhilfe“.**
Problem: (a) „Lebensunterhalt“ und „Existenzsicherung“ sind die flaggestellten Fallen. Die Jugendhilfe sichert bei Hilfen außerhalb des Elternhauses ausdrücklich den notwendigen Unterhalt (SGB VIII § 39 Abs. 1; Sachaufwand, Pflege, Erziehung, laufende Leistungen, Barbetrag). (b) Die Theorie 1.5 nennt als Träger der Existenzsicherung „etwa Sozialhilfe oder Grundsicherung“, also ist „Existenzsicherung“ kein Alleinstellungsmerkmal der Sozialhilfe. (c) Wohnkosten über der Angemessenheitsgrenze trägt unter Bedingungen die Eingliederungshilfe (Theorie 1.5, § 113 Abs. 5 / § 77 SGB IX). (d) Dieselbe Karte sagt „sie“ ohne Bezug. (e) Der Begriff steht in Spannung zu dem Eingliederungshilfe-Begriff „der Lebensunterhalt läuft getrennt über die Existenzsicherung“: zwei Begriffe teilen drei Schlüsselwörter, sodass der Lernende nur durch Ausschluss und nicht durch Wissen zuordnet. Die Theorie 4.2 enthält die Aussage nicht.
Ersatz: „Fürsorgeleistung für den notwendigen Lebensunterhalt von Menschen, die ihn weder selbst noch durch vorrangige Leistungen decken können.“ (Einzige Zone, deren Kern das ist; ohne „Wohnkosten“ und ohne „Existenzsicherung“.) Der Eingliederungshilfe-Begriff „… der Lebensunterhalt läuft getrennt über die Existenzsicherung“ kann stehen bleiben, wenn H2 behoben ist; sonst ersetzen durch „Das Entgelt für die Assistenz und die Kosten für Miete und Verpflegung haben getrennte Zahlungswege“.

**H5 · Q-4.2-33 und Q-4.2-34 · „Träger sind die Kommunen bzw. überörtliche Sozialhilfeträger → Sozialhilfe“ (Q-33) und „Als Träger kommt eine Kommune bzw. ein überörtlicher Sozialhilfeträger in Betracht → Sozialhilfe“ (Q-34).**
Problem: In Q-4.2-13 stand der Begriff noch neben GKV, Pflegekasse und PKV. Mit den neuen Zonen ist er nicht mehr eindeutig: Das Jugendamt ist kommunal (Kreis oder kreisfreie Stadt, SGB VIII §§ 3, 69 laut Theorie), und die Träger der Eingliederungshilfe bestimmen die Länder (SGB IX § 94 Abs. 1); in vielen Ländern sind das dieselben Kommunen und überörtlichen Sozialhilfeträger. Die Theorie 1.5 sagt ausdrücklich, dass Landesrecht den Träger bestimmt. Außerdem ist Q-33 ohne „in der Regel“ formuliert (Q-13 hatte es). Die Aussage ist dadurch für Eingliederungshilfe und Jugendhilfe ebenso wahr.
Ersatz Q-33: „Wer Hilfe zur Pflege erhält, musste vorher Einkommen und Vermögen einsetzen und hat keinen ausreichenden Anspruch gegen die Pflegekasse.“ (Zone Sozialhilfe; § 61 SGB XII.) Ersatz Q-34: „Der Dienst rechnet für eine Klient:in mit Pflegegrad 4 die Hilfe zur Pflege direkt mit dem Sozialhilfeträger ab, nachdem Pflegekasse und eigene Mittel nicht gereicht haben.“ (Erklärung dann „nach Bewilligung“; ohne Kommune als Merkmal.) Entsprechend kann der Zusatz „Als Träger … in Betracht“ in die Erklärung wandern, mit Verweis „Landesrecht bestimmt den Träger (Stand Oktober 2026)“.

## 3. Befunde mittel

**M1 · Q-4.2-33, -34, -35 · Strukturklone und Wortlautnähe.**
- Q-33: Anweisung wortgleich zu Q-13 („Ordne die Merkmale dem passenden Kostenträger zu.“); alle 8 Begriffe der vier alten Zonen sind aus Q-13/-14/-16 übernommen, zum Teil Wort für Wort: GKV „Krankenbehandlung, Vorsorge und Krankengeld …“ (Q-16), „Sachleistung ohne Vorleistung“ (Q-13), „Pflegegeld, wenn … selbst sicherstellen“ (Q-14), „Hilfe zur Pflege, wenn Pflegeversicherung und eigene Mittel …“ (Q-14), „Träger sind … Kommunen“ (Q-13), „Versicherte reichen Rechnungen ein“ (Q-13/15), „Beitrag … individuelles Risiko“ (Q-13). Neu sind nur die vier Begriffe der neuen Zonen.
- Q-34: Anweisung fast wortgleich zu Q-15; alle 8 alten Begriffe sind Q-14/-15/-16-Klone („Krankenkasse rechnet unmittelbar ab“, „Eigenanteil über Höchstbeträge“, „Rechnung zunächst selbst zahlen und einreichen“, Wundversorgung/Medikamentengabe).
- Q-35: Anweisung wortgleich zu Q-16 („… Achte auf die Systematik hinter den Aussagen.“); GKV „Krankenbehandlung/Krankengeld“, SPV „Teilleistungsprinzip … Höchstbeträge … Eigenanteil“, Sozialhilfe „Hilfe zur Pflege …“ (wortgleich zu Q-33), PKV „Beitrag und Leistungsumfang stehen im Verhältnis von Leistung und Gegenleistung“ (wortgleich zu Q-16) und „Abrechnung … Kostenerstattungsprinzip“ (wortgleich zu Q-14).
Folgen: Die Wiedererkennung ersetzt das Verständnis; dieselbe Aussage „Hilfe zur Pflege, wenn …“ steht in Q-14, Q-33 und Q-35; „Krankengeld“ in Q-16, Q-33 und Q-35 (und fehlt in der Theorie 4.2).
Vorschlag: pro Aufgabe mindestens 4 der 8 alten Begriffe umformulieren, mit anderen Schlüsselwörtern (z. B. GKV: „Krankenhausbehandlung ohne eigene Vorauszahlung“ statt „Sachleistung ohne Vorleistung“; SPV: „Verhinderungspflege“ in Q-33, „Entlastungsbetrag“ in Q-35; PKV: „Tarifwechsel“ ist nicht in der Theorie – nicht verwenden; besser „Beitragshöhe hängt vom Eintrittsalter und vom gewählten Leistungsumfang ab“ als Q-33-Begriff, „Rechnung wird erst nach Zahlung durch die versicherte Person erstattet“ als Q-34-Begriff). Anweisung variieren (z. B. Q-33 „Ordne die Leistungs- und Verfahrensmerkmale …“, Q-35 „Ordne die Systemaussagen …“).

**M2 · Q-4.2-33 · „Die Leistung wird in der Regel als Sachleistung ohne Vorleistung der Versicherten erbracht → GKV“.**
Problem: Die Pflegesachleistung der Pflegeversicherung ist ebenfalls eine Sachleistung ohne Vorleistung (Theorie 4.2: Vergütungsanspruch des Dienstes „unmittelbar gegen die Pflegekasse“); im sozialrechtlichen Dreieck der Eingliederungs- und Jugendhilfe erfüllt der Träger den Anspruch als Sachleistung über den Leistungserbringer. Das Signalwort „Versicherte“ verhindert es nicht ganz. In Q-13 stand der Begriff neben „Pflegesachleistung“ mit Hinweis auf Behandlung.
Ersatz: „Die Krankenkasse rechnet Behandlung, Arzneimittel und Krankenhaus unmittelbar mit den Leistungserbringern ab; Versicherte müssen nicht in Vorleistung treten.“ (mit „Behandlung“ als Anker.)

**M3 · Q-4.2-33 · „Leistungen richten sich nach dem Pflegegrad → SPV“ und „Pflegegeld, wenn Angehörige die Pflege selbst sicherstellen → SPV“.**
Problem: Hilfe zur Pflege in der Sozialhilfe knüpft an Pflegegrade an (SGB XII § 61 Abs. 1 i. V. m. § 61a), und das Pflegegeld gibt es ebenfalls in der Sozialhilfe (SGB XII § 64a Abs. 1 „… in geeigneter Weise selbst sicherstellen“, in Höhe des Pflegegeldes nach § 37 SGB XI). Beide Begriffe stehen in einer Aufgabe, in der „Hilfe zur Pflege“ als Sozialhilfe-Begriff vorkommt. Vorrangig ist die SPV gemeint, aber die Zuordnung ist nicht ausschließlich.
Ersatz: „Die Pflegekasse zahlt nach dem Pflegegrad Pflegegeld, wenn Angehörige die Pflege selbst sicherstellen.“ und „Die Pflegeversicherung finanziert Leistungen nach Pflegegrad nur bis zu festen Höchstbeträgen (Teilleistungssystem).“ (der zweite Satz gehört dann nicht mehr in Q-35; siehe M1.)

**M4 · Q-4.2-33 · „Das Jugendamt ist als Träger der öffentlichen Jugendhilfe verpflichtet → Kinder- und Jugendhilfe“.**
Problem: Der Satz ist unvollständig („verpflichtet“ wozu?) und juristisch ungenau: Das Jugendamt ist die Behörde des Trägers der öffentlichen Jugendhilfe, nicht selbst „Träger“ (SGB VIII § 3 Abs. 2: Leistungsverpflichtungen „richten sich an die Träger der öffentlichen Jugendhilfe“; die Theorie 1.5 gebraucht „Jugendamt als Teil des Trägers“). Zudem kann „das Jugendamt“ in der Erklärung nicht gleichzeitig „Leistungsträger“ und „Träger“ sein.
Ersatz: „Die Leistungsverpflichtung richtet sich an die Träger der öffentlichen Jugendhilfe, das Jugendamt setzt sie um.“

**M5 · Q-4.2-34 · „Die Kundin kann den Eigenanteil nicht tragen, die Kommune prüft einen Antrag → Sozialhilfe“.**
Problem: Die Sozialhilfe (außer Grundsicherung im Alter) setzt ein, sobald dem Träger bekannt wird, dass die Voraussetzungen vorliegen (SGB XII § 18 Abs. 1); ein förmlicher Antrag ist keine Voraussetzung (Kenntnisgrundsatz). „Prüft einen Antrag“ verengt auf eine Praxis. Außerdem trägt „Kommune“ dieselbe Doppeldeutigkeit wie H5. Die Theorie 4.2 sagt nichts über den Antrag.
Ersatz: „Die Kundin kann den Eigenanteil nicht aus eigenen Mitteln tragen; geprüft wird, ob ergänzend Hilfe zur Pflege in Betracht kommt.“

**M6 · Q-4.2-34 · „Der Dienst übernimmt für einen Menschen mit Behinderung die Begleitung im Alltag und benötigt dafür eine Vereinbarung mit dem Träger am Ort → Eingliederungshilfe“.**
Problem: Drei Mehrdeutigkeitsanker in einem Satz. „Vereinbarung“ brauchen auch Pflege (Vergütungsvereinbarung, SGB XI) und Jugendhilfe (Theorie 1.5: „Für Jugendhilfeleistungen braucht er eine Vereinbarung mit dem Jugendamt“, SGB VIII §§ 77, 78b). „Träger am Ort“ passt zu Jugendamt und Sozialhilfeträger. „Begleitung im Alltag“ kann bei seelischer Behinderung eines jungen Menschen Jugendhilfe sein (SGB VIII § 35a) und bei Pflegebedürftigkeit eine pflegerische Betreuung der SPV. Gelöst wird es nur über „Menschen mit Behinderung“ plus „Träger“.
Ersatz: „Der Dienst begleitet einen erwachsenen Menschen mit Behinderung bei der Gestaltung sozialer Kontakte und der Freizeit (Assistenz) und rechnet nach der Bewilligung des Trägers ab.“ (SGB IX § 78 Abs. 1; der Anker „erwachsen“ trennt von der Jugendhilfe.)

**M7 · Q-4.2-35 Erklärung · Überschärfe und fehlende Rückausnahmen.**
(a) „finanziert aber nur die Fachleistung“ ist zu eng: Die Eingliederungshilfe umfasst bei Teilhabezweck und in den genannten Wohnräumlichkeiten auch die Pflegeleistungen (SGB IX § 103, Theorie 1.5) und unter Bedingungen höhere Wohnkosten (§ 113 Abs. 5, § 77). Besser „im Kern die Fachleistung“. (b) „Lebensunterhalt und Wohnkosten laufen über die Existenzsicherung“ braucht ein „in der Regel“ und den Hinweis auf die Wohnkostenregelung. (c) Die Aussage „Eingliederungshilfe ist gegenüber der Pflegeversicherung nicht nachrangig“ sollte ergänzt werden um: „SGB XI § 13 Abs. 3 Satz 3 nennt auch die Eingliederungshilfe nach SGB VIII“ (siehe H3), und (d) um die Einschränkung, dass Eingliederungshilfe gegenüber anderen Leistungen nachrangig bleibt (§ 91 Abs. 1). Länge: etwa 170 Wörter; auf etwa 120 kürzen (der Satz zu den drei Vereinbarungen der Jugendhilfe kann in die Erklärung zu Begriff 12, siehe M8).

**M8 · Q-4.2-35 · „Das Entgelt für eine Einrichtung wird übernommen, wenn Leistungs-, Entgelt- und Qualitätsentwicklungsvereinbarung bestehen → Kinder- und Jugendhilfe“.**
Problem: (a) Ohne das Wort „drei“ unterscheidet sich der Begriff für Lernende kaum von der Eingliederungshilfe (Leistungs- und Vergütungsvereinbarung; „Entgelt“ und „Vergütung“ sind für sie Synonyme). (b) Die Rückausnahme fehlt: Fehlt eine der drei, ist das Entgelt nur zu übernehmen, wenn dies nach der Hilfeplanung im Einzelfall geboten ist (SGB VIII § 78b Abs. 3); die Erklärung nennt sie nicht. (c) Die Aussage bleibt auch dann zonengebunden, aber das Wort „Hilfeplanung“ wäre ein besserer Anker.
Ersatz: „Für Einrichtungen werden drei Vereinbarungen geschlossen (Leistung, Entgelt, Qualitätsentwicklung); fehlt eine, wird das Entgelt nur im Einzelfall nach der Hilfeplanung übernommen.“

**M9 · Q-4.2-33 Erklärung · Verweis auf „vorangehende Aufgaben“.**
Problem: „… unterscheiden sich wie in den vorangehenden Aufgaben nach Leistungsanlass und Abrechnungsprinzip“ setzt eine feste Reihenfolge voraus (Quiz kann gemischt werden), und „Leistungsanlass und Abrechnungsprinzip“ erklärt die Nachrangigkeit der Sozialhilfe nicht. Die Erklärung sagt zu Gesamtplan (Begriff 9) und Hilfeplan nichts, obwohl genau diese Unterscheidung (Gesamtplan = Eingliederungshilfe, Hilfeplan = Jugendhilfe) die typische Verwechslung ist, die Q-34 verlangt.
Ersatz: Letzten Satz streichen und ersetzen durch: „Typische Verwechslung: Der Gesamtplan gehört zur Eingliederungshilfe, der Hilfeplan zur Jugendhilfe; die Kranken- und Pflegeversicherung leisten nach Anlass (Krankheit, Pflegebedürftigkeit), die Sozialhilfe ist nachrangig.“

**M10 · Q-4.2-34 · Szenario bricht ab.**
Problem: Die Anweisung verspricht „Situationen aus der Zusammenarbeit von Morgenlicht mit Kostenträgern“. Begriff 11 („… braucht der Träger eine Betriebserlaubnis“) und 12 („Hilfe … vom Jugendamt gesteuert“) nennen Morgenlicht oder „der Dienst“ nicht; ein ambulanter Pflegedienst betreibt keine Wohngruppe für Kinder (nur durch die Annahme in der Erklärung: „Erweiterung des Modellunternehmens“). Das ist kein Fehler im Recht, aber die Anweisung führt die Lernenden in ein Szenario, das nur zur Hälfte besteht.
Ersatz: Anweisung „Ordne die Situationen aus der Arbeit eines Pflege- und Assistenzdienstes wie ‚Morgenlicht‘ dem Kostenträger zu.“ und Begriff 11: „Der Dienst möchte eine Wohngruppe für Kinder außerhalb ihrer Familie betreiben und braucht dafür in der Regel eine Betriebserlaubnis.“ Begriff 12: „Der Dienst arbeitet bei einer Hilfe zur Erziehung nach dem Hilfeplan des Jugendamts, der regelmäßig überprüft wird.“

**M11 · Thema 4.2 insgesamt · Theoriebasis.**
Problem: Die Theorie 4.2 enthält weder Eingliederungshilfe noch Jugendhilfe noch Krankengeld; die Lernenden finden den Stoff nur in Thema 1.5 (Fachgebiet 1). Q-33 bis -35 prüfen also Stoff, den ein Lernender an dieser Stelle noch nicht gelesen haben muss.
Ersatz: Im Theorieteil 4.2 am Ende von „Sozialhilfe als nachrangiges Sicherungssystem“ einen Satz ergänzen: „Zwei weitere Leistungssysteme, die Eingliederungshilfe und die Kinder- und Jugendhilfe, sind in Thema 1.5 im Fachgebiet ‚Planen, Steuern und Organisieren betrieblicher Prozesse‘ beschrieben; die Zuordnung zu den Kostenträgern wird im Quiz dieses Themas geübt.“ Die Anweisungen von Q-33 und -35 könnten zusätzlich „(siehe auch Thema 1.5)“ enthalten.

## 4. Befunde niedrig

**N1 · Q-4.2-34 · Gendern.** „Kundin“ (viermal) und „Ein Kunde“ (einmal) wechseln; im Kurs wird sonst „Klient:innen“ mit Doppelpunkt und im Singular häufig „Klientin“ verwendet, im Singular „Kunde“ nur in einer Aufgabe. Vorschlag: durchgängig „eine Klient:in“ bzw. „die Person“ (z. B. „Eine Klient:in zahlt die Rechnung des Dienstes zunächst selbst …“).

**N2 · Q-4.2-34 · „Der Vertragstarif der Kundin bestimmt, welche Leistungen erstattet werden → PKV“.** „Vertragstarif“ kommt in der Theorie 4.2 nicht vor (sie nennt „Leistungsumfang“). Vorschlag: „Die vereinbarten Leistungen des Versicherungsvertrags bestimmen, was erstattet wird.“

**N3 · Q-4.2-34 · „… Gesamtplan, den der Träger gemeinsam mit der leistungsberechtigten Person erstellt“.** Das Gesetz sagt „Beteiligung der leistungsberechtigten Person in allen Verfahrensschritten“ (SGB IX § 117 Abs. 1 Nr. 1); erstellt wird der Gesamtplan vom Träger. Vorschlag: „… den der Träger unter Beteiligung der leistungsberechtigten Person erstellt“.

**N4 · Q-4.2-34 Begriff 11.** „braucht der Träger eine Betriebserlaubnis“ ohne „in der Regel“; die Ausnahmen (SGB VIII § 45 Abs. 1: Jugendherbergen, Schullandheime) gelten für eine Wohngruppe nicht, aber Landesrecht für familienähnliche Formen schon (Theorie). Vorschlag: „in der Regel“ ergänzen (siehe M10).

**N5 · Q-4.2-34 Begriff 12.** „gesteuert und regelmäßig überprüft“ entspricht fast dem Wortlaut der Theorie zum Gesamtplan („Steuerung und Wirkungskontrolle … regelmäßig, spätestens nach zwei Jahren, zu überprüfen“). Der Anker ist allein „Hilfeplan“. Vorschlag: „Die Hilfe wird anhand des Hilfeplans des Jugendamts regelmäßig auf Eignung und Notwendigkeit geprüft“ (SGB VIII § 36 Abs. 2).

**N6 · Q-4.2-33 Begriff 11.** „auf Antrag der Personensorgeberechtigten“: Die Theorie sagt, der Anspruch stehe den Personensorgeberechtigten zu; „auf Antrag“ steht nicht im Text von § 27. Vorschlag: „Den Anspruch auf Hilfe zur Erziehung haben die Personensorgeberechtigten.“

**N7 · Q-4.2-35 Begriff 2.** „Rechtsgrundlage der Krankenbehandlung und des Anspruchs auf Krankengeld“ ist als Zuordnungsbegriff schief (ein Gesetzbuch ist keine Zone) und kommt in der Form in Q-16 und Q-33 vor. Vorschlag: „Zahlt bei Arbeitsunfähigkeit nach Ende der Lohnfortzahlung Krankengeld (Entgeltersatz).“ Nicht in der Theorie 4.2 enthalten; entweder ergänzen oder durch „Zuständig für ärztliche Behandlung, Arzneimittel und Krankenhaus“ ersetzen.

## 5. Gleichgewicht, Gendern, Zahlen (Kriterium 4)

- Je Zone genau zwei Begriffe in allen drei Aufgaben (Parser bestätigt). In Q-35 stehen jedoch drei der vier Begriffe für Eingliederungshilfe/Jugendhilfe unter H2, H3, H4, sodass die Aufgabe nur mit viel Ausschlussdenken lösbar ist; sie gehört zu den schweren Aufgaben, sollte aber nicht auf Zufall beruhen.
- Keine Beträge, Fristen oder Paragrafen in den Aufgabentexten. „Pflegegrad 3“ (Q-34) ist eine Einordnung, kein Betrag. „SGB V“ usw. stehen nur als Zonenname.
- Gendern: außer N1 keine Auffälligkeit („Versicherte“, „Personensorgeberechtigte“, „Menschen mit Behinderungen“).
- Hinweis „keine Sozialberatung“ ist in allen drei Erklärungen vorhanden; Q-35 enthält zusätzlich den Stand-Hinweis zur Bündelung („Stand Oktober 2026“), Q-33 den Landesrechts-Hinweis. Q-34 hat keinen Landesrechts-Hinweis, siehe H5.
- Theorietreue: Die Theorie 1.5 trägt die Aussagen zu Gesamtplan, Assistenz, Betriebserlaubnis, den drei Vereinbarungen, § 10 Abs. 4 SGB VIII (Jugendamt bei seelischer, Träger der Eingliederungshilfe bei körperlicher oder geistiger Behinderung, „in der Regel“) und der Nicht-Nachrangigkeit gegenüber der Pflegeversicherung; die Aussagen entsprechen dem Gesetzestext. Hedges „in der Regel“ und „Stand Oktober 2026“ stehen bei Q-35 Begriff 11 nur in der Erklärung (dort richtig). Die Rückausnahme in § 78b Abs. 3 SGB VIII fehlt (M8), ebenso die Wohnkostenregel (M7).

## 6. Nachgeprüfte Normen

SGB IX § 91 Abs. 1–3 (Nachrang; Abs. 3 verweist auf SGB XI § 13 Abs. 3), § 123 Abs. 1, 2, 4, 5 (Vereinbarung, „nachträgliche Ausgleiche sind nicht zulässig“, Ausnahmen), § 117 Abs. 1, 3, 4 (Gesamtplan, Beteiligung, Lebensunterhalt); SGB VIII § 3 Abs. 2, § 10 Abs. 4, § 39 Abs. 1, § 45 Abs. 1–3, § 78b Abs. 1, 3, § 78d Abs. 1, 2; SGB XI § 13 Abs. 2, 3 Satz 3, 4; SGB XII § 18 Abs. 1, § 61, § 64a. Alle Aussagen der Theorie 1.5 zu diesen Normen stimmen mit dem Text überein.

## 7. Umsetzung (23.10.2026)

Datei: `content/fachwirt-gesundheit-soziales/hb4/4.2-finanzierungssysteme.md`, Q-4.2-33 bis -35 komplett neu gefasst (IDs, Überschriften, Zonenbeschriftungen, Schwierigkeit und Bloom unverändert). Parser: je Aufgabe 12 Begriffe, je Zone 2; `import-content.ts --dry-run` fehlerfrei (die Änderungen der Aufgaben erscheinen unter den geänderten Items), `db:validate-content`: 0 Verstöße. Erklärungen 70 bis 85 Wörter.

**Eingearbeitet (Ersatztext übernommen oder sinngemäß umgesetzt)**
- H1: Solidaritätsbegriff trägt jetzt den Anker „Im SGB V verankert“ und das Merkmal „nicht vom persönlichen Krankheitsrisiko“ (Q-35).
- H2: Begriff „Vergütung vorab vereinbart, keine nachträglichen Ausgleiche“ gestrichen; Eingliederungshilfe stattdessen über die vier Leistungsgruppen (Q-33), die Trennung Fachleistung / Miete und Verpflegung (Q-35), das Gesamtplanverfahren (Q-33), die Pflicht der Leistungserbringer zur Beachtung des Gesamtplans (Q-35), die ICF-orientierte Bedarfsermittlung und Assistenz (Q-34).
- H3: „Gegenüber diesem Träger nicht nachrangig“ ersetzt durch die Vereinbarung zwischen Pflegekasse und Träger der Eingliederungshilfe (Anker „Pflegekasse“); die Nichtnachrangigkeit steht nur noch in der Erklärung (Q-35).
- H4: „Lebensunterhalt/Wohnkosten/Existenzsicherung“ als Sozialhilfe-Begriff gestrichen. Sozialhilfe wird über Hilfe zur Pflege, Einsatz eigener Mittel, „Fürsorge statt Versicherung“ und „Pflegegrad allein genügt nicht“ gefasst. Der Eingliederungshilfe-Begriff folgt dem zweiten Vorschlag („Entgelt für die Assistenz und Kosten für Miete und Verpflegung haben getrennte Zahlungswege“), ohne „Existenzsicherung“.
- H5: „Träger sind Kommunen / überörtliche Sozialhilfeträger“ in Q-33 und Q-34 entfernt (Q-33: Einsatz von Einkommen und Vermögen vor Hilfe zur Pflege, beitragsunabhängiger Fürsorgeanspruch; Q-34: Eigenanteil nicht tragbar, Abrechnung der bewilligten Hilfe zur Pflege mit dem Sozialhilfeträger). Landesrecht-Hinweis bleibt in der Erklärung von Q-33.
- M1: Alle drei Anweisungen verändert; von den früheren acht Altbegriffen je Aufgabe sind alle neu formuliert und auf andere Aspekte verteilt (Verhinderungspflege/Ersatzpflege, Medizinischer Dienst und Pflegegrad, Verordnung, Direktabrechnung, Arzt- und Klinikrechnungen, Leistungsumfang des Vertrags, Abgrenzung durch Pflegekasse-Anker). Der Wortlaut von Q-13 bis -16 wird nicht mehr wörtlich übernommen. Krankengeld entfällt (nicht in der Theorie 4.2).
- M2: GKV-Sachleistung mit Anker „Behandlung, Arzneimittel, Krankenhaus“ und „Kasse“ (Q-33).
- M3: Pflegegeld mit Anker „Pflegekasse“ und „nach dem Pflegegrad“; Teilleistungsbegriff in Q-35 mit „Je Pflegegrad … Obergrenze“.
- M4: Jugendamt-Begriff umformuliert: Leistungsverpflichtung richtet sich an die Träger der öffentlichen Jugendhilfe, das Jugendamt setzt sie um (Q-33).
- M5: Antrag gestrichen; „geprüft wird, ob ergänzend Hilfe zur Pflege in Betracht kommt“ (Q-34).
- M6: Assistenz-Begriff mit „erwachsenen Menschen“, sozialen Kontakten und Freizeit, ohne „Vereinbarung/Träger am Ort“ (Q-34).
- M7: Erklärung Q-35 neu: „im Kern die Fachleistung“, „in der Regel“ bei Miete und Verpflegung, Nachrang gegenüber anderen Leistungen, nicht gegenüber der Pflegeversicherung, auf 85 Wörter gekürzt.
- M8: Drei-Vereinbarungen-Begriff mit Rückausnahme „fehlt eine, wird das Entgelt nur im Einzelfall nach der Hilfeplanung übernommen“ (Q-35).
- M9: Verweis auf „vorangehende Aufgaben“ gestrichen; die Verwechslung Gesamtplan (Eingliederungshilfe) / Hilfeplan (Jugendhilfe) steht in der Erklärung von Q-33.
- M10: Anweisung Q-34 auf „Pflege- und Assistenzdienst wie Morgenlicht“ geändert; Wohngruppe und Hilfeplan beginnen mit „Der Dienst“.
- N1 (Klient:in durchgängig), N2 („individuell vereinbarter Leistungsumfang des Versicherungsvertrags“), N4 („in der Regel“ bei der Betriebserlaubnis), N5 (Hilfeplan „regelmäßig auf Eignung und Notwendigkeit geprüft“), N6 (Anspruch der Personensorgeberechtigten ohne „auf Antrag“), N7 (Rechtsgrundlagen-Begriff durch Zuständigkeits- und Krankenbehandlungsbegriff ersetzt).

**Bewusst abweichend oder nicht umgesetzt**
- M11 (Ergänzungssatz im Theorieteil 4.2): nicht umgesetzt, weil nur die Datei der Aufgaben geändert werden sollte; bleibt offen für eine spätere Theorie-Änderung.
- N3 (Gesamtplan „unter Beteiligung“): Begriff ersetzt; die Beteiligung steht nun im Gesamtplanverfahren-Begriff von Q-33 („an dem die leistungsberechtigte Person beteiligt ist“).
- Ersatzvorschlag zu M1 „Tarifwechsel/Eintrittsalter“: nicht verwendet (nicht in der Theorie); PKV-Beitrag stattdessen über „größerer Leistungsumfang oder höheres Risiko“.
- Q-35 Begriff „Bei seelischer Behinderung junger Menschen ist in der Regel das Jugendamt zuständig“ blieb unverändert (nicht beanstandet; Zuordnung über „Jugendamt“ und „seelische Behinderung“).
- H3-Ersatz übernommen wie vorgeschlagen; der Begriff nennt „Träger der Eingliederungshilfe“, wird aber über „Pflegekasse“ als Handelnde eindeutig der Pflegeversicherung zugeordnet (Restrisiko Verwechslung bewusst als Systematikaufgabe im schweren Q-35).
- Q-35 „Fürsorge statt Versicherung … steht hinter Kranken- und Pflegeversicherung zurück“: Der Nachrang gegenüber der Pflegeversicherung gilt nach der Theorie 1.5 für die Eingliederungshilfe gerade nicht; Eindeutigkeit dadurch gegeben.
