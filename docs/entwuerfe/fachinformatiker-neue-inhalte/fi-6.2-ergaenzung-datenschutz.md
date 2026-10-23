# Entwurf Fachinformatiker (vier Kurse), Datenschutz im Web, bei Drittlandübermittlung, Protokollierung und Anfragen: Ergänzung im Thema 6.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt, nach der Prüfung `pruefung-g.md` überarbeitet.** Teil G des Pakets P-AY Fachinformatiker (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-10, dort „P-AW im Einzelnen“ Teil B). Einzufügen in `content/fachinformatiker-<kurs>/fu6/6.2-datenschutz.md` (die Datei ist in allen vier Kursen bis auf `kurs_slug` identisch, am 23.10.2026 geprüft): Abschnitt A **vor der Überschrift „### Datenschutzbeauftragte und Datenpannen“** (Anker; die Theorie steht damit hinter „Technische und organisatorische Maßnahmen (TOM)“), B an die Karteikarten hinter K-6.2-20, C an das Quiz hinter Q-6.2-12. Bestand gezählt (Stand 23.10.2026, in allen vier Kursen gleich): 20 Karteikarten (K-6.2-01 bis -20, lückenlos), 12 Quizfragen (Q-6.2-01 bis -12, lückenlos); `git log -S` auf K-6.2-21, Q-6.2-13 und F-FU6-08 ergibt in den `fu6`-Ordnern der vier Kurse keine entfernten IDs. Die neuen IDs sind K-6.2-21 bis -30 (10 Karten) und Q-6.2-13 bis -24 (12 Quizfragen, davon 2 Kurzantworten). Die Fallaufgabe F-FU6-08 (Bestand F-FU6-01 bis -04; F-FU6-05 bis -07 vergeben die Teile A, B und F) und zwei Fachgesprächsfragen (Abschnitt `### 6.2 Datenschutz`, in allen vier Kursen vorhanden) stehen in `fi-faelle-g.md`, die Rechtsangaben in `rechtsangaben-g.md`, die Ersetzungen im Bestand in `ersetzungen-g.json` (leer). Der `rechtsstand` der berührten Dateien (`fu6/6.2`, `fu6/fallaufgaben.md`, `fu6/fachgespraech.md`) wird beim Einspielen gesetzt.

**Zweck.** Der Bestand erklärt Grundbegriffe, Grundsätze, Rechtsgrundlagen, Betroffenenrechte, Auftragsverarbeitung, Maßnahmen, Datenschutzbeauftragte und Datenpanne. Er nennt aber den Zugriff auf Endgeräte der Nutzer:innen (Cookies und verwandte Techniken), die Übermittlung in Drittländer (nur der Satz „fachkundige Rücksprache“ und eine Fachgesprächs-Rückfrage ohne Erwartung), den Betrieb von Protokollierung und Monitoring mit Betriebsrat (nur ein Satz in Thema 7.2, Randnotizen in `dp2/9.2`, `dp4/11.3`), den Ablauf einer Datenschutz-Folgenabschätzung (nur den Namen) und den praktischen Ablauf einer Auskunftsanfrage samt Fristverlängerung nicht. Die Ergänzung bleibt in der Sicht von Fachinformatiker:innen, die Webanwendungen bauen, Cloud- und SaaS-Dienste einsetzen, Systeme betreiben und Anfragen im Betrieb mit bearbeiten. Nicht Gegenstand (steht im Bestand oder in anderen Teilen): Grundbegriffe, Grundsätze, Rechtsgrundlagen, Rechte der Betroffenen im Überblick, Auftragsverarbeitungsvertrag und Datenpanne (Bestand dieses Themas), Impressum, Werbung per E-Mail und Wettbewerbsrecht, KI-Verordnung und KI-Überwachung (Thema 6.8, Teil F), Meldepflichten nach dem Cybersicherheitsrecht (Thema 6.6, Teil A), Videoüberwachung, Beschäftigtendatenschutz im Bewerbungsverfahren, Bußgeldhöhen und Schadensersatz.

**Rechtsnah (R4).** Paragrafen und Artikel stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz, Fall und Fachgespräch (auch keine Gesetzesnamen dort). Rechtsgrundlagen am Rohtext gelesen (TDDDG, BDSG, BetrVG, EinwV von `gesetze-im-internet.de`; DSGVO, Standardvertragsklauseln-Beschluss, Beschluss zum Datenschutzrahmen EU-USA und Urteile des Gerichtshofs C-34/21 und C-65/23 über `publications.europa.eu`; EDPB-Leitlinien 05/2021 als PDF; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-g.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): die Reform der Cookie-Regeln auf EU-Ebene, die Angemessenheitsbeschlüsse (insbesondere für die USA, Rechtsmittel anhängig), die Anwendbarkeit des BDSG für Beschäftigtendaten nach der Rechtsprechung, die Listen der Aufsichtsbehörden zur Folgenabschätzung und ein angekündigtes Beschäftigtendatengesetz. Die Fall-Annahmen (Betriebsvereinbarung fehlt, Sitzstaat des Anbieters ohne Angemessenheitsbeschluss, Beispielkunde) stehen im Fall.

---

# Thema 6.2

## A. Theorie-Ergänzung 6.2 (einfügen vor „### Datenschutzbeauftragte und Datenpannen“)

### Websites und Apps: Zugriff auf Endgeräte und Einwilligung

Ob eine Website oder App Informationen auf dem Gerät der Nutzer:innen ablegen oder dort auslesen darf, regelt neben der DSGVO das Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG). Das Speichern in der Endeinrichtung und der Zugriff auf dort bereits gespeicherte Informationen sind nur zulässig, wenn die Nutzer:innen auf der Grundlage klarer und umfassender Informationen eingewilligt haben (Stützangabe § 25 Abs. 1 TDDDG). Eine bestimmte Technik nennt die Vorschrift nicht: Erfasst sind neben Cookies der lokale Speicher des Browsers und Kennungen in Apps, nach verbreiteter Auffassung der Aufsichtsbehörden auch Skripte, die Geräteeigenschaften zur Wiedererkennung auslesen (Auslegung). Information und Einwilligung richten sich nach der DSGVO: Nötig ist eine eindeutig bestätigende Handlung; Stillschweigen, vorangekreuzte Kästchen und Untätigkeit genügen nicht (Stützangabe Erwägungsgrund 32 DSGVO). Der Betreiber muss die Einwilligung belegen können; sie zurückzunehmen darf nicht schwerer sein, als sie zu erteilen (Stützangabe Art. 7 Abs. 1, 3 DSGVO).

Das Gesetz kennt zwei Ausnahmen: Der alleinige Zweck ist die Übertragung einer Nachricht über ein öffentliches Telekommunikationsnetz, oder der Vorgang ist unbedingt erforderlich, damit der Anbieter einen von den Nutzer:innen ausdrücklich gewünschten digitalen Dienst bereitstellen kann (Stützangabe § 25 Abs. 2 TDDDG). Maßgeblich ist, ob der gewünschte Dienst ohne den Vorgang nicht funktioniert; Nutzen für den Betreiber genügt nicht (Auslegung). Nach verbreiteter Auffassung gehören die Sitzungskennung nach der Anmeldung, der Warenkorb und Sicherheitsfunktionen dazu, Reichweitenmessung sowie Werbe- und Profilkennungen nicht.

Die Prüfung hat zwei Ebenen: ob etwas auf dem Endgerät gespeichert oder ausgelesen wird (TDDDG), und ob die anschließende Verarbeitung personenbezogener Daten, etwa einer Kennung oder der an einen Drittanbieter übertragenen IP-Adresse, eine Rechtsgrundlage nach der DSGVO hat (Auslegung der Aufsichtsbehörden). Das Protokollieren eines Aufrufs auf dem Server berührt das Endgerät nicht und misst sich nur an der DSGVO (Folgerung).
Bewährt hat sich (Praxis): ein Inventar aller Speicher- und Auslesevorgänge; nicht erforderliche Skripte erst nach der Einwilligung laden, Voreinstellung „aus“ (Stützangabe Art. 25 Abs. 2 DSGVO); Auswahl nach Zwecken; Ablehnen so leicht erreichbar wie Zustimmen, wie es die Aufsichtsbehörden erwarten (Auslegung); Zeitpunkt und Textfassung jeder Entscheidung protokollieren. Ein vorsätzlicher oder fahrlässiger Verstoß gegen die Einwilligungspflicht ist eine Ordnungswidrigkeit (Stützangabe § 28 Abs. 1 Nr. 13 TDDDG). Die EU-Kommission hat vorgeschlagen, die Regeln zu Endgerätezugriffen zu überarbeiten (Digital-Omnibus-Paket); das Verfahren ist offen. Stand Oktober 2026, vor Verwendung prüfen.

### Übermittlung in Drittländer: Cloud, Software als Dienst und Fernzugriff

Ein **Drittland** ist ein Staat außerhalb der EU und des Europäischen Wirtschaftsraums. Personenbezogene Daten dürfen dorthin nur übermittelt werden, wenn die Bedingungen des Kapitels V der DSGVO und zusätzlich die übrigen Vorschriften eingehalten sind, vor allem eine Rechtsgrundlage für die Verarbeitung (Stützangabe Art. 44 DSGVO). „Übermittlung“ ist nicht definiert. Nach den Leitlinien des Europäischen Datenschutzausschusses liegt sie vor, wenn ein dem Datenschutzrecht unterliegender Verantwortlicher oder Auftragsverarbeiter Daten einer anderen Stelle im Drittland zugänglich macht, die selbst Verantwortliche oder Auftragsverarbeiterin ist. Dazu zählt der Fernzugriff dieser Stelle aus dem Drittland, selbst wenn Daten nur am Bildschirm erscheinen, ebenso die Speicherung in einer Cloud außerhalb des Wirtschaftsraums (Stützangabe EDPB-Leitlinien 05/2021; Auslegung). Greifen eigene Beschäftigte derselben Stelle aus dem Ausland zu, liegt danach keine Übermittlung vor; die Datensicherheit bleibt zu regeln. Ein Serverstandort in der EU entlastet daher nicht, wenn ein eigenständiger Dienstleister oder eine Konzerngesellschaft aus einem Drittland zugreifen kann.

Die Instrumente stehen in einer Rangfolge. Erstens: ein **Angemessenheitsbeschluss** der Kommission für ein Drittland, ein Gebiet oder Sektoren; dann ist keine besondere Genehmigung nötig. Sie werden mindestens alle vier Jahre überprüft und können widerrufen werden (Stützangabe Art. 45 Abs. 1, 3, 5 DSGVO). Der Beschluss zu den USA gilt nur für Organisationen in der Datenschutzrahmen-Liste des US-Handelsministeriums (Stützangabe Art. 1 Durchführungsbeschluss (EU) 2023/1795); gegen ein bestätigendes Urteil des Gerichts der EU ist ein Rechtsmittel anhängig. Zweitens, ohne Beschluss: **geeignete Garantien** mit durchsetzbaren Rechten und Rechtsbehelfen für die Betroffenen (Stützangabe Art. 46 DSGVO). Üblich sind die **Standardvertragsklauseln** der Kommission für Importeure, die nicht selbst der DSGVO unterliegen (Stützangabe Durchführungsbeschluss (EU) 2021/914; es gibt vier Module je nach Rollen von Exporteur und Importeur). Dabei sichern beide Seiten zu, keinen Grund zur Annahme zu haben, dass das Recht des Ziellands die Erfüllung hindert, und erklären, Rechtslage und Behördenzugriffe gebührend berücksichtigt zu haben; das ist zu dokumentieren (Stützangabe Klausel 14), in der Praxis oft Transfer Impact Assessment genannt. Zusätzliche Maßnahmen können nötig sein, etwa Verschlüsselung ohne Klartextzugriff des Anbieters, Zugriff nur nach Freigabe im Einzelfall oder Pseudonymisierung (Auslegung, EDPB-Empfehlungen). Drittens, nur wenn beides fehlt: **Ausnahmen** für bestimmte Fälle, etwa die ausdrückliche Einwilligung nach Aufklärung über die Risiken (Stützangabe Art. 49 DSGVO); sie gelten nach Auffassung der Aufsichtsbehörden eng und sind keine Standardlösung für den laufenden Betrieb (Auslegung).

Ein Auftragsverarbeiter überträgt Daten nur auf dokumentierte Weisung des Verantwortlichen, auch in Drittländer, sofern nicht Unionsrecht oder das Recht eines Mitgliedstaats ihn verpflichtet, und setzt weitere Auftragsverarbeiter nur mit dessen Genehmigung ein (Stützangabe Art. 28 Abs. 2, 3 Buchst. a DSGVO). Das Drittland steht im Verzeichnis der Verarbeitungstätigkeiten, bei einer Ausnahme nach Art. 49 Abs. 1 Unterabsatz 2 zusätzlich die Dokumentation der Garantien (Stützangabe Art. 30 Abs. 1 Buchst. e DSGVO); die Information der Betroffenen nennt die Übermittlungsabsicht, das Vorhandensein oder Fehlen eines Beschlusses und den Verweis auf die Garantien (Stützangabe Art. 13 Abs. 1 Buchst. f DSGVO). Stand Oktober 2026, vor Verwendung prüfen.

### Protokollierung und Überwachung im Betrieb: Beschäftigtendaten und Betriebsrat

Protokolle, Ticketsysteme und Monitoring enthalten fast immer Beschäftigtendaten: Kennungen, Zeitpunkte, Befehle, Bearbeitungszeiten. Sobald sie einer Person zuzuordnen sind, gilt das Datenschutzrecht, und in Betrieben mit Betriebsrat kommt die Mitbestimmung hinzu. Der Betriebsrat hat mitzubestimmen, wenn technische Einrichtungen Verhalten oder Leistung der Beschäftigten überwachen sollen und keine gesetzliche oder tarifliche Regelung besteht; das gilt für die Einführung wie für die laufende Anwendung (Stützangabe § 87 Abs. 1 Nr. 6 BetrVG). Nach ständiger Auslegung genügt es, dass das System dazu objektiv geeignet ist; die Absicht des Arbeitgebers zählt nicht. Nach verbreiteter Auslegung zählen auch Protokollierung, Monitoring und Ticketauswertungen dazu, sobald sich Daten einzelnen Beschäftigten zuordnen lassen (Auslegung). Einigen sich beide Seiten nicht, entscheidet die Einigungsstelle (Stützangabe § 87 Abs. 2 BetrVG). In der Praxis mündet das in eine **Betriebsvereinbarung**, die unmittelbar und zwingend wirkt (Stützangabe § 77 Abs. 4 BetrVG) und Zweck, Daten, zulässige und ausgeschlossene Auswertungen, Zugriffe, Speicherdauer, Information und Kontrolle regelt (Praxis). Die Beratung durch die Datenschutzbeauftragte ersetzt die Beteiligung des Betriebsrats nicht, und umgekehrt. Zum Betriebsrat siehe Thema 7.2 „Betrieb, Mitbestimmung und Wirtschaftsorganisationen“ im Fachgebiet „Wirtschafts- und Sozialkunde“.

Datenschutzrechtlich entscheidend ist die Zweckbindung: Protokolle für Sicherheit und Fehleranalyse dürfen nicht ohne Weiteres zur Leistungsbewertung einzelner Personen dienen; das ist eine Zweckänderung, die auf Vereinbarkeit mit dem ursprünglichen Zweck zu prüfen ist (Stützangabe Art. 6 Abs. 4 DSGVO). Praktisch heißt das: je Zweck festlegen, welche Daten erfasst werden; Zugriff auf wenige Rollen begrenzen; Speicherdauer festlegen; wo es genügt, auf Teamebene oder pseudonymisiert auswerten; Beschäftigte vorab informieren (Stützangabe Art. 13 DSGVO). Zum Protokollieren selbst siehe Thema 4.3 „Systematische Fehlersuche und Automatisierung von Teilaufgaben“ im Fachgebiet „Programmierung und Softwarelösungen“.

Als Rechtsgrundlage sieht das BDSG für Beschäftigtendaten eine eigene Erlaubnis vor (Stützangabe § 26 Abs. 1 Satz 1 BDSG), gestützt auf die Öffnungsklausel für spezifischere Vorschriften mit angemessenen Schutzmaßnahmen (Stützangabe Art. 88 DSGVO). Nach dem Urteil des Gerichtshofs vom 30. März 2023 (C-34/21) bleiben nationale Vorschriften unangewendet, wenn sie diese Anforderungen nicht beachten, es sei denn, sie sind eine den Anforderungen genügende Rechtsgrundlage nach Art. 6 Abs. 3 DSGVO; das Bundesarbeitsgericht lässt § 26 Abs. 1 Satz 1 BDSG deshalb unangewendet (BAG, 8 AZR 209/21, Urteil vom 8. Mai 2025). Wie weit die übrigen Absätze anwendbar bleiben, wird unterschiedlich beurteilt (Auslegung). Maßstab sind dann unmittelbar die allgemeinen Vorgaben der DSGVO: Die Verarbeitung muss für die Durchführung des Arbeitsverhältnisses erforderlich sein oder einem berechtigten Interesse dienen, dem die Interessen der Beschäftigten nicht überwiegend entgegenstehen (Stützangabe Art. 6 Abs. 1 Buchst. b, f DSGVO). Auf eine Einwilligung lässt sich die Auswertung wegen der Abhängigkeit der Beschäftigten kaum stützen (Auslegung). Auch Betriebsvereinbarungen öffnen keinen Freiraum: Sie müssen die Grundsätze der DSGVO einhalten, und Gerichte dürfen die Erforderlichkeit umfassend überprüfen (Urteil des Gerichtshofs vom 19. Dezember 2024, C-65/23). Ein Beschäftigtendatengesetz ist angekündigt, aber nicht in Kraft. Stand Oktober 2026, vor Verwendung prüfen.

### Datenschutz-Folgenabschätzung und Auskunftsanfragen in der Praxis

Hat eine Verarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten der Betroffenen, führt der Verantwortliche vorab eine **Datenschutz-Folgenabschätzung** durch und holt den Rat der Datenschutzbeauftragten ein, sofern eine benannt ist (Stützangabe Art. 35 Abs. 1, 2 DSGVO). Ein Regelbeispiel ist die systematische und umfassende Bewertung persönlicher Aspekte, die auf automatisierter Verarbeitung einschließlich Profiling beruht und Entscheidungen mit erheblicher Wirkung vorbereitet (Stützangabe Art. 35 Abs. 3 DSGVO). Die Aufsichtsbehörden veröffentlichen Listen mit Verarbeitungen, für die sie nötig oder nicht nötig ist (Stützangabe Art. 35 Abs. 4, 5 DSGVO); nach dem Stand von 2018 steht darin unter anderem die umfangreiche Verarbeitung von Verhaltensdaten Beschäftigter, die zur Bewertung ihrer Arbeitstätigkeit mit erheblichen Folgen eingesetzt werden können (die aktuelle Liste ist zu prüfen). Als Schwellenkriterien helfen Bewertung oder Überwachung von Personen, Abhängigkeit der Betroffenen und Umfang (Praxis). Der Ablauf: Verarbeitung beschreiben und die Schwelle prüfen (das Ergebnis wird auch bei „nein“ dokumentiert, Praxis); Notwendigkeit und Verhältnismäßigkeit bewerten; Risiken für die Betroffenen, nicht für das Unternehmen, bewerten; Abhilfemaßnahmen planen; gegebenenfalls den Standpunkt der Betroffenen einholen; Ergebnis dokumentieren und bei Änderungen überprüfen (Stützangabe Art. 35 Abs. 7, 9, 11 DSGVO). Bleibt nach den geplanten Maßnahmen ein hohes Risiko, ist vor der Verarbeitung die Aufsichtsbehörde zu konsultieren (Stützangabe Art. 36 Abs. 1 DSGVO). Die Entscheidung trägt der Verantwortliche; ein Auftragsverarbeiter unterstützt (Stützangabe Art. 28 Abs. 3 Buchst. f DSGVO).

Für **Auskunftsanfragen** nennt das Gesetz keine Form; ein fester Ablauf hilft (Folgerung). Eingang und Datum festhalten: Die Antwort ist unverzüglich, in jedem Fall binnen eines Monats zu geben. Die Frist lässt sich um weitere zwei Monate verlängern, wenn Komplexität und Zahl der Anträge das erfordern; darüber ist die Person innerhalb des ersten Monats samt Gründen zu unterrichten (Stützangabe Art. 12 Abs. 3 DSGVO). Fällt das Fristende auf einen Samstag, Sonntag oder Feiertag, kann sich die Frist verschieben (Auslegung); die Beispiele hier legen fest, dass der Eingangstag nicht zählt und eine Monatsfrist bis zum Tag mit derselben Zahl im späteren Monat läuft. Die Rolle klären: Geht die Anfrage bei einem Auftragsverarbeiter ein, wird sie nach dem Vertrag zur Auftragsverarbeitung üblicherweise unverzüglich an den Verantwortlichen weitergegeben; das Gesetz verlangt Weisungsbindung und Unterstützung (Stützangabe Art. 28 Abs. 3 Buchst. a, e DSGVO; Folgerung); wann dann die Frist des Verantwortlichen beginnt, ist Auslegung und wird hier nicht vertieft. Zusätzliche Angaben zur Identität dürfen nur bei begründeten Zweifeln verlangt werden (Stützangabe Art. 12 Abs. 6 DSGVO). Alle Fundstellen durchsuchen: Datenbanken, Protokolle, Tickets, Postfächer, Notizen, Sicherungen, Auftragsverarbeiter. Die Antwort enthält unter anderem Bestätigung, Kopie sowie Zwecke, Empfänger, Speicherdauer und Herkunft (Stützangabe Art. 15 Abs. 1, 3 DSGVO), bei elektronischem Antrag in einem gängigen elektronischen Format. Rechte anderer dürfen nicht beeinträchtigt werden, sodass Namen Dritter oder Kundendaten zu schwärzen sein können (Stützangabe Art. 15 Abs. 4 DSGVO); die Übermittlung erfolgt gesichert, etwa verschlüsselt (Stützangabe Art. 32 DSGVO). Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 6.2 (anhängen)

#### K-6.2-21
**Frage:** Wann braucht eine Website oder App eine Einwilligung, bevor sie etwas auf dem Gerät der Nutzer:innen speichert oder dort ausliest?
**Antwort:** Grundsätzlich immer, unabhängig von der Technik (Cookie, lokaler Speicher, Gerätekennung). Ausnahmen gelten vor allem, wenn der Vorgang unbedingt erforderlich ist, damit ein von den Nutzer:innen ausdrücklich gewünschter Dienst funktioniert.
`tags: endgeraete, einwilligung, web` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.2-22
**Frage:** Welche Vorgänge in einer Webanwendung brauchen nach verbreiteter Auffassung keine Einwilligung zum Gerätezugriff, welche schon?
**Antwort:** Meist keine: Sitzungskennung nach der Anmeldung, Warenkorb, Sicherheitsfunktionen. Eine Einwilligung brauchen Reichweitenmessung, Werbe- und Profilkennungen. Maßstab ist die Notwendigkeit für den gewünschten Dienst, nicht der Nutzen für den Betreiber.
`tags: endgeraete, cookies, ausnahmen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-6.2-23
**Frage:** Was ist beim Aufbau einer Einwilligungsabfrage Pflicht, was gilt als bewährte Praxis?
**Antwort:** Pflicht: vorher einwilligen lassen, Einwilligung nachweisen können, Widerruf so einfach wie die Zustimmung. Bewährt: Skripte erst danach laden, Auswahl nach Zwecken, Ablehnen ebenso leicht (Erwartung der Aufsicht), Zeitpunkt und Text protokollieren.
`tags: einwilligung, umsetzung, nachweis` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-6.2-24
**Frage:** Wann liegt eine Übermittlung in ein Drittland vor, obwohl die Daten auf Servern in der EU liegen?
**Antwort:** Wenn eine andere Stelle, etwa ein Dienstleister oder eine Konzerngesellschaft, aus einem Drittland zugreift, auch nur zum Ansehen am Bildschirm. Das gilt nach Auffassung der europäischen Aufsichtsbehörden als Übermittlung; der Serverstandort allein entlastet nicht.
`tags: drittland, fernzugriff, cloud` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-6.2-25
**Frage:** In welcher Reihenfolge prüfst du, worauf eine Übermittlung in ein Drittland gestützt werden kann?
**Antwort:** Zuerst ein Angemessenheitsbeschluss der Kommission, sonst geeignete Garantien (etwa Standardvertragsklauseln), und nur wenn beides fehlt, eng begrenzte Ausnahmen für bestimmte Fälle. Die Verarbeitung selbst braucht außerdem eine Rechtsgrundlage.
`tags: drittland, angemessenheitsbeschluss, garantien` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.2-26
**Frage:** Was gehört zu einer Übermittlung auf Basis von Standardvertragsklauseln über den Vertragsabschluss hinaus?
**Antwort:** Die Rechtslage und die Zugriffsmöglichkeiten von Behörden im Zielland berücksichtigen (oft Transfer Impact Assessment genannt), das dokumentieren und bei Bedarf zusätzliche Maßnahmen ergreifen, etwa eine Verschlüsselung ohne Klartextzugriff des Anbieters.
`tags: drittland, standardvertragsklauseln, dokumentation` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-6.2-27
**Frage:** Welche Rechtsgrundlage gilt für die Auswertung von Beschäftigtendaten, seit ein Gericht die besondere Erlaubnisnorm nicht mehr anwendet?
**Antwort:** Nach einem Urteil des Bundesarbeitsgerichts bleibt die besondere Erlaubnis für Beschäftigtendaten unangewendet; es gelten unmittelbar die allgemeinen Regeln: erforderlich für das Arbeitsverhältnis oder berechtigtes Interesse nach Abwägung.
`tags: beschaeftigtendaten, protokollierung, rechtsgrundlage` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-6.2-28
**Frage:** Wann bestimmt der Betriebsrat bei Protokollierung und Monitoring mit, und was passiert ohne Einigung?
**Antwort:** Bei Einführung und Anwendung technischer Einrichtungen zur Überwachung von Verhalten oder Leistung; nach ständiger Auslegung genügt die objektive Eignung. Ohne Einigung entscheidet die Einigungsstelle. Die Datenschutzbeauftragte berät unabhängig davon.
`tags: betriebsrat, mitbestimmung, monitoring` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.2-29
**Frage:** Wann ist eine Datenschutz-Folgenabschätzung nötig, und was muss sie mindestens enthalten?
**Antwort:** Vorab bei voraussichtlich hohem Risiko für die Betroffenen, durch den Verantwortlichen mit Rat der Datenschutzbeauftragten, sofern benannt. Inhalt: Beschreibung der Verarbeitung, Notwendigkeit und Verhältnismäßigkeit, Risikobewertung, geplante Abhilfemaßnahmen.
`tags: folgenabschaetzung, risiko, ablauf` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-6.2-30
**Frage:** Welche Schritte gehören zur praktischen Bearbeitung einer Auskunftsanfrage?
**Antwort:** Eingang festhalten, Rolle klären (als Dienstleister laut Vertrag meist an den Verantwortlichen weitergeben), Identität nur bei begründeten Zweifeln prüfen, alle Systeme durchsuchen, Daten Dritter schwärzen, Kopie liefern, Frist samt möglicher Verlängerung beachten.
`tags: betroffenenrechte, auskunft, ablauf` · `schwierigkeit: mittel` · `bloom: anwenden`

## C. Quiz 6.2 (anhängen)

#### Q-6.2-13 · Multiple Choice
**Frage:** Auf der Startseite einer Webanwendung soll ein Werkzeug für A/B-Tests eingebunden werden. Es legt beim ersten Aufruf eine Kennung im lokalen Speicher des Browsers ab. Die Seite funktioniert auch ohne das Werkzeug unverändert. Was gilt?
- [ ] Keine Einwilligung nötig, weil lokaler Speicher kein Cookie ist und die Seite damit besser wird.
- [ ] Keine Einwilligung nötig, weil der Test die Seite für alle Nutzer:innen verbessert.
- [x] Einwilligung nötig, weil der Dienst auch ohne die Speicherung funktioniert.
- [ ] Einwilligung nötig, aber nur, wenn die Kennung auch einen Namen der Person enthält.
**Erklärung:** Die Regel zum Gerätezugriff ist technikneutral. Ohne das Werkzeug funktioniert die Seite, also ist die Speicherung nicht unbedingt erforderlich; ob die Kennung einen Namen enthält, spielt für den Gerätezugriff keine Rolle.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.2-14 · Zuordnung
**Anweisung:** Ordne jedem Vorgang die passende Einordnung zu.
- Sitzungskennung nach der Anmeldung im Cookie ↔ in der Regel ohne Einwilligung zulässig, weil für den gewünschten Dienst nötig
- Werbekennung im lokalen Speicher des Browsers ↔ Einwilligung vor dem Speichern nötig
- Serverprotokoll mit IP-Adresse beim Seitenaufruf ↔ kein Gerätezugriff, Prüfung nach den allgemeinen Datenschutzregeln
- Skript liest Geräteeigenschaften zur Wiedererkennung aus ↔ nach Auffassung der Aufsichtsbehörden einwilligungsbedürftig
**Erklärung:** Für den Gerätezugriff zählt, ob etwas gespeichert oder ausgelesen wird und ob es für den gewünschten Dienst unbedingt nötig ist. Das Protokollieren auf dem Server fällt unter die allgemeinen Regeln; das Auslesen von Geräteeigenschaften ordnen die Aufsichtsbehörden dem Gerätezugriff zu.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-6.2-15 · Wahr/Falsch
**Aussage:** Der Widerruf einer Einwilligung zum Gerätezugriff darf umständlicher gestaltet sein als die Zustimmung, solange er überhaupt möglich bleibt.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Der Widerruf muss so einfach sein wie die Erteilung. Die Einwilligung muss außerdem nachweisbar sein.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-6.2-16 · Sortieren
**Anweisung:** Bringe die Prüfschritte für die Übermittlung in ein Drittland in die zwingende Reihenfolge.
1. Feststellen, ob Daten in ein Drittland gelangen, auch durch Fernzugriff
2. Prüfen, ob ein Angemessenheitsbeschluss den Empfänger abdeckt
3. Ohne Beschluss geeignete Garantien wie Standardvertragsklauseln vereinbaren
4. Nur wenn beides fehlt, eine Ausnahme für den bestimmten Fall prüfen
**Erklärung:** Ohne eine Übermittlung gibt es nichts zu prüfen. Der Beschluss hat Vorrang, die Garantien kommen erst ohne Beschluss, und die Ausnahmen gelten nur, wenn weder Beschluss noch Garantien bestehen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.2-17 · Multiple Choice
**Frage:** Ein SaaS-Anbieter betreibt seine Server in der EU. Bei Störungen sieht ein Support-Dienstleister mit Sitz in einem Drittstaat, ein eigenständiges Unternehmen, Kundendaten am Bildschirm ein. Wie ist das einzuordnen?
- [ ] Keine Übermittlung, weil die Daten die EU nicht verlassen.
- [x] Nach Auffassung der Aufsichtsbehörden eine Übermittlung.
- [ ] Eine Übermittlung, die immer ohne Weiteres erlaubt ist, weil nur angesehen wird.
- [ ] Eine Übermittlung, die nur bei Speicherung der Daten dort relevant ist.
**Erklärung:** Auch der Fernzugriff einer anderen Stelle aus einem Drittland, selbst nur zur Ansicht, gilt nach den Leitlinien als Übermittlung. Es braucht daher einen Angemessenheitsbeschluss, geeignete Garantien oder eine Ausnahme.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-6.2-18 · Wahr/Falsch
**Aussage:** Ein Angemessenheitsbeschluss gilt immer für ein ganzes Land und alle Organisationen darin.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Die Kommission kann ein Land, ein Gebiet oder einzelne Sektoren erfassen; beim Datenschutzrahmen mit den USA gilt der Beschluss (Stand Oktober 2026) nur für Organisationen, die in der dafür geführten Liste stehen.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-6.2-19 · Kurzantwort
**Frage:** Wie heißt der Beschluss der EU-Kommission, mit dem sie feststellt, dass ein Drittland ein vergleichbares Schutzniveau bietet, sodass Übermittlungen dorthin ohne weitere Genehmigung zulässig sind?
**Akzeptierte Antworten:** Angemessenheitsbeschluss; Angemessenheitsentscheidung; Angemessenheitsbeschluss der Kommission; Angemessenheitsbeschluss der EU-Kommission; Beschluss über die Angemessenheit; Angemessenheits-Beschluss
**Erklärung:** Mit diesem Beschluss ist für das genannte Land, Gebiet oder den genannten Sektor keine besondere Genehmigung für die Übermittlung nötig. Er wird mindestens alle vier Jahre überprüft.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-6.2-20 · Multiple Choice
**Frage:** In einem Betrieb mit Betriebsrat soll ein System eingeführt werden, das Verhalten oder Leistung der Beschäftigten überwachen kann. Welche Beteiligung gilt?
- [ ] Der Arbeitgeber entscheidet allein und informiert den Betriebsrat erst danach über die Einführung.
- [ ] Es genügt die Einwilligung jeder einzelnen beschäftigten Person, ein Betriebsrat ist nicht nötig.
- [x] Der Betriebsrat bestimmt mit; ohne Einigung entscheidet die Einigungsstelle.
- [ ] Die Datenschutzbeauftragte entscheidet anstelle des Betriebsrats über die Einführung.
**Erklärung:** Bei Einführung und Anwendung solcher Systeme hat der Betriebsrat mitzubestimmen, soweit keine gesetzliche oder tarifliche Regelung besteht. Die Datenschutzbeauftragte berät unabhängig davon, gibt aber nichts frei und ersetzt den Betriebsrat nicht.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-6.2-21 · Mehrfachauswahl
**Frage:** Was gehört sinnvoll in eine Betriebsvereinbarung zur Protokollierung?
- [x] Zweck der Protokollierung und erfasste Daten
- [x] Zugriffsrechte auf die Protokolle und Speicherdauer
- [ ] Löschung aller Protokolle erst nach zehn Jahren ohne weiteren Zweck
- [x] Zulässige und ausgeschlossene Auswertungen
- [ ] Ausschluss der Datenschutzbeauftragten von allen Auswertungen
**Erklärung:** Eine Betriebsvereinbarung konkretisiert Zweck, Daten, Auswertungen, Zugriffe und Fristen. Sie erweitert den Spielraum des Datenschutzrechts nicht: Speicherung ohne Zweck und der Ausschluss der Beratung sind mit den Datenschutzgrundsätzen nicht vereinbar.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-6.2-22 · Was passt nicht dazu
**Frage:** Was gehört nicht zu den Mindestinhalten einer Datenschutz-Folgenabschätzung?
- [ ] Beschreibung der geplanten Verarbeitungsvorgänge und ihrer Zwecke
- [ ] Bewertung der Notwendigkeit und Verhältnismäßigkeit
- [ ] Bewertung der Risiken für die betroffenen Personen
- [x] Berechnung des möglichen Umsatzverlusts des Unternehmens
**Erklärung:** Bewertet werden die Risiken für die Rechte und Freiheiten der Betroffenen und die geplanten Abhilfemaßnahmen. Wirtschaftliche Folgen für das Unternehmen sind nicht Gegenstand der gesetzlichen Mindestinhalte.
`schwierigkeit: mittel` · `bloom: analysieren`

#### Q-6.2-23 · Kurzantwort
**Frage:** Bei einem Verantwortlichen geht am Mittwoch, 13.01.2027, ein Auskunftsverlangen ein. Er verlängert die Frist wirksam um die gesetzlich mögliche Zeit. Zählweise: Der Eingangstag zählt nicht, die Frist läuft bis zu dem Tag des späteren Monats, der dieselbe Zahl trägt; Wochenenden und Feiertage werden nicht berücksichtigt. Welches Datum (TT.MM.JJJJ) ist der letzte Antworttag?
**Akzeptierte Antworten:** 13.04.2027; 13.04.2027.; 13.4.2027; 13.4.2027.; 13. 04. 2027; 13. 4. 2027; 13. April 2027; 13 April 2027; 13.04.27; 13.4.27
**Erklärung:** Die Regelfrist beträgt einen Monat, die Verlängerung weitere zwei Monate, insgesamt also drei Monate. Sie endet nach der Zählweise am Dienstag, 13.04.2027. Voraussetzung ist, dass Komplexität und Zahl der Anträge sie erfordern und die Person im ersten Monat samt Gründen unterrichtet wird.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.2-24 · Entweder-Oder
**Frage:** Bei einem Hosting-Dienstleister geht die Auskunftsanfrage einer Person ein, deren Daten er im Auftrag eines Kunden verarbeitet. Was entspricht der üblichen Regelung im Vertrag zur Auftragsverarbeitung?
- [ ] Der Dienstleister beantwortet die Anfrage selbst, weil die Daten auf seinen Systemen liegen.
- [x] Er gibt die Anfrage unverzüglich an den Kunden weiter und unterstützt ihn.
**Erklärung:** Der Kunde ist Verantwortlicher; das Gesetz verlangt vom Auftragsverarbeiter Weisungsbindung und Unterstützung. Die Weitergabe ist die übliche vertragliche Regelung, etwa mit einem Datenexport für den Kunden.
`schwierigkeit: mittel` · `bloom: anwenden`
