# Fachliche Prüfung: Entwurf TQ3 7.4 — Antriebe, Bussysteme, Fluidtechnik

Geprüft: `docs/entwuerfe/tf-ergaenzungen-tq3-automatisierung.md` (fünf Theorieabschnitte) · Prüfung vom 12.10.2026 · unabhängige Zweitprüfung (Automatisierungs-, Antriebs- und Fluidtechnik). Entwurf und `content/` wurden nicht verändert.

Abgeglichen wurde mit `content/technischer-fachwirt/tq3/7.4-automatisierungstechnik.md` (insbesondere „Steuern und Regeln“, „SPS-Programmiersprachen und Verknüpfungslogik“, „Hydraulik und Pneumatik in der Anlage“, „Industrie 4.0 und vernetzte Produktion“), `tq1/5.1` (Druck, Hydraulik, Pneumatik), `tq1/5.3` (Drehstrom, Antriebe, Frequenzumrichter, Strompreis 0,25 €/kWh), `tq2/6.1` (Schaltpläne, DIN ISO 1219) und `content/README.md` Abschnitt „Schreibweise“. Zusätzlich wurde stichprobenartig geprüft, ob die Aussagen zu Modbus/OPC UA im Kurs Fachinformatiker:in Digitale Vernetzung (dv1, dv4) widersprechen: kein Widerspruch.

Alle Zahlen und Rechenbeispiele wurden mit einem eigenen Python-Skript (Scratchpad, nicht im Repo) neu gerechnet.

## Kurzfazit

- **30 Befunde:** 3 Fehler, 16 ungenau, 5 fehlt, 6 Stil.
- Die Rechnungen stimmen im Kern. Es gibt keine falsche Formel und kein falsches Rechenergebnis, aber zwei Rundungs- bzw. Darstellungsfehler (Abschnitt 5) und eine physikalisch ungünstige Vereinfachung beim Schlupf (Abschnitt 1).
- Inhaltlich am wichtigsten: Schlupf bei Umrichterbetrieb (F1), Bauteilkennzeichnung „1.2“ für das Drosselrückschlagventil (G1), Kräfte/Geschwindigkeiten im Schaltplanbeispiel ohne Gegendruck der Ablaufdrosselung (G2), Normvolumen ohne Temperatur-/Normzustandshinweis (G3), Vereinfachungen bei PROFIBUS, CAN und OPC UA (G4 bis G6), nicht erklärter „spezifischer Energiebedarf“ (L1), Satz zu Prüfpflichten für Druckbehälter (S1).
- Hausregeln (Anrede, Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten, Gendern) sind eingehalten; Rechtsnahes steht nicht im Text, bis auf den unnötigen Satz zu Prüfpflichten (S1).
- Widersprüche zu den vorhandenen Texten: keine sachlichen. Zahlen aus „Hydraulik und Pneumatik in der Anlage“ (30 l/min, 63/20-mm-Zylinder, 3.117/314/2.803 mm², 6 bar), 5.3 (Frequenzumrichter, 0,25 €/kWh) und 6.1 (DIN ISO 1219) werden korrekt übernommen. Einzig der Begriff „Verdichter“ weicht von „Kompressor“ im Bestand und in 6.1 ab (S2).

---

## A. Fehler

### F1 — Abschnitt 1: Schlupf bei Frequenzumrichterbetrieb „gleich“ angenommen

**Zitat:** „Bei gleichem Schlupf (vereinfachende Annahme) dreht der Motor mit 1.200 · (1 − 0,04) = **1.152 min⁻¹**.“

**Art:** Fehler (leicht; im Text als Annahme gekennzeichnet, die Annahme selbst ist aber physikalisch die falsche).

**Begründung:** Bei U/f-konstantem Betrieb bleibt der magnetische Fluss konstant. Das Drehmoment hängt dann von der Schlupffrequenz f_s = f − p · n / 60 ab (also von der absoluten Differenz n_s − n), nicht vom prozentualen Schlupf. Bei gleichem Lastmoment bleibt deshalb die **Schlupfdrehzahl** n_s − n etwa gleich, hier 1.500 − 1.440 = 60 min⁻¹. Bei 40 Hz ergibt das n = 1.200 − 60 = **1.140 min⁻¹** (prozentualer Schlupf dann 60 / 1.200 = 5 %). Der Text lehrt mit 1.152 min⁻¹ das Gegenteil des tatsächlichen Verhaltens. Die Vereinfachung ist zwar kleinzahlig (12 min⁻¹ Unterschied), prägt aber eine falsche Vorstellung („Schlupf in Prozent bleibt konstant“). Sicherheit: hoch (etwa 90 %). Die Anhebung der Spannung bei sehr kleinen Frequenzen (Boost) bleibt außer Betracht.

**Korrekturvorschlag:** „Bei der U/f-Steuerung bleibt bei gleichem Lastmoment näherungsweise die **Schlupfdrehzahl** (n_s − n) gleich, nicht der prozentuale Schlupf: Hier sind das 1.500 − 1.440 = 60 min⁻¹. Bei 40 Hz dreht der Motor deshalb mit 1.200 − 60 = **1.140 min⁻¹** (Schlupf dann 60 / 1.200 = 5 %).“ Punkt 5 unter „Zu entscheiden“ im Entwurf entsprechend anpassen.

### F2 — Abschnitt 5: Rundung „rund 820 €“

**Zitat:** „etwa 3.282 kWh und bei 0,25 € je kWh (Beispielwert) rund **820 €** im Jahr für diesen einen Zylinder“

**Art:** Fehler (Rundung).

**Begründung:** 29.840 m³ · 0,11 kWh/m³ = 3.282,4 kWh; 3.282,4 kWh · 0,25 €/kWh = **820,60 €**. Mit ungerundetem Verbrauch (29.838 m³) ergibt sich 820,56 €. Beides rundet auf **821 €**, nicht auf 820 €. Die Rechenprüfungstabelle des Entwurfs führt „820,60 € ≈ 820 €“, das ist ebenfalls falsch gerundet. Sicherheit: sicher.

**Korrekturvorschlag:** „… etwa 3.282 kWh und bei 0,25 € je kWh (Beispielwert) rund **821 €** im Jahr für diesen einen Zylinder.“ (Alternativ „etwa 820 €“, dann aber ohne „rund“ in Fettdruck als Ergebnis.)

### F3 — Abschnitt 5: sichtbarer Rechenweg stimmt nicht mit den angezeigten Faktoren überein

**Zitat:** „V = 3.117 mm² · 200 mm = 623.450 mm³ ≈ 0,623 l“ und „V = 2.803 mm² · 200 mm = 560.618 mm³ ≈ 0,561 l“

**Art:** Fehler (Darstellung/Rundung; Lernende rechnen nach).

**Begründung:** 3.117 · 200 = **623.400**, nicht 623.450; 2.803 · 200 = **560.600**, nicht 560.618. Die Zahlen 623.450 und 560.618 stammen aus den ungerundeten Flächen (3.117,245 und 2.803,086 mm²), die im Text nicht stehen. Wer mit den angezeigten Werten nachrechnet, erhält andere Zahlen. Das Endergebnis bleibt gleich: mit den gerundeten Flächen ergibt sich 0,6234 l · 7 = 4,3638 l ≈ 4,364 l und 0,5606 l · 7 = 3,9242 l ≈ 3,924 l, Summe 8,288 l (geprüft). Sicherheit: sicher.

**Korrekturvorschlag:** „**Ausfahren:** V = 3.117 mm² · 200 mm = 623.400 mm³ ≈ 0,623 l, Normvolumen V_N = 0,6234 l · 7 ≈ **4,364 l**. **Einfahren:** V = 2.803 mm² · 200 mm = 560.600 mm³ ≈ 0,561 l, V_N = 0,5606 l · 7 ≈ **3,924 l**.“ (Die Doppelhub-Summe 8,288 l und alle Folgewerte bleiben unverändert.)

---

## B. Ungenau

### G1 — Abschnitt 3: Kennzeichnung „1.2“ für das Drosselrückschlagventil

**Zitat:** „Anschluss B über ein Drosselrückschlagventil (1.2) zur Stangenseite.“ sowie „Üblich ist eine Ziffernfolge nach Steuerkette und Bauteil (zum Beispiel 0 für die Energieversorgung mit 0.1 Pumpe, 1.0 für das Arbeitselement und 1.1 für das zugehörige Stellglied).“

**Art:** ungenau (Kennzeichnungssystem).

**Begründung:** Im verbreiteten Ziffernsystem der Fluidtechnik (Lehrbuch- und Herstellerpraxis zu DIN ISO 1219-2) bezeichnet die Ziffer vor dem Punkt die Steuerkette (0 = Energieversorgung), nach dem Punkt steht 0 für das Arbeitselement, 1 für das Stellglied, 2, 4, … bzw. 3, 5, … für Signalglieder, die die Aus- bzw. Einfahrbewegung beeinflussen, und **01, 02, …** für Bauteile zwischen Stellglied und Arbeitselement, etwa Drossel- und Drosselrückschlagventile. Ein Drosselrückschlagventil in der Arbeitsleitung wäre danach 1.01, nicht 1.2. Ob die aktuelle Fassung der Norm (DIN ISO 1219-2) dieses Ziffernsystem unverändert vorgibt, kann ich nicht sicher sagen; der Entwurf weist selbst auf Unsicherheit hin (Punkt 8 unter „Zu entscheiden“). Sicherheit: mittel (etwa 70 %); die Norm sollte vor Einarbeitung eingesehen werden.

**Korrekturvorschlag:** Entweder die Bezeichnung ersetzen: „… über ein Drosselrückschlagventil (1.01) …“ und im Satz zur Kennzeichnung ergänzen: „… und 1.1 für das zugehörige Stellglied; Bauteile zwischen Stellglied und Arbeitselement, etwa Drosselrückschlagventile, erhalten die Nummern 1.01, 1.02 und so weiter.“ Oder, wenn die Norm nicht eingesehen wird, die Nummern aus dem Fließtext entfernen und nur schreiben: „Jedes Bauteil erhält im Schaltplan eine **Kennzeichnung** (zum Beispiel Pumpe, Wegeventil, Zylinder), die in der Stückliste und an der Anlage wiederkehrt.“ Die Textstellen „(1.2)“ im Funktionsablauf (dreimal: Anschluss B, „über die Drossel (1.2)“) mit ändern.

### G2 — Abschnitt 3: Kräfte und Geschwindigkeiten ohne Gegendruck der Ablaufdrosselung

**Zitat:** „Ausfahren: v = Q / A_K = 30.000 cm³/min / 50 cm² = 600 cm/min = **10 cm/s = 0,1 m/s**.“ und „… ergibt das Ausfahren F = 10 N/mm² · 5.000 mm² = **50 kN**, das Einfahren 10 N/mm² · 4.000 mm² = **40 kN** (ohne Reibung).“

**Art:** ungenau (Widerspruch zwischen Schaltplanbeschreibung und Beispiel).

**Begründung:** Der beschriebene Schaltplan hat beim Ausfahren eine Ablaufdrosselung; die Drossel „stellt die Ausfahrgeschwindigkeit ein“. Dann ist v = Q / A_K nur der Höchstwert bei vollständig geöffneter Drossel; bei eingestellter Drossel ist v kleiner, und der überschüssige Pumpenstrom fließt über das Druckbegrenzungsventil ab. Außerdem baut die Drossel auf der Stangenseite einen Gegendruck auf, der die Ausfahrkraft mindert (F = p_K · A_K − p_St · A_R). „Ohne Reibung“ allein deckt das nicht ab. Sicherheit: hoch.

**Korrekturvorschlag:** Vor „Ausfahren“ einfügen: „Die folgenden Werte gelten für vollständig geöffnete Drossel; eine eingestellte Drossel verringert die Ausfahrgeschwindigkeit, der überschüssige Pumpenstrom fließt dann über das Druckbegrenzungsventil ab.“ Und am Ende des Kraftsatzes: „(ohne Reibung und ohne Gegendruck auf der Gegenseite)“.

### G3 — Abschnitt 5: „Normvolumen“ ohne Temperatur und Normzustand

**Zitat:** „Den Verbrauch gibt man deshalb als **Normvolumen** V_N an, also als die Luftmenge, die bei Umgebungsdruck dasselbe Volumen einnehmen würde: **V_N = V · (p_ü + p_amb) / p_amb**“

**Art:** ungenau (Begriff).

**Begründung:** Das Normvolumen ist nach DIN 1343 auf 1,01325 bar **und 0 °C** bezogen. Die Formel liefert dagegen das Volumen bei Umgebungsdruck und gleichbleibender (Umgebungs-)Temperatur, also das Ansaugvolumen. Der Unterschied beträgt bei 20 °C etwa 7 % (293,15 / 273,15 ≈ 1,073). Der Hinweis „Temperatur vereinfachend gleichbleibend“ steht im Text, der Begriff „Normvolumen“ bleibt aber missverständlich, ebenso die Einheit „m³ Normvolumen“ in Abschnitt 4 (kWh je m³ bezieht sich in der Praxis auf das Ansaugvolumen). Zu Punkt 9 unter „Zu entscheiden“: Einverstanden mit der Vereinfachung, aber mit einem Satz Klarstellung. Sicherheit: hoch.

**Korrekturvorschlag:** Nach dem Satz zur Temperatur: „Streng genommen bezieht sich das Normvolumen auf den Normzustand (1,013 bar, 0 °C); der Unterschied zum Ansaugzustand bei Raumtemperatur beträgt rund 7 % und wird hier vernachlässigt.“

### G4 — Abschnitt 2: PROFIBUS als reines Master-Slave-System und 12 Mbit/s ohne Einschränkung

**Zitat:** „Serieller Feldbus nach dem Master-Slave-Prinzip, in der Fertigungsautomatisierung weit verbreitet; Bitraten bis 12 Mbit/s“

**Art:** ungenau.

**Begründung:** PROFIBUS DP arbeitet mit einem Hybridverfahren: Mehrere aktive Master geben ein Senderecht („Token“) weiter, die Slaves antworten nur auf Anfrage. 12 Mbit/s sind der Höchstwert bei kurzen Leitungen; bei größeren Längen (bis etwa 1.200 m) sinkt die Bitrate auf 9,6 kbit/s. „Bis 12 Mbit/s“ ist richtig, aber die Leitungslängenabhängigkeit fehlt. Sicherheit: hoch.

**Korrekturvorschlag:** „Serieller Feldbus (PROFIBUS DP, Zweidrahtleitung nach RS-485) nach dem Master-Slave-Prinzip, bei mehreren Mastern geben diese das Senderecht untereinander weiter; in der Fertigungsautomatisierung weit verbreitet; Bitraten bis 12 Mbit/s bei kurzen Leitungen, bei langen Leitungen deutlich weniger“.

### G5 — Abschnitt 2: CAN „mehrere Teilnehmer dürfen senden“

**Zitat:** „Serielles Bussystem aus der Fahrzeugtechnik; mehrere Teilnehmer dürfen senden, die Nachrichtenkennung bestimmt die Priorität“

**Art:** ungenau (missverständlich).

**Begründung:** Die Formulierung kann so gelesen werden, dass mehrere Teilnehmer gleichzeitig senden. Tatsächlich darf jeder Teilnehmer senden, sobald der Bus frei ist (Multi-Master, kein fester Master). Beginnen mehrere gleichzeitig, setzt sich bitweise die Nachricht mit der höchsten Priorität (kleinste Kennung) verlustfrei durch, die anderen warten (Arbitrierung). Sicherheit: hoch.

**Korrekturvorschlag:** „Serielles Bussystem aus der Fahrzeugtechnik ohne festen Master: Jeder Teilnehmer darf senden, sobald der Bus frei ist; beginnen mehrere gleichzeitig, setzt sich die Nachricht mit der höchsten Priorität (kleinste Nachrichtenkennung) durch, die übrigen senden danach“.

### G6 — Abschnitt 2: OPC UA nur zwischen Steuerungs- und IT-Ebene

**Zitat:** „OPC UA dient vor allem dem Datenaustausch zwischen Steuerungs- und IT-Ebene.“ (davor: „Für die schnelle, vorhersagbare Kommunikation in der Feldebene sind die Feldbusse und Industrial-Ethernet-Systeme zuständig“)

**Art:** ungenau (zu absolut für 2026).

**Begründung:** Die Aussage ist für den Einsatz in der Breite zutreffend. Es gibt aber seit einigen Jahren Erweiterungen (OPC UA FX, Anbindung über TSN), die auch die Kommunikation zwischen Steuerungen und Feldgeräten abdecken sollen. Für ein Lehrbuch, das 2026 gelesen wird, wäre „vor allem“ richtig, „zuständig“ dagegen zu absolut. Sicherheit: mittel bis hoch (etwa 80 %). Die Norm IEC 62541 für OPC UA stimmt (sicher).

**Korrekturvorschlag:** „OPC UA dient bisher vor allem dem Datenaustausch zwischen Steuerungs- und IT-Ebene; Erweiterungen (zum Beispiel OPC UA FX, zeitsensitive Netzwerke) sollen es künftig auch für die Kommunikation zwischen Steuerungen und Feldgeräten nutzbar machen.“

### G7 — Abschnitt 2: Verdrahtungsbeispiel ohne Versorgungsleitung der Module

**Zitat:** „Mit Feldbus: drei dezentrale Module mit je 8 Kanälen in der Nähe der Geräte, mittlere Zuleitung 3 m je Gerät, dazu eine Busleitung von 40 m: 24 · 3 m + 40 m = **112 m**. Ersparnis 360 m − 112 m = **248 m**, das sind 248 / 360 = **68,9 %**“

**Art:** ungenau (Vereinfachung nicht benannt).

**Begründung:** Die Rechnung ist korrekt (geprüft: 360 m, 112 m, 248 m, 68,888 % ≈ 68,9 %). Dezentrale Module brauchen aber eine Spannungsversorgung (meist 24 V), die entweder eine zusätzliche Leitung oder ein Energiebus ist. Die Ersparnis fällt daher in der Praxis geringer aus. Ohne Hinweis entsteht der Eindruck eines vollständigen Vergleichs. Sicherheit: hoch.

**Korrekturvorschlag:** Anfügen: „Nicht berücksichtigt ist die Leitung für die Spannungsversorgung der Module; die Ersparnis fällt dadurch in der Praxis etwas geringer aus.“

### G8 — Abschnitt 2: Automatisierungspyramide, SCADA und MES in einer Ebene; „Zuverlässigkeit“

**Zitat:** „die **Betriebsleitebene** Visualisierung und Fertigungsleitsysteme (SCADA, MES)“ und „Nach oben nehmen die Datenmengen und die Zeitspannen zu, nach unten die Anforderungen an Schnelligkeit und Zuverlässigkeit.“

**Art:** ungenau.

**Begründung:** In der Fünf-Ebenen-Darstellung liegt SCADA/Visualisierung in der Prozessleitebene, MES in der Betriebsleitebene. Der Entwurf wählt bewusst vier Ebenen und weist darauf hin; die Vermischung der Begriffe ist damit vertretbar, sollte aber nicht als allein gültige Zuordnung stehen. Zudem sind hohe Zuverlässigkeitsanforderungen kein Merkmal der Feldebene allein (auch ein Ausfall der ERP-Ebene ist teuer); das trennende Merkmal ist die Echtzeit. Sicherheit: mittel.

**Korrekturvorschlag:** „… die **Betriebsleitebene** Visualisierung und Fertigungsleitsysteme (SCADA, MES) …“ beibehalten, aber ergänzen: „(in Darstellungen mit fünf Ebenen wird die Prozessleitebene mit SCADA von der Betriebsleitebene mit MES getrennt)“. Und: „Nach oben nehmen die Datenmengen und die betrachteten Zeiträume zu, nach unten die Anforderungen an die Echtzeit, also an kurze, vorhersagbare Reaktionszeiten.“

### G9 — Abschnitt 1: Servo-Verfahrzeit ohne Rampen, Vergleich wirkt wie Systemunterschied

**Zitat:** „Bei 3.000 min⁻¹ (= 50 Umdrehungen je Sekunde) fährt der Schlitten mit 50 · 5 mm = **250 mm/s**, die Verfahrzeit für 120 mm beträgt 120 / 250 = **0,48 s**.“

**Art:** ungenau.

**Begründung:** Beim Schrittmotor steht „ohne Beschleunigungs- und Bremsrampen“, beim Servo nicht. Außerdem werden für Schritt- und Servoantrieb unterschiedliche Drehzahlen gewählt (300 gegen 3.000 min⁻¹), sodass 4,8 s gegen 0,48 s wie ein Unterschied der Bauarten (Faktor 10) wirkt; tatsächlich ist es eine Folge der Wahl der Beispielwerte (Schrittmotoren erreichen mit anderer Ansteuerung durchaus 300 bis 1.000 min⁻¹ und mehr, mit abfallendem Moment). Rechnung selbst stimmt (geprüft). Sicherheit: hoch.

**Korrekturvorschlag:** „… die Verfahrzeit für 120 mm beträgt 120 / 250 = **0,48 s** (ebenfalls ohne Rampen). Die Zeiten beider Antriebe sind nicht unmittelbar vergleichbar, weil für das Beispiel unterschiedliche Drehzahlen angenommen wurden.“

### G10 — Abschnitt 1: Tabellenzeile „Drehmoment bei hoher Drehzahl“ für den Asynchronmotor mit Umrichter

**Zitat:** „| Drehmoment bei hoher Drehzahl | gut | gut | fällt ab |“

**Art:** ungenau.

**Begründung:** Oberhalb der Nennfrequenz kann die Spannung nicht weiter steigen; der Motor läuft im Feldschwächbereich, das Drehmoment fällt dort etwa mit 1/n. Der Entwurf lässt den Feldschwächbereich bewusst weg (Punkt 5 unter „Zu entscheiden“); die Tabelle suggeriert aber, nur der Schrittmotor verliere an Drehmoment. Bis zur Nenndrehzahl ist „gut“ richtig. Sicherheit: hoch.

**Korrekturvorschlag:** Zeile umbenennen in „Drehmoment bis zur Nenndrehzahl“ mit „gut | gut | fällt mit steigender Drehzahl ab“; alternativ in der Asynchron-Spalte „gut bis zur Nenndrehzahl“.

### G11 — Abschnitt 3: Schwimmstellung (Pumpe, „von Hand“)

**Zitat:** „| Schwimmstellung | A und B mit T verbunden, P gesperrt | Zylinder kann von außen bewegt werden (zum Beispiel von Hand beim Einrichten) |“

**Art:** ungenau, zugleich nahe an Arbeitsschutz.

**Begründung:** Technisch richtig (Y-Stellung: P gesperrt, A, B, T verbunden). Bei einer Konstantpumpe muss deren Förderstrom bei gesperrtem P ebenfalls über das Druckbegrenzungsventil abfließen (wie bei der Sperrmittelstellung), das steht nur dort. „Von Hand“ legt eine Tätigkeit am Zylinder nahe und berührt damit Arbeitsschutz (Entwurf will das ausschließen). Sicherheit: hoch.

**Korrekturvorschlag:** „Zylinder kann durch äußere Kräfte bewegt werden (zum Beispiel beim Einrichten); die Pumpe fördert bei gesperrtem Anschluss P wie bei der Sperrmittelstellung über das Druckbegrenzungsventil.“

### G12 — Abschnitt 5: „nicht von der Last“

**Zitat:** „Der Verbrauch hängt vom Zylindervolumen, vom Druck und von der Hubzahl ab, nicht von der Last.“

**Art:** ungenau.

**Begründung:** Bei erreichtem Hubende füllt sich der Zylinderraum auf den eingestellten Arbeitsdruck, unabhängig von der Last; insofern stimmt die Aussage. Die Last bestimmt aber, welchen Arbeitsdruck und welchen Zylinder man wählen muss, und damit mittelbar den Verbrauch. Der Satz sollte auf den eingestellten Arbeitsdruck verweisen, nicht auf den Netzdruck. Sicherheit: mittel.

**Korrekturvorschlag:** „Der Verbrauch hängt vom Zylindervolumen, vom eingestellten Arbeitsdruck und von der Hubzahl ab, nicht unmittelbar von der Last; die Last bestimmt aber, welcher Arbeitsdruck und welcher Zylinder nötig sind.“

### G13 — Abschnitt 3: Eilgangschaltung ohne Hinweis auf Zusatzventil

**Zitat:** „Für schnelle Bewegungen bei geringer Last gibt es die **Eilgangschaltung** (Differentialschaltung): Beim Ausfahren wird das Öl der Stangenseite nicht zum Tank, sondern zusätzlich zur Kolbenseite geleitet.“

**Art:** ungenau (Bezug zum beschriebenen Schaltplan).

**Begründung:** Die Zahlenrechnung ist korrekt (geprüft: v = 30.000 / 10 = 3.000 cm/min = 0,5 m/s; Fünffaches; Kolbenseite 50 cm² · 50 cm/s = 150 l/min = 30 + 40 cm² · 50 cm/s = 30 + 120 l/min; F = 10 kN). Mit dem im Schaltplan beschriebenen 4/3-Wegeventil allein ist die Differentialschaltung aber nicht herstellbar: Es braucht ein zusätzliches Ventil, das die Stangenseite mit der Druckleitung verbindet. Der Entwurf weist unter Punkt 8 selbst auf die Vereinfachung hin; im Lehrtext fehlt der Hinweis. Sicherheit: hoch.

**Korrekturvorschlag:** Nach dem ersten Satz: „Dafür ist ein zusätzliches Ventil nötig, das die Stangenseite mit der Druckleitung verbindet; es ist im oben beschriebenen Schaltplan nicht enthalten.“

### G14 — Abschnitt 2: Beispiel Übertragungszeit mit 64 Byte je Telegramm und Einzelabfrage

**Zitat:** „Fragt ein Master 20 Slaves nacheinander ab (je Teilnehmer eine Anfrage und eine Antwort mit je 64 Byte), sind das 20 · 2 · 512 Bit = 20.480 Bit: bei 1 Mbit/s **20,48 ms**, bei 12 Mbit/s etwa **1,71 ms**.“

**Art:** ungenau (Realitätsnähe; Rechnung stimmt).

**Begründung:** Rechenwerte geprüft (512 Bit; 5,12 µs; 42,67 µs; 512 µs; 20.480 Bit; 20,48 ms; 1,7067 ms). Als Modell richtig, aber: Zyklische Prozessdaten eines Slaves umfassen bei PROFIBUS typisch wenige Byte; ein PROFIBUS-Zeichen belegt 11 Bit (Start, 8 Daten, Parität, Stopp), 64 Byte wären dort 704 Bit. Ein Ethernet-Rahmen wird auf der Leitung durch Präambel und Rahmenabstand um 20 Byte länger (84 Byte, 6,72 µs bei 100 Mbit/s). Ethernet-basierte Systeme wie EtherCAT fragen nicht einzeln ab, sondern senden ein Summentelegramm. Der Text sagt, dass Pausen und Laufzeiten fehlen, nennt diese Punkte aber nicht. Sicherheit: hoch.

**Korrekturvorschlag:** Nach „… 1,71 ms.“ einfügen: „Das ist ein vereinfachtes Modell für eine einzelne Abfrage je Teilnehmer; Systeme wie EtherCAT übertragen die Daten aller Teilnehmer in einem einzigen Telegramm, deshalb sind ihre Zykluszeiten deutlich kürzer.“

### G15 — Abschnitt 4: Reihenfolge der Aufbereitung

**Zitat:** „Deshalb wird die Luft **aufbereitet**: Nachkühler und Wasserabscheider mit **Kondensatableiter**, dann **Trockner** und Filter, bei Bedarf bis zur Feinstfiltration.“

**Art:** ungenau (gering).

**Begründung:** Üblich sind ein Vorfilter vor dem Trockner (Kältetrockner und Adsorptionstrockner brauchen ölfreie, partikelarme Luft) und ein Nachfilter danach (Adsorptionstrockner geben Abrieb des Trockenmittels ab). „Dann Trockner und Filter“ lässt die Reihenfolge offen. Auch der Druckbehälter steht im Entwurf vor der Aufbereitung („scheidet einen Teil des Kondensats ab“), das ist mit der üblichen Anordnung nach Nachkühler verträglich. Sicherheit: mittel bis hoch.

**Korrekturvorschlag:** „… dann ein **Vorfilter**, der **Trockner** und ein **Nachfilter**, bei Bedarf bis zur Feinstfiltration.“

### G16 — Abschnitt 1: „im Betrieb immer langsamer“

**Zitat:** „Der Läufer dreht sich im Betrieb immer etwas **langsamer** als das Drehfeld“

**Art:** ungenau (gering).

**Begründung:** Gilt für den Motorbetrieb. Beim generatorischen Betrieb (Bremsen mit Rückspeisung, Umrichter) dreht der Läufer schneller als das Drehfeld; der Schlupf wird negativ. Für die Zielgruppe nicht prüfungsrelevant, aber das Wort „immer“ ist sachlich zu stark. Sicherheit: hoch.

**Korrekturvorschlag:** „Der Läufer dreht sich im Motorbetrieb etwas **langsamer** als das Drehfeld“

---

## C. Fehlt

### L1 — Abschnitt 4: „spezifischer Energiebedarf“ wird nicht erklärt, Bezugsdruck fehlt

**Zitat:** „Die Energiekosten lassen sich über den **spezifischen Energiebedarf** (kWh je m³ Normvolumen, siehe „Luftverbrauch von Pneumatikzylindern“) berechnen.“

**Art:** fehlt.

**Begründung:** Der Abschnitt verweist für die Erklärung auf Abschnitt 5, dort wird der Begriff aber nur verwendet, nicht definiert. Der Wert hängt vom Netzdruck ab. Bei 6 bar Überdruck liegen übliche Werte von Schraubenverdichteranlagen bei etwa 0,10 bis 0,13 kWh je m³ (Richtwert; Sicherheit mittel), 0,11 ist ein plausibler Beispielwert. Ohne Bezug entsteht auch der Eindruck, jeder Zylinder habe denselben Energiebedarf je m³. Zusätzlich fehlt die gängige Faustregel, dass jedes bar Netzdruck weniger den Energiebedarf um etwa 6 bis 8 % senkt (Richtwert; Sicherheit mittel).

**Korrekturvorschlag:** „Die Energiekosten lassen sich über den **spezifischen Energiebedarf** berechnen: die elektrische Energie, die die Druckluftanlage je erzeugtem Kubikmeter Druckluft aufnimmt (Angabe in kWh je m³, bezogen auf den Ansaugzustand, vgl. „Luftverbrauch von Pneumatikzylindern“). Er hängt von Anlage und Netzdruck ab und liegt bei 6 bar Überdruck häufig bei etwa 0,1 bis 0,13 kWh je m³ (Richtwert); als Faustregel senkt jedes bar weniger Netzdruck den Energiebedarf um etwa 6 bis 8 %.“

### L2 — Abschnitt 1: Bezug zu Leistung und Drehmoment

**Zitat:** (Ergänzung zu Abschnitt 1, Antriebsgrundlagen) — nirgends im Text kommt Drehmoment oder Motorleistung vor.

**Art:** fehlt (optional).

**Begründung:** Ein Fachwirt-Prüfling soll Antriebe auslegen helfen können. 5.1 führt M = F · r und P ein, 5.3 den Anlaufstrom. Die Verbindung P = 2π · n · M bzw. der Hinweis, dass bei gleicher Leistung die Drehzahl und das Moment gegenläufig sind (Getriebe, Umrichter), fehlt. Das ist keine Pflicht, wäre aber eine sinnvolle Verknüpfung. Sicherheit: Vorschlag, kein Fehler.

**Korrekturvorschlag:** Anfügen im Absatz zum Asynchronmotor: „Leistung, Drehzahl und Drehmoment hängen zusammen: P = 2π · n · M (n in s⁻¹, M in Nm). Bei gegebener Motorleistung bedeutet eine niedrigere Drehzahl ein höheres Drehmoment (vgl. 5.1). Beim Einschalten nimmt der Motor einen erhöhten Anlaufstrom auf (vgl. 5.3).“

### L3 — Abschnitt 5: einfachwirkender Zylinder nur verbal

**Zitat:** „Beim einfachwirkenden Zylinder wird nur eine Richtung mit Luft angetrieben.“

**Art:** fehlt (gering).

**Begründung:** Für den einfachwirkenden Zylinder ist die Rechenvorschrift ein Einzeiler (Verbrauch je Doppelhub = A_K · Hub · Druckfaktor, die Rückstellung erfolgt durch Feder und Entlüftung); ohne ihn bleibt die Aussage unvollständig. Sicherheit: hoch.

**Korrekturvorschlag:** „Beim einfachwirkenden Zylinder wird nur eine Richtung mit Luft angetrieben (die Rückstellung übernimmt meist eine Feder); der Verbrauch je Doppelhub ist dann nur A_K · Hub · (p_ü + 1 bar) / 1 bar.“

### L4 — Abschnitt 2: IO-Link-Anbindung nach oben

**Zitat:** „Punkt-zu-Punkt-Verbindung zwischen einem IO-Link-Master und einzelnen Sensoren oder Aktoren, auch für Parametrierung und Diagnose; kein Bus im engeren Sinn“

**Art:** fehlt (gering).

**Begründung:** Inhaltlich richtig (IO-Link nach IEC 61131-9, Punkt-zu-Punkt). Es fehlt der Hinweis, dass der IO-Link-Master selbst über einen Feldbus oder Industrial Ethernet (zum Beispiel PROFINET) mit der Steuerung verbunden ist, sonst bleibt unklar, wie IO-Link in die Pyramide passt. Sicherheit: hoch.

**Korrekturvorschlag:** Anfügen: „; der IO-Link-Master wird seinerseits über einen Feldbus oder Industrial Ethernet an die Steuerung angebunden“.

### L5 — Abschnitt 3: Warum Ablaufdrosselung

**Zitat:** „Die Drossel stellt die Ausfahrgeschwindigkeit ein; sie hält den Kolben auch bei ziehender Last unter Spannung (Ablaufdrosselung).“

**Art:** fehlt (gering, didaktisch).

**Begründung:** Aussage ist richtig. Ohne Gegenüberstellung mit der Zulaufdrosselung (Drossel in der Zuleitung zur Kolbenseite), bei der eine ziehende Last den Kolben davonlaufen lässt, bleibt der Vorteil abstrakt. Sicherheit: hoch.

**Korrekturvorschlag:** Anfügen: „Bei einer Zulaufdrosselung würde eine ziehende Last den Kolben dagegen vorauslaufen lassen, weil das Öl nur gedrosselt nachströmt.“

---

## D. Stil

### S1 — Abschnitt 4: Verweis auf Auslassung und Rechtsnähe

**Zitat:** „Prüfpflichten für Druckbehälter gehören nicht zu diesem Abschnitt.“

**Art:** Stil / Rechtsnähe.

**Begründung:** Ein Lehrtext erklärt, was gilt, und verweist nicht darauf, was er auslässt; der Satz ist ein Arbeitsvermerk für die Projektleitung. Er gibt keine Rechtsaussage, deutet aber Rechtsnahes an, das nach Vorgabe nicht in den Text soll. Sicherheit: hoch.

**Korrekturvorschlag:** Satz streichen.

### S2 — Abschnitt 4: „Verdichter“ statt „Kompressor“

**Zitat:** „Die Druckluft entsteht im **Verdichter**.“

**Art:** Stil / Begriffskonsistenz.

**Begründung:** Der Bestand (7.4 „Hydraulik und Pneumatik in der Anlage“, 6.1 „Kompressor mit Aufbereitung“) verwendet „Kompressor“. „Verdichter“ ist der Fachbegriff und richtig; Lernende sollten aber beide Wörter als dasselbe erkennen. Sicherheit: sicher.

**Korrekturvorschlag:** „Die Druckluft entsteht im **Verdichter** (auch Kompressor genannt).“

### S3 — Abschnitt 2: Abkürzungen nicht aufgelöst

**Zitat:** „Fertigungsleitsysteme (SCADA, MES) und die **Unternehmensebene** Planungssysteme wie ERP“

**Art:** Stil / Verständlichkeit.

**Begründung:** SCADA, MES, ERP erscheinen ohne Auflösung. ERP/PPS kommt im Bestand vor, SCADA und MES nicht; der Kurs gebraucht die Abkürzungen als bekannt. Für die Zielgruppe (Fachwirt, nicht Informatik) sollten sie einmal aufgelöst werden. Sicherheit: sicher.

**Korrekturvorschlag:** „… Visualisierung und Fertigungsleitsysteme (SCADA = Überwachen und Bedienen der Anlage, MES = Manufacturing Execution System, Fertigungsleitsystem) und die **Unternehmensebene** Planungssysteme wie ERP (Enterprise Resource Planning)“.

### S4 — Abschnitt 1: Stator, Läufer, Rotor

**Zitat:** „erzeugen die drei Wicklungen im Stator ein umlaufendes **Drehfeld**“ … „Der Läufer“ … später „fällt der Rotor aus dem Takt“

**Art:** Stil / Verständlichkeit.

**Begründung:** „Stator“ wird nicht erklärt, „Läufer“ und „Rotor“ wechseln für denselben Bauteil, ohne dass die Gleichsetzung genannt wird. Sicherheit: sicher.

**Korrekturvorschlag:** „… erzeugen die drei Wicklungen im feststehenden Teil des Motors (**Stator**) ein umlaufendes **Drehfeld**.“ und „Der drehende Teil (**Läufer**, auch Rotor genannt) dreht sich im Motorbetrieb etwas **langsamer** als das Drehfeld …“.

### S5 — Abschnitt 1: Winkelangaben ohne Leerzeichen

**Zitat:** „Schrittwinkel 360° / 200 = **1,8°**“ und „0,1125° je Schritt“

**Art:** Stil (Hausregel prüfen).

**Begründung:** Hausregel: Leerzeichen vor Einheiten; im Bestand steht „80 °C“ mit Leerzeichen. Für den Winkelgrad ist die Schreibung ohne Leerzeichen („1,8°“) nach DIN 1315 üblich; die Hausregel nennt den Fall nicht. Sicherheit: mittel, Auslegungsfrage.

**Korrekturvorschlag:** Entweder beibehalten und in der Hausregel klarstellen, oder einheitlich mit Leerzeichen („1,8 °“). Empfehlung: beibehalten (DIN-konform); Projektleitung entscheidet.

### S6 — Abschnitt 2: Modbus „Master-Slave-Prinzip (Client-Server)“

**Zitat:** „Einfaches, offenes Protokoll nach dem Master-Slave-Prinzip (Client-Server); als Modbus RTU seriell und als Modbus TCP über Ethernet“

**Art:** Stil / Verständlichkeit.

**Begründung:** Die Klammer sieht aus, als seien beide Begriffe gleichbedeutend. Bei Modbus RTU (seriell) heißt es Master-Slave, bei Modbus TCP verwendet die Spezifikation Client-Server. Inhaltlich richtig. Sicherheit: hoch.

**Korrekturvorschlag:** „Einfaches, offenes Protokoll nach dem Frage-Antwort-Prinzip (seriell als Master-Slave, bei Modbus TCP als Client-Server bezeichnet); als Modbus RTU seriell und als Modbus TCP über Ethernet“.

---

## E. Was geprüft wurde und stimmt

**Rechnungen (alle mit eigenem Skript nachgerechnet):**

| Abschnitt | Wert | Ergebnis |
|---|---|---|
| 1 | n_s = 60 · 50 / 2; s = (1.500 − 1.440) / 1.500; n_s bei 40 Hz; U bei 40 Hz | 1.500 min⁻¹; 4 %; 1.200 min⁻¹; 320 V (stimmt; siehe F1 zu 1.152) |
| 1 | Schrittwinkel 360 / 200 und 360 / 3.200; Weg je Mikroschritt 5 / 3.200 | 1,8°; 0,1125°; 1,5625 µm ≈ 1,56 µm (stimmt) |
| 1 | 120 / 5; 24 · 3.200; 16.000 / 3.200; v; t | 24; 76.800; 5 U/s = 300 min⁻¹; 25 mm/s; 4,8 s (Kontrolle 76.800 / 16.000 = 4,8 s, stimmt) |
| 1 | Servo: 5 mm / 16.384; 3.000 min⁻¹; t | 0,305 µm ≈ 0,31 µm; 250 mm/s; 0,48 s (stimmt) |
| 2 | 24 · 15; 24 · 3 + 40; Differenz; Anteil | 360 m; 112 m; 248 m; 68,89 % ≈ 68,9 % (stimmt) |
| 2 | 64 · 8; Zeiten bei 100/12/1 Mbit/s; 20 · 2 · 512 | 512 Bit; 5,12 µs; 42,67 µs; 512 µs; 20.480 Bit; 20,48 ms; 1,7067 ms (stimmt) |
| 3 | A_R; v_aus; v_ein; Verhältnis; Zeiten; Kräfte | 40 cm²; 0,1 m/s; 0,125 m/s; 1,25; 4,0 s und 3,2 s; 50 kN und 40 kN (stimmt) |
| 3 | Eilgang v; Volumenstrom Kolbenseite; F | 0,5 m/s (Faktor 5); 150 l/min = 30 + 120; 10 kN (stimmt) |
| 4 | 500.000 · 0,11; · 0,25; Leckage 10 %; Nutzluft; halbiert | 55.000 kWh; 13.750 €; 50.000 m³ = 5.500 kWh = 1.375 €; 450.000 m³ = 12.375 €; 687,50 € (stimmt) |
| 5 | A_K, A_St, A_R; V_N; Doppelhub; je Minute; je Stunde | 3.117,2 / 314,2 / 2.803,1 mm²; 4,364 l / 3,924 l; 8,288 l; 124,3 l/min; 7,46 m³/h (stimmt; Darstellung siehe F3) |
| 5 | Jahr; kWh; Kosten; 6 / 7 | 29.840 m³ (genau 29.838 m³); 3.282 kWh; 820,6 € (siehe F2); 85,7 % (stimmt) |

Plausibilität der Beispielwerte: Kolbenstange 10 cm² entspricht etwa 36 mm bei 80-mm-Kolben (üblich); 0,11 kWh/m³ und 20 bis 30 % Leckage in schlecht gewarteten Netzen sind übliche Richtwerte; ein Kältetrockner bei +3 °C Drucktaupunkt und ein Adsorptionstrockner bei −40 °C sind übliche Richtwerte; 12 Mbit/s für PROFIBUS stimmt (siehe G4); 16.384 Inkremente je Umdrehung ist ein üblicher Geberwert.

**Fachlich ohne Beanstandung:** Synchrondrehzahlformel und Polpaarzahl; Schlupfdefinition; Grundprinzip U/f-Steuerung; Servoantrieb als Regelkreis aus Strom-, Drehzahl- und Lageregelung; Inkremental- und Absolutgeber; Schrittmotor als offene Steuerung mit Schrittverlust, Haltemoment, Drehmomentabfall und Mikroschritt-Genauigkeit; Feldbus gegenüber paralleler Verdrahtung; Echtzeit als „vorhersagbar“; Linie, Stern, Ring; EtherCAT-Prinzip (Durchlauf der Telegramme); IO-Link als Punkt-zu-Punkt; AS-Interface als Zweidrahtleitung für Daten und Energie; IEC 62541 für OPC UA; Schaltzeichen von Pumpe, Hydromotor, Tank, Filter, Druckbegrenzungsventil, Rückschlagventil, Drosselrückschlagventil, Zylinder; Anschlussbezeichnungen P, T, A, B; Sperr-, Umlauf- und Schwimmmittelstellung (korrekt benannt und beschrieben); Funktionsablauf Ausfahren/Halten/Einfahren; Flächenverhältnis und Differentialschaltung; Aufgaben von Kolben- und Schraubenverdichter; Kondensat und Drucktaupunkt; Kältetrockner und Adsorptionstrockner; ISO 8573-1; Reihenfolge der Wartungseinheit (stimmt mit Bestand überein); Leckage als Kostentreiber; Formel für den Luftverbrauch je Hub und Doppelhub.

**Hausregeln (content/README.md „Schreibweise“):** Theorie ohne Anrede (eingehalten); Tausenderpunkt (z. B. 1.500, 76.800, 100.000.000) und Dezimalkomma (eingehalten); Leerzeichen vor „%“, „€“ und Einheiten (eingehalten, Ausnahme Winkelgrad siehe S5); kein Gendern nötig, keine generischen Maskulina oder Feminina gefunden („Verbraucher“ ist hier technisch als Bauteil gemeint).

**Rechtsnahes / Arbeitsschutz:** Keine Rechtsaussagen, keine Arbeitsschutzanweisungen. Einzige Berührung: S1 (Prüfpflichten) und die Wendung „von Hand“ in G11.

---

## F. Gesamtbewertung je Abschnitt

| Abschnitt | Bewertung | Notwendige Korrekturen |
|---|---|---|
| 1 Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor | **mit Korrektur einarbeiten** | F1 (Schlupf 1.140 statt 1.152 min⁻¹), G9, G10, G16, S4; optional L2, S5 |
| 2 Bussysteme und industrielle Kommunikation | **mit Korrektur einarbeiten** | G4, G5, G6, G7, G8, G14, S3, S6; optional L4 |
| 3 Hydraulikschaltpläne im Detail | **mit Korrektur einarbeiten** | G1 (Kennzeichnung gegen Norm prüfen oder Nummern streichen), G2, G11, G13; optional L5 |
| 4 Druckluftaufbereitung und Druckluftkosten | **mit Korrektur einarbeiten** | S1 (Satz streichen), S2, L1, G15 |
| 5 Luftverbrauch von Pneumatikzylindern | **mit Korrektur einarbeiten** | F2, F3, G3, G12; optional L3 |

Kein Abschnitt ist abzulehnen. Die Korrekturen sind klein; bei keinem Abschnitt ändert sich das Gerüst. Die Normbezüge (DIN ISO 1219, ISO 8573-1, IEC 62541) sind richtig; die Bauteilkennzeichnung aus DIN ISO 1219-2 (G1) sollte vor Einarbeitung gegen die Norm geprüft werden.
