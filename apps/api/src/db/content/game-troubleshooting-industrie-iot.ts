import type { TroubleshootingPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: Troubleshooting-Detektiv, Set „Industrie und IoT" (setKey "industrie-iot") für den Kurs
 * Fachinformatiker/in Digitale Vernetzung (zehn Störungsfälle der fiktiven Brevanta IT-Systemhaus GmbH
 * beim fiktiven Industriekunden Hallbach Kunststofftechnik GmbH, Schwierigkeit steigend).
 * Gleiche Mechanik wie das Netzwerk-Set: (1) Auf welcher Schicht liegt die Ursache? (2) Was ist die
 * wahrscheinlichste Ursache? Die Schichten sind dieselben wie im Netzwerk-Set (OSI-Schichten, von unten
 * nach oben geprüft); die Fälle verfolgen einen Wert entlang der Kette Sensor → SPS → Gateway → Broker → Leitstand.
 */
export const troubleshootingIndustrieIot: TroubleshootingPayload = {
  faelle: [
    {
      nummer: 1,
      titel: "Druck bleibt bei 0 bar",
      szenario:
        "Du bist für die Brevanta IT-Systemhaus GmbH bei der Hallbach Kunststofftechnik GmbH im Einsatz. Im Leitstand zeigt der Hydraulikdruck der Presse 04 seit dem Frühdienst 0,0 bar, obwohl die Presse normal arbeitet. Alle übrigen Werte der Presse werden korrekt angezeigt.",
      symptome: [
        "Das mechanische Manometer an der Hydraulikleitung zeigt etwa 6,5 bar; im Leitstand steht 0,0 bar, ohne Fehlermeldung.",
        "Die Analogbaugruppe der SPS meldet für den Kanal des Drucksensors (4–20 mA entsprechen 0–10 bar) einen Strom von 0,0 mA; die anderen Kanäle derselben Baugruppe liefern plausible Werte.",
        "Im Schaltschrank liegen an der Klemme des Sensorkabels 24 V DC an; am Sensorstecker vor Ort ist keine Spannung messbar.",
        "Ein Ersatzsensor am selben Kabel liefert ebenfalls 0,0 mA; die Durchgangsprüfung des freigeschalteten Kabels zeigt bei einer Ader keinen Durchgang.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Bitübertragung (Schicht 1)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der Drucksensor ist defekt." },
        { id: "u2", text: "Eine Ader der Sensorleitung ist unterbrochen (Drahtbruch im 4–20-mA-Stromkreis)." },
        { id: "u3", text: "Die Skalierung im Leitstand ist falsch eingestellt." },
        { id: "u4", text: "Der Industrie-Switch zwischen SPS und Leitstand ist ausgefallen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Ein 4–20-mA-Signal liegt im Normalbetrieb immer zwischen 4 und 20 mA; 0 mA ist kein Messwert, sondern zeigt einen unterbrochenen Stromkreis (Drahtbruch). Die übrigen Kanäle der Baugruppe arbeiten, die SPS ist also in Ordnung; ein Switchausfall würde alle Werte der Presse treffen, und eine falsche Skalierung im Leitstand ändert das Signal an der SPS nicht. Der Ersatzsensor liefert ebenfalls 0 mA und schließt den Sensor aus; Spannung im Schrank, aber nicht am Sensor, und die fehlende Ader belegen den Leitungsbruch. Das ist kein Netzwerkprotokoll, sondern die physikalische Leitung (unterste Ebene). Maßnahme: Anlage freischalten (nur befugtes Personal), Kabel ersetzen; Werte unter 4 mA künftig als ungültig kennzeichnen statt „0 bar“ anzuzeigen.",
    },
    {
      nummer: 2,
      titel: "Neues Gateway sieht die Steuerung nicht",
      szenario:
        "Bei der Hallbach Kunststofftechnik GmbH wurde für die Spritzgießmaschine 07 ein neues Edge-Gateway an einem Industrie-Switch in Betrieb genommen. Es soll per Modbus TCP Werte der Maschinensteuerung lesen, meldet aber „Gegenstelle nicht erreichbar“. Das Maschinennetz ist laut Netzplan das VLAN 10 mit 10.10.10.0/24.",
      symptome: [
        "Link-LED am Gateway und Portstatus „up“ (1 Gbit/s, Vollduplex); keine Fehlerzähler am Port.",
        "Das Gateway hat laut Planung die feste Adresse 10.10.10.50/24; ping 10.10.10.20 (Maschinensteuerung) endet mit einer Zeitüberschreitung, arp -a zeigt für 10.10.10.20 keinen Eintrag.",
        "Die Portkonfiguration zeigt für den Gateway-Port „Access-VLAN 20 (Büro-IT)“; die Ports der Steuerungen stehen auf „Access-VLAN 10“.",
        "Wird das Gateway testweise an einen freien Port mit Access-VLAN 10 gesteckt, funktioniert der Ping auf die Steuerung sofort.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Transport (Schicht 4)" },
        { id: "s2", text: "Anwendung (Schicht 7)" },
        { id: "s3", text: "Sicherung (Schicht 2)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Das Patchkabel des Gateways ist defekt." },
        { id: "u2", text: "Die Maschinensteuerung ist ausgefallen." },
        { id: "u3", text: "Der Switchport des Gateways ist dem falschen VLAN (20 statt 10) zugeordnet." },
        { id: "u4", text: "Die Subnetzmaske des Gateways ist falsch eingetragen." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Link und Portstatus sind in Ordnung, ein Kabelfehler (Schicht 1) scheidet aus. Adresse und Maske /24 passen zum Maschinennetz, daher liegt auch kein Konfigurationsfehler in der IP-Adressierung vor. Die Steuerung läuft, denn am Port mit VLAN 10 antwortet sie sofort. Entscheidend ist die Portkonfiguration: VLANs trennen Netze auf Schicht 2. Die ARP-Anfrage des Gateways landet in VLAN 20 und erreicht die Steuerung nie, deshalb gibt es keinen ARP-Eintrag. Maßnahme: Konfiguration des Switches vorher sichern, den Port als Access-Port in VLAN 10 setzen, danach Verbindung testen und Netzplan sowie Portbeschriftung anpassen.",
    },
    {
      nummer: 3,
      titel: "Fördertechnik meldet zeitweise Störung",
      szenario:
        "Im Leitstand der Hallbach Kunststofftechnik GmbH erscheint seit gestern Nachmittag immer wieder „Kommunikationsstörung Fördertechnik“, meist nur für wenige Sekunden. Die Steuerung der Fördertechnik hat die feste Adresse 10.10.10.30. Am Vortag wurde in Halle 3 ein defektes Bedienpanel gegen ein Gerät aus dem Lager getauscht.",
      symptome: [
        "Link-LEDs an Steuerung und Switch leuchten stabil; die Switchports zeigen weder Link-Wechsel noch Fehlerzähler.",
        "ping 10.10.10.30 liefert abwechselnd Antworten und Zeitüberschreitungen; die Antworten kommen mit normaler Laufzeit (1 ms).",
        "arp -a am Leitstandrechner zeigt für 10.10.10.30 im Wechsel zwei verschiedene MAC-Adressen.",
        "Die zweite MAC-Adresse gehört laut Switch-Tabelle zu einem Port in Halle 3, an dem das Ersatz-Bedienpanel hängt.",
        "Wird das Netzwerkkabel des Ersatzpanels testweise gezogen, antwortet 10.10.10.30 wieder stabil.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Bitübertragung (Schicht 1)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Anwendung (Schicht 7)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Steuerung und Ersatz-Bedienpanel verwenden dieselbe feste IP-Adresse (10.10.10.30)." },
        { id: "u2", text: "Das Netzwerkkabel der Steuerung hat einen Wackelkontakt." },
        { id: "u3", text: "Der DHCP-Server vergibt Adressen doppelt." },
        { id: "u4", text: "Der Industrie-Switch ist überlastet." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Stabile Link-LEDs und fehlerfreie Ports sprechen gegen einen Wackelkontakt (Schicht 1). Eine Überlast des Switches würde Antwortzeiten erhöhen, hier sind sie normal. Die Adresse der Steuerung ist fest eingestellt, ein DHCP-Fehler passt deshalb nicht. Zwei verschiedene MAC-Adressen für dieselbe IP-Adresse sind das typische Bild eines IP-Adresskonflikts: Mal antwortet die Steuerung, mal das Panel, das mit der Adresse aus dem Lager mitgebracht wurde. Der Test mit gezogenem Panelkabel bestätigt es. Das Problem liegt in der Adressierung (Schicht 3). Maßnahme: dem Panel eine freie Adresse geben, die Adressliste (IP-Plan) pflegen und Ersatzteile vor dem Einbau auf Standardeinstellungen prüfen.",
    },
    {
      nummer: 4,
      titel: "Modbus-Verbindung kommt nicht zustande",
      szenario:
        "Nach der Einführung einer Firewall zwischen Maschinennetz (10.10.10.0/24) und IT-Netz (10.20.5.0/24) liefert das Edge-Gateway 10.20.5.10 bei der Hallbach Kunststofftechnik GmbH keine Werte der Presse 04 mehr. Laut Kommunikationsmatrix baut das Gateway die Modbus-TCP-Verbindung zur Presse (10.10.10.20, Port 502) auf.",
      symptome: [
        "ping 10.10.10.20 und traceroute vom Gateway aus erreichen die Steuerung der Presse ohne Probleme.",
        "Die Portprüfung vom Gateway auf TCP 502 der Presse endet nach der Wartezeit mit „TcpTestSucceeded: False“; die Weboberfläche der Steuerung auf Port 443 ist vom Gateway aus erreichbar.",
        "Ein Modbus-Testclient, der direkt im Maschinennetz an der Steuerung hängt, liest die Register ohne Fehler.",
        "Im Log der Firewall steht: „Drop TCP 10.20.5.10 → 10.10.10.20:502, Regel: Default-Deny“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Transport (Schicht 4)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Die Modbus-Funktion der Steuerung ist deaktiviert." },
        { id: "u2", text: "Die Firewall lässt TCP-Port 502 vom Gateway zur Presse nicht durch (Freigabe fehlt)." },
        { id: "u3", text: "Zwischen IT-Netz und Maschinennetz fehlt eine Route." },
        { id: "u4", text: "Die Subnetzmaske des Gateways ist falsch eingetragen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Der Ping und traceroute gelingen, damit sind Verkabelung, Routing und Adressierung in Ordnung (Schicht 1 bis 3); eine fehlende Route oder eine falsche Maske scheiden aus. Die Steuerung selbst läuft: Der Testclient im Maschinennetz liest die Register, die Modbus-Funktion ist also aktiv. Nur der Port 502 ist über die Zonengrenze nicht erreichbar, während Port 443 desselben Geräts durchkommt, und das Firewall-Log zeigt das Verwerfen durch die Standardregel. Ports gehören zur Transportschicht (Schicht 4). Maßnahme: Die in der Kommunikationsmatrix beschriebene Verbindung als Regel freigeben (nur vom Gateway zur Presse, nur TCP 502) und die Änderung dokumentieren.",
    },
    {
      nummer: 5,
      titel: "Uhrzeit der Messwerte weicht ab",
      szenario:
        "Der Leitstand der Hallbach Kunststofftechnik GmbH zeigt Messwerte der Presse 04 mit Zeitstempeln, die in der Zukunft liegen. Die Werte der anderen Gateways im Werk haben korrekte Zeiten. In der Ereignisliste erscheint deshalb ein Alarm der Presse scheinbar vor seiner Ursache.",
      symptome: [
        "Die Zeitstempel der Werte vom Edge-Gateway der Presse 04 liegen 3 Minuten und 40 Sekunden vor der Leitstandszeit; vor drei Tagen waren es noch etwa 1 Minute, die Abweichung wächst langsam.",
        "ping zum Zeitserver 10.20.0.2 funktioniert; ein anderes Gerät im selben Netz wie das Gateway gleicht seine Uhr erfolgreich ab (Abweichung unter 1 Sekunde).",
        "Die Werte treffen im Sekundentakt ein; die Laufzeit zwischen Gateway und Leitstand beträgt wenige Millisekunden.",
        "In der Zeiteinstellung des Gateways ist als Zeitquelle „lokale Systemuhr“ eingetragen, ein Zeitserver fehlt; das Gerät wurde vor drei Wochen mit Werkseinstellungen in Betrieb genommen.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Transport (Schicht 4)" },
        { id: "s2", text: "Anwendung (Schicht 7)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Vermittlung (Schicht 3)" },
        { id: "s5", text: "Sicherung (Schicht 2)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Das Gateway ist nicht mit einem Zeitserver synchronisiert; seine Uhr läuft frei und driftet." },
        { id: "u2", text: "Der Zeitserver im Werk liefert eine falsche Uhrzeit." },
        { id: "u3", text: "Die Übertragung der Messwerte ist durch Netzlatenz verzögert." },
        { id: "u4", text: "Zeitzone oder Sommerzeit sind im Gateway falsch eingestellt." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Eine Verzögerung im Netz würde Zeitstempel in der Vergangenheit erzeugen, hier liegen sie in der Zukunft; zudem sind die Laufzeiten kurz. Ein falscher Zeitserver scheidet aus, weil andere Geräte sich erfolgreich abgleichen. Eine falsche Zeitzone ergäbe eine feste Abweichung von ganzen Stunden, die Abweichung hier ist kein Stundenwert und wächst. Zusammen mit der Konfiguration (Zeitquelle lokale Uhr) bleibt: Die Uhr läuft frei und driftet. Wer Ereignisse mehrerer Systeme auswertet, braucht eine gemeinsame Zeitbasis, sonst werden Ursache und Wirkung vertauscht. Maßnahme: NTP-Zeitserver eintragen (UDP 123 laut Matrix), Abweichung überwachen.",
    },
    {
      nummer: 6,
      titel: "Temperatur um den Faktor 10 zu klein",
      szenario:
        "Im Leitstand der Hallbach Kunststofftechnik GmbH zeigt die Zylindertemperatur der Spritzgießmaschine 07 nur 21,5 °C statt der erwarteten Werte um 215 °C. Das Edge-Gateway wurde am Vortag mit einer neuen Konfiguration für diese Maschine versehen; die Verbindung zur Steuerung besteht.",
      symptome: [
        "Das Display der Steuerung zeigt 215 °C, der Leitstand 21,5 °C. Die Kurve im Leitstand steigt und fällt im gleichen Verlauf wie die echte Temperatur, nur auf einem Zehntel.",
        "Ein Modbus-Testclient liest Holding-Register 100 der Steuerung und erhält den Rohwert 2150; laut Schnittstellenbeschreibung der Steuerung liegen Temperaturen in Zehntelgrad vor.",
        "Im Mapping des Gateways steht für den Datenpunkt „Zylindertemperatur“: Register 100, Typ UInt16, Skalierungsfaktor 0,01.",
        "Ping, Port 502 und die Aktualisierung im Sekundentakt arbeiten fehlerfrei; die Werte anderer Datenpunkte (Drehzahl, Druck) sind richtig.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Sicherung (Schicht 2)" },
        { id: "s3", text: "Vermittlung (Schicht 3)" },
        { id: "s4", text: "Transport (Schicht 4)" },
        { id: "s5", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Der Temperaturfühler ist falsch kalibriert." },
        { id: "u2", text: "Das Gateway liest das falsche Register." },
        { id: "u3", text: "Das Gateway rechnet den Rohwert mit dem falschen Skalierungsfaktor um (0,01 statt 0,1)." },
        { id: "u4", text: "Zeitüberschreitungen im Netz verfälschen die Werte." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Die Datenübertragung funktioniert: Ping, Port, Aktualisierungstakt und die anderen Datenpunkte sind in Ordnung, also liegt weder ein Netz- noch ein Verbindungsproblem vor. Der Rohwert im richtigen Register ist 2150, das Display der Steuerung zeigt 215 °C, damit ist weder der Fühler falsch kalibriert noch das falsche Register gelesen. Der Fehler entsteht erst bei der Umrechnung: 2150 × 0,1 = 215,0 °C, mit 0,01 ergeben sich 21,5 °C. Das ist ein Fehler im Datenmapping auf der Anwendungsebene. Mit der Plausibilisierung (Vergleich mit dem Display) fällt er auf. Maßnahme: Faktor im Mapping korrigieren, danach Ende-zu-Ende prüfen und die Schnittstellenbeschreibung aktualisieren.",
    },
    {
      nummer: 7,
      titel: "Energie-Dashboard bleibt leer",
      szenario:
        "Für das neue Energie-Dashboard der Hallbach Kunststofftechnik GmbH wurde ein Dienst eingerichtet, der Messwerte zur Stromaufnahme vom MQTT-Broker abonnieren soll. Der Dienst startet ohne Fehlermeldung, aber im Dashboard erscheinen keine Werte. Die Gateways veröffentlichen die Werte unter werk1/halle2/energie/…",
      symptome: [
        "Der Dienst baut die Verbindung zum Broker (Port 8883) erfolgreich auf; Benutzername und Passwort werden akzeptiert.",
        "Ein Test-Abonnent, der sich mit dem Administrator-Konto auf werk1/halle2/energie/# anmeldet, erhält die Werte im Sekundentakt.",
        "Der Dienst abonniert dasselbe Topic werk1/halle2/energie/#; die Schreibweise stimmt mit den veröffentlichten Topics überein.",
        "Im Broker-Log steht für den Benutzer „dashboard“: „Subscribe auf werk1/halle2/energie/# verweigert“; die Zugriffsliste erlaubt diesem Benutzer nur das Lesen von werk1/halle2/prozess/#.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Vermittlung (Schicht 3)" },
        { id: "s2", text: "Transport (Schicht 4)" },
        { id: "s3", text: "Bitübertragung (Schicht 1)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
        { id: "s5", text: "Anwendung (Schicht 7)" },
      ],
      richtigeSchicht: "s5",
      ursachenOptionen: [
        { id: "u1", text: "Der MQTT-Broker ist ausgefallen." },
        { id: "u2", text: "Eine Firewall blockiert den Port 8883." },
        { id: "u3", text: "Die Gateways veröffentlichen keine Energiewerte." },
        { id: "u4", text: "Dem Benutzer des Dashboards fehlt in der Zugriffsliste des Brokers die Leseberechtigung für dieses Topic." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Die Verbindung steht und die Anmeldung gelingt, der Broker läuft also und der Port ist offen (Transport und darunter in Ordnung). Der Test-Abonnent mit Administrator-Konto bekommt die Werte, die Gateways veröffentlichen sie demnach. Die Topic-Schreibweise stimmt. Übrig bleibt die Autorisierung: Anmeldung (wer bin ich) und Berechtigung (was darf ich) sind getrennte Schritte, und das Broker-Log nennt die Verweigerung. Das ist eine Frage der Anwendung (Broker-Konfiguration). Maßnahme: der Zugriffsliste für den Benutzer „dashboard“ gezielt Lesen auf werk1/halle2/energie/# hinzufügen (nur so viel wie nötig), danach testen und die Kommunikationsmatrix anpassen.",
    },
    {
      nummer: 8,
      titel: "OPC UA bricht beim Verbindungsaufbau ab",
      szenario:
        "Seit Montag um Mitternacht erhält das MES der Hallbach Kunststofftechnik GmbH keine Fertigungsdaten mehr von der Abfüllanlage. Die Anbindung läuft über OPC UA zwischen einem Adapter-Dienst (Client) und dem OPC-UA-Server der Anlage. Am Wochenende wurde nichts geändert.",
      symptome: [
        "ping auf den OPC-UA-Server funktioniert; die Portprüfung auf TCP 4840 ist erfolgreich (TcpTestSucceeded: True).",
        "Im Log des Adapter-Dienstes steht seit Montag 00:00:04 bei jedem Verbindungsversuch: „Sichere Verbindung abgelehnt: BadCertificateTimeInvalid“.",
        "Das Zertifikat des Adapter-Dienstes ist laut Zertifikatsspeicher „gültig bis Sonntag 23:59 Uhr“ und wurde vor genau einem Jahr ausgestellt.",
        "Die Systemzeit des Adapter-Rechners ist korrekt (Abweichung unter 1 Sekunde zum Zeitserver).",
        "Ein Diagnose-Client mit gültigem Zertifikat kann die Knoten des Servers von einem anderen Rechner aus lesen.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Sicherung (Schicht 2)" },
        { id: "s2", text: "Anwendung (Schicht 7)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Bitübertragung (Schicht 1)" },
        { id: "s5", text: "Vermittlung (Schicht 3)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Eine Firewall blockiert den Port 4840." },
        { id: "u2", text: "Das Zertifikat des OPC-UA-Clients ist abgelaufen; der Server lehnt die sichere Verbindung ab." },
        { id: "u3", text: "Die Uhr des Adapter-Rechners geht falsch." },
        { id: "u4", text: "Der OPC-UA-Server der Anlage ist ausgefallen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Bis zum Verbindungsaufbau auf Port 4840 ist alles in Ordnung: Ping und Portprüfung gelingen, Firewall und Netz sind also nicht schuld. Der Server läuft, ein Diagnose-Client mit gültigem Zertifikat liest ihn problemlos. Die Systemzeit des Adapters stimmt, eine falsche Uhr (die ein Zertifikat fälschlich als abgelaufen erscheinen ließe) scheidet damit aus. Das Log nennt den ungültigen Zeitraum, und das Zertifikat war bis Sonntag 23:59 Uhr gültig: Es ist schlicht abgelaufen, genau zum Ablaufzeitpunkt begann die Störung. Das ist ein Problem der Anwendung (OPC UA, sicherer Kanal). Maßnahme: neues Zertifikat ausstellen und auf dem Server als vertrauenswürdig hinterlegen; Ablaufdaten in einem Zertifikatsinventar überwachen.",
    },
    {
      nummer: 9,
      titel: "Werte stehen seit Mittag still",
      szenario:
        "Im Leitstand der Hallbach Kunststofftechnik GmbH stehen alle Messwerte der Halle 2 seit 13:12 Uhr unverändert, auch der Zeitstempel bleibt stehen. Alarme gibt es keine. Die Werte aus Halle 1 aktualisieren sich normal. Die Daten laufen von der SPS über das Edge-Gateway der Halle 2 zum MQTT-Broker und von dort zum Leitstand.",
      symptome: [
        "Ein Test-Abonnent auf dem Broker erhält für Topics aus Halle 1 laufend neue Nachrichten, für Topics aus Halle 2 seit 13:12 Uhr keine mehr; der Broker zeigt sonst keine Auffälligkeiten.",
        "Ein Modbus-Testclient im Maschinennetz liest die Register der SPS der Halle 2: Die Werte ändern sich laufend (z. B. 78,9 °C, im Leitstand steht seit 13:12 Uhr 74,2 °C).",
        "Vom Gateway aus gelingen der Verbindungstest zum Broker (TCP 8883) und zur SPS (TCP 502).",
        "Der Dienst „Gateway-Anwendung“ steht im Status „läuft“, belegt aber dauerhaft einen CPU-Kern zu 100 %; das Log der Anwendung enthält seit 13:12 Uhr keinen Eintrag mehr.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Transport (Schicht 4)" },
        { id: "s2", text: "Vermittlung (Schicht 3)" },
        { id: "s3", text: "Anwendung (Schicht 7)" },
        { id: "s4", text: "Sicherung (Schicht 2)" },
        { id: "s5", text: "Bitübertragung (Schicht 1)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Der MQTT-Broker ist ausgefallen." },
        { id: "u2", text: "Die Sensoren der Halle 2 liefern einen konstanten Wert." },
        { id: "u3", text: "Eine Firewall blockiert die Verbindung zwischen Gateway und Broker." },
        { id: "u4", text: "Die Anwendung auf dem Edge-Gateway hängt und veröffentlicht keine neuen Werte mehr." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Die Ende-zu-Ende-Prüfung grenzt die Stelle ein: An der SPS ändern sich die Werte, am Broker kommen sie nicht mehr an, die Lücke liegt also dazwischen. Konstante Sensorwerte scheiden damit aus. Der Broker arbeitet für Halle 1 normal, und die Verbindungstests vom Gateway zu Broker und SPS gelingen, daher sind Broker, Firewall und Netz nicht die Ursache. Der Prozess steht auf „läuft“, verbraucht aber Rechenzeit ohne Lebenszeichen im Log, typisch für eine hängende Anwendung. Ein laufender Prozess ist kein funktionierender. Maßnahme: nach Absprache mit dem Anlagenverantwortlichen Log sichern und Dienst neu starten, Ursache klären (Update?) und die Aktualität der Werte überwachen.",
    },
    {
      nummer: 10,
      titel: "Broker wird immer langsamer",
      szenario:
        "Beim MQTT-Broker der Hallbach Kunststofftechnik GmbH steigt seit dem Morgen die Verzögerung: Messwerte erreichen den Leitstand mit zunehmender Verspätung, gegen 07:00 Uhr droht der Broker-Dienst auszufallen. Gestern Abend um 22:00 Uhr wurde der MES-Adapter für Wartungsarbeiten abgeschaltet.",
      symptome: [
        "Der Broker-Rechner hat 97 % des Arbeitsspeichers belegt, der Broker-Prozess allein 1,8 GB; das Betriebssystem lagert bereits aus (Swap aktiv).",
        "Die Eingangsrate der Gateways ist unverändert (rund 150 Nachrichten pro Sekunde wie an jedem Tag); die Auslastung der Netzwerkports und des Switches ist niedrig.",
        "Die Broker-Statistik zeigt für den Client „mes-adapter“ (persistente Sitzung, QoS 1, getrennt seit 22:00 Uhr) rund 4,9 Millionen wartende Nachrichten; die Warteschlange ist nicht begrenzt.",
        "Alle anderen Clients sind verbunden; Zertifikate sind gültig und TLS-Verbindungen kommen zustande.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Anwendung (Schicht 7)" },
        { id: "s2", text: "Bitübertragung (Schicht 1)" },
        { id: "s3", text: "Transport (Schicht 4)" },
        { id: "s4", text: "Vermittlung (Schicht 3)" },
        { id: "s5", text: "Sicherung (Schicht 2)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Ein Gateway erzeugt durch eine Fehlkonfiguration eine Flut von Nachrichten." },
        { id: "u2", text: "Das Netzwerk zwischen Gateways und Broker ist überlastet." },
        { id: "u3", text: "Das TLS-Zertifikat des Brokers ist abgelaufen." },
        { id: "u4", text: "Der Broker staut für den abgeschalteten MES-Adapter (persistente Sitzung) ungebremst Nachrichten auf und gerät in Speichermangel." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Die Eingangsrate ist normal, es gibt also keine Nachrichtenflut, und die niedrige Auslastung der Ports spricht gegen ein überlastetes Netz. Zertifikate sind gültig, Verbindungen kommen zustande. Die Zahlen passen zur Warteschlange: 150 Nachrichten pro Sekunde über 9 Stunden (32.400 s) sind rund 4,9 Millionen. Bei einer persistenten Sitzung mit QoS 1 hebt der Broker alle Nachrichten für den getrennten Client auf; ohne Begrenzung füllt das den Speicher, bis der Broker langsam wird. Das ist ein Problem der Broker-Konfiguration (Anwendungsebene). Maßnahme: Adapter wieder starten oder die Sitzung löschen, Queue-Limit und Ablaufzeit für Nachrichten setzen und Warteschlangen überwachen.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zehn Störungsfälle aus Industrie und IoT gelöst. Dein Vorgehen: Verfolge einen Wert Ende zu Ende von Sensor, SPS, Gateway und Broker bis zum Leitstand und prüfe von unten nach oben: Leitung und Spannung, Port und VLAN, Adresse und Erreichbarkeit, Port und Firewall, danach Protokollinhalt, Skalierung, Uhrzeit, Berechtigung und Zertifikat. Ein erfolgreicher Ping beweist nicht, dass ein Dienst läuft, und ein angekommener Wert ist nicht automatisch richtig. Vergleiche, plausibilisiere und ändere immer nur eine Sache auf einmal.",
};
