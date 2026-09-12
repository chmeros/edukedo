# edukedo — Projektkontext für Claude Code

Dieses Repository ist das Umsetzungs-Repo für **edukedo**, eine Lernplattform für Prüfungsvorbereitung und Wissenserwerb (Pilot-Kurs: IHK-Fachwirt für Büro- und Projektorganisation; zweiter Kurs: Mathematik Klasse 9, bundeslandneutral).

Die vollständige Planung liegt in `docs/` und ist die Quelle der Wahrheit für Anforderungen, Architektur und Reihenfolge der Umsetzung. **Vor jeder größeren Änderung sollten die relevanten Abschnitte dieser Dokumente gelesen werden**, insbesondere bevor neue Tabellen, Endpunkte oder Abhängigkeiten hinzugefügt werden.

## Die vier Planungsdokumente

- **`docs/Projektziel.md`** — Mission, Vision und grober Rahmen (Kurzfassung, guter Einstieg).
- **`docs/Anforderungskatalog.md`** (Version 0.19) — vollständiger fachlicher Anforderungskatalog: Zielgruppen, Content-Modell, funktionale Anforderungen (F-xx), nicht-funktionale Anforderungen (N-xx), rechtliche Hinweise, Phasenplanung, vollständiges Entscheidungsprotokoll. Bei Unklarheit über *was* gebaut werden soll und *warum*, zuerst hier nachsehen.
- **`docs/Architekturplanung.md`** (Version 0.6) — technische Umsetzung: Technologie-Stack, Systemarchitektur, vollständiges Datenmodell inkl. SQL-DDL (Abschnitt 4), Sicherheits-/Datenschutzkonzept, Testkonzept, Repository-Struktur. Bei Unklarheit über *wie* etwas gebaut werden soll, zuerst hier nachsehen.
- **`docs/Entwicklungsplan.md`** — iterativer, nicht-kalendarischer Umsetzungsplan mit Aufgaben je Bereich (Programmierung Kern/Payment, Content, Recht & Compliance, Organisatorisches, Testing, Nutzer:innen-Feedback), unterteilt in Iterationen 0–6. **Das ist die Aufgabenliste** — hier steht, was als Nächstes dran ist.

## Wichtige, bereits getroffene Grundsatzentscheidungen (Kurzfassung)

- **Tech-Stack:** React + TypeScript + Vite (Frontend), Node.js + TypeScript mit Fastify/NestJS (Kern-Backend), tRPC für die Kern-API, PostgreSQL (Kern und Payment als **zwei getrennte Datenbanken**), Drizzle/Prisma als ORM, Redis + BullMQ für die Kern↔Payment-Event-Queue, S3-kompatibler Objektspeicher für Medien.
- **Auth:** komplett Eigenbau (Argon2id, signierte httpOnly-Session-Cookies, ggf. Lucia als Ausgangspunkt) — kein Managed-Auth-Anbieter, wegen der benötigten Eltern-Kind-Verknüpfung.
- **Payment:** von Anfang an ein vollständig separater Service mit eigener Datenbank und eigenem Deployment (`/apps/payment`), kommuniziert mit dem Kern nur über eine schmale REST-API plus Event-Queue. Wird laut Entwicklungsplan erst in **Iteration 6** tatsächlich gebaut.
- **Spaced Repetition:** FSRS (Bibliothek `ts-fsrs`), nicht SM-2.
- **Content-Modell:** generisch `Kurs → Fachgebiet → Thema → Content-Item`, damit sowohl der Fachwirt-Pilot als auch der Mathematik-Kurs ohne Schema-Änderung abgebildet werden. Content-Items sind relational, wo die Struktur stabil ist (Multiple-Choice über `answer_option`), und nutzen ein `payload`-JSONB-Feld, wo sie variiert (Lückentext, Kurzantwort, Fallaufgabe). Volles SQL-Schema in Architekturplanung Abschnitt 4.3.
- **Jugendschutz/Reihenfolge (wichtig!):** Der Mathe-Kurs richtet sich überwiegend an Minderjährige und darf laut Architekturplanung erst live gehen (`kurs.is_published = true`), **nachdem** der vollständige Eltern-Consent-Flow (F-08/F-90) produktiv steht. Der Entwicklungsplan bildet das explizit ab: Iteration 2 = Consent-Flow, erst danach Iteration 3 = Mathe-Kurs-Aktivierung. Diese Reihenfolge nicht vertauschen.
- **Monetarisierung ist Nebensache:** Die Plattform ist mission-getrieben (kostenfreier Wissenszugang als Zweck, nicht nur Mittel). Nur KI-Funktionen und erweiterter Content-Umfang sind kostenpflichtig geplant, und das erst in Iteration 6.

## Repository-Struktur

```
/apps
  /web        → React-PWA-Frontend
  /api        → Kern-Backend (Fastify/NestJS) — Auth, Consent, Content, Sync, Sozial
  /payment    → Eigenständiger Payment-Service (erst ab Iteration 6, aktuell nur Platzhalter)
/packages
  /shared     → geteilte Zod-Schemas/Typen für Kern (Frontend+API) — bewusst nicht mit /payment geteilt
/docs         → die vier Planungsdokumente (siehe oben)
```

Details und Begründung in Architekturplanung Abschnitt 11.

## Woran gerade gearbeitet wird

Der aktuelle Stand befindet sich noch am Anfang von **Iteration 0** (Grundgerüst & Vorbereitung) aus `docs/Entwicklungsplan.md`. Die konkrete, abzuhakende Aufgabenliste für diese und alle folgenden Iterationen steht in diesem Dokument — dort nachsehen, was als Nächstes ansteht, und erledigte Punkte dort mit `- [x]` abhaken.

## Hinweise für die Arbeit in diesem Repo

- Bei jeder Design-Entscheidung, die von den Planungsdokumenten abweicht oder sie konkretisiert (z. B. eine Detailfrage, die dort offen gelassen wurde), sollte das in `docs/Architekturplanung.md` Abschnitt 13 ("Architekturentscheidungen") nachgetragen werden, damit die Dokumentation nicht vom tatsächlichen Code abdriftet.
- Datenbank-Migrationen sollten dem SQL-Schema in `docs/Architekturplanung.md` Abschnitt 4.3 möglichst direkt folgen (Tabellen-/Spaltennamen, Constraints, Lösch-Verhalten) — dort steht auch die Begründung für jede Design-Entscheidung (Abschnitt 4.1, 4.4).
- Kern und Payment sind bewusst vollständig getrennt (eigene Datenbank, eigene Secrets, eigene Deploy-Pipeline) — niemals eine gemeinsame DB-Verbindung oder gemeinsame ORM-Modelle zwischen `/apps/api` und `/apps/payment` einführen.
