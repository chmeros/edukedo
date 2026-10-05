---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: FU3
fachgebiet_title: "Netzwerke und IT-Betrieb"
thema_code: "FU3-glossar"
thema_title: "Glossar (Entwurf)"
quelle: "Aus der vorhandenen Theorie der Themen dieses Fachgebiets abgeleitete Kurzdefinitionen"
rechtsstand: "05.10.2026 — Entwurf, vor Livegang fachlich prüfen"
---

## Glossar

#### OSI-Modell
**Auch:** ISO/OSI-Referenzmodell, OSI-Referenzmodell, OSI-Schichtenmodell
**Thema:** 3.1
**Abschnitt:** Das ISO/OSI-Referenzmodell
**Definition:** Ein Modell, das die Kommunikation in sieben Schichten zerlegt. Jede Schicht erbringt Dienste für die darüberliegende und nutzt die der darunterliegenden. Es hilft beim gemeinsamen Verständnis und bei der Fehlersuche.
**Geprüft:** nein

#### MAC-Adresse
**Thema:** 3.1
**Abschnitt:** Adressierung
**Definition:** Eine Hardware-Adresse der Netzwerkschnittstelle mit 48 Bit, hexadezimal dargestellt. Sie wird auf Schicht 2 genutzt und ist nur innerhalb eines lokalen Netzsegments von Bedeutung.
**Geprüft:** nein

#### Subnetzmaske
**Auch:** Präfix, Präfix-Schreibweise
**Thema:** 3.1
**Abschnitt:** Adressierung
**Definition:** Sie legt fest, wo bei einer IPv4-Adresse die Grenze zwischen Netzanteil und Hostanteil liegt. Sie wird als 255.255.255.0 oder in Präfix-Schreibweise als /24 angegeben.
**Geprüft:** nein

#### Default Gateway
**Auch:** Standardgateway
**Thema:** 3.1
**Abschnitt:** Subnetze rechnen
**Definition:** Die Router-Adresse im eigenen Subnetz eines Geräts. An sie wird alles geschickt, was nicht im lokalen Netz liegt.
**Geprüft:** nein

#### NAT
**Auch:** Network Address Translation
**Thema:** 3.1
**Abschnitt:** Adressierung
**Definition:** Network Address Translation. Zwischen privatem und öffentlichem Netz übersetzt meist ein Router die Adressen per NAT.
**Geprüft:** nein

#### DHCP
**Thema:** 3.1
**Abschnitt:** Wichtige Protokolle auf Grundlagenniveau
**Definition:** Ein Protokoll, das Geräten automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server zuweist.
**Geprüft:** nein

#### DNS
**Auch:** Namensauflösung
**Thema:** 3.1
**Abschnitt:** Wichtige Protokolle auf Grundlagenniveau
**Definition:** Ein Protokoll, das Namen wie kunde-beispiel.de in IP-Adressen auflöst.
**Geprüft:** nein

#### VLAN
**Auch:** Virtual Local Area Network
**Thema:** 3.2
**Abschnitt:** Segmentierung: VLAN und DMZ
**Definition:** Ein VLAN trennt ein physisches Switch-Netz logisch in mehrere getrennte Netze. So können etwa Büro-Arbeitsplätze, Gäste-WLAN und Server auf derselben Hardware in getrennten Segmenten liegen.
**Geprüft:** nein

#### DMZ
**Auch:** demilitarisierte Zone
**Thema:** 3.2
**Abschnitt:** Segmentierung: VLAN und DMZ
**Definition:** Ein abgeschirmtes Segment für Systeme, die von außen erreichbar sein müssen, zum Beispiel ein Webserver. Diese Systeme haben dabei keinen direkten Zugriff aufs interne Netz.
**Geprüft:** nein

#### VPN
**Auch:** Virtual Private Network, Site-to-Site-VPN, Remote-Access-VPN
**Thema:** 3.2
**Abschnitt:** VPN-Grundidee
**Definition:** Ein verschlüsselter Tunnel durch ein unsicheres Netz wie das Internet. Ein Site-to-Site-VPN verbindet zwei Standorte dauerhaft, ein Remote-Access-VPN einzelne Geräte mit dem Firmennetz.
**Geprüft:** nein

#### MQTT
**Auch:** Publish/Subscribe
**Thema:** 3.2
**Abschnitt:** Industrielle Netze und IoT
**Definition:** Ein leichtgewichtiges Protokoll für den Austausch von Sensordaten. Es arbeitet nach dem Publish/Subscribe-Prinzip über einen Vermittler, den Broker.
**Geprüft:** nein

#### OPC UA
**Thema:** 3.2
**Abschnitt:** Industrielle Netze und IoT
**Definition:** Ein verbreiteter Standard für den herstellerübergreifenden Datenaustausch in der Automatisierung.
**Geprüft:** nein

#### REST-Schnittstelle
**Auch:** REST
**Thema:** 3.2
**Abschnitt:** Datenaustausch zwischen vernetzten Systemen
**Definition:** Eine verbreitete Schnittstelle über HTTP(S), bei der Ressourcen über Adressen (URLs) angesprochen werden. Die wichtigsten HTTP-Methoden sind GET, POST, PUT und DELETE.
**Geprüft:** nein

#### MTBF
**Auch:** Mean Time Between Failures
**Thema:** 3.3
**Abschnitt:** Verfügbarkeit und Ausfallwahrscheinlichkeit
**Definition:** Die mittlere Betriebsdauer zwischen zwei Ausfällen. Eine höhere MTBF erhöht die Verfügbarkeit nach der Formel V = MTBF / (MTBF + MTTR).
**Geprüft:** nein

#### MTTR
**Auch:** Mean Time To Repair, Mean Time To Recover
**Thema:** 3.3
**Abschnitt:** Verfügbarkeit und Ausfallwahrscheinlichkeit
**Definition:** Die mittlere Dauer, bis ein ausgefallenes System repariert bzw. wiederhergestellt ist. Eine kürzere MTTR erhöht die Verfügbarkeit.
**Geprüft:** nein

#### Service Level Agreement
**Auch:** SLA, SLAs
**Thema:** 3.3
**Abschnitt:** Verfügbarkeit und Ausfallwahrscheinlichkeit
**Definition:** Eine Vereinbarung, in der Verfügbarkeiten häufig zugesagt werden. Vertraglich muss klar sein, welcher Zeitraum betrachtet wird und ob geplante Wartungsfenster als Ausfall zählen.
**Geprüft:** nein

#### Single Point of Failure
**Auch:** SPOF
**Thema:** 3.3
**Abschnitt:** Zusammenschaltung von Komponenten
**Definition:** Eine Komponente, deren Ausfall das Gesamtsystem lahmlegt und die nicht redundant ausgelegt ist.
**Geprüft:** nein

#### Incident
**Thema:** 3.3
**Abschnitt:** Störungsmeldungen aufnehmen
**Definition:** Eine Störung des Dienstes. Das Ziel ist, den Dienst schnellstmöglich wiederherzustellen. Davon wird das Problem unterschieden, die zugrunde liegende Ursache, die dauerhaft beseitigt werden soll.
**Geprüft:** nein

#### Workaround
**Auch:** Behelfslösung
**Thema:** 3.3
**Abschnitt:** Störungsmeldungen aufnehmen
**Definition:** Eine Behelfslösung, die den Dienst schnell wiederherstellt, ohne die Ursache zu beseitigen.
**Geprüft:** nein

#### traceroute
**Auch:** tracert
**Thema:** 3.3
**Abschnitt:** ping und traceroute: das Prinzip
**Definition:** Ein Werkzeug, das die Router auf dem Weg zu einem Ziel zeigt. Es sendet Pakete mit steigender Lebensdauer (TTL) und lernt so nacheinander die Zwischenstationen kennen.
**Geprüft:** nein

#### Systemdokumentation
**Thema:** 3.4
**Abschnitt:** Dokumentationsarten
**Definition:** Sie beschreibt ein konkretes System in seinem Aufbau, etwa Architektur, Komponenten, Netzwerkplan, Software, Konfiguration und Datensicherung. Sie richtet sich in erster Linie an Administrator:innen und Betriebsteams.
**Geprüft:** nein

#### Benutzerdokumentation
**Auch:** Anwenderdokumentation
**Thema:** 3.4
**Abschnitt:** Dokumentationsarten
**Definition:** Sie erklärt Anwender:innen, wie sie ein System im Alltag bedienen, zum Beispiel als Handbuch, Kurzanleitung oder FAQ. Sie braucht keine tiefen technischen Details, dafür praxisnahe Abläufe.
**Geprüft:** nein

#### Betriebsdokumentation
**Auch:** Betriebshandbuch, Runbook
**Thema:** 3.4
**Abschnitt:** Dokumentationsarten
**Definition:** Sie beschreibt wiederkehrende Betriebsaufgaben und das Vorgehen bei bekannten Störungen. Sie ergänzt die Systemdokumentation.
**Geprüft:** nein

#### Alternativtext
**Auch:** Alt-Text
**Thema:** 3.4
**Abschnitt:** Barrierefreie Dokumentation
**Definition:** Eine Beschreibung für Bilder, Diagramme und Screenshots, die den Inhalt in Worten wiedergibt. Hilfsmittel wie Screenreader können sie vorlesen.
**Geprüft:** nein
