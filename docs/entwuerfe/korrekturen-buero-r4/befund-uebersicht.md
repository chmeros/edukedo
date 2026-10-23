# Befundübersicht P-AU Büro: Korrekturen (Team BP, Stand 23.10.2026)

Kurs `content/fachwirt-buero-projektorganisation/`, Ersetzungen in `ersetzungen.json` (20 Paare in 6 Dateien). Alle Paare getestet: alte Zeichenkette genau einmal und einzeilig, neue enthält die alte nicht, keine alte kommt in der neuen eines anderen Paares vor. `pruefe-paket.cjs test` mit Scratchpad-Config: ok, 0 Verstöße. Rechtsangaben: `rechtsangaben.md` (15 Zeilen). Prüfung: `pruefung.md`, alle Befunde M1/M2/N1 bis N6 eingearbeitet (Abschnitt „Überarbeitung“).

| Befund | Status vor der Arbeit (Bestand 23.10.2026 geprüft) | Ergebnis | Paare | Geänderte Stellen |
|---|---|---|---|---|
| FL-BP-14 (hoch) | offen | erledigt | 5 | `hb1/1.3`: K-1.3-19 Frage; Q-1.3-24 (Zeile Datenschutzbeauftragte); Q-1.3-26 (Zeile Revision und Erklärung, 2 Paare); Q-1.3-27 (Zeile Revisionsabteilung durch Rechtsabteilung mit Vertragsfreigabe ersetzt) |
| FL-BP-16 (mittel) | offen | erledigt | 2 | `hb3/3.1` Q-3.1-01 Erklärung; zusätzlich Distraktor 4 (missverständliches „keiner Mitbestimmung“) |
| FL-BP-19 Rest (niedrig) | offen (Fragetexte „schriftlich mitzuteilen“) | erledigt | 4 | `hb3/3.1` K-3.1-10 Frage und Antwort; Q-3.1-10 Frage und Akzeptierte Antworten |
| FL-BP-20 (mittel) | offen | erledigt | 2 | `hb2/2.3` Theorie „Werbemittel auswählen“; K-2.3-08 Antwort |
| FL-BP-33 (niedrig) | offen; Titel an der DIN-Katalogseite bestätigt | erledigt | 1 | `hb2/2.5` K-2.5-11 Antwort |
| FL-BP-18 Rest (niedrig) | offen | erledigt | 2 | `hb3/fachgespraech.md` Erwartungen zu den Fragen „Maßnahmen zur Kontrolle und Förderung“ und „Aufgaben vor einer Zwischen- oder Abschlussprüfung“ (Fragetexte unverändert) |
| FL-BP-25 b (Beifang, optional) | offen | erledigt | 2 | `hb3/fallaufgaben.md` F-HB3-01 Ausgangssituation (Gendern) und TA4 (Vier-Stufen-Methode raus, „Feedback- und Fördergespräch“, Gendern) |
| FL-BP-25 c (Beifang, optional) | offen | erledigt | 2 | `hb3/fallaufgaben.md` F-HB3-02 TA3 und Musterlösung TA3 |
| FL-BP-15, -17, -18 a bis c, -19 (Theorie), -25 a | bereits erledigt (08./11./13.10.2026) | nicht angefasst | 0 | – |

Erledigte Befunde: 8 (6 rechtsnahe Positionen, 2 Beifang). Paare: 5 + 2 + 4 + 2 + 1 + 2 + 2 + 2 = 20.

## Nicht Teil dieses Pakets (Entscheidung beim Auftraggeber)

- **Umstellung der Platzhalterfirma „Mustermann GmbH“** (F-HB3-01, F-HB3-02, `hb3/fallaufgaben.md`) auf die Deko & Büro GmbH: offene Frage 3 der Auswertung, bewusst nicht gemacht. **Bemus AG** (`hb1/1.3`, `hb1/fallaufgaben.md`) bleibt, die neuen Zeilen verwenden keinen neuen Firmennamen.
- Keine neuen Namen, Zahlen oder Firmendaten eingeführt (Annahmen: nur die Funktionsbezeichnungen „IT-Sicherheitsverantwortliche“ und „Leiterin Betriebsorganisation“ in den Fällen der Bemus AG).

## Weiter bestehende Stellen außerhalb des Pakets (nur gemeldet)

- `docs/pruefblaetter/12-buero-projektorganisation.md`: Z. 147 („Datenschutzbeauftragte, kann die Freigabe verweigern …“), Z. 203 („Revision, kann den Einsatz der Software untersagen …“), Z. 234 („Revisionsabteilung, darf den Softwarebetrieb später prüfen …“, jetzt Rechtsabteilung) und die Erklärungen dazu; werden beim Neuexport aus dem Content korrekt.
- Spiele (`game-kennzahlen-duell-projektmanagement.ts`, `game-kennzahlen-duell-buero-kennzahlen.ts`, `game-memory-personalkennzahlen.ts`, `game-prozessreihenfolge.ts`, `game-belegdetektiv-einkauf.ts`, `game-kennzahlen-duell-recht-berufsausbildung.ts`): Suche nach Datenschutzbeauftragte, Freigabe, Kaufvertrag, DIN 5008, Nachweisgesetz, Mitbestimmung, Werbedienst ergab keine widersprechenden Stellen; kein Memory-Paar und keine Duell-Frage betroffen.
- Weitere Textstellen im Kurs mit den korrigierten Begriffen (Datenschutzbeauftragte, Freigaberecht, Mitbestimmungsrechten, „schriftlich mitzuteilen“, Kaufvertrags, „Text- und Datenverarbeitung“): nach Anwendung der Paare keine mehr (Suche über `content/fachwirt-buero-projektorganisation/`, vor der Anwendung genau die 7 Fundstellen der Paare).
- `hb4/4.2` Theorie und `hb4/fachgespraech.md` nennen den Kaufvertrag als Vertragsform im Einkauf (Erwerb von Eigentum an einer Sache); das ist richtig und bleibt (§ 433 BGB).

## Hinweise für das Einspielen

- Reihenfolge: Das Paket berührt `hb2/2.3` (P-AW A), `hb3/3.1`, `hb3/fachgespraech.md`, `hb3/fallaufgaben.md` (P-AX, P-AY) und `hb2/2.5` (P-AZ B) nur über feste Textstellen; Korrekturen zuerst einspielen.
- Der Rechtsstand der berührten Dateien wird von `einspielen.cjs` gesetzt (`rechtsstand`-Liste: alle 6 Dateien).
- Offene Fragen: nur noch die Mustermann-Umstellung (s. o.). Die Fragen zur Revision und zu DIN 5008 sind durch die Überarbeitung erledigt.

## Überarbeitung nach der Prüfung (`pruefung.md`)

Angenommen: M1 (Q-1.3-27 Rechtsabteilung mit Vertragsfreigabe), M2 (K-2.5-11 weicher: „keine gesetzliche Vorgabe; Anwendung grundsätzlich freiwillig, wird zum Beispiel im Betrieb festgelegt“), N1 (Distraktor verlängert, 124 gegen 115 Zeichen), N2 („vor allem“), N3 (K-3.1-10 Antwort „statt unterzeichnet auf Papier elektronisch in Textform“), N4 („allparteiliche Gesprächsleitung“), N5 („Feedback- und Fördergespräch“; zusätzlich ein Paar für die Ausgangssituation von F-HB3-01), N6 (Akzeptierte Antwort „Nachweisgesetz (NachwG)“). Abgelehnt: nichts. Nicht aufgenommen: der optionale Zusatzpunkt zur Mediation in der Musterlösung von F-HB3-02 (Punkteraster bleibt).

Geänderte Item-IDs (nur Texte, keine ID geändert): K-1.3-19, Q-1.3-24, Q-1.3-26, Q-1.3-27, Q-3.1-01, K-3.1-10, Q-3.1-10, K-2.3-08, K-2.5-11, F-HB3-01, F-HB3-02; dazu die Theorie `hb2/2.3` und zwei Fachgespräch-Erwartungen in `hb3/fachgespraech.md`.
