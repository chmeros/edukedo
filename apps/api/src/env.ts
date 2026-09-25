import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET muss mindestens 32 Zeichen lang sein"),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // F-08: Basis-URL des Frontends, um Bestätigungslinks in Consent-E-Mails zu bilden.
  WEB_BASE_URL: z.string().url().default("http://localhost:5173"),
  // F-43: VAPID-Schlüsselpaar (RFC 8292) für Web Push — Server-Identität gegenüber den
  // Push-Diensten der Browser-Hersteller. Mit `pnpm --filter @edukedo/api exec node -e
  // "console.log(require('web-push').generateVAPIDKeys())"` neu erzeugbar. VAPID_SUBJECT ist
  // laut Spezifikation eine mailto:- oder https-Kontaktadresse, an die sich ein Push-Dienst bei
  // Missbrauch wenden kann.
  VAPID_PUBLIC_KEY: z.string().min(1, "VAPID_PUBLIC_KEY fehlt (siehe README, mit web-push generieren)"),
  VAPID_PRIVATE_KEY: z.string().min(1, "VAPID_PRIVATE_KEY fehlt (siehe README, mit web-push generieren)"),
  VAPID_SUBJECT: z.string().min(1).default("mailto:dev@edukedo.example"),
  // F-70/F-72: BullMQ-Job-Queue für die asynchrone KI-Bewertung — dieselbe, bereits seit
  // Iteration 0 per docker-compose.yml lokal laufende Redis-Instanz, ursprünglich für die
  // Kern↔Payment-Ereignis-Queue vorgesehen (siehe Architekturplanung Abschnitt 1/12), hier als
  // erste tatsächliche BullMQ-Nutzung. Default passt zum docker-compose.yml-Port (6379).
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  // F-81/F-82 (Payment-Baustein 2): Basis-URL der schmalen Payment-REST-API sowie dasselbe
  // Shared Secret, das apps/payment als KERN_SERVICE_TOKEN erwartet (siehe apps/payment/README.md)
  // — muss auf beiden Seiten identisch gesetzt sein, sonst lehnt Payment jeden Aufruf mit 401 ab.
  PAYMENT_SERVICE_URL: z.string().url().default("http://localhost:3002"),
  PAYMENT_SERVICE_TOKEN: z.string().min(16, "PAYMENT_SERVICE_TOKEN muss mindestens 16 Zeichen lang sein"),
  // F-72/F-128 (Nutzer-Entscheidung 25.09.2026, siehe Architekturplanung Abschnitt 13): erste
  // echte KI-Anbindung — lokal über Ollama, OpenAI-kompatible HTTP-Schnittstelle, statt eines
  // In-Process-Bindings oder Sidecar-Diensts. Default bleibt bewusst "placeholder", damit
  // bestehende Deployments/Tests ohne laufendes Ollama unverändert funktionieren — "ollama" ist
  // ein expliziter Opt-in.
  AI_PROVIDER: z.enum(["placeholder", "ollama"]).default("placeholder"),
  OLLAMA_BASE_URL: z.string().url().default("http://localhost:11434"),
  OLLAMA_MODEL: z.string().default("qwen2.5:14b-instruct-q4_K_M"),
});

export const env = envSchema.parse(process.env);
