# Prüfprotokoll Paket P-AZ „Fachinformatiker: Glossar-Einträge zu den neuen rechtsnahen Inhalten (P-AY)“ (Stand 23.10.2026)

**Eingespielt am 23.10.2026 (Freigabe des Projektleiters „Ja, P-AZ einspielen“).** Import: 757 Dateien, Glossare je Kurs importiert; `db:validate-content` 0 Verstöße; 443 Tests grün. Alle Einträge `Geprüft: nein`, nicht förmlich rechtsgeprüft (Stand Oktober 2026).

Auftrag: `auftrag.md`. Ergebnisdateien `glossar-<ziel>.md` (nur die `####`-Blöcke), Berichte der Autoren `bericht-cluster1.md`, `bericht-cluster2.md`, unabhängige Prüfungen `pruefung-cluster1.md`, `pruefung-cluster2.md`, Einspielskript `einspielen-glossar.cjs`.

## Umfang

| Ziel (`…/glossar.md`) | Kurse | Einträge | Themen |
|---|---|---|---|
| `fu6` | alle vier | 49 | 6.6 (13), 6.7 (16), 6.8 (9), 6.2 (11) |
| `fu7` | alle vier | 17 | 7.6 |
| `fu1` | alle vier | 14 | 1.2 (5), 1.3 (9) |
| `fu2` | alle vier | 11 | 2.2 |
| `ae2` (neu) | Anwendungsentwicklung | 8 | 9.1 |
| `ae1` (neu) | Anwendungsentwicklung | 9 | 8.3 |
| `dv4` (neu) | Digitale Vernetzung | 3 | 11.3 |
| `si5` (neu) | Systemintegration | 3 | 12.2 |
| `dp2` (neu) | Daten- und Prozessanalyse | 12 | 9.2 |
| Summe | | **126** | |

Je Kurs neu: AE 108, DP 103, DV 94, SI 94 Einträge (zusammen mit dem Bestand bleibt jeder Begriff und Alias im Kurs eindeutig). Fünf neue `glossar.md` (ae1, ae2, dv4, si5, dp2) mit Frontmatter nach dem Muster der bestehenden Glossare.

## Prüfung

Je Cluster eine unabhängige Prüfung (Faktencheck gegen Theorie und Primärquellen soweit abrufbar, Format, Eindeutigkeit, Fachbegriff-Sucher über Karten und Quiz aller vier Kurse):

| Cluster | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde |
|---|---|---|
| 1 (fu6, ae2, dv4, si5) | 6 / 24 / 15 | zehn Einträge nirgends markierbar (Klammerbegriffe wie „Hersteller (CRA)“), „aktiv ausgenutzt: nur sie meldepflichtig“ falsch, Hochrisiko-Ausnahme fehlte, Hedges verloren, Einführer/Händler/Bevollmächtigter fehlten |
| 2 (fu7, fu1, fu2, ae1, dp2) | 4 / 17 / 12 | Nacherfüllung (Käufer-/Werkvertrag), Alias „Widerruf“ markierte ca. 15 fremde Stellen, unverhältnismäßige Belastung (Anbieter, zwei Ausnahmen), ND-Bedingung der CC, acht tote Einträge |

Alle hohen und mittleren Befunde sind eingearbeitet (Cluster 1: 69 auf 63 Einträge, u. a. Klammerbegriffe zu „Hersteller“ zusammengelegt, Integrator, Anbieter/Betreiber (KI-VO) gestrichen; Cluster 2: 60 auf 63, fünf Begriffe ergänzt, zwei gestrichen). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

Wichtige Erkenntnis: Der Fachbegriff-Sucher (`packages/shared/src/fachbegriffe.ts`) markiert Glossarbegriffe nur in Karten und Quiz nach der Antwort, nicht in der Theorie. Aliase stehen deshalb auf den Formen, die dort tatsächlich vorkommen; mit dem echten Sucher ist kein Eintrag mehr tot.

## Test

`node docs/entwuerfe/fachinformatiker-glossar/einspielen-glossar.cjs` (ohne `--schreiben`): „Prüfung bestanden“ (Eindeutigkeit je Kurs über Bestand und Entwürfe, Pflichtfelder, Länge ≤ 280 Zeichen, `Abschnitt` wörtlich als `###`-Überschrift der Themendatei, `Geprüft: nein`).

## Offen / bekannte Restfälle

- Bewusst nicht aufgenommen: „Verantwortlicher“, „Anbieter“, „Betreiber“ (ohne eindeutige Form würden sie im Kurs fremd markieren); „Nutzer vernetzter Produkte“, „Wettbewerbsrechtliche Abmahnung“ (zu allgemeine Aliase). „Garantie“ heißt „Garantie (Kaufrecht)“ mit Aliasen.
- Geringe Fremdmarkierungen hingenommen: „Cookie“ in 9.1, „Geschäftsleitung“ in dp 8.2 und 10.4, „Geschäftsgeheimnis“ (dp2) in 2.2/7.1, „Nutzungsrecht“ an Daten in dp4/11.2 und si3/10.2, „Verzug“/„Vertragsstrafe“ in 1.3/6.1.
- Teile des Data Act und die Widerrufsfunktion brauchen weiter eine förmliche Rechtsprüfung; Primärtexte (EUR-Lex, Gesetze im Internet) waren den Prüfern teils nicht abrufbar.
