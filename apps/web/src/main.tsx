import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { AGB } from "./AGB";
import { App } from "./App";
import { CompanyDashboard } from "./CompanyDashboard";
import { CompanySetup } from "./CompanySetup";
import { ConsentConfirm } from "./ConsentConfirm";
import { Datenschutzerklaerung } from "./Datenschutzerklaerung";
import { DatenschutzKinder } from "./DatenschutzKinder";
import { Impressum } from "./Impressum";
import { ParentDashboard } from "./ParentDashboard";
import "./styles.css";
import { trpc } from "./trpc";
import { VerifyEmail } from "./VerifyEmail";
import { Vorschau } from "./Vorschau";

function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/v1/trpc",
          // `maxURLLength`: ohne diese Grenze batcht tRPC beliebig viele gleichzeitig
          // gefeuerte Queries (z. B. beim App-Start: courses.list, auth.me,
          // gamification.mascotStatus/streakStatus, company.myBranding, sponsor.list) in EINEN
          // Request mit kommagetrennten Prozedur-Namen im Pfad — das überschritt live bereits ab
          // ca. 104 Zeichen Fastifys Routen-Parameter-Limit (`maxParamLength`, siehe app.ts) und
          // lieferte einen 404 statt einer Antwort. Mit `maxURLLength` teilt tRPC einen zu langen
          // Batch stattdessen proaktiv in mehrere Requests auf, bevor irgendein serverseitiges
          // Limit erreicht wird — bewusst derselbe Wert wie `maxParamLength` in app.ts.
          maxURLLength: 2000,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: "include" });
          },
        }),
      ],
    }),
  );

  // Kein eigener Router im Projekt — für die öffentlichen Zielseiten des
  // Consent-Bestätigungslinks (F-08), das Eltern-Dashboard (F-90), die kindgerechte
  // Datenschutz-Kurzfassung (F-53), den kontolosen Vorschau-Modus (F-08), seit F-91 das
  // Unternehmens-Dashboard samt Setup-Link-Zielseite und seit F-51 Impressum/Datenschutz-
  // erklärung/AGB genügt eine einfache Pfad-Weiche.
  const pathname = window.location.pathname;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {pathname === "/consent/confirm" ? (
          <ConsentConfirm />
        ) : pathname === "/verify-email" ? (
          <VerifyEmail />
        ) : pathname === "/parent" ? (
          <ParentDashboard />
        ) : pathname === "/datenschutz-kinder" ? (
          <DatenschutzKinder />
        ) : pathname === "/vorschau" ? (
          <Vorschau />
        ) : pathname === "/company/setup" ? (
          <CompanySetup />
        ) : pathname === "/company" ? (
          <CompanyDashboard />
        ) : pathname === "/impressum" ? (
          <Impressum />
        ) : pathname === "/datenschutz" ? (
          <Datenschutzerklaerung />
        ) : pathname === "/agb" ? (
          <AGB />
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
