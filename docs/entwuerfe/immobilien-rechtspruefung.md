# Entwurf: Rechtsprüfung der vier Zweifelsstellen in der Immobilien-Theorie

Stand 11.10.2026 · **zur Prüfung vorgelegt, nichts in `content/` geändert** (rechtsnahe Inhalte, R4). Auftrag des Projektleiters vom 11.10.2026: „prüfe die selber gegen (Legal Plugin)“.

## Wie geprüft wurde, und was das wert ist

- Das Legal-Plugin (Vertragsprüfung, NDA-Triage, Compliance-Check) ist für die Prüfung deutscher Gesetzestexte nicht gebaut; seine Anbindungen (Box, DocuSign, Slack und andere) sind nicht freigegeben und hätten ohnehin keine Gesetzestexte geliefert. Ich habe deshalb die **amtlichen Normtexte** auf gesetze-im-internet.de gelesen (Abruf 11.10.2026) und für Änderungen nach Stand der Texte Auskünfte von IHK und Verbänden herangezogen.
- Auf den abgerufenen Seiten stand **kein Stand- oder Änderungsvermerk**. Wo ich mich auf Behörden- oder Verbandsauskünfte stütze, steht es dabei.
- Das ist eine KI-Prüfung gegen Gesetzestexte, **keine Rechtsberatung** und kein Ersatz für die Rechtsprüfung der Iteration 22. Sie soll die Fehler finden, die sich am Gesetzestext belegen lassen. Alle Änderungsvorschläge unten sind Entwürfe.

## Ergebnis auf einen Blick

| # | Stelle | Befund | Schwere |
|---|---|---|---|
| 1 | Fristlose Kündigung wegen Zahlungsverzugs (4.1) | Theorie falsch: Schwellen stimmen nicht mit § 543 Abs. 2 Nr. 3 BGB überein | hoch |
| 2 | Provisionsteilung beim Wohnungskauf (1.1 gegen 6.1) | 1.1 falsch (und falsche Norm), 6.1 im Kern richtig, aber ungenau | hoch |
| 3 | Energieausweis in der Anzeige (6.2) | Rechtsgrundlage überholt, Pflichtangaben unvollständig; zusätzlich Gesetzesumbenennung offen | mittel |
| 4 | Fortbildungspflicht (3.3, 6.1, 1.3) | Verordnung „ImmVermV“ ist nicht belegbar; **seit 24.07.2026 gilt die Pflicht für Makler nicht mehr** | hoch |

## 1. Fristlose Kündigung wegen Zahlungsverzugs (Immobilien 4.1)

**Gesetzestext (§ 543 Abs. 2 Satz 1 Nr. 3 BGB):** Wichtiger Grund, wenn der Mieter
a) für **zwei aufeinander folgende Termine** mit der Miete oder einem **nicht unerheblichen Teil** der Miete in Verzug ist, oder
b) in einem Zeitraum, der sich über **mehr als zwei Termine** erstreckt, mit einem Betrag in Verzug ist, der **die Miete für zwei Monate erreicht**.
**§ 569 Abs. 3 Nr. 1 BGB:** Bei Wohnraum ist der Rückstand im Fall a) nur dann „nicht unerheblich“, wenn er **die Miete für einen Monat übersteigt**. **§ 543 Abs. 3 Nr. 3:** Eine Abmahnung ist hier nicht nötig. **Schonfrist, § 569 Abs. 3 Nr. 2:** Die Kündigung wird unwirksam, wenn der Vermieter spätestens bis zum Ablauf von **zwei Monaten nach Eintritt der Rechtshängigkeit des Räumungsanspruchs** befriedigt wird oder sich eine öffentliche Stelle zur Zahlung verpflichtet; das gilt nicht, wenn in den **letzten zwei Jahren** schon eine so unwirksam gewordene Kündigung vorausging.

**Befund:** „Mehr als zwei Monatsmieten“ ist falsch; zwei Monatsmieten genügen im Fall b), und im Fall a) genügt schon mehr als eine Monatsmiete über zwei Termine. „Über zwei Termine hinweg wiederholt unpünktlich“ ist kein Kündigungsgrund nach dieser Norm. Die Schonfrist ist richtig dargestellt, nur ungenau („nach Zustellung“ statt „nach Eintritt der Rechtshängigkeit“; die Rechtshängigkeit tritt mit der Zustellung der Klage ein) und ohne die Zweijahresgrenze.

**Betroffen:** `hb4/4.1-mietverwaltung.md` (Theorie Z. 33; K-4.1-11; K-4.1-12 sinngemäß; Q-4.1-04 Lückentext „mehr als ___zwei___ Monatsmieten“), `hb4/fallaufgaben.md` (Ausgangssituation und Musterlösung Teilaufgabe 1, „mehr als zwei Monatsmieten“). Das Fachgespräch HB4 ist unverändert richtig, weil die Erwartungszeile dazu schon gestrichen wurde.

**Vorschlag Theorie:** „… Sie ist möglich, wenn der Mieter für zwei aufeinander folgende Termine mit der Miete oder einem nicht unerheblichen Teil davon in Verzug ist; bei Wohnraum ist der Rückstand nur dann nicht unerheblich, wenn er eine Monatsmiete übersteigt. Sie ist auch möglich, wenn sich der Rückstand über mehr als zwei Termine erstreckt und die Miete für zwei Monate erreicht. Eine vorherige Abmahnung ist nicht nötig (§ 543 Abs. 2 Nr. 3, Abs. 3 Nr. 3, § 569 Abs. 3 Nr. 1 BGB). Die **Schonfristzahlung** (§ 569 Abs. 3 Nr. 2 BGB) macht die fristlose Kündigung unwirksam, wenn der Mieter den Rückstand binnen zwei Monaten nach Eintritt der Rechtshängigkeit der Räumungsklage vollständig ausgleicht (oder eine öffentliche Stelle die Zahlung zusagt); das gilt nicht, wenn innerhalb der letzten zwei Jahre schon einmal eine Kündigung so unwirksam geworden ist.“

**Vorschlag K-4.1-11:** „Wenn der Mieter für zwei aufeinander folgende Termine mit der Miete oder einem nicht unerheblichen Teil in Verzug ist (bei Wohnraum: Rückstand über einer Monatsmiete) oder sich der Rückstand über mehr als zwei Termine erstreckt und zwei Monatsmieten erreicht.“
**Vorschlag K-4.1-12:** „… binnen zwei Monaten nach Eintritt der Rechtshängigkeit der Räumungsklage (Zustellung der Klage) …“ (sonst unverändert).
**Vorschlag Q-4.1-04:** „Bei Wohnraum liegt ein nicht unerheblicher Rückstand, der bei zwei aufeinander folgenden Terminen zur fristlosen Kündigung genügt, vor, wenn er mehr als ___eine___ Monatsmiete beträgt.“ Erklärung: § 569 Abs. 3 Nr. 1 BGB; bei Verzug über mehr als zwei Termine genügt der Betrag von zwei Monatsmieten (§ 543 Abs. 2 Nr. 3 b).
**Fallaufgabe HB4:** Die Ausgangslage („seit vier Monaten, mehr als zwei Monatsmieten“) erfüllt die Voraussetzungen weiter; nur die Begründung in der Musterlösung wird auf § 543 Abs. 2 Nr. 3 BGB (zwei aufeinander folgende Termine, Rückstand über einer Monatsmiete) umgestellt.

## 2. Provisionsteilung beim Wohnungskauf (Immobilien 1.1 gegen 6.1)

**Gesetzestext:** **§ 656a BGB:** Maklervertrag über Kauf einer Wohnung oder eines Einfamilienhauses bedarf der **Textform**. **§ 656b:** §§ 656c und 656d gelten nur, wenn der Käufer **Verbraucher** ist. **§ 656c Abs. 1:** Lässt sich der Makler von **beiden** Parteien Lohn versprechen, geht das nur so, dass sich die Parteien **in gleicher Höhe** verpflichten; ein unentgeltliches Tätigwerden für eine Seite schließt Lohn von der anderen aus. **§ 656d Abs. 1:** Hat **nur eine** Partei den Maklervertrag geschlossen, ist eine Vereinbarung, die die **andere** Partei zur Zahlung verpflichtet, **nur wirksam, wenn die beauftragende Partei mindestens in gleicher Höhe zahlungspflichtig bleibt**; der Anspruch gegen die andere Partei wird **erst fällig**, wenn die beauftragende Partei gezahlt und einen Nachweis erbracht hat.

**Befund:** Die Teilungsregel lautet: **Die Seite, die den Makler beauftragt hat, trägt mindestens die Hälfte; die andere Seite darf höchstens die Hälfte tragen.** 6.1 („höchstens die Hälfte … auf die andere Partei abgewälzt“, Zahlung gekoppelt an den Nachweis) ist richtig. 1.1 („muss dieser die Provision **mindestens** hälftig **mit dem Käufer teilen**“ und Q-1.1-03 „mindestens hälftig“) ist falsch herum gesagt: Es gibt keine Mindestbeteiligung des Käufers, sondern eine **Höchstgrenze für den Käufer**; der Käufer kann auch gar nicht belastet werden. Außerdem passt die Norm nicht: § 656c betrifft die Tätigkeit für **beide** Parteien, die Abwälzung bei Beauftragung nur durch eine Seite steht in **§ 656d**. 6.1 nennt als Quelle das „Gesetz über die Verteilung der Maklerkosten …“; das ist der Name des Artikelgesetzes von 2020, die Vorschriften stehen heute im BGB (§§ 656a bis 656d).

**Betroffen:** `hb1/1.1-rechtliche-rahmenbedingungen.md` (Theorie Z. 35, K-1.1-14, Q-1.1-03 samt Erklärung), `hb6/6.1-maklerrecht-maklertaetigkeit.md` (Theorie Z. 35 Quellenangabe; sonst richtig), Fachgespräch-Erwartungen HB6 (richtig) und gegebenenfalls HB1 zur Provision. Die Option „§ 656c BGB“ in Q-1.3-02 ist als falsche Antwort in Ordnung (die Frage nennt die Erlaubnispflicht).

**Vorschlag Theorie 1.1:** „Beim Kauf einer Wohnung oder eines Einfamilienhauses durch Verbraucher (seit Dezember 2020, §§ 656a bis 656d BGB): Der Maklervertrag braucht die Textform. Lässt sich der Makler von beiden Seiten Provision versprechen, geht das nur in gleicher Höhe (§ 656c). Hat nur eine Seite den Makler beauftragt, trägt sie mindestens die Hälfte; die andere Seite darf höchstens zur Hälfte belastet werden und muss erst zahlen, wenn die beauftragende Seite nachweislich gezahlt hat (§ 656d).“
**Vorschlag K-1.1-14:** „Hat nur der Verkäufer den Makler beauftragt, muss er mindestens die Hälfte der Provision selbst tragen; dem Käufer darf höchstens die Hälfte übertragen werden, und sie wird erst fällig, wenn der Verkäufer gezahlt und das nachgewiesen hat (§ 656d BGB).“
**Vorschlag Q-1.1-03:** Antwort „Der Käufer darf höchstens die Hälfte der Provision tragen, der Verkäufer mindestens die Hälfte“, Erklärung auf § 656d BGB. Die übrigen Optionen anpassen, damit sie nicht auf „mindestens hälftig mit dem Käufer“ zeigen.
**Vorschlag 6.1:** Quellenangabe „§§ 656a bis 656d BGB (seit Dezember 2020)“ statt des Gesetzesnamens; Rest unverändert.

## 3. Energieausweis in der Anzeige (Immobilien 6.2, 6.1)

**Gesetzestext (abgerufen unter `…/geg/__87.html`, Seitenkopf dort inzwischen „Gebäudemodernisierungsgesetz – GModG“):** Liegt bei Aufgabe einer Immobilienanzeige in kommerziellen Medien ein Energieausweis vor, ist sicherzustellen, dass die Anzeige enthält: 1. die **Art** des Ausweises (Bedarfs- oder Verbrauchsausweis), 2. den **Endenergiebedarf oder -verbrauch**, 3. die **wesentlichen Energieträger** für die Heizung, 4. bei **Wohngebäuden das Baujahr**, 5. bei **Wohngebäuden die Energieeffizienzklasse**. Bei Nichtwohngebäuden sind Wärme und Strom getrennt anzugeben. **§ 80 Abs. 4:** Verkäufer oder Makler müssen den Ausweis **spätestens bei der Besichtigung** vorlegen (ein deutlich sichtbarer Aushang genügt); findet keine Besichtigung statt, **unverzüglich**; **unverzüglich nach Vertragsschluss** ist er zu **übergeben**.

**Befund:** „Energieeinsparverordnung“ ist überholt (die EnEV ist seit 2020 im Gebäudeenergiegesetz aufgegangen). Die Liste in 6.2 („etwa …“) lässt die **Energieeffizienzklasse** aus und unterscheidet Wohn- und Nichtwohngebäude nicht; die Pflicht besteht nur, **wenn ein Energieausweis vorliegt**. 6.1 vermischt Vorlage (spätestens bei der Besichtigung) und Übergabe (unverzüglich nach Vertragsschluss), das ist aber nur eine Ungenauigkeit. **Offen:** Nach Auskünften aus dem Frühjahr und Sommer 2026 ersetzt das **Gebäudemodernisierungsgesetz (GModG)** das Gebäudeenergiegesetz; die Zählung von § 80 und § 87 ist unverändert, das Inkrafttreten ist aus meinen Quellen nicht eindeutig (Angaben reichen von August bis 1. November 2026). Welcher Gesetzesname im Lehrtext stehen soll, ist daher eine Entscheidung, die die Rechtsprüfung treffen muss.

**Betroffen:** `hb6/6.2-marketing-fuer-immobilien.md` (Theorie Z. 27, K-6.2 zu den Pflichtangaben Z. 66 bis 68, Quiz), `hb6/fallaufgaben.md` (Teilaufgabe 2 „mindestens drei Pflichtangaben“, bleibt gültig), `hb6/fachgespraech.md` (Erwartungen sprechen nur allgemein von „bestimmten Pflichtangaben“, bleiben richtig).

**Vorschlag Theorie 6.2:** „Bereits in der Immobilienanzeige … müssen nach § 87 des Gebäudeenergiegesetzes (GEG) die Pflichtangaben aus dem Energieausweis stehen, sofern bei Aufgabe der Anzeige ein Energieausweis vorliegt: Art des Ausweises (Bedarfs- oder Verbrauchsausweis), Endenergiebedarf bzw. -verbrauch, wesentliche Energieträger der Heizung und, bei Wohngebäuden, Baujahr und Energieeffizienzklasse.“ Dazu ein Hinweis, falls gewünscht: „Das GEG wird 2026 durch das Gebäudemodernisierungsgesetz abgelöst; die Pflichtangaben in der Anzeige bleiben nach dem bekannten Stand gleich.“
**Vorschlag K-6.2 (Pflichtangaben):** Antwort ergänzen um „bei Wohngebäuden zusätzlich Baujahr und Energieeffizienzklasse“.
**Vorschlag 6.1:** „… bei der Besichtigung vorzulegen (ein Aushang genügt), nach Vertragsschluss unverzüglich zu übergeben.“

## 4. Fortbildungspflicht (Immobilien 3.3, 6.1, 1.3)

**Gesetzestext (§ 34c GewO, Abruf 11.10.2026):** Abs. 2a verpflichtet nur noch **„Gewerbetreibende nach Absatz 1 Satz 1 Nummer 4“**, das sind die **Wohnimmobilienverwalter**, zu **20 Stunden Weiterbildung innerhalb von drei Kalenderjahren**; dasselbe gilt für unmittelbar mitwirkende Beschäftigte. **Makler (Nr. 1) werden dort nicht mehr genannt.** Nach IHK-Auskünften (Hannover, Frankfurt, München; Stand Juli 2026) hat das Bürokratierückbaugesetz (Bundestag 11.06.2026, Bundesrat 10.07.2026, in Kraft **24.07.2026**) die Weiterbildungspflicht für **Immobilienmakler gestrichen**; für Wohnimmobilienverwalter bleibt sie, bei erleichtertem Nachweis. Die Vorschrift der Verordnung dazu (§ 15b MaBV mit Anlagen) konnte ich auf gesetze-im-internet.de nicht abrufen (Fehler 404); die Aussage zur Verordnung stützt sich auf IHK-Auskünfte.

**Befund:**
- **„ImmVermV“ / „Immobiliardarlehensvermittlungsverordnung / Verordnung über Immobilienmakler und Wohnimmobilienverwalter“ (3.3)** ist als Quelle der Pflicht nicht belegbar. Die Fachquellen nennen **§ 34c Abs. 2a GewO und § 15b der Makler- und Bauträgerverordnung (MaBV)**. Die Überschrift in 3.3 vermischt außerdem zwei verschiedene Verordnungen.
- **„drei Jahre“ (3.3) gegen „drei Kalenderjahre“ (6.1):** Das Gesetz sagt „drei Kalenderjahre“; der erste Zeitraum beginnt am 1. Januar des Jahres der Erlaubnis oder der Aufnahme der Tätigkeit.
- **Rechtsstand:** Die Lehrtexte sagen, **Makler** seien seit 2018 weiterbildungspflichtig. Das war bis 23.07.2026 richtig und ist es **für Makler seitdem nicht mehr**; für **Wohnimmobilienverwalter** gilt es weiter.

**Betroffen (alle Stellen, an denen Makler:innen als pflichtig erscheinen oder ImmVermV steht):**
- `hb3/3.3-ausbildung-qualifizierung.md`: Theorie Z. 30; K-3.3-09, K-3.3-10; Q-3.3-01 (Option „ImmVermV“), Q-3.3-02 (Frage und Erklärung), Q-3.3-07 (Kurzantwort, akzeptierte Antwort „ImmVermV“), Q-3.3-10 (Falsch bleibt richtig, Erklärung ändern).
- `hb3/fallaufgaben.md`: Teilaufgabe 3 und Musterlösung Teilaufgabe 2 (nennen die ImmVermV und „mindestens 20 Stunden“).
- `hb3/fachgespraech.md`: zwei Fragen (Erwartungen und Rückfragen mit „nach der ImmVermV“ und „Makler:innen und Wohnimmobilienverwalter:innen“).
- `hb6/6.1-maklerrecht-maklertaetigkeit.md`: Theorie Z. 19, K-6.1 (Weiterbildung seit 2018), Quiz mit der Antwortoption „Eine Weiterbildungspflicht besteht nicht“ und Erklärung („seit 2018 eine regelmäßige Weiterbildungspflicht“); `hb6/fachgespraech.md` Erwartung Z. 21.
- `hb1/1.3-berufsbild-standesregeln.md`: K-1.3-09, K-1.3-15, Q-1.3-02-Erklärung („samt Fortbildungspflicht“); `hb1/fachgespraech.md` Z. 96 und 103.

**Vorschlag (Linie):** Rechtsstand 24.07.2026 darstellen: „Wohnimmobilienverwalter:innen müssen sich nach § 34c Abs. 2a GewO und § 15b MaBV innerhalb von drei Kalenderjahren mindestens 20 Stunden weiterbilden; für Immobilienmakler:innen galt die Pflicht von 2018 bis zum 23.07.2026 und ist durch das Bürokratierückbaugesetz entfallen.“ Daraus folgt: Theorie 3.3 und 6.1 neu fassen, K-3.3-09 und Q-3.3-02 auf „Verwalter:innen, 20 Stunden, drei Kalenderjahre“ umstellen, Q-3.3-07 auf „MaBV“ (akzeptiert auch „§ 15b MaBV“), die Optionen „ImmVermV“ ersetzen, die Quizfrage in 6.1 „Eine Weiterbildungspflicht besteht nicht“ umdrehen (für Makler heute richtig) oder auf Verwalter umstellen, und die Ravelin-Fälle auf die Verwalterabteilung beziehen. Weil dieser Punkt das Berufsbild der Makler:innen verändert (Prüfungsstoff für den Immobilienfachwirt), sollte er **vor** der Änderung durch die Rechtsprüfung bestätigt werden: Ich habe das Gesetz zum Bürokratierückbau und die Verordnung selbst nicht gelesen.

## Weitere Zahlen, die die Rechtsprüfung ohnehin ansehen sollte

Unverändert aus der Liste im Entwurf `fachgespraech-pilot-recht.md`: Kappungsgrenzen 15 und 20 %, 8 %, 17 Kostenarten, 50 bis 70 %, 15 % Kürzungsrecht, Schwellenzahlen im BetrVG, Verjährungsfristen nach VOB/B und BGB, Probezeit, Jugendarbeitsschutz, JAV, Zulassungsfrist. Diese habe ich **nicht** geprüft.

## Zu entscheiden

1. Sollen die Änderungen der Punkte 1 und 2 (klar am Gesetzestext belegbar) so umgesetzt werden, einschließlich der Karteikarten, Quizfragen, Fallaufgabe und Fachgespräch-Erwartungen?
2. Punkt 3: Gesetz als „Gebäudeenergiegesetz (GEG)“ nennen mit Hinweis auf das GModG, oder auf die Klärung des Inkrafttretens warten?
3. Punkt 4: Rechtsstand 24.07.2026 (Makler ohne Pflicht, Verwalter mit Pflicht) so übernehmen, oder erst die Rechtsprüfung abwarten?
