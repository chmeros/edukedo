import IORedis from "ioredis";
import { env } from "../env";

/**
 * F-70/F-72: gemeinsame Redis-Verbindung für BullMQ — dieselbe, bereits seit Iteration 0 lokal
 * laufende Redis-Instanz (docker-compose.yml), ursprünglich für die spätere Kern↔Payment-
 * Ereignis-Queue vorgesehen (siehe Architekturplanung Abschnitt 1/12); diese hier ist die erste
 * tatsächliche BullMQ-Nutzung. `maxRetriesPerRequest: null` ist eine von BullMQ selbst
 * verlangte Einstellung für Worker-Verbindungen (sonst bricht ein `Worker` bei kurzzeitigen
 * Redis-Aussetzern seine interne Blocking-Poll-Verbindung vorzeitig ab).
 */
export const redisConnection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });
