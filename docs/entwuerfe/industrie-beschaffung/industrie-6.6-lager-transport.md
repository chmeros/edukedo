---
kurs_slug: industriefachwirt
fachgebiet_code: HQ2
fachgebiet_title: "Produktionsprozesse"
thema_code: "6.6"
thema_title: "Lager- und Transportwesen"
quelle: "Eigene Zusammenstellung anhand der frei einsehbaren Verordnung über die Prüfung zum anerkannten Abschluss Geprüfter Industriefachwirt/Geprüfte Industriefachwirtin (IndFachwirtPrV 2010), § 5, Handlungsbereich „Produktionsprozesse" — frei formuliert, keine 1:1-Übernahme aus Rahmenplan, Lehrbüchern oder Prüfungsunterlagen (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"
qualifikationsinhalte:
  - "Lagerarten, Lagerorganisation und Kommissionierung vergleichen sowie Lagerkosten und Lagerkennzahlen berechnen und beurteilen"
  - "Innerbetriebliche Fördermittel und außerbetriebliche Verkehrsträger nach Kosten, Zeit, Flexibilität und Umwelt vergleichen und auswählen"
  - "Logistikdienstleister einordnen und über Eigen- oder Fremdleistung in Lager und Transport mit Kostenvergleich und qualitativen Kriterien entscheiden"
---

# Thema 6.6 — Lager- und Transportwesen

## Theorie

### Lagerarten und Lagerorganisation

Lager gleichen aus, dass Material zu anderen Zeitpunkten und in anderen Mengen ankommt, als es verbraucht oder verkauft wird, und sichern die Versorgung gegen Schwankungen ab (zu Sicherheitsbestand, Meldebestand und Höchstbestand siehe Thema 6.4). Nach der **Stellung im Materialfluss** unterscheidet die Solvitec Elektrowerke GmbH drei Lagerstufen: Das **Rohstoff- bzw. Materiallager** nimmt angelieferte Materialien wie Blech, Kupferdraht, Leiterplatten und elektronische Bauteile auf. Das **Zwischenlager für Halbfertigerzeugnisse** puffert zwischen zwei Fertigungsstufen, etwa bestückte Leiterplatten vor der Endmontage. Das **Fertigwarenlager** (Versandlager) hält Frequenzumrichter, Sensorik und Schaltschränke für die Auslieferung bereit.

Nach der **räumlichen Anordnung** wird zwischen Zentrallager und dezentralen Lagern unterschieden. Ein **Zentrallager** versorgt mehrere Werke oder Absatzgebiete von einem Ort aus: Sicherheitsbestände müssen nur einmal gehalten werden, Fläche und Lagertechnik sind besser ausgelastet, und die Steuerung ist einfacher; die Anlieferung wird gebündelt, länger werden dafür vor allem die Auslieferungswege, und die Transportkosten zur Kundschaft steigen. **Dezentrale Lager** liegen nahe am Werk oder an der Kundschaft und ermöglichen kurze Wege und Lieferzeiten, binden aber mehr Kapital, weil Bestände mehrfach vorgehalten werden. Bei Solvitec hat jedes Werk (Werk Nord mit dem Kunststoffspritzguss, Werk Süd mit der SMD-Fertigung, Werk Ost mit der Schaltschrankmontage) ein eigenes Materiallager, während die Ersatzteile zentral im Werk Süd lagern (Beispiel).

Nach der **Bauart** gibt es vor allem drei Formen. Das **Blocklager** stapelt Ladeeinheiten ohne Regal neben- und übereinander: Es braucht kaum Investitionen und nutzt die Fläche gut, erlaubt aber keinen direkten Zugriff auf jede Ladeeinheit und eignet sich deshalb für wenige Artikel in großen Mengen. Im **Regallager** (Fachbodenregale für Kleinteile, Palettenregale mit Gängen) ist jeder Platz direkt erreichbar; die Gänge kosten dafür Fläche. Das **Hochregallager** nutzt große Bauhöhen und wird meist automatisch mit Regalbediengeräten bedient: viel Lagerplatz auf wenig Grundfläche und hohe Umschlagsleistung, aber hohe Investition und wenig Spielraum für spätere Änderungen. Elektronische Bauteile lagert Solvitec zusätzlich in Bereichen mit Schutz vor elektrostatischer Entladung (ESD-Schutz), feuchteempfindliche Bauteile trocken.

Bei der **Lagerorganisation** steht das **Festplatzsystem** (feste Lagerordnung) der **chaotischen Lagerhaltung** (freie Lagerplatzvergabe) gegenüber. Im Festplatzsystem hat jeder Artikel einen dauerhaft zugewiesenen Platz: Das ist übersichtlich und funktioniert auch ohne IT, doch der Platz bleibt reserviert, wenn der Artikel gerade nicht vorrätig ist, und die Fläche richtet sich nach dem Höchstbestand. Bei der chaotischen Lagerhaltung wird jeder freie Platz belegt, und das **Lagerverwaltungssystem (LVS)** merkt sich, wo was liegt: Die Fläche wird besser genutzt, ohne zuverlässiges LVS und eindeutige Kennzeichnung (Barcode) ist aber nichts mehr auffindbar. Häufig wird beides kombiniert, etwa feste Plätze im Kommissionierbereich und freie Platzvergabe im Reservelager. Die **Lagerplatzvergabe** richtet sich nach der Zugriffshäufigkeit (häufig benötigte Artikel nahe am Kommissionier- oder Versandplatz; diese Einteilung nach Zugriffen ist nicht dasselbe wie die wertbezogene ABC-Analyse aus Thema 6.4), nach Gewicht und Größe (schwere Teile unten), nach Lagerbedingungen (ESD-Schutz, Trockenheit) und nach Zusammengehörigkeit von Teilen.

Für die **Reihenfolge der Entnahme** gelten drei Prinzipien. **Fifo** (First In – First Out) entnimmt zuerst, was zuerst eingelagert wurde; das verhindert Überalterung und erleichtert die Chargenverfolgung. **Lifo** (Last In – First Out) entnimmt zuerst das zuletzt Eingelagerte; es ergibt sich im Blocklager oft zwangsläufig und ist nur bei Material vertretbar, das nicht altert, etwa gestapelten Stahlblechtafeln. **Fefo** (First Expired – First Out) entnimmt zuerst, was am frühesten verfällt, auch wenn es später angeliefert wurde; Solvitec wendet das auf Lotpaste und Klebstoffe in der Elektronikfertigung an. Gemeint ist hier die tatsächliche Entnahme im Lager; die gleichnamigen Verbrauchsfolgeverfahren zur Bewertung der Vorräte im Jahresabschluss sind etwas anderes und werden hier nicht behandelt.

### Lagerkosten und Lagerkennzahlen

Ein Lager verursacht **Lagerhaltungskosten**: Kosten des Lagerraums (Abschreibung oder Miete, Energie, Instandhaltung), der Einrichtung (Regale, Fördermittel, Lagerverwaltungssystem), des Lagerpersonals, der Versicherung, für Schwund, Veralterung und Beschädigung sowie die **Zinsen auf das im Bestand gebundene Kapital**. Viele dieser Kosten sind kurzfristig fix (Gebäude, Regale), während Zinsen, Schwund und Veralterung mit der Bestandshöhe steigen. Die **Kapitalbindung** ist der Wert des durchschnittlichen Lagerbestands; Materiallager werden dabei zu Einstandspreisen, Fertigwarenlager zu Herstellkosten bewertet. Die **Kapitalbindungskosten** (Lagerzinsen) sind durchschnittlicher Lagerbestand × kalkulatorischer Zinssatz (kalkulatorische Kosten, siehe Thema 2.2).

Zwei Prozentsätze verdichten die Kosten:

- **Lagerkostensatz** = Lagerhaltungskosten einschließlich der Zinsen auf das gebundene Kapital ÷ durchschnittlicher Lagerbestand (durchschnittlicher Lagerwert) × 100. Er gibt an, wie viel Prozent des gelagerten Werts das Lager im Jahr kostet, und ist der Satz, der in der Andler-Formel für die optimale Losgröße (Thema 6.1) und bei der optimalen Bestellmenge (Thema 6.5) eingesetzt wird. Streng genommen zählen dort nur die Kosten, die mit der Bestandshöhe steigen (vor allem Zinsen, Schwund, Veralterung, Versicherung der Ware). Welche Kostenarten einbezogen werden, legt das Unternehmen fest; in Aufgaben werden der Satz oder seine Zusammensetzung angegeben. Manche Lehrbücher nennen nur den Anteil ohne Zinsen „Lagerkostensatz“ und die Summe mit dem Zinssatz „Lagerhaltungskostensatz“; in diesem Kurs enthält der Lagerkostensatz die Zinsen, wie in der Andler-Formel.
- **Lagerzinssatz** = Jahreszinssatz × durchschnittliche Lagerdauer ÷ 360. Er gibt an, wie viel Prozent ihres Werts eine gelagerte Einheit während ihrer durchschnittlichen Lagerzeit an Zinsen kostet.

Umschlagshäufigkeit und durchschnittliche Lagerdauer werden wie in Thema 6.4 berechnet; im Fertigwarenlager steht an der Stelle des Materialverbrauchs der Abgang des Jahres.

**Rechenbeispiel (Beispielwerte):** Das Fertigwarenlager für Frequenzumrichter im Werk Süd hat einen durchschnittlichen Bestand von 500.000 € (zu Herstellkosten) und einen Abgang von 4.500.000 € im Jahr. Für Raum, Einrichtung, Personal, Versicherung und Schwund fallen 54.000 € an, der kalkulatorische Zinssatz beträgt 7,2 %; das Rechenjahr hat 360 Tage.

- Umschlagshäufigkeit = 4.500.000 € ÷ 500.000 € = 9; durchschnittliche Lagerdauer = 360 ÷ 9 = 40 Tage.
- Kapitalbindungskosten = 500.000 € × 7,2 % = 36.000 €.
- Lagerhaltungskosten = 54.000 € + 36.000 € = 90.000 €; Lagerkostensatz = 90.000 € ÷ 500.000 € × 100 = 18 %.
- Lagerzinssatz = 7,2 % × 40 ÷ 360 = 0,8 %. Ein Umrichter mit 1.000 € Herstellkosten verursacht in seinen durchschnittlich 40 Lagertagen also 8 € Zinsen; über den ganzen Abgang sind es 0,8 % × 4.500.000 € = 36.000 €, genau die Kapitalbindungskosten.

Gelingt es Solvitec, die Umschlagshäufigkeit durch kleinere Fertigungsaufträge und eine engere Abstimmung mit dem Vertrieb auf 12 zu erhöhen, sinkt der durchschnittliche Bestand bei gleichem Abgang auf 4.500.000 € ÷ 12 = 375.000 € und die Lagerdauer auf 30 Tage. Es werden 125.000 € Kapital frei, die Zinsen sinken um 125.000 € × 7,2 % = 9.000 € im Jahr. Die Grenze setzt die Lieferbereitschaft: Ein zu knapper Bestand führt zu Fehlmengen und verspäteten Lieferungen.

### Kommissionierung

**Kommissionierung** ist das Zusammenstellen von Teilmengen aus einem Lagersortiment nach Aufträgen. Bei Solvitec sind das Kundenaufträge (Ersatzteile, Fertigwaren) und innerbetriebliche Aufträge, etwa Montagekits mit allen Teilen für einen Schaltschrankauftrag. Nach der **Bewegung** wird unterschieden:

- **Person-zur-Ware** (statische Bereitstellung, in der Literatur oft „Mann-zur-Ware“): Die Kommissionierer:innen gehen oder fahren zu den Lagerplätzen. Das braucht wenig Investition und ist flexibel, der Anteil der Wegezeit ist aber hoch.
- **Ware-zur-Person** (dynamische Bereitstellung, oft „Ware-zum-Mann“): Fördertechnik, Shuttle oder Regalbediengerät bringen die Behälter an einen festen Arbeitsplatz. Wege entfallen, Leistung und Ergonomie steigen, dafür sind Investition und Planungsaufwand hoch.

Nach der **Organisation** wird **einstufig** (auftragsweise: ein Auftrag wird in einem Durchgang vollständig zusammengestellt) oder **mehrstufig** kommissioniert: Zuerst werden die Artikel für mehrere Aufträge gemeinsam entnommen, danach in einer zweiten Stufe auf die einzelnen Aufträge verteilt. Das spart Wege, wenn viele Aufträge dieselben Artikel enthalten, braucht aber einen Verteilplatz und das Zusammenführen der Aufträge. Neben der Papier-Pickliste gibt es beleglose Verfahren: **Pick-by-Scan** (jede Entnahme wird mit dem Handscanner bestätigt), **Pick-by-Light** (Lichtanzeigen am Fach zeigen Platz und Menge) und **Pick-by-Voice** (Anweisungen und Bestätigungen per Sprache über ein Headset).

Wichtige Kennzahlen sind die **Kommissionierleistung** = kommissionierte Positionen ÷ Kommissionierstunden (eine **Position** ist eine Auftragszeile, also ein Artikel in einer bestimmten Menge; jede Entnahme einer Position heißt auch **Pick**, die Leistung deshalb auch „Picks je Stunde“), die **Fehlerquote** = fehlerhafte Positionen ÷ alle Positionen × 100 (falscher Artikel, falsche Menge, fehlende Position) und die **Kosten je Position** = Personalkosten ÷ Positionen. Kommissionierfehler sind in der Industrie besonders teuer, weil ein fehlendes Teil im Montagekit die Montage aufhält.

**Rechenbeispiel (Beispielwerte):** Im Bereitstellungslager der Schaltschrankmontage im Werk Ost stellt eine Lageristin in einer Schicht von 7,5 Stunden 54 Montagekits mit je 5 Positionen zusammen: 270 Positionen ÷ 7,5 h = 36 Positionen je Stunde. Im Monat werden 14.400 Positionen kommissioniert, 72 davon fehlerhaft: Fehlerquote = 72 ÷ 14.400 × 100 = 0,5 %. In einem Test mit Pick-by-Scan steigt die Leistung auf 45 Positionen je Stunde, und nur noch 18 Positionen sind fehlerhaft (0,125 %). Die Kommissionierstunden sinken von 14.400 ÷ 36 = 400 auf 14.400 ÷ 45 = 320; bei 40 € je Stunde sind das 3.200 € weniger im Monat. Jede fehlerhafte Position kostet durchschnittlich 60 €, die 54 vermiedenen Fehler sparen also 3.240 €. Den zusammen 6.440 € im Monat stehen Investition und laufende Kosten des Systems gegenüber, die mit einer Investitionsrechnung (zum Beispiel der Amortisationsrechnung, Thema 2.3) beurteilt werden.

### Innerbetrieblicher Transport und Fördermittel

Der **innerbetriebliche Transport** verbindet Wareneingang, Lager, Fertigungsstationen und Versand. Die eingesetzten Fördermittel lassen sich in zwei Gruppen teilen:

- **Stetigförderer** bewegen das Fördergut kontinuierlich auf einem fest vorgegebenen Weg, etwa Bandförderer, Rollenbahnen, Kettenförderer oder Hängeförderer; bei Solvitec verbindet eine Behälterförderanlage das Kleinteilelager mit der Elektronikfertigung. Sie leisten viel bei gleichmäßigem Materialfluss, lassen sich gut automatisieren und brauchen wenig Personal, sind aber fest eingebaut, belegen Fläche dauerhaft und passen sich Änderungen im Layout schlecht an.
- **Unstetigförderer** bewegen einzelne Ladungen in Arbeitsspielen auf wechselnden Wegen, mit Leerfahrten dazwischen: Krane, Regalbediengeräte und vor allem die **Flurförderzeuge**, also bodengebundene Fahrzeuge wie Handhubwagen, Gabelstapler, Schlepper mit Anhängern (Routenzug) und fahrerlose Transportfahrzeuge. Sie sind flexibel einsetzbar, brauchen aber meist Fahrpersonal und haben Leerfahrten.

**Fahrerlose Transportsysteme (FTS)** bestehen aus automatisch geführten Fahrzeugen und einer Leitsteuerung, die die Aufträge verteilt; die Fahrzeuge orientieren sich zum Beispiel per Laser an der Umgebung oder an Markierungen im Boden. Sie eignen sich für wiederkehrende Strecken mit vielen gleichartigen Transporten, auch im Mehrschichtbetrieb, setzen aber eine hohe Investition, ausreichend breite und ebene Wege und eine Anbindung an LVS und Produktionsplanung voraus. Bei der Auswahl eines Fördermittels zählen das Fördergut (Abmessungen, Gewicht, Empfindlichkeit), Menge und Häufigkeit der Transporte, Wege und Layout, der Bedarf an Flexibilität, die Kosten, der angestrebte Automatisierungsgrad (Thema 6.2) und die Sicherheit; Vorgaben des Arbeitsschutzes für Flurförderzeuge gelten, werden hier aber nicht behandelt (nicht förmlich rechtsgeprüft).

**Rechenbeispiel (Beispielwerte):** Im Werk Ost sollen FTS das Bereitstellungslager mit der Montage verbinden. Nötig sind 30 Transporte je Stunde. Ein **Transportspiel** (Aufnehmen, Hinfahrt, Abgeben, Rückfahrt) dauert 6 Minuten, ein Fahrzeug schafft also 60 ÷ 6 = 10 Transporte je Stunde. Rechnerisch reichen 30 ÷ 10 = 3 Fahrzeuge, wenn sie ununterbrochen fahren. Weil die Fahrzeuge wegen Laden und Wartung nur 80 % der Zeit verfügbar sind (zur Verfügbarkeit vergleiche die OEE in Thema 6.1), braucht das Werk 30 ÷ (10 × 0,8) = 3,75, aufgerundet 4 Fahrzeuge.

### Verkehrsträger im Vergleich

Für den außerbetrieblichen Transport (Anlieferung von Material, Werksverkehr zwischen den Werken Nord, Süd und Ost, Auslieferung an Kundschaft in aller Welt, Thema 6.4) stehen vier **Verkehrsträger** zur Verfügung: **Straße**, **Schiene**, **Wasser** (Binnenschifffahrt und Seeschifffahrt) und **Luft** (daneben Rohrleitungen für Flüssigkeiten und Gase, für Solvitec ohne Bedeutung). Sie unterscheiden sich wie folgt (allgemeine Tendenzen, im Einzelfall abweichend):

| Verkehrsträger | Kosten je Tonnenkilometer | Geschwindigkeit | Flexibilität und Netz | Umweltbelastung je Tonnenkilometer | typischer Einsatz bei Solvitec |
|---|---|---|---|---|---|
| Straße (Lkw) | mittel bis hoch | hoch auf kurzen und mittleren Strecken | sehr hoch, Haus-zu-Haus ohne Umschlag | hoch | Werksverkehr, Inland und Europa, Vor- und Nachlauf |
| Schiene | niedrig bei großen Mengen | mittel (Fahrpläne, Umschlag) | gering, Gleisanschluss oder Lkw-Vor- und Nachlauf nötig | niedrig | Container zum Seehafen, schwere Rohstoffe |
| Binnenschiff | sehr niedrig | gering | sehr gering, an Wasserstraßen gebunden | niedrig | Massengut und Container auf großen Flüssen |
| Seeschiff | am niedrigsten auf langen Strecken | gering (Wochen) | gering, an Häfen und Fahrpläne gebunden | niedrig | Export nach Übersee im Container |
| Luft (Flugzeug) | sehr hoch | sehr hoch auf langen Strecken | mittel, an Flughäfen gebunden | sehr hoch | eilige, leichte, hochwertige Sendungen wie Ersatzteile |

Der **kombinierte Verkehr** verbindet mehrere Verkehrsträger in einer Transportkette, ohne dass das Gut selbst umgeladen wird: Umgeschlagen wird nur die **Ladeeinheit** (Container, Wechselbrücke, Sattelauflieger). Der lange **Hauptlauf** läuft über Schiene, Binnenschiff oder See, der kurze **Vorlauf** und **Nachlauf** per Lkw. Wird dagegen das Gut selbst umgeladen, spricht man von **gebrochenem Verkehr**, mit mehr Aufwand und höherem Beschädigungsrisiko. Kombinierter Verkehr verbindet niedrige Kosten und Umweltbelastung im Hauptlauf mit der Flexibilität des Lkw, lohnt sich aber meist erst ab größeren Entfernungen und braucht Zeitpuffer für den Umschlag.

Die **Auswahl** hängt von Art, Wert und Empfindlichkeit des Guts, von Menge und Gewicht, Entfernung, verfügbarer Zeit, Kosten, Zuverlässigkeit, Umweltzielen der Kundschaft und der Infrastruktur (etwa einem Gleisanschluss) ab. Kosten lassen sich je Sendung oder je **Tonnenkilometer** (Gewicht in t × Entfernung in km) vergleichen; für Kriterien, die sich nicht in Euro ausdrücken lassen, eignet sich eine **Nutzwertanalyse** (gewichtete Punktbewertung, wie bei der Lieferantenbewertung in Thema 6.5). Wer den Hauptlauf beauftragt und bezahlt und wo die Gefahr übergeht, regeln im Auslandsgeschäft die Incoterms (Thema 7.4); Fracht- und Haftungsrecht werden hier nicht behandelt.

**Rechenbeispiel (Beispielwerte):** Solvitec schickt im Jahr 50 Exportcontainer mit Schaltschränken und Frequenzumrichtern, je rund 10 t Ladung, vom Werk Ost zum Seehafen, vereinfacht 800 km. Direkt per Lkw kostet ein Container 1.280 € bei einem Tag Laufzeit. Im kombinierten Verkehr fallen 240 € für den Lkw-Vorlauf zum Bahnterminal, 600 € für den Hauptlauf auf der Schiene und 2 × 60 € = 120 € für das Umsetzen des Containers im Bahnterminal und vom Zug ins Hafenterminal an, zusammen 960 € bei zwei Tagen Laufzeit; die Gebühren für das Verladen aufs Seeschiff fallen bei beiden Varianten gleich an und bleiben außen vor. Je Container sind das 10 t × 800 km = 8.000 Tonnenkilometer; der Lkw kostet 1.280 € ÷ 8.000 = 0,16 € je Tonnenkilometer, der kombinierte Verkehr 960 € ÷ 8.000 = 0,12 €. Der kombinierte Verkehr spart 320 € je Container (25 %), im Jahr 16.000 €. Die Nutzwertanalyse bezieht die übrigen Kriterien ein (Punkte von 1 bis 10):

| Kriterium | Gewicht | Lkw: Punkte | Lkw: gewichtet | kombinierter Verkehr: Punkte | kombinierter Verkehr: gewichtet |
|---|---|---|---|---|---|
| Transportkosten | 40 % | 5 | 2,00 | 8 | 3,20 |
| Laufzeit | 25 % | 9 | 2,25 | 5 | 1,25 |
| Zuverlässigkeit | 20 % | 7 | 1,40 | 7 | 1,40 |
| Umwelt | 15 % | 3 | 0,45 | 9 | 1,35 |
| **Nutzwert** | 100 % | | **6,10** | | **7,20** |

Der kombinierte Verkehr erreicht den höheren Nutzwert. Er passt, wenn die Container rechtzeitig vor der Abfahrt des Schiffs im Hafen sein müssen und der zusätzliche Tag eingeplant ist; eilige Container fahren weiterhin per Lkw. Gewichte und Punkte sind Einschätzungen; wer sie ändert, sollte prüfen, ob sich die Rangfolge umkehrt.

### Spedition, Frachtführer, Lagerei und Logistikdienstleister

Ein Industriebetrieb kann Lager- und Transportleistungen selbst erbringen oder einkaufen. Die wichtigsten Beteiligten:

- Der **Frachtführer** führt die Beförderung mit eigenen Fahrzeugen durch.
- Der **Spediteur** organisiert die Versendung: Er wählt Verkehrsträger und Frachtführer aus, bündelt Sendungen mehrerer Versender (Sammelgut), erstellt die Begleitpapiere und übernimmt auf Wunsch die Zollabwicklung. Er kann die Beförderung auch selbst durchführen.
- Der **Lagerhalter** (Lagerei) lagert und verwahrt Güter für andere.
- **Logistikdienstleister** bieten mehrere dieser Leistungen aus einer Hand an. In der **Kontraktlogistik** übernimmt ein Dienstleister auf Grundlage eines langfristigen Vertrags ein auf den Auftraggeber zugeschnittenes Leistungspaket, etwa Lagerung, Kommissionierung, Verpackung und Versand, oft ergänzt um Mehrwertleistungen wie Vormontage, Prüfung oder Etikettierung. Leistung und Qualität werden mit Kennzahlen vereinbart, zum Beispiel Fehlerquote, Lieferbereitschaft und Bearbeitungszeit. Für kleine Sendungen gibt es **KEP-Dienste** (Kurier, Express, Paket).

Rechte und Pflichten der Beteiligten, insbesondere Fracht-, Speditions- und Lagerrecht und die Haftung bei Verlust oder Beschädigung, richten sich nach gesetzlichen Vorgaben und den Verträgen; sie werden hier nicht behandelt (nicht förmlich rechtsgeprüft).

Ob Solvitec Lager und Transport selbst betreibt oder vergibt, ist eine **Make-or-Buy-Entscheidung der Logistik** (Vorgehen wie in Thema 6.5, strategische Seite als Fertigungstiefe in Thema 6.8). Quantitativ werden die Kosten verglichen: Der Eigenbetrieb hat hohe Fixkosten und niedrige variable Kosten, der Dienstleister berechnet meist nur einen Preis je Leistungseinheit. Daraus ergibt sich eine **kritische Menge**, oberhalb derer der Eigenbetrieb günstiger ist. Qualitativ zählen: Gehört die Leistung zur Kernkompetenz oder ist sie ein Wettbewerbsfaktor (etwa schneller Ersatzteilservice)? Wie viel Kontrolle über Qualität, Termine und Kundenkontakt braucht Solvitec? Wie stark schwankt die Menge (der Dienstleister wandelt Fixkosten in variable Kosten)? Wie groß werden Abhängigkeit und Wechselkosten? Wird Kapital in Fahrzeugen und Lagertechnik frei, und was geschieht mit dem eigenen Personal? Zu beachten ist: Lagert ein Dienstleister die eigenen Bestände ein, bleiben sie Eigentum von Solvitec; die Kapitalbindung in der Ware bleibt, nur die Kosten für Raum, Technik und Personal verlagern sich.

**Rechenbeispiel Eigen- oder Fremdtransport (Beispielwerte):** Für den Werksverkehr zwischen Werk Süd und Werk Ost setzt Solvitec einen eigenen Lkw ein. Er verursacht im Jahr 96.000 € Fixkosten (Abschreibung, Versicherung, Kfz-Steuer und das fest angestellte Fahrpersonal) und 0,60 € variable Kosten je km (Kraftstoff, Maut, Reifen, Wartung). Eine Spedition bietet die Pendeltouren für 1,40 € je km an. Hier gelten die Kosten des fest angestellten Fahrpersonals als fix; in der Kostenrechnung eines Transportunternehmens werden sie oft nach Einsatzstunden verrechnet.

- Kosten Eigentransport = Fixkosten + variable Kosten je km × Fahrleistung; Kosten Fremdtransport = Frachtsatz je km × Fahrleistung.
- **Kritische Fahrleistung** = Fixkosten ÷ (Frachtsatz je km − variable Kosten je km) = 96.000 € ÷ (1,40 € − 0,60 €) = 120.000 km. Bei dieser Fahrleistung kosten beide Varianten 168.000 €.
- Bei drei Rundfahrten zu 1.000 km in 48 Wochen fährt der Lkw 144.000 km: Eigentransport 96.000 € + 0,60 € × 144.000 = 182.400 €, Fremdtransport 1,40 € × 144.000 = 201.600 €. Der Eigentransport ist 19.200 € günstiger.
- Sinkt der Bedarf auf zwei Rundfahrten je Woche (96.000 km), kostet der Eigentransport 153.600 €, die Spedition 134.400 €; dann ist der Fremdtransport 19.200 € günstiger.

Oberhalb der kritischen Fahrleistung lohnt sich der eigene Lkw, unterhalb die Spedition. Zusätzlich zählen Auslastung (Rückladungen vom Werk Ost zum Werk Süd), Flexibilität bei Mengenschwankungen, Zuverlässigkeit und der Aufwand für Disposition und Fahrpersonal.

### Verpackung, Ladungssicherung und Transportschäden

Die **Verpackung** erfüllt im Lager- und Transportwesen drei Funktionen: die **Schutzfunktion** (gegen Stöße, Feuchtigkeit, Schmutz und bei Elektronik gegen elektrostatische Entladung durch ESD-Verpackung), die **Lager- und Transportfunktion** (stapelbare Packstücke, abgestimmt auf genormte Ladungsträger) und die **Informationsfunktion** (Inhalt, Gewicht, Handhabungshinweise, Barcode für das Scannen). Gängige **Ladungsträger** sind Paletten, Gitterboxen, Kleinladungsträger (genormte Kunststoffbehälter) und Container. Im Werksverkehr setzt Solvitec Mehrwegbehälter ein, die leer zurückgeführt werden (zur Rückführungslogistik siehe Thema 6.7).

Die **Ladungssicherung** soll verhindern, dass Ladung beim Bremsen, in Kurven oder beim Ausweichen verrutscht, kippt oder herabfällt. Grundprinzipien sind die **formschlüssige** Sicherung (Ladung lückenlos und an der Stirnwand verstauen, Lücken mit Sperrbalken oder Polstern füllen) und die **kraftschlüssige** Sicherung (Niederzurren mit Gurten, rutschhemmende Matten). Verlader, Fahrpersonal und Frachtführer wirken dabei zusammen; welche Pflichten im Einzelnen gelten und wie Zurrkräfte berechnet werden, regeln gesetzliche Vorgaben und Normen, hier nicht behandelt (nicht förmlich rechtsgeprüft).

Bei **Transportschäden** zählt ein geordnetes Vorgehen beim Wareneingang: Packstücke zählen und äußerlich prüfen, erkennbare Schäden auf dem Lieferpapier vermerken und vom Fahrpersonal bestätigen lassen, Fotos machen, die beschädigte Ware getrennt lagern und den Schaden unverzüglich dem Frachtführer bzw. Spediteur und dem Absender (Lieferunternehmen) melden. Fristen, Haftung und Transportversicherung werden hier nicht behandelt; wer das Transportrisiko trägt, ergibt sich im Auslandsgeschäft aus der vereinbarten Incoterm-Klausel (Thema 7.4). Als Kennzahl dient die **Schadensquote** = beschädigte Sendungen ÷ alle Sendungen × 100: Kommen von 1.600 Sendungen 8 beschädigt an, beträgt sie 0,5 % (Beispielwerte). Steigt sie, sucht Solvitec die Ursachen systematisch, etwa mit dem Ishikawa-Diagramm (Thema 6.3): Verpackung, Ladungssicherung, Umschlag oder ein bestimmter Dienstleister.

## Karteikarten

#### K-6.6-01
**Frage:** Was spricht für ein Zentrallager, was für dezentrale Lager?
**Antwort:** Zentrallager: Sicherheitsbestände nur einmal, bessere Auslastung von Fläche und Technik, einfachere Steuerung, gebündelte Anlieferung; dafür längere Auslieferungswege und höhere Transportkosten zur Kundschaft. Dezentrale Lager: kurze Wege und Lieferzeiten, aber mehrfach gehaltene Bestände und mehr Kapitalbindung.
`tags: lagerarten` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.6-02
**Frage:** Wie unterscheiden sich Blocklager, Regallager und Hochregallager?
**Antwort:** Blocklager: Ladeeinheiten ohne Regal gestapelt, wenig Investition, gute Flächennutzung, kein direkter Zugriff auf jede Einheit. Regallager: jeder Platz direkt erreichbar, Gänge kosten Fläche. Hochregallager: große Bauhöhe, meist automatisch mit Regalbediengeräten, viel Platz auf wenig Grundfläche, hohe Investition.
`tags: lagerarten` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-6.6-03
**Frage:** Was unterscheidet das Festplatzsystem von der chaotischen Lagerhaltung?
**Antwort:** Festplatzsystem: jeder Artikel hat einen festen Platz, übersichtlich auch ohne IT, aber reservierte Plätze bleiben leer, Fläche nach Höchstbestand. Chaotische Lagerhaltung: jeder freie Platz wird belegt, das Lagerverwaltungssystem merkt sich den Platz; bessere Flächennutzung, aber ohne zuverlässiges System und Kennzeichnung ist nichts auffindbar.
`tags: lagerorganisation` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.6-04
**Frage:** Was bedeuten Fifo, Lifo und Fefo bei der Entnahme aus dem Lager?
**Antwort:** Fifo: zuerst Eingelagertes zuerst entnehmen (gegen Überalterung). Lifo: zuletzt Eingelagertes zuerst entnehmen (oft im Blocklager, nur bei nicht alterndem Material). Fefo: zuerst entnehmen, was am frühesten verfällt, z. B. Lotpaste.
`tags: lagerorganisation` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-6.6-05
**Frage:** Welche Kosten gehören zu den Lagerhaltungskosten, und wie berechnest du den Lagerkostensatz?
**Antwort:** Raum, Einrichtung, Lagerpersonal, Versicherung, Schwund und Veralterung sowie Zinsen auf das gebundene Kapital. Lagerkostensatz = Lagerhaltungskosten einschließlich Zinsen ÷ durchschnittlicher Lagerbestand × 100, z. B. (Beispielwerte) 90.000 € ÷ 500.000 € × 100 = 18 %; dieser Satz geht in die Losgröße aus 6.1 und die optimale Bestellmenge aus 6.5 ein. Welche Kostenarten einbezogen werden, legt das Unternehmen fest.
`tags: lagerkosten, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-6.6-06
**Frage:** Wie berechnest du Kapitalbindungskosten und Lagerzinssatz?
**Antwort:** Kapitalbindungskosten = durchschnittlicher Lagerbestand × Zinssatz, z. B. (Beispielwerte) 500.000 € × 7,2 % = 36.000 €. Lagerzinssatz = Jahreszinssatz × durchschnittliche Lagerdauer ÷ 360, z. B. 7,2 % × 40 ÷ 360 = 0,8 % des Werts einer Einheit während ihrer Lagerzeit.
`tags: lagerkosten, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-6.6-07
**Frage:** Was unterscheidet die Kommissionierung Person-zur-Ware von Ware-zur-Person?
**Antwort:** Person-zur-Ware: Die Kommissionierer:innen gehen zum Lagerplatz; wenig Investition, flexibel, aber viel Wegezeit. Ware-zur-Person: Fördertechnik bringt die Ware an einen festen Arbeitsplatz; kaum Wege, hohe Leistung, aber hohe Investition.
`tags: kommissionierung` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-6.6-08
**Frage:** Wie berechnest du Kommissionierleistung und Fehlerquote?
**Antwort:** Kommissionierleistung = Positionen ÷ Kommissionierstunden, z. B. (Beispielwerte) 270 ÷ 7,5 = 36 Positionen (Picks) je Stunde. Fehlerquote = fehlerhafte Positionen ÷ alle Positionen × 100, z. B. 72 ÷ 14.400 × 100 = 0,5 %.
`tags: kommissionierung, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-6.6-09
**Frage:** Was unterscheidet Stetigförderer von Unstetigförderern, und wozu gehören fahrerlose Transportsysteme?
**Antwort:** Stetigförderer bewegen das Gut kontinuierlich auf festem Weg (Band, Rollenbahn); leistungsstark, aber unflexibel. Unstetigförderer bewegen einzelne Ladungen in Arbeitsspielen auf wechselnden Wegen (Kran, Gabelstapler). Fahrerlose Transportfahrzeuge sind Unstetigförderer und Flurförderzeuge.
`tags: foerdermittel` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.6-10
**Frage:** Wie unterscheiden sich die Verkehrsträger Straße, Schiene, Wasser und Luft in Kosten, Geschwindigkeit und Flexibilität?
**Antwort:** Straße: sehr flexibel (Haus-zu-Haus), schnell auf kurzen Strecken, mittlere bis hohe Kosten je Tonnenkilometer. Schiene: günstig bei großen Mengen, wenig flexibel. Wasser: am günstigsten für Massengut und Übersee, aber langsam. Luft: sehr schnell, aber sehr teuer, für eilige, leichte, hochwertige Sendungen.
`tags: verkehrstraeger` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.6-11
**Frage:** Was kennzeichnet den kombinierten Verkehr, und was unterscheidet ihn vom gebrochenen Verkehr?
**Antwort:** Mehrere Verkehrsträger in einer Kette (Lkw-Vor- und -Nachlauf, Hauptlauf auf Schiene, Binnenschiff oder See); umgeschlagen wird nur die Ladeeinheit (Container, Wechselbrücke, Sattelauflieger). Beim gebrochenen Verkehr wird das Gut selbst umgeladen.
`tags: verkehrstraeger` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-6.6-12
**Frage:** Was tun Frachtführer, Spediteur und Lagerhalter, und was ist Kontraktlogistik?
**Antwort:** Frachtführer: befördert selbst. Spediteur: organisiert die Versendung (Verkehrsträger und Frachtführer wählen, Sammelgut bündeln, Papiere, ggf. Zoll). Lagerhalter: lagert und verwahrt Güter für andere. Kontraktlogistik: langfristig vereinbartes, zugeschnittenes Leistungspaket eines Dienstleisters (Lager, Kommissionierung, Versand, Mehrwertleistungen) mit Kennzahlen.
`tags: logistikdienstleister` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-6.6-13
**Frage:** Wie ermittelst du die kritische Fahrleistung zwischen Eigen- und Fremdtransport, und was zählt außer den Kosten?
**Antwort:** Kritische Fahrleistung = Fixkosten ÷ (Frachtsatz je km − variable Kosten je km), z. B. (Beispielwerte) 96.000 € ÷ (1,40 € − 0,60 €) = 120.000 km; darüber ist der Eigentransport günstiger. Außerdem: Auslastung und Rückladungen, Flexibilität, Zuverlässigkeit, Kontrolle, Abhängigkeit, Aufwand für Disposition und Personal.
`tags: eigen_fremdtransport, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-6.6-14
**Frage:** Wie gehst du vor, wenn beim Wareneingang eine beschädigte Sendung ankommt?
**Antwort:** Packstücke zählen und äußerlich prüfen, Schaden auf dem Lieferpapier vermerken und vom Fahrpersonal bestätigen lassen, Fotos machen, Ware getrennt lagern, Frachtführer bzw. Spediteur und Absender (Lieferunternehmen) unverzüglich informieren. Fristen und Haftung regeln gesetzliche Vorgaben und Verträge (hier nicht behandelt).
`tags: transportschaeden` · `schwierigkeit: leicht` · `bloom: anwenden`

## Quiz

#### Q-6.6-01 · Multiple Choice
**Frage:** Im Materiallager des Werks Süd (SMD-Fertigung) liegt Lotpaste in zwei Chargen. Die später angelieferte Charge läuft früher ab als die ältere. Nach welchem Prinzip entnimmst du?
- [ ] Fifo, weil die zuerst eingelagerte Charge immer zuerst entnommen wird.
- [ ] Lifo, weil die zuletzt eingelagerte Charge am leichtesten erreichbar ist.
- [x] Fefo, weil das früheste Verfallsdatum über die Reihenfolge entscheidet.
- [ ] Festplatzsystem, weil jede Charge einen festen Lagerplatz braucht.
**Erklärung:** Bei Material mit Verfallsdatum zählt nicht der Zeitpunkt der Einlagerung, sondern das Verfallsdatum (First Expired – First Out). Das Festplatzsystem ist eine Form der Lagerorganisation, kein Entnahmeprinzip.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.6-02 · Zuordnung
**Anweisung:** Ordne jedem Begriff das passende Merkmal zu.
- Blocklager ↔ Ladeeinheiten ohne Regal gestapelt, kein direkter Zugriff auf jede Einheit
- Hochregallager ↔ Große Bauhöhe, meist automatisch mit Regalbediengeräten bedient
- Festplatzsystem ↔ Jeder Artikel hat einen dauerhaft zugewiesenen Lagerplatz
- Chaotische Lagerhaltung ↔ Jeder freie Platz wird belegt, das Lagerverwaltungssystem merkt sich den Platz
**Erklärung:** Blocklager und Hochregallager sind Bauarten, Festplatzsystem und chaotische Lagerhaltung Formen der Lagerorganisation.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-6.6-03 · Kurzantwort
**Frage:** Ein Materiallager hat im Jahr Lagerhaltungskosten von 56.000 € einschließlich der Zinsen auf das gebundene Kapital; der durchschnittliche Lagerbestand beträgt 350.000 € (Beispielwerte). Berechne den Lagerkostensatz in Prozent.
**Akzeptierte Antworten:** 16; 16 %; 16%; 16 Prozent; 16,0; 16,0 %; 16,0 Prozent; 16.0; 16.0 %; 16.0 Prozent; 16,00; 16,00 %; 16,00 Prozent; 16.00; 16.00 %
**Erklärung:** Lagerkostensatz = 56.000 € ÷ 350.000 € × 100 = 16 %. Das Lager kostet im Jahr 16 % des durchschnittlich gelagerten Werts.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-6.6-04 · Kurzantwort
**Frage:** Der kalkulatorische Jahreszinssatz beträgt 6 %, die durchschnittliche Lagerdauer 30 Tage (Beispielwerte). Berechne den Lagerzinssatz in Prozent (Rechenjahr mit 360 Tagen).
**Akzeptierte Antworten:** 0,5; 0,5 %; 0,5%; 0,5 Prozent; 0,50; 0,50 %; 0,50 Prozent; 0.5; 0.5 %; 0.5 Prozent; 0.50; 0.50 %; 0.50 Prozent
**Erklärung:** Lagerzinssatz = 6 % × 30 ÷ 360 = 0,5 %. Wer nur den Jahreszinssatz von 6 % nennt, übersieht die kurze Lagerdauer.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.6-05 · Kurzantwort
**Frage:** Ein Fertigwarenlager hat einen Jahresabgang von 3.600.000 € (zu Herstellkosten) und eine Umschlagshäufigkeit von 8. Durch kleinere Fertigungsaufträge soll die Umschlagshäufigkeit bei gleichem Abgang auf 10 steigen (Beispielwerte). Um wie viel Euro sinkt der durchschnittliche Lagerbestand?
**Akzeptierte Antworten:** 90.000; 90000; 90.000 €; 90000 €; 90.000 Euro; 90000 Euro; 90.000 EUR; 90000 EUR; 90.000,00; 90000,00; 90.000,00 €; 90000,00 €; 90.000,00 Euro; 90000,00 Euro; 90.000,00 EUR; 90000,00 EUR
**Erklärung:** Durchschnittlicher Lagerbestand = Abgang ÷ Umschlagshäufigkeit: vorher 3.600.000 € ÷ 8 = 450.000 €, nachher 3.600.000 € ÷ 10 = 360.000 €. Es werden 90.000 € Kapital frei.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-6.6-06 · Wahr/Falsch
**Aussage:** Bei der mehrstufigen Kommissionierung werden die Artikel zunächst für mehrere Aufträge gemeinsam entnommen und erst danach auf die einzelnen Aufträge verteilt.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Das spart Wege, wenn viele Aufträge dieselben Artikel enthalten, braucht aber einen Verteilplatz und das Zusammenführen der Aufträge. Bei der einstufigen Kommissionierung wird jeder Auftrag in einem Durchgang vollständig zusammengestellt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-6.6-07 · Kurzantwort
**Frage:** Ein Lagerist im Ersatzteillager stellt in einer Schicht von 7,5 Stunden 50 Aufträge mit je 6 Positionen zusammen (Beispielwerte). Berechne die Kommissionierleistung in Positionen je Stunde.
**Akzeptierte Antworten:** 40; 40 Positionen; 40 Positionen je Stunde; 40 Positionen pro Stunde; 40 Positionen/h; 40 Picks; 40 Picks je Stunde; 40 Picks pro Stunde; 40 je Stunde; 40 pro Stunde; 40/h; 40 Pos./h; 40 Picks/h; 40 Positionen/Stunde; 40 Picks/Stunde; 40,0; 40.0
**Erklärung:** Positionen = 50 × 6 = 300; Kommissionierleistung = 300 ÷ 7,5 h = 40 Positionen je Stunde. Typischer Fehler: die Aufträge statt der Positionen durch die Stunden teilen.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-6.6-08 · Kurzantwort
**Frage:** In einem Monat wurden 10.800 Positionen kommissioniert, 27 davon fehlerhaft (Beispielwerte). Berechne die Fehlerquote in Prozent.
**Akzeptierte Antworten:** 0,25; 0,25 %; 0,25%; 0,25 Prozent; 0.25; 0.25 %; 0.25 Prozent
**Erklärung:** Fehlerquote = 27 ÷ 10.800 × 100 = 0,25 %.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-6.6-09 · Lückentext
**Text:** Ein ___Stetigförderer___ bewegt das Fördergut kontinuierlich auf einem fest vorgegebenen Weg, zum Beispiel als Rollenbahn oder Bandförderer.
**Erklärung:** Stetigförderer leisten viel bei gleichmäßigem Materialfluss, passen sich Layoutänderungen aber schlecht an. Unstetigförderer wie Gabelstapler bewegen einzelne Ladungen auf wechselnden Wegen.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-6.6-10 · Mehrfachauswahl
**Frage:** Welche dieser Fördermittel sind Flurförderzeuge?
- [x] Gabelstapler
- [ ] Rollenbahn
- [x] Fahrerloses Transportfahrzeug
- [ ] Brückenkran
**Erklärung:** Flurförderzeuge sind bodengebundene Fahrzeuge wie Gabelstapler, Handhubwagen, Schlepper und fahrerlose Transportfahrzeuge. Die Rollenbahn ist ein Stetigförderer; der Brückenkran ist zwar ein Unstetigförderer, fährt aber nicht auf dem Boden.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-6.6-11 · Kurzantwort
**Frage:** Zwischen Bereitstellungslager und Montage sind 40 Transporte je Stunde nötig. Ein Transportspiel eines fahrerlosen Transportfahrzeugs dauert 5 Minuten, die Fahrzeuge sind wegen Laden und Wartung nur 80 % der Zeit verfügbar (Beispielwerte). Wie viele Fahrzeuge braucht das Werk mindestens (auf ganze Fahrzeuge aufgerundet)?
**Akzeptierte Antworten:** 5; 5 Fahrzeuge; 5 Fahrzeug; 5 FTF; 5 FTS; 5 Transportfahrzeuge; 5 fahrerlose Transportfahrzeuge; 5 Stück
**Erklärung:** Ein Fahrzeug schafft 60 ÷ 5 = 12 Transporte je Stunde, bei 80 % Verfügbarkeit 12 × 0,8 = 9,6. Benötigt werden 40 ÷ 9,6 = 4,17, aufgerundet 5 Fahrzeuge. Ohne die Verfügbarkeit ergäben sich 40 ÷ 12 = 3,33, also 4 Fahrzeuge, die den Bedarf in der Praxis nicht decken.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-6.6-12 · Entweder-Oder
**Frage:** Bei einem Kundenunternehmen in Shanghai steht eine Anlage still, weil ein Steuerungsmodul (8 kg, Beispielwert) ausgefallen ist. Welcher Verkehrsträger passt für das Ersatzteil aus dem Ersatzteillager im Werk Süd?
- [ ] Seefracht, weil sie je Tonnenkilometer am günstigsten ist.
- [x] Luftfracht, weil die Zeit entscheidet und die Sendung leicht ist.
**Erklärung:** Die Kosten des Stillstands beim Kundenunternehmen übersteigen die hohen Luftfrachtkosten für eine leichte Sendung bei Weitem. Seefracht wäre mehrere Wochen unterwegs.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-6.6-13 · Sortieren
**Anweisung:** Bringe die Schritte eines Exportcontainers im kombinierten Verkehr vom Werk Ost zum Seeschiff in die richtige Reihenfolge.
1. Vorlauf: Ein Lkw bringt den Container vom Werk zum Bahnterminal.
2. Der Container wird im Terminal vom Lkw auf den Güterzug umgeschlagen.
3. Hauptlauf: Der Güterzug fährt zum Seehafen.
4. Der Container wird im Hafen auf das Seeschiff umgeschlagen.
**Erklärung:** Im kombinierten Verkehr wird nur die Ladeeinheit umgeschlagen, das Gut im Container bleibt unberührt. Der kurze Vorlauf läuft per Lkw, der lange Hauptlauf auf der Schiene.
`schwierigkeit: leicht` · `bloom: verstehen`

#### Q-6.6-14 · Kurzantwort
**Frage:** Für Container zum Seehafen bewertet Solvitec das Binnenschiff mit diesen Kriterien (Beispielwerte, Punkte von 1 bis 10): Transportkosten (Gewicht 40 %) 9 Punkte, Laufzeit (25 %) 3 Punkte, Zuverlässigkeit (20 %) 6 Punkte, Umwelt (15 %) 9 Punkte. Berechne den Nutzwert mit dem Gewicht als Dezimalzahl (Ergebnis auf der Punkteskala, eine Nachkommastelle).
**Akzeptierte Antworten:** 6,9; 6.9; 6,90; 6.90; 6,9 Punkte; 6.9 Punkte; 6,90 Punkte; 6.90 Punkte
**Erklärung:** 9 × 0,40 + 3 × 0,25 + 6 × 0,20 + 9 × 0,15 = 3,60 + 0,75 + 1,20 + 1,35 = 6,9.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.6-15 · Kurzantwort
**Frage:** Ein werkseigener Lkw verursacht im Jahr 54.000 € Fixkosten und 0,75 € variable Kosten je km; eine Spedition verlangt 1,65 € je km (Beispielwerte). Bei welcher Jahresfahrleistung in Kilometern sind beide Varianten gleich teuer?
**Akzeptierte Antworten:** 60.000; 60000; 60.000 km; 60000 km; 60.000 Kilometer; 60000 Kilometer
**Erklärung:** Kritische Fahrleistung = 54.000 € ÷ (1,65 € − 0,75 €) = 54.000 € ÷ 0,90 € = 60.000 km. Darüber ist der eigene Lkw günstiger, darunter die Spedition.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-6.6-16 · Was passt nicht dazu
**Frage:** Welcher Beteiligte erbringt keine Lager- oder Transportleistung?
- [ ] Spediteur
- [x] Handelsvertreter
- [ ] Frachtführer
- [ ] Lagerhalter
**Erklärung:** Spediteur, Frachtführer und Lagerhalter erbringen Logistikleistungen (Versendung organisieren, befördern, lagern). Der Handelsvertreter vermittelt Verkäufe im Namen des Herstellers (Thema 7.2).
`schwierigkeit: leicht` · `bloom: analysieren`
