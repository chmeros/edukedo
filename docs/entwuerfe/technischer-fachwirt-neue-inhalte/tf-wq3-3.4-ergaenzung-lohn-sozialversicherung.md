# Entwurf Technischer Fachwirt, Lohnsteuer, Sozialversicherung, Brutto-Netto, Abfindung und elektronische Rechnung: Ergänzung im Thema 3.4

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil C des Auftrags P-AV (Erhebung G-TF-04, Auswertung `docs/entwuerfe/technischer-fachwirt-r4-auswertung.md`, dort „P-TF2 Teil C“). Einzufügen in `content/technischer-fachwirt/wq3/3.4-steuerrecht.md`: Abschnitt A **vor der Überschrift „### Grundsteuer und weitere betriebliche Aspekte“** (einziger Anker; die fünf neuen Abschnitte stehen damit hinter „Umsatzsteuer im Inlands- und EU-Auslandsgeschäft“; die elektronische Rechnung steht bewusst als erster neuer Abschnitt, weil sie an Umsatzsteuer und Vorsteuerabzug anschließt, danach folgen Lohnsteuer, Sozialversicherung, Brutto-Netto und Abfindung), B an die Karteikarten hinter K-3.4-18, C an das Quiz hinter Q-3.4-12. Bestand gezählt (Stand 23.10.2026): 18 Karteikarten (K-3.4-01 bis -18, lückenlos) und 12 Quizfragen (Q-3.4-01 bis -12, lückenlos); `git log -S` auf K-3.4-19 und Q-3.4-13 im Kurs ergibt keine entfernten IDs. Die neuen IDs sind K-3.4-19 bis -28 (10 Karten) und Q-3.4-13 bis -24 (12 Quizfragen). Die Fallaufgabe F-WQ3-06 (Teil A vergibt F-WQ3-04, Teil B F-WQ3-05) und die zwei Fachgesprächsfragen stehen in `tf-faelle-c.md`, die Rechtsangaben in `rechtsangaben-c.md`, die Ersetzungen (keine) in `ersetzungen-c.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Abgleich mit dem Bestand.** Der Bestand von 3.4 behandelt Steuerarten im Überblick, Körperschaftsteuer, Gewerbesteuer mit Zerlegung, Umsatzsteuer mit Vorsteuerabzug, innergemeinschaftliche Lieferung und Reverse-Charge, Grundsteuer und Mitwirkungspflichten. Die Lohnsteuer kommt nur als Rolle der Abzugsverpflichteten (Abschnitt „Überblick“, K-3.4-02, Q-3.4-02) und die Abfindung nur in F-WQ3-02 Teilaufgabe 4 vor (dort ausdrücklich ohne Einzelheiten). Per Suche in `content/technischer-fachwirt` geprüft: Sozialversicherungsbeiträge, Arbeitgeberanteile, Beitragsbemessungsgrenze, Brutto-Netto, Fünftelregelung und elektronische Rechnung kommen nicht vor; die Berufsgenossenschaft steht in Thema 10.3 nur bei der Unfallanzeige; die Aufbewahrungsfristen (Buchungsbelege acht Jahre) stehen in K-2.1-07. **Verweis statt Wiederholung:** Buchung der Rechnungen und Aufbewahrungsfristen (Thema 2.1), Arbeitsrecht der Beendigung, Aufhebungsvertrag, Sozialplan (Thema 3.2), Lohnformen und Entlohnungsrechnung (Thema 9.3). **Abgrenzung zu den Schwesterkursen:** Industriefachwirt (Solvitec, P-AE) und Wirtschaftsfachwirt haben Lohnsteuer, Sozialversicherung und E-Rechnung; Fachbegriffe und Gesetzesinhalt sind gleich, Gliederung, Beispiele, Zahlen und Fall nicht (hier: Abfindung mit Fünftelregelung als eigener Abschnitt, Lohnsteuer im Zusammenhang mit der Einkommensteuerveranlagung, Anzahlungs- und Endrechnung als E-Rechnung, Beitragsbemessungsgrenze als Teilgrenze nur eines Zweigs).

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz und Fall. Rechtszahlen und Fristen tragen „Stand Oktober 2026, vor Verwendung prüfen“. Beitragssätze und Beitragsbemessungsgrenzen sind **nicht** als Tatsache genannt; alle Sätze, Grenzen und Beträge der Rechenbeispiele, Karten, Quiz und des Falls sind frei gewählte, gekennzeichnete Beispielwerte. **Zeitkritisch** (in der Rechtsangaben-Datei so markiert): Beitragssätze und Beitragsbemessungsgrenzen (im Text nur Beispielwerte), Übergangsfristen der E-Rechnung und die Anwendungsschreiben der Finanzverwaltung, Wegfall der Fünftelregelung im Lohnsteuerabzug seit 2025, Schwelle von 410 €, Frist für den Antrag auf Änderung der Steuerklassen.

---

# Thema 3.4

## A. Theorie-Ergänzung 3.4 (einfügen vor „### Grundsteuer und weitere betriebliche Aspekte“)

### Elektronische Rechnung im Geschäft zwischen Unternehmen

Die folgenden Abschnitte ergänzen die Umsatzsteuer um die Rechnung und um die Pflichten der Vantera als Arbeitgeberin. Fristen und Rechtszahlen tragen den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“; Beitragssätze, Grenzen und alle Beträge der Rechenbeispiele sind frei gewählte Beispielwerte.

Von einer **elektronischen Rechnung (E-Rechnung)** spricht das Gesetz, wenn Ausstellung, Übermittlung und Empfang in einem strukturierten elektronischen Format erfolgen, das eine elektronische Verarbeitung ermöglicht. Das Format muss der europäischen Norm entsprechen oder zwischen den Beteiligten so vereinbart sein, dass sich die Pflichtangaben vollständig in ein normgerechtes Format übertragen lassen (Stützangabe § 14 Abs. 1 UStG). Verbreitet sind **XRechnung** (reiner Datensatz) und **ZUGFeRD** (lesbares PDF mit eingebettetem Datensatz); nach den Anwendungsschreiben der Finanzverwaltung kommen dafür nur Profile in Betracht, die der Norm entsprechen, und bei einem hybriden Format kommt es auf den Datensatz an. Papier und ein PDF ohne Datensatz sind **sonstige Rechnungen**. Der Inhalt bleibt gleich: Die Pflichtangaben gelten für jede Form, und der Vorsteuerabzug setzt eine ordnungsgemäße Rechnung voraus (Stützangaben § 14 Abs. 4, § 15 Abs. 1 UStG).

**Pflicht und Übergang (zeitkritisch).** Wer an ein Unternehmen für dessen Unternehmen leistet und mit ihm im Inland ansässig ist, muss eine E-Rechnung ausstellen, außer bei bestimmten steuerfreien Umsätzen (Stützangabe § 14 Abs. 2 Satz 2 Nr. 1 UStG). Der Übergang endet stufenweise (Stützangabe § 27 Abs. 38 UStG; Stand Oktober 2026, vor Verwendung prüfen): Rechnungen über Umsätze der Jahre 2025 und 2026 dürfen bis zum 31.12.2026 noch auf Papier oder, mit Zustimmung der Empfangsseite, in einem anderen elektronischen Format übermittelt werden. Für Umsätze des Jahres 2027 gilt das bis zum 31.12.2027 nur noch, wenn der Gesamtumsatz des ausstellenden Unternehmens im Vorjahr höchstens 800.000 € betrug (oder im EDI-Verfahren); maßgeblich ist der Zeitpunkt der Leistung. Ab 2028 gilt die Pflicht ohne diese Ausnahme. Nach Auffassung der Finanzverwaltung müssen Unternehmen im Inland E-Rechnungen seit Beginn 2025 empfangen können; Einzelheiten regeln Anwendungsschreiben, die ergänzt werden. **Keine Formatpflicht** besteht unter anderem bei Kleinbetragsrechnungen bis 250 € Gesamtbetrag (nicht bei bestimmten Leistungen, etwa mit Steuerschuld der Empfangsseite; Stützangabe § 33 UStDV), bei Rechnungen an Privatpersonen und bei Beteiligten im Ausland; Vantera stellt eine Rechnung an ein Unternehmen in Polen also nach deutschem Recht nicht zwingend als E-Rechnung aus (Anforderungen des Empfangslandes gesondert prüfen).

**Anzahlung, Endrechnung, Aufbewahrung.** Stellt Vantera über eine Anzahlung für eine noch nicht ausgeführte Lieferung eine Rechnung aus, gelten dieselben Regeln sinngemäß; in der Endrechnung setzt sie die vor der Lieferung vereinnahmten Teilentgelte und die darauf entfallenden Steuerbeträge ab, soweit über sie Rechnungen ausgestellt wurden (Stützangabe § 14 Abs. 5 UStG). Rechnungen sind acht Jahre aufzubewahren; die Frist beginnt mit dem Schluss des Kalenderjahres, in dem sie ausgestellt wurden, und läuft nicht ab, solange die Rechnung für Steuern von Bedeutung ist, deren Festsetzungsfrist noch nicht abgelaufen ist (Stützangaben § 14b Abs. 1 UStG, § 147 Abs. 3 AO; Buchungsbelege siehe Thema 2.1 „Finanzbuchhaltung und Jahresabschluss“ im Fachgebiet Rechnungswesen). Echtheit der Herkunft, Unversehrtheit des Inhalts und Lesbarkeit müssen die ganze Frist über gewährleistet sein; nach Darstellung der Finanzverwaltung bleibt dafür die Originaldatei im empfangenen Format maßgeblich, ein Ausdruck genügt nicht.

### Lohnsteuerabzug und Einkommensteuer im Überblick

Mit **Lohnsteuer** bezeichnet das Gesetz keine eigene Steuerart, sondern die Art der Erhebung der **Einkommensteuer** bei Einkünften aus nichtselbständiger Arbeit: durch Abzug vom Arbeitslohn (Stützangabe § 38 Abs. 1 EStG). Zu diesen Einkünften gehören Gehälter, Löhne und andere Bezüge für eine Beschäftigung, laufend oder einmalig (Stützangabe § 19 Abs. 1 EStG). **Steuerschuldner:in** ist die beschäftigte Person; Vantera ist **Abzugsverpflichtete** und behält die Steuer für Rechnung der beschäftigten Person bei jeder Lohnzahlung ein (Stützangabe § 38 Abs. 2, 3 EStG). Soweit sie anfallen, behält sie Solidaritätszuschlag und Kirchensteuer mit ein; die Beispiele fassen alles unter „Lohnsteuer“ zusammen.

Die Einkommensteuer erfasst das Einkommen natürlicher Personen aus sieben Einkunftsarten, darunter Gewerbebetrieb, selbständige Arbeit, nichtselbständige Arbeit, Kapitalvermögen sowie Vermietung und Verpachtung (Stützangabe § 2 Abs. 1 EStG). Sie entsteht mit Ablauf des Kalenderjahres und wird in der **Veranlagung** endgültig festgesetzt; die durch Abzug erhobene Lohnsteuer wird dabei angerechnet und führt je nach Ergebnis zu einer Nachzahlung oder Erstattung (Stützangabe § 36 EStG). Eine Veranlagung wird von Amts wegen nur in bestimmten Fällen durchgeführt, zum Beispiel wenn die Einkünfte ohne Steuerabzug (nach Abzug der Werbungskosten) über 410 € liegen, bei Arbeitslohn von mehreren Arbeitgebern oder wenn beide Ehegatten Arbeitslohn beziehen und einer nach Steuerklasse V oder VI besteuert wird; sonst kann sie beantragt werden (Stützangabe § 46 Abs. 2 EStG; Stand Oktober 2026, vor Verwendung prüfen).

Wie viel Lohnsteuer Vantera einbehält, hängt vom Arbeitslohn und den **Lohnsteuerabzugsmerkmalen** ab, vor allem der **Steuerklasse** (I bis VI) und Kinderfreibeträgen. Das Bundeszentralamt für Steuern stellt sie elektronisch bereit (**ELStAM**), Vantera ruft sie ab. Ändern sich die Verhältnisse, beantragt die beschäftigte Person die Änderung beim Finanzamt, Vantera ändert selbst nichts. Ehegatten können die Änderung der Steuerklassen im Laufe des Jahres gemeinsam beantragen; das Finanzamt ändert sie vom Beginn des Kalendermonats an, der auf den Antrag folgt, und für das laufende Jahr ist der Antrag bis zum 30. November zu stellen (Stützangaben §§ 38b, 39 Abs. 6, § 39e EStG; Stand Oktober 2026, vor Verwendung prüfen). Vantera übermittelt die **Lohnsteuer-Anmeldung** elektronisch an das **Betriebsstättenfinanzamt** und führt die Steuer bis zum zehnten Tag nach Ablauf des Anmeldungszeitraums ab; Anmeldungszeitraum ist grundsätzlich der Kalendermonat, bei geringer Vorjahressteuer das Vierteljahr oder Jahr (Stützangabe § 41a EStG; Stand Oktober 2026, vor Verwendung prüfen). Fällt das Fristende auf ein Wochenende oder einen Feiertag, endet die Frist am nächsten Werktag (Stützangabe § 108 Abs. 3 AO). Für zu wenig einbehaltene Lohnsteuer haftet Vantera neben der beschäftigten Person; das Finanzamt entscheidet nach pflichtgemäßem Ermessen (Stützangabe § 42d EStG).

### Sozialversicherungsbeiträge, Arbeitgeberanteil und Meldungen

Die gesetzliche Sozialversicherung gliedert sich in fünf Zweige. In der Kranken-, der Pflege-, der Renten- und der Arbeitslosenversicherung tragen Beschäftigte und Arbeitgeberseite die Beiträge im Grundsatz je zur Hälfte (Stützangaben § 249 SGB V, § 58 SGB XI, § 168 SGB VI, § 346 SGB III); Besonderheiten (Zuschlag für Kinderlose, abweichende Aufteilung in einzelnen Ländern) bleiben in den Beispielen außer Ansatz. Die **Unfallversicherung** zahlt Vantera allein an die Berufsgenossenschaft; der Beitrag richtet sich nach den Arbeitsentgelten und den Gefahrklassen und wird in der Regel nachträglich nach Ablauf des Kalenderjahres festgesetzt (Stützangaben §§ 150, 152, 153 SGB VII). Außerdem fallen **Umlagen** an, die allein die Arbeitgeberseite trägt, zum Beispiel für Mutterschaft und Insolvenzgeld; die Umlage für das Insolvenzgeld zieht die Einzugsstelle zusammen mit den Beiträgen ein (Stützangaben §§ 358, 359 SGB III). Beitragssätze legen Gesetz und Krankenkassen fest, und sie ändern sich; die Beispiele rechnen deshalb mit Beispielwerten.

**Beitragsbemessungsgrenze.** Beiträge werden nur bis zu einer jährlich per Verordnung neu festgesetzten Obergrenze des Entgelts berechnet (Stützangaben § 223 Abs. 3 SGB V, § 159 SGB VI; aktuelle Werte vor Verwendung nachschlagen, Stand Oktober 2026). Es gibt zwei: eine für Kranken- und Pflegeversicherung, eine höhere für die allgemeine Renten- und die Arbeitslosenversicherung. Beitragspflichtig ist **das kleinere von Bruttoentgelt und Grenze**, und zwar je Zweig. *Rechenbeispiel (Beispielsätze je Seite 7,6 %, 1,6 %, 9,3 % und 1,2 %, zusammen 19,7 %; Beispielgrenzen 5.600,00 € für Kranken- und Pflegeversicherung und 8.200,00 € für Renten- und Arbeitslosenversicherung):* Bei 7.050,00 € brutto ist die erste Grenze überschritten, die zweite nicht. Arbeitnehmeranteile: 5.600,00 € × 7,6 % = 425,60 €, 5.600,00 € × 1,6 % = 89,60 €, 7.050,00 € × 9,3 % = 655,65 €, 7.050,00 € × 1,2 % = 84,60 €, zusammen 1.255,45 €. Ohne Grenze wären es 7.050,00 € × 19,7 % = 1.388,85 € und damit 133,40 € mehr.

**Zahlung, Nachweis und Abzug.** Vantera führt die Beiträge für vier Zweige gebündelt als Gesamtsozialversicherungsbeitrag an die **Einzugsstelle** ab, die Krankenkasse der beschäftigten Person; zahlen muss sie auch den Anteil der Beschäftigten, der als aus deren Vermögen gezahlt gilt (Stützangaben §§ 28d, 28e SGB IV). Der Beitrag wird in voraussichtlicher Höhe spätestens am drittletzten Bankarbeitstag des Monats fällig, in dem die Beschäftigung ausgeübt wurde; einen verbleibenden Rest schuldet Vantera zum entsprechenden Termin des Folgemonats (Stützangabe § 23 Abs. 1 SGB IV). Der **Beitragsnachweis** muss der Einzugsstelle zwei Arbeitstage vor der Fälligkeit zugehen (Stützangabe § 28f Abs. 3 SGB IV). Den Arbeitnehmeranteil darf Vantera nur vom Arbeitsentgelt abziehen; ein unterbliebener Abzug ist bei den nächsten drei Lohnzahlungen nachholbar, danach nur, wenn er ohne Verschulden der Arbeitgeberseite unterblieben ist (weitere Ausnahmen nicht dargestellt; Stützangabe § 28g SGB IV; Stand Oktober 2026, vor Verwendung prüfen). Den Unfallversicherungsbeitrag fordert die Berufsgenossenschaft per Bescheid an (zur Unfallanzeige siehe Thema 10.3 „Arbeitsschutz und Arbeitssicherheit“ im Fachgebiet Qualitäts- und Umweltmanagement sowie Arbeitsschutz).

### Von Brutto zu Netto und zu den Gesamtkosten

Das **Nettoentgelt** ist das Bruttoentgelt minus Lohnsteuer minus Arbeitnehmeranteile. Die **Gesamtkosten** der Vantera für eine Stelle sind im Modell dieses Kurses das Bruttoentgelt plus Arbeitgeberanteile, Unfallversicherung und Umlagen; die Lohnsteuer kommt nicht hinzu, denn sie steckt im Bruttoentgelt. Weitere Personalkosten (Urlaubs- und Weihnachtsgeld, bezahlte Ausfallzeiten, Fortbildung) sind hier nicht einbezogen (Stand Oktober 2026, vor Verwendung prüfen); wie das Entgelt aus Lohnform und Arbeitsbewertung entsteht, steht in Thema 9.3 „Produktionscontrolling“ im Fachgebiet Produktionsplanung, -steuerung und -kontrolle.

*Rechenbeispiel (Beispielwerte):* Eine Zerspanungsmechanikerin erhält 3.690,00 € brutto und liegt unter beiden Grenzen. Sätze je Seite wie oben (19,7 %); Lohnsteuer vorgegeben 391,00 €; Unfallversicherung 1,7 %, Umlagen 0,8 %. Arbeitnehmeranteile 280,44 € + 59,04 € + 343,17 € + 44,28 € = 726,93 €; Nettoentgelt 3.690,00 € − 726,93 € − 391,00 € = 2.572,07 €. Arbeitgeberanteile 726,93 €, Unfallversicherung 62,73 €, Umlagen 29,52 €; Gesamtkosten 3.690,00 € + 726,93 € + 62,73 € + 29,52 € = 4.509,18 €, die Nebenkosten betragen 819,18 € oder 22,2 % des Bruttoentgelts.

### Abfindung steuerlich und in der Sozialversicherung im Prinzip

Eine **Abfindung** bei einvernehmlichem Ausscheiden oder nach einer Kündigung ist keine Gegenleistung für geleistete Arbeit, sondern eine Entschädigung für den Verlust des Arbeitsplatzes (zu Aufhebungsvertrag und Sozialplan siehe Thema 3.2 „Arbeitsrecht Grundlagen“ im Fachgebiet Recht und Steuern). **Steuerlich** ist sie steuerpflichtiger Arbeitslohn beziehungsweise eine Entschädigung für entgehende Einnahmen (Stützangaben § 19 Abs. 1, § 24 Nr. 1 EStG); eine Steuerbefreiung für Abfindungen wegen der Auflösung des Dienstverhältnisses enthält das Gesetz nicht (Stützangabe § 3 EStG). Im Lohnsteuerabzug ist sie ein **sonstiger Bezug**, den Vantera ohne Tarifermäßigung versteuert (Stützangaben §§ 38a, 39b Abs. 3 EStG).

**Fünftelregelung.** Für Entschädigungen kann in der Einkommensteuerveranlagung eine ermäßigte Berechnung in Betracht kommen: Die Steuer wird so ermittelt, als flösse nur ein Fünftel der Abfindung zu, und der Mehrbetrag wird verfünffacht (Stützangabe § 34 Abs. 1, 2 Nr. 2 EStG). Nach der Rechtsprechung setzt das eine Zusammenballung von Einkünften voraus; Einzelheiten und Ausnahmen sind hier nicht dargestellt. Seit 2025 wendet Vantera die Fünftelregelung im Lohnsteuerabzug **nicht mehr** an; sie wirkt erst in der Veranlagung der beschäftigten Person (Stand Oktober 2026, vor Verwendung prüfen). Die Abfindung wird also zunächst voll besteuert, die Entlastung kommt mit dem Steuerbescheid.

**Sozialversicherung.** Eine reine Abfindung für den Verlust des Arbeitsplatzes ist nach der Rechtsprechung der Sozialgerichte regelmäßig kein beitragspflichtiges Arbeitsentgelt (zum Arbeitsentgelt siehe Stützangabe § 14 SGB IV); nicht abschließend im Gesetz geregelt, Stand Oktober 2026, vor Verwendung prüfen. Was in Wahrheit Entgelt für erworbene Ansprüche ist, etwa nicht gezahlter Lohn oder die Abgeltung von Resturlaub, bleibt trotz der Bezeichnung „Abfindung“ lohnsteuer- und beitragspflichtig.

## B. Karteikarten 3.4 (anhängen)

#### K-3.4-19
**Frage:** Was bestimmt, wie viel Lohnsteuer ein Unternehmen von einer Beschäftigten einbehält, und wer ändert die Steuerklasse (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Der Arbeitslohn und die Lohnsteuerabzugsmerkmale (Steuerklasse, Kinderfreibeträge), die das Unternehmen elektronisch abruft. Die Änderung beantragt die beschäftigte Person beim Finanzamt; bei Ehegatten gilt sie ab dem Monat nach dem Antrag.
`tags: lohnsteuer, steuerklasse` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-20
**Frage:** Ist der Lohnsteuerabzug die endgültige Steuer, und wann wird eine Beschäftigte zur Einkommensteuer veranlagt (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Nein, der Abzug ist vorläufig und wird in der Veranlagung auf die Einkommensteuer angerechnet. Veranlagt wird zum Beispiel bei Einkünften ohne Steuerabzug von über 410 € oder bei Lohn von mehreren Arbeitgebern, sonst nur auf Antrag.
`tags: einkommensteuer, veranlagung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-21
**Frage:** Wohin und bis wann meldet ein Unternehmen die einbehaltene Lohnsteuer, und was gilt, wenn die Frist auf einen Sonntag fällt (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** An das Betriebsstättenfinanzamt, spätestens am zehnten Tag nach Ablauf des Anmeldungszeitraums (meist der Kalendermonat). Fällt die Frist auf ein Wochenende oder einen Feiertag, endet sie am nächsten Werktag.
`tags: lohnsteuer, fristen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-22
**Frage:** Wer trägt welche Sozialversicherungsbeiträge für eine Beschäftigte der Vantera?
**Antwort:** Kranken-, Pflege-, Renten- und Arbeitslosenversicherung tragen Beschäftigte und Arbeitgeberseite im Grundsatz je zur Hälfte. Die Unfallversicherung (Berufsgenossenschaft) und die Umlagen zahlt die Arbeitgeberseite allein.
`tags: sozialversicherung, arbeitgeberanteil` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-3.4-23
**Frage:** Wie wirkt die Beitragsbemessungsgrenze, und warum kann ein Entgelt über der einen Grenze, aber unter der anderen liegen?
**Antwort:** Beitragspflichtig ist je Zweig das kleinere von Bruttoentgelt und Grenze. Es gibt zwei Grenzen, eine für Kranken- und Pflegeversicherung und eine höhere für Renten- und Arbeitslosenversicherung; zwischen beiden gilt die niedrigere schon, die höhere noch nicht.
`tags: sozialversicherung, beitragsbemessungsgrenze` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-24
**Frage:** Wohin zahlt ein Unternehmen den Gesamtsozialversicherungsbeitrag, und bis wann (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** An die Einzugsstelle (Krankenkasse), in voraussichtlicher Höhe spätestens am drittletzten Bankarbeitstag des Beschäftigungsmonats. Der Beitragsnachweis muss zwei Arbeitstage vor der Fälligkeit vorliegen.
`tags: sozialversicherung, fristen` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-3.4-25
**Frage:** Wie ermittelst du aus dem Bruttoentgelt das Nettoentgelt und die Gesamtkosten einer Stelle?
**Antwort:** Netto = Brutto − Lohnsteuer − Arbeitnehmeranteile. Gesamtkosten = Brutto + Arbeitgeberanteile + Unfallversicherung + Umlagen; die Lohnsteuer wird nicht addiert, sie steckt im Brutto.
`tags: brutto-netto, gesamtkosten` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-26
**Frage:** Wie wird eine Abfindung wegen Verlusts des Arbeitsplatzes steuerlich behandelt, und wo wirkt die Fünftelregelung (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Sie ist steuerpflichtig und im Lohnsteuerabzug ein sonstiger Bezug ohne Ermäßigung. Die Fünftelregelung, eine ermäßigte Berechnung der Steuer, kommt seit 2025 nur noch in der Einkommensteuerveranlagung zum Zug.
`tags: abfindung, fuenftelregelung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-3.4-27
**Frage:** Muss ein Unternehmen auf eine Abfindung Sozialversicherungsbeiträge zahlen, und was gilt für die Abgeltung von Resturlaub?
**Antwort:** Eine reine Abfindung als Entschädigung für den Verlust des Arbeitsplatzes ist nach der Rechtsprechung regelmäßig beitragsfrei. Die Abgeltung von Resturlaub und nicht gezahlter Lohn bleiben Arbeitsentgelt, auch wenn alles „Abfindung“ heißt.
`tags: abfindung, sozialversicherung` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-3.4-28
**Frage:** Was ist eine E-Rechnung, und wer muss sie im Jahr 2027 ausstellen (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Eine Rechnung in strukturiertem Format (zum Beispiel XRechnung oder ZUGFeRD, dort gilt der Datensatz). Pflicht zwischen Inlandsunternehmen, außer bei bestimmten steuerfreien Umsätzen, Kleinbeträgen bis 250 € und Privatpersonen; 2027 erleichtert nur bei Vorjahresumsatz bis 800.000 €.
`tags: e-rechnung` · `schwierigkeit: mittel` · `bloom: verstehen`

## C. Quiz 3.4 (anhängen)

#### Q-3.4-13 · Multiple Choice
**Frage:** Eine Zerspanungsmechanikerin hat 2026 neben ihrem Gehalt Einkünfte aus der Vermietung einer Wohnung von 980,00 € erzielt (nach Abzug der Werbungskosten), auf die kein Steuerabzug erfolgte (Stand Oktober 2026, vor Verwendung prüfen). Was gilt für ihre Einkommensteuer?
- [ ] Der Lohnsteuerabzug hat die gesamte Steuer abgegolten, eine Steuererklärung ist nicht nötig.
- [x] Es wird veranlagt, weil diese Einkünfte über 410 € liegen; die Lohnsteuer wird angerechnet.
- [ ] Die Arbeitgeberseite muss die Mieteinkünfte in ihrer Lohnsteuer-Anmeldung mit angeben und versteuern.
- [ ] Auf die Mieteinkünfte fallen zusätzlich Beiträge zur Sozialversicherung an.
**Erklärung:** Liegen Einkünfte ohne Steuerabzug über 410 €, wird veranlagt. Die einbehaltene Lohnsteuer wird dann auf die Einkommensteuer angerechnet. Die Arbeitgeberseite kennt solche Einkünfte nicht und ist dafür nicht zuständig.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-14 · Zuordnung
**Anweisung:** Ordne jedem Begriff die passende Beschreibung zu.
- Lohnsteuerabzugsmerkmale ↔ Steuerklasse, Kinderfreibeträge und weitere Angaben, die das Unternehmen elektronisch abruft
- Betriebsstättenfinanzamt ↔ Finanzamt, bei dem das Unternehmen die Lohnsteuer anmeldet
- Veranlagung ↔ Endgültige Festsetzung der Einkommensteuer nach Ablauf des Jahres
- Einzugsstelle ↔ Krankenkasse, die den Gesamtsozialversicherungsbeitrag entgegennimmt
**Erklärung:** Die Merkmale steuern den laufenden Lohnsteuerabzug, die Veranlagung stellt die endgültige Steuer fest; die Lohnsteuer geht an das Finanzamt, die Sozialversicherungsbeiträge an die Krankenkasse.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-3.4-15 · Wahr/Falsch
**Aussage:** Eine Abfindung, die nur als Entschädigung für den Verlust des Arbeitsplatzes gezahlt wird, ist regelmäßig nicht beitragspflichtig in der Sozialversicherung, aber steuerpflichtig.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Nach der Rechtsprechung ist eine reine Entschädigung kein beitragspflichtiges Arbeitsentgelt (Stand Oktober 2026, vor Verwendung prüfen). Steuerlich gibt es für Abfindungen keine Befreiung, möglich ist die Fünftelregelung in der Veranlagung.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-3.4-16 · Kurzantwort
**Frage:** Annahme (Beispielwerte): Eine Dreherin der Vantera erhält 3.980,00 € brutto im Monat, das Entgelt liegt unter allen Grenzen. Die Arbeitnehmeranteile zur Sozialversicherung betragen zusammen 19,9 % des Bruttoentgelts (Beispielsatz), die Lohnsteuer einschließlich Solidaritätszuschlag und Kirchensteuer ist mit 462,00 € vorgegeben. Wie hoch ist das Nettoentgelt in Euro? Antworte in Euro, auf Cent genau.
**Akzeptierte Antworten:** 2725,98; 2725,98 €; 2725,98 Euro; 2725,98 EUR; 2.725,98; 2.725,98 €; 2.725,98 Euro; 2.725,98 EUR; 2725.98; 2725.98 €; 2725.98 Euro; 2725.98 EUR
**Erklärung:** Arbeitnehmeranteile = 3.980,00 € × 19,9 % = 792,02 €. Nettoentgelt = 3.980,00 € − 792,02 € − 462,00 € = 2.725,98 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-17 · Mehrfachauswahl
**Frage:** Welche Posten gehören im Modell dieses Kurses (ohne weitere Personalkosten wie Urlaubsgeld) zu den Gesamtkosten, die eine Stelle für das Unternehmen verursacht?
- [x] Das Bruttoentgelt
- [x] Die Arbeitgeberanteile zur Sozialversicherung
- [x] Der Beitrag zur Unfallversicherung
- [x] Umlagen, die nur die Arbeitgeberseite zahlt
- [ ] Die einbehaltene Lohnsteuer zusätzlich zum Bruttoentgelt
- [ ] Die Arbeitnehmeranteile zusätzlich zum Bruttoentgelt
**Erklärung:** Lohnsteuer und Arbeitnehmeranteile sind schon im Bruttoentgelt enthalten und werden nur vom Entgelt abgezogen; zusätzliche Kosten sind die Arbeitgeberanteile, die Unfallversicherung und die Umlagen.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-3.4-18 · Sortieren
**Anweisung:** Bringe die Schritte einer Abrechnung mit Anzahlung in die richtige Reihenfolge.
1. Den Vertrag über das Bauteil mit einer vereinbarten Anzahlung schließen.
2. Über die Anzahlung eine Rechnung ausstellen und die Zahlung erhalten.
3. Das fertige Bauteil liefern.
4. Die Endrechnung ausstellen und darin die Anzahlung samt Steuerbetrag absetzen.
**Erklärung:** Die Anzahlung wird vor der Lieferung berechnet und gezahlt; die Endrechnung folgt nach der Lieferung und setzt die Anzahlung samt Umsatzsteuer ab, soweit über sie eine Rechnung ausgestellt wurde.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-19 · Kurzantwort
**Frage:** Vantera stellt am 20. Mai 2027 eine Rechnung aus, die acht Jahre aufzubewahren ist; die Frist beginnt mit dem Schluss des Kalenderjahres, in dem die Rechnung ausgestellt wurde (Stand Oktober 2026, vor Verwendung prüfen). Zu welchem Datum (TT.MM.JJJJ) endet die Aufbewahrungsfrist nach dieser Grundregel, wenn man eine Hemmung des Fristablaufs außer Acht lässt?
**Akzeptierte Antworten:** 31.12.2035; 31.12.35; 31. Dezember 2035; 31.Dezember 2035; 31 Dezember 2035
**Erklärung:** Die Frist beginnt mit Ablauf des 31.12.2027. Acht Jahre später endet sie am 31.12.2035.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-20 · Multiple Choice
**Frage:** Vantera verkauft einem Betrieb im Inland ein Ersatzteil für insgesamt 186,00 € einschließlich Umsatzsteuer (Stand Oktober 2026, vor Verwendung prüfen). Wie darf sie den Umsatz abrechnen?
- [ ] Nur als E-Rechnung, weil beide Seiten im Inland ansässige Unternehmen sind und Vantera dazu verpflichtet ist
- [x] Auch als sonstige Rechnung, etwa auf Papier (Kleinbetrag)
- [ ] Nur auf Papier, E-Rechnungen sind für Kleinbeträge unzulässig
- [ ] Nur mit einer qualifizierten elektronischen Signatur
**Erklärung:** Bei Rechnungen bis 250 € Gesamtbetrag darf Vantera auch eine sonstige Rechnung verwenden; die Pflicht zur E-Rechnung gilt für diese Kleinbeträge nicht, eine E-Rechnung bleibt aber möglich.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-21 · Entweder-Oder
**Frage:** Vantera (Gesamtumsatz im Vorjahr, Beispielwert: 62 Mio. €) druckt im Jahr 2027 die Rechnung über eine Lieferung von 25.000,00 € netto an ein Industrieunternehmen im Inland aus und schickt sie per Post; das Unternehmen hat darum gebeten (Stand Oktober 2026, vor Verwendung prüfen). Ist das ausreichend?
- [ ] Ja, auf Wunsch der Empfangsseite genügt Papier
- [x] Nein, es muss eine E-Rechnung sein
**Erklärung:** Die Übergangsregel für 2027 gilt nur für Unternehmen mit einem Vorjahresumsatz bis 800.000 €. Bei Vantera genügt der Wunsch der Empfangsseite nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-22 · Lückentext (Wortauswahl)
**Text:** Die Fünftelregelung wendet die Arbeitgeberseite seit 2025 beim Lohnsteuerabzug nicht mehr an; sie wirkt erst in der ___Veranlagung___ der beschäftigten Person (Stand Oktober 2026, vor Verwendung prüfen).
**Zusätzliche Begriffe:** Lohnsteuer-Anmeldung; Betriebsprüfung; Umsatzsteuer-Voranmeldung
**Erklärung:** Die Ermäßigung für die Abfindung berücksichtigt das Finanzamt in der Einkommensteuerveranlagung. Die Arbeitgeberseite behält zunächst die volle Lohnsteuer ein.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-3.4-23 · Kurzantwort
**Frage:** Ein Ehepaar, beide Ehegatten mit Arbeitslohn, beantragt am 14. September 2027 gemeinsam beim Finanzamt die Änderung der Steuerklassen (Stand Oktober 2026, vor Verwendung prüfen). Ab welchem Datum (TT.MM.JJJJ) wirkt die Änderung?
**Akzeptierte Antworten:** 01.10.2027; 1.10.2027; 01.10.27; 1.10.27; 1. Oktober 2027; 1.Oktober 2027; 1 Oktober 2027
**Erklärung:** Das Finanzamt ändert die Steuerklassen vom Beginn des Kalendermonats an, der auf den Antrag folgt. Der Antrag im September wirkt also ab dem 1. Oktober 2027.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-24 · Was passt nicht dazu
**Frage:** Eine beschäftigte Person scheidet durch Aufhebungsvertrag aus. Welche Zahlung ist die Ausnahme, weil sie regelmäßig kein beitragspflichtiges Arbeitsentgelt ist (Stand Oktober 2026, vor Verwendung prüfen)?
- [ ] Das Gehalt für den letzten Arbeitsmonat
- [ ] Die Abgeltung von Resturlaub
- [ ] Eine Überstundenvergütung, die noch nicht ausgezahlt war
- [x] Eine reine Abfindung für den Arbeitsplatzverlust
**Erklärung:** Gehalt, Urlaubsabgeltung und Überstundenvergütung sind Entgelt für erworbene Ansprüche und beitragspflichtig. Eine reine Entschädigung für den Verlust des Arbeitsplatzes ist es nach der Rechtsprechung regelmäßig nicht.
`schwierigkeit: schwer` · `bloom: analysieren`
