import IORedis from "ioredis";
import { env } from "../env";

/** Eigene Verbindung zur gemeinsam genutzten Redis-Instanz (siehe env.ts) — kein gemeinsames
 * Verbindungsobjekt mit apps/api, da beide Services unabhängig deploybar bleiben (Architekturplanung
 * Abschnitt 9). `maxRetriesPerRequest: null` ist von BullMQ für Worker-Verbindungen verlangt. */
export const redisConnection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });
