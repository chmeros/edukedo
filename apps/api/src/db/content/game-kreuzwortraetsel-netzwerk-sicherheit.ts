import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * Kreuzworträtsel „Netzwerk und IT-Sicherheit" für die Fachinformatiker/in-Kurse (Abschlussprüfung
 * nach FIAusbV) — zweites Kreuzworträtsel-Set neben „IT-Fachbegriffe"; Format, Feldumfang und
 * Tonfall wie `game-kreuzwortraetsel-it-fachbegriffe.ts` bzw. `game-kreuzwortraetsel-finanzkennzahlen.ts`
 * (F-141). Fünf Begriffe aus dem Netzwerk-Bereich (SWITCH, BROADCAST, LATENZ, ROUTER, FIREWALL) und
 * fünf aus der IT-Sicherheit (SCHADSOFTWARE, VERSCHLUESSELUNG, PHISHING, PATCH, TROJANER).
 *
 * Das Gitter (startRow/startCol je Wort) wurde per Suchskript konstruiert und mit
 * `verifyCrosswordGrid` (game-logic.ts) sowie `kreuzwortraetselPayloadSchema` geprüft.
 * Aufbau: SCHADSOFTWARE (senkrecht, Spalte 3, Zeile 0–12) kreuzt PHISHING, PATCH, LATENZ und
 * FIREWALL (Zeilen 2/8/10/12); VERSCHLUESSELUNG (senkrecht, Spalte 21, Zeile 0–15) kreuzt SWITCH,
 * BROADCAST, ROUTER und TROJANER (Zeilen 4/9/11/14). Die beiden senkrechten Wörter kreuzen sich
 * bewusst nicht gegenseitig; alle waagerechten Wörter liegen je Gruppe in Zeilen mit Abstand ≥ 2,
 * kein Wort berührt ein anderes außer an den gewollten Kreuzungen.
 */
export const kreuzwortraetselNetzwerkSicherheit: KreuzwortraetselPayload = {
  woerter: [
    {
      nummer: 1,
      richtung: "senkrecht",
      startRow: 0,
      startCol: 3,
      hinweis:
        "Oberbegriff für Programme, die entwickelt wurden, um auf fremden Systemen unerwünschte oder schädliche Funktionen auszuführen.",
      tipp: "Viren und Würmer gehören dazu; das englische Kurzwort dafür lautet „Malware“.",
      loesung: "SCHADSOFTWARE",
      bestaetigung:
        "Genau! Schadsoftware (englisch Malware) ist Software, die gezielt entwickelt wurde, um Systeme oder Daten zu schädigen, auszuspähen oder unbefugt zu nutzen. Dazu zählen unter anderem Viren, Würmer und Trojaner; Schutz bieten Updates, Virenscanner und umsichtiges Verhalten.",
    },
    {
      nummer: 2,
      richtung: "senkrecht",
      startRow: 0,
      startCol: 21,
      hinweis:
        "Umwandlung lesbarer Daten in eine unlesbare Form mithilfe eines Verfahrens und eines Schlüssels, sodass nur Berechtigte sie wieder lesbar machen können.",
      tipp: "Das Gegenstück ist das Entschlüsseln; geschützt wird vor allem die Vertraulichkeit der Daten.",
      loesung: "VERSCHLUESSELUNG",
      bestaetigung:
        "Richtig! Bei der Verschlüsselung wird Klartext mit einem Verfahren und einem Schlüssel in einen Geheimtext überführt. Sie schützt die Vertraulichkeit von Daten bei Speicherung und Übertragung. Bei der symmetrischen Verschlüsselung nutzen beide Seiten denselben Schlüssel, bei der asymmetrischen ein Schlüsselpaar aus öffentlichem und privatem Schlüssel.",
    },
    {
      nummer: 3,
      richtung: "waagerecht",
      startRow: 2,
      startCol: 2,
      hinweis:
        "Betrugsversuch, bei dem Angreifer mit gefälschten E-Mails, Nachrichten oder Webseiten versuchen, an Zugangsdaten oder andere vertrauliche Informationen zu gelangen.",
      tipp: "Der Name klingt wie das englische „fishing“: Die Betrüger werfen einen Köder aus und warten, dass jemand anbeißt.",
      loesung: "PHISHING",
      bestaetigung:
        "Genau! Beim Phishing täuschen Angreifer eine vertrauenswürdige Absenderidentität vor, um Opfer zur Preisgabe von Zugangsdaten oder zum Öffnen schädlicher Links und Anhänge zu bewegen. Warnzeichen sind zum Beispiel Zeitdruck, ungewöhnliche Absenderadressen und Links, die auf fremde Domains führen.",
    },
    {
      nummer: 4,
      richtung: "waagerecht",
      startRow: 4,
      startCol: 17,
      hinweis:
        "Netzwerkgerät, das Datenpakete anhand der MAC-Adressen gezielt nur an den Anschluss weiterleitet, an dem der Empfänger angeschlossen ist; verbindet Geräte in einem lokalen Netz.",
      tipp: "Anders als ein Hub sendet er nicht an alle Anschlüsse, sondern lernt, welches Gerät an welchem Port hängt.",
      loesung: "SWITCH",
      bestaetigung:
        "Richtig! Ein Switch arbeitet typischerweise auf der Sicherungsschicht (Schicht 2 des OSI-Modells) und leitet Frames anhand der MAC-Adressen gezielt an den passenden Port weiter. Dadurch entstehen weniger Kollisionen als bei einem Hub, der jedes Signal an alle Anschlüsse sendet.",
    },
    {
      nummer: 5,
      richtung: "waagerecht",
      startRow: 8,
      startCol: 1,
      hinweis:
        "Kleines Softwareupdate, das einen bekannten Fehler oder eine bekannte Sicherheitslücke in einem Programm oder Betriebssystem behebt.",
      tipp: "Das englische Wort bedeutet „Flicken“.",
      loesung: "PATCH",
      bestaetigung:
        "Genau! Ein Patch behebt Fehler oder schließt Sicherheitslücken in bereits ausgelieferter Software. Zeitnahes Einspielen von Patches gehört zu den wichtigsten Maßnahmen der IT-Sicherheit, weil bekannte Schwachstellen sonst gezielt ausgenutzt werden.",
    },
    {
      nummer: 6,
      richtung: "waagerecht",
      startRow: 9,
      startCol: 14,
      hinweis:
        "Nachricht, die an alle Geräte innerhalb eines Netzsegments gleichzeitig gesendet wird, statt an einen einzelnen Empfänger.",
      tipp: "Der Begriff stammt aus dem Rundfunk; sein Gegenstück bei einzelnen Empfängern heißt Unicast.",
      loesung: "BROADCAST",
      bestaetigung:
        "Richtig! Ein Broadcast richtet sich an alle Geräte im selben Broadcast-Bereich (Broadcast-Domäne). Router leiten Broadcasts in der Regel nicht weiter, sodass sie auf das jeweilige Netzsegment begrenzt bleiben.",
    },
    {
      nummer: 7,
      richtung: "waagerecht",
      startRow: 10,
      startCol: 2,
      hinweis:
        "Zeitspanne, die ein Datenpaket für den Weg vom Sender zum Empfänger benötigt; wird meist als Verzögerung in Millisekunden angegeben.",
      tipp: "Nicht die Datenmenge pro Sekunde zählt, sondern die Verzögerung: Ein niedriger Wert bedeutet eine schnelle Reaktion, etwa beim Online-Spielen.",
      loesung: "LATENZ",
      bestaetigung:
        "Genau! Die Latenz ist die Verzögerung bei der Datenübertragung und wird meist in Millisekunden angegeben; der Ping-Befehl misst die Umlaufzeit. Sie ist von der Bandbreite zu unterscheiden: Eine hohe Bandbreite sagt nichts darüber aus, wie schnell das erste Paket ankommt.",
    },
    {
      nummer: 8,
      richtung: "waagerecht",
      startRow: 11,
      startCol: 17,
      hinweis:
        "Netzwerkgerät, das Datenpakete anhand der IP-Adressen zwischen verschiedenen Netzen weiterleitet und dabei den Weg zum Ziel bestimmt.",
      tipp: "Der Heimrouter verbindet dein Heimnetz mit dem Internet.",
      loesung: "ROUTER",
      bestaetigung:
        "Richtig! Ein Router arbeitet auf der Vermittlungsschicht (Schicht 3 des OSI-Modells) und leitet IP-Pakete anhand von Routingtabellen zwischen Netzen weiter. Dadurch trennt er auch Broadcast-Bereiche voneinander.",
    },
    {
      nummer: 9,
      richtung: "waagerecht",
      startRow: 12,
      startCol: 0,
      hinweis:
        "Sicherheitssystem (als Hard- oder Software), das den Datenverkehr zwischen Netzen oder Rechnern nach festgelegten Regeln erlaubt oder blockiert.",
      tipp: "Der Name stammt aus dem Brandschutz: Eine Mauer soll verhindern, dass sich ein Feuer ausbreitet.",
      loesung: "FIREWALL",
      bestaetigung:
        "Genau! Eine Firewall filtert den Netzwerkverkehr anhand von Regeln, etwa nach Adressen, Ports und Protokollen, und blockiert unerwünschte Verbindungen. Sie ist ein wichtiger Baustein, ersetzt aber weder Virenschutz noch Updates oder aufmerksames Verhalten.",
    },
    {
      nummer: 10,
      richtung: "waagerecht",
      startRow: 14,
      startCol: 16,
      hinweis:
        "Schadprogramm, das sich als nützliche oder harmlose Anwendung ausgibt, im Hintergrund aber schädliche Funktionen ausführt, etwa den Zugriff für Angreifer zu öffnen.",
      tipp: "Der Name stammt aus einer antiken Sage, in der ein vermeintliches Geschenk eine Stadt zu Fall brachte.",
      loesung: "TROJANER",
      bestaetigung:
        "Richtig! Ein Trojaner (Trojanisches Pferd) tarnt sich als nützliches Programm, enthält aber versteckte Schadfunktionen. Im Gegensatz zu Viren und Würmern vermehrt er sich nicht selbstständig, sondern verlässt sich darauf, dass Nutzer ihn selbst installieren oder ausführen.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und vergleiche die Bedeutung mit den übrigen Begriffen.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Begriffe aus Netzwerk und IT-Sicherheit erkannt und ihre Bedeutung wiederholt. Besonders wichtig: Achte auf Unterschiede wie Router und Switch oder Schadsoftware und Trojaner — sie klingen ähnlich oder hängen zusammen, meinen aber Verschiedenes.",
};
