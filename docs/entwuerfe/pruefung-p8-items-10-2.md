# Prüfbericht: Aufgaben und Glossar-Vorschläge zu den Umweltrecht-Abschnitten in Thema 10.2 (Technischer Fachwirt, Paket P8)

Stand 13.10.2026 · unabhängige KI-Prüfung (keine Rechtsberatung) · geprüft wurde `docs/entwuerfe/tf-p8-items/10-2-umweltrecht.md` gegen `content/technischer-fachwirt/hq3/10.2-umweltmanagement.md`, `content/README.md` und den Parser `apps/api/src/db/content-parser.ts`. Verändert wurden nur der Entwurf und dieser Bericht; in `content/` ist nichts geändert, nichts importiert, nichts committet.

## Gesamturteil

Der Entwurf ist inhaltlich solide: Alle als richtig markierten Antworten sind aus dem Theorietext ableitbar und, bis auf die unten genannten Punkte, am Primärtext bestätigt. Keine Aufgabe fragt einen Betrag, eine Frist, einen Stichtag, einen Mengen- oder Schwellenwert, ein Bußgeld oder einen Strafrahmen ab; auch Distraktoren enthalten keine solchen Zahlen. Es gab keinen Befund der Schwere „hoch“. Sechs Befunde „mittel“ sind eingearbeitet (eine rechtliche Ungenauigkeit aus der Theorie, zwei Aufgaben mit schwachem Prüfwert, ein Bewertungsfehler bei zwei Lücken, ein Längenhinweis auf die richtige Antwort, eine Auslegungslücke bei der Rückhaltung). Am Ende bleiben 40 Aufgaben (19 Karteikarten, 21 Quizfragen) und 10 Glossar-Vorschläge.

## Methode und Quellenbasis

- Volltexte von gesetze-im-internet.de (am 13.10.2026 per `xml.zip` abgerufen und lokal ausgewertet, nicht über Zusammenfassungen): BImSchG, 4. BImSchV (2013), 5. BImSchV, KrWG, NachwV (2007), AVV, AltölV, AbfBeauftrV (2017), WHG, AwSV, AbwV (Anhang 40), OWiG (§§ 9, 130).
- Format: Skript im Scratchpad wendet `parseKarteikarten`, `parseQuizBlock` und `parseGlossar` auf den Entwurf an und baut Karteikarten und Quiz zusätzlich in die Thema-Datei ein (Simulation, ohne Datei zu verändern). Ergebnis nach den Korrekturen: 19 Karteikarten, 21 Quizfragen (6 Multiple Choice, 3 Mehrfachauswahl, 5 Wahr/Falsch, 3 Zuordnung, 1 Was passt nicht dazu, 1 Sortieren, 1 Lückentext Wortauswahl, 1 Kurzantwort), 10 Glossar-Einträge; zusammengebaut 41 Karteikarten und 38 Quizfragen, kein Block fehlerhaft, keine doppelte ID, `bloom`, `schwierigkeit` und `tags` überall vorhanden, alle Glossar-Definitionen unter 300 Zeichen und ohne Markdown, alle `Abschnitt`-Angaben entsprechen wörtlich `###`-Überschriften der Theorie, keine Namensdopplung mit `hq1/glossar.md`.
- Antwortprüfung der App: `normalisiereAntwort` (`packages/shared/src/antwort-normalisierung.ts`) gleicht Groß-/Kleinschreibung, Leerzeichen und Zahlwörter an, Bindestriche und Punkte nicht. `luecken_auswahl` wird wie `luecken` bewertet (`checkBlanks`: je Lücke genau die eigene Liste akzeptierter Wörter). Multiple-Choice-Optionen werden zur Laufzeit gemischt (`mischeOptionen` in `QuizSteps.tsx`).

## Befunde

Schwere: hoch = rechtlich falsche Lösung oder nicht lösbar; mittel = rechtliche Ungenauigkeit, Bewertungs- oder Prüfwertmangel; niedrig = Wortlaut, Hausregel, Hinweis. „Geändert“ heißt: in `10-2-umweltrecht.md` eingearbeitet.

| Nr. | Schwere | Aufgabe | Befund mit Beleg | Korrektur / Status |
|---|---|---|---|---|
| 1 | mittel | K-10.2-32, Q-10.2-28 (Option 1) | „Erlaubnis (oder Bewilligung)“ für die Direkteinleitung ist ungenau. Nach § 14 Abs. 1 Nr. 3 WHG darf eine Bewilligung nicht erteilt werden für Benutzungen nach § 9 Abs. 1 Nr. 4 WHG (Einbringen und Einleiten von Stoffen in Gewässer); § 57 Abs. 1 WHG spricht nur von der Erlaubnis. Die Ungenauigkeit stammt aus der Theorie (Abschnitt „Wasserrecht im Betrieb“). | Geändert: K-10.2-32 nennt nur die Erlaubnis und weist die Bewilligung ausdrücklich aus; Q-10.2-28 Option 1 „wasserrechtliche Erlaubnis“. Theorie-Korrektur unter „Zu entscheiden“ Nr. 4 vorgemerkt. |
| 2 | mittel | Q-10.2-32 | Zwei Lücken „Fachkunde“ und „Zuverlässigkeit“ sind positionsgebunden. Eine vertauschte Eingabe („Zuverlässigkeit und Fachkunde“) ist rechtlich gleichwertig (§ 55 Abs. 2 BImSchG nennt beide gleichrangig), würde aber als falsch gewertet (`checkBlanks`, ein `accepted`-Wert je Lücke). | Geändert: eine Lücke („Fachkunde“), „Zuverlässigkeit“ steht im Text. |
| 3 | niedrig | Q-10.2-32 | Distraktor „Meisterbrief“ ist nicht eindeutig falsch: § 8 Abs. 1 Nr. 1 der 5. BImSchV lässt die Qualifikation als Meister bei Immissionsschutzbeauftragten im Einzelfall als Voraussetzung der Fachkunde zu. | Geändert: „Gesellschafterstellung“ statt „Meisterbrief“. |
| 4 | mittel | Q-10.2-37 | Alte Fassung („Emulsionen sind der Sammelkategorie der Bearbeitungsöle zugeordnet“, Lösung Falsch): Der Befund stimmt (12 01 09* steht nicht in Anlage 1 AltölV; Kategorie 2 führt 12 01 07* „außer Emulsionen und Lösungen“), die Aufgabe prüft aber eine Abwesenheit und ist erratbar. Zudem ist offen, ob wassergemischte Emulsionen überhaupt „Altöl“ sind (§ 1a Abs. 1 AltölV: Öle, die ganz oder teilweise aus Mineralöl, synthetischem oder biogenem Öl bestehen). Die Bezeichnung „Sammelkategorie der Bearbeitungsöle“ steht so nicht im Gesetz. | Geändert: ersetzt durch Wahr/Falsch zum Mischverbot unterschiedlicher Sammelkategorien (§ 4 Abs. 1 und 3, Anlage 1 AltölV; Lösung Falsch). Die Formulierung benennt „nichtchloriertes Hydrauliköl auf Mineralölbasis“ (Kategorie 1), weil synthetische Hydrauliköle (13 01 11*) in Kategorie 2 stehen und die Aussage sonst nicht eindeutig wäre. Der Emulsions-Befund steht nur noch in der Erklärung. |
| 5 | mittel | Q-10.2-23, -26, -28, -33, -36 | Die richtige Antwort ist auffällig die längste Option (Zeichen richtig gegenüber Distraktoren: Q-36 210 gegenüber 94 bis 147; Q-23 187 gegenüber 93 bis 115; Q-28 134 gegenüber 98 bis 113; Q-33 130 gegenüber 98 bis 108; Q-26 126 gegenüber 84 bis 103). Das ist ein Ratehinweis. | Geändert: Distraktoren verlängert, richtige Antworten gekürzt (danach z. B. Q-23 115/104/97/120, Q-28 98/99/113/111, Q-33 118/115/116/129, Q-26 110/135/126/125, Q-36 204 gegenüber 153 bis 156). Die Position der richtigen Antwort ist unerheblich, weil die App mischt. |
| 6 | mittel | Q-10.2-27 | Das Sortieren „nicht wassergefährdend, WGK 1, WGK 2, WGK 3“ ist aus den Bezeichnungen selbst lösbar; der eigentliche Lerngehalt („nicht eingestuft gilt als stark wassergefährdend“, § 3 Abs. 4 AwSV) stand nur in der Erklärung. | Geändert: ersetzt durch Wahr/Falsch (Lösung Wahr) zu § 3 Abs. 4 AwSV mit „grundsätzlich“. Typenverteilung danach 3 Wahr gegenüber 2 Falsch bei den fünf Wahr/Falsch-Aufgaben. |
| 7 | mittel | K-10.2-34, Q-10.2-29 (Option 3) | „Das Rückhaltevolumen richtet sich bei Lager- und Verwendungsanlagen nach der bei einer Betriebsstörung freisetzbaren Menge“ gilt nicht ausnahmslos: Für Gefährdungsstufe D schreibt § 18 Abs. 4 AwSV „abweichend“ die größte abgesperrte Betriebseinheit vor. Die Theorie nennt die Regel ohne Einschränkung. | Geändert: „grundsätzlich“ in beiden Aufgaben, in K-10.2-34 und Q-10.2-29 mit Hinweis auf die strengere Auslegung bei Stufe D. Theorie-Ergänzung unter „Zu entscheiden“ Nr. 4. |
| 8 | niedrig | K-10.2-33, Q-10.2-27, Glossar „Wassergefährdungsklasse“ | „Was nicht eingestuft ist, gilt als stark wassergefährdend“: § 3 Abs. 4 Satz 2 AwSV nimmt Stoffe nach Abs. 2 und 3 aus (zum Beispiel Wirtschaftsdünger, Lebensmittel). | Geändert: „grundsätzlich“. |
| 9 | niedrig | Q-10.2-29 (Option 4) | „Auf sie kann verzichtet werden, sobald die Dichtheit regelmäßig kontrolliert wird“ ist unqualifiziert; § 18 Abs. 3 letzter Satz AwSV kennt einen engen Verzicht (WGK 1, bis 1.000 Liter, Leckerkennung durch infrastrukturelle Maßnahmen). Als allgemeine Aussage falsch, aber angreifbar. | Geändert: „bei jeder Anlage“ ergänzt. |
| 10 | niedrig | K-10.2-28 | „Was gilt für ihn vor allem?“ ist nicht eindeutig; Nachweis, Register und Vermischungsverbot gelten alle (§ 50, § 49, § 9a KrWG). | Geändert: „Welches Verbot gilt für ihn?“; die Antwort sagt „unter anderem“ und nennt Nachweis- und Registerpflicht. |
| 11 | niedrig | K-10.2-35 | „Welche drei Betriebsbeauftragten kennt das Umweltrecht“ ist zu eng: Es gibt weitere (Störfallbeauftragte, § 58a BImSchG, in der Theorie erwähnt). | Geändert: Frage „Welche Betriebsbeauftragten im Umweltschutz gehören zum Überblick …“, Antwort mit Hinweis auf Störfallbeauftragte. |
| 12 | niedrig | K-10.2-31 | „Unterhalb der Mengengrenze“ ist ungenau: Nach § 2 Abs. 2 NachwV gilt die Ausnahme bei „nicht mehr als“ der Grenze, also bis einschließlich. | Geändert: „nicht überschreitet“. |
| 13 | niedrig | K-10.2-38 | § 130 Abs. 1 OWiG setzt vorsätzliches oder fahrlässiges Unterlassen voraus. | Geändert: „vorsätzlich oder fahrlässig“ ergänzt. |
| 14 | niedrig | K-10.2-41; Q-10.2-19, -30 (Erklärung), -31, -33, -35, -36, -37 | Hausregel Gendern verletzt (generisches Femininum oder Maskulinum: „der Entsorger“, „der Betreiber“, „eine Abfallbeauftragte“, „die Umweltmanagementbeauftragte“, „die Gesellschafter“). | Geändert: „die Entsorger:in“, „das Betreiberunternehmen“, „eine Person zur oder zum Abfallbeauftragten“, „die oder der Umweltmanagementbeauftragte“, „die beauftragte Person“, „Gesellschafter:innen“. In den Zuordnungs-Bezeichnungen in Q-10.2-30 bleiben die Funktionsnamen der Theorie. |
| 15 | niedrig | Q-10.2-34 | Satzbau mehrdeutig („… bestätigt das Umweltmanagementsystem, nicht für sich genommen, dass …“). | Geändert: „… bestätigt das Umweltmanagementsystem; allein daraus folgt nicht, dass …“. |
| 16 | niedrig | Glossar | Alias-Einträge mit nur einfacher Endung (Emissionen, Immissionen, Begleitscheine, Entsorgungsfachbetriebe) sind überflüssig, die Software erkennt diese Endungen selbst (README, Abschnitt Glossar). „Entsorgungsnachweis“ nannte die Behördenbestätigung ohne Hinweis, dass sie entfallen kann (§ 3 Abs. 1 Satz 2, § 7 NachwV); bei „Entsorgungsfachbetrieb“ fehlte, dass das Zertifikat für Anlage und Tätigkeit gelten muss (§ 7 Abs. 1 und 2 NachwV). | Geändert: Aliase gestrichen, beide Definitionen präzisiert (241 und 255 Zeichen). |
| 17 | niedrig | Q-10.2-38 | Der Prompt enthält das Stichwort „Altöl“, die Antwort ist damit nahezu vorgegeben; die Schreibvariante „Altölverordnung (AltölV)“ fehlte in der Liste. Die amtliche Kurzform „AltölV“ und die Langform „Altölverordnung“ sind am Primärtext bestätigt. | Geändert: Variante ergänzt. Behalten, aber erster Streichkandidat (siehe unten). |
| 18 | niedrig | K-10.2-29, -30, -36, -40, -41 | Antworten mit 80 bis 110 Wörtern und mehreren Teilfragen; für Karteikarten lang (Bestand meist ein bis zwei Sätze). | Nicht geändert, Hinweis. Kürzen oder teilen wäre eine redaktionelle Entscheidung und würde die Aufgabenzahl über 40 heben. |
| 19 | niedrig | K-10.2-24 | „V steht für das vereinfachte Verfahren ohne Öffentlichkeitsbeteiligung“ ist vereinfacht: V-Anlagen mit UVP-Pflicht werden nach § 10 BImSchG im förmlichen Verfahren genehmigt (§ 2 Abs. 1 Nr. 1 Buchst. c der 4. BImSchV). Für ein Überblicksniveau vertretbar, entspricht der Theorie. | Nicht geändert, Hinweis. |
| 20 | niedrig | K-10.2-29, -31 | „Nachweisverordnung“ ist der übliche Kurzname; der amtliche Titel lautet „Verordnung über die Nachweisführung bei der Entsorgung von Abfällen“ (Abkürzung NachwV). | Nicht geändert, Hinweis. |
| 21 | niedrig | K-10.2-39, Q-10.2-34 | Aussagen zu ISO 14001 und Rechtskataster sind nicht an Normtext prüfbar (siehe Liste „Nicht geprüft“). | Nicht geändert, Hinweis. |

Summe: 0 hoch, 6 mittel, 15 niedrig. Davon eingearbeitet: 6 mittel und 11 niedrig; ohne Änderung nur Hinweise: Nr. 18 bis 21.

## Bewertung der Streichkandidaten und Unsicherheiten des Entwurfs

| Punkt | Entscheidung | Begründung |
|---|---|---|
| K-10.2-31 (Kleinmengen und Register) | behalten | Eigenständiger Gehalt (§ 2 Abs. 2, § 16, § 24 Abs. 3 NachwV; § 49 Abs. 3 KrWG), von keiner anderen Aufgabe abgedeckt. |
| K-10.2-39 (Rechtskataster, ISO 14001) | behalten | Brücke zwischen Recht und Managementsystem; steht im Theorietext; Quiz Q-10.2-34 prüft dasselbe in anderer Form. |
| Q-10.2-27 | geändert (Wahr/Falsch) | Siehe Nr. 6. |
| Q-10.2-32 | geändert (eine Lücke) | Siehe Nr. 2 und 3. |
| Q-10.2-37 (Unsicherheit 1) | geändert | Siehe Nr. 4. Kein Streichen nötig, weil K-10.2-41 den Emulsions-Befund weiter trägt. |
| Q-10.2-25 (Unsicherheit 2) | behalten | Reihenfolge verantwortliche Erklärung, Annahmeerklärung, Begleitschein, Register ist am Primärtext bestätigt (§ 3 Abs. 2 und 3 NachwV: Erzeuger:in füllt zuerst aus, Entsorger:in danach; § 11 und § 24 NachwV: Belege kommen nach der Übergabe ins Register). Das Auslassen der Behördenbestätigung steht in der Anweisung. |
| Q-10.2-38 (Unsicherheit 3) | behalten | Name und Abkürzung am Primärtext bestätigt; Liste ergänzt. Erste Wahl, falls auf unter 40 gekürzt werden soll (reine Namensabfrage mit Stichwort im Prompt). |
| Q-10.2-32 (Unsicherheit 4) | geändert | Siehe Nr. 2 und 3. |
| Umfang insgesamt | 40 bleiben | Jede Aufgabe prüft einen anderen Aspekt; Überlappungen sind die üblichen Paare Karte plus Quizfrage (zum Beispiel K-10.2-37 und Q-10.2-33, K-10.2-38 und Q-10.2-35) und die dreifache Behandlung des Nachweisverfahrens (K-10.2-29, Q-10.2-24, Q-10.2-25) in unterschiedlichen Formaten. |

## Abgleich ohne Befund (Auswahl, Fundstellen)

- Emission, Immission, Anlage: § 3 Abs. 2, 3 und 5 BImSchG (K-10.2-23, Q-10.2-18, Glossar).
- Genehmigungsbedürftigkeit, G/V, Zusammenrechnung, Erweiterung: § 4 BImSchG; §§ 1 Abs. 3 und 5, 2 Abs. 1 der 4. BImSchV (K-10.2-24, Q-10.2-20; die Aussage in Q-10.2-20 ist wörtlich § 1 Abs. 5).
- Betreiberpflichten: § 5 Abs. 1 und 3, § 22 Abs. 1 BImSchG (K-10.2-25, Q-10.2-19; Distraktoren „Mindestmaß“ und „Pflichten enden mit Betriebseinstellung“ eindeutig falsch).
- Abfallbegriff, Erzeuger:in, Besitzer:in, Nebenprodukt, Hierarchie, Grundpflichten, Vermischungsverbot: §§ 3 Abs. 1, 3, 8, 9, 4, 6, 7, 9a KrWG; AVV §§ 2, 3 und Abfallschlüssel 12 01 01, 12 01 03, 12 01 07*, 12 01 09*, 12 01 18*, 13 01 10*, 13 02 05* (K-10.2-26 bis -28, Q-10.2-21 bis -23, -36). Die vier Nebenprodukt-Voraussetzungen in Q-10.2-22 entsprechen § 4 Abs. 1; eine behördliche Vorab-Anerkennung ist keine Voraussetzung.
- Nachweisführung: § 50, § 49, § 22, § 54 Abs. 3, § 56 KrWG; §§ 2, 3, 5, 7, 10, 11, 16, 24, 25 NachwV (K-10.2-29 bis -31, Q-10.2-24 bis -26). Q-10.2-26: Die Verantwortung bleibt bis zum ordnungsgemäßen Abschluss (§ 22 KrWG); eine Pflicht, nur Entsorgungsfachbetriebe zu beauftragen, enthält das Gesetz nicht; das Register bleibt Pflicht (§ 49 Abs. 3 KrWG).
- Abwasser: §§ 57, 58 WHG; Anhang 40 AbwV Teil D Abs. 5 Nr. 4 Buchst. c (AOX, Kühlschmierstoffe ohne organische Halogenverbindungen) und Teil E Abs. 5 (K-10.2-32, -40, Q-10.2-28).
- AwSV: §§ 3 Abs. 1 und 4, 18 Abs. 1, 2, 3, 7, 39 Abs. 1, § 2 Abs. 27 (K-10.2-33, -34, -40, Q-10.2-29).
- Betriebsbeauftragte: §§ 53 bis 58 BImSchG; §§ 59, 60 KrWG; §§ 64, 65, 66 WHG; 5. BImSchV, AbfBeauftrV (K-10.2-35, -36, Q-10.2-30, -31).
- Betriebsleitung: § 52b BImSchG; § 130 und § 9 OWiG (K-10.2-37, -38, Q-10.2-33, -35).
- Altöl: §§ 1a, 2, 4 und Anlage 1 AltölV (K-10.2-41, Q-10.2-37, -38).

## Hausregeln und Dopplungen

- Anrede: Karteikarten und Quiz duzen oder sind neutral formuliert („Woran erkennst du …“, „Ordne …“, „Bringe …“); kein „Sie“.
- Gendern: nach Nr. 14 durchgängig mit Doppelpunkt oder Paarform.
- Zahlenformat: Es kommen keine Zahlen mit Tausenderpunkt oder Prozent vor; Abfallschlüssel stehen im Format der AVV.
- Dopplung mit dem Bestand von 10.2: keine wörtliche. Teilüberschneidungen (K-10.2-17 und Q-10.2-11 mit K-10.2-35 und Q-10.2-30 zur Rolle der Beauftragten; K-10.2-09 und Q-10.2-07 mit den Aufgaben zu Kühlschmierstoffen) sind inhaltlich verschieden und bleiben.
- Wahr/Falsch: 3 Wahr (Q-10.2-20, -27, -34), 2 Falsch (Q-10.2-31, -37). Mehrfachauswahl hat jeweils zwei richtige von vier Optionen.
- Schwierigkeit und Bloom-Stufen: plausibel; Q-10.2-37 von „analysieren“ auf „anwenden“ gesetzt, Q-10.2-27 von „leicht, erinnern“ auf „mittel, verstehen“.

## Nicht geprüft oder nicht prüfbar

- Aussagen zu ISO 14001, EMAS-Wirkung und zur Praxis des Rechtskatasters (K-10.2-39, Q-10.2-34): keine Normtexte verfügbar (ISO-Normen sind nicht frei lesbar); als Konsens der Theorie übernommen.
- TA Luft und TA Lärm (K-10.2-25) sowie die Fachkunde-Lehrgänge nach Anhang II der 5. BImSchV: nicht im Volltext gelesen; die Aufgaben stützen sich nur auf die Nennung der Vorschriften.
- Landesrecht: Abweichungen bei der Indirekteinleitung (K-10.2-32, Q-10.2-28) und beim Gewässerschutzbeauftragten (Hinweise zu Bayern und Rheinland-Pfalz bei § 64 WHG im Normtext) sind nicht ausgewertet; die Aufgaben verweisen deshalb auf das Landesrecht.
- Ob wassergemischte Bearbeitungsemulsionen „Altöl“ im Sinne von § 1a AltölV sind, ist am Normtext nicht entscheidbar (Rechtsprechung und Vollzugshinweise der Länder nicht ausgewertet); die Aufgaben halten diese Frage ausdrücklich offen.
- Rechtsprechung, EU-Recht (Abfallrahmenrichtlinie, Industrieemissionsrichtlinie) und der Gesetzgebungsstand nach dem Abrufdatum: nicht geprüft. Hinweis aus dem Normtext: § 5 Abs. 2 Satz 3 BImSchG tritt erst mit der zugehörigen Verordnung in Kraft; er wird in keiner Aufgabe berührt.
- Theorieabschnitte und Zahlenangaben, zu denen keine Aufgabe gehört (zum Beispiel Schwellen der Beauftragten, Aufbewahrungsfristen, Bußgeldrahmen): nicht Gegenstand dieser Prüfung.
- Darstellung im Browser (Wortauswahl, Zuordnung) und ein echter Datenbank-Import: nicht ausgeführt; geprüft wurde nur das Parsen mit den Projektfunktionen.
- Verständlichkeit für Lernende: keine Erprobung mit Testpersonen.

## Offene Entscheidungen

Stehen im Entwurf unter „Zu entscheiden“. Besonders wichtig: Nr. 2 (Emulsions-Satz in Theorie und K-10.2-41 bis zur Rechtsprüfung) und Nr. 4 (Theorie-Korrekturen: Stufe D bei der Rückhaltung, „grundsätzlich“ bei nicht eingestuften Stoffen, „Erlaubnis (oder Bewilligung)“).
