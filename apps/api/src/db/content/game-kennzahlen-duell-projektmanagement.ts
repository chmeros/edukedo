import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Projektmanagement" für den Kurs „Geprüfter Fachwirt für Büro- und Projektorganisation (IHK)":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche
 * Begriffe bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das
 * Kennzahlen-Duell (F-142, `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell",
 * nie bloß „Duell" (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte (und die dortigen Erklärungen) der Kursdateien
 * content/fachwirt-buero-projektorganisation/ — Thema 1.3 (Projektmanagement), Thema 1.2 (Netzplan,
 * Terminüberwachung) und Thema 2.1 (Lastenheft, Projektstrukturplan); Rechtsstand dort: 15.09.2026.
 * Bewusst nicht enthalten, weil der Kurs sie nicht behandelt: Lastenheft, Gantt-Diagramm, Abschlussbericht
 * sowie Normen- und Paragrafenangaben. Zahlenwerte stammen nur aus dem Netzplan-Beispiel in Thema 1.2.
 */
export const kennzahlenDuellProjektmanagement: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Projektauftrag und Projektstart",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Scope Creep, Auftragsanalyse, Kick-off, Lastenheft und Projektstart-Vorbereitung auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Planung und Steuerung",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest Projektstrukturplan und Netzplan, kennst Meilensteine und kannst klassisches von agilem Vorgehen sowie Risikomanagement abgrenzen.",
    },
    {
      nummer: 3,
      titel: "Netzplan und Puffer",
      abschlussmeldung:
        "Runde 3 geschafft! Du kennst den Unterschied zwischen Netzplan und Ablaufplan, den kritischen Pfad, den frühesten Anfangszeitpunkt, die beiden Puffer und die Projektdauer im Beispielnetzplan.",
    },
    {
      nummer: 4,
      titel: "Kontrolle, Dokumentation und Evaluation",
      abschlussmeldung:
        "Runde 4 geschafft! Du trennst Projektkontrolle und Evaluation, weißt, warum frühe Abweichungserkennung und laufende Dokumentation wichtig sind, und erkennst strukturelle Ursachen für Prozessoptimierungen.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Im laufenden Projekt kommen immer wieder Zusatzwünsche hinzu, ohne dass jemand sie abstimmt oder Zeit und Budget anpasst. Wie heißt dieses Phänomen?",
      antwortA: "Scope Creep",
      antwortB: "Kick-off",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Scope Creep ist die schleichende, nicht abgestimmte Ausweitung des Projektumfangs. Sie ist eine häufige Ursache für Konflikte über Umfang, Budget oder Ergebnis (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die schleichende, nicht abgestimmte Ausweitung des Projektumfangs heißt Scope Creep. Ein Kick-off ist dagegen der gemeinsame Auftakt zum Projektstart (siehe Thema 1.3).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Was wird bei der Analyse des Projektauftrags geklärt?",
      antwortA: "Zielerreichung, Qualität und Wirtschaftlichkeit des fertigen Ergebnisses",
      antwortB: "Umfang, Zeitraum, Beteiligte, Ziele und verfügbare Ressourcen",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Auftragsanalyse klärt Umfang, Zeitraum, Beteiligte, Ziele und Ressourcen. Zielerreichung, Qualität und Wirtschaftlichkeit prüft erst die Evaluation nach dem Projektabschluss (siehe Thema 1.3).",
      feedbackFalsch:
        "Das stimmt nicht. Zielerreichung, Qualität und Wirtschaftlichkeit werden erst in der Evaluation nach dem Abschluss beurteilt. Die Auftragsanalyse klärt Umfang, Zeitraum, Beteiligte, Ziele und Ressourcen (siehe Thema 1.3).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Wozu dient ein Kick-off-Meeting zu Projektbeginn?",
      antwortA: "Es vergleicht den Ist-Zustand mit dem Soll-Zustand des Projekts",
      antwortB: "Es schafft bei allen Beteiligten ein gemeinsames Verständnis von Zielen und Vorgehen",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Ein gemeinsamer, nachvollziehbarer Projektstart wie das Kick-off-Meeting schafft ein einheitliches Verständnis von Zielen und Vorgehen (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Der Vergleich von Ist- und Soll-Zustand gehört zur Projektkontrolle. Das Kick-off-Meeting schafft zu Beginn ein gemeinsames Verständnis von Zielen und Vorgehen (siehe Thema 1.3).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welches Dokument hält die konkreten Kundenanforderungen an ein Projekt strukturiert fest?",
      antwortA: "Lastenheft",
      antwortB: "Projektstrukturplan",
      richtig: "A",
      feedbackRichtig:
        "Genau! Das Lastenheft hält die Anforderungen und Wünsche der Kundschaft strukturiert fest (das Pflichtenheft beschreibt dagegen die Umsetzung durch den Auftragnehmer). Der Projektstrukturplan gliedert dagegen das Projekt in Teilaufgaben (siehe Thema 2.1).",
      feedbackFalsch:
        "Das passt nicht. Kundenanforderungen hält das Lastenheft fest; der Projektstrukturplan gliedert das Projekt in Teilaufgaben (siehe Thema 2.1).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Teamzusammenstellung, Regeln für die Zusammenarbeit im Team und gegebenenfalls Projektuntergruppen: Zu welchem Schritt gehören sie?",
      antwortA: "Projektauftrag analysieren",
      antwortB: "Projektstart vorbereiten",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Nach der Auftragsklärung folgt die Vorbereitung des Projektstarts mit Team, Zusammenarbeitsregeln und gegebenenfalls Untergruppen (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die Auftragsanalyse klärt Umfang, Zeitraum, Beteiligte, Ziele und Ressourcen. Team und Zusammenarbeitsregeln gehören zur Vorbereitung des Projektstarts (siehe Thema 1.3).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Frage beantwortet der Projektstrukturplan?",
      antwortA: "Was muss getan werden?",
      antwortB: "Wann und mit welchen Ressourcen wird es getan?",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Projektstrukturplan gliedert das Projekt in Teilaufgaben und beantwortet das Was. Termin- und Einsatzmittelplanung folgen danach (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Wann und mit welchen Ressourcen etwas geschieht, wird erst im Anschluss geplant. Der Projektstrukturplan beantwortet die Frage, was getan werden muss (siehe Thema 2.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Ein Projekt wird hierarchisch in Teilprojekte und darunterliegende Arbeitspakete gegliedert. Welches Planungsinstrument ist das?",
      antwortA: "Netzplan",
      antwortB: "Projektstrukturplan",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der Projektstrukturplan gliedert ein Projekt hierarchisch in Teilprojekte und Arbeitspakete. Der Netzplan zeigt dagegen die zeitliche und logische Abhängigkeit von Vorgängen (siehe Thema 1.3 und Thema 1.2).",
      feedbackFalsch:
        "Das stimmt nicht. Der Netzplan stellt Vorgänge und ihre Abhängigkeiten dar. Die hierarchische Gliederung in Teilprojekte und Arbeitspakete leistet der Projektstrukturplan (siehe Thema 1.3 und Thema 2.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Wie heißen definierte Zwischenziele, an denen der Projektfortschritt überprüft wird?",
      antwortA: "Meilensteine",
      antwortB: "Arbeitspakete",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Meilensteine sind definierte Zwischenziele und zentrale Bezugspunkte für Projektsteuerung und Projektkontrolle (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Arbeitspakete sind zuweisbare Teilaufgaben im Projektstrukturplan. Definierte Zwischenziele zur Fortschrittsprüfung heißen Meilensteine (siehe Thema 1.3 und Thema 2.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welches Vorgehen arbeitet iterativ in kurzen Zyklen mit laufender Anpassung, zum Beispiel bei Scrum oder Kanban?",
      antwortA: "Klassisches Projektmanagement",
      antwortB: "Agiles Projektmanagement",
      richtig: "B",
      feedbackRichtig:
        "Genau! Agiles Projektmanagement arbeitet iterativ in kurzen Zyklen. Klassisches Vorgehen folgt dagegen einem vorab festgelegten Gesamtplan, etwa im Wasserfallmodell (siehe Thema 1.3).",
      feedbackFalsch:
        "Das passt nicht. Klassisches Projektmanagement plant vorab einen Gesamtplan (Phasenmodell). Iterativ in kurzen Zyklen arbeitet das agile Vorgehen (siehe Thema 1.3).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Mögliche Störungen im Projekt frühzeitig erkennen, bewerten und Gegenmaßnahmen vorbereiten: Wie heißt dieser Aufgabenbereich?",
      antwortA: "Risikomanagement",
      antwortB: "Projektevaluation",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Risikomanagement gehört zur laufenden Steuerung des Projektablaufs und bereitet Gegenmaßnahmen vorausschauend vor (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die Projektevaluation erfolgt erst nach dem Projektabschluss. Das frühzeitige Erkennen und Bewerten von Störungen ist Risikomanagement (siehe Thema 1.3).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Darstellung zeigt bei Projekten die zeitliche und logische Abhängigkeit einzelner Vorgänge und lässt den kritischen Pfad erkennen?",
      antwortA: "Ablaufplan (Flussdiagramm)",
      antwortB: "Netzplan",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Netzplan stellt die zeitliche und logische Abhängigkeit der Vorgänge dar und macht den kritischen Pfad sichtbar. Ein Ablaufplan zeigt die Abfolge von Arbeitsschritten mit Entscheidungspunkten (siehe Thema 1.2).",
      feedbackFalsch:
        "Nicht ganz. Ein Ablaufplan zeigt die Abfolge von Arbeitsschritten inklusive Entscheidungspunkten. Den kritischen Pfad erkennt man im Netzplan (siehe Thema 1.2).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Was ist der kritische Pfad in einem Netzplan?",
      antwortA: "Die Abfolge von Vorgängen, deren Verzögerung unmittelbar das Gesamtprojekt verzögert",
      antwortB: "Die Abfolge der Vorgänge mit dem größten Gesamtpuffer",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Auf dem kritischen Pfad liegen die Vorgänge ohne Gesamtpuffer; jede Verzögerung dort verschiebt das Projektende (siehe Thema 1.2).",
      feedbackFalsch:
        "Das stimmt nicht. Der kritische Pfad besteht gerade aus Vorgängen ohne Gesamtpuffer, nicht mit dem größten Puffer. Jede Verzögerung dort verschiebt das Projektende (siehe Thema 1.2).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Vorgang D folgt auf B (frühester Endzeitpunkt 5) und auf C (frühester Endzeitpunkt 7). Wann kann D frühestens beginnen?",
      antwortA: "Zum Zeitpunkt 5",
      antwortB: "Zum Zeitpunkt 7",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der früheste Anfangszeitpunkt ist der größte FEZ aller Vorgänger, denn ein Vorgang beginnt erst, wenn alle Vorgänger beendet sind (siehe Thema 1.2).",
      feedbackFalsch:
        "Nicht ganz. D kann erst beginnen, wenn alle Vorgänger beendet sind. Maßgeblich ist der größte FEZ der Vorgänger, hier also 7 (siehe Thema 1.2).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welcher Puffer gibt an, um wie viel sich ein Vorgang verschieben darf, ohne einen Nachfolger zu verschieben?",
      antwortA: "Gesamtpuffer",
      antwortB: "Freier Puffer",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der freie Puffer verschiebt keinen Nachfolger. Der Gesamtpuffer lässt dagegen nur das Projektende unberührt; der freie Puffer ist nie größer als der Gesamtpuffer (siehe Thema 1.2).",
      feedbackFalsch:
        "Das passt nicht. Der Gesamtpuffer sagt, um wie viel sich ein Vorgang verschieben darf, ohne das Projektende zu verschieben. Ohne einen Nachfolger zu verschieben gilt der freie Puffer (siehe Thema 1.2).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Vorgang A dauert 2 Tage. B (3 Tage) und C (5 Tage) folgen auf A, D (1 Tag) folgt auf B und C. Wie lang ist die Projektdauer?",
      antwortA: "8 Tage",
      antwortB: "11 Tage",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Projektdauer ist der größte FEZ. Der kritische Pfad A–C–D dauert 8 Tage, B hat 2 Tage Gesamtpuffer (siehe Thema 1.2).",
      feedbackFalsch:
        "Nicht ganz. B und C laufen parallel, die Dauern werden also nicht einfach addiert. Die Projektdauer ist der größte FEZ: A–C–D ergibt 8 Tage (siehe Thema 1.2).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Ein Team vergleicht während der Durchführung laufend den Ist- mit dem Soll-Zustand bei Meilensteinen, Kosten und Zielen. Wie heißt dieser Schritt?",
      antwortA: "Projektevaluation",
      antwortB: "Projektkontrolle",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Projektkontrolle vergleicht laufend Ist- und Soll-Zustand, damit Abweichungen früh erkannt werden. Die Evaluation folgt erst nach dem Abschluss (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die Evaluation findet erst nach dem Projektabschluss statt. Der laufende Soll-Ist-Vergleich ist die Projektkontrolle (siehe Thema 1.3).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Warum sollen Abweichungen im Projekt möglichst früh erkannt werden?",
      antwortA: "Weil die Korrektur in der Regel umso teurer und aufwendiger wird, je später die Abweichung entdeckt wird",
      antwortB: "Weil die Korrektur in der Regel umso günstiger wird, je später die Abweichung entdeckt wird",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Je später eine Abweichung entdeckt wird, desto teurer und aufwendiger ist in der Regel die Korrektur (siehe Thema 1.3).",
      feedbackFalsch:
        "Das stimmt nicht. Gerade umgekehrt: Je später eine Abweichung entdeckt wird, desto teurer und aufwendiger ist in der Regel die Korrektur (siehe Thema 1.3).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Wann und wozu wird die Projektdokumentation erstellt?",
      antwortA: "Sie begleitet das gesamte Projekt und dient der laufenden Steuerung ebenso wie der späteren Auswertung",
      antwortB: "Sie entsteht erst nach dem Projektabschluss und dient nur der Archivierung",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Dokumentation begleitet das gesamte Projekt, macht Entscheidungswege nachvollziehbar und erleichtert neuen Teammitgliedern die Einarbeitung (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die Dokumentation begleitet das gesamte Projekt und dient sowohl der laufenden Steuerung als auch der späteren Auswertung (siehe Thema 1.3).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welche Leitfrage der Projektevaluation fragt nach dem Verhältnis von Aufwand zu Nutzen?",
      antwortA: "Die Frage nach der Qualität des Ergebnisses",
      antwortB: "Die Frage nach der Wirtschaftlichkeit",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Wirtschaftlichkeit beschreibt das Verhältnis von Aufwand zu Nutzen. Daneben fragt die Evaluation nach Zielerreichung und Qualität (siehe Thema 1.3).",
      feedbackFalsch:
        "Das passt nicht. Die Qualität des Ergebnisses ist eine eigene Leitfrage. Das Verhältnis von Aufwand zu Nutzen beschreibt die Wirtschaftlichkeit (siehe Thema 1.3).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Dieselbe Terminverzögerung tritt nacheinander in mehreren voneinander unabhängigen Projekten auf. Wie ist das einzuordnen?",
      antwortA: "Als Hinweis auf eine strukturelle Ursache, aus der eine allgemeine Prozessoptimierung abgeleitet wird",
      antwortB: "Als projektspezifischer Einzelfall, der nur im jeweiligen Projekt behandelt wird",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ein Problem, das projektübergreifend wiederkehrt, deutet auf eine strukturelle Ursache hin und gehört in die Prozessoptimierung (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Tritt dasselbe Problem in mehreren unabhängigen Projekten auf, ist es kein Einzelfall, sondern deutet auf eine strukturelle Ursache hin (siehe Thema 1.3).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zum Projektmanagement gelöst. Du kannst jetzt besser unterscheiden, welcher Projektschritt, welches Planungsinstrument und welcher Netzplanbegriff gemeint ist.",
};
