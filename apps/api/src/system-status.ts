import { sql } from "drizzle-orm";
import type { Database } from "./db/client";
import { withTimeout } from "./queue/with-timeout";

/**
 * F-138 (26.09.2026, Nutzer-Vorgabe, siehe Architekturplanung Abschnitt 13): Dienst-
 * Verfügbarkeits-Dashboard im Admin-Bereich — prüft bei jedem Aufruf live alle externen
 * Abhängigkeiten des Kern-Backends, statt eines separaten Hintergrund-Jobs/Cron (das Frontend
 * fragt stattdessen per `refetchInterval` regelmäßig neu ab, siehe apps/web/SystemStatusPanel.tsx).
 * Jeder Check bekommt sein eigenes kurzes Zeitlimit und wird unabhängig von den übrigen ausgewertet
 * (`Promise.all` statt sequenziell) — ein einzelner hängender/ausgefallener Dienst darf die
 * anderen Zeilen nicht verzögern, konsistent mit N-10.
 *
 * Bewusst OHNE eigenen Import von `env`/`redisConnection`/dem Payment-Client/Ollama hier — jede
 * Prüf-Funktion bekommt die tatsächliche Verbindung als Parameter (dieselbe Konvention wie
 * `createOllamaProvider(baseUrl, model)` oder `pacing.ts`), damit diese Datei ohne echte
 * Infrastruktur ODER die Pflicht-Umgebungsvariablen aus `env.ts` unit-testbar bleibt (siehe
 * system-status.test.ts). Die tatsächliche Verdrahtung mit den echten Verbindungen lebt in
 * `trpc/routers/admin.ts` (`systemStatus`-Prozedur), die `env` ohnehin bereits importiert.
 */
const CHECK_TIMEOUT_MS = 3000;

export type ServiceStatus = "ok" | "down" | "not_configured";

export interface ServiceCheckResult {
  name: string;
  status: ServiceStatus;
  detail?: string;
  latencyMs?: number;
}

async function timedCheck(name: string, check: () => Promise<unknown>): Promise<ServiceCheckResult> {
  const start = Date.now();
  try {
    await withTimeout(check(), CHECK_TIMEOUT_MS, `Keine Antwort innerhalb von ${CHECK_TIMEOUT_MS} ms.`);
    return { name, status: "ok", latencyMs: Date.now() - start };
  } catch (error) {
    return {
      name,
      status: "down",
      detail: error instanceof Error ? error.message : "Unbekannter Fehler.",
      latencyMs: Date.now() - start,
    };
  }
}

export function checkDatabase(db: Pick<Database, "execute">): Promise<ServiceCheckResult> {
  return timedCheck("Datenbank (Kern)", () => db.execute(sql`select 1`));
}

export function checkRedis(ping: () => Promise<unknown>): Promise<ServiceCheckResult> {
  return timedCheck("Warteschlange (Redis)", ping);
}

export function checkPaymentService(ping: () => Promise<unknown>): Promise<ServiceCheckResult> {
  return timedCheck("Payment-Service", ping);
}

// Platzhalter-Modus hat keine externe Abhängigkeit (reine In-Process-Logik, siehe
// placeholder-provider.ts) — ein Check würde hier immer "ok" melden und damit nur vortäuschen,
// dass tatsächlich ein externer KI-Dienst geprüft wurde. "not_configured" macht stattdessen
// ehrlich sichtbar, dass aktuell gar keine echte KI-Anbindung aktiv ist.
export function checkAiProvider(provider: "placeholder" | "ollama", ping: () => Promise<void>): Promise<ServiceCheckResult> {
  if (provider === "placeholder") {
    return Promise.resolve({
      name: "KI-Anbindung",
      status: "not_configured",
      detail: "Platzhalter-Modus aktiv (AI_PROVIDER=placeholder) — keine externe KI-Anbindung konfiguriert.",
    });
  }
  return timedCheck("KI-Anbindung (Ollama)", ping);
}

export async function checkAllServices(
  db: Pick<Database, "execute">,
  pingRedis: () => Promise<unknown>,
  pingPayment: () => Promise<unknown>,
  aiProviderMode: "placeholder" | "ollama",
  pingAi: () => Promise<void>,
): Promise<{ services: ServiceCheckResult[]; checkedAt: string }> {
  const services = await Promise.all([
    checkDatabase(db),
    checkRedis(pingRedis),
    checkPaymentService(pingPayment),
    checkAiProvider(aiProviderMode, pingAi),
  ]);
  return { services, checkedAt: new Date().toISOString() };
}
