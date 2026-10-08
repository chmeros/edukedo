import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { blockSourceKey, deriveThemaSourceKeys, fachgespraechSourceKey, THEORIE_SOURCE_KEY, validateContentDir } from "./content-keys";

const THEMA_BODY = `
## Theorie

Text.

## Karteikarten

#### K-1.1-01
**Frage:** Was ist A?
**Antwort:** B.
\`schwierigkeit: leicht\` · \`bloom: erinnern\`

#### K-1.1-02
**Frage:** Was ist C?
**Antwort:** D.
\`schwierigkeit: leicht\` · \`bloom: erinnern\`

## Quiz

#### Q-1.1-01 · Multiple Choice
**Frage:** Welche Option stimmt?
- [x] Richtig
- [ ] Falsch
**Erklärung:** Weil.
\`schwierigkeit: leicht\` · \`bloom: erinnern\`

## Fallaufgaben

Einleitungsabsatz ohne eigene Aufgabe.

#### F-1-01
**Ausgangssituation:** Eine Situation.
**Teilaufgabe 1 (10 Punkte):** Aufgabe.
**Musterlösungshinweise:** Lösung.

## Fachgesprächsfragen

### 1.1 Gruppe

- Erklären Sie A.
- Erklären Sie B.
`;

describe("blockSourceKey", () => {
  it("liest die ID aus der Überschrift, mit und ohne Instrumentenzusatz", () => {
    expect(blockSourceKey("#### K-1.1-01\n**Frage:** x")).toBe("K-1.1-01");
    expect(blockSourceKey("#### Q-6.1-17 · Kryptografie-Bausteine\n**Anweisung:** x")).toBe("Q-6.1-17");
    expect(blockSourceKey("#### F-WB1-03")).toBe("F-WB1-03");
  });

  it("liefert null, wenn die Überschrift keine einzelne ID trägt", () => {
    expect(blockSourceKey("Einleitung ohne Überschrift")).toBeNull();
    expect(blockSourceKey("####")).toBeNull();
  });
});

describe("fachgespraechSourceKey", () => {
  it("ist deterministisch und unabhängig von Groß-/Kleinschreibung und Leerraum", () => {
    expect(fachgespraechSourceKey("Erklären Sie A.")).toBe(fachgespraechSourceKey("  erklären   sie a. "));
    expect(fachgespraechSourceKey("Erklären Sie A.")).toMatch(/^fg:[0-9a-f]{16}$/);
  });

  it("unterscheidet verschiedene Fragen", () => {
    expect(fachgespraechSourceKey("Erklären Sie A.")).not.toBe(fachgespraechSourceKey("Erklären Sie B."));
  });
});

describe("deriveThemaSourceKeys", () => {
  it("liefert die Schlüssel aller Itemarten in Importreihenfolge ohne Verstöße", () => {
    const { keys, issues } = deriveThemaSourceKeys(THEMA_BODY);
    expect(issues).toEqual([]);
    expect(keys.map((entry) => entry.key)).toEqual([
      THEORIE_SOURCE_KEY,
      "K-1.1-01",
      "K-1.1-02",
      "Q-1.1-01",
      "F-1-01",
      fachgespraechSourceKey("Erklären Sie A."),
      fachgespraechSourceKey("Erklären Sie B."),
    ]);
    expect(keys.map((entry) => entry.art)).toEqual(["theorie", "karteikarte", "karteikarte", "quiz", "fallaufgabe", "fachgespraech", "fachgespraech"]);
  });

  it("meldet einen doppelten Schlüssel in derselben Datei", () => {
    const body = THEMA_BODY.replace("#### K-1.1-02", "#### K-1.1-01");
    expect(deriveThemaSourceKeys(body).issues).toEqual(['Schlüssel „K-1.1-01“ kommt mehrfach in derselben Datei vor.']);
  });

  it("meldet doppelte Fachgesprächsfragen (gleicher Text)", () => {
    const body = THEMA_BODY.replace("- Erklären Sie B.", "- Erklären Sie A.");
    expect(deriveThemaSourceKeys(body).issues).toHaveLength(1);
  });

  it("meldet einen Karteikartenblock ohne ID", () => {
    const body = THEMA_BODY.replace("#### K-1.1-02\n", "#### \n");
    const { issues } = deriveThemaSourceKeys(body);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("Block ohne ID");
  });

  it("überspringt Quizblöcke, die der Importer ignoriert, und den Einleitungsabsatz der Fallaufgaben", () => {
    const body = THEMA_BODY.replace("#### Q-1.1-01 · Multiple Choice", "#### Q-1.1-01 · Unbekannte Art");
    const { keys, issues } = deriveThemaSourceKeys(body);
    expect(issues).toEqual([]);
    expect(keys.some((entry) => entry.key === "Q-1.1-01")).toBe(false);
    expect(keys.some((entry) => entry.art === "fallaufgabe")).toBe(true);
  });

  it("gibt für eine Datei ohne Itemabschnitte keine Schlüssel zurück", () => {
    expect(deriveThemaSourceKeys("## Sonstiges\n\nText.")).toEqual({ keys: [], issues: [] });
  });
});

describe("validateContentDir", () => {
  const dirs: string[] = [];
  afterAll(async () => {
    await Promise.all(dirs.map((dir) => rm(dir, { recursive: true, force: true })));
  });

  async function content(files: Record<string, string>): Promise<string> {
    const dir = await mkdtemp(path.join(os.tmpdir(), "edukedo-content-"));
    dirs.push(dir);
    for (const [name, text] of Object.entries(files)) {
      await mkdir(path.dirname(path.join(dir, name)), { recursive: true });
      await writeFile(path.join(dir, name), text);
    }
    return dir;
  }

  const frontmatter = (extra = "") => `---\nkurs_slug: demo\nfachgebiet_code: FG1\nthema_code: "1.1"\nthema_title: T\n${extra}---\n`;

  it("akzeptiert gültigen Content und zählt Dateien und Items", async () => {
    const dir = await content({ "demo/fg1/1.1.md": frontmatter() + THEMA_BODY });
    expect(await validateContentDir(dir)).toEqual({ files: 1, items: 7, issues: [] });
  });

  it("meldet zwei Dateien mit demselben Thema, fehlende Pflichtfelder und Schlüsselverstöße mit Dateipfad", async () => {
    const dir = await content({
      "demo/fg1/a.md": frontmatter() + THEMA_BODY,
      "demo/fg1/b.md": frontmatter() + THEMA_BODY,
      "demo/fg1/c.md": "---\nkurs_slug: demo\nfachgebiet_code: FG1\n---\n" + THEMA_BODY.replace("#### K-1.1-02", "#### K-1.1-01"),
    });
    const { issues } = await validateContentDir(dir);
    expect(issues.some((issue) => issue.startsWith("demo/fg1/b.md:") && issue.includes("steht schon in demo/fg1/a.md"))).toBe(true);
    expect(issues.some((issue) => issue.startsWith("demo/fg1/c.md:") && issue.includes("thema_code"))).toBe(true);
    expect(issues.some((issue) => issue.startsWith("demo/fg1/c.md:") && issue.includes("mehrfach"))).toBe(true);
  });

  it("überspringt das Glossar und Dateien ohne Frontmatter", async () => {
    const dir = await content({
      "demo/fg1/glossar.md": frontmatter() + "## Glossar\n\n#### Begriff\n",
      "README.md": "# Übersicht\n",
    });
    expect(await validateContentDir(dir)).toEqual({ files: 0, items: 0, issues: [] });
  });

  it("der echte Content hat eindeutige Themen und Item-Schlüssel (Voraussetzung für den Upsert-Import)", async () => {
    const contentDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");
    const report = await validateContentDir(contentDir);
    expect(report.issues).toEqual([]);
    expect(report.files).toBeGreaterThan(600);
    expect(report.items).toBeGreaterThan(16000);
  }, 60_000);
});
