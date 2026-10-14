# Entwurf Fachinformatiker-Querschnitt, Teil D: Ergänzung zu Thema 4.2 „Sortier- und Suchverfahren mit Ablauftabellen“

Stand 14.10.2026, **Entwurf (R3), nicht eingespielt.** Teil D des Auftrags P-G (Erhebung G-AE-02). Einzufügen in alle vier Kurse, jeweils identisch, in `content/fachinformatiker-anwendungsentwicklung/fu4/4.2-algorithmen-kontrollstrukturen-datenstrukturen.md`, `content/fachinformatiker-daten-prozessanalyse/fu4/…`, `content/fachinformatiker-digitale-vernetzung/fu4/…` und `content/fachinformatiker-systemintegration/fu4/…`: die Theorie-Ergänzung am Ende von „## Theorie“, hinter dem Abschnitt „Einfache Such- und Sortierverfahren“ (vor „## Karteikarten“); die Karteikarten hinter K-4.2-19; die Quizfragen hinter Q-4.2-16. Frontmatter und `rechtsstand` bleiben unverändert (keine rechtlichen Passagen). Die vorhandenen Abschnitte (lineare und binäre Suche mit Programmbeispiel, Bubblesort mit Programmbeispiel, kurze Beschreibung von Selectionsort und Insertionsort) werden nicht wiederholt, sondern vorausgesetzt und vertieft. **Zählung von Vergleichen und Vertauschungen exakt nach den Festlegungen in `packages/shared/src/algorithmen.ts`** (Algorithmen-Visualisierer und Rechen-Sprint „Algorithmen“); alle Tabellen sind mit den Funktionen `lauf`, `zustandNachDurchlauf` und `maxVergleicheBinaer` nachgerechnet. Die Theorie nennt keine Werkzeuge oder Spiele. Alle Zahlenlisten sind frei gewählte Beispielwerte. Karten und Quiz duzen, die Theorie spricht niemanden an.

---

## Theorie-Ergänzung

### Ablauftabellen und Zählregeln

Um ein Sortier- oder Suchverfahren von Hand nachzuvollziehen, wird der Zustand nach jedem Schritt in einer **Ablauftabelle** (auch Trace-Tabelle) festgehalten. Sie ist eine Form der Ablaufverfolgung (Trace): Statt aller Variablen werden nur die Größen notiert, die das Verfahren beschreiben. Für Sortierverfahren hat sich dieser Aufbau bewährt:

| Spalte | Inhalt |
|---|---|
| Durchlauf | Nummer des Durchgangs der äußeren Schleife, gezählt ab 1; Zeile 0 ist die Ausgangslage |
| Liste nach dem Durchlauf | Zustand der ganzen Liste am Ende dieses Durchlaufs |
| Vergleiche | Anzahl der Vergleiche zweier Listenelemente in diesem Durchlauf |
| Vertauschungen | Anzahl der Platztausche zweier Listenelemente in diesem Durchlauf |

Unter der Tabelle stehen die Summen. Für Suchverfahren lauten die Spalten anders (siehe „Lineare und binäre Suche in der Ablauftabelle“). Die Indizes der Liste zählen wie in Python ab 0.

Wie oft verglichen und vertauscht wird, hängt davon ab, wie ein Verfahren genau programmiert ist. Deshalb gelten in diesem Kurs feste **Zählregeln**:

- Ein **Vergleich** ist jede Prüfung, welches von zwei Listenelementen größer bzw. kleiner ist; bei den Suchverfahren jeder Vergleich eines Listenelements mit dem gesuchten Wert. Vergleiche von Schleifenzählern oder Indizes (etwa `j > 0`) zählen nicht.
- Bei der **binären Suche** zählt jeder Schleifendurchlauf als **ein** Vergleich mit dem mittleren Element, auch wenn das Programm dafür nacheinander `==` und `<` prüft (Dreiwegevergleich: gleich, kleiner oder größer).
- Eine **Vertauschung** ist ein Platztausch zweier Listenelemente.
- **Bubblesort** wie im Programmbeispiel oben: Bei n Elementen gibt es n − 1 Durchläufe; im k-ten Durchlauf werden die benachbarten Paare von vorn bis zum bereits sortierten Ende verglichen, das sind n − k Vergleiche. Es gibt **keinen vorzeitigen Abbruch**: Auch eine schon sortierte Liste wird vollständig durchlaufen. Zusammen sind es immer n · (n − 1) ÷ 2 Vergleiche. Im Programmbeispiel zählt die Variable `durchlauf` ab 0; Durchlauf k der Ablauftabelle entspricht `durchlauf = k - 1`.
- **Selectionsort:** n − 1 Durchläufe; im k-ten Durchlauf wird jedes weitere Element des unsortierten Rests einmal mit dem bisherigen Minimum verglichen (n − k Vergleiche, zusammen ebenfalls n · (n − 1) ÷ 2). Getauscht wird nur, wenn das Minimum **nicht schon** an der ersten Stelle des Rests steht; je Durchlauf gibt es also höchstens eine Vertauschung.
- **Insertionsort:** n − 1 Durchläufe; im k-ten Durchlauf wird das Element an Index k in den sortierten Teil davor eingefügt. Es rückt **durch Vertauschen mit dem linken Nachbarn** nach vorn, solange dieser größer ist. Jeder Blick auf den linken Nachbarn ist ein Vergleich, auch der letzte, der das Weiterrücken beendet. Ist das Element an Index 0 angekommen, gibt es keinen linken Nachbarn mehr und damit keinen weiteren Vergleich.

Die Ablauftabelle zählt je Durchlauf; die Summe der Spalten ergibt die Gesamtzahl der Vergleiche und Vertauschungen.

### Bubblesort in der Ablauftabelle

Beispielliste: `[7, 3, 9, 2, 6, 4]`, also n = 6 Elemente, 5 Durchläufe und 6 · 5 ÷ 2 = 15 Vergleiche. Im ersten Durchlauf wandert die 9 Schritt für Schritt nach hinten:

| Vergleich | Paar (Index) | Entscheidung | Liste danach |
|---|---|---|---|
| 1 | 7 und 3 (0 und 1) | 7 > 3, vertauschen | [3, 7, 9, 2, 6, 4] |
| 2 | 7 und 9 (1 und 2) | Reihenfolge stimmt | [3, 7, 9, 2, 6, 4] |
| 3 | 9 und 2 (2 und 3) | 9 > 2, vertauschen | [3, 7, 2, 9, 6, 4] |
| 4 | 9 und 6 (3 und 4) | 9 > 6, vertauschen | [3, 7, 2, 6, 9, 4] |
| 5 | 9 und 4 (4 und 5) | 9 > 4, vertauschen | [3, 7, 2, 6, 4, 9] |

Die vollständige Ablauftabelle:

| Durchlauf | Liste nach dem Durchlauf | Vergleiche | Vertauschungen |
|---|---|---|---|
| 0 (Ausgangslage) | [7, 3, 9, 2, 6, 4] | – | – |
| 1 | [3, 7, 2, 6, 4, 9] | 5 | 4 |
| 2 | [3, 2, 6, 4, 7, 9] | 4 | 3 |
| 3 | [2, 3, 4, 6, 7, 9] | 3 | 2 |
| 4 | [2, 3, 4, 6, 7, 9] | 2 | 0 |
| 5 | [2, 3, 4, 6, 7, 9] | 1 | 0 |
| **Summe** | | **15** | **9** |

Nach dem k-ten Durchlauf stehen die k größten Elemente endgültig am Ende: nach Durchlauf 1 die 9, nach Durchlauf 2 zusätzlich die 7. Ab Durchlauf 3 ist die Liste bereits sortiert; die Durchläufe 4 und 5 laufen trotzdem mit 2 und 1 Vergleichen, aber ohne Vertauschung. Eine verbreitete **Variante mit vorzeitigem Abbruch** beendet das Sortieren, sobald ein Durchlauf ohne Vertauschung bleibt; sie bräuchte hier nach Durchlauf 4 nur 14 Vergleiche. Welche Variante gilt, legt die Aufgabe fest; ohne Angabe gilt in diesem Kurs das Programmbeispiel ohne Abbruch.

Die Zahl der Vertauschungen lässt sich gegenprüfen: Jede Vertauschung zweier benachbarter Elemente, die falsch herum stehen, beseitigt genau eine **Fehlstellung**, also ein Paar, bei dem ein größeres Element vor einem kleineren steht. In `[7, 3, 9, 2, 6, 4]` steht die 7 vor 3, 2, 6 und 4 (4 Fehlstellungen), die 3 vor der 2 (1), die 9 vor 2, 6 und 4 (3) und die 6 vor der 4 (1), zusammen 9.

### Selectionsort und Insertionsort in der Ablauftabelle

**Selectionsort** an derselben Liste: Im ersten Durchlauf ist die 7 an Index 0 das bisherige Minimum. Die 3 ist kleiner und wird neues Minimum, die 9 nicht, die 2 ist kleiner und wird neues Minimum, 6 und 4 sind nicht kleiner. Nach 5 Vergleichen wird die 2 (Index 3) mit der 7 (Index 0) getauscht.

| Durchlauf | Liste nach dem Durchlauf | Vergleiche | Vertauschungen | Bemerkung |
|---|---|---|---|---|
| 0 (Ausgangslage) | [7, 3, 9, 2, 6, 4] | – | – | |
| 1 | [2, 3, 9, 7, 6, 4] | 5 | 1 | Minimum 2 mit 7 getauscht |
| 2 | [2, 3, 9, 7, 6, 4] | 4 | 0 | Minimum 3 steht schon an Index 1 |
| 3 | [2, 3, 4, 7, 6, 9] | 3 | 1 | Minimum 4 mit 9 getauscht |
| 4 | [2, 3, 4, 6, 7, 9] | 2 | 1 | Minimum 6 mit 7 getauscht |
| 5 | [2, 3, 4, 6, 7, 9] | 1 | 0 | Minimum 7 steht schon an Index 4 |
| **Summe** | | **15** | **3** | |

```python
def selectionsort(liste):
    n = len(liste)
    for i in range(n - 1):
        minimum = i
        for j in range(i + 1, n):
            if liste[j] < liste[minimum]:    # ein Vergleich
                minimum = j
        if minimum != i:                      # nur tauschen, wenn nötig
            liste[i], liste[minimum] = liste[minimum], liste[i]
    return liste

print(selectionsort([7, 3, 9, 2, 6, 4]))   # Ausgabe: [2, 3, 4, 6, 7, 9]
```

**Insertionsort** an derselben Liste: Vor dem ersten Durchlauf gilt `[7]` als sortierter Teil. In jedem Durchlauf wird das nächste Element eingefügt.

| Durchlauf | Liste nach dem Durchlauf | Vergleiche | Vertauschungen | Bemerkung |
|---|---|---|---|---|
| 0 (Ausgangslage) | [7, 3, 9, 2, 6, 4] | – | – | sortierter Teil: [7] |
| 1 | [3, 7, 9, 2, 6, 4] | 1 | 1 | 3 einfügen: 7 > 3, tauschen; Index 0 erreicht |
| 2 | [3, 7, 9, 2, 6, 4] | 1 | 0 | 9 einfügen: 7 > 9? nein |
| 3 | [2, 3, 7, 9, 6, 4] | 3 | 3 | 2 einfügen: an 9, 7 und 3 vorbei bis Index 0 |
| 4 | [2, 3, 6, 7, 9, 4] | 3 | 2 | 6 einfügen: an 9 und 7 vorbei; 3 > 6? nein |
| 5 | [2, 3, 4, 6, 7, 9] | 4 | 3 | 4 einfügen: an 9, 7 und 6 vorbei; 3 > 4? nein |
| **Summe** | | **12** | **9** | |

```python
def insertionsort_gezaehlt(liste):
    vergleiche = 0
    vertauschungen = 0
    for i in range(1, len(liste)):
        j = i
        while j > 0:                          # links von Index 0 kein Vergleich
            vergleiche = vergleiche + 1
            if liste[j - 1] > liste[j]:
                liste[j - 1], liste[j] = liste[j], liste[j - 1]
                vertauschungen = vertauschungen + 1
                j = j - 1
            else:
                break                         # Einfügestelle gefunden
    return liste, vergleiche, vertauschungen

print(insertionsort_gezaehlt([7, 3, 9, 2, 6, 4]))   # Ausgabe: ([2, 3, 4, 6, 7, 9], 12, 9)
```

Der Vergleich der drei Verfahren an derselben Liste zeigt ihre Eigenheiten:

| Verfahren | Vergleiche | Vertauschungen | Begründung |
|---|---|---|---|
| Bubblesort | 15 | 9 | Vergleiche immer n · (n − 1) ÷ 2, Vertauschungen = Fehlstellungen |
| Selectionsort | 15 | 3 | Vergleiche immer n · (n − 1) ÷ 2, höchstens eine Vertauschung je Durchlauf |
| Insertionsort | 12 | 9 | Vergleiche hängen von der Vorsortierung ab, Vertauschungen = Fehlstellungen |

Ist die Liste **bereits sortiert**, braucht Insertionsort nur n − 1 Vergleiche (bei sechs Zahlen 5) und keine Vertauschung, Bubblesort und Selectionsort vergleichen dagegen weiterhin 15-mal. Ist sie **absteigend sortiert**, braucht Insertionsort ebenfalls n · (n − 1) ÷ 2 Vergleiche und ebenso viele Vertauschungen (bei sechs Zahlen je 15).

### Lineare und binäre Suche in der Ablauftabelle

Die **lineare Suche** prüft die Elemente von vorn. Steht der gesuchte Wert an Index i, braucht sie i + 1 Vergleiche; kommt er nicht vor, vergleicht sie alle n Elemente. Im Programmbeispiel oben findet sie die 30 in `[12, 7, 30, 5]` an Index 2 nach 3 Vergleichen und stellt nach 4 Vergleichen fest, dass 99 fehlt. Im **günstigsten Fall** (Best Case) steht der Wert vorn und es genügt 1 Vergleich, im **ungünstigsten Fall** (Worst Case) steht er hinten oder fehlt, dann sind es n Vergleiche. Ist der Wert vorhanden, braucht die Suche im Mittel etwa halb so viele Vergleiche, wie die Liste Elemente hat. Kommt ein Wert mehrfach vor, liefert sie den ersten Treffer.

Die **binäre Suche** wird mit den Spalten Vergleich, links, rechts, mitte, Wert an der Mitte und Entscheidung notiert. Die Mitte ist wie im Programmbeispiel `mitte = (links + rechts) // 2`, also **abgerundet**. Ist der Wert an der Mitte kleiner als der gesuchte, wird `links = mitte + 1`; ist er größer, wird `rechts = mitte - 1`. Die Suche endet mit einem Treffer oder, wenn `links > rechts` wird, mit dem Ergebnis −1. Im Programmbeispiel oben (Suche nach 34 in `[3, 8, 15, 21, 34, 55, 89]`) werden die Mitten 3, 5 und 4 geprüft, also 3 Vergleiche.

Beispiel mit der sortierten Liste `[4, 9, 13, 18, 22, 27, 31, 36, 40, 45]` (10 Elemente, Index 0 bis 9), gesucht wird **45**:

| Vergleich | links | rechts | mitte | Wert an der Mitte | Entscheidung |
|---|---|---|---|---|---|
| 1 | 0 | 9 | 4 | 22 | 22 < 45, links wird 5 |
| 2 | 5 | 9 | 7 | 36 | 36 < 45, links wird 8 |
| 3 | 8 | 9 | 8 | 40 | 40 < 45, links wird 9 |
| 4 | 9 | 9 | 9 | 45 | gefunden, Ergebnis Index 9 |

Gesucht wird **10** (nicht enthalten):

| Vergleich | links | rechts | mitte | Wert an der Mitte | Entscheidung |
|---|---|---|---|---|---|
| 1 | 0 | 9 | 4 | 22 | 22 > 10, rechts wird 3 |
| 2 | 0 | 3 | 1 | 9 | 9 < 10, links wird 2 |
| 3 | 2 | 3 | 2 | 13 | 13 > 10, rechts wird 1 |
| – | 2 | 1 | – | – | links > rechts: Suchbereich leer, Ergebnis −1 |

Die lineare Suche bräuchte in beiden Fällen 10 Vergleiche. Bei einer **geraden Anzahl** von Elementen gibt es kein einzelnes mittleres Element; die abgerundete Mitte wählt das linke der beiden mittleren (hier im ersten Schritt die 22 an Index 4, nicht die 27 an Index 5). Aufrunden wäre ebenfalls ein korrektes Verfahren, führt aber über andere Mitten und kann eine andere Zahl von Vergleichen ergeben; in Aufgaben gilt die angegebene Regel, ohne Angabe die abgerundete Mitte des Programmbeispiels.

Weil jeder Vergleich den Suchbereich etwa halbiert, braucht die binäre Suche bei n sortierten Einträgen **höchstens ⌊log₂ n⌋ + 1 Vergleiche**: den abgerundeten Zweierlogarithmus plus 1. Praktisch sucht man die größte Zweierpotenz, die nicht größer als n ist: Bei n = 10 ist das 2³ = 8, also höchstens 3 + 1 = 4 Vergleiche, wie bei der Suche nach 45 oben.

| Einträge n | lineare Suche, höchstens | binäre Suche, höchstens | Rechnung |
|---|---|---|---|
| 10 | 10 | 4 | 2³ = 8 ≤ 10 < 16 |
| 1.000 | 1.000 | 10 | 2⁹ = 512 ≤ 1.000 < 1.024 |
| 100.000 | 100.000 | 17 | 2¹⁶ = 65.536 ≤ 100.000 < 131.072 |
| 1.000.000 | 1.000.000 | 20 | 2¹⁹ = 524.288 ≤ 1.000.000 < 1.048.576 |

Verdoppelt sich die Zahl der Einträge, braucht die binäre Suche höchstens einen Vergleich mehr (2.000.000 Einträge: 21), die lineare Suche im ungünstigsten Fall doppelt so viele.

### Aufwand, Stabilität und typische Fehler

**Aufwand als Wachstumsgröße:** Für die Praxis zählt weniger die genaue Zahl der Vergleiche als die Frage, wie sie mit der Datenmenge wächst. Bubblesort und Selectionsort vergleichen immer n · (n − 1) ÷ 2-mal, Insertionsort im ungünstigsten Fall ebenso oft. Der Aufwand wächst damit etwa mit **n²** (quadratisch): Die doppelte Datenmenge kostet etwa viermal so viele Vergleiche, die zehnfache etwa hundertmal so viele.

| Elemente n | Vergleiche n · (n − 1) ÷ 2 |
|---|---|
| 10 | 45 |
| 100 | 4.950 |
| 1.000 | 499.500 |
| 10.000 | 49.995.000 |

Die lineare Suche wächst **linear** mit n, die binäre Suche nur mit **log n** (logarithmisch). Deshalb sortiert man große Datenbestände mit der optimierten Sortierfunktion der Sprache (in Python `sorted(...)` bzw. `liste.sort()`), und zwar einmal, und sucht danach binär oder über einen Schlüssel (Dictionary). Die einfachen Verfahren sind für kleine Listen völlig ausreichend; Insertionsort ist außerdem schnell, wenn eine Liste schon fast sortiert ist.

**Stabilität:** Ein Sortierverfahren ist **stabil**, wenn gleich große Elemente ihre ursprüngliche Reihenfolge behalten. Das zählt, wenn Datensätze nach einem Merkmal sortiert werden und eine frühere Ordnung erhalten bleiben soll, etwa Tickets nach Priorität, die vorher nach Eingangszeit geordnet waren. Bubblesort und Insertionsort in der Form dieses Kurses sind stabil, weil sie nur bei „größer“ tauschen. Selectionsort ist es nicht: Werden die Tickets T-1 (Priorität 2), T-2 (1), T-3 (2) und T-4 (1) nach Priorität sortiert, ergibt Selectionsort T-2, T-4, T-3, T-1; T-1 ist durch einen Tausch über größere Entfernung hinter T-3 geraten. Die Sortierfunktion `sorted()` in Python sortiert stabil.

**Typische Fehler** beim Nachvollziehen und Programmieren:

- **Binäre Suche auf einer unsortierten Liste:** In `[5, 2, 9, 1]` liefert die Suche nach 1 nach zwei Vergleichen (Mitte Index 1 mit dem Wert 2, dann Index 0 mit dem Wert 5) das Ergebnis −1, obwohl die 1 an Index 3 steht. Die lineare Suche fände sie nach 4 Vergleichen.
- **Mitte mit `/` statt `//`:** `(0 + 9) / 2` ergibt `4.5`; Python bricht mit einem `TypeError` ab, weil Listenindizes ganze Zahlen sein müssen.
- **Mitte aus der ganzen Liste statt aus dem Suchbereich** (`mitte = len(liste) // 2`): Steht der gesuchte Wert nicht genau an dieser Stelle, wird der Suchbereich nicht mehr kleiner, und es entsteht eine Endlosschleife (bei Listen ab drei Elementen immer, bei zwei Elementen schon bei der Suche nach einem Wert, der kleiner als das Element an Index 1 ist).
- **`links = mitte` statt `links = mitte + 1`:** Bleiben zwei Elemente übrig, kann die Mitte immer wieder auf dasselbe Element fallen; bei der Suche nach 45 in der Liste oben bleibt die Suche bei links 8, rechts 9 und mitte 8 hängen.
- **„Gerade Länge“ ist kein Fehler:** Auch bei gerader Anzahl funktioniert die abgerundete Mitte; falsch wird es erst, wenn die vereinbarte Regel (abrunden) gewechselt wird und die Zahl der Vergleiche dann nicht zur Aufgabe passt.
- **Zählfehler beim Sortieren:** beim Selectionsort eine Vertauschung zählen, obwohl das Minimum schon an seinem Platz steht; beim Insertionsort den letzten Vergleich vergessen, der das Weiterrücken beendet, oder einen Vergleich links von Index 0 zählen; beim Bubblesort ohne entsprechende Vorgabe vorzeitig abbrechen; beim Insertionsort den ersten Durchlauf mit dem Element an Index 0 statt an Index 1 beginnen.
- **Off-by-one im Bubblesort:** Läuft die innere Schleife mit `range(n - durchlauf)` statt `range(n - 1 - durchlauf)`, greift `liste[i + 1]` im ersten Durchlauf hinter das Listenende, und Python meldet einen `IndexError`.

---

## Karteikarten-Ergänzung

#### K-4.2-20
**Frage:** Was ist eine Ablauftabelle bei einem Sortierverfahren, und welche Spalten hat sie?
**Antwort:** Eine Tabelle zur Ablaufverfolgung von Hand: Durchlauf (Zeile 0 = Ausgangslage), Liste nach dem Durchlauf, Vergleiche und Vertauschungen je Durchlauf; darunter die Summen.
`tags: sortieren, ablauftabelle` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-4.2-21
**Frage:** Was zählt beim Sortieren als Vergleich und was als Vertauschung?
**Antwort:** Vergleich: jede Prüfung, welches von zwei Listenelementen größer bzw. kleiner ist (Vergleiche von Indizes oder Schleifenzählern zählen nicht). Vertauschung: ein Platztausch zweier Listenelemente.
`tags: sortieren, ablauftabelle` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-4.2-22
**Frage:** Wie viele Vergleiche braucht Bubblesort ohne vorzeitigen Abbruch bei n Elementen, und wie viele davon im k-ten Durchlauf?
**Antwort:** Insgesamt immer n · (n − 1) ÷ 2, unabhängig von der Reihenfolge; im k-ten Durchlauf n − k. Bei sechs Elementen: 5 + 4 + 3 + 2 + 1 = 15.
`tags: sortieren, bubblesort, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.2-23
**Frage:** Was steht nach dem ersten Durchlauf von Bubblesort sicher fest, und was nach dem ersten Durchlauf von Selectionsort?
**Antwort:** Bubblesort: Das größte Element steht am Ende der Liste. Selectionsort: Das kleinste Element steht an Index 0.
`tags: sortieren, bubblesort, selectionsort` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-24
**Frage:** Wann vertauscht Selectionsort in einem Durchlauf nicht, und wie viele Vertauschungen sind höchstens möglich?
**Antwort:** Wenn das Minimum des unsortierten Rests schon an dessen erster Stelle steht. Höchstens n − 1 Vertauschungen (eine je Durchlauf); die Vergleiche sind immer n · (n − 1) ÷ 2.
`tags: sortieren, selectionsort` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-25
**Frage:** Wie zählst du die Vergleiche beim Insertionsort, wenn das Element durch Vertauschen mit dem linken Nachbarn nach vorn rückt?
**Antwort:** Ein Vergleich je Blick auf den linken Nachbarn, auch der letzte, der das Weiterrücken beendet; ist Index 0 erreicht, folgt kein Vergleich mehr. Bei einer bereits sortierten Liste sind es nur n − 1 Vergleiche und keine Vertauschung.
`tags: sortieren, insertionsort` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-4.2-26
**Frage:** Wie kannst du die Zahl der Vertauschungen von Bubblesort und Insertionsort ohne Ablauftabelle bestimmen?
**Antwort:** Fehlstellungen zählen, also Paare, bei denen ein größeres Element vor einem kleineren steht. Jede Vertauschung benachbarter, falsch herum stehender Elemente beseitigt genau eine; `[7, 3, 9, 2, 6, 4]` hat 9 Fehlstellungen und braucht bei beiden Verfahren 9 Vertauschungen.
`tags: sortieren, bubblesort, insertionsort` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-4.2-27
**Frage:** Wie viele Vergleiche braucht die lineare Suche, wenn der Wert an Index i steht, und wie viele, wenn er fehlt?
**Antwort:** Bei einem Treffer an Index i sind es i + 1 Vergleiche, fehlt der Wert, alle n. Günstigster Fall: 1 Vergleich (Wert vorn); ungünstigster Fall: n Vergleiche (Wert hinten oder nicht vorhanden).
`tags: suchen, lineare-suche` · `schwierigkeit: leicht` · `bloom: anwenden`

#### K-4.2-28
**Frage:** Wie bestimmst du bei der binären Suche die Mitte und den neuen Suchbereich?
**Antwort:** mitte = (links + rechts) // 2, also abgerundet. Wert an der Mitte kleiner als der gesuchte: links = mitte + 1; größer: rechts = mitte − 1; gleich: gefunden. Wird links > rechts, fehlt der Wert (Ergebnis −1).
`tags: suchen, binaere-suche` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.2-29
**Frage:** Wie viele Vergleiche braucht die binäre Suche bei n sortierten Einträgen höchstens?
**Antwort:** ⌊log₂ n⌋ + 1, also den abgerundeten Zweierlogarithmus plus 1: bei 10 Einträgen 4, bei 1.000 Einträgen 10, bei 1.000.000 Einträgen 20. Doppelt so viele Einträge erfordern höchstens einen Vergleich mehr.
`tags: suchen, binaere-suche, rechnen` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-4.2-30
**Frage:** Wie wächst der Aufwand der einfachen Sortierverfahren und der binären Suche mit der Datenmenge?
**Antwort:** Einfache Sortierverfahren wachsen quadratisch (etwa n², Insertionsort im ungünstigsten Fall): doppelte Datenmenge, etwa vierfache Vergleichszahl; zehnfache Datenmenge, etwa hundertfache (1.000 Elemente: 499.500, 10.000: 49.995.000). Die binäre Suche wächst logarithmisch (log n), die lineare Suche linear.
`tags: aufwand, sortieren, suchen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-4.2-31
**Frage:** Was bedeutet „stabil“ bei einem Sortierverfahren, und welches der drei einfachen Verfahren ist nicht stabil?
**Antwort:** Gleich große Elemente behalten ihre ursprüngliche Reihenfolge. Bubblesort und Insertionsort sind stabil, weil sie nur bei „größer“ tauschen; Selectionsort nicht, weil ein Tausch über größere Entfernung ein gleich großes Element überspringen kann.
`tags: sortieren, stabilitaet` · `schwierigkeit: mittel` · `bloom: verstehen`

---

## Quiz-Ergänzung

#### Q-4.2-17 · Kurzantwort
**Frage:** Im Smart-Factory-Bereich der Brevanta sortiert ein Prüfprogramm die acht Messwerte einer Schicht mit Bubblesort ohne vorzeitigen Abbruch (n − 1 Durchläufe, jeder vergleicht die benachbarten Paare bis zum bereits sortierten Ende). Wie viele Vergleiche zweier Elemente führt es aus?
**Akzeptierte Antworten:** 28; 28 Vergleiche; achtundzwanzig; achtundzwanzig Vergleiche
**Erklärung:** Bei n Elementen sind es n · (n − 1) ÷ 2 = 8 · 7 ÷ 2 = 28 Vergleiche (7 + 6 + 5 + 4 + 3 + 2 + 1), unabhängig davon, wie die Messwerte anfangs angeordnet sind.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-18 · Kurzantwort
**Frage:** Die Liste [5, 1, 4, 2, 8] wird mit Bubblesort ohne vorzeitigen Abbruch aufsteigend sortiert. Wie viele Vertauschungen werden insgesamt ausgeführt?
**Akzeptierte Antworten:** 4; 4 Vertauschungen; vier; vier Vertauschungen
**Erklärung:** Durchlauf 1 ergibt [1, 4, 2, 5, 8] mit 3 Vertauschungen (5 mit 1, 5 mit 4, 5 mit 2), Durchlauf 2 ergibt [1, 2, 4, 5, 8] mit 1 Vertauschung (4 mit 2); die Durchläufe 3 und 4 vergleichen nur noch. Gegenprobe über die Fehlstellungen: (5, 1), (5, 4), (5, 2) und (4, 2), also 4.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-19 · Kurzantwort
**Frage:** Die Liste [9, 4, 7, 1, 5] wird mit Bubblesort aufsteigend sortiert. Welche Zahl steht nach dem ersten Durchlauf an Index 2 (Zählung ab 0)?
**Akzeptierte Antworten:** 1; eins
**Erklärung:** Die 9 wandert nach hinten: [4, 9, 7, 1, 5], [4, 7, 9, 1, 5], [4, 7, 1, 9, 5], [4, 7, 1, 5, 9]. Nach dem ersten Durchlauf steht an Index 2 die 1.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-20 · Kurzantwort
**Frage:** Eine Auszubildende der Brevanta sortiert die Liste [4, 9, 2, 7, 5] zur Übung mit Selectionsort; getauscht wird nur, wenn das Minimum nicht schon an seinem Platz steht. Wie viele Vertauschungen werden ausgeführt?
**Akzeptierte Antworten:** 3; 3 Vertauschungen; drei; drei Vertauschungen
**Erklärung:** Durchlauf 1: Minimum 2 mit 4 getauscht, [2, 9, 4, 7, 5]. Durchlauf 2: Minimum 4 mit 9 getauscht, [2, 4, 9, 7, 5]. Durchlauf 3: Minimum 5 mit 9 getauscht, [2, 4, 5, 7, 9]. Durchlauf 4: Das Minimum 7 steht schon an seinem Platz, kein Tausch. Die Vergleiche betragen 5 · 4 ÷ 2 = 10.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-21 · Kurzantwort
**Frage:** Die Liste [3, 8, 6, 1, 7] wird mit Insertionsort aufsteigend sortiert; das Element rückt durch Vertauschen mit dem linken Nachbarn nach vorn, solange dieser größer ist. Wie viele Vergleiche werden insgesamt ausgeführt?
**Akzeptierte Antworten:** 8; 8 Vergleiche; acht; acht Vergleiche
**Erklärung:** Durchlauf 1 (8): 3 > 8? nein, 1 Vergleich. Durchlauf 2 (6): 8 > 6, tauschen; 3 > 6? nein, 2 Vergleiche. Durchlauf 3 (1): an 8, 6 und 3 vorbei bis Index 0, 3 Vergleiche. Durchlauf 4 (7): 8 > 7, tauschen; 6 > 7? nein, 2 Vergleiche. Zusammen 1 + 2 + 3 + 2 = 8 Vergleiche bei 5 Vertauschungen.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-4.2-22 · Kurzantwort
**Frage:** Ein Lagerprogramm der Brevanta durchsucht die sortierte Liste [2, 5, 8, 12, 16, 23, 38, 41, 56, 72, 91] binär nach dem Wert 72 (Mitte = (links + rechts) // 2, Index ab 0). Wie viele Vergleiche mit dem mittleren Element sind nötig?
**Akzeptierte Antworten:** 3; 3 Vergleiche; drei; drei Vergleiche
**Erklärung:** links 0, rechts 10, Mitte 5 (23 < 72), links wird 6; Mitte (6 + 10) // 2 = 8 (56 < 72), links wird 9; Mitte (9 + 10) // 2 = 9 (72), gefunden an Index 9. Die lineare Suche bräuchte 10 Vergleiche.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-23 · Kurzantwort
**Frage:** Ein Kundenunternehmen der Brevanta verwaltet 5.000 sortierte Kundennummern. Wie viele Vergleiche braucht die binäre Suche höchstens, um eine Nummer zu finden oder festzustellen, dass sie fehlt?
**Akzeptierte Antworten:** 13; 13 Vergleiche; dreizehn; dreizehn Vergleiche
**Erklärung:** 2¹² = 4.096 ≤ 5.000 < 8.192 = 2¹³, also ist ⌊log₂ 5.000⌋ = 12; plus 1 ergibt höchstens 13 Vergleiche. Die lineare Suche bräuchte im ungünstigsten Fall 5.000.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-4.2-24 · Multiple Choice
**Frage:** Ein Skript der Brevanta prüft mit der linearen Suche, ob eine Seriennummer in einer unsortierten Liste mit 40 Seriennummern vorkommt. Die gesuchte Nummer ist nicht enthalten. Wie viele Vergleiche führt die Suche aus?
- [ ] 6
- [ ] 20
- [x] 40
- [ ] 41
**Erklärung:** Fehlt der Wert, muss die lineare Suche alle 40 Elemente prüfen. 20 wäre ungefähr der Durchschnitt bei vorhandenem Wert, 6 die Höchstzahl der binären Suche (⌊log₂ 40⌋ + 1), die aber eine sortierte Liste voraussetzt; einen 41. Vergleich gibt es nicht.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-4.2-25 · Wahr/Falsch
**Aussage:** Bubblesort ohne vorzeitigen Abbruch braucht für eine bereits sortierte Liste mit fünf Zahlen weniger Vergleiche als für eine unsortierte.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Beide Schleifen laufen immer vollständig: 4 + 3 + 2 + 1 = 10 Vergleiche, ob sortiert oder nicht; nur die Vertauschungen fallen bei sortierter Liste auf 0. Weniger Vergleiche bräuchten erst die Variante mit vorzeitigem Abbruch oder Insertionsort (bei sortierter Liste je 4).
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.2-26 · Zuordnung
**Anweisung:** Ordne jedem Verfahren das passende Merkmal zu (Bubblesort ohne vorzeitigen Abbruch, Selectionsort tauscht nur bei Bedarf, Insertionsort durch Vertauschen mit dem linken Nachbarn).
- Bubblesort ↔ Vergleicht nur benachbarte Elemente und kommt immer auf n · (n − 1) ÷ 2 Vergleiche
- Selectionsort ↔ Vertauscht höchstens einmal je Durchlauf
- Insertionsort ↔ Braucht bei bereits sortierter Liste nur n − 1 Vergleiche
- Lineare Suche ↔ Braucht bei fehlendem Wert n Vergleiche
- Binäre Suche ↔ Braucht höchstens ⌊log₂ n⌋ + 1 Vergleiche
**Erklärung:** Bubblesort und Selectionsort vergleichen unabhängig von der Vorsortierung gleich oft, Selectionsort tauscht aber nur das gefundene Minimum. Insertionsort bricht ab, sobald die Einfügestelle gefunden ist. Die lineare Suche prüft im ungünstigsten Fall alles, die binäre Suche halbiert den Suchbereich.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-4.2-27 · Sortieren
**Anweisung:** Bringe die Schritte eines Durchlaufs von Selectionsort in die richtige Reihenfolge.
1. Erstes Element des unsortierten Rests als bisheriges Minimum merken
2. Jedes weitere Element des Rests mit dem bisherigen Minimum vergleichen und ein kleineres als neues Minimum merken
3. Minimum mit dem ersten Element des Rests tauschen, falls es nicht schon dort steht
4. Grenze des sortierten Teils um eine Stelle nach rechts verschieben
**Erklärung:** Erst nach allen Vergleichen steht das Minimum des Rests fest; getauscht wird höchstens einmal je Durchlauf. Danach ist der sortierte Teil um ein Element länger, und der nächste Durchlauf beginnt eine Stelle weiter rechts.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-4.2-28 · Mehrfachauswahl
**Frage:** Eine selbst geschriebene binäre Suche der Brevanta-Entwicklung bleibt bei manchen Werten in einer Endlosschleife hängen oder findet vorhandene Werte nicht. Welche Ursachen kommen dafür infrage?
- [x] Die Mitte wird mit `len(liste) // 2` aus der ganzen Liste statt aus dem aktuellen Suchbereich berechnet.
- [ ] Die Liste hat eine gerade Anzahl von Elementen, sodass es kein einzelnes mittleres Element gibt.
- [x] Nach einem zu kleinen Wert an der Mitte wird `links = mitte` statt `links = mitte + 1` gesetzt.
- [ ] Die Mitte wird mit `(links + rechts) // 2` abgerundet statt aufgerundet.
- [x] Die Liste ist entgegen der Annahme nicht sortiert.
**Erklärung:** Eine feste Mitte und `links = mitte` verkleinern den Suchbereich nicht zuverlässig und können eine Endlosschleife erzeugen; auf einer unsortierten Liste verwirft die Suche die falsche Hälfte. Eine gerade Anzahl von Elementen ist dagegen kein Fehler: Die abgerundete Mitte wählt dann einfach das linke der beiden mittleren Elemente. Abrunden statt Aufrunden ändert nur, welche Mitten geprüft werden; beide Regeln finden jeden vorhandenen Wert und enden sicher.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-4.2-29 · Entweder-Oder
**Frage:** Der Service-Desk der Brevanta hat eine nach Eingangszeit geordnete Ticketliste. Sie soll nach Priorität sortiert werden; bei gleicher Priorität soll das ältere Ticket vorn bleiben. Welches der beiden selbst programmierten Verfahren erfüllt das sicher?
- [ ] Selectionsort
- [x] Insertionsort
**Erklärung:** Insertionsort ist stabil, weil es nur tauscht, wenn der linke Nachbar größer ist. Selectionsort kann gleich priorisierte Tickets vertauschen: Aus T-1 (Priorität 2), T-2 (1), T-3 (2), T-4 (1) wird T-2, T-4, T-3, T-1. In der Praxis sortiert auch `sorted()` in Python stabil.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-4.2-30 · Lückentext (Wortauswahl)
**Text:** Beim Bubblesort steht nach jedem ___Durchlauf___ das größte noch unsortierte Element an seinem endgültigen Platz am Ende des unsortierten Teils.
**Zusätzliche Begriffe:** Vergleich; Tausch; Index
**Erklärung:** Im ersten Durchlauf wandert das größte Element bis ans Listenende, im zweiten das zweitgrößte an die vorletzte Stelle. Deshalb braucht der k-te Durchlauf nur noch n − k Vergleiche.
`schwierigkeit: leicht` · `bloom: verstehen`
