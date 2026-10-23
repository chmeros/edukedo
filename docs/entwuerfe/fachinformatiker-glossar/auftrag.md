# Auftrag P-AZ „Fachinformatiker: Glossar-Einträge zu den neuen rechtsnahen Inhalten (P-AY)“

Gemeinsamer Schreibauftrag für zwei Entwurfsagenten (Cluster 1 und 2). Ergebnisse nur in `docs/entwuerfe/fachinformatiker-glossar/`. Nichts einspielen, nichts im Bestand ändern, nichts committen. Arbeitsverzeichnis ist die Repo-Wurzel (lies kurz `CLAUDE.md`).

## Ziel

Zu den am 23.10.2026 eingespielten Themen und Ergänzungen (Paket P-AY) fehlen Glossar-Einträge. Schreibe sie als Entwurf (`Geprüft: nein`), abgeleitet aus der **eingespielten Theorie** (nicht aus dem Gedächtnis): Der Glossar-Eintrag darf nichts sagen, was die Theorie des angegebenen Abschnitts nicht trägt, und muss mit deren Einschränkungen, Hedges („nach dem Wortlaut“, „Auslegung“, „Praxis“) und dem Stand-Hinweis vereinbar sein. Rechtsnahe Inhalte: nicht förmlich rechtsgeprüft; die Definition bleibt Überblick-Niveau.

## Format (muss der Parser `parseGlossar` lesen können)

Jeder Eintrag ist ein Block, Vorbild `content/fachinformatiker-anwendungsentwicklung/fu6/glossar.md`:

```
#### Begriff
**Auch:** Alias1, Alias2          (nur wenn es echte Synonyme/Kurzformen gibt)
**Thema:** 6.6
**Abschnitt:** Genaue Überschrift (### ...) aus der Themendatei
**Definition:** Ein bis zwei Sätze, Fließtext, keine Aufzählung.
**Geprüft:** nein
```

Regeln:
- `Thema:` ist nur der Themencode (z. B. `6.6`, `9.1`, `8.3`), Zeichenfolge muss exakt zum `thema_code` der Zieldatei passen. `Abschnitt:` übernimm wörtlich aus einer `###`-Überschrift der Themendatei (prüfen!).
- Begriff und Aliase müssen **im gesamten Kurs eindeutig** sein (Groß-/Kleinschreibung egal): `docs/entwuerfe/fachinformatiker-glossar/bestand-begriffe.txt` listet die vorhandenen Begriffe je Kurs und Fachgebiet. Kein Begriff und kein Alias darf dort schon vorkommen (auch nicht als Alias eines anderen Eintrags) oder in deinem anderen Cluster doppelt vergeben werden. Gehört ein Begriff in mehrere Themen, nimm ihn **einmal** (am Ort der ersten und ausführlichsten Behandlung) und verweise in den anderen Entwürfen nicht darauf.
- Auswahl: Fachbegriffe, die eine Auszubildende zum Verstehen und für die Prüfung braucht und die die Theorie definiert oder nutzt (z. B. „wichtige Einrichtung“, „Frühwarnung“, „Software-Stückliste“, „Konformitätsbewertung“, „Hochrisiko-KI-System“, „Dateninhaber“, „Nutzungsrecht“). Keine Gesetzesnamen/Paragrafen als Begriff, keine bloßen Kürzel ohne Erklärung, keine Personennamen, keine Fallfirmen. Pro Thema grob 4 bis 10 Einträge; lieber weniger und gut als alles. Keine Begriffe, die der Bestand schon erklärt.
- Definition: 1 bis 2 Sätze (höchstens etwa 280 Zeichen), allgemeinverständlich, **keine Beträge, Fristen, Stichtage, Schwellenwerte, Strafen oder Paragrafennummern**; Gendern mit Doppelpunkt, keine Anrede (neutral, weder Du noch Sie); Zahlenformat wie im Bestand. Aussagen, die in der Theorie nur als „Auslegung“ oder „Praxis“ stehen, nicht als Regel formulieren.
- Aliase nur, wenn der Alias im Lerntext tatsächlich vorkommt.

## Ergebnisdateien (je Cluster), eine Datei je Zieldatei

Name `glossar-<ziel>.md`, Inhalt: nur die `####`-Blöcke (kein Frontmatter, keine Überschrift `## Glossar`), dazu am Anfang eine Kommentarzeile `<!-- Ziel: ... -->` und am Ende, getrennt durch `---`, eine kurze Liste „Bewusst nicht aufgenommen“ (Begriff, Grund). Zusätzlich eine Datei `bericht-<cluster>.md` mit Anzahl je Zieldatei, Auffälligkeiten (Widersprüche zwischen Theorie und Bestand-Glossar, unklare Begriffe).

| Ziel | Datei | Kurse | Themen |
|---|---|---|---|
| `fu6/glossar.md` | `glossar-fu6.md` | alle vier | 6.6 NIS2, KRITIS und Meldepflichten; 6.7 Cyber Resilience Act; 6.8 KI-Verordnung und KI-Einsatz im Projekt; 6.2 Datenschutz (nur der Abschnitt „Datenpanne, Auftragsverarbeitung, Beschäftigte“ der Ergänzung vom 23.10.2026) |
| `ae2/glossar.md` (neu) | `glossar-ae2.md` | nur Anwendungsentwicklung | 9.1 (CRA in der Entwicklung) |
| `dv4/glossar.md` (neu) | `glossar-dv4.md` | nur Digitale Vernetzung | 11.3 (OT-Recht: Maschinenverordnung, IEC 62443, Betriebssicherheit) |
| `si5/glossar.md` (neu) | `glossar-si5.md` | nur Systemintegration | 12.2 (Managed Services: Recht) |
| `fu7/glossar.md` | `glossar-fu7.md` | alle vier | 7.6 Verbraucherrecht und Kaufvertrag |
| `fu1/glossar.md` | `glossar-fu1.md` | alle vier | 1.2 (UWG und Werbung), 1.3 (IT-Verträge) |
| `fu2/glossar.md` | `glossar-fu2.md` | alle vier | 2.2 (Urheberrecht, Open-Source-Compliance, Creative Commons, KI-Code) |
| `ae1/glossar.md` (neu) | `glossar-ae1.md` | nur Anwendungsentwicklung | 8.3 (Barrierefreiheit: BFSG/BITV) |
| `dp2/glossar.md` (neu) | `glossar-dp2.md` | nur Daten- und Prozessanalyse | 9.2 (Data Act) |

Cluster 1 schreibt `fu6`, `ae2`, `dv4`, `si5`. Cluster 2 schreibt `fu7`, `fu1`, `fu2`, `ae1`, `dp2`. Wegen der kursweiten Eindeutigkeit: In den kursspezifischen Dateien (`ae2`, `dv4`, `si5`, `ae1`, `dp2`) nur Begriffe, die weder in einer `fu*`-Datei des Auftrags (fremder Cluster: Themenliste oben) noch im Bestand-Glossar vorkommen sollten; ist ein Begriff eigentlich für zwei Teile relevant (z. B. „Cyber Resilience Act“ für 6.7 und 9.1), gehört er in die `fu*`-Datei (6.7) und wird in `ae2` nicht noch einmal angelegt.

## Quellen (zu lesen, nicht zu glauben)

Lies in **einem** Kurs, den Dateien sind in den vier Kursen gleich (außer kursspezifischen): `content/fachinformatiker-anwendungsentwicklung/` für Cluster-1-Themen 6.x, 9.1, `content/fachinformatiker-digitale-vernetzung/dv4/11.3-…`, `content/fachinformatiker-systemintegration/si5/12.2-…`; Cluster 2: `fu7/7.6`, `fu1/1.2`, `fu1/1.3`, `fu2/2.2`, `ae1/8.3-…` (AE), `content/fachinformatiker-daten-prozessanalyse/dp2/9.2-…`. Dazu das jeweilige Bestand-Glossar und die Rechtsangaben-Blätter `docs/entwuerfe/fachinformatiker-neue-inhalte/rechtsangaben-<a..m>.md` (Teil a=6.6, b=6.7, c=9.1, d=11.3, e=12.2, f=6.8, g=6.2, h=9.2, i=7.6, j=1.3, k=2.2, l=1.2, m=8.3), um zu sehen, was gesichert ist und was „vermutet“ ist. Der Schreibstil richtet sich nach `docs/entwuerfe/hausregeln-schreibweise.md`.

## Prüfung vor Abgabe

Parser prüfen (Node/tsx): jeder Block muss `parseGlossar` aus `apps/api/src/db/content-parser.ts` passieren (Feld Definition vorhanden); Eindeutigkeitsprüfung gegen `bestand-begriffe.txt`; jede `Abschnitt:`-Zeile gibt es als `###`-Überschrift in der Themendatei; Definition ≤ 280 Zeichen. Schreibe früh und ergänze dann (Nutzungslimit möglich). Antworte am Ende kurz: Zahl der Einträge je Zieldatei, Auffälligkeiten.
