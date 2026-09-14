import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ConsentConfirm } from "./ConsentConfirm";
import { DatenschutzKinder } from "./DatenschutzKinder";
import { ParentDashboard } from "./ParentDashboard";
import "./styles.css";
import { trpc } from "./trpc";
import { Vorschau } from "./Vorschau";

function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/v1/trpc",
          fetch(url, options) {
            return fetch(url, { ...options, credentials: "include" });
          },
        }),
      ],
    }),
  );

  // Kein eigener Router im Projekt — für die öffentlichen Zielseiten des
  // Consent-Bestätigungslinks (F-08), das Eltern-Dashboard (F-90), die kindgerechte
  // Datenschutz-Kurzfassung (F-53) und den kontolosen Vorschau-Modus (F-08) genügt eine
  // einfache Pfad-Weiche.
  const pathname = window.location.pathname;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {pathname === "/consent/confirm" ? (
          <ConsentConfirm />
        ) : pathname === "/parent" ? (
          <ParentDashboard />
        ) : pathname === "/datenschutz-kinder" ? (
          <DatenschutzKinder />
        ) : pathname === "/vorschau" ? (
          <Vorschau />
        ) : (
          <App />
        )}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root-Element nicht gefunden.");
}

ReactDOM.createRoot(rootElement).render(<Root />);
