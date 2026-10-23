# Prüfung Cluster 2 (P-AZ): fu7, fu1, fu2, ae1, dp2 (60 Einträge)

Unabhängige Prüfung am 23.10.2026. Geprüft wurden `glossar-fu7.md` (15), `glossar-fu1.md` (14), `glossar-fu2.md` (11), `glossar-ae1.md` (9), `glossar-dp2.md` (11) und `bericht-cluster2.md`. Nichts geändert, nichts committet.

## Methode (was ich selbst nachgeprüft habe)

- Theorie der sechs Themendateien vollständig gelesen (fu7/7.6, fu1/1.2, fu1/1.3, fu2/2.2, ae1/8.3, dp2/9.2), dazu Auszüge der Rechtsangaben-Blätter (h, i, j, k, l, m).
- Primärquellen gegengelesen (gesetze-im-internet.de): BFSG §§ 2, 4, 16, 17; BGB §§ 312k, 356a; UrhG § 44b. Data Act (eur-lex) war nicht abrufbar; dort gilt der Befund des Blatts `rechtsangaben-h.md` (Rohtext Art. 2, 4, 5, 25, 29 laut Blatt gelesen).
- Mechanik per Skript: `Thema:`-Code gegen `thema_code` der Zieldatei, jede `Abschnitt:`-Zeile als `###`-Überschrift, Länge, Ziffern, Anrede, Substring-Kollision gegen `bestand-begriffe.txt`, Kollision gegen die Cluster-1-Entwürfe (`glossar-fu6/ae2/dv4/si5`).
- **Neu gegenüber dem Bericht:** Ich habe den echten Fachbegriff-Sucher (`packages/shared/src/fachbegriffe.ts`: ganzes Wort, einfache Endungen e/en/er/es/n/s, je Text nur erstes Vorkommen, Akronyme exakt) über den gesamten Inhalt der vier Kurse laufen lassen. Daraus ergeben sich Fehlmarkierungen in fremden Themen und tote Einträge, die der Bericht („Aliase kommen im Lerntext vor“) nicht sieht.

## Mechanik: Ergebnis

Bestanden: Parser liest alle 60 Blöcke, `Thema:` stimmt überall, alle 60 `Abschnitt:`-Zeilen sind wörtlich `###`-Überschriften, keine Definition über 280 Zeichen (Maximum 277), keine Paragrafen, Beträge, Daten, kein Du/Sie, keine Doppelungen mit dem Bestand, **keine Kollision mit den Cluster-1-Entwürfen** (Begriffe und Aliase überschneiden sich nicht; „Hersteller (CRA)“, „Anbieter (KI-Verordnung)“ usw. sind qualifiziert). Der Bericht („Kollisionsrisiken ... nicht geprüft“) ist damit erledigt: keine Kollision. Einzige Ziffernfunde: „W3C“ und „EN 301 549“ (Normname, unkritisch).

Nicht bestanden: Gendern (Befund M16), und der Sucher markiert in fremden Themen und lässt acht Einträge ganz ins Leere laufen (0 Treffer: Sachmangel, Unterlassungsanspruch, Wettbewerbsrechtliche Abmahnung, Maschinenlesbarer Nutzungsvorbehalt, Assistive Technologie, Kleinstunternehmen-Ausnahme, Unverhältnismäßige Belastung, Nutzer vernetzter Produkte) (Befunde H1, H2, M1 bis M4, N1).

---

## Befunde HOCH (4)

### H1 — Nacherfüllung (`glossar-fu7.md`): falsch im Werkvertrag
Problem: Die Definition sagt „nach Wahl der Käuferseite“. Der Sucher markiert „Nacherfüllung“ aber 10-mal im Lerntext von 1.3 (Werkvertrag) sowie in `fu1/fachgespraech` und `fu1/fallaufgaben`, dazu `dv2/9.4`. Dort wählt nach der Theorie von 1.3 („anders als beim Kauf, wo die Käuferseite wählt“) die **Auftragnehmerseite**. Der Popover widerspricht damit dem Lerntext. Außerdem ist „Erst wenn das scheitert“ zu eng: Die Theorie kennt Fälle, in denen die Fristsetzung entbehrlich ist (Verweigerung, Fehlschlag, besonders schwerer Mangel). Der Bericht (Punkt 2) hält das für gelöst, weil der Eintrag „auf den Kauf zugeschnitten“ sei; das genügt wegen der kursweiten Markierung nicht.
Korrektur (Definition, 274 Zeichen): „Erste Stufe der Mängelrechte: Beim Kauf wählt die Käuferseite Reparatur oder Ersatzlieferung, beim Werkvertrag die Auftragnehmerseite zwischen Beseitigung und Neuherstellung. Rücktritt oder Minderung folgen in der Regel erst, wenn die Nacherfüllung ausbleibt oder scheitert.“

### H2 — Widerrufsrecht, Alias „Widerruf“ (`glossar-fu7.md`): Fehlmarkierung in 15 Stellen fremder Themen
Problem: Der Alias „Widerruf“ matcht (mit den einfachen Endungen) auch das Verb „widerrufen“ und den „Widerruf“ der Einwilligung. Echte Treffer: `fu6/6.2` (8, „Widerruf einer Einwilligung“, Q-6.2 „Der Widerruf muss so einfach sein wie die Erteilung“), `fu6/6.5` (2), `ae2/9.1` (4, „Secret sofort widerrufen bzw. rotieren“), `dp4/11.4` (1). Der Popover erklärt dort den Vertragswiderruf im Fernabsatz, ausgerechnet mit dem Zusatz „nicht der Widerruf einer datenschutzrechtlichen Einwilligung“ an einer Stelle, wo genau dieser gemeint ist. Der Bericht (Punkt 3) sah nur das Risiko einer späteren Kollision mit Cluster 1, nicht die Fehlmarkierung im Bestand.
Korrektur: Zeile `**Auch:** Widerruf` streichen (Begriff „Widerrufsrecht“ bleibt; er markiert in 7.6 26-mal und in 1.2 6-mal richtig). Definition kann bleiben.

### H3 — Unverhältnismäßige Belastung (`glossar-ae1.md`): rechtlich falsch und vermischt, dazu tot
Problem 1: Die Definition sagt, die Erfüllung würde „sie“ (die Dienstleistung) unverhältnismäßig belasten. Nach § 17 BFSG (gelesen) und nach der Theorie 8.3 („oder ihn unverhältnismäßig belasten“) wird die Belastung des **Anbieters** (Wirtschaftsakteurs) beurteilt. Problem 2: Das Gesetz trennt zwei Ausnahmen: grundlegende Veränderung der Wesensmerkmale (§ 16) und unverhältnismäßige Belastung des Wirtschaftsakteurs (§ 17); die Definition setzt beide unter einen Begriff, der nur § 17 benennt. Problem 3: Der Begriff steht im Lerntext nur als „unverhältnismäßiger Belastung“ / „unverhältnismäßig belasten“ und markiert nirgends (0 Treffer); die BITV-Variante („Ausnahmen bei unverhältnismäßiger Belastung“) bleibt unerwähnt.
Korrektur (Definition, 277 Zeichen; Alias ergänzen): `**Auch:** Unverhältnismäßiger Belastung` und „Einwand von Anbietern, die Erfüllung der Barrierefreiheitsanforderungen würde die Dienstleistung grundlegend verändern oder den Anbieter unverhältnismäßig belasten (das Gesetz regelt beide Fälle getrennt). Anbieter beurteilen und dokumentieren das und unterrichten die Behörde.“

### H4 — Creative Commons (`glossar-fu2.md`): ND falsch wiedergegeben
Problem: „keine Bearbeitung (ND)“ widerspricht der Theorie 2.2 („ND keine Weitergabe von Bearbeitungen“) und dem Blatt k (Nr. 51). ND verbietet die Weitergabe von Bearbeitungen, nicht jede Bearbeitung. Ebenso ist „SA“ verkürzt.
Korrektur (Definition, 280 Zeichen): „Standardisierte Lizenzen für Texte, Bilder, Dokumentation und Medien aus Bausteinen: Namensnennung (BY), Weitergabe von Bearbeitungen unter gleichen Bedingungen (SA), nur nicht kommerziell (NC), keine Weitergabe von Bearbeitungen (ND). Für Software raten die Lizenzgeber:innen ab.“

---

## Befunde MITTEL (17)

### M1 — Verzug (`glossar-fu7.md`): Zahlungsverzug definiert, Begriff gilt kursweit; Gendern
Problem: Der Sucher markiert „Verzug“ auch in 1.3 (9-mal, Verzug der Auftragnehmerseite mit der Fertigstellung), in `fu1/fallaufgaben` (3) und `dp2/fallaufgaben` („sechs Wochen Verzug“ bei einem Datenfeed). Die Definition („Die Schuldnerin zahlt ...“) passt dort nicht. Dazu generisches Femininum „Schuldnerin“.
Korrektur (280 Zeichen): „Die Schuldner:in leistet trotz Fälligkeit nicht oder nicht rechtzeitig, obwohl sie gemahnt wurde oder die Mahnung entbehrlich ist, und hat das zu vertreten. Gegenüber Verbraucher:innen tritt er durch Zeitablauf allein nur ein, wenn die Rechnung besonders auf diese Folge hinweist.“

### M2 — Sachmangel (`glossar-fu1.md`): tot und nur auf das Werk zugeschnitten
Problem: Im Lerntext steht „Sachmängeln“ (Umlaut), der Begriff „Sachmangel“ matcht in 1.3 nicht (0 Treffer); einziger Treffer ist in 7.6 (Kaufrecht, Q-7.6-12), wo die Werkvertrag-Definition („Das Werk hat nicht ...“) nicht passt. Der Kaufmangel (§ 434: subjektive, objektive, Montageanforderungen) ist anders aufgebaut.
Korrektur (Definition 249 Zeichen; Alias `Sachmängel`): „Das Werk (beim Kauf: die Sache) hat nicht die vereinbarte Beschaffenheit oder, soweit nichts vereinbart ist, eignet sich nicht für die vorausgesetzte oder gewöhnliche Verwendung oder ist nicht üblich beschaffen. Beim Kauf gelten ergänzende Maßstäbe.“

### M3 — Vertragsstrafe (`glossar-fu1.md`): zu eng, markiert im Verbraucherrecht
Problem: Definition nur für Verzug der Auftragnehmerseite. Der Sucher markiert den Begriff auch in 7.6 (3-mal, „Vertragsstrafen für Zahlungsverzug“ in AGB gegenüber Verbraucher:innen) und in `fu6/6.1` (Vertragsstrafen als Folge eines Ausfalls). Dort stimmt der Popover nicht.
Korrektur (273 Zeichen): „Vereinbarte Zahlung für den Fall, dass eine Vertragspflicht nicht oder nicht ordnungsgemäß erfüllt wird, im Projekt meist je Verzugstag bei verspäteter Fertigstellung. Neben der Erfüllung kann sie nur verlangt werden, wenn sie bei der Annahme der Leistung vorbehalten wird.“

### M4 — Garantie (`glossar-fu7.md`): Fehlmarkierung bei „geeignete Garantien“ (DSGVO)
Problem: „Garantie“ + Endung „n“ trifft „geeignete Garantien“ bei Drittlandübermittlungen in `fu6/6.2` (7 Stellen) und „keine Garantien“ in 6.6 (Registrierung). Der Popover (Kaufrecht, freiwillige Zusage) ist dort falsch. Zusätzlich generisches „Herstellerin“.
Korrektur (238 Zeichen): „Im Kaufrecht eine freiwillige zusätzliche Zusage der Verkaufsseite, des Herstellers oder einer dritten Person, etwa nachzubessern oder den Preis zu erstatten. Die gesetzlichen Mängelrechte gegen die Verkaufsseite bleiben daneben bestehen.“ (Die Markierung in 6.2 bleibt technisch bestehen; der Einleitungssatz „Im Kaufrecht“ entschärft sie. Alternativ den Eintrag nicht kursweit markieren lassen, falls das Produkt eine Themen-Bindung vorsieht.)

### M5 — Kündigungsschaltfläche (`glossar-fu7.md`): Ausnahmen fehlen, Rechtsfolge zu absolut
Problem: Die Theorie (und § 312k Abs. 1, gelesen) nimmt Finanzdienstleistungen und Verträge mit gesetzlich strengerer Form als Textform aus. Die Definition nennt „Fehlt sie, ist die Kündigung jederzeit ohne Kündigungsfrist möglich“ ohne diese Grenze; die Rechtsfolge gilt außerdem nur, wenn Schaltflächen **oder** Bestätigungsseite fehlen. Der Bericht (Punkt 4) sah das und ließ es wegen der Länge offen.
Korrektur (278 Zeichen): „Gut beschriftete Schaltfläche („Verträge hier kündigen“), über die Verbraucher:innen online geschlossene entgeltliche Dauerverträge kündigen, mit Bestätigungsseite. Fehlt sie, ist die Kündigung jederzeit ohne Frist möglich; ausgenommen sind unter anderem Finanzdienstleistungen.“

### M6 — Widerrufsfunktion (`glossar-fu7.md`): unscharf, Rechtsstand offen
Problem: „Schaltfläche mit Bestätigungsfunktion“ verkürzt den zweistufigen Ablauf (Funktion mit Eingaben, danach Bestätigungsfunktion, § 356a Abs. 1 bis 3, gelesen). Das Blatt i (Nr. 65, 67) markiert die Stelle als fachprüfungsbedürftig (Inkrafttreten über Fußnote und Sekundärquellen; offen, ob auch bei Verträgen ohne Widerrufsrecht). Die Definition sagt unbedingt „müssen“.
Korrektur (276 Zeichen): „Funktion zum Widerruf eines online geschlossenen Fernabsatzvertrags: Schaltfläche „Vertrag widerrufen“, Eingabe von Name und Vertragsangabe, Bestätigung „Widerruf bestätigen“. Der Eingang wird auf einem dauerhaften Datenträger bestätigt; ein formloser Widerruf bleibt möglich.“ Zusätzlich im Prüfprotokoll als „Rechtsprüfung nötig“ führen.

### M7 — Allgemeine Geschäftsbedingungen (`glossar-fu7.md`): Einverständnis fehlt
Problem: Die Theorie nennt drei Voraussetzungen der Einbeziehung (ausdrücklicher Hinweis, zumutbare Kenntnisnahme, Einverständnis der Verbraucher:in); die Definition lässt die dritte weg. Zweite Zeile: „sie gelten nur, wenn ... und sie unterliegen“ ist holprig.
Korrektur (258 Zeichen): „Für viele Verträge vorformulierte Bedingungen, die eine Seite der anderen stellt. Gegenüber Verbraucher:innen gelten sie nur nach ausdrücklichem Hinweis, bei zumutbarer Kenntnisnahme und mit ihrem Einverständnis; zudem unterliegen sie einer Inhaltskontrolle.“

### M8 — Fernabsatz (`glossar-fu7.md`): Vertriebssystem fehlt, Widerrufsrecht absolut
Problem: Die Theorie (und § 312c) setzt ein „eigenes Vertriebs- oder Dienstleistungssystem“ voraus; ohne dieses Merkmal gilt jeder Telefonkontakt als Fernabsatz. Das Widerrufsrecht kennt Ausnahmen.
Korrektur (280 Zeichen): „Vertragsschluss zwischen Unternehmen und Verbraucher:in, bei dem Verhandlung und Abschluss vollständig über Fernkommunikationsmittel (Webshop, App, E-Mail, Telefon) in einem dafür eingerichteten Vertriebssystem laufen. Es gelten Informationspflichten und meist ein Widerrufsrecht.“

### M9 — Urheber:in (`glossar-fu2.md`): Erbfall, Gendern, fehlender Alias
Problem: „das Urheberrecht selbst lässt sich nicht übertragen“; die Theorie sagt „nicht übertragbar, außer durch Erbfall“. „Inhaberin ... Urheberin“ ist generisches Femininum. Der Alias „Urheber:innen“ fehlt (kommt im Lerntext vor, wird vom Sucher nicht erkannt: „Urheber:in“ + „nen“ ist keine einfache Endung).
Korrektur (245 Zeichen; `**Auch:** Urheberin, Urheber:innen`): „Schöpfer:in eines Werkes, das kann nur ein Mensch sein. Ein Unternehmen kann Inhaber:in von Rechten sein, aber nicht Urheber:in; das Urheberrecht selbst ist nicht übertragbar (außer durch Erbfall), möglich ist die Einräumung von Nutzungsrechten.“

### M10 — Text und Data Mining (`glossar-fu2.md`): Löschpflicht fehlt
Problem: § 44b Abs. 2 (gelesen) und Theorie: Die Vervielfältigungen sind zu löschen, wenn nicht mehr erforderlich. Die Definition sagt nur „Erlaubt ist das Vervielfältigen“ und bleibt damit unbedingt.
Korrektur (278 Zeichen): „Automatisierte Analyse von Werken, um Muster, Trends und Korrelationen zu gewinnen. Vervielfältigungen rechtmäßig zugänglicher Werke sind dafür zulässig, außer die Rechtsinhaber:in hat sich die Nutzung vorbehalten; danach sind sie zu löschen. Reichweite beim KI-Training: offen.“

### M11 — Kleinstunternehmen-Ausnahme (`glossar-ae1.md`): Satz kaputt, Begriff tot
Problem: „Maßgeblich ist der Anbieter, also am Betreiber des Shops, nicht an der Agentur“ ist grammatisch kaputt („Maßgeblich“ doppelt). Der Begriff „Kleinstunternehmen-Ausnahme“ steht nirgends im Lerntext (0 Treffer), das Lerntextwort ist „Kleinstunternehmen“ (7 Vorkommen, nur in 8.3).
Korrektur (Begriff `Kleinstunternehmen`, Definition 269 Zeichen): „Sehr kleines Unternehmen: Es ist von den Barrierefreiheitspflichten für Dienstleistungen ausgenommen; maßgeblich sind Beschäftigtenzahl sowie Umsatz oder Bilanzsumme. Die Ausnahme gilt für den Anbieter, also den Betreiber des Shops, nicht für die Agentur, die ihn baut.“

### M12 — Dateninhaber (`glossar-dp2.md`): zweiter Satz unverständlich
Problem: „Ob der Hersteller, der die Daten über ein Portal erhält, Dateninhaber ist“ erklärt nicht, wovon die Rede ist; die Rolle hängt an Berechtigung/Verpflichtung, nicht an der Herstellereigenschaft. Das Blatt h (Nr. 8) belegt die Definition am Rohtext, die Hersteller-Einordnung als Auslegung (hier korrekt als Einordnung im Einzelfall wiedergegeben).
Korrektur (255 Zeichen): „Wer berechtigt oder verpflichtet ist, Daten eines vernetzten Produkts oder verbundenen Dienstes zu nutzen und bereitzustellen. Ob ein Hersteller, der die Daten nur über ein Portal erhält, Dateninhaber ist, bleibt eine Einordnung im Einzelfall (Auslegung).“

### M13 — Nutzer vernetzter Produkte (`glossar-dp2.md`): „verbundener Dienst“ unerklärt, Begriff tot
Problem 1: Der Bericht behauptet, „Verbundener Dienst“ sei „in der Definition miterklärt“. Das stimmt nicht: Die Definition sagt nur „einen verbundenen Dienst in Anspruch nimmt“; die Erklärung der Theorie („digitaler Dienst, der die Funktionen des Produkts ermöglicht oder ergänzt“) fehlt. Problem 2: Der Begriff steht nirgends wörtlich im Lerntext (0 Treffer), dort steht „Nutzer“; ein Alias „Nutzer“ wäre in 9.2 zu breit. Problem 3: generisches Maskulinum „Nutzer“ im letzten Satz (die Theorie vermerkt, die Rollenbegriffe seien „für alle Geschlechter“).
Korrektur (Definition 280 Zeichen; Begriff bleibt, Markierung entfällt bewusst): „Wer ein vernetztes Produkt besitzt, vertraglich zeitweilige Rechte daran hat (etwa durch Miete oder Leasing) oder einen verbundenen Dienst in Anspruch nimmt, also einen digitalen Dienst, der die Funktionen des Produkts ermöglicht oder ergänzt. Auch Unternehmen können Nutzer sein.“ Alternativ den Begriff `Nutzer (Data Act)` nennen, analog zu `Hersteller (CRA)` in Cluster 1.

### M14 — Datenhoheit (`glossar-dp2.md`): Hedge „praktisch“ verloren
Problem: Die Theorie sagt „**Praktisch** heißt das für Brevanta: Die Datenhoheit liegt beim Kunden“ und, im selben Abschnitt, dass das Rechtsgebiet mehrschichtig ist. Die Definition macht daraus die Regel „Bei Kundenprojekten liegt die Verfügungsmacht über die Daten beim Kunden“. Bei Daten vernetzter Produkte gelten zudem Zugangsrechte nach dem Data Act (der Nutzer kann Kunde, aber auch Dritter sein). „Verfügungsmacht“ ist ein in der Theorie nicht gebrauchter Rechtsbegriff.
Korrektur (279 Zeichen): „Praktische Zuordnung der Verfügungsmacht über Daten: In Kundenprojekten liegt sie in der Regel beim Kunden. Ein klassisches Eigentum an Daten gibt es nicht; maßgeblich sind Verträge, Datenschutz-, Urheber- und Datenbankrecht, Geschäftsgeheimnisschutz und besondere Zugangsregeln.“

### M15 — Fehlende Begriffe (Auswahl) — Vorschläge mit Ersatztext
Fehlende wichtige Begriffe der neuen Abschnitte, die die Theorie fett setzt oder zentral nutzt:
1. **Bestellstrecke** (fu7, Abschnitt „Fernabsatz, Bestellprozess und Informationspflichten“): der prüfungsnächste Teil von 7.6 (Bestellbutton, „kommt der Vertrag nicht zustande“) fehlt ganz; der Bericht nennt ihn „Anwendungsdetail“. Definition (279 Zeichen): „Ablauf vom Warenkorb bis zur Bestellung: Eingabefehler sind korrigierbar, wichtige Informationen erscheinen vor der Bestellung hervorgehoben, und bei Zahlungspflicht lautet die Schaltfläche „zahlungspflichtig bestellen“ (oder ebenso eindeutig); sonst kommt kein Vertrag zustande.“
2. **Waren mit digitalen Elementen** (fu7, Abschnitt „Digitale Produkte, Software und Updatepflicht“): Gegenstück zu „digitale Inhalte/Dienstleistungen“. Definition (230 Zeichen): „Ware, die digitale Inhalte oder Dienstleistungen enthält oder mit ihnen verbunden ist, etwa ein Notebook mit Betriebssystem oder ein Smart-TV. Es bleibt beim Kaufrecht, das die Updatepflicht für die digitalen Elemente einschließt.“ (Keine Kollision mit `Produkt mit digitalen Elementen` aus 6.7, anderes Wort.)
3. **Abnahme** (fu1, Abschnitt „Abnahme: Pflicht, Wirkungen und Vorbehalt“): „Abnahmefiktion“ und „Vorbehalt bei der Abnahme“ setzen den Begriff voraus; im Bestand steht nur das Abnahmeprotokoll. Definition (271 Zeichen): „Erklärung der Auftraggeberseite, das Werk als im Wesentlichen vertragsgemäß anzunehmen; wegen unwesentlicher Mängel darf sie nicht verweigert werden. Daran knüpfen typischerweise Fälligkeit der Vergütung, Gefahrübergang und bei bestimmten Werken der Verjährungsbeginn an.“
4. **Verbundener Dienst** (dp2, Abschnitt „Daten vernetzter Produkte: Data Act im Überblick“; Definition 258 Zeichen): „Digitaler Dienst, der die Funktionen eines vernetzten Produkts ermöglicht oder ergänzt. Wer ihn in Anspruch nimmt, kann Nutzer sein; seine Daten zählen zu den ohne Weiteres verfügbaren Daten, wenn der Dateninhaber sie ohne unverhältnismäßigen Aufwand erhält.“
5. **Geschäftsgeheimnis (Data Act)** (dp2, Abschnitt „Zugang des Nutzers zu Produktdaten“, Thema 9.2 ; Definition 280 Zeichen): „Geheim gehaltene Daten mit wirtschaftlichem Wert. Im Data Act sind sie kein Freibrief: Der Dateninhaber benennt sie und vereinbart mit dem Nutzer Schutzmaßnahmen; erst ohne Einigung oder bei verletzter Vertraulichkeit darf er die Weitergabe dieser Daten verweigern oder aussetzen.“ Die Begründung des Berichts („Definition ohne Zahlen nicht aussagekräftig“) trägt nicht: Eine Definition braucht dafür keine Zahlen. Der Abschnitt „Zugang des Nutzers zu Produktdaten“ steht in der Themendatei als `###`.
6. **Marktüberwachungsbehörde** und **Stand der Technik** (Cluster-übergreifend): Beide Begriffe kommen in 8.3 und 6.7 vor und fehlen in **allen** neun Entwürfen. Der Bericht lässt sie bewusst bei Cluster 1, Cluster 1 hat sie nicht. Entweder in `glossar-fu6.md` (6.7 als Ort der ersten Behandlung) nachtragen oder in `glossar-ae1.md`. Ersatztext bei Bedarf bitte gegen 6.7 prüfen lassen.

### M16 — Gendern nicht durchgehend mit Doppelpunkt (Sammelbefund)
Verstoß gegen die Hausregel (Doppelpunkt) in den Definitionen:
- fu7: „Herstellerin“ (Garantie), „Anbieterin“ (Impressum), „Schuldnerin“ (Verzug).
- fu1: „Mitbewerber“ (Vergleichende Werbung), „Auftraggeberin“ (Rechtsmangel).
- fu2: „Inhaberin ... Urheberin“ (Urheber:in).
- ae1: „Anbieter“ (3 Einträge), „Betreiber“ (Kleinstunternehmen).
- dp2: „Hersteller“, „Nutzer“ (zweimal), „Kunden“ (zweimal).
Korrektur nach dem Muster der Bestandstexte: neutrale Wendungen (Auftraggeberseite, Verkaufsseite) oder Doppelpunkt (Anbieter:in, Hersteller:in, Betreiber:in, Mitbewerber:in, Kund:innen). Konkrete Ersatztexte stehen bei M1, M4, M9, M11, M13 und N2. Für Rechtsbegriffe, die im Gesetz männlich stehen (Nutzer, Dateninhaber), reicht ein Hinweis wie in der Theorie („Rollenbegriffe für alle Geschlechter“). Der Begriff selbst darf so bleiben.

### M17 — Wechselentgelt (`glossar-dp2.md`): unklare Abgrenzung, Zeitangabe
Problem: „Entgelt für den Anbieterwechsel jenseits der Standardentgelte und Sanktionen“ lässt offen, ob Standardentgelte dazugehören. Das Blatt h (Nr. 47, 48) und die Theorie: Wechselentgelte sind **andere** Entgelte als Standarddienstentgelte oder Sanktionen. „zunächst ... später nicht mehr zulässig“ ist zeitlich unbestimmt (die Theorie nennt einen Stichtag; ohne Zahl ist der Satz richtig, aber ohne Informationswert).
Korrektur (262 Zeichen): „Entgelt für den Anbieterwechsel, ausgenommen Standardentgelte und Sanktionen bei vorzeitiger Kündigung; dazu zählen Entgelte fürs Extrahieren der Daten. Es darf zunächst nur die unmittelbar mit dem Wechsel verbundenen Kosten decken und ist später ausgeschlossen.“

---

## Befunde NIEDRIG (12)

### N1 — Tote Einträge (Sucher findet im Kursinhalt nichts)
Die folgenden Einträge markieren **nirgends** (0 Treffer in allen vier Kursen; weitere tote Einträge: Sachmangel M2, Kleinstunternehmen-Ausnahme M11, Nutzer vernetzter Produkte M13, Unverhältnismäßige Belastung H3); sie sind nur über eine Glossar-Liste erreichbar, falls es eine gibt:
- Unterlassungsanspruch (fu1): Lerntext hat „Unterlassung“ (6) und „Unterlassungsansprüche“. Korrektur: Alias `Unterlassung, Unterlassungsansprüche` und Definition (244 Zeichen) generalisieren, weil „Unterlassung“ auch in 2.2 (UrhG) steht: „Anspruch darauf, ein rechtswidriges, etwa unlauteres Verhalten künftig zu unterlassen. Er besteht bei Wiederholungsgefahr oder drohender Zuwiderhandlung, auch gegen das Unternehmen, wenn Beschäftigte oder Beauftragte den Verstoß begangen haben.“
- Wettbewerbsrechtliche Abmahnung (fu1): Lerntext hat „abmahnen“, „Abmahnung“; ein Alias „Abmahnung“ würde auch `fu7/7.1` (arbeitsrechtlich) und 1.3 (Kündigung aus wichtigem Grund) treffen. Empfehlung: Eintrag streichen oder bewusst ohne Markierung stehen lassen (niedriger Lerngehalt).
- Maschinenlesbarer Nutzungsvorbehalt (fu2): Lerntext hat „Nutzungsvorbehalt“ (1) und „maschinenlesbaren Vorbehalt“. Korrektur: Begriff auf `Nutzungsvorbehalt` umstellen (Alias `Maschinenlesbarer Nutzungsvorbehalt`); Definition ist sonst richtig und deckt die offene Frage (natürliche Sprache) ab. Zirkel: „nur wirksam, wenn sie maschinenlesbar erfolgt“ ist bei dem Namen „maschinenlesbar“ tautologisch, daher der Begriffswechsel.
- Assistive Technologie (ae1): Lerntext hat „assistiver Technologien“. Korrektur: Alias `assistiver Technologien`; sonst Eintrag streichen (Lerngehalt gering; „Screenreader“ steht in der Definition von WCAG nicht).
- Vorbehalt bei der Abnahme (fu1): markiert 1-mal; der naheliegende Alias „Vorbehalt“ wäre zu breit (TDM, Rechtsangaben). Kein Handlungsbedarf, nur Hinweis.

### N2 — Impressum (`glossar-fu7.md`)
Problem: „Im Gesetz „Allgemeine Informationspflichten“:“ ist ein holpriger Einstieg; generisches „Anbieterin“. Auswahl: fachlich unkritisch, Lerngehalt mittel.
Korrektur (278 Zeichen): „Im Gesetz „Allgemeine Informationspflichten“: Pflichtangaben zu Anbieter:in eines geschäftsmäßigen, in der Regel entgeltlichen digitalen Dienstes, etwa Name, Anschrift und elektronischer Kontaktweg. Sie müssen leicht erkennbar, unmittelbar erreichbar und ständig verfügbar sein.“

### N3 — Aktualisierungspflicht (`glossar-fu7.md`)
Problem: „bei digitalen Produkten“ lässt Waren mit digitalen Elementen (Kaufrecht, § 475b) aus; die Theorie schließt sie ein.
Korrektur (259 Zeichen): „Pflicht des Unternehmens, bei digitalen Produkten und Waren mit digitalen Elementen die zum Erhalt der Vertragsmäßigkeit nötigen Aktualisierungen samt Sicherheitsupdates bereitzustellen und darüber zu informieren. Eine feste Jahreszahl nennt das Gesetz nicht.“

### N4 — Verbrauchsgüterkauf (`glossar-fu7.md`)
Problem: Relativsatz „die sich meist nicht zulasten der Käuferseite abbedingen lassen“ bezieht sich grammatisch auf „Mängelrechten“ und nicht auf alle Sonderregeln; „abbedingen“ ist Fachjargon.
Korrektur (232 Zeichen): „Kauf einer Ware durch eine Verbraucher:in von einem Unternehmen. Dafür gelten Sonderregeln, etwa zur Lieferung, zur Gefahr beim Versand und zu den Mängelrechten; davon darf meist nicht zum Nachteil der Käuferseite abgewichen werden.“

### N5 — Rechtsmangel (`glossar-fu1.md`)
Problem: nur Gendern („Auftraggeberin“). Korrektur (162 Zeichen): „Mangel, der darin besteht, dass Dritte Rechte gegen die Auftraggeberseite geltend machen können, etwa wegen einer fehlenden Lizenz für eine eingebaute Komponente.“

### N6 — Zweitlizenz (`glossar-fu2.md`)
Problem: „ohne sie bleibt nur der Ersatz der Komponente“ wirkt absolut; die Theorie gilt für die Einbindung in ein weitergegebenes Produkt, während getrennte Programme das Copyleft nicht auslösen und Linken „umstritten“ ist.
Korrektur (236 Zeichen): „Zusätzliche, andere Lizenz der Rechteinhaber:in für dieselbe Komponente. Sie kann es ermöglichen, eine GPL-Komponente in ein weitergegebenes proprietäres Produkt einzubinden; ohne sie bleibt in diesem Fall nur der Ersatz der Komponente.“

### N7 — Dienstleistung im elektronischen Geschäftsverkehr (`glossar-ae1.md`)
Problem: Der Hedge der Theorie („bei Mischformen entscheidet der Einzelfall (Auslegung)“) fehlt; „zählen nach dem Wortlaut nicht dazu“ ist sonst richtig. Optional ergänzen: „Bei Mischformen entscheidet der Einzelfall.“ (Länge beachten: aktuell 273 Zeichen, also eine Kürzung an anderer Stelle nötig.)

### N8 — WCAG (`glossar-ae1.md`)
Problem: „Richtlinien des W3C und international verbreiteter Maßstab“ mischt zwei Satzteile; „Gesetz und Verordnung“ ohne Bezug. Korrektur: „Vom W3C herausgegebene Richtlinien und Maßstab“ und „Das BFSG und seine Verordnung nennen sie nicht wörtlich“ (Länge nach der Änderung prüfen; aktuell 277).

### N9 — CC0 und Vernetztes Produkt, Hinweise
- CC0 (fu2, 124 Zeichen): „Widmung eines Werkes ohne Bedingungen“ sagt nicht, wem gewidmet wird; Ergänzung „an die Allgemeinheit“ ist allgemeinverständlich und steht auf der Quelle von CC (nicht in der Theorie, daher optional).
- Vernetztes Produkt (dp2): matcht auch in `fu6/6.7` (CRA-Frage zu „vernetztem Produkt“). Die Data-Act-Definition mit Ausnahme der Datenspeicher-Geräte ist dort unpassend. Einleitung „Im Data Act“ verhindert das Missverständnis; „dazu zählen auch industrielle Maschinen“ sagt die Theorie nur „nach den Erwägungsgründen“ (Hedge ergänzen, falls Platz bleibt).

### N10 — Redundante Aliase (harmlos)
Wegen der Endungsregel des Suchers überflüssig: „Nutzungsrechte“ (Nutzungsrecht), „Permissive Lizenzen“, „Konformitätsstufen“, „Wechselentgelte“. Dagegen **nötig** und vorhanden: „Dauerschuldverhältnisse“, „Verbraucher:innen“, „Vernetzte Produkte“, „Dienstleistungen im elektronischen Geschäftsverkehr“.

### N11 — Double-Opt-in, Bestandskundenausnahme, Vergleichende Werbung (fu1, 1.2)
Fachlich in Ordnung, hedge-konform. Nur kleine Anmerkung: Double-Opt-in könnte „Praxis“ nennen („verbreitet“ ist es, aber nicht vorgeschrieben); die Definition tut das sinngemäß.

### N12 — Alte-Lerntext-Einträge und Streichkandidaten
- **ae1: Barrierefreiheit, WCAG:** akzeptabel (Kernbegriffe, ae1 hat noch kein Glossar; der Rest des Abschnitts setzt sie voraus). **Konformitätsstufe:** akzeptabel, aber nur Zusatz zu WCAG; bei Platzbedarf streichen. **Assistive Technologie:** streichen oder Alias ergänzen (N1).
- **dp2: Quasi-Identifikator, Re-Identifikation, k-Anonymität:** akzeptabel (dp2 hat kein Glossar, und die Begriffe sind prüfungsnah). Hinweis: Dieselben drei Begriffe stehen ausführlich in `dp4/11.3` (19 Markierungen im Sucher-Lauf); der Link „Im Thema nachlesen“ führt auf 9.2. Falls später ein `dp4`-Glossar entsteht, dort nicht doppeln (Kursweite Eindeutigkeit). In der Definition von Re-Identifikation wird „Mosaik-Effekt“ verwendet, der nirgends im Glossar erklärt ist; optional einen Eintrag ergänzen oder die Nennung streichen.
- **Streichkandidaten fu7/fu1:** Dauerschuldverhältnis (low), Impressum (Lerngehalt mittel, aber Standardwissen), Wettbewerbsrechtliche Abmahnung (N1). Rechtsmangel und Selbstvornahme halte ich für sinnvoll.

---

## Anmerkungen zum Bericht

- Punkt 1 (Kollisionsrisiken): nach meiner Prüfung gegen die Cluster-1-Dateien erledigt, keine Kollision.
- Punkt 2 (Nacherfüllung nur in fu7): reicht nicht, siehe H1.
- Punkt 3 (Alias „Widerruf“): ist kein Zukunftsrisiko, sondern heute fehlerhaft, siehe H2.
- Punkt 4 (Kündigungsschaltfläche): siehe M5.
- Punkt 8 (alte Lerntext-Einträge): meine Einschätzung unter N12.
- Behauptung „Verbundener Dienst in der Definition von Nutzer miterklärt“ ist falsch (M13).
- Behauptung „Aliase kommen im Lerntext vor“ ist richtig, aber unvollständig: Mehrere **Begriffe** kommen im Lerntext nicht in der Form vor, in der sie geschrieben sind (siehe N1, M2, M11, M13).
- Hinweis an Cluster 1 (nicht Teil dieser Prüfung): Qualifizierte Begriffe wie „Hersteller (CRA)“, „Anbieter (KI-Verordnung)“ und „Betreiber (KI-Verordnung)“ haben keinen Alias und markieren daher im Lerntext nie, weil der Sucher nur den wörtlichen Begriff findet. Das ist kein Fehler im Format, aber die Einträge sind dann nur über die Glossar-Liste erreichbar.

## Zusammenfassung

Zahlen: **4 hoch, 17 mittel, 12 niedrig** (Befunde, nicht Einträge). Wichtigste:
1. Nacherfüllung (H1) und Alias „Widerruf“ (H2) erzeugen falsche Popover in fremden Themen (Werkvertrag, Datenschutz, Secrets).
2. Unverhältnismäßige Belastung (H3): falsche Belastungsrichtung (Dienstleistung statt Anbieter) und Vermischung der zwei Ausnahmen, nach § 17/§ 16 BFSG belegt.
3. Creative Commons (H4): ND als „keine Bearbeitung“ widerspricht der Theorie.
4. Die Hedges der Theorie sind überwiegend gewahrt; Lücken bei Kündigungsschaltfläche (Ausnahmen), AGB (Einverständnis), Fernabsatz (Vertriebssystem), Text und Data Mining (Löschpflicht), Datenhoheit („praktisch“).
5. Acht Einträge ohne jede Markierung (siehe Mechanik, N1, M2, M11, M13, H3), Gendern (M16), Auswahl (M15: Bestellstrecke, Waren mit digitalen Elementen, Abnahme, Verbundener Dienst, Geschäftsgeheimnis; Marktüberwachungsbehörde und Stand der Technik fehlen cluster-übergreifend).
