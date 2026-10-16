# Entwurf Wirtschaftsfachwirt, Lohnsteuer, Sozialversicherungsbeiträge und elektronische Rechnung: Ergänzung im Thema 3.4

Stand 16.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil C des Auftrags P-AB (Erhebung WF-24, Auswertung `docs/entwuerfe/wirtschaftsfachwirt-r4-auswertung.md`). Einzufügen in `content/wirtschaftsfachwirt/wbq3/3.4-steuerrecht.md`: Abschnitt A am Ende von „## Theorie“ (hinter „Rechenbeispiel: Umsatzsteuer und Gewerbesteuer“, letzter Satz „… zusammen 55.860 €.“), B an die Karteikarten hinter K-3.4-23, C an das Quiz hinter Q-3.4-21. Bestand gezählt: 23 Karteikarten (K-3.4-01 bis -23, lückenlos) und 21 Quizfragen (Q-3.4-01 bis -21, lückenlos); `git log -S` findet in `content/wirtschaftsfachwirt` keine früher vergebenen und wieder entfernten IDs K-3.4-24 ff., Q-3.4-22 ff. oder F-WBQ3-06. Die neuen IDs sind K-3.4-24 bis -33 und Q-3.4-22 bis -33. Beim Einspielen setzt `einspielen-config.json` den `rechtsstand` im Frontmatter (Datei `wbq3/3.4-steuerrecht.md`). Fallaufgabe und Fachgesprächsfragen stehen in `wf-faelle-c.md` (F-WBQ3-06, Fachgespräch `### 3.4 Unternehmensrelevantes Steuerrecht`), die Zusammenstellung der Rechtsangaben zur späteren Prüfung in `rechtsangaben-c.md`, die Textersetzungen (keine nötig) in `ersetzungen-c.json`.

**Abgleich mit dem Bestand.** Der Bestand von 3.4 behandelt Steuerarten (Ertrag-, Verkehr-, Substanzsteuern), Umsatzsteuer mit Vorsteuerabzug und innergemeinschaftlicher Lieferung, Gewerbesteuer mit Messbetrag, Hebesatz und Zerlegung, Einkommen- und Körperschaftsteuer sowie laufende Erklärungs- und Meldepflichten und die Abgabenordnung. Lohnsteuer, Sozialversicherung und elektronische Rechnung kommen in `wbq3` nicht vor (per Suche in `3.4`, `fachgespraech.md`, `fallaufgaben.md` und im ganzen Kurs auf Lohnsteuer, Sozialversicherungsbeitrag, Beitragsbemessungsgrenze, Arbeitgeberanteil, E-Rechnung, XRechnung, ZUGFeRD, elektronische Rechnung geprüft: kein Treffer; „Sozialversicherung“ steht nur als Stichwort im Sozialstaatsprinzip in `wbq1/1.1`); der Bestand sagt auch nirgends „nicht behandelt“ zu diesen Themen. Es gibt deshalb **keinen widersprechenden Bestandssatz**, `ersetzungen-c.json` ist `[]`. **Neu im Kurs:** Lohnsteuer als Erhebungsform der Einkommensteuer, Abzugsverpflichtung und Haftung des Arbeitgebers, Lohnsteuerabzugsmerkmale (ELStAM) und Steuerklassen im Überblick, Lohnsteuer-Anmeldung, die fünf Zweige der Sozialversicherung, Arbeitgeber- und Arbeitnehmeranteile, Umlagen, Beitragsbemessungsgrenze, Einzugsstelle, Beitragsnachweis, Meldeverfahren, Brutto, Netto und Arbeitgeber-Gesamtkosten, E-Rechnung gegenüber sonstiger Rechnung, strukturiertes Format, Übergangsfristen. **Verweis statt Wiederholung:** Steuerarten, Einkommensteuer, Erklärungspflichten und Abgabenordnung (Abschnitte in diesem Thema), Arbeitsvertrag und Vergütung (Thema 3.2 „Arbeitsrecht Grundlagen“ im Fachgebiet Recht und Steuern), Buchführung, Belege und Aufbewahrungsfristen (Thema 2.1 „Finanzbuchhaltung und Jahresabschluss“ im Fachgebiet Rechnungswesen), Buchungssätze (Thema 2.4 „Buchungssätze und Abschlussbuchungen“ im Fachgebiet Rechnungswesen), ERP-System (Thema 1.3 „Informationstechnologie im Management“ im Fachgebiet Betriebliches Management). **Begriffsabgrenzungen:** Die **Aufbewahrungsfrist** für Buchungsbelege steht im Bestand (2.1) mit acht Jahren; die Ergänzung folgt dieser Angabe und ergänzt nur die Form (Originaldatei der E-Rechnung). Die **Steuerschuld** bei der Lohnsteuer liegt bei den Beschäftigten, nicht bei der NordWert; sie ist Abzugsverpflichtete. Die **Gesamtkosten** meinen hier die Personalkosten einer beschäftigten Person aus Sicht des Arbeitgebers und sind nicht die „Gesamtkosten“ des Gesamtkostenverfahrens (Thema 2.1) oder der Gesamtkostenvergleiche in `wbq1/1.2`; der **Personalaufwand** von rund 12 Mio. € im Jahr (Register, `wbq2/2.5`) wird nicht neu berechnet. Eine **Rechnung** im Sinne der Ergänzung ist die umsatzsteuerliche Rechnung, nicht der Beleg „Rechnung“ der Auftragsabwicklung in `wbq4/4.1`. **Eigenständigkeit:** Texte, Beispiele (Lagerkraft in Bremen, Teamleitung im Einkauf, Faltkartons-Lieferung, Rechnung nach Österreich) und Zahlen sind aus dem Großhandel der NordWert geschrieben und folgen weder dem Thema „Soziale Sicherung und Entgeltabrechnung“ der Fachinformatiker (Auszubildendensicht) noch dem Thema „Steuerrecht“ des Technischen Fachwirts (Vantera); Fachbegriffe und Gesetzesnamen stimmen überein, Beispiele, Zahlen und Aufbau nicht. **Parallelpaket:** Teil B desselben Pakets (Verzug, Mahnverfahren, Wettbewerb, Insolvenz) betrifft das Thema 3.3 im selben Fachgebiet; Zahlen und Beispiele sind getrennt gewählt (Teil B rechnet mit Forderungen und Zinsen, Teil C mit Entgelt und Beiträgen). Neue Namen: Frau Dahlke, Herr Voss; sie kommen im Bestand und in den Entwürfen nicht vor.

**Rechtsnah (R4).** Rechtsaussagen sind gewollt; Gesetze und Paragrafen stehen nur als Stützangabe (Einkommensteuergesetz, Sozialgesetzbuch IV und V, Umsatzsteuergesetz, Abgabenordnung), nie als alleiniger Prüfungsstoff. **Rechtszahlen** (Fristen in Tagen, Jahren und Bankarbeitstagen, Wertgrenzen) stehen jeweils mit dem Zusatz „Stand Oktober 2026, vor Verwendung prüfen“. **Beitragssätze, Beitragsbemessungsgrenzen, Lohnsteuerbeträge und Steuersätze werden nicht als Tatsache genannt:** Alle Sätze und Grenzen in Rechenbeispielen, Karten, Quiz und Fall sind frei gewählte, gekennzeichnete Beispielwerte (frei gewählt, gerundet und mit Abstand zu den geltenden Werten gesetzt); die Lohnsteuer wird nicht berechnet, sondern als Beispielbetrag vorgegeben. Alle Rechtsaussagen und ihre Sicherheit stehen in `rechtsangaben-c.md`; **zeitkritisch** sind die Übergangsfristen und Ausnahmen der E-Rechnungspflicht (im Text allgemein formuliert, keine Daten als Tatsache), die jährlich neu festgesetzten Beitragssätze und Beitragsbemessungsgrenzen (nur Prinzip), Einzelregelungen zur Steuerklassenwahl (nur Hinweis), die Fristen und Schwellen der Lohnsteuer-Anmeldung (Schwellen nicht genannt) und die Meldeverfahren (digital im Wandel, nur Prinzip). Karten und Quiz duzen, die Theorie spricht niemanden an. **Hinweis für das Einspielen:** `ersetzungen-c.json` ist leer; `wbq3/3.4-steuerrecht.md`, `wbq3/fallaufgaben.md` und `wbq3/fachgespraech.md` stehen schon in `einspielen-config.json` unter `rechtsstand` (Auftraggeber führt die Dateien der Teile A bis D zusammen).

---

# Thema 3.4

## A. Theorie-Ergänzung 3.4 (einfügen am Ende von „## Theorie“, hinter „Rechenbeispiel: Umsatzsteuer und Gewerbesteuer“)

### Lohnsteuer: Einbehaltung, Anmeldung und Haftung

Dieser Abschnitt ist nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen); er ergänzt die Steuerarten oben um die Pflichten, die die NordWert Handels GmbH nicht als Steuerschuldnerin, sondern als Arbeitgeberin trifft, behandelt die Sozialversicherungsbeiträge und die elektronische Rechnung und ersetzt keinen Rechtsrat. Beitragssätze und Beitragsbemessungsgrenzen ändern sich in der Regel jährlich; sie gelten hier **nicht als Tatsache**, die Rechenbeispiele verwenden frei gewählte, ausdrücklich gekennzeichnete Beispielwerte, und die Lohnsteuer wird nicht nach Tarif berechnet. Für den Arbeitsvertrag und die vereinbarte Vergütung siehe Thema 3.2 „Arbeitsrecht Grundlagen“ im Fachgebiet Recht und Steuern, für das Buchen der Lohnkosten Thema 2.4 „Buchungssätze und Abschlussbuchungen“ im Fachgebiet Rechnungswesen.

Die **Lohnsteuer** ist keine eigene Steuerart, sondern eine **Erhebungsform der Einkommensteuer**: Auf Einkünfte aus nichtselbstständiger Arbeit wird die Steuer an der Quelle erhoben, indem das Unternehmen sie vom Arbeitsentgelt einbehält und an das Finanzamt abführt. **Steuerschuldner:in** bleibt die beschäftigte Person; die NordWert ist **Abzugsverpflichtete** (Stützangabe § 38 EStG). Die einbehaltene Lohnsteuer ist deshalb kein Aufwand der NordWert, sondern ein Teil des Bruttoentgelts, den sie für die Beschäftigten an das Finanzamt weiterleitet. Zusammen mit der Lohnsteuer werden, soweit sie anfallen, der **Solidaritätszuschlag** und die **Kirchensteuer** einbehalten und abgeführt; ob und in welcher Höhe sie anfallen, hängt vom Einzelfall ab und ist hier nicht dargestellt. Die Einkommensteuererklärung der Beschäftigten (Veranlagung) ist eine eigene Pflicht der Beschäftigten; die gezahlte Lohnsteuer wird dort als Vorauszahlung angerechnet.

**Abzugsmerkmale und Steuerklassen im Überblick.** Wie viel Lohnsteuer einzubehalten ist, hängt vom Bruttoentgelt und von den **Lohnsteuerabzugsmerkmalen** ab. Die Merkmale (Steuerklasse, Kinderfreibeträge, eingetragene Freibeträge, Konfession) ruft die NordWert mit der Steuer-Identifikationsnummer und dem Geburtsdatum der Beschäftigten elektronisch bei der Finanzverwaltung ab (**ELStAM**, elektronische Lohnsteuerabzugsmerkmale). Die sechs **Lohnsteuerklassen** (I bis VI) bilden im Überblick die persönliche Lage ab: Klasse I für Ledige, II für Alleinerziehende, III bis V für Verheiratete in verschiedenen Kombinationen und VI für zweite und weitere Beschäftigungsverhältnisse. Die Klasse regelt nur, wie Freibeträge und Pauschalen im laufenden Abzug berücksichtigt werden; die endgültige Steuer wird erst in der Veranlagung festgesetzt. Einzelregeln zur Steuerklassenwahl ändern sich und sind hier nicht dargestellt (Stand Oktober 2026, vor Verwendung prüfen). Die Höhe des Abzugs ermittelt die Lohnsoftware aus der gesetzlichen Lohnsteuertabelle oder dem Programmablaufplan; die NordWert braucht dafür keine eigene Tarifformel, wohl aber **richtige und aktuelle Abzugsmerkmale** (Eintritt, Austritt, Änderungen).

**Anmeldung und Abführung.** Die NordWert meldet die einbehaltene Lohnsteuer elektronisch in einer **Lohnsteuer-Anmeldung** an und führt sie ab. Der **Anmeldungszeitraum** ist je nach Höhe der Lohnsteuer des Vorjahres der Kalendermonat, das Kalendervierteljahr oder das Kalenderjahr (Stützangabe § 41a EStG; die Schwellen sind hier nicht genannt); bei einem Unternehmen mit 280 Beschäftigten ist in der Praxis der Monat der Regelfall. Anmeldung und Zahlung sind spätestens am **10. Tag nach Ablauf des Anmeldungszeitraums** fällig (Stand Oktober 2026, vor Verwendung prüfen); fällt dieser Tag auf einen Samstag, Sonntag oder gesetzlichen Feiertag, verschiebt sich das Fristende auf den nächsten Werktag (Stützangabe § 108 AO). *Beispiel:* Die Lohnsteuer für den Dezember 2026 ist am 10. Januar 2027 fällig; weil das ein Sonntag ist, endet die Frist am Montag, dem 11. Januar 2027. Für jede beschäftigte Person führt die NordWert außerdem ein **Lohnkonto** mit Entgelt, Abzügen und Abzugsmerkmalen und übermittelt nach Jahresende die elektronische Lohnsteuerbescheinigung (Stützangaben §§ 41, 41b EStG).

**Zahlungspflicht und Haftung des Arbeitgebers.** Die angemeldete Lohnsteuer schuldet die NordWert dem Finanzamt unmittelbar; zahlt sie nicht fristgerecht, drohen Säumniszuschläge und Vollstreckung, ein Haftungsbescheid ist dafür nicht erforderlich. Hat sie Lohnsteuer dagegen nicht oder zu niedrig einbehalten oder nicht angemeldet, **haftet** sie dafür neben den Beschäftigten, und das Finanzamt kann einen **Haftungsbescheid** erlassen (Stützangabe § 42d EStG). Es überprüft die Abzugspflichten in der **Lohnsteuer-Außenprüfung** (Stützangabe § 42f EStG). Vorsätzlich oder leichtfertig falsche oder unterlassene Angaben können die Folgen aus dem Abschnitt „Steuererklärungspflichten“ oben nach sich ziehen (§§ 370, 378 AO); wird einbehaltene Lohnsteuer vorsätzlich oder leichtfertig nicht abgeführt, kommt eine Ordnungswidrigkeit in Betracht (Stützangabe § 380 AO, Gefährdung der Abzugsteuern). Hinzu kommt die Verantwortung der Geschäftsführung, die für schuldhaft nicht abgeführte Steuern persönlich haften kann (Stützangaben §§ 34, 69 AO). Praktisch gehören Einbehaltung, Anmeldung und Zahlung in eine kontrollierte Routine, in der die angemeldeten Beträge regelmäßig mit den tatsächlich überwiesenen verglichen werden.

### Sozialversicherung: Zweige, Beiträge, Bemessungsgrenzen und Meldungen

Die gesetzliche **Sozialversicherung** sichert Beschäftigte gegen Lebensrisiken ab. Sie umfasst fünf Zweige: **Krankenversicherung**, **Pflegeversicherung**, **Rentenversicherung**, **Arbeitslosenversicherung** und **Unfallversicherung**. Beschäftigte gegen Entgelt sind grundsätzlich pflichtversichert; die Beiträge richten sich nach dem Entgelt (Solidarprinzip), nicht nach dem individuellen Risiko. Die ersten vier Zweige werden im Grundsatz **paritätisch** finanziert: Arbeitgeber und Beschäftigte tragen die Beiträge je zur Hälfte. Es gibt Besonderheiten, die hier nur genannt werden: In der Pflegeversicherung tragen Kinderlose einen Zuschlag allein, und im Bundesland Sachsen, in dem der Standort Leipzig der NordWert liegt, ist die Aufteilung in der Pflegeversicherung wegen eines anderen Feiertagsrechts abweichend (Stützangaben §§ 55, 58 SGB XI; die Rechenbeispiele sehen davon ab). Die **Unfallversicherung** trägt dagegen der Arbeitgeber allein; Träger ist die **Berufsgenossenschaft** (für den Handel die Berufsgenossenschaft Handel und Warenlogistik). Ihr Beitrag richtet sich nach der Summe der Entgelte und der Gefahrklasse des Unternehmens und wird im Nachhinein auf der Grundlage eines jährlichen Lohnnachweises festgesetzt. Hinzu kommen **Umlagen**, die nur der Arbeitgeber zahlt (Ausgleich bei Mutterschaft und Insolvenzgeld, bei kleinen Betrieben auch bei Krankheit) und die mit den Beiträgen eingezogen werden. **Beitragssätze** legt der Gesetzgeber beziehungsweise die jeweilige Kasse fest; sie ändern sich und werden hier nicht als Tatsache genannt (Stand Oktober 2026, vor Verwendung prüfen).

**Beitragsbemessungsgrenze.** Beiträge werden nur bis zu einer Obergrenze des Entgelts berechnet, der **Beitragsbemessungsgrenze**. Es gibt zwei: eine für die Kranken- und Pflegeversicherung und eine höhere für die Renten- und Arbeitslosenversicherung; sie werden jährlich neu festgesetzt (Stand Oktober 2026, vor Verwendung prüfen; die Werte sind hier nicht genannt, die Beispiele rechnen mit Beispielwerten). Das **beitragspflichtige Entgelt** ist das kleinere von Bruttoentgelt und Bemessungsgrenze; Entgelt oberhalb der Grenze bleibt beitragsfrei. Nicht zu verwechseln ist die Grenze mit der **Versicherungspflichtgrenze** in der Krankenversicherung: Sie bestimmt, ab welchem Jahresentgelt Beschäftigte nicht mehr pflichtversichert sind und sich freiwillig gesetzlich oder privat versichern können, wobei der Arbeitgeber einen Zuschuss zahlt (Stützangaben §§ 6, 257 SGB V). Geringfügige Beschäftigungen (Minijobs) und der Übergangsbereich folgen eigenen Regeln und sind hier nicht behandelt.

**Beitragsschuld, Zahlung und Meldungen.** Schuldner des **Gesamtsozialversicherungsbeitrags** ist der Arbeitgeber (Stützangabe § 28e SGB IV). Er zahlt die Beiträge für Kranken-, Pflege-, Renten- und Arbeitslosenversicherung gebündelt an die **Einzugsstelle**, die Krankenkasse der jeweiligen Beschäftigten, die sie an die anderen Träger weiterleitet. Die Höhe meldet die NordWert elektronisch im **Beitragsnachweis**, der der Einzugsstelle nach der Praxis der Einzugsstellen einige Arbeitstage vor der Fälligkeit der Beiträge vorliegen muss, üblicherweise zwei (Stand Oktober 2026, vor Verwendung prüfen). Fällig sind die Beiträge spätestens am **drittletzten Bankarbeitstag des Monats**, in dem die Beschäftigung ausgeübt wurde (Stand Oktober 2026, vor Verwendung prüfen; Stützangabe § 23 SGB IV). *Beispiel:* Für den November 2026 sind die letzten Bankarbeitstage Montag, der 30. November, Freitag, der 27. November, und Donnerstag, der 26. November; fällig ist der 26. November 2026 (Bankarbeitstage vereinfacht als Montag bis Freitag ohne Feiertage gerechnet). Die Arbeitnehmeranteile darf das Unternehmen grundsätzlich nur vom laufenden Entgelt einbehalten; ein versäumter Abzug lässt sich nur bei den nächsten drei Entgeltzahlungen nachholen, danach nur noch, wenn er ohne Verschulden des Arbeitgebers unterblieben ist (Stand Oktober 2026, vor Verwendung prüfen; Stützangabe § 28g SGB IV). Für jede beschäftigte Person sind außerdem **Meldungen** abzugeben: **Anmeldung** bei Beginn, **Abmeldung** bei Ende der Beschäftigung und Meldungen bei bestimmten Änderungen, elektronisch aus dem Entgeltabrechnungsprogramm an die Einzugsstelle (Meldeverfahren); Einzelheiten und Sonderfälle wie die Sofortmeldung in bestimmten Branchen sind hier nicht dargestellt. Die Träger der Rentenversicherung prüfen die Arbeitgeber regelmäßig in einer **Betriebsprüfung**, mindestens alle vier Jahre (Stand Oktober 2026, vor Verwendung prüfen; Stützangabe § 28p SGB IV); Nachforderungen für zurückliegende Zeiträume sind möglich. Wer Arbeitnehmeranteile einbehält, aber nicht abführt, kann sich wegen Vorenthaltens und Veruntreuens von Arbeitsentgelt strafbar machen (Stützangabe § 266a StGB). Lohn- und Meldedaten sind personenbezogene Daten der Beschäftigten und nur dem nötigen Personenkreis zugänglich (Datenschutz hier nur als Hinweis).

### Von Brutto zu Netto und zu den Gesamtkosten: Rechenbeispiele

Drei Größen unterscheiden die Sicht der Beschäftigten und die des Unternehmens. Das **Bruttoentgelt** ist das vereinbarte Entgelt vor Abzügen. Das **Nettoentgelt** (Auszahlungsbetrag) ergibt sich als Bruttoentgelt abzüglich Lohnsteuer (einschließlich Solidaritätszuschlag und Kirchensteuer, soweit anfallend) und abzüglich der **Arbeitnehmeranteile** zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung. Die **Gesamtkosten** des Unternehmens für eine beschäftigte Person sind das Bruttoentgelt zuzüglich der **Arbeitgeberanteile** zu diesen vier Zweigen, des Beitrags zur Unfallversicherung und der Umlagen; die Lohnsteuer kommt nicht hinzu, weil sie schon im Bruttoentgelt steckt. Weitere Personalkosten wie Weihnachtsgeld, Urlaubsentgelt oder Fortbildung sind hier nicht einbezogen.

*Rechenbeispiel Brutto-Netto und Gesamtkosten (frei gewählte Beispielwerte, keine geltenden Sätze und Beträge):* Eine Lagerkraft am Standort Bremen erhält ein Bruttoentgelt von 2.900,00 € im Monat und liegt unter beiden Bemessungsgrenzen. Beispielsätze je Seite: Krankenversicherung 6,6 %, Pflegeversicherung 1,6 %, Rentenversicherung 8,8 %, Arbeitslosenversicherung 1,0 %, zusammen 18,0 %. Die Lohnsteuer einschließlich Zuschlägen sei als Beispielbetrag 330,00 € vorgegeben. Der Arbeitgeber trägt außerdem Beiträge zur Unfallversicherung von 1,0 % und Umlagen von 0,8 % des Bruttoentgelts (Beispielsätze).

| Position | Berechnung | Betrag |
|---|---|---|
| Bruttoentgelt | vereinbart | 2.900,00 € |
| Krankenversicherung (Arbeitnehmeranteil) | 2.900 € × 6,6 % | 191,40 € |
| Pflegeversicherung (Arbeitnehmeranteil) | 2.900 € × 1,6 % | 46,40 € |
| Rentenversicherung (Arbeitnehmeranteil) | 2.900 € × 8,8 % | 255,20 € |
| Arbeitslosenversicherung (Arbeitnehmeranteil) | 2.900 € × 1,0 % | 29,00 € |
| Arbeitnehmeranteile zusammen | 2.900 € × 18,0 % | 522,00 € |
| Lohnsteuer einschließlich Zuschlägen | Beispielbetrag | 330,00 € |
| **Nettoentgelt** | 2.900 € − 522 € − 330 € | **2.048,00 €** |
| Arbeitgeberanteile zu den vier Zweigen | wie Arbeitnehmeranteile | 522,00 € |
| Unfallversicherung | 2.900 € × 1,0 % | 29,00 € |
| Umlagen | 2.900 € × 0,8 % | 23,20 € |
| Arbeitgeber-Nebenkosten zusammen | 522 € + 29 € + 23,20 € | 574,20 € |
| **Gesamtkosten des Unternehmens** | 2.900 € + 574,20 € | **3.474,20 €** |

Die Nebenkosten betragen 574,20 € ÷ 2.900 € = 19,8 % des Bruttoentgelts. Die Gesamtkosten fließen an vier Stellen: 2.048,00 € an die Beschäftigte, 330,00 € Lohnsteuer an das Finanzamt, 522 € + 522 € + 23,20 € = 1.067,20 € an die Einzugsstelle und 29,00 € an die Berufsgenossenschaft; zusammen 3.474,20 €. (Die Unfallversicherung wird in der Praxis nicht monatlich überwiesen, sondern im Nachhinein festgesetzt; das Beispiel verteilt sie vereinfacht auf den Monat.)

*Rechenbeispiel Beitragsbemessungsgrenze (frei gewählte Beispielwerte):* Eine Teamleitung im Einkauf erhält 7.800,00 € brutto im Monat. Beispielgrenzen: Kranken- und Pflegeversicherung 4.900,00 €, Renten- und Arbeitslosenversicherung 6.300,00 €; Arbeitnehmer-Beispielsätze wie oben. Beitragspflichtig sind in der Kranken- und Pflegeversicherung nur 4.900 €, in der Renten- und Arbeitslosenversicherung nur 6.300 €. Die Arbeitnehmeranteile betragen: Krankenversicherung 4.900 € × 6,6 % = 323,40 €, Pflegeversicherung 4.900 € × 1,6 % = 78,40 €, Rentenversicherung 6.300 € × 8,8 % = 554,40 €, Arbeitslosenversicherung 6.300 € × 1,0 % = 63,00 €, zusammen 1.019,20 €. Ohne Grenzen wären es 7.800 € × 18,0 % = 1.404,00 € gewesen, also 384,80 € mehr. Die Grenze entlastet damit höhere Entgelte; deshalb steigen die Beiträge nicht im gleichen Verhältnis wie das Entgelt.

### Elektronische Rechnung im B2B

Eine **elektronische Rechnung (E-Rechnung)** im Sinne des Umsatzsteuerrechts ist eine Rechnung, die in einem **strukturierten elektronischen Format** ausgestellt, übermittelt und empfangen wird und die automatische elektronische Verarbeitung erlaubt (Stützangabe § 14 UStG; europäische Norm EN 16931). Die Rechnungsdaten stehen dabei in festen, maschinenlesbaren Feldern: Name und Anschrift, Rechnungsnummer, Positionen, Entgelt, Steuerbetrag. Beispiele sind das reine XML-Format **XRechnung** und hybride Formate wie **ZUGFeRD**, bei denen ein lesbares PDF mit einem eingebetteten XML-Datensatz verbunden ist (ab einem Profil, das die Norm erfüllt). Maßgeblich ist bei hybriden Formaten der strukturierte Datensatz, nicht das PDF-Bild. Eine **reine PDF-Datei** ist auch dann keine E-Rechnung, wenn sie per E-Mail verschickt wird: Sie lässt sich lesen, aber nicht ohne Weiteres automatisch verarbeiten, und zählt als „sonstige Rechnung“, wie ein Papierdokument. Der **Inhalt** einer Rechnung ändert sich nicht: Die Pflichtangaben (Beteiligte, Steuernummer oder Umsatzsteuer-Identifikationsnummer, Ausstellungsdatum, fortlaufende Rechnungsnummer, Menge und Art der Leistung, Zeitpunkt der Lieferung, Entgelt, Steuerbetrag oder Hinweis auf eine Befreiung) gelten für jede Form; Voraussetzung des Vorsteuerabzugs (siehe Abschnitt „Umsatzsteuer“ oben) bleibt eine ordnungsgemäße Rechnung.

**Pflichten (zeitkritisch).** Die Einführung der E-Rechnungspflicht läuft stufenweise; die folgenden Angaben sind allgemein gehalten, tragen den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“ und sind vor jeder Verwendung auf neue Verwaltungsanweisungen und Gesetzesänderungen zu prüfen. Zum **Empfang** müssen Unternehmen im Inland seit Beginn des Jahres 2025 E-Rechnungen entgegennehmen können; dafür genügt in der Regel ein E-Mail-Postfach, das strukturierte Dateien annimmt. Für die **Ausstellung** gelten Übergangsfristen, in denen noch Papierrechnungen und, mit Zustimmung des empfangenden Unternehmens, andere elektronische Formate wie PDF zulässig sind; die Fristen laufen je nach Vorjahresumsatz des ausstellenden Unternehmens bis Ende 2026 (Vorjahresumsatz über 800.000 €) beziehungsweise Ende 2027 (Vorjahresumsatz bis 800.000 €; Stand Oktober 2026, vor Verwendung prüfen). Für ein Unternehmen wie die NordWert mit einem Umsatz von rund 80 Mio. € greift die Ausstellungspflicht für Inlandsumsätze damit nach diesem Stand spätestens zu Beginn des Jahres 2027. Danach müssen Unternehmen für Umsätze an andere Unternehmen im Inland grundsätzlich E-Rechnungen ausstellen. Die Pflicht gilt für **Umsätze zwischen im Inland ansässigen Unternehmen**; sie gilt nicht für Rechnungen an Privatpersonen, nicht für Kleinbetragsrechnungen (Gesamtbetrag bis 250 € einschließlich Steuer) und Fahrausweise (Stand Oktober 2026, vor Verwendung prüfen), und sie betrifft nicht Rechnungen an Kundschaft im Ausland. Für das Exportgeschäft der NordWert in EU-Länder heißt das: Die deutsche Pflicht begründet für diese Ausgangsrechnungen kein Formatgebot; welche Anforderungen das Land des empfangenden Unternehmens stellt, ist gesondert zu prüfen und hier nicht dargestellt.

**Aufbewahrung.** Rechnungen sind Buchungsbelege und acht Jahre aufzubewahren (Stand Oktober 2026, vor Verwendung prüfen; Stützangaben § 147 AO, § 14b UStG; Beginn der Frist wie im Thema 2.1 „Finanzbuchhaltung und Jahresabschluss“ im Fachgebiet Rechnungswesen beschrieben). Für E-Rechnungen kommt hinzu: Aufzubewahren ist die **Originaldatei** im empfangenen strukturierten Format, unverändert, maschinell auswertbar und innerhalb der Frist lesbar, damit die Finanzverwaltung bei einer Prüfung auf die Daten zugreifen kann; ein Ausdruck oder eine bloße Bilddatei genügt nicht. *Beispiel:* Geht bei der NordWert eine XRechnung ein, reicht es nicht, die gelesene Ansicht auszudrucken und abzuheften; die XML-Datei bleibt im Archivsystem erhalten.

**Eingang und Ausgang im Unternehmen.** Die Eingangsrechnungen laufen über ein zentrales Postfach in die Rechnungsprüfung (Abgleich mit Bestellung und Wareneingang), werden freigegeben, gebucht und archiviert, bevor die Zahlung erfolgt; mit strukturierten Daten übernimmt das ERP-System (Thema 1.3 „Informationstechnologie im Management“ im Fachgebiet Betriebliches Management) viele Schritte automatisch. Für Ausgangsrechnungen müssen Stammdaten (Format, Zustelladresse der Kundschaft) gepflegt werden. Eine E-Rechnung, die formal nicht ordnungsgemäß ist, wird beim Lieferunternehmen beanstandet und berichtigt angefordert. Der Nutzen liegt in weniger Erfassungsfehlern, schnellerer Freigabe und einfacherer Archivierung; der Aufwand liegt in der Umstellung von Systemen, Prozessen und Stammdaten.

### Lohnbuchhaltung, Meldungen und Zahlungen im Zusammenspiel

Die Entgeltabrechnung ist ein monatlicher Ablauf, in dem mehrere Stellen zusammenwirken. (1) Die Personalabteilung pflegt die Stammdaten (Eintritt, Austritt, Entgelt, Abzugsmerkmale, Krankenkasse). (2) Die Lohnbuchhaltung erfasst die Entgeltdaten des Monats, rechnet Brutto in Netto ab und erstellt die **Entgeltabrechnung**, die die Beschäftigten in Textform erhalten (Stützangabe § 108 GewO). (3) Aus der Abrechnung entstehen die **Meldungen**: Lohnsteuer-Anmeldung, Beitragsnachweis und Meldungen zur Sozialversicherung. (4) Die Finanzbuchhaltung bucht die Aufwendungen und die entstehenden Verbindlichkeiten gegenüber Beschäftigten, Finanzamt, Einzugsstelle und Berufsgenossenschaft (Grundlagen der Buchung: Thema 2.4 „Buchungssätze und Abschlussbuchungen“ im Fachgebiet Rechnungswesen) und überweist die Beträge zu den Terminen. (5) Die Geschäftsführung trägt die Gesamtverantwortung und richtet Kontrollen ein.

| Vorgang | Frist (allgemein, Stand Oktober 2026, vor Verwendung prüfen) | Zahlung an |
|---|---|---|
| Nettoentgelt | vertraglich vereinbarter Zahlungstermin | Beschäftigte |
| Beitragsnachweis | einige Arbeitstage vor der Fälligkeit der Beiträge, üblicherweise zwei | Einzugsstelle |
| Beiträge | spätestens am drittletzten Bankarbeitstag des Monats | Einzugsstelle |
| Lohnsteuer-Anmeldung und Lohnsteuer | bis zum 10. Tag nach Ablauf des Anmeldungszeitraums | Finanzamt |
| Lohnnachweis zur Unfallversicherung | jährlich, im Folgejahr | Berufsgenossenschaft |
| Lohnsteuerbescheinigung | jährlich, nach Jahresende | Finanzverwaltung |

Aus dieser Reihenfolge ergibt sich eine praktische Konsequenz: Die Sozialversicherungsbeiträge sind schon vor dem Monatsende fällig, in dem das Entgelt gezahlt wird; die Abrechnung muss daher früh genug abgeschlossen sein. Fehler an den Schnittstellen sind typisch: ein falscher Eintrittstermin in den Stammdaten, ein veraltetes Abzugsmerkmal, eine versäumte Meldung oder eine Zahlung, die im Zahlungslauf fehlt. Die Haftung bleibt dabei beim Unternehmen, auch wenn die Abrechnung an ein externes Büro oder einen Dienstleister vergeben wird; ausgelagert werden kann die Arbeit, nicht die Verantwortung. Zu den üblichen Kontrollen zählen die Vier-Augen-Prüfung der Abrechnung, der Abgleich der Anmeldungen mit den Zahlungen und den Verbindlichkeitenkonten sowie ein Fristenkalender. Lohn- und Meldedaten sind vertraulich; bei einer Auslagerung kommen datenschutzrechtliche Pflichten hinzu (hier nur als Hinweis).

## B. Karteikarten 3.4 (anhängen)

#### K-3.4-24
**Frage:** Wer ist bei der Lohnsteuer Steuerschuldner:in, und was muss die NordWert als Arbeitgeberin tun (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Steuerschuldner:in ist die beschäftigte Person. Die NordWert ist Abzugsverpflichtete: Sie behält die Lohnsteuer vom Bruttoentgelt ein, meldet sie elektronisch in der Lohnsteuer-Anmeldung an und führt sie an das Finanzamt ab. Dafür braucht sie richtige Lohnsteuerabzugsmerkmale (ELStAM). Die angemeldete Lohnsteuer schuldet sie unmittelbar; für nicht oder zu niedrig einbehaltene oder nicht angemeldete Lohnsteuer haftet sie neben den Beschäftigten (Haftungsbescheid). Die Geschäftsführung kann persönlich haften.
`tags: lohnsteuer` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-25
**Frage:** Wann ist die Lohnsteuer-Anmeldung fällig, und wovon hängt der Anmeldungszeitraum ab (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Der Anmeldungszeitraum ist je nach Höhe der Lohnsteuer des Vorjahres Monat, Quartal oder Jahr (bei der NordWert praktisch der Monat). Anmeldung und Zahlung sind bis zum 10. Tag nach Ablauf des Zeitraums fällig; ist er kein Werktag, verschiebt sich das Fristende auf den nächsten Werktag. Für den Dezember 2026 fällt der 10. Januar 2027 auf einen Sonntag; Fristende ist deshalb Montag, der 11. Januar 2027.
`tags: lohnsteuer, fristen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-26
**Frage:** Welche fünf Zweige hat die Sozialversicherung, und wer trägt die Beiträge (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Die ersten vier tragen Arbeitgeber und Beschäftigte im Grundsatz je zur Hälfte (mit Besonderheiten, zum Beispiel Zuschlag für Kinderlose in der Pflegeversicherung und abweichende Aufteilung in Sachsen). Die Unfallversicherung (Berufsgenossenschaft) zahlt der Arbeitgeber allein, ebenso die Umlagen.
`tags: sozialversicherung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-3.4-27
**Frage:** Was ist die Beitragsbemessungsgrenze, und wie bestimmst du das beitragspflichtige Entgelt (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Die Obergrenze des Entgelts, bis zu der Beiträge berechnet werden. Es gibt eine Grenze für Kranken- und Pflegeversicherung und eine höhere für Renten- und Arbeitslosenversicherung; beide werden jährlich neu festgesetzt. Beitragspflichtiges Entgelt = das kleinere von Bruttoentgelt und Grenze. Nicht dasselbe wie die Versicherungspflichtgrenze in der Krankenversicherung, ab der Beschäftigte versicherungsfrei werden.
`tags: sozialversicherung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-28
**Frage:** Wie zahlt die NordWert die Sozialversicherungsbeiträge, und welche Fristen und Folgen gelten (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Der Arbeitgeber schuldet den Gesamtsozialversicherungsbeitrag und zahlt ihn gebündelt an die Einzugsstelle (Krankenkasse der Beschäftigten). Die Höhe meldet er im elektronischen Beitragsnachweis, der nach der Praxis der Einzugsstellen üblicherweise zwei Arbeitstage vor der Fälligkeit vorliegen muss. Fällig sind die Beiträge spätestens am drittletzten Bankarbeitstag des Monats der Beschäftigung. Hinzu kommen An- und Abmeldungen der Beschäftigten. Die Rentenversicherung prüft mindestens alle vier Jahre; werden einbehaltene Arbeitnehmeranteile nicht abgeführt, kann das strafbar sein.
`tags: sozialversicherung, fristen` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-3.4-29
**Frage:** Wie rechnest du vom Bruttoentgelt auf das Nettoentgelt?
**Antwort:** Netto = Brutto − Lohnsteuer (einschließlich Solidaritätszuschlag und Kirchensteuer, soweit anfallend) − Arbeitnehmeranteile zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung. Beispiel mit Beispielsätzen (18,0 % Arbeitnehmeranteile, Lohnsteuer als Beispielbetrag): 2.900 € − 522 € − 330 € = 2.048 €.
`tags: sozialversicherung, lohnsteuer, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-30
**Frage:** Wie rechnest du die Gesamtkosten der NordWert für eine beschäftigte Person aus, und welche Rolle spielt die Lohnsteuer dabei?
**Antwort:** Gesamtkosten = Bruttoentgelt + Arbeitgeberanteile zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung + Beitrag zur Unfallversicherung + Umlagen. Die Lohnsteuer kommt nicht hinzu, weil sie schon im Bruttoentgelt steckt. Beispiel mit Beispielsätzen: 2.900 € + 522 € + 29 € + 23,20 € = 3.474,20 €; die Nebenkosten betragen 19,8 % des Bruttoentgelts.
`tags: sozialversicherung, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-31
**Frage:** Was ist eine E-Rechnung im Umsatzsteuerrecht, und welche Formate gehören dazu?
**Antwort:** Eine Rechnung in einem strukturierten elektronischen Format, das automatisch verarbeitet werden kann (europäische Norm EN 16931). Dazu gehören das reine XML-Format XRechnung und hybride Formate wie ZUGFeRD (PDF mit eingebettetem XML-Datensatz, ab einem Profil, das die Norm erfüllt); bei hybriden Formaten ist der Datensatz maßgeblich. Eine reine PDF-Datei oder ein Papierdokument ist keine E-Rechnung, sondern eine sonstige Rechnung.
`tags: e-rechnung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-32
**Frage:** Welche Pflichten gelten für die E-Rechnung im B2B-Geschäft, und was gilt für das Exportgeschäft der NordWert (zeitkritisch, Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Empfangen können müssen Unternehmen im Inland E-Rechnungen seit Beginn des Jahres 2025. Ausstellen müssen sie sie nach gestaffelten Übergangsfristen für Umsätze an Unternehmen im Inland: bei einem Vorjahresumsatz über 800.000 € bis Ende 2026, bis zu dieser Grenze bis Ende 2027. Ausgenommen sind unter anderem Rechnungen an Privatpersonen, Kleinbetragsrechnungen und Rechnungen an Kundschaft im Ausland; deren Anforderungen richten sich nach dem Recht des anderen Staates. Fristen und Ausnahmen vor Verwendung prüfen.
`tags: e-rechnung, fristen` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-3.4-33
**Frage:** Wie bewahrt die NordWert eine empfangene E-Rechnung auf (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Acht Jahre als Buchungsbeleg, und zwar als Originaldatei im strukturierten Format: unverändert, maschinell auswertbar und während der Frist lesbar, damit die Finanzverwaltung bei einer Prüfung auf die Daten zugreifen kann. Ein Ausdruck oder eine bloße Bilddatei genügt nicht. Die Fristen für andere Unterlagen stehen im Thema 2.1 „Finanzbuchhaltung und Jahresabschluss“ im Fachgebiet Rechnungswesen.
`tags: e-rechnung, aufbewahrung` · `schwierigkeit: mittel` · `bloom: anwenden`

## C. Quiz 3.4 (anhängen)

#### Q-3.4-22 · Multiple Choice
**Frage:** In der Lohnbuchhaltung der NordWert wurde im September die einbehaltene Lohnsteuer rechtzeitig angemeldet, aber wegen eines Fehlers im Zahlungslauf nicht an das Finanzamt überwiesen. Was trifft zu (Stand Oktober 2026, vor Verwendung prüfen)?
- [ ] Nur die einzelnen Beschäftigten müssen zahlen, weil allein sie als Steuerschuldner:innen gegenüber dem Finanzamt verantwortlich sind
- [ ] Niemand muss etwas tun, weil die rechtzeitige Anmeldung die Pflicht des Unternehmens bereits vollständig erfüllt hat
- [x] Die NordWert muss die angemeldete Lohnsteuer zahlen; sonst drohen Säumniszuschläge
- [ ] Die Krankenkasse der Beschäftigten zieht den Betrag als Einzugsstelle ein, weil sie die Beiträge einzieht
**Erklärung:** Mit der Anmeldung schuldet die NordWert die Lohnsteuer dem Finanzamt unmittelbar; zahlt sie nicht, drohen Säumniszuschläge und Vollstreckung. Ein Haftungsbescheid kommt dagegen bei nicht oder zu niedrig einbehaltener oder nicht angemeldeter Lohnsteuer in Betracht. Die Anmeldung ersetzt die Zahlung nicht; die Krankenkasse ist für Sozialversicherungsbeiträge zuständig, nicht für die Lohnsteuer.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-23 · Kurzantwort
**Frage:** Eine Lagerkraft der NordWert erhält 3.400 € brutto im Monat. Annahmen (Beispielwerte, keine geltenden Sätze): Die Arbeitnehmeranteile zur Sozialversicherung betragen zusammen 18 % des Bruttoentgelts, die einbehaltene Lohnsteuer einschließlich Zuschlägen 410 €. Wie hoch ist das Nettoentgelt in Euro?
**Akzeptierte Antworten:** 2378; 2378 €; 2378 Euro; 2378 EUR; 2378,00; 2378,00 €; 2378,00 Euro; 2378,00 EUR; 2378,0; 2378,0 €; 2378,0 Euro; 2378,0 EUR; 2.378; 2.378 €; 2.378 Euro; 2.378 EUR; 2.378,00; 2.378,00 €; 2.378,00 Euro; 2.378,00 EUR; 2.378,0; 2.378,0 €; 2.378,0 Euro; 2.378,0 EUR; 2378.00; 2378.00 €; 2378.00 Euro; 2378.00 EUR; 2378.0; 2378.0 €; 2378.0 Euro; 2378.0 EUR
**Erklärung:** Arbeitnehmeranteile 3.400 € × 18 % = 612 €. Nettoentgelt = 3.400 € − 612 € − 410 € = 2.378 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-24 · Wahr/Falsch
**Aussage:** Die Beiträge zur gesetzlichen Unfallversicherung trägt die NordWert als Arbeitgeberin allein; die Beschäftigten zahlen dafür keinen Anteil.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Unfallversicherung trägt der Arbeitgeber allein; Träger ist die Berufsgenossenschaft. Die Umlagen zahlt der Arbeitgeber ebenfalls allein. Nur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung werden im Grundsatz paritätisch finanziert (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-3.4-25 · Kurzantwort
**Frage:** Für die Lagerkraft mit 3.400 € Bruttoentgelt im Monat gelten folgende Beispielwerte (keine geltenden Sätze): Arbeitgeberanteile zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung zusammen 18 % des Bruttoentgelts, Unfallversicherung 1,0 %, Umlagen 0,8 %. Wie hoch sind die monatlichen Gesamtkosten der NordWert für diese Lagerkraft in Euro (Bruttoentgelt plus Arbeitgeber-Nebenkosten)?
**Akzeptierte Antworten:** 4073,20; 4073,20 €; 4073,20 Euro; 4073,20 EUR; 4073,2; 4073,2 €; 4073,2 Euro; 4073,2 EUR; 4.073,20; 4.073,20 €; 4.073,20 Euro; 4.073,20 EUR; 4.073,2; 4.073,2 €; 4.073,2 Euro; 4.073,2 EUR; 4073.20; 4073.20 €; 4073.20 Euro; 4073.20 EUR; 4073.2; 4073.2 €; 4073.2 Euro; 4073.2 EUR
**Erklärung:** Nebenkosten: 3.400 € × (18 % + 1,0 % + 0,8 %) = 3.400 € × 19,8 % = 673,20 €. Gesamtkosten = 3.400 € + 673,20 € = 4.073,20 €. Die Lohnsteuer kommt nicht hinzu, sie steckt im Bruttoentgelt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-26 · Zuordnung
**Anweisung:** Ordne jeden Betrag aus der Entgeltabrechnung der Stelle zu, an die der Betrag zu zahlen ist oder der er zusteht.
- Nettoentgelt ↔ Beschäftigte
- Einbehaltene Lohnsteuer ↔ Finanzamt
- Gesamtbeitrag zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung ↔ Einzugsstelle (Krankenkasse)
- Beitrag zur Unfallversicherung ↔ Berufsgenossenschaft
**Erklärung:** Die Lohnsteuer geht an das Finanzamt, der gebündelte Beitrag zu den vier Zweigen an die Einzugsstelle, die ihn weiterleitet. Die Unfallversicherung hat mit der Berufsgenossenschaft einen eigenen Träger.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-3.4-27 · Kurzantwort
**Frage:** Eine Teamleitung der NordWert erhält 6.900 € brutto im Monat. Annahmen (Beispielwerte, keine geltenden Werte): Die Beitragsbemessungsgrenze der Krankenversicherung beträgt 5.600 € im Monat, der Arbeitnehmeranteil zur Krankenversicherung 6,6 %. Wie hoch ist der Arbeitnehmeranteil zur Krankenversicherung in Euro?
**Akzeptierte Antworten:** 369,60; 369,60 €; 369,60 Euro; 369,60 EUR; 369,6; 369,6 €; 369,6 Euro; 369,6 EUR; 369.60; 369.60 €; 369.60 Euro; 369.60 EUR; 369.6; 369.6 €; 369.6 Euro; 369.6 EUR
**Erklärung:** Beitragspflichtig ist nur das kleinere von Bruttoentgelt und Grenze, also 5.600 €. Arbeitnehmeranteil = 5.600 € × 6,6 % = 369,60 €. Mit dem ganzen Bruttoentgelt (6.900 € × 6,6 % = 455,40 €) wäre das Ergebnis falsch.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-3.4-28 · Multiple Choice
**Frage:** Ein Lieferunternehmen mit Sitz in Deutschland schickt der NordWert eine Rechnung über Verpackungsmaterial als PDF-Anhang per E-Mail. Die Prüfung im Eingangsprogramm ergibt, dass die Datei eine reine PDF-Datei ohne eingebetteten XML-Datensatz ist. Modellannahme: Es handelt sich um einen Umsatz zwischen Unternehmen im Inland, die Übergangsfristen für die Ausstellung sind abgelaufen. Was trifft zu (Stand Oktober 2026, vor Verwendung prüfen)?
- [ ] Die PDF-Datei ist eine E-Rechnung, weil sie elektronisch per E-Mail übermittelt wurde und am Bildschirm vollständig lesbar ist
- [ ] Die PDF-Datei wird zur E-Rechnung, sobald die NordWert sie ausdruckt, unterschreibt und im Rechnungsordner abheftet
- [ ] Die PDF-Datei ist eine E-Rechnung, sobald sie eine Rechnungsnummer und den ausgewiesenen Steuerbetrag enthält
- [x] Die PDF-Datei ist keine E-Rechnung, weil der Datensatz fehlt; die NordWert kann eine korrekte Rechnung anfordern
**Erklärung:** Eine E-Rechnung setzt ein strukturiertes Format voraus (zum Beispiel XRechnung oder ZUGFeRD), das automatisch verarbeitet werden kann. Der Übertragungsweg, die Lesbarkeit und der Inhalt allein genügen nicht; eine reine PDF-Datei ohne eingebetteten Datensatz ist eine sonstige Rechnung. Nach Ablauf der Übergangsfristen reicht sie für Umsätze im Inland nicht mehr aus.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-29 · Mehrfachauswahl
**Frage:** Welche der folgenden Rechnungsformen sind E-Rechnungen im Sinne des Umsatzsteuerrechts, wenn das strukturierte Format der europäischen Norm EN 16931 entspricht?
- [ ] Ein eingescanntes Papierdokument als PDF-Bilddatei
- [x] Eine XML-Datei im Format XRechnung
- [ ] Eine als Word-Dokument per E-Mail versandte Rechnung
- [x] Eine PDF-Datei mit eingebettetem XML-Datensatz im Format ZUGFeRD
**Erklärung:** Entscheidend ist der strukturierte, maschinenlesbare Datensatz. XRechnung (reines XML) und ZUGFeRD (PDF mit eingebettetem XML, ab einem Profil, das die Norm erfüllt) enthalten ihn; eine Bilddatei und ein Word-Dokument enthalten nur lesbaren Text (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-3.4-30 · Kurzantwort
**Frage:** Für eine Beschäftigte der NordWert betragen das Bruttoentgelt 2.500 € und die gesamten Arbeitgeber-Nebenkosten (Arbeitgeberanteile zur Sozialversicherung, Unfallversicherung und Umlagen; Beispielwerte) 512,50 € im Monat. Wie viel Prozent des Bruttoentgelts betragen die Arbeitgeber-Nebenkosten?
**Akzeptierte Antworten:** 20,5; 20,5 %; 20,5%; 20,5 Prozent; 20.5; 20.5 %; 20.5%; 20.5 Prozent; 20,50; 20,50 %; 20,50%; 20,50 Prozent; 20.50; 20.50 %; 20.50%; 20.50 Prozent
**Erklärung:** Nebenkostensatz = 512,50 € ÷ 2.500 € × 100 = 20,5 %.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-3.4-31 · Sortieren
**Anweisung:** Bringe die Schritte der monatlichen Entgeltabrechnung der NordWert in eine sinnvolle Reihenfolge.
1. Entgeltdaten und Lohnsteuerabzugsmerkmale der Beschäftigten erfassen und prüfen
2. Brutto-Netto-Abrechnung mit Lohnsteuer und Sozialversicherungsbeiträgen erstellen
3. Lohnsteuer-Anmeldung und Beitragsnachweis elektronisch übermitteln
4. Nettoentgelt, Lohnsteuer und Beiträge zu den Terminen zahlen und buchen
**Erklärung:** Erst müssen die Daten stimmen, dann wird abgerechnet; aus der Abrechnung entstehen die Meldungen, und anschließend werden die Beträge zu ihren Terminen gezahlt und gebucht. Die Beiträge sind schon vor dem Monatsende fällig, deshalb muss die Abrechnung früh abgeschlossen sein (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-32 · Entweder-Oder
**Frage:** Die NordWert stellt eine Rechnung über Faltkartons an ein Unternehmen in Österreich aus. Modellannahme: Die Übergangsfristen für die Ausstellung sind abgelaufen. Muss die Rechnung wegen der deutschen Pflicht zur E-Rechnung im strukturierten Format ausgestellt werden (Stand Oktober 2026, vor Verwendung prüfen)?
- [ ] Ja, jede Rechnung zwischen Unternehmen im Binnenmarkt muss nach Ablauf der Übergangsfristen im strukturierten Format ausgestellt sein
- [x] Nein, die deutsche Pflicht gilt für Umsätze im Inland; Vorgaben des anderen Staates sind gesondert zu prüfen
**Erklärung:** Die Pflicht gilt für Umsätze zwischen im Inland ansässigen Unternehmen. Für Rechnungen an Kundschaft im Ausland gibt sie kein Format vor; ob das Empfängerland eigene Anforderungen stellt, muss die NordWert prüfen.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-3.4-33 · Lückentext
**Text:** Der Betrag, bis zu dem das Entgelt in der Sozialversicherung beitragspflichtig ist, heißt ___Beitragsbemessungsgrenze___.
**Erklärung:** Entgelt oberhalb der Grenze bleibt beitragsfrei; es gibt eine Grenze für Kranken- und Pflegeversicherung und eine für Renten- und Arbeitslosenversicherung. Sie ist nicht die Versicherungspflichtgrenze der Krankenversicherung (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: leicht` · `bloom: erinnern`
