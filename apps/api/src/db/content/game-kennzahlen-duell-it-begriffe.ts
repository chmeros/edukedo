import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „IT-Grundlagen" für die Fachinformatiker/in-Kurse (Abschlussprüfung nach
 * FIAusbV): 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz,
 * bei dem zwei ähnliche Begriffe sicher unterschieden werden müssen. Technisch dasselbe
 * Spielformat wie das Kennzahlen-Duell (F-142, `KennzahlenDuellPayload`); im UI heißt das
 * Spiel durchgängig „Begriffe-Duell", nie bloß „Duell" (Abgrenzung zum F-61-Wissensduell).
 */
export const kennzahlenDuellItBegriffe: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Netzwerk und Protokolle",
      abschlussmeldung: "Runde 1 geschafft! Du kannst TCP und UDP, Router und Switch sowie DHCP und DNS sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Datenbanken und SQL",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest jetzt Primär- und Fremdschlüssel, HAVING und WHERE, INNER JOIN und LEFT JOIN sowie DELETE und DROP TABLE.",
    },
    {
      nummer: 3,
      titel: "Programmierung und Softwareentwicklung",
      abschlussmeldung:
        "Runde 3 geschafft! Du kannst nun Compiler und Interpreter, Klasse und Objekt, Stack und Queue sowie Black-Box- und White-Box-Test unterscheiden.",
    },
    {
      nummer: 4,
      titel: "IT-Sicherheit und Datenschutz",
      abschlussmeldung:
        "Runde 4 geschafft! Du kannst Vertraulichkeit und Integrität, symmetrische und asymmetrische Verschlüsselung, Hashing, Autorisierung sowie Backup und Archivierung unterscheiden.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage:
        "Welcher Begriff beschreibt ein verbindungsorientiertes Transportprotokoll, das mit Bestätigungen und erneuter Übertragung eine zuverlässige Zustellung in der richtigen Reihenfolge sicherstellt?",
      antwortA: "TCP",
      antwortB: "UDP",
      richtig: "A",
      feedbackRichtig:
        "Richtig! TCP baut eine Verbindung auf und sichert die Übertragung durch Bestätigungen und erneutes Senden verlorener Segmente ab. UDP ist dagegen verbindungslos und liefert keine Zustellgarantie.",
      feedbackFalsch:
        "Achte auf verbindungsorientiert und zuverlässig. Das Protokoll, das ohne Verbindungsaufbau und ohne Zustellgarantie auskommt, ist hier nicht gemeint.",
    },
    {
      nummer: 2,
      runde: 1,
      frage:
        "Welcher Begriff beschreibt ein verbindungsloses Transportprotokoll ohne Zustellgarantie, das dafür wenig Verwaltungsaufwand hat und z. B. bei Echtzeit-Übertragungen eingesetzt wird?",
      antwortA: "TCP",
      antwortB: "UDP",
      richtig: "B",
      feedbackRichtig:
        "Genau! UDP verschickt Datagramme ohne Verbindungsaufbau und ohne Bestätigung. Das spart Aufwand und Zeit, dafür kann etwas verloren gehen. TCP sichert die Zustellung dagegen ab.",
      feedbackFalsch:
        "Achte auf verbindungslos und ohne Zustellgarantie. Das Protokoll mit Verbindungsaufbau und Bestätigungen passt dazu nicht.",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welches Gerät verbindet unterschiedliche Netzwerke miteinander und leitet Datenpakete anhand der IP-Adresse des Ziels weiter?",
      antwortA: "Switch",
      antwortB: "Router",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Ein Router arbeitet auf der Vermittlungsschicht, verbindet verschiedene Netze und wählt anhand der Ziel-IP-Adresse den Weg. Ein Switch verbindet Geräte innerhalb eines lokalen Netzes und arbeitet klassisch mit MAC-Adressen.",
      feedbackFalsch:
        "Hier geht es um die Verbindung verschiedener Netze und die Weiterleitung anhand von IP-Adressen. Geräte innerhalb eines lokalen Netzes zu koppeln ist eine andere Aufgabe.",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welcher Dienst weist Geräten beim Netzbeitritt automatisch eine IP-Adresse und weitere Netzwerkeinstellungen zu?",
      antwortA: "DHCP",
      antwortB: "DNS",
      richtig: "A",
      feedbackRichtig:
        "Richtig! DHCP verteilt IP-Adressen und weitere Konfigurationsdaten automatisch an Clients. DNS übersetzt dagegen Namen in IP-Adressen.",
      feedbackFalsch:
        "Gefragt ist nach der automatischen Vergabe von Netzwerkeinstellungen, nicht nach der Auflösung von Namen.",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welcher Dienst löst einen Rechnernamen wie www.beispiel.de in die zugehörige IP-Adresse auf?",
      antwortA: "DHCP",
      antwortB: "DNS",
      richtig: "B",
      feedbackRichtig:
        "Genau! DNS ist das Namenssystem des Internets und ordnet Namen IP-Adressen zu. DHCP vergibt dagegen Adressen und Einstellungen an Geräte.",
      feedbackFalsch: "Hier geht es um die Übersetzung eines Namens in eine Adresse, nicht um die Vergabe von Adressen an Geräte.",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welcher Begriff bezeichnet ein Attribut (oder eine Attributkombination), das jeden Datensatz einer Tabelle eindeutig identifiziert?",
      antwortA: "Fremdschlüssel",
      antwortB: "Primärschlüssel",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Primärschlüssel identifiziert jeden Datensatz einer Tabelle eindeutig. Ein Fremdschlüssel verweist dagegen auf den Primärschlüssel einer Tabelle.",
      feedbackFalsch: "Gesucht ist das Merkmal, das einen Datensatz eindeutig kennzeichnet, nicht das Merkmal, das auf andere Daten verweist.",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welcher Begriff bezeichnet ein Attribut, das auf den Primärschlüssel einer Tabelle verweist und so eine Beziehung zwischen Datensätzen herstellt?",
      antwortA: "Fremdschlüssel",
      antwortB: "Primärschlüssel",
      richtig: "A",
      feedbackRichtig:
        "Genau! Ein Fremdschlüssel verweist auf den Primärschlüssel einer Tabelle und verknüpft damit Datensätze. Der Primärschlüssel selbst identifiziert Datensätze der eigenen Tabelle.",
      feedbackFalsch: "Achte auf verweist auf. Gesucht ist nicht das Merkmal, das einen Datensatz der eigenen Tabelle identifiziert.",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welche SQL-Klausel filtert Gruppen, nachdem GROUP BY die Datensätze gruppiert hat, z. B. anhand einer Bedingung auf COUNT(*)?",
      antwortA: "HAVING",
      antwortB: "WHERE",
      richtig: "A",
      feedbackRichtig:
        "Richtig! HAVING filtert die Gruppen nach der Gruppierung und kann Aggregatfunktionen verwenden. WHERE filtert dagegen einzelne Datensätze vor der Gruppierung.",
      feedbackFalsch: "Überlege, in welcher Reihenfolge gefiltert wird. Hier sollen bereits gebildete Gruppen gefiltert werden, nicht einzelne Datensätze.",
    },
    {
      nummer: 9,
      runde: 2,
      frage:
        "Welcher Join liefert alle Datensätze der linken Tabelle, auch wenn es in der rechten Tabelle keinen passenden Datensatz gibt (dort erscheinen dann NULL-Werte)?",
      antwortA: "INNER JOIN",
      antwortB: "LEFT JOIN",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der LEFT JOIN behält alle Datensätze der linken Tabelle und füllt fehlende Partner mit NULL. Der INNER JOIN liefert nur Datensätze, für die auf beiden Seiten ein passender Partner existiert.",
      feedbackFalsch: "Achte darauf, dass auch Datensätze ohne Partner in der Ergebnismenge bleiben sollen. Ein Join, der nur Treffer auf beiden Seiten liefert, passt dazu nicht.",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welcher SQL-Befehl entfernt Datensätze aus einer Tabelle, während die Tabelle selbst mit ihrer Struktur bestehen bleibt?",
      antwortA: "DELETE",
      antwortB: "DROP TABLE",
      richtig: "A",
      feedbackRichtig:
        "Richtig! DELETE löscht Datensätze, die Tabelle bleibt erhalten. DROP TABLE entfernt dagegen die gesamte Tabelle samt Struktur und Inhalt.",
      feedbackFalsch: "Gefragt ist nach dem Entfernen von Inhalten bei erhaltener Tabelle. Ein Befehl, der die Tabelle selbst aus der Datenbank entfernt, geht weiter.",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welcher Begriff bezeichnet ein Programm, das den gesamten Quellcode vor der Ausführung in Maschinen- oder Zielcode übersetzt?",
      antwortA: "Interpreter",
      antwortB: "Compiler",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Ein Compiler übersetzt den Quellcode als Ganzes vor der Ausführung. Ein Interpreter arbeitet den Quellcode dagegen zur Laufzeit Anweisung für Anweisung ab.",
      feedbackFalsch: "Achte auf vor der Ausführung und gesamten Quellcode. Eine Übersetzung während der Programmausführung ist etwas anderes.",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Welcher Begriff bezeichnet ein Programm, das den Quellcode erst zur Laufzeit Anweisung für Anweisung übersetzt und ausführt?",
      antwortA: "Interpreter",
      antwortB: "Compiler",
      richtig: "A",
      feedbackRichtig:
        "Genau! Ein Interpreter verarbeitet den Quellcode während der Ausführung schrittweise. Ein Compiler übersetzt dagegen den gesamten Quellcode im Voraus.",
      feedbackFalsch: "Achte auf zur Laufzeit und Anweisung für Anweisung. Eine vollständige Übersetzung im Voraus ist hier nicht gemeint.",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welcher Begriff bezeichnet in der objektorientierten Programmierung eine konkrete Instanz mit eigenen Attributwerten?",
      antwortA: "Klasse",
      antwortB: "Objekt",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Ein Objekt ist eine konkrete Instanz einer Klasse und hat eigene Attributwerte. Die Klasse ist dagegen der Bauplan, der Attribute und Methoden festlegt.",
      feedbackFalsch: "Gesucht ist nicht der Bauplan, sondern das, was nach diesem Bauplan konkret erzeugt wird.",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Datenstruktur arbeitet nach dem FIFO-Prinzip, bei dem das zuerst eingefügte Element auch zuerst wieder entnommen wird?",
      antwortA: "Queue",
      antwortB: "Stack",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Eine Queue (Warteschlange) arbeitet nach dem FIFO-Prinzip: first in, first out. Ein Stack arbeitet dagegen nach dem LIFO-Prinzip, das zuletzt abgelegte Element kommt zuerst wieder heraus.",
      feedbackFalsch: "Achte auf zuerst eingefügt, zuerst entnommen. Die Datenstruktur, bei der das zuletzt abgelegte Element zuerst herauskommt, passt dazu nicht.",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welcher Testansatz leitet Testfälle aus dem Wissen über den Quellcode und die interne Struktur des Programms ab?",
      antwortA: "White-Box-Test",
      antwortB: "Black-Box-Test",
      richtig: "A",
      feedbackRichtig:
        "Genau! Beim White-Box-Test sind der Quellcode und die interne Struktur bekannt und Grundlage der Testfälle. Beim Black-Box-Test wird nur das äußere Verhalten gegen die Anforderungen geprüft.",
      feedbackFalsch: "Überlege, welches Wissen die Testenden hier besitzen. Gefragt ist ein Ansatz, der die interne Struktur kennt und nutzt, nicht nur das äußere Verhalten.",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welches Schutzziel stellt sicher, dass Daten nicht unbemerkt verändert werden können?",
      antwortA: "Vertraulichkeit",
      antwortB: "Integrität",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Integrität bedeutet, dass Daten vollständig und unverändert bleiben bzw. Veränderungen erkennbar sind. Vertraulichkeit sorgt dagegen dafür, dass nur Berechtigte Daten einsehen können.",
      feedbackFalsch: "Hier geht es um Veränderungen an Daten, nicht darum, wer sie einsehen darf.",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welches Verfahren verwendet denselben Schlüssel zum Verschlüsseln und zum Entschlüsseln?",
      antwortA: "Symmetrische Verschlüsselung",
      antwortB: "Asymmetrische Verschlüsselung",
      richtig: "A",
      feedbackRichtig:
        "Genau! Bei der symmetrischen Verschlüsselung nutzen beide Seiten denselben geheimen Schlüssel. Die asymmetrische Verschlüsselung arbeitet dagegen mit einem Schlüsselpaar aus öffentlichem und privatem Schlüssel.",
      feedbackFalsch: "Achte auf denselben Schlüssel für beide Richtungen. Ein Verfahren mit einem Schlüsselpaar passt dazu nicht.",
    },
    {
      nummer: 18,
      runde: 4,
      frage:
        "Welches Verfahren berechnet aus beliebigen Daten einen Wert fester Länge, der sich praktisch nicht auf die ursprünglichen Daten zurückrechnen lässt?",
      antwortA: "Verschlüsselung",
      antwortB: "Hashing",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Eine Hashfunktion ist eine Einwegfunktion und liefert einen Wert fester Länge. Eine Verschlüsselung ist dagegen mit dem passenden Schlüssel umkehrbar.",
      feedbackFalsch: "Überlege, ob sich das Ergebnis wieder in die Ausgangsdaten zurückverwandeln lässt. Hier ist gerade keine Umkehrung vorgesehen.",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welcher Begriff beschreibt die Vergabe und Prüfung von Zugriffsrechten, nachdem die Identität einer Person feststeht?",
      antwortA: "Authentifizierung",
      antwortB: "Autorisierung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Autorisierung legt fest, was eine bereits identifizierte Person tun und einsehen darf. Die Authentifizierung prüft dagegen, ob jemand wirklich die Person ist, die er zu sein vorgibt.",
      feedbackFalsch: "Hier ist die Identität bereits geklärt. Gefragt ist, was danach erlaubt wird, nicht wie die Identität geprüft wird.",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welcher Begriff beschreibt das Anlegen von Datenkopien, um nach einem Datenverlust den Betrieb wiederherstellen zu können?",
      antwortA: "Backup",
      antwortB: "Archivierung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ein Backup dient der Wiederherstellung nach Datenverlust. Die Archivierung dient dagegen der langfristigen Aufbewahrung nicht mehr aktiv benötigter Daten, z. B. wegen Aufbewahrungsfristen.",
      feedbackFalsch: "Gefragt ist die Wiederherstellung nach einem Verlust, nicht die langfristige Aufbewahrung nicht mehr genutzter Daten.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu IT-Grundlagen gelöst. Du kannst jetzt besser unterscheiden, welcher Fachbegriff zu welcher Beschreibung passt.",
};
