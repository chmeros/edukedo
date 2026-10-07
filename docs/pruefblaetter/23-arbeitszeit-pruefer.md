# Prüfblatt Werkzeug — Arbeitszeit-Prüfer (F-198)

Stand 07.10.2026 · erzeugt aus packages/shared/src/arbeitszeit.ts. **Noch in keinem Kurs sichtbar** (Rahmenentscheidung R4: Recht bleibt bis zur Fachprüfung gesperrt). Freigabe: Werkzeug arbeitszeit in die Werkzeugliste von Gesundheit/Soziales (Erwachsene, ArbZG) und AEVO (Jugendliche, JArbSchG) in kurs-angebot.ts eintragen, dann db:apply-kurs-metadata.

**Was das Werkzeug tut:** Lernende tragen eine Arbeitswoche ein (Beginn, Ende, Pause, bei Jugendlichen den Berufsschultag). Das Werkzeug meldet je Tag **Verstoß** oder **Hinweis** mit Paragraf und prüft die Ruhezeit zwischen zwei aufeinanderfolgenden Arbeitstagen. Es speichert nichts und bewertet nichts. Sichtbarer Hinweis im Werkzeug: Übung zu den Grundregeln, keine Rechtsberatung, Stand der Regelwerte Oktober 2026 (Entwurf, noch nicht gegen den Gesetzestext abgeglichen).

**Prüffragen für die Fachperson:** (1) Stimmen die Zahlen und Paragrafen der Tabellen unten mit der geltenden Fassung überein? (2) Sind die Grundregeln als Verstoß richtig eingestuft, vor allem die Grenze 8 bis 10 Stunden bei Erwachsenen (hier nur ein Hinweis) und das Zeitfenster 6 bis 20 Uhr bei Jugendlichen? (3) Ist der Berufsschultag richtig verkürzt wiedergegeben? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.

## Erwachsene (ArbZG)

| Regel | Wert im Werkzeug | Paragraf |
| --- | --- | --- |
| Arbeitszeit am Tag | Bis 8 Std.; darüber bis 10 Std. nur mit Ausgleich (Hinweis); mehr ist ein Verstoß | § 3 ArbZG |
| Ruhepausen | 30 Minuten bei mehr als 6 Std. Arbeitszeit (ohne Pausen); 45 Minuten bei mehr als 9 Std. Arbeitszeit (ohne Pausen) | § 4 ArbZG |
| Ruhezeit zwischen zwei Arbeitstagen | Mindestens 11 Std. | § 5 ArbZG |

## Jugendliche unter 18 (JArbSchG)

| Regel | Wert im Werkzeug | Paragraf |
| --- | --- | --- |
| Arbeitszeit am Tag | Bis 8 Std.; darüber ist ein Verstoß | § 8 JArbSchG |
| Ruhepausen | 30 Minuten bei mehr als 4 Std. 30 Min. Arbeitszeit (ohne Pausen); 60 Minuten bei mehr als 6 Std. Arbeitszeit (ohne Pausen) | § 11 JArbSchG |
| Ruhezeit zwischen zwei Arbeitstagen | Mindestens 12 Std. | § 13 JArbSchG |
| Zeitfenster | Beschäftigung grundsätzlich zwischen 06:00 und 20:00 Uhr (Branchenausnahmen nicht abgebildet) | § 14 JArbSchG |
| Woche | Höchstens 40 Std. an höchstens 5 Tagen | § 8 und § 15 JArbSchG |
| Berufsschultag | An einem Berufsschultag mit mehr als fünf Unterrichtsstunden (je mindestens 45 Minuten, einmal in der Woche) keine Beschäftigung im Betrieb | § 9 JArbSchG |

## Bewusst nicht abgebildet

Tarifverträge, Branchen- und Pflegeausnahmen (zum Beispiel Verkürzung der Ruhezeit nach § 5 Abs. 2 ArbZG), Rufbereitschaft, Nacht- und Schichtarbeit, Sonn- und Feiertage, Samstagsregeln und Branchenausnahmen für Jugendliche (§§ 14 ff. JArbSchG), Anrechnung der Berufsschulzeit als Arbeitszeit, Mindestlänge der einzelnen Pause und die Lage der Pause. Das Werkzeug weist darauf hin.
