---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: DP5
fachgebiet_title: "Planen und Durchführen eines Projektes der Datenanalyse"
thema_code: "DP5-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen, orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit nach § 28 Abs. 3 der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250) — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Die Fragen simulieren typische Rückfragen eines Prüfungsausschusses im Anschluss an die Präsentation einer betrieblichen Projektarbeit im Prüfungsbereich „Planen und Durchführen eines Projektes der Datenanalyse" (§ 28 FIAusbV). Präsentation und Fachgespräch dauern insgesamt höchstens 30 Minuten, die Präsentation soll höchstens 15 Minuten dauern. Die Fragen sind aus der Ich-Perspektive des Prüflings zu beantworten, beziehen sich beispielhaft auf Datenanalyse-Projekte bei der Brevanta IT-Systemhaus GmbH (z. B. Absatzprognose, Kundensegmentierung, Ausfallanalyse von Maschinen, Auswertung von Support-Tickets, Reporting-Dashboard, Datenqualitätsanalyse) und erfordern freies Formulieren mit Begründung — nicht das Aufsagen auswendig gelernter Definitionen.

### 12.1 Projektwahl, Anforderungen, Datenschutz und Planung

- Warum haben Sie genau dieses Projekt gewählt, welche Fragestellung des Kunden steckt dahinter, und wie haben Sie geprüft, dass es in der verfügbaren Zeit machbar ist?
  - Erwartung: Das Projekt ist eine betriebliche Projektarbeit für einen echten internen oder externen Auftrag, z. B. eine Absatzprognose oder eine Kundensegmentierung bei der Brevanta IT-Systemhaus GmbH.
  - Erwartung: Hinter dem Projekt steht eine konkrete Fragestellung, die sich mit Daten beantworten lässt und an einer Entscheidung des Kunden hängt, nicht nur der Wunsch, irgendetwas mit den Daten zu machen.
  - Erwartung: Die Machbarkeit wird an Kriterien festgemacht: Die Daten sind vorhanden und zugänglich, und Umfang und Tiefe passen einschließlich Dokumentation in höchstens 40 Stunden.
  - Erwartung: Die Eigenleistung lässt sich klar abgrenzen, der Erfolg ist über eine Zielgröße messbar, und die Auftraggebenden sind mit Durchführung, Dokumentation und Vorstellung einverstanden.
  - Rückfrage: Welche typischen Fehlgriffe bei der Wahl eines Projekts kennen Sie?
- Wie lautet Ihre Analysefrage, welche Zielgröße und welche Erfolgskriterien haben Sie festgelegt, und woran haben Sie am Ende gemessen, ob das Projektziel erreicht wurde?
  - Erwartung: Die Analysefrage ist präzise und mit Daten beantwortbar; sie wird aus dem Geschäftsproblem und der Entscheidung abgeleitet, die durch die Analyse besser werden soll.
  - Erwartung: Die Zielgröße ist das, was ermittelt oder vorhergesagt wird (z. B. die wöchentliche Absatzmenge); das Erfolgskriterium legt fest, ab wann das Ergebnis gut genug ist (z. B. MAPE höchstens 12 % auf einem vorab festgelegten Testzeitraum).
  - Erwartung: Als Vergleichsmaßstab wird schon in der Anforderungsanalyse eine Baseline bestimmt (z. B. die Vorjahreswert-Methode), weil ein neues Verfahren nur dann gut ist, wenn es besser ist als das bisherige Vorgehen.
  - Erwartung: Am Ende werden die Muss-Ziele anhand der festgelegten Messgröße und des Vergleichsmaßstabs überprüft; Kann-Ziele dürfen bei Engpässen entfallen.
  - Rückfrage: Was unterscheidet Muss-Ziele, Kann-Ziele und Nicht-Ziele im Projektziel?
- Wie haben Sie die Anforderungen des Kunden ermittelt, und welche Anforderungen haben Sie bewusst nicht umgesetzt (Abgrenzung)?
  - Erwartung: Ausgangspunkt ist das Geschäftsproblem: Es wird geklärt, welche Entscheidung durch die Analyse besser werden soll, z. B. mit der Frage, woran der Kunde merkt, dass die Analyse gelungen ist.
  - Erwartung: Die Rahmenbedingungen werden erfasst, z. B. Fristen, verfügbare Werkzeuge und Systeme, Zugriffsrechte, Freigabeprozesse sowie Anforderungen an Nachvollziehbarkeit, Aktualität und Darstellung der Ergebnisse.
  - Erwartung: Die Anforderungen werden in überprüfbarer Form festgehalten (Nummer, Messgröße, Erfolgskriterium, Priorität) und nach Muss, Soll und Kann gewichtet.
  - Erwartung: Zur Abgrenzung gehören ausdrücklich ausgeschlossene Punkte (Nicht-Ziele), z. B. die Anbindung an das Bestellsystem, sowie Kann-Anforderungen, die bei Bedarf entfallen dürfen.
  - Rückfrage: Welche Fragen stellen Sie dem Kunden im Anforderungsgespräch?
- Wie war die Datenlage zu Projektbeginn, und was hätten Sie getan, wenn die benötigten Daten nicht oder nur eingeschränkt verfügbar gewesen wären?
  - Erwartung: Zur Datenlage gehören Quellen und Dateneigner:innen, Zeitraum und Granularität, Umfang, Qualität, Zugriffsweg und die Frage, ob personenbezogene Daten enthalten sind.
  - Erwartung: Ein kurzer Machbarkeits-Check (Stichprobe ansehen: Zeitraum, Lücken, Struktur) verhindert, dass die Planung auf falschen Annahmen über die Datenlage beruht.
  - Erwartung: Sind Daten nicht oder nur eingeschränkt verfügbar, wird das als Risiko behandelt: Die Datenfreigabe wird sofort beantragt und die Datenqualität vorab per Stichprobe geprüft.
  - Erwartung: Alternativ wird der Umfang so geplant, dass Kann-Ziele bei Bedarf entfallen können; wesentliche Änderungen, z. B. eine unbrauchbare Datenquelle, werden mit den Auftraggebenden und dem Ausbildungsbetrieb abgestimmt und begründet dokumentiert.
  - Rückfrage: Warum gehört ein Machbarkeits-Check der Daten schon in die Anforderungsanalyse?
- Wie haben Sie Datenschutz, Berechtigungen und Freigaben in Ihrer Planung berücksichtigt (z. B. Personenbezug, Datenminimierung, Beteiligung der Datenschutzbeauftragten)?
- Wie haben Sie Ihren Zeitplan aufgestellt, welche Risiken haben Sie eingeplant, und welche Abweichungen gab es gegenüber der genehmigten Projektbeschreibung?
  - Erwartung: Der Zeitplan ist in Arbeitspakete gegliedert (z. B. Anforderungsanalyse, Datenbeschaffung, Datenaufbereitung, Analyse und Modellbildung, Ergebnisaufbereitung, Dokumentation, Puffer) und summiert sich auf den Rahmen von höchstens 40 Stunden.
  - Erwartung: Die Datenaufbereitung wird bewusst hoch angesetzt, weil das Verstehen, Bereinigen und Zusammenführen von Daten in der Praxis häufig einen großen Teil der Projektzeit kostet (Erfahrungswert, keine Vorgabe).
  - Erwartung: Risiken werden vorab über den Erwartungswert bewertet (Eintrittswahrscheinlichkeit mal Schaden), z. B. Datenfreigabe verzögert sich: 0,4 × 6 Std. = 2,4 Std.
  - Erwartung: Liegt die Summe der Erwartungswerte über dem Puffer, werden Risiken durch Gegenmaßnahmen gesenkt oder der Umfang so geplant, dass Kann-Ziele entfallen können; den Puffer einfach zu vergrößern ist keine Lösung, weil der Rahmen von 40 Stunden fest ist.
  - Erwartung: Wesentliche Abweichungen von der genehmigten Projektbeschreibung werden mit den Auftraggebenden und dem Ausbildungsbetrieb abgestimmt und in der Dokumentation begründet; ob und wie die zuständige Stelle zu informieren ist, regelt diese unterschiedlich.
  - Rückfrage: Warum liegen Genehmigungen und Freigaben häufig auf dem kritischen Pfad?
  - Rückfrage: Was unterscheidet den Aufwand in Stunden von der Dauer in Kalendertagen?

### 12.2 Datenqualität, Methodik, Ergebnisse, Optimierung und Wirtschaftlichkeit

- Wie haben Sie die Datenquellen identifiziert und klassifiziert, und wie haben Sie die Berechtigung zur Nutzung und zur Verknüpfung der Daten geprüft?
- Wie haben Sie die Datenqualität geprüft (z. B. Vollständigkeit, Plausibilität, Redundanz, Validität), welche Mängel haben Sie gefunden, und wie haben Sie darauf reagiert?
  - Erwartung: Als Prüfmerkmale dienen Plausibilität, Quantität, Redundanz, Vollständigkeit und Validität; die Ergebnisse werden dokumentiert, und bei Abweichungen vom Sollzustand werden Maßnahmen vorgeschlagen.
  - Erwartung: Ein Datenprofil zeigt Anzahl der Datensätze und Felder, Datentypen, Wertebereiche, fehlende Werte, Verteilungen und auffällige Ausreißer.
  - Erwartung: Einfache Kennzahlen machen die Qualität messbar, z. B. die Vollständigkeit der Pflichtfelder als Anteil vollständiger Datensätze und die Redundanzquote als Anteil der Dubletten.
  - Erwartung: Die Aufbereitung (Bereinigen, Typen korrigieren, Dubletten entfernen, fehlende Werte behandeln) wird in einem Aufbereitungsprotokoll festgehalten: was warum getan wurde und wie viele Datensätze davor und danach betroffen waren.
  - Rückfrage: Wie berechnen Sie die Vollständigkeit der Pflichtfelder, wenn in 360 von 12.000 Datensätzen ein Pflichtfeld fehlt?
- Wie sind Sie mit fehlenden Werten und Ausreißern umgegangen, und welche Auswirkungen hatte das auf Ihre Ergebnisse?
  - Erwartung: Ein Datensatz mit fehlendem Wert kann gelöscht, ersetzt (z. B. durch Mittelwert oder Median) oder gesondert markiert werden; jede Variante hat Folgen wie Datenverlust oder Verzerrung.
  - Erwartung: Die Wahl wird begründet und nicht stillschweigend getroffen, und sie wird im Aufbereitungsprotokoll festgehalten.
  - Erwartung: Ausreißer werden schon im Datenprofil erkannt; bei der Validitätsprüfung wird untersucht, ob die Ergebnisse stark von einzelnen Ausreißern abhängen, und einzelne Ausreißer werden gesondert betrachtet.
  - Erwartung: Die Auswirkungen auf die Ergebnisse werden benannt, ebenso Annahmen und Grenzen sowie berücksichtigte Sonderereignisse wie Aktionen oder Störungen.
  - Rückfrage: Welche Folgen kann es haben, fehlende Werte zu löschen oder zu ersetzen?
- Warum haben Sie dieses Analyseverfahren gewählt, welche Alternativen haben Sie erwogen, und warum haben Sie sie verworfen?
  - Erwartung: Die Methode folgt der Fragestellung: Eine Zahl vorherzusagen führt zu Regression oder Zeitreihenprognose, eine Ja/Nein-Zuordnung zur Klassifikation, die Suche nach natürlichen Gruppen zur Clusteranalyse.
  - Erwartung: Kriterien der Methodenwahl sind die Passung zu Fragestellung und Datenlage (Menge, Qualität, Merkmalstypen), die Verständlichkeit und Erklärbarkeit für die Adressaten, der Aufwand in 40 Stunden und die Kosten der Fehlerarten.
  - Erwartung: Ein einfaches, gut erklärbares Verfahren, das die Anforderungen erfüllt, ist einer komplizierten Black Box meist vorzuziehen.
  - Erwartung: Die erwogenen Alternativen werden mit dem Grund ihrer Verwerfung benannt, und zusätzlich wird immer die Baseline gezeigt, gegen die das Modell antritt.
  - Rückfrage: Welche Verfahrensklasse passt zur Frage, welche natürlichen Gruppen es gibt?
- Wie haben Sie die Güte Ihres Modells bewertet, und mit welchem Vergleichsmaßstab (Baseline) haben Sie es verglichen?
  - Erwartung: Für Zahlenprognosen dienen Gütemaße wie MAE (mittlerer absoluter Fehler) und MAPE (mittlerer prozentualer absoluter Fehler, problematisch bei Istwerten nahe null).
  - Erwartung: Das Modell wird mit der Baseline (z. B. Vorjahreswert oder gleitender Durchschnitt) verglichen, etwa MAPE 8,2 % gegenüber 16,2 % bei der Vorjahresmethode.
  - Erwartung: Bei Klassifikationen werden richtige und falsche Vorhersagen in einer Konfusionsmatrix gezählt und Accuracy, Precision und Recall betrachtet.
  - Erwartung: Bei unausgewogenen Klassen täuscht die Accuracy; Precision und Recall werden mit den Kosten der Fehlerarten verknüpft.
  - Erwartung: Die Bewertung erfolgt auf ungesehenen Testdaten und wird vorsichtig formuliert, z. B. Im Testzeitraum erreichte das Modell …
  - Rückfrage: Warum kann die Accuracy bei seltenen Ausfällen täuschen?
- Wie belastbar sind Ihre Ergebnisse (Trennung von Trainings- und Testdaten, Stabilität, Sonderereignisse), und wo liegen die Grenzen Ihrer Aussagen?
  - Erwartung: Trainings- und Testdaten werden getrennt, damit nicht nur das Auswendiglernen (Overfitting) gemessen wird; bei Zeitreihen liegt der Testzeitraum nach dem Trainingszeitraum.
  - Erwartung: Datenlecks werden vermieden: Merkmale dürfen keine Informationen enthalten, die zum Prognosezeitpunkt noch nicht bekannt wären.
  - Erwartung: Die Testmenge muss groß und repräsentativ genug sein; vier Testmonate sind eine sehr dünne Grundlage, belastbarer ist ein längerer Testzeitraum mit saisonalen Besonderheiten.
  - Erwartung: Die Ergebnisse sollten stabil sein und nicht stark von einzelnen Ausreißern oder der Zufallsaufteilung abhängen.
  - Erwartung: Grenzen und Annahmen werden offen benannt, etwa kurzer Zeitraum, Sonderereignisse und die Frage, ob die Ergebnisse außerhalb des beobachteten Zeitraums oder der Kundengruppe gelten.
  - Rückfrage: Was versteht man unter Data Leakage?
- Wie haben Sie vermieden, aus Korrelationen vorschnell Ursachen abzuleiten, und können Sie dafür ein Beispiel aus Ihrem Projekt nennen?
  - Erwartung: Eine hohe Korrelation zeigt einen gemeinsamen Verlauf, aber noch keinen Kausalzusammenhang.
  - Erwartung: Bei der Validitätsprüfung wird ausdrücklich gefragt, ob Zusammenhänge fälschlich als Ursachen gedeutet werden.
  - Erwartung: Aussagen werden vorsichtig formuliert, z. B. Das spricht dafür, dass …, belegt es aber noch nicht für …
  - Erwartung: Annahmen und Grenzen werden offen benannt; Korrelationen als Ursachen darzustellen gilt als typischer Dokumentationsfehler.
  - Rückfrage: Wie formulieren Sie eine Modellaussage vorsichtig statt als sicheres Ergebnis?
- Welche Optimierungsvorschläge haben Sie abgeleitet, wie haben Sie diese priorisiert, und anhand welcher Kennzahlen ließe sich ihr Erfolg im laufenden Betrieb überwachen?
  - Erwartung: Eine gute Empfehlung ist konkret, begründet durch ein Ergebnis, bewertet nach Nutzen, Aufwand und Risiko, umsetzbar (Verantwortliche, fehlende Voraussetzungen) und überprüfbar.
  - Erwartung: Die Priorisierung erfolgt z. B. nach dem Nutzen-Aufwand-Verhältnis.
  - Erwartung: Gute Kennzahlen für das Monitoring sind eindeutig definiert, messbar, einem Ziel zugeordnet und haben einen Verantwortlichen sowie eine Aktualisierungsfrequenz, z. B. Fehlbestände je Monat und Dispositionsaufwand je Woche.
  - Erwartung: Ein Pflegekonzept gehört dazu: Die Prognosegüte wird laufend überwacht, und das Modell wird bei Verschlechterung neu angepasst.
  - Rückfrage: Warum veralten Modelle im laufenden Betrieb?
- Wie haben Sie die Wirtschaftlichkeit Ihres Projekts betrachtet, welche Annahmen stecken in Ihrer Rechnung, und wie stark würde sich das Ergebnis bei ungünstigeren Annahmen ändern?
  - Erwartung: Kosten (einmalig: Personalstunden, Werkzeuge, Infrastruktur; laufend: Betrieb, Pflege, Lizenzen) werden dem Nutzen gegenübergestellt, monetär (z. B. eingesparte Arbeitszeit, vermiedene Fehlbestände) und nicht monetär (z. B. bessere Entscheidungsgrundlage).
  - Erwartung: Stundensätze und Annahmen werden im Betrieb erfragt und offengelegt; es sind kalkulatorische Werte, keine Verkaufspreise.
  - Erwartung: Als Kennzahl dient z. B. die statische Amortisationsdauer: Projektkosten geteilt durch den jährlichen Netto-Nutzen (im Beispiel 2.250 € / 6.045 € pro Jahr, rund 4,5 Monate).
  - Erwartung: Die Sensitivitätsbetrachtung prüft die Robustheit: Spart die Disposition nur 2 statt 3,5 Std. pro Woche, verlängert sich die Amortisation im Beispiel auf rund 9,2 Monate, und das Projekt bleibt wirtschaftlich.
  - Rückfrage: Warum dürfen die laufenden Kosten in der Rechnung nicht fehlen?

### 12.3 Visualisierung, Soll-Ist-Vergleich, Reflexion und Präsentation

- Warum haben Sie sich für diese Diagramme und Darstellungsformen entschieden, und wie haben Sie die Ergebnisse für Entscheider:innen beim Kunden und für Fachleute unterschiedlich aufbereitet?
  - Erwartung: Jede Grafik hat eine klare Botschaft, die als Aussagetitel in der Überschrift steht, z. B. Prognosefehler halbiert sich gegenüber der Vorjahresmethode statt MAPE-Werte; eine Botschaft je Folie.
  - Erwartung: Die Diagrammform folgt der Aussage: Zeitverlauf als Liniendiagramm, Vergleich von Kategorien als Balkendiagramm, Zusammenhang zweier Größen als Streudiagramm, Verteilung als Histogramm oder Boxplot.
  - Erwartung: Die Darstellung ist ehrlich: Balken beginnen bei null, Achsen sind beschriftet und mit Einheiten versehen, der Vergleichswert (Baseline, Ziel) ist sichtbar, die Unsicherheit einer Prognose wird gezeigt, und auf 3D-Effekte wird verzichtet.
  - Erwartung: Die Geschäftsführung braucht Kernaussage, Handlungsempfehlung und Nutzen, die Fachabteilung Details zur Nutzung und die IT Technik und Betrieb.
  - Rückfrage: Welche Diagrammform wählen Sie für einen Zeitverlauf?
- Wo weicht das Ergebnis von Ihrer Planung ab (Ziel, Zeit, Aufwand), und wie erklären Sie diese Abweichungen?
  - Erwartung: Ziel, Zeit und Aufwand werden im Soll-Ist-Vergleich gegenübergestellt, z. B. je Phase Soll in Stunden, Ist in Stunden und Abweichung.
  - Erwartung: Die Abweichungen werden mit Gründen erklärt, z. B. wurde der Puffer für die schwierigere Datenaufbereitung aufgebraucht.
  - Erwartung: Abweichungen sind kein Makel, solange sie erkannt, begründet und sauber dokumentiert werden; im Fachgespräch sind sie eine Gelegenheit, Reflexionsfähigkeit zu zeigen.
  - Erwartung: Aus der Abweichung wird eine Erkenntnis für künftige Projekte abgeleitet, z. B. die Datenqualität im Vorfeld gründlicher zu prüfen und den Aufwand für die Aufbereitung höher anzusetzen.
- Welches Problem hat Sie im Projekt am meisten Zeit gekostet, wie haben Sie es gelöst, und was haben Sie daraus gelernt?
  - Erwartung: Die Antwort folgt der Struktur Problem, Ursache, Handlung, Ergebnis, Erkenntnis.
  - Erwartung: Konkrete Zahlen und Entscheidungen aus der Dokumentation werden genannt, statt allgemein zu dozieren.
  - Erwartung: Probleme und Fehlentscheidungen werden offen angesprochen; sie sind kein Makel, wenn Ursache und Konsequenz erklärt werden.
  - Erwartung: Die Erkenntnis fließt in die Reflexion ein, z. B. dass der Aufwand für die Datenaufbereitung künftig höher angesetzt wird.
  - Rückfrage: Warum kommt es gut an, Schwächen vorab von sich aus zu benennen?
- Was würden Sie heute anders machen, wenn Sie das Projekt noch einmal beginnen könnten?
  - Erwartung: Genannt wird ein konkreter Punkt aus dem eigenen Projekt, z. B. eine Fehleinschätzung, die im Soll-Ist-Vergleich sichtbar wurde.
  - Erwartung: Die Ursache und die daraus abgeleitete Konsequenz (Lessons Learned) werden erklärt, z. B. Datenqualität im Vorfeld gründlicher prüfen und den Aufwand für die Aufbereitung höher ansetzen.
  - Erwartung: Die Antwort bleibt sachlich und ohne Verteidigungshaltung gegenüber Kritik.
  - Erwartung: Die Reflexion ordnet Abweichungen, Probleme und Lernerfahrungen sachlich ein; das ist eine der Bewertungsperspektiven des Fachgesprächs.
- Wie müsste sich Ihre Lösung ändern, wenn die Datenmenge um das Zehnfache wächst oder sich das Kundenverhalten (bzw. der Prozess) deutlich verändert?
  - Erwartung: Modelle veralten, wenn sich das Kundenverhalten oder der Prozess ändert; die Prognosegüte wird deshalb laufend überwacht und das Modell bei Verschlechterung neu angepasst.
  - Erwartung: Die Methode wird erneut daraufhin geprüft, ob sie zur Datenlage (Menge, Qualität, Merkmalstypen), zur Erklärbarkeit und zum Aufwand passt.
  - Erwartung: Ob die Ergebnisse auch außerhalb des beobachteten Zeitraums oder der Kundengruppe gelten, wird als Frage der Validität neu betrachtet, und die Annahmen und Grenzen werden offen benannt.
  - Rückfrage: Woran erkennen Sie im laufenden Betrieb, dass die Prognose schlechter wird?
- Welche Teile des Projekts haben Sie selbst umgesetzt, und welche Unterstützung haben Sie von Kolleg:innen oder dem Kunden erhalten?
  - Erwartung: Es wird klar gesagt, was selbst entwickelt wurde und was Kolleg:innen oder der Kunde beigetragen haben.
  - Erwartung: Die Eigenleistung wird in der Dokumentation klar kenntlich gemacht, und Fremdmaterial (Quellen, Grafiken, Bibliotheken) wird belegt.
  - Erwartung: Der Ausschuss prüft im Fachgespräch, ob der Prüfling das Projekt tatsächlich selbst durchgeführt hat, versteht und begründen kann (Eigenständigkeit).
  - Rückfrage: Welche Bewertungsperspektiven stehen im Fachgespräch üblicherweise im Mittelpunkt?
- Wie haben Sie Ihre Präsentation auf Ihre Zuhörenden zugeschnitten, und welche Inhalte haben Sie dafür bewusst weggelassen?
  - Erwartung: Die Zuhörenden sind fachkundig, kennen aber Projekt, Kunden und Daten nicht; der Kontext wird knapp erklärt, und Abkürzungen aus dem Betrieb werden eingeführt oder vermieden.
  - Erwartung: Gezeigt wird, wie man die Ergebnisse einer Entscheiderin oder einem Entscheider beim Kunden vermitteln würde: Kernaussage und Nutzen, nicht der gesamte Rechenweg.
  - Erwartung: Die Präsentation erzählt eine Geschichte (Ausgangsproblem, Ziel, Vorgehen, Ergebnis, Nutzen, Fazit) und umfasst bei 15 Minuten ungefähr 10 bis 12 Folien.
  - Erwartung: Statt Lebenslauf, Werkzeugliste oder Werkzeugbedienung steht das Problem des Kunden im Mittelpunkt; Details wie Datenwörterbuch oder Kostenrechnung liegen in Backup-Folien für das Fachgespräch.
  - Rückfrage: Wofür dienen Backup-Folien am Ende der Präsentation?
