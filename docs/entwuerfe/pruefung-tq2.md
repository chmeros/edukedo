# Fachliche Prüfung: Entwurf `tf-ergaenzungen-tq2.md` (TQ2, Themen 6.1 bis 6.3)

Stand 12.10.2026 · unabhängige Prüfung (Technik, Maschinenbau/Werkstofftechnik) · geprüft wurde der Entwurf in der vorliegenden Fassung, verglichen mit `content/technischer-fachwirt/tq2/6.1`, `6.2`, `6.3` und `tq1/5.1` sowie `content/README.md` („Schreibweise“). Am Entwurf und unter `content/` wurde nichts verändert.

## Vorgehen und Gesamteindruck

- Alle Zahlenbeispiele wurden in einem eigenen Python-Skript neu gerechnet (Brinell, Vickers, Rockwell, Zugfestigkeit, Abkühlgeschwindigkeiten, Querschnittsanteil, Abtragrate, Restlebensdauer, Zinkschicht, Massenvergleich, Wärmeausdehnung, Stücklistenmengen, Maßstab). **Sämtliche Rechnungen und Rundungen stimmen**, auch die Einheiten (Details am Ende, „Nachgerechnet“).
- Die Formeln und die Tabellenwerte (HBW-Formel mit 0,102, HV = 0,1891·F/d², HRC = 100 − e/0,002 mm, Beanspruchungsgrad 30, d-Bereich 0,24 D bis 0,6 D, HV/HRC-Umrechnung, Standardpotenziale, Legierungsserien, Zuordnung AlMgSi1 = EN AW-6082 und EN AW-7075 = AlZn5,5MgCu, Kunststoffkurzzeichen) sind nach meinem Fachwissen **richtig**.
- Es gibt **keine Rechtsaussagen**: Gefahrstoffe, Arbeitsschutz und Umweltrecht kommen im Lehrtext nicht vor (Beizen, Passivieren, Eloxieren, Verzinken, Ölabschreckung, Blei im Rotguss werden nur technisch genannt, ohne Schutzmaßnahmen oder Grenzwerte). Unbedenklich.
- Verstöße gegen die Hausregeln (Anrede, Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten, Gendern) habe ich im Lehrtext **nicht** gefunden; nur Kleinigkeiten (siehe „Stil“).
- Sicherheitsangabe je Befund: **hoch** = ich bin mir sicher (Norm bzw. Standardwissen), **mittel** = Standardlehrmeinung, aber Quellen weichen teils ab, **gering** = bitte gegenprüfen.

Zahl der Befunde: **2 Fehler (B1 bis B2), 22 ungenau (B3 bis B24), 9 fehlt (B25 bis B33), 6 Stil (B34 bis B39)**, insgesamt 39. Die meisten „ungenau“-Befunde sind Feinheiten (Richtwerte, Begriffe, Konsistenz zum Bestand); fachlich gewichtig sind B1, B3, B7, B14, B25 und B30.

---

## A. Fehler

### B1 · Abschnitt 6 · Fehler (gering bis mittel) · Sicherheit: hoch

**Zitat:** „**Normteile** (Schrauben, Scheiben, Ringe) und andere **Zukaufteile** erhalten keine eigene Zeichnung, sondern stehen mit ihrer Normbezeichnung in der Stückliste.“ sowie „Die Einzelteilzeichnungen werden also für Welle, Grundkörper und Lagerbuchse benötigt; Schrauben, Scheiben und Ringe sind Normteile und stehen nur in der Stückliste.“

**Begründung:** Die Verallgemeinerung „Zukaufteile erhalten keine eigene Zeichnung“ ist falsch. Das gilt nur für **Norm- und Katalogteile**. Teile, die ein Zulieferer nach der Zeichnung des Unternehmens fertigt (Fremdfertigung, Lohnfertigung), sind ebenfalls Zukaufteile und brauchen eine Zeichnung des Bestellers; genau das beschreibt der vorhandene Text 6.1 („weder die eigene Fertigung noch ein externer Zulieferer“ kann ohne Zeichnung herstellen). Außerdem wird im Beispiel stillschweigend angenommen, dass die Lagerbuchse selbst gefertigt wird; eine Lagerbuchse kann ebenso ein Katalogteil sein. Ein Prüfling würde „Zukaufteil = keine Zeichnung“ lernen.

**Korrekturvorschlag:** „**Normteile** (Schrauben, Scheiben, Ringe) und **Katalogteile** erhalten keine eigene Zeichnung, sondern stehen mit ihrer Norm- oder Bestellbezeichnung in der Stückliste. Lässt das Unternehmen ein Teil von einem Zulieferer nach eigener Zeichnung fertigen (Fremdfertigung), braucht es dennoch eine Einzelteilzeichnung.“ Und im Beispiel: „Die Einzelteilzeichnungen werden also für Welle, Grundkörper und Lagerbuchse benötigt (hier ist angenommen, dass die Lagerbuchse nach eigener Zeichnung gefertigt wird); …“

### B2 · Abschnitt 5 · Fehler (gering) · Sicherheit: hoch

**Zitat:** „**Amorphe** Thermoplaste (zum Beispiel PS, PVC, PC, ABS) sind meist transparent und erweichen allmählich;“

**Begründung:** ABS ist zwar amorph, aber wegen der enthaltenen Kautschukphase (Butadien) **undurchsichtig** (opak bis höchstens durchscheinend). Auch Hart-PVC ist im Alltag überwiegend pigmentiert und opak. Das „meist“ rettet den Satz nur für PS und PC; ABS ist ein klassischer Prüfungsfall für „amorph, aber nicht transparent“. Das Beispiel erzeugt eine falsche Merkregel.

**Korrekturvorschlag:** „**Amorphe** Thermoplaste (zum Beispiel PS, PC, PVC, ABS) erweichen allmählich; ungefüllte, nicht eingefärbte Typen wie PS, PC und PMMA sind transparent (ABS ist wegen seiner Kautschukphase trotz amorphem Aufbau undurchsichtig); **teilkristalline** …“

---

## B. Ungenau

### B3 · Abschnitt 1 · ungenau (methodisch) · Sicherheit: hoch (Streuung der Faustregel), mittel (Wortlaut)

**Zitat:** „Wird im Wareneingang bei Material mit der Zeugnisangabe Rm = 800 N/mm² diese Härte gemessen, ist das plausibel; weicht der Wert deutlich ab (Richtwert: mehr als etwa 10 %), veranlasst die Prüfung einen Zugversuch an einer Probe oder eine Reklamation.“

**Begründung:** Die Faustregel Rm ≈ 3,5 · HB streut selbst um etwa ±5 bis 10 % (Quellen nennen 3,3 bis 3,6; der Entwurf räumt das in „Zu entscheiden“ 3c ein). Eine Abweichung von 10 % ist daher noch kein Reklamationsgrund. Eine Reklamation allein aufgrund einer Härtemessung mit Umrechnung ist fachlich nicht haltbar, zuverlässig ist nur der Zugversuch bzw. der Vergleich mit dem Abnahmezeugnis. Außerdem ist „veranlasst die Prüfung“ sprachlich schief.

**Korrekturvorschlag:** „…ist das plausibel. Weicht der Wert deutlich ab (Anhalt: mehr als etwa 10 %), ist das ein Anlass zur Nachprüfung: Härte an mehreren Stellen wiederholen, Zeugnis und Charge abgleichen und gegebenenfalls einen Zugversuch an einer Probe durchführen. Allein aus der Härte lässt sich die Zugfestigkeit nur näherungsweise abschätzen.“

### B4 · Abschnitt 1 · ungenau (Begriff) · Sicherheit: mittel

**Zitat:** „das Verhältnis 0,102 · F / D² (der **Belastungsgrad**) beträgt dann 30.“

**Begründung:** In den Brinell-Normen und in der deutschen Fachliteratur heißt 0,102 · F / D² **Beanspruchungsgrad** (in ISO 6506 sinngemäß „Kraft-Durchmesser-Index“). „Belastungsgrad“ ist kein üblicher Fachbegriff und kann in einer Prüfung zu Verwechslungen führen. Der Wert 30 für Stahl ist richtig.

**Korrekturvorschlag:** „…das Verhältnis 0,102 · F / D² (der **Beanspruchungsgrad**) beträgt dann 30.“

### B5 · Abschnitt 1 · ungenau · Sicherheit: mittel

**Zitat:** „bei geringer Härte (unter etwa 350) sind HB und HV annähernd gleich groß.“

**Begründung:** Nach ISO 18265 ist HBW im unteren Härtebereich etwas kleiner als HV (z. B. 300 HV entsprechen rund 285 HB, 200 HV rund 190 HB), also um etwa 5 %. „Annähernd gleich groß“ stimmt als Merkregel, sollte aber als Näherung gekennzeichnet sein, weil der Text vorher betont, dass es keine exakte Umrechnung gibt.

**Korrekturvorschlag:** „…bei geringer Härte (unter etwa 350) liegen HB und HV nah beieinander (HB ist etwas kleiner als HV).“

### B6 · Abschnitt 1 · ungenau (Konsistenz zu 6.3) · Sicherheit: hoch

**Zitat (Entwurf):** „Bei der **Brinell-Härte** wird eine Hartmetallkugel (Kurzzeichen **HBW** …“ **– Zitat (6.3 vorhanden):** „wird eine gehärtete Kugel mit definierter Prüfkraft in die Werkstoffoberfläche gedrückt“

**Begründung:** Kein Widerspruch in der Sache, denn heute ist nur die Hartmetallkugel (HBW) genormt (die Stahlkugel HBS wurde abgeschafft). Der Bestandstext sagt nur „gehärtete Kugel“; Lernende können daraus keinen Unterschied ableiten. Empfehlung, beim Einarbeiten den Satz in 6.3 oder die Einleitung des neuen Abschnitts anzugleichen.

**Korrekturvorschlag:** Im neuen Abschnitt zusätzlich: „(Die früher übliche Stahlkugel, Kurzzeichen HBS, ist nicht mehr genormt.)“ Oder in 6.3 „gehärtete Kugel“ durch „Hartmetallkugel“ ersetzen.

### B7 · Abschnitt 2 · ungenau (Widerspruch zum Bestand) · Sicherheit: hoch

**Zitat (Entwurf):** „Hohes Anlassen (etwa 500 bis 650 °C) nach dem Härten heißt **Vergüten** und liefert hohe Zähigkeit bei guter Festigkeit“ **– Zitat (6.2 vorhanden):** „(die Kombination aus Härten und Anlassen wird als **Vergüten** bezeichnet)“; Karteikarte K-6.2-16: „Die Kombination aus Härten und anschließendem Anlassen eines Stahlbauteils.“

**Begründung:** Der Entwurf ist normnäher (DIN EN 10052: Vergüten = Härten und Anlassen bei hoher Temperatur), der Bestand ist vereinfacht und würde auch das niedrige Anlassen (Werkzeuge, Wälzlager) „Vergüten“ nennen. Beides steht dann im selben Thema nebeneinander. Das ist für Prüflinge verwirrend (und Quiz/Karteikarte „Vergüten = Härten + Anlassen“ bleibt stehen). Der Entwurf selbst ist hier richtig; die Anpassung betrifft den Bestand. Die obere Grenze 650 °C ist üblich, 42CrMo4 wird allerdings bis etwa 680 °C angelassen; als Richtwert vertretbar.

**Korrekturvorschlag:** Im neuen Abschnitt: „Hohes Anlassen (etwa 500 bis 650 °C) nach dem Härten heißt **Vergüten** (Härten mit anschließendem Anlassen bei hoher Temperatur, siehe „Wärmebehandlung von Stahl“) …“ und im Bestand 6.2 „Wärmebehandlung von Stahl“ ergänzen: „…(die Kombination aus Härten und Anlassen bei hoher Temperatur wird als **Vergüten** bezeichnet)“.

### B8 · Abschnitt 2 · ungenau (Verständlichkeit) · Sicherheit: hoch

**Zitat:** „Erwärmen etwa 30 bis 50 K über die Austenitisierungslinie (GS-Linie; bei übereutektoiden Stählen über 723 °C)“ und „bei untereutektoiden Stählen etwa 30 bis 50 K über der GS-Linie“

**Begründung:** Die Bezeichnung „GS-Linie“ wird im Bestandstext „Eisen-Kohlenstoff-Diagramm im Überblick“ nirgends eingeführt (dort nur drei Punkte). Die Lernenden können sie nicht zuordnen; außerdem gilt die GS-Linie nur für untereutektoide Stähle (für übereutektoide wäre es die SK-Linie bei 723 °C; zusammen oft „GSK-Linie“). Die Temperaturangaben selbst sind korrekt.

**Korrekturvorschlag:** Einmal erklären: „Die Linie im Eisen-Kohlenstoff-Diagramm, oberhalb der das Gefüge vollständig austenitisch ist (GS-Linie, bei untereutektoiden Stählen je nach Kohlenstoffgehalt zwischen 723 °C und 911 °C), …“ Zusätzlich für C45 den Zahlenbezug: „(C45: Austenitgrenze bei etwa 780 °C)“. Das macht die Richtwerte 800 bis 850 °C nachvollziehbar.

### B9 · Abschnitt 2 · ungenau · Sicherheit: mittel

**Zitat:** „Man unterscheidet die **Aufhärtbarkeit** (erreichbare Höchsthärte, bestimmt vom Kohlenstoffgehalt) von der **Einhärtbarkeit** (Einhärtungstiefe, bestimmt vor allem von den Legierungselementen); sie wird im **Stirnabschreckversuch** (Jominy-Versuch) ermittelt“

**Begründung:** Fachlich richtig. Das Bezugswort von „sie“ ist aber unklar (Einhärtbarkeit oder Einhärtungstiefe oder Aufhärtbarkeit). Der Jominy-Versuch liefert den Härteverlauf, aus dem man beides abliest: die Höchsthärte an der Stirnfläche (Aufhärtbarkeit) und die Eindringtiefe der Härte (Einhärtbarkeit). Außerdem steht „Einhärtungstiefe“ ohne Definition (üblich: Abstand von der Oberfläche bis zur Grenzhärte, bei der das Gefüge noch etwa zur Hälfte aus Martensit besteht).

**Korrekturvorschlag:** „…; beide Eigenschaften werden im **Stirnabschreckversuch** (Jominy-Versuch) ermittelt: Eine Probe wird nur an der Stirnfläche abgeschreckt, und man misst die Härte entlang der Probe. Die Einhärtungstiefe reicht von der Oberfläche bis dorthin, wo die Härte unter eine festgelegte Grenzhärte fällt.“

### B10 · Abschnitt 2 · ungenau · Sicherheit: mittel

**Zitat:** „Ergebnis: **harte, verschleißfeste Randschicht und zäher Kern**, zum Beispiel für Zahnräder und Nockenwellen. Die Einsatzhärtetiefe liegt typisch bei etwa 0,5 bis 2 mm (Richtwert).“

**Begründung:** Richtig, aber die Einsatzhärtetiefe (Eht) ist per Definition die Tiefe bis zur Grenzhärte (üblich 550 HV); der Entwurf (Zu entscheiden 4) lässt das offen. Ohne Definition bleibt die Zahl unscharf. Der Hinweis ist nicht falsch, ich würde die Grenzhärte aber nennen, weil 550 HV die gängige Angabe ist (Sicherheit: mittel bis hoch).

**Korrekturvorschlag:** „Die Einsatzhärtetiefe wird bis zu einer Grenzhärte gemessen (üblich 550 HV) und liegt typisch bei etwa 0,5 bis 2 mm (Richtwert).“

### B11 · Abschnitt 3 · ungenau · Sicherheit: hoch

**Zitat:** „Bei **Kontaktkorrosion** wird das unedlere Metall angegriffen, und zwar umso stärker, je größer der Potenzialunterschied ist.“

**Begründung:** Der Potenzialunterschied ist nur eine Tendenz. Die Korrosionsrate hängt ebenso von Elektrolyt, Leitfähigkeit, Flächenverhältnis und der Reaktionskinetik ab. Passivierte Metalle (Aluminium, Edelstahl) verhalten sich anders, als es die Standardpotenzialtabelle erwarten ließe; der Entwurf sagt das im selben Absatz weiter unten selbst. Die Kernaussage „umso stärker“ steht davor ohne Einschränkung und kann als Rechenregel missverstanden werden. Auch der Vergleich „Stahlschraube im Kupferblech stärker gefährdet als im Zinkteil“ ist als Beispiel sauber, aber im zweiten Fall wird das Zink angegriffen, nicht die Schraube.

**Korrekturvorschlag:** „Bei **Kontaktkorrosion** wird das unedlere Metall angegriffen, und zwar tendenziell umso stärker, je größer der Potenzialunterschied ist; weitere Einflüsse sind Elektrolyt und Flächenverhältnis.“

### B12 · Abschnitt 3 · ungenau (Richtwert) · Sicherheit: mittel

**Zitat:** „**Feuerverzinken** liefert dicke Schichten (Richtwert etwa 50 bis 100 µm), **galvanisches Verzinken** dünne (Richtwert etwa 5 bis 25 µm).“

**Begründung:** Beim Stückverzinken (DIN EN ISO 1461) hängt die Mindestdicke von der Stahldicke ab (örtlich mindestens etwa 45 bis 70 µm, mittlere Mindestdicke 55 bis 85 µm); tatsächlich erreicht werden häufig 80 bis 150 µm und mehr. „50 bis 100 µm“ ist also eher die untere Hälfte. Die Bandbreite der Praxis ist größer; als Richtwert vertretbar, aber leicht zu niedrig. Galvanisch 5 bis 25 µm passt. Zum Eloxal („einige Mikrometer“, dann 5 bis 25 µm) ist „einige“ schief; Schutzeloxal liegt bei etwa 5 bis 25 µm, Hartanodisieren deutlich darüber (bis etwa 100 µm).

**Korrekturvorschlag:** „**Feuerverzinken** liefert dicke Schichten (Richtwert etwa 50 bis 150 µm), **galvanisches Verzinken** dünne (Richtwert etwa 5 bis 25 µm).“ Und: „…auf etwa 5 bis 25 µm verstärkt (Richtwert; Hartanodisieren liefert dickere Schichten).“

### B13 · Abschnitt 3 · ungenau · Sicherheit: hoch

**Zitat:** „Edelstahl ist nicht unempfindlich: Chloride verursachen Lochfraß; ein Zusatz von Molybdän (zum Beispiel X5CrNiMo17-12-2) verbessert die Beständigkeit.“

**Begründung:** Richtig (X5CrNiMo17-12-2 ist 1.4401). Der Begriff „Edelstahl“ ist allerdings nicht gleichbedeutend mit „rostfrei“ (es gibt unlegierte Edelstähle; der Entwurf nutzt oben „rostfreie Stähle“ und hier „Edelstahl“ für dasselbe). Für den Prüfling vorteilhaft: einmal sagen, dass im Sprachgebrauch „Edelstahl“ meist rostfreien Stahl meint (wie im Bestand TQ1 5.1, dort „Edelstahl“ für Cr-legierten Stahl).

**Korrekturvorschlag:** „**Rostfreie Stähle** (im Sprachgebrauch meist „Edelstahl“) enthalten mindestens etwa 10,5 % Chrom; …“

### B14 · Abschnitt 4 · ungenau · Sicherheit: hoch

**Zitat:** „**Auslagern** (bei Raumtemperatur: kalt, bei erhöhter Temperatur, Richtwert etwa 150 bis 200 °C: warm)“

**Begründung:** Im selben Absatz folgt als Beispiel EN AW-7075; dessen Warmauslagern (T6) erfolgt bei etwa 120 °C, nicht bei 150 bis 200 °C. EN AW-6082 T6: etwa 160 bis 180 °C; EN AW-2024: etwa 190 °C. Der Richtwert deckt nicht die genannte Legierung ab.

**Korrekturvorschlag:** „…bei erhöhter Temperatur (Richtwert etwa 120 bis 200 °C, je nach Legierung): warm).“

### B15 · Abschnitt 4 · ungenau · Sicherheit: hoch

**Zitat:** „Bei den Knetlegierungen gibt die erste Ziffer der vierstelligen Nummer die **Legierungsserie** und damit das Hauptlegierungselement an:“

**Begründung:** Die Tabelle enthält die Serien 1, 2, 3, 5, 6, 7, die Aussage steht aber ohne Einschränkung. Es fehlen 4xxx (Silizium; vor allem Schweißzusätze und Hartlote) und 8xxx (sonstige Elemente, z. B. Eisen/Lithium). Wenn ein Prüfling nach einer vollständigen Serienübersicht gefragt wird, fehlt das. Die Auslassung ist im Entwurf nur in „Zu entscheiden“ erwähnt, nicht im Lehrtext. Zusätzlich ist bei „1xxx: mindestens 99,0 % Al“ die Spalte „Hauptlegierungselement: keines“ richtig; 6xxx „gut zerspanbar“ stimmt besonders bei den Automatenvarianten (6082 ist mäßig zerspanbar), aber das ist hinnehmbar.

**Korrekturvorschlag:** Zwei Zeilen ergänzen: „EN AW-4xxx | Silizium | niedriger Schmelzbereich, vor allem Schweißzusätze und Lote | meist nicht aushärtbar“ und „EN AW-8xxx | sonstige Elemente | Sonderlegierungen | unterschiedlich“. Alternativ den Satz einschränken: „…gibt die erste Ziffer … an (die wichtigsten Serien):“

### B16 · Abschnitt 4 · ungenau · Sicherheit: mittel

**Zitat:** „**Rotguss:** Gusslegierung aus Kupfer, Zinn, Zink (und Blei, zum Beispiel CuSn5Zn5Pb5)“

**Begründung:** Die Bezeichnung nach EN 1982 lautet vollständig CuSn5Zn5Pb5-C (das „-C“ kennzeichnet Gusswerkstoffe); ohne das Suffix ist die Schreibweise ein Kurzzeichen im Stil des Knetwerkstoffs. Weder falsch noch schlimm, nur unvollständig. Die Aussage „(und Blei …)“ ist ungenau: Rotguss besteht aus Kupfer, Zinn, Zink und Blei; es gibt Rotguss-Varianten ohne Blei. Die bleihaltigen Typen sind nur ein Beispiel; keine rechtliche Aussage nötig.

**Korrekturvorschlag:** „**Rotguss:** Gusslegierung aus Kupfer mit Zinn, Zink und meist auch Blei (zum Beispiel CuSn5Zn5Pb5-C); …“

### B17 · Abschnitt 5 · ungenau · Sicherheit: hoch

**Zitat:** „Kunststoffe haben international genormte **Kurzzeichen** (DIN EN ISO 1043-1), die den Grundbaustein des Polymers benennen;“ … „Typische **Elastomere** sind **NR** (Naturkautschuk), **NBR** (Nitrilkautschuk …) und **EPDM** …“

**Begründung:** Die Kurzzeichen für Kautschuke (NR, NBR, EPDM, SBR, FKM) stehen nicht in ISO 1043-1, sondern in **ISO 1629** (DIN ISO 1629, „Kautschuke und Latices“). Der Entwurf nennt ISO 1043-1 vor der Tabelle und führt die Elastomere im gleichen Zusammenhang auf, ohne die Quelle zu trennen. Die Kurzzeichen selbst sind richtig. Außerdem: Das „Grundbaustein“ benennt Monomer bzw. Grundpolymer; Zusatzstoffe werden mit Suffix ergänzt (siehe B28).

**Korrekturvorschlag:** „…(DIN EN ISO 1043-1); die Kurzzeichen der Kautschuke sind getrennt genormt (DIN ISO 1629).“ Alternativ keine Normnummer nennen.

### B18 · Abschnitt 5 · ungenau · Sicherheit: mittel

**Zitat:** „**teilkristalline** Thermoplaste (zum Beispiel PE, PP, PA, POM, PET, PTFE) sind meist milchig-opak und besitzen einen Schmelzbereich.“

**Begründung:** Im Widerspruch zum Text steht die Tabelle: PET: „Flaschen“. PET-Getränkeflaschen sind klar und transparent, weil sie schnell abgekühlt und streckgeblasen werden und kaum kristallisieren. Im Fließtext steht PET unter „milchig-opak“. Der Entwurf selbst nennt das Problem in „Zu entscheiden“ 8, hat es aber nicht im Lehrtext aufgelöst. Dünne PE- und PP-Folien sind ebenfalls durchscheinend bis klar.

**Korrekturvorschlag:** „…sind meist milchig-trüb (dünne Folien oder schnell abgekühlte Teile können durchscheinend sein; PET kann je nach Verarbeitung auch klar sein) und besitzen einen Schmelzbereich.“

### B19 · Abschnitt 5 · ungenau · Sicherheit: hoch

**Zitat:** „Thermoplaste lassen sich wiederholt erwärmen, umformen und schweißen.“

**Begründung:** Gilt allgemein, aber **PTFE** (im Entwurf als Thermoplast aufgelistet) ist nicht schmelzflüssig verarbeitbar (extrem hohe Schmelzviskosität); es wird gesintert, nicht gespritzt oder geschweißt. Der Hinweis „besitzen einen Schmelzbereich“ in der Liste und diese Aussage sind für PTFE so nicht praxisgerecht.

**Korrekturvorschlag:** „Thermoplaste lassen sich in der Regel wiederholt erwärmen, umformen und schweißen (Ausnahme: PTFE wird gesintert und nicht aufgeschmolzen verarbeitet).“

### B20 · Abschnitt 5 · ungenau · Sicherheit: mittel

**Zitat:** „**Duroplaste** bleiben bis zur Zersetzung formstabil und lassen sich nicht aufschmelzen.“

**Begründung:** Duroplaste werden oberhalb ihrer Glasübergangstemperatur deutlich weicher und verlieren Steifigkeit (z. B. Epoxid bei 100 bis 150 °C); „bis zur Zersetzung formstabil“ ist übertrieben. Richtig ist „lassen sich nicht aufschmelzen und nicht umformen, zersetzen sich bei Überhitzung“. Im Bestand 6.2 steht „meist formstabiler bei höheren Temperaturen“, das ist vorsichtiger.

**Korrekturvorschlag:** „**Duroplaste** bleiben bei hoher Temperatur deutlich formstabiler als Thermoplaste, lassen sich aber nicht aufschmelzen und zersetzen sich bei Überhitzung.“

### B21 · Abschnitt 5 · ungenau · Sicherheit: mittel

**Zitat:** „Thermoplaste sind unterhalb der **Glasübergangstemperatur** hart und glasartig, oberhalb zäh bis weich.“

**Begründung:** Richtig, aber irreführend für teilkristalline Typen: PE (Tg etwa −100 °C) und PP (Tg etwa 0 °C) liegen bei Raumtemperatur **oberhalb** ihrer Tg, bleiben aber durch die Kristallite fest und belastbar; amorphe Typen (PS, PC, PVC) werden dagegen **unterhalb** Tg eingesetzt und erweichen bei Tg. Lernende könnten folgern, PE sei „weich, nicht für Bauteile“.

**Korrekturvorschlag:** Ergänzen: „Amorphe Thermoplaste werden unterhalb der Glasübergangstemperatur eingesetzt; teilkristalline Typen bleiben durch ihre Kristallite auch oberhalb der Glasübergangstemperatur bis nahe an den Schmelzbereich tragfähig.“

### B22 · Abschnitt 6 · ungenau (Begriffe, Konsistenz zu 6.1) · Sicherheit: mittel bis hoch

**Zitat (Entwurf):** „…die **Gesamtzeichnung** (das vollständige Erzeugnis …) und die **Gruppenzeichnung** (eine einzelne Baugruppe …)“ **– Zitat (6.1 vorhanden):** „…die **Zusammenbauzeichnung** (auch Baugruppenzeichnung), die zeigt, wie mehrere Einzelteile zu einer Baugruppe zusammengefügt werden“

**Begründung:** Gesamtzeichnung und Gruppenzeichnung sind im Sinne der Norm (DIN 199-1 bzw. DIN EN ISO 10209; Ausgabestand nicht geprüft) jeweils **Zusammenbauzeichnungen**: eine Gruppenzeichnung ist die Zusammenbauzeichnung einer Gruppe, die Gesamtzeichnung die des vollständigen Erzeugnisses. Der Entwurf setzt beide neben die Zusammenbauzeichnung („Neben der Einzelteil-, der Zusammenbau- … unterscheidet man …“) und lässt offen, wie sie sich zueinander verhalten; der Bestand setzt Zusammenbau = Baugruppenzeichnung. Lernende sehen drei Begriffe für dieselbe Sache und können sie nicht abgrenzen. Außerdem ist „Fertigungszeichnung“ praktisch eine Einzelteilzeichnung für die Fertigung (der Entwurf deutet das nur an).

**Korrekturvorschlag:** „Nach dem Umfang unterscheidet man zwei Arten der Zusammenbauzeichnung: die **Gesamtzeichnung** … und die **Gruppenzeichnung** (= Baugruppenzeichnung) … Die **Fertigungszeichnung** ist in der Regel die Einzelteilzeichnung, ergänzt um alles, was die Werkstatt braucht …“

### B23 · Abschnitt 6 · ungenau (Konsistenz zu 6.1) · Sicherheit: mittel

**Zitat (Entwurf):** „Jeder Achsflansch (Gruppenzeichnung) enthält 1 Grundkörper, 1 Lagerbuchse, 6 Schrauben M10×30 und 6 Sicherungsscheiben.“ **– Zitat (6.1):** „…zeigt die Strukturstückliste beispielsweise, dass bestimmte Normteile (Schrauben, Sicherungsscheiben) einer Unterbaugruppe „Anbauteile“ zugeordnet sind, die wiederum Teil der Gesamtbaugruppe ist“

**Begründung:** Kein harter Widerspruch (die Struktur ist erfunden), aber die Hierarchie ist im Entwurf flacher als im Bestand (dort gibt es eine Unterbaugruppe „Anbauteile“). Wenn beide Abschnitte im selben Thema stehen, sieht das uneinheitlich aus. Die Mengen selbst sind richtig (siehe Nachgerechnet).

**Korrekturvorschlag:** Entweder im Beispiel „Anbauteile“ als Unterbaugruppe ausweisen oder einen Satz ergänzen: „(Im Beispiel sind die Normteile der Einfachheit halber direkt der Baugruppe zugeordnet.)“

### B24 · Abschnitt 6 · ungenau · Sicherheit: mittel

**Zitat:** „Üblich ist: Bleibt das geänderte Teil mit dem alten **austauschbar** (gleiche Passform, Funktion und Schnittstellen), bleibt die Zeichnungsnummer und es steigt der Index; sonst vergibt man eine neue Nummer.“

**Begründung:** Als betriebliche Praxis richtig und als „üblich“ gekennzeichnet. „Austauschbar“ ist hier gleichbedeutend mit „austauschbar in beiden Richtungen“ (alte und neue Teile dürfen unbedenklich gemischt verbaut werden) – so die gängige Definition; die Formulierung „mit dem alten austauschbar“ lässt die Richtung offen. Sinnvoll: ergänzen, dass bei nicht austauschbarer Änderung (Maße/Passung geändert) eine neue Sachnummer folgt und die Stückliste angepasst wird (Teil des Satzes).

**Korrekturvorschlag:** „…Bleibt das geänderte Teil mit dem alten **austauschbar** (altes und neues Teil lassen sich ohne Anpassung gegeneinander verbauen), …“

---

## C. Fehlt

### B25 · Abschnitt 1 · fehlt · Sicherheit: hoch

**Stelle:** „Härtewerte werden als **Zahl ohne Einheit** angegeben, gefolgt vom Kurzzeichen des Verfahrens;“ (und die Begründung in „Zu entscheiden“ 3d zur Kurzform)

**Begründung:** Die Schreibweise der Härteangabe mit Prüfbedingungen fehlt: **229 HBW 10/3000**, **297 HV 10**, **50 HRC**. Die Begründung in „Zu entscheiden“ 3d („weil sich die Schreibweise der Prüfkraft zwischen Normausgaben geändert haben kann“) überzeugt nicht: Die Kurzform HBW 10/3000 ist weiterhin die übliche Angabe (Kugeldurchmesser in mm / Kraftkennzahl, die die Kraft in kp ausdrückt; 3000 kp ≙ 29.420 N). Prüflinge begegnen ihr in Zeichnungen und Prüfberichten (Sicherheit: mittel bis hoch). Im Beispieltext steht außerdem „rund 229“ ohne Kurzzeichen.

**Korrekturvorschlag:** Nach der Beispielrechnung: „Als Härteangabe schreibt man **229 HBW 10/3000**: Härtewert, Verfahren, Kugeldurchmesser in mm und Kraftkennzahl (3000 entspricht 3000 kp, also 29.420 N). Bei Vickers lautet die Angabe zum Beispiel **297 HV 10** (Prüfkraft 10 kp), bei Rockwell **50 HRC**.“ Beim Vickers-Beispiel: „…ist HV 10 = … **rund 297 HV 10**.“

### B26 · Abschnitt 1 · fehlt · Sicherheit: mittel

**Stelle:** „Bei der Skala **HRC** (Diamantkegel, für gehärteten Stahl) gilt **HRC = 100 − e / 0,002 mm**“

**Begründung:** Der Gültigkeitsbereich der Skala (HRC etwa 20 bis 70) und die Formel für HRB (130 − e/0,002 mm) fehlen; ein Prüfling, der „HRC = 100 − …“ lernt, wendet das sonst auch auf HRB an. Der Nebensatz „Die Skala **HRB** (Stahlkugel) dient für weichere Werkstoffe“ ist richtig (heute Hartmetall- oder Stahlkugel nach Norm).

**Korrekturvorschlag:** „…HRC (Diamantkegel; Bereich etwa 20 bis 70 HRC) … Bei der Skala HRB (Kugel) gilt entsprechend HRB = 130 − e / 0,002 mm, sie dient für weichere Werkstoffe.“

### B27 · Abschnitt 1 · fehlt · Sicherheit: mittel

**Stelle:** Gesamter Abschnitt (kein Hinweis zu Prüfbedingungen)

**Begründung:** Wesentliche praktische Voraussetzungen der Härteprüfung fehlen: ausreichende Probendicke (Gegenseite darf keine Verformungsspuren zeigen), Mindestabstand der Eindrücke vom Rand und voneinander, saubere ebene Oberfläche. Sie sind prüfungsrelevant („Warum darf das Blech nicht dünner sein als …?“). Quantitative Regeln (Dicke ≥ 8-fache Eindrucktiefe bei Brinell, ≥ 1,5 · Diagonale bei Vickers) weiß ich zuverlässig nur ungefähr, deshalb nur qualitativ vorschlagen.

**Korrekturvorschlag:** „Die Prüfung verlangt eine ebene, saubere Oberfläche, eine ausreichend dicke Probe (auf der Rückseite darf keine Verformung zu sehen sein) und genügend Abstand der Eindrücke zum Rand und zueinander; sonst liefert die Messung zu niedrige Werte.“

### B28 · Abschnitt 5 · fehlt · Sicherheit: hoch

**Stelle:** Tabelle der Thermoplaste

**Begründung:** Wichtige und prüfungsübliche Kurzzeichen fehlen: **PMMA** (Polymethylmethacrylat, Acrylglas; amorph, transparent), **PU/PUR** (Polyurethan), **PBT**; ferner die Kennzeichnung von Zusätzen (z. B. **PA66-GF30** = Polyamid 66 mit 30 % Glasfasern; in 6.2-Bestand ist „GFK“ eingeführt). Technische Kunststoffe in der Fertigung: PA66-GF30, PEEK. Mindestens PMMA und die Zusatzkennzeichnung sollten ergänzt werden, weil sie ohne großen Aufwand eine Fehlerquelle in Prüfung und Praxis beseitigen.

**Korrekturvorschlag:** Tabellenzeile: „| **PMMA** | Polymethylmethacrylat (Acrylglas) | glasklar, hart, witterungs- und UV-beständig, kratzempfindlich | Scheiben, Leuchtenabdeckungen, Lichtleiter |“. Satz: „Zusätze werden an das Kurzzeichen angehängt: **PA66-GF30** ist Polyamid 66 mit etwa 30 % Glasfaseranteil.“

### B29 · Abschnitt 5 · fehlt · Sicherheit: hoch

**Stelle:** Abschnitt nennt „Typische Eigenschaft“ je Kunststoff, aber keine allgemeinen Kenndaten

**Begründung:** Für die Gegenüberstellung mit Metallen (Prüfungsthema Werkstoffauswahl) fehlen die Gemeinsamkeiten: geringe Dichte (etwa 0,9 bis 1,5 kg/dm³, ungefüllt), geringer Elastizitätsmodul (grob Größenordnung 1.000 bis 4.000 N/mm² gegenüber 210.000 bei Stahl), schlechte Wärmeleitfähigkeit und elektrische Isolation, Alterung (UV, Wärme). Der Vergleich Dichte und E-Modul wurde bei Aluminium (Abschnitt 4) gezogen, bei Kunststoffen nicht.

**Korrekturvorschlag:** „Gemeinsam sind den Kunststoffen im Vergleich zu Metallen eine geringe Dichte (ungefähr 0,9 bis 1,5 kg/dm³), ein deutlich kleinerer Elastizitätsmodul, eine geringe Wärmeleitfähigkeit sowie elektrische Isolation; sie altern unter UV-Strahlung und Wärme.“

### B30 · Abschnitt 3 · fehlt · Sicherheit: hoch

**Stelle:** Aufzählung der „Korrosionsarten“

**Begründung:** **Interkristalline Korrosion** (Chromverarmung an den Korngrenzen nach Sensibilisierung bei etwa 450 bis 850 °C, z. B. beim Schweißen von austenitischem Stahl; Gegenmaßnahmen: niedriger Kohlenstoffgehalt oder Stabilisierung mit Titan/Niob) ist bei rostfreien Stählen ein Standardthema und fehlt. Ebenso die **selektive Korrosion (Entzinkung bei Messing)**, die zu Abschnitt 4 passt; **Wasserstoffversprödung** hochfester Stähle (relevant bei galvanischem Verzinken) fehlt ebenfalls. Der Entwurf erwähnt Edelstahl in drei Absätzen, ohne seine wichtigste Schwäche beim Schweißen zu nennen.

**Korrekturvorschlag:** Zusätzlicher Spiegelstrich: „**Interkristalline Korrosion:** Nach Erwärmen in einem bestimmten Temperaturbereich (zum Beispiel beim Schweißen) scheidet austenitischer Edelstahl Chromcarbide an den Korngrenzen aus; das Metall daneben ist an Chrom verarmt und korrodiert entlang der Korngrenzen, ohne dass die Fläche viel Abtrag zeigt. Gegenmittel sind kohlenstoffarme oder mit Titan stabilisierte Sorten.“ Optional: „**Entzinkung:** Bei Messing löst sich selektiv das Zink heraus, es bleibt ein poröses Kupfergefüge.“

### B31 · Abschnitt 2 · fehlt · Sicherheit: mittel

**Stelle:** Aufzählung der „Verfahren der Wärmebehandlung“

**Begründung:** Zwei im Zusammenhang mit dem Gesamtthema (Kaltverfestigung in Abschnitt 4, Zeichnungsangabe der Wärmebehandlung in Abschnitt 6) naheliegende Verfahren fehlen: **Rekristallisationsglühen** (nach starker Kaltumformung, etwa 550 bis 700 °C bei Stahl, stellt Umformfähigkeit wieder her) und die Erwähnung, dass Nitrieren **Stähle mit Nitridbildnern** (Chrom, Aluminium, Molybdän, Vanadium) braucht (**Nitrierstähle**, z. B. 31CrMoV9). Ohne diesen Hinweis würde Nitrieren auch bei C45 als gleichwertig verstanden.

**Korrekturvorschlag:** Spiegelstrich: „**Rekristallisationsglühen:** Nach starker Kaltumformung (Richtwert etwa 550 bis 700 °C bei Stahl) bildet sich ein neues, weiches Gefüge; das Werkstück ist wieder gut umformbar.“ Im Nitrieren-Punkt: „…Besonders wirksam bei Nitrierstählen mit nitridbildenden Elementen wie Chrom, Aluminium, Molybdän.“

### B32 · Abschnitt 4 · fehlt · Sicherheit: hoch

**Stelle:** „…starke Wärmeausdehnung und Neigung zu Kontaktkorrosion mit edleren Metallen.“

**Begründung:** Die „starke Wärmeausdehnung“ bleibt unquantifiziert, obwohl TQ1 5.1 und Abschnitt 5 α für Stahl (12 · 10⁻⁶ 1/K) nennen. Der Zahlenvergleich ist prüfungsüblich: Aluminium etwa 23 · 10⁻⁶ 1/K (rund doppelt so viel wie Stahl), Kupfer etwa 17 · 10⁻⁶ 1/K. Dazu passt die Gusslegierung/Passungs-Problematik bei Alu-Gehäusen mit Stahlteilen.

**Korrekturvorschlag:** „…starke Wärmeausdehnung (Längenausdehnungskoeffizient etwa 23 · 10⁻⁶ 1/K, rund doppelt so groß wie bei Stahl mit 12 · 10⁻⁶ 1/K; Richtwerte) …“

### B33 · Abschnitt 6 · fehlt · Sicherheit: mittel

**Stelle:** Erklärung der Zeichnungsableitung

**Begründung:** Zwei Dinge, die ein Prüfling beim Thema „Zeichnungsableitung“ erwartet, fehlen: (a) die Angabe, **wo** Wärmebehandlung/Härte in der Fertigungszeichnung steht (Zeichnungsangabe wie „gehärtet 58 +4 HRC“ oder „einsatzgehärtet, Eht 0,8 +0,4 mm“) – das knüpft an Abschnitt 1 und 2 an – und (b) **Zeichnungsfreigabe** (Prüfen, Freigeben vor Fertigung). (b) wird mit „beantragt, bewertet, freigegeben“ nur für Änderungen erwähnt. Klein, aber ohne großen Aufwand ergänzbar; auch die Sachnummern-Systematik (sprechende/nicht sprechende Nummern) wäre denkbar, ist aber nicht zwingend.

**Korrekturvorschlag:** In „Fertigungszeichnung“ einen Halbsatz: „…Werkstoff, Wärmebehandlung (zum Beispiel „gehärtet 58 +4 HRC“) …“.

---

## D. Stil

### B34 · Abschnitt 3 · Stil/Struktur · Sicherheit: hoch

**Zitat:** `### Korrosion und Korrosionsschutz` (Einfügeüberschrift)

**Begründung:** Genau diese Überschrift existiert bereits im Thema TQ1 5.1 („Korrosion und Korrosionsschutz“, mit Rosten, Beschichten, Verzinken, Legieren). Zwei gleichnamige Abschnitte in zwei Themen verwirren in der Lesefläche und in der Glossar-/Abschnittsverlinkung („Abschnitt“ springt auf die Überschrift). Außerdem wiederholt der Einstiegsabsatz die Definition aus TQ1 fast wörtlich und verweist nicht darauf.

**Korrekturvorschlag:** Überschrift ändern in `### Korrosionsarten und Korrosionsschutz im Detail`, und Einstiegssatz: „(Grundlagen siehe TQ1, „Korrosion und Korrosionsschutz“.)“

### B35 · Abschnitt 5 · Stil (falscher Querverweis) · Sicherheit: hoch

**Zitat:** „nach **ΔL = α · L₀ · ΔT** (siehe TQ1, Wärmeausdehnung).“

**Begründung:** Im Thema TQ1 5.1 gibt es keine Überschrift „Wärmeausdehnung“; die Formel steht im Abschnitt „Energieformen und Wärme“.

**Korrekturvorschlag:** „(siehe TQ1, Abschnitt „Energieformen und Wärme“).“

### B36 · Abschnitt 2 · Stil · Sicherheit: hoch

**Zitat:** „Das Diagramm zeigt qualitativ:“ und „Eingezeichnet sind Abkühlkurven und die Bereiche, in denen sich die Umwandlungsprodukte bilden.“

**Begründung:** Kein Fehler. Der Abschnitt beschreibt ein Diagramm, das im Lernsystem nicht abgebildet ist. Lernende können sich die Lage der Kurven nur schwer vorstellen. Eine kurze verbale Orientierung (Nase der Perlitumwandlung, Martensit-Waagerechte bei Ms) wäre hilfreich, oder die Bitte um eine Abbildung.

**Korrekturvorschlag:** „Die Perlit- und Bainitgebiete liegen als „Nasen“ im Diagramm; wird die Abkühlkurve links an diesen Nasen vorbeigeführt, bleibt der Austenit bis zur Linie Ms unterkühlt und wandelt dann in Martensit um.“ Alternativ im Vorspann notieren, dass eine Abbildung angefordert werden soll.

### B37 · Abschnitt 1 · Stil · Sicherheit: hoch

**Zitat:** „Aus dem mittleren **Eindruckdurchmesser d** ergibt sich die gekrümmte Oberfläche des Eindrucks (Kugelkalotte), und die Härte ist die Prüfkraft bezogen auf diese Fläche:“

**Begründung:** Inhaltlich richtig. Der Abschnitt ist durch die sechs Absätze mit Formel, Vickers, Rockwell, Tabelle, Faustregel und Umrechnung sehr dicht; Lernende müssen viel am Stück lesen. Ein Rechenablauf in nummerierten Schritten (wie bei anderen Beispielen im Bestand) wäre leserfreundlicher. Reine Empfehlung.

**Korrekturvorschlag:** Die drei Beispielrechnungen (Brinell, Vickers, Rockwell) jeweils als eigenen Absatz mit „*Beispiel Brinell:*“, „*Beispiel Vickers:*“, „*Beispiel Rockwell:*“ kennzeichnen.

### B38 · Abschnitt 2 · Stil (Zahlenschreibweise) · Sicherheit: hoch

**Zitat:** „Eine Welle mit Ø 40 mm … ein Ring zwischen Ø 40 mm und Ø 28 mm gehärtet.“ **– 6.1 vorhanden:** „**Ø40 H7/g6**“

**Begründung:** Im Entwurf „Ø 40 mm“ (mit Leerzeichen), im Bestand bei Passungen „Ø40“. Nach Hausregel ist ein Leerzeichen vor Einheiten gefordert; hinter dem Durchmesserzeichen ist beides üblich. Kein Verstoß, nur uneinheitlich. Weitere Hausregeln (Anrede, Gendern, Tausenderpunkt „29.420 N“, „1.256,6 mm²“, Dezimalkomma, „10 %“) werden eingehalten.

**Korrekturvorschlag:** Einheitlich „Ø 40 mm“ beibehalten und bei Passungsangaben „Ø 40 H7/g6“; oder alles ohne Leerzeichen. Entscheidung genügt, keine Änderung nötig.

### B39 · Abschnitt 6 · Stil · Sicherheit: hoch

**Zitat:** „*Maßstab:* Eine Welle von 450 mm Länge wird im Maßstab 1:5 gezeichnet; die Zeichnung misst 450 mm / 5 = **90 mm**, die Maßzahl lautet trotzdem 450.“

**Begründung:** Rechnung richtig (und deckt sich mit „Normung“ im Bestand). Der Maßstabsabsatz hängt am Ende des Stücklisten-Beispiels, obwohl er zu „Normung: Linienarten, Maßstäbe und Schriftfeld“ gehört. Als eigener Satz verständlicher, thematisch aber besser dort. Zudem ist er für den Abschnitt „Zeichnungsarten und -ableitung“ eine fachfremde Zugabe.

**Korrekturvorschlag:** Den Maßstab-Absatz in den Bestandsabschnitt „Normung: Linienarten, Maßstäbe und Schriftfeld“ verschieben oder mit „*Zusatz:*“ abtrennen.

---

## E. Hausregeln und Rechtsnahes (Ergebnis ohne Befund)

- **Anrede:** Der Lehrtext spricht die Lernenden nicht an („man“, Passiv, Sachsätze). Beispiel „Wird im Wareneingang … diese Härte gemessen“ ist unpersönlich. In Ordnung.
- **Gendern:** Keine Personenbezeichnungen im Lehrtext (nur im Kopf des Entwurfs „Fachlehrerin oder den Fachlehrer“, das ist die Paarform und gehört nicht in den Lehrtext). In Ordnung.
- **Zahlen:** Tausenderpunkt (29.420 N, 6.001,7, 70.000 N/mm², 1.256,6 mm²), Dezimalkomma, Leerzeichen vor „%“, „µm“, „°C“, „K/s“, „mm“ durchgehend eingehalten. Auch Potenzschreibweise „12 · 10⁻⁶ 1/K“ stimmt mit TQ1 überein.
- **Rechtsnahes:** Keine Aussagen zu Gefahrstoffen, Arbeitsschutz oder Umweltrecht im Lehrtext. Die Erwähnung von Blei im Rotguss-Kurzzeichen ist rein werkstofftechnisch. Der Vorspann („Zu entscheiden“ 6d) fragt, ob ein Hinweis auf Umweltauflagen ergänzt werden soll: **Nein**, das gehört in die gesperrte Rechtsprüfung; der Lehrtext sollte bei der rein technischen Beschreibung bleiben.

## F. Nachgerechnet (alle Ergebnisse stimmen)

| Abschnitt | Rechnung | Ergebnis (eigene Rechnung) | Entwurf |
|---|---|---|---|
| 1 Brinell | √84 = 9,1652; 10 − 9,1652 = 0,8348; π · 10 · 0,8348 = 26,228; 0,102 · 2 · 29.420 = 6.001,68; Quotient | 228,83 | 229 (✓) |
| 1 Beanspruchungsgrad | 0,102 · 29.420 / 100 (und exakt 29.420 / 9,80665 / 100) | 30,008 (30,000) | 30 (✓) |
| 1 d-Bereich | 0,24 · 10; 0,6 · 10 (zugehörige HBW 654 bzw. 96) | 2,4 mm; 6,0 mm | ✓ |
| 1 Vickers | 0,1891 · 98,07 / 0,0625 (0,1891 = 2 · sin 68° / 9,80665) | 296,72 | 297 (✓) |
| 1 Rockwell | 100 − 0,100 / 0,002 | 50 | 50 HRC (✓) |
| 1 Faustregel | 3,5 · 229; Gegenprobe 800 / 3,5 | 801,5; 228,6 | etwa 800 (✓) |
| 2 Abkühlgeschwindigkeit | 300 K / 5 s; 300 K / 25 s | 60 K/s; 12 K/s | ✓ |
| 2 Querschnittsanteil | (40² − 28²) / 40² = 816 / 1600 (π/4: 640,9 / 1.256,6) | 51,0 % | 51 % (✓) |
| 3 Potenzialunterschied | 0,34 − (−0,44) | 0,78 V | ✓ |
| 3 Abtragrate, Restlebensdauer | 0,3 / 6; 0,7 / 0,05; 80 / 2 | 0,05 mm/Jahr; 14 Jahre; 40 Jahre | ✓ |
| 4 Massen | 1,5 · 7,85; 1,5 · 2,7; 1,5 · 8,9 | 11,775; 4,05; 13,35 kg | ✓ |
| 4 Verhältnisse | 2,7 / 7,85; 1 − 0,344; 11,775 − 4,05; 8,9 / 7,85 | 34,4 %; 65,6 %; 7,725 kg; 113,4 % | ✓ |
| 5 Wärmeausdehnung | 12 · 10⁻⁶ · 200 · 50; 80 · 10⁻⁶ · 200 · 50; 0,80 / 0,12; 0,80 − 0,12 | 0,12 mm; 0,80 mm; 6,67-fach; 0,68 mm | ✓ |
| 6 Stücklistenmengen | 2 · 25; 2 · 25; 1 · 50; 1 · 50; 6 · 50; 6 · 50 | 50; 50; 50; 50; 300; 300 | ✓ |
| 6 Maßstab | 450 / 5; 36 / 2 | 90 mm; 18 mm | ✓ |

Prüfung der fachlichen Tabellenwerte (aus meinem Fachwissen, nicht aus der Norm abgeschrieben): Standardpotenziale Ag +0,80, Cu +0,34, Fe −0,44, Zn −0,76, Al −1,66, Mg −2,37 V ✓. HV→HRC nach ISO 18265 (gerundet): 300 HV ≈ 29,8 HRC, 400 HV ≈ 40,8, 500 HV ≈ 49,1, 600 HV ≈ 55,2, 700 HV ≈ 60,1 – die Entwurfswerte 30/41/49/55/60 sind korrekt gerundet. Dichten (Al 2,7; Cu 8,9; Stahl 7,85 kg/dm³) und E-Moduln (70.000 bzw. 210.000 N/mm²) ✓. Konsistenz zu Bestand: α Stahl 12 · 10⁻⁶ 1/K (TQ1 5.1 ✓), Dichte Stahl 7,85 kg/dm³ (6.2 und TQ1 5.2 ✓), 2,06 % C, 723 °C, 0,8 % C (6.2 ✓).

---

## G. Gesamtbewertung je Abschnitt

| Abschnitt | Bewertung | Wichtigste Korrekturen vor dem Einarbeiten |
|---|---|---|
| 1 Härteprüfung rechnen | **mit Korrektur einarbeiten** | B3 (Plausibilitätsregel, keine Reklamation allein aus Härte), B4 (Beanspruchungsgrad), B25 (Härteangabe 229 HBW 10/3000), B26/B27 (Gültigkeitsbereich HRC, Prüfbedingungen). Alle Rechnungen und Formeln korrekt. |
| 2 Wärmebehandlung im Detail | **mit Korrektur einarbeiten** | B7 (Vergüten mit Bestand abgleichen, K-6.2-16 und Lückentext beachten), B8 (GS-Linie erklären), B9 (Jominy-Satz), optional B31, B36. Fachlich sehr solide, keine Fehler in Temperaturen und Gefügeaussagen. |
| 3 Korrosion und Korrosionsschutz | **mit Korrektur einarbeiten** | B34 (Überschrift doppelt zu TQ1), B11 (Potenzialunterschied nur Tendenz), B12 (Feuerverzinken), B30 (interkristalline Korrosion ergänzen). Standardpotenziale und Rechnung korrekt. |
| 4 Aluminium- und Kupferlegierungen | **mit Korrektur einarbeiten** | B14 (Auslagertemperatur wegen 7075), B15 (Serien 4xxx/8xxx), B32 (Wärmeausdehnung Al), B16 (Rotguss-Schreibweise). Serien, Zuordnung 6082/7075, Dichten und Gewichtsrechnung korrekt. |
| 5 Kunststoffarten und Kurzzeichen | **mit Korrektur einarbeiten** | B2 (ABS nicht transparent), B17 (Kautschukkurzzeichen ISO 1629), B18/B19/B20/B21 (PET, PTFE, Duroplast, Tg), B28 (PMMA, Zusatzkennzeichnung), B35 (Querverweis). Tabellenwerte und Rechnung korrekt. |
| 6 Zeichnungsarten und Zeichnungsableitung | **mit Korrektur einarbeiten** | B1 (Zukaufteile ≠ immer zeichnungsfrei, Lagerbuchse), B22 (Gesamt-/Gruppen- vs. Zusammenbauzeichnung abgrenzen), B23 (Struktur zum Bestand). Mengenrechnung und Maßstab korrekt. |

Kein Abschnitt ist nach meiner Einschätzung im jetzigen Zustand unverändert einzuarbeiten, aber keiner ist grundsätzlich unbrauchbar; es genügen jeweils Einzelkorrekturen. Der Entwurf ist inhaltlich sorgfältig und die Selbstkennzeichnung der Richtwerte und der Hinweis auf die nur näherungsweise gültigen Umrechnungen/Faustregeln sind positiv (insbesondere die Abgrenzung der Werte „nicht exakt umrechenbar“, die in der Praxis oft falsch vermittelt wird).
