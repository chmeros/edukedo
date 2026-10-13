# Aufgaben zu den neuen Theorieabschnitten in Thema 10.3 (Technischer Fachwirt)

Stand 13.10.2026. Entwurf zur Entscheidung des Projektleiters, rechtsnaher Inhalt (R4), nichts in content/ eingespielt.

Geprüft (unabhängige KI-Prüfung am 13.10.2026, keine Rechtsberatung): Bericht in `docs/entwuerfe/pruefung-p8-items-10-3.md`. Eingearbeitet sind Korrekturen an Q-10.3-19, -21, -25, -27, -29 (ersetzt), -30, -35, -39, -40, -42, -44, K-10.3-37 und dem Glossar-Eintrag Betriebsanweisung; Umfang unverändert (26 Karteikarten, 26 Quizfragen, 12 Glossar-Vorschläge).

Ziel: Karteikarten, Quizfragen und Glossar-Vorschläge zu den zehn neuen Theorieabschnitten in `content/technischer-fachwirt/hq3/10.3-arbeitsschutz-arbeitssicherheit.md`. Jede Aufgabe stützt sich nur auf den dortigen Theorietext. Entsprechend der Vorgabe des Projektleiters fragt keine Aufgabe einen Betrag, eine Frist, einen Grenz- oder Schwellenwert (Dezibel, Prozent, Tage, Jahre, Personenzahlen) oder eine Strafe ab; die Zahlen des Theorietextes bleiben ohne Aufgabe. Die Aufgaben zu „Einstufung und Kennzeichnung: CLP-Verordnung und Sicherheitsdatenblatt“ beschränken sich auf Kernbegriffe (CLP/GHS, Signalwort, Sicherheitsdatenblatt als Informationsquelle, Kennzeichnung im Betrieb); Etikett-Einzelheiten (Symbole, Farben, H- und P-Sätze, Gliederung des Datenblatts) werden nicht abgefragt, weil sie auf nicht am Primärtext gelesenen Quellen beruhen.

Umfang: 26 Karteikarten (K-10.3-22 bis K-10.3-47), 26 Quizfragen (Q-10.3-19 bis Q-10.3-44), 12 Glossar-Vorschläge. Alle Blöcke wurden mit `parseKarteikarten` und `parseQuizBlock` aus `apps/api/src/db/content-parser.ts` geprüft, die Glossar-Blöcke mit `parseGlossar` samt den Regeln aus `glossar-content.test.ts` (Länge, kein Markdown, Abschnittsüberschrift der Theorie vorhanden).

## Übersicht

| Theorieabschnitt in 10.3 | Karteikarten | Quizfragen (Typ) |
|---|---|---|
| Unterweisung, Pflichtenübertragung und Pflichten der Beschäftigten | K-10.3-22, K-10.3-23, K-10.3-24 | Q-10.3-19 (Multiple Choice), Q-10.3-20 (Wahr/Falsch), Q-10.3-21 (Mehrfachauswahl) |
| Gefahrstoffverordnung im Überblick | K-10.3-25, K-10.3-26, K-10.3-27 | Q-10.3-22 (Mehrfachauswahl), Q-10.3-23 (Sortieren), Q-10.3-24 (Zuordnung) |
| Einstufung und Kennzeichnung: CLP-Verordnung und Sicherheitsdatenblatt | K-10.3-28, K-10.3-29 | Q-10.3-25 (Multiple Choice), Q-10.3-26 (Wahr/Falsch), Q-10.3-27 (Multiple Choice) |
| Gefahrstoffe in der Fertigung: Kühlschmierstoffe, Oberflächenverfahren und Wärmebehandlung | K-10.3-30, K-10.3-31 | Q-10.3-28 (Zuordnung), Q-10.3-29 (Wahr/Falsch) |
| Lärm und Vibrationen | K-10.3-32, K-10.3-33 | Q-10.3-30 (Zuordnung), Q-10.3-31 (Mehrfachauswahl) |
| Brandschutz im Betrieb | K-10.3-34, K-10.3-35, K-10.3-36 | Q-10.3-32 (Zuordnung), Q-10.3-33 (Wahr/Falsch), Q-10.3-34 (Lückentext) |
| Erste Hilfe und Meldung von Arbeitsunfällen | K-10.3-37, K-10.3-38, K-10.3-39 | Q-10.3-35 (Multiple Choice), Q-10.3-36 (Mehrfachauswahl) |
| Betriebssicherheitsverordnung: Pflichten beim Verwenden von Arbeitsmitteln | K-10.3-40, K-10.3-41, K-10.3-42 | Q-10.3-37 (Zuordnung), Q-10.3-38 (Wahr/Falsch), Q-10.3-39 (Sortieren) |
| Sicherheit an Maschinen und Anlagen in der Praxis | K-10.3-43, K-10.3-44, K-10.3-45 | Q-10.3-40 (Mehrfachauswahl), Q-10.3-41 (Multiple Choice), Q-10.3-42 (Kurzantwort) |
| Prüfung elektrischer Anlagen und Betriebsmittel (DGUV Vorschrift 3) | K-10.3-46, K-10.3-47 | Q-10.3-43 (Zuordnung), Q-10.3-44 (Multiple Choice) |

Typenmix der Quizfragen: 6 Multiple Choice, 5 Mehrfachauswahl, 5 Wahr/Falsch (3 wahr, 2 falsch), 6 Zuordnung, 2 Sortieren, 1 Kurzantwort, 1 Lückentext.

## Karteikarten (einzufügen am Ende des Abschnitts „## Karteikarten“ in `hq3/10.3-arbeitsschutz-arbeitssicherheit.md`)

#### K-10.3-22
**Frage:** Worauf muss sich eine Unterweisung nach § 12 ArbSchG beziehen, und wann ist sie nötig?
**Antwort:** Sie ist eigens auf den Arbeitsplatz oder den Aufgabenbereich ausgerichtet, findet während der Arbeitszeit statt und ist vor Aufnahme der Tätigkeit nötig, zum Beispiel bei der Einstellung, bei Veränderungen im Aufgabenbereich oder bei neuen Arbeitsmitteln oder Technologien.
`tags: unterweisung, arbschg` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-23
**Frage:** Was ist eine Pflichtenübertragung nach § 13 Abs. 2 ArbSchG, und woran ist sie gebunden?
**Antwort:** Der Arbeitgeber beauftragt zuverlässige und fachkundige Personen schriftlich, ihm obliegende Aufgaben nach dem Arbeitsschutzgesetz in eigener Verantwortung wahrzunehmen. Sie ist an die Schriftform und an die Eignung (zuverlässig, fachkundig) gebunden.
`tags: pflichtenuebertragung, arbschg, verantwortung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-24
**Frage:** Was bewirkt eine wirksame Pflichtenübertragung, und was bewirkt sie nicht?
**Antwort:** Die Verantwortung für die übertragenen Aufgaben wird auf die beauftragte Person verlagert. Der Arbeitgeber wird aber nicht vollständig entlastet: Er bleibt für die geeignete Organisation des Arbeitsschutzes sowie für die sorgfältige Auswahl und Überwachung der Beauftragten verantwortlich. Eine bloße Anweisung ist keine Pflichtenübertragung.
`tags: pflichtenuebertragung, verantwortung, arbschg` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-10.3-25
**Frage:** Was zählt nach der Gefahrstoffverordnung zu den Gefahrstoffen, und warum sind es mehr als gekennzeichnete Chemikalien?
**Antwort:** Neben gefährlichen Stoffen und Gemischen auch explosionsfähige Stoffe, Gemische und Erzeugnisse, solche, aus denen bei Herstellung oder Verwendung gefährliche Stoffe entstehen oder freigesetzt werden (etwa Dämpfe oder Nebel), nicht eingestufte, aber gefährdende Stoffe sowie alle Stoffe mit festgelegtem Arbeitsplatzgrenzwert.
`tags: gefahrstoffe, gefstoffv` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-26
**Frage:** Welche Rangfolge der Schutzmaßnahmen gilt bei Tätigkeiten mit Gefahrstoffen?
**Antwort:** Zuerst die Substitution (Ersatz durch weniger gefährliche Stoffe oder Verfahren), dann geeignete Verfahren, dann technische Maßnahmen an der Gefahrenquelle zusammen mit organisatorischen Maßnahmen, zuletzt individuelle Maßnahmen wie persönliche Schutzausrüstung. Das entspricht im Kern der STOP-Rangfolge; die Verordnung selbst nennt die Kürzel nicht.
`tags: gefahrstoffe, substitution, stop` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-27
**Frage:** Was enthält die Betriebsanweisung bei Gefahrstoffen mindestens, und wie hängt sie mit der Unterweisung zusammen?
**Antwort:** Sie wird den Beschäftigten schriftlich zugänglich gemacht und enthält Informationen zu den Gefahrstoffen am Arbeitsplatz, zu Vorsichtsmaßregeln (auch Hygiene und Schutzausrüstung) und zum Verhalten bei Störungen, Unfällen und Notfällen. Anhand der Betriebsanweisung werden die Beschäftigten mündlich unterwiesen; Inhalt und Zeitpunkt werden schriftlich festgehalten und von den Unterwiesenen unterschrieben.
`tags: gefahrstoffe, betriebsanweisung, unterweisung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-28
**Frage:** Wofür steht CLP, und was regelt die CLP-Verordnung?
**Antwort:** CLP steht für Classification, Labelling and Packaging. Die Verordnung regelt in der EU einheitlich die Einstufung, Kennzeichnung und Verpackung gefährlicher Stoffe und Gemische und überträgt das weltweit harmonisierte System der Vereinten Nationen (GHS) in EU-Recht.
`tags: clp, ghs, kennzeichnung` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-10.3-29
**Frage:** Welche Bedeutung hat das Sicherheitsdatenblatt (SDB) für den Betrieb?
**Antwort:** Der Lieferant stellt es für gefährliche Stoffe und Gemische bereit. Es ist eine wichtige Informationsquelle und Grundlage der Gefährdungsbeurteilung und der Betriebsanweisung; die Beschäftigten müssen Zugang zu den Sicherheitsdatenblättern der Stoffe haben, mit denen sie arbeiten.
`tags: sicherheitsdatenblatt, gefahrstoffe` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-10.3-30
**Frage:** Welche Gefährdungsarten stehen bei Kühlschmierstoffen in der Zerspanung im Vordergrund?
**Antwort:** Die Haut (der Dauerkontakt mit wässrigen Gemischen kann als Feuchtarbeit zählen), das Einatmen von Nebel und Dämpfen an der Maschine und bei Ölen auch Brand. Welche Stoffe mit welcher Einstufung eingesetzt werden, ergibt sich aus dem Sicherheitsdatenblatt und der Gefährdungsbeurteilung.
`tags: kuehlschmierstoffe, gefahrstoffe, gefaehrdungsart` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-31
**Frage:** Was ist bei Kühlschmierstoffen und Korrosionsschutzmitteln nach der Gefahrstoffverordnung besonders geregelt?
**Antwort:** Kühlschmierstoffe, denen nitrosierende Stoffe als Komponenten zugesetzt wurden, sind verboten, und für bestimmte Korrosionsschutzmittel gelten Einschränkungen. Der Arbeitgeber stellt das im Rahmen der Gefährdungsbeurteilung sicher.
`tags: kuehlschmierstoffe, korrosionsschutz, gefstoffv` · `schwierigkeit: schwer` · `bloom: erinnern`

#### K-10.3-32
**Frage:** Was ist ein Auslösewert in der Lärm- und Vibrations-Arbeitsschutzverordnung?
**Antwort:** Ein festgelegter Wert, bei dem bestimmte Pflichten des Arbeitgebers einsetzen. Beim Lärm gibt es untere und obere Auslösewerte; die dämmende Wirkung eines persönlichen Gehörschutzes wird bei der Anwendung der Auslösewerte nicht berücksichtigt.
`tags: laerm, ausloesewert, vibrationen` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-10.3-33
**Frage:** Wie unterscheiden sich die Pflichten zum Gehörschutz beim unteren und beim oberen Auslösewert?
**Antwort:** Werden die unteren Auslösewerte trotz anderer Maßnahmen nicht eingehalten, muss der Arbeitgeber geeigneten Gehörschutz zur Verfügung stellen. Erreicht oder überschreitet die Exposition einen oberen Auslösewert, muss er dafür sorgen, dass die Beschäftigten den Gehörschutz auch verwenden; Arbeitsbereiche, in denen ein oberer Auslösewert überschritten werden kann, sind als Lärmbereiche zu kennzeichnen.
`tags: laerm, gehoerschutz, laermbereich` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-34
**Frage:** Was gilt für Verkehrswege, Fluchtwege und Notausgänge im Betrieb?
**Antwort:** Sie müssen ständig freigehalten werden, damit sie jederzeit benutzbar sind. Fluchtwege führen auf möglichst kurzem Weg ins Freie oder in einen gesicherten Bereich und sind dauerhaft zu kennzeichnen; Türen im Verlauf von Fluchtwegen müssen sich von innen ohne besondere Hilfsmittel leicht öffnen lassen.
`tags: brandschutz, fluchtwege, arbstaettv` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-10.3-35
**Frage:** Was ist eine Brandschutzordnung, und wie ist sie nach DIN 14096 gegliedert?
**Antwort:** Eine von der ASR A2.2 beispielhaft genannte Form, in der der Arbeitgeber organisatorische Maßnahmen gegen Entstehungsbrände und Verhaltensregeln im Brandfall festlegt und dokumentiert. Teil A ist der Aushang für alle Personen im Gebäude, Teil B richtet sich an alle Beschäftigten, Teil C an Personen mit besonderen Brandschutzaufgaben.
`tags: brandschutz, brandschutzordnung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-36
**Frage:** Worin unterscheiden sich Brandschutzhelfer:innen und Brandschutzbeauftragte?
**Antwort:** Brandschutzhelfer:innen sind Beschäftigte, die für Aufgaben der Brandbekämpfung bei Entstehungsbränden benannt sind, unterwiesen werden und den Umgang mit Löscheinrichtungen üben. Brandschutzbeauftragte beraten und unterstützen den Arbeitgeber in Fragen des betrieblichen Brandschutzes.
`tags: brandschutz, brandschutzhelfer, brandschutzbeauftragte` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-37
**Frage:** Wie müssen Ersthelfer:innen im Betrieb ausgebildet sein?
**Antwort:** Sie müssen bei einer vom Unfallversicherungsträger zur Ausbildung ermächtigten Stelle ausgebildet sein; gleichgestellt sind eine sanitäts- oder rettungsdienstliche Ausbildung und eine abgeschlossene Ausbildung in einem Gesundheitsberuf. Sie werden in der Regel in festen Zeitabständen fortgebildet; beim Umgang mit Gefahrstoffen kann eine zusätzliche Aus- und Fortbildung nötig sein.
`tags: erste-hilfe, ersthelfer, dguv-vorschrift-1` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-38
**Frage:** Wie wird Erste Hilfe im Betrieb dokumentiert, und wozu dient das?
**Antwort:** Jede Erste-Hilfe-Leistung wird dokumentiert, in der Praxis im Verbandbuch oder in einer elektronischen Entsprechung, und vertraulich behandelt. Die Dokumentation hilft, einen Unfall später nachzuweisen, und liefert Erkenntnisse für die Gefährdungsbeurteilung.
`tags: erste-hilfe, verbandbuch, dokumentation` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-10.3-39
**Frage:** Wer erstattet die Unfallanzeige an wen, und wer wirkt dabei mit?
**Antwort:** Der Arbeitgeber zeigt meldepflichtige Unfälle dem Unfallversicherungsträger an (bei Vantera der zuständigen Berufsgenossenschaft). Die Anzeige ist vom Betriebs- oder Personalrat mitzuunterzeichnen; die Fachkraft für Arbeitssicherheit und die Betriebsärzt:in sind über jede Anzeige zu informieren.
`tags: unfallanzeige, arbeitsunfall, meldepflicht` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-40
**Frage:** Was regelt die Betriebssicherheitsverordnung (BetrSichV), und wer ist ihr Adressat?
**Antwort:** Sie regelt Sicherheit und Gesundheitsschutz bei der Verwendung von Arbeitsmitteln einschließlich der überwachungsbedürftigen Anlagen. Adressat ist der Arbeitgeber (im Sprachgebrauch auch „Betreiber“). Die Pflichten der Hersteller gehören dagegen zum Produktsicherheitsrecht.
`tags: betrsichv, arbeitsmittel, arbeitgeber` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-41
**Frage:** Was erfasst die Gefährdungsbeurteilung für Arbeitsmittel, und wer darf sie durchführen?
**Antwort:** Sie erfasst die Gefährdungen durch das Arbeitsmittel selbst, die Arbeitsumgebung und die Arbeitsgegenstände und sollte schon vor Auswahl und Beschaffung beginnen. Sie darf nur von fachkundigen Personen durchgeführt werden. Herstellerangaben, Betriebsanleitung und CE-Kennzeichnung sind wichtige Informationen, ersetzen die Beurteilung aber nicht.
`tags: betrsichv, gefaehrdungsbeurteilung, arbeitsmittel` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-42
**Frage:** Wer prüft Arbeitsmittel, und worin unterscheiden sich befähigte Person und zugelassene Überwachungsstelle (ZÜS)?
**Antwort:** Arbeitsmittel allgemein prüft eine zur Prüfung befähigte Person; sie besitzt durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit die nötigen Kenntnisse und unterliegt bei der Prüfung keinen fachlichen Weisungen des Arbeitgebers. Überwachungsbedürftige Anlagen prüft grundsätzlich eine ZÜS; wo der Anhang 2 der Verordnung es vorsieht, genügt eine befähigte Person.
`tags: betrsichv, befaehigte-person, zues, pruefung` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-10.3-43
**Frage:** Worin unterscheiden sich trennende und nicht trennende Schutzeinrichtungen?
**Antwort:** Trennende Schutzeinrichtungen sperren den Zugriff körperlich, zum Beispiel eine feste Verkleidung oder eine verriegelte Schutztür. Nicht trennende erkennen die Annäherung oder verlangen eine bestimmte Bedienung und setzen die gefährliche Bewegung still oder verhindern sie, zum Beispiel Lichtschranke, Lichtvorhang und Zweihandschaltung.
`tags: maschinensicherheit, schutzeinrichtung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.3-44
**Frage:** Was ist eine Sicherheitsfunktion?
**Antwort:** Eine Funktion, die als Schutzmaßnahme ein Risiko beseitigt oder, falls das nicht möglich ist, verringert und deren Ausfall das Risiko erhöhen könnte, zum Beispiel das Stillsetzen der Roboterzelle beim Öffnen einer verriegelten Schutztür.
`tags: maschinensicherheit, sicherheitsfunktion` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-45
**Frage:** Welche Anforderungen stellt die Betriebssicherheitsverordnung an das Steuern einer Maschine und an den Not-Halt?
**Antwort:** Arbeitsmittel dürfen nur absichtlich gestartet werden können, der Befehl zum Stillsetzen hat Vorrang vor dem Befehl zum Ingangsetzen, und Befehlseinrichtungen müssen erkennbar, außerhalb des Gefahrenbereichs erreichbar und gegen unbeabsichtigtes oder unbefugtes Betätigen gesichert sein. Kraftbetriebene Arbeitsmittel brauchen eine schnell erreichbare, auffällig gekennzeichnete Not-Halt-Einrichtung („Notbefehlseinrichtung“); darauf darf nur verzichtet werden, wenn sie die Gefährdung nicht mindern würde.
`tags: maschinensicherheit, steuerung, not-halt, betrsichv` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-10.3-46
**Frage:** Wer darf elektrische Anlagen und Betriebsmittel errichten, ändern und instand halten, und wer gilt als Elektrofachkraft?
**Antwort:** Das ist Sache einer Elektrofachkraft oder geschieht unter deren Leitung und Aufsicht. Elektrofachkraft ist, wer aufgrund fachlicher Ausbildung, Kenntnissen und Erfahrungen sowie Kenntnis der einschlägigen Bestimmungen die übertragenen Arbeiten beurteilen und mögliche Gefahren erkennen kann; nachgewiesen wird das in der Regel durch eine abgeschlossene elektrotechnische Ausbildung.
`tags: dguv-vorschrift-3, elektrofachkraft` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.3-47
**Frage:** Wann verlangt die DGUV Vorschrift 3 Prüfungen elektrischer Anlagen, und wie unterscheiden sich ortsfeste und ortsveränderliche Betriebsmittel?
**Antwort:** Geprüft wird vor der ersten Inbetriebnahme, nach Änderung oder Instandsetzung vor der Wiederinbetriebnahme und in bestimmten Zeitabständen, durch eine Elektrofachkraft oder unter deren Leitung und Aufsicht. Ortsfeste Betriebsmittel sind fest angebracht oder zu schwer, um leicht bewegt zu werden; ortsveränderliche werden während des Betriebs bewegt oder sind leicht versetzbar.
`tags: dguv-vorschrift-3, pruefung, betriebsmittel` · `schwierigkeit: mittel` · `bloom: verstehen`

## Quiz (anzuhängen am Ende der Datei)

#### Q-10.3-19 · Multiple Choice
**Frage:** Die Geschäftsführung der Vantera weist die Schichtleitung an, die Unterweisung an einer neuen Maschine durchzuführen. Was unterscheidet diese bloße Anweisung von einer Pflichtenübertragung nach § 13 Abs. 2 ArbSchG?
- [ ] Bei der Anweisung geht die Verantwortung auf die Schichtleitung über, bei der Pflichtenübertragung bleibt sie vollständig bei der Geschäftsführung.
- [ ] Die Pflichtenübertragung kann formlos mündlich erfolgen, die Anweisung muss dagegen zwingend schriftlich und unterzeichnet erfolgen.
- [x] Die Pflichtenübertragung ist an die Schriftform und an die Eignung (zuverlässig, fachkundig) gebunden; eine bloße Anweisung ist keine.
- [ ] Es gibt keinen rechtlichen Unterschied: Jede Anweisung an eine Führungskraft ist bereits eine Pflichtenübertragung, sobald sie ausgeführt wird.
**Erklärung:** Die Pflichtenübertragung ist mehr als die Anweisung, eine Aufgabe auszuführen: Sie muss schriftlich erfolgen, und die beauftragte Person muss zuverlässig und fachkundig sein. Typischer Fehler: Anweisung und Pflichtenübertragung gleichzusetzen oder die Rollen von Form und Verantwortung zu vertauschen.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-10.3-20 · Wahr/Falsch
**Aussage:** Auch nach einer wirksamen schriftlichen Pflichtenübertragung an die Produktionsleitung bleibt die Geschäftsführung der Vantera für die Organisation des Arbeitsschutzes sowie für die Auswahl und Überwachung der Beauftragten verantwortlich.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Verantwortung für die übertragenen Aufgaben wird auf die beauftragte Person verlagert, der Arbeitgeber wird aber nicht vollständig entlastet. Typischer Fehler: Die Pflichtenübertragung als vollständige Entlastung der Geschäftsführung zu verstehen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-21 · Mehrfachauswahl
**Frage:** Welche Pflichten haben Beschäftigte nach den Regeln zur Mitwirkung am Arbeitsschutz?
- [ ] Die Gefährdungsbeurteilung für den eigenen Arbeitsplatz selbst durchführen
- [x] Maschinen, Schutzvorrichtungen und die zur Verfügung gestellte persönliche Schutzausrüstung bestimmungsgemäß verwenden
- [x] Einen Defekt an Schutzsystemen, zum Beispiel an einem Not-Halt-Taster, unverzüglich dem Arbeitgeber oder zuständigen Vorgesetzten melden
- [ ] Die Kosten für vorgeschriebene persönliche Schutzausrüstung selbst tragen
**Erklärung:** Beschäftigte verwenden Arbeitsmittel und Schutzausrüstung bestimmungsgemäß und melden Gefahren und Defekte unverzüglich. Die Gefährdungsbeurteilung ist Pflicht des Arbeitgebers, nicht der einzelnen Beschäftigten, und die Kosten vorgeschriebener persönlicher Schutzausrüstung trägt der Arbeitgeber.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-22 · Mehrfachauswahl
**Frage:** Welche Aussagen zum Begriff des Gefahrstoffs nach der Gefahrstoffverordnung treffen zu?
- [x] Auch Stoffe, die trotz fehlender Einstufung nach ihren Eigenschaften und der Art der Verwendung Beschäftigte gefährden können, zählen dazu.
- [x] Auch Stoffe, aus denen bei der Verwendung gefährliche Stoffe wie Dämpfe oder Nebel freigesetzt werden, zählen dazu.
- [ ] Nur Stoffe, die ein Gefahrenpiktogramm auf dem Etikett tragen, sind Gefahrstoffe.
- [x] Stoffe, für die ein Arbeitsplatzgrenzwert festgelegt ist, zählen dazu.
**Erklärung:** Der Gefahrstoffbegriff ist weiter als „gekennzeichnete Chemikalie“: Er umfasst auch nicht eingestufte, aber gefährdende Stoffe, freigesetzte gefährliche Stoffe und Stoffe mit Arbeitsplatzgrenzwert. Typischer Fehler: Gefahrstoff mit „Stoff mit Piktogramm“ gleichzusetzen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-23 · Sortieren
**Anweisung:** Bringe die Schutzmaßnahmen bei Tätigkeiten mit Gefahrstoffen in die Rangfolge der Gefahrstoffverordnung (höchster Vorrang zuerst).
1. Substitution prüfen: weniger gefährlichen Stoff oder weniger gefährliches Verfahren einsetzen
2. Geeignete Verfahren gestalten
3. Technische Maßnahmen an der Gefahrenquelle, zum Beispiel Be- und Entlüftung, zusammen mit organisatorischen Maßnahmen
4. Individuelle Maßnahmen wie persönliche Schutzausrüstung
**Erklärung:** An erster Stelle steht die Substitution, zuletzt kommen individuelle Maßnahmen wie persönliche Schutzausrüstung. Die Verordnung fasst technische Maßnahmen an der Gefahrenquelle und organisatorische Maßnahmen in einer Stufe zusammen und verwendet die Kürzel TOP und STOP nicht; im Kern entspricht die Rangfolge der STOP-Reihenfolge.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.3-24 · Zuordnung
**Anweisung:** Ordne die Unterlagen und Begriffe beim Umgang mit Gefahrstoffen ihrer Bedeutung zu.
- Gefahrstoffverzeichnis ↔ Übersicht der verwendeten Gefahrstoffe mit Einstufung, betroffenen Arbeitsbereichen und Verweis auf das Sicherheitsdatenblatt
- Betriebsanweisung ↔ Schriftliche Information zu den Gefahrstoffen am Arbeitsplatz, zu Vorsichtsmaßregeln und zum Verhalten bei Störungen, Unfällen und Notfällen
- Unterweisung ↔ Mündliche Unterrichtung anhand der Betriebsanweisung, deren Inhalt und Zeitpunkt schriftlich festgehalten und von den Unterwiesenen unterschrieben wird
- Arbeitsplatzgrenzwert ↔ Zeitlich gewichtete durchschnittliche Konzentration eines Stoffs in der Luft am Arbeitsplatz, bis zu der schädliche Auswirkungen im Allgemeinen nicht zu erwarten sind
**Erklärung:** Das Verzeichnis dokumentiert, welche Gefahrstoffe im Betrieb vorkommen, die Betriebsanweisung informiert schriftlich, die Unterweisung erfolgt mündlich anhand der Betriebsanweisung. Der Arbeitsplatzgrenzwert ist dagegen ein Beurteilungsmaßstab für die Luftkonzentration. Typischer Fehler: Betriebsanweisung und Unterweisung als dasselbe zu verstehen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-25 · Multiple Choice
**Frage:** Was zeigt das Signalwort auf dem Etikett eines gefährlichen Produkts?
- [ ] Ob das Produkt für den privaten oder den gewerblichen Gebrauch zugelassen ist und wer es verwenden darf
- [x] Die Schwere der Gefahr: „Gefahr“ bei schwerwiegenderen, „Achtung“ bei weniger schwerwiegenden Kategorien
- [ ] Welche persönliche Schutzausrüstung beim Umgang mit dem Produkt mindestens zu tragen ist
- [ ] Welcher Lieferant das Produkt hergestellt hat und in welchem Land es in Verkehr gebracht wurde
**Erklärung:** Das Signalwort lautet „Gefahr“ oder „Achtung“, je nach Schwere der Gefahrenkategorie. Hinweise zu Schutzausrüstung finden sich im Sicherheitsdatenblatt und in der Gefährdungsbeurteilung, nicht im Signalwort.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-10.3-26 · Wahr/Falsch
**Aussage:** Ist ein Stoff nach der CLP-Verordnung korrekt gekennzeichnet, kann die Vantera auf das Sicherheitsdatenblatt und die Gefährdungsbeurteilung verzichten, weil das Etikett alle nötigen Informationen enthält.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Die Kennzeichnung ist eine Kurzinformation für die Anwender:innen und ersetzt weder das Sicherheitsdatenblatt noch die Gefährdungsbeurteilung. Das Sicherheitsdatenblatt ist sogar Grundlage der Gefährdungsbeurteilung und der Betriebsanweisung.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-27 · Multiple Choice
**Frage:** Bei der Vantera wird ein als gefährlich eingestufter Kühlschmierstoff aus dem gelieferten Gebinde in einen Behälter an der Maschine umgefüllt. Was gilt für diesen Behälter?
- [ ] Nur das Originalgebinde muss gekennzeichnet sein; für den Behälter an der Maschine genügt das Wissen der Bediener:innen.
- [ ] Es genügt der Produktname auf dem Behälter, solange er nicht mit einem Lebensmittelbehälter verwechselt werden kann.
- [ ] Eine Kennzeichnung ist nur nötig, wenn das Sicherheitsdatenblatt nicht am Arbeitsplatz vorliegt oder nicht aktuell ist.
- [x] Auch der Behälter braucht eine Kennzeichnung mit ausreichenden Angaben zu Einstufung, Gefahren und Sicherheitsmaßnahmen, vorzugsweise nach CLP.
**Erklärung:** Gefährliche Stoffe und Gemische, die im Betrieb umgefüllt oder bereitgestellt werden, sind ausreichend zu kennzeichnen. Das Vermeiden einer Verwechslung mit Lebensmitteln ist eine zusätzliche Anforderung an Behälter, ersetzt aber die Information über Einstufung, Gefahren und Sicherheitsmaßnahmen nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.3-28 · Zuordnung
**Anweisung:** Ordne den Verfahren in der Fertigung der Vantera ihre typischen Gefährdungsarten zu.
- Abschrecken in Öl ↔ Brand und Verbrennung sowie Einatmen von Ölnebel und Rauch
- Salzbad ↔ Heiße Schmelze, Spritzer und Staub beim Nachchargieren, Reaktionen mit eingeschleppten Stoffen oder Feuchtigkeit
- Wassergemischter Kühlschmierstoff ↔ Hautbelastung durch Dauerkontakt (Feuchtarbeit) sowie Nebel und Dämpfe an der Maschine
- Beizen und Passivieren ↔ Haut- und Augenschäden je nach Einstufung, Aerosole und Dämpfe, gefährliche Reaktionen bei Vermischung
**Erklärung:** Die Übersicht ordnet nur die Art der Gefährdung ein; welche Stoffe mit welcher Einstufung tatsächlich eingesetzt werden, ergibt sich aus Sicherheitsdatenblatt und Gefährdungsbeurteilung. Einatmen, Hautkontakt und physikalisch-chemische Einwirkungen werden getrennt beurteilt und dann zusammengeführt.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-10.3-29 · Wahr/Falsch
**Aussage:** Kühlschmierstoffe, denen nitrosierende Stoffe als Komponenten zugesetzt wurden, dürfen nach der Gefahrstoffverordnung nicht verwendet werden.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Gefahrstoffverordnung verbietet solche Kühlschmierstoffe und regelt Einschränkungen für bestimmte Korrosionsschutzmittel. Der Arbeitgeber stellt im Rahmen der Gefährdungsbeurteilung sicher, dass den verwendeten Kühlschmierstoffen keine nitrosierenden Stoffe zugesetzt wurden. Typischer Fehler: die Zusammensetzung des Produkts als reine Sache des Herstellers zu betrachten.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-10.3-30 · Zuordnung
**Anweisung:** Ordne die Begriffe aus dem Bereich Lärm und Vibrationen ihrer Beschreibung zu.
- Tages-Lärmexpositionspegel ↔ Über die Zeit gemittelter Pegel bezogen auf eine Achtstundenschicht, der alle am Arbeitsplatz auftretenden Schallereignisse umfasst
- Spitzenschalldruckpegel ↔ Höchstwert des momentanen Schalldruckpegels
- Hand-Arm-Vibrationen ↔ Entstehen etwa bei handgeführten Maschinen; mögliche Folgen sind Durchblutungsstörungen und Gelenkschäden
- Ganzkörper-Vibrationen ↔ Entstehen etwa beim Fahren auf Flurförderzeugen; mögliche Folgen sind Rückenschmerzen und Schäden der Wirbelsäule
**Erklärung:** Der Tages-Lärmexpositionspegel ist ein gemittelter Wert, der Spitzenschalldruckpegel der Höchstwert. Bei Vibrationen unterscheidet man nach dem Übertragungsweg Hand-Arm- und Ganzkörper-Vibrationen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-31 · Mehrfachauswahl
**Frage:** In der Stanzerei der Vantera ergibt die Messung, dass ein oberer Auslösewert für Lärm überschritten ist. Welche Folgen hat das?
- [x] Der Bereich wird als Lärmbereich gekennzeichnet und, falls technisch möglich, abgegrenzt.
- [ ] Die dämmende Wirkung des Gehörschutzes wird vom Messwert abgezogen, sodass keine weiteren Maßnahmen nötig sind.
- [x] Der Arbeitgeber arbeitet ein Programm mit technischen und organisatorischen Maßnahmen zur Verringerung der Lärmexposition aus und führt es durch.
- [x] Der Arbeitgeber sorgt dafür, dass die Beschäftigten den Gehörschutz auch verwenden.
**Erklärung:** Bei Überschreitung eines oberen Auslösewerts gelten Lärmbereich, Lärmminderungsprogramm und Verwendungspflicht für den Gehörschutz. Die dämmende Wirkung eines Gehörschutzes wird bei der Anwendung der Auslösewerte nicht berücksichtigt; Gehörschutz ersetzt also die Maßnahmen an der Quelle nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.3-32 · Zuordnung
**Anweisung:** Ordne die Begriffe des betrieblichen Brandschutzes ihrer Beschreibung zu.
- Brandschutzhelfer:innen ↔ Benannte Beschäftigte für die Brandbekämpfung bei Entstehungsbränden, die unterwiesen werden und den Umgang mit Löscheinrichtungen üben
- Brandschutzbeauftragte ↔ Beraten und unterstützen den Arbeitgeber in Fragen des betrieblichen Brandschutzes
- Brandschutzordnung Teil A ↔ Aushang für alle Personen im Gebäude
- Brandschutzordnung Teil C ↔ Regeln für Personen mit besonderen Brandschutzaufgaben
**Erklärung:** Brandschutzhelfer:innen bekämpfen Entstehungsbrände, Brandschutzbeauftragte beraten den Arbeitgeber. Teil A der Brandschutzordnung richtet sich an alle Personen im Gebäude, Teil C an Personen mit besonderen Brandschutzaufgaben. Typischer Fehler: Brandschutzhelfer:innen und Brandschutzbeauftragte zu vertauschen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-33 · Wahr/Falsch
**Aussage:** Eine Pflicht zur Bestellung von Brandschutzbeauftragten kann sich aus anderen, etwa landesrechtlichen Vorschriften ergeben; die ASR A2.2 hält ihre Benennung bei erhöhter Brandgefährdung für zweckmäßig.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die ASR A2.2 hält die Benennung von Brandschutzbeauftragten bei erhöhter Brandgefährdung für zweckmäßig; eine Bestellpflicht kann sich aus anderen Vorschriften ergeben. Typischer Fehler: aus der ASR allein eine Pflicht für jeden Betrieb abzuleiten.
`schwierigkeit: schwer` · `bloom: verstehen`

#### Q-10.3-34 · Lückentext
**Text:** Fluchtwege führen auf möglichst kurzem Weg ins ___Freie___ oder in einen gesicherten Bereich und sind dauerhaft zu kennzeichnen.
**Erklärung:** Fluchtwege und Notausgänge müssen außerdem ständig freigehalten werden, damit sie jederzeit benutzbar sind; Türen im Verlauf von Fluchtwegen müssen sich von innen ohne besondere Hilfsmittel leicht öffnen lassen.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-10.3-35 · Multiple Choice
**Frage:** Eine Beschäftigte der Vantera ist nach einem Arbeitsunfall so lange arbeitsunfähig, dass der Unfall anzeigepflichtig ist. Welche Aussage zur Unfallanzeige trifft zu?
- [x] Der Arbeitgeber zeigt den Unfall dem Unfallversicherungsträger an; der Betriebs- oder Personalrat unterzeichnet die Anzeige mit.
- [ ] Die verletzte Beschäftigte zeigt den Unfall selbst bei ihrer Krankenkasse an; der Arbeitgeber wird nur informiert.
- [ ] Die Betriebsärzt:in erstattet die Anzeige in eigener Verantwortung bei der Berufsgenossenschaft; der Betriebsrat wird nicht beteiligt.
- [ ] Die Fachkraft für Arbeitssicherheit erstattet die Anzeige beim Unfallversicherungsträger; der Arbeitgeber wird nur nachträglich informiert.
**Erklärung:** Anzeigepflichtig ist der Arbeitgeber. Die Anzeige geht an den Unfallversicherungsträger (bei Vantera die zuständige Berufsgenossenschaft), der Betriebs- oder Personalrat unterzeichnet mit, Fachkraft für Arbeitssicherheit und Betriebsärzt:in sind zu informieren. Typischer Fehler: die beratenden Funktionen mit der Anzeigepflicht des Arbeitgebers zu verwechseln.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.3-36 · Mehrfachauswahl
**Frage:** Welche Aussagen zur Ersten Hilfe im Betrieb treffen zu?
- [x] Der Arbeitgeber benennt Beschäftigte für die Erste Hilfe; vor der Benennung ist der Betriebs- oder Personalrat zu hören.
- [ ] Für die Erste Hilfe ist allein der Rettungsdienst zuständig; der Betrieb muss keine eigenen Mittel und Einrichtungen bereithalten.
- [ ] Eine schriftliche Dokumentation von Erste-Hilfe-Leistungen ist freiwillig und wird nur bei schweren Verletzungen geführt.
- [x] Beschäftigte sind verpflichtet, sich zu Ersthelfer:innen ausbilden zu lassen, soweit nicht persönliche Gründe entgegenstehen.
**Erklärung:** Der Arbeitgeber benennt Ersthelfer:innen und stellt Mittel und Einrichtungen zur Ersten Hilfe bereit; die Verbindung zu außerbetrieblichen Stellen wie dem Rettungsdienst kommt hinzu, ersetzt den betrieblichen Teil aber nicht. Jede Erste-Hilfe-Leistung ist zu dokumentieren, etwa im Verbandbuch.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-37 · Zuordnung
**Anweisung:** Ordne die Begriffe der Betriebssicherheitsverordnung ihrer Bedeutung zu.
- Zur Prüfung befähigte Person ↔ Besitzt durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit die nötigen Prüfkenntnisse und unterliegt bei der Prüfung keinen fachlichen Weisungen des Arbeitgebers
- Zugelassene Überwachungsstelle (ZÜS) ↔ Prüft überwachungsbedürftige Anlagen grundsätzlich, soweit der Anhang 2 nicht eine befähigte Person genügen lässt
- Überwachungsbedürftige Anlagen ↔ Zum Beispiel Aufzugsanlagen, Anlagen in explosionsgefährdeten Bereichen und Druckanlagen
- Prüfbescheinigung ↔ Wird vom Arbeitgeber bei Prüfungen durch eine ZÜS verlangt
**Erklärung:** Die befähigte Person prüft Arbeitsmittel allgemein, die ZÜS grundsätzlich überwachungsbedürftige Anlagen. Bei Prüfungen durch eine ZÜS verlangt der Arbeitgeber eine Prüfbescheinigung. Typischer Fehler: ZÜS und befähigte Person gleichzusetzen.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-10.3-38 · Wahr/Falsch
**Aussage:** Weil die hydraulische Presse der Vantera eine CE-Kennzeichnung trägt und eine Betriebsanleitung vorliegt, kann das Unternehmen auf die Gefährdungsbeurteilung nach der Betriebssicherheitsverordnung verzichten.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Herstellerangaben und Betriebsanleitung sind eine wichtige Informationsquelle, ersetzen die Beurteilung aber nicht; auch eine CE-Kennzeichnung befreit davon nicht. Die Pflichten der Hersteller (Produktsicherheitsrecht) und des Arbeitgebers bei der Verwendung (Betriebssicherheitsverordnung) sind getrennt zu betrachten.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-39 · Sortieren
**Anweisung:** Die Sicherheit der hydraulischen Presse der Vantera hängt von den Montagebedingungen ab. Bringe die Schritte bei der Beschaffung und Verwendung der Presse in die Reihenfolge, die der Beispielfall der Theorie beschreibt.
1. Gefährdungen schon vor der Bestellung beurteilen und Herstellerangaben mit dem geplanten Einsatz abgleichen
2. Nach der Aufstellung Montage und sichere Funktion von einer befähigten Person prüfen lassen
3. Mit der Produktion beginnen
4. In den in der Gefährdungsbeurteilung festgelegten Abständen wiederkehrend prüfen
**Erklärung:** Die Beurteilung beginnt schon vor Auswahl und Beschaffung. Hängt die Sicherheit von den Montagebedingungen ab, wird vor der ersten Verwendung geprüft, erst danach wird produziert. Die Gefährdungsbeurteilung legt fest, in welchen Abständen wiederkehrend zu prüfen ist.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.3-40 · Mehrfachauswahl
**Frage:** Welche der folgenden Einrichtungen sind nicht trennende Schutzeinrichtungen?
- [x] Zweihandschaltung
- [x] Lichtvorhang
- [ ] Feste Verkleidung
- [ ] Verriegelte Schutztür
**Erklärung:** Nicht trennende Schutzeinrichtungen erkennen die Annäherung oder verlangen eine bestimmte Bedienung und setzen die gefährliche Bewegung still oder verhindern sie (Lichtschranke, Lichtvorhang, Zweihandschaltung). Feste Verkleidung und verriegelte Schutztür sperren den Zugriff körperlich und sind trennend. Für die Auswahl gilt weiterhin die Rangfolge technisch vor organisatorisch vor personenbezogen.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-10.3-41 · Multiple Choice
**Frage:** Welche Anforderung stellt die Betriebssicherheitsverordnung an die Steuerung eines Arbeitsmittels?
- [ ] Der Befehl zum Ingangsetzen hat Vorrang, damit die Produktion nicht durch Stillsetzen unterbrochen wird.
- [ ] Befehlseinrichtungen sollen im Gefahrenbereich liegen, damit die Bedienerin oder der Bediener die Maschine im Blick behält.
- [x] Der Befehl zum Stillsetzen hat Vorrang vor dem Befehl zum Ingangsetzen.
- [ ] Maschinen dürfen sich selbsttätig starten, sofern eine Not-Halt-Einrichtung vorhanden ist.
**Erklärung:** Arbeitsmittel dürfen nur absichtlich gestartet werden können; der Stillsetzbefehl hat Vorrang, und die Befehlseinrichtungen müssen außerhalb des Gefahrenbereichs erreichbar sein. Eine vorhandene Not-Halt-Einrichtung ersetzt die geforderte Startsicherung nicht.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-42 · Kurzantwort
**Frage:** Bei Arbeiten an elektrischen Anlagen wird der spannungsfreie Zustand mit den fünf Sicherheitsregeln hergestellt und gesichert. Welcher Schritt steht an erster Stelle? Antworte mit einem Wort.
**Akzeptierte Antworten:** freischalten; das Freischalten; Freischaltung; Anlage freischalten; Freischalten der Anlage
**Erklärung:** Die fünf Sicherheitsregeln lauten: freischalten, gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, erden und kurzschließen, benachbarte unter Spannung stehende Teile abdecken oder abschranken.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-10.3-43 · Zuordnung
**Anweisung:** Ordne die Begriffe zur Prüfung elektrischer Anlagen und Betriebsmittel ihrer Bedeutung zu.
- Elektrofachkraft ↔ Kann aufgrund fachlicher Ausbildung, Kenntnissen und Erfahrungen die übertragenen Arbeiten beurteilen und mögliche Gefahren erkennen
- Ortsfestes Betriebsmittel ↔ Fest angebracht oder zu schwer, um leicht bewegt zu werden, zum Beispiel der Schaltschrank einer CNC-Fräsmaschine
- Ortsveränderliches Betriebsmittel ↔ Wird während des Betriebs bewegt oder ist leicht versetzbar, zum Beispiel eine Verlängerungsleitung in der Montage
- Prüfbuch ↔ Ist auf Verlangen des Unfallversicherungsträgers zu führen
**Erklärung:** Die Einordnung als ortsfest oder ortsveränderlich hängt davon ab, ob das Betriebsmittel fest angebracht beziehungsweise zu schwer zum Bewegen oder leicht versetzbar ist. Die Prüfungen führt eine Elektrofachkraft oder jemand unter ihrer Leitung und Aufsicht durch. Typischer Fehler: die Einordnung nach dem Standort statt nach der Beweglichkeit vorzunehmen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.3-44 · Multiple Choice
**Frage:** Wie wird bestimmt, in welchen Abständen elektrische Betriebsmittel wiederkehrend zu prüfen sind?
- [ ] Es gelten starre Abstände aus der Tabelle der Durchführungsanweisung, die der Betrieb in keinem Fall verkürzen oder verlängern darf.
- [ ] Die wiederkehrenden Prüfungen entfallen, wenn Hersteller oder Errichter bestätigen, dass die Betriebsmittel den Anforderungen entsprechen.
- [ ] Der Unfallversicherungsträger legt für jedes einzelne Betriebsmittel einen eigenen Prüftermin fest, den der Betrieb nur auf Antrag ändern darf.
- [x] Sie ergeben sich aus der Gefährdungsbeurteilung und müssen so bemessen sein, dass zu erwartende Mängel rechtzeitig erkannt werden; Tabellenwerte sind nur Orientierung.
**Erklärung:** Die Orientierungswerte der Durchführungsanweisung sind keine starren Vorgaben. Entfallen kann nur die Erstprüfung, wenn Hersteller oder Errichter bestätigen, dass die Anlagen und Betriebsmittel den Anforderungen entsprechen, nicht die wiederkehrende Prüfung. Typischer Fehler: Erstprüfung und wiederkehrende Prüfung zu verwechseln.
`schwierigkeit: schwer` · `bloom: analysieren`

## Glossar-Vorschläge

Einzufügen in eine neue Datei `content/technischer-fachwirt/hq3/glossar.md` (Frontmatter wie bei `hq1/glossar.md`, `fachgebiet_code: HQ3`, `thema_code: "HQ3-glossar"`). Alle Begriffe `Geprüft: nein`; die Definitionen stützen sich nur auf den Theorietext in 10.3.

#### Gefahrstoff
**Thema:** 10.3
**Abschnitt:** Gefahrstoffverordnung im Überblick
**Definition:** Nach der Gefahrstoffverordnung mehr als gekennzeichnete Chemikalien: dazu zählen gefährliche und explosionsfähige Stoffe und Gemische, Stoffe, aus denen gefährliche Stoffe entstehen oder freigesetzt werden, gefährdende nicht eingestufte Stoffe und Stoffe mit Arbeitsplatzgrenzwert.
**Geprüft:** nein

#### Substitution
**Thema:** 10.3
**Abschnitt:** Grundzüge des Arbeitsschutzgesetzes
**Definition:** Ersatz einer gefährlichen Arbeitsweise oder eines gefährlichen Stoffs durch eine weniger gefährliche. Sie ist der erste Prüfschritt der STOP-Rangfolge und steht auch bei Gefahrstoffen an erster Stelle der Schutzmaßnahmen.
**Geprüft:** nein

#### Pflichtenübertragung
**Thema:** 10.3
**Abschnitt:** Unterweisung, Pflichtenübertragung und Pflichten der Beschäftigten
**Definition:** Schriftliche Beauftragung zuverlässiger und fachkundiger Personen durch den Arbeitgeber, ihm obliegende Aufgaben des Arbeitsschutzes in eigener Verantwortung wahrzunehmen. Der Arbeitgeber bleibt für Organisation sowie Auswahl und Überwachung der Beauftragten verantwortlich.
**Geprüft:** nein

#### Gefahrstoffverzeichnis
**Thema:** 10.3
**Abschnitt:** Gefahrstoffverordnung im Überblick
**Definition:** Verzeichnis der im Betrieb verwendeten Gefahrstoffe mit Bezeichnung, Einstufung, Mengenbereich, betroffenen Arbeitsbereichen und Verweis auf das Sicherheitsdatenblatt.
**Geprüft:** nein

#### Betriebsanweisung
**Thema:** 10.3
**Abschnitt:** Gefahrstoffverordnung im Überblick
**Definition:** Schriftliche Information für die Beschäftigten. Bei Gefahrstoffen enthält sie Angaben zu den Gefahrstoffen am Arbeitsplatz, zu Vorsichtsmaßregeln und zum Verhalten bei Störungen, Unfällen und Notfällen; anhand von ihr werden die Beschäftigten mündlich unterwiesen.
**Geprüft:** nein

#### Sicherheitsdatenblatt
**Auch:** SDB
**Thema:** 10.3
**Abschnitt:** Einstufung und Kennzeichnung: CLP-Verordnung und Sicherheitsdatenblatt
**Definition:** Vom Lieferanten für gefährliche Stoffe und Gemische bereitgestelltes Informationsblatt. Es ist Grundlage der Gefährdungsbeurteilung und der Betriebsanweisung, die Beschäftigten müssen Zugang dazu haben.
**Geprüft:** nein

#### Auslösewert
**Thema:** 10.3
**Abschnitt:** Lärm und Vibrationen
**Definition:** Festgelegter Wert der Lärm- und Vibrations-Arbeitsschutzverordnung, bei dem bestimmte Pflichten des Arbeitgebers einsetzen, etwa Gehörschutz, Kennzeichnung von Lärmbereichen, Unterweisung und Vorsorge.
**Geprüft:** nein

#### Brandschutzhelfer:in
**Auch:** Brandschutzhelfer:innen, Brandschutzhelferin, Brandschutzhelfer
**Thema:** 10.3
**Abschnitt:** Brandschutz im Betrieb
**Definition:** Beschäftigte, die für Aufgaben der Brandbekämpfung bei Entstehungsbränden benannt sind, unterwiesen werden und den Umgang mit Löscheinrichtungen üben. Ihre Zahl ergibt sich aus der Gefährdungsbeurteilung.
**Geprüft:** nein

#### Ersthelfer:in
**Auch:** Ersthelfer:innen, Ersthelferin, Ersthelfer
**Thema:** 10.3
**Abschnitt:** Erste Hilfe und Meldung von Arbeitsunfällen
**Definition:** Beschäftigte, die der Arbeitgeber für die Erste Hilfe benennt und die bei einer vom Unfallversicherungsträger ermächtigten Stelle (oder gleichgestellt) ausgebildet sind und regelmäßig fortgebildet werden.
**Geprüft:** nein

#### Befähigte Person
**Auch:** zur Prüfung befähigte Person
**Thema:** 10.3
**Abschnitt:** Betriebssicherheitsverordnung: Pflichten beim Verwenden von Arbeitsmitteln
**Definition:** Person, die durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit die nötigen Kenntnisse zur Prüfung von Arbeitsmitteln besitzt und bei der Prüfung keinen fachlichen Weisungen des Arbeitgebers unterliegt.
**Geprüft:** nein

#### Zugelassene Überwachungsstelle
**Auch:** ZÜS
**Thema:** 10.3
**Abschnitt:** Betriebssicherheitsverordnung: Pflichten beim Verwenden von Arbeitsmitteln
**Definition:** Stelle, die überwachungsbedürftige Anlagen grundsätzlich prüft, soweit nach dem Anhang 2 der Betriebssicherheitsverordnung nicht eine befähigte Person genügt. Bei ihren Prüfungen verlangt der Arbeitgeber eine Prüfbescheinigung.
**Geprüft:** nein

#### Elektrofachkraft
**Thema:** 10.3
**Abschnitt:** Prüfung elektrischer Anlagen und Betriebsmittel (DGUV Vorschrift 3)
**Definition:** Person, die aufgrund fachlicher Ausbildung, Kenntnissen und Erfahrungen sowie Kenntnis der Bestimmungen übertragene elektrotechnische Arbeiten beurteilen und Gefahren erkennen kann, in der Regel durch eine abgeschlossene elektrotechnische Ausbildung.
**Geprüft:** nein

## Zu entscheiden

1. **Einspielen und Zeitpunkt.** Die Theorie der zehn Abschnitte ist bereits eingespielt; die Aufgaben sind rechtsnaher Inhalt (R4) und bleiben bis zur Entscheidung des Projektleiters ein Entwurf. Sie enthalten keine Zahlenwerte, Fristen oder Strafen und halten sich an die Formulierungen des Theorietextes. *Empfehlung:* Karteikarten und Quiz zusammen einspielen, sobald die Theorie als Lerntext bleibt; wird die Theorie nach der förmlichen Rechtsprüfung (Iteration 22) geändert, die Aufgaben mit prüfen.
2. **CLP-Aufgaben.** Auf nicht am Primärtext gelesenen Quellen beruhen im Theorietext nur Etikett-Einzelheiten. Die Aufgaben K-10.3-28 (CLP/GHS), K-10.3-29, Q-10.3-25 (Signalwort), Q-10.3-26 und Q-10.3-27 beschränken sich auf Kernbegriffe, die auch die Gefahrstoffverordnung trägt (Kennzeichnung im Betrieb, Sicherheitsdatenblatt als Informationsquelle). Q-10.3-25 ist die einzige Aufgabe, deren Aussage allein auf der CLP-Verordnung beruht. *Empfehlung:* alle behalten; falls vor dem Abgleich mit der CLP-Fassung strenger verfahren werden soll, nur Q-10.3-25 zurückstellen.
3. **Tags bei Quizfragen.** Die Karteikarten tragen eine `tags`-Zeile wie in `content/README.md`. Für Quizfragen kennt das README und der Parser keine Tags, der Bestand in 10.3 hat auch bei den Karteikarten keine. *Empfehlung:* Quizfragen ohne `tags`-Zeile einspielen (wie in diesem Entwurf); die Tags der Karteikarten sind harmlos und können bei Bedarf gestrichen werden.
4. **Bestandskarte K-10.3-19.** Die vorhandene Karteikarte „Ab wann gilt ein Arbeitsunfall als meldepflichtig …“ (Antwort: eine Schwelle in Tagen) widerspricht der Vorgabe, keine Fristen oder Schwellenwerte abzufragen (Prüfung bestätigt den Befund). *Vorschlag der Prüfung (Bestand nicht geändert):* ID und Metadaten behalten, Text ersetzen durch **Frage:** „Welche Arbeitsunfälle muss der Arbeitgeber dem Unfallversicherungsträger anzeigen?“ **Antwort:** „Unfälle, bei denen Versicherte getötet oder so verletzt werden, dass sie über eine gesetzlich bestimmte Dauer hinaus arbeitsunfähig sind; außerdem Anhaltspunkte für eine Berufskrankheit.“ (Beleg § 193 Abs. 1 und 2 SGB VII; K-10.3-39 behandelt dagegen Adressat und Mitwirkende.) Entscheidung des Projektleiters.
5. **Wahr/Falsch-Ausgewogenheit.** Das Quiz enthält drei wahre und zwei falsche Aussagen (Q-10.3-20, -29, -33 wahr; Q-10.3-26, -38 falsch). *Empfehlung:* so lassen.
6. **Kurzantwort Q-10.3-42.** Eine einzige Kurzantwort (erster Schritt der Sicherheitsregeln, ein Wort, fünf akzeptierte Schreibweisen). Die App vergleicht exakt; unerwartete Eingaben („Anlage freischalten“) werden als falsch gewertet. *Empfehlung:* behalten; falls zu streng, in Multiple Choice umwandeln.
7. **Sortieren Q-10.3-39 und Beispielfall.** Die Reihenfolge folgt dem Beispiel der Presse im Theorietext (Beurteilung vor Bestellung, Prüfung nach Aufstellung, Produktion, wiederkehrende Prüfungen), nicht einer Rechtsvorschrift. *Empfehlung:* behalten, die Anweisung weist darauf hin.
8. **Glossar.** Zwölf Begriffe mit `Geprüft: nein`; „Substitution“ verweist auf den Abschnitt „Grundzüge des Arbeitsschutzgesetzes“, weil der Begriff dort erklärt wird. Die Datei `hq3/glossar.md` existiert noch nicht. *Empfehlung:* anlegen, wenn die Aufgaben eingespielt werden.
9. **Nicht abgedeckt.** Bewusst ohne Aufgabe bleiben alle Zahlen und Fristen (Auslösewerte, Vibrationswerte, Tage und Jahre, Prozentanteile, Orientierungswerte der DGUV Vorschrift 3), die Normeninhalte (ISO 12100, ISO 13849) und der Explosionsschutz („Spezialthema“). Fallaufgaben und Fachgespräch-Fragen zu den Abschnitten sind nicht Teil dieses Entwurfs.
10. **Theorie-Satz zum Hand- und Hautschutzplan (Prüfung, Theorie nicht geändert).** Der Satz im Abschnitt „Gefahrstoffe in der Fertigung“, ein Hand- und Hautschutzplan habe sich „nach der TRGS 401“ bewährt, sei aber „keine Rechtspflicht“, ließ sich nicht belegen: Die TRGS 401 wurde nicht am Primärtext gelesen, und Sekundärquellen nennen für den Hautschutzplan teils die TRGS 500 Nr. 6.4 und verlangen ihn, sobald die Gefährdungsbeurteilung eine Hautgefährdung ergibt. Q-10.3-29 (früher auf diesem Satz aufgebaut) wurde deshalb durch eine am Verordnungstext belegte Aussage ersetzt. *Empfehlung:* den Theorie-Satz bei der förmlichen Rechtsprüfung (Iteration 22) prüfen und bis dahin entschärfen oder streichen.
11. **ASR-A2.2- und DIN-14096-Aussagen.** K-10.3-35, K-10.3-36, Q-10.3-32 und Q-10.3-33 beruhen auf der ASR A2.2 und der DIN 14096, die nicht im Wortlaut gelesen werden konnten (Sekundärquellen stimmen für die Brandschutzbeauftragten überein; Teil A bis C der Brandschutzordnung und die Formulierung „beispielhaft genannte Form“ sind ungeprüft). *Empfehlung:* behalten, bei der Rechtsprüfung gegen die aktuelle ASR-Fassung abgleichen.
12. **Ähnlichkeit von Karte und Quizfrage.** Mehrere Quizfragen wiederholen den Inhalt ihrer Karteikarte fast wörtlich (z. B. Q-10.3-34 = K-10.3-34, Q-10.3-20 = K-10.3-24). Das ist als Abfrage in anderer Form vertretbar. *Empfehlung:* so lassen.
