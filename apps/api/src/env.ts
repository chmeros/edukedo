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
});

export const env = envSchema.parse(process.env);
