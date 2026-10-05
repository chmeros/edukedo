import type { InstrumentLernpfadPayload } from "@edukedo/shared";

/**
 * Instrumenten-Lernpfad Scrum (Rollen, Events, Artefakte) mit dem fiktiven Fall der Brevanta IT-Systemhaus GmbH
 * für den Kurs "Fachinformatiker/in". Fachliche Grundlage: die Scrum-Inhalte in
 * `content/fachinformatiker-anwendungsentwicklung/` (Theorie und Zuordnungsfragen) sowie der Scrum Guide 2020 —
 * ohne Grenzfälle, ohne Fristen außer den dort genannten (Sprint höchstens ein Monat, Daily Scrum höchstens
 * 15 Minuten). Struktur, Ton und Feedback-Stil folgen dem Referenz-Lernpfad `instrument-lernpfad-bsc-nordstern.ts`.
 */
export const scrumBrevantaLernpfad: InstrumentLernpfadPayload = {
  organisation: "Brevanta IT-Systemhaus GmbH",
  vision:
    "Wir liefern in kurzen Abständen nutzbare Ergebnisse, holen früh Rückmeldungen unserer Kundschaft ein und verbessern dabei laufend unsere Zusammenarbeit.",
  fallbeispielIntro:
    "Ich arbeite mit dem fiktiven Unternehmen Brevanta IT-Systemhaus GmbH. Es hat rund 220 Beschäftigte und arbeitet in den Bereichen Softwareentwicklung für Kunden, Systemintegration und Managed Services, Datenanalyse sowie IoT-Vernetzung. Ein Entwicklungsteam baut für den Kunden Hartmann Metallbau GmbH eine Wartungs-App: Monteure sollen Berichte mit Foto erfassen und Ersatzteile anfragen können. Das Team arbeitet erstmals mit Scrum. Lena ist Product Owner, Tarek Scrum Master, Jonas gehört zu den Developers. Alle Personen und Abläufe sind erfundene Übungsbeispiele für Brevanta.",

  stationsnamen: {
    grundlagenfragen: "Grundlagen",
    strukturErkennen: "Bausteine erkennen",
    zieleZuordnen: "Rollen, Events, Artefakte",
    messbareZieleZuordnen: "Zuordnen vertiefen",
    massnahmenWahl: "Richtig entscheiden",
    zusammenhaenge: "Zusammenhänge",
    wirkungsketten: "Abläufe sortieren",
  },

  grundlagenfragen: {
    intro:
      'Ich sehe eine Frage nach der anderen. Oben steht zum Beispiel „Frage 1 von 3". Nach meiner Auswahl tippe ich auf „Antwort prüfen". Wenn meine Antwort noch nicht passt, lese ich eine Erklärung und kann erneut wählen.',
    questions: [
      {
        prompt: "Was ist Scrum für das Entwicklungsteam der Brevanta? Wähle genau eine Antwort.",
        options: [
          {
            text: "Ein Rahmenwerk für agile Produktentwicklung mit festen Rollen, Events und Artefakten.",
            isCorrect: true,
            feedback: "Genau! Scrum gibt einen Rahmen vor, in dem das Team in kurzen Sprints nutzbare Ergebnisse erstellt.",
          },
          {
            text: "Ein Verfahren, bei dem Umfang und Ablauf des gesamten Projekts vorab endgültig festgelegt werden.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Das beschreibt eher ein klassisches, plangetriebenes Vorgehen wie das Wasserfallmodell. Scrum arbeitet in kurzen Iterationen mit laufender Rückkopplung. Versuch es gern noch einmal.",
          },
          {
            text: "Eine Programmiersprache für mobile Apps.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Scrum legt keine Technik fest, sondern organisiert die Zusammenarbeit im Team. Schau dir die übrigen Antworten in Ruhe an.",
          },
          {
            text: "Ein Kanban-Board mit WIP-Limits, ganz ohne feste Iterationen.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht die passende Antwort. Kanban arbeitet ohne feste Iterationen und begrenzt die parallele Arbeit; Scrum arbeitet in festen Sprints.",
          },
        ],
      },
      {
        prompt:
          'Tarek ist Scrum Master im Team. Ich lese die Aussage: „Der Scrum Master ist der disziplinarische Vorgesetzte der Developers und weist ihnen die Aufgaben zu." Ist diese Aussage wahr oder falsch?',
        options: [
          {
            text: "Wahr",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Das Scrum Team ist hierarchiefrei und organisiert seine Arbeit selbst. Der Scrum Master unterstützt und coacht, ohne Aufgaben zuzuweisen. Versuch es gern noch einmal.",
          },
          {
            text: "Falsch",
            isCorrect: true,
            feedback:
              "Genau! Der Scrum Master ist keine Führungskraft im disziplinarischen Sinne. Er sorgt dafür, dass Scrum verstanden und wirksam angewendet wird, und räumt Hindernisse aus dem Weg.",
          },
        ],
      },
      {
        prompt: "Welche Aussagen zu den Scrum-Artefakten stimmen? Wähle genau zwei Antworten.",
        options: [
          {
            text: "Das Product Backlog ist die geordnete Liste aller bekannten Anforderungen an das Produkt.",
            isCorrect: true,
            feedback: "Genau! Das Product Backlog sammelt die Anforderungen und Ideen für das Produkt und wird laufend gepflegt.",
          },
          {
            text: "Das Increment ist das nutzbare Ergebnis, das im Sprint entsteht.",
            isCorrect: true,
            feedback: "Genau! Das Increment ist ein nutzbarer Zuwachs am Produkt, zum Beispiel eine lauffähige Funktion der Wartungs-App.",
          },
          {
            text: "Das Sprint Backlog enthält alle Anforderungen, die es je an die App geben wird.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Das Sprint Backlog enthält nur die für den Sprint ausgewählten Einträge samt Plan für ihre Umsetzung. Die Gesamtliste ist das Product Backlog.",
          },
          {
            text: "Die Sprint Retrospective ist ein Artefakt, in dem Ergebnisse dokumentiert werden.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die Sprint Retrospective ist ein Event, in dem das Team seine Zusammenarbeit reflektiert.",
          },
        ],
      },
    ],
  },

  strukturErkennen: {
    prompt: "Welche fünf Events kennt Scrum? Ziehe die passenden Begriffe in die freien Felder.",
    rounds: [
      {
        correctCount: 5,
        items: [
          {
            text: "Sprint",
            correct: true,
            feedback: "Genau, der Sprint ist ein Scrum-Event. Er dauert höchstens einen Monat und umfasst die übrigen Events.",
          },
          { text: "Sprint Planning", correct: true, feedback: "Genau, hier plant das Team, was im Sprint umgesetzt wird und wie." },
          { text: "Daily Scrum", correct: true, feedback: "Genau, das ist die kurze tägliche Abstimmung der Developers." },
          { text: "Sprint Review", correct: true, feedback: "Genau, hier zeigt das Team das Ergebnis und holt Rückmeldungen ein." },
          { text: "Sprint Retrospective", correct: true, feedback: "Genau, hier reflektiert das Team die eigene Zusammenarbeit und plant Verbesserungen." },
          {
            text: "Lastenheft-Abnahme",
            correct: false,
            feedback: "Eine Lastenheft-Abnahme gehört zu plangetriebenen Vorgehensweisen und ist kein Scrum-Event.",
          },
          {
            text: "WIP-Limit",
            correct: false,
            feedback: "Das WIP-Limit stammt aus Kanban und begrenzt die parallele Arbeit je Spalte. Es ist kein Scrum-Event.",
          },
          {
            text: "Meilenstein-Sitzung mit dem Lenkungsausschuss",
            correct: false,
            feedback: "Meilensteinsitzungen gehören zum klassischen Projektmanagement. Scrum sieht dieses Event nicht vor.",
          },
        ],
      },
    ],
  },

  zieleZuordnen: {
    prompt: "Ordne jeden Scrum-Baustein der passenden Gruppe zu: Rolle, Event oder Artefakt. Ziehe den Begriff in das passende Feld.",
    zones: [
      { key: "rollen", label: "Rollen" },
      { key: "events", label: "Events" },
      { key: "artefakte", label: "Artefakte" },
    ],
    items: [
      { text: "Product Owner", zoneKey: "rollen" },
      { text: "Scrum Master", zoneKey: "rollen" },
      { text: "Sprint Planning", zoneKey: "events" },
      { text: "Sprint Review", zoneKey: "events" },
      { text: "Product Backlog", zoneKey: "artefakte" },
      { text: "Increment", zoneKey: "artefakte" },
    ],
    correctFeedback: "Genau, dieser Baustein gehört zu dieser Gruppe.",
    wrongFeedback:
      "Das passt noch besser zu einer anderen Gruppe. Rollen sind Personen mit Verantwortung, Events sind zeitlich begrenzte Termine mit festem Zweck, Artefakte sind Arbeitsergebnisse, die Transparenz schaffen.",
  },

  messbareZieleZuordnen: {
    prompt: "Welche Aufgabe, welcher Termin oder welches Ergebnis gehört zu welcher Scrum-Gruppe? Ordne die angezeigten Aussagen zu.",
    zones: [
      { key: "rollen", label: "Rollen" },
      { key: "events", label: "Events" },
      { key: "artefakte", label: "Artefakte" },
    ],
    kernAnzahlProZone: 3,
    rundengroesse: 3,
    correctFeedback: "Genau. Diese Aussage gehört zu dieser Scrum-Gruppe.",
    wrongFeedback:
      "Das passt hier noch nicht. Überlege, ob die Aussage eine Person mit Verantwortung, einen zeitlich begrenzten Termin oder ein Arbeitsergebnis beschreibt.",
    pool: [
      // Rollen
      { text: "Lena pflegt die Reihenfolge der Einträge im Product Backlog.", zoneKey: "rollen" },
      { text: "Lena verantwortet den Wert der Wartungs-App für Hartmann Metallbau.", zoneKey: "rollen" },
      { text: "Wenn sich Kundenwünsche ändern, entscheidet Lena, was zuerst umgesetzt wird.", zoneKey: "rollen" },
      { text: "Tarek räumt Hindernisse aus dem Weg, die das Team ausbremsen.", zoneKey: "rollen" },
      { text: "Tarek unterstützt das Team dabei, Scrum zu verstehen und wirksam anzuwenden.", zoneKey: "rollen" },
      { text: "Tarek coacht das Team, ohne ihm Aufgaben zuzuweisen.", zoneKey: "rollen" },
      { text: "Jonas und die anderen Developers wandeln Einträge in ein nutzbares Ergebnis um.", zoneKey: "rollen" },
      { text: "Die Developers organisieren ihre Arbeit selbst.", zoneKey: "rollen" },
      // Events
      { text: "Ein Zeitraum von höchstens einem Monat, in dem ein nutzbares Ergebnis entsteht; bei Brevanta meist zwei Wochen.", zoneKey: "events" },
      { text: "Das Team plant gemeinsam, was im kommenden Sprint umgesetzt wird und wie.", zoneKey: "events" },
      { text: "Das Team legt fest, welches Sprint Goal erreicht werden soll.", zoneKey: "events" },
      { text: "Die Developers stimmen sich jeden Tag höchstens 15 Minuten über ihren Fortschritt ab.", zoneKey: "events" },
      { text: "Das Team zeigt Hartmann Metallbau die lauffähige Berichtsfunktion und holt Feedback ein.", zoneKey: "events" },
      { text: "Das Team spricht über das Ergebnis des Sprints und Rückmeldungen der Stakeholder.", zoneKey: "events" },
      { text: "Das Team überlegt, wie es künftig besser zusammenarbeiten kann.", zoneKey: "events" },
      { text: "Das Team vereinbart konkrete Verbesserungen für den nächsten Sprint.", zoneKey: "events" },
      // Artefakte
      { text: "Eine sortierte, laufend gepflegte Liste aller bekannten Anforderungen und Ideen für die App.", zoneKey: "artefakte" },
      { text: "Neue Kundenwünsche werden hier als Einträge ergänzt und in eine Reihenfolge gebracht.", zoneKey: "artefakte" },
      { text: "Das Product Goal beschreibt das langfristige Ziel für das Produkt und gehört zu diesem Artefakt.", zoneKey: "artefakte" },
      { text: "Die für den Sprint ausgewählten Einträge samt Plan für ihre Umsetzung.", zoneKey: "artefakte" },
      { text: "Das Sprint Goal gehört als Verbindlichkeit zu diesem Artefakt.", zoneKey: "artefakte" },
      { text: "Das nutzbare Ergebnis eines Sprints, zum Beispiel eine lauffähige Funktion der App.", zoneKey: "artefakte" },
      { text: "Eine verbindliche Festlegung, wann etwas als fertig gilt (Definition of Done).", zoneKey: "artefakte" },
      { text: "Ein Zuwachs am Produkt, der getestet, dokumentiert und durch ein Code-Review geprüft ist.", zoneKey: "artefakte" },
    ],
  },

  massnahmenWahl: {
    prompt: "Ziehe für jede Situation die zwei passenden Schritte in die freien Felder.",
    rounds: [
      {
        context:
          "Tag 3 des Sprints: Das Team kann die Foto-Funktion nicht testen, weil ein externer Dienstleister den Zugang zum Testserver von Hartmann Metallbau gesperrt hat.",
        correctCount: 2,
        items: [
          {
            text: "Die Developers nennen das Hindernis im Daily Scrum.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! So wird das Hindernis früh sichtbar, nicht erst am Sprintende.",
          },
          {
            text: "Tarek kümmert sich als Scrum Master darum, dass das Hindernis beseitigt wird.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Hindernisse aus dem Weg zu räumen gehört zu den Aufgaben des Scrum Masters.",
          },
          {
            text: "Lena streicht den betroffenen Eintrag stillschweigend aus dem Product Backlog.",
            correct: false,
            feedback:
              "Das war leider noch nicht der passende Schritt. Ein technisches Hindernis ändert nichts am Wert des Eintrags; es muss beseitigt werden, nicht verdeckt.",
          },
          {
            text: "Das Team wartet ab und erwähnt das Problem erst in der Sprint Retrospective.",
            correct: false,
            feedback: "Das passt hier noch nicht. Bis zur Sprint Retrospective wäre viel Zeit verloren. Ein Hindernis gehört sofort auf den Tisch.",
          },
        ],
      },
      {
        context:
          "Zwischen zwei Sprints: Hartmann Metallbau meldet, dass die Ersatzteilanfragen jetzt wichtiger sind als weitere Berichtsfunktionen.",
        correctCount: 2,
        items: [
          {
            text: "Lena ordnet als Product Owner das Product Backlog neu.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Für die Reihenfolge der Anforderungen ist der Product Owner zuständig.",
          },
          {
            text: "Das Team wählt im nächsten Sprint Planning die Einträge für den Sprint aus.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Im Sprint Planning legt das Team fest, was im kommenden Sprint umgesetzt wird.",
          },
          {
            text: "Tarek weist den Developers als Scrum Master die neuen Aufgaben persönlich zu.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Der Scrum Master weist keine Aufgaben zu; das Team organisiert seine Arbeit selbst.",
          },
          {
            text: "Die Developers setzen den Wunsch nebenbei um, ohne ihn im Product Backlog zu erfassen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Ohne Eintrag im Product Backlog fehlt die Transparenz über die Anforderungen des Produkts.",
          },
        ],
      },
      {
        context: "Ende des Sprints: Das Team hat die Berichtsfunktion mit Foto fertiggestellt. Hartmann Metallbau soll das Ergebnis kennenlernen.",
        correctCount: 2,
        items: [
          {
            text: "Das Team zeigt in der Sprint Review die lauffähige Funktion.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! In der Sprint Review wird das Ergebnis des Sprints gezeigt.",
          },
          {
            text: "Rückmeldungen des Kunden werden eingeholt und können in das Product Backlog einfließen.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! So fließt das Feedback in die weitere Arbeit am Produkt ein.",
          },
          {
            text: "Das Team hält die Funktion zurück, bis das ganze Projekt abgeschlossen ist.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Scrum setzt auf frühe Rückmeldung zu nutzbaren Ergebnissen, nicht auf spätes Zeigen.",
          },
          {
            text: "Das Team zeigt nur Folien mit dem geplanten Funktionsumfang statt des lauffähigen Ergebnisses.",
            correct: false,
            feedback: "Das passt hier noch nicht. Für belastbares Feedback braucht der Kunde das nutzbare Ergebnis, nicht nur Pläne.",
          },
        ],
      },
      {
        context:
          "Nach dem Sprint: Im Team gab es Streit über die Code-Reviews, die Abstimmung zwischen den Developers hat stockend funktioniert.",
        correctCount: 2,
        items: [
          {
            text: "Das Team bespricht die Zusammenarbeit in der Sprint Retrospective.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! In der Sprint Retrospective reflektiert das Team die eigene Zusammenarbeit.",
          },
          {
            text: "Das Team vereinbart eine konkrete Verbesserung für den nächsten Sprint.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Aus der Reflexion sollen Verbesserungen entstehen, die das Team im nächsten Sprint ausprobiert.",
          },
          {
            text: "Das Team breitet den Streit in der Sprint Review vor Hartmann Metallbau aus.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Die Sprint Review dient dem Feedback zum Ergebnis; die Zusammenarbeit gehört in die Sprint Retrospective.",
          },
          {
            text: "Das Team spricht nicht darüber, damit keine Unruhe entsteht.",
            correct: false,
            feedback: "Das passt hier noch nicht. Ohne Reflexion wird die Zusammenarbeit nicht besser; genau dafür gibt es die Sprint Retrospective.",
          },
        ],
      },
    ],
  },

  zusammenhaenge: {
    intro:
      'Ich beantworte fünf Multiple-Choice-Fragen nacheinander. Die Zahl der richtigen Antworten wird bei jeder Frage angezeigt. Fehlt eine passende Antwort, lese ich: „Eine passende Aussage fehlt noch. Prüfe, welche Rolle, welches Event oder welches Artefakt betroffen sein könnte."',
    questions: [
      {
        prompt: "Das Team beginnt einen neuen Sprint mit dem Sprint Planning. Welche zwei Aussagen sind richtig?",
        options: [
          {
            text: "Das Team legt fest, was im Sprint erreicht werden soll und wie.",
            isCorrect: true,
            feedback: "Genau. Im Sprint Planning geht es um das Sprint Goal und darum, wie das Team es erreichen will.",
          },
          {
            text: "Die für den Sprint ausgewählten Einträge samt Plan bilden das Sprint Backlog.",
            isCorrect: true,
            feedback: "Genau. Das Sprint Backlog entsteht aus der Auswahl und dem Plan für ihre Umsetzung.",
          },
          {
            text: "Tarek bestimmt als Scrum Master allein, welche Einträge umgesetzt werden.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Das Team plant gemeinsam; der Scrum Master bestimmt den Sprint-Umfang nicht allein.",
          },
          {
            text: "Das fertige Increment wird Hartmann Metallbau vorgeführt.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das Vorführen des Ergebnisses gehört in die Sprint Review am Sprintende.",
          },
        ],
      },
      {
        prompt: "Jonas fragt, wer im Team die Arbeit im Sprint verteilt. Welche Antwort stimmt? Wähle eine Antwort.",
        options: [
          {
            text: "Die Developers organisieren ihre Arbeit selbst.",
            isCorrect: true,
            feedback: "Genau. Das Scrum Team ist hierarchiefrei, und die Developers entscheiden selbst, wie sie ihre Arbeit organisieren.",
          },
          {
            text: "Tarek weist die Aufgaben als disziplinarischer Vorgesetzter zu.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Der Scrum Master coacht und räumt Hindernisse aus dem Weg, er weist keine Aufgaben zu.",
          },
          {
            text: "Hartmann Metallbau gibt täglich vor, wer was tut.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Der Kunde gibt über die Sprint Review Rückmeldungen, steuert aber nicht die tägliche Arbeit.",
          },
          {
            text: "Lena legt für jede Person fest, welche Aufgabe sie wann erledigt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Lena bestimmt, was im Product Backlog wichtig ist, nicht wer welche Aufgabe übernimmt.",
          },
        ],
      },
      {
        prompt: "Das Team hält jeden Morgen das Daily Scrum ab. Welche drei Aussagen treffen zu?",
        options: [
          {
            text: "Es ist eine kurze tägliche Abstimmung der Developers.",
            isCorrect: true,
            feedback: "Genau. Die Developers stimmen sich täglich über ihre Arbeit ab.",
          },
          {
            text: "Es dauert höchstens 15 Minuten.",
            isCorrect: true,
            feedback: "Genau. Das Daily Scrum ist bewusst kurz gehalten.",
          },
          {
            text: "Es hilft zu prüfen, ob das Team auf dem Weg zum Sprint-Ziel ist.",
            isCorrect: true,
            feedback: "Genau. Der Fortschritt Richtung Sprint-Ziel steht im Mittelpunkt.",
          },
          {
            text: "Es ersetzt die Sprint Review, weil Hartmann Metallbau täglich zuschaut.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Das Daily Scrum ist eine interne Abstimmung der Developers; Feedback zum Ergebnis gehört in die Sprint Review.",
          },
        ],
      },
      {
        prompt: "Sprint Review und Sprint Retrospective gehören zum Sprintende. Welche zwei Aussagen unterscheiden sie richtig?",
        options: [
          {
            text: "In der Sprint Review zeigt das Team das Ergebnis und holt Rückmeldungen ein.",
            isCorrect: true,
            feedback: "Genau. Die Sprint Review betrachtet das Ergebnis des Sprints.",
          },
          {
            text: "In der Sprint Retrospective reflektiert das Team seine Zusammenarbeit und plant Verbesserungen.",
            isCorrect: true,
            feedback: "Genau. Die Sprint Retrospective betrachtet, wie das Team zusammenarbeitet.",
          },
          {
            text: "In der Sprint Retrospective führt das Team Hartmann Metallbau das Increment vor.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Das Vorführen des Increments gehört in die Sprint Review.",
          },
          {
            text: "In der Sprint Review geht es hauptsächlich darum, wie das Team besser zusammenarbeiten kann.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die Zusammenarbeit zu verbessern ist die Aufgabe der Sprint Retrospective.",
          },
        ],
      },
      {
        prompt: "Das Team spricht über Increment und Definition of Done. Welche Aussage ist am besten begründet? Wähle eine Antwort.",
        options: [
          {
            text: "Ein Increment gilt erst als fertig, wenn die vereinbarte Definition of Done erfüllt ist, zum Beispiel getestet, dokumentiert und per Code-Review geprüft.",
            isCorrect: true,
            feedback: "Genau. Die Definition of Done ist die gemeinsame Festlegung, wann etwas als fertig gilt.",
          },
          {
            text: "Ein Increment ist fertig, sobald die Developers den Code geschrieben haben, auch ohne Tests.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ohne die in der Definition of Done festgelegten Kriterien ist es noch kein fertiges, nutzbares Ergebnis.",
          },
          {
            text: "Die Definition of Done gehört als Verbindlichkeit zum Product Backlog.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Dem Product Backlog ist das Product Goal zugeordnet; die Definition of Done gehört zum Increment.",
          },
          {
            text: "Fertig ist jeder Eintrag, der im Sprint Backlog steht.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Das Sprint Backlog enthält die geplanten Einträge; fertig sind sie erst, wenn sie die Definition of Done erfüllen.",
          },
        ],
      },
    ],
  },

  wirkungsketten: {
    intro:
      "Ich sehe jeweils vier nummerierte freie Felder und gemischte Aussagen. Ich ziehe sie in die richtige Reihenfolge, wie sie in Scrum nacheinander ablaufen.",
    tasks: [
      {
        prompt: "Ein Kundenwunsch von Hartmann Metallbau soll Teil der Wartungs-App werden. Sortiere den Weg bis zum Ergebnis.",
        items: [
          "Hartmann Metallbau äußert den Wunsch, Ersatzteile direkt aus der App anzufragen.",
          "Der Wunsch wird als Eintrag ins Product Backlog aufgenommen und von Lena einsortiert.",
          "Im Sprint Planning wählt das Team den Eintrag für den Sprint aus.",
          "Die Developers setzen ihn um, und er wird Teil des Increments.",
        ],
      },
      {
        prompt: "Das Team durchläuft einen Sprint. Sortiere die Events in der Reihenfolge, in der sie im Sprint vorkommen.",
        items: [
          "Das Team plant im Sprint Planning, was es erreichen will.",
          "Die Developers stimmen sich jeden Tag im Daily Scrum ab.",
          "Das Team zeigt in der Sprint Review das Ergebnis.",
          "Das Team reflektiert in der Sprint Retrospective seine Zusammenarbeit.",
        ],
      },
      {
        prompt: "Ein Hindernis bremst das Team im Sprint. Sortiere den Weg von der Meldung bis zur Weiterarbeit.",
        items: [
          "Ein Developer meldet im Daily Scrum, dass ihm der Zugang zum Testserver fehlt.",
          "Tarek greift das Hindernis als Scrum Master auf.",
          "Der Zugang wird wieder freigeschaltet.",
          "Die Developers können die Funktion testen und weiterarbeiten.",
        ],
      },
      {
        prompt: "Feedback der Kundschaft soll das Produkt verbessern. Sortiere den Weg vom Zeigen des Ergebnisses bis zur nächsten Planung.",
        items: [
          "Das Team zeigt in der Sprint Review die lauffähige Fotofunktion.",
          "Hartmann Metallbau gibt Rückmeldung und wünscht eine Änderung.",
          "Lena nimmt den Änderungswunsch ins Product Backlog auf.",
          "Im nächsten Sprint Planning kann das Team den Eintrag für den Sprint auswählen.",
        ],
      },
    ],
  },

  selbsteinschaetzungPrompt:
    'Wie sicher fühlst du dich jetzt im Umgang mit Scrum? Wähle einen Wert von 0 bis 10. 0 bedeutet „gar nicht sicher", 5 „teils/teils" und 10 „sehr sicher".',
};
