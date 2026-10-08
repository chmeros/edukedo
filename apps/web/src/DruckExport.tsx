import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ladeTextHerunter, sichererDateiname } from "./dateiExport";

const DRUCK_KLASSE = "druck-planer";

/**
 * Review UXL-14: Die Planer versprechen "zum Kopieren und Ausdrucken", hatten aber kein Druck- oder Dateiformat. Dieser Baustein
 * druckt (oder speichert als PDF über den Browser-Druckdialog) den Entwurfstext als eigene, schlichte Seite und speichert ihn
 * als Textdatei, z. B. für den Gerätewechsel. Der Druckinhalt liegt per Portal unter <body> und ist nur beim Drucken sichtbar
 * (styles.css, Klasse `druck-planer`); die übrige Oberfläche wird dabei ausgeblendet.
 */
export function DruckExport({ titel, text }: { titel: string; text: string }) {
  useEffect(() => {
    const aufraeumen = () => document.body.classList.remove(DRUCK_KLASSE);
    window.addEventListener("afterprint", aufraeumen);
    return () => {
      window.removeEventListener("afterprint", aufraeumen);
      aufraeumen();
    };
  }, []);

  function drucke() {
    document.body.classList.add(DRUCK_KLASSE);
    window.print();
  }

  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={drucke}>
        Drucken / Als PDF speichern
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => ladeTextHerunter(`${sichererDateiname(titel)}-${new Date().toISOString().slice(0, 10)}.txt`, `${text}\r\n`, "text/plain;charset=utf-8")}
      >
        Als Textdatei speichern
      </button>
      {createPortal(
        <div className="planer-druck">
          <h1>{titel}</h1>
          <pre>{text}</pre>
        </div>,
        document.body,
      )}
    </>
  );
}
