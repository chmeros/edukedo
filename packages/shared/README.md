# @edukedo/shared

Geteilte Zod-Schemas, TypeScript-Typen und (seit F-42) reine, DB-freie Business-Logik zwischen `apps/web` und `apps/api` (siehe Architekturplanung Abschnitt 7, 11).

**Bewusst nicht** mit `apps/payment` geteilt, um dessen Isolation nicht über gemeinsame Typen/Verträge aufzuweichen (siehe Architekturplanung Abschnitt 7).

## Stand

- `src/schemas/content-item.ts`: `content_item.type`/`payload`-Validierung je Typ (Architekturplanung Abschnitt 4.3, Payload-Tabelle) als diskriminierte Zod-Union.
- `src/schemas/auth.ts`: Rollen (`learner`/`content_editor`/`admin`, siehe Architekturplanung Abschnitt 13) sowie Register-/Login-Input-Schemas.
- `src/fsrs/scheduler.ts` (F-20, von `apps/api` hierher verschoben für F-42 Offline-Modus): reiner FSRS-Scheduler (`initialProgressState`/`scheduleReview`, Bibliothek `ts-fsrs`) ohne DB-/Netzwerkzugriff — Client und Server nutzen denselben Code, damit eine Karteikarte offline ohne Serverkontakt korrekt weitergeplant werden kann. Siehe Architekturplanung Abschnitt 13.
- `src/quiz-logic.ts` (F-21, ebenfalls von `apps/api` hierher verschoben für F-42): reine Formungs-/Prüflogik für die vier Quiz-Formate (`shapeQuizItem`, `checkMcAnswer`/`checkMatching`/`checkBlanks`/`checkKurzantwort`) — Client (offline) und Server prüfen Antworten damit identisch. Wirft eine eigene `QuizItemNotFoundError` statt `TRPCError`, damit dieses Modul kein Server-Framework in den Browser-Bundle zieht. Siehe Architekturplanung Abschnitt 13.
