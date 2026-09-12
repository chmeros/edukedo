import cookie from "@fastify/cookie";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { env } from "./env";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/router";

const app = Fastify({ logger: true });

await app.register(cookie, { secret: env.SESSION_SECRET });

await app.register(fastifyTRPCPlugin, {
  prefix: "/api/v1/trpc",
  trpcOptions: { router: appRouter, createContext },
});

app.get("/health", async () => ({ status: "ok" }));

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => app.log.info(`edukedo-api hört auf Port ${env.PORT}`))
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
