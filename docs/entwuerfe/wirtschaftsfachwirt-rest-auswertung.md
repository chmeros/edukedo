# Wirtschaftsfachwirt: Auswertung der verbleibenden Rahmenplan-Lücken (Stand 15.10.2026)

Grundlage: `docs/entwuerfe/rahmenplan-luecken-erhebung.md` (Abschnitt Wirtschaftsfachwirt, WF-01 bis WF-25), `docs/reviews/2026-10-07/fachlehrer-wirtschaftsfachwirt.md` (FL-WF-13, FL-WF-14) und der aktuelle Bestand unter `content/wirtschaftsfachwirt/` (Fachgebiete WBQ1 bis WBQ4 und HSQ1 bis HSQ5). Eingespielt sind bisher WF-01 und WF-02 (P-B, `wbq2/2.4` und `2.5`), WF-25 (P-A), WF-20 (P-O, `wbq1/1.5`).

## Abgleich der verbleibenden Lücken mit dem Bestand

| ID | Lücke | Bestand heute | Vorlage im Repo | Zielthema |
|---|---|---|---|---|
| WF-04 | Betriebsstatistik (Mittelwert, Streuung, Indizes, Zeitreihen) | keine Treffer im Kurs | Prognose und Saisonindex in `industriefachwirt/hq3/7.6`; Preisindex in `wbq1/1.5` | neu `hsq1/1.5` |
| WF-05 | Kreativitäts- und Entscheidungstechniken (Entscheidungsbaum, Nutzwertanalyse) | Nutzwertanalyse nur im Einkauf (`hsq3`), Kreativität nur Stichworte in `hsq5/5.4` | `industriefachwirt/hq4/8.2` (Kreativität), `hq2/6.5` (Nutzwert) | Ergänzung `hsq1/1.4` |
| WF-06 | Wissensmanagement | keine Treffer im Kurs | `industriefachwirt/hq4/8.1`, `8.3` | neu `hsq1/1.6` |
| WF-07 | Organisationsentwicklung | `hsq1/1.2` vorhanden (Change-Grundlagen, Widerstände, Organisationsanalyse); Lücke klein | `industriefachwirt/hq4/8.5` | Ergänzung `hsq1/1.2` (klein) |
| WF-08 | Finanzplanung und Finanzbedarf | Finanzplan nur in `wbq1/1.3` und `wbq2/2.5` gestreift | `industriefachwirt/hq1/5.3`, `5.2`-Ergänzung | neu `hsq2/2.5` |
| WF-09 | Finanzierungsarten beurteilen (Kreditsicherheiten, Skonto-Effektivzins, Leverage) | keine Treffer in `hsq2/2.2` | P-M Teil C (`industrie-controlling/industrie-5.2-ergaenzung-…`) | Ergänzung `hsq2/2.2` |
| WF-10 | Kalkulation vollständig, Prozesskosten, Target Costing | Divisions-, Äquivalenzziffern-, Vor-/Rückwärtskalkulation und Preisuntergrenze sind in `hsq2/2.3` vorhanden; **Prozesskosten und Target Costing fehlen** | P-M Teil B (`industrie-2.6-…`) | Ergänzung `hsq2/2.3` (kleiner als erhoben) |
| WF-11 | Einkauf: Brutto-/Nettobedarf, Make-or-Buy | keine Treffer in `hsq3` | P-K Teil A (`industrie-6.5-…`) | neu `hsq3/3.4` |
| WF-15 | Marketing-Mix vertiefen (Produktlebenszyklus, Preiselastizität, Verkaufsgespräch) | keine Treffer in `hsq4` | P-L Teil A und B (`industrie-7.5-…`, `7.6-…`) | neu `hsq4/4.5` |
| WF-16a | Markterschließung und Hofstede (R3) | nur im Fall `hsq1`, nicht in `hsq4/4.4` | P-L Teil C (`industrie-7.4-ergaenzung-…`) | Ergänzung `hsq4/4.4` |
| WF-17 | Teamentwicklung und Kommunikationsmodelle namentlich | Vier-Ohren-Modell in `hsq5/5.1`; Tuckman fehlt | `industriefachwirt/hq5/9.2` | Ergänzung `hsq5/5.1` oder `5.2` |
| WF-18 | Führungstheorien, Beurteilung | Herzberg/Maslow in `wbq4/4.2`; Beurteilung fehlt | P-N Teil C (`industrie-4.4-…`), `hq5/9.1` | Ergänzung `wbq4/4.2` |
| WF-21 | Betriebliche Funktionen (Ziele, Produktivität, Standort) | `wbq1/1.2` ohne Ziele und Produktivität | P-M Teil D (`industrie-1.2-ergaenzung-…`), `hq2/6.8` (Standort) | Ergänzung `wbq1/1.2` |

**Nicht in diesem R3-Block:** WF-12 (Entsorgung, Prozess R3, Rechtsrahmen R4; Vorlage `industriefachwirt/hq2/6.7`), WF-13, WF-14, WF-16b, WF-19 (Ausbildung, rechtliche Grundlagen), WF-22 bis WF-24 (alle R4); WF-03 (Planungsrechnung, Teilpläne) lag außerhalb der angefragten Spanne.

## Paketvorschlag

| Paket | Inhalt | Umfang (geschätzt) |
|---|---|---|
| **P-Q Finanzen und Controlling (HSQ2)** | WF-08 (neues Thema `hsq2/2.5`), WF-09 (Ergänzung `hsq2/2.2`), WF-10 (Ergänzung `hsq2/2.3`: Prozesskosten, Target Costing) | 3 Fälle, rund 90 Items |
| P-R Unternehmensführung (HSQ1) | WF-04 (neu `hsq1/1.5`), WF-05 (Ergänzung `hsq1/1.4`), WF-06 (neu `hsq1/1.6`), WF-07 (Ergänzung `hsq1/1.2`) | 4 Fälle, rund 120 Items |
| P-S Beschaffung und Marketing (HSQ3, HSQ4) | WF-11 (neu `hsq3/3.4`), WF-15 (neu `hsq4/4.5`), WF-16a (Ergänzung `hsq4/4.4`) | 3 Fälle, rund 110 Items |
| P-T Führung und Funktionen (HSQ5, WBQ1, WBQ4) | WF-17, WF-18, WF-21 | 3 Fälle, rund 70 Items |

Empfehlung für das erste Paket: **P-Q**. Gründe: gleiches Fachgebiet (HSQ2), alle drei Teile haben fertige, geprüfte Vorlagen aus P-M (Finanzierung beurteilen, Prozesskosten), das Fachgebiet ist klein und die Begriffe liegen eng beieinander, und WF-08 (Finanzplanung) schließt eine im Review ausdrücklich genannte Lücke (FL-WF-14).

Vorgehen wie bei den bisherigen Paketen: Schreibauftrag, parallele Entwurfsagenten mit eigener Modellfirma NordWert Handels GmbH und eigenen Zahlen (keine Übernahme der Industrie-Rechenbeispiele), unabhängige Prüfung mit Abgleich gegen den Bestand und die Industrie-Entwürfe, Kopie-Test, Freigabe durch den Projektleiter, Einspielen.
