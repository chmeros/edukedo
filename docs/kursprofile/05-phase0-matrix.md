# Phase 0 — Kurs-Allowlist: Matrix je Kurs (Entscheidungsvorlage)

Stand 06.10.2026 · **Entscheidungsvorlage, es wurde nichts umgesetzt.** Grundlage: die Bestandsbewertungen in `01`–`04` (Blätter) und die Kataloge im Code. Die Matrix beantwortet für jeden der 14 Kurse (Mathematik ausgenommen) und jeden heute im Katalog vorhandenen Eintrag: **Was wird im Kurs angeboten?** Sie enthält nur Urteile aus den Blättern; wo ein Blatt schweigt, steht „Urteil fehlt" mit meiner Empfehlung.

> Hinweis zur Kurszahl: Der Auftrag nennt „15 Kurse", die aufgezählten Kurse sind 14 (4 Fachinformatiker, Industriefachwirt, Technischer Fachwirt, Wirtschaftsfachwirt, Transport/Logistik, Handelsfachwirt, Immobilienfachwirt, Versicherungen/Finanzanlagen, Büro/Projektorganisation, Gesundheit/Soziales, AEVO). Die 15. Zahl ergibt sich nur mit Mathematik, die hier ausgenommen ist.

---

## 1. Lesehilfe

### 1.1 Werte der Spalte „Phase 0"

| Wert | Bedeutung | Quelle des Urteils |
|---|---|---|
| **zeigen** | Eintrag steht in der Allowlist des Kurses (Kernangebot) | Blatt-Urteil „passt" / „passt (Kern)" / „passt mit Vorbehalt" / „passt bedingt" |
| **Grundlagen** | Eintrag steht in der Allowlist, aber in der Gruppe „Grundlagen" (**nur Fachinformatiker**, Entscheidung R1) | Blatt-Urteil „passt (Grundlagen)" |
| **ausblenden** | Eintrag steht nicht in der Allowlist | Blatt-Urteil „passt nicht" |
| **Entscheidung nötig** | Blatt-Urteil „unsicher"/„Lücke" — mit meiner Empfehlung (Z = zeigen, G = Grundlagen, – = ausblenden) und einem Satz Begründung | Blatt-Urteil „unsicher" |
| *Urteil fehlt* | Das Blatt enthält zu diesem Katalogeintrag keine ausdrückliche Bewertung; die Phase-0-Angabe ist **meine Empfehlung** (in der Matrix mit `*`) | — |

Zusätze: **(ohne Content)** = Blatt sagt „passt, aber ohne Content" (Typ gehört in die Allowlist, im Kurs gibt es heute keine Items/Sets). **†** = nur eine Szenario-Auswahl (Terminal/Topologie/Flag-Rätsel), siehe Abschnitt 5.

### 1.2 Beleg-Kürzel

`NN K.2 Z.xx` = Blatt `NN`, Abschnitt der Bestandsbewertung, Zeile im Blatt (Stand 06.10.2026; Zeilennummern können sich bei Änderung der Blätter verschieben).

| Kürzel | Blatt / Abschnitt |
|---|---|
| 01 A.2 / B.2 / C.2 / D.2 | `01-fachinformatiker.md`: Anwendungsentwicklung / Daten- und Prozessanalyse / Digitale Vernetzung / Systemintegration (Bestandsbewertung); „01 4.2" = Unterschiedstabelle Z.1002–1031 |
| 02 IND.2 / TEC.2 / WIR.2 / LOG.2 | `02-industrie-technik-logistik.md`: Industriefachwirt / Technischer Fachwirt / Wirtschaftsfachwirt / Transport-Logistik (Bestandsbewertung bzw. Abschnitt „1. Prüfungsrahmen" = `.1`) |
| 03 A.2 / B.2 / C.2 | `03-handel-immobilien-versicherung.md`: Handelsfachwirt / Immobilienfachwirt / Versicherungen und Finanzanlagen |
| 04 A.2 / B.2 / C.2 | `04-buero-gesundheit-aevo.md`: Büro/Projektorganisation / Gesundheit und Soziales / AEVO |

### 1.3 Annahmen und Auslegungen (bitte gegenlesen)

1. **Rangfolge der Urteile:** „passt bedingt" / „passt mit Vorbehalt" zähle ich als *zeigen*; der Vorbehalt (Beschriftung „Gantt", 2×2-Risikomatrix) steht in der Hinweisspalte und ist **keine** Phase-0-Frage.
2. **„Passt (Grundlagen)" bei Teilmengen** (Terminal, Topologie, Flag-Rätsel bei AE/DPA; Auswahl bei DV/SI): Phase 0 gilt für den Typ, die Teilmenge ist eine Szenario-Gruppe (Abschnitt 5, entspricht R2 „je Typ bzw. Set/Szenario-Gruppe").
3. **Spieltypen mit Sets:** Heute existieren Sets nur für die vier FI-Kurse (11 Zeilen in `seed-games.ts`) und für Büro (3 Zeilen, `setKey` = `standard`). In allen anderen Kursen gibt es **kein** Spiel-Set; die Allowlist wirkt dort erst, wenn Phase 1 Sets anlegt. In den Matrizen steht die **Absicht** (Allowlist), nicht die heutige Sichtbarkeit.
4. **Lernpfade** hängen an einem Instrumenttyp (`instrument_type`). Heute vorhanden: BSC (nur Büro) und Scrum/OSI/Schutzziele/Normalformen/ER-Modell (nur FI, je Kurs identisch). Für alle übrigen Kurse gibt es heute keinen Lernpfad; Vorschläge (z. B. L-FW-01) sind keine Bestandsurteile und stehen hier nicht.
5. **Werkzeuge** sind heute schon über `kurs.metadata.werkzeuge` je Kurs freigeschaltet (FI: alle sechs; Büro, Immobilien, Versicherungen: nur `netzplan`; alle übrigen: keines). Phase 0 vereinheitlicht das mit den Instrumenten und Spielen in einer Allowlist.
6. **Auslegung R8** („Verordnungswerte mit Hinweis …; unsichere Werte bleiben, bis geklärt"): Ich lese „bleiben" als *Standardwert 10 Minuten bleibt unverändert*, solange das Blatt keinen gesicherten Verordnungswert nennt (betrifft Technischer Fachwirt und Wirtschaftsfachwirt). Falls anders gemeint: siehe Entscheidungen E-TEC-3 und E-WIR-5.

---

## 2. Katalog heute (Schlüssel)

| Gruppe | Schlüssel | Quelle im Code |
|---|---|---|
| Instrumente (17) | `swot`, `bsc`, `ansoff`, `gantt`, `eisenhower`, `pdca`, `risiko`, `hierarchie`, `osi`, `schutzziele`, `sql`, `scrum`, `uml`, `teststufen`, `ermodell`, `normalisierung`, `ablauf` | `apps/web/src/Instrumente.tsx` (`INSTRUMENT_CATALOG`, ohne `werkzeug`) |
| Werkzeuge (6) | `netzplan`, `subnetting`, `sqluebung`, `terminal`, `topologie`, `flags` | `INSTRUMENT_CATALOG` (mit `werkzeug: true`), Freischaltung über `KURS_META.*.metadata.werkzeuge` |
| Spieltypen (9) | `kreuzwortraetsel`, `kennzahlen_duell` (Anzeige „Duell"), `memory`, `phishing`, `bughunt`, `codereihenfolge`, `troubleshooting`, `subnetting`, `zahlensysteme` | `apps/web/src/Spiele.tsx` (`GAME_CATALOG`) |
| Spiel-Sets (heute 14 verschiedene Sets) | FI (je Kurs 11): `kreuzwortraetsel/standard` („IT-Fachbegriffe"), `kreuzwortraetsel/netzwerk-sicherheit`, `kennzahlen_duell/standard` („IT-Grundlagen"), `kennzahlen_duell/sql`, `memory/standard` („IT-Begriffe"), `memory/ports`, je ein Set `standard` für `phishing`, `bughunt`, `codereihenfolge`, `troubleshooting`, `subnetting`, `zahlensysteme`. Büro (3): `kreuzwortraetsel/standard` („Finanzkennzahlen"), `kennzahlen_duell/standard` („QM und Prozesse"), `memory/standard` („Personal") | `apps/api/src/db/seed-games.ts` |
| Lernpfade (6 Typen) | Büro: `bsc` („Nordstern GmbH"). FI (je Kurs 5): `scrum`, `osi`, `schutzziele`, `normalisierung`, `ermodell` (die beiden letzten teilen sich einen Pfad) | `apps/api/src/db/seed-instrument-lernpfad.ts` |
| Prüfungsrahmen | `pruefungsablauf`, `pruefungsbereiche`, `presentationMinutes` (Standard 10, `Praesentationstrainer.tsx`), `projekt` | `KURS_META` in `apps/api/src/db/import-content.ts`; heute nur FI (alle drei) und AEVO (`presentationMinutes: 15`) |

---

## 3. Matrix je Kurs

Spalten: **Schlüssel · Eintrag · Phase 0 · Beleg · Hinweis / Empfehlung.** Bei den Kursen ohne Spiel-Set (alle außer FI und Büro) stehen die Spielzeilen auf Typebene; die FI-Zusatz-Sets (`netzwerk-sicherheit`, `sql`, `ports`) und die FI-Lernpfade existieren dort nicht und sind weggelassen. Bei „Entscheidung nötig" steht die Empfehlung in der Hinweisspalte und mit Nummer in Abschnitt 7.

### 3.1 Fachinformatiker/in Anwendungsentwicklung (`fachinformatiker-anwendungsentwicklung`)

Blatt: 01 Abschnitt A. Gruppe „Grundlagen" (Teil 1) laut R1 sichtbar.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | ausblenden | 01 A.2 Z.60 | BWL-Modell; vorhandene Quizfrage in FU1 1.2 bleibt als normale Frage (offene Frage 3, 01 Z.1058) |
| `bsc` | Balanced Scorecard | ausblenden | 01 A.2 Z.61 | ohne Content im Kurs |
| `ansoff` | Ansoff-Matrix | ausblenden | 01 A.2 Z.62 | wie BSC |
| `gantt` | Gantt-Diagramm | zeigen | 01 A.2 Z.63 | Kern (Projektplanung § 12) |
| `eisenhower` | Eisenhower-Matrix | **Entscheidung nötig** | 01 A.2 Z.64 | E-AE-1: Empfehlung **ausblenden** — kein Prüfungsbeleg gefunden |
| `pdca` | PDCA-Zyklus | Grundlagen | 01 A.2 Z.65 | |
| `risiko` | Risikomatrix | Grundlagen | 01 A.2 Z.66 | |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 01 A.2 Z.67 | Kern |
| `osi` | OSI-Modell | Grundlagen | 01 A.2 Z.68 | |
| `schutzziele` | Schutzziele der IT-Sicherheit | zeigen | 01 A.2 Z.69 | Kern |
| `sql` | SQL-Befehlsgruppen | zeigen | 01 A.2 Z.70 | Kern |
| `scrum` | Scrum | zeigen | 01 A.2 Z.71 | Kern |
| `uml` | UML-Diagramme | zeigen | 01 A.2 Z.72 | Kern |
| `teststufen` | Teststufen im V-Modell | zeigen | 01 A.2 Z.73 | Kern |
| `ermodell` | ER-Modell | zeigen | 01 A.2 Z.74 | Kern |
| `normalisierung` | Normalformen | zeigen | 01 A.2 Z.75 | Kern |
| `ablauf` | Struktogramm und Programmablauf | **Entscheidung nötig** | 01 A.2 Z.76 | E-AE-2: Empfehlung **zeigen** — Typ bleibt, Umbau zu „Ablaufstrukturen" (I-AE-00) läuft separat in Phase 1 |
| `netzplan` | Netzplan | Grundlagen | 01 A.2 Z.78 | Beleg im Blatt als „schwach" bezeichnet; heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | Grundlagen | 01 A.2 Z.79 | heute freigeschaltet |
| `sqluebung` | SQL-Übungsfläche | zeigen | 01 A.2 Z.80 | Kern; heute freigeschaltet |
| `terminal` | Terminal-Szenarien | Grundlagen† | 01 A.2 Z.81 | nur Stufe „leicht" (4 von 12), die 8 mittleren/schweren ausblenden |
| `topologie` | Netzwerk-Topologie | Grundlagen† | 01 A.2 Z.82 | nur Stufe „leicht" (3 von 9), 6 ausblenden |
| `flags` | Flag-Rätsel | Grundlagen† | 01 A.2 Z.83 | Auswahl (Kodierung/Hash, Passwort-Hashes, JWT, Pfad-Traversal, Phishing-Header), Abschnitt 5 |
| `kreuzwortraetsel/standard` | Kreuzworträtsel: IT-Fachbegriffe | Grundlagen | 01 A.2 Z.85 | Set generisch |
| `kreuzwortraetsel/netzwerk-sicherheit` | Kreuzworträtsel: Netzwerk und IT-Sicherheit | Grundlagen | 01 A.2 Z.85 | „nur Grundlagen" |
| `kennzahlen_duell/standard` | Begriffe-Duell: IT-Grundlagen | Grundlagen | 01 A.2 Z.86; 01 4.2 Z.1023 | generisch |
| `kennzahlen_duell/sql` | Begriffe-Duell: SQL und Datenmodellierung | zeigen | 01 A.2 Z.86 | Kern (§ 14) |
| `memory/standard` | IT-Memory: Abkürzungen und Begriffe | Grundlagen | 01 A.2 Z.87 | generisch |
| `memory/ports` | IT-Memory: Ports und Protokolle | Grundlagen | 01 A.2 Z.87 | Netzwerkgrundlage |
| `phishing` | Phishing-Detektiv | Grundlagen | 01 A.2 Z.88 | |
| `bughunt` | Bug-Hunt | zeigen | 01 A.2 Z.89 | Kern (§ 14) |
| `codereihenfolge` | Code-Reihenfolge | zeigen | 01 A.2 Z.90 | Kern |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | 01 A.2 Z.91 | Netzwerkstörungen kein AE-Bereich |
| `subnetting` (Spiel) | Subnetting-Sprint | Grundlagen | 01 A.2 Z.92 | |
| `zahlensysteme` | Zahlensystem-Sprint | Grundlagen | 01 A.2 Z.93 | |
| Lernpfad `scrum` | Scrum im Wartungs-App-Projekt | zeigen | 01 A.2 Z.96 | Kern |
| Lernpfad `osi` | Netzwerkfehler Schicht für Schicht | Grundlagen | 01 A.2 Z.97 | |
| Lernpfad `schutzziele` | Ein Sicherheitsvorfall bei der Brevanta | zeigen | 01 A.2 Z.98 | Kern |
| Lernpfad `normalisierung` | Von der Anforderung zum Datenmodell | zeigen | 01 A.2 Z.99 | Kern |
| Lernpfad `ermodell` | Von der Anforderung zum Datenmodell | zeigen | 01 A.2 Z.99 | Kern |

**Prüfungsrahmen:**
- `pruefungsablauf`: **ja** (heute gesetzt) · `pruefungsbereiche`: **ja** (Teil 1, zwei Teil-2-Bereiche, WiSo) · `projekt`: ja (80 Std.).
- Präsentationsdauer: heute 15 Min.; **Soll 15 Min.** (Präsentation höchstens 15, mit Fachgespräch höchstens 30; 01 A.1 Z.48) — kein Änderungsbedarf, Sicherheit hoch.
- Konfiguration S: keine Änderung nötig; Schärfungen P-AE-01/02 gehören nicht zu Phase 0.

### 3.2 Fachinformatiker/in Daten- und Prozessanalyse (`fachinformatiker-daten-prozessanalyse`)

Blatt: 01 Abschnitt B. Gruppe „Grundlagen" laut R1 sichtbar.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | ausblenden | 01 B.2 Z.277 | |
| `bsc` | Balanced Scorecard | ausblenden | 01 B.2 Z.278 | |
| `ansoff` | Ansoff-Matrix | ausblenden | 01 B.2 Z.279 | |
| `gantt` | Gantt-Diagramm | zeigen | 01 B.2 Z.280 | Kern |
| `eisenhower` | Eisenhower-Matrix | **Entscheidung nötig** | 01 B.2 Z.281 | E-DPA-1: Empfehlung **ausblenden** — kein Prüfungsbeleg |
| `pdca` | PDCA-Zyklus | zeigen | 01 B.2 Z.282 | Kern (KVP § 29) |
| `risiko` | Risikomatrix | Grundlagen | 01 B.2 Z.283 | |
| `hierarchie` | Projektstrukturplan / Organigramm | Grundlagen | 01 B.2 Z.284 | |
| `osi` | OSI-Modell | Grundlagen | 01 B.2 Z.285 | |
| `schutzziele` | Schutzziele der IT-Sicherheit | zeigen | 01 B.2 Z.286 | Kern (§ 30) |
| `sql` | SQL-Befehlsgruppen | zeigen | 01 B.2 Z.287 | Kern |
| `scrum` | Scrum | Grundlagen | 01 B.2 Z.288 | |
| `uml` | UML-Diagramme | **Entscheidung nötig** | 01 B.2 Z.289 | E-DPA-2: Empfehlung **ausblenden** — DPA nutzt BPMN/EPK; der Aktivitätsdiagramm-Anteil kommt über I-DPA-02 |
| `teststufen` | Teststufen im V-Modell | **Entscheidung nötig** | 01 B.2 Z.290 | E-DPA-2: Empfehlung **ausblenden** — Software-Teststufen kein DPA-Prüfungsinhalt |
| `ermodell` | ER-Modell | zeigen | 01 B.2 Z.291 | Kern |
| `normalisierung` | Normalformen | zeigen | 01 B.2 Z.292 | Kern |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 01 B.2 Z.293 | Struktogramm/PAP gestrichen |
| `netzplan` | Netzplan | Grundlagen | 01 B.2 Z.295 | heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | Grundlagen | 01 B.2 Z.296 | |
| `sqluebung` | SQL-Übungsfläche | zeigen | 01 B.2 Z.297 | Kern |
| `terminal` | Terminal-Szenarien | Grundlagen† | 01 B.2 Z.298 | nur „leicht" (4) |
| `topologie` | Netzwerk-Topologie | Grundlagen† | 01 B.2 Z.299 | nur „leicht" (3) |
| `flags` | Flag-Rätsel | Grundlagen† | 01 B.2 Z.300 | Auswahl (Kodierung, Hash/Prüfsumme, Passwort-Hashes, Phishing-Header); Abschnitt 5 |
| `kreuzwortraetsel/standard` | Kreuzworträtsel: IT-Fachbegriffe | Grundlagen | 01 B.2 Z.302 | |
| `kreuzwortraetsel/netzwerk-sicherheit` | Kreuzworträtsel: Netzwerk und IT-Sicherheit | Grundlagen | 01 B.2 Z.302 | |
| `kennzahlen_duell/standard` | Begriffe-Duell: IT-Grundlagen | Grundlagen | 01 B.2 Z.303 | |
| `kennzahlen_duell/sql` | Begriffe-Duell: SQL und Datenmodellierung | zeigen | 01 B.2 Z.303 | Kern |
| `memory/standard` | IT-Memory: Abkürzungen und Begriffe | Grundlagen | 01 B.2 Z.304 | |
| `memory/ports` | IT-Memory: Ports und Protokolle | Grundlagen | 01 B.2 Z.304 | „nur Teil 1" |
| `phishing` | Phishing-Detektiv | Grundlagen | 01 B.2 Z.305 | |
| `bughunt` | Bug-Hunt | **Entscheidung nötig** | 01 B.2 Z.306 | E-DPA-3: Empfehlung **ausblenden bis Ersatzset** — Typ passt, aber heutige Java-/JavaScript-Ausschnitte nicht (Python/SQL-Analysecode nötig) |
| `codereihenfolge` | Code-Reihenfolge | **Entscheidung nötig** | 01 B.2 Z.307 | E-DPA-3: Empfehlung **ausblenden bis Ersatzset** — wie Bug-Hunt |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | 01 B.2 Z.308 | |
| `subnetting` (Spiel) | Subnetting-Sprint | Grundlagen | 01 B.2 Z.309 | |
| `zahlensysteme` | Zahlensystem-Sprint | Grundlagen | 01 B.2 Z.310 | |
| Lernpfad `scrum` | Scrum im Wartungs-App-Projekt | Grundlagen | 01 B.2 Z.313 | |
| Lernpfad `osi` | Netzwerkfehler Schicht für Schicht | Grundlagen | 01 B.2 Z.314 | |
| Lernpfad `schutzziele` | Ein Sicherheitsvorfall bei der Brevanta | zeigen | 01 B.2 Z.315 | Kern |
| Lernpfad `normalisierung` | Von der Anforderung zum Datenmodell | zeigen | 01 B.2 Z.316 | Kern |
| Lernpfad `ermodell` | Von der Anforderung zum Datenmodell | zeigen | 01 B.2 Z.316 | Kern |

**Prüfungsrahmen:**
- `pruefungsablauf`: **ja** · `pruefungsbereiche`: **ja** · `projekt`: ja (40 Std.).
- Präsentationsdauer: heute 15 Min.; **Soll 15 Min.** (01 B.1 Z.265) — kein Änderungsbedarf.
- **Unsicher** (nicht Phase 0): Fachgebiet DP3 (Statistik) steht im Code im Bereich „Sicherstellen der Datenqualität", die FIAusbV nennt es beim Projekt (01 B.1 Z.270; offene Frage 10). Der amtliche Prüfungskatalog für DPA ist nicht frei verfügbar.

### 3.3 Fachinformatiker/in Digitale Vernetzung (`fachinformatiker-digitale-vernetzung`)

Blatt: 01 Abschnitt C. Gruppe „Grundlagen" laut R1 sichtbar.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | ausblenden | 01 C.2 Z.488 | |
| `bsc` | Balanced Scorecard | ausblenden | 01 C.2 Z.489 | |
| `ansoff` | Ansoff-Matrix | ausblenden | 01 C.2 Z.490 | |
| `gantt` | Gantt-Diagramm | zeigen | 01 C.2 Z.491 | Kern |
| `eisenhower` | Eisenhower-Matrix | **Entscheidung nötig** | 01 C.2 Z.492 | E-DV-1: Empfehlung **ausblenden** — kein Prüfungsbeleg |
| `pdca` | PDCA-Zyklus | Grundlagen | 01 C.2 Z.493 | |
| `risiko` | Risikomatrix | zeigen | 01 C.2 Z.494 | Kern (LF 11d) |
| `hierarchie` | Projektstrukturplan / Organigramm | Grundlagen | 01 C.2 Z.495 | |
| `osi` | OSI-Modell | zeigen | 01 C.2 Z.496 | Kern |
| `schutzziele` | Schutzziele der IT-Sicherheit | zeigen | 01 C.2 Z.497 | Kern |
| `sql` | SQL-Befehlsgruppen | **Entscheidung nötig** | 01 C.2 Z.498 | E-DV-2 (SQL-Block): Empfehlung **ausblenden** — SQL nur in Teil 2 geprüft, §§ 36–38 nennen keine Datenbankabfragen; Alternative: Grundlagen (LF 5/8) |
| `scrum` | Scrum | Grundlagen | 01 C.2 Z.499 | |
| `uml` | UML-Diagramme | **Entscheidung nötig** | 01 C.2 Z.500 | E-DV-3: Empfehlung **ausblenden** — im DV-Prüfungsrahmen nicht genannt |
| `teststufen` | Teststufen im V-Modell | zeigen | 01 C.2 Z.501 | Kern (LF 10d) |
| `ermodell` | ER-Modell | **Entscheidung nötig** | 01 C.2 Z.502 | E-DV-2: Empfehlung **ausblenden** |
| `normalisierung` | Normalformen | **Entscheidung nötig** | 01 C.2 Z.503 | E-DV-2: Empfehlung **ausblenden** |
| `ablauf` | Struktogramm und Programmablauf | **Entscheidung nötig** | 01 C.2 Z.504 | E-DV-3: Empfehlung **ausblenden** — Struktogramm gestrichen, DV programmiert Skripte, aber nicht als Struktogramm |
| `netzplan` | Netzplan | Grundlagen | 01 C.2 Z.506 | heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | zeigen | 01 C.2 Z.507 | Kern |
| `sqluebung` | SQL-Übungsfläche | **Entscheidung nötig** | 01 C.2 Z.508 | E-DV-2: Empfehlung **ausblenden** |
| `terminal` | Terminal-Szenarien | zeigen† | 01 C.2 Z.509 | Auswahl: Netz-/Dienst-/Log-Szenarien; Cron und Dateirechte ausblenden (01 C.2 Z.530); Abschnitt 5 |
| `topologie` | Netzwerk-Topologie | zeigen | 01 C.2 Z.510 | Kern; Industrie-Szenarien fehlen noch (Phase 3) |
| `flags` | Flag-Rätsel | zeigen† | 01 C.2 Z.511 | Auswahl: Logs, Ports, DNS-Tunnel, Klartext im Mitschnitt; Abschnitt 5 |
| `kreuzwortraetsel/standard` | Kreuzworträtsel: IT-Fachbegriffe | Grundlagen | 01 C.2 Z.513 | |
| `kreuzwortraetsel/netzwerk-sicherheit` | Kreuzworträtsel: Netzwerk und IT-Sicherheit | zeigen | 01 C.2 Z.513 | Kern |
| `kennzahlen_duell/standard` | Begriffe-Duell: IT-Grundlagen | Grundlagen | 01 C.2 Z.514 | |
| `kennzahlen_duell/sql` | Begriffe-Duell: SQL und Datenmodellierung | **Entscheidung nötig** | 01 C.2 Z.514 | E-DV-2: Empfehlung **ausblenden** |
| `memory/standard` | IT-Memory: Abkürzungen und Begriffe | Grundlagen | 01 C.2 Z.515 | |
| `memory/ports` | IT-Memory: Ports und Protokolle | zeigen | 01 C.2 Z.515 | Kern (§ 38) |
| `phishing` | Phishing-Detektiv | Grundlagen | 01 C.2 Z.516 | |
| `bughunt` | Bug-Hunt | **Entscheidung nötig** | 01 C.2 Z.517 | E-DV-4: Empfehlung **ausblenden bis Ersatzset** — Typ passt (LF 10d), aber Java/JS/SQL-Ausschnitte nicht; Sensor-/Gateway-Skripte nötig |
| `codereihenfolge` | Code-Reihenfolge | **Entscheidung nötig** | 01 C.2 Z.518 | E-DV-4: wie Bug-Hunt |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen | 01 C.2 Z.519 | Kern (§ 37); heutiger Inhalt ist Büro-Netz, Industrie-Set folgt (S-DV-01) |
| `subnetting` (Spiel) | Subnetting-Sprint | zeigen | 01 C.2 Z.520 | Kern |
| `zahlensysteme` | Zahlensystem-Sprint | zeigen | 01 C.2 Z.521 | Kern |
| Lernpfad `scrum` | Scrum im Wartungs-App-Projekt | Grundlagen | 01 C.2 Z.524 | |
| Lernpfad `osi` | Netzwerkfehler Schicht für Schicht | zeigen | 01 C.2 Z.525 | Kern |
| Lernpfad `schutzziele` | Ein Sicherheitsvorfall bei der Brevanta | zeigen | 01 C.2 Z.526 | Kern |
| Lernpfad `normalisierung` | Von der Anforderung zum Datenmodell | **Entscheidung nötig** | 01 C.2 Z.527 | E-DV-2: Empfehlung **ausblenden** (folgt dem Instrument) |
| Lernpfad `ermodell` | Von der Anforderung zum Datenmodell | **Entscheidung nötig** | 01 C.2 Z.527 | E-DV-2: Empfehlung **ausblenden** (folgt dem Instrument) |

**Prüfungsrahmen:**
- `pruefungsablauf`: **ja** · `pruefungsbereiche`: **ja** · `projekt`: ja (40 Std.).
- Präsentationsdauer: heute 15 Min.; **Soll 15 Min.** (01 C.1 Z.478) — kein Änderungsbedarf.
- **Unsicher** (nicht Phase 0): Der amtliche Prüfungskatalog für DV ist nicht frei verfügbar (01 C.1 Z.481); die Zuordnung DV1/DV2 zum Bereich „Betrieb und Erweiterung" ist offen (offene Frage 10).

### 3.4 Fachinformatiker/in Systemintegration (`fachinformatiker-systemintegration`)

Blatt: 01 Abschnitt D. Gruppe „Grundlagen" laut R1 sichtbar.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | ausblenden | 01 D.2 Z.700 | |
| `bsc` | Balanced Scorecard | ausblenden | 01 D.2 Z.701 | |
| `ansoff` | Ansoff-Matrix | ausblenden | 01 D.2 Z.702 | |
| `gantt` | Gantt-Diagramm | zeigen | 01 D.2 Z.703 | Kern (Migrationspläne) |
| `eisenhower` | Eisenhower-Matrix | **Entscheidung nötig** | 01 D.2 Z.704 | E-SI-1: Empfehlung **ausblenden** — kein Prüfungsbeleg |
| `pdca` | PDCA-Zyklus | Grundlagen | 01 D.2 Z.705 | |
| `risiko` | Risikomatrix | zeigen | 01 D.2 Z.706 | Kern (LF 11b) |
| `hierarchie` | Projektstrukturplan / Organigramm | Grundlagen | 01 D.2 Z.707 | |
| `osi` | OSI-Modell | zeigen | 01 D.2 Z.708 | Kern |
| `schutzziele` | Schutzziele der IT-Sicherheit | zeigen | 01 D.2 Z.709 | Kern |
| `sql` | SQL-Befehlsgruppen | **Entscheidung nötig** | 01 D.2 Z.710 | E-SI-2 (SQL-Block): Empfehlung **ausblenden** — SQL nur in Teil 2, §§ 20–22 nennen keine Datenbankabfragen; Alternative: Grundlagen (LF 5/8) |
| `scrum` | Scrum | Grundlagen | 01 D.2 Z.711 | |
| `uml` | UML-Diagramme | ausblenden | 01 D.2 Z.712 | kein SI-Prüfungsinhalt |
| `teststufen` | Teststufen im V-Modell | zeigen | 01 D.2 Z.713 | Kern |
| `ermodell` | ER-Modell | **Entscheidung nötig** | 01 D.2 Z.714 | E-SI-2: Empfehlung **ausblenden** |
| `normalisierung` | Normalformen | **Entscheidung nötig** | 01 D.2 Z.715 | E-SI-2: Empfehlung **ausblenden** |
| `ablauf` | Struktogramm und Programmablauf | **Entscheidung nötig** | 01 D.2 Z.716 | E-SI-3: Empfehlung **ausblenden** — Struktogramm gestrichen; Skripte brauchen Kontrollstrukturen, aber nicht als Struktogramm |
| `netzplan` | Netzplan | Grundlagen | 01 D.2 Z.718 | heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | zeigen | 01 D.2 Z.719 | Kern |
| `sqluebung` | SQL-Übungsfläche | **Entscheidung nötig** | 01 D.2 Z.720 | E-SI-2: Empfehlung **ausblenden** |
| `terminal` | Terminal-Szenarien | zeigen | 01 D.2 Z.721 | alle 12 Szenarien passen |
| `topologie` | Netzwerk-Topologie | zeigen | 01 D.2 Z.722 | Kern, alle 9 |
| `flags` | Flag-Rätsel | zeigen† | 01 D.2 Z.723 | Auswahl: Logs, offene Ports, SSH-Regelreihenfolge, DNS-Tunnel; Kodierungsrätsel als Grundlagen; Abschnitt 5 |
| `kreuzwortraetsel/standard` | Kreuzworträtsel: IT-Fachbegriffe | Grundlagen | 01 D.2 Z.725 | |
| `kreuzwortraetsel/netzwerk-sicherheit` | Kreuzworträtsel: Netzwerk und IT-Sicherheit | zeigen | 01 D.2 Z.725 | Kern |
| `kennzahlen_duell/standard` | Begriffe-Duell: IT-Grundlagen | Grundlagen | 01 D.2 Z.726 | |
| `kennzahlen_duell/sql` | Begriffe-Duell: SQL und Datenmodellierung | **Entscheidung nötig** | 01 D.2 Z.726 | E-SI-2: Empfehlung **ausblenden** |
| `memory/standard` | IT-Memory: Abkürzungen und Begriffe | Grundlagen | 01 D.2 Z.727 | |
| `memory/ports` | IT-Memory: Ports und Protokolle | zeigen | 01 D.2 Z.727 | Kern |
| `phishing` | Phishing-Detektiv | Grundlagen | 01 D.2 Z.728 | |
| `bughunt` | Bug-Hunt | **Entscheidung nötig** | 01 D.2 Z.729 | E-SI-4: Empfehlung **ausblenden bis Ersatzset** — Typ passt (Skripte, § 21), aber Java/JS-Ausschnitte nicht; Bash/PowerShell/Python fehlen |
| `codereihenfolge` | Code-Reihenfolge | **Entscheidung nötig** | 01 D.2 Z.730 | E-SI-4: wie Bug-Hunt |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen | 01 D.2 Z.731 | Kern (§ 22); Server-Fälle fehlen noch |
| `subnetting` (Spiel) | Subnetting-Sprint | zeigen | 01 D.2 Z.732 | Kern |
| `zahlensysteme` | Zahlensystem-Sprint | zeigen | 01 D.2 Z.733 | Kern |
| Lernpfad `scrum` | Scrum im Wartungs-App-Projekt | Grundlagen | 01 D.2 Z.736 | |
| Lernpfad `osi` | Netzwerkfehler Schicht für Schicht | zeigen | 01 D.2 Z.737 | Kern |
| Lernpfad `schutzziele` | Ein Sicherheitsvorfall bei der Brevanta | zeigen | 01 D.2 Z.738 | Kern |
| Lernpfad `normalisierung` | Von der Anforderung zum Datenmodell | **Entscheidung nötig** | 01 D.2 Z.739 | E-SI-2: Empfehlung **ausblenden** (folgt dem Instrument) |
| Lernpfad `ermodell` | Von der Anforderung zum Datenmodell | **Entscheidung nötig** | 01 D.2 Z.739 | E-SI-2: Empfehlung **ausblenden** (folgt dem Instrument) |

**Prüfungsrahmen:**
- `pruefungsablauf`: **ja** · `pruefungsbereiche`: **ja** · `projekt`: ja (40 Std.).
- Präsentationsdauer: heute 15 Min.; **Soll 15 Min.** (01 D.1 Z.690) — kein Änderungsbedarf.
- **Unsicher** (nicht Phase 0): amtlicher Prüfungskatalog nicht frei verfügbar (01 D.1 Z.693); Windows-/PowerShell-Variante für Verzeichnisdienste offen (offene Frage 11).

### 3.5 Industriefachwirt (`industriefachwirt`)

Blatt: 02 „Industriefachwirt". Keine Gruppe „Grundlagen" (nur FI). Alle 9 IT-Instrumente haben heute 0 Items.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 02 IND.2 Z.58 | 3 Items |
| `bsc` | Balanced Scorecard | zeigen | 02 IND.2 Z.59 | 3 Items |
| `ansoff` | Ansoff-Matrix | zeigen | 02 IND.2 Z.60 | 2 Items |
| `gantt` | Gantt-Diagramm | **Entscheidung nötig** | 02 IND.2 Z.64 | E-IND-1: Empfehlung **zeigen** — bei 6.1 Produktionsplanung sinnvoll; konstruierte Items (1.2, 2.2) später umwandeln (R2) |
| `eisenhower` | Eisenhower-Matrix | zeigen | 02 IND.2 Z.61 | 3 Items |
| `pdca` | PDCA-Zyklus | zeigen | 02 IND.2 Z.62 | 3 Items |
| `risiko` | Risikomatrix | zeigen | 02 IND.2 Z.63 | mit Vorbehalt: 2×2-Handlungsstrategie-Raster; Titel ggf. anpassen (kein Phase-0-Thema) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 02 IND.2 Z.65 | Titel „irreführend", Vorschlag „Gliederungsbaum" (Beschriftung, nicht Phase 0) |
| `osi` | OSI-Modell | ausblenden | 02 IND.2 Z.66 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 02 IND.2 Z.66 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 02 IND.2 Z.66 | IT |
| `scrum` | Scrum | ausblenden | 02 IND.2 Z.66 | IT |
| `uml` | UML-Diagramme | ausblenden | 02 IND.2 Z.66 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 02 IND.2 Z.66 | IT |
| `ermodell` | ER-Modell | ausblenden | 02 IND.2 Z.66 | IT |
| `normalisierung` | Normalformen | ausblenden | 02 IND.2 Z.66 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 02 IND.2 Z.66 | IT |
| `netzplan` | Netzplan | **Entscheidung nötig** | 02 IND.2 Z.67 | E-IND-2: Empfehlung **ausblenden** — im Content kein Netzplan-Thema (0 Treffer); erst freischalten, wenn Theorie ergänzt ist (W-FW-05); heute nicht freigeschaltet |
| `subnetting` | Subnetting-Rechner | ausblenden | 02 IND.2 Z.68 | IT |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 02 IND.2 Z.68 | IT |
| `terminal` | Terminal-Szenarien | ausblenden | 02 IND.2 Z.68 | IT |
| `topologie` | Netzwerk-Topologie | ausblenden | 02 IND.2 Z.68 | IT |
| `flags` | Flag-Rätsel | ausblenden | 02 IND.2 Z.68 | IT |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 02 IND.2 Z.69 | Typ passt, heute kein Set |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 02 IND.2 Z.69 | wie oben |
| `memory` | Memory | zeigen (ohne Content) | 02 IND.2 Z.69 | wie oben |
| `phishing` | Phishing-Detektiv | zeigen (ohne Content) | 02 IND.2 Z.69 | Blatt 02: „passt als Typ"; widerspricht Blatt 03 (Q-2 in Abschnitt 7) |
| `bughunt` | Bug-Hunt | ausblenden | 02 IND.2 Z.69 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 02 IND.2 Z.69 | Verallgemeinerung „Prozess-Reihenfolge" (S-FW-02) wäre neuer Typ |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen (ohne Content) | 02 IND.2 Z.69 | Blatt 02: „passt als Typ"; widerspricht Blatt 03 (Q-2) |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 02 IND.2 Z.69 | |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 02 IND.2 Z.69 | |

Lernpfade: heute keine (BSC-Lernpfad existiert nur für Büro; Freischaltung L-FW-01 ist Vorschlag, kein Bestandsurteil).

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-IND-01, 02 IND Z.138).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 10 Min.** (Präsentation ca. 10, Fachgespräch ca. 20; Gewichtung 1/3 : 2/3; 02 IND.1 Z.46) — entspricht dem Standard, Hinweis „ca." und IHK-abhängige Vorbereitungszeit **unsicher**.
- Soll-Bereiche (02 IND.1 Z.43–45): WBQ vier Bereiche 60/90/60/90 Min. (**unsicher**, IHK-Seiten teils 75), HQ Situationsaufgabe mit fünf Handlungsbereichen 480–510 Min.

### 3.6 Technischer Fachwirt (`technischer-fachwirt`)

Blatt: 02 „Geprüfter Technischer Fachwirt".

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 02 TEC.2 Z.166 | „teils konstruiert" (3.3 unsicher) |
| `bsc` | Balanced Scorecard | zeigen | 02 TEC.2 Z.167 | |
| `ansoff` | Ansoff-Matrix | zeigen | 02 TEC.2 Z.168 | |
| `gantt` | Gantt-Diagramm | **Entscheidung nötig** | 02 TEC.2 Z.172 | E-TEC-1: Empfehlung **zeigen** — bei 9.1/7.3 sinnvoll; die Verfahrensabläufe in 3.2/3.3 (Kündigungsschutzprozess) später in Ablauf-/Sortier-Items umwandeln (R2) |
| `eisenhower` | Eisenhower-Matrix | zeigen | 02 TEC.2 Z.169 | |
| `pdca` | PDCA-Zyklus | zeigen | 02 TEC.2 Z.170 | „fachlich stark" |
| `risiko` | Risikomatrix | zeigen | 02 TEC.2 Z.171 | mit Vorbehalt (2×2); in 10.3 Gefährdungsbeurteilung passend |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 02 TEC.2 Z.173 | 17 Items, Titel „irreführend" |
| `osi` | OSI-Modell | ausblenden | 02 TEC.2 Z.174 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 02 TEC.2 Z.174 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 02 TEC.2 Z.174 | IT |
| `scrum` | Scrum | ausblenden | 02 TEC.2 Z.174 | IT |
| `uml` | UML-Diagramme | ausblenden | 02 TEC.2 Z.174 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 02 TEC.2 Z.174 | IT |
| `ermodell` | ER-Modell | ausblenden | 02 TEC.2 Z.174 | IT |
| `normalisierung` | Normalformen | ausblenden | 02 TEC.2 Z.174 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 02 TEC.2 Z.174 | IT |
| `netzplan` | Netzplan | **Entscheidung nötig** | 02 TEC.2 Z.175 | E-TEC-2: Empfehlung **ausblenden** — Arbeitsvorbereitung 7.3 könnte passen, im Content aber kein Netzplan (0 Treffer) |
| `subnetting` | Subnetting-Rechner | ausblenden | 02 TEC.2 Z.176 | IT |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 02 TEC.2 Z.176 | IT |
| `terminal` | Terminal-Szenarien | ausblenden | 02 TEC.2 Z.176 | IT |
| `topologie` | Netzwerk-Topologie | ausblenden | 02 TEC.2 Z.176 | IT |
| `flags` | Flag-Rätsel | ausblenden | 02 TEC.2 Z.176 | IT |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | Verweis „siehe Industriefachwirt" |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |
| `memory` | Memory | zeigen (ohne Content) | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |
| `phishing` | Phishing-Detektiv | zeigen (ohne Content) | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | widerspricht Blatt 03 (Q-2) |
| `bughunt` | Bug-Hunt | ausblenden | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen (ohne Content) | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | geplant als „Störungs-Detektiv Produktion" (S-TEC-04, Phase 3); widerspricht Blatt 03 (Q-2) |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 02 TEC.2 Z.177 → 02 IND.2 Z.69 | |

Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-TEC-01, 02 TEC Z.263).
- Präsentationsdauer: heute Standard 10 Min.; **Soll unsicher** — die Verordnung nennt nur „Präsentation + Fachgespräch höchstens 30 Min."; die Aufteilung ist IHK-abhängig (genannt wurden 15 + 15; 02 TEC.1 Z.156, Z.263). → E-TEC-3.
- Soll-Bereiche (02 TEC.1 Z.153–155): WBQ 4 Bereiche 60/90/60/90; TQ 3 Bereiche 60/90/120; HQ eine Situationsaufgabe 240–300 Min. (Fachgebiete tq1–tq3, hq1–hq4); Gewichte 15/15/45/25. Rechtsgrundlage: Neuordnung zum „Bachelor Professional" nicht geprüft (**unsicher**).

### 3.7 Wirtschaftsfachwirt (`wirtschaftsfachwirt`)

Blatt: 02 „Geprüfter Wirtschaftsfachwirt".

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 02 WIR.2 Z.290 | 3 Items |
| `bsc` | Balanced Scorecard | zeigen | 02 WIR.2 Z.291 | 1 Item |
| `ansoff` | Ansoff-Matrix | zeigen | 02 WIR.2 Z.292 | 1 Item |
| `gantt` | Gantt-Diagramm | **Entscheidung nötig** | 02 WIR.2 Z.295 | E-WIR-1: Empfehlung **ausblenden** — nur 1 Item (reine Phasenzuordnung), sonst kein Projektthema im Kurs |
| `eisenhower` | Eisenhower-Matrix | zeigen | 02 WIR.2 Z.293 | 1 Item |
| `pdca` | PDCA-Zyklus | zeigen | 02 WIR.2 Z.294 | 1 Item |
| `risiko` | Risikomatrix | **Entscheidung nötig** | 02 WIR.2 Z.296 | E-WIR-2: Blatt sagt „Lücke" (0 Items), Handlungsbereich würde sie tragen; Empfehlung **zeigen** (Allowlist-Eintrag, Kachel erscheint, sobald Items da sind — siehe Q-1) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 02 WIR.2 Z.297 | 3 Items (u. a. Porters Wertschöpfungskette) |
| `osi` | OSI-Modell | ausblenden | 02 WIR.2 Z.298 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | **Entscheidung nötig** | 02 WIR.2 Z.298 | E-WIR-3: Blatt „nur bei Wunsch (unsicher)"; Empfehlung **ausblenden** — IT im Management (1.3) ist betriebswirtschaftlich, keine Items vorhanden |
| `sql` | SQL-Befehlsgruppen | ausblenden | 02 WIR.2 Z.298 | IT |
| `scrum` | Scrum | ausblenden | 02 WIR.2 Z.298 | IT |
| `uml` | UML-Diagramme | ausblenden | 02 WIR.2 Z.298 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 02 WIR.2 Z.298 | IT |
| `ermodell` | ER-Modell | ausblenden | 02 WIR.2 Z.298 | IT |
| `normalisierung` | Normalformen | ausblenden | 02 WIR.2 Z.298 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 02 WIR.2 Z.298 | IT |
| `netzplan` | Netzplan | **Entscheidung nötig** | 02 WIR.2 Z.299 | E-WIR-4: Empfehlung **ausblenden** — kein Projektplanungs-Schwerpunkt, „Projektmoderation" ist kein Netzplan |
| `subnetting` | Subnetting-Rechner | ausblenden | 02 WIR.2 Z.299 | IT |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 02 WIR.2 Z.299 | IT |
| `terminal` | Terminal-Szenarien | ausblenden | 02 WIR.2 Z.299 | IT |
| `topologie` | Netzwerk-Topologie | ausblenden | 02 WIR.2 Z.299 | IT |
| `flags` | Flag-Rätsel | ausblenden | 02 WIR.2 Z.299 | IT |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | Verweis „siehe Industriefachwirt" |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |
| `memory` | Memory | zeigen (ohne Content) | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |
| `phishing` | Phishing-Detektiv | zeigen (ohne Content) | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | widerspricht Blatt 03 (Q-2) |
| `bughunt` | Bug-Hunt | ausblenden | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen (ohne Content) | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | widerspricht Blatt 03 (Q-2) |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 02 WIR.2 Z.300 → 02 IND.2 Z.69 | |

Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-WIR-01, 02 WIR Z.366).
- Präsentationsdauer: heute Standard 10 Min.; **Soll unsicher / Urteil fehlt** — das Blatt nennt nur „Fachgespräch mit Präsentation höchstens 30 Min., Vorbereitung höchstens 30 Min., Präsentation 1/3, Fachgespräch 2/3" (02 WIR.1 Z.280), keinen Minutenwert für die Präsentation. → E-WIR-5.
- Soll-Bereiche (02 WIR.1 Z.277–279): WBQ 4 Bereiche 60 (teils 75)/90/60 (teils 75)/90 (**unsicher**), HSQ fünf Handlungsbereiche, Situationsaufgaben 480–510 Min.; mündlicher Schwerpunkt „Führung und Zusammenarbeit".

### 3.8 Transport-Management und Logistik (`transport-management-logistics`)

Blatt: 02 „Transport-/Logistik-Kurs". Keine WBQ-Prüfung. Das Blatt enthält **keine** Bewertung für Spiel-Typen im Einzelnen (nur die Sammelzeile „Typen als Typ passend, Content fehlt").

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 02 LOG.2 Z.392 | 1 Item |
| `bsc` | Balanced Scorecard | ausblenden | 02 LOG.2 Z.398 | 0 Items, kein Controlling-Handlungsbereich („passt nicht / Lücke") |
| `ansoff` | Ansoff-Matrix | zeigen | 02 LOG.2 Z.393 | 1 Item |
| `gantt` | Gantt-Diagramm | **Entscheidung nötig** | 02 LOG.2 Z.397 | E-LOG-1: Empfehlung **ausblenden** — nur 2 Items, „kein Projekt-Schwerpunkt", Ausbildungsplan nur „denkbar" |
| `eisenhower` | Eisenhower-Matrix | zeigen | 02 LOG.2 Z.396 | 1 Item |
| `pdca` | PDCA-Zyklus | zeigen | 02 LOG.2 Z.394 | QM/Umwelt ist Teil von Bereich 1 |
| `risiko` | Risikomatrix | zeigen | 02 LOG.2 Z.395 | mit Vorbehalt (2×2; für Lieferkettensicherheit wäre klassische Matrix besser) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 02 LOG.2 Z.399 | Kalkulationsschema ist prüfungsrelevant |
| `osi` | OSI-Modell | ausblenden | 02 LOG.2 Z.400 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 02 LOG.2 Z.400 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 02 LOG.2 Z.400 | IT |
| `scrum` | Scrum | ausblenden | 02 LOG.2 Z.400 | IT |
| `uml` | UML-Diagramme | ausblenden | 02 LOG.2 Z.400 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 02 LOG.2 Z.400 | IT |
| `ermodell` | ER-Modell | ausblenden | 02 LOG.2 Z.400 | IT |
| `normalisierung` | Normalformen | ausblenden | 02 LOG.2 Z.400 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 02 LOG.2 Z.400 | IT |
| `netzplan` | Netzplan | ausblenden | 02 LOG.2 Z.401 | kein Projektmanagement-Schwerpunkt |
| `subnetting` | Subnetting-Rechner | ausblenden | 02 LOG.2 Z.400 | IT-Werkzeug |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 02 LOG.2 Z.400 | IT-Werkzeug |
| `terminal` | Terminal-Szenarien | ausblenden | 02 LOG.2 Z.400 | IT-Werkzeug |
| `topologie` | Netzwerk-Topologie | ausblenden | 02 LOG.2 Z.400 | IT-Werkzeug |
| `flags` | Flag-Rätsel | ausblenden | 02 LOG.2 Z.400 | IT-Werkzeug |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 02 LOG.2 Z.402 | Sammelzeile „Typen als Typ passend"; S-LOG-01 geplant |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 02 LOG.2 Z.402 | S-LOG-02 geplant |
| `memory` | Memory | zeigen (ohne Content) | 02 LOG.2 Z.402 | S-LOG-03 geplant |
| `phishing` | Phishing-Detektiv | zeigen (ohne Content) | 02 LOG.2 Z.402 | Sammelzeile; „Betrugs-Detektiv" S-LOG-04 geplant; widerspricht Blatt 03 (Q-2) |
| `bughunt` | Bug-Hunt | ausblenden | *Urteil fehlt* | Sammelzeile unscharf; Empfehlung: ausblenden (Programmcode, kein Bezug) |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Prozess-Reihenfolge" (S-FW-02) wäre neuer Typ |
| `troubleshooting` | Troubleshooting-Detektiv | zeigen (ohne Content) | 02 LOG.2 Z.402 | Sammelzeile; „Störungs-Detektiv Lieferkette" S-LOG-05 geplant; widerspricht Blatt 03 (Q-2) |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden (IT) |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden (IT) |

Lernpfade: heute keine; BSC-Lernpfad „nicht sinnvoll ohne Content" (02 LOG.2 Z.398).

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-LOG-01, 02 LOG Z.488).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 10 Min.** (Präsentation höchstens 10, Fachgespräch höchstens 20; Gewichtung 1/3 : 2/3; 02 LOG.1 Z.382, Z.386 „passt zur Verordnung") — kein Änderungsbedarf.
- Soll-Bereiche (02 LOG.1 Z.380–381): drei Bereiche hb1–hb3, zwei Aufgabenstellungen je 300 Min. Das Datum der Verordnung (21.09.2023) wurde nicht erneut verifiziert (**unsicher**).

### 3.9 Handelsfachwirt (`handelsfachwirt`)

Blatt: 03 Abschnitt A.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 03 A.2 Z.60 | 3 Items (Q-5.3-12 einzeln unsicher) |
| `bsc` | Balanced Scorecard | zeigen | 03 A.2 Z.61 | 1 Item |
| `ansoff` | Ansoff-Matrix | zeigen (ohne Content) | 03 A.2 Z.62 | 0 Items, Content-Nachtrag S |
| `gantt` | Gantt-Diagramm | zeigen | 03 A.2 Z.63 | passt bedingt: „Gantt" für Phasen-Items irreführend (offene Frage F7, Beschriftung) |
| `eisenhower` | Eisenhower-Matrix | zeigen | 03 A.2 Z.64 | |
| `pdca` | PDCA-Zyklus | zeigen | 03 A.2 Z.65 | |
| `risiko` | Risikomatrix | zeigen | 03 A.2 Z.66 | passt bedingt: Zonen/Item-Text angleichen (F6) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 03 A.2 Z.67 | |
| `osi` | OSI-Modell | ausblenden | 03 A.2 Z.69 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 03 A.2 Z.69 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 03 A.2 Z.69 | IT |
| `scrum` | Scrum | ausblenden | 03 A.2 Z.69 | IT |
| `uml` | UML-Diagramme | ausblenden | 03 A.2 Z.69 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 03 A.2 Z.69 | IT |
| `ermodell` | ER-Modell | ausblenden | 03 A.2 Z.69 | IT |
| `normalisierung` | Normalformen | ausblenden | 03 A.2 Z.69 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 03 A.2 Z.69 | IT (neutraler Ersatz I-KF-02 ist neuer Typ) |
| `netzplan` | Netzplan | ausblenden | 03 A.2 Z.68 | kein Projektmanagement-Thema in HB1–WB4 |
| `subnetting` | Subnetting-Rechner | ausblenden | 03 A.2 Z.70 | IT |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 03 A.2 Z.70 | IT |
| `terminal` | Terminal-Szenarien | ausblenden | 03 A.2 Z.70 | IT |
| `topologie` | Netzwerk-Topologie | ausblenden | 03 A.2 Z.70 | IT |
| `flags` | Flag-Rätsel | ausblenden | 03 A.2 Z.70 | IT |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 03 A.2 Z.71 | „passt (Mechanik)", kein Set |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 03 A.2 Z.71 | |
| `memory` | Memory | zeigen (ohne Content) | 03 A.2 Z.71 | |
| `phishing` | Phishing-Detektiv | **Entscheidung nötig** | 03 A.2 Z.72 | E-HAN-1: Empfehlung **ausblenden** — heutiger Inhalt ist IT-Alltag; erst mit Handels-Content über den Beleg-Detektiv (S-KF-02) |
| `bughunt` | Bug-Hunt | ausblenden | 03 A.2 Z.73 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 03 A.2 Z.73 | |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | 03 A.2 Z.73 | |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 03 A.2 Z.73 | Sprint-Mechanik später wiederverwendbar (S-KF-01) |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 03 A.2 Z.73 | |

Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-HAN-01, 03 A Z.218).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 15 Min.** (HdlFachwPrV: Präsentation ca. 15, Fachgespräch höchstens 20; 03 A.1 Z.43) — Blatt bezeichnet den heutigen Wert als „falsch" (03 A Z.218). Sicherheit mittel (Verordnungsangabe, „ca.").
- Soll-Bereiche: Teil 1 (HB1+HB2) 240 Min.; Teil 2 (HB3+HB4+ein Wahlbereich) 300 Min. (laut IHK NW 180 + 120; **unsicher**, 03 A.1 Z.41–42). **Unsicher:** ob die mündliche Prüfung unabhängig vom schriftlichen Ergebnis ist (03 A.1 Z.48, offene Frage F12); Minutenaufteilung innerhalb Teil 1 (Z.49).

### 3.10 Immobilienfachwirt (`immobilienfachwirt`)

Blatt: 03 Abschnitt B. Heute `werkzeuge: ["netzplan"]`.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 03 B.2 Z.250 | |
| `bsc` | Balanced Scorecard | zeigen | 03 B.2 Z.251 | |
| `ansoff` | Ansoff-Matrix | zeigen | 03 B.2 Z.252 | |
| `gantt` | Gantt-Diagramm | zeigen | 03 B.2 Z.253 | passt bedingt: zwei Items reine Phasenzuordnung (Beschriftung, F7) |
| `eisenhower` | Eisenhower-Matrix | zeigen | 03 B.2 Z.254 | passt bedingt: zwei Items Alltagsbeispiele, „unschädlich" |
| `pdca` | PDCA-Zyklus | zeigen | 03 B.2 Z.255 | |
| `risiko` | Risikomatrix | zeigen | 03 B.2 Z.256 | Zonen-/Item-Unschärfe wie bei Handel (F6) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 03 B.2 Z.257 | |
| `osi` | OSI-Modell | ausblenden | 03 B.2 Z.259 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 03 B.2 Z.259 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 03 B.2 Z.259 | IT |
| `scrum` | Scrum | ausblenden | 03 B.2 Z.259 | IT |
| `uml` | UML-Diagramme | ausblenden | 03 B.2 Z.259 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 03 B.2 Z.259 | IT |
| `ermodell` | ER-Modell | ausblenden | 03 B.2 Z.259 | IT |
| `normalisierung` | Normalformen | ausblenden | 03 B.2 Z.259 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 03 B.2 Z.259 | IT |
| `netzplan` | Netzplan | zeigen | 03 B.2 Z.258 | Bauprojekt-Terminplanung (HB5 5.4); heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | ausblenden | 03 B.2 Z.259 | IT-Werkzeug |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 03 B.2 Z.259 | IT-Werkzeug |
| `terminal` | Terminal-Szenarien | ausblenden | 03 B.2 Z.259 | IT-Werkzeug |
| `topologie` | Netzwerk-Topologie | ausblenden | 03 B.2 Z.259 | IT-Werkzeug |
| `flags` | Flag-Rätsel | ausblenden | 03 B.2 Z.259 | IT-Werkzeug |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 03 B.2 Z.260 | „passt (Mechanik)", kein Set |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 03 B.2 Z.260 | |
| `memory` | Memory | zeigen (ohne Content) | 03 B.2 Z.260 | |
| `phishing` | Phishing-Detektiv | **Entscheidung nötig** | 03 B.2 Z.261 | E-IMM-1: Empfehlung **ausblenden** — nur mit Immobilien-Content sinnvoll (Abrechnungs-/Exposé-Detektiv, S-KF-02) |
| `bughunt` | Bug-Hunt | ausblenden | 03 B.2 Z.262 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 03 B.2 Z.262 | |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | 03 B.2 Z.262 | |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 03 B.2 Z.262 | Sprint-Mechanik später wiederverwendbar (S-KF-01) |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 03 B.2 Z.262 | |

Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-IMM-01, 03 B Z.404).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 10 Min.** (höchstens 10, Fachgespräch höchstens 20, doppelt gewichtet; 03 B.1 Z.236) — entspricht dem Standard, Blatt will den Wert dennoch ausdrücklich setzen.
- Soll-Bereiche (03 B.1 Z.235): sechs Bereiche HB1–HB6 mit 60/90/120/120/120/120 Min. (gesamt 600–660), abbildbar auf die Fachgebiete HB1–HB6. **Unsicher:** Neuordnung zum „Bachelor Professional" (03 B.1 Z.231); Tagesaufteilung je IHK verschieden (nicht festschreiben).

### 3.11 Versicherungen und Finanzanlagen (`versicherungen-finanzanlagen`)

Blatt: 03 Abschnitt C. Heute `werkzeuge: ["netzplan"]`.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen (ohne Content) | 03 C.2 Z.436 | 0 Items, „nicht vorrangig" |
| `bsc` | Balanced Scorecard | zeigen | 03 C.2 Z.437 | 1 Item |
| `ansoff` | Ansoff-Matrix | zeigen (ohne Content) | 03 C.2 Z.436 | 0 Items |
| `gantt` | Gantt-Diagramm | zeigen | 03 C.2 Z.438 | passt bedingt: Beschriftung (F7) |
| `eisenhower` | Eisenhower-Matrix | zeigen | 03 C.2 Z.439 | |
| `pdca` | PDCA-Zyklus | zeigen | 03 C.2 Z.440 | |
| `risiko` | Risikomatrix | zeigen | 03 C.2 Z.441 | fachlich zentral; Zonen-/Item-Text angleichen (F6); Q-3.4-03 (Betrugsprüfung) sachlich heikel |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 03 C.2 Z.442 | |
| `osi` | OSI-Modell | ausblenden | 03 C.2 Z.445 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | **Entscheidung nötig** | 03 C.2 Z.444 | E-VER-1: Empfehlung **ausblenden** — nur sinnvoll, wenn Cyber-/Datenschutz-Content mit Zuordnungsfragen entsteht (heute keine) |
| `sql` | SQL-Befehlsgruppen | ausblenden | 03 C.2 Z.445 | IT |
| `scrum` | Scrum | ausblenden | 03 C.2 Z.445 | IT |
| `uml` | UML-Diagramme | ausblenden | 03 C.2 Z.445 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 03 C.2 Z.445 | IT |
| `ermodell` | ER-Modell | ausblenden | 03 C.2 Z.445 | IT |
| `normalisierung` | Normalformen | ausblenden | 03 C.2 Z.445 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 03 C.2 Z.445 | IT |
| `netzplan` | Netzplan | zeigen | 03 C.2 Z.443 | Projektmanagement Prüfungsgegenstand (§ 9); heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | ausblenden | 03 C.2 Z.445 | IT-Werkzeug |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 03 C.2 Z.445 | IT-Werkzeug |
| `terminal` | Terminal-Szenarien | ausblenden | 03 C.2 Z.445 | IT-Werkzeug |
| `topologie` | Netzwerk-Topologie | ausblenden | 03 C.2 Z.445 | IT-Werkzeug |
| `flags` | Flag-Rätsel | ausblenden | 03 C.2 Z.445 | IT-Werkzeug |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | 03 C.2 Z.446 | „passt (Mechanik)", kein Set |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | 03 C.2 Z.446 | |
| `memory` | Memory | zeigen (ohne Content) | 03 C.2 Z.446 | |
| `phishing` | Phishing-Detektiv | **Entscheidung nötig** | 03 C.2 Z.447 | E-VER-2: Empfehlung **ausblenden** — nur falls Datenschutz/Cyber behandelt wird (Content „Phishing" nur in 1 Datei) |
| `bughunt` | Bug-Hunt | ausblenden | 03 C.2 Z.448 | |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | 03 C.2 Z.448 | |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | 03 C.2 Z.448 | |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | 03 C.2 Z.448 | Sprint-Mechanik später wiederverwendbar (S-KF-01) |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | 03 C.2 Z.448 | |

Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** · Projekt-Reiter / Praxistransferarbeit-Hilfe fehlt (P-VER-02, Aufwand M, nicht Phase 0) (Konfiguration S, P-VER-01, 03 C Z.588).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 20 Min.** (Präsentation höchstens 20, Fachgespräch höchstens 30; 03 C.1 Z.423) — Blatt bezeichnet den heutigen Wert als „falsch" (03 C Z.588).
- Soll-Bereiche: Teil 1 270 Min. (Wahlbereich KB1 oder KB2), Teil 2 300 Min. (KP1+KP2), praxisbezogene Prüfung (Praxistransferarbeit 25 %, Präsentation 25 %, Fachgespräch 50 %). **Unsicher:** Datum der BAProVFFPrV (26.11.2024 oder 03.12.2024, 03 C.1 Z.417; Frage F2).

### 3.12 Fachwirt Büro- und Projektorganisation (`fachwirt-buero-projektorganisation`)

Blatt: 04 Kurs A. Heute `werkzeuge: ["netzplan"]`, drei Spiel-Sets (Büro-Content), Lernpfad BSC.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 04 A.2 Z.58 | |
| `bsc` | Balanced Scorecard | zeigen | 04 A.2 Z.60 | mit Lernpfad „Nordstern GmbH" |
| `ansoff` | Ansoff-Matrix | **Entscheidung nötig** | 04 A.2 Z.59 | E-BUE-1: Empfehlung **zeigen** — Fragen existieren (`hb2/2.2`), Blatt: „bleibt bis zur Entscheidung unverändert"; im Büro-Rahmenplan nicht belegt |
| `gantt` | Gantt-Diagramm | zeigen | 04 A.2 Z.53 | |
| `eisenhower` | Eisenhower-Matrix | zeigen | 04 A.2 Z.54 | |
| `pdca` | PDCA-Zyklus | zeigen | 04 A.2 Z.55 | |
| `risiko` | Risikomatrix | zeigen | 04 A.2 Z.56 | mit Vorbehalt (2×2 statt 3×3) |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 04 A.2 Z.57 | |
| `osi` | OSI-Modell | ausblenden | 04 A.2 Z.65 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 04 A.2 Z.65 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 04 A.2 Z.65 | IT |
| `scrum` | Scrum | ausblenden | 04 A.2 Z.65 | IT |
| `uml` | UML-Diagramme | ausblenden | 04 A.2 Z.65 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 04 A.2 Z.65 | IT |
| `ermodell` | ER-Modell | ausblenden | 04 A.2 Z.65 | IT |
| `normalisierung` | Normalformen | ausblenden | 04 A.2 Z.65 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 04 A.2 Z.65 | IT |
| `netzplan` | Netzplan | zeigen | 04 A.2 Z.61 | heute freigeschaltet |
| `subnetting` | Subnetting-Rechner | ausblenden | 04 A.2 Z.65 | ausdrücklich genannt |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 04 A.2 Z.65 | über „SQL usw." |
| `terminal` | Terminal-Szenarien | ausblenden | 04 A.2 Z.65 | nur über „usw." gedeckt |
| `topologie` | Netzwerk-Topologie | ausblenden | 04 A.2 Z.65 | nur über „usw." gedeckt |
| `flags` | Flag-Rätsel | ausblenden | 04 A.2 Z.65 | nur über „usw." gedeckt |
| `kreuzwortraetsel/standard` | Kreuzworträtsel: Finanzkennzahlen | **Entscheidung nötig** | 04 A.2 Z.62 | E-BUE-2: Empfehlung **zeigen** (Set bleibt unverändert bis Blatt-Frage 1 entschieden ist) — Begriffe (EBITDA, Cashflow …) fehlen in der Kurstheorie |
| `kennzahlen_duell/standard` | Kennzahlen-Duell: QM und Prozesse | **Entscheidung nötig** | 04 A.2 Z.63 | E-BUE-2: Empfehlung **zeigen** (wie oben) — teilweise passend, fertigungsnahe Begriffe |
| `memory/standard` | Kennzahlen-Memory: Personal | zeigen | 04 A.2 Z.64 | |
| `phishing` | Phishing-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden (IT-Alltag, kein Set); neuer „Dokument-Detektiv" S-BUE-05 wäre neuer Typ |
| `bughunt` | Bug-Hunt | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Reihenfolge-Spiel" S-BUE-03 wäre neuer Typ |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden („Subnetting" in 04 A.2 Z.65 meint wohl das Werkzeug); „Kennzahlen-Sprint" S-BUE-04 wäre neuer Typ |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| Lernpfad `bsc` | Balanced Scorecard bei der Nordstern GmbH | zeigen | 04 A.2 Z.60 | „Blaupause" |

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** (Hilfeseite zeigt „Prüfungsablauf hier noch nicht beschrieben", 04 Z.29) · `pruefungsbereiche`: **nein** (Konfiguration S, P-BUE-01, 04 A Z.217).
- Präsentationsdauer: heute Standard 10 Min.; **Soll 10 Min.** (Präsentation höchstens 10, ein Drittel; 04 A.1 Z.43) — entspricht dem Standard.
- Soll-Bereiche: schriftlich 600 Min. gesamt (zweimal 300), **keine** Minutenangabe je Handlungsbereich; Blatt schlägt „Lernstand je Handlungsbereich ohne Minuten" vor (P-BUE-03). **Unsicher:** Fachgespräch „ca. 40 Minuten" (04 A.1 Z.43, Z.47; offene Frage 10).

### 3.13 Fachwirt Gesundheits- und Sozialwesen (`fachwirt-gesundheit-soziales`)

Blatt: 04 Kurs B. Heute ohne Werkzeuge, ohne Spiele, ohne Lernpfad.

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | zeigen | 04 B.2 Z.254 | 3 Fragen |
| `bsc` | Balanced Scorecard | zeigen (ohne Content) | 04 B.2 Z.259 | Items fehlen; I-GES-05 geplant |
| `ansoff` | Ansoff-Matrix | zeigen | 04 B.2 Z.258 | „Branchenbezug prüfen" |
| `gantt` | Gantt-Diagramm | zeigen | 04 B.2 Z.257 | 1 Frage |
| `eisenhower` | Eisenhower-Matrix | zeigen | 04 B.2 Z.256 | 1 Frage |
| `pdca` | PDCA-Zyklus | zeigen (ohne Content) | 04 B.2 Z.259 | I-GES-03 geplant |
| `risiko` | Risikomatrix | zeigen (ohne Content) | 04 B.2 Z.259 | I-GES-04 geplant |
| `hierarchie` | Projektstrukturplan / Organigramm | zeigen | 04 B.2 Z.255 | 2 Fragen |
| `osi` | OSI-Modell | ausblenden | 04 B.2 Z.261 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 04 B.2 Z.261 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 04 B.2 Z.261 | IT |
| `scrum` | Scrum | ausblenden | 04 B.2 Z.261 | IT |
| `uml` | UML-Diagramme | ausblenden | 04 B.2 Z.261 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 04 B.2 Z.261 | IT |
| `ermodell` | ER-Modell | ausblenden | 04 B.2 Z.261 | IT |
| `normalisierung` | Normalformen | ausblenden | 04 B.2 Z.261 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 04 B.2 Z.261 | IT |
| `netzplan` | Netzplan | **Entscheidung nötig** | 04 B.2 Z.260 | E-GES-1: Empfehlung **ausblenden** (Blatt: „unsicher / nicht empfohlen", „so lassen") — Gesundheits-Content kennt keinen Netzplan |
| `subnetting` | Subnetting-Rechner | ausblenden | 04 B.2 Z.261 | ausdrücklich genannt |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 04 B.2 Z.261 | über „SQL usw." |
| `terminal` | Terminal-Szenarien | ausblenden | 04 B.2 Z.261 | nur über „usw." gedeckt |
| `topologie` | Netzwerk-Topologie | ausblenden | 04 B.2 Z.261 | nur über „usw." gedeckt |
| `flags` | Flag-Rätsel | ausblenden | 04 B.2 Z.261 | nur über „usw." gedeckt |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | *Urteil fehlt* | Bestandsurteil fehlt („nicht vorhanden"); Empfehlung zeigen, da S-GES-02 den Typ vorschlägt |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | *Urteil fehlt* | Empfehlung zeigen (S-GES-01) |
| `memory` | Memory | zeigen (ohne Content) | *Urteil fehlt* | Empfehlung zeigen (S-GES-03) |
| `phishing` | Phishing-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Dienstplan-Detektiv" S-GES-05 wäre neuer Typ |
| `bughunt` | Bug-Hunt | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Kennzahlen-Sprint" S-GES-04 wäre neuer Typ |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |

Lernpfade: heute keine; BSC-Lernpfad „Morgenlicht" (Referenzdokument vorhanden, L-GES-01) ist Vorschlag, nicht importiert.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-GES-01, 04 B Z.391).
- Präsentationsdauer: heute Standard 10 Min.; **Soll ca. 10 Min.** (Präsentation ca. 10, Fachgespräch höchstens 20; 04 B.1 Z.244) — entspricht dem Standard; „ca." ⇒ Sicherheit mittel.
- Soll-Bereiche: sechs Handlungsbereiche, schriftlich 600–630 Min. gesamt (IHK-Praxis 2 × 300), keine Minuten je Bereich. **Unsicher:** Fachgespräch-Dauer (eine IHK-Seite nennt 20 Min. als „andere Quelle"), mögliche Neuordnung zum „Bachelor Professional" (04 B.1 Z.248).

### 3.14 Ausbildung der Ausbilder — AEVO (`ausbildung-der-ausbilder`)

Blatt: 04 Kurs C. Heute nichts außer Quiz, Fallaufgaben, Fachgespräch und Präsentationstrainer (15 Min.).

| Schlüssel | Eintrag | Phase 0 | Beleg | Hinweis / Empfehlung |
|---|---|---|---|---|
| `swot` | SWOT-Matrix | ausblenden | 04 C.2 Z.429 | pädagogisch-rechtlich, kein Strategiestoff |
| `bsc` | Balanced Scorecard | ausblenden | 04 C.2 Z.429 | |
| `ansoff` | Ansoff-Matrix | ausblenden | 04 C.2 Z.429 | |
| `gantt` | Gantt-Diagramm | ausblenden | 04 C.2 Z.429 | Z.432 nennt „Gantt-Format als Ausbildungsverlauf" (I-AEV-08) „unsicher": wäre neuer Inhalt — dann Allowlist neu entscheiden |
| `eisenhower` | Eisenhower-Matrix | ausblenden | 04 C.2 Z.429 | |
| `pdca` | PDCA-Zyklus | ausblenden | 04 C.2 Z.429 | |
| `risiko` | Risikomatrix | ausblenden | 04 C.2 Z.429 | |
| `hierarchie` | Projektstrukturplan / Organigramm | ausblenden | 04 C.2 Z.429 | Ausnahme laut Blatt: Format für „Lernzielhierarchie" (I-AEV-04), aber mit neuem Inhalt — dann Allowlist neu entscheiden |
| `osi` | OSI-Modell | ausblenden | 04 C.2 Z.431 | IT |
| `schutzziele` | Schutzziele der IT-Sicherheit | ausblenden | 04 C.2 Z.431 | IT |
| `sql` | SQL-Befehlsgruppen | ausblenden | 04 C.2 Z.431 | IT |
| `scrum` | Scrum | ausblenden | 04 C.2 Z.431 | IT |
| `uml` | UML-Diagramme | ausblenden | 04 C.2 Z.431 | IT |
| `teststufen` | Teststufen im V-Modell | ausblenden | 04 C.2 Z.431 | IT |
| `ermodell` | ER-Modell | ausblenden | 04 C.2 Z.431 | IT |
| `normalisierung` | Normalformen | ausblenden | 04 C.2 Z.431 | IT |
| `ablauf` | Struktogramm und Programmablauf | ausblenden | 04 C.2 Z.431 | IT |
| `netzplan` | Netzplan | ausblenden | 04 C.2 Z.430 | |
| `subnetting` | Subnetting-Rechner | ausblenden | 04 C.2 Z.430 | |
| `sqluebung` | SQL-Übungsfläche | ausblenden | 04 C.2 Z.430 | |
| `terminal` | Terminal-Szenarien | ausblenden | 04 C.2 Z.430 | |
| `topologie` | Netzwerk-Topologie | ausblenden | 04 C.2 Z.430 | |
| `flags` | Flag-Rätsel | ausblenden | 04 C.2 Z.430 | |
| `kreuzwortraetsel` | Kreuzworträtsel | zeigen (ohne Content) | *Urteil fehlt* | Bestandsurteil fehlt; Empfehlung zeigen, da S-AEV-04 den Typ vorschlägt |
| `kennzahlen_duell` | Duell | zeigen (ohne Content) | *Urteil fehlt* | Empfehlung zeigen (S-AEV-02) |
| `memory` | Memory | zeigen (ohne Content) | *Urteil fehlt* | Empfehlung zeigen (S-AEV-04) |
| `phishing` | Phishing-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Beurteilungsfehler-Detektiv" S-AEV-03 wäre neuer Typ |
| `bughunt` | Bug-Hunt | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `codereihenfolge` | Code-Reihenfolge | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Reihenfolge-Spiel" S-AEV-01 wäre neuer Typ |
| `troubleshooting` | Troubleshooting-Detektiv | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |
| `subnetting` (Spiel) | Subnetting-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden; „Jugendschutz-Sprint" S-AEV-05 wäre neuer Typ |
| `zahlensysteme` | Zahlensystem-Sprint | ausblenden | *Urteil fehlt* | Empfehlung: ausblenden |

Folge laut Blatt (04 C.2 Z.435): Der Instrumente-Tab zeigt in Phase 0 **nichts**; sichtbar wird erst, was Phase 1 neu anlegt (I-AEV-01 ff.). Lernpfade: heute keine.

**Prüfungsrahmen:**
- `pruefungsablauf`: **nein** · `pruefungsbereiche`: **nein** (Konfiguration S, P-AEV-01, 04 C Z.573). `presentationMinutes`: **ja** (15 gesetzt).
- Präsentationsdauer: heute 15 Min.; **Soll 15 Min.** (Präsentation höchstens 15, mit Fachgespräch höchstens 30; 04 C.1 Z.417) — kein Änderungsbedarf.
- Soll-Bereiche: vier Handlungsfelder, schriftlich ca. 3 Stunden insgesamt (keine Minuten je Bereich). **Unsicher:** Details der schriftlichen Prüfung und Vorbereitungszeit vor der Praxisprüfung (04 C.1 Z.421); Praxis-Variante „Präsentation oder Durchführung" (offene Frage 7).

---

## 4. Kompaktübersicht: Kurs × Katalogeintrag

Zeilen = Katalogeinträge, Spalten = Kurse. **Z** = zeigen · **G** = Grundlagen (nur FI) · **–** = ausblenden · **?** = Entscheidung nötig, dahinter meine Empfehlung (**?–** = Empfehlung ausblenden, **?Z** = Empfehlung zeigen) · **\*** = Urteil fehlt (Zelle ist meine Empfehlung) · **†** = nur Szenario-Auswahl (Abschnitt 5) · **‡** = Blatt 02 und Blatt 03 widersprechen sich (Q-2) · **·** = im Kurs heute nicht vorhanden (kein Set, kein Lernpfad). Z/G/– gibt die **Allowlist-Absicht** wieder; ob eine Kachel sichtbar wird, hängt zusätzlich vom Content ab (Q-1).

Kurzzeichen der Kurse: **AE** Anwendungsentwicklung · **DPA** Daten- und Prozessanalyse · **DV** Digitale Vernetzung · **SI** Systemintegration · **IND** Industriefachwirt · **TEC** Technischer Fachwirt · **WIR** Wirtschaftsfachwirt · **LOG** Transport/Logistik · **HAN** Handelsfachwirt · **IMM** Immobilienfachwirt · **VER** Versicherungen/Finanzanlagen · **BÜR** Büro/Projektorganisation · **GES** Gesundheit/Soziales · **AEV** AEVO.

| Eintrag | AE | DPA | DV | SI | IND | TEC | WIR | LOG | HAN | IMM | VER | BÜR | GES | AEV |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Instrumente** | | | | | | | | | | | | | | |
| `swot` | – | – | – | – | Z | Z | Z | Z | Z | Z | Z | Z | Z | – |
| `bsc` | – | – | – | – | Z | Z | Z | – | Z | Z | Z | Z | Z | – |
| `ansoff` | – | – | – | – | Z | Z | Z | Z | Z | Z | Z | ?Z | Z | – |
| `gantt` | Z | Z | Z | Z | ?Z | ?Z | ?– | ?– | Z | Z | Z | Z | Z | – |
| `eisenhower` | ?– | ?– | ?– | ?– | Z | Z | Z | Z | Z | Z | Z | Z | Z | – |
| `pdca` | G | Z | G | G | Z | Z | Z | Z | Z | Z | Z | Z | Z | – |
| `risiko` | G | G | Z | Z | Z | Z | ?Z | Z | Z | Z | Z | Z | Z | – |
| `hierarchie` | Z | G | G | G | Z | Z | Z | Z | Z | Z | Z | Z | Z | – |
| `osi` | G | G | Z | Z | – | – | – | – | – | – | – | – | – | – |
| `schutzziele` | Z | Z | Z | Z | – | – | ?– | – | – | – | ?– | – | – | – |
| `sql` | Z | Z | ?– | ?– | – | – | – | – | – | – | – | – | – | – |
| `scrum` | Z | G | G | G | – | – | – | – | – | – | – | – | – | – |
| `uml` | Z | ?– | ?– | – | – | – | – | – | – | – | – | – | – | – |
| `teststufen` | Z | ?– | Z | Z | – | – | – | – | – | – | – | – | – | – |
| `ermodell` | Z | Z | ?– | ?– | – | – | – | – | – | – | – | – | – | – |
| `normalisierung` | Z | Z | ?– | ?– | – | – | – | – | – | – | – | – | – | – |
| `ablauf` | ?Z | – | ?– | ?– | – | – | – | – | – | – | – | – | – | – |
| **Werkzeuge** | | | | | | | | | | | | | | |
| `netzplan` | G | G | G | G | ?– | ?– | ?– | – | – | Z | Z | Z | ?– | – |
| `subnetting` | G | G | Z | Z | – | – | – | – | – | – | – | – | – | – |
| `sqluebung` | Z | Z | ?– | ?– | – | – | – | – | – | – | – | – | – | – |
| `terminal` | G† | G† | Z† | Z | – | – | – | – | – | – | – | – | – | – |
| `topologie` | G† | G† | Z | Z | – | – | – | – | – | – | – | – | – | – |
| `flags` | G† | G† | Z† | Z† | – | – | – | – | – | – | – | – | – | – |
| **Spiele (Typ/Set)** | | | | | | | | | | | | | | |
| `kreuzwortraetsel/standard` | G | G | G | G | Z | Z | Z | Z | Z | Z | Z | ?Z | Z\* | Z\* |
| `kreuzwortraetsel/netzwerk-sicherheit` | G | G | Z | Z | · | · | · | · | · | · | · | · | · | · |
| `kennzahlen_duell/standard` | G | G | G | G | Z | Z | Z | Z | Z | Z | Z | ?Z | Z\* | Z\* |
| `kennzahlen_duell/sql` | Z | Z | ?– | ?– | · | · | · | · | · | · | · | · | · | · |
| `memory/standard` | G | G | G | G | Z | Z | Z | Z | Z | Z | Z | Z | Z\* | Z\* |
| `memory/ports` | G | G | Z | Z | · | · | · | · | · | · | · | · | · | · |
| `phishing` | G | G | G | G | Z‡ | Z‡ | Z‡ | Z‡ | ?– | ?– | ?– | –\* | –\* | –\* |
| `bughunt` | Z | ?– | ?– | ?– | – | – | – | –\* | – | – | – | –\* | –\* | –\* |
| `codereihenfolge` | Z | ?– | ?– | ?– | – | – | – | –\* | – | – | – | –\* | –\* | –\* |
| `troubleshooting` | – | – | Z | Z | Z‡ | Z‡ | Z‡ | Z‡ | – | – | – | –\* | –\* | –\* |
| `subnetting` (Spiel) | G | G | Z | Z | – | – | – | –\* | – | – | – | –\* | –\* | –\* |
| `zahlensysteme` | G | G | Z | Z | – | – | – | –\* | – | – | – | –\* | –\* | –\* |
| **Lernpfade (Typ)** | | | | | | | | | | | | | | |
| `bsc` | · | · | · | · | · | · | · | · | · | · | · | Z | · | · |
| `scrum` | Z | G | G | G | · | · | · | · | · | · | · | · | · | · |
| `osi` | G | G | Z | Z | · | · | · | · | · | · | · | · | · | · |
| `schutzziele` | Z | Z | Z | Z | · | · | · | · | · | · | · | · | · | · |
| `normalisierung` | Z | Z | ?– | ?– | · | · | · | · | · | · | · | · | · | · |
| `ermodell` | Z | Z | ?– | ?– | · | · | · | · | · | · | · | · | · | · |

Hinweise zur Matrix:
- Bei den Fachwirt-Kursen und AEVO sind „Z" bei Spielen reine **Typ-Freigaben ohne Set** (außer Büro). Praktische Wirkung entsteht erst mit Phase-1-Content.
- Die Zellen LOG/BÜR/GES/AEV mit `*` bei Spielen betreffen Typen, zu denen das jeweilige Blatt nichts sagt (siehe Abschnitt 6).
- Für GES und AEV sind die Spiel-Zellen `Z*` (Kreuzwort, Duell, Memory) allein daraus abgeleitet, dass die Blätter diese Typen als Neuvorschlag nennen.

---

## 5. Szenario-Gruppen der FI-Werkzeuge (Anhang zu 3.1–3.4)

Die Blätter bewerten Terminal-Szenarien, Netzwerk-Topologie und Flag-Rätsel teils nur nach Stufe bzw. Kategorie. Die **Zuordnung der Kategorien zu den Szenario-IDs ist meine Ableitung** aus den Szenario-Definitionen im Code (`packages/shared/src/terminal-sim.ts`, `topologie-sim.ts`, `flag-raetsel.ts`); sie ist in Q-3 (Abschnitt 7) zur Bestätigung vorgelegt. Ein „–*" bedeutet: Das Blatt nennt dieses Szenario nicht — Empfehlung ausblenden.

### 5.1 Terminal-Szenarien (12)

| ID | Titel | Stufe | AE | DPA | DV | SI |
|---|---|---|---|---|---|---|
| `internet` | Kein Zugriff aufs Internet am Client-PC | leicht | G | G | Z | Z |
| `dns` | Name wird nicht aufgelöst | leicht | G | G | Z | Z |
| `platte-voll` | Festplatte voll | leicht | G | G | Z | Z |
| `apipa` | Rechner hat eine 169.254-Adresse | leicht | G | G | Z | Z |
| `webseite` | Webseite nicht erreichbar | mittel | – | – | Z | Z |
| `ip-maske` | Falsche Subnetzmaske | mittel | – | – | Z | Z |
| `rechte` | Dienst meldet „Permission denied" | mittel | – | – | –* (Blatt: Dateirechte ausblenden) | Z |
| `firewall` | Dienst läuft, Port nicht erreichbar | mittel | – | – | Z | Z |
| `prozess-last` | Server ist extrem langsam | mittel | – | – | Z | Z |
| `ssh-angriff` | Viele fehlgeschlagene SSH-Anmeldungen | schwer | – | – | Z | Z |
| `cron-job` | Cron-Job läuft nicht | schwer | – | – | –* (Blatt: Cron ausblenden) | Z |
| `mehrstufig` | Intranet-Portal: mehrere Fehler | schwer | – | – | Z | Z |

Belege: AE 01 A.2 Z.81 („nur Stufe leicht (4)"), DPA 01 B.2 Z.298, DV 01 C.2 Z.509 und Z.530, SI 01 D.2 Z.721 („alle 12 passen"). Die DV-Zeilen „mittel/schwer = Z" sind meine Zuordnung zu „Netz-/Dienst-/Log-Szenarien".

### 5.2 Netzwerk-Topologie (9)

| ID | Titel | Stufe | AE | DPA | DV | SI |
|---|---|---|---|---|---|---|
| `ein-netz-ein-switch` | Ein Netz, ein Switch | leicht | G | G | Z | Z |
| `zwei-netze-router` | Zwei Netze über einen Router | leicht | G | G | Z | Z |
| `dhcp-apotheke` | Adressen automatisch per DHCP | leicht | G | G | Z | Z |
| `dhcp-pool-konflikt` | DHCP-Pool und feste Adresse | mittel | – | – | Z | Z |
| `filiale-zwei-router` | Zentrale und Filiale über zwei Router | mittel | – | – | Z | Z |
| `gastnetz-vlan` | Gastnetz per VLAN trennen | mittel | – | – | Z | Z |
| `nat-partnernetz` | Zugriff auf ein Partnernetz mit NAT | mittel | – | – | Z | Z |
| `server-vlan-firewall` | Büro, Server und Gäste mit Firewall | schwer | – | – | Z | Z |
| `drei-standorte-routing` | Drei Standorte, drei Router | schwer | – | – | Z | Z |

Belege: AE 01 A.2 Z.82 („nur leicht (3)"), DPA 01 B.2 Z.299, DV 01 C.2 Z.510, SI 01 D.2 Z.722.

### 5.3 Flag-Rätsel (14)

| ID | Kategorie | Stufe | AE | DPA | DV | SI |
|---|---|---|---|---|---|---|
| `flag-base64-kennwort` | Kodierung und Verschlüsselung | leicht | G | G | –\* | G |
| `flag-caesar-postfach` | Kodierung und Verschlüsselung | leicht | G | G | –\* | G |
| `flag-hex-notiz` | Kodierung und Verschlüsselung | leicht | G | G | –\* | G |
| `flag-basic-auth` | Netzwerkverkehr (Klartext im Mitschnitt) | leicht | –\* | –\* | Z | –\* |
| `flag-offene-ports` | Netzwerk und Firewall | leicht | – | – | Z | Z |
| `flag-log-bruteforce` | Log-Analyse | mittel | – | – | Z | Z |
| `flag-pruefsumme-spiegel` | Integrität und Prüfsummen | mittel | G | G | –\* | –\* |
| `flag-passwort-hashes` | Passwortspeicherung | mittel | G | G | –\* | –\* |
| `flag-phishing-header` | E-Mail-Sicherheit | mittel | G | G | –\* | –\* |
| `flag-jwt-token` | Authentifizierung und Token | mittel | G | –\* | –\* | –\* |
| `flag-weblog-pfad` | Web-Sicherheit (Pfad-Traversal) | schwer | G | –\* | –\* | –\* |
| `flag-sshd-reihenfolge` | Konfiguration und Härtung (SSH) | schwer | – | – | –\* | Z |
| `flag-dns-tunnel` | Netzwerk-Monitoring (DNS) | schwer | – | –\* | Z | Z |
| `flag-mehrstufig-funkspruch` | Kodierung und Verschlüsselung | schwer | G | G | –\* | G |

Belege: AE 01 A.2 Z.83 (Kodierung/Hash, Passwort-Hashes, JWT, Pfad-Traversal, Phishing-Header = Grundlagen; Logs/SSH/offene Ports/DNS-Tunnel „eher SI"); DPA 01 B.2 Z.300 (Kodierung, Hash/Prüfsumme, Passwort-Hashes, Phishing-Header passen; Logs/Ports/SSH passen nicht); DV 01 C.2 Z.511 (Logs, Ports, DNS-Tunnel, Klartext im Mitschnitt); SI 01 D.2 Z.723 (Logs, offene Ports, SSH-Regelreihenfolge, DNS-Tunnel; Kodierung = Grundlagen). Alle `–*` sind **Urteil fehlt** (Blatt nennt die Kategorie nicht ausdrücklich); sie sind meine Empfehlung „ausblenden", bei DV/SI wäre „Grundlagen" für Kodierung/Hash/Phishing-Header ebenfalls vertretbar. Die Stufen sind aus dem Code, nicht aus den Blättern.

---

## 6. Auffällige Befunde

1. **Kurszahl:** 14 aufgezählte Kurse statt 15 (siehe Kopf).
2. **Katalogeinträge ohne Blatt-Urteil (28 Zellen, alle Spiele):**
   - LOG: Bug-Hunt, Code-Reihenfolge, Subnetting-Sprint, Zahlensystem-Sprint (nur Sammelzeile „Typen als Typ passend", 02 LOG.2 Z.402).
   - Büro: Phishing, Bug-Hunt, Code-Reihenfolge, Troubleshooting, Subnetting-Sprint, Zahlensystem-Sprint (04 A.2 behandelt nur die drei vorhandenen Spiele und „IT-Instrumente, Subnetting, SQL usw.").
   - Gesundheit und AEVO: alle 9 Spieltypen (nur Neuvorschläge, kein Bestandsurteil); davon 6 Typen ohne jeden Bezug und 3 (Kreuzwort/Duell/Memory) nur durch Neuvorschlag gestützt.
   - Praktisch ohne Folge, weil dort heute **keine** Spiel-Sets existieren; für die Allowlist trotzdem festzulegen.
   - Außerdem „nur über ‚usw.' gedeckt": Terminal, Topologie, Flag-Rätsel in Büro und Gesundheit.
   - Flag-Rätsel-Teilmengen der FI-Kurse: Das Blatt benennt Kategorien, nicht alle 14 Rätsel; 21 Zellen in Abschnitt 5.3 sind „Urteil fehlt" (`–*`).
3. **Widerspruch zwischen den Blättern (Q-2):** Blatt 02 (IND/TEC/WIR/LOG) bewertet *Phishing-Detektiv* und *Troubleshooting-Detektiv* als „passt als Typ"; Blatt 03 (HAN/IMM/VER) bewertet Phishing als „unsicher" und Troubleshooting als „passt nicht", weil der heutige Inhalt IT ist. Gleiche Lage, verschiedene Urteile.
4. **Allowlist wirkt bei Spielen erst mit Content:** Nur FI und Büro haben heute Spiel-Sets. Für alle übrigen zehn Kurse legt Phase 0 nur die Absicht fest.
5. **Werkzeuge sind schon heute pro Kurs freigeschaltet** (`metadata.werkzeuge`). Änderung durch Phase 0 gegenüber heute: bei FI nur die Szenario-Teilmengen (Terminal/Topologie/Flags bei AE/DPA, Teilmenge bei DV/SI) und mögliches Ausblenden von `sqluebung` bei DV/SI; bei allen anderen Kursen ändert sich nichts. Netzplan ist heute in FI, Büro, Immobilien, Versicherungen freigeschaltet und bei Handel/Gesundheit/IND/TEC/WIR/LOG nicht.
6. **Instrumente heute ohne Allowlist:** Der Tab zeigt jeden Katalogeintrag je nach Content-Vorhandensein, übrige im „Weitere Instrumente"-Block. Das bleibt bei Phase 0 nur für Allowlist-Typen ohne Content relevant (Q-1).
7. **Keine Instrumententyp-Lücke:** Zu jedem der 17 Instrumente und 6 Werkzeuge existiert in jedem Kurs mindestens ein Blatt-Urteil (zum Teil über Sammelzeilen „IT-Instrumente"/„IT-Werkzeuge").
8. **Beschriftung ≠ Phase 0:** Mehrere Blätter schlagen Umbenennungen vor (Hierarchie → „Gliederungsbaum", „Gantt" → „Phasen-/Ablaufplan", Risikomatrix-Zonen, Struktogramm → „Ablaufstrukturen"); das sind Beschriftungs- bzw. Content-Fragen und nicht Teil dieser Matrix.
9. **Unsichere Prüfungsrahmen-Werte** (nur Konfiguration, aber nicht belastbar): Präsentationsdauer TEC und WIR; Fachgespräch Büro (40 Min.); mündlich-unabhängig bei Handel; Datum der Versicherungs-Prüfungsverordnung; WBQ-Minuten bei IND/WIR (60/90/60/90 oder teils 75); Verordnungsdatum LOG nicht erneut verifiziert; Neuordnung zum „Bachelor Professional" für IND/TEC/WIR/IMM/Büro/GES nicht geprüft.
10. **Präsentationsdauer-Korrekturen mit hoher Sicherheit:** Handel 15, Versicherungen 20 (heute fälschlich 10, laut Blatt). IMM, LOG, IND, Büro, GES entsprechen dem Standard 10; FI und AEVO sind bereits auf 15 gesetzt.

---

## 7. Entscheidung nötig — Liste zum Abhaken

**Zählung:** 31 Einzelentscheidungen (E-…) für **47 Katalogzeilen** mit Wert „Entscheidung nötig", dazu 3 Querfragen (Q-1 bis Q-3). Innerhalb von E-…: Katalogzeilen als `Schlüssel` genannt. Meine Empfehlung steht je am Anfang.

### Querfragen (kursübergreifend)

- **Q-1 · Allowlist-Typ ohne Content im Kurs.** Empfehlung: **nicht anzeigen** (kein „Weitere Instrumente"-Block mehr), der Allowlist-Eintrag bleibt bestehen und die Kachel erscheint automatisch, sobald im Kurs Content bzw. ein Set vorhanden ist — so bleibt die Kachelliste frei von leeren Kacheln; betrifft u. a. HAN/VER `ansoff`, VER `swot`, GES `bsc`/`pdca`/`risiko`, WIR `risiko`, alle Spielzeilen ohne Set.
  ☐ so umsetzen ☐ anders: ____
- **Q-2 · Phishing- und Troubleshooting-Detektiv in IND/TEC/WIR/LOG (Blatt 02 „passt als Typ") gegen HAN/IMM/VER (Blatt 03 „unsicher"/„passt nicht").** Empfehlung: in allen Fachwirt-Kursen **ausblenden**, bis ein kursspezifischer Typ bzw. Content (S-KF-02 Beleg-/Fall-Detektiv, S-TEC-04, S-LOG-04/05) existiert, weil der heutige Inhalt IT ist und ohnehin kein Set vorhanden ist (also keine sichtbare Änderung).
  ☐ so umsetzen ☐ anders: ____
- **Q-3 · Szenario-Zuordnung in Abschnitt 5** (Terminal/Topologie/Flag-Rätsel je FI-Kurs): meine Ableitung der Blatt-Kategorien auf Szenario-IDs. Empfehlung: bestätigen oder korrigieren, bevor die Szenario-Filter angelegt werden; insbesondere die `–*`-Zellen bei Flag-Rätseln (DV/SI) und `rechte`/`cron-job` bei DV.
  ☐ so umsetzen ☐ anders: ____

### Fachinformatiker Anwendungsentwicklung

- **E-AE-1 · `eisenhower`** (Blatt: unsicher, Tendenz ausblenden). Empfehlung: **ausblenden** — kein Prüfungsbeleg gefunden, nur die allgemeine Berufsbildposition (01 A.2 Z.64; Frage 2 in 01 Z.1057).
  ☐ so umsetzen ☐ anders: ____
- **E-AE-2 · `ablauf`** (Blatt: unsicher, Tendenz umbauen). Empfehlung: **zeigen** — Sequenz/Verzweigung/Schleife bleibt über Pseudocode und Aktivitätsdiagramm relevant; Umbau zu „Ablaufstrukturen" (I-AE-00) separat in Phase 1 (01 A.2 Z.76; Frage 6).
  ☐ so umsetzen ☐ anders: ____

### Fachinformatiker Daten- und Prozessanalyse

- **E-DPA-1 · `eisenhower`**. Empfehlung: **ausblenden** — nur über „Arbeitsaufgaben-Planung", kein Prüfungsbeleg (01 B.2 Z.281).
  ☐ so umsetzen ☐ anders: ____
- **E-DPA-2 · `uml`, `teststufen`** (2 Zeilen). Empfehlung: **ausblenden** — DPA stellt Prozesse mit BPMN/EPK dar, Software-Teststufen sind kein DPA-Prüfungsinhalt; der Aktivitätsdiagramm-Anteil wird über I-DPA-02 neu abgedeckt (01 B.2 Z.289–290).
  ☐ so umsetzen ☐ anders: ____
- **E-DPA-3 · `bughunt`, `codereihenfolge`** (2 Zeilen). Empfehlung: **ausblenden bis Ersatzset** — der Typ passt (Python/SQL-Analysecode), die heutigen Java-/JavaScript-Ausschnitte aber nicht (01 B.2 Z.306–307).
  ☐ so umsetzen ☐ anders: ____

### Fachinformatiker Digitale Vernetzung

- **E-DV-1 · `eisenhower`**. Empfehlung: **ausblenden** — kein Prüfungsbeleg (01 C.2 Z.492).
  ☐ so umsetzen ☐ anders: ____
- **E-DV-2 · SQL-Block** (7 Zeilen: `sql`, `sqluebung`, `kennzahlen_duell/sql`, `ermodell`, `normalisierung`, Lernpfad `ermodell`, Lernpfad `normalisierung`). Empfehlung: **ausblenden** — SQL wird nur in Teil 2 geprüft und §§ 36–38 nennen keine Datenbankabfragen; Alternative „Grundlagen" nur, wenn LF 5/8 als Prüfstoff gewünscht ist (01 C.2 Z.498–503, 508, 514, 527; Frage 4).
  ☐ so umsetzen ☐ anders: ____
- **E-DV-3 · `uml`, `ablauf`** (2 Zeilen). Empfehlung: **ausblenden** — im DV-Prüfungsrahmen nicht genannt, Struktogramm/PAP gestrichen (01 C.2 Z.500, 504).
  ☐ so umsetzen ☐ anders: ____
- **E-DV-4 · `bughunt`, `codereihenfolge`** (2 Zeilen). Empfehlung: **ausblenden bis Ersatzset** (Sensor-/Gateway-Skripte nötig; heutiger Inhalt Java/JS/SQL) (01 C.2 Z.517–518).
  ☐ so umsetzen ☐ anders: ____

### Fachinformatiker Systemintegration

- **E-SI-1 · `eisenhower`**. Empfehlung: **ausblenden** — kein Prüfungsbeleg (01 D.2 Z.704).
  ☐ so umsetzen ☐ anders: ____
- **E-SI-2 · SQL-Block** (7 Zeilen: wie E-DV-2). Empfehlung: **ausblenden** — SQL nur in Teil 2, §§ 20–22 nennen keine Datenbankabfragen; Alternative „Grundlagen" (LF 5/8) (01 D.2 Z.710, 714–715, 720, 726, 739; Frage 4).
  ☐ so umsetzen ☐ anders: ____
- **E-SI-3 · `ablauf`**. Empfehlung: **ausblenden** — Struktogramm gestrichen, Skripte brauchen Kontrollstrukturen aber keine Struktogramme (01 D.2 Z.716).
  ☐ so umsetzen ☐ anders: ____
- **E-SI-4 · `bughunt`, `codereihenfolge`** (2 Zeilen). Empfehlung: **ausblenden bis Ersatzset** (Bash/PowerShell/Python, Konfigurationsdateien) (01 D.2 Z.729–730).
  ☐ so umsetzen ☐ anders: ____

### Industriefachwirt

- **E-IND-1 · `gantt`**. Empfehlung: **zeigen** — bei Produktionsplanung 6.1 sinnvoll; die konstruierten Items (1.2, 2.2) später umwandeln (R2) (02 IND.2 Z.64).
  ☐ so umsetzen ☐ anders: ____
- **E-IND-2 · `netzplan`**. Empfehlung: **ausblenden** — im Content kein Netzplan-Thema (0 Treffer); erst freischalten, wenn Theorie ergänzt wird (W-FW-05, Frage 9) (02 IND.2 Z.67).
  ☐ so umsetzen ☐ anders: ____

### Technischer Fachwirt

- **E-TEC-1 · `gantt`**. Empfehlung: **zeigen** — bei 9.1 und 7.3 sinnvoll; die Verfahrensabläufe in 3.2/3.3 (z. B. Kündigungsschutzprozess) später in Ablauf-/Sortier-Items umwandeln (R2) (02 TEC.2 Z.172).
  ☐ so umsetzen ☐ anders: ____
- **E-TEC-2 · `netzplan`**. Empfehlung: **ausblenden** — Arbeitsvorbereitung 7.3 könnte passen, im Content aber kein Netzplan (0 Treffer) (02 TEC.2 Z.175).
  ☐ so umsetzen ☐ anders: ____
- **E-TEC-3 · Präsentationsdauer** (Rahmen, `presentationMinutes`). Empfehlung: **Standard 10 belassen** — die Verordnung nennt nur „Präsentation + Fachgespräch höchstens 30 Min.", die Aufteilung ist IHK-abhängig (15 + 15 in einer IHK-Quelle); sobald geklärt, auf den gesicherten Wert setzen (02 TEC.1 Z.156; Auslegung R8 siehe 1.3).
  ☐ so umsetzen ☐ anders: ____ (z. B. 15)

### Wirtschaftsfachwirt

- **E-WIR-1 · `gantt`**. Empfehlung: **ausblenden** — nur 1 Item (reine Phasenzuordnung), sonst kein Projektthema im Kurs (02 WIR.2 Z.295).
  ☐ so umsetzen ☐ anders: ____
- **E-WIR-2 · `risiko`**. Empfehlung: **zeigen** — der Handlungsbereich „Betriebliches Management" trägt eine Risiko-Zuordnung; die Kachel erscheint nach Q-1 erst, wenn Items ergänzt sind (02 WIR.2 Z.296, Urteil „Lücke").
  ☐ so umsetzen ☐ anders: ____
- **E-WIR-3 · `schutzziele`**. Empfehlung: **ausblenden** — „IT im Management" (1.3) ist betriebswirtschaftlich, Items fehlen, Blatt: „nur bei Wunsch (unsicher)" (02 WIR.2 Z.298).
  ☐ so umsetzen ☐ anders: ____
- **E-WIR-4 · `netzplan`**. Empfehlung: **ausblenden** — kein Projektplanungs-Schwerpunkt im Rahmenplan, „Projektmoderation" ist kein Netzplan (02 WIR.2 Z.299).
  ☐ so umsetzen ☐ anders: ____
- **E-WIR-5 · Präsentationsdauer** (Rahmen). Empfehlung: **Standard 10 belassen** — das Blatt nennt nur „Fachgespräch mit Präsentation höchstens 30 Min." ohne Aufteilung (02 WIR.1 Z.280).
  ☐ so umsetzen ☐ anders: ____

### Transport/Logistik

- **E-LOG-1 · `gantt`**. Empfehlung: **ausblenden** — nur 2 Items, „kein Projekt-Schwerpunkt", Ausbildungsplan nur „denkbar" (02 LOG.2 Z.397).
  ☐ so umsetzen ☐ anders: ____

### Handelsfachwirt

- **E-HAN-1 · `phishing`**. Empfehlung: **ausblenden** — heutiger Inhalt ist IT-Alltag; erst mit Handels-Content über den Beleg-Detektiv (S-KF-02) (03 A.2 Z.72; siehe Q-2).
  ☐ so umsetzen ☐ anders: ____

### Immobilienfachwirt

- **E-IMM-1 · `phishing`**. Empfehlung: **ausblenden** — nur mit Immobilien-Content sinnvoll (Abrechnungs-/Exposé-Detektiv, S-KF-02) (03 B.2 Z.261; siehe Q-2).
  ☐ so umsetzen ☐ anders: ____

### Versicherungen/Finanzanlagen

- **E-VER-1 · `schutzziele`**. Empfehlung: **ausblenden** — erst sinnvoll, wenn Cyber-/Datenschutz-Content mit Zuordnungsfragen entsteht (03 C.2 Z.444).
  ☐ so umsetzen ☐ anders: ____
- **E-VER-2 · `phishing`**. Empfehlung: **ausblenden** — nur falls Datenschutz/Cyber behandelt wird (Content „Phishing" nur in 1 Datei) (03 C.2 Z.447; siehe Q-2).
  ☐ so umsetzen ☐ anders: ____

### Büro/Projektorganisation

- **E-BUE-1 · `ansoff`**. Empfehlung: **zeigen** — Fragen existieren (`hb2/2.2`), Blatt: „bleibt bis zur Entscheidung unverändert"; im Büro-Rahmenplan nicht belegt (04 A.2 Z.59, Frage 2).
  ☐ so umsetzen ☐ anders: ____
- **E-BUE-2 · `kreuzwortraetsel/standard` (Finanzkennzahlen), `kennzahlen_duell/standard` (QM und Prozesse)** (2 Zeilen). Empfehlung: **zeigen** — Typ und Set bleiben bis zur Blatt-Frage 1 (belassen/kürzen/ersetzen) unverändert; Phase 0 ändert am Set nichts (04 A.2 Z.62–63).
  ☐ so umsetzen ☐ anders: ____

### Gesundheit/Soziales

- **E-GES-1 · `netzplan`**. Empfehlung: **ausblenden** — Gesundheits-Content kennt keinen Netzplan, Blatt: „nicht empfohlen, so lassen" (04 B.2 Z.260, Frage 3).
  ☐ so umsetzen ☐ anders: ____

### AEVO

Keine Einzelentscheidung offen. Hinweis: Bei `gantt` und `hierarchie` ist die Allowlist bei Umsetzung von I-AEV-08 bzw. I-AEV-04 neu zu entscheiden (04 C.2 Z.429, 432).

### Summe

| Kurs | Einzelentscheidungen | Katalogzeilen |
|---|---|---|
| AE | 2 | 2 |
| DPA | 3 | 5 |
| DV | 4 | 12 |
| SI | 4 | 11 |
| IND | 2 | 2 |
| TEC | 3 (davon 1 Rahmen) | 2 |
| WIR | 5 (davon 1 Rahmen) | 4 |
| LOG | 1 | 1 |
| HAN | 1 | 1 |
| IMM | 1 | 1 |
| VER | 2 | 2 |
| BÜR | 2 | 3 |
| GES | 1 | 1 |
| AEV | 0 | 0 |
| **Summe** | **31** | **47** |

Dazu 3 Querfragen (Q-1 bis Q-3). Die Rahmenentscheidungen (E-TEC-3, E-WIR-5) betreffen nur `presentationMinutes`, keine Katalogzeile.
