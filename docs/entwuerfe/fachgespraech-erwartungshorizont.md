# Entwurf: Fachgespräch-Pools mit Erwartungshorizont und situativen Rückfragen (FL-IM-55, FL-TL-46, FL-AEVO-29)

Stand 11.10.2026 · **Vorschläge vom Projektleiter angenommen; Stufe 1 am 11.10.2026 umgesetzt, Stufe 2 als Entwürfe zur Prüfung** (siehe Architekturplanung §13) (Rahmenentscheidung R3; rechtsnahe Antworten R4). Betrifft Iteration 23, Content: „Fachgespräch-Pools: Erwartungshorizont und situationsbezogene Rückfragen ergänzen“.

## Befund

- **Umfang:** 76 Dateien `fachgespraech.md` in 14 Kursen mit zusammen **1.472 Fragen** (AEVO 57, Büro 103, Gesundheit 130, Handel 126, Immobilien 130, Industrie 160, Technischer Fachwirt 186, Wirtschaft 171, Transport 76, Versicherungen 103, vier Fachinformatiker-Kurse je 57 bis 58).
- **Heute:** Der Trainer (`Fachgespraechstrainer.tsx`, F-25) zeigt eine zufällige Frage, dann „Nächste Frage“. Es gibt keine Bewertungshilfe und keine Rückfragen. Die Fallaufgaben dagegen haben Musterlösungshinweise.
- **Befunde der Fachprüfung:**
  - FL-IM-55 (Immobilien) und FL-TL-46 (Transport): Fragenlisten ohne Erwartungshorizont, Bewertungskriterien oder Nachfragen; je Frage 3 bis 5 Erwartungspunkte vorgeschlagen. Fragen wie „Wie würden Sie … umgehen?“ sind fachlich nicht beurteilbar.
  - FL-AEVO-29 (AEVO): Das echte Fachgespräch bezieht sich auf die **eigene Ausbildungssituation** (Begründung der Methode, Alternativen, Lernzielwahl, Reflexion). Der Pool besteht dagegen überwiegend aus Wissensfragen; die Frage nach den „Grenzen der 4-Stufen-Methode“ (hf3, 3.2) hat in der Theorie keinen Bezug.
- **Kurzfragen, die kaum beurteilbar sind:** Im ganzen Bestand beginnen 88 Fragen mit „Wie würden Sie …“, „Wie gehen Sie …“ oder „Wie reagieren Sie …“.

## Vorschlag in drei Stufen

### Stufe 1: Technik und Bewertungsraster (kein neuer Fachinhalt)

- **Format in `fachgespraech.md`:** Unter jeder Frage dürfen eingerückte Zeilen stehen:

```
- Erläutern Sie das Hub-and-Spoke-Prinzip und nennen Sie einen Vor- und einen Nachteil.
  - Erwartung: Sendungen werden über zentrale Umschlagpunkte (Hubs) gebündelt und von dort auf die Zielorte verteilt.
  - Erwartung: Vorteil: niedrigere Kosten je Sendung.
  - Erwartung: Nachteil: tendenziell längere Transportzeit einzelner Sendungen.
  - Rückfrage: Welche Faktoren bestimmen den Standort eines Umschlagpunkts?
```

- **Daten:** `fachgespraechFragePayloadSchema` bekommt die optionalen Felder `erwartung` und `rueckfragen` (Listen, Standard leer). Die Kennung der Frage (`fg:` + Hash des Fragetexts) bleibt gleich, bestehende Fragen sind also unverändert, bis Erwartungspunkte dazukommen.
- **Trainer:** Nach der Antwort ein Schritt „Antwort prüfen“: Die Erwartungspunkte erscheinen als Liste zum Abhaken („Habe ich genannt“), danach die Rückfragen („Wenn die Prüfenden nachfragen“). Fehlen Erwartungspunkte, erscheint nur ein allgemeines Raster: **Fachlichkeit** (stimmen die Begriffe), **Struktur** (Aussage, Begründung, Beispiel) und **Praxisbezug** (Beispiel aus dem eigenen Betrieb). Eine Selbsteinschätzung (alles, teilweise, noch nicht) bleibt auf dem Bildschirm und wird nicht gespeichert, weil der Trainer bisher keine Bewertung führt.
- **Aufwand:** Parser (`parseFachgespraechFragen`), Schema, Trainer, Tests; für alle Kurse sofort nutzbar.

### Stufe 2: Erwartungspunkte und Rückfragen in drei Pilotkursen

Pilot sind die Kurse aus den Befunden: **AEVO (57 Fragen), Immobilienfachwirt (130), Transport (76)**, zusammen 263 Fragen. Je Frage 3 bis 5 Erwartungspunkte und, wo sinnvoll, eine bis zwei Rückfragen. Regeln:

- Erwartungspunkte stützen sich **nur auf die Theorie** des Kurses (keine neuen Fakten), jede Stichpunkt-Zeile ist eine prüfbare Aussage.
- **Rechtsnahe Fragen (R4)** bekommen erst nach der Rechtsprüfung Erwartungspunkte (zum Beispiel Kündigung im Mietrecht, Fristen nach BBiG); bis dahin zeigt der Trainer das allgemeine Raster.
- **AEVO zusätzlich:** Je Handlungsfeld 6 situationsbezogene Rückfragen zur eigenen Unterweisung („Warum haben Sie diese Methode gewählt, welche Alternative gab es?“, „Woran haben Sie gemerkt, dass das Lernziel erreicht wurde?“, „Welchem Lernzielbereich ordnen Sie Ihr Lernziel zu?“), zusammen 24 neue Fragen. Die Frage nach den „Grenzen der 4-Stufen-Methode“ wird zu „In welcher Situation würden Sie die 4-Stufen-Methode einsetzen, und warum passt sie dort?“ (Theorie: Fertigkeiten durch Vormachen, Nachmachen und Üben).
- Jeder Pilotkurs kommt als eigener Entwurf zur Prüfung, bevor etwas eingespielt wird.

### Stufe 3: die übrigen elf Kurse

Nach der Prüfung der Piloten dieselbe Arbeit für die übrigen 1.209 Fragen, Kurs für Kurs.

## Drei Beispiele (Muster für Stufe 2, aus der Theorie der Kurse)

**Immobilienfachwirt, hb1 1.2:** „Welche Akteure prägen die Immobilienwirtschaft, und wie hängen ihre Rollen zusammen?“
- Erwartung: Hausverwaltung (Mietverwaltung für einzelne Eigentümer, WEG-Verwaltung für die Gemeinschaft).
- Erwartung: Makler vermitteln Kauf-, Miet- und Pachtverträge.
- Erwartung: Bauträger und Projektentwickler errichten Projekte auf eigenes wirtschaftliches Risiko.
- Erwartung: Investoren (institutionell oder privat) legen Kapital an; Property Management (operativ) und Asset Management (strategisch) trennen die Bewirtschaftung.
- Rückfrage: Worin unterscheiden sich Property Management und Asset Management?

**Transport, hb1 1.1:** „Erläutern Sie das Hub-and-Spoke-Prinzip und nennen Sie einen Vor- und einen Nachteil.“ (siehe Format oben) mit der Rückfrage zu Faktoren der Standortwahl (Verkehrsknoten, Kundendichte, Personal, Flächenkosten).

**AEVO, hf3 3.2:** „Erläutern Sie den Unterschied zwischen der Leittextmethode und der Projektmethode anhand eines Beispiels aus Ihrem Ausbildungsbetrieb.“
- Erwartung: Leittextmethode: Auszubildende erarbeiten sich anhand von Leitfragen selbstständig Informationen, planen, führen aus und werten aus; die Ausbildenden begleiten.
- Erwartung: Sie eignet sich für komplexere, offene Aufgaben.
- Erwartung: Projektmethode: ein größeres, oft abteilungsübergreifendes Vorhaben wird von der Zieldefinition bis zur Präsentation eigenverantwortlich durchgeführt.
- Erwartung: Ein zutreffendes Beispiel aus dem eigenen Betrieb mit Begründung der Wahl.
- Rückfrage: Warum haben Sie diese Methode gewählt, und welche Alternative gab es?
- Rückfrage: Woran haben Sie gemerkt, dass das Lernziel erreicht wurde? (Theorie: ein Feinziel enthält ein beobachtbares Verb.)

## Folgen

- Stufe 1: Änderungen an `packages/shared` (Schema), `apps/api` (Parser, Import, `content.fachgespraechFragen`), `apps/web` (Trainer) mit Unit- und Integrationstests, Eintrag in Architekturplanung §13 und Anforderungskatalog (neue Funktion F-nnn). Der Import legt die Daten ohne Migration ab (Payload ist `jsonb`).
- Stufe 2 und 3: reine Content-Änderungen; Fragen ohne Erwartungspunkte bleiben unverändert nutzbar.
- Die Kennung der Fachgespräch-Fragen hängt am Fragetext: Wird ein Fragetext geändert (zum Beispiel „Grenzen der 4-Stufen-Methode“), wird die Frage neu angelegt und die alte deaktiviert; Fortschritt gibt es dafür nicht.

## Zu entscheiden

1. Stufe 1 (Format, Trainer mit Erwartungspunkten, Rückfragen und Raster) umsetzen?
2. Pilotkurse AEVO, Immobilienfachwirt und Transport, oder andere Kurse zuerst?
3. Rechtsnahe Fragen erst nach der Rechtsprüfung mit Erwartungspunkten versehen (Vorschlag)?
4. Die 88 „Wie würden Sie …“-Fragen: in den Pilotkursen in beurteilbare Fragen umformulieren (zum Beispiel „Nennen Sie drei Maßnahmen und begründen Sie eine“)?
5. AEVO: die 24 situationsbezogenen Rückfragen als neue Fragen ergänzen und die Frage zu den „Grenzen der 4-Stufen-Methode“ umformulieren?
