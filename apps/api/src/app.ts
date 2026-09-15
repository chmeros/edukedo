import cookie from "@fastify/cookie";
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
  const app = Fastify({ logger: true });

  await app.register(cookie, { secret: env.SESSION_SECRET });

  await app.register(fastifyTRPCPlugin, {
    prefix: "/api/v1/trpc",
    trpcOptions: { router: appRouter, createContext },
  });

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}
