# Prüfung Teil C (P-R): HSQ1 1.6 Wissensmanagement, F-HSQ1-06, Fachgespräch 1.6

Stand 16.10.2026, unabhängige Prüfung. Geprüft: `wifa-1.6-wissensmanagement.md` und `wifa-faelle-c.md` gegen `auftrag.md`. Keine Entwurfs- oder Bestandsdatei geändert.

**Ergebnis kurz:** kein Rechenfehler (51 Werte per Skript geprüft, dazu 6 Plausibilitätsrechnungen); Mechanik fehlerfrei; keine wörtliche Nähe. Befunde: **0 hoch, 6 mittel, 12 niedrig.** Die mittleren Befunde betreffen eine mehrdeutige Fallfrage (Mindestanteil), die Abstimmung mit Teil D (gegenseitiger Verweis im Kreis), eine Unstimmigkeit zwischen Wissensarten und SECI im Fall, die uneinheitliche Behandlung von Prozentpunkten im Paket, einen Verweis auf 1.3, der nicht trägt, und eine Musterlösung, die ihre eigene Teilaufgabe nicht ganz erfüllt.

## Mechanische Prüfung

- Kopie von `content/` im Scratchpad. Thema 1.6 als neue Datei angelegt, F-HSQ1-06 mit `haengeAn` angehängt, Fachgespräch mit `fgEinfuegen` eingefügt (Funktionen aus `wirtschaft-finanzen/einspielen.cjs`). Die Kopie ist danach gelöscht.
- `db:validate-content` (`CONTENT_DIR=<Kopie> tsx src/db/validate-content.ts` in `apps/api`): **668 Themendateien, 19.611 Item-Schlüssel, 0 Verstöße**. Der Bestand allein hat 667 Dateien und 19.576 Item-Schlüssel, Teil C bringt also 35 Schlüssel hinzu.
- Parser (`content-parser.ts`):
  - Frontmatter vollständig.
  - 14 Karten und 16 Quizfragen, alle geparst, alle mit Bloom-Stufe. Typen: MC 1, Mehrfachauswahl 1, Entweder-Oder 2, Wahr/Falsch 1, Was passt nicht 1, Zuordnung 2, SECI-Zonenspiel 1, Sortieren 1 (4 Elemente), Lückentext (Wortauswahl) 1, Kurzantwort 5. Kurzantworten mit 20, 20, 20, 46 und 24 Antwortvarianten.
  - F-HSQ1-06 hat 5 Teilaufgaben (4/5/5/3/3 = 20 Punkte), alle mit Bloom-Stufe und Folgefehler-Zeile.
  - Abschnitt „1.6 Wissensmanagement“ mit 3 Fragen zu je 5 Erwartungen und 1 Rückfrage, erkannt hinter 1.4.
- Der SECI-Fragetyp (`SECI-Modell der Wissensumwandlung`) ist plattformweit vorhanden (`quiz-logic.ts`) und wird korrekt erkannt.
- IDs K-1.6-01 bis -14 und Q-1.6-01 bis -16 sind lückenlos. F-HSQ1-06 ist im Bestand frei (höchste vorhandene ID: F-HSQ1-03).

## Rechnen (Skript `scratchpad/pruefer-pr-c/rechnen.cjs`)

**Nachgerechnet, alle richtig:**
- **DIKW:** 1.980 ÷ 1.310, also +51,1 % („rund die Hälfte mehr“).
- **Theorie, Wissensverlust:**
  - 7 ÷ 25 = 28 %
  - (46 + 50) ÷ 2 = 48; 6 ÷ 48 = 12,5 %
  - 32 − 20 = 12; 12 ÷ 32 = 37,5 %; 20 ÷ 32 = 62,5 %
- **Theorie, Kennzahlen:**
  - 150 ÷ 250 = 60 %; 25 ÷ 250 = 10 %
  - 18 ÷ 40 = 45 %; 30 ÷ 40 = 75 %; Differenz 30 Pp; (30 − 18) ÷ 18 = 66,7 %
- **Theorie, Suchzeit:** 64 × 12 = 768 min = 12,8 h; × 220 = 2.816 h; × 45 € = 126.720 €.
- **Quiz:**
  - Q-01: 655 − 412 = 243
  - Q-08: 12; 40 %; 60 %
  - Q-13: 30; 10 %
  - Q-14: 65 %
  - Q-15: 40 %, 64 %, 24 Pp, 60 %
  - Q-16: 300 min, 5 h, 1.050 h, 44.100 €
- **Fall:**
  - 40; 20,0 %; 20,9 %; 45,0 %; 36,4 %; 38,9 %
  - Deutungen: 61,1 % („gut drei Fünftel“), 63,6 % („knapp zwei Drittel“)
  - 24.800 €; 60.000 €; 35.200 €; 2,07 %
- **Punkteraster:** alle fünf Teilaufgaben ergeben ihre Punktzahl, zusammen 20.
- **Beschäftigte:** Die Beispielbereiche summieren sich auf 233 von 280 (Kopfstück-Aussage stimmt, siehe aber C-N4).

**Akzeptierte Antworten:**
- Q-08, Q-13, Q-14 und Q-16 sind vollständig, einschließlich ,0/,00, Punkt- und Kommaschreibweise, %/Prozent, €/Euro/EUR, mit und ohne Tausenderpunkt sowie ohne Tausenderpunkt mit „,00“.
- Q-15 ist unvollständig und im Paket uneinheitlich, siehe C-M4.

## Befunde

| Nr. | Schwere | Fundstelle | Fehler | Korrekturvorschlag |
|---|---|---|---|---|
| C-M1 | mittel | F-HSQ1-06 Teilaufgabe 5 und Musterlösung | „welcher Anteil des Rohgewinns mindestens **gehalten** werden muss, damit sich die Doppelbesetzung trägt“ ist mehrdeutig. Natürlich gelesen ist das der insgesamt gehaltene Anteil: ohne Übergabe 95 %, nötig mindestens 97,07 %, Verlust also höchstens 2,93 %. Die Musterlösung meint dagegen den zusätzlich vor dem Verlust bewahrten Anteil (2,07 %). | Frage umformulieren: „…welchen Anteil des Rohgewinns dieser Kundschaft die Doppelbesetzung mindestens vor dem Verlust bewahren muss, damit ihre Kosten gedeckt sind (in Prozent des jährlichen Rohgewinns von 1.200.000 €, auf zwei Nachkommastellen)“. In der Musterlösung ergänzen: „Der Verlust darf also höchstens 5 % − 2,07 % = 2,93 % betragen; die Doppelbesetzung muss mindestens 24.800 ÷ 60.000 ≈ 41,3 % des erwarteten Verlusts verhindern.“ Die Lösungen 97,07 % (gehaltener Anteil) bzw. 2,93 % (höchstens zulässiger Verlust) mit Begründung im Raster anerkennen. |
| C-M2 | mittel | Theorie „Wissenskultur und Barrieren“, letzter Absatz; K-1.6-12; Kopfstück `wifa-faelle-c.md` | **Verweis im Kreis mit Teil D.** 1.6 sagt, die lernende Organisation „wird in Thema 1.2 … erläutert“; das Kopfstück sagt, sie werde in 1.2 definiert und 1.6 nenne sie nur. Teil D (`wifa-1.2-ergaenzung-…`, Theorie Z. 44 und Kopfstück Z. 9) sagt dagegen: „Teil C definiert … Was sie kennzeichnet … behandelt Thema 1.6“. Beide werden zusammen eingespielt, und Lernende werden zwischen den Themen hin- und hergeschickt. Tatsächlich definiert 1.6 bereits (organisationales Lernen, Anpassungs- und Veränderungslernen, Definitionssatz). | Teil D folgen: 1.6 ist die Definitionsstelle. Satz in 1.6 ändern in „…wird als **lernende Organisation** bezeichnet; sie gilt als Leitbild der Organisationsentwicklung (Thema 1.2), wo auch die Steuerung einzelner Veränderungen und der Umgang mit Widerständen behandelt werden.“ K-1.6-12 entsprechend anpassen („…gilt als lernende Organisation; sie ist das Leitbild der Organisationsentwicklung (Thema 1.2)“). Kopfstück in `wifa-faelle-c.md` berichtigen. |
| C-M3 | mittel | F-HSQ1-06 Teilaufgabe 1 gegen Teilaufgabe 3 und Theorie SECI | **Musterlösungen widersprechen einander.** Teilaufgabe 1 stuft „mündlich zugesagte Sonderkonditionen“ und „Entscheidungswege“ als **explizit** ein („explizit fassbar, aber nicht dokumentiert“). Teilaufgabe 3 ordnet ihr erstmaliges Aufschreiben aus Interviews aber der **Externalisierung** zu, und die Theorie definiert diese als implizit → explizit („Wissen, das bisher allein in einem Kopf steckte, zum ersten Mal zu Papier“). Nach der eigenen Theorie gilt also: Ist das Wissen explizit, ist sein Aufschreiben keine Externalisierung. Ist es eine Externalisierung, war das Wissen implizit. | Entweder in Teilaufgabe 1 diese beiden Bestandteile als „bisher nur im Kopf, nicht ausgesprochen, also implizit (leicht explizierbar)“ einstufen. Oder in der Theorie (Abschnitt SECI, Absatz „Um ein Beispiel…“) einen Satz ergänzen: „Auch Wissen, das sich gut in Worte fassen ließe, aber bisher nur im Kopf einer Person steckt und nie ausgesprochen wurde, wird beim ersten Festhalten der Externalisierung zugerechnet.“ Danach Teilaufgabe 1 so formulieren: „explizierbar, aber noch nicht expliziert“. In der Musterlösung zu Teilaufgabe 1 einen Satz ergänzen, dass beide Einstufungen mit Begründung anerkannt werden. |
| C-M4 | mittel | Q-1.6-15 (Akzeptierte Antworten); paketweit gegen Teil D | **Prozentpunkte im Paket uneinheitlich.** Teil C nimmt „24 %“ und „24 Prozent“ nicht an. Teil D (`wifa-1.2-ergaenzung-…`, Z. 250) nimmt bei einer Prozentpunkte-Frage „28 %“, „28 Prozent“ und sogar „+28 %“ an. Der Bestand ist ebenfalls uneinheitlich: `hsq2/2.2` Z. 470/488 nimmt % an, Industriefachwirt 8.5 Z. 288 nicht. Außerdem fehlen in Q-15 „24 Prozentpunkt“, „24 %-Pkt.“, „+24 %-Pkt.“ sowie die Einheiten-Varianten zu ,00 („24,00 Prozentpunkte“, „24.00 Prozentpunkte“, „24,00 Pp“, „+24,00 Prozentpunkte“ usw.); bei ,0 stehen sie dagegen. | Eine Paketregel festlegen und in Teil C und D gleich umsetzen. Empfehlung (passend zur Erklärung von Q-1.6-15, die genau diese Verwechslung anspricht): Bei Fragen „um wie viele Prozentpunkte“ werden die Zahl und die Pp-Schreibweisen angenommen, nicht „%“ oder „Prozent“. Teil D entsprechend kürzen. In Q-15 die fehlenden Varianten ergänzen: Singular „Prozentpunkt“, „%-Pkt.“ und die ,00/.00-Formen mit allen Einheiten, jeweils mit und ohne „+“. |
| C-M5 | mittel | Theorie „Daten, Information und Wissen“, Absatz nach der DIKW-Liste | Der Verweis „…warum ihre Qualität über den Wert jeder Auswertung entscheidet, behandelt Thema 1.3 (Data Warehouse, Business Intelligence, Datenqualität)“ trägt nur halb. In `hsq1/1.3` steht Datenqualität **nur auf einer Karte** (K-1.3-17), nicht in der Theorie. Ausführlich behandelt sie das gleichzeitig eingespielte Thema 1.5 (`wifa-1.5-betriebsstatistik.md`, Abschnitt Betriebsstatistik im Handel, Z. 231: vollständig, richtig, aktuell, einheitlich, eindeutig). | Ändern in: „Wie Daten in einem Data Warehouse zusammengeführt und mit Business Intelligence ausgewertet werden, behandelt Thema 1.3; was Datenqualität ausmacht und warum sie über den Wert jeder Auswertung entscheidet, Thema 1.5 (Betriebsstatistik).“ |
| C-M6 | mittel | F-HSQ1-06 Teilaufgabe 3, Aufgabe und Musterlösung | Die Aufgabe verlangt „ordnen Sie **jede** Maßnahme einer Phase des SECI-Modells zu“, die Musterlösung tut das selbst nicht. Monat 1 (Wissensgebiete erfassen, Nachfolge bestimmen) ist ein Baustein (Wissensidentifikation), keine SECI-Phase. Monat 8 (Austrittsgespräch, Übergabeprotokoll) und die Schadensbeurteilung im Tandem haben keine Phase. Außerdem vergibt das Raster 1 Punkt für den „Hinweis auf Datenschutz und Zugänge“, den die Aufgabe nicht verlangt. | Aufgabe ändern in: „…mit mindestens vier Maßnahmen zur Weitergabe ihres Wissens, geben Sie den Zeitpunkt an und ordnen Sie jede dieser Maßnahmen einer Phase des SECI-Modells zu; vorbereitende Schritte dürfen ohne SECI-Phase stehen.“ In der Musterlösung zuordnen: Austrittsgespräch → Externalisierung; Übergabeprotokoll → Externalisierung/Kombination; Tandem Schadensbeurteilung → Sozialisation; Monat 1 als „vorbereitend (Wissensidentifikation)“. Raster: „Bezug zur Situation (Kundenwissen, Wissensinsel Schadensbeurteilung) 1 Punkt“; den Datenschutz-Hinweis nur als Zusatz anerkennen oder in die Aufgabe aufnehmen („…und berücksichtigen Sie den Umgang mit vertraulichen Angaben“). |
| C-N1 | niedrig | Q-1.6-01 | Die richtige Antwort ist mit 163 Zeichen die bei weitem längste (Distraktoren 61 bis 109 Zeichen) und die einzige mit „aus Erfahrung“; sie ist dadurch leicht zu erraten. Beide Einfachauswahl-Fragen (Q-01, Q-10) haben die Lösung an Position 3. | Richtige Antwort kürzen („Der Innendienst reserviert Folie, weil er weiß, dass ein Onlineshop nach Rabattaktionen doppelt bestellt.“) und eine Informations-Option verlängern. In Q-01 oder Q-10 die Lösung an Position 1 oder 2 setzen. |
| C-N2 | niedrig | Q-1.6-01 (Luftpolsterfolie Hamburg 412/655 Rollen je Monat); Theorie DIKW (Packband Leipzig 1.240/1.310/1.980 Rollen je Monat) | Die Mengen passen nicht zu Bestand und Paket. Teil A (`wifa-1.5`, Z. 136) nennt als Jahresabsatz von NordWert insgesamt 4.000 bzw. 5.000 Rollen Luftpolsterfolie; Hamburg allein läge hier bei rund 5.000 bis 8.000 im Jahr. `wbq1/1.5` Z. 98 nennt 20.000 Rollen Packband als Jahresmenge des ganzen Unternehmens; Leipzig allein verkauft hier in drei Monaten 4.530. | Q-01 auf 38; 41; 66 Rollen setzen (Zuwachs 25), oder einen Artikel wählen, der im Kurs nicht vorkommt (z. B. Kantenschutzwinkel). DIKW-Beispiel auf 124; 131; 198 Rollen setzen (198 ÷ 131 ≈ +51 %, „rund die Hälfte“ bleibt richtig); K-1.6-01 entsprechend anpassen. |
| C-N3 | niedrig | Theorie, Rechenbeispiel Suchzeit (45 €/h); Q-1.6-16 (42 €/h) | Die Stundensätze sind für NordWert unplausibel hoch. Laut `wbq2/2.5` (Personalaufwand 12 Mio. €, 280 Beschäftigte) kostet eine beschäftigte Person rund 42.900 € im Jahr, also rund 24 €/h bei 1.760 h. 45 €/h entspräche 79.200 € im Jahr für den Innendienst, mehr als die Key-Account-Nachfolge im Fall (6.200 € × 12 = 74.400 €). | Theorie: 30 €/h, dann 2.816 × 30 = 84.480 €. Q-16: 30 €/h, dann 1.050 × 30 = **31.500 €** (Antwortliste neu: 31.500; 31500; 31.500,00; 31500,00; 31500.00, jeweils mit €/Euro/EUR und ,-). Oder ausdrücklich „einschließlich Arbeitgeberanteil und Gemeinkosten“ ergänzen. |
| C-N4 | niedrig | Theorie (Vertriebsinnendienst 64), Kopfstück `wifa-faelle-c.md` | Die Beispielbereiche ergeben 233 von 280 Beschäftigten. Für Lager Bremen, Lager Hamburg, Verwaltung, Controlling, Geschäftsführung, Exportabwicklung usw. bleiben nur 47; Teil D nennt zusätzlich Lager in Hamburg und Bremen. Die Firmengröße wird damit unplausibel. | Vertriebsinnendienst auf 32 Beschäftigte senken (32 × 12 = 384 min = 6,4 h; × 220 = 1.408 h; × 45 € = 63.360 € bzw. × 30 € = 42.240 €). Die Summe im Kopfstück anpassen. |
| C-N5 | niedrig | Theorie Abschnitt Erfolgsmessung („Ein Jahr nach Einführung des Wikis“) gegen Fall („Vor 18 Monaten wurde im Wiki ein Bereich … eingerichtet“) | Widersprüchliche Zeitangaben zum NordWert-Wiki: Nach der Theorie gibt es das Wiki seit einem Jahr, nach dem Fall muss es mindestens 18 Monate alt sein. | In der Theorie „Zwei Jahre nach Einführung des Wikis“ schreiben oder die Zeitangabe streichen. |
| C-N6 | niedrig | Q-1.6-06 gegen F-HSQ1-06 Teilaufgabe 4 | Drei der vier Aussagen im Fall (drei Seiten je Artikel, Kontakte machen ersetzbar, keine Zeit) sind fast gleich wie in Q-06. Wer das Quiz kennt, löst die Fallaufgabe ohne Transfer. | In Q-06 andere Barrieren nehmen, etwa Fehlerkultur („Wer einen Packfehler meldet, bekommt Ärger.“), umständliche Werkzeuge („Für einen Eintrag muss ich zwölf Pflichtfelder ausfüllen.“) oder Standortdenken. |
| C-N7 | niedrig | Theorie Wissensverlust, Risikobewertung („die Wissensträgerin oder der Wissensträger“) | Doppelform statt Gendern mit Doppelpunkt. | „Wann scheidet die Wissensträger:in voraussichtlich aus?“ |
| C-N8 | niedrig | Fachgespräch 1.6, Frage 1, 5. Erwartung | Datenschutz wird ohne den verlangten Hinweis „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“ genannt (Theorie und Fall haben ihn). | Ergänzen: „…und abgestufte Zugriffsrechte; die gesetzlichen Vorgaben werden hier nicht behandelt (nicht förmlich rechtsgeprüft).“ |
| C-N9 | niedrig | Fachgespräch 1.6, Frage 2, 5. Erwartung (Internalisierung) | Die Frage verlangt Instrumente je Phase; bei der Internalisierung fehlt eines. | Ergänzen: „passende Instrumente sind Arbeiten mit Checklisten und Handbüchern im Tagesgeschäft, Einarbeitung mit Übungsfällen und Lernen am Arbeitsplatz.“ |
| C-N10 | niedrig | F-HSQ1-06 Ausgangssituation („18 kritische Wissensgebiete, von denen 11 nur eine einzige Person beherrscht“); Theorie-Tabelle Lager Bremen | Ob die übrigen 7 bzw. 12 Gebiete mindestens zwei Personen beherrschen (statt keiner), steht nicht da. Q-1.6-08 sagt es ausdrücklich, der Fall und die Theorie nicht. | „…die übrigen mindestens zwei Personen“ ergänzen (Fall und Theorie). Im Fall bei der Nutzungsquote „(Basis: freigeschaltete Beschäftigte)“ ergänzen, weil 60 Freigeschaltete bei 43 Beschäftigten des Bereichs sonst zu 27 ÷ 43 verleiten. |
| C-N11 | niedrig | Theorie Abschnitt Wissenskultur, Anpassungs- und Veränderungslernen; Q-1.6-09 | Die Abgrenzung über „Regeln“ ist doppeldeutig. Anpassungslernen wirke „innerhalb der bestehenden Ziele und Regeln“, das Beispiel ändert aber eine Regel (Packregel genauer gefasst); Veränderungslernen überprüft „Ziele, Regeln und Annahmen“. Q-09 bleibt nur durch den Zusatz „ohne Ziele, Abläufe oder die Lagerorganisation zu ändern“ eindeutig. Gleiche Konstruktion wie Industriefachwirt 8.5 (Prüfanweisung präzisiert). | Präzisieren: Anpassungslernen „korrigiert Handlungen und Arbeitsregeln innerhalb der bestehenden Ziele, Normen und Grundannahmen“; Veränderungslernen „stellt diese Ziele, Normen und Grundannahmen selbst in Frage“. K-1.6-12 gleich fassen. |
| C-N12 | niedrig | Theorie Kennzahlen (letzter Spiegelpunkt); K-1.6-03 | (a) „Perspektive Lernen und Entwicklung“: Der Bestand `hsq2/2.4` sagt „Lern- und Entwicklungsperspektive“. (b) K-1.6-03 fragt nach „den vier Wissensfeldern“, als wäre das eine Standardgliederung; es ist aber eine Einteilung dieses Entwurfs. | (a) Bestandsbegriff „Lern- und Entwicklungsperspektive“ verwenden. (b) „Welche Wissensfelder braucht ein Großhändler besonders (nenne vier), und wo liegt dieses Wissen?“ |

## Ohne Befund geprüft

- **Fachlich:**
  - DIKW-Stufen, implizit/explizit und individuell/kollektiv sind richtig erklärt.
  - SECI: vier Phasen mit Richtung, Wissensspirale und Abgrenzungsregel. Alle 8 Zuordnungen in Q-1.6-03 sind eindeutig (je 2 pro Zone), die Theorie-Tabelle ist richtig.
  - Bausteinmodell: acht Bausteine richtig, 6 operativ und 2 strategisch; normative, strategische und operative Wissensziele; Bring- und Holprinzip; drei Schritte der Bewahrung.
  - Personalisierung und Kodifizierung; die Instrumente-Tabelle ordnet die Wissensarten und Phasen fachlich stimmig zu; Verfahrens- und Arbeitsanweisung sind richtig abgegrenzt.
  - Wissensbilanz (Human-, Struktur- und Beziehungskapital; Bewertung nach Menge, Qualität und Systematik; keine Bewertung in Euro).
  - Fluktuationsquote mit derselben Formel wie Versicherungen 4.6, Abgrenzung der Austritte genannt.
  - Distraktoren fair; je Einfachauswahl genau eine richtige Antwort; Sortieren mit genau 4 Elementen in eindeutiger Reihenfolge; Q-04 und Q-05 eindeutig; Lückentext mit eindeutigen Lücken.
  - Alle Fragen sind ohne Kontext beantwortbar.
- **Bestand:**
  - Die Standorte Hamburg, Bremen und Leipzig passen zum Bestand; Kassel wird nicht berührt.
  - Rohgewinn der 11 Großkunden: 1,2 Mio. € = 5 % des Rohgewinns von 24 Mio. € (`wbq2/2.5`), plausibel.
  - Leipzig mit durchschnittlich 48 Beschäftigten ist mit Teil D abgestimmt.
  - Verweise tragen: 1.1 (Zielhierarchie, SMART, Soll-Ist), 1.2 (Reorganisation, Partizipation), 1.3 (Datenschutzgrundsätze in der Theorie), 1.4 (MbO, PDCA, kontinuierliche Verbesserung), `hsq4/4.3` (CRM, Außendienst, Key-Account-Management), `hsq5/5.3` (Job Rotation, Personalentwicklung), `hsq2/2.4` (Balanced Scorecard).
  - Datenschutz, Data Warehouse und PDCA werden nicht wiederholt.
  - Wissensmanagement-Begriffe gibt es im Kurs bisher nicht, die Kopfstück-Aussage stimmt.
  - Gleiche Beispielzahlen mit anderer Bedeutung: nur 1.200.000 € (in `hsq2/2.5` und `hsq2/fallaufgaben.md` als Finanzbedarf bzw. Darlehen, als runder Betrag unkritisch).
- **Wörtliche Nähe:**
  - 7-Wort-Abgleich gegen ganz `content/` und `docs/entwuerfe/`: nur Formel- und Standardwendungen (Rechtshinweis, Fachgebietsname, „für einen Großhändler wie die NordWert Handels GmbH“, „was wird beim nächsten Mal anders gemacht“, Fluktuationsformel, Zahlenreihen der Antwortlisten).
  - 5-Wort-Abgleich gegen Industriefachwirt 8.1, 8.3, 8.5 und HQ4-Fall/-Fachgespräch: nur Modellnamen und Fachwendungen.
  - Die Beispiele sind handelsspezifisch (Kartonagen, Folien, Kommissionieren, Key-Account, Exportabwicklung), ohne Solvitec- oder Industriebezug.
- **Hausregeln:**
  - Karten und Quiz duzen, Fall und Fachgespräch siezen, die Theorie spricht niemanden an.
  - Gendern mit Doppelpunkt (bis auf C-N7).
  - Zahlenformat mit Tausenderpunkt, Dezimalkomma, Leerzeichen vor % und €, Minus als „−“.
  - Keine Paragrafen und keine Gesetzes- oder Behördennamen; Rechtshinweis in Theorie und Fall vorhanden.
  - Personennamen nur Nonaka/Takeuchi und Probst/Raub/Romhardt.
  - Fall mit 20 Punkten im Teilaufgaben-Format, Raster je Zeile und Folgefehler-Zeile; Themenbezug im Bestandsformat.
  - Fachgespräch mit 5 Erwartungen je Frage.
  - Umfang: 6 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten (mindestens 4 verlangt), 14 von 16 Fragen sind Szenariofragen.
  - Lage der richtigen Antwort bei Entweder-Oder variiert (1/2).
  - Frontmatter wie verlangt mit typografischem Schlusszeichen in `quelle`.

## Hinweise außerhalb des Pakets (nur gemeldet)

- Das interaktive Instrument „seci“ ist in `packages/shared/src/kurs-angebot.ts` nur für den Industriefachwirt freigeschaltet. Mit Thema 1.6 könnte es auch beim Wirtschaftsfachwirt angeboten werden; der SECI-Quiztyp funktioniert unabhängig davon.
- Bestand `hsq1/1.3` nennt weiterhin Paragrafen und Gesetzesnamen (DSGVO, Art. 28, § 38 BDSG), anders als die neuen Hausregeln. Das wurde nicht geändert.
- Bei der mechanischen Prüfung wurde im gemeinsam genutzten Scratchpad ein vorhandener Ordner `pr-c-content` (vermutlich die nicht gelöschte Content-Kopie der Autor:in, Präfix Teil C) vor dem Kopieren gelöscht. Die übrigen `pr-c-*`-Skripte der Autor:in sind unberührt. Die eigenen Prüfdateien liegen in `scratchpad/pruefer-pr-c/`.
