import { describe, expect, it } from "vitest";
import { buildDesiredItems } from "./content-desired";

/**
 * Entscheidung 11.10.2026 (FL-IM-55, FL-TL-46, FL-AEVO-29): Erwartungshorizont und Rückfragen unter einer Fachgesprächsfrage landen
 * im Payload des Items; Fragen ohne Unterpunkte behalten den bisherigen Payload (nur `themaTitel`), damit der Abgleich sie nicht als
 * geändert meldet.
 */
describe("buildDesiredItems: Fachgesprächsfragen", () => {
  const body = [
    "## Fachgesprächsfragen",
    "",
    "### 1.1 Netzwerke",
    "",
    "- Erläutern Sie das Hub-and-Spoke-Prinzip.",
    "  - Erwartung: Bündelung über Hubs.",
    "  - Rückfrage: Wie wählen Sie den Standort?",
    "- Eine Frage ohne Unterpunkte?",
    "",
  ].join("\n");

  it("nimmt Erwartung und Rückfragen nur auf, wenn sie vorhanden sind", () => {
    const items = buildDesiredItems({ kursSlug: "test-kurs", themaTitle: "Fachgespräche", body }).filter((item) => item.type === "fachgespraech_frage");
    expect(items).toHaveLength(2);
    expect(items[0]!.payload).toEqual({ themaTitel: "1.1 Netzwerke", erwartung: ["Bündelung über Hubs."], rueckfragen: ["Wie wählen Sie den Standort?"] });
    expect(items[1]!.payload).toEqual({ themaTitel: "1.1 Netzwerke" });
  });

  it("gibt beiden Fragen unterschiedliche Kennungen, die nur vom Fragetext abhängen", () => {
    const items = buildDesiredItems({ kursSlug: "test-kurs", themaTitle: "Fachgespräche", body }).filter((item) => item.type === "fachgespraech_frage");
    const ohneUnterpunkte = buildDesiredItems({
      kursSlug: "test-kurs",
      themaTitle: "Fachgespräche",
      body: ["## Fachgesprächsfragen", "", "### 1.1 Netzwerke", "", "- Erläutern Sie das Hub-and-Spoke-Prinzip.", ""].join("\n"),
    }).filter((item) => item.type === "fachgespraech_frage");
    expect(items[0]!.key).toBe(ohneUnterpunkte[0]!.key);
    expect(items[0]!.key).not.toBe(items[1]!.key);
  });
});
