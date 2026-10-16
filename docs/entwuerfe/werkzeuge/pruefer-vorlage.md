# Vorlage: Prüfauftrag für einen Teil eines Content-Pakets (schlank)

Als Agentenauftrag verwenden; Platzhalter `<…>` füllen. Die Mechanik (Kopie-Test, Parser) macht der Auftraggeber einmal gemeinsam für alle Teile: Prüfer lassen sie weg.

---

Du bist unabhängige:r Prüfer:in für Teil <X> des Pakets <Paket> (Repo: <Pfad>). Prüfe `<Entwurfsdateien>` (<Kurzbeschreibung>). Maßstab ist der Schreibauftrag `docs/entwuerfe/<paketordner>/auftrag.md`. Du kennst kein Ergebnis der Autor:in; glaube Kopfstück-Aussagen nichts, was du nicht selbst nachprüfst.

Prüfe:
1. **Rechnen:** jede Zahl, Musterlösung, Erklärung und „Akzeptierte Antworten“ mit einem Node-Skript im Scratchpad nachrechnen (alle Schreibweisen, Prozentpunkte-Regel, Rundung, Frage eindeutig?).
2. **Fachlich:** Definitionen richtig? Distraktoren fair, genau eine richtige Antwort, Sortieren genau 4 Elemente, Zuordnungen eindeutig, jede Frage ohne Kontext beantwortbar, Fall (20 Punkte, Raster, Folgefehler) und Fachgespräch stimmig? <teilspezifische Fragen>
3. **Bestand und Register:** Widersprüche zu `content/<kurs>/` (Begriffe und Zahlen; `docs/entwuerfe/werkzeuge/nordwert-register.md` benutzen), Wiederholung statt Verweis, Kurzverweise mit Titel und Fachgebiet. Zahlenabgleich mit `node docs/entwuerfe/werkzeuge/pruefe-paket.cjs zahlen <Paketordner> <Datei>`.
4. **Textnähe und Klone:** `node docs/entwuerfe/werkzeuge/pruefe-paket.cjs siebenwort <Datei>` (Verweis- und Konventionsformeln sind erwartbar, inhaltliche Läufe nicht) und Strukturklone zu <Vorlagen>.
5. **Hausregeln:** Du/Sie, Gendern, Zahlenformat, keine Paragrafen oder Gesetzesnamen, IDs lückenlos ab <…>, Quiztypen gemischt, richtige Antwort nicht die längste (Zeichenzahl), Szenarioanteil, Kurzantworten höchstens zwei Drittel.

Ändere keine Entwurfsdatei und nichts im Bestand, lege keine Zusatzdateien an. Schreibe die Befunde früh und fortlaufend in `docs/entwuerfe/<paketordner>/pruefung-<x>.md` (Schweregrad hoch/mittel/niedrig, Fundstelle mit ID, Fehler, konkreter Korrekturvorschlag) und gib sie am Ende zusammengefasst zurück, mit Zahl der nachgerechneten Werte.
