# Prüfung P-AU Büro (Team BP): unabhängige Prüfung von `ersetzungen.json`

Stand 23.10.2026. Geprüft: alle 19 Paare, `rechtsangaben.md` (15 Zeilen), `befund-uebersicht.md`.

## Gesamturteil

Keine hohen Befunde. Alle 19 Paare lassen sich nacheinander anwenden. Die Rechtsaussagen stimmen am Rohtext. Zwei mittlere Befunde (M1 Q-1.3-27, M2 K-2.5-11 Verbindlichkeitssatz) und mehrere niedrige. Die Entschärfung der Revision in Q-1.3-26 ist sinnvoll, in Q-1.3-27 ist sie nur halb gelungen.

## Mechanik (Gegenprobe)

- 19 Paare in 6 Dateien nacheinander angewendet (Skript im Scratchpad): jede alte Zeichenkette genau einmal und einzeilig im aktuellen Bestand, keine neue enthält die eigene alte, keine alte kommt in der neuen eines anderen Paares vor.
- Keine Item-ID (`####`-Zeile) und kein Fachgesprächs-Fragetext berührt: Die Fachgespräch-Paare beginnen mit „Erwartung:“.
- Dateien haben LF-Zeilenenden, Einzelzeilen, kein Kodierungsproblem.

## Befunde

### Mittel

**M1. Q-1.3-27 (`hb1/1.3`, Paar 5): Zuordnung der Revisionsabteilung nach der Änderung mehrdeutig.**
Neu: „Revisionsabteilung, berichtet ihre Prüfergebnisse unmittelbar an den Vorstand und meldet sich bis zum Betriebsstart nicht → Zufriedenstellen“. Die Erklärung der Aufgabe fragt „Wie viel Einfluss hat die Person (Freigaben, Budget, Personal)?“; die Revisionsabteilung hat nach dem neuen Wortlaut keinen davon. Wer sie als Einfluss gering und Interesse gering liest, ordnet sie unter „Beobachten“ ein, und das ist vertretbar. Die Aufgabe ist damit nicht mehr eindeutig (alt war sie es nur dank des erfundenen Prüfrechts). Die Berichtslinie an den Vorstand ist außerdem genau die Konstellation, die Art. 38 Abs. 3 DSGVO für die Datenschutzbeauftragte nennt, nicht ein Einfluss auf das Projekt.
Korrektur (Paar 5, neue Zeichenkette): `- Rechtsabteilung, muss den Vertrag mit dem Softwarelieferanten vor der Unterschrift freigeben und meldet sich bis dahin nicht → Zufriedenstellen`. Das ist wie die anderen Zufriedenstellen-Zeilen eine Annahme des Falls (Freigabe) und keine Rechtsaussage. Die Erklärung von Q-1.3-27 bleibt (Freigaben). Wer die Revision behalten will, muss ihr Einfluss geben („…und kann beim Vorstand den Betriebsstart aufschieben lassen“); das ist aber wieder ein unbelegter Praxissatz.
Antwort auf die Frage 1 des Auftraggebers: Q-1.3-26 (Paare 3 und 4) behalten, die Entschärfung ist richtig (Revision prüft und berichtet; ein Untersagungsrecht ist weder im Kurs noch an einer Norm belegt). Q-1.3-27 wie oben ändern oder die Zeile tauschen.

**M2. K-2.5-11 (`hb2/2.5`, Paar 1): zweiter Satz zur Verbindlichkeit zu absolut formuliert.**
„… gilt nur, wenn sie vereinbart oder betrieblich festgelegt wird.“ Die Rechtsangaben (Nr. 11) markieren die Aussage selbst als „vermutet“. Dass DIN-Normen keine Rechtsnormen sind und ihre Anwendung grundsätzlich freiwillig ist, ist allgemeiner Grundsatz; „nur, wenn“ schließt aber Verweise in Gesetzen, Verwaltungsvorschriften oder Behördenhausregeln aus („betrieblich“ passt auf Behörden nicht). Außerdem fragt die Karte nur nach dem Namen der Norm; der Satz ist Zugabe.
Antwort auf Frage 3: nicht streichen müssen, aber weicher fassen. Korrektur (Paar 1, neue Zeichenkette): `**Antwort:** DIN 5008 (Schreib- und Gestaltungsregeln für die Text- und Informationsverarbeitung). Die Norm ist keine gesetzliche Vorgabe; ihre Anwendung ist grundsätzlich freiwillig und wird zum Beispiel im Betrieb festgelegt.` Wer lieber auf Nummer sicher geht, streicht den zweiten Satz ersatzlos (Titel ist am DIN-Katalog bestätigt, siehe unten); dann entfällt auch die „vermutet“-Zeile Nr. 11 zur Hälfte.

### Niedrig

**N1. Q-3.1-01 (`hb3/3.1`, Paar 2): richtige Antwort ist die längste (Bestandsfehler, nicht neu).**
Optionslängen: 88 / 115 (richtig) / 101 / 94 (neuer Distraktor). Die richtige Option war schon vorher die längste (Distraktor alt 82). Wenn das Paket die Option ohnehin anfasst, bietet sich an, den Distraktor zu verlängern und damit Hausregel und Fehlerart in einem zu beheben.
Korrektur (Paar 2, neue Zeichenkette): `- [ ] Personalplanung ist gesetzlich nicht geregelt, und ein Betriebsrat hat dabei keinerlei Unterrichtungs- oder Beratungsrechte.` (124 Zeichen, länger als die richtige Option mit 115; genau eine richtige Antwort bleibt).

**N2. Q-3.1-01 Erklärung (Paar 1): „echte Mitbestimmung gibt es erst bei einzelnen personellen Maßnahmen“ zu absolut.**
Am Rohtext gelesen: § 92 BetrVG gibt Unterrichtungs- und Beratungsrechte (richtig). Aber § 95 Abs. 1 BetrVG verlangt für Auswahlrichtlinien (Einstellungen, Versetzungen, Umgruppierungen, Kündigungen) die Zustimmung des Betriebsrats, ohne dass es um eine einzelne Maßnahme geht; „erst“ stimmt deshalb nicht streng. Der Bestand (FG 3.1 Erwartung, K-3.1-06) sagt dasselbe vereinfacht, deshalb nur niedrig.
Korrektur: `… Unterrichtungs- und Beratungsrechten; Mitbestimmung gibt es dagegen vor allem bei einzelnen personellen Maßnahmen wie einer Einstellung.`

**N3. K-3.1-10 (Paar 3/4): Frage („unterzeichneten Niederschrift“) und Antwort („Textform genügt“) wirken widersprüchlich.**
Der Gesetzestext macht es genauso (Satz 1: Niederschrift unterzeichnen, Satz 2: Textform elektronisch möglich), und „unter bestimmten Voraussetzungen“ ist richtig; für Lernende bleibt aber unklar, dass die Textform die Unterschrift ersetzt. Korrektur (Antwort): `Das Nachweisgesetz (NachwG); die Fristen sind gestaffelt, und unter bestimmten Voraussetzungen kann die Niederschrift statt unterzeichnet auf Papier elektronisch in Textform übermittelt werden.` (Der Branchenausschluss nach dem Schwarzarbeitsbekämpfungsgesetz ist mit „unter bestimmten Voraussetzungen“ gedeckt.)

**N4. F-HB3-02 Musterlösung TA3 (Paar 19): „möglichst unparteiische Gesprächsleitung“ passt nicht zum Begriff der Theorie.**
Theorie 3.3 nennt die Leitung des Klärungsgesprächs „allparteilich“ (nicht neutral im engeren Sinn). Korrektur: `Teilaufgabe 3: allparteiliche Gesprächsleitung (keine Mediation im engeren Sinn), Perspektivenklärung,`. Optional ergänzen: Theorie 3.3 nennt die Mediation als nächste Stufe bei starker Eskalation; TA1 verlangt Indizien für eine fortgeschrittene Eskalation, die Musterlösung könnte „Mediation durch neutrale Person, falls das Klärungsgespräch scheitert“ als Zusatzpunkt nennen (Punkteraster 4+5+6+5 = 20 bleibt, kein Zusatzpunkt nötig).

**N5. F-HB3-01 TA4 (Paar 17): „Rückmelde- und Fördergespräch“ weicht vom Wortlaut der Theorie und der Musterlösung ab.**
Theorie 3.2 und Musterlösung nennen „Feedback-Gespräch“ und „Fördergespräch“. Korrektur: „… (z. B. anhand eines Feedback- und Fördergesprächs) …“. Außerdem: Ausgangssituation und übrige Teile von F-HB3-01 enthalten weiter „eines neu eingestellten Auszubildenden“ (nicht Teil der Paare); TA4 ist jetzt gegendert, der Rest nicht. Optional ein Paar für die Ausgangssituation.

**N6. Q-3.1-10 (Paar 6): Akzeptierte Antworten.**
Vorhanden: Nachweisgesetz; Nachweis-Gesetz; das Nachweisgesetz; NachwG. Rein optional ergänzen: `Nachweisgesetz (NachwG)`, weil Lernende die Klammerform aus Q-3.1-02 kennen.

### Kein Befund (geprüft)

- Q-1.3-24, Paar 1 (IT-Sicherheitsverantwortliche mit Freigabe nach interner Richtlinie): sinnvoll, Fall bleibt eindeutig; K-1.3-19 Frage und Antwort passen zusammen.
- Q-1.3-26 Paare 3 und 4 (Leiterin Betriebsorganisation, Erklärung): sinnvoll, Zuordnung eindeutig (Freigabe = hoher Einfluss, meldet sich nur bei Problemen = geringes Interesse); die drei Freigabe-Zeilen derselben Bemus-Aufgaben (Q-1.3-24, -26) wiederholen das Muster „nach interner Richtlinie freigeben“ bewusst, kein Fehler.
- Q-3.1-01 Distraktor 4: nach der Änderung eindeutig falsch („gesetzlich nicht geregelt“ und „keinerlei Rechte“ sind beide falsch), genau eine richtige Antwort.
- Fachgespräch (Paare 7/8): § 48 Abs. 2 Nr. 1 BBiG und § 7 BüroMKfAusbV bestätigt; Fragetexte unverändert; Formulierung deckt sich mit Theorie 3.2.
- F-HB3-01 TA4 und F-HB3-02 TA3: Punkteraster 6+5+5+4 und 4+5+6+5 = 20, bleibt.
- Hausregeln: Gendern in den neuen Texten in Ordnung („Arbeitgebende“, „ausbildende Person“, „der oder die Auszubildende“); Fälle siezen; keine neuen Paragrafen und Gesetzesnamen in Karten und Quiz (Nachweisgesetz stand schon da); „Stand Oktober 2026, vor Verwendung prüfen“ steht in der Theorie 2.3 (einzige Theoriestelle mit neuer Rechtsangabe); keine Arbeitsvermerke („gelesen“, „vermutet“, Ich-Sätze) im Lerntext; Rechtsstand der Dateien setzt `einspielen.cjs`.

## Rechtsfaktencheck am Rohtext (selbst nachgelesen, 23.10.2026)

| Aussage | Quelle | Ergebnis |
|---|---|---|
| Datenschutzbeauftragte: Unterrichtung, Beratung, Überwachung, Beratung zur Folgenabschätzung, Zusammenarbeit mit Aufsichtsbehörde; kein Entscheidungsrecht | Art. 39 Abs. 1 DSGVO (publications.europa.eu, Amtsblatt-Text) | bestätigt |
| Weisungsfrei, nicht abberufbar oder benachteiligt wegen Aufgabenerfüllung, berichtet unmittelbar der höchsten Managementebene | Art. 38 Abs. 3 DSGVO | bestätigt |
| Benennungspflicht (Kerntätigkeit usw.), Beschäftigte oder Dienstleister möglich | Art. 37 Abs. 1, 6 DSGVO | bestätigt |
| Schwelle „in der Regel mindestens 20 Personen ständig mit automatisierter Verarbeitung“ (im Kurs nicht genannt) | § 38 Abs. 1 BDSG | bestätigt; „Anhebung nicht beschlossen“ nicht von mir geprüft, folgenlos |
| Niederschrift schriftlich niederlegen, unterzeichnen, aushändigen; Textform elektronisch mit Zugänglichkeit/Speicher-/Ausdruckbarkeit und Empfangsnachweis; Fristen erster Tag, siebter Kalendertag, ein Monat; elektronische Form (qualifizierte Signatur) ausgeschlossen | § 2 Abs. 1 NachwG | bestätigt (Sätze 1, 2, 8, 9; Bereichsausschluss für § 2a SchwarzArbG in Satz 6) |
| Personalplanung: Unterrichtung und Beratung; Vorschläge des Betriebsrats | § 92 Abs. 1, 2 BetrVG | bestätigt |
| Zustimmung bei Einstellung, Eingruppierung, Umgruppierung, Versetzung in Unternehmen mit in der Regel mehr als zwanzig wahlberechtigten Arbeitnehmern | § 99 Abs. 1 BetrVG | bestätigt |
| Auswahlrichtlinien bedürfen der Zustimmung | § 95 Abs. 1 BetrVG | bestätigt, Grundlage von N2 |
| Kaufvertrag, Dienstvertrag, Werkvertrag (Erfolg: Herstellung, Veränderung, sonstiger Arbeitserfolg) | §§ 433, 611, 631 BGB | bestätigt |
| Lieferung herzustellender beweglicher Sachen: Kaufvorschriften, bei nicht vertretbaren Sachen zusätzlich einzelne Werkvertragsvorschriften | § 650 Abs. 1 BGB | bestätigt; „überwiegend die Kaufregeln“ ist zulässige Kurzfassung |
| Zwischenprüfung entfällt, wenn die Abschlussprüfung in zwei zeitlich auseinanderfallenden Teilen durchgeführt wird | § 48 Abs. 2 Nr. 1 BBiG | bestätigt |
| Abschlussprüfung besteht aus Teil 1 und Teil 2; Teil 1 soll im vierten Ausbildungshalbjahr stattfinden; Inkrafttreten 01.08.2025, Verordnung von 2013 außer Kraft | §§ 7, 19 BüroMKfAusbV (gesetze-im-internet.de/b_romkfausbv_2025) | bestätigt |
| Titel „Schreib- und Gestaltungsregeln für die Text- und Informationsverarbeitung“, Ausgabe 2020-03, Status aktuell | DIN-Katalogseite dinmedia.de/de/norm/din-5008/318422674 | bestätigt (Normtext selbst kein freier Rohtext) |

Zahl der am Rohtext geprüften Rechtsaussagen: 13 Zeilen (DSGVO Art. 37, 38, 39; BDSG § 38; NachwG § 2; BetrVG §§ 92, 95, 99; BGB §§ 433, 611, 631, 650; BBiG § 48; BüroMKfAusbV §§ 7, 19; DIN-Titel).

### „Vermutet“-Aussagen: im Lerntext als gesichert dargestellt?

- Rolle der Revision (Rechtsangaben Nr. 3/4): kein Gesetzessatz im Lerntext; „berichtet unmittelbar an den Vorstand“ ist erkennbar Annahme des Falls. Unproblematisch, aber siehe M1 zur Zuordnung.
- Werk-/Dienstvertrag-Beispiele (Nr. 9/10): im Lerntext mit „z. B.“, „je nach Leistung“ und „Die Einordnung hängt vom Einzelfall ab“ hinreichend abgesichert; die Regel zu § 650 ist am Rohtext belegt. In Ordnung. Die Karte K-2.3-08 hat keinen „Einzelfall“-Zusatz, das genügt bei „Je nach Leistung“ und „z. B.“.
- Verbindlichkeit der DIN 5008 (Nr. 11): im Lerntext als feste Regel („gilt nur, wenn“), siehe M2.

## Bestand und Spiele (nur gelesen)

- `docs/pruefblaetter/12-buero-projektorganisation.md` bestätigt: Z. 147 („Datenschutzbeauftragte, kann die Freigabe verweigern …“), Z. 203 („Revision, kann den Einsatz der Software untersagen …“), Z. 234 („Revisionsabteilung, darf den Softwarebetrieb später prüfen …“); Z. 213 ist die Erklärung zu Q-1.3-26 mit „Revision und Vorstand haben Macht …“ (wird beim Neuexport korrekt). Sonstige Treffer zu den anderen geänderten Items im Prüfblatt: keine.
- Spiele (`game-kennzahlen-duell-projektmanagement.ts`, `game-kennzahlen-duell-buero-kennzahlen.ts`, `game-memory-personalkennzahlen.ts`, `game-prozessreihenfolge.ts`, `game-belegdetektiv-einkauf.ts`, `game-kennzahlen-duell-recht-berufsausbildung.ts`): keine Stelle mit Datenschutzbeauftragter, Freigabe, Kaufvertrag, DIN 5008, Nachweisgesetz, Personalplanung/Mitbestimmung oder Revision gefunden. Die Treffer zum Betriebsrat in `game-kennzahlen-duell-recht-berufsausbildung.ts` (§§ 102 BetrVG, 45 BBiG) betreffen Ausbildungsrecht und nicht diese Paare. `game-prozessreihenfolge.ts` Z. 122/281 nennt die Vier-Stufen-Methode als Unterweisungsmethode, im Einklang mit der Begründung von F-HB3-01 TA4.
- Kurs `content/fachwirt-buero-projektorganisation/`: nach Anwendung der Paare keine verbleibende Stelle mit den alten Formulierungen. `hb4/4.2` und `hb4/fachgespraech.md` (Kaufvertrag als Beschaffungsvertrag) bleiben zu Recht; Glossar gibt es im Kurs nicht.

## Zusammenfassung der Korrekturvorschläge (priorisiert)

1. M1: Paar 5 in `hb1/1.3` (Q-1.3-27) auf Rechtsabteilung mit Freigabe umstellen (oder Revision mit belegtem Einfluss).
2. M2: Paar in `hb2/2.5` (K-2.5-11) zweiten Satz weicher fassen oder streichen.
3. N1/N2: Q-3.1-01 Distraktor verlängern und Erklärung „vor allem“ statt „erst“.
4. N3 bis N6: Wortlaut K-3.1-10, Musterlösung TA3 („allparteilich“), TA4 („Feedback- und Fördergespräch“), optional Akzeptierte Antworten.
