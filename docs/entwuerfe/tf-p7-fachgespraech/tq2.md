# Entwurf Fachgesprächsfragen TQ2 (Technischer Fachwirt), Ergänzungen zu den neu eingearbeiteten Theorieabschnitten

Stand 12.10.2026 · Entwurf zur Entscheidung (neue Inhalte, Rahmenentscheidung R3); nichts davon ist in `content/` eingespielt. Ziel: `content/technischer-fachwirt/tq2/fachgespraech.md`. Jeder Abschnitt `###` unten trägt die Überschrift der Themengruppe exakt wie in der Zieldatei; die Fragen werden am Ende der jeweiligen Themengruppe angefügt. Übersicht, Zahlentabelle und Prüfergebnis: `docs/entwuerfe/tf-p7-fachgespraech-tq23.md`.

### 6.1 Technisches Zeichnen und Normen

- Die Zeichnung fordert für den Lagersitz einer Antriebswelle eine Rauheit von Ra 0,8. Was bedeutet diese Angabe, was folgt daraus für die Fertigung, und warum wird nicht an jeder Fläche die feinste Oberfläche verlangt?
  - Erwartung: Ra ist der Mittenrauwert, der arithmetische Mittelwert der Abweichungen des Profils von der Mittellinie, angegeben in Mikrometern.
  - Erwartung: Schlichtdrehen und Schlichtfräsen erreichen etwa Ra 1,6 bis 3,2 µm (Richtwert); für Ra 0,8 muss die Lagerstelle daher geschliffen werden, Schleifen erreicht etwa Ra 0,4 bis 0,8 µm.
  - Erwartung: Je feiner die geforderte Rauheit, desto höher der Fertigungsaufwand; feine Oberflächen verlangt man deshalb nur dort, wo die Funktion es braucht, etwa an gleitenden Passflächen, Dichtflächen und Lagersitzen.
  - Erwartung: Die Rauheit beeinflusst auch die Dauerfestigkeit, weil Kerben und Riefen sie senken.
  - Rückfrage: Worin unterscheiden sich Ra und die gemittelte Rautiefe Rz?
- Warum wird bei Passungen meist das System Einheitsbohrung bevorzugt, und was sagt die Angabe Ø40 H7/g6 über die Verbindung aus?
  - Erwartung: Bei der Einheitsbohrung hat die Bohrung immer die Toleranzlage H (unteres Abmaß null), die Passung ergibt sich allein über die Toleranzlage der Welle.
  - Erwartung: Sie wird bevorzugt, weil sich Wellen leichter auf unterschiedliche Maße fertigen lassen als Bohrungen, die mit festen Werkzeugen wie Reibahlen und Bohrern und mit Lehren hergestellt werden.
  - Erwartung: Ø40 H7/g6 nennt das Nennmaß, das Toleranzfeld der Bohrung (H7) und das der Welle (g6); die Lagebuchstaben a bis h der Welle ergeben Spiel, j bis n Übergang und p bis zc Übermaß.
  - Erwartung: Mit den Beispielwerten der Theorie (Bohrung 40,000 bis 40,025 mm, Welle 39,975 bis 39,991 mm) ergeben sich Höchstspiel 0,050 mm und Mindestspiel 0,009 mm; beide sind positiv, es liegt also eine Spielpassung vor.
  - Rückfrage: Wann nutzt man stattdessen die Einheitswelle?
  - Rückfrage: Welche Passungsart ergibt H7/p6?
- Eine Antriebswelle liegt in allen Durchmessern im Maßtoleranzbereich und läuft im Lager trotzdem unrund. Wie erklären Sie das, und welche Angabe würden Sie in der Zeichnung ergänzen?
  - Erwartung: Maßtoleranzen allein sichern die Funktion nicht: Eine Welle kann in allen Durchmessern im Toleranzbereich liegen und trotzdem krumm sein.
  - Erwartung: Form- und Lagetoleranzen nach DIN EN ISO 1101 legen die Gestalt eines Elements und seine Lage zu anderen Elementen fest; die Toleranzzone ist ein Raum, in dem das Element liegen muss.
  - Erwartung: Für rotierende Teile ist der Rundlauf bezogen auf die Wellenachse (Bezug A, gebildet durch die beiden Lagersitze) die aussagekräftigste Angabe, weil er Rundheit und Koaxialität gemeinsam erfasst und einfach prüfbar ist.
  - Erwartung: Die Angabe steht im Toleranzrahmen mit Symbol, Toleranzwert und Bezugsbuchstabe; bei 0,02 mm Rundlauf darf der Zeiger des Messgeräts über eine volle Umdrehung nur 0,02 mm ausschlagen.
  - Rückfrage: Worin unterscheidet sich eine Formtoleranz wie die Ebenheit von einer Lagetoleranz?
  - Rückfrage: Was bedeutet eine Ebenheitstoleranz von 0,05 mm an einer Dichtfläche?
- Bei „ISO 2768-m“ im Schriftfeld misst die Qualitätssicherung an einem ungetolerierten Maß von 50 mm den Wert 50,25 mm. Ist das in Ordnung, und wann reicht eine Allgemeintoleranz nicht aus?
  - Erwartung: Allgemeintoleranzen gelten für Maße ohne eigene Toleranzangabe; ISO 2768-1 legt dafür die Klassen f (fein), m (mittel), c (grob) und v (sehr grob) fest, die im Schriftfeld angegeben wird.
  - Erwartung: In der Klasse m gilt für Längenmaße über 30 bis 120 mm nach den Beispielwerten der Tabelle ±0,3 mm, das Maß darf also zwischen 49,7 mm und 50,3 mm liegen, und 50,25 mm ist in Ordnung.
  - Erwartung: In der Klasse f (±0,15 mm, Grenzen 49,85 mm und 50,15 mm) wäre derselbe Wert nicht zulässig; die Klasse m ist mit geringem Aufwand erreichbar, die Klasse f erfordert genauere Maschinen und Messmittel.
  - Erwartung: Wo es auf die Funktion ankommt, etwa bei Passungen wie H7/g6, steht die Toleranz ausdrücklich in der Zeichnung; Allgemeintoleranzen decken nur die unbedeutenden Maße ab.
  - Rückfrage: Welche Klassen gelten für allgemeine Form- und Lagetoleranzen?
- Aus der Gesamtzeichnung eines Achsmoduls sollen Fertigungsunterlagen für 25 Module abgeleitet werden. Wie gehen Sie vor, und wie sichern Sie den gültigen Zeichnungsstand?
  - Erwartung: In der Gesamt- oder Gruppenzeichnung erhält jedes Teil eine Positionsnummer, die auf die Stückliste verweist; jedes selbst gefertigte Teil bekommt eine Einzelteilzeichnung mit eigener Zeichnungsnummer, auch bei Fremdfertigung.
  - Erwartung: Normteile wie Schrauben, Scheiben und Ringe sowie Katalogteile erhalten keine eigene Zeichnung, sie stehen mit Norm- oder Bestellbezeichnung in der Stückliste.
  - Erwartung: Die Mengen werden von oben nach unten multipliziert: 2 Achsflansche je Modul ergeben bei 25 Modulen 50 Achsflansche, bei 6 Schrauben je Achsflansch sind es 300 Schrauben.
  - Erwartung: Der Zeichnungsstand steht als Änderungsindex im Schriftfeld; Fertigungsaufträge, Stückliste, Prüfplan und Wareneingang müssen sich auf denselben gültigen Stand beziehen, veraltete Stände werden gesperrt oder gekennzeichnet.
  - Erwartung: Bleibt ein geändertes Teil mit dem alten austauschbar, bleibt die Zeichnungsnummer und der Index steigt; sonst vergibt man eine neue Nummer und passt die Stückliste an.
  - Rückfrage: Worin unterscheiden sich Fertigungszeichnung und Montagezeichnung?

### 6.2 Werkstoffkunde (Metalle/Kunststoffe)

- Auf Zeichnungen der Vantera stehen die Werkstoffkurznamen S235JR, C45, 42CrMo4 und X5CrNi18-10. Wie lesen Sie diese Namen, und welche Aussage zur Belastbarkeit lässt sich aus einem Kurznamen wie S355 ableiten?
  - Erwartung: S235JR gehört zur Gruppe 1: S steht für Stahlbau, 235 für die Mindeststreckgrenze von 235 N/mm², und JR gibt die Prüftemperatur der Kerbschlagarbeit an (27 J bei +20 °C).
  - Erwartung: C45 ist ein unlegierter Stahl der Gruppe 2: Der Buchstabe C steht für unlegiert und die Zahl für das Hundertfache des mittleren Kohlenstoffgehalts, hier etwa 0,45 % Kohlenstoff.
  - Erwartung: 42CrMo4 ist niedriglegiert (kein Legierungselement über 5 %) mit etwa 0,42 % Kohlenstoff, Chrom (Kennzahl 4 mal Faktor 4, also etwa 1 %) und Molybdän.
  - Erwartung: Hochlegierte Stähle beginnen mit X und nennen die Gehalte in Prozent ohne Faktor: X5CrNi18-10 hat etwa 0,05 % Kohlenstoff, 18 % Chrom und 10 % Nickel (rostfreier Stahl).
  - Erwartung: Aus der Streckgrenze lässt sich die elastisch ertragbare Kraft abschätzen, F = Re · A; ein Zugstab aus S355 mit 100 mm² Querschnitt verformt sich bis mindestens 35,5 kN nur elastisch.
  - Rückfrage: Wofür steht die Bezeichnung EN-GJL-200?
- Was lässt sich aus dem Eisen-Kohlenstoff-Diagramm für die Auswahl und die Wärmebehandlung eines Stahls ablesen, und was bedeutet das für einen C45?
  - Erwartung: Das Diagramm zeigt das Gefüge bei gegebenem Kohlenstoffgehalt und gegebener Temperatur; wichtige Punkte sind 0,8 % C bei 723 °C (eutektoid), 2,06 % C als Grenze zwischen Stahl und Gusseisen und 4,3 % C bei 1.147 °C (eutektisch).
  - Erwartung: Ein C45 ist untereutektoid und besteht bei Raumtemperatur aus Ferrit und Perlit, näherungsweise 0,45 / 0,8 = 56 % Perlit und 44 % Ferrit.
  - Erwartung: Mit steigendem Kohlenstoffgehalt nehmen Härte und Festigkeit zu, Zähigkeit und Schweißbarkeit ab; ein C60 mit etwa 75 % Perlit ist fester und härter, aber weniger zäh als ein C45.
  - Erwartung: Zum Härten wird der Stahl ins Austenitgebiet erhitzt und so schnell abgeschreckt, dass Martensit entsteht, ein sehr hartes, sprödes Gefüge; gut härtbar sind Stähle ab etwa 0,3 % Kohlenstoff.
  - Rückfrage: Welche Gefügebestandteile kennen Sie, und was kennzeichnet sie?
  - Rückfrage: Warum lässt sich ein Stahl mit 0,1 % Kohlenstoff nicht direkt härten?
- Eine Welle braucht eine verschleißfeste Lagerstelle bei zähem Kern, ein Zahnrad aus kohlenstoffarmem Stahl harte Zahnflanken. Welche Wärmebehandlung wählen Sie jeweils?
  - Erwartung: Für die Lagerstelle eignet sich das Randschichthärten (Flamm- oder Induktionshärten): Nur die Oberfläche wird austenitisiert und abgeschreckt, der Kern bleibt zäh; geeignet sind Stähle mit etwa 0,35 bis 0,6 % C wie C45.
  - Erwartung: Druckeigenspannungen in der Randschicht erhöhen dabei zusätzlich die Dauerfestigkeit.
  - Erwartung: Kohlenstoffarme Stähle (etwa 0,1 bis 0,2 % C) lassen sich nicht direkt härten; beim Einsatzhärten wird die Randschicht aufgekohlt, gehärtet und niedrig angelassen, es bleibt ein zäher Kern, zum Beispiel für Zahnräder.
  - Erwartung: Beim Nitrieren diffundiert Stickstoff in die Oberfläche und bildet harte Nitride; es wird nicht abgeschreckt, der Verzug ist sehr gering, und die dünne Schicht (etwa 0,1 bis 0,6 mm, Richtwert) eignet sich für fertig bearbeitete Teile.
  - Rückfrage: Was versteht man unter der kritischen Abkühlgeschwindigkeit, und warum lassen sich legierte Stähle auch in Öl härten?
  - Rückfrage: Was bedeutet die Einhärtungstiefe bei einem dicken Bauteil?
- Wann kommt es bei einer Baugruppe zu Kontaktkorrosion, und wie beurteilen Sie eine Stahlschraube im Kupferblech und eine Stahlschraube in einem Zinkteil?
  - Erwartung: Kontaktkorrosion entsteht, wenn zwei unterschiedliche Metalle elektrisch leitend verbunden und von einem Elektrolyten benetzt sind; das unedlere Metall löst sich auf, das edlere wird geschützt.
  - Erwartung: Welches Metall unedler ist, zeigt die Spannungsreihe: Je negativer das Standardpotenzial, desto unedler; Richtwerte sind etwa +0,34 V für Kupfer, −0,44 V für Eisen und −0,76 V für Zink.
  - Erwartung: Die Stahlschraube im Kupferblech ist gefährdet, weil Stahl das unedlere Metall ist (Potenzialunterschied etwa 0,78 V); im Zinkteil wird dagegen das Zink angegriffen und schützt den Stahl.
  - Erwartung: Ungünstig ist eine kleine unedle Fläche bei großer edler Fläche, weil sich der Angriff auf die kleine Fläche konzentriert.
  - Erwartung: Gegenmaßnahmen sind, den Kontakt zu vermeiden oder durch Isolierung (Kunststoffhülsen, -scheiben) zu trennen, Werkstoffe mit geringem Potenzialunterschied zu paaren und Spalte oder Wassersäcke zu vermeiden.
  - Rückfrage: Wie wirkt eine Opferanode?
  - Rückfrage: Warum ist Lochfraß an rostfreiem Stahl besonders tückisch?
- Vantera erwägt, ein Stahlgehäuse durch ein Aluminiumbauteil zu ersetzen. Welche Vorteile und welche Risiken sehen Sie, und welche Legierungsgruppe käme für ein zerspanend gefertigtes Teil in Frage?
  - Erwartung: Aluminium hat mit etwa 2,7 kg/dm³ rund ein Drittel der Dichte von Stahl; bei 1,5 dm³ wiegt das Stahlteil 11,775 kg, das Aluminiumteil 4,05 kg, das sind rund 65,6 % Einsparung im reinen Dichtevergleich.
  - Erwartung: Dem stehen geringere Festigkeit und Steifigkeit gegenüber (E-Modul etwa 70.000 statt 210.000 N/mm², Richtwerte); die Querschnitte müssen angepasst werden, und der Leichtbauvorteil fällt geringer aus.
  - Erwartung: Aluminium dehnt sich etwa doppelt so stark aus wie Stahl (etwa 23 · 10⁻⁶ gegenüber 12 · 10⁻⁶ 1/K, Richtwerte): Ein 300 mm langes Gehäuse wächst bei 50 K um 0,345 mm, ein Stahlteil um 0,18 mm, was bei engen Passungen zählt.
  - Erwartung: Für feste, zerspanbare Teile eignen sich aushärtbare Knetlegierungen der Serie 6xxx (Magnesium und Silizium, zum Beispiel EN AW-6082 alias AlMgSi1); ihre Festigkeit entsteht durch Lösungsglühen, Abschrecken und Auslagern.
  - Erwartung: Gehäuse im Druckguss bestehen dagegen aus Gusslegierungen mit der Bezeichnung EN AC, deren wichtigstes Legierungselement meist Silizium ist.
  - Rückfrage: Was bedeutet der Zustand T6 bei einer Aluminiumlegierung?
  - Rückfrage: Welche Kupferlegierung eignet sich für Gleitlager und Lagerbuchsen, und warum?
- Eine Gleitleiste aus Polyamid soll in eine Stahlnut eingebaut werden. Welche Eigenschaften dieses Kunststoffs sind dabei zu berücksichtigen, und wie unterscheiden sich amorphe und teilkristalline Thermoplaste?
  - Erwartung: Polyamid (PA) ist zäh, verschleißfest und gleitfähig, deshalb für Zahnräder, Gleitlager und Führungselemente geeignet; es ist ein teilkristalliner Thermoplast, meist milchig-trüb, mit einem Schmelzbereich.
  - Erwartung: Teilkristalline Thermoplaste bleiben durch ihre Kristallite auch oberhalb der Glasübergangstemperatur bis nahe an den Schmelzbereich tragfähig, amorphe (zum Beispiel PS, PC, PMMA) erweichen dagegen allmählich.
  - Erwartung: Kunststoffe dehnen sich stärker aus als Stahl: Bei 200 mm und 50 K wächst die PA-Leiste (α etwa 80 · 10⁻⁶ 1/K) um 0,80 mm, die Stahlnut um 0,12 mm; die Differenz von 0,68 mm muss als Spiel vorgesehen werden, etwa durch ein Langloch.
  - Erwartung: PA nimmt je nach Umgebung Feuchtigkeit auf und quillt geringfügig, was Passungen beeinflusst; außerdem sinkt die Festigkeit mit der Temperatur, und Kunststoffe kriechen unter Dauerlast.
  - Rückfrage: Welches Elastomer ist gegen Öle und Kraftstoffe beständig, und wofür wird es eingesetzt?
  - Rückfrage: Wofür steht die Angabe PA66-GF30?

### 6.3 Werkstoffprüfung

- Im Wareneingang zeigt ein Stab mit dem Zeugniswert Rm = 800 N/mm² eine Härte von 229 HBW 10/3000. Wie beurteilen Sie das, und warum sind Härteskalen nicht exakt umrechenbar?
  - Erwartung: Die Faustregel Rm ≈ 3,5 · HB (Richtwert für unlegierte und niedriglegierte Stähle) ergibt für 229 HBW rund 800 N/mm²; das deckt sich mit dem Zeugnis, der Wert ist plausibel.
  - Erwartung: Weicht die Härte deutlich ab (Anhalt: mehr als etwa 10 %), prüft man nach: Härte an mehreren Stellen wiederholen, Zeugnis und Charge abgleichen und gegebenenfalls einen Zugversuch an einer Probe durchführen.
  - Erwartung: Die Faustregel gilt nur näherungsweise und nicht für alle Werkstoffe; für Aluminium, Kupfer und austenitische Stähle ist der Faktor anders, für Gusseisen gilt sie nicht.
  - Erwartung: Zwischen den Härteskalen gibt es keine exakte Umrechnung, nur Richtwert-Tabellen (für Stahl DIN EN ISO 18265), weil die Verfahren Verschiedenes messen (Eindruckfläche, Diagonale, Tiefe) und andere Prüfkörper und Prüfkräfte nutzen.
  - Erwartung: Deshalb prüft man bei Zeichnungsangabe oder Abnahme möglichst in dem Verfahren, das gefordert ist.
  - Rückfrage: Was bedeutet die Angabe 229 HBW 10/3000 im Einzelnen?
- Eine Antriebswelle bricht nach langer Laufzeit ohne sichtbare Verformung, obwohl die Spannungen weit unter der Zugfestigkeit lagen. Wie erklären Sie das, und wie lässt sich die Dauerfestigkeit verbessern?
  - Erwartung: Bauteile versagen oft durch wiederholte Belastung weit unter der Zugfestigkeit (Ermüdung); der Dauerschwingversuch nach Wöhler belastet Proben mit periodisch wechselnder Spannung und zählt die Lastspiele bis zum Bruch.
  - Erwartung: Im Wöhler-Diagramm hält die Probe im Bereich der Zeitfestigkeit nur begrenzt viele Lastspiele aus, unterhalb der Dauerfestigkeit beliebig lange; bei Stahl liegt sie bei etwa 10⁷ Lastspielen, Aluminium hat keine ausgeprägte.
  - Erwartung: Der Dauerbruch beginnt an einer Kerbe, Riefe oder einem Oberflächenfehler, wächst als glatte Bruchfläche mit Rastlinien und endet im Restgewaltbruch.
  - Erwartung: Die Dauerfestigkeit verbessern feinere Oberflächen, Verrundungen statt scharfer Kanten und Eigenspannungen aus dem Randschichthärten.
  - Erwartung: Wechselt eine Welle zwischen +200 N/mm² und −200 N/mm², sind die Spannungsamplitude 200 N/mm², die Mittelspannung 0 und R = −1; bei 50 Hz dauern 10⁷ Lastspiele rund 55,6 Stunden.
  - Rückfrage: Was unterscheidet wechselnde von schwellender Belastung?
- Für welche Werkstoffe setzt man statt des Zugversuchs einen Biegeversuch ein, und wie hängt die Biegespannung von der Probengeometrie ab?
  - Erwartung: Beim Dreipunkt-Biegeversuch liegt die Probe auf zwei Auflagern, in der Mitte drückt ein Stempel mit der Kraft F, und gemessen werden Kraft und Durchbiegung.
  - Erwartung: Eingesetzt wird er vor allem bei spröden Werkstoffen wie Keramik, Gusseisen und Hartmetall, bei denen der Zugversuch wegen der Einspannung schwierig ist; als Faltversuch prüft er Umformbarkeit und Schweißnähte.
  - Erwartung: Für einen Rechteckquerschnitt gilt σ_b = 3 · F · l / (2 · b · h²); die Biegefestigkeit ist die Biegespannung bei Bruch.
  - Erwartung: Eine Keramikprobe mit b = 10 mm, h = 5 mm und l = 80 mm, die bei 1.200 N bricht, hat 576 N/mm² Biegefestigkeit; weil die Höhe quadratisch eingeht, trägt eine doppelt so hohe Probe die vierfache Kraft.
  - Rückfrage: Welche Nachteile hat technische Keramik trotz ihrer Härte?
