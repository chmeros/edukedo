# Unabhängige Prüfung P-R Teil D (Organisationsentwicklung, Ergänzung HSQ1 1.2; F-HSQ1-07; Fachgespräch)

Stand 16.10.2026. Geprüft: `wifa-1.2-ergaenzung-organisationsentwicklung.md` und `wifa-faelle-d.md` gegen `auftrag.md`, den Kursbestand `content/wirtschaftsfachwirt/`, die Schwester-Entwürfe A bis C dieses Ordners, `content/industriefachwirt/hq4/8.5-…` und `docs/entwuerfe/industrie-organisation/`. Keine Entwurfs- oder Bestandsdatei geändert.

## Kurzergebnis

- **Rechnen:** 36 Werte mit Node nachgerechnet (Skript `pr-dp-rechnen.cjs` im Scratchpad), dazu 5 Gegenproben. **Kein Rechenfehler.** Alle Musterlösungen, Erklärungen und Fehlrechnungs-Hinweise stimmen.
- **Mechanisch:** In eine Kopie von `content/` mit `einfuegen`, `haengeAn`, `fgEinfuegen` (aus `wirtschaft-finanzen/einspielen.cjs`) eingefügt, `rechtsstand` in 1.2, `fallaufgaben.md` und `fachgespraech.md` ersetzt. `validate-content`: 667 Themendateien, 19.597 Item-Schlüssel (Bestand 19.576, also +21 = 8 Karten + 10 Quiz + 1 Fall + 2 Fachgesprächsfragen), **0 Verstöße**. Parser: 26 Karten, 22 Quizblöcke, 0 nicht geparst; F-HSQ1-07 mit 5 Teilaufgaben (4/4/4/4/4 = 20 Punkte), Tabelle im Prompt erhalten, 5 Musterlösungszeilen plus Folgefehler-Zeile; Fachgespräch 1.2 jetzt 6 Fragen (neu 5E/1R und 5E/1R), Abschnittsreihenfolge unverändert. Kopie danach gelöscht.
- **7-Wort-Abgleich** (gegen gesamtes `content/` und `docs/entwuerfe/`, ohne Kopfstücke): nur Formelzeilen, Metadaten und Hausformeln („nicht förmlich rechtsgeprüft“), dazu zwei inhaltliche Treffer mit Industriefachwirt 8.5 („Stellung: Sie stellen Budget und Personal bereit“, Formel der Akzeptanzquote). **Aber:** Viele Sätze und drei Quizfragen sind enge Umformulierungen von 8.5 (Befund M-3).
- **Befunde:** 1 hoch, 7 mittel, 9 niedrig.

## Befunde

### H-1 (hoch) Zirkelverweis „lernende Organisation“ zwischen Teil C und Teil D

- **Fundstelle:** Teil D, Theorie „Organisationsentwicklung: Begriff und Merkmale“, letzter Absatz („Was sie kennzeichnet …, behandelt Thema 1.6“) und Kopfstück („abgestimmt ist jetzt: Teil C definiert, Teil D nennt … nur“). Teil C `wifa-1.6-wissensmanagement.md`, Abschnitt „Wissenskultur und Barrieren“, letzter Absatz („sie ist das Leitbild der Organisationsentwicklung und wird in Thema 1.2 „Organisationsentwicklung“ erläutert“) und Kopfstück von `wifa-faelle-c.md` („Die lernende Organisation wird nach Abstimmung mit Teil D in `hsq1/1.2` … definiert; 1.6 nennt den Begriff nur und verweist dorthin“).
- **Fehler:** Beide Kopfstücke behaupten das Gegenteil voneinander; im Lerntext verweist 1.2 für die Erläuterung auf 1.6 und 1.6 auf 1.2. Wer nachschlägt, landet im Kreis. Beide Teile werden zusammen eingespielt.
- **Korrektur:** Teil C bleibt Ort der Definition (dort stehen organisationales Lernen, Anpassungs- und Veränderungslernen). In Teil C den Halbsatz „und wird in Thema 1.2 „Organisationsentwicklung“ erläutert, ebenso wie die Steuerung einzelner Veränderungen und der Umgang mit Widerständen“ ersetzen durch „; wie Veränderungen gesteuert werden und wie mit Widerständen umzugehen ist, behandelt Thema 1.2 „Organisationsentwicklung““. Kopfstück von `wifa-faelle-c.md` entsprechend korrigieren („1.6 definiert, 1.2 nennt den Begriff als Leitbild und verweist auf 1.6“). Teil D kann bleiben.

### M-1 (mittel) Beziehungspromotor:innen zu weit definiert; Fall-Teilaufgabe 3 dadurch mehrdeutig

- **Fundstelle:** Theorie „Betroffene und Promotoren“ (Beziehungspromotor:innen „über Bereichs-, Standort- und Unternehmensgrenzen“), K-1.2-22, Erklärung Q-1.2-15, F-HSQ1-07 Teilaufgabe 3 mit Musterlösung, Ausgangssituation („Personalentwicklerin aus Hamburg“; „dort hat aus dem Leipziger Kreis bisher niemand engere Kontakte“).
- **Fachliche Beurteilung (Frage des Autors):** Im Ursprung (Gemünden/Walter, Erweiterung des Witte-Modells nach dem Prozesspromotor von Hauschildt/Chakrabarti) ist der Beziehungspromotor **interorganisational** bestimmt: Er überbrückt mit persönlichen Beziehungen die Grenze zu externen Partnern (Kundschaft, Lieferunternehmen, Forschungs- und Kooperationspartner) und überwindet Barrieren des Nicht-Kennens und Nicht-Vertrauens zwischen Organisationen. Die Überbrückung **innerhalb** der Organisation (Bereiche, Hierarchie, Dienstwege, Zuständigkeiten) ist die Aufgabe des Prozesspromotors. Manche praxisnahe Darstellungen dehnen den Beziehungspromotor auf interne Netzwerke aus; dann verschwimmt aber genau die Grenze zum Prozesspromotor, und Zuordnungsaufgaben werden mehrdeutig. „Bereichsgrenzen“ sollten deshalb nicht in die Kerndefinition; weit entfernte Standorte eines Unternehmens sind ein Grenzfall.
- **Folge im Fall:** Teilaufgabe 3 erwartet als fehlende Rolle für die Übertragung nach Hamburg und Bremen eine Beziehungspromotorin; nach der engen Definition ist das eine Prozess- oder Netzwerkaufgabe innerhalb des Unternehmens. Zudem kommt die Prozesspromotorin (Personalentwicklerin) selbst aus Hamburg; Lernende können sie folgerichtig als Brücke nach Hamburg nennen. Die Musterlösung erkennt beides nicht an.
- **Korrektur:** Theorie: „**Beziehungspromotor:innen** pflegen **persönliche Beziehungen über die Grenzen des Unternehmens hinweg**, etwa zur Kundschaft, zu Lieferunternehmen oder Kooperationspartnern … Manche Darstellungen zählen auch Netzwerke zu weit entfernten Standorten oder Bereichen dazu; die Grenze zu den Prozesspromotor:innen, die innerhalb der Organisation verbinden, ist dann fließend.“ Beispielsatz „und zu den anderen Standorten“ streichen. K-1.2-22 und Erklärung Q-1.2-15 entsprechend („über Unternehmensgrenzen“). Fall: Personalentwicklerin „aus der Personalabteilung des Standorts Leipzig“ statt „aus Hamburg“ (oder Kontakte nach Hamburg ausdrücklich verneinen) und in der Musterlösung von Teilaufgabe 3 anerkennen: „Wer die fehlende Rolle als Prozesspromotor:in mit Netzwerk zu den Lagern in Hamburg und Bremen beschreibt, erhält den Punkt ebenfalls; entscheidend ist, dass Kontakte und Vertrauen zu den Zielstandorten fehlen und jemand sie herstellen muss.“ Alternativ die fehlende Rolle extern verankern (etwa eine Lagerleitung der anderen Standorte als Mitglied der Steuerungsgruppe gewinnen) und Teilaufgabe 3 nach der fehlenden Brücke statt nach einem Rollennamen fragen.

### M-2 (mittel) Survey-Feedback: „zuerst an die befragten Teams“ fachlich verkürzt

- **Fundstelle:** Theorie „Instrumente …“, Survey-Feedback („Die Ergebnisse gehen zuerst an die befragten Teams zurück, nicht nur an die Geschäftsführung“); K-1.2-23 („Ergebnisse zuerst an die befragten Teams zurückmelden“).
- **Fehler:** In der klassischen Survey-Feedback-Methode werden die Ergebnisse stufenweise von oben nach unten zurückgemeldet (Leitung und Führungskräfte erhalten die Daten zuerst und besprechen sie dann mit ihren Teams, Wasserfall- oder Kaskadenprinzip). Kern ist, dass die Ergebnisse **allen** Befragten zurückgemeldet und dort bearbeitet werden, nicht die Reihenfolge „Teams zuerst“. Die Aussage widerspricht auch dem eigenen Grundsatz „Führungskräfte vor ihren Teams informieren“ aus dem Kommunikationsabschnitt.
- **Korrektur:** Theorie: „Die Ergebnisse gehen nicht nur an die Geschäftsführung, sondern an alle befragten Teams zurück, meist stufenweise: Die Führungskräfte erhalten die Ergebnisse ihres Bereichs und besprechen sie anschließend mit ihren Teams.“ K-1.2-23: „Ergebnisse an alle befragten Teams zurückmelden (meist stufenweise über die Führungskräfte)“.

### M-3 (mittel) Enge Umformulierung von Industriefachwirt 8.5 (Sätze, Beispielaufbau, drei Quizfragen)

- **Fundstelle und Gegenstück** (`content/industriefachwirt/hq4/8.5-organisationsentwicklung-change-management.md`, gleichlautend im Entwurf `docs/entwuerfe/industrie-organisation/industrie-8.5-…`):
  - Machtpromotor:innen „fördern das Vorhaben kraft ihrer hierarchischen Stellung: Sie stellen Budget und Personal bereit, … geben Rückendeckung“ ↔ 8.5 „fördern das Vorhaben durch ihre hierarchische Stellung: Sie stellen Budget und Personal bereit, geben Rückendeckung“ (7-Wort-Treffer).
  - Prozesspromotor:innen („kennen die Organisation … Menschen. Sie verbinden …, übersetzen zwischen … und sorgen dafür, dass das Vorhaben nicht ins Stocken gerät. Häufig … die Projektleitung“) ↔ 8.5 („verbinden beide: Sie kennen die Organisation und ihre Menschen, übersetzen … halten den Prozess in Gang, oft die Projektleitung“).
  - OE-Begleiter:innen „bringen Methoden … ein, liefern aber keine fertige Lösung“ ↔ 8.5 „die Methoden einbringen, aber keine fertigen Lösungen vorgeben (Hilfe zur Selbsthilfe)“.
  - Survey-Feedback „Eine Befragung, auf die nichts folgt, schadet: … den Eindruck, Meinungen seien folgenlos“ ↔ 8.5 „schadet eine Befragung eher, weil … den Eindruck gewinnen, ihre Meinung sei folgenlos“.
  - Pilotprojekt „Fehler zeigen sich früh und mit begrenztem Schaden … ein sichtbarer Erfolg überzeugt Zögernde (Kotter …)“ ↔ 8.5 „Fehler früh und mit geringem Schaden erkannt, … kurzfristigen Erfolge, die andere überzeugen (Kotter, Stufe 6)“.
  - „Fehlen Informationen, füllen Gerüchte die Lücke“ ↔ „Wo Information fehlt, entstehen Gerüchte“; „Wessen Aufgaben sich grundlegend ändern, erfährt das im Einzelgespräch, nicht aus dem Intranet“ ↔ „Wer den Arbeitsplatz wechseln soll, erfährt das im Einzelgespräch …, nicht aus dem Intranet“; Vier-Seiten-Beispiel im selben Bau („ist sachlich eine Information, kann aber als … gehört werden“).
  - „Zahlen allein erklären nicht, warum ein Viertel nicht zustimmt; dafür werden offene Antworten, Teamrunden und Gespräche ausgewertet“ ↔ „Eine Quote allein sagt noch nicht, warum die übrigen 30 % nicht zustimmen; dafür werden offene Antworten und Gespräche ausgewertet“.
  - Instrumententabelle „Stimmung und Handlungsbedarf erfassen und gemeinsam Folgerungen ziehen“, „Lösung … erproben und Erfolge zeigen“, „Zusammenarbeit in neuen … Teams klären“ ↔ 8.5-Tabelle und Q-8.5-15 („Stimmung und Handlungsbedarf erfassen und gemeinsam Maßnahmen ableiten“, „Lösung erproben und Erfolge zeigen“, „Zusammenarbeit in neuen Teams“).
  - **Q-1.2-15** ↔ Q-8.5-05 (Entweder-Oder, Person mit Netz/Fachwissen, Hinweis „Über Budget entscheidet sie nicht“ ↔ „Budget und Personal kann sie nicht bereitstellen“, Distraktor Machtpromotorin). **Q-1.2-19** ↔ Q-8.5-10 (Akzeptanzquote mit „Bezugsgröße … nicht alle Befragten; wie viele geantwortet haben, zeigt die Rücklaufquote“). **Q-1.2-20** ↔ Q-8.5-11 („In der ersten … stimmen X von Y gültigen Antworten zu, in der zweiten …“ samt Erklärung „bezogen auf den Ausgangswert … Prozentpunkte“).
- **Fehler:** Der 7-Wort-Abgleich schlägt fast nicht an, aber Satzbau, Reihenfolge und Beispiele folgen 8.5 Satz für Satz; der Auftrag verlangt, Sätze und Quizfragen der Industrie-Texte nicht zu übernehmen, sondern neu zu bauen.
- **Korrektur:** Die genannten Sätze aus der Handelssituation heraus neu fassen statt umstellen (zum Beispiel Machtpromotor:innen über konkrete NordWert-Entscheidungen: „gibt Arbeitszeit für die Workshops frei, verschiebt die Einführung des neuen Tourenplans, damit die Teams nicht doppelt belastet sind“; Gerüchte-Satz streichen, stattdessen ein Beispiel aus dem Lager oder Innendienst). Q-1.2-15 neu: anderer Rollenvergleich (Beziehungs- gegen Prozesspromotorin, siehe M-1) ohne Budget-Hinweis. Q-1.2-19 als Rücklauf- oder Teilnahmequote fragen oder die Fehlrechnung („durch abgegebene Fragebogen geteilt“) zur Frage machen. Q-1.2-20 auf eine andere Größe umstellen, etwa die Teilnahmequote zweier Schulungsrunden oder die Erstlösungsquote (harte Kennzahl), und die Erklärung anders formulieren. Die Tabelle „Zweck | Instrument“ ggf. in eine Auswahlregel im Fließtext überführen.

### M-4 (mittel) Q-1.2-20 akzeptiert „28 %“ und „28 Prozent“ als Anstieg

- **Fundstelle:** Q-1.2-20, „Akzeptierte Antworten“.
- **Fehler:** Die Frage fragt ausdrücklich nach Prozentpunkten, die Theorie lehrt, dass eine Angabe in Prozent „leicht misszuverstehen“ wäre, und die Erklärung nennt 53,85 % als relative Änderung. Trotzdem gelten „28 %“, „28 Prozent“, „+28 %“, „28,0 %“ als richtig. Teil C (Q-1.6-15) und Industriefachwirt Q-8.5-11 akzeptieren bei derselben Fragestellung nur Prozentpunkt-Schreibweisen; das Paket wäre uneinheitlich. Zugleich fehlen Varianten: „28,00 Prozentpunkte“, „28.00 Prozentpunkte“, „+28,00 Prozentpunkte“, „28,0 Pp“, „28 Prozentpunkt“, „28 %-Pkt.“.
- **Korrektur:** „28 %; 28 Prozent; 28,0 %; 28.0 %; +28 %; +28 Prozent“ streichen; ergänzen „28,00 Prozentpunkte; 28.00 Prozentpunkte; +28,00 Prozentpunkte; +28.00 Prozentpunkte; 28 Prozentpunkt; +28 Prozentpunkt; 28,0 Pp; 28.0 Pp; +28,0 Pp; +28.0 Pp; 28 %-Pkt.; +28 %-Pkt.“ (Liste wie Q-1.6-15/Q-8.5-11). Falls „%“ bewusst toleriert werden soll, das paketweit einheitlich entscheiden und Teil C angleichen.

### M-5 (mittel) Ergänzung macht die Bestandsfrage Q-1.2-07 mehrdeutig

- **Fundstelle:** Bestand Q-1.2-07 (Lückentext: „Ein Wandel, der als planvoller, systematischer Prozess zur Weiterentwicklung von Strukturen, Prozessen und Kultur eines Unternehmens gestaltet wird, wird als ___Change-Management___ bezeichnet.“) gegen die neue Definition in Teil D („langfristig angelegter, geplanter Entwicklungsprozess, in dem … Strukturen, Abläufe, ihre Zusammenarbeit und ihre Kultur gemeinsam weiterentwickeln“).
- **Fehler:** Nach dem Einspielen passt der Lückentext wörtlich besser auf „Organisationsentwicklung“; der Lückentext akzeptiert nur „Change-Management“. Lernende, die die neue Abgrenzung gelernt haben, werden falsch bewertet. Ähnlich, aber unkritischer: K-1.2-01.
- **Korrektur (Bestand, nur zur Entscheidung gemeldet):** Beim Einspielen Q-1.2-07 eindeutig machen, etwa „Die geplante, systematisch gesteuerte Umsetzung eines bestimmten Veränderungsvorhabens mit festem Ziel und Ende, einschließlich Information und Akzeptanz, wird als ___Change-Management___ bezeichnet.“ Alternativ in Teil D im Abgrenzungsabsatz ausdrücklich auf die weite Definition im Abschnitt „Change-Management-Grundlagen“ hinweisen; das löst die Bewertung im Lückentext aber nicht.

### M-6 (mittel) Fall: Fachpromotor mit Wissen über den falschen Gegenstand; Lagerleiterin offen

- **Fundstelle:** F-HSQ1-07 Ausgangssituation und Musterlösung Teilaufgabe 3.
- **Fehler:** Gegenstand der Veränderung ist die Teamorganisation mit Selbststeuerung und Kennzahlen-Teamrunden, nicht die Lagerverwaltungssoftware. Der Kommissionierer wird über Lagerplätze und Software als Fachpromotor begründet; sein Wissen über Fehlerursachen in der Kommissionierung, das für die neuen Abläufe zählt, wird nicht genannt. Fachpromotor:innen bringen nach der eigenen Theorie Wissen „über den Gegenstand der Veränderung“ ein.
- **Korrektur:** Ausgangssituation: „… kennt jeden Lagerplatz, weiß, an welchen Stellen und bei welchen Artikeln die meisten Kommissionierfehler entstehen, und hat die neuen Teamabläufe im Workshop mitentworfen; er erklärt sie den Kolleg:innen.“ Musterlösung entsprechend begründen.

### M-7 (mittel) Gleiche Beispielzahlen mit anderer Bedeutung in Teil A

- **Fundstelle:** F-HSQ1-07 (Fehlerquote Kommissionierung Ausgangswert **1,8 %**, Istwert **1,3 %**) gegen Teil A Q-1.5-03 (Reklamationsquote Bremen **1,8 %**, falsches einfaches Mittel **1,3 %**).
- **Fehler:** Der Auftrag verlangt ausdrücklich keine gleichen Zahlen mit anderer Bedeutung; beide Teile werden im selben Fachgebiet zugleich eingespielt, beide Zahlenpaare sind Quoten in der Logistik.
- **Korrektur:** Im Fall z. B. Ausgangswert 2,4 %, Zielwert 1,6 %, Istwert 1,9 %; Ergebnis bleibt (1,9 − 2,4) ÷ (1,6 − 2,4) × 100 = 62,50 % (nachgerechnet), Musterlösung und Bedingungsprüfung unverändert gültig. Vor der Übernahme die neuen Werte per Grep gegen die Teile A bis C prüfen.

### N-1 (niedrig) Arbeitnehmervertretung in Leipzig: Kopfstück und Fall widersprechen sich

- **Fundstelle:** Kopfstück der Ergänzung („Ob an einem Standort eine Arbeitnehmervertretung besteht, lässt die Ergänzung offen („sofern vorhanden“)“) gegen F-HSQ1-07 („Weitere Beteiligte sind die Arbeitnehmervertretung des Standorts“).
- **Befund zum Bestand:** Kein harter Widerspruch. `wbq3/3.2` sagt nur, dass an größeren Standorten ein Betriebsrat gewählt werden **kann**; die WBQ3-Fallaufgabe (Betriebsratswahl erstmals geplant) spielt an einem **ungenannten** Standort mit 45 Beschäftigten in der Versandabteilung. Leipzig mit eigener Arbeitnehmervertretung ist verträglich, solange dieser WBQ3-Standort nicht Leipzig ist. Leipzig kommt sonst nur in `hsq2/2.1` und `hsq2/fallaufgaben.md` (Lagererweiterung, 400.000 €) vor; kein Widerspruch zu Größe oder Funktion.
- **Korrektur:** Im Fall bewusst festlegen („die gewählte Arbeitnehmervertretung des Standorts Leipzig“) und das Kopfstück anpassen („Theorie: sofern vorhanden; im Fall F-HSQ1-07 besteht in Leipzig eine Arbeitnehmervertretung; der Standort der WBQ3-Fallaufgabe bleibt ungenannt und darf nicht als Leipzig benannt werden“). In der Musterlösung von Teilaufgabe 2 steht „wegen ihrer Beteiligungsrechte bei Änderungen der Arbeitsorganisation, bei Befragungen und Kennzahlen“; das ist rechtsnah und konkreter als die Theorie. Kürzen auf „wegen ihrer Beteiligungsrechte (gesetzliche Vorgaben nicht verlangt, nicht förmlich rechtsgeprüft)“.

### N-2 (niedrig) „Befragung zu Beginn des Jahres“ mit 48 Beschäftigten gegen Teil C (46 am Jahresanfang)

- **Fundstelle:** F-HSQ1-07 Ausgangssituation („in einer Befragung zu Beginn des Jahres“; Tabelle „alle 48 Beschäftigten“) gegen Teil C, `wifa-1.6-wissensmanagement.md` („Lager und Versand Leipzig: 46 Beschäftigte am Jahresanfang, 50 am Jahresende“).
- **Fehler:** Das Kopfstück stimmt die 48 als Jahresdurchschnitt ab, der Fall nennt aber ausdrücklich eine Befragung „zu Beginn des Jahres“; gleiches Jahr angenommen, wären es 46 Beschäftigte. Außerdem bleibt offen, ob diese Befragung die Ausgangsbefragung der Tabelle ist.
- **Korrektur:** „in einer Befragung im vergangenen Herbst“ oder „in der jährlichen Mitarbeiterbefragung“ und klarstellen, dass die Ausgangsbefragung der Tabelle eine eigene Befragung kurz vor dem Pilot ist.

### N-3 (niedrig) Q-1.2-15 zu leicht (Hinweis verrät die Antwort)

- **Fundstelle:** Q-1.2-15.
- **Fehler:** Mit „Über Budget entscheidet sie nicht“ ist der einzige Distraktor ausgeschlossen; die Frage prüft kaum etwas (vgl. auch M-3).
- **Korrektur:** Distraktor „Prozesspromotorin“ statt „Machtpromotorin“, Budget-Satz streichen; Erklärung: „Prozesspromotor:innen verbinden innerhalb der Organisation; sie stellt Kontakte zu Kundenunternehmen her, also über die Unternehmensgrenze.“ Setzt die engere Definition aus M-1 voraus.

### N-4 (niedrig) Q-1.2-16: erster Distraktor kollidiert mit einer Theorieregel

- **Fundstelle:** Q-1.2-16, Option 1 („Informiert wird erst, wenn alle Einzelheiten der neuen Teams endgültig feststehen …“) gegen Theorie („Die Kundschaft erfährt von der Änderung erst, wenn intern feststeht, wer sie künftig betreut“).
- **Fehler:** Ohne Angabe der Zielgruppe ist die Option für die Kundschaft nach der eigenen Theorie richtig.
- **Korrektur:** „Die Beschäftigten werden erst informiert, wenn alle Einzelheiten der neuen Teams endgültig feststehen …“.

### N-5 (niedrig) Theorie nennt nur Istwert ÷ Zielwert, Q-1.2-21 rechnet Zielwert ÷ Istwert

- **Fundstelle:** Theorie „Erreichter Anteil der geplanten Verbesserung“ („das einfache Verhältnis Istwert ÷ Zielwert überzeichnet“) gegen Erklärung Q-1.2-21 („Das Verhältnis Zielwert ÷ Istwert (2,0 ÷ 3,1 × 100 ≈ 64,52 %)“).
- **Fehler:** Bei Senkungszielen ist Istwert ÷ Zielwert über 100 % (3,1 ÷ 2,0 = 155 %); die Erklärung kehrt das Verhältnis um, ohne dass die Theorie das zeigt.
- **Korrektur:** Theorie ergänzen: „(bei Senkungszielen Zielwert ÷ Istwert)“.

### N-6 (niedrig) Gendern: Kundschaft im B2B

- **Fundstelle:** Q-1.2-22 („Großkund:innen rufen wieder … an“), Theorie Rückfall-Liste („Kund:innen wieder ihre früheren Ansprechpersonen …“).
- **Fehler:** NordWert beliefert Unternehmen; die Hausregel sieht für Geschäftspartner neutrale Formen vor, der übrige Entwurf schreibt „Großkundschaft“.
- **Korrektur:** „Einkaufsverantwortliche der Großkundschaft rufen wieder …“, „die Kundschaft wieder ihre früheren Ansprechpersonen …“.

### N-7 (niedrig) Kleine Formulierungsfehler

- K-1.2-19 Antwort beginnt „Einen langfristig angelegten …“ auf die Frage „Wie lässt sich OE beschreiben“: „Als langfristig angelegten …“.
- Q-1.2-13 und Q-1.2-22: richtige Antwort beide an Position 3 (kein System, aber bei nur zwei Multiple-Choice-artigen Fragen auffällig); eine davon verschieben.
- „Thema 1.3“ und „Thema 1.4“ sind im Kurs doppelt belegt (`wbq1/1.3` Existenzgründung, `wbq1/1.4` Unternehmenszusammenschlüsse); bei der ersten Nennung in der Ergänzung den Titel ergänzen („Thema 1.3 „Informationstechnologie im Management““, „Thema 1.4 „Managementtechniken““), wie bei 2.4, 3.2, 3.3, 4.1.

### N-8 (niedrig) rechtsstand der Sammeldateien wird von Teil C und Teil D ersetzt

- **Fundstelle:** Kopfstück `wifa-faelle-d.md` und Kopfstück `wifa-faelle-c.md`.
- **Fehler:** Beide Teile wollen den `rechtsstand` von `hsq1/fallaufgaben.md` und `hsq1/fachgespraech.md` ersetzen; ein Einspielskript nach dem Muster von P-Q bricht beim zweiten Mal ab („Textstelle fehlt“).
- **Korrektur:** Im Einspielskript nur einmal ersetzen (Teil C sagt „einmal für das ganze Paket“); im Kopfstück von Teil D darauf verweisen.

### N-9 (niedrig) Fall-Teilaufgabe 4: Prüfung der Bedingung „Akzeptanz“ bezieht das ganze Lager ein

- **Fundstelle:** F-HSQ1-07, Tabelle und Bedingungen.
- **Befund:** Rechnerisch richtig. Die Akzeptanzquote misst alle 48 Beschäftigten, die Fehlerquote nur den Pilotbereich; die Musterlösung erkennt diese Einschränkung als Zusatz an. Für Teilaufgabe 4 (4 Punkte) sind neun Rechenwerte plus Prüfung viel; vertretbar, aber knapp.
- **Korrektur (optional):** Rücklaufquoten aus Teilaufgabe 4 streichen oder Teilaufgabe 4 auf 5 Punkte und Teilaufgabe 3 auf 3 Punkte setzen.

## Ohne Befund geprüft

- **Fachlich:** Abgrenzung OE / Change-Management / Reorganisation (mit Hinweis auf uneinheitlichen Sprachgebrauch) vertretbar; OE-Merkmale (Doppelziel, Beteiligung, Hilfe zur Selbsthilfe, personaler und strukturaler Ansatz, Aktionsforschung) korrekt. Stakeholder-Matrix Einfluss/Interesse mit den vier Normstrategien (eng einbinden, zufriedenstellen, informieren und beteiligen, beobachten) korrekt; Q-1.2-14 eindeutig. Promotorenmodell: Witte mit Macht- und Fachpromotor sowie Barrieren des Nicht-Wollens und Nicht-Wissens korrekt, Erweiterung um zwei Rollen korrekt, Opponent:innen korrekt (außer M-1). Zukunftswerkstatt: Vorbereitung, Kritik-, Fantasie-/Utopie-, Verwirklichungsphase korrekt. Prozessberatung gegen Experten-/Fachberatung korrekt; Q-1.2-18 eindeutig (Distraktor Mediation unterscheidbar). Kommunikationsplan (Botschaft, Kanal, Zeitpunkt, Absender:in, Rückkanal) und Grundsätze korrekt. Change-Controlling, harte/weiche Kennzahlen, Quotenformeln, Prozentpunkte, „erreichter Anteil der geplanten Verbesserung“ korrekt. Sortieren Q-1.2-17 genau 4 Elemente, Reihenfolge eindeutig (bis auf M-2 ohne Einwand).
- **Bestand:** Lewin, Kotter, Widerstandsformen, Partizipation, Organisationsanalyse nur verwiesen, nicht wiederholt. Verweise geprüft: `hsq5/5.4` (Prozess- statt Ergebnisverantwortung der Moderation), `hsq5/5.2` (Mediation), `hsq5/5.1` (Vier-Seiten-Modell), `wbq4/4.1` (Prozess-Owner), `hsq2/2.4` (Soll-Ist-Vergleich; Fachgebietsname korrekt), `hsq3/3.3` (Meilensteine als Raute im Gantt-Diagramm), `wbq3/3.2` (Fachgebiet „Recht und Steuern“). Begriffe Stakeholder, Promotor, Survey-Feedback, Zukunftswerkstatt, Prozessberatung, Teilnahme-, Rücklauf-, Akzeptanzquote kommen im Kurs bisher nicht vor (Grep bestätigt). „Region Nord“ (vgl. `hsq2/fallaufgaben.md`), Hamburg, Bremen, Leipzig, rund 280 Beschäftigte und Beispiele Warenwirtschaftssystem/Einkaufsbündelung passen zum Bestand. Keine Beispielzahl kollidiert mit dem Bestand (Grep nach 1,8 %, 81,25, 52,5 %, 62,5 %, 96/48 Beschäftigte, Fehlerquote, Reklamationsquote).
- **Hausregeln:** Karten und Quiz duzen, Fall und Fachgespräch siezen, Theorie neutral; Doppelpunkt-Gendern; Tausenderpunkt/Dezimalkomma, Leerzeichen vor %; keine Paragrafen, Gesetzes- oder Behördennamen; Personennamen nur Lewin, Kotter, Witte. IDs lückenlos K-1.2-19 bis -26 (8) und Q-1.2-13 bis -22 (10), Bestand vorher lückenlos K-01 bis -18 und Q-01 bis -12. Quiztypen gemischt (8 Typen, kein Wahr/Falsch), 3 Rechen-Kurzantworten (Soll mindestens 2), 8 von 10 Szenariofragen. Fall 20 Punkte, 5 Teilaufgaben im Pflichtformat, Punkteraster je Zeile, Folgefehler-Zeile; Fachgespräch 2 Fragen mit je 5 Erwartungen und einer Rückfrage, Erwartungen nur aus der Kurstheorie.

## Nachgerechnete Werte (36, Skript `pr-dp-rechnen.cjs`)

Theorie: 78 ÷ 96 = 81,25 %; 80 ÷ 96 ≈ 83,33 %; 90 ÷ 96 = 93,75 %; 42 ÷ 80 = 52,5 %; 90 − 2 = 88; 66 ÷ 88 = 75 %; 75 − 52,5 = 22,5 Pp; 22,5 ÷ 52,5 ≈ 42,86 %; 66 ÷ 90 ≈ 73,33 %; (74 − 60) ÷ (80 − 60) = 70 %; 74 ÷ 80 = 92,5 %; „ein Viertel“ = 25 %.
Q-1.2-19: 92 − 7 = 85; 51 ÷ 85 = 60 %; 51 ÷ 92 ≈ 55,43 %; 51 ÷ 110 ≈ 46,36 %; 92 ÷ 110 ≈ 83,64 %.
Q-1.2-20: 39 ÷ 75 = 52 %; 68 ÷ 85 = 80 %; 28 Pp; 28 ÷ 52 ≈ 53,85 %.
Q-1.2-21: (3,1 − 4,0) ÷ (2,0 − 4,0) = 45 %; 2,0 ÷ 3,1 ≈ 64,52 %.
F-HSQ1-07: 42 ÷ 48 = 87,50 %; 44 ÷ 48 ≈ 91,67 %; 17 ÷ 20 = 85,00 %; 18 ÷ 40 = 45,00 %; 26 ÷ 40 = 65,00 %; +20,00 Pp; 20 ÷ 45 ≈ 44,44 %; 18 ÷ 42 ≈ 42,86 %; 26 ÷ 44 ≈ 59,09 %; 59,09 − 42,86 = 16,23 Pp (auch ungerundet 16,23); 18 ÷ 48 = 37,50 %; (1,3 − 1,8) ÷ (1,0 − 1,8) = 62,50 %.
Gegenproben: 26 ÷ 48 ≈ 54,17 %; Fehlrechnung „durch abgegebene Fragebogen“ unterschreitet 60 % (Urteil kippt, wie die Musterlösung sagt); Bedingungen 85 ≥ 80, 65 ≥ 60, 62,5 ≥ 50 erfüllt; Teil C (46 + 50) ÷ 2 = 48; Korrekturvorschlag M-7 (1,9 − 2,4) ÷ (1,6 − 2,4) = 62,5 %.
