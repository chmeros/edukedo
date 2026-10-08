import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { isCliEntry } from "./cli-entry";
import { contentDir } from "./content-dir";

const originalArgv1 = process.argv[1];
const originalContentDir = process.env.CONTENT_DIR;

afterEach(() => {
  process.argv[1] = originalArgv1 as string;
  if (originalContentDir === undefined) delete process.env.CONTENT_DIR;
  else process.env.CONTENT_DIR = originalContentDir;
});

describe("isCliEntry", () => {
  it("erkennt das gestartete Skript im Quellbaum (tsx) und im Bündel (node dist)", () => {
    process.argv[1] = path.join("repo", "apps", "api", "src", "db", "import-content.ts");
    expect(isCliEntry("import-content")).toBe(true);
    process.argv[1] = path.join("app", "dist", "import-content.js");
    expect(isCliEntry("import-content")).toBe(true);
  });

  it("ist falsch, wenn ein anderes Skript oder der Server läuft (Review A5: kein Import-Start durch den Server)", () => {
    process.argv[1] = path.join("app", "dist", "index.js");
    expect(isCliEntry("import-content")).toBe(false);
    expect(isCliEntry("purge-inactive")).toBe(false);
    process.argv[1] = path.join("app", "dist", "import-content-extra.js");
    expect(isCliEntry("import-content")).toBe(false);
  });
});

describe("contentDir", () => {
  it("nutzt CONTENT_DIR, sonst das content/-Verzeichnis des Repositorys", () => {
    process.env.CONTENT_DIR = path.join("irgendwo", "inhalte");
    expect(contentDir()).toBe(path.resolve("irgendwo", "inhalte"));
    delete process.env.CONTENT_DIR;
    expect(contentDir().endsWith(`${path.sep}content`)).toBe(true);
  });
});
