import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „SQL und Datenmodellierung" für die Fachinformatiker/in-Kurse (Abschlussprüfung
 * nach FIAusbV): 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Zweites Duell-Set
 * neben dem Begriffe-Duell „IT-Grundlagen". Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe
 * sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell
 * (F-142, `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie
 * bloß „Duell" (Abgrenzung zum F-61-Wissensduell). Alle Aussagen sind standardnah (SQL-Standard,
 * gängige Datenbanklehrbücher) und bewusst frei von herstellerspezifischen Details.
 */
export const kennzahlenDuellSqlDatenmodellierung: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Abfragen und Filtern",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst WHERE und HAVING, COUNT(*) und COUNT(Spalte), LIKE und den Gleichheitsoperator sowie ORDER BY und GROUP BY sicher unterscheiden.",
    },
    {
      nummer: 2,
      titel: "Verknüpfen und Aggregieren",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest jetzt INNER JOIN, LEFT JOIN und RIGHT JOIN, UNION und UNION ALL sowie SUM und AVG.",
    },
    {
      nummer: 3,
      titel: "Datenmodellierung",
      abschlussmeldung:
        "Runde 3 geschafft! Du kannst nun Entität und Attribut, 1:n- und n:m-Beziehung, die Normalformen 1NF, 2NF und 3NF sowie Redundanz und Anomalie auseinanderhalten.",
    },
    {
      nummer: 4,
      titel: "Transaktionen, Rechte und Performance",
      abschlussmeldung:
        "Runde 4 geschafft! Du unterscheidest COMMIT und ROLLBACK, DELETE und TRUNCATE, GRANT und REVOKE sowie Index und Primärschlüssel.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage:
        "Welche SQL-Klausel filtert einzelne Datensätze, bevor gruppiert wird, und kann nicht direkt mit Aggregatfunktionen wie SUM oder COUNT arbeiten?",
      antwortA: "WHERE",
      antwortB: "HAVING",
      richtig: "A",
      feedbackRichtig:
        "Richtig! WHERE wählt einzelne Datensätze aus, bevor GROUP BY die Gruppen bildet, und kann deshalb nicht auf Aggregatwerte zugreifen. HAVING filtert dagegen erst die fertigen Gruppen.",
      feedbackFalsch:
        "Überlege, in welcher Reihenfolge gefiltert und gruppiert wird. Gefragt ist die Klausel, die greift, bevor es überhaupt Gruppen gibt.",
    },
    {
      nummer: 2,
      runde: 1,
      frage:
        "Welche SQL-Klausel filtert nach dem Gruppieren ganze Gruppen, z. B. nur Kunden, deren Umsatzsumme über 1.000 € liegt?",
      antwortA: "WHERE",
      antwortB: "HAVING",
      richtig: "B",
      feedbackRichtig:
        "Genau! HAVING wirkt nach GROUP BY auf ganze Gruppen und darf Aggregatfunktionen wie SUM verwenden. WHERE filtert dagegen einzelne Datensätze vor der Gruppierung.",
      feedbackFalsch:
        "Achte auf ganze Gruppen und die Bedingung auf einer Summe. Die Klausel, die einzelne Datensätze vor der Gruppierung aussortiert, passt dazu nicht.",
    },
    {
      nummer: 3,
      runde: 1,
      frage:
        "Welche Schreibweise zählt alle Zeilen einer Tabelle, auch solche, bei denen in einer bestimmten Spalte NULL steht?",
      antwortA: "COUNT(Spalte)",
      antwortB: "COUNT(*)",
      richtig: "B",
      feedbackRichtig:
        "Richtig! COUNT(*) zählt jede Zeile, unabhängig vom Inhalt der Spalten. COUNT(Spalte) lässt dagegen alle Zeilen weg, in denen diese Spalte NULL enthält.",
      feedbackFalsch:
        "Überlege, wie NULL-Werte beim Zählen behandelt werden. Gefragt ist die Variante, bei der es auf den Inhalt einer einzelnen Spalte gar nicht ankommt.",
    },
    {
      nummer: 4,
      runde: 1,
      frage:
        "Welcher Operator vergleicht einen Text mit einem Muster, in dem Platzhalter wie % (beliebig viele Zeichen) oder _ (genau ein Zeichen) vorkommen dürfen?",
      antwortA: "LIKE",
      antwortB: "=",
      richtig: "A",
      feedbackRichtig:
        "Richtig! LIKE unterstützt die Platzhalter % und _ für Mustersuchen. Der Operator = prüft dagegen auf exakte Gleichheit und behandelt diese Zeichen nicht als Platzhalter.",
      feedbackFalsch:
        "Achte auf Muster und Platzhalter. Ein Operator, der nur auf exakte Gleichheit prüft, kennt solche Platzhalter nicht.",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Klausel legt die Reihenfolge der Ergebniszeilen fest, z. B. aufsteigend (ASC) oder absteigend (DESC)?",
      antwortA: "GROUP BY",
      antwortB: "ORDER BY",
      richtig: "B",
      feedbackRichtig:
        "Genau! ORDER BY sortiert das Ergebnis nach den angegebenen Spalten. GROUP BY fasst dagegen Datensätze mit gleichen Werten zu Gruppen zusammen, ohne eine Sortierung vorzugeben.",
      feedbackFalsch:
        "Gefragt ist die Anordnung der Ergebniszeilen mit ASC oder DESC. Die Klausel, die Datensätze zu Gruppen zusammenfasst, regelt keine Sortierung.",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welcher Join liefert nur die Zeilen, für die in beiden Tabellen ein passender Partner gefunden wird?",
      antwortA: "INNER JOIN",
      antwortB: "LEFT JOIN",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der INNER JOIN gibt nur Zeilen mit Treffer auf beiden Seiten zurück. Der LEFT JOIN behält dagegen auch Zeilen der linken Tabelle ohne Partner und füllt die rechte Seite mit NULL.",
      feedbackFalsch:
        "Achte auf nur Treffer auf beiden Seiten. Ein Join, der Zeilen ohne Partner mit NULL-Werten erhält, passt dazu nicht.",
    },
    {
      nummer: 7,
      runde: 2,
      frage:
        "Welcher Join liefert alle Zeilen der rechten Tabelle, auch wenn es in der linken Tabelle keinen passenden Partner gibt (dort erscheinen dann NULL-Werte)?",
      antwortA: "LEFT JOIN",
      antwortB: "RIGHT JOIN",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der RIGHT JOIN behält alle Zeilen der rechten Tabelle. Der LEFT JOIN verhält sich spiegelbildlich und behält alle Zeilen der linken Tabelle.",
      feedbackFalsch:
        "Prüfe, welche der beiden Tabellen vollständig erhalten bleiben soll. Der Join, der die andere Seite bevorzugt, ist hier nicht gemeint.",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welcher Operator vereinigt die Ergebnisse zweier Abfragen und behält dabei doppelt vorkommende Zeilen bei?",
      antwortA: "UNION",
      antwortB: "UNION ALL",
      richtig: "B",
      feedbackRichtig:
        "Richtig! UNION ALL hängt die Ergebnisse einfach aneinander und behält Duplikate. UNION entfernt dagegen doppelte Zeilen aus dem vereinigten Ergebnis.",
      feedbackFalsch:
        "Achte auf behält doppelte Zeilen bei. Der Operator, der Duplikate automatisch entfernt, ist hier nicht gesucht.",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welcher Operator vereinigt die Ergebnisse zweier Abfragen und entfernt dabei doppelt vorkommende Zeilen?",
      antwortA: "UNION",
      antwortB: "UNION ALL",
      richtig: "A",
      feedbackRichtig:
        "Genau! UNION liefert eine Ergebnismenge ohne doppelte Zeilen. UNION ALL behält dagegen alle Zeilen, also auch Duplikate.",
      feedbackFalsch:
        "Achte darauf, was mit doppelten Zeilen geschehen soll. Der Operator, der alles unverändert aneinanderhängt, passt dazu nicht.",
    },
    {
      nummer: 10,
      runde: 2,
      frage:
        "Welche Aggregatfunktion teilt die Summe der Werte einer Spalte durch die Anzahl der berücksichtigten Werte und liefert so den Durchschnitt?",
      antwortA: "AVG",
      antwortB: "SUM",
      richtig: "A",
      feedbackRichtig:
        "Richtig! AVG berechnet den Mittelwert. SUM liefert dagegen nur die Summe aller Werte, ohne durch eine Anzahl zu teilen.",
      feedbackFalsch:
        "Gefragt ist der Mittelwert. Die Funktion, die lediglich alle Werte aufaddiert, liefert dieses Ergebnis nicht.",
    },
    {
      nummer: 11,
      runde: 3,
      frage:
        "Welcher Begriff bezeichnet in der Datenmodellierung ein beschreibendes Merkmal eines Objekts, z. B. den Nachnamen oder das Geburtsdatum eines Kunden?",
      antwortA: "Attribut",
      antwortB: "Entität",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ein Attribut ist eine Eigenschaft, die ein Objekt beschreibt. Die Entität ist dagegen das Objekt selbst, z. B. der Kunde, und wird durch ihre Attribute beschrieben.",
      feedbackFalsch:
        "Gefragt ist eine einzelne Eigenschaft wie Name oder Geburtsdatum. Das Objekt, das diese Eigenschaften besitzt, ist hier nicht gemeint.",
    },
    {
      nummer: 12,
      runde: 3,
      frage:
        "Welche Beziehungsart wird im Relationenmodell über eine Zwischentabelle mit zwei Fremdschlüsseln aufgelöst, z. B. Schüler besuchen Kurse?",
      antwortA: "1:n-Beziehung",
      antwortB: "n:m-Beziehung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Eine n:m-Beziehung braucht eine Zwischentabelle (Verknüpfungstabelle), die auf beide Seiten verweist. Eine 1:n-Beziehung wird dagegen mit einem Fremdschlüssel auf der n-Seite umgesetzt.",
      feedbackFalsch:
        "Denke an Beispiele wie Schüler und Kurse, bei denen beide Seiten mehrfach vorkommen können. Eine Beziehung, bei der ein Fremdschlüssel genügt, braucht keine Zwischentabelle.",
    },
    {
      nummer: 13,
      runde: 3,
      frage:
        "Welche Normalform beseitigt zusätzlich partielle Abhängigkeiten, bei denen ein Attribut nur von einem Teil eines zusammengesetzten Primärschlüssels abhängt?",
      antwortA: "1NF",
      antwortB: "2NF",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die 2NF verlangt, dass jedes Nichtschlüsselattribut vom gesamten Primärschlüssel abhängt. Die 1NF fordert dagegen nur atomare Attributwerte ohne Mehrfachwerte in einem Feld.",
      feedbackFalsch:
        "Achte auf Abhängigkeit von einem Teil des zusammengesetzten Schlüssels. Die Normalform, die nur atomare Werte fordert, geht darauf nicht ein.",
    },
    {
      nummer: 14,
      runde: 3,
      frage:
        "Welche Normalform beseitigt zusätzlich transitive Abhängigkeiten, bei denen ein Nichtschlüsselattribut von einem anderen Nichtschlüsselattribut abhängt?",
      antwortA: "3NF",
      antwortB: "2NF",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die 3NF verbietet, dass Nichtschlüsselattribute von anderen Nichtschlüsselattributen abhängen (transitive Abhängigkeit). Die 2NF kümmert sich dagegen um Abhängigkeiten von nur einem Teil eines zusammengesetzten Schlüssels.",
      feedbackFalsch:
        "Achte auf Abhängigkeiten zwischen Nichtschlüsselattributen, also über einen Zwischenschritt. Die Normalform, die Teile eines zusammengesetzten Schlüssels betrachtet, ist hier nicht gemeint.",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welcher Begriff bezeichnet das mehrfache Speichern derselben Information an verschiedenen Stellen einer Datenbank?",
      antwortA: "Anomalie",
      antwortB: "Redundanz",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Redundanz bedeutet, dass dieselbe Information mehrfach gespeichert wird. Anomalien sind dagegen die Fehler und Widersprüche beim Einfügen, Ändern oder Löschen, die daraus entstehen können.",
      feedbackFalsch:
        "Gefragt ist das doppelte Vorhandensein von Daten selbst, nicht die Probleme, die später beim Ändern oder Löschen auftreten können.",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welcher Befehl beendet eine Transaktion erfolgreich und macht alle ihre Änderungen dauerhaft?",
      antwortA: "COMMIT",
      antwortB: "ROLLBACK",
      richtig: "A",
      feedbackRichtig:
        "Richtig! COMMIT schließt die Transaktion ab und übernimmt alle Änderungen dauerhaft. ROLLBACK verwirft dagegen die Änderungen seit Beginn der Transaktion.",
      feedbackFalsch:
        "Achte auf macht die Änderungen dauerhaft. Der Befehl, der die Änderungen wieder verwirft, ist hier nicht gesucht.",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welcher Befehl verwirft alle noch nicht bestätigten Änderungen einer Transaktion und stellt den vorherigen Zustand wieder her?",
      antwortA: "COMMIT",
      antwortB: "ROLLBACK",
      richtig: "B",
      feedbackRichtig:
        "Genau! ROLLBACK macht die Änderungen seit Beginn der Transaktion rückgängig. COMMIT bestätigt sie dagegen und macht sie dauerhaft.",
      feedbackFalsch:
        "Gefragt ist das Zurücksetzen auf den früheren Zustand. Der Befehl, der Änderungen bestätigt und festschreibt, tut das Gegenteil.",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welcher Befehl kann mit einer WHERE-Bedingung gezielt nur bestimmte Zeilen einer Tabelle entfernen?",
      antwortA: "TRUNCATE",
      antwortB: "DELETE",
      richtig: "B",
      feedbackRichtig:
        "Richtig! DELETE entfernt Zeilen und lässt sich mit WHERE auf einzelne Datensätze einschränken. TRUNCATE kennt keine WHERE-Bedingung und leert immer die gesamte Tabelle.",
      feedbackFalsch:
        "Achte auf die Auswahl bestimmter Zeilen per Bedingung. Der Befehl, der immer den gesamten Tabelleninhalt entfernt, bietet diese Möglichkeit nicht.",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welcher Befehl entzieht einem Benutzer zuvor vergebene Zugriffsrechte auf ein Datenbankobjekt?",
      antwortA: "REVOKE",
      antwortB: "GRANT",
      richtig: "A",
      feedbackRichtig:
        "Richtig! REVOKE nimmt vergebene Rechte wieder zurück. GRANT vergibt dagegen Rechte an Benutzer oder Rollen.",
      feedbackFalsch:
        "Gefragt ist das Wegnehmen von Rechten. Der Befehl, der Rechte erst erteilt, passt dazu nicht.",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welcher Begriff bezeichnet eine zusätzliche Datenstruktur, die Suchzugriffe auf bestimmte Spalten beschleunigt?",
      antwortA: "Index",
      antwortB: "Primärschlüssel",
      richtig: "A",
      feedbackRichtig:
        "Genau! Ein Index ist ein zusätzlicher Zugriffspfad, der Suchen und Sortierungen beschleunigt. Der Primärschlüssel dient dagegen der eindeutigen Identifikation der Datensätze und ist eine Integritätsregel, keine Beschleunigungsstruktur.",
      feedbackFalsch:
        "Achte auf zusätzliche Datenstruktur zur Beschleunigung der Suche. Das Merkmal, das einen Datensatz eindeutig kennzeichnet, ist etwas anderes.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu SQL und Datenmodellierung gelöst. Du kannst jetzt besser unterscheiden, welcher Fachbegriff zu welcher Beschreibung passt.",
};
