# Prüfprotokoll: Paket P-J „Versicherungen und Finanzanlagen: Digitalisierung und KI, Personalbedarf und Arbeitswelt, Lernortkooperation und Ausbildungsvertrag“ (Erhebung vom 14.10.2026: VF-4, VF-5, VF-6, VF-7; Review FL-VF-07, FL-VF-12)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3, in Teil C mit R4-Anteil als Hinweis). Rechtsnah nur als Hinweis ohne Paragrafen, Gesetzes- und Regelwerksnamen und ohne Zahlenwerte: Datenschutz, KI-Regulierung, Mitbestimmung, Gleichbehandlung, Antidiskriminierung, Arbeitsschutz, Selbstständigkeit von Ausschließlichkeitsvertreter:innen (Teil A, B); Ausbildungsvertrag, Probezeit, Kündigung, Vergütung, Verkürzung und Verlängerung, Jugendarbeitsschutz (Teil C); nicht förmlich rechtsgeprüft.

## Umfang

Kurs Bachelor Professional in Versicherungen und Finanzanlagen (Nordantis Versicherung AG), Fachgebiet KP2 (im Bestand „Steuerung, Zusammenarbeit und Leadership“).

- **Neues Thema KP2 4.5** „Digitalisierung, Insurtech, KI und Ethik in der Versicherungswirtschaft“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 4 Rechen-Kurzantworten): Treiber und Insurtechs, Kanäle, Prozessautomatisierung (Dunkelverarbeitung, RPA), Daten und Analytik (Telematik, Betrugserkennung), KI, Ethik, Arbeitsprozesse; **F-KP2-05** und 3 Fachgesprächsfragen.
- **Neues Thema KP2 4.6** „Personalbedarf, Personalmarketing und Arbeitswelt“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 6 Rechen-Kurzantworten): Personalbedarfsplanung, Personalmarketing, Beschaffung und Auswahl, PE-Bedarf und Personalkennzahlen, Trends der Arbeitswelt, Change-Begleitung, psychische Belastung und Prävention; **F-KP2-06** und 3 Fachgesprächsfragen.
- **Ergänzung KP2 4.4** „Berufsausbildung“ (5 Abschnitte, 10 Karten K-4.4-21 bis -30, 12 Quizfragen Q-4.4-17 bis -28, 3 Rechen-Kurzantworten): Lernortkooperation, lernförderliche Bedingungen, Ausbildungsvertrag, Probezeit, Vergütung, Dauer, Jugendarbeitsschutz im Grundsatz; **F-KP2-07** und 2 Fachgesprächsfragen.
- Zusammen 34 Karten, 40 Quizfragen (13 Kurzantworten), 3 Fallaufgaben, 8 Fachgesprächsfragen; **87 neue Item-Schlüssel**.
- **Änderungen am Bestand durch das Einspielen:** nur der Einleitungssatz der Fallaufgaben KP2 (Themenbereiche 4.1–4.6) und die Einfügung der 4.4-Ergänzung in die bestehende Datei. Das `rechtsstand`-Datum von 4.4 bleibt unverändert.
- Dateien: `versicherung-4.5-…`, `-4.6-…`, `-4.4-ergaenzung-…`, `versicherung-faelle-a.md` bis `-c.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (18.901 → 18.988 Item-Schlüssel, +87); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten sowie alle drei Fälle mit 4 Teilaufgaben, 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand und den Themen anderer Kurse:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 1 hoch, 5 mittel, 13 niedrig; Teil B 3 mittel, 10 niedrig; Teil C 3 mittel, 12 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **Risikoausgleich im Kollektiv falsch dargestellt** („bei genau bekanntem Risiko bleibt nichts auszugleichen“) | Zufälligkeit des Schadeneintritts bleibt; individuelle Prämien mindern den Ausgleich zwischen niedrigen und hohen Risiken; nur sicher vorhersehbare Schäden sind nicht versicherbar |
| A | Stellvertretermerkmale (Alter ist im Bestand zulässiges Tarifmerkmal); Selbstselektion bei Telematik; Modellannahme zu gleichbleibender Bearbeitungszeit | Formulierungen präzisiert, Entmischung des herkömmlichen Tarifs benannt, Obergrenze der Einsparung (Thema 4.6) |
| A | Rechtshinweise ohne Kennzeichnung; Trefferquote kollidiert mit der Datenanalyse | einheitliche Kennzeichnung; Precision gegen Accuracy abgegrenzt |
| B | Solltage-Basis wechselt zwischen 220 und 250; Fall: Muss-Kriterium widerspricht den vorgeschlagenen Beschaffungswegen; Ausschließlichkeitsvertreter:innen und Führungsinstrumente aus 4.2 | einheitlich 250 mit Alternative; Wege konsistent zu den Muss-Kriterien; Hinweis auf vertragliche Wirkung der Instrumente |
| C | **Berufsschulfreistellung als reine Jugendschutzregel dargestellt; „Berufsschultage werden nicht mit Arbeit aufgefüllt“ zu absolut** | Freistellung gilt für alle Auszubildenden; Schutzregeln zur Beschäftigung an Berufsschultagen für Minderjährige; „Nordantis plant grundsätzlich ohne zusätzliche Arbeit“ |
| C | Uneinheitliches Stationsmodell (Betriebstage gegenüber Kalenderabschnitt); Herzberg gegenüber 4.2; Probezeit-Kündigung und Minderjährige | einheitliches Kalendermodell; Motivatoren und Hygienefaktoren wie in 4.2; Hinweis auf Form, Betriebsrat und Erziehungsberechtigte |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** alle rechtsnahen Hinweise (siehe oben), besonders Kündigung in der Probezeit, Fortzahlung der Vergütung bei Berufsschule, Verkürzung und Verlängerung, Zustimmung gesetzlicher Vertreter:innen, Stichworte zum Jugendarbeitsschutz einschließlich ärztlicher Untersuchung, Selbstständigkeit von Ausschließlichkeitsvertreter:innen, Beurteilung psychischer Belastungen.
- **Minderjährige:** Teil C behandelt den Jugendarbeitsschutz nur als Inhalt einer Fortbildung für Erwachsene (wie AEVO-Kurs); der Kurs richtet sich nicht an Minderjährige, die Sperre für Minderjährigen-Kurse (Mathe 9) ist nicht berührt.
- **Erfahrungswerte, nicht Bestand:** Rollen der Insurtechs und Kooperationsmodelle, Eignung für Dunkelverarbeitung, 8.000 € je Neubesetzung, Betreuungsschlüssel 60 Maklerbüros je VZÄ, 45 Minuten Bearbeitungszeit nach Automatisierung, 38-Stunden-Woche, Zwischengespräche in der Probezeit, Vier-Augen-Prinzip für Auszubildende.
- **Bestand, nicht Teil von P-J (nur gemeldet):** Einleitungssatz von `kp2/fallaufgaben.md` sagt „vier Teilaufgaben“, F-KP2-04 hat fünf; F-KP2-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; `kp2/4.4` und `kp2/fachgespraech.md` nennen BBiG und Paragrafen; K-4.4-20 nennt „drei Jahre“ als Regeldauer; Q-4.4-16 akzeptiert drei verschiedene Antworten; Frontmatter-Quelle in 4.1 bis 4.4 mit geradem Anführungszeichen; 4.2 behandelt Vertreter:innen wie weisungsgebundene Beschäftigte; Kfz-Sparte: 4.1 nennt sie, 3.1 und Glossar nicht; AdA `hf1/1.1` lässt die Schutzvorschriften pauschal mit der Volljährigkeit entfallen und `hf2/2.3` verlangt „schriftlich“ (Form des Vertrags prüfen).
- **Reihenfolge:** 4.5 und 4.6 verweisen aufeinander (Dunkelverarbeitung, Change-Begleitung); sie werden zusammen mit der Ergänzung 4.4 eingespielt.

## Rechtsstand

Keine Paragrafen, Gesetzes- oder Regelwerksnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte.
