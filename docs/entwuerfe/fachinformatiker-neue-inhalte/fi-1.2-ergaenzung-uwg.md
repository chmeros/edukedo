# Entwurf Fachinformatiker (vier Kurse), Werbung und Wettbewerb (E-Mail-Werbung, Bestandskundenausnahme, Opt-in-Nachweis, Mitbewerberschutz): Ergänzung im Thema 1.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil L des Pakets P-AY (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-13, dort „P-AX“ Teil E). Einzufügen in `content/fachinformatiker-<kurs>/fu1/1.2-kundenberatung-bedarfsermittlung-marketing.md` (in allen vier Kursen byte-identisch bis auf `kurs_slug`, am 23.10.2026 mit `diff` geprüft): Abschnitt A **vor der Überschrift „### Marktbeobachtung und Wettbewerbsvergleich“** (Anker; die Theorie steht damit hinter „Kundenbeziehungen unter Beachtung rechtlicher Regelungen und betrieblicher Grundsätze“), B an die Karteikarten hinter K-1.2-20, C an das Quiz hinter Q-1.2-13. Bestand gezählt (Stand 23.10.2026): 20 Karteikarten (K-1.2-01 bis -20, lückenlos), 13 Quizfragen (Q-1.2-01 bis -13, lückenlos), in allen vier Kursen gleich; `git log -S` auf K-1.2-21 und Q-1.2-14 ergibt in den vier Fachinformatiker-Kursen keine entfernten IDs. Die neuen IDs sind K-1.2-21 bis -26 (6 Karten) und Q-1.2-14 bis -21 (8 Quizfragen, davon 1 Kurzantwort). Ein Fall und Fachgesprächsfragen sind für diesen Teil nicht vorgesehen; die Rechtsangaben stehen in `rechtsangaben-l.md`, die Ersetzung im Bestand in `ersetzungen-l.json` (ein Paar, in allen vier Kursen gleich). Der `rechtsstand` der berührten Datei wird beim Einspielen gesetzt.

**Zweck.** Der Bestand sagt zur Werbung nur, dass werbliche E-Mails „grundsätzlich nur mit vorheriger Einwilligung“ zulässig sind und die Ausnahmen „eng gefasst“ seien (Theorie, K-1.2-13, Q-1.2-02). Das ist richtig, nennt die Ausnahme aber nicht. Die kleine Ergänzung stellt die Einwilligung in Werbung, die **Bestandskundenausnahme** mit ihren vier Voraussetzungen, den Nachweis der Einwilligung (Double-Opt-in als übliches Verfahren, nicht als Pflicht) und die Folgen eines Verstoßes dar und fügt den Mitbewerberschutz (Herabsetzung, vergleichende Werbung) und das Empfehlungsmarketing hinzu. Gemeint sind mit „Wettbewerbsverbote“ der Auswertung die Verbote unlauteren Wettbewerbs im UWG, nicht vertragliche Wettbewerbsverbote im Arbeitsverhältnis. **Abgrenzung:** Datenschutz-Grundlagen (Rechtsgrundlagen, Einwilligung und Widerruf im Datenschutz) stehen in Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“; Cookies und Endgerätezugriff gehören zu Teil G (Thema 6.2) und kommen hier nicht vor; Preisangaben, Impressum und Widerruf im Fernabsatz stehen in Teil I (Thema 7.6 „Verbraucherrecht und Kaufvertrag: Kauf, Widerruf und digitale Produkte“ im Fachgebiet „Wirtschafts- und Sozialkunde“) und werden hier nicht wiederholt; Geschäftsgeheimnisse und Hinweisgeberschutz (L-FI-14) sind nicht im Umfang. Die Ergänzung ist ausdrücklich klein: kein Fall, kein Fachgespräch, keine Rechenaufgabe.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten und Quiz (auch keine Gesetzesnamen dort). Rechtsgrundlagen am Rohtext gelesen: UWG §§ 2, 3, 3a, 4, 5a, 5b, 6, 7, 7a, 8, 9, 10, 11, 13, 13a, 20 und Anhang Nr. 14, 26 (`gesetze-im-internet.de`, Stand „zuletzt geändert durch Art. 6 G v. 12.5.2026 I Nr. 139“, Abzug 26.09.2026), DDG §§ 6, 33, DSGVO Art. 4 Nr. 11, Art. 7, 21 und Erwägungsgründe 32, 47 im Amtsblattwortlaut (`publications.europa.eu`; vom Autor in der englischen, von der Prüfung in der deutschen Fassung gelesen); Einzelheiten und Stufe der Sicherheit in `rechtsangaben-l.md`. Rechtsprechung ist nicht ausgewertet. Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): Auslegung von „Verkauf“, „ähnlich“ und „mutmaßlicher Einwilligung“, Behandlung von Empfehlungs-E-Mails, Reichweite der Aufwendungsersatzausschlüsse bei Abmahnungen (nicht dargestellt), Abgrenzung von Widerruf und Widerspruch (vereinfacht). Brevanta als Unternehmen kommt im Lerntext nur in Quizfragen und Karten vor; neue Namen werden nicht eingeführt.

---

# Thema 1.2

## A. Theorie-Ergänzung 1.2 (einfügen vor „### Marktbeobachtung und Wettbewerbsvergleich“)

### Werbung per E-Mail und Telefon: Einwilligung, Bestandskundenausnahme und Nachweis

Wer Verteiler pflegt, Anmeldeformulare baut oder Newsletter-Werkzeuge anbindet, bewegt sich im Gesetz gegen den unlauteren Wettbewerb (UWG). Es schützt neben Verbraucher:innen jeden Marktteilnehmer, also auch Unternehmen als Kundschaft (Stützangabe § 2 Abs. 1 Nr. 3, § 7 Abs. 1 UWG; Stand Oktober 2026, vor Verwendung prüfen).

**Grundsatz: Einwilligung für elektronische Werbung.** Werbung per E-Mail (nach üblicher Auslegung auch per SMS), Fax oder automatischer Anrufmaschine ist ohne vorherige ausdrückliche Einwilligung der Angesprochenen unzumutbar belästigend, auch zwischen Unternehmen; für E-Mail gilt die Ausnahme weiter unten (Stützangabe § 7 Abs. 2 Nr. 2). Beim Werbeanruf braucht es gegenüber Verbraucher:innen die vorherige ausdrückliche, gegenüber anderen Marktteilnehmern auch eine mutmaßliche Einwilligung (Nr. 1; Auslegung).

**Einwilligung und Nachweis.** Maßstab ist die Einwilligung der Datenschutz-Grundverordnung (Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“); Schweigen und voreingestellte Häkchen genügen nicht (Stützangabe Art. 4 Nr. 11, Erwägungsgrund 32 DSGVO). Das werbende Unternehmen muss die Einwilligung belegen können (Art. 7 Abs. 1); ein bestimmtes Verfahren schreibt das Gesetz nicht vor. Verbreitet ist das **Double-Opt-in**: Die Anmeldung löst eine Bestätigungsmail aus, erst der Aufruf des Links darin schaltet die Adresse frei, und Zeitpunkt, Einwilligungstext und Bestätigung werden protokolliert. Ein bloßes Häkchen belegt nicht, dass die Adresse der anmeldenden Person gehört (Praxis).

**Bestandskundenausnahme.** Bei Werbung per E-Mail entfällt die Einwilligung nur, wenn alle vier Bedingungen zugleich vorliegen (Stützangabe § 7 Abs. 3):

- Das Unternehmen hat die Adresse im Zusammenhang mit einem Verkauf einer Ware oder Dienstleistung von seiner Kundschaft erhalten.
- Es verwendet sie für Direktwerbung für eigene, ähnliche Waren oder Dienstleistungen.
- Die Kundschaft hat der Verwendung nicht widersprochen.
- Bei der Erhebung der Adresse und bei jeder Verwendung wird klar und deutlich auf das jederzeitige Widerspruchsrecht hingewiesen, das nur Übermittlungskosten nach den Basistarifen verursachen darf.

Fehlt eine Bedingung, besteht die Ausnahme nicht. Sie befreit nur von der Einwilligung: Absender und Werbecharakter dürfen nicht verschleiert werden, und es muss eine gültige Adresse für die Abmeldung geben (Stützangabe § 7 Abs. 2 Nr. 3). Der Verkauf muss stattgefunden haben; eine Angebotsanfrage, ein Download oder ein Messekontakt ohne Vertragsschluss genügt nach dem Wortlaut nicht, und was „ähnlich“ ist, entscheidet der Einzelfall (Auslegung). Die Ausnahme gilt auch gegenüber Unternehmen als Kundschaft.

**Widerruf und Widerspruch.** Der Widerruf beendet eine erteilte Einwilligung (Stützangabe Art. 7 Abs. 3 DSGVO). Der Widerspruch richtet sich gegen eine Verarbeitung auf Grundlage berechtigter Interessen oder einer öffentlichen Aufgabe, etwa die Bestandskundenwerbung; gegen Direktwerbung ist er jederzeit möglich, danach werden die Daten dafür nicht mehr verarbeitet (Art. 21 Abs. 1 bis 3, Art. 6 Abs. 1 Buchst. e, f; vereinfachte Abgrenzung). Den Hinweis auf das Widerspruchsrecht verlangt das UWG schon bei der Erhebung der Adresse, die DSGVO spätestens in der ersten Mitteilung (Abs. 4). Beides ist nicht der Vertragswiderruf im Fernabsatz (Thema 7.6 „Verbraucherrecht und Kaufvertrag: Kauf, Widerruf und digitale Produkte“ im Fachgebiet „Wirtschafts- und Sozialkunde“).

### Fairer Wettbewerb: Mitbewerber, Vergleiche, Empfehlungen und Folgen

**Mitbewerber.** Unlauter handelt, wer Mitbewerber herabsetzt oder verunglimpft, über sie nicht erweislich wahre, geschäftsschädigende Tatsachen verbreitet oder sie gezielt behindert (Stützangabe § 4 Nr. 1, 2, 4 UWG; Stand Oktober 2026, vor Verwendung prüfen). Vergleichende Werbung, die einen Mitbewerber erkennbar macht, ist unter anderem unlauter, wenn der Vergleich nicht denselben Bedarf betrifft, nicht objektiv auf wesentliche, nachprüfbare Eigenschaften oder den Preis bezogen ist, verwechselbar macht, den Ruf eines Kennzeichens ausnutzt oder herabsetzt (§ 6 Abs. 2). In einem Angebot braucht eine Gegenüberstellung namentlich genannter Wettbewerber daher gleichartige, belegbare Angaben.

**Empfehlungen.** Prämien für das Werben von Kundschaft sind grundsätzlich nicht verboten, anders als Schneeballsysteme mit Teilnahmebeitrag gegenüber Verbraucher:innen (Stützangabe Anhang Nr. 14 UWG). Verschickt das System des Unternehmens auf Knopfdruck eine Nachricht an die empfohlene Person, gilt sie nach verbreiteter Auffassung als Werbung des Unternehmens und braucht die Einwilligung der empfohlenen Person (Auslegung).

**Folgen.** Verstöße begründen unter anderem Ansprüche auf Beseitigung und, bei Wiederholungsgefahr oder drohender Zuwiderhandlung, auf Unterlassung, auch gegen das Unternehmen, wenn Beschäftigte oder Beauftragte den Verstoß begangen haben (Stützangabe § 8 Abs. 1, 2). Anspruch haben unter anderem Mitbewerber mit nicht nur gelegentlichem Marktauftritt, qualifizierte Verbände und Kammern wie die IHK (Abs. 3); sie sollen vor einer Klage abmahnen, und wer berechtigt abmahnt, kann Ersatz der Aufwendungen verlangen (§ 13 Abs. 1, 3). Mitbewerbern ist bei Vorsatz oder Fahrlässigkeit der Schaden zu ersetzen (§ 9 Abs. 1); Verbände und Kammern können bei Vorsatz oder grober Fahrlässigkeit Gewinne abschöpfen (§ 10). Die Ansprüche verjähren in der Regel sechs Monate nach Kenntnis oder grob fahrlässiger Unkenntnis von Verstoß und Verantwortlichem (§ 11 Abs. 1, 2). Werbeanrufe bei Verbraucher:innen ohne Einwilligung sind außerdem eine Ordnungswidrigkeit; die Einwilligung ist zu dokumentieren und fünf Jahre ab Erteilung und nach jeder Verwendung aufzubewahren (§ 7a, § 20). Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 1.2 (anhängen)

#### K-1.2-21
**Frage:** Ein Unternehmen hat Lizenzen bei Brevanta gekauft und nie widersprochen; die Adresse stammt aus der Bestellung. Brevanta wirbt per E-Mail für ein ähnliches eigenes Produkt, nennt das Widerspruchsrecht aber nie. Darf Brevanta ohne Einwilligung werben?
**Antwort:** Nein, es fehlt der klare Hinweis auf das Widerspruchsrecht bei der Erhebung der Adresse und bei jeder Verwendung. Die Ausnahme verlangt zugleich Verkauf, eigene ähnliche Werbung und fehlenden Widerspruch; fehlt eine Bedingung, entfällt sie.
`tags: werbung, bestandskunden, recht` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.2-22
**Frage:** Reicht es für die Bestandskundenausnahme, dass jemand nur ein Angebot angefragt oder auf einer Messe seine Visitenkarte abgegeben hat?
**Antwort:** Nein. Die Adresse muss im Zusammenhang mit einem Verkauf erhoben worden sein. Anfrage, Download oder Messekontakt ohne Vertragsschluss genügen nach dem Wortlaut nicht; dann braucht es eine Einwilligung.
`tags: werbung, bestandskunden, einwilligung` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-1.2-23
**Frage:** Warum protokolliert ein Newsletter-Werkzeug beim Double-Opt-in Zeitpunkt und Einwilligungstext?
**Antwort:** Weil das Unternehmen die Einwilligung belegen können muss. Ohne Protokoll trägt es das Risiko, wenn jemand bestreitet, eingewilligt zu haben. Das Double-Opt-in ist verbreitet, aber gesetzlich nicht vorgeschrieben.
`tags: werbung, einwilligung, nachweis` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.2-24
**Frage:** Worin unterscheiden sich Widerruf und Widerspruch im Datenschutz der Werbung?
**Antwort:** Der Widerruf beendet eine erteilte Einwilligung. Der Widerspruch richtet sich gegen eine Verarbeitung auf Grundlage berechtigter Interessen, etwa Werbung an Bestandskundschaft; gegen Direktwerbung ist er jederzeit möglich. Danach darf nicht mehr dafür geworben werden.
`tags: werbung, widerruf, widerspruch` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.2-25
**Frage:** Wann ist der Vergleich mit einem Wettbewerber in einem Angebot zulässig?
**Antwort:** Wenn er Leistungen für denselben Bedarf objektiv auf wesentliche, nachprüfbare Eigenschaften oder den Preis bezieht und weder herabsetzt noch verwechselbar macht. Die Angaben müssen belegbar sein.
`tags: wettbewerb, vergleichende-werbung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.2-26
**Frage:** Welche Folgen kann eine unzulässige Werbe-E-Mail für das Unternehmen haben?
**Antwort:** Unter anderem Beseitigung und Unterlassung (auch bei Fehlern von Beschäftigten), Ersatz der Aufwendungen bei berechtigter Abmahnung und bei Vorsatz oder Fahrlässigkeit Schadensersatz an Mitbewerber. Die Ansprüche verjähren in der Regel nach sechs Monaten.
`tags: werbung, folgen, abmahnung` · `schwierigkeit: mittel` · `bloom: verstehen`

## C. Quiz 1.2 (anhängen)

#### Q-1.2-14 · Multiple Choice
**Frage:** Ein Industrieunternehmen hat bei Brevanta einen Wartungsvertrag geschlossen und dabei seine E-Mail-Adresse angegeben; es hat nie widersprochen. Der Vertrieb lädt es ohne Einwilligung per E-Mail zu einer Schulung für die gewartete Software ein. Die Schulung gilt als ähnliches eigenes Angebot. Die Mail nennt den Absender und eine gültige Abmeldeadresse, und das Widerspruchsrecht wurde bei der Erfassung der Adresse und wird in der Einladung klar genannt. Was gilt?
- [x] Zulässig, denn alle Voraussetzungen der Ausnahme liegen vor.
- [ ] Unzulässig, denn E-Mail-Werbung verlangt ausnahmslos eine Einwilligung.
- [ ] Zulässig nur, wenn das Unternehmen die Schulung zuvor ausdrücklich angefordert hat.
- [ ] Unzulässig, denn die Ausnahme gilt nur für den Verkauf von Waren, nicht von Dienstleistungen.
**Erklärung:** Die Ausnahme gilt auch gegenüber Unternehmen und für Waren wie Dienstleistungen. Sie befreit nur von der Einwilligung; Absender und Abmeldeadresse müssen trotzdem stimmen.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-1.2-15 · Multiple Choice
**Frage:** Ein Unternehmen hat auf der Brevanta-Website die Testversion einer Software heruntergeladen und dafür seine Adresse im Formular angegeben. Zu einem Kauf kam es nicht. Der Vertrieb will ihm Lizenzangebote per E-Mail schicken. Was ist richtig?
- [ ] Zulässig, weil die Testversion kostenlos ist und die Adresse freiwillig angegeben wurde.
- [ ] Zulässig, wenn die erste Mail binnen 14 Tagen nach dem Download folgt.
- [x] Nur mit der vorherigen ausdrücklichen Einwilligung des Unternehmens zulässig.
- [ ] Unzulässig, weil Interessenten grundsätzlich nicht angeschrieben werden dürfen.
**Erklärung:** Ohne Verkauf greift die Bestandskundenausnahme nicht. Der Download ersetzt keine Einwilligung; mit Einwilligung ist Werbung an Interessenten möglich.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.2-16 · Entweder-Oder
**Frage:** Eine Kundin hat der Werbung per E-Mail ausdrücklich widersprochen. Was gilt danach für weitere Werbe-E-Mails?
- [x] Ohne neue Einwilligung sind sie unzulässig.
- [ ] Sie bleiben zulässig, weil die Kundin früher gekauft hat und die Ausnahme den Widerspruch überdauert.
**Erklärung:** Der fehlende Widerspruch ist eine der vier Bedingungen der Ausnahme. Nach einem Widerspruch entfällt sie.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.2-17 · Sortieren
**Anweisung:** Bringe die Schritte eines Newsletter-Werkzeugs beim Double-Opt-in in die richtige Reihenfolge.
1. Die Adresse steht mit dem Status „unbestätigt“ auf einer Warteliste.
2. Das Werkzeug verschickt eine Mail mit persönlichem Bestätigungslink.
3. Die anmeldende Person ruft den Link auf.
4. Das Werkzeug setzt den Status „bestätigt“ mit Zeitstempel und nimmt die Adresse in den Verteiler auf.
**Erklärung:** Erst der Aufruf des Links zeigt, dass die Adresse der anmeldenden Person zugänglich ist. Danach folgen Statuswechsel und Zeitstempel als Beleg. Gesetzlich verlangt wird der Nachweis, nicht dieses Verfahren.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.2-18 · Wahr/Falsch
**Aussage:** Versendet eine Beschäftigte von Brevanta eigenmächtig eine unzulässige Werbe-E-Mail, haftet allein sie persönlich, das Unternehmen nicht.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Der Anspruch auf Beseitigung und Unterlassung besteht auch gegen das Unternehmen, wenn Beschäftigte oder Beauftragte den Verstoß begehen.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-1.2-19 · Mehrfachauswahl
**Frage:** Der Vertrieb will in einem Angebot Leistungen und Preise von zwei namentlich genannten Wettbewerbern gegenüberstellen. Welche Aussagen treffen zu?
- [x] Der Vergleich muss Leistungen für denselben Bedarf betreffen.
- [x] Die verglichenen Angaben müssen belegbar und nachprüfbar sein.
- [ ] Wettbewerber dürfen in Angeboten grundsätzlich nicht genannt werden.
- [x] Herabsetzende Zusätze über die Wettbewerber sind unzulässig.
**Erklärung:** Vergleichende Werbung ist erlaubt, wenn sie sachlich, vergleichbar und nachprüfbar ist und nicht herabsetzt oder verwechselbar macht. Ein grundsätzliches Namensverbot gibt es nicht.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-1.2-20 · Zuordnung
**Anweisung:** Ordne jeden Begriff der passenden Bedeutung zu.
- Widerruf ↔ beendet eine erteilte Einwilligung in Werbung
- Widerspruch ↔ wehrt Werbung auf Grundlage berechtigter Interessen ab, etwa an Bestandskundschaft
- Double-Opt-in ↔ Bestätigung der Anmeldung über einen Link in einer Mail
- Bestandskundenausnahme ↔ Werbe-E-Mail für eigene ähnliche Angebote ohne Einwilligung
**Erklärung:** Widerruf und Widerspruch beenden die Werbung für die Zukunft. Double-Opt-in dient dem Nachweis der Einwilligung, die Bestandskundenausnahme ersetzt sie unter strengen Voraussetzungen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.2-21 · Kurzantwort
**Frage:** Wie viele Jahre muss der Nachweis über die Einwilligung in Werbeanrufe bei Verbraucher:innen aufbewahrt werden, gerechnet ab Erteilung und nach jeder Verwendung der Einwilligung? Antworte mit einer Zahl.
**Akzeptierte Antworten:** 5; fünf; 5 Jahre; fünf Jahre
**Erklärung:** Das werbende Unternehmen muss die Einwilligung zum Zeitpunkt der Erteilung dokumentieren und den Nachweis fünf Jahre aufbewahren, die Frist läuft ab Erteilung und erneut nach jeder Verwendung.
`schwierigkeit: leicht` · `bloom: erinnern`
