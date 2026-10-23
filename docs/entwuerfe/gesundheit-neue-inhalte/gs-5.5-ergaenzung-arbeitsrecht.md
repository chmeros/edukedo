# Entwurf Fachwirt im Gesundheits- und Sozialwesen, Arbeitsrecht-Rest: Ergänzung im Thema 5.5

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil AW-A des Pakets P-AW (Auftrag `docs/entwuerfe/gesundheit-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/gesundheit-r4-auswertung.md`, Lücke GS-5, Fachlehrer-Befund FL-GS-39; überarbeitet nach `pruefung-aw-a.md`). Einzufügen in `content/fachwirt-gesundheit-soziales/hb5/5.5-arbeitsrecht.md` in **zwei Blöcken**, deshalb gibt es zwei Theorieabschnitte mit je eigenen Karten und Quizfragen (Config: zwei Einträge für dieselbe Datei, `["A","B","C","hb5/5.5-arbeitsrecht.md","### Mutterschutz und Jugendarbeitsschutz (Grundzüge)"]` und danach `["D","E","F","hb5/5.5-arbeitsrecht.md","### Kündigung und Kündigungsschutz"]`; die Reihenfolge der Einträge ist die Reihenfolge der IDs):

- **Block 1** (Abschnitt A, B, C): Theorie **vor der Überschrift „### Mutterschutz und Jugendarbeitsschutz (Grundzüge)“** (hinter „Kündigung und Kündigungsschutz“), Karten K-5.5-20 bis -28 an die Karteikarten hinter K-5.5-19, Quizfragen Q-5.5-15 bis -23 an das Quiz hinter Q-5.5-14.
- **Block 2** (Abschnitt D, E, F): Theorie **vor der Überschrift „### Kündigung und Kündigungsschutz“** (hinter „Arbeitszeit und Urlaub“), Karten K-5.5-29 bis -36, Quizfragen Q-5.5-24 bis -33.

Bestand gezählt (Stand 23.10.2026): 19 Karteikarten (K-5.5-01 bis -19, lückenlos), 14 Quizfragen (Q-5.5-01 bis -14, lückenlos); `git log -S` auf K-5.5-20, Q-5.5-15 und F-HB5-05 ergibt im Kurs keine entfernten IDs (F-HB5-05 kommt nur im Kurs Immobilienfachwirt vor). Neu: 17 Karten (K-5.5-20 bis -36), 19 Quizfragen (Q-5.5-15 bis -33, davon 6 Kurzantworten mit Datum oder Rechnung). Die Fallaufgabe F-HB5-05 (Bestand F-HB5-01 bis -04, Teil AW-B vergibt F-HB5-06) und fünf Fachgesprächsfragen stehen in `gs-faelle-aw-a.md`, die Rechtsangaben in `rechtsangaben-aw-a.md`, die eine Ersetzung im Bestand (Satz zu den Kündigungsfristen in „Kündigung und Kündigungsschutz“) in `ersetzungen-aw-a.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand behandelt Kündigung und Kündigungsschutz in einem Absatz (ordentlich und außerordentlich, Kündigungsschutzgesetz, Sonderkündigungsschutz, Betriebsrat), die Probezeitfrist und die Arbeitszeitgrenzen. Es fehlen die Abmahnung, die Schriftform der Kündigung, die Dreiwochenfrist der Kündigungsschutzklage, die gestaffelten Kündigungsfristen der Arbeitgeberseite, die Entgeltfortzahlung im Krankheitsfall, die kurzzeitige Arbeitsverhinderung, Pflegezeit und Familienpflegezeit sowie die Abgrenzung von Rufbereitschaft und Bereitschaftsdienst (Bezug: geplante Notfallrufbereitschaft in Fallaufgabe F-HB3-03). Die Ergänzung wiederholt nichts aus den Abschnitten Probezeit, Arbeitszeit und Urlaub, Kündigung und Kündigungsschutz, Mutterschutz und Jugendarbeitsschutz (nach P-AU eingespielt) und Betriebsverfassungsrecht; sie verweist darauf. Sie nennt keine Euro-Beträge der Pflegeversicherung. Elternzeit, Mutterschutz, Jugendarbeitsschutz, Pflegemindestlohn und Beschäftigtendatenschutz sind nicht Gegenstand (Pflegemindestlohn, Zulagen und Datenschutz: Teil AW-B). Die Sicht ist die der Arbeitgeberseite in einem ambulanten Pflegedienst („Morgenlicht“) mit Touren, Dienstplan und Notfallrufbereitschaft.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch. Rechtsgrundlagen am Rohtext von gesetze-im-internet.de gelesen (BGB, KSchG, EntgFG, PflegeZG, FPfZG, ArbZG, SGB XI § 44a, SGB V § 45, SGB IV § 109, BetrVG, ZPO § 222, ArbGG § 46); Rechtsprechung nur als Sekundärquelle (Einzelheiten und Stufe der Sicherheit in `rechtsangaben-aw-a.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): Pflegezeit und Familienpflegezeit (zuletzt durch Artikel 4 des Gesetzes vom 22.12.2025 geändert, Inhalt der Änderung nicht gesondert nachgewiesen), die elektronische Arbeitsunfähigkeitsmeldung, die Rechtsprechung zu Abmahnung und Rufbereitschaft.

---

# Thema 5.5

## A. Theorie-Ergänzung 5.5, erster Teil (einfügen vor „### Mutterschutz und Jugendarbeitsschutz (Grundzüge)“)

### Abmahnung und verhaltensbedingte Kündigung

Die **Abmahnung** ist die Rüge einer konkreten Pflichtverletzung, verbunden mit der Aufforderung zu vertragsgemäßem Verhalten und der Warnung, dass im Wiederholungsfall der Bestand des Arbeitsverhältnisses gefährdet ist. Sie ist arbeitsrechtlich nicht eigens geregelt, sondern folgt aus dem Grundsatz, dass eine Kündigung das letzte Mittel sein soll (Stützangabe § 314 Abs. 2 BGB; Rechtsprechung des Bundesarbeitsgerichts; Stand Oktober 2026, vor Verwendung prüfen). Sie benennt das Fehlverhalten genau (Rüge), warnt vor Folgen und dient als Nachweis. Eine feste Form gibt es nicht, auch mündlich ist sie möglich; schriftlich und in der Personalakte ist sie beweisbar, und das ist wichtig, weil die Arbeitgeberseite die Tatsachen beweisen muss, die die Kündigung bedingen (Stützangabe § 1 Abs. 2 Satz 4 KSchG); nennt die Person Gründe für ihr Verhalten, hat die Arbeitgeberseite sie nach der Rechtsprechung zu widerlegen. Eine bloße Erinnerung ohne Hinweis auf Folgen warnt nicht. Ein Betriebsrat ist nach dem Wortlaut nur vor einer Kündigung zu hören (Stützangabe § 102 Abs. 1 BetrVG).

Vor einer **ordentlichen verhaltensbedingten Kündigung** ist nach der Rechtsprechung grundsätzlich abzumahnen, wenn das Verhalten steuerbar und Besserung zu erwarten ist; abgemahnt wird die gleichartige Pflichtverletzung (etwa wiederholtes Fehlen ohne Meldung). Hinzukommen eine negative Prognose und eine Interessenabwägung im Einzelfall, etwa nach der Dauer der Beschäftigung. Entbehrlich ist die Abmahnung bei schwerster Pflichtverletzung oder wenn keine Änderung zu erwarten ist. Eine sozial ungerechtfertigte Kündigung ist unwirksam (Stützangabe § 1 Abs. 1, 2 KSchG). Die **außerordentliche Kündigung** braucht einen wichtigen Grund, der die Fortsetzung bis zum Ende der Kündigungsfrist unzumutbar macht; wegen einer Pflichtverletzung ist grundsätzlich auch hier abzumahnen, es sei denn, besondere Umstände rechtfertigen die sofortige Kündigung (Stützangabe § 626 Abs. 1, § 314 Abs. 2 BGB). Sie ist nur binnen zwei Wochen nach Kenntnis der maßgebenden Tatsachen möglich, auf Verlangen sind die Gründe unverzüglich schriftlich mitzuteilen (Stützangabe § 626 Abs. 2 BGB); ein Betriebsrat teilt Bedenken binnen drei Tagen mit (Stützangabe § 102 Abs. 2 Satz 3 BetrVG).

### Form und Frist der Kündigung, Kündigungsschutzklage

**Schriftform.** Die Kündigung muss schriftlich erfolgen, die elektronische Form scheidet aus (Stützangabe § 623 BGB; Stand Oktober 2026, vor Verwendung prüfen). Sie muss eigenhändig unterschrieben sein (Stützangabe § 126 Abs. 1 BGB); E-Mail, Messenger, Telefax oder Scan genügen nicht, eine mündliche Kündigung ist nichtig (Stützangabe § 125 BGB). Wirksam wird sie mit dem Zugang (Stützangabe § 130 Abs. 1 BGB). Die Gründe einer ordentlichen Kündigung müssen nach dem Wortlaut nicht im Schreiben stehen; für besondere Gruppen, etwa Auszubildende, gelten Ausnahmen.

**Gestaffelte Fristen.** Die Grundfrist beträgt vier Wochen zum Fünfzehnten oder zum Ende eines Kalendermonats; außerhalb der Probezeit (dort zwei Wochen) kündigen Beschäftigte gesetzlich mit ihr. Kündigt die Arbeitgeberseite, wächst die Frist mit der Zugehörigkeit zu Betrieb oder Unternehmen stufenweise, immer zum Monatsende: ein Monat ab zwei Jahren, zwei ab fünf, drei ab acht, vier ab zehn, fünf ab zwölf, sechs ab 15 und sieben Monate ab 20 Jahren (Stützangabe § 622 Abs. 1 bis 3 BGB). Ein Tarifvertrag kann abweichen. Einzelvertraglich darf nur die Grundfrist, nicht die Staffelung, unterschritten werden: bei vorübergehender Aushilfe bis zu drei Monaten und bei Arbeitgeberseiten mit in der Regel höchstens 20 Beschäftigten (ohne Auszubildende; Teilzeit bis 20 Wochenstunden 0,5, bis 30 Stunden 0,75), meist durch Wegfall der festen Termine; vier Wochen bleiben das Minimum (Abs. 4 bis 6). Der Zugangstag zählt nicht mit; eine Wochenfrist läuft am gleichnamigen Wochentag ab, eine Monatsfrist an dem Tag mit gleicher Zahl (Stützangabe §§ 187 Abs. 1, 188 Abs. 2 BGB).

**Kündigungsschutzklage.** Wer eine Kündigung für sozial ungerechtfertigt oder aus anderen Gründen unwirksam hält, muss binnen **drei Wochen** nach Zugang der schriftlichen Kündigung eine Klage beim Arbeitsgericht einreichen, die feststellen soll, dass das Arbeitsverhältnis nicht aufgelöst wurde (Stützangabe § 4 Satz 1 KSchG); das gilt auch für die außerordentliche Kündigung und in Kleinbetrieben, für die das Kündigungsschutzgesetz sonst nicht gilt (Stützangabe §§ 13 Abs. 1 Satz 2, 23 Abs. 1 Satz 2). Wird die Unwirksamkeit nicht rechtzeitig geltend gemacht, gilt die Kündigung als von Anfang an wirksam; wer trotz zumutbarer Sorgfalt gehindert war, kann binnen zwei Wochen nach Wegfall des Hindernisses (höchstens sechs Monate nach Fristende) die nachträgliche Zulassung beantragen (Stützangabe §§ 5, 7 KSchG). Liegt das Fristende an einem Wochenende oder gesetzlichen Feiertag, rückt es auf den nächsten Werktag (Stützangabe § 222 Abs. 2 ZPO über § 46 Abs. 2 ArbGG).

### Rechenbeispiele: Kündigungsfrist und Klagefrist

Alle Werte sind frei gewählte Beispielwerte (Stand Oktober 2026, vor Verwendung prüfen). Bei Zugang am Dienstag, 12.01.2027, läuft die Frist von zwei Monaten (Arbeitgeberkündigung nach sechs Jahren) am 12.03.2027 ab, das Arbeitsverhältnis endet am 31.03.2027; kündigt die Pflegekraft selbst, läuft die Grundfrist am 09.02.2027 ab, und es endet zum 15.02.2027. Bei Zugang am Samstag, 06.03.2027, endet die Klagefrist rechnerisch am Samstag, 27.03.2027, also am Montag, 29.03.2027.

## B. Karteikarten 5.5, erster Teil (anhängen)

#### K-5.5-20
**Frage:** Was ist eine Abmahnung, und welche Aufgaben erfüllt sie?
**Antwort:** Die Rüge einer konkreten Pflichtverletzung mit der Aufforderung zu vertragsgemäßem Verhalten und der Warnung, dass im Wiederholungsfall der Bestand des Arbeitsverhältnisses gefährdet ist. Sie dient zugleich als Nachweis.
`tags: abmahnung, kuendigung` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-5.5-21
**Frage:** Wann ist vor einer verhaltensbedingten Kündigung grundsätzlich abzumahnen, und was kommt hinzu?
**Antwort:** Wenn das Verhalten steuerbar ist und Besserung zu erwarten ist; abgemahnt wird die gleichartige Pflichtverletzung. Hinzu kommen eine negative Prognose und eine Interessenabwägung im Einzelfall. Bei schwersten Verstößen kann die Abmahnung entbehrlich sein.
`tags: abmahnung, verhaltensbedingte-kuendigung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.5-22
**Frage:** Muss eine Abmahnung schriftlich erfolgen, und wer muss die Tatsachen der Pflichtverletzung später beweisen?
**Antwort:** Eine feste Form gibt es nicht, auch mündlich ist möglich. Schriftlich und in der Personalakte ist sie beweisbar, und das ist wichtig, weil die Arbeitgeberseite die Tatsachen beweisen muss, die die Kündigung bedingen.
`tags: abmahnung, beweislast` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.5-23
**Frage:** Welche Voraussetzungen hat die außerordentliche Kündigung, und welche Frist gilt für ihren Ausspruch?
**Antwort:** Ein wichtiger Grund, der die Fortsetzung bis zum Ende der Kündigungsfrist unzumutbar macht; bei Pflichtverletzungen grundsätzlich nach Abmahnung. Sie ist nur innerhalb von zwei Wochen möglich, nachdem die kündigende Seite die maßgebenden Tatsachen kennt.
`tags: kuendigung, ausserordentlich` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.5-24
**Frage:** Welche Form muss eine Kündigung haben, und was gilt bei einer Kündigung per E-Mail?
**Antwort:** Schriftlich auf Papier mit eigenhändiger Unterschrift; die elektronische Form scheidet aus. Per E-Mail, Messenger oder als Scan ist die Kündigung unwirksam, mündlich ebenso.
`tags: kuendigung, schriftform` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-5.5-25
**Frage:** Welche Grundfrist gilt für Kündigungen im Arbeitsverhältnis, und mit welcher Frist kündigen Beschäftigte?
**Antwort:** Vier Wochen zum Fünfzehnten oder zum Ende eines Kalendermonats. Beschäftigte kündigen außerhalb der Probezeit gesetzlich mit dieser Frist, ohne Staffelung; in der Probezeit gelten zwei Wochen.
`tags: kuendigungsfrist, grundfrist` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-5.5-26
**Frage:** Wie verlängert sich die Kündigungsfrist, wenn die Arbeitgeberseite kündigt?
**Antwort:** Stufenweise mit der Zugehörigkeit, immer zum Monatsende: ab zwei Jahren ein Monat, ab fünf zwei, ab acht drei, ab zehn vier, ab zwölf fünf, ab 15 sechs, ab 20 Jahren sieben Monate.
`tags: kuendigungsfrist, staffelung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-5.5-27
**Frage:** Wer darf von den gesetzlichen Kündigungsfristen abweichen?
**Antwort:** Tarifverträge. Einzelvertraglich darf nur die Grundfrist unterschritten werden, bei Aushilfen bis zu drei Monaten und bei Arbeitgeberseiten mit in der Regel höchstens 20 Beschäftigten; vier Wochen bleiben das Minimum.
`tags: kuendigungsfrist, abweichung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-5.5-28
**Frage:** Welche Frist gilt für die Kündigungsschutzklage, und was geschieht bei Versäumnis?
**Antwort:** Drei Wochen nach Zugang der schriftlichen Kündigung, Klage beim Arbeitsgericht. Wird sie versäumt, gilt die Kündigung als von Anfang an wirksam; nur bei Verhinderung trotz zumutbarer Sorgfalt kann die nachträgliche Zulassung beantragt werden.
`tags: kuendigungsschutzklage, klagefrist` · `schwierigkeit: mittel` · `bloom: erinnern`

## C. Quiz 5.5, erster Teil (anhängen)

#### Q-5.5-15 · Multiple Choice
**Frage:** Eine Pflegehilfskraft ist zum dritten Mal ohne Meldung nicht zur Frühtour erschienen. Zuvor wurde sie einmal mündlich an die Meldepflicht erinnert, ohne Hinweis auf Folgen. Was ist die zutreffende Einschätzung?
- [ ] Die Erinnerung genügt als Abmahnung, weil mündliche Hinweise immer ausreichen.
- [ ] Eine Abmahnung ist nie erforderlich, weil das Fehlen ohne Meldung stets zur Kündigung berechtigt.
- [x] Die bloße Erinnerung warnt nicht vor Folgen; vor der Kündigung ist noch abzumahnen.
- [ ] Eine Abmahnung ist nur möglich, wenn der Betriebsrat vorher zugestimmt hat.
**Erklärung:** Eine Abmahnung rügt das Verhalten und warnt vor Folgen. Eine Erinnerung ohne Hinweis auf mögliche Folgen erfüllt die Warnfunktion nicht; bei steuerbarem Verhalten ist vor der verhaltensbedingten Kündigung grundsätzlich abzumahnen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-16 · Mehrfachauswahl
**Frage:** Was gehört in eine Abmahnung, die ihre Aufgabe erfüllen soll?
- [x] Das beanstandete Verhalten mit Datum und genauer Beschreibung
- [x] Die Aufforderung, sich künftig vertragsgemäß zu verhalten
- [x] Der Hinweis auf mögliche arbeitsrechtliche Folgen im Wiederholungsfall
- [ ] Die schriftliche Zustimmung der abgemahnten Person zum Inhalt des Schreibens
- [ ] Die vorherige Genehmigung durch die zuständige Aufsichtsbehörde
**Erklärung:** Rüge, Aufforderung und Warnung machen die Abmahnung aus. Eine Zustimmung der abgemahnten Person oder einer Behörde ist nicht nötig.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-5.5-17 · Sortieren
**Anweisung:** Bringe die Schritte bis zur ordentlichen verhaltensbedingten Kündigung in die zeitliche Reihenfolge.
1. Die Pflichtverletzung wird festgestellt und dokumentiert
2. Die abgemahnte Person erhält eine Abmahnung mit Hinweis auf mögliche Folgen
3. Die gleichartige Pflichtverletzung wiederholt sich
4. Die Kündigung geht schriftlich mit eigenhändiger Unterschrift zu
**Erklärung:** Auf die dokumentierte Pflichtverletzung folgt die Abmahnung; erst die gleichartige Wiederholung trägt eine Kündigung, die schriftlich zugehen muss.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-18 · Entweder-Oder
**Frage:** Die Verwaltung schickt einer Pflegefachkraft die Kündigung als unterschriebenen Scan per E-Mail. Ist die Kündigung wirksam?
- [x] Nein, die Kündigung braucht Papier mit eigenhändiger Unterschrift; die elektronische Form scheidet aus.
- [ ] Ja, weil sie unterschrieben ist, die Person sie lesen kann und der Scan den Inhalt vollständig wiedergibt.
**Erklärung:** Die Kündigung braucht ein eigenhändig unterschriebenes Schriftstück. Ein Scan per E-Mail wahrt die Form nicht, die Kündigung ist unwirksam.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-19 · Kurzantwort
**Frage:** Die Arbeitgeberseite kündigt einer Pflegekraft nach 12 Jahren Betriebszugehörigkeit ordentlich; die Kündigung geht am Dienstag, 15.12.2026, zu. Zu welchem Datum (TT.MM.JJJJ) endet das Arbeitsverhältnis frühestens, wenn die gesetzliche Frist gilt? Der Zugangstag zählt nicht mit; die Frist läuft zum Monatsende.
**Akzeptierte Antworten:** 31.05.2027; 31.5.2027; 31.05.27; 31.5.27; 31.05.2027.; 31. Mai 2027; 31 Mai 2027; 31.Mai 2027; 31. Mai 27
**Erklärung:** Nach 12 Jahren beträgt die Frist fünf Monate zum Monatsende. Sie läuft am 15.05.2027 ab, das Arbeitsverhältnis endet deshalb zum 31.05.2027.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-20 · Multiple Choice
**Frage:** Eine Pflegekraft mit 6 Jahren Betriebszugehörigkeit will nach der Probezeit selbst kündigen. Welche gesetzliche Frist gilt für ihre Kündigung?
- [ ] Zwei Monate zum Monatsende, weil die Frist mit der Betriebszugehörigkeit steigt.
- [ ] Zwei Wochen, weil sie als Pflegekraft in einem Dienst arbeitet.
- [ ] Sechs Wochen zum Quartalsende.
- [x] Vier Wochen zum Fünfzehnten oder Monatsende, unabhängig von der Dauer.
**Erklärung:** Die verlängerten Fristen gelten nur, wenn die Arbeitgeberseite kündigt. Beschäftigte kündigen gesetzlich mit der Grundfrist von vier Wochen zum Fünfzehnten oder zum Monatsende; Tarifvertrag und Vereinbarung können abweichen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-21 · Zuordnung
**Anweisung:** Ordne die arbeitsrechtliche Frist ihrer Dauer zu.
- Grundfrist der Kündigung ↔ Vier Wochen
- Frist zum Ausspruch einer außerordentlichen Kündigung nach Kenntnis ↔ Zwei Wochen
- Klagefrist gegen eine Kündigung ↔ Drei Wochen
- Dauer der Entgeltfortzahlung bei Krankheit ↔ Sechs Wochen
**Erklärung:** Vier Wochen Grundfrist, zwei Wochen zum Ausspruch der außerordentlichen Kündigung, drei Wochen für die Klage und sechs Wochen Entgeltfortzahlung je Krankheit.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-5.5-22 · Kurzantwort
**Frage:** Einer Pflegefachkraft geht die schriftliche Kündigung am Montag, 03.08.2026, zu. Sie will Kündigungsschutzklage erheben. An welchem Tag (TT.MM.JJJJ) endet die Klagefrist, wenn der Zugangstag nicht mitzählt?
**Akzeptierte Antworten:** 24.08.2026; 24.08.26; 24.8.2026; 24.8.26; 24. August 2026; 24 August 2026; 24.August 2026
**Erklärung:** Die Frist beträgt drei Wochen und endet mit Ablauf des Wochentags, der dem Zugangstag entspricht, also am Montag, 24.08.2026. Ein Montag ist ein Werktag, die Frist verschiebt sich nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-23 · Multiple Choice
**Frage:** Eine Pflegehilfskraft erhebt erst nach Ablauf der Dreiwochenfrist Kündigungsschutzklage und nennt keinen Verhinderungsgrund. Welche Folge tritt grundsätzlich ein?
- [ ] Die Klage ist immer zulässig, weil nur das Gericht die Kündigung prüft.
- [x] Die Kündigung gilt als von Anfang an wirksam, selbst wenn sie fehlerhaft war.
- [ ] Die Kündigung wird unwirksam, weil die Arbeitgeberseite die Kündigungsgründe nicht rechtzeitig genannt hat.
- [ ] Die Frist beginnt erneut, sobald die Klage eingeht.
**Erklärung:** Wird die Unwirksamkeit nicht rechtzeitig geltend gemacht, gilt die Kündigung als von Anfang an wirksam. Eine nachträgliche Zulassung setzt voraus, dass die Person trotz zumutbarer Sorgfalt an der Klage gehindert war.
`schwierigkeit: schwer` · `bloom: bewerten`

## D. Theorie-Ergänzung 5.5, zweiter Teil (einfügen vor „### Kündigung und Kündigungsschutz“)

### Entgeltfortzahlung im Krankheitsfall

Wer wegen Krankheit arbeitsunfähig ist, ohne dass ein Verschulden vorliegt, behält den Entgeltanspruch bis zu sechs Wochen je Krankheit; er entsteht nach vierwöchigem Bestehen des Arbeitsverhältnisses (Stützangabe §§ 3, 4 EntgFG; Stand Oktober 2026, vor Verwendung prüfen). Fortzuzahlen ist das Entgelt der regelmäßigen Arbeitszeit ohne Überstundenvergütung; Zulagen und Zuschläge sind hier nicht vertieft. Bei einer Folgeerkrankung an derselben Krankheit entsteht ein weiterer Sechs-Wochen-Anspruch nur, wenn die Person zuvor ein halbes Jahr lang wegen dieser Krankheit nicht arbeitsunfähig war oder seit dem Beginn der ersten Erkrankung ein Jahr vergangen ist. Eine Kündigung aus Anlass der Krankheit lässt den Anspruch unberührt; endet das Arbeitsverhältnis aus anderen Gründen, endet auch der Anspruch mit ihm. Abweichungen zulasten der Beschäftigten sind unwirksam (Stützangabe §§ 8, 12 EntgFG).

**Anzeige und Nachweis.** Die Arbeitsunfähigkeit samt voraussichtlicher Dauer ist ohne schuldhaftes Zögern (unverzüglich) zu melden, bei Touren in der Regel vor Arbeitsbeginn. Dauert sie länger als drei Kalendertage, muss spätestens am folgenden Arbeitstag eine ärztliche Bescheinigung vorliegen; die Arbeitgeberseite darf sie früher verlangen. Gesetzlich Versicherte lassen die Arbeitsunfähigkeit ärztlich feststellen, und die Arbeitgeberseite ruft die Daten bei der Krankenkasse ab (Stützangabe § 5 Abs. 1, 1a EntgFG, § 109 SGB IV, § 121 BGB). Fehlt eine vorzulegende Bescheinigung, darf die Zahlung bis zur Vorlage zurückgehalten werden, wenn die Person das zu vertreten hat (Stützangabe § 7 EntgFG); bei gesetzlich Versicherten ist das im Einzelfall zu klären. Eine bloß verspätete Anzeige erlaubt dem Wortlaut nach kein Zurückhalten, kann aber als Pflichtverletzung abgemahnt werden (siehe „Abmahnung und verhaltensbedingte Kündigung“ weiter unten; Auslegung nicht abschließend geklärt).

### Kurzzeitige Arbeitsverhinderung, Pflegezeit und Familienpflegezeit

Beschäftigte, die einen pflegebedürftigen nahen Angehörigen versorgen (unter anderem Eltern, Großeltern, Schwiegereltern, Ehe- und Lebenspartner:innen, Geschwister, Kinder, Enkelkinder), haben drei Ansprüche (Stützangabe PflegeZG, FPfZG; Stand Oktober 2026, vor Verwendung prüfen). Pflegebedürftig ist, wer die Voraussetzungen der Pflegeversicherung erfüllt, bei der kurzzeitigen Verhinderung genügt die voraussichtliche Erfüllung (Stützangabe § 7 Abs. 3, 4 PflegeZG). Weitere Freistellungen (minderjährige Angehörige, letzte Lebensphase) sind hier nicht vertieft.

**Kurzzeitige Arbeitsverhinderung.** Beschäftigte dürfen bis zu zehn Arbeitstage fernbleiben, um in einer akut aufgetretenen Pflegesituation die Pflege zu organisieren oder die Versorgung sicherzustellen, gegenüber jeder Arbeitgeberseite (Stützangabe § 2 PflegeZG). Die Verhinderung ist unverzüglich mitzuteilen; auf Verlangen ist eine Bescheinigung vorzulegen. Entgelt zahlt die Arbeitgeberseite nur, soweit Gesetz oder Vereinbarung es vorsehen; ein Anspruch kann sich aus der Vorschrift über vorübergehende Verhinderung ergeben, wenn sie nicht ausgeschlossen ist (Stützangabe § 616 BGB; Einzelfall). Sonst gibt es **Pflegeunterstützungsgeld** für bis zu zehn Arbeitstage je Kalenderjahr auf unverzüglichen Antrag bei der Pflegekasse des Angehörigen, regelmäßig 90 Prozent des ausgefallenen Nettoarbeitsentgelts wie beim Kinderkrankengeld (Stützangabe § 44a Abs. 3 SGB XI, § 45 Abs. 2 SGB V).

**Pflegezeit** ist die vollständige oder teilweise Freistellung für längstens sechs Monate je pflegebedürftigem Angehörigen in häuslicher Umgebung. Kein Anspruch besteht gegenüber Arbeitgeberseiten mit in der Regel 15 oder weniger Beschäftigten, Auszubildende zählen mit; die Ankündigung erfolgt spätestens zehn Arbeitstage vor Beginn in Textform, die Pflegebedürftigkeit ist durch Bescheinigung der Pflegekasse nachzuweisen (Stützangabe §§ 3, 4, 7 Abs. 1 PflegeZG). Bei teilweiser Freistellung ist die Arbeitszeit schriftlich zu vereinbaren; Wünschen der Beschäftigten ist zu entsprechen, soweit keine dringenden betrieblichen Gründe entgegenstehen. **Familienpflegezeit** ist die teilweise Freistellung für längstens 24 Monate bei mindestens 15 Wochenstunden; kein Anspruch besteht bei in der Regel 25 oder weniger Beschäftigten ohne Auszubildende, die Ankündigung erfolgt acht Wochen vorher (Stützangabe §§ 2, 2a FPfZG). Die Zählweise hängt also vom Gesetz ab: Beim Kündigungsschutz zählen Auszubildende nicht mit, bei der Pflegezeit schon, bei der Familienpflegezeit nicht. Beide Freistellungen dürfen je Angehörigem zusammen 24 Monate nicht überschreiten. Wo kein Anspruch besteht, können Beschäftigte eine Vereinbarung beantragen; die Antwort ist binnen vier Wochen zu geben, eine Ablehnung zu begründen (Stützangabe § 3 Abs. 6a PflegeZG, § 2a Abs. 5a FPfZG). Bei vollständiger Freistellung darf der Erholungsurlaub je vollem Kalendermonat um ein Zwölftel gekürzt werden (Stützangabe § 4 Abs. 4 PflegeZG); ein zinsloses Darlehen des Bundesamts für Familie und zivilgesellschaftliche Aufgaben ist möglich (Stützangabe § 3 FPfZG, nicht vertieft).

**Schutz und Vertretung.** Von der Ankündigung, höchstens zwölf Wochen vor dem angekündigten Beginn, bis zum Ende der Verhinderung oder Freistellung darf nicht gekündigt werden (bei einer Vereinbarung kleinerer Arbeitgeberseiten erst ab Beginn der Freistellung); die oberste Landesbehörde für den Arbeitsschutz kann in besonderen Fällen eine Kündigung ausnahmsweise für zulässig erklären (Stützangabe § 5 PflegeZG). Eine Zusammenlegung von Pflegezeit und Familienpflegezeit ist politisch im Gespräch, aber nicht in Kraft (Stand Oktober 2026, vor Verwendung prüfen).

### Rufbereitschaft und Bereitschaftsdienst

Als Arbeitszeit zählt die Zeit zwischen Arbeitsbeginn und Arbeitsende abzüglich der Ruhepausen (Stützangabe § 2 Abs. 1 ArbZG; Stand Oktober 2026, vor Verwendung prüfen). Beim **Bereitschaftsdienst** halten sich Beschäftigte an einer von der Arbeitgeberseite bestimmten Stelle auf, um bei Bedarf sofort zu arbeiten; er zählt nach der Rechtsprechung in vollem Umfang als Arbeitszeit, auch ohne Einsatz, und unterliegt den Grenzen von acht und zehn Stunden täglich. Über zehn Stunden hinaus ist eine Verlängerung grundsätzlich nur durch Tarifvertrag oder aufgrund eines Tarifvertrags möglich, wenn regelmäßig und in erheblichem Umfang Bereitschaftsdienst anfällt; weitere Ausnahmen (Aufsichtsbehörde, Notfälle) sind nicht vertieft (Stützangabe § 7 Abs. 1 Nr. 1, Abs. 5 ArbZG). Bei der **Rufbereitschaft** wählen die Beschäftigten den Aufenthaltsort selbst, müssen erreichbar sein und auf Abruf arbeiten; die Bereitschaft gilt nach der Rechtsprechung in der Regel als Ruhezeit, der Einsatz einschließlich notwendiger Fahrt als Arbeitszeit. Je enger die Vorgaben zu Aufenthaltsort und Reaktionszeit, desto eher kann die Bereitschaft im Einzelfall Arbeitszeit sein (Europäischer Gerichtshof, Urteil vom 21.02.2018, C-518/15).

Neben der Verkürzung der Ruhezeit um eine Stunde (Abschnitt „Arbeitszeit und Urlaub“) gilt für Einsätze in der Rufbereitschaft eine eigene Regel: In Kliniken und anderen Einrichtungen, die Menschen behandeln, pflegen oder betreuen, darf die Ruhezeit durch Inanspruchnahmen verkürzt werden, solange die Kürzung nicht mehr als die Hälfte der Ruhezeit beträgt und zu anderen Zeiten ausgeglichen wird (Stützangabe § 5 Abs. 3, § 7 Abs. 2 Nr. 1 ArbZG); ob ein ambulanter Dienst darunter fällt, ist nach dem weiten Wortlaut wahrscheinlich, aber im Einzelfall zu prüfen. Das Arbeitszeitrecht regelt Dauer und Lage, nicht die Bezahlung. Ein Betriebsrat bestimmt bei Beginn, Ende und Verteilung der täglichen Arbeitszeit mit (Stützangabe § 87 Abs. 1 Nr. 2, 3 BetrVG). Für „Morgenlicht“ gilt: Eine nächtliche Notfallrufbereitschaft lässt sich, wenn die Voraussetzungen vorliegen, mit Ruhezeitausgleich planen; ein Bereitschaftsdienst in der Geschäftsstelle erzeugt dagegen Arbeitszeit für die ganze Nacht.

### Rechenbeispiele: Entgeltfortzahlung, Pflegeunterstützungsgeld und Ruhezeit

Alle Werte sind frei gewählte Beispielwerte (Stand Oktober 2026, vor Verwendung prüfen). Beginnt die Arbeitsunfähigkeit am Montag, 01.03.2027, laufen die sechs Wochen (der erste Tag zählt mit) bis Sonntag, 11.04.2027. Bei fünf Arbeitstagen mit 108,00 € ausgefallenem Nettoentgelt beträgt das Pflegeunterstützungsgeld 5 × 108,00 € × 90 % = 486,00 €. Die Hälfte der Ruhezeit von elf Stunden sind 5,5 Stunden: Ein Einsatz von vier Stunden darf ausgeglichen werden, einer von sechs nicht.

## E. Karteikarten 5.5, zweiter Teil (anhängen)

#### K-5.5-29
**Frage:** Wie lange und unter welcher Voraussetzung läuft das Arbeitsentgelt bei Krankheit weiter?
**Antwort:** Bis zu sechs Wochen je Krankheit, wenn die Arbeitsunfähigkeit unverschuldet ist und das Arbeitsverhältnis seit vier Wochen ununterbrochen besteht. Fortzuzahlen ist das Entgelt der regelmäßigen Arbeitszeit ohne Überstundenvergütung.
`tags: entgeltfortzahlung, krankheit` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-5.5-30
**Frage:** Wann beginnt bei derselben Krankheit ein neuer Sechs-Wochen-Anspruch?
**Antwort:** Wenn die Person zuvor ein halbes Jahr lang wegen dieser Krankheit nicht arbeitsunfähig war oder seit dem Beginn der ersten Erkrankung ein Jahr vergangen ist. Sonst werden die Zeiten zusammengerechnet.
`tags: entgeltfortzahlung, fortsetzungserkrankung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-5.5-31
**Frage:** Welche Anzeige- und Nachweispflichten haben Beschäftigte bei Krankheit, und wie erhält die Arbeitgeberseite die Daten?
**Antwort:** Unverzügliche Meldung von Arbeitsunfähigkeit und Dauer. Dauert sie länger als drei Kalendertage, muss am folgenden Arbeitstag die ärztliche Feststellung vorliegen; bei gesetzlich Versicherten ruft die Arbeitgeberseite die Daten bei der Krankenkasse ab.
`tags: entgeltfortzahlung, nachweis, elektronische-meldung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-5.5-32
**Frage:** Wie lange dürfen Beschäftigte bei einer akut aufgetretenen Pflegesituation eines nahen Angehörigen fernbleiben, und wer gleicht den Verdienstausfall aus?
**Antwort:** Bis zu zehn Arbeitstage, gegenüber jeder Arbeitgeberseite. Ohne Entgeltfortzahlung zahlt die Pflegekasse des Angehörigen auf Antrag Pflegeunterstützungsgeld, regelmäßig 90 Prozent des ausgefallenen Nettoentgelts, für bis zu zehn Arbeitstage je Kalenderjahr.
`tags: kurzzeitige-arbeitsverhinderung, pflegeunterstuetzungsgeld` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-5.5-33
**Frage:** Was ist Pflegezeit, und bei welcher Zahl von Beschäftigten besteht der Anspruch?
**Antwort:** Vollständige oder teilweise Freistellung bis zu sechs Monate je pflegebedürftigem Angehörigen in häuslicher Umgebung. Nur wenn die Arbeitgeberseite in der Regel mehr als 15 Beschäftigte hat; Auszubildende werden mitgezählt.
`tags: pflegezeit, schwellenwert` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.5-34
**Frage:** Was ist Familienpflegezeit, und was können Beschäftigte kleinerer Arbeitgeberseiten tun?
**Antwort:** Teilweise Freistellung bis zu 24 Monate bei mindestens 15 Wochenstunden, Anspruch bei mehr als 25 Beschäftigten ohne Auszubildende. Wo kein Anspruch besteht, können Beschäftigte eine Vereinbarung beantragen; die Antwort ist binnen vier Wochen zu geben.
`tags: familienpflegezeit, antrag, kleinbetrieb` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-5.5-35
**Frage:** Welchen Schutz genießen Beschäftigte, die Pflegezeit angekündigt haben?
**Antwort:** Ab der Ankündigung, höchstens zwölf Wochen vor dem Beginn, bis zum Ende der Freistellung darf nicht gekündigt werden. Nur in besonderen Fällen kann die Landesbehörde eine Kündigung ausnahmsweise für zulässig erklären.
`tags: pflegezeit, kuendigungsschutz` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.5-36
**Frage:** Worin unterscheiden sich Bereitschaftsdienst und Rufbereitschaft bei der Arbeitszeit, und wie weit darf die Ruhezeit durch Einsätze gekürzt werden?
**Antwort:** Bereitschaftsdienst an einer vorgegebenen Stelle zählt nach der Rechtsprechung als Arbeitszeit; bei Rufbereitschaft gilt in der Regel nur der Einsatz so. In Pflegeeinrichtungen ist eine Kürzung der Ruhezeit bis zur Hälfte (bei elf Stunden 5,5 Stunden) mit Ausgleich möglich.
`tags: rufbereitschaft, bereitschaftsdienst, ruhezeit` · `schwierigkeit: schwer` · `bloom: analysieren`

## F. Quiz 5.5, zweiter Teil (anhängen)

#### Q-5.5-24 · Kurzantwort
**Frage:** Eine Pflegekraft ist seit langem bei „Morgenlicht“ beschäftigt und wird am Donnerstag, 15.10.2026, arbeitsunfähig krank. An welchem Tag (TT.MM.JJJJ) endet die Entgeltfortzahlung für diese Krankheit? Der Beginn der Arbeitsunfähigkeit zählt mit, es gelten sechs Wochen.
**Akzeptierte Antworten:** 25.11.2026; 25.11.26; 25. November 2026; 25 November 2026; 25.November 2026
**Erklärung:** Sechs Wochen sind 42 Tage. Mit dem 15.10.2026 als erstem Tag endet der Zeitraum am Mittwoch, 25.11.2026.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-25 · Multiple Choice
**Frage:** Eine Pflegefachkraft ist erstmals im Januar wegen einer Rückenerkrankung sechs Wochen krank gewesen und im März erneut wegen derselben Erkrankung. Was gilt?
- [x] Es entsteht kein neuer Anspruch; die Voraussetzungen für eine neue Frist sind nicht erfüllt.
- [ ] Es entsteht ein neuer Anspruch auf sechs Wochen, weil es eine neue Krankmeldung ist.
- [ ] Es entsteht ein neuer Anspruch, weil zwischen beiden Erkrankungen mehr als sechs Wochen lagen.
- [ ] Der Anspruch ist verfallen, weil die Pflegefachkraft die frühere Erkrankung nicht rechtzeitig gemeldet hat.
**Erklärung:** Bei derselben Krankheit beginnt ein neuer Sechs-Wochen-Anspruch erst nach einem halben Jahr ohne diese Krankheit oder zwölf Monate nach Beginn der ersten Erkrankung. Beides trifft nicht zu.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-5.5-26 · Multiple Choice
**Frage:** Eine Pflegekraft ist ab Montag länger als drei Kalendertage krank und meldet sich erst nach Tourbeginn. Die ärztliche Feststellung liegt am Donnerstag vor. Welche Aussage trifft zu?
- [ ] Die Arbeitgeberseite darf das Entgelt wegen der späten Meldung für die gesamte Zeit verweigern.
- [ ] Die späte Meldung ist unerheblich, weil Beschäftigte sich nie melden müssen, sondern nur nachweisen.
- [x] Das Entgelt bleibt geschuldet; die späte Meldung kann aber abgemahnt werden.
- [ ] Die Feststellung am Donnerstag ist zu spät, weil sie schon am Montag vorliegen musste.
**Erklärung:** Die Meldung muss unverzüglich erfolgen. Eine verspätete Anzeige erlaubt dem Wortlaut nach kein Zurückhalten des Entgelts, kann aber abgemahnt werden; die ärztliche Feststellung ist nach drei Kalendertagen am folgenden Arbeitstag nötig, hier also am Donnerstag.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-5.5-27 · Kurzantwort
**Frage:** Eine Pflegehilfskraft bleibt wegen einer akuten Pflegesituation ihrer Mutter 7 Arbeitstage fern. Die Arbeitgeberseite zahlt dafür nichts. Das ausgefallene Nettoarbeitsentgelt beträgt 104,00 € je Arbeitstag (Beispielwert). Wie hoch ist das Pflegeunterstützungsgeld bei 90 Prozent des ausgefallenen Nettoarbeitsentgelts? Antworte in Euro, auf Cent genau.
**Akzeptierte Antworten:** 655,20; 655,20 €; 655,20€; 655,20 Euro; 655,20 EUR; 655,2; 655,2 €; 655,2€; 655,2 Euro; 655,2 EUR; 655.20; 655.20 €; 655.20€; 655.20 Euro; 655.20 EUR; 655.2; 655.2 €; 655.2€; 655.2 Euro; 655.2 EUR
**Erklärung:** 7 × 104,00 € = 728,00 €; davon 90 % sind 655,20 €.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-28 · Zuordnung
**Anweisung:** Ordne die Regelung der Zählweise der Beschäftigten zu.
- Betriebsgröße beim Kündigungsschutz ↔ Auszubildende zählen nicht mit, Teilzeitkräfte anteilig
- Schwelle bei der Pflegezeit ↔ Auszubildende zählen mit
- Schwelle bei der Familienpflegezeit ↔ Auszubildende sind ausdrücklich ausgenommen
- Kürzere Kündigungsfrist im kleinen Betrieb ↔ Höchstens 20 Beschäftigte ohne Auszubildende
**Erklärung:** Die Zählweise hängt vom Gesetz ab: Nur bei der Pflegezeit zählen Auszubildende mit.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-5.5-29 · Kurzantwort
**Frage:** Eine Pflegekraft hat 28 Urlaubstage im Jahr (Beispielwert). Sie ist 3 volle Kalendermonate vollständig für Pflegezeit freigestellt. Um wie viele Urlaubstage darf der Urlaub gekürzt werden, wenn je vollem Kalendermonat ein Zwölftel gekürzt wird? Antworte in Tagen.
**Akzeptierte Antworten:** 7; 7 Tage; 7 tage; 7 Urlaubstage; 7,0; 7,00; 7.0; 7.00
**Erklärung:** 28 ÷ 12 × 3 = 7 Tage.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-30 · Was passt nicht dazu
**Frage:** Welche Aussage zum Schutz bei Pflegezeit passt nicht dazu?
- [ ] Der Schutz beginnt mit der Ankündigung, höchstens zwölf Wochen vor dem angekündigten Beginn der Freistellung.
- [ ] Er dauert bis zum Ende der Freistellung.
- [x] Eine Kündigung ist während der Freistellung stets unzulässig, auch mit Behördenerlaubnis.
- [ ] In besonderen Fällen kann die Landesbehörde eine Kündigung ausnahmsweise für zulässig erklären.
**Erklärung:** Der Schutz ist nicht absolut: In besonderen Fällen kann die zuständige Landesbehörde eine Kündigung ausnahmsweise für zulässig erklären.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-5.5-31 · Multiple Choice
**Frage:** Eine Pflegefachkraft muss nachts erreichbar sein und kann ihren Aufenthaltsort frei wählen. In der Nacht wird sie für 3 Stunden einschließlich Fahrt zu einem Notfall gerufen. Was zählt nach der Rechtsprechung in der Regel als Arbeitszeit?
- [ ] Die gesamte Nacht, weil sie erreichbar sein muss.
- [ ] Keine Zeit, weil Rufbereitschaft nie Arbeitszeit ist.
- [ ] Die halbe Nacht, weil die Hälfte der Ruhezeit in Pflegeeinrichtungen ausgleichbar ist.
- [x] Nur die 3 Stunden des Einsatzes einschließlich der notwendigen Fahrt.
**Erklärung:** Bei der Rufbereitschaft ist die Bereitschaft nach der Rechtsprechung in der Regel Ruhezeit; die tatsächliche Inanspruchnahme ist Arbeitszeit und unterbricht die Ruhezeit.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-32 · Kurzantwort
**Frage:** In einem Pflegedienst darf die Ruhezeit von elf Stunden durch Einsätze in der Rufbereitschaft gekürzt und zu anderen Zeiten ausgeglichen werden, wenn die Kürzung nicht mehr als die Hälfte der Ruhezeit beträgt. Wie viele Stunden sind höchstens ausgleichbar? Antworte in Stunden.
**Akzeptierte Antworten:** 5,5; 5,5 h; 5,5h; 5,5 Stunden; 5,5 stunden; 5,50; 5,50 h; 5,50 Stunden; 5.5; 5.5 h; 5.5h; 5.5 Stunden; 5.50; 5.50 h; 5.50 Stunden
**Erklärung:** 11 ÷ 2 = 5,5 Stunden. Ein Einsatz von vier Stunden bleibt darunter, ein Einsatz von sechs Stunden überschreitet die Grenze.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.5-33 · Wahr/Falsch
**Aussage:** Nach der Rechtsprechung zählt ein Bereitschaftsdienst im Aufenthaltsraum einer Einrichtung auch dann als Arbeitszeit, wenn in der Zeit kein Einsatz anfällt.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Anwesenheit an einer von der Arbeitgeberseite bestimmten Stelle mit der Pflicht, sofort einzugreifen, zählt nach der Rechtsprechung als Arbeitszeit. Bei der Rufbereitschaft ist es dagegen in der Regel nur der Einsatz.
`schwierigkeit: mittel` · `bloom: verstehen`
