---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI2
fachgebiet_title: "Installieren und Konfigurieren von Netzwerken"
thema_code: "SI2-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen im Prüfungsbereich „Analyse und Entwicklung von Netzwerken“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 22, sowie der Berufsbildposition „Installieren und Konfigurieren von Netzwerken“ (§ 4 Abs. 4 Nr. 2, Anlage Abschnitt C lfd. Nr. 2) — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus SI2 (9.1–9.4) zu zusammenhängenden Netzwerkprojekten der Brevanta IT-Systemhaus GmbH, wie sie im schriftlichen Prüfungsbereich „Analyse und Entwicklung von Netzwerken“ (90 Minuten, § 22 FIAusbV) typisch sind: Aus Netzplan und Anforderungen werden Adress- und Komponentenplanung, Konfiguration, Sicherheit und Betrieb abgeleitet. Alle Rechenwerte sind nachgerechnet. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-SI2-01 · Fallaufgabe

**Themenbezug:** 9.1 (VLAN, Adressierung) + 9.2 (Komponentenauswahl, Konfiguration) + 9.3 (Segmentierung, Gäste-WLAN) + 9.4 (Monitoring)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH richtet für die Steuerkanzlei Rehfeld & Partner (38 Beschäftigte, eine Büroetage mit Technikraum) ein neues Netz ein. Projektleiterin ist Svenja Albrecht; die Auszubildende Jana Kowalski unterstützt sie. Vorgaben des Kunden: Arbeitsplätze, Server, Peripherie, Gäste und Netzverwaltung werden in getrennten VLANs betrieben, Gäste dürfen nur ins Internet. Für das gesamte interne Netz steht der private Adressbereich 10.20.0.0/24 zur Verfügung. Jedes VLAN erhält auf der Firewall eine Gateway-Adresse, und zwar jeweils die erste nutzbare Adresse des Subnetzes. Die Anforderungen je VLAN:

```
VLAN  Zweck            Geräte
10    Arbeitsplätze    38 heute, Wachstum um 50 % einplanen
20    Server           3 heute, bis zu 10 einplanen
30    Peripherie       6 heute (4 Multifunktionsgeräte, 2 Kameras), bis zu 10 einplanen
40    Gäste-WLAN       bis zu 25 Geräte gleichzeitig
99    Management       bis zu 10 Geräte (Switches, Access Points, Firewall)
```

Zum Anschluss sind vorgesehen: 38 Arbeitsplätze, 6 Peripheriegeräte, 3 Server, 4 Access Points (PoE, je 20 Watt Reservierung am Switch), 2 Kameras (PoE, je 12 Watt Reservierung) und eine Verbindung zur Firewall. Die Switches sollen für die heutigen Geräte plus 25 % Reserve dimensioniert werden. Zwei Angebotsvarianten liegen vor:

```
Modell  Ports            PoE                  PoE-Budget  SFP+-Uplinks  Preis je Gerät
S24     24 x 1 Gbit/s    alle Ports PoE+      190 W       2             640 Euro
S48     48 x 1 Gbit/s    alle Ports PoE+      370 W       4             1.150 Euro

Variante A: zwei Switches S48
Variante B: drei Switches S24
```

Vier Wochen nach der Inbetriebnahme klagen die Beschäftigten über langsame Dateizugriffe, besonders zwischen 8 und 9 Uhr. Die SNMP-Auswertung zeigt:

```
Port   Gerät                Link         Auslastung 8-9 Uhr   Tagesmittel   CRC-Fehler heute
1/5    Dateiserver          1 Gbit/s     91 %                 38 %          0
1/9    Uplink zu Switch 2   1 Gbit/s     64 %                 22 %          0
2/17   Multifunktionsgerät  100 Mbit/s   3 %                  1 %           1.240
```

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Bestimmen Sie für jedes der fünf VLANs das kleinste passende Subnetz (Präfix) und vergeben Sie die Subnetze aus 10.20.0.0/24, beginnend mit dem größten. Geben Sie je VLAN Netzadresse mit Präfix, Broadcast-Adresse, Bereich der nutzbaren Adressen und die Gateway-Adresse an.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Berechnen Sie den Portbedarf (mit 25 % Reserve) und den PoE-Leistungsbedarf. Vergleichen Sie Variante A und B hinsichtlich Ports, PoE-Budget, Kosten, Reserve und Ausfallauswirkung und empfehlen Sie begründet eine Variante.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie herstellerneutral den Konfigurationsablauf für Switches, Access Points und Firewall, sodass Mitarbeiter-WLAN und Gäste-WLAN über dieselben Access Points betrieben werden, aber sicher getrennt sind. Nennen Sie dabei mindestens fünf Sicherheitseinstellungen für Gäste-WLAN und Geräteverwaltung.

**Teilaufgabe 4 (5 Punkte, bloom: analysieren):** Werten Sie die Messwerte aus, erklären Sie die Beschwerden über die langsamen Dateizugriffe und den Befund am Multifunktionsgerät und schlagen Sie je eine Maßnahme sowie eine geeignete Überwachungseinstellung vor.

**Musterlösungshinweise:** Teilaufgabe 1: Bedarf inklusive Wachstum und Gateway: VLAN 10 mit 38 mal 1,5 = 57 plus Gateway = 58 Adressen, also /26 (62 nutzbar); VLAN 40 mit 25 plus Gateway = 26, also /27 (30 nutzbar, ein /28 hätte nur 14); VLAN 20, 30 und 99 mit je 10 plus Gateway = 11, also /28 (14 nutzbar, ein /29 hätte nur 6). Vergabe nach Größe an Blockgrenzen: VLAN 10 10.20.0.0/26 (Maske 255.255.255.192, Broadcast 10.20.0.63, nutzbar .1 bis .62, Gateway 10.20.0.1); VLAN 40 10.20.0.64/27 (Maske 255.255.255.224, Broadcast 10.20.0.95, nutzbar .65 bis .94, Gateway 10.20.0.65); VLAN 20 10.20.0.96/28 (Maske 255.255.255.240, Broadcast 10.20.0.111, nutzbar .97 bis .110, Gateway 10.20.0.97); VLAN 30 10.20.0.112/28 (Broadcast 10.20.0.127, nutzbar .113 bis .126, Gateway 10.20.0.113); VLAN 99 10.20.0.128/28 (Broadcast 10.20.0.143, nutzbar .129 bis .142, Gateway 10.20.0.129). Belegt sind damit 144 von 256 Adressen, der Bereich 10.20.0.144 bis 10.20.0.255 bleibt für Erweiterungen frei. Teilaufgabe 2: Portbedarf heute: 38 + 6 + 3 + 4 + 1 = 52; mit 25 % Reserve 52 mal 1,25 = 65 Ports. PoE-Bedarf: 4 mal 20 W + 2 mal 12 W = 80 + 24 = 104 W. Variante A: 96 Ports, 370 W je Gerät, Kosten 2 mal 1.150 = 2.300 Euro, 44 freie Ports. Variante B: 72 Ports, 190 W je Gerät, Kosten 3 mal 640 = 1.920 Euro, 20 freie Ports. Beide erfüllen den Portbedarf (96 bzw. 72 sind mindestens 65) und das PoE-Budget (104 W liegen unter 190 W bzw. 370 W, auch wenn alle PoE-Geräte an einem Switch hängen). B ist 380 Euro günstiger und begrenzt den Ausfall eines Switches auf etwa ein Drittel der Ports statt auf die Hälfte, verlangt aber drei statt zwei zu verwaltende Geräte, mehr Uplinks und hat weniger Reserve; A bietet mehr Reserve und mehr SFP+-Uplinks. Zu beachten: Bei 50 % mehr Arbeitsplätzen (57) wären 57 + 6 + 3 + 4 + 1 = 71 Ports nötig, B hätte dann nur noch einen freien Port. Entscheidend ist eine nachvollziehbare Begründung; plausibel ist B bei knappem Budget und A bei erwartetem Wachstum. Teilaufgabe 3: VLANs 10, 20, 30, 40 und 99 auf allen Switches anlegen und benennen; Ports der Endgeräte als Access-Ports dem jeweiligen VLAN zuordnen, ungenutzte Ports abschalten; Uplinks zwischen den Switches, zur Firewall und die Ports der Access Points als Trunk mit nur den benötigten VLANs (10, 40, 99) konfigurieren; auf der Firewall je VLAN eine Schnittstelle mit der Gateway-Adresse und einen DHCP-Bereich anlegen; auf den Access Points zwei SSIDs einrichten, die interne SSID mit WPA3 bzw. WPA2 (bevorzugt Enterprise mit 802.1X und RADIUS) im VLAN 10, die Gäste-SSID mit eigenem Passwort im VLAN 40; Firewall-Regeln nach Default Deny: Gäste nur ins Internet (TCP 80 und 443, DNS), keinerlei Zugriff auf die übrigen VLANs aus 10.20.0.0/24, Management-VLAN nur vom Admin-Arbeitsplatz erreichbar; Tests (Gast erreicht Internet, aber weder Server noch Drucker); Dokumentation und Konfigurationssicherung. Sicherheitseinstellungen, z. B.: Standardpasswörter ändern, SSH und HTTPS statt Telnet und HTTP, Verwaltungszugang nur aus dem Management-VLAN, Client-Isolation und Bandbreitenbegrenzung im Gäste-WLAN, befristete oder wechselnde Gäste-Zugangsdaten, WPS und unnötige Dienste abschalten, SNMPv3 statt v2c, Firmware aktuell halten, Syslog und NTP einrichten. Teilaufgabe 4: Der Dateiserver-Port ist zwischen 8 und 9 Uhr mit 91 % (rund 910 Mbit/s) fast ausgelastet, das Tagesmittel von 38 % verdeckt diese Spitze; bei annähernder Sättigung steigen Wartezeiten und Verluste, was die langsamen Dateizugriffe erklärt. Der Uplink ist mit 64 % ebenfalls hoch, aber noch nicht kritisch. Maßnahmen: Server mit 10 Gbit/s über SFP+ anbinden (beide Modelle haben SFP+-Ports; Adapter, Modul und Kabel mitplanen) oder zwei Links bündeln (Link-Aggregation), was vielen gleichzeitigen Clients hilft, eine einzelne Verbindung aber nicht über 1 Gbit/s hebt; außerdem die Ursache der Morgenlast prüfen (z. B. Sicherungs- oder Synchronisationsjob) und Lastspitzen zeitlich entzerren. Der Port des Multifunktionsgeräts zeigt bei nur 3 % Last 1.240 CRC-Fehler an einem Tag: Das deutet auf ein Übertragungsproblem (defektes oder zu langes Kabel, schlechter Stecker, Störquelle, Duplex-Mismatch), nicht auf Überlast; Kabel messen oder tauschen, Autonegotiation prüfen, Fehlerzähler danach beobachten. Überwachung: SNMP-Abfrage von Auslastung und Fehlerzählern mit Baseline, Warnschwelle bei dauerhaft etwa 70 bis 80 % Auslastung (Richtwert), Alarm bei steigenden Fehlerzählern, Trendauswertung für die Kapazitätsplanung.

---

#### F-SI2-02 · Fallaufgabe

**Themenbezug:** 9.1 (Protokollauswahl, Routing) + 9.3 (Firewall, DMZ, NAT, VPN) + 9.4 (Redundanz, Monitoring, Verfügbarkeit)

**Ausgangssituation:** Die Hansen Baustoffe GmbH betreibt eine Zentrale in Hannover und zwei Filialen in Göttingen und Celle. Bisher arbeitet jeder Standort für sich. Die Brevanta IT-Systemhaus GmbH soll die Standorte per Site-to-Site-VPN koppeln. Die Filialen nutzen Kassensysteme, die an die Warenwirtschaft in der Zentrale angebunden werden, IP-Telefone sowie Zeitsynchronisation. In der Zentrale steht außerdem ein Webshop-Server, der aus dem Internet erreichbar sein muss. Verantwortlich beim Kunden ist IT-Leiter Henrik Brandt. Der Netzplan:

```
Standort            Netz            Router/Firewall (LAN-Seite)   Internetanschluss
Zentrale Hannover   10.1.0.0/24     10.1.0.1                      Glasfaser, öffentliche Adresse
DMZ (Zentrale)      10.1.100.0/28   10.1.100.1                    an der Firewall der Zentrale
Filiale Göttingen   10.2.0.0/24     10.2.0.1                      DSL, Provider-Gateway 192.0.2.1
Filiale Celle       10.3.0.0/24     10.3.0.1                      DSL

Wichtige Systeme in der Zentrale:
  Webshop-Server     10.1.100.10  (DMZ)
  Warenwirtschaft    10.1.0.30    (LAN)
  Zeitserver         10.1.0.10    (LAN)
  Admin-PC           10.1.0.20    (LAN)

VPN-Struktur: Sternform. Göttingen und Celle bauen je einen Tunnel zur Zentrale auf;
Verkehr zwischen Göttingen und Celle läuft über die Zentrale.
```

Anforderungen der Anwendungen:

```
A  Kassendaten der Filialen an die Warenwirtschaft: müssen vollständig und in richtiger Reihenfolge ankommen
B  IP-Telefonie zwischen Filialen und Zentrale: Sprachstrom, geringe Verzögerung wichtig
C  Zeitsynchronisation der Kassen mit dem Zeitserver: kurze Anfragen und Antworten
D  Fernwartung der Server durch die Administration: nur verschlüsselt
E  Webshop für Kunden aus dem Internet: verschlüsselt
```

Die Filiale Celle ist nur per DSL angebunden (Verfügbarkeit 99,0 %). Als Ersatzweg ist ein LTE-Zugang mit 98,0 % Verfügbarkeit vorgesehen. Beide Verbindungen fallen unabhängig voneinander aus.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Wählen Sie für jede der Anwendungen A bis E das geeignete Transportprotokoll (TCP oder UDP) und ein passendes Anwendungsprotokoll mit Standardport und begründen Sie jeweils kurz.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Erstellen Sie die Routing-Tabelle des Routers in Göttingen (Zielnetz mit Präfix und Weg) mit statischen Routen. Entscheiden Sie anschließend für die Zieladressen 10.3.0.77, 10.1.100.5, 198.51.100.7 und 10.2.0.44, welcher Eintrag jeweils gilt, und begründen Sie die Wahl.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie das Regelwerk der Zentralen-Firewall als Tabelle (Nummer, Quelle, Ziel, Dienst, Aktion) für folgende Zonen: Internet, LAN, DMZ und die Filialnetze. Erlaubt sein sollen nur: Webshop aus dem Internet; Warenwirtschaft zum Webshop-Server (HTTPS) zur Übernahme von Bestellungen; Admin-PC zum Webshop-Server per SSH; Filialen zur Warenwirtschaft (HTTPS) und zum Zeitserver; LAN-Zugriff auf Webseiten im Internet. Erläutern Sie außerdem, wo NAT eingesetzt wird und wo nicht.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Berechnen Sie die Verfügbarkeit der Anbindung Celles ohne und mit LTE-Ersatzweg sowie die jeweilige Ausfallzeit pro Jahr (8.760 Stunden). Beschreiben Sie, was und wie überwacht werden soll, und nennen Sie zwei Grenzen der Lösung.

**Musterlösungshinweise:** Teilaufgabe 1: A Kassendaten: TCP, weil Vollständigkeit und Reihenfolge zählen, z. B. HTTPS (TCP 443) zur Warenwirtschaft. B Telefonie: Der Sprachstrom läuft über UDP (RTP), weil geringe Verzögerung wichtiger ist als die Wiederholung verlorener Pakete; die Signalisierung erfolgt getrennt. C Zeitsynchronisation: NTP über UDP 123, kurze Anfragen ohne Verbindungsaufbau. D Fernwartung: SSH über TCP 22 (bei Windows-Servern RDP über TCP 3389), verschlüsselt und nur aus dem Management-Netz; Telnet scheidet wegen fehlender Verschlüsselung aus. E Webshop: HTTPS über TCP 443, TLS-verschlüsselt und zuverlässig; HTTP auf Port 80 höchstens zur Weiterleitung auf HTTPS. Teilaufgabe 2: Routing-Tabelle Göttingen: 10.2.0.0/24 direkt (eigenes LAN); 10.1.0.0/24 über den VPN-Tunnel zur Zentrale; 10.1.100.0/28 über den VPN-Tunnel zur Zentrale; 10.3.0.0/24 über den VPN-Tunnel zur Zentrale (Celle ist nur über die Zentrale erreichbar); 0.0.0.0/0 über das Provider-Gateway 192.0.2.1. Zieladressen: 10.3.0.77 passt zu 10.3.0.0/24 und zur Default-Route, es gilt das längere Präfix: Tunnel zur Zentrale. 10.1.100.5 liegt nicht im Netz 10.1.0.0/24 (dessen Bereich endet bei 10.1.0.255), sondern in 10.1.100.0/28 (10.1.100.0 bis 10.1.100.15): Tunnel zur Zentrale. 198.51.100.7 passt nur zur Default-Route: Provider-Gateway ins Internet. 10.2.0.44 liegt im eigenen LAN und wird direkt zugestellt. Statisches Routing genügt, weil jede Filiale nur einen Weg hat; Voraussetzung sind überschneidungsfreie Netze. In der Zentrale und in Celle müssen entsprechend die Netze der jeweils anderen Seite im Tunnel zugelassen bzw. geroutet werden, damit der Verkehr zwischen Göttingen und Celle über die Zentrale läuft. Teilaufgabe 3: Regelwerk (von oben nach unten, Default Deny am Ende): 1 Internet an 10.1.100.10 TCP 443 erlauben; 2 10.1.0.30 an 10.1.100.10 TCP 443 erlauben; 3 10.1.0.20 an 10.1.100.10 TCP 22 erlauben; 4 Filialnetze 10.2.0.0/24 und 10.3.0.0/24 an 10.1.0.30 TCP 443 erlauben; 5 Filialnetze an 10.1.0.10 UDP 123 erlauben; 6 10.1.0.0/24 an Internet TCP 80 und 443 erlauben; 7 DMZ an 10.1.0.0/24 beliebig verbieten (mit Protokollierung); 8 beliebig an beliebig beliebig verbieten. Stateful-Firewall: Antworten zu erlaubten Verbindungen werden automatisch durchgelassen. Wichtig ist, dass keine Verbindung aus der DMZ ins interne Netz aufgebaut werden darf, damit ein kompromittierter Webshop nicht zum Einfallstor wird; die Bestellübernahme wird daher vom LAN aus angestoßen. NAT: Source NAT für den Zugriff des LAN auf das Internet (private Adressen werden auf die öffentliche Adresse umgesetzt) und Destination NAT bzw. Port-Forwarding von der öffentlichen Adresse Port 443 auf 10.1.100.10; kein NAT für den Verkehr durch den VPN-Tunnel zwischen den Standorten, dort werden die privaten Adressen direkt verwendet. Teilaufgabe 4: Ohne Ersatzweg: 99,0 % bedeuten 1 % Ausfall, also 0,01 mal 8.760 = 87,6 Stunden pro Jahr. Mit LTE bei unabhängigen Ausfällen: 1 minus 0,01 mal 0,02 = 1 minus 0,0002 = 99,98 %; Ausfallzeit 0,0002 mal 8.760 = 1,752 Stunden, also rund 1 Stunde 45 Minuten. Überwachung: Erreichbarkeit der Filialrouter per Ping, Tunnelstatus, Auslastung und Fehlerzähler der Leitungen per SNMP, Zustand der Ersatzleitung (damit ein unbemerkter Ausfall der Reserve auffällt), Syslog von Firewall und Routern; Alarm sofort bei Tunnelausfall per E-Mail oder Ticket mit Eskalation, Warnung bei dauerhaft hoher Auslastung ab etwa 70 bis 80 %. Grenzen z. B.: Die Rechnung setzt unabhängige Ausfälle voraus (gleicher Anbieter oder Kabelweg senkt den Nutzen); LTE hat meist weniger Bandbreite und höhere Verzögerung, die Sprachqualität ist zu prüfen; der Tunnel muss nach dem Umschalten automatisch neu aufgebaut werden, die Umschaltung ist regelmäßig zu testen; die Zentrale als Mittelpunkt der Sternstruktur benötigt mindestens gleichwertige Redundanz (zweite Leitung, redundante Firewall, USV).

---

#### F-SI2-03 · Fallaufgabe

**Themenbezug:** 9.2 (Verkabelung, Komponenten) + 9.1 (Adressierung) + 9.3 (Segmentierung, Regelwerk) + 9.4 (Fehlersuche, Monitoring)

**Ausgangssituation:** Die Rotbuch Metallbau GmbH erweitert ihren Produktionsstandort um eine neue Halle. Der Bereich Smart-Factory-Vernetzung der Brevanta IT-Systemhaus GmbH baut das Netz: 12 Maschinensteuerungen (Ethernet mit 100 Mbit/s), 8 Sensor-Gateways, die ihre Messwerte per MQTT mit TLS (TCP 8883) an einen Broker senden, sowie ein Wartungs-PC. Der Hallenverteiler steht 140 m vom Gebäudeverteiler im Bürogebäude entfernt. Verantwortlich beim Kunden ist Instandhaltungsleiter Tobias Engel, die Netzbetreuung übernimmt Alina Petrović bei Brevanta. Für die Verkabelung der Maschinen liegen folgende Messwerte aus der Planung vor (Patchkabel am Hallenverteiler jeweils 2 m):

```
Maschine   Fest verlegte Strecke (Verteiler bis Anschlussdose)   Patchkabel an der Maschine
M1         38 m                                                  3 m
M5         72 m                                                  5 m
M9         88 m                                                  5 m
M12        94 m                                                  3 m
```

Für das Netz steht der private Bereich 192.168.50.0/24 zur Verfügung. Er soll in vier gleich große Subnetze geteilt werden:

```
VLAN 10  Büro (Arbeitsplätze, Wartungs-PC 192.168.50.20)
VLAN 20  Server (MQTT-Broker 192.168.50.70)
VLAN 30  Maschinen (12 Steuerungen, 8 Sensor-Gateways)
VLAN 40  Gäste und Besucher
```

Das Sicherheitskonzept sieht vor, dass die Maschinen nicht frei ins Internet dürfen, nur die Sensor-Gateways den Broker erreichen und der Wartungs-PC per OPC UA (TCP 4840) auf die Maschinen zugreifen darf. Ein Kollege hat folgendes Firewall-Regelwerk entworfen (von oben nach unten, die erste zutreffende Regel gilt):

```
Nr  Quelle                        Ziel                         Dienst             Aktion
1   Maschinen-VLAN 30             Internet                     beliebig           erlauben
2   Sensor-Gateways (VLAN 30)     MQTT-Broker 192.168.50.70    TCP 8883           erlauben
3   Büro-VLAN 10                  Maschinen-VLAN 30            beliebig           verbieten
4   Wartungs-PC 192.168.50.20     Maschinen-VLAN 30            TCP 4840           erlauben
5   Büro-VLAN 10                  Internet                     TCP 80, TCP 443    erlauben
6   beliebig                      beliebig                     beliebig           verbieten
```

Nach der Inbetriebnahme meldet die Instandhaltung sporadische Aussetzer bei Maschine M12. Die Auswertung ergibt:

```
$ ping -c 100 192.168.50.152
...
100 packets transmitted, 96 received, 4% packet loss, time 99142ms
rtt min/avg/max/mdev = 0.8/3.1/212.4/21.7 ms

Port   Gerät  Link                   CRC-Fehler in 24 h   Auslastung
1/12   M12    10 Mbit/s ausgehandelt  5.310                1 %
1/11   M11    100 Mbit/s              0                    3 %
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beurteilen Sie für M1, M5, M9 und M12, ob der Kupferkanal die Grenzen einhält (fest verlegte Strecke höchstens 90 m, gesamter Kanal höchstens 100 m), und nennen Sie für M12 eine Abhilfe. Wählen Sie außerdem das Medium für die Verbindung zwischen Hallen- und Gebäudeverteiler und begründen Sie die Wahl.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Teilen Sie 192.168.50.0/24 in vier gleich große Subnetze und geben Sie für jedes VLAN Präfix, Subnetzmaske, Netzadresse, Broadcast-Adresse und den Bereich nutzbarer Adressen an. Prüfen Sie, ob 12 Steuerungen, 8 Gateways, ein Gateway-Router und eine Reserve von 10 Adressen in das Maschinen-VLAN passen, und entscheiden Sie, ob 192.168.50.130 und 192.168.50.191 dort als Geräteadresse vergeben werden dürfen.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Analysieren Sie das Regelwerk des Kollegen: Nennen Sie drei Fehler oder Lücken, erklären Sie ihre Auswirkungen und geben Sie eine korrigierte Regelreihenfolge an.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Messwerte zu M12 (Paketverlust, Latenz und Jitter), nennen Sie wahrscheinliche Ursachen anhand der Portwerte sowie ein Vorgehen zur Behebung, und beschreiben Sie, wie sich ein solcher Fehler künftig per Monitoring früh erkennen lässt.

**Musterlösungshinweise:** Teilaufgabe 1: M1: fest verlegt 38 m, Kanal 38 + 2 + 3 = 43 m, in Ordnung. M5: 72 m, Kanal 72 + 2 + 5 = 79 m, in Ordnung. M9: 88 m (unter 90 m), Kanal 88 + 2 + 5 = 95 m (unter 100 m), noch zulässig, aber ohne Reserve für spätere Umlegungen. M12: Die fest verlegte Strecke beträgt 94 m und überschreitet die 90 m; der Kanal mit 94 + 2 + 3 = 99 m liegt zwar knapp unter 100 m, der Aufbau ist aber nicht normgerecht und störanfällig. Abhilfe: näher gelegener Unterverteiler mit Industrie-Switch, kürzerer Kabelweg oder Glasfaser mit Medienkonverter. Hallen- zu Gebäudeverteiler: 140 m überschreiten die 100 m für Kupfer, daher Glasfaser (Multimode, z. B. OM3, reicht für 1 Gbit/s und für 10 Gbit/s bis etwa 300 m) mit SFP- bzw. SFP+-Modulen; zusätzlich vorteilhaft: unempfindlich gegen elektromagnetische Störungen in der Halle und galvanische Trennung zwischen den Gebäuden. Teilaufgabe 2: Vier gleich große Subnetze bedeuten zwei weitere Bits im Netzanteil, also /26 mit Maske 255.255.255.192, je 64 Adressen, 62 nutzbar. VLAN 10: 192.168.50.0/26, Broadcast 192.168.50.63, nutzbar .1 bis .62. VLAN 20: 192.168.50.64/26, Broadcast .127, nutzbar .65 bis .126. VLAN 30: 192.168.50.128/26, Broadcast .191, nutzbar .129 bis .190. VLAN 40: 192.168.50.192/26, Broadcast .255, nutzbar .193 bis .254. Bedarf im Maschinen-VLAN: 12 + 8 + 1 Gateway + 10 Reserve = 31 Adressen, es sind 62 nutzbar, das passt. 192.168.50.130 liegt im Bereich .129 bis .190 und darf vergeben werden; 192.168.50.191 ist die Broadcast-Adresse des Subnetzes und darf nicht an ein Gerät vergeben werden. Teilaufgabe 3: Fehler 1: Regel 1 erlaubt den Maschinen beliebigen Verkehr ins Internet, das verletzt das Konzept (kein freier Internetzugang für Maschinen) und erhöht das Risiko von Fernsteuerung oder Datenabfluss; sie ist zu streichen oder auf einen ausdrücklich benötigten Dienst (z. B. Hersteller-Update über einen kontrollierten Weg) zu beschränken. Fehler 2: Regel 4 ist wirkungslos, weil der Wartungs-PC im Büro-VLAN 10 liegt (192.168.50.20 in 192.168.50.0/26) und Regel 3 vorher alles aus dem Büro in das Maschinen-VLAN verbietet; Regel 4 muss vor Regel 3 stehen. Lücke 3: Für die Namensauflösung fehlt eine Regel (z. B. Büro an den DNS-Server im Server-VLAN, UDP und TCP 53, und dessen Zugriff auf externe Namensserver); wegen Default Deny können Büro-PCs sonst keine Webadressen auflösen, Regel 5 liefe ins Leere. Korrigierte Reihenfolge, z. B.: 1 Wartungs-PC an Maschinen-VLAN TCP 4840 erlauben; 2 Sensor-Gateways an MQTT-Broker TCP 8883 erlauben; 3 Büro-VLAN an Maschinen-VLAN beliebig verbieten; 4 Büro-VLAN an DNS-Server Port 53 erlauben; 5 Büro-VLAN an Internet TCP 80 und 443 erlauben; 6 beliebig verbieten. Ergänzend: Protokollierung der Verbote, Prüfung der Regeln per Negativtest. Teilaufgabe 4: Paketverlust: 4 von 100 Paketen = 4 %, für Maschinenkommunikation unzulässig hoch. Die mittlere Latenz von 3,1 ms wirkt unauffällig, doch das Maximum von 212,4 ms und die Standardabweichung (mdev) von 21,7 ms zeigen starke Schwankungen (hoher Jitter); ein Mittelwert allein verdeckt die Ausreißer. Der Port meldet nur 10 Mbit/s statt 100 Mbit/s und 5.310 CRC-Fehler bei 1 % Auslastung: Das weist auf ein Übertragungsproblem hin, nicht auf Überlast. Wahrscheinliche Ursachen: zu langer fest verlegter Kabelweg (94 m), Störungen (z. B. elektromagnetische Einstreuung durch Antriebe in der Halle), defekter Stecker oder Dose, Duplex-Mismatch. M11 mit 100 Mbit/s und 0 Fehlern zeigt, dass das Problem an der Strecke von M12 liegt und nicht im gesamten Hallennetz. Vorgehen: Strecke mit Kabeltester messen (Länge, Dämpfung, Übersprechen), Stecker, Dose und Verlegung nahe an Störquellen prüfen, Autonegotiation- und Duplex-Einstellung kontrollieren, Abhilfe über Unterverteiler, danach Gegenmessung (ping, Zähler) und Dokumentation. Monitoring: Per SNMP Link-Geschwindigkeit, CRC-Fehlerrate und Auslastung je Port abfragen, Traps bzw. Alarm bei Änderung der Link-Geschwindigkeit und bei Überschreiten eines Fehlerschwellwerts, Baseline aus dem Normalbetrieb, Syslog-Meldungen zentral sammeln, Berichte regelmäßig auswerten.
