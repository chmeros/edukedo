# Prüfprotokoll: Paket P-S „Wirtschaftsfachwirt: Bedarfsermittlung, Bestellmenge und Make-or-Buy, Produktlebenszyklus, Preiselastizität und Verkaufsgespräch, Markterschließung und interkulturelle Modelle“ (Erhebung vom 14.10.2026: WF-11, WF-15, WF-16a; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-rest-auswertung.md`)

Stand 17.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Außenwirtschafts-, Vertriebs- und Handelsvertretungsrecht, Lizenz und Franchising, Preisabsprachen und Preisangaben, Rabatt- und Werberecht, Geschenke und Einladungen, Lenkzeiten und Haftung bei eigenem Fuhrpark; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH), Fachgebiete HSQ3 „Logistik“ und HSQ4 „Marketing und Vertrieb“. Handelsspezifische Entwürfe mit eigenen Zahlen; die Industrie-Themen (HQ2 6.5, HQ3 7.4, 7.5) dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HSQ3 3.4** „Bedarfsermittlung, Bestellmenge und Make-or-Buy“ (7 Abschnitte, 14 Karten, 16 Quizfragen, davon 8 Rechen-Kurzantworten): Bedarfsarten und -verfahren, Brutto- und Nettobedarf (ein- und mehrperiodig), Stücklisten und Sets im Handel, Vorlaufzeit und Beschaffungstermine, optimale Bestellmenge nach Andler mit Rabattstaffel und Verpackungseinheit, Make-or-Buy mit kritischer Menge, Make-or-Buy bei Logistikleistungen; **F-HSQ3-04** und 3 Fachgesprächsfragen.
- **Teil B, neues Thema HSQ4 4.5** „Produktlebenszyklus, Preiselastizität und Verkaufsgespräch“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 7 Rechen-Kurzantworten): Produktlebenszyklus, Sortimentspolitik, Preiselastizität (mit Vorzeichen, Kreuzpreiselastizität), Preisbildung in der Praxis (Rabattstaffel, Preisschwellen), Verkaufsgespräch, Einwand, Preisverhandlung und Abschluss, Verkaufssteuerung; **F-HSQ4-04** und 3 Fachgesprächsfragen.
- **Teil C, Ergänzung HSQ4 4.4** „Markterschließung und interkulturelle Modelle“ (5 Abschnitte, K-4.4-19 bis -28, Q-4.4-13 bis -24, 4 Rechen-Kurzantworten): Marktauswahl und Markteintrittsformen mit Wechselkurs und Break-even, Kulturbegriff mit Kulturzwiebel und Stereotypen, Kulturdimensionen nach Hofstede (erfundene Beispielwerte), Hall und weitere Modelle, Anwendung im internationalen Vertrieb; **F-HSQ4-05** und 2 Fachgesprächsfragen.
- Zusammen 38 Karten, 44 Quizfragen (19 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 8 Fachgesprächsfragen; **95 neue Item-Schlüssel** (19.696 → 19.791, darunter die zwei neuen Theorien), dazu ändert sich die Theorie von 4.4.
- **Änderungen am Bestand durch das Einspielen:** die Einleitungssätze der Fallaufgaben HSQ3 („3.1–3.3“ → „3.1–3.4“) und HSQ4 („4.1–4.4“ → „4.1–4.5“), der `rechtsstand` der Sammeldateien und des Themas 4.4 (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab) und die Einfügung der Ergänzung in 4.4.
- Dateien: `wifa-3.4-…`, `wifa-4.5-…`, `wifa-4.4-ergaenzung-…`, `wifa-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`), `pruefung-a.md` bis `pruefung-c.md` (Einzelbefunde der Prüfer). Einspielreihenfolge A → B → C; die Teile verweisen aufeinander (kritische Menge in 3.4 und Indifferenzmenge in 4.4) und werden zusammen eingespielt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (pro Teil und gemeinsam, jeweils nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (671 Themendateien, 19.791 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen stehen in den richtigen Abschnitten. Die Schlüssel `K-3.4-xx` und `Q-3.4-xx` gibt es auch in `wbq3/3.4`; das ist keine Kollision, weil die Eindeutigkeit je Thema gilt (Fachgebiet plus Themencode).
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet; 7-Wort-Abgleich der Autoren gegen den gesamten Content und die Entwürfe.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, anderen Kursen und Entwürfen:** Nachgerechnet wurden 119 Werte (Teil A, dazu 55 nach der Überarbeitung), 123 (B, dazu 12) und 76 (C); **kein Rechenfehler**. Befunde: Teil A 5 mittel, 11 niedrig; Teil B 1 hoch, 5 mittel, 8 niedrig; Teil C 6 mittel, 14 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft. Alle Agenten dieses Pakets liefen auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Q-3.4-07 und -08 waren Strukturklone von Q-6.5-09 und -11 (Industriefachwirt); Q-3.4-09 teilte Jahresbedarf und Lagerkostensatz | neue Reihenfolge-Aufgabe, andere Dauern (Antwort KW 37), Lagerkostensatz 12 % und 54 € Bestellkosten |
| A | Kontrollsatz „Summe der Nettobedarfe = Gesamtrechnung“ gilt nur bei Endbestand gleich Sicherheitsbestand | Einschränkung in Theorie und Karte, Gegenfall genannt |
| A | Lagerkosten gegenüber `hsq3/3.2` (Raumkosten) nicht abgegrenzt; „Aktionsbanderole“ und „Banderole“ nicht als derselbe Artikel erkennbar | alle vier Kostenarten genannt und Abgrenzung für die Bestellmenge erklärt; im Fall überall „Banderole“ mit Hinweis |
| A/B | Gleiche Zahlen in Teil A, Teil B und im Bestand (19,60 €, 100.800 €, 12.000, 6.300 €) | Teil A ändert (Rabattstufen 19,70/19,40 €, Gesamtkosten 101.500 €, Zustellung 6.580 €), Teil B behält; weitere Zahlen in B (18.000, 3.600) geändert |
| B | **Mindestmenge 283 Stück der Staffel liegt unter der Staffelgrenze 300** und die Musterlösung deutete das falsch | Aufgabe fragt jetzt nach nötiger Mehrmenge (+50 Stück, +20 %) und Schwelle; Musterlösung, Raster und Folgefehler angepasst |
| B | Lebenszyklus-Beispiel und Tabelle zu nah an Industriefachwirt `hq3/7.5` | neues Beispiel mit sieben Jahren, anderer Phasenfolge und zeilenweiser Tabelle; Absätze neu formuliert |
| B | Basis von „zwölf Prozent günstiger“ nicht genannt; Umsatzanteil 33,3 % statt 33,2 % | Listenpreis 28,00 € ergänzt; Anteil korrigiert mit Rundungshinweis |
| C | Verweis auf ein „Eisbergmodell der Kommunikation“ in `hsq5/5.1` lief ins Leere; Zuordnung Q-4.4-19 widersprach der Theorie | Verweis gestrichen (nur „Eisbergbild der Kultur“); Beobachtungen eindeutig Kollektivismus bzw. langfristige Orientierung |
| C | Einordnung Handelsvertretung und Vertriebspartnerunternehmen (direkter oder indirekter Export) fehlte; Theorie zu nah an Industriefachwirt 7.4 | Einordnungssatz mit Hinweis auf `hsq4/4.2`; Kulturabschnitte neu aufgebaut (Tabellen, neue Beispiele) |
| C | Fall: Wechselkurs der Indifferenzmenge fehlte; Differenz ohne Betrag; Stereotyp gegenüber Vorurteil | Kurs 1 € = 4,00 KW genannt; „Betrag der Abweichung“; beide Begriffe anerkannt |
| alle | Prozentpunkte in „Akzeptierte Antworten“ | Paketregel aus P-R angewendet |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Handelsvertretung, Lizenz und Franchising, Preisabsprachen und -angaben, Rabatt- und Werberecht, Geschenke und Einladungen im Ausland, Auslandsentsendung, Lenkzeiten und Haftung beim eigenen Fuhrpark.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Lagerkostensätze 8 bis 16 %, Bestellkosten je Bestellung, Kostenansätze für Abfüllanlage, Display-Aufbau und Lkw, Wiederbeschaffungs- und Durchlaufzeiten, Staffelrabatte, Glättungsfaktoren; Lebenszyklus-Phasenabgrenzung, Elastizitätswerte, Staffelgrenzen, Abschluss- und Angebotsquoten; Kriterien und Gewichte der Länderbewertung, Wechselkurse, erfundene Länder und Hofstede-Werte, Indexskala. Alle als Beispielwerte gekennzeichnet; Hofstedes Herkunft sowie Trompenaars, Lewis und GLOBE nur im Überblick, vor der Freigabe fachlich gegenzulesen.
- **Bestand, nicht Teil von P-S (nur gemeldet):**
  - `hsq3/3.2` zählt Raumkosten zu den Lagerkosten; Teil A grenzt den bestandsabhängigen Lagerkostensatz für die Bestellmenge ausdrücklich ab.
  - `hsq4/4.3` Q-4.3-02 nennt eine „Regionalleitung Nord/Süd“, die nicht zu den Standorten Hamburg, Bremen und Leipzig passt.
  - `hsq4/4.4` und F-HSQ4-02 enthalten die Zuschreibung „sachlich-deutsch“ und „von Land zu Land“; bei der nächsten Bestandspflege neutral fassen (Teil C gibt den Satz neutral wieder).
  - `hsq4/4.2` definiert direkten und indirekten Vertrieb anders als der Außenhandel in 4.4 (Teil C weist darauf hin).
  - `wbq1/1.5` nennt im Text 5.000 Kartons Kopierpapier, in einer Quizfrage 2.000 Kartons zu 25 €; „Nachfrage“ steht in `wbq1/1.1`, nicht in `wbq1/1.5`.
  - F-HSQ3-01 bis -03 und F-HSQ4-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; Glossare HSQ3 und HSQ4 ohne die neuen Begriffe (Nettobedarf, Dispositionsstufe, Preiselastizität, Kulturzwiebel u. a.); „Eisbergmodell“ nur als falsche Option in Q-5.1-01.
  - `hsq2/2.3` definiert den Sicherheitsabstand nur verbal (Teil C gibt ihn in Paketen und Prozent an).
- **Innerhalb des Pakets:** „Kassel“ aus `hsq2/2.5` (geplanter Lagerstandort) wird in allen Teilen vermieden; die Beispiele nutzen Hamburg, Bremen und Leipzig. Teil C arbeitet mit erfundenen Ländern; „Einkaufsgremium (Buying Center)“ steht in Teil B in einem Satz und wird nicht abgefragt.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Keine tagesaktuellen Daten und keine Länder- oder Kulturzuschreibungen als Tatsache. Alle Zahlen, Firmen-, Personen- und Ländernamen sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
