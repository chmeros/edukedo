# Prüfbericht P-AI Teil B (Vertragsrecht, Beratung, Schaden, Haftpflicht: `kp1`, `kb2`)

Stand 17.10.2026. Geprüft: `ersetzungen-b.json` (45 Paare), `rechtsangaben-b.md` (18 Zeilen), `befund-uebersicht-b.md`. Maßstab: Schreibauftrag, Fachlehrer-Bericht 07.10.2026, Prüfervorlage, Nordantis-Register. Keine Entwurfsdatei und kein Bestand geändert.

## Mechanik (kurz)

- Alle 45 Paare auf eine Kopie des Kurses angewendet: je Paar genau ein einzeiliger Treffer der alten Zeichenkette, sequentiell, 0 Probleme. Kein `$` in den Texten (kein Ersetzungsmuster-Risiko).
- `pruefe-paket.cjs test` mit temporärer Konfiguration: 685 Themendateien, 21.028 Item-Schlüssel, 0 Verstöße. Keine Fachgesprächsfrage (Fragezeile) geändert (Diff der beiden Fachgesprächsdateien: nur "Erwartung"-Zeilen). Karten und Quiz sind über die ID geschlüsselt, Fragetextänderungen an Karten sind daher unkritisch (Lernstand bleibt, Inhalt ändert sich).
- Hausregel Paragrafen/Gesetzesnamen: in den neuen Karten-, Quiz- und Fachgesprächsformulierungen kein Paragraf, kein Gesetzesname (maschinell geprüft; nur Theorie `kp1/3.3` behält § 254 BGB). In Ordnung.

## Rechtlicher Faktencheck (am Rohtext selbst gelesen)

Selbst abgerufen und gelesen (gesetze-im-internet.de): VVG §§ 19, 21, 22, 61, 62, 63, 81, 86, 87, 103, 161, 183, 194, 201; VAG § 13; GmbHG § 43; BGB § 254; ProdHaftG §§ 1, 11; GewO § 34d (Abs. 5, 7); VersVermV (2018) §§ 11, 12; VersStG § 4. Dazu Bundestag-Textarchiv (kw41) und Websuche (IHK Frankfurt, MTR Legal, IHK Magdeburg) zur Produkthaftung bzw. Mindestsummen.

Bestätigt (Aussage der Rechtsangaben stimmt, "am Gesetzestext gelesen" zu Recht): Zeilen 1 (soweit § 19 Abs. 3, 4), 2 (§ 21 Abs. 1, 3), 3, 4 (§ 201, § 161 Abs. 1, 2), 6 (§ 81, § 87), 8 (§ 86 Abs. 1 S. 2, Abs. 3), 9 (§ 254), 10 (VAG § 13 Abs. 1: "ganz oder teilweise", Genehmigung der Aufsichtsbehörden), 13 (GmbHG § 43 Abs. 1, 2: "solidarisch"), 15 (ProdHaftG § 1 Abs. 1 S. 2, § 11), 16 (GewO § 34d Abs. 5 S. 1 Nr. 3, Abs. 7 S. 1 Nr. 1). § 81 gehört nicht zu den in § 87 genannten halbzwingenden Normen: Der Autor hat damit gegen den Fachlehrer-Bericht (FL-VF-25 "nur zugunsten") Recht; die vorsichtige Formulierung "können günstiger sein" ist richtig. Zusätzlich stützt § 194 Abs. 1 VVG (Krankenversicherung: §§ 74 bis 80 und 82 bis 87, also nicht § 81) die Aussage zur Krankenversicherung.

Produkthaftung: Bundestagsbeschluss am 08.10.2026 ist belegt (Textarchiv kw41: Drucksache 21/4297, Beschlussempfehlung 21/8429; Abstimmung 08.10.2026). Inkrafttreten 09.12.2026 nennen IHK Frankfurt und MTR Legal als geplant; das Textarchiv erwähnt weder Inkrafttreten noch Bundesratszustimmung; Bundesrat-Drucksache 584/26 (Frist 30.10.2026) zeigt, dass der zweite Durchgang noch aussteht. Der Text sagt "beschlossen" und "soll ... in Kraft treten" und verweist auf Prüfung des Stands: richtig gekennzeichnet. Die Einstufung "vermutet" in Rechtsangaben Zeile 14 ist eher zu vorsichtig als zu sicher.

## Befunde

### Hoch

Keine. Es gibt keine falsche Rechtsaussage, die ein Einspielen verhindern müsste.

### Mittel

**M1. `kp1/3.4` Theorie Anzeigepflicht (Paar 1), F-KP1-03 Musterlösung TA2 (Paar 1), `kp1/fachgespraech.md` 3.4 (Paar 5): Krankenversicherung nicht berücksichtigt (falsche Sicherheit in Rechtsangaben Zeile 1/2).**
Die neuen Details "Vertragsanpassung bei nicht zu vertretendem Fehler erst ab der laufenden Versicherungsperiode" und "fünf Jahre" gelten für die Krankenversicherung nicht: § 194 Abs. 1 VVG nimmt § 19 Abs. 4 in der Krankenversicherung bei nicht zu vertretender Pflichtverletzung aus und setzt die Frist des § 21 Abs. 3 S. 1 auf drei Jahre. Thema 3.4 nennt die Kranken- und Lebensversicherung ausdrücklich als Gegenstand ("Leistungsmanagement vor allem Kranken- und Lebensversicherung"); die Rechtsangaben-Zeilen 1 und 2 führen "am Gesetzestext gelesen" ohne diesen Vorbehalt. Der Fall F-KP1-03 (Berufsunfähigkeit, Lebensversicherungsrecht) ist davon nicht betroffen.
Vorschlag: in T 3.4 hinter die Fristen einen Halbsatz: "(in der Krankenversicherung gelten dazu Sonderregeln, etwa eine kürzere Frist von drei Jahren)"; in Rechtsangaben Zeile 1 und 2 § 194 Abs. 1 VVG nachtragen. Fachgespräch (Paar 5) ist als Kurzfassung vertretbar, dann aber ohne weitere Verschärfung lassen.

**M2. `kb2/2.3` Theorie (Paar 1): "die Beträge werden regelmäßig angepasst und sind dort in der geltenden Fassung nachzulesen" ist irreführend.**
Die VersVermV ist unter `gesetze-im-internet.de/versvermv_2018/__12.html` abrufbar (die Rechtsangaben nennen sie "nicht erreichbar", die Abfrage lief unter dem falschen Kürzel). Abs. 2 nennt dort 1.276.000 € je Versicherungsfall und 1.919.000 € je Jahr und verweist für die Anpassung auf den technischen Regulierungsstandard nach Art. 10 Abs. 7 der Richtlinie (EU) 2016/97. Die heute geltenden Beträge stehen nicht in der Verordnung, sondern folgen aus der EU-Anpassung (nach Sekundärquellen IHK Magdeburg/WKO: Delegierte Verordnung (EU) 2024/896, ab 09.10.2024 1.564.610 € und 2.315.610 €; nur als Hinweis, nicht am Rechtstext gelesen). Wer "dort" nachliest, findet veraltete Zahlen. Die Zahlen "1.300.380 / 1.924.560, Stand 2024" in Rechtsangaben Zeile 18 sind veraltet (Stand 2019/2020).
Vorschlag: "die Mindestversicherungssummen regelt die Versicherungsvermittlungsverordnung (VersVermV), die für die Anpassung der Beträge auf einen europäischen Standard verweist; die Beträge werden regelmäßig angepasst, maßgeblich ist die jeweils geltende Fassung." Rechtsangaben Zeile 18 korrigieren (Fundstelle § 12 VersVermV, Abs. 2; Seite erreichbar; Beträge bewusst nicht im Text, bleibt richtig).

**M3. `kb2/2.1` Theorie (Paar 1) und K-2.1-16 (Paar 2): "Diese Regel gilt für die Schadenversicherung" ist zu weit.**
In der Haftpflichtversicherung (auch eine Schadenversicherung, in Thema 2.2 behandelt) regelt § 103 VVG die Herbeiführung des Versicherungsfalls: Leistungsfreiheit nur bei vorsätzlicher und widerrechtlicher Herbeiführung des Schadens, keine quotale Kürzung bei grober Fahrlässigkeit. Wer Themen 2.1 und 2.2 verbindet, lernt sonst eine falsche Verallgemeinerung. Der Vorbehalt "gilt für die Schadenversicherung" ist in T 2.1 und 3.4 (dort "siehe Thema 2.1") gleich formuliert.
Vorschlag T 2.1: "Diese Regel gilt für die Sachversicherung (als Teil der Schadenversicherung); in der Haftpflichtversicherung ist nach dem Gesetz nur der vorsätzlich herbeigeführte Schaden ausgeschlossen, in der Personenversicherung führt grobe Fahrlässigkeit grundsätzlich nicht zum Ausschluss". In T 3.4 entsprechend "gilt in der Sachversicherung". Rechtsangaben Zeile 6 um § 103 ergänzen.

**M4. `kp1/3.1` Theorie Bruttoprämie (Paar 1): "kommt außerdem die Versicherungsteuer hinzu" gilt nicht für Nordantis' Personenversicherungssparten.**
§ 4 Abs. 1 Nr. 5 VersStG nimmt Versicherungen für den Todes-, Erlebens- oder Altersfall sowie bei Krankheit, Pflegebedürftigkeit, Berufs-/Erwerbsunfähigkeit (soweit die Versorgung der Risikoperson dient) von der Besteuerung aus; nicht ausgenommen sind Unfall-, Haftpflicht- und sonstige Sachversicherung. Der Satz gilt also für Sach, Haftpflicht, Unfall, nicht für Leben und Kranken (Nordantis führt Sach-, Kranken- und Lebenssparte). Rechtsangaben Zeile 11 sagt "aus Kenntnis"; jetzt am Gesetz bestätigt, aber der Text ist zu pauschal.
Vorschlag: "In der Sach-, Haftpflicht- und Unfallversicherung kommt zum Beitrag der Kundschaft außerdem die Versicherungsteuer hinzu (in Lebens- und Krankenversicherung weitgehend nicht)."

**M5. `kb2/2.2` K-2.2-14 (Paare 2, 3) und `kb2/fachgespraech.md` 2.2 (Paar 1): Fragestellung und Erwartung sind didaktisch schief.**
Die Frage "… relevant, obwohl sie bereits eine GmbH ist?" setzt einen Gegensatz, den es nicht gibt: Die GmbH-Form ist gerade der Grund für die Organhaftung nach § 43 GmbHG. Die Fachgespräch-Erwartung ("unabhängig von einem Wechsel der Rechtsform") bezieht sich auf eine frühere Fassung, die Lernende nie gesehen haben, und ist ohne Kontext unverständlich. Inhaltlich sind die Antworten richtig.
Vorschlag K-2.2-14: Frage "Warum ist die D&O-Versicherung für „Katz Fensterbau GmbH" relevant?", Antwort wie neu. Fachgespräch: "Relevant ist die Police bei der Katz Fensterbau GmbH, weil auch GmbH-Geschäftsführer:innen für Pflichtverletzungen persönlich haften (gegenüber der Gesellschaft, in Einzelfällen auch gegenüber Dritten); mehrere Geschäftsführer:innen erhöhen das Risiko nicht automatisch." Gleiches in T 2.2 ("unabhängig von einem Wechsel der Rechtsform" streichen, positiv formulieren).

### Niedrig

**N1. `kp1/3.1` Q-3.1-10 (Paare 15, 16): Hausregel "richtige Antwort nicht die längste" verletzt.** Option 1 (richtig) hat 59 Zeichen ("Schließung für Neugeschäft (der Bestand läuft aus: Run-off)"), Option 2 (falsch) 49 Zeichen; die Differenz ist knapp, aber die richtige Option ist die längere. Zusätzlich verdoppelt die Klammer den Hinweis der Frage ("laufen aus"). Vorschlag: Option 1 "Schließung für das Neugeschäft", Option 2 "Bestandsübertragung auf einen anderen Versicherer" (länger als die richtige). Das ist nicht schlimmer als vorher (damals 26 gegen 24 Zeichen, ebenfalls länger), aber die Regel gilt.

**N2. `kp1/3.3` Q-3.3-13 (Paare 7, 8) ist Klon von Q-3.3-15.** Beide prüfen dieselbe Tatsache ("Übergang darf nicht zum Nachteil des Versicherungsnehmers geltend gemacht werden"); der Stamm von Q-3.3-13 verrät mit "Vorrecht" zudem einen Teil der Lösung. Vorschlag: Stamm "Verbleibt dem Versicherungsnehmer nach der Regulierung ein ungedeckter Schaden (z. B. Selbstbeteiligung), wird er aus dem Anspruch gegen den Dritten zuerst befriedigt; dieses Vorrecht heißt ___Quotenvorrecht___." Das Quotenvorrecht ist nun in K-3.3-13, K-3.3-21, Q-3.3-04, -08, -13, -15 und im Fachgespräch vertreten (starke Häufung, aber nicht falsch). Passend zur Hausregel "Zusatzbegriffe aus anderen Themen" bleiben "Bestandsübertrag" in der Liste von Q-3.3-13 und Q-3.2-13 (Distraktor) unschädlich; zur Wortwahl "Bestandsübertragung" in 3.1 nur Hinweis.

**N3. `kp1/3.3` K-3.3-13 (Paare 2, 3): zwei Fragen in einer Karte** ("Wie wirkt sich Mitverschulden aus, und wie unterscheidet sich davon das Quotenvorrecht?"), und die Antwort wiederholt K-3.3-21. Vorschlag: Karte nur zum Mitverschulden ("… schon der Ersatzanspruch gegen den Dritten gemindert; nur dieser geminderte Anspruch geht über"), das Quotenvorrecht bleibt K-3.3-21 überlassen.

**N4. K-2.1-16 (Paar 2): Frage und Antwort passen nicht zusammen.** Frage nur zu Vorsatz, Antwort ergänzt grobe Fahrlässigkeit. Vorschlag: Frage "Was passiert im Regelfall, wenn der Versicherungsnehmer den Schaden vorsätzlich oder grob fahrlässig herbeigeführt hat?" (Karten sind ID-geschlüsselt).

**N5. `kp1/3.1` Hinweis zum Sicherheitszuschlag (Paare 1, 3; Fachgespräch Paar 3).** Fachlich tragfähig und klar genug gekennzeichnet; Konsistenz mit K-3.1-22, Q-3.1-07/-09/-16/-17, F-KP1-04 (Sicherheitszuschlag 10 % "bezogen auf die Nettoprämie") und Q-3.1-"Nettoprämie deckt den Schadenerwartungswert" bleibt gewahrt; Duell 250/252 und Memory 182 sind im Lernmodell richtig. Kleine Verbesserungen: (a) im Hinweis den Anschluss herstellen: "Im Kurs entspricht die Nettoprämie der reinen Risikoprämie (dem Schadenerwartungswert)", sonst bleibt "Risikoprämie plus Sicherheitszuschlag" für Lernende ein neuer Begriff; (b) "so rechnen auch die Aufgaben" ist Kursmeta, besser "so rechnen die Aufgaben dieses Kurses"; (c) Fachlehrer-Bericht und Rechtsangaben sagen "vielen", die Texte "manchen" Lehrbüchern: "manchen" ist nicht belegt falsch, aber uneinheitlich; (d) Erklärung Q-3.1-12 "der Sicherheitszuschlag in der Prämie ist wieder etwas anderes" ist vage; besser "der Sicherheitszuschlag ist ein Prämienbestandteil" (der Zusammenhang, dass solche Zuschläge Puffer speisen, wird nicht erklärt, braucht er nicht).

**N6. `kp1/3.4` Theorie "Vertragliche Ausschlüsse" (Paar 2), K-3.4-07 (Paar 3).** Inhaltlich belegt (§ 201, § 161; AUB-Beispiele aus Kenntnis, Wortlaut der AUB-Standardklauseln bekannt). Zwei Feinheiten: (a) die Überschrift "Vertragliche Ausschlüsse" passt nicht auf die gesetzlichen Fälle (§ 161 Selbsttötungsfrist, § 201): ein Halbsatz "teils gesetzlich, teils in den Bedingungen" genügt; (b) "Bewusstseinsstörungen (auch durch Trunkenheit)" ist ein Risikoausschluss unabhängig vom Verschuldensgrad, was neben "grobe Fahrlässigkeit führt nicht zum Ausschluss" wie ein Widerspruch wirken kann: Zusatz "unabhängig vom Verschuldensgrad". Der Text sagt "etwa Bewusstseinsstörungen" ohne Trunkenheit; unkritisch.

**N7. Quotenteilung in `kp1/3.3` Theorie (Paar 1): akzeptabel.** Der Satz "wird mitunter Quotenteilung genannt; kein gesetzlicher oder prüfungsüblicher Fachbegriff, nicht mit dem Quotenvorrecht zu verwechseln" ist als Brücke für Lernende vertretbar, bei denen der alte Begriff aus früheren Fassungen oder anderer Literatur hängen blieb. Ich konnte den Begriff nicht belegen oder widerlegen (kein Treffer am Gesetz; Lehrbuchlage nicht nachgeschlagen). Konservativere Alternative: Satz streichen (Karten/Quiz verwenden den Begriff ohnehin nicht mehr). Entscheidung beim Auftraggeber; kein Fehler.

**N8. `kb2/2.2` Theorie (Paar 1): "sie haften der Gesellschaft grundsätzlich gemeinsam".** § 43 Abs. 2 GmbHG sagt "solidarisch": "gesamtschuldnerisch" ist der Fachbegriff. "Dritte können sie ebenfalls in Anspruch nehmen" (Außenhaftung in Einzelfällen) ist als Satz vorsichtig genug und aus Kenntnis richtig (z. B. Insolvenzverschleppung, Steuern/Sozialbeiträge). Geschlechtergerechte Schreibung: im selben Absatz steht davor "Geschäftsführer einer GmbH" (Bestand) und danach "Geschäftsführer:innen" (neu); vereinheitlichen.

**N9. `kp1/fallaufgaben.md` F-KP1-03 TA2 (Paar 1).** Fristen und Fallbezug (14 Monate) stimmen mit dem Aufgabentext überein, auch § 21 Abs. 1 (Monatsfrist ab Kenntnis, "schriftlich") und Abs. 3 (5/10 Jahre; die Ausnahme für vorher eingetretene Versicherungsfälle fehlt, im Fall unerheblich, Rechtsangaben vermerken es). Hinweis ohne Pflicht: Der Fall ist ein bereits eingetretener Versicherungsfall; die Musterlösung könnte ergänzen, dass die Kündigung (anders als der Rücktritt) nur für die Zukunft wirkt (§ 21 Abs. 2 gilt nur für den Rücktritt). Das gehört nicht zu diesem Paket, kann zu P-AK.

**N10. Bleibende, nicht zu den Korrekturen gehörende Ungenauigkeit.** `kb2/2.1` Einbruchdiebstahl-Theorie und `kb2/fachgespraech.md` Zeile 43: "bei Nichteinhaltung der Sicherungsstandards (Obliegenheit) drohen Leistungskürzungen": nach dem Gesetz Leistungsfreiheit bei Vorsatz, Kürzung bei grober Fahrlässigkeit, keine Folge bei einfacher Fahrlässigkeit (hier nicht eingelesen, aus Kenntnis: § 28 Abs. 2 VVG). Durch die neue Aussage zur groben Fahrlässigkeit im selben Thema wird die Lücke etwas sichtbarer. Nur Hinweis.

## Zu den Rechtsangaben (Sicherheitsangaben)

- Zeilen 1, 2: "am Gesetzestext gelesen" stimmt für § 19, § 21; es fehlt § 194 Abs. 1 (siehe M1). Die Rechtsangabe zu § 21 enthält "schriftlich" nicht (kein Fehler).
- Zeile 4: ehrlich als Verallgemeinerung gekennzeichnet; § 194 Abs. 1 (Krankenversicherung) stützt sie jetzt für die Krankenversicherung am Gesetz. Zeile 5 (AUB): "aus Kenntnis" ist ehrlich.
- Zeile 6: Bewertung des Autors richtig (siehe oben); es fehlt § 103 (M3).
- Zeile 8, 9: richtig; Zeile 9 "Quotenteilung" als vermutet gekennzeichnet, passend.
- Zeile 10: "Genehmigung der Aufsichtsbehörde" richtig (VAG § 13 Abs. 1 S. 1 nennt "Aufsichtsbehörden" im Plural, sachlich unerheblich); Begriff Run-off "aus Kenntnis" ehrlich.
- Zeile 11: "vermutet" für die Lehrbuchlage ehrlich; Versicherungsteuer jetzt am Gesetz zu prüfen und einzuschränken (M4).
- Zeile 12 (Schwankungsrückstellung, HGB/RechVersV): nicht nachgeschlagen, ehrlich so ausgewiesen; Aussage aus meiner Kenntnis richtig (Pflicht im Nichtlebensbereich, § 341h HGB), konnte nicht nachgelesen werden.
- Zeile 13: Innenhaftung am Gesetz gelesen (richtig), Außenhaftung/Ressortverteilung aus Kenntnis ehrlich.
- Zeile 14: Bundestagsbeschluss 08.10.2026 und Drucksachennummer 21/8429 stimmen (Textarchiv). Inkrafttreten 09.12.2026: durch IHK Frankfurt und MTR Legal belegt (Sekundärquelle), Bundesrat ausstehend: "vermutet" ist vorsichtig genug.
- Zeile 18: Fundstelle falsch (VersVermV § 12, nicht § 9 und nicht "nicht abrufbar"), Beträge der Websuche veraltet (M2).

## Nicht prüfbar

Gesetzestext der Neufassung des Produkthaftungsrechts (Beschlussempfehlung/Bundesratsbeschluss, Verkündung im Bundesgesetzblatt); Delegierte Verordnung (EU) 2024/896 im Rechtstext; HGB/RechVersV zur Schwankungsrückstellung; AUB-Musterbedingungen im Wortlaut; Rechtsprechung zur Geschäftsführerhaftung (Außenhaftung, Ressortverteilung); Landesarchitektengesetze; AGB-rechtliche Einordnung abweichender Klauseln zu § 81 (nur logisch aus § 87 geschlossen); Begriff "Quotenteilung" in der Literatur.

## Zahl der Prüfungen

45 Ersetzungspaare mechanisch und inhaltlich geprüft (9 Dateien); alle 18 Rechtsangaben-Zeilen gelesen, davon 17 Rechtsaussagen gegen Quellen abgeglichen (Zeile 5 und 12 nicht prüfbar, Zeile 16 nur unverändert dokumentiert). Selbst am Rohtext gelesene Normen: 21 Fundstellen (VVG 19, 21, 22, 61, 62, 63, 81, 86, 87, 103, 161, 183, 194, 201; VAG 13; GmbHG 43; BGB 254; ProdHaftG 1, 11; GewO 34d; VersVermV 11, 12; VersStG 4). Geänderte Quizfragen (Q-3.1-10, -12, Q-3.3-04, -08, -13, Q-3.4-13) und Karten (K-3.1-09, -13, -14, -18, -19, K-3.3-13, K-2.1-16, K-2.2-14, K-2.3-16, K-3.4-06, -07) auf Format geprüft.
