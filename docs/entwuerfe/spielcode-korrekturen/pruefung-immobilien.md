# Prüfung Immobilien-Zoneninstrumente (Bericht F, 23.10.2026)

Geprüft: (a) WEG-Organe mit vier Zonen (Q-4.2-14 bis -17, neu -32 bis -34), (b) Betriebskosten mit trennscharfen Zonen (Q-4.4-14 bis -17), (c) DIN-276-Kostengruppen KG 100 bis 800 (Q-5.4-14 bis -17 samt Theorie-Absatz), (d) Duell `game-kennzahlen-duell-immobilien-aehnlich.ts`. Maßstab: eingespielte Theorie der Themen 1.1, 4.2, 4.4, 5.1, 5.4; Gesetzestexte WEG §§ 9a, 18, 21, 27, 29, 44 und BetrKV § 2 von gesetze-im-internet.de abgerufen (DIN 276 nicht frei verfügbar, nur nach Kurstext und Fachkenntnis geprüft). Keine Datei im Repo geändert außer diesem Bericht.

## Ergebnis in Zahlen

hoch 1 · mittel 9 · niedrig 10. Duell: kein Befund.

**Parser:** Alle 15 Aufgaben werden mit `parseQuizBlock` fehlerfrei gelesen (Typ je `wegorgane`/`betriebskosten`/`kostengruppen`, Zonenschlüssel `versammlung`/`verwalter`/`beirat`/`gdwe`, `umlagefaehig`/`nichtumlagefaehig`/`verbrauch`, `kg100` bis `kg800`; jede Zone je Aufgabe mindestens einmal besetzt). Besetzung je Zone (Versammlung/Verwalter/Beirat/Gemeinschaft): Q-4.2-14 2/3/1/1, -15 2/3/2/1, -16 2/3/1/1, -17 3/3/2/1, -32 2/2/2/2, -33 2/2/2/2, -34 2/2/2/2. Betriebskosten (umlagefähig/nicht/Heiz- und Warmwasser): 2/2/2, 3/2/2, 3/2/2, 3/3/2. Kostengruppen: Q-5.4-14 je 1 (8 Zeilen), -15 bis -17 je KG 200 und KG 700 doppelt, KG 800 einfach.

## Befunde

### hoch

**H1 · Q-4.2-16, Zeile 5 · „Ein Handwerksbetrieb schließt mit Ravelin im Namen der Gemeinschaft einen Vertrag, der nach außen wirksam ist → Verwalter“**
Problem: Nicht eindeutig. Die Anweisung fragt nach dem Organ/Verband, das „handelt, zuständig oder verpflichtet ist“. Die Gemeinschaft ist Vertragspartei und aus dem Vertrag berechtigt und verpflichtet (Theorie „Haftung im Außenverhältnis“, § 9b Abs. 1, § 9a Abs. 1); die Zeile selbst sagt „im Namen der Gemeinschaft“. Zwei der Zonen passen, und die Erklärung kann das nur nachträglich auflösen. Das ist genau die Überschneidung, die die neue vierte Zone erzeugt.
Ersatztext (Zeile): „Beim Vertragsschluss mit dem Handwerksbetrieb tritt Ravelin für die Gemeinschaft auf; ihre Vertretungsmacht gegenüber Dritten ist nicht beschränkbar → Verwalter“.

### mittel

**M1 · Q-4.2-33, Szenario und Zeilen 7 und 8 (Fahrradabstellanlage, Vertragspartnerin, Gemeinschaftsvermögen haftet)**
Problem: Die erste Zeile beschließt mit „der Mehrheit der abgegebenen Stimmen“, also einfacher Mehrheit. Nach der Theorie (§ 21 Abs. 3) tragen bei einer baulichen Veränderung ohne qualifizierte Mehrheit nur die Zustimmenden die Kosten. Dass dann die Rechnung der Baufirma eine Verbindlichkeit ist, „für die das Gemeinschaftsvermögen haftet“, ist aus dem Kurs nicht gedeckt und rechtlich unsicher (Kostenverteilung innen gegenüber Haftung außen). Das Szenario beißt sich mit der Theorie.
Ersatz: Szenario auf eine reine Erhaltungsmaßnahme umstellen, deren Kosten nach der Theorie alle nach Miteigentumsanteilen tragen („Reine Erhaltungsmaßnahmen … ihre Kosten tragen alle“). Anweisung: „In der Wohnanlage Am Lindenpark soll die Dacheindeckung des Gemeinschaftseigentums erneuert werden. …“. Zeile 1: „In der Versammlung wird mit der Mehrheit der abgegebenen Stimmen darüber abgestimmt, ob das Dach erneuert wird“. Zeile 6: „Unterstützt den Verwalter, zum Beispiel durch die Begleitung bei der Vergabe des Auftrags an den Dachdeckerbetrieb“. Zeilen 7/8 entsprechend („Dachdeckerbetrieb“). Erklärung: „Baufirma“ durch „Dachdeckerbetrieb“ ersetzen, „bauliche Veränderung“ nicht erwähnen.

**M2 · Q-4.2-33, Zeile 7 · „Die Baufirma schließt den Vertrag mit der Vertragspartnerin, die durch die Verwaltung handelt“**
Problem: Tautologisch („Vertrag mit der Vertragspartnerin“), nennt das Lösungswort in der Frage, und „durch die Verwaltung handelt“ zieht gleichzeitig zum Verwalter.
Ersatztext: „Ist die Vertragspartnerin des Dachdeckerbetriebs, für die der Vertrag durch die Verwaltung geschlossen wird → Gemeinschaft der Wohnungseigentümer“ (bei Umsetzung von M1; sonst „…der Baufirma…“).

**M3 · Q-4.2-15, Zeile 4 · „Hat gegenüber den Eigentümern umfassende Auskunftspflichten → Verwalter“**
Problem: Zweite Zone möglich. Die Theorie („Verwalterpflichten“) sagt selbst, dass das Einsichtsrecht „rechtlich gegenüber der Gemeinschaft“ besteht (§ 18 Abs. 4) und die Verwaltung im Alltag nur die Unterlagen führt und Auskünfte erteilt. Im Gesetzeswortlaut richtet sich der Anspruch gegen die Gemeinschaft. Q-4.2-16 Zeile 4 ist durch „über die laufende Verwaltung“ eindeutig genug, Q-4.2-15 nicht.
Ersatztext: „Führt die Verwaltungsunterlagen und erteilt den Eigentümer:innen im Alltag die Auskünfte → Verwalter“. Gleichzeitig kann in Q-4.2-15 eine zusätzliche, aus der Theorie gedeckte Gemeinschaft-Zeile ergänzt werden (siehe M7): „Ihr gegenüber besteht das Recht jeder Eigentümerin auf Einsicht in die Verwaltungsunterlagen → Gemeinschaft der Wohnungseigentümer“.

**M4 · Theorie 4.2 „Beschlüsse“ und K-4.2-28/Q-4.2-28 sowie Q-4.2-33 Zeile 1**
Problem: Die Theorie und K-4.2-28 sagen „Die Gemeinschaft entscheidet nur über das ‚Wie‘“ bzw. „Die Gemeinschaft muss beschließen“. Mit der neuen Zone folgern Lernende danach, dass „Beschließt/Entscheidet“ zur Gemeinschaft gehört, während alle Zuordnungen „Beschließen → Eigentümerversammlung“ lauten. Ebenso Q-4.2-33 Zeile 1 („Die Wohnungseigentümer:innen stimmen … ab“) ohne „in der Versammlung“; „Wohnungseigentümer“ und „Gemeinschaft der Wohnungseigentümer“ sind für Lernende nahezu dasselbe Wort.
Ersatztext Theorie (Absatz „Beschlüsse“): „Die Eigentümerversammlung entscheidet nur über das ‚Wie‘ …“; K-4.2-28 Antwort: „Die Versammlung muss beschließen und regelt nur das ‚Wie‘ …“. Q-4.2-33 Zeile 1: „In der Versammlung wird mit der Mehrheit der abgegebenen Stimmen darüber abgestimmt, ob das Dach erneuert wird → Eigentümerversammlung“.

**M5 · Q-4.2-33, Zeilen 5 und 6**
Problem: Zeile 5 („Der Wirtschaftsplan wird vor der Abstimmung geprüft …“) passt nicht zum Szenario: § 29 Abs. 2 verlangt die Prüfung vor den Beschlüssen über Wirtschaftsplan und Jahresabrechnung, nicht vor einem Beschluss zu einer Einzelmaßnahme. Zeile 6 („wird auf Wunsch begleitet“) ist im Passiv ohne Handelnde; auch der Verwalter begleitet die Vergabe (er vergibt sie ja).
Ersatztext Zeile 5: „Prüft den Wirtschaftsplan, in dem die Kosten berücksichtigt werden, und nimmt vor dem Beschluss dazu Stellung → Verwaltungsbeirat“. Zeile 6 siehe M1.

**M6 · Q-4.4-16, Zeile 2 · „Kosten der Schornsteinreinigung → Umlagefähig (ohne Heizung und Warmwasser)“**
Problem: Zweite Zone möglich. BetrKV § 2 Nr. 12 erfasst die Schornsteinreinigung nur, „soweit sie nicht bereits als Kosten nach Nummer 4 Buchstabe a berücksichtigt sind“ (Betrieb der Heizungsanlage einschließlich Abgasanlage und Messungen); in der Praxis stehen Kehr- und Messgebühren in der Heizkostenabrechnung. Die Theorie führt die Schornsteinreinigung zwar als eigene Katalogposition, sagt aber nicht, in welcher Abrechnung sie landet.
Ersatztext: „Kosten der Beleuchtung des Treppenhauses → Umlagefähig (ohne Heizung und Warmwasser)“ (Theorie nennt „der Beleuchtung“; BetrKV Nr. 11). Erklärung: „Schornsteinreinigung“ durch „Beleuchtung“ ersetzen.

**M7 · Zonenbesetzung „Gemeinschaft der Wohnungseigentümer“ in Q-4.2-14 bis -17**
Problem: Die vierte Zone hat in den vier geänderten Aufgaben nur je eine Zeile (Verwalter drei). Das macht sie zur „Restzone“ und die Lösung erratbar („die eine Zeile, die sonst nirgends passt“). Außerdem sind zwei Gemeinschaft-Zeilen wortgleich in zwei Aufgaben (Q-4.2-14/-32 „Ist Vertragspartnerin von Handwerksbetrieben, Versorgern und Versicherern“; Q-4.2-17/-34 „Ist die Anspruchsgegnerin …“), Q-4.2-14 und -32 sind zudem beide leicht/erinnern und weitgehend deckungsgleich.
Ersatztext (je eine zusätzliche, aus der Theorie belegte Zeile): Q-4.2-15: „Ihr gegenüber richtet sich das Einsichtsrecht jeder Eigentümerin in die Verwaltungsunterlagen → Gemeinschaft der Wohnungseigentümer“. Q-4.2-17: „Muss sich das Verhalten ihrer Verwaltung zurechnen lassen und kann bei der Verwaltung Regress nehmen → Gemeinschaft der Wohnungseigentümer“. Q-4.2-16: „Kann ihre Verbindlichkeiten nur mit dem Gemeinschaftsvermögen begleichen; über dieses Vermögen findet kein Insolvenzverfahren statt → Gemeinschaft der Wohnungseigentümer“ (Zeile 7 dann auf die Rechnung beschränkt lassen). Q-4.2-14 kann durch Q-4.2-32 abgedeckt gelten; dort eine der beiden Zeilen „Vertragspartnerin“ in Q-4.2-14 gegen „Haftet mit dem Gemeinschaftsvermögen“ tauschen.

**M8 · Q-5.4-14 bis -17 · Anweisungen ohne Fassungsangabe**
Problem: Die Aufgaben sind nur nach DIN 276 in der Fassung 2018 eindeutig. Nach der Fassung 2008 (auf die die HOAI verweist, Theorie nennt das) gehören Finanzierungskosten zur KG 700 (dort KG 760), und KG 200 und KG 500 heißen anders. Die Anweisungen sagen nur „der DIN 276“; Lernende, die mit der HOAI-Fassung arbeiten, haben bei „Finanzierungskosten“ zwei richtige Zonen (KG 700 und KG 800). Q-5.4-17 Erklärung behauptet zudem absolut „sind keine Baunebenkosten (KG 700)“.
Ersatztext: In allen vier Anweisungen „… der Kostengruppe der DIN 276 (Fassung 2018) zu.“; Q-5.4-17 Erklärung: „… eine eigene Hauptgruppe (KG 800) und sind in dieser Fassung keine Baunebenkosten (KG 700); die Fassung 2008, auf die die HOAI verweist, ordnet sie noch den Baunebenkosten zu; die Abgrenzung ist aus der Theorie abgeleitet …“. Für die Aussage zur Fassung 2008 gilt: ist nicht Kurstext, deshalb als Fachwissen kennzeichnen oder weglassen, aber die Anweisung muss „(Fassung 2018)“ nennen.

**M9 · Q-5.4-04 (unverändert) · „Vier der sieben Hauptkostengruppen der DIN 276 (5.4.1)“, „KG 500 ↔ Außenanlagen“**
Problem: Die Theorie spricht jetzt von acht Hauptgruppen (sieben plus KG 800); „sieben Hauptkostengruppen“ widerspricht dem Absatz, die Bezeichnung „Außenanlagen“ weicht vom Zonen- und Theorie-Wortlaut „Außenanlagen und Freiflächen“ ab.
Ersatztext: Erklärung „Vier der Hauptkostengruppen der DIN 276 (5.4.1).“; Zeile „KG 500 ↔ Außenanlagen und Freiflächen“.

### niedrig

**L1 · Gendern.** Ungegendert geblieben in geänderten Zeilen: Q-4.2-16 Zeile 1 „wenige Eigentümer“ → „wenige Eigentümer:innen“; Q-4.2-17 Zeile 3 „aller Eigentümer“ → „aller Eigentümer:innen“; Q-4.4-15 Zeile 7 „den der Mieter nach seinem erfassten Verbrauch trägt“ → „den ein:e Mieter:in nach dem erfassten Verbrauch trägt“; Q-4.4-15 Erklärung „vom Mieter genutzt wird“ → „von den Mieter:innen genutzt wird“; Q-4.4-16 Anweisung „Ein Mieter ruft bei Ravelin an“ → „Eine Mieterin ruft bei Ravelin an“, Zeile 6 „dem einzelnen Mieter zugerechnet“ → „der einzelnen Mietpartei zugerechnet“, Zeile 7 „auf die Mieter verteilt“ → „auf die Mieter:innen verteilt“; Q-4.4-17 Erklärung „hat der Mieter laut Kurs ein Kürzungsrecht“ → „haben die Mieter:innen laut Kurs ein Kürzungsrecht“. (Die Theorie 4.4 selbst schreibt noch generisches Maskulinum; dort als eigener Schritt angleichen.)

**L2 · Q-4.2-17 Erklärung:** Tippfehler „… Erleichterung für die Gemeinschaft) ;“ (Leerzeichen vor dem Semikolon, Klammer ohne Anfang) und „Abgeleitet sind die Zuordnung“. Ersatztext: „Abgeleitet ist die Zuordnung der Abberufung zur Versammlung (die Theorie nennt die Abberufungsmöglichkeit als Erleichterung für die Gemeinschaft); die Aussagen zum Verwaltungsbeirat …“.

**L3 · Q-4.2-14 Zeile 3 / Q-4.2-16 Zeile 3 (Frequenz im Aufgabentext).** „mindestens einmal jährlich“ bzw. „die jährliche Versammlung“ ist eine Fristangabe im Aufgabentext; für die Zuordnung unnötig. Ersatztext: „Beruft die Versammlung ein und bestimmt die Tagesordnung der Einladung → Verwalter“ bzw. „Beruft die ordentliche Versammlung mit Ort, Zeit und Tagesordnung in Textform ein, solange …“.

**L4 · Q-4.2-14 Anweisung.** „… wirken zusammen; sie handeln für die Gemeinschaft der Wohnungseigentümer“: Der Beirat handelt nicht „für“ die Gemeinschaft, er unterstützt und überwacht den Verwalter. Ersatztext: „… wirken in der Verwaltung zusammen; die Gemeinschaft der Wohnungseigentümer ist als Verband selbst eine eigene Zone.“ Die Darstellung „Organ oder Verband“ ist sonst sachlich richtig (§ 9a Abs. 1: Gemeinschaft kann Rechte erwerben, Verbindlichkeiten eingehen, klagen und verklagt werden; Q-4.2-32 Erklärung stellt den Unterschied korrekt dar).

**L5 · Q-4.2-34 Zeile 3 und Erklärung.** Der Gesetzeswortlaut (§ 27 Abs. 1 Nr. 2) nennt „Maßnahmen zur Wahrung einer Frist oder zur Abwendung eines Nachteils“, nicht ausdrücklich die „anwaltliche Vertretung“; das ist Auslegung (Theorie „Anfechtung von Beschlüssen“). Ersatztext in der Erklärung: „… beauftragt die Verwaltung, soweit zur Fristwahrung erforderlich, eine anwaltliche Vertretung (aus § 27 Abs. 1 Nr. 2 abgeleitet; die Eigentümer:innen können die Befugnis einschränken oder erweitern)“.

**L6 · Q-4.4-15, Zeilen 6 und 7.** Beide Zonen-3-Zeilen sind fast bedeutungsgleich (erfasster Verbrauch), „Wärmeverbrauch“ ist keine Kostenart, und anders als in den Nachbaraufgaben fehlt eine Warmwasserzeile. Ersatztext Zeile 6: „Warmwasserkosten, die über Warmwasserzähler erfasst und nach Verbrauch verteilt werden“.

**L7 · Q-4.4-14 bis -17, Anweisungen:** „gehören hier nur in die dritte Zone; die erste Zone gilt …“ verweist über die Reihenfolge der Zonen. Besser mit den Zonennamen: „… gehören hier nur zu ‚Heiz- und Warmwasserkosten (Heizkostenverordnung)‘; die Zone ‚Umlagefähig (ohne Heizung und Warmwasser)‘ gilt für die übrigen umlagefähigen Kosten.“

**L8 · Q-5.4-17, Zeilen 9 (und 8).** „Die Bauleitung überwacht die Ausführung auf der Baustelle“ beschreibt eine Tätigkeit, keine Kostenposition. Ersatztext: „Die Kosten der Bauleitung fallen an → KG 700 Baunebenkosten“ (wie Q-5.4-15 Zeile 9).

**L9 · Theorie 5.4, erster Absatz (DIN 276).** Die Glättung ist besser als vorher, bleibt aber leicht zirkulär: „(Fassung Dezember 2018 …) zunächst sieben Kostengruppen … Als achte Hauptgruppe kommt in der Fassung 2018 … hinzu“. Und das Rechenbeispiel schreibt noch „KG 500 Außenanlagen“. Ersatztext: „… unterscheidet die DIN 276 (Fassung Dezember 2018; …) acht Hauptgruppen: KG 100 … KG 700 Baunebenkosten (…). Die Gruppen 100 bis 700 gab es in ähnlicher Form schon in der Fassung 2008, neu ist seit der Fassung 2018 die eigene KG 800 Finanzierung (Finanzierungskosten während der Bauzeit); Ravelin führt sie …“. Rechenbeispiel: „KG 500 Außenanlagen und Freiflächen 100.000 €“.

**L10 · Architekturplanung Abschnitt 13, älterer Eintrag (Zeile 3148, „Zonenobergrenze 7 genau erreicht“).** Durch den neuen Eintrag (Zeile 577) überholt; bei Gelegenheit mit „(überholt, siehe Eintrag P-BD)“ kennzeichnen, damit das Protokoll nicht widerspricht.

## Duell `game-kennzahlen-duell-immobilien-aehnlich.ts`: kein Befund

Die 14 geänderten Stellen sind nach der Hausregel (Doppelpunkt) korrekt gesetzt; Singularformen („die Vermieter:in“, „die Nachweismakler:in“, „der Auftraggeber:in“) entsprechen dem Gebrauch in der aktuellen Theorie 6.1 (Arbeitsstand: „die Auftraggeber:in“, „die Makler:in“). Zusammensetzungen und neutrale Formen sind zu Recht stehen geblieben („Eigentümerversammlung“, „Maklertyp“, „Makler- oder Vermarktungsbegriff“, „Verbandsmitglieder“, „Gewerbetreibende“, „Angestellte“, „Bauwilligen“); eine Suche nach ungegenderten Personenbezeichnungen ergibt keinen weiteren Treffer. Inhalte, Reihenfolge und richtige Antworten sind unverändert und ohne Widerspruch zu den geänderten Themen 4.2, 4.4 und 5.4; keine Zahlenwerte oder Fristen im Fragetext.

## Was geprüft und in Ordnung ist

- **WEG:** Zuordnung der übrigen Zeilen von Q-4.2-14/-15/-17/-32/-34 ist durch Theorie und Gesetz getragen (§ 24 Einberufung durch die Verwaltung; § 28 Wirtschaftsplan und Abrechnung durch die Verwaltung; § 29 Abs. 2 Unterstützung, Überwachung, Prüfung; § 29 Abs. 1 Beirat nicht vorgeschrieben, im Gesetz bestellbar; § 44 Abs. 2 Klage gegen die Gemeinschaft; § 9a Abs. 3 Gemeinschaftsvermögen, § 9a Abs. 5 keine Insolvenz). Die Darstellung der Gemeinschaft als „Verband, nicht Organ“ ist sachlich richtig (Q-4.2-32). Schwierigkeit/Bloom plausibel (Q-4.2-32 leicht/erinnern, -33 mittel/anwenden, -34 schwer/analysieren); keine Beträge im Aufgabentext.
- **Betriebskosten:** Die Zonennamen sind trennscharf; Heiz- und Warmwasserkosten (BetrKV Nr. 4 bis 6, HeizkostenV) sind sauber von „Kosten der Wasserversorgung“ (Nr. 2, Zone 1) abgegrenzt, Reparatur der Heizungsanlage (Instandsetzung) ist als Nicht-umlagefähig eindeutig durch die Theorie („Reparatur der Anlage nicht“). Alle Zone-1-Zeilen (Grundsteuer, Straßenreinigung/Müll, Gartenpflege, Aufzugsbetrieb, Versicherung, Ungezieferbekämpfung, Hauswart, Gebäudereinigung) stehen im Katalog (Nr. 1, 8, 10, 7, 13, 9, 14, 9).
- **Kostengruppen:** Zuordnungen KG 100 bis 800 sind nach Theorie und DIN 276:2018 richtig; Zonen gleichmäßig; Erklärungen kennzeichnen die Ableitungen (Kunstwerk/Mobiliar zu KG 600, KG 800 getrennt von Baunebenkosten). Keine Beträge im Aufgabentext.

## Reihenfolge der Umsetzung (Empfehlung)

H1, M1 bis M5 (alle in 4.2, Importvergleich meldet nur Textänderung, keine Lösungsänderung außer Zonenzeilen in -33), M6, M8 und M9; danach die niedrigen Punkte gesammelt mit der Gender-Angleichung der Theorie 4.4.
