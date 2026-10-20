# Prüfung P-AL Teil A (Immobilienfachwirt: Maklerrecht, Erlaubnis, Energieausweis)

Stand 20.10.2026. Geprüft: `ersetzungen-a.json` (77 Paare, 11 Dateien), `rechtsangaben-a.md` (25 Zeilen), `befund-uebersicht-a.md`. Vorgehen: alle 77 Paare in einem Node-Skript nacheinander auf Kopien des Bestands angewendet (jede alte Zeichenkette genau ein einzeiliger Treffer, sowohl im Original als auch fortlaufend; kein Treffer in der neuen Zeichenkette eines früheren Paars; keine Item-ID und kein Fachgesprächs-Fragetext geändert; alle 77 NEU-Texte gelesen, die Ergebnisdateien vollständig gelesen). Rechtsaussagen am Rohtext: gesetze-im-internet.de per `curl` (BGB, WoVermittG, GewO, MaBV, VwVfG, GEG/GModG) und das amtliche Bundesgesetzblatt 2026 I Nr. 226 direkt von recht.bund.de (PDF, 59 Seiten, selbst gelesen, nicht über die Drittseite).

## Ergebnis auf einen Blick

Mechanik sauber (0 Mängel). Kern der Rechtskorrekturen stimmt und ist am Rohtext bestätigt (Textform § 656a gilt unabhängig vom Verbraucherstatus; Sachkundenachweis steht nicht in § 34c Abs. 2; GModG-Umbenennung und Neufassung § 87 ab 01.01.2027 stimmen mit dem BGBl überein). Es bleiben **1 hohe, 7 mittlere, 9 niedrige** Befunde, vor allem: ein Satz in der F-HB6-01-Musterlösung, der den berichtigten Fehler wieder einführt, eine Musterlösung zum Neubau, die für das Szenario das falsche Recht (Stand vor 2027) anwendet, ein nicht korrigierter Satz in F-HB3-03 (Erlaubnis bei Verwalter:innen), die weiter falsche Schadensersatz-Bedingung in der Theorie und ein Quiz mit längster richtiger Antwort.

## Hohe Befunde

**H-1 · `hb6/fallaufgaben.md`, Paar 31 (F-HB6-01 Musterlösung Teilaufgabe 3)**
Fehler: „Die gesetzliche Kostenteilungsregelung (Textform des Maklervertrags und Begrenzung der Käuferbelastung) gilt nur für Kaufverträge über Wohnungen und Einfamilienhäuser mit Verbrauchern als Käufern …“. Das führt genau den Fehler wieder ein, den FL-IM-02 berichtigt: Die Textform (§ 656a BGB) gilt für Wohnung und Einfamilienhaus **unabhängig** vom Verbraucherstatus; nur §§ 656c/656d sind nach § 656b auf Verbraucher als Käufer begrenzt (am Rohtext gelesen). Widerspruch zu T 6.1 und T 1.1 in derselben Lieferung.
Korrektur: „Die gesetzliche Kostenteilungsregelung (Begrenzung der Käuferbelastung, Gleichheit bei Doppeltätigkeit) gilt nur für Kaufverträge über Wohnungen und Einfamilienhäuser mit Verbrauchern als Käufern, nicht für ein Mehrfamilienhaus mit acht Wohneinheiten; dort sind Provision und Verteilung frei vereinbar (der Maklervertrag ist grundsätzlich formfrei, Textform bleibt aus Beweisgründen ratsam) …“ und am Ende „der Maklervertrag braucht dann die Textform, auch bei einem unternehmerischen Käufer“ oder unverändert lassen.

## Mittlere Befunde

**M-1 · `hb6/fallaufgaben.md`, Paar 33 (F-HB6-02 Musterlösung Teilaufgabe 2) und Paar 32**
Fehler: Die Wohnungen werden erst in 18 Monaten fertig; ihr Energieausweis wird deshalb zwingend **nach** dem 01.01.2027 ausgestellt (Art. 2 und Art. 9 Abs. 2 des Gesetzes vom 23.07.2026, § 112 Abs. 3 neu gilt nur für vor 2027 ausgestellte Ausweise). Für dieses Szenario gelten die neuen Pflichtangaben (Ausstellungsdatum, Jahres-Primärenergiebedarf, Energieeffizienzklasse, Baujahr, Energieträger), die Musterlösung nennt als Antwort aber den Endenergiebedarf und die Bedarfs-/Verbrauchsausweis-Unterscheidung und stellt den Hinweis auf 2027 nur als Klammer („Stand Oktober 2026“) nach. Sachlich ist der Satz „liegt zum Vertriebsstart noch kein Energieausweis vor“ richtig (§ 80 Abs. 1: auszustellen nach Fertigstellung), aber die Aufgabe fragt nach den Pflichtangaben „die in einer Immobilienanzeige stehen müssen“.
Korrektur: In der Musterlösung nach dem Neubau-Satz ergänzen: „Weil der Energieausweis für diese Wohnungen erst nach dem 01.01.2027 ausgestellt wird, gelten dafür die neu gefassten Pflichtangaben (u. a. Ausstellungsdatum, Jahres-Primärenergiebedarf, Energieeffizienzklasse, Baujahr, wesentliche Energieträger); für heute vorliegende Ausweise gelten die oben genannten.“ Als Alternative im Aufgabentext „bei einer bereits fertiggestellten Bestandswohnung“ ansetzen.

**M-2 · `hb3/fallaufgaben.md`, F-HB3-03 Ausgangssituation (kein Paar vorhanden)**
Fehler: „zwei bereits bei Ravelin tätige Verwalter:innen der Hausverwaltung (Erlaubnis als Wohnimmobilienverwalter nach § 34c Abs. 1 Satz 1 Nr. 4 GewO)“ lässt die angestellten Personen die Erlaubnis haben. Das widerspricht FL-IM-12 (Paar 63 ff.), der Bericht nennt F-HB3-03 ausdrücklich als betroffen. Teilaufgabe 2 der Musterlösung (Paar 72) verweist selbst auf „Gewerbetreibende“.
Korrektur (neues Paar): alt `zwei bereits bei Ravelin tätige Verwalter:innen der Hausverwaltung (Erlaubnis als Wohnimmobilienverwalter nach § 34c Abs. 1 Satz 1 Nr. 4 GewO)` neu `zwei bereits bei Ravelin tätige, unmittelbar an der Verwaltung mitwirkende Beschäftigte der Hausverwaltung (Ravelin besitzt als Gewerbetreibende die Erlaubnis als Wohnimmobilienverwalter nach § 34c Abs. 1 Satz 1 Nr. 4 GewO)`.

**M-3 · `hb6/6.1-…md`, Paar 8 (T 6.1 „Aufklärungs- und Sorgfaltspflichten“) und K-6.1-11, Q-6.1-13 (nicht angefasst)**
Fehler: (a) Der Satz „Verletzt eine Maklerin diese Pflicht vorsätzlich oder grob fahrlässig, drohen Schadensersatzansprüche und bei einem schwerwiegenden Treuebruch der Verlust …“ bindet den **Schadensersatz** an Vorsatz oder grobe Fahrlässigkeit; er besteht bei jedem Verschulden (§ 280 BGB; einfache Fahrlässigkeit genügt). Nur die Verwirkung braucht schweren Treuebruch. Das Paar formuliert den Satz neu und behält den Fehler (im Umfang von FL-IM-41). (b) K-6.1-11 („Schadensersatzansprüche und Verlust des Provisionsanspruchs“) und Q-6.1-13 („vorsätzlich oder grob fahrlässig … Verlust des Provisionsanspruchs“) stellen den Verlust als sichere Folge dar und stehen im Widerspruch zu „die Gerichte nehmen die Verwirkung nur in engen Grenzen an“. Die Übersicht nennt sie „jetzt durch die Theorie eingeordnet“, aber ein Lernender, der nur die Karte sieht, lernt das Falsche.
Korrektur: Theorie: „Verletzt eine Maklerin diese Pflicht schuldhaft, drohen Schadensersatzansprüche; bei einem schwerwiegenden Treuebruch (Vorsatz oder grobe Leichtfertigkeit) kann zusätzlich der Provisionsanspruch verwirkt sein; die Gerichte nehmen das nur in engen Grenzen an.“ K-6.1-11 Antwort: „Schadensersatzansprüche und, bei schwerem Treuebruch im Einzelfall, der Verlust des Provisionsanspruchs.“ Q-6.1-13: „… drohen ___Schadensersatzansprüche___ und unter Umständen auch der Verlust des Provisionsanspruchs.“ (Lückenwort unverändert).

**M-4 · `hb6/6.2-…md`, Paar 46 (Q-6.2-06)**
Fehler: Richtige Antwort „Reihenfolge der Notartermine“ (28 Zeichen) ist jetzt die **längste** Option (Produktpolitik 14, Preispolitik 12, Kommunikationspolitik 21). Hausregel „richtige Antwort nie die längste“ verletzt (die Bestandsoption „Provisionsteilung“, 17 Zeichen, war es nicht).
Korrektur: kürzere Option, die die Erklärung („organisatorische Abwicklung, siehe Thema 6.4“) trägt, z. B. „Notarterminplanung“ (18) oder „Beurkundungstermin“ (18); Erklärung sinngemäß anpassen (Paar 47). Alternativ „Grundbuchauszug“ (15), Erklärung dann „gehört zur Prüfung und Abwicklung, kein Marketinginstrument“.

**M-5 · Gendern, mehrere Paare (Hausregel)**
Fehler: In den Paaren 63, 64, 66, 68, 74 (hb3/3.1, hb3/fachgespraech) wird im Bestand vorhandenes „Makler:in oder Verwalter:in“ zu „Makler oder Verwalter“ (generisches Maskulinum) umgeschrieben; ebenso neu in Paar 6, 9, 19, 40 („Der Makler darf sich …“, „Der Makler darf sich von beiden Seiten …“) und Paar 54, 67 („Makler oder Verwalter“, „Maklern und Verwaltern“). Der Bestand benutzt sonst „Makler:innen“ und „Maklerin“.
Korrektur: „Makler:in oder Verwalter:in“ bzw. „Makler:innen und Verwalter:innen“ beibehalten; „Der Makler darf …“ zu „Makler:innen dürfen sich von beiden Seiten nur Provision in gleicher Höhe versprechen lassen“. (Substantivierte Partizipien wie „Gewerbetreibende“ sind in Ordnung; „der Gewerbetreibende“ im Singular ist als Rechtsbegriff vertretbar.)

**M-6 · `hb6/6.1-…md`, Paar 5 und rechtsangaben-a.md Nr. 5 („vermutet“) — im Kurstext als gesichert dargestellt**
Fehler: „für Wohnungen im Bestand der eigenen Hausverwaltung entsteht also kein Vermittlungsentgelt“. Der Wortlaut des § 2 Abs. 2 Nr. 2 WoVermittG (Eigentümer, Verwalter, Mieter oder Vermieter ist der Wohnungsvermittler) trägt die Aussage für die **Mietverwaltung** (am Rohtext gelesen). „Im Bestand der eigenen Hausverwaltung“ ist aber unscharf: Es kann auch die reine WEG-Verwaltung (Verwalter des Gemeinschaftseigentums, nicht der einzelnen Mietwohnung) gemeint sein, wo es strittig ist. Nr. 5 trägt zudem „vermutet“, im Text steht „also kein“.
Korrektur: „… für Wohnungen, deren Verwalterin oder Eigentümerin die Ravelin selbst ist (Mietverwaltung der eigenen Hausverwaltung), entsteht in der Regel kein Vermittlungsentgelt.“

**M-7 · `hb6/6.1-…md`, Paare 6, 7 und `hb1/1.1`, Paar 48; `hb6/fachgespraech.md`, Paar 38 (Nr. 6 „vermutet“)**
Fehler: „nicht für Mehrfamilienhäuser“ wird ohne Einschränkung gelehrt. Rechtsprechung stellt für den Begriff „Einfamilienhaus“ auf den für den Makler bei Vertragsschluss erkennbaren Erwerbszweck (Wohnzwecke eines einzelnen Haushalts) ab; ein als Mehrfamilienhaus gestaltetes Objekt kann nach einer OLG-Entscheidung (Websuche, nicht im Original gelesen) trotzdem erfasst sein, Einliegerwohnung oder untergeordnete Gewerbenutzung schließen das Einfamilienhaus nicht aus. Für ein vermietetes Mehrfamilienhaus mit acht Wohneinheiten (F-HB6-01) bleibt die Aussage richtig; als allgemeine Regel ist sie zu hart.
Korrektur: an den drei Stellen „in der Regel nicht für Mehrfamilienhäuser mit mehreren vermieteten Wohnungen (Kapitalanlage)“; Zweifamilienhaus bewusst offen lassen, wie in der Übersicht beschrieben.

## Niedrige Befunde

**N-1 · `hb6/6.1-…md`, Paar 15 (Q-6.1-03 Erklärung):** „Strenge Schriftform mit Unterschrift ist nirgends verlangt.“ „Nirgends“ ist falsch: § 655b BGB verlangt für den Darlehensvermittlungsvertrag mit Verbrauchern die schriftliche Form (am Rohtext gelesen). Auch „Bei anderen Objekten“ übersieht, dass die Mietwohnungsvermittlung ebenfalls Textform braucht. Korrektur: „Strenge Schriftform mit Unterschrift ist für Maklerverträge über Immobilien nicht verlangt; die Textform genügt.“ und „Bei anderen Kaufobjekten, etwa Mehrfamilienhäusern, …“.

**N-2 · `hb6/6.1-…md`, Paar 6 (Einleitungssatz von „Provisionsrecht“):** Der unveränderte Einstieg „Bei der Vermittlung von Kaufverträgen über Wohnungen und Einfamilienhäuser **an Verbraucher** gilt seit Dezember 2020 die Regelung der §§ 656a bis 656d“ steht im Spannungsverhältnis zu „§ 656a … gilt auch bei unternehmerischen Käufern“. Korrektur (neues Paar mit alter Zeichenkette aus dem Einstieg): „Bei der Vermittlung von Kaufverträgen über Wohnungen und Einfamilienhäuser gilt seit Dezember 2020 …“.

**N-3 · `hb6/6.1-…md`, Paar 3 (Erlaubnisfolgen):** § 35 Abs. 1 GewO sagt „ist … zu untersagen“, wenn die Untersagung zum Schutz der Allgemeinheit oder der Beschäftigten erforderlich ist (am Rohtext gelesen); „kann die Behörde … untersagen“ ist unscharf. „Zurücknehmen“ (§ 48 VwVfG) setzt eine **von Anfang an rechtswidrige** Erlaubnis voraus; für nachträgliche Unzuverlässigkeit ist es der Widerruf (§ 49 Abs. 2 Nr. 3 VwVfG). Korrektur: „… muss die Behörde die Gewerbeausübung untersagen, wenn das zum Schutz der Allgemeinheit oder der Beschäftigten erforderlich ist, und kann eine nachträglich unzuverlässig gewordene Gewerbetreibende die Erlaubnis widerrufen (eine Rücknahme kommt nur bei von Anfang an rechtswidriger Erteilung in Betracht)“.

**N-4 · `hb6/fallaufgaben.md`, Paar 30 (F-HB6-01 Teilaufgabe 3):** Die Aufgabe nennt selbst „die gesetzliche Kostenteilungsregelung **für Wohnungen und Einfamilienhäuser**“ und gibt damit die Antwort („gilt sie auch für ein Mehrfamilienhaus?“) vor. Korrektur: „… die gesetzliche Kostenteilungsregelung für den Immobilienkauf durch Verbraucher gilt …“.

**N-5 · `hb6/fachgespraech.md` 6.2 (Zeile 70, nicht angefasst):** Die Erwartung „Dazu zählen die Art des Energieausweises, … Baujahr und die Energieeffizienzklasse“ lässt die Bedingung „sofern bei Aufgabe der Anzeige ein Energieausweis vorliegt“ aus (Theorie, K-6.2-05 und F-HB6-02 haben sie jetzt). Die Übersicht nennt diese Stelle „richtig und unverändert“. Korrektur: Erwartung ergänzen „… , sofern bei Aufgabe der Anzeige ein Energieausweis vorliegt“.

**N-6 · `hb3/3.1-…md`, Paar 69 (Q-3.1-12):** Die neue richtige vierte Option hat 136 Zeichen, die übrigen 75, 75 und 66; sie ist die längste. Bei Mehrfachauswahl mit drei richtigen Optionen kaum ein Hinweis, aber leicht zu kürzen: „Bei Leitungspositionen zählt für die Erlaubnis des Unternehmens die Zuverlässigkeit der Leitung.“ (88).

**N-7 · `hb6/6.2-…md`, Paar 43 (K-6.2-05):** Die Karte bekommt „seit Juli 2026 GModG; für ab 2027 ausgestellte Ausweise neu gefasst“, ein Gesetzesname und ein Stand-Zusatz in einer Karte. Die Theorie darf das, die Karte nicht ohne Not (Hausregel); der Bestand nannte nur „§ 87 GEG“. Korrektur: Karte unverändert lassen oder nur „(§ 87 GEG)“; Stand-Hinweis in Theorie und Fall genügen.

**N-8 · Bestand, nicht angefasst, aber widersprüchlich zur Eigenvertrieb-Korrektur (Nr. 9 der Rechtsangaben):** `hb6/6.1` Z. 41 „Bei der **Vermittlung** von Neubauwohnungen der Ravelin-Bauträgersparte klärt die Maklerabteilung …“ und `hb6/6.4` Z. 25 „Bei der Vermittlung von Neubauwohnungen der Ravelin-Bauträgersparte ist der Verhandlungsspielraum …“. Korrektur: „Beim Vertrieb von Neubauwohnungen …“ (zwei Paare). Weiter `hb1/1.4` (K-1.4 „Wofür steht die Abkürzung GEG?“, Theorie Z. 19 bis 21) nennt nur „Gebäudeenergiegesetz“, während 6.2 jetzt von der amtlichen Umbenennung in GModG spricht; ein Satz „seit Juli 2026 amtlich GModG“ in `hb1/1.4` Theorie würde das angleichen. Außerdem Q-6.1-10 (Risikomatrix): „Geringfügige Verzögerung bei der Energieausweis-Aushändigung … → Akzeptieren“; die nicht unverzügliche Übergabe ist bußgeldbewehrt (im GEG-Bußgeldkatalog, Abs. 1 Nr. 19 der Bußgeldvorschrift, im BGBl-Text gelesen) und „Aushändigung“ ist der alte Begriff gegenüber „Übergabe“.

**N-9 · `rechtsangaben-a.md`:** Nr. 19 nennt Art. 1, 2 und 9: bestätigt (Art. 1: Überschrift GModG, tritt am Tag nach der Verkündung in Kraft, also 29.07.2026; Art. 2 und 7: 01.01.2027). Der Hinweis „Abgleich mit dem amtlichen BGBl-Original nicht erfolgt“ ist durch diese Prüfung erledigt. Das Vollzitat bei gesetze-im-internet.de nennt „Artikel 4 des Gesetzes vom 23. Juli 2026“ als letzte Änderung (dort anders gezählt: Artikel 4 ist die Änderung zum 01.01.2030); das ist kein Widerspruch, aber Förmliche Prüfung sollte nicht darüber stolpern. Nr. 17: „im BGBl-Text unverändert“ stimmt (Art. 2 Nr. 32 ersetzt § 80 mit demselben Abs. 4 Satz 1 bis 5; entfallen ist nur der Satz zum Beratungsgespräch bei Ein- und Zweifamilienhäusern).

## Faktencheck am Rohtext (Ergebnis je Aussage)

| Aussage | Ergebnis |
|---|---|
| § 656a BGB: Textform für Nachweis oder Vermittlung eines Kaufvertrags über Wohnung oder Einfamilienhaus, ohne Verbraucherbezug | **bestätigt** (Wortlaut; Berichtigung des Auftrags ist richtig) |
| § 656b: §§ 656c und 656d gelten nur, wenn der Käufer Verbraucher ist | bestätigt |
| § 656c Abs. 1, 2: gleich hoher Lohn, unentgeltliche Tätigkeit schließt Lohn der anderen Partei aus, abweichender Vertrag unwirksam | bestätigt |
| § 656d Abs. 1: Abwälzung nur, wenn beauftragende Partei mindestens in gleicher Höhe zahlungspflichtig bleibt; Fälligkeit nach Nachweis | bestätigt (deckt „höchstens die Hälfte“ aus FL-IM-01) |
| § 652 Abs. 1: Lohn nur, wenn Vertrag infolge Nachweis oder Vermittlung zustande kommt | bestätigt (trägt Q-6.1-09 und Eigenvertrieb-Argument; „Vertrag mit einem Dritten“ ist Rechtsprechung, nicht im Wortlaut) |
| § 654 BGB, Verwirkung | Wortlaut betrifft Tätigkeit für die Gegenseite; Anwendung auf Aufklärungspflichtverletzungen ist Rechtsprechung, nicht am Rohtext prüfbar (siehe M-3) |
| WoVermittG § 2 Abs. 1 (Anspruch nur bei Zustandekommen; Vermittlungsvertrag bedarf der Textform), Abs. 2 Nr. 2 und 3 | bestätigt; Anwendung auf die eigene Hausverwaltung siehe M-6 |
| § 34c Abs. 1 Satz 1 Nr. 3 Buchst. a, Nr. 4; Abs. 2 Nr. 1 bis 3: Erlaubnis dem Gewerbetreibenden, Zuverlässigkeit auch der Leitungspersonen | bestätigt |
| **Kein Sachkundenachweis in § 34c Abs. 2 (Makler und Verwalter)** | **bestätigt**: Abs. 2 hat nur Zuverlässigkeit, ungeordnete Vermögensverhältnisse, Berufshaftpflicht bei Verwaltern; Abs. 2a nur Weiterbildung. „Sachkundenachweis“ wurde zu Recht ersetzt. Reformstand 2026 (Sachkunde) ist im abgerufenen Text nicht enthalten, bleibt zeitkritisch |
| § 34c Abs. 2a, § 15b MaBV: 20 Stunden in drei Kalenderjahren, nur Nr. 4 und unmittelbar mitwirkende Beschäftigte; Nachweise drei Jahre | bestätigt (kein Makler mehr; § 15b Abs. 4 MaBV: für Immobilienfachwirt-Absolvent:innen beginnt die Pflicht drei Jahre nach dem Abschluss, im Kurs nicht erwähnt, kein Fehler) |
| § 144 Abs. 2 Nr. 5a (Weiterbildung), Abs. 1 Nr. 1 Buchst. h, j (ohne Erlaubnis) | bestätigt; § 18 MaBV nennt den Weiterbildungsverstoß nicht (er steht in § 144 GewO), das Paket zitiert zutreffend |
| § 35 Abs. 1 GewO, § 48/§ 49 Abs. 2 Nr. 3 VwVfG | bestätigt; Feinheiten siehe N-3 |
| § 312 Abs. 2 Nr. 1, 2, Abs. 3 Nr. 3, Satz 2 und § 356 Abs. 5 Nr. 2 BGB: Widerruf nicht bei notariellen Verträgen und Grundstücksverträgen; Wohnraummiete eingeschränkt, nicht bei vorheriger Besichtigung; Erlöschen bei Dienstleistung | bestätigt (K-1.3-14 und T 1.3 stimmen; „per E-Mail“ als Fernabsatz setzt ein organisiertes Fernabsatzsystem voraus, im Text als „z. B.“ vertretbar) |
| **GEG heißt seit dem Tag nach der Verkündung (29.07.2026) „Gebäudemodernisierungsgesetz (GModG)“**, BGBl. 2026 I Nr. 226 | **bestätigt** (Art. 1 Nr. 1 Überschrift, Art. 9 Abs. 1; amtliche Fassung bei gesetze-im-internet trägt die Überschrift) |
| **§ 87 neu gefasst für ab 01.01.2027 ausgestellte Ausweise** | **bestätigt** (Art. 2 Nr. 34, Art. 9 Abs. 2; Pflichtangaben: Art des Ausweises nach § 81 oder § 82, Ausstellungsdatum, Jahres-Primärenergiebedarf in kWh je m² und Jahr, Energieeffizienzklasse, Baujahr, wesentliche Energieträger; § 112 Abs. 3 und 4 neu: bisherige Angaben für vor 2027 ausgestellte Ausweise). Der Satz in T 6.2 „Pflichtangaben … statt Endenergiebedarf bzw. -verbrauch“ stimmt |
| § 80 Abs. 4, 5: Vorlage spätestens bei Besichtigung (Aushang genügt), sonst unverzüglich; Übergabe unverzüglich nach Vertragsschluss; bei Vermietung entsprechend | bestätigt, auch in der Fassung ab 2027 |
| § 80 Abs. 1: Energiebedarfsausweis nach Fertigstellung, damit bei Neubau vor Fertigstellung kein Ausweis vorliegt | bestätigt (siehe aber M-1) |
| Zweifamilienhaus/Mehrfamilienhaus bei § 656a ff. | im Gesetz nicht definiert; Rechtsprechung zum erkennbaren Erwerbszweck (Websuche), siehe M-7 |
| Aufklärungspflicht bei offensichtlichen Mängeln (F-HB6-03, „vermutet“, Nr. 22) | Rechtsprechung nicht am Rohtext prüfbar. Der Kurstext sagt „in der Regel keine gesonderte Hinweispflicht“ und führt „sie spricht sie dennoch offen an“ an: ausreichend gehedgt, kein Befund. § 442 Abs. 1 Satz 1 BGB (Kenntnis des Käufers schließt Mängelrechte aus) im Wortlaut richtig |
| Nr. 16 (wiederholte Weiterbildungsverstöße können die Zuverlässigkeit in Frage stellen) | im Text mit „kann“ und „in Frage stellen“ gehedgt, vertretbar |

Die vier „vermutet“-Zeilen: Nr. 5 wird im Text zu sicher dargestellt (M-6), Nr. 6 zu pauschal (M-7), Nr. 16 und Nr. 22 sind ausreichend gehedgt.

## Fälle

- **F-HB6-01** (Objekt bleibt Mehrfamilienhaus): Punkteraster 5 + 6 + 5 + 4 = 20 unverändert, Musterlösung TA3 inhaltlich stimmig bis auf H-1; TA4 (Mietverhältnisse ungefragt offenlegen) passt weiter. Ausgangssituation ändert „Kaufpreisverteilung“ in „Provisionsverteilung“ und verrät nichts. TA3-Formulierung gibt die Abgrenzung vor (N-4).
- **F-HB6-03**: Ausgangssituation (verdeckter, der Maklerin aus einem Schadensbericht bekannter Mangel) ist rechtlich sauber und für die Prüfung der Aufklärungspflicht nötig, verrät keine Rechtsfolge. TA1-Musterlösung stimmig (Schadensersatz der Käuferin, Verwirkung nur im Einzelfall, offensichtlicher Mangel anders); die Formulierung „soweit die Käuferin selbst Provision schuldet“ ist korrekt vorsichtig. TA2 bis TA4 passen. Offen nur M-3 (Theorie/Karte/Quiz).
- **F-HB6-02**: siehe M-1. Punkteraster 5 + 5 + 5 + 5 = 20 unverändert.
- **F-HB3-03**: Musterlösung TA2 stimmig (laufender Dreijahreszeitraum, Handlungsdruck, Ordnungswidrigkeit, kein Erlöschen); Ausgangssituation siehe M-2.

## Bestand und Quer-Konsistenz

- Keine Widersprüche zu FL-IM-01 (Q-6.1-08, K-6.1-09, Q-1.1-03 „höchstens die Hälfte“ bleiben richtig) und FL-IM-05 (Weiterbildung nur Verwalter, ab 24.07.2026 nicht mehr Makler) in den neuen Texten. Q-3.3-* und K-3.3-* unberührt und konsistent.
- `hb2`, `hb5`: Provisionen nur im Zusammenhang externer Makler:innen, konsistent mit Eigenvertrieb. `hb2/fallaufgaben` (Kapitalanleger kauft über die Maklerabteilung) bleibt unproblematisch.
- Verbleibende Stellen siehe N-8. Duell `game-kennzahlen-duell-immobilien-aehnlich.ts` Z. 279 bis 286 und Prüfblatt 18 Z. 624, 978 bis 985 (und 689 bis 691): Zeilennummern der Übersicht stimmen; die Aussagen (Energiebedarf bzw. -verbrauch ohne Klasse und Bedingung) sind weiter unvollständig, wie gemeldet. Memory- und Kreuzworträtsel-Spiele enthalten nichts Betroffenes.

## Hausregeln

- Duzen/Siezen: Karten und Quiz neutral oder dritte Person, Fälle siezen, in Ordnung.
- Gendern: siehe M-5.
- Keine neuen Paragrafen oder Gesetzesnamen in Karten und Quiz außer N-7 (Gesetzesname GModG in K-6.2-05); alle übrigen Paragrafen in Karten/Quiz stammen aus dem Bestand (K-1.3-09, K-1.3-10, Q-3.1-12-Erklärung, K-3.1-03/Q-3.1-02 „§ 34c“).
- IDs unverändert; Quiztypen unverändert; Sortieren (Q-6.1-09) weiter genau 4 Elemente; Zuordnung Q-6.1-12 vier Paare, eindeutig; Q-6.1-07 zwei Optionen, richtige kürzer (53 gegen 61); Q-6.1-11 genau eine richtige, richtige 84 Zeichen, Distraktoren 72, 92, 139; Q-6.1-03 Wahr/Falsch Schlüssel „Falsch“ unverändert und richtig; Q-3.1-02 richtige 31 Zeichen, kürzeste.
- Zahlenformat und Datumsangaben einheitlich.

## Besonders gründlich geprüfte Paare (Zeichenkettenebene)

Paare 5, 6, 7, 16 bis 18, 23 bis 27, 31, 33, 38, 40, 46, 51, 63, 72: Alt-Text in der Bestandsdatei als einzeiliger Treffer geprüft und das Ergebnis im angewendeten Text gelesen (Absatz- und Listenstruktur, Einrückung der Fachgespräch-Erwartungen, Markdown-Marker `- [x]`/`- [ ]`, Backticks der Metazeilen unberührt).

## Zahlen

77 Paare geprüft (alle mechanisch, alle inhaltlich gelesen, 23 besonders genau). 25 Rechtsaussagen/Normen am Rohtext oder BGBl gelesen: §§ 652, 654, 655b, 656a, 656b, 656c, 656d, 125, 126b, 442, 312, 312g, 356 BGB; § 2 und § 6 WoVermittG; §§ 34c, 35, 144 GewO; §§ 15b, 18 MaBV; §§ 48, 49 VwVfG; §§ 80, 87 GEG/GModG (gesetze-im-internet, Stand 20.10.2026); BGBl. 2026 I Nr. 226 Art. 1, 2 (Nr. 32, 34, 45), 9; zusätzlich Websuche zum Anwendungsbereich „Einfamilienhaus“ (Rechtsprechung, nicht im Original gelesen).
