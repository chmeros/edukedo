import { useState } from "react";
import { InfoIcon } from "./Icons";
import { LearningModeSettings } from "./LearningModeSettings";
import { Modal } from "./Modal";
import { OfflineDownload } from "./OfflineDownload";
import { RedeemCompanyCode } from "./RedeemCompanyCode";
import { Zielplanung } from "./Zielplanung";

/**
 * F-107: Der bisherige Unter-Tab "Einstellungen" im Fortschritt-Tab wandert ins
 * Header-Benutzermenü (Modal) — analog zu `DeleteAccount.tsx` (Trigger-Button + selbst
 * verwaltetes Modal, siehe Architekturplanung Abschnitt 13). `kursId` kann null sein (z. B.
 * direkt nach der Registrierung, bevor F-101 einen Kurs erzwungen hat) — Zielplanung/
 * Offline-Download brauchen einen belegten Kurs, LearningModeSettings/RedeemCompanyCode sind
 * kursunabhängig und bleiben immer verfügbar.
 */
export function SettingsModal({ kursId }: { kursId: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setOpen(true)}>
        Einstellungen
      </button>
      {open && (
        <Modal title="Einstellungen" onClose={() => setOpen(false)}>
          <div className="widget-grid">
            <div className="widget">
              <LearningModeSettings />
            </div>
            {kursId ? (
              <>
                <div className="widget">
                  <Zielplanung kursId={kursId} />
                </div>
                <div className="widget">
                  <OfflineDownload kursId={kursId} />
                </div>
              </>
            ) : (
              <div className="widget">
                <div className="alert alert-info">
                  <InfoIcon />
                  <div>Zielplanung und Offline-Download sind verfügbar, sobald du einem Kurs beigetreten bist.</div>
                </div>
              </div>
            )}
            <div className="widget">
              <RedeemCompanyCode />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
