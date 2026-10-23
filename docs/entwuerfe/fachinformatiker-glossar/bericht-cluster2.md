# Bericht Cluster 2 (P-AZ): fu7, fu1, fu2, ae1, dp2 (Stand nach Einarbeitung der Prüfung)

Alle Entwürfe mit `Geprüft: nein`, Ordner `docs/entwuerfe/fachinformatiker-glossar/`. Nichts im Bestand geändert, nichts committet. Grundlage der Überarbeitung: `pruefung-cluster2.md` (4 hoch, 17 mittel, 12 niedrig).

## Anzahl je Zieldatei

| Ziel | Datei | Einträge | Themen |
|---|---|---|---|
| `fu7/glossar.md` (alle vier Kurse, Anhang) | `glossar-fu7.md` | 17 | 7.6 |
| `fu1/glossar.md` (alle vier Kurse, Anhang) | `glossar-fu1.md` | 14 | 1.2 (4), 1.3 (10) |
| `fu2/glossar.md` (alle vier Kurse, Anhang) | `glossar-fu2.md` | 11 | 2.2 |
| `ae1/glossar.md` (neu, nur AE) | `glossar-ae1.md` | 9 | 8.3 |
| `dp2/glossar.md` (neu, nur DP) | `glossar-dp2.md` | 12 | 9.2 |
| | | **63** | |

(Vorher 60: dazu kamen Bestellstrecke, Waren mit digitalen Elementen, Abnahme, Verbundener Dienst, Geschäftsgeheimnis; weggefallen sind Wettbewerbsrechtliche Abmahnung und Nutzer vernetzter Produkte.)

## Prüfungen (wiederholt, alle bestanden)

- Echter `parseGlossar` liest alle fünf Dateien; Pflichtfelder vorhanden.
- `einspielen-glossar.cjs` (ohne `--schreiben`) meldet „Prüfung bestanden“ über alle neun Entwürfe (Eindeutigkeit von Begriff und Alias je Kurs inklusive Cluster 1 und Bestand, Länge, Abschnitt).
- Eigenes Skript: `Thema:` passt zur Themendatei, jede `Abschnitt:`-Zeile ist wörtlich `###`-Überschrift, Definition höchstens 280 Zeichen, keine Paragrafen/Beträge/Fristzahlen, keine Du/Sie-Satzanfänge, alle Aliase kommen im Lerntext vor.
- **Fachbegriff-Sucher** (`packages/shared/src/fachbegriffe.ts`, echte Funktion) über den gesamten Kursinhalt aller vier Kurse (je Zeile, dazu Bestand-Glossare und alle Entwürfe als Eintragsmenge): **kein Eintrag ohne Treffer** im eigenen Thema (vorher 8 tote Einträge). Fremde Treffer sind bei den übrigen Einträgen inhaltlich passend (z. B. Nacherfüllung in 1.3 und dv2/9.4, Verzug in 1.3, Abnahme in 2.4/5.x, Barrierefreiheit in ae3, Quasi-Identifikator/Re-Identifikation/k-Anonymität in dp4/11.3).

## Eingearbeitet (hoch und mittel)

- **H1** Nacherfüllung: Ersatztext der Prüfung übernommen (Kauf: Käuferseite wählt; Werkvertrag: Auftragnehmerseite; Rücktritt/Minderung „in der Regel erst“).
- **H2** Alias „Widerruf“ gestrichen.
- **H3** Unverhältnismäßige Belastung: Anbieter:innen als Belastete, zwei getrennte Fälle, Alias „Unverhältnismäßiger Belastung“ (Lerntext-Form).
- **H4** Creative Commons: SA/ND korrekt („Weitergabe von Bearbeitungen“).
- **M1** Verzug allgemein gefasst, Gendern. **M2** Sachmangel (Werk/Kauf, Alias Sachmängel). **M3** Vertragsstrafe allgemeiner. **M4** Garantie: siehe Abweichung 1. **M5** Kündigungsschaltfläche mit Ausnahme Finanzdienstleistungen. **M6** Widerrufsfunktion zweistufig, ohne „müssen“. **M7** AGB mit Einverständnis. **M8** Fernabsatz mit Vertriebssystem, „meist“ Widerrufsrecht. **M9** Urheber:in (Erbfall, Doppelpunkt, Alias Urheber:innen). **M10** Text und Data Mining mit Löschpflicht. **M11** „Kleinstunternehmen“ als Begriff (Lerntext-Form), Satz repariert. **M12** Dateninhaber. **M13** siehe Abweichung 2. **M14** Datenhoheit mit „Praktische Zuordnung“, „in der Regel“ (gekürzt). **M15** Bestellstrecke, Waren mit digitalen Elementen, Abnahme, Verbundener Dienst, Geschäftsgeheimnis ergänzt. **M16** Gendern in allen Dateien (Doppelpunkt bzw. neutrale Wendungen; die Data-Act-Rollenbegriffe Dateninhaber/Datenempfänger bleiben als Begriff, im Text „Nutzer:in“). **M17** Wechselentgelt abgegrenzt.
- Niedrig: N1 (Unterlassungsanspruch mit Alias „Unterlassung“; Nutzungsvorbehalt als Begriff; Assistive Technologie mit Alias „assistiver Technologien“), N2, N3, N4, N5, N6, N7 (Hedge „Mischformen: Einzelfall“), N8, N9 (Vernetztes Produkt mit „Im Data Act“ und Erwägungsgrund-Hedge), N10 (redundante Aliase entfernt), N12 (Mosaik-Effekt aus Re-Identifikation entfernt).

## Bewusst abgewichen / nicht übernommen

1. **Garantie (M4):** Statt nur den Einleitungssatz „Im Kaufrecht“ zu ergänzen, heißt der Eintrag jetzt „Garantie (Kaufrecht)“ mit den Aliasen Herstellergarantie, Haltbarkeitsgarantie, Garantieerklärung. Grund: Der Sucher markierte die bloße „Garantie“ in 6.2 (7), 6.6, 6.8 und im Fachgespräch (DSGVO-„geeignete Garantien“, Registrierung) mit der Kaufrechts-Erklärung. Folge: Die bloße Form „Garantie“ in 7.6 wird nicht mehr markiert (3 Treffer in 7.6, dafür null Fehlmarkierungen). Wer die Markierung der bloßen Form wünscht, setzt „Auch: Garantie“ und akzeptiert die Fehlmarkierungen.
2. **Nutzer vernetzter Produkte (M13):** Eintrag gestrichen statt umbenannt. Im Lerntext steht immer nur „Nutzer“; ein Alias „Nutzer“ würde etwa 45 fremde Stellen im Kurs falsch markieren, jede andere Form markiert nirgends. Die Rolle ist in „Datenempfänger“ und „Verbundener Dienst“ miterklärt.
3. **Wettbewerbsrechtliche Abmahnung (N1):** gestrichen (Alias „Abmahnung“ würde die arbeitsrechtliche in 7.1 und 1.3 fehlmarkieren).
4. **Marktüberwachungsbehörde, Stand der Technik (M15 Punkt 6):** nicht bei Cluster 2, legt die Koordination bei Cluster 1 an.
5. **Nicht übernommen:** CC0 „an die Allgemeinheit“ (steht nicht in der Theorie); Mosaik-Effekt als eigener Eintrag (stattdessen aus der Definition entfernt); Doppelungen mit einem späteren `dp4`-Glossar sind Sache dieses späteren Pakets.

## Verbleibende Hinweise

- **Geschäftsgeheimnis (dp2):** markiert auch in 2.2 (1) und 7.1 (Verschwiegenheit, 1); der erste Satz der Definition passt dort, der Data-Act-Teil nicht. Falls unerwünscht, den Eintrag auf „Geschäftsgeheimnis (Data Act)“ ohne Alias umbenennen (dann ohne Markierung).
- **Nutzungsrecht** markiert auch „Nutzungsrechte“ an Daten in dp4/11.2 und si3/10.2; die Definition spricht von Werken, ist dort aber sinngemäß verwendbar.
- **Verzug und Vertragsstrafe** markieren auch in 1.3, 6.1 und im Verbraucherrecht; die Definitionen sind dafür allgemein gehalten.
- **Rechtsangaben-Blätter** (`rechtsangaben-<a..m>.md`): von der Prüfung teilweise gegengelesen (h, i, j, k, l, m); Widerrufsfunktion und Teile des Data Act bleiben als „Rechtsprüfung nötig“ markiert (Blatt i Nr. 65/67; Data-Act-Primärtext nicht abrufbar).
- Zahl der Einträge liegt bei 7.6 (17) und 1.3 (10) über dem Richtwert, weil beide Themen sehr groß sind; entbehrlich wären am ehesten Impressum, Dauerschuldverhältnis, Rechtsmangel, Selbstvornahme.
