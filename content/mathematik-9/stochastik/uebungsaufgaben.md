---
kurs_slug: mathematik-9
fachgebiet_code: STO
fachgebiet_title: "Stochastik"
thema_code: "STO-uebungsaufgaben"
thema_title: "Gemischte Übungsaufgaben (Baumdiagramme, Vierfeldertafeln, Zurücklegen)"
quelle: "Frei formulierte Übungsaufgaben, orientiert an typischen klassenarbeitsähnlichen Aufgabenstellungen zu STO1 — keine 1:1-Übernahme aus Lehrbüchern (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "14.09.2026 — vor Verwendung durch echte Lernende fachlich gegenlesen"
---

## Übungsaufgaben

Da das Fachgebiet Stochastik in diesem Themenkatalog aus nur einem Thema (STO1) besteht, kombinieren diese Aufgaben nicht mehrere Themen, sondern die verschiedenen Techniken innerhalb der Wahrscheinlichkeitsrechnung (Baumdiagramm, Gegenereignis, Vierfeldertafel, Ziehen mit/ohne Zurücklegen) — wie es auch in einer echten Klassenarbeit zu diesem Themenblock üblich wäre. Jede Aufgabe besteht aus mehreren Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### U-STO-01 · Übungsaufgabe

**Aufgabenstellung:** Ein Glücksrad ist in drei Felder eingeteilt: Rot (Wahrscheinlichkeit 0,5), Blau (0,3) und Grün (0,2). Das Rad wird zweimal gedreht.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Beschreibe das zugehörige Baumdiagramm für die zwei Drehungen und berechne die Wahrscheinlichkeit, dass beide Male Rot erscheint.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechne über das Gegenereignis die Wahrscheinlichkeit, dass mindestens einmal Grün erscheint.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Berechne die Wahrscheinlichkeit, dass genau eine der beiden Drehungen Blau ergibt.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Handelt es sich bei diesem Glücksrad um ein Laplace-Experiment? Begründe kurz.

**Musterlösungshinweise:**
- T1: Zwei Verzweigungsebenen mit je drei Ästen (Rot/Blau/Grün); P(Rot,Rot) = 0,5 · 0,5 = 0,25.
- T2: P(kein Grün) = 0,8 · 0,8 = 0,64, also P(mind. 1× Grün) = 1 − 0,64 = 0,36.
- T3: Zwei Pfade führen zu „genau einmal Blau": (Blau, nicht Blau) und (nicht Blau, Blau); P = 0,3·0,7 + 0,7·0,3 = 0,21 + 0,21 = 0,42.
- T4: Nein, kein Laplace-Experiment, da die drei Ergebnisse (Rot, Blau, Grün) nicht gleich wahrscheinlich sind (0,5 / 0,3 / 0,2).

---

#### U-STO-02 · Übungsaufgabe

**Aufgabenstellung:** Eine Urne enthält 5 rote und 3 blaue Kugeln. Es wird zweimal ohne Zurücklegen gezogen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechne die Wahrscheinlichkeit, dass beide gezogenen Kugeln rot sind.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechne die Wahrscheinlichkeit, dass zuerst eine blaue und dann eine rote Kugel gezogen wird.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Stelle die vier möglichen Ergebniskombinationen (rot-rot, rot-blau, blau-rot, blau-blau) mit ihren Wahrscheinlichkeiten in einer Vierfeldertafel dar (1. Ziehung als Zeilen, 2. Ziehung als Spalten).

**Teilaufgabe 4 (5 Punkte, bloom: analysieren):** Vergleiche P(beide rot) aus Teilaufgabe 1 mit dem Ergebnis, das sich ergäbe, wenn stattdessen mit Zurücklegen gezogen würde. Erkläre den Unterschied.

**Musterlösungshinweise:**
- T1: P(rot, rot) = (5/8) · (4/7) = 20/56 = 5/14 ≈ 0,357.
- T2: P(blau, rot) = (3/8) · (5/7) = 15/56 ≈ 0,268.
- T3: Vierfeldertafel mit den vier Wahrscheinlichkeiten rot-rot = 5/14, rot-blau = 15/56, blau-rot = 15/56, blau-blau = 3/28 (= 6/56); die Zeilen- bzw. Spaltensummen ergeben jeweils die Wahrscheinlichkeit der ersten bzw. zweiten Ziehung.
- T4: Mit Zurücklegen: P(rot, rot) = (5/8)² = 25/64 ≈ 0,391 — etwas höher als ohne Zurücklegen, da bei Ziehen ohne Zurücklegen nach der ersten roten Kugel anteilig weniger rote Kugeln übrig bleiben.

---

#### U-STO-03 · Übungsaufgabe

**Aufgabenstellung:** In einer Klasse mit 30 Schüler:innen (16 Mädchen, 14 Jungen) wurde gefragt, ob Mathematik das Lieblingsfach ist. 10 der Mädchen und 6 der Jungen gaben Mathematik als Lieblingsfach an.

**Teilaufgabe 1 (5 Punkte, bloom: erschaffen):** Erstelle eine vollständige Vierfeldertafel (Geschlecht × Lieblingsfach Mathe ja/nein) mit allen Randsummen.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Wie hoch ist der Anteil der Schüler:innen, die Mathe als Lieblingsfach angeben, an der gesamten Klasse?

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Wie hoch ist der Anteil der Mädchen unter allen, die Mathe als Lieblingsfach angeben?

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** Eine Person aus der Klasse wird zufällig ausgewählt. Wie hoch ist die Wahrscheinlichkeit, dass diese Person Mathe NICHT als Lieblingsfach angibt (Gegenereignis)?

**Musterlösungshinweise:**
- T1: Mädchen: Mathe ja 10, Mathe nein 6, Summe 16. Jungen: Mathe ja 6, Mathe nein 8, Summe 14. Spaltensummen: Mathe ja 16, Mathe nein 14, Gesamt 30.
- T2: 16/30 ≈ 53,3 %.
- T3: Unter den 16 „Mathe ja" sind 10 Mädchen: 10/16 = 62,5 %.
- T4: P(nicht Mathe) = 14/30 ≈ 46,7 % (= 1 − 16/30).

