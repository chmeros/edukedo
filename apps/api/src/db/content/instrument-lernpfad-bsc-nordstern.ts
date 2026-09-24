import type { InstrumentLernpfadPayload } from "@edukedo/shared";

/**
 * F-131: BSC-Instrumenten-Lernpfad, branchenneutrale Fassung für den bestehenden Pilotkurs
 * "Geprüfter Fachwirt für Büro- und Projektorganisation" — Inhalt 1:1 aus dem Referenz-Content
 * übernommen (`content/instrumenten-lernpfade/user-story-bsc-allgemein-alle-fachwirte.docx`),
 * keine eigene Umformulierung, um keine Abweichung von den fachlich/didaktisch abgestimmten
 * Formulierungen und Rückmeldetexten einzubringen. Als getypte TS-Datei statt Markdown/JSON
 * abgelegt (siehe apps/api/src/db/seed-instrument-lernpfad.ts) — die Struktur ist zu verschachtelt
 * für das bestehende Markdown-Zwischenformat (siehe content/README.md), Zod validiert beim Seed-Lauf.
 */
export const bscNordsternLernpfad: InstrumentLernpfadPayload = {
  organisation: "Nordstern GmbH",
  vision:
    "Wir überzeugen durch verlässliche Leistungen, zufriedene Kundschaft und engagierte Mitarbeitende – und sichern so unsere Zukunft.",
  fallbeispielIntro:
    "Ich arbeite mit dem fiktiven Unternehmen Nordstern GmbH. Es beschäftigt 90 Menschen, bearbeitet Kundenaufträge und erbringt Leistungen für Geschäftskunden. Das Beispiel ist bewusst branchenneutral gehalten: Es setzt weder eine Fertigung noch eine bestimmte Dienstleistung voraus. Alle Zahlen sind erfundene Übungswerte für Nordstern.",

  grundlagenfragen: {
    intro:
      'Ich sehe eine Frage nach der anderen. Oben steht zum Beispiel „Frage 1 von 3". Nach meiner Auswahl tippe ich auf „Antwort prüfen". Wenn meine Antwort noch nicht passt, lese ich eine Erklärung und kann erneut wählen.',
    questions: [
      {
        prompt: "Was ist eine Balanced Scorecard für ein Unternehmen? Wähle genau eine Antwort.",
        options: [
          {
            text: "Eine vollständige Liste aller laufenden Aufgaben und Termine.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Eine Aufgabenliste unterstützt die tägliche Organisation. Die BSC betrachtet strategische Ziele des Unternehmens. Versuch es gern noch einmal.",
          },
          {
            text: "Ein Instrument, das strategische Ziele und Kennzahlen aus mehreren Perspektiven verbindet.",
            isCorrect: true,
            feedback: "Genau! So kann Nordstern beobachten, wie sich seine Strategie entwickelt.",
          },
          {
            text: "Ein Verfahren, um einzelne Investitionen nach gewichteten Kriterien zu vergleichen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das beschreibt eine Nutzwertanalyse. Schau dir die übrigen Antworten in Ruhe an.",
          },
          {
            text: "Eine reine Übersicht über Einnahmen und Ausgaben.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht die passende Antwort. Finanzdaten gehören zur BSC, sie betrachtet aber auch Kundschaft, Abläufe und Mitarbeitende.",
          },
        ],
      },
      {
        prompt:
          'Ich lese die Vision von Nordstern: „Die BSC hilft Nordstern, seine Vision in überprüfbare Ziele und passende Maßnahmen zu übersetzen." Ist diese Aussage wahr oder falsch?',
        options: [
          {
            text: "Wahr",
            isCorrect: true,
            feedback:
              "Genau! Die Vision gibt die Richtung vor. Mit der BSC macht Nordstern daraus Ziele, Kennzahlen und Maßnahmen.",
          },
          {
            text: "Falsch",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Gerade diese Verbindung soll die BSC herstellen: Sie hilft, die Vision in konkrete Ziele für den Unternehmensalltag zu übersetzen. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        prompt: "Welchen Nutzen kann die BSC für Nordstern haben? Wähle genau zwei Antworten.",
        options: [
          {
            text: "Sie garantiert, dass alle Unternehmensziele erreicht werden.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Die BSC hilft beim Steuern und Überprüfen, garantiert aber keinen Erfolg.",
          },
          {
            text: "Sie verbindet Ziele zu Finanzen, Kundschaft, Abläufen und Mitarbeitenden.",
            isCorrect: true,
            feedback: "Genau! Verschiedene strategische Ziele werden gemeinsam sichtbar.",
          },
          {
            text: "Sie macht Fortschritte anhand geeigneter Kennzahlen überprüfbar.",
            isCorrect: true,
            feedback: "Genau! Nordstern kann erkennen, wo sich Ziele entwickeln und wo Handlungsbedarf besteht.",
          },
          {
            text: "Sie ersetzt Entscheidungen der Führungskräfte.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die BSC liefert Informationen für Entscheidungen; sie trifft diese nicht selbst.",
          },
        ],
      },
    ],
  },

  strukturErkennen: {
    prompt: "Welche vier Perspektiven gehören zur Balanced Scorecard? Ziehe die passenden Begriffe in die freien Felder.",
    rounds: [
      {
        correctCount: 4,
        items: [
          { text: "Finanzperspektive", correct: true, feedback: "Genau, diese Perspektive gehört zur BSC." },
          {
            text: "Marktperspektive",
            correct: false,
            feedback:
              "Die Stellung im Markt ist wichtig. Im verwendeten Modell wird sie insbesondere durch Ziele der Kundenperspektive betrachtet.",
          },
          { text: "Kundenperspektive", correct: true, feedback: "Genau, diese Perspektive gehört zur BSC." },
          {
            text: "Produktperspektive",
            correct: false,
            feedback: "Produkte und Leistungen sind wichtig. Ihre Qualität und Entwicklung können durch Ziele innerhalb der vier Perspektiven berücksichtigt werden.",
          },
          { text: "Perspektive der internen Prozesse", correct: true, feedback: "Genau, diese Perspektive gehört zur BSC." },
          {
            text: "Personalperspektive",
            correct: false,
            feedback:
              "Die Mitarbeitenden sind entscheidend. Ihre Fähigkeiten und Entwicklung betrachten wir hier in der Lern- und Entwicklungsperspektive.",
          },
          { text: "Lern- und Entwicklungsperspektive", correct: true, feedback: "Genau, diese Perspektive gehört zur BSC." },
          {
            text: "Wettbewerbsperspektive",
            correct: false,
            feedback: "Den Wettbewerb sollte Nordstern beobachten. In diesem BSC-Modell ist er aber keine fünfte Perspektive.",
          },
        ],
      },
    ],
  },

  zieleZuordnen: {
    prompt: "Was möchte Nordstern grundsätzlich erreichen? Ziehe jedes strategische Ziel unter die passende Perspektive.",
    zones: [
      { key: "finanzen", label: "Finanzperspektive" },
      { key: "kunden", label: "Kundenperspektive" },
      { key: "prozesse", label: "Perspektive der internen Prozesse" },
      { key: "lernen_entwicklung", label: "Lern- und Entwicklungsperspektive" },
    ],
    items: [
      { text: "Langfristig wirtschaftlich tragfähig und investitionsfähig bleiben.", zoneKey: "finanzen" },
      { text: "Zufriedene Kundschaft binden und neue Interessierte gewinnen.", zoneKey: "kunden" },
      { text: "Leistungen zuverlässig, effizient und in vereinbarter Qualität erbringen.", zoneKey: "prozesse" },
      { text: "Fähigkeiten, Zusammenarbeit und Bindung der Beschäftigten stärken.", zoneKey: "lernen_entwicklung" },
    ],
    correctFeedback: "Genau, dieses strategische Ziel passt zur Perspektive.",
    wrongFeedback: "Das Ziel passt noch besser zu einer anderen Perspektive. Was möchte Nordstern damit unmittelbar verbessern?",
  },

  messbareZieleZuordnen: {
    prompt: "Welches messbare Ziel hilft, welches strategische Ziel zu überprüfen? Ordne die angezeigten Aussagen zu.",
    zones: [
      { key: "finanzen", label: "Finanzperspektive" },
      { key: "kunden", label: "Kundenperspektive" },
      { key: "prozesse", label: "Perspektive der internen Prozesse" },
      { key: "lernen_entwicklung", label: "Lern- und Entwicklungsperspektive" },
    ],
    kernAnzahlProZone: 3,
    rundengroesse: 4,
    correctFeedback: "Genau. Dieses messbare Ziel hilft, das strategische Ziel zu überprüfen.",
    wrongFeedback: "Das passt hier noch nicht. Überlege, welches strategische Ziel unmittelbar mit dieser Zahl überprüft wird.",
    pool: [
      { text: "Die frei verfügbare Liquiditätsreserve bis Jahresende von zwei auf mindestens drei durchschnittliche Monatsausgaben erhöhen.", zoneKey: "finanzen" },
      { text: "Die Zufriedenheit der befragten Kundinnen und Kunden mit der Gesamtleistung von 78 auf mindestens 85 von 100 Punkten steigern.", zoneKey: "kunden" },
      { text: "Den Anteil termingerecht abgeschlossener Aufträge innerhalb von sechs Monaten von 84 % auf mindestens 94 % erhöhen.", zoneKey: "prozesse" },
      { text: "Den Anteil der Beschäftigten mit mindestens einer passenden jährlichen Fortbildung von 65 % auf mindestens 80 % erhöhen.", zoneKey: "lernen_entwicklung" },
      { text: "Den Umsatz im nächsten Geschäftsjahr von 4,2 Mio. € auf mindestens 4,5 Mio. € steigern.", zoneKey: "finanzen" },
      { text: "Den Anteil der Kundinnen und Kunden mit einem Folgeauftrag im nächsten Jahr von 42 % auf mindestens 48 % erhöhen.", zoneKey: "kunden" },
      { text: "Die durchschnittliche Bearbeitungszeit eines Standardauftrags innerhalb eines Jahres von zwölf auf höchstens zehn Arbeitstage senken.", zoneKey: "prozesse" },
      { text: "Die durchschnittlichen Fortbildungsstunden je beschäftigter Person im nächsten Jahr von zehn auf mindestens 16 Stunden erhöhen.", zoneKey: "lernen_entwicklung" },
      { text: "Die operative Umsatzrendite im nächsten Geschäftsjahr von 4 % auf mindestens 6 % erhöhen.", zoneKey: "finanzen" },
      { text: "Die Zahl qualifizierter neuer Kundenanfragen im nächsten Jahr von 180 auf mindestens 220 erhöhen.", zoneKey: "kunden" },
      { text: "Den Anteil der Aufträge ohne erforderliche Nacharbeit von 87 % auf mindestens 93 % erhöhen.", zoneKey: "prozesse" },
      { text: "Bis Jahresende mit mindestens 90 % der Beschäftigten ein dokumentiertes Entwicklungsgespräch führen; bisher sind es 68 %.", zoneKey: "lernen_entwicklung" },
      { text: "Die Rückstände aus fälligen Kundenrechnungen bis Jahresende von 145.000 € auf höchstens 110.000 € senken.", zoneKey: "finanzen" },
      { text: "Den Anteil der innerhalb von fünf Arbeitstagen beantworteten Kundenanliegen von 73 % auf mindestens 90 % erhöhen.", zoneKey: "kunden" },
      { text: "Den Anteil vollständig dokumentierter Auftragsübergaben von 79 % auf mindestens 95 % erhöhen.", zoneKey: "prozesse" },
      { text: "Den Anteil neuer Beschäftigter mit abgeschlossener strukturierter Einarbeitung nach drei Monaten von 70 % auf mindestens 94 % erhöhen.", zoneKey: "lernen_entwicklung" },
      { text: "Den operativen Cashflow im nächsten Geschäftsjahr von 280.000 € auf mindestens 350.000 € erhöhen.", zoneKey: "finanzen" },
      { text: "Die Zufriedenheit der befragten Kundinnen und Kunden mit der Erreichbarkeit von 71 auf mindestens 83 von 100 Punkten steigern.", zoneKey: "kunden" },
      { text: "Den Anteil der innerhalb von zehn Arbeitstagen ausgewerteten und bearbeiteten Reklamationen von 76 % auf mindestens 92 % erhöhen.", zoneKey: "prozesse" },
      { text: "Die Zufriedenheit der Beschäftigten mit der Zusammenarbeit von 69 auf mindestens 80 von 100 Punkten erhöhen.", zoneKey: "lernen_entwicklung" },
      { text: "Die Kosten je abgeschlossenem Standardauftrag im nächsten Geschäftsjahr von durchschnittlich 310 € auf höchstens 295 € senken, ohne vereinbarte Leistungen zu kürzen.", zoneKey: "finanzen" },
      { text: "Den Anteil der befragten Kundinnen und Kunden, die Nordstern weiterempfehlen würden, von 67 % auf mindestens 76 % erhöhen.", zoneKey: "kunden" },
      { text: "Den Anteil der Aufträge mit vollständig erfassten Anforderungen vor Bearbeitungsbeginn von 81 % auf mindestens 95 % erhöhen.", zoneKey: "prozesse" },
      { text: "Die jährliche Fluktuationsquote der Beschäftigten von 13 % auf höchstens 10 % senken.", zoneKey: "lernen_entwicklung" },
    ],
  },

  massnahmenWahl: {
    prompt: "Ziehe für jedes Ziel die zwei passenden Maßnahmen in die freien Felder.",
    rounds: [
      {
        context: 'Perspektive der internen Prozesse — Ziel: „Den Anteil termingerecht abgeschlossener Aufträge von 84 % auf mindestens 94 % erhöhen."',
        correctCount: 2,
        items: [
          {
            text: "Aufträge mit realistischen Bearbeitungszeiten und klaren Zuständigkeiten planen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Realistische Planung kann Terminverzögerungen verringern.",
          },
          {
            text: "Bei absehbaren Verzögerungen frühzeitig abstimmen, wer Aufgaben übernehmen kann.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! So kann Nordstern schneller gegensteuern.",
          },
          {
            text: "Die Termintreue am Monatsende berechnen.",
            correct: false,
            feedback: "Das war leider noch nicht die passende Maßnahme. Die Berechnung misst das Ergebnis, verbessert den Ablauf aber nicht für sich allein.",
          },
          {
            text: "Den Umsatz im nächsten Jahr um zehn Prozent erhöhen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Das ist ein anderes Ziel und beschreibt keine Handlung zur Verbesserung der Termintreue.",
          },
        ],
      },
      {
        context: 'Kundenperspektive — Ziel: „Die Zufriedenheit mit der Erreichbarkeit auf mindestens 83 von 100 Punkten steigern."',
        correctCount: 2,
        items: [
          {
            text: "Den Zufriedenheitswert einmal jährlich ermitteln.",
            correct: false,
            feedback: "Das war leider noch nicht die passende Maßnahme. So wird die Zufriedenheit gemessen; gesucht ist eine Verbesserung der Erreichbarkeit.",
          },
          {
            text: "Klare Zeiten und Wege für Kundenanfragen veröffentlichen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Kundinnen und Kunden wissen dann, wann und wie sie Nordstern erreichen.",
          },
          {
            text: "Für eingehende Anfragen eine geregelte Vertretung bei Abwesenheit einrichten.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Anliegen bleiben dadurch seltener unbearbeitet.",
          },
          {
            text: "Die Kosten je Standardauftrag senken.",
            correct: false,
            feedback: "Das passt nicht unmittelbar zum Ziel der Erreichbarkeit. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        context: 'Lern- und Entwicklungsperspektive — Ziel: „Den Anteil der Beschäftigten mit einer passenden jährlichen Fortbildung auf mindestens 80 % erhöhen."',
        correctCount: 2,
        items: [
          {
            text: "Fortbildungsbedarf in Entwicklungsgesprächen ermitteln und geeignete Angebote auswählen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! So knüpfen Fortbildungen an tatsächliche Aufgaben an.",
          },
          {
            text: "Die Fortbildungsquote monatlich berechnen.",
            correct: false,
            feedback: "Das war leider noch nicht die passende Maßnahme. Die Berechnung misst die Teilnahme, ermöglicht sie aber nicht.",
          },
          {
            text: "Mehr Aufträge ohne zusätzliche Zeitplanung annehmen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Dadurch entsteht keine verlässliche Gelegenheit für Fortbildungen.",
          },
          {
            text: "Fortbildungszeiten rechtzeitig in der Einsatzplanung berücksichtigen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Das erleichtert die Teilnahme im Arbeitsalltag.",
          },
        ],
      },
      {
        context: 'Finanzperspektive — Ziel: „Rückstände aus fälligen Kundenrechnungen von 145.000 € auf höchstens 110.000 € senken."',
        correctCount: 2,
        items: [
          {
            text: "Überfällige Rechnungen regelmäßig prüfen und offene Fragen mit Kunden zeitnah klären.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Ungeklärte Forderungen können so früher bearbeitet werden.",
          },
          {
            text: "Die Höhe der Rückstände nur am Jahresende dokumentieren.",
            correct: false,
            feedback: "Das war leider noch nicht die passende Maßnahme. Eine späte Erfassung senkt offene Forderungen nicht unmittelbar.",
          },
          {
            text: "Einen verlässlichen Ablauf für freundliche Zahlungserinnerungen festlegen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Fällige Beträge können dadurch eher eingehen.",
          },
          {
            text: "Rechnungen grundsätzlich erst mehrere Monate nach der Leistung versenden.",
            correct: false,
            feedback: "Das passt hier leider nicht. Später verschickte Rechnungen würden den Zahlungseingang eher verzögern.",
          },
        ],
      },
    ],
  },

  zusammenhaenge: {
    intro:
      'Ich beantworte fünf Multiple-Choice-Fragen nacheinander. Die Zahl der richtigen Antworten wird bei jeder Frage angezeigt. Fehlt eine passende Antwort, lese ich: „Eine mögliche Wirkung fehlt noch. Prüfe, welche andere Perspektive betroffen sein könnte."',
    questions: [
      {
        prompt: "Nordstern reduziert Fehler bei der Auftragsbearbeitung. Welche zwei Wirkungen sind plausibel?",
        options: [
          {
            text: "Erforderliche Nacharbeit könnte sinken.",
            isCorrect: true,
            feedback: "Genau. Weniger Fehler können zusätzlichen Arbeitsaufwand verringern.",
          },
          {
            text: "Die Zufriedenheit der Kundschaft könnte steigen.",
            isCorrect: true,
            feedback: "Genau. Zuverlässigere Leistungen können dazu beitragen.",
          },
          {
            text: "Der Umsatz verdoppelt sich automatisch.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Aus weniger Fehlern folgt keine bestimmte Umsatzsteigerung.",
          },
          {
            text: "Schulungen werden dauerhaft überflüssig.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Beschäftigte müssen sich auch bei sinkender Fehlerzahl weiterentwickeln können.",
          },
        ],
      },
      {
        prompt: "Beschäftigte nehmen an passenden Fortbildungen teil. Welche Entwicklung könnte zunächst folgen? Wähle eine Antwort.",
        options: [
          {
            text: "Sie können neue Arbeitsmethoden bei ihren Aufgaben anwenden.",
            isCorrect: true,
            feedback: "Genau. Das ist eine mögliche erste Wirkung von Fortbildung.",
          },
          {
            text: "Die Liquiditätsreserve steigt sofort.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Eine Fortbildung erhöht verfügbare Mittel nicht unmittelbar.",
          },
          {
            text: "Alle Aufträge sind automatisch fehlerfrei.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Qualifizierung kann helfen, garantiert aber keine fehlerfreien Ergebnisse.",
          },
          {
            text: "Alle Kunden empfehlen Nordstern unmittelbar weiter.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Eine Empfehlung hängt von den tatsächlichen Erfahrungen der Kundschaft ab.",
          },
        ],
      },
      {
        prompt: "Die durchschnittliche Bearbeitungszeit sinkt. Welche drei Entwicklungen sind plausibel?",
        options: [
          {
            text: "Kunden könnten Ergebnisse früher erhalten.",
            isCorrect: true,
            feedback: "Genau. Eine kürzere Bearbeitungszeit kann Leistungen früher verfügbar machen.",
          },
          {
            text: "Der Zeitaufwand je vergleichbarem Auftrag könnte sinken.",
            isCorrect: true,
            feedback: "Genau. Das sollte anhand tatsächlich eingesetzter Arbeitszeit geprüft werden.",
          },
          {
            text: "Die Kundenzufriedenheit könnte steigen.",
            isCorrect: true,
            feedback: "Genau. Kürzere Wartezeiten können dazu beitragen.",
          },
          {
            text: "Die Nachfrage wächst garantiert um exakt 20 %.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Eine kürzere Bearbeitungszeit legt keine bestimmte Nachfrageentwicklung fest.",
          },
        ],
      },
      {
        prompt: "Nordstern wertet Kundenrückmeldungen aus. Welche zwei Aussagen sind sinnvoll?",
        options: [
          {
            text: "Wiederkehrende Probleme können erkennbar werden.",
            isCorrect: true,
            feedback: "Genau. Die Auswertung kann zeigen, wo mehrere Kunden ähnliche Erfahrungen machen.",
          },
          {
            text: "Abläufe können auf Grundlage der Ergebnisse gezielt angepasst werden.",
            isCorrect: true,
            feedback: "Genau. So kann eine Rückmeldung zu einer konkreten Verbesserung führen.",
          },
          {
            text: "Die Umfrage allein garantiert bereits eine Verbesserung.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Für eine Verbesserung müssen Erkenntnisse ausgewertet und gegebenenfalls umgesetzt werden.",
          },
          {
            text: "Finanzkennzahlen werden dadurch überflüssig.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Auch verbesserte Leistungen müssen wirtschaftlich tragfähig bleiben.",
          },
        ],
      },
      {
        prompt: "Die Erlöse von Nordstern steigen. Welche Aussage ist am besten begründet? Wähle eine Antwort.",
        options: [
          {
            text: "Nordstern sollte prüfen, ob mehr Aufträge, andere Preise oder weitere Faktoren dazu beigetragen haben.",
            isCorrect: true,
            feedback: "Genau. Eine Finanzkennzahl zeigt eine Entwicklung, erklärt ihre Ursache aber nicht allein.",
          },
          {
            text: "Höhere Erlöse beweisen fehlerfreie Abläufe.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Aus Erlösen lässt sich die Fehlerzahl nicht unmittelbar ablesen.",
          },
          {
            text: "Die Mitarbeiterbindung ist zwangsläufig gestiegen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Dafür müsste Nordstern geeignete Personalkennzahlen betrachten.",
          },
          {
            text: "Alle anderen Kennzahlen werden überflüssig.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Gerade die anderen Perspektiven helfen, Ursachen und Folgen zu verstehen.",
          },
        ],
      },
    ],
  },

  wirkungsketten: {
    intro:
      "Ich sehe jeweils vier nummerierte freie Felder und gemischte Aussagen. Ich ziehe sie in eine plausible Reihenfolge. Die Wirkungen sind möglich, nicht garantiert.",
    tasks: [
      {
        prompt: "Nordstern investiert in die Fähigkeiten seiner Beschäftigten. Sortiere vier mögliche Entwicklungen.",
        items: [
          "Beschäftigte erwerben passende Fähigkeiten.",
          "Abläufe werden zuverlässiger gestaltet.",
          "Die Kundenzufriedenheit könnte steigen.",
          "Langfristig könnte dies die wirtschaftliche Lage unterstützen.",
        ],
      },
      {
        prompt: "Nordstern möchte Aufträge schneller bearbeiten. Sortiere vier mögliche Entwicklungen.",
        items: [
          "Arbeitsschritte werden besser abgestimmt.",
          "Die Bearbeitungszeit könnte sinken.",
          "Kunden erhalten Leistungen früher.",
          "Die Kundenzufriedenheit könnte steigen.",
        ],
      },
      {
        prompt: "Nordstern möchte Fehler früh erkennen. Sortiere vier mögliche Entwicklungen.",
        items: [
          "Eine zusätzliche Qualitätsprüfung wird eingeführt.",
          "Fehler werden früher erkannt.",
          "Nacharbeit könnte sinken.",
          "Kosten je Auftrag könnten zurückgehen.",
        ],
      },
      {
        prompt: "Nordstern nutzt Rückmeldungen seiner Kundschaft. Sortiere vier mögliche Entwicklungen.",
        items: [
          "Kundenrückmeldungen werden ausgewertet.",
          "Wiederkehrende Wünsche werden erkennbar.",
          "Leistungen werden gezielt angepasst.",
          "Die Nachfrage könnte steigen.",
        ],
      },
    ],
  },

  selbsteinschaetzungPrompt:
    'Wie sicher fühlst du dich jetzt im Umgang mit der Balanced Scorecard? Wähle einen Wert von 0 bis 10. 0 bedeutet „gar nicht sicher", 5 „teils/teils" und 10 „sehr sicher".',
};
