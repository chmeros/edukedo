import { useState } from "react";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

// `new Uint8Array(length)` statt `Uint8Array.from(...)`: Nur diese Konstruktor-Form typisiert
// den zugrundeliegenden Buffer als `ArrayBuffer` statt `ArrayBufferLike` (das TS-DOM-Lib-Typing
// von `PushSubscriptionOptionsInit.applicationServerKey` verlangt konkret `ArrayBuffer`).
function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    output[i] = rawData.charCodeAt(i);
  }
  return output;
}

const PUSH_SUPPORTED =
  typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;

/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)", Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): echte Web-Push-Benachrichtigungen, funktionieren auch bei geschlossenem Tab
 * (custom Service Worker, siehe sw.ts). Analog zu MascotSettings.tsx (F-118) ein einfacher
 * Umschalter — der Opt-in-Zustand selbst ist serverseitig bewusst KEIN Flag, sondern das
 * Vorhandensein einer push_subscription-Zeile (siehe apps/api/src/trpc/routers/push.ts), hier
 * über `push.status` gespiegelt.
 */
export function PushNotificationSettings() {
  const utils = trpc.useUtils();
  const status = trpc.push.status.useQuery();
  const subscribe = trpc.push.subscribe.useMutation({ onSuccess: () => utils.push.status.invalidate() });
  const unsubscribe = trpc.push.unsubscribe.useMutation({ onSuccess: () => utils.push.status.invalidate() });
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  async function handleToggle(nextEnabled: boolean) {
    setError(null);
    setIsWorking(true);

    try {
      if (!nextEnabled) {
        const registration = await navigator.serviceWorker.ready;
        const existing = await registration.pushManager.getSubscription();
        if (existing) {
          await existing.unsubscribe();
          await unsubscribe.mutateAsync({ endpoint: existing.endpoint });
        }
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setError("Benachrichtigungen sind im Browser blockiert. Bitte in den Browser-Einstellungen erlauben.");
        return;
      }

      const publicKey = await utils.push.publicKey.fetch();
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const json = subscription.toJSON();
      if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
        throw new Error("Unvollständige Push-Subscription vom Browser erhalten.");
      }
      await subscribe.mutateAsync({
        endpoint: json.endpoint,
        keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
      });
    } catch (err) {
      setError("Push-Benachrichtigungen konnten nicht geändert werden.");
      console.error(err);
    } finally {
      setIsWorking(false);
    }
  }

  if (!PUSH_SUPPORTED) {
    return (
      <div className="stack">
        <span className="stat-subheading">Lernerinnerungen</span>
        <span className="field-hint">Push-Benachrichtigungen werden von diesem Browser nicht unterstützt.</span>
      </div>
    );
  }

  if (!status.data) return null;

  return (
    <div className="stack">
      <span className="stat-subheading">Lernerinnerungen</span>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={status.data.subscribed}
          disabled={isWorking}
          onChange={(event) => handleToggle(event.target.checked)}
        />
        Push-Benachrichtigungen bei längerer Lernpause
      </label>
      <span className="field-hint">
        Erinnert dich, wenn du eine Weile nicht gelernt hast — funktioniert auch bei geschlossenem Tab.
      </span>
      {error && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
