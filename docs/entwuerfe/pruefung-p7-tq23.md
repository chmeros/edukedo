# Unabhängige Prüfung: Fachgespräch-Entwürfe TQ2 und TQ3 (Paket P7)

Stand 12.10.2026 · geprüft: `docs/entwuerfe/tf-p7-fachgespraech/tq2.md` (14 Fragen), `docs/entwuerfe/tf-p7-fachgespraech/tq3.md` (14 Fragen), Übersicht `docs/entwuerfe/tf-p7-fachgespraech-tq23.md`. Gegenstand der Prüfung waren die Fassungen vor der Korrektur (12.10.2026); die Zitate unten sind wörtlich daraus. Geprüft wurde gegen die Theorie in `content/technischer-fachwirt/tq2/6.1` bis `6.3` und `tq3/7.1`, `7.4`, die Zieldateien `tq2/fachgespraech.md` und `tq3/fachgespraech.md`, F-224 und `content/README.md` (Schreibweise). Rechnungen: eigenes Python-Skript (Aufruf mit `-I`, im Arbeitsbereich), keine Skripte der Entwurfsagenten. Nichts unter `content/` geändert, nichts committet, keine Tests oder Importe.

## Ergebnis in Kürze

- **36 Befunde:** 1 hoch (sachlicher Fehler), 24 mittel, 11 niedrig.
- **Zahlen:** Alle Zahlen der Entwürfe sind rechnerisch richtig (Skript, siehe unten); kein Rechenfehler. Der einzige sachliche Fehler steht im Text, nicht in einer Zahl: „Kennzahl 4 mal Faktor 4“ bei 42CrMo4.
- **Belegbarkeit:** Keine Erwartung gefunden, die in der Theorie fehlt oder ihr widerspricht. Jede Aussage ließ sich in 6.1 bis 6.3, 7.1 oder 7.4 finden.
- **Hauptproblem (24 mittlere Befunde):** Viele Erwartungen setzen Rechenwerte oder Themen voraus, die in der Frage nicht vorkommen. Die Prüfungsperson kann sie nicht erraten (zum Beispiel „60.000 € Werkzeugkosten“, „5 % je K“, „500.000 m³ im Jahr“, „29 min“ nach Taylor, Nitrieren bei einer Frage, die nur zwei Fälle nennt). Ursache: Die Entwurfsagentin hat die Beispielrechnungen der Theorie in Erwartungen übernommen, ohne die Eingangswerte in die Frage zu schreiben. Korrektur: Eingangswerte in die Frage, oder die Rechnung als Rückfrage.
- **Streichungen:** keine Frage gestrichen. Stark geändert: TQ2-13 (Erwartung auf Rückfrage), TQ3-03, TQ3-04, TQ3-09, TQ3-10, TQ3-11, TQ3-12, TQ3-14 (jeweils Erwartung oder Rückfrage getauscht), TQ3-01 und TQ3-05 bis TQ3-08, TQ3-13 (Daten in die Frage).
- **Härteofen-Frage (TQ3-09):** bleibt unter 7.4. Siehe F28 und F29.

## Befunde

Schwere: **hoch** = sachlich falsch oder irreführend; **mittel** = so nicht prüfbar oder unfair (Daten fehlen, Erwartung ohne Frageanlass, Frage und Erwartung passen nicht); **niedrig** = ungenau, Stil, Format, geringe Dopplung.

### TQ2, Thema 6.1

**F01 · TQ2-01 Rauheit · niedrig · ungenau (Erwartung ohne Frageanlass)**
Zitat: „Die Rauheit beeinflusst auch die Dauerfestigkeit, weil Kerben und Riefen sie senken.“
Begründung: Die Frage fragt nach Bedeutung, Fertigungsfolge und dem Grund, nicht überall fein zu fertigen. Die Dauerfestigkeit kommt in der Frage nicht vor; belegt ist sie (6.1, Oberflächenangaben), aber ein eigener Erwartungspunkt ohne Anlass lässt sich nicht einzeln prüfen.
Korrektur: Als Rückfrage („Welchen Einfluss hat die Rauheit auf die Dauerfestigkeit eines Bauteils?“); Erwartungen jetzt 3.

**F02 · TQ2-02 Einheitsbohrung · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „Mit den Beispielwerten der Theorie (Bohrung 40,000 bis 40,025 mm, Welle 39,975 bis 39,991 mm) ergeben sich Höchstspiel 0,050 mm und Mindestspiel 0,009 mm; …“
Begründung: Die Abmaße stehen in 6.1 nur als Beispielwerte aus der Tabelle (DIN EN ISO 286). Die Frage nennt sie nicht; wer sie nicht auswendig kennt, kann den Punkt nicht erfüllen, und Normtabellenwerte als feste Antwort sind unerwünscht. Rechnung geprüft: 40,025 − 39,975 = 0,050; 40,000 − 39,991 = 0,009; IT7 = 25 µm, IT6 = 16 µm, g: oberes Abmaß −9 µm, also unteres −25 µm: richtig.
Korrektur: Abmaße als „Beispielwerte nach Tabelle“ in die Frage; Erwartung nennt die Rechenregel (Höchstmaß Bohrung minus Mindestmaß Welle).

**F03 · TQ2-02 · niedrig · ungenau**
Zitat: „die Lagebuchstaben a bis h der Welle ergeben Spiel, j bis n Übergang und p bis zc Übermaß“
Begründung: Theorie: „a bis h (Spiel bis null)“; h liefert Spiel null, und die Zuordnung gilt vereinfacht für die Einheitsbohrung.
Korrektur: „in der Einheitsbohrung ergeben die Lagebuchstaben der Welle a bis h Spiel (h bis null), j bis n Übergang und p bis zc Übermaß“.

**F04 · TQ2-03 Unrunde Welle · niedrig · mehrdeutig**
Zitat: „Für rotierende Teile ist der Rundlauf bezogen auf die Wellenachse (Bezug A, gebildet durch die beiden Lagersitze) die aussagekräftigste Angabe …“ (einzige Antwort auf „welche Angabe würden Sie ergänzen“)
Begründung: Die Frage („krumm“, „unrund“) lässt auch Geradheit oder Rundheit als richtige Antwort zu; die Erwartung ließ nur den Rundlauf gelten. Die Theorie nennt Geradheit und Rundheit als Formtoleranzen ohne Bezug und den Rundlauf als aussagekräftigste Angabe für rotierende Teile. Hinweis ohne Änderung: Dass der Bezug A „durch die beiden Lagersitze“ gebildet wird, steht so in der Theorie (Beispiel Antriebswelle); für den Rundlauf der Lagersitze selbst ist das sprachlich eng, für die Frage aber unschädlich.
Korrektur: neue Erwartung für Geradheit und Rundheit (ohne Bezug); die Rundlauf-Erwartung bleibt als „am aussagekräftigsten für rotierende Teile“. Erwartungen jetzt 5.

**F05 · TQ2-04 Allgemeintoleranzen · niedrig · Stil (Grammatik)**
Zitat: „… die Klassen f (fein), m (mittel), c (grob) und v (sehr grob) fest, die im Schriftfeld angegeben wird.“
Begründung: Plural „Klassen“ und Singular „wird“ passen nicht zusammen; gemeint ist die gewählte Klasse.
Korrektur: „… fest, die gewählte Klasse steht im Schriftfeld.“

**F06 · TQ2-04 · mittel · nicht prüfbar (Normwerte)**
Zitat: „In der Klasse m gilt für Längenmaße über 30 bis 120 mm nach den Beispielwerten der Tabelle ±0,3 mm, … In der Klasse f (±0,15 mm, Grenzen 49,85 mm und 50,15 mm) wäre derselbe Wert nicht zulässig“
Begründung: Rechnung stimmt (50 ± 0,3 = 49,7 bis 50,3; 50 ± 0,15 = 49,85 bis 50,15; 50,25 liegt in m, nicht in f). Aber der Tabellenwert ±0,3 mm steht nicht in der Frage und ist ein Normtabellenwert; der Wert der Klasse f ist nicht als Beispielwert gekennzeichnet.
Korrektur: Tabellenwert der Klasse m in die Frage; Klasse f in der Erwartung als „Beispielwert“ gekennzeichnet.

**F07 · TQ2-05 Zeichnungsableitung · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „2 Achsflansche je Modul ergeben bei 25 Modulen 50 Achsflansche, bei 6 Schrauben je Achsflansch sind es 300 Schrauben.“
Begründung: Die Stücklistenmengen (2 und 6) stehen nicht in der Frage; 6 · 2 · 25 = 300 ist richtig.
Korrektur: Mengen in die Frage („je Modul 2 Achsflansche, je Achsflansch 6 Schrauben“). Teilweise Überschneidung mit der Bestandsfrage zum Schriftfeld (Zeichnungsrevision) ist gering (anderer Fragetext, anderer Schwerpunkt), keine Änderung.

### TQ2, Thema 6.2

**F08 · TQ2-06 Werkstoffkurznamen · hoch · Fehler**
Zitat: „Chrom (Kennzahl 4 mal Faktor 4, also etwa 1 %)“
Begründung: 4 · 4 = 16, nicht 1. Bei niedriglegierten Stählen wird der Gehalt mit dem Faktor multipliziert in die Bezeichnung geschrieben; der Gehalt ergibt sich also aus Kennzahl geteilt durch Faktor: 4 / 4 = 1 %. Theorie (6.2): „Gehalt 4, Faktor 4, also etwa 1 % Chrom“. Die Aussage „4 mal 4“ lehrt das Gegenteil des Verfahrens.
Korrektur: „Kennzahl 4 geteilt durch den Faktor 4, also etwa 1 % Chrom“.

**F09 · TQ2-06 · mittel · mehrdeutig (Daten fehlen)**
Zitat: „Aus der Streckgrenze lässt sich die elastisch ertragbare Kraft abschätzen, F = Re · A; ein Zugstab aus S355 mit 100 mm² Querschnitt verformt sich bis mindestens 35,5 kN nur elastisch.“
Begründung: 355 · 100 = 35.500 N = 35,5 kN stimmt. Der Querschnitt steht nicht in der Frage. „verformt sich bis mindestens 35,5 kN nur elastisch“ ist missverständlich (gemeint: Die Kraft an der Streckgrenze beträgt mindestens 35,5 kN, darunter nur elastische Verformung; Theorie: „mindestens“ bezieht sich auf die Mindeststreckgrenze).
Korrektur: „… für einen Zugstab mit 100 mm² Querschnitt“ in die Frage; Erwartung: „Die Kraft an der Streckgrenze beträgt mindestens … 35,5 kN; bleibt die Last darunter, verformt sich das Bauteil nur elastisch.“

**F10 · TQ2-07 Fe-C-Diagramm · niedrig · Dopplung (gering)**
Zitat: „Mit steigendem Kohlenstoffgehalt nehmen Härte und Festigkeit zu, Zähigkeit und Schweißbarkeit ab; …“ (zusammen mit „2,06 % C als Grenze zwischen Stahl und Gusseisen“ und der Rückfrage „Warum lässt sich ein Stahl mit 0,1 % Kohlenstoff nicht direkt härten?“)
Begründung: Der Bestand fragt schon „Wie wirkt sich der Kohlenstoffgehalt auf die Eigenschaften von Stahl aus?“ mit den Erwartungen „bis zu etwa 2,06 %“ und „Härte zu, Zähigkeit ab“. Außerdem steht die Antwort auf die Rückfrage in der Erwartung zu Einsatzhärten in TQ2-08. Beides ist aus dem Stoff nicht vermeidbar, aber die Erwartung soll Neues leisten.
Korrektur: Erwartung enger gefasst („Mit mehr Perlit … sinken Zähigkeit und Schweißbarkeit; C60 mit etwa 75 % Perlit …“), die Schweißbarkeit ist im Bestand nicht abgefragt. Die Rückfrage bleibt (abgelehnt, siehe unten).

**F11 · TQ2-08 Wärmebehandlung · mittel · mehrdeutig (Erwartung ohne Frageanlass)**
Zitat: „Beim Nitrieren diffundiert Stickstoff in die Oberfläche und bildet harte Nitride; es wird nicht abgeschreckt, der Verzug ist sehr gering, …“
Begründung: Die Frage nennt zwei Fälle (Lagerstelle, Zahnrad), die zu Randschichthärten und Einsatzhärten führen. Nitrieren wird nicht angestoßen; wer richtig antwortet, verfehlt den Erwartungspunkt.
Korrektur: dritter Fall in der Frage („ein fertig bearbeitetes Teil darf sich bei der Behandlung nicht mehr verziehen“), damit Nitrieren die erwartete Antwort ist.

**F12 · TQ2-09 Kontaktkorrosion · mittel · ohne Frageanlass**
Zitat: „Gegenmaßnahmen sind, den Kontakt zu vermeiden oder durch Isolierung (Kunststoffhülsen, -scheiben) zu trennen, Werkstoffe mit geringem Potenzialunterschied zu paaren und Spalte oder Wassersäcke zu vermeiden.“
Begründung: Gefragt sind das Wann und die Beurteilung zweier Paarungen, nicht der Schutz.
Korrektur: Frage um „und welche Gegenmaßnahmen kennen Sie?“ ergänzt.

**F13 · TQ2-09 · niedrig · ungenau (Normwerte)**
Zitat: „… Je negativer das Standardpotenzial, desto unedler; Richtwerte sind etwa +0,34 V für Kupfer, −0,44 V für Eisen und −0,76 V für Zink.“
Begründung: Zahlenwerte wirken wie Lernstoff, gefragt ist die Beurteilung. Die Werte sind richtig (6.2 nennt sie als Richtwerte, Passivschichten verändern die Reihenfolge).
Korrektur: erst die qualitative Aussage (Kupfer edler als Eisen, Zink unedler), die Zahlen in Klammern als Richtwerte.

**F14 · TQ2-10 Aluminium statt Stahl · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „bei 1,5 dm³ wiegt das Stahlteil 11,775 kg, das Aluminiumteil 4,05 kg“ und „Ein 300 mm langes Gehäuse wächst bei 50 K um 0,345 mm, ein Stahlteil um 0,18 mm“; ferner „Gehäuse im Druckguss bestehen dagegen aus Gusslegierungen mit der Bezeichnung EN AC …“
Begründung: Rechnung richtig (1,5 · 7,85 = 11,775; 1,5 · 2,7 = 4,05; 1 − 2,7/7,85 = 65,6 %; 23 · 10⁻⁶ · 300 · 50 = 0,345; 12 · 10⁻⁶ · 300 · 50 = 0,18). Volumen, Länge und Erwärmung stehen aber nicht in der Frage. Die Erwartung zum Druckguss wird von der Frage nicht angestoßen (nur „zerspanend gefertigtes Teil“).
Korrektur: Daten in die Frage („1,5 dm³, 300 mm lang, im Betrieb um 50 K erwärmt“) und „welche für ein Druckgussgehäuse“.

**F15 · TQ2-11 Polyamid-Leiste · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „Bei 200 mm und 50 K wächst die PA-Leiste (α etwa 80 · 10⁻⁶ 1/K) um 0,80 mm, die Stahlnut um 0,12 mm; die Differenz von 0,68 mm …“
Begründung: Rechnung richtig (80 · 10⁻⁶ · 200 · 50 = 0,80; 12 · 10⁻⁶ · 200 · 50 = 0,12; Differenz 0,68). Länge und Erwärmung stehen nicht in der Frage; α ist in der Theorie ein „Beispielwert“, in der Erwartung nicht so gekennzeichnet.
Korrektur: „Eine 200 mm lange Gleitleiste … und sich im Betrieb um 50 K erwärmen“; α als „Beispielwert“.

### TQ2, Thema 6.3

**F16 · TQ2-13 Dauerbruch · mittel · ohne Frageanlass**
Zitat: „Wechselt eine Welle zwischen +200 N/mm² und −200 N/mm², sind die Spannungsamplitude 200 N/mm², die Mittelspannung 0 und R = −1; bei 50 Hz dauern 10⁷ Lastspiele rund 55,6 Stunden.“
Begründung: Rechnung richtig ((200 + 200)/2 = 200; R = −200/200 = −1; 10⁷/50 s = 200.000 s = 55,6 h). Die Frage („Wie erklären Sie das, wie lässt sich die Dauerfestigkeit verbessern?“) nennt weder die Spannungen noch die Frequenz; zwei unverbundene Rechnungen in einem Erwartungspunkt.
Korrektur: Erwartung gestrichen; die Spannungsrechnung als Rückfrage mit den Werten in der Rückfrage; die Dauer (55,6 h) entfällt.

**F17 · TQ2-14 Biegeversuch · mittel · nicht prüfbar (Daten fehlen) und unvollständig**
Zitat: „Eine Keramikprobe mit b = 10 mm, h = 5 mm und l = 80 mm, die bei 1.200 N bricht, hat 576 N/mm² Biegefestigkeit; weil die Höhe quadratisch eingeht, trägt eine doppelt so hohe Probe die vierfache Kraft.“
Begründung: 3 · 1.200 · 80 / (2 · 10 · 25) = 576 und 2² = 4 stimmen. Die Probendaten stehen nicht in der Frage. Die Frage verlangt, wie die Biegespannung von der Probengeometrie abhängt; die Erwartung nennt nur die Höhe, nicht die Breite im Nenner und die Stützweite im Zähler.
Korrektur: Probendaten als „zum Beispiel“ in die Frage; eigene Erwartung zur Abhängigkeit (Höhe quadratisch, Stützweite linear, Breite im Nenner), eine weitere für die Beispielrechnung. Erwartungen jetzt 5.

### TQ3, Thema 7.1

**F18 · TQ3-01 Zerspanungsgrößen · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „Beispiel: d = 50 mm, 120 mm lang, v_c = 200 m/min, f = 0,25 mm, a_p = 2 mm ergeben n ≈ 1.273 1/min und v_f ≈ 318 mm/min, bei 124 mm Schnittweg rund 0,39 min (etwa 23 s) Hauptzeit und 100 cm³/min Zeitspanvolumen.“
Begründung: Rechnung richtig (n = 200.000/(π · 50) = 1.273,2; v_f = 318,3; L = 124; t_h = 0,3896 min = 23,4 s; Q = 2 · 0,25 · 200 = 100). Die Frage nennt keine dieser Werte, auch nicht Anlauf und Überlauf (je 2 mm).
Korrektur: Werte in die Frage, dazu „und wie lang ist die Hauptzeit mit den heutigen Werten“.

**F19 · TQ3-01 · niedrig · ungenau**
Zitat: „Größere Schnitttiefe und größerer Vorschub erhöhen das Zeitspanvolumen Q = a_p · f · v_c, belasten aber Werkzeug und Maschine stärker und verschlechtern die Oberfläche.“
Begründung: Die Frage verlangt die Folgen für die Hauptzeit; die Theorie sagt: Größere Schnitttiefe und größerer Vorschub verkürzen die Hauptzeit. Das fehlt hier.
Korrektur: „… verkürzen die Hauptzeit und erhöhen das Zeitspanvolumen …“.

**F20 · TQ3-02 Standzeit · mittel · mehrdeutig (Daten fehlen, suggestiv)**
Zitat: „… sinkt die Standzeit bei 240 statt 200 m/min von 60 min auf etwa 29 min, also etwa auf die Hälfte; …“ und die Frage „Was entgegnen Sie“
Begründung: Die Ausgangsstandzeit 60 min und die 240 m/min stehen nicht in der Frage (nur „um 20 %“). Rechnung: (200/240)⁴ = 0,4823, 60 · 0,4823 = 28,9 min: richtig. „Was entgegnen Sie“ gibt die Antwort („Nein“) vor, die Theorie sagt nur „Kompromiss“.
Korrektur: „von 200 auf 240 m/min (+20 %)“ in der Frage, „Welche Folgen hat das für die Standzeit“; die Erwartung rechnet das Verhältnis (etwa 48 %) und nennt 60 → 29 min nur als „zum Beispiel“.

**F21 · TQ3-03 Schleifbrand · mittel · ohne Frageanlass**
Zitat: „Der Härtegrad beschreibt die Festigkeit, mit der die Bindung das Korn hält, nicht die Kornhärte; …“ und „… bei einer von 400 auf 360 mm abgerichteten Scheibe muss die Drehzahl von 1.600 auf etwa 1.778 1/min steigen.“
Begründung: Rechnung richtig (1.600 · 400/360 = 1.777,8). Die Frage („Was ist passiert, wie vermeiden Sie das?“) enthält weder den Härtegrad noch Scheibendurchmesser. Zwei Erwartungspunkte ohne Anlass, zusammen 5 von 5.
Korrektur: Härtegrad in die Frage („welche Rolle spielt der Härtegrad der Schleifscheibe“); die Drehzahlrechnung als Rückfrage mit den Werten in der Rückfrage (ersetzt die Rückfrage zum spitzenlosen Schleifen).

**F22 · TQ3-04 Fügeverfahren · mittel · Frage und Erwartung passen nicht**
Zitat: Frage „Nach welchen Kriterien wählen Sie bei Vantera zwischen Schweißen, Löten, Kleben und Schrauben?“ und „… für 3.000 N bei Sicherheit 2 und 15 N/mm² Scherfestigkeit braucht man 400 mm² Klebfläche.“
Begründung: Die Erwartungen beschreiben die Verfahren; die Kriterien selbst (Lösbarkeit, Dichtheit, thermische Belastbarkeit; Theorie 7.1 „Fügen“) fehlen. 3.000 · 2 / 15 = 400 ist richtig, die Werte stehen aber nicht in der Frage.
Korrektur: Erste Erwartung nennt die Kriterien und die Einteilung nach Kraftübertragung; die Klebfläche als Formel A = F · S / τ in der Erwartung, die Rechnung mit den Werten als Rückfrage (ersetzt die Rückfrage zum Flussmittel; das Flussmittel steht jetzt in der Erwartung zum Löten).

**F23 · TQ3-05 Spritzgießen · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „… 60.000 € Werkzeugkosten ergeben bei 100.000 Teilen 0,60 € je Teil.“, „Hinzu kommen bei 30 s Zykluszeit, zwei Kavitäten (240 Teile je Stunde) und 48 € Maschinenstundensatz 0,20 € je Teil, …“, „Die Schließkraft muss mindestens F_S ≥ p_i · A_proj aufnehmen; bei 400 bar (40 N/mm²) und 100 cm² (10.000 mm²) sind das mindestens 400 kN.“
Begründung: Rechnung richtig (60.000/100.000 = 0,60; 3.600/30 · 2 = 240; 48/240 = 0,20; 40 · 10.000 = 400.000 N). Nur „100.000 Gehäuse“ steht in der Frage. Die Schließkraft wird von „worauf achten Sie bei der Konstruktion“ nicht angestoßen (Maschinenauslegung).
Korrektur: Werkzeug-, Zeit- und Kostenwerte in die Frage; Schließkraft als Rückfrage mit den Werten (Erwartungen jetzt 4).

**F24 · TQ3-06 Beschichten · niedrig · ungenau (Richtwert, Daten)**
Zitat: „… wächst etwa zur Hälfte nach außen, ein Bolzen mit 20 mm Durchmesser und 20 µm Schicht wird um 0,020 mm dicker.“
Begründung: Rechnung richtig (2 · 10 µm = 20 µm = 0,020 mm). „Etwa zur Hälfte“ ist in der Theorie ein „grober Richtwert“, in der Erwartung nicht so gekennzeichnet; Bolzen und Schicht stehen nicht in der Frage.
Korrektur: „(grober Richtwert)“ ergänzt, das Zahlenbeispiel als „zum Beispiel“ formuliert.

**F25 · TQ3-07 Ofenanlagen · mittel · ohne Frageanlass**
Zitat: „Zur zu erwärmenden Masse zählen auch Gestell und Korb; 80 kg von 20 auf 850 °C brauchen mit c = 0,47 kJ/(kg · K) rund 31.208 kJ oder 8,67 kWh, der reale Bedarf liegt höher, weil c mit der Temperatur steigt.“
Begründung: Rechnung richtig (80 · 0,47 · 830 = 31.208 kJ; / 3.600 = 8,669 kWh). Die Frage („Welche Anlagen kennen Sie, wie wählen Sie Anlage und Abschreckmedium?“) verlangt keine Wärmemenge, die 80 kg und c fehlen.
Korrektur: Wärmemenge als Rückfrage mit den Werten (zweite Rückfrage; Erwartungen jetzt 4).

**F26 · TQ3-07 · niedrig · Stil**
Zitat: „Wasser kühlt sehr schnell mit hoher Verzug- und Rissgefahr“
Begründung: Das Fugen-s fehlt in „Verzug- und Rissgefahr“.
Korrektur: „Verzugs- und Rissgefahr“.

**F27 · TQ3-08 Verzahnung · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „Für m = 2,5 mm, a = 90 mm und i = 3 folgt z₁ + z₂ = 72, also z₁ = 18 und z₂ = 54; z₁ liegt über der Unterschnittgrenze von etwa 17 Zähnen (Richtwert).“
Begründung: Rechnung richtig (2 · 90/2,5 = 72; 4 z₁ = 72; z₁ = 18; z₂ = 54; a = 2,5 · 72/2 = 90). Die Frage spricht von „einem vorgegebenen Achsabstand und einer vorgegebenen Übersetzung“ ohne Werte. Zusätzlich verbindet die Frage zwei Themen (Fertigungsfolge der Welle, Auslegung des Radpaars); vertretbar, weil die Erwartungen sauber getrennt sind.
Korrektur: Werte in die Frage („Modul 2,5 mm, Achsabstand von 90 mm, Übersetzung von 3“).

### TQ3, Thema 7.4

**F28 · TQ3-09 Härteofen · mittel · ohne Frageanlass (Daten fehlen) und Herkunft in 7.1**
Zitat: „Bei 850 °C Sollwert und 810 °C Istwert ist e = 40 K; ein P-Regler mit K_P = 5 % je K ergäbe rechnerisch 200 %, begrenzt wird auf 100 %, erst bei e = 10 K ergibt sich y = 50 %.“
Begründung: Rechnung richtig (5 · 40 = 200; 5 · 10 = 50). K_P und der Istwert stehen nicht in der Frage; der Rechenweg steht in 7.1 („Temperaturregelung und Energiebedarf“), nicht in 7.4. Verwechslungsgefahr: Das Beispiel in 7.4 (Trockenofen, 80 °C, e = 8 K, y = 40 %) hat dasselbe K_P; wer 7.4 gelernt hat, könnte mit 40 % antworten. Ein Erwartungspunkt, der nur in 7.1 steht, in einer Frage unter 7.4.
Korrektur: Rechnung als Rückfrage mit allen Werten und dem Wort „Härteofen“ (ersetzt die Rückfrage zum Zweipunktregler; die Festwert-/Zeitplan-Rückfrage bleibt). Erwartungen jetzt 4.

**F29 · TQ3-09 · niedrig · Zuordnung und Beleg**
Zitat: „Störgrößen sind zum Beispiel das Einsetzen einer kalten Charge, das Öffnen der Tür und Netzschwankungen.“
Begründung: Dieses Beispiel steht nur in 7.1; 7.4 nennt „Zugluft, Werkstückmasse“ und beschreibt, dass die Störgröße an der Strecke angreift und ausgeregelt wird. Die Fragezuordnung selbst ist richtig: Steuern und Regeln, Regelkreisbegriffe und Reglertypen stehen in 7.4, die Frage gehört unter 7.4. Die Härteofen-Frage ist vom Trockenofen-Beispiel in 7.4 zu unterscheiden (siehe F28).
Korrektur: Erwartung nennt zuerst die 7.4-Aussage (Störgröße greift an der Strecke an, wird ausgeregelt) und dann „beim Härteofen“ die 7.1-Beispiele. Zuordnung unter 7.4 bleibt, in der Übersicht begründet.

**F30 · TQ3-10 SPS · mittel · ohne Frageanlass**
Zitat: „Wegen der zyklischen Abarbeitung beträgt die ungünstigste Reaktionszeit etwa zwei Zykluszeiten (Richtwert), bei 5 ms also etwa 10 ms.“
Begründung: Rechnung richtig (2 · 5 = 10). Die Frage („In welcher Sprache programmieren Sie … wie funktioniert die Selbsthaltung?“) spricht Reaktionszeit und Zykluszeit nicht an; die 5 ms fehlen.
Korrektur: als Rückfrage („Wie lang ist die ungünstigste Reaktionszeit bei einer Zykluszeit von 5 ms?“, ersetzt die Rückfrage zu den Grundverknüpfungen); Erwartungen jetzt 4.

**F31 · TQ3-11 Antriebe · mittel · ohne Frageanlass (Daten fehlen)**
Zitat: „Der Läufer eines Asynchronmotors dreht etwas langsamer als das Drehfeld (Schlupf); ein vierpoliger Motor am 50-Hz-Netz hat n_s = 1.500 min⁻¹, bei Nenndrehzahl 1.440 min⁻¹ ergibt sich ein Schlupf von 4 %.“ und „… 3.200 Schritte je Umdrehung (200 Vollschritte, 16 Teilschritte) ergeben bei 5 mm Spindelsteigung rund 1,56 µm je Schritt, …“
Begründung: Rechnung richtig (60 · 50/2 = 1.500; (1.500 − 1.440)/1.500 = 4 %; 200 · 16 = 3.200; 5 mm/3.200 = 1,5625 µm). Die Frage ordnet nur Antriebsarten zu; Nenndrehzahl, Mikroschritt und Spindelsteigung fehlen. Der Gedanke „Auflösung ist nicht Genauigkeit“ passt zur Dosierachse, die Zahlen nicht.
Korrektur: Schlupf als Rückfrage mit den Werten (ersetzt die Rückfrage zum Feldschwächbereich); die Genauigkeits-Erwartung bleibt, die Zahlen stehen als „zum Beispiel“.

**F32 · TQ3-12 Feldbus · mittel · ohne Frageanlass (Daten fehlen)**
Zitat: „Bei 24 Geräten im Mittel 15 m vom Schaltschrank brauchen Einzelleitungen 360 m, drei dezentrale Module (3 m je Gerät plus 40 m Busleitung) nur 112 m; die Ersparnis von 248 m entspricht rund 69 %.“
Begründung: Rechnung richtig (24 · 15 = 360; 24 · 3 + 40 = 112; 248/360 = 68,9 %). Entfernung, Modulzahl, Zuleitung und Busleitung stehen nicht in der Frage; die allgemeine Aussage (weniger Leitung) steht schon in der ersten Erwartung.
Korrektur: Erwartung gestrichen (Doppelung zur ersten); die Rechnung als Rückfrage mit den Werten (ersetzt die Rückfrage zu OPC UA; Topologien bleiben). Erwartungen jetzt 4.

**F33 · TQ3-13 Hydraulik · mittel · nicht prüfbar (Daten fehlen) und zu breit**
Zitat: „Mit A_K = 50 cm², A_St = 10 cm² und 30 l/min fährt der Zylinder bei offener Drossel mit 0,1 m/s aus (v = Q / A) und mit 0,125 m/s über die Ringfläche von 40 cm² ein; bei 100 bar sind es 50 kN beim Ausfahren und 40 kN beim Einfahren.“
Begründung: Rechnung richtig (30.000/50/60 = 10 cm/s; 30.000/40/60 = 12,5 cm/s; 10 N/mm² · 5.000 mm² = 50 kN; · 4.000 = 40 kN). Die Frage verlangt nur die Ausfahrgeschwindigkeit „eingestellt und berechnet“, nennt keine Werte; Einfahren und Kräfte werden nicht gefragt. Die Frage hat drei Teile (Mittelstellungen, Drosselung, Rechnung); sie bleibt vertretbar, wenn die Daten gegeben sind.
Korrektur: Zylinderdaten in die Frage, die Frage um Geschwindigkeiten und Kräfte beim Ausfahren und Einfahren ergänzt.

**F34 · TQ3-14 Druckluft · mittel · Frage ohne passende Erwartung**
Zitat: Frage „… wie setzen sich die Kosten zusammen, …“ und die Erwartung „Leckage ist ein häufiger Kostentreiber; bei 500.000 m³ im Jahr, 0,11 kWh je m³ und 0,25 € je kWh entstehen 13.750 € Kosten, davon bei 10 % Leckage 1.375 €, eine halbierte Leckage spart 687,50 € im Jahr.“
Begründung: Die Kostenzusammensetzung (Energiekosten sind meist der größte Kostenblock, spezifischer Energiebedarf in kWh je m³, Strompreis, Leckage) steht nicht in den Erwartungen; stattdessen ein Beispiel mit Werten, die die Frage nicht enthält. Rechnung richtig (500.000 · 0,11 = 55.000 kWh; · 0,25 = 13.750 €; 10 % = 1.375 €; 25.000 · 0,11 · 0,25 = 687,50 €).
Korrektur: Erwartung beschreibt die Kostenzusammensetzung (mit Richtwerten, 6 bar etwa 0,10 bis 0,13 kWh je m³, Leckage in schlecht gewarteten Netzen 20 bis 30 %); die Leckagekosten als Rückfrage mit den Werten.

**F35 · TQ3-14 · mittel · nicht prüfbar (Daten fehlen)**
Zitat: „Bei 63 mm Kolben, 20 mm Stange, 200 mm Hub, 6 bar und 15 Doppelhüben je Minute sind es 8,288 l je Doppelhub, rund 124,3 l/min oder 7,46 m³/h, bei 4.000 Betriebsstunden im Jahr etwa 29.840 m³ und mit den obigen Kostenannahmen rund 821 €.“
Begründung: Rechnung richtig (A_K = 3.117,2 mm², A_R = 2.803,1 mm²; V_N = 4,364 l + 3,924 l = 8,288 l; · 15 = 124,3 l/min; · 60 = 7,46 m³/h; Jahr 29.838 bis 29.840 m³; 820,56 bis 820,60 €). Die Zylinderdaten stehen nicht in der Frage; die Betriebsstunden auch nicht, und „mit den obigen Kostenannahmen“ hängt von einer anderen Erwartung ab. Die Frage hat zudem drei Teile (Aufbereitung, Kosten, Zylinderverbrauch) und ist die breiteste des Pakets.
Korrektur: Zylinderdaten in die Frage; Erwartung endet bei 124,3 l/min und 7,46 m³/h; die Jahreswerte entfallen. Teile bleiben (jeder hat eigene, einzeln prüfbare Erwartungen).

### Übersicht

**F36 · Übersicht · niedrig · Format und Aussage**
Zitat: „Jede Erwartung ist aus den Abschnitten der Tabelle oben belegbar; …“, „Ergebnis des Strukturlaufs über beide Entwurfsdateien: **0 Auffälligkeiten**“, „‚Prozent‘ kommt nicht vor“, „Zahlen stehen nur als Beispiel in einzelnen Erwartungspunkten“, „mit 132 Erwartungspunkten und 46 Rückfragen“.
Begründung: Die Belegbarkeit trifft zu, die Verwertbarkeit der Erwartungen nicht (F02 bis F35). „Prozent“ kommt einmal vor, als Substantiv in „Gehalte in Prozent ohne Faktor“ (TQ2-06, aus der Theorie), nicht als Zahlenangabe; das widerspricht der Hausregel nicht, die Aussage war aber falsch. Die Angabe, Zahlen stünden nur als Beispiel, stimmte nicht: Viele Zahlen waren die erwartete Antwort. Die Zählung ändert sich durch die Korrektur (125 Erwartungen, 50 Rückfragen).
Korrektur: Die Übersicht wurde angepasst (Zählung, Zahlentabelle mit den Rückfragen, Abschnitt „Prüfung“ neu).

## Rechnungen und Struktur

Eigenes Skript, alle Werte unabhängig aus Formeln und Eingangswerten der Theorie berechnet, Ausgabe verglichen: alle Zahlen der Entwürfe stimmen (H7/g6 0,050 und 0,009 mm; 49,7 bis 50,3 und 49,85 bis 50,15 mm; 50 und 300 Stück; 35,5 kN; 56 und 44 % Perlit, 75 % bei C60; 0,78 V; 11,775 und 4,05 kg, 65,6 %; 0,345 und 0,18 mm; 0,80, 0,12 und 0,68 mm; 801,5 → rund 800 N/mm²; HBW 228,8 → 229; Amplitude 200, R = −1; 55,6 h; 576 N/mm²; n = 1.273, v_f = 318, t_h = 0,3896 min; Standzeit 28,9 min; n = 1.777,8; Klebfläche 400 mm²; 0,60 und 0,20 €, 240 Teile je Stunde, 400 kN; 0,020 mm; 31.208 kJ, 8,67 kWh; z₁ = 18, z₂ = 54; 200 und 50 %; 10 ms; 1.500 min⁻¹, 4 %; 3.200 und 1,56 µm; 360, 112, 248 m, 68,9 %; 10 und 12,5 cm/s, 50 und 40 kN; 13.750, 1.375, 687,50 €; 8,288 l, 124,3 l/min, 7,46 m³/h). Ergänzt wurde die abgeleitete Angabe „etwa 48 %“ (Taylor, Frage TQ3-02).

Ein zweites Skript prüfte nach der Korrektur beide Entwurfsdateien: 28 Fragen, alle mit 3 bis 5 Erwartungen (TQ2 62, TQ3 63, zusammen 125) und 0 bis 2 Rückfragen (TQ2 23, TQ3 27, zusammen 50), Erwartungen vor Rückfragen, Überschriften wörtlich wie in den Zieldateien, nur LF, kein BOM, keine Leerzeichen am Zeilenende, keine Tabs, Satzzeichen am Zeilenende, kein Duzen, kein Dezimalpunkt, Tausenderpunkt ab 1.000 (Ausnahmen: Normnummern, „10/3000“), Leerzeichen vor allen Einheiten und vor „%“, keine Schrägstrich-Kurzformen, keine doppelten Erwartungen; jede Zahl kommt in der Theorie vor außer 50,25 mm (bewusst neu gesetzt) und „48 %“ (abgeleitet). Größte Textähnlichkeit zu einer Bestandsfrage 0,51 (TQ3-04, nur der Satzanfang „Nach welchen Kriterien“), untereinander keine über 0,55. Rechtliches und Arbeitsschutz kommt in keiner Frage vor.

## Eingearbeitet

Entscheidung je Befund: übernommen = Korrektur wie vorgeschlagen; angepasst = Korrektur mit Abweichung; abgelehnt = keine Änderung, mit Begründung.

| Befund | Entscheidung | Begründung / Abweichung |
|---|---|---|
| F01 | übernommen | Dauerfestigkeit als zweite Rückfrage, Erwartung entfällt. |
| F02 | übernommen | Abmaße in der Frage, Rechenregel in der Erwartung. |
| F03 | übernommen | Klammerzusatz „(h bis null)“ und „in der Einheitsbohrung“. |
| F04 | übernommen | Neue Erwartung für Geradheit und Rundheit; Rundlauf bleibt. |
| F05 | übernommen | Satz umgestellt. |
| F06 | angepasst | Tabellenwert der Klasse m in der Frage; Klasse f bleibt in der Erwartung, aber als „Beispielwert“ gekennzeichnet (nicht ebenfalls in der Frage, damit die Beurteilung der Klasse f eine Leistung bleibt). |
| F07 | übernommen | Stücklistenmengen in der Frage. |
| F08 | übernommen | „geteilt durch den Faktor 4“. |
| F09 | übernommen | Querschnitt in der Frage, Erwartung neu formuliert. |
| F10 | angepasst | Erwartung enger gefasst. Rückfrage „0,1 % Kohlenstoff“ bleibt: Sie fragt die Begründung ab, die TQ2-08 nur im Nebensatz („lassen sich nicht direkt härten“) nennt; die Überschneidung ist gering. |
| F11 | angepasst | Statt Nitrieren zu streichen, dritter Fall in der Frage (Verzug beim fertig bearbeiteten Teil); dadurch bleibt der Erwartungspunkt prüfbar. |
| F12 | übernommen | Frage um Gegenmaßnahmen ergänzt. |
| F13 | angepasst | Zahlen bleiben als Richtwerte in Klammern, qualitative Aussage zuerst. |
| F14 | übernommen | Daten in der Frage, zweiter Teil „Druckgussgehäuse“ in der Frage. |
| F15 | übernommen | Länge und Erwärmung in der Frage, α als Beispielwert. |
| F16 | übernommen | Erwartung gestrichen, Rechnung als Rückfrage; Dauer 55,6 h entfällt. |
| F17 | übernommen | Probendaten als Beispiel in der Frage, zwei Erwartungen. |
| F18 | übernommen | Daten in der Frage, Frage um die Hauptzeit ergänzt. |
| F19 | übernommen | „verkürzen die Hauptzeit“. |
| F20 | übernommen | „Was entgegnen Sie“ ersetzt, Daten in der Frage, Verhältnis in der Erwartung. |
| F21 | übernommen | Härtegrad in der Frage, Drehzahl als Rückfrage. |
| F22 | übernommen | Kriterien als erste Erwartung, Klebfläche als Rückfrage. |
| F23 | übernommen | Daten in der Frage, Schließkraft als Rückfrage. |
| F24 | übernommen | „(grober Richtwert)“, Beispiel gekennzeichnet. |
| F25 | übernommen | Wärmemenge als Rückfrage. |
| F26 | übernommen | „Verzugs- und Rissgefahr“. |
| F27 | übernommen | Werte in der Frage. |
| F28 | übernommen | Rechnung als Rückfrage mit „Härteofen“ und allen Werten. |
| F29 | angepasst | Frage bleibt unter 7.4 (siehe Begründung oben); Erwartung nennt 7.4- und 7.1-Aussage. Verschiebung nach 7.1 abgelehnt: Dort stünden die Reglertypen und der offene/geschlossene Wirkungskreis, die nur in 7.4 erklärt sind. |
| F30 | übernommen | Reaktionszeit als Rückfrage. |
| F31 | übernommen | Schlupf als Rückfrage; Genauigkeits-Erwartung mit Zahlen als Beispiel. |
| F32 | übernommen | Erwartung gestrichen, Rechnung als Rückfrage. |
| F33 | übernommen | Zylinderdaten in der Frage. |
| F34 | übernommen | Kostenzusammensetzung als Erwartung, Leckagerechnung als Rückfrage. |
| F35 | angepasst | Zylinderdaten in der Frage; Jahreswerte gestrichen statt Betriebsstunden in die Frage zu nehmen (die Frage ist ohnehin die längste). |
| F36 | übernommen | Übersicht aktualisiert. |

Zählung nach der Einarbeitung: 28 Fragen (TQ2 14, TQ3 14), 125 Erwartungen, 50 Rückfragen. Frage gestrichen: keine. Neue Rückfragen enthalten Rechenwerte ohne Musterlösung; die Lösungen stehen in der Zahlentabelle der Übersicht (Spalte „Frage“ mit „(R)“).

## Bestandsänderungen für die Projektleitung

Die neuen Fragen verlangen keine Änderung am Bestand. Beim Abgleich fiel eine Unschärfe im Bestand auf, die nicht zu diesem Auftrag gehört und nur zur Kenntnis dient:

- **`content/technischer-fachwirt/tq2/fachgespraech.md`, Thema 6.3, Frage „Worin unterscheiden sich die Härteprüfverfahren nach Brinell, Vickers und Rockwell?“:** Die erste Erwartung nennt „eine gehärtete Kugel“. Die Theorie in `6.3-werkstoffpruefung.md` (Abschnitte „Härteprüfverfahren“ und „Härteprüfung rechnen und Härtewerte vergleichen“) sagt Hartmetallkugel (Kurzzeichen HBW) und merkt an, dass die Stahlkugel (HBS) nicht mehr genormt ist. Vorschlag (niedrige Dringlichkeit): „Bei Brinell wird eine Hartmetallkugel mit definierter Prüfkraft eingedrückt …“. Bestand wird erst nach Entscheidung der Projektleitung geändert; hier ist nichts geändert.
- **Zuordnung der Härteofen-Frage (TQ3-09):** Sie steht in der Themengruppe 7.4, nutzt aber zwei Inhalte aus 7.1 („Temperaturregelung und Energiebedarf“). Wer die Gruppierung strikt nach Theorieabschnitt wünscht, kann sie unter 7.1 einsortieren; ich empfehle 7.4 (siehe F29).
