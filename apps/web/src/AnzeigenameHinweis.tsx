import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * Entscheidung 10.10.2026 (UXL-04 Rest): Soziale Funktionen (Freundeskreis, Gruppen, Duelle) setzen einen Anzeigenamen voraus; die
 * E-Mail-Adresse sehen andere nie. Fehlt der Name, steht hier, was zu tun ist, statt dass jede Aktion mit einer Fehlermeldung endet.
 * Erscheint nur, solange der Name fehlt.
 */
export function AnzeigenameHinweis() {
  const me = trpc.auth.me.useQuery();
  if (!me.data || me.data.displayName?.trim()) return null;
  return (
    <div className="alert alert-info">
      <InfoIcon />
      <div>
        <b>Anzeigename fehlt.</b> Für Freundeskreis, Gruppen und Duelle brauchst du einen Anzeigenamen (ein Spitzname genügt). Andere sehen dich
        dann unter diesem Namen, nie mit deiner E-Mail-Adresse. Du setzt ihn im Menü oben rechts unter „Einstellungen“ → „Anzeigename“.
      </div>
    </div>
  );
}
