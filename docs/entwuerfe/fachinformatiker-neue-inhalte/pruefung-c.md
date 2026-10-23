# Prüfung P-AY Teil C (Fachinformatiker Anwendungsentwicklung): Ergänzung `ae2/9.1` „CRA-Hersteller-Sicht für Softwareentwickler:innen“, Fall F-AE2-04

Stand 23.10.2026. Geprüft: `fi-9.1-ergaenzung-cra-entwicklung.md` (Z. = Zeile dieser Datei), `fi-faelle-c.md`, `rechtsangaben-c.md`, `ersetzungen-c.json` (`[]`). Maßstab: `auftrag.md`, `fachinformatiker-r4-auswertung.md` („P-AV im Einzelnen“, Teil C), die Prüfungen `pruefung-a.md`, `pruefung-b.md` (CRA; überarbeitet in `fi-6.7-cyber-resilience-act.md` und `fi-faelle-b.md`) und `docs/entwuerfe/technischer-fachwirt-neue-inhalte/pruefung-d.md`. Entwurfsdateien nicht geändert, nichts eingespielt, nichts committet.

## Gesamturteil

**Überarbeiten, dann freigabefähig.** Der Entwurf ist inhaltlich überwiegend sauber und deutlich vorsichtiger als frühere Pakete: Praxis, Folgerung und Auslegung sind meist gekennzeichnet, Stand-Hinweis in allen sechs Rechtsabschnitten, keine Paragrafen in Karten, Quiz und Fall, SBOM-Mindestinhalt, Veröffentlichungsfreiheit, Meldung an die Betreuenden der Komponente und Aufbewahrungsregel stimmen mit dem Rohtext überein, alle Daten und Wochentage stimmen. Es bleiben **zwei Rechtsfehler bzw. Überdehnungen im Lerntext** (Abschlussbericht „ab Kenntnis“; Release-Regel gegen die Altprodukt-Regel), mehrere Fall-Probleme (Ausgangssituation und Rechtsannahmen verraten Prüfpunkte der Teilaufgabe 3; Zeitbezug der Importkern-Pflichten), ein Strukturklon im Quiz und fehlender Zeitbezug in Karten/Quiz.

Befunde: **2 hoch, 11 mittel, 14 niedrig.**

## Methode und Quellen

- **Rohtext selbst gelesen:** Verordnung (EU) 2024/2847, deutsche Amtsblattfassung, von publications.europa.eu per `curl` (CELEX 32024R2847, XHTML; Textabzug im Scratchpad `prf-fi-c-cra.txt`): Artikel 3 Nr. 1, 13, 21, 22, 30, 39 bis 45; Artikel 13 (alle Absätze 1 bis 25), 14 (alle Absätze), 15, 16, 17, 18, 69, 71; Anhang I (Teile I und II), Anhang II, Anhang VII; Erwägungsgründe 22, 34, 39, 40, 41, 66, 68, 76, 77. Nicht gelesen (auch von mir nicht): Leitlinien der Kommission vom 27.07.2026, Verordnung (EWG, Euratom) Nr. 1182/71; die Aussagen darüber bleiben unbelegt.
- **Nachrechnen:** Skript `prf-fi-c-rechnen.cjs` (Scratchpad): alle Wochentage und Fristen aus Theorie, Quiz und Fall **stimmen** (siehe Tabelle unten); Zählung `prf-fi-c-zaehlen.cjs`.
- **Werkzeug:** `node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` mit eigener Config (`prf-fi-c-test/einspielen-config.json`; Kurs `fachinformatiker-anwendungsentwicklung`, Ergänzung vor „### Sicherheit im Entwicklungsprozess verankern“, Fall nach `ae2` ohne Fachgespräch): **ok**, `validate-content` 696 Themendateien, 0 Verstöße, `ae2/9.1` +K 8 +Q 10, nicht geparst 0, ohne Antworten 0; F-AE2-04: 4 Teile, 20 Punkte, 5 Lösungszeilen; neu: Karten 8, Quizblöcke 10, davon Kurzantworten 2. `siebenwort` (n = 7): nur Verweis-, Konventions- und Stand-Formeln (Titel-Verweise auf 6.7/6.6/10.1, „Stand Oktober 2026 …“, Folgefehler-Formel, Frontmatter-Sätze); keine inhaltlichen Läufe zu Teil B, Teil A oder Schwesterkursen im Lerntext. `zahlen`: nur 2.847 (Verordnungsnummer), 9,0 und 9,8 (CVSS-Beispielwerte, kein Konflikt).

### Nachgerechnete Werte

| Stelle | Angabe | Ergebnis |
|---|---|---|
| Theorie Beispiel (1) | Fr 04.02.2028 17:40 + 24 h / + 72 h | Sa 05.02.2028 17:40 / Mo 07.02.2028 17:40: richtig |
| Theorie Beispiel (2) | Mo 07.02.2028 + 7 Tage; Mi 16.02.2028 + 14 Tage | Mo 14.02.2028; Mi 01.03.2028 (Februar 2028 hat 29 Tage): richtig; 7 Jahre → 10 Jahre: richtig |
| Q-9.1-18 | Mi 22.03.2028 11:10 + 72 h | Sa 25.03.2028 11:10: richtig; Zeitumstellung So 26.03.2028 liegt außerhalb des Fristlaufs: richtig |
| Fall TA1 | Mo 15.11.2027 + 7 Kalendertage (Ereignistag zählt nicht) | Mo 22.11.2027: richtig |
| Fall Sachverhalt | 11.12.2027 ist Sa; 17.01.2028 ist Mo; 37 Tage danach | richtig |
| Fall TA4 | Do 20.01.2028 16:45 + 24 h / + 72 h | Fr 21.01.2028 16:45 / So 23.01.2028 16:45: richtig (keine Zeitumstellung, kein bundeseinheitlicher Feiertag) |

Die Zählweise (Stunden lückenlos, Ereignistag zählt nicht mit) ist im Fall festgelegt, im Thema nur als „Zählweise“ (siehe N8).

---

## Befunde HOCH

### H1. Abschlussbericht „ab Kenntnis“: falsche Regel im Lerntext, Widerspruch zu Teil B und zum eigenen Rechenbeispiel
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 41 (mit Z. 55; `rechtsangaben-c.md` Z. 47, Nr. 37)

Z. 41: „Frühwarnung (24 Stunden), Meldung (72 Stunden) und Abschlussbericht laufen ab der **Kenntnis** des Herstellers“. Am Rohtext (Art. 14 Abs. 2 Buchst. c, Abs. 4 Buchst. c) beginnt der Abschlussbericht gerade **nicht** mit der Kenntnis: bei der aktiv ausgenutzten Schwachstelle gilt „spätestens 14 Tage, nachdem eine **Korrektur- oder Risikominderungsmaßnahme** zur Verfügung steht“, beim schwerwiegenden Vorfall „innerhalb eines Monats nach Übermittlung der **Meldung**“. Das widerspricht Teil B (Tabelle in `fi-6.7`, Z. 97), dem eigenen Rechenbeispiel (2) (Z. 55: 14 Tage nach dem Update) und führt Lernende in die Irre. Zusätzlich nennt Z. 55 nur das „Update“ als Fristauslöser; Teil B hat nach `pruefung-b.md` Befund 4 „Korrektur- oder Risikominderungsmaßnahme“ ergänzt.

**Vorschlag:** Z. 41: „Frühwarnung (24 Stunden) und Meldung (72 Stunden) laufen ab der Kenntnis des Herstellers. Der Abschlussbericht ist bei einer aktiv ausgenutzten Schwachstelle spätestens 14 Tage nach Verfügbarkeit einer Korrektur- oder Risikominderungsmaßnahme fällig, bei einem schwerwiegenden Vorfall einen Monat nach der 72-Stunden-Meldung; die Tabelle steht in Thema 6.7.“ Z. 55: „…ein Update oder eine Risikominderungsmaßnahme bereit…“. Rechtsangaben Nr. 37 anpassen (die Spalte „Aussage“ sagt noch „ab Kenntnis des Herstellers“ für alle drei Stufen).

### H2. „Ein Release, der erstmals nach diesem Stichtag ausgeliefert wird, muss die Anforderungen schon bei der Auslieferung erfüllen“: Altprodukt-Regel verfälscht
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 19 (vgl. Z. 45, K-9.1-27, Q-9.1-21; `rechtsangaben-c.md` Z. 24, Nr. 4)

Der Satz steht direkt hinter „Ältere Produkte fallen nur nach einer wesentlichen Änderung darunter“ (Art. 69 Abs. 2). Jedes Release wird irgendwann „erstmals ausgeliefert“; nach dem Wortlaut müsste dann **jedes** Release nach dem 11.12.2027 auch eines vor dem Stichtag in Verkehr gebrachten Produkts die vollen Anforderungen erfüllen. Das ist weder der Wortlaut (Art. 69 Abs. 2: Produkte, die vor dem 11.12.2027 in Verkehr gebracht wurden, unterliegen den Anforderungen nur nach wesentlicher Änderung; Inverkehrbringen ist die erstmalige Bereitstellung **eines Produkts**, Art. 3 Nr. 21) noch von den Erwägungsgründen gedeckt; ob eine neue Hauptversion ein neues Produkt oder eine (wesentliche) Änderung ist, ist Auslegung und von den Leitlinien abhängig (so behandelt es Teil B: „Maßgeblich ist, wann das einzelne Produkt erstmals auf dem Markt bereitgestellt wurde (Auslegung)“). Die Rechtsangaben nennen die Aussage selbst „Folgerung“ mit offener Leitlinienfrage; im Lerntext steht sie als Regel. Das ist genau die Altprodukt-Konstellation, die der Auftrag kritisch prüfen lässt.

**Vorschlag:** „Ein Produkt, das erstmals nach dem 11.12.2027 in Verkehr gebracht wird (zum Beispiel die Version 1.0 einer neuen Standardsoftware), muss die Anforderungen schon bei der Bereitstellung erfüllen; die Prozesse müssen deshalb vorher stehen. Bei einem neuen Release eines früher in Verkehr gebrachten Produkts kommt es darauf an, ob es als wesentliche Änderung oder als neues Produkt gilt (Auslegung; Einzelfälle klären die Leitlinien der Kommission). Sicherheitshalber wird ein Release nach dem Stichtag in der Praxis so vorbereitet, als gälten die Anforderungen (Praxis).“

---

## Befunde MITTEL

### M1. Fall: Ausgangssituation verrät drei von vier Pflichtpunkten der Teilaufgabe 3
`fi-faelle-c.md` Z. 13 (Satz „In der Projektakte fehlen bisher eine Risikobewertung, die Festlegung eines Unterstützungszeitraums und Anleitungen für Kunden“), Z. 21; ferner letzter Satz Z. 13

Teilaufgabe 3 verlangt „mindestens vier Unterlagen, Festlegungen oder Verfahren“. Der Sachverhalt nennt bereits Risikobewertung, Unterstützungszeitraum und Anleitungen (das sind drei der acht Musterlösungspunkte). Der Schlusssatz („…was bis zur Auslieferung vorliegen muss und wie es nach der Auslieferung auf eine bekannt werdende Ausnutzung reagiert“) beschreibt die Teilaufgaben 3 und 4 fast wörtlich. Das verletzt „Ausgangssituation verrät keine Antwort“. Ebenso verrät „die Build-Pipeline erzeugt … Stückliste … mit den direkt eingebundenen Bibliotheken“ zwar Teilaufgabe 2, ist dort aber als Sachverhaltsfakt nötig (kein Mangel).
**Vorschlag:** Den Satz zur Projektakte durch eine neutrale Angabe ersetzen („In der Projektakte liegen bisher die Architekturbeschreibung und Testberichte der Entwicklung vor.“), den Schlusssatz kürzen auf „Die Leitung der Entwicklung bittet Sie um Ihre Einschätzung für das weitere Vorgehen.“ und den Satz „…gesetzliche Pflichten…“ nicht ergänzen.

### M2. Fall: Rechtsannahmen verraten die Begründung der Teilaufgabe 3 und den Zeitpunkt der Geltung in Teilaufgabe 1
`fi-faelle-c.md` Z. 15 („…die Auslieferung am 17.01.2028 ist das **erste Inverkehrbringen** im Rahmen einer Geschäftstätigkeit“), Z. 21, 25 (Raster „Zeitpunkt der Geltung 1 Punkt“), 27 (Raster „Begründung 1 Punkt“)

Die Musterlösung zu Teilaufgabe 3 nennt als Begründung wörtlich „die Auslieferung am 17.01.2028 ist das erste Inverkehrbringen nach dem 11.12.2027“: das steht bereits in den Rechtsannahmen. Dasselbe Wissen wird zudem in Teilaufgabe 1 („Zeitpunkt der Geltung 1 Punkt“) und Teilaufgabe 3 („Begründung 1 Punkt“) zweimal bepunktet.
**Vorschlag:** In den Rechtsannahmen nur „Serviceplan ist ein Produkt mit digitalen Elementen und wird im Rahmen einer Geschäftstätigkeit bereitgestellt; Brevanta ist Herstellerin“ stehen lassen (die Einordnung der Erstauslieferung als Inverkehrbringen ist Prüfpunkt) und die Punkte so trennen, dass Teilaufgabe 1 die Geltung der Anforderungen am Stichtag prüft, Teilaufgabe 3 aber nach dem Zweck der einzelnen Checklistenpunkte fragt (Begründungspunkt in Teilaufgabe 3 streichen und den Punkt auf einen fünften Checklistenpunkt legen, oder die Begründung auf den jeweiligen Punkt beziehen).

### M3. Fall Teilaufgabe 2: Zeitpunkt des Entpack-Fehlers offen, „muss“ gegen noch nicht geltende Pflicht
`fi-faelle-c.md` Z. 13 („Beim Test dieser Version fällt einer Entwicklerin außerdem auf …“), Z. 19 („…was das Team … veranlassen **muss**“), Z. 26

Der Sachverhalt datiert den zweiten Fund nicht; er liegt zeitlich nach dem 15.11.2027, also vermutlich **vor** dem 11.12.2027. Die Pflicht, eine Schwachstelle in einer integrierten Komponente den Betreuenden zu melden (Art. 13 Abs. 6), gilt aber erst ab dem 11.12.2027 und knüpft an das Produkt an; die Musterlösung formuliert sie ohne Zeitbezug als Pflicht („Brevanta meldet sie den Betreuenden“). Teilaufgabe 1 geht dagegen sauber auf den Stichtag ein („Scan-Befund liegt vor diesem Stichtag, die Behebung ist dennoch Voraussetzung“). Außerdem verknüpft die Musterlösung den Entpack-Fehler nicht mit der Vorgabe, nur ohne bekannte ausnutzbare Schwachstellen zu liefern (Anhang I Teil I Nr. 2 Buchst. a): auch er müsste vor der Auslieferung behoben oder entschärft sein.
**Vorschlag:** Sachverhalt datieren („Am Dienstag, 16.11.2027, fällt …“, 16.11.2027 ist ein Dienstag) und Teilaufgabe 2 fragen „…was das Team veranlassen sollte und welche dieser Schritte mit der Auslieferung zur Pflicht werden“. Musterlösung: „Spätestens für die Auslieferung am 17.01.2028 gilt die Pflicht, die Schwachstelle den Betreuenden zu melden, sie zu behandeln und eine eigene Korrektur mitzuteilen; schon jetzt ist es sachgerecht. Eine bekannte ausnutzbare Schwachstelle darf nicht mitgeliefert werden.“

### M4. Doppelung der 72-Stunden-Rechnung: Q-9.1-18 ist Strukturklon von Q-6.7-06 und Q-6.6-04, Teilaufgabe 4 wiederholt Teil B
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 145 bis 149 (Q-9.1-18), 53 (Rechenbeispiel 1); `fi-faelle-c.md` Z. 23, 28; vgl. `fi-6.7-cyber-resilience-act.md` Z. 250 bis 253 (Q-6.7-06), `fi-6.6-nis2-kritis-meldepflichten.md` Z. 236 bis 240 (Q-6.6-04), `fi-faelle-b.md` Z. 19, 26

Im Kurs Anwendungsentwicklung liegen damit drei Kurzantworten gleicher Bauart („Kenntnis am [Wochentag], [Datum], [Uhrzeit]; 72 Stunden ohne Pause; Datum im Format TT.MM.JJJJ“) und zwei Rechenaufgaben zu Frühwarnung/Meldung/Empfänger/Nutzerinformation (F-FU6-06 Teilaufgabe 2, F-AE2-04 Teilaufgabe 4) nebeneinander. Lernzuwachs der Ergänzung ist die Entwicklungssicht, nicht die dritte Stundenrechnung. Teilaufgabe 4 bleibt tragfähig, wenn der Entwurfsanteil (Bestandteile des Meldeprozesses) im Vordergrund steht; die Zeitrechnung ist bereits dreifach vorhanden (Theorie Beispiel 1, Q-18, Fall).
**Vorschlag:** Q-9.1-18 durch eine andere Datumsaufgabe ersetzen, die in Teil B nicht vorkommt und im Thema (Beispiel 2) ergänzt wird: schwerwiegender Vorfall, Meldung übermittelt am Freitag, 28.01.2028, Abschlussbericht „einen Monat nach Übermittlung der Meldung“ → Montag, 28.02.2028 (nachgerechnet; Februar 2028 hat 29 Tage, 28.02. ist ein Montag), Akzeptierte Antworten `28.02.2028; 28.02.2028.; 28.2.2028; 28.02.28; 28. Februar 2028; Montag, 28.02.2028` usw.; Rechenbeispiel (2) um die Vorfall-Variante ergänzen. Alternativ Rechenbeispiel (1) streichen (Länge, siehe M11).

### M5. Q-9.1-13 ist Beinahe-Klon des Bestands-Q-9.1-12, ohne Zeitbezug und mit Spannung zum Lerntext
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 101 bis 108; Bestand `content/fachinformatiker-anwendungsentwicklung/ae2/9.1-sicherheit-in-der-softwareentwicklung.md` Q-9.1-12 (Z. 265 bis 273)

Bestand Q-12: „Ein Scan meldet eine kritische Schwachstelle in einer eingebundenen Bibliothek …; ein Update ist verfügbar. Was ist das sinnvollste Vorgehen?“; neu Q-13: „Der Scanner meldet … eine kritische Schwachstelle in einer Bibliothek. Ein Update existiert, Hinweise auf Angriffe gibt es nicht.“ Gleiche Ausgangslage, gleiches Format, direkt hintereinander im Quiz. Außerdem (a) fehlt der Zeitbezug: „vor der Auslieferung behoben“ ist Rechtspflicht nur für Produkte, die ab dem 11.12.2027 in Verkehr kommen (Teil B Befund 5 verlangte dasselbe bei Q-6.7-09); (b) die Frage sagt „kritisch“ (Schweregrad), das Thema (Z. 25) lehrt aber, dass ein Scanbefund **zuerst auf Ausnutzbarkeit zu bewerten** ist; der Schlüssel „wird bewertet und vor der Auslieferung behoben“ ist daher nur mit der Zusatzannahme „ausnutzbar“ rechtlich zwingend.
**Vorschlag:** Szenario ändern (zum Beispiel ein Hinweis auf Ausnutzung eines Produkts, das bereits beim Kunden läuft, gegen einen bloßen Scanbefund) oder ausdrücklich: „Eine neue Software wird erstmals im Jahr 2028 ausgeliefert. Der Scanner meldet in einer Bibliothek eine Schwachstelle, die sich über die Anwendung ausnutzen lässt; es gibt keine Hinweise auf Angriffe …“ und die Optionen entsprechend. Option 1 („sofort bei der EU-Meldeplattform“) bleibt als Distraktor.

### M6. Sorgfaltspflicht bei Drittkomponenten: Praxis ungekennzeichnet, Erwägungsgrund 34 nicht genutzt, Einschränkung „Kernfunktionen“ fehlt, Q-9.1-17 stützt sich auf Folgerung
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 31 (mit Z. 138, 140 Q-9.1-17; K-9.1-23 Z. 75 bis 77); `rechtsangaben-c.md` Z. 32, 33 (Nr. 22, 23)

- Z. 31 „Auswahlaspekte sind Pflegezustand, Reaktion der Betreuenden auf Meldungen, Herkunft und Unterstützungszeitraum der Komponente, den das Gesetz bei der Festlegung des eigenen Zeitraums nennt“: Die Aufzählung steht als Sachaussage, ist aber Praxis (die Rechtsangaben Nr. 22 behaupten fälschlich, im Lerntext stehe „nützliche Auswahlaspekte“; der Wortlaut ist ein anderer). Das Gesetz nennt in Art. 13 Abs. 8 Unterabsatz 2 den Unterstützungszeitraum nur für „integrierte Komponenten, **die Kernfunktionen erbringen** und von Dritten bezogen werden“ und nur als „können berücksichtigen“. Der Relativsatz „den das Gesetz … nennt“ ist grammatisch unklar.
- Die gesetzesnahe Quelle fehlt: Erwägungsgrund 34 nennt als Maßnahmen der Sorgfalt ausdrücklich (a) Prüfung, ob der Hersteller der Komponente die Konformität nachgewiesen hat (CE-Kennzeichnung), (b) ob regelmäßig Sicherheitsaktualisierungen erfolgen (bisherige Aktualisierungen), (c) Abgleich mit der europäischen und anderen öffentlichen Schwachstellendatenbanken, (d) zusätzliche Sicherheitsprüfungen, und sagt, dass der angemessene Umfang sich nach Art und Ausmaß des Risikos der Komponente richtet. Das ist die belastbare Antwort auf „Sorgfalt“ und zugleich die Verhältnismäßigkeitseinschränkung, die im Entwurf fehlt.
- „Die Auswahl wird nachvollziehbar dokumentiert (Stützangabe Art. 13 Abs. 7)“: Abs. 7 verlangt die systematische Dokumentation aller relevanten Cybersicherheitsaspekte, Schwachstellen und Drittinformationen; die Anwendung auf die „Auswahl“ ist Folgerung (Rechtsangaben Nr. 23 sagt das selbst), im Lerntext aber nicht gekennzeichnet. Q-9.1-17 macht aus dieser Folgerung eine als **richtig** gewertete Option („Die Auswahl und der Umgang mit Komponenten werden nachvollziehbar dokumentiert“).
**Vorschlag:** Z. 31 umschreiben: „Als Maßnahmen der Sorgfalt nennen die Erwägungsgründe unter anderem den Nachweis der Konformität der Komponente (zum Beispiel CE-Kennzeichnung), regelmäßige Sicherheitsaktualisierungen der Komponente, den Abgleich mit Schwachstellendatenbanken und zusätzliche Sicherheitsprüfungen; der Umfang richtet sich nach dem Risiko der Komponente (Stützangabe Erwägungsgrund 34). Praxis sind darüber hinaus Pflegezustand, Reaktion der Betreuenden und Herkunft als Auswahlkriterien. Bei der Festlegung des eigenen Unterstützungszeitraums kann der Hersteller die Zeiträume zugekaufter Komponenten mit Kernfunktionen berücksichtigen (Art. 13 Abs. 8).“ Dokumentationssatz mit „(Folgerung aus Art. 13 Abs. 7)“ kennzeichnen. Q-9.1-17: Option 2 ändern in „Der Hersteller dokumentiert die Cybersicherheitsaspekte seines Produkts, auch Schwachstellen in Komponenten, systematisch.“ (Wortlaut Abs. 7).

### M7. Kenntnis: Inhalt der Leitlinien der Kommission behauptet, der nicht gelesen wurde
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 41 („Nach den unverbindlichen Leitlinien der Kommission kommt es auf eine zügige Erstbewertung an, ein unbestätigter Hinweis löst die Frist nicht aus (Auslegung)“); `rechtsangaben-c.md` Z. 49 (Nr. 39: „**vermutet**“, nur Sekundärquellen)

Der Auftrag verlangt: keine „vermutet“-Aussagen im Lerntext. Der Satz gibt den Inhalt eines Dokuments wieder, das weder der Autor noch ich gelesen haben (Abruf der Kommissionsseite scheiterte). Teil B löst es richtig: „Weil die Definition der aktiv ausgenutzten Schwachstelle ‚verlässliche Nachweise‘ verlangt, beginnt die Pflicht nicht schon bei einem bloßen Verdacht; Einzelheiten ergeben sich aus den Leitlinien der Kommission, die unverbindlich sind.“
**Vorschlag:** Genauso formulieren (Begründung aus Art. 3 Nr. 42, kein Inhalt der Leitlinien behaupten); die Rechtsangaben Nr. 39 danach auf „Auslegung aus dem Wortlaut; Leitlinien nicht gelesen“ ändern.

### M8. Schwerwiegender Sicherheitsvorfall: Definition fehlt im Lerntext, Q-9.1-20 Option 4 ohne Deckung
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 39, 158 bis 165; `rechtsangaben-c.md` Z. 45 (Nr. 35)

Z. 39 nennt nur das Beispiel der Erwägungsgründe (Schadcode im Freigabekanal). Die gesetzliche Definition (Art. 14 Abs. 5: negative Auswirkung oder mögliche Auswirkung auf den Schutz sensibler oder wichtiger Daten oder Funktionen **oder** Einführung/Ausführung böswilligen Codes im Produkt oder im Netz eines Nutzers) und die Abgrenzung des Sicherheitsvorfalls mit Auswirkung auf die Produktsicherheit stehen im Entwurf nicht (Teil C verweist für Meldungen auf 6.7). Q-9.1-20 Option 4 („Ein Angriff auf das Produkt führt dazu, dass Schadcode im Netz einer Kund:in ausgeführt wird“) beruht aber genau auf dieser Definition (Buchst. b) und hat im Lerntext von Teil C keine Deckung; sie ist nur über Thema 6.7 (Z. 89) ableitbar. „Einer Kund:in“ ist zudem sprachlich unglücklich.
**Vorschlag:** Einen Satz in Z. 39: „Schwerwiegend ist ein solcher Vorfall unter anderem, wenn er zur Ausführung böswilligen Codes im Produkt oder im Netz einer Nutzerin oder eines Nutzers führen kann oder die Fähigkeit des Produkts beeinträchtigt, sensible Daten oder Funktionen zu schützen (Stützangabe Art. 14 Abs. 5); die Einzelheiten stehen in Thema 6.7.“ (rund 40 Wörter, an anderer Stelle kürzen) und Option 4: „…Schadcode im Netz einer Kundin oder eines Kunden ausgeführt wird.“

### M9. Releases: Art. 13 Abs. 14 und Erwägungsgrund 39 überdehnt und verkürzt; Abs. 9 und 10 fehlen
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 45 (mit K-9.1-27 Z. 94 bis 97, Q-9.1-21 Z. 167 bis 174), Z. 47; `rechtsangaben-c.md` Z. 59, 66 (Nr. 49, 56)

- „Verfahren müssen zudem sicherstellen, dass die Konformität bei jedem weiteren Release erhalten bleibt (Stützangabe Art. 13 Abs. 14)“: Der Wortlaut sagt „bei einer **Serienherstellung**“ und nennt Änderungen am Entwicklungsverfahren, an Konzeption oder Merkmalen. „Release“ ist Übertragung (Rechtsangaben Nr. 49: „Anwendung auf Releases ist Folgerung“); im Lerntext steht sie als Rechtspflicht, die Kennzeichnung „Folgerung“ folgt erst beim Umsetzungshinweis.
- Erwägungsgrund 39 nennt für die wesentliche Änderung Kriterien, die der Entwurf verkürzt und teils verengt: Änderung der Zweckbestimmung, die vom Hersteller **in der ursprünglichen Risikobewertung nicht vorhergesehen** war, **oder** geänderte Art der Gefahr **oder** erhöhtes Risiko (alternativ, nicht kumulativ); „eine Funktionsaktualisierung, die Art oder Leistung verändert **und** das Risiko erhöht“ (Z. 45) verengt das. Der Hinweis „nicht vorhergesehen in der Risikobewertung“ ist für Entwicklungsteams die wichtigste Einsicht (geplante Funktionen gehören in die Risikobewertung). Die Erwägungsgründe sagen zudem, dass die Sicherheitsaktualisierung ohne Zweckänderung **nicht** als wesentlich gilt, „in der Regel“ bezieht sich auf die Fälle geringfügiger Quellcodeänderungen; der Entwurf legt das Hedging auf die Hauptaussage.
- Fehlende Pflichten/Ausnahmen mit Releasebezug: Jede bereitgestellte Sicherheitsaktualisierung bleibt mindestens zehn Jahre oder für die verbleibende Dauer des Unterstützungszeitraums verfügbar (Art. 13 Abs. 9); der Hersteller darf bei nacheinander wesentlich geänderten Softwareversionen die Sicherheitsupdates auf die zuletzt in Verkehr gebrachte Version beschränken, wenn deren Nutzer:innen kostenlosen Zugang und keine zusätzlichen Anpassungskosten haben (Art. 13 Abs. 10, Erwägungsgrund 40; Rechtsangaben Nr. 56: „im Lerntext nicht enthalten“). Gerade für „Releases, Versionen“ fehlt damit die Aussage, welche Versionen gepatcht werden müssen; Lernende könnten „alle alten Versionen“ folgern.
- K-9.1-27 und Q-9.1-21 verwenden als Beispiel „eine neue Schnittstelle“; Beispiel der Erwägungsgründe ist ein neues Eingabeelement mit Eingabevalidierung. „Neue Schnittstelle“ ist plausible Übertragung, aber Auslegung; Q-21 fragt „am ehesten“, das hedgt.
**Vorschlag:** Z. 45 umformulieren: „Art. 13 Abs. 14 verlangt Verfahren, die die Konformität bei der Serienherstellung sichern und Änderungen am Entwicklungsverfahren oder an den Merkmalen berücksichtigen; auf Software übertragen heißt das (Folgerung): Pipeline-Gates und Release-Checkliste.“ Kriterien nach Erwägungsgrund 39 alternativ nennen (Zweckänderung, die in der Risikobewertung nicht vorhergesehen war; geänderte Art der Gefahr; höheres Risiko). In Z. 47 (rund 50 Wörter) Abs. 9 und 10 als zwei kurze Sätze ergänzen („Jede Sicherheitsaktualisierung bleibt …; bei nacheinander wesentlich geänderten Versionen kann der Hersteller Sicherheitsupdates unter den genannten Bedingungen auf die zuletzt in Verkehr gebrachte Version beschränken“).

### M10. Zeitbezug in Karten und Quiz fehlt (Lehre aus Teil B Befund 5)
K-9.1-23, -24, -27 (Z. 74 bis 82, 94 bis 97), Q-9.1-17, -19, -21 (Z. 135 bis 143, 151 bis 156, 167 bis 174), Q-9.1-13 (siehe M5)

Die Fragen formulieren Herstellerpflichten (Meldung an die Betreuenden, Sorgfalt, Aufbewahrung, Anforderungen bei der Auslieferung) ohne Hinweis, dass sie ab dem 11.12.2027 (bzw. für Produkte, die danach in Verkehr kommen) gelten. Teil B hat denselben Mangel in Q-6.7-09 als mittel eingestuft und beseitigt. Für ein Thema, dessen Pflichten teils erst in 14 Monaten greifen, ist das in Karten/Quiz nicht trivial (Lernende könnten „Meldung an die Betreuenden“ als heute geltende Pflicht merken).
**Vorschlag:** In Q-17/-19/-21 und K-23/-24/-27 je einen Halbsatz „ab Geltung der Produktpflichten (11.12.2027)“ oder „für ein Produkt, das nach dem 11.12.2027 in Verkehr kommt“ ergänzen (Länge der Antworten bleibt unter 300 Zeichen).

### M11. Theorielänge über dem Rahmen und inhaltliche Wiederholung von Thema 6.7
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 13 bis 55; Z. 25, 37, 47 gegen `fi-6.7-cyber-resilience-act.md` Z. 49 bis 57, 61 bis 69, 73 bis 77, 81

Zählung (`prf-fi-c-zaehlen.cjs`, ab „## A.“ bis vor „## B.“, einschließlich Überschriften): **1.745 Wörter** (ohne Rechenbeispiele 1.598). Rahmen laut Auftrag „höchstens rund 1.600 Wörter“; mit den Zusätzen aus H1, H2, M6, M8, M9 kämen etwa 200 Wörter hinzu. Zudem wiederholt der Entwurf trotz des erklärten Ausschlusses („nicht wiederholt werden … Zeitplan im Einzelnen“) Teile von Teil B: die Zeitplan-Stufen (Z. 19), die Aufzählung der Produktanforderungen aus Anhang I Teil I (Z. 25; Teil B Z. 51 bis 55) mit nur dem Mehrwert der Zuordnung zu den Entwurfsprinzipien, die Schwachstellenverfahrens-Pflichten (Z. 37; Teil B Z. 63 bis 67), die Definition wesentliche Änderung (Z. 45; Teil B Z. 41), die Aufbewahrung (Z. 47; Teil B Z. 75). `siebenwort` findet keine wörtlichen Läufe, die Dopplung ist inhaltlich.
**Vorschlag:** Kürzen, bevor ergänzt wird: Z. 19 auf das für Entwicklungsteams Wesentliche (zwei Sätze plus H2-Neufassung), Z. 25 die Aufzählung auf die Zuordnung zu den Entwurfsprinzipien beschränken und den Verweis auf 6.7 für die Anforderungsliste setzen (rund 80 Wörter), Z. 37 die Wiederholung der Anhang-I-Punkte (getrennte Updates, kostenlos, sichere Verteilung) zusammenfassen (rund 60 Wörter); Rechenbeispiel (1) wegfallen lassen, wenn Q-18 das Fristthema trägt (M4).

---

## Befunde NIEDRIG

### N1. Teilaufgabe 3: Begründungspunkt dupliziert Teilaufgabe 1, Hinweise zu Begrenzungen
`fi-faelle-c.md` Z. 21, 25, 27 — siehe M2. Zusätzlich: Die Musterlösung nennt acht Punkte (vier genügen), aber nicht, dass Konformitätsbewertung und CE-Zeichen auch bei Software nicht entfallen; fachlich in Ordnung, weil als Beispiel genannt.

### N2. Folgefehler-Zeile: Teilaufgabe 1 sinnlos, Teilaufgaben 2 und 3 nicht abgedeckt, wörtliche Formelnähe
`fi-faelle-c.md` Z. 29; Bestand `content/fachwirt-buero-projektorganisation/hb2/fallaufgaben.md` (17-Wort-Lauf laut `siebenwort`)

„In Teilaufgabe 1 wird das Datum der internen Frist am eigenen Feststellungstag bewertet“: Der Feststellungstag ist im Sachverhalt vorgegeben, ein „eigener“ Feststellungstag kann nicht entstehen; die Formel ist aus den Fallaufgaben des Büro-Kurses (`hb2`) übernommen und läuft dort sinnvoll, hier nicht. In Teilaufgabe 4 steht dasselbe („selbst gewählter Kenntniszeitpunkt“, obwohl die Kenntnis vorgegeben ist). Echte Folgefehler wären: Teilaufgabe 2 hängt von der Bewertung in Teilaufgabe 1 ab (wer die Meldepflicht in 1 bejaht, wird in 2/3 folgerichtig bewertet), Teilaufgabe 3 von der Stückliste. **Vorschlag:** Folgefehler-Zeile neu formulieren; Formel nicht aus dem Büro-Fall übernehmen.

### N3. Gendern
`fi-faelle-c.md` Z. 13, 15, 23, 28 (siebenmal „Kunden“); `fi-9.1-…` Z. 25, 39 („Angreifer“)

Hausregel: Doppelpunkt oder Paarform. **Vorschlag:** „Kund:innen“ bzw. „Kundschaft“ (Fall), „Angreifende“ bzw. „Angreifer:innen“ (Theorie). Der Bestand hat in `ae2/9.1` selbst „Angreifer“; Gleichziehen wäre ein Auftraggeber-Schritt, im neuen Text sollte es aber richtig sein.

### N4. Kurzverweise ohne Titel und Fachgebiet
`fi-9.1-ergaenzung-cra-entwicklung.md` Z. 41 („Datenpanne (Thema 6.2) und Pflichten als Einrichtung (Thema 6.6)“), Z. 45 („Einzelheiten in Thema 6.7“), Z. 41/45 weitere Kurzverweise

Der Lerntext nennt Thema 6.2 nirgends mit Titel („Datenschutz: Grundlagen, Pflichten und Kundenberatung“) und Fachgebiet; die erste Nennung steht nur im Kopfstück (Z. 5), das nicht eingespielt wird. 6.6 und 6.7 sind in Z. 17 mit Titel genannt; spätere Kurzformen sind zulässig, 6.2 braucht beim ersten Vorkommen im Lerntext (Z. 41) Titel und „im selben Fachgebiet“. Titel 6.6, 6.7 und 10.1 stimmen mit den `thema_title`-Werten überein.

### N5. Akzeptierte Antworten unvollständig
`fi-9.1-…` Z. 147 (Q-9.1-18), 178 (Q-9.1-22)

Q-18: Teil B nimmt „Montag, 25.01.2027; Mo 25.01.2027“ auf, hier fehlen „Samstag, 25.03.2028“, „Sa 25.03.2028“, „Sa, 25.03.2028“, „25.03.2028 11:10“; Q-22: fehlen „mindestens 10“, „mindestens zehn Jahre“, „10 Jahre lang“, „10 Jahren“. Betrifft ebenso die Ersatzfrage aus M4.

### N6. Q-9.1-14: „Lieferkettenbeziehungen“ nicht im Lerntext
`fi-9.1-…` Z. 113 (Software-Stückliste ↔ „…ihre Lieferkettenbeziehungen“)

Der Begriff stammt aus der Definition (Art. 3 Nr. 39), steht aber weder in Z. 29 noch in einer Karte. **Vorschlag:** In Z. 29 einen Halbsatz „(Komponenten und ihre Lieferkettenbeziehungen)“ ergänzen oder die Paarung umformulieren („Verzeichnet die in der Software enthaltenen Komponenten“).

### N7. Quizqualität im Einzelnen
- Q-9.1-19 (Z. 151 bis 156): richtige Option 43 Zeichen, falsche 85 Zeichen; die falsche ist die lange, „zynische“ Option, ein Muster, das Lernende lernen. Länge angleichen („Betreuende der Bibliothek informieren und die Lücke im eigenen Produkt beheben“ / „Nichts unternehmen, weil quelloffener Code nicht zum Produkt zählt“). „Zuerst“ passt nicht zu zwei Pflichten in einer Option (informieren **und** behandeln).
- Q-9.1-19, K-9.1-24 und Q-9.1-17 prüfen dieselbe Einzelaussage (Meldung an die Betreuenden); mit K-9.1-23 und Q-9.1-17 vier bis fünf Items zu einer Rechtsaussage bei insgesamt 18 Items. Q-19 als Wahr/Falsch zu einer anderen Aussage (zum Beispiel Behörde nicht zuständig) oder streichen.
- Q-9.1-16 (Z. 126 bis 133): Schritt 2 („ausnutzbar oder schon aktiv ausgenutzt“) deutet an, dass bei aktiver Ausnutzung Meldung und Nutzerinformation **vor** dem Update einzuschieben wären; der Sortierfall gilt also nur für den Nicht-Ausnutzungsfall. **Vorschlag:** Frage ergänzen „…bei einer Schwachstelle, für die keine Ausnutzung bekannt ist“. Reihenfolge ist sonst zwingend (Eingang, Bewertung, Behebung, Information).
- Q-9.1-15 (Wahr/Falsch zur Veröffentlichungspflicht) ist leicht, aber sachlich einwandfrei.

### N8. Zählweise im Thema nicht als Festlegung gekennzeichnet; Verschiebungsregel fehlt
`fi-9.1-…` Z. 51; `rechtsangaben-c.md` Z. 48 (Nr. 38)

Teil B legt im Thema fest, dass die Verordnung die Zählung nicht ausdrücklich regelt, und dass Verschiebungen des Fristendes bleiben außer Betracht (`pruefung-b.md` Befund 7). Z. 51 sagt nur „Zählweise: …“; in C endet nach der Festlegung keine Tagesfrist auf einem Wochenende (14.02.2028 Mo, 01.03.2028 Mi), aber die Meldung in TA4 (So 23.01.2028) und Beispiel (1) (Sa/Mo) enden am Wochenende; für Stundenfristen ist das mit der Regel der Fristenverordnung vereinbar, nicht aber automatisch für Tagesfristen. Außerdem laufen Rechenbeispiele (1) und (2) über dieselben Daten (Mo 07.02.2028 ist Meldefrist im ersten und Scandatum im zweiten Beispiel), was wie eine Geschichte liest. **Vorschlag:** In Z. 51: „(Festlegung dieser Beispiele; die Verordnung regelt die Zählung nicht ausdrücklich; Verschiebungen des Fristendes wegen Wochenenden oder Feiertagen bleiben außer Betracht)“, und Beispiel (2) auf andere Daten legen.

### N9. SBOM: zweiter Anforderungsweg und Sachverhaltslücke „gängig“
`fi-9.1-…` Z. 29; `fi-faelle-c.md` Z. 13, 26

Z. 29: „kann die Marktüberwachung sie begründet anfordern“; Art. 13 Abs. 25 gibt den Marktüberwachungsbehörden zusätzlich die Möglichkeit, bei Produktkategorien einer ADCO-Abhängigkeitsbewertung die Stücklisten anzufordern (anonymisiert aggregiert weitergegeben). Randwissen, ein Halbsatz genügt („oder im Rahmen einer unionsweiten Abhängigkeitsbewertung“). Fall: Musterlösung TA2 bejaht „gängiges maschinenlesbares Format“; der Sachverhalt sagt nur „maschinenlesbaren Format“. **Vorschlag:** Im Sachverhalt „in einem gängigen, maschinenlesbaren Format“.

### N10. Rechtsangaben-Datei: Abweichungen zum Lerntext
`rechtsangaben-c.md` Z. 32 (Nr. 22: „im Lerntext nicht als Rechtsregel gekennzeichnet („nützliche Auswahlaspekte“)“ stimmt nicht mit Z. 31 des Entwurfs überein, siehe M6), Z. 47 (Nr. 37: Abschlussbericht „ab Kenntnis“, siehe H1), Z. 49 (Nr. 39, siehe M7), Z. 59 (Nr. 49, siehe M9), Z. 90 („Daten und Namen kollidieren nicht mit den Teilen A, B, E bis I (geprüft per Suche)“: in anderen Kursen kommen 17.01.2028 (`content/immobilienfachwirt/hb6/fallaufgaben.md`) und die Uhrzeit 16:45 mit Datum-Rechnung (`content/fachwirt-gesundheit-soziales/hb2/2.6-hygiene-infektionsschutz.md`, Q-2.6-05) vor; im Kurs Anwendungsentwicklung keine Kollision, unschädlich). **Zeilenzahl** der Tabelle: 63 (Nr. 1 bis 63) plus Abschnitte „Reformen“ und „Bestandsstellen“. Die Spalte „Sicherheit“ nennt „vermutet“ korrekt nur für Leitlinien und Plattformdetails. Zeile Nr. 14 (Z. 24 der Datei) sollte H2 widerspiegeln.

### N11. Hersteller-Einordnung und Brevanta-Annahme
`fi-9.1-…` Z. 17; `brevanta-register.md` Z. 9

Das Register beschreibt den Bereich als „Softwareentwicklung **für Kunden**“; die Annahme „eigene Standardsoftware“ ist eine Erweiterung (im Fall als Annahme gekennzeichnet, im Thema als „Annahme dieses Themas“: besser „Annahme dieser Ergänzung“). Die Aussage „bei einer Kundenanwendung im Auftrag bleibt die Einordnung eine Einzelfallfrage“ ist hedged, aber das Gesetz erwähnt maßgeschneiderte Produkte ausdrücklich (Anhang I Teil I Nr. 2 Buchst. b, Teil II Nr. 8), setzt also voraus, dass auch Auftragsarbeiten Produkte sein können; ein Halbsatz „das Gesetz sieht für maßgeschneiderte Produkte vertragliche Abweichungen vor“ vermeidet den falschen Eindruck, Auftragsentwicklung sei meist ausgenommen.

### N12. Zeitplan-Satz und Kapitel IV
`fi-9.1-…` Z. 19

„Alles andere … wird ab dem 11.12.2027 verbindlich“ lässt Kapitel IV (Notifizierung der Konformitätsbewertungsstellen, seit 11.06.2026) außer Acht (Art. 71 Abs. 2); für Entwicklungsteams unerheblich, in Z. 19 genügt „Alle übrigen Pflichten für Hersteller“.

### N13. Teilaufgabe 1: „mit dieser Bibliotheksversion“ doppeldeutig
`fi-faelle-c.md` Z. 17

Gemeint ist die vom Scanner beanstandete Version; im Sachverhalt gibt es aber auch die korrigierte Version der Betreuenden. **Vorschlag:** „mit der beanstandeten Bibliotheksversion“.

### N14. Karten: Praxis nicht gekennzeichnet
K-9.1-26 (Z. 89 bis 92: „Was gehört in einen Meldeprozess …“ ist Praxis) und K-9.1-20 („Womit beginnt …“ ist Folgerung). Die Antworten klingen wie gesetzliche Vorgaben. **Vorschlag:** „Was empfiehlt sich in einem Meldeprozess …“ bzw. „Was sollte in einem Meldeprozess …“ (K-26); „(Praxis)“ nicht nötig in Karten, aber Verb „empfiehlt sich“.

---

## Prüfung der geforderten Punkte (Kurzergebnis)

1. **Fakten und Rechtsaussagen am Rohtext:** Art. 13 Abs. 2 bis 4, 5, 6, 7, 8 (Unterstützungszeitraum), 13, 17, 22, 24; Art. 14 Abs. 1 bis 8; Art. 15; Anhang I Teil I Nr. 2 und Teil II Nr. 1 bis 8; Anhang II Nr. 9; Anhang VII Nr. 2 bis 8; Art. 3 Nr. 21, 22, 30, 39 bis 44; Art. 69 Abs. 2, 3; Art. 71 Abs. 2: **bestätigt**, soweit nicht in H1, H2, M6 bis M9 beanstandet. Keine erfundene Rechtsregel; SBOM-Mindestinhalt (oberste Abhängigkeiten, keine Veröffentlichungspflicht), Meldung an die Betreuenden (Art. 13 Abs. 6), koordinierte Offenlegung (Anhang I Teil II Nr. 5, 6; Art. 13 Abs. 17), Aufbewahrung (zehn Jahre oder Unterstützungszeitraum, je nachdem, was länger ist) sind richtig wiedergegeben. Fehlende Ausnahmen: Art. 13 Abs. 9, 10 (M9); Open-Source-Ausnahme (Geschäftstätigkeit) in 6.7, hier nur der Sorgfaltsteil, zulässig. Meldepflichten 24/72 Stunden: richtig; Abschlussbericht: Fehler H1.
2. **Fristen:** alle richtig (Tabelle oben); Zählweise im Fall festgelegt (ausreichend), im Thema schwächer (N8).
3. **Quiz/Karten:** genau eine richtige Antwort je Frage; richtige Antwort nirgends die längste; keine Paragrafen und Verordnungsnummern in Karten, Quiz, Fall; Antworten höchstens 240 Zeichen; Akzeptierte Antworten vorhanden (Lücken N5); Deckung im Lerntext mit Ausnahmen M8, M6, N6. Kein Lückentext in dieser Ergänzung (kein Fehler). Probleme: M4, M5, M10, N7.
4. **Fall F-AE2-04:** Ausgangssituation 239 Wörter (Grenze 250), Produkt „Serviceplan“ ohne Namenskollision (Suche in `content`, `docs/entwuerfe`), 4 × 5 Punkte, Raster 20 und Folgefehler-Zeile vorhanden; Musterlösung nutzt überwiegend Fakten aus dem Sachverhalt, die Rechtsfakten stammen aus dem Gesetz; Mängel M1, M2, M3, N1, N2. Kein Klon zu F-FU6-06 in Struktur und Thema (nur die Stunden- und Meldewegfragen überschneiden sich, M4) und zu F-AE2-01 bis -03 (F-AE2-03 Befund D behandelt dieselbe Bibliotheks-CVE technisch, nicht rechtlich).
   **Tragfähigkeit der Fälle nach dem 11.12.2027:** Die Fall- und Quizdaten liegen bewusst im Zeitraum, in dem die Anforderungen gelten (Nov. 2027 bis März 2028); der Fall nennt „Rechtslage unverändert“. Tragfähig, solange 11.12.2027 und das Meldeplattform-Verfahren unverändert bleiben (Vorschläge zur Bündelung der Meldewege stehen nach Teil B nur als Vorschlag; Stand nicht geprüft). **Wiedervorlage** nach Beschluss möglicher Änderungsverordnungen und vor dem 11.12.2027: Die Aufgabe mit dem Datum 17.01.2028 wird dann Vergangenheit, bleibt aber lösbar, weil alles im Sachverhalt steht; „Stand Oktober 2026“ im Absatz der Rechtsannahmen sollte bei der Revision durch den dann aktuellen Stand ersetzt werden. Rechtsangaben Z. 77 führt die Wiedervorlage bereits auf.
5. **Doppelungen:** `ae2/9.1` Bestand (SBOM Z. 75, Meldeweg Z. 79) widerspruchsfrei, Ergänzung konkretisiert nur; `ae2/9.3`, `ae3/10.1` (Lock-Datei, transitive Abhängigkeiten) nur Verweis; `fu6/6.2` nur Abgrenzung; Teil B/Teil A wörtlich unauffällig (`siebenwort`), inhaltliche Doppelung M11, Strukturklon M4. Kein Teil-A-Klon (F-FU6-05 betrifft NIS2).
6. **`pruefe-paket.cjs test`:** ok (siehe Methode). `ersetzungen-c.json = []`: Ich habe keinen widersprechenden einzeiligen Bestandstext gefunden (`ae2/9.1` Z. 75 und 79, K-9.1-17/-18, Q-9.1-12, `ae3/10.1` Z. 63 bis 71, `docs/pruefblaetter/05-glossar.md` Z. 164 vereinbar); keine Ersetzungspaare nötig.

## Zusammenfassung der Änderungswünsche vor Freigabe

1. H1: Abschlussbericht-Regel in T4 (Z. 41) und Rechenbeispiel (2) korrigieren; Rechtsangaben Nr. 37 anpassen.
2. H2: Release-Regel in T1 (Z. 19) auf „Produkt erstmals nach dem Stichtag“ / „neues Release eines Altprodukts: Auslegung“ umstellen.
3. M1, M2, M3: Fall-Sachverhalt neutralisieren (Projektakte, Schlusssatz, „erstes Inverkehrbringen“), Importkern-Fund datieren und Pflicht zeitlich einordnen.
4. M4, M5, M10: Q-9.1-18 und Q-9.1-13 ersetzen bzw. unterscheiden; Zeitbezug in Karten und Quiz.
5. M6 bis M9: Sorgfaltspflicht nach Erwägungsgrund 34, Kenntnis ohne Leitlinien-Inhalt, Vorfall-Definition, Art. 13 Abs. 14/9/10 und Erwägungsgrund 39 sauber darstellen.
6. M11: Kürzen auf rund 1.600 Wörter (Wiederholung 6.7 abbauen), bevor die Zusätze kommen.
7. Niedrige Befunde nach Gelegenheit (Gendern, Verweise mit Titel, Akzeptierte Antworten, Folgefehler-Zeile).
