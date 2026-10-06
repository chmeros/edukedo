# Prüfliste für Freigabewelle 3 — Recht, Norm und Fachkenntnis

Stand 06.10.2026 · Vorbereitung für die Fachprüfung der **noch gesperrten** Einheiten (Rahmenentscheidung R4: *was die Fachkenntnis übersteigt, bleibt ungeprüft und wird nicht freigeschaltet*). Diese Liste ist nach **Fachgebieten der Prüfenden** geordnet, damit jede Person nur ihren Teil bekommt. Die ausführlichen Prüfblätter (alle Fragen mit Erklärungen und ⚠-Hinweisen) liegen in `docs/pruefblaetter/`; die Gesamtübersicht steht in [freigabe.md](freigabe.md).

**Umfang:** 11 Instrumente (44 Zuordnungsfragen), 3 Troubleshooting-Sets (je 10 Fälle) und 6 Begriffe-Duelle (je 20 Fragen). Alle sind im Kurs weder sichtbar noch im Lernen-Quiz; die Fragen sind inaktiv importiert (F-186).

## 1. So läuft eine Prüfung

1. Die prüfende Person bekommt das Prüfblatt ihres Kurses (Links unten) und liest nur die genannten Einheiten.
2. Je Frage genügt ein Vermerk: **frei** · **ändern (mit Text)** · **streichen**. Bei den Duellen genügt die Frage-Nummer.
3. Die Rückmeldung geht an dich; ich setze die Änderungen um (Markdown bzw. Duell-Datei), importiere neu und schalte frei: `KURS_ENTWURF` → `KURS_ANGEBOT`, `pnpm db:freigeben <kurs> <typ>`, `pnpm db:apply-kurs-metadata`, bei Sets zusätzlich `pnpm db:seed-games`.
4. Teilfreigaben sind möglich: Ein Duell kann um einzelne Fragen gekürzt werden (z. B. Handels-Duell ohne die Zollrecht-Fragen 18–20), ein Instrument nur komplett oder gar nicht.

## 2. Nach Fachgebiet der Prüfenden

### A. Arbeits- und Berufsbildungsrecht (AEVO, Prüfblatt [10](10-aevo.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Regelwerke der Berufsausbildung (`regelwerke`) | 4 Fragen | Zwei eigene Konkretisierungen (10-Stunden-Schicht, Wochenendeinsatz einer 17-Jährigen) als Anwendungsfälle des Jugendarbeitsschutzes; Aussage, der Rahmenlehrplan sei kein Bundesrecht |
| Begriffe-Duell „Recht der Berufsausbildung“ | 20 Fragen | Zuordnung von Paragrafen aus dem Kurs, Betriebsratsanhörung (§ 102 BetrVG) in der Probezeit, eigene Falsch-Antworten (Distraktoren) |

### B. Sozialrecht (Gesundheit/Soziales, Prüfblatt [11](11-gesundheit-soziales.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Kostenträger (`kostentraeger`) | 4 Fragen | Häusliche Krankenpflege als GKV-Leistung (Schlussfolgerung aus dem Kurs); Überschneidung von PKV-Begriffen; „kommunaler Träger“ in Q-4.2-16 |
| Begriffe-Duell „Gesundheits- und Sozialsystem“ | 20 Fragen | Probezeit sechs Monate beim Arbeitsverhältnis, Kündigungsschutz ohne Betriebsgrößenangabe, „Mitarbeitervertretung“ statt Betriebsrat |

### C. Fracht-, Zoll- und Außenhandelsrecht (Prüfblätter [13](13-industriefachwirt.md), [16](16-transport-logistik.md), [17](17-handelsfachwirt.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Incoterms (`incoterms`, Industriefachwirt) | 4 Fragen | Nur eigene Worte (ICC-Regelwerk geschützt); FOB-Aussage zum Seetransport; bewusst keine Aussage zum Gefahrenübergang bei CIF |
| Begriffe-Duell „Spedition und Fracht“ (Transport/Logistik) | 20 Fragen | Fragen 1–3 HGB-Frachtrecht (Speditions- gegen Frachtvertrag, Selbsteintritt, grobe Fahrlässigkeit), 4 und 6 CMR (inkl. „Beweisurkunde, kein Wertpapier“), 5 Haftungsversicherungen, 17–19 Zollrecht (Versandverfahren, EORI/ATLAS, Präferenznachweis gegen Ursprungszeugnis) |
| Begriffe-Duell „Handel: ähnlich, aber nicht gleich“ (Handelsfachwirt) | 20 Fragen | Nur die Fragen 18–20 (CIF gegen FOB, Dokumentenakkreditiv gegen Inkasso, präferenzieller Ursprung) berühren Außenhandelsrecht; die übrigen 17 sind kurstheoretisch. **Teilfreigabe ohne 18–20 möglich** |

### D. Miet-, WEG-, Bau- und Maklerrecht (Immobilienfachwirt, Prüfblatt [18](18-immobilienfachwirt.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Wege der Mieterhöhung (`mieterhoehung`) | 4 Fragen | Kurstext nennt Paragrafen und Zahlen (Kappungsgrenzen, Sperrfrist, Modernisierungsumlage, Staffelabstand); Rechtsstand; Ausschluss der Vergleichsmieterhöhung bei Staffel-/Indexmiete nur als „grundsätzlich“ |
| Betriebskosten (`betriebskosten`) | 4 Fragen | Dreiteilung umlagefähig / nicht umlagefähig / verbrauchsabhängig (Heizkostenverordnung) überschneidet sich; Beispiele wie „Reparatur Treppengeländer“ nicht im Kurstext |
| WEG-Organe (`wegorgane`) | 4 Fragen | **Theorie zum Verwaltungsbeirat fehlt** (nur eine Aussage in Q-4.2-12); Abberufung des Verwalters bei der Versammlung abgeleitet; „zertifizierter Verwalter“ verkürzt |
| Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich“ | 20 Fragen | Rechtsbezug in 2–5 (Grundschuld/Hypothek, Gemeinschaftsformen, Standesregeln, nichtig/anfechtbar), 7–9 (Mieterhöhung, Kündigung, umlagefähig), 13–14 (Bauplanung/Bauordnung), 18 (Makler), 20 (Energieausweis in der Anzeige; Rechtsgrundlage bewusst weggelassen) |

### E. Versicherungs-, Beratungs- und Steuerrecht (Prüfblatt [19](19-versicherungen-finanzanlagen.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Drei-Schichten-Modell der Altersvorsorge (`altersvorsorge`) | 4 Fragen | Zuordnung von Direktversicherung, Pensionsfonds, Zulagen und Immobilienvermögen (teils abgeleitet); „nicht vererbbar“ absoluter formuliert als der Kurs („grundsätzlich“); Reformvorhaben nicht berücksichtigt |
| Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich“ | 20 Fragen | Gegenlesen vor allem 1 (Äquivalenz-/Solidarprinzip), 4 (Basisrente/Riester), 5 (BU/Erwerbsminderung, Verweisbarkeit), 11 (Dokumentation/Beratung), 12 (Anzeigepflichten und Folgen), 13 (Regress), 16 (Unterversicherungsverzicht) |

### F. Normen (technische Normung)

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Instandhaltung nach DIN 31051 (`instandhaltung`, Technischer Fachwirt, Prüfblatt [14](14-technischer-fachwirt.md)) | 4 Fragen | Begriffe Wartung, Inspektion, Instandsetzung, Verbesserung in der Kursfassung; Beispiele ohne Kursbeleg (Dichtungen, Schutzabdeckung u. a.); Grenzfälle (TPM-Reinigung = Wartung, Prüfung vor Schichtbeginn = Inspektion) |
| DIN-276-Kostengruppen (`kostengruppen`, Immobilienfachwirt, Prüfblatt [18](18-immobilienfachwirt.md)) | 4 Fragen | Sieben Gruppen nach Kurstheorie; **Erschließung** steht im Kurs bei KG 500, nach DIN 276 vermutlich bei den vorbereitenden Maßnahmen (KG 200); KG-600-Beispiele (Kunstwerk, Mobiliar) abgeleitet |

### G. IT-Administration und Netzwerke (Prüfblätter [08](08-digitale-vernetzung.md), [09](09-systemintegration.md))

| Einheit | Umfang | Was zu prüfen ist |
| --- | --- | --- |
| Verzeichnisdienst und Berechtigungen (`verzeichnisdienst`) | 4 Fragen | Active-Directory-Aussagen (Verknüpfung von Gruppenrichtlinien, OU in Zugriffslisten); Karteikarte K-10.1-16 angleichen |
| Troubleshooting „Industrie und IoT“ (Digitale Vernetzung) | 10 Fälle | Logzeilen und Zahlen aus Kenntnis (OPC-UA-Statuscodes, Broker-Zahlen, Subscribe-Log) |
| Troubleshooting „Serverdienste“ (Systemintegration) | 10 Fälle | Eigene fünf Ebenen; Logzeilen und Fehlermeldungen aus Kenntnis |
| Troubleshooting „Switching und Routing“ (Systemintegration) | 10 Fälle | Duplex-Mismatch Schicht 1 oder 2; DHCP-Relay Schicht 3 oder 7; Logzeilen aus Kenntnis |

*Hinweis:* Bei den IT-Einheiten reicht oft eine Fachkraft mit Praxis (kein Rechtswissen); für die Troubleshooting-Sets sind die Logzeilen der kritische Teil, weil sie aus Kenntnis statt aus einem echten Lauf stammen.

### H. Didaktische Entscheidung (kein Recht)

| Einheit | Umfang | Zu entscheiden |
| --- | --- | --- |
| Vier-Stufen-Methode (`vierstufen`, AEVO, Prüfblatt [10](10-aevo.md)) | 4 Fragen plus Theorie | **Kursfassung** (Stufe 1 = Vorbereiten, Vormachen und Erklären) **gegen die übliche Fassung** mit vier getrennten Stufen. Betrifft Theorie, Zonen und Fragen; Antwort von dir oder einer ausbildungserfahrenen Person |

## 3. Offene Entscheidungen von dir (unabhängig von der Fachprüfung)

1. **Vier-Stufen-Methode:** Kursfassung beibehalten oder auf die übliche Fassung umstellen (Punkt H).
2. **Verwaltungsbeirat (Immobilien):** Theorieabsatz ergänzen (am besten durch die Rechtsprüfung geliefert) oder die Zone streichen und `wegorgane` auf zwei Zonen reduzieren.
3. **Erschließung in der Theorie 5.4 (Immobilien):** Theorietext korrigieren (KG 200) oder bei der Kursfassung bleiben.
4. **Risikopolitik im Versicherungskurs (Frage F6):** Standardbegriffe (vermeiden, vermindern, überwälzen, selbst tragen) oder die bestehenden Kurszonen (vermeiden, absichern, beobachten, akzeptieren). Ohne Entscheidung entsteht kein neues Modell.
5. **Handels-Duell:** ganz sperren, teilfreigeben (ohne Fragen 18–20) oder nach Rechtsprüfung komplett freigeben.

## 4. Bereits sichtbar, aber mit offenen Hinweisen

Diese Einheiten sind in den Wellen 1, 2 und 2b ohne Einzelentscheidung freigegeben worden. Wenn die prüfende Person ohnehin im jeweiligen Kurs liest, lohnt ein kurzer Blick auf die ⚠-Hinweise der Prüfblätter:

- **Daten- und Prozessanalyse:** Datenqualitäts-Dimensionen — Originaltext der Ausbildungsverordnung zu den fünf Dimensionen nicht geprüft (Blatt [07](07-daten-prozessanalyse.md)).
- **Wirtschaftsfachwirt:** Amortisationsrechnung als statisches Verfahren (Kursfassung); einteilige Beziehungsebene im Vier-Seiten-Modell, Grenzfälle in Q-5.1-16 (Blatt [15](15-wirtschaftsfachwirt.md)).
- **Industrie- und Technischer Fachwirt:** Zuschlagskalkulation — „Selbstkosten“ in zwei unterschiedlich weiten Formulierungen (Blätter [13](13-industriefachwirt.md), [14](14-technischer-fachwirt.md)).
- **Handelsfachwirt:** zwei **neue Theorieabschnitte** (Handelskalkulation in 5.3, Kraljic-Matrix in 7.1) samt Karteikarten sind sichtbar, ebenso Ableitungen zur B- und Y-Klasse (Blatt [17](17-handelsfachwirt.md)).
- **Anwendungsentwicklung:** drei Fragen zum Zustandsdiagramm im UML-Instrument und die ergänzte Theorie (Blatt [06](06-anwendungsentwicklung.md)).
- **Büro/Projektorganisation:** Stakeholder-Matrix im Rahmenplan nicht belegt (Blatt [12](12-buero-projektorganisation.md)).

## 5. Reihenfolge-Vorschlag

1. **Zuerst ohne Rechtswissen lösbar:** Vier-Stufen-Methode (deine Entscheidung), IT-Einheiten (Fachkraft), Normen (Fachperson mit Normzugang).
2. **Danach eine Rechtsperson je Gebiet:** Arbeits-/Berufsbildungsrecht und Sozialrecht in einem Durchgang (AEVO und Gesundheit/Soziales), Fracht/Zoll gemeinsam (Industrie, Transport, Handel), Immobilienrecht gesondert, Versicherungs- und Steuerrecht gesondert.
3. **Teilfreigaben nutzen:** Das Handels-Duell ohne 18–20 und Duelle mit gekürzten Fragen sind schneller freizugeben als vollständige Einheiten.
