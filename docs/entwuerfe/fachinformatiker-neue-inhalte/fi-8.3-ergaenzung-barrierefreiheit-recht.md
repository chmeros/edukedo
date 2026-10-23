# Entwurf Fachinformatiker Anwendungsentwicklung, Barrierefreiheit als Rechtspflicht (BITV 2.0, BFSG, Barrierefreiheitsinformationen, EN 301 549, WCAG als Maßstab): Ergänzung im Thema 8.3

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil M des Pakets P-AY Fachinformatiker (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-12, dort „P-AX im Einzelnen“ Teil F). **Nur Kurs Anwendungsentwicklung.** Einzufügen in `content/fachinformatiker-anwendungsentwicklung/ae1/8.3-benutzerschnittstellen-ergonomie.md`: Abschnitt A **vor der Überschrift „### Prototyping und Abstimmung mit dem Kunden“** (Anker; die Theorie steht damit hinter „### Barrierefreiheit“ und vor dem Prototyping), B an die Karteikarten hinter K-8.3-20, C an das Quiz hinter Q-8.3-13. Bestand gezählt (Stand 23.10.2026): 20 Karteikarten (K-8.3-01 bis -20, lückenlos), 13 Quizfragen (Q-8.3-01 bis -13, lückenlos); `git log -S` auf K-8.3-21 und Q-8.3-14 ergibt im Ordner `content/fachinformatiker-anwendungsentwicklung` keine entfernten IDs (Treffer betreffen andere Kurse). Die neuen IDs sind K-8.3-21 bis -26 (6 Karten) und Q-8.3-14 bis -21 (8 Quizfragen, davon 1 Kurzantwort mit einem Stichtag). Einen Fall und ein Fachgespräch gibt es nicht (`ae1` hat keine `fachgespraech.md`; die bestehende Fallaufgabe F-AE1-03 bleibt unverändert). Die Rechtsangaben stehen in `rechtsangaben-m.md`, die Ersetzung im Bestand in `ersetzungen-m.json` (ein Paar in `ae1/8.3`). Der `rechtsstand` von `ae1/8.3` wird beim Einspielen gesetzt.

**Zweck.** Der Bestand nennt Barrierefreiheit technisch ausführlich (Prinzipien der WCAG, Konformitätsstufen, Kontrast, Formulare), die rechtliche Seite aber nur in einem einzigen Satz, der BITV 2.0 und das Barrierefreiheitsstärkungsgesetz erwähnt und die Klärung dem Einzelfall überlässt. Die Ergänzung ordnet beide Regelwerke ein: wen sie treffen, wann ein Online-Shop erfasst ist, wer als Kleinstunternehmen ausgenommen ist, welche Pflichten der Anbieter hat (Anforderungen erfüllen, Informationen bereitstellen), woran sich die Umsetzung technisch misst (Verordnung, EN 301 549, WCAG) und wie die Durchsetzung läuft. Die Sicht ist die einer Fachinformatikerin oder eines Fachinformatikers Anwendungsentwicklung, die oder der Weboberflächen für Kundschaft baut und den Kunden berät, nicht die der Rechtsabteilung. Nicht Gegenstand (steht im Bestand oder anderswo): die technischen Maßnahmen und die WCAG im Einzelnen (Bestand von Thema 8.3), Barrierefreiheit als Anforderung im Pflichtenheft (Thema 10.2), die Barrierefreiheit von Dokumentationen und Arbeitsplätzen (Fachgebiet Dokumentation und Arbeitsplatz, unverändert), Produkte nach dem Gesetz (Geldautomaten, E-Book-Lesegeräte und andere Hardware), Landesrecht für Landes- und Kommunalbehörden, Bußgeldhöhen und Zuständigkeitsverteilung der Länder, Impressum und Datenschutz.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten und Quiz (die gebräuchlichen Kurznamen BFSG und BITV als Thema sind dort erlaubt, ebenso die Bezeichnung der Norm EN 301 549 und der Leitlinien WCAG). Rechtsgrundlagen am Rohtext gelesen (BFSG, BFSGV, BITV 2.0, BGG, DDG, BGB §§ 13 und 310 von `gesetze-im-internet.de`; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-m.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Fassung der EN 301 549 und ihre Nennung im Amtsblatt der Europäischen Union (nur aus Sekundärquellen belegt; der Lerntext nennt nur die Regel „Vermutung bei Nennung im Amtsblatt, sonst Stand der Technik“ und die Fassung 3.2.1 für öffentliche Stellen), die Auslegung der Behörden und Gerichte zum Anwendungsbereich bei Mischformen, die Durchsetzungspraxis der Länder. Rechtsprechung ist nicht ausgewertet. Namen und Zahlen: keine Fallfirma; die Quizfragen nutzen gekennzeichnete Beispielwerte.

---

# Thema 8.3

## A. Theorie-Ergänzung 8.3 (einfügen vor „### Prototyping und Abstimmung mit dem Kunden“)

### Barrierefreiheit als Rechtspflicht: BITV und BFSG

Zwei Regelwerke mit verschiedenen Adressaten sind zu unterscheiden. Die **BITV 2.0** (Barrierefreie-Informationstechnik-Verordnung) betrifft öffentliche Stellen des Bundes: Ihre Websites, mobilen Anwendungen und elektronisch unterstützten Verwaltungsabläufe sind barrierefrei zu gestalten (Ausnahmen bei unverhältnismäßiger Belastung), und sie veröffentlichen eine **Erklärung zur Barrierefreiheit** mit Kontaktmöglichkeit und Schlichtungshinweis; bei Beschaffung und Entwicklung ist die Barrierefreiheit von Anfang an zu berücksichtigen (Stützangabe §§ 2, 7 BITV 2.0; §§ 12, 12a, 12b BGG, Behindertengleichstellungsgesetz). Für Länder und Kommunen gilt Landesrecht (nicht dargestellt).

Das **Barrierefreiheitsstärkungsgesetz (BFSG)** gilt für Anbieter bestimmter Produkte und Dienstleistungen für Verbraucher:innen, gleich ob Unternehmen oder andere Personen; angewandt wird es seit dem 28.06.2025 (Stützangabe § 1 Abs. 2 und 3, § 2 Nr. 4, 15 BFSG). Verbraucher:innen sind natürliche Personen, die überwiegend nicht gewerblich oder beruflich handeln (Stützangabe § 2 Nr. 16). Für Shops und vergleichbare Angebote im Netz ist vor allem die Gruppe der **Dienstleistungen im elektronischen Geschäftsverkehr** maßgeblich (Banken, Verkehr, Telekommunikation und E-Books haben eigene Gruppen): digitale Dienste auf Websites oder in mobilen Apps, die einer Verbraucherin oder einem Verbraucher auf deren oder dessen individuelle Anfrage erbracht werden, damit ein Verbrauchervertrag zustande kommt (Stützangabe § 2 Nr. 26). Ein Online-Shop, in dem Privatpersonen bestellen, gehört dazu. Reine Informationsseiten und Shops nur für Geschäftskundschaft werden nach dem Wortlaut nicht erfasst; bei Mischformen, etwa einer Terminbuchung, entscheidet der Einzelfall (Auslegung). Nicht erfasst sind unter anderem fremde, nicht kontrollierte Inhalte und seit dem Stichtag nicht mehr aktualisierte Archive (Stützangabe § 1 Abs. 4).

**Kleinstunternehmen** sind für Dienstleistungen ausgenommen: Unternehmen mit weniger als zehn Beschäftigten, die entweder einen Jahresumsatz von höchstens 2 Millionen Euro erzielen oder deren Jahresbilanzsumme diese Grenze nicht überschreitet; verbundene Unternehmen sind hier nicht dargestellt (Stützangabe § 3 Abs. 3, § 2 Nr. 17). Die Ausnahme hängt am Anbieter, also am Betreiber des Shops, nicht an der Agentur, die ihn baut. Übergangsregeln (Stützangabe § 38) betreffen vor allem bereits eingesetzte Produkte und vor dem Stichtag geschlossene Dienstleistungsverträge; ihre Reichweite für bestehende Webangebote ist hier nicht dargestellt. Stand Oktober 2026, vor Verwendung prüfen.

### Pflichten der Anbieter, Maßstab und Durchsetzung

**Pflichten.** Pflichtadressat ist der Anbieter der Dienstleistung, nicht die Entwicklungsseite, solange diese die Dienstleistung nicht selbst gegenüber Verbraucher:innen anbietet; sie wird über Vertrag und Pflichtenheft eingebunden (Praxis). Der Anbieter darf seine Dienstleistung nur anbieten, wenn sie die Anforderungen erfüllt und er Informationen dazu erstellt und barrierefrei zugänglich gemacht hat; er hat die Anforderungen dauerhaft zu erfüllen (Stützangabe § 14 Abs. 1, 3 BFSG). Die Informationen stehen in den Allgemeinen Geschäftsbedingungen oder an anderer deutlich wahrnehmbarer Stelle und enthalten unter anderem eine Beschreibung der Dienstleistung in barrierefreiem Format, die Darstellung, wie sie die Anforderungen erfüllt, und die zuständige Marktüberwachungsbehörde (Stützangabe Anlage 3 Nr. 1). Im Alltag heißt dieser Text oft „Barrierefreiheitserklärung“ (Praxis); das Gesetz kennt das Wort nicht, und die Erklärung nach der BITV ist ein eigenes Instrument. Der Anbieter kann geltend machen, dass die Erfüllung die Dienstleistung grundlegend verändern oder ihn unverhältnismäßig belasten würde; er beurteilt und dokumentiert das und unterrichtet die Behörde (Stützangabe §§ 16, 17).

**Maßstab.** Die konkreten Anforderungen stehen in der Verordnung zum BFSG (BFSGV), nicht im Gesetz. Websites, zugehörige Online-Anwendungen und mobile Apps sind „wahrnehmbar, bedienbar, verständlich und robust“ zu gestalten, im Online-Handel ausdrücklich auch Identifizierungs-, Authentifizierungs-, Sicherheits- und Zahlungsfunktionen (Stützangabe § 12 Nr. 3, § 19 BFSGV). Das sind die vier Prinzipien der WCAG. Wörtlich nennen weder Gesetz noch Verordnung die WCAG oder die EN 301 549; es gilt der Stand der Technik (Stützangabe § 3 BFSGV). Entspricht ein Dienst einer harmonisierten Norm, deren Fundstelle im Amtsblatt der Europäischen Union veröffentlicht ist, wird die Erfüllung vermutet, soweit die Norm die Anforderungen abdeckt (Stützangabe § 4 BFSG); sonst bleibt es beim Stand der Technik. Die **EN 301 549** ist die europäische Norm zur Barrierefreiheit von Informations- und Kommunikationstechnik und übernimmt für Webinhalte die WCAG. Ob die Vermutung für das BFSG greift, hängt davon ab, welche Fassung der Norm im Amtsblatt genannt ist; für Websites öffentlicher Stellen nach der EU-Web-Richtlinie ist die Fassung 3.2.1 (WCAG 2.1, Stufen A und AA) die harmonisierte Norm. In der Praxis dient WCAG Stufe AA als üblicher Prüfmaßstab, ohne Gesetzestext zu sein (Praxis).

**Durchsetzung.** Nach Landesrecht zuständige Marktüberwachungsbehörden prüfen bei Anlass und in Stichproben. Stellen sie Mängel fest, fordern sie zur Abhilfe in einer Frist auf; handelt der Anbieter nicht, folgt eine erneute Aufforderung mit Androhung der Untersagung und, wenn auch das nichts bewirkt, sind die erforderlichen Maßnahmen zu treffen, etwa die Anordnung, das Angebot einzustellen (Stützangabe §§ 28, 29). Verbraucher:innen, die ein Angebot wegen eines Verstoßes nicht oder nur eingeschränkt nutzen können, und anerkannte Verbände, deren Aufgabenbereich berührt ist, können ein Verfahren beantragen und die Schlichtung anrufen (Stützangabe §§ 32, 34); ein Verstoß kann als Ordnungswidrigkeit mit einer Geldbuße belegt werden (Stützangabe § 37). Für die Entwicklung heißt das: Pflicht klären, Anforderungen im Pflichtenheft festhalten, mit Nutzertests prüfen, Informationen mitliefern; die rechtliche Beurteilung bleibt beim Auftraggeber (Praxis). Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 8.3 (anhängen)

#### K-8.3-21
**Frage:** Wie unterscheiden sich BITV und BFSG, wen verpflichten sie?
**Antwort:** Die BITV verpflichtet öffentliche Stellen des Bundes zu barrierefreien Websites und Apps. Das BFSG gilt seit dem 28.06.2025 für Anbieter bestimmter Produkte und Dienstleistungen für Verbraucher:innen. Länder und Kommunen: Landesrecht.
`tags: bfsg, bitv, barrierefreiheit, recht` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.3-22
**Frage:** Wann ist ein Online-Shop vom BFSG erfasst?
**Antwort:** Wenn er über Website oder App auf individuelle Anfrage von Verbraucher:innen den Abschluss eines Verbrauchervertrags ermöglicht, z. B. ein Shop für Privatpersonen. Reine Informationsseiten und reine Geschäftskunden-Shops nicht; Mischformen sind Einzelfall.
`tags: bfsg, online-shop, anwendungsbereich` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-8.3-23
**Frage:** Welche Ausnahme gibt es für Kleinstunternehmen, und woran hängt sie?
**Antwort:** Anbieter von Dienstleistungen mit weniger als zehn Beschäftigten und höchstens 2 Mio. € Jahresumsatz oder Bilanzsumme sind ausgenommen. Sie hängt am Betreiber des Shops, nicht an der Agentur, die ihn entwickelt.
`tags: bfsg, kleinstunternehmen, ausnahme` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-8.3-24
**Frage:** Was muss ein Anbieter nach dem BFSG über seine Dienstleistung bereitstellen, und wer ist Pflichtadressat?
**Antwort:** Pflichtadressat ist der Anbieter. Er stellt Informationen in den AGB oder deutlich wahrnehmbar bereit: Beschreibung der Dienstleistung, wie sie die Anforderungen erfüllt, zuständige Marktüberwachungsbehörde. Im Alltag oft „Barrierefreiheitserklärung“ genannt (Praxis).
`tags: bfsg, informationspflicht, barrierefreiheitserklaerung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-8.3-25
**Frage:** Wann muss ein Anbieter die Anforderungen nicht oder nur eingeschränkt erfüllen, und was muss er dann tun?
**Antwort:** Bei grundlegender Veränderung der Dienstleistung oder unverhältnismäßiger Belastung. Er beurteilt das, dokumentiert die Beurteilung und unterrichtet die Marktüberwachungsbehörde. Ein Freibrief ist das nicht.
`tags: bfsg, unverhaeltnismaessige-belastung, ausnahme` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-8.3-26
**Frage:** Woran misst sich die Barrierefreiheit einer Shop-Oberfläche, und welche Rolle spielen EN 301 549 und WCAG?
**Antwort:** Die Verordnung verlangt wahrnehmbar, bedienbar, verständlich, robust, auch bei Anmeldung und Zahlung. WCAG und EN 301 549 stehen nicht im Gesetzestext; die Norm kann Konformität vermuten lassen, wenn sie im Amtsblatt genannt ist. WCAG AA ist Praxis-Maßstab.
`tags: bfsg, en-301-549, wcag, massstab` · `schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 8.3 (anhängen)

#### Q-8.3-14 · Multiple Choice
**Frage:** Ein Softwarehaus entwickelt für ein Unternehmen mit 40 Beschäftigten (Beispielwert) einen Online-Shop für Gartenbedarf, in dem Privatpersonen bestellen. Welche Aussage zur Barrierefreiheit trifft zu?
- [ ] Die BITV gilt, weil der Shop eine öffentlich erreichbare Website ist.
- [ ] Barrierefreiheit ist für private Shops nur eine freiwillige Qualitätsfrage.
- [x] Das BFSG gilt, weil in dem Shop online Verbraucherverträge geschlossen werden.
- [ ] Die Pflicht trifft allein das Softwarehaus als Entwickler, nicht das Unternehmen als Betreiber des Shops.
**Erklärung:** Ein Online-Shop für Privatpersonen ist eine Dienstleistung im elektronischen Geschäftsverkehr und fällt unter das BFSG, sofern keine Ausnahme (etwa für Kleinstunternehmen) greift. Die BITV richtet sich an öffentliche Stellen; Pflichtadressat ist der Anbieter des Shops.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.3-15 · Wahr/Falsch
**Aussage:** Ein Online-Shop, der ausschließlich an Geschäftskundschaft verkauft, ist als Dienstleistung für Verbraucher:innen vom BFSG erfasst.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Das BFSG knüpft an Verbraucherverträge an. Ein Shop nur für Geschäftskundschaft ist nach dem Wortlaut nicht erfasst; bei gemischter Kundschaft entscheidet der Einzelfall.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.3-16 · Multiple Choice
**Frage:** Ein Blumenhandel mit 4 Beschäftigten und 450.000 € Jahresumsatz (Beispielwerte) betreibt einen Online-Shop für Privatkundschaft und lässt ihn neu entwickeln. Welche Aussage zum BFSG trifft zu?
- [ ] Der Shop muss barrierefrei sein, weil jede Website erfasst ist.
- [x] Als Kleinstunternehmen ist der Betreiber für den Shop ausgenommen.
- [ ] Die Agentur muss die Pflicht übernehmen, weil sie den Shop als Hersteller baut.
- [ ] Die Ausnahme gilt nur, wenn der Shop weniger als zehn Produkte führt.
**Erklärung:** Kleinstunternehmen sind für Dienstleistungen ausgenommen; maßgeblich sind Beschäftigtenzahl sowie Umsatz oder Bilanzsumme des Betreibers. Barrierefreie Gestaltung bleibt trotzdem sinnvoll und kann vertraglich vereinbart werden.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-8.3-17 · Kurzantwort
**Frage:** Seit welchem Datum wird das BFSG angewendet? Antworte im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 28.06.2025; 28.6.2025; 28. 6. 2025; 28.06.2025.; 28. Juni 2025; 28 Juni 2025; 28.06.25; 28.6.25
**Erklärung:** Seit dem 28.06.2025 gilt das BFSG für die erfassten Produkte und Dienstleistungen, die danach in Verkehr gebracht oder für Verbraucher:innen erbracht werden.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-8.3-18 · Mehrfachauswahl
**Frage:** Welche Angaben gehören zu den Informationen, die ein Anbieter über seine barrierefreie Dienstleistung bereitstellt?
- [x] Eine allgemeine Beschreibung der Dienstleistung in barrierefreiem Format.
- [x] Eine Beschreibung, wie die Dienstleistung die Anforderungen erfüllt.
- [ ] Der vollständige Quelltext der Weboberfläche.
- [x] Die Angabe der zuständigen Marktüberwachungsbehörde.
**Erklärung:** Die Informationen stehen in den AGB oder an anderer deutlich wahrnehmbarer Stelle. Der Quelltext gehört nicht dazu.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.3-19 · Zuordnung
**Anweisung:** Ordne jedem Sachverhalt das einschlägige Regelwerk zu.
- Website einer Bundesbehörde ↔ BITV
- Online-Shop für Privatpersonen eines Betriebs mit 40 Beschäftigten (Beispielwert) ↔ BFSG
- Online-Shop für Privatpersonen eines Betriebs mit 3 Beschäftigten und 380.000 € Jahresumsatz (Beispielwerte) ↔ von der Pflicht ausgenommen
- Website einer Landesbehörde ↔ Landesrecht
**Erklärung:** Die BITV betrifft öffentliche Stellen des Bundes, das BFSG Anbieter erfasster Verbraucherdienstleistungen. Kleinstunternehmen sind für Dienstleistungen ausgenommen. Länder regeln ihre Stellen selbst.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-8.3-20 · Entweder-Oder
**Frage:** Wie verhält sich das BFSG zu den WCAG?
- [x] Die WCAG stehen nicht im Gesetz; es gilt der Stand der Technik, Normen können Konformität vermuten lassen.
- [ ] Das Gesetz schreibt die Stufe AA der WCAG für alle Anbieter ausdrücklich als Mindeststandard vor, unabhängig von Normen.
**Erklärung:** Die Verordnung verlangt wahrnehmbare, bedienbare, verständliche und robuste Gestaltung, nennt die WCAG aber nicht. Normen wie die EN 301 549 können Konformität nur vermuten lassen, wenn sie im Amtsblatt genannt sind; WCAG AA ist in der Praxis ein üblicher Prüfmaßstab.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-8.3-21 · Sortieren
**Anweisung:** Bringe das Vorgehen der Marktüberwachung bei einer nicht barrierefreien Dienstleistung in die Reihenfolge.
1. Die Behörde stellt einen Mangel bei der Prüfung fest.
2. Sie fordert den Anbieter auf, innerhalb einer Frist Abhilfe zu schaffen.
3. Bleibt er untätig, fordert sie erneut unter Androhung der Untersagung auf.
4. Bleibt er weiter untätig, trifft sie erforderliche Maßnahmen, etwa die Einstellung des Angebots.
**Erklärung:** Die Behörde geht stufenweise vor: erst Aufforderung mit Frist, bei Untätigkeit erneut unter Androhung der Untersagung, zuletzt erforderliche Maßnahmen, besonders die Einstellung des Angebots. Weist der Anbieter später Konformität nach, wird die Anordnung aufgehoben.
`schwierigkeit: mittel` · `bloom: verstehen`
