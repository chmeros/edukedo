# Entwurf: Paket P3 — Fertigung und Betrieb (Technischer Fachwirt, TQ3, Themen 7.1 und 7.4)

Stand 12.10.2026 · **vom Projektleiter angenommen („alle Vorschläge umsetzen“) und am 12.10.2026 in `content/` eingearbeitet** (siehe Architekturplanung §13; neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit P3“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P3 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Die 120-Minuten-Klausur „Technologie“ (TQ3) verlangt Zerspanungsberechnungen, Fügetechnik, Kunststoffverarbeitung, Steuerungs- und Fluidtechnik. Die Themen 7.1 und 7.4 nennen die Verfahren bisher nur im Überblick; es fehlen Zerspanungsgrößen, Standzeit und Werkzeugwerkstoffe, der Vergleich der Fügeverfahren, der Spritzguss, der Unterschied zwischen Steuern und Regeln, die SPS-Programmiersprachen und eine vertiefte Fluidtechnik. Die Themen 7.2 (Instandhaltung) und 7.3 (Arbeitsvorbereitung) bleiben unberührt; Zeitwirtschaft (REFA) folgt in Paket P4.

## Was vorliegt

Sieben neue Theorieabschnitte (der Vorschlag nannte sieben bis neun) mit durchgerechneten Beispielen. Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem Skript nachgerechnet.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 7.1 | „Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit“ | „Trennen“ |
| 2 | 7.1 | „Standzeit und Werkzeugwerkstoffe“ | Abschnitt 1 |
| 3 | 7.1 | „Fügeverfahren im Vergleich“ | „Fügen“ |
| 4 | 7.1 | „Spritzgießen“ | „Urformen“ |
| 5 | 7.4 | „Steuern und Regeln“ | „Grundlagen der SPS“ |
| 6 | 7.4 | „SPS-Programmiersprachen und Verknüpfungslogik“ | Abschnitt 5 |
| 7 | 7.4 | „Hydraulik und Pneumatik in der Anlage“ | „Sensorik und Aktorik“ |

**Hinweis zur Prüfung:** Die Texte beschreiben gesichertes Fachwissen. Richtwerte (Schnittgeschwindigkeiten, Temperaturgrenzen der Schneidstoffe, Taylor-Exponent, Scherfestigkeit des Klebstoffs, Werkzeuginnendruck, Betriebsdrücke) sind als „Richtwert“ oder „Beispielwert“ gekennzeichnet; die Herstellerangaben und Normen bleiben maßgeblich, die Werte gehören zur fachlichen Prüfung. Genannt werden nur die Norm IEC 61131-3 für SPS-Sprachen und die Schaltzeichen-Norm der Fluidtechnik DIN ISO 1219 (bereits in 6.1). Rechtsnahes (Arbeitsschutz beim Schweißen, Druckgeräte, Maschinensicherheit) kommt nicht vor und bleibt Paket P8.

---

## 1. TQ3 7.1 — Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit

**Einfügen:** Neuer Abschnitt `### Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit` nach „Trennen“.

> Neben der **Schnittgeschwindigkeit v_c** (Weg der Schneide am Werkstück je Zeit in m/min, vgl. technische Mathematik 5.2) bestimmen zwei weitere Größen die Zerspanung. Der **Vorschub f** ist der Weg, den das Werkzeug je Umdrehung in Vorschubrichtung zurücklegt (mm). Die **Schnitttiefe a_p** ist die Tiefe, mit der die Schneide ins Werkstück eingreift (mm). Die **Vorschubgeschwindigkeit** folgt aus Vorschub und Drehzahl: **v_f = f · n** (mm/min). Beim Fräsen rechnet man mit dem **Vorschub je Zahn f_z** und der Zähnezahl z: **v_f = f_z · z · n**.
>
> Das **Zeitspanvolumen** Q gibt an, wie viel Werkstoff je Zeit abgetragen wird; beim Drehen gilt näherungsweise **Q = a_p · f · v_c** (mit a_p und f in mm und v_c in m/min ergibt sich Q in cm³/min). Die **Hauptzeit** t_h ist die reine Zeit, in der die Schneide schneidet: **t_h = L · i / v_f**, mit dem Schnittweg L (Länge des Werkstücks plus Anlauf- und Überlaufweg) und der Zahl der Schnitte i. Größere Schnitttiefe und größerer Vorschub verkürzen die Hauptzeit, belasten aber Werkzeug und Maschine stärker und verschlechtern die Oberfläche; die Schnittgeschwindigkeit wirkt vor allem auf den Verschleiß.
>
> *Beispiel Drehen:* Eine Welle (d = 50 mm, 120 mm lang) wird mit v_c = 200 m/min, f = 0,25 mm und a_p = 2 mm längsgedreht, Anlauf und Überlauf je 2 mm, ein Schnitt. Drehzahl n = v_c / (π · d) = 200 m/min / (π · 0,05 m) ≈ **1.273 1/min**. Vorschubgeschwindigkeit v_f = 0,25 mm · 1.273 1/min ≈ 318 mm/min. Schnittweg L = 120 mm + 2 · 2 mm = 124 mm. Hauptzeit t_h = 124 mm / 318 mm/min ≈ **0,39 min** (rund 23 s). Zeitspanvolumen Q = 2 mm · 0,25 mm · 200 m/min = **100 cm³/min**.
>
> *Beispiel Fräsen:* Ein Walzenfräser (d = 80 mm, z = 6 Zähne) läuft mit n = 800 1/min und f_z = 0,1 mm. Schnittgeschwindigkeit v_c = π · 0,08 m · 800 1/min ≈ 201 m/min, Vorschubgeschwindigkeit v_f = 0,1 mm · 6 · 800 1/min = **480 mm/min**. Bei einem Schnittweg von 260 mm (Fräslänge plus Anlauf und Überlauf) beträgt die Hauptzeit t_h = 260 mm / 480 mm/min ≈ 0,54 min (rund 33 s).

## 2. TQ3 7.1 — Standzeit und Werkzeugwerkstoffe

**Einfügen:** Neuer Abschnitt `### Standzeit und Werkzeugwerkstoffe` nach „Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit“.

> Die **Standzeit T** ist die Zeit, die eine Schneide schneiden kann, bis ein festgelegtes **Verschleißkriterium** erreicht ist (zum Beispiel eine bestimmte Verschleißmarkenbreite an der Freifläche); danach muss die Schneide gewechselt oder nachgeschliffen werden. Sie sinkt stark mit steigender Schnittgeschwindigkeit. Nach der **Taylor-Beziehung** gilt näherungsweise **T₂ / T₁ = (v₁ / v₂)^k** mit einem werkstoff- und werkzeugabhängigen Exponenten k (Beispielwert k = 4). *Beispiel:* Bei v₁ = 200 m/min beträgt die Standzeit 60 min. Erhöht man die Schnittgeschwindigkeit auf 240 m/min (+20 %), sinkt sie auf T₂ = 60 min · (200 / 240)⁴ ≈ **29 min**, also etwa auf die Hälfte. Verdoppelt man v_c, bleibt bei k = 4 nur ein Sechzehntel. Deshalb wählt man die Schnittgeschwindigkeit als Kompromiss zwischen Hauptzeit (kurz) und Werkzeugkosten und Wechselzeiten (gering).
>
> **Schneidstoffe** unterscheiden sich in **Warmhärte** (Härte bei hoher Temperatur) und **Zähigkeit**; je härter und hitzefester, desto spröder. **Werkzeugstahl** (unlegiert) ist billig, aber nur bei niedrigen Temperaturen hart. **Schnellarbeitsstahl (HSS)** ist zäh, hält Temperaturen bis etwa 600 °C (Richtwert) und lässt sich gut scharf schleifen; er wird für Bohrer, Fräser und Gewindebohrer eingesetzt. **Hartmetall** (Wolframcarbid in einer Kobaltbindung, meist als Wendeschneidplatte) ist wesentlich härter und hitzefester und ermöglicht hohe Schnittgeschwindigkeiten; es ist der meistgenutzte Schneidstoff beim Drehen und Fräsen von Stahl. **Beschichtungen** (zum Beispiel Titannitrid oder Titanaluminiumnitrid, Aluminiumoxid) verlängern die Standzeit. **Schneidkeramik** und **kubisches Bornitrid (CBN)** sind noch härter und hitzefester, aber spröder; sie dienen zur Bearbeitung von Guss und gehärtetem Stahl. **Diamant** eignet sich für Aluminium und Kunststoffe, nicht für Stahl (der Kohlenstoff diffundiert in das Eisen). **Kühlschmierstoffe** kühlen, schmieren und führen Späne ab; sie senken den Verschleiß und verlängern die Standzeit.

## 3. TQ3 7.1 — Fügeverfahren im Vergleich

**Einfügen:** Neuer Abschnitt `### Fügeverfahren im Vergleich` nach „Fügen“.

> Fügeverbindungen werden nach der Art der Kraftübertragung eingeteilt: **stoffschlüssig** (die Teile werden durch Stoffvereinigung verbunden: Schweißen, Löten, Kleben), **formschlüssig** (die Form der Teile verhindert die Bewegung: Niete, Passstift, Passfeder) und **kraftschlüssig** (Reibung durch eine Anpresskraft: Schrauben, Pressverbindungen). Schrauben können je nach Ausführung auch formschlüssig wirken (Passschrauben).
>
> **Schweißen:** Die Fügeflächen werden aufgeschmolzen und mit oder ohne Zusatzwerkstoff verbunden. Wichtige Verfahren sind das **Lichtbogenhandschweißen** (Elektrode), das **Metall-Schutzgasschweißen** (MIG mit inertem, MAG mit aktivem Gas; leistungsfähig, gut automatisierbar), das **Wolfram-Inertgasschweißen (WIG)** (saubere Nähte, auch dünne Bleche und Aluminium), das **Widerstandspunktschweißen** (Bleche in der Karosserie) und das **Laserstrahlschweißen** (schmale Naht, wenig Verzug). Unlegierte Stähle mit weniger als etwa 0,22 % Kohlenstoff (Richtwert) sind gut schweißbar; höhere Gehalte neigen zum Aufhärten und zur Rissbildung. Die Wärme führt zu **Verzug** und **Eigenspannungen** und verändert das Gefüge in der **Wärmeeinflusszone**.
>
> **Löten:** Ein Zusatzmetall (Lot) mit niedrigerem Schmelzpunkt als die Grundwerkstoffe benetzt die Fügefläche und wird durch die Kapillarwirkung in den engen Spalt gezogen. **Weichlöten** liegt unter 450 °C (zum Beispiel Elektronik), **Hartlöten** darüber (höhere Festigkeit, zum Beispiel Rohrleitungen). Ein **Flussmittel** löst Oxide. **Kleben:** Der Klebstoff überträgt die Kraft über die ganze Fläche; er verbindet unterschiedliche Werkstoffe ohne Wärmebelastung, dichtet und dämpft. Günstig ist die **Scherzug-Beanspruchung** (Kraft in Klebfläche), ungünstig die Schälbeanspruchung. Voraussetzungen sind eine saubere, vorbehandelte Oberfläche und die Einhaltung der Aushärtezeit; Temperatur und Alterung begrenzen die Haltbarkeit. **Schrauben** sind lösbar und leicht zu montieren; die Haltekraft entsteht durch die Vorspannung, die Schraube muss gegen Lösen gesichert werden (siehe Gewinde und Schraubenfestigkeit in 6.1). **Nieten** sind unlösbar und wärmefrei.
>
> | Verfahren | lösbar | Wärme | Vorteile | Nachteile |
> |---|---|---|---|---|
> | Schweißen | nein | hoch | hohe Festigkeit, dicht | Verzug, Eigenspannungen |
> | Löten | nein | mittel | dünne Teile, verschiedene Werkstoffe | begrenzte Festigkeit |
> | Kleben | nein | keine | gleichmäßige Kraftübertragung, dichtet | Vorbereitung, Aushärtung, Alterung |
> | Schrauben | ja | keine | montagefreundlich | Lösen, Kerbwirkung |
>
> *Beispiel Kleben:* Eine Klebfläche von 400 mm² mit einer Scherfestigkeit von 15 N/mm² (Beispielwert) überträgt höchstens F = τ · A = 15 N/mm² · 400 mm² = **6.000 N**; mit einer Sicherheit von 2 darf die Verbindung dauerhaft mit **3.000 N** belastet werden.

## 4. TQ3 7.1 — Spritzgießen

**Einfügen:** Neuer Abschnitt `### Spritzgießen` nach „Urformen“.

> Das **Spritzgießen** ist das wichtigste Urformverfahren für Kunststoffteile in großen Stückzahlen. Eine **Schnecke** fördert Kunststoffgranulat, erwärmt und **plastifiziert** es; die Schmelze wird unter hohem Druck in das geschlossene, gekühlte **Werkzeug** (Form mit Hohlraum, die **Kavität**) eingespritzt, ein **Nachdruck** gleicht die Schwindung beim Erstarren aus, nach der **Kühlzeit** öffnet das Werkzeug, und **Auswerfer** drücken das Teil heraus. Die Kühlzeit ist meist der größte Teil der **Zykluszeit** (rund die Hälfte bis zwei Drittel). Typische Teile sind Gehäuse, Zahnräder, Stecker und Verpackungen; im Unterschied zum Druckguss von Metall wird der Kunststoff bei vergleichsweise niedriger Temperatur verarbeitet.
>
> Bei der Konstruktion sind **gleichmäßige Wanddicken** (vermeiden Einfallstellen und Verzug), **Entformungsschrägen** (damit das Teil aus dem Werkzeug gleitet) und die Lage von **Anguss** und **Trennebene** wichtig. Das Werkzeug ist teuer (Stahlform, oft mit mehreren Kavitäten); das Verfahren lohnt sich deshalb erst bei großen Stückzahlen, weil sich die **Werkzeugkosten** auf viele Teile verteilen.
>
> *Beispiele:* Bei einer Zykluszeit von 30 s und einem Werkzeug mit zwei Kavitäten entstehen 3.600 s / 30 s · 2 = **240 Teile je Stunde**. Kostet das Werkzeug 60.000 € und werden 100.000 Teile gefertigt, entfallen darauf 60.000 € / 100.000 = **0,60 €** je Teil; bei einem Maschinenstundensatz von 48 € je Stunde kommen 48 € / 240 = **0,20 €** je Teil hinzu (ohne Material). Die **Schließkraft** der Maschine muss die Kraft aufnehmen, mit der der Innendruck das Werkzeug auseinanderdrücken will: **F_S ≥ p_i · A_proj** (projizierte Fläche). Bei einem Werkzeuginnendruck von 400 bar (= 40 N/mm², Beispielwert) und einer projizierten Fläche von 100 cm² (= 10.000 mm²) beträgt die Schließkraft mindestens 40 N/mm² · 10.000 mm² = 400.000 N = **400 kN**.

## 5. TQ3 7.4 — Steuern und Regeln

**Einfügen:** Neuer Abschnitt `### Steuern und Regeln` nach „Grundlagen der SPS“.

> Bei einer **Steuerung** wirken die Eingangsgrößen über die Steuereinrichtung auf die Ausgangsgröße; die Wirkungskette ist **offen**, das Ergebnis wird nicht zurückgemeldet. Störungen werden deshalb nicht ausgeglichen. Beispiele sind eine Zeitschaltung für die Hallenbeleuchtung oder die Schrittkette eines Werkstückwechsels. Bei einer **Regelung** wird die Ausgangsgröße laufend gemessen und mit dem Sollwert verglichen; die Wirkungskette ist ein **geschlossener Regelkreis**. Beispiele sind die Temperaturregelung einer Härteanlage oder die Drehzahlregelung einer Spindel.
>
> Die Begriffe des Regelkreises: Die **Führungsgröße w** ist der Sollwert, die **Regelgröße x** der gemessene Istwert (Temperatur), der Vergleich ergibt die **Regeldifferenz e = w − x**. Der **Regler** bildet daraus die **Stellgröße y** (zum Beispiel die Heizleistung), die über das Stellglied auf die **Regelstrecke** wirkt. Eine **Störgröße z** (zum Beispiel Zugluft, Werkstückmasse) greift an der Strecke an und wird vom Regler ausgeregelt. Der **P-Regler** (proportional) bildet die Stellgröße proportional zur Regeldifferenz: **y = K_P · e**; er reagiert schnell, hinterlässt aber eine bleibende Regeldifferenz. Der **I-Regler** (integrierend) beseitigt sie vollständig, arbeitet aber langsamer; der **PI-Regler** kombiniert beides, der **PID-Regler** ergänzt einen vorausschauenden Anteil (D).
>
> *Beispiel:* Ein Härteofen soll 80 °C halten (w), der Istwert beträgt 72 °C (x), die Regeldifferenz also e = 8 K. Bei einem P-Regler mit K_P = 5 % je K ist die Stellgröße y = 5 % / K · 8 K = **40 %** der Heizleistung. Erreicht die Temperatur 79 °C, sinkt die Stellgröße auf 5 %; deshalb bleibt beim reinen P-Regler eine kleine Regeldifferenz bestehen. Eine SPS kann beides: Sie steuert Abläufe und führt (mit Reglerbausteinen) auch Regelungen aus.

## 6. TQ3 7.4 — SPS-Programmiersprachen und Verknüpfungslogik

**Einfügen:** Neuer Abschnitt `### SPS-Programmiersprachen und Verknüpfungslogik` nach „Steuern und Regeln“.

> Die Norm **IEC 61131-3** legt fünf Programmiersprachen für SPS fest. Der **Kontaktplan (KOP)** ähnelt einem Stromlaufplan mit Kontakten und Spulen und ist für Elektriker besonders vertraut. Der **Funktionsbausteinplan (FUP)** stellt Logik mit Bausteinen (UND, ODER, NICHT) grafisch dar. Die **Anweisungsliste (AWL)** ist textuell und maschinennah (zum Beispiel „U E0.0“, „= A0.0“). **Strukturierter Text (ST)** ähnelt einer Hochsprache und eignet sich für Berechnungen und Datenverarbeitung. Die **Ablaufsprache (AS)** beschreibt Schrittketten (Abläufe mit Schritten und Übergangsbedingungen). Welche Sprache sich eignet, hängt von der Aufgabe und dem Team ab; die Sprachen lassen sich oft kombinieren.
>
> Die Grundverknüpfungen sind **UND** (Ausgang 1, wenn alle Eingänge 1 sind), **ODER** (Ausgang 1, wenn mindestens ein Eingang 1 ist) und **NICHT** (Umkehrung). Die **Selbsthaltung** in der SPS hält einen Ausgang nach kurzem Tastendruck: **M = (Start ODER M) UND NICHT Stopp UND NICHT Störung**. *Beispiel:* Start = 1, Stopp = 0, Störung = 0: M wird 1. Wird die Starttaste losgelassen (Start = 0), hält M sich selbst (Start ODER M = 0 ODER 1 = 1) und bleibt 1. Sobald Stopp = 1 ist (oder Störung = 1), ergibt der Ausdruck 0: M fällt ab. Die Stopptaste wird in der Praxis als Öffner angeschlossen, damit ein Drahtbruch die Anlage abschaltet (Ruhestromprinzip).
>
> Die SPS arbeitet **zyklisch** (EVA-Prinzip, vgl. „Grundlagen der SPS“); die **Zykluszeit** liegt bei wenigen Millisekunden. Ändert sich ein Eingangssignal kurz nach dem Einlesen, wird es erst im nächsten Zyklus verarbeitet; die ungünstigste **Reaktionszeit** beträgt daher etwa zwei Zykluszeiten (Richtwert). *Beispiel:* Bei einer Zykluszeit von 5 ms reagiert die SPS spätestens nach etwa **10 ms**. Für sehr schnelle Vorgänge nutzt man Alarm- oder Interrupt-Eingänge oder spezielle Zählbaugruppen.

## 7. TQ3 7.4 — Hydraulik und Pneumatik in der Anlage

**Einfügen:** Neuer Abschnitt `### Hydraulik und Pneumatik in der Anlage` nach „Sensorik und Aktorik“.

> Fluidtechnische Antriebe sind in Fertigungsanlagen weit verbreitet (Grundlagen und Druckformel in 5.1, Schaltpläne in 6.1). Eine **Hydraulikanlage** besteht aus **Tank**, **Pumpe** (erzeugt den Volumenstrom, zum Beispiel Zahnrad- oder Kolbenpumpe), **Filter**, **Druckbegrenzungsventil** (schützt vor Überdruck), **Wegeventilen** (steuern die Richtung) und **Zylindern** oder **Hydromotoren** als Arbeitselementen; der Betriebsdruck liegt bei etwa 100 bis 400 bar (Richtwert). Eine **Pneumatikanlage** besteht aus Kompressor, Druckbehälter, **Wartungseinheit** (Filter mit Wasserabscheider, Druckregler, bei Bedarf Öler), Wegeventilen und Zylindern; der Betriebsdruck beträgt meist 6 bar. Hydraulik liefert große Kräfte bei gleichmäßiger, gut regelbarer Geschwindigkeit, ist aber aufwendiger, teurer und kann Öl verlieren. Pneumatik ist schnell, sauber, einfach und billig, aber nicht für große, genau zu haltende Kräfte geeignet.
>
> Bei einem **doppeltwirkenden Zylinder** wirkt der Druck auf beiden Seiten des Kolbens. Auf der Kolbenseite (Fläche A_K) beträgt die Kraft **F = p · A_K**, auf der Kolbenstangenseite ist die wirksame **Ringfläche** kleiner (A_K − A_St), die Kraft beim Einfahren also geringer. *Beispiel:* Pneumatikzylinder mit 63 mm Kolbendurchmesser, 20 mm Kolbenstangendurchmesser bei 6 bar (= 0,6 N/mm²): A_K = π · 63² / 4 ≈ 3.117 mm², F_aus = 0,6 · 3.117 ≈ **1.870 N**; Ringfläche ≈ 3.117 − 314 = 2.803 mm², F_ein ≈ **1.682 N**. Die tatsächlichen Kräfte sind wegen der Reibung etwas kleiner.
>
> Der **Volumenstrom** Q ergibt sich aus Kolbenfläche und Geschwindigkeit: **Q = A · v**. Die hydraulische **Leistung** ist **P = p · Q**. *Beispiel Hydraulik:* Ein Zylinder mit A = 50 cm² soll mit 0,1 m/s ausfahren: Q = 50 cm² · 10 cm/s = 500 cm³/s = **30 l/min**. Bei einem Druck von 200 bar (= 20 · 10⁶ Pa) beträgt die Leistung P = 20 · 10⁶ Pa · 0,0005 m³/s = **10.000 W = 10 kW**. Die Pumpe und der Antriebsmotor müssen diese Leistung (zuzüglich Verluste) liefern. Die Geschwindigkeit eines Zylinders wird über den Volumenstrom bestimmt, die Kraft über den Druck.

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei P1 und P2: (1) Abschnitte in die Themenfiles 7.1 und 7.4 einarbeiten (LF, Hausregeln, Validierung, Import); (2) Entwurf der Karteikarten und Quizfragen (je Abschnitt 2 bis 3 Items, darunter Rechenaufgaben: Drehzahl, Vorschubgeschwindigkeit, Hauptzeit, Zeitspanvolumen, Standzeit nach Taylor, Zykluszeit, Werkzeugkosten je Teil, Schließkraft, Stellgröße, Reaktionszeit, Zylinderkraft, Volumenstrom, Leistung); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgabe nachziehen.

## Zu entscheiden

1. **Umfang:** sieben Abschnitte, wie vorgeschlagen? Der Abschnitt 4 (Spritzgießen) kann entfallen, wenn Kunststoffverarbeitung in der Prüfung nicht erwartet wird; der Rahmenplan nennt sie nach meinem Stand nicht ausdrücklich.
2. **Taylor-Beziehung (Abschnitt 2):** Ist sie als Rechenbeispiel gewollt, oder soll die Standzeit nur qualitativ stehen? Ich empfehle sie mit Hinweis „Beispielexponent“.
3. **Schneidstoff- und Schweißrichtwerte (Abschnitte 2, 3):** Temperaturgrenzen, 0,22 % Kohlenstoff, 450 °C Lötgrenze, Scherfestigkeit des Klebstoffs und Betriebsdrücke sind Richtwerte aus meinem Fachwissen; Prüfung in der Zweitlesung der Primärtexte (Iteration 22). Einverstanden?
4. **Arbeitsschutz:** Sicherheitshinweise zum Schweißen (Strahlung, Rauch) und zu Druckanlagen bleiben bewusst weg (Paket P8, Rechtsnahes). Einverstanden?
5. **Nicht enthalten, bitte sagen, falls gewünscht:** Gewinde- und Verzahnungsfertigung, Schleifen im Detail, Rüst- und Nebenzeiten (kommen in P4), Wärmebehandlungsanlagen, Servo- und Schrittmotoren, Bussysteme, Hydraulikschaltpläne im Detail, Druckluftaufbereitung im Detail, Luftverbrauch von Pneumatikzylindern.
