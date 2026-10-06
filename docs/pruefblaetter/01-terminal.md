# Prüfblatt Terminal-Szenarien (12 Szenarien)

Stand 06.10.2026 · erzeugt aus `packages/shared/src/terminal-sim.ts` (F-171/F-174) · **alle Inhalte sind Entwürfe**.

**So prüfst du:** Öffne in der App *Instrumente → Terminal öffnen*, wähle das Szenario und spiele den Lösungsweg unten Schritt für Schritt nach. Achte auf die **Ausgaben** der Befehle (Format, Zahlen, Meldungen) — die stehen hier nicht vollständig, nur in der App. Kreuze je Szenario die Prüffragen an und trage Anmerkungen ein.

**Bekannte Vereinfachungen (gelten für alle Szenarien):** nichts wird wirklich ausgeführt; feste Befehlsliste (alles andere meldet „command not found“ mit Hinweis); `rm` nur in wenigen Verzeichnissen; Zeitstempel laufen nur bei Eingaben; IPv6 und interaktive Editoren fehlen; Rechte-/Firewall-Logik vereinfacht.

## Leicht (4)

### T01 · Kein Zugriff aufs Internet am Client-PC

*id:* `internet` · *Stufe:* Leicht · *Kunde:* Nordlicht Logistik AG

**Aufgabe (so sehen es Lernende):**

> Bei der Nordlicht Logistik AG erreicht der Rechner pc-disposition-12 (IP 192.168.10.25/24, Gateway laut Netzplan 192.168.10.1) seit einer Umstellung das Internet nicht mehr; Ziele im Firmennetz funktionieren. Grenze die Störung Schicht für Schicht ein und behebe sie. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `ip addr` — Die eigene Adresse 192.168.10.25/24 ist korrekt gesetzt — die Schnittstelle ist in Ordnung.
2. `ping -c 2 192.168.10.1` — Das Gateway im eigenen Netz antwortet: Verbindung im lokalen Netz funktioniert.
3. `ping -c 2 8.8.8.8` — Ein Ziel außerhalb scheitert sofort mit „Network is unreachable“ — das System kennt keinen Weg dorthin.
4. `ip route` — In der Routing-Tabelle steht nur die Route des eigenen Netzes; die Zeile „default via …“ fehlt.
5. `sudo ip route add default via 192.168.10.1` ← **löst die Störung** — Die Standardroute über das Gateway setzen (Administratorrechte nötig).
6. `ping -c 2 8.8.8.8` — Kontrolle: Das Internet-Ziel antwortet jetzt.

**Tipps (3 Stufen, vage → konkret):**

1. Prüfe von innen nach außen: erst die eigene Adresse (ip addr), dann das Gateway (ping), dann ein Ziel im Internet (ping 8.8.8.8).
2. Das Gateway antwortet, das Internet nicht — und es kommt nicht einmal ein Paket los („Network is unreachable“). Schau in die Routing-Tabelle: ip route. Fehlt dort etwas?
3. Es fehlt die Standardroute (default). Setze sie mit sudo ip route add default via 192.168.10.1 und teste erneut mit ping.

**Erklärung nach der Lösung:**

> Ursache: Dem Rechner fehlte die Standardroute (default route). Ziele im eigenen Netz 192.168.10.0/24 erreicht er über die automatisch angelegte Netzroute, für alles andere braucht er ein Gateway, an das er die Pakete übergibt — ohne diese Route meldet das System „Network is unreachable“. Mit ip route add default via 192.168.10.1 ist der Fehler behoben, allerdings nur bis zum nächsten Neustart: Dauerhaft gehört das Gateway in die Netzwerkkonfiguration (hier die auskommentierte Zeile in /etc/network/interfaces). Faustregel für die Fehlersuche: von innen nach außen prüfen — eigene IP, Gateway, Internet-IP, Name.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Die dauerhafte Konfiguration steht auskommentiert in `/etc/network/interfaces` (Debian-Stil). Auf anderen Systemen (Netplan, NetworkManager) ist das anders — für die Zielgruppe so vertretbar?
- ⚠ Die Lösung `ip route add default via …` gilt nur zur Laufzeit; wird das in der Erklärung ausreichend deutlich?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T02 · Name wird nicht aufgelöst

*id:* `dns` · *Stufe:* Leicht · *Kunde:* Nordlicht Logistik AG

**Aufgabe (so sehen es Lernende):**

> Bei der Nordlicht Logistik AG lassen sich am Rechner pc-versand-03 (IP 192.168.10.31/24) keine Webseiten mit Namen öffnen — der Browser meldet „Server nicht gefunden“. Laut Netzplan ist der Router 192.168.10.1 auch der DNS-Server des Firmennetzes. Finde die Ursache und behebe sie. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `ping -c 2 8.8.8.8` — Das Internet ist per IP-Adresse erreichbar — Netz, Gateway und Routing sind in Ordnung.
2. `ping -c 2 example.com` — Der Name lässt sich nicht auflösen („Temporary failure in name resolution“): Das Problem liegt bei DNS.
3. `cat /etc/resolv.conf` — Hier steht, welcher DNS-Server verwendet wird: 192.168.10.254.
4. `ping -c 2 192.168.10.254` — Dieser Server antwortet nicht („Destination Host Unreachable“) — es gibt ihn im Netz nicht.
5. `nslookup example.com` — Bestätigt: Die Anfrage an den eingetragenen Server läuft in ein Timeout.
6. `echo "nameserver 192.168.10.1" | sudo tee /etc/resolv.conf` ← **löst die Störung** — Den DNS-Server des Routers eintragen. tee schreibt die Datei mit Administratorrechten (anders als eine Umleitung mit >).
7. `ping -c 2 example.com` — Kontrolle: Der Name wird aufgelöst und das Ziel antwortet.

**Tipps (3 Stufen, vage → konkret):**

1. Prüfe, ob das Netz an sich funktioniert (ping auf eine IP-Adresse) und ob nur Namen Probleme machen (ping auf einen Namen).
2. Namen werden über einen DNS-Server aufgelöst. Welcher eingetragen ist, steht in /etc/resolv.conf (cat). Antwortet dieser Server auf ping oder nslookup?
3. Der Eintrag zeigt auf 192.168.10.254 — den gibt es nicht. Trage den Router ein: echo "nameserver 192.168.10.1" | sudo tee /etc/resolv.conf. Ein einfaches > nach sudo hilft nicht, denn die Umleitung führt deine Shell ohne Administratorrechte aus.

**Erklärung nach der Lösung:**

> Ursache: In /etc/resolv.conf stand ein DNS-Server (192.168.10.254), den es nicht gibt. Der Rechner kann dann Namen nicht in IP-Adressen übersetzen, obwohl das Netz selbst in Ordnung ist: ping 8.8.8.8 geht, ping example.com nicht („Temporary failure in name resolution“). Mit dem richtigen Nameserver (hier der Router 192.168.10.1) funktioniert die Namensauflösung wieder. Hinweis aus der Praxis: Auf vielen Systemen wird die Datei vom NetworkManager oder von systemd-resolved verwaltet und überschrieben; dauerhaft ändert man die Einstellung dort oder im DHCP-Server. Merkregel: IP-Adresse geht, Name nicht — dann ist es DNS.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Moderne Systeme verwalten `/etc/resolv.conf` über `systemd-resolved`/NetworkManager; die Simulation behandelt sie als einfache Datei (bewusste Vereinfachung).
- ⚠ Lösung `echo "nameserver …" | sudo tee /etc/resolv.conf`: Ist die Erklärung, warum `sudo echo … > datei` scheitert, richtig und verständlich?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T03 · Festplatte voll

*id:* `platte-voll` · *Stufe:* Leicht · *Kunde:* Rheinwerk Maschinen GmbH

**Aufgabe (so sehen es Lernende):**

> Auf dem ERP-Anwendungsserver app01 der Rheinwerk Maschinen GmbH bricht das Speichern von Aufträgen seit heute früh mit „No space left on device“ ab, obwohl der Dienst läuft. Du bist als „techniker“ angemeldet. Finde heraus, was den Platz belegt, und schaffe wieder Luft (Füllstand unter 90 %) — aber ohne Datenbank oder laufende Logdatei anzurühren. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `df -h` — Das Dateisystem / (/dev/sda1, 20 G) ist zu 100 % belegt, „Avail“ ist 0 — deshalb scheitert jedes Schreiben.
2. `du -sh /var/*` — Der Platzverbrauch pro Verzeichnis unter /var: /var/log ist mit rund 16 G der größte Posten (die Datenbank unter /var/lib hat etwa 3,6 G).
3. `ls -lh /var/log/rheinwerk` — Die Dateigrößen im Anwendungs-Log: anwendung.log (9,6 G, aktuell), anwendung.log.1 (5,3 G, rotierte Kopie), zugriff.log (600 M).
4. `cat /etc/logrotate.d/rheinwerk` *(optional)* — Die Ursache: Die Zeilen weekly, rotate und compress sind auskommentiert — das Log wird nie begrenzt oder komprimiert.
5. `sudo rm /var/log/rheinwerk/anwendung.log.1` ← **löst die Störung** — Die alte, rotierte Kopie löschen (Schreiben unter /var/log braucht sudo): Das gibt 5,3 G frei.
6. `df -h` — Kontrolle: Der Füllstand von / liegt jetzt bei etwa 74 %, die Anwendung kann wieder schreiben.

**Tipps (3 Stufen, vage → konkret):**

1. Prüfe zuerst, welches Dateisystem voll ist: df -h zeigt Größe, Belegung und Füllstand aller Dateisysteme.
2. Das Dateisystem / ist zu 100 % belegt. Mit du -sh (z. B. du -sh /var/*) und ls -lh siehst du, welche Verzeichnisse und Dateien den Platz fressen — schau in /var/log.
3. In /var/log/rheinwerk liegt die rotierte Kopie anwendung.log.1 (5,3 G), die niemand mehr braucht: sudo rm /var/log/rheinwerk/anwendung.log.1. Die aktuelle Datei anwendung.log lässt du in Ruhe — der Dienst hält sie offen, ihr Platz würde auch nach dem Löschen nicht frei.

**Erklärung nach der Lösung:**

> Ursache: Die Logrotation war abgeschaltet (in /etc/logrotate.d/rheinwerk sind weekly, rotate und compress auskommentiert), und die Debug-Ausgabe der Anwendung hat die Logdatei auf fast 10 G anwachsen lassen. Weil System, Datenbank und Logs auf demselben Dateisystem liegen, war die Platte irgendwann voll — danach scheitert jeder Schreibzugriff mit „No space left on device“. Vorgehen: Füllstand prüfen (df -h), Verbraucher eingrenzen (du -sh, ls -lh), Unnötiges gezielt entfernen. Wichtig: Eine Datei, die ein Prozess noch geöffnet hält (hier die aktuelle anwendung.log), gibt ihren Platz beim Löschen nicht frei, bis der Prozess sie schließt — deshalb löscht man die rotierte Kopie und nicht die aktive Datei. Dauerhaft gehören logrotate aktiviert, die Debug-Ausgabe abgeschaltet, ein Alarm ab 80 % Füllstand eingerichtet und die Logs auf ein eigenes Dateisystem gelegt, damit volle Logs nicht die Datenbank mitreißen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Nur das Löschen der **rotierten** Kopie gibt Platz frei, weil ein Prozess die aktive Logdatei offen hält. Stimmt die Darstellung (Größen, `df`-Prozentwerte, Erklärung zu gelöschten, noch geöffneten Dateien)?
- ⚠ `rm` ist in der Simulation nur unterhalb von `/var/log`, `/var/backups`, `/var/tmp`, `/tmp` und dem Heimatverzeichnis erlaubt (Sicherheitsvereinfachung).

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T04 · Rechner hat eine 169.254-Adresse

*id:* `apipa` · *Stufe:* Leicht · *Kunde:* Sonnenhof Apotheken KG

**Aufgabe (so sehen es Lernende):**

> In der Sonnenhof Apotheken KG kommt der Kassenrechner pc-theke-03 seit dem Stromausfall von gestern Abend weder ins Firmennetz noch ins Internet. Alle anderen Rechner arbeiten normal; laut Netzplan verteilt der Router 192.168.30.1 per DHCP Adressen aus 192.168.30.0/24. Der Rechner zeigt eine Adresse, die damit nicht zusammenpasst. Finde die Ursache und bringe ihn wieder ins Netz. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `ip addr` — enp0s3 hat 169.254.37.12/16 (scope link) — keine Adresse aus dem Firmennetz, sondern eine selbst vergebene Link-Local-Adresse (APIPA).
2. `ping -c 2 192.168.30.1` — Der Router ist nicht erreichbar („Network is unreachable“): Mit einer 169.254-Adresse gibt es keinen Weg ins Firmennetz.
3. `journalctl -u NetworkManager` — Die Ursache: „dhcp4 (enp0s3): request timed out“ — beim Start hat kein DHCP-Server geantwortet, danach hat sich der Rechner selbst eine Adresse gegeben.
4. `sudo systemctl restart NetworkManager` ← **löst die Störung** — Die Netzwerkverwaltung neu starten: Sie fragt per DHCP erneut an und bekommt jetzt Adresse, Gateway und DNS-Server vom Router.
5. `ip addr` — Kontrolle: enp0s3 hat jetzt 192.168.30.57/24 (dynamic) — vom DHCP-Server vergeben.
6. `ping -c 2 example.com` — Auch Internet und Namensauflösung funktionieren wieder.

**Tipps (3 Stufen, vage → konkret):**

1. Schau dir die IP-Adresse des Rechners an (ip addr) und vergleiche sie mit dem Firmennetz 192.168.30.0/24. Passt sie?
2. Adressen aus 169.254.0.0/16 vergibt sich ein Rechner selbst (APIPA bzw. Link-Local), wenn kein DHCP-Server antwortet. Das Journal des NetworkManagers (journalctl -u NetworkManager) zeigt, dass die DHCP-Anfrage beim Start unbeantwortet blieb — der Router war wegen des Stromausfalls noch nicht wieder da.
3. Der Router antwortet inzwischen wieder. Lass den Rechner eine neue Adresse anfordern: sudo systemctl restart NetworkManager. Prüfe danach mit ip addr und ping.

**Erklärung nach der Lösung:**

> Ursache: Beim Hochfahren nach dem Stromausfall war der Router (und damit der DHCP-Server) noch nicht wieder da. Der Rechner hat seine DHCP-Anfrage ohne Antwort aufgegeben und sich selbst eine Adresse aus 169.254.0.0/16 gegeben (APIPA/Link-Local). Solche Adressen funktionieren nur direkt zwischen Rechnern am selben Kabel, nie über einen Router — eine 169.254.x.x-Adresse bedeutet deshalb fast immer „DHCP hat nicht geantwortet“. Nachdem der Router wieder lief, genügte es, die Adressanforderung zu wiederholen (hier: NetworkManager neu starten). Merkregel für die Fehlersuche: erst die eigene Adresse ansehen — passt sie nicht zum Netz, liegt das Problem vor dem Router, nicht dahinter. Wenn auch ein Neustart nichts bringt: DHCP-Server, Kabel, Switch-Port und VLAN prüfen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Die Lösung `sudo systemctl restart NetworkManager` holt Adresse, Route und DNS per DHCP — vereinfachte Darstellung. Die eigentliche Ursache in der Praxis wäre der DHCP-Dienst oder die Verbindung; ist das für Lernende nachvollziehbar?
- ⚠ Auch die manuelle Lösung (169.254-Adresse entfernen, feste Adresse, Route und DNS setzen) wird akzeptiert.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

## Mittel (5)

### T05 · Webseite nicht erreichbar

*id:* `webseite` · *Stufe:* Mittel · *Kunde:* Hartmann Metallbau GmbH

**Aufgabe (so sehen es Lernende):**

> Brevanta IT-Systemhaus GmbH betreut den Webserver web01 der Hartmann Metallbau GmbH. Der Kunde meldet: „Seit dem Neustart des Servers ist unsere Firmenwebseite nicht mehr erreichbar — im Browser erscheint nur eine Standardseite.“ Du bist per SSH als „techniker“ auf web01 angemeldet. Grenze die Ursache ein und stelle die Firmenwebseite wieder her. (Die Datei ticket.txt im Heimatverzeichnis enthält die Meldung.)

**Lösungsweg zum Nachspielen:**

1. `curl localhost` — Der Server antwortet — aber mit der Apache-Standardseite statt mit der Firmenseite. Es läuft also ein falscher Webserver.
2. `systemctl status nginx` — Der eigentliche Webserver nginx ist „failed“ — er konnte nach dem Neustart nicht starten.
3. `journalctl -u nginx` — Das Protokoll nennt die Ursache: „bind() to 0.0.0.0:80 failed (98: Address already in use)“ — Port 80 ist schon belegt.
4. `sudo ss -tlnp` — Die Liste der lauschenden Ports zeigt, wer Port 80 hält: apache2. Ohne sudo bleibt die Prozess-Spalte leer.
5. `sudo systemctl stop apache2` — Den Störenfried beenden. Ohne sudo scheitert das mit „Interactive authentication required“.
6. `sudo systemctl start nginx` ← **löst die Störung** — Jetzt ist Port 80 frei: nginx startet.
7. `curl localhost` — Kontrolle: Die Firmenseite „Willkommen bei Hartmann Metallbau“ wird ausgeliefert.
8. `sudo systemctl disable apache2` *(optional)* — Optional, aber sinnvoll: Apache soll beim nächsten Neustart nicht wieder vor nginx starten.

**Tipps (3 Stufen, vage → konkret):**

1. Prüfe zuerst, was auf dem Server tatsächlich antwortet (curl localhost) und ob der Webserver-Dienst nginx überhaupt läuft (systemctl status nginx).
2. nginx ist ausgefallen. Der Grund steht im Protokoll: journalctl -u nginx — achte auf die Zeile mit „bind()“. Wer belegt Port 80? ss -tlnp listet die lauschenden Ports; die Prozessnamen zeigt nur der Administrator (sudo).
3. Apache2 belegt Port 80. Beende ihn mit sudo systemctl stop apache2 und starte danach nginx mit sudo systemctl start nginx. Prüfe zum Schluss mit curl localhost.

**Erklärung nach der Lösung:**

> Ursache: Zwei Programme wollten denselben Port. Nach dem Neustart hat sich ein (nur zum Test installierter) Apache2 den Port 80 geholt, bevor nginx starten konnte. Ein Port kann nur von einem Prozess belegt werden — nginx brach mit „Address already in use“ ab, und Apache lieferte seine Standardseite aus. Vorgehen: Symptom prüfen (curl), Dienststatus lesen (systemctl status), Protokoll lesen (journalctl), Port-Belegung klären (ss -tlnp), Ursache beseitigen (apache2 stoppen), Dienst starten, Ergebnis testen. Damit das Problem nicht beim nächsten Neustart wiederkommt, gehört Apache dauerhaft deaktiviert (systemctl disable) oder deinstalliert.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Ausgabeformat von `systemctl status`, `journalctl -u nginx` und `ss -tlnp` (Spalten, Zeitstempel, Fehlermeldung „Address already in use“) gegen ein echtes System abgleichen.
- ⚠ Als Lösung gilt auch `sudo kill 812` statt `systemctl stop apache2` — ist das didaktisch gewollt?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T06 · Falsche Subnetzmaske

*id:* `ip-maske` · *Stufe:* Mittel · *Kunde:* Hartmann Metallbau GmbH

**Aufgabe (so sehen es Lernende):**

> Bei der Hartmann Metallbau GmbH wurde die Netzwerkkarte des Konstruktions-PCs pc-konstruktion-07 getauscht. Seitdem sind weder der Dateiserver (192.168.20.10) noch das Internet erreichbar. Laut Netzplan gilt: Netz 192.168.20.0/24 (Maske 255.255.255.0), Gateway 192.168.20.1, dieser PC hat die Adresse 192.168.20.140. Finde den Fehler in der Konfiguration und behebe ihn so, dass am Ende genau die Adresse aus dem Netzplan eingestellt ist — ohne Reste der falschen Einstellung. (Die Angaben stehen auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `ip addr` — enp0s3 hat 192.168.20.140/26 (Broadcast .191) — laut Netzplan müsste es /24 sein.
2. `ip route` — Es gibt nur die Route des kleinen Netzes 192.168.20.128/26 und keine Standardroute.
3. `ping -c 2 192.168.20.1` — Schon das Gateway ist nicht erreichbar: Die Adresse .1 liegt nicht im Netz 192.168.20.128/26.
4. `cat /etc/network/interfaces` *(optional)* — Die dauerhafte Konfiguration enthält die falsche Maske 255.255.255.192 (= /26) — dieselbe Ursache.
5. `sudo ip addr del 192.168.20.140/26 dev enp0s3` — Die falsche Adresse entfernen (Administratorrechte nötig).
6. `sudo ip addr add 192.168.20.140/24 dev enp0s3` — Dieselbe Adresse mit der richtigen Präfixlänge /24 (Maske 255.255.255.0) setzen.
7. `sudo ip route add default via 192.168.20.1` ← **löst die Störung** — Nun liegt das Gateway im eigenen Netz — die Standardroute lässt sich eintragen.
8. `ping -c 2 192.168.20.10` — Kontrolle: Der Dateiserver antwortet.
9. `ping -c 2 8.8.8.8` — Kontrolle: Auch das Internet ist wieder erreichbar.

**Tipps (3 Stufen, vage → konkret):**

1. Vergleiche die Einstellungen am Rechner (ip addr, ip route) mit dem Netzplan aus dem Ticket: Adresse, Netzmaske (Präfixlänge) und Gateway.
2. Der Rechner steht mit /26 im Netz 192.168.20.128 bis .191. Das Gateway 192.168.20.1 liegt außerhalb dieses Netzes — deshalb kennt der Rechner keinen Weg dorthin (ping auf das Gateway: „Network is unreachable“).
3. Entferne die falsche Adresse (sudo ip addr del 192.168.20.140/26 dev enp0s3), setze sie mit der richtigen Maske neu (sudo ip addr add 192.168.20.140/24 dev enp0s3) und trage danach das Gateway wieder ein (sudo ip route add default via 192.168.20.1).

**Erklärung nach der Lösung:**

> Ursache: Dem PC wurde die Maske 255.255.255.192 (/26) statt 255.255.255.0 (/24) gegeben. Damit gehört er zum Netz 192.168.20.128–191; Gateway (.1) und Dateiserver (.10) liegen außerhalb und sind für ihn „nicht im eigenen Netz“ — das Gateway lässt sich nicht einmal als Standardroute eintragen. Regel: Ein Gateway muss immer im selben Netz liegen wie die eigene Adresse, und die Maske bestimmt, was „dasselbe Netz“ ist. Am Linux-Client wird die Adresse mit ip addr del/add korrigiert, danach muss die Standardroute neu gesetzt werden (der Kernel hatte sie mit der alten Adresse verloren). Wie bei der fehlenden Route gilt: Das gilt nur bis zum Neustart — dauerhaft muss die Konfiguration (hier /etc/network/interfaces) geändert werden.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Falsche Maske /26 statt /24: Stimmen Adressbereiche, Gateway-Lage und die Erklärung, warum Ziele in anderen Teilnetzen fehlschlagen?
- ⚠ Die manuelle Korrektur ist nicht dauerhaft; Rest der alten Adresse zählt bewusst nicht als gelöst.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T07 · Dienst meldet „Permission denied“

*id:* `rechte` · *Stufe:* Mittel · *Kunde:* Sonnenhof Apotheken KG

**Aufgabe (so sehen es Lernende):**

> Auf dem Server wawi01 der Sonnenhof Apotheken KG startet die Warenwirtschaft (Dienst wawi) seit gestern Abend nicht mehr. Ein Kollege hat nach einem Passwortwechsel die Datei /etc/wawi/db.conf neu angelegt. Vorgabe der Datenschutzbeauftragten: Die Datei mit dem Datenbankzugang darf nur das Dienstkonto „wawi“ lesen können, nicht alle Benutzer. Finde die Ursache und bringe den Dienst unter Beachtung dieser Vorgabe wieder zum Laufen. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `systemctl status wawi` *(zeigt absichtlich einen Fehler)* — Der Dienst ist „failed“; die letzten Journalzeilen nennen schon eine Datei.
2. `journalctl -u wawi` *(zeigt absichtlich einen Fehler)* — „PermissionError … Permission denied: '/etc/wawi/db.conf'“ — das Dienstkonto darf die Datei nicht lesen.
3. `sudo ls -l /etc/wawi` — db.conf gehört root:root und hat -rw------- (600); wawi.conf dagegen gehört der Gruppe wawi (640) und ist für den Dienst lesbar.
4. `id wawi` — Das Dienstkonto wawi ist nur in seiner eigenen Gruppe — weder Besitzer noch Gruppenmitglied von db.conf.
5. `sudo -u wawi cat /etc/wawi/db.conf` *(zeigt absichtlich einen Fehler)* — Probe aufs Exempel: Als Dienstkonto gelesen scheitert die Datei mit „Permission denied“.
6. `sudo chown wawi:wawi /etc/wawi/db.conf` — Das Dienstkonto zum Besitzer machen. Die Rechte 600 bleiben: Lesen und Schreiben darf nur wawi (und root).
7. `sudo systemctl start wawi` ← **löst die Störung** — Jetzt kann der Dienst seine Konfiguration lesen und startet.
8. `sudo ls -l /etc/wawi` — Kontrolle: db.conf gehört wawi:wawi mit -rw------- — für alle anderen weiterhin gesperrt.

**Tipps (3 Stufen, vage → konkret):**

1. Lies die Fehlermeldung des Dienstes: systemctl status wawi und journalctl -u wawi. Welche Datei kann er nicht lesen, und warum?
2. Der Dienst läuft unter dem Konto „wawi“ (id wawi). Vergleiche das mit sudo ls -l /etc/wawi: Wem gehört db.conf, und wer darf sie lesen? Vergleiche auch mit wawi.conf, die der Dienst lesen kann.
3. db.conf gehört root und hat die Rechte 600 — nur root darf sie lesen. Mache das Dienstkonto zum Besitzer: sudo chown wawi:wawi /etc/wawi/db.conf, und starte den Dienst: sudo systemctl start wawi. Mit chmod 777 oder 644 liefe der Dienst zwar auch, aber jeder könnte das Datenbank-Passwort lesen.

**Erklärung nach der Lösung:**

> Ursache: Der Kollege hat die Datei mit sudo angelegt — sie gehört deshalb root mit den Rechten 600 (nur der Besitzer darf lesen und schreiben). Der Dienst läuft aber unter dem eigenen Konto „wawi“ und ist weder Besitzer noch in der Gruppe root, also gilt für ihn „andere“ = keine Rechte: „Permission denied“. Rechte lesen: ls -l zeigt dreimal rwx für Besitzer, Gruppe und alle anderen; es gilt immer nur die erste passende Gruppe. Richtig lösen heißt, genau das nötige Recht zu geben — hier den Besitzer (chown) oder die Gruppe (chown root:wawi plus chmod 640). chmod 777 „löst“ es zwar technisch, gibt aber jedem Benutzer Lese- und Schreibzugriff auf ein Passwort und ist keine Lösung, sondern ein Sicherheitsproblem (Prinzip der minimalen Rechte). Auch das Verzeichnis zählt: Ohne x-Recht auf /etc/wawi kommt das Dienstkonto gar nicht erst an die Datei.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Akzeptiert werden nur Lösungen, bei denen die Passwortdatei **nicht für alle lesbar** ist (`chown wawi:wawi` bzw. `root:wawi` + `chmod 640`); `chmod 777/666/644/o+r` starten den Dienst, zählen aber nicht. Ist diese strenge Bewertung fachlich richtig (insbesondere 644 für eine Datei mit Zugangsdaten)?
- ⚠ Ausgabe von `ls -l`, `id`, `sudo -u wawi cat …` gegen echtes Verhalten abgleichen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T08 · Dienst läuft, Port nicht erreichbar

*id:* `firewall` · *Stufe:* Mittel · *Kunde:* Nordlicht Logistik AG

**Aufgabe (so sehen es Lernende):**

> Das Kundenportal (HTTPS, Port 443) der Nordlicht Logistik AG läuft auf dem Server portal01 (192.168.50.10). Aus den Niederlassungen kommt seit der gestrigen Server-Härtung nur noch ein Timeout, der Kollege vor Ort sagt aber: „Auf dem Server läuft alles.“ Sorge dafür, dass das Portal von außen wieder erreichbar ist. Dabei darf nur der Webzugriff geöffnet werden: SSH bleibt offen, die Datenbank (Port 3306) bleibt gesperrt und die Firewall bleibt eingeschaltet. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `systemctl status nginx` — nginx ist „active (running)“ — der Dienst selbst ist in Ordnung.
2. `curl -k https://localhost` — Auf dem Server liefert das Portal seine Seite — der Webserver antwortet lokal.
3. `sudo ss -tlnp` — nginx lauscht auf Port 443 (und die Datenbank auf 3306, SSH auf 22).
4. `nc -zv 192.168.50.10 443` — Der Test über die Netzwerk-Adresse (wie von einem anderen Rechner) läuft in ein Timeout: Der Port ist nicht erreichbar, obwohl der Dienst lauscht.
5. `sudo ufw status numbered` — Die Firewall lässt nur 22/tcp durch; für 443 gibt es keine Regel — alles andere wird verworfen.
6. `sudo grep BLOCK /var/log/ufw.log` — Das Firewall-Protokoll bestätigt: Zugriffe aus den Niederlassungen auf DPT=443 werden mit [UFW BLOCK] verworfen.
7. `sudo ufw allow 443/tcp` ← **löst die Störung** — Die fehlende Regel ergänzen: HTTPS wird erlaubt.
8. `nc -zv 192.168.50.10 443` — Kontrolle: „succeeded!“ — das Portal ist von außen erreichbar.
9. `nc -zv 192.168.50.10 3306` *(optional)* — Kontrolle: Die Datenbank bleibt gesperrt (Timeout) — genau so soll es sein.

**Tipps (3 Stufen, vage → konkret):**

1. Der Dienst läuft (systemctl status nginx, curl auf localhost) — das heißt noch nicht, dass der Port von außen erreichbar ist. Teste ihn „von außen“ mit nc -zv 192.168.50.10 443.
2. Es gibt eine Firewall (ufw). sudo ufw status numbered zeigt, welche Ports sie durchlässt; die blockierten Zugriffe stehen in /var/log/ufw.log (sudo grep BLOCK /var/log/ufw.log) — achte auf DPT=443.
3. Für HTTPS fehlt eine Regel: sudo ufw allow 443/tcp. Schalte die Firewall nicht ab und erlaube nicht „alles“ — Port 3306 (Datenbank) muss gesperrt bleiben. Prüfe danach erneut mit nc -zv.

**Erklärung nach der Lösung:**

> Ursache: Bei der Server-Härtung wurde ufw mit der Grundregel „eingehend alles verwerfen“ eingeschaltet und nur SSH freigegeben. Der Webserver lief weiter und lauschte auf Port 443, aber die Firewall verwarf alle Anfragen von außen, bevor sie nginx erreichten. „Dienst läuft“ und „Port erreichbar“ sind zwei verschiedene Dinge: Zwischen Client und Dienst liegen Firewall, Routing und Lauschadresse — getestet wird deshalb immer von der Gegenseite (nc -zv oder curl von einem anderen Rechner). Ein Timeout deutet auf eine Firewall hin, die Pakete stillschweigend verwirft; „Connection refused“ dagegen heißt, dass die Anfrage ankommt, aber kein Dienst auf dem Port lauscht. Gelöst wird nach dem Prinzip der minimalen Freigabe: genau den benötigten Port öffnen (443/tcp) und alles andere geschlossen lassen — die Datenbank auf Port 3306 gehört nicht ins Netz, auch wenn sie auf allen Adressen lauscht. Die Firewall auszuschalten (ufw disable) wäre keine Lösung, sondern ein Sicherheitsproblem.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ `ufw`-Verhalten (nummerierte Regeln, „first match“, Standardrichtung) und die Fehlermeldungen von `nc -zv` abgleichen.
- ⚠ Vereinfachung: Zugriffe auf die **eigene** Netzwerk-IP (nicht 127.x) behandelt die Simulation wie Zugriffe von einem anderen Rechner, damit die Firewall wirkt — im echten Betrieb gilt das so nicht.
- ⚠ Falschlösungen, die nicht zählen: `ufw disable`, Port 3306 öffnen, `allow from <Netz>`.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T09 · Server ist extrem langsam

*id:* `prozess-last` · *Stufe:* Mittel · *Kunde:* Rheinwerk Maschinen GmbH

**Aufgabe (so sehen es Lernende):**

> Der ERP-Server erp01 der Rheinwerk Maschinen GmbH ist seit dem frühen Morgen extrem langsam: Auftragslisten brauchen über 10 Sekunden. Der ERP-Dienst und die Datenbank sind in Betrieb und dürfen auf keinen Fall beendet werden, die Fertigung arbeitet gerade. Finde den Prozess, der die Last verursacht, und beende genau diesen. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `uptime` — Die Last (load average) ist auffallend hoch — irgendetwas rechnet ununterbrochen.
2. `top -b -n 1` — Ganz oben steht Prozess 4218: python3 mit 97,8 % CPU (Benutzer erp). Java (PID 905) und MariaDB (PID 742) liegen bei normalen Werten.
3. `ps aux --sort=-%cpu | head -4` — Dieselbe Rangliste mit der vollständigen Kommandozeile: der nächtliche Export export_stuecklisten.py läuft seit 02:00 Uhr und hat über 400 Minuten CPU-Zeit verbraucht.
4. `sudo kill 4218` — Zuerst höflich beenden (SIGTERM). Der Prozess gehört dem Konto erp, daher ist sudo nötig. Hier passiert nichts sichtbar — das Skript ignoriert das Signal.
5. `ps aux --sort=-%cpu | head -3` — Kontrolle: Prozess 4218 läuft weiterhin mit knapp 98 % CPU.
6. `sudo kill -9 4218` ← **löst die Störung** — SIGKILL lässt sich nicht ignorieren: Der Kernel beendet den Prozess sofort.
7. `top -b -n 1` — Kontrolle: Der Prozess ist weg, die Last ist gesunken, ERP und Datenbank laufen weiter.

**Tipps (3 Stufen, vage → konkret):**

1. Prüfe die Auslastung: uptime zeigt die Last, top -b -n 1 oder ps aux --sort=-%cpu zeigen die Prozesse mit dem größten CPU-Verbrauch ganz oben.
2. Ein Python-Skript (export_stuecklisten.py, Benutzer erp) belegt fast einen ganzen Kern und läuft seit 02:00 Uhr. Java (ERP) und MariaDB sind dagegen normal und müssen weiterlaufen. Beenden kannst du einen Prozess mit seiner PID: sudo kill <pid> (fremde Prozesse nur mit sudo). Prüfe danach mit ps aux, ob er wirklich weg ist.
3. Prozess 4218 reagiert nicht auf das normale Beenden (SIGTERM). Erzwinge das Ende mit sudo kill -9 4218 und kontrolliere mit top -b -n 1, dass die Last sinkt.

**Erklärung nach der Lösung:**

> Ursache: Der nächtliche Export-Job (per Cron um 02:00 gestartet) ist in eine Endlosschleife geraten und belegt seitdem einen CPU-Kern vollständig; dadurch bekommt der ERP-Server weniger Rechenzeit und antwortet langsam. Vorgehen: Last messen (uptime), Verursacher finden (top -b -n 1 bzw. ps aux --sort=-%cpu: auf %CPU, %MEM, Benutzer und Startzeit achten), gezielt genau diesen Prozess beenden. Wer nicht blind alles „Große“ beendet, erkennt auch den Unterschied zwischen Verursacher und Opfer: Java und MariaDB nutzen zwar viel Speicher, sind aber die Dienste, die der Kunde braucht. kill sendet ein Signal: SIGTERM (15, Standard) bittet den Prozess, sich zu beenden — er kann das ignorieren oder aufräumen. SIGKILL (-9) erzwingt das Ende ohne Aufräumen und ist deshalb nur die letzte Wahl (danach können Sperrdateien oder halbfertige Ausgaben zurückbleiben). Fremde Prozesse darf nur root beenden. Dauerhaft gehört der Fehler im Skript behoben (Abbruchbedingung, Timeout) und der Job mit einer Laufzeitbegrenzung versehen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Der Prozess ignoriert SIGTERM; erst `kill -9` beendet ihn. Ist das als Lehrinhalt vertretbar (kill -9 gilt als letztes Mittel)? Ausgabe von `top -b`/`ps aux --sort` auf Plausibilität prüfen.
- ⚠ Ein Neustart des ERP-Dienstes zählt nicht als Lösung — sinnvoll?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

## Schwer (3)

### T10 · Viele fehlgeschlagene SSH-Anmeldungen

*id:* `ssh-angriff` · *Stufe:* Schwer · *Kunde:* Hartmann Metallbau GmbH

**Aufgabe (so sehen es Lernende):**

> Das Monitoring der Hartmann Metallbau GmbH meldet seit dem frühen Morgen sehr viele SSH-Anmeldeversuche am Dateiserver fs01 (192.168.20.30); SSH ist für Wartungszwecke auch aus dem Internet erreichbar. Prüfe anhand des Protokolls, ob es sich um einen Angriff handelt, und reagiere rein defensiv: Sperre den Angreifer aus. Der Admin-Arbeitsplatz 192.168.20.15 und Frau Neumann (192.168.20.22) müssen weiter per SSH arbeiten können, SSH und Firewall bleiben in Betrieb. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `sudo grep -c "Failed password" /var/log/auth.log` — 121 fehlgeschlagene Passwort-Anmeldungen an einem einzigen Morgen — viel zu viele für ein Versehen.
2. `sudo tail -n 8 /var/log/auth.log` — Die letzten Zeilen zeigen es: immer dieselbe Adresse 203.0.113.77, immer andere Benutzernamen (admin, ubuntu, test …) — typisch für einen Brute-Force-Angriff.
3. `sudo grep "Failed password" /var/log/auth.log | grep -c 203.0.113.77` — 120 der 121 Fehlversuche stammen von dieser einen Adresse; der übrige ist ein Tippfehler von Frau Neumann (192.168.20.22).
4. `sudo ufw status numbered` — Regel 1 erlaubt Port 22 für „Anywhere“ — jede neue Sperre muss vor dieser Regel stehen, sonst bleibt sie wirkungslos.
5. `sudo ufw insert 1 deny from 203.0.113.77` ← **löst die Störung** — Die Sperre als erste Regel einfügen: Pakete von 203.0.113.77 werden jetzt verworfen, bevor die Erlaubnis für alle greift.
6. `sudo ufw status numbered` — Kontrolle: [1] DENY 203.0.113.77 steht vor der SSH-Freigabe; alle anderen (Admin, Frau Neumann) kommen wie bisher durch.

**Tipps (3 Stufen, vage → konkret):**

1. SSH-Anmeldungen protokolliert der Server in /var/log/auth.log (Lesen nur mit sudo). Zähle die Fehlversuche mit grep -c „Failed password“ und schau mit tail -n 10 auf die letzten Zeilen: Wer meldet sich ständig an, und mit welchen Benutzernamen?
2. Fast alle Fehlversuche kommen von 203.0.113.77 — mit immer neuen Benutzernamen (root, admin, test, pi …): ein Brute-Force-Angriff. Der Admin-Arbeitsplatz und Frau Neumann sind legitim. Sperre nur den Angreifer: ufw deny from <ip>. Kontrolliere mit sudo ufw status numbered, ob die Sperre auch wirkt.
3. ufw prüft die Regeln von oben nach unten, die erste passende entscheidet. Regel 1 erlaubt SSH für alle — ein hinten angehängtes „deny“ kommt nie zum Zug. Setze die Sperre davor: sudo ufw insert 1 deny from 203.0.113.77.

**Erklärung nach der Lösung:**

> Ursache: SSH war aus dem Internet erreichbar, und ein Angreifer (203.0.113.77) hat per Brute Force in Abständen von knapp 100 Sekunden Benutzername/Passwort-Kombinationen durchprobiert — erkennbar an den vielen „Failed password“- und „Invalid user“-Zeilen mit immer neuen Namen von derselben Adresse. Im Protokoll lassen sich echte Angriffe von Tippfehlern trennen: Ein einzelner Fehlversuch eines bekannten Benutzers aus dem Firmennetz ist harmlos, über hundert Versuche einer fremden Adresse sind es nicht. Defensive Sofortmaßnahme: die Adresse in der Firewall sperren. Dabei zählt die Reihenfolge: ufw wertet die Regeln von oben nach unten aus und nimmt die erste passende — ein mit „ufw deny from …“ hinten angehängtes Verbot wirkt nicht, solange davor „22/tcp ALLOW Anywhere“ steht. Mit ufw insert 1 steht die Sperre ganz oben. Nachhaltig besser: SSH nur aus dem Firmennetz bzw. per VPN erlauben, Anmeldung mit Schlüsseln statt Passwörtern, root-Login abschalten und Werkzeuge wie fail2ban einsetzen, die solche Adressen automatisch sperren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ `sudo ufw insert 1 deny from <IP>`: Die Lehre „first match, Reihenfolge zählt“ — stimmt die Darstellung? Ein hinten angehängtes `ufw deny` wirkt nicht.
- ⚠ Als Gegenmaßnahme dient hier nur eine Sperrregel. Wären Hinweise auf fail2ban/Schlüssel-Authentifizierung in der Erklärung fachlich wünschenswert?
- ⚠ Der Admin (192.168.20.15) und Frau Neumann (192.168.20.22) müssen weiter durchkommen — Zahlen im Log (121 Fehlversuche, davon 120 von einer IP) nachrechnen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T11 · Cron-Job läuft nicht

*id:* `cron-job` · *Stufe:* Schwer · *Kunde:* Sonnenhof Apotheken KG

**Aufgabe (so sehen es Lernende):**

> Die nächtliche Datensicherung der Sonnenhof Apotheken KG (täglich 02:30 Uhr, Skript nachtsicherung.sh auf backup01) läuft seit dem 04.10. nicht mehr; die letzte Sicherung in /var/backups ist vom 03.10. Der Cron-Dienst läuft, und am 03.10. wurde das Skript in ein neues Verzeichnis umgezogen. Finde alle Ursachen und sorge dafür, dass die Sicherung heute Nacht um 02:30 Uhr wieder startet — der Auftrag gehört dem Konto root. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `crontab -l` — Dein Konto hat keine Crontab („no crontab for techniker“) — der Auftrag gehört einem anderen Konto.
2. `sudo crontab -l` — Die Crontab von root enthält den Auftrag: täglich 02:30 Uhr /opt/backup/nachtsicherung.sh.
3. `sudo grep CRON /var/log/syslog` — Cron startet den Auftrag jede Nacht („CMD (/opt/backup/nachtsicherung.sh)“), aber die Fehlermeldungen werden verworfen („No MTA installed, discarding output“).
4. `/opt/backup/nachtsicherung.sh` — Von Hand gestartet zeigt sich Fehler 1: „No such file or directory“ — das Skript liegt nicht (mehr) in /opt/backup.
5. `ls /opt` — Das Verzeichnis heißt jetzt „backups“ (mit s).
6. `ls -l /opt/backups` — Dort liegt die Datei nachtsicherung.sh — mit -rw-r--r--, also ohne Ausführungsrecht (kein x).
7. `echo '30 2 * * * /opt/backups/nachtsicherung.sh' | sudo crontab -` — Die Crontab von root mit dem richtigen Pfad neu setzen (crontab - liest die neue Tabelle aus der Eingabe).
8. `/opt/backups/nachtsicherung.sh` *(zeigt absichtlich einen Fehler)* — Der Pfad stimmt jetzt, aber Fehler 2 kommt zum Vorschein: „Permission denied“ — die Datei ist nicht ausführbar.
9. `sudo chmod +x /opt/backups/nachtsicherung.sh` ← **löst die Störung** — Das Ausführungsrecht setzen. Damit ist der Cron-Auftrag korrekt.
10. `sudo /opt/backups/nachtsicherung.sh` — Kontrolle: Das Skript läuft durch und meldet die fertige Sicherung.

**Tipps (3 Stufen, vage → konkret):**

1. Der Cron-Dienst läuft — der Fehler steckt im Auftrag selbst. Schau dir die Crontab an: Jedes Konto hat eine eigene, und der Sicherungsauftrag gehört root (sudo crontab -l). Das Cron-Protokoll steht in /var/log/syslog (sudo grep CRON /var/log/syslog).
2. Cron wirft Fehlermeldungen weg („No MTA installed, discarding output“). Starte das Skript deshalb so, wie Cron es tut, von Hand — das zeigt, was schiefgeht. Es gibt zwei Ursachen: den Pfad in der Crontab (ls /opt zeigt, wohin das Skript umgezogen ist) und das Ausführungsrecht der Datei (ls -l).
3. Setze die Crontab neu: echo '30 2 * * * /opt/backups/nachtsicherung.sh' | sudo crontab - und mache das Skript ausführbar: sudo chmod +x /opt/backups/nachtsicherung.sh. Teste es mit sudo /opt/backups/nachtsicherung.sh.

**Erklärung nach der Lösung:**

> Ursachen: Es gab zwei voneinander unabhängige Fehler, die sich gegenseitig verdeckt haben. (1) Beim Umzug des Skripts von /opt/backup nach /opt/backups wurde die Crontab nicht angepasst — Cron startete einen Pfad, den es nicht mehr gibt. (2) Die neu angelegte Datei hatte keine Ausführungsrechte (-rw-r--r--); hätte man nur den Pfad korrigiert, wäre der Job weiterhin mit „Permission denied“ gescheitert. Dass nichts auffiel, liegt an Cron: Es verwirft die Ausgabe des Jobs, wenn kein Mailsystem eingerichtet ist („No MTA installed, discarding output“) — im Syslog steht nur, dass der Job gestartet wurde, nicht, dass er scheiterte. Deshalb gilt: Jobs von Hand so starten, wie Cron sie startet, und die Ausgabe in eine eigene Logdatei schreiben (>> /var/log/job.log 2>&1). Außerdem: Jedes Konto hat eine eigene Crontab (crontab -l zeigt nur die eigene, sudo crontab -l die von root), und die fünf Zeitfelder (Minute, Stunde, Tag, Monat, Wochentag) sind Pflicht — ein fehlendes Feld ergibt „bad day-of-week“ oder „bad command“. Als Alternative zum Ausführungsrecht hätte auch bash /opt/backups/nachtsicherung.sh als Befehl in der Crontab funktioniert.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Zwei Ursachen (falscher Skriptpfad, fehlendes Ausführungsrecht); der Zeitpunkt 02:30 ist Pflicht. Die Crontab-Syntaxprüfung prüft nur die fünf Zeitfelder.
- ⚠ `echo '…' | sudo crontab -` ersetzt die gesamte Crontab des Kontos (hier war sie leer) — wird der Unterschied zu `crontab -e` erklärt?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### T12 · Intranet-Portal: mehrere Fehler hintereinander

*id:* `mehrstufig` · *Stufe:* Schwer · *Kunde:* Rheinwerk Maschinen GmbH

**Aufgabe (so sehen es Lernende):**

> Das Intranet-Portal der Rheinwerk Maschinen GmbH (Server intranet01, 192.168.60.40, Port 80) ist seit der gestrigen Wartung nicht mehr erreichbar. Bei der Wartung wurde das Logverzeichnis des Portals aufgeräumt, /srv/portal vom Deploy-Konto neu angelegt und die Firewall neu konfiguriert. Es steckt nicht nur ein Fehler dahinter: Behebe alle Ursachen. Das Portal soll danach auf Port 80 erreichbar sein, SSH bleibt offen, sonst bleibt alles gesperrt, die Firewall bleibt eingeschaltet — und Rechte mit 777 sind keine Lösung. (Die Meldung steht auch in ticket.txt.)

**Lösungsweg zum Nachspielen:**

1. `systemctl status nginx` — Stufe 1: Der Dienst ist „failed“ — er läuft gar nicht.
2. `sudo nginx -t` *(zeigt absichtlich einen Fehler)* — Der Konfigurationstest nennt die Ursache: Das Verzeichnis /var/log/portal für das Access-Log gibt es nicht mehr.
3. `sudo mkdir /var/log/portal` — Das Logverzeichnis wieder anlegen.
4. `sudo systemctl start nginx` — nginx startet jetzt. Damit ist Stufe 1 geschafft — aber „läuft“ heißt noch nicht „funktioniert“.
5. `curl -I localhost` — Stufe 2: Der Webserver antwortet lokal mit „403 Forbidden“ statt mit der Seite.
6. `sudo cat /var/log/nginx/error.log` *(zeigt absichtlich einen Fehler)* — Das Fehlerprotokoll nennt den Grund: „open() /srv/portal/html/index.html failed (13: Permission denied)“ — der Webserver-Benutzer kommt nicht an die Datei.
7. `ls -l /srv` — /srv/portal gehört deploy:deploy mit drwxr-x--- (750): Für „andere“, also auch für www-data, fehlt das Recht, das Verzeichnis zu betreten.
8. `sudo chmod o+x /srv/portal` — Genau das fehlende Recht ergänzen: andere dürfen das Verzeichnis betreten (x) — mehr nicht.
9. `curl localhost` — Stufe 2 geschafft: Lokal wird die Intranet-Seite geliefert.
10. `nc -zv 192.168.60.40 80` — Stufe 3: Von „außen“ (über die Netzwerk-Adresse) läuft die Anfrage in ein Timeout.
11. `sudo grep BLOCK /var/log/ufw.log` — Das Firewall-Protokoll zeigt die verworfenen Zugriffe der Arbeitsplätze auf DPT=80.
12. `sudo ufw allow 80/tcp` ← **löst die Störung** — Port 80 in der Firewall freigeben. SSH bleibt offen, alles andere gesperrt.
13. `nc -zv 192.168.60.40 80` — Kontrolle: „succeeded!“ — das Portal ist von den Arbeitsplätzen aus erreichbar.

**Tipps (3 Stufen, vage → konkret):**

1. Gehe die Kette von innen nach außen durch: Läuft der Dienst (systemctl status nginx)? Liefert er lokal eine Seite (curl localhost)? Ist der Port von außen erreichbar (nc -zv 192.168.60.40 80)? Auf jeder Stufe kann ein anderer Fehler stecken — erst wenn eine Stufe läuft, zeigt sich die nächste.
2. Stufe 1: nginx startet nicht — sudo nginx -t nennt das fehlende Logverzeichnis. Stufe 2: Läuft nginx, antwortet curl mit „403 Forbidden“ — der Webserver-Benutzer www-data darf einen Ordner nicht betreten (sudo cat /var/log/nginx/error.log, ls -l /srv). Stufe 3: Von außen kommt nichts an — die Firewall (sudo ufw status, sudo grep BLOCK /var/log/ufw.log).
3. Lösung: sudo mkdir /var/log/portal, danach sudo systemctl start nginx; sudo chmod o+x /srv/portal (genau das nötige Recht, nicht 777); sudo ufw allow 80/tcp. Prüfe zum Schluss mit curl localhost und nc -zv 192.168.60.40 80.

**Erklärung nach der Lösung:**

> Ursachen: Drei Fehler lagen übereinander, und jeder hat den nächsten verdeckt. (1) nginx brach beim Start ab, weil das Verzeichnis für das Access-Log (/var/log/portal) beim Aufräumen gelöscht worden war — der Konfigurationstest nginx -t zeigt solche Fehler, ohne den Dienst zu starten. (2) Nach dem Start lieferte der Webserver „403 Forbidden“: /srv/portal war vom Deploy-Konto mit 750 angelegt worden, der Webserver-Benutzer www-data gehört weder zum Besitzer noch zur Gruppe, darf das Verzeichnis also nicht betreten (x-Recht fehlt) — der Grund steht im error.log (13: Permission denied). (3) Die neu konfigurierte Firewall ließ nur SSH durch, sodass Anfragen von außen an Port 80 verworfen wurden — erkennbar am Timeout und an den [UFW BLOCK]-Zeilen im Log. Prinzip der Fehlersuche: von innen nach außen vorgehen (Dienst → lokaler Zugriff → Zugriff von außen) und jede Stufe einzeln prüfen; ein „läuft“ in systemctl status beweist nicht, dass das Ergebnis beim Benutzer ankommt. Auch bei der Behebung gilt: genau das fehlende Recht geben (o+x auf das Verzeichnis, Port 80 in der Firewall) statt alles zu öffnen (777, Firewall aus).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Drei Ursachen übereinander (fehlendes Logverzeichnis → nginx startet nicht; `o+x` auf `/srv/portal` → 403; `ufw allow 80/tcp`). Ist die Reihenfolge der Diagnose im Lösungsweg realistisch?
- ⚠ Nicht zulässig: `chmod 777`, Firewall abschalten, weitere Ports öffnen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---
