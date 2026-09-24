import { check, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Eigene, physisch getrennte Datenbank (Architekturplanung Abschnitt 2/3/8) — bewusst KEIN
 * Fremdschlüssel auf die Kern-`user`-Tabelle (andere Datenbank, andere Instanz). `userId` ist
 * ein reiner, unvalidierter Verweis auf die Kern-User-ID; referenzielle Integrität dorthin kann
 * es strukturell nicht geben und wird auch nicht simuliert.
 *
 * Zahlungsdaten selbst (Kartennummern o. Ä.) werden hier NIE gespeichert (N-11) — nur der
 * Abo-Status und Rechnungs-Metadaten, wie sie ein Zahlungsdienstleister per Webhook meldet.
 */

export const subscription = pgTable(
  "subscription",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    status: text("status").notNull(),
    plan: text("plan").notNull().default("premium"),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("subscription_status_check", sql`${table.status} in ('active', 'canceled')`)],
);

export const invoice = pgTable(
  "invoice",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subscriptionId: uuid("subscription_id")
      .notNull()
      .references(() => subscription.id, { onDelete: "cascade" }),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("eur"),
    status: text("status").notNull(),
    issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("invoice_status_check", sql`${table.status} in ('paid', 'open', 'failed')`)],
);
