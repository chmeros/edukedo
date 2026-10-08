/** Maskiert eine Adresse für Logs: erster Buchstabe, Rest des Namens als Sternchen, Domain bleibt ("m***@example.com"). */
export function maskEmailAddress(address: string): string {
  const [name = "", domain = ""] = address.split("@");
  return `${name.slice(0, 1)}***@${domain}`;
}
