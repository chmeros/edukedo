# Prüfprotokoll Paket P-AK „Versicherungen und Finanzanlagen: neue rechtsnahe Inhalte“ (Stand 19.10.2026)

**Eingespielt am 19.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AK einspielen“).** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung VF-9, VF-3, VF-15, VF-13, VF-11, VF-19; Auswertung `docs/entwuerfe/versicherung-transport-r4-auswertung.md`). Alle Agenten liefen auf Sonnet.

## Umfang

| Teil | Inhalt | Karten | Quiz (Kurzantworten) | Fall | Fachgespräch | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|---|---|
| A | Ergänzung `kp1/3.3` Schadenmanagement: Obliegenheiten, Fälligkeit, Verjährung, Sachverständigenverfahren | 12 (K-3.3-23 bis -34) | 14 (4; Q-3.3-16 bis -29) | F-KP1-05 | 2 | 5 | 57 |
| B | Ergänzung `kb1/1.6` Finanzanlagen: Anlageberatung im Aufsichtsrecht | 12 (K-1.6-15 bis -26) | 14 (4; Q-1.6-17 bis -30) | F-KB1-07 | 2 | 4 | 63 |
| C | Ergänzung `kp1/3.2` Kundenmanagement: Informationspflichten, Registrierung, Weiterbildung, Beschwerde, Ombudsmann | 12 (K-3.2-22 bis -33) | 14 (5; Q-3.2-16 bis -29) | F-KP1-06 | 2 | 2 | 64 |
| D | Ergänzung `kp1/3.1` Produktmanagement: Produktfreigabe und Zielmarkt, Solvency II, Lebensversicherungs-Kalkulation | 12 (K-3.1-23 bis -34) | 14 (6; Q-3.1-19 bis -32) | F-KP1-07 | 2 | 4 (davon 1 Einleitung) | 52 |
| E | Ergänzung `kb2/2.2` Umwelt- und Arbeitgeberhaftpflicht und kleine Ergänzung `kb2/2.1` Elementarschaden | 10 + 4 (K-2.2-19 bis -28, K-2.1-19 bis -22) | 12 + 4 (Q-2.2-14 bis -25, Q-2.1-13 bis -16) | F-KB2-05 | 3 | 4 (davon 1 Einleitung) | 58 |
| Summe | | 62 | 72 (24) | 5 | 11 | 19 | 294 |

Die Theorien sind rund 1.810 (A), 1.680 bis 1.830 (B), 1.850 (C), 1.840 (D) und 1.540 plus 350 (E) Wörter lang.

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (Gesetze von gesetze-im-internet.de, EU-Texte über publications.europa.eu, BGBl.-PDFs, Websites von Ombudsmann und GDV).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Nachgerechnet | Am Rohtext geprüft |
|---|---|---|---|---|
| A | 0 / 4 / 15 | „gilt in allen Versicherungszweigen“ stimmt nicht für die Schadenminderung (Schadenversicherungsrecht); Verjährungsbeispiel mit zweifelhafter Hemmung durch Neuanmeldung; BGH IV ZR 350/22 in den Rechtsangaben falsch beschrieben; Ausgangssituation verriet die Rechengrundlage | 37 | rund 38 Rechtsaussagen, 23 Normen |
| B | 0 / 8 / 12 | Rollen von Hersteller, Vertretung und Makler bei Informationspflichten unklar; Anlegerentschädigung zu weit gefasst (Banken ausgenommen, BaFin-Feststellung nötig); Fernabsatz-Ausnahme falsch wiedergegeben; Vergleich Honorar gegen Provision mit nicht vermittelbarem Fondsprodukt; klassische Verträge mit Überschussbeteiligung als mögliche Versicherungsanlageprodukte | 33 | rund 45 Rechtsaussagen |
| C | 0 / 7 / 12 | Papiergrundsatz als Gesetzeswortlaut dargestellt, ist Auslegung; Erlöschen des Widerrufsrechts zu eng; Beschwerdepflichten gelten nur für Erlaubnisinhaber, nicht für gebundene Vertreter; Mitgliedschaft beim Ombudsmann als Voraussetzung der Bindungswirkung fehlte | 27 | 44 Rechtsaussagen (39 stimmen, 5 enger oder anders) |
| D | 0 / 7 / 8 | Fall mit „Kapitalversicherung“ rechnet eine reine Erlebensfallleistung; „Sparte“ statt Unternehmen; Mindestzuführung unvollständig; Nettoprämie-Modell weicht vom Lernmodell des Bestands ab (Kennzeichnung als vereinfacht) | 21 | rund 55 Normstellen |
| E | 0 / 7 / 12 | ZÜRS-Klassen 1 und 2 nach Quelle unterschiedlich; Erheblichkeitsschwelle beim Gewässerschaden fehlte; „Pflichtangebot“ gibt die Reformrede nicht her (Deckungserweiterung); „nur bei Vorsatz leistungsfrei“ nur für die Herbeiführung des Versicherungsfalls | 27 | 30 Normen, 4 Reformquellen |

Alle mittleren und fast alle niedrigen Befunde wurden von den Autor:innen eingearbeitet und neu nachgerechnet (abgelehnt oder nur teilweise, jeweils begründet: A N10, B N1 teilweise, N3 und N11 mit Rest, E N11 teilweise). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (alle 19 Ersetzungspaare in 10 Dateien treffen den Bestand je genau einmal und einzeilig; Reihenfolge A bis E). `pruefe-paket.cjs test`: 686 Themendateien, 21.300 Item-Schlüssel, **0 Verstöße**, alle Entwürfe geparst (+62 Karten, +72 Quizfragen), die fünf Fälle mit je 5 Teilaufgaben und 20 Punkten.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen** (nach Angabe der Autor:innen und Prüfer:innen): VVG (Obliegenheiten, Fälligkeit, Widerruf, Beratung, Lebensversicherung), VVG-InfoV, BGB (Verjährung, Fristen), WpHG, GewO §§ 34d, 34f, 34g, 34h und 6a, FinVermV, VersVermV, AnlEntG, VAG (Produktfreigabe, Solvency II, Beschwerde), VSAAG (BGBl. 2026 I Nr. 275, Solvency-II-Überarbeitung, Inkrafttreten 29./30.01.2027), DeckRV, MindZV, USchadG, UmweltHG, WHG, SGB VII §§ 104 bis 113, EU-Texte (IDD, PRIIP-Verordnung, Delegierte Verordnungen 2017/565, 2017/2358, 2017/2359, 2021/1253, 2021/1257 und 2017/653, Richtlinien 2025/1 und 2025/2).
- **Nur Sekundärquellen oder „vermutet“:** Urteile (BGH IV ZR 350/22, IV ZR 197/11, LG Koblenz 14 O 38/25, nicht im Urteilstext), Verfahrensordnung und Wertgrenzen des Versicherungsombudsmanns (Website, Stand 2016, keine amtlichen Texte), Papiergrundsatz auch für den Rat der Vermittler (Auslegung), neue Höchstfrist des Widerrufs nur für Verträge ab 19.06.2026 (nach Presse), Inhalt der EU-Kleinanlegerstrategie, Empfehlung der Aktuarvereinigung zum Höchstrechnungszins 2027, Eckpunkte und Referentenentwurf zur Elementarschadenversicherung (Rede vom 23.09.2026 und GDV-Meldung vom 28.09.2026; nichts veröffentlicht), Umweltbedingungen (Sekundärquelle von 2018), Abgrenzung klassischer Verträge zu Versicherungsanlageprodukten.
- **Zeitkritisch:** Solvency-II-Umsetzung (Gesetz vom 25.09.2026, Kapitalkostensatz 4,75 % ab 30.01.2027), Höchstrechnungszins 1 %, Kleinanlegerstrategie, Elementarschaden-Gesetzgebung, elektronische Widerrufsfunktion, Mindestversicherungssummen der Vermittler (im Kurs ohne Beträge), Altersvorsorgereformgesetz (ab 01.01.2027, nicht inhaltlich gelesen), Gefährdungsklassen ZÜRS.

## Bestand, Duell, Prüfblatt

- Kein Widerspruch zum Prüfblatt `docs/pruefblaetter/19-versicherungen-finanzanlagen.md` und zu den Spielen (Duell „versicherung-aehnlich“ bleibt gesperrt). Das Nettoprämie-Lernmodell des Bestands (`kp1/3.1`, Prüfblatt, Duell) bleibt unverändert; die Lebensversicherungs-Kalkulation ist ausdrücklich als vereinfacht gekennzeichnet.
- Ersetzungen im Bestand: Verweise auf die neuen Abschnitte (`kp1/3.1` bis `3.3`, `kb1/1.6`, `1.7`, `kb2/2.1`, `2.2`), zwei Korrekturen zur groben Fahrlässigkeit in der Personenversicherung (`kp1/3.4`: nur bei Herbeiführung des Versicherungsfalls), „nicht behandelt“-Stellen zu Anlageberatung und Nachhaltigkeitspräferenzen, Einleitungen der Fallaufgaben (`kp1`: „vier bis fünf Teilaufgaben“, `kb2`: „vier oder fünf Teilaufgaben“). `rechtsstand` der berührten Dateien 19.10.2026 (der Frontmatter-Zusatz „Beratungspflichten bewusst nicht behandelt“ in `kb1/1.7` entfällt dabei, weil das Skript die Zeile ersetzt).
- Künftig zu prüfen (kein Widerspruch heute): Elementarschaden in `kb2/2.1` (K-2.1-07, Q-2.1-03), `kb2/fachgespraech.md`, `kb1/1.7`, Memory-Spiel und Kreuzworträtsel, sobald ein Gesetz kommt; Zahlen mit Stand-Zusatz nach dem 30.01.2027.
- Nicht berührt, aber bekannt: die Bestandsformulierung „Lebensversicherungssparte“ in `kp1/3.1` Zeile 15 ist ungenau (Lebensversicherung wird in Deutschland in eigener Gesellschaft betrieben); Altersvorsorgedepot-Folgeverordnung offen; Immobilien, AEVO, Gesundheit, Büro, Technischer Fachwirt, Fachinformatiker.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Neuer Name im Fall: Herr Brandtner (Teil B), Hohlweg Oberflächentechnik GmbH (Teil E); alle Fallangaben sind als Annahmen gekennzeichnet.
3. Die Theorien von C und D liegen knapp über dem Richtwert von rund 1.800 Wörtern.
