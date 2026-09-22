import type { UserRole } from "@edukedo/shared";

/**
 * Rollenbasierte Autorisierung (Architekturplanung Abschnitt 7): learner, admin sind Rollen
 * innerhalb "user"; "parent" ist ein eigener Account-Typ (siehe Abschnitt 13).
 */
export function hasRole(role: UserRole, allowed: readonly UserRole[]): boolean {
  return allowed.includes(role);
}
