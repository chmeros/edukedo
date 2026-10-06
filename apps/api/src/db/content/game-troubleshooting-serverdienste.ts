import type { TroubleshootingPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: Troubleshooting-Detektiv, Set „Serverdienste" (setKey "serverdienste") für den Kurs
 * Fachinformatiker/in Systemintegration (zehn Störungsfälle rund um Server und Netzwerkdienste, Windows und
 * Linux gemischt, Schwierigkeit steigend; Kunden der fiktiven Brevanta IT-Systemhaus GmbH).
 * Gleiche Mechanik wie die anderen Troubleshooting-Sets: (1) Wo liegt die Ursache? (2) Was ist die
 * wahrscheinlichste Ursache? Die OSI-Schichten passen für Serverdienste nur teilweise (Speicherplatz, Uhrzeit,
 * Berechtigungen oder Zertifikate sind keine Schichten des Modells). Deshalb wählt das Set statt der
 * OSI-Schichten fünf „Ebenen" eines Serverdienstes, die von unten nach oben geprüft werden: Netzanbindung,
 * Firewall, Betriebssystem, Dienstkonfiguration, Konten/Rechte/Zertifikate.
 */
export const troubleshootingServerdienste: TroubleshootingPayload = {
  faelle: [
    {
      nummer: 1,
      titel: "Webdienst startet nach der Wartung nicht",
      szenario:
        "Die Hansen Baustoffe GmbH betreibt ihr Intranet auf einem Linux-Server (websrv01). Nach dem Wartungsfenster am Wochenende ist die Seite nicht erreichbar. Ein Kollege der Brevanta IT-Systemhaus GmbH hat am Freitag Updates eingespielt und den Server neu gestartet; der Webdienst sollte danach automatisch laufen.",
      symptome: [
        "systemctl status webdienst zeigt „Active: failed (Result: exit-code)“; der Hauptprozess wurde mit „status=1/FAILURE“ beendet.",
        "Im Journal steht kurz vor dem Abbruch: „bind() to 0.0.0.0:443 failed (98: Address already in use)“.",
        "ss -tlnp zeigt für Port 443 den Eintrag „LISTEN 0 511 0.0.0.0:443“ mit dem Prozess testproxy (pid=2317); dieser Prozess läuft seit dem Wartungsfenster.",
        "Die Konfigurationsprüfung des Webdienstes meldet „Syntax OK“; Zertifikat und Dokumentenverzeichnis sind für das Dienstkonto lesbar.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s2", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s3", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s4", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Die Konfigurationsdatei des Webdienstes enthält einen Syntaxfehler." },
        { id: "u2", text: "Die Host-Firewall des Servers blockiert den Port 443." },
        { id: "u3", text: "Ein anderer Prozess (ein Test-Proxy) belegt den Port 443, deshalb kann der Webdienst ihn nicht öffnen." },
        { id: "u4", text: "Dem Dienstkonto fehlen die Rechte auf das Dokumentenverzeichnis." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Die Fehlermeldung nennt die Stelle genau: Der Webdienst kann den Port nicht öffnen, weil er schon vergeben ist, und ss zeigt, welcher Prozess ihn hält. Ein Syntaxfehler scheidet aus, denn die Konfigurationsprüfung ist in Ordnung. Fehlende Rechte hätten eine „Permission denied“-Meldung zur Folge, und eine Firewall greift erst bei eingehenden Verbindungen, verhindert aber nicht das Starten des Dienstes. Ein Port kann zur selben Zeit nur von einem Prozess belegt werden; das ist ein Ressourcenkonflikt im Betriebssystem. Maßnahme: klären, wer den Test-Proxy installiert hat und ob er noch gebraucht wird, ihn dann beenden und deaktivieren, den Webdienst starten und im Wartungsprotokoll festhalten.",
    },
    {
      nummer: 2,
      titel: "Speichern nicht mehr möglich, obwohl Platz da ist",
      szenario:
        "In der Steuerkanzlei Rehfeld & Partner (Windows-Dateiserver FS01) meldet eine Sachbearbeiterin, dass sie auf ihrem Home-Laufwerk H: nichts mehr speichern kann. Die Kolleginnen arbeiten ohne Probleme. Im Monitoring des Servers steht seit Wochen keine Warnung zum Speicherplatz.",
      symptome: [
        "Beim Speichern erscheint „Es ist nicht genügend Speicherplatz vorhanden“; Löschen und Lesen funktionieren.",
        "Das Datenvolumen D: von FS01 hat 4,0 TB Kapazität, 1,9 TB sind frei (Füllstand 52 %); alle anderen Home-Verzeichnisse sind beschreibbar.",
        "Die Quotenverwaltung zeigt für D:/Home/m.keller eine feste Quote (hard quota) von 20 GB; Verbrauch 20,0 GB, also 100 %.",
        "Im Home-Verzeichnis liegt ein Archivordner „Postfach-Export“ mit 11 GB; die Berechtigungen des Ordners sind unverändert.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s2", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s3", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s4", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Für das Home-Verzeichnis der Benutzerin gilt eine harte Quote, und sie ist ausgeschöpft." },
        { id: "u2", text: "Das Datenvolumen D: des Servers ist voll." },
        { id: "u3", text: "Der Benutzerin fehlt die Schreibberechtigung auf ihr Home-Verzeichnis." },
        { id: "u4", text: "Die Netzwerkverbindung zum Dateiserver ist gestört." },
      ],
      richtigeUrsache: "u1",
      erklaerung:
        "Das Volumen hat reichlich Platz und die Kolleginnen speichern problemlos, also ist weder der Server voll noch das Netz gestört (Verbindung und Lesen funktionieren). Gegen eine fehlende Schreibberechtigung spricht die Meldung zum Speicherplatz: Bei fehlenden Rechten käme „Zugriff verweigert“, und die Berechtigungen sind unverändert. Die Quotenverwaltung nennt die Ursache: Die feste Quote von 20 GB ist erreicht, weitere Schreibvorgänge werden abgewiesen, obwohl das Volumen leer genug ist. Quoten begrenzen den Verbrauch je Benutzer oder Ordner. Maßnahme: mit der Benutzerin den Export aufräumen oder archivieren; ist der Bedarf begründet, die Quote nach Rücksprache mit der Fachabteilung anheben und die Warnschwelle (z. B. 80 %) einrichten.",
    },
    {
      nummer: 3,
      titel: "Neue Geräte bekommen keine Adresse",
      szenario:
        "Bei der Hausverwaltung Seeberg GmbH melden sich seit heute früh neue Notebooks und Smartphones im Büro-WLAN und im Büronetz ohne gültige Adresse. Bereits angemeldete Geräte arbeiten normal. Der DHCP-Server (Windows Server) steht im selben Netz 10.70.10.0/24 wie die Clients.",
      symptome: [
        "ipconfig /all auf einem betroffenen Notebook zeigt „DHCP aktiviert: Ja“ und eine Adresse 169.254.31.7 mit dem Zusatz „Autokonfiguration“; Link und Signal sind in Ordnung.",
        "Der Dienst „DHCP-Server“ läuft; im Ereignisprotokoll gibt es keine Fehler, der Server ist autorisiert.",
        "Die Bereichsstatistik zeigt für 10.70.10.0 einen Adresspool von .100 bis .200 (101 Adressen): 101 vergeben, 0 verfügbar (100 %); die Leasedauer beträgt 8 Tage.",
        "In der Leaseliste stehen viele Einträge von Geräten, die laut Hostname Smartphones sind und seit Tagen nicht mehr aktiv waren.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s2", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s3", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s4", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Der DHCP-Dienst ist abgestürzt und antwortet nicht mehr." },
        { id: "u2", text: "Der Adresspool des DHCP-Bereichs ist erschöpft (zu klein, Leasedauer zu lang), es ist keine freie Adresse mehr vorhanden." },
        { id: "u3", text: "Ein zweiter, nicht autorisierter DHCP-Server verteilt falsche Adressen." },
        { id: "u4", text: "Die Switchports der betroffenen Geräte liegen im falschen VLAN." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Die Adresse 169.254.x.x vergibt sich das Gerät selbst, wenn es keine Antwort eines DHCP-Servers erhält. Der Dienst läuft jedoch, und die Statistik zeigt 0 verfügbare Adressen: Der Pool ist leer. Ein zweiter DHCP-Server würde Angebote verteilen, die Geräte erhielten dann irgendeine Adresse (aber keine 169.254-Adresse). Ein falsches VLAN passt nicht, da dieselben Ports vorher funktionierten und der Server im selben Netz steht. Ursache sind 8-Tage-Leases von Geräten, die längst weg sind, bei einem für die Zahl der Geräte zu kleinen Pool. Maßnahme: veraltete Leases bereinigen, den Pool vergrößern oder die Leasedauer für das WLAN verkürzen, dazu eine Warnung bei hoher Poolauslastung einrichten.",
    },
    {
      nummer: 4,
      titel: "Neue Anwendung: Verbindung läuft in die Zeitüberschreitung",
      szenario:
        "Die Spedition Rademacher GmbH hat eine neue Tourenplanung als Webanwendung auf einem Linux-Server (app01, 10.40.0.21) installiert. Sie lauscht auf TCP 8443. Von den Arbeitsplätzen im Büronetz 10.40.10.0/24 lässt sich die Seite nicht aufrufen; der Browser wartet und gibt irgendwann auf.",
      symptome: [
        "Auf app01: ss -tln zeigt „LISTEN 0 4096 0.0.0.0:8443“; curl -k https://localhost:8443 liefert „HTTP/1.1 200 OK“.",
        "Vom Arbeitsplatz aus: ping app01 antwortet in 1 ms; die Portprüfung auf TCP 8443 endet nach etwa 20 Sekunden mit „TcpTestSucceeded: False“, also ohne sofortige Ablehnung.",
        "Der SSH-Port 22 desselben Servers ist vom Arbeitsplatz aus erreichbar.",
        "Die Regelliste der Host-Firewall enthält Freigaben für TCP 22, 80 und 443, die Standardrichtlinie für eingehenden Verkehr lautet „drop“; im Protokoll steht: „DROP IN=ens18 SRC=10.40.10.15 DST=10.40.0.21 PROTO=TCP DPT=8443“.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s2", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s3", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s4", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s5", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Der Dienst der Anwendung läuft nicht." },
        { id: "u2", text: "Das Zertifikat der Anwendung ist ungültig." },
        { id: "u3", text: "Zwischen Büronetz und Servernetz fehlt eine Route." },
        { id: "u4", text: "Die Host-Firewall des Servers lässt eingehende Verbindungen auf TCP 8443 nicht zu (Freigabe fehlt)." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Der Dienst läuft und lauscht auf dem Port, denn lokal liefert er eine Antwort. Ping und der SSH-Port zeigen, dass Netz und Routing in Ordnung sind. Ein ungültiges Zertifikat würde eine Browserwarnung nach erfolgreichem Verbindungsaufbau auslösen, nicht eine Zeitüberschreitung. Dass die Verbindung ohne jede Antwort hängt (und nicht sofort mit „Verbindung abgelehnt“ endet), ist typisch für eine Firewall, die Pakete stillschweigend verwirft; das Protokoll belegt es. Ein geschlossener Port ohne Dienst würde dagegen sofort abgewiesen. Maßnahme: eine Regel nur für TCP 8443 aus dem Büronetz hinzufügen, nicht die Firewall abschalten, danach testen und die Freigabe dokumentieren.",
    },
    {
      nummer: 5,
      titel: "Zugriff verweigert auf die Finanzablage",
      szenario:
        "Bei der Maschinenbau Kolbe GmbH hat ein neuer Mitarbeiter in der Buchhaltung seinen Arbeitsplatz erhalten. Er kann sich anmelden und arbeiten, aber die Freigabe Finanzen auf dem Windows-Dateiserver FS01 lässt sich nicht öffnen. Seine Kollegin am Nachbartisch öffnet sie ohne Probleme.",
      symptome: [
        "Anmeldung an der Domäne gelingt; die Freigabe Allgemein auf FS01 lässt sich öffnen; beim Öffnen von Finanzen kommt „Zugriff verweigert“.",
        "Freigabeberechtigungen der Freigabe Finanzen: „Authentifizierte Benutzer: Ändern“. NTFS-Berechtigungen des Ordners: „GG_Finanzen: Ändern, Administratoren: Vollzugriff“.",
        "Die Gruppenmitgliedschaften des neuen Benutzers: Domänen-Benutzer und GG_Allgemein; GG_Finanzen ist nicht dabei.",
        "Die Kollegin ist Mitglied der Gruppe GG_Finanzen.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s2", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s3", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s4", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s5", text: "Firewall und Netzfilter (Erreichbarkeit)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Der Dateidienst auf FS01 ist gestört." },
        { id: "u2", text: "Die Freigabeberechtigung der Freigabe Finanzen ist zu streng." },
        { id: "u3", text: "Der Benutzer ist nicht Mitglied der Gruppe, die auf NTFS-Ebene Zugriff auf den Ordner hat (GG_Finanzen)." },
        { id: "u4", text: "Das Benutzerkonto ist gesperrt." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Die Anmeldung und die Freigabe Allgemein zeigen, dass Konto, Netz und Dateidienst in Ordnung sind; ein gesperrtes Konto hätte schon die Anmeldung verhindert. Die Freigabeberechtigung lässt alle authentifizierten Benutzer mit „Ändern“ zu und ist daher nicht das Hindernis. Bei einem Zugriff über das Netz gilt immer die strengere der beiden Berechtigungen (Freigabe und NTFS). Hier ist die NTFS-Berechtigung der Engpass: Sie vergibt den Zugriff nur an GG_Finanzen, und der neue Mitarbeiter gehört der Gruppe nicht an. Maßnahme: nach Freigabe durch die Fachabteilung (Prinzip der minimalen Rechte) den Benutzer in die Gruppe aufnehmen, ihn anschließend ab- und wieder anmelden (damit die neue Gruppe wirksam wird) und die Änderung im Ticket festhalten.",
    },
    {
      nummer: 6,
      titel: "Zeiterfassung nur noch per IP-Adresse erreichbar",
      szenario:
        "Die Rotbuch Metallbau GmbH hat die Webanwendung der Zeiterfassung vor zwei Tagen auf eine neue virtuelle Maschine umgezogen. Seitdem funktioniert der Aufruf über zeit.rotbuch.example an keinem Arbeitsplatz, auch nicht bei Kolleginnen, die den Rechner neu gestartet haben.",
      symptome: [
        "Der Aufruf über http://zeit.rotbuch.example endet in einer Zeitüberschreitung; der Aufruf über http://10.50.0.40 öffnet die Anwendung sofort.",
        "nslookup zeit.rotbuch.example liefert 10.50.0.25; die neue VM hat laut Umzugsprotokoll die Adresse 10.50.0.40, die alte VM ist abgeschaltet (ping auf 10.50.0.25 ohne Antwort).",
        "Auch nach ipconfig /flushdns und bei einer Abfrage direkt am DNS-Server (nslookup zeit.rotbuch.example 10.50.0.5) kommt weiterhin 10.50.0.25 zurück.",
        "In der DNS-Verwaltung steht für zeit der A-Eintrag 10.50.0.25 als „statisch“ ohne Zeitstempel; die Zone ist sonst unauffällig.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s2", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s3", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s4", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s5", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
      ],
      richtigeSchicht: "s5",
      ursachenOptionen: [
        { id: "u1", text: "Der DNS-Zwischenspeicher der Arbeitsplatzrechner enthält einen veralteten Eintrag." },
        { id: "u2", text: "Der A-Eintrag für zeit in der DNS-Zone zeigt noch auf die alte Adresse 10.50.0.25 und wurde beim Umzug nicht angepasst." },
        { id: "u3", text: "Die Firewall blockiert den Zugriff auf die neue virtuelle Maschine." },
        { id: "u4", text: "Der Webdienst auf der neuen virtuellen Maschine läuft nicht." },
        { id: "u5", text: "Der DNS-Server ist ausgefallen." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Über die IP-Adresse funktioniert alles, also laufen die neue VM, ihr Webdienst und der Weg dorthin (Firewall und Netz sind in Ordnung). Der DNS-Server antwortet, ist also nicht ausgefallen, aber mit der alten Adresse. Weil auch die direkte Abfrage am Server die alte Adresse liefert, liegt es nicht am lokalen Zwischenspeicher der Clients: Der Fehler steckt im Eintrag selbst. Er ist statisch und hat keinen Zeitstempel, deshalb räumt auch die automatische Bereinigung ihn nie ab. Maßnahme: den A-Eintrag auf 10.50.0.40 ändern (oder neu anlegen), die Wirkung per nslookup prüfen und den Umzug künftig mit einem Schritt „DNS anpassen“ in der Checkliste führen; die TTL vor Umzügen kurz setzen.",
    },
    {
      nummer: 7,
      titel: "Mandantenportal: Zertifikatswarnung bei allen",
      szenario:
        "Das Mandantenportal der Steuerkanzlei Rehfeld & Partner läuft auf einem Linux-Server (portal01) hinter einem Webdienst mit HTTPS. Seit heute früh zeigt der Browser bei Mandantinnen und Mitarbeitenden gleichermaßen eine Sicherheitswarnung; vor dem Wochenende war alles in Ordnung.",
      symptome: [
        "Der Browser meldet „Ihre Verbindung ist nicht privat“ mit dem Fehlercode NET::ERR_CERT_DATE_INVALID; mit „Trotzdem fortfahren“ lädt das Portal und arbeitet normal.",
        "openssl s_client -connect portal01:443 | openssl x509 -noout -dates liefert „notBefore=Oct 5 07:30:12 2025 GMT“ und „notAfter=Oct 5 07:30:12 2026 GMT“.",
        "Systemzeit von portal01 und der Arbeitsplätze weichen weniger als eine Sekunde vom Zeitserver ab.",
        "Webdienst und Port 443 laufen unauffällig; das Zertifikat wurde vor genau einem Jahr von Hand ausgestellt, eine automatische Erneuerung ist nicht eingerichtet.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s2", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s3", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s4", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s5", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
      ],
      richtigeSchicht: "s1",
      ursachenOptionen: [
        { id: "u1", text: "Die Uhr des Servers geht falsch, deshalb gilt das Zertifikat als ungültig." },
        { id: "u2", text: "Das Zertifikat wurde von einer nicht vertrauenswürdigen Zertifizierungsstelle ausgestellt." },
        { id: "u3", text: "Der Webdienst auf portal01 ist abgestürzt." },
        { id: "u4", text: "Das Serverzertifikat von portal01 ist abgelaufen." },
        { id: "u5", text: "Der Name im Zertifikat passt nicht zum aufgerufenen Servernamen." },
      ],
      richtigeUrsache: "u4",
      erklaerung:
        "Der Fehlercode nennt es direkt: Das Datum liegt außerhalb der Gültigkeit. Der Zeitraum im Zertifikat endete heute früh, und genau dann begann die Warnung. Eine falsche Uhr scheidet aus, weil Server und Clients richtig gehen. Bei einer unbekannten Zertifizierungsstelle käme ein anderer Fehlercode (Authority invalid), bei einem falschen Namen ebenfalls (Common Name invalid). Der Dienst läuft, denn das Portal lädt nach der Warnung. Die Warnung wegzuklicken ist keine Lösung, denn damit lernen Anwender, Sicherheitsmeldungen zu ignorieren. Maßnahme: ein neues Zertifikat beantragen und einspielen, den Dienst neu laden, die Kette prüfen, die Erneuerung automatisieren und Ablaufdaten in einem Inventar mit Erinnerung führen.",
    },
    {
      nummer: 8,
      titel: "Nachtsicherung seit vier Nächten fehlgeschlagen",
      szenario:
        "Das Monitoring der Hausverwaltung Seeberg GmbH meldet seit vier Nächten den Sicherungsauftrag „FS01-Nachtsicherung“ als fehlgeschlagen. Der Auftrag sichert den Windows-Dateiserver FS01 über das Netz auf den Backup-Server BK01 und lief davor acht Monate ohne Fehler. Es wurde nichts am Auftrag geändert.",
      symptome: [
        "Das Jobprotokoll von BK01 endet nach etwa zwei Stunden mit „Schreiben auf das Sicherungsziel fehlgeschlagen: 0x80070070, Auf dem Datenträger ist nicht genügend Speicherplatz vorhanden“.",
        "Das Sicherungsvolumen E: auf BK01 ist mit 11,8 TB von 12,0 TB belegt (98 %); die Belegung stieg in den letzten Monaten stetig.",
        "Das Dienstkonto des Auftrags kann auf E: eine 10-MB-Testdatei anlegen und löschen; ein Ping und ein Durchsatztest zwischen FS01 und BK01 sind unauffällig (rund 940 Mbit/s, kein Paketverlust).",
        "Die Quelldaten von FS01 lassen sich fehlerfrei lesen; der Datenträger meldet im Zustandsbericht keine Fehler.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s2", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s3", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s4", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s5", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
      ],
      richtigeSchicht: "s3",
      ursachenOptionen: [
        { id: "u1", text: "Das Dienstkonto des Sicherungsauftrags hat auf dem Ziel keine Schreibrechte mehr." },
        { id: "u2", text: "Die Netzwerkverbindung zwischen FS01 und BK01 ist instabil." },
        { id: "u3", text: "Das Speicherziel (Volumen E: auf BK01) ist voll, die neue Sicherung passt nicht mehr hinein." },
        { id: "u4", text: "Der Datenträger des Dateiservers FS01 ist defekt." },
      ],
      richtigeUrsache: "u3",
      erklaerung:
        "Die Fehlermeldung heißt wörtlich, dass der Platz auf dem Datenträger nicht reicht, und das Sicherungsvolumen ist zu 98 % belegt. Dass das Dienstkonto eine kleine Testdatei schreiben kann, schließt fehlende Rechte aus; die guten Netzwerkwerte sprechen gegen eine instabile Verbindung, und die Quelle ist gesund. Die Sicherung bricht ab, weil für die große Vollsicherung der freie Platz nicht mehr ausreicht, nicht weil etwas kaputt wäre. Das Wachstum zeigt eine Kapazitätsplanung, die versäumt wurde. Maßnahme: sofort Platz schaffen nach dem Aufbewahrungskonzept (nicht wahllos Sicherungen löschen), die Speicherauslastung des Ziels überwachen (Warnung ab 80 %), Kapazität erweitern und danach eine Wiederherstellung testen.",
    },
    {
      nummer: 9,
      titel: "Scan-to-Mail wird abgewiesen",
      szenario:
        "Bei der Maschinenbau Kolbe GmbH funktioniert Scan-to-Mail an den Multifunktionsgeräten seit gestern nicht mehr. Davor hat der Versand über das interne Mail-Relay (Linux, relay01) problemlos geklappt. Am Vortag hat die Brevanta IT-Systemhaus GmbH den DNS-Server durch eine neue virtuelle Maschine ersetzt; die Namensauflösung wirkt auf den ersten Blick normal.",
      symptome: [
        "Das Display des Geräts meldet „Senden fehlgeschlagen“; Mails von den Arbeitsplätzen über andere Wege sind nicht betroffen.",
        "Im Mail-Log von relay01 steht: „NOQUEUE: reject: RCPT from unknown[10.60.10.80]: 450 4.7.1 Client host rejected: cannot find your hostname, [10.60.10.80]“.",
        "Ein Verbindungstest vom Gerätenetz auf relay01 Port 25 gelingt, das Banner „220 relay01 ESMTP“ erscheint; ein Anmeldefehler tritt nicht auf.",
        "Auf relay01 liefert nslookup mfp-eg.kolbe.example die Adresse 10.60.10.80; nslookup 10.60.10.80 endet mit „** server can't find 80.10.60.10.in-addr.arpa: NXDOMAIN“. Auf dem DNS-Server gibt es nur die Forward-Zone kolbe.example, keine Reverse-Lookupzone.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
        { id: "s2", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s3", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s4", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s5", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
      ],
      richtigeSchicht: "s2",
      ursachenOptionen: [
        { id: "u1", text: "Die Zugangsdaten des Geräts für den Mailversand sind falsch." },
        { id: "u2", text: "Die Firewall blockiert den SMTP-Port 25 zum Mail-Relay." },
        { id: "u3", text: "Der Speicherplatz auf relay01 ist voll." },
        { id: "u4", text: "Die Forward-Zone ist unvollständig, der Name des Geräts wird nicht aufgelöst." },
        { id: "u5", text: "Die Reverse-Lookupzone fehlt auf dem neuen DNS-Server, deshalb kann das Relay den Namen des Geräts zur Adresse nicht ermitteln." },
      ],
      richtigeUrsache: "u5",
      erklaerung:
        "Der Verbindungsaufbau gelingt und das Banner erscheint, Port 25 und Firewall sind also nicht das Problem. Ein falsches Passwort würde eine Anmeldefehlermeldung auslösen, ein voller Datenträger eine Meldung zum Speicher. Das Log nennt die Ablehnung: Das Relay prüft, ob zur Client-Adresse ein Name existiert (Reverse-Lookup), und findet keinen. Die Forward-Auflösung ist in Ordnung, nur die Rückrichtung (PTR-Einträge in der Zone in-addr.arpa) fehlt; der alte DNS-Server hatte diese Zone, die neue VM nicht. Das ist eine unvollständige Auflösung, kein Totalausfall. Maßnahme: die Reverse-Lookupzone für 10.60.10.0/24 anlegen und die PTR-Einträge pflegen oder dynamisch registrieren, die Migration künftig mit Checkliste (alle Zonen) durchführen.",
    },
    {
      nummer: 10,
      titel: "Domänenanmeldung am Linux-Dateiserver scheitert",
      szenario:
        "Bei der Rotbuch Metallbau GmbH wurde der Linux-Dateiserver lxfs01 (Mitglied der Windows-Domäne) gestern Abend wegen eines Fehlers aus einer Sicherung wiederhergestellt. Seit heute früh scheitert die Anmeldung von Domänenbenutzern an lxfs01, obwohl die Passwörter korrekt sind. An anderen Domänenmitgliedern klappt dieselbe Anmeldung.",
      symptome: [
        "Der Server antwortet auf Ping, der Freigabedienst läuft; Zugriffe mit lokalen Konten funktionieren, Zugriffe mit Domänenkonten scheitern bei mehreren Benutzern gleichermaßen.",
        "Im Journal von lxfs01 steht: „krb5_child: Preauthentication failed: Clock skew too great“.",
        "date auf lxfs01 zeigt 08:29:52, der Domänencontroller 08:41:10 Uhr: Abweichung 11 Minuten 18 Sekunden. timedatectl: „System clock synchronized: no“, „NTP service: inactive“.",
        "Der Domänencontroller ist erreichbar; Konten sind weder gesperrt noch abgelaufen; die Namensauflösung der Domänencontroller ist in Ordnung.",
      ],
      schichtOptionen: [
        { id: "s1", text: "Dienstkonfiguration (Einstellungen, Zonen, Pools)" },
        { id: "s2", text: "Firewall und Netzfilter (Erreichbarkeit)" },
        { id: "s3", text: "Konten, Rechte und Zertifikate (Identität, Berechtigung)" },
        { id: "s4", text: "Betriebssystem und Ressourcen (Speicher, Prozesse, Uhrzeit)" },
        { id: "s5", text: "Netzwerkanbindung (Verbindung, Adressierung)" },
      ],
      richtigeSchicht: "s4",
      ursachenOptionen: [
        { id: "u1", text: "Die Konten der Domänenbenutzer sind abgelaufen." },
        { id: "u2", text: "Die Systemzeit von lxfs01 weicht mehr als die zulässigen fünf Minuten von der des Domänencontrollers ab, weil keine Zeitsynchronisation läuft; Kerberos lehnt die Anmeldung ab." },
        { id: "u3", text: "Der Domänencontroller ist nicht erreichbar." },
        { id: "u4", text: "Die Berechtigungen der Freigabe sind falsch gesetzt." },
        { id: "u5", text: "Die Domänenmitgliedschaft von lxfs01 wurde gelöscht." },
      ],
      richtigeUrsache: "u2",
      erklaerung:
        "Die Meldung „Clock skew too great“ ist eindeutig: Das Anmeldeverfahren Kerberos akzeptiert nur Zeitabweichungen von meist höchstens fünf Minuten, damit abgefangene Tickets nicht später wiederverwendet werden können. Hier sind es über elf Minuten, und der Zeitdienst ist nicht aktiv. Der Domänencontroller ist erreichbar und die Konten sind in Ordnung, also scheidet beides aus. Eine gelöschte Domänenmitgliedschaft hätte eine andere Fehlermeldung und würde auch die Dienstkonten betreffen, und Freigabeberechtigungen kämen erst nach erfolgreicher Anmeldung ins Spiel. Die Wiederherstellung aus der Sicherung hat die Uhr verstellt. Maßnahme: Zeitdienst aktivieren und mit dem Zeitserver synchronisieren, Anmeldung testen, nach jeder Wiederherstellung einer VM die Uhrzeit prüfen und die Zeitabweichung überwachen.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zehn Störungsfälle rund um Serverdienste gelöst. Dein Vorgehen: Läuft der Dienst überhaupt, und warum nicht (Log, Port, Speicherplatz)? Ist er erreichbar (Ping, Portprüfung, Firewall)? Stimmen Namensauflösung, Adressvergabe und Konfiguration? Passen Zertifikat, Uhrzeit, Konto und Berechtigung? Die Fehlermeldung nennt oft die Stelle, und eine Zeitüberschreitung bedeutet etwas anderes als eine sofortige Ablehnung. Ändere immer nur eine Sache auf einmal, sichere vorher die Konfiguration und dokumentiere, was du getan hast.",
};
