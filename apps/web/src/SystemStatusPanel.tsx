import { trpc } from "./trpc";

const STATUS_LABELS: Record<string, string> = {
  ok: "Verfügbar",
  down: "Nicht erreichbar",
  not_configured: "Nicht konfiguriert",
};

// F-138 (26.09.2026, Nutzer-Vorgabe, siehe Architekturplanung Abschnitt 13): "regelmäßig prüft"
// kommt bewusst von hier (Frontend-Polling) statt von einem eigenen Hintergrund-Job auf der
// API-Seite — ein Admin-Dashboard, das nur beim tatsächlichen Betrachten aktualisiert werden muss,
// braucht keine dauerhaft laufende Prüf-Infrastruktur. 30s ist kurz genug, um einen Ausfall zeitnah
// zu bemerken, aber lang genug, um die vier Dienste nicht unnötig oft zu belasten.
const POLL_INTERVAL_MS = 30_000;

/**
 * F-138: Dienst-Verfügbarkeits-Dashboard im Admin-Bereich (Nutzer-Vorgabe vom 26.09.2026) — zeigt
 * die Erreichbarkeit der externen Abhängigkeiten des Kern-Backends (Datenbank, Redis-
 * Warteschlange, Payment-Service, KI-Anbindung), siehe apps/api/src/system-status.ts für die
 * eigentlichen Prüfungen. Rein lesend, keine Admin-Aktion — bewusst kein `role="status"`/
 * `aria-live` auf der Liste selbst (F-137-Muster wäre hier falsch): ein alle 30s automatisch neu
 * vorgelesenes Dashboard wäre für Screenreader-Nutzer:innen aufdringlich statt hilfreich, anders
 * als eine einmalige Quiz-Rückmeldung nach einer bewussten Nutzer-Aktion.
 */
export function SystemStatusPanel() {
  const status = trpc.admin.systemStatus.useQuery(undefined, {
    refetchInterval: POLL_INTERVAL_MS,
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Admin: Systemstatus (F-138)</h2>
        <p>Prüft alle {POLL_INTERVAL_MS / 1000} Sekunden die Erreichbarkeit der externen Abhängigkeiten.</p>
      </div>
      {status.isLoading ? (
        <p>Lädt…</p>
      ) : (
        <div className="list">
          {(status.data?.services ?? []).map((service) => (
            <div key={service.name} className="list-row">
              <div className="meta">
                {service.name}
                <span>
                  {service.detail ?? (service.latencyMs !== undefined ? `Antwortzeit: ${service.latencyMs} ms` : "")}
                </span>
              </div>
              <span
                className={
                  service.status === "ok"
                    ? "status-pill is-ok"
                    : service.status === "down"
                      ? "status-pill is-down"
                      : "status-pill is-unknown"
                }
              >
                {STATUS_LABELS[service.status] ?? service.status}
              </span>
            </div>
          ))}
        </div>
      )}
      {status.data && (
        <span className="field-hint">Zuletzt geprüft: {new Date(status.data.checkedAt).toLocaleTimeString("de-DE")}</span>
      )}
    </div>
  );
}
