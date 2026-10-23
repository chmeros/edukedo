# Entwurf Fachwirt für Büro- und Projektorganisation, Datenschutz bei Auswahl und Betrieb von Anwendungen: Ergänzung im Thema 4.3

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil i des Pakets P-AX Büro (Auftrag `docs/entwuerfe/buero-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/buero-r4-auswertung.md`, Lücke BP-16, dort „P-AZ Büro“ Teil A). Einzufügen in `content/fachwirt-buero-projektorganisation/hb4/4.3-it-anwendungen.md`: Abschnitt A **vor der Überschrift „### Anforderungen und Leistungen vergleichen“** (Anker; die Theorie steht damit hinter „Kriterien für den Einsatz von Anwendungen beachten“), B an die Karteikarten hinter K-4.3-09, C an das Quiz hinter Q-4.3-06. Bestand gezählt (Stand 23.10.2026): 9 Karteikarten (K-4.3-01 bis -09, lückenlos), 6 Quizfragen (Q-4.3-01 bis -06, lückenlos); `git log -S` auf K-4.3-10, Q-4.3-07 und F-HB4-07 ergibt im Kurs keine entfernten IDs. Die neuen IDs sind K-4.3-10 bis -19 (10 Karten) und Q-4.3-07 bis -18 (12 Quizfragen, davon 2 Kurzantworten mit Fristen). Die Fallaufgabe F-HB4-07 (Bestand F-HB4-01 bis -04; F-HB4-05 und -06 vergeben die Teile a und b) und zwei Fachgesprächsfragen stehen in `bp-faelle-i.md`, die Rechtsangaben in `rechtsangaben-i.md`, die Ersetzung im Bestand in `ersetzungen-i.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand nennt Datenschutz in 4.3 nur als Auswahlkriterium („insbesondere, wenn personenbezogene Daten verarbeitet werden“) und in 4.4 als Randbemerkung bei den Zugriffsrechten; Rechtsgrundlagen, Auftragsverarbeitung, Betroffenenrechte, Datenpanne, Datenschutzbeauftragte und Beteiligung der Arbeitnehmervertretung fehlen, obwohl die Fallaufgabe F-HB4-02 (Teilaufgaben 1 und 4) „Datenschutzaspekte“ verlangt und die Nutzwertanalyse in Thema 4.1 mit dem Kriterium „Datenschutz 25 %“ rechnet. Die Ergänzung bleibt in der Sicht einer Projektassistenz oder eines Fachwirts, der eine Kundenverwaltung auswählt und im Betrieb begleitet, nicht in der der Rechtsabteilung. Nicht Gegenstand: Impressum und Pflichtangaben auf Geschäftsbriefen (Teil j, Thema 2.5), die Einwilligung in Werbe-E-Mails und das Recht der Werbung (Teil c, Thema 2.3), die Aufbewahrungsfristen für Buchungsbelege und Handelsbriefe (Teil b, Thema 4.2), Datenschutz im Bewerbungsverfahren (Thema 3.1), die Drittlandübermittlung (nur als Hinweis), Sozial- und Gesundheitsdatenschutz sowie Videoüberwachung. Die Zugriffsrechte als Teil des Wissensmanagements bleiben in Thema 4.4.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch (auch keine Gesetzesnamen dort). Rechtsgrundlagen am Rohtext gelesen (DSGVO im Amtsblattwortlaut, BDSG und BetrVG von gesetze-im-internet.de; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-i.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Benennungsschwelle in § 38 BDSG (Aufhebung angekündigt, nicht beschlossen), die Anwendbarkeit von § 26 Abs. 1 BDSG nach EuGH und BAG, die Drittlandübermittlung (nur angedeutet). Annahmen zur Deko & Büro GmbH (Erweiterungen des Modellunternehmens: Betriebsrat vorhanden, externe Datenschutzbeauftragte benannt, Anbieter mit Sitz in der EU, Zusatzfelder vom Beratungsteam gewünscht) stehen im Fall.

---

# Thema 4.3

## A. Theorie-Ergänzung 4.3 (einfügen vor „### Anforderungen und Leistungen vergleichen“)

### Personenbezug und Rechtsgrundlagen in der Kundenverwaltung

Name, E-Mail-Adresse, Durchwahl oder Gesprächsnotiz zu einer Ansprechperson beim Firmenkunden sind **personenbezogene Daten**: Angaben über eine bestimmte oder bestimmbare natürliche Person (Stützangabe Art. 4 Nr. 1 DSGVO). Name, Rechtsform und Kontaktdaten der Gesellschaft selbst gehören nicht dazu (Stützangabe Erwägungsgrund 14 DSGVO); eine Einzelunternehmerin ist dagegen eine natürliche Person. **Verantwortlich** ist, wer über Zwecke und Mittel entscheidet (Stützangabe Art. 4 Nr. 7 DSGVO), hier die GmbH, nicht die einzelne Sachbearbeitung und nicht die Software.

Jede Verarbeitung braucht eine **Rechtsgrundlage** (Stützangabe Art. 6 Abs. 1 DSGVO). In der Kundenverwaltung kommen vor allem vier in Betracht. Die **Vertragserfüllung** trägt die Daten von Personen, die selbst Vertragspartei sind, etwa Einzelunternehmer:innen oder Privatkundschaft, und vorvertragliche Maßnahmen auf deren Anfrage. Eine **rechtliche Verpflichtung** trägt Daten, die das Gesetz vorschreibt, etwa Rechnungsdaten. Ein **berechtigtes Interesse** der GmbH trägt nach verbreiteter Auffassung etwa die Abwicklung von Aufträgen über Ansprechpersonen von Firmenkunden, die selbst nicht Vertragspartei sind, aber nur, wenn die Interessen der betroffenen Personen nicht überwiegen; aus Gründen ihrer besonderen Situation können sie widersprechen (Stützangabe Art. 6 Abs. 1 Buchst. f, Art. 21 Abs. 1 DSGVO). Die **Einwilligung** gilt, wo keine andere Grundlage trägt: Sie muss freiwillig, für den bestimmten Fall, informiert und eindeutig erteilt, nachweisbar und jederzeit widerruflich sein; hängt ein Vertrag davon ab, dass jemand in eine dafür nicht erforderliche Verarbeitung einwilligt, spricht das gegen die Freiwilligkeit (Stützangabe Art. 4 Nr. 11, Art. 7 DSGVO).

Das Gesetz stellt Anforderungen, die sich bei der Auswahl schon in der Software zeigen (Stützangabe Art. 5 Abs. 1, Art. 25 Abs. 2 DSGVO): Es werden nur Daten erhoben, die für den Zweck nötig sind (**Datenminimierung**); ein Feld etwa für den Familienstand der Ansprechperson braucht daher einen Grund. Ein Pflichtfeld erzwingt die Erhebung bei allen Personen und kann deshalb nicht auf eine freiwillige Einwilligung gestützt werden. Daten dienen nur dem festgelegten Zweck (**Zweckbindung**) und werden nur so lange gespeichert, wie dieser es erfordert (**Speicherbegrenzung**); Löschfristen müssen deshalb einstellbar sein, und **Voreinstellungen** sollen nur Erforderliches zulassen. Die GmbH informiert bei der Erhebung über Zwecke, Empfänger, Speicherdauer und Rechte (Stützangabe Art. 13 DSGVO) und muss die Einhaltung nachweisen können (**Rechenschaftspflicht**). Stand Oktober 2026, vor Verwendung prüfen.

### Anbieter auswählen: Auftragsverarbeitung, Schutzmaßnahmen und Folgenabschätzung

Betreibt ein Anbieter die Software auf seinen Servern, liegen die Kundendaten der GmbH bei ihm. Verarbeitet er sie ausschließlich im Auftrag und nach Weisung der GmbH, ist er **Auftragsverarbeiter**, und die GmbH bleibt verantwortlich (Stützangabe Art. 4 Nr. 8 DSGVO). Verfolgt er eigene Zwecke, etwa Produktentwicklung, wird er insoweit selbst Verantwortlicher; die Abgrenzung erfolgt im Einzelfall (Stützangabe Art. 28 Abs. 10 DSGVO). Die GmbH darf nur Anbieter wählen, die **hinreichende Garantien** für geeignete Schutzmaßnahmen bieten (Stützangabe Art. 28 Abs. 1 DSGVO).

Die Zusammenarbeit braucht einen schriftlich abgefassten **Vertrag zur Auftragsverarbeitung**; elektronische Form genügt. Er beschreibt, worum es geht (Gegenstand, Dauer, Zweck, Datenarten, Betroffene), und bindet den Anbieter unter anderem daran, Daten nur auf dokumentierte Weisung zu verarbeiten, befugte Personen zur Vertraulichkeit zu verpflichten, Sicherheitsmaßnahmen umzusetzen, bei Betroffenenrechten zu helfen, nach Ende der Leistung zu löschen oder zurückzugeben und Nachweise und Überprüfungen zu ermöglichen. Weitere Auftragsverarbeiter (**Unterauftragnehmer**) darf er nur einsetzen, wenn die GmbH sie vorher im Einzelfall oder allgemein schriftlich genehmigt hat; bei einer allgemeinen Genehmigung zeigt er Änderungen an, und die GmbH kann widersprechen. Den Unterauftragnehmern sind dieselben Datenschutzpflichten aufzuerlegen (Stützangabe Art. 28 Abs. 2 bis 4, 9 DSGVO). Allgemeine Nutzungsbedingungen genügen deshalb nur, wenn sie diese Inhalte enthalten; sonst wird der Vertrag ergänzt. Sitzt der Anbieter oder ein Unterauftragnehmer außerhalb der EU und des EWR, gelten zusätzliche Voraussetzungen (Stützangabe Art. 44 DSGVO); die Rechtslage ändert sich und wird mit der Datenschutzbeauftragten besprochen.

Im Auswahlvergleich zählen zudem **technische und organisatorische Maßnahmen**: Verschlüsselung, Pseudonymisierung, der Schutz von Vertraulichkeit, Integrität und Verfügbarkeit, rasche Wiederherstellung nach einem Zwischenfall und regelmäßige Überprüfung; wie weit sie gehen müssen, hängt vom Stand der Technik, den Kosten und der Höhe des Risikos für die Betroffenen ab (Stützangabe Art. 32 Abs. 1 DSGVO). Organisatorisch gehören ein Rollen- und Rechtekonzept (siehe Thema 4.4 „Im Rahmen des Wissensmanagements Erfahrungen und Informationen sichern sowie einen Austausch ermöglichen“ im selben Fachgebiet) und Schulung dazu. Die GmbH führt ein **Verzeichnis der Verarbeitungstätigkeiten**; Unternehmen mit weniger als 250 Beschäftigten sind davon nur befreit, solange ihre Verarbeitung kein Risiko für die Betroffenen birgt, nur gelegentlich erfolgt und keine besonderen Datenkategorien einschließt (Stützangabe Art. 30 Abs. 1, 5 DSGVO); bei einer laufend genutzten Kundenverwaltung greift die Befreiung deshalb in der Regel nicht. Hat eine Verarbeitung voraussichtlich ein hohes Risiko für die Betroffenen, etwa bei umfassender Bewertung persönlicher Aspekte, führt die GmbH vorab eine **Datenschutz-Folgenabschätzung** durch und holt den Rat der Datenschutzbeauftragten ein (Stützangabe Art. 35 Abs. 1 bis 3 DSGVO). Stand Oktober 2026, vor Verwendung prüfen.

### Betrieb: Betroffenenrechte und Datenpanne

Betroffene Personen können Auskunft über ihre Daten samt Kopie, Zwecken, Empfängern, geplanter Speicherdauer und Herkunft verlangen, außerdem Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch (Stützangabe Art. 15, 16, 17, 18, 21 DSGVO). Ein Anspruch auf **Löschung** besteht unter anderem, wenn die Daten nicht mehr benötigt werden, die Einwilligung zurückgenommen wurde und nichts anderes die Verarbeitung trägt, oder wenn sie von Anfang an rechtswidrig war. Er besteht nicht, soweit die Speicherung für eine rechtliche Pflicht, etwa eine Aufbewahrungspflicht, oder zur Verteidigung von Rechtsansprüchen nötig ist (Stützangabe Art. 17 Abs. 1, 3 DSGVO). Die GmbH beantwortet Anträge **unverzüglich, in jedem Fall innerhalb eines Monats** nach Eingang. Die Frist kann um **weitere zwei Monate** verlängert werden, wenn Komplexität oder Anzahl der Anträge das erfordern; dann sind innerhalb des ersten Monats die Verlängerung und ihre Gründe mitzuteilen. Wird die GmbH nicht tätig, teilt sie spätestens binnen eines Monats die Gründe mit und weist unter anderem auf die Beschwerde bei der Aufsichtsbehörde hin (Stützangabe Art. 12 Abs. 3, 4 DSGVO). Eine Form für den Antrag nennt das Gesetz nicht; alle Beschäftigten mit Kundenkontakt sollten ihn erkennen und weitergeben, und die Software sollte alle Daten einer Person auffinden, exportieren, berichtigen, sperren und löschen können (Folgerung).

Eine **Verletzung des Schutzes personenbezogener Daten** („Datenpanne“) ist jede Sicherheitsverletzung, durch die personenbezogene Daten versehentlich oder rechtswidrig zerstört, verloren, verändert oder Unbefugten offengelegt oder zugänglich gemacht werden (Stützangabe Art. 4 Nr. 12 DSGVO), etwa durch einen verlorenen Laptop oder einen Hackerangriff beim Anbieter. Die GmbH meldet sie **unverzüglich und möglichst binnen 72 Stunden**, nachdem sie ihr bekannt wurde, der Aufsichtsbehörde, außer wenn die Verletzung voraussichtlich nicht zu einem Risiko für die betroffenen Personen führt; bei späterer Meldung ist die Verzögerung zu begründen. Der Auftragsverarbeiter meldet eine Verletzung der GmbH unverzüglich, was der Vertrag absichern sollte. Jede Verletzung wird dokumentiert, auch wenn nicht gemeldet wird. Besteht voraussichtlich ein **hohes Risiko**, sind zusätzlich die Betroffenen unverzüglich zu benachrichtigen; das entfällt unter anderem, wenn die Daten durch wirksame Verschlüsselung für Unbefugte unzugänglich waren (Stützangabe Art. 33, 34 DSGVO). Wann eine Verletzung „bekannt wurde“, ist Auslegung. In der Praxis regelt ein interner Meldeweg, dass jede:r Beschäftigte einen Verdacht sofort der Geschäftsführung und der Datenschutzbeauftragten meldet (Praxis, keine gesetzliche Vorgabe).

*Rechenbeispiel* (Beispielwerte; Zählweisen sind Festlegungen): Ein Auskunftsantrag vom Dienstag, 12.01.2027, ist bei einer Monatsfrist, die ab dem Folgetag läuft und am gleichen Kalendertag des Folgemonats endet, bis Freitag, 12.02.2027, zu beantworten. Wird eine Verletzung am Freitag, 15.01.2027, 17:00 Uhr bekannt, ist die 72-Stunden-Marke bei durchlaufender Zählung Montag, 18.01.2027, 17:00 Uhr. Stand Oktober 2026, vor Verwendung prüfen.

### Datenschutzbeauftragte, Beschäftigtendaten und Betriebsrat

Wer eine **Datenschutzbeauftragte** oder einen Datenschutzbeauftragten benennen muss, regelt die DSGVO unter anderem für Verantwortliche, deren Kerntätigkeit in umfangreicher, regelmäßiger und systematischer Überwachung von Personen oder in umfangreicher Verarbeitung besonderer Datenkategorien besteht. Das deutsche Recht verlangt die Benennung außerdem, sobald in der Regel mindestens **20 Personen ständig mit der automatisierten Verarbeitung** personenbezogener Daten beschäftigt sind, und unter anderem bei einer nötigen Datenschutz-Folgenabschätzung (Stützangabe Art. 37 Abs. 1 DSGVO, § 38 Abs. 1 BDSG). Wer freiwillig benennt, darf das ebenfalls (Stützangabe Art. 37 Abs. 4 DSGVO). Die Aufgabe kann auch ein externer Dienstleister übernehmen; die Kontaktdaten werden veröffentlicht und der Aufsichtsbehörde mitgeteilt (Stützangabe Art. 37 Abs. 6, 7 DSGVO). Die angekündigte Abschaffung der 20er-Schwelle ist nicht beschlossen; der Gesetzestext enthält sie im Oktober 2026 noch. *Beispiel eines anderen Büros, nicht der Deko & Büro GmbH:* Von 63 Beschäftigten arbeiten 9 in der Verwaltung und 8 im Beratungsteam ständig am System, 40 in der Montage gar nicht, 6 nur gelegentlich. Nach verbreiteter Auffassung zählt nur, wer dauerhaft an solchen Systemen arbeitet (Auslegung): 9 + 8 = 17, also weniger als 20; die feste Schwelle löst keine Benennung aus.

Die Datenschutzbeauftragte **berät und überwacht**: Sie unterrichtet und berät Leitung und Beschäftigte, kontrolliert die Einhaltung der Datenschutzvorgaben samt Zuständigkeiten und Schulungen, unterstützt auf Anfrage bei der Folgenabschätzung und ist Ansprechpartnerin der Aufsichtsbehörde (Stützangabe Art. 39 Abs. 1 DSGVO). Sie entscheidet nicht und kann Projekte weder freigeben noch stoppen; die Entscheidung trifft die Geschäftsführung als Verantwortliche. Sie ist frühzeitig einzubinden, arbeitet weisungsfrei, berichtet unmittelbar der höchsten Managementebene und darf wegen ihrer Aufgaben nicht benachteiligt werden; weitere Aufgaben dürfen keinen Interessenkonflikt begründen (Stützangabe Art. 38 Abs. 1, 3, 6 DSGVO).

Die Kundenverwaltung verarbeitet auch Daten der **Beschäftigten**, etwa Zuständigkeiten, Zugriffsprotokolle und Antwortzeiten. Nach dem Urteil des Bundesarbeitsgerichts vom 8. Mai 2025 (8 AZR 209/21), das sich auf eine Entscheidung des Europäischen Gerichtshofs vom 30. März 2023 (C-34/21) stützt, wird die Erlaubnisnorm des Bundesdatenschutzgesetzes für Beschäftigtendaten nicht angewendet (Stützangabe § 26 Abs. 1 BDSG); die Verarbeitung misst sich dann unmittelbar an der DSGVO, also an der Erforderlichkeit für die Durchführung des Arbeitsverhältnisses oder einem berechtigten Interesse nach Abwägung. Besteht ein **Betriebsrat**, hat er mitzubestimmen bei Einführung und Anwendung technischer Einrichtungen, die dazu bestimmt sind, das Verhalten oder die Leistung der Arbeitnehmer zu überwachen, soweit keine gesetzliche oder tarifliche Regelung besteht; nach ständiger Auslegung genügt, dass die Einrichtung dazu objektiv geeignet ist. Ohne Einigung entscheidet die Einigungsstelle (Stützangabe § 87 Abs. 1 Nr. 6, Abs. 2 BetrVG). Über die Planung technischer Anlagen und von Arbeitsverfahren ist er rechtzeitig zu unterrichten und mit ihm zu beraten (Stützangabe § 90 Abs. 1, 2 BetrVG); üblich ist eine Betriebsvereinbarung zu den Auswertungen (zum Betriebsrat siehe auch Thema 3.1 „Personalplanung, -beschaffung, -betreuung und -entwicklung“ im Fachgebiet „Führen, Betreuen, Verwalten und Ausbilden im büro- und personalwirtschaftlichen Umfeld“). Mitbestimmung und Beratung durch die Datenschutzbeauftragte sind getrennte Verfahren und ersetzen einander nicht. Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 4.3 (anhängen)

#### K-4.3-10
**Frage:** Warum sind auch Ansprechpersonen bei Firmenkunden in einer Kundenverwaltung datenschutzrechtlich relevant?
**Antwort:** Name, E-Mail-Adresse oder Gesprächsnotiz einer Ansprechperson sind Angaben über eine bestimmte natürliche Person, also personenbezogene Daten. Name und Kontaktdaten der Gesellschaft selbst fallen dagegen nicht darunter.
`tags: datenschutz, personenbezug, kundenverwaltung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.3-11
**Frage:** Auf welche Rechtsgrundlagen kann die Datenverarbeitung in einer Kundenverwaltung typischerweise gestützt werden?
**Antwort:** Auf die Vertragserfüllung mit der betroffenen Person selbst, eine rechtliche Verpflichtung, ein berechtigtes Interesse nach Abwägung mit den Interessen der Betroffenen oder eine freiwillige, widerrufliche Einwilligung. Ohne Rechtsgrundlage ist die Verarbeitung verboten.
`tags: datenschutz, rechtsgrundlage` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.3-12
**Frage:** Was bedeuten Datenminimierung und Speicherbegrenzung bei der Auswahl einer Software?
**Antwort:** Die Software soll nur Daten abfragen, die für den Zweck nötig sind, und Löschfristen einstellbar machen. Daten werden nur so lange gespeichert, wie der Zweck es erfordert.
`tags: datenschutz, grundsaetze, auswahlkriterien` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.3-13
**Frage:** Wann ist ein Cloud-Anbieter Auftragsverarbeiter der Firma, und wer bleibt verantwortlich?
**Antwort:** Wenn er die Daten ausschließlich im Auftrag und nach Weisung der Firma verarbeitet. Verantwortlich bleibt die Firma. Verfolgt der Anbieter eigene Zwecke mit den Daten, ist er insoweit selbst verantwortlich.
`tags: auftragsverarbeitung, cloud, verantwortlicher` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.3-14
**Frage:** Was muss ein Vertrag zur Auftragsverarbeitung mindestens regeln?
**Antwort:** Worum es geht (Gegenstand, Dauer, Daten, Betroffene) und dass der Anbieter nur auf Weisung arbeitet, Befugte zur Vertraulichkeit verpflichtet, Schutzmaßnahmen umsetzt, bei Betroffenenrechten hilft, am Ende löscht oder zurückgibt, Kontrollen zulässt und Unterauftragnehmer nur genehmigt einsetzt.
`tags: auftragsverarbeitung, vertrag` · `schwierigkeit: schwer` · `bloom: erinnern`

#### K-4.3-15
**Frage:** Was ist beim Einsatz von Unterauftragnehmern des Anbieters zu beachten?
**Antwort:** Er darf sie nur einsetzen, wenn die Firma sie vorher im Einzelfall oder allgemein schriftlich genehmigt hat. Bei einer allgemeinen Genehmigung zeigt er Änderungen an, und die Firma kann widersprechen. Den Unterauftragnehmern gelten dieselben Datenschutzpflichten.
`tags: auftragsverarbeitung, unterauftragnehmer` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-4.3-16
**Frage:** Wie schnell muss eine Firma auf einen Auskunftsantrag reagieren, und was gilt bei Verlängerung?
**Antwort:** Unverzüglich, in jedem Fall binnen eines Monats nach Eingang. Bei Komplexität oder vielen Anträgen sind weitere zwei Monate möglich, wenn die Verlängerung samt Gründen innerhalb des ersten Monats mitgeteilt wird.
`tags: betroffenenrechte, frist, auskunft` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.3-17
**Frage:** Muss eine Firma Daten immer löschen, wenn eine Kund:in die Löschung verlangt?
**Antwort:** Nein. Die Löschung entfällt, soweit die Verarbeitung für eine rechtliche Verpflichtung wie eine Aufbewahrungspflicht oder zur Verteidigung von Rechtsansprüchen erforderlich ist. Die Firma nennt der Person die Gründe und unter anderem die Beschwerdemöglichkeit.
`tags: betroffenenrechte, loeschung` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-4.3-18
**Frage:** Wie geht eine Firma vor, wenn bei ihr oder bei ihrem Anbieter Kundendaten in falsche Hände geraten sind?
**Antwort:** Sie meldet ihn der Aufsichtsbehörde unverzüglich, möglichst binnen 72 Stunden ab Kenntnis, außer bei voraussichtlich keinem Risiko. Sie dokumentiert jeden Fall und benachrichtigt bei hohem Risiko auch die Betroffenen. Intern gilt in der Praxis: Verdacht sofort weitergeben.
`tags: datenpanne, meldepflicht` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.3-19
**Frage:** Welche Rolle hat die Datenschutzbeauftragte bei der Einführung einer neuen Software, und wer entscheidet?
**Antwort:** Sie wird früh eingebunden, berät und überwacht die Einhaltung des Datenschutzes, ohne selbst zu entscheiden. Die Entscheidung trifft die Geschäftsführung als Verantwortliche. Die Mitbestimmung des Betriebsrats ist davon getrennt.
`tags: datenschutzbeauftragte, rolle, betriebsrat` · `schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 4.3 (anhängen)

#### Q-4.3-07 · Multiple Choice
**Frage:** Eine Kundenverwaltung speichert zu jedem Firmenkunden den Firmennamen, die Rechtsform und die Zentrale-Telefonnummer sowie zu einer Ansprechperson Name und Durchwahl. Welche dieser Angaben sind personenbezogene Daten?
- [ ] Alle Angaben, weil sie im Zusammenhang mit der Kundschaft gespeichert werden.
- [ ] Keine der Angaben, solange in der Software nur Unternehmen geführt werden.
- [x] Name und Durchwahl der Ansprechperson, nicht aber Firmenname und Rechtsform.
- [ ] Nur die Telefonnummer der Zentrale, weil über sie Personen erreichbar sind.
**Erklärung:** Personenbezogen sind Angaben über bestimmte natürliche Personen. Name, Rechtsform und Kontaktdaten der Gesellschaft selbst gehören nicht dazu.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-08 · Zuordnung
**Anweisung:** Ordne jeder Verarbeitung in der Kundenverwaltung die passende Rechtsgrundlage zu.
- Ein Angebot erstellen, das ein Einzelunternehmer angefragt hat, der selbst Vertragspartner werden soll ↔ Vertragserfüllung oder vorvertragliche Maßnahme
- Rechnungsdaten für die gesetzliche Aufbewahrung speichern ↔ Rechtliche Verpflichtung
- Die Ansprechperson eines Firmenkunden wegen laufender Aufträge kontaktieren ↔ Berechtigtes Interesse nach Abwägung
- Freiwillige Zusatzangaben zu privaten Interessen speichern ↔ Einwilligung
**Erklärung:** Jede Verarbeitung braucht mindestens eine Rechtsgrundlage. Das berechtigte Interesse verlangt eine Abwägung (für Ansprechpersonen von Firmenkunden gilt es nach verbreiteter Auffassung), die Einwilligung muss freiwillig und widerruflich sein.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.3-09 · Wahr/Falsch
**Aussage:** Wer eine Cloud-Kundenverwaltung nutzt, bleibt für die Kundendaten verantwortlich, auch wenn der Anbieter sie auf seinen Servern speichert.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Der Anbieter ist Auftragsverarbeiter und arbeitet nach Weisung; die Firma entscheidet über Zwecke und Mittel und bleibt verantwortlich.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-4.3-10 · Multiple Choice
**Frage:** Der Anbieter einer Cloud-Software schickt vor Vertragsbeginn nur seine allgemeinen Nutzungsbedingungen. Sie enthalten keine Regeln zu Weisungen, Löschung und Unterauftragnehmern. Was ist richtig?
- [ ] Die Nutzungsbedingungen genügen, weil der Anbieter bekannt ist.
- [x] Die Firma schließt mit dem Anbieter einen Vertrag zur Auftragsverarbeitung ab.
- [ ] Ein Vertrag ist entbehrlich, wenn der Anbieter seinen Sitz in einem EU-Mitgliedstaat hat.
- [ ] Die Firma holt von allen Kund:innen eine Einwilligung ein und braucht dann keinen Vertrag mehr.
**Erklärung:** Eine Verarbeitung im Auftrag setzt einen schriftlichen Vertrag mit den gesetzlichen Mindestinhalten voraus. Weder der Sitz noch eine Einwilligung ersetzen ihn.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-11 · Mehrfachauswahl
**Frage:** Welche Punkte gehören zu den Mindestinhalten eines Vertrags zur Auftragsverarbeitung?
- [x] Verarbeitung nur auf dokumentierte Weisung der Firma
- [x] Löschung oder Rückgabe der Daten nach Ende der Leistung
- [ ] Freie Nutzung der Daten für eigene Produktverbesserungen des Anbieters
- [x] Unterauftragnehmer nur mit Genehmigung der Firma
- [ ] Verzicht der Firma auf Nachweise und Kontrollen
**Erklärung:** Der Vertrag bindet den Anbieter an die Weisungen, regelt Löschung oder Rückgabe und Unterauftragnehmer und sichert Nachweise und Kontrollen. Eine freie Nutzung zu eigenen Zwecken widerspräche der Rolle als Auftragsverarbeiter.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.3-12 · Wahr/Falsch
**Aussage:** Die Datenschutzbeauftragte einer Firma kann ein Softwareprojekt stoppen, wenn sie datenschutzrechtliche Bedenken hat.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Sie unterrichtet, berät und überwacht, hat aber kein Freigabe- oder Vetorecht. Die Entscheidung trifft die Geschäftsführung als Verantwortliche.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-4.3-13 · Multiple Choice
**Frage:** Ein anderes Büro hat 35 Beschäftigte, von denen 14 ständig an Systemen mit personenbezogenen Daten arbeiten; die übrigen 21 haben keinen Zugriff. Weder besteht eine Überwachung von Personen noch eine Folgenabschätzungspflicht. Muss das Büro nach der deutschen Schwelle (Stand Oktober 2026) eine Datenschutzbeauftragte benennen?
- [ ] Ja, weil die Zahl der Beschäftigten insgesamt über 20 liegt.
- [x] Nein, weil nur 14 Personen ständig mit solchen Systemen arbeiten.
- [ ] Ja, weil jedes Unternehmen mit Kundendaten eine benennen muss.
- [ ] Nein, weil die Schwelle inzwischen vom Gesetzgeber aufgehoben wurde.
**Erklärung:** Maßgeblich ist nach verbreiteter Auffassung, wie viele Personen ständig mit automatisierter Verarbeitung arbeiten; 14 liegen unter 20. Die angekündigte Aufhebung der Schwelle ist nicht beschlossen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-14 · Kurzantwort
**Frage:** Eine Kund:in verlangt per E-Mail am Freitag, 19.03.2027, Auskunft über ihre Daten. Eine nach Monaten bemessene Frist läuft bis zum Ablauf des gleichen Kalendertags im Folgemonat; der Eingangstag bleibt unberücksichtigt, Feiertagsregeln bleiben außer Betracht. Bis zu welchem Datum muss die Firma ohne Verlängerung spätestens geantwortet haben (Format TT.MM.JJJJ)?
**Akzeptierte Antworten:** 19.04.2027; 19.04.2027.; 19.4.2027; 19.4.2027.; 19. 04. 2027; 19. 4. 2027; 19. April 2027; 19 April 2027
**Erklärung:** Die Regelfrist beträgt einen Monat; sie endet nach der Zählregel am Montag, 19.04.2027. Eine Verlängerung ginge nur bei Komplexität oder Anzahl der Anträge und müsste im ersten Monat mit Gründen mitgeteilt werden.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-15 · Kurzantwort
**Frage:** Die Firma bemerkt am Mittwoch, 24.02.2027, um 08:45 Uhr, dass ein Laptop mit unverschlüsselten Kundendaten gestohlen wurde; damit gilt die Verletzung als bekannt. Es wird ohne Unterbrechung gezählt, Wochenend- und Feiertagsregeln bleiben außer Betracht. An welchem Datum (TT.MM.JJJJ) läuft die 72-Stunden-Marke für die Meldung ab?
**Akzeptierte Antworten:** 27.02.2027; 27.02.2027.; 27.2.2027; 27.2.2027.; 27. 02. 2027; 27. 2. 2027; 27. Februar 2027; 27 Februar 2027
**Erklärung:** Drei volle Tage nach Mittwoch, 24.02.2027, 08:45 Uhr ist Samstag, 27.02.2027, 08:45 Uhr. Die Meldung ist unverzüglich vorzunehmen; geht sie erst später ein, muss die Firma die Verzögerung begründen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-16 · Multiple Choice
**Frage:** Eine ehemalige Kund:in verlangt die Löschung aller Daten. Zu seinen Rechnungen läuft eine gesetzliche Aufbewahrungspflicht noch mehrere Jahre. Wie reagiert die Firma richtig?
- [ ] Sie löscht sofort alle Daten, weil ein Löschverlangen jede Aufbewahrungspflicht überstimmt.
- [x] Sie löscht Nichtbenötigtes und behält die aufbewahrungspflichtigen Daten mit Begründung.
- [ ] Sie antwortet nicht, weil während einer Aufbewahrungsfrist keine Betroffenenrechte bestehen.
- [ ] Sie gibt die Daten an ihren Anbieter weiter, damit dieser die Löschung übernimmt.
**Erklärung:** Die Löschung entfällt, soweit eine rechtliche Verpflichtung die Speicherung erfordert. Die Firma nennt die Gründe und die Möglichkeit zur Beschwerde und löscht nach Fristablauf.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-4.3-17 · Was passt nicht dazu
**Frage:** Welche Maßnahme gehört nicht zu den technischen und organisatorischen Maßnahmen, an denen sich die Auswahl einer Kundenverwaltung orientiert?
- [ ] Verschlüsselung der gespeicherten Daten
- [ ] Ein Rollen- und Rechtekonzept für den Zugriff
- [x] Verzicht auf Datensicherungen, damit weniger Kopien existieren
- [ ] Regelmäßige Überprüfung der Schutzmaßnahmen
**Erklärung:** Verlangt sind unter anderem Verschlüsselung, geregelte Zugriffe, rasche Wiederherstellung nach einem Zwischenfall und regelmäßige Überprüfung. Auf Datensicherungen zu verzichten, widerspräche der Wiederherstellbarkeit.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.3-18 · Multiple Choice
**Frage:** Die Geschäftsführung will eine Kundenverwaltung einführen, die Antwortzeiten einzelner Mitarbeitender auswertet. Es gibt einen Betriebsrat und eine Datenschutzbeauftragte. Wer muss beteiligt werden, und mit welcher Wirkung?
- [ ] Nur die Datenschutzbeauftragte; sie kann die Einführung der Software untersagen.
- [x] Die Datenschutzbeauftragte berät, der Betriebsrat bestimmt bei der Einführung mit.
- [ ] Nur der Betriebsrat; die Datenschutzbeauftragte ist daneben nicht mehr zu beteiligen.
- [ ] Keine der beiden Stellen, weil die Software ausschließlich Kundendaten betrifft.
**Erklärung:** Die Auswertung kann das Verhalten oder die Leistung der Beschäftigten überwachen, deshalb greift die Mitbestimmung des Betriebsrats. Die Datenschutzbeauftragte berät unabhängig davon; ein Verbotsrecht hat sie nicht.
`schwierigkeit: schwer` · `bloom: bewerten`
