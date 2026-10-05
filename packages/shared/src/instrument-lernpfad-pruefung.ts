import { instrumentLernpfadPayloadSchema } from "./schemas/instrument-lernpfad";

/**
 * F-168: Prüfung von Instrumenten-Lernpfad-Inhalten über das Zod-Schema hinaus. Fängt typische
 * Redaktionsfehler ab, die erst im Betrieb auffielen: doppelte Texte (die Prüfung identifiziert Elemente
 * über ihren Text), falsche `correctCount`-Angaben, Zonen ohne passende Begriffe, zu kleine Pools und
 * nicht eindeutig lösbare Sortieraufgaben. Liefert eine Liste verständlicher Meldungen (leer = in Ordnung).
 */
export function pruefeLernpfadPayload(payload: unknown): string[] {
  const parsed = instrumentLernpfadPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return parsed.error.issues.map((issue) => `Schema: ${issue.path.join(".")}: ${issue.message}`);
  }
  const p = parsed.data;
  const probleme: string[] = [];
  const doppelte = (texte: string[]) => texte.filter((text, index) => texte.indexOf(text) !== index);

  // Wissensfragen (Stationen 1 und 6)
  for (const [name, station, erwarteteFragen] of [
    ["grundlagenfragen", p.grundlagenfragen, 3],
    ["zusammenhaenge", p.zusammenhaenge, 5],
  ] as const) {
    if (station.questions.length !== erwarteteFragen) probleme.push(`${name}: ${erwarteteFragen} Fragen erwartet, ${station.questions.length} gefunden.`);
    station.questions.forEach((frage, index) => {
      const richtige = frage.options.filter((option) => option.isCorrect).length;
      if (richtige < 1 || richtige === frage.options.length) probleme.push(`${name}[${index}]: mindestens eine, aber nicht alle Optionen müssen richtig sein.`);
      for (const text of doppelte(frage.options.map((option) => option.text))) probleme.push(`${name}[${index}]: doppelte Option "${text}".`);
    });
  }

  // Pool-Stationen (Struktur erkennen: 1 Runde; Entscheidungen: 4 Runden mit Kontext)
  const pruefePoolRunden = (name: string, rounds: typeof p.strukturErkennen.rounds, erwarteteRunden: number, mitKontext: boolean) => {
    if (rounds.length !== erwarteteRunden) probleme.push(`${name}: ${erwarteteRunden} Runde(n) erwartet, ${rounds.length} gefunden.`);
    rounds.forEach((runde, index) => {
      const richtige = runde.items.filter((item) => item.correct).length;
      if (richtige !== runde.correctCount) probleme.push(`${name}[${index}]: correctCount ${runde.correctCount}, aber ${richtige} Begriffe sind als richtig markiert.`);
      if (richtige < 1 || richtige >= runde.items.length) probleme.push(`${name}[${index}]: es braucht richtige und falsche Begriffe.`);
      for (const text of doppelte(runde.items.map((item) => item.text))) probleme.push(`${name}[${index}]: doppelter Begriff "${text}".`);
      if (mitKontext && !runde.context) probleme.push(`${name}[${index}]: Kontext fehlt.`);
    });
  };
  pruefePoolRunden("strukturErkennen", p.strukturErkennen.rounds, 1, false);
  pruefePoolRunden("massnahmenWahl", p.massnahmenWahl.rounds, 4, true);

  // Zonen-Zuordnungen (Station 3 grob, Station 4 gepoolt)
  const pruefeZonen = (name: string, zones: { key: string }[], items: { text: string; zoneKey: string }[]) => {
    const schluessel = new Set(zones.map((zone) => zone.key));
    if (schluessel.size !== zones.length) probleme.push(`${name}: doppelte Zonen-Schlüssel.`);
    for (const item of items) if (!schluessel.has(item.zoneKey)) probleme.push(`${name}: "${item.text}" verweist auf unbekannte Zone "${item.zoneKey}".`);
    for (const text of doppelte(items.map((item) => item.text))) probleme.push(`${name}: doppelter Begriff "${text}".`);
    for (const zone of zones) if (!items.some((item) => item.zoneKey === zone.key)) probleme.push(`${name}: Zone "${zone.key}" hat keinen Begriff.`);
  };
  pruefeZonen("zieleZuordnen", p.zieleZuordnen.zones, p.zieleZuordnen.items);
  pruefeZonen("messbareZieleZuordnen", p.messbareZieleZuordnen.zones, p.messbareZieleZuordnen.pool);
  const gepoolt = p.messbareZieleZuordnen;
  for (const zone of gepoolt.zones) {
    const anzahl = gepoolt.pool.filter((item) => item.zoneKey === zone.key).length;
    if (anzahl < gepoolt.kernAnzahlProZone + 1) probleme.push(`messbareZieleZuordnen: Zone "${zone.key}" hat ${anzahl} Begriffe, nötig sind mindestens ${gepoolt.kernAnzahlProZone + 1} (Grunddurchlauf plus Zusatz).`);
  }

  // Sortieraufgaben (Station 7)
  if (p.wirkungsketten.tasks.length !== 4) probleme.push(`wirkungsketten: 4 Aufgaben erwartet, ${p.wirkungsketten.tasks.length} gefunden.`);
  p.wirkungsketten.tasks.forEach((aufgabe, index) => {
    for (const text of doppelte(aufgabe.items)) probleme.push(`wirkungsketten[${index}]: doppelter Eintrag "${text}".`);
  });

  // Stationsnamen sind für neue Lernpfade Pflicht (nur der BSC-Pfad nutzt die Standardnamen)
  return probleme;
}

/** Zusätzliche Pflichtprüfung für neue (nicht-BSC-)Lernpfade: alle sieben Stationsnamen gesetzt. */
export function pruefeStationsnamenVollstaendig(payload: unknown): string[] {
  const parsed = instrumentLernpfadPayloadSchema.safeParse(payload);
  if (!parsed.success) return [];
  const namen = parsed.data.stationsnamen ?? {};
  return (["grundlagenfragen", "strukturErkennen", "zieleZuordnen", "messbareZieleZuordnen", "massnahmenWahl", "zusammenhaenge", "wirkungsketten"] as const)
    .filter((schluessel) => !namen[schluessel])
    .map((schluessel) => `stationsnamen.${schluessel} fehlt.`);
}
