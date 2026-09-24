import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PAYMENT_DATABASE_URL ?? "postgres://edukedo:edukedo@localhost:5433/edukedo_payment",
  },
});
