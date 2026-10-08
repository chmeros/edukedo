import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Ort der Markdown-Inhalte (content/). Standard: relativ zu dieser Datei im Quellbaum (Entwicklung mit tsx). Im
 * Produktions-Bundle (dist/) stimmt diese Relation nicht mehr; dort setzt das Image CONTENT_DIR (Review A5/INF-01). Die
 * Umgebungsvariable erlaubt außerdem, Tests auf ein kleines Verzeichnis zu richten (Review INF-10).
 */
export function contentDir(): string {
  const aus = process.env.CONTENT_DIR;
  if (aus && aus.trim() !== "") return path.resolve(aus);
  return path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");
}
