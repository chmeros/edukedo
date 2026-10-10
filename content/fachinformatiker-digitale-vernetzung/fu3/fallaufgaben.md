---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: FU3
fachgebiet_title: "Netzwerke und IT-Betrieb"
thema_code: "FU3-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zum Betreiben von IT-Systemen nach der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 8 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus FU3 (3.1–3.4) zu einer zusammenhängenden betrieblichen Situation rund um die Brevanta IT-Systemhaus GmbH, wie sie in praxisbezogenen Prüfungsaufgaben typisch ist. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-FU3-01 · Fallaufgabe

**Themenbezug:** 3.1 (Adressierung, DHCP, DNS) + 3.3 (Störungsaufnahme, Fehlereingrenzung)

**Ausgangssituation:** Jonas Hartmann arbeitet im Servicedesk des Bereichs Managed Services der Brevanta IT-Systemhaus GmbH. Am Montagmorgen meldet die Steuerkanzlei Lindemann & Partner, einem Kunden mit zwölf Arbeitsplätzen, dass Mitarbeiterin Nadia Okafor weder Webseiten noch die Cloud-Buchhaltung öffnen kann. Ihre elf Kolleg:innen arbeiten normal. Das Netz der Kanzlei verwendet 192.168.40.0/24, der Router mit dem Default Gateway hat die Adresse 192.168.40.1, ein interner Namensserver die Adresse 192.168.40.10; die Arbeitsplätze beziehen ihre Einstellungen normalerweise per DHCP. Bei einer Fernprüfung stellt Herr Hartmann fest: Der Rechner von Frau Okafor hat die Adresse 192.168.40.77 mit Subnetzmaske 255.255.255.0 und das richtige Gateway. Ein ping auf das Gateway gelingt, ein ping auf die IP-Adresse eines externen Servers ebenfalls. Ein ping auf einen Hostnamen schlägt mit der Meldung fehl, der Name könne nicht aufgelöst werden. Als DNS-Server ist auf dem Rechner manuell 192.168.40.5 eingetragen. Diese Adresse gehörte zu einem alten Server, der vor drei Wochen abgebaut wurde.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie anhand der Beobachtungen schichtweise, welche Ebenen offensichtlich in Ordnung sind und wo der Fehler eingegrenzt werden kann. Begründen Sie die Schlüsse aus den drei ping-Ergebnissen.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Herr Hartmann die vermutete Ursache gezielt bestätigen kann, und nennen Sie die Maßnahme zur Störungsbeseitigung sowie die anschließende Funktionsprüfung.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Nennen Sie fünf Angaben, die bei der Aufnahme dieser Störungsmeldung im Ticket erfasst werden sollten, und begründen Sie, welche Priorität Sie vergeben würden.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, mit welchen vorbeugenden Maßnahmen und Dokumentationsänderungen sich ein solcher Fehler künftig vermeiden ließe.

**Musterlösungshinweise:** Teilaufgabe 1: Physische Verbindung, IP-Konfiguration (Adresse, Maske, Gateway) und die Erreichbarkeit per IP sind in Ordnung, da die Pings auf Gateway und externe IP-Adresse gelingen. Der Fehler liegt oberhalb davon bei der Namensauflösung (DNS), weil nur der Hostname-Test scheitert. Außerdem betrifft das Problem nur einen Arbeitsplatz mit abweichender, manueller DNS-Einstellung. Teilaufgabe 2: Bestätigen z. B. mit einer DNS-Abfrage (nslookup) gegen den eingetragenen und gegen den richtigen DNS-Server und Kontrolle der Netzwerkeinstellungen des Rechners. Beseitigung: den manuellen DNS-Eintrag entfernen und auf automatische Zuweisung per DHCP umstellen oder den richtigen Namensserver 192.168.40.10 eintragen. Danach Funktionsprüfung durch Aufruf einer Webseite und der Cloud-Buchhaltung, Rückmeldung an Frau Okafor. Teilaufgabe 3: Z. B. Meldende Person und Kunde, Beschreibung des Fehlerbilds und Fehlermeldungen, Beginn und Häufigkeit, Anzahl der betroffenen Arbeitsplätze, kürzliche Änderungen (Abbau des alten Servers), durchgeführte Prüfschritte. Priorität eher mittel: Auswirkung auf einen Arbeitsplatz, aber ein Arbeitsplatz mit zentralen Aufgaben und hoher Dringlichkeit am Wochenanfang, schnelle Lösung möglich. Teilaufgabe 4: Arbeitsplätze nach Möglichkeit per DHCP konfigurieren statt statisch, beim Abbau eines Servers prüfen, wo seine Adresse eingetragen ist, Netz- und Adressplan (Systemdokumentation) pflegen, Abbau-Checkliste mit Hinweis auf abhängige Dienste, ggf. Überwachung der Namensserver-Erreichbarkeit. Begründung nach Aufwand und Nutzen.

---

#### F-FU3-02 · Fallaufgabe

**Themenbezug:** 3.3 (Verfügbarkeit, Ausfallwahrscheinlichkeit, präventive Wartung)

**Ausgangssituation:** Im Bereich Datenanalyse betreibt die Brevanta IT-Systemhaus GmbH für den Handelskunden Nordmark ein Analyseportal. Der Kunde hat sich ein SLA mit 99,9 % Verfügbarkeit pro Kalendermonat (30 Tage) gewünscht. Das Portal besteht derzeit aus einem Server (Einzelverfügbarkeit 99,5 %), einem Switch (99,9 %) und einer Internetanbindung (99,5 %). Alle drei Komponenten werden zwingend benötigt und fallen unabhängig voneinander aus. Die Teamleiterin Mara Seidel möchte vor der Vertragsunterschrift wissen, ob die Zusage realistisch ist. Zusätzlich plant das Team monatliche Wartungsarbeiten an Server und Switch, die jeweils etwa 30 Minuten Stillstand verursachen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie die Gesamtverfügbarkeit des derzeitigen Aufbaus und die bei 99,9 % in einem 30-Tage-Monat zulässige Ausfallzeit in Minuten.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Beurteilen Sie anhand Ihres Ergebnisses, ob das SLA mit dem derzeitigen Aufbau erfüllbar ist, und benennen Sie die Schwachstellen (Single Points of Failure).

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwickeln Sie konkrete Lösungsvorschläge zur Erhöhung der Verfügbarkeit und zeigen Sie rechnerisch am Beispiel des Servers, wie sich eine Redundanz auswirkt.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, wie die geplanten Wartungsarbeiten im Hinblick auf die SLA-Zusage und den Nutzen präventiver Wartung zu beurteilen sind, und nennen Sie zwei Punkte, die vertraglich zu klären sind.

**Musterlösungshinweise:** Teilaufgabe 1: Reihenschaltung, also 0,995 mal 0,999 mal 0,995, ergibt rund 0,989 bzw. 98,9 %. Zulässige Ausfallzeit: 0,1 % von 30 mal 24 mal 60 = 43.200 Minuten, also 43,2 Minuten. Teilaufgabe 2: Erwartete Nichtverfügbarkeit von rund 1,1 % entspricht etwa 474 Minuten (knapp 8 Stunden) pro Monat und liegt weit über den zulässigen 43,2 Minuten; das SLA ist mit diesem Aufbau nicht erfüllbar. Schwachstellen sind alle drei Komponenten, besonders Server und Internetanbindung (jeweils nur 99,5 %), da keine davon redundant ist. Teilaufgabe 3: Z. B. zweiten Server im Cluster, zweite Internetanbindung (möglichst anderer Anbieter bzw. Weg), redundanter Switch, USV, Monitoring mit Alarmierung, getestete Datensicherung, Ersatzteilkonzept. Rechenbeispiel Server: Zwei parallele Server mit je 99,5 % ergeben 1 minus 0,005 mal 0,005 = 99,9975 %. Werden Server und Internetanbindung redundant, liegt die Gesamtverfügbarkeit bei rund 99,895 % (knapp unter 99,9 %); erst mit redundantem Switch werden rund 99,995 % erreicht. Voraussetzung: unabhängige Ausfälle (z. B. getrennte Stromversorgung). Teilaufgabe 4: Geplante Wartung kann wiederkehrende Ausfälle verhindern und ist sinnvoll, die 2 mal 30 Minuten pro Monat würden aber bereits 60 Minuten und damit das Monatsbudget von 43,2 Minuten überschreiten, wenn Wartungsfenster als Ausfall zählen. Vertraglich klären: ob geplante Wartungsfenster aus der Berechnung ausgenommen sind (und wie sie angekündigt werden) sowie Messzeitraum und Messmethode der Verfügbarkeit bzw. Konsequenzen bei Unterschreitung. Alternativ Wartung redundanter Komponenten nacheinander ohne Gesamtausfall.

---

#### F-FU3-03 · Fallaufgabe

**Themenbezug:** 3.2 (Netzwerkkonzepte, Datenaustausch) + 3.4 (Dokumentation, Barrierefreiheit, Pflege)

**Ausgangssituation:** Für den Industriekunden Kerbel Fördertechnik GmbH baut der Bereich Smart-Factory-Vernetzung der Brevanta IT-Systemhaus GmbH eine Lösung auf: Sechs fahrerlose Transportfahrzeuge und rund vierzig Sensoren in der Halle sollen ihre Daten an eine Analyseplattform in der Cloud senden. Die Fahrzeuge sind per WLAN angebunden. Das bestehende Büronetz des Kunden soll nicht beeinträchtigt werden. Brevanta möchte die Anlage zudem aus der Ferne warten. Das Instandhaltungsteam der Halle arbeitet im Schichtbetrieb, hat kaum IT-Vorkenntnisse und besteht auch aus einem Kollegen, der einen Screenreader nutzt. Die Kunden-IT Frau Yilmaz übernimmt später den Betrieb des Netzwerks. Zum Projektabschluss müssen Dokumentationen übergeben werden.

**Teilaufgabe 1 (5 Punkte, bloom: bewerten):** Bewerten Sie ein geeignetes Netzwerkkonzept. Gehen Sie auf Trennung von Produktions- und Büronetz, WLAN für die Fahrzeuge, Anbindung an die Cloud sowie die Fernwartung ein.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie, welche Dokumentationsarten übergeben werden sollten, und ordnen Sie sie den Zielgruppen zu (Instandhaltungsteam, Kunden-IT, Entscheider:innen).

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Gliederung einer einseitigen Kurzanleitung „Störung melden und erste Prüfschritte" für das Instandhaltungsteam und nennen Sie vier Maßnahmen, die sie barrierefrei machen.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Brevanta und der Kunde Pflege und Versionierung der Dokumentation regeln sollten, damit sie auch nach Änderungen an der Anlage verlässlich bleibt.

**Musterlösungshinweise:** Teilaufgabe 1: Produktionsnetz logisch (VLAN) bzw. über eine Firewall vom Büronetz trennen, damit sich Störungen nicht ausbreiten und nur gezielte Übergänge zugelassen sind; WLAN mit aktueller Verschlüsselung (WPA2/WPA3) und ausreichender Abdeckung der Fahrwege, kabelgebunden für stationäre Komponenten, wo möglich; Datenübertragung zur Cloud über Internetzugang oder VPN verschlüsselt, mit leichtgewichtigem Verfahren wie MQTT für Sensordaten, Bandbreite und Verfügbarkeit der Anbindung beachten; Fernwartung über Remote-Access-VPN mit Berechtigungsprüfung. Teilaufgabe 2: Systemdokumentation (Netzplan, Adressplan, Konfiguration, Software-Stände, Notfallpläne) für die Kunden-IT; Benutzerdokumentation in Form einer Kurzanleitung für das Instandhaltungsteam; technische Dokumentation/Schnittstellenbeschreibung (Datenformate, Protokolle) für Kunden-IT und ggf. Entwickler:innen; kurze Zusammenfassung mit Nutzen und Kosten für Entscheider:innen; dazu Abnahmeprotokoll. Teilaufgabe 3: Z. B. Zweck, Symptome erkennen, Schritt-für-Schritt-Prüfung (Stromversorgung, Statusanzeige, Netzkabel/Funkverbindung prüfen), Wann und wie wird gemeldet (Ticket, Telefon), Angaben für die Meldung, Kontakte. Barrierefrei: echte Überschriften, Alternativtexte für Bilder, ausreichender Kontrast und nicht nur Farbe, einfache Sprache, kurze Sätze, nummerierte Schritte, strukturierte Datei statt Scan. Teilaufgabe 4: Versionsstand und Änderungshistorie, Aktualisierung zusammen mit jeder Anlagenänderung als Bestandteil der Abnahme, Review durch zweite Person, zentrale Ablage mit Zugriffsrechten und Archivierung alter Fassungen, benannte Verantwortliche, regelmäßige Prüfung auf Aktualität, Zugangsdaten nicht im Klartext.
