# Entwurf: Fehlende Rahmenplan-Theorie im Technischen Fachwirt (FL-TF-16, TQ1 bis TQ3)

Stand 12.10.2026 · **zur Entscheidung vorgelegt, nicht in `content/` eingespielt** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit FL-TF-16“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 (Abschnitt 4, „Lücken gegenüber dem Rahmenplan“, TechFachwPrV § 4 bis 6; der IHK-Rahmenplan selbst war nicht abrufbar).

## Was vorliegt

Für die im Review genannten Pflichtinhalte, die im Kurs fehlen, steht hier **Theorietext** als Entwurf, jeweils mit Zielthema, Einordnung und Rechenbeispiel. Die Review-Empfehlung lautet „erst Theorie ergänzen, danach Fragen und Werkzeuge“; Karteikarten, Quizfragen und Fachgespräch kommen deshalb erst nach Ihrer Freigabe.

| Nr. | Lücke (Review) | Zielthema | Neuer Abschnitt |
|---|---|---|---|
| 1 | Energieformen, Wärme, Temperatur, Wärmeausdehnung | TQ1 5.1 | „Energieformen und Wärme“ |
| 2 | Druck, Hydraulik, Pneumatik (setzt F-TQ1-01 voraus) | TQ1 5.1 | „Druck, Hydraulik und Pneumatik“ |
| 3 | Geschwindigkeit, Drehzahl, Schnittgeschwindigkeit | TQ1 5.2 | „Geschwindigkeit, Drehzahl und Schnittgeschwindigkeit“ |
| 4 | Statistische Verfahren (fehlen völlig) | TQ1 5.2 | „Statistische Verfahren“ |
| 5 | Elektrische Energie, Kosten, Reihen- und Parallelschaltung | TQ1 5.3 | „Elektrische Energie und Schaltungen“ |
| 6 | Messtechnik und Prüfmittel | TQ2 6.3 | „Messtechnik und Prüfmittel“ |
| 7 | Funktionserkennung, Schaltpläne (Hydraulik, Pneumatik, Elektro) | TQ2 6.1 | „Schaltpläne und Funktionserkennung“ |
| 8 | CAD, CAM und rechnergestützte Systeme, NC-Grundlagen | TQ3 7.4 | „Rechnergestützte Systeme und NC-Programmierung“ |
| 9 | Verfügbarkeit = MTBF / (MTBF + MTTR) (das Fachgespräch fragt sie ab, die Theorie nennt sie nicht) | TQ3 7.2 | Ergänzung im Abschnitt Kennzahlen |

Nicht in diesem Entwurf: die weiteren Lücken des Reviews (Oberflächenangaben, Fe-C-Diagramm, Zerspanungsgrößen, Fügetechnik, Fluidtechnik vertieft, Qualitätsmanagement, Arbeitszeitwirtschaft, Rechenaufgaben im Rechnungswesen und andere). Sie sind eigene, größere Vorhaben.

**Hinweis zur Prüfung:** Die Texte beschreiben gesichertes Allgemeinwissen der Technik (Formeln, Größenordnungen, gängige Bezeichnungen). Norm-Bezeichnungen sind nur dort genannt, wo ich sie sicher kenne (DIN ISO 1219 für Schaltzeichen der Fluidtechnik, DIN EN 60617 für Schaltzeichen der Elektrotechnik, Bezugstemperatur 20 °C für Längenmessungen); sie gehören zur fachlichen Prüfung. Alle Rechenbeispiele habe ich nachgerechnet. Werte aus Stoff- und Preislisten (spezifische Wärmekapazität, Ausdehnungskoeffizient, Strompreis) sind gerundete Richtwerte und als „etwa“ oder „Beispielwert“ gekennzeichnet.

---

## 1. TQ1 5.1 — Energieformen und Wärme

**Einfügen:** Neuer Abschnitt `### Energieformen und Wärme` nach den vorhandenen Abschnitten zu Arbeit, Energie und Leistung.

> Energie tritt in verschiedenen Formen auf: als **mechanische Energie** (Lageenergie, Bewegungsenergie), als **thermische Energie** (Wärme), als **elektrische Energie** und als **chemische Energie** (etwa im Brennstoff). Nach dem **Energieerhaltungssatz** geht Energie nicht verloren, sie wird nur von einer Form in eine andere umgewandelt; der **Wirkungsgrad** gibt an, welcher Anteil der zugeführten Energie in der gewünschten Form ankommt, der Rest geht meist als Wärme verloren. Bei der Zerspanung an einer Fräsmaschine der Vantera Präzisionstechnik GmbH wird der größte Teil der mechanischen Antriebsenergie in Wärme im Span, im Werkzeug und im Werkstück umgewandelt.
>
> Die **Temperatur** wird in Kelvin (K) oder Grad Celsius (°C) angegeben; eine Temperaturdifferenz von 1 K ist gleich 1 °C. Die **Wärmemenge**, die ein Körper aufnimmt, folgt aus Masse m, spezifischer Wärmekapazität c und Temperaturänderung ΔT: **Q = m · c · ΔT**. Stahl hat eine spezifische Wärmekapazität von etwa 0,47 kJ/(kg · K). *Beispiel:* Zum Erwärmen eines Stahlteils mit 10 kg von 20 °C auf 220 °C (ΔT = 200 K) sind Q = 10 kg · 0,47 kJ/(kg · K) · 200 K = 940 kJ nötig, das sind etwa 0,26 kWh.
>
> Feste Körper dehnen sich beim Erwärmen aus. Die **Längenänderung** beträgt **ΔL = α · L₀ · ΔT** mit dem Längenausdehnungskoeffizienten α (Stahl etwa 12 · 10⁻⁶ 1/K). *Beispiel:* Eine Stahlwelle von 500 mm Länge wird um 50 K wärmer und wird um ΔL = 12 · 10⁻⁶ 1/K · 500 mm · 50 K = 0,30 mm länger. Bei Präzisionsbauteilen mit engen Toleranzen ist das erheblich; deshalb gilt für Längenmessungen die Bezugstemperatur 20 °C, und Werkstücke werden vor dem Messen temperiert. Wärme wird durch **Wärmeleitung**, **Konvektion** (Strömung) und **Wärmestrahlung** übertragen.

## 2. TQ1 5.1 — Druck, Hydraulik und Pneumatik

**Einfügen:** Neuer Abschnitt `### Druck, Hydraulik und Pneumatik` (F-TQ1-01 setzt ihn voraus).

> Der **Druck** p ist die Kraft F, die senkrecht auf eine Fläche A wirkt: **p = F / A**. Die Einheit ist das Pascal (1 Pa = 1 N/m²); in der Technik ist das **bar** gebräuchlich (1 bar = 10⁵ Pa = 0,1 MPa). In einer eingeschlossenen Flüssigkeit breitet sich der Druck nach allen Seiten gleichmäßig aus (**Pascalsches Prinzip**). Darauf beruht die **Hydraulik**: Ein kleiner Kolben mit der Fläche A₁ erzeugt mit der Kraft F₁ einen Druck, der an einem größeren Kolben mit der Fläche A₂ die Kraft **F₂ = F₁ · A₂ / A₁** ergibt; der Weg verhält sich umgekehrt (s₂ = s₁ · A₁ / A₂), die Arbeit bleibt gleich. Hydraulikanlagen übertragen große Kräfte genau und gut regelbar (Pressen, Spannvorrichtungen), da Öl kaum zusammendrückbar ist.
>
> Die **Pneumatik** arbeitet mit Druckluft, meist mit 6 bar. Luft ist zusammendrückbar, deshalb sind pneumatische Antriebe schnell und sauber, aber für große, genau zu haltende Kräfte weniger geeignet. *Beispiel:* Ein pneumatischer Zylinder mit 50 mm Kolbendurchmesser hat die Fläche A = π · d² / 4 ≈ 1,96 · 10⁻³ m²; bei 6 bar (6 · 10⁵ Pa) beträgt die theoretische Kolbenkraft F = p · A ≈ 1,18 kN (ohne Reibungsverluste, die tatsächliche Kraft ist etwas kleiner).

## 3. TQ1 5.2 — Geschwindigkeit, Drehzahl und Schnittgeschwindigkeit

**Einfügen:** Neuer Abschnitt `### Geschwindigkeit, Drehzahl und Schnittgeschwindigkeit` in der technischen Mathematik.

> Die **Geschwindigkeit** bei gleichförmiger Bewegung ist der Weg je Zeit: **v = s / t** (m/s, m/min). Bei einer Drehbewegung gibt die **Drehzahl n** die Umdrehungen je Minute an (1/min). Ein Punkt am Umfang eines Durchmessers d bewegt sich mit der **Umfangsgeschwindigkeit v = π · d · n**. In der Zerspanung heißt diese Größe **Schnittgeschwindigkeit v_c**, angegeben in m/min. *Beispiel:* Ein Fräser mit 100 mm Durchmesser läuft mit 800 1/min; die Schnittgeschwindigkeit beträgt v_c = π · 0,1 m · 800 1/min ≈ 251 m/min. Umgekehrt folgt die nötige Drehzahl aus der für Werkzeug und Werkstoff empfohlenen Schnittgeschwindigkeit: n = v_c / (π · d).

## 4. TQ1 5.2 — Statistische Verfahren

**Einfügen:** Neuer Abschnitt `### Statistische Verfahren` (der Rahmenplan nennt „statistische Verfahren“; im Kurs fehlten sie).

> **Statistische Verfahren** beschreiben eine Reihe von Messwerten mit wenigen Kennzahlen, etwa bei der Prüfung von Wellendurchmessern. Der **Mittelwert** x̄ ist die Summe aller Werte geteilt durch ihre Anzahl n; der **Median** ist der mittlere Wert der der Größe nach geordneten Reihe; die **Spannweite** R ist der Unterschied zwischen größtem und kleinstem Wert. Die **Standardabweichung** s misst die Streuung um den Mittelwert: **s = √( Σ(xᵢ − x̄)² / (n − 1) )**.
>
> *Beispiel:* Fünf gemessene Wellendurchmesser (mm): 24,98; 25,01; 25,00; 24,99; 25,02. Der Mittelwert ist 125,00 / 5 = 25,00 mm, der Median 25,00 mm und die Spannweite 25,02 − 24,98 = 0,04 mm. Die Abweichungen vom Mittelwert sind −0,02; +0,01; 0; −0,01; +0,02 mm, die Summe der Quadrate beträgt 0,0010 mm²; damit ist s = √(0,0010 / 4) ≈ 0,016 mm.
>
> Streuen Messwerte nur zufällig, folgen sie häufig der **Normalverteilung** (Glockenkurve): Etwa 68 % der Werte liegen innerhalb von ±1 s um den Mittelwert, etwa 95 % innerhalb von ±2 s und etwa 99,7 % innerhalb von ±3 s. Da meist nicht alle Teile geprüft werden, urteilt man über eine **Stichprobe** auf die **Grundgesamtheit**; ein **Histogramm** zeigt, wie sich die Werte auf Klassen verteilen. Die statistische Prozesslenkung vergleicht die Streuung mit der Toleranz (siehe Qualitätsmanagement in HQ3).

## 5. TQ1 5.3 — Elektrische Energie und Schaltungen

**Einfügen:** Neuer Abschnitt `### Elektrische Energie und Schaltungen` nach der Elektrotechnik zu Spannung, Strom, Leistung.

> Die **elektrische Energie** ist das Produkt aus Leistung und Zeit: **W = P · t**; üblich ist die Einheit **Kilowattstunde (kWh)**. *Beispiel:* Eine Maschine mit 5 kW Leistung läuft 8 Stunden und verbraucht 40 kWh; bei einem Beispielpreis von 0,25 € je kWh sind das 10,00 € Energiekosten.
>
> Bei der **Reihenschaltung** von Widerständen fließt überall derselbe Strom, die Widerstände addieren sich: **R = R₁ + R₂**. Bei der **Parallelschaltung** liegt an allen Widerständen dieselbe Spannung, die Kehrwerte addieren sich: **1/R = 1/R₁ + 1/R₂**; der Gesamtwiderstand ist kleiner als der kleinste Einzelwiderstand. *Beispiel:* 30 Ω und 60 Ω parallel ergeben 1/R = 1/30 + 1/60 = 3/60, also R = 20 Ω. Bei Wechselstrom unterscheidet man die **Wirkleistung** (leistet Arbeit, P = U · I · cos φ), die **Blindleistung** (pendelt zwischen Quelle und Verbraucher, etwa bei Motoren und Spulen) und die **Scheinleistung** S = U · I; der **Leistungsfaktor** cos φ gibt das Verhältnis von Wirk- zu Scheinleistung an.

## 6. TQ2 6.3 — Messtechnik und Prüfmittel

**Einfügen:** Neuer Abschnitt `### Messtechnik und Prüfmittel` vor oder nach der Werkstoffprüfung (Maßprüfung ist keine zerstörungsfreie Werkstoffprüfung; sie wird hier getrennt behandelt, wie in F-TQ2-03 verlangt).

> Die **Messtechnik** prüft, ob Maße und Formen eines Bauteils innerhalb der in der Zeichnung angegebenen Toleranz liegen. **Messen** bestimmt einen Zahlenwert (Messschieber, Bügelmessschraube, Messuhr), **Lehren** prüft nur, ob ein Maß in der Toleranz liegt (Gut-/Ausschuss-Seite, etwa beim Grenzlehrdorn für Bohrungen). Der **Messschieber** liest meist auf 0,1 mm, 0,05 mm oder 0,02 mm ab, die **Bügelmessschraube** auf 0,01 mm; für engere Toleranzen sind Messuhren und Feinzeiger nötig. Die **Oberflächenrauheit** wird mit Kenngrößen wie dem arithmetischen Mittenrauwert **Ra** und der gemittelten Rautiefe **Rz** (in µm) beschrieben.
>
> Jede Messung hat eine **Messabweichung**; sie entsteht durch das Prüfmittel, das Verfahren, die Person und die Umgebung (insbesondere Temperatur, Bezugstemperatur 20 °C). Damit Prüfmittel verlässlich messen, müssen sie in festgelegten Abständen **kalibriert** und überwacht werden (**Prüfmittelüberwachung**); die Ergebnisse werden dokumentiert. Bei Vantera erfolgt die Maßprüfung an Wellen in der Fertigung (Stichprobe oder Vollprüfung mit Lehre) und bei der Wareneingangsprüfung.

## 7. TQ2 6.1 — Schaltpläne und Funktionserkennung

**Einfügen:** Neuer Abschnitt `### Schaltpläne und Funktionserkennung` nach der Stückliste; kurz, auf das Lesen und Erkennen ausgerichtet.

> Technische Anlagen werden in **Schaltplänen** dargestellt, aus denen sich die **Funktion** ablesen lässt. Die Symbole (Schaltzeichen) sind genormt, in der Fluidtechnik nach DIN ISO 1219, in der Elektrotechnik nach DIN EN 60617. Ein **Hydraulik- oder Pneumatikschaltplan** zeigt von der Energieversorgung (Pumpe, Kompressor mit Aufbereitung) über die **Steuer- und Wegeventile** (benannt nach Anschlüssen und Schaltstellungen, z. B. 3/2-Wegeventil) bis zu den **Arbeitselementen** (einfach- oder doppeltwirkender Zylinder, Motor); ergänzende Ventile wie Drosselrückschlagventile stellen die Geschwindigkeit ein. Die Funktion erkennt man, indem man den Weg des Druckmediums von der Quelle über die Ventile zum Zylinder verfolgt und für jede Schaltstellung prüft, welche Zylinderbewegung entsteht.
>
> Ein **Stromlaufplan** der Elektrotechnik zeigt Hauptstromkreis (Leistung, z. B. Motor über ein Schütz) und Steuerstromkreis (Taster, Schalter, Schütze). Betriebsmittel werden mit Kennbuchstaben bezeichnet (z. B. S für Taster, K für Schütz, M für Motor, F für Sicherung). Eine **Selbsthaltung** hält ein Schütz nach dem Loslassen des Einschalttasters über einen eigenen Hilfskontakt eingeschaltet; ein Ausschalttaster im Steuerstromkreis unterbricht sie.

## 8. TQ3 7.4 — Rechnergestützte Systeme und NC-Programmierung

**Einfügen:** Neuer Abschnitt `### Rechnergestützte Systeme und NC-Programmierung` in der Automatisierungstechnik.

> In der Produktentstehung unterstützen **rechnergestützte Systeme** jeden Schritt. **CAD** (Computer Aided Design) dient dem Konstruieren in 2D und 3D, auch mit parametrischen Modellen; für den Austausch zwischen Systemen gibt es neutrale Datenformate (z. B. STEP). **CAM** (Computer Aided Manufacturing) erzeugt aus dem CAD-Modell die Werkzeugwege und über einen **Postprozessor** das NC-Programm für die jeweilige Maschinensteuerung; eine **Simulation** prüft das Programm vor dem Fertigen auf Kollisionen. **CAP** unterstützt die Arbeitsplanung, **CAQ** die Qualitätssicherung. **PDM/PLM**-Systeme verwalten Produktdaten, Zeichnungsstände und Freigaben über den gesamten Lebenszyklus; **PPS-** bzw. **ERP**-Systeme planen Aufträge, Material und Kapazitäten. Die Verknüpfung aller dieser Systeme zu einem durchgängigen Datenfluss nennt man **CIM** (Computer Integrated Manufacturing).
>
> **NC-Programme** bestehen aus Sätzen mit **G-Funktionen** (Wege, z. B. G00 Eilgang, G01 Gerade mit Vorschub, G02 und G03 Kreisbögen im Uhrzeiger- bzw. Gegenuhrzeigersinn) und **M-Funktionen** (Schalt- und Hilfsfunktionen, z. B. M03 Spindel ein, M05 Spindel aus, M30 Programmende). Maße beziehen sich auf den **Werkstücknullpunkt**, den der Maschinenbediener festlegt; bei **absoluter** Bemaßung (G90) beziehen sich die Koordinaten auf diesen Nullpunkt, bei **inkrementeller** (G91) auf die vorherige Position. Hinweis: Befehlsumfang und Schreibweise hängen von der Steuerung ab.

## 9. TQ3 7.2 — Verfügbarkeit aus MTBF und MTTR

**Einfügen:** Ergänzung im Abschnitt zu den Kennzahlen der Instandhaltung (MTBF, MTTR).

> Die **Verfügbarkeit** einer Maschine gibt an, welcher Anteil der Zeit sie einsatzbereit ist: **Verfügbarkeit = MTBF / (MTBF + MTTR)**. *Beispiel:* Bei einer mittleren Betriebsdauer zwischen Ausfällen (MTBF) von 380 h und einer mittleren Reparaturdauer (MTTR) von 20 h beträgt die Verfügbarkeit 380 / 400 = 95 %. Wird die MTBF größer (seltener ausfallen) oder die MTTR kleiner (schneller reparieren), steigt die Verfügbarkeit.

---

## Wie es weitergehen würde

Nach Ihrer Freigabe: Abschnitte in die genannten Themen einarbeiten, danach (jeweils als eigener Schritt und nach Ihrer Entscheidung) Karteikarten, Quizfragen mit Rechenaufgaben, Anpassung von F-TQ1-01 und der Fachgespräch-Fragen. Die neuen Abschnitte erhöhen die Zahl der Items nicht; der Import ändert nur die Theorie der betroffenen Themen.

## Zu entscheiden

1. Sind die Texte inhaltlich und im Umfang in Ordnung? Soll ich sie so einarbeiten (Theorie), wie oben beschrieben?
2. Sollen im Anschluss Karteikarten und Quizfragen (auch Rechenaufgaben) zu den neuen Abschnitten entstehen, als eigener Entwurf zur Prüfung?
3. Die weiteren Lücken des Reviews (Zerspanungsgrößen und Standzeit, Fügetechnik, Oberflächenangaben, Fe-C-Diagramm, Qualitätsmanagement-Statistik, Arbeitszeitwirtschaft, Rechnen im Rechnungswesen): als nächste Pakete vorlegen?
