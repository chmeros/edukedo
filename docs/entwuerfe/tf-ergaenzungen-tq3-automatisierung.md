# Entwurf: Ergänzungen TQ3 7.4 — Antriebe, Bussysteme, Fluidtechnik (Technischer Fachwirt)

Stand 12.10.2026, nach der unabhängigen Fachprüfung überarbeitet (siehe „Prüfergebnis eingearbeitet“ am Dateiende) · **vom Projektleiter angenommen („alle Vorschläge umsetzen, nochmal per Agent prüfen“), unabhängig fachlich geprüft und am 12.10.2026 in `content/` eingearbeitet** Auftrag des Projektleiters vom 12.10.2026: Themen, die in den Paketen P1 bis P6 bisher unter „Nicht enthalten“ standen, sollen nun doch aufgenommen werden. Hier betrifft das das Thema 7.4 „Automatisierungstechnik“ (Fachgebiet TQ3, Fertigungs- und Betriebstechnik). Die Punkte stammen aus dem Paket P3 (`docs/entwuerfe/tf-rahmenplan-p3-fertigung-betrieb.md`, Abschnitt „Zu entscheiden“, Punkt 5): Servo- und Schrittmotoren, Bussysteme, Hydraulikschaltpläne im Detail, Druckluftaufbereitung im Detail und Luftverbrauch von Pneumatikzylindern.

## Was vorliegt

Fünf neue Theorieabschnitte mit je mindestens einem durchgerechneten Zahlenbeispiel. Sie knüpfen an die vorhandenen Abschnitte von 7.4 („Steuern und Regeln“, „Sensorik und Aktorik“, „Hydraulik und Pneumatik in der Anlage“) sowie an 5.1, 5.3 und 6.1 an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem eigenen Skript nachgerechnet (Übersicht unter „Rechenprüfung“).

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 7.4 | „Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor“ | „Sensorik und Aktorik“ |
| 2 | 7.4 | „Bussysteme und industrielle Kommunikation“ | Abschnitt 1 |
| 3 | 7.4 | „Hydraulikschaltpläne im Detail“ | „Hydraulik und Pneumatik in der Anlage“ |
| 4 | 7.4 | „Druckluftaufbereitung und Druckluftkosten“ | Abschnitt 3 |
| 5 | 7.4 | „Luftverbrauch von Pneumatikzylindern“ | Abschnitt 4 |

**Hinweis zur Prüfung:** Die Texte beschreiben Lehrbuchwissen. Zahlenwerte, die nicht aus Normen stammen (Schlupf, Geberauflösung, Strombedarf je m³ Druckluft, Strompreis, Leckageanteil, Betriebsstunden, Taupunkte, Verdrahtungslängen), sind als „Beispielwert“ oder „Richtwert“ gekennzeichnet. Genannt werden nur Normen, die ich sicher kenne (DIN ISO 1219 für Schaltzeichen der Fluidtechnik, ISO 8573-1 für die Druckluftqualität, IEC 62541 für OPC UA, DIN 1343 für den Normzustand); die Normen sind unter „Zu entscheiden“ aufgeführt. Rechtsnahes (Druckbehälterprüfung, Kondensatentsorgung, Arbeitsschutz, Maschinensicherheit) kommt nicht vor und bleibt Paket P8. Die Beschreibung von Schaltzeichen erfolgt in Worten, weil das Format keine Zeichnungen enthält; eine Kennzeichnung der Bauteile mit Ziffern oder Buchstaben (Betriebsmittelkennzeichen) steht bewusst nicht im Text.

---

## 1. TQ3 7.4 — Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor

**Einfügen:** Neuer Abschnitt `### Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor` nach „Sensorik und Aktorik“.

> Elektrische Antriebe setzen die Ausgangssignale der Steuerung in Drehbewegungen um (Grundlagen des Drehstroms in 5.3). Für Fertigungsanlagen kommen vor allem drei Bauarten in Frage: der **Asynchronmotor** (meist mit Frequenzumrichter), der **Servoantrieb** und der **Schrittmotor**. Sie unterscheiden sich darin, ob die Bewegung nur gesteuert oder mit einer Rückmeldung geregelt wird (vgl. „Steuern und Regeln“).
>
> Beim **Drehstrom-Asynchronmotor** erzeugen die drei Wicklungen im feststehenden Teil des Motors (**Stator**) ein umlaufendes **Drehfeld**. Dessen **Synchrondrehzahl** hängt von der Netzfrequenz f und der **Polpaarzahl p** ab: **n_s = 60 · f / p** (n_s in min⁻¹, f in Hz). Ein vierpoliger Motor hat zwei Polpaare (p = 2). Der drehende Teil (**Läufer**, auch Rotor genannt) dreht sich im Motorbetrieb etwas **langsamer** als das Drehfeld, denn nur bei einem Drehzahlunterschied wird im Läufer eine Spannung induziert und ein Drehmoment erzeugt. Dieser Unterschied heißt **Schlupf**: **s = (n_s − n) / n_s**, meist in Prozent angegeben. Bei Nennlast beträgt er einige Prozent (Richtwert). Zur **Drehzahlstellung** dient ein **Frequenzumrichter**: Er ändert die Frequenz und im gleichen Verhältnis die Spannung (U/f-Kennlinie), sodass das Magnetfeld und damit das verfügbare Drehmoment des Motors etwa erhalten bleiben. Oberhalb der Nennfrequenz kann die Spannung nicht weiter steigen; der Motor läuft dann im **Feldschwächbereich**, und sein Drehmoment nimmt mit steigender Drehzahl ab. Weil n_s proportional zu f ist, lässt sich die Drehzahl stufenlos einstellen, zum Beispiel bei Förderbändern, Pumpen oder Spindeln. Ein Asynchronmotor mit Umrichter ohne Geber eignet sich zum Drehzahlstellen, nicht zum genauen Positionieren; mit Geber und geeigneter Regelung lässt er sich auch geregelt betreiben. Leistung, Drehzahl und Drehmoment hängen zusammen: **P = 2π · n · M** (n in s⁻¹, M in Nm). Bei gegebener Motorleistung bedeutet eine niedrigere Drehzahl ein höheres Drehmoment (zum Beispiel über ein Getriebe; vgl. 5.1). Beim Einschalten nimmt der Motor einen erhöhten Anlaufstrom auf (vgl. 5.3).
>
> *Beispiel Drehzahl und Schlupf:* Ein vierpoliger Motor (p = 2) am 50-Hz-Netz hat die Synchrondrehzahl n_s = 60 · 50 / 2 = **1.500 min⁻¹**. Auf dem Typenschild steht die Nenndrehzahl 1.440 min⁻¹. Der Schlupf beträgt s = (1.500 − 1.440) / 1.500 = 0,04 = **4 %** (Beispielwert); die Schlupfdrehzahl n_s − n ist 1.500 − 1.440 = **60 min⁻¹**. Der Frequenzumrichter stellt 40 Hz ein: n_s = 60 · 40 / 2 = **1.200 min⁻¹**. Bei konstantem U/f-Verhältnis hängt das Drehmoment von der Schlupfdrehzahl ab, nicht vom prozentualen Schlupf. Bei gleichem Lastmoment bleibt deshalb näherungsweise die **Schlupfdrehzahl** gleich (vereinfachende Annahme; die Anhebung der Spannung bei sehr kleinen Frequenzen bleibt außer Betracht). Der Motor dreht dann mit 1.200 − 60 = **1.140 min⁻¹**, der Schlupf beträgt jetzt 60 / 1.200 = **5 %**. Die Spannung wird im selben Verhältnis wie die Frequenz verringert: 400 V · 40 / 50 = **320 V**.
>
> Ein **Servoantrieb** besteht aus dem Servomotor (häufig ein permanenterregter Synchronmotor), einem **Servoumrichter** und einem **Geber (Encoder)**, der laufend Lage und Drehzahl der Motorwelle zurückmeldet. Damit bildet er einen **geschlossenen Regelkreis**: Der Regler vergleicht Soll- und Istwerte von Strom (Drehmoment), Drehzahl und Lage und gleicht Abweichungen sofort aus. Das ergibt eine **hohe Dynamik** (schnelles Beschleunigen und Bremsen) und eine **hohe Positioniergenauigkeit**. Ein **Inkrementalgeber** liefert eine feste Zahl von Impulsen je Umdrehung und benötigt nach dem Einschalten eine Referenzfahrt; ein **Absolutwertgeber** kennt die Position sofort. Nachteile sind höhere Kosten und der größere Aufwand bei Auslegung und Inbetriebnahme. Servoantriebe bewegen die Achsen von Handhabungsgeräten, Verpackungs- und Zuführeinrichtungen sowie Vorschubachsen.
>
> Ein **Schrittmotor** dreht sich bei jedem Ansteuerimpuls um einen festen Winkel: **Schrittwinkel = 360° / Schrittzahl je Umdrehung**. Positioniert wird durch Zählen der Impulse; die Steuerung arbeitet **ohne Rückmeldung** (offene Steuerung). Das ist einfach und preiswert, hat aber eine Schwäche: Wird das Lastmoment zu groß oder die Beschleunigung zu hoch, fällt der Rotor aus dem Takt (**Schrittverlust**), und die Steuerung bemerkt das nicht — die angenommene Position stimmt dann nicht mehr. Schrittmotoren eignen sich für kleine bis mittlere Lasten und Drehzahlen; im Stillstand haben sie ein gutes Haltemoment, das Drehmoment fällt aber mit steigender Drehzahl ab. Im **Mikroschrittbetrieb** teilt die Ansteuerung einen Vollschritt in Teilschritte; das erhöht die Auflösung und beruhigt den Lauf, die tatsächliche Genauigkeit der Zwischenstellungen ist jedoch geringer als die rechnerische Auflösung.
>
> | Merkmal | Asynchronmotor mit Frequenzumrichter | Servoantrieb | Schrittmotor |
> |---|---|---|---|
> | Rückmeldung | nicht erforderlich (gesteuert); mit Geber auch geregelt möglich | Geber, geschlossener Regelkreis | keine (offene Steuerung) |
> | Positionieren | ohne zusätzliche Lageregelung nicht genau | sehr genau | genau, solange kein Schrittverlust auftritt |
> | Dynamik | mäßig | sehr hoch | mittel |
> | Drehmoment bis zur Nenndrehzahl | gut | gut | fällt mit steigender Drehzahl ab |
> | Kosten und Aufwand | gering bis mittel | hoch | gering |
> | Typische Einsätze | Förderbänder, Pumpen, Lüfter, Hauptspindeln | Handhabung, Verpackung, schnelle Positionierachsen | kleine Achsen, Dosier- und Zuführeinrichtungen |
>
> *Beispiel Linearachse mit Spindel:* Ein Schlitten wird über einen Spindeltrieb mit 5 mm Steigung (Weg je Umdrehung) bewegt und soll 120 mm verfahren. Das sind 120 mm / 5 mm = **24 Umdrehungen**. **Schrittmotor:** Der Motor hat 200 Vollschritte je Umdrehung (Schrittwinkel 360° / 200 = **1,8°**); im Mikroschrittbetrieb mit 16 Teilschritten sind es 200 · 16 = 3.200 Schritte je Umdrehung (0,1125° je Schritt). Weg je Schritt = 5 mm / 3.200 = 0,0015625 mm ≈ **1,56 µm**. Für 120 mm braucht die Steuerung 24 · 3.200 = **76.800 Impulse**. Bei einer Impulsfrequenz von 16.000 Hz dreht die Spindel mit 16.000 / 3.200 = 5 Umdrehungen je Sekunde (= 300 min⁻¹), der Schlitten fährt mit 5 · 5 mm = **25 mm/s**, und die Verfahrzeit beträgt 120 mm / 25 mm/s = **4,8 s** (ohne Beschleunigungs- und Bremsrampen). **Servoantrieb:** Der Geber hat 16.384 Inkremente je Umdrehung (Beispielwert), die Wegauflösung beträgt 5 mm / 16.384 ≈ **0,31 µm**. Bei 3.000 min⁻¹ (= 50 Umdrehungen je Sekunde) fährt der Schlitten mit 50 · 5 mm = **250 mm/s**, die Verfahrzeit für 120 mm beträgt 120 / 250 = **0,48 s** (ebenfalls ohne Rampen). Die Zeiten beider Antriebe sind nicht unmittelbar vergleichbar, weil für das Beispiel unterschiedliche Drehzahlen angenommen wurden. Auflösung ist nicht dasselbe wie Genauigkeit: Spindelspiel, Steigungsfehler und Elastizität der Mechanik begrenzen die erreichbare Positioniergenauigkeit. Bei Vantera dient ein Servoantrieb für die schnelle Zuführachse eines Handhabungssystems, ein Schrittmotor für eine einfache Dosierachse mit geringer Last.

## 2. TQ3 7.4 — Bussysteme und industrielle Kommunikation

**Einfügen:** Neuer Abschnitt `### Bussysteme und industrielle Kommunikation` nach „Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor“.

> In einer **parallelen Verdrahtung** führt von jedem Sensor und Aktor eine eigene Leitung zur Steuerung oder zum Schaltschrank. Das ist übersichtlich, verursacht aber bei vielen Geräten viel Leitung, viele Anschlussstellen und hohen Montageaufwand. Ein **Feldbus** verbindet viele Teilnehmer über eine gemeinsame Leitung mit der Steuerung: Die Geräte werden an dezentrale Ein-/Ausgabemodule angeschlossen oder sind selbst busfähig. Das spart Leitungen und Montagezeit, erleichtert Erweiterungen und liefert Diagnosedaten; dafür braucht es Bus-Know-how und Projektierung, und der Ausfall der Busleitung kann viele Geräte gleichzeitig betreffen.
>
> Die **Automatisierungspyramide** ordnet die Aufgaben in Ebenen (die Darstellungen kennen vier bis fünf Ebenen): Die **Feldebene** enthält Sensoren und Aktoren, die **Steuerungsebene** die SPS, die **Betriebsleitebene** Visualisierung und Fertigungsleitsysteme (**SCADA** = Supervisory Control and Data Acquisition, das Überwachen und Bedienen der Anlage; **MES** = Manufacturing Execution System, das Fertigungsleitsystem) und die **Unternehmensebene** Planungssysteme wie **ERP** (Enterprise Resource Planning). In Darstellungen mit fünf Ebenen wird die Prozessleitebene mit SCADA von der Betriebsleitebene mit MES getrennt. Nach oben nehmen die Datenmengen und die betrachteten Zeiträume zu, nach unten die Anforderungen an die Echtzeit, also an kurze, vorhersagbare Reaktionszeiten. Die Kommunikation entlang dieser Ebenen entspricht der vertikalen Vernetzung (vgl. „Industrie 4.0 und vernetzte Produktion“).
>
> | System | Kernaussage |
> |---|---|
> | PROFIBUS | Serieller Feldbus (PROFIBUS DP, Zweidrahtleitung nach RS-485) nach dem Master-Slave-Prinzip; bei mehreren Mastern geben diese das Senderecht untereinander weiter; in der Fertigungsautomatisierung weit verbreitet; Bitraten bis 12 Mbit/s bei kurzen Leitungen, bei langen Leitungen deutlich weniger |
> | PROFINET | Industrial-Ethernet-Standard, der auf Ethernet aufbaut und Echtzeitkommunikation mit gewöhnlicher Netzwerktechnik verbindet |
> | EtherCAT | Ethernet-basiert; das Telegramm läuft durch alle Teilnehmer, die ihre Daten im Durchlauf entnehmen und einfügen; sehr kurze Zykluszeiten, häufig bei Antriebs- und Bewegungssteuerung |
> | CAN | Serielles Bussystem aus der Fahrzeugtechnik ohne festen Master: Jeder Teilnehmer darf senden, sobald der Bus frei ist; beginnen mehrere gleichzeitig, setzt sich die Nachricht mit der höchsten Priorität (kleinste Nachrichtenkennung) durch, die übrigen senden danach |
> | IO-Link | Punkt-zu-Punkt-Verbindung zwischen einem IO-Link-Master und einzelnen Sensoren oder Aktoren, auch für Parametrierung und Diagnose; kein Bus im engeren Sinn; der IO-Link-Master wird seinerseits über einen Feldbus oder Industrial Ethernet an die Steuerung angebunden |
> | AS-Interface | Zweidrahtleitung für Daten und Energie, für einfache binäre Sensoren und Aktoren der untersten Ebene; Master-Slave-Prinzip |
> | Modbus | Einfaches, offenes Protokoll nach dem Frage-Antwort-Prinzip (bei Modbus RTU als Master-Slave, bei Modbus TCP als Client-Server bezeichnet); Modbus RTU läuft seriell, Modbus TCP über Ethernet; häufig bei Messgeräten und Umrichtern |
>
> Beim **Master-Slave-Prinzip** beginnt allein der Master die Kommunikation, die Slaves antworten nur auf Anfrage. **Echtzeit** bedeutet in der Automatisierung nicht „möglichst schnell“, sondern **vorhersagbar**: Die Daten kommen innerhalb einer garantierten Zeit an. Das ist zum Beispiel bei Antriebsregelungen wichtig. Die **Topologie** beschreibt, wie die Teilnehmer verbunden sind: In der **Linie** hängen sie nacheinander an einer Leitung (wenig Kabel; bei einer Unterbrechung fallen die nachfolgenden Teilnehmer aus). Im **Stern** läuft jede Verbindung zu einem zentralen Verteiler (Switch); der Ausfall einer Leitung betrifft nur ein Gerät, der Ausfall des Verteilers alle. Im **Ring** sind die Enden verbunden; bei geeigneten Systemen bleibt die Kommunikation auch nach einer Unterbrechung über den Rückweg erhalten (Redundanz).
>
> **OPC UA** ist ein herstellerunabhängiger, plattformunabhängiger Standard (IEC 62541), der Maschinendaten samt Bedeutung strukturiert bereitstellt und Sicherheitsfunktionen wie Verschlüsselung und Authentifizierung enthält. Er verbindet Steuerungen mit übergeordneten IT-Systemen wie MES, ERP oder Cloud-Diensten. Für die schnelle, vorhersagbare Kommunikation in der Feldebene werden bisher vor allem Feldbusse und Industrial-Ethernet-Systeme eingesetzt; OPC UA dient bisher vor allem dem Datenaustausch zwischen Steuerungs- und IT-Ebene. Erweiterungen (zum Beispiel OPC UA FX, zeitsensitive Netzwerke) sollen es künftig auch für die Kommunikation zwischen Steuerungen und Feldgeräten nutzbar machen.
>
> *Beispiel Verdrahtungsaufwand:* Eine Anlage der Vantera hat 24 Sensoren und Aktoren, im Mittel 15 m vom Schaltschrank entfernt (Beispielwerte). **Parallel:** 24 · 15 m = **360 m** Leitung, 24 Leitungen am Schaltschrank anzuschließen. **Mit Feldbus:** drei dezentrale Module mit je 8 Kanälen in der Nähe der Geräte, mittlere Zuleitung 3 m je Gerät, dazu eine Busleitung von 40 m: 24 · 3 m + 40 m = **112 m**. Ersparnis 360 m − 112 m = **248 m**, das sind 248 / 360 = **68,9 %**; am Schaltschrank endet nur noch eine Busleitung. Nicht berücksichtigt ist die Leitung für die Spannungsversorgung der Module; die Ersparnis fällt dadurch in der Praxis etwas geringer aus.
>
> *Beispiel Übertragungszeit:* Die Übertragungszeit eines Telegramms ist **Bitzahl / Bitrate**. Ein Telegramm von 64 Byte (inklusive Kopf- und Prüfdaten, Beispielwert) hat 64 · 8 = 512 Bit. Bei 100 Mbit/s dauert die Übertragung 512 / 100.000.000 s = **5,12 µs**, bei 12 Mbit/s 512 / 12.000.000 s ≈ **42,7 µs**, bei 1 Mbit/s **512 µs**. Fragt ein Master 20 Slaves nacheinander ab (je Teilnehmer eine Anfrage und eine Antwort mit je 64 Byte), sind das 20 · 2 · 512 Bit = 20.480 Bit: bei 1 Mbit/s **20,48 ms**, bei 12 Mbit/s etwa **1,71 ms**. Das ist ein vereinfachtes Modell für eine einzelne Abfrage je Teilnehmer; Systeme wie EtherCAT übertragen die Daten aller Teilnehmer in einem einzigen Telegramm, deshalb sind ihre Zykluszeiten deutlich kürzer. Laufzeiten auf der Leitung, Pausen zwischen den Telegrammen und die Verarbeitungszeit in den Teilnehmern sind in der Rechnung nicht berücksichtigt. Die Buszykluszeit geht in die Gesamtreaktionszeit der Anlage ein, zusätzlich zur Zykluszeit der SPS (vgl. „SPS-Programmiersprachen und Verknüpfungslogik“).

## 3. TQ3 7.4 — Hydraulikschaltpläne im Detail

**Einfügen:** Neuer Abschnitt `### Hydraulikschaltpläne im Detail` nach „Hydraulik und Pneumatik in der Anlage“.

> Hydraulikschaltpläne verwenden genormte Schaltzeichen nach **DIN ISO 1219** (Überblick in 6.1). Die wichtigsten Bauteile, in Worten beschrieben:
>
> | Bauteil | Schaltzeichen (beschrieben) | Aufgabe |
> |---|---|---|
> | Pumpe (Konstantpumpe) | Kreis mit ausgefülltem Dreieck, Spitze zeigt nach außen | erzeugt den Volumenstrom |
> | Hydromotor | Kreis mit ausgefülltem Dreieck, Spitze zeigt nach innen | wandelt Volumenstrom in Drehbewegung |
> | Tank | nach oben offener Kasten (belüfteter Behälter) | speichert und kühlt das Öl, setzt Luft und Schmutz ab |
> | Filter | auf der Spitze stehendes Quadrat mit gestrichelter Querlinie | hält Schmutzpartikel zurück |
> | Druckbegrenzungsventil | Quadrat mit Pfeil, Feder an einer Seite, gestrichelte Steuerleitung vom Druckanschluss; in Grundstellung geschlossen | öffnet bei Erreichen des eingestellten Drucks und leitet Öl zum Tank |
> | 4/3-Wegeventil | drei aneinandergereihte Quadrate (Schaltstellungen), vier Anschlüsse am Mittelfeld | steuert die Richtung des Volumenstroms |
> | Rückschlagventil | Kugel auf Sitz | lässt Öl in einer Richtung durch, sperrt die Gegenrichtung |
> | Drosselrückschlagventil | Drossel (zwei einander zugewandte Bögen) parallel zu einem Rückschlagventil | drosselt in einer Richtung, lässt in der Gegenrichtung frei durch |
> | Zylinder (doppeltwirkend) | Rechteck mit Kolben und einseitiger Kolbenstange | wandelt Druck in eine geradlinige Bewegung |
>
> Beim **4/3-Wegeventil** (vier Anschlüsse, drei Schaltstellungen) bezeichnet **P** den Druckanschluss von der Pumpe, **T** den Anschluss zum Tank und **A** und **B** die Arbeitsanschlüsse zum Verbraucher. Federn zentrieren das Ventil in der Mittelstellung, Magnete schalten es in die beiden Endstellungen. Wichtig ist die **Mittelstellung**, weil sie festlegt, was Pumpe und Zylinder im Ruhezustand tun:
>
> | Mittelstellung | Verbindungen | Wirkung |
> |---|---|---|
> | Sperrmittelstellung | alle vier Anschlüsse gesperrt | Zylinder wird gehalten; die Pumpe muss ihren Volumenstrom über das Druckbegrenzungsventil abgeben (Verlustleistung, Erwärmung des Öls) |
> | Umlaufmittelstellung | P mit T verbunden, A und B gesperrt | Zylinder wird gehalten; die Pumpe fördert fast drucklos zum Tank (energiesparend) |
> | Schwimmstellung | A und B mit T verbunden, P gesperrt | Zylinder kann durch äußere Kräfte bewegt werden (zum Beispiel beim Einrichten); die Pumpe fördert bei gesperrtem Anschluss P wie bei der Sperrmittelstellung über das Druckbegrenzungsventil |
>
> Leitungen werden unterschieden: Druck- und Arbeitsleitungen durchgezogen, Steuer- und Leckölleitungen gestrichelt. Jedes Bauteil erhält im Schaltplan eine **Kennzeichnung** (zum Beispiel für Pumpe, Wegeventil und Zylinder), die in der Stückliste und an der Anlage wiederkehrt, damit Schaltplan und Anlage zusammenpassen. Welches Kennzeichnungssystem verwendet wird, richtet sich nach Norm und Betrieb.
>
> *Funktion eines einfachen Schaltplans in Worten:* Ein Elektromotor treibt die Konstantpumpe an, die Öl aus dem Tank saugt. Hinter der Pumpe ist das Druckbegrenzungsventil angeschlossen; im Rücklauf zum Tank sitzt ein Filter. Die Pumpe speist den Anschluss P des 4/3-Wegeventils mit Sperrmittelstellung, Federzentrierung und zwei Magneten. Anschluss A führt zur Kolbenseite des doppeltwirkenden Zylinders, Anschluss B über ein Drosselrückschlagventil zur Stangenseite. **Ausfahren:** Der Magnet a wird bestromt, das Ventil verbindet P mit A und B mit T. Das Öl strömt auf die Kolbenseite, der Kolben fährt aus, das Öl der Stangenseite wird über die Drossel des Drosselrückschlagventils zum Tank gedrängt. Die Drossel stellt die Ausfahrgeschwindigkeit ein; sie hält den Kolben auch bei ziehender Last unter Spannung (Ablaufdrosselung). Bei einer Zulaufdrosselung würde eine ziehende Last den Kolben dagegen vorauslaufen lassen, weil das Öl nur gedrosselt nachströmt. Erreicht der Kolben die Endlage, steigt der Druck bis zum Einstelldruck des Druckbegrenzungsventils, das dann den Pumpenstrom zum Tank leitet. **Halten:** Sind beide Magnete stromlos, zentrieren die Federn das Ventil in die Sperrmittelstellung. Das Öl ist eingeschlossen, der Zylinder wird gehalten; Schieberventile haben allerdings etwas Leckage, für lange Haltezeiten verwendet man ein entsperrbares Rückschlagventil. **Einfahren:** Der Magnet b wird bestromt, das Ventil verbindet P mit B und A mit T. Das Öl strömt durch das Rückschlagventil des Drosselrückschlagventils ungedrosselt auf die Stangenseite, der Kolben fährt ein, das Öl der Kolbenseite fließt zum Tank.
>
> *Beispiel Ausfahr- und Einfahrgeschwindigkeit:* Ein Differentialzylinder hat die Kolbenfläche A_K = 50 cm² und die Kolbenstangenfläche A_St = 10 cm², die Pumpe liefert Q = 30 l/min = 30.000 cm³/min. Beim Einfahren wirkt die Ringfläche A_R = A_K − A_St = 50 − 10 = **40 cm²**. Die folgenden Werte gelten für vollständig geöffnete Drossel; eine eingestellte Drossel verringert die Ausfahrgeschwindigkeit, der überschüssige Pumpenstrom fließt dann über das Druckbegrenzungsventil ab. Ausfahren: v = Q / A_K = 30.000 cm³/min / 50 cm² = 600 cm/min = **10 cm/s = 0,1 m/s**. Einfahren: v = Q / A_R = 30.000 / 40 = 750 cm/min = **12,5 cm/s = 0,125 m/s**. Das Einfahren ist also im Verhältnis A_K / A_R = 50 / 40 = **1,25** schneller. Bei einem Hub von 400 mm dauert das Ausfahren 0,4 m / 0,1 m/s = **4,0 s**, das Einfahren 0,4 m / 0,125 m/s = **3,2 s**. Die Kräfte kehren sich um: Bei 100 bar (= 10 N/mm²) ergibt das Ausfahren F = 10 N/mm² · 5.000 mm² = **50 kN**, das Einfahren 10 N/mm² · 4.000 mm² = **40 kN** (ohne Reibung und ohne Gegendruck auf der Gegenseite). Der Wert 30 l/min entspricht dem Beispiel aus „Hydraulik und Pneumatik in der Anlage“.
>
> Für schnelle Bewegungen bei geringer Last gibt es die **Eilgangschaltung** (Differentialschaltung): Beim Ausfahren wird das Öl der Stangenseite nicht zum Tank, sondern zusätzlich zur Kolbenseite geleitet. Dafür ist ein zusätzliches Ventil nötig, das die Stangenseite mit der Druckleitung verbindet; es ist im oben beschriebenen Schaltplan nicht enthalten. Die wirksame Fläche ist dann nur die Kolbenstangenfläche. *Beispiel:* v = Q / A_St = 30.000 cm³/min / 10 cm² = 3.000 cm/min = **50 cm/s = 0,5 m/s**, also das Fünffache der normalen Ausfahrgeschwindigkeit; die Kolbenseite wird dabei mit 150 l/min versorgt (30 l/min von der Pumpe plus 120 l/min aus der Stangenseite), was Leitungen und Ventile aushalten müssen. Die Kraft sinkt allerdings auf F = 10 N/mm² · 1.000 mm² = **10 kN** bei 100 bar. Für die Arbeitsbewegung mit hoher Kraft schaltet man deshalb auf normales Ausfahren um.

## 4. TQ3 7.4 — Druckluftaufbereitung und Druckluftkosten

**Einfügen:** Neuer Abschnitt `### Druckluftaufbereitung und Druckluftkosten` nach „Hydraulikschaltpläne im Detail“.

> Die Druckluft entsteht im **Verdichter** (auch **Kompressor** genannt). Der **Kolbenverdichter** verdichtet die Luft mit einem Kolben im Zylinder; er arbeitet pulsierend, meist im Aussetzbetrieb (Ein/Aus) und ist für kleine bis mittlere Liefermengen verbreitet, mehrstufig auch für höhere Drücke. Der **Schraubenverdichter** verdichtet die Luft zwischen zwei ineinandergreifenden Schraubenrotoren; er fördert gleichmäßig, ist für den Dauerbetrieb und größere Liefermengen geeignet und in der Industrie sehr verbreitet. Man unterscheidet **ölgeschmierte** (öleingespritzte) und **ölfreie** Bauarten; wo die Luft mit Lebensmitteln, Messtechnik oder Lack in Berührung kommt, sind ölfreie Anlagen üblich. Drehzahlgeregelte Verdichter passen die Liefermenge dem Bedarf an. Ein **Druckbehälter** (Druckluftspeicher) nach dem Verdichter puffert Schwankungen des Verbrauchs, verringert die Zahl der Schaltspiele des Verdichters und scheidet einen Teil des Kondensats ab.
>
> Die angesaugte Luft enthält Wasserdampf. Beim Verdichten und anschließenden Abkühlen kondensiert ein Teil als **Kondensat**, das Korrosion, Verschmutzung und im Winter Einfrieren verursachen und Ventile und Zylinder schädigen kann. Deshalb wird die Luft **aufbereitet**: Nachkühler und Wasserabscheider mit **Kondensatableiter**, dann ein **Vorfilter**, der **Trockner** und ein **Nachfilter**, bei Bedarf bis zur Feinstfiltration. Maßstab für die Trocknung ist der **Drucktaupunkt**: die Temperatur, auf die die Druckluft bei Betriebsdruck abgekühlt werden darf, bevor Wasser ausfällt. Er muss unter der tiefsten Temperatur liegen, der die Leitungen ausgesetzt sind. Der **Kältetrockner** kühlt die Luft auf wenige Grad über 0 °C ab und scheidet das Wasser aus; er erreicht einen Drucktaupunkt von etwa +3 °C (Richtwert) und genügt für die meisten Anwendungen in der Halle. Der **Adsorptionstrockner** entzieht der Luft das Wasser mit einem Trockenmittel, das regeneriert wird; er erreicht Drucktaupunkte von −40 °C und tiefer (Richtwert) und kommt für Leitungen im Freien oder besonders trockene Luft zum Einsatz, verbraucht aber mehr Energie. Die Anforderungen an Feststoffe, Wasser und Öl in der Druckluft werden in Qualitätsklassen nach **ISO 8573-1** beschrieben.
>
> Am Verbraucher sitzt die **Wartungseinheit** (vgl. „Hydraulik und Pneumatik in der Anlage“) in der Reihenfolge **Filter mit Wasserabscheider, Druckregler, bei Bedarf Öler**. Der **Filter** hält Schmutz und Wasser zurück; das Filterelement muss gewechselt werden, ein verschmutzter Filter verursacht Druckverlust. Der **Druckregler** stellt den Arbeitsdruck ein und hält ihn konstant, auch wenn der Netzdruck schwankt; ein Manometer zeigt ihn an. Der **Öler** gibt bei Bedarf feinste Ölmengen an die Luft; Bauteile, die einmal mit Öl betrieben wurden, sind dann dauerhaft auf Ölung angewiesen, deshalb wird er nur eingesetzt, wenn die Bauteile es vorsehen. Das Kondensat der Wartungseinheit muss regelmäßig abgelassen werden, oder ein automatischer Ablass übernimmt das.
>
> Druckluft ist teuer, denn nur ein kleiner Teil der elektrischen Energie steckt später in der Nutzarbeit; der größte Teil wird im Verdichter in Wärme umgewandelt, die sich teilweise zurückgewinnen lässt. Die Energiekosten sind über die Lebensdauer meist der größte Kostenblock. Ein häufiger Kostentreiber ist die **Leckage**: undichte Verschraubungen, Schläuche, Kupplungen und Wartungseinheiten, die Luft ungenutzt entweichen lassen. Sie ist auch bei Stillstand der Anlage vorhanden, in schlecht gewarteten Netzen können Verluste von 20 % bis 30 % der erzeugten Luft auftreten (Richtwert aus der Praxis). Lecks findet man mit Ultraschall-Lecksuchgeräten oder Schaumspray, den Gesamtverlust zeigt der Verbrauch in der Zeit ohne Produktion. Die Energiekosten lassen sich über den **spezifischen Energiebedarf** berechnen: die elektrische Energie, die die Druckluftanlage je erzeugtem Kubikmeter Druckluft aufnimmt (Angabe in kWh je m³, bezogen auf den Ansaugzustand, vgl. „Luftverbrauch von Pneumatikzylindern“). Er hängt von Anlage und Netzdruck ab und liegt bei 6 bar Überdruck häufig bei etwa 0,10 bis 0,13 kWh je m³ (Richtwert); als Faustregel senkt jedes bar weniger Netzdruck den Energiebedarf um etwa 6 bis 8 % (Richtwert).
>
> *Beispiel Kosten pro Jahr:* Die Druckluftanlage der Vantera erzeugt im Jahr 500.000 m³ (bezogen auf den Ansaugzustand, Beispielwert). Der spezifische Energiebedarf beträgt 0,11 kWh je m³ (Beispielwert), der Strompreis 0,25 € je kWh (Beispielwert). Energiebedarf = 500.000 m³ · 0,11 kWh/m³ = **55.000 kWh**, Kosten = 55.000 kWh · 0,25 €/kWh = **13.750 € im Jahr**. Die Leckage beträgt 10 % der erzeugten Luft: 0,10 · 500.000 m³ = **50.000 m³**. Sie verursacht 50.000 m³ · 0,11 kWh/m³ = 5.500 kWh und damit 5.500 kWh · 0,25 €/kWh = **1.375 € im Jahr**; genutzt werden 450.000 m³ mit Kosten von 12.375 €. Wird die Leckage durch Abdichten halbiert (auf 25.000 m³), sinken die Kosten um 25.000 m³ · 0,11 kWh/m³ · 0,25 €/kWh = **687,50 € im Jahr**. Neben dem Abdichten senkt auch ein niedrigerer Netzdruck die Energiekosten, soweit die Verbraucher den Druck nicht benötigen.

## 5. TQ3 7.4 — Luftverbrauch von Pneumatikzylindern

**Einfügen:** Neuer Abschnitt `### Luftverbrauch von Pneumatikzylindern` nach „Druckluftaufbereitung und Druckluftkosten“.

> Ein Pneumatikzylinder verbraucht bei jedem Hub Druckluft aus dem Netz. Weil Luft zusammendrückbar ist, enthält ein Zylinderraum bei Überdruck mehr Luft, als sein Volumen bei Umgebungsdruck fassen würde. Den Verbrauch gibt man deshalb als **Normvolumen** V_N an, also als die Luftmenge, die bei Umgebungsdruck dasselbe Volumen einnehmen würde: **V_N = V · (p_ü + p_amb) / p_amb**, mit dem Betriebsvolumen V (Zylinderraum), dem Überdruck p_ü und dem Umgebungsdruck p_amb ≈ 1 bar (absolut; genauer 1,013 bar). Die Temperatur wird dabei vereinfachend als gleichbleibend angenommen. Streng genommen bezieht sich ein Normvolumen auf einen festgelegten Normzustand (nach DIN 1343 1,013 bar und 0 °C); die Rechnung liefert hier das Volumen bei Umgebungsdruck und Umgebungstemperatur, also das angesaugte Volumen. Der Unterschied zum Normzustand bei 0 °C beträgt bei 20 °C Umgebungstemperatur rund 7 % und wird hier vernachlässigt. Der absolute Druck ist Überdruck plus Umgebungsdruck: Bei 6 bar Überdruck sind es 7 bar, 1 Liter Zylinderraum entspricht dann **7 Litern** Normvolumen.
>
> Der **Luftverbrauch je Hub** ist **A · Hub · (p_ü + 1 bar) / 1 bar** (A in cm² und Hub in cm ergeben cm³). Beim **doppeltwirkenden Zylinder** wird beim Ausfahren der Raum auf der Kolbenseite mit der Fläche A_K gefüllt, beim Einfahren der Raum auf der Stangenseite mit der kleineren **Ringfläche** A_R = A_K − A_St. Ein **Doppelhub** (Ausfahren und Einfahren) verbraucht die Summe beider Mengen. Der **Verbrauch je Minute** folgt aus dem Verbrauch je Doppelhub und der Zahl der Doppelhübe je Minute. Beim einfachwirkenden Zylinder wird nur eine Richtung mit Luft angetrieben (die Rückstellung übernimmt meist eine Feder); der Verbrauch je Doppelhub ist dann näherungsweise nur A_K · Hub · (p_ü + 1 bar) / 1 bar. Der Verbrauch hängt vom Zylindervolumen, vom eingestellten Arbeitsdruck und von der Hubzahl ab, nicht unmittelbar von der Last; die Last bestimmt aber, welcher Arbeitsdruck und welcher Zylinder nötig sind. Leitungen, Ventile und Anschlüsse haben zusätzliches Totvolumen, das der Rechnung noch hinzukommt.
>
> *Beispiel:* Ein doppeltwirkender Zylinder der Vantera hat 63 mm Kolbendurchmesser, 20 mm Kolbenstangendurchmesser und 200 mm Hub, der Überdruck beträgt 6 bar, es werden 15 Doppelhübe je Minute gefahren. Die Flächen aus „Hydraulik und Pneumatik in der Anlage“: A_K = π · 63² / 4 ≈ 3.117 mm², A_St ≈ 314 mm², A_R ≈ 2.803 mm². Der Druckfaktor ist (6 + 1) / 1 = 7. **Ausfahren:** V = 3.117 mm² · 200 mm = 623.400 mm³ ≈ 0,6234 l, Normvolumen V_N = 0,6234 l · 7 ≈ **4,364 l**. **Einfahren:** V = 2.803 mm² · 200 mm = 560.600 mm³ ≈ 0,5606 l, V_N = 0,5606 l · 7 ≈ **3,924 l**. (Mit den ungerundeten Flächen ergeben sich 623.449 mm³ und 560.617 mm³; die gerundeten Ergebnisse bleiben dieselben.) **Doppelhub:** 4,364 l + 3,924 l = **8,288 l**, also etwa 8,29 l. **Je Minute:** 15 · 8,288 l ≈ **124,3 l/min**, das sind etwa 0,124 m³/min oder **7,46 m³/h**. Bei 4.000 Betriebsstunden im Jahr (Beispielwert) ergibt das 7,46 m³/h · 4.000 h ≈ **29.840 m³** Normvolumen, mit dem spezifischen Energiebedarf aus dem Abschnitt „Druckluftaufbereitung und Druckluftkosten“ (0,11 kWh je m³, Beispielwert) 29.840 m³ · 0,11 kWh/m³ ≈ 3.282 kWh und bei 0,25 € je kWh (Beispielwert) 3.282,4 kWh · 0,25 €/kWh = 820,60 €, also rund **821 €** im Jahr für diesen einen Zylinder. Mit 5 bar statt 6 bar Überdruck sinkt der Verbrauch auf 6 / 7 ≈ **85,7 %**, allerdings sinkt auch die Kraft (vgl. „Hydraulik und Pneumatik in der Anlage“). Bei vielen Zylindern und hohen Hubzahlen zählt der Luftverbrauch deshalb zu den Kosten, die bei der Auslegung berücksichtigt werden sollten (Zylinder nicht größer wählen als nötig, Hubzahl und Druck beachten).

---

## Rechenprüfung

Alle Zahlen wurden mit einem eigenen Python-Skript nachgerechnet (Rechenweg und Ergebnis stimmen mit dem Text überein; Stand nach Einarbeitung der Prüfung). Neu oder geändert gegenüber der ersten Fassung sind die mit „neu“ oder „geändert“ markierten Zeilen.

| Abschnitt | Rechenweg | Ergebnis |
|---|---|---|
| 1 | n_s = 60 · 50 / 2 | 1.500 min⁻¹ |
| 1 | s = (1.500 − 1.440) / 1.500 | 0,04 = 4 % |
| 1 | Schlupfdrehzahl 1.500 − 1.440 (neu) | 60 min⁻¹ |
| 1 | n_s bei 40 Hz = 60 · 40 / 2 | 1.200 min⁻¹ |
| 1 | n = 1.200 − 60 bei gleicher Schlupfdrehzahl (geändert; vorher 1.200 · 0,96 = 1.152) | 1.140 min⁻¹ |
| 1 | Schlupf bei 40 Hz = 60 / 1.200 (neu) | 0,05 = 5 % |
| 1 | Kontrolle Schlupffrequenz f − p · n / 60: 50 − 2 · 1.440 / 60; 40 − 2 · 1.140 / 60 (neu) | 2 Hz; 2 Hz (gleich, passt zu gleichem Moment) |
| 1 | U = 400 V · 40 / 50 | 320 V |
| 1 | Schrittwinkel Vollschritt = 360° / 200 | 1,8° |
| 1 | Schrittwinkel Mikroschritt = 360° / (200 · 16) = 360° / 3.200 | 0,1125° |
| 1 | Weg je Mikroschritt = 5 mm / 3.200 | 0,0015625 mm ≈ 1,56 µm |
| 1 | Umdrehungen = 120 mm / 5 mm | 24 |
| 1 | Impulse = 24 · 3.200 | 76.800 |
| 1 | 16.000 Hz / 3.200 = 5 U/s; v = 5 · 5 mm; t = 120 / 25 | 25 mm/s; 4,8 s (Kontrolle 76.800 / 16.000 = 4,8 s) |
| 1 | Auflösung Servo = 5 mm / 16.384 | 0,000305 mm ≈ 0,31 µm |
| 1 | v = (3.000 / 60) · 5 mm; t = 120 / 250 | 250 mm/s; 0,48 s |
| 2 | Parallel 24 · 15 m | 360 m |
| 2 | Bus 24 · 3 m + 40 m | 112 m |
| 2 | Ersparnis 360 − 112; 248 / 360 | 248 m; 68,9 % |
| 2 | Bitzahl 64 · 8 | 512 Bit |
| 2 | t = 512 / 100.000.000; 512 / 12.000.000; 512 / 1.000.000 | 5,12 µs; 42,7 µs; 512 µs |
| 2 | Abfrage 20 Slaves: 20 · 2 · 512 = 20.480 Bit; bei 1 Mbit/s; bei 12 Mbit/s | 20,48 ms; 1,71 ms (1,7067 ms) |
| 3 | A_R = 50 − 10 | 40 cm² |
| 3 | v_aus = 30.000 cm³/min / 50 cm² = 600 cm/min | 10 cm/s = 0,1 m/s |
| 3 | v_ein = 30.000 / 40 = 750 cm/min | 12,5 cm/s = 0,125 m/s |
| 3 | Flächenverhältnis 50 / 40 (= 12,5 / 10) | 1,25 |
| 3 | Zeiten bei 400 mm Hub: 0,4 / 0,1; 0,4 / 0,125 | 4,0 s; 3,2 s |
| 3 | F_aus = 10 N/mm² · 5.000 mm²; F_ein = 10 · 4.000 | 50 kN; 40 kN |
| 3 | Eilgang v = 30.000 / 10 = 3.000 cm/min | 50 cm/s = 0,5 m/s (Faktor 5) |
| 3 | Eilgang Volumenstrom Kolbenseite: 30 + 40 cm² · 50 cm/s · 60 / 1.000 = 30 + 120 (Kontrolle 50 cm² · 50 cm/s · 60 / 1.000 = 150) | 150 l/min |
| 3 | Eilgang F = 10 N/mm² · 1.000 mm² | 10 kN |
| 4 | 500.000 m³ · 0,11 kWh/m³ | 55.000 kWh |
| 4 | 55.000 kWh · 0,25 €/kWh | 13.750 € |
| 4 | Leckage 0,10 · 500.000 | 50.000 m³ |
| 4 | 50.000 · 0,11 = 5.500 kWh; 5.500 · 0,25 | 1.375 € |
| 4 | Nutzluft 500.000 − 50.000; 450.000 · 0,11 · 0,25 | 450.000 m³; 12.375 € |
| 4 | Halbierte Leckage 25.000 m³ · 0,11 · 0,25 | 687,50 € |
| 5 | Druckfaktor (6 + 1) / 1 | 7 |
| 5 | A_K = π · 63² / 4; A_St = π · 20² / 4; A_R = A_K − A_St | 3.117,2 mm²; 314,2 mm²; 2.803,1 mm² (im Text gerundet 3.117; 314; 2.803) |
| 5 | Ausfahren mit gerundeter Fläche: 3.117 · 200 = 623.400 mm³ = 0,6234 l; · 7 (geändert; vorher 623.450) | 4,3638 l ≈ 4,364 l |
| 5 | Ausfahren ungerundet: 3.117,245 · 200 (neu) | 623.449 mm³; · 7 = 4,3641 l ≈ 4,364 l |
| 5 | Einfahren mit gerundeter Fläche: 2.803 · 200 = 560.600 mm³ = 0,5606 l; · 7 (geändert; vorher 560.618) | 3,9242 l ≈ 3,924 l |
| 5 | Einfahren ungerundet: 2.803,086 · 200 (neu) | 560.617 mm³; · 7 = 3,9243 l ≈ 3,924 l |
| 5 | Doppelhub 4,364 + 3,924 (ungerundet 8,2885) | 8,288 l |
| 5 | Je Minute 15 · 8,288; Umrechnung · 60 / 1.000 | 124,3 l/min; 7,46 m³/h |
| 5 | Jahr 7,46 · 4.000 (ungerundet 29.836,8 m³) | 29.840 m³ |
| 5 | 29.840 · 0,11 (geändert, Rechenweg im Text ergänzt) | 3.282,4 kWh ≈ 3.282 kWh |
| 5 | 3.282,4 · 0,25 (geändert; vorher fälschlich „≈ 820 €“) | 820,60 € ≈ 821 € (ungerundet gerechnet 820,51 €, ebenfalls 821 €) |
| 5 | Druckverhältnis 5 bar zu 6 bar Überdruck: 6 / 7 | 85,7 % |
| 5 | Temperaturunterschied Normzustand 0 °C zu 20 °C: 293,15 / 273,15 (neu) | 1,073, also rund 7 % |

## Zu entscheiden

1. **Umfang:** Fünf Abschnitte, wie gewünscht. Die Abschnitte 1 und 3 sind länger als die üblichen Abschnitte der Pakete, weil sie Tabellen und mehrere Teilrechnungen enthalten; sie lassen sich bei der Einarbeitung in je zwei Abschnitte teilen (Asynchronmotor und Servo/Schrittmotor; Schaltzeichen/Mittelstellungen und Funktion/Rechnung). Ich habe sie bewusst zusammengelassen, damit die Zahlenbeispiele beieinanderstehen.
2. **Beispielwerte in Abschnitt 4:** Der spezifische Energiebedarf von 0,11 kWh je m³ Druckluft (bezogen auf die gesamte Anlage und den Ansaugzustand; Spanne 0,10 bis 0,13 kWh je m³ bei 6 bar), die Faustregel von 6 bis 8 % Einsparung je bar Netzdruck, der Strompreis von 0,25 € je kWh (wie in 5.3), die Leckage von 20 % bis 30 % in schlecht gewarteten Netzen und die 4.000 Betriebsstunden (Abschnitt 5) sind Richtwerte aus Fachwissen. Sie müssen vor der Verwendung fachlich geprüft werden.
3. **Leckage 10 %:** Ich habe „10 % des Verbrauchs“ als 10 % der erzeugten Luftmenge ausgelegt (50.000 von 500.000 m³). Wäre gemeint, dass die Leckage 10 % des Nutzverbrauchs beträgt, würden sich die Zahlen ändern (dann 500.000 m³ Nutzluft plus 50.000 m³ Leckage). Welche Lesart soll gelten?
4. **Taupunkt- und Trocknerwerte (Abschnitt 4):** Kältetrockner etwa +3 °C, Adsorptionstrockner −40 °C und tiefer; die Qualitätsklassen nach ISO 8573-1 sind nur erwähnt, nicht im Einzelnen aufgeführt. Die Zahlen sind Lehrbuchrichtwerte, die Zuordnung der Klassen zu Anwendungen habe ich weggelassen.
5. **Schlupf und Frequenzumrichter (Abschnitt 1):** 4 % Schlupf ist ein Beispielwert. Bei geändertem n_s bleibt im Text näherungsweise die Schlupfdrehzahl (60 min⁻¹) gleich, nicht der prozentuale Schlupf (Ergebnis 1.140 min⁻¹, 5 %); das ist eine Näherung für gleiches Lastmoment, die Spannungsanhebung bei sehr kleinen Frequenzen bleibt außer Betracht. Die U/f-Kennlinie ist als Grundprinzip beschrieben, der Feldschwächbereich nur mit einem Satz erwähnt; die Vektorregelung fehlt bewusst.
6. **Mikroschritt (Abschnitt 1):** Die Aussage, dass die Genauigkeit der Zwischenstellungen geringer ist als die rechnerische Auflösung, halte ich für gesichert, würde sie aber in der Zweitlesung prüfen lassen.
7. **Bussysteme (Abschnitt 2):** Ich habe je System nur eine allgemein anerkannte Kernaussage aufgenommen. Zu prüfen bleiben „PROFIBUS bis 12 Mbit/s bei kurzen Leitungen“ (Leitungslängen nicht genannt), die Einordnung von IO-Link als Punkt-zu-Punkt-Verbindung, die Norm-Nummer IEC 62541 für OPC UA und der Hinweis auf OPC UA FX und zeitsensitive Netzwerke (Entwicklungsstand 2026). Bitraten und Leitungslängen der anderen Systeme habe ich weggelassen. Die Zahl der Ebenen der Automatisierungspyramide wird in der Literatur unterschiedlich angegeben (vier oder fünf); der Text nennt vier und weist auf die Spannweite hin. Das Telegramm von 64 Byte ist ein Beispielwert, kein Normwert.
8. **Hydraulikschaltpläne (Abschnitt 3):** Die Beschreibung der Schaltzeichen in Worten und die Bezeichnungen der Mittelstellungen (Sperr-, Umlauf-, Schwimmstellung) entsprechen dem Lehrbuchstand, sollten aber gegen DIN ISO 1219 geprüft werden. Die Ziffernkennzeichnung der Bauteile (zuvor 0.1, 1.0, 1.1, 1.2) ist gestrichen, weil das Kennzeichnungssystem nicht sicher gesichert ist (traditionelles Ziffernsystem gegenüber Buchstaben-Ziffern-Kennzeichnung der neueren Normfassung); der Text beschreibt die Bauteile nur in Worten. Die Eilgangschaltung (Differentialschaltung) ist vereinfacht beschrieben (Zusatzventil genannt, Druckverluste fehlen).
9. **Normvolumen (Abschnitt 5):** Der Text rechnet mit p_amb ≈ 1 bar absolut und vernachlässigt die Temperatur, wie im Auftrag vorgegeben. Er weist nun darauf hin, dass das Ergebnis streng genommen das angesaugte Volumen bei Umgebungszustand ist und sich ein Normvolumen auf einen Normzustand bezieht (DIN 1343: 1,013 bar und 0 °C; Unterschied bei 20 °C rund 7 %). In der Pneumatik werden je nach Norm weitere Bezugszustände verwendet; sie sind nicht genannt. Einverstanden?
10. **Reibung und Wirkungsgrad:** Alle Kraftrechnungen in den Abschnitten 1 und 3 gelten ohne Reibung und ohne Druckverluste, in Abschnitt 3 zusätzlich ohne Gegendruck der Drossel, wie im Text ausdrücklich steht.
11. **Rechtsnahes:** Prüfpflichten für Druckbehälter, Entsorgung von Kondensat, Arbeitsschutz bei Hydraulik und Druckluft sowie Maschinensicherheit sind ausgeklammert (Paket P8); der frühere Hinweissatz zu den Prüfpflichten im Text ist gestrichen. Einverstanden?
12. **Weiteres Vorgehen nach Ihrer Freigabe:** Abschnitte in 7.4 einarbeiten (LF, Hausregeln, Validierung, Import), dann Entwurf der Karteikarten und Quizfragen (je Abschnitt 2 bis 3 Items; Rechenaufgaben: Synchrondrehzahl, Schlupf und Schlupfdrehzahl, Schrittwinkel und Schrittzahl, Spindelverfahrweg, Telegrammdauer, Leitungsersparnis, Zylindergeschwindigkeit aus Q und Fläche, Energiekosten der Druckluft, Leckagekosten, Normvolumen je Hub und Doppelhub).

## Prüfergebnis eingearbeitet

Grundlage: `docs/entwuerfe/pruefung-tq3-automatisierung.md` (30 Befunde). Nach der Einarbeitung: 22 übernommen, 8 angepasst, 0 abgelehnt. Die Winkelschreibweise (S5) wurde gegen den Bestand geprüft: In `content/` steht der Winkelgrad ohne Leerzeichen („30°“ in Mathematik 9, „360°-Rundgänge“ im Immobilienfachwirt), die Temperatur dagegen mit Leerzeichen („80 °C“); der Entwurf folgt dem Bestand. Im Technischen Fachwirt kommt sonst keine Winkelangabe vor.

| Nr. | Entscheidung | Begründung |
|---|---|---|
| F1 | angepasst | Fachlich richtig (bei U/f konstant bleibt für gleiches Moment die Schlupffrequenz, damit die Schlupfdrehzahl, gleich; Kontrollrechnung 2 Hz). Text mit 1.140 min⁻¹ und 5 % neu gefasst, Begründung und Hinweis auf die Spannungsanhebung bei kleinen Frequenzen ergänzt; „Zu entscheiden“ Punkt 5 angepasst. |
| F2 | übernommen | 29.840 · 0,11 · 0,25 = 820,60 €, gerundet 821 €; Rechenweg im Text sichtbar gemacht, Tabelle korrigiert. |
| F3 | angepasst | Gerundete Flächen führen zu 623.400 und 560.600 mm³ (im Text); die ungerundeten Zwischenwerte 623.449 und 560.617 mm³ stehen in einer Klammer, damit beide Rechenwege nachvollziehbar sind. Zwischenwerte in Litern mit vier Stellen (0,6234 l; 0,5606 l), damit die Multiplikation mit 7 stimmt. |
| G1 | angepasst | Ziffernkennzeichnung (0.1, 1.0, 1.1, 1.2) ganz gestrichen, weil das System nicht sicher gesichert ist (traditionelles Ziffernsystem gegenüber der Buchstaben-Ziffern-Kennzeichnung neuerer Normfassung); Bauteile nur in Worten, im Text nur ein allgemeiner Satz zur Kennzeichnung. |
| G2 | übernommen | Hinweis auf vollständig geöffnete Drossel und überschüssigen Pumpenstrom über das Druckbegrenzungsventil; Kraftsatz um „ohne Gegendruck auf der Gegenseite“ ergänzt. |
| G3 | angepasst | Satz zum Normzustand ergänzt (DIN 1343: 1,013 bar, 0 °C; rund 7 %, gerechnet 293,15 / 273,15 = 1,073); statt „Normzustand = Rechenergebnis“ klargestellt, dass die Rechnung das angesaugte Volumen liefert. In Abschnitt 4 Bezug „Ansaugzustand“ ergänzt. |
| G4 | übernommen | PROFIBUS DP, RS-485, Senderecht zwischen mehreren Mastern, Bitrate nur bei kurzen Leitungen. |
| G5 | übernommen | CAN: kein fester Master, Arbitrierung nach Priorität erklärt. |
| G6 | übernommen | „bisher vor allem“, Erweiterungen OPC UA FX und zeitsensitive Netzwerke genannt; die Aussage zur Feldebene ebenfalls abgeschwächt („bisher vor allem“). |
| G7 | übernommen | Hinweis auf nicht berücksichtigte Versorgungsleitung ergänzt. |
| G8 | angepasst | Vier-Ebenen-Darstellung beibehalten, Hinweis auf die Fünf-Ebenen-Darstellung (Prozessleitebene mit SCADA, Betriebsleitebene mit MES) ergänzt; „Schnelligkeit und Zuverlässigkeit“ durch „Echtzeit, also kurze, vorhersagbare Reaktionszeiten“ ersetzt. |
| G9 | übernommen | „ebenfalls ohne Rampen“ und Hinweis auf nicht vergleichbare Drehzahlen ergänzt. |
| G10 | übernommen | Zeile in „Drehmoment bis zur Nenndrehzahl“ umbenannt; Feldschwächbereich im Fließtext kurz erwähnt. |
| G11 | übernommen | Formulierung ohne „von Hand“; Pumpenstrom über das Druckbegrenzungsventil ergänzt. |
| G12 | übernommen | „eingestellter Arbeitsdruck“, „nicht unmittelbar von der Last“ und Rolle der Last bei der Auslegung. |
| G13 | übernommen | Hinweis auf das nötige Zusatzventil, das im beschriebenen Schaltplan nicht enthalten ist. |
| G14 | übernommen | Hinweis auf das vereinfachte Modell und das Summentelegramm bei EtherCAT ergänzt; Aufzählung der nicht berücksichtigten Größen beibehalten. |
| G15 | übernommen | Reihenfolge Vorfilter, Trockner, Nachfilter. |
| G16 | übernommen | „im Motorbetrieb“ statt „immer“. |
| L1 | angepasst | Definition des spezifischen Energiebedarfs, Bezug auf Ansaugzustand und Netzdruck ergänzt; Spanne 0,10 bis 0,13 kWh je m³ und Faustregel 6 bis 8 % je bar als Richtwerte gekennzeichnet (in „Zu entscheiden“ Punkt 2 zur Prüfung vorgemerkt). |
| L2 | angepasst | P = 2π · n · M mit Einheiten und Hinweis auf Getriebe sowie 5.1 und 5.3 aufgenommen; kein neues Zahlenbeispiel, damit keine weiteren ungeprüften Zahlen entstehen. |
| L3 | übernommen | Federrückstellung und Rechenvorschrift ergänzt; „näherungsweise“ ergänzt, weil der Kolbenraum nicht exakt den vollen Netzdruck erreichen muss. |
| L4 | übernommen | Anbindung des IO-Link-Masters an Feldbus oder Industrial Ethernet ergänzt. |
| L5 | übernommen | Gegenüberstellung mit der Zulaufdrosselung ergänzt. |
| S1 | übernommen | Satz zu Prüfpflichten für Druckbehälter gestrichen (Vorgabe der Projektleitung). |
| S2 | übernommen | „Verdichter (auch Kompressor genannt)“, passend zum Bestand. |
| S3 | angepasst | SCADA und MES nur kurz erklärt (SCADA mit englischer Langform und deutscher Erklärung), ERP aufgelöst; die vorgeschlagene Klammer zu MES leicht umformuliert. |
| S4 | übernommen | „Stator“ und „Läufer, auch Rotor genannt“ eingeführt. |
| S5 | übernommen | Empfehlung des Berichts (Winkelgrad ohne Leerzeichen beibehalten); entspricht dem Bestand (siehe oben). Ergänzung der Hausregel steht unter „Bestandsänderungen“. |
| S6 | übernommen | Frage-Antwort-Prinzip, Master-Slave bei Modbus RTU und Client-Server bei Modbus TCP getrennt benannt. |

## Bestandsänderungen für die Projektleitung

Keiner der 30 Befunde verlangt eine Änderung unter `content/technischer-fachwirt/`; die Zahlen und Begriffe der vorhandenen Abschnitte (30 l/min, 63/20-mm-Zylinder, 3.117/314/2.803 mm², 6 bar, Strompreis 0,25 €/kWh, DIN ISO 1219) werden unverändert übernommen. Zwei Vorschläge ergeben sich aus der Einarbeitung, beide optional:

1. **`content/README.md`, Abschnitt „Schreibweise (Hausregeln)“, Stichpunkt „Zahlen“** (zu S5). Zitat: „Leerzeichen vor „€“, „%“ und Einheiten („6 %“, „25 kg“)“. Vorschlag: ergänzen um „; der Winkelgrad steht ohne Leerzeichen („30°“, „1,8°“), die Temperatur mit Leerzeichen („80 °C“)“. Begründung: Der Bestand schreibt so (`content/mathematik-9/geometrie/geo2-trigonometrie.md`: „30°“; `content/technischer-fachwirt/tq1/5.1-physikalische-chemische-grundlagen.md`: „80 °C“); die Hausregel nennt den Winkelgrad bisher nicht.
2. **`content/technischer-fachwirt/tq1/5.3-elektrotechnische-grundlagen.md`, Quizfrage zu Schutzmaßnahmen (Erklärung)** (eigene Beobachtung, kein Befund des Berichts). Zitat: „der Frequenzumrichter dient der Drehzahlregelung eines Motors, nicht dem Personenschutz.“ Vorschlag: „der Frequenzumrichter dient der Drehzahlstellung eines Motors, nicht dem Personenschutz.“ Begründung: Der neue Abschnitt 1 unterscheidet Steuerung (Umrichter ohne Geber) und Regelung; der Bestand spricht hier von „Drehzahlregelung“. Die Karteikarte K-5.3-14 („um die Drehzahl eines Antriebs stufenlos anzupassen“) und der Lückentext sind unverändert richtig.
