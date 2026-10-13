# Entwurf: Aufgaben und Glossar-Vorschläge zu den Umweltrecht-Abschnitten in Thema 10.2 (Technischer Fachwirt, Paket P8)

Stand 13.10.2026 · **Entwurf zur Entscheidung des Projektleiters, rechtsnaher Inhalt (R4), nichts in `content/` eingespielt.**

**Unabhängig geprüft am 13.10.2026 (KI-Prüfinstanz, keine Rechtsberatung):** Prüfbericht `docs/entwuerfe/pruefung-p8-items-10-2.md`. Die dort als „geändert“ gekennzeichneten Korrekturen sind in diesen Entwurf eingearbeitet (Q-10.2-27 und Q-10.2-37 inhaltlich ersetzt, Q-10.2-32 auf eine Lücke umgestellt, Antwortlängen und Gendern bereinigt, Absicherungen „grundsätzlich“ bei AwSV-Aussagen). Das Format wurde mit `parseKarteikarten`, `parseQuizBlock` und `parseGlossar` aus `apps/api/src/db/content-parser.ts` geprüft (19 Karteikarten, 21 Quizfragen, 10 Glossar-Einträge ohne Formatfehler; zusammengebaut mit der Thema-Datei 41 Karteikarten, 38 Quizfragen).

Grundlage: die sieben neuen Theorieabschnitte in `content/technischer-fachwirt/hq3/10.2-umweltmanagement.md` (Fundstellen und Prüfpunkte: `docs/entwuerfe/tf-p8-recht/teil-a-umweltrecht.md`, Prüfbericht `docs/entwuerfe/pruefung-p8-teil-a.md`). Jede Antwort lässt sich allein aus dem Theorietext von 10.2 ableiten; keine Aufgabe fragt nach einem Betrag, einer Frist, einer Mengen- oder Schwellenwert-Zahl, einem Bußgeld oder Strafrahmen. Wo der Theorietext etwas offenlässt (Einordnung von Emulsionen bei den Altöl-Sammelkategorien, verbindliche Anlagenzuordnung, Landesrecht bei der Indirekteinleitung), bleibt es in den Aufgaben offen.

## Übersicht

19 Karteikarten (K-10.2-23 bis K-10.2-41), 21 Quizfragen (Q-10.2-18 bis Q-10.2-38), 10 Glossar-Vorschläge.

| Abschnitt in 10.2 | Karteikarten | Quizfragen |
|---|---|---|
| Bundes-Immissionsschutzgesetz im Überblick | K-10.2-23, K-10.2-24, K-10.2-25 | Q-10.2-18 (Multiple Choice), Q-10.2-19 (Mehrfachauswahl), Q-10.2-20 (Wahr/Falsch) |
| Kreislaufwirtschaftsrecht: Pflichten der Abfallerzeuger | K-10.2-26, K-10.2-27, K-10.2-28 | Q-10.2-21 (Zuordnung), Q-10.2-22 (Was passt nicht dazu), Q-10.2-23 (Multiple Choice) |
| Nachweisführung bei gefährlichen Abfällen | K-10.2-29, K-10.2-30, K-10.2-31 | Q-10.2-24 (Zuordnung), Q-10.2-25 (Sortieren), Q-10.2-26 (Multiple Choice) |
| Wasserrecht im Betrieb: Abwasser und wassergefährdende Stoffe | K-10.2-32, K-10.2-33, K-10.2-34 | Q-10.2-27 (Wahr/Falsch), Q-10.2-28 (Multiple Choice), Q-10.2-29 (Mehrfachauswahl) |
| Betriebsbeauftragte im Umweltschutz | K-10.2-35, K-10.2-36 | Q-10.2-30 (Zuordnung), Q-10.2-31 (Wahr/Falsch), Q-10.2-32 (Lückentext, Wortauswahl, eine Lücke) |
| Verantwortung der Betriebsleitung und Brücke zum Managementsystem | K-10.2-37, K-10.2-38, K-10.2-39 | Q-10.2-33 (Multiple Choice), Q-10.2-34 (Wahr/Falsch), Q-10.2-35 (Mehrfachauswahl) |
| Praxisbeispiel: Kühlschmierstoffe und Altöle bei der Vantera | K-10.2-40, K-10.2-41 | Q-10.2-36 (Multiple Choice), Q-10.2-37 (Wahr/Falsch, Altöl-Sammelkategorien), Q-10.2-38 (Kurzantwort) |

Abgrenzung zum Bestand in 10.2: Die Rangfolge der Abfallhierarchie (K-10.2-07, Q-10.2-03, -04, -08, -12, -14) und „Kühlschmierstoffe gelten in der Regel als gefährlicher Abfall“ (K-10.2-09, Q-10.2-07) werden nicht wiederholt; die neuen Aufgaben fragen nach dem, was der Bestand nicht abdeckt (Abweichung von der Rangfolge, Sternchen und Vermischungsverbot, Nachweisverfahren). Die Gesamtzahl von 40 liegt an der oberen Grenze des Auftrags; Streichvorschläge stehen unter „Zu entscheiden“.

## Karteikarten (einzufügen am Ende des Abschnitts „## Karteikarten“ in `hq3/10.2-umweltmanagement.md`)

#### K-10.2-23
**Frage:** Worin unterscheiden sich Emission und Immission nach dem Bundes-Immissionsschutzgesetz (BImSchG)?
**Antwort:** Emissionen sind die Luftverunreinigungen, Geräusche, Erschütterungen, das Licht, die Wärme und die Strahlen, die von einer Anlage ausgehen: der Ausstoß an der Quelle. Immissionen sind dieselben Einwirkungen am Ort, an dem sie auf Menschen, Tiere, Pflanzen, Boden, Wasser oder Sachgüter treffen: die Belastung am Ort der Wirkung. Als „Anlage“ gelten auch Maschinen und Grundstücke, auf denen Stoffe gelagert oder emissionsträchtige Arbeiten durchgeführt werden.
`tags: immissionsschutz, emission, immission` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-24
**Frage:** Was unterscheidet genehmigungsbedürftige von nicht genehmigungsbedürftigen Anlagen, und wo ist geregelt, welche Anlagen genehmigungsbedürftig sind?
**Antwort:** Genehmigungsbedürftig sind Anlagen, die in besonderem Maße schädliche Umwelteinwirkungen hervorrufen können; für Errichtung und Betrieb ist eine Genehmigung nötig. Welche Anlagen dazugehören, regelt nicht das Gesetz selbst, sondern der Anhang 1 der Vierten Verordnung zur Durchführung des BImSchG (4. BImSchV). Er nennt jede Anlagenart mit Leistungsgrenze oder Größe und dem Verfahren: G steht für das förmliche Genehmigungsverfahren mit Öffentlichkeitsbeteiligung, V für das vereinfachte Verfahren ohne sie. Nicht jede Metallbearbeitung ist erfasst; die verbindliche Zuordnung trifft die zuständige Behörde.
`tags: immissionsschutz, genehmigung, bimschv` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.2-25
**Frage:** Welche Betreiberpflichten gelten für genehmigungsbedürftige Anlagen, und was gilt dagegen für nicht genehmigungsbedürftige?
**Antwort:** Genehmigungsbedürftige Anlagen sind so zu errichten und zu betreiben, dass erstens schädliche Umwelteinwirkungen nicht hervorgerufen werden, zweitens Vorsorge getroffen wird (insbesondere durch Maßnahmen nach dem Stand der Technik), drittens Abfälle vermieden, verwertet oder ordnungsgemäß beseitigt werden und viertens Energie sparsam und effizient verwendet wird. Auch nach einer Betriebseinstellung dürfen von Anlage und Grundstück keine Gefahren ausgehen. Für nicht genehmigungsbedürftige Anlagen gilt eine abgeschwächte Pflicht: vermeidbare schädliche Umwelteinwirkungen verhindern, unvermeidbare auf ein Mindestmaß beschränken und Abfälle ordnungsgemäß beseitigen. Konkrete Werte und Verfahren liefern Verwaltungsvorschriften wie die TA Luft und die TA Lärm.
`tags: immissionsschutz, betreiberpflichten, stand-der-technik` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-26
**Frage:** Wann ist ein Stoff nach dem Kreislaufwirtschaftsgesetz (KrWG) Abfall, und wann wird der Wille zur Entledigung angenommen?
**Antwort:** Abfall sind alle Stoffe oder Gegenstände, derer sich die Besitzer:in entledigt, entledigen will oder entledigen muss. Der Wille zur Entledigung wird unter anderem angenommen, wenn ein Stoff bei Herstellung oder Nutzung anfällt, ohne dass der Zweck der Handlung darauf gerichtet war; das trifft auf Rückstände der Fertigung wie Schlämme und gebrauchte Betriebsstoffe regelmäßig zu. Abfälle, die verwertet werden, heißen Abfälle zur Verwertung, alle anderen Abfälle zur Beseitigung. Ob Späne Abfall oder Nebenprodukt sind, ist im Einzelfall zu prüfen.
`tags: kreislaufwirtschaftsgesetz, abfallbegriff` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.2-27
**Frage:** Welche Grundpflichten haben Erzeuger:innen und Besitzer:innen von Abfällen, und wie weit reichen sie?
**Antwort:** Sie müssen ihre Abfälle verwerten; die Verwertung hat Vorrang vor der Beseitigung. Die Verwertung muss ordnungsgemäß erfolgen (im Einklang mit den Vorschriften) und schadlos (keine Beeinträchtigung des Gemeinwohls, insbesondere keine Schadstoffanreicherung im Wertstoffkreislauf). Die Pflicht besteht, soweit die Verwertung technisch möglich und wirtschaftlich zumutbar ist; zumutbar sind Kosten, die nicht außer Verhältnis zu den Kosten einer Beseitigung stehen. Was nicht verwertet wird, ist so zu beseitigen, dass das Wohl der Allgemeinheit nicht beeinträchtigt wird.
`tags: kreislaufwirtschaftsgesetz, verwertungspflicht, grundpflichten` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-28
**Frage:** Woran erkennst du einen gefährlichen Abfall, und welches Verbot gilt für ihn?
**Antwort:** Ob ein Abfall gefährlich ist, bestimmt die Abfallverzeichnis-Verordnung (AVV): Jede Abfallart hat einen sechsstelligen Abfallschlüssel (die ersten zwei Stellen nennen das Kapitel, die ersten vier die Gruppe, also die Herkunft); ein Sternchen am Schlüssel kennzeichnet gefährliche Abfälle. Für sie gilt unter anderem das Vermischungsverbot (daneben gelten Nachweis- und Registerpflichten): keine Vermischung oder Verdünnung mit anderen Kategorien gefährlicher Abfälle oder mit anderen Abfällen, Stoffen oder Materialien; Ausnahmen gelten nur in dafür zugelassenen Anlagen. Wurde unzulässig vermischt, sind die Abfälle unverzüglich zu trennen, soweit das für eine ordnungsgemäße und schadlose Verwertung erforderlich ist; andernfalls oder wenn die Trennung technisch nicht möglich oder wirtschaftlich nicht zumutbar ist, müssen sie unverzüglich in einer dafür zugelassenen Anlage behandelt werden.
`tags: gefaehrliche-abfaelle, abfallverzeichnis, vermischungsverbot` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.2-29
**Frage:** Aus welchen zwei Teilen besteht der Nachweis der Entsorgung gefährlicher Abfälle, und welche Dokumente gehören dazu?
**Antwort:** Vor der Entsorgung steht der Entsorgungsnachweis: eine Erklärung der Erzeuger:in zur vorgesehenen Entsorgung (verantwortliche Erklärung, mit Deklarationsanalyse, also Angabe von Art, Beschaffenheit und Zusammensetzung des Abfalls), die Annahmeerklärung der Entsorger:in und die Bestätigung der Behörde, dass die vorgesehene Entsorgung zulässig ist. Nach der Entsorgung bestätigen die Beteiligten mit dem Begleitschein, wo die Abfälle geblieben sind: Bei jeder Übergabe wird für jede Abfallart ein eigener Satz verwendet, die Ausfertigungen gehen an Erzeuger:in, Beförderer:in, Entsorger:in und Behörde, und die Erzeuger:in legt ihre Exemplare als Beleg ins Register. Die Einzelheiten regelt die Nachweisverordnung (NachwV).
`tags: nachweisverfahren, entsorgungsnachweis, begleitschein` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.2-30
**Frage:** Was ist ein Entsorgungsfachbetrieb, und was folgt daraus für den Nachweis und für die Auswahl der Entsorger:in?
**Antwort:** Ein Entsorgungsfachbetrieb ist ein zertifiziertes Entsorgungsunternehmen. Ist die Entsorger:in für die betriebene Anlage und die dort durchgeführte Tätigkeit zertifiziert und liegt der Behörde ein gültiges Überwachungszertifikat mit den Abfallschlüsseln vor, entfällt die behördliche Bestätigung im Entsorgungsnachweis; das erleichtert das Verfahren. Eine allgemeine Pflicht, gefährliche Abfälle nur durch Entsorgungsfachbetriebe entsorgen zu lassen, enthält das Gesetz nicht. Voraussetzung ist, dass die Abfälle in dafür zugelassenen Anlagen entsorgt und von Beförderer:innen mit der erforderlichen Erlaubnis transportiert werden. Wer Dritte beauftragt, bleibt verantwortlich, bis die Entsorgung ordnungsgemäß abgeschlossen ist, und muss zuverlässige Dritte auswählen.
`tags: nachweisverfahren, entsorgungsfachbetrieb, verantwortung` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-10.2-31
**Frage:** Was gilt für Erzeuger:innen von Kleinmengen gefährlicher Abfälle, und was gilt für das Register?
**Antwort:** Für Kleinmengen gilt eine Erleichterung: Wer die in der Nachweisverordnung festgelegte Mengengrenze nicht überschreitet, ist von der Nachweispflicht ausgenommen, führt aber einen Übernahmeschein. Die Registerpflicht bleibt bestehen: Erzeuger:innen, Besitzer:innen, Sammler:innen, Beförderer:innen, Händler:innen und Makler:innen gefährlicher Abfälle führen ein Register, in dem unter anderem Menge, Art und Ursprung sowie Bestimmung und Art der Verwertung oder Beseitigung verzeichnet sind. Die Einträge und Belege sind der Behörde auf Verlangen vorzulegen; die Behörden dürfen Auskunft verlangen, den Betrieb betreten und Einsicht in die Unterlagen nehmen.
`tags: nachweisverfahren, register, kleinmengen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-32
**Frage:** Was unterscheidet Direkteinleitung und Indirekteinleitung von Abwasser?
**Antwort:** Die Direkteinleitung führt das Abwasser unmittelbar in ein Gewässer; sie braucht eine Erlaubnis, die nur unter den Voraussetzungen des Gesetzes erteilt wird (eine Bewilligung ist für das Einleiten von Abwasser ausgeschlossen). Die Indirekteinleitung führt es in die öffentliche Kanalisation, so wie es die meisten Betriebe tun; sie bedarf der Genehmigung der zuständigen Behörde, soweit die Abwasserverordnung (AbwV) Anforderungen für den Ort des Anfalls des Abwassers oder vor seiner Vermischung festlegt. Das Landesrecht kann weitergehende Genehmigungserfordernisse vorsehen oder bestimmen, dass das Betreiberunternehmen der Kanalisation genehmigt; deshalb ist das jeweilige Landesrecht zu beachten.
`tags: wasserrecht, abwasser, einleitung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-33
**Frage:** Was sind Wassergefährdungsklassen (WGK), und wie hängen sie mit der Gefährdungsstufe einer Anlage zusammen?
**Antwort:** Stoffe und Gemische werden als nicht wassergefährdend oder in Wassergefährdungsklassen eingestuft: WGK 1 schwach, WGK 2 deutlich, WGK 3 stark wassergefährdend; was nicht eingestuft ist, gilt grundsätzlich als stark wassergefährdend. Eine Anlage zum Umgang mit wassergefährdenden Stoffen wird nach Wassergefährdungsklasse und Volumen oder Masse einer Gefährdungsstufe A bis D zugeordnet; je höher die Stufe, desto strenger die Pflichten. Grundlage ist die Verordnung über Anlagen zum Umgang mit wassergefährdenden Stoffen (AwSV).
`tags: wasserrecht, awsv, wassergefaehrdungsklasse` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-34
**Frage:** Was ist eine Rückhalteeinrichtung nach der AwSV, und welche Anforderungen gelten für sie?
**Antwort:** Eine Rückhalteeinrichtung (Auffangwanne, Auffangraum) hält ausgetretene wassergefährdende Stoffe zurück; sie ist grundsätzlich vorgeschrieben (Ausnahmen gibt es unter anderem für doppelwandige Anlagen). Sie muss flüssigkeitsundurchlässig sein und darf keine Abläufe haben. Bei Lager- und Verwendungsanlagen richtet sich das Rückhaltevolumen grundsätzlich nach der Menge, die bei einer Betriebsstörung bis zum Wirksamwerden von Sicherheitsvorkehrungen freigesetzt werden kann (für die höchste Gefährdungsstufe D gilt eine strengere Auslegung). Stoffe, die beim Austreten miteinander reagieren können, sind getrennt aufzufangen.
`tags: wasserrecht, awsv, rueckhalteeinrichtung` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.2-35
**Frage:** Welche Betriebsbeauftragten im Umweltschutz gehören zum Überblick, und welche gemeinsame Rolle haben sie?
**Antwort:** Immissionsschutzbeauftragte, Abfallbeauftragte und Gewässerschutzbeauftragte (bei bestimmten Anlagen kommen zum Beispiel Störfallbeauftragte hinzu). Sie beraten die Betriebsleitung und überwachen die Einhaltung der Vorschriften; die Verantwortung der Geschäftsführung ersetzen sie nicht. Eine Pflicht zur Bestellung besteht nur unter bestimmten Voraussetzungen (zum Beispiel nach Art der Anlage sowie Abfall- oder Abwassermengen); im Übrigen kann die Behörde die Bestellung im Einzelfall anordnen.
`tags: betriebsbeauftragte, umweltschutz` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-10.2-36
**Frage:** Welche Regeln gelten gemeinsam für die Bestellung und die Stellung der Betriebsbeauftragten im Umweltschutz?
**Antwort:** Die Bestellung erfolgt schriftlich mit genauer Aufgabenbeschreibung und wird der Behörde angezeigt; vorher ist der Betriebs- oder Personalrat zu unterrichten. Bestellt werden darf nur, wer Fachkunde und Zuverlässigkeit besitzt; in den Pflichtfällen der Verordnungen muss die Person betriebsangehörig sein. Das Unternehmen unterstützt die Beauftragten, ermöglicht Mittel und Schulungen und holt vor Investitions- und Verfahrensentscheidungen, die für den Bereich bedeutsam sein können, ihre Stellungnahme ein. Die Beauftragten dürfen wegen ihrer Aufgaben nicht benachteiligt werden; Arbeitnehmer:innen genießen einen besonderen Kündigungsschutz. Eine Person kann mehrere Funktionen übernehmen, aber nur in den gesetzlich vorgesehenen Kombinationen.
`tags: betriebsbeauftragte, bestellung, fachkunde` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-10.2-37
**Frage:** Was gilt für die Betreiberpflichten einer genehmigungsbedürftigen Anlage, wenn die Geschäftsführung aus mehreren Personen besteht?
**Antwort:** Der Behörde ist mitzuteilen, wer die Betreiberpflichten wahrnimmt; die Gesamtverantwortung aller Organmitglieder bleibt davon unberührt. Außerdem ist der Behörde mitzuteilen, auf welche Weise sichergestellt wird, dass die Umweltvorschriften beim Betrieb beachtet werden.
`tags: betriebsleitung, gesamtverantwortung, betreiberpflichten` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-38
**Frage:** Was bedeutet es für die Betriebsleitung, Umweltpflichten zu delegieren?
**Antwort:** Delegieren ist erlaubt, entlastet aber nicht vollständig. Wer als Inhaber:in eines Betriebs oder Unternehmens vorsätzlich oder fahrlässig die erforderlichen Aufsichtsmaßnahmen unterlässt, handelt ordnungswidrig, wenn eine Zuwiderhandlung begangen wird, die durch gehörige Aufsicht verhindert oder wesentlich erschwert worden wäre. Zur Aufsicht gehören die Bestellung, sorgfältige Auswahl und Überwachung der Aufsichtspersonen. Bei einer GmbH gelten diese Vorschriften auch für die Geschäftsführenden als vertretungsberechtigte Organe.
`tags: betriebsleitung, aufsichtspflicht, delegation` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-10.2-39
**Frage:** Wozu dienen Rechtskataster und Rechtskonformitätsbewertung, und was bestätigt ein ISO-14001-Zertifikat?
**Antwort:** Ein Umweltmanagementsystem nach ISO 14001 verlangt, die für das Unternehmen geltenden rechtlichen Verpflichtungen zu ermitteln und die Einhaltung zu bewerten. Dazu dienen das Rechtskataster (Verzeichnis der anwendbaren Vorschriften je Standort und Anlage, mit Verantwortlichen und Fristen) und eine regelmäßige Rechtskonformitätsbewertung. Das Zertifikat bestätigt das Managementsystem, nicht die Rechtskonformität selbst.
`tags: rechtskataster, iso-14001, rechtskonformitaet` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-40
**Frage:** Welche drei Rechtsbereiche berühren sich beim Einsatz von Kühlschmierstoffen und Ölen in der CNC-Zerspanung der Vantera?
**Antwort:** Das Anlagenrecht (Umgang mit dem frischen Stoff: Eine Kühlschmierstoff-Zentralanlage ist eine Anlage zum Verwenden wassergefährdender Stoffe im gewerblichen Bereich, sofern der Stoff wassergefährdend eingestuft ist oder als wassergefährdend gilt; die Gefährdungsstufe ergibt sich aus Wassergefährdungsklasse und Volumen), das Abwasserrecht (zum Beispiel die Anforderung der Abwasserverordnung an AOX vor der Vermischung; der ausschließliche Einsatz von Kühlschmierstoffen ohne organische Halogenverbindungen gehört nach Prüfung im Einzelfall zu den Voraussetzungen, unter denen sie als eingehalten gilt) und das Abfallrecht (gebrauchte Stoffe mit Abfallschlüssel und Sternchen: Nachweis, Register, Vermischungsverbot).
`tags: praxisbeispiel-vantera, kuehlschmierstoff, rechtsbereiche` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.2-41
**Frage:** Was gilt für Altöle zusätzlich zum Kreislaufwirtschaftsgesetz, und wie ist es bei wassergemischten Bearbeitungsemulsionen?
**Antwort:** Für Altöle gilt zusätzlich die Altölverordnung: Altöle dürfen grundsätzlich nicht mit anderen Abfällen vermischt werden (Ausnahmen gelten in dafür zugelassenen Anlagen), Altöle unterschiedlicher Sammelkategorien grundsätzlich nicht untereinander; die stoffliche Verwertung hat Vorrang vor der energetischen Verwertung und der Beseitigung, soweit technisch möglich und wirtschaftlich zumutbar. Wassergemischte Bearbeitungsemulsionen sind in der Zuordnungstabelle der Verordnung keiner Sammelkategorie zugeordnet; für sie gilt daher vor allem das Vermischungsverbot des Kreislaufwirtschaftsgesetzes, und die Einordnung im Einzelfall klärt die Entsorger:in mit der Behörde.
`tags: altoel, abfallrecht, praxisbeispiel-vantera` · `schwierigkeit: schwer` · `bloom: verstehen`

## Quiz (anzuhängen am Ende der Datei)

#### Q-10.2-18 · Multiple Choice
**Frage:** An der Abluftöffnung der Absauganlage einer Halle der Vantera Präzisionstechnik GmbH wird Staub gemessen, ebenso auf dem Nachbargrundstück, auf das der Staub weht. Welche Aussage ordnet die beiden Messungen richtig ein?
- [ ] Beide Messungen betreffen Emissionen, weil der Staub aus derselben Anlage stammt.
- [x] Die Messung an der Abluftöffnung betrifft die Emission, die Messung auf dem Nachbargrundstück die Immission.
- [ ] Die Messung an der Abluftöffnung betrifft die Immission, die Messung auf dem Nachbargrundstück die Emission.
- [ ] Beide Messungen betreffen Immissionen, weil der Staub die Umwelt belastet.
**Erklärung:** Die Emission ist der Ausstoß an der Quelle, hier an der Abluftöffnung der Anlage. Die Immission ist die Belastung am Ort der Wirkung, hier auf dem Nachbargrundstück. Typische Fehler: beide Begriffe gleichsetzen oder Quelle und Wirkungsort vertauschen.
`tags: immissionsschutz, emission, immission` · `schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.2-19 · Mehrfachauswahl
**Frage:** Welche Aussagen zu den Betreiberpflichten genehmigungsbedürftiger Anlagen treffen zu?
- [ ] Schädliche Umwelteinwirkungen müssen nur auf ein Mindestmaß beschränkt werden; ganz verhindern muss das Betreiberunternehmen sie nicht.
- [x] Es ist Vorsorge zu treffen, insbesondere durch Maßnahmen nach dem Stand der Technik.
- [ ] Mit der Betriebseinstellung enden die Pflichten; um Anlage und Grundstück muss sich niemand mehr kümmern.
- [x] Energie ist sparsam und effizient zu verwenden.
**Erklärung:** Für genehmigungsbedürftige Anlagen gilt: schädliche Umwelteinwirkungen nicht hervorrufen, Vorsorge nach dem Stand der Technik, Abfälle vermeiden, verwerten oder ordnungsgemäß beseitigen und Energie sparsam und effizient verwenden. Die Beschränkung auf ein Mindestmaß ist die abgeschwächte Pflicht für nicht genehmigungsbedürftige Anlagen. Auch nach einer Betriebseinstellung dürfen von Anlage und Grundstück keine Gefahren ausgehen.
`tags: immissionsschutz, betreiberpflichten` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-20 · Wahr/Falsch
**Aussage:** Wird die Schwelle, ab der eine Anlage genehmigungsbedürftig ist, erst durch eine Erweiterung überschritten, braucht die gesamte Anlage eine Genehmigung.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Nicht nur der neu hinzukommende Teil ist genehmigungsbedürftig, sondern die gesamte Anlage. Mehrere Anlagen derselben Art auf demselben Betriebsgelände werden dafür unter Umständen zusammengerechnet. Die verbindliche Zuordnung trifft die zuständige Behörde; der Betrieb klärt die Frage vor der Investition, nicht danach.
`tags: immissionsschutz, genehmigung, erweiterung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-21 · Zuordnung
**Anweisung:** Ordne jeden Begriff des Kreislaufwirtschaftsrechts seiner Beschreibung zu.
- Erzeuger:in (Ersterzeugung) ↔ Verursacht den Abfall durch die eigene Tätigkeit
- Erzeuger:in (Zweiterzeugung) ↔ Verändert den Abfall durch Behandlung oder Mischung in seiner Beschaffenheit
- Besitzer:in ↔ Hat die tatsächliche Sachherrschaft über den Abfall
- Abfall zur Beseitigung ↔ Abfall, der nicht verwertet wird
**Erklärung:** Wer Abfälle behandelt oder mischt und sie dadurch in ihrer Beschaffenheit verändert, wird selbst zur Erzeuger:in (Zweiterzeugung). Besitzer:in ist, wer die tatsächliche Sachherrschaft über den Abfall hat, unabhängig davon, wer ihn verursacht hat. Abfälle, die verwertet werden, heißen Abfälle zur Verwertung, alle anderen Abfälle zur Beseitigung.
`tags: kreislaufwirtschaftsgesetz, erzeuger, besitzer` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-22 · Was passt nicht dazu
**Frage:** Ein Stoff fällt bei einem Herstellungsverfahren an, dessen Hauptzweck nicht seine Herstellung ist. Welche Angabe gehört nicht zu den vier Voraussetzungen, unter denen er als Nebenprodukt und nicht als Abfall gilt?
- [ ] Die Weiterverwendung ist sichergestellt.
- [ ] Der Stoff entsteht als integraler Bestandteil des Herstellungsprozesses.
- [x] Die Behörde hat den Stoff vorab als Nebenprodukt anerkannt.
- [ ] Die Weiterverwendung ist rechtmäßig.
**Erklärung:** Die vier Voraussetzungen sind: Weiterverwendung sichergestellt, keine über ein normales industrielles Verfahren hinausgehende Vorbehandlung nötig, Entstehung als integraler Bestandteil des Herstellungsprozesses und rechtmäßige Weiterverwendung. Alle vier müssen erfüllt sein; fehlt eine, bleibt es Abfall. Eine vorherige Anerkennung durch die Behörde ist keine Voraussetzung, die Behörden dürfen die Einordnung aber überprüfen.
`tags: kreislaufwirtschaftsgesetz, nebenprodukt` · `schwierigkeit: schwer` · `bloom: analysieren`

#### Q-10.2-23 · Multiple Choice
**Frage:** Welche Aussage zum Verhältnis der Stufen der Abfallhierarchie trifft zu?
- [ ] Die Rangfolge ist eine starre Liste, von der in keinem Fall abgewichen werden darf, auch nicht bei besserem Schutz.
- [ ] Der Betrieb darf von der Rangfolge frei abweichen, sobald die nachrangige Maßnahme für ihn billiger ist.
- [x] Vorrang hat die Maßnahme, die Mensch und Umwelt über den gesamten Lebenszyklus am besten schützt.
- [ ] Die Abfallhierarchie gilt nur für Betriebe, die eine genehmigungsbedürftige Anlage betreiben, nicht für andere Betriebe.
**Erklärung:** Die Abfallhierarchie ist keine starre Rangliste, aber auch kein Freibrief für Kostenentscheidungen: Maßstab ist der bestmögliche Schutz von Mensch und Umwelt über den gesamten Lebenszyklus, wobei technische Möglichkeit, wirtschaftliche Zumutbarkeit und soziale Folgen zu beachten sind. Sie gilt für den Umgang mit Abfällen allgemein, nicht nur für bestimmte Anlagen.
`tags: abfallhierarchie, kreislaufwirtschaftsgesetz` · `schwierigkeit: schwer` · `bloom: analysieren`

#### Q-10.2-24 · Zuordnung
**Anweisung:** Ordne jeden Baustein der Nachweisführung bei gefährlichen Abfällen seiner Beschreibung zu.
- Entsorgungsnachweis ↔ Belegt vor Beginn der Entsorgung, dass sie zulässig ist
- Begleitschein ↔ Belegt bei jeder Übergabe die durchgeführte Entsorgung
- Deklarationsanalyse ↔ Angabe von Art, Beschaffenheit und Zusammensetzung des Abfalls
- Register ↔ Verzeichnis unter anderem von Menge, Art und Ursprung sowie Bestimmung und Art der Verwertung oder Beseitigung
**Erklärung:** Der Entsorgungsnachweis kommt vor der Entsorgung, der Begleitschein belegt sie bei der Übergabe; beides wird mit dem Register zusammengeführt, in das die Erzeuger:in ihre Belege legt. Die Deklarationsanalyse gehört zur verantwortlichen Erklärung im Entsorgungsnachweis. Typischer Fehler: Entsorgungsnachweis und Begleitschein vertauschen.
`tags: nachweisverfahren, entsorgungsnachweis, begleitschein, register` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-25 · Sortieren
**Anweisung:** Bringe die Schritte der Nachweisführung bei einer Entsorgung gefährlicher Abfälle der Vantera in die zeitliche Reihenfolge (die Bestätigung der Behörde, die unter Umständen entfällt, ist ausgelassen).
1. Die Erzeuger:in gibt die verantwortliche Erklärung mit Deklarationsanalyse ab
2. Die Entsorger:in gibt die Annahmeerklärung ab
3. Bei der Übergabe der Abfälle wird der Begleitschein verwendet
4. Die Exemplare des Begleitscheins werden als Beleg ins Register gelegt
**Erklärung:** Vor der Entsorgung steht der Entsorgungsnachweis mit verantwortlicher Erklärung und Annahmeerklärung. Bei der Übergabe wird der Begleitschein verwendet, danach legt die Erzeuger:in ihre Exemplare als Beleg ins Register.
`tags: nachweisverfahren, entsorgungsnachweis, begleitschein` · `schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.2-26 · Multiple Choice
**Frage:** Die Vantera Präzisionstechnik GmbH lässt gebrauchte Kühlschmierstoff-Emulsion von einem Entsorgungsfachbetrieb abholen. Welche Aussage trifft zu?
- [ ] Mit der Übergabe an den Entsorgungsfachbetrieb geht die Verantwortung der Vantera vollständig auf diesen über.
- [ ] Gefährliche Abfälle dürfen ausschließlich Entsorgungsfachbetrieben übergeben werden, andere Entsorgungsunternehmen sind ausgeschlossen.
- [x] Die Vantera bleibt verantwortlich, bis die Entsorgung ordnungsgemäß abgeschlossen ist, und muss zuverlässige Dritte auswählen.
- [ ] Die Vantera braucht kein Register mehr zu führen, weil der Entsorgungsfachbetrieb die Nachweise und Unterlagen für sie führt.
**Erklärung:** Wer Dritte beauftragt, bleibt verantwortlich, bis die Entsorgung ordnungsgemäß abgeschlossen ist. Ein Entsorgungsfachbetrieb erleichtert das Verfahren (die behördliche Bestätigung im Entsorgungsnachweis kann entfallen), er macht aber weder das Register noch die Verantwortung der Erzeuger:in überflüssig. Eine allgemeine Pflicht, nur Entsorgungsfachbetriebe zu beauftragen, enthält das Gesetz nicht; die Abfälle müssen aber in zugelassenen Anlagen entsorgt und von Beförderer:innen mit der erforderlichen Erlaubnis transportiert werden.
`tags: nachweisverfahren, entsorgungsfachbetrieb, verantwortung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.2-27 · Wahr/Falsch
**Aussage:** Solange ein Stoff, mit dem in einer Anlage umgegangen wird, noch nicht in eine Wassergefährdungsklasse eingestuft ist, gilt er grundsätzlich als stark wassergefährdend.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Stoffe und Gemische werden als nicht wassergefährdend oder in die Wassergefährdungsklassen 1 (schwach), 2 (deutlich) und 3 (stark) eingestuft. Was noch nicht eingestuft ist, gilt grundsätzlich als stark wassergefährdend, nicht als unbedenklich; deshalb ist die Einstufung des tatsächlich eingesetzten Produkts zu ermitteln.
`tags: wasserrecht, awsv, wassergefaehrdungsklasse` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-28 · Multiple Choice
**Frage:** Die Vantera leitet das Abwasser ihrer mechanischen Werkstatt in die öffentliche Kanalisation ein. Welche Aussage trifft zu?
- [ ] Es ist eine Direkteinleitung; sie braucht eine wasserrechtliche Erlaubnis der zuständigen Behörde.
- [ ] Es ist eine Direkteinleitung; sie ist genehmigungsfrei, wenn das Abwasser zuvor vorbehandelt wurde.
- [ ] Es ist eine Indirekteinleitung; sie ist stets genehmigungsfrei, weil die Kläranlage das Abwasser ohnehin reinigt.
- [x] Es ist eine Indirekteinleitung; sie bedarf der Genehmigung, soweit die Abwasserverordnung Anforderungen stellt.
**Erklärung:** Die Einleitung in die öffentliche Kanalisation ist die Indirekteinleitung, die Einleitung unmittelbar in ein Gewässer die Direkteinleitung. Die Indirekteinleitung bedarf der Genehmigung, soweit die Abwasserverordnung Anforderungen für den Ort des Anfalls oder vor der Vermischung festlegt; das Landesrecht kann weitergehende Erfordernisse vorsehen oder die Genehmigung dem Betreiberunternehmen der Kanalisation übertragen. Deshalb ist das jeweilige Landesrecht zu beachten.
`tags: wasserrecht, abwasser, indirekteinleitung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.2-29 · Mehrfachauswahl
**Frage:** Welche Anforderungen gelten für die Rückhalteeinrichtung (Auffangwanne, Auffangraum) einer Anlage zum Umgang mit wassergefährdenden Stoffen?
- [ ] Sie darf einen Ablauf haben, damit ausgetretene Flüssigkeit abgeleitet werden kann.
- [x] Sie muss flüssigkeitsundurchlässig sein.
- [x] Ihr Volumen richtet sich bei Lager- und Verwendungsanlagen grundsätzlich nach der Menge, die bei einer Betriebsstörung bis zum Wirksamwerden von Sicherheitsvorkehrungen freigesetzt werden kann.
- [ ] Auf sie kann bei jeder Anlage verzichtet werden, sobald die Dichtheit der Anlage regelmäßig kontrolliert wird.
**Erklärung:** Die Rückhalteeinrichtung muss flüssigkeitsundurchlässig sein und darf keine Abläufe haben; ihr Volumen richtet sich grundsätzlich nach der freisetzbaren Menge bei einer Betriebsstörung (für die höchste Gefährdungsstufe D gilt eine strengere Auslegung). Ausnahmen von der Rückhaltung gibt es unter anderem für doppelwandige Anlagen, nicht aber allein wegen regelmäßiger Kontrollen.
`tags: wasserrecht, awsv, rueckhalteeinrichtung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-30 · Zuordnung
**Anweisung:** Ordne jede Funktion ihrer Kernaufgabe zu.
- Immissionsschutzbeauftragte ↔ Betriebskontrollen und Messungen durchführen und Mängel melden
- Abfallbeauftragte ↔ Den Weg der Abfälle von der Entstehung bis zur Verwertung oder Beseitigung überwachen
- Gewässerschutzbeauftragte ↔ Abwasseranlagen regelmäßig kontrollieren sowie Abwasser messen und aufzeichnen
- Umweltmanagementbeauftragte ↔ Die Umsetzung des betrieblichen Umweltschutzes in größeren Unternehmen koordinieren
**Erklärung:** Die drei gesetzlichen Betriebsbeauftragten überwachen jeweils einen Bereich (Immissionsschutz, Abfall, Gewässer) und berichten jährlich. Die oder der Umweltmanagementbeauftragte koordiniert dagegen die Umsetzung des betrieblichen Umweltschutzes insgesamt und wird ergänzt um die gesetzlich vorgeschriebenen Betriebsbeauftragten.
`tags: betriebsbeauftragte, umweltschutz` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-31 · Wahr/Falsch
**Aussage:** Bestellt die Vantera eine Person zur oder zum Abfallbeauftragten, geht die Verantwortung für die Einhaltung der Abfallvorschriften auf diese Person über.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Betriebsbeauftragte beraten die Betriebsleitung und überwachen die Einhaltung der Vorschriften, sie ersetzen aber die Verantwortung der Geschäftsführung nicht. Die Pflichten treffen weiterhin die Erzeuger:innen und Besitzer:innen des Abfalls; stellt die beauftragte Person Mängel fest, meldet sie diese der Betriebsleitung.
`tags: betriebsbeauftragte, verantwortung` · `schwierigkeit: leicht` · `bloom: verstehen`

#### Q-10.2-32 · Lückentext (Wortauswahl)
**Text:** Zur oder zum Betriebsbeauftragten bestellt werden darf nur, wer die erforderliche ___Fachkunde___ und Zuverlässigkeit besitzt.
**Zusätzliche Begriffe:** Prokura; Gesellschafterstellung; Weisungsbefugnis
**Erklärung:** Die Bestellung erfolgt schriftlich mit genauer Aufgabenbeschreibung und wird der Behörde angezeigt. Fachkunde und Zuverlässigkeit sind die Voraussetzungen für die Person; Prokura, Gesellschafterstellung und Weisungsbefugnis werden nicht verlangt. In den Pflichtfällen der Verordnungen muss die Person außerdem betriebsangehörig sein.
`tags: betriebsbeauftragte, bestellung, fachkunde` · `schwierigkeit: mittel` · `bloom: erinnern`

#### Q-10.2-33 · Multiple Choice
**Frage:** Die Geschäftsführung der Vantera besteht aus zwei Personen. Eine genehmigungsbedürftige Anlage wird betrieben; laut Geschäftsverteilung ist eine Person für Technik und Umwelt zuständig. Welche Aussage trifft zu?
- [ ] Die zweite Person der Geschäftsführung ist durch die Geschäftsverteilung von der Verantwortung für die Anlage befreit.
- [x] Der Behörde ist mitzuteilen, wer die Betreiberpflichten wahrnimmt; die Gesamtverantwortung beider bleibt unberührt.
- [ ] Die Betreiberpflichten gehen mit der Bestellung einer oder eines Umweltmanagementbeauftragten auf diese Person über.
- [ ] Eine Mitteilung an die Behörde ist entbehrlich, wenn die Geschäftsführung die Pflichten intern verteilt und das dokumentiert hat.
**Erklärung:** Die interne Aufgabenverteilung entlastet die übrigen Organmitglieder nicht von der Gesamtverantwortung. Der Behörde ist mitzuteilen, wer die Betreiberpflichten wahrnimmt. Beauftragte beraten und überwachen, übernehmen die Betreiberpflichten aber nicht.
`tags: betriebsleitung, gesamtverantwortung, betreiberpflichten` · `schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.2-34 · Wahr/Falsch
**Aussage:** Ein Zertifikat nach ISO 14001 bestätigt das Umweltmanagementsystem; allein daraus folgt nicht, dass alle umweltrechtlichen Vorschriften eingehalten werden.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Das Zertifikat bestätigt das Managementsystem, nicht die Rechtskonformität selbst. Ob die rechtlichen Verpflichtungen eingehalten werden, ermittelt und bewertet das Unternehmen etwa mit einem Rechtskataster und einer regelmäßigen Rechtskonformitätsbewertung.
`tags: rechtskataster, iso-14001, rechtskonformitaet` · `schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.2-35 · Mehrfachauswahl
**Frage:** Welche Aussagen zur Verantwortung der Betriebsleitung für die Aufsicht im Umweltschutz treffen zu?
- [x] Delegieren ist erlaubt, entlastet die Leitung aber nicht vollständig.
- [ ] Mit der Bestellung einer Aufsichtsperson endet die Aufsichtspflicht der Leitung.
- [x] Zur Aufsicht gehören die Bestellung, die sorgfältige Auswahl und die Überwachung der Aufsichtspersonen.
- [ ] Bei einer GmbH betrifft die Aufsichtspflicht nur die Gesellschafter:innen, nicht die Geschäftsführenden.
**Erklärung:** Wer Aufsicht und Organisation vernachlässigt, kann dafür selbst zur Verantwortung gezogen werden. Bei einer GmbH gelten die Vorschriften auch für die Geschäftsführenden als vertretungsberechtigte Organe. Mit der Bestellung einer Aufsichtsperson ist die Pflicht nicht erledigt, denn auch Auswahl und Überwachung gehören zur Aufsicht.
`tags: betriebsleitung, aufsichtspflicht, delegation` · `schwierigkeit: schwer` · `bloom: analysieren`

#### Q-10.2-36 · Multiple Choice
**Frage:** Beim Tankwechsel an einer Maschine der Vantera Präzisionstechnik GmbH sind Hydrauliköl und Kühlschmierstoff in dasselbe Auffanggefäß gelaufen. Wie ist vorzugehen?
- [x] Die Abfälle sind unverzüglich zu trennen, soweit das für eine ordnungsgemäße und schadlose Verwertung erforderlich ist; sonst ist die Mischung unverzüglich in einer dafür zugelassenen Anlage zu behandeln.
- [ ] Die Mischung wird ohne weitere Maßnahmen als ein einziger Abfall abgegeben, weil beide Abfälle ohnehin gefährlich sind und die Mischung daran nichts ändert.
- [ ] Das Vermischen ist unbeachtlich, solange die Entsorger:in die Mischung ohne Beanstandung annimmt und für die Übergabe ein Begleitschein ausgestellt wird.
- [ ] Die oder der Umweltmanagementbeauftragte ist zur Trennung verpflichtet, weil sie oder er den Mangel festgestellt hat und die Abfälle im Betrieb überwacht.
**Erklärung:** Gefährliche Abfälle dürfen nicht vermischt werden; bei Altölen gilt zusätzlich die Altölverordnung. Wurde unzulässig vermischt, ist unverzüglich zu trennen oder zu behandeln. Die Pflichten treffen die Erzeuger:innen und Besitzer:innen des Abfalls, nicht die Beauftragten: Die beauftragte Person meldet den Mangel der Betriebsleitung und schlägt Maßnahmen vor.
`tags: praxisbeispiel-vantera, vermischungsverbot, altoel` · `schwierigkeit: schwer` · `bloom: anwenden`

#### Q-10.2-37 · Wahr/Falsch
**Aussage:** Ein gebrauchtes nichtchloriertes Hydrauliköl auf Mineralölbasis und ein gebrauchtes halogenfreies Bearbeitungsöl auf Mineralölbasis dürfen nach der Altölverordnung grundsätzlich miteinander vermischt werden, weil beide Altöle sind.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Altöle unterschiedlicher Sammelkategorien dürfen grundsätzlich nicht untereinander gemischt werden, und mit anderen Abfällen dürfen Altöle ebenfalls nicht vermischt werden. Nichtchlorierte Hydrauliköle auf Mineralölbasis (13 01 10*) gehören zur Sammelkategorie 1, halogenfreie Bearbeitungsöle auf Mineralölbasis (12 01 07*) zur Sammelkategorie 2. Ausnahmen gelten nur in dafür zugelassenen Anlagen. Bei wassergemischten Bearbeitungsemulsionen (12 01 09*) ist die Lage anders: Sie stehen in der Zuordnungstabelle der Verordnung in keiner Sammelkategorie, hier gilt vor allem das Vermischungsverbot des Kreislaufwirtschaftsgesetzes, und die Einordnung im Einzelfall klärt die Entsorger:in mit der Behörde.
`tags: altoel, praxisbeispiel-vantera, vermischungsverbot` · `schwierigkeit: schwer` · `bloom: anwenden`

#### Q-10.2-38 · Kurzantwort
**Frage:** Wie heißt die Verordnung, die für Altöle zusätzlich zum Kreislaufwirtschaftsgesetz gilt?
**Akzeptierte Antworten:** Altölverordnung; AltölV; Altöl-Verordnung; Altölverordnung (AltölV)
**Erklärung:** Die Altölverordnung verbietet grundsätzlich die Vermischung von Altölen mit anderen Abfällen und von Altölen unterschiedlicher Sammelkategorien untereinander; die stoffliche Verwertung hat Vorrang vor der energetischen Verwertung und der Beseitigung, soweit technisch möglich und wirtschaftlich zumutbar.
`tags: altoel, abfallrecht` · `schwierigkeit: leicht` · `bloom: erinnern`

## Glossar-Vorschläge

Ein Glossar für das Fachgebiet HQ3 des Kurses gibt es noch nicht (im Kurs besteht nur `hq1/glossar.md`). Die Einträge wären in einer neuen Datei `content/technischer-fachwirt/hq3/glossar.md` anzulegen, mit Frontmatter nach dem Muster von `hq1/glossar.md` (`fachgebiet_code: HQ3`, `thema_code: "HQ3-glossar"`). Die Abschnittsnamen entsprechen wörtlich den `###`-Überschriften in 10.2; alle Definitionen stehen unter 300 Zeichen, ohne Markdown, und enthalten nur Aussagen aus dem Theorietext.

#### Emission
**Thema:** 10.2
**Abschnitt:** Bundes-Immissionsschutzgesetz im Überblick
**Definition:** Luftverunreinigungen, Geräusche, Erschütterungen, Licht, Wärme und Strahlen, die von einer Anlage ausgehen. Die Emission ist der Ausstoß an der Quelle.
**Geprüft:** nein

#### Immission
**Thema:** 10.2
**Abschnitt:** Bundes-Immissionsschutzgesetz im Überblick
**Definition:** Dieselben Einwirkungen wie bei der Emission, aber am Ort, an dem sie auf Menschen, Tiere, Pflanzen, Boden, Wasser oder Sachgüter treffen. Die Immission ist die Belastung am Ort der Wirkung.
**Geprüft:** nein

#### Vermischungsverbot
**Thema:** 10.2
**Abschnitt:** Kreislaufwirtschaftsrecht: Pflichten der Abfallerzeuger
**Definition:** Gefährliche Abfälle dürfen nicht mit anderen Kategorien gefährlicher Abfälle und nicht mit anderen Abfällen, Stoffen oder Materialien vermischt oder verdünnt werden. Ausnahmen gelten nur in dafür zugelassenen Anlagen.
**Geprüft:** nein

#### Entsorgungsnachweis
**Thema:** 10.2
**Abschnitt:** Nachweisführung bei gefährlichen Abfällen
**Definition:** Belegt vor Beginn der Entsorgung gefährlicher Abfälle, dass sie zulässig ist. Er besteht aus Deckblatt, verantwortlicher Erklärung der Erzeuger:in, Annahmeerklärung der Entsorger:in und (unter Umständen entfallender) Bestätigung der Behörde.
**Geprüft:** nein

#### Begleitschein
**Thema:** 10.2
**Abschnitt:** Nachweisführung bei gefährlichen Abfällen
**Definition:** Belegt die durchgeführte Entsorgung gefährlicher Abfälle. Bei jeder Übergabe wird je Abfallart ein eigener Satz verwendet; die Erzeuger:in legt ihre Exemplare als Beleg ins Register.
**Geprüft:** nein

#### Entsorgungsfachbetrieb
**Thema:** 10.2
**Abschnitt:** Nachweisführung bei gefährlichen Abfällen
**Definition:** Zertifiziertes Entsorgungsunternehmen. Gilt das gültige Überwachungszertifikat für die betriebene Anlage und Tätigkeit, entfällt die behördliche Bestätigung im Entsorgungsnachweis. Eine Pflicht, nur solche Betriebe zu beauftragen, besteht nicht allgemein.
**Geprüft:** nein

#### Indirekteinleitung
**Auch:** Indirekteinleiter, Direkteinleitung
**Thema:** 10.2
**Abschnitt:** Wasserrecht im Betrieb: Abwasser und wassergefährdende Stoffe
**Definition:** Einleiten von Abwasser in die öffentliche Kanalisation; sie bedarf der Genehmigung, soweit die Abwasserverordnung Anforderungen stellt. Bei der Direkteinleitung gelangt das Abwasser unmittelbar in ein Gewässer.
**Geprüft:** nein

#### Wassergefährdungsklasse
**Auch:** WGK
**Thema:** 10.2
**Abschnitt:** Wasserrecht im Betrieb: Abwasser und wassergefährdende Stoffe
**Definition:** Einstufung wassergefährdender Stoffe und Gemische: WGK 1 schwach, WGK 2 deutlich, WGK 3 stark wassergefährdend. Was nicht eingestuft ist, gilt grundsätzlich als stark wassergefährdend.
**Geprüft:** nein

#### Rückhalteeinrichtung
**Auch:** Auffangwanne, Auffangraum
**Thema:** 10.2
**Abschnitt:** Wasserrecht im Betrieb: Abwasser und wassergefährdende Stoffe
**Definition:** Auffangwanne oder Auffangraum, die ausgetretene wassergefährdende Stoffe zurückhalten. Sie muss flüssigkeitsundurchlässig sein und darf keine Abläufe haben.
**Geprüft:** nein

#### Rechtskataster
**Thema:** 10.2
**Abschnitt:** Verantwortung der Betriebsleitung und Brücke zum Managementsystem
**Definition:** Verzeichnis der für das Unternehmen anwendbaren Vorschriften je Standort und Anlage, mit Verantwortlichen und Fristen. Es dient der Ermittlung und Bewertung der rechtlichen Verpflichtungen nach ISO 14001.
**Geprüft:** nein

## Zu entscheiden

1. **Umfang (40 Aufgaben).** Nach der Prüfung bleibt es bei 19 Karteikarten und 21 Quizfragen (keine Streichung, keine neue Aufgabe). Die Prüfinstanz hat die vier Streichkandidaten K-10.2-31, K-10.2-39, Q-10.2-27 und Q-10.2-32 einzeln bewertet: K-10.2-31 und K-10.2-39 prüfen eigenständigen Theoriegehalt (Kleinmengen und Register; Rechtskataster und Zertifikat) und bleiben; Q-10.2-27 (reines Sortieren der WGK-Stufen) und Q-10.2-32 (zwei vertauschbare Lücken) waren in der alten Form schwach und sind im Entwurf ersetzt bzw. umgebaut. Wer trotzdem auf unter 40 kommen will, streicht zuerst Q-10.2-38 (reine Namensabfrage, Hinweis im Prompt).
2. **Q-10.2-37 und die Emulsionen (K-10.2-41).** Q-10.2-37 fragte, ob Emulsionen einer Sammelkategorie zugeordnet sind; das ist am Primärtext (Anlage 1 der AltölV) bestätigt, aber ein Negativbefund ohne Lerngehalt und rechtlich offen, ob wassergemischte Emulsionen überhaupt „Altöl“ im Sinne von § 1a AltölV sind. Q-10.2-37 ist deshalb durch eine Aufgabe zum Mischverbot unterschiedlicher Sammelkategorien ersetzt (Hydrauliköl gegen Bearbeitungsöl, beides auf Mineralölbasis); der Emulsions-Befund steht nur noch in der Erklärung und in K-10.2-41, jeweils mit dem Hinweis auf die Einzelfall-Klärung. **Entscheidung:** Soll der Emulsions-Satz in K-10.2-41 und in der Theorie bis zur förmlichen Rechtsprüfung (Iteration 22) bleiben oder ganz entfallen? Empfehlung: bleiben, weil er bewusst offen formuliert ist.
3. **Zahlen und Schwellen.** Auftragsgemäß fragt keine Aufgabe nach Mengen-, Frist- oder Wertangaben (30 m³, 0,22 m³, 750 m³, 100 t, 2.000 t, 2 t, drei Jahre, fünf Jahre). K-10.2-31 spricht von „der in der Nachweisverordnung festgelegten Mengengrenze“, ohne die Zahl zu nennen; die Zahl steht in der Theorie. „Unverzüglich“ (K-10.2-28, Q-10.2-36) ist ein Pflichtmerkmal, keine Frist mit Zahl. Q-10.2-20 fragt nach der Rechtsfolge einer überschrittenen Schwelle, nicht nach ihrem Wert. Empfehlung: so lassen.
4. **Theorie-Nachbesserung (nicht von der Prüfinstanz geändert).** In `hq3/10.2-umweltmanagement.md` steht im AwSV-Absatz, das Rückhaltevolumen richte sich bei Lager- und Verwendungsanlagen nach der Menge bei einer Betriebsstörung. Für die Gefährdungsstufe D schreibt § 18 Abs. 4 AwSV eine andere Auslegung vor (größte abgesperrte Betriebseinheit). Die Aufgaben K-10.2-34 und Q-10.2-29 sind mit „grundsätzlich“ abgesichert. Empfehlung: in der Theorie dasselbe Wort ergänzen und den Halbsatz zur Stufe D einfügen. Ebenso: „was nicht eingestuft ist, gilt als stark wassergefährdend“ gilt nach § 3 Abs. 4 AwSV nicht für Stoffe nach Abs. 2 und 3 (zum Beispiel Lebensmittel); Empfehlung „grundsätzlich“ auch dort. Drittens: Die Theorie nennt für die Direkteinleitung „eine Erlaubnis (oder Bewilligung)“; nach § 14 Abs. 1 Nr. 3 WHG ist eine Bewilligung für das Einleiten von Stoffen in Gewässer (§ 9 Abs. 1 Nr. 4 WHG), also auch für Abwasser, ausgeschlossen, § 57 WHG spricht nur von der Erlaubnis. Die Aufgaben K-10.2-32 und Q-10.2-28 sprechen deshalb nur von der Erlaubnis; Empfehlung: die Klammer in der Theorie streichen.
5. **Q-10.2-25 (Sortieren).** Behalten. Die Reihenfolge verantwortliche Erklärung, Annahmeerklärung, Begleitschein, Register ist am Primärtext bestätigt (§ 3 Abs. 2 und 3, § 11, § 24 NachwV); das Auslassen der Behördenbestätigung steht in der Anweisung.
6. **Q-10.2-38 (Kurzantwort).** Behalten, Liste ergänzt um „Altölverordnung (AltölV)“. Die Schreibweisen „Altöl Verordnung“ und „altölverordnung“ erkennt die App ohnehin (Leerzeichen und Groß-/Kleinschreibung werden nicht unterschieden); „Altöl-Verordnung“ mit Bindestrich muss einzeln stehen. „AltölV“ ist die amtliche Abkürzung (gesetze-im-internet.de).
7. **Optionsreihenfolge.** Die App mischt die Antwortoptionen bei Multiple Choice und Mehrfachauswahl zur Laufzeit (`mischeOptionen`); die Position der richtigen Antwort im Entwurf ist deshalb unerheblich. Wichtiger war, dass die richtige Antwort nicht auffällig die längste ist; die Längen sind angeglichen.
8. **Tag-Zeile.** Die Bestandsaufgaben in 10.2 tragen keine `tags`-Zeile, die neuen laut Auftrag schon (andere Dateien des Kurses nutzen sie). Empfehlung: beibehalten; die Tags sind umlautfrei und in Kleinbuchstaben.
9. **Glossar.** Für HQ3 gibt es noch keine `glossar.md`; die zehn Einträge bräuchten eine neue Datei samt Frontmatter. Empfehlung: anlegen, alle mit `Geprüft: nein`. „Indirekteinleitung“ führt „Direkteinleitung“ als Alias, damit das Wort im Lesefenster verlinkt wird, ohne eine zweite Definition zu brauchen. Die Alias-Einträge, die nur eine einfache Endung ergänzten (Emissionen, Immissionen, Begleitscheine, Entsorgungsfachbetriebe), sind entfernt, weil die Software diese Endungen selbst erkennt.
10. **Freigabe.** Alle Aufgaben bleiben rechtsnah (R4): Einspielen erst nach Ihrer Entscheidung, die Freigabe für Minderjährige und die förmliche Rechtsprüfung (Iteration 22) bleiben unberührt.
