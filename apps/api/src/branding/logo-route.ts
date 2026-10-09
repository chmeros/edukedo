import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { db } from "../db/client";
import { brandingLogo } from "../db/schema";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Auslieferung der hochgeladenen Logos (Entscheidung 09.10.2026) von der eigenen Domain. Bewusst öffentlich ohne Anmeldung: Die
 * Logos erscheinen in der App aller Mitglieder und auf der Startseite (Sponsoren), und die ID ist nicht erratbar. Der Inhaltstyp
 * kommt aus der Datenbank (bei der Aufnahme am Dateiaufbau bestimmt), `nosniff` verhindert eine Umdeutung durch den Browser, und
 * die Sicherheitsrichtlinie `default-src 'none'; sandbox` stellt sicher, dass selbst bei einem direkten Aufruf der Adresse
 * nichts ausgeführt wird. Da jede ID unveränderlich ist, darf der Browser das Bild dauerhaft zwischenspeichern.
 */
export function registerLogoRoute(app: FastifyInstance): void {
  app.get<{ Params: { id: string } }>("/api/v1/branding-logo/:id", async (request, reply) => {
    const { id } = request.params;
    if (!UUID_PATTERN.test(id)) {
      return reply.code(404).send();
    }
    const [row] = await db
      .select({ contentType: brandingLogo.contentType, data: brandingLogo.data })
      .from(brandingLogo)
      .where(eq(brandingLogo.id, id))
      .limit(1);
    if (!row) {
      return reply.code(404).send();
    }
    return reply
      .header("Content-Type", row.contentType)
      .header("X-Content-Type-Options", "nosniff")
      .header("Content-Security-Policy", "default-src 'none'; sandbox")
      .header("Content-Disposition", "inline")
      .header("Cache-Control", "public, max-age=31536000, immutable")
      .send(row.data);
  });
}
