import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { extractSection, parseGlossar, splitFrontmatter } from "./content-parser";

/**
 * F-165: Qualitätsregeln für den Glossar-Content (`content/<kurs>/<fachgebiet>/glossar.md`), geprüft
 * gegen die Dateien selbst — ohne Datenbank. Fängt typische Redaktionsfehler früh ab: doppelte
 * Begriffe/Aliase je Kurs (der Import würde abbrechen), unbekannte Thema-Codes, Abschnitte, die keine
 * ###-Überschrift der Theorie sind (das Lesefenster fände den Sprung nicht), zu lange oder mit
 * Markdown versehene Definitionen.
 */
const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../content");

function glossarDateien(kursSlug: string): { fachgebiet: string; pfad: string }[] {
  const kursPfad = path.join(CONTENT_DIR, kursSlug);
  return readdirSync(kursPfad, { withFileTypes: true })
    .filter((eintrag) => eintrag.isDirectory())
    .map((eintrag) => ({ fachgebiet: eintrag.name, pfad: path.join(kursPfad, eintrag.name, "glossar.md") }))
    .filter(({ pfad }) => {
      try {
        readFileSync(pfad);
        return true;
      } catch {
        return false;
      }
    });
}

const KURSE_MIT_GLOSSAR = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((eintrag) => eintrag.isDirectory())
  .map((eintrag) => eintrag.name)
  .filter((slug) => glossarDateien(slug).length > 0);

describe("Glossar-Content (F-165)", () => {
  it("gibt es Glossare für die vier Fachinformatiker-Kurse", () => {
    expect(KURSE_MIT_GLOSSAR.filter((slug) => slug.startsWith("fachinformatiker-")).length).toBe(4);
  });

  for (const kursSlug of KURSE_MIT_GLOSSAR) {
    describe(kursSlug, () => {
      const namenBelegt = new Map<string, string>();

      for (const { fachgebiet, pfad } of glossarDateien(kursSlug)) {
        it(`${fachgebiet}/glossar.md: gültiges Format, bekannte Themen und Abschnitte, eindeutige Begriffe`, () => {
          const { frontmatter, body } = splitFrontmatter(readFileSync(pfad, "utf8"));
          expect(frontmatter.kurs_slug).toBe(kursSlug);
          expect(String(frontmatter.fachgebiet_code).toLowerCase()).toBe(fachgebiet);

          // Themen-Dateien des Fachgebiets: thema_code → ###-Überschriften der Theorie
          const abschnitteJeThema = new Map<string, Set<string>>();
          const fachgebietPfad = path.dirname(pfad);
          for (const datei of readdirSync(fachgebietPfad).filter((name) => /^\d/.test(name) && name.endsWith(".md"))) {
            const thema = splitFrontmatter(readFileSync(path.join(fachgebietPfad, datei), "utf8"));
            const theorie = extractSection(thema.body, "Theorie") ?? "";
            abschnitteJeThema.set(
              String(thema.frontmatter.thema_code),
              new Set([...theorie.matchAll(/^### (.+?)\s*$/gm)].map((treffer) => treffer[1]!.trim())),
            );
          }

          const eintraege = parseGlossar(extractSection(body, "Glossar") ?? "");
          expect(eintraege.length).toBeGreaterThan(0);

          for (const eintrag of eintraege) {
            const kennung = `${fachgebiet}/${eintrag.term}`;
            expect(eintrag.definition.length, `${kennung}: Definition zu lang`).toBeLessThanOrEqual(400);
            expect(/[*`#\n]/.test(eintrag.definition), `${kennung}: Markdown in der Definition`).toBe(false);
            expect(eintrag.thema, `${kennung}: Thema fehlt`).toBeTruthy();
            const abschnitte = abschnitteJeThema.get(eintrag.thema!);
            expect(abschnitte, `${kennung}: Thema ${eintrag.thema} unbekannt`).toBeDefined();
            if (eintrag.abschnitt) {
              expect(abschnitte!.has(eintrag.abschnitt), `${kennung}: Abschnitt "${eintrag.abschnitt}" ist keine ###-Überschrift`).toBe(true);
            }
            for (const name of [eintrag.term, ...eintrag.aliases]) {
              const schluessel = name.toLowerCase();
              expect(namenBelegt.has(schluessel), `${kennung}: "${name}" doppelt (auch bei ${namenBelegt.get(schluessel)})`).toBe(false);
              namenBelegt.set(schluessel, kennung);
            }
          }
        });
      }
    });
  }
});
