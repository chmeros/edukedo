import { readFile } from "node:fs/promises";
import { KATALOG_INSTRUMENTE, sindInstrumentFragenAktiv } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { buildDesiredItems } from "./content-desired";
import { contentDir } from "./content-dir";
import { listMarkdownFiles } from "./content-keys";
import { splitFrontmatter } from "./content-parser";

/**
 * Review B7 (SHR-10, UXT-I-02): Die Allowlist der Kursprofile gilt auch für die Fragen zu den Instrumenten. Geprüft gegen den
 * echten Content: Keine aktive Frage gehört zu einem Instrumenttyp, den der Kurs nicht anbietet (oder der noch ein Entwurf ist).
 */
describe("Instrument-Fragen und Kursangebot (B7)", () => {
  it("sindInstrumentFragenAktiv: Typ im Angebot, Entwurf, fremder Typ, Kurs ohne Angebot", () => {
    expect(sindInstrumentFragenAktiv("fachinformatiker-systemintegration", "swot")).toBe(false); // nicht im Kurs
    expect(sindInstrumentFragenAktiv("fachinformatiker-systemintegration", "authfaktoren")).toBe(false); // Entwurf
    expect(sindInstrumentFragenAktiv("fachinformatiker-systemintegration", "switching")).toBe(true); // angeboten
    expect(sindInstrumentFragenAktiv("fachinformatiker-systemintegration", "quiz_mc")).toBe(true); // kein Instrument
    expect(sindInstrumentFragenAktiv("mathematik-9", "gantt")).toBe(true); // Kurs ohne Angebot
  });

  it("im echten Content ist keine aktive Zonenfrage einem nicht angebotenen Instrument zugeordnet", async () => {
    const instrumente = new Set<string>(KATALOG_INSTRUMENTE);
    const verstoesse: string[] = [];
    let geprueft = 0;
    for (const datei of await listMarkdownFiles(contentDir())) {
      let parsed: ReturnType<typeof splitFrontmatter>;
      try {
        parsed = splitFrontmatter((await readFile(datei, "utf8")).replace(/\r\n/g, "\n"));
      } catch {
        continue; // Übersichtsseiten ohne Frontmatter, wie im Importer
      }
      const { frontmatter, body } = parsed;
      if (!frontmatter.kurs_slug) continue;
      for (const item of buildDesiredItems({ kursSlug: frontmatter.kurs_slug, themaTitle: frontmatter.thema_title ?? "", body })) {
        if (!instrumente.has(item.type)) continue;
        geprueft += 1;
        if (item.isActive && !sindInstrumentFragenAktiv(frontmatter.kurs_slug, item.type)) {
          verstoesse.push(`${frontmatter.kurs_slug}: ${item.type} (${item.key})`);
        }
      }
    }
    expect(geprueft).toBeGreaterThan(100);
    expect(verstoesse).toEqual([]);
  });
});
