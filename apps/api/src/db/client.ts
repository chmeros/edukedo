import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../env";
import * as schema from "./schema";

export const pool = new Pool({ connectionString: env.DATABASE_URL });

// Beendet der Datenbankserver eine untätige Verbindung (Neustart, Failover, Container-Stopp in Tests), meldet node-postgres das als
// "error" am Pool. Ohne Handler wird daraus eine unbehandelte Ausnahme, die den Prozess beendet bzw. einen Testlauf kippt; der Pool
// baut bei der nächsten Abfrage selbst eine neue Verbindung auf.
pool.on("error", (error) => {
  console.error(`[db] Fehler auf einer untätigen Datenbankverbindung: ${error.message}`);
});

export const db = drizzle(pool, { schema });

export type Database = typeof db;
