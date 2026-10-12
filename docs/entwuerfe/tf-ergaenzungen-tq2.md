# Entwurf: Ergänzungen zu Zeichnen und Werkstoffen (Technischer Fachwirt, TQ2, Themen 6.1 bis 6.3)

Stand 12.10.2026 · **vom Projektleiter angenommen („alle Vorschläge umsetzen, nochmal per Agent prüfen“), unabhängig fachlich geprüft und am 12.10.2026 in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: Die Themen, die in den Paketen P1 bis P6 bisher unter „Nicht enthalten“ standen, sollen doch aufgenommen werden. Für TQ2 sind das die Punkte aus dem Entwurf `docs/entwuerfe/tf-rahmenplan-p2-zeichnen-werkstoffe.md` (Abschnitt „Zu entscheiden“, Punkt 5): Härtevergleich mit Umrechnung, Wärmebehandlung im Detail (ZTU-Diagramm), Korrosion und Korrosionsschutz, Aluminium- und Kupferlegierungen im Detail, Kunststoffkurzzeichen und Zeichnungsableitung. Die dort ebenfalls genannte Oberflächenbehandlung (Beschichten) ist in Abschnitt 3 (Korrosionsschutz) enthalten.

## Was vorliegt

Sechs neue Theorieabschnitte. Sie knüpfen an die vorhandenen Abschnitte der Themenfiles 6.1 bis 6.3 an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Die Befunde der unabhängigen Fachprüfung (`docs/entwuerfe/pruefung-tq2.md`, 39 Befunde) sind eingearbeitet (siehe „Prüfergebnis eingearbeitet“). Alle Zahlenbeispiele, auch die durch die Prüfung hinzugekommenen, habe ich mit einem Skript nachgerechnet (siehe „Rechenprüfung“). Stellen, an denen der Bestand in `content/` angepasst werden sollte, stehen am Dateiende unter „Bestandsänderungen für die Projektleitung“; der Entwurf ist so formuliert, dass er dem Bestand auch ohne diese Änderungen nicht widerspricht.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 6.3 | „Härteprüfung rechnen und Härtewerte vergleichen“ | „Härteprüfverfahren“ |
| 2 | 6.2 | „Wärmebehandlung im Detail: Abkühlgeschwindigkeit, ZTU-Diagramm und Verfahren“ | „Eisen-Kohlenstoff-Diagramm im Überblick“ |
| 3 | 6.2 | „Korrosionsarten und Korrosionsschutz im Detail“ | „Werkstoffeigenschaften“ |
| 4 | 6.2 | „Aluminium- und Kupferlegierungen“ | „Nichteisenmetalle (NE-Metalle)“ |
| 5 | 6.2 | „Kunststoffarten und Kurzzeichen“ | „Kunststoffe“ |
| 6 | 6.1 | „Zeichnungsarten und Zeichnungsableitung“ | „Stücklisten“ |

**Hinweis zur Prüfung:** Die Texte beschreiben gesichertes Fachwissen. Alle Zahlenwerte, die nicht unmittelbar aus einer Norm stammen (Temperaturen, Schichtdicken, Abtragraten, Wärmeausdehnungskoeffizienten, Dauergebrauchstemperaturen), sind im Text als „Richtwert“ oder „Beispielwert“ gekennzeichnet. Normen sind nur dort genannt, wo sie sicher bekannt sind; Tabellenwerte (Standardpotenziale, Umrechnung HV/HRC) gehören zur fachlichen Prüfung. Rechtsnahes (Gefahrstoffe, Arbeitsschutz, Stoffbeschränkungen) kommt nicht vor.

---

## 1. TQ2 6.3 — Härteprüfung rechnen und Härtewerte vergleichen

**Einfügen:** Neuer Abschnitt `### Härteprüfung rechnen und Härtewerte vergleichen` nach „Härteprüfverfahren“.

> Härtewerte werden als **Zahl ohne Einheit** angegeben, gefolgt vom Kurzzeichen des Verfahrens und, bei Brinell und Vickers, den Prüfbedingungen; der Wert hat nur zusammen mit dem Verfahren und diesen Bedingungen Aussagekraft. Bei der **Brinell-Härte** wird eine Hartmetallkugel (Kurzzeichen **HBW**; das W steht für Wolframcarbid; die früher übliche Stahlkugel, Kurzzeichen HBS, ist nicht mehr genormt) mit der Prüfkraft F in die Oberfläche gedrückt. Aus dem mittleren **Eindruckdurchmesser d** ergibt sich die gekrümmte Oberfläche des Eindrucks (Kugelkalotte), und die Härte ist die Prüfkraft bezogen auf diese Fläche:
>
> **HBW = 0,102 · 2 · F / (π · D · (D − √(D² − d²)))**
>
> Dabei ist F die Prüfkraft in N, D der Kugeldurchmesser in mm und d der Eindruckdurchmesser in mm. Der Faktor 0,102 stammt aus der früheren Krafteinheit Kilopond (1 kp ≈ 9,81 N) und rechnet die Kraft in diese Einheit um. Bei Stahl wird als Prüfbedingung häufig eine Kugel mit D = 10 mm und F = 29.420 N gewählt; das Verhältnis 0,102 · F / D² (der **Beanspruchungsgrad**) beträgt dann 30. Der Eindruckdurchmesser sollte in einem bestimmten Bereich zum Kugeldurchmesser liegen (Richtwert: etwa 0,24 · D bis 0,6 · D, also 2,4 bis 6,0 mm bei D = 10 mm); liegt d außerhalb, wählt man Kraft oder Kugel anders.
>
> *Beispiel Brinell:* Ein Stababschnitt aus Vergütungsstahl wird mit D = 10 mm und F = 29.420 N geprüft; der Eindruck misst d = 4,0 mm. Zuerst √(D² − d²) = √(100 − 16) = √84 = 9,165 mm, also D − √(D² − d²) = 10 − 9,165 = 0,835 mm. Der Nenner ist π · 10 · 0,835 = 26,23 mm². Der Zähler ist 0,102 · 2 · 29.420 = 6.001,7. Damit gilt HBW = 6.001,7 / 26,23 = **rund 229**. Der Eindruck liegt im zulässigen Bereich (2,4 bis 6,0 mm). Als Härteangabe schreibt man **229 HBW 10/3000**: Härtewert, Verfahren, Kugeldurchmesser in mm und Kraftkennzahl (3000 entspricht einer Prüfkraft von 3000 kp, also 29.420 N).
>
> Die **Vickers-Härte (HV)** verwendet eine Diamantpyramide mit quadratischer Grundfläche (Flächenwinkel 136°). Gemessen wird der Mittelwert der beiden Diagonalen d (in mm) des Eindrucks; es gilt **HV ≈ 0,1891 · F / d²** (F in N). Bei Vickers sind die Eindrücke geometrisch ähnlich, deshalb kann derselbe Wert mit verschiedenen Prüfkräften ermittelt werden; die Prüfkraft gehört in die Angabe (HV 10 bedeutet 10 kp, also 98,07 N). Das Verfahren deckt weiche bis sehr harte Werkstoffe ab und wird mit kleinen Prüfkräften (Kleinlasthärte) auch an dünnen Schichten und im Härteverlauf einer Randschicht eingesetzt.
>
> *Beispiel Vickers:* Bei F = 98,07 N und einer mittleren Diagonale von 0,25 mm ist HV = 0,1891 · 98,07 / 0,25² = 18,54 / 0,0625 = **rund 297**. Die Härteangabe lautet **297 HV 10**.
>
> Beim **Rockwell-Verfahren** wird nicht der Eindruck vermessen, sondern die **bleibende Eindringtiefe**: Zuerst wird eine Vorkraft aufgebracht (Nullstellung), dann die zusätzliche Prüfkraft, danach wird auf die Vorkraft entlastet und die bleibende Tiefenzunahme e gemessen. Bei der Skala **HRC** (Diamantkegel, für gehärteten Stahl; Anwendungsbereich etwa 20 bis 70 HRC) gilt **HRC = 100 − e / 0,002 mm**: Je tiefer der Eindruck, desto kleiner die Zahl. Die Skala **HRB** (Kugel) dient für weichere Werkstoffe; für sie gilt entsprechend **HRB = 130 − e / 0,002 mm**, die Formel der HRC-Skala darf also nicht auf HRB übertragen werden. Rockwell ist sehr schnell und gut für die Serienprüfung in der Fertigung, weil das Gerät den Wert direkt anzeigt.
>
> *Beispiel Rockwell:* e = 0,100 mm ergibt HRC = 100 − 0,100 / 0,002 = 100 − 50 = **50 HRC**. Bei einer weicheren Probe mit e = 0,070 mm auf der Skala HRB ergibt sich HRB = 130 − 0,070 / 0,002 = 130 − 35 = **95 HRB**.
>
> | Verfahren | Prüfkörper | Messgröße | Typische Anwendung |
> |---|---|---|---|
> | Brinell (HBW) | Hartmetallkugel | Eindruckdurchmesser | weiche bis mittelharte Werkstoffe, Guss, grobes Gefüge |
> | Vickers (HV) | Diamantpyramide | Eindruckdiagonalen | alle Härtebereiche, dünne Teile und Schichten, Härteverlauf |
> | Rockwell (HRC, HRB) | Diamantkegel, Kugel | bleibende Eindringtiefe | schnelle Prüfung in der Fertigung, gehärteter Stahl (HRC) |
>
> Alle Verfahren verlangen eine ebene, saubere Oberfläche, eine ausreichend dicke Probe (auf der Rückseite darf keine Verformung zu sehen sein) und genügend Abstand der Eindrücke zum Rand und zueinander; sonst liefert die Messung zu niedrige Werte.
>
> Die Härte hängt eng mit der Festigkeit zusammen. Für **unlegierte und niedriglegierte Stähle** gilt als **Faustregel (Richtwert)**: **Zugfestigkeit Rm ≈ 3,5 · HB** (Rm in N/mm²). *Beispiel:* Der Stab mit 229 HBW hat Rm ≈ 3,5 · 229 = 801, also etwa **800 N/mm²**. Wird im Wareneingang bei Material mit der Zeugnisangabe Rm = 800 N/mm² diese Härte gemessen, ist das plausibel. Weicht der Wert deutlich ab (Anhalt: mehr als etwa 10 %), ist das ein Anlass zur Nachprüfung: Die Härte wird an mehreren Stellen wiederholt, Zeugnis und Charge werden abgeglichen und gegebenenfalls wird ein Zugversuch an einer Probe durchgeführt. Allein aus der Härte lässt sich die Zugfestigkeit nur näherungsweise abschätzen, die Faustregel streut selbst um einige Prozent. Sie gilt nicht für alle Werkstoffe: Für Aluminium, Kupfer und austenitische Stähle ist der Faktor anders, für Gusseisen gilt sie nicht.
>
> Zwischen den Härteskalen gibt es **keine exakte Umrechnung**, sondern nur **Richtwert-Tabellen** (für Stahl in DIN EN ISO 18265). Der Grund: Die Verfahren messen Verschiedenes (Eindruckfläche, Diagonale, Tiefe), verwenden verschiedene Prüfkörper und Prüfkräfte, und beim Eindringen spielen Kaltverfestigung und elastische Rückfederung des Werkstoffs mit, die sich von Werkstoff zu Werkstoff unterscheiden. Die Tabellen beruhen auf Messreihen für eine Werkstoffgruppe (zum Beispiel unlegierte und niedriglegierte Stähle) und gelten nur dort und nur näherungsweise. Bei Zeichnungsangabe oder Abnahme prüft man deshalb möglichst in dem Verfahren, das gefordert ist. *Beispielwerte aus einer Umrechnungstabelle für Stahl (gerundet, Richtwerte):* 300 HV ≈ 30 HRC, 400 HV ≈ 41 HRC, 500 HV ≈ 49 HRC, 600 HV ≈ 55 HRC, 700 HV ≈ 60 HRC; bei geringer Härte (unter etwa 350) liegen HB und HV nah beieinander (HB ist etwas kleiner als HV).

## 2. TQ2 6.2 — Wärmebehandlung im Detail: Abkühlgeschwindigkeit, ZTU-Diagramm und Verfahren

**Einfügen:** Neuer Abschnitt `### Wärmebehandlung im Detail: Abkühlgeschwindigkeit, ZTU-Diagramm und Verfahren` nach „Eisen-Kohlenstoff-Diagramm im Überblick“.

> Das Eisen-Kohlenstoff-Diagramm gilt für sehr langsames Abkühlen (Gleichgewicht). Bei technischen Abkühlgeschwindigkeiten entscheidet auch die **Zeit** über das Gefüge. Das zeigt das **ZTU-Diagramm** (Zeit-Temperatur-Umwandlungs-Schaubild), das für einen bestimmten Stahl gilt: Auf der senkrechten Achse steht die Temperatur, auf der waagerechten die Zeit (logarithmisch). Eingezeichnet sind Abkühlkurven und die Bereiche, in denen sich die Umwandlungsprodukte bilden. Die Perlit- und Bainitgebiete liegen als „Nasen“ im Diagramm; wird die Abkühlkurve links an diesen Nasen vorbeigeführt, bleibt der Austenit bis zur waagerechten Linie der Martensitstarttemperatur Ms unterkühlt und wandelt dann in Martensit um. Das Diagramm zeigt qualitativ:
>
> - **Langsame Abkühlung** (Ofen, ruhige Luft): Der Austenit wandelt bei vergleichsweise hoher Temperatur in **Ferrit und Perlit** um. Je schneller die Abkühlung, desto feiner der Perlit und desto höher Härte und Festigkeit.
> - **Mittlere Abkühlgeschwindigkeit:** Es bildet sich **Bainit**, ein feines, nadeliges Gefüge, fest und dabei zäher als Martensit.
> - **Sehr schnelle Abkühlung** (Abschrecken): Der Austenit kann sich nicht mehr durch Diffusion umwandeln und „klappt“ unterhalb der **Martensitstarttemperatur Ms** in **Martensit** um, ein verspanntes, sehr hartes und sprödes Gefüge. Ms liegt umso tiefer, je höher der Kohlenstoffgehalt ist; bei hohem Kohlenstoffgehalt bleibt ein Teil als Restaustenit zurück.
>
> Die **kritische Abkühlgeschwindigkeit v_krit** ist die kleinste Abkühlgeschwindigkeit, bei der noch (praktisch) vollständig Martensit entsteht. Sie hängt vom Stahl ab: **Legierungselemente** wie Chrom, Molybdän, Mangan und Nickel verschieben die Perlit- und Bainitbereiche zu längeren Zeiten, v_krit sinkt. Unlegierte Stähle müssen daher meist in Wasser abgeschreckt werden, legierte Stähle härten auch in Öl oder sogar an der Luft. Mildere Abschreckung bedeutet geringeren **Verzug** und weniger **Rissgefahr**. Die Reihenfolge der Abschreckwirkung ist: Wasser stärker als Öl, Öl stärker als Luft.
>
> Bei dicken Bauteilen kühlt der Rand schneller ab als der Kern. Nur dort, wo v_krit überschritten wird, entsteht Martensit; die Tiefe dieser Zone heißt **Einhärtungstiefe**. Sie reicht von der Oberfläche bis dorthin, wo die Härte unter eine festgelegte Grenzhärte fällt (üblich ist die Stelle, an der das Gefüge noch etwa zur Hälfte aus Martensit besteht). Man unterscheidet die **Aufhärtbarkeit** (erreichbare Höchsthärte, bestimmt vom Kohlenstoffgehalt) von der **Einhärtbarkeit** (Einhärtungstiefe, bestimmt vor allem von den Legierungselementen). Beide Eigenschaften werden im **Stirnabschreckversuch** (Jominy-Versuch) ermittelt: Eine Probe wird nur an der Stirnfläche abgeschreckt, und man misst die Härte entlang der Probe; die Höchsthärte an der Stirnfläche zeigt die Aufhärtbarkeit, der Abfall der Härte mit dem Abstand zeigt die Einhärtbarkeit.
>
> *Beispiel (Beispielwerte, die Wirklichkeit hängt vom Stahl ab):* Eine Welle mit Ø 40 mm hat eine kritische Abkühlgeschwindigkeit von 30 K/s. Bei der Ölabschreckung braucht der Rand zum Abkühlen von 800 °C auf 500 °C 5 s: Abkühlgeschwindigkeit (800 − 500) K / 5 s = **60 K/s**, also über v_krit, der Rand wird martensitisch. Der Kern braucht 25 s: (800 − 500) K / 25 s = **12 K/s**, also unter v_krit, der Kern bleibt weicher (Bainit und Perlit). Liegt die Einhärtungstiefe bei 6 mm, ist ein Ring zwischen Ø 40 mm und Ø 28 mm gehärtet. Sein Anteil am Querschnitt ist π/4 · (40² − 28²) / (π/4 · 40²) = 640,9 mm² / 1.256,6 mm² = **51 %**. Für Teile, die durchgehärtet werden müssen, wählt man einen höher legierten Stahl mit kleinerem v_krit.
>
> Die Temperaturen der Verfahren richten sich nach dem Eisen-Kohlenstoff-Diagramm. Die **Austenitisierungslinie** ist die Linie, oberhalb der das Gefüge vollständig austenitisch ist: bei untereutektoiden Stählen die **GS-Linie**, die je nach Kohlenstoffgehalt zwischen 911 °C (reines Eisen) und 723 °C (0,8 % C) liegt; bei übereutektoiden Stählen die **SE-Linie**. Die waagerechte Linie bei 723 °C (**PSK-Linie**) bildet die untere Grenze, unterhalb derer kein Austenit mehr vorliegt. Beim C45 liegt die GS-Linie bei etwa 780 °C; die Härtetemperatur von etwa 800 bis 850 °C (Richtwert) liegt daher etwas darüber.
>
> Die wichtigsten **Verfahren der Wärmebehandlung** und ihre Wirkung (Temperaturen sind Richtwerte, maßgeblich sind Werkstoffblatt und Wärmebehandlungsvorschrift):
>
> - **Normalglühen:** Erwärmen etwa 30 bis 50 K über die Austenitisierungslinie (bei untereutektoiden Stählen die GS-Linie, bei übereutektoiden Stählen die SE-Linie, damit sich der Zementit löst) und Abkühlen an ruhiger Luft, also schneller als beim Weichglühen. Ergebnis: ein **feinkörniges, gleichmäßiges Gefüge**, ein Neuanfang nach Schmieden, Gießen oder Schweißen.
> - **Weichglühen:** Glühen dicht unterhalb oder um 723 °C (Richtwert etwa 650 bis 720 °C), lange halten, langsam abkühlen. Der Zementit wird kugelig eingeformt; der Stahl wird **weich** und gut **spanend bearbeitbar** oder kaltumformbar (zum Beispiel höhergekohlte Stähle).
> - **Spannungsarmglühen:** Erwärmen auf etwa 550 bis 650 °C (Richtwert), halten, langsam abkühlen. Es **verändert das Gefüge nicht**, baut aber **Eigenspannungen** ab (nach Schweißen, Richten, Zerspanen), damit das Bauteil sich später nicht verzieht.
> - **Rekristallisationsglühen:** Nach starker Kaltumformung (Richtwert etwa 550 bis 700 °C bei Stahl) bildet sich ein neues, weiches Gefüge; das Werkstück ist wieder gut umformbar. Die Kaltverfestigung wird dabei rückgängig gemacht.
> - **Härten:** Austenitisieren (bei untereutektoiden Stählen etwa 30 bis 50 K über der GS-Linie, bei übereutektoiden Stählen etwa 30 bis 50 K über 723 °C, wobei der Zementit ungelöst bleibt; für C45 etwa 800 bis 850 °C als Richtwert), kurz halten, abschrecken. Ergebnis: Martensit mit **hoher Härte, hoher Eigenspannung und Sprödigkeit**.
> - **Anlassen:** Erwärmen eines gehärteten Teils auf 150 bis 650 °C (Richtwert), halten, abkühlen. Der Martensit zerfällt teilweise, **Spannungen werden abgebaut, die Zähigkeit steigt, die Härte sinkt**. Der Zusammenhang ist qualitativ: Je höher die Anlasstemperatur, desto geringer die Härte und desto höher die Zähigkeit. Niedriges Anlassen (etwa 150 bis 250 °C) erhält fast die volle Härte (Werkzeuge, Wälzlager, Verschleißteile). Mittleres Anlassen (etwa 300 bis 500 °C) ergibt federnde Eigenschaften. Hohes Anlassen (etwa 500 bis 650 °C) liefert hohe Zähigkeit bei guter Festigkeit. Härten mit anschließendem Anlassen heißt allgemein **Vergüten** (siehe „Wärmebehandlung von Stahl“); im engeren Sinn ist damit das Härten mit hohem Anlassen gemeint, wie es für Vergütungsstähle üblich ist, zum Beispiel für Wellen aus 42CrMo4. Bei manchen legierten Stählen gibt es Temperaturbereiche, in denen die Zähigkeit zwischenzeitlich abfällt (**Anlassversprödung**); sie werden vermieden oder durch schnelles Abkühlen entschärft.
> - **Einsatzhärten:** Für **kohlenstoffarme** Stähle (etwa 0,1 bis 0,2 % C, zum Beispiel C15 oder 16MnCr5), die sich nicht direkt härten lassen. Das Bauteil wird bei etwa 880 bis 950 °C (Richtwert) in kohlenstoffabgebender Umgebung **aufgekohlt**, bis die Randschicht etwa 0,7 bis 0,8 % C enthält, danach gehärtet und niedrig angelassen. Ergebnis: **harte, verschleißfeste Randschicht und zäher Kern**, zum Beispiel für Zahnräder und Nockenwellen. Die Einsatzhärtetiefe wird bis zu einer Grenzhärte gemessen (üblich sind 550 HV) und liegt typisch bei etwa 0,5 bis 2 mm (Richtwert).
> - **Nitrieren:** Stickstoff diffundiert bei etwa 480 bis 580 °C (Richtwert) in die Oberfläche und bildet **harte Nitride**. Besonders wirksam ist das Verfahren bei **Nitrierstählen** mit nitridbildenden Elementen wie Chrom, Aluminium, Molybdän und Vanadium (zum Beispiel 31CrMoV9); bei einem unlegierten Stahl wie C45 wird die Schicht deutlich weniger hart. Es wird **nicht abgeschreckt**, deshalb sehr **geringer Verzug**; die Schicht ist dünn (etwa 0,1 bis 0,6 mm, Richtwert), sehr hart, verschleiß- und dauerfest. Geeignet für fertig bearbeitete Teile.
> - **Randschichthärten:** Nur die Oberfläche wird kurz austenitisiert (**Flamm- oder Induktionshärten**) und sofort abgeschreckt, der Kern bleibt unverändert. Geeignet für Stähle mit etwa 0,35 bis 0,6 % C (zum Beispiel C45), wenn nur örtlich Verschleißfestigkeit nötig ist, etwa an Lagersitzen. Druckeigenspannungen in der Randschicht erhöhen die Dauerfestigkeit.

## 3. TQ2 6.2 — Korrosionsarten und Korrosionsschutz im Detail

**Einfügen:** Neuer Abschnitt `### Korrosionsarten und Korrosionsschutz im Detail` nach „Werkstoffeigenschaften“.

> Die Grundlagen (Begriff, Rosten, Beschichten, Verzinken, Legieren) stehen in TQ1, Abschnitt „Korrosion und Korrosionsschutz“. Hier geht es um die **Korrosionsarten**, die Spannungsreihe und die Schutzverfahren im Einzelnen. Bei Metallen ist Korrosion meist **elektrochemisch**: Unedle Bereiche geben Metallionen ab (Anode), an anderen Stellen läuft die Gegenreaktion ab (Kathode), und ein **Elektrolyt** (zum Beispiel Feuchtigkeit mit gelösten Salzen) verbindet beide. Rosten von Stahl braucht Sauerstoff und Wasser. Die wichtigsten **Korrosionsarten**:
>
> - **Gleichmäßiger Flächenabtrag:** Die Oberfläche wird über die ganze Fläche etwa gleich schnell abgetragen. Er ist gut vorhersagbar und wird als Abtragrate in mm je Jahr angegeben (typisch bei unlegiertem Stahl).
> - **Lochfraß:** Örtlich begrenzte, tiefe Löcher, vor allem bei Werkstoffen mit Passivschicht (rostfreier Stahl, Aluminium) in chloridhaltigen Medien. Sie sind tückisch, weil die Fläche sonst unversehrt wirkt und die Wand durchbrochen werden kann.
> - **Spaltkorrosion:** In engen Spalten (unter Dichtungen, an Überlappungen, Schraubverbindungen) fehlt Sauerstoff nach, das Medium sammelt sich, und es entstehen örtliche Angriffe.
> - **Kontaktkorrosion:** Zwei unterschiedliche Metalle sind elektrisch leitend verbunden und von einem Elektrolyten benetzt. Das **unedlere** Metall löst sich auf, das edlere wird geschützt.
> - **Spannungsrisskorrosion:** Zusammenwirken von **Zugspannung** (auch Eigenspannung) und einem bestimmten korrosiven Medium. Es entstehen Risse, die ohne sichtbare Verformung zum Bruch führen können, zum Beispiel bei austenitischem Edelstahl in chloridhaltiger, warmer Umgebung.
> - **Interkristalline Korrosion:** Nach Erwärmen in einem bestimmten Temperaturbereich (Richtwert etwa 450 bis 850 °C, zum Beispiel beim Schweißen) scheidet austenitischer Edelstahl Chromcarbide an den Korngrenzen aus; das Metall daneben ist an Chrom verarmt und korrodiert entlang der Korngrenzen, ohne dass die Fläche viel Abtrag zeigt. Gegenmittel sind kohlenstoffarme oder mit Titan oder Niob stabilisierte Sorten.
> - **Selektive Korrosion (Entzinkung):** Bei Messing löst sich selektiv das Zink heraus, es bleibt ein poröses, mechanisch schwaches Kupfergefüge.
>
> Welches Metall unedler ist, zeigt die **Spannungsreihe** der Metalle. Je negativer das Standardpotenzial, desto unedler das Metall. *Standardpotenziale (gerundet, Tabellenwerte, Richtwerte):*
>
> | Metall | Standardpotenzial |
> |---|---|
> | Silber | +0,80 V |
> | Kupfer | +0,34 V |
> | Wasserstoff (Bezug) | 0,00 V |
> | Eisen | −0,44 V |
> | Zink | −0,76 V |
> | Aluminium | −1,66 V |
> | Magnesium | −2,37 V |
>
> Bei **Kontaktkorrosion** wird das unedlere Metall angegriffen, und zwar tendenziell umso stärker, je größer der Potenzialunterschied ist; weitere Einflüsse sind Elektrolyt und Flächenverhältnis. Eine Stahlschraube in einem Kupferblech (Unterschied 0,34 − (−0,44) = 0,78 V) ist gefährdet, weil der Stahl das unedlere Metall ist und angegriffen wird. Bei einer Stahlschraube in einem Zinkteil ist dagegen das Zink das unedlere Metall: Es wird angegriffen und schützt dabei den Stahl. Ungünstig ist auch das **Flächenverhältnis**: Ist die unedle Fläche (Anode) klein und die edle Fläche (Kathode) groß, konzentriert sich der Angriff auf die kleine Fläche (zum Beispiel eine Aluminiumschraube in einem großen Edelstahlblech). In der Praxis hängen Reihenfolge und Potenzialunterschiede vom Medium und von Passivschichten ab (zum Beispiel bei Aluminium und Edelstahl); die Tabelle ist daher nur ein Anhalt, und für Konstruktionsentscheidungen gelten Tabellen für das jeweilige Medium.
>
> **Korrosionsschutz** setzt an mehreren Stellen an:
>
> - **Konstruktive Maßnahmen:** Spalte und Wassersäcke vermeiden, Wasser und Kondensat ablaufen lassen, Kontakt unterschiedlicher Metalle vermeiden oder durch Isolierung (Hülsen, Scheiben aus Kunststoff) trennen, Werkstoffe mit geringem Potenzialunterschied paaren, glatte Oberflächen wählen, Zugspannungen im Bauteil senken.
> - **Beschichten:** Lack, Pulverlack, Öl oder Fett trennen das Metall vom Medium. Wirksam, solange die Schicht dicht ist; bei Verletzungen kann sich der Rost unter der Schicht ausbreiten.
> - **Verzinken:** Zink ist unedler als Eisen und bildet eine dichte Schutzschicht. Es wirkt zusätzlich **kathodisch**: Bei einer kleinen Verletzung opfert sich das Zink, der Stahl bleibt geschützt. **Feuerverzinken** liefert dicke Schichten (Richtwert etwa 50 bis 150 µm), **galvanisches Verzinken** dünne (Richtwert etwa 5 bis 25 µm). Bei hochfesten Stählen kann beim galvanischen Beschichten Wasserstoff in den Stahl gelangen und später zu einem verzögerten Sprödbruch führen (Wasserstoffversprödung); solche Teile werden nach dem Beschichten wärmebehandelt, um den Wasserstoff auszutreiben.
> - **Eloxieren (anodisches Oxidieren):** Bei Aluminium wird die natürliche Oxidschicht elektrochemisch auf eine Dicke von etwa 5 bis 25 µm verstärkt (Richtwert; Hartanodisieren liefert dickere Schichten). Sie ist hart, korrosionsbeständig und lässt sich einfärben.
> - **Passivieren und rostfreie Stähle:** Rostfreie Stähle (im Sprachgebrauch meist „Edelstahl“) enthalten mindestens etwa 10,5 % Chrom; es bildet sich eine dünne, dichte **Passivschicht** aus Chromoxid, die sich nach Verletzung an der Luft selbst wieder aufbaut. Eine chemische **Passivierung** (nach Beizen oder Bearbeitung) stellt diese Schicht gezielt her. Rostfreier Stahl ist nicht unempfindlich: Chloride verursachen Lochfraß; ein Zusatz von Molybdän (zum Beispiel X5CrNiMo17-12-2) verbessert die Beständigkeit.
> - **Kathodischer Schutz:** Das zu schützende Bauteil wird zur Kathode gemacht, entweder mit einer **Opferanode** aus einem unedleren Metall (Zink, Aluminium, Magnesium; zum Beispiel am Schiffsrumpf, an erdverlegten Rohren oder im Warmwasserspeicher) oder durch **Fremdstrom**.
>
> *Beispiel Restlebensdauer (Beispielwerte):* Die Wand eines Stahlbehälters für Kühlschmierstoff bei Vantera hat neu eine Dicke von 5,0 mm. Nach 6 Jahren wird bei der Dickenmessung (zum Beispiel mit Ultraschall) 4,7 mm gemessen; die rechnerisch erforderliche Mindestwanddicke beträgt 4,0 mm. Abtragrate = (5,0 − 4,7) mm / 6 Jahre = **0,05 mm je Jahr**. Der noch zulässige Abtrag ist 4,7 − 4,0 = 0,7 mm; die Restlebensdauer ist 0,7 mm / 0,05 mm je Jahr = **14 Jahre**, wenn der Abtrag gleichmäßig weiterläuft. Bei Lochfraß gilt diese Rechnung nicht, dort zählt die tiefste Stelle. *Verzinkung:* Eine Zinkschicht von 80 µm, die bei einer Abtragrate von 2 µm je Jahr (Beispielwert; in der Praxis stark vom Klima abhängig) abgetragen wird, hält 80 µm / (2 µm je Jahr) = **40 Jahre**.

## 4. TQ2 6.2 — Aluminium- und Kupferlegierungen

**Einfügen:** Neuer Abschnitt `### Aluminium- und Kupferlegierungen` nach „Nichteisenmetalle (NE-Metalle)“.

> **Aluminium** hat eine Dichte von etwa **2,7 kg/dm³**, also rund ein Drittel der Dichte von Stahl. Es leitet Wärme und Strom gut, ist korrosionsbeständig (eine dünne Oxidschicht schützt die Oberfläche), nicht magnetisch und gut umformbar und zerspanbar. Nachteile: geringere Festigkeit und Steifigkeit (der Elastizitätsmodul beträgt etwa 70.000 N/mm² gegenüber etwa 210.000 N/mm² bei Stahl; Richtwerte), starke Wärmeausdehnung (Längenausdehnungskoeffizient etwa 23 · 10⁻⁶ 1/K, rund doppelt so groß wie bei Stahl mit 12 · 10⁻⁶ 1/K; Richtwerte) und Neigung zu Kontaktkorrosion mit edleren Metallen. Man unterscheidet **Knetlegierungen** (Walzen, Strangpressen, Schmieden; Bezeichnung **EN AW-** mit vierstelliger Nummer) und **Gusslegierungen** (Bezeichnung **EN AC-**, meist mit Silizium als wichtigstem Legierungselement, weil es die Gießbarkeit verbessert; zum Beispiel für Gehäuse im Druckguss).
>
> Bei den Knetlegierungen gibt die erste Ziffer der vierstelligen Nummer die **Legierungsserie** und damit das Hauptlegierungselement an:
>
> | Serie | Hauptlegierungselement | Eigenschaften (Überblick) | Aushärtbar |
> |---|---|---|---|
> | EN AW-1xxx | keines (Reinaluminium, mindestens 99,0 % Al) | sehr gut leitfähig, korrosionsbeständig, weich | nein |
> | EN AW-2xxx | Kupfer | hohe Festigkeit, geringere Korrosionsbeständigkeit | ja |
> | EN AW-3xxx | Mangan | mittlere Festigkeit, gut umformbar | nein |
> | EN AW-4xxx | Silizium | niedriger Schmelzbereich, vor allem Schweißzusätze und Lote | meist nein |
> | EN AW-5xxx | Magnesium | korrosionsbeständig (auch gegen Meerwasser), gut schweißbar | nein |
> | EN AW-6xxx | Magnesium und Silizium | gute Festigkeit, Profile und Konstruktion, zerspanbar (Automatenlegierungen besonders gut) | ja |
> | EN AW-7xxx | Zink (meist mit Magnesium und Kupfer) | höchste Festigkeit der Serien | ja |
> | EN AW-8xxx | sonstige Elemente | Sonderlegierungen | unterschiedlich |
>
> Die nicht aushärtbaren Legierungen erhalten ihre Festigkeit durch Mischkristallverfestigung und **Kaltverfestigung** (Walzen). **Aushärtbare** Legierungen werden dagegen in drei Schritten wärmebehandelt: **Lösungsglühen** (Erwärmen, bis sich die Legierungselemente im Mischkristall lösen), **Abschrecken** und **Auslagern** (bei Raumtemperatur: kalt, bei erhöhter Temperatur, Richtwert etwa 120 bis 200 °C je nach Legierung: warm). Beim Auslagern scheiden sich feinste Teilchen aus, die die Verformung behindern und die Festigkeit stark erhöhen. Der Zustand wird in der Bezeichnung angegeben; **T6** bedeutet lösungsgeglüht, abgeschreckt und warm ausgelagert. Das bei Vantera genannte AlMgSi1 entspricht in der Praxis EN AW-6082; EN AW-7075 (AlZn5,5MgCu) ist eine hochfeste Legierung aus der Luftfahrt.
>
> **Kupfer** hat eine Dichte von etwa **8,9 kg/dm³**, eine sehr hohe elektrische Leitfähigkeit (Richtwert etwa 58 m/(Ω · mm²)) und thermische Leitfähigkeit, ist gut umformbar und korrosionsbeständig, aber teuer und weich; seine Wärmeausdehnung (etwa 17 · 10⁻⁶ 1/K, Richtwert) liegt zwischen der von Stahl und der von Aluminium. Es dient als Leiterwerkstoff, für Wärmetauscher und Kontaktteile. Wichtige **Kupferlegierungen**:
>
> - **Messing (CuZn):** Kupfer-Zink-Legierung (Zinkgehalt bis etwa 40 %), gut zerspanbar, gießbar und umformbar, goldgelb. Es gibt kaltumformbare Sorten (zum Beispiel CuZn37) und zerspanungsgünstige Automatenmessinge; Anwendungen sind Armaturen, Schrauben, Drehteile, Hülsen und Zierteile. Bei bestimmten Medien und Zusammensetzungen kann Messing entzinken (siehe „Korrosionsarten und Korrosionsschutz im Detail“).
> - **Bronze (CuSn):** Kupfer-Zinn-Legierung (Zinnbronze, zum Beispiel CuSn8); fest, verschleißfest, mit guten Gleiteigenschaften, deshalb für **Gleitlager, Lagerbuchsen**, Federn und Schneckenräder. **Aluminiumbronze** (Kupfer-Aluminium) ist besonders fest und korrosionsbeständig.
> - **Rotguss:** Gusslegierung aus Kupfer mit Zinn, Zink und meist auch Blei (zum Beispiel CuSn5Zn5Pb5-C, das „-C“ kennzeichnet einen Gusswerkstoff); gut gießbar, korrosionsbeständig, gleitfähig; für Armaturen, Pumpengehäuse und Gleitlager.
>
> *Beispiel Gewichtsvergleich (Richtwerte der Dichte: Stahl 7,85 kg/dm³, Aluminium 2,7 kg/dm³, Kupfer 8,9 kg/dm³):* Ein Bauteil mit 1,5 dm³ Volumen wiegt aus Stahl 1,5 · 7,85 = **11,775 kg**, aus Aluminium 1,5 · 2,7 = **4,05 kg** und aus Kupfer 1,5 · 8,9 = **13,35 kg**. Aluminium wiegt 2,7 / 7,85 = 34,4 % des Stahlteils, die Einsparung beträgt rund **65,6 %** (7,725 kg); Kupfer ist mit 8,9 / 7,85 = 113,4 % rund 13 % schwerer als Stahl. Ein Aluminiumteil gleicher Geometrie ist aber auch nachgiebiger, die Konstruktion muss die Querschnitte anpassen; der Leichtbauvorteil fällt dann geringer aus als der reine Dichtevergleich.
>
> *Beispiel Wärmeausdehnung (Beispielwerte, Richtwerte der Koeffizienten wie oben):* Ein 300 mm langes Aluminiumgehäuse dehnt sich bei einer Erwärmung um 50 K um 23 · 10⁻⁶ 1/K · 300 mm · 50 K = **0,345 mm** aus, ein gleich langes Stahlteil nur um 12 · 10⁻⁶ 1/K · 300 mm · 50 K = **0,18 mm**. Die Differenz von 0,165 mm entscheidet bei engen Passungen zwischen einem Aluminiumgehäuse und Stahlteilen darüber, ob die Passung bei Betriebstemperatur noch funktioniert.

## 5. TQ2 6.2 — Kunststoffarten und Kurzzeichen

**Einfügen:** Neuer Abschnitt `### Kunststoffarten und Kurzzeichen` nach „Kunststoffe“.

> Kunststoffe haben international genormte **Kurzzeichen** (DIN EN ISO 1043-1), die das Grundpolymer benennen; sie stehen in Zeichnungen, Stücklisten und Datenblättern. Die Kurzzeichen der Kautschuke sind getrennt genormt (ISO 1629). Die folgende Tabelle ordnet die wichtigsten **Thermoplaste** nach Kurzzeichen:
>
> | Kurzzeichen | Name | Typische Eigenschaft | Typische Anwendung |
> |---|---|---|---|
> | **PE** | Polyethylen | zäh, chemisch beständig, geringe Dichte, wachsartig | Behälter, Folien, Rohre |
> | **PP** | Polypropylen | steifer und wärmebeständiger als PE, geringe Dichte | Gehäuse, Behälter, Kfz-Teile |
> | **PVC** | Polyvinylchlorid | hart oder (mit Weichmacher) weich, witterungsbeständig | Rohre, Fensterprofile, Kabelisolierung |
> | **PS** | Polystyrol | glasklar, hart, aber spröde | Gehäuse, Verpackung, geschäumt als Dämmstoff |
> | **PMMA** | Polymethylmethacrylat (Acrylglas) | glasklar, hart, witterungs- und UV-beständig, kratzempfindlich | Scheiben, Leuchtenabdeckungen, Lichtleiter |
> | **PA** | Polyamid | zäh, verschleißfest, gute Gleiteigenschaften, nimmt Feuchtigkeit auf | Zahnräder, Gleitlager, Führungselemente |
> | **PET** | Polyethylenterephthalat | formstabil, fest, gute Gasdichtheit | Flaschen, Fasern, technische Halbzeuge |
> | **PC** | Polycarbonat | transparent, sehr schlagzäh | Scheiben, Leuchten, Gehäuse |
> | **POM** | Polyoxymethylen | steif, maßhaltig, gute Gleit- und Federeigenschaften | Präzisionsteile, Zahnräder, Schnappverbindungen |
> | **PTFE** | Polytetrafluorethylen | äußerst chemikalienbeständig, sehr geringe Reibung, hitzebeständig | Dichtungen, Gleitbeschichtungen, Laborgeräte |
> | **ABS** | Acrylnitril-Butadien-Styrol | schlagzäh, gut zu verarbeiten, glänzende Oberfläche | Gehäuse, Spielzeug, 3D-Druck |
>
> Zusätze werden an das Kurzzeichen angehängt: **PA66-GF30** ist Polyamid 66 mit etwa 30 % Massenanteil Glasfasern.
>
> Als **Duroplaste** treten vor allem **EP** (Epoxidharz, Klebstoffe und Verbundwerkstoffe), **PF** (Phenolharz, hitzebeständige Teile) und **UP** (ungesättigtes Polyesterharz, glasfaserverstärkte Bauteile) auf. Typische **Elastomere** sind **NR** (Naturkautschuk), **NBR** (Nitrilkautschuk, beständig gegen Öle und Kraftstoffe, für Dichtungen und O-Ringe) und **EPDM** (witterungs- und wasserbeständig).
>
> Gemeinsam sind den Kunststoffen im Vergleich zu Metallen eine geringe Dichte (die meisten ungefüllten Typen liegen bei etwa 0,9 bis 1,5 kg/dm³, nur PTFE ist mit etwa 2,2 kg/dm³ schwerer), ein deutlich kleinerer Elastizitätsmodul (ungefüllt grob zwischen einigen hundert und rund 4.000 N/mm² gegenüber 210.000 N/mm² bei Stahl; Richtwerte), eine geringe Wärmeleitfähigkeit sowie elektrische Isolation; sie altern unter UV-Strahlung und Wärme.
>
> **Verhalten bei Erwärmung:** Thermoplaste sind unterhalb der **Glasübergangstemperatur** hart und glasartig, oberhalb zäh bis weich. **Amorphe** Thermoplaste (zum Beispiel PS, PC, PMMA, PVC, ABS) werden unterhalb der Glasübergangstemperatur eingesetzt und erweichen beim Erwärmen allmählich; ungefüllte, nicht eingefärbte Typen wie PS, PC und PMMA sind transparent (ABS ist wegen seiner Kautschukphase trotz amorphem Aufbau undurchsichtig). **Teilkristalline** Thermoplaste (zum Beispiel PE, PP, PA, POM, PET, PTFE) sind meist milchig-trüb (dünne Folien oder schnell abgekühlte Teile können durchscheinend sein, PET kann je nach Verarbeitung auch klar sein, etwa bei Getränkeflaschen) und besitzen einen Schmelzbereich; durch ihre Kristallite bleiben sie auch oberhalb der Glasübergangstemperatur bis nahe an den Schmelzbereich tragfähig. Die Festigkeit sinkt mit der Temperatur deutlich, außerdem **kriechen** Kunststoffe unter Dauerlast. Thermoplaste lassen sich in der Regel wiederholt erwärmen, umformen und schweißen; eine Ausnahme ist PTFE, das wegen seiner extrem zähflüssigen Schmelze gesintert und nicht aufgeschmolzen verarbeitet wird. **Duroplaste** bleiben bei hoher Temperatur deutlich formstabiler als Thermoplaste, lassen sich aber nicht aufschmelzen und zersetzen sich bei Überhitzung. **Elastomere** sind im Gebrauchsbereich gummielastisch und zersetzen sich bei Überhitzung. Als Größenordnung der Dauergebrauchstemperatur nennt man (Richtwerte) etwa 60 °C bei hartem PVC, etwa 80 °C bei PE, etwa 100 °C bei POM und etwa 260 °C bei PTFE; sie hängt von Typ, Belastung und Datenblatt ab. PA nimmt je nach Umgebung Feuchtigkeit auf und quillt dadurch geringfügig, was Passungen beeinflusst.
>
> Kunststoffe dehnen sich bei Erwärmung **deutlich stärker** aus als Stahl, nach **ΔL = α · L₀ · ΔT** (siehe TQ1, Abschnitt „Energieformen und Wärme“). *Beispiel (Beispielwerte: α für Stahl 12 · 10⁻⁶ 1/K, α für ein PA etwa 80 · 10⁻⁶ 1/K):* Eine 200 mm lange Gleitleiste aus PA wird in einer Stahlnut von 20 °C auf 70 °C erwärmt, also ΔT = 50 K. Stahl dehnt sich um 12 · 10⁻⁶ 1/K · 200 mm · 50 K = **0,12 mm**, die PA-Leiste um 80 · 10⁻⁶ 1/K · 200 mm · 50 K = **0,80 mm**, das ist das 6,7-Fache. Die Leiste wird gegenüber der Nut um 0,80 − 0,12 = **0,68 mm** länger; diese Differenz muss als Spiel in der Konstruktion vorgesehen sein (zum Beispiel Langloch statt Rundloch), sonst verwirft sich die Leiste oder klemmt.

## 6. TQ2 6.1 — Zeichnungsarten und Zeichnungsableitung

**Einfügen:** Neuer Abschnitt `### Zeichnungsarten und Zeichnungsableitung` nach „Stücklisten“.

> Neben der Einzelteilzeichnung, der Zusammenbauzeichnung und der Explosionszeichnung (siehe „Zweck und Arten technischer Zeichnungen“) unterscheidet man die Zusammenbauzeichnung nach ihrem Umfang in zwei Arten: Die **Gesamtzeichnung** zeigt das vollständige Erzeugnis, zum Beispiel ein ganzes Achsmodul, mit allen Baugruppen und Einzelteilen im zusammengebauten Zustand. Die **Gruppenzeichnung** (die Baugruppenzeichnung aus dem Abschnitt „Zweck und Arten technischer Zeichnungen“) zeigt eine einzelne Baugruppe, zum Beispiel den Achsflansch mit seinen Teilen. Nach dem Zweck unterscheidet man die **Fertigungszeichnung** und die **Montagezeichnung**. Die Fertigungszeichnung ist in der Regel die Einzelteilzeichnung, ergänzt um alles, was die Werkstatt zur Herstellung eines Teils braucht: Maße, Toleranzen, Rauheit, Werkstoff, Wärmebehandlung (zum Beispiel „gehärtet auf 58 bis 62 HRC“ oder „einsatzgehärtet, Einsatzhärtetiefe 0,8 bis 1,2 mm“), gegebenenfalls Rohteil oder Zwischenzustände. Die Montagezeichnung zeigt, wie Teile zusammengebaut werden, mit Reihenfolge, Montagehinweisen und gegebenenfalls Anzugsmomenten oder Passungshinweisen. Die **Explosionszeichnung** zeigt die Teile in Fügerichtung auseinandergezogen und eignet sich für Montageanleitungen und Ersatzteilkataloge.
>
> Die **Zeichnungsableitung** geht von der Gesamt- oder Gruppenzeichnung aus. Dort erhält jedes Teil eine **Positionsnummer** (Positionskreis mit Hinweislinie), die auf die **Stückliste** verweist. Für jedes **selbst gefertigte** Teil wird daraus eine **Einzelteilzeichnung** mit eigener **Zeichnungsnummer** abgeleitet; Funktionsmaße, Passungen und Rauheiten ergeben sich aus der Funktion in der Baugruppe (zum Beispiel H7/g6 für die Lagerstelle). **Normteile** (Schrauben, Scheiben, Ringe) und **Katalogteile** erhalten keine eigene Zeichnung, sondern stehen mit ihrer Norm- oder Bestellbezeichnung in der Stückliste. Lässt das Unternehmen ein Teil von einem Zulieferer nach eigener Zeichnung fertigen (Fremdfertigung), braucht es dennoch eine Einzelteilzeichnung. In der Konstruktion mit 3D-CAD werden die Zeichnungen aus dem Modell abgeleitet; Modell, Zeichnung und Stückliste sollen dabei dieselben Daten zeigen.
>
> Jede Zeichnung hat einen **Zeichnungsstand**, den ein **Änderungsindex** (zum Beispiel a, b, c oder A, B, C) im Schriftfeld und im Änderungsfeld festhält. Eine Zeichnung wird vor der Fertigung geprüft und freigegeben, und die Freigabe wird dokumentiert. Eine spätere Änderung wird beantragt, bewertet, freigegeben und in der Zeichnung mit neuem Index, Datum und Kurzbeschreibung vermerkt. Üblich ist: Bleibt das geänderte Teil mit dem alten **austauschbar** (altes und neues Teil lassen sich ohne Anpassung gegeneinander verbauen), bleibt die Zeichnungsnummer und es steigt der Index; sonst vergibt man eine neue Nummer und passt die Stückliste an. Fertigungsaufträge, Stückliste, Prüfplan und Wareneingang müssen sich auf denselben, **gültigen Zeichnungsstand** beziehen; veraltete Stände werden gesperrt oder gekennzeichnet. Weicht die Stückliste vom Zeichnungsstand ab, drohen falsche Teile in der Montage.
>
> *Beispiel Stücklistenmengen:* Das Achsmodul der Vantera besteht (Gesamtzeichnung) aus 1 Welle, 2 Achsflanschen und 2 Sicherungsringen. Jeder Achsflansch (Gruppenzeichnung) enthält 1 Grundkörper, 1 Lagerbuchse, 6 Schrauben M10×30 und 6 Sicherungsscheiben. Für einen Auftrag über 25 Achsmodule werden die Mengen von oben nach unten multipliziert (die Normteile sind hier der Einfachheit halber direkt der Baugruppe zugeordnet; eine Strukturstückliste kann sie, wie im Abschnitt „Stücklisten“ beschrieben, in einer Unterbaugruppe „Anbauteile“ zusammenfassen):
>
> | Zeichnung | Pos. | Benennung | Menge je übergeordneter Einheit | Menge für 25 Achsmodule |
> |---|---|---|---|---|
> | Gesamtzeichnung Achsmodul | 1 | Welle | 1 | 25 |
> | | 2 | Achsflansch (Baugruppe) | 2 | 2 · 25 = 50 |
> | | 3 | Sicherungsring | 2 | 2 · 25 = 50 |
> | Gruppenzeichnung Achsflansch | 1 | Grundkörper | 1 | 1 · 50 = 50 |
> | | 2 | Lagerbuchse | 1 | 1 · 50 = 50 |
> | | 3 | Schraube M10×30 | 6 | 6 · 50 = 300 |
> | | 4 | Sicherungsscheibe | 6 | 6 · 50 = 300 |
>
> Die Einzelteilzeichnungen werden also für Welle, Grundkörper und Lagerbuchse benötigt (hier ist angenommen, dass die Lagerbuchse nach eigener Zeichnung gefertigt wird); Schrauben, Scheiben und Ringe sind Normteile und stehen nur in der Stückliste.
>
> *Zusatz zum Maßstab (siehe „Normung: Linienarten, Maßstäbe und Schriftfeld“):* Eine Welle von 450 mm Länge wird im Maßstab 1:5 gezeichnet; die Zeichnung misst 450 mm / 5 = **90 mm**, die Maßzahl lautet trotzdem 450. Ein Detail im Maßstab 2:1 mit 36 mm Länge auf dem Papier entspricht 36 mm / 2 = **18 mm** am Bauteil.

---

## Rechenprüfung

Alle Beispiele habe ich mit einem Python-Skript nachgerechnet (`python`, Skript im Arbeitsbereich). Neu bzw. geändert gegenüber der ersten Fassung sind die Zeilen „1, HRB“, „1, Zugfestigkeit, Schwelle“, „4, Wärmeausdehnung Aluminium“ und „4, Verhältnis der Ausdehnung“ sowie die Kraftkennzahl 3000 kp; alle übrigen Zeilen wurden erneut gerechnet und blieben unverändert.

| Abschnitt | Rechenweg | Ergebnis |
|---|---|---|
| 1, Brinell | √(10² − 4,0²) = √84 = 9,1652; D − √ = 0,8348; π · 10 · 0,8348 = 26,23; 0,102 · 2 · 29.420 = 6.001,7; 6.001,7 / 26,23 | 228,8, gerundet 229 |
| 1, Beanspruchungsgrad | 0,102 · 29.420 / 10² | 30,008, gerundet 30 |
| 1, Kraftkennzahl | 3000 · 9,80665 N | 29.420 N (29.419,95) |
| 1, Eindruckbereich | 0,24 · 10; 0,6 · 10 | 2,4 mm bis 6,0 mm |
| 1, Vickers | 0,1891 · 98,07 / 0,25² = 18,545 / 0,0625 | 296,7, gerundet 297 |
| 1, HV 10 | 10 · 9,80665 N | 98,07 N |
| 1, Rockwell HRC | 100 − 0,100 / 0,002 = 100 − 50 | 50 HRC |
| 1, Rockwell HRB | 130 − 0,070 / 0,002 = 130 − 35 | 95 HRB |
| 1, Zugfestigkeit | 3,5 · 229 = 801,5 (mit 228,8: 800,9) | etwa 800 N/mm² |
| 1, Zugfestigkeit, Schwelle | 10 % von 800: 800 · 0,9; 800 · 1,1 | 720 bis 880 N/mm² |
| 2, Abkühlgeschwindigkeit Rand | (800 − 500) K / 5 s | 60 K/s |
| 2, Abkühlgeschwindigkeit Kern | (800 − 500) K / 25 s | 12 K/s |
| 2, Innendurchmesser Ring | 40 − 2 · 6 | 28 mm |
| 2, Querschnittsanteil | π/4 · (40² − 28²) = 640,9 mm²; π/4 · 40² = 1.256,6 mm²; 640,9 / 1.256,6 | 51,0 % |
| 3, Abtragrate | (5,0 − 4,7) mm / 6 Jahre | 0,05 mm/Jahr |
| 3, Restlebensdauer | (4,7 − 4,0) mm / 0,05 mm/Jahr = 0,7 / 0,05 | 14 Jahre |
| 3, Zinkschicht | 80 µm / (2 µm/Jahr) | 40 Jahre |
| 3, Potenzialunterschied Kupfer/Eisen | 0,34 − (−0,44) | 0,78 V |
| 4, Masse Stahl | 1,5 · 7,85 | 11,775 kg |
| 4, Masse Aluminium | 1,5 · 2,7 | 4,05 kg |
| 4, Masse Kupfer | 1,5 · 8,9 | 13,35 kg |
| 4, Verhältnisse | 2,7 / 7,85 = 34,4 %; 100 − 34,4 = 65,6 %; 11,775 − 4,05 = 7,725 kg; 8,9 / 7,85 | 34,4 %; 65,6 %; 7,725 kg; 113,4 % |
| 4, Wärmeausdehnung Aluminium | 23 · 10⁻⁶ · 300 · 50 | 0,345 mm |
| 4, Wärmeausdehnung Stahl (300 mm) | 12 · 10⁻⁶ · 300 · 50 | 0,18 mm |
| 4, Differenz | 0,345 − 0,18 | 0,165 mm |
| 4, Verhältnis der Koeffizienten | 23 / 12 | 1,92, „rund doppelt“ |
| 5, Ausdehnung Stahl | 12 · 10⁻⁶ · 200 · 50 | 0,12 mm |
| 5, Ausdehnung PA | 80 · 10⁻⁶ · 200 · 50 | 0,80 mm |
| 5, Differenz und Faktor | 0,80 − 0,12; 0,80 / 0,12 | 0,68 mm; 6,7-fach |
| 6, Stücklistenmengen | 2 · 25; 2 · 25; 1 · 50; 1 · 50; 6 · 50; 6 · 50 | 50; 50; 50; 50; 300; 300 |
| 6, Maßstab | 450 / 5; 36 / 2 | 90 mm; 18 mm |

---

## Zu entscheiden

Stand nach Einarbeitung der Fachprüfung; erledigte Punkte der ersten Fassung sind gestrichen oder angepasst.

1. **Umfang:** sechs Abschnitte, davon Abschnitt 2 (Wärmebehandlung) und Abschnitt 4 (Aluminium/Kupfer) länger als die bisherigen Abschnitte; durch die Prüfung sind Abschnitt 2, 3 und 5 nochmals gewachsen. Kürzen möglich: Abschnitt 2 in „ZTU/Härten“ und „Randschichtverfahren“ aufteilen, oder im Abschnitt 4 die Kupferlegierungen straffen.
2. **Normen und Normstände:** Ich nenne DIN EN ISO 18265 (Umrechnung von Härtewerten), DIN EN ISO 1043-1 (Kurzzeichen der Kunststoffe), ISO 1629 (Kurzzeichen der Kautschuke; die Prüfung nennt die deutsche Fassung DIN ISO 1629, ich habe die Normnummer ohne DIN-Präfix geschrieben) sowie die Bezeichnungen EN AW-/EN AC- für Aluminium. Die Ausgabestände und Titel sind nicht geprüft und sollten bei der fachlichen Prüfung gegen den aktuellen Stand abgeglichen werden. Die Begriffsnorm zur Wärmebehandlung (Vergüten) und die Norm zur Einsatzhärtetiefe habe ich im Text nicht genannt. Die Norm für Zeichnungsarten (Begriffe im Zeichnungs- und Stücklistenwesen) habe ich bewusst nicht genannt, weil Nummer und Ausgabe nicht sicher bekannt sind; die Unterscheidung Fertigungs-/Montagezeichnung ist in der Praxis nicht einheitlich genormt, und Unternehmen verwenden die Begriffe teils anders.
3. **Härtewerte (Abschnitt 1):** (a) Die Gültigkeit des Eindruckdurchmessers (0,24 D bis 0,6 D) und der Beanspruchungsgrad 30 für Stahl sind die üblichen Angaben, im Text als Richtwert; der Normtext ist maßgeblich. (b) Die Umrechnungstabelle HV/HRC (300 bis 700 HV) ist gerundet aus der gängigen Stahl-Umrechnung; die Prüfung bestätigt die Werte, die Norm bleibt maßgeblich. (c) Rm ≈ 3,5 · HB ist die gängige Faustregel für unlegierte und niedriglegierte Stähle; manche Quellen nennen etwa 3,3 bis 3,6. Die Abweichungsschwelle „mehr als etwa 10 %“ ist als Anhalt gewählt. (d) Die Kurzform der Prüfbedingung (zum Beispiel „229 HBW 10/3000“, „297 HV 10“) ist auf Hinweis der Prüfung aufgenommen.
4. **Einsatzhärtetiefe:** Auf Hinweis der Prüfung ist die Grenzhärte 550 HV im Text genannt, ohne Normnummer. Bitte bei der fachlichen Prüfung bestätigen.
5. **Temperaturen der Wärmebehandlung (Abschnitt 2):** Normalglühen, Weichglühen, Härten, Anlassen, Spannungsarmglühen, Rekristallisationsglühen, Aufkohlen und Nitrieren sind als Richtwerte aus der allgemeinen Fachliteratur angegeben (zum Beispiel Härten von C45 bei 800 bis 850 °C, Nitrieren bei 480 bis 580 °C, Einsatzhärten bei 880 bis 950 °C). Die Anlasstemperaturbereiche für Federn (300 bis 500 °C) sind grob. Die Anlassversprödung ist nur allgemein erwähnt, weil die Temperaturbereiche je nach Stahl unterschiedlich sind. Die Beispielwerte (v_krit = 30 K/s, Einhärtungstiefe 6 mm) sind erfunden und nur zur Übung gedacht. Das ZTU-Diagramm ist nur verbal beschrieben; für die Lernenden wäre eine Abbildung hilfreich (soll sie angefordert werden?).
6. **Korrosion (Abschnitt 3):** (a) Die Standardpotenziale sind gerundete Tabellenwerte (Ag +0,80 V, Cu +0,34 V, Fe −0,44 V, Zn −0,76 V, Al −1,66 V, Mg −2,37 V); ich gebe sie als Richtwerte an und weise darauf hin, dass die Praxis (Medium, Passivschicht) abweicht. (b) Die Schichtdicken (Feuerverzinken 50 bis 150 µm, galvanisch 5 bis 25 µm, Eloxal 5 bis 25 µm) sind Richtwerte. (c) „Mindestens etwa 10,5 % Chrom“ für rostfreie Stähle ist die übliche Abgrenzung. (d) Chromatieren und andere Konversionsschichten sind ausgelassen, weil an sie stoffrechtliche Beschränkungen geknüpft sind (Paket P8). Ein Hinweis auf Umweltauflagen zu Eloxieren und Verzinken wird nicht ergänzt (Entscheidung der Prüfung: das gehört in die gesperrte Rechtsprüfung). (e) Die Überschrift des Abschnitts wurde geändert, weil „Korrosion und Korrosionsschutz“ bereits in TQ1 5.1 steht.
7. **Aluminium und Kupfer (Abschnitt 4):** Die Serientabelle enthält jetzt alle acht Serien (1xxx bis 8xxx). „AlMgSi1 entspricht EN AW-6082“ und „EN AW-7075 = AlZn5,5MgCu“ sind die gängigen Zuordnungen, die Prüfung bestätigt sie. Elastizitätsmodul (70.000 und 210.000 N/mm²), Leitfähigkeit von Kupfer (58 m/(Ω · mm²)), Längenausdehnungskoeffizienten (Al 23, Cu 17, Stahl 12 · 10⁻⁶ 1/K) und die Dichten sind Richtwerte. Der Rotguss-Name enthält Blei; stoffrechtliche Fragen dazu (zum Beispiel Trinkwasser) sind bewusst nicht Teil des Abschnitts.
8. **Kunststoffe (Abschnitt 5):** Die Dauergebrauchstemperaturen (PVC 60 °C, PE 80 °C, POM 100 °C, PTFE 260 °C) sind grobe Richtwerte aus der allgemeinen Fachliteratur und hängen stark vom Typ ab. Der Wärmeausdehnungskoeffizient von PA (80 · 10⁻⁶ 1/K) ist ein Beispielwert (je nach Typ und Füllstoff etwa 60 bis 110 · 10⁻⁶ 1/K). Die Einteilung in amorph und teilkristallin ist vereinfacht. Die Kurzzeichen für Duroplaste und Elastomere (EP, PF, UP, NR, NBR, EPDM) sind bewusst knapp gehalten; PU/PUR, PBT und PEEK sind nicht aufgenommen.
9. **Zeichnungsableitung (Abschnitt 6):** Die Regel „Index steigt bei Austauschbarkeit, sonst neue Nummer“ ist eine verbreitete betriebliche Praxis, keine Norm; der Text formuliert sie mit „üblich“. Die Mengen im Beispiel (Achsmodul) sind erfunden; passend zu den vorhandenen Vantera-Angaben (Achsflansch, Lagerbuchse, Normteile). Der Maßstab-Zusatz steht aus Gründen der Übersicht noch in diesem Abschnitt; thematisch gehört er eher zu „Normung: Linienarten, Maßstäbe und Schriftfeld“ (siehe Bestandsänderungen).
10. **Gefahrstoffe und Arbeitsschutz:** Wie beauftragt nicht aufgenommen (Paket P8). Betroffene Stellen (Beizen und Passivieren bei Edelstahl, Eloxieren, Verzinken, Abschrecken in Öl, Salzbäder) werden nur technisch beschrieben, ohne Schutzmaßnahmen.

---

## Prüfergebnis eingearbeitet

Grundlage: `docs/entwuerfe/pruefung-tq2.md` (39 Befunde: 2 Fehler, 22 ungenau, 9 fehlt, 6 Stil). Entscheidungen: 33 übernommen, 6 angepasst (eigene Formulierung oder Teilübernahme), 0 abgelehnt.

| Nr. | Entscheidung | Begründung |
|---|---|---|
| B1 | übernommen | „Zukaufteil = keine Zeichnung“ war falsch; jetzt Norm- und Katalogteile ohne Zeichnung, Fremdfertigung mit Zeichnung, Annahme zur Lagerbuchse im Beispiel genannt. |
| B2 | übernommen | ABS ist amorph, aber durch die Kautschukphase undurchsichtig; Satz entsprechend umgebaut. |
| B3 | übernommen | Faustregel streut; keine Reklamation allein aus der Härte, stattdessen Nachprüfung und gegebenenfalls Zugversuch. |
| B4 | übernommen | „Beanspruchungsgrad“ ist der übliche Fachbegriff. |
| B5 | übernommen | HB liegt etwas unter HV; Formulierung „nah beieinander“. |
| B6 | übernommen | Hinweis auf HBS (nicht mehr genormt) im neuen Abschnitt; Angleichung des Bestands als Vorschlag in der Bestandsliste. |
| B7 | angepasst | Entwurf so formuliert, dass er mit dem Bestand vereinbar ist (Vergüten allgemein = Härten + Anlassen, im engeren Sinn mit hohem Anlassen); Bestand nicht geändert, Vorschläge in der Bestandsliste. |
| B8 | angepasst | GS-Linie wird erklärt und C45 mit etwa 780 °C belegt. Abweichend vom Vorschlag des Berichts: Für übereutektoide Stähle wird beim Normalglühen die SE-Linie genannt (Zementit lösen), beim Härten die Linie bei 723 °C (Zementit bleibt, trägt zur Härte bei); „SK“ ist keine Austenitisierungslinie, die Waagerechte heißt PSK. |
| B9 | übernommen | „sie“ aufgelöst, Jominy für beide Eigenschaften erklärt, Einhärtungstiefe mit Grenzhärte definiert. |
| B10 | übernommen | Einsatzhärtetiefe mit Grenzhärte 550 HV. |
| B11 | übernommen | „tendenziell“, weitere Einflüsse genannt; Zink-Beispiel richtiggestellt (dort wird das Zink angegriffen und schützt den Stahl). |
| B12 | übernommen | Feuerverzinken 50 bis 150 µm; Eloxal ohne „einige Mikrometer“, Hartanodisieren erwähnt. |
| B13 | übernommen | „Rostfreie Stähle (im Sprachgebrauch meist Edelstahl)“. |
| B14 | übernommen | Auslagern 120 bis 200 °C je nach Legierung (7075 bei etwa 120 °C). |
| B15 | übernommen | Serien 4xxx und 8xxx ergänzt; Eigenschaft der Serie 6xxx leicht entschärft („zerspanbar“, Automatenlegierungen besonders gut). |
| B16 | übernommen | CuSn5Zn5Pb5-C, „meist auch Blei“. |
| B17 | übernommen | Kautschuk-Kurzzeichen getrennt genormt (ISO 1629); „Grundpolymer“ statt „Grundbaustein“. |
| B18 | übernommen | Teilkristalline: milchig-trüb mit Ausnahmen, PET kann klar sein. |
| B19 | übernommen | „in der Regel“, PTFE als Ausnahme (Sintern). |
| B20 | übernommen | Duroplaste formstabiler als Thermoplaste, aber nicht „bis zur Zersetzung“. |
| B21 | übernommen | Amorphe unterhalb, teilkristalline auch oberhalb der Glasübergangstemperatur tragfähig. |
| B22 | angepasst | Gesamt- und Gruppenzeichnung als Arten der Zusammenbauzeichnung nach Umfang; Gruppenzeichnung mit der Baugruppenzeichnung des Bestands gleichgesetzt; Fertigungszeichnung als ergänzte Einzelteilzeichnung. Keine Norm genannt. |
| B23 | übernommen | Hinweis zur vereinfachten Zuordnung der Normteile mit Verweis auf die Unterbaugruppe „Anbauteile“ aus dem Bestand. |
| B24 | übernommen | Austauschbarkeit beidseitig formuliert; Stückliste wird bei neuer Nummer angepasst. |
| B25 | übernommen | Härteangaben 229 HBW 10/3000, 297 HV 10, 50 HRC; Begründung des ursprünglichen Entwurfs gegen die Kurzform fällt weg. |
| B26 | übernommen | HRC-Bereich etwa 20 bis 70, Formel HRB = 130 − e/0,002 mm mit Rechenbeispiel (95 HRB, nachgerechnet). |
| B27 | übernommen | Rein qualitativer Absatz zu Oberfläche, Probendicke und Abständen. |
| B28 | übernommen | PMMA-Zeile und Zusatzkennzeichnung (PA66-GF30); PU/PUR, PBT, PEEK bewusst nicht, um den Abschnitt nicht weiter zu verlängern. |
| B29 | übernommen | Absatz zu Dichte, Elastizitätsmodul, Wärmeleitung, Isolation und Alterung; PTFE als Ausnahme bei der Dichte, damit der Bereich nicht falsch wird. |
| B30 | übernommen | Interkristalline Korrosion und Entzinkung als Spiegelstriche, Wasserstoffversprödung beim galvanischen Verzinken; Verweis von Messing im Abschnitt 4 auf die Entzinkung. |
| B31 | übernommen | Rekristallisationsglühen als Verfahren, Nitrierstähle beim Nitrieren. |
| B32 | übernommen | Längenausdehnungskoeffizienten von Aluminium und Kupfer, zusätzlich Rechenbeispiel (nachgerechnet). |
| B33 | angepasst | Wärmebehandlungsangabe in der Fertigungszeichnung und Zeichnungsfreigabe ergänzt; Schreibweise der Zeichnungsangabe als Bereich („58 bis 62 HRC“) statt „58 +4 HRC“, weil die Toleranzschreibweise nicht eingeführt ist. |
| B34 | angepasst | Abschnitt umbenannt in „Korrosionsarten und Korrosionsschutz im Detail“ (eindeutig gegenüber TQ1 5.1), Definitionssatz durch Verweis auf TQ1 ersetzt; alle Querverweise angepasst. |
| B35 | übernommen | Verweis jetzt auf den Abschnitt „Energieformen und Wärme“ in TQ1 (dort steht ΔL = α · L₀ · ΔT). |
| B36 | übernommen | Verbale Orientierung zu den „Nasen“ und Ms ergänzt; Abbildung als offene Frage in „Zu entscheiden“. |
| B37 | übernommen | Beispiele jeweils als eigener Absatz („Beispiel Brinell“, „Beispiel Vickers“, „Beispiel Rockwell“). |
| B38 | übernommen | Entscheidung getroffen: Maßangaben mit Einheit bleiben „Ø 40 mm“ (Leerzeichen vor Einheiten nach Hausregel), Passungsangaben bleiben im Bestand wie dort; keine Textänderung nötig. |
| B39 | angepasst | Maßstab-Absatz mit „Zusatz zum Maßstab“ und Verweis auf „Normung: Linienarten, Maßstäbe und Schriftfeld“ abgetrennt; eine Verlagerung in den Bestand überlasse ich der Projektleitung (siehe Bestandsliste). |

---

## Bestandsänderungen für die Projektleitung

Der Entwurf widerspricht dem Bestand auch ohne diese Änderungen nicht; die Änderungen machen den Bestand nur genauer bzw. einheitlicher. Unter `content/` wurde nichts geändert.

1. **`content/technischer-fachwirt/tq2/6.2-werkstoffkunde-metalle-kunststoffe.md`, Abschnitt „Wärmebehandlung von Stahl“ (Befund B7).** Zitat: „(die Kombination aus Härten und Anlassen wird als **Vergüten** bezeichnet)“. Vorschlag: „(die Kombination aus Härten und Anlassen, im engeren Sinn mit hoher Anlasstemperatur, wird als **Vergüten** bezeichnet)“.
2. **Dieselbe Datei, Karteikarte K-6.2-16 (B7).** Zitat: „Die Kombination aus Härten und anschließendem Anlassen eines Stahlbauteils.“ Vorschlag: „Die Kombination aus Härten und anschließendem Anlassen eines Stahlbauteils (im engeren Sinn mit hoher Anlasstemperatur).“ Optional, weil die Antwort in der vereinfachten Lesart richtig bleibt.
3. **Dieselbe Datei, Lückentext Q-6.2-06 und Sortieraufgabe Q-6.2-12 sowie `content/technischer-fachwirt/tq2/fachgespraech.md` (Erwartungshorizont „Die Kombination aus Härten und Anlassen heißt Vergüten.“) (B7).** Zitat Lückentext: „Die Kombination aus Härten und anschließendem Anlassen eines Stahlbauteils wird als ___Vergüten___ bezeichnet.“ Kein Änderungsbedarf, solange die Lesart des Entwurfs gilt (allgemein Härten + Anlassen); nur bei Wunsch nach der engeren Lesart analog zu Punkt 1 ergänzen. In Q-6.2-12 ist „Erneutes Erwärmen auf niedrigere Anlasstemperatur“ richtig (niedriger als die Härtetemperatur).
4. **`content/technischer-fachwirt/tq2/6.3-werkstoffpruefung.md`, Abschnitt „Härteprüfverfahren“ (B6).** Zitat: „wird eine gehärtete Kugel mit definierter Prüfkraft in die Werkstoffoberfläche gedrückt“. Vorschlag: „wird eine Hartmetallkugel mit definierter Prüfkraft in die Werkstoffoberfläche gedrückt“.
5. **`content/technischer-fachwirt/tq2/6.2-werkstoffkunde-metalle-kunststoffe.md`, Abschnitt „Wärmebehandlung von Stahl“ (Nebenpunkt zu Abschnitt 2 des Entwurfs).** Zitat: „Beim **Glühen** wird ein Werkstück erwärmt und langsam abgekühlt“. Der Entwurf nennt beim Normalglühen das Abkühlen an ruhiger Luft (schneller als beim Weichglühen). Vorschlag: „…erwärmt und meist langsam abgekühlt“. Optional.
6. **`content/technischer-fachwirt/tq2/6.1-technisches-zeichnen-normen.md`, Abschnitt „Normung: Linienarten, Maßstäbe und Schriftfeld“ (B39).** Zitat: „…gibt der **Maßstab** (z. B. 2:1 für eine vergrößerte, 1:5 für eine verkleinerte Darstellung) das Größenverhältnis zwischen Zeichnung und tatsächlichem Bauteil an“. Vorschlag: das Rechenbeispiel aus dem „Zusatz zum Maßstab“ (450 mm bei 1:5 gleich 90 mm Zeichnungslänge; 36 mm bei 2:1 gleich 18 mm am Bauteil) hier einfügen und den Zusatz aus Abschnitt 6 des Entwurfs dann streichen. Optional.
