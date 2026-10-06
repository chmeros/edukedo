import { troubleshootingPayloadSchema } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { troubleshootingIndustrieIot } from "./content/game-troubleshooting-industrie-iot";

/**
 * Troubleshooting-Detektiv, Set „Industrie und IoT" (setKey "industrie-iot", nur Digitale Vernetzung):
 * Qualitätsregeln für die Inhalte, geprüft ohne Datenbank.
 */
const SCHICHTEN = [
  "Bitübertragung (Schicht 1)",
  "Sicherung (Schicht 2)",
  "Vermittlung (Schicht 3)",
  "Transport (Schicht 4)",
  "Anwendung (Schicht 7)",
];

describe("Troubleshooting-Set Industrie und IoT", () => {
  const parsed = troubleshootingPayloadSchema.parse(troubleshootingIndustrieIot);

  it("besteht die Schema-Validierung und hat genau zehn Fälle", () => {
    expect(troubleshootingPayloadSchema.safeParse(troubleshootingIndustrieIot).success).toBe(true);
    expect(parsed.faelle).toHaveLength(10);
  });

  it("nummeriert die Fälle lückenlos ab 1 mit eindeutigen Nummern und Titeln", () => {
    const nummern = parsed.faelle.map((fall) => fall.nummer);
    expect(nummern).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const titel = parsed.faelle.map((fall) => fall.titel);
    expect(new Set(titel).size).toBe(titel.length);
  });

  it("hat je Fall eindeutige Options-IDs und Optionstexte", () => {
    for (const fall of parsed.faelle) {
      for (const optionen of [fall.schichtOptionen, fall.ursachenOptionen]) {
        expect(new Set(optionen.map((option) => option.id)).size, `Fall ${fall.nummer}`).toBe(optionen.length);
        expect(new Set(optionen.map((option) => option.text)).size, `Fall ${fall.nummer}`).toBe(optionen.length);
      }
    }
  });

  it("verweist mit der richtigen Antwort auf genau eine vorhandene Option", () => {
    for (const fall of parsed.faelle) {
      expect(fall.schichtOptionen.filter((option) => option.id === fall.richtigeSchicht), `Fall ${fall.nummer}`).toHaveLength(1);
      expect(fall.ursachenOptionen.filter((option) => option.id === fall.richtigeUrsache), `Fall ${fall.nummer}`).toHaveLength(1);
    }
  });

  it("verwendet für die Schichtwahl nur die Schichten des Netzwerk-Sets", () => {
    for (const fall of parsed.faelle) {
      for (const option of fall.schichtOptionen) {
        expect(SCHICHTEN, `Fall ${fall.nummer}`).toContain(option.text);
      }
    }
  });

  it("beginnt bei den unteren Schichten und endet mit Fällen der Anwendungsschicht (steigende Schwierigkeit)", () => {
    const richtigeSchichten = parsed.faelle.map(
      (fall) => fall.schichtOptionen.find((option) => option.id === fall.richtigeSchicht)!.text,
    );
    expect(richtigeSchichten.slice(0, 4)).toEqual([
      "Bitübertragung (Schicht 1)",
      "Sicherung (Schicht 2)",
      "Vermittlung (Schicht 3)",
      "Transport (Schicht 4)",
    ]);
    expect(richtigeSchichten.slice(4).every((text) => text === "Anwendung (Schicht 7)")).toBe(true);
    // Die späteren Fälle bieten mehr Auswahlmöglichkeiten bei der Schichtwahl.
    expect(parsed.faelle[0]!.schichtOptionen.length).toBeLessThanOrEqual(parsed.faelle[9]!.schichtOptionen.length);
  });

  it("verrät die Lösung weder im Titel noch in den Symptomen (Optionstext der richtigen Ursache kommt nicht vor)", () => {
    for (const fall of parsed.faelle) {
      const ursache = fall.ursachenOptionen.find((option) => option.id === fall.richtigeUrsache)!.text;
      expect(fall.titel).not.toContain(ursache);
      expect(fall.szenario).not.toContain(ursache);
      for (const symptom of fall.symptome) expect(symptom).not.toContain(ursache);
    }
  });

  it("hat die richtige Ursache an wechselnden Positionen (kein festes Muster)", () => {
    const positionen = parsed.faelle.map((fall) => fall.ursachenOptionen.findIndex((option) => option.id === fall.richtigeUrsache));
    expect(new Set(positionen).size).toBeGreaterThanOrEqual(3);
  });

  it("verwendet in allen Texten typografische statt gerader Anführungszeichen", () => {
    for (const fall of parsed.faelle) {
      const texte = [
        fall.titel,
        fall.szenario,
        fall.erklaerung,
        ...fall.symptome,
        ...fall.schichtOptionen.map((option) => option.text),
        ...fall.ursachenOptionen.map((option) => option.text),
      ];
      for (const text of texte) expect(text, `Fall ${fall.nummer}`).not.toContain('"');
    }
    expect(parsed.abschlussmeldung).not.toContain('"');
  });
});
