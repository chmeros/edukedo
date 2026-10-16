# Entwurf Handelsfachwirt, Anbahnung eines Importgeschäfts, Importkalkulation und Importperspektive: Ergänzung im Thema 8.1

Stand 16.10.2026, **Entwurf (R3), nicht eingespielt.** Teil C des Auftrags P-X (Erhebung HF-19; Auswertung `docs/entwuerfe/handelsfachwirt-rest-auswertung.md`). Einzufügen in `content/handelsfachwirt/wb4/8.1-import-export.md`: Abschnitt A am Ende von „## Theorie“ hinter „Außenhandelsdokumente“, B an die Karteikarten hinter K-8.1-18, C an das Quiz hinter Q-8.1-13. Bestand gezählt: 18 Karteikarten (K-8.1-01 bis -18, lückenlos) und 13 Quizfragen (Q-8.1-01 bis -13, lückenlos); `git log -S` findet in `content/handelsfachwirt` keine früher vergebenen und wieder entfernten IDs K-8.1-19 ff., Q-8.1-14 ff. oder F-WB4-04. Die neuen IDs sind K-8.1-19 bis -28 und Q-8.1-14 bis -25. Beim Einspielen den `rechtsstand` im Frontmatter auf den neuen Stand setzen (die Datei gehört nur zu diesem Teil; `einspielen-config.json` setzt den `rechtsstand` genau einmal). Fallaufgabe und Fachgesprächsfragen stehen in `hf-faelle-c.md` (F-WB4-04, Fachgespräch `### 8.1 Import und Export`).

**Abgleich mit dem Bestand.** Der Bestand von 8.1 behandelt Grundbegriffe (Import, Export, Reexport, Transithandel, komparativer Kostenvorteil), die Markteintrittsformen (aus der Sicht des Exports: Direktexport, indirekter Export, Joint Venture, Lizenz, Auslandsniederlassung), die Incoterms EXW, FOB, CIF und DAP sowie die Außenhandelsdokumente. Die **Anbahnung** eines Importgeschäfts (Suche, Muster, Erstaudit, Probebestellung, Vertrag) fehlt dort; F-WB4-01 setzt die Wahl zwischen Direktimport und Import-Handelsmittler und das Wissen über Dokumente voraus, ohne dass die Theorie sie vorbereitet. Das wird hier ergänzt und nicht wiederholt: Die Methoden der **Beschaffungsmarktforschung**, Anfrage und Angebot (auch mit Incoterm, Währung, Gültigkeitsdauer und Nachweisen), die **Bezugskalkulation einschließlich der Importposten** (Seefracht, Versicherung, Zoll auf den Zollwert, Hafen- und Inlandstransport, Kontrollkosten, Planungskurs, Einfuhrumsatzsteuer nicht im Bezugspreis, einmalige Kosten wie ein Erstaudit getrennt) und die Angebotsbewertung samt Rechenbeispiel (FOB-Angebot aus Vietnam) beschreibt Thema 7.1 „Einkaufsstrategien“ im Fachgebiet Einkauf (Wahlpflicht); das **Lieferantenaudit** Thema 7.2 „Lieferantenbewertung und Verhandlung“, Sozialaudit, Verhaltenskodex und Lieferkettenpflichten Thema 7.3 „Compliance im Einkauf“, beide im Fachgebiet Einkauf (Wahlpflicht). Die Ergänzung verweist darauf und beschränkt sich auf das, was beim **Import** hinzukommt: Auslandsfaktoren bei der Marktwahl, importspezifische Wirkung der Angaben in Anfrage und Angebot, Warenmuster, Erstaudit und Probebestellung als Prüfung der ganzen Lieferkette, die **Rechnung je Sendung** (Umrechnung des Rechnungsbetrags zum Kurs, Zollabwicklung, Wirkung einer Kursänderung) und die Gegenüberstellung von Import- und Exportperspektive. **Audit-Reihenfolge:** Wie im Bestand (Thema 7.2, Thema 7.3, F-WB3-04) liegt das Erstaudit vor der Aufnahme der Geschäftsbeziehung und vor dem ersten Auftrag, also auch vor der Probebestellung. **Begriffe:** Das Wort „Muster“ steht im Bestand bei der Lizenzvergabe (Marken, Muster oder Verfahren) und, als Warenmuster, in Thema 7.1 (Musterbestellung, Muster prüfen und freigeben beim Eigenmarken-Weg); hier ist das **Warenmuster** (Probestück) gemeint, abgegrenzt zur Lizenz und mit Verweis auf 7.1. „Warenwert“ bedeutet in 8.1 den Rechnungsbetrag in Euro **ohne** Fracht (in 8.2 heißt der Wert mit Fracht „CIF-Wert“). **Einfuhrumsatzsteuer:** Die Rechnung lässt sie **außer Ansatz**, weil sie als Vorsteuer abziehbar ist (so Thema 8.2 und die Ergänzungen des Pakets P-W); F-WB3-03 und Q-7.3-04 im Bestand behandeln sie dagegen als Kostenfaktor (an den Auftraggeber gemeldet, Bestand unverändert); die Karte K-8.1-26 stellt den Bezug zu Thema 7.3 her. Alle Zahlen sind frei gewählte Beispielwerte, unabhängig von den Zahlen des Bestands und der Nachbarteile; Zollsätze sind vereinfachte Beispielsätze ohne Aussage zum tatsächlichen Zolltarif.

**Rechtsnah, nur als Hinweis:** Rechtswahl, Gerichtsstand, Mängelrechte, Zoll- und Einfuhrvorschriften, Produktsicherheit und Kennzeichnung; Hinweis „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“, keine Paragrafen, Gesetzes- oder Behördennamen. Karten und Quiz duzen, die Theorie spricht niemanden an.

---

# Thema 8.1

## A. Theorie-Ergänzung 8.1 (einfügen am Ende von „## Theorie“, hinter „Außenhandelsdokumente“)

### Anbahnung eines Importgeschäfts: Ablauf und Beschaffungsmarkt

Bevor die **Loreno Mode & Wohnen GmbH** Ware aus dem Ausland bestellt, steht die **Anbahnung**: die Phase, in der ein geeignetes Lieferunternehmen gefunden, geprüft und vertraglich gebunden wird. Sie ist wichtiger als im Inlandseinkauf, denn die Entfernung ist groß, Rechts- und Währungsraum sind andere, der Transport dauert Wochen, und Fehler lassen sich später kaum noch beheben: Ist ein Container mit Ware verschifft, die nicht der Spezifikation entspricht, hilft kein kurzfristiger Austausch. Ein üblicher Ablauf hat acht Stufen:

1. **Bedarf und Spezifikation** festlegen (Artikel, Material, Qualität, Menge, Termin).
2. **Beschaffungsmarkt erkunden** und Länder oder Regionen eingrenzen.
3. **Lieferunternehmen suchen** und vorauswählen.
4. **Anfrage und Angebot**: Angebote einholen und vergleichen.
5. **Warenmuster prüfen** und freigeben.
6. **Erstaudit** der Qualität und der Sozialstandards, bevor die Geschäftsbeziehung beginnt.
7. **Probebestellung** als erster Auftrag.
8. **Vertrag und Hauptbestellung.**

Die Reihenfolge ist ein Idealablauf. Bei Saisonware drängt die Zeit; dann laufen Muster und Audit teilweise parallel, aber kein Auftrag, auch nicht die Probebestellung, wird vor dem Erstaudit erteilt, und die Hauptbestellung folgt erst nach der bestandenen Probebestellung.

Wie der Beschaffungsmarkt systematisch erforscht wird, beschreibt Thema 7.1 „Einkaufsstrategien“ im Fachgebiet Einkauf (Wahlpflicht). Beim Import kommen **Auslandsfaktoren** hinzu, die bei der Wahl des Beschaffungslandes abgewogen werden:

- **Preisniveau und Fertigungskompetenz:** In welchem Land wird die Warengruppe (Webtextilien, Keramik, Holzmöbel) in der gewünschten Qualität und Menge gefertigt?
- **Kapazität und Mindestmengen:** Verlangt der Betrieb Mengen, die Loreno über die ganze Saison verkaufen kann?
- **Lieferzeit und Hafenanbindung:** Fertigungszeit plus Seefracht plus Einfuhr bestimmen, wie früh bestellt werden muss.
- **Währung und Kurs:** Wird in Euro oder in einer Fremdwährung abgerechnet? (Wechselkursrisiko, Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht).)
- **Zollsätze und Präferenzabkommen:** Der Ursprung der Ware entscheidet über den Zollsatz (Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)).
- **Politische und rechtliche Lage:** Länderrisiko und Rechtsrisiko (ebenfalls Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)).
- **Sozial- und Umweltstandards:** Anforderungen aus dem Code of Conduct für Lieferunternehmen und der Lieferkette (Thema 7.3 „Compliance im Einkauf“ im Fachgebiet Einkauf (Wahlpflicht)).

Das Ergebnis dieser Stufe ist keine Entscheidung für ein Unternehmen, sondern eine kurze Liste von Ländern oder Regionen, in denen die Suche beginnt.

### Lieferantensuche im Ausland

Für die Suche stehen mehrere Wege zur Verfügung, die sich in Kosten, Zeitaufwand und Verlässlichkeit unterscheiden:

| Weg | Kennzeichen | Stärke | Schwäche |
|---|---|---|---|
| Fachmesse (im In- oder Ausland) | Viele Lieferunternehmen zeigen Muster an einem Ort | Persönlicher Kontakt, schneller Vergleich, Muster zum Anfassen | Reisekosten, Messepreise; die Auswahl der Ausstellenden ist nicht repräsentativ |
| Handelsvertretung | Selbständige Vertretung eines ausländischen Lieferunternehmens im Inland, vermittelt Geschäfte | Ansprechperson in der eigenen Sprache und Zeitzone | Sie vertritt die Interessen des Lieferunternehmens, nicht die von Loreno; Provision steckt im Preis |
| Einkaufsagentur (Vermittler vor Ort) | Sucht, prüft und begleitet Lieferunternehmen im Beschaffungsland im Auftrag der Importseite | Kenntnis von Markt, Sprache und Betrieben; Kontrollen vor Ort | Vergütung (Provision oder Honorar); Abhängigkeit von der Agentur |
| Handelskammer oder Branchenverband | Stellt in allgemeiner Form Marktinformationen, Adressen und Kontakte bereit | Günstig, neutral, guter Einstieg für unbekannte Länder | Keine Bewertung einzelner Betriebe; Informationen allgemein |
| Importhandel | Importunternehmen kauft im eigenen Namen im Ausland und verkauft weiter | Loreno spart Aufwand und trägt weniger Auslandsrisiko | Zwischenmarge; weniger Einfluss auf Qualität und Lieferunternehmen |

Der Importhandel entspricht dem **indirekten Bezug**, die eigene Anbahnung dem **Direktimport** (Loreno schließt selbst mit dem Lieferunternehmen ab): Beim Direktimport behält Loreno Kontrolle und Marge, trägt aber den vollen Aufwand und das Risiko. Die **Vorauswahl** stützt sich auf Fertigungskompetenz, Referenzen, Kapazität, Zertifikate (Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)) und erste Preisangaben; die systematische Bewertung steht in Thema 7.2 „Lieferantenbewertung und Verhandlung“ im Fachgebiet Einkauf (Wahlpflicht).

### Anfrage, Muster, Erstaudit, Probebestellung und Vertrag

Anfrage und Angebot beschreibt Thema 7.1 „Einkaufsstrategien“ im Fachgebiet Einkauf (Wahlpflicht), auch mit Incoterm, Währung, Gültigkeitsdauer und verlangten Nachweisen. Im Import wirken diese Angaben besonders stark, weil Kurs, Seetransport und Zoll dazukommen. Die **Anfrage** nennt deshalb den gewünschten **Incoterm** mit benanntem Ort (zum Beispiel FOB Verschiffungshafen), die **Währung**, die gewünschte **Zahlungsbedingung** (Thema 8.3 „Außenhandelsfinanzierung“ im Fachgebiet Außenhandel (Wahlpflicht)), Anforderungen an die Verpackung für den Seetransport und verlangte Nachweise (Zertifikate, Ursprungsnachweis). Das **Angebot** nennt den Preis in Fremdwährung mit **Gültigkeitsdauer** (wegen des Kurses), die Mindestmenge, die Fertigungs- und Lieferzeit und die Zahlungsbedingung.

Das **Warenmuster** ist ein einzelnes Probestück, an dem Material, Verarbeitung, Maße und Farbe beurteilt werden; Muster prüfen und freigeben gehört auch zum Eigenmarken-Weg in Thema 7.1 „Einkaufsstrategien“ im Fachgebiet Einkauf (Wahlpflicht). Es ist nicht zu verwechseln mit den Marken und Mustern, die bei der Lizenzvergabe überlassen werden. Üblich sind zwei Stufen: Das **Verkaufsmuster** zeigt, was der Betrieb kann, ist aber oft von Hand sorgfältiger gefertigt als die Serie. Das **Vorserienmuster** wird nach der Spezifikation von Loreno gefertigt, geprüft und freigegeben; die Freigabe wird dokumentiert, und das freigegebene Muster dient später als Referenz für die Serienware.

Das **Audit** im Überblick: Das **Qualitätsaudit** prüft vor Ort Fertigung, Qualitätssicherung und Kapazität, das **Sozialaudit** Arbeitsbedingungen, Arbeitssicherheit und Umweltschutz. Wie im Einkauf von Loreno üblich, findet das **Erstaudit vor der Aufnahme der Geschäftsbeziehung** statt, also vor dem ersten Auftrag; es wird durch eigene Mitarbeitende, die Einkaufsagentur oder unabhängige Prüfunternehmen durchgeführt. Inhalt und Bewertung stehen in Thema 7.2 „Lieferantenbewertung und Verhandlung“ und Thema 7.3 „Compliance im Einkauf“, beide im Fachgebiet Einkauf (Wahlpflicht); die einmaligen Kosten gehören nicht in den Bezugspreis je Stück, sondern werden dem Preisvorteil gegenübergestellt.

Die **Probebestellung** ist ein erster, kleiner Auftrag in Serienfertigung und folgt deshalb auf das Erstaudit. Sie prüft nicht nur die Ware, sondern die **ganze Kette**: Entspricht die Serienware dem Vorserienmuster? Stimmen Termin, Verpackung und Kennzeichnung? Sind Rechnung, Packliste und Ursprungsnachweis vollständig und richtig? Läuft die Zollabwicklung? Reagiert das Lieferunternehmen auf Rückfragen und Reklamationen? Der Preis dafür sind ein höherer Stückpreis wegen der kleinen Menge, anteilig höhere Fracht und Zeit; bei knapper Saison kann der Test den Verkaufsstart gefährden. Die Probebestellung ersetzt kein Audit und das Audit keine Probebestellung.

Der **Vertrag** hält fest, was verhandelt wurde: Ware und Spezifikation (mit dem freigegebenen Vorserienmuster als Referenz), Menge, Preis und Währung, Incoterm mit Ort, Liefertermin, Zahlungsbedingung, Qualitäts- und Abnahmeregeln, den Code of Conduct für Lieferunternehmen. Zwei Festlegungen gehören bei Auslandsgeschäften ausdrücklich dazu: die **Rechtswahl** (welches Recht für den Vertrag gilt) und der **Gerichtsstand** (welches Gericht, gegebenenfalls welches Schiedsgericht bei Streit zuständig ist). Weil schon die Probebestellung ein Auftrag ist, werden beide bereits dafür in einfacher Form vereinbart und für die Hauptbestellung fortgeschrieben. Sie verringern das Rechtsrisiko aus Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht), beseitigen es aber nicht: Ein Anspruch muss im Ausland erst durchgesetzt werden. Gesetzliche Vorgaben zu Rechtswahl, Gerichtsstand und Mängelrechten sind hier nicht behandelt (nicht förmlich rechtsgeprüft).

### Rechnung je Sendung: vom Rechnungsbetrag zum Bezugspreis

Die Posten des Importbezugspreises (Fracht, Versicherung, Zoll, Hafen- und Inlandstransport, Kontrollkosten) und den Vergleich mehrerer Angebote nach dem Bezugspreis beschreibt Thema 7.1 „Einkaufsstrategien“ im Fachgebiet Einkauf (Wahlpflicht); die Bezugskalkulation des Inlands steht in Thema 5.3 „Preis- und Konditionenpolitik“ im Fachgebiet Vertriebssteuerung (Wahlpflicht). Hier folgt die **Rechnung je Sendung** mit Umrechnung des Rechnungsbetrags in Euro, Zollabwicklung und der Wirkung einer Kursänderung. Das Schema ergibt den **Bezugspreis** (Einstandspreis frei Zentrallager):

| Schritt | Inhalt |
|---|---|
| Rechnungsbetrag in Fremdwährung ÷ Kurs | = Warenwert in Euro (Rechnungsbetrag ohne Fracht; der Kurs nennt, wie viele Einheiten der Fremdwährung man für einen Euro erhält) |
| + Seefracht | bis zum Bestimmungshafen, soweit nicht im Preis enthalten |
| + Transportversicherung | soweit nicht im Preis enthalten |
| = Zollwert (vereinfacht) | Preis plus Fracht und Versicherung bis zur EU-Außengrenze |
| + Zoll | Zollsatz × Zollwert |
| + Zollabwicklung | Gebühr der Zollspedition für die Anmeldung |
| + Hafenumschlag und Inlandstransport | bis zum Zentrallager |
| + Qualitätskontrolle vor Verladung | Kontrolle je Sendung |
| = Bezugspreis der Sendung | ÷ Stückzahl = Bezugspreis je Stück |

Welche Posten Loreno selbst trägt, bestimmt der **Incoterm** (Grundlagen weiter oben in diesem Thema): Bei FOB zahlt Loreno Seefracht und Versicherung, bei CIF sind sie im Preis enthalten, bei DAP zusätzlich der Transport bis zum Bestimmungsort. Die **Einfuhrumsatzsteuer** bleibt außer Ansatz: Sie fällt an (Thema 7.3 „Compliance im Einkauf“ im Fachgebiet Einkauf (Wahlpflicht) nennt sie als Abgabe), fließt aber über den Vorsteuerabzug zurück; das Ergebnis bleibt unberührt, gebunden ist nur Liquidität, bis der Betrag erstattet wird. Rabatt und Skonto der Inlandskalkulation bleiben im Beispiel außer Ansatz.

*Rechenbeispiel Plaids* (Loreno Living, frei gewählte Beispielwerte, Beträge ohne Umsatzsteuer, vereinfachter Beispielzollsatz): Der Einkauf bestellt 3.200 handgewebte Baumwoll-Plaids zum Preis FOB von 8,10 USD je Stück bei einem Lieferunternehmen in Indien; der Planungskurs beträgt 1,25 USD je Euro. Rechnungsbetrag: 3.200 × 8,10 USD = 25.920 USD; Warenwert: 25.920 ÷ 1,25 = 20.736 € (6,48 € je Stück). Hinzu kommen Seefracht 1.844 € und Transportversicherung 70 €: Zollwert = 20.736 + 1.844 + 70 = 22.650 €. Zoll bei 8 %: 22.650 × 0,08 = 1.812 €. Weiter fallen an: Zollabwicklung 175 €, Hafenumschlag und Lkw bis zum Zentrallager 1.040 € und Qualitätskontrolle vor der Verladung 420 €. Bezugspreis der Sendung: 20.736 + 1.844 + 70 + 1.812 + 175 + 1.040 + 420 = 26.097 €; je Plaid 26.097 ÷ 3.200 ≈ 8,16 €. Die Kosten neben dem Warenwert betragen 5.361 €, das sind 5.361 ÷ 20.736 × 100 ≈ 25,9 % des Warenwerts. Der Rechnungspreis von 6,48 € je Stück zeigt also nur knapp vier Fünftel dessen, was die Ware im Zentrallager kostet. Einmalige Kosten wie ein Erstaudit stehen nicht im Bezugspreis.

**Währungsrisiko im Einkauf.** Die Rechnung lautet auf US-Dollar; der Euro-Betrag steht erst bei der Zahlung fest. *Beispiel* mit denselben Werten: Fällt der Kurs bis zur Zahlung von 1,25 auf 1,20 USD je Euro, kosten die 25.920 USD nicht 20.736 €, sondern 25.920 ÷ 1,20 = 21.600 €, also 864 € oder rund 4,2 % mehr. **Merkregel:** Wird in Fremdwährung gezahlt, wird der Einkauf teurer, wenn der Euro gegenüber der Fremdwährung fällt (weniger Dollar je Euro), und günstiger, wenn er steigt. Zugleich steigen Zollwert und Zoll in Euro, weil sie vom Warenwert abhängen. Das Risiko beseitigt die Rechnung nicht; Absicherung durch Kurssicherung beschreiben Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ und Thema 8.3 „Außenhandelsfinanzierung“, beide im Fachgebiet Außenhandel (Wahlpflicht). Wird in Euro abgerechnet, liegt das Kursrisiko beim Lieferunternehmen, ist aber oft im Preis berücksichtigt.

### Importperspektive und Exportperspektive

Die Markteintrittsformen dieses Themas sind aus der Sicht der Exportseite formuliert (Direktexport, indirekter Export, Joint Venture). Loreno ist überwiegend **Importeurin**; dieselbe Lieferung sieht aus der Perspektive der Importseite anders aus als aus der Perspektive der Exportseite:

| Aspekt | Importeurin (Käuferseite) | Exportseite (Verkaufsseite) |
|---|---|---|
| Zahlung | Leistet bei Vorkasse oder Anzahlung eine Vorleistung und trägt das Risiko, dass nicht oder mangelhaft geliefert wird | Liefert auf Ziel und trägt das Risiko, dass nicht gezahlt wird (Absicherung durch Exportkreditversicherung, Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)) |
| Währung | Eine Rechnung in Fremdwährung kann den Einkauf verteuern | Eine Rechnung in Fremdwährung kann den Erlös in Euro mindern |
| Ware | Prüft die Qualität aus der Ferne und reklamiert gegenüber einem Lieferunternehmen in anderem Rechtsraum | Muss die Spezifikation einhalten und Reklamationen aus dem Ausland bearbeiten |
| Transport | Trägt je nach Incoterm Fracht und Risiko ab einem Übergabepunkt | Trägt Fracht und Risiko bis zu diesem Punkt |
| Zoll und Dokumente | Meldet die Einfuhr an, zahlt Zoll und Einfuhrumsatzsteuer, prüft Dokumente | Erstellt Rechnung, Packliste und Ursprungsnachweise und kümmert sich um die Ausfuhrformalitäten |
| Kapital und Zeit | Bindet Kapital über lange Vorlaufzeit; muss früh bestellen und Sicherheitsbestand planen | Produziert vor und finanziert bis zum Zahlungseingang |

Als Importeurin übernimmt Loreno typischerweise diese **Pflichten**: die Einfuhr verzollen lassen (meist durch eine Zollspedition), Zoll und Einfuhrumsatzsteuer entrichten, Ursprungs- und Warennachweise beibringen, die gelieferte Ware bei Eingang auf Menge und Qualität prüfen und Mängel rechtzeitig anzeigen, sowie die Anforderungen an Kennzeichnung und Sicherheit der Ware im eigenen Markt beachten. Gegenüber der Kundschaft tritt Loreno als Verkäuferin auf und muss Reklamationen bearbeiten, auch wenn die Ursache beim Lieferunternehmen im Ausland liegt. Gesetzliche Vorgaben zu Einfuhr, Prüfpflichten, Kennzeichnung und Produktsicherheit sind hier nicht behandelt (nicht förmlich rechtsgeprüft).

Die **typischen Risiken** der Importseite sind das Vorleistungs- und Zahlungsrisiko, das Währungsrisiko, das Qualitäts- und Reklamationsrisiko, das Transport- und Terminrisiko (Saisonware kommt zu spät), das Länder- und Rechtsrisiko sowie das Reputationsrisiko durch schlechte Arbeitsbedingungen in der Lieferkette. Die Exportkreditversicherung schützt die Exportseite und hilft der Importeurin nicht. Die Importseite schützt sich durch Auswahl und Prüfung des Lieferunternehmens (Muster, Erstaudit, Probebestellung), durch geeignete Zahlungsbedingungen (Thema 8.3 „Außenhandelsfinanzierung“ im Fachgebiet Außenhandel (Wahlpflicht)), durch Qualitätskontrolle vor der Verladung sowie durch Transportversicherung und Kurssicherung (Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)).

## B. Karteikarten 8.1 (anhängen)

#### K-8.1-19
**Frage:** Nenne die Stufen der Anbahnung eines Importgeschäfts in der üblichen Reihenfolge.
**Antwort:** Bedarf und Spezifikation festlegen, Beschaffungsmarkt erkunden, Lieferunternehmen suchen und vorauswählen, Anfrage und Angebot, Warenmuster prüfen, Erstaudit (Qualität und Sozialstandards) vor dem ersten Auftrag, Probebestellung, Vertrag und Hauptbestellung.
`schwierigkeit: leicht` · `bloom: erinnern`

#### K-8.1-20
**Frage:** Welche Faktoren wägst du bei der Wahl eines Beschaffungslandes im Ausland ab?
**Antwort:** Preisniveau und Fertigungskompetenz, Kapazität und Mindestmengen, Lieferzeit und Hafenanbindung, Währung und Kurs, Zollsätze und Präferenzabkommen, politische und rechtliche Lage (Länder- und Rechtsrisiko) sowie Sozial- und Umweltstandards.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.1-21
**Frage:** Nenne vier Wege der Lieferantensuche im Ausland und je ein Kennzeichen.
**Antwort:** Fachmesse (viele Lieferunternehmen und ihre Muster an einem Ort), Handelsvertretung (vertritt ein ausländisches Lieferunternehmen im Inland), Einkaufsagentur (sucht und prüft Lieferunternehmen vor Ort gegen Vergütung), Handelskammer oder Branchenverband (allgemeine Marktinformationen und Kontakte).
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.1-22
**Frage:** Worin unterscheiden sich Warenmuster und Probebestellung?
**Antwort:** Das Warenmuster ist ein einzelnes Probestück, an dem Material, Verarbeitung und Maße beurteilt werden (Verkaufsmuster, Vorserienmuster). Die Probebestellung ist eine kleine Erstlieferung in Serienfertigung und prüft die ganze Kette: Qualität der Serienware, Termin, Verpackung, Dokumente und Zollabwicklung.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.1-23
**Frage:** Was prüfen Qualitäts- und Sozialaudit, und wann findet das Erstaudit statt?
**Antwort:** Das Qualitätsaudit prüft Fertigung, Qualitätssicherung und Kapazität, das Sozialaudit Arbeitsbedingungen, Arbeitssicherheit und Umweltschutz. Das Erstaudit liegt vor der Aufnahme der Geschäftsbeziehung, also vor dem ersten Auftrag und damit vor der Probebestellung. Mehr dazu in Thema 7.2 „Lieferantenbewertung und Verhandlung“ und Thema 7.3 „Compliance im Einkauf“, beide im Fachgebiet Einkauf (Wahlpflicht).
`schwierigkeit: mittel` · `bloom: erinnern`

#### K-8.1-24
**Frage:** Was legen Rechtswahl und Gerichtsstand im Liefervertrag fest, und was lösen sie nicht?
**Antwort:** Die Rechtswahl bestimmt, welches Recht für den Vertrag gilt, der Gerichtsstand, welches Gericht (oder Schiedsgericht) bei Streit zuständig ist. Sie verringern das Rechtsrisiko, aber ein Anspruch muss im Ausland weiterhin durchgesetzt werden. Gesetzliche Vorgaben sind hier nicht behandelt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.1-25
**Frage:** Wie ist die Importkalkulation aufgebaut?
**Antwort:** Rechnungsbetrag in Fremdwährung ÷ Kurs = Warenwert in Euro; plus Fracht und Versicherung = Zollwert (vereinfacht); plus Zoll, Zollabwicklung, Inlandstransport und Kontrollkosten = Bezugspreis der Sendung; geteilt durch die Stückzahl der Bezugspreis je Stück. Welche Posten Loreno trägt, bestimmt der Incoterm.
`tags: importkalkulation, rechnen` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-8.1-26
**Frage:** Warum bleibt die Einfuhrumsatzsteuer in der Rechnung je Sendung außer Ansatz?
**Antwort:** Sie fällt bei der Einfuhr an (Thema 7.3 „Compliance im Einkauf“ im Fachgebiet Einkauf (Wahlpflicht) nennt sie als Abgabe), fließt aber über den Vorsteuerabzug zurück. Das Ergebnis bleibt unberührt; gebunden ist nur Liquidität, bis der Betrag erstattet wird.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.1-27
**Frage:** Wie wirkt eine Kursänderung auf einen Einkauf in US-Dollar?
**Antwort:** Fällt der Euro (weniger Dollar je Euro), kostet dieselbe Dollar-Rechnung mehr Euro; steigt der Euro, wird sie günstiger. Beispiel: 25.920 USD kosten bei 1,25 USD je Euro 20.736 €, bei 1,20 USD je Euro 21.600 €. Absicherung: Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ und Thema 8.3 „Außenhandelsfinanzierung“, beide im Fachgebiet Außenhandel (Wahlpflicht).
`tags: wechselkurs, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-8.1-28
**Frage:** Nenne drei Unterschiede zwischen Importperspektive und Exportperspektive.
**Antwort:** Zahlung: Die Importseite leistet bei Vorkasse eine Vorleistung, die Exportseite trägt das Zahlungsausfallrisiko bei Lieferung auf Ziel. Ware: Die Importseite prüft die Qualität aus der Ferne und reklamiert im Ausland. Zoll: Die Importseite meldet die Einfuhr an und zahlt Zoll und Einfuhrumsatzsteuer; die Exportseite erstellt Rechnung, Packliste und Ursprungsnachweise.
`schwierigkeit: mittel` · `bloom: analysieren`

## C. Quiz 8.1 (anhängen)

#### Q-8.1-14 · Multiple Choice
**Frage:** Die Einkaufsleitung der Loreno Mode & Wohnen GmbH sucht Lieferunternehmen für handgewebte Plaids in einem Land, in dem sie noch keine Kontakte hat. Sie möchte mit vielen Lieferunternehmen persönlich sprechen und Muster direkt ansehen. Welcher Weg passt am besten?
- [ ] Eine Anfrage an die Handelsvertretung eines einzelnen Lieferunternehmens im Inland
- [x] Der Besuch einer Fachmesse für Heimtextilien mit vielen Ausstellenden
- [ ] Allgemeine Marktinformationen einer Handelskammer lesen
- [ ] Eine Einkaufsagentur ein einzelnes Lieferunternehmen vor Ort prüfen lassen
**Erklärung:** Auf einer Fachmesse treffen viele Lieferunternehmen an einem Ort zusammen, und Muster lassen sich vor Ort beurteilen. Die Handelsvertretung und die Einkaufsagentur betreuen jeweils nur einzelne Lieferunternehmen, die Handelskammer liefert nur allgemeine Informationen und keine Muster.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-15 · Sortieren
**Anweisung:** Bringe vier Schritte der Anbahnung eines Importgeschäfts bei der Loreno Mode & Wohnen GmbH in die richtige Reihenfolge.
1. Den Beschaffungsmarkt erkunden und die Länder eingrenzen
2. Anfrage mit Incoterm, Währung und Zahlungsbedingung an die Vorauswahl senden
3. Das Vorserienmuster prüfen und freigeben
4. Eine Probebestellung in Serienfertigung auslösen
**Erklärung:** Erst wird der Markt eingegrenzt, dann werden Angebote eingeholt. Das Muster wird vor der Probebestellung freigegeben, weil die Serienware später daran gemessen wird.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-16 · Zuordnung
**Anweisung:** Ordne jeden Weg der Lieferantensuche seinem Kennzeichen zu.
- Fachmesse ↔ Viele Lieferunternehmen zeigen ihre Muster an einem Ort, persönlicher Kontakt ist möglich
- Handelsvertretung ↔ Vertritt ein ausländisches Lieferunternehmen gegenüber Handelsunternehmen im Inland
- Einkaufsagentur vor Ort ↔ Sucht, prüft und kontrolliert Lieferunternehmen im Auftrag der Importseite gegen Vergütung
- Handelskammer ↔ Gibt allgemeine Marktinformationen und vermittelt Kontakte
**Erklärung:** Die Wege unterscheiden sich darin, wessen Interessen sie vertreten und wie tief sie einzelne Betriebe bewerten. Nur die Einkaufsagentur arbeitet im Auftrag der Importseite.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.1-17 · Kurzantwort
**Frage:** Eine Lieferung für die Loreno Mode & Wohnen GmbH wird mit 14.400 USD in Rechnung gestellt. Der Planungskurs beträgt 1,25 US-Dollar je Euro (Beispielwerte). Berechne den Warenwert in Euro.
**Akzeptierte Antworten:** 11520; 11520,0; 11520,00; 11520.0; 11520.00; 11.520; 11.520,0; 11.520,00; 11520 €; 11520 Euro; 11520 EUR; 11520,0 €; 11520,0 Euro; 11520,0 EUR; 11520,00 €; 11520,00 Euro; 11520,00 EUR; 11520.0 €; 11520.0 Euro; 11520.0 EUR; 11520.00 €; 11520.00 Euro; 11520.00 EUR; 11.520 €; 11.520 Euro; 11.520 EUR; 11.520,0 €; 11.520,0 Euro; 11.520,0 EUR; 11.520,00 €; 11.520,00 Euro; 11.520,00 EUR
**Erklärung:** Der Kurs nennt, wie viele Dollar man für einen Euro erhält; deshalb wird durch den Kurs geteilt: 14.400 ÷ 1,25 = 11.520 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-18 · Kurzantwort
**Frage:** Eine Sendung hat einen Warenwert von 11.600 €, die Seefracht beträgt 1.240 € und die Transportversicherung 60 €. Der Zollwert wird vereinfacht als Summe dieser drei Posten angesetzt, der Zollsatz beträgt 9 % (vereinfachter Beispielsatz). Berechne den Zoll in Euro.
**Akzeptierte Antworten:** 1161; 1161,0; 1161,00; 1161.0; 1161.00; 1.161; 1.161,0; 1.161,00; 1161 €; 1161 Euro; 1161 EUR; 1161,0 €; 1161,0 Euro; 1161,0 EUR; 1161,00 €; 1161,00 Euro; 1161,00 EUR; 1161.0 €; 1161.0 Euro; 1161.0 EUR; 1161.00 €; 1161.00 Euro; 1161.00 EUR; 1.161 €; 1.161 Euro; 1.161 EUR; 1.161,0 €; 1.161,0 Euro; 1.161,0 EUR; 1.161,00 €; 1.161,00 Euro; 1.161,00 EUR
**Erklärung:** Zollwert = 11.600 + 1.240 + 60 = 12.900 €; Zoll = 12.900 × 0,09 = 1.161 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-19 · Was passt nicht dazu
**Frage:** Der Einkauf der Loreno Mode & Wohnen GmbH ermittelt den Zollwert einer Sendung Vasen (vereinfacht: Preis plus Fracht und Versicherung bis zur EU-Außengrenze). Welcher Posten gehört nicht in den Zollwert?
- [ ] Rechnungsbetrag der Ware, in Euro umgerechnet
- [ ] Seefracht bis zum Bestimmungshafen, soweit nicht im Preis enthalten
- [x] Qualitätskontrolle vor der Verladung
- [ ] Transportversicherung bis zur EU-Außengrenze, soweit nicht im Preis enthalten
**Erklärung:** Der vereinfachte Zollwert besteht aus dem Preis der Ware und den Kosten für Fracht und Versicherung bis zur EU-Außengrenze. Die Qualitätskontrolle ist ein eigener Posten des Bezugspreises, gehört aber nicht zur Grundlage des Zolls.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-8.1-20 · Kurzantwort
**Frage:** Eine Sendung Vasen (1.600 Stück) verursacht diese Kosten (Beispielwerte): Warenwert 7.450 €, Seefracht und Versicherung 640 €, Zoll 570 €, Zollabwicklung 130 €, Transport vom Hafen zum Zentrallager 250 €. Die Einfuhrumsatzsteuer bleibt außer Ansatz. Berechne den Bezugspreis je Stück in Euro.
**Akzeptierte Antworten:** 5,65; 5.65; 5,65 €; 5,65 Euro; 5,65 EUR; 5.65 €; 5.65 Euro; 5.65 EUR
**Erklärung:** Bezugspreis der Sendung = 7.450 + 640 + 570 + 130 + 250 = 9.040 €; je Stück 9.040 ÷ 1.600 = 5,65 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-21 · Wahr/Falsch
**Aussage:** Die Loreno Mode & Wohnen GmbH zahlt eine Rechnung in US-Dollar. Fällt der Euro zwischen Bestellung und Zahlung gegenüber dem Dollar, wird die Rechnung in Euro gerechnet günstiger.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Fällt der Euro, erhält man für einen Euro weniger Dollar; für denselben Dollar-Betrag sind mehr Euro nötig, die Rechnung wird teurer. Günstiger würde sie, wenn der Euro stiege.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.1-22 · Entweder-Oder
**Frage:** Die Loreno Mode & Wohnen GmbH zahlt vor der Verladung 30 % des Kaufpreises an ein bisher unbekanntes Lieferunternehmen in Asien. Wer trägt das Risiko, dass das Geld verloren ist, wenn das Lieferunternehmen nach der Anzahlung nicht liefert?
- [ ] Das Lieferunternehmen als Exportseite
- [x] Loreno als Importeurin
**Erklärung:** Wer vorleistet, trägt das Vorleistungsrisiko, eine Form des Delkredererisikos (Thema 8.2 „Außenhandelsrisiken und Zollabwicklung“ im Fachgebiet Außenhandel (Wahlpflicht)). Die Exportseite hat das Geld bereits; Erstaudit, Probebestellung und andere Zahlungsbedingungen (Thema 8.3 „Außenhandelsfinanzierung“ im Fachgebiet Außenhandel (Wahlpflicht)) begrenzen das Risiko.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.1-23 · Mehrfachauswahl
**Frage:** Die Loreno Mode & Wohnen GmbH bestellt bei einem neuen Lieferunternehmen zuerst nur 600 statt später 6.000 Stück. Welche Ziele hat diese Probebestellung?
- [x] Prüfen, ob die Serienware die Qualität des freigegebenen Vorserienmusters erreicht
- [ ] Den Zollsatz für die spätere Hauptbestellung verbindlich festlegen
- [x] Testen, ob Termin, Verpackung und Dokumente stimmen
- [ ] Die Rechtswahl für den späteren Liefervertrag ersetzen
- [x] Erproben, wie Zollabwicklung und Zusammenarbeit in der Praxis laufen
**Erklärung:** Die Probebestellung testet die ganze Kette mit echter Ware. Den Zollsatz bestimmen Einreihung und Ursprung, nicht eine Probebestellung; die Rechtswahl gehört in den Vertrag.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.1-24 · Lückentext (Wortauswahl)
**Text:** Mit dem ___Gerichtsstand___ legen die Vertragsparteien eines Liefervertrags mit einem ausländischen Lieferunternehmen den Ort fest, an dem Streitigkeiten ausgetragen werden.
**Zusätzliche Begriffe:** Zollwert; Incoterm; Ursprungszeugnis
**Erklärung:** Die Rechtswahl bestimmt das anwendbare Recht, der Gerichtsstand den Ort oder das Gericht für Streitigkeiten. Der Incoterm regelt Kosten und Risiko des Transports, der Zollwert ist die Grundlage der Einfuhrabgaben, und das Ursprungszeugnis bescheinigt das Herkunftsland.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-8.1-25 · Multiple Choice
**Frage:** Die Loreno Mode & Wohnen GmbH kauft Wohnaccessoires FOB zum Verschiffungshafen im Lieferland. Welche Aufgabe liegt damit bei Loreno als Importeurin?
- [ ] Die Ware im Ausfuhrhafen an Bord des benannten Schiffs verladen
- [ ] Das Risiko bis zur Ankunft im Zentrallager dem Lieferunternehmen überlassen
- [ ] Die Zollabwicklung im Lieferland für das Lieferunternehmen übernehmen
- [x] Seefracht und Versicherung organisieren und die Einfuhr verzollen lassen
**Erklärung:** Bei FOB endet die Pflicht der Verkaufsseite mit dem Verladen an Bord; ab dort organisiert und bezahlt Loreno den Transport und trägt das Risiko. Die Einfuhr im Inland meldet Loreno meist über eine Zollspedition an.
`schwierigkeit: schwer` · `bloom: anwenden`
