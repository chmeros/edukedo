import {
  analysiere,
  formatIpv4,
  maskeVonPraefix,
  MAX_TEILE_SUBNETZE,
  parseCidr,
  praefixFuerHosts,
  teileNetz,
  type Adressart,
  type SubnetzInfo,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-166 (Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13): freier Subnetting-
 * Rechner im Werkzeugkasten — im Gegensatz zum Subnetting-Sprint (F-158) keine Aufgaben, sondern ein
 * Werkzeug zum Nachrechnen eigener Adressen. Rechnet live im Browser (packages/shared/src/subnetting-logic.ts),
 * ohne Server-Aufruf, Speicherung oder Wertung. Drei Reiter: Adresse analysieren (mit Binärdarstellung und
 * Rechenweg), Netz in Subnetze teilen, Präfix für eine Hostzahl bestimmen.
 */
type Modus = "analysieren" | "teilen" | "hosts";
const MODI: { id: Modus; label: string }[] = [
  { id: "analysieren", label: "Adresse analysieren" },
  { id: "teilen", label: "Netz teilen" },
  { id: "hosts", label: "Präfix für Hosts" },
];

const ADRESSART_LABEL: Record<Adressart, string> = {
  privat: "private Adresse (RFC 1918)",
  loopback: "Loopback (Rechner selbst)",
  "link-local": "Link-Local (automatische Adressvergabe, APIPA)",
  cgnat: "Shared Address Space (Carrier-Grade NAT)",
  multicast: "Multicast",
  reserviert: "reserviert / nicht nutzbar als Hostadresse",
  öffentlich: "öffentliche Adresse",
};

const BEISPIELE = ["192.168.10.77/26", "10.20.30.40/12", "172.16.5.130/25"];

function zahl(wert: number): string {
  return wert.toLocaleString("de-DE");
}

function Bitreihe({ titel, bits, praefix }: { titel: string; bits: string; praefix: number }) {
  const oktette = [0, 1, 2, 3].map((index) => bits.slice(index * 8, index * 8 + 8));
  return (
    <div className="subnet-bitreihe">
      <span className="subnet-bit-titel">{titel}</span>
      <code aria-label={`${titel} binär: ${oktette.join(" ")}; die ersten ${praefix} Bit gehören zum Netzanteil`}>
        {oktette.map((oktett, index) => (
          <span key={index} className="subnet-oktett" aria-hidden="true">
            {[...oktett].map((bit, position) => (
              <span key={position} className={index * 8 + position < praefix ? "bit-netz" : "bit-host"}>
                {bit}
              </span>
            ))}
          </span>
        ))}
      </code>
    </div>
  );
}

function Ergebnisliste({ info }: { info: SubnetzInfo }) {
  const hostBits = 32 - info.praefix;
  return (
    <>
      <dl className="subnet-ergebnis">
        <dt>Netzadresse</dt>
        <dd>{formatIpv4(info.netz)}</dd>
        <dt>Subnetzmaske</dt>
        <dd>
          {formatIpv4(info.maske)} (/{info.praefix})
        </dd>
        <dt>Wildcard-Maske</dt>
        <dd>{formatIpv4(info.wildcard)}</dd>
        <dt>Erste nutzbare Adresse</dt>
        <dd>{formatIpv4(info.erster)}</dd>
        <dt>Letzte nutzbare Adresse</dt>
        <dd>{formatIpv4(info.letzter)}</dd>
        <dt>Broadcast-Adresse</dt>
        <dd>{info.sonderfall ? "— (kein Broadcast bei diesem Präfix)" : formatIpv4(info.broadcast)}</dd>
        <dt>Nutzbare Hosts</dt>
        <dd>
          {zahl(info.nutzbareHosts)} (von {zahl(info.adressenGesamt)} Adressen)
        </dd>
        <dt>Art der Adresse</dt>
        <dd>{ADRESSART_LABEL[info.art]}</dd>
      </dl>
      {info.sonderfall === "punkt-zu-punkt" && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Sonderfall /31 nach RFC 3021: Beide Adressen sind für eine Punkt-zu-Punkt-Verbindung nutzbar, es gibt keine
            Netz- und Broadcast-Adresse. In Prüfungen wird meist nur bis /30 gerechnet (dann: 2² − 2 = 2 nutzbare Hosts bei /30).
          </div>
        </div>
      )}
      {info.sonderfall === "einzeladresse" && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Sonderfall /32: Das „Netz" besteht aus genau einer Adresse (z. B. für Loopback-Adressen oder Hostrouten).</div>
        </div>
      )}
      {info.adresseIstNetzadresse && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Die eingegebene Adresse ist die Netzadresse — sie kann keinem Gerät zugewiesen werden.</div>
        </div>
      )}
      {info.adresseIstBroadcast && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Die eingegebene Adresse ist die Broadcast-Adresse — sie kann keinem Gerät zugewiesen werden.</div>
        </div>
      )}

      <div className="stack">
        <span className="stat-subheading">Binär (Netzanteil fett, Hostanteil hell)</span>
        <Bitreihe titel="Adresse" bits={info.bits.adresse} praefix={info.praefix} />
        <Bitreihe titel="Subnetzmaske" bits={info.bits.maske} praefix={info.praefix} />
        <Bitreihe titel="Netzadresse" bits={info.bits.netz} praefix={info.praefix} />
      </div>

      <details className="instrument-more">
        <summary>Rechenweg</summary>
        <ol className="subnet-rechenweg">
          <li>
            Die Präfixlänge /{info.praefix} bedeutet {info.praefix} Einsen und {hostBits} Nullen: Maske {formatIpv4(info.maske)}.
          </li>
          <li>
            Netzadresse = Adresse UND Maske = {formatIpv4(info.adresse)} UND {formatIpv4(info.maske)} = {formatIpv4(info.netz)}.
          </li>
          <li>
            Wildcard-Maske = Maske invertiert = {formatIpv4(info.wildcard)}. Broadcast = Netzadresse ODER Wildcard = {formatIpv4(info.netz)} ODER{" "}
            {formatIpv4(info.wildcard)} = {formatIpv4(info.broadcast)}.
          </li>
          <li>
            {info.sonderfall
              ? `Bei /${info.praefix} gilt die Sonderregel oben (${zahl(info.nutzbareHosts)} nutzbare Adresse${info.nutzbareHosts === 1 ? "" : "n"}).`
              : `Nutzbare Hosts = 2^${hostBits} − 2 = ${zahl(info.adressenGesamt)} − 2 = ${zahl(info.nutzbareHosts)} (ohne Netz- und Broadcast-Adresse); erste nutzbare Adresse = Netzadresse + 1, letzte = Broadcast − 1.`}
          </li>
        </ol>
      </details>
    </>
  );
}

function Analysieren() {
  const [eingabe, setEingabe] = useState(BEISPIELE[0]!);
  const geparst = useMemo(() => parseCidr(eingabe), [eingabe]);
  const info = useMemo(() => (geparst ? analysiere(geparst.adresse, geparst.praefix) : null), [geparst]);
  const fehler = eingabe.trim() !== "" && !geparst
    ? /[/\s]/.test(eingabe.trim())
      ? "Ungültige Eingabe: Die Adresse braucht vier Zahlen von 0 bis 255 (ohne führende Nullen), die Maske ein Präfix (/0 bis /32) oder eine zusammenhängende Subnetzmaske."
      : "Bitte Adresse und Präfix oder Maske angeben, z. B. 192.168.10.77/26 oder 192.168.10.77 255.255.255.192."
    : null;

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="subnet-eingabe">IP-Adresse mit Präfix oder Subnetzmaske</label>
        <input
          id="subnet-eingabe"
          className="input"
          value={eingabe}
          spellCheck={false}
          autoComplete="off"
          placeholder="192.168.10.77/26"
          aria-invalid={fehler ? true : undefined}
          aria-describedby="subnet-eingabe-hinweis"
          onChange={(event) => setEingabe(event.target.value)}
        />
        <span id="subnet-eingabe-hinweis" className="field-hint">
          Beispiele:{" "}
          {BEISPIELE.map((beispiel, index) => (
            <span key={beispiel}>
              {index > 0 && " · "}
              <button type="button" className="link-muted-btn" style={{ display: "inline" }} onClick={() => setEingabe(beispiel)}>
                {beispiel}
              </button>
            </span>
          ))}
        </span>
      </div>
      <div aria-live="polite">{fehler && <p className="field-hint subnet-fehler">{fehler}</p>}</div>
      {info && <Ergebnisliste info={info} />}
    </div>
  );
}

function Teilen() {
  const [netzEingabe, setNetzEingabe] = useState("192.168.1.0/24");
  const [anzahlEingabe, setAnzahlEingabe] = useState("4");
  const geparst = useMemo(() => parseCidr(netzEingabe), [netzEingabe]);
  const anzahl = /^\d{1,3}$/.test(anzahlEingabe.trim()) ? Number(anzahlEingabe.trim()) : Number.NaN;
  const ergebnis = useMemo(() => (geparst ? teileNetz(geparst.adresse, geparst.praefix, anzahl) : null), [geparst, anzahl]);
  const basis = geparst ? analysiere(geparst.adresse, geparst.praefix) : null;

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="teilen-netz">Netz (Adresse mit Präfix oder Maske)</label>
        <input id="teilen-netz" className="input" value={netzEingabe} spellCheck={false} autoComplete="off" onChange={(event) => setNetzEingabe(event.target.value)} />
        {netzEingabe.trim() !== "" && !geparst && <span className="field-hint subnet-fehler">Ungültiges Netz, z. B. 192.168.1.0/24.</span>}
        {basis && !basis.adresseIstNetzadresse && basis.praefix <= 30 && (
          <span className="field-hint">
            Gerechnet wird mit dem Netz {formatIpv4(basis.netz)}/{basis.praefix} (die Hostbits der Eingabe werden auf 0 gesetzt).
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="teilen-anzahl">Anzahl gleich großer Subnetze (2 bis {MAX_TEILE_SUBNETZE})</label>
        <input id="teilen-anzahl" className="input" inputMode="numeric" value={anzahlEingabe} autoComplete="off" onChange={(event) => setAnzahlEingabe(event.target.value)} />
      </div>
      <div aria-live="polite">
        {ergebnis && !ergebnis.ok && <p className="field-hint subnet-fehler">{ergebnis.fehler}</p>}
        {ergebnis?.ok && (
          <p>
            Aus {formatIpv4(basis!.netz)}/{basis!.praefix} entstehen <b>{ergebnis.tatsaechlich} Subnetze mit /{ergebnis.neuesPraefix}</b> (Maske{" "}
            {formatIpv4(maskeVonPraefix(ergebnis.neuesPraefix))}) mit je <b>{zahl(ergebnis.hostsProSubnetz)} nutzbaren Hosts</b>.
            {ergebnis.tatsaechlich !== ergebnis.gewuenscht &&
              ` Gewünscht waren ${ergebnis.gewuenscht}: Subnetze lassen sich nur in Zweierpotenzen teilen, deshalb wird auf ${ergebnis.tatsaechlich} aufgerundet.`}
          </p>
        )}
      </div>
      {ergebnis?.ok && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption className="field-hint">Subnetze</caption>
            <thead>
              <tr>
                <th scope="col">Nr.</th>
                <th scope="col">Netzadresse</th>
                <th scope="col">Hostbereich</th>
                <th scope="col">Broadcast</th>
              </tr>
            </thead>
            <tbody>
              {ergebnis.subnetze.map((subnetz, index) => (
                <tr key={subnetz.netz}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {formatIpv4(subnetz.netz)}/{subnetz.praefix}
                  </td>
                  <td>
                    {formatIpv4(subnetz.erster)} – {formatIpv4(subnetz.letzter)}
                  </td>
                  <td>{formatIpv4(subnetz.broadcast)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PraefixFuerHosts() {
  const [eingabe, setEingabe] = useState("50");
  const hosts = /^\d{1,10}$/.test(eingabe.trim()) ? Number(eingabe.trim()) : Number.NaN;
  const ergebnis = useMemo(() => praefixFuerHosts(hosts), [hosts]);

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="hosts-eingabe">Benötigte Hosts (Geräte mit eigener Adresse)</label>
        <input id="hosts-eingabe" className="input" inputMode="numeric" value={eingabe} autoComplete="off" onChange={(event) => setEingabe(event.target.value)} />
        <span className="field-hint">Router-Schnittstelle, Drucker und Reserve für Wachstum mitzählen.</span>
      </div>
      <div aria-live="polite">
        {eingabe.trim() !== "" && !ergebnis && <p className="field-hint subnet-fehler">Bitte eine ganze Zahl von 1 bis 4.294.967.294 eingeben.</p>}
        {ergebnis && (
          <p>
            Du brauchst mindestens <b>/{ergebnis.praefix}</b> (Maske {formatIpv4(maskeVonPraefix(ergebnis.praefix))}): {zahl(ergebnis.adressen)} Adressen, davon{" "}
            <b>{zahl(ergebnis.nutzbareHosts)} nutzbar</b>
            {ergebnis.nutzbareHosts === hosts ? " — genau passend." : `, ${zahl(ergebnis.nutzbareHosts - hosts)} bleiben als Reserve.`} Rechenweg: kleinste Zahl h mit 2^h − 2 ≥ {zahl(hosts)};
            h = {32 - ergebnis.praefix} Hostbits, Präfix = 32 − h.
          </p>
        )}
      </div>
    </div>
  );
}

export function Subnetting({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("analysieren");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Subnetting-Rechner</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">Rechnet IPv4-Adressen und -Netze live nach — zum Üben und Kontrollieren. Die Eingaben werden nicht gespeichert.</p>
        <div className="segmented" role="tablist" aria-label="Rechner">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-subnet-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-subnet-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-subnet-${modus}`} aria-labelledby={`tab-subnet-${modus}`}>
          {modus === "analysieren" && <Analysieren />}
          {modus === "teilen" && <Teilen />}
          {modus === "hosts" && <PraefixFuerHosts />}
        </div>
      </div>
    </div>
  );
}
