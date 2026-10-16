# Vorlage: Schreibauftrag für ein Content-Paket (schlank)

Kopieren nach `docs/entwuerfe/<paketordner>/auftrag.md`; Platzhalter `<…>` füllen. Die allgemeinen Teile (Hausregeln, Werkzeuge) bleiben unverändert. Ziel: etwa ein Drittel kürzer als frühere Aufträge, weniger Pflichtlektüre.

---

# Auftrag <Paket> „<Titel>“ (Erhebung vom 14.10.2026: <IDs>; Auswertung `docs/entwuerfe/<auswertung>.md`)

Gemeinsamer Schreibauftrag für die Entwurfsagenten. Alle Ergebnisse stehen in `docs/entwuerfe/<paketordner>/`. Nichts wird eingespielt oder committet, nichts im Bestand geändert, keine Zusatzdateien.

## Ziel und Teile

<Kurs, Fachgebiete, Modellfirma kurz; Hinweis auf `docs/entwuerfe/werkzeuge/nordwert-register.md` (Unternehmensangaben, Mengen, Begriffe)>. Nicht Teil des Pakets: <Rechtsgebiete nur als Hinweis „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“, keine Paragrafen, keine Gesetzes- oder Behördennamen; Wiederholungen aus Nachbarthemen>.

| Teil | Inhalt | Fall | Fachgespräch |
|---|---|---|---|
| A | <neues Thema oder Ergänzung zu Thema x.y> | <F-…> | <Abschnitt> |

## Inhalt je Teil

<Abschnitte je Teil mit Stichworten, Rechenanteil, Umfang: Karten, Quizfragen, Rechen-Kurzantworten, Fall, Fachgesprächsfragen>

## Lektüre (klein halten)

- **Vollständig lesen:** nur die Zielthemen, ihre Fallaufgaben und das Fachgespräch (<Dateien>) und eine Format-Vorlage (<Datei>).
- **Per Suche prüfen (Grep) statt lesen:** jeden Fachbegriff, den du definierst, im Kurs (`content/<kurs>/`); lies nur die Treffer.
- **Industrie-/Kursvorlagen:** <Dateien>; nur fachlicher Zuschnitt, nichts abschreiben, keine Strukturklone (gleiche Aufgabe in anderem Zahlengewand zählt als Befund).
- Prüfprotokolle früherer Pakete nur lesen, wenn ein Hinweis fehlt: typische Befunde sind wörtliche Nähe und Klone, Zahlen und Mengen gegen den Bestand, gleiche Zahlen in Nachbarteilen, mehrdeutige Kurzverweise, Antwortlisten, Prozentpunkte, richtige Antwort nicht die längste, Gendern.

## IDs

<K-x.y-NN ab …, Q-x.y-NN ab …, Fälle>. Höchste vergebene IDs im Bestand selbst prüfen (auch per `git log -S` auf entfernte IDs).

## Werkzeuge (nicht selbst bauen)

```bash
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test <Paketordner> --nur=<dein Teil, z. B. 3.4,faelle-a>
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs siebenwort <deine Datei>
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs zahlen <Paketordner> <deine Datei>
```

Rechne jede Zahl mit einem Node-Skript im Scratchpad nach (Präfix des Teils). Eigene Kopien von `content/` anlegen ist nicht nötig.

## Hausregeln (verbindlich)

- Karten und Quiz **duzen**, Fallaufgaben und Fachgespräch **siezen**, Theorie spricht niemanden an. Gendern mit Doppelpunkt, keine generischen Maskulina; für Geschäftspartner und Gremien neutrale Formen („Kundschaft“, „Lieferunternehmen“, „Arbeitnehmervertretung“). Tausenderpunkt und Dezimalkomma, Leerzeichen vor €, %, Einheiten; Vorzeichen ohne Leerzeichen.
- Kurzantworten: Vergleich exakt nach Kleinschreibung und ohne Leerzeichen; €, Tausenderpunkt, Dezimalkomma, % und Einheiten werden nicht umgewandelt. „Akzeptierte Antworten“ nennt **alle** Schreibweisen (mit/ohne Tausenderpunkt, mit/ohne „,00“ auch ohne Tausenderpunkt, €/Euro/EUR, Komma und Punkt, Prozent mit/ohne %, Einheiten, Minus „-“ und „−“, T€/TEUR). **Prozentpunkte-Fragen:** reine Zahl, %, Prozent, Prozentpunkt(e), %-Punkte, %-Pkt., mit/ohne „+“, ,00-Formen. Frage eindeutig: Einheit, Rundung, Zeitraum, Basis, Formel nennen. Lückentext: nur das markierte Wort.
- Quiztypen mischen (Multiple Choice, Mehrfachauswahl, Zuordnung, Sortieren mit genau 4 Elementen, Wahr/Falsch, Entweder-Oder, Was passt nicht dazu, Lückentext, Kurzantwort); mindestens ein Drittel Szenariofragen; höchstens zwei Drittel Kurzantworten; richtige Antwort nicht systematisch die längste oder erste (Zeichenzahl prüfen); Distraktoren fair.
- Fallaufgabe: 20 Punkte, vier bis fünf Teilaufgaben `**Teilaufgabe n (P Punkte, bloom: x):** …` einzeilig; Musterlösung `**Musterlösungshinweise:** Teilaufgabe 1 (Punkteraster: …): …` eine Zeile je Teilaufgabe, zuletzt „Folgefehler: …“. Fachgesprächsfragen mit 3 bis 5 Erwartungen und optional einer Rückfrage.
- Jede Frage ohne Kontext beantwortbar (kein „im Text“, „im Fall“). Alle Zahlen sind frei gewählte Beispielwerte und gekennzeichnet; Konventionen (Rundung, Basis, Formel) stehen in der Frage.
- Keine Rechtsvorschriften zitieren. Keine tagesaktuellen Daten als Tatsache. Kurzverweise auf andere Themen immer mit Titel und Fachgebiet („Thema 4.2 Personalführung und -entwicklung im Fachgebiet Unternehmensführung“).
- Eigenständigkeit: Sätze, Quizfragen und Rechenbeispiele anderer Kurse nicht übernehmen (Prüfer vergleichen mit `siebenwort`).

## Dateien und Abschlussmeldung

<Dateinamen je Teil>. Schreibe die Ergebnisdateien früh und ergänze sie dann (Nutzungslimit möglich). Abschlussmeldung kurz: Dateien, Anzahlen, nachgerechnete Zahlen (Skript genannt), Abweichungen zum Bestand, Erfahrungswerte, offene Fragen.
