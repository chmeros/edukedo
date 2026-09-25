/**
 * F-70/F-71/F-72: schmale, austauschbare Schnittstelle zu "der KI" — der Anforderungskatalog
 * lässt den konkreten Anbieter bewusst offen (F-72: Hybrid-Modell, selbst gehostet für F-71,
 * optional eine externe EU-konforme Managed-API für F-70, mit automatischem Fallback). Das
 * selbst gehostete Modell wird laut Architekturplanung Abschnitt 12/13 bewusst erst "kurz vor
 * Phase 4" ausgewählt — diese Schnittstelle entkoppelt die restliche Infrastruktur (Job-Queue,
 * Endpunkte, Freischalt-Flags, Frontend) vollständig von dieser noch offenen Entscheidung: nur
 * `placeholder-provider.ts` (aktuell einzige Implementierung, siehe dort) muss später gegen
 * einen echten Anbieter ausgetauscht werden, siehe `index.ts` als einzige Austauschstelle.
 */
export interface FallaufgabeGradingInput {
  fallaufgabePrompt: string;
  /** Frei formulierte, redaktionell geprüfte Bewertungshinweise des Content-Autors
   * (`content_item_version.explanation`) — F-70: "ausschließlich auf Basis eigener, frei
   * formulierter Bewertungskriterien — kein Rückgriff auf echte IHK-Musterlösungen". */
  criteria: string;
  /** `selfAssessedPoints` (Nutzer-Vorgabe 25.09.2026) wird mitgegeben, damit die KI ihr Feedback
   * auch wertschätzend auf die eigene Selbsteinschätzung beziehen kann (z. B. Lob für eine
   * treffsichere Selbsteinschätzung, motivierende Einordnung bei einer größeren Abweichung). */
  parts: { prompt: string; points: number; answerText: string; selfAssessedPoints: number }[];
}

/** F-70 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): je Teilaufgabe EIN
 * zusammenhängender Feedback-Absatz plus ein KI-Punktvorschlag — `points` ist bereits auf
 * `[0, part.points]` der zugehörigen Teilaufgabe begrenzt (Aufrufstelle klemmt zusätzlich
 * serverseitig, siehe process-grading-job.ts, analog zur Selbsteinschätzung in exam.ts). */
export interface FallaufgabeGradingPart {
  feedback: string;
  points: number;
}

export interface FallaufgabeGradingResult {
  parts: FallaufgabeGradingPart[];
}

export interface GeneratedMcQuestion {
  prompt: string;
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
}

export interface AiProvider {
  /** F-70: liefert je Teilaufgabe einen konkreten Korrekturvorschlag-Absatz UND einen
   * KI-Punktvorschlag zum Vergleich mit der eigenen Selbsteinschätzung (Nutzer-Vorgabe
   * 25.09.2026) — weiterhin klar als unverbindliche Lernhilfe ohne Anspruch auf offizielle
   * Korrektheit zu kennzeichnen (die Kennzeichnung selbst übernimmt das Frontend). Der
   * Feedback-Absatz ist wertschätzend formuliert (Nutzer-Vorgabe 25.09.2026): Lob bei
   * gutem/sehr gutem Ergebnis, motivierende Einordnung bei schwächerem Ergebnis — jeweils auch im
   * Bezug zur mitgegebenen `selfAssessedPoints`. Die Punktvergabe selbst ist bewusst STRENG
   * (weiteres Nutzer-Feedback 25.09.2026, "zu wohlwollend"): die konkrete Implementierung
   * (`ollama-provider.ts`) instruiert das Modell in der Rolle einer echten, strengen Prüfung,
   * bewertet explizit gegen den in der Aufgabenstellung geforderten Operator/Ausführungsgrad
   * (Nennen vs. Beschreiben vs. Erläutern/Begründen vs. Analysieren/Bewerten) sowie gegen den
   * Umfang/die Tiefe der Antwort im Verhältnis zur Punktzahl — volle Punktzahl ist die Ausnahme
   * für eine wirklich vollständige Antwort, nicht der Normalfall. */
  gradeFallaufgabe(input: FallaufgabeGradingInput): Promise<FallaufgabeGradingResult>;
  /** F-71: "nach vorgegebenem Schema" — hier auf quiz_mc beschränkt (siehe ai/index.ts). */
  generateMcQuestion(input: { topicHint: string; fachgebietTitle: string }): Promise<GeneratedMcQuestion>;
}
