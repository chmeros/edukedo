/** tRPC-Fehler mit Code UNAUTHORIZED? (Sitzung fehlt oder ist abgelaufen — im Gegensatz zu einem Netzwerkfehler.) */
export function istNichtAngemeldet(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { data?: { code?: string } }).data?.code === "UNAUTHORIZED";
}
