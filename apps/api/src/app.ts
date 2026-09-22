import cookie from "@fastify/cookie";
import type { TRPCError } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { env } from "./env";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/router";

/**
 * Als eigene, wiederverwendbare Funktion aus index.ts herausgezogen (siehe dort), damit der
 * End-to-End-Test (test/core-learning-flow.integration.test.ts) über `app.inject()` echte
 * HTTP-Requests inkl. signierter Session-Cookies gegen den echten Fastify/tRPC-Stack schicken
 * kann, ohne einen echten Netzwerk-Port zu öffnen.
 */
export async function buildApp() {
  // maxParamLength: Fastifys Router (find-my-way) begrenzt eine einzelne Routen-Parameter-Länge
  // standardmäßig auf 100 Zeichen — der tRPC-Fastify-Adapter registriert seine Routen als
  // `/trpc/:path`, wobei `:path` bei einem gebatchten Request die kommagetrennten Prozedur-Namen
  // trägt (siehe httpBatchLink, main.tsx). Schon fünf bis sechs gleichzeitig beim App-Start
  // feuernde Queries (courses.list, auth.me, gamification.mascotStatus/streakStatus,
  // company.myBranding, sponsor.list) überschreiten dieses Limit knapp und lieferten dadurch live
  // einen 404 statt einer echten Antwort — kein Body-/Header-Limit, sondern reines Router-Matching
  // (siehe Architekturplanung Abschnitt 13). 2000 ist derselbe Wert wie `maxURLLength` auf dem
  // Client (main.tsx) — beide Seiten bewusst synchron gehalten.
  const app = Fastify({ logger: true, maxParamLength: 2000 });

  await app.register(cookie, { secret: env.SESSION_SECRET });

  await app.register(fastifyTRPCPlugin, {
    prefix: "/api/v1/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
      // N-08: Basis-Fehler-Logging — bewusst nur INTERNAL_SERVER_ERROR (echte, unerwartete
      // Bugs), nicht die weit häufigeren erwarteten 4xx-Antworten (falsches Passwort, fehlende
      // Berechtigung, Validierungsfehler o. Ä.), sonst würde routinemäßiges Nutzerverhalten das
      // Fehler-Log dominieren und echte Fehler darin untergehen. Bewusst ohne `input` im Log —
      // das könnte bei auth.login/auth.register Klartext-Passwörter enthalten.
      onError({ path, error }: { path?: string; error: TRPCError }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
          app.log.error({ path, message: error.message }, "Unerwarteter tRPC-Fehler");
        }
      },
    },
  });

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}
