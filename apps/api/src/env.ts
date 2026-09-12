import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET muss mindestens 32 Zeichen lang sein"),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
