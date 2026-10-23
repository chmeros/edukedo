# Prüfprotokoll Paket P-AY „Fachinformatiker (vier Kurse): neue rechtsnahe Inhalte (NIS2/KRITIS, Cyber Resilience Act, KI-Verordnung, Data Act, Verbraucher- und Vertragsrecht, UWG, Urheberrecht, Barrierefreiheit, OT-Recht)“ (Stand 23.10.2026)

**Eingespielt am 23.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AY einspielen“).** Import: 752 Dateien, 23.599 Items (972 neu, 38 geändert); `db:validate-content` 0 Verstöße; 434 Tests grün. Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung L-FI-01 bis L-FI-16 ohne L-FI-14; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`). Dreizehn Teile (a bis m). Vier neue Themen im Fachgebiet FU6/FU7 (6.6 NIS2, KRITIS und Meldepflichten; 6.7 Cyber Resilience Act; 6.8 KI-Verordnung und KI-Einsatz im Projekt; 7.6 Verbraucherrecht und Kaufvertrag) und neun Ergänzungen in bestehenden Themendateien; Fallaufgaben F-FU6-05 bis -08, F-FU7-04, F-FU1-04, F-FU2-04 (alle Kurse) und je ein kursspezifischer Fall (F-AE2-04, F-DV4-04, F-SI5-04, F-DP2-04). Alle Entwürfe liegen gemeinsam in diesem Ordner; je Kurs eine Config (`cfg-ae`, `cfg-dp`, `cfg-dv`, `cfg-si`, erzeugt von `gen-config.cjs`, `"entwuerfe": ".."`).

## Umfang

| Teil | Inhalt | Ziel | Kurse | Neu | Fall (Fachgespräch) |
|---|---|---|---|---|---|
| a | NIS2, KRITIS, Meldepflichten | neues Thema `fu6/6.6` | alle | 14 K, 16 Q | F-FU6-05 (mit FG) |
| b | Cyber Resilience Act (Hersteller, Händler, Importeure) | neues Thema `fu6/6.7` | alle | 12 K, 14 Q | F-FU6-06 (mit FG) |
| c | CRA in der Entwicklung | `ae2/9.1` | AE | 8 K, 10 Q | F-AE2-04 |
| d | OT-Recht (Maschinenverordnung, IEC 62443, Betriebssicherheit) | `dv4/11.3` | DV | 10 K, 12 Q | F-DV4-04 |
| e | Managed Services: Recht (Meldekette, Verträge, SLA) | `si5/12.2` | SI | 8 K, 10 Q | F-SI5-04 (mit FG) |
| f | KI-Verordnung und KI-Einsatz | neues Thema `fu6/6.8` | alle | 14 K, 16 Q | F-FU6-07 (mit FG) |
| g | Datenschutz-Ergänzung (Datenpanne, Auftragsverarbeitung, Beschäftigte) | `fu6/6.2` | alle | 10 K, 12 Q | F-FU6-08 (mit FG) |
| h | Data Act | `dp2/9.2` | DP | 8 K, 10 Q | F-DP2-04 |
| i | Verbraucherrecht und Kaufvertrag | neues Thema `fu7/7.6` | alle | 14 K, 16 Q | F-FU7-04 |
| j | IT-Verträge (Werk-/Dienstvertrag, SLA, Haftung, AGB, Produkthaftung) | `fu1/1.3` | alle | 10 K, 12 Q | F-FU1-04 (mit FG) |
| k | Urheberrecht, Open-Source-Compliance, Creative Commons, KI-Code | `fu2/2.2` | alle | 10 K, 12 Q | F-FU2-04 |
| l | UWG und Werbung | `fu1/1.2` | alle | 6 K, 8 Q | keiner |
| m | Barrierefreiheit: BFSG und BITV | `ae1/8.3` | AE | 6 K, 8 Q | keiner |

**Je Kurs neu** (Test, siehe unten): AE 104 Karten, 124 Quizfragen (25 Kurzantworten), 8 Fälle · DP 98 Karten, 116 Quizfragen (23), 8 Fälle · DV 100 Karten, 118 Quizfragen (23), 8 Fälle · SI 98 Karten, 116 Quizfragen (24), 8 Fälle. Gemeinsam in allen Kursen: 4 neue Themen, 4 Ergänzungen (fu1/1.2, fu1/1.3, fu2/2.2, fu6/6.2), 7 Fälle.

Textersetzungen im Bestand: je Kurs 11 bis 14 Paare in 9 bis 11 Dateien (Querverweise auf die neuen Themen, Berichtigungen widersprechender Bestandsstellen, Einleitungen der Fallaufgaben-Sammlungen „6.1–6.8“, „vier bis fünf Teilaufgaben“, „7.1–7.6“).

## Prüfung

Je Teil eine unabhängige Prüfung mit Faktencheck am Rohtext (`pruefung-a.md` bis `pruefung-m.md`); die Befunde gingen an die Autor:innen zurück.

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde |
|---|---|---|
| a | 0 / 8 / 14 | Verweistitel, Bezugszeitraum der Größenberechnung, Fall verrät Prüfpunkte, Kenntnis-Auslegung ohne Quellenreichweite |
| b | 1 / 11 / 14 | Altprodukt-Regel im Fall (Musterlösung Teilaufgabe 3) nicht angewandt, Fakten außerhalb des Sachverhalts |
| c | 2 / 11 / 14 | Frist von Frühwarnung und Meldung vs. Abschlussbericht, Altprodukte nach 11.12.2027, Erwägungsgrund 34 (Sorgfalt bei Drittkomponenten) |
| d | 1 / 14 / 14 | Lindroth als Chemie-Einrichtung nicht gesichert (jetzt Maschinenbau), IEC 62443 „verbindlich“ vs. Konformitätsvermutung, Produkthaftung auf einen Hinweis |
| e | 0 / 12 / 15 | Erwägungsgrund 31 statt „77“, Dopplung zu Teil A, Fristen im Fall |
| f | 0 / 10 / 15 | Kennzeichnung nach Art. 50 Abs. 2, Übergang nach Art. 111 Abs. 2, Strukturklon Quiz und Fall |
| g | 0 / 10 / 16 | Fernzugriff als Übermittlung, Verlängerung der Auskunftsfrist ohne Deckung im Lerntext, Raster und Folgenabschätzung im Fall |
| h | 0 / 9 / 14 | Cloud-Wechsel (Art. 25 Abs. 4 und 5), Ausnahme für mittlere Unternehmen im Fall, Musterlösung Entgelt |
| i | 0 / 10 / 14 | Fall-Annahmen verraten Prüfpunkte, Zinszeitraum über den Stichtag des Basiszinssatzes, „zwingende Reihenfolge“ in Q-7.6-04 |
| j | 0 / 9 / 18 | Kündigung aus wichtigem Grund nach Vertragsart, Schadensersatz „bleibt unberührt“, Vertretenmüssen im Fall, Produkthaftungsreform |
| k | 0 / 5 / 20 | Punkteraster ohne Frage, GPL-3-Heilung, CC-BY-Bedingungen, Modelltraining nicht als gesichert zulässig |
| l | 0 / 4 / 13 | Strukturklone zu Büro/Immobilien, Reichweite der Bestandskundenausnahme, Widerruf/Widerspruch |
| m | 2 / 5 / 9 | Recherchevermerk im Lerntext (WCAG-Fassung), „private Anbieter“, Bedingungen der Durchsetzungsstufen |
| Summe | 6 / 118 / 190 | |

Alle hohen und mittleren und fast alle niedrigen Befunde sind eingearbeitet. **Die Überarbeitungen hat kein zweiter Prüfer gesehen.** Bewusst nicht umgesetzt (Auswahl): Kürzung der Theorien auf den Richtwert von rund 1.600 Wörtern in den Teilen c, d, h, j, k (je 1.680 bis 1.790 Wörter, wie die übrigen Rechtsergänzungen), N18a Teil j (Einleitung `fu1/fallaufgaben.md` „vier Teilaufgaben“ bleibt, F-FU1-04 hat fünf), das optionale Ersetzungspaar zur Geschäftsleitungs-Haftung in `fu2/2.2` Z. 73 (Teil k). Die Rechtsangaben je Teil (`rechtsangaben-a.md` bis `-m.md`, zusammen rund 850 Zeilen, davon rund 80 mit „vermutet“) weisen aus, was am Rohtext gelesen, was nur über Sekundärquellen gestützt und was Praxis oder Auslegung ist.

## Gemeinsamer Test (Auftraggeber)

`gen-config.cjs` erzeugt je Kurs `cfg-<kurs>/einspielen-config.json`. Jede alte Zeichenkette der Ersetzungen trifft den Bestand (nacheinander angewandt) genau einmal und einzeilig; keine neue enthält die alte; keine alte steht in einem Entwurf. Dateien mit eigener Rechtsstandzeile bleiben bei `rechtsstand` unberührt.

`node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test docs/entwuerfe/fachinformatiker-neue-inhalte/cfg-<ae|dp|dv|si>`: in allen vier Kursen **ok**, validate-content 700 Themendateien, **0 Verstöße**, nichts nicht geparst, keine Items ohne Antworten; alle Fälle 20 Punkte mit Musterlösungszeile je Teilaufgabe.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BSIG (NIS2-Umsetzung), KRITIS-Dachgesetz, Richtlinie (EU) 2022/2555, DVO (EU) 2024/2690, CRA (VO (EU) 2024/2847), KI-VO (EU) 2024/1689 mit Änderungs-VO (EU) 2026/1744, Data Act mit DADG, Maschinenverordnung (EU) 2023/1230 mit Berichtigung, BFSG und BITV, UWG, UrhG, GeschGehG, DSGVO (Amtsblattfassung), BDSG, BGB (Kauf-, Werk-, Dienst-, Verbraucherrecht, AGB), ProdHaftG, Lizenztexte (GPL, LGPL, AGPL, Apache, MPL, MIT, BSD, Creative Commons).
- **Vermutet oder Sekundärquelle:** Rechtsprechung (nirgends im Lerntext), Leitlinien der Kommission zum CRA (C(2026) 5252, nicht gelesen), IEC-62443-Normtext, Apache-GPL-Verträglichkeit, Anwendung von § 69b UrhG auf Auszubildende, Fassung der harmonisierten Normen zum BFSG, §§ 9 bis 12 DADG, Digital-Omnibus.
- **Zeitkritisch (Wiedervorlage):** CRA Meldepflichten ab 11.09.2026 und übrige Pflichten ab 11.12.2027 (Fälle nach diesem Stichtag unter der Annahme „Rechtslage unverändert“), Maschinenverordnung 20.01.2027, KI-VO Hochrisiko 02.12.2027 / 02.08.2028 und KI-MIG, ProdHaftG-Reform (Bundestag 08.10.2026, Verkündung nicht festgestellt), EuGH C-250/25 und LAION (Text und Data Mining), BFSG-Normen im Amtsblatt, Basiszinssatz in Fallrechnungen (Annahme im Fall).
- **Einspielreihenfolge:** Alle Teile gehören in einen Lauf je Kurs (Querverweise auf 6.6, 6.7, 6.8 und 7.6). Reihenfolge in `fu6/fallaufgaben.md`: A, B, F, G (so in der Config).

## Bestand, Glossar, Duell, Prüfblatt (vom Auftraggeber, nicht Teil des Pakets)

- **Glossar** (`fu*/glossar.md`): Einträge für die neuen Begriffe fehlen; Vorschläge stehen in den Berichten der Autor:innen (z. B. Nutzungsrecht, Lizenzverträglichkeit, Permissive Lizenz, Creative Commons, Text und Data Mining, sowie NIS2-/CRA-/KI-VO-Begriffe).
- **Prüfblätter** nach dem Einspielen neu exportieren.
- **Spiele:** `game-memory-it-begriffe.ts` Z. 253–255 vereinbar; sonst keine Fundstellen zu Copyleft, Urheberrecht oder CC in `apps/` und `packages/`.
- **Nicht zusammen mit Minderjährigen:** Die Fachinformatiker-Kurse richten sich an Erwachsene; es kommen keine Minderjährigen vor.
