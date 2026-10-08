import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { AGB } from "./AGB";
import { App } from "./App";
import { initDisplayPrefs } from "./displayPrefs";
import { CompanyDashboard } from "./CompanyDashboard";
import { CompanySetup } from "./CompanySetup";
import { ConsentConfirm } from "./ConsentConfirm";
import { ErrorBoundary } from "./ErrorBoundary";
import { Datenschutzerklaerung } from "./Datenschutzerklaerung";
import { DatenschutzKinder } from "./DatenschutzKinder";
import { Impressum } from "./Impressum";
import { NotFound } from "./NotFound";
import { ParentDashboard } from "./ParentDashboard";
import "./styles.css";
import { trpc } from "./trpc";
import { ResetPassword } from "./ResetPassword";
import { VerifyEmail } from "./VerifyEmail";
import { Vorschau } from "./Vorschau";

// F-155: gespeicherte Darstellung (Hell/Dunkel, Ruhiger Modus) vor dem ersten Rendern anwenden.
initDisplayPrefs();

/** tRPC-Fehler mit Code UNAUTHORIZED? */
function istNichtAngemeldet(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { data?: { code?: string } }).data?.code === "UNAUTHORIZED";
}

/** Schlüssel der Anmelde-Abfragen (auth.me, auth.login ...): deren "nicht angemeldet" ist der Normalfall, kein Sitzungsende. */
function istAnmeldeAbfrage(key: readonly unknown[] | undefined): boolean {
  const pfad = Array.isArray(key) && Array.isArray(key[0]) ? (key[0] as unknown[]).join(".") : "";
  return pfad.startsWith("auth.");
}

const SEITENTITEL: Record<string, string> = {
  "/consent/confirm": "Einwilligung bestätigen – edukedo",
  "/verify-email": "E-Mail bestätigen – edukedo",
  "/reset-password": "Passwort zurücksetzen – edukedo",
  "/parent": "Eltern-Bereich – edukedo",
  "/datenschutz-kinder": "Datenschutz für Kinder – edukedo",
  "/vorschau": "Vorschau – edukedo",
  "/company/setup": "Unternehmens-Konto einrichten – edukedo",
  "/company": "Unternehmens-Bereich – edukedo",
  "/impressum": "Impressum – edukedo",
  "/datenschutz": "Datenschutzerklärung – edukedo",
  "/agb": "AGB – edukedo",
};

function Root() {
  // Review WEB-12: Meldet der Server bei irgendeiner Abfrage oder Aktion "nicht angemeldet" (Sitzung abgelaufen oder beendet),
  // wird der Anmeldestatus zurückgesetzt und die App zeigt die Anmeldung. Ausgenommen sind die Anmeldeabfragen selbst.
  const [queryClient] = useState(() => {
    const client: QueryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (istNichtAngemeldet(error) && !istAnmeldeAbfrage(query.queryKey)) {
            void client.resetQueries({ queryKey: [["auth", "me"]] });
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
          if (istNichtAngemeldet(error) && !istAnmeldeAbfrage(mutation.options.mutationKey)) {
            void client.resetQueries({ queryKey: [["auth", "me"]] });
          }
        },
      }),
    });
    return client;
  });
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
  // Ein abschließender Schrägstrich ("/agb/") zählt wie derselbe Pfad ohne.
  const pathname = window.location.pathname.length > 1 ? window.location.pathname.replace(/\/+$/, "") : window.location.pathname;
  // Review WEB-30: Jede Seite hat einen eigenen Dokumenttitel (Tab, Verlauf, Screenreader); die App selbst setzt "edukedo".
  useEffect(() => {
    document.title = SEITENTITEL[pathname] ?? (pathname === "/" || pathname === "/index.html" ? "edukedo" : "Seite nicht gefunden – edukedo");
  }, [pathname]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary vollbild bereich="Diese Seite">
          {pathname === "/consent/confirm" ? (
            <ConsentConfirm />
          ) : pathname === "/verify-email" ? (
            <VerifyEmail />
          ) : pathname === "/reset-password" ? (
            <ResetPassword />
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
          ) : pathname === "/" || pathname === "/index.html" ? (
            <App />
          ) : (
            <NotFound />
          )}
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root-Element nicht gefunden.");
}

ReactDOM.createRoot(rootElement).render(<Root />);
