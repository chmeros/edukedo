import type { CodeReihenfolgePayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Code-Reihenfolge: Grundmuster" für die Fachinformatiker/in-Kurse
 * (zehn Parsons-Probleme mit steigender Schwierigkeit: Python, JavaScript, SQL, Pseudocode, Shell/Git).
 * Die Zeilen stehen jeweils in der einzig sinnvollen Reihenfolge; Einrückung ist Teil des Textes.
 */
export const codeReihenfolgeGrundmuster: CodeReihenfolgePayload = {
  aufgaben: [
    {
      nummer: 1,
      titel: "Summe einer Liste",
      sprache: "Python",
      aufgabe: "Der Code soll eine Funktion bereitstellen, die alle Zahlen einer Liste addiert und die Summe zurückgibt.",
      zeilen: [
        "def summe_liste(zahlen):",
        "    summe = 0",
        "    for zahl in zahlen:",
        "        summe = summe + zahl",
        "    return summe",
      ],
      erklaerung:
        "Die Funktion wird zuerst mit def deklariert. Die Variable summe muss mit 0 starten, bevor die Schleife sie benutzt. Der Schleifenkopf kommt vor dem eingerückten Rumpf, der summe schrittweise erhöht. Das return steht ganz am Ende, damit erst nach dem letzten Schleifendurchlauf zurückgegeben wird.",
    },
    {
      nummer: 2,
      titel: "Kundschaft aus Hamburg",
      sprache: "SQL",
      aufgabe:
        "Der Code soll aus der Tabelle kunde Name und Stadt aller Kund:innen aus Hamburg ausgeben, alphabetisch nach Name sortiert.",
      zeilen: [
        "SELECT name, stadt",
        "FROM kunde",
        "WHERE stadt = 'Hamburg'",
        "ORDER BY name;",
      ],
      erklaerung:
        "Eine SQL-Abfrage hat eine feste Klauselreihenfolge: SELECT legt die Spalten fest, FROM nennt die Tabelle, WHERE filtert die Zeilen, und ORDER BY sortiert das Ergebnis zuletzt. Nur in dieser Folge ist die Abfrage gültig.",
    },
    {
      nummer: 3,
      titel: "Änderung ins Repository bringen",
      sprache: "Shell",
      aufgabe:
        "Der Ablauf soll ein Repository klonen, in den Projektordner wechseln und deine Änderung an notizen.txt (du bearbeitest die Datei direkt nach dem Wechsel in den Ordner) ins Remote-Repository übertragen.",
      zeilen: [
        "git clone https://git.beispiel.de/team/projekt.git",
        "cd projekt",
        "git add notizen.txt",
        "git commit -m 'Notizen ergänzt'",
        "git push",
      ],
      erklaerung:
        "Erst muss das Repository per clone vorhanden sein, danach wechselst du mit cd in den neuen Ordner. Mit git add wird die Änderung für den nächsten Commit vorgemerkt, git commit hält sie lokal fest, und erst git push überträgt die Commits zum Remote-Repository. Ohne vorgemerkte Änderung gäbe es nichts zu committen, ohne Commit nichts zu pushen.",
    },
    {
      nummer: 4,
      titel: "Begriffe filtern und umwandeln",
      sprache: "JavaScript",
      aufgabe:
        "Der Code soll aus einer Wortliste alle Wörter mit mehr als drei Buchstaben herausfiltern, in Großbuchstaben umwandeln und als kommagetrennten Text ausgeben.",
      zeilen: [
        "const woerter = ['Netz', 'Server', 'Router', 'Hub'];",
        "const lang = woerter.filter(w => w.length > 3);",
        "const gross = lang.map(w => w.toUpperCase());",
        "const text = gross.join(', ');",
        "console.log(text);",
      ],
      erklaerung:
        "Jede Zeile baut auf der vorherigen auf: woerter muss existieren, bevor gefiltert wird, lang muss existieren, bevor umgewandelt wird, und gross muss existieren, bevor es zu einem Text zusammengefügt wird. Die Ausgabe steht zuletzt, weil text erst dann fertig ist.",
    },
    {
      nummer: 5,
      titel: "Gerade Zahlen filtern",
      sprache: "Python",
      aufgabe:
        "Der Code soll eine Funktion bereitstellen, die aus einer Liste nur die geraden Zahlen in eine neue Liste übernimmt und diese zurückgibt.",
      zeilen: [
        "def gerade_zahlen(zahlen):",
        "    ergebnis = []",
        "    for zahl in zahlen:",
        "        if zahl % 2 == 0:",
        "            ergebnis.append(zahl)",
        "    return ergebnis",
      ],
      erklaerung:
        "Die leere Ergebnisliste muss existieren, bevor die Schleife etwas anhängt. Im Schleifenrumpf prüft zuerst das if, ob die Zahl gerade ist; nur dann wird sie im noch tiefer eingerückten Block angehängt. Das return folgt außerhalb der Schleife, damit alle Zahlen geprüft sind.",
    },
    {
      nummer: 6,
      titel: "Fakultät berechnen",
      sprache: "Pseudocode",
      aufgabe:
        "Der Algorithmus soll die Fakultät einer bereits gegebenen Zahl n berechnen (n! = 2 · 3 · … · n) und das Ergebnis ausgeben.",
      zeilen: [
        "ergebnis = 1",
        "FÜR i VON 2 BIS n",
        "    ergebnis = ergebnis * i",
        "ENDE FÜR",
        "AUSGABE ergebnis",
      ],
      erklaerung:
        "Das Ergebnis muss vor der Schleife mit 1 starten; stünde die Zuweisung in der Schleife, würde sie bei jedem Durchlauf alles zurücksetzen. Der Schleifenkopf steht vor dem Rumpf, ENDE FÜR schließt die Schleife, und erst danach wird das fertige Ergebnis ausgegeben.",
    },
    {
      nummer: 7,
      titel: "Größte Zahl finden",
      sprache: "JavaScript",
      aufgabe: "Der Code soll in einer Zahlenliste den größten Wert suchen und ihn in der Konsole ausgeben.",
      zeilen: [
        "const zahlen = [3, 8, 1, 9, 4];",
        "let maximum = zahlen[0];",
        "for (const zahl of zahlen) {",
        "  if (zahl > maximum) maximum = zahl;",
        "}",
        "console.log(maximum);",
      ],
      erklaerung:
        "Die Liste muss existieren, bevor ihr erstes Element als vorläufiges Maximum gemerkt wird. Danach folgt der Schleifenkopf, im Rumpf wird verglichen und das Maximum bei Bedarf ersetzt, dann schließt die geschweifte Klammer die Schleife. Die Ausgabe steht erst nach der Schleife, damit nur das endgültige Maximum erscheint.",
    },
    {
      nummer: 8,
      titel: "Umsatz je Kundschaft",
      sprache: "SQL",
      aufgabe:
        "Der Code soll für jede Kundin und jeden Kunden den Gesamtbetrag der bezahlten Bestellungen berechnen, nur Beträge über 1000 anzeigen und die höchsten Umsätze zuerst auflisten.",
      zeilen: [
        "SELECT k.name, SUM(b.betrag) AS umsatz",
        "FROM kunde k",
        "JOIN bestellung b ON b.kunde_id = k.id",
        "WHERE b.status = 'bezahlt'",
        "GROUP BY k.name",
        "HAVING SUM(b.betrag) > 1000",
        "ORDER BY umsatz DESC;",
      ],
      erklaerung:
        "SQL verlangt die feste Reihenfolge SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY. Zuerst steht, was ausgegeben wird, dann die Tabelle und die verknüpfte Tabelle. WHERE filtert einzelne Zeilen vor dem Gruppieren, GROUP BY bildet die Gruppen, HAVING filtert danach die Gruppen, und ORDER BY sortiert zuletzt das Ergebnis.",
    },
    {
      nummer: 9,
      titel: "Größter gemeinsamer Teiler",
      sprache: "Pseudocode",
      aufgabe:
        "Der Algorithmus soll den größten gemeinsamen Teiler zweier bereits gegebener Zahlen a und b nach dem Euklidischen Verfahren berechnen und ausgeben.",
      zeilen: [
        "SOLANGE b != 0",
        "    rest = a MOD b",
        "    a = b",
        "    b = rest",
        "ENDE SOLANGE",
        "AUSGABE a",
      ],
      erklaerung:
        "Der Schleifenkopf prüft, ob b noch ungleich 0 ist. Im Rumpf muss rest zuerst aus den alten Werten von a und b berechnet werden. Danach rückt b auf den Platz von a, und erst dann darf b den Rest übernehmen; vertauschst du das, gehen die alten Werte verloren. Nach ENDE SOLANGE steht in a der Teiler und wird ausgegeben.",
    },
    {
      nummer: 10,
      titel: "Zahlen einlesen mit Fehlerbehandlung",
      sprache: "Python",
      aufgabe:
        "Der Code soll aus einem kommagetrennten Text alle gültigen ganzen Zahlen in eine Liste übernehmen; für ungültige Einträge soll eine Meldung ausgegeben werden. Die Liste wird zurückgegeben.",
      zeilen: [
        "def lies_zahlen(text):",
        "    zahlen = []",
        "    for teil in text.split(','):",
        "        try:",
        "            zahlen.append(int(teil))",
        "        except ValueError:",
        "            print('Ungültig: ' + teil)",
        "    return zahlen",
      ],
      erklaerung:
        "Die Liste wird vor der Schleife angelegt, die Schleife geht über die Teilstrings. Im Rumpf steht zuerst der try-Block mit der Umwandlung, die fehlschlagen kann; der except-Block fängt den Fehler danach ab, und seine Meldung ist noch tiefer eingerückt. Das return steht außerhalb der Schleife am Ende der Funktion.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zehn Code-Reihenfolgen gemeistert und gesehen, wie Zeilen in Python, JavaScript, SQL, Pseudocode und Shell logisch aufeinander aufbauen.",
};
