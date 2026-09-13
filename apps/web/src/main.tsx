import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ConsentConfirm } from "./ConsentConfirm";
import "./styles.css";
import { trpc } from "./trpc";

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

  // Kein eigener Router im Projekt — für die eine öffentliche Zielseite des
  // Consent-Bestätigungslinks (F-08) genügt eine einfache Pfad-Weiche.
  const isConsentConfirmPage = window.location.pathname === "/consent/confirm";

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {isConsentConfirmPage ? <ConsentConfirm /> : <App />}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root-Element nicht gefunden.");
}

ReactDOM.createRoot(rootElement).render(<Root />);
