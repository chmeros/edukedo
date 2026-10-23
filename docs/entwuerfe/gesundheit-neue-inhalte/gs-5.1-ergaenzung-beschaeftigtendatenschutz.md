# Entwurf Fachwirt im Gesundheits- und Sozialwesen, Beschäftigtendatenschutz: Ergänzung im Thema 5.1

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil AW-B des Pakets P-AW (Auftrag `docs/entwuerfe/gesundheit-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/gesundheit-r4-auswertung.md`, Lücke GS-6, Teil Beschäftigtendatenschutz). Einzufügen in `content/fachwirt-gesundheit-soziales/hb5/5.1-personalplanung-auswahl.md`: Abschnitt A **vor der Überschrift „### Rechenbeispiel: Personalbedarf nach der Kennzahlenmethode“** (Anker; die Theorie steht damit hinter „Personalauswahl und Vorstellungsgespräch“), B an die Karteikarten hinter K-5.1-23, C an das Quiz hinter Q-5.1-22. Bestand gezählt (Stand 23.10.2026): 23 Karteikarten (K-5.1-01 bis -23, lückenlos), 22 Quizfragen (Q-5.1-01 bis -22, lückenlos); `git log -S` auf K-5.1-24 und Q-5.1-23 ergibt im Gesundheitskurs keine entfernten IDs. Die neuen IDs sind K-5.1-24 bis -31 (8 Karten) und Q-5.1-23 bis -31 (9 Quizfragen, davon 1 Rechen-Kurzantwort). Die Fallaufgabe F-HB5-06 (gemeinsam mit Thema 5.4) und die zwei Fachgesprächsfragen stehen in `gs-faelle-aw-b.md`, die Rechtsangaben in `rechtsangaben-aw-b.md`, die Ersetzungen im Bestand in `ersetzungen-aw-b.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand behandelt das Vorstellungsgespräch (unzulässige Fragen, Masernschutz als Beispiel, Nachweisgesetz, Beteiligung des Betriebsrats), nennt den Beschäftigtendatenschutz aber nicht. Es fehlen die Rechtsgrundlagen der Verarbeitung von Beschäftigtendaten, die Datenverarbeitung im Bewerbungsverfahren (Information, Speicherdauer abgelehnter Bewerbungen, Talentpool), der Umgang mit Gesundheitsdaten, Impfnachweisen und Führungszeugnissen sowie die Rechte der Beschäftigten an der Personalakte. Die Ergänzung wiederholt nichts aus dem Abschnitt „Personalauswahl und Vorstellungsgespräch“ (unzulässige Fragen, Masern als Beispiel für zulässige Fragen) und nichts aus Thema 1.1 „Rechtliche und institutionelle Rahmenbedingungen von Einrichtungen im Gesundheits- und Sozialwesen“ im Fachgebiet „Planen, Steuern und Organisieren betrieblicher Prozesse“ (DSGVO, Gesundheitsdaten als besondere Kategorie, Schweigepflicht, Sozialdatenschutz). Der Datenschutz bei Klient:innen und Patient:innen (Einwilligung, Auftragsverarbeitung, Datenpanne, Pflegedokumentation) ist nicht Gegenstand; er gehört zu einem eigenen Thema des Pakets. Der Pflegemindestlohn steht in der Ergänzung zu Thema 5.4.

**Rechtsnah (R4).** Paragrafen stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch (auch keine Gesetzesnamen in Karten und Quiz). Rechtsgrundlagen am Rohtext gelesen (BDSG, IfSG, BZRG, BetrVG, AGG, ArbGG von gesetze-im-internet.de, DSGVO im Amtsblattwortlaut; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-aw-b.md`). Das Urteil des Bundesarbeitsgerichts vom 08.05.2025 (8 AZR 209/21) ist im Volltext gelesen, das Urteil des Europäischen Gerichtshofs vom 30.03.2023 (C-34/21) nur über die Wiedergabe im Urteil des Bundesarbeitsgerichts. Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Anwendbarkeit von § 26 BDSG nach dieser Rechtsprechung und das geplante Beschäftigtendatengesetz (nur über Fachquellen belegt), die Frage, ob ambulante Pflegedienste und Pflegeheime vom Masernnachweis erfasst sind, und die Auslegung der Erforderlichkeit bei Führungszeugnissen.

---

# Thema 5.1

## A. Theorie-Ergänzung 5.1 (einfügen vor „### Rechenbeispiel: Personalbedarf nach der Kennzahlenmethode“)

### Beschäftigtendatenschutz: Rechtsgrundlagen

Wer personenbezogene Daten von Beschäftigten verarbeitet, braucht dafür eine Rechtsgrundlage; ohne sie ist die Verarbeitung verboten (Stützangabe Art. 6 Abs. 1 DSGVO; Stand Oktober 2026, vor Verwendung prüfen). Die Grundsätze der Verarbeitung gelten auch im Personalwesen: Rechtmäßigkeit und Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung sowie Integrität und Vertraulichkeit (Stützangabe Art. 5 Abs. 1 DSGVO). Im Personalwesen kommen vor allem diese Rechtsgrundlagen in Betracht: die Erfüllung eines Vertrags oder vorvertragliche Maßnahmen auf Anfrage der Person (Buchst. b), eine rechtliche Verpflichtung, etwa gegenüber Sozialversicherung und Finanzverwaltung (Buchst. c), berechtigte Interessen des Arbeitgebers nach Abwägung mit den Interessen der Beschäftigten (Buchst. f) und die Einwilligung (Buchst. a). Nach seinem Wortlaut lässt das Bundesdatenschutzgesetz (BDSG) die Verarbeitung für Zwecke des Beschäftigungsverhältnisses zu, wenn sie für die Entscheidung über die Begründung des Beschäftigungsverhältnisses oder nach der Begründung für dessen Durchführung oder Beendigung **erforderlich** ist (Stützangabe § 26 Abs. 1 Satz 1 BDSG, Art. 88 DSGVO). Als Beschäftigte gelten neben Arbeitnehmer:innen auch zu ihrer Berufsbildung Beschäftigte, **Bewerbende** und Personen, deren Beschäftigungsverhältnis beendet ist (Stützangabe § 26 Abs. 8 BDSG).

Das Bundesarbeitsgericht hat am 8. Mai 2025 (8 AZR 209/21) entschieden, dass § 26 Abs. 1 BDSG die Voraussetzungen der Öffnungsklausel des Art. 88 DSGVO nicht erfüllt und deshalb unangewendet bleiben muss; es stützt sich dabei auf ein Urteil des Europäischen Gerichtshofs vom 30. März 2023 (C-34/21). Die Verarbeitung im Beschäftigungskontext ist dann unmittelbar an den allgemeinen Vorschriften der DSGVO zu messen. Der Maßstab dürfte sich dadurch kaum ändern (Auslegung): Entscheidend bleibt, ob die Verarbeitung für ihren Zweck erforderlich ist und die Interessen der Beschäftigten nicht überwiegen. Ein eigenes Beschäftigtendatengesetz ist als Vorhaben angekündigt, nach den zugänglichen Fachquellen aber nicht in Kraft; wie weit die übrigen Absätze von § 26 BDSG anwendbar sind, wird unterschiedlich beurteilt (Rechtsprechung und Reform; Stand Oktober 2026, vor Verwendung prüfen).

### Daten im Bewerbungsverfahren

Im Bewerbungsverfahren darf ein Arbeitgeber nur die Daten erheben und nutzen, die er für die Entscheidung über die Einstellung auf die konkrete Stelle braucht: Kontaktdaten, Qualifikationen, beruflicher Werdegang, Zeugnisse und bei Pflegefachkräften der Nachweis der Berufserlaubnis. Fragen, die Bewerbende wegen verbotener Merkmale benachteiligen können (zum Beispiel nach einer Schwangerschaft, siehe „Personalauswahl und Vorstellungsgespräch“), sind auch datenschutzrechtlich nicht erforderlich. Spätestens bei der Erhebung, etwa im Bewerbungsportal oder in der Eingangsbestätigung, sind die Bewerbenden über den Verantwortlichen, die Zwecke, die Rechtsgrundlage, die Empfänger, die Speicherdauer und ihre Rechte zu informieren (Stützangabe Art. 13 DSGVO). Zugriff auf die Unterlagen haben nur die am Auswahlverfahren Beteiligten. Besteht ein Betriebsrat, bedürfen **Personalfragebogen** seiner Zustimmung (Stützangabe § 94 Abs. 1 BetrVG); im öffentlichen Dienst und bei kirchlichen Trägern gelten eigene Beteiligungsregeln, und kirchliche Träger haben teils eigene Datenschutzvorschriften (Stand Oktober 2026, vor Verwendung prüfen).

**Speicherdauer abgelehnter Bewerbungen.** Daten dürfen nur so lange in identifizierbarer Form gespeichert werden, wie es für den Zweck erforderlich ist (Stützangabe Art. 5 Abs. 1 Buchst. e DSGVO). Mit dem Abschluss des Verfahrens entfällt der Zweck der Einstellungsentscheidung; eine feste gesetzliche Löschfrist nennt das Gesetz nicht. Ein Grund für eine begrenzte weitere Speicherung kann die Abwehr von Ansprüchen sein: Wer bei einer Bewerbung wegen eines verbotenen Merkmals benachteiligt wurde, kann eine Entschädigung verlangen, muss den Anspruch aber, sofern kein Tarifvertrag etwas anderes regelt, innerhalb von zwei Monaten nach Zugang der Ablehnung schriftlich geltend machen (Stützangabe § 15 Abs. 2, 4 AGG) und innerhalb von drei Monaten nach der schriftlichen Geltendmachung Klage erheben; die Klagefrist läuft also nur, wenn rechtzeitig geltend gemacht wurde (Stützangabe § 61b Abs. 1 ArbGG). Wie lange eine solche Speicherung gerechtfertigt ist, beurteilt sich im Einzelfall und wird hier nicht als feste Frist dargestellt. Soll die Bewerbung für spätere Stellen vorgehalten werden (**Talentpool**), braucht der Dienst dafür die freiwillige und jederzeit widerrufliche Einwilligung der Person (Stützangabe Art. 6 Abs. 1 Buchst. a, Art. 7 Abs. 3 DSGVO).

**Einwilligung im Beschäftigungsverhältnis.** Eine Einwilligung muss freiwillig, für den bestimmten Fall, in informierter Weise und unmissverständlich erteilt werden und kann jederzeit mit Wirkung für die Zukunft widerrufen werden; vor der Einwilligung ist darauf hinzuweisen (Stützangabe Art. 4 Nr. 11, Art. 7 Abs. 3 DSGVO). Bei der Freiwilligkeit sind die Abhängigkeit der beschäftigten Person und die Umstände der Erteilung zu berücksichtigen; im Bewerbungsverfahren ist sie wegen dieser Abhängigkeit zweifelhaft. Nach dem Wortlaut von § 26 Abs. 2 BDSG kann Freiwilligkeit insbesondere bei einem rechtlichen oder wirtschaftlichen Vorteil oder gleichgelagerten Interessen vorliegen, und der Arbeitgeber hat über Zweck und Widerrufsrecht in Textform aufzuklären; ob die Vorschrift nach dem genannten Urteil weiter anzuwenden ist, wird unterschiedlich beurteilt. Eine Einwilligung ersetzt nicht die Prüfung, ob die Verarbeitung überhaupt nötig ist (Stand Oktober 2026, vor Verwendung prüfen).

### Gesundheitsdaten, Nachweise und Führungszeugnis

**Gesundheitsdaten.** Sie gehören zu den besonderen Kategorien personenbezogener Daten, deren Verarbeitung grundsätzlich untersagt ist (Stützangabe Art. 9 Abs. 1 DSGVO). Ausnahmen gelten unter anderem bei ausdrücklicher Einwilligung, wenn die Verarbeitung erforderlich ist, um Rechte und Pflichten aus dem Arbeitsrecht und dem Recht der sozialen Sicherheit auszuüben und zu erfüllen und Rechtsvorschriften oder eine Kollektivvereinbarung dies zulassen, und für Zwecke der Arbeitsmedizin und der Beurteilung der Arbeitsfähigkeit durch Fachpersonal, das einem Berufsgeheimnis unterliegt (Stützangabe Art. 9 Abs. 2 Buchst. a, b, h, Abs. 3 DSGVO; § 26 Abs. 3 BDSG). Für den Arbeitgeber heißt das: Er sammelt keine Diagnosen und Krankengeschichten, sondern erfährt, was er für seine arbeitsrechtlichen Pflichten braucht, etwa dass und wie lange eine Beschäftigte arbeitsunfähig ist (Entgeltfortzahlung: Thema 5.5 „Grundlagen des Arbeitsrechts“ im Fachgebiet „Führen und Entwickeln von Personal“). Medizinische Beurteilungen gehören in die Hand ärztlichen Fachpersonals mit Schweigepflicht. Gesundheitsdaten, die Beschäftigte freiwillig mitteilen, bleiben geschützt und gehören nur dorthin, wo sie gebraucht werden.

**Impf- und Masernnachweis.** Das Infektionsschutzgesetz (IfSG) sieht für bestimmte Einrichtungen eine Nachweispflicht vor: Personen, die nach dem 31. Dezember 1970 geboren sind und dort tätig werden sollen, müssen der Leitung vor Beginn der Tätigkeit einen Nachweis über ausreichenden Impfschutz oder Immunität gegen Masern oder über eine medizinische Kontraindikation vorlegen. Wer ihn nicht vorlegt, darf dort nicht tätig werden; fehlt er oder bestehen Zweifel an der Echtheit, benachrichtigt die Leitung das Gesundheitsamt (Stützangabe § 20 Abs. 8, 9 IfSG). Erfasst sind unter anderem die in § 23 Abs. 3 Satz 1 IfSG genannten Einrichtungen (Krankenhäuser, Arztpraxen und weitere Einrichtungen der Krankenversorgung), bestimmte Gemeinschaftseinrichtungen und Unterkünfte. Ambulante Pflegedienste und Pflegeheime nennt die Aufzählung im Wortlaut nicht ausdrücklich; ob eine Einrichtung zu den dort genannten vergleichbaren Versorgungseinrichtungen gehört, ist im Einzelfall zu klären, zum Beispiel mit dem Gesundheitsamt, und wird hier nicht entschieden (Stand Oktober 2026, vor Verwendung prüfen). Unabhängig davon darf der Arbeitgeber den Impf- und Serostatus von Beschäftigten verarbeiten, soweit es zur Erfüllung der Pflichten zur Infektionsverhütung erforderlich ist, um über die Begründung oder die Art der Beschäftigung zu entscheiden. Das gilt für die Einrichtungen nach § 23 Abs. 3 Satz 1 IfSG (Stützangabe § 23a IfSG) und ausdrücklich auch für voll- und teilstationäre Pflegeeinrichtungen sowie ambulante Pflegedienste, die nach § 35 Abs. 1 IfSG die erforderlichen Infektionsschutzmaßnahmen sicherstellen müssen (Stützangabe § 35 Abs. 2 IfSG). Beide Befugnisse gelten nicht für Krankheiten, die bei leitliniengerechter Behandlung nicht mehr übertragen werden können, und das allgemeine Datenschutzrecht bleibt unberührt. Die Hygienepflichten selbst (Hygieneplan, Überwachung durch das Gesundheitsamt) behandelt Thema 2.6 „Hygiene und Infektionsschutz“ im Fachgebiet „Steuern von Qualitätsmanagementprozessen“. Wo keine solche Befugnis und keine Einwilligung vorliegt, fehlt in der Regel die Rechtsgrundlage, pauschal nach dem Impfstatus zu fragen. Gespeichert werden darf nur, was dafür erforderlich ist; das kann sich auf einen Vermerk beschränken, dass der Nachweis geprüft wurde.

**Führungszeugnis.** Bewerbende beantragen ein Führungszeugnis selbst bei der Meldebehörde; es wird nur ihnen übersandt, und sie legen es dem Arbeitgeber vor (Stützangabe § 30 Abs. 1, 2, 4 BZRG). Ob der Arbeitgeber es verlangen darf, hängt von der Erforderlichkeit für die konkrete Tätigkeit ab: Bei Tätigkeiten in enger Betreuung hilfebedürftiger Menschen in deren Wohnung kann das zu bejahen sein, bei Tätigkeiten ohne diesen Vertrauensbezug eher nicht (Auslegung des Erforderlichkeitsmaßstabs; Stand Oktober 2026, vor Verwendung prüfen). Ein **erweitertes** Führungszeugnis wird nur erteilt, wenn ein Gesetz es unter Bezug auf diese Vorschrift vorsieht oder wenn es für eine berufliche oder ehrenamtliche Beaufsichtigung, Betreuung, Erziehung oder Ausbildung Minderjähriger oder eine vergleichbar kontaktgeeignete Tätigkeit benötigt wird; die Stelle, die es verlangt, bestätigt das dem Antragsteller schriftlich. Die Daten dürfen nur zur Prüfung der Eignung für diese Tätigkeit verarbeitet werden und sind unverzüglich zu löschen, wenn die Tätigkeit nicht ausgeübt wird, spätestens sechs Monate nach der letztmaligen Ausübung (Stützangabe § 30a BZRG).

### Personalakte, Rechte der Beschäftigten und Mitbestimmung

Die **Personalakte** sammelt die Unterlagen, die das Arbeitsverhältnis betreffen, etwa Vertrag, Qualifikationsnachweise und Beurteilungen. Das Betriebsverfassungsgesetz regelt das Einsichtsrecht; eine ausführliche gesetzliche Regelung der Personalakte privater Arbeitgeber gibt es darüber hinaus nicht, die Grundsätze hat vor allem die Rechtsprechung entwickelt: Die Akte soll vollständig und wahrheitsgemäß sein, ihr Inhalt ist vertraulich zu behandeln, Zugriff haben nur Personen mit Aufgabenbezug, und besonders sensible Unterlagen wie Gesundheitsdaten werden getrennt und besonders geschützt aufbewahrt (Stand Oktober 2026, vor Verwendung prüfen). Beschäftigte können in ihre Personalakte Einsicht nehmen, dazu ein Betriebsratsmitglied hinzuziehen und Erklärungen zum Inhalt beifügen lassen (Stützangabe § 83 BetrVG). Unabhängig davon haben sie Rechte nach dem Datenschutzrecht: Auskunft über die verarbeiteten Daten und eine Kopie, Berichtigung unrichtiger Daten und Löschung, wenn die Daten nicht mehr notwendig sind, soweit nicht gesetzliche Aufbewahrungspflichten entgegenstehen (Stützangabe Art. 15, 16, 17 Abs. 1 Buchst. a, Abs. 3 Buchst. b DSGVO; zu Aufbewahrungsfristen siehe Thema 4.1 „Rechnungswesen-Grundlagen und Jahresabschluss“ im Fachgebiet „Steuern und Überwachen betriebswirtschaftlicher Prozesse und Ressourcen“). Setzt ein Dienst technische Einrichtungen ein, die dazu bestimmt sind, Verhalten oder Leistung der Beschäftigten zu überwachen, zum Beispiel Ortung in der Tourenplanung oder Auswertungen der digitalen Dokumentation, hat ein Betriebsrat bei Einführung und Anwendung mitzubestimmen, soweit keine gesetzliche oder tarifliche Regelung besteht (Stützangabe § 87 Abs. 1 Nr. 6 BetrVG). Im öffentlichen Dienst und bei kirchlichen Trägern gelten auch hier eigene Regeln.

### Rechenbeispiel: Fristen nach einer Absage

Alle Werte sind frei gewählte Beispielwerte (Stand Oktober 2026, vor Verwendung prüfen). Einer Bewerberin geht am Mittwoch, 10.03.2027, die Absage zu. Zählweise (Festlegung des Beispiels): Der Tag des Zugangs zählt nicht mit; die Frist endet mit Ablauf des Tages, der durch seine Benennung dem Tag des Zugangs entspricht; Wochenend- und Feiertagsverschiebungen bleiben außer Betracht (Stützangabe §§ 187 Abs. 1, 188 Abs. 2 BGB). Die Zwei-Monats-Frist, um eine Entschädigung schriftlich geltend zu machen (sofern kein Tarifvertrag etwas anderes regelt), endet damit am Montag, 10.05.2027. Macht die Bewerberin den Anspruch an diesem Tag schriftlich geltend, endet die Drei-Monats-Frist für die Klage am Dienstag, 10.08.2027.

## B. Karteikarten 5.1 (anhängen)

#### K-5.1-24
**Frage:** Wann darf ein Arbeitgeber personenbezogene Daten von Beschäftigten verarbeiten?
**Antwort:** Nur mit einer Rechtsgrundlage. Im Beschäftigungsverhältnis zählt vor allem, ob die Daten für Vertrag, Durchführung oder Beendigung des Arbeitsverhältnisses erforderlich sind. Der Schutz gilt schon für Bewerbende und noch für frühere Beschäftigte.
`tags: beschaeftigtendatenschutz, rechtsgrundlage` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.1-25
**Frage:** Welche Daten darf ein Pflegedienst im Bewerbungsverfahren erheben, und was muss er den Bewerbenden mitteilen?
**Antwort:** Nur, was für die Entscheidung über die konkrete Stelle erforderlich ist, etwa Werdegang, Zeugnisse und Berufsnachweis. Dazu informiert er über Zwecke, Speicherdauer und Rechte, zum Beispiel im Bewerbungsportal.
`tags: bewerbung, datenschutz, informationspflicht` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.1-26
**Frage:** Wie lange darf ein Dienst die Unterlagen abgelehnter Bewerbender aufbewahren?
**Antwort:** Nur so lange, wie es erforderlich ist; eine feste gesetzliche Frist gibt es nicht. Anhaltspunkt sind die Fristen für Entschädigungsansprüche (zwei Monate ab Absage, dann drei Monate zur Klage, sofern rechtzeitig geltend gemacht). Ein Talentpool braucht eine Einwilligung.
`tags: bewerbung, speicherdauer, talentpool` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-5.1-27
**Frage:** Wann ist eine Einwilligung von Beschäftigten in die Datenverarbeitung wirksam?
**Antwort:** Sie muss freiwillig, informiert und unmissverständlich sein und kann jederzeit widerrufen werden. Die Abhängigkeit im Arbeitsverhältnis wird bei der Freiwilligkeit berücksichtigt, im Bewerbungsverfahren ist sie deshalb zweifelhaft. Sie ersetzt nicht die Prüfung der Erforderlichkeit.
`tags: einwilligung, beschaeftigtendatenschutz` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.1-28
**Frage:** Wie sind Gesundheitsdaten von Beschäftigten geschützt?
**Antwort:** Sie sind besondere Daten, deren Verarbeitung grundsätzlich untersagt ist. Erlaubt ist sie unter anderem mit ausdrücklicher Einwilligung oder soweit für Rechte und Pflichten aus Arbeits- und Sozialrecht erforderlich. Diagnosen gehen den Arbeitgeber in der Regel nichts an.
`tags: gesundheitsdaten, beschaeftigtendatenschutz` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-5.1-29
**Frage:** Wer prüft einen vorgeschriebenen Masernnachweis, was geschieht ohne Nachweis, und was darf der Arbeitgeber speichern?
**Antwort:** Die Leitung der Einrichtung prüft ihn vor Tätigkeitsbeginn. Ohne Nachweis darf die Person dort nicht tätig werden, bei fehlendem Nachweis oder Zweifeln wird das Gesundheitsamt benachrichtigt. Gespeichert wird nur, was erforderlich ist; oft genügt ein Vermerk über die Prüfung.
`tags: masernnachweis, impfstatus, einrichtungen` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-5.1-30
**Frage:** Darf ein Arbeitgeber von allen Bewerbenden ein Führungszeugnis verlangen?
**Antwort:** Nur, wenn es für die konkrete Tätigkeit erforderlich ist, nicht pauschal. Ein erweitertes Führungszeugnis gibt es nur bei gesetzlicher Grundlage oder Tätigkeit mit Minderjährigen; die Daten dienen allein der Eignungsprüfung und werden später gelöscht.
`tags: fuehrungszeugnis, bewerbung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-5.1-31
**Frage:** Welche Rechte haben Beschäftigte an ihrer Personalakte, und wer wirkt bei technischer Überwachung mit?
**Antwort:** Sie können Einsicht nehmen, ein Betriebsratsmitglied hinzuziehen und Erklärungen beifügen; dazu kommen Auskunft, Berichtigung und Löschung. Bei Systemen zur Verhaltens- oder Leistungskontrolle hat ein Betriebsrat mitzubestimmen.
`tags: personalakte, mitbestimmung, betroffenenrechte` · `schwierigkeit: mittel` · `bloom: verstehen`

## C. Quiz 5.1 (anhängen)

#### Q-5.1-23 · Multiple Choice
**Frage:** Das Online-Bewerbungsformular eines Pflegedienstes fragt alle Bewerbenden nach Vorerkrankungen. Wie ist das einzuschätzen?
- [ ] Zulässig, weil in der Pflege jeder Gesundheitszustand für die Eignung wichtig ist.
- [x] Unzulässig, weil eine pauschale Abfrage bei allen nicht erforderlich ist.
- [ ] Unzulässig, aber nur, wenn die Bewerbenden dem Dienst vorher widersprechen.
- [ ] Zulässig, wenn der Dienst die Angaben nach einem Jahr wieder löscht.
**Erklärung:** Gesundheitsdaten sind besonders geschützt. Gefragt werden darf nur nach dem, was für die konkrete Tätigkeit wirklich erforderlich ist. Freiwilligkeit im Bewerbungsverfahren ist wegen der Abhängigkeit zweifelhaft, und eine spätere Löschung heilt eine unzulässige Erhebung nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.1-24 · Wahr/Falsch
**Aussage:** Der Datenschutz im Personalwesen schützt auch Bewerbende und frühere Beschäftigte.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Bewerbende und ehemalige Beschäftigte sind betroffene Personen, deren Daten der Arbeitgeber verarbeitet; auch das deutsche Recht stellt sie ausdrücklich den Beschäftigten gleich. Der Schutz gilt deshalb schon vor und noch nach dem Arbeitsverhältnis.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-5.1-25 · Kurzantwort
**Frage:** Einer Bewerberin geht am Mittwoch, 07.04.2027, die Absage zu. Sie kann eine Entschädigung wegen Benachteiligung innerhalb von zwei Monaten nach Zugang schriftlich geltend machen; ein abweichender Tarifvertrag besteht nicht. Zählweise: Der Tag des Zugangs zählt nicht mit, die Frist endet mit Ablauf des Tages, der durch seine Benennung dem Zugangstag entspricht; Wochenend- und Feiertagsregeln bleiben außer Betracht. Bis zu welchem Datum (TT.MM.JJJJ) muss sie den Anspruch geltend machen?
**Akzeptierte Antworten:** 07.06.2027; 7.6.2027; 07.06.27; 7.6.27; 7. Juni 2027; 07. Juni 2027; 7 Juni 2027; 07 Juni 2027; 7.Juni 2027; 07.Juni 2027
**Erklärung:** Zwei Monate nach dem 07.04.2027 endet die Frist mit Ablauf des 07.06.2027, einem Montag. Danach läuft, wenn der Anspruch rechtzeitig geltend gemacht wurde, noch die Klagefrist von drei Monaten.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.1-26 · Mehrfachauswahl
**Frage:** Welche Aussagen zur Einwilligung von Beschäftigten in die Datenverarbeitung treffen zu?
- [x] Die Abhängigkeit der Person wird bei der Freiwilligkeit berücksichtigt.
- [x] Die Einwilligung kann jederzeit widerrufen werden.
- [x] Die Person muss wissen, wofür sie einwilligt.
- [ ] Mit der Einwilligung entfällt die Prüfung, ob die Daten nötig sind.
- [ ] Im Bewerbungsverfahren ist die Freiwilligkeit immer eindeutig gegeben.
**Erklärung:** Eine wirksame Einwilligung ist freiwillig, informiert und widerruflich. Im Arbeitsverhältnis und besonders im Bewerbungsverfahren wird die Freiwilligkeit wegen der Abhängigkeit besonders geprüft. Sie ersetzt nicht den Maßstab der Erforderlichkeit.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-5.1-27 · Zuordnung
**Anweisung:** Ordne dem Dokument den passenden Umgang zu.
- Unterlagen abgelehnter Bewerbender ↔ löschen, sobald sie nicht mehr erforderlich sind
- Diagnose einer Arbeitsunfähigkeit ↔ geht den Arbeitgeber in der Regel nichts an
- Erweitertes Führungszeugnis ↔ nur bei gesetzlicher Grundlage oder Tätigkeit mit Minderjährigen
- Masernnachweis ↔ nur in den vom Gesetz genannten Einrichtungen
**Erklärung:** Alle vier Beispiele folgen dem Maßstab der Erforderlichkeit: Daten werden nur erhoben und aufbewahrt, soweit der Zweck es verlangt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-5.1-28 · Entweder-Oder
**Frage:** Darf die Tourenleitung jederzeit in die Personalakten aller Beschäftigten ihrer Touren schauen?
- [ ] Ja, denn als Vorgesetzte darf sie alle Unterlagen ihres Teams einsehen
- [x] Nein, nur Personen mit Aufgabenbezug haben Zugriff
**Erklärung:** Personalakten sind vertraulich. Zugriff haben nur Personen, die die Daten für ihre Aufgabe brauchen; Gesundheitsdaten sind besonders zu schützen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-5.1-29 · Lückentext
**Text:** Führt ein Pflegedienst ein System ein, das Standort- oder Leistungsdaten der Beschäftigten erfasst, hat ein bestehender Betriebsrat ein ___Mitbestimmungsrecht___.
**Erklärung:** Bei technischen Einrichtungen zur Überwachung von Verhalten oder Leistung hat der Betriebsrat mitzubestimmen, soweit keine gesetzliche oder tarifliche Regelung besteht.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-5.1-30 · Sortieren
**Anweisung:** Bringe die Schritte der Datenverarbeitung bei einer Bewerbung in eine sinnvolle Reihenfolge.
1. Die Bewerbenden werden über die Datenverarbeitung informiert
2. Befugte Personen sichten die erforderlichen Unterlagen
3. Die Einstellungsentscheidung wird getroffen
4. Die Unterlagen der Abgelehnten werden gelöscht, sobald sie nicht mehr erforderlich sind
**Erklärung:** Die Information steht am Anfang der Erhebung. Danach folgen Prüfung und Entscheidung, und am Ende steht die Löschung, wenn der Zweck entfallen ist.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-5.1-31 · Was passt nicht dazu
**Frage:** Worüber informiert ein Pflegedienst Bewerbende zu Beginn der Datenverarbeitung nicht?
- [ ] Zwecke der Datenverarbeitung im Bewerbungsverfahren
- [ ] Dauer der Speicherung der Bewerbungsunterlagen
- [ ] Rechte der Bewerbenden auf Auskunft und Löschung
- [x] Namen und Daten anderer Bewerbender
**Erklärung:** Zu den Informationen gehören Verantwortlicher, Zwecke, Rechtsgrundlage, Empfänger, Speicherdauer und Rechte. Daten anderer Bewerbender werden nicht weitergegeben.
`schwierigkeit: leicht` · `bloom: verstehen`
