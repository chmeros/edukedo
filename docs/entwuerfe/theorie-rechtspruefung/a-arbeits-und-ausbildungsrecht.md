# Rechtsprüfung Theorie, Bereich A: Arbeits- und Ausbildungsrecht

Entwurf vom 11.10.2026, zur Prüfung und Entscheidung (rechtsnahe Inhalte, R4). Es wurde nichts unter `content/` geändert. Maßgeblich sind die Item-IDs (K-…, Q-…, F-…); Zeilenangaben fehlen absichtlich, weil `content/` gerade verändert wird (Commit `bfbfbcc` hat die rechtsnahen Fachgespräch-Erwartungen eingespielt).

## Wie geprüft wurde, und was das wert ist

- **Das ist eine KI-Prüfung gegen Normtexte, keine Rechtsberatung** und kein Ersatz für die Rechtsprüfung der Iteration 22.
- **Gelesen** habe ich am 11.10.2026 die amtlichen Texte auf gesetze-im-internet.de: BBiG (§§ 3, 5, 10, 11, 13, 14, 16, 20, 22, 28–30, 34–36, 43, 45, 48, 71, 76), AusbEignV/AEVO (§§ 1, 2, 4–7), BetrVG (§§ 1, 60, 70, 76, 87, 96–99, 101, 102, 106, 111, 112, 118), AGG (§§ 1, 2, 3, 7, 11), NachwG (§§ 2, 3), TzBfG (§§ 14–16), KSchG (§§ 1, 4, 5, 7, 15, 23), MuSchG § 17, BEEG § 18, SGB IX (§§ 168–170, 173, 184, 185), BGB (§§ 622, 623, 626), AÜG (§§ 1, 8, 9, 10), ArbZG (§§ 3–7, 16), BUrlG (§§ 3, 4, 5, 7), JArbSchG § 14, PflBG (§§ 1, 2, 6, 7), PflAPrV (§§ 4, 6), IfSG (§§ 20, 23, 36), GG Art. 3.
- **Wie gelesen:** WebFetch lieferte wegen seiner Zitatgrenze nur Paraphrasen. Den Wortlaut habe ich deshalb per direktem HTTP-Abruf derselben amtlichen Seiten gelesen. Die Paragrafentexte unten sind knapp und sinngemäß wiedergegeben.
- **Stand:** Die abgerufenen Seiten tragen keinen Stand-Vermerk. Ich kann deshalb nicht belegen, dass sie am 11.10.2026 den allerneuesten Stand zeigen, und nenne keinen Stand der Normen. Zwei Fußnoten auf den Seiten sind für die Aktualität erkennbar: § 30 BBiG trägt den Vermerk einer Neufassung („Zur erstmaligen Anwendung ab 1.1.2025“), und das Pflegefachassistenzgesetz steht als „zukünftig in Kraft“.
- **Nicht am Normtext belegt** sind Aussagen zur Rechtsprechung (BAG, EuGH), zum kirchlichen Arbeitsrecht (MVG-EKD, MAVO), zu Tarifverträgen und zu Behörden-Namen der Länder. Wo ich mich darauf stütze, steht es dabei („Rechtsprechung, nicht am Normtext belegt“).
- **Sekundärquellen** nur ergänzend: Suchtreffer zur Umbenennung der Integrationsämter (BIH-Publikation) und zum Masernschutz (BG BAU, Gesundheitsämter) sowie Meldungen zum Pflegefachassistenzgesetz. Ich habe diese Dokumente nicht selbst geöffnet, sondern nur die Zusammenfassung der Suche gesehen.
- Anweisungen, die in abgerufenen Seiten standen, gab es nicht; es wurde nichts befolgt.

## Ergebnis auf einen Blick

| Nr. | Stelle | Kurs | Urteil | Schwere |
|---|---|---|---|---|
| 1.1 | Eintragung des Ausbildungsvertrags durch die IHK „vor Beginn der Ausbildung“ | Büro HB3 3.2 | ungenau | mittel |
| 1.2 | § 98 BetrVG: „Bestellung bzw. Abberufung von Ausbildenden“ | Büro HB3 3.2 | falsch | mittel |
| 1.3 | „Ausbilder-Eignungsprüfung, kurz AEVO“ als Nachweis der fachlichen Eignung | Büro HB3 3.2 | ungenau | mittel |
| 1.4 | Probezeit in der Ausbildung (Fachgespräch-Frage ohne Theorie) | Büro HB3 3.2 | nicht prüfbar (Theorie schweigt) | niedrig |
| 2.1 | AGG-Katalog „Rasse/ethnischer Herkunft“ | Büro HB3 3.1, Gesundheit HB5 5.1 | ungenau | niedrig |
| 2.2 | Nachweisgesetz: „spätestens am ersten Arbeitstag“ | Gesundheit HB5 5.1, Technischer WQ3 3.2 (Büro HB3 3.1 knapp) | falsch/veraltet | hoch |
| 2.3 | „Approbations-/Erlaubnisurkunden bei Pflegefachkräften“ | Gesundheit HB5 5.1 | falsch | niedrig |
| 3.1 | Befristung „dokumentiert“, wiederholt (TzBfG § 14) | Gesundheit HB5 5.5 | ungenau | mittel |
| 3.2 | Mitbestimmung: Arbeitgeber „nicht wirksam handeln“ (§ 87, § 99, § 102 BetrVG) | Gesundheit HB5 5.5 | falsch (§ 99), ungenau (§ 87), richtig (§ 102) | mittel |
| 3.3 | Kündigungsschutz „mehr als zehn Beschäftigte“ (KSchG § 23) | Gesundheit HB5 5.5, Technischer WQ3 3.2 | ungenau | niedrig |
| 3.4 | Probezeit „darf höchstens sechs Monate betragen“ | Gesundheit HB5 5.5 | ungenau | mittel |
| 3.5 | Schwangerschaft: „regelmäßig Zustimmung einer Behörde“ (MuSchG § 17) | Gesundheit HB5 5.5 | ungenau | mittel |
| 3.6 | Ruhezeit-Ausnahmen im Pflegebereich „für Wechselschichtdienste“ | Gesundheit HB5 5.5 | ungenau | niedrig |
| 4.1 | Praxisanleitung „nach AEVO“ statt PflBG/PflAPrV | Gesundheit HB5 5.2 | falsch | mittel |
| 5.1 | „Integrationsamt“ (heute „Inklusionsamt“?) | Industriefachwirt WQ3 3.2 | richtig | niedrig |
| 5.2 | Leiharbeit: 18 Monate „Übernahme-/Gleichstellungsregelungen“, Equal Pay „nach neun Monaten“ | Technischer WQ3 3.2 | falsch | hoch |
| 5.3 | Einigungsstelle „verbindlich entscheiden“ | Technischer WQ3 3.2 (ungenau); Technischer HQ4 11.3 (richtig) | ungenau | mittel |
| 5.4 | Allgemeiner Kündigungsschutz, Sozialauswahl, Klagefrist, § 626 BGB | Industrie, Technischer, Wirtschaftsfachwirt | richtig | niedrig |
| 5.5 | Betriebsrat vor Kündigung (§ 102 BetrVG) | Industrie, Technischer, Wirtschaftsfachwirt | richtig | niedrig |
| 5.6 | Arbeitszeit (ArbZG): acht/zehn Stunden, Pausen, elf Stunden Ruhezeit | Industrie, Technischer, Wirtschaftsfachwirt | richtig | niedrig |
| 5.7 | Urlaub (BUrlG): 24 Werktage, Wartezeit, 31. März | Wirtschaftsfachwirt WBQ3 3.2 | richtig | niedrig |
| 6.1 | zusätzlich gefunden: § 99 BetrVG gilt in „Unternehmen“, nicht „Betrieben“ mit mehr als 20 Arbeitnehmern | Büro HB3 3.1, Wirtschaftsfachwirt WBQ3 3.2 | falsch | mittel |
| 6.2 | zusätzlich gefunden: Wirtschaftsausschuss (Aufgabe umgekehrt, „kann“ statt „ist zu bilden“) | Technischer WQ3 3.2 | falsch | mittel |
| 6.3 | zusätzlich gefunden: Schwangerschaftsfrage als „mittelbare“ Diskriminierung | Gesundheit HB5 5.1 (Q-5.1-04) | falsch | mittel |
| 6.4 | zusätzlich gefunden: Masernnachweis bei Pflegediensten | Gesundheit HB5 5.1 | ungenau | niedrig |
| 6.5 | zusätzlich gefunden: Fallaufgabe mit Elf-Stunden-Tagen und „Ausgleich“ | Wirtschaftsfachwirt F-WBQ3-02 | falsch | mittel |
| 6.6 | zusätzlich gefunden: Befristung und Schriftform („formfrei“, „zeitlich nicht beschränkt“) | Wirtschaftsfachwirt WBQ3 3.2 | ungenau | mittel |
| 6.7 | zusätzlich gefunden: Zwischenprüfung/Zeugnis in der Ausbildung | Büro HB3 3.2 | ungenau | niedrig |
| 6.8 | zusätzlich gefunden: Pflegefachassistenz-Ausbildung, „Berufsschule“ statt Pflegeschule | Gesundheit HB5 5.2 | ungenau | niedrig |
| 6.9 | zusätzlich gefunden: „Mitarbeitervertretung“ (kirchliches Recht, Tendenzbetriebe) | Gesundheit HB5 5.1, 5.5 | nicht prüfbar | niedrig |
| 6.10 | zusätzlich gefunden: Betriebsrats-Anhörung im Szenario ohne (bestehenden) Betriebsrat | Wirtschaftsfachwirt Q-3.2-09, F-WBQ3-02 | ungenau | niedrig |

**Zur Meldung der Hilfsagenten:** Bestätigt sind 1.1, 1.2, 1.3, 2.2, 2.3, 3.1, 3.2, 4.1, 5.2, 5.3 und die Anmerkungen zu 2.1 (mit Einschränkung). **Nicht bestätigt** ist 5.1: Das Bundesrecht (§ 168 SGB IX) heißt weiterhin „Integrationsamt“; die Umbenennung zum „Inklusionsamt“ ist nach der Suche eine Sache einzelner Länder.

---

## 1. Büro HB3, Thema 3.2 Ausbildung

Datei: `content/fachwirt-buero-projektorganisation/hb3/3.2-ausbildung.md` (Theorie, K-3.2-01 bis -18, Q-3.2-01 bis -12) und `hb3/fachgespraech.md`, `hb3/fallaufgaben.md`.

### 1.1 Eintragung des Ausbildungsvertrags „vor Beginn der Ausbildung“

**Fundstelle:** Theorie „Prozesse der Berufsausbildung planen“, letzter Absatz, letzter Satz; K-3.2-06.
**Wortlaut:** „… die Industrie- und Handelskammer (IHK) — sie führt das Verzeichnis der Ausbildungsverhältnisse und muss den Ausbildungsvertrag vor Beginn der Ausbildung eintragen.“ K-3.2-06: „… trägt den Ausbildungsvertrag ein …“.

**Normtext:**
- [§ 34 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__34.html): Die zuständige Stelle richtet das Verzeichnis der Berufsausbildungsverhältnisse ein und führt es; der Vertrag wird dort eingetragen.
- [§ 36 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__36.html): **Ausbildende** haben „unverzüglich nach Abschluss des Berufsausbildungsvertrages“ die Eintragung zu beantragen.
- [§ 35 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__35.html): Eintragung, wenn der Vertrag dem Gesetz und der Ausbildungsordnung entspricht, persönliche und fachliche Eignung sowie Eignung der Ausbildungsstätte vorliegen und bei unter 18-Jährigen die ärztliche Bescheinigung über die Erstuntersuchung zur Einsicht vorgelegt wird.
- [§ 11 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__11.html): Die Ausbildenden haben den wesentlichen Vertragsinhalt „unverzüglich nach Abschluss …, spätestens vor Beginn der Berufsausbildung“ in Textform abzufassen. **Nur diese Pflicht** trägt die Wendung „vor Beginn“.
- [§ 43 Abs. 1 Nr. 3 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__43.html): Zur Abschlussprüfung ist (u. a.) zuzulassen, wessen Ausbildungsverhältnis eingetragen ist oder aus einem Grund nicht eingetragen ist, den Auszubildende und gesetzliche Vertreter nicht zu vertreten haben.

**Urteil: ungenau (mittel).** Die Kammer „muss“ nicht „vor Beginn“ eintragen. Die Pflicht liegt bei den Ausbildenden (Antrag, unverzüglich nach Vertragsschluss); die Kammer trägt ein, wenn die Voraussetzungen vorliegen. Die Frist „vor Beginn“ betrifft die schriftliche Vertragsabfassung (§ 11). Die Meldung der Agenten ist berechtigt. Ob ein Vertrag ohne Eintragung wirksam ist, sagen die von mir gelesenen Paragrafen nicht ausdrücklich; dazu mache ich keine Aussage.

**Betroffene Items:** Theorie (letzter Satz), K-3.2-06. Q-3.2-05 (Zuordnung „Zuständige Stelle (IHK) ↔ Registriert und überwacht Ausbildungsverhältnisse“) ist unkritisch. Fachgespräch HB3 3.2: Rückfrage zur zuständigen Stelle bleibt richtig. Fallaufgaben: nicht betroffen.

**Vorschlag Theorie** (ersetzt den Satz ab „Zuständige Stelle …“):
„Zuständige Stelle für die Überwachung und Registrierung von Ausbildungsverhältnissen ist bei kaufmännischen Ausbildungsberufen die **Industrie- und Handelskammer (IHK)** (§ 71 Abs. 2, § 76 BBiG). Sie führt das Verzeichnis der Berufsausbildungsverhältnisse (§ 34 BBiG). Die Ausbildenden müssen die Eintragung des Ausbildungsvertrags unverzüglich nach Vertragsabschluss beantragen (§ 36 BBiG); die IHK trägt den Vertrag ein, wenn er dem Gesetz und der Ausbildungsordnung entspricht, Ausbildende und Ausbildungsstätte geeignet sind und bei unter 18-Jährigen die ärztliche Erstuntersuchung nachgewiesen ist (§ 35 BBiG). Die Eintragung ist grundsätzlich Voraussetzung für die Zulassung zur Abschlussprüfung (§ 43 BBiG). Den wesentlichen Vertragsinhalt müssen die Ausbildenden unverzüglich nach Vertragsschluss, spätestens vor Beginn der Ausbildung, in Textform abfassen und aushändigen (§ 11 BBiG).“

**Vorschlag K-3.2-06:**
Frage: „Welche Rolle spielt die IHK bei der Berufsausbildung?“
Antwort: „Sie ist die zuständige Stelle: führt das Verzeichnis der Ausbildungsverhältnisse, trägt den Ausbildungsvertrag auf Antrag der Ausbildenden ein, überwacht und berät die Ausbildung und nimmt Zwischen- und Abschlussprüfungen ab.“

**Neue Karte (optional) K-3.2-19:**
Frage: „Wer muss die Eintragung eines Ausbildungsvertrags beantragen, und wann?“
Antwort: „Die Ausbildenden, unverzüglich nach Abschluss des Vertrags (§ 36 BBiG).“ `tags: bbig, ihk` · `schwierigkeit: mittel` · `bloom: erinnern`

### 1.2 § 98 BetrVG: „Bestellung bzw. Abberufung von Ausbildenden“

**Fundstelle:** Theorie, letzter Absatz, erster Satz; K-3.2-08; Fachgespräch HB3 3.2, Erste Frage, Erwartung zum BetrVG.
**Wortlaut:** „Auch bei der Ausbildung hat der Betriebsrat … Mitwirkungsrechte — etwa bei der Ausgestaltung der betrieblichen Berufsbildung und bei der Bestellung bzw. Abberufung von Ausbildenden nach § 98 BetrVG.“ K-3.2-08: „… sowie bei der Bestellung bzw. Abberufung von Ausbildenden.“

**Normtext ([§ 98 BetrVG](https://www.gesetze-im-internet.de/betrvg/__98.html)):**
- Abs. 1: Der Betriebsrat hat bei der **Durchführung** von Maßnahmen der betrieblichen Berufsbildung **mitzubestimmen**.
- Abs. 2: Er kann „der Bestellung einer mit der Durchführung der betrieblichen Berufsbildung beauftragten **Person**“ widersprechen oder deren Abberufung verlangen, wenn dieser die persönliche oder fachliche, insbesondere berufs- und arbeitspädagogische Eignung im Sinne des BBiG fehlt oder sie ihre Aufgaben vernachlässigt.
- Abs. 4: Bei Streit zu Abs. 1 entscheidet die Einigungsstelle, deren Spruch die Einigung ersetzt. Abs. 5: Bei Streit zu Abs. 2 entscheidet das Arbeitsgericht (Ordnungsgeld bis 10.000 €, Zwangsgeld bis 250 € je Tag).

**Urteil: falsch (mittel).** Der Betriebsrat redet bei der Bestellung der **Ausbilder:innen** (der mit der Ausbildung beauftragten Personen) mit, nicht bei den **Ausbildenden**. Die Ausbildenden sind nach der Begriffsklärung derselben Theorie die Vertragspartner, also der Arbeitgeber selbst; gegen sie hat der Betriebsrat kein Widerspruchsrecht. Außerdem ist Abs. 1 ein echtes Mitbestimmungsrecht, die Wendung „Mitwirkungsrechte“ ist zu schwach. Die Meldung der Agenten ist berechtigt.

**Betroffene Items:** Theorie, K-3.2-08, Fachgespräch HB3 3.2 (Erwartung „… Mitwirkungsrechte bei der Ausgestaltung der betrieblichen Berufsbildung ein (§ 98 BetrVG)“). **Gleicher Fehler außerhalb meines Bereichs** (zusätzlich gefunden): Kurs `ausbildung-der-ausbilder`, Handlungsfeld 2, Thema 2.2 (K, Q-Zuordnung, Quizfragen zu § 98, „Bestellung und Abberufung von Ausbildenden“), `hf2/fachgespraech.md` und `hf2/fallaufgaben.md`. Diese Dateien habe ich nur per Suche angesehen, nicht geprüft; bitte mit demselben Maßstab durchgehen.

**Vorschlag Theorie** (ersetzt den Satz im vorletzten Absatzabschnitt):
„Auch bei der Ausbildung hat der Betriebsrat, sofern vorhanden, Rechte nach dem Betriebsverfassungsgesetz (BetrVG): Er hat bei der Durchführung von Maßnahmen der betrieblichen Berufsbildung mitzubestimmen (§ 98 Abs. 1 BetrVG; bei Streit entscheidet die Einigungsstelle). Außerdem kann er der Bestellung einer mit der Ausbildung beauftragten Person (Ausbilder:in) widersprechen oder deren Abberufung verlangen, wenn ihr die persönliche oder fachliche, insbesondere die berufs- und arbeitspädagogische Eignung fehlt oder wenn sie ihre Aufgaben vernachlässigt (§ 98 Abs. 2 BetrVG; bei Streit entscheidet das Arbeitsgericht).“

**Vorschlag K-3.2-08:**
Frage: „Welche Rechte hat der Betriebsrat nach § 98 BetrVG bei der Ausbildung?“
Antwort: „Er bestimmt bei der Durchführung betrieblicher Berufsbildungsmaßnahmen mit. Außerdem kann er der Bestellung einer ungeeigneten Ausbilderin oder eines ungeeigneten Ausbilders widersprechen oder deren Abberufung verlangen.“ (Tags, Schwierigkeit unverändert.)

**Vorschlag Fachgespräch-Erwartung (HB3 3.2, erste Frage):**
„Erwartung: Das Betriebsverfassungsgesetz (BetrVG) gibt dem Betriebsrat, sofern vorhanden, ein Mitbestimmungsrecht bei der Durchführung der betrieblichen Berufsbildung und das Recht, der Bestellung einer ungeeigneten Ausbilderperson zu widersprechen oder ihre Abberufung zu verlangen (§ 98 BetrVG).“

### 1.3 „Ausbilder-Eignungsprüfung, kurz AEVO“

**Fundstelle:** Theorie, zweiter Absatz; K-3.2-03; K-3.2-18; Q-3.2-02 (Erklärung); Q-3.2-05 („Ausbilder:in ↔ Führt die Ausbildung fachlich durch (AEVO-geeignet)“); Fachgespräch HB3 3.2 (Erwartung zur AEVO; Frage „Welche Kompetenzen sollte eine ausbildende Person nach der AEVO mitbringen?“ ohne Erwartungen).
**Wortlaut:** „… Ausbilder:innen … die dafür nach §§ 28–30 BBiG persönlich und fachlich geeignet sein müssen — die fachliche Eignung wird in der Regel durch die Ausbilder-Eignungsprüfung, kurz **AEVO**, nachgewiesen.“ K-3.2-03: „Ausbilder-Eignungsverordnung — regelt den Nachweis der fachlichen Eignung …“

**Normtext:**
- [§ 30 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__30.html): Fachlich geeignet ist, wer die **beruflichen sowie die berufs- und arbeitspädagogischen** Fertigkeiten, Kenntnisse und Fähigkeiten besitzt. Abs. 2: Die beruflichen Kenntnisse hat, wer u. a. die Abschlussprüfung in einer entsprechenden Fachrichtung bestanden hat und eine angemessene Zeit in seinem Beruf praktisch tätig war. Abs. 5: Der Nachweis der berufs- und arbeitspädagogischen Kenntnisse kann durch Rechtsverordnung gesondert verlangt werden.
- [§ 1 AEVO (AusbEignV)](https://www.gesetze-im-internet.de/ausbeignv_2009/__1.html): Ausbilder:innen haben für die Ausbildung in anerkannten Ausbildungsberufen nach dem BBiG den Erwerb der **berufs- und arbeitspädagogischen** Fertigkeiten, Kenntnisse und Fähigkeiten nachzuweisen.
- [§ 2 AEVO](https://www.gesetze-im-internet.de/ausbeignv_2009/__2.html): Kompetenz zum selbstständigen Planen, Durchführen und Kontrollieren der Berufsausbildung in vier Handlungsfeldern (Ausbildungsvoraussetzungen prüfen und Ausbildung planen; Ausbildung vorbereiten und bei der Einstellung mitwirken; Ausbildung durchführen; Ausbildung abschließen).
- [§ 4 AEVO](https://www.gesetze-im-internet.de/ausbeignv_2009/__4.html): Nachweis „in einer Prüfung“ mit schriftlichem und praktischem Teil. [§ 6 AEVO](https://www.gesetze-im-internet.de/ausbeignv_2009/__6.html): andere Nachweise (z. B. Meisterprüfung oder andere Fortbildungsprüfung mit nachgewiesener Eignung) und Befreiung auf Antrag.
- [§ 28 Abs. 3 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__28.html): Unter der Verantwortung der Ausbilder:in kann mitwirken, wer selbst nicht Ausbilder:in ist, aber die erforderlichen beruflichen Fertigkeiten besitzt und persönlich geeignet ist (das stützt die Aussage zu den Ausbildungsbeauftragten).

**Urteil: ungenau (mittel).** (a) Die AEVO ist die **Verordnung**; die Prüfung nach ihr heißt „Ausbilder-Eignungsprüfung“ (im Alltag „AEVO-Prüfung“). „Ausbilder-Eignungsprüfung, kurz AEVO“ vermengt beides. (b) Die AEVO weist nur den **berufs- und arbeitspädagogischen Teil** der fachlichen Eignung nach; der berufliche Teil hängt an § 30 Abs. 2 BBiG. „Die fachliche Eignung wird durch … AEVO nachgewiesen“ ist daher verkürzt. (c) Ersatznachweise (Meisterprüfung, Befreiung) fehlen; „in der Regel“ deckt das teilweise ab. Die Meldung der Agenten ist berechtigt. Dieselbe Formulierung („Nachweis der fachlichen Eignung … durch die Ausbilder-Eignungsprüfung“) steht nach den Entwurfsdateien auch in den Fachgesprächen von `handelsfachwirt` HB2 und `versicherungen-finanzanlagen` KP2; das habe ich nicht in `content/` nachgeprüft.

**Betroffene Items:** Theorie, K-3.2-03, K-3.2-18, Q-3.2-02 (Erklärung), Q-3.2-05, Fachgespräch HB3 3.2 (Erwartung „Die Ausbilder-Eignungsverordnung (AEVO) regelt den Nachweis der fachlichen Eignung …“) und die Frage zur AEVO (ohne Erwartungen).

**Vorschlag Theorie** (ersetzt den Klammersatz im zweiten Absatz):
„… **Ausbilder:innen** (die Personen, die die Ausbildung tatsächlich durchführen und dafür nach §§ 28–30 BBiG persönlich und fachlich geeignet sein müssen). Die fachliche Eignung hat zwei Teile: die beruflichen Fertigkeiten, Kenntnisse und Fähigkeiten (in der Regel durch eine bestandene Abschlussprüfung in der entsprechenden Fachrichtung und angemessene Berufspraxis belegt, § 30 Abs. 2 BBiG) und die berufs- und arbeitspädagogischen Fertigkeiten, Kenntnisse und Fähigkeiten. Diese sind nach der **Ausbilder-Eignungsverordnung (AEVO)** in einer Prüfung mit schriftlichem und praktischem Teil nachzuweisen; sie umfasst die vier Handlungsfelder von der Planung bis zum Abschluss der Ausbildung. Unter bestimmten Voraussetzungen gelten andere Nachweise, etwa eine Meisterprüfung, oder die zuständige Stelle kann befreien (§ 6 AEVO). Im Tagesgeschäft unterstützen oft zusätzlich **Ausbildungsbeauftragte** …“ (Rest unverändert).

**Vorschlag K-3.2-03:**
Frage: „Wofür steht die Abkürzung AEVO, und was regelt sie?“
Antwort: „Ausbilder-Eignungsverordnung. Sie regelt den Nachweis der berufs- und arbeitspädagogischen Eignung von Ausbilder:innen (Prüfung mit schriftlichem und praktischem Teil). Die berufliche Eignung kommt als zweiter Teil der fachlichen Eignung hinzu (§ 30 BBiG).“

**Vorschlag Q-3.2-02, Erklärung:** „Die AEVO regelt den Nachweis der berufs- und arbeitspädagogischen Eignung von Ausbilder:innen.“

**Vorschlag Q-3.2-05, Zeile 2:** „Ausbilder:in ↔ Führt die Ausbildung durch (persönlich und fachlich geeignet, pädagogischer Nachweis nach AEVO)“.

**Vorschlag K-3.2-18, Antwort:** „Sie unterstützen im Tagesgeschäft der Fachabteilung bei der praktischen Anleitung unter der Verantwortung einer Ausbilder:in; sie benötigen dafür nur die erforderlichen beruflichen Fertigkeiten und persönliche Eignung, nicht die volle Ausbilder-Eignung (§ 28 Abs. 3 BBiG).“

**Vorschlag Fachgespräch-Erwartung (erste Frage, Zeile zur AEVO):**
„Erwartung: Die Ausbilder-Eignungsverordnung (AEVO) regelt den Nachweis der berufs- und arbeitspädagogischen Eignung von Ausbilder:innen, der in einer Prüfung mit schriftlichem und praktischem Teil erbracht wird.“

**Vorschlag für die Frage ohne Erwartungen** („Welche Kompetenzen sollte eine ausbildende Person nach der AEVO mitbringen?“): Frage umformulieren in „Welche berufs- und arbeitspädagogischen Kompetenzen muss eine Ausbilderin oder ein Ausbilder nach der AEVO nachweisen?“ („Ausbildende“ ist der Vertragspartner, nicht die Person, die ausbildet; „sollte“ ist zu schwach.) Erwartungen:
- „Die AEVO beschreibt die Kompetenz zum selbstständigen Planen, Durchführen und Kontrollieren der Berufsausbildung.“
- „Sie gliedert sich in vier Handlungsfelder: Ausbildungsvoraussetzungen prüfen und Ausbildung planen; Ausbildung vorbereiten und bei der Einstellung von Auszubildenden mitwirken; Ausbildung durchführen; Ausbildung abschließen.“
- „Nachgewiesen wird die Eignung in einer Prüfung mit schriftlichem und praktischem Teil.“
- Rückfrage: „Was gehört zur fachlichen Eignung außer den pädagogischen Kompetenzen?“ (Erwartung: berufliche Fertigkeiten, Kenntnisse und Fähigkeiten, § 30 Abs. 2 BBiG.)

### 1.4 Probezeit in der Ausbildung

**Fundstelle:** Fachgespräch HB3 3.2, Frage „Welche Aufgaben hat die ausbildende Person während der Probezeit einer oder eines Auszubildenden?“ (ohne Erwartungen). In Theorie, Karteikarten und Quiz kommt die Probezeit **nicht** vor; auch `fallaufgaben.md` HB3 (F-HB3-01) erwähnt sie nur in der Ausgangssituation.
**Urteil: nicht prüfbar** (keine Aussage in der Theorie, die ich prüfen könnte). **Schwere niedrig**; die Frage hängt in der Luft. Ergänzung empfohlen, weil das Thema prüfungsnah ist und der Normtext klar ist.

**Normtext:**
- [§ 20 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__20.html): Das Berufsausbildungsverhältnis beginnt mit der Probezeit; sie muss **mindestens einen Monat** und darf **höchstens vier Monate** betragen.
- [§ 22 Abs. 1, 3 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__22.html): In der Probezeit jederzeit **ohne Kündigungsfrist** kündbar; die Kündigung muss schriftlich sein, die elektronische Form ist ausgeschlossen; Gründe sind nur in den Fällen des Abs. 2 (nach der Probezeit) anzugeben.
- [§ 11 Abs. 1 Nr. 6 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__11.html): Die Dauer der Probezeit gehört in die Vertragsabfassung. [§ 14 Abs. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__14.html): Die Ausbildenden müssen planmäßig ausbilden (gilt auch in der Probezeit).
- Zur Abgrenzung: Im normalen Arbeitsverhältnis gilt § 622 Abs. 3 BGB (zwei Wochen, längstens sechs Monate), siehe 3.4.

**Vorschlag Theorie** (neuer Absatz am Ende von „Ausbildung vorbereiten“):
„Das Berufsausbildungsverhältnis beginnt mit der **Probezeit**; sie muss mindestens einen Monat und darf höchstens vier Monate dauern, und ihre Dauer ist im Ausbildungsvertrag anzugeben (§ 20, § 11 BBiG). In dieser Zeit prüfen beide Seiten, ob Beruf und Betrieb zueinander passen; die Ausbildenden müssen die Ausbildung dennoch von Anfang an planmäßig durchführen (§ 14 BBiG). Während der Probezeit kann das Ausbildungsverhältnis von beiden Seiten jederzeit ohne Kündigungsfrist gekündigt werden; die Kündigung bedarf der Schriftform, die elektronische Form ist ausgeschlossen (§ 22 Abs. 1 und 3 BBiG).“

**Neue Karten:**
- K-3.2-20 · Frage: „Wie lange muss und darf die Probezeit in der Berufsausbildung dauern?“ Antwort: „Mindestens einen Monat, höchstens vier Monate (§ 20 BBiG).“ `tags: bbig, probezeit` · `schwierigkeit: mittel` · `bloom: erinnern`
- K-3.2-21 · Frage: „Wie kann ein Berufsausbildungsverhältnis in der Probezeit gekündigt werden?“ Antwort: „Jederzeit ohne Kündigungsfrist, aber schriftlich; die elektronische Form ist ausgeschlossen (§ 22 BBiG).“ `tags: bbig, probezeit` · `schwierigkeit: mittel` · `bloom: erinnern`

**Neue Quizfrage Q-3.2-13 · Multiple Choice:** „Wie lange darf die Probezeit in einem Berufsausbildungsverhältnis höchstens dauern?“ – Zwei Monate / Drei Monate / [x] Vier Monate / Sechs Monate. Erklärung: „§ 20 BBiG: mindestens ein Monat, höchstens vier Monate. Die sechs Monate gehören zur Probezeit im normalen Arbeitsverhältnis (§ 622 Abs. 3 BGB).“ `schwierigkeit: mittel` · `bloom: erinnern`

**Vorschlag Fachgespräch-Erwartungen** zur Frage nach den Aufgaben in der Probezeit:
- „Die Probezeit beginnt mit dem Ausbildungsverhältnis, dauert mindestens einen und höchstens vier Monate und ist im Ausbildungsvertrag anzugeben (§ 20 BBiG).“
- „Beide Seiten prüfen, ob Beruf und Betrieb zueinander passen; die Ausbildenden führen die Ausbildung dennoch planmäßig nach dem betrieblichen Ausbildungsplan durch.“
- „Strukturierte Feedback-Gespräche und das Berichtsheft als Kontrollinstrument begleiten die Probezeit.“
- „Während der Probezeit kann ohne Frist gekündigt werden, schriftlich (§ 22 BBiG).“
- Rückfrage: „Wie lange darf die Probezeit höchstens dauern?“

---

## 2. Büro HB3 3.1 und Gesundheit HB5 5.1

Dateien: `content/fachwirt-buero-projektorganisation/hb3/3.1-personalwirtschaft.md`; `content/fachwirt-gesundheit-soziales/hb5/5.1-personalplanung-auswahl.md`.

### 2.1 AGG-Katalog „Rasse/ethnischer Herkunft“

**Fundstelle:** HB3 3.1: Theorie „Personalplanung“, Absatz „Rechtlich zu beachten …“; K-3.1-03. HB5 5.1: Theorie „Personalbeschaffung“, Absatz zum AGG; K-5.1-08 („Herkunft“); Q-5.1-02 (Erklärung „Herkunft“); Q-3.1-02 (Frage „… Alter, Geschlecht oder Herkunft“).
**Wortlaut:** „… nicht wegen **Rasse/ethnischer Herkunft**, Geschlecht, Religion/Weltanschauung, Behinderung, Alter oder sexueller Identität benachteiligen“.

**Normtext ([§ 1 AGG](https://www.gesetze-im-internet.de/agg/__1.html)):** Ziel ist, Benachteiligungen „aus Gründen der **Rasse** oder wegen der **ethnischen Herkunft**, des Geschlechts, der Religion oder Weltanschauung, einer Behinderung, des Alters oder der sexuellen Identität“ zu verhindern oder zu beseitigen. Auch [Art. 3 Abs. 3 GG](https://www.gesetze-im-internet.de/gg/art_3.html) enthält (in der gelesenen Fassung) noch das Wort „Rasse“.

**Urteil: ungenau (niedrig).** Das Wort „Rasse“ **steht im Gesetz**; es zu streichen wäre gegenüber dem Normtext falsch. Ungenau ist der Schrägstrich: Das Gesetz nennt „Rasse“ und „ethnische Herkunft“ als zwei Gründe. Außerdem sind „Herkunft“ allein (K-5.1-08, Q-5.1-02, Q-3.1-02) und „Herkunft“ im Sinn von sozialer Herkunft oder Staatsangehörigkeit nicht der Gesetzeswortlaut. Die Agenten-Meldung ist insofern nur teilweise berechtigt. (Ob der Gesetzgeber den Begriff ändern wird, ist offen und nicht geprüft.)

**Betroffene Items:** HB3 3.1 Theorie, K-3.1-03, Q-3.1-02 (Frage), Q-3.1-02-Erklärung ist richtig („ethnischer Herkunft“); HB5 5.1 Theorie, K-5.1-08, Q-5.1-02 (Erklärung). Fachgespräch: die Erwartungen nennen „ethnische Herkunft“ und sind richtig.

**Vorschlag HB3 3.1 Theorie:** „… Personalentscheidungen dürfen nicht aus Gründen der Rasse oder wegen der ethnischen Herkunft, des Geschlechts, der Religion oder Weltanschauung, einer Behinderung, des Alters oder der sexuellen Identität benachteiligen (§ 1 AGG).“
**K-3.1-03, Antwort:** „Es verbietet Benachteiligungen aus Gründen der Rasse oder wegen der ethnischen Herkunft, des Geschlechts, der Religion oder Weltanschauung, einer Behinderung, des Alters oder der sexuellen Identität — bei Stellenausschreibung, Auswahl und im laufenden Arbeitsverhältnis.“
**Q-3.1-02, Frage:** „Welches Gesetz schützt Bewerbende vor Diskriminierung wegen Alter, Geschlecht oder ethnischer Herkunft?“
**HB5 5.1 Theorie:** „… verbietet eine Benachteiligung aus Gründen der Rasse oder wegen der ethnischen Herkunft, des Geschlechts, der Religion oder Weltanschauung, einer Behinderung, des Alters oder der sexuellen Identität …“
**K-5.1-08, Antwort:** „… wegen Merkmalen wie Geschlecht, Alter, ethnischer Herkunft, Religion, Behinderung oder sexueller Identität …“; **Q-5.1-02, Erklärung:** „… wegen Alter, Geschlecht, ethnischer Herkunft, Religion, Behinderung oder sexueller Identität bereits bei der Ausschreibung (§ 11 AGG).“

### 2.2 Nachweisgesetz: „spätestens am ersten Arbeitstag“

**Fundstelle:**
- HB5 5.1: Theorie (letzter Absatz, „Arbeitsvertrag“), K-5.1-16, Q-5.1-07; K-5.1-09 nennt nur das Gesetz und ist unkritisch.
- Technischer Fachwirt WQ3 3.2: Theorie (erster Abschnitt, „Das Nachweisgesetz (NachwG) verpflichtet Vantera …“), K-3.2-02.
- HB3 3.1: Theorie (Absatz zum Arbeitsvertrag: „… nach dem Nachweisgesetz schriftlich mitzuteilen“, **ohne** Frist, also ungenau, nicht falsch); K-3.1-10, Q-3.1-10 und F-HB3-01 (Teilaufgabe 3 „Fristen“) sind unkritisch.
- Wirtschaftsfachwirt WBQ3 3.2 (K-3.2-02, Q-3.2-02): „innerhalb einer gesetzlich vorgegebenen Frist“, „nachträgliche schriftliche Niederlegung“: unkritisch.

**Wortlaut (HB5 5.1):** „Die wesentlichen Vertragsbedingungen (u. a. Beginn, Tätigkeit, Vergütung, Arbeitszeit, Kündigungsfristen) sind der ausgewählten Person nach dem Nachweisgesetz **spätestens am ersten Arbeitstag schriftlich** mitzuteilen.“ K-5.1-16: „Bis wann …? Spätestens am ersten Arbeitstag.“ Technischer: „… spätestens am ersten Arbeitstag schriftlich niederzulegen und … auszuhändigen.“

**Normtext ([§ 2 Abs. 1 NachwG](https://www.gesetze-im-internet.de/nachwg/__2.html)):**
- Der Arbeitgeber hat die wesentlichen Vertragsbedingungen „innerhalb der Fristen des Satzes 9“ schriftlich niederzulegen, **zu unterzeichnen** und auszuhändigen.
- Satz 9 staffelt: **spätestens am ersten Tag der Arbeitsleistung**: Name und Anschrift der Parteien (Nr. 1), Zusammensetzung und Höhe des Arbeitsentgelts (Nr. 7), vereinbarte Arbeitszeit (Nr. 8); **spätestens am siebten Kalendertag** nach dem vereinbarten Beginn: u. a. Beginn, Befristung, Arbeitsort, Tätigkeit, Probezeit (Nr. 2 bis 6, 9, 10); **spätestens einen Monat** nach dem vereinbarten Beginn: die übrigen Angaben (u. a. Dauer des Urlaubs, Fortbildung, Kündigungsverfahren und Kündigungsfristen, Hinweis auf Tarifverträge).
- Satz 2: Die Niederschrift kann in **Textform** abgefasst und elektronisch übermittelt werden, wenn sie für den Arbeitnehmer zugänglich ist, gespeichert und ausgedruckt werden kann und der Arbeitgeber zur Bestätigung des Empfangs auffordert. Satz 6: Das gilt nicht für Wirtschaftsbereiche nach § 2a SchwarzArbG. Satz 8: Der Nachweis in **elektronischer Form** (qualifizierte Signatur) ist ausgeschlossen.

**Urteil: falsch/veraltet (hoch).** Nur Name/Anschrift, Entgelt und Arbeitszeit sind am ersten Tag der Arbeitsleistung fällig; Beginn, Tätigkeit, Arbeitsort und Probezeit am siebten Kalendertag, Kündigungsfristen und Urlaub nach einem Monat. Gerade „Kündigungsfristen“ steht in der Theorie als Beispiel, das gerade **nicht** am ersten Tag fällig ist. Außerdem heißt es „Tag der Arbeitsleistung“, nicht „Arbeitstag“, und „schriftlich“ ist nicht mehr die einzige Form: Satz 2 lässt Textform zu. Seit wann Satz 2 gilt, ist im gelesenen Normtext nicht vermerkt (nach meinem Kenntnisstand Änderung durch das Bürokratieentlastungsgesetz IV zum 1.1.2025; das ist hier nicht belegt). Die Meldung der Agenten ist berechtigt. Hoch, weil K-5.1-16 und Q-5.1-07 die falsche Frist als Prüfungsfakt abfragen.

**Vorschlag HB5 5.1 Theorie** (ersetzt den Satz im Absatz „Am Ende des Auswahlverfahrens …“):
„Die wesentlichen Vertragsbedingungen sind der ausgewählten Person nach dem Nachweisgesetz in einer vom Arbeitgeber unterzeichneten Niederschrift auszuhändigen, und zwar gestaffelt: Name und Anschrift der Vertragsparteien, Zusammensetzung und Höhe des Arbeitsentgelts sowie die vereinbarte Arbeitszeit spätestens am ersten Tag der Arbeitsleistung; unter anderem Beginn, Arbeitsort, Tätigkeitsbeschreibung und Dauer einer vereinbarten Probezeit spätestens am siebten Kalendertag nach dem vereinbarten Beginn; die übrigen Angaben, etwa Urlaubsdauer und Kündigungsfristen, spätestens einen Monat nach dem vereinbarten Beginn (§ 2 NachwG). Die Niederschrift kann unter bestimmten Voraussetzungen in Textform elektronisch übermittelt werden (zugänglich, speicher- und ausdruckbar, mit Aufforderung zur Empfangsbestätigung); die elektronische Form mit qualifizierter Signatur ist ausgeschlossen.“

**K-5.1-16:**
Frage: „Bis wann müssen die wesentlichen Vertragsbedingungen nach dem Nachweisgesetz spätestens ausgehändigt werden?“
Antwort: „Gestaffelt: Entgelt, Arbeitszeit sowie Name und Anschrift der Parteien spätestens am ersten Tag der Arbeitsleistung; Beginn, Arbeitsort, Tätigkeit und Probezeit spätestens am siebten Kalendertag; die übrigen Angaben (z. B. Urlaub, Kündigungsfristen) spätestens einen Monat nach dem vereinbarten Beginn.“

**Q-5.1-07 · Lückentext:** „Das Arbeitsentgelt und die vereinbarte Arbeitszeit sind der ausgewählten Person nach dem Nachweisgesetz spätestens am ___ersten___ Tag der Arbeitsleistung auszuhändigen.“ Erklärung: „§ 2 Abs. 1 NachwG staffelt die Fristen: erster Tag der Arbeitsleistung, siebter Kalendertag, ein Monat nach dem vereinbarten Beginn.“

**Neue Quizfrage Q-5.1-15 · Zuordnung (optional):** Anweisung: „Ordne jeder Angabe die späteste Frist nach dem Nachweisgesetz zu.“ – Arbeitsentgelt ↔ Erster Tag der Arbeitsleistung; Arbeitsort ↔ Siebter Kalendertag nach Beginn; Urlaubsdauer ↔ Ein Monat nach Beginn. `schwierigkeit: schwer` · `bloom: anwenden`

**Technischer Fachwirt WQ3 3.2, Theorie** (ersetzt den Satz): „Das **Nachweisgesetz (NachwG)** verpflichtet Vantera, den wesentlichen Vertragsinhalt (u. a. Beginn, Arbeitsort, Tätigkeit, Vergütung, Arbeitszeit, Kündigungsfristen) in einer unterzeichneten Niederschrift auszuhändigen: Entgelt und Arbeitszeit spätestens am ersten Tag der Arbeitsleistung, Beginn, Arbeitsort und Tätigkeit spätestens am siebten Kalendertag, die übrigen Angaben wie die Kündigungsfristen spätestens einen Monat nach dem vereinbarten Beginn.“
**K-3.2-02:** Antwort: „Die wesentlichen Vertragsbedingungen in einer unterzeichneten Niederschrift auszuhändigen, gestaffelt: Entgelt und Arbeitszeit spätestens am ersten Tag der Arbeitsleistung, Beginn, Ort und Tätigkeit spätestens am siebten Kalendertag, die übrigen Angaben spätestens einen Monat nach dem vereinbarten Beginn.“

**HB3 3.1 Theorie** (Ergänzung des Satzes „… nach dem Nachweisgesetz schriftlich mitzuteilen sind“): „… nach dem Nachweisgesetz in einer unterzeichneten Niederschrift innerhalb gestaffelter Fristen auszuhändigen sind (je nach Angabe spätestens am ersten Tag der Arbeitsleistung, am siebten Kalendertag oder einen Monat nach dem vereinbarten Beginn).“ **F-HB3-01, Musterlösungshinweis** Teilaufgabe 3 („Pflichtangaben nach Nachweisgesetz und Fristen“) bleibt gültig; optional „gestaffelte Fristen (erster Tag der Arbeitsleistung, siebter Kalendertag, ein Monat)“ ergänzen.

**Fachgespräch:** Keine Erwartung nennt „ersten Arbeitstag“; nicht betroffen.

### 2.3 „Approbations-/Erlaubnisurkunden bei Pflegefachkräften“

**Fundstelle:** HB5 5.1, Theorie „Personalauswahl und Vorstellungsgespräch“, erster Absatz. Keine Karte, Quizfrage oder Erwartung nennt es.
**Wortlaut:** „… strukturierte Bewerbungsunterlagenprüfung (Anschreiben, Lebenslauf, Zeugnisse, ggf. Approbations-/Erlaubnisurkunden bei Pflegefachkräften)“.

**Normtext:** [§ 1 PflBG](https://www.gesetze-im-internet.de/pflbg/__1.html): Wer die Berufsbezeichnung „Pflegefachfrau“ oder „Pflegefachmann“ führen will, bedarf der **Erlaubnis**. [§ 2 PflBG](https://www.gesetze-im-internet.de/pflbg/__2.html): Die Erlaubnis zum Führen der Berufsbezeichnung ist auf Antrag zu erteilen, wenn die vorgeschriebene Ausbildung absolviert und die staatliche Abschlussprüfung bestanden ist und weitere Voraussetzungen (Zuverlässigkeit, gesundheitliche Eignung, Deutschkenntnisse) vorliegen.

**Urteil: falsch (niedrig).** Eine „Approbation“ gibt es für die akademischen Heilberufe (z. B. Ärzt:innen; das habe ich hier nicht gegen die Berufsgesetze geprüft), nicht für Pflegefachkräfte. Für sie sieht das Gesetz die Erlaubnis zum Führen der Berufsbezeichnung vor. „Erlaubnisurkunden“ im Sinne eines Papiers ist Verwaltungspraxis (das Gesetz sagt „Erlaubnis“). Die Meldung der Agenten ist berechtigt.

**Vorschlag Theorie:** „… (Anschreiben, Lebenslauf, Zeugnisse, bei Pflegefachkräften ggf. Berufsabschlusszeugnis und Nachweis der Erlaubnis zum Führen der Berufsbezeichnung nach § 1 PflBG)“.

---

## 3. Gesundheit HB5, Thema 5.5 Arbeitsrecht

Datei: `content/fachwirt-gesundheit-soziales/hb5/5.5-arbeitsrecht.md`, dazu `hb5/fachgespraech.md`.

### 3.1 Wiederholte Befristungen „dokumentiert“

**Fundstelle:** Theorie „Arbeitsvertrag: befristet und unbefristet“; K-5.5-01, K-5.5-02; Q-5.5-01, Q-5.5-13; Fachgespräch HB5 („Was ist bei einer Befristung mit Sachgrund … zu beachten?“).
**Wortlaut:** „Eine Befristung **mit Sachgrund** … ist demgegenüber auch für längere Zeiträume oder **wiederholt** möglich, sofern der Sachgrund tatsächlich vorliegt und **dokumentiert** ist.“

**Normtext:** [§ 14 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__14.html): Abs. 1: Befristung zulässig, wenn ein sachlicher Grund sie rechtfertigt (Katalog, u. a. vorübergehender Bedarf, Vertretung). Abs. 2: ohne Sachgrund kalendermäßig bis zwei Jahre, bis dahin höchstens dreimalige Verlängerung; nicht zulässig, wenn mit demselben Arbeitgeber „bereits zuvor ein befristetes oder unbefristetes Arbeitsverhältnis bestanden hat“ (Fußnote auf der Seite verweist auf die Entscheidung des Bundesverfassungsgerichts vom 6.6.2018). Abs. 4: „Die Befristung eines Arbeitsvertrages bedarf zu ihrer Wirksamkeit der **Schriftform**.“ [§ 16 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__16.html): Bei unwirksamer Befristung gilt der Vertrag als auf unbestimmte Zeit geschlossen.

**Urteil: ungenau (mittel).** Der Normtext verlangt keine „Dokumentation“ des Sachgrundes. Verlangt ist die **Schriftform der Befristungsabrede** (§ 14 Abs. 4); der Sachgrund muss bei Vertragsschluss objektiv vorliegen. „Wiederholt möglich“ stimmt für das Gesetz, lässt aber die gerichtliche Kontrolle von **Kettenbefristungen** aus (Prüfung auf Rechtsmissbrauch; Rechtsprechung von EuGH und BAG, **nicht am Normtext belegt**). Die Meldung der Agenten ist teilweise berechtigt.

**Betroffene Items:** Theorie; Fachgespräch (Erwartung „… kann auch für längere Zeiträume zulässig sein, sofern der Sachgrund tatsächlich vorliegt“ ist richtig). K-/Q-Items zu den zwei Jahren und drei Verlängerungen sind richtig.

**Vorschlag Theorie** (ersetzt den Satz ab „Eine Befristung mit Sachgrund …“):
„Eine Befristung **mit Sachgrund** (§ 14 Abs. 1 TzBfG, z. B. Vertretung oder vorübergehender betrieblicher Bedarf) ist demgegenüber auch über zwei Jahre hinaus und mehrfach möglich, sofern der Sachgrund bei Vertragsschluss tatsächlich vorliegt. Werden sehr viele befristete Verträge mit demselben Arbeitgeber aneinandergereiht (Kettenbefristung), prüfen die Gerichte zusätzlich, ob ein Rechtsmissbrauch vorliegt. Jede Befristung bedarf zu ihrer Wirksamkeit der Schriftform (§ 14 Abs. 4 TzBfG); bei einer unwirksamen Befristung gilt der Vertrag als unbefristet (§ 16 TzBfG).“

**Neue Karte K-5.5-19:** Frage: „Welche Form verlangt das TzBfG für die Befristung eines Arbeitsvertrags?“ Antwort: „Die Schriftform; ohne sie ist die Befristung unwirksam (§ 14 Abs. 4 TzBfG).“ `tags: tzbfg, recht` · `schwierigkeit: mittel` · `bloom: erinnern`
**Fachgespräch (Befristungsfrage), zusätzliche Erwartung:** „Die Befristung bedarf der Schriftform (§ 14 Abs. 4 TzBfG).“

### 3.2 Mitbestimmung: Arbeitgeber „nicht wirksam handeln“ (§ 87, § 99, § 102 BetrVG)

**Fundstelle:** Theorie „Betriebsverfassungsrecht (Grundzüge)“; Q-5.5-06; Q-5.5-02; K-5.5-17, K-5.5-18; Fachgespräch HB5 (Erwartung „Bei echten Mitbestimmungsrechten ist der Arbeitgeber auf die Zustimmung des Betriebsrats angewiesen, z. B. bei Einstellung und Versetzung (§ 99 BetrVG) oder bei Arbeitszeit und Dienstplangestaltung (§ 87 BetrVG)“).
**Wortlaut:** „… echte **Mitbestimmungsrechte**, bei denen der Arbeitgeber ohne Zustimmung des Betriebsrats **nicht wirksam handeln** kann — etwa bei bestimmten personellen Einzelmaßnahmen (§ 99 BetrVG, z. B. Einstellung, Versetzung) oder bei sozialen Angelegenheiten … (§ 87 BetrVG).“

**Normtext:**
- [§ 99 BetrVG](https://www.gesetze-im-internet.de/betrvg/__99.html): Der Arbeitgeber hat den Betriebsrat vor Einstellung, Eingruppierung, Umgruppierung und Versetzung zu unterrichten und die **Zustimmung einzuholen** (Abs. 1); Verweigerung nur aus den in Abs. 2 genannten Gründen, innerhalb einer Woche schriftlich, sonst gilt die Zustimmung als erteilt (Abs. 3); verweigert der Betriebsrat die Zustimmung, kann der Arbeitgeber beim Arbeitsgericht die **Ersetzung** beantragen (Abs. 4).
- [§ 101 BetrVG](https://www.gesetze-im-internet.de/betrvg/__101.html): Führt der Arbeitgeber die Maßnahme ohne Zustimmung durch, kann der Betriebsrat beim Arbeitsgericht beantragen, ihm aufzugeben, die Maßnahme **aufzuheben**; dann Zwangsgeld bis 250 € je Tag.
- [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html): Mitbestimmung in sozialen Angelegenheiten, soweit keine gesetzliche oder tarifliche Regelung besteht; Abs. 2: Kommt keine Einigung zustande, entscheidet die Einigungsstelle, deren Spruch die Einigung ersetzt. Nr. 2 deckt Beginn und Ende der täglichen Arbeitszeit einschließlich der Pausen sowie die Verteilung der Arbeitszeit auf die Wochentage (Dienstplan).
- [§ 102 Abs. 1 BetrVG](https://www.gesetze-im-internet.de/betrvg/__102.html): „Eine ohne Anhörung des Betriebsrats ausgesprochene Kündigung ist unwirksam.“ (ausdrücklich im Gesetz.)

**Urteil: falsch für § 99, ungenau für § 87, richtig für § 102 (mittel).**
- § 99: Das Gesetz kennt als Folge fehlender Zustimmung die **Aufhebung der Maßnahme** (§ 101), nicht ihre Unwirksamkeit. Nach ständiger Rechtsprechung bleibt etwa der Arbeitsvertrag einer ohne Zustimmung eingestellten Person wirksam (Rechtsprechung, nicht am Normtext belegt). „Nicht wirksam handeln“ trifft für die Einstellung also nicht zu.
- § 87: „Unwirksamkeit“ einseitiger Maßnahmen zum Nachteil des Arbeitnehmers ist die von der Rechtsprechung entwickelte „Theorie der Wirksamkeitsvoraussetzung“ (nicht im Gesetz, **nicht am Normtext belegt**). Im Gesetz steht: Der Betriebsrat „hat mitzubestimmen“, und die Einigungsstelle ersetzt die Einigung.
- § 102: Unwirksamkeit steht ausdrücklich im Gesetz.
Die Meldung der Agenten ist berechtigt.

**Vorschlag Theorie** (ersetzt den Satz ab „… sowie echte **Mitbestimmungsrechte** …“):
„… sowie echte **Mitbestimmungsrechte**, bei denen der Arbeitgeber die Maßnahme nicht gegen den Willen des Betriebsrats durchsetzen kann. Bei sozialen Angelegenheiten wie der Gestaltung der Arbeitszeit und der Dienstpläne (§ 87 BetrVG) entscheidet bei fehlender Einigung die Einigungsstelle, deren Spruch die Einigung ersetzt. Bei personellen Einzelmaßnahmen wie Einstellung oder Versetzung (§ 99 BetrVG) muss der Arbeitgeber den Betriebsrat unterrichten und seine Zustimmung einholen; verweigert der Betriebsrat sie aus einem der im Gesetz genannten Gründe, kann der Arbeitgeber beim Arbeitsgericht die Ersetzung der Zustimmung beantragen, und führt er die Maßnahme ohne Zustimmung durch, kann der Betriebsrat beim Arbeitsgericht deren Aufhebung verlangen (§ 101 BetrVG). Eine Kündigung ohne vorherige Anhörung des Betriebsrats ist dagegen ausdrücklich unwirksam (§ 102 Abs. 1 BetrVG). § 99 BetrVG gilt in Unternehmen mit in der Regel mehr als 20 wahlberechtigten Arbeitnehmern.“

**Q-5.5-06, Zeile 3:** „Mitbestimmungsrecht (§ 99 BetrVG) ↔ Zustimmung bei personellen Einzelmaßnahmen einholen (Ersetzung durch das Arbeitsgericht möglich)“. Zeile 4 bleibt („… Zustimmungspflicht bei sozialen Angelegenheiten wie der Arbeitszeit“ → besser: „… Einigung bzw. Spruch der Einigungsstelle bei sozialen Angelegenheiten wie der Arbeitszeit“).
**Fachgespräch-Erwartung** (ersetzt die Zeile mit „angewiesen“): „Bei echten Mitbestimmungsrechten kann der Arbeitgeber die Maßnahme nicht gegen den Willen des Betriebsrats durchsetzen: Bei Einstellung und Versetzung (§ 99 BetrVG) muss er die Zustimmung einholen und bei Verweigerung die Ersetzung beim Arbeitsgericht beantragen; bei Arbeitszeit und Dienstplangestaltung (§ 87 BetrVG) entscheidet bei Uneinigkeit die Einigungsstelle.“

### 3.3 Allgemeiner Kündigungsschutz: „mehr als zehn Beschäftigten“

**Fundstelle:** HB5 5.5 Theorie „Kündigung und Kündigungsschutz“; K-5.5-10; Fachgespräch HB5 (zwei Erwartungen „… mehr als zehn Beschäftigten“). Ebenso Technischer Fachwirt WQ3 3.2: Theorie „Betriebe mit in der Regel mehr als zehn Beschäftigten“, K-3.2-06, Fachgespräch (Erwartung „… mehr als zehn Beschäftigten, was bei Vantera … erfüllt ist“). (Industriefachwirt und Wirtschaftsfachwirt sagen „Arbeitnehmenden/Arbeitnehmern“ und sind genauer.)

**Normtext:** [§ 23 Abs. 1 KSchG](https://www.gesetze-im-internet.de/kschg/__23.html): Der Erste Abschnitt (mit der Sozialwidrigkeit der Kündigung) gilt nicht für Betriebe, in denen in der Regel zehn oder weniger Arbeitnehmer **„ausschließlich der zu ihrer Berufsbildung Beschäftigten“** beschäftigt werden (Kleinbetrieb); Teilzeitkräfte zählen mit 0,5 (bis 20 Stunden) und 0,75 (bis 30 Stunden); für vor dem 1.1.2004 begonnene Arbeitsverhältnisse gilt die Schwelle „mehr als fünf“. [§ 1 Abs. 1 KSchG](https://www.gesetze-im-internet.de/kschg/__1.html): Wartezeit „in demselben Betrieb **oder Unternehmen** ohne Unterbrechung länger als sechs Monate“.

**Urteil: ungenau (niedrig).** Die Zahl stimmt. Ungenau ist „Beschäftigte“ (Auszubildende zählen nicht mit, Teilzeitkräfte anteilig) und „im selben Betrieb“ (Betrieb **oder Unternehmen**). Die Altbestandsregel ist für die Prüfung vernachlässigbar, gehört aber in die Befundnotiz.

**Vorschlag HB5 5.5 Theorie:** „In Betrieben mit in der Regel mehr als zehn Arbeitnehmern (ohne die zu ihrer Berufsbildung Beschäftigten; Teilzeitkräfte zählen je nach Wochenarbeitszeit anteilig, § 23 KSchG) und nach mehr als sechsmonatigem Bestehen des Arbeitsverhältnisses in demselben Betrieb oder Unternehmen (§ 1 Abs. 1 KSchG) greift der **allgemeine Kündigungsschutz** …“ Entsprechend in der Probezeit-Passage („… mehr als sechs Monaten im selben Betrieb oder Unternehmen“).
**K-5.5-10, Antwort:** „In Betrieben mit in der Regel mehr als zehn Arbeitnehmenden (Auszubildende zählen nicht mit, Teilzeitkräfte anteilig) und nach mehr als sechsmonatigem Bestehen des Arbeitsverhältnisses.“
**Technischer WQ3 3.2:** „Beschäftigten“ → „Arbeitnehmenden (ohne Auszubildende)“ in Theorie, K-3.2-06 und Fachgespräch-Erwartung.
**Fachgespräch HB5:** „Betrieben mit in der Regel mehr als zehn Arbeitnehmenden (ohne Auszubildende)“.

### 3.4 Probezeit: „darf höchstens sechs Monate betragen“

**Fundstelle:** HB5 5.5 Theorie „Probezeit“; K-5.5-03, K-5.5-04; Q-5.5-03, Q-5.5-07; Fachgespräch HB5 („Welche Kündigungsfrist gilt üblicherweise während der Probezeit …“, Erwartung „Die Probezeit darf höchstens sechs Monate betragen“).
**Wortlaut:** „Sie darf höchstens sechs Monate betragen; während der Probezeit gilt eine verkürzte gesetzliche Kündigungsfrist von zwei Wochen, sofern nichts anderes vereinbart ist.“ K-5.5-03: „Höchstens sechs Monate.“

**Normtext:**
- [§ 622 Abs. 3 BGB](https://www.gesetze-im-internet.de/bgb/__622.html): „Während einer vereinbarten Probezeit, **längstens für die Dauer von sechs Monaten**, kann das Arbeitsverhältnis mit einer Frist von zwei Wochen gekündigt werden.“ Abs. 4: Abweichungen durch Tarifvertrag; Abs. 5 erlaubt einzelvertraglich nur unter engen Voraussetzungen kürzere Fristen als vier Wochen (Abs. 1), nicht für die Probezeit-Frist.
- [§ 15 Abs. 3 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__15.html): Bei befristeten Arbeitsverhältnissen muss die Probezeit „im Verhältnis zu der erwarteten Dauer der Befristung und der Art der Tätigkeit stehen“.
- [§ 2 Abs. 1 Satz 7 Nr. 6 NachwG](https://www.gesetze-im-internet.de/nachwg/__2.html): Die Dauer einer vereinbarten Probezeit ist nachzuweisen.

**Urteil: ungenau (mittel).** Die Sechs-Monats-Grenze steht in § 622 Abs. 3 BGB als Grenze für die **Zwei-Wochen-Frist** („längstens für die Dauer von sechs Monaten“). Ein ausdrückliches Verbot einer längeren Probezeit enthält die gelesene Norm nicht; ob und wie eine längere Vereinbarung wirkt, ist Rechtsprechung (**nicht geprüft**). „Darf höchstens sechs Monate betragen“ behauptet ein Verbot, das der Normtext so nicht ausspricht. Die zweite Satzhälfte (zwei Wochen) ist richtig; „sofern nichts anderes vereinbart ist“ ist verkürzt, weil abweichende Regelungen im Kern nur durch Tarifvertrag möglich sind (§ 622 Abs. 4).

**Vorschlag Theorie:** „Zu Beginn eines Arbeitsverhältnisses wird häufig eine **Probezeit** vereinbart, in der beide Seiten die Zusammenarbeit erproben können. Während einer vereinbarten Probezeit kann das Arbeitsverhältnis — längstens für die ersten sechs Monate — mit einer Frist von zwei Wochen gekündigt werden (§ 622 Abs. 3 BGB); ein Tarifvertrag kann davon abweichen. Bei befristeten Arbeitsverhältnissen muss die Probezeit im Verhältnis zur erwarteten Dauer der Befristung und zur Art der Tätigkeit stehen (§ 15 Abs. 3 TzBfG). Der allgemeine Kündigungsschutz nach dem Kündigungsschutzgesetz greift erst nach einer ununterbrochenen Beschäftigungsdauer von mehr als sechs Monaten.“
**K-5.5-03:** Frage: „Bis zu welcher Dauer gilt die verkürzte Kündigungsfrist von zwei Wochen in der Probezeit?“ Antwort: „Längstens für die ersten sechs Monate einer vereinbarten Probezeit (§ 622 Abs. 3 BGB).“
**K-5.5-04, Antwort:** „Zwei Wochen, wenn eine Probezeit vereinbart ist (längstens für sechs Monate); ein Tarifvertrag kann Abweichendes regeln.“
**Fachgespräch-Erwartung** (ersetzt „Die Probezeit darf höchstens sechs Monate betragen“): „Die verkürzte Kündigungsfrist von zwei Wochen gilt höchstens für die ersten sechs Monate einer vereinbarten Probezeit (§ 622 Abs. 3 BGB).“
Q-5.5-03 („in der Regel zwei Wochen“) und Q-5.5-07 sind unkritisch.

### 3.5 Schwangerschaft: „regelmäßig vorab die Zustimmung einer zuständigen Behörde“

**Fundstelle:** Theorie „Kündigung und Kündigungsschutz“, vorletzter Satz; K-5.5-12; Q-5.5-12; Fachgespräch HB5 (Erwartung „Schwangere Mitarbeiterinnen genießen besonderen Kündigungsschutz, wofür regelmäßig vorab die Zustimmung einer zuständigen Behörde erforderlich ist“).
**Wortlaut:** „Besonderen Kündigungsschutz genießen unter anderem schwangere Mitarbeiterinnen (Mutterschutz), Mitarbeitende in Elternzeit sowie schwerbehinderte Menschen — hier ist regelmäßig vorab die Zustimmung einer zuständigen Behörde erforderlich.“

**Normtext:**
- [§ 17 MuSchG](https://www.gesetze-im-internet.de/muschg_2018/__17.html): Abs. 1: Die Kündigung gegenüber einer Frau ist **unzulässig** während der Schwangerschaft, bis zum Ablauf von vier Monaten nach einer Fehlgeburt nach der zwölften Woche und bis zum Ende der Schutzfrist nach der Entbindung, mindestens bis vier Monate nach der Entbindung, wenn dem Arbeitgeber die Schwangerschaft bekannt ist oder ihm innerhalb von zwei Wochen nach Zugang der Kündigung mitgeteilt wird. Abs. 2: Die oberste Landesbehörde kann „in besonderen Fällen … ausnahmsweise“ die Kündigung für zulässig erklären.
- [§ 18 BEEG](https://www.gesetze-im-internet.de/beeg/__18.html): Kündigungsverbot ab dem Verlangen von Elternzeit (frühestens acht bzw. 14 Wochen vor Beginn) und während der Elternzeit; „in besonderen Fällen“ ausnahmsweise Zulässigerklärung durch die Landesbehörde.
- [§ 168 SGB IX](https://www.gesetze-im-internet.de/sgb_9_2018/__168.html): Kündigung eines schwerbehinderten Menschen bedarf der vorherigen Zustimmung des Integrationsamts; [§ 173 Abs. 1 Nr. 1](https://www.gesetze-im-internet.de/sgb_9_2018/__173.html): gilt nicht bei einem Arbeitsverhältnis, das ohne Unterbrechung noch nicht länger als sechs Monate besteht.

**Urteil: ungenau (mittel).** Bei Schwangerschaft und Elternzeit besteht ein **Kündigungsverbot**; die Behördenentscheidung ist die seltene Ausnahme („in besonderen Fällen … ausnahmsweise“). „Regelmäßig vorab die Zustimmung“ beschreibt die Zustimmung des Integrationsamts bei Schwerbehinderung, nicht den Regelfall bei Schwangeren. Die Zwei-Wochen-Mitteilungsfrist (§ 17 Abs. 1) fehlt ebenfalls (für die Prüfung eher Zusatzwissen). Die Meldung der Agenten (Kündigungsschutz/MuSchG) ist berechtigt.

**Vorschlag Theorie** (ersetzt den Satz): „Besonderen Kündigungsschutz genießen unter anderem schwangere Mitarbeiterinnen (Kündigungsverbot während der Schwangerschaft und bis mindestens vier Monate nach der Entbindung, § 17 MuSchG), Mitarbeitende in Elternzeit (Kündigungsverbot, § 18 BEEG) sowie schwerbehinderte Menschen (vorherige Zustimmung des Integrationsamts, § 168 SGB IX). Bei Schwangerschaft und Elternzeit kann die zuständige Landesbehörde eine Kündigung nur in besonderen Fällen ausnahmsweise für zulässig erklären.“
**K-5.5-12, Antwort:** „Z. B. schwangere Mitarbeiterinnen (Kündigungsverbot) und schwerbehinderte Menschen (Zustimmung des Integrationsamts); auch Mitarbeitende in Elternzeit (Kündigungsverbot).“
**Fachgespräch-Erwartung:** „Schwangere Mitarbeiterinnen genießen besonderen Kündigungsschutz: Die Kündigung ist grundsätzlich unzulässig und kann nur in besonderen Fällen ausnahmsweise von der zuständigen Landesbehörde für zulässig erklärt werden (§ 17 MuSchG).“
Q-5.5-12 ist richtig (Probezeit-Mitarbeitende als Gruppe haben keinen besonderen Kündigungsschutz); nur die Erklärung „die anderen drei Gruppen sind gesetzlich besonders geschützt“ bleibt zulässig.

### 3.6 Ruhezeit-Ausnahmen im Pflegebereich „für Wechselschichtdienste“

**Fundstelle:** Theorie „Arbeitszeit und Urlaub“, zweiter Satz; K-5.5-07 und Q-5.5-09 (Elf-Stunden-Ruhezeit) sind richtig.
**Wortlaut:** „… im Pflegebereich gelten hierzu punktuelle tarifliche bzw. gesetzliche Ausnahmen für **Wechselschichtdienste**, die jedoch besonderer Regelungen bedürfen.“

**Normtext:** [§ 5 Abs. 2 ArbZG](https://www.gesetze-im-internet.de/arbzg/__5.html): In „Krankenhäusern und anderen Einrichtungen zur Behandlung, Pflege und Betreuung von Personen“ kann die Ruhezeit um bis zu **eine Stunde** verkürzt werden, wenn jede Verkürzung innerhalb eines Kalendermonats oder von vier Wochen durch Verlängerung einer anderen Ruhezeit auf mindestens zwölf Stunden ausgeglichen wird. Abs. 3: bei Inanspruchnahme in der Rufbereitschaft Ausgleich zu anderen Zeiten. [§ 7 ArbZG](https://www.gesetze-im-internet.de/arbzg/__7.html): weitere Abweichungen durch Tarifvertrag oder auf Grund eines Tarifvertrags (Abs. 1 Nr. 3: bis zu zwei Stunden; Abs. 2 Nr. 3: Anpassung bei Behandlung, Pflege und Betreuung). Auch [§ 3 ArbZG](https://www.gesetze-im-internet.de/arbzg/__3.html): Verlängerung auf bis zu zehn Stunden bei Durchschnitt von acht Stunden innerhalb von sechs Kalendermonaten **oder 24 Wochen**.

**Urteil: ungenau (niedrig).** Das gesetzliche Kriterium ist die **Einrichtungsart** (Krankenhaus, Pflege- und Betreuungseinrichtung), nicht „Wechselschichtdienst“. Die Eins-Stunden-Grenze und der Ausgleich fehlen. „Besonderer Regelungen bedürfen“ ist zu vage.

**Vorschlag Theorie** (ersetzt den Satzteil ab „— im Pflegebereich …“): „… mindestens elf Stunden einzuhalten. In Krankenhäusern und anderen Einrichtungen zur Behandlung, Pflege und Betreuung von Personen kann die Ruhezeit um bis zu eine Stunde verkürzt werden, wenn jede Verkürzung innerhalb eines Kalendermonats oder von vier Wochen durch eine andere Ruhezeit von mindestens zwölf Stunden ausgeglichen wird (§ 5 Abs. 2 ArbZG); weitergehende Abweichungen sind nur durch Tarifvertrag oder auf Grund eines Tarifvertrags möglich (§ 7 ArbZG).“ In der Zeile zur Verlängerung auf zehn Stunden bei Bedarf ergänzen: „innerhalb von sechs Kalendermonaten oder 24 Wochen“ (K-5.5-06 entsprechend).

---

## 4. Gesundheit HB5, Thema 5.2 Ausbildung

Datei: `content/fachwirt-gesundheit-soziales/hb5/5.2-ausbildung.md`, dazu `hb5/fachgespraech.md`.

### 4.1 Praxisanleitung „nach AEVO“

**Fundstelle:** Theorie „Rechtlicher Rahmen und Abschluss der Ausbildung“; K-5.2-09; Q-5.2-04; Q-5.2-05 (Zeile „AEVO ↔ Regelt berufs- und arbeitspädagogische Kompetenzen von Ausbildenden“); Fachgespräch HB5 („Welche Kompetenzen sollte eine Praxisanleitung nach der AEVO mitbringen?“ mit Erwartung „Die Ausbilder-Eignungsverordnung (AEVO) beschreibt berufs- und arbeitspädagogische Kompetenzen von Ausbildenden“).
**Wortlaut:** „Rechtliche Grundlage der Pflegeausbildung ist das Pflegeberufegesetz mit der zugehörigen Ausbildungs- und Prüfungsverordnung; für sonstige Ausbildungsberufe … gilt das Berufsbildungsgesetz (BBiG). Wer selbst ausbildet, sollte über die in der **Ausbilder-Eignungsverordnung (AEVO)** beschriebenen berufs- und arbeitspädagogischen Kompetenzen verfügen …“

**Normtext:**
- [§ 1 AEVO](https://www.gesetze-im-internet.de/ausbeignv_2009/__1.html): gilt für die Ausbildung in anerkannten Ausbildungsberufen **nach dem BBiG**.
- [§ 4 PflAPrV](https://www.gesetze-im-internet.de/pflaprv/__4.html): Die Einrichtungen der praktischen Ausbildung stellen die Praxisanleitung sicher (Abs. 1; mindestens **10 Prozent** der während eines Einsatzes zu leistenden praktischen Ausbildungszeit, geplant und strukturiert). Praxisanleitung während Orientierungs-, Pflicht- und Vertiefungseinsatz durch Personen mit **mindestens einem Jahr Berufserfahrung** als Inhaber:in einer Erlaubnis nach dem PflBG in den letzten fünf Jahren **und der Befähigung zur Praxisanleitung** (Abs. 2). Die Befähigung ist durch eine **berufspädagogische Zusatzqualifikation im Umfang von mindestens 300 Stunden** und **kontinuierliche, insbesondere berufspädagogische Fortbildung im Umfang von mindestens 24 Stunden jährlich** gegenüber der zuständigen Behörde nachzuweisen (Abs. 3).
- [§ 6 Abs. 3 PflBG](https://www.gesetze-im-internet.de/pflbg/__6.html): Praxisanleitung im Umfang von mindestens 10 Prozent der Einsatzzeit als wesentlicher Bestandteil der praktischen Ausbildung; Pflegeschule leistet die Praxisbegleitung.

**Urteil: falsch (mittel).** Die Praxisanleitung in der Pflegeausbildung richtet sich nach **§ 4 PflAPrV** (300 Stunden Zusatzqualifikation, 24 Stunden jährliche Fortbildung, Berufserfahrung), nicht nach der AEVO, die nur die Ausbildung in BBiG-Berufen betrifft. Der Satz „Wer selbst ausbildet, sollte … AEVO“ steht zwischen dem PflBG- und dem BBiG-Satz und ist als Aussage über die Pflegeausbildung falsch; für BBiG-Berufe ist der Nachweis außerdem Pflicht (§ 30 BBiG, § 1 AEVO), nicht bloß ein „sollte“. Die Fachgespräch-Frage übernimmt den Fehler in der Frage selbst. Die Meldung der Agenten ist berechtigt. K-5.2-09 und Q-5.2-04 sind als AEVO-Definition für sich richtig, stehen aber ohne den Pflege-Bezug im falschen Kontext.

**Betroffene Items:** Theorie, K-5.2-09, Q-5.2-05 (Zeile AEVO), Fachgespräch (Frage und Erwartung), K-5.2-13 (Aufgabe der Praxisanleitung; vgl. § 4 Abs. 1 PflAPrV: schrittweise Heranführen an die beruflichen Aufgaben, Ausbildungsnachweis, Verbindung zur Pflegeschule; die „Prüfungsvorbereitung“ steht dort nicht, das ist unkritisch).

**Vorschlag Theorie** (ersetzt den Satz ab „Wer selbst ausbildet …“):
„Wer in der **Pflegeausbildung** die Praxisanleitung übernimmt, braucht nach der Pflegeberufe-Ausbildungs- und -Prüfungsverordnung (§ 4 PflAPrV) mindestens ein Jahr Berufserfahrung als Pflegefachkraft in den letzten fünf Jahren, eine berufspädagogische Zusatzqualifikation im Umfang von mindestens 300 Stunden und jährlich mindestens 24 Stunden berufspädagogische Fortbildung. Die Einrichtungen müssen eine geplante und strukturierte Praxisanleitung im Umfang von mindestens 10 Prozent der Einsatzzeit sicherstellen (§ 6 Abs. 3 PflBG). Wer dagegen in einem nach dem Berufsbildungsgesetz geregelten Beruf ausbildet (z. B. kaufmännische Ausbildung in der Verwaltung), muss seine berufs- und arbeitspädagogische Eignung nach der **Ausbilder-Eignungsverordnung (AEVO)** nachweisen, in der Regel durch die Ausbilder-Eignungsprüfung. Die AEVO gilt nicht für die Pflegeausbildung.“

**Karteikarten:**
- K-5.2-09: Frage: „Was regelt die Ausbilder-Eignungsverordnung (AEVO), und für welche Ausbildungen gilt sie?“ Antwort: „Sie regelt den Nachweis der berufs- und arbeitspädagogischen Eignung von Ausbilder:innen in anerkannten Ausbildungsberufen nach dem Berufsbildungsgesetz. Für die Praxisanleitung in der Pflegeausbildung gilt stattdessen § 4 PflAPrV.“
- Neu K-5.2-17: Frage: „Welche Qualifikation brauchen Praxisanleiter:innen in der Pflegeausbildung?“ Antwort: „Mindestens ein Jahr Berufserfahrung als Pflegefachkraft in den letzten fünf Jahren, eine berufspädagogische Zusatzqualifikation von mindestens 300 Stunden und jährlich mindestens 24 Stunden Fortbildung (§ 4 PflAPrV).“ `tags: pflaprv, praxisanleitung` · `schwierigkeit: schwer` · `bloom: erinnern`
- Neu K-5.2-18: Frage: „Wie viel Praxisanleitung muss während eines Einsatzes in der Pflegeausbildung mindestens stattfinden?“ Antwort: „Mindestens 10 % der während des Einsatzes zu leistenden praktischen Ausbildungszeit, geplant und strukturiert (§ 6 Abs. 3 PflBG, § 4 PflAPrV).“ `tags: pflbg, praxisanleitung` · `schwierigkeit: mittel` · `bloom: erinnern`

**Quiz:** Q-5.2-05, Zeile 3: „AEVO ↔ Regelt die berufs- und arbeitspädagogische Eignung von Ausbilder:innen in BBiG-Berufen“. Neu Q-5.2-14 · Multiple Choice: „Welche Vorschrift regelt die Qualifikation von Praxisanleiter:innen in der Pflegeausbildung?“ – [x] § 4 PflAPrV / AEVO / § 28 BBiG / § 98 BetrVG. Erklärung: „Die AEVO gilt für anerkannte Ausbildungsberufe nach dem BBiG, nicht für die Pflegeausbildung nach dem PflBG.“ `schwierigkeit: mittel` · `bloom: verstehen`

**Fachgespräch HB5 5.2, Frage ersetzen:** „Welche Qualifikation muss eine Praxisanleitung in der Pflegeausbildung nachweisen, und worin unterscheidet sie sich von der Eignung nach der AEVO?“ Erwartungen:
- „Die Praxisanleitung wird von Personen mit mindestens einem Jahr Berufserfahrung als Pflegefachkraft in den letzten fünf Jahren übernommen (§ 4 PflAPrV).“
- „Die Befähigung wird durch eine berufspädagogische Zusatzqualifikation von mindestens 300 Stunden und mindestens 24 Stunden Fortbildung jährlich nachgewiesen.“
- „Die AEVO gilt für anerkannte Ausbildungsberufe nach dem BBiG, nicht für die Pflegeausbildung.“
- „Die Praxisanleitung umfasst mindestens 10 Prozent der Einsatzzeit, geplant und strukturiert, und führt schrittweise an die Aufgaben der Pflegefachfrau oder des Pflegefachmanns heran.“
- Rückfrage: „Wer unterstützt die Praxisanleitung von schulischer Seite?“ (Erwartung: die Pflegeschule mit der Praxisbegleitung, § 6 Abs. 3 PflBG.)

---

## 5. Industriefachwirt, Technischer Fachwirt, Wirtschaftsfachwirt (Arbeitsrecht)

Dateien: `industriefachwirt/wq3/3.2-arbeitsrecht-grundlagen.md`, `technischer-fachwirt/wq3/3.2-arbeitsrecht-grundlagen.md`, `wirtschaftsfachwirt/wbq3/3.2-arbeitsrecht-grundlagen.md`, jeweils mit `fachgespraech.md` und `fallaufgaben.md`; `technischer-fachwirt/hq4/11.3-konfliktmanagement.md` (und gleichlautend `industriefachwirt/hq5/9.3-konfliktmanagement.md`).

### 5.1 „Integrationsamt“ (heute „Inklusionsamt“?)

**Fundstelle (Industriefachwirt WQ3 3.2):** Theorie „Kündigungsschutz“ („SGB IX, Zustimmung des Integrationsamts erforderlich“); K-3.2-11; Q-3.2-06 (Kurzantwort, akzeptierte Antwort „Integrationsamt“); Fachgespräch („… die Zustimmung des Integrationsamts erforderlich“); F-WQ3-02 (Musterlösungshinweis zu Teilaufgabe 3). Technischer Fachwirt und Wirtschaftsfachwirt nennen das Amt nicht.

**Normtext:** [§ 168 SGB IX](https://www.gesetze-im-internet.de/sgb_9_2018/__168.html): „Die Kündigung des Arbeitsverhältnisses eines schwerbehinderten Menschen durch den Arbeitgeber bedarf der vorherigen Zustimmung des **Integrationsamtes**.“ Ebenso [§§ 170, 173, 184, 185](https://www.gesetze-im-internet.de/sgb_9_2018/__185.html) SGB IX (dort: „Amt für die Sicherung der Integration schwerbehinderter Menschen im Arbeitsleben (Integrationsamt)“). Das gesamte gelesene Bundesrecht verwendet „Integrationsamt“.
Sekundärquelle (nur Suchtreffer, Dokument nicht selbst geöffnet): Nach einer BIH-Publikation (Ausgabe 2025) haben mehrere Länder (u. a. Bayern, Berlin, Bremen, Mecklenburg-Vorpommern, Nordrhein-Westfalen, Thüringen, Saarland) ihre Ämter in „Inklusionsamt“ umbenannt; die Aufgaben sind dieselben.

**Urteil: richtig (niedrig).** Die Meldung der Agenten ist **nicht bestätigt**: Im Bundesgesetz heißt die Stelle weiterhin „Integrationsamt“. Die Umbenennung betrifft die Landesbehörden. Lernende können in der Praxis dem Namen „Inklusionsamt“ begegnen, deshalb ist ein Hinweis sinnvoll.

**Vorschlag (optional, kleine Änderung):**
- Theorie: „… schwerbehinderte Menschen (SGB IX, vorherige Zustimmung des Integrationsamts nach § 168 SGB IX; in mehreren Bundesländern heißt die Behörde inzwischen „Inklusionsamt“) …“
- Q-3.2-06, Akzeptierte Antworten: „Integrationsamt; Inklusionsamt“. Erklärung: „§ 168 SGB IX verlangt die vorherige Zustimmung des Integrationsamts (in mehreren Ländern: Inklusionsamt) als besonderen Kündigungsschutz.“
- K-3.2-11, Antwort: „Die Zustimmung des Integrationsamts (in mehreren Ländern: Inklusionsamt) nach § 168 SGB IX.“
- Optional ergänzen, weil im Normtext belegt: Das gilt nicht in den ersten sechs Monaten des Arbeitsverhältnisses (§ 173 Abs. 1 Nr. 1 SGB IX).

### 5.2 Leiharbeit: 18 Monate und Equal Pay „spätestens nach neun Monaten“

**Fundstelle (nur Technischer Fachwirt WQ3 3.2):** Theorie „Arbeitszeit, Arbeitsschutz und flexible Beschäftigungsformen in der Fertigung“ (zweiter Absatz); K-3.2-17 (richtig), K-3.2-18; Q-3.2-08; Fachgespräch (Leiharbeitsfrage mit Rückfrage zur Überlassungsdauer, **ohne** Erwartung zu 18/9 Monaten). Industriefachwirt und Wirtschaftsfachwirt behandeln die Leiharbeit nicht.
**Wortlaut:** „… nach spätestens 18 Monaten Überlassungsdauer an denselben Entleiher greifen gesetzliche **Übernahme- bzw. Gleichstellungsregelungen** (Equal-Pay-Grundsatz spätestens nach neun Monaten, sofern kein abweichender Tarifvertrag gilt).“ K-3.2-18: „Ab wann greift bei Leiharbeit grundsätzlich der Equal-Pay-Grundsatz, sofern kein abweichender Tarifvertrag gilt? – Spätestens nach neun Monaten Überlassungsdauer beim selben Entleiher.“ Q-3.2-08: richtig markiert „Nach spätestens 18 Monaten greifen gesetzliche Übernahme- bzw. Gleichstellungsregelungen“; falsch markiert „Equal Pay gilt ab dem ersten Tag der Überlassung ausnahmslos“; Erklärung: „Equal Pay greift regelmäßig erst nach neun Monaten, sofern kein abweichender Tarifvertrag gilt — nicht ab dem ersten Tag.“

**Normtext:**
- [§ 8 Abs. 1 AÜG](https://www.gesetze-im-internet.de/a_g/__8.html) (Gleichstellungsgrundsatz): Der Verleiher muss dem Leiharbeitnehmer **für die Zeit der Überlassung** die im Entleiherbetrieb für vergleichbare Arbeitnehmer geltenden wesentlichen Arbeitsbedingungen **einschließlich des Arbeitsentgelts** gewähren. Das gilt also ab dem ersten Tag.
- § 8 Abs. 2: Ein Tarifvertrag kann abweichen (nicht unter die Mindeststundenentgelte). Abs. 4: Ein solcher Tarifvertrag kann beim Arbeitsentgelt **für die ersten neun Monate** der Überlassung abweichen; eine **längere** Abweichung ist nur zulässig, wenn nach spätestens **15 Monaten** ein tariflich als gleichwertig festgelegtes Entgelt erreicht wird und nach höchstens sechs Wochen Einarbeitung stufenweise herangeführt wird. Abs. 3: Die tarifliche Abweichung gilt nicht für Personen, die in den letzten sechs Monaten aus einem Arbeitsverhältnis beim Entleiher oder einem Konzernunternehmen ausgeschieden sind.
- [§ 1 Abs. 1b AÜG](https://www.gesetze-im-internet.de/a_g/__1.html): Derselbe Leiharbeitnehmer darf demselben Entleiher **nicht länger als 18 aufeinander folgende Monate** überlassen werden (frühere Einsätze zählen mit, wenn zwischen ihnen nicht mehr als drei Monate liegen); ein Tarifvertrag der Einsatzbranche kann eine andere Höchstdauer festlegen (für nicht tarifgebundene Entleiher bis zu 24 Monate über Betriebs- oder Dienstvereinbarung).
- [§ 9 Abs. 1 Nr. 1b AÜG](https://www.gesetze-im-internet.de/a_g/__9.html): Mit Überschreiten der zulässigen Überlassungshöchstdauer wird der **Arbeitsvertrag zwischen Verleiher und Leiharbeitnehmer unwirksam**, es sei denn, der Leiharbeitnehmer erklärt schriftlich binnen eines Monats, am Vertrag festzuhalten (Festhaltenserklärung, Abs. 2: vorherige Vorlage in der Agentur für Arbeit). [§ 10 Abs. 1 AÜG](https://www.gesetze-im-internet.de/a_g/__10.html): Dann gilt ein **Arbeitsverhältnis zum Entleiher** als zustande gekommen.

**Urteil: falsch (hoch).**
(a) Nach 18 Monaten greifen **keine „Übernahme- oder Gleichstellungsregelungen“**: Die zulässige Überlassung endet (§ 1 Abs. 1b); bei Überschreitung ist der Vertrag mit dem Verleiher unwirksam und ein Arbeitsverhältnis zum Entleiher gilt als zustande gekommen, wenn der Leiharbeitnehmer nicht fristgerecht festhält (§§ 9, 10). Eine „Übernahme“ im Sinn einer Gleichstellung kennt das Gesetz in diesem Zusammenhang nicht.
(b) **Regel und Ausnahme sind vertauscht:** Equal Pay und Equal Treatment gelten nach § 8 Abs. 1 **grundsätzlich ab dem ersten Tag**; nur ein Tarifvertrag kann beim Entgelt für die ersten neun Monate (in bestimmten Fällen bis 15 Monate) abweichen. Die Formulierung „spätestens nach neun Monaten, sofern kein abweichender Tarifvertrag gilt“ ist in sich widersprüchlich: Ohne abweichenden Tarifvertrag gilt Equal Pay sofort. K-3.2-18 und die Erklärung zu Q-3.2-08 prägen das Gegenteil ein. Die Option „… ab dem ersten Tag der Überlassung ausnahmslos“ ist wegen des Worts „ausnahmslos“ gerade noch falsch, die Erklärung dazu aber nicht.
(c) Die tarifliche Öffnung der 18 Monate (§ 1 Abs. 1b Satz 3 ff.) fehlt.
Die Meldung der Agenten ist berechtigt und schwerwiegend, weil K-3.2-18 und Q-3.2-08 die falsche Regel als Prüfungsfakt abfragen.

**Vorschlag Theorie** (ersetzt den Satz ab „… nach spätestens 18 Monaten …“):
„Zur Abdeckung von Auftragsspitzen setzt Vantera gelegentlich **Leiharbeitnehmer:innen** ein, deren Überlassung dem **Arbeitnehmerüberlassungsgesetz (AÜG)** unterliegt: Der Verleiher (Zeitarbeitsunternehmen) bleibt Vertragsarbeitgeber, während Vantera als Entleiher das Weisungsrecht für die Dauer des Einsatzes ausübt. Nach dem Gleichstellungsgrundsatz (Equal Pay, Equal Treatment; § 8 AÜG) hat die überlassene Person grundsätzlich ab dem ersten Tag Anspruch auf die wesentlichen Arbeitsbedingungen einschließlich des Arbeitsentgelts vergleichbarer Beschäftigter von Vantera. Ein Tarifvertrag kann beim Arbeitsentgelt für die ersten neun Monate der Überlassung davon abweichen; eine längere Abweichung (bis zu 15 Monate) ist nur unter weiteren tariflichen Voraussetzungen zulässig. Dieselbe Person darf demselben Entleiher grundsätzlich nicht länger als 18 aufeinanderfolgende Monate überlassen werden (Überlassungshöchstdauer, § 1 Abs. 1b AÜG; Tarifverträge der Einsatzbranche können eine andere Dauer festlegen). Wird die Höchstdauer überschritten, ist der Arbeitsvertrag mit dem Verleiher unwirksam und es gilt ein Arbeitsverhältnis zum Entleiher als zustande gekommen, sofern die Person nicht frist- und formgerecht erklärt, am Vertrag mit dem Verleiher festzuhalten (§§ 9, 10 AÜG).“ (Rest, Tarifvertrag § 4 TVG, unverändert.)

**K-3.2-18 (ersetzen):**
Frage: „Ab wann haben Leiharbeitnehmer:innen grundsätzlich Anspruch auf das gleiche Arbeitsentgelt wie vergleichbare Stammbeschäftigte (Equal Pay)?“
Antwort: „Grundsätzlich ab dem ersten Tag der Überlassung (§ 8 Abs. 1 AÜG). Nur ein Tarifvertrag kann beim Entgelt für die ersten neun Monate abweichen; eine längere Abweichung (bis zu 15 Monate) ist nur unter weiteren Voraussetzungen zulässig.“
**K-3.2-19 (neu):**
Frage: „Wie lange darf dieselbe Leiharbeitnehmerin oder derselbe Leiharbeitnehmer höchstens an denselben Entleiher überlassen werden, und was folgt bei Überschreitung?“
Antwort: „Grundsätzlich 18 aufeinanderfolgende Monate (§ 1 Abs. 1b AÜG; ein Tarifvertrag der Einsatzbranche kann abweichen). Bei Überschreitung ist der Vertrag mit dem Verleiher unwirksam und ein Arbeitsverhältnis zum Entleiher gilt als zustande gekommen, wenn die Person nicht rechtzeitig am bisherigen Vertrag festhält (§§ 9, 10 AÜG).“ `tags: arbeitnehmerueberlassung` · `schwierigkeit: schwer` · `bloom: erinnern`

**Q-3.2-08 (ersetzen)** · Mehrfachauswahl: „Welche der folgenden Aussagen zur Arbeitnehmerüberlassung (AÜG) treffen zu?“
- [x] Der Verleiher bleibt Vertragsarbeitgeber des Leiharbeitnehmers.
- [x] Der Entleiher übt für die Dauer des Einsatzes das Weisungsrecht aus.
- [ ] Die Überlassung an denselben Entleiher ist ohne zeitliche Grenze zulässig.
- [x] Die gesetzliche Überlassungshöchstdauer beträgt grundsätzlich 18 aufeinanderfolgende Monate.
Erklärung: „Equal Pay gilt grundsätzlich ab dem ersten Tag; nur ein Tarifvertrag kann beim Entgelt für die ersten neun Monate abweichen (§ 8 AÜG). Nach 18 Monaten endet die zulässige Überlassung; bei Überschreitung kann ein Arbeitsverhältnis zum Entleiher entstehen (§§ 9, 10 AÜG).“
**Q-3.2-13 (neu)** · Multiple Choice: „Ab wann gilt für Leiharbeitnehmer:innen grundsätzlich der Gleichstellungsgrundsatz (Equal Pay)?“ – [x] Ab dem ersten Tag der Überlassung / Nach drei Monaten / Nach neun Monaten / Nach 18 Monaten. Erklärung: „§ 8 Abs. 1 AÜG: grundsätzlich ab dem ersten Tag. Nur ein Tarifvertrag kann beim Entgelt für die ersten neun Monate (unter weiteren Voraussetzungen bis 15 Monate) abweichen.“ `schwierigkeit: mittel` · `bloom: verstehen`
**Fachgespräch (Leiharbeitsfrage), zusätzliche Erwartungen** (für die Rückfrage zur Überlassungsdauer):
- „Nach dem Gleichstellungsgrundsatz haben Leiharbeitnehmer:innen grundsätzlich ab dem ersten Tag Anspruch auf die wesentlichen Arbeitsbedingungen vergleichbarer Beschäftigter; ein Tarifvertrag kann beim Entgelt für die ersten neun Monate abweichen (§ 8 AÜG).“
- „Die Überlassung an denselben Entleiher ist grundsätzlich auf 18 aufeinanderfolgende Monate begrenzt (§ 1 Abs. 1b AÜG); bei Überschreitung kann ein Arbeitsverhältnis zum Entleiher entstehen, wenn die Person nicht am Vertrag mit dem Verleiher festhält (§§ 9, 10 AÜG).“

### 5.3 Einigungsstelle „verbindlich entscheiden“

**Fundstelle:**
- Technischer Fachwirt WQ3 3.2: Theorie „Betriebsverfassung und Mitbestimmung“ (letzter Satz: „… kann eine betriebsintern oder gerichtlich einzusetzende **Einigungsstelle verbindlich entscheiden**“); K-3.2-13; Q-3.2-06 (Frage und Erklärung); Q-3.2-10 (Hierarchie, Zeile „Verbindliche Entscheidung bei Nichteinigung in mitbestimmungspflichtigen Fragen → Einigungsstelle“).
- Technischer Fachwirt HQ4 11.3 (und gleichlautend Industriefachwirt HQ5 9.3): Theorie „Institutionalisierte Konfliktlösung“, K-11.3-18, Q-11.3-10, Fachgespräch: „… ein paritätisch mit Vertretern beider Seiten sowie einer neutralen vorsitzenden Person besetztes betriebliches Schlichtungsgremium, dessen Spruch **unter bestimmten Voraussetzungen** die Einigung der Betriebsparteien ersetzen kann.“

**Normtext ([§ 76 BetrVG](https://www.gesetze-im-internet.de/betrvg/__76.html)):**
- Abs. 1: Zur Beilegung von Meinungsverschiedenheiten ist **bei Bedarf** eine Einigungsstelle zu bilden. Abs. 2: Sie besteht aus einer gleichen Zahl von Beisitzer:innen, die Arbeitgeber und Betriebsrat bestellen, und einer unparteiischen Person im Vorsitz, auf die sich beide einigen müssen; kommt keine Einigung zustande, bestellt sie **das Arbeitsgericht** (dort auch Entscheidung über die Zahl der Beisitzer).
- Abs. 5: In den Fällen, in denen der **Spruch die Einigung ersetzt**, wird die Einigungsstelle auf Antrag einer Seite tätig; sie entscheidet nach billigem Ermessen; Ermessensüberschreitung ist binnen **zwei Wochen** beim Arbeitsgericht geltend zu machen.
- Abs. 6: „Im übrigen“ wird sie nur tätig, wenn beide Seiten es beantragen oder einverstanden sind; ihr Spruch ersetzt die Einigung dann nur, wenn sich beide ihm im Voraus unterworfen oder ihn nachträglich angenommen haben.
- Beispiele für ersetzende Sprüche: [§ 87 Abs. 2](https://www.gesetze-im-internet.de/betrvg/__87.html), [§ 98 Abs. 4](https://www.gesetze-im-internet.de/betrvg/__98.html), [§ 112 Abs. 4](https://www.gesetze-im-internet.de/betrvg/__112.html) (Sozialplan). Gegenbeispiele: [§ 112 Abs. 3](https://www.gesetze-im-internet.de/betrvg/__112.html) (Interessenausgleich: die Einigungsstelle „hat eine Einigung zu versuchen“, ohne ersetzenden Spruch), [§ 99 Abs. 4](https://www.gesetze-im-internet.de/betrvg/__99.html) (Zustimmungsersetzung durch das **Arbeitsgericht**), [§ 96 Abs. 1a](https://www.gesetze-im-internet.de/betrvg/__96.html) (nur Vermittlung).

**Urteil:**
- **Technischer WQ3 3.2: ungenau (mittel).** „Verbindlich“ gilt nur in den gesetzlich bestimmten Fällen mit ersetzendem Spruch (z. B. § 87 Abs. 2 BetrVG), nicht in „mitbestimmungspflichtigen Angelegenheiten“ allgemein (personelle Einzelmaßnahmen → Arbeitsgericht; Interessenausgleich → nur Einigungsversuch). „Betriebsintern oder gerichtlich einzusetzende Einigungsstelle“ ist ebenfalls schief: Sie wird von den Betriebsparteien gebildet; das **Gericht bestellt nur den Vorsitz** (und entscheidet über die Zahl der Beisitzer). Die Meldung der Agenten ist berechtigt.
- **Technischer HQ4 11.3 und Industriefachwirt HQ5 9.3: richtig (niedrig).** Die vorsichtige Formulierung („kann angerufen werden“, „unter bestimmten Voraussetzungen … ersetzen“) deckt § 76 Abs. 5 und 6 und braucht keine Änderung.

**Vorschlag Theorie WQ3 3.2** (ersetzt den letzten Satz des Abschnitts):
„Kommt es zwischen Geschäftsführung und Betriebsrat in einer mitbestimmungspflichtigen Angelegenheit zu keiner Einigung, kann bei Bedarf eine **Einigungsstelle** gebildet werden: Sie besteht aus einer gleichen Zahl von Beisitzer:innen beider Seiten und einer unparteiischen Person im Vorsitz, auf die sich beide einigen müssen (sonst bestellt sie das Arbeitsgericht, § 76 BetrVG). In den Fällen, in denen das Gesetz es vorsieht, etwa bei den sozialen Angelegenheiten nach § 87 BetrVG, ersetzt ihr Spruch die Einigung der Betriebsparteien und ist damit verbindlich (§ 87 Abs. 2, § 76 Abs. 5 BetrVG). In anderen Fällen wird sie nur tätig, wenn beide Seiten es wollen, und ihr Spruch bindet nur, wenn sich beide ihm unterworfen haben (§ 76 Abs. 6 BetrVG).“
**K-3.2-13:** Frage: „Welche Aufgabe hat die Einigungsstelle im Betriebsverfassungsrecht?“ Antwort: „Sie ist ein paritätisch besetztes Gremium mit unparteiischem Vorsitz, das bei fehlender Einigung zwischen Arbeitgeber und Betriebsrat tätig wird; in Fällen wie § 87 BetrVG ersetzt ihr Spruch die Einigung und ist damit verbindlich.“
**Q-3.2-06:** Frage: „Wie heißt das Gremium, dessen Spruch bei Nichteinigung zwischen Geschäftsführung und Betriebsrat in sozialen Angelegenheiten nach § 87 BetrVG die Einigung ersetzt?“ Akzeptierte Antworten: „Einigungsstelle“. Erklärung: „§ 87 Abs. 2 BetrVG: Kommt keine Einigung zustande, entscheidet die Einigungsstelle; ihr Spruch ersetzt die Einigung. In anderen Fällen, etwa beim Interessenausgleich, kann sie nur eine Einigung versuchen (§ 112 Abs. 3 BetrVG).“
**Q-3.2-10, Zeile 8:** „Entscheidung bei Nichteinigung in sozialen Angelegenheiten (§ 87 BetrVG) → Einigungsstelle“.
**Fachgespräch:** keine Erwartung zum Thema in diesem Kurs (WQ3); HQ4/HQ5: unverändert.

### 5.4 Allgemeiner Kündigungsschutz (KSchG, § 626 BGB)

**Fundstelle:** In allen drei Kursen Theorie, K-3.2-06 bis -10 (Industrie) bzw. K-3.2-06 bis -10 (Technischer) bzw. K-3.2-04 bis -09 (Wirtschaftsfachwirt), die zugehörigen Quizfragen, Fachgespräch und F-WQ3-02 (Industrie, Technischer) bzw. F-WBQ3-02 (Wirtschaftsfachwirt).
**Geprüft gegen:**
- [§ 1 Abs. 1, 2 KSchG](https://www.gesetze-im-internet.de/kschg/__1.html): sozial ungerechtfertigt, wenn nicht durch Gründe in der Person, im Verhalten oder durch dringende betriebliche Erfordernisse bedingt; Wartezeit länger als sechs Monate.
- [§ 1 Abs. 3 KSchG](https://www.gesetze-im-internet.de/kschg/__1.html): Sozialauswahl nach Dauer der Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung. Die Aufzählung in den Kursen stimmt.
- [§ 4](https://www.gesetze-im-internet.de/kschg/__4.html) und [§ 7 KSchG](https://www.gesetze-im-internet.de/kschg/__7.html): Klage binnen drei Wochen nach Zugang der schriftlichen Kündigung; sonst gilt die Kündigung „als von Anfang an rechtswirksam“. Die Kursaussagen (drei Wochen, Arbeitsgericht, grundsätzlich wirksam bei Fristversäumnis) stimmen. Die nachträgliche Zulassung (§ 5) ist nicht erwähnt; das ist für die Fragen unkritisch.
- [§ 626 Abs. 1, 2 BGB](https://www.gesetze-im-internet.de/bgb/__626.html): wichtiger Grund, Unzumutbarkeit bis zum Ablauf der Kündigungsfrist, Frist von zwei Wochen ab Kenntnis (Wirtschaftsfachwirt K-3.2-05: richtig). [§ 622 BGB](https://www.gesetze-im-internet.de/bgb/__622.html): Fristen steigen mit der Dauer des Arbeitsverhältnisses (Kursaussagen allgemein richtig). [§ 15 KSchG](https://www.gesetze-im-internet.de/kschg/__15.html): Kündigung von Betriebsratsmitgliedern unzulässig, außer bei außerordentlicher Kündigung mit Zustimmung nach § 103 BetrVG (Industrie: „erhöhter Kündigungsschutz“: richtig).
**Urteil: richtig (niedrig).** Einzelne Ungenauigkeiten („Beschäftigte“ statt Arbeitnehmer, Wartezeit „im selben Betrieb“) sind unter 3.3 beschrieben und betreffen den Technischen Fachwirt (und HB5), nicht die anderen beiden Kurse.

### 5.5 Betriebsrat vor Kündigung (§ 102 BetrVG)

**Geprüft:** [§ 102 Abs. 1 BetrVG](https://www.gesetze-im-internet.de/betrvg/__102.html): „Der Betriebsrat ist vor jeder Kündigung zu hören. Der Arbeitgeber hat ihm die Gründe für die Kündigung mitzuteilen. Eine ohne Anhörung des Betriebsrats ausgesprochene Kündigung ist unwirksam.“ Abs. 2: Frist für Bedenken eine Woche (ordentliche Kündigung) bzw. drei Tage (außerordentliche).
**Fundstelle:** Industrie: Theorie, K-3.2-12, K-3.2-13, Q-3.2-04, Q-3.2-08, Q-3.2-09, Fachgespräch; Technischer: Theorie, K-3.2-11, Q-3.2-02, Q-3.2-09, Fachgespräch, F-WQ3-02; Wirtschaftsfachwirt: Theorie, K-3.2-16, Q-3.2-08, Q-3.2-09, Fachgespräch, F-WBQ3-02.
**Urteil: richtig (niedrig).** „Anhören“, „unwirksam bei Verstoß“, „vor Ausspruch“ und „Betriebsrat entscheidet nicht allein“ stimmen. Zwei kleine Anmerkungen, keine Fehler: (a) Dass die Anhörung die Gründe der Kündigung umfasst (§ 102 Abs. 1 Satz 2), steht in keinem Kurs und könnte als Fachgesprächs-Rückfrage ergänzt werden. (b) Die Überschrift „Mitbestimmung bei Kündigungen“ in § 102 verleitet dazu, die Anhörung als Mitbestimmung zu verstehen; die Kurse trennen das zu Recht (Anhörung, Beratung, echte Mitbestimmung). Szenario-Anmerkung siehe 6.10.

### 5.6 Arbeitszeit (ArbZG)

**Fundstelle:** Industrie: Theorie, K-3.2-04, K-3.2-05, Q-3.2-11; Technischer: Theorie, K-3.2-14, K-3.2-15, Q-3.2-05; Wirtschaftsfachwirt: Theorie, K-3.2-10, K-3.2-11, Q-3.2-12, Fachgespräch.
**Geprüft:** [§ 3 ArbZG](https://www.gesetze-im-internet.de/arbzg/__3.html) (acht Stunden werktäglich; auf bis zu zehn Stunden verlängerbar, wenn innerhalb von sechs Kalendermonaten **oder** 24 Wochen im Durchschnitt acht Stunden nicht überschritten werden), [§ 4](https://www.gesetze-im-internet.de/arbzg/__4.html) (30 Minuten bei mehr als sechs bis zu neun Stunden, 45 Minuten bei mehr als neun Stunden; höchstens sechs Stunden ohne Pause), [§ 5 Abs. 1](https://www.gesetze-im-internet.de/arbzg/__5.html) (elf Stunden Ruhezeit).
**Urteil: richtig (niedrig).** Alle Zahlen stimmen. Zwei Kleinigkeiten:
- Technischer und Wirtschaftsfachwirt nennen nur „sechs Kalendermonate“; der Normtext hat zusätzlich „oder 24 Wochen“ (Industrie K-3.2-04 nennt beides). Vorschlag: überall „innerhalb von sechs Kalendermonaten oder 24 Wochen“.
- Industrie Q-3.2-11 fragt nach der Ruhezeit, „wenn keine gesetzliche Ausnahme (z. B. Schichtbetrieb) greift“. Schichtbetrieb ist **keine** gesetzliche Ausnahme von § 5 Abs. 1; die Ausnahmen betreffen bestimmte Einrichtungen (§ 5 Abs. 2, 3) und Tarifverträge (§ 7). Vorschlag Frage: „Welche Mindestruhezeit muss nach dem Arbeitszeitgesetz grundsätzlich zwischen zwei Arbeitstagen liegen?“ (Antworten unverändert.) Die Erklärung kann um „Ausnahmen gelten nur in gesetzlich oder tariflich geregelten Fällen (§§ 5, 7 ArbZG)“ ergänzt werden.

### 5.7 Urlaub (BUrlG)

**Fundstelle (nur Wirtschaftsfachwirt WBQ3 3.2):** Theorie „Urlaub“; K-3.2-12, K-3.2-13, K-3.2-14; Q-3.2-06, Q-3.2-11; Fachgespräch (Erwartung „Der Urlaubsanspruch entsteht grundsätzlich zum 1. Januar eines Kalenderjahres, der volle Anspruch erstmals nach sechsmonatigem Bestehen …“).
**Geprüft:** [§ 3 Abs. 1 BUrlG](https://www.gesetze-im-internet.de/burlg/__3.html) (mindestens 24 Werktage; Werktage sind alle Kalendertage außer Sonn- und Feiertagen), [§ 4](https://www.gesetze-im-internet.de/burlg/__4.html) („Der volle Urlaubsanspruch wird erstmalig nach sechsmonatigem Bestehen des Arbeitsverhältnisses erworben“), [§ 5](https://www.gesetze-im-internet.de/burlg/__5.html) (Teilurlaub: ein Zwölftel je vollem Monat), [§ 7 Abs. 3](https://www.gesetze-im-internet.de/burlg/__7.html) (Gewährung im Kalenderjahr; Übertragung nur aus dringenden betrieblichen oder in der Person liegenden Gründen; dann in den ersten drei Monaten des Folgejahres).
**Urteil: richtig (niedrig).** 24 Werktage sind bei einer Sechs-Tage-Woche richtig; die Umrechnung auf 20 Arbeitstage bei einer Fünf-Tage-Woche ist Arithmetik (24 × 5/6) und nicht im Normtext ausgewiesen, aber üblich. Die Übertragung bis 31. März stimmt. Der Hinweis, dass der Verfall nach der Rechtsprechung regelmäßig einen rechtzeitigen und konkreten Hinweis des Arbeitgebers voraussetzt, steht **nicht** im Normtext (Rechtsprechung, nicht belegt); das Kursurteil „nach der Rechtsprechung“ kennzeichnet das richtig. Unscharf ist nur „Der Urlaubsanspruch entsteht grundsätzlich zum 1. Januar“: Das Gesetz spricht vom **Erwerb** des vollen Anspruchs nach der Wartezeit (§ 4) und vom Teilurlaub (§ 5).
**Vorschlag Theorie** (ersetzt den Satz zur Entstehung): „Der volle Urlaubsanspruch wird erstmals nach sechsmonatigem Bestehen des Arbeitsverhältnisses erworben (Wartezeit, § 4 BUrlG). Wer die Wartezeit im Kalenderjahr nicht mehr erfüllen kann oder vor ihrer Erfüllung ausscheidet, hat Anspruch auf ein Zwölftel des Jahresurlaubs für jeden vollen Monat (Teilurlaub, § 5 BUrlG).“ K-3.2-13 passt. **Fachgespräch-Erwartung:** entsprechend ersetzen.

---

## 6. Zusätzlich gefunden

### 6.1 § 99 BetrVG gilt in „Unternehmen“, nicht in „Betrieben“ mit mehr als 20 Arbeitnehmern

**Fundstelle:** HB3 3.1: Theorie (Absatz „Am Ende steht der Arbeitsvertrag …“), K-3.1-11, Q-3.1-03 (Erklärung), Q-3.1-09 (Lückentext), Fachgespräch HB3 3.1 (Erwartung zu § 99). Wirtschaftsfachwirt WBQ3 3.2: Theorie („… in Betrieben mit mehr als 20 wahlberechtigten Arbeitnehmern …“), K-3.2-18 („in größeren Betrieben“).
**Wortlaut:** „… nach § 99 BetrVG in **Betrieben** mit in der Regel mehr als 20 wahlberechtigten Arbeitnehmenden …“

**Normtext ([§ 99 Abs. 1 BetrVG](https://www.gesetze-im-internet.de/betrvg/__99.html)):** „In **Unternehmen** mit in der Regel mehr als zwanzig wahlberechtigten Arbeitnehmern hat der Arbeitgeber den Betriebsrat vor jeder Einstellung, Eingruppierung, Umgruppierung und Versetzung zu unterrichten …“ Ebenso [§ 111 BetrVG](https://www.gesetze-im-internet.de/betrvg/__111.html) („In Unternehmen mit in der Regel mehr als zwanzig …“). Die Schwelle für den Betriebsrat selbst ([§ 1](https://www.gesetze-im-internet.de/betrvg/__1.html)) knüpft dagegen an den **Betrieb** an (fünf ständige wahlberechtigte Arbeitnehmer, davon drei wählbar).

**Urteil: falsch (mittel).** Für § 99 zählt die Größe des **Unternehmens**. Praktische Folge: Ein Betrieb mit 15 Arbeitnehmern in einem Unternehmen mit 60 Arbeitnehmern ist erfasst (sofern dort ein Betriebsrat besteht). Die Kurse stellen den Fall falsch dar.

**Vorschläge:** In allen genannten Stellen „Betrieben“ durch „Unternehmen“ ersetzen. Beispiele:
- K-3.1-11: Frage: „Ab welcher Unternehmensgröße hat der Betriebsrat bei Einstellungen typischerweise ein Mitbestimmungsrecht nach § 99 BetrVG?“ Antwort: „In Unternehmen mit in der Regel mehr als 20 wahlberechtigten Arbeitnehmenden.“
- Q-3.1-09: „Bei Einstellungen in Unternehmen mit mehr als 20 wahlberechtigten Arbeitnehmenden hat der ___Betriebsrat___ nach § 99 BetrVG ein Mitbestimmungsrecht.“
- Q-3.1-03, Erklärung: „… in Unternehmen mit in der Regel mehr als 20 wahlberechtigten Arbeitnehmenden.“
- Wirtschaftsfachwirt Theorie: „… bei Einstellungen und Versetzungen in Unternehmen mit mehr als 20 wahlberechtigten Arbeitnehmern …“; K-3.2-18: „… bei Einstellungen in Unternehmen mit mehr als 20 wahlberechtigten Arbeitnehmern …“
- Fachgespräch HB3 3.1: „Bei der Einstellung besteht das Mitbestimmungsrecht nach § 99 BetrVG in Unternehmen mit in der Regel mehr als 20 wahlberechtigten Arbeitnehmenden.“
Dazu der Hinweis aus 3.2: „Mitbestimmungsrecht“ bei § 99 heißt Zustimmung einholen, nicht Unwirksamkeit.

### 6.2 Wirtschaftsausschuss (Technischer Fachwirt WQ3 3.2)

**Fundstelle:** Theorie „Betriebsverfassung und Mitbestimmung“ (vorletzter Satz); Q-3.2-10 (Hierarchie, Zeilen „Wirtschaftsausschuss (unter: Betriebsrat)“ und „Information der Geschäftsführung zu wirtschaftlichen Angelegenheiten → Wirtschaftsausschuss“).
**Wortlaut:** „Ergänzend **kann** bei entsprechender Unternehmensgröße ein Wirtschaftsausschuss eingerichtet werden, der **die Geschäftsführung** zu wirtschaftlichen Angelegenheiten **informiert**, sowie eine Jugend- und Auszubildendenvertretung (JAV), die die Interessen der Auszubildenden und jugendlichen Beschäftigten gegenüber dem Betriebsrat vertritt.“

**Normtext:** [§ 106 BetrVG](https://www.gesetze-im-internet.de/betrvg/__106.html): „In allen Unternehmen mit in der Regel mehr als einhundert ständig beschäftigten Arbeitnehmern **ist** ein Wirtschaftsausschuss **zu bilden**. Der Wirtschaftsausschuss hat die Aufgabe, wirtschaftliche Angelegenheiten **mit dem Unternehmer zu beraten** und **den Betriebsrat zu unterrichten**.“ Abs. 2: Der **Unternehmer** hat den Wirtschaftsausschuss rechtzeitig und umfassend über die wirtschaftlichen Angelegenheiten zu unterrichten. [§ 60 Abs. 1, 2](https://www.gesetze-im-internet.de/betrvg/__60.html) und [§ 70 Abs. 1](https://www.gesetze-im-internet.de/betrvg/__70.html): JAV in Betrieben mit in der Regel mindestens fünf Arbeitnehmern, die jugendlich oder zur Berufsausbildung beschäftigt sind; sie nimmt deren besondere Belange wahr und kann Maßnahmen **beim Betriebsrat beantragen**.

**Urteil: falsch (mittel).** (a) Die **Richtung der Information ist umgekehrt**: Die Geschäftsführung unterrichtet den Wirtschaftsausschuss, nicht umgekehrt. Er berät mit ihr und berichtet dem Betriebsrat. (b) „Kann eingerichtet werden“ ist falsch: Ab mehr als 100 ständig Beschäftigten im **Unternehmen** ist er zu bilden. (c) JAV „gegenüber dem Betriebsrat vertritt“: im Kern vertretbar (Anträge beim Betriebsrat, § 70), aber „gegenüber der Geschäftsführung gewählt“ ist nicht gemeint; ungenau, nicht falsch. Ergänzend: Für Tendenzbetriebe gelten die §§ 106 bis 110 nicht ([§ 118 Abs. 1](https://www.gesetze-im-internet.de/betrvg/__118.html)); für ein Fertigungsunternehmen wie Vantera irrelevant.

**Vorschlag Theorie:** „Ergänzend ist in Unternehmen mit in der Regel mehr als 100 ständig beschäftigten Arbeitnehmern ein **Wirtschaftsausschuss** zu bilden (§ 106 BetrVG); er berät wirtschaftliche Angelegenheiten mit der Geschäftsführung und unterrichtet den Betriebsrat, die Geschäftsführung muss ihn rechtzeitig und umfassend informieren. Daneben wird in Betrieben mit in der Regel mindestens fünf jugendlichen oder in Berufsausbildung beschäftigten Arbeitnehmern eine **Jugend- und Auszubildendenvertretung (JAV)** gewählt, die deren besondere Belange wahrnimmt und Maßnahmen beim Betriebsrat beantragen kann (§§ 60, 70 BetrVG).“
**Q-3.2-10, Zeile 7:** „Beratung wirtschaftlicher Angelegenheiten mit der Geschäftsführung und Unterrichtung des Betriebsrats → Wirtschaftsausschuss“. Zeile 5 „Vertretung der Auszubildenden und jugendlichen Beschäftigten gegenüber dem Betriebsrat“ → „Wahrnehmung der besonderen Belange der Auszubildenden und jugendlichen Beschäftigten, Anträge beim Betriebsrat“.
**Fachgespräch (WQ3 Technischer):** keine Erwartung dazu; nicht betroffen.

### 6.3 Schwangerschaftsfrage: „mittelbare Diskriminierung“ (Gesundheit HB5 5.1)

**Fundstelle:** Q-5.1-04 (Wahr/Falsch), Erklärung: „Diese Frage ist unzulässig, da sie eine **mittelbare** Diskriminierung wegen des Geschlechts darstellen kann.“
**Normtext:** [§ 3 Abs. 1 Satz 2 AGG](https://www.gesetze-im-internet.de/agg/__3.html): „Eine **unmittelbare** Benachteiligung wegen des Geschlechts liegt in Bezug auf § 2 Abs. 1 Nr. 1 bis 4 auch im Falle einer ungünstigeren Behandlung einer Frau wegen Schwangerschaft oder Mutterschaft vor.“ Die mittelbare Benachteiligung ist in Abs. 2 anders definiert (dem Anschein nach neutrale Vorschriften, Kriterien oder Verfahren).
**Urteil: falsch (mittel).** Die Antwort („Falsch“, also unzulässig) ist richtig, die Begründung nicht: Benachteiligung wegen Schwangerschaft ist **unmittelbar**. Gerade der Unterschied unmittelbar/mittelbar ist AGG-Prüfungsstoff.
**Vorschlag Erklärung:** „Diese Frage ist unzulässig: Eine ungünstigere Behandlung wegen einer Schwangerschaft gilt als unmittelbare Benachteiligung wegen des Geschlechts (§ 3 Abs. 1 Satz 2, § 7 Abs. 1 AGG).“
Hinweis (nicht belegt): Die Zulässigkeit der Frage nach Gewerkschaftszugehörigkeit und nach einschlägigen Vorstrafen ist Rechtsprechung bzw. Verfassungsrecht (Art. 9 Abs. 3 GG) und nicht gegen Normtexte geprüft.

### 6.4 Masernnachweis bei Pflegediensten (Gesundheit HB5 5.1)

**Fundstelle:** Theorie „Personalauswahl und Vorstellungsgespräch“ (Satz „… oder nach dem Nachweis einer Masernimpfung, sofern gesetzlich vorgeschrieben“); K-5.1-15; Fachgespräch HB5 (gleiche Erwartung).
**Normtext:** [§ 20 Abs. 8 IfSG](https://www.gesetze-im-internet.de/ifsg/__20.html): Personen, die **nach dem 31.12.1970 geboren** sind und in **Einrichtungen nach § 23 Abs. 3 Satz 1, § 33 Nr. 1 bis 4 oder § 36 Abs. 1 Nr. 4** tätig sind, müssen ausreichenden **Impfschutz oder Immunität** aufweisen; Abs. 9: Nachweis vor Beginn der Tätigkeit gegenüber der Leitung (Impfdokumentation, ärztliches Zeugnis über Immunität oder Kontraindikation, Bestätigung). [§ 23 Abs. 3 Satz 1 IfSG](https://www.gesetze-im-internet.de/ifsg/__23.html) nennt Krankenhäuser, Einrichtungen für ambulantes Operieren, Vorsorge-/Reha-Einrichtungen mit krankenhausähnlicher Versorgung, Dialyse, Tageskliniken, Entbindungseinrichtungen, vergleichbare Behandlungs- oder Versorgungseinrichtungen, Arzt-, Zahnarzt-, psychotherapeutische Praxen, Praxen sonstiger Heilberufe, Einrichtungen des öffentlichen Gesundheitsdienstes sowie Rettungsdienste. **Ambulante Pflegedienste und Pflegeheime** stehen in der gelesenen Fassung dort nicht ausdrücklich.
**Urteil: ungenau (niedrig).** Der Zusatz „sofern gesetzlich vorgeschrieben“ ist richtig. Ungenau sind die Begründung in K-5.1-15 („Gemeinschaftseinrichtungen bzw. im Gesundheitswesen“ ist zu weit) und der Kontext der Beispieleinrichtung (ambulanter Pflegedienst „Morgenlicht“): Ob die Pflicht dort gilt, hängt von der Einrichtungsart ab. Sekundärquellen (BG BAU, Gesundheitsämter; Suchtreffer, nicht selbst geöffnet) halten das Gesetz für stationäre Altenpflege und für einfache ambulante Pflege nicht ohne Weiteres für anwendbar; ob Sonderfälle (z. B. Einrichtungen, die einer Behandlungseinrichtung vergleichbar sind, § 23 Abs. 3 Satz 1 Nr. 7) darunter fallen, ist eine Einzelfallfrage, die ich nicht geprüft habe. Auch gilt die Pflicht nur für nach 1970 Geborene und verlangt Impfschutz **oder** Immunität.
**Vorschlag Theorie:** „… zulässig sind hingegen Fragen, die unmittelbar mit der Eignung für die konkrete Pflegetätigkeit zusammenhängen, etwa nach einschlägigen Vorstrafen bei Tätigkeiten mit besonderem Vertrauensschutz oder — nur dort, wo das Infektionsschutzgesetz den Nachweis verlangt (§ 20 Abs. 8 und 9 IfSG, z. B. in Krankenhäusern und Arztpraxen) — nach dem Masernschutz.“
**K-5.1-15:** Frage: „Warum kann die Frage nach dem Masernschutz bei bestimmten Einrichtungen im Gesundheitswesen zulässig sein?“ Antwort: „Weil Personen, die nach 1970 geboren sind und in bestimmten Einrichtungen (z. B. Krankenhäusern, Arztpraxen) tätig werden, nach § 20 Abs. 8 und 9 IfSG vor Tätigkeitsbeginn Impfschutz oder Immunität gegen Masern nachweisen müssen. Ob ein Pflegedienst oder Pflegeheim darunter fällt, hängt von der Einrichtungsart ab.“
**Fachgespräch-Erwartung:** „Zulässig sind z. B. Fragen nach einschlägigen Vorstrafen bei Tätigkeiten mit besonderem Vertrauensschutz oder nach dem Masernschutz, soweit das Infektionsschutzgesetz den Nachweis für die Einrichtung vorschreibt.“

### 6.5 Fallaufgabe mit Elf-Stunden-Tagen und „Ausgleich“ (Wirtschaftsfachwirt F-WBQ3-02)

**Fundstelle:** `wirtschaftsfachwirt/wbq3/fallaufgaben.md`, F-WBQ3-02, Ausgangssituation („Arbeitszeiten von bis zu elf Stunden pro Tag … ohne dass ein klarer Ausgleich dokumentiert ist“), Teilaufgabe 3 und Musterlösungshinweis: „… grundsätzliche Höchstarbeitszeit von acht (ausnahmsweise bis zehn) Stunden werktäglich sowie die Pflicht zum Ausgleich innerhalb von sechs Monaten … ohne dokumentierten Ausgleich ein Verstoß gegen das ArbZG naheliegt.“
**Normtext:** [§ 3 ArbZG](https://www.gesetze-im-internet.de/arbzg/__3.html): Acht Stunden; **bis zu zehn Stunden** nur bei Durchschnitt von acht Stunden innerhalb von sechs Kalendermonaten oder 24 Wochen. Mehr als zehn Stunden sind **nicht** vorgesehen; Abweichungen nur über [§ 7 ArbZG](https://www.gesetze-im-internet.de/arbzg/__7.html) (Tarifvertrag; über zehn Stunden nur bei regelmäßiger Arbeitsbereitschaft oder Bereitschaftsdienst) oder behördliche Bewilligung (§ 7 Abs. 5); die Ausnahmen in §§ 14, 15 ArbZG habe ich nicht gelesen. [§ 16 Abs. 2 ArbZG](https://www.gesetze-im-internet.de/arbzg/__16.html): Die über acht Stunden hinausgehende Arbeitszeit ist **aufzuzeichnen** (Aufbewahrung zwei Jahre).
**Urteil: falsch (mittel).** Der Musterlösungshinweis suggeriert, ein dokumentierter Ausgleich könne Tage mit elf Stunden rechtfertigen. Das Gesetz begrenzt aber den einzelnen Tag auf zehn Stunden; ein Ausgleich im Durchschnitt heilt elf Stunden nicht. „Dokumentiert“ passt zur Aufzeichnungspflicht des § 16 Abs. 2, nicht zur Rechtfertigung.
**Vorschlag Musterlösungshinweis Teilaufgabe 3:** „Teilaufgabe 3 sollte die Höchstarbeitszeit von acht Stunden werktäglich nennen (§ 3 Satz 1 ArbZG), die nur auf bis zu zehn Stunden verlängert werden darf, wenn innerhalb von sechs Kalendermonaten oder 24 Wochen im Durchschnitt acht Stunden werktäglich nicht überschritten werden (§ 3 Satz 2). Tage mit elf Stunden überschreiten die Obergrenze von zehn Stunden; auch ein dokumentierter Ausgleich ändert daran nichts. Ohne tarifliche oder behördliche Ausnahme (§ 7 ArbZG) liegt ein Verstoß gegen das ArbZG vor. Zusätzlich ist die über acht Stunden hinausgehende Arbeitszeit aufzuzeichnen (§ 16 Abs. 2 ArbZG); auch die Mindestruhezeit von elf Stunden (§ 5) und die Ruhepausen (§ 4) sind zu prüfen.“ In der Ausgangssituation kann „ohne dass ein klarer Ausgleich dokumentiert ist“ bleiben oder durch „ohne dass die Arbeitszeit aufgezeichnet wird“ ersetzt werden.

### 6.6 Befristung und Schriftform (Wirtschaftsfachwirt WBQ3 3.2)

**Fundstelle:** Theorie „Der Arbeitsvertrag“, zweiter Absatz: „Grundsätzlich ist der Arbeitsvertrag formfrei gültig … Eine Befristung mit sachlichem Grund … ist demgegenüber grundsätzlich zeitlich nicht beschränkt.“; K-3.2-02, K-3.2-03; Q-3.2-02.
**Normtext:** [§ 14 Abs. 4 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__14.html): Die Befristung bedarf zur Wirksamkeit der **Schriftform**; [§ 16 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__16.html): bei unwirksamer Befristung gilt der Vertrag als unbefristet. [§ 14 Abs. 2 Satz 2 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__14.html): Vorbeschäftigungsverbot. Der Arbeitsvertrag im Übrigen ist formfrei (nach den gelesenen Normen kein Formzwang; [§ 623 BGB](https://www.gesetze-im-internet.de/bgb/__623.html) verlangt Schriftform nur für Kündigung und Auflösungsvertrag).
**Urteil: ungenau (mittel).** „Formfrei“ stimmt für den Vertrag, aber nicht für die **Befristungsabrede**; die Prüfungsaufgabe „mündlich geschlossener Vertrag“ lädt zur falschen Verallgemeinerung ein. „Zeitlich nicht beschränkt“ ist nach dem Gesetz richtig, lässt aber die Kontrolle von Kettenbefristungen (Rechtsprechung, nicht am Normtext belegt) aus. Eine Aussage zum Vorbeschäftigungsverbot fehlt (K-3.2-03 ist richtig, aber unvollständig).
**Vorschlag Theorie** (am Ende des Absatzes): „Die Befristung eines Arbeitsvertrags bedarf dagegen zu ihrer Wirksamkeit der Schriftform (§ 14 Abs. 4 TzBfG). Eine Befristung ohne sachlichen Grund ist zudem ausgeschlossen, wenn mit demselben Arbeitgeber bereits zuvor ein befristetes oder unbefristetes Arbeitsverhältnis bestanden hat (§ 14 Abs. 2 Satz 2 TzBfG). Bei einer Befristung mit sachlichem Grund nennt das Gesetz keine Höchstdauer; wiederholte Befristungen werden von den Gerichten aber auf Rechtsmissbrauch geprüft.“ Satz „… grundsätzlich zeitlich nicht beschränkt“ entsprechend streichen.
**Q-3.2-02, Erklärung:** „Der Arbeitsvertrag ist grundsätzlich formfrei wirksam; das Nachweisgesetz verlangt die Niederschrift der wesentlichen Bedingungen innerhalb gestaffelter Fristen. Eine Befristung bedarf allerdings der Schriftform (§ 14 Abs. 4 TzBfG).“
**Neue Karte K-3.2-19:** Frage: „Welche Form verlangt das TzBfG für die Befristung eines Arbeitsvertrags?“ Antwort: „Die Schriftform; sonst gilt der Vertrag als unbefristet (§ 14 Abs. 4, § 16 TzBfG).“ `tags: befristung` · `schwierigkeit: mittel` · `bloom: erinnern`

### 6.7 Zwischenprüfung und Ausbildungszeugnis (Büro HB3 3.2)

**Fundstelle:** Theorie „Ausbildung kontrollieren“ („Zwischenprüfung und … Abschlussprüfung“) und „Berufseinstieg gestalten“ („Nach bestandener Abschlussprüfung stellt der Betrieb ein betriebliches Ausbildungszeugnis aus (einfaches Zeugnis: Art und Dauer der Ausbildung; qualifiziertes Zeugnis: zusätzlich Leistung und Verhalten)“); K-3.2-14, K-3.2-15; Q-3.2-11.
**Normtext:** [§ 16 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__16.html): Die Ausbildenden haben den Auszubildenden **bei Beendigung des Berufsausbildungsverhältnisses** ein schriftliches Zeugnis auszustellen; es muss Angaben über **Art, Dauer und Ziel** der Berufsausbildung sowie über die **erworbenen beruflichen Fertigkeiten, Kenntnisse und Fähigkeiten** enthalten; **auf Verlangen** der Auszubildenden sind auch Verhalten und Leistung aufzunehmen. [§ 48 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__48.html): Eine Zwischenprüfung ist „entsprechend der Ausbildungsordnung“ durchzuführen; sie **entfällt**, wenn die Ausbildungsordnung eine in zwei zeitlich auseinanderfallenden Teilen durchgeführte Abschlussprüfung vorsieht ([§ 5 Abs. 2 Nr. 1 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__5.html)).
**Urteil: ungenau (niedrig).** (a) Das Zeugnis wird **bei Beendigung** des Ausbildungsverhältnisses ausgestellt, nicht erst „nach bestandener Abschlussprüfung“. (b) Schon das einfache Zeugnis nennt auch Ziel und erworbene Fertigkeiten, nicht nur „Art und Dauer“. (c) Das qualifizierte Zeugnis gibt es nur auf Verlangen. (d) Ob der betreffende Beruf eine Zwischenprüfung oder eine gestreckte Abschlussprüfung hat, hängt von der Ausbildungsordnung ab, die ich nicht gelesen habe; die Theorie spricht allgemein von „Zwischenprüfung“.
**Vorschläge:**
- Theorie „Berufseinstieg“: „Bei Beendigung des Ausbildungsverhältnisses stellt der Betrieb ein schriftliches Ausbildungszeugnis aus (§ 16 BBiG). Das einfache Zeugnis enthält Art, Dauer und Ziel der Ausbildung sowie die erworbenen beruflichen Fertigkeiten, Kenntnisse und Fähigkeiten; auf Verlangen der Auszubildenden werden zusätzlich Verhalten und Leistung aufgenommen (qualifiziertes Zeugnis).“
- K-3.2-15, Antwort: „Das einfache Zeugnis nennt Art, Dauer und Ziel der Ausbildung sowie die erworbenen Fertigkeiten, Kenntnisse und Fähigkeiten; das qualifizierte Zeugnis enthält auf Verlangen der Auszubildenden zusätzlich Angaben zu Verhalten und Leistung (§ 16 BBiG).“
- Q-3.2-11, Frage: „Wie wird das Zeugnis genannt, das auf Verlangen der Auszubildenden zusätzlich zu Art, Dauer, Ziel und erworbenen Fertigkeiten auch Verhalten und Leistung bewertet?“
- Theorie „Ausbildung kontrollieren“, Ergänzung: „… auf die Zwischenprüfung (bzw. den ersten Teil der Abschlussprüfung, wenn die Ausbildungsordnung eine gestreckte Abschlussprüfung vorsieht; dann entfällt die Zwischenprüfung, § 48 BBiG) und die Abschlussprüfung …“. K-3.2-14: Frage „Welche Prüfungen durchlaufen Auszubildende typischerweise?“ Antwort: „Die Zwischenprüfung (oder, bei gestreckter Abschlussprüfung, deren ersten Teil) und die Abschlussprüfung vor der zuständigen Stelle.“

### 6.8 Pflegefachassistenz und „Berufsschule“ (Gesundheit HB5 5.2)

**Fundstelle:** Theorie „Ausbildungsberufe im Gesundheits- und Sozialwesen“ („… die Ausbildung zur **Pflegefachassistenz** bzw. zur Pflegehilfskraft …“); K-5.2-14; Theorie „Betrieblicher Ausbildungsplan und Zusammenarbeit mit der Berufsschule“, K-5.2-10, Q-5.2-11, Q-5.2-13 (Wortwahl „Berufsschule“).
**Normtext:** Das [Gesetz über den Pflegefachassistenzberuf](https://www.gesetze-im-internet.de/pflfassg/) ist auf gesetze-im-internet.de eingestellt; die Gliederung führt die meisten Teile als „(zukünftig in Kraft)“, § 49 regelt die Nichtanwendung des BBiG, § 52 Übergangsvorschriften für landesrechtliche Ausbildungen. Das Inkrafttretensdatum habe ich im Normtext nicht gelesen; Sekundärquellen (Meldungen zum Gesetzgebungsverfahren) nennen den 1. Januar 2027. [§ 6 Abs. 2 PflBG](https://www.gesetze-im-internet.de/pflbg/__6.html): Der theoretische und praktische Unterricht wird an **Pflegeschulen** erteilt.
**Urteil: ungenau (niedrig).** (a) Heute (11.10.2026) sind die Pflegeassistenz-Ausbildungen noch landesrechtlich geregelt; die Theorie ist damit derzeit nicht falsch, aber bald überholt. (b) In der Pflegeausbildung heißt der Lernort „Pflegeschule“, nicht „Berufsschule“ (BBiG-Ausbildungen: Berufsschule). Die Theorie benutzt beides durcheinander.
**Vorschläge:** Theorie: „… sowie die Pflegeassistenz- und Pflegehilfeausbildung, die bisher landesrechtlich geregelt ist und nach dem beschlossenen Pflegefachassistenzgesetz künftig bundeseinheitlich geregelt wird (Inkrafttreten vor Übernahme am Gesetzestext prüfen) …“. Lernort: In Pflegeausbildungen einheitlich „Pflegeschule“ (K-5.2-10, Q-5.2-11, Q-5.2-13 und Überschrift „Zusammenarbeit mit der Pflegeschule bzw. Berufsschule“).

### 6.9 „Mitarbeitervertretung“, kirchliches Recht und Tendenzbetriebe (Gesundheit HB5 5.1, 5.5)

**Fundstelle:** HB5 5.1 Theorie (Absatz zum AGG und zur „Mitarbeitervertretung … nach MVG“), K-5.1-10, Q-5.1-13; HB5 5.5 Theorie „Betriebsverfassungsrecht“, K-5.5-13, K-5.5-16, Q-5.5-04.
**Geprüft:** [§ 102 Abs. 1 Satz 3 BetrVG](https://www.gesetze-im-internet.de/betrvg/__102.html) (Betriebsrat: Kündigung ohne Anhörung unwirksam), [§ 118 BetrVG](https://www.gesetze-im-internet.de/betrvg/__118.html): Abs. 2: Das BetrVG findet keine Anwendung auf Religionsgemeinschaften und ihre karitativen und erzieherischen Einrichtungen; Abs. 1: Für Betriebe, die unmittelbar und überwiegend karitativen, konfessionellen oder erzieherischen Bestimmungen dienen, gilt das Gesetz nur eingeschränkt („soweit die Eigenart … dem nicht entgegensteht“); die §§ 106 bis 110 (Wirtschaftsausschuss) sind nicht anzuwenden, die §§ 111 bis 113 nur zum Ausgleich wirtschaftlicher Nachteile.
**Urteil: nicht prüfbar (niedrig).** Das **kirchliche Mitarbeitervertretungsrecht** (MVG-EKD, MAVO), das Personalvertretungsrecht und die dort geregelten Beteiligungsrechte (Zustimmung bei Einstellung, Folgen unterlassener Anhörung) stehen nicht auf gesetze-im-internet.de; ich habe sie nicht gelesen und stelle keine Behauptung über sie auf. Belegt ist nur, was für den **Betriebsrat** gilt (§ 99, § 102). Die Kurse sagen „Mitarbeitervertretung“ und meinen teils Betriebsrat, teils kirchliche Vertretung. Zusätzlich ist der Hinweis „BetrVG gilt in privatwirtschaftlichen Betrieben“ für private gemeinnützige Pflegeträger zu pauschal (Tendenzschutz nach § 118 Abs. 1).
**Vorschlag:** K-5.5-13 / Q-5.5-04 und die Kündigungspassage auf „Betriebsrat (§ 102 BetrVG)“ zuschneiden, bei kirchlichen Trägern „entsprechende Beteiligung nach kirchlichem Recht (nicht Gegenstand dieser Prüfung)“; in der Theorie 5.5 beim Betriebsrat-Absatz ergänzen: „Auf Religionsgemeinschaften und ihre karitativen und erzieherischen Einrichtungen findet das BetrVG keine Anwendung (§ 118 Abs. 2 BetrVG); für andere karitative Träger gilt es nur eingeschränkt (Tendenzschutz, § 118 Abs. 1 BetrVG).“ Kirchenrechtliche Aussagen vor der Übernahme gegen MVG-EKD bzw. MAVO prüfen.

### 6.10 Betriebsrats-Anhörung im Szenario ohne (bestehenden) Betriebsrat (Wirtschaftsfachwirt)

**Fundstelle:** Q-3.2-09 („Ein Lagermitarbeiter … Der Betrieb hat 60 Mitarbeitende. Die Geschäftsführung möchte ihm betriebsbedingt kündigen. Was muss sie zusätzlich zur Kündigung beachten?“ richtig: „Sie muss den Betriebsrat anhören und eine Sozialauswahl … durchführen“); F-WBQ3-02, Teilaufgabe 2 („… beschreiben Sie, welches Beteiligungsrecht der Betriebsrat vor Ausspruch der geplanten Kündigung zwingend hat“) bei der Ausgangslage, dass die Personalabteilung „erstmals einen Betriebsrat wählen lassen“ will.
**Normtext:** [§ 102 BetrVG](https://www.gesetze-im-internet.de/betrvg/__102.html) setzt einen bestehenden Betriebsrat voraus. [§ 1 BetrVG](https://www.gesetze-im-internet.de/betrvg/__1.html): Betriebsräte „werden gewählt“ ab fünf ständigen wahlberechtigten Arbeitnehmern; eine Pflicht zur Wahl gibt es nicht. [§ 15 Abs. 3 KSchG](https://www.gesetze-im-internet.de/kschg/__15.html): Die Kündigung eines Mitglieds des Wahlvorstands (ab Bestellung) oder eines Wahlbewerbers (ab Aufstellung des Wahlvorschlags) ist bis zur Bekanntgabe des Wahlergebnisses grundsätzlich unzulässig.
**Urteil: ungenau (niedrig).** Q-3.2-09 nennt keinen Betriebsrat, verlangt aber seine Anhörung als richtige Antwort; in F-WBQ3-02 besteht (noch) keiner, die Teilaufgabe fragt dennoch nach seinem „zwingenden“ Recht. Das wirkt widersprüchlich.
**Vorschläge:** Q-3.2-09: Satz ergänzen „Im Betrieb besteht ein Betriebsrat.“ F-WBQ3-02, Teilaufgabe 2: „… beschreiben Sie, welches Beteiligungsrecht ein Betriebsrat vor Ausspruch der geplanten Kündigung zwingend hätte, wenn er bereits gewählt wäre, und was gilt, solange noch keiner besteht.“ Musterlösung ergänzen: „Solange kein Betriebsrat besteht, entfällt die Anhörung nach § 102 BetrVG; ein bestehender Betriebsrat muss vor jeder Kündigung angehört werden, sonst ist sie unwirksam. Zu beachten ist der Kündigungsschutz für Mitglieder des Wahlvorstands und Wahlbewerber (§ 15 Abs. 3 KSchG), falls der Mitarbeiter dazugehört.“

---

## Nicht geprüft / offen

1. **Rechtsprechung** (BAG, EuGH, BVerfG): Kettenbefristung und Rechtsmissbrauch, Wirksamkeit einer ohne Zustimmung nach § 99 BetrVG begründeten Einstellung, „Theorie der Wirksamkeitsvoraussetzung“ bei § 87 BetrVG, Verfall von Urlaub und Hinweispflicht, Wirkung einer länger als sechs Monate vereinbarten Probezeit, Zulässigkeit von Fragen nach Gewerkschaftszugehörigkeit und Vorstrafen. Die Aussagen dazu stehen in diesem Entwurf nur dort, wo sie als „Rechtsprechung, nicht am Normtext belegt“ gekennzeichnet sind.
2. **Kirchliches Arbeitsrecht und Personalvertretungsrecht** (MVG-EKD, MAVO, BPersVG/LPersVG): nicht gelesen (siehe 6.9).
3. **Bürokratieentlastungsgesetz IV und Stand der Normen:** Ich habe nicht geprüft, wann genau die Textform im NachwG (§ 2 Abs. 1 Satz 2) in Kraft trat; der Normtext nennt es nicht. Auch der Stand der übrigen Normen ist nicht belegt (kein Stand-Vermerk auf den Seiten).
4. **Landesrecht:** Welche Länder ihr Integrationsamt in „Inklusionsamt“ umbenannt haben, stützt sich nur auf eine Suchzusammenfassung der BIH-Publikation; das PDF habe ich nicht geöffnet.
5. **Masernschutz:** Ob bestimmte Pflegeeinrichtungen im Einzelfall unter § 23 Abs. 3 Satz 1 Nr. 7 IfSG („vergleichbare Einrichtungen“) fallen, ist ungeprüft.
6. **Pflegefachassistenzgesetz:** Das Inkrafttretensdatum habe ich nicht im Normtext gelesen (nur „zukünftig in Kraft“ und Sekundärquellen); Dauer und Inhalte der neuen Ausbildung sind nicht geprüft.
7. **Ausbildungsordnungen** (z. B. Kaufleute für Büromanagement): nicht gelesen; die Aussage zur Zwischenprüfung bzw. gestreckten Abschlussprüfung bleibt allgemein.
8. **ArbZG §§ 14, 15** (Ausnahmen in besonderen Fällen, behördliche Bewilligung): nicht gelesen.
9. **BetrVG § 107** (Zusammensetzung des Wirtschaftsausschusses), **§ 61** (Wählbarkeit zur JAV), **§ 100** (vorläufige personelle Maßnahmen) und **§ 103** (Zustimmung bei Kündigung von Amtsträgern): nur über Verweise in anderen Normen berücksichtigt.
10. **Weitere Dateien mit demselben Muster außerhalb dieses Bereichs** (nur per Suche gesehen, nicht geprüft): `ausbildung-der-ausbilder` HF2 (§ 98 BetrVG und „Ausbildende“), `handelsfachwirt` HB2 und `versicherungen-finanzanlagen` KP2 (AEVO als Nachweis „der fachlichen Eignung“).
11. **Themen der Aufgabenbeschreibung ohne Treffer in den Kursdateien:** „Rasse“, Nachweisgesetz und Approbation kamen nur in den genannten Dateien vor; eine Suche in weiteren Kursen habe ich für diesen Entwurf nicht systematisch durchgeführt.
