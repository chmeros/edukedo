import type { AiProvider } from "./provider";

/**
 * Nutzer-Entscheidung 23.09.2026 (siehe Architekturplanung Abschnitt 13): "Infrastruktur jetzt,
 * echte KI-Anbindung später" — diese Implementierung ruft KEIN echtes KI-Modell auf, sondern
 * liefert deterministische, klar als Platzhalter gekennzeichnete Ausgaben. Bewusst NIE ein Text,
 * der wie ein echtes Bewertungs-/Generierungsergebnis wirken könnte, damit weder in der UI noch
 * in Tests versehentlich ein fabriziertes Ergebnis als echt durchgeht. Die künstliche Verzögerung
 * (`simulateLatency`) macht die asynchrone Job-Queue (F-70) auch lokal sichtbar/beobachtbar
 * (Status wechselt tatsächlich über eine kurze Zeitspanne von "queued" über "processing" zu
 * "completed"), statt sofort aufzulösen.
 */
function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const placeholderAiProvider: AiProvider = {
  async gradeFallaufgabe({ parts }) {
    await simulateLatency(1500);

    const partLines = parts.map((part, index) => {
      const trimmed = part.answerText.trim();
      const summary = trimmed.length > 0 ? `${trimmed.length} Zeichen eingereicht.` : "keine Antwort eingereicht.";
      return `Teilaufgabe ${index + 1} (${part.points} Punkte): ${summary}`;
    });

    return [
      "[Entwickler-Platzhalter — keine echte KI-Bewertung]",
      "Diese Rückmeldung stammt aus einer deterministischen Platzhalter-Implementierung (kein echtes KI-Modell, siehe F-72).",
      "Sobald ein echter Anbieter angebunden ist, ersetzt dessen Bewertung diesen Text automatisch.",
      "",
      ...partLines,
    ].join("\n");
  },

  async generateMcQuestion({ topicHint, fachgebietTitle }) {
    await simulateLatency(1500);

    return {
      prompt: `[Entwickler-Platzhalter] Frage zu „${topicHint}" (${fachgebietTitle}) — nicht von einem echten KI-Modell erzeugt.`,
      explanation: "[Entwickler-Platzhalter] Diese Erklärung stammt aus einer deterministischen Platzhalter-Implementierung, kein echtes KI-Modell.",
      options: [
        { text: `[Platzhalter] Richtige Antwort zu „${topicHint}"`, isCorrect: true },
        { text: "[Platzhalter] Falsche Antwort A", isCorrect: false },
        { text: "[Platzhalter] Falsche Antwort B", isCorrect: false },
        { text: "[Platzhalter] Falsche Antwort C", isCorrect: false },
      ],
    };
  },
};
