/** Lädt einen Text als Datei herunter (Blob + Link), ohne Server. */
export function ladeTextHerunter(dateiname: string, text: string, typ = "text/csv;charset=utf-8"): void {
  const blob = new Blob([text], { type: typ });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = dateiname;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const BOM = String.fromCharCode(0xfeff);

/**
 * CSV für deutsches Excel: Semikolon als Trenner, Anführungszeichen bei Bedarf, vorangestelltes BOM (damit Umlaute stimmen).
 * Zellen, die mit =, +, - oder @ beginnen, bekommen ein Hochkomma vorangestellt (Schutz vor Formeln in Tabellenprogrammen).
 */
export function csvText(zeilen: (string | number | null)[][]): string {
  const zelle = (wert: string | number | null): string => {
    let text = wert === null ? "" : String(wert);
    if (/^[=+\-@]/.test(text) && typeof wert === "string") text = `'${text}`;
    return /[;"\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return `${BOM}${zeilen.map((zeile) => zeile.map(zelle).join(";")).join("\r\n")}\r\n`;
}

/** Dateiname ohne Sonderzeichen. */
export function sichererDateiname(text: string): string {
  return text.normalize("NFKD").replace(/[^\w.-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) || "export";
}
