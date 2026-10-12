# Entwurf: Paket P2 — Zeichnen und Werkstoffe (Technischer Fachwirt, TQ2, Themen 6.1 bis 6.3)

Stand 12.10.2026 · **Entwurf zur Entscheidung, nichts in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit P2“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P2 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Zeichnung und Werkstoff sind Kern der 90-Minuten-Klausur „Technische Kommunikation und Werkstofftechnologie“. Die Themen 6.1 bis 6.3 erklären Toleranzen, Werkstoffgruppen und Prüfverfahren bisher nur im Überblick; es fehlen Oberflächenangaben, Form- und Lagetoleranzen, Allgemeintoleranzen, Passungssysteme, Gewinde, Werkstoffkurznamen, das Eisen-Kohlenstoff-Diagramm, Keramik und Verbundwerkstoffe sowie Biege- und Dauerschwingversuch.

## Was vorliegt

Zehn neue Theorieabschnitte (der Vorschlag nannte acht; die Gliederung nach Verfahren ergibt zehn kurze Abschnitte). Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem Skript nachgerechnet.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 6.1 | „Oberflächenangaben“ | „Bemaßung“ |
| 2 | 6.1 | „Passungssysteme: Einheitsbohrung und Einheitswelle“ | „Toleranzen und Passungen“ |
| 3 | 6.1 | „Form- und Lagetoleranzen“ | Abschnitt 2 |
| 4 | 6.1 | „Allgemeintoleranzen“ | Abschnitt 3 |
| 5 | 6.1 | „Gewinde und Schraubenfestigkeit“ | „Normung: Linienarten, Maßstäbe und Schriftfeld“ |
| 6 | 6.2 | „Werkstoffkurznamen lesen“ | „Eisenwerkstoffe: Stahl und Gusseisen“ |
| 7 | 6.2 | „Eisen-Kohlenstoff-Diagramm im Überblick“ | „Wärmebehandlung von Stahl“ |
| 8 | 6.2 | „Keramik und Verbundwerkstoffe“ | „Kunststoffe“ |
| 9 | 6.3 | „Biegeversuch“ | „Kerbschlagbiegeversuch“ |
| 10 | 6.3 | „Dauerschwingversuch“ | Abschnitt 9 |

**Hinweis zur Prüfung:** Die Texte beschreiben gesichertes Fachwissen (Normen DIN EN ISO 286, DIN EN ISO 1101, ISO 2768-1 und -2, DIN EN 10027-1, ISO-Metrisches Gewinde, Festigkeitsklassen von Schrauben). Normzahlen und Tabellenwerte (IT-Grundtoleranzen, Abmaße, Allgemeintoleranzen, Steigungen, Faktoren der Legierungselemente) sind als Beispielwerte gekennzeichnet; die jeweilige Norm bleibt maßgeblich, und die Werte gehören zur fachlichen Prüfung. Rechtsnahes kommt nicht vor.

---

## 1. TQ2 6.1 — Oberflächenangaben

**Einfügen:** Neuer Abschnitt `### Oberflächenangaben` nach „Bemaßung“.

> Reale Oberflächen sind nie ideal glatt; ihre Feingestalt wird als **Rauheit** beschrieben. Die gebräuchlichsten Kenngrößen sind der **Mittenrauwert Ra** (arithmetischer Mittelwert der Abweichungen des Profils von der Mittellinie) und die **gemittelte Rautiefe Rz** (Abstand zwischen höchster Profilspitze und tiefstem Profiltal, gemittelt über mehrere Einzelmessstrecken). Beide werden in Mikrometern (µm) angegeben, Rz ist stets größer als Ra (Richtwert: etwa das Vier- bis Siebenfache). In der Zeichnung steht die geforderte Rauheit als **Oberflächensymbol** an der Kante der Fläche, zum Beispiel „Ra 1,6“; ein Zusatz kann angeben, ob die Fläche bearbeitet werden muss (spanend) oder unbearbeitet bleiben darf. Ist die gesamte Oberfläche eines Teils gleich, genügt eine Sammelangabe im Schriftfeld.
>
> Welche Rauheit sich erreichen lässt, hängt vom Fertigungsverfahren ab (Richtwerte): Schruppen etwa Ra 12,5 µm, Schlichten (Drehen, Fräsen) etwa Ra 1,6 bis 3,2 µm, Schleifen etwa Ra 0,4 bis 0,8 µm, Honen, Läppen und Polieren unter Ra 0,2 µm. Je feiner die geforderte Rauheit, desto höher der Fertigungsaufwand; gleitende Passflächen, Dichtflächen und Lagersitze benötigen feinere Oberflächen als freie Flächen. Die Rauheit beeinflusst außerdem die Dauerfestigkeit: Kerben und Riefen senken sie (siehe Dauerschwingversuch).
>
> *Beispiel:* Fünf Einzelrautiefen einer gedrehten Fläche: 6,1; 5,9; 6,4; 6,0 und 6,1 µm. Die gemittelte Rautiefe ist Rz = (6,1 + 5,9 + 6,4 + 6,0 + 6,1) µm / 5 = **6,1 µm**. Fordert die Zeichnung für die Lagerstelle der Welle Ra 0,8, genügt das Drehen nicht; die Stelle muss geschliffen werden.

## 2. TQ2 6.1 — Passungssysteme: Einheitsbohrung und Einheitswelle

**Einfügen:** Neuer Abschnitt `### Passungssysteme: Einheitsbohrung und Einheitswelle` nach „Toleranzen und Passungen“.

> Um nicht für jede Bohrung und jede Welle eigene Toleranzfelder festzulegen, bildet man Passungen in **Passungssystemen**. Beim System **Einheitsbohrung** hat die Bohrung immer die Toleranzlage **H** (das Mindestmaß der Bohrung ist gleich dem Nennmaß, das untere Abmaß ist null); die Passung ergibt sich allein über die Toleranzlage der Welle. Beim System **Einheitswelle** hat die Welle immer die Toleranzlage **h** (das Höchstmaß der Welle ist gleich dem Nennmaß); die Passung ergibt sich über die Lage der Bohrung. Die Einheitsbohrung wird in der Praxis bevorzugt, weil Wellen sich leichter auf unterschiedliche Maße fertigen lassen als Bohrungen, die mit festen Werkzeugen (Reibahlen, Bohrer) und Lehren hergestellt werden. Die Einheitswelle nutzt man, wenn eine glatte, einheitliche Welle (blanker Stahl) mehrere Teile mit unterschiedlichen Passungen tragen soll.
>
> Eine Passung wird als Bruch geschrieben: Nennmaß, Toleranzfeld der Bohrung, Toleranzfeld der Welle, zum Beispiel **Ø40 H7/g6**. Lagebuchstaben der Welle: **a bis h** (Spiel bis null), **j bis n** (Übergang), **p bis zc** (Übermaß). In der Einheitsbohrung ergeben sich daraus zum Beispiel H7/f7 (Spielpassung für leichten Lauf), H7/k6 (Übergangspassung für Teile, die sich nur mit Aufwand lösen lassen) und H7/p6 (Presspassung).
>
> Für das **Spiel** gilt: **Höchstspiel = Höchstmaß der Bohrung − Mindestmaß der Welle**, **Mindestspiel = Mindestmaß der Bohrung − Höchstmaß der Welle**. Ist das Mindestspiel negativ, liegt ein Übermaß vor. *Beispiel Ø40 H7/g6* (Abmaße nach DIN EN ISO 286 für den Nennmaßbereich über 30 bis 50 mm, Beispielwerte): Bohrung H7: oberes Abmaß +25 µm, unteres 0, also Höchstmaß 40,025 mm und Mindestmaß 40,000 mm. Welle g6: oberes Abmaß −9 µm, unteres −25 µm, also Höchstmaß 39,991 mm und Mindestmaß 39,975 mm. Höchstspiel = 40,025 mm − 39,975 mm = **0,050 mm**; Mindestspiel = 40,000 mm − 39,991 mm = **0,009 mm**. Beide Werte sind positiv: Es liegt immer Spiel vor, die Passung ist eine Spielpassung. *Gegenbeispiel Ø40 H7/p6* (Welle +42 µm / +26 µm): Höchstübermaß 40,042 mm − 40,000 mm = 0,042 mm, Mindestübermaß 40,026 mm − 40,025 mm = 0,001 mm; die Welle ist stets größer als die Bohrung, es liegt eine Presspassung vor.

## 3. TQ2 6.1 — Form- und Lagetoleranzen

**Einfügen:** Neuer Abschnitt `### Form- und Lagetoleranzen` nach „Passungssysteme: Einheitsbohrung und Einheitswelle“.

> Maßtoleranzen allein sichern die Funktion nicht: Eine Welle kann in allen Durchmessern im Toleranzbereich liegen und trotzdem krumm sein. Deshalb legt man mit **Form- und Lagetoleranzen** (DIN EN ISO 1101) die geometrische Gestalt eines Elements und seine Lage zu anderen Elementen fest. Die **Toleranzzone** ist ein Raum, in dem das Element liegen muss; ihre Breite ist der angegebene Toleranzwert in Millimetern.
>
> **Formtoleranzen** beschränken die Gestalt eines einzelnen Elements und brauchen **keinen Bezug**: **Geradheit**, **Ebenheit**, **Rundheit** (jeder Querschnitt eines Zylinders liegt zwischen zwei konzentrischen Kreisen) und **Zylinderform**. **Lagetoleranzen** beziehen sich auf ein **Bezugselement** (Bezugsbuchstabe, zum Beispiel A) und gliedern sich in **Richtungstoleranzen** (Parallelität, Rechtwinkligkeit, Neigung), **Ortstoleranzen** (Position, Koaxialität bzw. Konzentrizität, Symmetrie) und **Lauftoleranzen** (Rundlauf und Planlauf, gemessen bei Drehung um die Bezugsachse).
>
> In der Zeichnung steht die Toleranz im **Toleranzrahmen**: links das Symbol der Toleranzart, dann der Toleranzwert (bei kreisförmiger Zone mit dem Durchmesserzeichen), bei Lagetoleranzen zusätzlich der Bezugsbuchstabe. Ein Bezugsdreieck mit demselben Buchstaben markiert das Bezugselement. *Beispiel:* Bei einer Antriebswelle der Vantera soll der Lagersitz zur Wellenachse (Bezug A, gebildet durch die beiden Lagersitze) einen **Rundlauf von 0,02 mm** haben. Der Rahmen enthält das Rundlauf-Symbol, den Wert 0,02 und den Bezug A. Bei einem Rundlaufmessgerät darf der Zeiger über eine volle Umdrehung nur 0,02 mm ausschlagen. Eine Ebenheitstoleranz von 0,05 mm an einer Dichtfläche bedeutet dagegen, dass die Fläche zwischen zwei parallelen Ebenen im Abstand von 0,05 mm liegen muss; sie hat keinen Bezug. Der Rundlauf erfasst Rundheit und Koaxialität gemeinsam, deshalb ist er für rotierende Teile die aussagekräftigste und zugleich am einfachsten prüfbare Angabe.

## 4. TQ2 6.1 — Allgemeintoleranzen

**Einfügen:** Neuer Abschnitt `### Allgemeintoleranzen` nach „Form- und Lagetoleranzen“.

> Würde jedes Maß einzeln toleriert, wäre die Zeichnung unleserlich. Für Maße ohne eigene Toleranzangabe gelten deshalb **Allgemeintoleranzen**. Für Längen- und Winkelmaße spanend gefertigter Teile legt ISO 2768-1 vier **Toleranzklassen** fest: **f** (fein), **m** (mittel), **c** (grob) und **v** (sehr grob). Die Klasse wird im Schriftfeld angegeben (zum Beispiel „ISO 2768-m“); ISO 2768-2 regelt entsprechend allgemeine Form- und Lagetoleranzen mit den Klassen H, K und L. Die zulässige Abweichung hängt vom Nennmaßbereich ab: Je größer das Maß, desto größer die Toleranz. *Beispielwerte aus der Tabelle für Längenmaße* (die Norm ist maßgeblich): Klasse m: bis 6 mm ±0,1 mm; über 6 bis 30 mm ±0,2 mm; über 30 bis 120 mm ±0,3 mm; über 120 bis 400 mm ±0,5 mm. Klasse f: bis 6 mm ±0,05 mm; über 6 bis 30 mm ±0,1 mm; über 30 bis 120 mm ±0,15 mm; über 120 bis 400 mm ±0,2 mm.
>
> *Beispiel:* Ein Maß von 50 mm ohne Toleranzangabe auf einer Zeichnung mit „ISO 2768-m“ liegt zwischen 50 mm − 0,3 mm = **49,7 mm** und 50 mm + 0,3 mm = **50,3 mm**. Mit Klasse f lägen die Grenzen bei 49,85 mm und 50,15 mm. Gilt eine Passung (zum Beispiel H7/g6), steht ihre Toleranz ausdrücklich in der Zeichnung; Allgemeintoleranzen decken nur die unbedeutenden Maße ab. Die Klasse wählt die Konstruktion nach den Möglichkeiten der Werkstatt: Die Klasse m ist für normale Fertigung mit geringem Aufwand erreichbar, die Klasse f erfordert genauere Maschinen und Messmittel.

## 5. TQ2 6.1 — Gewinde und Schraubenfestigkeit

**Einfügen:** Neuer Abschnitt `### Gewinde und Schraubenfestigkeit` nach „Normung: Linienarten, Maßstäbe und Schriftfeld“.

> Das gebräuchlichste Befestigungsgewinde ist das **metrische ISO-Gewinde** (Kurzzeichen **M**). Die Bezeichnung nennt den **Nenndurchmesser** in Millimetern, bei Feingewinde zusätzlich die **Steigung** P, die der Gewindegang je Umdrehung zurücklegt: **M10** ist ein Regelgewinde mit 10 mm Nenndurchmesser, **M10×1** ein Feingewinde mit 1 mm Steigung. Regelgewinde haben zu jedem Durchmesser genau eine Steigung (zum Beispiel M6: 1 mm, M8: 1,25 mm, M10: 1,5 mm, M12: 1,75 mm). Rechtsgewinde sind der Normalfall; ein Linksgewinde erhält den Zusatz **LH**. **Feingewinde** sichern besser gegen selbstständiges Lösen und erlauben feinfühliges Einstellen, haben aber weniger tragende Tiefe pro Windung und sind empfindlicher.
>
> Für das Innengewinde bohrt man zunächst ein **Kernloch**, dessen Durchmesser etwa **Nenndurchmesser − Steigung** beträgt: für M10 etwa 10 mm − 1,5 mm = **8,5 mm**. Der Kerndurchmesser eines Bolzengewindes beträgt d₃ ≈ d − 1,2269 · P; für M10 ergibt das etwa 8,16 mm. Die Festigkeit einer Schraube gibt die **Festigkeitsklasse** an, zum Beispiel **8.8**: Die erste Zahl mal 100 ist die Mindestzugfestigkeit in N/mm² (hier 800 N/mm²), die zweite Zahl durch 10 ist das Verhältnis von Streckgrenze zu Zugfestigkeit (hier 0,8, also 640 N/mm²). *Beispiel:* Der Spannungsquerschnitt einer M10-Schraube beträgt rund 58 mm². Die Bruchkraft einer Schraube der Klasse 8.8 beträgt etwa 800 N/mm² · 58 mm² = **46.400 N = 46,4 kN**, die Kraft an der Streckgrenze etwa 640 N/mm² · 58 mm² = 37,1 kN. Im Betrieb wird die Schraube nur mit einem Teil dieser Kraft belastet.

## 6. TQ2 6.2 — Werkstoffkurznamen lesen

**Einfügen:** Neuer Abschnitt `### Werkstoffkurznamen lesen` nach „Eisenwerkstoffe: Stahl und Gusseisen“.

> Stähle werden nach DIN EN 10027-1 mit **Kurznamen** bezeichnet, die den Werkstoff beschreiben. Es gibt zwei Hauptgruppen. **Gruppe 1** nennt den Verwendungszweck und die mechanische Eigenschaft: **S235JR** bedeutet Stahl für den Stahlbau (S) mit einer **Mindeststreckgrenze von 235 N/mm²**; die Zusätze JR, J0 und J2 geben die Prüftemperatur der Kerbschlagarbeit an (27 J bei +20 °C, 0 °C und −20 °C). Weitere Anfangsbuchstaben sind E (Maschinenbau) und P (Druckbehälter). **Gruppe 2** nennt die chemische Zusammensetzung:
>
> - **Unlegierte Stähle:** Buchstabe **C** und das Hundertfache des mittleren Kohlenstoffgehalts. **C45** hat etwa 0,45 % Kohlenstoff.
> - **Niedriglegierte Stähle** (kein Legierungselement über 5 %): Das Hundertfache des Kohlenstoffgehalts, dann die Symbole der Legierungselemente nach abnehmendem Gehalt, zuletzt die Gehalte der Elemente, jeweils mit einem **Faktor** multipliziert. **42CrMo4** hat etwa 0,42 % Kohlenstoff, Chrom (Gehalt 4, Faktor 4, also etwa 1 % Chrom) und Molybdän. Faktoren: 4 für Cr, Co, Mn, Ni, Si, W; 10 für Al, Cu, Mo, Ti, V; 100 für C, N, P, S.
> - **Hochlegierte Stähle** (Legierungselement über 5 %): Beginn mit **X**, dann Kohlenstoffgehalt mal 100, Elemente und ihre Gehalte in Prozent ohne Faktor. **X5CrNi18-10** hat etwa 0,05 % Kohlenstoff, 18 % Chrom und 10 % Nickel (rostfreier Stahl).
>
> **Gusseisen** wird mit **EN-GJ** begonnen: Das nächste Zeichen nennt die Graphitform (L Lamellen-, S Kugelgraphit), dann folgt die Mindestzugfestigkeit: **EN-GJL-200** ist Gusseisen mit Lamellengraphit und 200 N/mm² Mindestzugfestigkeit. Neben dem Kurznamen kann der Werkstoff eine **Werkstoffnummer** erhalten (zum Beispiel 1.0038 für S235JR; die erste Ziffer 1 steht für Stahl). Aluminiumlegierungen werden in der Praxis über vierstellige Nummern bezeichnet (zum Beispiel EN AW-6082).
>
> *Beispiel:* Für den Zugstab aus **S355** mit einem Querschnitt von 100 mm² beträgt die Kraft an der Streckgrenze mindestens F = Re · A = 355 N/mm² · 100 mm² = 35.500 N = **35,5 kN**. Bleibt die Last darunter, verformt sich das Bauteil nur elastisch.

## 7. TQ2 6.2 — Eisen-Kohlenstoff-Diagramm im Überblick

**Einfügen:** Neuer Abschnitt `### Eisen-Kohlenstoff-Diagramm im Überblick` nach „Wärmebehandlung von Stahl“.

> Das **Eisen-Kohlenstoff-Diagramm** zeigt, welches Gefüge Eisen-Kohlenstoff-Legierungen bei welcher Temperatur und welchem Kohlenstoffgehalt haben. Auf der waagerechten Achse steht der Kohlenstoffgehalt in Masseprozent, auf der senkrechten die Temperatur. Drei Punkte genügen für den Überblick: bei **0,8 % C** und **723 °C** der **eutektoide Punkt**, bei **2,06 % C** die Grenze zwischen Stahl und Gusseisen (die größte Kohlenstoffmenge, die das Eisen im Austenit löst) und bei **4,3 % C** und **1147 °C** der **eutektische Punkt**.
>
> Die wichtigen **Gefügebestandteile**: **Ferrit** (praktisch reines Eisen, weich, zäh, magnetisch), **Austenit** (bei hoher Temperatur beständig, unmagnetisch, gut verformbar, löst viel Kohlenstoff), **Zementit** (Eisencarbid Fe₃C mit 6,67 % C, sehr hart und spröde), **Perlit** (feine Schichten aus Ferrit und Zementit mit 0,8 % C, fest und mäßig zäh) und **Ledeburit** (bei Gusseisen, hart und spröde). Stähle mit weniger als 0,8 % Kohlenstoff (untereutektoid) bestehen bei Raumtemperatur aus Ferrit und Perlit, Stähle mit mehr als 0,8 % (übereutektoid) aus Perlit und Zementit. Mit steigendem Kohlenstoffgehalt nehmen Härte und Festigkeit zu, Zähigkeit und Schweißbarkeit ab.
>
> Das **Härten** nutzt das Diagramm: Der Stahl wird bis in das Austenitgebiet erhitzt (**Austenitisieren**) und dann so schnell abgeschreckt, dass sich der Kohlenstoff nicht mehr ausscheiden kann; es entsteht **Martensit**, ein sehr hartes, sprödes Gefüge. Gut härtbar sind Stähle mit mindestens etwa 0,3 % Kohlenstoff. Das anschließende Anlassen baut Spannungen ab (vgl. „Wärmebehandlung von Stahl“).
>
> *Beispiel:* Ein Stahl C45 mit 0,45 % Kohlenstoff besteht bei Raumtemperatur näherungsweise (Ferrit mit praktisch 0 % C) aus **0,45 / 0,8 = 56 % Perlit** und 44 % Ferrit. Ein C60 hat 0,60 / 0,8 = 75 % Perlit und ist deshalb fester und härter, aber weniger zäh.

## 8. TQ2 6.2 — Keramik und Verbundwerkstoffe

**Einfügen:** Neuer Abschnitt `### Keramik und Verbundwerkstoffe` nach „Kunststoffe“.

> **Technische Keramik** besteht aus anorganischen, nichtmetallischen Pulvern (zum Beispiel Aluminiumoxid Al₂O₃, Siliciumcarbid SiC, Siliciumnitrid), die zu Formteilen gepresst und bei hoher Temperatur gesintert werden. Sie ist **sehr hart**, **verschleißfest**, **hitze- und korrosionsbeständig**, hat eine **hohe Druckfestigkeit** und isoliert elektrisch und thermisch. Ihr Nachteil ist die **Sprödigkeit**: Sie verformt sich nicht plastisch, Zugspannungen und Schlagbeanspruchung führen zum Bruch. Nachbearbeitung ist nur durch Schleifen möglich. Typische Anwendungen sind Schneidplatten, Gleit- und Dichtringe, Lagerelemente und Isolatoren.
>
> **Verbundwerkstoffe** kombinieren zwei oder mehr Stoffe, um deren Vorteile zu nutzen: eine **Matrix** (umschließender Stoff) und eine **Verstärkung** (Fasern, Partikel, Schichten). Beispiele: **GFK** (glasfaserverstärkter Kunststoff) und **CFK** (kohlenstofffaserverstärkter Kunststoff) mit Fasern in einer Kunststoffmatrix, **Hartmetall** (Hartstoffpartikel in einer Metallmatrix, für Schneidwerkzeuge), **Stahlbeton**. Verbundwerkstoffe sind **richtungsabhängig** (anisotrop): Die Festigkeit ist in Faserrichtung hoch und quer dazu gering. Vorteile sind hohe spezifische Festigkeit bei geringer Dichte und Korrosionsbeständigkeit; Nachteile sind der Aufwand bei Fertigung und Reparatur, die Gefahr der Delamination (Ablösen der Schichten) und das schwierige Recycling.
>
> *Beispiel (Richtwerte der Dichte: Stahl etwa 7,85 kg/dm³, CFK etwa 1,6 kg/dm³):* Ein Bauteil mit 2,0 dm³ Volumen wiegt aus Stahl 2,0 · 7,85 = 15,7 kg, aus CFK 2,0 · 1,6 = 3,2 kg. Die **Gewichtseinsparung** beträgt 12,5 kg oder **rund 80 %**. Ob sich der Wechsel lohnt, hängt von Kosten, Lasten und Fertigung ab (CFK-Teile sind teurer und lassen sich nicht wie Stahl spanend bearbeiten).

## 9. TQ2 6.3 — Biegeversuch

**Einfügen:** Neuer Abschnitt `### Biegeversuch` nach „Kerbschlagbiegeversuch“.

> Der **Biegeversuch** prüft das Verhalten eines Werkstoffs bei Biegebeanspruchung. Beim **Dreipunkt-Biegeversuch** liegt die Probe auf zwei Auflagern (Stützweite l), und in der Mitte drückt ein Stempel mit der Kraft F. Gemessen werden Kraft und **Durchbiegung**. Der Versuch wird vor allem bei **spröden Werkstoffen** (Keramik, Gusseisen, Hartmetall) eingesetzt, bei denen ein Zugversuch wegen der Einspannung schwierig ist, sowie als **Faltversuch** zur Beurteilung der Umformbarkeit und von Schweißnähten (die Probe wird um einen Dorn gebogen und auf Risse geprüft).
>
> Für eine Probe mit **Rechteckquerschnitt** (Breite b, Höhe h) beträgt die größte Biegespannung (an Ober- und Unterseite in der Mitte) **σ_b = 3 · F · l / (2 · b · h²)**. Die **Biegefestigkeit** ist die Biegespannung bei Bruch. *Beispiel:* Eine Keramikprobe (b = 10 mm, h = 5 mm, Stützweite l = 80 mm) bricht bei F = 1.200 N. Dann ist σ_b = 3 · 1.200 N · 80 mm / (2 · 10 mm · (5 mm)²) = 288.000 N·mm / 500 mm³ = **576 N/mm²**. Weil die Höhe quadratisch eingeht, trägt eine doppelt so hohe Probe bei gleicher Spannung die vierfache Kraft.

## 10. TQ2 6.3 — Dauerschwingversuch

**Einfügen:** Neuer Abschnitt `### Dauerschwingversuch` nach „Biegeversuch“.

> Bauteile wie Wellen, Federn und Pleuel versagen oft nicht durch eine einzige große Kraft, sondern durch **wiederholte Belastung** weit unter der Zugfestigkeit (**Ermüdung**). Der **Dauerschwingversuch** (Wöhler-Versuch) belastet Proben mit einer sich periodisch ändernden Spannung und zählt die **Lastspiele** N bis zum Bruch. Man unterscheidet **wechselnde** Belastung (Spannung wechselt zwischen Zug und Druck, **Spannungsverhältnis R = σ_u / σ_o = −1**) und **schwellende** Belastung (Spannung bleibt auf einer Seite, R = 0 zwischen 0 und σ_o). Die **Spannungsamplitude** ist σ_a = (σ_o − σ_u) / 2, die **Mittelspannung** σ_m = (σ_o + σ_u) / 2.
>
> Die Ergebnisse trägt man im **Wöhler-Diagramm** auf: Spannungsamplitude über der Lastspielzahl (logarithmisch). Im Bereich der **Zeitfestigkeit** hält die Probe nur eine begrenzte Lastspielzahl aus. Liegt die Amplitude unter der **Dauerfestigkeit**, hält sie die Belastung beliebig lange aus. Für Stahl gilt eine ausgeprägte Dauerfestigkeit bei etwa 10⁷ Lastspielen (Grenzlastspielzahl); Aluminium hat keine ausgeprägte Dauerfestigkeit, es wird ersatzweise ein Wert bei einer hohen Lastspielzahl angegeben. Der **Dauerbruch** beginnt an einer Kerbe, Riefe oder einem Fehler an der Oberfläche, wächst als glatte Bruchfläche mit Rastlinien und endet im **Restgewaltbruch**. Feinere Oberflächen, Verrundungen statt scharfer Kanten und Eigenspannungen aus Randschichthärten verbessern die Dauerfestigkeit.
>
> *Beispiel:* Eine Welle wechselt zwischen +200 N/mm² und −200 N/mm²: Spannungsamplitude σ_a = (200 − (−200)) / 2 = **200 N/mm²**, Mittelspannung 0, R = **−1**. Bei einer Belastung zwischen 0 und 300 N/mm² (schwellend) ist σ_a = 150 N/mm² und σ_m = 150 N/mm². Läuft die Prüfmaschine mit 50 Hz, dauern 10⁷ Lastspiele 10⁷ / 50 s = 200.000 s oder rund **55,6 Stunden**.

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei P1: (1) Abschnitte in die Themenfiles 6.1 bis 6.3 einarbeiten (LF, Hausregeln, Validierung, Import); (2) Entwurf der Karteikarten und Quizfragen (je Abschnitt 3 bis 4 Items, davon einige Rechen- und Leseaufgaben: Spiel berechnen, Kurznamen lesen, Gefügeanteil, Biegespannung, Spannungsamplitude); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgabe nachziehen.

## Zu entscheiden

1. **Umfang:** zehn kurze Abschnitte, wie vorgeschlagen? Alternativ kürzer: Gewinde (Abschnitt 5) und Keramik/Verbundwerkstoffe (Abschnitt 8) streichen oder in ein späteres Paket verschieben (Fügetechnik in P3 enthält ohnehin Schrauben).
2. **Normwerte (Abschnitte 2, 4, 5, 6):** Die Abmaße (g6, p6, H7), die Allgemeintoleranzen (m, f), die Steigungen und die Legierungsfaktoren sind Beispielwerte aus den Tabellen der Normen; ich hatte keinen Zugriff auf die Normtexte. Soll die fachliche Prüfung vor dem Einarbeiten oder danach erfolgen? Ich empfehle: einarbeiten (Hinweis im Text) und mit der Zweitlesung der Primärtexte in Iteration 22 prüfen.
3. **Gewinde und Festigkeitsklasse:** Die Schraubenfestigkeit (8.8) ist auch Teil der Fügetechnik in P3. Einverstanden, dass sie hier schon steht und P3 darauf verweist?
4. **Abschnitt 9, Rechenformel:** Die Biegespannung wird nur für den Rechteckquerschnitt im Dreipunktversuch gerechnet. Einverstanden?
5. **Nicht enthalten, bitte sagen, falls gewünscht:** Härtevergleich mit Umrechnungstabellen, Wärmebehandlung im Detail (ZTU-Diagramme), Korrosion und Korrosionsschutz, Oberflächenbehandlung (Beschichten), Zeichnungsableitung (Explosionszeichnung), Aluminium- und Kupferlegierungen im Detail, Kunststoffkurzzeichen (PA, PE und andere).
