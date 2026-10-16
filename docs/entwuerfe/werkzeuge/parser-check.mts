// Parser-Prüfung: zählt neue Karten, Quizblöcke, Kurzantworten (mit/ohne Antwortliste) und neue Fallaufgaben je Datei.
// Aufruf: npx tsx parser-check.mts <Repo> <neue Content-Wurzel> <alte Content-Wurzel> <kurs[,kurs]>
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const repo = path.resolve(process.argv[2]!);
const neu = process.argv[3]!;
const alt = process.argv[4]!;
const parser = await import(pathToFileURL(path.join(repo, "apps/api/src/db/content-parser.ts")).href);
function zaehle(wurzel: string, rel: string) {
  if (!fs.existsSync(path.join(wurzel, rel))) return { karten: 0, quiz: 0, nichtGeparst: 0, kurz: 0, leer: 0 };
  const raw = fs.readFileSync(path.join(wurzel, rel), "utf8");
  const { body } = parser.splitFrontmatter(raw);
  const karten = parser.parseKarteikarten(parser.extractSection(body, "Karteikarten") ?? "").length;
  const blocks = parser.splitBlocks(parser.extractSection(body, "Quiz") ?? "");
  const q = blocks.map((b: string) => parser.parseQuizBlock(b));
  const kurz = q.filter((x: any) => x && x.type === "kurzantwort");
  return { karten, quiz: blocks.length, nichtGeparst: q.filter((x: any) => !x).length, kurz: kurz.length, leer: kurz.filter((x: any) => !x.acceptedAnswers?.length).length };
}
let sumK = 0, sumQ = 0, sumKurz = 0;
for (const kurs of process.argv[5]!.split(",")) {
  const wurzel = path.join(neu, kurs);
  const dateien: string[] = [];
  for (const g of fs.readdirSync(wurzel)) {
    const p = path.join(wurzel, g);
    if (!fs.statSync(p).isDirectory()) continue;
    for (const f of fs.readdirSync(p)) if (/^[0-9]/.test(f)) dateien.push(path.join(kurs, g, f));
  }
  for (const rel of dateien) {
    const a = zaehle(neu, rel), b = zaehle(alt, rel);
    const dk = a.karten - b.karten, dq = a.quiz - b.quiz;
    sumK += dk; sumQ += dq; sumKurz += a.kurz - b.kurz;
    if (dk || dq) console.log(rel.padEnd(78), "+K", dk, "+Q", dq, "| nicht geparst:", a.nichtGeparst, "| ohne Antworten:", a.leer);
  }
  for (const g of fs.readdirSync(wurzel)) {
    const fp = path.join(wurzel, g, "fallaufgaben.md");
    if (!fs.existsSync(fp)) continue;
    const { body } = parser.splitFrontmatter(fs.readFileSync(fp, "utf8"));
    const ids = (t: string) => [...t.matchAll(/^#### (F-[A-Z0-9-]+)/gm)].map((m) => m[1]);
    const alte = new Set(ids(fs.readFileSync(path.join(alt, kurs, g, "fallaufgaben.md"), "utf8")));
    const bloecke = [...body.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n#### F-|(?![\s\S]))/gm)];
    for (const m of bloecke) {
      if (alte.has(m[1]!)) continue;
      const p = parser.parseFallaufgabe(m[0]);
      console.log(m[1], "Teile:", p.parts.length, "Punkte:", p.parts.reduce((s: number, t: any) => s + t.points, 0), "Lösungszeilen:", p.explanation.split("\n").length);
    }
  }
}
console.log("neu: Karten", sumK, "Quizblöcke", sumQ, "davon Kurzantworten", sumKurz);
