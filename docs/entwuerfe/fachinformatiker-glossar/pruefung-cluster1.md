# Prüfung Cluster 1 (P-AZ): Glossar-Entwürfe fu6, ae2, dv4, si5

Prüfer:in unabhängig vom Autor, Stand 23.10.2026. Geprüft: `glossar-fu6.md` (45), `glossar-ae2.md` (10), `glossar-dv4.md` (7), `glossar-si5.md` (7) gegen die eingespielten Themendateien 6.2, 6.6, 6.7, 6.8, 9.1, 11.3, 12.2 (Kurs Anwendungsentwicklung bzw. DV/SI), die Rechtsangaben-Blätter a bis g, `bestand-begriffe.txt`, die Cluster-2-Entwürfe und den echten Fachbegriff-Sucher. Nichts verändert, nichts committet. Die Primärquellen (eur-lex, gesetze-im-internet) waren in dieser Umgebung nicht abrufbar; gegen die Rechtsangaben-Blätter (dort „am Rohtext gelesen“ bzw. „vermutet“) und das eigene Fachwissen gelesen. Wo ein Befund auf Wissen jenseits der Theorie beruht, steht das dabei.

Ergebnis in Zahlen: **hoch 6, mittel 24, niedrig 15**, dazu 8 Ergänzungsvorschläge (Abschnitt 4).

## 0. Mechanik und Sucher-Lauf (Vorab)

**Mechanik bestanden.** Eigenes Skript (nicht das des Autors): alle 69 Blöcke parsen im Format von `parseGlossar`; `Thema:` und `Abschnitt:` stimmen wörtlich mit Themencode und `###`-Überschrift der Zieldatei überein; Definitionen 139 bis 279 Zeichen (Grenze 280 eingehalten, Grenze des Tests im Repo 400); keine Ziffern in Definitionen; keine Du/Sie-Anrede; keine Kollision von Begriff oder Alias mit `bestand-begriffe.txt` (alle vier Kurse), mit den Cluster-2-Entwürfen oder untereinander. Gendern: Rollenbegriffe der Gesetze („Verantwortlicher“, „Importeure“, „Betreiber“) stehen wie in der Theorie, „Nutzer:innen“ mit Doppelpunkt; kein Befund außer N-12.

**Wie der Sucher tatsächlich arbeitet (wichtig für alles Folgende).** `packages/shared/src/fachbegriffe.ts` markiert ganze Wörter, Groß-/Kleinschreibung egal (Akronyme bis 6 Zeichen exakt), einfache Endungen `-e/-en/-er/-es/-n/-s` **nur am Ende des ganzen Begriffs** (Adjektivendungen mitten im Begriff wie „aktiv ausgenutzten Schwachstelle“ oder „wichtigen Einrichtung“ matchen nicht), je Text nur das erste Vorkommen. Nach F-165 (Anforderungskatalog) wird **nur nach der Antwort** markiert: in Quiz-Erklärung, Frage/Optionen nach Auswertung, aufgedeckter Karteikarte und Prüfungsauswertung. **Die Theorie wird nicht markiert** (TheorieReader nutzt `FachbegriffText` nicht; es gibt auch keine Glossarliste). Ein Eintrag wirkt also nur, wenn Begriff oder Alias in Karten- oder Quiztexten vorkommt. Das ist die Messgröße unten.

**Lauf mit dem echten Sucher** (Datei 1:1 kopiert, `pruef-c1-sucher.mjs`): alle 69 Einträge + Bestand-Glossar des Kurses + Cluster-2-Entwürfe, über alle Themendateien aller vier Fachinformatiker-Kurse, getrennt nach Theorie, Karteikarten, Quiz, je Textzeile segmentiert (1389 Markierungen von Cluster-1-Einträgen). Die vollständige Tabelle steht in Abschnitt 5. Kurz:

- **10 Einträge sind nirgends markierbar (tot, auch nicht in der Theorie):** Hersteller (CRA), Integrator (CRA), Anbieter (KI-Verordnung), Betreiber (KI-Verordnung), Maschine (Maschinenverordnung), Hersteller (Maschinenverordnung), Wichtiges Produkt, Einwilligung zum Endgerätezugriff, Unbedingt erforderlicher Zugriff, Privilegiertes Konto.
- **13 weitere Einträge sind in Karten und Quiz tot** (Markierung nur in der Theorie, die nicht markiert wird): Kenntniserlangung, Koordinierte Offenlegung, Konformitätsbewertung, Schwerwiegender Sicherheitsvorfall, Verwalter quelloffener Software, KI-Modell mit allgemeinem Verwendungszweck, Hochrisiko-KI-System, Gebotene Sorgfalt, Threat Modeling, Systemverwaltungssystem, Konzept zur Bewältigung von Sicherheitsvorfällen, Wiederholte Vorfälle, Vorfallprotokoll. Bei den ersten Fünf lässt sich das mit Aliasen reparieren (siehe Befunde), bei den übrigen fehlt schlicht der Gebrauch in Karten/Quiz; sie sind Streichkandidaten oder warten auf neue Karten.
- **Echte Gewinne** (viele Markierungen in Karten/Quiz): Wichtige Einrichtung, Jahresarbeitseinheiten, Risikomanagementmaßnahmen, Geschäftsleitung, Lieferkettensicherheit, Software-Stückliste/SBOM, Aktiv ausgenutzte Schwachstelle, Unterstützungszeitraum, KI-System, KI-Kompetenz, Drittland, Angemessenheitsbeschluss, Standardvertragsklauseln, Datenpanne, Datenschutzbeauftragte, OT (19 Markierungen in dv1, dv2, dv3, dv5!), IEC 62443.
- **Falschmarkierungen:** Transitive Abhängigkeit in fu5/5.1 (Normalformen), Alias „Folgenabschätzung“ in fu7/7.5 (Automatisierung). Die übrigen Fremdmarkierungen sind sachgerecht (z. B. Datenpanne in 6.6/6.7, SBOM und Unterstützungszeitraum in 9.1, KI-System in 7.5, Lock-Datei in 10.1, Sicherheitsbauteil in 6.8).

## 1. Hoch

**H-1 Alle qualifizierten Begriffe in Klammern sind tot.** `Hersteller (CRA)`, `Integrator (CRA)`, `Anbieter (KI-Verordnung)`, `Betreiber (KI-Verordnung)`, `Maschine (Maschinenverordnung)`, `Hersteller (Maschinenverordnung)` (fu6, dv4). Der Sucher findet nur die wörtliche Zeichenfolge samt Klammer, die in keinem Text vorkommt: 0 Markierungen in allen vier Kursen, auch nicht in der Theorie. Die Rolle des Autors („Eindeutigkeit kursweit“) ist verständlich, löst das Problem aber nicht, denn „Hersteller“ steht in den Karten/Quiz von 6.7 33-mal, in 9.1 10-mal, in 11.3 17-mal; „Anbieter“ in 6.8 15-mal, „Betreiber“ in 6.8 13-mal. Die Klammer-Variante ist **nicht tragfähig**. Lösung je Begriff:

- **Hersteller:** ein einziger Eintrag `Hersteller` in fu6 mit rechtsübergreifender Definition (CRA und Maschinenverordnung sind inhaltlich gleich gebaut: Entwickeln/Herstellen/Beauftragen plus eigener Name oder Marke); `Hersteller (Maschinenverordnung)` aus dv4 streichen (die Besonderheit „Systemhaus ergänzt nur Netz und Leitsoftware“ steht im Lerntext von 11.3). Fremdmarkierungen in fu2/fu3 (Hardware-Hersteller) bleiben sachlich unschädlich, da dort dieselbe Grundbedeutung gilt.
  Ersatztext (Begriff `Hersteller`, Abschnitt wie bisher):
  **Ersatztext:** Wer ein Produkt selbst entwickelt oder herstellt oder beides in Auftrag gibt und es unter eigenem Namen oder eigener Marke vermarktet, entgeltlich oder unentgeltlich. Entscheidend ist die Marke, nicht, wer programmiert hat. Für Maschinen gilt eine entsprechende Rolle.
- **Anbieter / Betreiber (KI-VO):** Alias „Anbieter“ bzw. „Betreiber“ würde Fremdmarkierungen erzeugen (Anbieter: ae1/8.3 11-mal im BFSG-Sinn, fu2/2.3, fu7/7.2, si1/8.2 23-mal; Betreiber: 6.5, 6.6 „Betreiber kritischer Anlagen“, 8.3, 9.3, 11.3). Empfehlung: **beide Einträge streichen oder** bewusst mit Alias „Anbieter“/„Betreiber“ führen und die Fehlmarkierung hinnehmen (das Popover zeigt den Begriffstitel samt Klammer, bleibt also erkennbar). Die Rollen sind in 6.8 als Text und in einer Zuordnungsfrage gut erklärt; der Mehrwert des Popovers ist gering. Ich empfehle Streichen.
- **Integrator (CRA)** siehe M-2. **Maschine (Maschinenverordnung)** siehe M-12.

**H-2 `Transitive Abhängigkeit` (ae2) wird in fu5/5.1 falsch markiert.** In den Normalformen (3NF) heißt „transitive Abhängigkeit“ etwas anderes (Nichtschlüsselattribut hängt von Nichtschlüsselattribut ab). Echter Sucher: 3 Markierungen in Quiz-Texten von 5.1, dort würde das Popover die Softwarebibliotheks-Definition anzeigen. Außerdem erklärt Thema 10.1 (ae3) den Begriff ausführlicher (Karte „Was sind transitive Abhängigkeiten“). Korrektur: Eintrag aus ae2 **streichen**; die Bedeutung ist über die Lock-Datei-Definition abgedeckt:
**Ersatztext (Lock-Datei):** Datei, die die Versionen der eingesetzten Abhängigkeiten festschreibt und zusätzlich die transitiven, also nur mittelbar über andere Bibliotheken benötigten Abhängigkeiten enthält. In der Praxis wird aus ihr bei jedem Build die Software-Stückliste erzeugt.
(Zusätzlich: Thema der Lock-Datei ist eher 10.1; siehe N-9.)

**H-3 `Aktiv ausgenutzte Schwachstelle` (fu6): „Nur sie ist für Hersteller meldepflichtig“ ist falsch.** Meldepflichtig sind nach 6.7 zwei Dinge: aktiv ausgenutzte Schwachstellen **und** schwerwiegende Sicherheitsvorfälle (der nächste Eintrag sagt es selbst). „Nur sie“ widerspricht dem. Außerdem Ergänzung für Alias-Treffer (aktiv ausgenutzten, Dativform, 3 Treffer in 6.7 entgehen: siehe M-21).
**Ersatztext:** Schwachstelle, für die verlässliche Nachweise vorliegen, dass ein böswilliger Akteur sie ohne Zustimmung des Systemeigners ausgenutzt hat. Sie ist meldepflichtig (wie schwerwiegende Vorfälle), eine bloße Schwachstelle nicht; ein Verdacht genügt nach der Definition nicht.

**H-4 `Wesentliche Änderung` (fu6): „Wer sie vornimmt, gilt als Hersteller“ ist zu weit.** Nach Theorie (Art. 21, 22) gilt als Hersteller, wer wesentlich ändert **und das Produkt bereitstellt** bzw. Einführer/Händler unter eigener Marke; ohne Bereitstellen nicht (z. B. Kundschaft ändert für den Eigengebrauch).
**Ersatztext:** Änderung nach dem Inverkehrbringen, die die Konformität mit den Produktanforderungen berührt oder den geprüften Zweck verschiebt. Wer sie vornimmt und das Produkt bereitstellt, gilt als Hersteller; ob eine Anpassung wesentlich ist, ist eine Einzelfallfrage.
Zusätzlich Alias „wesentlichen Änderung“ (2 Treffer in 6.7 sonst verloren).

**H-5 `Hochrisiko-KI-System` (fu6): Ausnahme fehlt, außerdem tot.** Die Definition sagt „in einem gesetzlich genannten Bereich eingesetzt wird“ und macht daraus ohne Einschränkung ein Hochrisiko-System. Die Theorie nennt die **Ausnahme** (Anhang-III-System gilt nicht als hochriskant, wenn kein erhebliches Risiko; nie bei Profiling) ausdrücklich. Und die Karten/Quiz sagen „Hochrisiko-System(e)“ (8-mal) statt „Hochrisiko-KI-System“: 0 Markierungen. Korrektur: Alias `Hochrisiko-System` (deckt „-Systeme/-Systemen“ über die Endungsregel) und Text:
**Ersatztext:** KI-System, das Sicherheitsbauteil eines regulierten Produkts ist oder in einem gesetzlich genannten Bereich wie Personalauswahl oder Kreditwürdigkeitsprüfung eingesetzt wird. Es unterliegt strengen Anforderungen; im zweiten Fall gibt es eng begrenzte Ausnahmen, nie bei Profiling.
(„eng begrenzt“ ist Wertung; wenn der Autor das nicht stützen will: „es gibt Ausnahmen bei fehlendem erheblichem Risiko, nie bei Profiling“.)

**H-6 Die Begriffe Einführer, Händler (und Bevollmächtigter) fehlen, und der Bericht behauptet fälschlich, „Hersteller (CRA)“ / „Anbieter (KI-Verordnung)“ gäben den Überblick darüber.** Keine der beiden Definitionen nennt Einführer, Händler oder Bevollmächtigten. Die Regel „Einführer/Händler gelten als Hersteller, wenn eigene Marke oder wesentliche Änderung“ ist Kernstoff von 6.7 (Karten K-6.7-03, Zuordnungsquiz mit Einführer/Bevollmächtigter) und kommt in Karten/Quiz 20-mal vor (Einführer 8, Händler 10, Bevollmächtigter 2). Siehe Abschnitt 4 (E-1 bis E-3), Texte dort.

## 2. Mittel

**M-1 `Hersteller`/`Einführer`/`Händler`:** siehe H-1, H-6.

**M-2 `Integrator (CRA)` (fu6):** „Integrator“ ist **kein Begriff des CRA** (Rechtsangaben-Blatt b Zeile 19: nur Art. 13 Abs. 5; 11.3 nennt „Integrator“ ausdrücklich eine Projektbezeichnung ohne Rechtswirkung). Die Klammer „(CRA)“ suggeriert eine Rechtsrolle, die es nicht gibt; die zwei Themen widersprechen sich im Gebrauch. Dazu 0 Markierungen. **Streichen**; die Sorgfaltspflicht steht in „Gebotene Sorgfalt“ (ae2).

**M-3 `Frühwarnung` (fu6) ist auf NIS2 zugeschnitten und lässt die weiteren Stufen weg; `Abschlussmeldung`/`Abschlussbericht` fehlt (bericht-Behauptung falsch).** Der Bericht nennt als Grund für das Weglassen, die Stufen seien „in der Definition von Frühwarnung eingeordnet“. Das stimmt nicht: Der Frühwarnung-Text erwähnt weder Meldung noch Abschluss. Die Inhaltsangabe („Verdacht auf grenzüberschreitende Auswirkungen“) gilt nur für NIS2; im CRA nennt die Frühwarnung bei Schwachstellen die Mitgliedstaaten der Bereitstellung. „Abschlussmeldung“ (6.6: 5 Karten/Quiz-Treffer) und „Abschlussbericht“ (6.7: 4, 9.1: 2) sind Prüfungsstoff mit **unterschiedlichem Fristbeginn** in beiden Regimen.
**Ersatztext (Frühwarnung):** Erste Stufe der gestuften Meldung, unverzüglich nach Kenntnis, mit knappen ersten Angaben, etwa zum Verdacht auf rechtswidrige oder böswillige Handlungen. Das Recht der Einrichtungen und der Cyber Resilience Act für Hersteller kennen sie; es folgen Meldung und Abschluss.
**Neuer Eintrag Abschlussmeldung** (Alias `Abschlussbericht`, 6.6, Abschnitt „Die Meldekette bei erheblichen Sicherheitsvorfällen“):
**Ersatztext:** Letzte Stufe der gestuften Meldung mit ausführlicher Beschreibung, Ursache und Abhilfemaßnahmen. Auslöser und Fristbeginn unterscheiden sich je nach Regelwerk und Ereignis; bei Einrichtungen heißt sie Abschlussmeldung, bei Herstellern nach dem CRA Abschlussbericht.
(Hinweis: Das Kenntnis-Detail der Abschlussmeldung wird absichtlich nicht genannt; es ist Zahl- und Fristenstoff.)

**M-4 `Erheblicher Sicherheitsvorfall` (fu6):** Der zweite Fall ist verkürzt: Die Theorie sagt „erhebliche Schäden **beeinträchtigt hat oder beeinträchtigen kann**“. Die Definition schreibt „oder andere erheblich schädigt“ und verliert das Potenzial („kann“).
**Ersatztext:** Vorfall, der schwerwiegende Betriebsstörungen oder finanzielle Verluste verursacht hat oder verursachen kann oder andere erheblich geschädigt hat oder schädigen kann. Nur er ist meldepflichtig; für Managed Service Provider konkretisiert eine EU-Verordnung die Erheblichkeit.
Der Zusatz „vorbehaltlich einer Rechtsverordnung“ aus der Theorie fehlt; bei 280 Zeichen verzichtbar.

**M-5 `Kenntniserlangung` (fu6):** „Zeitpunkt, ab dem die Meldefristen laufen“ stimmt nicht für die Abschlussmeldung (Fristbeginn dort ab Übermittlung der Meldung, Theorie 6.6 und Fall dv4). Außerdem 0 Markierungen (Karten sagen „Kenntnis“, nicht „Kenntniserlangung“; Alias „Kenntnis“ wäre zu allgemein: 18 Karten/Quiz-Treffer, auch in 7.6/9.2 mit anderem Sinn). Vorschlag: Definition präzisieren, Eintrag sonst behalten (geringer Nutzen, ggf. streichen).
**Ersatztext:** Zeitpunkt, ab dem die ersten Meldefristen laufen. Ein Monitoring-Alarm genügt nicht; nach einer Auslegungshilfe, die kein Gesetzestext ist, liegt Kenntnis vor, wenn die Einrichtung nach zeitnaher Bewertung mit hinreichender Gewissheit einen erheblichen Vorfall feststellt.

**M-6 `Geschäftsleitung` (fu6):** „haften sie nach dem Gesellschaftsrecht“ lässt weg, **gegenüber wem**: nach Theorie der Einrichtung für schuldhaft verursachten Schaden. Ohne den Zusatz klingt es nach Außenhaftung.
**Ersatztext:** Die zur Führung der Geschäfte und Vertretung berufenen Personen einer Einrichtung. Sie müssen die Risikomanagementmaßnahmen umsetzen und überwachen und regelmäßig an Schulungen teilnehmen; bei schuldhafter Pflichtverletzung haften sie der Einrichtung nach dem Gesellschaftsrecht.

**M-7 `Schwerwiegender Sicherheitsvorfall` (fu6):** Die Theorie sagt „sich negativ auswirkt **oder auswirken kann**“ und „Code eingeführt hat **oder einführen kann**“; die Definition macht daraus Feststellungen. Plus: Eintrag hat 0 Karten/Quiz-Treffer (in 6.7-Karten steht „schwerwiegende Sicherheitsvorfälle“, Adjektiv-Mitte-Endung: Alias `schwerwiegenden Sicherheitsvorfall` bzw. `schwerwiegende Sicherheitsvorfälle` nötig, siehe M-21).
**Ersatztext:** Vorfall, der die Produktsicherheit berührt und die Fähigkeit beeinträchtigen kann, sensible oder wichtige Daten oder Funktionen zu schützen, oder böswilligen Code eingeführt hat oder einführen kann. Für Hersteller meldepflichtig; nicht der erhebliche Vorfall einer Einrichtung.

**M-8 `Angemessenheitsbeschluss` (fu6):** Die Definition sagt nicht, **was** der Beschluss feststellt (angemessenes Schutzniveau). Das ist der Kern des Begriffs; die Theorie setzt es voraus, ohne es auszuschreiben. (Aussage aus dem Begriff selbst und Art. 45, Wissen jenseits der Theorie; harmlos.)
**Ersatztext:** Feststellung der Kommission, dass ein Drittland, Gebiet oder Sektor ein angemessenes Schutzniveau bietet; dann braucht die Übermittlung keine besondere Genehmigung. Er wird regelmäßig überprüft, kann widerrufen werden und steht in der Rangfolge der Instrumente an erster Stelle.

**M-9 `Drittland` (fu6):** „kann schon ein Fernzugriff aus dem Drittland eine Übermittlung sein“ lässt die Einschränkung der Theorie weg: nur der Fernzugriff **einer anderen Stelle** (Verantwortlicher/Auftragsverarbeiter im Drittland); Beschäftigte derselben Stelle aus dem Ausland sind keine Übermittlung. Ohne Zusatz wird der Hedge zur Regel.
**Ersatztext:** Staat außerhalb der EU und des Europäischen Wirtschaftsraums. Personenbezogene Daten dürfen dorthin nur unter den besonderen Übermittlungsvorschriften der DSGVO gelangen; nach Auslegung kann schon der Fernzugriff einer anderen Stelle aus dem Drittland eine Übermittlung sein.

**M-10 `Standardvertragsklauseln` (fu6):** (a) Alias `Transfer Impact Assessment` ist **kein Synonym** (die Einschätzung ist das, was die Klauseln dokumentieren lassen; in der Praxis eine eigene Arbeitsunterlage) und lenkt die Markierung (1 Karten-Treffer) auf einen falschen Begriff. Alias streichen; der Begriff steht schon im Text der Definition. (b) „Kommissionsklauseln als geeignete Garantie“ sagt nicht, dass es **Vertragsklauseln** sind.
**Ersatztext:** Von der Kommission vorgegebene Vertragsklauseln als geeignete Garantie für Datenübermittlungen an Importeure, die nicht selbst der DSGVO unterliegen. Beide Seiten dokumentieren ihre Einschätzung zum Recht des Ziellands (in der Praxis oft Transfer Impact Assessment).

**M-11 `Datenpanne` (fu6):** Die Definition ist zirkulär („Verletzung des Schutzes personenbezogener Daten“, dasselbe wie der Alias). Die Theorie definiert den Begriff nur über Art. 33; die Substanz („Sicherheitsverletzung, bei der Daten verloren gehen, verändert oder unbefugt offengelegt werden“) stammt aus Art. 4 Nr. 12 DSGVO, **nicht aus der Theorie**. Vorschlag: entweder die Art.-4-Fassung nehmen und die Theorie ergänzen oder die Zirkularität belassen. Meine Empfehlung: Ersatztext verwenden (inhaltlich unstrittig).
**Ersatztext:** Sicherheitsverletzung, bei der personenbezogene Daten verloren gehen, verändert oder unbefugt offengelegt werden. Der Verantwortliche meldet sie unverzüglich der Aufsicht, außer ein Risiko ist unwahrscheinlich; ein Auftragsverarbeiter meldet an den Verantwortlichen.
Ohne diese Änderung ist die Definition nicht falsch, aber leer.

**M-12 Maschinenverordnung in dv4: `Maschine (Maschinenverordnung)` und `Hersteller (Maschinenverordnung)`:** tot (H-1). „Maschine“ pur wäre mit 45 Treffern (virtuelle Maschine u. a.) unbrauchbar. **Beide streichen.** Die Gateway-Abgrenzung steht im Lerntext. Grammatik der Maschine-Definition ohnehin holprig („Unter anderem eine Gesamtheit …“).

**M-13 `Sicherheitsbauteil` (dv4):** (a) Die Definition definiert den Begriff nicht, sie sagt nur, dass Software eines sein kann, und der zweite Satz („Cybersicherheit spielt dort nur eine Rolle …“) gehört zur Maschinenverordnung insgesamt, nicht zum Sicherheitsbauteil. (b) Der Begriff wird in 6.8 (KI-VO: „KI als Sicherheitsbauteil“, 3 Karten/Quiz-Treffer in der DV-Gruppe) mitmarkiert; die MVO-spezifische Fassung passt dort nur halb. (c) Der Begriff steht nur in dv4; die 6.8-Karten in AE/SI/DP bleiben unmarkiert. Der Rechtsangaben-Blatt d (Zeile 7) stützt nur „Software mit Sicherheitsfunktion, gesondert in Verkehr gebracht, ist ein Sicherheitsbauteil“. Empfehlung: generische Fassung in **fu6** (Thema 6.8, Abschnitt „Hochrisiko-KI-Systeme“), dv4-Eintrag streichen.
**Ersatztext:** Bauteil mit Sicherheitsfunktion, das gesondert in Verkehr gebracht wird. Nach der Maschinenverordnung kann auch Software mit Sicherheitsfunktion ein Sicherheitsbauteil sein; nach der KI-Verordnung kann KI als Sicherheitsbauteil eines regulierten Produkts hochriskant sein.

**M-14 `IEC 62443` (dv4):** „bedeutsam durch Vertrag, Verweis oder Konformitätsvermutung“ liest sich, als verleihe die Reihe selbst eine Konformitätsvermutung. Die Theorie: nur wenn eine **europäische Fassung als harmonisierte Norm im Amtsblatt** veröffentlicht ist, und „ob solche Fundstellen vorliegen, ist zu prüfen“; zum CRA seien Normen „in Arbeit“. Rechtsangaben-Blatt d Zeile 39: Normtext nicht gelesen, Inhaltsangabe „vermutet“. Hedge „nach verbreiteter Darstellung“ ist gesetzt (gut), aber der Schlusssatz braucht ein „gegebenenfalls“.
**Ersatztext:** Normenreihe zur Cybersicherheit industrieller Automatisierungs- und Steuerungssysteme, nach verbreiteter Darstellung nach Rollen wie Betreiber und Hersteller gegliedert. Privates Regelwerk, kein Gesetz; wirkt durch Vertrag, Verweis oder ggf. Konformitätsvermutung.

**M-15 `Konformitätsvermutung` (dv4):** „dessen Produkt **gilt** … als konform“ ist stärker als „wird vermutet“ (widerlegbar). Fachlich: Vermutung. Außerdem steht der Begriff in 6.7 (Konformitätsbewertung: „Wendet ein Hersteller harmonisierte Normen an …, wird die Konformität vermutet“), wird aber nur in dv4 erklärt; Lernende der Kurse AE/SI/DP lesen es dort ohne Glossar. „Harmonisierte Norm“ fehlt als Eintrag, obwohl der Autor ihn in „Bewusst nicht aufgenommen“ auf diese Stelle verweist (die Definition erklärt die Norm nur beiläufig). Empfehlung: nach **fu6** (Thema 6.7, Abschnitt „Konformitätsbewertung, Erklärung und CE-Kennzeichnung“) verschieben, Wortlaut „vermutet“.
**Ersatztext:** Rechtswirkung einer harmonisierten Norm, deren Fundstelle im Amtsblatt der EU veröffentlicht ist: Wer sie anwendet, bei dem wird die Konformität mit den abgedeckten Anforderungen vermutet. Das erleichtert den Nachweis, macht die Norm aber nicht verbindlich.
(Markierung nur 1 Karte in dv4; „harmonisierte Norm“ selbst kommt in Karten/Quiz nicht vor, deshalb kein eigener Eintrag nötig.)

**M-16 `Wiederholte Vorfälle` (si5):** Die Regel gilt nach 12.2 nur für Managed Service Provider (EU-Durchführungsverordnung), nicht allgemein; die Definition sagt „gelten sie dann als ein erheblicher Vorfall“, als wäre es eine allgemeine NIS2-Regel. Dazu 0 Treffer in Karten/Quiz.
**Ersatztext:** Für Managed Service Provider nach der EU-Durchführungsverordnung: Mehrere einzeln nicht erhebliche Vorfälle mit derselben offensichtlichen Ursache in einem bestimmten Zeitraum, die zusammen eine Schwelle erreichen, gelten gemeinsam als ein erheblicher Vorfall.
(Alternativ streichen, siehe M-19.)

**M-17 `Betriebstechnik (OT)` (dv4):** Klammer-Begriff; funktioniert zufällig über die Aliase `OT` (19 Markierungen in dv1, dv2, dv3, dv5) und `Operational Technology`, aber das Wort „Betriebstechnik“ allein (5 Treffer) wird nicht markiert, und „Betriebstechnik (OT)“ nur wörtlich. Außerdem sitzt der Eintrag fachlich am falschen Ort: Die Erklärung des Begriffs steht in **dv2/9.1** („Systemkomponenten im vernetzten Produktionsumfeld“); die Definition betont den Rechtsaspekt aus 11.3 und das Popover führt zum Rechtsabschnitt von 11.3, während die 19 Markierungen in Zonen-/Segmentierungsfragen stehen. Empfehlung: Begriff `Betriebstechnik`, Auch `OT, Operational Technology`, Thema 9.1 (neue dv2/glossar.md) oder, wenn nur dv4 gewollt, Abschnitt ändern; Definition vorn technisch.
**Ersatztext:** Maschinen, Steuerungen und Sensorik in der Produktion mit ihrer Vernetzung, im Unterschied zur klassischen Büro-IT. Das Recht der Einrichtungen unterscheidet beide nicht; OT zählt dazu, soweit sie für die Dienste der Einrichtung genutzt wird (Auslegung nach dem Wortlaut).

**M-18 `Unbedingt erforderlicher Zugriff` und `Einwilligung zum Endgerätezugriff` (fu6, 6.2):** tot (0 Markierungen). (a) Die Begriffe stehen so nicht im Text; die Karten/Quiz sagen „Cookie“ (4 Treffer) bzw. „unbedingt erforderlich“ (2 Treffer). Aliase: `Cookie` (bzw. `Cookies`, über Endung gedeckt) für die Einwilligung, `unbedingt erforderlich` für den Zugriff (deckt „unbedingt erforderlicher“ über Endung `er`). (b) Inhaltlich: Das Gesetz kennt **zwei** Ausnahmen; der Eintrag nennt nur eine, und lässt das Kriterium „ausdrücklich gewünschter Dienst“ weg (Theorie und Rechtsangaben g Zeile 15: „Wortlaut: unbedingt erforderlich, ausdrücklich gewünscht“).
**Ersatztext (Unbedingt erforderlicher Zugriff):** Eine Ausnahme vom Einwilligungserfordernis: Der Vorgang ist unbedingt erforderlich, damit ein ausdrücklich gewünschter Dienst funktioniert; Nutzen für den Betreiber genügt nicht (Auslegung). Nach verbreiteter Auffassung gehören Sitzungskennung und Warenkorb dazu.
Einwilligung zum Endgerätezugriff: Definition in Ordnung (Auslegung „gleich mit welcher Technik“ ist durch „Eine bestimmte Technik nennt die Vorschrift nicht“ gedeckt); nur Alias `Cookie` ergänzen.

**M-19 Streichkandidaten ohne Lerngehalt oder ohne jeden Gebrauch** (0 Markierungen in Karten/Quiz, reine Anforderungslisten aus der Durchführungsverordnung, Detail): `Systemverwaltungssystem`, `Konzept zur Bewältigung von Sicherheitsvorfällen` (Name wie ein Satz, Inhalt = Mindestliste), `Wiederholte Vorfälle` (sonst nur mit MSP-Zusatz, M-16), `Vorfallprotokoll` (Hedge „üblicherweise“ steht richtig, aber „gehören hinein“ ist in der Theorie ausdrücklich „Folgerung“, die Definition stellt es als Tatsache), `Privilegiertes Konto` (0 Treffer auch mit Alias; im Text und in den Karten steht „privilegierte Konten“, Alias ergänzen oder streichen). si5 behält dann: Hauptniederlassung, Triage (Quiz 2). Falls der Koordinator si5 lieber voll hält: `Privilegiertes Konto` mit Alias `privilegierte Konten` (Plural, nicht über die Endungsregel gedeckt) und Wiederholte Vorfälle mit M-16-Text.

**M-20 `Hauptniederlassung` (si5):** Das ist ein Begriff von NIS2 **und** CRA (6.7: dort mit anderer Auffangregel); in si5 steht er nur in SI und nur mit „Entscheidungen zur Cybersicherheit“. Die Theorie von 12.2 sagt „Entscheidungen zum Cybersicherheits-Risikomanagement“, die von 6.7 „Entscheidungen zur Cybersicherheit seiner Produkte“. Die Allgemeinfassung ist vertretbar, aber der zweite Satz („BSI … in der gesamten EU zuständig“) ist MSP-/NIS2-spezifisch. Empfehlung: Eintrag in fu6 (alle vier Kurse) mit neutraler Fassung oder belassen. Niedrige Dringlichkeit, 1 Quiz-Treffer.
**Ersatztext (falls nach fu6):** Mitgliedstaat, in dem die Entscheidungen zur Cybersicherheit überwiegend getroffen werden; es gibt Auffangregeln. Sie bestimmt, welche Behörde zuständig ist; bei Managed Service Providern mit Hauptniederlassung in Deutschland ist das BSI in der gesamten EU zuständig.

**M-21 Adjektiv-Endungen mitten im Begriff werden nicht erkannt; Aliase für Dativ/Genitiv-Formen fehlen.** Echter Sucher gegen Karten/Quiz: entgangene Treffer bei `aktiv ausgenutzte Schwachstelle` (3 in 6.7: „aktiv ausgenutzten Schwachstelle“), `Wesentliche Änderung` (2 in 6.7), `Wichtige Einrichtung` / `Besonders wichtige Einrichtung` („wichtigen Einrichtung“), `Erheblicher Sicherheitsvorfall` (5 in 6.6: „erheblichen Sicherheitsvorfall“), `Schwerwiegender Sicherheitsvorfall` („schwerwiegenden“, in 9.1 1), `Kritische Anlage` („kritischen Anlage“, 2). Die Aliase kommen im Lerntext vor, erfüllen also die Auftragsregel. Vorschlag: je Eintrag `Auch:` mit den Formen `aktiv ausgenutzten Schwachstelle`, `wesentlichen Änderung`, `wichtigen Einrichtung`, `besonders wichtigen Einrichtung`, `erheblichen Sicherheitsvorfall`, `schwerwiegenden Sicherheitsvorfall`, `kritischen Anlage`; für `Wichtiges Produkt` die Aliase `wichtige Produkte` und `wichtigen Produkte` (1 Karten-Treffer „wichtige Produkte“).

**M-22 `Sicherheitsvorfall`-Familie / `Beinahevorfall` fehlt** (3 Treffer 6.6 K/Q): kurzer Eintrag sinnvoll, Definition in der Theorie vorhanden (Ersatztext E-6).

**M-23 `Verantwortlicher` fehlt als Eintrag, der Bericht behauptet fälschlich, er stehe im Bestand.** Im Bestand-Glossar fu6 gibt es nur „Auftragsverarbeiter“ (Liste in `bestand-begriffe.txt`); „Verantwortlicher“ (16 Karten/Quiz-Treffer, Grundlage von Datenpanne, Auftragsverarbeitungsvertrag, DSFA, Auskunftsanfrage) hat keinen Eintrag. Vorschlag E-5.

**M-24 `Datenschutz-Folgenabschätzung`: Alias `Folgenabschätzung` erzeugt Falschmarkierung.** In fu7/7.5 (Quiz-Erklärung zur Automatisierung: „Beteiligung, Folgenabschätzung, Qualifizierung“) wird „Folgenabschätzung“ mit der DSFA-Definition markiert (in allen vier Kursen). Alias streichen. Inhaltlich ist die Definition in Ordnung (Notwendigkeit, Verhältnismäßigkeit, Risiken für Betroffene, Konsultation) und frei von Schwellenwerten.

## 3. Niedrig

**N-1 `Wichtige Einrichtung`:** „eine bestimmte Mindestgröße“ stimmt für die Regel; die Ausnahme (einzelne Arten unabhängig von der Größe, z. B. sonstige Vertrauensdiensteanbieter) steht nur indirekt beim Nachbareintrag. Außerdem fehlt „soweit nicht schon besonders wichtig“. Akzeptabel; bei Bedarf „… eine Mindestgröße, ohne schon besonders wichtig zu sein“.

**N-2 `Besonders wichtige Einrichtung`:** „erste Sektorenliste“ ist kein Wort der Theorie (dort „erste Liste (Anlage 1)“); verständlicher: „Einrichtung der ersten Liste des Gesetzes“. Sonst in Ordnung („strenger sind vor allem die Aufsicht und der Bußgeldrahmen“ deckt die Theorie).

**N-3 `Kritische Anlage`:** „deren Ausfall“ bezieht sich in der Definition grammatisch auf die Anlage, in der Theorie auf die **Dienstleistung**. Und die Rechtsverordnung (Stand Oktober 2026 nicht in Kraft) fehlt als Hedge.
**Ersatztext:** Anlage, die für eine kritische Dienstleistung erheblich ist, also eine Leistung für die Allgemeinheit, deren Ausfall zu erheblichen Versorgungsengpässen oder Gefährdungen der öffentlichen Sicherheit führen würde. Betreiber gelten als besonders wichtige Einrichtungen.

**N-4 `Software-Stückliste`:** Grammatik des zweiten Satzes unklar („Teil der technischen Dokumentation, der Marktüberwachung … vorzulegen“).
**Ersatztext:** Formale Aufzeichnung der Komponenten eines Softwareprodukts und ihrer Lieferkettenbeziehungen, maschinenlesbar und mindestens mit den obersten Abhängigkeiten. Sie gehört zur technischen Dokumentation und wird der Marktüberwachung auf begründetes Verlangen vorgelegt.

**N-5 `Konformitätsbewertung`:** „Nachweis des Herstellers“ — es ist ein Verfahren; die Definition ist CRA-spezifisch, der Begriff kommt aber auch bei Hochrisiko-KI und Maschine vor. Zudem 0 Treffer in Karten/Quiz (nur Theorie). Akzeptabel; Formulierung „Verfahren, mit dem der Hersteller vor dem Inverkehrbringen nachweist …“ wäre genauer.

**N-6 `Unterstützungszeitraum`:** „hat eine gesetzliche Untergrenze“ gilt nicht ausnahmslos (kürzere erwartete Nutzungsdauer: entspricht der Nutzungsdauer). Besser „in der Regel“.

**N-7 `Koordinierte Offenlegung`:** Die Theorie kennzeichnet „erst nach der Behebung veröffentlicht“ als Erläuterung, nicht als Gesetzestext; der Eintrag übernimmt das ohne Kennzeichnung. Zusatz „Üblicherweise“ oder „im Sinn der Erläuterung“. Dazu 0 Treffer in Karten/Quiz.

**N-8 `Verwalter quelloffener Software`:** inhaltlich in Ordnung. 0 Treffer in Karten/Quiz (Alias „Open-Source-Steward“ nur in der Theorie). Randthema, Streichkandidat.

**N-9 `Lock-Datei` (ae2):** Fachlich in Ordnung (Praxis-Hedge gesetzt). Aber 10.1 (ae3) erklärt Lock-Datei und Manifest ausführlicher; die 6 Markierungen liegen in 10.1 (Karten/Quiz). Thema/Abschnitt besser dort (ae3/glossar.md, neu) oder bewusst in ae2 belassen.

**N-10 `Deepfake` (fu6):** „Erzeugter oder manipulierter … Inhalt“ ohne „mit KI“; eine bearbeitete Fotomontage wäre nach dieser Fassung ein Deepfake.
**Ersatztext:** Mit KI erzeugter oder manipulierter Bild-, Ton- oder Videoinhalt, der wirklichen Personen, Gegenständen, Orten oder Ereignissen ähnelt und fälschlich für echt gehalten werden könnte. Betreiber legen offen, dass er künstlich erzeugt wurde.

**N-11 `Verbotene KI-Praktiken`:** „(mit engen Ausnahmen)“ — „eng“ steht in der Theorie nur bei der biometrischen Echtzeit-Fernidentifizierung; bei Emotionen am Arbeitsplatz nennt sie „medizinische oder Sicherheitsgründe“. Besser „(mit Ausnahmen)“.

**N-12 `Datenschutzbeauftragte`:** Alias `Datenschutzbeauftragter` kommt im Lerntext nicht vor (Verstoß gegen die Aliasregel), und die Endungsregel deckt „-r“ nicht. Streichen oder lassen (harmlos). Gender: Term ist die generische weibliche Form der Theorie; Hausregel wäre `Datenschutzbeauftragte:r`, dann aber Markierungsverlust. Akzeptabel wie in der Theorie.

**N-13 `Auskunftsanfrage`:** Alias `Auskunftsanfragen` ist überflüssig (Endung `-n` ist durch die Sucher-Regel gedeckt). Streichen.

**N-14 `Lieferkettensicherheit`:** „regelt der Vertrag und nicht das Gesetz“ vereinfacht; die Theorie sagt, das Gesetz verpflichte den Dienstleister **nicht allein wegen der Kundenbeziehung**. Als MSP hat er eigene gesetzliche Pflichten. Besser: „… nicht allein das Gesetz“.

**N-15 `Wesentliche Veränderung` (dv4):** Hinweis „nicht mit der CRA-Änderung zu verwechseln“ lässt die KI-VO aus (6.8 spricht von „wesentlich verändern“, Art. 25). Aktuell keine Fehlmarkierung (0 Treffer in Karten/Quiz von 6.8); bei späteren Karten kann das auftreten.

## 4. Fehlende Begriffe (Ergänzungsvorschläge)

Texte höchstens 280 Zeichen, ohne Zahlen/Fristen/Paragrafen, aus der eingespielten Theorie.

- **E-1 Einführer** (fu6, 6.7, Abschnitt „Wirtschaftsakteure und ihre Rollen“; Alias `Importeur` nicht im Text, daher keiner): Wer in der Union ein Produkt (Cyber Resilience Act) oder KI-System (KI-Verordnung) in Verkehr bringt, das Namen oder Marke einer Person außerhalb der Union trägt. Unter eigenem Namen oder bei wesentlicher Änderung gilt er als Hersteller bzw. Anbieter.
- **E-2 Händler** (fu6, 6.7, gleicher Abschnitt): Wer ein Produkt oder KI-System in der Lieferkette bereitstellt, ohne Hersteller, Anbieter oder Einführer zu sein, und seine Eigenschaften nicht ändert. Beim Cyber Resilience Act prüft er Kennzeichnung und Unterlagen und informiert bei Schwachstellen den Hersteller.
- **E-3 Bevollmächtigter** (fu6, 6.7, gleicher Abschnitt): In der Union ansässige Person, die der Hersteller schriftlich beauftragt hat, bestimmte Aufgaben für ihn wahrzunehmen. Zentrale Herstellerpflichten wie Produktgestaltung, Risikobewertung und Schwachstellenbehandlung kann sie nicht übernehmen.
  (Alias `Bevollmächtigte` kommt in der Zuordnungsfrage vor; der Sucher deckt „Bevollmächtigte“ nicht über die Endung, weil das Wort auf `-r` endet: Alias `Bevollmächtigte` ergänzen.)
- **E-4 Abschlussmeldung** (Alias `Abschlussbericht`): siehe M-3.
- **E-5 Verantwortlicher** (fu6, 6.2, Abschnitt „Zentrale Begriffe“): Wer über Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet. Ein Auftragsverarbeiter verarbeitet dagegen im Auftrag und nach Weisung des Verantwortlichen.
- **E-6 Beinahevorfall** (fu6, 6.6, Abschnitt „Die Meldekette bei erheblichen Sicherheitsvorfällen“): Ereignis, dessen Eintritt als Sicherheitsvorfall verhindert wurde. Es ist nicht meldepflichtig, kann aber freiwillig gemeldet werden.
- **E-7 Transparenzpflichten (KI)** (fu6, 6.8, Abschnitt „Transparenzpflichten“; 10 Treffer in Karten/Quiz): Pflicht bei KI-Systemen mit Täuschungs- oder Verwechslungsrisiko, offenzulegen, dass man mit einer KI zu tun hat oder Inhalte künstlich erzeugt wurden, etwa bei Chatbots und Deepfakes. Sie gilt unabhängig davon, ob das System hochriskant ist.
- **E-8 CE-Kennzeichnung** (fu6, 6.7, Abschnitt „Konformitätsbewertung, Erklärung und CE-Kennzeichnung“; 7 Treffer in 6.7): Kennzeichen, mit dem der Hersteller nach der Konformitätsbewertung und der EU-Konformitätserklärung erklärt, dass sein Produkt die Anforderungen erfüllt; bei Software genügt es, das Zeichen auf der Erklärung oder der begleitenden Website anzubringen.

**Zur Anregung des Koordinators: „Marktüberwachungsbehörde“ und „Stand der Technik“ in fu6.**

- **Marktüberwachungsbehörde: sinnvoll, ja.** Kommt in 6.7 (Theorie, Karten/Quiz 3 Treffer), 6.8 (Beschwerde nach Art. 85), 9.1 und in ae1/8.3 (BFSG, 3 Treffer) vor; Theorie 6.7 beschreibt die Befugnisse. Der Eintrag ist gut markierbar (Endung `-n` deckt den Plural, Alias `Marktüberwachung` für das Substantiv), Fremdmarkierung in 8.3 ist sachlich zutreffend. Thema 6.7, Abschnitt „Marktüberwachung und Sanktionen“.
  **Ersatztext:** Von den Mitgliedstaaten benannte Behörde, die überwacht, ob in Verkehr gebrachte Produkte die Vorschriften einhalten. Sie kann auf begründetes Verlangen Unterlagen und Nachweise anfordern und bei erheblichem Risiko Korrekturen, Marktrücknahme oder Rückruf verlangen.
- **Stand der Technik: sinnvoll mit Vorbehalt.** Der Begriff kommt in 6.2 (TOM: „orientieren sich am Stand der Technik“), 6.6 (fett: „sollen den Stand der Technik einhalten“), 6.1/6.4 sinngemäß und in ae1/8.3 vor (2 Karten/Quiz-Treffer); das Bestand-Eintrag `TOM` erklärt ihn nicht. **Die Theorie definiert ihn aber nirgends**; die Definition stammt aus allgemeinem Rechtsverständnis (unbestimmter Rechtsbegriff, Entwicklungsstand bewährter fortschrittlicher Verfahren). Das ist der Rahmen „Überblick-Niveau“, aber nicht „aus der Theorie abgeleitet“; zusätzlich ist er in mehreren Gesetzen unterschiedlich nuanciert (DSGVO: „Berücksichtigung“, BSIG: „einhalten“). Vorschlag: aufnehmen, Hedge im Text, Eintrag in der Prüfung als „Allgemeinwissen“ markieren oder einen Satz in 6.6 ergänzen. Thema 6.6, Abschnitt „Risikomanagementmaßnahmen und Pflichten der Geschäftsleitung“.
  **Ersatztext:** Unbestimmter Rechtsbegriff: der Entwicklungsstand fortschrittlicher, in der Praxis bewährter Verfahren und Maßnahmen; er ändert sich mit der Technik und ist im Einzelfall zu bestimmen. Datenschutz und Recht der Einrichtungen verlangen Maßnahmen, die sich daran orientieren.

## 5. Bewertung von ae2 (alter Lerntext) und Gesamtschnitt

**ae2 (Security by Design, Secret, CVE-Kennung, Software Composition Analysis, SAST, DAST, Threat Modeling):** akzeptabel; sie sind sachlich korrekt, nicht Teil von P-AY, aber die Fachgebiete ae2 hatten bisher keinen Glossar. Sie leben im Sucher: Security by Design (Karten 1, Quiz 1), Secret (Karten 3, Quiz 2), SAST/DAST (je 2 Karten), CVE-Kennung (1), Software Composition Analysis (1). Threat Modeling hat 0 Treffer in Karten/Quiz, ist aber ein Standardbegriff; behalten oder streichen, keine Fehlmarkierung. Verbesserungen: `CVE-Kennung` Alias `CVE` ergänzen (2 Treffer in 9.1-Karten, Akronym exakt); `Statische Analyse (SAST)` und `Dynamische Tests (DAST)` ohne Klammer als `SAST` bzw. `DAST` benennen und „Statische Analyse“ / „Dynamische Tests“ als Alias (Klammerform wird nur wörtlich gefunden, das Alias `SAST` funktioniert bereits). `Transitive Abhängigkeit` streichen (H-2). `Gebotene Sorgfalt` fachlich in Ordnung (Hedge „genannt werden etwa“ ist gesetzt), aber 0 Treffer in Karten/Quiz (Quiz: „Sorgfalt“ allein); es ist der Kern der Herstellerpflicht in 9.1, daher behalten.

**dv4:** nach Streichen von Maschine, Hersteller, Sicherheitsbauteil (nach fu6) und Konformitätsvermutung (nach fu6) bleiben `Betriebstechnik` (umgezogen), `IEC 62443`, `Wesentliche Veränderung`. Das ist dünn, aber die Theorie 11.3 hat auch wenige eigene Fachbegriffe. Alternativ die vier Einträge in dv4 belassen und nur die Hedges nachziehen (M-14, M-15).

**si5:** nach M-19 bleiben `Hauptniederlassung` (ggf. nach fu6) und `Triage`; die Theorie 12.2 ist eher Praxis- als Begriffsstoff.

**Doppelungen mit dem Bestand in anderen Wörtern:** keine gefunden. `Risikomanagementmaßnahmen` (6.6) vs. Bestand `TOM` (6.2): wie im Bericht, kein Widerspruch. `Zweckbestimmung` (6.8) ist in 6.7/9.1-Texten ebenso verwendet (4 Fremdmarkierungen in der Theorie), gleiche Bedeutung.

## 6. Anhang: Ergebnis des Sucher-Laufs je Eintrag

Spalten: Markierungen im Heimat-Thema (Theorie / Karten / Quiz), Karten+Quiz in anderen Themen derselben Kursgruppe (Themencodes in Klammern), Bewertung. Grundlage: echter Sucher, alle Themendateien der vier Kurse (Gruppe: AE für fu6 und ae2, DV für dv4, SI für si5), Bestand-Glossar und Cluster-2-Entwürfe mit aktiv. „Fremde“ Karten/Quiz-Markierungen sind sachgerecht, außer: Transitive Abhängigkeit (5.1), Datenschutz-Folgenabschätzung über Alias (7.5).

| Begriff | Treffer Heimat-Thema (Theorie / Karten / Quiz) | Karten+Quiz in fremden Themen | Bewertung |
|---|---|---|---|
| Wichtige Einrichtung | 9 / 2 / 6 | 0 | lebt |
| Besonders wichtige Einrichtung | 3 / 1 / 2 | 0 | lebt |
| Managed Service Provider | 3 / 2 / 0 | 0 | lebt |
| Jahresarbeitseinheiten | 3 / 2 / 4 | 0 | lebt |
| Risikomanagementmaßnahmen | 2 / 2 / 3 | 0 | lebt |
| Geschäftsleitung | 3 / 1 / 3 | 0 | lebt |
| Erheblicher Sicherheitsvorfall | 4 / 0 / 1 | 0 | lebt |
| Frühwarnung | 3 / 1 / 1 | 3 (6.7) | lebt (fremd: 6.7) |
| Kenntniserlangung | 3 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Lieferkettensicherheit | 1 / 1 / 4 | 0 | lebt |
| Kritische Anlage | 4 / 0 / 2 | 0 | lebt |
| Produkt mit digitalen Elementen | 2 / 2 / 0 | 0 | lebt |
| Datenfernverarbeitung | 2 / 2 / 1 | 0 | lebt |
| Hersteller (CRA) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Integrator (CRA) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Wesentliche Änderung | 1 / 0 / 0 | 2 (9.1) | lebt (fremd: 9.1) |
| Software-Stückliste | 6 / 1 / 4 | 3 (9.1) | lebt (fremd: 9.1) |
| Aktiv ausgenutzte Schwachstelle | 4 / 1 / 2 | 4 (9.1) | lebt (fremd: 9.1) |
| Koordinierte Offenlegung | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Unterstützungszeitraum | 7 / 1 / 1 | 3 (9.1) | lebt (fremd: 9.1) |
| Konformitätsbewertung | 3 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Wichtiges Produkt | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Schwerwiegender Sicherheitsvorfall | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Verwalter quelloffener Software | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| KI-System | 10 / 4 / 6 | 1 (7.5) | lebt (fremd: 7.5) |
| KI-Modell mit allgemeinem Verwendungszweck | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Anbieter (KI-Verordnung) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Betreiber (KI-Verordnung) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Zweckbestimmung | 3 / 3 / 0 | 0 | lebt |
| Verbotene KI-Praktiken | 3 / 2 / 0 | 0 | lebt |
| Social Scoring | 2 / 1 / 0 | 0 | lebt |
| Hochrisiko-KI-System | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Deepfake | 2 / 2 / 0 | 0 | lebt |
| KI-Kompetenz | 7 / 3 / 3 | 0 | lebt |
| Datenpanne | 2 / 3 / 3 | 6 (6.6,6.7) | lebt (fremd: 6.6,6.7) |
| Datenschutzbeauftragte | 6 / 3 / 6 | 0 | lebt |
| Auftragsverarbeitungsvertrag | 1 / 1 / 1 | 0 | lebt |
| Beschäftigtendaten | 4 / 2 / 0 | 0 | lebt |
| Einwilligung zum Endgerätezugriff | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Unbedingt erforderlicher Zugriff | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Drittland | 3 / 6 / 4 | 1 (6.8) | lebt (fremd: 6.8) |
| Angemessenheitsbeschluss | 1 / 2 / 4 | 0 | lebt |
| Standardvertragsklauseln | 1 / 4 / 1 | 0 | lebt |
| Datenschutz-Folgenabschätzung | 4 / 1 / 1 | 1 (7.5) | lebt (fremd: 7.5) |
| Auskunftsanfrage | 2 / 1 / 1 | 0 | lebt |
| Security by Design | 2 / 1 / 1 | 0 | lebt |
| Secret | 4 / 3 / 2 | 0 | lebt |
| CVE-Kennung | 1 / 1 / 0 | 0 | lebt |
| Software Composition Analysis | 1 / 1 / 0 | 0 | lebt |
| Lock-Datei | 2 / 1 / 0 | 6 (8.3,10.1) | lebt (fremd: 8.3,10.1) |
| Transitive Abhängigkeit | 0 / 1 / 0 | 5 (10.1,5.1) | lebt (fremd: 10.1,5.1) |
| Gebotene Sorgfalt | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Statische Analyse (SAST) | 1 / 2 / 0 | 0 | lebt |
| Dynamische Tests (DAST) | 1 / 2 / 0 | 0 | lebt |
| Threat Modeling | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Betriebstechnik (OT) | 2 / 0 / 0 | 19 (8.3,9.1,10.4,12.1) | lebt (fremd: 8.3,9.1,10.4,12.1) |
| IEC 62443 | 5 / 1 / 2 | 4 (8.3) | lebt (fremd: 8.3) |
| Konformitätsvermutung | 1 / 1 / 0 | 0 | lebt |
| Maschine (Maschinenverordnung) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Sicherheitsbauteil | 1 / 0 / 1 | 3 (6.8) | lebt (fremd: 6.8) |
| Hersteller (Maschinenverordnung) | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Wesentliche Veränderung | 1 / 0 / 3 | 0 | lebt |
| Hauptniederlassung | 1 / 0 / 1 | 0 | lebt |
| Privilegiertes Konto | 0 / 0 / 0 | 0 | tot (nirgends markiert) |
| Systemverwaltungssystem | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Konzept zur Bewältigung von Sicherheitsvorfällen | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Triage | 1 / 0 / 2 | 0 | lebt |
| Wiederholte Vorfälle | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
| Vorfallprotokoll | 1 / 0 / 0 | 0 | nur Theorie markiert, in Karten/Quiz tot |
