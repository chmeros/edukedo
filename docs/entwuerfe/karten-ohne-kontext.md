# Entwurf: Karten und Aufgaben ohne Kontext (UXT-B-08, UXT-F-09)

Stand 10.10.2026 · **zur fachlichen Entscheidung vorgelegt, nicht eingespielt** (Rahmenentscheidung R3). Der Befund der Usability-Prüfung vom 07.10.2026 besteht aus vier Teilen, die unterschiedlich groß sind. Der Entwurf stellt sie getrennt vor, damit Sie sie einzeln entscheiden können.

## Teil 1: Fallbetrieb und Fallperson in Karten und Fragen (AEVO, Versicherungen)

### Befund

- **AEVO:** 77 Karteikarten und Quizfragen in allen zwölf Themen des Kurses nennen die „Kelvinar Elektrotechnik GmbH“ (kurz „Kelvinar“) oder „Frau Yildiz“. Vorgestellt werden beide nur in der Theorie (Kelvinar in 1.1, Frau Yildiz als Ausbildungsleitung in 1.3). Die erste Karte des Kurses (K-1.1-01) lautet: „Welches Gesetz ist die zentrale Rechtsgrundlage der betrieblichen Berufsausbildung bei Kelvinar?“
- **Versicherungen:** 61 von 596 Karten und Quizfragen nennen die „Nordantis Versicherung AG“, vorgestellt in der Theorie von 1.1 („Als durchgängiges Beispiel dient die Nordantis Versicherung AG …“).
- **Warum „beim ersten Auftreten einführen“ nicht reicht:** Karten und Fragen kommen in der Reihenfolge der Wiederholung (fällige zuerst, neue danach) und in Themen-Auswahlen; eine Person kann jede Karte zuerst sehen. Die Theorie liest man nur über „Im Thema nachlesen“. Ein „erstes Auftreten“ gibt es in der Lernansicht nicht.
- **Verwandt in anderen Kursen:** Weitere Kurse haben eine Fallfirma (nach Häufigkeit im Content: IT-Systemhaus GmbH in den Fachinformatiker-Kursen, Präzisionstechnik GmbH im Technischen Fachwirt, Elektrowerke GmbH im Industriefachwirt, NordWert Handels GmbH im Wirtschaftsfachwirt u. a.). Die Prüfung bemerkte es nur bei AEVO und Versicherungen; die Entscheidung unten kann auf weitere Kurse übertragen werden, ohne dass dies jetzt nötig ist.

### Varianten

- **A. Belassen.**
- **B. Fallbetrieb und Fallperson als Fachbegriffe erklären (Empfehlung).** Der vorhandene Mechanismus F-165 (Fachbegriffe mit Kurzdefinition als Popover) bekommt für den Kurs ein Glossar mit zwei bis drei Einträgen, zum Beispiel „Kelvinar Elektrotechnik GmbH“ (Alias „Kelvinar“): „Fallbetrieb dieses Kurses: mittelständisches Unternehmen mit rund 180 Beschäftigten, das in den Berufen Elektroniker/in für Betriebstechnik, Industriekaufmann/-frau und Fachinformatiker/in Systemintegration ausbildet.“ und „Frau Yildiz“: „Ausbildungsleiterin der Kelvinar Elektrotechnik GmbH, koordiniert die Ausbildung berufsübergreifend.“ Das ist nur eine Content-Datei (`glossar.md`), keine Änderung an den 77 Items. Der Haken: Die Markierung erscheint wie bei allen Fachbegriffen erst **nach** der Antwort (aufgedeckte Karte, beantwortete Frage), nicht davor.
- **C. Items selbsterklärend umformulieren.** Wo der Fallbezug für die Antwort nicht nötig ist, wird er entfernt („… bei Kelvinar“ wird „… im Ausbildungsbetrieb“); wo er nötig ist, steht die Information in der Frage. Das löst auch das Problem vor der Antwort, ist aber der größte Eingriff (77 Items AEVO, 61 Versicherungen), und jede Änderung gehört nach R3 einzeln geprüft.
- **Empfehlung:** B für beide Kurse und danach C nur für die Items, die ohne den Fallbezug gar nicht zu beantworten sind (zum Beispiel K-1.2-10 „Warum bildet Kelvinar in der Ausbildungswerkstatt Elektroniker/innen für Betriebstechnik aus?“). Diese Items lege ich nach Ihrer Wahl in einem zweiten Entwurf einzeln vor.

### Konkreter Fall: K-1.1-16 im Versicherungskurs

Heute: „Was passiert mit darüber hinausgehenden Alterungsrückstellungen beim Wechsel zu einem anderen Versicherer?“ Die Frage bezieht sich auf die Karte davor (K-1.1-15, Übertragungswert) und ist allein nicht verständlich. Vorschlag (Antwort unverändert):

> Was passiert beim Wechsel zu einem anderen Versicherer mit dem Teil der Alterungsrückstellung, der über den Übertragungswert hinausgeht?

Diese Änderung gilt unabhängig von A, B oder C. Andere Karten mit Rückbezug auf die Vorgängerkarte lassen sich nicht zuverlässig automatisch finden; die Prüfung nannte nur diese eine.

## Teil 2: Einstiegsaufgabe in neuen Kursen (UXT-B-08, zweiter Teil)

**Befund:** Im Kurs Gesundheit und Soziales war die erste Aufgabe nach dem Kurswechsel eine allgemeine Projektfrage („Matrix- oder reine Projektorganisation?“, Thema 3.3) statt eines Themas mit Gesundheitsbezug. Das ist keine fehlerhafte Aufgabe, sondern die Auswahlregel:
- **Quiz** (`quiz.items`): zufällige Stichprobe über den ganzen Kurs (`random()`), auch bei einer Person ohne jeden Fortschritt. Das ist als Querschnitt gewollt.
- **Karteikarten** (`content.dueCards`): fällige Wiederholungen zuerst, neue Karten danach; unter den neuen gibt es keine zweite Sortierung, ihre Reihenfolge ist deshalb nicht festgelegt.

Eine neue Person beginnt damit in jedem Kurs bei einem beliebigen Thema.

**Varianten:**
- **A. Belassen.** Der Zufall ist gewollt, die Themen sind über „Fortschritt“ und die Themenauswahl erreichbar.
- **B. Nur die Karteikarten ordnen.** Unter den neuen Karten zuerst nach Themenreihenfolge des Kurses (Fachgebiet, Thema), dann nach Reihenfolge in der Datei. Fällige Wiederholungen bleiben vorn. Eine neue Person beginnt in Thema 1.1.
- **C. Dazu die erste Quizrunde.** Solange eine Person im Kurs noch nichts beantwortet hat, kommt die erste Quizrunde aus dem ersten Thema; danach wie bisher zufällig.
- **Empfehlung:** B und C. Der Nachteil von B ist, dass neue Karten dann Thema für Thema statt gemischt kommen; wer gemischt lernen will, hat „Gemischtes Lernen“ und die Themenauswahl. Der Nachteil von C ist eine Sonderregel für die allererste Runde.

## Teil 3: Zuordnungsaufgabe im Industriefachwirt 5.3 (UXT-F-09)

**Befund:** Q-5.3-06 lautet „Ordne den Begriff dem passenden Zeitraum bzw. der passenden Beschreibung zu.“ Verschiebbar sind aber die Beschreibungen, die Zielfelder sind die Begriffe (Kurzfristige/Mittelfristige/Langfristige Finanzplanung, Cashflow-Rechnung). Zusätzlich zeigt eine falsche Zuordnung nur eine rote Markierung, die richtige Zuordnung steht nicht da (Reihenfolge-Fragen zeigen sie).

**Vorschlag, Wortlaut:** „Ordne jedem Begriff die passende Beschreibung zu.“ Dieser Satz stimmt unabhängig davon, welche Seite verschoben wird. Q-5.3-06 ist der einzige Fall mit dieser Formulierung. Die übrigen Zuordnungsaufgaben (rund 57 mit den vier häufigen Formulierungen „Ordne die Begriffe der passenden Beschreibung zu“ u. ä.) stehen, soweit stichprobenartig geprüft (AEVO 4.1), in derselben Aufteilung „Begriff ↔ Beschreibung“; dort wäre dann ebenfalls die Beschreibung das, was man verschiebt. Das ist nicht für alle geprüft. Der allgemeine Hinweis der Oberfläche („Begriff auswählen oder ziehen, dann das Zielfeld auswählen oder dorthin ziehen“) passt deshalb in vielen Fällen ebenfalls nicht. **Vorschlag:** Hinweistext neutral fassen („Eintrag auswählen oder ziehen, dann das Zielfeld auswählen oder dorthin ziehen“) und die rund 57 Anweisungen auf „Ordne jedem Begriff die passende Beschreibung zu.“ vereinheitlichen. Das sind reine Textänderungen ohne Einfluss auf Lösung und Fortschritt.

**Vorschlag, Anzeige:** Nach einer falschen Zuordnung die richtige Zuordnung als Liste unter der Rückmeldung zeigen („Richtig wäre: Kurzfristige Finanzplanung ↔ …“). Die Daten liegen schon vor (`correctMap` der Auswertung); es ist eine Änderung der Oberfläche in `MatchingStep` mit Test.

## Folgen

- Teil 1 B: neue Datei `glossar.md` je Kurs (AEVO, Versicherungen), Import `db:import-content`; Einträge stehen auf „Geprüft: nein“ bis zur fachlichen Prüfung (wie das Pilot-Glossar der Fachinformatiker-Kurse). K-1.1-16: ein Text, ein geändertes Item, ID und Fortschritt bleiben.
- Teil 2: B ist eine Änderung in `content.dueCards` mit Integrationstest („neue Karten in Themenreihenfolge“); C ist eine Änderung in `quiz.items` mit Test („erste Runde ohne Fortschritt aus dem ersten Thema“).
- Teil 3: rund 57 Textzeilen in Content, ein Oberflächentext und die Anzeige der richtigen Zuordnung; Web-Tests dazu.

## Zu entscheiden

1. Teil 1: A, B oder C (Empfehlung B, danach gezielt C für nicht beantwortbare Items)? Soll B auch für andere Kurse mit Fallfirma folgen?
2. K-1.1-16: Soll der Vorschlagstext so eingespielt werden?
3. Teil 2: A, B, C oder B und C (Empfehlung)?
4. Teil 3: Wortlaut „Ordne jedem Begriff die passende Beschreibung zu.“ für alle Zuordnungsaufgaben, neutraler Hinweistext und Anzeige der richtigen Zuordnung — alles, nur der Wortlaut, oder nichts?
