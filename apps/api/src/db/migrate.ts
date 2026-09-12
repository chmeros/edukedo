import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./client";

/**
 * Führt die Drizzle-Migrationen aus ./drizzle aus. Die erste Migration (0000_...)
 * aktiviert die von Architekturplanung Abschnitt 9 geforderten Postgres-Extensions
 * (citext, pgcrypto) — siehe apps/api/drizzle/0000_enable_extensions.sql.
 */
async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await pool.end();
  console.log("Migrationen erfolgreich angewendet.");
}

main().catch((error) => {
  console.error("Migration fehlgeschlagen:", error);
  process.exit(1);
});
