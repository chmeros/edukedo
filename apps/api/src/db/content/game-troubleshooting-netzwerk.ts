import type { TroubleshootingPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Netzwerk-Troubleshooting-Detektiv" für die Fachinformatiker/in-Kurse
 * (zehn Störungsfälle der fiktiven Brevanta IT-Systemhaus GmbH bei Kunden, Schwierigkeit steigend).
 * Zwei Schritte je Fall: (1) Auf welcher Schicht liegt die Ursache? (2) Was ist die wahrscheinlichste Ursache?
 */
export const troubleshootingNetzwerk: TroubleshootingPayload = {
  faelle: [
    {
      nummer: 1,
      titel: "Notebook ohne Netzverbindung",
      szenario:
        "Du bist für die Brevanta IT-Systemhaus GmbH bei einem Kunden im Einsatz. Eine Mitarbeiterin meldet, dass ihr Notebook an der Netzwerkdose am Schreibtisch keinerlei Netzwerkzugriff hat. Gestern hat noch alles funktioniert.",
      symptome: [
        "Die Link-LED an der Netzwerkbuchse des Notebooks bleibt aus; Windows meldet „Netzwerkkabel wurde nicht angeschlossen“.",
        "Der Switch zeigt für den Port dieser Netzwerkdose den Status „down“.",
        "Mit einem anderen Notebook und demselben Patchkabel an derselben Dose bleibt die Link-LED ebenfalls aus.",
        "Mit einem neuen Patchkabel an derselben Dose leuchtet die Link-LED sofort und das Notebook erhält eine Adresse.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Bitübertragung (Schicht 1)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der DHCP-Server im Netz ist ausgefallen." },
        { id: "u2", text: "Der Switchport ist dem falschen VLAN zugeordnet." },
        { id: "u3", text: "Das Patchkabel zwischen Netzwerkdose und Notebook ist defekt." },
        { id: "u4", text: "Die Subnetzmaske des Notebooks ist falsch eingetragen." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Bottom-up beginnt bei Schicht 1: Ohne Link-LED und mit Portstatus „down“ besteht gar keine physische Verbindung. Dann kann weder ein DHCP-Problem, noch ein falsches VLAN oder eine falsche Subnetzmaske die Ursache sein, denn diese Fehler treten erst auf, wenn der Link steht. Dass ein zweites Notebook am selben Kabel ebenfalls keinen Link bekommt, schließt die Netzwerkkarte aus; das neue Patchkabel an derselben Dose beweist, dass Dose und Port in Ordnung sind. Maßnahme: das defekte Patchkabel ersetzen und es entsorgen oder kennzeichnen, damit es nicht wieder zum Einsatz kommt.",
    },
    {
      nummer: 2,
      titel: "Adresse beginnt mit 169.254",
      szenario:
        "Bei einem Kunden der Brevanta IT-Systemhaus GmbH wurden am Montagmorgen mehrere Arbeitsplätze neu gestartet. Seitdem kommt ein Teil der Rechner nicht mehr ins Firmennetz. Du untersuchst einen der betroffenen Rechner.",
      symptome: [
        "Link-LED leuchtet, der Switchport zeigt „up“ mit 1 Gbit/s.",
        "ipconfig /all: IPv4-Adresse 169.254.37.12, Subnetzmaske 255.255.0.0, kein Standardgateway; „DHCP aktiviert: Ja“.",
        "Mit einer fest eingetragenen Adresse aus 192.168.10.0/24 erreicht der Rechner Gateway und Server ohne Probleme.",
        "Auch andere neu gestartete Geräte im selben Netz erhalten nur Adressen aus 169.254.0.0/16.",
        "Auf dem Server steht der Dienst „DHCP-Server“ auf „Beendet“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Das Patchkabel des Rechners ist defekt." },
        { id: "u2", text: "Der DHCP-Dienst auf dem Server läuft nicht und beantwortet keine Anfragen." },
        { id: "u3", text: "Das Standardgateway ist falsch eingetragen." },
        { id: "u4", text: "Die Subnetzmaske wurde manuell falsch gesetzt." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Eine Adresse aus 169.254.0.0/16 (APIPA) vergibt sich der Client selbst, wenn er auf seine DHCP-Anfrage keine Antwort bekommt. Bottom-up: Link-LED und Portstatus sind in Ordnung (Schicht 1 scheidet aus), und mit fester Adresse läuft die Kommunikation bis zum Server (Schicht 2 und 3 funktionieren). Eine manuell falsche Maske oder ein falsches Gateway passt nicht, weil die Adresse automatisch vergeben werden sollte. Ursache ist der beendete DHCP-Dienst. DHCP ist ein Anwendungsprotokoll. Maßnahme: Dienst starten, Autostart prüfen und Ursache des Absturzes im Ereignisprotokoll suchen.",
    },
    {
      nummer: 3,
      titel: "Intranet nicht aufrufbar",
      szenario:
        "Ein Mitarbeiter eines Brevanta-Kunden erreicht das Intranet nicht mehr. Die Internetseiten externer Anbieter und die Netzlaufwerke dagegen funktionieren. Du nimmst dir seinen Rechner vor.",
      symptome: [
        "ping 192.168.10.30 (Intranet-Server) und ping 10.20.0.5 (Server in einem anderen Netz) funktionieren.",
        "Der Aufruf von https://192.168.10.30 im Browser zeigt die Intranetseite.",
        "ping intranet.kunde.example meldet „Ping-Anforderung konnte Host nicht finden“.",
        "nslookup intranet.kunde.example gegen den eingetragenen DNS-Server 192.168.10.5 endet mit „Zeitüberschreitung der Anforderung“; ping 192.168.10.5 funktioniert.",
        "nslookup intranet.kunde.example 192.168.10.6 liefert sofort 192.168.10.30.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Bitübertragung (Schicht 1)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Das Standardgateway ist falsch eingetragen." },
        { id: "u2", text: "Der Intranet-Server ist ausgefallen." },
        { id: "u3", text: "Eine Firewall blockiert TCP-Port 443 zum Intranet-Server." },
        { id: "u4", text: "Der eingetragene DNS-Server beantwortet keine Namensanfragen." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Die Schichten 1 bis 3 sind belegt: Pings auf IP-Adressen gelingen, auch in ein anderes Netz, also stimmt das Gateway. Der Intranet-Server läuft und ist per IP über HTTPS erreichbar, damit scheiden Serverausfall und eine Port-443-Sperre aus. Nur die Namensauflösung klappt nicht: Der DNS-Server 192.168.10.5 ist per Ping erreichbar, beantwortet aber keine Anfragen, der zweite DNS-Server dagegen schon. DNS ist ein Anwendungsprotokoll. Maßnahme: DNS-Dienst auf 192.168.10.5 prüfen und neu starten; kurzfristig den funktionierenden DNS-Server als bevorzugten Eintrag verteilen.",
    },
    {
      nummer: 4,
      titel: "Kein Zugriff auf das Servernetz",
      szenario:
        "Bei einem Kunden kann ein Arbeitsplatz die Dateiablage im Büro nutzen, erreicht aber die Anwendungsserver im Servernetz 10.20.0.0/24 nicht. Kolleg:innen am selben Switch haben dieses Problem nicht.",
      symptome: [
        "ipconfig: IPv4-Adresse 192.168.10.57, Subnetzmaske 255.255.255.0, Standardgateway 192.168.10.254.",
        "ping 127.0.0.1 und ping 192.168.10.20 (Fileserver im selben Netz) funktionieren.",
        "ping 192.168.10.254 und ping 10.20.0.5 (Anwendungsserver im Servernetz) laufen in eine Zeitüberschreitung; tracert 10.20.0.5 bricht schon beim ersten Hop ab.",
        "Ein Kollege am selben Switch erreicht 10.20.0.5 problemlos; sein Standardgateway ist 192.168.10.1.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Sicherung (Schicht 2)" },
        { id: "s2", text: "Anwendung (Schicht 7)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Der DNS-Server ist nicht erreichbar." },
        { id: "u2", text: "Als Standardgateway ist eine Adresse eingetragen, die im Netz nicht existiert." },
        { id: "u3", text: "Der Router zum Servernetz ist ausgefallen." },
        { id: "u4", text: "Die Netzwerkkarte des Rechners ist defekt." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Bottom-up: Der Ping auf 127.0.0.1 zeigt, dass der Netzwerkstack arbeitet. Der Ping auf den Fileserver im eigenen Netz belegt Link, Switch und Karte (Schicht 1 und 2) und schließt eine defekte Netzwerkkarte aus. Alles, was über das Gateway hinausgeht, scheitert, schon der erste Hop (192.168.10.254) antwortet nicht. Dass der Kollege über 192.168.10.1 das Servernetz erreicht, schließt einen ausgefallenen Router aus. Mit Pings auf IP-Adressen ist DNS nicht beteiligt. Ursache ist ein falsch (hier: statisch) eingetragenes Standardgateway auf Schicht 3. Maßnahme: Gateway auf 192.168.10.1 korrigieren oder die Adresskonfiguration wieder per DHCP beziehen.",
    },
    {
      nummer: 5,
      titel: "Instabile Verbindung im Besprechungsraum",
      szenario:
        "Im Besprechungsraum eines Brevanta-Kunden brechen Videokonferenzen ständig ab. Das Notebook ist laut Anzeige mit dem Firmen-WLAN verbunden und hat eine gültige Adresse, doch die Verbindung ist sehr unzuverlässig.",
      symptome: [
        "Das Notebook zeigt „Verbunden“, aber nur einen von fünf Balken: Signal etwa –78 dBm bei hohem Rauschpegel.",
        "ping 192.168.20.1 (Gateway) liefert im Wechsel Antworten und Zeitüberschreitungen: 30 % Paketverlust, Laufzeiten zwischen 4 und 900 ms.",
        "Ein per Kabel angeschlossener Rechner im selben Raum erreicht das Gateway ohne Paketverlust bei 1 ms.",
        "Eine WLAN-Analyse zeigt elf fremde Netze, die auf demselben 2,4-GHz-Kanal wie der Access Point des Kunden senden.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Transport (Schicht 4)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Vermittlung (Schicht 3)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Starke Funkstörungen durch viele Fremdnetze auf demselben Kanal beeinträchtigen die WLAN-Übertragung." },
        { id: "u2", text: "Das Standardgateway ist falsch eingetragen." },
        { id: "u3", text: "Der DNS-Server ist ausgefallen." },
        { id: "u4", text: "Der Switchport des Access Points ist dem falschen VLAN zugeordnet." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Die Ping-Ergebnisse sind nicht klar ja oder nein, sondern schwanken stark mit Paketverlust: Das Gateway ist also grundsätzlich richtig eingetragen und erreichbar (Schicht 3 passt), und ein falsches VLAN würde zu dauerhaftem Ausfall oder zu einer Adresse im falschen Netz führen. Pings auf IP-Adressen betreffen DNS nicht. Dass der Kabelrechner im selben Raum perfekte Werte erreicht, zeigt: Switch, Gateway und Server sind in Ordnung, das Problem liegt auf der Funkstrecke. Schwaches Signal, hoher Rauschpegel und elf Netze auf demselben Kanal sind Störungen der Bitübertragung (Schicht 1). Maßnahme: Kanal wechseln bzw. auf das 5-GHz-Band ausweichen, Sendeleistung und Access-Point-Standort prüfen.",
    },
    {
      nummer: 6,
      titel: "Nur ein Teil des Netzes erreichbar",
      szenario:
        "Nach der manuellen Einrichtung eines Arbeitsplatzes bei einem Brevanta-Kunden erreicht der Rechner nur einzelne Geräte. Du überprüfst die Konfiguration. Das Büronetz ist laut Dokumentation 192.168.10.0/24.",
      symptome: [
        "ipconfig: IPv4-Adresse 192.168.10.20, Subnetzmaske 255.255.255.240, Standardgateway 192.168.10.1.",
        "Link-LED leuchtet dauerhaft; ping 192.168.10.25 (Nachbarrechner am selben Switch) funktioniert ohne Paketverlust.",
        "ping 192.168.10.1 (Gateway) und ping 192.168.10.5 (Fileserver) enden mit „Zielhost nicht erreichbar“.",
        "Andere Rechner im Netz 192.168.10.0/24 mit der Maske 255.255.255.0 erreichen Gateway und Fileserver ohne Probleme.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Sicherung (Schicht 2)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der Switchport ist dem falschen VLAN zugeordnet." },
        { id: "u2", text: "Das Standardgateway ist ausgefallen." },
        { id: "u3", text: "Die Subnetzmaske ist zu klein gewählt (/28 statt /24)." },
        { id: "u4", text: "Das Patchkabel hat einen Wackelkontakt." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Mit der Maske 255.255.255.240 (/28) gehört der Rechner nur zum Teilnetz 192.168.10.16–31. Gateway (.1) und Fileserver (.5) liegen aus seiner Sicht in einem anderen Netz und müssten über ein Gateway erreicht werden, das selbst außerhalb des eigenen Teilnetzes liegt, deshalb „Zielhost nicht erreichbar“. Der Ping auf den Nachbarn .25 klappt, weil dieser im Teilnetz liegt: Das schließt Link, Kabelkontakt und VLAN aus (Schicht 1 und 2). Dass andere Rechner Gateway und Server erreichen, schließt ein ausgefallenes Gateway aus. Der Fehler liegt in der IP-Konfiguration auf Schicht 3. Maßnahme: Maske auf 255.255.255.0 korrigieren oder besser die Konfiguration per DHCP beziehen.",
    },
    {
      nummer: 7,
      titel: "Neue Dose in der Buchhaltung",
      szenario:
        "In der Buchhaltung eines Kunden wurde eine zusätzliche Netzwerkdose in Betrieb genommen. Das Notebook der Kollegin hat Internet, findet aber weder Fileserver noch Drucker der Abteilung. Die Buchhaltung nutzt laut Netzplan das VLAN 20 mit 192.168.20.0/24, das Gäste-VLAN 30 nutzt 192.168.30.0/24.",
      symptome: [
        "Link-LED leuchtet; ping 192.168.30.1 und der Aufruf von Webseiten im Internet funktionieren.",
        "ipconfig: IPv4-Adresse 192.168.30.47, Subnetzmaske 255.255.255.0, Standardgateway 192.168.30.1 (per DHCP vergeben).",
        "ping 192.168.20.5 (Fileserver) und der Zugriff auf den Abteilungsdrucker in 192.168.20.0/24 schlagen fehl; eine Kollegin an einer anderen Dose erreicht beide ohne Probleme.",
        "Die Portkonfiguration des Switches zeigt für diesen Port „Access-VLAN 30 (Gäste)“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der Switchport der Dose ist dem Gäste-VLAN 30 statt dem Buchhaltungs-VLAN 20 zugeordnet." },
        { id: "u2", text: "Der DHCP-Server vergibt eine falsche Subnetzmaske." },
        { id: "u3", text: "Der Fileserver ist ausgefallen." },
        { id: "u4", text: "Das Standardgateway ist falsch eingetragen." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Link und Adressvergabe funktionieren, also Schicht 1 und DHCP. Auffällig: Die Adresse 192.168.30.47 gehört zum Gäste-Netz, nicht zur Buchhaltung. Die Maske passt zu dieser Adresse, das Gateway 192.168.30.1 ist erreichbar und Internet geht, daher sind auch Maske und Gateway nicht falsch. Dass die Kollegin an einer anderen Dose Fileserver und Drucker erreicht, schließt einen Serverausfall aus. Entscheidend ist die Portkonfiguration: Der Port steht im falschen VLAN. VLANs sind eine Segmentierung auf Schicht 2. Maßnahme: den Port als Access-Port im VLAN 20 konfigurieren, die Adresse neu beziehen (ipconfig /renew) und die Änderung dokumentieren.",
    },
    {
      nummer: 8,
      titel: "Drucker mal da, mal nicht",
      szenario:
        "Seit gestern lässt sich der Netzwerkdrucker eines Brevanta-Kunden nur sporadisch ansprechen: Mal druckt es, mal erscheint „Drucker offline“. Der Drucker ist fest auf 192.168.10.45 konfiguriert; diese Adresse liegt im DHCP-Bereich 192.168.10.30–100 des Kunden.",
      symptome: [
        "Link-LEDs an Drucker, PC und Switch leuchten stabil; die Switchports zeigen keine Fehler und kein Ein- und Ausschalten des Links.",
        "ping 192.168.10.45: abwechselnd normale Antworten und Zeitüberschreitungen.",
        "arp -a zeigt für 192.168.10.45 abwechselnd zwei verschiedene MAC-Adressen.",
        "Auf einem Notebook erscheint die Meldung „Es wurde ein IP-Adresskonflikt erkannt“; der DHCP-Server hat 192.168.10.45 gestern an dieses Notebook vergeben.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Anwendung (Schicht 7)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Das Netzwerkkabel des Druckers hat einen Wackelkontakt." },
        { id: "u2", text: "Der DHCP-Server ist ausgefallen." },
        { id: "u3", text: "Zwei Geräte verwenden dieselbe IP-Adresse (Drucker und Notebook)." },
        { id: "u4", text: "Die Subnetzmaske des Druckers ist falsch eingestellt." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Stabile Link-LEDs und fehlerfreie Switchports sprechen gegen einen Kabel- oder Portfehler (Schicht 1), denn ein Wackelkontakt würde sich im Linkstatus und in Portfehlern zeigen. Die Antworten kommen, wenn auch wechselnd, die Subnetzmaske kann also nicht grundsätzlich falsch sein. Der DHCP-Server arbeitet: Er hat die Adresse ja gerade vergeben. Die zwei MAC-Adressen im ARP-Cache und die Meldung „IP-Adresskonflikt“ zeigen, dass zwei Geräte dieselbe Adresse nutzen; die Fehlerursache ist die IP-Adressierung (Schicht 3), auch wenn man sie an den MAC-Adressen im ARP-Cache erkennt. Maßnahme: Drucker-Adresse aus dem DHCP-Bereich ausnehmen oder per DHCP-Reservierung binden, Notebook neue Adresse zuweisen.",
    },
    {
      nummer: 9,
      titel: "Neue Anwendung nicht erreichbar",
      szenario:
        "Ein Kunde der Brevanta IT-Systemhaus GmbH hat eine neue Webanwendung auf dem Server 10.20.0.15 installieren lassen. Sie soll aus dem Büronetz unter https://app.kunde.example:8443 erreichbar sein, doch der Aufruf im Browser läuft nur in eine Zeitüberschreitung.",
      symptome: [
        "ping 10.20.0.15 funktioniert; nslookup app.kunde.example liefert 10.20.0.15.",
        "Test-NetConnection 10.20.0.15 -Port 8443 meldet „TcpTestSucceeded: False“, derselbe Test auf Port 443 des Servers meldet „True“.",
        "Auf dem Server zeigt netstat -an „TCP 0.0.0.0:8443 LISTENING“; direkt auf dem Server (localhost) lädt die Anwendung.",
        "Im Log der Firewall zwischen Büro- und Servernetz wird TCP/8443 vom Netz 192.168.10.0/24 zu 10.20.0.15 mit „Drop“ verworfen.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Bitübertragung (Schicht 1)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Anwendung (Schicht 7)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Der Anwendungsdienst läuft auf dem Server nicht." },
        { id: "u2", text: "Die Firewall zwischen Büro- und Servernetz lässt TCP-Port 8443 nicht durch." },
        { id: "u3", text: "Der DNS-Server liefert eine falsche Adresse für den Namen." },
        { id: "u4", text: "Das Standardgateway der Clients ist falsch eingetragen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Der Ping auf den Server gelingt, damit sind Verkabelung, Routing und Gateway in Ordnung (Schicht 1 bis 3). Der Name wird richtig aufgelöst, also ist DNS nicht die Ursache. Entscheidend ist der Portvergleich: Port 443 desselben Servers ist erreichbar, Port 8443 nicht, ein Routingfehler wäre für beide Ports gleich. Der Dienst lauscht lokal auf 8443 und die Anwendung lädt auf dem Server, er läuft also. Das Firewall-Log bestätigt das Verwerfen der Pakete auf TCP/8443. Portnummern gehören zur Transportschicht (Schicht 4). Maßnahme: Eine Freigaberegel für TCP/8443 vom Büronetz zum Server anlegen (so eng wie möglich) und die Änderung dokumentieren.",
    },
    {
      nummer: 10,
      titel: "Webshop zeigt Fehlerseite",
      szenario:
        "Der Webshop eines Brevanta-Kunden ist nach einem Update am Vorabend nicht mehr nutzbar. Der Browser zeigt statt der Startseite eine Fehlerseite des Servers, obwohl der Server selbst scheinbar läuft.",
      symptome: [
        "nslookup shop.kunde.example liefert die richtige Adresse 10.20.0.30; ping auf den Server funktioniert.",
        "Die TCP-Verbindung zu Port 443 kommt zustande (Test-NetConnection: „TcpTestSucceeded: True“); das Zertifikat ist gültig, der Browser zeigt keinen Zertifikatshinweis.",
        "curl -i https://shop.kunde.example/ liefert „HTTP/1.1 500 Internal Server Error“.",
        "Die statische Seite /impressum.html wird mit „200 OK“ ausgeliefert, alle Seiten mit Datenabfrage liefern „500“.",
        "Im Fehlerlog der Anwendung steht „Connection to database refused“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Transport (Schicht 4)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Eine Firewall blockiert TCP-Port 443." },
        { id: "u2", text: "Das TLS-Zertifikat des Servers ist abgelaufen." },
        { id: "u3", text: "Der DNS-Server löst den Namen falsch auf." },
        { id: "u4", text: "Die Webanwendung kann ihre Datenbank nicht erreichen und antwortet mit einem internen Serverfehler." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Bottom-up gibt es bis zur Anwendung keinen Fehler: Der Name wird richtig aufgelöst, der Ping kommt an und der Verbindungsaufbau auf Port 443 gelingt, weder DNS noch Firewall sind also schuld. Das Zertifikat ist gültig, ein Zertifikatsproblem scheidet aus. Der Server antwortet sogar mit einem HTTP-Statuscode, die 500 ist ein Fehler der Anwendung auf dem Server, nicht des Netzes. Statische Seiten laufen, nur Seiten mit Datenzugriff scheitern, und das Anwendungslog nennt die abgelehnte Datenbankverbindung. Maßnahme: Datenbankdienst und Zugangsdaten bzw. Verbindungseinstellungen nach dem Update prüfen, im Zweifel das Update zurückrollen.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zehn Störungsfälle gelöst. Dein Vorgehen: Arbeite von unten nach oben. Prüfe zuerst die Bitübertragung (Link-LED, Kabel, Funkqualität), dann die Sicherung (Switchport, VLAN), dann die Vermittlung (IP-Adresse, Maske, Gateway, Ping auf IP), danach den Transport (Ports, Firewall) und zuletzt die Anwendung (DNS, DHCP, Webserver). Jedes Symptom schließt eine Schicht und mehrere Ursachen aus. So grenzt du die Störung gezielt ein, statt zu raten.",
};
