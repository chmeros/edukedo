import type { TroubleshootingPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: Troubleshooting-Detektiv, Set „Switching und Routing" (setKey "switching-routing") für den Kurs
 * Fachinformatiker/in Systemintegration (zehn Störungsfälle an Switches und Routern der Kunden der fiktiven
 * Brevanta IT-Systemhaus GmbH, Schwierigkeit steigend).
 * Gleiche Mechanik wie das Netzwerk-Set: (1) Auf welcher Schicht liegt die Ursache? (2) Was ist die
 * wahrscheinlichste Ursache? Die Schichten sind dieselben wie dort (OSI-Schichten, von unten nach oben geprüft).
 * Die Beobachtungen stammen aus herstellerneutral gehaltenen Ausgaben von Switches, Routern und Endgeräten.
 */
export const troubleshootingSwitchingRouting: TroubleshootingPayload = {
  faelle: [
    {
      nummer: 1,
      titel: "Neuer Server erreicht andere Netze nicht",
      szenario:
        "In der Steuerkanzlei Rehfeld & Partner wurde ein neuer Terminalserver (ts02, Linux) mit fester Adresse im Servernetz VLAN 20 (10.20.0.96/28, Router-Schnittstelle 10.20.0.110) in Betrieb genommen. Die Arbeitsplätze im Büronetz VLAN 10 (10.20.0.0/26) erreichen ihn nicht, und er erreicht keine Geräte außerhalb seines Netzes.",
      symptome: [
        "Link-LED und Portstatus sind in Ordnung (1 Gbit/s, Vollduplex, keine Fehlerzähler); der Port gehört zum VLAN 20.",
        "ts02 hat die Adresse 10.20.0.105 mit der Maske 255.255.255.240; ping auf den Dateiserver 10.20.0.98 im selben Netz antwortet in unter 1 ms.",
        "ping auf einen Arbeitsplatz (10.20.0.20) und auf das Internet endet mit einer Zeitüberschreitung; die Arbeitsplätze erreichen die anderen Server im VLAN 20 ohne Probleme.",
        "ip route auf ts02 zeigt „default via 10.20.0.100“; ip neigh zeigt für 10.20.0.100 den Zustand FAILED.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Bitübertragung (Schicht 1)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Der Switchport von ts02 ist dem falschen VLAN zugeordnet." },
        { id: "u2", text: "Als Standardgateway ist 10.20.0.100 eingetragen, die Router-Schnittstelle hat aber die Adresse 10.20.0.110." },
        { id: "u3", text: "Der Router der Kanzlei ist ausgefallen." },
        { id: "u4", text: "Die Subnetzmaske von ts02 ist falsch eingetragen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Im eigenen Netz funktioniert die Kommunikation, daher sind Kabel, Port und VLAN in Ordnung (Schicht 1 und 2) und auch die Maske passt zu 10.20.0.96/28. Ziele außerhalb des Netzes gehen über das Standardgateway: Dort ist 10.20.0.100 eingetragen, eine Adresse, die niemand im Netz hat, daher bleibt der ARP-Eintrag FAILED. Ein ausgefallener Router würde alle Server im VLAN 20 treffen, die Arbeitsplätze erreichen die anderen aber. Das ist ein Fehler in der Adressierung (Schicht 3). Maßnahme: das Gateway auf 10.20.0.110 ändern (Tippfehler), danach Ping in andere Netze testen und die Adressliste prüfen.",
    },
    {
      nummer: 2,
      titel: "Drucker im Nachbarnetz nicht erreichbar",
      szenario:
        "Bei der Hansen Baustoffe GmbH erreicht ein Arbeitsplatz in der Verwaltung den Netzwerkdrucker nicht, den alle Kolleginnen und Kollegen problemlos nutzen. Das Verwaltungsnetz (VLAN 10) ist laut Netzplan 10.30.1.0/26 mit Gateway 10.30.1.1; der Drucker steht im Drucker-VLAN 30 (10.30.1.64/26) mit der Adresse 10.30.1.70.",
      symptome: [
        "Der Arbeitsplatz hat die feste Adresse 10.30.1.20 mit der Maske 255.255.255.0; das Gateway ist 10.30.1.1.",
        "ping 10.30.1.1 und ping 10.30.2.10 (Server in einem anderen Netz) funktionieren.",
        "ping 10.30.1.70 (Drucker) endet mit „Antwort von 10.30.1.20: Zielhost nicht erreichbar“; arp -a zeigt für 10.30.1.70 keinen Eintrag.",
        "Ein Kollege mit der Maske 255.255.255.192 an der Nachbardose erreicht den Drucker mit Ping und Druckauftrag sofort.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Bitübertragung (Schicht 1)" },
        { id: "s3", text: "Sicherung (Schicht 2)" },
        { id: "s4", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Der Drucker ist defekt." },
        { id: "u2", text: "Das Standardgateway des Arbeitsplatzes ist falsch eingetragen." },
        { id: "u3", text: "Eine Zugriffsliste auf dem Router blockiert den Zugriff auf das Drucker-VLAN." },
        { id: "u4", text: "Der Arbeitsplatz verwendet die falsche Subnetzmaske (/24 statt /26); er hält den Drucker für ein Gerät im eigenen Netz." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Der Drucker ist in Ordnung, denn der Kollege erreicht ihn. Gateway und andere Netze erreicht der Arbeitsplatz, also stimmen Gateway und Verbindung. Auffällig ist die Maske: Mit /24 liegt 10.30.1.70 im selben Netz wie 10.30.1.20, das Gerät sendet keine Anfrage an das Gateway, sondern fragt per ARP direkt nach dem Drucker. Der Drucker liegt aber hinter dem Router in einem anderen VLAN, und die ARP-Anfrage geht ins Leere, deshalb meldet Windows „Zielhost nicht erreichbar“ vom eigenen Rechner. Eine Zugriffsliste hätte den Kollegen ebenfalls getroffen. Das ist eine Frage der Adressierung (Schicht 3). Maßnahme: Maske auf 255.255.255.192 setzen, besser per DHCP vergeben und feste Eintragungen dokumentieren.",
    },
    {
      nummer: 3,
      titel: "Neuer Büroplatz landet im Gäste-WLAN-Netz",
      szenario:
        "Bei der Rotbuch Metallbau GmbH wurde ein Arbeitsplatz in einen anderen Raum verlegt und an die Dose 14 angeschlossen. Der Rechner erhält eine Adresse und kommt ins Internet, erreicht aber keinen Server und keine Netzlaufwerke. Das Büronetz ist laut Plan VLAN 10 (10.50.10.0/24); der Dateiserver steht im Servernetz (10.50.20.10).",
      symptome: [
        "Der Link ist aktiv (1 Gbit/s, Vollduplex), am Port gibt es keine Fehlerzähler.",
        "ipconfig zeigt die vom DHCP vergebene Adresse 10.50.40.87/24 mit Gateway 10.50.40.1; nach Plan müsste die Adresse aus 10.50.10.0/24 stammen.",
        "Der Zugriff auf Webseiten funktioniert, ping 10.50.20.10 (Dateiserver) endet mit einer Zeitüberschreitung; die Nachbarrechner an den Dosen 13 und 15 erreichen den Server.",
        "Die Portkonfiguration am Switch zeigt für Port 14: „access, VLAN 40 (Gäste)“; die Nachbarports 13 und 15 stehen auf „access, VLAN 10 (Büro)“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Transport (Schicht 4)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der Access-Port 14 ist dem falschen VLAN zugeordnet (Gäste-VLAN 40 statt Büro-VLAN 10)." },
        { id: "u2", text: "Der DHCP-Server vergibt fehlerhafte Adressen." },
        { id: "u3", text: "Die Firewall blockiert den Zugriff auf den Dateiserver." },
        { id: "u4", text: "Das Patchkabel des Arbeitsplatzes ist defekt." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Verbindung und Port sind fehlerfrei, das Kabel ist es also nicht. Der Rechner hat sich korrekt mit einer Adresse versorgt, aber aus dem Gäste-Netz 10.50.40.0/24: Der DHCP-Server vergibt je VLAN passende Adressen und arbeitet damit richtig, es ist kein Fehler des Servers. Eine Firewallregel gegen den Server würde die Nachbarrechner genauso treffen. Der Rechner hängt in einem anderen Layer-2-Netz als gedacht: Der Port wurde früher als Gästeport genutzt und blieb im VLAN 40. VLAN-Zuordnungen wirken auf Schicht 2. Maßnahme: Konfiguration des Switches sichern, Port 14 als Access-Port in VLAN 10 setzen, danach IP-Adresse erneuern, testen und die Portbeschriftung aktualisieren.",
    },
    {
      nummer: 4,
      titel: "Dose tot nach dem Notebook-Tausch",
      szenario:
        "In der Disposition der Spedition Rademacher GmbH wurde heute früh das Notebook eines Disponenten gegen ein Ersatzgerät getauscht. Seitdem ist an dieser Dose (Port 17 des Etagenswitches) keine Verbindung möglich; die Link-LED am Notebook bleibt dunkel, die LED am Switchport leuchtet orange.",
      symptome: [
        "Der Durchgangstest des Patchkabels und der Dose verläuft fehlerfrei; das Notebook funktioniert an einer anderen Dose problemlos.",
        "Der Portstatus am Switch lautet für Port 17: „err-disabled“.",
        "Das Switch-Protokoll enthält: „Port 17: Sicherheitsverletzung (Port-Security), neue MAC-Adresse 3C:52:82:A1:07:D4 gesehen, erlaubt: 1 (E0:4F:43:9B:11:20), Port wird abgeschaltet“.",
        "An Port 17 ist „maximal 1 MAC-Adresse“ eingestellt; die erlaubte Adresse gehört zum alten Notebook.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
        { id: "s5", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Das Patchkabel zwischen Dose und Notebook ist defekt." },
        { id: "u2", text: "Die Netzwerkkarte des Ersatznotebooks ist defekt." },
        { id: "u3", text: "Port-Security hat den Port abgeschaltet, weil eine nicht erlaubte MAC-Adresse (das Ersatznotebook) angeschlossen wurde." },
        { id: "u4", text: "Die Switchport-Hardware ist durch Überspannung beschädigt." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Dunkle Link-LED lässt zuerst an die Bitübertragung denken, doch Kabel und Dose sind getestet, und das Notebook läuft an einer anderen Dose, also ist auch die Netzwerkkarte in Ordnung. Der Switch selbst nennt den Grund: Port-Security erlaubt an diesem Port nur eine bestimmte MAC-Adresse; das Ersatzgerät hat eine andere, deshalb hat der Switch den Port in den Zustand err-disabled versetzt. Das ist gewolltes Verhalten zum Schutz vor unbefugten Geräten, es greift auf Schicht 2 (MAC-Adressen). Maßnahme: nach Rückfrage, dass das Gerät befugt ist, die erlaubte MAC-Adresse im Port-Security-Eintrag anpassen und den Port kontrolliert wieder aktivieren; Port-Security nicht abschalten, und Gerätewechsel künftig im Ticket vermerken.",
    },
    {
      nummer: 5,
      titel: "Server im Lager sehr langsam, Kabel unauffällig",
      szenario:
        "Bei der Maschinenbau Kolbe GmbH greifen die Lagerterminals seit zwei Wochen nur sehr langsam auf den Warenwirtschaftsserver zu: Dateikopien dauern ewig, Abfragen hängen. Damals wurde der Access-Switch im Lager getauscht; der Server (dbsrv01) ist an Port 8 des neuen Switches angeschlossen und läuft seit Jahren unverändert.",
      symptome: [
        "Eine Dateikopie zum Server erreicht etwa 3 MB/s statt der üblichen 90 MB/s; ping auf dbsrv01 zeigt 1 ms, aber 3 % Paketverlust.",
        "Switch, Port 8: „100 Mbit/s, Halbduplex“; Zähler: 4.311 Late Collisions und 18.204 CRC-Fehler, beide steigen.",
        "Die Netzwerkkarte des Servers ist fest auf „100 Mbit/s, Vollduplex“ eingestellt; die Ports am Switch stehen auf Autonegotiation.",
        "Das Kabel besteht den Kabeltest (Kategorie 6, bestanden); die Link-LED ist stabil, die Auslastung des Switchs liegt unter 5 %; andere Ports laufen mit 1 Gbit/s Vollduplex fehlerfrei.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
        { id: "s5", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s5",
      ursachenOptionen: [
        { id: "u1", text: "Das Netzwerkkabel zum Server ist defekt." },
        { id: "u2", text: "Duplex-Mismatch: Die Serverkarte ist fest auf Vollduplex gestellt, der Switchport verhandelt automatisch und fällt auf Halbduplex zurück." },
        { id: "u3", text: "Der Switch ist durch den Datenverkehr überlastet." },
        { id: "u4", text: "Auf dem Server läuft ein Programm, das die Netzwerkkarte auslastet." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Das Kabel besteht den Test, der Link ist stabil und andere Ports sind fehlerfrei: eine Überlast ist ausgeschlossen (unter 5 % Auslastung), und ein Programm auf dem Server würde den Port nicht auf Halbduplex bringen. Auffällig sind Late Collisions und CRC-Fehler bei 100 Mbit/s Halbduplex: Eine Seite ist fest auf Vollduplex eingestellt und sendet jederzeit, die andere hat sich per Autonegotiation auf Halbduplex eingestellt und erkennt Kollisionen, wo keine sein dürften. Wenn eine Seite fest konfiguriert ist, kann die andere den Duplex-Modus nicht aushandeln. Geschwindigkeit und Duplex-Modus gehören zu den Übertragungsparametern der physischen Verbindung. Maßnahme: beide Seiten auf Autonegotiation stellen (modern 1 Gbit/s), danach Zähler zurücksetzen und beobachten.",
    },
    {
      nummer: 6,
      titel: "Neues Scanner-VLAN nur an einem Switch erreichbar",
      szenario:
        "Die Hansen Baustoffe GmbH hat für Lagerscanner das VLAN 25 (10.30.25.0/24, Gateway 10.30.25.1 am Kernswitch SW-KERN) angelegt. Zwei Scanner an SW-HALLE im selben VLAN erreichen sich gegenseitig, aber weder das Gateway noch andere Netze. Alle anderen Geräte in der Halle arbeiten normal.",
      symptome: [
        "VLAN 25 existiert auf SW-HALLE und SW-KERN; die Scanner-Ports an SW-HALLE sind Access-Ports in VLAN 25, die Scanner haben korrekte Adressen und Gateway.",
        "Der Trunk zwischen SW-HALLE und SW-KERN ist aktiv (1 Gbit/s, Vollduplex), ohne Fehlerzähler; die VLANs 10 und 20 laufen darüber fehlerfrei.",
        "Erlaubte VLANs auf dem Trunk: SW-KERN: 1, 10, 20, 25, 99; SW-HALLE: 1, 10, 20, 99.",
        "show mac address-table vlan 25 auf SW-KERN zeigt die MAC-Adresse des Gateways, aber keine der Scanner.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Bitübertragung (Schicht 1)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Sicherung (Schicht 2)" },
        { id: "s4", text: "Transport (Schicht 4)" },
        { id: "s5", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Der Trunk-Link zwischen den Switches ist defekt." },
        { id: "u2", text: "Das VLAN 25 wurde auf SW-HALLE nicht angelegt." },
        { id: "u3", text: "Die Scanner haben ein falsches Standardgateway." },
        { id: "u4", text: "Eine Zugriffsliste auf dem Kernswitch blockiert das Scanner-Netz." },
        { id: "u5", text: "Das neue VLAN 25 fehlt in der Liste der erlaubten VLANs auf dem Trunk-Port von SW-HALLE." },
      ],
      richtigeUrsache: "u5",
      erklaerung:
        "Der Trunk ist in Ordnung (aktiv, fehlerfrei) und transportiert VLAN 10 und 20 ohne Probleme, also ist weder das Kabel noch der Link das Problem. Das VLAN 25 existiert auf beiden Switches. Dass sich die Scanner untereinander erreichen, zeigt, dass VLAN und Ports in der Halle stimmen. Die Adressen sind laut Beobachtung korrekt, und eine Zugriffsliste würde nicht dazu führen, dass die MAC-Adressen der Scanner nie auf SW-KERN ankommen. Entscheidend ist die Liste der erlaubten VLANs auf SW-HALLE: Frames des VLAN 25 werden dort nicht auf den Trunk gelegt. Das passiert auf Schicht 2. Maßnahme: Konfiguration sichern, VLAN 25 in die Liste des Trunks aufnehmen (hinzufügen, nicht die Liste ersetzen), prüfen und den VLAN-Plan aktualisieren.",
    },
    {
      nummer: 7,
      titel: "Neue Etage bekommt keine Adressen per DHCP",
      szenario:
        "Die Hausverwaltung Seeberg GmbH hat im neuen Stockwerk das VLAN 50 (10.70.50.0/24, Gateway 10.70.50.1 auf dem Layer-3-Switch) eingerichtet. Alle Geräte dort erhalten per DHCP nur 169.254.x.x-Adressen. Der DHCP-Server (10.70.20.10) steht im Servernetz VLAN 20; die älteren Netze erhalten ihre Adressen von ihm ohne Probleme.",
      symptome: [
        "Eine am Gerät fest eingetragene Adresse 10.70.50.200/24 mit Gateway 10.70.50.1 funktioniert: Der Zugriff auf Server und Internet gelingt.",
        "Auf dem DHCP-Server ist der Bereich 10.70.50.0 aktiv, 101 von 101 Adressen sind frei; die Statistik zeigt für den Bereich 0 empfangene Anfragen; Anfragen aus den anderen Netzen treffen weiterhin ein.",
        "Ein Mitschnitt am Client zeigt wiederholte DHCP-Discover-Pakete ohne Antwort; am Server kommt kein Discover aus dem VLAN 50 an.",
        "Die Schnittstelle VLAN 10 des Layer-3-Switches enthält „ip helper-address 10.70.20.10“; die Schnittstelle VLAN 50 enthält nur „ip address 10.70.50.1 255.255.255.0“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Vermittlung (Schicht 3)" },
        { id: "s5", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Der DHCP-Dienst auf dem Server ist gestoppt." },
        { id: "u2", text: "Der Adresspool des DHCP-Servers ist erschöpft." },
        { id: "u3", text: "Die Access-Ports im neuen Stockwerk sind dem falschen VLAN zugeordnet." },
        { id: "u4", text: "Auf der Schnittstelle VLAN 50 fehlt das DHCP-Relay (ip helper-address); die Broadcast-Anfragen der Clients erreichen den Server in einem anderen Netz nicht." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Ein DHCP-Discover ist ein Broadcast und bleibt auf das eigene Netz beschränkt; liegt der Server in einem anderen Subnetz, muss ein Relay (ip helper-address) am Router bzw. Layer-3-Switch die Anfrage per Unicast weitergeben. Beim VLAN 10 ist dieses Relay eingetragen, beim VLAN 50 fehlt es. Der Dienst läuft (andere Netze funktionieren), der Pool ist frei und die statische Konfiguration funktioniert, also sind weder Dienst noch Ports noch Verkabelung schuld. Am Server kommt aus dem VLAN 50 nichts an, die Anfrage wird nicht über die Netzgrenze weitergeleitet. Das ist eine Aufgabe des Routers an der Netzgrenze (Schicht 3). Maßnahme: ip helper-address auf der Schnittstelle VLAN 50 eintragen, Adresse prüfen, Konfiguration sichern und dokumentieren.",
    },
    {
      nummer: 8,
      titel: "ERP-Seite hängt, Ping geht",
      szenario:
        "Die Rotbuch Metallbau GmbH hat gestern Abend die Zugriffsregeln zwischen dem Büronetz (VLAN 10, 10.50.10.0/24) und dem Servernetz (VLAN 20, 10.50.20.0/24) auf dem Layer-3-Switch verschärft. Seit heute früh lässt sich die ERP-Webanwendung (https, Server 10.50.20.30) aus dem Büro nicht mehr aufrufen; der Dateiserver ist weiter erreichbar.",
      symptome: [
        "ping 10.50.20.30 aus dem Büro funktioniert (1 ms); der Aufruf der ERP-Seite endet in einer Zeitüberschreitung, die Portprüfung auf TCP 443 liefert „TcpTestSucceeded: False“.",
        "Der Dateiserver 10.50.20.10 ist aus dem Büro per TCP 445 weiter erreichbar.",
        "Ein Testrechner im Servernetz (VLAN 20) ruft die ERP-Seite ohne Fehler auf; auf dem ERP-Server lauscht der Webdienst auf Port 443.",
        "show access-lists (SRV-OUT, ausgehend auf VLAN 20): 10 permit icmp any any (1.530 Treffer); 20 permit tcp 10.50.10.0/24 host 10.50.20.10 eq 445 (844 Treffer); 30 deny ip any any log (212 Treffer, steigend); Log: „deny tcp 10.50.10.37(51322) -> 10.50.20.30(443)“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Transport (Schicht 4)" },
        { id: "s3", text: "Sicherung (Schicht 2)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
        { id: "s5", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Die Zugriffsliste auf dem Layer-3-Switch erlaubt aus dem Büro nur ICMP und TCP 445 zum Dateiserver; TCP 443 zum ERP-Server wird verworfen (Regel fehlt)." },
        { id: "u2", text: "Der Webdienst auf dem ERP-Server ist ausgefallen." },
        { id: "u3", text: "Zwischen Büronetz und Servernetz fehlt eine Route." },
        { id: "u4", text: "Das Zertifikat des ERP-Servers ist abgelaufen." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Der Ping und der Dateiserver zeigen, dass Verbindung und Routing zwischen den Netzen funktionieren; eine fehlende Route ist ausgeschlossen. Der Webdienst läuft, denn aus dem Servernetz selbst gelingt der Aufruf, ein Zertifikatsproblem würde erst nach dem Verbindungsaufbau und mit einer Warnung auffallen. Das Log der Zugriffsliste nennt die verworfene Verbindung genau: Zielport 443 des ERP-Servers. Die Liste erlaubt dem Büro nur ICMP und TCP 445 zum Dateiserver, alles andere wird durch die abschließende Verweigerung („deny any“) verworfen. Zugriffslisten filtern nach Protokoll und Port, also auf der Transportschicht. Maßnahme: eine eng gefasste Regel für TCP 443 vom Büronetz zum ERP-Server ergänzen, testen und die Regelmatrix dokumentieren.",
    },
    {
      nummer: 9,
      titel: "Neues Lagernetz in der Niederlassung antwortet nicht",
      szenario:
        "Die Spedition Rademacher GmbH hat in der Niederlassung ein neues Lagernetz 10.41.8.0/24 (Router-Schnittstelle 10.41.8.1) angelegt. Die Zentrale (10.40.0.0/16) soll es über den bestehenden VPN-Tunnel (10.99.0.1 und 10.99.0.2) erreichen. Zugriffe auf die älteren Niederlassungsnetze funktionieren, auf das Lagernetz nicht.",
      symptome: [
        "tracert 10.41.8.20 von 10.40.10.15 zeigt Hop 1: 10.40.10.1 (Router der Zentrale), Hop 2: 192.0.2.1 (Internet-Gateway), danach nur noch Zeitüberschreitungen.",
        "Das ältere Netz 10.41.1.0/24 der Niederlassung ist aus der Zentrale erreichbar (Tunnel aktiv, 18 ms).",
        "Routingtabelle des Zentrale-Routers: 10.41.1.0/24 via 10.99.0.2; 0.0.0.0/0 via 192.0.2.1; für 10.41.8.0/24 gibt es keinen Eintrag. Der Router der Niederlassung hat das Netz direkt angebunden und die Route 10.40.0.0/16 via 10.99.0.1.",
        "Ein Rechner im Lagernetz (10.41.8.20) erreicht den Router der Niederlassung; ein Mitschnitt am Zentrale-Server zeigt dort Anfragen von 10.41.8.20, die Antworten kommen nicht an.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Anwendung (Schicht 7)" },
        { id: "s5", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Der VPN-Tunnel zwischen den Standorten ist ausgefallen." },
        { id: "u2", text: "Die Firewall in der Zentrale blockiert ICMP-Pakete." },
        { id: "u3", text: "Auf dem Router der Zentrale fehlt eine Route zum neuen Netz 10.41.8.0/24; Pakete und Antworten laufen über die Default-Route ins Leere." },
        { id: "u4", text: "Die Subnetzmaske im Lagernetz der Niederlassung ist falsch." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Das Nachbarnetz der Niederlassung funktioniert, der Tunnel ist also aktiv. Gegen eine ICMP-Sperre spricht der Verlauf von traceroute: Die Pakete laufen nicht in den Tunnel, sondern an das Internet-Gateway, weil dem Router der Zentrale für 10.41.8.0/24 nur die Default-Route bleibt. Der Mitschnitt zeigt das Gegenstück: Anfragen aus dem Lagernetz erreichen die Zentrale (der Router der Niederlassung kennt die Route dorthin), die Antworten aber nehmen denselben falschen Weg und gehen verloren. Eine falsche Maske im Lagernetz würde die Verbindung zum Router stören, doch der ist erreichbar. Weiterleitung nach Zielnetz ist Sache der Vermittlungsschicht. Maßnahme: statische Route 10.41.8.0/24 via 10.99.0.2 eintragen (oder per Routing-Protokoll lernen lassen), Hin- und Rückweg testen und das Netz in die Dokumentation aufnehmen.",
    },
    {
      nummer: 10,
      titel: "Büronetz bricht zusammen",
      szenario:
        "Um 10:42 Uhr wird das gesamte Büronetz (VLAN 10) der Maschinenbau Kolbe GmbH extrem langsam: Verbindungen brechen ab, Telefonie und Dateizugriffe sind kaum nutzbar, die Switch-LEDs blinken in rasender Folge. Kurz vorher wurde im Besprechungsraum ein zusätzliches Patchkabel gesteckt, um einen weiteren Arbeitsplatz anzuschließen.",
      symptome: [
        "ping auf das Gateway: 40 % Paketverlust, Antwortzeiten bis 300 ms; die Uplinks zeigen 95–100 % Auslastung, die Switch-CPU rund 98 %.",
        "Der Broadcast-Zähler an den Ports liegt bei etwa 480.000 Paketen pro Sekunde (üblich: unter 300); die Datenmenge ist nicht von außen verursacht, am Internet-Anschluss ist die Auslastung normal.",
        "Das Switch-Protokoll meldet im Sekundentakt „MAC-Flapping: 3C:52:82:11:A0:01 wechselt zwischen Port 3 und Port 4“; show spanning-tree meldet für SW-BUERO-2: „Spanning Tree deaktiviert“.",
        "Wird das neue Patchkabel zwischen den beiden Dosen im Besprechungsraum gezogen, normalisiert sich das Netz nach wenigen Sekunden.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Transport (Schicht 4)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
        { id: "s5", text: "Sicherung (Schicht 2)" },
      ],
      richtigeSchicht: "s5",
      ursachenOptionen: [
        { id: "u1", text: "Ein Angriff aus dem Internet überlastet den Internetanschluss." },
        { id: "u2", text: "Das zusätzliche Kabel verbindet zwei Dosen desselben Netzes und erzeugt eine Schleife; ohne Spanning Tree kreisen Broadcasts endlos (Broadcast-Sturm)." },
        { id: "u3", text: "Eine defekte Netzwerkkarte sendet Dauerbroadcasts." },
        { id: "u4", text: "Der Uplink zwischen den Switches ist zu langsam für den normalen Datenverkehr." },
        { id: "u5", text: "Die Zugriffsliste auf dem Router verwirft den Datenverkehr des Büronetzes." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Die Internetauslastung ist normal, ein Angriff von außen scheidet aus; der Datenverkehr entsteht im Büronetz selbst. Dass dieselbe MAC-Adresse ständig zwischen zwei Ports wechselt und der Broadcast-Zähler in die Hunderttausende steigt, ist das typische Bild einer Layer-2-Schleife. Ethernet-Frames haben keine Lebensdauer: Ein Broadcast kreist endlos, vervielfacht sich und füllt in Sekunden alle Links. Eine einzelne defekte Netzwerkkarte würde keinen Port-Wechsel derselben MAC-Adresse verursachen, und das Verschwinden des Problems mit dem gezogenen Kabel bestätigt die Schleife. Spanning Tree würde die überzählige Verbindung blockieren, ist aber auf SW-BUERO-2 abgeschaltet. Maßnahme: Kabel entfernt lassen, Spanning Tree (RSTP) wieder aktivieren und Endgeräteports gegen unbefugte Switches schützen; Kabeländerungen dokumentieren.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zehn Störungsfälle an Switches und Routern gelöst. Dein Vorgehen: Arbeite von unten nach oben. Zuerst Link, Kabel, Geschwindigkeit und Duplex samt Fehlerzählern; dann Port, VLAN, Trunk, MAC-Tabelle und Schleifenschutz; dann Adresse, Maske, Gateway, Route und DHCP-Weiterleitung; danach Zugriffslisten und Ports. Zählerstände, Konfigurationsauszüge und Logs nennen die Stelle oft genauer als jede Vermutung. Sichere die Konfiguration vor jeder Änderung, ändere nur eine Sache auf einmal und dokumentiere das Ergebnis.",
};
