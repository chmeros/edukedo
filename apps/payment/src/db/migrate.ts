import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./client";

/** Führt die Drizzle-Migrationen der eigenen Payment-Datenbank aus ./drizzle aus (siehe apps/api/src/db/migrate.ts für das analoge Kern-Pendant). */
async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await pool.end();
  console.log("Payment-Migrationen erfolgreich angewendet.");
}

main().catch((error) => {
  console.error("Migration fehlgeschlagen:", error);
  process.exit(1);
});
