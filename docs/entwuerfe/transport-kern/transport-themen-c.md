# Entwurf Transport Management and Logistics, Frachtberechnung und Prozessgestaltung: Ergänzungen in den Themen 1.3 und 2.6

Stand 14.10.2026, **Entwurf (R3), nicht eingespielt.** Teil C des Auftrags P-D (Erhebung TL-9 Frachtberechnung und TL-3 Prozessgestaltung; Review FL-TL-08, FL-TL-09, FL-TL-32). Einzufügen in `content/transport-management-logistics/hb1/1.3-vertrieb-angebotskalkulation.md` (Abschnitt A bis C) und `hb2/2.6-qualitaets-umweltmanagement-logistik.md` (D bis F). Die vorhandenen Abschnitte (Vertrieb, Angebotsprozess, Kostenarten, Zuschlagskalkulation, Preisstrategien, Rechenbeispiel Tour und Preisuntergrenze; ISO 9001 mit PDCA, ISO 14001, CO2-Bilanzierung, nachhaltige Logistik, Qualitätsmanagement im Tagesgeschäft, Rechenbeispiel Tonnenkilometer) werden nicht wiederholt, sondern vorausgesetzt. Alle Zahlen, Umrechnungsfaktoren, Frachtsätze, Zuschläge und Fahrzeugmaße sind frei gewählte Beispielwerte; maßgeblich sind in der Praxis der Vertrag oder der Tarif der Beteiligten. Die Phasen der Auftragsabwicklung (Auftragsannahme, Disposition, Durchführung) folgen den Quizfragen Q-2.1-06 und Q-2.1-07 und werden verfeinert, nicht ersetzt; die PDCA-Phasen folgen 1.2, 2.6 und dem Spiel „Prozess-Reihenfolge“ (Do = testweise umsetzen, Act = standardisieren oder nachbessern). Der Verweis auf Thema 2.9 in Abschnitt D setzt voraus, dass Teil B eingespielt ist; sonst entfällt der Klammerzusatz. Karten und Quiz duzen, die Theorie spricht niemanden an.

---

# Teil 1: Thema 1.3

## A. Theorie-Ergänzung 1.3 (einfügen am Ende von „## Theorie“, hinter „Rechenbeispiel: Zuschlagskalkulation einer Tour und Preisuntergrenze“)

### Frachtpflichtiges Gewicht: Rohgewicht und Volumengewicht

Eine Komplettladung kalkuliert Fracora als ganze Tour (siehe Rechenbeispiel oben). Stückgut, das im Sammelgutverkehr mit Sendungen anderer Kund:innen gebündelt wird, sowie Teilladungen, Luftfracht und Seefracht-Sendungen, die keinen ganzen Container füllen, werden dagegen meist nach dem Gewicht der einzelnen Sendung berechnet. Maßgeblich ist das **frachtpflichtige Gewicht** (auch Frachtgewicht). Ausgangspunkt ist das **Rohgewicht** (Bruttogewicht), also das tatsächliche Gewicht der Sendung einschließlich Verpackung und Ladungsträger wie der Palette. Leichte, aber sperrige Güter belegen viel Laderaum, ohne viel zu wiegen; nach dem Rohgewicht allein wäre dieser Laderaum nicht bezahlt. Deshalb wird das Volumen der Sendung mit einem **Umrechnungsfaktor** in ein **Volumengewicht** umgerechnet. Frachtpflichtig ist **das höhere** der beiden Gewichte.

Die Umrechnungsfaktoren sind nicht einheitlich, sondern richten sich nach dem Vertrag oder dem Tarif der jeweiligen Beteiligten. In diesem Kurs gelten folgende **Beispielwerte**:

- **Sammelgutverkehr auf der Straße:** 1 cbm = 300 kg, also Volumengewicht = Volumen in cbm × 300 kg. In Tarifen und Verträgen kommen auch andere Faktoren vor.
- **Luftfracht:** Länge × Breite × Höhe in cm ÷ 6.000 = Volumengewicht in kg; das entspricht rund 167 kg je cbm (1.000.000 cm³ ÷ 6.000 ≈ 166,7 kg). Drei Kartons mit je 60 cm × 50 cm × 40 cm und 15 kg haben je 120.000 cm³ ÷ 6.000 = 20 kg Volumengewicht, zusammen 60 kg; frachtpflichtig sind 60 kg statt des Rohgewichts von 45 kg.
- **Seefracht nach „Weight or Measurement“ (W/M):** 1 t = 1 cbm. Verglichen werden das Gewicht in Tonnen und das Volumen in Kubikmetern; der höhere Wert ist die Berechnungsgrundlage, die **Frachttonne**. Eine Sendung, die Fracora über ihren Seefracht-Partner verschickt, wiegt 3,2 t und misst 5,5 cbm; berechnet werden 5,5 Frachttonnen, bei einem Beispielsatz von 60 € je Frachttonne also 5,5 × 60 € = 330 €.

Auch Rundungsregeln, etwa auf volle 100 kg oder auf halbe Kilogramm, legt der Tarif fest; in den Rechenbeispielen dieses Kurses wird nicht gerundet. Für die Bedarfsanalyse im Angebotsprozess folgt daraus: Ohne Maße, Gewicht, Anzahl der Packstücke und Angabe zur Stapelbarkeit lässt sich die Fracht nicht verlässlich berechnen.

### Lademeter, Paletten und Container

Bei Teilladungen ist im Straßenverkehr die belegte **Ladefläche** eine übliche Bezugsgröße für die Fracht; bei nicht stapelbarer Ware gilt das besonders, weil sie zusätzlich den Raum über sich blockiert. Maßeinheit ist der **Lademeter** (ldm, auch Ladungsmeter): ein Meter Ladefläche in Längsrichtung über die volle Breite des Fahrzeugs. Bei einer Innenbreite von rund 2,4 m gilt vereinfacht: Lademeter = Länge × Breite der Grundfläche in m ÷ 2,4 m. Eine **Europalette** (1,2 m × 0,8 m) belegt damit 1,2 × 0,8 ÷ 2,4 = 0,4 ldm. Ein Sattelauflieger mit rund 13,6 m Ladelänge bietet rechnerisch 13,6 ÷ 0,4 = 34 **Palettenstellplätze**; je nach Ladeschema (Paletten längs oder quer) sind es in der Praxis 33 oder 34. Um Lademeter in ein frachtpflichtiges Gewicht umzurechnen, nennt der Tarif ein Gewicht je Lademeter; ein häufig genannter Beispielwert ist 1 ldm = 1.850 kg, andere Tarife setzen andere Werte an, und verbindlich ist auch hier der vereinbarte Tarif. Zehn nicht stapelbare Europaletten mit je 400 kg belegen 10 × 0,4 = 4 ldm; das Lademetergewicht beträgt 4 × 1.850 kg = 7.400 kg und liegt über dem Rohgewicht von 4.000 kg, frachtpflichtig sind also 7.400 kg. Manche Tarife rechnen statt mit Lademetern mit einem festen Gewicht je Palettenstellplatz. Ob nach Volumen, Lademetern oder Stellplätzen abgerechnet wird, hängt vom Tarif ab, häufig von Sendungsgröße und Stapelbarkeit; das Prinzip bleibt gleich: Belegter Raum wird in Gewicht umgerechnet, und das höhere Gewicht zählt.

In der Seefracht und im kombinierten Verkehr (siehe Thema 2.3) ist der **Container** die übliche Ladeeinheit, vor allem in den Größen 20 Fuß und 40 Fuß. Containermengen werden in **TEU** (Twenty-foot Equivalent Unit) gezählt: Ein 20-Fuß-Container entspricht 1 TEU, ein 40-Fuß-Container 2 TEU bzw. 1 FEU (Forty-foot Equivalent Unit). Volle Container werden in der Regel mit einem Preis je Container abgerechnet; Schiffsgrößen, Umschlagmengen von Terminals und Mengen in Rahmenverträgen werden häufig in TEU angegeben; 18 Container mit 20 Fuß und 12 Container mit 40 Fuß ergeben 18 + 12 × 2 = 42 TEU. Volumen und zulässige Zuladung hängen von Bauart und Reederei ab; als Richtwerte gelten rund 33 cbm Innenvolumen für den 20-Fuß- und rund 67 cbm für den 40-Fuß-Standardcontainer. Das nutzbare Volumen liegt wegen Stauverlusten unter dem Innenvolumen; die zulässige Zuladung hängt vom Container und von den Gewichtsgrenzen im Straßenvor- und -nachlauf ab und ist im folgenden Beispiel ein Beispielwert. Ob ein Container nach Gewicht oder nach Volumen ausgelastet ist, zeigt der Vergleich beider Auslastungsgrade (Auslastungsgrad wie in Thema 2.1: genutzte ÷ verfügbare Kapazität × 100). Werden in einen 20-Fuß-Container mit angenommen 30 cbm nutzbarem Volumen und 24.000 kg zulässiger Zuladung 21 cbm und 9.600 kg geladen, ist er nach Volumen zu 21 ÷ 30 × 100 = 70 % und nach Gewicht zu 9.600 ÷ 24.000 × 100 = 40 % ausgelastet. Engpass ist hier das Volumen: Schwere, kompakte Ware ließe sich noch zuladen, sperrige kaum.

### Rechenbeispiel: Frachtberechnung einer Sammelgutsendung

Ein Industrieunternehmen übergibt Fracora vier Europaletten Sammelgut, je 1,2 m × 0,8 m × 1,25 m groß und 220 kg schwer (Rohgewicht). Der Haustarif enthält folgende angenommene Beispielwerte: Volumenfaktor 300 kg je cbm, Frachtsatz 8,00 € je 100 kg frachtpflichtiges Gewicht, Mindestfracht 35,00 €, Kraftstoffzuschlag 10 % auf die Fracht und eine Avisgebühr (Anmeldung der Zustellung beim empfangenden Unternehmen) von 10,00 € je Sendung.

| Stufe | Rechnung | Ergebnis |
|---|---|---|
| Rohgewicht | 4 × 220 kg | 880 kg |
| Volumen | 4 × 1,2 m × 0,8 m × 1,25 m | 4,8 cbm |
| Volumengewicht | 4,8 cbm × 300 kg | 1.440 kg |
| = frachtpflichtiges Gewicht | höherer Wert aus 880 kg und 1.440 kg | 1.440 kg |
| Fracht | 1.440 kg ÷ 100 × 8,00 € (liegt über der Mindestfracht von 35,00 €) | 115,20 € |
| + Kraftstoffzuschlag | 10 % von 115,20 € | 11,52 € |
| + Avisgebühr | je Sendung | 10,00 € |
| = Frachtkosten (netto) | | 136,72 € |

Die **Mindestfracht** deckt den Aufwand für Abholung, Umschlag und Zustellung auch bei sehr kleinen Sendungen. Ein Karton mit 25 kg Rohgewicht und 0,1 cbm (Volumengewicht 0,1 × 300 kg = 30 kg) ergäbe nach Tarif nur 30 kg ÷ 100 × 8,00 € = 2,40 €; berechnet wird die Mindestfracht von 35,00 €. Die Zuschläge kommen auf die Fracht hinzu, die Umsatzsteuer wie in der Zuschlagskalkulation erst auf den Nettobetrag, soweit die Leistung steuerpflichtig ist.

**Einordnung in die Angebotskalkulation:** Im Sammelgutverkehr teilen sich mehrere Sendungen ein Fahrzeug, und jede wird über ihr frachtpflichtiges Gewicht berechnet. Die Frachtsätze eines Tarifs sind deshalb so zu kalkulieren, dass die Erlöse aller Sendungen einer Tour zusammen mindestens deren Selbstkosten decken. Fährt Fracora die Tour aus dem Rechenbeispiel oben (Selbstkosten 897 €, Angebotspreis 986,70 € netto) mit Sammelgut zu einem Frachtsatz von 6,50 € je 100 kg (Beispielwert dieser Relation), braucht sie vereinfacht, also ohne die Kosten für Abholung, Umschlag und Zustellung, mindestens 897 € ÷ 6,50 € × 100 kg = 13.800 kg frachtpflichtiges Gewicht, um die Selbstkosten zu decken, und 986,70 € ÷ 6,50 € × 100 kg = 15.180 kg, um den kalkulierten Angebotspreis zu erreichen. Weil Volumen- und Lademetergewicht in diese Rechnung eingehen, sichert der Umrechnungsfaktor die Erlöse auch dann, wenn leichte, sperrige Sendungen den Laderaum füllen. Belegt eine Teilladung das Fahrzeug fast vollständig, ist sie wirtschaftlich eine Komplettladung; sie wird dann in der Regel als Tour mit der Zuschlagskalkulation angeboten, weil der Tarifpreis nach Lademetern deutlich darüber liegen kann.

## B. Karteikarten 1.3 (anhängen)

#### K-1.3-24
**Frage:** Was ist das frachtpflichtige Gewicht einer Sendung?
**Antwort:** Das Gewicht, nach dem die Fracht berechnet wird: der höhere Wert aus Rohgewicht (tatsächliches Gewicht einschließlich Verpackung und Palette) und Volumengewicht bzw. Lademetergewicht. Die Umrechnungsfaktoren richten sich nach Vertrag oder Tarif.
`tags: frachtberechnung` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-1.3-25
**Frage:** Wie berechnest du das Volumengewicht einer Sammelgutsendung auf der Straße, und welchen Faktor nimmt der Kurs als Beispielwert?
**Antwort:** Volumen in cbm × Umrechnungsfaktor; Beispielwert im Kurs: 1 cbm = 300 kg. Verbindlich ist der Faktor aus Vertrag oder Tarif.
`tags: frachtberechnung, rechnen` · `schwierigkeit: leicht` · `bloom: anwenden`

#### K-1.3-26
**Frage:** Wie wird das Volumengewicht im Luftfracht-Beispiel des Kurses berechnet?
**Antwort:** Länge × Breite × Höhe in cm ÷ 6.000 = Volumengewicht in kg; das entspricht rund 167 kg je cbm (Beispielwert, maßgeblich ist der Tarif).
`tags: frachtberechnung, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.3-27
**Frage:** Was bedeutet „Weight or Measurement“ (W/M) in der Seefracht?
**Antwort:** 1 t entspricht 1 cbm; berechnet wird nach dem höheren Wert aus Gewicht in Tonnen und Volumen in Kubikmetern (Frachttonne).
`tags: frachtberechnung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.3-28
**Frage:** Was ist ein Lademeter, und wie viele Lademeter belegt eine Europalette?
**Antwort:** Ein Meter Ladefläche in Längsrichtung über die volle Fahrzeugbreite (rund 2,4 m). Lademeter = Länge × Breite ÷ 2,4 m; eine Europalette (1,2 m × 0,8 m) belegt 0,4 ldm. Häufig genannter Beispielwert für die Umrechnung: 1 ldm = 1.850 kg.
`tags: lademeter, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.3-29
**Frage:** Was misst die Einheit TEU, und wie viele TEU sind ein 20-Fuß- und ein 40-Fuß-Container?
**Antwort:** TEU (Twenty-foot Equivalent Unit) zählt Containermengen in 20-Fuß-Einheiten: 20-Fuß-Container = 1 TEU, 40-Fuß-Container = 2 TEU bzw. 1 FEU (Forty-foot Equivalent Unit).
`tags: container` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-1.3-30
**Frage:** In welchen Schritten berechnest du die Frachtkosten einer Sendung nach Tarif?
**Antwort:** Frachtpflichtiges Gewicht ermitteln, Fracht = frachtpflichtiges Gewicht ÷ 100 × Frachtsatz je 100 kg, mit der Mindestfracht vergleichen (der höhere Betrag gilt), Zuschläge addieren; die Umsatzsteuer kommt erst auf den Nettobetrag.
`tags: frachtberechnung, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.3-31
**Frage:** Wie prüfst du, ob die Sammelguterlöse einer Tour ihre Selbstkosten decken?
**Antwort:** Die Erlöse aller Sendungen der Tour müssen zusammen mindestens die Selbstkosten erreichen. Mindestens nötiges frachtpflichtiges Gewicht = Selbstkosten ÷ Frachtsatz je 100 kg × 100 kg (vereinfacht, ohne Abholung, Umschlag und Zustellung).
`tags: frachtberechnung, zuschlagskalkulation, rechnen` · `schwierigkeit: schwer` · `bloom: analysieren`

## C. Quiz 1.3 (anhängen)

#### Q-1.3-23 · Sortieren
**Anweisung:** Bringe die Schritte der Frachtberechnung für eine Sammelgutsendung in die richtige Reihenfolge.
1. Maße, Anzahl und Rohgewicht der Packstücke erfassen
2. Volumengewicht mit dem Umrechnungsfaktor des Tarifs berechnen
3. Das höhere Gewicht als frachtpflichtiges Gewicht festlegen
4. Frachtsatz anwenden, Mindestfracht prüfen und Zuschläge addieren
**Erklärung:** Ohne Maße und Gewicht lässt sich kein Volumengewicht berechnen. Erst der Vergleich von Rohgewicht und Volumengewicht ergibt das frachtpflichtige Gewicht, und erst darauf wird der Frachtsatz angewendet.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.3-24 · Kurzantwort
**Frage:** Fracora übernimmt zwei Europaletten Sammelgut, je 1,2 m × 0,8 m × 1,0 m und 150 kg Rohgewicht. Der Tarif rechnet 1 cbm = 300 kg. Wie hoch ist das frachtpflichtige Gewicht der Sendung in Kilogramm?
**Akzeptierte Antworten:** 576; 576 kg; 576 Kilogramm; 576,0; 576,0 kg; 576,00; 576,00 kg
**Erklärung:** Volumen = 2 × 1,2 m × 0,8 m × 1,0 m = 1,92 cbm; Volumengewicht = 1,92 × 300 kg = 576 kg. Das Rohgewicht beträgt nur 2 × 150 kg = 300 kg, frachtpflichtig ist der höhere Wert: 576 kg.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-25 · Multiple Choice
**Frage:** Eine kleine Sendung hat ein frachtpflichtiges Gewicht von 40 kg. Der Tarif nennt 8,00 € je 100 kg und eine Mindestfracht von 35,00 €; Zuschläge bleiben hier außer Betracht. Welche Fracht stellt Fracora in Rechnung?
- [ ] 3,20 €, weil nur das tatsächliche Gewicht zählt
- [ ] 38,20 €, weil die Mindestfracht zur Fracht hinzukommt
- [x] 35,00 €, weil die Mindestfracht als Untergrenze gilt
- [ ] 8,00 €, weil je angefangene 100 kg ein voller Satz gilt
**Erklärung:** Nach Tarif ergäben sich 40 kg ÷ 100 × 8,00 € = 3,20 €. Die Mindestfracht ist eine Untergrenze, kein Zuschlag: Berechnet wird der höhere Betrag, also 35,00 €. Eine Rundung auf volle 100 kg müsste der Tarif ausdrücklich vorsehen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-26 · Kurzantwort
**Frage:** Ein Industrieunternehmen versendet acht nicht stapelbare Europaletten mit je 400 kg als Teilladung. Der Tarif rechnet nach Lademetern mit 1 ldm = 1.850 kg; eine Europalette belegt 0,4 ldm. Wie hoch ist das frachtpflichtige Gewicht in Kilogramm?
**Akzeptierte Antworten:** 5.920; 5920; 5.920 kg; 5920 kg; 5.920 Kilogramm; 5920 Kilogramm; 5.920,00; 5920,00; 5.920,00 kg; 5920,00 kg
**Erklärung:** 8 × 0,4 ldm = 3,2 ldm; Lademetergewicht = 3,2 × 1.850 kg = 5.920 kg. Das Rohgewicht beträgt 8 × 400 kg = 3.200 kg; frachtpflichtig ist der höhere Wert: 5.920 kg.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.3-27 · Zuordnung
**Anweisung:** Ordne jeder Abrechnungsart die passende Umrechnungsregel aus den Beispielwerten des Kurses zu.
- Sammelgut auf der Straße ↔ 1 cbm entspricht 300 kg
- Luftfracht ↔ Volumen in cm³ geteilt durch 6.000 ergibt kg
- Seefracht nach W/M ↔ 1 t entspricht 1 cbm, der höhere Wert zählt
- Teilladung nach Ladefläche ↔ 1 Lademeter entspricht 1.850 kg
**Erklärung:** Alle vier Regeln rechnen belegten Raum in ein Gewicht um. Die Faktoren sind Beispielwerte; in der Praxis gilt, was Vertrag oder Tarif festlegen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.3-28 · Kurzantwort
**Frage:** Über ihren Seefracht-Partner verschifft Fracora im Monat sechs 20-Fuß-Container und vier 40-Fuß-Container. Wie viele TEU sind das?
**Akzeptierte Antworten:** 14; 14 TEU; 14,0; 14,0 TEU
**Erklärung:** 6 × 1 TEU + 4 × 2 TEU = 6 + 8 = 14 TEU.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.3-29 · Kurzantwort
**Frage:** Eine Sendung hat ein frachtpflichtiges Gewicht von 2.350 kg, der Frachtsatz beträgt 6,40 € je 100 kg. Wie hoch ist die Fracht in Euro (ohne Zuschläge und Umsatzsteuer)?
**Akzeptierte Antworten:** 150,40; 150,4; 150.40; 150.4; 150,40 €; 150,4 €; 150.40 €; 150.4 €; 150,40 Euro; 150,4 Euro; 150.40 Euro; 150.4 Euro; 150,40 EUR; 150,4 EUR; 150.40 EUR; 150.4 EUR
**Erklärung:** 2.350 kg ÷ 100 = 23,5; 23,5 × 6,40 € = 150,40 €. Die Mindestfracht spielt bei diesem Betrag in der Regel keine Rolle.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.3-30 · Wahr/Falsch
**Aussage:** Bei einer leichten, aber sperrigen Sendung ist in der Regel das Volumengewicht frachtpflichtig, weil es über dem Rohgewicht liegt.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Sperrige Güter belegen viel Laderaum bei geringem Gewicht. Ihr Volumengewicht liegt deshalb meist über dem Rohgewicht, und frachtpflichtig ist immer der höhere Wert.
`schwierigkeit: leicht` · `bloom: verstehen`

---

# Teil 2: Thema 2.6

## D. Theorie-Ergänzung 2.6 (einfügen am Ende von „## Theorie“, hinter „Rechenbeispiel: Tonnenkilometer und Emissionen“)

### Prozesse gestalten: Ablaufdiagramm und Prozessverantwortliche

Die Prozessorientierung nach ISO 9001 verlangt, dass wesentliche Abläufe beschrieben, überprüft und verbessert werden. Ein **Prozess** ist eine Folge zusammenhängender Tätigkeiten, die einen Input, etwa einen Transportauftrag, in einen Output überführt, etwa eine abgelieferte Sendung mit Abliefernachweis. Er hat einen **Auslöser** (Start), ein **Ergebnis** (Ende) und einzelne **Prozessschritte**, die am besten mit Objekt und Verb benannt werden („Auftrag erfassen“, „Frachtbrief erstellen“).

Das **Ablaufdiagramm** (auch Flussdiagramm oder Ablaufplan) stellt diese Schritte grafisch dar und kommt mit wenigen Grundsymbolen aus:

- **Start und Ende:** Oval oder abgerundetes Rechteck
- **Tätigkeit:** Rechteck mit einem Prozessschritt
- **Entscheidung:** Raute mit einer Frage und beschrifteten Ausgängen, meist „ja“ und „nein“
- **Verbindungen:** Pfeile, die die Reihenfolge und Richtung des Ablaufs zeigen

Ein einfaches Ablaufdiagramm zeigt nicht, **wer** einen Schritt ausführt. Wird es in Bahnen je Abteilung oder Beteiligten gegliedert (Swimlane-Diagramm), wird jeder Wechsel der Bahn als Übergabe sichtbar, also als Schnittstelle. Ein Prozess, den mehrere Abteilungen nacheinander bearbeiten, braucht außerdem eine Person, die für ihn als Ganzes verantwortlich ist. **Prozessverantwortliche** (auch Prozess-Owner) tragen abteilungsübergreifend die Verantwortung für einen kompletten Ablauf: Sie halten die Prozessbeschreibung aktuell, verfolgen die Kennzahlen des Prozesses, klären Zuständigkeiten an den Schnittstellen und stoßen Verbesserungen an. Die Leitungen der beteiligten Abteilungen ersetzen sie nicht; die einzelnen Schritte führen weiterhin die jeweiligen Fachleute aus.

Verbessert wird ein Prozess in der Regel nach dem PDCA-Zyklus. **Plan:** Der **Ist-Prozess** wird dargestellt, **Schwachstellen** werden analysiert (Wartezeiten, Doppelarbeit, unnötige Schleifen, fehlende Informationen), und der **Soll-Prozess** wird festgelegt. **Do:** Der Soll-Prozess wird testweise eingeführt. **Check:** Seine Wirkung wird anhand von Kennzahlen geprüft. **Act:** Ein bewährter Ablauf wird als Standard festgeschrieben, sonst wird nachgebessert. Als fortlaufende Verbesserung in kleinen Schritten heißt dieses Vorgehen **kontinuierlicher Verbesserungsprozess (KVP)**. Hinweise auf Schwachstellen liefern unter anderem das Reklamationsmanagement und Qualitätskennzahlen wie Pünktlichkeits-, Schadens- und Reklamationsquote (siehe „Qualitätsmanagement im operativen Tagesgeschäft“).

### Schnittstellen und Beispielprozess Auftragsabwicklung

Eine **Schnittstelle** ist ein Übergabepunkt, an dem Ware, Information oder Verantwortung von einer Stelle an eine andere übergeht. Bei Fracora liegen interne Schnittstellen zwischen Kundenservice (Auftragsannahme), Disposition, Lager, Fahrpersonal und Abrechnung, externe Schnittstellen zur Kundschaft, zu Subunternehmen, zum Seefracht-Partner und zum empfangenden Unternehmen. Neben dem Warenfluss laufen über jede Schnittstelle **Informationsflüsse**: Auftragsdaten mit Maßen und Gewichten, Zeitfenster und Avis, Frachtbrief, Statusmeldungen und Abliefernachweis. Typische **Störungen** an Schnittstellen sind unvollständige Auftragsdaten (fehlen Maße oder Stapelbarkeit, stimmt das frachtpflichtige Gewicht nicht, siehe Thema 1.3), **Medienbrüche** durch erneutes Abtippen von Daten, Informationen, die das Fahrpersonal zu spät erreichen (siehe Thema 3.3), Wartezeiten bei der Übergabe und unklare Zuständigkeit bei Abweichungen, etwa wenn Ware bei der Übernahme beschädigt ist. Bewährt haben sich festgelegte Übergabeinformationen (zum Beispiel Pflichtfelder im TMS), digitale Schnittstellen zwischen TMS, Lagerverwaltungssystem und Kundenportal (siehe Thema 1.5), klare Zuständigkeiten und eine Rückmeldung an die übergebende Stelle.

Die Auftragsabwicklung lässt sich grob gliedern in Auftragsannahme, Disposition und Durchführung (vgl. die Quizfragen zu Thema 2.1). Das folgende Beispiel verfeinert diese Phasen als Ablaufdiagramm in Textform und ergänzt einen Abschluss mit Abliefernachweis und Abrechnung: Die Schritte 1 bis 3 gehören zur Auftragsannahme, 4 und 5 zur Disposition, 6 bis 10 zur Durchführung, 11 und 12 zu Abschluss und Abrechnung (frei gewähltes Beispiel; die ausführende Stelle steht in Klammern):

1. **Start:** Ein Transportauftrag geht ein (Kundenservice).
2. Auftrag im TMS erfassen und auf Vollständigkeit prüfen (Kundenservice).
3. **Entscheidung „Eigene Kapazität frei?“** (Kundenservice nach Abstimmung mit der Disposition): ja → weiter mit Schritt 4; nein → entweder Auftrag an ein geprüftes Subunternehmen vergeben, dann weiter mit Schritt 5 (die Beförderung übernimmt das Subunternehmen), oder der Kundschaft einen anderen Termin anbieten, dann zurück zu Schritt 3.
4. Tour planen sowie Fahrzeug und Fahrpersonal disponieren (Disposition).
5. Frachtbrief und Begleitpapiere vorbereiten und Fahrpersonal informieren (Disposition).
6. Ware übernehmen, Menge und Zustand prüfen (Fahrpersonal oder Lager). Übergibt das Fracora-Lager Ware an ein Subunternehmen, wird der Abholer anhand von Auftrag und Ausweis geprüft (siehe Thema 2.9).
7. **Entscheidung „Ware einwandfrei?“:** ja → weiter mit Schritt 8; nein → Schaden mit Foto und Vermerk im Frachtbrief dokumentieren, die Kundschaft informieren und ihre Weisung einholen, danach weiter mit Schritt 8 oder Ende „Auftrag storniert“.
8. Beladen und Ladung sichern (Lager und Fahrpersonal).
9. Transport durchführen und Status melden (Fahrpersonal, Telematik).
10. Abliefern und Abliefernachweis einholen (Fahrpersonal).
11. Abliefernachweis prüfen und Rechnung erstellen (Abrechnung).
12. **Ende:** Auftrag abgeschlossen.

Jeder Wechsel der ausführenden Stelle, etwa vom Kundenservice zur Disposition oder vom Fahrpersonal zur Abrechnung, ist eine Schnittstelle. Als Prozessverantwortliche für die gesamte Auftragsabwicklung kann Fracora zum Beispiel die Leitung der Dispositionszentrale benennen. Sie verfolgt Kennzahlen wie Pünktlichkeits- und Reklamationsquote und die Zeit vom Auftragseingang bis zur Rechnung. Häufen sich etwa Reklamationen, weil vereinbarte Zeitfenster beim Fahrpersonal nicht ankommen, prüft sie die Schnittstellen zwischen Auftragserfassung, Disposition und Fahrpersonal und lässt das Zeitfenster als Pflichtfeld im TMS einrichten; im nächsten PDCA-Durchlauf zeigt die Pünktlichkeitsquote, ob die Maßnahme wirkt.

## E. Karteikarten 2.6 (anhängen)

#### K-2.6-18
**Frage:** Welche vier Grundsymbole hat ein Ablaufdiagramm, und wofür stehen sie?
**Antwort:** Oval oder abgerundetes Rechteck für Start und Ende, Rechteck für eine Tätigkeit, Raute für eine Entscheidung mit beschrifteten Ausgängen (z. B. ja/nein), Pfeile für Verbindungen und Reihenfolge.
`tags: prozessgestaltung, ablaufdiagramm` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-2.6-19
**Frage:** Was ist eine Schnittstelle in einem Prozess?
**Antwort:** Ein Übergabepunkt, an dem Ware, Information oder Verantwortung von einer Stelle an eine andere übergeht, intern (z. B. Kundenservice an Disposition) oder extern (z. B. an ein Subunternehmen oder das empfangende Unternehmen).
`tags: prozessgestaltung, schnittstelle` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-2.6-20
**Frage:** Nenne drei typische Störungen an Schnittstellen und eine bewährte Gegenmaßnahme.
**Antwort:** Z. B. unvollständige Auftragsdaten, Medienbrüche durch erneutes Abtippen, zu spät weitergegebene Informationen, Wartezeiten, unklare Zuständigkeit bei Abweichungen. Gegenmaßnahmen: festgelegte Übergabeinformationen (Pflichtfelder), digitale Schnittstellen, klare Zuständigkeiten, Rückmeldung an die übergebende Stelle.
`tags: prozessgestaltung, schnittstelle` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.6-21
**Frage:** Welche Aufgaben haben Prozessverantwortliche (Prozess-Owner)?
**Antwort:** Sie tragen abteilungsübergreifend die Verantwortung für einen kompletten Ablauf: Prozessbeschreibung aktuell halten, Kennzahlen verfolgen, Zuständigkeiten an Schnittstellen klären und Verbesserungen anstoßen. Abteilungsleitungen ersetzen sie nicht.
`tags: prozessgestaltung, prozessverantwortung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.6-22
**Frage:** Wie verbesserst du einen Prozess nach dem PDCA-Zyklus, und was ist der KVP?
**Antwort:** Plan: Ist-Prozess darstellen, Schwachstellen analysieren, Soll-Prozess festlegen. Do: Soll-Prozess testweise einführen. Check: Wirkung mit Kennzahlen prüfen. Act: bewährten Ablauf als Standard festschreiben oder nachbessern. Fortlaufend in kleinen Schritten wiederholt, ist das der kontinuierliche Verbesserungsprozess (KVP).
`tags: prozessgestaltung, pdca` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.6-23
**Frage:** Was zeigt ein Swimlane-Diagramm zusätzlich zu einem einfachen Ablaufdiagramm?
**Antwort:** Wer einen Schritt ausführt: Jede Abteilung oder jeder Beteiligte erhält eine Bahn. Jeder Wechsel der Bahn ist eine Übergabe und macht damit Schnittstellen sichtbar.
`tags: prozessgestaltung, ablaufdiagramm` · `schwierigkeit: mittel` · `bloom: verstehen`

## F. Quiz 2.6 (anhängen)

#### Q-2.6-18 · Sortieren
**Anweisung:** Bringe die Schritte einer Prozessverbesserung in die richtige Reihenfolge.
1. Ist-Prozess darstellen und Schwachstellen analysieren
2. Soll-Prozess festlegen und testweise einführen
3. Wirkung anhand von Kennzahlen überprüfen
4. Bewährten Ablauf als Standard festschreiben oder nachbessern
**Erklärung:** Die Schritte folgen dem PDCA-Zyklus: Plan (Ist darstellen, Schwachstellen analysieren, Soll festlegen), Do (testweise einführen), Check (Wirkung prüfen), Act (standardisieren oder nachbessern). Danach beginnt der Kreislauf von vorn.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.6-19 · Zuordnung
**Anweisung:** Ordne die Symbole eines Ablaufdiagramms ihrer Bedeutung zu.
- Oval ↔ Start oder Ende des Prozesses
- Rechteck ↔ Tätigkeit, also ein Prozessschritt
- Raute ↔ Entscheidung mit beschrifteten Ausgängen
- Pfeil ↔ Verbindung und Reihenfolge der Schritte
**Erklärung:** Mit diesen vier Grundsymbolen lässt sich jeder betriebliche Ablauf übersichtlich darstellen; eine Frage wie „Eigene Kapazität frei?“ steht in einer Raute mit den Ausgängen „ja“ und „nein“.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-2.6-20 · Multiple Choice
**Frage:** Bei Fracora häufen sich Reklamationen: Die Kundschaft nennt bei der Bestellung ein Anlieferzeitfenster, doch das Fahrpersonal erfährt davon oft nichts. Welche Maßnahme behebt die Ursache am ehesten dauerhaft?
- [ ] Das Fahrpersonal wird angewiesen, vor jeder Zustellung beim Kundenservice nachzufragen.
- [ ] Die Geschäftsführung kontrolliert künftig jeden Auftrag vor der Disposition selbst.
- [ ] Die Kundschaft wird gebeten, bei der Bestellung möglichst auf Zeitfenster zu verzichten.
- [x] Das Zeitfenster wird Pflichtfeld im TMS; die Pünktlichkeitsquote zeigt die Wirkung.
**Erklärung:** Die Information geht an einer Schnittstelle zwischen Auftragserfassung und Fahrpersonal verloren. Eine festgelegte Übergabeinformation behebt die Ursache, und die Kennzahl zeigt, ob die Maßnahme wirkt. Rückfragen und Einzelkontrollen erzeugen nur zusätzliche Schnittstellen und Wartezeiten; der Verzicht auf Zeitfenster geht zulasten der Kundschaft.
`schwierigkeit: mittel` · `bloom: bewerten`

#### Q-2.6-21 · Sortieren
**Anweisung:** Bringe die Schritte der Auftragsabwicklung bei Fracora von der Warenübernahme bis zur Rechnung in die richtige Reihenfolge.
1. Ware übernehmen und Menge und Zustand prüfen
2. Transport durchführen und Status melden
3. Abliefern und Abliefernachweis einholen
4. Abliefernachweis prüfen und Rechnung erstellen
**Erklärung:** Geprüft wird bei der Übernahme, damit Schäden nicht erst beim empfangenden Unternehmen auffallen. Abgerechnet wird erst, wenn der Abliefernachweis vorliegt; er belegt, dass die Leistung erbracht ist.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.6-22 · Wahr/Falsch
**Aussage:** Prozessverantwortliche ersetzen die Leitungen der Abteilungen, die an ihrem Prozess beteiligt sind.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Prozessverantwortliche sind abteilungsübergreifend für einen kompletten Ablauf verantwortlich, vor allem für Schnittstellen, Kennzahlen und Verbesserungen. Die Abteilungsstruktur und ihre Leitungen bleiben bestehen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-2.6-23 · Was passt nicht dazu
**Frage:** Was gehört nicht zu den Aufgaben der Prozessverantwortlichen für die Auftragsabwicklung?
- [ ] Die Prozessbeschreibung aktuell halten
- [x] Jede einzelne Tour selbst disponieren
- [ ] Die Kennzahlen des Prozesses verfolgen
- [ ] Zuständigkeiten an Schnittstellen klären
**Erklärung:** Die einzelnen Schritte, etwa das Disponieren der Touren, führen weiterhin die zuständigen Fachleute aus. Prozessverantwortliche steuern den Ablauf als Ganzes.
`schwierigkeit: leicht` · `bloom: analysieren`
