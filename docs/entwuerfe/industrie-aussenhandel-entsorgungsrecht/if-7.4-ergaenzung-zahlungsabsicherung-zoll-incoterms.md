# Entwurf Industriefachwirt, Zahlungsbedingungen, staatliche Absicherung, Zoll und Incoterms im Überblick: Ergänzung im Thema 7.4

Stand 17.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil A des Auftrags P-AF (Erhebung IF-15, Review FL-IF-09, FL-IF-20 und FL-IF-35, Auswertung `docs/entwuerfe/industriefachwirt-r4-auswertung.md`). Einzufügen in `content/industriefachwirt/hq3/7.4-internationale-geschaeftsbeziehungen.md`: Abschnitt A **vor der Überschrift „### Kulturelle Unterschiede im internationalen Vertrieb“** (Anker; die Theorie steht damit hinter „Zahlungsabsicherung im Exportgeschäft“), B an die Karteikarten hinter K-7.4-28, C an das Quiz hinter Q-7.4-28. Bestand gezählt: 28 Karteikarten (K-7.4-01 bis -28, lückenlos) und 28 Quizfragen (Q-7.4-01 bis -28, lückenlos); `git log -S` findet keine entfernten IDs K-7.4-29 oder Q-7.4-29 im Industriefachwirt. Die neuen IDs sind K-7.4-29 bis -40 (12 Karten) und Q-7.4-29 bis -42 (14 Quizfragen). Die Fallaufgabe F-HQ3-09 und die zwei Fachgesprächsfragen stehen in `if-faelle-a.md`, die Rechtsangaben zur späteren Prüfung in `rechtsangaben-a.md`, die Bestandskorrekturen (Textersetzungen) in `ersetzungen-a.json`. Beim Einspielen setzt `einspielen-config.json` den `rechtsstand` (Dateien `hq3/7.4-internationale-geschaeftsbeziehungen.md`, `hq3/fallaufgaben.md`, `hq3/fachgespraech.md`); die Einleitung der Fallaufgaben-Datei (HQ3 „7.1–7.7“) bleibt unverändert.

**Abgleich mit dem Bestand.** Der Bestand von 7.4 behandelt Formen des Auslandsgeschäfts, vier Incoterms (EXW, FOB, CIF, DDP), in einem Absatz „Zahlungsabsicherung im Exportgeschäft“ das Dokumentenakkreditiv und „Exportkreditversicherungen (Hermesdeckungen)“, Exportkontrollrecht, Risikomanagement, Messeauftritte und die interkulturellen Modelle. Nicht vorhanden waren (per Suche in `content/industriefachwirt` geprüft): Dokumenteninkasso, Bankgarantie, Standby-Akkreditiv, Forfaitierung (Factoring steht nur in `hq1/5.2` und `hq1/5.3`), Zolltarif, Warennummer, Ursprung, Präferenz, FCA und CIP im Thema 7.4 (FCA steht nur als Beispiel in `wq3/3.3`, K-3.3-18); der Ausfuhrnachweis steht nur in einem Halbsatz in `wq3/3.4` (Abschnitt „Steuern im Exportgeschäft“). Die Ergänzung wiederholt weder das UN-Kaufrecht (Thema 3.3 „Vertragsgestaltung“ im Fachgebiet Recht und Steuern) noch die Einfuhrumsatzsteuer und den Zollwert-Rechenweg (Thema 3.4 „Unternehmensrelevantes Steuerrecht“ im Fachgebiet Recht und Steuern), noch die Exportkontrolle und das Risikomanagement des Bestands. Ablauf und Kosten der Zahlungsformen stehen im ersten Abschnitt. **Bestandsmängel und ihre Korrektur** (`ersetzungen-a.json`): FL-IF-35 (Hermes als „Versicherung“: Theorie, K-7.4-08, Q-7.4-12, Fachgespräch), FL-IF-20 (FOB und CIF ohne Hinweis auf die Beschränkung auf See- und Binnenschiff: Hinweissatz in der Theorie; F-HQ3-03 nennt EXW oder FOB ohne FCA und ohne den Ausfuhrnachweis; Q-7.4-14 und -15 lassen die „Verantwortung“ bei CIF bis zum Bestimmungshafen reichen, obwohl die Gefahr an Bord übergeht: zwei Klarstellungen in den Erklärungen), FL-IF-09 (Q-7.4-10: die exportkontrollrechtliche Prüfung stand ganz am Ende; F-HQ3-03, Teilaufgabe 3: Hinweis auf den Zeitpunkt vor dem Vertragsabschluss).

**Begriffsabgrenzungen.** **Zahlungsbedingung** (wann und wie gezahlt wird) ist nicht **Incoterm-Klausel** (Kosten und Gefahr der Ware); keine regelt den Eigentumsübergang. **Dokumentenakkreditiv** (Bank sagt Zahlung bei passenden Dokumenten zu) ist nicht **Dokumenteninkasso** (Banken leiten Dokumente nur gegen Zahlung oder Akzept weiter, ohne Zusage) und nicht **Bankgarantie** oder **Standby-Akkreditiv** (nur bei ausbleibender Zahlung zu ziehen). **Exportkreditgarantie des Bundes** („Hermesdeckung“, Garantie des Bundes) ist nicht **private Warenkreditversicherung** (Versicherungsvertrag). **Forfaitierung** (einzelne, meist längerfristige Forderung, ohne Rückgriff) ist nicht **Factoring** (laufender Ankauf kurzfristiger Forderungen, Thema 5.2). **Ursprung** im Zollsinn (Land der Herstellung nach den Ursprungsregeln) ist nicht **Herkunft des Rohstoffs** und nicht **Zollwert** (Wert zur Zollberechnung). **Nichtpräferenzieller** Ursprung (Ursprungszeugnis, Statistik, Handelsschutz) ist nicht **präferenzieller** Ursprung (Zollermäßigung nach Abkommen). **Ausfuhranmeldung** (Zollverfahren) und **Ausfuhrnachweis** (Beleg für die Steuerbefreiung) hängen zusammen, sind aber zweierlei. Der Begriff **Zollwert** wird nur im Prinzip erklärt; die Berechnung steht in Thema 3.4.

**Eigenständigkeit.** Aufbau, Beispiele und Zahlen sind aus der Elektrotechnik-Industrie geschrieben (Schaltschränke aus dem Werk Ost, Elektronikbaugruppen aus dem Werk Süd, Container nach Südostasien, Sonderanfertigungen, Risikotragfähigkeit im Verhältnis zum Eigenkapital der Solvitec) und stimmen mit `wirtschaftsfachwirt/hsq4/4.4`, `handelsfachwirt/wb4/8.1` bis `8.3` nur in den Fachbegriffen überein: Statt einer Gesamtkosten-Tabelle mit Erwartungsverlust und Break-even-Wahrscheinlichkeit gibt es eine Netto-Mehrkosten-Rechnung (Gebühren gegen eingesparte Zinsen, eingeordnet über die Umsatzrentabilität) und eine Prüfung der Risikotragfähigkeit; die Zahlungsbedingungen werden über den Ablauf der bankgestützten Formen und eine nach dem Geldeingang geordnete Tabelle mit Kostenspalte dargestellt, Warennummer und Zollwert ohne Incoterm-Vergleich, die Forderungsfinanzierung als Abgrenzung zur Garantie; der Ursprungsabschnitt rechnet Wertanteil, Reserve und Zollersparnis; die Incoterm-Wahl geht vom Verkehrsträger und vom Ausfuhrnachweis aus. Der Teil verwendet die Werke Nord, Süd und Ost und die Vertriebsgesellschaft in Singapur nach der Regel für HQ3; Villingen, Zwickau und Brünn kommen nicht vor. Nicht verwendet sind die Zahlen von F-WQ3-06 (Zollwert 220.900 €, Anschaffungskosten 234.306,20 €) und von F-HQ3-08.

**Rechtsnah (R4).** Rechtsaussagen sind gewollt; Gesetze und Paragrafen stehen nur als Stützangabe, nie als alleiniger Prüfungsstoff, in Karten und Quiz stehen keine Paragrafennummern und keine Gesetzesnamen. Der Abschnitt nennt keine Paragrafen, nur Regelwerke der Internationalen Handelskammer (ERA 600, Incoterms 2020) und die Begriffe des Zoll- und Umsatzsteuerrechts. **Rechtszahlen und Regeln mit Zahlen** (Vorlagefrist 21 Tage, Mindestversicherung 110 %, Selbstbehalt, Wertgrenzen, Ursprungsregeln) stehen mit dem Zusatz „Stand Oktober 2026, vor Verwendung prüfen“ oder als gekennzeichnete Beispielwerte; Gebühren, Zinssätze, Zollsätze, Entgelte und Beträge sind frei gewählt. **Zeitkritisch** (in der Rechtsangaben-Datei so markiert): Bedingungen und Entgelte der Exportkreditgarantien, Ursprungsregeln und Nachweisformen der Abkommen, Zollsätze, Ausfuhrverfahren (elektronische Verfahren ändern sich), Fassung der Incoterms und der ICC-Regelwerke. Keine Steuersätze (nur der Regelsatz von 19 % als Annahme im Fall). Karten und Quiz duzen, Fall und Fachgespräch siezen, die Theorie spricht niemanden an. **Neue Namen:** siehe `if-faelle-a.md`.

---

# Thema 7.4

## A. Theorie-Ergänzung 7.4 (einfügen vor „### Kulturelle Unterschiede im internationalen Vertrieb“, hinter „Zahlungsabsicherung im Exportgeschäft“)

### Zahlungsbedingungen im Vergleich

Dieser und die folgenden Abschnitte sind nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen); alle Beträge der Beispiele sind frei gewählt. Die **Zahlungsbedingung** ist eine eigene Vereinbarung neben der Incoterm-Klausel: Die Klausel verteilt Kosten und Gefahr der Ware; wann gezahlt wird und wann das Eigentum übergeht, regelt sie nicht. Wer zuerst leistet, trägt das **Vorleistungsrisiko**; bei Sonderanfertigungen, etwa Schaltschränken nach Kundenspezifikation aus dem Werk Ost, ist es groß, weil die Ware nicht anderweitig zu verkaufen ist.

**Ablauf der bankgestützten Formen.** Beim **Dokumentenakkreditiv** (Regelwerk der Internationalen Handelskammer, ERA 600) beauftragt das Kundenunternehmen (Auftraggeber) seine Bank, zugunsten von Solvitec (Begünstigte) ein Akkreditiv zu eröffnen. Die eröffnende Bank leitet es über eine avisierende Bank im Land der Verkäuferseite weiter, die es auf Wunsch auch bestätigt (bestätigende Bank) und damit das Länder- und Transferrisiko übernimmt. Solvitec verlädt und legt die geforderten Dokumente (zum Beispiel Rechnung und Transportdokument) fristgerecht vor; die Bank prüft nur diese Dokumente, nicht die Ware, und zahlt. Weicht ein Dokument vom Akkreditivtext ab, etwa in Warenbezeichnung, Datum oder Unterschrift, oder ist die Vorlagefrist überschritten, darf sie ablehnen (**Dokumentenstrenge**). Beim **Dokumenteninkasso** gibt Solvitec die Dokumente der eigenen Bank, die sie an die Bank des Kundenunternehmens sendet; diese händigt sie nur gegen Zahlung oder Akzept aus. Keine Bank sagt die Zahlung zu, und der Schutz besteht nur, wenn die Dokumente die Verfügung über die Ware verschaffen, etwa ein Konnossement im Seetransport. Eine **Bankgarantie** (zum Beispiel auf erstes Anfordern: Die Bank zahlt auf bloße Anforderung, ohne den Streit um den Liefervertrag zu prüfen) oder ein **Standby-Akkreditiv** wird nur gezogen, wenn die Zahlung ausbleibt. Garantien, die Kundenunternehmen von Solvitec verlangen (Anzahlungs-, Vertragserfüllungsgarantie), belasten die Kreditlinie von Solvitec.

| Zahlungsbedingung | Geldeingang bei Solvitec | Restrisiko bei Solvitec | Kosten | Eignung |
|---|---|---|---|---|
| Vorauszahlung | vor Fertigung oder Versand | kaum | keine | kleine Aufträge, unbekannte Kundschaft |
| Anzahlung mit Restzahlung | Teil mit der Auftragsbestätigung, Rest nach der Lieferung | nur der Rest | gering | Sonderanfertigungen |
| Bestätigtes Akkreditiv | bei Vorlage passender Dokumente | Dokumentenfehler | hoch (Gebühren, Aufwand) | hohe Beträge, neue Kundschaft, unsichere Länder |
| Dokumenteninkasso | bei Aushändigung der Dokumente | Annahme wird verweigert, Ware steht im Ausland | mittel | mittlere Bonität, Dokumente mit Verfügung über die Ware |
| Zahlung gegen Rechnung | nach Ablauf des Zahlungsziels | volles Zahlungs- und Länderrisiko, Kapitalbindung | Zinskosten des Ziels | bekannte Kundschaft mit guter Bonität |
| Bankgarantie, Standby-Akkreditiv | aus der Garantie nur bei Ausbleiben der Zahlung | Aufwand beim Ziehen | mittel (Gebühr) | Sicherung eines Zahlungsziels |

**Wahl.** Drei Prüffragen führen zur Zahlungsbedingung: Wie belastbar ist die Bonität? Verträgt Solvitec den Ausfall des ganzen Auftrags (Risikotragfähigkeit, Rechenbeispiel unten)? Wie unsicher ist das Land (Politik, Devisen)? Wettbewerbsdruck und Gebühren entscheiden, ob die Kundschaft eine strengere Form akzeptiert.

### Staatliche Absicherung: Exportkreditgarantien des Bundes und private Kreditversicherung

Gegen Zahlungsausfälle im Exportgeschäft sichert der Bund mit **Exportkreditgarantien** ab, die im Alltag „Hermesdeckungen“ heißen. Sie sind **keine Versicherung im engeren Sinn, sondern Garantien des Bundes**: Der Bund trägt das Risiko, beauftragte Unternehmen bearbeiten die Anträge, und Solvitec zahlt ein Entgelt. Gedeckt werden **politische Risiken** (zum Beispiel Transfersperren des Ziellandes, Krieg) und **wirtschaftliche Risiken** (zum Beispiel Zahlungsunfähigkeit des Kundenunternehmens), aber nicht vollständig: Ein Teil des Ausfalls bleibt als **Selbstbehalt** (auch Selbstbeteiligung genannt) bei Solvitec (Beispielwert 10 %). Nicht gedeckt ist in der Regel, dass das Kundenunternehmen wegen eines Mangels oder Streits über den Liefervertrag berechtigt nicht zahlt; die Garantie sichert die Zahlung, nicht die Lieferqualität. Der Antrag ist spätestens vor Beginn des Risikos zu stellen, bei Sonderanfertigungen oft schon vor der Fertigung, und Bedingungen wie die Meldung von Zahlungsverzug sind einzuhalten (Stand Oktober 2026, vor Verwendung prüfen).

Die **private Warenkreditversicherung** ist dagegen ein Versicherungsvertrag mit einem Versicherungsunternehmen: Limit je Kundschaft, Prämie nach dem versicherten Umsatz, im Schadenfall ein Selbstbehalt. Sie deckt kurzfristige Forderungen gegen viele Kundenunternehmen im laufenden Geschäft in bonitätsstarken Ländern; die Garantie des Bundes passt eher zu großen Einzelgeschäften, langen Zielen und Märkten, in denen private Anbieter wenig Deckung geben. Beide ersetzen weder die Bonitätsprüfung noch das Akkreditiv, bei dem eine Bank das Risiko trägt.

### Forderungsverkauf und Finanzierung im Überblick

Eine Garantie schützt nur vor dem Ausfall; das Geld kommt erst mit der Zahlung. Wer sofort Liquidität braucht, verkauft die Forderung. Bei der **Forfaitierung** kauft eine Bank eine einzelne, meist mittel- bis langfristige Exportforderung (etwa aus einem Akkreditiv) ohne Rückgriff auf Solvitec und zieht einen Diskont ab; das Ausfallrisiko geht über. Beim **Exportfactoring** kauft ein Factoring-Institut laufend kurzfristige Forderungen an, mit Vorfinanzierung, Verwaltung und je nach Vertrag Ausfallschutz (zum echten Factoring Thema 5.2 „Finanzierungsarten“ im Fachgebiet Finanzwirtschaft im Industrieunternehmen). Beides kostet Gebühr oder Diskont und setzt eine Forderung ohne Einwendungen des Kundenunternehmens voraus.

### Kosten und Liquidität: Absicherung im Rechenbeispiel

*Rechenbeispiel Fristverkürzung und Gebühren (frei gewählte Beispielwerte):* Solvitec liefert Schaltschränke für 185.000,00 € in ein Drittland. Ohne Absicherung gilt ein Zahlungsziel von 60 Tagen; der Kontokorrentzins beträgt 7,5 % im Jahr (360 Tage). Zinskosten des Ziels = 185.000,00 € × 7,5 % × 60 ÷ 360 = 2.312,50 €. Beim bestätigten Akkreditiv zahlt die Bank 5 Tage nach der Verladung; Solvitec trägt Bestätigungsprovision 1,1 % (2.035,00 €), Avisierung 120,00 € und Dokumentenaufnahme 0,15 % (277,50 €), zusammen 2.432,50 €. Die Zinskosten sinken auf 185.000,00 € × 7,5 % × 5 ÷ 360 = 192,71 €, die Zinsersparnis beträgt 2.119,79 €. Die **Netto-Mehrkosten** der Absicherung sind 2.432,50 € − 2.119,79 € = 312,71 € (0,17 % des Auftragswerts). Die Ersparnis stammt aus der verkürzten Frist, nicht aus dem Akkreditiv selbst; bei einem Akkreditiv mit Zahlungsziel bliebe die Zinsbelastung. Zur Einordnung: Bei einer Umsatzrentabilität von 4 % (Größenordnung aus Thema 2.5 „Bilanz- und Kennzahlenanalyse“ im Fachgebiet Rechnungswesen) bringt ein Auftrag von 185.000,00 € 7.400,00 € Gewinn; ein Totalausfall ist erst durch 25 gleich große Aufträge ausgeglichen (185.000,00 € ÷ 7.400,00 €). Ob die Kundschaft das Akkreditiv akzeptiert, ist offen.

*Rechenbeispiel Risikotragfähigkeit (Beispielregel):* Das Eigenkapital der Solvitec beträgt 32 Mio. € (Beispielwert aus Thema 2.5). Die Beispielregel lautet: Ein einzelnes ungesichertes Auslandsrisiko darf höchstens 1,5 % des Eigenkapitals betragen, also 480.000,00 €. Ein Auftrag über 620.000,00 € überschreitet die Grenze um 140.000,00 €. Mit einer Anzahlung von 30 % (186.000,00 €) bleibt ein offener Rest von 434.000,00 €, der innerhalb der Grenze liegt; bei 20 % Anzahlung blieben 496.000,00 € und die Grenze wäre überschritten.

### Zoll im Überblick: Warennummer, Zollwert, Ursprung und Ausfuhr

Zoll zahlt bei der Einfuhr in der Regel die Importseite; bei DDP trägt ihn Solvitec. Er bestimmt den Preis beim Kundenunternehmen und damit die Wettbewerbsfähigkeit mit. Der **Zolltarif** ordnet jede Ware einer **Warennummer** zu. Die ersten sechs Stellen sind weltweit einheitlich (Harmonisiertes System), die EU führt sie auf acht Stellen weiter; aus der Nummer folgen Zollsatz und Vorschriften. Der **Zollwert** ist im Prinzip der tatsächlich gezahlte oder zu zahlende Preis, in der EU zuzüglich der Beförderungs- und Versicherungskosten bis zum Einfuhrort; andere Länder legen teils den Wert ab Verladehafen zugrunde (Zielland prüfen). Berechnung und Einfuhrumsatzsteuer: Thema 3.4 „Unternehmensrelevantes Steuerrecht“ im Fachgebiet Recht und Steuern.

**Ursprung und Präferenzen.** Der **nichtpräferenzielle Ursprung** (zum Beispiel Ursprungszeugnis der Industrie- und Handelskammer) nennt das Herstellungsland für Statistik, Handelsschutz oder Akkreditivdokumente. Der **präferenzielle Ursprung** entscheidet, ob die Ware nach einem **Präferenzabkommen** zu ermäßigtem oder entfallendem Zoll eingeführt werden darf. Dafür muss sie nach den Ursprungsregeln des Abkommens „Ursprungsware“ sein; je nach Abkommen und Ware genügt eine ausreichende Be- oder Verarbeitung, eine Änderung der Warennummer oder ein Höchstanteil an Vormaterial ohne Ursprungseigenschaft am Ab-Werk-Preis. Hinzu kommt der **Ursprungsnachweis**, je nach Abkommen eine Warenverkehrsbescheinigung oder eine Erklärung auf der Rechnung, die oberhalb von Wertgrenzen nur registrierte oder ermächtigte Ausführende abgeben dürfen (Stand Oktober 2026, vor Verwendung prüfen). Solvitec sammelt dafür Lieferantenerklärungen zum Vormaterial, rechnet den Wertanteil und bewahrt den Nachweis auf.

*Rechenbeispiel Ursprung und Zollersparnis (Beispielregel, Beispielwerte):* Nach einer Beispielregel darf das Vormaterial ohne Ursprungseigenschaft höchstens 40 % des Ab-Werk-Preises betragen. Eine Schaltschrankgruppe hat einen Ab-Werk-Preis von 84.000,00 €; Halbleiter und Kupfer aus Drittländern machen 31.500,00 € aus. Wertanteil = 31.500,00 € ÷ 84.000,00 € × 100 = 37,5 %, die Regel ist erfüllt. Bis zur Grenze von 33.600,00 € bleibt eine Reserve von 2.100,00 €; steigt der Zukaufspreis um mehr als 2.100,00 ÷ 31.500,00 ≈ 6,67 %, geht die Ursprungseigenschaft verloren. Bei einem Zollwert von 87.600,00 €, einem Regelzollsatz von 6 % und einem Präferenzsatz von 0 % spart die Importseite 87.600,00 € × 6 % = 5.256,00 € Zoll.

**Ausfuhr.** Bei der Ausfuhr in ein Drittland wird die Ware elektronisch zur Ausfuhr angemeldet (Warennummer, Wert, ausführendes Unternehmen, Empfängerunternehmen); der Zoll gibt sie frei, und beim Verlassen des EU-Gebiets bestätigt der Zoll den Ausgang (**Ausgangsvermerk**). Dieser Vermerk dient als **Ausfuhrnachweis** für die Umsatzsteuerbefreiung der Ausfuhrlieferung (Thema 3.4, Abschnitt „Steuern im Exportgeschäft“); fehlt der Nachweis, kann die Befreiung entfallen. Die exportkontrollrechtliche Prüfung (Abschnitt „Exportkontrollrecht“ weiter unten in diesem Thema) gehört vor den Vertragsabschluss, gegebenenfalls mit Genehmigungsvorbehalt im Vertrag, weil Genehmigungspflicht, Embargo und Sanktionslisten das Geschäft insgesamt undurchführbar machen können.

### Incoterms 2020 richtig wählen: FCA und CIP für Containerware

FOB und CIF (ebenso FAS und CFR) sind nach den Incoterms 2020 nur für den Transport per See- und Binnenschiff vorgesehen: Der Gefahrübergang „an Bord“ passt nur, wenn die Ware tatsächlich an Bord übergeben wird. Container gehen aber meist schon im Werk oder am Terminal an einen Frachtführer, lange bevor sie an Bord sind; die Gefahr bliebe bei Solvitec, obwohl sie die Ware nicht mehr in der Hand hat. Für Containerware, Transporte mit mehreren Verkehrsträgern (Lkw, Bahn, Schiff nacheinander) und Luftfracht sehen die Incoterms 2020 deshalb **FCA, CPT und CIP** vor. Bei CIF reichen übrigens die Kosten (Fracht, Versicherung) bis zum Bestimmungshafen, die Gefahr geht aber schon an Bord über.

**FCA (Free Carrier), benannter Ort:** Solvitec übergibt die ausfuhrfrei gemachte Ware an den von der Käuferseite benannten Frachtführer; am Werk Ost als benanntem Ort lädt sie die Ware auf dessen Fahrzeug. Mit der Übergabe gehen Gefahr und die Kosten des weiteren Transports über. **CIP (Carriage and Insurance Paid To), benannter Bestimmungsort:** Solvitec schließt den Beförderungsvertrag bis zum Bestimmungsort und eine Transportversicherung ab (mindestens 110 % des Vertragspreises, im Umfang der Institute Cargo Clauses (A); Stand Oktober 2026, vor Verwendung prüfen) und trägt diese Kosten. Die **Gefahr** wechselt dagegen bereits, sobald der erste Frachtführer die Ware übernommen hat: Kosten und Gefahr fallen auseinander, die Käuferseite trägt die Gefahr und ist durch die Versicherung von Solvitec geschützt. Verlangt ein Akkreditiv ein Bordkonnossement, ist das bei FCA vorab zu klären; die Incoterms 2020 erlauben die Vereinbarung, dass die Käuferseite ihren Frachtführer anweist, es auszustellen.

**EXW und der Ausfuhrnachweis.** Bei EXW stellt Solvitec die Ware im Werk bereit; Verladung, Ausfuhrabfertigung und Transport liegen bei der Käuferseite. Die Umsatzsteuerbefreiung der Ausfuhrlieferung hängt am Ausfuhrnachweis, den bei EXW die Käuferseite oder ihre Spedition beschaffen muss. Außerdem muss das ausführende Unternehmen im Zollsinn (der Ausführer) in der Regel im Zollgebiet der Union ansässig sein, sodass ein Kaufunternehmen aus einem Drittland die Ausfuhr oft nicht selbst anmelden kann. Bleibt der Nachweis aus, kann Solvitec die Steuerbefreiung verlieren. Deshalb ist FCA mit Ausfuhrabfertigung durch Solvitec oder ihre Spedition meist die bessere Wahl. *Beispiel Container nach Südostasien:* FCA Werk Ost oder CIP Zielhafen, nicht FOB oder CIF; die Klausel beeinflusst, welche Dokumente ein Akkreditiv verlangen kann.

## B. Karteikarten 7.4 (anhängen)

#### K-7.4-29
**Frage:** Wie läuft ein bestätigtes Dokumentenakkreditiv ab, und wer ist beteiligt?
**Antwort:** Das Kundenunternehmen beauftragt seine Bank (eröffnende Bank), ein Akkreditiv zugunsten von Solvitec zu eröffnen; eine Bank im Land der Verkäuferseite avisiert und bestätigt es. Solvitec verlädt, legt die Dokumente fristgerecht vor, die Bank prüft sie und zahlt.
`tags: zahlungsbedingungen, akkreditiv` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-7.4-30
**Frage:** Warum ist die Dokumentenstrenge beim Akkreditiv ein Risiko für die exportierende Seite?
**Antwort:** Die Bank prüft nur Dokumente. Eine abweichende Warenbezeichnung, ein falsches Datum, eine fehlende Unterschrift oder eine überschrittene Vorlagefrist erlauben ihr, die Zahlung zu verweigern, auch bei einwandfreier Ware.
`tags: zahlungsbedingungen, akkreditiv` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-7.4-31
**Frage:** Wann schützt das Dokumenteninkasso Solvitec überhaupt?
**Antwort:** Nur wenn die Dokumente die Verfügung über die Ware verschaffen (etwa ein Konnossement im Seetransport) und die Bank sie nur gegen Zahlung oder Akzept aushändigt. Eine Zahlungszusage einer Bank gibt es nicht; lehnt die Kundschaft ab, steht die Ware im Ausland.
`tags: zahlungsbedingungen, inkasso` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-7.4-32
**Frage:** Wann wird eine Bankgarantie auf erstes Anfordern oder ein Standby-Akkreditiv gezahlt, und wie unterscheidet sich das vom Dokumentenakkreditiv?
**Antwort:** Beide werden nur gezogen, wenn die vereinbarte Zahlung ausbleibt; die Bank zahlt auf Anforderung, ohne den Streit um den Liefervertrag zu prüfen. Beim Dokumentenakkreditiv ist die Zahlung der Bank der normale Weg.
`tags: zahlungsbedingungen, garantie` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-7.4-33
**Frage:** Wie begrenzt Solvitec ungesicherte Auslandsrisiken, und was folgt bei einem zu großen Auftrag?
**Antwort:** Mit einer Grenze je Kundenunternehmen im Verhältnis zum Eigenkapital (Beispielregel: 1,5 %). Übersteigt ein Auftrag sie, wird der Überschuss durch Anzahlung, Akkreditiv oder Garantie abgesichert oder der Auftrag abgelehnt.
`tags: zahlungsbedingungen, risiko` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-7.4-34
**Frage:** Warum sind Hermesdeckungen keine Versicherung im engeren Sinn, und was bleibt bei Solvitec?
**Antwort:** Es sind Garantien des Bundes: Der Bund trägt das Risiko, Solvitec zahlt ein Entgelt. Gedeckt sind politische und wirtschaftliche Risiken, aber nicht vollständig (Selbstbehalt bei Solvitec), und bei berechtigter Zahlungsverweigerung wegen eines Mangels in der Regel nicht.
`tags: zahlungsabsicherung, hermes` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-7.4-35
**Frage:** Wann passt die private Warenkreditversicherung, wann die Garantie des Bundes?
**Antwort:** Die private Versicherung deckt kurzfristige Forderungen vieler Kundenunternehmen bis zu einem Limit je Kundschaft (Prämie nach Umsatz). Die Garantie des Bundes passt eher zu einzelnen großen Geschäften, langen Zahlungszielen und riskanten Märkten.
`tags: zahlungsabsicherung, kreditversicherung` · `schwierigkeit: mittel` · `bloom: analysieren`

#### K-7.4-36
**Frage:** Worin unterscheidet sich die Forfaitierung einer Exportforderung von einer Exportkreditgarantie?
**Antwort:** Bei der Forfaitierung kauft eine Bank die Forderung ohne Rückgriff gegen Diskont: Das Geld fließt sofort, das Ausfallrisiko geht über. Die Garantie schützt nur vor dem Ausfall; die Forderung bleibt bei Solvitec, das Geld kommt erst mit der Zahlung.
`tags: finanzierung, forfaitierung` · `schwierigkeit: mittel` · `bloom: analysieren`

#### K-7.4-37
**Frage:** Was leistet die Warennummer, und woher stammen ihre Stellen?
**Antwort:** Sie ordnet die Ware im Zolltarif ein und bestimmt Zollsatz und Vorschriften. Die ersten sechs Stellen sind weltweit einheitlich (Harmonisiertes System), die EU führt sie auf acht Stellen weiter.
`tags: zoll, warennummer` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-7.4-38
**Frage:** Wann bringt ein Präferenzabkommen eine Zollermäßigung, und was muss Solvitec dafür tun?
**Antwort:** Nur für Waren mit Ursprungseigenschaft nach den Regeln des Abkommens (zum Beispiel Höchstanteil an Vormaterial ohne Ursprung) und mit Ursprungsnachweis. Solvitec sammelt Lieferantenerklärungen, rechnet den Wertanteil und bewahrt den Nachweis auf.
`tags: zoll, ursprung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-7.4-39
**Frage:** Wie hängen Ausfuhranmeldung, Ausfuhrnachweis und Umsatzsteuer zusammen, und warum ist EXW riskant?
**Antwort:** Nach der Ausfuhranmeldung bestätigt der Zoll den Ausgang aus der EU (Ausgangsvermerk) als Nachweis für die Steuerbefreiung. Bei EXW liegt die Ausfuhr bei der Käuferseite; fehlt der Nachweis, kann Solvitec die Steuerbefreiung verlieren.
`tags: ausfuhr, incoterms` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-7.4-40
**Frage:** Warum nimmt man für Container statt FOB und CIF besser FCA und CIP, und wo geht bei CIP die Gefahr über?
**Antwort:** FOB und CIF sind nur für See- und Binnenschiff gedacht, Container gehen aber schon vor dem Schiff an einen Frachtführer. FCA und CIP passen zu jedem Verkehrsträger. Bei CIP wechselt die Gefahr bereits mit der Übernahme durch den ersten Frachtführer, die Kosten trägt Solvitec bis zum Bestimmungsort.
`tags: incoterms, fca, cip` · `schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 7.4 (anhängen)

#### Q-7.4-29 · Multiple Choice
**Frage:** Ein Kundenunternehmen in einem Land mit knappen Devisen eröffnet für einen Auftrag über 575.000 € ein Akkreditiv bei einer örtlichen Bank. Solvitec befürchtet, dass diese Bank zwar zusagt, aber nicht ins Ausland überweisen kann (Transferrisiko). Was löst das Problem am besten?
- [ ] Solvitec vereinbart nach der Dokumentenvorlage zusätzlich ein Zahlungsziel von 90 Tagen.
- [ ] Solvitec lässt das Akkreditiv in ein Dokumenteninkasso umwandeln, damit zwei Banken die Dokumente prüfen.
- [x] Solvitec verlangt, dass eine Bank in Deutschland das Akkreditiv bestätigt.
- [ ] Solvitec verzichtet auf die Dokumentenstrenge, indem sie die Bank bittet, auch abweichende Dokumente zu akzeptieren.
**Erklärung:** Eine bestätigende Bank im Land der Verkäuferseite gibt eine eigene Zahlungszusage ab und übernimmt damit das Länder- und Transferrisiko. Ein Zahlungsziel verlängert das Risiko, beim Inkasso gibt es gar keine Zusage einer Bank, und die Prüfung der Dokumente lässt sich nicht einseitig abbedingen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-7.4-30 · Zuordnung
**Anweisung:** Ordne den Beteiligten eines Dokumentenakkreditivs ihre Rolle zu.
- Auftraggeber ↔ Das Kundenunternehmen, das seine Bank mit der Eröffnung beauftragt
- Eröffnende Bank ↔ Die Bank der Käuferseite, die das Akkreditiv ausstellt und die Zahlung zusagt
- Bestätigende Bank ↔ Eine Bank im Land der Verkäuferseite, die zusätzlich eine eigene Zahlungszusage abgibt
- Begünstigte ↔ Solvitec, die bei Vorlage passender Dokumente Zahlung erhält
**Erklärung:** Das Akkreditiv verteilt die Rollen: Das Kundenunternehmen beauftragt, seine Bank sagt zu, eine zweite Bank kann bestätigen, und Solvitec als Begünstigte erhält die Zahlung, wenn die Dokumente zum Akkreditivtext passen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-7.4-31 · Wahr/Falsch
**Aussage:** Eine Hermesdeckung ist rechtlich eine private Versicherung, die Solvitec mit einem Versicherungsunternehmen abschließt.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Hermesdeckungen sind Exportkreditgarantien des Bundes, keine Versicherung im engeren Sinn: Der Bund trägt das Risiko, beauftragte Unternehmen bearbeiten die Anträge, und ein Selbstbehalt bleibt beim exportierenden Unternehmen. Eine private Warenkreditversicherung ist dagegen ein Versicherungsvertrag.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-7.4-32 · Kurzantwort
**Frage:** Solvitec lässt ein Akkreditiv über 158.000 € bestätigen. Beispielgebühren zulasten von Solvitec: Bestätigungsprovision 1,2 % des Akkreditivbetrags, Avisierung pauschal 90 €, Dokumentenaufnahme 0,2 % des Akkreditivbetrags. Wie hoch sind die Gebühren insgesamt? Gib den Betrag in Euro an.
**Akzeptierte Antworten:** 2302; 2302 €; 2302 Euro; 2302 EUR; 2302,0; 2302,0 €; 2302,0 Euro; 2302,0 EUR; 2302,00; 2302,00 €; 2302,00 Euro; 2302,00 EUR; 2302.0; 2302.0 €; 2302.0 Euro; 2302.0 EUR; 2302.00; 2302.00 €; 2302.00 Euro; 2302.00 EUR; 2.302; 2.302 €; 2.302 Euro; 2.302 EUR; 2.302,0; 2.302,0 €; 2.302,0 Euro; 2.302,0 EUR; 2.302,00; 2.302,00 €; 2.302,00 Euro; 2.302,00 EUR
**Erklärung:** Bestätigung 158.000 € × 1,2 % = 1.896 €, Dokumentenaufnahme 158.000 € × 0,2 % = 316 €, dazu 90 € Avisierung: 1.896 € + 316 € + 90 € = 2.302 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-7.4-33 · Mehrfachauswahl
**Frage:** Solvitec liefert einen Container mit Schaltschränken aus dem Werk Ost an ein Kundenunternehmen in Südostasien; der Transport läuft nacheinander mit Lkw, Bahn und Seeschiff. Welche Aussagen zu den Incoterms 2020 treffen zu?
- [x] FCA passt: Solvitec übergibt die ausfuhrfrei gemachte Ware an den Frachtführer der Käuferseite.
- [ ] FOB ist nach den Incoterms 2020 die richtige Wahl, weil ein Seeschiff beteiligt ist.
- [x] CIP passt, wenn Solvitec Beförderung und Versicherung bis zum Zielhafen übernehmen soll.
- [ ] CIF ist nach den Incoterms 2020 für Container vorgesehen, weil es Transport und Versicherung enthält.
- [x] Keine der Klauseln regelt, wann das Kundenunternehmen zahlen muss.
**Erklärung:** FOB und CIF sind für Schiffstransporte gedacht, bei denen die Ware an Bord übergeben wird; bei Containern und Transporten mit mehreren Verkehrsträgern übernimmt ein Frachtführer die Ware früher, daher FCA oder CIP. Die Zahlungsbedingung ist eine eigene Vereinbarung.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-7.4-34 · Kurzantwort
**Frage:** Eine Exportkreditgarantie des Bundes deckt 90 % einer Forderung von 236.000 € (Selbstbehalt 10 %; Beispielwerte). Das Kundenunternehmen wird zahlungsunfähig und zahlt nichts. Wie viel Euro des Ausfalls trägt Solvitec selbst, ohne das Entgelt für die Garantie?
**Akzeptierte Antworten:** 23600; 23600 €; 23600 Euro; 23600 EUR; 23600,0; 23600,0 €; 23600,0 Euro; 23600,0 EUR; 23600,00; 23600,00 €; 23600,00 Euro; 23600,00 EUR; 23600.0; 23600.0 €; 23600.0 Euro; 23600.0 EUR; 23600.00; 23600.00 €; 23600.00 Euro; 23600.00 EUR; 23.600; 23.600 €; 23.600 Euro; 23.600 EUR; 23.600,0; 23.600,0 €; 23.600,0 Euro; 23.600,0 EUR; 23.600,00; 23.600,00 €; 23.600,00 Euro; 23.600,00 EUR
**Erklärung:** Der Bund entschädigt 90 % von 236.000 € = 212.400 €; der Selbstbehalt von 10 % beträgt 236.000 € × 10 % = 23.600 €. Das Entgelt für die Garantie käme als Kosten hinzu.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-7.4-35 · Entweder-Oder
**Frage:** Bei der Klausel CIP schließt Solvitec den Beförderungsvertrag bis zum Bestimmungsort ab und zahlt die Kosten dorthin. Wo geht die Gefahr für die Ware auf die Käuferseite über?
- [x] Mit der Übergabe an den ersten Frachtführer
- [ ] Erst bei der Ankunft am Bestimmungsort im Zielhafen
**Erklärung:** Bei CIP fallen Kosten und Gefahr auseinander: Die Kosten trägt Solvitec bis zum Bestimmungsort, die Gefahr geht schon bei der Übergabe an den ersten Frachtführer über. Gegen Schäden nach dem Gefahrübergang schützt die von Solvitec abgeschlossene Transportversicherung.
`schwierigkeit: schwer` · `bloom: verstehen`

#### Q-7.4-36 · Kurzantwort
**Frage:** Der Zollwert einer Sendung beträgt 71.200 €. Das Zielland erhebt auf diese Ware einen Regelzollsatz von 7,5 %; nach einem Präferenzabkommen gilt für Ursprungsware 0 %, und der Ursprung ist nachgewiesen (Beispielwerte). Wie viel Euro Zoll spart die Importseite? Gib den Betrag in Euro an.
**Akzeptierte Antworten:** 5340; 5340 €; 5340 Euro; 5340 EUR; 5340,0; 5340,0 €; 5340,0 Euro; 5340,0 EUR; 5340,00; 5340,00 €; 5340,00 Euro; 5340,00 EUR; 5340.0; 5340.0 €; 5340.0 Euro; 5340.0 EUR; 5340.00; 5340.00 €; 5340.00 Euro; 5340.00 EUR; 5.340; 5.340 €; 5.340 Euro; 5.340 EUR; 5.340,0; 5.340,0 €; 5.340,0 Euro; 5.340,0 EUR; 5.340,00; 5.340,00 €; 5.340,00 Euro; 5.340,00 EUR
**Erklärung:** Ohne Präferenz fielen 71.200 € × 7,5 % = 5.340 € Zoll an, mit Präferenz 0 €. Die Ersparnis beträgt 5.340 €.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-7.4-37 · Was passt nicht dazu
**Frage:** Solvitec liefert FCA Werk Ost. Welche Aufgabe gehört nicht zu den Pflichten von Solvitec und passt deshalb nicht zu den übrigen?
- [ ] Die Ware für die Ausfuhr abfertigen
- [ ] Die Ware im Werk auf das Fahrzeug des Frachtführers der Käuferseite laden
- [ ] Den Ausfuhrnachweis für die Steuerbefreiung führen
- [x] Den Seetransport zum Zielhafen bezahlen
**Erklärung:** Bei FCA endet die Pflicht von Solvitec mit der Übergabe an den Frachtführer der Käuferseite; den Seetransport trägt die Käuferseite (bei CIP wäre es Solvitec). Ausfuhrabfertigung und Ausfuhrnachweis bleiben bei Solvitec.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-7.4-38 · Sortieren
**Anweisung:** Bringe die Schritte einer Ausfuhr in ein Drittland in die richtige Reihenfolge.
1. Ausfuhranmeldung mit Warennummer, Wert und Empfänger elektronisch abgeben
2. Der Zoll gibt die Ware zur Ausfuhr frei
3. Die Ware verlässt das EU-Gebiet, und der Zoll bestätigt den Ausgang (Ausgangsvermerk)
4. Der Ausgangsvermerk wird als Ausfuhrnachweis für die Steuerbefreiung aufbewahrt
**Erklärung:** Ohne Anmeldung gibt es keine Freigabe; der Ausgang wird erst bestätigt, wenn die Ware das EU-Gebiet verlässt. Erst dieser Beleg dient als Ausfuhrnachweis für die Umsatzsteuerbefreiung.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-7.4-39 · Kurzantwort
**Frage:** Auf wie viel Prozent des Vertragspreises ist die Transportversicherung bei der Klausel CIP nach den Incoterms 2020 mindestens abzuschließen (Stand Oktober 2026, vor Verwendung prüfen)? Gib die Zahl in Prozent an.
**Akzeptierte Antworten:** 110; +110; 110 %; +110 %; 110%; +110%; 110 Prozent; +110 Prozent; 110,0; +110,0; 110,0 %; +110,0 %; 110,0%; +110,0%; 110,0 Prozent; +110,0 Prozent; 110,00; +110,00; 110,00 %; +110,00 %; 110,00%; +110,00%; 110,00 Prozent; +110,00 Prozent; 110.0; +110.0; 110.0 %; +110.0 %; 110.0%; +110.0%; 110.0 Prozent; +110.0 Prozent; 110.00; +110.00; 110.00 %; +110.00 %; 110.00%; +110.00%; 110.00 Prozent; +110.00 Prozent
**Erklärung:** Die Incoterms 2020 verlangen bei CIP eine Versicherung über mindestens 110 % des Vertragspreises; das Kostenrisiko der Ware ist damit einschließlich eines Aufschlags gedeckt.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-7.4-40 · Lückentext (Wortauswahl)
**Text:** Eine Zollermäßigung nach einem Präferenzabkommen erhält die Importseite nur für Waren mit ___Ursprungseigenschaft___ und gegen einen ___Ursprungsnachweis___.
**Zusätzliche Begriffe:** Zollwert; Warennummer; Bordkonnossement
**Erklärung:** Die Ware muss nach den Ursprungsregeln des Abkommens als Ursprungsware gelten, und der Zollvorteil muss durch den Nachweis belegt werden. Zollwert und Warennummer bestimmen die Höhe des Regelzolls, das Bordkonnossement ist ein Transportdokument.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-7.4-41 · Multiple Choice
**Frage:** Ein Kundenunternehmen aus einem Drittland holt Ersatzteile im Werk Süd (Ersatzteillager) mit seiner eigenen Spedition ab (EXW). Später fragt die Steuerprüfung nach dem Ausfuhrnachweis, den die Spedition nicht geliefert hat. Was gilt?
- [ ] Die Steuerbefreiung bleibt, weil bei EXW die Gefahr schon im Werk übergegangen ist und der Nachweis deshalb Sache der Käuferseite ist.
- [ ] Die Steuerbefreiung bleibt, wenn das Kundenunternehmen später mündlich bestätigt, dass die Ware ausgeführt wurde.
- [x] Solvitec kann die Steuerbefreiung verlieren, weil sie den Ausfuhrnachweis führen muss, auch wenn die Käuferseite ausführt.
- [ ] Solvitec schuldet keine Umsatzsteuer, weil Lieferungen in Drittländer immer steuerfrei sind.
**Erklärung:** Die Befreiung der Ausfuhrlieferung hängt am Nachweis, und den muss der liefernde Betrieb führen. Bei EXW liegt die Beschaffung des Belegs in der Hand der Käuferseite; deshalb ist FCA mit Ausfuhrabfertigung durch Solvitec oft die sicherere Wahl.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-7.4-42 · Kurzantwort
**Frage:** Nach einer Beispielregel darf das Vormaterial ohne Ursprungseigenschaft höchstens 45 % des Ab-Werk-Preises betragen. Ein Schaltschrank hat einen Ab-Werk-Preis von 72.800 €; Halbleiter und Kupfer aus Drittländern machen 25.480 € aus. Um wie viel Euro dürfte das Vormaterial bei unverändertem Ab-Werk-Preis im Wert noch steigen, ohne dass die Regel verletzt wird? Gib den Betrag in Euro an.
**Akzeptierte Antworten:** 7280; 7280 €; 7280 Euro; 7280 EUR; 7280,0; 7280,0 €; 7280,0 Euro; 7280,0 EUR; 7280,00; 7280,00 €; 7280,00 Euro; 7280,00 EUR; 7280.0; 7280.0 €; 7280.0 Euro; 7280.0 EUR; 7280.00; 7280.00 €; 7280.00 Euro; 7280.00 EUR; 7.280; 7.280 €; 7.280 Euro; 7.280 EUR; 7.280,0; 7.280,0 €; 7.280,0 Euro; 7.280,0 EUR; 7.280,00; 7.280,00 €; 7.280,00 Euro; 7.280,00 EUR
**Erklärung:** Die Grenze liegt bei 72.800 € × 45 % = 32.760 €. Das Vormaterial beträgt 25.480 € (35 % des Ab-Werk-Preises); die Reserve ist 32.760 € − 25.480 € = 7.280 €.
`schwierigkeit: schwer` · `bloom: anwenden`
