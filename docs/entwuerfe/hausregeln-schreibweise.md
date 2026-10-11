# Entwurf: Hausregeln für Anrede, Gendern und Zahlenformat im Content

Stand 11.10.2026 · **Vorschläge vom Projektleiter angenommen (Variante A für Berufsbezeichnungen) und am 11.10.2026 eingespielt** (siehe Architekturplanung §13) (Rahmenentscheidung R3). Betrifft den Punkt „Du/Sie-Regel, Gendern und Zahlenformat als Hausregel in `content/README.md` festlegen“ aus Iteration 23 („Systemisch“). `content/README.md` enthält bisher keine Schreibregeln.

## Befund: Der Bestand folgt schon weitgehend einer Regel

Ich habe alle 615 Content-Dateien (ohne Glossare) ausgewertet. Die Zahlen sind Zählungen mit Suchmustern, keine Handprüfung; Fehlertreffer sind möglich.

### Anrede

| Textsorte | Du-Form („Nenne …“, „Ordne …“) | Sie-Form („Nennen Sie …“) |
|---|---|---|
| Karteikarten, Quizfragen, Anweisungen | 2.553 Stellen | **5** (alle im Wirtschaftsfachwirt) |
| Fallaufgaben, Fachgespräch-Fragen | wenige Fehltreffer | 1.182 Stellen |

Die Regel lautet also bereits: **Lernaufgaben duzen, Prüfungsaufgaben (Fallaufgaben, Fachgespräch) siezen**, wie in der schriftlichen Prüfung. Die Theorietexte sprechen nicht an. Die fünf Ausreißer sind Kurzantworten mit Rechenaufgaben des Wirtschaftsfachwirts: Q-2.1-04, Q-2.1-10, Q-2.3-02, Q-2.3-03 und Q-2.4-04 („Berechnen Sie …“).

### Gendern

| Form | Stellen |
|---|---|
| Doppelpunkt („Kolleg:innen“, „Fachinformatiker:innen“) | 807 |
| Paarform („Kolleginnen und Kollegen“, „Kundinnen und Kunden“) | 89 |
| Schrägstrich („Fachinformatiker/in“, „Klient/innen“) | 72 |
| Sternchen, Binnen-I | 0 |

Der Doppelpunkt ist die Hauptform. Der Schrägstrich (72) steckt hauptsächlich in Berufsbezeichnungen („Fachinformatiker/in“ 17 und „/innen“ 5, „Elektroniker/in“ 13 und „/innen“ 7, „Fachwirt/in“ 3, zusammen rund 45) und in rund 27 weiteren Fällen („Klient/innen“, „Kolleg/innen“, „Moderator/in“, „Mediator/in“, „Bewerber/innen“, „Kontrahent/innen“, „Mitarbeiter/in“ …). Bei den Berufsbezeichnungen stehen Doppelpunkt („Fachinformatiker:innen“, „Elektroniker:innen“) und Schrägstrich nebeneinander.

### Zahlenformat

Einheitlich und ohne Befund: Tausenderpunkt und Dezimalkomma („250.000 €“, „0,5“, 581 Euro-Beträge mit Punkt, 2 ohne, beide in der Liste der akzeptierten Antworten), Leerzeichen vor „€“ und „%“ (1.290 Stellen mit Leerzeichen; die 20 ohne Leerzeichen sind fast alle Schreibvarianten in den Listen der akzeptierten Antworten und eine Konsolenausgabe von `ping`). Das ist die gewollte Praxis, nur noch nicht aufgeschrieben.

## Vorschlag: Abschnitt „Schreibweise“ in `content/README.md`

> **Anrede.** Karteikarten, Quizfragen und Anweisungen duzen („Nenne …“, „Ordne …“, „Berechne …“). Fallaufgaben und Fachgespräch-Fragen siezen („Erläutern Sie …“), weil sie den Stil der schriftlichen und mündlichen Prüfung üben. Theorietexte sprechen die Lernenden nicht an.
>
> **Gendern.** Personenbezeichnungen mit Doppelpunkt („Kolleg:innen“, „Ausbilder:innen“); alternativ die Paarform, wenn sie sich besser liest („Kolleginnen und Kollegen“). Keine Schrägstrich-Kurzform, kein Sternchen, kein Binnen-I. Ausnahme: wörtlich zitierte Bezeichnungen aus Verordnungen und Stellenanzeigen („Objektbetreuer:in (m/w/d)“ bleibt, wie sie in der Quelle steht).
>
> **Zahlen.** Tausenderpunkt und Dezimalkomma („250.000 €“, „2,5“), Leerzeichen vor „€“, „%“ und Einheiten („6 %“, „25 kg“), „Prozent“ nur im Fließtext und in Listen akzeptierter Antworten. Listen akzeptierter Antworten nennen die Schreibvarianten ausdrücklich („3.040; 3040; 3.040 €; 3040 €“).

## Anpassungen im Bestand, falls die Regel gilt

| Anpassung | Umfang |
|---|---|
| „Berechnen Sie …“ zu „Berechne …“ in fünf Kurzantworten des Wirtschaftsfachwirts | 5 Items |
| Schrägstrich-Kurzform zu Doppelpunkt („Klient/innen“ zu „Klient:innen“, „Moderator/in“ zu „Moderator:in“ usw.) | rund 27 Stellen in 17 Dateien (Büro, Gesundheit und Soziales, Wirtschaftsfachwirt, Lernpfade) |
| Schrägstrich-Kurzform bei Berufsbezeichnungen („Fachinformatiker/in“, „Elektroniker/in“, „Fachwirt/in“) zu Doppelpunkt | rund 45 Stellen, vor allem in den Fachinformatiker- und AEVO-Kursen |

Reine Textänderungen; ID, Typ und Fortschritt bleiben. Unter den Berufsbezeichnungen sind „Fachinformatiker/in Systemintegration“ und ähnliche amtliche Bezeichnungen. Wer sie als Titel der Ausbildungsordnung unverändert lassen möchte, wählt Variante B.

## Varianten für Berufsbezeichnungen

- **A. Doppelpunkt überall (Empfehlung).** Einheitliches Bild („Fachinformatiker:in Systemintegration“); die Ausbildungsordnung selbst wird nicht zitiert, sondern die Berufsbezeichnung im Fließtext verwendet.
- **B. Berufsbezeichnungen mit Schrägstrich lassen** (wie in den amtlichen Titeln), sonst Doppelpunkt. Dann bleiben rund 45 Stellen mit „/in“; die bestehenden Doppelpunkt-Berufsbezeichnungen („Fachinformatiker:innen“, „Elektroniker:innen“) müssten dagegen zurück auf „/innen“, um einheitlich zu sein.
- **C. Paarformen bevorzugen.** Keine Kurzform; der Bestand müsste an über 800 Stellen angefasst werden. Nicht empfohlen.

## Zu entscheiden

1. Anrede: Regel „Lernaufgaben du, Prüfungsaufgaben Sie“ so festschreiben und die fünf „Berechnen Sie“-Items des Wirtschaftsfachwirts anpassen?
2. Gendern: Doppelpunkt (Paarform erlaubt), und für Berufsbezeichnungen A oder B?
3. Zahlenformat: wie beschrieben festschreiben?
4. Soll ich nach Ihrer Wahl den README-Abschnitt schreiben und die Anpassungen im Bestand durchführen?
