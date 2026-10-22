# Entwurf Ausbildung der Ausbilder (AEVO), Prüfung zur Ausbildereignung vorbereiten und ablegen: Ergänzung im Thema 1.1

Stand 22.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil B des Auftrags P-AS (Erhebung vom 14.10.2026: G-AEVO-17, Rest von FL-AEVO-08). Einzufügen in `content/ausbildung-der-ausbilder/hf1/1.1-rechtliche-grundlagen-berufsausbildung.md`: Abschnitt A **vor der Überschrift „### Grundzüge des Jugendarbeitsschutzgesetzes (JArbSchG)“** (Anker; die Theorie steht damit hinter „Die AEVO selbst: Aufbau und Prüfungsstruktur“), B an die Karteikarten hinter K-1.1-15, C an das Quiz hinter Q-1.1-18. Bestand gezählt (Stand nach P-AR vom 22.10.2026): 15 Karteikarten (K-1.1-01 bis -15, lückenlos), 18 Quizfragen (Q-1.1-01 bis -18, lückenlos); `git log -S` auf höhere IDs ergibt keine entfernten IDs. Die neuen IDs sind deshalb **K-1.1-16 bis -23** (8 Karten) und **Q-1.1-19 bis -28** (10 Quizfragen); der Auftrag nannte „K-1.1-21 ff.“ als Richtwert und verlangte, die höchste vergebene ID selbst zu prüfen. Die zwei Fachgesprächsfragen stehen in `aevo-faelle-b.md` (kein Fall in diesem Teil), die Rechtsangaben in `rechtsangaben-b.md`, die Änderungen am Bestand (keine) in `ersetzungen-b.json` (`[]`).

**Zweck.** Der Bestand („Die AEVO selbst“, seit P-AR) nennt die Eckdaten der Prüfung: zwei Teile, je Teil mindestens „ausreichend“, drei Stunden schriftlich, praktisch höchstens 30 Minuten mit Präsentation bis 15 Minuten, Wiederholung zweimal mit möglicher Anrechnung, Sonderregel Landwirtschaft und Hauswirtschaft. Die Ergänzung wiederholt davon nichts und ändert nichts, sondern ergänzt, was dort fehlt: Zuständigkeit, Zulassung und Anmeldung (was die Verordnung nicht regelt), Prüfungsausschuss und Bewertung, was bei der Wiederholung offenbleibt, die anderen Nachweise (Anerkennung kraft Verordnung gegen Befreiung auf Antrag, Meisterprüfung Teil IV, Bestandsschutz), das Zeugnis und seine Wirkung sowie die prüfungsorganisatorische Vorbereitung der praktischen Prüfung. Die Planung der Unterweisung selbst (Methodik) bleibt in Handlungsfeld 3 (R3).

**Rechtsnah (R4).** Paragrafen stehen nur in der Theorie als Stützangabe, nie in Karten, Quiz und Fachgespräch. Die Verordnung ist seit ihrem Inkrafttreten am 1. August 2009 im Text unverändert (Textnachweis ab 01.08.2009 am Rohtext); eine Änderung 2025 oder 2026 war nicht zu finden. Das Berufsbildungsgesetz steht am Rohtext in der Fassung der Bekanntmachung vom 16.04.2025, zuletzt geändert durch Art. 9 des Gesetzes vom 28.10.2025. Kammerpraxis (Anmeldeweg, Konzept, Medien, Wiederholungsfristen) steht als solche im Text und ist nicht Rechtsregel. Einzelheiten in `rechtsangaben-b.md`.

**Hinweise an den Auftraggeber.** (1) Die Frontmatter-`quelle` von `hf1/1.1` nennt nur § 2 Nr. 1 und § 3 Abs. 1 AEVO; die Ergänzung stützt sich zusätzlich auf §§ 4 bis 7 AEVO, §§ 27 bis 30 und 40 bis 47 BBiG und § 22b HwO: beim Einspielen anpassen (nicht Teil von `ersetzungen-b.json`). (2) Die zwei Fachgesprächsfragen fragen nach dem Verfahren der Ausbildereignungsprüfung und sind als Rückfragen zur eigenen Unterweisung formuliert; im Bestand steht schon eine ähnliche Frage zur AEVO (Fachgespräch 1.1). (3) `einspielen.cjs` verlangt in `faelle`-Dateien mindestens eine Fallaufgabe; für `aevo-faelle-b.md` (nur Fachgespräch) muss das Werkzeug angepasst oder die Fragen von Hand eingefügt werden. (4) Die Anerkennungs- und Bestandsschutzregeln (§§ 6 und 7 AEVO) stehen in diesem Teil; Teil A verweist darauf.

---

# Thema 1.1

## A. Theorie-Ergänzung 1.1 (einfügen vor „### Grundzüge des Jugendarbeitsschutzgesetzes (JArbSchG)“)

### Zuständigkeit, Zulassung und Anmeldung

Der Abschnitt „Die AEVO selbst“ beschreibt Teile, Dauer und Wiederholungsregel der Prüfung. Hier folgt, was darum herum geregelt ist und was nicht (Stand Oktober 2026, vor Verwendung prüfen; die Verordnung ist seit dem 1. August 2009 im Text unverändert). **Abgenommen** wird die Prüfung von der **zuständigen Stelle**, für Kelvinar als Industrieunternehmen von der IHK: Sie errichtet den Prüfungsausschuss (§ 4 Abs. 5 AEVO). Dieselbe Vorschrift erklärt eine Reihe von Prüfungsvorschriften des Berufsbildungsgesetzes für entsprechend anwendbar, darunter die Prüfungsordnung (§ 47 BBiG), die Entscheidung über die Zulassung (§ 46 BBiG) und den Prüfungsausschuss (§§ 40 bis 42 BBiG).

Die AEVO selbst nennt **keine Zulassungsvoraussetzungen** und keine Anmeldefristen, Gebühren oder Termine. Nach der entsprechend anwendbaren Vorschrift muss die **Prüfungsordnung** der zuständigen Stelle unter anderem die Zulassung, die Gliederung der Prüfung, die Bewertungsmaßstäbe, die Zeugnisse und die Wiederholungsprüfung regeln; sie bedarf der Genehmigung der obersten Landesbehörde. Über die Zulassung entscheidet die zuständige Stelle; sieht sie die Voraussetzungen als nicht erfüllt an, trifft der Prüfungsausschuss die Entscheidung. Nach verbreiteter Praxis melden sich Teilnehmende selbst über ein Online-Portal ihrer Kammer an; zuständig ist meist die Kammer am Wohn-, Arbeitgeber- oder Lehrgangsort, und formale Zulassungsvoraussetzungen werden nicht verlangt. Termine, Fristen und Gebühren unterscheiden sich je Kammer und stehen in deren Unterlagen, nicht in der Verordnung. Ein Vorbereitungslehrgang ist nicht vorgeschrieben; der Rahmenplan, den der Hauptausschuss des Bundesinstituts für Berufsbildung 2023 als Empfehlung Nr. 135 beschlossen hat, ist für Lehrgänge gedacht und keine Rechtsnorm.

Nicht zu verwechseln ist diese Zulassung mit der **Zulassung der Auszubildenden zur Abschlussprüfung** (Thema 4.1 Prüfungsvorbereitung und Anmeldung zur Abschlussprüfung im Handlungsfeld Ausbildung abschließen): Deren Voraussetzungen (§§ 43 bis 45 BBiG, etwa zurückgelegte Ausbildungsdauer und Ausbildungsnachweis) nimmt die AEVO nicht in Bezug.

### Prüfungsausschuss, Bewertung und Ergebnis

Für den **Prüfungsausschuss** gelten die Vorschriften des Berufsbildungsgesetzes entsprechend (§§ 40 bis 42 BBiG). Er besteht aus mindestens **drei** Mitgliedern, die sachkundig und für die Mitwirkung im Prüfungswesen geeignet sein müssen. Ihm müssen grundsätzlich Beauftragte der Arbeitgeber und der Arbeitnehmer in gleicher Zahl sowie mindestens eine Lehrkraft einer berufsbildenden Schule angehören; die Tätigkeit ist ehrenamtlich. Er ist beschlussfähig, wenn **zwei Drittel** der Mitglieder, mindestens drei, mitwirken, und beschließt mit der Mehrheit der abgegebenen Stimmen; bei Stimmengleichheit entscheidet die Stimme des Vorsitzes. Er fasst die Beschlüsse über die Noten der Prüfungsleistungen, die er abgenommen hat, über die Noten zur Bewertung der Prüfung insgesamt und über das Bestehen oder Nichtbestehen; wie das im Einzelnen umgesetzt wird, ist Sache der Prüfungsordnung. Die zuständige Stelle beruft die Mitglieder und darf von der beschriebenen Besetzung nur abweichen, wenn sonst nicht genug Mitglieder berufen werden können. Ob Mitglieder bei bestimmten Teilnehmenden ausgeschlossen sind, sagen die Verordnung und die entsprechend anwendbaren Vorschriften nicht ausdrücklich. Außerdem kann die zuständige Stelle im Einvernehmen mit den Ausschussmitgliedern die Abnahme und abschließende Bewertung einzelner Prüfungsleistungen auf Prüferdelegationen übertragen (§ 42 Abs. 2 BBiG); wie sie davon Gebrauch macht, ist Kammerpraxis.

Wie im Abschnitt „Die AEVO selbst“ beschrieben, muss **jeder Prüfungsteil** mindestens „ausreichend“ sein. Daraus folgt: Ein gutes Ergebnis im schriftlichen Teil gleicht einen nicht ausreichenden praktischen Teil nicht aus, und ein Durchschnitt zählt nicht. Wie Leistungen in Punkte und Noten übersetzt werden, regelt die Prüfungsordnung; nach verbreiteter Praxis gilt ein Punkteschlüssel bis 100 Punkte, in dem „ausreichend“ bei 50 Punkten beginnt, doch das steht nicht in der Verordnung. Das Zeugnismuster mit Bewertung sieht Punkte und Note **je Prüfungsteil** vor, eine Gesamtnote enthält es nicht (anders als der Ausschussbeschluss über die Bewertung der Prüfung insgesamt, siehe oben). Reihenfolge, Tage und Form der Aufgaben (zum Beispiel am Bildschirm) bestimmt ebenfalls die zuständige Stelle; die Verordnung verlangt nur fallbezogene Aufgaben aus allen Handlungsfeldern. Wie und wann das Ergebnis mitgeteilt wird und welche Rechtsbehelfe bestehen, regelt die Verordnung ebenfalls nicht; das ergibt sich aus der Prüfungsordnung und den Unterlagen der Kammer.

### Wiederholung: was die Verordnung regelt und was nicht

Die Wiederholungsregel selbst (zweimal innerhalb eines Verfahrens, Anrechnung eines bestandenen Teils nur als Möglichkeit) steht im Abschnitt „Die AEVO selbst“. Offen lässt die Verordnung, **wie** eine Anrechnung geschieht: Sie nennt keine Frist, bis zu der ein bestandener Teil angerechnet wird, keine Antragsform, keine Mindestpunktzahl und keine Gebühr. Das regelt die Prüfungsordnung der zuständigen Stelle. Beispielhaft verlangt eine Kammer für die Anrechnung einen Antrag und die Anmeldung zur Wiederholung innerhalb von zwei Jahren (gerechnet je nach Kammer ab dem Ergebnis der nicht bestandenen Prüfung); weitere Bedingungen und der Fristbeginn sind von Kammer zu Kammer verschieden. Was geschieht, wenn auch der dritte Versuch eines Verfahrens misslingt, sagt die Verordnung nicht ausdrücklich; nach verbreiteter Praxis ist ein neues Prüfungsverfahren möglich (ob frühere Teile dort angerechnet werden, entscheiden die Kammern unterschiedlich), nicht abschließend geklärt. Frau Yildiz rät den nebenberuflichen Ausbilder:innen deshalb, vor der Anmeldung die Prüfungsordnung der eigenen Kammer zu lesen.

### Andere Nachweise: Anerkennung kraft Verordnung und Befreiung auf Antrag

Die berufs- und arbeitspädagogische Eignung kann auch **ohne** eigene AEVO-Prüfung nachgewiesen sein (§§ 6 und 7 AEVO). Die Verordnung unterscheidet drei Wege: Nachweise, die ohne weitere Entscheidung **gelten** (§ 6 Abs. 1 und 2), Befreiungen, die die **zuständige Stelle auf Antrag** nach pflichtgemäßem Ermessen aussprechen **kann** (§ 6 Abs. 3 und 4), und den Bestandsschutz für langjährige Ausbilder:innen (§ 7).

| Nachweis | Wirkung |
|---|---|
| Prüfung nach einer früheren Ausbilder-Eignungsverordnung (§ 6 Abs. 1) | gilt als geeignet |
| Meisterprüfung oder andere Fortbildungsprüfung nach Handwerksordnung oder BBiG, mit der die Eignung nachgewiesen wurde (§ 6 Abs. 2) | gilt als geeignet |
| Sonstige staatliche, staatlich anerkannte oder von einer öffentlich-rechtlichen Körperschaft abgenommene Prüfung, die den Handlungsfeldern ganz oder teilweise entspricht (§ 6 Abs. 3) | Befreiung von der Prüfung ganz oder teilweise auf Antrag; die zuständige Stelle bescheinigt sie |
| Eignung auf andere Weise glaubhaft gemacht und ordnungsgemäße Ausbildung sichergestellt (§ 6 Abs. 4) | Befreiung vom Nachweis auf Antrag, Auflagen möglich; Bescheinigung auf Antrag |
| Tätigkeit als Ausbilder:in schon vor dem 1. August 2009 (§ 7) | vom Nachweis befreit, außer bei Beanstandungen mit Aufforderung zur Mängelbeseitigung; nach Beseitigung und ohne zu erwartende Gefährdung kann die zuständige Stelle befreien |

Im **Handwerk** ist der Teil IV der Meisterprüfung der berufs- und arbeitspädagogische Prüfungsteil (§ 45 Abs. 3 HwO); sein Bestehen gilt dort als Nachweis (§ 22b Abs. 4 Satz 3 HwO). Ob eine bestimmte Fortbildungsprüfung die Eignung tatsächlich nachweist, hängt von deren Inhalt ab und lässt sich im Zweifel bei der zuständigen Stelle klären. Nach verbreiteter Praxis befreien einzelne Kammern bei bestimmten Abschlüssen auf Antrag vom schriftlichen Teil; welche Abschlüsse genügen, entscheidet die Kammer im Einzelfall, eine Liste enthält die Verordnung nicht. Wer so befreit ist, hat die **berufliche** Fachkunde damit nicht nachgewiesen.

### Zeugnis und Wirkung des Nachweises

Über die bestandene Prüfung stellt die zuständige Stelle ein **Zeugnis** nach den Mustern der Verordnung aus (§ 5 AEVO). Das eine Muster bestätigt das Bestehen und den Nachweis der berufs- und arbeitspädagogischen Fertigkeiten, Kenntnisse und Fähigkeiten im Sinne des Berufsbildungsgesetzes; das zweite weist zusätzlich Punkte und Note für den schriftlichen und den praktischen Teil aus. Eine **Befristung** des Nachweises sieht die Verordnung nicht vor.

Das Zeugnis belegt nur **einen Teil** der Eignung: die berufs- und arbeitspädagogische Seite der fachlichen Eignung; hinzu kommen die berufliche Fachkunde, die persönliche Eignung und die Eignung der Ausbildungsstätte (§§ 27 bis 30 BBiG). Wer die AEVO-Prüfung besteht, ist deshalb nicht automatisch ausbildungsberechtigt. Eignung, Aufgabenverteilung und Eignungsmängel stehen in Thema 1.3 Eignung des Betriebs und Kooperationsformen der Ausbildung im Handlungsfeld Ausbildungsvoraussetzungen prüfen und Ausbildung planen.

### Prüfschema: die praktische Prüfung organisatorisch vorbereiten

Die Verordnung verlangt nur, dass die Teilnehmenden eine **berufstypische** Ausbildungssituation auswählen und im Fachgespräch Auswahl und Gestaltung erläutern. Wie die Situation anzumelden ist, ob ein schriftliches Konzept einzureichen ist, welche Medien bereitstehen und ob eine Person für eine praktische Durchführung mitzubringen ist, regelt die **zuständige Stelle** in Prüfungsordnung, Merkblatt und Einladung; das ist Kammerpraxis, nicht Verordnung, und sie unterscheidet sich von Kammer zu Kammer. Nach verbreiteter Praxis gehört dazu etwa ein kurzes, von den Teilnehmenden selbst verfasstes Konzept in mehreren Ausfertigungen, das teils nicht in die Bewertung einfließt, und bei einer praktischen Durchführung eine mitgebrachte Person, die nicht dem Prüfungsausschuss angehört. Ein Prüfschema in Schritten:

1. **Vorgaben beschaffen:** Merkblatt, Prüfungsordnung und Einladung der eigenen Kammer lesen; Fristen, Umfang des Konzepts, Medien und Hilfsmittel notieren.
2. **Situation wählen:** eine berufstypische, im vorgegebenen Zeitrahmen darstellbare Situation aus dem eigenen Ausbildungsalltag, bei Kelvinar etwa aus der Elektroniker-, der kaufmännischen oder der IT-Ausbildung.
3. **Konzept und Unterlagen erstellen:** nach den Vorgaben der Kammer, selbstständig; Methodik und Unterweisungsplanung folgen Thema 3.2 Lern- und Arbeitsaufgaben, Ausbildungsmethoden und -medien im Handlungsfeld Ausbildung durchführen.
4. **Technik und Beteiligte klären:** vorhandene und mitzubringende Medien, bei praktischer Durchführung die Rolle und Einweisung der mitgebrachten Person.
5. **Fachgespräch vorbereiten:** Auswahl, Ziele, Methode, Alternativen und Grenzen der eigenen Planung begründen können; die Fragen beziehen sich auf Auswahl und Gestaltung der gewählten Situation.

## B. Karteikarten 1.1 (anhängen)

#### K-1.1-16
**Frage:** Wer nimmt die Ausbildereignungsprüfung ab, und wie ist der Prüfungsausschuss mindestens besetzt?
**Antwort:** Die zuständige Stelle (für Kelvinar die IHK) errichtet den Prüfungsausschuss. Er hat mindestens drei Mitglieder: grundsätzlich Beauftragte der Arbeitgeber und der Arbeitnehmer in gleicher Zahl und mindestens eine Lehrkraft einer berufsbildenden Schule.
`tags: aevo, pruefung, pruefungsausschuss` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-1.1-17
**Frage:** Welche Zulassungsvoraussetzungen für die Ausbildereignungsprüfung nennt die Verordnung selbst, und wer legt Fristen und Gebühren fest?
**Antwort:** Sie nennt keine. Zulassung, Anmeldefristen und Gebühren regelt die zuständige Stelle, die Zulassung in ihrer Prüfungsordnung. Sieht sie die Voraussetzungen als nicht erfüllt an, trifft der Prüfungsausschuss die Entscheidung.
`tags: aevo, pruefung, zulassung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.1-18
**Frage:** Reicht ein sehr gutes Ergebnis im schriftlichen Teil, um einen nicht ausreichenden praktischen Teil auszugleichen?
**Antwort:** Nein. Jeder Prüfungsteil muss mindestens „ausreichend“ sein; ein Durchschnitt zählt nicht. Das Zeugnismuster weist Punkte und Note je Teil aus, aber keine Gesamtnote; wie die Prüfung insgesamt bewertet wird, regelt die Prüfungsordnung.
`tags: aevo, pruefung, bewertung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.1-19
**Frage:** Was sagt die Verordnung zur Anrechnung eines bestandenen Prüfungsteils bei der Wiederholung, und was lässt sie offen?
**Antwort:** Ein bestandener Teil kann angerechnet werden. Frist, Antrag, Mindestpunkte und Gebühren nennt sie nicht; das regelt die Prüfungsordnung der zuständigen Stelle, deshalb vorab nachlesen.
`tags: aevo, pruefung, wiederholung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.1-20
**Frage:** Welche Nachweise gelten ohne Befreiungsentscheidung als Nachweis der berufs- und arbeitspädagogischen Eignung?
**Antwort:** Eine nach früherem Recht bestandene Ausbildereignungsprüfung, eine Meisterprüfung oder andere Fortbildungsprüfung mit nachgewiesener Eignung (im Handwerk Teil IV) und der Bestandsschutz für Ausbilder:innen, die schon vor August 2009 tätig waren.
`tags: aevo, anerkennung, meisterpruefung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-1.1-21
**Frage:** Welche zwei Befreiungen kann die zuständige Stelle auf Antrag aussprechen?
**Antwort:** Ganz oder teilweise von der Prüfung bei einer sonstigen staatlichen oder körperschaftlich abgenommenen Prüfung mit entsprechendem Inhalt; und vom Nachweis, wenn die Eignung anders glaubhaft gemacht und die Ausbildung gesichert ist (Auflagen möglich).
`tags: aevo, befreiung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-1.1-22
**Frage:** Darf eine Person nach bestandener Ausbildereignungsprüfung automatisch ausbilden?
**Antwort:** Nein. Das Zeugnis belegt nur die pädagogische Seite der fachlichen Eignung. Hinzu kommen die berufliche Fachkunde, die persönliche Eignung und eine geeignete Ausbildungsstätte.
`tags: aevo, eignung, zeugnis` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.1-23
**Frage:** Wer legt fest, was für die praktische Prüfung eingereicht oder mitgebracht werden muss, zum Beispiel ein Konzept oder eine Person für die Durchführung?
**Antwort:** Nicht die Verordnung, sondern die zuständige Stelle in Prüfungsordnung, Merkblatt und Einladung. Die Vorgaben unterscheiden sich je Kammer und sind früh zu lesen.
`tags: aevo, pruefung, praktischer-teil` · `schwierigkeit: leicht` · `bloom: anwenden`

## C. Quiz 1.1 (anhängen)

#### Q-1.1-19 · Multiple Choice
**Frage:** Ein neuer Kollege bei Kelvinar hat in einem Handwerk die Meisterprüfung bestanden, einschließlich des Teils zu den berufs- und arbeitspädagogischen Kenntnissen. Er soll künftig bei Kelvinar ausbilden. Was gilt für den Nachweis seiner berufs- und arbeitspädagogischen Eignung?
- [ ] Er muss die Ausbildereignungsprüfung in jedem Fall zusätzlich ablegen.
- [x] Die bestandene Meisterprüfung gilt als Nachweis dieser Eignung.
- [ ] Er muss zunächst einen Vorbereitungslehrgang nachweisen.
- [ ] Der Nachweis gilt nur in Handwerksbetrieben, nicht bei Kelvinar.
**Erklärung:** Wer durch eine Meisterprüfung die berufs- und arbeitspädagogische Eignung nachgewiesen hat, gilt dafür als geeignet, auch außerhalb des Handwerks. Das ersetzt aber nicht die berufliche Fachkunde im Ausbildungsberuf und nicht die persönliche Eignung.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.1-20 · Zuordnung
**Anweisung:** Ordne jeder Ausgangslage zu, was für den Nachweis der berufs- und arbeitspädagogischen Eignung gilt.
- Ausbildereignungsprüfung nach früherem Recht bestanden ↔ Gilt kraft Verordnung als geeignet, ohne Befreiungsentscheidung
- Sonstige staatliche Prüfung, die den Handlungsfeldern teilweise entspricht ↔ Zuständige Stelle kann auf Antrag teilweise von der Prüfung befreien und bescheinigt es
- Eignung anderweitig glaubhaft gemacht, ordnungsgemäße Ausbildung gesichert ↔ Zuständige Stelle kann auf Antrag vom Nachweis befreien, auch mit Auflagen
- Schon vor August 2009 als Ausbilder:in tätig, keine Beanstandungen ↔ Vom Nachweis befreit (Bestandsschutz)
**Erklärung:** Bei früherem Recht und Bestandsschutz greift die Regel von selbst. Bei sonstigen Prüfungen entscheidet die zuständige Stelle auf Antrag nach Ermessen über die ganze oder teilweise Befreiung und bescheinigt sie; nur bei anderweitiger Glaubhaftmachung kann sie zusätzlich Auflagen erteilen.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-1.1-21 · Wahr/Falsch
**Aussage:** Wer die Ausbildereignungsprüfung bestanden hat, weist damit nur die berufs- und arbeitspädagogische Seite der fachlichen Eignung nach.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Das Zeugnis belegt allein die pädagogische Seite. Berufliche Fachkunde im Ausbildungsberuf, persönliche Eignung und eine geeignete Ausbildungsstätte müssen hinzukommen; deshalb ist man nach bestandener Prüfung nicht automatisch in jedem Beruf zum Ausbilden berechtigt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.1-22 · Multiple Choice
**Frage:** Eine Ausbilderin bei Kelvinar möchte die Ausbildereignungsprüfung ablegen und fragt, wo sie Anmeldefrist, Gebühr und Prüfungstermine erfährt. Wo findet sie diese Angaben verbindlich?
- [ ] In der Verordnung, die einheitliche Fristen und Gebühren festlegt
- [ ] Bei der Berufsschule, die die Prüfungstermine koordiniert
- [x] Bei der zuständigen Stelle, hier der IHK, in deren Unterlagen
- [ ] Beim Bundesinstitut für Berufsbildung, das die Termine festlegt
**Erklärung:** Die Verordnung enthält keine Anmeldefristen, Gebühren oder Termine. Die zuständige Stelle nimmt die Prüfung ab, regelt die Zulassung in ihrer Prüfungsordnung und veröffentlicht Termine, Fristen und Gebühren.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.1-23 · Kurzantwort
**Frage:** Aus mindestens wie vielen Mitgliedern besteht ein Prüfungsausschuss, der die Ausbildereignungsprüfung abnimmt? Antworte mit der Zahl.
**Akzeptierte Antworten:** 3; drei; 3 Mitglieder; drei Mitglieder; 3 Personen; drei Personen; mindestens 3; mindestens drei; mindestens 3 Mitglieder; mindestens drei Mitglieder; mindestens 3 Personen; mindestens drei Personen; mind. 3; mind. drei; mind. 3 Mitglieder; mind. drei Mitglieder
**Erklärung:** Der Prüfungsausschuss besteht aus mindestens drei Mitgliedern; er ist beschlussfähig, wenn zwei Drittel der Mitglieder, mindestens aber drei, mitwirken.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-1.1-24 · Mehrfachauswahl
**Frage:** Welche Aussagen zum Prüfungsausschuss der Ausbildereignungsprüfung treffen zu?
- [x] Arbeitgeber und Arbeitnehmer sind grundsätzlich in gleicher Zahl vertreten.
- [x] Mindestens eine Lehrkraft einer berufsbildenden Schule gehört ihm an.
- [x] Er beschließt über das Bestehen oder Nichtbestehen.
- [ ] Die Ausbildenden der Teilnehmenden bestimmen über seine Besetzung.
- [ ] Er besteht ausschließlich aus hauptamtlich Beschäftigten der zuständigen Stelle.
**Erklärung:** Die zuständige Stelle beruft die Mitglieder aus der Arbeitgeber- und der Arbeitnehmerseite und aus den berufsbildenden Schulen; von der gleichen Zahl darf sie nur abweichen, wenn sonst nicht genug Mitglieder zu berufen sind. Der Ausschuss beschließt über die Noten und über Bestehen oder Nichtbestehen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.1-25 · Wahr/Falsch
**Aussage:** Das Zeugnis über die bestandene Ausbildereignungsprüfung weist nach dem Muster mit Bewertung eine einzige Gesamtnote aus.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Das Zeugnismuster mit Bewertung nennt Punkte und Note getrennt für den schriftlichen und für den praktischen Prüfungsteil; eine Gesamtnote ist darin nicht vorgesehen. Wie die Prüfung insgesamt bewertet wird, regelt die Prüfungsordnung. Bestanden ist, wer in jedem Teil mindestens „ausreichend“ erreicht.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.1-26 · Sortieren
**Anweisung:** Bringe den Weg von der Anmeldung bis zum Zeugnis in die richtige Reihenfolge.
1. Anmeldung bei der zuständigen Stelle und Zulassung
2. Ablegen des schriftlichen und des praktischen Prüfungsteils
3. Beschluss des Prüfungsausschusses über das Bestehen
4. Ausstellung des Zeugnisses durch die zuständige Stelle
**Erklärung:** Ohne Zulassung keine Prüfung; erst nach den Prüfungsleistungen beschließt der Ausschuss über das Bestehen; das Zeugnis stellt die zuständige Stelle über die bestandene Prüfung aus.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-1.1-27 · Lückentext (Wortauswahl)
**Text:** Eine teilweise Befreiung von der Ausbildereignungsprüfung wegen einer anderen Prüfung mit ähnlichem Inhalt erteilt auf Antrag die ___zuständige Stelle___.
**Zusätzliche Begriffe:** Berufsschule; Agentur für Arbeit; Ausbildungsbetrieb
**Erklärung:** Über die Befreiung von der Prüfung entscheidet auf Antrag die zuständige Stelle, für Kelvinar die IHK, und bescheinigt sie. Auflagen kommen nur bei der Befreiung vom Nachweis in Betracht.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-1.1-28 · Entweder-Oder
**Frage:** Müssen Teilnehmende der Ausbildereignungsprüfung dieselben Zulassungsvoraussetzungen erfüllen wie Auszubildende für ihre Abschlussprüfung, also zum Beispiel Ausbildungszeit zurückgelegt und Ausbildungsnachweis vorgelegt?
- [ ] Ja, es gelten dieselben Voraussetzungen wie bei der Abschlussprüfung.
- [x] Nein, die Zulassung regelt die zuständige Stelle selbst.
**Erklärung:** Die Zulassungsregeln der Abschlussprüfung gelten für Auszubildende. Die Ausbildereignungsprüfung verweist auf die Prüfungsordnung der zuständigen Stelle, die Zulassung und Gliederung regelt.
`schwierigkeit: mittel` · `bloom: analysieren`
