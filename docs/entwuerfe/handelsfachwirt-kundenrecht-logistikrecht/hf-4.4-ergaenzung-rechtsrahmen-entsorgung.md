# Entwurf Handelsfachwirt, Rechtsrahmen der Entsorgung: Ergänzung im Thema 4.4

Stand 16.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil B des Auftrags P-Z (Erhebung HF-15; Auswertung `docs/entwuerfe/handelsfachwirt-r4-auswertung.md`). Einzufügen in `content/handelsfachwirt/hb4/4.4-entsorgung-kreislaufwirtschaft.md`: Abschnitt A am Ende von „## Theorie“ (hinter dem Absatz „Rechtlicher Hinweis“), B an die Karteikarten hinter K-4.4-14, C an das Quiz hinter Q-4.4-16. Bestand gezählt: 14 Karteikarten (K-4.4-01 bis -14, lückenlos) und 16 Quizfragen (Q-4.4-01 bis -16, lückenlos); `git log -S` findet in `content/handelsfachwirt` keine früher vergebenen und wieder entfernten IDs K-4.4-15 ff., Q-4.4-17 ff. oder F-HB4-07. Die neuen IDs sind K-4.4-15 bis -24 und Q-4.4-17 bis -28. Beim Einspielen den `rechtsstand` im Frontmatter auf 16.10.2026 setzen (`einspielen-config.json` setzt ihn genau einmal). Fallaufgabe und Fachgesprächsfragen stehen in `hf-faelle-b.md` (F-HB4-07, Fachgespräch `### 4.4 Entsorgung und Kreislaufwirtschaft`); die Rechtsangaben zur späteren förmlichen Prüfung stehen in `rechtsangaben-b.md`.

**Anpassung des Bestands (Textersetzungen).** Die Ergänzung widerspricht zwölf Stellen im Bestand von 4.4 („hier nicht behandelt“ in der Theorie, K-4.4-06, K-4.4-07, K-4.4-14, Q-4.4-03, Q-4.4-06) und dem Schlussabsatz „Rechtlicher Hinweis“. Alle 13 Stellen stehen als Paare in `ersetzungen-b.json` im Paketordner (Format: Array von `{datei, paare}`, Datei relativ zu `content/handelsfachwirt`; jede alte Zeichenkette kommt im Bestand genau einmal vor und liegt in einer Zeile). Der Auftraggeber fügt die Datei in die `ersetzungen` von `einspielen-config.json` ein. Die Stelle zu Umweltaussagen in der Werbung (Ökobilanz-Absatz) bleibt unverändert, weil sie zutrifft.

**Abgleich mit dem Bestand.** Der Bestand von 4.4 behandelt Entsorgung betriebswirtschaftlich: Abfallarten und Stoffströme, Verpackungsarten (Verkaufs-, Um-, Transportverpackung, Ladungsträger) und Mehrweg mit Rücklaufquote, Retouren-Ausschuss und Kreislaufwirtschaft, die **Abfallhierarchie als Prüfreihenfolge**, Entsorgung im Filialnetz mit Rückfracht, Kosten, Erlöse und Kennzahlen (Netto-Entsorgungskosten, **Wertstoffquote**, Verwertungsquote), Verantwortung, Auswahl von Entsorgungsunternehmen und Nachweise im Prozess (Wiege- und Übernahmescheine). Er verweist an acht Stellen auf gesetzliche Vorgaben, die „hier nicht behandelt (nicht förmlich rechtsgeprüft)“ sind. **Neu im Kurs** (per Suche in `content/handelsfachwirt/` geprüft: kein Treffer für Systembeteiligung, Verpackungsgesetz, Verpackungsregister, Erstinverkehrbringer, Lizenzentgelt, Getrennthaltung, Überlassungspflicht, Gewerbeabfallverordnung, Abfallschlüssel, Begleitschein, Entsorgungsnachweis, Entsorgungsfachbetrieb, Elektrogesetz, Batteriegesetz, Obhutspflicht): gesetzlicher Abfallbegriff, gesetzliche Rangfolge der Abfallhierarchie und ihr Unterschied zur betrieblichen Prüfreihenfolge, Pflichten der Erzeuger und Besitzer, Beauftragung Dritter, Produktverantwortung mit Hersteller- und Vertreiberrollen, Systembeteiligung und Lizenzentgelte, gesetzliche Nachweise für gefährliche Abfälle. **Begriffsgrenzen:** Der Bestand benutzt „Rücknahme“ für das Zurückfließen von Ladungsträgern und gebrauchter Ware; die Ergänzung spricht bei der gesetzlichen Pflicht von „Rücknahmepflicht“ und grenzt sie ab. „Wertstoff“ ist im Bestand ein betrieblicher Begriff; die Ergänzung nennt den gesetzlichen Begriff „Abfall zur Verwertung“. Die **Wertstoffquote** bleibt eine betriebliche Kennzahl und wird nicht mit gesetzlichen Verwertungsquoten verwechselt. Nachbarthemen werden nicht wiederholt: Abfallarten, Rechnungen zu Mehrweg, Rückfracht und Abholrhythmus (Bestand 4.4), Retourenquote und -kosten (Thema 3.4 Visual Merchandising und E-Commerce im Fachgebiet Handelsmarketing), Logistikdienstleister und Servicelevel (Thema 6.1 Logistikkette im Handel im Fachgebiet Handelslogistik (Wahlpflicht)), Transportversicherung und Zertifizierung (Thema 8.2 im Fachgebiet Außenhandel (Wahlpflicht)). **Eigenständigkeit:** Text, Beispiele (Modehandel, Online-Versand, Zentrallager), Aufgaben und Zahlen sind eigenständig geschrieben; das Thema 10.2 „Umweltmanagement“ im Technischen Fachwirt und das Thema 6.7 „Entsorgungslogistik und Kreislaufwirtschaft“ im Industriefachwirt behandeln Teile desselben Rechts (Abfallbegriff, Nachweisverfahren) aus der Sicht der Fertigung; die Fachbegriffe stimmen überein, Beispiele, Zahlen, Aufgaben und Aufbau nicht.

**Rechtsnähe (R4).** Gesetze und Paragrafen stehen nur als Stützangabe im Text und in Erklärungen, nie als alleiniger Prüfstoff. Rechtszahlen tragen den Zusatz „Stand Oktober 2026, vor Verwendung prüfen“; unsichere Aussagen sind allgemein formuliert und in `rechtsangaben-b.md` als „vermutet“ vermerkt. Keine Steuersätze. Alle Zahlen sind frei gewählte Beispielwerte (Entgelte sind keine Marktaussagen), unabhängig von den Nachbarteilen des Pakets und von F-HB4-07. Karten und Quiz duzen, die Theorie spricht niemanden an.

---

# Thema 4.4

## A. Theorie-Ergänzung 4.4 (einfügen am Ende von „## Theorie“, hinter dem Absatz „Rechtlicher Hinweis“)

### Rechtsrahmen der Abfallwirtschaft im Überblick

Der folgende Rechtsüberblick ist nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen); alle Zahlen, Mengen und Entgelte sind frei gewählte Beispielwerte.

Der bisherige Text dieses Themas betrachtet die Entsorgung aus Sicht des Betriebs: Was fällt wo an, wie wird getrennt, was kostet und was bringt es? Diese Ergänzung führt den rechtlichen Rahmen aus, den die Abschnitte „Verpackungen, Ladungsträger und Mehrweg“, „Die Abfallhierarchie als Prüfreihenfolge“ und „Verantwortung, Auswahl von Entsorgungsunternehmen und Nachweise“ nur als Hinweis nennen. Sie zeigt, welche Regelwerke für ein Handelsunternehmen wie die Loreno Mode & Wohnen GmbH gelten, was sie verlangen und wo die betriebliche Prüfreihenfolge von der gesetzlichen Rangfolge abweicht. Abfallarten, Kennzahlen und die Rechnungen zu Mehrweg und Rückfracht werden nicht wiederholt.

Das Recht gliedert sich in mehrere Ebenen. Das Kreislaufwirtschaftsgesetz legt die Grundregeln fest; Verordnungen und Spezialgesetze regeln einzelne Stoffströme; auf der örtlichen Ebene bestimmt die Satzung der Gemeinde, wie Abfälle überlassen werden. Hinzu kommt europäisches Recht, das teils unmittelbar gilt und teils in den Mitgliedstaaten umgesetzt wird; im Abfall-, Verpackungs- und Batterierecht ändern sich Pflichten, Register und Fristen häufig.

| Regelungsbereich | Regelwerk (Kurzform) | Kern für ein Handelsunternehmen |
|---|---|---|
| Grundregeln: Abfallbegriff, Rangfolge, Pflichten, Produktverantwortung | Kreislaufwirtschaftsgesetz (KrWG) | Abfälle vermeiden und verwerten, getrennt halten, nur ordnungsgemäß entsorgen lassen |
| Gewerbeabfälle | Gewerbeabfallverordnung (GewAbfV) | bestimmte Fraktionen getrennt sammeln, Getrennthaltung dokumentieren |
| Einstufung von Abfällen | Abfallverzeichnis-Verordnung (AVV) | sechsstelliger Abfallschlüssel; ein Sternchen kennzeichnet gefährliche Abfälle |
| Nachweise für gefährliche Abfälle | Nachweisverordnung (NachwV) | Entsorgungsnachweis, Begleitschein, Register |
| Verpackungen | Verpackungsgesetz (VerpackG) und EU-Verpackungsverordnung | Systembeteiligung, Registrierung, Mengenmeldung, Rücknahme von Transportverpackungen |
| Elektro- und Elektronikgeräte | Elektro- und Elektronikgerätegesetz (ElektroG) | Registrierung der Hersteller, Rücknahme von Altgeräten durch den Handel ab einer Flächenschwelle |
| Batterien und Akkus | Batterierecht (EU-Batterieverordnung mit nationalem Durchführungsgesetz) | Registrierung der Hersteller, Rücknahme von Altbatterien im Handel |
| örtliche Regeln | Abfallsatzung der Gemeinde | Anschluss und Überlassung von Abfällen zur Beseitigung |

Der **Zweck** des Kreislaufwirtschaftsgesetzes ist es, die Kreislaufwirtschaft zu fördern, damit natürliche Ressourcen geschont werden und Mensch und Umwelt bei der Erzeugung und Bewirtschaftung von Abfällen geschützt sind. Aus diesem Zweck folgen die Pflichten der folgenden Abschnitte.

### Abfallbegriff und gesetzliche Rangfolge

Das Gesetz nennt die Beteiligten **Besitzer** (wer die tatsächliche Herrschaft über einen Abfall hat), **Erzeuger** (wer durch die eigene Tätigkeit Abfall verursacht), **Hersteller** und **Vertreiber**. Gemeint sind Unternehmen; die Begriffe stehen in diesem Thema als Sachbegriffe.

**Abfall im Rechtssinn** sind alle Stoffe oder Gegenstände, deren sich der Besitzer entledigt, entledigen will oder entledigen muss. Der betriebliche Abfallbegriff dieses Themas („was das Unternehmen nicht mehr einsetzen oder verkaufen kann oder will und deshalb abgibt“) deckt den Kern ab; das Gesetz unterscheidet drei Fälle:

- **Entledigen:** Der Gegenstand wird tatsächlich abgegeben, etwa Kartonage an das Entsorgungsunternehmen.
- **Entledigungswillen:** Er liegt unter anderem vor, wenn etwas als Nebenfolge einer Tätigkeit entsteht, die auf diesen Stoff gar nicht abzielte (das Verpackungsmaterial beim Auspacken), oder wenn die bisherige Nutzung endet und keine neue vorgesehen ist (Dekomaterial nach Ende einer Aktion, wenn nichts Weiteres damit geschieht).
- **Entledigungspflicht:** Sie besteht, wenn ein Gegenstand nicht mehr bestimmungsgemäß verwendet wird und eine Gefahr für die Allgemeinheit nur durch ordnungsgemäße Verwertung oder Beseitigung auszuschließen ist, etwa bei einem aufgequollenen Akku.

Eine geprüfte, wieder verkaufte Retoure bleibt deshalb Ware: Es fehlt der Wille, sich ihrer zu entledigen. Das gilt auch für den Retouren-Ausschuss, solange er als Ware weiterverwendet wird (Outlet, Spende); wird er dagegen zur Vernichtung gegeben, ist er Abfall. Kleiderbügel im Umlauf mit den Lieferunternehmen sind Betriebsmittel, keine Abfälle. Umgekehrt kann Abfall seine Abfalleigenschaft verlieren, wenn er ein Verwertungsverfahren durchlaufen hat, üblicherweise verwendet wird, ein Markt dafür besteht und die technischen und rechtlichen Anforderungen erfüllt sind; Recyclinggranulat aus Folien ist ein Beispiel. Das Gesetz nennt Abfall, der verwertet wird, **Abfall zur Verwertung**; was nicht verwertet wird, ist **Abfall zur Beseitigung**. Der Begriff „Wertstoff“ aus dem Bestand ist dagegen kein Rechtsbegriff, sondern eine betriebliche Bezeichnung für getrennt erfassten Abfall zur Verwertung; die **Wertstoffquote** bleibt eine betriebliche Kennzahl und ist nicht mit den Verwertungs- und Recyclingquoten zu verwechseln, die das Recht den Rücknahmesystemen und Anlagen vorgibt.

Die **gesetzliche Rangfolge** (Abfallhierarchie) hat fünf Stufen: Vermeidung, Vorbereitung zur Wiederverwendung, Recycling, sonstige Verwertung (insbesondere energetische Verwertung) und Beseitigung. Sie stimmt in der Reihenfolge mit der Prüfreihenfolge des Betriebs überein, unterscheidet sich aber in Verbindlichkeit und Anwendung:

| Gesichtspunkt | Prüfreihenfolge im Betrieb (Abschnitt „Die Abfallhierarchie als Prüfreihenfolge“) | gesetzliche Rangfolge |
|---|---|---|
| Zweite Stufe | „Wiederverwenden“: ein Gegenstand wird weitergenutzt, auch ohne dass er je Abfall war (Bügel im Umlauf, Podest in anderer Filiale) | „Vorbereitung zur Wiederverwendung“: gilt für Abfälle, die geprüft, gereinigt oder repariert werden, damit sie wieder Produkt werden; die Weiterverwendung eines Gegenstands, der nie Abfall war (Bügel im Umlauf, Podest, Ausschuss im Outlet), zählt im Gesetz zur Vermeidung, der ersten Stufe |
| Verbindlichkeit | Entscheidungshilfe für Teams und Logistik | gesetzlicher Maßstab (Grundsatz mit begründeter Abweichung); Behörden dürfen daran messen |
| Abweichung | aus der Rechnung und dem Ökobilanz-Gedanken | Abweichen darf, wer begründet, dass eine andere Maßnahme entlang des gesamten Lebenswegs (Emissionen, Ressourcenschonung, Energieeinsatz) wirksamer schützt; zugleich zählt, was technisch machbar, wirtschaftlich zumutbar und sozial verträglich ist |
| Rolle der Kosten | die Rechnung entscheidet mit | Kosten wirken über die wirtschaftliche Zumutbarkeit: Die Pflicht besteht, soweit sie technisch möglich und wirtschaftlich zumutbar ist |

Für die Verwertung gilt, dass sie Vorrang vor der Beseitigung hat und ordnungsgemäß (im Einklang mit den Vorschriften) und schadlos (ohne Schadstoffanreicherung im Stoffkreislauf) erfolgen muss. Wirtschaftlich zumutbar ist sie, solange ihre Mehrkosten nicht in einem Missverhältnis zu den Kosten der Beseitigung stehen. Der Ökobilanz-Gedanke des Bestands hat damit eine gesetzliche Entsprechung: Wer das Textilrecycling im Spezialwerk 900 km entfernt gegen das nahe Putzlappenunternehmen abwägt, begründet eine Abweichung von der Regelreihenfolge mit dem Vergleich über den ganzen Lebensweg und hält die Gründe fest. Die Rechnung mit Euro und Kilometern ersetzt diese Begründung nicht, sie liefert nur Zahlen dazu.

### Pflichten der Erzeuger und Besitzer im Handel

Die Pflichten treffen das Unternehmen als Erzeuger und Besitzer; praktisch sind sie an jeder Anfallstelle (Filiale, Lager, Online-Versand) zu erfüllen und zu belegen.

| Pflicht | Inhalt | Beispiel bei Loreno |
|---|---|---|
| Verwertung vor Beseitigung | Abfälle sind zu verwerten, soweit technisch möglich und wirtschaftlich zumutbar | Kartonage und sortenreine Folie gehen in die Verwertung, nicht in den Restabfall |
| Getrennthalten | Abfälle zur Verwertung getrennt halten; gefährliche Abfälle weder untereinander noch mit anderen Abfällen oder Stoffen vermischen oder verdünnen | Die beschriftete Akku-Box im Backoffice bleibt getrennt vom Papierkorb |
| Getrennte Sammlung von Gewerbeabfällen | Bestimmte Fraktionen (unter anderem Papier, Pappe und Karton, Kunststoffe, Glas, Metalle, Holz, Textilien, Bioabfälle) getrennt sammeln; Ausnahmen nur, wenn die Trennung technisch nicht möglich oder wirtschaftlich nicht zumutbar ist, mit schriftlich festgehaltener Begründung; was nicht getrennt wird, geht als gemischter Gewerbeabfall in eine Vorbehandlungsanlage zur Sortierung | Kartonage, Folie, Holzpaletten und Textilreste liegen im Zentrallager in eigenen Behältern, der Rest im Restbehälter |
| Dokumentieren | Die Getrennthaltung ist nachzuweisen, zum Beispiel durch Lagepläne, Fotos, Lieferscheine, Wiegescheine, Verträge und Abrechnungen | Je Standort ein Ordner oder Datenbestand mit Plan der Behälterplätze, Fotos und Belegen |
| Überlassen oder Beauftragen | Abfälle zur Beseitigung sind in der Regel dem öffentlich-rechtlichen Entsorgungsträger zu überlassen (Satzung der Gemeinde); Abfälle zur Verwertung dürfen aus dem gewerblichen Bereich auch private Entsorgungsunternehmen übernehmen, wenn die Verwertung ordnungsgemäß erfolgt | Restabfall zur Beseitigung nach Satzung; Kartonage, Folie, Holz und gemischter Gewerbeabfall über das beauftragte Entsorgungsunternehmen |

Mit der **Beauftragung** eines Entsorgungsunternehmens endet die Verantwortung nicht: Sie besteht fort, bis die Verwertung oder Beseitigung ordnungsgemäß abgeschlossen ist, und das Unternehmen ist sorgfältig auszuwählen. Das Gesetz verlangt von Unternehmen, die Abfälle gewerbsmäßig sammeln, befördern, damit handeln oder sie vermitteln, eine Anzeige, bei gefährlichen Abfällen eine Erlaubnis; ein **Entsorgungsfachbetrieb** ist ein Unternehmen, das für seine Anlage und seine Tätigkeit zertifiziert ist und dessen Überwachung das Verfahren erleichtert. Zu den Auswahlkriterien des Bestands (Preis, Vergütung, Leistungsumfang, Zuverlässigkeit, Reichweite, Belege) kommt damit ein Mindestkriterium: Das Unternehmen muss für die Abfallart und die Tätigkeit berechtigt sein. Der Einkauf lässt sich Anzeige oder Erlaubnis, das Fachbetriebszertifikat und die Anlagen, an die weitergeliefert wird, zeigen und hält sie im Vertrag fest. **Beauftragte:r für Abfall** müssen nur bestimmte Betriebe bestellen (nach Art der Anlage und Abfallmenge, geregelt in einer eigenen Verordnung); ein Filialunternehmen des Handels fällt in der Regel nicht darunter, ob das für das einzelne Unternehmen gilt, ist aber zu prüfen. Die „Ansprechperson für Abfall“ aus dem Bestand ist eine betriebliche Rolle und nicht dasselbe wie die gesetzlich bestellte Beauftragung.

Verstöße gegen die Pflichten können als Ordnungswidrigkeit mit einem Bußgeld geahndet werden; die Behörden dürfen Betriebe kontrollieren und Unterlagen verlangen. Die Dokumentation aus dem Bestand (Wiegescheine, Übernahmebelege, Abrechnungen) liefert dafür das Material: Sie dient nicht nur der Kennzahl, sondern auch dem Nachweis gegenüber der Behörde.

### Produktverantwortung und Rücknahme: wer in Verkehr bringt, wer zurücknimmt

Das Kreislaufwirtschaftsgesetz stellt den Grundsatz der **Produktverantwortung** auf: Wer Erzeugnisse entwickelt, herstellt, be- oder verarbeitet oder vertreibt, trägt dazu bei, dass Abfälle vermieden werden, Erzeugnisse langlebig, reparierbar und verwertbar sind und nach Gebrauch umweltverträglich entsorgt werden können. Dazu gehört eine **Obhutspflicht**: Hersteller und Vertreiber sollen Erzeugnisse gebrauchstauglich halten. Sie spricht nach einer Auslegung bei neuwertiger Retourenware für Outlet und Spende statt Vernichtung. Zudem sieht das europäische Produktrecht ein gestaffeltes Vernichtungsverbot für unverkaufte Bekleidung und Schuhe vor, das für große Unternehmen nach meinem Stand seit Juli 2026 wirkt und für mittlere später einsetzt; Kleinst- und Kleinunternehmen sind ausgenommen, für beschädigte Ware gelten Ausnahmen (zeitkritisch und vermutet, Stand Oktober 2026, vor Verwendung prüfen). Für Textilien ist außerdem auf europäischer Ebene eine erweiterte Herstellerverantwortung beschlossen, die national noch umzusetzen ist (zeitkritisch, Stand Oktober 2026, vor Verwendung prüfen).

Die Einzelheiten stehen in Spezialgesetzen. Dort heißt **Hersteller** nicht ohne Weiteres, wer etwas produziert, sondern im Kern **wer ein Erzeugnis erstmals in Deutschland gewerbsmäßig in Verkehr bringt**; das sind auch Importunternehmen. Die genaue Definition unterscheidet sich je Gesetz: Beim Verpackungsgesetz entscheidet das erstmalige Inverkehrbringen der mit Ware befüllten Verpackung (Befüllende, Importunternehmen), bei Elektrogeräten und Batterien gilt auch als Hersteller, wer sie unter eigenem Namen oder eigener Marke anbietet. **Vertreiber** ist, wer Erzeugnisse auf einer Handelsstufe weitergibt, also auch der Einzelhandel. Die Kundschaft steht am Ende der Kette. Die Rolle der Loreno Mode & Wohnen GmbH hängt vom Stoffstrom ab: Bei Waren und Verpackungen, die sie selbst einführt, und bei Elektrogeräten und Batterien unter der Eigenmarke „Loreno Living“ ist sie Hersteller; bei Verpackungen und Ware inländischer Lieferunternehmen ist sie sonst Vertreiber.

| Stoffstrom | Regelwerk | Hersteller (erstes Inverkehrbringen) | Handel als Vertreiber | Kundschaft |
|---|---|---|---|---|
| Verkaufs- und Versandverpackungen | Verpackungsgesetz | beteiligt die Verpackungen vor dem Inverkehrbringen an einem dualen System, registriert sich und meldet Mengen | prüft, ob gelieferte Verpackungen beteiligt sind; bietet keine nicht beteiligten an | gibt die Verpackung in die jeweilige Sammlung (gelbe Tonne für Kunststoffe, Metalle und Verbunde, Altpapier für Pappe und Karton, Altglas) |
| Transport- und Umverpackungen im Gewerbe | Verpackungsgesetz | nimmt nach Gebrauch zurück und führt der Verwertung zu | nimmt zurück oder regelt die Rücknahme vertraglich | nicht betroffen, die Verpackungen bleiben im gewerblichen Bereich |
| Elektro- und Elektronikgeräte | Elektro- und Elektronikgerätegesetz | registriert sich bei der Stiftung Elektro-Altgeräte Register, beteiligt sich an der Rücknahme, kennzeichnet die Geräte mit der durchgestrichenen Mülltonne, informiert über Rückgabewege | nimmt Altgeräte ab einer Verkaufsfläche von mindestens 400 m² für Elektrogeräte zurück (bei Onlinehandel zählen Lager- und Versandflächen), Kleingeräte bis 25 cm Kantenlänge auch ohne Neukauf (Stand Oktober 2026, vor Verwendung prüfen); verkauft nur registrierte Geräte; weist auf die Rückgabe hin | gibt Altgeräte nicht in den Restmüll |
| Batterien und Akkus, auch eingebaute | Batterierecht | registriert sich, beteiligt sich an einem Rücknahmesystem, kennzeichnet die Batterien | nimmt Altbatterien der Art, die es führt, unentgeltlich zurück, auch ohne Kauf | gibt Altbatterien nicht in den Hausmüll |

Das Batterierecht wurde in den Jahren 2023 bis 2025 durch eine EU-Verordnung und ein nationales Durchführungsgesetz neu geordnet und ändert sich weiter; Pflichten, Registerstellen und Fristen sind hier ausdrücklich zeitkritisch (Stand Oktober 2026, vor Verwendung prüfen). Der Bestand verwendet „Rücknahme“ für Ladungsträger, Leergut und freiwillige Kleidersammlungen. Das sind **Rücknahmekonzepte** des Unternehmens. Eine **Rücknahmepflicht** ist dagegen eine gesetzliche Pflicht, die nicht davon abhängt, ob sich die Rücknahme betriebswirtschaftlich lohnt. Manche Rücknahmepflichten (Transportverpackungen) lassen sich vertraglich anders regeln, andere (Altbatterien) nicht. Beispiel: Bietet Loreno batteriebetriebene LED-Kerzen an, nimmt jede Filiale Altbatterien dieser Art zurück, auch von Personen, die nichts kaufen.

### Verpackungsrecht: Systembeteiligung, Registrierung und Meldung

Das Verpackungsrecht ist im Umbruch: Die EU-Verpackungsverordnung gilt nach dem Stand Oktober 2026 seit dem 12.08.2026 unmittelbar, und welche Vorschriften des nationalen Verpackungsgesetzes daneben fortgelten oder angepasst wurden, ist zeitkritisch (vor Verwendung prüfen). Die folgende Darstellung gibt die bisherige Systematik des Verpackungsgesetzes wieder. Es knüpft die Pflichten an das **erste Inverkehrbringen**. Wer mit Ware befüllte Verkaufs- und Versandverpackungen erstmals in Deutschland gewerbsmäßig in Verkehr bringt (die **Erstinverkehrbringenden**, im Gesetz Hersteller), muss sie vorher bei einem **dualen System** beteiligen. Das System organisiert die Sammlung und Verwertung der Verpackungen, die typischerweise bei privaten Endverbrauchenden als Abfall anfallen, und erhält dafür ein Entgelt (**Lizenzentgelt**). Wer verpflichtet ist, entscheidet die Rolle in der Kette; ob eine Verpackung betroffen ist, entscheidet, wo sie typischerweise als Abfall anfällt, nicht ihr Name:

| Verpackung bei Loreno | Wer bringt sie erstmals in Verkehr? | Folge |
|---|---|---|
| Versandkarton, Füllpapier, Versandbeutel des Online-Shops | Loreno, die Ware befüllt und an Privatkundschaft verschickt | Loreno beteiligt, registriert und meldet |
| Polybeutel um Einzelteile der Importware | Loreno als Importeurin, wenn sie die verpackte Ware aus dem Ausland einführt | Loreno beteiligt |
| Polybeutel um Ware inländischer Lieferunternehmen | das Lieferunternehmen | Loreno lässt sich die Beteiligung bestätigen |
| Tragetaschen der Filialen (Serviceverpackungen) | das vorgelagerte Lieferunternehmen, wenn es sie bereits vorbeteiligt hat, sonst Loreno | Nachweis der Vorbeteiligung einholen; nicht doppelt beteiligen |
| Umkarton und Stretchfolie, in denen Lieferunternehmen die Ware an das Zentrallager liefern (Transportverpackung) | keine Systembeteiligung | Rücknahme nach Gebrauch, mit den Lieferunternehmen vertraglich zu regeln |

Der Weg zum rechtmäßigen Inverkehrbringen verläuft in Schritten:

1. **Rolle und Verpackungsarten klären:** Welche Verpackungen bringt das Unternehmen selbst erstmals in Verkehr, welche sind vorbeteiligt?
2. **Registrierung** im öffentlichen Verpackungsregister (der Zentralen Stelle Verpackungsregister) vor dem ersten Inverkehrbringen; die Registrierungsnummer ist in vielen Fällen auch gegenüber Marktplätzen und Handelspartnern vorzulegen.
3. **Vertrag mit einem dualen System** über die Beteiligung, getrennt nach Materialart (zum Beispiel Papier, Pappe und Karton; Kunststoffe; Glas; Metalle).
4. **Datenmeldung:** Die beteiligten Mengen je Materialart (in Kilogramm) werden dem System und dem Register gemeldet; beide Meldungen müssen übereinstimmen.
5. **Anpassen:** Weichen die tatsächlichen Mengen von der gemeldeten Planmenge ab, ist die Meldung anzupassen. Ab bestimmten Jahresmengen je Materialgruppe ist zusätzlich eine geprüfte Vollständigkeitserklärung zu hinterlegen.

Ohne Registrierung und Beteiligung dürfen die betroffenen Verpackungen nicht in Verkehr gebracht werden; Verstöße sind Ordnungswidrigkeiten. Auch Handelspartner und Marktplätze prüfen deshalb die Registrierung. Die gesamte Rechtslage ist zeitkritisch: Neben der seit Sommer 2026 unmittelbar geltenden europäischen Verordnung wird das nationale Recht angepasst, sodass Pflichten, Register, Quoten und Fristen abweichen können (Stand Oktober 2026, vor Verwendung prüfen).

### Lizenzentgelte rechnen und Verpackung beeinflussen

Das Lizenzentgelt richtet sich nach **Menge und Materialart**: Je Kilogramm gemeldeter Verpackung fällt ein Entgelt an, das nach Material gestaffelt ist (Kunststoffe sind meist deutlich teurer als Papier und Pappe). Oft kommen Grundentgelte hinzu. Die Entgelte sind Marktpreise der Systeme und ändern sich; die Beispiele nennen frei gewählte Werte.

*Rechenbeispiel Online-Versand* (frei gewählte Beispielwerte): Der Online-Shop verschickt im Jahr 214.000 Sendungen. Je Sendung wiegen der Versandkarton 0,175 kg und das Füllpapier 0,028 kg (zusammen 0,203 kg Papier, Pappe und Karton); dazu kommen zwei Polybeutel um die Ware mit je 0,006 kg (zusammen 0,012 kg Kunststoff). Das Beispielentgelt beträgt 0,29 € je kg für Papier, Pappe und Karton und 1,05 € je kg für Kunststoff.

| Materialart | Rechnung Menge | Menge | Rechnung Entgelt | Entgelt |
|---|---|---|---|---|
| Papier, Pappe und Karton | 214.000 × 0,203 kg | 43.442 kg | 43.442 kg × 0,29 €/kg | 12.598,18 € |
| Kunststoff | 214.000 × 0,012 kg | 2.568 kg | 2.568 kg × 1,05 €/kg | 2.696,40 € |
| Summe | | 46.010 kg | | 15.294,58 € |

Das Lizenzentgelt beträgt 15.294,58 € ÷ 214.000 ≈ 0,0715 €, also rund 7,1 Cent je Sendung. Der Hebel liegt im Gewicht: Verringert Loreno das Kartongewicht um 0,016 kg je Sendung, sinkt die gemeldete Menge um 214.000 × 0,016 kg = 3.424 kg, und das Entgelt um 3.424 kg × 0,29 €/kg = 992,96 € im Jahr. Hat Loreno zu Jahresbeginn 41.500 kg Papier, Pappe und Karton gemeldet und werden tatsächlich 43.442 kg verpackt, beträgt die Abweichung 1.942 kg und das Mehrentgelt 1.942 kg × 0,29 €/kg = 563,18 €; die Meldung ist anzupassen. Die Rechnung zeigt zwei Dinge: Das Lizenzentgelt ist ein Teil der Verpackungskosten, den weder der Einwegkarton noch der Mehrwegbeutel aus dem Bestand enthält, und es belohnt leichte, materialsparende Verpackungen.

Für **Transportverpackungen** und für Umverpackungen, die im Handel abgenommen werden und nicht zur Kundschaft gelangen, gilt keine Systembeteiligung, aber eine Rücknahmepflicht von Herstellern und Vertreibern nach Gebrauch, die sich vertraglich anders regeln lässt. Loreno nimmt deshalb in den Einkaufsverträgen Rücknahme- oder Verwertungsklauseln für Paletten, Umkartons und Stretchfolie auf. Bei **Mehrwegverpackungen** sieht das Recht für den Modehandel nach dem Stand Oktober 2026 keine allgemeine Pflicht vor, Versandverpackungen im Mehrweg anzubieten; die Mehrwegangebotspflicht des Verpackungsgesetzes betrifft Einweg-Lebensmittelverpackungen aus Kunststoff und Einweggetränkebecher für Speisen und Getränke zum Mitnehmen. Die europäische Verpackungsverordnung enthält jedoch Mehrweg- und Materialvorgaben, auch zum Verhältnis von Verpackungsvolumen und Inhalt, deren Zeitpunkte vor Verwendung zu prüfen sind. Die Rechnung zu Mehrwegbeuteln und Rücklaufquote im Abschnitt „Verpackungen, Ladungsträger und Mehrweg“ bleibt davon unberührt: Sie wägt Kosten ab, das Recht setzt den Rahmen.

### Gefährliche Abfälle, Einstufung und Nachweise

Die Einstufung als **gefährlicher Abfall** richtet sich nach der Abfallverzeichnis-Verordnung. Jede Abfallart hat einen sechsstelligen **Abfallschlüssel**; ein Sternchen am Schlüssel kennzeichnet gefährliche Abfälle. Beispiele: Verpackungen aus Papier und Pappe tragen den Schlüssel 15 01 01 ohne Sternchen, quecksilberhaltige Leuchtmittel den Schlüssel 20 01 21 mit Sternchen. Manche Abfälle gibt es in zwei Varianten, mit und ohne Sternchen, etwa Tonerabfälle; die Einstufung hängt dann von den enthaltenen gefährlichen Stoffen ab, und das Entsorgungsunternehmen oder die Herstellerangaben klären sie. Der Abfallschlüssel steht später auf allen Nachweisen, daher gehört er an die Sammelstelle.

Für gefährliche Abfälle gelten zusätzlich zu den allgemeinen Pflichten das **Vermischungsverbot**, die Sammlung in geeigneten, gekennzeichneten Behältern und die Übergabe nur an berechtigte Unternehmen. Gebrauchte Batterien und Akkus sowie Altgeräte mit Leuchtmitteln laufen teilweise über die Rücknahmewege der Spezialgesetze; sonstige gefährliche Abfälle wie Tonerreste oder Reinigungsmittelreste gehen mit Nachweis an ein berechtigtes Entsorgungsunternehmen.

Das **Nachweisverfahren** hat zwei Teile:

- **Entsorgungsnachweis (vorab):** Er belegt, dass die vorgesehene Entsorgung zulässig ist: Erklärung der Erzeugerseite, Annahmeerklärung der Entsorgungsseite und Bestätigung der Behörde. Bei einem Entsorgungsfachbetrieb, der für die Anlage und die Tätigkeit zertifiziert ist, entfällt die behördliche Bestätigung.
- **Begleitschein (bei jeder Übergabe):** Er belegt die einzelne Übergabe und den Weg des Abfalls. Das Verfahren läuft für gefährliche Abfälle in der Regel elektronisch.

Dazu führen Erzeuger ein **Register**, in dem Art, Menge, Herkunft und Verbleib verzeichnet sind; die Belege sind mindestens drei Jahre aufzubewahren und der Behörde auf Verlangen vorzulegen (Stand Oktober 2026, vor Verwendung prüfen). Für **Kleinmengen** gilt eine Erleichterung: Fallen bei einem Erzeuger im Jahr insgesamt höchstens zwei Tonnen gefährliche Abfälle an, ist er von der Nachweispflicht ausgenommen; als Praxisbeleg für jede Übergabe dient ein Übernahmeschein, und die Registerpflicht bleibt bestehen (Stand Oktober 2026, vor Verwendung prüfen). Nach verbreiteter Auslegung zählt die Menge je Anfallstelle; bei einem Filialnetz entscheidet dann die Menge je Standort, nicht die Summe des Unternehmens (die Beispiele und der Fall setzen das als Annahme).

*Beispiel* (frei gewählte Beispielwerte; Grenze und Zuordnung je Standort als Annahme, Stand Oktober 2026, vor Verwendung prüfen): Im Zentrallager fallen 2.560 kg gefährliche Abfälle im Jahr an, im Regionallager 1.640 kg, in einer Filiale 52 kg. Das Zentrallager liegt um 560 kg über der Grenze von 2.000 kg und führt das volle Verfahren mit Entsorgungsnachweis, Begleitschein und Register. Das Regionallager bleibt unter der Grenze und kann die Kleinmengenregelung nutzen; sein Abstand beträgt 360 kg, das sind 360 ÷ 1.640 ≈ 22,0 % Wachstum, bevor die Grenze erreicht wäre. Die Filiale mit 52 kg fällt ebenfalls darunter. Wer die Grenze nur knapp unterschreitet, beobachtet die Menge, denn ein Wechsel des Verfahrens bedarf einer Vorbereitung.

Die Nachweise des Bestands (Wiege- und Übernahmescheine, Abrechnungen) bleiben für alle Abfallarten wichtig, auch wenn das Gesetz sie nicht vorschreibt; für gefährliche Abfälle kommen die gesetzlichen Dokumente hinzu und gehen vor. Die Verantwortung bleibt auch nach der Übergabe beim Erzeuger, bis die Entsorgung ordnungsgemäß abgeschlossen ist; ein sorgfältiger Vertrag, ein geprüftes Entsorgungsunternehmen und vollständige Belege sind der Schutz gegen den Vorwurf, nicht ordnungsgemäß entsorgt zu haben.

## B. Karteikarten 4.4 (anhängen)

#### K-4.4-15
**Frage:** Wann ist ein Gegenstand im Rechtssinn Abfall, und warum ist eine wieder verkaufte Retoure keiner?
**Antwort:** Abfall sind Stoffe oder Gegenstände, deren sich Besitzende entledigen, entledigen wollen oder entledigen müssen. Eine geprüfte und wieder verkaufte Retoure bleibt Ware, weil der Wille zur Entledigung fehlt. Geht Retouren-Ausschuss dagegen zur Vernichtung, ist er Abfall; bleibt er Ware (Outlet, Spende), ist er keiner. Gesetzliche Vorgaben sind nicht förmlich rechtsgeprüft.
`tags: abfallbegriff, rechtsrahmen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.4-16
**Frage:** Worin unterscheiden sich die betriebliche Prüfreihenfolge und die gesetzliche Rangfolge der Abfallhierarchie?
**Antwort:** Die Reihenfolge der fünf Stufen ist gleich. Das Gesetz nennt die zweite Stufe „Vorbereitung zur Wiederverwendung“ und meint damit Abfälle, die geprüft, gereinigt oder repariert wieder Produkt werden; die Weiterverwendung eines Gegenstands, der nie Abfall war (Bügel im Umlauf), zählt im Gesetz zur Vermeidung. Die gesetzliche Rangfolge ist der Maßstab für Erzeugende und Besitzende, die Prüfreihenfolge hilft im Betrieb. Abgewichen wird begründet mit Blick auf den gesamten Lebensweg; dabei zählen auch das technisch Machbare, das wirtschaftlich Zumutbare und die sozialen Folgen.
`tags: abfallhierarchie, rechtsrahmen` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-4.4-17
**Frage:** Welche Pflichten haben Erzeugende und Besitzende von Gewerbeabfällen im Handel?
**Antwort:** Abfälle verwerten (Vorrang vor Beseitigung), Abfälle zur Verwertung getrennt halten, gefährliche Abfälle nicht vermischen, bestimmte Fraktionen wie Papier, Pappe und Karton, Kunststoffe, Holz und Textilien getrennt sammeln (Ausnahme nur bei technischer Unmöglichkeit oder wirtschaftlicher Unzumutbarkeit, mit festgehaltener Begründung) und die Getrennthaltung dokumentieren. Die Pflichten treffen das Unternehmen; erfüllt und belegt werden sie an jeder Anfallstelle.
`tags: erzeugerpflichten, gewerbeabfall` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.4-18
**Frage:** Loreno beauftragt ein Unternehmen mit der Abholung der Kartonage. Wer trägt die Verantwortung, und worauf achtest du bei der Auswahl?
**Antwort:** Die Verantwortung bleibt bei Loreno, bis die Verwertung oder Beseitigung ordnungsgemäß abgeschlossen ist. Bei der Auswahl prüfst du, ob das Unternehmen für die Abfallart und die Tätigkeit berechtigt ist (Anzeige oder Erlaubnis, bei gefährlichen Abfällen Erlaubnis; Fachbetriebszertifikat erleichtert das Verfahren), und hältst Anlagen, Belege und Rücknahme im Vertrag fest. Preis und Zuverlässigkeit kommen hinzu.
`tags: beauftragung, verantwortung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.4-19
**Frage:** Wer ist „Hersteller“ im Sinne der Produktverantwortung, und welche Rollen hat Loreno?
**Antwort:** Hersteller ist im Kern, wer ein Erzeugnis erstmals in Deutschland gewerbsmäßig in Verkehr bringt, auch ein Importunternehmen; die Definition unterscheidet sich je Gesetz. Vertreiber ist, wer Erzeugnisse auf einer Handelsstufe weitergibt. Loreno ist Hersteller bei selbst eingeführter Ware und Verpackung; bei Elektrogeräten und Batterien auch unter der eigenen Marke „Loreno Living“; bei Ware inländischer Lieferunternehmen sonst Vertreiber.
`tags: produktverantwortung, hersteller, vertreiber` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.4-20
**Frage:** Welche Schritte sind vor dem ersten Inverkehrbringen von Versandverpackungen nötig?
**Antwort:** Rolle und Verpackungsarten klären, im Verpackungsregister registrieren, die Verpackungen bei einem dualen System beteiligen (nach Materialart) und die beteiligten Mengen dem System und dem Register melden; die Meldungen müssen übereinstimmen. Weichen die tatsächlichen Mengen von der Planmenge ab, wird die Meldung angepasst. Ohne Registrierung und Beteiligung dürfen die Verpackungen nicht in Verkehr gebracht werden. Die Systematik folgt dem bisherigen Verpackungsgesetz; neben der EU-Verpackungsverordnung ist der Stand zeitkritisch (Stand Oktober 2026, vor Verwendung prüfen).
`tags: verpackungsrecht, systembeteiligung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.4-21
**Frage:** Wie rechnest du das Lizenzentgelt für Versandverpackungen? Rechne: 68.000 Sendungen mit je 0,15 kg Pappe und Karton, Beispielentgelt 0,35 € je kg.
**Antwort:** Menge je Materialart × Entgelt je kg. Hier: 68.000 × 0,15 kg = 10.200 kg; 10.200 kg × 0,35 €/kg = 3.570 €. Das sind 3.570 € ÷ 68.000 = 0,0525 € je Sendung. Weniger Gewicht senkt das Entgelt: 0,01 kg weniger je Sendung sparen 680 kg × 0,35 € = 238 €. Die Entgelte sind Beispielwerte.
`tags: verpackungsrecht, lizenzentgelt, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.4-22
**Frage:** Warum gilt für den Umkarton, in dem ein Lieferunternehmen Ware an das Zentrallager liefert, keine Systembeteiligung, und was gilt stattdessen?
**Antwort:** Die Systembeteiligung betrifft Verpackungen, die typischerweise bei privaten Endverbrauchenden als Abfall anfallen. Der Umkarton schützt den Transportweg und fällt im Gewerbe an. Für Transportverpackungen gilt eine Rücknahmepflicht von Herstellern und Vertreibern nach Gebrauch; sie lässt sich vertraglich anders regeln. Loreno klärt das in den Einkaufsverträgen mit den Lieferunternehmen.
`tags: verpackungsrecht, transportverpackung` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.4-23
**Frage:** Was verlangt das Recht bei Elektrogeräten und Batterien von Hersteller und Handel?
**Antwort:** Hersteller registrieren sich, beteiligen sich an der Rücknahme und kennzeichnen die Geräte oder Batterien mit der durchgestrichenen Mülltonne. Der Handel verkauft nur registrierte Ware, informiert über Rückgabewege, nimmt Altbatterien der geführten Art unentgeltlich zurück und Altgeräte ab einer gesetzlichen Flächenschwelle. Das Batterierecht wurde zuletzt neu geordnet und ist zeitkritisch (Stand Oktober 2026, vor Verwendung prüfen).
`tags: produktverantwortung, elektrogeraete, batterien` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.4-24
**Frage:** Welche Dokumente gehören zur Entsorgung gefährlicher Abfälle, und was ändert sich bei Kleinmengen?
**Antwort:** Der Abfallschlüssel mit Sternchen kennzeichnet gefährliche Abfälle. Vorab belegt der Entsorgungsnachweis die Zulässigkeit der Entsorgung, bei jeder Übergabe der Begleitschein; dazu kommt ein Register, dessen Belege mindestens drei Jahre aufzubewahren sind. Bei höchstens zwei Tonnen im Jahr je Erzeuger entfällt die Nachweispflicht; als Praxisbeleg dient ein Übernahmeschein, die Registerpflicht bleibt (Stand Oktober 2026, vor Verwendung prüfen).
`tags: gefaehrliche_abfaelle, nachweise` · `schwierigkeit: schwer` · `bloom: verstehen`

## C. Quiz 4.4 (anhängen)

#### Q-4.4-17 · Multiple Choice
**Frage:** Im Retourenbereich des Zentrallagers liegen 400 Pullover, die nach der Prüfung nicht mehr als reguläre Ware taugen. 300 davon gehen in den Outlet-Verkauf, 100 sind durch Feuchtigkeitsschäden unbrauchbar und gehen zur Vernichtung. Was gilt rechtlich?
- [ ] Alle 400 Pullover sind Abfall, weil sie aus der Retoure stammen und nicht regulär verkauft werden.
- [ ] Nur die 300 Pullover im Outlet sind Abfall, die 100 zur Vernichtung bleiben Ware, bis sie zerstört sind.
- [x] Die 100 Pullover zur Vernichtung sind Abfall, die 300 für den Outlet-Verkauf bleiben Ware.
- [ ] Alle 400 bleiben Ware, solange sie noch nicht an das Entsorgungsunternehmen übergeben wurden.
**Erklärung:** Abfall ist, was Besitzende abgeben, abgeben wollen oder abgeben müssen. Für die 100 Pullover besteht der Wille zur Entledigung, die 300 im Outlet werden weiter als Ware verkauft. Ob ein Gegenstand Abfall ist, hängt also nicht an der Herkunft oder am Ort, sondern an der Entledigung. Ob die Vernichtung unverkaufter Bekleidung zulässig ist, ist eine eigene Frage: Dafür gilt ein gestaffeltes Vernichtungsverbot, das für beschädigte Ware Ausnahmen kennt (zeitkritisch, vermutet, vor Verwendung prüfen). Gesetzliche Vorgaben sind nicht förmlich rechtsgeprüft.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-18 · Zuordnung
**Anweisung:** Ordne die Rolle dem passenden Fall aus der Loreno-Logistik zu (Hersteller, Vertreiber und Erzeuger sind Sachbegriffe des Gesetzes für Unternehmen).
- Hersteller (erstes Inverkehrbringen) ↔ Loreno führt Polybeutel-verpackte Textilien aus Asien ein und bringt sie in Deutschland erstmals in Verkehr
- Vertreiber ↔ Loreno verkauft in einer Filiale Ware eines inländischen Lieferunternehmens, das seine Verpackungen selbst beteiligt hat
- Erzeuger ↔ Loreno, an der Anfallstelle Filiale-Backoffice, wo ein defekter Handscanner-Akku anfällt
- Beauftragtes Unternehmen ↔ Das Entsorgungsunternehmen, das den Karton aus dem Pressbehälter abholt
**Erklärung:** Hersteller im Sinne der Produktverantwortung ist, wer erstmals in Deutschland gewerbsmäßig in Verkehr bringt, auch ein Importunternehmen. Vertreiber geben Ware auf einer Handelsstufe weiter. Erzeuger ist, wer durch die eigene Tätigkeit Abfall verursacht, und das beauftragte Unternehmen nimmt Aufgaben ab, ohne dass die Verantwortung der Erzeugerseite endet.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.4-19 · Kurzantwort
**Frage:** In einem Aktionsquartal verschickt der Online-Shop von Loreno 62.000 Pakete mit je 0,14 kg Papier, Pappe und Karton als Versandverpackung. Das Beispielentgelt des dualen Systems beträgt 0,35 € je kg. Wie viel Euro Lizenzentgelt entfallen auf dieses Quartal (Menge je Materialart mal Entgelt je kg)?
**Akzeptierte Antworten:** 3.038; 3.038 €; 3.038 Euro; 3.038 EUR; 3.038,00; 3.038,00 €; 3.038,00 Euro; 3.038,00 EUR; 3.038,0; 3.038,0 €; 3.038,0 Euro; 3.038,0 EUR; 3038; 3038 €; 3038 Euro; 3038 EUR; 3038,00; 3038,00 €; 3038,00 Euro; 3038,00 EUR; 3038,0; 3038,0 €; 3038,0 Euro; 3038,0 EUR; 3038.00; 3038.00 €; 3038.00 Euro; 3038.00 EUR; 3038.0; 3038.0 €; 3038.0 Euro; 3038.0 EUR
**Erklärung:** Menge: 62.000 × 0,14 kg = 8.680 kg. Entgelt: 8.680 kg × 0,35 €/kg = 3.038 €. Typischer Fehler: Pakete statt Kilogramm mit dem Entgelt zu multiplizieren (62.000 × 0,35 € = 21.700 €).
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-20 · Wahr/Falsch
**Aussage:** Eine Abweichung von der gesetzlichen Rangfolge der Abfallhierarchie braucht eine Begründung, die den gesamten Lebensweg betrachtet; geringere Kosten allein ersetzen diese Begründung nicht.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Die Rangfolge ist ein gesetzlicher Maßstab mit begründeter Abweichung. Abweichen darf, wer begründet, dass eine andere Maßnahme entlang des ganzen Lebenswegs wirksamer schützt; zugleich zählt, was technisch machbar, wirtschaftlich zumutbar und sozial verträglich ist. Kosten wirken über die wirtschaftliche Zumutbarkeit der Verwertung, ersetzen die Begründung aber nicht. Die betriebliche Prüfreihenfolge dagegen ist eine Entscheidungshilfe, in die die Rechnung stärker eingeht.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-4.4-21 · Mehrfachauswahl
**Frage:** Im Zentrallager werden Kartonage, Folie, Holzpaletten und Textilreste bisher alle im Container für gemischte Gewerbeabfälle gesammelt. Was ist laut Gewerbeabfallrecht ein sinnvoller Schritt?
- [x] Für Papier, Pappe und Karton, Kunststoffe, Holz und Textilien getrennte Behälter aufstellen.
- [ ] Alles weiter gemischt sammeln, weil das Entsorgungsunternehmen am Ende ohnehin sortiert.
- [x] Die Getrennthaltung mit Plan der Behälterplätze, Fotos und Wiegescheinen belegen.
- [x] Falls eine Trennung wirklich nicht möglich ist, die Gründe schriftlich festhalten.
**Erklärung:** Bestimmte Fraktionen sind getrennt zu sammeln, und die Getrennthaltung muss dokumentiert sein. Ausnahmen gelten nur bei technischer Unmöglichkeit oder wirtschaftlicher Unzumutbarkeit und brauchen eine festgehaltene Begründung. Dass am Ende sortiert wird, ersetzt die Trennung an der Anfallstelle nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-22 · Kurzantwort
**Frage:** Loreno stellt die Versandkartons von 0,24 kg auf 0,21 kg Gewicht je Sendung um. Der Online-Shop verschickt 132.000 Sendungen im Jahr; das Beispielentgelt für Papier, Pappe und Karton beträgt 0,25 € je kg. Wie viel Euro Lizenzentgelt spart Loreno damit im Jahr?
**Akzeptierte Antworten:** 990; 990 €; 990 Euro; 990 EUR; 990,00; 990,00 €; 990,00 Euro; 990,00 EUR; 990,0; 990,0 €; 990,0 Euro; 990,0 EUR; 990.00; 990.00 €; 990.00 Euro; 990.00 EUR; 990.0; 990.0 €; 990.0 Euro; 990.0 EUR
**Erklärung:** Gewichtsersparnis je Sendung 0,24 kg − 0,21 kg = 0,03 kg; im Jahr 132.000 × 0,03 kg = 3.960 kg. Ersparnis: 3.960 kg × 0,25 €/kg = 990 €. Die Ersparnis bei Entsorgungskosten der Filialen oder beim Einkaufspreis des Kartons ist darin nicht enthalten.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-23 · Sortieren
**Anweisung:** Loreno will Versandverpackungen für den Online-Shop erstmals in Verkehr bringen. Bringe die Schritte in eine sinnvolle Reihenfolge.
1. Klären, welche Verpackungen Loreno selbst erstmals in Verkehr bringt und welche vorbeteiligt sind
2. Im Verpackungsregister registrieren
3. Die Verpackungen mit Menge je Materialart bei einem dualen System beteiligen
4. Weichen die Ist-Mengen später von der Planmenge ab, die Meldung beim System und im Register anpassen
**Erklärung:** Zuerst wird die Rolle geklärt, danach folgen Registrierung und Beteiligung vor dem ersten Inverkehrbringen. Die Anpassung der Meldung gehört in den laufenden Betrieb, wenn die tatsächlichen Mengen von der Planung abweichen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-24 · Entweder-Oder
**Frage:** Die Tragetaschen der Filialen liefert ein inländisches Unternehmen, das sie bereits bei einem dualen System beteiligt hat. Wer muss die Tragetaschen noch einmal beteiligen?
- [ ] Loreno, weil sie die Taschen an die Kundschaft abgibt und die Pflicht bei der letzten Handelsstufe liegt
- [x] Niemand, denn die nachgewiesene Beteiligung genügt
**Erklärung:** Serviceverpackungen wie Tragetaschen können von vorgelagerten Lieferunternehmen vorbeteiligt werden; dann entfällt die Beteiligung bei Loreno als letzter Handelsstufe. Eine zweite Beteiligung würde doppelt zahlen. Loreno lässt sich die Vorbeteiligung bestätigen, denn fehlt sie, muss Loreno selbst beteiligen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-25 · Multiple Choice
**Frage:** Loreno beauftragt für gebrauchte Tonerkartuschen ein Entsorgungsunternehmen und erhält später Rückfragen der Behörde, weil das Unternehmen die Abfälle nicht ordnungsgemäß entsorgt hat. Welche Aussage trifft zu?
- [ ] Loreno ist nicht mehr zuständig, weil die Abfälle mit der Übergabe an das beauftragte Unternehmen in dessen Besitz übergegangen sind.
- [x] Loreno bleibt verantwortlich, bis die Entsorgung ordnungsgemäß abgeschlossen ist.
- [ ] Verantwortlich ist allein das Entsorgungsunternehmen, weil es die Abholung durchgeführt und die Abfälle behandelt hat.
- [ ] Verantwortlich ist nur die Filiale, die die Kartuschen gesammelt hat, nicht die Zentrale des Unternehmens.
**Erklärung:** Wer Dritte beauftragt, bleibt für die Pflichten verantwortlich, bis die Verwertung oder Beseitigung ordnungsgemäß abgeschlossen ist, und muss das Unternehmen sorgfältig auswählen. Deshalb gehören Auswahl, Vertrag und Belege zusammen. Die Aufteilung auf Filiale, Zentrale und Entsorgungsunternehmen regelt die interne Zuständigkeit, nicht die Verantwortung gegenüber der Behörde.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-4.4-26 · Was passt nicht dazu
**Frage:** Welcher Schritt gehört nicht zu den Pflichtschritten vor dem ersten Inverkehrbringen von Versandverpackungen?
- [ ] Registrierung im Verpackungsregister
- [ ] Beteiligung bei einem dualen System
- [ ] Meldung der beteiligten Mengen je Materialart
- [x] Bestellung von Abfallbeauftragten
**Erklärung:** Registrierung, Beteiligung an einem dualen System und Mengenmeldung gehören zum Verfahren des Verpackungsrechts. Abfallbeauftragte sind nur für bestimmte Betriebe nach einer eigenen Verordnung vorgeschrieben und kein Schritt vor dem Inverkehrbringen von Verpackungen.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-4.4-27 · Kurzantwort
**Frage:** Loreno hat für Kunststoffverpackungen eine Menge von 3.700 kg im Jahr gemeldet; tatsächlich werden 4.380 kg verpackt. Das Beispielentgelt beträgt 0,85 € je kg. Um wie viel Euro steigt das Lizenzentgelt, wenn die Meldung auf die tatsächliche Menge angepasst wird?
**Akzeptierte Antworten:** 578; 578 €; 578 Euro; 578 EUR; 578,00; 578,00 €; 578,00 Euro; 578,00 EUR; 578,0; 578,0 €; 578,0 Euro; 578,0 EUR; 578.00; 578.00 €; 578.00 Euro; 578.00 EUR; 578.0; 578.0 €; 578.0 Euro; 578.0 EUR
**Erklärung:** Mehrmenge 4.380 kg − 3.700 kg = 680 kg. Mehrentgelt: 680 kg × 0,85 €/kg = 578 €. Typischer Fehler: die gesamte Menge neu zu bewerten (4.380 kg × 0,85 € = 3.723 €) statt der Abweichung.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.4-28 · Lückentext (Wortauswahl)
**Text:** Bei gefährlichen Abfällen belegt der ___Begleitschein___ jede einzelne Übergabe an das Entsorgungsunternehmen, während der Entsorgungsnachweis vorab die Zulässigkeit der Entsorgung zeigt.
**Zusätzliche Begriffe:** Lieferschein; Übernahmebeleg; Rechnung
**Erklärung:** Der Begleitschein dokumentiert bei jeder Übergabe den Weg des gefährlichen Abfalls. Der Lieferschein begleitet Ware zur Kundschaft, der Übernahmebeleg des Bestands bestätigt nur die Übernahme der Menge, und die Rechnung betrifft die Abrechnung der Leistung. Der Entsorgungsnachweis kommt vor der ersten Übergabe.
`schwierigkeit: leicht` · `bloom: erinnern`
