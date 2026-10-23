# Entwurf Fachinformatiker (vier Kurse), IT-Projektverträge: Ergänzung im Thema 1.3

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil J des Pakets P-AY (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-08, dort „P-AX“ Teil C). Einzufügen in `content/<kurs>/fu1/1.3-leistungserbringung-dokumentation-auftragsabschluss.md` (identisch in allen vier Fachinformatiker-Kursen): Abschnitt A **vor der Überschrift „### Kosten erfassen und im Soll-Ist-Vergleich bewerten“** (Anker; die Theorie steht damit hinter „### Übergabe und Abnahme“), B an die Karteikarten hinter K-1.3-19, C an das Quiz hinter Q-1.3-13. Bestand gezählt (Stand 23.10.2026, in allen vier Kursen gleich): 19 Karteikarten (K-1.3-01 bis -19, lückenlos), 13 Quizfragen (Q-1.3-01 bis -13, lückenlos); `git log -S` auf K-1.3-20, Q-1.3-14 und F-FU1-04 ergibt in den vier Kursen keine entfernten IDs. Die neuen IDs sind K-1.3-20 bis -29 (10 Karten) und Q-1.3-14 bis -25 (12 Quizfragen, davon 3 Kurzantworten). Die Fallaufgabe F-FU1-04 (Bestand F-FU1-01 bis -03) und zwei Fachgesprächsfragen stehen in `fi-faelle-j.md`, die Rechtsangaben in `rechtsangaben-j.md`, die Ersetzung im Bestand in `ersetzungen-j.json`. Der `rechtsstand` der berührten Dateien setzt der Auftraggeber beim Einspielen.

**Zweck.** Der Bestand beschreibt die Abnahme als Verfahren (Protokoll, Teilnehmende, Unterschrift) und nennt ihre rechtliche Bedeutung nur in einem Halbsatz („Fälligkeit der Vergütung und Beginn von Gewährleistungsfristen“). Es fehlt, was die Abnahme bewirkt, wann sie verweigert werden darf, was ein Vorbehalt ist, welche Rechte bei Mängeln bestehen und wie sie verjähren, wie die Vertragsarten Werk- und Dienstvertrag sich unterscheiden, was eine SLA-Zusage rechtlich bedeutet und wie weit Haftung begrenzt werden kann. Die Ergänzung bleibt in der Sicht einer Fachinformatiker:in, die im Projekt Verträge nicht verhandelt, aber verstehen muss, was Zusagen, Protokolle und Dokumentation rechtlich auslösen. **Nicht Gegenstand** (hier nur Verweis): Verbraucherrecht, Kaufvertrag, Widerruf und Verzug im Verkehr mit Privatpersonen (Teil I, Thema 7.6), Datenschutz und Auftragsverarbeitung (Thema 6.2), Software-Urheberrecht und Open-Source-Lizenzen (Teil K, Thema 2.2), Verfügbarkeitsberechnung (Thema 3.3), Cybersicherheitsrecht der Hersteller (Themen 6.6 und 6.7), Vergaberecht, VOB/B und Bauverträge, Verbraucherverträge über digitale Produkte.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch (auch keine Gesetzesnamen dort; die Kurzbezeichnung „EU-Produkthaftungsrichtlinie“ in Q-1.3-25 ist ausgenommen). Rechtsgrundlagen am Rohtext gelesen (BGB von gesetze-im-internet.de, Richtlinie (EU) 2024/2853 im Amtsblattwortlaut über publications.europa.eu; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-j.md`). Aussagen, die auf Rechtsprechung oder Auslegung beruhen, sind im Text als solche gekennzeichnet („nach der Rechtsprechung“, „Auslegung“) und nicht als Gesetzesregel formuliert. **Zeitkritisch** (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Umsetzung der Produkthaftungsrichtlinie in deutsches Recht (Umsetzungsfrist 09.12.2026; vom Bundestag am 08.10.2026 beschlossen, Verkündung nicht festgestellt), die Einordnung von Software unter die Verjährungsregeln des Werkvertrags, die Rechtsprechung zu Haftungsklauseln in Geschäftsbedingungen. Alle Beträge und Prozentwerte in Beispielen sind frei gewählte Beispielwerte.

---

# Thema 1.3

## A. Theorie-Ergänzung 1.3 (einfügen vor „### Kosten erfassen und im Soll-Ist-Vergleich bewerten“)

### Vertragsarten im IT-Projekt: Werkvertrag, Dienstvertrag und Mischformen

Welche Rechte bei Mängeln und Verspätung gelten, hängt davon ab, was vertraglich geschuldet ist. Beim **Werkvertrag** schuldet die Auftragnehmerseite einen **Erfolg**, das versprochene Werk; die Auftraggeberseite (im Gesetz: Besteller) schuldet die vereinbarte Vergütung (Stützangabe § 631 BGB). Beim **Dienstvertrag** schuldet die verpflichtete Seite die versprochene **Tätigkeit**, nicht deren Erfolg; die Vergütung ist nach der Leistung der Dienste zu entrichten (Stützangabe §§ 611, 614 BGB).

Die Zuordnung richtet sich nach dem Inhalt der Vereinbarung, nicht nach der Überschrift. Als Faustregel gilt (Auslegung, im Einzelfall zu prüfen): Individuell nach den Anforderungen der Auftraggeberin entwickelte Software ist meist ein Werkvertrag, vor allem bei festgelegtem Ergebnis und Festpreis; Beratung, Betreuung und Support nach Aufwand sind meist Dienstverträge; Hosting und Cloud-Software werden häufig mit mietrechtlichen Elementen eingeordnet, also als Überlassung zum Gebrauch (Stützangabe § 535 BGB); Standardsoftware gegen einmaligen Preis wird als Kauf eingeordnet, zwischen Kaufleuten mit Untersuchungs- und Rügepflicht (Lizenzfragen: Thema 2.2 „Betriebssysteme, Software und Lizenzen“ im Fachgebiet „IT-Systeme beurteilen und IT-Arbeitsplatz einrichten“). Auch eine agile Arbeitsweise legt die Vertragsart nicht fest. Für die Herstellung digitaler Produkte gegenüber Verbraucher:innen gelten Sonderregeln (Stützangabe § 650 Abs. 2 BGB; siehe Thema 7.6 „Verbraucherrecht und Kaufvertrag: Kauf, Widerruf und digitale Produkte“ im Fachgebiet „Wirtschafts- und Sozialkunde“). Die folgenden Abschnitte betreffen Verträge zwischen Unternehmen. Stand Oktober 2026, vor Verwendung prüfen.

### Abnahme: Pflicht, Wirkungen und Vorbehalt

Beim Werkvertrag muss die Auftraggeberseite das vertragsmäßig hergestellte Werk **abnehmen**, sofern die Abnahme nicht nach der Beschaffenheit des Werks ausgeschlossen ist; **wegen unwesentlicher Mängel** kann sie die Abnahme nicht verweigern (Stützangabe § 640 Abs. 1 BGB), wegen wesentlicher darf sie es. Ob ein Mangel wesentlich ist, hängt vom Einzelfall ab, etwa davon, ob eine vereinbarte Hauptfunktion ausfällt oder nur eine Kleinigkeit abweicht (Auslegung). Hat die Auftragnehmerseite nach der Fertigstellung eine angemessene Frist zur Abnahme gesetzt und verweigert die Auftraggeberseite sie nicht innerhalb der Frist **unter Angabe mindestens eines Mangels**, gilt das Werk als abgenommen (**Abnahmefiktion**, Stützangabe § 640 Abs. 2 BGB; gegenüber Verbraucher:innen nur mit Hinweis in Textform). Schweigen oder eine Ablehnung ohne Mangelangabe verhindert sie nicht.

Die Abnahme hat mehrere Wirkungen: Die Vergütung wird fällig (Stützangabe § 641 Abs. 1 BGB); die Gefahr, also das Risiko, dass das Werk zufällig untergeht oder sich verschlechtert, geht von der Auftragnehmerseite auf die Auftraggeberseite über (Stützangabe § 644 Abs. 1 BGB); bei den Werken mit zwei- oder fünfjähriger Verjährungsfrist (siehe unten) beginnt die Verjährung der Mängelansprüche (Stützangabe § 634a Abs. 2 BGB). Nach der Rechtsprechung kehrt sich außerdem die Beweislast um: Vor der Abnahme muss die Auftragnehmerseite die Mangelfreiheit beweisen, danach die Auftraggeberseite den Mangel.

Wichtig ist der **Vorbehalt**. Kennt die Auftraggeberseite bei der Abnahme einen Mangel, stehen ihr Nacherfüllung, Selbstvornahme, Rücktritt und Minderung nur zu, wenn sie sich diese Rechte vorbehält (Stützangabe § 640 Abs. 3 BGB); Schadensersatz nennt die Vorschrift nicht. Der Vorbehalt gehört deshalb ausdrücklich ins Abnahmeprotokoll („Mangel bekannt; Rechte vorbehalten“). Auch eine vereinbarte Vertragsstrafe muss bei der Annahme vorbehalten werden (Stützangabe § 341 Abs. 3 BGB). Stand Oktober 2026, vor Verwendung prüfen.

### Mängelrechte und Verjährung

Das Werk ist frei von **Sachmängeln**, wenn es die vereinbarte Beschaffenheit hat; sonst, wenn es sich für die nach dem Vertrag vorausgesetzte, ersatzweise die gewöhnliche Verwendung eignet und üblich beschaffen ist. (Stützangabe § 633 Abs. 2 BGB). Ein **Rechtsmangel** liegt vor, wenn Dritte Rechte gegen die Auftraggeberin geltend machen können, etwa wegen fehlender Lizenz (Stützangabe § 633 Abs. 3 BGB).

Bei Mängeln stehen der Auftraggeberseite diese Rechte zu (Stützangabe § 634 BGB). Zuerst die **Nacherfüllung**: Die Auftragnehmerseite wählt, ob sie den Mangel beseitigt oder neu herstellt, anders als beim Kauf, wo die Käuferseite wählt; sie trägt die Kosten, kann die Nacherfüllung aber bei unverhältnismäßigen Kosten verweigern (Stützangabe § 635 BGB). Nach erfolglosem Ablauf einer angemessenen Frist kann die Auftraggeberseite den Mangel selbst beseitigen und Aufwendungsersatz verlangen (**Selbstvornahme**, § 637 BGB), zurücktreten oder die Vergütung mindern (§§ 636, 323, 638 BGB) und bei Vertretenmüssen Schadensersatz verlangen (§§ 636, 280, 281 BGB). Die Frist ist unter anderem bei ernsthafter und endgültiger Verweigerung, Fehlschlag oder Unzumutbarkeit der Nacherfüllung entbehrlich (Stützangabe § 636 BGB). Der Rücktritt ist bei unerheblicher Pflichtverletzung ausgeschlossen, die Minderung nicht (Stützangabe § 323 Abs. 5 Satz 2, § 638 Abs. 1 Satz 2 BGB). Besteht ein Anspruch auf Beseitigung, kann die Auftraggeberseite nach der Fälligkeit einen angemessenen Teil der Vergütung zurückhalten; angemessen ist in der Regel das Doppelte der erforderlichen Beseitigungskosten (Stützangabe § 641 Abs. 3 BGB).

Die **Mängelansprüche verjähren** (Stützangabe § 634a BGB) in zwei Jahren bei einem Werk, dessen Erfolg in Herstellung, Wartung oder Veränderung einer Sache oder in Planungs- oder Überwachungsleistungen dafür besteht, in fünf Jahren bei Bauwerken und sonst in der regelmäßigen Frist von drei Jahren, die erst mit dem Ende des Jahres der Entstehung und Kenntnis beginnt (Stützangabe §§ 195, 199 BGB). Bei den ersten beiden beginnt die Frist mit der Abnahme. Ob die Erstellung von Software unter die zwei Jahre fällt, wird nicht einheitlich beurteilt; Verträge legen die Frist deshalb meist ausdrücklich fest. Eine Verkürzung ist vereinbar (in vorformulierten Bedingungen nur im Rahmen der Inhaltskontrolle), bei Vorsatz aber nicht im Voraus (Stützangabe § 202 Abs. 1 BGB), und bei arglistigem Verschweigen gilt die regelmäßige Frist (Stützangabe § 634a Abs. 3 BGB).. Hemmung und Neubeginn erklärt Thema 7.6 im Abschnitt „Zahlungsarten, Verzug, Mahnwesen und Verjährung im Überblick“. Stand Oktober 2026, vor Verwendung prüfen.

### Verzug, Vergütung und Vertragsstrafe

Zum Zahlungsverzug siehe Thema 7.6 (Abschnitt wie oben); ohne Verbraucherbeteiligung gilt: Verzug tritt nur ein, wenn die Schuldnerseite die Verzögerung zu vertreten hat, und spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung (Stützangabe § 286 Abs. 3, 4 BGB); der Zins liegt neun Prozentpunkte über dem Basiszinssatz, dazu kommt eine feste gesetzliche Pauschale von 40 Euro (Stützangabe § 288 Abs. 2, 5 BGB). Ein berechtigter Einbehalt wegen Mängeln begründet nach der Rechtsprechung insoweit keinen Verzug, wenn die Auftraggeberin sich darauf beruft.

Gerät die Auftragnehmerseite mit der Fertigstellung in Verzug, etwa weil ein kalendermäßig bestimmter Termin verstreicht, kann die Auftraggeberseite bei Vertretenmüssen den Verzugsschaden ersetzt verlangen (Stützangabe § 286 Abs. 2 Nr. 1, 4, § 280 Abs. 2 BGB) und nach erfolgloser angemessener Nachfrist zurücktreten und/oder Schadensersatz statt der Leistung verlangen (Stützangabe §§ 323, 325, 281 BGB). Üblich ist eine **Vertragsstrafe** je Verzugstag; sie wird mit dem Verzug verwirkt und kann neben der Erfüllung verlangt werden, aber nur, wenn sie bei der Annahme vorbehalten wird (Stützangabe §§ 339, 341 BGB). Stand Oktober 2026, vor Verwendung prüfen.

### Service Level Agreement und Betriebsverträge

Ein **SLA** ist keine eigene Vertragsart, sondern Bestandteil eines Dienst-, Miet- oder Mischvertrags. Zum Begriff siehe Thema 1.2 „Kundenberatung, Bedarfsermittlung und Marketing“ im selben Fachgebiet. Rechtlich zählt, was zugesagt ist: Wert, Messzeitraum, Servicezeiten, Reaktions- und Behebungszeiten und Ausnahmen wie Wartungsfenster. Wird ein Wert verfehlt, gelten die vereinbarten Folgen. Üblich sind **Service Credits**, also Gutschriften in Prozent des Entgelts nach einer Staffel, meist ohne Verschulden und auf Schadensersatz anzurechnen, sowie ein Sonderkündigungsrecht bei wiederholter Unterschreitung. Sind SLA-Klauseln vorformuliert, unterliegen sie der Kontrolle für Geschäftsbedingungen (siehe nächster Abschnitt); ob Gutschriften weitergehenden Schadensersatz ausschließen, hängt von der Klausel ab. Weitergehender Schadensersatz setzt Vertretenmüssen voraus, es sei denn, die Zusage ist als Garantie zu verstehen (Stützangabe § 280 Abs. 1, § 276 Abs. 1 BGB; Auslegung des Vertrags).

Betriebsverträge sind Dauerschuldverhältnisse. Sie enden durch Zeitablauf oder ordentliche Kündigung; eine Kündigung aus wichtigem Grund ist möglich, wenn die Fortsetzung unzumutbar ist. Besteht der Grund in einer Pflichtverletzung, ist sie grundsätzlich erst nach erfolglosem Ablauf einer Abhilfefrist oder nach einer Abmahnung zulässig (Ausnahmen bei ernsthafter Verweigerung oder besonderen Umständen). Die Frist hängt von der Vertragsart ab: Bei Dienstverträgen kann nur innerhalb von zwei Wochen ab Kenntnis der maßgebenden Tatsachen gekündigt werden (Stützangabe § 626 Abs. 2 BGB), bei Mietverhältnissen gelten die Sonderregeln der §§ 543 ff. BGB, bei anderen Dauerschuldverhältnissen kann innerhalb einer angemessenen Frist gekündigt werden (Stützangabe § 314 BGB). Messdaten, Tickets und Änderungsprotokolle sind die Nachweise; Änderungen am Produktivsystem erfolgen nur nach dem vereinbarten Freigabeprozess. Stand Oktober 2026, vor Verwendung prüfen.

### Haftung und Haftungsbegrenzung

Wer eine Vertragspflicht verletzt, schuldet Schadensersatz, wenn er sie zu vertreten hat; zu vertreten sind Vorsatz und Fahrlässigkeit (Stützangabe §§ 280 Abs. 1, 276 Abs. 1, 2 BGB). Das Verschulden von Beschäftigten und Unterauftragnehmern, die zur Erfüllung eingesetzt werden, wird zugerechnet (Stützangabe § 278 BGB); ein Mitverschulden der geschädigten Seite kann den Ersatz mindern (Stützangabe § 254 BGB).

Haftung lässt sich begrenzen, aber nicht beliebig. Die Haftung für Vorsatz kann nicht im Voraus erlassen werden (Stützangabe § 276 Abs. 3 BGB); auf eine Vereinbarung, die Mängelrechte ausschließt, kann sich die Auftragnehmerseite nicht berufen, soweit sie den Mangel arglistig verschwiegen oder eine Garantie übernommen hat (Stützangabe § 639 BGB). Vorformulierte Klauseln, die eine Seite der anderen stellt, sind **Allgemeine Geschäftsbedingungen** (Stützangabe § 305 Abs. 1 BGB). Gegenüber Unternehmen gelten die meisten Klauselverbote der §§ 308 und 309 BGB nicht unmittelbar (Ausnahme: Regeln zu Zahlungs- und Abnahmefristen); die Kontrolle erfolgt nach der Generalklausel, in die ihre Wertungen einfließen (Stützangabe §§ 307, 310 Abs. 1 BGB). Nach der Rechtsprechung sind deshalb in Geschäftsbedingungen gegenüber Unternehmen in der Regel unwirksam: der Ausschluss oder die Begrenzung der Haftung für grobe Fahrlässigkeit, für Schäden an Leben, Körper und Gesundheit und für die Verletzung wesentlicher Vertragspflichten, soweit der typische, vorhersehbare Schaden nicht ersetzt wird. Bei einfacher Fahrlässigkeit sind Begrenzungen auf diesen Schaden oder auf Höchstbeträge nur in angemessenem Rahmen möglich. Eine unwirksame Klausel entfällt, in der Regel gilt das Gesetz (Ausnahme: unzumutbare Härte, Stützangabe § 306 Abs. 2, 3 BGB); nach der Rechtsprechung wird sie nicht auf das zulässige Maß zurückgeführt. Eine im Koalitionsvertrag angekündigte Lockerung der Inhaltskontrolle zwischen großen Kapitalgesellschaften ist Stand Oktober 2026 nicht in Kraft. Projektbeteiligte geben keine Haftungszusagen.

**Hinweis Produkthaftung für Software.** Das geltende Produkthaftungsgesetz erfasst bewegliche Sachen und Elektrizität (Stützangabe § 2 ProdHaftG), ersetzt Personenschäden und Schäden an privat genutzten Sachen (§ 1 Abs. 1) und lässt die Ersatzpflicht weder ausschließen noch beschränken (§ 14). Die Richtlinie (EU) 2024/2853 wirkt gegenüber Unternehmen erst über das deutsche Umsetzungsgesetz, das der Bundestag am 08.10.2026 beschlossen hat; sein Inkrafttreten ist vor Verwendung zu prüfen. Nach der Richtlinie gilt Software ausdrücklich als Produkt (Stützangabe Art. 4 Nr. 1), ausgenommen freie und quelloffene Software außerhalb einer Geschäftstätigkeit (Art. 2 Abs. 2). Sie betrifft Produkte, die nach dem 09.12.2026 (Ende der Umsetzungsfrist) in Verkehr gebracht oder in Betrieb genommen werden (Art. 2 Abs. 1), schützt natürliche Personen, ersetzt keine Schäden an ausschließlich beruflich genutzten Sachen (Art. 5, 6) und lässt keinen Haftungsausschluss gegenüber der geschädigten Person zu (Art. 15). Für Projekte zwischen Unternehmen ist die Wirkung deshalb begrenzt, bedeutsam wird sie vor allem für Software in Produkten für Verbraucher:innen. Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 1.3 (anhängen)

#### K-1.3-20
**Frage:** Worin unterscheiden sich Werkvertrag und Dienstvertrag, und welcher passt typischerweise zu individuell entwickelter Software gegen Festpreis?
**Antwort:** Beim Werkvertrag wird ein Erfolg geschuldet, beim Dienstvertrag nur die Tätigkeit. Individuelle Software mit festgelegtem Ergebnis und Festpreis ist meist ein Werkvertrag, Support nach Aufwand meist ein Dienstvertrag.
`tags: vertraege, werkvertrag, dienstvertrag` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.3-21
**Frage:** Wann darf die Auftraggeberseite die Abnahme eines Werks verweigern, und wann gilt es trotz Schweigens als abgenommen?
**Antwort:** Wegen wesentlicher Mängel darf sie verweigern, wegen unwesentlicher nicht. Nach Fertigstellung und angemessener Fristsetzung gilt das Werk als abgenommen, wenn sie nicht innerhalb der Frist unter Angabe eines Mangels verweigert.
`tags: vertraege, abnahme, recht` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-1.3-22
**Frage:** Welche Wirkungen hat die Abnahme eines Werks?
**Antwort:** Die Vergütung wird fällig, die Gefahr geht auf die Auftraggeberseite über, die Verjährung der Mängelansprüche beginnt (bei den meisten Werken), und nach der Rechtsprechung muss sie danach Mängel beweisen.
`tags: vertraege, abnahme, wirkungen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.3-23
**Frage:** Was ist der Vorbehalt bei der Abnahme, und was geschieht ohne ihn?
**Antwort:** Mit dem Vorbehalt hält sich die Auftraggeberseite Rechte wegen eines bekannten Mangels offen. Fehlt er, gehen Nacherfüllung, Selbstvornahme, Rücktritt und Minderung verloren; Schadensersatz nennt das Gesetz hier nicht. Auch eine Vertragsstrafe ist vorzubehalten.
`tags: vertraege, abnahme, vorbehalt` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-1.3-24
**Frage:** Welche Mängelrechte hat die Auftraggeberseite beim Werkvertrag, und wer wählt die Art der Nacherfüllung?
**Antwort:** Nacherfüllung, nach erfolgloser Frist Selbstvornahme, Rücktritt oder Minderung sowie Schadensersatz bei Vertretenmüssen. Die Art der Nacherfüllung (beseitigen oder neu herstellen) wählt die Auftragnehmerseite.
`tags: vertraege, maengelrechte` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-1.3-25
**Frage:** Wie viel der Vergütung darf die Auftraggeberseite wegen eines Mangels in der Regel einbehalten?
**Antwort:** Nach Fälligkeit einen angemessenen Teil, in der Regel das Doppelte der erforderlichen Mängelbeseitigungskosten.
`tags: vertraege, maengelrechte, zurueckbehaltung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-1.3-26
**Frage:** Wann verjähren Mängelansprüche beim Werkvertrag, und was gilt bei Software?
**Antwort:** Zwei Jahre bei Werken an Sachen, fünf bei Bauwerken, sonst drei Jahre regelmäßig. Ob Software unter die zwei Jahre fällt, ist nicht einheitlich geklärt; der Vertrag regelt die Frist deshalb meist ausdrücklich.
`tags: vertraege, verjaehrung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-1.3-27
**Frage:** Welche Folgen hat Zahlungsverzug einer Auftraggeberin, die ein Unternehmen ist?
**Antwort:** Bei Vertretenmüssen spätestens 30 Tage nach Fälligkeit und Rechnungszugang; Zinsen neun Prozentpunkte über dem Basiszinssatz plus feste gesetzliche Pauschale. Ein berechtigter Einbehalt wegen Mängeln begründet insoweit keinen Verzug, wenn die Auftraggeberin sich darauf beruft (Rechtsprechung).
`tags: vertraege, verzug, zahlung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.3-28
**Frage:** Was bedeutet eine SLA-Zusage rechtlich, und was folgt bei Unterschreitung?
**Antwort:** Der Wert ist eine vertragliche Zusage. Bei Unterschreitung gelten die vereinbarten Folgen, meist Service Credits und ein Sonderkündigungsrecht; weitergehender Schadensersatz setzt in der Regel Vertretenmüssen voraus.
`tags: vertraege, sla, betrieb` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.3-29
**Frage:** Wie weit lässt sich Haftung in Geschäftsbedingungen gegenüber Unternehmen begrenzen?
**Antwort:** Vorsatz nie im Voraus. Nach der Rechtsprechung ist auch ein Ausschluss für grobe Fahrlässigkeit in der Regel unwirksam; bei einfacher Fahrlässigkeit sind Begrenzungen nur in angemessenem Rahmen möglich. Unwirksames entfällt, in der Regel gilt das Gesetz.
`tags: vertraege, haftung, agb` · `schwierigkeit: schwer` · `bloom: verstehen`

## C. Quiz 1.3 (anhängen)

#### Q-1.3-14 · Multiple Choice
**Frage:** Ein Kundenunternehmen lässt bei Brevanta ein Auswertungsmodul nach einem festgelegten Pflichtenheft zum Festpreis entwickeln. Was ist richtig?
- [ ] Es liegt ein Dienstvertrag vor, weil Brevanta nur Arbeitsstunden schuldet.
- [x] Es liegt in der Regel ein Werkvertrag vor, weil ein festgelegtes Ergebnis geschuldet wird.
- [ ] Es liegt ein Arbeitsvertrag vor, weil Brevantas Beschäftigte für das Kundenunternehmen tätig werden.
- [ ] Die Vertragsart steht erst fest, wenn der Vertrag ausdrücklich als „Werkvertrag“ überschrieben ist.
**Erklärung:** Maßgeblich ist der Inhalt: Ein vereinbartes Ergebnis zum Festpreis spricht für einen Werkvertrag. Die Überschrift entscheidet nicht, und die Beschäftigten bleiben bei Brevanta angestellt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-15 · Mehrfachauswahl
**Frage:** Ein Kundenunternehmen zahlt eine fällige Projektrechnung nicht. Ein Zahlungsziel ist nicht vereinbart. Welche Aussagen sind richtig?
- [x] Spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung tritt Verzug ein.
- [ ] Verzug tritt zwischen Unternehmen immer erst nach einer schriftlichen Mahnung ein.
- [x] Der Verzugszins liegt neun Prozentpunkte über dem Basiszinssatz.
- [ ] Die feste Verzugspauschale kann nur gegenüber Privatpersonen verlangt werden.
- [x] Soweit ein Einbehalt wegen eines Mangels berechtigt ist und die Auftraggeberin sich darauf beruft, fallen darauf keine Verzugszinsen an.
**Erklärung:** Die 30-Tage-Regel ersetzt die Mahnung, vorausgesetzt die Verzögerung ist zu vertreten. Der höhere Zinssatz und die Pauschale gelten, wenn kein Verbraucher beteiligt ist. Soweit ein Einbehalt berechtigt ist und geltend gemacht wird, fehlt nach der Rechtsprechung der Verzug.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-1.3-16 · Multiple Choice
**Frage:** Bei der Abnahmeprüfung eines Kundenportals lässt sich die vereinbarte Anmeldung der Beschäftigten nicht abschließen; außerdem weicht ein Farbton der Schaltflächen leicht vom Styleguide ab. Die Kundin will die Abnahme verweigern. Wie ist das zu beurteilen?
- [ ] Sie darf nicht verweigern, weil beide Fehler schon im Test aufgefallen sind.
- [x] Sie darf wegen der fehlerhaften Anmeldung verweigern, wegen des Farbtons allein nicht.
- [ ] Sie darf verweigern, weil jeder festgestellte Mangel ein Grund dafür ist, ohne Ausnahme.
- [ ] Sie darf nur verweigern, wenn Brevanta der Verweigerung zustimmt.
**Erklärung:** Wegen unwesentlicher Mängel kann die Abnahme nicht verweigert werden. Fällt eine vereinbarte Hauptfunktion aus, ist der Mangel wesentlich; eine leichte optische Abweichung ist unwesentlich.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-17 · Wahr/Falsch
**Aussage:** Eine Auftraggeberin kann die Abnahmefiktion verhindern, indem sie auf die Fristsetzung zur Abnahme antwortet, sie lehne die Abnahme ab, ohne einen Mangel zu nennen.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Verhindert wird die Fiktion nur durch eine Verweigerung innerhalb der Frist, die mindestens einen Mangel nennt. Schweigen oder eine pauschale Ablehnung genügt nicht.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.3-18 · Entweder-Oder
**Frage:** Die Kundin nimmt ein Werk ab und kennt dabei einen offenen Mangel. Welcher Vermerk im Abnahmeprotokoll sichert ihre Rechte besser?
- [ ] „Der Mangel wird von Brevanta voraussichtlich zeitnah behoben.“
- [x] „Mangel bekannt; Rechte wegen des Mangels vorbehalten.“
**Erklärung:** Erst der Vorbehalt erhält Nacherfüllung, Selbstvornahme, Rücktritt und Minderung. Ein Hinweis auf eine erwartete Behebung ist keine Rechtswahrung.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-19 · Zuordnung
**Anweisung:** Ordne die Mängelrechte beim Werkvertrag ihrer Wirkung zu.
- Nacherfüllung ↔ Die Auftragnehmerseite beseitigt den Mangel oder stellt neu her und wählt die Art selbst
- Selbstvornahme ↔ Die Auftraggeberseite beseitigt den Mangel nach erfolgloser Frist selbst und verlangt die Aufwendungen
- Minderung ↔ Die Vergütung wird herabgesetzt, auch bei einem unerheblichen Mangel
- Rücktritt ↔ Der Vertrag wird rückabgewickelt, nicht aber bei einer unerheblichen Pflichtverletzung
**Erklärung:** Die Rechte unterscheiden sich in Wirkung und Voraussetzungen; Nacherfüllung geht den übrigen Rechten in der Regel voraus.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.3-20 · Sortieren
**Anweisung:** Bringe das Vorgehen der Auftraggeberin bei einem Mangel, der nach der Abnahme auffällt, in die zwingende Reihenfolge.
1. Nacherfüllung verlangen und eine angemessene Frist setzen
2. Den Fristablauf abwarten
3. Bei erfolglosem Ablauf ein weitergehendes Recht wählen, zum Beispiel die Minderung
4. Das gewählte Recht gegenüber der Auftragnehmerseite erklären
**Erklärung:** Die weitergehenden Rechte setzen in der Regel eine erfolglos abgelaufene Frist zur Nacherfüllung voraus; erst danach wird gewählt und erklärt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-21 · Kurzantwort
**Frage:** Für einen Mangel liegt ein angemessener Kostenvoranschlag über 1.840,00 € (einschließlich Umsatzsteuer, die zu den erforderlichen Kosten zählt) für die Beseitigung vor. Wie viel Euro darf die Auftraggeberin nach Fälligkeit der Vergütung nach der gesetzlichen Regel einbehalten? Beispielwerte; gib die Zahl in Euro an.
**Akzeptierte Antworten:** 3.680,00 €; 3.680 €; 3680,00 €; 3680 €; 3.680,00€; 3.680€; 3680,00€; 3680€; 3.680,00; 3.680; 3680,00; 3680; 3.680 Euro; 3680 Euro; 3.680,00 Euro; 3680,00 Euro; 3.680,00 EUR; 3.680 EUR; 3680,00 EUR; 3680 EUR
**Erklärung:** Nach der gesetzlichen Regel ist in der Regel das Doppelte der erforderlichen Beseitigungskosten angemessen: 2 × 1.840,00 € = 3.680,00 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-22 · Kurzantwort
**Frage:** Beispielannahme: Vertraglich ist vereinbart, dass Mängelansprüche zwölf Monate nach der Abnahme verjähren. Die Abnahme erfolgt am Dienstag, 12.01.2027. Mit Ablauf welchen Datums verjähren die Ansprüche (Format TT.MM.JJJJ)? Der Tag der Abnahme zählt bei der Fristberechnung nicht mit; Feiertage bleiben außer Betracht.
**Akzeptierte Antworten:** 12.01.2028; 12.01.2028.; 12.1.2028; 12.1.2028.; 12. 01. 2028; 12. 1. 2028; 12. Januar 2028; 12 Januar 2028; 12.01.28; 12.1.28
**Erklärung:** Die Frist endet mit dem Ablauf des Tages, der durch seine Zahl dem Tag der Abnahme entspricht: Mittwoch, 12.01.2028.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-23 · Kurzantwort
**Frage:** Ein SLA sagt 99,5 % Verfügbarkeit je Kalendermonat zu. Bei 99,0 % bis unter 99,5 % beträgt die Gutschrift 4 % des Monatsentgelts, bei weniger als 99,0 % beträgt sie 8 %. Das Monatsentgelt ist 3.600,00 € (Beispielwerte). Gemessen wurden 98,9 %. Wie hoch ist die Gutschrift in Euro?
**Akzeptierte Antworten:** 288,00 €; 288 €; 288,00; 288; 288 Euro; 288,00 Euro; 288 EUR; 288,00 EUR
**Erklärung:** 98,9 % liegen unter 99,0 %, also gilt die Stufe von 8 %: 3.600,00 € × 8 % = 288,00 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-24 · Multiple Choice
**Frage:** In den vorformulierten Geschäftsbedingungen eines IT-Dienstleisters steht gegenüber Unternehmen: „Die Haftung ist bei jeder Fahrlässigkeit, auch bei grober, ausgeschlossen.“ Wie ist die Klausel zu beurteilen?
- [ ] Sie gilt, weil Unternehmen untereinander jede Haftung ausschließen dürfen.
- [ ] Sie gilt, soweit sie nicht grobe Fahrlässigkeit betrifft; nur dieser Teil der Klausel entfällt.
- [x] Sie ist nach der Rechtsprechung in der Regel unwirksam; es gilt die gesetzliche Haftung.
- [ ] Sie gilt, wenn der Dienstleister eine Haftpflichtversicherung hat.
**Erklärung:** Der Ausschluss für grobe Fahrlässigkeit hält der Inhaltskontrolle nicht stand. Eine solche Klausel wird nach der Rechtsprechung nicht auf das zulässige Maß zurückgeführt, sondern entfällt ganz.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-1.3-25 · Wahr/Falsch
**Aussage:** Nach der neuen EU-Produkthaftungsrichtlinie, die Deutschland bis Dezember 2026 umsetzen muss, gilt Software ausdrücklich als Produkt, und die Haftung gegenüber der geschädigten Person darf vertraglich nicht ausgeschlossen werden.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Richtlinie nennt Software ausdrücklich als Produkt und lässt gegenüber der geschädigten Person keinen vertraglichen Haftungsausschluss zu. Gegenüber Unternehmen wirkt sie erst über das deutsche Umsetzungsgesetz (Stand Oktober 2026, vor Verwendung prüfen).
`schwierigkeit: schwer` · `bloom: erinnern`
