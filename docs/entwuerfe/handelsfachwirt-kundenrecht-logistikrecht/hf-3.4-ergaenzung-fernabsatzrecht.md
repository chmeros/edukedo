# Entwurf Handelsfachwirt, Fernabsatzrecht im Online-Shop: Ergänzung im Thema 3.4

Stand 16.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil A des Auftrags P-Z (Erhebung HF-13, R4-Anteil; Auswertung `docs/entwuerfe/handelsfachwirt-r4-auswertung.md`). Einzufügen in `content/handelsfachwirt/hb3/3.4-visual-merchandising-e-commerce.md`: Abschnitt A am Ende von „## Theorie“ hinter „Kennzahlen lesen: Zusammenhänge, Grenzen und Datenquellen“, B an die Karteikarten hinter K-3.4-24, C an das Quiz hinter Q-3.4-22. Bestand gezählt: 24 Karteikarten (K-3.4-01 bis -24, lückenlos) und 22 Quizfragen (Q-3.4-01 bis -22, lückenlos); `git log -S` findet in `content/handelsfachwirt` keine früher vergebenen und wieder entfernten IDs K-3.4-25 ff., Q-3.4-23 ff. oder F-HB3-07. Die neuen IDs sind K-3.4-25 bis -34 und Q-3.4-23 bis -34. Fallaufgabe (F-HB3-07) und Fachgesprächsfragen stehen in `hf-faelle-a.md`. Die Rechtsaussagen sind in `rechtsangaben-a.md` für die förmliche Prüfung gesammelt. Den `rechtsstand` im Frontmatter setzt `einspielen-config.json` einmal für das ganze Paket P-Z (bisher 16.10.2026).

**Abgleich mit dem Bestand.** Das Thema 3.4 behandelt Visual Merchandising, Omnichannel, Gestaltung des Online-Shops, die Online-Kennzahlen (Besuche, Conversion Rate, Warenkorbwert, Warenkorbabbruch, Trichter, Kosten je Bestellung, CAC, WUR, ROAS), die Retourenquote mit Kosten und Gegenmaßnahmen sowie Grenzen und Datenquellen. An zwei Stellen steht dort der Satz „Gesetzliche Vorgaben zum Fernabsatz (Widerruf, Informationspflichten, Preisangaben) sind hier nicht behandelt (nicht förmlich rechtsgeprüft)“ (Ende des Abschnitts „Retouren im Modehandel“, ähnlich zum Datenschutz am Ende des letzten Abschnitts) und im Fachgespräch bei der Retourenfrage, außerdem in Thema 3.5 (Servicepolitik) der Satz zu Rückgabe, Gewährleistung und Widerruf; diese Sätze werden beim Einspielen durch die Textersetzungen in `ersetzungen-a.json` auf den neuen Abschnitt verwiesen (dort auch die Anpassung des Bestandssatzes zu „Gutschein statt Erstattung“ in 3.4 und F-HB3-06); `einspielen-config.json` fügt der Auftraggeber zusammen. Die Ergänzung beginnt mit einem Hinweissatz „nicht förmlich rechtsgeprüft“. **Neu im Kurs** (per Suche in `content/handelsfachwirt/` geprüft, keine Treffer für Widerrufsbelehrung, Wertersatz, Bestellbutton, Grundpreis, Impressum, Anbieterkennzeichnung, Beweislast, Verbrauchsgüterkauf, Sachmangel): Fernabsatzvertrag, Vertragsschluss im Shop, Bestellbutton und Bestellübersicht, vorvertragliche Informationspflichten, Preisangaben, Widerruf (Frist, Form, Folgen, Wertersatz, Ausnahmen) und die Abgrenzung zu Gewährleistung, Kulanz und Garantie. **Begriffe, die der Bestand anders belegt:** „Reklamation“ steht hier für die Mängelrüge der Kundschaft; die „Reklamationsquote“ im Servicelevel von Thema 6.1 „Logistikkette im Handel“ im Fachgebiet Handelslogistik (Wahlpflicht) ist eine Kennzahl der Logistikdienstleistung und wird in der Ergänzung nicht verwendet. „Kulanz“ ist in Thema 5.4 „Kundenzufriedenheit und Kundenbindung“ im Fachgebiet Vertriebssteuerung (Wahlpflicht) als freiwilliges Entgegenkommen erklärt; die Ergänzung nutzt dieselbe Bedeutung. Die „Retourenquote“ (nach Stück und nach Wert) und die Konvention „Umsatz ohne Umsatzsteuer“ in Thema 3.4 gelten für die Kennzahlen; die Ergänzung rechnet im Gegenzug mit **Endpreisen einschließlich Umsatzsteuer**, weil das Recht den Preis gegenüber Verbrauchenden so verlangt, und kennzeichnet das ausdrücklich. **Eigenständigkeit:** Text, Beispiele (Modehandel der Loreno Mode & Wohnen GmbH), Aufgaben und Zahlen sind eigenständig geschrieben; Fernabsatzrecht kommt in anderen Kursen des Repos nicht vor (Mängelrechte unter Kaufleuten stehen in `industriefachwirt/wq3` und `technischer-fachwirt/wq3`, dort mit anderem Zuschnitt).

**Rechtsnah, mit Stand-Zusatz.** Gesetze und Paragrafen stehen sparsam als Stützangabe in Theorie und Erklärung, nicht als alleiniger Prüfungsstoff. Rechtszahlen (14 Tage, 12 Monate, zwei Jahre, 30 Tage) tragen den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“. Keine Steuersätze. Zeitkritisch sind vor allem die Widerrufsfunktion (seit 19.06.2026), die neuen Pflichtangaben zur Mängelhaftung und zum Garantie-Label (seit 27.09.2026) und die Vorgaben zu Preisermäßigungen; der Text sagt das, und die Rechtsangaben-Datei führt die Einzelheiten als vermutet. **Zahlen:** alle frei gewählte Beispielwerte (Endpreise einschließlich Umsatzsteuer), unabhängig von den Zahlen in `hf-faelle-a.md` und in den Teilen B und C des Pakets. Karten und Quiz duzen, die Theorie spricht niemanden an.

---

# Thema 3.4

## A. Theorie-Ergänzung 3.4 (einfügen am Ende von „## Theorie“, hinter „Kennzahlen lesen: Zusammenhänge, Grenzen und Datenquellen“)

### Fernabsatzvertrag im Online-Shop: Begriff, Abgrenzung und Vertragsschluss

Die rechtlichen Passagen dieser Ergänzung sind nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen) und kein Rechtsrat. Das Verbraucherrecht ändert sich häufig; zeitkritische Stellen sind benannt. Kennzahlen, Kosten und Gegenmaßnahmen der Retouren stehen weiter oben in diesem Thema (Abschnitt „Retouren im Modehandel“); hier geht es um die rechtlichen Regeln für den Verkauf an Privatpersonen im Online-Shop. Alle Beträge, Termine und Fristbeispiele sind frei gewählte Beispielwerte; Rechtszahlen tragen den Stand. Datenschutz und Zahlungsverkehr sind eigene Rechtsgebiete und hier nicht behandelt.

**Wer geschützt ist.** Das Verbraucherrecht schützt **Verbraucher:innen**: natürliche Personen, die ein Geschäft zu Zwecken abschließen, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 Bürgerliches Gesetzbuch, BGB). Das Gegenüber ist ein **Unternehmen**, das bei Vertragsschluss in Ausübung seiner gewerblichen oder selbstständigen beruflichen Tätigkeit handelt (§ 14 BGB). Die Loreno Mode & Wohnen GmbH ist beim Verkauf an Privatpersonen ein Unternehmen im Sinne dieser Regeln. Wer dagegen für den eigenen Betrieb bestellt, etwa eine Pension, die Kissen für ihre Gästezimmer kauft, handelt als Unternehmen und hat die besonderen Verbraucherrechte nicht.

**Fernabsatzvertrag.** Ein Fernabsatzvertrag liegt vor, wenn ein Unternehmen und Verbraucher:innen für die Vertragsverhandlungen und den Vertragsschluss **ausschließlich Fernkommunikationsmittel** verwenden (Internet, E-Mail, Telefon, Brief) und das im Rahmen eines für den Fernabsatz organisierten Vertriebssystems geschieht (§ 312c BGB). Der Online-Shop der Loreno erfüllt beides. Entscheidend ist der Weg des **Vertragsschlusses**, nicht der Weg der Ware.

| Fall | Fernabsatzvertrag? | Begründung |
|---|---|---|
| Bestellung im Online-Shop, Lieferung per Paket | ja | Verhandlung und Vertragsschluss ausschließlich online |
| Verbindliche Online-Bestellung, Abholung in der Filiale (Click & Collect) | ja | Der Vertrag ist online geschlossen; die Abholung ändert daran nichts, das Widerrufsrecht besteht auch bei Rückgabe in der Filiale |
| Online reservierte Ware, Kauf an der Kasse der Filiale | nein | Der Vertrag entsteht in der Filiale; Online-Reservierung und Anprobe sind nur Vorbereitung |
| Bestellung für Lieferung nach Hause am Terminal in der Filiale, mit Beratung durch das Filialteam | in der Regel nein | Beide Seiten sind beim Vertragsschluss körperlich anwesend, also nicht ausschließlich Fernkommunikationsmittel |
| Bestellung einer Pension für ihren Betrieb im Online-Shop | nein (kein Verbrauchervertrag) | Die Besteller:in handelt als Unternehmen |

Bei einem Kauf im Ladengeschäft gibt es **kein gesetzliches Widerrufsrecht**. Rückgabe oder Umtausch dort beruhen auf einem Mangel der Ware (Abschnitt „Abgrenzung: Widerruf, Gewährleistung und Kulanz“ weiter unten) oder auf der freiwilligen Zusage des Unternehmens (Thema 3.5 „Marketingstrategie und Servicepolitik“ im Fachgebiet Handelsmarketing: Service nach dem Kauf). Das ist ein Grund dafür, dass die Rücksendequoten im Online-Shop deutlich über denen der Filialen liegen: Online gibt es ein Recht auf Rückgabe ohne Grund, im Laden nur das Entgegenkommen des Unternehmens.

**Vertragsschluss im Shop.** Die Darstellung der Artikel im Shop ist in der Regel noch kein bindendes Angebot, sondern eine Einladung an die Kundschaft, selbst ein Angebot abzugeben. Mit dem Absenden der Bestellung gibt die Kundschaft dieses **Angebot** ab; das Unternehmen **nimmt** es an, etwa durch eine Auftragsbestätigung oder durch den Versand. Die automatische **Bestelleingangsbestätigung**, die das Shop-System unmittelbar nach dem Absenden verschickt, bestätigt nach dem Gesetz nur den Zugang der Bestellung (§ 312i BGB); ob sie zugleich die Annahme ist, hängt davon ab, wie sie formuliert ist und was in den Geschäftsbedingungen des Shops steht. Wer das nicht klärt, ist unter Umständen schon gebunden, wenn ein Artikel zu einem falschen Preis ausgezeichnet war. Außerdem muss ein Shop technische Mittel bereitstellen, mit denen Eingabefehler vor dem Absenden erkannt und berichtigt werden können (zum Beispiel eine Übersichtsseite), und er muss über die einzelnen Schritte des Bestellvorgangs informieren.

**Bestellbutton und Bestellübersicht.** Bei entgeltlichen Verträgen im Online-Shop muss der Bestellvorgang so gestaltet sein, dass Verbraucher:innen **ausdrücklich bestätigen**, dass sie sich zu einer Zahlung verpflichten (§ 312j BGB, die sogenannte Button-Lösung). Die Schaltfläche muss gut lesbar und mit nichts anderem als den Wörtern „zahlungspflichtig bestellen“ oder einer entsprechend eindeutigen Formulierung beschriftet sein, zum Beispiel „kostenpflichtig bestellen“. Beschriftungen wie „Weiter“ oder „Anmelden“ genügen nicht, weil sie die Zahlungspflicht nicht erkennen lassen. Wird die Pflicht verletzt, **kommt der Vertrag nicht zustande**: Loreno könnte dann den Kaufpreis nicht verlangen. Unmittelbar vor der Abgabe der Bestellung muss das Unternehmen außerdem bestimmte Informationen **klar, verständlich und hervorgehoben** zur Verfügung stellen, vor allem die wesentlichen Eigenschaften der Ware, den Gesamtpreis einschließlich aller Preisbestandteile und die Liefer- und Versandkosten (§ 312j BGB mit den Informationspflichten, siehe nächster Abschnitt). In der Praxis ist das die **Bestellübersicht** (Zusammenfassung der Artikel mit Preis und Versandkosten) auf der letzten Seite vor dem Button. Das deckt sich mit dem, was in diesem Thema weiter oben über den Checkout steht: unklare Versandkosten sind ein häufiger Grund für Warenkorbabbrüche und zugleich ein Rechtsrisiko.

**Widerrufsfunktion.** Seit dem 19. Juni 2026 müssen Online-Shops während der Widerrufsfrist eine gut sichtbare und jederzeit erreichbare Funktion bereitstellen, mit der Verbraucher:innen den Widerruf online erklären können; sie ist mit „Vertrag widerrufen“ oder einer gleichwertigen eindeutigen Formulierung beschriftet (§ 356a BGB, Umsetzung der Richtlinie (EU) 2023/2673). Nach der Eingabe von Name, Vertragsbezeichnung und einem Kanal für die Bestätigung folgt eine zweite Schaltfläche „Widerruf bestätigen“ oder gleichwertig; das Unternehmen bestätigt den Eingang des Widerrufs unverzüglich auf einem dauerhaften Datenträger, zum Beispiel per E-Mail, mit Inhalt sowie Datum und Uhrzeit des Eingangs. **Zeitkritisch:** Stand Oktober 2026, vor Verwendung prüfen; Umsetzungsstand, Wortlaut und Einzelheiten sind nicht förmlich rechtsgeprüft. Ein Shop ohne diese Funktion riskiert Abmahnungen.

### Vorvertragliche Informationspflichten und Anbieterkennzeichnung

Bevor Verbraucher:innen durch ihre Bestellung gebunden sind, muss das Unternehmen sie **klar und verständlich**, angepasst an das verwendete Kommunikationsmittel, informieren (§ 312d BGB mit Art. 246a § 1 des Einführungsgesetzes zum BGB, EGBGB). Für den Online-Shop der Loreno gehören unter anderem dazu:

| Information | Inhalt | Beispiel Loreno |
|---|---|---|
| Wesentliche Eigenschaften der Ware | alles, was für die Kaufentscheidung wichtig ist | Material und Zusammensetzung, Größe, Farbe, Pflegehinweise, Maße |
| Identität des Unternehmens | Name, Anschrift, Kontaktmöglichkeiten | Firma, Sitz, E-Mail-Adresse und Telefonnummer |
| Gesamtpreis | Preis einschließlich Umsatzsteuer und aller sonstigen Preisbestandteile; zusätzliche Liefer- und Versandkosten oder der Hinweis, dass solche anfallen können | Endpreis je Artikel, Versandkosten nach Versandart, Mindestbestellwert für den kostenfreien Versand |
| Zahlungs-, Liefer- und Leistungsbedingungen | Zahlungsarten, Liefertermin oder Lieferzeit | Zahlungsarten im Checkout, voraussichtliche Lieferzeit |
| Widerrufsrecht | Bestehen, Frist, Verfahren, Ausnahmen; wer die Kosten der Rücksendung trägt | Widerrufsbelehrung mit Muster-Widerrufsformular |
| Gesetzliches Mängelhaftungsrecht | Hinweis, dass es besteht; seit 27. September 2026 in hervorgehobener, einheitlich vorgegebener Form auf der Produktseite (zeitkritisch, Stand Oktober 2026, vor Verwendung prüfen) | Hinweis auf der Produktseite zur gesetzlichen Mängelhaftung |
| Garantien und Kundendienst | soweit angeboten; bei bestimmten kostenlosen Herstellergarantien kommt nach neuem Recht ein einheitliches Garantie-Label hinzu (zeitkritisch, Voraussetzungen vor Verwendung prüfen) | freiwillige Zusagen der Lieferbetriebe oder von Loreno |

Für die **Widerrufsbelehrung** stellt das Gesetz ein Muster und ein Muster-Widerrufsformular bereit. Wer das jeweils aktuelle gesetzliche Muster ordnungsgemäß verwendet, genügt der Informationspflicht; veraltete Fassungen und eigene Abweichungen sind riskant. Die Belehrung muss **vor** dem Vertragsschluss zur Verfügung stehen und auf einem dauerhaften Datenträger (zum Beispiel in der Bestätigungs-E-Mail) bestätigt werden. Fehlt die Belehrung oder ist sie fehlerhaft, beginnt die Widerrufsfrist nicht zu laufen (Abschnitt „Das Widerrufsrecht“ weiter unten). Die Pflichten betreffen auch die Texte der **Produktseiten**: Was dort steht, ist die Grundlage der Beschaffenheit, die die Kundschaft erwarten darf.

Hinzu kommt die **Anbieterkennzeichnung** (Impressum): Wer geschäftsmäßig einen Online-Shop betreibt, muss leicht erkennbar, unmittelbar erreichbar und ständig verfügbar den Namen und die Anschrift angeben, bei Gesellschaften die Rechtsform, die vertretungsberechtigten Personen, eine Möglichkeit zur schnellen elektronischen Kontaktaufnahme sowie Registergericht und Registernummer und gegebenenfalls die Umsatzsteuer-Identifikationsnummer (§ 5 Digitale-Dienste-Gesetz, DDG; das Gesetz hat das frühere Telemediengesetz ersetzt). Für die GmbH heißt das: Firma mit Rechtsformzusatz, Sitz, Geschäftsführung, Handelsregister und Registernummer (Handelsregister und Firma: Thema 1.7 „Unternehmensformen und Gründung“ im Fachgebiet Unternehmensführung und -steuerung). Verstöße gegen Informations- und Preisangabepflichten können von Wettbewerbsunternehmen und Verbänden abgemahnt werden (Gesetz gegen den unlauteren Wettbewerb, UWG; Einzelheiten sind nicht Teil dieses Themas).

### Preisangaben im Online-Shop

Die **Preisangabenverordnung (PAngV)** verlangt, dass Unternehmen gegenüber Verbraucher:innen den **Gesamtpreis** angeben: den Preis, der einschließlich Umsatzsteuer und aller sonstigen Preisbestandteile zu zahlen ist (§ 3 PAngV). Im Online-Shop steht deshalb auf der Produktseite der **Endpreis**; ein Preis „zuzüglich Umsatzsteuer“ ist gegenüber Privatpersonen nicht zulässig. Das ist ein Unterschied zu den Kennzahlen dieses Themas, die ohne Umsatzsteuer rechnen: Der Bestellumsatz in der Auswertung ist netto, der Preis auf der Produktseite und der Erstattungsbetrag im Widerrufsfall sind brutto. Die Rechenbeispiele dieser Ergänzung rechnen mit **Endpreisen**; ein Steuersatz kommt nicht vor.

**Versandkosten.** Anfallende Liefer- und Versandkosten sind zusätzlich zum Preis der Ware anzugeben oder, wenn sie vorab nicht berechnet werden können, ist darauf hinzuweisen, dass sie anfallen können. Spätestens in der Bestellübersicht müssen sie als Betrag erscheinen. Wirbt der Shop mit „kostenloser Versand ab 100,00 €“, muss die Bedingung (Mindestbestellwert, Ausnahmen) klar erkennbar sein.

**Grundpreis.** Werden Waren **nach Gewicht, Volumen, Länge oder Fläche** angeboten, ist neben dem Gesamtpreis der **Grundpreis** anzugeben: der Preis je Mengeneinheit, in der Regel je Kilogramm, Liter oder Meter (§ 4 PAngV; es gibt Ausnahmen, zum Beispiel wenn der Grundpreis dem Gesamtpreis entspricht, die hier nicht behandelt sind). Kleidung wird nach Stück verkauft, hier entfällt der Grundpreis. Bei Wohnaccessoires und Pflegeprodukten, etwa Raumspray, Duftöl oder Waschmittel, ist er einschlägig:

**Grundpreis = Gesamtpreis ÷ Füllmenge × Bezugsmenge.**

*Rechenbeispiel* (Beispielwerte, Endpreis): Ein Raumspray der Linie „Loreno Living“ mit 250 ml Inhalt kostet 13,40 €. Der Grundpreis je Liter beträgt 13,40 € ÷ 0,25 l = 53,60 € je Liter. Ein Duftöl mit 100 ml zu 8,60 € hat dagegen den Grundpreis 8,60 € ÷ 0,1 l = 86,00 € je Liter; erst der Grundpreis macht beide Produkte vergleichbar.

**Preisermäßigungen.** Wird mit einer Preisermäßigung geworben („statt“, „reduziert“, „20 % Nachlass“), ist nach der PAngV der **niedrigste Gesamtpreis der letzten 30 Tage** vor Anwendung der Ermäßigung anzugeben (Stand Oktober 2026, vor Verwendung prüfen); bei einer prozentualen Ermäßigung bezieht sich die Prozentangabe auf diesen Preis. Das verhindert, dass vor einer Aktion der Ausgangspreis künstlich angehoben wird, um einen großen Nachlass zu zeigen (Rabattaktionen und irreführende Darstellung: Thema 3.3 „Werbekonzepte und Verkaufsförderung“ im Fachgebiet Handelsmarketing). Für allmähliche Preissenkungen und weitere Sonderfälle gelten eigene Regeln, die hier nicht behandelt sind.

*Rechenbeispiel* (Beispielwerte): Ein Mantel kostet regulär 149,00 €. Zwei Wochen vor der Aktion war er sieben Tage lang für 129,00 € im Angebot; der niedrigste Preis der letzten 30 Tage ist also 129,00 €. Ein echter Nachlass von 20 % bezogen darauf ergäbe 129,00 € × 0,80 = 103,20 €. Zeigt der Shop dagegen 119,20 € (das sind 20 % auf den Normalpreis 149,00 €) mit der Angabe „20 % Nachlass“, beträgt die tatsächliche Ermäßigung gegenüber dem niedrigsten Preis 129,00 € − 119,20 € = 9,80 €, das sind 9,80 € ÷ 129,00 € × 100 ≈ 7,6 %. Die Angabe „20 %“ wäre irreführend.

### Das Widerrufsrecht

**Grundsatz.** Verbraucher:innen können einen Fernabsatzvertrag **ohne Angabe von Gründen** widerrufen (§§ 312g, 355 BGB). Der Grund liegt darin, dass sie die Ware vor dem Kauf nicht prüfen können, besonders bei Mode, die sich online weder anprobieren noch anfassen lässt. Die gesetzliche Widerrufsfrist beträgt **14 Tage** (Stand Oktober 2026, vor Verwendung prüfen).

**Fristbeginn und Fristende.** Bei einem Kaufvertrag über Waren beginnt die Frist mit dem Tag, an dem die Verbraucher:in oder eine von ihr benannte Person (nicht das Transportunternehmen) die **Ware erhalten** hat. Werden mehrere Waren einer einheitlichen Bestellung **getrennt geliefert**, beginnt die Frist mit dem Erhalt der **letzten** Ware (§ 356 BGB). Voraussetzung ist die ordnungsgemäße Widerrufsbelehrung. Berechnet wird die Frist nach den allgemeinen Regeln (§§ 187, 188 BGB): Der Tag des Erhalts zählt nicht mit; die Frist endet mit Ablauf des Tages, der durch seine Zahl dem Tag des Erhalts entspricht, vierzehn Tage später. Fällt das Fristende auf einen Samstag, Sonntag oder gesetzlichen Feiertag, endet die Frist am nächsten Werktag (§ 193 BGB). Zur Wahrung der Frist genügt es, die Widerrufserklärung rechtzeitig **abzusenden**.

*Rechenbeispiel* (Beispielwerte, Fristen 14 Tage, Stand Oktober 2026):

| Lieferung | Erhalt | Rechnerisches Ende (14 Tage) | Tatsächliches Fristende |
|---|---|---|---|
| ein Paket | Dienstag, 3. November 2026 | Dienstag, 17. November 2026 | Dienstag, 17. November 2026 |
| ein Paket | Samstag, 14. November 2026 | Samstag, 28. November 2026 | Montag, 30. November 2026 (Wochenende) |
| zwei Pakete einer Bestellung: Jacke am 3. November, Hose am Freitag, 6. November 2026 | Erhalt der letzten Ware: 6. November 2026 | Freitag, 20. November 2026 | Freitag, 20. November 2026 |

**Form.** Der Widerruf erfolgt durch **Erklärung gegenüber dem Unternehmen**, aus der der Entschluss zum Widerruf **eindeutig** hervorgeht; er muss nicht begründet werden und ist an keine bestimmte Form gebunden (Brief, E-Mail, Formular, Telefon). Zum Nachweis empfiehlt sich Text. Das Muster-Widerrufsformular ist nur ein Angebot. Eine bloße **Rücksendung ohne jede Erklärung** ist nicht ohne Weiteres ein Widerruf; im Shop löst man das durch ein Retourenportal, in dem die Kundschaft „Widerruf“ oder „Reklamation“ (Mangel) auswählt. Zusätzlich muss der Shop die Widerrufsfunktion bieten (Abschnitt „Bestellbutton und Bestellübersicht“ weiter oben). Wer das Widerrufsrecht ausübt, ist an den Vertrag nicht mehr gebunden.

**Rückabwicklung.** Die empfangenen Leistungen sind zurückzugewähren (§ 357 BGB):

- **Rücksendung:** Die Verbraucher:in sendet die Ware unverzüglich, spätestens binnen 14 Tagen ab der Widerrufserklärung, zurück (Stand Oktober 2026, vor Verwendung prüfen). Rechtzeitiges Absenden genügt.
- **Erstattung:** Das Unternehmen erstattet alle empfangenen Zahlungen unverzüglich, spätestens binnen 14 Tagen ab Zugang des Widerrufs (Stand Oktober 2026, vor Verwendung prüfen), und zwar mit demselben Zahlungsmittel, sofern nichts anderes vereinbart ist. Bis die Ware zurück ist oder die Absendung nachgewiesen wurde, darf es die Erstattung zurückhalten.
- **Hinsendekosten:** Erstattet werden auch die Kosten der ursprünglichen Lieferung, aber nur bis zur Höhe der günstigsten angebotenen Standardlieferung. Hat die Kundschaft eine teurere Versandart gewählt, etwa Expressversand, bleiben die Mehrkosten bei ihr. Bei Widerruf nur eines Teils der Bestellung ist die Behandlung der Hinsendekosten im Einzelfall zu klären.
- **Rücksendekosten:** Sie trägt die Verbraucher:in, **wenn das Unternehmen sie vorab darüber unterrichtet hat**; sonst trägt sie das Unternehmen. Viele Shops übernehmen die Kosten freiwillig; das ist eine Entscheidung der Konditionenpolitik (Zielkonflikt und Kosten: Abschnitt „Retouren im Modehandel“ weiter oben).
- **Gutschein statt Erstattung:** Nach einem Widerruf ist ein Gutschein anstelle der Erstattung nur als Angebot möglich, das die Kundschaft freiwillig annimmt, nicht als Pflicht; das gilt auch für die Konditionen im Abschnitt „Retouren im Modehandel“ weiter oben.

**Wertersatz.** Verbraucher:innen dürfen die Ware so prüfen, wie sie es im Ladengeschäft könnten: auspacken, ansehen, anprobieren, auch zu Hause. Verliert die Ware allerdings an Wert, weil sie in einer Weise benutzt wurde, die **über die Prüfung von Beschaffenheit, Eigenschaften und Funktionsweise hinausgeht**, schuldet die Verbraucher:in **Wertersatz**, sofern das Unternehmen ordnungsgemäß über das Widerrufsrecht belehrt hat (§ 357a BGB). Der Widerruf bleibt wirksam; der Wertersatz mindert den Erstattungsbetrag. Er bemisst sich nach dem Unterschied zwischen dem Wert der Ware im Zustand der Rückgabe und dem Wert der Ware im Zustand, in dem sie geliefert wurde. „Wertersatz“ bezeichnet hier den Ausgleich für den Wertverlust nach einem Widerruf, nicht den Ersatz des Warenwerts bei einem Transportschaden (Thema 6.1 „Logistikkette im Handel“ im Fachgebiet Handelslogistik (Wahlpflicht)). Beispiele: Ein Kleid wird zu Hause anprobiert und mit Etikett zurückgesandt, **kein Wertersatz**. Ein Kleid wird auf einer Feier getragen und kommt mit Flecken zurück, **Wertersatz**. Wer Wertersatz verlangt, braucht Belege; deshalb gehören Prüfung und Dokumentation beim Wareneingang (Thema 4.3 „Lager- und Transportprozesse“ im Fachgebiet Beschaffung und Logistik) zum Rücksendeprozess.

*Rechenbeispiel Erstattung* (Beispielwerte, Endpreise einschließlich Umsatzsteuer, Stand Oktober 2026): Eine Kundin bestellt ein Kleid für 129,90 € und wählt Expressversand für 10,70 €; der Standardversand hätte 4,90 € gekostet. Sie widerruft die gesamte Bestellung fristgerecht, das Kleid ist einwandfrei zurückgekommen. Erstattet werden 129,90 € + 4,90 € = 134,80 €; die Mehrkosten des Expressversands von 10,70 € − 4,90 € = 5,80 € bleiben bei der Kundin. Hat sie das Kleid dagegen getragen und ist es nur noch 91,00 € wert, beträgt der Wertersatz 129,90 € − 91,00 € = 38,90 €, und die Erstattung sinkt auf 134,80 € − 38,90 € = 95,90 €.

**Ausnahmen.** Das Widerrufsrecht besteht nicht bei jedem Fernabsatzvertrag (§ 312g BGB). Im Modehandel sind vor allem zwei Ausnahmen relevant, die eng auszulegen sind:

- **Individualisierte Ware:** Waren, die nicht vorgefertigt sind und auf einer individuellen Auswahl oder Bestimmung der Kundschaft beruhen oder eindeutig auf ihre persönlichen Bedürfnisse zugeschnitten sind, zum Beispiel ein Vorhang nach Maß, ein mit einem Wunschnamen besticktes Kissen oder ein Kissen mit einem hochgeladenen Foto. Standardware in einer anderen Farbe oder Größe fällt nicht darunter.
- **Versiegelte Hygieneartikel:** Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn die Versiegelung nach der Lieferung entfernt wurde, zum Beispiel hygienisch versiegelte Unterwäsche oder Bademode. Ob eine Ware darunter fällt, wird in der Rechtsprechung nicht einheitlich beurteilt; im Zweifel besteht das Widerrufsrecht.

Auf Ausnahmen muss das Unternehmen vor dem Vertragsschluss hinweisen.

**Fehlende Belehrung.** Wurde nicht ordnungsgemäß belehrt, beginnt die Frist nicht; das Widerrufsrecht **erlischt dann spätestens 12 Monate und 14 Tage** nach dem Zeitpunkt, an dem die Frist bei richtiger Belehrung begonnen hätte (§ 356 BGB; Stand Oktober 2026, vor Verwendung prüfen). Wertersatz kann das Unternehmen in diesem Fall nicht verlangen. Bei einem Erhalt am 3. November 2026 liefe das Recht also höchstens bis zum 17. November 2027 (3. November 2027 plus 14 Tage). Eine fehlerhafte Belehrung ist daher ein finanzielles Risiko für das ganze Rückgabegeschäft.

### Abgrenzung: Widerruf, Gewährleistung und Kulanz

Wenn Ware zurückkommt, steckt dahinter rechtlich etwas Verschiedenes. Drei Wege sind zu unterscheiden, dazu die Garantie als vierter Begriff:

| Merkmal | Widerruf | Gewährleistung (Mängelrechte) | Kulanz |
|---|---|---|---|
| Voraussetzung | Fernabsatzvertrag mit Verbraucher:in; kein Grund nötig | Sachmangel der Ware bei Übergabe | keine, freiwillig |
| Frist | 14 Tage ab Erhalt (Stand Oktober 2026, vor Verwendung prüfen) | Verjährung nach zwei Jahren ab Ablieferung bei neuer Ware (Stand Oktober 2026, vor Verwendung prüfen) | vom Unternehmen gesetzt, zum Beispiel 30 Tage |
| Folge | Rückabwicklung: Erstattung gegen Rückgabe | zuerst Nacherfüllung (Reparatur oder Ersatzlieferung), dann Rücktritt, Minderung oder Schadensersatz | was das Unternehmen zusagt (Umtausch, Gutschein, Erstattung) |
| Kosten der Rücksendung | Verbraucher:in, wenn vorab unterrichtet | das Unternehmen trägt die Kosten der Nacherfüllung | nach Zusage |
| Beweis | Zustand der Ware bei Rückgabe (für den Wertersatz) | siehe unten: Vermutung für die Verbraucher:in im ersten Jahr | keine rechtliche Bindung außer der Zusage |

**Sachmangel.** Die Ware ist mangelhaft, wenn sie nicht die vereinbarte Beschaffenheit hat und sich nicht für die vertraglich vorausgesetzte Verwendung eignet, und zusätzlich, wenn sie nicht die Beschaffenheit hat, die bei Ware dieser Art üblich ist und die Käufer:innen erwarten dürfen; die vereinbarten und die üblichen Anforderungen müssen seit der Reform von 2022 grundsätzlich gemeinsam erfüllt sein, und von den üblichen Anforderungen kann gegenüber Verbraucher:innen nur durch eine ausdrückliche, gesonderte Vereinbarung abgewichen werden (§ 434 BGB). Beispiele: Eine Naht löst sich beim ersten Tragen, ein Reißverschluss bricht, die Farbe weicht stark vom Foto ab, ein Pullover enthält mehr Kunstfaser als angegeben. **Kein Mangel** sind: „gefällt nicht“, „passt nicht“, normaler Verschleiß, Schäden durch unsachgemäße Behandlung. Zuständig ist das **verkaufende Unternehmen**, also Loreno, nicht das Lieferunternehmen oder die Marke. Die Mängelrechte kann ein Unternehmen gegenüber Verbraucher:innen bei neuer Ware nicht ausschließen.

**Beweislast.** Zeigt sich innerhalb eines Jahres nach der Lieferung ein Mangel, wird vermutet, dass er schon bei der Lieferung vorlag (**Beweislastumkehr** beim Verbrauchsgüterkauf, § 477 BGB; Stand Oktober 2026, vor Verwendung prüfen). Das Unternehmen müsste dann beweisen, dass die Ware bei Lieferung in Ordnung war, zum Beispiel, dass der Schaden durch Gebrauch entstand. Nach dem ersten Jahr muss die Kundschaft beweisen, dass der Mangel von Anfang an bestand.

*Rechenbeispiel* (Beispielwerte, Stand Oktober 2026): Ein Pullover wird am 3. November 2026 geliefert. Die Verjährung der Mängelrechte beträgt zwei Jahre ab Ablieferung; sie endet in der Regel mit Ablauf des 3. November 2028 (eine Ablaufhemmung bei Mängeln, die sich innerhalb der Frist zeigen, ist hier nicht dargestellt). Zeigt sich eine aufgegangene Naht nach acht Monaten (Juli 2027), wird vermutet, dass der Mangel bei Lieferung vorlag; zeigt sie sich nach 14 Monaten (Januar 2028), liegt die Beweislast bei der Kundin, der Anspruch besteht aber weiterhin, bis die Verjährung abgelaufen ist.

**Garantie und Kulanz.** Eine **Garantie** ist eine zusätzliche, freiwillige Zusage, etwa der Marke oder des Unternehmens („zehn Jahre Haltbarkeit der Naht“). Sie ersetzt die Mängelrechte nicht, sondern tritt daneben, und was zugesagt ist, bindet. **Kulanz** ist der freiwillige Umtausch oder die freiwillige Erstattung ohne Rechtspflicht, zum Beispiel nach Ablauf der Widerrufsfrist (Thema 5.4 „Kundenzufriedenheit und Kundenbindung“ im Fachgebiet Vertriebssteuerung (Wahlpflicht)). Wer eine freiwillige Rückgabefrist von 30 Tagen zusagt, ist an diese Zusage gebunden; die gesetzliche Widerrufsbelehrung muss trotzdem zur tatsächlichen gesetzlichen Frist passen und darf durch die längere Frist nicht unklar werden.

**Retoure im Prozess.** Im Retourenmanagement entscheidet der Grund über den Weg. „Passt nicht“ oder „gefällt nicht“ innerhalb der Frist ist Widerruf; „defekt“ ist Mängelrecht, und dort gilt zuerst die Nacherfüllung (die Kundin kann den Mangel aber auch innerhalb der Widerrufsfrist durch Widerruf umgehen); „zu spät“ und „einwandfrei“ ist Kulanz. Die Retourenquote weiter oben in diesem Thema erfasst alle Rücksendungen, auch die wegen Mangel; wer Gegenmaßnahmen plant, trennt deshalb Rücksendegründe (Information und Passform gegen Widerrufsretouren, Qualitätskontrolle und Regress gegenüber den Lieferbetrieben gegen Mängel). Entscheidungen in diesem Bereich kosten Geld und Kundenbindung; sie bleiben eine Abwägung im Einzelfall, kein Rechtsrat.

## B. Karteikarten 3.4 (anhängen)

#### K-3.4-25
**Frage:** Wann liegt ein Fernabsatzvertrag vor, und wann nicht?
**Antwort:** Er liegt vor, wenn ein Unternehmen und Verbraucher:innen für Verhandlung und Vertragsschluss ausschließlich Fernkommunikationsmittel (Internet, E-Mail, Telefon) verwenden, im Rahmen eines für den Fernabsatz organisierten Vertriebssystems, wie im Online-Shop. Kein Fernabsatzvertrag ist der Kauf an der Kasse der Filiale, auch wenn die Ware vorher online reserviert wurde. Eine verbindliche Online-Bestellung mit Abholung in der Filiale (Click & Collect) bleibt ein Fernabsatzvertrag.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-26
**Frage:** Wie kommt ein Kaufvertrag im Online-Shop zustande, und was ist die Bestelleingangsbestätigung?
**Antwort:** Die Artikelanzeige ist in der Regel nur eine Einladung; die Bestellung der Kundschaft ist das Angebot, die Annahme erfolgt durch das Unternehmen (zum Beispiel Auftragsbestätigung oder Versand). Die automatische Bestelleingangsbestätigung belegt nach dem Gesetz nur den Zugang der Bestellung; ob sie auch die Annahme ist, hängt von ihrer Formulierung und den Geschäftsbedingungen ab.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-27
**Frage:** Wie muss der Bestellbutton beschriftet sein, und was passiert bei einem Verstoß?
**Antwort:** Gut lesbar und nur mit den Wörtern „zahlungspflichtig bestellen“ oder einer entsprechend eindeutigen Formulierung, die die Zahlungspflicht erkennen lässt; „Weiter“ genügt nicht. Bei einem Verstoß kommt der Vertrag nicht zustande. Unmittelbar davor müssen wesentliche Eigenschaften, Gesamtpreis und Versandkosten klar und hervorgehoben stehen (Bestellübersicht). Stand Oktober 2026, vor Verwendung prüfen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-28
**Frage:** Nenne fünf Angaben, über die ein Online-Shop vor der Bestellung informieren muss, und die Anbieterkennzeichnung.
**Antwort:** Zum Beispiel wesentliche Eigenschaften der Ware, Identität und Anschrift des Unternehmens, Gesamtpreis einschließlich Umsatzsteuer und Versandkosten, Zahlungs- und Lieferbedingungen, Widerrufsrecht mit Belehrung und Muster-Widerrufsformular, Hinweis auf das gesetzliche Mängelhaftungsrecht. Die Anbieterkennzeichnung (Impressum) nennt bei der GmbH Firma mit Rechtsformzusatz, Sitz, Vertretung, Kontaktmöglichkeit und Handelsregister mit Nummer.
`schwierigkeit: mittel` · `bloom: erinnern`

#### K-3.4-29
**Frage:** Was ist der Grundpreis, wann ist er anzugeben, und wie berechnest du ihn für ein Raumspray mit 250 ml zu 13,40 €?
**Antwort:** Der Grundpreis ist der Preis je Mengeneinheit (meist je Kilogramm, Liter oder Meter); er ist bei Waren anzugeben, die nach Gewicht, Volumen, Länge oder Fläche angeboten werden, nicht bei Kleidung nach Stück. Grundpreis = Gesamtpreis ÷ Füllmenge × Bezugsmenge: 13,40 € ÷ 0,25 l = 53,60 € je Liter. Beide Preise sind Endpreise einschließlich Umsatzsteuer.
`schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-30
**Frage:** Welchen Preis muss ein Shop bei der Werbung mit einer Preisermäßigung angeben, und was folgt daraus für eine „20 %“-Aktion?
**Antwort:** Den niedrigsten Gesamtpreis der letzten 30 Tage vor der Ermäßigung (Stand Oktober 2026, vor Verwendung prüfen); die Prozentangabe bezieht sich darauf. Beispiel: Regulär 149,00 €, in den letzten 30 Tagen zeitweise 129,00 €; 20 % sind 129,00 € × 0,80 = 103,20 €. Wird 119,20 € (20 % auf 149,00 €) als „20 % Nachlass“ beworben, ist die Ermäßigung nur 9,80 € ÷ 129,00 € ≈ 7,6 % und die Werbung irreführend.
`schwierigkeit: schwer` · `bloom: anwenden`

#### K-3.4-31
**Frage:** Wie lange und ab wann kann man einen Online-Kauf widerrufen, und was gilt bei mehreren getrennt gelieferten Waren und beim Fristende am Wochenende?
**Antwort:** Gesetzliche Frist 14 Tage ab Erhalt der Ware (Stand Oktober 2026, vor Verwendung prüfen); der Tag des Erhalts zählt nicht mit. Bei einer Bestellung mit getrennter Lieferung beginnt die Frist mit Erhalt der letzten Ware. Fällt das Fristende auf Samstag, Sonntag oder Feiertag, endet die Frist am nächsten Werktag; rechtzeitiges Absenden der Erklärung genügt. Ohne ordnungsgemäße Belehrung beginnt die Frist nicht; das Recht erlischt spätestens nach 12 Monaten und 14 Tagen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### K-3.4-32
**Frage:** Wie läuft die Rückabwicklung nach einem Widerruf ab, und welche Kosten trägt wer?
**Antwort:** Eindeutige Erklärung ohne Begründung, Rücksendung binnen 14 Tagen ab Erklärung, Erstattung unverzüglich, spätestens binnen 14 Tagen ab Zugang des Widerrufs, mit demselben Zahlungsmittel (Zurückhalten bis zum Rückerhalt oder Absendenachweis möglich). Erstattet werden Kaufpreis und Hinsendekosten bis zur günstigsten Standardlieferung; Mehrkosten einer teureren Versandart nicht. Rücksendekosten trägt die Kundschaft, wenn sie vorab informiert wurde. Zusätzlich muss der Shop eine Widerrufsfunktion („Vertrag widerrufen“, danach „Widerruf bestätigen“) bieten und den Eingang auf einem dauerhaften Datenträger bestätigen. Stand Oktober 2026, vor Verwendung prüfen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-33
**Frage:** Wann schuldet die Kundschaft nach dem Widerruf Wertersatz, und welche Ware ist vom Widerruf ausgenommen?
**Antwort:** Wertersatz, wenn der Wert der Ware durch einen Umgang sinkt, der über die Prüfung von Beschaffenheit, Eigenschaften und Funktionsweise hinausgeht (zum Beispiel ein getragenes Kleid), und das Unternehmen ordnungsgemäß belehrt hat; die bloße Anprobe zu Hause genügt nicht. Ausnahmen vom Widerrufsrecht, eng auszulegen: individualisierte Ware (Maßanfertigung, Wunschnamen-Stickerei) und versiegelte Hygieneartikel nach Entfernen der Versiegelung.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-3.4-34
**Frage:** Wie unterscheidest du Widerruf, Gewährleistung und Kulanz bei einer Rücksendung?
**Antwort:** Widerruf: Fernabsatz, kein Grund nötig, 14 Tage, Rückabwicklung. Gewährleistung: Sachmangel, Nacherfüllung zuerst, bei neuer Ware zwei Jahre Verjährung, im ersten Jahr Vermutung, dass der Mangel schon bei Lieferung vorlag (Stand Oktober 2026, vor Verwendung prüfen). Kulanz: freiwilliges Entgegenkommen ohne Rechtsanspruch, zum Beispiel nach Ablauf der Fristen. Garantie: zusätzliche freiwillige, aber bindende Zusage.
`schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 3.4 (anhängen)

#### Q-3.4-23 · Multiple Choice
**Frage:** Eine Kundin reserviert im Online-Shop der Loreno Mode & Wohnen GmbH unverbindlich einen Mantel, probiert ihn in der Filiale an und kauft ihn an der Kasse. Ist das ein Fernabsatzvertrag mit gesetzlichem Widerrufsrecht?
- [ ] Ja, denn die Reservierung lief über das Internet, also ein Fernkommunikationsmittel.
- [ ] Ja, denn jeder Kauf einer Privatperson bei einem Unternehmen ist ein Fernabsatzvertrag.
- [x] Nein, der Kaufvertrag wurde erst in der Filiale geschlossen.
- [ ] Nein, weil Mode generell vom Widerruf ausgenommen ist.
**Erklärung:** Ein Fernabsatzvertrag setzt voraus, dass Verhandlung und Vertragsschluss ausschließlich über Fernkommunikationsmittel laufen. Die unverbindliche Reservierung ist nur Vorbereitung; der Vertrag entsteht an der Kasse. Ein Rückgaberecht hat die Kundin dann nur bei einem Mangel oder aus Kulanz. Anders wäre es bei einer verbindlichen Online-Bestellung mit Abholung (Click & Collect). Mode ist nicht generell vom Widerruf ausgenommen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-24 · Wahr/Falsch
**Aussage:** Eine Kundin hat im Online-Shop der Loreno ein Kleid bestellt und will es innerhalb der Widerrufsfrist zurückgeben. Der Widerruf der Kundin ist nur wirksam, wenn sie einen Grund nennt, zum Beispiel einen Mangel oder dass es nicht passt.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Der Widerruf eines Fernabsatzvertrags muss nicht begründet werden. Die Erklärung muss aber eindeutig sein; eine bloße Rücksendung ohne Erklärung ist nicht ohne Weiteres ein Widerruf. Einen Grund braucht die Kundin nur, wenn sie sich auf einen Mangel beruft.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-3.4-25 · Kurzantwort
**Frage:** Eine Kundin bestellt im Online-Shop der Loreno ein Kleid für 57,90 € und wählt den Expressversand für 6,89 €; der Standardversand hätte 3,59 € gekostet (Beispielwerte, Endpreise einschließlich Umsatzsteuer). Sie widerruft die gesamte Bestellung fristgerecht, die Ware kommt einwandfrei zurück. Wie viel Euro muss Loreno erstatten (Warenwert plus Kosten der Standardlieferung; Stand Oktober 2026, vor Verwendung prüfen)?
**Akzeptierte Antworten:** 61,49; 61,49 €; 61,49 Euro; 61,49 EUR; 61.49; 61.49 €; 61.49 Euro; 61.49 EUR
**Erklärung:** Erstattet werden der Kaufpreis und die Kosten der Standardlieferung: 57,90 € + 3,59 € = 61,49 €. Die Mehrkosten des Expressversands von 6,89 € − 3,59 € = 3,30 € bleiben bei der Kundin.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-26 · Mehrfachauswahl
**Frage:** Loreno hat vor dem Vertragsschluss auf mögliche Ausnahmen vom Widerrufsrecht hingewiesen. Bei welchen Bestellungen im Online-Shop kann das gesetzliche Widerrufsrecht entfallen (Stand Oktober 2026, vor Verwendung prüfen)?
- [ ] Eine Standardbluse in Größe 38, die ungeöffnet zurückkommt
- [x] Ein Kissenbezug, der nach Wunsch der Kundin mit einem Namen bestickt wurde
- [ ] Ein Schal aus der aktuellen Kollektion, der zwei Tage nach Lieferung zurückgesandt wird
- [x] Ein Vorhang, der nach den Maßen der Kundin angefertigt wurde
- [ ] Ein Wohnaccessoire der Linie „Loreno Living“ in Originalverpackung
**Erklärung:** Ausgenommen sind Waren, die nicht vorgefertigt sind und auf individueller Auswahl oder Bestimmung der Kundschaft beruhen oder eindeutig auf ihre persönlichen Bedürfnisse zugeschnitten sind, wie die bestickte Ware oder der Vorhang nach Maß. Standardware bleibt widerrufbar, auch wenn sie ungeöffnet oder nur wenige Tage unterwegs ist. Die Ausnahmen sind eng auszulegen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-27 · Kurzantwort
**Frage:** Eine Kundin widerruft fristgerecht und sendet ein Kleid zurück, das sie ersichtlich auf einer Feier getragen hat. Der Preis lag bei 59,90 € und entspricht dem Wert bei Lieferung; im zurückgesandten Zustand hat es nur noch einen Wert von 44,00 € (Beispielwerte). Loreno hat ordnungsgemäß über das Widerrufsrecht belehrt. Wie viel Euro Wertersatz darf Loreno von der Erstattung abziehen (Unterschied zwischen dem Wert bei Lieferung und dem Wert bei Rückgabe)?
**Akzeptierte Antworten:** 15,90; 15,90 €; 15,90 Euro; 15,90 EUR; 15.90; 15.90 €; 15.90 Euro; 15.90 EUR; 15,9; 15,9 €; 15,9 Euro; 15,9 EUR; 15.9; 15.9 €; 15.9 Euro; 15.9 EUR
**Erklärung:** Der Wertersatz entspricht dem Wertverlust durch einen Umgang, der über die bloße Prüfung hinausgeht: 59,90 € − 44,00 € = 15,90 €. Der Widerruf bleibt wirksam; der Wertersatz mindert nur den Erstattungsbetrag.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-28 · Zuordnung
**Anweisung:** Ordne jedem Begriff die passende Beschreibung zu.
- Widerruf ↔ Rückgabe ohne Angabe von Gründen innerhalb der gesetzlichen Frist bei einem Fernabsatzvertrag
- Gewährleistung ↔ Rechte der Kundschaft bei einem Sachmangel, zunächst Nacherfüllung
- Kulanz ↔ Freiwilliges Entgegenkommen des Unternehmens ohne rechtliche Pflicht
- Garantie ↔ Zusätzliche freiwillige, aber bindende Zusage, etwa zur Haltbarkeit
**Erklärung:** Widerruf und Gewährleistung sind gesetzliche Rechte der Kundschaft, Kulanz und Garantie gehen vom Unternehmen aus. Die Garantie bindet das Unternehmen, sobald es sie zugesagt hat; die Kulanz bindet nur im Einzelfall.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-3.4-29 · Kurzantwort
**Frage:** Im Online-Shop der Loreno wird ein Wäscheparfüm mit 500 ml Inhalt für 6,95 € angeboten (Beispielwerte, Endpreis einschließlich Umsatzsteuer). Wie hoch ist der Grundpreis in Euro je Liter (Gesamtpreis ÷ Füllmenge in Litern)?
**Akzeptierte Antworten:** 13,90; 13,90 €; 13,90 Euro; 13,90 EUR; 13,90 €/l; 13,90 €/Liter; 13,90 € je Liter; 13,90 € pro Liter; 13,90 € je l; 13,90 € pro l; 13,90 Euro/l; 13,90 Euro/Liter; 13,90 Euro je Liter; 13,90 Euro pro Liter; 13,90 Euro je l; 13,90 Euro pro l; 13,90 EUR/l; 13,90 EUR/Liter; 13,90 EUR je Liter; 13,90 EUR pro Liter; 13,90 EUR je l; 13,90 EUR pro l; 13.90; 13.90 €; 13.90 Euro; 13.90 EUR; 13.90 €/l; 13.90 €/Liter; 13.90 € je Liter; 13.90 € pro Liter; 13.90 € je l; 13.90 € pro l; 13.90 Euro/l; 13.90 Euro/Liter; 13.90 Euro je Liter; 13.90 Euro pro Liter; 13.90 Euro je l; 13.90 Euro pro l; 13.90 EUR/l; 13.90 EUR/Liter; 13.90 EUR je Liter; 13.90 EUR pro Liter; 13.90 EUR je l; 13.90 EUR pro l; 13,9; 13,9 €; 13,9 Euro; 13,9 EUR; 13,9 €/l; 13,9 €/Liter; 13,9 € je Liter; 13,9 € pro Liter; 13,9 € je l; 13,9 € pro l; 13,9 Euro/l; 13,9 Euro/Liter; 13,9 Euro je Liter; 13,9 Euro pro Liter; 13,9 Euro je l; 13,9 Euro pro l; 13,9 EUR/l; 13,9 EUR/Liter; 13,9 EUR je Liter; 13,9 EUR pro Liter; 13,9 EUR je l; 13,9 EUR pro l; 13.9; 13.9 €; 13.9 Euro; 13.9 EUR; 13.9 €/l; 13.9 €/Liter; 13.9 € je Liter; 13.9 € pro Liter; 13.9 € je l; 13.9 € pro l; 13.9 Euro/l; 13.9 Euro/Liter; 13.9 Euro je Liter; 13.9 Euro pro Liter; 13.9 Euro je l; 13.9 Euro pro l; 13.9 EUR/l; 13.9 EUR/Liter; 13.9 EUR je Liter; 13.9 EUR pro Liter; 13.9 EUR je l; 13.9 EUR pro l
**Erklärung:** 500 ml sind 0,5 l; 6,95 € ÷ 0,5 l = 13,90 € je Liter. Der Grundpreis macht Produkte mit unterschiedlicher Füllmenge vergleichbar und ist neben dem Gesamtpreis anzugeben. Bei Kleidung, die nach Stück verkauft wird, entfällt er.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-30 · Sortieren
**Anweisung:** Bringe die Schritte eines Widerrufs bei einer Online-Bestellung in die richtige Reihenfolge.
1. Die Kundin erhält die Ware; die Widerrufsfrist beginnt.
2. Die Kundin erklärt gegenüber Loreno eindeutig den Widerruf.
3. Die Kundin sendet die Ware an Loreno zurück.
4. Loreno erstattet die Zahlung mit demselben Zahlungsmittel.
**Erklärung:** Die Frist läuft ab Erhalt der Ware; es folgen die Erklärung des Widerrufs, die Rücksendung und die Erstattung. Loreno darf die Erstattung zurückhalten, bis die Ware zurück ist oder die Absendung nachgewiesen wurde.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-3.4-31 · Lückentext
**Text:** Zeigt sich bei einem Verbrauchsgüterkauf innerhalb eines Jahres nach der Lieferung ein Mangel, wird vermutet, dass er schon bei der Lieferung vorlag (Stand Oktober 2026, vor Verwendung prüfen). Diese Regel zugunsten der Kundschaft heißt ___Beweislastumkehr___.
**Erklärung:** Bei der Beweislastumkehr muss das Unternehmen beweisen, dass die Ware bei Lieferung in Ordnung war. Nach dem ersten Jahr muss die Kundschaft beweisen, dass der Mangel von Anfang an bestand.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-3.4-32 · Entweder-Oder
**Frage:** Acht Monate nach der Lieferung bricht der Reißverschluss einer Jacke, die eine Kundin im Online-Shop der Loreno gekauft hat; sie verlangt Reparatur oder Ersatz. Auf welches Recht kann sie sich stützen?
- [ ] Widerrufsrecht
- [x] Gewährleistung
**Erklärung:** Die Widerrufsfrist von 14 Tagen ist längst abgelaufen. Ein gebrochener Reißverschluss ist ein möglicher Sachmangel; dann gilt die Gewährleistung mit Nacherfüllung (Reparatur oder Ersatzlieferung). Innerhalb des ersten Jahres wird vermutet, dass der Mangel schon bei der Lieferung vorlag (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-3.4-33 · Was passt nicht dazu
**Frage:** Welche Angabe passt nicht zu den übrigen Informationen, die ein Online-Shop der Kundschaft vor der Bestellung klar und verständlich zur Verfügung stellen muss?
- [ ] Gesamtpreis einschließlich Umsatzsteuer
- [ ] Hinweis auf das Widerrufsrecht und die Widerrufsfrist
- [x] Einkaufspreis der Ware beim Lieferbetrieb
- [ ] Name, Anschrift und Kontaktmöglichkeit des Unternehmens
**Erklärung:** Der Einkaufspreis ist eine interne Kalkulationsgröße und gehört nicht zu den Pflichtinformationen. Pflichtangaben sind unter anderem der Gesamtpreis einschließlich Umsatzsteuer, die Informationen zum Widerrufsrecht und die Identität des Unternehmens.
`schwierigkeit: leicht` · `bloom: analysieren`

#### Q-3.4-34 · Multiple Choice
**Frage:** Eine Kundin erhält ihre Bestellung (ein Paket) am Samstag, 21. November 2026. Loreno hat ordnungsgemäß belehrt; es gilt eine Widerrufsfrist von 14 Tagen, der Tag des Erhalts zählt nicht mit, und fällt das Ende auf einen Samstag, Sonntag oder Feiertag, endet die Frist am nächsten Werktag (Stand Oktober 2026, vor Verwendung prüfen). Bis zu welchem Tag muss sie den Widerruf spätestens absenden?
- [ ] Freitag, 4. Dezember 2026
- [ ] Samstag, 5. Dezember 2026
- [ ] Sonntag, 6. Dezember 2026
- [x] Montag, 7. Dezember 2026
**Erklärung:** 14 Tage nach dem 21. November ist rechnerisch Samstag, der 5. Dezember 2026. Weil das Fristende auf einen Samstag fällt, verschiebt es sich auf den nächsten Werktag, Montag, den 7. Dezember 2026. Zur Fristwahrung genügt das rechtzeitige Absenden der Erklärung.
`schwierigkeit: mittel` · `bloom: anwenden`
