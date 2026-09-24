import { z } from "zod";

/**
 * Eigenständige Umgebungsvariablen-Validierung, bewusst unabhängig von apps/api/src/env.ts
 * (siehe Architekturplanung Abschnitt 2/8: Kern und Payment teilen sich weder DB-Verbindung
 * noch Secrets noch Code). `KERN_SERVICE_TOKEN` ist ein gemeinsam vereinbartes Shared Secret,
 * das der Kern bei jedem REST-Aufruf im Header `x-kern-service-token` mitschickt — ersetzt bis
 * zu einem echten Dienst-zu-Dienst-Auth-Mechanismus eine öffentlich erreichbare, ungeschützte
 * Payment-API.
 */
const envSchema = z.object({
  PAYMENT_DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3002),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  KERN_SERVICE_TOKEN: z.string().min(16, "KERN_SERVICE_TOKEN muss mindestens 16 Zeichen lang sein"),
  // Dieselbe, bereits für die Kern-BullMQ-Queues (F-70) laufende Redis-Instanz — laut
  // Architekturplanung Abschnitt 9 eine bewusst gemeinsam genutzte dritte Infrastruktur-
  // Komponente (kein gemeinsamer Postgres-Zugriff, aber gemeinsames Redis für die Event-Queue).
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
});

export const env = envSchema.parse(process.env);
