import type { InstrumentLernpfadPayload } from "@edukedo/shared";

/**
 * OSI-Modell-Instrumenten-Lernpfad (Fachinformatiker/in) mit dem fiktiven Fallbeispiel Brevanta IT-Systemhaus GmbH.
 * Fachliche Grundlage: content/fachinformatiker-anwendungsentwicklung/fu3/3.1-netzwerkgrundlagen.md (Theorie und die
 * geprüften OSI-Zuordnungsfragen). Bewusst ohne Grenzfälle wie ARP oder TLS, die sich nicht eindeutig einer Schicht zuordnen
 * lassen. Alle Texte innerhalb einer Station bzw. Runde sind eindeutig, weil die Prüfung Elemente über ihren Text identifiziert.
 */

const SCHICHTEN = [
  { key: "anwendung", label: "Schicht 7: Anwendung" },
  { key: "darstellung", label: "Schicht 6: Darstellung" },
  { key: "sitzung", label: "Schicht 5: Sitzung" },
  { key: "transport", label: "Schicht 4: Transport" },
  { key: "vermittlung", label: "Schicht 3: Vermittlung" },
  { key: "sicherung", label: "Schicht 2: Sicherung" },
  { key: "bituebertragung", label: "Schicht 1: Bitübertragung" },
];

export const osiBrevantaLernpfad: InstrumentLernpfadPayload = {
  organisation: "Brevanta IT-Systemhaus GmbH",
  vision:
    "Wir erkennen Netzwerkstörungen bei unseren Kunden schnell und systematisch – Schicht für Schicht – und sorgen so für verlässlich erreichbare Systeme.",
  fallbeispielIntro:
    "Ich arbeite mit dem fiktiven Unternehmen Brevanta IT-Systemhaus GmbH. Es beschäftigt rund 220 Menschen in den Bereichen Softwareentwicklung für Kunden, Systemintegration und Managed Services, Datenanalyse sowie IoT-Vernetzung. Im Managed-Services-Team betreue ich gemeinsam mit Lena und Tarek den Kunden Nordlicht Logistik AG. Dort meldet ein Lagerstandort, dass die Webanwendung nicht erreichbar ist. Mit Hilfe des OSI-Modells grenzen wir das Problem Schicht für Schicht ein. Alle Fälle und Adressen sind erfundene Übungsbeispiele.",

  stationsnamen: {
    grundlagenfragen: "Grundlagen",
    strukturErkennen: "Schichten erkennen",
    zieleZuordnen: "Schichten zuordnen",
    messbareZieleZuordnen: "Zuordnen vertiefen",
    massnahmenWahl: "Fehler eingrenzen",
    zusammenhaenge: "Zusammenhänge",
    wirkungsketten: "Abläufe sortieren",
  },

  grundlagenfragen: {
    intro:
      "Ich sehe eine Frage nach der anderen. Oben steht zum Beispiel „Frage 1 von 3“. Nach meiner Auswahl tippe ich auf „Antwort prüfen“. Wenn meine Antwort noch nicht passt, lese ich eine Erklärung und kann erneut wählen.",
    questions: [
      {
        prompt: "Wie viele Schichten hat das OSI-Modell und wofür nutzt Brevanta es vor allem? Wähle genau eine Antwort.",
        options: [
          {
            text: "Vier Schichten; es beschreibt die tatsächlich im Internet genutzten Protokolle.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Vier Schichten hat das TCP/IP-Modell, das die im Internet genutzten Protokolle beschreibt. Versuch es gern noch einmal.",
          },
          {
            text: "Sieben Schichten; es hilft beim gemeinsamen Verständnis und bei der Fehlersuche.",
            isCorrect: true,
            feedback: "Genau! Das OSI-Modell zerlegt die Kommunikation in sieben Schichten. So kann das Team ein Problem gezielt eingrenzen.",
          },
          {
            text: "Sieben Schichten; es schreibt vor, welche Hersteller welche Geräte bauen dürfen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das OSI-Modell ist ein Referenzmodell zum Verstehen von Kommunikation, keine Vorgabe für Hersteller.",
          },
          {
            text: "Zwei Schichten: eine für Hardware und eine für Software.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Das OSI-Modell unterscheidet deutlich feiner, nämlich in sieben Schichten.",
          },
        ],
      },
      {
        prompt:
          "Ich lese im Team-Wiki von Brevanta: „Beim Senden durchläuft ein Datenpaket die Schichten von oben nach unten und wird dabei Schicht für Schicht um Steuerinformationen ergänzt.“ Ist diese Aussage wahr oder falsch?",
        options: [
          {
            text: "Wahr",
            isCorrect: true,
            feedback:
              "Genau! Dieses Ergänzen von Steuerinformationen nennt man Kapselung. Beim Empfänger geschieht das Umgekehrte.",
          },
          {
            text: "Falsch",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Beim Senden läuft das Paket tatsächlich von der Anwendung nach unten bis zur Bitübertragung und erhält dabei auf jeder Schicht zusätzliche Steuerinformationen. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        prompt: "Lena erklärt mir das OSI-Modell. Welche zwei Aussagen stimmen? Wähle genau zwei Antworten.",
        options: [
          {
            text: "Jede Schicht erbringt Dienste für die darüberliegende Schicht und nutzt die der darunterliegenden.",
            isCorrect: true,
            feedback: "Genau! So bauen die Schichten aufeinander auf.",
          },
          {
            text: "Ein klassischer Switch arbeitet auf Schicht 2, ein Router auf Schicht 3.",
            isCorrect: true,
            feedback: "Genau! Der Switch entscheidet anhand von MAC-Adressen, der Router anhand von IP-Adressen.",
          },
          {
            text: "Die Bitübertragung ist die oberste Schicht des Modells.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Die Bitübertragung ist die unterste Schicht (Schicht 1), die Anwendung die oberste (Schicht 7).",
          },
          {
            text: "Ein Router entscheidet anhand von MAC-Adressen über den Weg in andere Netze.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Router leiten Pakete anhand von IP-Adressen weiter. MAC-Adressen sind für das lokale Netzsegment wichtig.",
          },
        ],
      },
    ],
  },

  strukturErkennen: {
    prompt: "Welche dieser Begriffe sind Schichten des OSI-Modells? Ziehe die passenden Begriffe in die freien Felder.",
    rounds: [
      {
        correctCount: 5,
        items: [
          {
            text: "Darstellung",
            correct: true,
            feedback: "Genau, die Darstellungsschicht (Schicht 6) kümmert sich um Datenformate, Kodierung und Verschlüsselung.",
          },
          {
            text: "Netzzugang",
            correct: false,
            feedback:
              "Das ist eine Schicht des TCP/IP-Modells. Sie entspricht etwa den OSI-Schichten 1 und 2, ist aber selbst keine OSI-Schicht.",
          },
          {
            text: "Sitzung",
            correct: true,
            feedback: "Genau, die Sitzungsschicht (Schicht 5) steuert Auf- und Abbau von Sitzungen.",
          },
          {
            text: "Vermittlung",
            correct: true,
            feedback: "Genau, die Vermittlungsschicht (Schicht 3) ist für IP-Adressen und Routing zuständig.",
          },
          {
            text: "Internet",
            correct: false,
            feedback:
              "Das ist der Name einer Schicht im TCP/IP-Modell. Im OSI-Modell entspricht ihr ungefähr die Vermittlungsschicht.",
          },
          {
            text: "Sicherung",
            correct: true,
            feedback: "Genau, die Sicherungsschicht (Schicht 2) arbeitet mit MAC-Adressen und Frames.",
          },
          {
            text: "Sicherheitsschicht",
            correct: false,
            feedback:
              "Eine Schicht mit diesem Namen gibt es im OSI-Modell nicht. Verwechsle sie nicht mit der Sicherungsschicht (Schicht 2).",
          },
          {
            text: "Bitübertragung",
            correct: true,
            feedback: "Genau, die Bitübertragung (Schicht 1) umfasst Kabel, Funk und Signale.",
          },
        ],
      },
    ],
  },

  zieleZuordnen: {
    prompt: "Welche Aufgabe gehört zu welcher Schicht? Ziehe jedes Beispiel unter die passende Schicht des OSI-Modells.",
    zones: SCHICHTEN,
    items: [
      { text: "Ein Browser sendet eine HTTP-Anfrage an einen Webserver.", zoneKey: "anwendung" },
      { text: "Zeichensätze und Datenformate werden so umgewandelt, dass beide Seiten die Daten gleich lesen.", zoneKey: "darstellung" },
      { text: "Eine Kommunikationsbeziehung zwischen zwei Anwendungen wird aufgebaut und wieder beendet.", zoneKey: "sitzung" },
      { text: "TCP bestätigt den Empfang der Daten und wiederholt verlorene Teile.", zoneKey: "transport" },
      { text: "Ein Router leitet ein Paket anhand der Ziel-IP-Adresse in ein anderes Netz.", zoneKey: "vermittlung" },
      { text: "Ein Switch leitet einen Ethernet-Rahmen anhand der MAC-Adresse an den richtigen Port.", zoneKey: "sicherung" },
      { text: "Elektrische Signale laufen über ein Kupferkabel.", zoneKey: "bituebertragung" },
    ],
    correctFeedback: "Genau, dieses Beispiel gehört zu dieser Schicht.",
    wrongFeedback: "Das Beispiel passt noch besser zu einer anderen Schicht. Überlege, womit sich diese Schicht beschäftigt: mit Signalen, Rahmen, Paketen, Verbindungen oder Daten?",
  },

  messbareZieleZuordnen: {
    prompt: "Welche Protokolle, Geräte, Adressen und Fehlerbilder gehören zu welcher Schicht? Ordne die angezeigten Begriffe zu.",
    zones: SCHICHTEN,
    kernAnzahlProZone: 2,
    rundengroesse: 4,
    correctFeedback: "Genau. Dieser Begriff gehört zu dieser Schicht.",
    wrongFeedback: "Das passt hier noch nicht. Überlege, auf welcher Schicht dieses Protokoll, Gerät oder Fehlerbild hauptsächlich arbeitet.",
    pool: [
      // Anwendung
      { text: "DNS-Abfrage nach der IP-Adresse eines Namens", zoneKey: "anwendung" },
      { text: "SMTP beim Mailversand", zoneKey: "anwendung" },
      { text: "DHCP-Zuweisung von IP-Adresse und Gateway", zoneKey: "anwendung" },
      { text: "Der Webserver antwortet mit dem Statuscode 404 Not Found", zoneKey: "anwendung" },
      { text: "HTTP-Anfrage eines Browsers", zoneKey: "anwendung" },
      { text: "SSH für verschlüsselten Fernzugriff", zoneKey: "anwendung" },
      // Darstellung
      { text: "Umlaute erscheinen wegen falscher Zeichenkodierung als Sonderzeichen", zoneKey: "darstellung" },
      { text: "Umwandlung von Zeichensätzen", zoneKey: "darstellung" },
      { text: "Einheitliche Datenformate zwischen Sender und Empfänger", zoneKey: "darstellung" },
      { text: "Verschlüsselung der Nutzdaten", zoneKey: "darstellung" },
      { text: "Der Zeichensatz UTF-8 für Texte", zoneKey: "darstellung" },
      // Sitzung
      { text: "Aufbau einer Sitzung zwischen zwei Anwendungen", zoneKey: "sitzung" },
      { text: "Abbau einer Sitzung nach Ende des Datenaustauschs", zoneKey: "sitzung" },
      { text: "Synchronisationsmarke als Wiederaufsetzpunkt", zoneKey: "sitzung" },
      { text: "Fortsetzen einer abgebrochenen Dateiübertragung an der letzten Marke", zoneKey: "sitzung" },
      { text: "Dialogsteuerung zwischen zwei Kommunikationspartnern", zoneKey: "sitzung" },
      // Transport
      { text: "TCP mit Bestätigungen und erneuter Übertragung", zoneKey: "transport" },
      { text: "UDP-Datagramm ohne Zustellgarantie", zoneKey: "transport" },
      { text: "Portnummer 443, mit der ein Dienst unterschieden wird", zoneKey: "transport" },
      { text: "Firewall-Regel blockiert den Port 443", zoneKey: "transport" },
      { text: "Fehlerkorrektur durch Wiederholung der Übertragung", zoneKey: "transport" },
      { text: "Portnummern von 0 bis 65535", zoneKey: "transport" },
      // Vermittlung
      { text: "IPv4-Adresse 192.168.10.25", zoneKey: "vermittlung" },
      { text: "Router, der verschiedene Netze verbindet", zoneKey: "vermittlung" },
      { text: "Falsch eingetragenes Standardgateway", zoneKey: "vermittlung" },
      { text: "ICMP-Echo-Anfrage (Ping)", zoneKey: "vermittlung" },
      { text: "Subnetzmaske 255.255.255.0 (/24)", zoneKey: "vermittlung" },
      { text: "Weiterleiten von Paketen über Netzgrenzen (Routing)", zoneKey: "vermittlung" },
      { text: "IPv6-Adresse 2001:db8::1", zoneKey: "vermittlung" },
      // Sicherung
      { text: "MAC-Adresse einer Netzwerkschnittstelle", zoneKey: "sicherung" },
      { text: "Klassischer Layer-2-Switch", zoneKey: "sicherung" },
      { text: "Ethernet-Rahmen (Frame) innerhalb eines Netzsegments", zoneKey: "sicherung" },
      { text: "Zwei Geräte im selben Segment haben dieselbe MAC-Adresse", zoneKey: "sicherung" },
      { text: "Gezielte Weiterleitung eines Frames an den richtigen Switchport", zoneKey: "sicherung" },
      { text: "48 Bit lange Hardware-Adresse, hexadezimal geschrieben", zoneKey: "sicherung" },
      // Bitübertragung
      { text: "Cat-6-Patchkabel", zoneKey: "bituebertragung" },
      { text: "Hub, der Signale nur weitergibt", zoneKey: "bituebertragung" },
      { text: "Elektrische Signale auf einem Kupferkabel", zoneKey: "bituebertragung" },
      { text: "Die Link-LED am Switchport leuchtet wegen eines stark geknickten Kabels nicht", zoneKey: "bituebertragung" },
      { text: "Funksignale eines WLANs", zoneKey: "bituebertragung" },
      { text: "Lichtsignale in einem Glasfaserkabel", zoneKey: "bituebertragung" },
    ],
  },

  massnahmenWahl: {
    prompt: "Welche zwei Prüfschritte passen zur Situation? Ziehe die passenden Schritte in die freien Felder.",
    rounds: [
      {
        context:
          "Nordlicht Logistik AG, Lagerstandort: Die Link-LED am Switchport des Lager-PCs leuchtet nicht. Das Patchkabel ist stark geknickt. Die Webanwendung ist nicht erreichbar.",
        correctCount: 2,
        items: [
          {
            text: "Das Patchkabel auf Knicke und Beschädigungen prüfen und gegen ein intaktes Kabel tauschen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Ohne funktionierendes Kabel und Signal kann keine höhere Schicht arbeiten.",
          },
          {
            text: "Das Kabel an einem anderen Switchport anstecken, um Kabel und Port voneinander zu trennen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! So lässt sich eingrenzen, ob Kabel oder Port die Ursache ist.",
          },
          {
            text: "Den Statuscode der Webanwendung auswerten.",
            correct: false,
            feedback:
              "Das war leider noch nicht der passende Prüfschritt. Ohne Link-Signal erreicht keine Anfrage den Webserver. Die Ursache liegt zuerst weiter unten.",
          },
          {
            text: "Die Zeichenkodierung der Webseite kontrollieren.",
            correct: false,
            feedback: "Das passt hier noch nicht. Die Kodierung spielt erst eine Rolle, wenn überhaupt Daten ankommen. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        context:
          "Nordlicht Logistik AG: Zwei Geräte im selben Lagersegment stören sich gegenseitig. Verbindungen brechen unregelmäßig ab. Die Kabel sind in Ordnung und die Link-LEDs leuchten.",
        correctCount: 2,
        items: [
          {
            text: "Die MAC-Adressen der Geräte im Segment vergleichen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Eine doppelte MAC-Adresse im selben Segment stört die Zustellung von Frames.",
          },
          {
            text: "Die MAC-Adresstabelle des Switches ansehen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Ein klassischer Switch entscheidet anhand von MAC-Adressen, an welchen Port er einen Frame sendet.",
          },
          {
            text: "Die Firewall-Regeln für den Port 443 prüfen.",
            correct: false,
            feedback:
              "Das war leider noch nicht der passende Prüfschritt. Ports und Firewall-Regeln gehören zur Transportschicht. Das Fehlerbild weist auf die Sicherungsschicht.",
          },
          {
            text: "Den Eintrag des Standardgateways am Router ändern.",
            correct: false,
            feedback:
              "Das passt hier noch nicht. Die Geräte stören sich im selben Segment, ein Gateway wird dafür gar nicht benötigt.",
          },
        ],
      },
      {
        context:
          "Nordlicht Logistik AG: Der Lager-PC erreicht Geräte im eigenen Subnetz, aber keine Ziele in anderen Netzen. Als Standardgateway ist eine falsche Adresse eingetragen.",
        correctCount: 2,
        items: [
          {
            text: "Die IP-Konfiguration mit Subnetzmaske und Standardgateway am Lager-PC prüfen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Pakete in andere Netze gehen an das Standardgateway. Eine falsche Adresse stoppt sie dort.",
          },
          {
            text: "Mit ping testen, ob das Standardgateway und ein Ziel in einem anderen Netz antworten.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Der Ping über ICMP zeigt, bis wohin die Pakete kommen.",
          },
          {
            text: "Das Patchkabel austauschen.",
            correct: false,
            feedback:
              "Das war leider noch nicht der passende Prüfschritt. Der Lager-PC erreicht ja Geräte im eigenen Subnetz, Kabel und Signal funktionieren also.",
          },
          {
            text: "Die Zeichenkodierung der Anwendung ändern.",
            correct: false,
            feedback: "Das passt hier noch nicht. Die Kodierung hat nichts mit der Weiterleitung in andere Netze zu tun.",
          },
        ],
      },
      {
        context:
          "Nordlicht Logistik AG: Ein Ping zum Webserver kommt an, die Verbindung zur Webanwendung scheitert aber. Verdacht: Die Firewall blockiert den Port 443.",
        correctCount: 2,
        items: [
          {
            text: "Prüfen, ob die Firewall-Regeln den Port 443 zum Webserver zulassen.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! Ein blockierter Port ist ein typisches Fehlerbild der Transportschicht.",
          },
          {
            text: "Testen, ob der Webdienst auf dem Server auf dem Port 443 erreichbar ist.",
            correct: true,
            feedback: "Ja, dieser Prüfschritt passt! So zeigt sich, ob der Dienst selbst antwortet oder die Verbindung unterwegs scheitert.",
          },
          {
            text: "Die MAC-Adressen im Segment vergleichen.",
            correct: false,
            feedback:
              "Das war leider noch nicht der passende Prüfschritt. Der Ping zeigt, dass Frames und Pakete ankommen. Die unteren Schichten sind offenbar in Ordnung.",
          },
          {
            text: "Das Standardgateway neu eintragen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Der Ping kommt an, das Gateway funktioniert also bereits.",
          },
        ],
      },
    ],
  },

  zusammenhaenge: {
    intro:
      "Ich beantworte fünf Multiple-Choice-Fragen nacheinander. Die Zahl der richtigen Antworten wird bei jeder Frage angezeigt. Fehlt eine passende Antwort, lese ich: „Eine mögliche Antwort fehlt noch. Prüfe, welche Schicht noch betroffen sein könnte.“",
    questions: [
      {
        prompt: "Am Lagerstandort leuchtet die Link-LED am Switchport nicht. Welche zwei Schlüsse sind sinnvoll?",
        options: [
          {
            text: "Die Ursache liegt zuerst im Bereich Kabel und Signal, also auf Schicht 1.",
            isCorrect: true,
            feedback: "Genau. Ohne Link-Signal kann auf den höheren Schichten nichts ankommen.",
          },
          {
            text: "Es ist sinnvoll, Kabel, Stecker und Port zu prüfen, bevor die IP-Konfiguration angesehen wird.",
            isCorrect: true,
            feedback: "Genau. Die Fehlersuche läuft sinnvollerweise von unten nach oben.",
          },
          {
            text: "Der Fehler liegt sicher in der Webanwendung auf Schicht 7.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ohne Link-Signal kommt keine Anfrage bei der Anwendung an. Sie ist daher nicht die erste Verdächtige.",
          },
          {
            text: "Die wahrscheinlichste Ursache ist eine falsche Zeichenkodierung.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die Kodierung ist erst relevant, wenn Daten überhaupt ankommen.",
          },
        ],
      },
      {
        prompt: "Ein Paket läuft über mehrere Router zum Ziel. Was gilt für die Adressen? Wähle eine Antwort.",
        options: [
          {
            text: "Die MAC-Adressen wechseln von Teilstrecke zu Teilstrecke, die IP-Adressen von Absender und Ziel bleiben erhalten.",
            isCorrect: true,
            feedback: "Genau. MAC-Adressen gelten nur im lokalen Netzsegment, IP-Adressen steuern den Weg über Netzgrenzen.",
          },
          {
            text: "Die MAC-Adressen von Absender und Ziel bleiben auf dem ganzen Weg gleich.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. MAC-Adressen sind nur im lokalen Netzsegment von Bedeutung und ändern sich an jedem Router.",
          },
          {
            text: "Die IP-Adresse des Absenders wird von jedem Switch ersetzt.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Ein klassischer Switch arbeitet auf Schicht 2 und verändert keine IP-Adressen.",
          },
          {
            text: "Es werden gar keine Adressen verwendet, nur Portnummern.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Ports unterscheiden Dienste. Für den Weg braucht es IP- und MAC-Adressen.",
          },
        ],
      },
      {
        prompt: "Tarek meldet: Ein Ping zum Webserver kommt an, die Webanwendung ist aber nicht erreichbar. Welche drei Aussagen sind plausibel?",
        options: [
          {
            text: "Die Schichten 1 bis 3 sind sehr wahrscheinlich in Ordnung, weil die Echo-Antworten ankommen.",
            isCorrect: true,
            feedback: "Genau. Der Ping zeigt, dass Signal, Frames und IP-Pakete funktionieren.",
          },
          {
            text: "Eine Firewall-Regel könnte den Port 443 blockieren.",
            isCorrect: true,
            feedback: "Genau. Ein blockierter Port ist ein typisches Fehlerbild der Transportschicht.",
          },
          {
            text: "Auch eine Störung des Webdienstes auf der Anwendungsschicht kommt in Betracht.",
            isCorrect: true,
            feedback: "Genau. Läuft der Dienst selbst nicht, hilft auch eine saubere Verbindung nicht.",
          },
          {
            text: "Das Patchkabel des Webservers ist sicher defekt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Bei einem defekten Kabel käme der Ping nicht an.",
          },
        ],
      },
      {
        prompt: "Die Seite ist erreichbar, aber Umlaute erscheinen als Sonderzeichen. Welche zwei Aussagen sind richtig?",
        options: [
          {
            text: "Das spricht für ein Problem bei der Zeichenkodierung auf der Darstellungsschicht.",
            isCorrect: true,
            feedback: "Genau. Sender und Empfänger interpretieren die Zeichen unterschiedlich.",
          },
          {
            text: "Kabel, IP-Konfiguration und Ports sind offenbar in Ordnung, denn die Seite wird ja angezeigt.",
            isCorrect: true,
            feedback: "Genau. Die unteren Schichten müssen funktionieren, sonst käme die Seite nicht an.",
          },
          {
            text: "Der Austausch des Switches löst das Problem.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Der Switch arbeitet auf Schicht 2 und beeinflusst die Zeichenkodierung nicht.",
          },
          {
            text: "Das Standardgateway muss geändert werden.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die Daten kommen ja an, die Weiterleitung funktioniert.",
          },
        ],
      },
      {
        prompt: "Jonas behauptet, ein Router arbeite hauptsächlich auf Schicht 2. Was entgegnet Lena? Wähle eine Antwort.",
        options: [
          {
            text: "Ein Router leitet Pakete anhand von IP-Adressen weiter und arbeitet deshalb auf Schicht 3.",
            isCorrect: true,
            feedback: "Genau. Die Vermittlungsschicht ist für IP-Adressierung und Routing zuständig.",
          },
          {
            text: "Ein Router arbeitet auf Schicht 4, weil er Portnummern auswertet.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ports gehören zur Transportschicht, ein Router entscheidet typischerweise anhand der IP-Adresse.",
          },
          {
            text: "Ein Router arbeitet auf Schicht 1, weil er Signale verstärkt.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Ein Router wertet Adressen aus und trifft Weiterleitungsentscheidungen. Das ist mehr als bloße Signalübertragung.",
          },
          {
            text: "Ein Router arbeitet auf Schicht 7, weil er DNS-Namen auflöst.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Namen auflösen ist Aufgabe von DNS, einem Anwendungsprotokoll, nicht die des Routers.",
          },
        ],
      },
    ],
  },

  wirkungsketten: {
    intro:
      "Ich sehe jeweils vier nummerierte freie Felder und gemischte Aussagen. Ich ziehe sie in die richtige Reihenfolge. Die Aufgabenstellung sagt mir, in welcher Richtung ich ordne.",
    tasks: [
      {
        prompt: "Lena sendet eine Anfrage an die Webanwendung. Sortiere den Weg der Nachricht durch die oberen Schichten von oben nach unten.",
        items: [
          "Anwendung: Die Webanwendung erzeugt die HTTP-Anfrage.",
          "Darstellung: Die Daten werden in ein vereinbartes Format kodiert.",
          "Sitzung: Die Kommunikationsbeziehung zum Server wird aufgebaut.",
          "Transport: TCP ergänzt die Portnummern.",
        ],
      },
      {
        prompt: "Tarek sucht systematisch nach der Störungsursache. Sortiere die Prüfschritte von unten nach oben.",
        items: [
          "Kabel und Link-LED am Switchport prüfen.",
          "MAC-Adressen im Segment prüfen.",
          "IP-Adresse, Subnetzmaske und Standardgateway prüfen.",
          "Port und Firewall-Regeln prüfen.",
        ],
      },
      {
        prompt: "Die Anfrage erreicht den Webserver bei Nordlicht. Sortiere die Verarbeitung beim Empfänger von unten nach oben.",
        items: [
          "Die Signale auf dem Kabel werden als Bits erkannt.",
          "Der Rahmen wird anhand der MAC-Adresse angenommen.",
          "Das Paket wird anhand der Ziel-IP-Adresse dem Server zugeordnet.",
          "Die Webanwendung verarbeitet die HTTP-Anfrage.",
        ],
      },
      {
        prompt: "Beim Absenden werden die Nutzdaten schrittweise gekapselt. Sortiere die Schritte in der Reihenfolge, in der sie beim Sender ablaufen.",
        items: [
          "Die Nutzdaten der HTTP-Anfrage liegen vor.",
          "TCP ergänzt Steuerinformationen mit Portnummern.",
          "IP ergänzt die Quell- und Ziel-IP-Adresse.",
          "Ethernet ergänzt die MAC-Adressen und bildet den Rahmen.",
        ],
      },
    ],
  },

  selbsteinschaetzungPrompt:
    "Wie sicher fühlst du dich jetzt im Umgang mit dem OSI-Modell? Wähle einen Wert von 0 bis 10. 0 bedeutet „gar nicht sicher“, 5 „teils/teils“ und 10 „sehr sicher“.",
};
