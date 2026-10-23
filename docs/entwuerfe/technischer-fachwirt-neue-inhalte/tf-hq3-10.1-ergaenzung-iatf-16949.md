# Entwurf Technischer Fachwirt, IATF 16949 (konzeptuell): Ergänzung im Thema 10.1

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil D des Auftrags P-AV (Auswertung `docs/entwuerfe/technischer-fachwirt-r4-auswertung.md`, „P-TF3“, G-TF-06). Einzufügen in `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`: Abschnitt A **vor der Überschrift „### Audit-Arten und Auditablauf“** (Anker; die Theorie steht damit hinter „DIN EN ISO 9001:2015 — Anforderungen an ein Qualitätsmanagementsystem“ mit dem Absatz „Normstand“), B an die Karteikarten hinter K-10.1-32, C an das Quiz hinter Q-10.1-33. Bestand gezählt (Stand 23.10.2026): 32 Karteikarten (K-10.1-01 bis -32, lückenlos), 33 Quizfragen (Q-10.1-01 bis -33, lückenlos); `git log -S` auf K-10.1-33, Q-10.1-34 und F-HQ3-10 ergibt keine entfernten IDs. Die neuen IDs sind K-10.1-33 bis -40 (8 Karten) und Q-10.1-34 bis -43 (10 Quizfragen, davon 2 Kurzantworten). Die Fallaufgabe F-HQ3-10 (Bestand F-HQ3-01 bis -09) und die zwei Fachgesprächsfragen stehen in `tf-faelle-d.md`, die Rechtsangaben in `rechtsangaben-d.md`, die Ersetzungen im Bestand in `ersetzungen-d.json`. Der `rechtsstand` der berührten Dateien wird beim Einspielen gesetzt.

**Zweck.** Der Bestand behandelt ISO 9001, Audit-Arten (einschließlich des Lieferantenaudits der Kundschaft), FMEA, Regelkarten, Prozessfähigkeit und den 8D-Report, aber weder die IATF 16949 noch die übrigen Kernwerkzeuge der Automobilindustrie (APQP, PPAP, MSA), das VDA-Prozessaudit, die Rückverfolgbarkeit in der Lieferkette noch das Zusammenspiel von Produktsicherheit und Rückruf. Die Ergänzung wiederholt nichts aus dem Bestand (FMEA, SPC und Cpk stehen weiter unten und werden nur verwiesen); zu Thema 7.2 (ProdSG, CE-Kennzeichnung, Pflichten der Wirtschaftsakteure bei Maschinen) und Thema 3.1 (Produkthaftung, Ausschlussgründe, Reform) verweist sie und ergänzt nur den Gedanken, wie Rückverfolgung und Aufbewahrung die Eingrenzung und die Verteidigung unterstützen.

**Rechtsnah (R4) und konzeptuell.** Die IATF 16949:2016 ist kostenpflichtig; ihr Normtext wurde **nicht gelesen** und wird **nicht wiedergegeben**. Alle Aussagen zur IATF, zu den Kernwerkzeugen und zu den VDA-Bänden stehen in `rechtsangaben-d.md` als „vermutet“ (freie Quellen: IATF-Mitteilung SC-2026-005 vom Juli 2026, Startseite der IATF, VDA-QMC-Titelseite). Karten, Quiz, Fall und Fachgespräch enthalten keine Klauselnummern und keinen Norminhalt als Antwort. Gesetzesstellen (ProdSG, ProdHaftG, Verordnung (EU) 2023/988) stehen nur als Stützangabe in der Theorie. Rücknahme, Rückruf und Marktüberwachung stehen mit Geltungsbereich und Vorrang der Spezialregeln (Kraftfahrzeuge und ihre Bauteile haben ein eigenes Recht); für die Aussage zu diesem eigenen Recht gilt „vermutet“. Zeitkritisch (alle mit „Stand Oktober 2026, vor Verwendung prüfen“): zweite Ausgabe der IATF 16949 (Veröffentlichung für Mitte 2027 geplant), ISO 9001:2026 und ihre Übergangsfrist, Reform des Produkthaftungsgesetzes (Richtlinie (EU) 2024/2853, bis 09.12.2026 umzusetzen; vom Bundestag am 08.10.2026 beschlossen, Verkündung nicht festgestellt).

---

# Thema 10.1

## A. Theorie-Ergänzung 10.1 (einfügen vor „### Audit-Arten und Auditablauf“)

### IATF 16949: Aufbau, Zweck und Zertifizierung

Automobilzulieferer wie die Vantera Präzisionstechnik GmbH hören von ihrer Kundschaft häufig, eine ISO-9001-Zertifizierung genüge nicht, verlangt werde die **IATF 16949**. Der Abschnitt gibt einen Überblick nach verbreiteter Darstellung (Stand Oktober 2026, vor Verwendung prüfen); der Normtext ist kostenpflichtig und wird hier nicht wiedergegeben, auch Abschnittsnummern sind nicht Lerngegenstand.

Die IATF 16949 (Ausgabe 2016) ist eine Norm für Qualitätsmanagementsysteme in der Serien- und Ersatzteilfertigung der Automobilindustrie. Herausgeberin ist die **International Automotive Task Force (IATF)**, ein Zusammenschluss von Fahrzeugherstellern und Branchenverbänden, nicht die ISO; sie hat die frühere ISO/TS 16949 abgelöst. Sie steht nicht für sich allein: Nach verbreiteter Darstellung wird sie zusammen mit der ISO 9001:2015 angewendet und ergänzt deren Anforderungen um automobilspezifische. Ihr Zweck ist ein Qualitätsmanagementsystem, das Fehler vermeidet, Streuung und Verschwendung in der Lieferkette verringert und die Erwartungen der Fahrzeughersteller vereinheitlicht, damit nicht jede Kundschaft ein Lieferunternehmen nach eigenen Regeln beurteilen muss. Der Schwerpunkt liegt auf Fehlervermeidung statt Fehlererkennung, auf risikobasiertem Denken, auf geplanter Produkt- und Prozessentwicklung, auf der Steuerung der Lieferunternehmen sowie auf Rückverfolgbarkeit und Produktsicherheit.

**Zertifizierung.** Ein Zertifikat nach IATF 16949 vergeben nur **von der IATF anerkannte Zertifizierungsstellen**, und zwar nach den Regeln der IATF („Rules for achieving and maintaining IATF recognition“, derzeit die 6. Ausgabe, gültig seit 01.01.2025). Dafür eingesetzte Auditor:innen brauchen eine Zulassung der IATF. Ein ISO-9001-Zertifikat ersetzt das IATF-Zertifikat nicht. Zertifiziert werden nach verbreiteter Darstellung Standorte mit wertschöpfender Fertigung; unterstützende Funktionen an anderen Orten werden in das Audit einbezogen, aber nicht allein zertifiziert.

**Kundenspezifische Anforderungen.** Einzelne Fahrzeughersteller veröffentlichen eigene Zusatzanforderungen (englisch Customer-Specific Requirements, CSR), die ein Lieferbetrieb in sein System aufnehmen muss; sie werden bei Audits mitgeprüft. Daneben kann die Kundschaft selbst auditieren (Lieferantenaudit, zweite Seite, siehe den Abschnitt „Audit-Arten und Auditablauf“): Ein Zertifikat ersetzt es nicht automatisch, ob die Kundschaft zusätzlich prüft, entscheidet sie nach ihren Vorgaben.

**Pflicht oder Kundenanforderung?** Die IATF-Zertifizierung ist keine gesetzliche Pflicht, sondern eine Anforderung der Kundschaft, meist vertraglich oder als Voraussetzung der Listung. Ob ein Lieferbetrieb wie Vantera sie braucht, hängt von der Kundschaft ab: Manche verlangt sie, anderen genügen ISO 9001 und eigene Audits (nach verbreiteter Darstellung, Stand Oktober 2026, vor Verwendung prüfen). Die Forderung wandert teils die Lieferkette hinab.

**Stand.** Die IATF überarbeitet die Norm. Nach ihrer Mitteilung vom Juli 2026 ist die Veröffentlichung einer zweiten Ausgabe für Mitte 2027 geplant (die Termine sind unverbindlich); Schwerpunkte sind unter anderem die Qualität von Software, die Steuerung tieferer Lieferstufen, der Anlauf neuer Produkte und die kundenspezifischen Anforderungen. Die Übergangszeit soll mit dem Ende der Übergangsfrist der ISO 9001:2026 abgestimmt werden (siehe „Normstand“ weiter oben). Bis dahin gilt die Ausgabe 2016.

### Methoden im Überblick: APQP, PPAP, FMEA, MSA, SPC und VDA-Verfahren

Die Automobilindustrie fasst nach verbreiteter Darstellung fünf Methoden als **Kernwerkzeuge** (Core Tools) zusammen (Stand Oktober 2026, vor Verwendung prüfen). Sie sind Hilfsmittel, um zu erfüllen, was das Qualitätsmanagementsystem verlangt; welche Fassung einer Methode gilt, legt die Kundschaft fest.

- **APQP** (Advanced Product Quality Planning) ist die geplante Entwicklung von Produkt und Prozess in aufeinanderfolgenden Phasen, von den Anforderungen der Kundschaft bis zum Serienanlauf, mit Meilensteinen und Verantwortlichen. Ein zentrales Ergebnis ist der **Kontrollplan**: Er legt je Prozessschritt Merkmale, Messmittel, Prüfhäufigkeit und die Reaktion bei Abweichung fest.
- **FMEA** wurde im Abschnitt „Qualitätswerkzeuge“ eingeführt. In der Automobilindustrie unterscheidet man Konstruktions- und Prozess-FMEA. Nach verbreiteter Darstellung bewertet das gemeinsame FMEA-Handbuch von AIAG und VDA Maßnahmen nicht mehr mit der Risikoprioritätszahl, sondern mit einer Handlungsprioritätsstufe (hoch, mittel, niedrig). Die Ergebnisse fließen in den Kontrollplan ein.
- **MSA** (Measurement Systems Analysis, Messsystemanalyse) prüft, ob ein Messsystem für die Messaufgabe geeignet ist: Seine eigene Streuung (Wiederholbarkeit, Vergleichbarkeit zwischen Prüfpersonen, Stabilität) wird mit der Toleranz oder der Prozessstreuung verglichen. Im VDA-Umfeld heißt das Gegenstück „Prüfprozesseignung“ (VDA Band 5). Ein Messsystem, das selbst stark streut, täuscht Streuung und Lage des Prozesses vor; Regelkarte und Cpk sind nur so belastbar wie das Messsystem.
- **SPC** ist die statistische Prozesslenkung mit Regelkarten und Prozessfähigkeit (siehe die Abschnitte „Qualitätsregelkarten und statistische Prozesslenkung“ und „Prozessfähigkeit: Cp und Cpk“); Richtwerte und Auswertung legt die Kundschaft fest.
- **PPAP** (Production Part Approval Process) ist das Nachweisverfahren, dass der Serienprozess Teile liefert, die alle Anforderungen erfüllen: Der Lieferbetrieb legt der Kundschaft Muster und Unterlagen vor (zum Beispiel Messberichte, FMEA, Kontrollplan, Fähigkeitsnachweise), die Kundschaft gibt frei. Das gilt nicht nur vor der ersten Lieferung, sondern je nach Kundenvorgabe auch bei Änderungen, etwa bei einem neuen Lieferbetrieb für den Werkstoff, einem geänderten Fertigungsverfahren oder einem verlagerten Prozess. Das Gegenstück im VDA-Umfeld ist die Produktionsprozess- und Produktfreigabe (VDA Band 2).

Die Methoden bauen aufeinander auf: Planung (APQP) mit FMEA und Kontrollplan, Eignung der Messsysteme (MSA), Bemusterung und Freigabe (PPAP), laufende Überwachung der Serie (SPC). Wird eine Stufe ausgelassen, leidet häufig die nächste: Eine Regelkarte ohne geeignetes Messsystem oder ein Kontrollplan ohne FMEA zeigt Sicherheit, die nicht besteht.

**VDA-Verfahren.** Der **VDA** (Verband der Automobilindustrie) gibt über das VDA QMC Bände zum Qualitätsmanagement heraus, darunter das Prozessaudit (VDA 6.3, 4. Ausgabe vom Januar 2023) und die Prüfprozesseignung (VDA 5, 3. Ausgabe vom Juli 2021). Das **Prozessaudit nach VDA 6.3** ist ein Audit einzelner Prozesse (siehe „Audit-Arten und Auditablauf“), das Fahrzeug- und Systemhersteller häufig als Lieferantenaudit, aber auch intern einsetzen. Nach verbreiteter Darstellung betrachtet es Prozesse von der Projektplanung über die Serienfertigung bis zur Kundenbetreuung anhand von Fragen und fasst das Ergebnis in einer Bewertung zusammen; deren Regeln stehen im Band und werden hier nicht wiedergegeben. Für Vantera heißt das: Neben Zertifikaten zählt, ob sich die Methoden im Fertigungsalltag nachweisen lassen.

### Rückverfolgbarkeit, Produktsicherheit und Rückruf in der Lieferkette

**Rückverfolgbarkeit** ist die Möglichkeit, aus Aufzeichnungen Herkunft, Verarbeitung und Verbleib eines Produkts nachzuvollziehen (Stand Oktober 2026, vor Verwendung prüfen; die Ausgestaltung legt die Kundschaft fest). Man unterscheidet die **Rückwärtsverfolgung** (von einem Teil zu Werkstoffcharge, Maschine, Schicht, Werkzeug und Prüfdaten) und die **Vorwärtsverfolgung** (von einer Werkstoffcharge zu allen daraus gefertigten Losen und zu deren Lieferungen). Voraussetzung ist eine eindeutige Kennzeichnung durch Chargen-, Los- oder Seriennummern, die bei jedem Übergang erfasst wird: Wareneingang, Fertigungsauftrag, Wärmebehandlung, Prüfung, Versand. Rückstellmuster und aufbewahrte Prüfaufzeichnungen ergänzen sie. Wie lange sie aufzubewahren sind, legt die Kundschaft fest; für sicherheitsrelevante Teile sind lange Fristen üblich. Der Nutzen liegt in der **Eingrenzung**: Ist eine Werkstoffcharge fehlerhaft, zeigt die Vorwärtsverfolgung, welche Lose und welche Menge betroffen sind und wo sie liegen. *Beispiel:* Fällt bei einer Welle eine Härteabweichung auf, zeigt die Rückwärtsverfolgung, in welchem Ofenlauf sie behandelt wurde; die Vorwärtsverfolgung zeigt, welche anderen Teile im selben Ofenlauf lagen und wohin sie geliefert wurden. Fehlt die Zuordnung, müssen zur Sicherheit alle Teile eines Zeitraums als betroffen gelten.

**Produktsicherheit.** Merkmale, deren Abweichung die Sicherheit, die Zulassung oder die Funktion eines Fahrzeugs wesentlich beeinträchtigen kann, kennzeichnet die Kundschaft gesondert (oft in der Zeichnung; die Symbole sind kundenspezifisch). Solche **besonderen Merkmale** werden in FMEA und Kontrollplan geführt und enger gelenkt, etwa durch höhere Prüfhäufigkeit, statistische Überwachung und nachgewiesene Messsystemeignung. Nach verbreiteter Darstellung verlangt die IATF-Norm außerdem festgelegte Abläufe für produktsicherheitsrelevante Produkte und Prozesse und einen Notfallplan, der Zuständigkeiten, Meldewege und Entscheidungskriterien regelt.

**Rückruf in der Lieferkette.** Das Produktsicherheitsrecht unterscheidet die **Rücknahme vom Markt** (eine Maßnahme, die verhindern soll, dass ein in der Lieferkette befindliches Produkt bereitgestellt wird) vom **Rückruf** (eine Maßnahme, die auf die Rückgabe eines Produkts zielt, das den Endnutzer:innen schon bereitgestellt wurde; Stützangabe § 2 Abs. 1 Nr. 22 und 23 ProdSG; Stand Oktober 2026, vor Verwendung prüfen). Wer einschreiten darf und welche Pflichten gelten, hängt vom Produkt ab. Das ProdSG erfasst nur Produkte aus bestimmten Richtlinien (zum Beispiel Maschinen, Druckgeräte, Spielzeug; Stützangabe § 1 Abs. 1, 3) und lässt Zuständigkeiten unberührt, die andere Vorschriften zuweisen (§ 25 Abs. 1). Die Verordnung (EU) 2023/988 über die Sicherheit von Verbraucherprodukten gilt nur, soweit es im Unionsrecht keine spezifischen Sicherheitsbestimmungen für das Produkt gibt, und für Produkte unter Harmonisierungsrechtsvorschriften gelten ihre Herstellerpflichten (Kapitel III Abschnitt 1) nicht (Stützangabe Art. 2 Abs. 1). Für Kraftfahrzeuge und ihre Systeme und Bauteile besteht nach verbreiteter Darstellung ein eigenes Genehmigungs- und Marktüberwachungsrecht (Verordnung (EU) 2018/858), das nach dem Vorrang der Spezialregeln den allgemeinen Regeln vorgeht und in Deutschland mit dem Kraftfahrt-Bundesamt eine eigene Behörde hat. Wo die allgemeine Marktüberwachung gilt, können die Behörden für Produkte unter Harmonisierungsrechtsvorschriften unter anderem die Rücknahme vom Markt oder den Rückruf verlangen (Stützangabe § 8 Marktüberwachungsgesetz mit Art. 16 Abs. 3 Buchstabe c der Verordnung (EU) 2019/1020). Bei Bremsteilen in Fahrzeugen liegt eine Rückrufmaßnahme deshalb in der Regel beim Fahrzeughersteller, in Abstimmung mit dem Systemhersteller und der zuständigen Behörde; das ist eine Einzelfallfrage. Soweit die Verordnung (EU) 2023/988 für ein Verbraucherprodukt gilt, verlangt sie vom Hersteller unter anderem eine Typen-, Chargen- oder Seriennummer oder ein anderes Element zur Identifizierung (auf dem Produkt, sonst auf der Verpackung oder in einer Unterlage) und unverzügliches Handeln mit Korrekturmaßnahmen bis zum Rückruf sowie Information der Verbraucher und Behörden, wenn er ein Produkt für gefährlich hält (Art. 9 Abs. 5 und 8). Der Zulieferer wirkt über die Qualitätssicherungsvereinbarung mit der Kundschaft mit: Er meldet Abweichungen an gelieferten Teilen unverzüglich, grenzt die Menge über die Rückverfolgung ein und liefert Untersuchungsergebnisse. Wer die Kosten einer Maßnahme trägt, richtet sich nach Vertrag und Gesetz im Einzelfall.

**Haftung.** Zur Produkthaftung des Herstellers eines Teilprodukts, zu den Ausschlussgründen und zur Reform siehe Thema 3.1 „Bürgerliches Recht und Handelsrecht“ im Fachgebiet Recht und Steuern. Für diesen Abschnitt zählt der Zusammenhang mit der Rückverfolgbarkeit: Streiten die Parteien über einen Ausschlussgrund, trägt der Hersteller die Beweislast (Stützangabe § 1 Abs. 4 Satz 2 ProdHaftG). Lückenlose Aufzeichnungen helfen, zu zeigen, welche Teile betroffen sind und in welchem Zustand sie in Verkehr gebracht wurden. Ansprüche erlöschen grundsätzlich zehn Jahre nach dem Inverkehrbringen (Stützangabe § 13 Abs. 1 ProdHaftG); das kann ein Grund für lange Aufbewahrungsfristen sein, die Kundschaft legt sie fest. Das Produkthaftungsrecht wird aufgrund der Richtlinie (EU) 2024/2853 neu gefasst, die bis zum 09.12.2026 umzusetzen ist: Der Bundestag hat das Gesetz am 08.10.2026 beschlossen, eine Verkündung ist nicht festgestellt, und das neue Recht soll nach den vorliegenden Angaben für ab dem 09.12.2026 in Verkehr gebrachte Produkte gelten; die Angaben in diesem Kurs beschreiben das bisherige Gesetz (Stand Oktober 2026, vor Verwendung prüfen). Zur Produktsicherheit von Maschinen und zur CE-Kennzeichnung siehe Thema 7.2 „Betriebsmittel und Instandhaltung“ im Fachgebiet Fertigungs- und Betriebstechnik, zur Bewertung von Lieferunternehmen Thema 8.2 „Materialwirtschaft und Beschaffung“ im Fachgebiet Absatz-, Materialwirtschaft und Logistik.

## B. Karteikarten 10.1 (anhängen)

#### K-10.1-33
**Frage:** Was ist die IATF 16949, und in welchem Verhältnis steht sie zur ISO 9001?
**Antwort:** Eine Norm für Qualitätsmanagementsysteme der Automobil-Lieferkette, herausgegeben von der International Automotive Task Force, nicht von der ISO. Nach verbreiteter Darstellung wird sie zusammen mit der ISO 9001 angewendet und ergänzt sie um automobilspezifische Anforderungen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.1-34
**Frage:** Wer darf ein Zertifikat nach IATF 16949 vergeben, und ist die Zertifizierung gesetzlich vorgeschrieben?
**Antwort:** Nur eine von der IATF anerkannte Zertifizierungsstelle, nach den Regeln der IATF. Die Zertifizierung ist keine gesetzliche Pflicht, sondern eine Anforderung der Kundschaft; ein ISO-9001-Zertifikat ersetzt sie nicht.
`schwierigkeit: mittel` · `bloom: erinnern`

#### K-10.1-35
**Frage:** Was sind kundenspezifische Anforderungen (CSR) im Umfeld der IATF 16949?
**Antwort:** Zusätzliche Anforderungen einzelner Fahrzeughersteller, die ein Lieferbetrieb über die Norm hinaus in sein Qualitätsmanagementsystem aufnehmen und einhalten muss. Sie werden bei Audits mitgeprüft.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.1-36
**Frage:** Welche fünf Methoden gelten in der Automobilindustrie als Kernwerkzeuge (Core Tools)?
**Antwort:** APQP (Planung von Produkt und Prozess), PPAP (Bemusterung und Serienfreigabe), FMEA (Fehlermöglichkeiten bewerten), MSA (Eignung des Messsystems prüfen) und SPC (laufende statistische Prozesslenkung in der Serie).
`schwierigkeit: schwer` · `bloom: erinnern`

#### K-10.1-37
**Frage:** Wozu dient eine Messsystemanalyse (MSA), und warum ist sie vor einer Prozessfähigkeitsrechnung wichtig?
**Antwort:** Sie prüft, ob ein Messsystem für seine Messaufgabe geeignet ist, ob also seine eigene Streuung gegenüber Toleranz oder Prozessstreuung klein genug ist. Ein stark streuendes Messsystem täuscht Prozessstreuung vor und macht Cpk und Regelkarte unzuverlässig.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.1-38
**Frage:** Was ist ein Prozessaudit nach VDA 6.3, und wer setzt es häufig ein?
**Antwort:** Ein Audit einzelner Prozesse nach einem Band des Verbands der Automobilindustrie, das Prozesse von der Planung bis zur Serienfertigung anhand von Fragen bewertet. Fahrzeug- und Systemhersteller setzen es häufig als Lieferantenaudit ein, es dient aber auch intern.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.1-39
**Frage:** Was bedeutet Rückverfolgbarkeit, und worin unterscheiden sich Rückwärts- und Vorwärtsverfolgung?
**Antwort:** Aus Aufzeichnungen sind Herkunft, Verarbeitung und Verbleib eines Produkts nachvollziehbar. Rückwärts: vom Teil zu Werkstoffcharge, Maschine und Prüfdaten. Vorwärts: von einer Charge zu allen daraus gefertigten Losen und Lieferungen. So wird die betroffene Menge eingegrenzt.
`schwierigkeit: mittel` · `bloom: verstehen`

#### K-10.1-40
**Frage:** Worin unterscheiden sich Rücknahme vom Markt und Rückruf im Produktsicherheitsrecht?
**Antwort:** Die Rücknahme soll verhindern, dass ein noch in der Lieferkette befindliches Produkt bereitgestellt wird. Der Rückruf zielt auf die Rückgabe eines Produkts, das den Endnutzer:innen schon bereitgestellt wurde.
`schwierigkeit: mittel` · `bloom: erinnern`

## C. Quiz 10.1 (anhängen)

#### Q-10.1-34 · Multiple Choice
**Frage:** Ein Automobilzulieferer verlangt von der Vantera Präzisionstechnik GmbH ein Zertifikat nach IATF 16949; Vantera besitzt ein Zertifikat nach ISO 9001:2015. Welche Aussage trifft zu?
- [ ] Das ISO-9001-Zertifikat gilt automatisch auch als IATF-Zertifikat.
- [x] Nur eine von der IATF anerkannte Stelle darf IATF-Zertifikate ausstellen.
- [ ] Das IATF-Zertifikat erteilt eine Behörde auf Antrag nach einer Prüfung.
- [ ] Vantera kann sich das Zertifikat durch ein internes Audit selbst ausstellen.
**Erklärung:** Die IATF 16949 wird von der International Automotive Task Force herausgegeben, nicht von der ISO. Zertifikate stellen nur von der IATF anerkannte Zertifizierungsstellen aus; ein ISO-9001-Zertifikat ersetzt sie nicht, und es handelt sich nicht um eine behördliche Erlaubnis, sondern um eine Anforderung der Kundschaft.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-35 · Zuordnung
**Anweisung:** Ordne die Kernwerkzeuge der Automobilindustrie ihrer Aufgabe zu.
- APQP ↔ Geplante Entwicklung von Produkt und Prozess mit Kontrollplan
- PPAP ↔ Nachweis und Freigabe der Serienfertigung durch die Kundschaft
- MSA ↔ Prüfung, ob ein Messsystem für die Messaufgabe geeignet ist
- SPC ↔ Laufende Überwachung des Serienprozesses mit Stichproben
**Erklärung:** Die Werkzeuge bauen aufeinander auf: Planung und Kontrollplan (APQP), Messsystemeignung (MSA), Bemusterung und Freigabe (PPAP) und Überwachung der laufenden Serie (SPC).
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.1-36 · Wahr/Falsch
**Aussage:** Besitzt ein Lieferbetrieb ein gültiges IATF-16949-Zertifikat, entfällt dadurch automatisch das Lieferantenaudit der Kundschaft.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Das Zertifikat ersetzt das Lieferantenaudit nicht automatisch. Ob die Kundschaft zusätzlich prüft, etwa mit einem Prozessaudit nach VDA 6.3 oder wegen eigener kundenspezifischer Anforderungen, entscheidet sie nach ihren Vorgaben.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-10.1-37 · Mehrfachauswahl
**Frage:** Vantera liefert Serienteile an eine Kundschaft, die nach IATF 16949 zertifiziert ist. Welche Änderungen sind üblicherweise vorab mit der Kundschaft abzustimmen, weil sie eine neue Bemusterung auslösen können? Maßgeblich sind die Vorgaben der Kundschaft.
- [x] Wechsel auf eine andere Anlage für die Oberflächenbeschichtung der Teile
- [x] Verlagerung der Teilefertigung an einen anderen Standort
- [ ] Neue Beschriftung der Regale im Fertigwarenlager ohne Änderung der Verpackung
- [x] Änderung der Härtetemperatur im Wärmebehandlungsverfahren
- [ ] Austausch des Druckers in der Qualitätssicherung gegen ein neueres Modell
**Erklärung:** Änderungen an Fertigungsverfahren, Anlage und Fertigungsort können die Eigenschaften der Teile verändern; deshalb stimmt man sie mit der Kundschaft ab und weist die Eignung gegebenenfalls neu nach. Regalbeschriftung und Bürotechnik haben keinen Einfluss auf Eigenschaften der Teile.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-38 · Sortieren
**Anweisung:** Bringe die typischen Schwerpunkte der Kernwerkzeuge in die Reihenfolge von der Planung bis zur Überwachung einer neuen Serie.
1. Anforderungen der Kundschaft klären und Planung von Produkt und Prozess beginnen
2. Prozess-FMEA und Kontrollplan erstellen
3. Muster und Unterlagen zur Serienfreigabe bei der Kundschaft vorlegen
4. Serienprozess mit Regelkarten überwachen
**Erklärung:** Typischerweise wird zuerst geplant (APQP), dann werden Risiken bewertet und Prüfungen festgelegt (FMEA, Kontrollplan). Vor der Serienlieferung steht die Bemusterung und Freigabe (PPAP); danach überwacht man die laufende Serie (SPC). In der Praxis überlappen sich die Schritte.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-39 · Multiple Choice
**Frage:** Die Kundschaft kennzeichnet in der Zeichnung einer Getriebewelle die Zahnflankengeometrie der Verzahnung als sicherheitsrelevantes Merkmal. Was folgt daraus üblicherweise für Vantera?
- [ ] Das Merkmal darf wie jedes andere Maß nur gelegentlich mit Stichproben geprüft werden.
- [ ] Die Verantwortung geht auf die Kundschaft über, weil sie das Merkmal ausgewählt hat.
- [x] Das Merkmal wird in FMEA und Kontrollplan besonders geführt und enger gelenkt.
- [ ] Vantera darf die Toleranz erweitern, wenn die Prüfung zu aufwendig ist.
**Erklärung:** Besondere Merkmale werden gesondert gekennzeichnet, in FMEA und Kontrollplan geführt und enger gelenkt, etwa mit höherer Prüfhäufigkeit und nachgewiesener Messsystemeignung. Die Kundschaft legt die Toleranz fest; Vantera bleibt für die Fertigung verantwortlich.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-40 · Entweder-Oder
**Frage:** Ein Fahrzeughersteller trifft Maßnahmen wegen fehlerhafter Bremsteile. Welche Maßnahme ist ein Rückruf?
- [x] Bereits verkaufte Fahrzeuge werden zum Tausch der Teile in die Werkstätten gerufen.
- [ ] Noch nicht ausgelieferte Fahrzeuge werden beim Händler gestoppt und zur Prüfung zurückgehalten.
**Erklärung:** Ein Rückruf zielt auf die Rückgabe von Produkten, die den Endnutzer:innen schon bereitgestellt wurden. Das Stoppen von Fahrzeugen, die noch in der Lieferkette stehen, ist eine Rücknahme vom Markt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-41 · Kurzantwort
**Frage:** Ein Fertigungslos von 8.400 Teilen wurde laut belegter Zuordnung zu 40 % aus Stangencharge A, zu 35 % aus Charge B und zu 25 % aus Charge C gefertigt (Beispielwerte, kein Ausschuss). Charge B erweist sich als fehlerhaft. Wie viele Teile des Loses sind betroffen? Antworte als Zahl.
**Akzeptierte Antworten:** 2.940; 2940; 2.940 Teile; 2940 Teile; 2.940 Stück; 2940 Stück
**Erklärung:** Betroffen sind die Teile aus Charge B: 35 % von 8.400 Teilen = 0,35 · 8.400 = 2.940 Teile. Nur weil die Zuordnung belegt ist, lässt sich die Menge so eingrenzen; fehlt sie, müsste man das ganze Los mit 8.400 Teilen als betroffen behandeln. Typischer Fehler: 8.400 als Antwort nennen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-10.1-42 · Kurzantwort
**Frage:** Wie lautet die Abkürzung der englischen Bezeichnung für das Verfahren, in dem ein Lieferbetrieb der Kundschaft nachweist, dass sein Serienprozess Teile liefert, die alle Anforderungen erfüllen, und von ihr die Freigabe erhält?
**Akzeptierte Antworten:** PPAP; Production Part Approval Process
**Erklärung:** PPAP steht für Production Part Approval Process. Der Lieferbetrieb legt Muster und Unterlagen vor, die Kundschaft gibt die Serienfertigung frei; je nach Vorgabe gilt das auch bei bestimmten Änderungen.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-10.1-43 · Lückentext (Wortauswahl)
**Text:** Ob ein Messsystem für seine Messaufgabe geeignet ist, wird mit einer ___Messsystemanalyse___ geprüft.
**Zusätzliche Begriffe:** Regelkarte; Bemusterung; Ursachenanalyse
**Erklärung:** Die Messsystemanalyse (MSA) vergleicht die Streuung des Messsystems mit Toleranz oder Prozessstreuung. Die Regelkarte überwacht dagegen den Prozess, nicht das Messsystem.
`schwierigkeit: leicht` · `bloom: erinnern`
