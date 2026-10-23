# Entwurf Immobilienfachwirt, Orientierungswerte für die Liquiditätsgrade: kleine Ergänzung im Thema 2.3

Stand 23.10.2026, **Entwurf (R3, Orientierungswerte; kein Gesetz), nicht eingespielt.** Teil H des Auftrags P-AQ (Erhebung vom 14.10.2026; Fachlehrer-Befund FL-IM-26, Rest B-10). Einzufügen in `content/immobilienfachwirt/hb2/2.3-controlling-kennzahlen.md`: Abschnitt A **vor der Überschrift „### Liquiditätsplanung in der Hausverwaltung: Ziel und Aufbau“** (Anker; die Theorie steht damit hinter dem Rechenbeispiel der Portfolio- und Bilanzkennzahlen), B an die Karteikarten hinter K-2.3-30, C an das Quiz hinter Q-2.3-32. Bestand gezählt: 30 Karteikarten (K-2.3-01 bis -30) und 32 Quizfragen (Q-2.3-01 bis -32), lückenlos; `git log -S` auf K-2.3-31 und Q-2.3-33 ergibt keine entfernten IDs. Neue IDs: K-2.3-31 und -32, Q-2.3-33 und -34.

**Zweck.** Der Bestand erklärt die Formeln der Liquiditätsgrade und rechnet sie vor (45 %, 100 %, 130 %), nennt aber keinen Maßstab, an dem ein Ergebnis gemessen wird. Die Ergänzung nennt die in der Lehr- und Ratgeberliteratur üblichen Orientierungswerte und kennzeichnet sie als Faustwerte. Sie gehört zusammen mit der Ersetzung in `ersetzungen-h.json` (Verweis in Z. 25 von `hb2/2.3`); beides nur gemeinsam einspielen. Konsistent mit dem Zielwert „Liquidität 2. Grades mindestens 100 %“ in F-HB2-05 (`hb2/fallaufgaben.md`).

**Rechtsnähe.** Keine Rechtsnorm; Orientierungswerte aus Lehr- und Ratgebertexten, je Quelle verschieden. Einzelheiten in `rechtsangaben-h.md`. Keine Paragrafen in Karten und Quiz.

---

# Thema 2.3

## A. Theorie-Ergänzung 2.3 (einfügen vor „### Liquiditätsplanung in der Hausverwaltung: Ziel und Aufbau“)

### Orientierungswerte für die Liquiditätsgrade

Ein Liquiditätsgrad sagt erst mit einem Maßstab etwas aus. In der betriebswirtschaftlichen Lehr- und Ratgeberliteratur finden sich dafür Faustwerte, die je Quelle und Branche voneinander abweichen und keine Rechtsnorm sind: für die Liquidität 1. Grades grob 10 bis 30 % (häufig wird etwa 20 % genannt), für die Liquidität 2. Grades etwa 100 % oder etwas mehr und für die Liquidität 3. Grades grob 120 bis 200 % (ältere Lehrbücher nennen häufig 200 %). Sie sind Orientierung, kein Grenzwert: Ein Wert außerhalb des Bereichs ist ein Anlass zur Ursachenanalyse, kein Beweis für Zahlungsprobleme, und ein Wert innerhalb des Bereichs garantiert keine Zahlungsfähigkeit. Ob ein Wert ausreicht, hängt unter anderem davon ab, wann die Verbindlichkeiten fällig werden, wie sicher die Forderungen eingehen und wie sich die Branche üblicherweise finanziert. Legt ein Unternehmen oder ein Auftrag eigene Zielwerte fest, gelten diese.

Im Rechenbeispiel (45 %, 100 % und 130 %) liegt der 1. Grad über dem Orientierungsbereich, der 2. Grad am unteren Rand und der 3. Grad innerhalb des Bereichs. Im Bauträgergeschäft bestehen die Vorräte aus unfertigen Leistungen, die sich in der Regel nicht kurzfristig zu Geld machen lassen; deshalb stützt sich die Beurteilung dort nach verbreiteter Praxis stärker auf den 2. Grad und auf den Liquiditätsplan (siehe „Liquiditätsplanung in der Hausverwaltung: Ziel und Aufbau“) als auf den 3. Grad. Die Werte und diese Einordnung sind Orientierung nach der Fachliteratur (Stand Oktober 2026, vor Verwendung prüfen).

## B. Karteikarten 2.3 (anhängen)

#### K-2.3-31
**Frage:** Welche Orientierungswerte nennt die Fachliteratur für die drei Liquiditätsgrade, und wie verbindlich sind sie?
**Antwort:** Grob: Grad 1 etwa 10 bis 30 %, Grad 2 etwa 100 % oder mehr, Grad 3 etwa 120 bis 200 %. Es sind Faustwerte, die je Quelle und Branche abweichen, keine Rechtsnorm und kein fester Grenzwert.
`tags: liquiditaetsgrade, orientierungswerte` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.3-32
**Frage:** Wie ordnest du eine Liquidität 2. Grades von 85 % ein?
**Antwort:** Sie liegt unter dem üblichen Orientierungswert von etwa 100 %: Die kurzfristigen Verbindlichkeiten sind nicht allein durch liquide Mittel und Forderungen gedeckt. Das ist ein Anlass, Ursachen zu prüfen (Forderungen, Zahlungsziele), aber noch kein Beweis für Zahlungsunfähigkeit.
`tags: liquiditaetsgrade, orientierungswerte` · `schwierigkeit: mittel` · `bloom: bewerten`

## C. Quiz 2.3 (anhängen)

#### Q-2.3-33 · Multiple Choice
**Frage:** Wie sind die üblichen Orientierungswerte für die Liquiditätsgrade einzuordnen?
- [ ] Als gesetzliche Mindestwerte, die jede GmbH einhalten muss
- [x] Als Faustwerte der Fachliteratur, die je Quelle abweichen
- [ ] Als Durchschnittswerte, die alle Hausverwaltungen tatsächlich erreichen
- [ ] Als Vorgaben der Aufsicht für Hausverwaltungsunternehmen
**Erklärung:** Die Werte sind Orientierung aus Lehr- und Ratgebertexten. Sie unterscheiden sich je Quelle und Branche, sind keine Rechtsnorm und kein fester Grenzwert; ein Wert außerhalb des Bereichs ist ein Anlass zur Ursachenanalyse.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-2.3-34 · Kurzantwort
**Frage:** Liquide Mittel 60.000 €, kurzfristige Forderungen 45.000 €, kurzfristige Verbindlichkeiten 150.000 €. Berechne die Liquidität 2. Grades in Prozent.
**Akzeptierte Antworten:** 70 %; 70; 70 Prozent; 70%; 70,0 %; 70,00 %; 70,0; 70,00
**Erklärung:** (60.000 € + 45.000 €) ÷ 150.000 € × 100 = 70 %. Das liegt unter dem üblichen Orientierungswert von etwa 100 %: ein Anlass, die Ursachen zu prüfen, aber kein Beweis für Zahlungsprobleme.
`schwierigkeit: mittel` · `bloom: anwenden`
