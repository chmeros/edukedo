# Entwurf: „Pennerliste“ im Handelsfachwirt-Kurs (FL-HF-63)

Stand 10.10.2026 · **zur fachlichen Entscheidung vorgelegt, nicht eingespielt** (Rahmenentscheidung R3). Betrifft nur die Themendatei `content/handelsfachwirt/wb1/5.1-category-management.md`.

## Befund

Der Kurs nennt die Liste der umsatz- oder ertragsschwächsten Artikel einer Warengruppe „Pennerliste“, das Gegenstück „Rennerliste“. Die Fachprüfung (FL-HF-63) bemerkte: „Pennerliste“ ist Handelsjargon mit abwertender Nebenbedeutung (im Alltag eine Beschimpfung von Menschen); zeitgemäß wäre „Ladenhüter-/Schwachläuferliste“, und die Kurzantwort sollte beide Begriffe akzeptieren.

Das Wort steht an fünf Stellen, alle in der Datei `wb1/5.1-category-management.md` (eine Suche über das ganze Repository findet keine weitere, auch nicht im Glossar oder in den Spielen; das Kreuzworträtsel-Wort RENNER bleibt wie es ist):

| Stelle | Heute |
|---|---|
| Theorie, Abschnitt Erfolgskontrolle | „Eine **Rennerliste** identifiziert die umsatz- oder ertragsstärksten Artikel einer Warengruppe, eine **Pennerliste** die schwächsten, die für eine Sortimentsbereinigung infrage kommen.“ |
| Karteikarte K-5.1-15 | Frage „Wozu dient eine Pennerliste?“ |
| Q-5.1-08 (Mehrfachauswahl) | richtige Option „Renner-/Pennerliste“ |
| Q-5.1-10 (Kurzantwort) | Frage „Wie wird die Liste der umsatz- oder ertragsschwächsten Artikel … üblicherweise bezeichnet?“, akzeptiert „Pennerliste; Penner-Liste“ |
| Q-5.1-10, Erklärung | „Gegenstück zur Rennerliste, die die stärksten Artikel identifiziert.“ |

Abwägung: Der Begriff ist im Handel und in der Lehrbuchsprache weit verbreitet (Renner-Penner-Analyse). Lernende, die ihn in der Praxis oder einer Prüfung antreffen, sollten ihn erkennen; er soll im Kurs aber nicht als der Fachbegriff stehen.

## Varianten

- **A. Belassen.** Keine Änderung.
- **B. Ersetzen, alter Begriff nur als Hinweis (Empfehlung).** Der Kurs führt „Schwachläuferliste“ als Begriff. „Pennerliste“ wird als umgangssprachlicher Name genannt, damit er wiedererkannt wird, und bleibt als akzeptierte Antwort der Kurzantwort.
- **C. Ersetzen ohne Hinweis.** Der Begriff verschwindet ganz; die Kurzantwort akzeptiert ihn aber weiter, damit niemand mit dem Praxisbegriff falsch liegt.

## Vorschlag zu Variante B

Rennerliste und Schwachläuferliste bilden ein Paar; „Ladenhüter“ wird nicht als Name der Liste verwendet, weil ein Ladenhüter einen Artikel meint, der sich gar nicht verkauft, die Liste aber auch schwach laufende Artikel enthält.

| Stelle | Vorschlag |
|---|---|
| Theorie | „Eine **Rennerliste** identifiziert die umsatz- oder ertragsstärksten Artikel einer Warengruppe, eine **Schwachläuferliste** (im Handel umgangssprachlich auch „Pennerliste“) die schwächsten, die für eine Sortimentsbereinigung infrage kommen.“ |
| K-5.1-15 | Frage „Wozu dient eine Schwachläuferliste?“; die Antwort bleibt. |
| Q-5.1-08 | Option „Renner-/Schwachläuferliste“ |
| Q-5.1-10 Frage | unverändert |
| Q-5.1-10 akzeptierte Antworten | „Schwachläuferliste; Schwachläufer-Liste; Ladenhüterliste; Ladenhüter-Liste; Pennerliste; Penner-Liste“ |
| Q-5.1-10 Erklärung | „Gegenstück zur Rennerliste, die die stärksten Artikel identifiziert. Umgangssprachlich heißt sie im Handel auch „Pennerliste“.“ |

Folgen:
- Item-IDs bleiben, der Lernfortschritt bleibt. Es ändert sich nur Text; der Import meldet geänderte Items.
- Die Kurzantwort wird wie bisher gegen die Liste der akzeptierten Antworten verglichen (Groß-/Kleinschreibung und Randleerzeichen zählen nicht); Schreibweisen mit und ohne Bindestrich stehen deshalb ausdrücklich in der Liste.
- Einspielen: `db:validate-content`, `db:import-content` in jeder Datenbank.

## Zu entscheiden

1. A, B oder C?
2. Bei B: Soll „Pennerliste“ in der Theorie als umgangssprachlicher Name stehen (Vorschlag), oder nur in der Erklärung der Kurzantwort?
3. Ist „Schwachläuferliste“ der richtige Fachbegriff, oder bevorzugen Sie „Ladenhüterliste“ als Hauptbegriff?
