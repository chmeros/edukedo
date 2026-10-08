# Usability-Test aus Sicht einer Lehrkraft / Dozent:in / Ausbilder:in

Stand: 07.10.2026 · Testumgebung: lokale Dev-Umgebung (Web `:5173`, API `:3001`, Postgres im Docker-Container), eingebauter Browser, eigener Tab mit eigenem Cookie-Bereich (`lehrkraft.localhost`), damit parallel laufende Tests nicht gestört wurden. Kurs für alle Tests: „Ausbildung der Ausbilder – AEVO“ (Pilot-nah, enthält die Unterrichts-Werkzeuge), für Projekthilfe zusätzlich „Fachinformatiker/in Anwendungsentwicklung“.

Grundlage: `CLAUDE.md`, Anforderungskatalog F-07, F-64, F-65, F-68, F-91–F-94, F-50, Abschnitt 7 (Datenschutz) und Abschnitt „Kein Lehrer:innen-/Klassenzugang zum MVP-Start“, Architekturplanung Abschnitt 13 (Einträge 23.09.2026 Kohorten, F-91 ff.), Code von `cohort.ts`, `company.ts`, `preview.ts`, `courses.ts`.

## Kurzfazit

Was eine Lehrkraft heute tun kann: eine Lehrgangsgruppe (Kohorte) anlegen, einen Beitritts-Code weitergeben und – ab fünf Mitgliedern – drei aggregierte Kennzahlen sehen (aktive Mitglieder, Ø Fortschritt, Ø Trefferquote je Handlungsbereich). Daneben gibt es für Ausbildende sehr brauchbare Planungswerkzeuge (Unterweisungs-Planer, Ausbildungsplan-Zeitplaner) und für Firmen ein Dashboard mit Einladungscodes, Platzzählung, Branding und aggregierter Statistik. Der Rest der App ist Einzel-Lernen; eine Klassen- oder Unterrichtssteuerung gibt es nicht (bewusst nachgelagert).

Die Funktionen laufen im Kern stabil: keine 5xx-Fehler, keine App-Fehler in der Konsole (nur erwartbare 401 für nicht angemeldete Besucher), Autorisierung dicht (Fremdzugriffe auf Kohorten- und Firmendaten liefern 404/401/403), mobile Ansicht 375 px ohne Seitenüberlauf, Dunkelmodus sauber, Tab-Leiste per Pfeiltasten bedienbar.

Drei Dinge fallen aber stark ins Gewicht:

1. **Die „aggregierten“ Dozenten-Kennzahlen lassen sich auf eine Einzelperson zuspitzen** (UXL-01). Die Mindestgröße 5 zählt Mitglieder, nicht Beitragende, und die Dozent:in kann sich die Mitglieder selbst erzeugen. Reproduziert: vier inaktive Konten plus eine aktive Person ergeben „20 % aktiv“ und „42 % Ø Fortschritt“ – exakt die Quote dieser einen Person. Das widerspricht F-64 und Abschnitt 7.
2. **Gemeldete Fehler und Notizen lassen sich praktisch nicht tippen** (UXL-02, bestätigt Befund WEB-02 aus `code-web-kern.md`): In jedem Modal mit Textfeld springt der Fokus nach jedem Zeichen weg. Damit ist die Inhalts-Meldefunktion (F-50) für Lehrkräfte wie für Lernende faktisch unbrauchbar. Ebenso schließt ein Mausklick in „Einstellungen“ das Fenster (UXL-03, WEB-01) – dort liegt das Einlösen von Unternehmenscodes.
3. **Datenschutz-Transparenz der Gruppenfunktionen fehlt** (UXL-04): Mitglieder erfahren nirgends, dass die Dozent:in ihre E-Mail-Adresse und das Beitrittsdatum sieht, dass sie automatisch mit allen Mitgliedern „befreundet“ werden (E-Mail-Adressen werden gegenseitig sichtbar) und können weder austreten noch sehen, in welcher Kohorte sie sind. Die Datenschutzerklärung erwähnt Kohorten nicht und behauptet für Freundeskreise „von dir bestätigte Freunde“.

Gesamtnote „Eignung für Lehrkräfte im aktuellen Zustand“: **4 (ausreichend)** – als kleine Kohorten-Übersicht und Planungs-Werkzeugkasten nutzbar, als Unterrichts- oder Klassenverwaltungs-Tool nicht gedacht und nicht geeignet.

## Testvorgehen und Konten

- Erfundene Wegwerf-Konten `lk-…@example.test` (Dozent:in, Admin, fünf Teilnehmende) mit einem selbst erzeugten Wegwerf-Passwort, ein Test-Unternehmen mit Setup-Link. Registrierung der Teilnehmenden sowie deren Quiz-Antworten per API (zeitsparend), alles Weitere in der Oberfläche.
- Gültige Rollenwerte laut Schema (`user_role_check`): `learner`, `admin`. Es gibt keine Dozenten-Rolle (bewusste Entscheidung vom 23.09.2026, Dozent:in = Besitzer einer Kohorte). Admin-Rolle nur für das eigene Testkonto per SQL gesetzt.
- Sitzplatz-Kontingent des Test-Unternehmens per SQL von 3 auf 5 erhöht, um die Statistik ab 5 Mitgliedern zu sehen (Kontingentgrenze bei 3 wurde vorher geprüft: korrekte Ablehnung).
- Druckdialog: `window.print()` wurde im Browser abgefangen (Report-Inhalt geprüft, kein echter Druck).
- Aufräumen: siehe Ende des Dokuments.

## 1. Kohorten / Lehrgangsgruppen und Dozenten-Ansicht (F-07, F-64, F-65)

**Getestet:** Kohorte anlegen (Tastatur: Enter im Formular), Code weitergeben, fünf Konten treten bei, Detailansicht mit 1 Mitglied, mit 5 Mitgliedern ohne Aktivität (Verdachtstest), mit 5 Mitgliedern mit Aktivität, Leerzustände, ungültiger Code, zu langer Name, Zugriff Fremder (stats/members/regenerate), Sicht der Teilnehmenden, Kurswechsel der Dozent:in, mobil, Dunkelmodus.

**Was gut ist**
- Anlegen ist einfach (ein Feld), der Code erscheint sofort; Selbstbedienung ohne Freischaltung.
- Leerzustand bei weniger als 5 Mitgliedern ist erklärt („bei weniger Mitgliedern wäre … faktisch eine personenbezogene Einzelauswertung“), die Handlungsbereichs-Kachel zeigt „noch zu wenig Beteiligung“, solange weniger als 5 Personen dort geantwortet haben. Das zweistufige Gate je Handlungsbereich funktioniert (verifiziert).
- Autorisierung korrekt: Teilnehmende und Unbeteiligte erhalten für `cohort.stats`, `members`, `regenerateJoinCode` ein 404, nicht angemeldete ein 401.
- Idempotenter Beitritt, Groß-/Kleinschreibung und Leerzeichen im Code werden toleriert.

**Befunde:** UXL-01, UXL-04, UXL-05, UXL-06, UXL-07, UXL-08, UXL-09, UXL-17, UXL-21, UXL-22.

**Prüfung auf „keine Einzelantworten“ (F-64) – Ergebnis:** Der Endpunkt liefert strukturell keine Einzelantworten, die direkten Wege (Mitgliederliste, fremde IDs) sind zu. Es gibt aber zwei Umwege:
- *Strohmann-Mitglieder* (UXL-01): Gate zählt `cohort_member`, nicht aktive Beitragende. „Aktive Mitglieder“ und „Ø Fortschritt“ haben kein Beitragenden-Gate, nur die Handlungsbereichs-Trefferquote.
- *Differenzbildung über den Zeitverlauf:* Mitglieder lassen sich nicht entfernen, aber jeder Neubeitritt ändert die Kennzahlen sofort; bei kleinen Gruppen (5–8) lässt sich der Beitrag einer neu hinzukommenden Person ablesen. Kein Schutz (Rundung, Verzögerung, Sperrfrist) vorhanden.
- Zusätzlich sieht die Dozent:in die E-Mail-Adresse jedes Mitglieds samt Beitrittsdatum; zusammen mit „aktive Mitglieder in 20-%-Schritten“ ist die Aktivität bei fünf Mitgliedern auf 20 Prozentpunkte genau.

**Note: 4** (Kernfunktion vorhanden und stabil, aber Datenschutzlücke bei den Kennzahlen, kaum Verwaltungsfunktionen, schlecht auffindbar).

## 2. Unternehmens-/Ausbilder-Funktion (F-91–F-94)

**Getestet:** Admin legt Unternehmens-Konto an (Setup-Link wird in der Dev-Umgebung im Admin-Panel angezeigt und in die API-Konsole geloggt), Setup-Seite, Passwort setzen (zu kurzes und gültiges), Login mit falschem/richtigem Passwort, Dashboard, Einladungscode erzeugen, Einlösen durch Teilnehmende (Kontingentgrenze), Teilnehmerliste, „Lizenz entziehen“, Branding (Logo-URL, Farbe, Text), Sicht der Lernenden auf das Banner, aggregierte Statistik unter/ab 5 Mitgliedern, mobil + Dunkelmodus, Einlösen eines Codes in den Einstellungen.

**Was gut ist**
- Ablauf ist kurz: Setup-Link → Passwort → Dashboard. Platzzähler „3 / 3“ gut lesbar, Kontingentgrenze greift (Meldung „Das Lizenzkontingent dieses Unternehmens ist ausgeschöpft“).
- Statistik: Hinweis unter 5 Mitgliedschaften verständlich; keine Einzelwerte, keine Handlungsbereichsaufschlüsselung (anders als bei Kohorten, daher dort das kleinere Risiko; allerdings dieselbe Schwäche bei der Mindestgröße, siehe UXL-01).
- Die Datenschutzerklärung benennt die Firmen-Zuordnung und die Aggregation.
- Mobil/dunkel ohne Überlauf nutzbar.

**Befunde:** UXL-03, UXL-04, UXL-08, UXL-10, UXL-11, UXL-18.

**Note: 3** (funktioniert, aber Branding unsauber, destruktive Aktionen ohne Rückfrage, Einlösen per Maus blockiert, Erklärtexte dünn).

## 3. Content-Sicht, Melden, Redaktion

**Getestet:** Vorschau `/vorschau` (anonym), Auffindbarkeit, Kursliste ohne Beitritt, Kurswechsel-Dialog, Suche („Lerninhalte durchsuchen“), Theorie-Leser, „Fehler melden“ (Ablauf, Persistenz in `content_report`, Admin-Liste), Admin-Redaktion (Öffnen aus der Meldung heraus; nur ansehen, nichts gespeichert).

**Antwort auf „Kursinhalte ansehen ohne beizutreten?“:** Nein, nicht gezielt. Die Kurskarten bieten nur „Beitreten“. `/vorschau` zeigt fünf Zufallsfragen aus allen veröffentlichten Kursen (kein Kurs wählbar), ist nur im Wartebildschirm für Minderjährige verlinkt und beantwortet nur Fragen. Nach dem Beitritt kann eine Lehrkraft Inhalte über Lernen (FSRS-Reihenfolge), Suche („Theorie lesen“, Karteikarten/Aufgaben-Vorspann) und Fortschritt (Themenliste) sehen; Lösungen erst nach dem Antworten oder Umdrehen. Eine Themenübersicht „alles lesen, mit Lösungen“ fehlt.

**Was gut ist:** Suche mit Treffern je Thema und Direktsprung ins Thema, Theorie-Leser als Seitenleiste mit Inhaltsverzeichnis, Meldung läuft bis in die Redaktion durch (Melder und Datum sichtbar, Direktsprung „In Redaktion bearbeiten“ öffnet die richtige Karte). Redaktions-Dialog übersichtlich (Thema, Frage, Rückseite, Schwierigkeit, Bloom-Stufe, Aktiv, Premium, Änderungsnotiz).

**Befunde:** UXL-02, UXL-12, UXL-13, UXL-20, UXL-24.

**Note: 5 für „Inhalte melden“** (durch UXL-02 de facto nicht nutzbar), **4 für Inhalts-Einsicht ohne Beitritt**, **2–3 für die Redaktion** (nur angeschaut, nicht belastet).

## 4. Unterrichtsnahe Werkzeuge

**Unterweisungs-Planer (AEVO, Instrumente):** Sehr gut. Gliederung Thema/Ziele/Vier Stufen/Medien, laufende Prüfpunkte („Fehlt …“, „Hinweis …“), Zeitbilanz („Verfügbar 15 Minuten. Geplant 14 Minuten.“), Beispielentwurf, Entwurfsblatt als Text zum Kopieren (bei verweigertem Clipboard erscheint ein markierter Text mit dem Hinweis „mit Strg+C kopieren“), mögliche Fachgesprächsfragen. Entwurf bleibt nur im Browser (klar gesagt).
**Ausbildungsplan-Zeitplaner:** Sehr gut. Abschnitte mit Wochen, Berufsschulblöcken, Zeitleiste, Probezeit-Hinweis, Gliederungstabelle, Textausgabe. Mobil scrollt die Tabelle horizontal im Container (UXL-14).
**Präsentationstrainer:** Für Prüflinge gedacht (Einleitung/Hauptteil/Schluss, Checkliste, Stoppuhr). Für den Unterricht nicht geeignet (UXL-15).
**Projekthilfe (nur Kurse mit Projekt):** Prüflings-Checkliste für Projektantrag/Dokumentation plus „Mein Projekt in neun Stichpunkten“ mit erwartbaren Prüferfragen. Sinnvoll für Ausbildende, die Prüflinge begleiten, aber keine Prüferperspektive/Bewertungsbogen.
**Fortschritts-Export (F-34):** Nur der eigene Fortschritt per Browser-Druck („Als PDF speichern“); Inhalt vollständig und sauber (Fachgebiete, Themen, Trefferquote, Zeitverlauf, Schwachstellen). Kein Export für Gruppen.

**Befunde:** UXL-14, UXL-15, UXL-16.

**Note: 2 (Planer), 3 (Präsentation/Projekt), 3 (Export).**

## 5. Querschnitt: Konsole, Netzwerk, mobil, Dunkelmodus, Tastatur, Texte

- **Konsole/Netzwerk:** Keine unerwarteten Fehler. Erwartbar: `UNAUTHORIZED` für nicht angemeldete Besucher (Hinweis UXL-23), Validierungsfehler 400 bei absichtlich falschen Eingaben. Keine 5xx. In API-Antworten steht im Dev-Modus der Stacktrace (UXL-19).
- **Mobil 375×812:** Kohorten-Bereich, Firmen-Dashboard, Ausbildungsplan ohne Seitenüberlauf. Kleine Mängel: lange E-Mail im Firmen-Header bricht auf drei Zeilen und klebt am Logo, Tile-Füllbalken laufen als Linie durch den Text (UXL-17), breite Planertabelle nur per Scroll im Container (UXL-14). Danach zurück auf Desktop gesetzt.
- **Dunkelmodus:** Kohorten, Mitglieder, Firmen-Dashboard, Planer unauffällig und lesbar. Ausnahme: frei wählbare Firmenfarbe (UXL-10).
- **Tastatur:** Pfeiltasten in der Tab-Leiste (Roving-Tabindex) funktionieren, Fokus-Falle und Escape im Modal funktionieren, Enter sendet das Kohorten-Formular; Skip-Link „Zum Hauptinhalt springen“ vorhanden. Aber: Fokusraub in Modals (UXL-02), Enter sendet das Meldeformular dadurch nicht, ein Mausklick im Einstellungsdialog schließt ihn (UXL-03).
- **Texte:** überwiegend verständlich, korrekt und freundlich. Ausnahmen: interne Anforderungs-IDs im Nutzertext (UXL-20), englische Roh-Fehler (UXL-08), „Mitglied(er)“.

## Befundtabelle

Schweregrade: Blocker = Funktion praktisch nicht nutzbar; Hoch = deutliche Fehl- oder Datenschutzwirkung; Mittel = spürbare Einschränkung; Niedrig = Politur; Hinweis = Beobachtung/Absicherung.

| ID | Schwere | Ort / Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|
| UXL-02 | **Blocker** | Lernen → „Fehler melden“ bzw. „Notiz“ (ebenso „Melden“ im Freundeskreis, „Konto löschen“). Textfeld anklicken oder per Tab erreichen, Zeichen eintippen. Bestätigt `code-web-kern.md` WEB-02. | Erwartung: Text lässt sich eingeben, Enter sendet. Beobachtung: Nach dem ersten Zeichen springt der Fokus auf das Dialog-Panel (`DIV.modal-panel`), jedes weitere Zeichen geht ins Leere (mit Einzeltasten reproduziert: „a“ von „abcde“, „ab“ nach zwei einzeln getippten Zeichen mit erneutem Klick). Enter im Meldeformular löst kein Absenden aus. Nur Einfügen/Programm-Eingabe in einem Rutsch geht. Ursache laut Code: Effekt in `Modal.tsx` hängt von `onClose` ab, das jeder Aufrufer pro Render neu erzeugt. | `onClose` in einem Ref halten, Fokus nur beim Öffnen setzen; Regressionstest „im Modal tippen“. Bis dahin ist F-50 (Meldefunktion) nicht nutzbar. |
| UXL-01 | **Hoch** | Kohorte anlegen, vier inaktive Konten plus ein aktives Konto treten bei; Gaming → Lehrgangsgruppen → Details. | Erwartung: keine auf Einzelpersonen rückführbaren Werte (F-64, Abschnitt 7). Beobachtung: „100 %/20 % Aktive Mitglieder“ und „42 % Ø Fortschritt“ entsprachen exakt der einen aktiven Person (5 von 12 bearbeiteten Aufgaben im Status „review“). Das Gate `MIN_COHORT_SIZE_FOR_STATS = 5` zählt `cohort_member`, nicht Beitragende; nur die Handlungsbereichs-Trefferquote prüft ≥ 5 Beitragende. Konten kann die Dozent:in selbst anlegen (Selbstbedienung, offene Registrierung); die Kohorten-Mitgliederzahl wird sofort sichtbar, Beitritte verschieben die Kennzahlen unmittelbar (Differenzbildung). | Gate für alle Kennzahlen auf „≥ 5 Mitglieder UND ≥ 5 aktive Beitragende im Zeitraum“; Werte grob runden (z. B. 10-%-Stufen); Kennzahlen erst mit Verzögerung/Sperrfrist nach Beitritt/Austritt aktualisieren; Dozent:innen-Rolle bei großen Gruppen zusätzlich verifizieren oder bis dahin Mindestgröße anheben. Auch für `company.stats` übernehmen. Test ergänzen (4 passive + 1 aktive). |
| UXL-03 | **Hoch** | Menü → Einstellungen, dann mit der Maus irgendwo im Dialog klicken (Feld, Checkbox). Bestätigt WEB-01. | Erwartung: Dialog bleibt offen, „Unternehmenscode einlösen“ ist erreichbar. Beobachtung: Der erste Mausklick in den Dialog schließt ihn (Menü-Hook wertet Portal-Inhalt als „außerhalb“). Nur per Tastatur (Fokus setzen, tippen, Enter) gelang das Einlösen eines Codes. | Modal außerhalb des Dropdown-Panels rendern oder Hook gegen `[role=dialog]` absichern. Betrifft auch „Konto löschen“. |
| UXL-04 | **Hoch** | Teilnehmerseite: Gaming → Lehrgangsgruppen; Dozent:innenseite: Mitgliederliste; Datenschutzerklärung; Anforderungskatalog Abschnitt 7 (Kohorten-Einsicht). | Erwartung (Katalog): Rechtsgrundlage/Einwilligung der Gruppenmitglieder, Transparenz, Austritt. Beobachtung: Die Dozent:in sieht E-Mail-Adresse und Beitrittsdatum jedes Mitglieds; Mitglieder werden automatisch mit allen anderen befreundet und sehen gegenseitig ihre E-Mail-Adressen (z. B. im Duell-Auswahlfeld). Das Beitrittsformular weist darauf nicht hin („Dozent:innen sehen ausschließlich aggregierte Kennzahlen“ – die Mitgliederliste mit E-Mails stimmt damit nicht überein). Mitglieder sehen nirgends, in welcher Kohorte sie sind, und können nicht austreten. Datenschutzerklärung erwähnt Kohorten/Dozent:in nicht und sagt zu Freundeskreisen „von dir bestätigten Freunde“ – bei Kohorten stimmt das nicht. Für Firmen nennt sie nur „die Zuordnung“, nicht die E-Mail-Liste beim Arbeitgeber. | Beitritts-Bestätigung mit klarem Text (wer was sieht); „Meine Kohorten“ für Mitglieder inkl. Austritt; Anzeigename statt E-Mail in Kohorten-/Freundeslisten; Datenschutzerklärung und Katalog-Abschnitt 7 angleichen; vor Firmen-/Kohorten-Beitritt Einwilligungstext anzeigen. |
| UXL-05 | Mittel | Kohorten-Router (`create`, `myCohorts`, `join`, `regenerateJoinCode`, `members`, `stats`). | Erwartung: übliche Verwaltung. Beobachtung: Kohorte kann nicht umbenannt, archiviert oder gelöscht werden; Mitglieder können nicht entfernt werden und nicht austreten; keine Co-Leitung/Übergabe. Wer das Konto löscht, löscht die Kohorte samt Mitgliedschaften kommentarlos (Cascade). Verlässt ein Mitglied den Kurs, bleibt es in der Kohorte und zählt im Nenner mit. | Mindestumfang ergänzen: umbenennen, archivieren/beenden, Mitglied entfernen, selbst austreten; Austritt aus dem Kurs bei der Kohortenzählung berücksichtigen. |
| UXL-06 | Mittel | Dozent:innen-Details und Lernenden-Fortschritt vergleichen. | Erwartung: gleiche Kennzahl, gleiche Bedeutung; verständliche Beschriftung. Beobachtung: Lernende sehen für dieselbe Person 1 %/4 %/1 %/0 % (gemeisterte Aufgaben von allen, z. B. 5 von 305), die Dozent:in „42 % Ø Fortschritt“ (Anteil „review“ unter den bearbeiteten Aufgaben). Keine Erläuterung, keine Fallzahl, keine Trefferquote-Basis (Anzahl Antworten), „Aktive Mitglieder (30 Tage)“ unveränderlich, keine Verläufe. „Fortschritt in % des behandelten Contents“ (F-64) kann nicht abgebildet werden, da die Lehrkraft nicht festlegen kann, was behandelt wurde. | Kennzahlen gleich definieren oder anders benennen („Anteil sicher beherrschter Aufgaben unter den bearbeiteten“); Tooltip/Erklärtext; Fallzahl anzeigen (n Antworten, ab n ≥ …); wählbarer Zeitraum; „behandelte Themen“ als Lehrkraft-Eingabe oder Kennzahl je Thema. |
| UXL-07 | Mittel | Startseite, Onboarding, Navigation. | Erwartung: Lehrkraft findet Gruppenfunktion. Beobachtung: Startseite und Willkommens-Hinweis nennen Lehrkräfte/Gruppen nicht; Kohorten stecken im Tab „Gaming“ unter Freundeskreis; „Kohorte beitreten“ steht vor „Meine Kohorten (als Dozent:in)“ und „Neue Kohorte anlegen“, die Überschriftenhierarchie ist flach (kleine Zwischenüberschriften). Jede eingeschriebene Person kann sich „Dozent:in“ nennen, ohne Prüfung. | Eigener Einstieg „Gruppe leiten“ (auch auf der Startseite), Dozent:innen-Bereich außerhalb „Gaming“, Hilfstext „Wie lade ich meine Gruppe ein?“. Prüfung/Verifizierung ist bewusst nicht vorgesehen, aber Konsequenz für UXL-01 beachten. |
| UXL-08 | Mittel | Kohorte mit Name > 100 Zeichen anlegen; Firmen-Setup mit Passwort < 8 Zeichen. | Erwartung: verständliche deutsche Meldung. Beobachtung: Rohes JSON der Validierung erscheint im Fehlerfeld (`[ { "code": "too_big", … "message": "String must contain at most 100 character(s)" … } ]`, auf Englisch). Feld hat kein `maxLength`, Firmen-Setup zeigt keine Passwort-Regel vorab. | Feld-Attribute (`maxLength`, `minLength`) setzen und zentral Zod-Fehler in deutsche Sätze übersetzen (`ErrorMessage`/tRPC-Fehlerformat). |
| UXL-10 | Mittel | Firmen-Dashboard → Branding; Sicht der Lernenden. | Erwartung (F-92): lesbares, ruhiges Banner. Beobachtung: Jede Farbe wird akzeptiert – Gelb (`#ffff00`) als Textfarbe auf hellem Banner ist kaum lesbar. `logoUrl` akzeptiert `http://` und `javascript:`-URLs (Zod-`url()`), das Logo wird von einem Drittserver in der App aller Mitglieder geladen (IP-Weitergabe). Farbfeld: gestreckter, flacher Balken, zeigt standardmäßig `#1c1c1c`, obwohl nichts gesetzt ist; eine gesetzte Farbe lässt sich nicht mehr entfernen; Farbe ohne Logo/Text bewirkt nichts. Branding ist nur ein Banner („eigene Einstiegsseite“ aus F-92 fehlt). | Kontrastprüfung bzw. Hintergrund setzen statt Textfarbe, nur `https`, ggf. Upload/Proxy; Farbe löschbar; Vorschau im Dashboard auch mit realem Hintergrund. |
| UXL-11 | Mittel | Firmen-Dashboard. | Erwartung: Schutz vor Fehlbedienung, klare Begriffe. Beobachtung: „Lizenz entziehen“ und „Widerrufen“ wirken sofort ohne Rückfrage (mobil direkt neben dem Scrollbereich). Einladungscode: kein Ablaufdatum-/Bezeichnungsfeld, obwohl API `expiresAt` kennt; kein Kopieren-Button. „Abrechnungsstatus: Ausstehend“ steht unerklärt da (Wirkung laut Code keine: Codes funktionieren auch bei „Ausstehend“ und „Abgelaufen“). Statistik ohne Erklärtexte. Setup-Seite zeigt nach erfolgreicher Einrichtung im Kopf „Anmelden / Kostenlos starten“. Login ohne „Passwort vergessen“, ohne Hinweis, wie man ein Konto bekommt. Die Firma sieht E-Mail-Adressen aller Teilnehmenden (laut F-91 gewollt). | Bestätigungsdialog (Modal); Ablaufdatum und Bezeichnung (Abteilung) im UI; Kopieren-Button; Begriff erklären oder ausblenden, bis Abrechnung greift; Kopf nach Session anpassen; Passwort-Reset. |
| UXL-12 | Mittel | Kursliste, `/vorschau`, Kurswechsel. | Erwartung: Lehrkraft sieht Kursinhalte, ohne zu lernen oder beizutreten. Beobachtung: nur „Beitreten“; Vorschau = fünf Zufallsfragen aus allen Kursen, nur über Minderjährigen-Wartescreen verlinkt, per IP auf 20 Abrufe/10 Min. begrenzt (in Schul-/Firmennetz hinter einer IP für eine Klasse zu wenig). Weiterbildungskurse erlauben nur eine aktive Belegung – zum Ansehen eines zweiten Kurses muss die Lehrkraft den ersten verlassen (Dialog „Kurs wechseln?“ nennt Folgen für Kohorten nicht; Kohorten sind nur im aktiven Kurs sichtbar). Lösungen/Erklärungen erst nach dem Beantworten. | Kursweise Inhaltsübersicht („Inhalte ansehen“) ohne Beitritt oder Lehrkraft-Lesemodus mit Lösungen; Rate-Limit für Vorschau pro IP großzügiger/zusätzlich pro Session; im Wechsel-Dialog Kohorten erwähnen. |
| UXL-13 | Niedrig | Fehler melden / Admin-Meldungen. | Erwartung: strukturierte Rückmeldung, Statusrückkanal. Beobachtung: nur einzeiliges Freitextfeld (max. 500 Zeichen), keine Kategorie (Fachfehler/Tippfehler/Veraltet), keine Meldungen in Suche/Theorie-Ansicht gefunden, keine Rückmeldung an die meldende Person über den Bearbeitungsstand; im Bearbeiten-Dialog der Redaktion ist der Meldetext nicht sichtbar (nur in der Liste davor). Meldungen bleiben nach Konto-Löschung mit anonymisiertem Melder und Freitext bestehen (FK `ON DELETE SET NULL`). | Mehrzeiliges Feld, Kategorie, Meldung im Redaktions-Dialog einblenden, Statusrückmeldung; Aufbewahrungsfrist für Freitext klären. |
| UXL-14 | Niedrig | Unterweisungs-/Ausbildungsplaner. | Erwartung: „zum Kopieren und Ausdrucken“ (Überschrift im Planer). Beobachtung: kein Druck-/PDF-Layout (nur Fortschrittsbericht hat `@media print`), ein Entwurf je Browser (localStorage), kein Export/Import, kein Gerätewechsel; „Verfügbare Zeit“ nicht einstellbar (aus Kurs übernommen, 15 Min.); mobil scrollt die Gliederungstabelle horizontal, erste Spalte wird abgeschnitten, Scroll-Hinweis kaum erkennbar. | Druckstylesheet/Button „Als PDF“; mehrere benannte Entwürfe, Datei-Export; Zeit einstellbar; Scroll-Schatten/Hinweis. |
| UXL-15 | Niedrig | Prüfung → Präsentation, Projekt. | Erwartung (Unterricht/Prüferrolle): Präsentationsmodus, Bewertungsbogen. Beobachtung: Präsentationstrainer ist Prüflings-Hilfe; Stoppuhr 19 px, nur aufwärts, Limit nur aus dem Kurs, kein Vollbild/Beamer-Modus, kein `aria-live`. Projekthilfe ist reine Prüflings-Checkliste ohne Druck. | Nur dokumentieren, falls nicht für Lehrkräfte gedacht; sonst Großanzeige/Countdown, Bewertungsbogen. |
| UXL-16 | Niedrig | Fortschritt → „Fortschritt als PDF exportieren“. | Erwartung: Ausbilder:in kann Lernstand der Gruppe nachweisen. Beobachtung: nur persönlicher Export (korrekt und lesbar), kein Gruppen-/Kohorten-Export (bewusst, siehe unten). | Aggregierter CSV/PDF-Export der Kohortenkennzahlen mit denselben Datenschutzgrenzen. |
| UXL-17 | Niedrig | Kohorten-Details. | Beobachtung: Kachel zeigt „0 Mitglied(er)“, während die Details schon 1 Mitglied zeigen (Zähler nicht aktualisiert); Überschrift „Ausbildungsvoraussetzur…“ abgeschnitten; Füllstands-Linie läuft als Strich durch den Prozentwert; kein Erfolgs-Hinweis nach „Kohorte anlegen“ (nur neue Kachel); Plural „Mitglied(er)“. | Zähler beim Aufklappen neu laden, Umbruch/„word-break“, Füllstand hinter dem Text, Bestätigungsmeldung, korrekter Plural. |
| UXL-09 | Niedrig | Kohorte beitreten / Codes. | Beobachtung: Das Code-Feld wird sofort nach dem Absenden geleert, auch bei Fehler („Dieser Beitritts-Code ist ungültig“) – ein Tippfehler zwingt zum Neutippen. Codes (Kohorte, Freundeskreis, Firma) haben dasselbe 10-Zeichen-Format an drei verschiedenen Eingabeorten; ein falsch eingegebener Code anderer Art meldet nur „ungültig“. Kein Kopieren-Button, kein Einladungslink. | Feld nur bei Erfolg leeren; Fehlermeldung mit Hinweis, wo welcher Code gehört; Link/QR zum Teilen. |
| UXL-18 | Niedrig | Barrierefreiheit Verwaltung. | Beobachtung: Zwischenüberschriften („Kohorte beitreten“, „Meine Kohorten“, „Mitglieder (5)“) sind `<span>`, keine Überschriften; Aufklapp-Schaltfläche ohne `aria-expanded`; Kennzahl-Kacheln ohne Live-Ankündigung. Positiv: Tab-Leiste mit Pfeiltasten, Fokus-Falle, Skip-Link, `role="alert"` bei Fehlern. | Zwischenüberschriften als `h3`, `aria-expanded` am Auslöser. |
| UXL-20 | Niedrig | Texte. | Beobachtung: Interne IDs im Nutzertext („… nur eine aktive Belegung gleichzeitig (F-102)“; Datenschutzerklärung verweist auf „Anforderungskatalog Abschnitt 7“). Hinweis „Grundlage für spätere Highscore-/Duell-Funktionen“ im Freundeskreis ist veraltet (Funktionen existieren). | Texte bereinigen. |
| UXL-24 | Niedrig | Startseite/Kursliste. | Beobachtung: Startseite wirbt mit „bis zur Klassenarbeit“, Kursliste zeigt Mathematik Klasse 9 („Schule“), obwohl Minderjährige derzeit gesperrt sind (`ALLOW_MINORS=false`, F-159). Für eine Fachlehrkraft irreführend. | Texte und Kursliste an den aktuellen Zugang koppeln (Hinweis „aktuell nur ab 18“). |
| UXL-19 | Hinweis | API-Antworten. | Beobachtung: Fehlerantworten enthalten Stacktraces mit lokalen Pfaden; Registrierungsantwort enthält `devVerifyEmailUrl`; Setup-Link wird im Admin-Panel angezeigt. Gewollt für Dev, aber prüfen, dass Produktionsprofil das abschaltet (`NODE_ENV`). | Absicherung/Test für Produktionsmodus. |
| UXL-21 | Hinweis | Kurswechsel von Dozent:innen. | Beobachtung: Kohorte und Verwaltung sind nur im aktiven Kurs sichtbar. Wechselt die Dozent:in im Weiterbildungsbereich den Kurs, ist die Kohorte unerreichbar (Mitglieder bleiben und zählen weiter), bis sie zurückwechselt. | Kohortenübersicht kursübergreifend oder Hinweis im Wechsel-Dialog. |
| UXL-22 | Hinweis | Aktivität durch Besuch. | Beobachtung: Allein das Öffnen der App startet einen Übungssatz (`progress.startExerciseSet`) – bei Lehrkräften, die nur schauen, verfälscht das Kennzahlen wie „Abschlussquote Übungssets“. | Satz erst bei erster Antwort anlegen. |
| UXL-23 | Hinweis | Konsole. | Auf der Startseite (nicht angemeldet) erzeugen `auth.me` & Co. mehrere `UNAUTHORIZED`-Konsolenfehler. Harmlos, aber Rauschen bei Fehlersuche. | Abfragen für Gäste unterdrücken. |

## Fehlende Lehrkraft-Funktionen (priorisiert)

Bewertung: „Lücke“ = auch im Soll-Umfang vorgesehen bzw. von den Anforderungen impliziert; „nachgelagert“ = im Plan als spätere Phase geführt.

1. **Datenschutz-Absicherung der Dozenten-Kennzahlen** (Lücke, UXL-01): Beitragenden-Gate, Rundung, Sperrfristen.
2. **Transparenz und Austritt für Kohorten-Mitglieder** (Lücke, UXL-04): Einwilligungs-/Hinweistext, „Meine Kohorten“, Austritt, Anzeigename statt E-Mail.
3. **Grundverwaltung einer Kohorte** (Lücke, UXL-05): umbenennen, archivieren, Mitglied entfernen, Co-Leitung/Übergabe.
4. **Verständliche Kennzahlen** (Lücke, UXL-06): gleiche Definition wie in der Lernenden-Ansicht, Fallzahlen, Zeitraum, Kennzahl je Thema, „behandelte Themen“ durch die Lehrkraft setzen.
5. **Inhalts-Lesemodus mit Lösungen und Themenübersicht** (Lücke, UXL-12), auch ohne Beitritt.
6. **Funktionierende Meldefunktion und Rückkanal** (Fehler, UXL-02/13).
7. **Aggregierter Export** der Kohortenkennzahlen (CSV/PDF) mit denselben Schutzgrenzen (nachgelagert, UXL-16).
8. **Pensum/Fristen je Gruppe** (z. B. gemeinsamer Zieltermin, Wochenziel für die Kohorte; heute nur persönliche Zielplanung) und **Aufgaben/Themen zuweisen** (nachgelagert, bewusst offen).
9. **Teilnehmenden-Einladung komfortabler:** Link/QR, optional E-Mail-Einladung (E-Mail-Anbieter noch nicht eingerichtet), Kopieren-Button, Ablaufdatum und Bezeichnung für Firmencodes (UXL-09/11).
10. **Druck- und Beamer-Tauglichkeit:** Druckstyle für Planer, Großanzeige/Countdown (UXL-14/15).
11. **Rückmeldung zum Bearbeitungsstand von Inhaltsmeldungen** (UXL-13).

## Bewusst nicht vorgesehen (laut Doku, daher keine Fehler)

- **Keine Einzelantworten/Einzelauswertungen** für Dozent:innen und Firmen (F-64, F-93, Abschnitt 7 Beschäftigtendatenschutz, § 26 BDSG). Auch keine Auswertung „wer hat was falsch“.
- **Keine Dozenten-Rolle als `user.role`**, sondern Besitz einer Kohorte; Selbstbedienung ohne Freischaltung (Entscheidung 23.09.2026). Gleiches Modell: Firmen-Konten werden vom Admin angelegt.
- **Kein Lehrer:innen-/Klassenzugang zum MVP-Start**, kein aktiver Schulvertrieb, keine Schul-Rolle, offen: schulzentrierter Einwilligungsweg, Schul-IT (Katalog v0.17 und „Kein Lehrer:innen-/Klassenzugang“).
- **Kein Live-Tutoring/Betreuung** über die reine Fortschrittseinsicht hinaus (Katalog, Abschnitt „Nicht-Ziele“).
- **Kein unternehmensexklusiver Content** und nur Präsentationsebene beim Branding (F-92), Sponsoring ohne Interaktion (F-94).
- **Keine nutzergenerierten Inhalte/Fragenerstellung durch Lehrkräfte** (Content wird zentral redaktionell erstellt; Redaktionswerkzeug nur für die Admin-Rolle).
- **Unterweisungs-/Ausbildungsplan nur lokal im Browser** – ausdrücklich so erklärt (Datensparsamkeit), also Entscheidung, nicht Fehler; lediglich die Folgen (UXL-14) sind zu bewerten.
- Abrechnung/Billing-Status ohne Wirkung auf die Funktion (Zahlungsintegration ist erst Iteration 6; Platzhalter-Charakter), daher nur Hinweis in UXL-11.

## Nicht getestet / Grenzen

- Echte E-Mail-Zustellung (Platzhalter-Logging), Zahlungs-/Abo-Flows, KI-Funktionen (Ollama/Payment-Service waren im Admin-Systemstatus „nicht erreichbar“), Eltern-Consent-Flow (Zugang für Minderjährige abgeschaltet), Mathematik-Kurs (separater Fachlehrer-Review `fachlehrer-mathematik-9.md`).
- Admin-Aktionen mit Inhaltsänderung (Veröffentlichen/Zurückziehen, Importieren, Speichern im Redaktions-Dialog) bewusst nicht ausgeführt; Redaktion nur angesehen.
- Mehrere Kohorten je Dozent:in, Kohorten in mehreren Kursen, größere Gruppen (> 5), Lasttest, Ratenbegrenzung der Vorschau in der Praxis (nur aus Code abgeleitet).
- Echter Druckdialog/PDF, Touch-Bedienung auf realem Gerät, Screenreader; Tastatur nur stichprobenartig; Duelle/Highscore im Gruppenbetrieb; Sponsoring-Anlage; Dunkelmodus der Planer nur für den Ausbildungsplan.
- Einzelne Befunde (UXL-11 „Abgelaufen“-Wirkung, UXL-12 Rate-Limit, UXL-22) stützen sich auf Code-Lektüre plus Stichprobe, nicht auf eine eigene Vollprüfung.
- Registrierung der Teilnehmenden und deren Quizantworten wurden per API erzeugt, nicht über die Oberfläche; das Sitzplatz-Kontingent wurde für den Statistiktest per SQL angehoben.

## Aufräumen der Testdaten

Gelöscht und per `SELECT` verifiziert: 7 Test-Konten (`lk-dozent`, `lk-admin`, `lk-t1` … `lk-t5`), 1 Test-Unternehmen (`lk-firma`) samt Einladungscode/Setup-Token/Mitgliedschaften, 1 Kohorte samt Mitgliedschaften und Freundschaften, Sitzungen, Wegwerf-Passwortdatei und Cookie-Dateien; zwei Inhaltsmeldungen („Usability-Test …“) wurden zusätzlich gezielt gelöscht, weil `content_report.reporter_user_id` beim Löschen des Kontos nur auf `NULL` gesetzt wird (Rückstand-Befund siehe UXL-13). Nach dem Löschen: 0 Testkonten, 0 Test-Firmen, 0 Test-Kohorten, 0 verwaiste Zeilen in `cohort_member`, `friend_circle_link`, `user_company_membership`, `company_invite_code`, `session`; Nutzerzahl wieder auf dem Ausgangswert (51).
