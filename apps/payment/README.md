# @edukedo/payment (Platzhalter)

Eigenständiger Payment-Service mit eigener Datenbank und eigenem Deployment (siehe Architekturplanung Abschnitt 1, 3, 8).

**Bewusst leer bis Iteration 6** (siehe Entwicklungsplan): Erst wenn das Validierungs-Gate nach Iteration 5 positiv ausfällt, wird dieser Service tatsächlich aufgesetzt — eigene Datenbank, eigenes Deployment, eigene Secrets, niemals eine gemeinsame DB-Verbindung mit `/apps/api`.
