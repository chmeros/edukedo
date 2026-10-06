import {
  buildKreuzwortraetselPuzzle,
  checkMemoryPaar,
  kreuzwortraetselPayloadSchema,
  memoryPayloadSchema,
  shapeMemoryRunde,
  verifyCrosswordGrid,
} from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, Nutzer-Vorgabe vom 06.10.2026): gemeinsame Prüfungen für die Wort- und Paar-Pools der Spiele
 * Kreuzworträtsel und Memory. Die Content-Tests der einzelnen Sets rufen nur diese Funktionen auf und erwarten eine leere Fehlerliste.
 * Regeln: genug Material für wechselnde Rätsel, kurze Wörter (keine Fachwort-Ungetüme), keine Lösung im Hinweis, fehlerfreie Gitter.
 */

export function pruefeKreuzwortPool(rohPayload: unknown, optionen: { mindestPool?: number } = {}): string[] {
  const fehler: string[] = [];
  const geparst = kreuzwortraetselPayloadSchema.safeParse(rohPayload);
  if (!geparst.success) return [`Schema: ${geparst.error.message}`];
  const payload = geparst.data;
  const mindestPool = optionen.mindestPool ?? 26;

  if (payload.wortzahl === undefined || payload.wortzahl < 8 || payload.wortzahl > 12) fehler.push("wortzahl muss zwischen 8 und 12 liegen.");
  if (payload.woerter.length < mindestPool) fehler.push(`Der Pool braucht mindestens ${mindestPool} Wörter (hat ${payload.woerter.length}).`);

  const loesungen = payload.woerter.map((wort) => wort.loesung);
  if (new Set(loesungen).size !== loesungen.length) fehler.push("Lösungswörter sind nicht eindeutig.");
  if (new Set(payload.woerter.map((wort) => wort.nummer)).size !== payload.woerter.length) fehler.push("Nummern sind nicht eindeutig.");

  const lange = payload.woerter.filter((wort) => wort.loesung.length > 10);
  const kurz = payload.woerter.filter((wort) => wort.loesung.length <= 8);
  if (lange.length > 5) fehler.push(`Zu viele lange Wörter (über 10 Buchstaben): ${lange.map((w) => w.loesung).join(", ")}.`);
  if (kurz.length < payload.woerter.length * 0.6) fehler.push("Mindestens 60 % der Wörter sollen höchstens 8 Buchstaben haben.");

  for (const wort of payload.woerter) {
    if (wort.loesung.length < 3) fehler.push(`${wort.loesung}: mindestens 3 Buchstaben.`);
    if (wort.loesung.length > 12) fehler.push(`${wort.loesung}: höchstens 12 Buchstaben.`);
    if (wort.hinweis.toUpperCase().includes(wort.loesung)) fehler.push(`${wort.loesung}: Die Lösung steht im Hinweis.`);
    if (wort.tipp.toUpperCase().includes(wort.loesung)) fehler.push(`${wort.loesung}: Die Lösung steht im Tipp.`);
    if (wort.hinweis.length > 140) fehler.push(`${wort.loesung}: Hinweis länger als 140 Zeichen.`);
  }

  const auswahlen = new Set<string>();
  for (let seed = 1; seed <= 40; seed += 1) {
    const puzzle = buildKreuzwortraetselPuzzle(payload, seed);
    const mindestens = (payload.wortzahl ?? 10) - 1;
    if (puzzle.woerter.length < mindestens) fehler.push(`Seed ${seed}: nur ${puzzle.woerter.length} Wörter platziert.`);
    const gitterFehler = verifyCrosswordGrid(puzzle.woerter);
    if (gitterFehler.length > 0) fehler.push(`Seed ${seed}: ${gitterFehler[0]}`);
    auswahlen.add(puzzle.woerter.map((wort) => wort.loesung).sort().join("|"));
  }
  if (payload.woerter.length >= (payload.wortzahl ?? 10) + 8 && auswahlen.size < 25) {
    fehler.push(`Zu wenig Abwechslung: nur ${auswahlen.size} verschiedene Wortauswahlen in 40 Rätseln.`);
  }
  return fehler;
}

export function pruefeMemoryPool(rohPayload: unknown, optionen: { mindestProRunde?: number } = {}): string[] {
  const fehler: string[] = [];
  const geparst = memoryPayloadSchema.safeParse(rohPayload);
  if (!geparst.success) return [`Schema: ${geparst.error.message}`];
  const payload = geparst.data;
  const mindestProRunde = optionen.mindestProRunde ?? 10;

  if (payload.runden.length !== 4) fehler.push("Es müssen genau vier Runden vorhanden sein.");
  if (payload.paareProRunde !== 6) fehler.push("paareProRunde muss 6 sein.");
  if (new Set(payload.paare.map((paar) => paar.nummer)).size !== payload.paare.length) fehler.push("Paar-Nummern sind nicht eindeutig.");

  const texte = payload.paare.flatMap((paar) => [paar.begriff, paar.bedeutung]);
  if (new Set(texte).size !== texte.length) fehler.push("Kartentexte sind nicht eindeutig (Begriffe und Bedeutungen dürfen sich im ganzen Set nicht wiederholen).");
  for (const paar of payload.paare) {
    if (paar.begriff.length > 36) fehler.push(`Paar ${paar.nummer}: Begriff länger als 36 Zeichen.`);
    if (paar.bedeutung.length > 64) fehler.push(`Paar ${paar.nummer}: Bedeutung länger als 64 Zeichen.`);
    if (paar.bedeutung.toLowerCase().includes(paar.begriff.toLowerCase()) && paar.begriff.length > 4) {
      fehler.push(`Paar ${paar.nummer}: Der Begriff steht in der Bedeutung.`);
    }
  }

  for (const runde of payload.runden) {
    const pool = payload.paare.filter((paar) => paar.runde === runde.nummer);
    if (pool.length < mindestProRunde) fehler.push(`Runde ${runde.nummer}: mindestens ${mindestProRunde} Paare im Pool (hat ${pool.length}).`);
    if (pool.length > 12) fehler.push(`Runde ${runde.nummer}: höchstens 12 Paare im Pool.`);

    const auswahlen = new Set<string>();
    for (let seed = 1; seed <= 20; seed += 1) {
      const karten = shapeMemoryRunde(payload, runde.nummer, seed);
      if (karten.length !== 12) fehler.push(`Runde ${runde.nummer}, Seed ${seed}: ${karten.length} statt 12 Karten.`);
      if (new Set(karten.map((karte) => karte.text)).size !== karten.length) fehler.push(`Runde ${runde.nummer}, Seed ${seed}: doppelte Karten.`);
      auswahlen.add(
        karten
          .map((karte) => karte.text)
          .sort()
          .join("|"),
      );
    }
    if (pool.length > 6 && auswahlen.size < 10) fehler.push(`Runde ${runde.nummer}: zu wenig Abwechslung (${auswahlen.size} verschiedene Ziehungen in 20 Spielen).`);

    const erstes = pool[0];
    if (erstes) {
      const ergebnis = checkMemoryPaar(payload, runde.nummer, erstes.begriff, erstes.bedeutung);
      if (!ergebnis.correct) fehler.push(`Runde ${runde.nummer}: Die Paarprüfung erkennt das erste Paar nicht.`);
    }
  }
  return fehler;
}
