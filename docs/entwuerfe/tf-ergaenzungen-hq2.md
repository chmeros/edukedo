# Entwurf: Ergänzungen zu P1 bis P6 — Produktion (Technischer Fachwirt, HQ2, Themen 9.1 bis 9.3)

Stand 12.10.2026, **überarbeitet nach unabhängiger Fachprüfung** (`docs/entwuerfe/pruefung-hq2.md`, 23 Befunde; Umgang mit jedem Befund siehe „Prüfergebnis eingearbeitet“ am Dateiende) · **vom Projektleiter angenommen („alle Vorschläge umsetzen, nochmal per Agent prüfen“), unabhängig fachlich geprüft und am 12.10.2026 in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3; nichts davon ist in `content/` eingearbeitet). Auftrag des Projektleiters vom 12.10.2026: Themen, die in den Paketen P1 bis P6 bisher unter „Nicht enthalten“ standen, nun doch aufzunehmen. Für den Handlungsbereich Produktion (HQ2) betrifft das aus dem Paket P4 die Metra-Potenzial-Methode (MPM) mit Zeitabständen, das Gantt-Diagramm, den Linienabgleich im Detail, die Ausbringungsoptimierung mit Engpass sowie Arbeitsbewertung und Entlohnung. Die Texte knüpfen an die vorhandenen Abschnitte in 9.1 bis 9.3 an („Netzplantechnik“, „Reihenfolgeregeln in der Werkstattsteuerung“, „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“, „Optimale Losgröße rechnen“, „Zeitwirtschaft nach REFA“, „Kapazitätsbelastung rechnen“, „Produktivität und Wirtschaftlichkeit“) und an „Deckungsbeitrag und Break-even rechnen“ in 2.2.

## Was vorliegt

Fünf neue Theorieabschnitte. Sie ändern die vorhandenen Abschnitte nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem eigenen Skript nachgerechnet (Ergebnisse siehe „Rechenprüfung“).

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 9.2 | „Metra-Potenzial-Methode (MPM) mit Zeitabständen“ | „Netzplantechnik“ |
| 2 | 9.2 | „Gantt-Diagramm und Belegungsplan“ | Abschnitt 1 |
| 3 | 9.1 | „Linienabgleich: Reihenfolge und Zuordnung der Arbeitsgänge“ | „Optimale Losgröße rechnen“ |
| 4 | 9.1 | „Ausbringungsoptimierung mit Engpass“ | „Kapazitätsbelastung rechnen“ |
| 5 | 9.3 | „Arbeitsbewertung und Entlohnung rechnen“ | „Produktivität und Wirtschaftlichkeit“ |

**Hinweis zur Prüfung:** Die Texte beschreiben Lehrbuchwissen der Produktionswirtschaft und Arbeitswissenschaft. Alle Zahlen der Beispiele (Zeiten, Stückzahlen, Löhne, Zuschläge, Punkte) sind erfundene Beispielwerte. Rechtsnahes kommt nicht vor: Arbeitszeit, Arbeitsschutz, Tarifrecht und Mitbestimmung bei Entgeltsystemen bleiben außen vor (Paket P8). Die Abschnitte 3 und 5 sind in einzelnen Konventionen (Auswahlregeln der Heuristiken, Begriffe und Wertzahlen der Arbeitsbewertung) bewusst allgemein gehalten; die offenen Stellen stehen unter „Zu entscheiden“.

---

## 1. HQ2 9.2 — Metra-Potenzial-Methode (MPM) mit Zeitabständen

**Einfügen:** Neuer Abschnitt `### Metra-Potenzial-Methode (MPM) mit Zeitabständen` nach „Netzplantechnik“.

> Die **Metra-Potenzial-Methode (MPM)** ist wie das Vorgangsknotennetz im Abschnitt „Netzplantechnik“ ein Netzplan, in dem jeder **Vorgang ein Knoten** ist. Der Unterschied liegt in den Pfeilen: Das einfache Vorgangsknotennetz kennt nur die Beziehung „Der Nachfolger beginnt, wenn der Vorgänger beendet ist“, und zwar ohne Wartezeit. In der Fertigung überlappen sich Vorgänge aber oft, oder sie müssen warten (Abkühlen, Aushärten, Trocknen). Die MPM bildet das über **Anordnungsbeziehungen** mit **Zeitabständen** ab. Der Abstand ist ein **Mindestabstand** (der Nachfolger darf frühestens so viel später beginnen oder enden) oder ein **Maximalabstand** (auch Höchstabstand; er darf höchstens so viel später beginnen oder enden); ein Abstand von 0 ist zulässig.
>
> Mit Vorgänger i, Nachfolger j und Abstand z gelten vier Beziehungen. Zur Rechnung wird jede auf einen Pfeil zwischen den **Anfangszeitpunkten** mit einem **Gewicht** zurückgeführt. Die Dauer eines Vorgangs heißt hier **d** (im Abschnitt „Netzplantechnik“ steht dafür D; klein geschrieben, damit sie nicht mit einem Vorgang namens D verwechselt wird):
>
> | Beziehung | Kürzel | Bedeutung (Mindestabstand z) | Gewicht des Pfeils |
> |---|---|---|---|
> | Normalfolge (Ende–Anfang) | NF | Anfang j ≥ Ende i + z | d_i + z |
> | Anfangsfolge (Anfang–Anfang) | AF | Anfang j ≥ Anfang i + z | z |
> | Endfolge (Ende–Ende) | EF | Ende j ≥ Ende i + z | d_i + z − d_j |
> | Sprungfolge (Anfang–Ende) | SF | Ende j ≥ Anfang i + z | z − d_j |
>
> Die Rechnung läuft wie im Vorgangsknotennetz in zwei Durchläufen, jetzt aber mit den Gewichten. **Vorwärtsrechnung:** FAZ = größter Wert aus (FAZ des Vorgängers + Gewicht) über alle eingehenden Pfeile (ohne Vorgänger: 0), FEZ = FAZ + d; die Projektdauer ist der größte FEZ. **Rückwärtsrechnung:** SAZ = kleinster Wert aus (SAZ des Nachfolgers − Gewicht) über alle ausgehenden Pfeile (bei Vorgängen ohne Nachfolger: Projektdauer − d), SEZ = SAZ + d. **Gesamtpuffer GP = SAZ − FAZ**; der **freie Puffer** ist der kleinste Wert aus (FAZ des Nachfolgers − FAZ − Gewicht) über die ausgehenden Pfeile, bei einem Vorgang ohne Nachfolger ist er Projektdauer − FEZ. Vorgänge mit **GP = 0** bilden den **kritischen Weg**. Das Vorgangsknotennetz aus „Netzplantechnik“ ist der Sonderfall der MPM, in dem alle Beziehungen Normalfolgen ohne Abstand sind; das Gewicht ist dann einfach die Dauer des Vorgängers.
>
> Ein **Maximalabstand** wird als Pfeil in Gegenrichtung (von j nach i) eingetragen. Sein Gewicht ist das **Negative des Gewichts, das dieselbe Beziehung als Mindestabstand mit z = z_max hätte**: bei der Anfangsfolge −z_max, bei der Normalfolge −(d_i + z_max), bei der Endfolge −(d_i + z_max − d_j), bei der Sprungfolge −(z_max − d_j). Herleitung für die Anfangsfolge: Aus „Anfang j ≤ Anfang i + z_max“ folgt „Anfang i ≥ Anfang j − z_max“. Für die Normalfolge: Aus „Anfang j ≤ Ende i + z_max“ folgt „Anfang i ≥ Anfang j − d_i − z_max“. Dadurch entsteht im Netz eine Schleife; Vor- und Rückwärtsrechnung müssen wiederholt werden, bis sich keine Werte mehr ändern, was in der Praxis Software übernimmt. Ist die Summe der Gewichte um eine Schleife **positiv**, sind die Vorgaben widersprüchlich und nicht einzuhalten.
>
> *Beispiel (Tage, erfundene Werte):* Bei Vantera wird eine Charge Wellen gefertigt: A Drehen (4 Tage), B Härten (2), C Schleifvorrichtung vorbereiten (3), D Schleifen (5), E Prüfen (3), F Versandfertig machen (1). Die Beziehungen:
>
> | Beziehung | Art | Abstand | Gewicht |
> |---|---|---|---|
> | A → B | Normalfolge | 0 | 4 + 0 = 4 |
> | B → D | Normalfolge | Mindestabstand 1 (Abkühlen) | 2 (Dauer von B) + 1 = 3 |
> | C → D | Anfangsfolge | 2 (Schleifen darf beginnen, sobald die Vorbereitung der Vorrichtung 2 Tage läuft; der Rest läuft parallel) | 2 |
> | D → E | Endfolge | 1 (Prüfung läuft begleitend und endet frühestens 1 Tag nach dem Schleifen) | 5 (Dauer von D) + 1 − 3 (Dauer von E) = 3 |
> | E → F | Normalfolge | 0 | 3 + 0 = 3 |
>
> Vorwärtsrechnung: A 0 bis 4; C 0 bis 3; B: FAZ = 0 + 4 = 4, FEZ = 6; D: FAZ = größter Wert aus (4 + 3 = 7) und (0 + 2 = 2) = 7, FEZ = 12; E: FAZ = 7 + 3 = 10, FEZ = 13; F: FAZ = 10 + 3 = 13, FEZ = 14. Projektdauer **14 Tage**. Kontrolle der Endfolge: Ende E (13) ≥ Ende D (12) + 1. Rückwärtsrechnung: F 13 bis 14; E: SAZ = 13 − 3 = 10; D: SAZ = 10 − 3 = 7; B: SAZ = 7 − 3 = 4; A: SAZ = 4 − 4 = 0; C: SAZ = 7 − 2 = 5.
>
> | Vorgang | d | FAZ | FEZ | SAZ | SEZ | GP | FP |
> |---|---|---|---|---|---|---|---|
> | A | 4 | 0 | 4 | 0 | 4 | 0 | 0 |
> | B | 2 | 4 | 6 | 4 | 6 | 0 | 0 |
> | C | 3 | 0 | 3 | 5 | 8 | 5 | 5 |
> | D | 5 | 7 | 12 | 7 | 12 | 0 | 0 |
> | E | 3 | 10 | 13 | 10 | 13 | 0 | 0 |
> | F | 1 | 13 | 14 | 13 | 14 | 0 | 0 |
>
> Der **kritische Weg** ist A – B – D – E – F (Gewichte 4 + 3 + 3 + 3, dazu die Dauer von F mit 1 Tag = 14 Tage). Die Vorbereitung der Schleifvorrichtung (C) hat 5 Tage Gesamtpuffer; der freie Puffer ist ebenfalls 5 (FAZ von D 7 − FAZ von C 0 − Gewicht 2 = 5). Für F, den Vorgang ohne Nachfolger, ist der freie Puffer Projektdauer 14 − FEZ 14 = 0. Ohne den Mindestabstand von 1 Tag zum Abkühlen wäre die Projektdauer 13 Tage: Der Abstand verlängert den kritischen Weg um genau diesen Tag.
>
> *Maximalabstand im Beispiel:* Soll zwischen dem Ende des Härtens (B) und dem Beginn des Schleifens (D) höchstens 3 Tage liegen (Annahme: danach müsste das Teil erneut gereinigt werden), ist das ein Maximalabstand bei einer Normalfolge. Aus „Anfang D ≤ Ende B + 3 = Anfang B + 2 + 3“ folgt „Anfang B ≥ Anfang D − 5“: Es kommt ein Pfeil von D nach B mit dem Gewicht −(2 + 3) = −5 hinzu (Dauer von B plus z_max, nicht nur z_max). Im berechneten Plan liegt der Abstand bei 7 − 6 = 1 Tag, die Vorgabe ist also eingehalten; die Rückkante ändert keinen Wert der Tabelle. Die Gewichtssumme um die Schleife B → D → B beträgt 3 − 5 = −2 (nicht positiv, also widerspruchsfrei).

## 2. HQ2 9.2 — Gantt-Diagramm und Belegungsplan

**Einfügen:** Neuer Abschnitt `### Gantt-Diagramm und Belegungsplan` nach „Metra-Potenzial-Methode (MPM) mit Zeitabständen“.

> Das **Gantt-Diagramm** (Balkendiagramm) trägt auf der **waagerechten Zeitachse** die Zeit und in den **Zeilen** Vorgänge oder Ressourcen ein. Jeder Vorgang ist ein **Balken**; Beginn und Länge zeigen Start und Dauer. Üblich sind weitere Zeichen: ein **Meilenstein** (Raute oder Dreieck, Dauer 0) markiert ein wichtiges Ereignis wie die Freigabe der Serie, ein **Fortschrittsbalken** (ausgefüllter Teil des Balkens) zeigt den erreichten Fertigstellungsgrad, eine senkrechte **Heute-Linie** den aktuellen Stand, und Pfeile können Abhängigkeiten anzeigen. Ein Vorgangs-Gantt (Zeile = Vorgang) dient der Terminplanung und -verfolgung eines Projekts. Ein **Belegungsplan** (Maschinenbelegungsplan, Ressourcen-Gantt) hat dagegen **je Zeile eine Maschine oder einen Arbeitsplatz**; die Balken sind die Aufträge, die darauf bearbeitet werden. An den Lücken zwischen den Balken sind **Leerzeiten** zu erkennen, an überlappenden Balken Doppelbelegungen. Der digitale Leitstand (siehe „Werkstattsteuerung und Maschinenbelegungsplanung“) zeigt die Belegung in dieser Form.
>
> Im Vergleich zum Netzplan:
>
> | Merkmal | Gantt-Diagramm | Netzplan |
> |---|---|---|
> | Darstellung | Balken auf einer Zeitachse | Knoten und Pfeile |
> | Stärke | Auf einen Blick lesbar, gut für Berichte und Besprechungen | Zeigt Abhängigkeiten und rechnet Gesamtdauer, Puffer und kritischen Weg |
> | Abhängigkeiten | Nur bei eingezeichneten Pfeilen, bei vielen Vorgängen schnell unübersichtlich | Kern der Darstellung |
> | Kritischer Weg und Puffer | Nicht von selbst erkennbar | Ergebnis der Rechnung |
> | Typischer Einsatz | Terminübersicht, Fortschrittskontrolle, Maschinenbelegung | Terminrechnung bei vielen verknüpften Vorgängen |
>
> Beide ergänzen sich: Aus dem Netzplan wird das Gantt-Diagramm abgeleitet, indem jeder Vorgang als Balken ab seinem frühesten Anfang gezeichnet wird. Im Beispiel aus „Netzplantechnik“ läuft das NC-Programm (B) von Tag 0 bis Tag 3; sein Gesamtpuffer von 3 Tagen erscheint als heller Balken bis Tag 6. Der **Fortschrittsbalken** rechnet sich so, hier am Vorrichtungsbau (C) aus demselben Beispiel, der 4 Tage dauert und von Tag 2 bis Tag 6 geplant ist: Am Tag 4 sind 2 der 4 Tage vergangen, es sollten also 50 % fertig sein; gemeldet sind 25 %. Der Rückstand beträgt (50 % − 25 %) · 4 Tage = **1 Tag**. Weil C auf dem kritischen Weg liegt (Gesamtpuffer 0), verschiebt sich der Serienstart ohne Gegenmaßnahme um diesen Tag, die Projektdauer wächst von 15 auf 16 Tage.
>
> *Beispiel Maschinenbelegung (erfundene Werte):* Drei Aufträge werden alle zur Zeit 0 freigegeben und laufen zuerst auf der Drehmaschine M1, danach auf der Fräsmaschine M2. Auf beiden Maschinen gilt dieselbe Reihenfolge; Rüst- und Transportzeiten sind in den Bearbeitungszeiten enthalten oder werden vernachlässigt.
>
> | Auftrag | M1 Drehen | M2 Fräsen |
> |---|---|---|
> | 1 | 4 h | 3 h |
> | 2 | 2 h | 5 h |
> | 3 | 3 h | 2 h |
>
> Die Reihenfolge folgt der Regel der **kürzesten Operationszeit** (siehe „Reihenfolgeregeln in der Werkstattsteuerung“), bezogen auf die erste Maschine: erst Auftrag 2 (2 h), dann Auftrag 3 (3 h), dann Auftrag 1 (4 h). Ein Auftrag beginnt auf M2, sobald er auf M1 fertig und M2 frei ist. Der Belegungsplan in Zeitintervallen (Stunden seit Beginn):
>
> | Maschine | Belegung | Leerzeit |
> |---|---|---|
> | M1 | Auftrag 2: 0 bis 2 h; Auftrag 3: 2 bis 5 h; Auftrag 1: 5 bis 9 h | 9 bis 12 h |
> | M2 | Auftrag 2: 2 bis 7 h; Auftrag 3: 7 bis 9 h; Auftrag 1: 9 bis 12 h | 0 bis 2 h |
>
> Auftrag 2 ist nach 7 h fertig, Auftrag 3 nach 9 h, Auftrag 1 nach 12 h. Die mittlere **Durchlaufzeit** der Aufträge (Zeitspanne je Auftrag von der Freigabe bis zur Fertigstellung) beträgt (7 + 9 + 12) / 3 = 28 / 3 = **9,33 h**; bis der letzte Auftrag fertig ist, vergehen insgesamt **12 h** (Gesamtdauer des Belegungsplans). Die **Auslastung** ist die Belegungszeit geteilt durch die betrachtete Zeit: M1 ist 4 + 2 + 3 = 9 h belegt, also 9 / 12 = **75,0 %** (Leerzeit 3 h am Ende); M2 ist 5 + 2 + 3 = 10 h belegt, also 10 / 12 = **83,3 %** (Leerzeit 2 h zu Beginn, weil M2 auf den ersten Auftrag wartet). Beide Maschinen zusammen: 19 / 24 = **79,2 %**.
>
> *Vergleich:* Bei der Reihenfolge nach Eingang (Auftrag 1, 2, 3, FIFO) endet Auftrag 1 nach 7 h, Auftrag 2 nach 12 h, Auftrag 3 nach 14 h: Gesamtdauer **14 h**, mittlere Durchlaufzeit (7 + 12 + 14) / 3 = **11,0 h**, Auslastung M1 9 / 14 = 64,3 % und M2 10 / 14 = 71,4 %. Die Regel der kürzesten Operationszeit liefert hier eine der besten der sechs möglichen Reihenfolgen: Weder die Gesamtdauer von 12 h noch die mittlere Durchlaufzeit von 9,33 h wird von einer anderen Reihenfolge unterboten. Dass die Regel die mittlere Durchlaufzeit senkt, ist aber nur für eine einzelne Maschine garantiert; bei mehreren Maschinen ist sie eine Faustregel. Bei drohendem Terminverzug kann außerdem die Regel des frühesten Liefertermins sinnvoller sein.

## 3. HQ2 9.1 — Linienabgleich: Reihenfolge und Zuordnung der Arbeitsgänge

**Einfügen:** Neuer Abschnitt `### Linienabgleich: Reihenfolge und Zuordnung der Arbeitsgänge` nach „Optimale Losgröße rechnen“.

> Der **Linienabgleich** (auch Band- oder Fließbandabgleich) ordnet bei der Fließfertigung die **Arbeitsgänge** (Arbeitselemente, die nicht weiter sinnvoll geteilt werden) den **Stationen** zu. Drei Bedingungen gelten: Die **Reihenfolge** der Arbeitsgänge muss eingehalten werden, die Summe der Zeiten an einer Station darf die **Taktzeit** nicht überschreiten, und jeder einzelne Arbeitsgang muss kürzer oder gleich lang wie die Taktzeit sein, solange er nicht geteilt oder auf mehrere parallele Stationen verteilt wird. Ziel ist, mit möglichst wenigen Stationen und möglichst geringen **Leerzeiten** auszukommen. Die Reihenfolge wird im **Vorranggraphen** dargestellt: Jeder Knoten ist ein Arbeitsgang mit seiner Zeit, ein Pfeil bedeutet „muss vorher fertig sein“. Taktzeit, Stationenzahl und Wirkungsgrad (dort „Wirkungsgrad des Bandabgleichs“) stehen im Abschnitt „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“: **Taktzeit = nutzbare Arbeitszeit / Bedarfsmenge**, **Mindeststationenzahl = Arbeitsinhalt Σt / Taktzeit** (aufgerundet) und **Wirkungsgrad = Σt / (n · Taktzeit)**. Ergänzend gilt: **Verlustzeit = n · Taktzeit − Σt** (Summe der Leerzeiten je Takt) und **Verlustgrad** (teils auch Bandverlust genannt) **= 1 − Wirkungsgrad**.
>
> Für die Zuordnung gibt es einfache **Heuristiken**, die ein gutes, aber nicht immer das beste Ergebnis liefern. Beim **Rangpositionswertverfahren** (nach Helgeson und Birnie) erhält jeder Arbeitsgang einen **Rangpositionswert (RPW)**: seine eigene Zeit plus die Zeiten **aller** (direkten und indirekten) Nachfolger, jeder Nachfolger einmal gezählt. Je höher der Wert, desto früher sollte der Arbeitsgang erfolgen, weil viele andere von ihm abhängen. Vorgehen: Eine Station wird geöffnet; unter den Arbeitsgängen, deren Vorgänger alle schon zugeordnet sind und die in die verbleibende Taktzeit passen, kommt der mit dem höchsten RPW hinein; das wiederholt sich, bis nichts mehr passt. Dann wird die nächste Station geöffnet. Ein weiteres bekanntes Verfahren ist das Spaltenverfahren nach **Kilbridge und Wester**; es ordnet die Arbeitsgänge nach ihrer frühestmöglichen Position in Spalten des Vorranggraphen und belegt die Stationen spaltenweise von links. Seine Auswahlregeln im Einzelnen werden hier nicht dargestellt.
>
> *Beispiel:* Eine andere Montagelinie der Vantera (Pumpenmontage, nicht die Linie aus „Fertigungsorganisation“) hat 420 min nutzbare Arbeitszeit je Schicht, der Bedarf beträgt 42 Stück: Taktzeit = 420 min / 42 = **10 min**. Acht Arbeitsgänge (erfundene Zeiten):
>
> | Arbeitsgang | Tätigkeit | Zeit | Vorgänger | RPW |
> |---|---|---|---|---|
> | A | Gehäuse einlegen | 4 min | – | 36 |
> | B | Welle einpressen | 8 min | A | 27 |
> | C | Dichtring setzen | 3 min | A | 17 |
> | D | Lagerdeckel verschrauben | 7 min | B | 19 |
> | E | Fett einfüllen | 2 min | C | 14 |
> | F | Abdeckung aufsetzen | 2 min | D, E | 12 |
> | G | Funktionsprüfung | 7 min | F | 10 |
> | H | Etikett und Verpackung | 3 min | G | 3 |
>
> Vorranggraph: A → B → D → F und A → C → E → F, danach F → G → H. Der Arbeitsinhalt beträgt Σt = 4 + 8 + 3 + 7 + 2 + 2 + 7 + 3 = **36 min**; die Mindeststationenzahl ist 36 / 10 = 3,6, aufgerundet **4**. Beispiel für den RPW von B: 8 + 7 (D) + 2 (F) + 7 (G) + 3 (H) = 27.
>
> Zuordnung: **Station 1:** A (RPW 36) nimmt 4 min, Rest 6 min; B (8 min) passt nicht, C (RPW 17) passt, Rest 3 min; E (RPW 14, Vorgänger C ist zugeordnet) passt, Rest 1 min. **Station 2:** B (8 min), Rest 2 min; D (7 min) passt nicht. **Station 3:** D (7 min), Rest 3 min; F (2 min, Vorgänger D und E sind zugeordnet) passt, Rest 1 min; G (7 min) passt nicht. **Station 4:** G (7 min), Rest 3 min; H (3 min), Rest 0.
>
> | Station | Arbeitsgänge | Stationszeit | Leerzeit |
> |---|---|---|---|
> | 1 | A, C, E | 9 min | 1 min |
> | 2 | B | 8 min | 2 min |
> | 3 | D, F | 9 min | 1 min |
> | 4 | G, H | 10 min | 0 min |
>
> Mit vier Stationen wird die Mindeststationenzahl erreicht. Wirkungsgrad = 36 min / (4 · 10 min) = **90 %**; die Verlustzeit beträgt 4 · 10 min − 36 min = **4 min** je Takt (1 + 2 + 1 + 0), der Verlustgrad **10 %**. Die Linie liefert 420 min / 10 min = 42 Stück je Schicht. *Grenze des Verfahrens:* Steigt der Bedarf auf 60 Stück je Schicht, sinkt die Taktzeit auf 420 min / 60 = 7 min. Rechnerisch wären 36 / 7 = 5,14, aufgerundet mindestens 6 Stationen nötig, aber der Arbeitsgang B (8 min) ist länger als der Takt. Er muss geteilt, vereinfacht oder auf zwei parallelen Stationen ausgeführt werden, die abwechselnd je ein Stück bearbeiten: Jede der beiden Stationen hat dann 2 · 7 min = 14 min Zeit je Stück, die Linie gibt aber weiterhin alle 7 min ein Stück ab. Mit paralleler Auslegung darf ein Arbeitsgang also bis zu (Zahl der parallelen Stationen) · Taktzeit dauern; die Stationenzahl steigt dabei, weil B zwei Stationen belegt. Ohne eine solche Maßnahme kann die Taktzeit nicht kürzer sein als der längste unteilbare Arbeitsgang.

## 4. HQ2 9.1 — Ausbringungsoptimierung mit Engpass

**Einfügen:** Neuer Abschnitt `### Ausbringungsoptimierung mit Engpass` nach „Kapazitätsbelastung rechnen“.

> Die **Ausbringungsoptimierung** (Programmplanung bei Kapazitätsgrenzen) bestimmt, welche Mengen der Produkte gefertigt werden, wenn die Kapazität nicht für alles reicht und der **Gesamtdeckungsbeitrag** möglichst groß werden soll. Die fixen Kosten bleiben von dieser Entscheidung unberührt, deshalb zählt der Deckungsbeitrag (siehe „Deckungsbeitrag und Break-even rechnen“ in 2.2, dort mit der Engpassüberlegung). Bei **einem** Engpass entscheidet der **Deckungsbeitrag je Engpasseinheit** (zum Beispiel je Maschinenstunde): Man rechnet db / Engpassbedarf je Stück, ordnet die Produkte nach diesem Wert absteigend, fertigt zuerst das Produkt mit dem höchsten Wert bis zu seiner **Absatzgrenze** und verteilt die restliche Kapazität auf das nächste.
>
> *Beispiel (ein Engpass, erfundene Werte):* Die Fräsmaschine der Vantera hat im Monat 1.000 h Kapazität. Produkt A bringt 30 € Stückdeckungsbeitrag bei 0,5 h Fräszeit, Produkt B 40 € bei 1,0 h; absetzbar sind höchstens 1.200 Stück A und 800 Stück B. Deckungsbeitrag je Fräsmaschinenstunde: A 30 € / 0,5 h = **60 €**, B 40 € / 1 h = **40 €**. A hat Vorrang: 1.200 Stück benötigen 1.200 · 0,5 h = 600 h, die verbleibenden 400 h reichen für 400 Stück B. Gesamtdeckungsbeitrag = 1.200 · 30 € + 400 · 40 € = 36.000 € + 16.000 € = **52.000 €**. Würde B zuerst gefertigt (800 Stück in 800 h) und mit dem Rest A (200 h / 0,5 h = 400 Stück), betrüge er 400 · 30 € + 800 · 40 € = 44.000 €, also 8.000 € weniger.
>
> Gibt es **zwei Engpässe** und zwei Produkte, hilft die Rangfolge nicht mehr; man löst das Problem **grafisch**. Die Mengen x (Produkt A) und y (Produkt B) werden als Achsen eingetragen. Jede Restriktion „Bearbeitungszeit je Stück · Menge ≤ Kapazität“ ist eine Gerade, ebenso jede Absatzgrenze; Mengen dürfen nicht negativ sein. Der **zulässige Bereich** ist die Fläche, auf der alle Bedingungen gleichzeitig gelten. Die Zielfunktion **DB = db_A · x + db_B · y** ist bei festem Wert eine Gerade (Gerade gleichen Deckungsbeitrags); verschiebt man sie parallel nach außen, steigt der Deckungsbeitrag, bis sie den zulässigen Bereich nur noch berührt. Bei einer linearen Zielfunktion liegt daher mindestens ein Optimum in einem **Eckpunkt** des Bereichs (verläuft die Gerade gleichen Deckungsbeitrags parallel zu einer Randgeraden, sind alle Punkte dieser Kante gleich gut). Es genügt deshalb, die Eckpunkte zu bestimmen (Achsenschnitte und Schnittpunkte der Geraden, per Gleichungssystem) und den Deckungsbeitrag in jedem zu berechnen. **Nicht jeder Schnittpunkt zweier Geraden ist ein Eckpunkt:** Er zählt nur, wenn er alle Bedingungen erfüllt. Zum Beispiel liegt der Schnitt der Fräsgeraden mit der Absatzgrenze x = 1.200 bei y = 400; dort müsste die Drehmaschine (siehe unten) 1,0 · 1.200 + 0,5 · 400 = 1.400 h laufen und wäre überschritten, der Punkt ist unzulässig. Für mehr als zwei Produkte verwendet man rechnerische Verfahren der linearen Optimierung (das Simplex-Verfahren), die hier nicht dargestellt werden.
>
> *Beispiel (zwei Maschinen):* Zusätzlich zur Fräsmaschine (0,5 h je Stück A, 1,0 h je Stück B, 1.000 h) ist die Drehmaschine begrenzt: 1,0 h je Stück A, 0,5 h je Stück B, 1.100 h im Monat. Absatzgrenzen wie oben (x ≤ 1.200, y ≤ 800). Restriktionen: 0,5 · x + 1,0 · y ≤ 1.000 (Fräsen) und 1,0 · x + 0,5 · y ≤ 1.100 (Drehen). Die Lösung aus dem ersten Beispiel (1.200 und 400 Stück) ist jetzt unzulässig, denn die Drehmaschine müsste 1,0 · 1.200 + 0,5 · 400 = 1.400 h laufen. Die Rangfolgen widersprechen sich jetzt: Je Fräsmaschinenstunde hat A Vorrang (60 € gegen 40 €), je Drehmaschinenstunde B (A bringt 30 € / 1,0 h = 30 €, B 40 € / 0,5 h = 80 €). Deshalb reicht die Rangfolge nicht aus. Eckpunkte des zulässigen Bereichs:
>
> | Eckpunkt (x ; y) | Lage | Deckungsbeitrag 30 · x + 40 · y |
> |---|---|---|
> | (0 ; 0) | Ursprung | 0 € |
> | (1.100 ; 0) | Drehen bei y = 0 voll ausgelastet | 33.000 € |
> | (800 ; 600) | Schnitt Fräsen und Drehen | 48.000 € |
> | (400 ; 800) | Schnitt Fräsen und Absatzgrenze y = 800 | 44.000 € |
> | (0 ; 800) | Absatzgrenze y = 800 | 32.000 € |
>
> Der Schnittpunkt (800 ; 600) ergibt sich aus y = 1.000 − 0,5 · x, eingesetzt in x + 0,5 · y = 1.100: x + 500 − 0,25 · x = 1.100, also 0,75 · x = 600 und x = 800, y = 600. Der Eckpunkt (400 ; 800) folgt aus 0,5 · x + 800 = 1.000, also x = 400. Die Absatzgrenze für A (x ≤ 1.200) ist nicht bindend, denn schon die Drehmaschine begrenzt x auf höchstens 1.100; ihre Schnittpunkte mit den anderen Geraden sind keine Eckpunkte. Optimal sind **800 Stück A und 600 Stück B** mit einem Gesamtdeckungsbeitrag von **48.000 €**; beide Maschinen sind voll ausgelastet (Fräsen 0,5 · 800 + 600 = 1.000 h, Drehen 800 + 0,5 · 600 = 1.100 h). Voraussetzungen der Rechnung: konstante Stückdeckungsbeiträge und Bearbeitungszeiten, teilbare oder hinreichend große Mengen (sonst wird auf ganze Stück gerundet, was nicht immer die beste ganzzahlige Lösung ergibt) und fixe Kosten, die von der Entscheidung unabhängig sind.

## 5. HQ2 9.3 — Arbeitsbewertung und Entlohnung rechnen

**Einfügen:** Neuer Abschnitt `### Arbeitsbewertung und Entlohnung rechnen` nach „Produktivität und Wirtschaftlichkeit“.

> Die **Arbeitsbewertung** ermittelt, wie anspruchsvoll eine **Arbeit** ist (nicht, wie gut eine Person sie ausführt), und ist Grundlage des **Grundlohns**. Man unterscheidet **summarische** und **analytische** Verfahren. **Summarisch** wird die Arbeit als Ganzes bewertet: beim **Rangfolgeverfahren** wird sie in eine Rangreihe mit anderen Arbeiten gebracht, beim **Lohngruppenverfahren** (Katalogverfahren) einer von mehreren beschriebenen Lohngruppen mit Richtbeispielen zugeordnet. **Analytisch** wird sie nach einzelnen **Anforderungsarten** bewertet: Beim **Rangreihenverfahren** wird je Anforderungsart eine Rangreihe der Arbeiten gebildet, beim **Stufenwertzahlverfahren** wird je Anforderungsart die zutreffende Stufe bestimmt, der eine vorgegebene **Stufenwertzahl** (Punktzahl) zugeordnet ist; die Summe der Stufenwertzahlen ist der **Arbeitswert**. Als Ordnungsrahmen für die Anforderungsarten wird häufig das **Genfer Schema** genutzt, das sie in vier Hauptgruppen fasst: Können (zum Beispiel Kenntnisse und Geschicklichkeit), Verantwortung, Belastung (zum Beispiel geistige und körperliche) und Umgebungseinflüsse. Welche Anforderungsarten, wie viele Stufen und welche Wertzahlen ein Betrieb verwendet, legt das jeweilige Bewertungssystem fest.
>
> *Beispiel (vereinfacht; Anforderungsarten, Stufen und Wertzahlen erfunden):* Kenntnisse Stufe 4 = 12 Punkte, Geschicklichkeit Stufe 3 = 6 Punkte, Verantwortung Stufe 2 = 4 Punkte, Belastung (der Einfachheit halber zu einer Anforderungsart zusammengefasst) Stufe 2 = 2 Punkte, Umgebung Stufe 1 = 1 Punkt; Arbeitswert 12 + 6 + 4 + 2 + 1 = **25 Punkte**. Die unterschiedliche Bedeutung der Anforderungsarten steckt in den Wertzahlen der Stufen. Eine Zuordnungstabelle ordnet dem Arbeitswert eine Lohngruppe zu, und der Lohngruppe ist ein Grundlohn zugeordnet; im Beispiel gehören 21 bis 30 Punkte zur Lohngruppe 4, mit einem Grundlohn von 18,00 € je Stunde (Beispielwerte).
>
> Bei der **Entlohnung** unterscheidet man **Zeitlohn** und **Leistungslohn**. Beim **Zeitlohn** richtet sich der Lohn nach der Anwesenheitszeit: **Lohn = Stundenlohn · Stunden**. Er passt zu Arbeiten, deren Leistung schwer messbar ist oder bei denen Qualität und Sorgfalt vor der Menge stehen; ein Leistungsanreiz fehlt. Der **Lohn je Stück** (Lohnstückkosten) ist **Stundenlohn / Arbeitsproduktivität** und sinkt, wenn die Menge steigt.
>
> Beim **Akkordlohn** (Leistungslohn) hängt der Verdienst von der erbrachten Menge ab. Der **Geldakkord** vergütet einen festen Betrag je Stück (Akkordsatz); er ergibt sich aus Vorgabezeit · Minutenfaktor. Beim **Zeitakkord** wird je Einheit eine **Vorgabezeit** (siehe „Zeitwirtschaft nach REFA“) festgelegt und mit einem **Minutenfaktor** bewertet: **Verdienst = Menge · Vorgabezeit je Einheit · Minutenfaktor**. Der Minutenfaktor ist der **Akkordrichtsatz geteilt durch 60**; der **Akkordrichtsatz** ist der Stundenverdienst bei Normalleistung (100 %) und besteht aus dem **Grundlohn** und einem **Akkordzuschlag** als Ausgleich für die höhere Leistungsanforderung. Der Vorteil des Zeitakkords: Ändert sich der Lohn, wird nur der Minutenfaktor angepasst, nicht jede Zeitvorgabe.
>
> *Beispiel Akkordverdienst (erfundene Werte):* Grundlohn 18,00 € je Stunde, Akkordzuschlag 20 % (Beispielwert), also Akkordrichtsatz 18,00 € · 1,20 = **21,60 €** und Minutenfaktor 21,60 € / 60 = **0,36 € je Minute**. Die Vorgabezeit beträgt 3,0 min je Stück; der Akkordsatz (Geldakkord) ist 3,0 min · 0,36 € = **1,08 € je Stück**. In einer bezahlten Schicht von 480 min entspricht die Normalleistung 480 / 3,0 = **160 Stück**; hier zählt die bezahlte Zeit, denn die Verteilzeit steckt bereits in der Vorgabezeit je Stück (anders als bei der Taktrechnung in „Fertigungsorganisation“, wo die nutzbare Zeit von 420 min zählt). Bei Normalleistung ist der Verdienst 160 · 3,0 min · 0,36 € = **172,80 €** (gleich 8 h · 21,60 €).
>
> Bei Mehrleistung mit 176 Stück ergibt sich als Vorgabezeit (verdiente Zeit) 176 · 3,0 min = 528 min, in 480 min tatsächlicher Zeit. Das Verhältnis aus Vorgabezeit und tatsächlich benötigter Zeit heißt **Zeitgrad**: 528 / 480 = **110 %**. Der Zeitgrad wird nachträglich aus der geleisteten Menge gerechnet (176 / 160 = 110 %); er ist nicht der **Leistungsgrad** aus „Zeitwirtschaft nach REFA“, den man bei der Zeitaufnahme für die beobachtete Person einschätzt, um die Normalleistung zu bestimmen. Der Verdienst beträgt 528 min · 0,36 € = **190,08 €**, gleich Zeitgrad · Akkordrichtsatz · Stunden = 1,10 · 21,60 € · 8; das sind 23,76 € je Stunde (21,60 € · 1,10) und 17,28 € oder 10 % mehr als bei Normalleistung. Bei Minderleistung mit 144 Stück sind es 432 min, ein Zeitgrad von 90 % und 155,52 € (19,44 € je Stunde). Ein Mindestverdienst bei Minderleistung wird in der Praxis oft vorgesehen; die Ausgestaltung wird hier nicht behandelt.
>
> | Stück je Schicht | Zeitgrad | Akkordverdienst | Zeitlohn (8 h · 18,00 €) | Lohn je Stück Akkord | Lohn je Stück Zeitlohn |
> |---|---|---|---|---|---|
> | 144 | 90 % | 155,52 € | 144,00 € | 1,08 € | 1,00 € |
> | 160 | 100 % | 172,80 € | 144,00 € | 1,08 € | 0,90 € |
> | 176 | 110 % | 190,08 € | 144,00 € | 1,08 € | 0,82 € |
>
> Beim Akkord ist der Lohn je Stück konstant (3,0 min · 0,36 € = 1,08 €), der Verdienst der Person steigt und fällt mit der Leistung. Beim Zeitlohn bleibt der Verdienst gleich, der Lohn je Stück sinkt mit steigender Leistung (144 € / 160 = 0,90 €; 144 € / 176 ≈ 0,82 €). Die 28,80 € Differenz bei Normalleistung zum Zeitlohn sind der Akkordzuschlag von 20 % auf 144,00 €. Der Vergleich gilt bei gleicher Stückzahl. Im Akkord entsteht der Vorteil für den Betrieb dadurch, dass der Leistungsanreiz die Stückzahl erhöht und die übrigen Kosten je Stück (Maschinenstunde, Gemeinkosten) bei mehr Ausbringung sinken; ob sich das lohnt, zeigt die Wirtschaftlichkeit.
>
> Beim **Prämienlohn** besteht der Lohn aus einem Grundlohn (meist Zeitlohn) plus einer **Prämie** für messbare Zusatzleistung. Prämien gibt es zum Beispiel für **Menge**, **Qualität**, **Ersparnis** von Material, Energie oder Ausschuss, **Nutzungsgrad** einer Anlage oder Termineinhaltung. Die Bezugsgröße muss messbar und beeinflussbar sein; einseitige Prämien können Fehlanreize setzen (eine reine Mengenprämie gefährdet die Qualität). *Beispiel Mengenprämie:* Basismenge 160 Stück je Schicht (Normalleistung), Prämie 0,40 € je Stück darüber; bei 170 Stück beträgt die Prämie (170 − 160) · 0,40 € = **4,00 €**, der Tagesverdienst 144,00 € + 4,00 € = 148,00 €. *Beispiel Ersparnisprämie:* Eine Fertigungsgruppe von 5 Personen senkt bei 12.000 gefertigten Teilen die Ausschussquote von 3 % auf 2 %. Eingespart sind 12.000 · (0,03 − 0,02) = 120 Teile; bei Herstellkosten von 25 € sind das 3.000 €. Werden 40 % davon als Prämie ausgezahlt, sind es 1.200 €, also **240 € je Person**.
>
> Der Zusammenhang zur Wirtschaftlichkeit (siehe „Produktivität und Wirtschaftlichkeit“): Ein Entgeltsystem ist wirtschaftlich, wenn die Mehrleistung mehr einbringt, als die Prämie oder der Zuschlag kosten. Rechtliche Fragen zu Entgeltsystemen gehören nicht zu diesem Abschnitt.

---

## Rechenprüfung

Alle Zahlenbeispiele habe ich mit einem eigenen Python-Skript nachgerechnet (alle Werte stimmen mit dem Text überein; die Optimierung in Abschnitt 4 zusätzlich durch vollständiges Durchprobieren aller ganzzahligen Mengen, die Belegung in Abschnitt 2 durch Durchrechnen aller sechs Reihenfolgen). Mit „neu“ sind Zeilen gekennzeichnet, die durch die Überarbeitung nach der Fachprüfung hinzugekommen oder geändert sind.

| Abschnitt | Rechenweg | Ergebnis |
|---|---|---|
| 1 MPM | Gewicht NF A → B: 4 + 0; B → D: 2 + 1; C → D (AF): 2; D → E (EF): 5 + 1 − 3; E → F: 3 + 0 | 4; 3; 2; 3; 3 |
| 1 MPM | FAZ D = max(0 + 4 + 3; 0 + 2) = 7; FEZ D = 12; FAZ E = 7 + 3 = 10; FAZ F = 10 + 3 = 13; FEZ F | 14 Tage |
| 1 MPM | Rückwärts: SAZ F = 13; E = 13 − 3 = 10; D = 10 − 3 = 7; B = 7 − 3 = 4; A = 4 − 4 = 0; C = 7 − 2 = 5 | SAZ 0; 4; 5; 7; 10; 13 |
| 1 MPM | GP C = 5 − 0; FP C = 7 − 0 − 2; alle anderen GP = 0 | 5 Tage; 5 Tage |
| 1 MPM (neu) | FP von F (ohne Nachfolger) = Projektdauer − FEZ = 14 − 14 | 0 Tage |
| 1 MPM | Projektdauer ohne Mindestabstand 1 Tag (Gewicht B → D = 2): 0 + 4 + 2 + 3 + 3 + 1 | 13 Tage |
| 1 MPM | Kontrolle Endfolge: Ende E = 13 ≥ Ende D + 1 = 13 | erfüllt |
| 1 MPM (neu) | Maximalabstand Ende B bis Anfang D höchstens 3 (Normalfolge): Pfeil D → B mit −(d_B + z_max) = −(2 + 3); Schleife B → D → B: 3 + (−5) | −5; −2 |
| 1 MPM (neu) | Abstand Ende B (6) bis Anfang D (7); Vor- und Rückwärtsrechnung mit Rückpfeil wiederholt: alle FAZ und SAZ unverändert | 1 ≤ 3; Werte unverändert |
| 1 MPM (neu) | Gewichtsregeln für Mindest- und Maximalabstand (NF, AF, EF, SF; Maximalabstand = negatives Gewicht mit z = z_max) gegen die Ungleichungen geprüft, 20.000 Zufallsfälle | 0 Abweichungen |
| 2 Gantt (neu) | Netz „Netzplantechnik“: Vorrichtungsbau C = 4 Tage, FAZ 2, FEZ 6; Projektdauer 15; B: SEZ 6 | passt zum Bestand |
| 2 Gantt (neu) | Fortschritt C am Tag 4: Soll (4 − 2) / 4 = 50 %, gemeldet 25 %; Rückstand (50 % − 25 %) · 4 Tage; C kritisch: Projektdauer 15 + 1 | 1 Tag; 16 Tage |
| 2 Belegung (KOZ) | Reihenfolge 2, 3, 1: M1 0–2, 2–5, 5–9; M2 2–7, 7–9, 9–12 | Ende 12 h |
| 2 Belegung (KOZ) | Durchlaufzeiten 7; 9; 12; Mittel (7 + 9 + 12) / 3 | 9,33 h |
| 2 Belegung (KOZ) | Auslastung M1 (4 + 2 + 3) / 12; M2 (3 + 5 + 2) / 12; gesamt 19 / 24 | 75,0 %; 83,3 %; 79,2 % |
| 2 Belegung (FIFO) | Reihenfolge 1, 2, 3: M1 0–4, 4–6, 6–9; M2 4–7, 7–12, 12–14 | Ende 14 h |
| 2 Belegung (FIFO) | Mittel (7 + 12 + 14) / 3; Auslastung 9 / 14; 10 / 14; 19 / 28 | 11,0 h; 64,3 %; 71,4 %; 67,9 % |
| 2 Belegung (neu) | Alle sechs Reihenfolgen (Gesamtdauer / Mittel): 1-2-3: 14 / 11,00; 1-3-2: 14 / 10,00; 2-1-3: 12 / 9,67; 2-3-1: 12 / 9,33; 3-1-2: 15 / 10,00; 3-2-1: 13 / 9,33 | Minimum Gesamtdauer 12 h und Minimum Mittel 9,33 h werden von 2-3-1 erreicht |
| 3 Linienabgleich | Taktzeit 420 min / 42 | 10 min |
| 3 Linienabgleich | Σt = 4 + 8 + 3 + 7 + 2 + 2 + 7 + 3; Mindeststationenzahl 36 / 10 = 3,6 aufgerundet | 36 min; 4 |
| 3 Linienabgleich | RPW B = 8 + 7 + 2 + 7 + 3; A = 4 + 32 (alle Nachfolger, jeder einmal) | 27; 36 |
| 3 Linienabgleich | Stationszeiten A + C + E; B; D + F; G + H | 9; 8; 9; 10 min |
| 3 Linienabgleich | Wirkungsgrad 36 / (4 · 10); Verlustzeit 4 · 10 − 36; Verlustgrad 1 − 0,9 | 90 %; 4 min; 10 % |
| 3 Linienabgleich | Ausbringung 420 / 10; Takt bei 60 Stück: 420 / 60; 36 / 7 aufgerundet | 42 Stück; 7 min; 5,14 → mindestens 6 Stationen (B mit 8 min > Takt) |
| 3 Linienabgleich (neu) | Zwei parallele Stationen für B bei Takt 7 min: erlaubte Zeit 2 · 7 = 14 min ≥ 8 min; Abgabe alle 8 min / 2 = 4 min bei dieser Operation, Linientakt bleibt 7 min | 8 ≤ 14 erfüllt |
| 4 Engpass | DB je Fräsmaschinenstunde: 30 / 0,5; 40 / 1 | 60 €; 40 € |
| 4 Engpass | A zuerst: 1.200 · 0,5 = 600 h; Rest 400 h für B; 1.200 · 30 + 400 · 40 | 52.000 € |
| 4 Engpass | B zuerst: 800 h; Rest 200 h / 0,5 = 400 Stück A; 400 · 30 + 800 · 40; Differenz | 44.000 €; 8.000 € |
| 4 Engpass | Prüfung Drehen bei (1.200 ; 400): 1,0 · 1.200 + 0,5 · 400; DB je Drehstunde 30 / 1,0 und 40 / 0,5 | 1.400 h > 1.100 h; 30 €; 80 € |
| 4 Engpass | Schnittpunkt Fräsen/Drehen: 0,75 · x = 600; y = 1.000 − 0,5 · 800; Schnitt Fräsen/y = 800: x = (1.000 − 800) / 0,5 | (800 ; 600); (400 ; 800) |
| 4 Engpass | DB der Eckpunkte: 0; 30 · 1.100; 30 · 800 + 40 · 600; 30 · 400 + 40 · 800; 40 · 800 | 0; 33.000; 48.000; 44.000; 32.000 € |
| 4 Engpass | Auslastung im Optimum: Fräsen 0,5 · 800 + 600; Drehen 800 + 0,5 · 600 | 1.000 h; 1.100 h |
| 4 Engpass (neu) | Alle Schnittpunkte der sechs Geraden auf Zulässigkeit geprüft: genau 5 zulässige Eckpunkte; Beispiel unzulässig: Fräsgerade mit x = 1.200 → y = 1.000 − 0,5 · 1.200 | 400; Drehen 1.400 h > 1.100 h |
| 4 Engpass (neu) | Vollständiges Durchprobieren aller ganzzahligen (x ; y) im zulässigen Bereich | einziges Optimum (800 ; 600), 48.000 € |
| 5 Entlohnung (neu) | Arbeitswert aus Stufenwertzahlen 12 + 6 + 4 + 2 + 1 | 25 Punkte |
| 5 Entlohnung | Akkordrichtsatz 18,00 · 1,20; Minutenfaktor 21,60 / 60 | 21,60 €/h; 0,36 €/min |
| 5 Entlohnung | Normalleistung 480 / 3,0; Verdienst 480 · 0,36 (= 8 · 21,60) | 160 Stück; 172,80 € |
| 5 Entlohnung (neu) | Akkordsatz (Geldakkord) 3,0 · 0,36 | 1,08 € je Stück |
| 5 Entlohnung (neu) | 176 Stück: 176 · 3,0 = 528 min; Zeitgrad 528 / 480 (= 176 / 160); 528 · 0,36; 1,10 · 21,60 · 8; / 8; Mehrverdienst 190,08 − 172,80 | 110 %; 190,08 €; 190,08 €; 23,76 €/h; 17,28 € (10 %) |
| 5 Entlohnung | 144 Stück: 144 · 3,0 = 432 min; 432 / 480; 432 · 0,36; / 8 | 90 %; 155,52 €; 19,44 €/h |
| 5 Entlohnung | Zeitlohn 8 · 18,00; je Stück 144 / 160; 144 / 176; 144 / 144; Akkord je Stück 3,0 · 0,36; Zuschlag 172,80 − 144,00 | 144,00 €; 0,90 €; 0,82 € (0,818); 1,00 €; 1,08 €; 28,80 € |
| 5 Entlohnung (neu) | Mengenprämie mit Basismenge 160: (170 − 160) · 0,40; Tagesverdienst 144 + 4 | 4,00 €; 148,00 € |
| 5 Entlohnung | Ersparnis 12.000 · (0,03 − 0,02); · 25 €; · 40 %; / 5 | 120 Teile; 3.000 €; 1.200 €; 240 € |

## Zu entscheiden

1. **Umfang und Aufnahme:** Fünf Abschnitte, wie beauftragt. Abschnitt 2 (Gantt und Belegungsplan) und Abschnitt 4 (Ausbringungsoptimierung) sind in der Prüfung wahrscheinlich eher beiläufig gefragt; sie lassen sich bei Bedarf kürzen. Die lineare Optimierung ist bewusst auf zwei Produkte und zwei Restriktionen mit Eckpunktbetrachtung beschränkt, das Simplex-Verfahren wird nur genannt.
2. **Beispielwerte:** Zeiten, Mengen, Löhne, Akkordzuschlag von 20 %, Prämiensatz, Punkte, Stufen und Wertzahlen der Arbeitsbewertung sowie die Zuordnung „21 bis 30 Punkte = Lohngruppe 4“ sind erfundene Beispielwerte. Der Akkordzuschlag von 20 % ist ein gerundeter Illustrationswert; ich habe keine verbindliche Spanne genannt. Einverstanden?
3. **MPM (Abschnitt 1):** Ich verwende die Kürzel NF, AF, EF und SF und die Rechnung über Anfang-Anfang-Gewichte; ob die Prüfungsliteratur dieselben Kürzel und dieselbe Rechenweise zeigt, ist nicht an einer Quelle geprüft (die Gewichtsformeln selbst sind rechnerisch gegen die Ungleichungen abgesichert). Die Maximalabstand-Annahme („danach müsste das Teil erneut gereinigt werden“) ist erfunden und fachlich nur illustrativ. Die Schleifenrechnung bei Maximalabständen wird nur beschrieben (iterativ, mit Software), nicht an einem eigenen Beispiel mit wirksamer Rückkante durchgerechnet. Soll auf den Maximalabstand ganz verzichtet werden? Die Schreibweise „Mindest- und Maximalabstand“ folgt Ihrer Vorgabe; der Text nennt „Höchstabstand“ als Synonym.
4. **Gantt/Belegungsplan (Abschnitt 2):** Der Flow-Shop-Fall (alle Aufträge zuerst M1, dann M2, gleiche Reihenfolge) ist eine Vereinfachung ohne Rüst- und Transportzeiten. Die Regel der kürzesten Operationszeit ist hier auf die erste Maschine bezogen; im Abschnitt „Reihenfolgeregeln in der Werkstattsteuerung“ ist sie allgemein beschrieben. Das Fortschrittsbeispiel nutzt jetzt den Vorrichtungsbau C aus „Netzplantechnik“ (4 Tage), damit es dem Bestand entspricht. Die Reihenfolge nach dem Johnson-Verfahren (2 – 1 – 3) hätte hier ebenfalls 12 h Gesamtdauer, aber eine mittlere Durchlaufzeit von 9,67 h; ich erwähne das nicht im Text, da das Verfahren nicht im Stoff steht. Soll es doch genannt werden?
5. **Linienabgleich (Abschnitt 3):** Ich rechne nur nach Rangpositionswert; das Verfahren nach Kilbridge und Wester wird nur mit Namen und Grundidee (Spalten nach frühester Position, spaltenweise Belegung) genannt, die Auswahlregeln stehen bewusst nicht im Text, weil ich sie nicht an einer Quelle geprüft habe. Die Zuordnung „nach Helgeson und Birnie“ für den Rangpositionswert ist ebenfalls nicht an einer Quelle geprüft. Die Heuristik liefert hier das Optimum (4 Stationen); bei anderen Zeiten liefert sie das nicht immer. Soll dafür ein Gegenbeispiel in den Text? Den Fall paralleler Stationen beschreibt der Text nur als Ausweg, ohne die Stationenzahl für die Parallelauslegung neu zu rechnen. Wirkungsgrad, Taktzeit und Stationenzahl werden aus „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“ übernommen.
6. **Engpassrechnung (Abschnitt 4):** Die Absatzgrenzen sind zusätzlich zu den zwei Maschinen angesetzt, damit der zulässige Bereich fünf Eckpunkte hat. Das Beispiel knüpft an die Produkte A und B aus 2.2 an (30 € und 40 € Stückdeckungsbeitrag, 0,5 h und 1 h); die Absatzgrenzen und die zweite Maschine sind neu. Ich rechne mit teilbaren Mengen; die Eckpunkte sind zufällig ganzzahlig.
7. **Arbeitsbewertung und Entlohnung (Abschnitt 5):** Hier bin ich fachlich am wenigsten sicher; der Text ist nach der Fachprüfung bewusst allgemeiner gehalten.
   - Die vier Verfahren (Rangfolge- und Lohngruppenverfahren summarisch, Rangreihen- und Stufenwertzahlverfahren analytisch) und das Genfer Schema mit vier Hauptgruppen sind aus dem Gedächtnis beschrieben und nicht an einer Quelle geprüft. Die Stufenwertzahlen im Beispiel sind erfunden und mit „Beispiel“ gekennzeichnet; reale Systeme legen die Wertzahlen je Anforderungsart und Stufe in Tabellen fest.
   - Der Zeitgrad (Vorgabezeit / tatsächlich benötigte Zeit) ist nun eingeführt und vom Leistungsgrad der Zeitaufnahme abgegrenzt; die genaue Abgrenzung in der Prüfungsliteratur ist nicht an einer Quelle geprüft.
   - Der Akkordzuschlag ist als Zuschlag auf den Grundlohn beschrieben, der den Akkordrichtsatz ergibt; Regelungen dazu sind nicht dargestellt. Aussagen zu Mindestverdienst, Tarifvertrag und Betriebsvereinbarung sind gestrichen.
   Soll der Abschnitt vor Aufnahme von der Fachlehrkraft geprüft werden?
8. **Rechtsnahes:** Zulässigkeit von Akkordarbeit, Mindestlohn, Tarifverträge und Mitbestimmung bei Entgeltsystemen sind nicht enthalten (Paket P8). Einverstanden?
9. **Weiteres Vorgehen:** Nach Ihrer Freigabe würde ich wie bei P4 verfahren: Abschnitte in 9.1 bis 9.3 einarbeiten (LF, Hausregeln, Validierung, Import), danach Karteikarten und Quizfragen entwerfen (Rechenaufgaben: Gewicht und Puffer in der MPM, Belegungsplan mit Auslastung und Durchlaufzeit, RPW und Stationszuordnung, Wirkungsgrad, Deckungsbeitrag je Engpassstunde, Eckpunktoptimum, Akkordverdienst, Minutenfaktor, Zeitgrad, Prämie).

## Bestandsänderungen für die Projektleitung

Keine davon ist für die Einarbeitung der fünf Abschnitte zwingend; sie schärfen den Bestand an Stellen, die sich aus der Fachprüfung ergeben.

1. **Datei:** `content/technischer-fachwirt/hq2/9.2-produktionssteuerung.md`, Abschnitt „Reihenfolgeregeln in der Werkstattsteuerung“ (Prüfbefund B3).
   **Zitat:** „senkt im Schnitt die durchschnittliche Durchlaufzeit aller Aufträge“
   **Vorschlag:** „senkt an einer einzelnen Maschine die durchschnittliche Durchlaufzeit aller Aufträge“. Nur für eine Maschine ist das mathematisch garantiert; der neue Abschnitt „Gantt-Diagramm und Belegungsplan“ sagt es bereits so. Betroffene Quizfragen oder Karteikarten wären zu prüfen.
2. **Datei:** `content/technischer-fachwirt/hq2/9.1-produktionsplanung.md`, Abschnitt „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“ (Prüfbefund B5).
   **Zitat:** „der **Wirkungsgrad des Bandabgleichs** ist“
   **Vorschlag:** „der **Wirkungsgrad des Bandabgleichs** (Linienabgleich) ist“, damit die Brücke zum neuen Abschnitt „Linienabgleich“ auch im Bestand sichtbar ist. Rein redaktionell und optional (der neue Abschnitt schlägt die Brücke selbst).
3. **Datei:** `content/technischer-fachwirt/hq2/9.2-produktionssteuerung.md`, Abschnitt „Netzplantechnik“ (Prüfbefund D1).
   **Zitat:** „ist jeder **Vorgang** ein Knoten mit seiner **Dauer D**“
   **Vorschlag:** Keine Änderung nötig; der neue MPM-Abschnitt nutzt klein geschriebenes d und erklärt den Unterschied. Nur wenn der Bestand ohnehin angefasst wird: „Dauer d“ statt „Dauer D“ (die Tabellenspalte „D“ und der Vorgang D im Beispiel haben denselben Buchstaben). Wegen der Folgen für Tabelle, Karteikarten und Quizfragen nicht empfohlen.

## Prüfergebnis eingearbeitet

Grundlage: `docs/entwuerfe/pruefung-hq2.md`. Von 23 Befunden wurden 15 übernommen, 8 angepasst, 0 abgelehnt. Die Nummern entsprechen denen der Prüfung (A = Fehler, B = ungenau, C = fehlt, D = Stil).

| Nr. | Entscheidung | Begründung |
|---|---|---|
| A1 | angepasst | Der Widerspruch ist real. Statt eines neuen Vorgangs nutzt das Beispiel jetzt den vorhandenen Vorrichtungsbau C (4 Tage, Tag 2 bis 6): Soll am Tag 4 = 50 %, gemeldet 25 %, Rückstand 1 Tag; C ist kritisch, die Projektdauer wächst auf 16 Tage. Neu gerechnet; die Belegungsrechnung blieb unberührt. |
| A2 | übernommen | C dauert 3 Tage; Anfangsfolge z = 2 heißt, D beginnt, wenn C 2 Tage läuft. Beschreibung wörtlich nach Vorschlag („…Vorbereitung der Vorrichtung 2 Tage läuft; der Rest läuft parallel“). |
| A3 | angepasst | Widerspruch bestätigt. Der Text erklärt jetzt, dass bei zwei abwechselnd arbeitenden parallelen Stationen 2 · Taktzeit je Stück zur Verfügung stehen (8 ≤ 14 min), und dass der Satz „Takt nicht kürzer als der längste Arbeitsgang“ nur ohne Teilen oder Parallelisieren gilt. Die Bedingungsliste in der Einleitung wurde ebenfalls eingeschränkt. |
| A4 | übernommen | Beim Stufenwertzahlverfahren sind den Stufen vorgegebene Wertzahlen zugeordnet; „Stufe mal Gewicht“ entfällt. Das Zahlenergebnis (25 Punkte) bleibt, das Beispiel ist als vereinfacht mit erfundenen Wertzahlen gekennzeichnet. |
| A5 | angepasst | Vier Hauptgruppen des Genfer Schemas werden nur als Ordnungsrahmen genannt, die Unterarten mit „zum Beispiel“ abgeschwächt; das Beispiel fasst die Belastung ausdrücklich zu einer Anforderungsart zusammen. |
| A6 | übernommen | Der Satz mit „Tarifvertrag oder Betriebsvereinbarung“ ist gestrichen („die Ausgestaltung wird hier nicht behandelt“), der Schlusssatz lautet „Rechtliche Fragen zu Entgeltsystemen gehören nicht zu diesem Abschnitt.“ |
| B1 | übernommen | Allgemeine Regel eingeführt: Der Pfeil trägt das negative Gewicht der zugehörigen Mindestbeziehung mit z = z_max, für alle vier Beziehungen, mit Herleitung für AF und NF; das Beispiel (−5 = −(2 + 3)) wird als Normalfolge erklärt. Gewichtsregeln zusätzlich mit 20.000 Zufallsfällen geprüft. „Höchstabstand“ als Synonym ergänzt. |
| B2 | übernommen | Freier Puffer und SAZ für Vorgänge ohne Nachfolger beschrieben; Wert für F (14 − 14 = 0) im Beispiel hergeleitet. |
| B3 | angepasst | „Gesamtdurchlaufzeit“ ersetzt durch „Gesamtdauer des Belegungsplans“, Durchlaufzeit je Auftrag wie in 9.3 definiert. Die Aussage zur Regel der kürzesten Operationszeit ist eingeschränkt (nur für eine Maschine garantiert). Der Befund „Tie bei 9,33 h“ ist richtig, aber 3-2-1 hat 13 h Gesamtdauer; deshalb steht im Text, dass keine andere Reihenfolge beide Werte unterbietet (per Skript über alle sechs Reihenfolgen bestätigt). |
| B4 | angepasst | Kilbridge und Wester wird nur mit Namen und Grundidee (Spalten nach frühester Position, spaltenweise Belegung) genannt; die Auswahlregel innerhalb der Spalten steht nicht im Text, weil ich sie nicht sicher genug kenne. „Geht ähnlich vor“ ist gestrichen. |
| B5 | angepasst | „Linienabgleich (auch Band- oder Fließbandabgleich)“ und Verweis auf „Wirkungsgrad des Bandabgleichs“ aus 9.1 ergänzt. Den Begriff „Bandverlust“ nur als „teils auch … genannt“ aufgenommen, weil seine Verbreitung nicht gesichert ist. |
| B6 | übernommen | Zulässigkeitsprüfung eingefügt mit dem Beispiel Schnitt Fräsgerade/x = 1.200 → (1.200 ; 400), Drehen 1.400 h. Per Skript bestätigt: Von allen Geradenschnitten sind genau fünf zulässig. |
| B7 | übernommen | (a) „mindestens ein Optimum“ mit Hinweis auf parallele Kante; (b) Simplex-Satz nur noch „mehr als zwei Produkte“; (c) Rundung mit Einschränkung. |
| B8 | übernommen | Formulierung zu den widersprüchlichen Rangfolgen (A vor B je Fräsmaschinenstunde, B vor A je Drehmaschinenstunde) nach Vorschlag. |
| B9 | angepasst | Es wird mit 480 min bezahlter Zeit gerechnet; der Text erklärt, dass die Verteilzeit bereits in der Vorgabezeit steckt, und grenzt gegen die 420 min nutzbare Zeit der Taktrechnung ab. Die Pausenfrage wird nicht weiter ausgeführt. |
| B10 | übernommen | Hinweis „gleiche Stückzahl“ und Begründung des Akkordvorteils (Leistungsanreiz, Kostendegression) mit Verweis auf die Wirtschaftlichkeit ergänzt. |
| B11 | übernommen | (a) Rangreihenverfahren als analytisches Verfahren ergänzt, Lohngruppenverfahren als Katalogverfahren benannt. (b) Basismenge der Prämie auf 160 (Normalleistung) gesetzt: Prämie (170 − 160) · 0,40 € = 4,00 €, Tagesverdienst 148,00 € (neu gerechnet, Rechenprüfung angepasst). |
| C1 | übernommen | Zeitgrad = Vorgabezeit / tatsächlich benötigte Zeit eingeführt, vom Leistungsgrad der Zeitaufnahme abgegrenzt; Formel Zeitgrad · Akkordrichtsatz · Stunden = 1,10 · 21,60 € · 8 = 190,08 € ergänzt; Tabellenspalte „Leistung“ heißt jetzt „Zeitgrad“. |
| C2 | übernommen | Geldakkord mit Akkordsatz = Vorgabezeit · Minutenfaktor (3,0 min · 0,36 € = 1,08 €) verbunden. |
| D1 | angepasst | Dauer in den Formeln klein geschrieben (d_i, d_j) mit Hinweis auf „Netzplantechnik“ (dort D); in der Gewichtstabelle des Beispiels steht „5 (Dauer von D) + 1 − 3 (Dauer von E)“. Die Vorgangsbuchstaben A bis F bleiben. |
| D2 | übernommen | Die 13-spaltige Stundentabelle ist durch eine zweizeilige Tabelle mit Zeitintervallen je Maschine und Leerzeit ersetzt. |
| D3 | übernommen | Der Absatz zur Entlohnung ist in Zeitlohn, Akkordlohn, Akkordbeispiel, Zeitgrad, Prämienlohn und Wirtschaftlichkeit gegliedert; der Verweis auf „Produktivität und Wirtschaftlichkeit“ steht am Ende. |
| D4 | übernommen | „Eine andere Montagelinie der Vantera (Pumpenmontage, nicht die Linie aus „Fertigungsorganisation“)“. |
