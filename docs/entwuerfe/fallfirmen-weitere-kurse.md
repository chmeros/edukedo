# Entwurf: Fallfirmen weiterer Kurse (Brevanta, Loreno, Ravelin, Solvitec, Vantera, NordWert)

Stand 11.10.2026 · **zur fachlichen Entscheidung vorgelegt, nicht eingespielt** (Rahmenentscheidung R3). Folgt auf `docs/entwuerfe/karten-ohne-kontext.md` und `…-teil-c.md`, wo das Verfahren für AEVO und Versicherungen entschieden und umgesetzt wurde (Glossar-Einträge für Fallfirma und Fallperson, dazu Umformulieren der Items, die ohne den Fallfakt nicht lösbar sind).

## Befund

Sechs weitere Kurse erzählen ein durchgängiges Fallunternehmen. Die Namen stehen in Karten und Quizfragen ohne Einführung, die die Lernansicht vor der Antwort zeigt.

| Kurs | Fallfirma (Kurzname) | Items mit Namen | von Items |
|---|---|---|---|
| Fachinformatiker (vier Kurse) | Brevanta IT-Systemhaus GmbH (Brevanta) | 57 / 52 / 67 / 53 | je rund 1.500 |
| Handelsfachwirt | Loreno Mode & Wohnen GmbH (Loreno) | 65 | 826 |
| Immobilienfachwirt | Ravelin Immobilien GmbH (Ravelin) | 124 | 757 |
| Industriefachwirt | Solvitec Elektrowerke GmbH (Solvitec) | 202 | 1.034 |
| Technischer Fachwirt | Vantera Präzisionstechnik GmbH (Vantera) | 170 | 1.225 |
| Wirtschaftsfachwirt | NordWert Handels GmbH (NordWert) | 85 | 1.024 |
| Büro-Fachwirt | Bemus | 4 | 416 |

Personen („Frau …“) kommen nur in den Fallaufgaben vor, nicht in Karten und Quizfragen; ein Personen-Eintrag ist hier also nicht nötig.

**Wie viele Items brauchen den Fallfakt?** Ich habe in Solvitec, Vantera, Ravelin und NordWert jede sechste Item mit Firmennamen gelesen (rund 100 Items) und für alle sieben Kurse nach Mustern gesucht (Name in Antwort oder Optionen, Fragen wie „Wie viele …“). Ergebnis: Die große Mehrheit sind Anwendungsfragen, in denen die Firma nur das Beispiel ist („Solvitec schafft eine neue Spritzgussmaschine an. Wie wird der Anschaffungswert behandelt?“); sie sind ohne Fallwissen lösbar. Etwa fünf bis acht von hundert Items verlangen dagegen einen Fakt aus der Erzählung. Hochgerechnet wären das einige Dutzend Items über alle Kurse; das ist eine Schätzung, keine Zählung. Bereits gefunden (sieben; Grenzfälle wie „Warum ist die Fertigungsfeinplanung bei Solvitec dezentral je Werk organisiert?“ habe ich nicht gezählt, weil die Antwort aus allgemeinem Wissen ableitbar ist):

| Kurs | Item | Frage (Kurzform) | Warum Fallfakt |
|---|---|---|---|
| Industriefachwirt | K-1.3-11 | Welche Rechtsform hat Solvitec und warum? | Antwort nennt die Gründerfamilie |
| Industriefachwirt | K-4.3-05, K-4.3-08 | fehlende Endkundenerfahrung / Question Mark im Geschäftsfeld Ladeinfrastruktur | Geschäftsfeld und Lage stehen nur in der Erzählung |
| Immobilienfachwirt | K-3.2-02 | Welches Leitungssystem nutzt Ravelin, und was ergänzt es? | Antwort ist ein Merkmal der Fallfirma |
| Immobilienfachwirt | K-3.3-16 | Für welche Rollen bei Ravelin ist spezialisierte Weiterqualifizierung relevant? | Rollen der Fallfirma |
| Immobilienfachwirt | K-5.1-02 | Welche Quellen nutzt die Bauträgersparte von Ravelin zur Grundstücksakquise? | Antwort stammt aus der Erzählung |
| Handelsfachwirt | Q-7.1-13 | Bezieht Loreno ihre Möbel „laut Theorie-Beispiel“ im Global oder Local Sourcing? | Beispielwahl der Erzählung |

## Vorschlag A: Glossar-Einträge für die Fallfirmen

Wie bei Kelvinar und Nordantis: je Kurs ein Eintrag in einer neuen `glossar.md` (bei den Fachinformatiker-Kursen in den vorhandenen Glossaren, dort identisch in allen vier Kursen). Die Markierung erscheint wieder nach der Antwort. Alle Texte geben nur wieder, was die Theorie sagt; Thema und Abschnitt trage ich bei der Umsetzung nach der Stelle der ersten Vorstellung ein. Alle auf „Geprüft: nein“.

| Kurs | Begriff (Alias) | Definition |
|---|---|---|
| Fachinformatiker | Brevanta IT-Systemhaus GmbH (Brevanta) | Fiktives Fallunternehmen dieser Kurse: ein IT-Systemhaus mit rund 220 Beschäftigten und vier Bereichen: Softwareentwicklung für Kunden, Systemintegration und Managed Services, Datenanalyse sowie Smart-Factory- und IoT-Vernetzung. |
| Handelsfachwirt | Loreno Mode & Wohnen GmbH (Loreno) | Fallunternehmen dieses Kurses: eine mittelständische Einzelhandelskette mit rund 40 Filialen und eigenem Online-Shop. |
| Immobilienfachwirt | Ravelin Immobilien GmbH (Ravelin) | Fallunternehmen dieses Kurses mit drei Geschäftsfeldern: Hausverwaltung, Maklerabteilung und Projektentwicklung mit Bauträgersparte. Es verwaltet Mietshäuser und rund 40 Wohnungseigentümergemeinschaften. |
| Industriefachwirt | Solvitec Elektrowerke GmbH (Solvitec) | Fallunternehmen dieses Kurses: ein Hersteller elektrotechnischer Komponenten für die industrielle Automatisierung mit mehreren Werken, Kunden vor allem aus der Automobilzuliefer- und Maschinenbaubranche und weltweitem Export. |
| Technischer Fachwirt | Vantera Präzisionstechnik GmbH (Vantera) | Fallunternehmen dieses Kurses: ein Hersteller von Präzisionsbauteilen für Automobilzulieferer- und Maschinenbaukunden (B2B), der überwiegend direkt vertreibt. |
| Wirtschaftsfachwirt | NordWert Handels GmbH (NordWert) | Fallunternehmen dieses Kurses: ein mittelständischer Großhändler für Büro- und Verpackungsmaterial mit rund 280 Beschäftigten an mehreren deutschen Standorten und Exportgeschäft in andere EU-Länder. |

Bemus im Büro-Kurs (4 Items) lasse ich weg. Bei Brevanta, Ravelin, Solvitec und Vantera stehen die Fakten verteilt in mehreren Themen; vor dem Einspielen gleiche ich jede Definition noch einmal gegen die Theorietexte ab.

## Vorschlag B: Fallfakt-Items

Wie bei AEVO und Versicherungen: jeden Kurs vollständig durchsehen und die Items, die ohne den Fallfakt nicht lösbar sind, einzeln vorlegen (Umformulieren oder Entfernen). Das sind insgesamt rund 880 Karten und Fragen mit Firmennamen, die ich Kurs für Kurs lese. Reihenfolge nach Zahl der Items mit Namen: Industriefachwirt (202), Technischer Fachwirt (170), Immobilienfachwirt (124), Wirtschaftsfachwirt (85), Handelsfachwirt (65), Fachinformatiker (Brevanta, ein Durchgang für die gemeinsamen Themen, danach die kursspezifischen).

## Folgen

- Vorschlag A: sechs Dateien `glossar.md` bzw. Einträge (bei den Fachinformatikern in vier Kursen derselbe Eintrag), Import `db:import-content`, bestehender Test `glossar-content.test.ts` prüft Format und Eindeutigkeit. Keine Änderung an Karten oder Fragen.
- Vorschlag B: je Kurs ein eigener Entwurf, bevor etwas geändert wird.

## Zu entscheiden

1. Vorschlag A (Glossar-Einträge für die sechs Fallfirmen): umsetzen?
2. Vorschlag B: die Kurse nacheinander vollständig durchsehen und je Kurs einen Entwurf vorlegen (Vorschlag), nur die sieben bereits gefundenen Items vorlegen oder nicht weiterverfolgen?
3. Die Definitionen oben: passen Wortlaut und Umfang, oder soll ich kürzer fassen?
