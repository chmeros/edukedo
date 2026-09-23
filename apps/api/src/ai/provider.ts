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
  parts: { prompt: string; points: number; answerText: string }[];
}

export interface GeneratedMcQuestion {
  prompt: string;
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
}

export interface AiProvider {
  /** F-70: liefert einen freien Korrekturvorschlag-Text — kein Punkte-/Richtig-falsch-Urteil,
   * siehe F-70: "klar als unverbindliche Lernhilfe ohne Anspruch auf offizielle Korrektheit zu
   * kennzeichnen" (die Kennzeichnung selbst übernimmt das Frontend, nicht der Text hier). */
  gradeFallaufgabe(input: FallaufgabeGradingInput): Promise<string>;
  /** F-71: "nach vorgegebenem Schema" — hier auf quiz_mc beschränkt (siehe ai/index.ts). */
  generateMcQuestion(input: { topicHint: string; fachgebietTitle: string }): Promise<GeneratedMcQuestion>;
}
