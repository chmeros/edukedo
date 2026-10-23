# Entwurf Fachinformatiker Daten- und Prozessanalyse, Data Act: Zugang zu Daten vernetzter Produkte, Datenweitergabe und Cloud-Wechsel: Ergänzung im Thema 9.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil H des Pakets P-AY Fachinformatiker (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-11, dort „P-AW im Einzelnen“ Teil C). **Nur Kurs Daten- und Prozessanalyse.** Einzufügen in `content/fachinformatiker-daten-prozessanalyse/dp2/9.2-nutzungsberechtigung-verknuepfung.md`: Abschnitt A **vor der Überschrift „### Zweckbindung und Rechtsgrundlage — grundlagenorientiert“** (Anker, mit Gedankenstrich U+2014 wie im Bestand; die Theorie steht damit hinter „### Eigentum, Herkunft und Datenhoheit“ und vor dem Abschnitt zu Zweckbindung und Rechtsgrundlage), B an die Karteikarten hinter K-9.2-20, C an das Quiz hinter Q-9.2-13. Bestand gezählt (Stand 23.10.2026): 20 Karteikarten (K-9.2-01 bis -20, lückenlos), 13 Quizfragen (Q-9.2-01 bis -13, lückenlos); `git log -S` auf K-9.2-21, Q-9.2-14 und F-DP2-04 ergibt im Ordner `content/fachinformatiker-daten-prozessanalyse` keine entfernten IDs (Treffer von K-9.2-21 und Q-9.2-14 betreffen andere Kurse). Die neuen IDs sind K-9.2-21 bis -28 (8 Karten) und Q-9.2-14 bis -23 (10 Quizfragen, davon 1 Kurzantwort mit Fristberechnung). Die Fallaufgabe F-DP2-04 (Bestand F-DP2-01 bis -03; das Fach `dp2` hat keine `fachgespraech.md`, daher kein Fachgespräch) steht in `fi-faelle-h.md`, die Rechtsangaben in `rechtsangaben-h.md`, die Ersetzungen im Bestand in `ersetzungen-h.json` (drei Paare in zwei Dateien: zwei in `dp2/9.2`, eines in `dp2/fallaufgaben.md`; der Auftraggeber setzt die Einleitung der Fallaufgaben-Dateien paketweit einheitlich). Die Theorie umfasst etwa 1.700 Wörter in fünf `###`-Abschnitten. Der `rechtsstand` der berührten Dateien (`dp2/9.2`, `dp2/fallaufgaben.md`) wird beim Einspielen gesetzt.

**Zweck.** Der Bestand führt den Data Act in Thema 9.2 nur als Stichwort („besondere Zugangsregeln zu Daten vernetzter Produkte, die im Einzelfall rechtlich zu prüfen sind“) und behandelt Eigentum an Daten, Zweckbindung, Lizenzen und Verknüpfung. Offen bleibt, wer Zugang zu den Daten vernetzter Maschinen hat, wie ein Analyseteam sie rechtmäßig erhält, welche Pflichten es dabei trifft und was beim Wechsel eines Cloud-Dienstes gilt. Die Ergänzung nimmt die Sicht des Datenanalyse-Teams von Brevanta ein, das Maschinendaten der Kundschaft auswertet und selbst Cloud-Dienste für Analyseumgebungen nutzt. Nicht Gegenstand (steht im Bestand oder in anderen Teilen): Datenschutzgrundlagen, Rechtsgrundlagen, Drittlandübermittlung, Beschäftigtendatenschutz und Auskunftsanfragen (Bestand von Thema 9.2 und Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“ samt Ergänzung Teil G), Software-Urheberrecht und Lizenzen (Teil K), automatisierte Entscheidungen nach Art. 22 DSGVO (nur Verweis auf Thema 11.3), Cybersicherheits- und Produktpflichten der Hersteller (Teile A bis E), Bereitstellung von Daten an öffentliche Stellen bei außergewöhnlicher Notwendigkeit, Interoperabilitätsnormen, intelligente Verträge, Datenräume und Bußgeldhöhen.

**Rechtsnah (R4).** Paragrafen und Artikel stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz und Fall (auch keine Verordnungsnummern dort; der gebräuchliche Name „Data Act“ als Thema ist erlaubt). Rechtsgrundlagen am Rohtext gelesen (Verordnung (EU) 2023/2854 im Amtsblattwortlaut und in der konsolidierten Fassung mit der Berichtigung vom 09.09.2025 über `publications.europa.eu`; Gesetz zur Durchführung der Verordnung vom 26.05.2026, BGBl. 2026 I Nr. 157, als PDF; UrhG § 87b von `gesetze-im-internet.de`; Empfehlung 2003/361/EG; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-h.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die zeitliche Staffelung (Konzeptionspflicht für Produkte nach dem 12.09.2026, Wechselentgelte ab dem 12.01.2027, Vertragsklauseln für ältere Verträge ab dem 12.09.2027), der Änderungsvorschlag der Kommission zum Data Act im sogenannten Digital-Omnibus (nicht verabschiedet) und die Zuständigkeiten nach dem deutschen Durchführungsgesetz. Annahmen zur Fallfirma (Brevanta als KMU, Kundschaft und Hersteller als Beispielnamen, Datenbestand) stehen im Fall.

---

# Thema 9.2

## A. Theorie-Ergänzung 9.2 (einfügen vor „### Zweckbindung und Rechtsgrundlage — grundlagenorientiert“)

### Daten vernetzter Produkte: Data Act im Überblick

Maschinen, Fahrzeuge und Haushaltsgeräte erzeugen im Betrieb Daten und übermitteln sie häufig an den Hersteller. Wer darauf zugreifen darf, regelt neben Verträgen und Datenschutzrecht die Datenverordnung der EU, bekannt als **Data Act** (Verordnung (EU) 2023/2854). Sie erfasst personenbezogene und nicht-personenbezogene Daten, Hersteller vernetzter Produkte, die in der Union in Verkehr gebracht werden, deren Nutzer in der Union und Anbieter von Datenverarbeitungsdiensten (Cloud-Diensten) unabhängig vom Sitz (Stützangabe Art. 1 Abs. 2, 3 Data Act). Die Rollenbegriffe sind gesetzliche Begriffe für alle Geschlechter und juristische Personen. Grundbegriffe (Stützangabe Art. 2 Data Act):

- **Vernetztes Produkt:** ein Gegenstand, der Daten über seine Nutzung oder Umgebung erzeugt oder erhebt und über einen Kommunikationsdienst, eine physische Verbindung oder einen geräteinternen Zugang übermitteln kann; dazu zählen nach den Erwägungsgründen auch industrielle Maschinen und Anlagen (Stützangabe Erwägungsgrund 14). Ausgenommen sind Gegenstände, deren Hauptfunktion die Datenspeicherung, -verarbeitung oder -übertragung für andere ist.
- **Nutzer:** wer ein vernetztes Produkt besitzt, vertraglich zeitweilige Rechte daran hat (etwa durch Miete oder Leasing) oder einen verbundenen Dienst in Anspruch nimmt, also einen digitalen Dienst, der die Funktionen des Produkts ermöglicht oder ergänzt; auch ein Unternehmen kann Nutzer sein.
- **Dateninhaber:** wer berechtigt oder verpflichtet ist, Daten zu nutzen und bereitzustellen; ob und wann der Hersteller, der die Daten über ein Portal erhält, Dateninhaber ist, ist eine Einordnung im Einzelfall (Auslegung).
- **Dritter und Datenempfänger:** wem der Dateninhaber auf Verlangen des Nutzers Daten bereitstellt; er handelt gewerblich oder beruflich und ist nicht selbst Nutzer.
- **Produktdaten und ohne Weiteres verfügbare Daten:** Produktdaten entstehen bei der Nutzung des Produkts und sind vom Hersteller so konzipiert, dass sie abgerufen werden können. Ohne Weiteres verfügbar sind sie (und die Daten verbundener Dienste), wenn der Dateninhaber sie rechtmäßig und ohne unverhältnismäßigen, über eine einfache Bearbeitung hinausgehenden Aufwand erhält oder erhalten kann.

Der Data Act gilt seit dem 12. September 2025, aber gestaffelt: Die Konzeptionspflicht betrifft nur Produkte, die nach dem 12. September 2026 in Verkehr gebracht werden; die Regeln zu missbräuchlichen Vertragsklauseln gelten für Verträge, die nach dem 12. September 2025 geschlossen wurden, und ab dem 12. September 2027 auch für ältere unbefristete oder frühestens zehn Jahre nach dem 11. Januar 2024 endende Verträge (Stützangabe Art. 50 Data Act). Ob die Zugangsrechte auch Daten erfassen, die vor dem 12. September 2025 entstanden sind, ist Auslegungsfrage (Auslegung). In Deutschland führt das Datenverordnung-Anwendungs-und-Durchsetzungs-Gesetz (DADG) die Verordnung seit dem 30. Mai 2026 durch: Zuständig ist die Bundesnetzagentur, für den Schutz personenbezogener Daten bei nichtöffentlichen Stellen die oder der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (Stützangabe § 2 Abs. 1, § 3 Abs. 1 DADG). Stand Oktober 2026, vor Verwendung prüfen.

### Zugang des Nutzers zu Produktdaten

Produkte, die nach dem 12. September 2026 in Verkehr gebracht werden, sind so zu konzipieren, dass die Daten standardmäßig für den Nutzer einfach, sicher, unentgeltlich und maschinenlesbar zugänglich sind (Stützangabe Art. 3 Abs. 1 Data Act). Vor einem Kauf-, Miet- oder Leasingvertrag sind dem Nutzer unabhängig von diesem Stichtag Art, Format und Umfang der Daten mitzuteilen (Stützangabe Art. 3 Abs. 2 Data Act).

Kann der Nutzer nicht direkt zugreifen, muss der Dateninhaber ihm auf einfaches Verlangen auf elektronischem Wege die ohne Weiteres verfügbaren Daten samt Metadaten unverzüglich, einfach, sicher und unentgeltlich in einem umfassenden, gängigen und maschinenlesbaren Format bereitstellen, soweit relevant und technisch durchführbar in gleicher Qualität, kontinuierlich und in Echtzeit; eine feste Tagesfrist nennt die Verordnung nicht (Stützangabe Art. 4 Abs. 1 Data Act). Grenzen: Der Nutzer darf die Daten nicht nutzen, um ein konkurrierendes vernetztes Produkt zu entwickeln (Abs. 10); der Dateninhaber darf nicht-personenbezogene Daten nur auf der Grundlage eines Vertrags mit dem Nutzer selbst nutzen (Abs. 13).

**Geschäftsgeheimnisse** sind kein Freibrief zur Verweigerung. Der Dateninhaber (oder der Geheimnisinhaber) benennt die geschützten Daten und vereinbart mit dem Nutzer angemessene Schutzmaßnahmen, etwa Vertraulichkeitsvereinbarungen und Zugangsprotokolle. Erst ohne Einigung, bei nicht umgesetzten Maßnahmen oder verletzter Vertraulichkeit darf er die Weitergabe dieser Daten verweigern oder aussetzen, schriftlich begründet und mit Meldung an die Behörde. Eine Ablehnung im Einzelfall ist nur unter außergewöhnlichen Umständen möglich, wenn der Geheimnisinhaber nachweist, dass ihm trotz der Schutzmaßnahmen mit hoher Wahrscheinlichkeit ein schwerer wirtschaftlicher Schaden droht (Stützangabe Art. 4 Abs. 6 bis 8 Data Act).

Zwei Regeln begrenzen die Pflichten: Daten aus Produkten und Diensten von Kleinst- und Kleinunternehmen sind ausgenommen, sofern diese kein größeres Partner- oder verbundenes Unternehmen haben; für mittlere Unternehmen gilt die Ausnahme nur befristet (Stützangabe Art. 7 Abs. 1 Data Act). Vertragsklauseln, die zum Nachteil des Nutzers dessen Rechte ausschließen, davon abweichen oder ihre Wirkung abändern, sind für ihn nicht bindend (Stützangabe Art. 7 Abs. 2 Data Act). Stand Oktober 2026, vor Verwendung prüfen.

### Weitergabe an Dritte, Gegenleistung und Vertragsklauseln

Der Nutzer oder eine in seinem Namen handelnde Partei kann verlangen, dass der Dateninhaber die ohne Weiteres verfügbaren Daten einem Dritten bereitstellt, etwa einem Analysedienstleister; für den Nutzer ist das unentgeltlich. Als Torwächter benannte Unternehmen (große Plattformbetreiber nach dem Gesetz über digitale Märkte) sind keine zugelassenen Dritten (Stützangabe Art. 5 Abs. 1, 3 Data Act).

Wer als Dritter Daten erhält, verarbeitet sie **nur zu den Zwecken und unter den Bedingungen, die er mit dem Nutzer vereinbart hat**, und löscht sie, sobald sie dafür nicht mehr benötigt werden, sofern mit dem Nutzer in Bezug auf nicht-personenbezogene Daten nichts anderes vereinbart wurde (Stützangabe Art. 6 Abs. 1 Data Act). Untersagt sind ihm unter anderem Profiling, außer es ist für den gewünschten Dienst erforderlich, die Weitergabe an einen weiteren Dritten, außer auf Grundlage eines Vertrags mit dem Nutzer, oder an einen Torwächter, die Entwicklung eines konkurrierenden Produkts, Einblicke in die wirtschaftliche Lage des Dateninhabers und das Missachten vereinbarter Geheimnisschutzmaßnahmen (Stützangabe Art. 6 Abs. 2 Data Act).

Muss der Dateninhaber einem Datenempfänger Daten bereitstellen, müssen die Bedingungen fair, angemessen und nichtdiskriminierend sein. Eine Gegenleistung muss diskriminierungsfrei und angemessen sein und darf eine Marge enthalten; zu berücksichtigen sind insbesondere die Kosten der Bereitstellung (Formatierung, elektronische Verbreitung, Speicherung). Ist der Datenempfänger ein kleines oder mittleres Unternehmen (KMU; weniger als 250 Beschäftigte und weitere Umsatz- oder Bilanzgrenzen nach der Empfehlung 2003/361/EG) ohne Partner- oder verbundene Unternehmen, die kein KMU sind, darf sie diese Kosten nicht übersteigen; der Dateninhaber legt die Berechnungsgrundlage offen (Stützangabe Art. 8 Abs. 1, Art. 9 Abs. 1, 2, 4, 7 Data Act). Daneben sind einseitig auferlegte, missbräuchliche Klauseln zu Datenzugang, Datennutzung und Haftung zwischen Unternehmen nicht bindend (Stützangabe Art. 13 Data Act). Stand Oktober 2026, vor Verwendung prüfen.

### Wechsel von Cloud-Diensten

Auch Brevanta nutzt Cloud-Dienste für Analyseumgebungen und ist dann Kunde. Ein **Datenverarbeitungsdienst** ist eine digitale Dienstleistung, die einem Kunden ortsunabhängigen, auf Abruf verfügbaren Netzzugang zu einem gemeinsam genutzten Pool skalierbarer, elastischer Rechenressourcen ermöglicht, die mit minimalem Verwaltungsaufwand bereitgestellt werden; die Erwägungsgründe nennen Infrastruktur, Plattform und Software als Dienst (Stützangabe Art. 2 Nr. 8, Erwägungsgrund 81 Data Act).

Der Anbieter stellt dem Kunden vor der Unterzeichnung einen speicherbaren schriftlichen Vertrag bereit, der mindestens enthält: eine maximale **Ankündigungsfrist** für die Einleitung des Wechsels von höchstens zwei Monaten; einen verbindlichen **Übergangszeitraum** von regelmäßig höchstens 30 Kalendertagen ab Ablauf der Ankündigungsfrist, in dem der Anbieter unterstützt, den Betrieb fortführt und die Sicherheit gewährleistet; eine Mindestfrist von 30 Kalendertagen für den **Datenabruf** nach dem Übergangszeitraum; die Löschung der exportierbaren Daten (Eingabe- und Ausgabedaten samt Metadaten, ohne geschützte Daten des Anbieters oder Dritter) danach, sofern der Wechsel vollzogen ist; und die Wechselentgelte (Stützangabe Art. 25 Abs. 1, 2 Data Act). Ist der Übergangszeitraum technisch nicht durchführbar, nennt der Anbieter nach begründeter Mitteilung binnen 14 Arbeitstagen einen alternativen Zeitraum von höchstens sieben Monaten; der Kunde kann den Übergangszeitraum einmal verlängern (Stützangabe Art. 25 Abs. 4, 5 Data Act).

**Wechselentgelte** sind Entgelte außer den Standarddienstentgelten und Sanktionen bei vorzeitiger Kündigung, einschließlich der Entgelte für das Extrahieren der Daten (Stützangabe Art. 2 Nr. 35, 36 Data Act). Vom 11. Januar 2024 bis zum 12. Januar 2027 dürfen Anbieter ermäßigte Entgelte erheben, die ihre unmittelbar mit dem Wechsel verbundenen Kosten nicht übersteigen; ab dem 12. Januar 2027 dürfen sie keine Wechselentgelte mehr erheben, die laufende Vergütung bis zum Vertragsende bleibt zulässig (Stützangabe Art. 29 Abs. 1 bis 3, Art. 2 Nr. 36 Data Act). Technisch müssen Anbieter den Wechsel unterstützen, etwa durch offene Schnittstellen (Stützangabe Art. 30 Data Act); für auf einen Kunden zugeschnittene Dienste gelten einzelne Pflichten nicht (Stützangabe Art. 31 Data Act). Stand Oktober 2026, vor Verwendung prüfen.

### Abgrenzung: Datenschutz, Datenbankrecht und Durchsetzung

Der Data Act gilt unbeschadet des Datenschutzrechts; bei einem Widerspruch hat das Datenschutzrecht Vorrang (Stützangabe Art. 1 Abs. 5 Data Act). Er schafft **keine Rechtsgrundlage** für personenbezogene Daten (Folgerung aus Art. 4 Abs. 12 Data Act). Enthalten Produktdaten solche Angaben, etwa die Kennung der Bedienperson (siehe den folgenden Abschnitt „Zweckbindung und Rechtsgrundlage — grundlagenorientiert“ zu Maschinendaten mit Bediener-ID), und ist der Nutzer nicht die betroffene Person, darf der Dateninhaber sie nur bereitstellen, wenn es dafür eine gültige Rechtsgrundlage nach der DSGVO gibt (Stützangabe Art. 4 Abs. 12, Art. 5 Abs. 7 Data Act). Profiling und automatisierte Einzelentscheidungen behandeln Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“ und Thema 11.3 „Datenschutz und Schutzziele der Datensicherheit in der Datenanalyse“ im Fachgebiet „Datenqualität, Datenschutz und Datensicherheit“.

Beim **Datenbankrecht** findet das Schutzrecht des Datenbankherstellers keine Anwendung, wenn die Daten mit einem vom Data Act erfassten vernetzten Produkt oder verbundenen Dienst erlangt oder erzeugt wurden; das stellt § 87b Abs. 3 UrhG seit dem 30. Mai 2026 klar (Stützangabe Art. 43 Data Act). Ein Hersteller kann den Zugang daher nicht mit diesem Recht abwehren (Folgerung).

Das Datenanalyse-Team ergänzt sein Prüfschema um die Fragen nach den Rollen, dem Zugangsanspruch samt Ausnahmen, den Bedingungen (Zweck, Löschung, Geheimnisschutz, Gegenleistung) und der Rechtsgrundlage für personenbezogene Angaben; das Ergebnis gehört ins Prüfprotokoll und in den Datenkatalog (Thema 9.1 „Heterogene Datenquellen identifizieren und klassifizieren“ im selben Fachgebiet).

Bei Rechtsverletzungen steht die Beschwerde bei der zuständigen Behörde, der Gerichtsweg oder eine zugelassene Streitbeilegungsstelle offen, deren Entscheidung nur bindet, wenn die Parteien vorher zugestimmt haben (Stützangabe Art. 38, 39, 10 Abs. 12 Data Act). Verstöße können als Ordnungswidrigkeit geahndet werden (Stützangabe § 15 DADG). Die Kommission hat im November 2025 vorgeschlagen, den Data Act im Rahmen eines „Digital-Omnibus“ zu ändern; der Vorschlag ist im Oktober 2026 nicht beschlossen. Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 9.2 (anhängen)

#### K-9.2-21
**Frage:** Was regelt der Data Act, und für welche Daten gilt er?
**Antwort:** Er regelt Zugang, Nutzung und Weitergabe von Daten, die vernetzte Produkte (z. B. Maschinen) und verbundene Dienste erzeugen, und den Wechsel zwischen Cloud-Diensten. Er gilt für personenbezogene und nicht-personenbezogene Daten.
`tags: data-act, datenzugang` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-9.2-22
**Frage:** Wer ist im Data Act Nutzer, Dateninhaber und Dritter?
**Antwort:** Nutzer: wer ein vernetztes Produkt besitzt oder vertraglich zeitweise nutzt (z. B. Miete, Leasing). Dateninhaber: wer die Daten nutzen und bereitstellen darf oder muss, oft der Hersteller. Dritter: wem der Dateninhaber auf Verlangen des Nutzers Daten gibt.
`tags: data-act, rollen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-9.2-23
**Frage:** Was kann ein Nutzer vom Dateninhaber verlangen, wenn er nicht direkt an die Produktdaten kommt?
**Antwort:** Die ohne Weiteres verfügbaren Daten samt Metadaten, unverzüglich, sicher, unentgeltlich und maschinenlesbar, auf einfaches Verlangen auf elektronischem Wege; soweit technisch machbar kontinuierlich und in Echtzeit.
`tags: data-act, zugangsrecht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-9.2-24
**Frage:** Welche Grenzen gelten für Nutzer und Dateninhaber beim Umgang mit den Daten?
**Antwort:** Der Nutzer darf die Daten nicht für ein konkurrierendes vernetztes Produkt verwenden. Der Dateninhaber darf nicht-personenbezogene Daten nur auf Vertragsgrundlage mit dem Nutzer selbst nutzen. Klauseln, die Nutzerrechte zu dessen Nachteil ausschließen, binden den Nutzer nicht.
`tags: data-act, grenzen, vertragsklauseln` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-9.2-25
**Frage:** Darf ein Hersteller den Zugang zu Maschinendaten pauschal mit Geschäftsgeheimnissen verweigern?
**Antwort:** Nein. Er benennt die geschützten Daten und vereinbart mit dem Nutzer Schutzmaßnahmen. Erst ohne Einigung oder bei Verstößen darf er die Weitergabe dieser Daten begründet aussetzen und muss die Behörde informieren.
`tags: data-act, geschaeftsgeheimnis` · `schwierigkeit: schwer` · `bloom: bewerten`

#### K-9.2-26
**Frage:** Welche Pflichten hat ein Dritter, der Daten auf Verlangen des Nutzers erhält?
**Antwort:** Er nutzt sie nur zu den mit dem Nutzer vereinbarten Zwecken und löscht sie, sobald sie nicht mehr benötigt werden. Untersagt sind u. a. unnötiges Profiling, Weitergabe an Torwächter und Nutzung für konkurrierende Produkte.
`tags: data-act, dritte, zweckbindung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-9.2-27
**Frage:** Welche Fristen und Entgelte gelten beim Wechsel eines Cloud-Dienstes?
**Antwort:** Ankündigungsfrist höchstens zwei Monate, danach regelmäßig ein Übergangszeitraum von höchstens 30 Kalendertagen (bei technischer Undurchführbarkeit länger), danach Datenabruf von mindestens 30 Kalendertagen. Ab dem 12.01.2027 keine Wechselentgelte mehr.
`tags: data-act, cloud-wechsel, fristen` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-9.2-28
**Frage:** Wie verhalten sich Data Act und Datenschutzrecht bei Maschinendaten mit Bediener-Kennung?
**Antwort:** Der Datenschutz hat Vorrang; der Data Act schafft keine Rechtsgrundlage. Die Kennung darf nur mit gültiger Rechtsgrundlage weitergegeben werden; braucht der Analysezweck sie nicht, bleibt sie von vornherein weg (Datenminimierung).
`tags: data-act, datenschutz, personenbezug` · `schwierigkeit: mittel` · `bloom: anwenden`

## C. Quiz 9.2 (anhängen)

#### Q-9.2-14 · Multiple Choice
**Frage:** Eine Spedition hat zwei vernetzte Kühlaggregate von einem Hersteller geleast. Der Hersteller erhält die Betriebsdaten über sein Portal, die Spedition kommt nicht direkt an die Daten. Welche Rolle hat die Spedition im Data Act?
- [ ] Dateninhaberin, weil die Daten im laufenden Betrieb ihrer Fahrzeuge entstehen
- [x] Nutzerin, weil ihr die Aggregate vertraglich zeitweise überlassen sind
- [ ] Dritte, weil sie nicht Eigentümerin der Aggregate ist
- [ ] Datenempfängerin, weil der Hersteller ihr die Daten schuldet
**Erklärung:** Nutzer ist, wer ein vernetztes Produkt besitzt oder dem vertraglich zeitweilige Rechte daran übertragen sind, etwa durch Leasing. Dateninhaber ist hier der Hersteller, der die Daten erhält und bereitstellen muss.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.2-15 · Zuordnung
**Anweisung:** Ordne jeden Begriff des Data Act seiner Bedeutung zu.
- Vernetztes Produkt ↔ Gegenstand, der Daten über Nutzung oder Umgebung erzeugt und übermitteln kann
- Nutzer ↔ wer das Produkt besitzt oder vertraglich zeitweise nutzt
- Dateninhaber ↔ wer die Daten nutzen und bereitstellen darf oder muss
- Dritter ↔ wem der Dateninhaber auf Verlangen des Nutzers Daten gibt
**Erklärung:** Die Rollen entscheiden darüber, wer Zugang verlangen kann, wer bereitstellen muss und wen welche Pflichten treffen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-9.2-16 · Wahr/Falsch
**Aussage:** Eine Klausel in den Bedingungen eines Herstellers, die dem Nutzer den Zugang zu den Maschinendaten zu seinem Nachteil ausschließt, bindet den Nutzer, sobald er den Bedingungen zugestimmt hat.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Vertragsklauseln, die zum Nachteil des Nutzers dessen Zugangsrechte ausschließen, davon abweichen oder ihre Wirkung abändern, sind für ihn nicht bindend.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-9.2-17 · Multiple Choice
**Frage:** Ein Hersteller weigert sich, Prozessdaten seiner Anlage herauszugeben, weil sie Geschäftsgeheimnisse enthielten. Schutzmaßnahmen hat er dem Nutzer nicht angeboten. Was gilt?
- [ ] Er darf den Zugang pauschal ablehnen, solange er sich auf ein Geschäftsgeheimnis beruft.
- [x] Er benennt die geschützten Daten und vereinbart mit dem Nutzer Schutzmaßnahmen.
- [ ] Er muss die Daten ohne jede Schutzmaßnahme vollständig offenlegen.
- [ ] Er darf den Zugang vom Entgelt des Nutzers abhängig machen.
**Erklärung:** Geschäftsgeheimnisse werden durch vereinbarte Maßnahmen gewahrt. Verweigern oder aussetzen darf der Dateninhaber erst, wenn keine Einigung zustande kommt oder Maßnahmen verletzt werden; die Bereitstellung an den Nutzer ist unentgeltlich.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-9.2-18 · Mehrfachauswahl
**Frage:** Ein Analysedienstleister hat Maschinendaten auf Verlangen des Nutzers vom Hersteller erhalten. Was ist ihm untersagt?
- [x] Die Daten zur Entwicklung eines Konkurrenzprodukts zur Maschine nutzen
- [x] Die Daten ohne Vertrag mit dem Nutzer an einen weiteren Dritten weitergeben
- [ ] Die Daten zu dem mit dem Nutzer vereinbarten Zweck auswerten
- [x] Die Daten für Profiling nutzen, das der gewünschte Dienst nicht erfordert
- [ ] Die Daten löschen, sobald der vereinbarte Zweck erfüllt ist
**Erklärung:** Der Dritte bleibt an die mit dem Nutzer vereinbarten Zwecke gebunden und muss die Daten löschen, wenn sie nicht mehr benötigt werden. Konkurrenzprodukte, unnötiges Profiling und die Weitergabe ohne Vertrag mit dem Nutzer sind ausgeschlossen.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-9.2-19 · Entweder-Oder
**Frage:** Eine Maschine liefert Daten samt Bediener-Kennung, die sich einer Beschäftigten des Nutzers zuordnen lässt. Der Hersteller soll sie auf Verlangen des Nutzers an dessen Analysedienstleister geben. Wie ist das einzuschätzen?
- [ ] Der Data Act erlaubt die Weitergabe ohne weitere Prüfung, da er das Datenschutzrecht verdrängt und selbst die Grundlage bildet.
- [x] Es braucht zusätzlich eine datenschutzrechtliche Rechtsgrundlage, weil der Datenschutz vorgeht.
**Erklärung:** Der Data Act gilt unbeschadet des Datenschutzes und schafft keine Rechtsgrundlage. Besser bleibt die Kennung weg, wenn der Analysezweck sie nicht braucht.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-9.2-20 · Sortieren
**Anweisung:** Bringe die Phasen eines Anbieterwechsels bei einem Cloud-Dienst in die zeitliche Reihenfolge.
1. Ankündigungsfrist nach der Mitteilung des Wechselwunschs
2. Übergangszeitraum, in dem der Anbieter die Übertragung unterstützt
3. Abrufzeitraum für die exportierbaren Daten
4. Vollständige Löschung der exportierbaren Daten beim bisherigen Anbieter
**Erklärung:** Der Übergangszeitraum beginnt nach Ablauf der Ankündigungsfrist, der Datenabruf nach dem Übergangszeitraum, und erst danach werden die Daten gelöscht, sofern der Wechsel vollzogen ist.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.2-21 · Kurzantwort
**Frage:** Ein Kunde teilt seinem Cloud-Anbieter am Montag, 08.03.2027, den Wechselwunsch mit. Die Ankündigungsfrist darf höchstens zwei Monate betragen. Der Tag der Mitteilung bleibt unberücksichtigt, eine nach Monaten bemessene Frist endet am gleichen Kalendertag des betreffenden Folgemonats, Feiertagsregeln bleiben außer Betracht. An welchem Datum (TT.MM.JJJJ) endet die längstmögliche Ankündigungsfrist?
**Akzeptierte Antworten:** 08.05.2027; 08.05.2027.; 8.5.2027; 8.5.2027.; 08. 05. 2027; 8. 5. 2027; 08. Mai 2027; 8. Mai 2027; 08 Mai 2027; 8 Mai 2027
**Erklärung:** Zwei Monate nach dem 08.03.2027 enden am Samstag, 08.05.2027. Danach folgen der Übergangszeitraum von höchstens 30 Kalendertagen und der Datenabruf von mindestens 30 Kalendertagen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-9.2-22 · Multiple Choice
**Frage:** Ein Standard-Cloud-Anbieter berechnet im Februar 2027 für den Export der Daten beim Anbieterwechsel eines Kunden ein gesondertes Entgelt je Terabyte. Wie ist das nach der Rechtslage einzuschätzen?
- [ ] Zulässig, aber nur bis zur Höhe der Kosten, die dem Anbieter unmittelbar durch den Wechsel entstehen
- [ ] Zulässig, sofern das Entgelt vor Vertragsschluss klar und transparent vereinbart wurde
- [x] Unzulässig, weil seit dem 12.01.2027 keine Wechselentgelte mehr erhoben werden dürfen
- [ ] Zulässig, wenn der Kunde ein Unternehmen mit mehr als 50 Beschäftigten ist
**Erklärung:** Bis zum 12.01.2027 waren nur ermäßigte Entgelte bis zur Höhe der Wechselkosten erlaubt, danach gar keine mehr. Die laufende Vergütung bis zum Vertragsende bleibt zulässig.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-9.2-23 · Lückentext
**Text:** Sind Daten mit einem vom Data Act erfassten vernetzten Produkt erzeugt worden, kann der Hersteller den Zugang nicht mit seinem Recht als ___Datenbankhersteller___ abwehren.
**Erklärung:** Das Schutzrecht des Datenbankherstellers findet bei solchen Daten keine Anwendung; Verträge und der Schutz von Geschäftsgeheimnissen bleiben davon unberührt.
`schwierigkeit: mittel` · `bloom: erinnern`
