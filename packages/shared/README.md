# @edukedo/shared

Geteilte Zod-Schemas und TypeScript-Typen zwischen `apps/web` und `apps/api` (siehe Architekturplanung Abschnitt 7, 11).

**Bewusst nicht** mit `apps/payment` geteilt, um dessen Isolation nicht über gemeinsame Typen/Verträge aufzuweichen (siehe Architekturplanung Abschnitt 7).

## Stand

- `src/schemas/content-item.ts`: `content_item.type`/`payload`-Validierung je Typ (Architekturplanung Abschnitt 4.3, Payload-Tabelle) als diskriminierte Zod-Union.
- `src/schemas/auth.ts`: Rollen (`learner`/`content_editor`/`admin`, siehe Architekturplanung Abschnitt 13) sowie Register-/Login-Input-Schemas.
