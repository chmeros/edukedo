import { useState } from "react";
import { AboStatus } from "./AboStatus";
import { DeleteAccountDialog } from "./DeleteAccount";
import { DisplayNameSettings } from "./DisplayNameSettings";
import { DisplaySettings } from "./DisplaySettings";
import { FlashcardStartSideSettings } from "./FlashcardStartSideSettings";
import { InfoIcon } from "./Icons";
import { LearningModeSettings } from "./LearningModeSettings";
import { MascotSettings } from "./MascotSettings";
import { Modal } from "./Modal";
import { OfflineDownload } from "./OfflineDownload";
import { PushNotificationSettings } from "./PushNotificationSettings";
import { RedeemCompanyCode } from "./RedeemCompanyCode";
import { Zielplanung } from "./Zielplanung";

/**
 * F-107: Der bisherige Unter-Tab "Einstellungen" im Fortschritt-Tab wandert ins
 * Header-Benutzermenü (Modal) — mit selbst
 * verwaltetem Modal (siehe Architekturplanung Abschnitt 13); am Ende liegt der abgesetzte Bereich „Konto“ mit „Konto löschen“. `kursId` kann null sein (z. B.
 * direkt nach der Registrierung, bevor F-101 einen Kurs erzwungen hat) — Zielplanung/
 * Offline-Download brauchen einen belegten Kurs, LearningModeSettings/RedeemCompanyCode sind
 * kursunabhängig und bleiben immer verfügbar.
 */
export function SettingsModal({ kursId }: { kursId: string | null }) {
  const [open, setOpen] = useState(false);
  const [loeschen, setLoeschen] = useState(false);

  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setOpen(true)}>
        Einstellungen
      </button>
      {open && (
        <Modal title="Einstellungen" onClose={() => setOpen(false)}>
          <div className="widget-grid">
            <div className="widget">
              <DisplayNameSettings />
            </div>
            <div className="widget">
              <LearningModeSettings />
            </div>
            <div className="widget">
              <FlashcardStartSideSettings />
            </div>
            <div className="widget">
              <DisplaySettings />
            </div>
            <div className="widget">
              <MascotSettings />
            </div>
            <div className="widget">
              <PushNotificationSettings />
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
            <div className="widget">
              <AboStatus />
            </div>
          </div>
          <section className="settings-konto" aria-labelledby="settings-konto-titel">
            <h3 id="settings-konto-titel">Konto</h3>
            <p className="field-hint">Löscht dein Konto und alle Daten dazu unwiderruflich. Vorher fragen wir noch einmal nach deinem Passwort.</p>
            <button
              type="button"
              className="link-danger-btn"
              onClick={() => {
                setOpen(false);
                setLoeschen(true);
              }}
            >
              Konto löschen
            </button>
          </section>
        </Modal>
      )}
      {loeschen && (
        <DeleteAccountDialog
          onClose={() => {
            setLoeschen(false);
            setOpen(true);
          }}
        />
      )}
    </>
  );
}
