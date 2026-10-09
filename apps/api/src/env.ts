import { z } from "zod";

// Leere Werte aus einer .env-Datei ("SMTP_USER=") gelten als nicht gesetzt.
const optionalText = z.preprocess((value) => (value === "" ? undefined : value), z.string().min(1).optional());

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
  // F-159 (Zugang für Minderjährige vorerst geschlossen, Nutzer-Vorgabe vom 05.10.2026, siehe
  // Architekturplanung Abschnitt 13): ohne ausdrückliches "true" können sich nur Volljährige
  // registrieren und einloggen. Der Eltern-Consent-Flow (F-08/F-90) bleibt vollständig im Code und
  // wird mit ALLOW_MINORS=true wieder aktiv — es ist ein Schalter, kein Rückbau.
  // Review-Befund SEC-04: Hinter einem Reverse Proxy (Load Balancer, nginx) kommt jede Anfrage von dessen Adresse; nur mit
  // TRUST_PROXY=true liest Fastify die echte Client-IP aus X-Forwarded-For, und die IP-basierten Ratenbegrenzungen greifen
  // je Client statt für alle zusammen. Nur setzen, wenn wirklich ein vertrauenswürdiger Proxy davorsteht.
  TRUST_PROXY: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  ALLOW_MINORS: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
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
  // Anpassungen für den Betrieb ohne GPU (siehe Architekturplanung Abschnitt 13, 09.10.2026): Auf einer CPU dauert eine Bewertung
  // mit dem 14B-Modell einige Minuten, auf einer GPU Sekunden. Zeitlimit je Anfrage in Millisekunden (Default wie bisher 2 Minuten;
  // für CPU-Betrieb z. B. 900000), Obergrenze für die Länge der Antwort in Token, Größe des Kontextfensters in Token (wird
  // ausdrücklich gesetzt, damit lange Prompts nicht still abgeschnitten werden) und die Zeit, die das Modell nach der letzten
  // Anfrage geladen bleibt (Ollama-Schreibweise, z. B. "30m" oder "-1" für dauerhaft).
  OLLAMA_TIMEOUT_MS: z.coerce.number().int().min(1000).default(120_000),
  OLLAMA_NUM_PREDICT: z.coerce.number().int().min(100).default(1500),
  OLLAMA_NUM_CTX: z.coerce.number().int().min(2048).default(8192),
  OLLAMA_KEEP_ALIVE: z.string().regex(/^(-1|\d+[smh]?)$/, "OLLAMA_KEEP_ALIVE z. B. 30m, 3600s oder -1").default("30m"),
  // Echter E-Mail-Versand per SMTP (Entscheidung 09.10.2026: Postfach des Hosters bzw. Domain-Anbieters, siehe
  // Entwicklungsplan Iteration 23). Ohne SMTP_HOST bleibt der Platzhalter-Versand in src/email/sender.ts aktiv.
  // Port 587 nutzt STARTTLS (SMTP_SECURE=false, es gibt keinen Rückfall auf unverschlüsselte Übertragung),
  // Port 465 implizites TLS (SMTP_SECURE=true). MAIL_FROM ist der Absender, z. B. "edukedo <noreply@edukedo.de>".
  SMTP_HOST: optionalText,
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USER: optionalText,
  SMTP_PASSWORD: optionalText,
  MAIL_FROM: optionalText,
});

export const env = envSchema
  .superRefine((value, ctx) => {
    if (value.SMTP_HOST && !value.MAIL_FROM) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["MAIL_FROM"], message: "MAIL_FROM fehlt (Pflicht, sobald SMTP_HOST gesetzt ist)" });
    }
    if (Boolean(value.SMTP_USER) !== Boolean(value.SMTP_PASSWORD)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["SMTP_PASSWORD"], message: "SMTP_USER und SMTP_PASSWORD müssen zusammen gesetzt werden" });
    }
  })
  .parse(process.env);
