# Entwurf Fachwirt für Büro- und Projektorganisation, Rechnung, E-Rechnung, Aufbewahrung und Skonto: Ergänzung im Thema 4.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil b des Pakets P-AX (Auftrag `docs/entwuerfe/buero-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/buero-r4-auswertung.md`, Lücke BP-13 Teil B). Einzufügen in `content/fachwirt-buero-projektorganisation/hb4/4.2-einkauf-beschaffung.md`: Abschnitt A **vor der Überschrift „### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse“** (Anker; derselbe Anker wie Teil a, die Theorie steht in der Config **hinter Teil a**, also: Vertragserfüllung kontrollieren, Teil a, Teil b, Rechenbeispiel), B an die Karteikarten, C an das Quiz. Bestand gezählt (Stand 23.10.2026): 13 Karteikarten (K-4.2-01 bis -13, lückenlos), 19 Quizfragen (Q-4.2-01 bis -19, lückenlos); `git log -S` auf K-4.2-14, Q-4.2-20, K-4.2-24, Q-4.2-32, F-HB4-05 und F-HB4-06 ergibt im Kurs keine entfernten IDs. Teil a (parallel, 10 Karten, 12 Quizfragen) belegt K-4.2-14 bis -23 und Q-4.2-20 bis -31; die neuen IDs dieses Teils setzen **lückenlos dahinter** fort: **K-4.2-24 bis -31 (8 Karten) und Q-4.2-32 bis -41 (10 Quizfragen, davon 3 Rechen-Kurzantworten)**. Die Fallaufgabe F-HB4-06 (Bestand F-HB4-01 bis -04, Teil a vergibt F-HB4-05) und zwei Fachgesprächsfragen stehen in `bp-faelle-b.md`, die Rechtsangaben in `rechtsangaben-b.md`; `ersetzungen-b.json` ist leer (kein widersprechender Satz im Bestand). Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand von 4.2 kontrolliert die Vertragserfüllung nur als Frage nach Lieferfristen, Zahlungsfluss und Qualität und rechnet den Skonto im Angebotsvergleich. Es fehlt alles, was nach dem Wareneingang mit der Rechnung geschieht: welche Angaben eine Rechnung enthalten muss und warum sie für den Vorsteuerabzug zählt, was eine elektronische Rechnung ist und wann sie Pflicht wird, wie Eingangsrechnungen im Betrieb geprüft werden (Bezug zum Spiel „Beleg-Detektiv“ und zum Fall F-HB4-04, die bisher ohne Theorie auskommen), wie lange Rechnungen und Handelsbriefe aufzubewahren sind und was ein Skontoabzug rechtlich und steuerlich bedeutet. Die Ergänzung wiederholt nichts aus Teil a (Vertragsschluss, Wareneingangsprüfung und Mängelrüge, Verzug) und nichts aus dem Rechenbeispiel (Bezugspreis mit Skonto), sie verweist darauf. Datenschutz bei Auswahl und Betrieb von Anwendungen (Teil i) und Pflichtangaben auf Geschäftsbriefen (Teil j) sind nicht Gegenstand; Teil j verweist für die Aufbewahrung der Handelsbriefe auf diesen Teil. Die Sicht ist die der Einkaufsseite der Deko & Büro GmbH, nicht die der Rechtsabteilung oder Buchhaltung.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch. Rechtsgrundlagen am Rohtext von gesetze-im-internet.de gelesen (UStG, UStDV, HGB, AO, BGB, GmbHG; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-b.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Übergangsfristen der E-Rechnung bis 31.12.2027, die Auffassung der Finanzverwaltung zum Empfang seit 2025 und zur Aufbewahrung der Originaldatei, die Schwellen 250 € und 800.000 € und der Regelsteuersatz im Rechenbeispiel. Beträge im Rechenbeispiel und im Fall sind frei gewählte Beispielwerte.

---

# Thema 4.2

## A. Theorie-Ergänzung 4.2 (einfügen vor „### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse“, hinter Teil a)

### Rechnung, Vorsteuerabzug und E-Rechnung

Eine **Rechnung** ist jedes Dokument, mit dem über eine Lieferung oder sonstige Leistung abgerechnet wird, gleichgültig, wie es im Geschäftsverkehr heißt (Stützangabe § 14 Abs. 1 UStG; Stand Oktober 2026, vor Verwendung prüfen). Wer an ein anderes Unternehmen für dessen Unternehmen leistet, muss innerhalb von sechs Monaten eine Rechnung ausstellen; bestimmte steuerfreie Umsätze sind ausgenommen (Stützangabe § 14 Abs. 2 UStG). Für die Einkaufsseite hängt an der Rechnung der **Vorsteuerabzug**: Er setzt voraus, dass sie eine nach dem Gesetz ausgestellte Rechnung besitzt, und abziehbar ist nur die gesetzlich geschuldete Steuer (Stützangabe § 15 Abs. 1 Nr. 1 UStG). Weist das Lieferunternehmen mehr Steuer aus, als es für den Umsatz schuldet, schuldet es den Mehrbetrag selbst (Stützangabe § 14c Abs. 1 UStG).

Eine Rechnung muss folgende **Pflichtangaben** enthalten (Stützangabe § 14 Abs. 4 UStG): vollständiger Name und vollständige Anschrift beider Seiten; die Steuernummer oder die Umsatzsteuer-Identifikationsnummer des leistenden Unternehmens; das Ausstellungsdatum; eine fortlaufende, nur einmal vergebene Rechnungsnummer; Menge und handelsübliche Bezeichnung der Gegenstände oder Umfang und Art der Leistung; den Zeitpunkt der Lieferung oder Leistung (der Kalendermonat genügt, Stützangabe § 31 Abs. 4 UStDV); das nach Steuersätzen aufgeschlüsselte Entgelt samt jeder im Voraus vereinbarten Minderung, etwa einem Skonto, soweit sie nicht schon im Entgelt berücksichtigt ist; den Steuersatz und den Steuerbetrag oder den Hinweis auf eine Steuerbefreiung. Bankverbindung und Zahlungsfrist verlangt das Umsatzsteuerrecht nicht. Bei **Kleinbetragsrechnungen** mit einem Gesamtbetrag bis 250 € (gesetzlicher Wert) genügen weniger Angaben (Stützangabe § 33 UStDV).

Ist eine Rechnung unvollständig oder unzutreffend, **berichtigt** sie das Lieferunternehmen: Es genügt, die fehlenden oder falschen Angaben in einem Dokument nachzureichen, das eindeutig auf die ursprüngliche Rechnung bezogen ist und dieselben Anforderungen an Form und Inhalt erfüllt (Stützangabe § 31 Abs. 5 UStDV). Die Empfangsseite ändert die Rechnung nicht selbst, denn die Unversehrtheit ihres Inhalts muss gewährleistet bleiben (Stützangabe § 14 Abs. 3 UStG). Bis zur Berichtigung ist der Vorsteuerabzug gefährdet; ab wann die Berichtigung ihn ermöglicht, ist eine steuerrechtliche Vertiefung und hier nicht dargestellt.

Bei der **E-Rechnung** steht die Einkaufsseite zuerst am Eingang. Für den **Empfang** geht die Finanzverwaltung davon aus, dass Unternehmen im Inland E-Rechnungen seit Anfang 2025 entgegennehmen können müssen; das ist Verwaltungsauffassung, kein Gesetzeswortlaut.

Das Gesetz unterscheidet zwei Arten (Stützangabe § 14 Abs. 1 UStG). Eine **elektronische Rechnung (E-Rechnung)** liegt vom Ausstellen über die Übermittlung bis zum Empfang in einem strukturierten elektronischen Format vor, das sich maschinell verarbeiten lässt. Maßgeblich ist die europäische Norm für elektronische Rechnungen; ein abweichendes Format ist nur zulässig, wenn beide Seiten es vereinbart haben und sich alle Pflichtangaben vollständig in ein normgerechtes Format überführen lassen. Beispiele sind **XRechnung**, die nur aus Daten besteht, und **ZUGFeRD**, eine Bilddatei mit eingebettetem Datensatz; nach den Anwendungsschreiben der Finanzverwaltung kommt ZUGFeRD nur in Profilen in Betracht, die der Norm entsprechen. Alles andere ist eine **sonstige Rechnung**: Papier und jedes andere elektronische Format, auch ein PDF, das nur das Bild einer Rechnung zeigt. Die Übermittlung in einem elektronischen Format braucht die Zustimmung der Empfangsseite, soweit keine Pflicht zur E-Rechnung besteht; für Papier braucht es sie nicht.

Die **Pflicht** zur E-Rechnung trifft Unternehmen, die an ein anderes Unternehmen für dessen Unternehmen leisten, wenn beide im Inland ansässig sind. Der **Übergang** ist gestaffelt (Stützangabe § 27 Abs. 38 UStG; Stand Oktober 2026, vor Verwendung prüfen). Bei Umsätzen der Jahre 2025 und 2026 genügen bis zum 31.12.2026 noch Papier oder, mit Zustimmung der Empfangsseite, ein anderes elektronisches Format, etwa ein einfaches PDF. Bei Umsätzen des Jahres 2027 gilt dieselbe Erleichterung bis zum 31.12.2027 nur für Aussteller, die im Vorjahr höchstens 800.000 € Gesamtumsatz erzielten (gesetzlicher Wert); begünstigt ist auch der Datenaustausch im EDI-Verfahren. Es zählt der Zeitpunkt der Leistung, nicht das Rechnungsdatum. Für spätere Umsätze gibt es keine Übergangsregel mehr. Außerhalb der Pflicht liegen unter anderem steuerfreie Umsätze bestimmter Art, Kleinbetragsrechnungen bis 250 €, Rechnungen an Privatpersonen und an andere Empfangsseiten ohne unternehmerische Verwendung, Rechnungen mit Beteiligten im Ausland und Rechnungen von Kleinunternehmern; weitere Fälle sind nicht dargestellt (Stützangaben §§ 33, 34a UStDV).

### Rechnungsprüfung im Rechnungsprozess

Jedes Unternehmen legt selbst fest, wie es Echtheit der Herkunft, Unversehrtheit des Inhalts und Lesbarkeit einer Rechnung gewährleistet; das kann durch innerbetriebliche Kontrollverfahren geschehen, die einen verlässlichen **Prüfpfad** zwischen Rechnung und Leistung schaffen (Stützangabe § 14 Abs. 3 UStG; Stand Oktober 2026, vor Verwendung prüfen). Eine bestimmte Prüfung schreibt das Gesetz nicht vor. Üblich ist ein Ablauf aus Eingang und Erfassung der Rechnung, Prüfung, Freigabe und Zahlung; die Prüfung selbst läuft in Stufen:

- **Formale Prüfung:** Sind alle Pflichtangaben vorhanden und plausibel? Ist die Rechnungsnummer neu, oder liegt eine Dublette vor?
- **Sachliche Prüfung:** Stimmt die berechnete Leistung mit Bestellung und tatsächlichem Wareneingang überein, und passt der Preis zur Vereinbarung? Dieser Dreifachabgleich ist das Herzstück.
- **Rechnerische Prüfung:** Stimmen Menge mal Einzelpreis, Summen, Rabatte, Steuerbetrag und Gesamtbetrag?
- **Prüfung der Konditionen:** Wann ist die Rechnung fällig, und gilt ein Skonto bis zu welchem Tag?

Auf die Prüfung folgen die Freigabe (häufig im Vier-Augen-Prinzip) und die Zahlung, dazu Kontierung und Archivierung. Abweichungen werden nicht hingenommen oder selbst korrigiert, sondern beim Lieferunternehmen beanstandet: Es stellt eine berichtigte Rechnung aus oder schreibt den Betrag mit einem Korrekturbeleg gut. Das Wort **Gutschrift** hat zwei Bedeutungen: Im Umsatzsteuerrecht ist es eine Rechnung, die nach vorheriger Vereinbarung die Empfangsseite ausstellt (mit der Angabe „Gutschrift“), im Alltag oft ein Korrekturbeleg des Lieferunternehmens. Betrifft die Abweichung die Ware selbst, gelten die Regeln zu Wareneingangsprüfung, Mängelrechten und Verzug in diesem Thema (Thema 4.2 „Koordinieren von Aufgaben des Einkaufs und der Beschaffung“ im Fachgebiet „Steuern von Geschäftsprozessen im bürowirtschaftlichen Umfeld“); die Rechnung wird dann nicht ungeprüft freigegeben.

### Aufbewahrung von Rechnungen und Handelsbriefen

Kaufleute müssen bestimmte Unterlagen geordnet aufbewahren; die GmbH gilt als Handelsgesellschaft und ist Kaufmann (Stützangaben § 257 HGB, § 147 AO, § 14b UStG, § 13 Abs. 3 GmbHG; Stand Oktober 2026, vor Verwendung prüfen). Die Fristen unterscheiden sich nach der Art der Unterlage:

- **Zehn Jahre:** Handelsbücher, Inventare, Jahresabschlüsse und Lageberichte.
- **Acht Jahre:** Buchungsbelege, also Belege für Buchungen, und Rechnungen, nach dem Umsatzsteuerrecht empfangene wie ein Doppel der ausgestellten (Ausnahme für Banken und Versicherungen nicht dargestellt).
- **Sechs Jahre:** empfangene Handelsbriefe und Wiedergaben der abgesandten Handelsbriefe sowie, steuerrechtlich, die übrigen für die Besteuerung bedeutsamen Unterlagen.

**Handelsbriefe** sind nur Schriftstücke, die ein Handelsgeschäft betreffen (Stützangabe § 257 Abs. 2 HGB). Nach allgemeiner Auffassung zählen dazu Anfragen, Angebote, Bestellungen, Auftragsbestätigungen, Mängelrügen und Mahnungen zu einem Geschäft; rein private Post gehört nicht dazu. Nach Auffassung der Finanzverwaltung werden auch E-Mails so behandelt, wenn sie ein Handelsgeschäft betreffen.

Für den **Beginn** der Frist zählt das Ende des Kalenderjahres, in dem der Brief empfangen oder abgesandt wurde oder der Beleg entstanden ist (Stützangaben § 257 Abs. 5 HGB, § 147 Abs. 4 AO). Beispiel: Ein am Montag, 17.09.2029, empfangener Handelsbrief wird bis zum Ablauf des 31.12.2035 aufbewahrt. Steuerrechtlich **läuft die Frist nicht ab**, solange die Unterlage für Steuern von Bedeutung ist, deren Festsetzungsfrist noch läuft (Stützangabe § 147 Abs. 3 AO). Das Datenschutzrecht verlangt keine Löschung personenbezogener Daten, solange eine Aufbewahrungspflicht besteht (Thema 4.3 „Beurteilen von Datenbanksystemen und anderen bürowirtschaftlichen Anwendungen für den zielorientierten Einsatz“).

Für die **Form** gilt: Die meisten Unterlagen dürfen als Wiedergabe auf einem Datenträger aufbewahrt werden, wenn sie mit dem Original übereinstimmen, während der ganzen Frist verfügbar sind und jederzeit lesbar gemacht werden können (Stützangaben § 257 Abs. 3 HGB, § 147 Abs. 2 AO). Rechnungen müssen über die gesamte Frist echt, unversehrt und lesbar bleiben (Stützangabe § 14b Abs. 1 UStG). Bei einer E-Rechnung bewahrt das Unternehmen nach Darstellung der Finanzverwaltung die Datei im empfangenen Format auf; ein Ausdruck genügt nicht.

### Skonto: Vereinbarung, Berechnung und Umsatzsteuer

**Skonto** ist ein Preisnachlass, den das Lieferunternehmen für zügige Zahlung gewährt. Kein Gesetz räumt ihn ein: Ob, in welcher Höhe und bis wann er gilt, ergibt sich aus der Vereinbarung. Klärungsbedürftig sind die Bezugsgröße (der Rechnungsbetrag oder nur der Warenwert; das Rechenbeispiel zum Angebotsvergleich rechnet nach der Konvention dieses Kurses nur auf den Warenwert), der Fristbeginn (Rechnungsdatum, Rechnungszugang oder Lieferung) und die Frage, ob die Zahlung am Fristende dem Konto bereits gutgeschrieben sein muss. Ist vereinbart, dass die Frist ab Rechnungsdatum läuft, zählt nach den Auslegungsregeln des BGB der Tag des Rechnungsdatums nicht mit, und eine Frist nach Tagen endet mit Ablauf des letzten Tages (Stützangaben §§ 186, 187, 188 Abs. 1 BGB); ohne Abrede zum Fristbeginn bleibt offen, welches Ereignis zählt.

Steuerlich ist der Skontoabzug eine **Minderung des Entgelts**. Das Lieferunternehmen berichtigt die geschuldete Umsatzsteuer, die Empfangsseite ihren Vorsteuerabzug, und zwar jeweils für den Zeitraum, in dem die Änderung eintritt (Stützangabe § 17 Abs. 1 UStG; Stand Oktober 2026, vor Verwendung prüfen). Wird Skonto auf den Gesamtbetrag mit Umsatzsteuer berechnet, sinken Entgelt und Steuer im gleichen Verhältnis; die Berichtigung des Vorsteuerabzugs ist daher Steuerbetrag mal Skontosatz.

*Rechenbeispiel (frei gewählte Beispielwerte; Rechnung ohne Fracht, Skonto auf den Gesamtbetrag einschließlich Umsatzsteuer, Regelsteuersatz 19 %, Stand Oktober 2026, vor Verwendung prüfen; auf Cent gerundet):* Eine Eingangsrechnung lautet auf 4.250,00 € netto; die Umsatzsteuer beträgt 4.250,00 € × 19 % = 807,50 €, der Gesamtbetrag 5.057,50 €. Bei 2 % Skonto beträgt der Abzug 5.057,50 € × 2 % = 101,15 €, gezahlt werden 5.057,50 € − 101,15 € = 4.956,35 €. Das Nettoentgelt sinkt auf 4.250,00 € × 98 % = 4.165,00 €, die Umsatzsteuer auf 4.165,00 € × 19 % = 791,35 €. Der Vorsteuerabzug ist um 807,50 € − 791,35 € = 16,15 € zu berichtigen (gleich 807,50 € × 2 %). Die Einkaufsseite zahlt 4.956,35 €, ihr Vorsteuerabzug sinkt um 16,15 €, und ihr Nettoaufwand sinkt um 85,00 € auf 4.165,00 €; das entspricht der Nettobetrachtung im Bezugspreis des Rechenbeispiels zum Angebotsvergleich: Skonto mindert den Nettoaufwand um den Skontosatz.

## B. Karteikarten 4.2 (anhängen)

#### K-4.2-24
**Frage:** Welche Angaben muss eine Rechnung zwischen Unternehmen mindestens enthalten?
**Antwort:** Namen und Anschriften beider Seiten, Steuernummer oder USt-IdNr. des Leistenden, Ausstellungsdatum, einmalige Rechnungsnummer, Menge und Art der Leistung, Leistungszeitpunkt, Entgelt samt vereinbarter Minderung (Skonto), Steuersatz und Steuerbetrag (oder Befreiungshinweis).
`tags: rechnung, pflichtangaben` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.2-25
**Frage:** Warum ist die ordnungsgemäße Rechnung für die Einkaufsseite wichtig, und was tut sie bei fehlenden Angaben?
**Antwort:** Der Vorsteuerabzug setzt eine nach dem Gesetz ausgestellte Rechnung voraus; bei Mängeln ist er gefährdet, bis das Lieferunternehmen berichtigt hat. Abziehbar ist nur die gesetzlich geschuldete Steuer. Die Einkaufsseite verlangt die Berichtigung und ändert nichts selbst.
`tags: rechnung, vorsteuerabzug, berichtigung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-26
**Frage:** Was unterscheidet eine E-Rechnung von einer sonstigen Rechnung?
**Antwort:** Die E-Rechnung ist ein Datensatz in einem strukturierten Format nach europäischer Norm, den Software auslesen kann (etwa XRechnung oder ZUGFeRD in normgerechtem Profil). Papier und andere Formate, auch ein PDF, das nur das Bild zeigt, sind sonstige Rechnungen.
`tags: e-rechnung, rechnung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-27
**Frage:** Bis wann dürfen Rechnungen zwischen Inlandsunternehmen noch auf Papier oder als PDF kommen (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Bei Umsätzen der Jahre 2025 und 2026 bis zum 31.12.2026 auf Papier oder, mit Zustimmung der Empfangsseite, als PDF. Bei Umsätzen des Jahres 2027 bis zum 31.12.2027, aber nur für Aussteller mit höchstens 800.000 € Gesamtumsatz im Vorjahr. Danach entfällt die Übergangsregel.
`tags: e-rechnung, uebergang, fristen` · `schwierigkeit: schwer` · `bloom: erinnern`

#### K-4.2-28
**Frage:** Welche Stufen hat die Prüfung einer Eingangsrechnung?
**Antwort:** Formal (Pflichtangaben, Dublette), sachlich (Bestellung, Wareneingang und Rechnung stimmen überein, Preis passt), rechnerisch (Mengen, Summen, Steuer) und Konditionen (Fälligkeit, Skonto). Abweichungen beanstandet man beim Lieferunternehmen, bevor die Rechnung freigegeben wird.
`tags: rechnungspruefung, prozess` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-29
**Frage:** Wie lange müssen Bücher, Rechnungen und Handelsbriefe aufbewahrt werden, und wann beginnt die Frist bei Rechnungen und Handelsbriefen (Stand Oktober 2026, vor Verwendung prüfen)?
**Antwort:** Bücher und Jahresabschlüsse zehn Jahre, Rechnungen und Buchungsbelege acht Jahre, Handelsbriefe sechs Jahre. Bei Rechnungen und Handelsbriefen zählt für den Fristbeginn das Ende des Kalenderjahres, in dem sie ausgestellt, empfangen oder abgesandt wurden.
`tags: aufbewahrung, fristen` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-4.2-30
**Frage:** Was ist ein Handelsbrief im Sinne der Aufbewahrungspflicht, und nenne zwei Beispiele aus dem Einkauf?
**Antwort:** Ein Schriftstück, das ein Handelsgeschäft betrifft. Beispiele sind Angebot, Bestellung, Auftragsbestätigung und Mängelrüge. Empfangene Handelsbriefe und Wiedergaben der abgesandten werden sechs Jahre aufbewahrt, rein private Post gehört nicht dazu.
`tags: aufbewahrung, handelsbrief` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-31
**Frage:** Wie wirkt ein Skontoabzug rechtlich und umsatzsteuerlich?
**Antwort:** Skonto gilt nur, soweit vereinbart (Höhe, Frist, Fristbeginn). Der Abzug mindert das Entgelt: Das Lieferunternehmen berichtigt die Umsatzsteuer, die Empfangsseite ihren Vorsteuerabzug um Steuerbetrag mal Skontosatz.
`tags: skonto, umsatzsteuer` · `schwierigkeit: mittel` · `bloom: verstehen`

## C. Quiz 4.2 (anhängen)

#### Q-4.2-32 · Multiple Choice
**Frage:** Bei der Deko & Büro GmbH gehen Eingangsrechnungen in verschiedenen Dateien ein. Welche Datei ist eine E-Rechnung im Sinne des Umsatzsteuerrechts?
- [ ] Ein per E-Mail gesendetes PDF, das eine eingescannte Papierrechnung zeigt
- [x] Eine XRechnung-Datei mit strukturiertem Datensatz
- [ ] Ein Foto der Rechnung, das per Messenger verschickt wird
- [ ] Ein Textdokument mit einer Tabelle der Positionen und Preise
**Erklärung:** Eine E-Rechnung ist in einem strukturierten Format ausgestellt, das elektronisch verarbeitet werden kann. Bilder, Scans und frei gestaltete Dokumente sind sonstige Rechnungen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-33 · Mehrfachauswahl
**Frage:** Welche Angaben muss eine Rechnung über 1.200 € an ein anderes Unternehmen nach dem Umsatzsteuerrecht enthalten?
- [x] Eine fortlaufende, einmalig vergebene Rechnungsnummer
- [ ] Die vollständige Bankverbindung mit IBAN und BIC des leistenden Unternehmens
- [x] Die Steuernummer oder die USt-Identifikationsnummer des Lieferunternehmens
- [ ] Name und Telefonnummer einer Ansprechperson im Einkauf des Lieferunternehmens
- [x] Den Zeitpunkt der Lieferung (der Kalendermonat genügt)
**Erklärung:** Rechnungsnummer, Steuernummer oder Umsatzsteuer-Identifikationsnummer und Leistungszeitpunkt gehören zu den Pflichtangaben. Bankverbindung und Ansprechperson verlangt das Umsatzsteuerrecht nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-34 · Wahr/Falsch
**Aussage:** Fehlen auf einer Eingangsrechnung Steuernummer und Umsatzsteuer-Identifikationsnummer des Lieferunternehmens, darf die Einkaufsseite eine der beiden selbst ergänzen und danach den Vorsteuerabzug geltend machen.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Die Berichtigung kommt vom Lieferunternehmen. Ändert die Empfangsseite die Rechnung selbst, ist die Unversehrtheit ihres Inhalts nicht gewährleistet, und der Vorsteuerabzug ist gefährdet.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.2-35 · Sortieren
**Anweisung:** Bringe die Hauptschritte im Rechnungsprozess der Einkaufsseite in die richtige Reihenfolge.
1. Die Rechnung geht ein und wird erfasst
2. Die Rechnung wird geprüft
3. Die Rechnung wird zur Zahlung freigegeben
4. Der Betrag wird überwiesen
**Erklärung:** Geprüft werden kann erst, was eingegangen ist; freigegeben wird erst, was geprüft ist; und erst die Freigabe löst die Überweisung aus. Kontierung und Archivierung begleiten den Ablauf und sind hier nicht eingeordnet.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.2-36 · Lückentext (Wortauswahl)
**Text:** Zieht die Einkaufsseite Skonto ab, mindert sich das Entgelt, und sie muss deshalb ihren ___Vorsteuerabzug___ berichtigen.
**Zusätzliche Begriffe:** Gewinn; Kaufpreis; Rechnungsbetrag
**Erklärung:** Mit dem Entgelt sinkt die darauf entfallende Umsatzsteuer; das Lieferunternehmen berichtigt seine Steuer, die Empfangsseite den Vorsteuerabzug.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-4.2-37 · Kurzantwort
**Frage:** Eine Eingangsrechnung über 3.570,00 € brutto (einschließlich Umsatzsteuer) wird innerhalb der Skontofrist bezahlt; vereinbart sind 3 % Skonto auf den Rechnungsbetrag. Wie hoch ist der Überweisungsbetrag in Euro (auf Cent genau)?
**Akzeptierte Antworten:** 3.462,90; 3462,90; 3.462,90 €; 3462,90 €; 3.462,90 Euro; 3462,90 Euro; 3.462,90 EUR; 3462,90 EUR; 3.462,9; 3462,9; 3462.90; 3462.9; 3.462,90€; 3462,90€
**Erklärung:** Skonto 3.570,00 € × 3 % = 107,10 €; Überweisungsbetrag 3.570,00 € − 107,10 € = 3.462,90 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-38 · Kurzantwort
**Frage:** Die Deko & Büro GmbH erhält am Montag, 15.05.2028, eine am selben Tag ausgestellte Eingangsrechnung. Wann endet nach der Grundregel ihre Aufbewahrungsfrist, wenn eine Verlängerung wegen einer noch laufenden Steuerfestsetzung außer Betracht bleibt (Stand Oktober 2026, vor Verwendung prüfen)? Antworte im Format TT.MM.JJJJ.
**Akzeptierte Antworten:** 31.12.2036; 31.12.36; 31.12.2036.; 31. Dezember 2036; 31.Dezember 2036
**Erklärung:** Rechnungen werden acht Jahre aufbewahrt. Der Fristbeginn liegt am Ende des Kalenderjahres 2028; nach acht Jahren endet die Frist mit Ablauf des 31.12.2036.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-39 · Kurzantwort
**Frage:** Eine Eingangsrechnung weist 6.000,00 € netto und 19 % Umsatzsteuer aus. Die Deko & Büro GmbH nutzt 2 % Skonto auf den Gesamtbetrag. Um wie viel Euro muss sie ihren Vorsteuerabzug berichtigen (auf Cent genau)?
**Akzeptierte Antworten:** 22,80; 22,8; 22,80 €; 22,8 €; 22,80 Euro; 22,8 Euro; 22,80 EUR; 22,8 EUR; 22.80; 22.8; 22,80€; 22,8€
**Erklärung:** Umsatzsteuer 6.000,00 € × 19 % = 1.140,00 €; Berichtigung 1.140,00 € × 2 % = 22,80 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-40 · Entweder-Oder
**Frage:** Ein Lieferunternehmen mit 700.000 € Gesamtumsatz im Vorjahr stellt der Deko & Büro GmbH für eine Leistung im Jahr 2027 eine Rechnung als PDF-Datei ohne Datensatz aus; die Deko & Büro GmbH hat dieser Form zugestimmt. Ist das nach dem Stand Oktober 2026 noch zulässig (vor Verwendung prüfen)?
- [x] Ja, für kleinere Aussteller gilt die Übergangsregel bis Ende 2027
- [ ] Nein, für Umsätze ab 2027 ist zwischen Inlandsunternehmen nur noch die E-Rechnung zulässig
**Erklärung:** Für Umsätze des Jahres 2027 darf ein Aussteller mit einem Gesamtumsatz im Vorjahr von höchstens 800.000 € mit Zustimmung der Empfangsseite noch andere Formate verwenden. Für spätere Umsätze entfällt die Übergangsregel.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-4.2-41 · Multiple Choice
**Frage:** Welche Unterlage der Deko & Büro GmbH ist ein Handelsbrief, der sechs Jahre aufbewahrt wird?
- [ ] Ein Jahresabschluss
- [ ] Das Handbuch der Bürosoftware
- [x] Eine Bestellung beim Lieferunternehmen
- [ ] Die Nachricht einer Kollegin über das Mittagessen
**Erklärung:** Handelsbriefe sind Schriftstücke, die ein Handelsgeschäft betreffen, etwa Anfrage, Bestellung oder Mängelrüge. Der Jahresabschluss ist mit zehn Jahren länger aufzubewahren, Handbuch und private Nachricht betreffen kein Handelsgeschäft.
`schwierigkeit: leicht` · `bloom: anwenden`
