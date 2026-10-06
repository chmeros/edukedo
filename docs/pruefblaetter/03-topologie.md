# Prüfblatt Netzwerk-Topologie (9 Szenarien)

Stand 06.10.2026 · erzeugt aus `packages/shared/src/topologie-sim.ts` (F-171/F-174) · **alle Inhalte sind Entwürfe**.

**So prüfst du:** Öffne *Instrumente → Netzwerk bauen*, wähle das Szenario, lies die Aufgabe, versuche sie selbst und vergleiche mit der Lösung unten (dort gibt es auch „Lösung übernehmen“ und „Alle Prüfaufträge testen“).

**Bekannte Vereinfachungen (gelten für alle Szenarien):** Der Ping prüft Kabel → Adresse → Segment/Gateway → Router → **Rückweg** (getrennt). Router kennen nur direkt angeschlossene Netze und die eingetragenen Routen (keine automatische Standardroute, kein dynamisches Routing). VLANs nur als Access-Ports (keine Trunks/Subinterfaces). Firewall: einfache Regelliste, zustandsbehaftet. NAT ohne Ports. DHCP: deterministische Vergabe, keine Pool-Ausschlüsse, kein Relay. Kein ARP-/Switching-Detail, kein Spanning-Tree.

## Leicht (3)

### N01 · Ein Netz, ein Switch

*id:* `ein-netz-ein-switch` · *Stufe:* Leicht · Büronetz der Hartmann Metallbau GmbH: PC1, PC2 und Server1 an einem Switch.

**Aufgabe (so sehen es Lernende):**

> Die Brevanta IT-Systemhaus GmbH richtet für die Hartmann Metallbau GmbH ein kleines Büronetz ein: PC1, PC2 und der Datei-Server Server1 hängen an einem gemeinsamen Switch und sollen sich gegenseitig erreichen. Beim Aufbau ist etwas schiefgelaufen. Finde mit „Ping senden“ heraus, woran es liegt, und behebe die Fehler.

**Adressplan** — Ein einziges Netz 192.168.10.0/24 (Maske 255.255.255.0). Weil es nur ein Netz gibt, wird kein Gateway gebraucht.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.11 | /24 (255.255.255.0) | – |  |
| PC2 | eth0 | 192.168.10.12 | /24 (255.255.255.0) | – |  |
| Server1 | eth0 | 192.168.10.20 | /24 (255.255.255.0) | – |  |

**Prüfaufträge:**

- PC1 → PC2
- PC2 → Server1
- PC1 → Server1

**Lösung (Schritte):**

1. Kabel zwischen PC2 · eth0 und Switch1 · Port 2 stecken (PC2 hing an keinem Kabel).
2. Bei Server1 die Subnetzmaske von 255.255.255.240 (/28) auf 255.255.255.0 (/24) ändern.

**Tipps:**

1. Sende zuerst einen Ping (z. B. PC2 → Server1) und lies die Schritte: Sie zeigen, an welcher Stelle die Verbindung abbricht.
2. Prüfe die Kabel (unterste Schicht): Hängen alle drei Geräte am Switch? Die Kabelliste zeigt, welche Anschlüsse belegt sind.
3. Vergleiche bei jedem Gerät Adresse und Maske mit dem Adressplan. Eine falsche Subnetzmaske lässt ein Gerät in einem anderen Netz „wohnen“.
4. Server1 hat die Maske 255.255.255.240 (/28). Welches Netz ergibt sich daraus für 192.168.10.20 — und liegt PC1 (192.168.10.11) darin?

**Erklärung nach der Lösung:**

> Ein Switch verbindet Geräte zu einem Netzwerksegment (Schicht 2), er kennt keine IP-Adressen und braucht keine Konfiguration. Damit zwei Geräte direkt miteinander sprechen, brauchen sie ein Kabel zum Switch und Adressen im selben Subnetz — also dieselbe Netzadresse, nachdem die Maske angewendet wurde. Server1 hatte /28 und damit das Netz 192.168.10.16/28 (Hosts .17 bis .30): Die Anfrage von PC1 kam zwar an, doch für die Antwort liegt 192.168.10.11 aus Sicht von Server1 in einem anderen Netz. Ohne Gateway ging sie ins Leere. Merke: Ein Ping braucht Hin- und Rückweg, und beide Seiten rechnen mit ihrer eigenen Maske.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Rückweg-Falle: Server mit /28 erreicht PC im /24 nicht zurück. Erklärung der Maskenwirkung prüfen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N02 · Zwei Netze über einen Router

*id:* `zwei-netze-router` · *Stufe:* Leicht · Nordlicht Logistik AG: Büro-Netz und Server-Netz, verbunden durch einen Router.

**Aufgabe (so sehen es Lernende):**

> Bei der Nordlicht Logistik AG sollen die Büro-PCs (Netz 192.168.10.0/24) auf den Server im Server-Netz (192.168.20.0/24) zugreifen. Die beiden Netze hängen an je einem Switch und werden durch den Router Router1 verbunden. Der Router ist noch nicht konfiguriert, den PCs fehlt das Gateway, und irgendwo fehlt auch noch ein Kabel. Bringe die Verbindung zum Laufen.

**Adressplan** — Büro-Netz 192.168.10.0/24, Server-Netz 192.168.20.0/24. Der Router bekommt in jedem Netz die Adresse .1 — sie dient den Geräten dort als Standardgateway.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 |  |
| PC2 | eth0 | 192.168.10.26 | /24 (255.255.255.0) | 192.168.10.1 |  |
| Server1 | eth0 | 192.168.20.10 | /24 (255.255.255.0) | 192.168.20.1 |  |
| Router1 | eth0 (Büro-Netz) | 192.168.10.1 | /24 (255.255.255.0) | – |  |
| Router1 | eth1 (Server-Netz) | 192.168.20.1 | /24 (255.255.255.0) | – |  |

**Prüfaufträge:**

- PC1 → PC2 (gleiches Netz, Kontrolle)
- PC1 → Server1 (über den Router)
- PC2 → Server1 (über den Router)
- Server1 → PC1 (Gegenrichtung)

**Lösung (Schritte):**

1. Router1 · eth0: IP 192.168.10.1, Maske /24 eintragen (Büro-Netz).
2. Router1 · eth1: IP 192.168.20.1, Maske /24 eintragen (Server-Netz).
3. Kabel zwischen Router1 · eth1 und Switch Server · Port 2 stecken (der Router war nicht am Server-Netz angeschlossen).
4. Gateway 192.168.10.1 bei PC1 und PC2 eintragen.
5. Gateway 192.168.20.1 bei Server1 eintragen (für die Antworten ins Büro-Netz).

**Tipps:**

1. Sende einen Ping von PC1 zu Server1 und lies, wo er abbricht. Ziele in einem anderen Netz laufen über das Standardgateway.
2. Das Gateway eines Geräts ist die Adresse der Router-Schnittstelle im eigenen Netz. Trage sie bei PC1 und PC2 ein — und denke an den Server.
3. Ein Router leitet nur zwischen Netzen, an denen er mit einer konfigurierten Schnittstelle hängt: Jede Schnittstelle braucht eine IP-Adresse und ein Kabel.
4. Auch der Server braucht ein Gateway: Seine Antwort an PC1 geht in ein anderes Netz. Ohne Gateway kommt die Anfrage an, die Antwort aber nicht zurück.

**Erklärung nach der Lösung:**

> Ein Router trennt Netze (Broadcast-Domänen), ein Switch nicht. Jede Router-Schnittstelle bekommt eine Adresse aus „ihrem“ Netz; diese Adresse tragen die Geräte dort als Standardgateway ein. Ein Gerät schickt alles, was nicht im eigenen Subnetz liegt, an sein Gateway — das Gateway muss deshalb im selben Subnetz liegen. Der Router kennt zunächst nur seine direkt angeschlossenen Netze und leitet zwischen ihnen weiter. Wichtig: Der Rückweg zählt mit. Auch der Server braucht ein Gateway, sonst weiß er nicht, wie die Antwort an PC1 in das andere Netz kommt („Hinweg ok, Rückweg fehlt“).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Router kennt nur direkt angeschlossene Netze; Gateways an den Hosts nötig. Rückweg wird getrennt erklärt.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N03 · Adressen automatisch per DHCP

*id:* `dhcp-apotheke` · *Stufe:* Leicht · Sonnenhof Apotheken KG: Drei PCs sollen ihre Adresse vom Server bekommen.

**Aufgabe (so sehen es Lernende):**

> In der Filiale der Sonnenhof Apotheken KG sollen PC1, PC2 und PC3 ihre Adresse nicht mehr von Hand bekommen, sondern automatisch per DHCP. Den DHCP-Dienst übernimmt Server1 (feste Adresse 192.168.10.2/24). Der Dienst ist noch nicht richtig eingerichtet, und ein PC ist nicht angeschlossen. Sorge dafür, dass alle PCs eine Adresse aus dem Pool erhalten und sich gegenseitig sowie den Server erreichen.

**Adressplan** — Ein Netz 192.168.10.0/24. Server1 hat die feste Adresse .2; die drei PCs bekommen ihre Adresse automatisch aus dem Pool .100 bis .109. Ein Gateway ist nicht nötig, es gibt nur dieses eine Netz.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | automatisch (DHCP) | kommt vom Server | – | DHCP-Client |
| PC2 | eth0 | automatisch (DHCP) | kommt vom Server | – | DHCP-Client |
| PC3 | eth0 | automatisch (DHCP) | kommt vom Server | – | DHCP-Client |
| Server1 | eth0 | 192.168.10.2 | /24 (255.255.255.0) | – | DHCP-Server |

**DHCP-Dienst auf Server1**

| Schnittstelle | Netz | Pool-Start | Pool-Ende | Gateway für Clients | Status |
| --- | --- | --- | --- | --- | --- |
| eth0 | 192.168.10.0/24 | 192.168.10.100 | 192.168.10.109 | keins | eingeschaltet |

**Prüfaufträge:**

- PC1 → PC2
- PC2 → PC3
- PC1 → Server1

**Lösung (Schritte):**

1. Server1 · DHCP-Dienst: Pool-Ende auf 192.168.10.109 korrigieren (stand im Netz 192.168.20.0, das gehört nicht zu diesem Netz).
2. Server1 · DHCP-Dienst einschalten.
3. Kabel zwischen PC2 · eth0 und Switch1 · Port 2 stecken (PC2 war nicht angeschlossen).

**Tipps:**

1. Sende einen Ping von PC1 zu PC2 und lies die Vorprüfung: Welche Adresse hat PC1 — und was bedeutet 169.254.x.x?
2. Eine Adresse aus 169.254.0.0/16 ist eine Notadresse (APIPA): Der PC hat keinen DHCP-Server gefunden. Prüfe die Einstellungen von Server1, ob der DHCP-Dienst eingeschaltet ist.
3. Der Pool muss im Netz des Servers liegen (192.168.10.0/24). Vergleiche Pool-Start und Pool-Ende genau mit dem Adressplan — ein Zahlendreher im dritten Oktett fällt schnell durch.
4. Wenn ein PC gar keine Adresse bekommt, schau auf die unterste Schicht: Hat er ein Kabel zum Switch?

**Erklärung nach der Lösung:**

> DHCP (Dynamic Host Configuration Protocol) verteilt Adresse, Maske und Gateway automatisch: Ein neuer Rechner schickt eine Anfrage als Broadcast ins Segment, der DHCP-Server antwortet mit einer freien Adresse aus seinem Pool. Damit das klappt, muss der Dienst eingeschaltet sein, der Pool im Netz der Server-Schnittstelle liegen und der Client per Kabel im selben Segment hängen. Wenn niemand antwortet, nimmt sich der Rechner eine Notadresse aus 169.254.0.0/16 (APIPA). Die gilt nur im eigenen Segment — ein PC mit 169.254.x.x erreicht keinen Server im normalen Netz. Merke: 169.254.x.x heißt „DHCP hat nicht funktioniert“.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ DHCP-Pool, APIPA bei fehlendem Dienst/Kabel; Vergabe deterministisch (Reihenfolge der Geräteliste) — bewusst vereinfacht.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

## Mittel (4)

### N04 · DHCP-Pool und feste Adresse

*id:* `dhcp-pool-konflikt` · *Stufe:* Mittel · Brevanta IT-Systemhaus: Der Pool ist zu klein und überschneidet sich mit der Server-Adresse.

**Aufgabe (so sehen es Lernende):**

> Im Büro der Brevanta IT-Systemhaus GmbH verteilt Router1 die Adressen per DHCP an PC1 bis PC3. Server1 hat die feste Adresse 192.168.10.20. Seit der Umstellung melden PCs einen Adresskonflikt, und ein PC bekommt gar keine Adresse. Finde die Ursachen im DHCP-Pool von Router1 und stelle den Betrieb wieder her.

**Adressplan** — Netz 192.168.10.0/24. Feste Adressen: Router1 .1, Server1 .20. Alle PCs holen sich ihre Adresse per DHCP von Router1; Der Pool soll mindestens 10 Adressen umfassen und darf keine feste Adresse enthalten.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| Router1 | eth0 | 192.168.10.1 | /24 (255.255.255.0) | – | DHCP-Server |
| Server1 | eth0 | 192.168.10.20 | /24 (255.255.255.0) | 192.168.10.1 | fest |
| PC1 | eth0 | automatisch (DHCP) | kommt vom Router | – | DHCP-Client |
| PC2 | eth0 | automatisch (DHCP) | kommt vom Router | – | DHCP-Client |
| PC3 | eth0 | automatisch (DHCP) | kommt vom Router | – | DHCP-Client |

**Soll: DHCP-Pool von Router1**

| Netz | Pool | Mindestgröße | Nicht im Pool |
| --- | --- | --- | --- |
| 192.168.10.0/24 | frei wählbar im Netz | 10 Adressen | 192.168.10.1 (Router1) und 192.168.10.20 (Server1) |

**Prüfaufträge:**

- PC1 → Server1
- PC2 → Server1
- PC3 → Server1
- PC1 → Router1 (Gateway)

**Lösung (Schritte):**

1. Router1 · DHCP-Dienst: Pool auf 192.168.10.100 bis 192.168.10.119 setzen (20 Adressen, ohne die feste Adresse .20 von Server1).

**Tipps:**

1. Teste PC1 → Server1 und PC3 → Server1 und vergleiche: Welcher PC hat welche Adresse bekommen? Die Vorprüfung nennt Adresse und Pool-Platz.
2. Der Pool vergibt der Reihe nach, beginnend mit der Pool-Start-Adresse — er kennt die feste Adresse von Server1 nicht. Liegt .20 im Pool, wird sie irgendwann doppelt vergeben.
3. Zähle die Adressen im Pool: Von .20 bis .21 sind es nur zwei — für drei PCs ist das zu wenig. Ein PC ohne Adresse nimmt eine Notadresse (APIPA).
4. Wähle einen Pool, der keine feste Adresse enthält und mindestens zehn Adressen umfasst, z. B. .100 bis .119.

**Erklärung nach der Lösung:**

> Ein DHCP-Server vergibt Adressen aus einem Pool, ohne in Wirklichkeit zu wissen, welche Adressen Geräte mit fester Konfiguration schon haben — es sei denn, man schließt diese Adressen aus. Liegt die feste Adresse von Server1 mitten im Pool, bekommt irgendwann ein Client genau diese Adresse: Zwei Geräte im selben Segment haben dieselbe IP (Adresskonflikt), und Antworten landen beim falschen Gerät. Der Pool hier war außerdem mit zwei Adressen viel zu klein: Für den dritten PC blieb nichts übrig, er nahm eine APIPA-Adresse (169.254.x.x). Gute Praxis: Feste Adressen (Router, Server, Drucker) und DHCP-Pool klar trennen, den Pool großzügig dimensionieren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Feste Adresse im Pool-Bereich → Adresskonflikt; Pool erschöpft → APIPA. Realität: Server würde Adresse oft ausgeschlossen (hier keine Pool-Ausschlüsse).

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N05 · Zentrale und Filiale über zwei Router

*id:* `filiale-zwei-router` · *Stufe:* Mittel · Rheinwerk Maschinen GmbH: Statische Routen auf zwei Routern, auch der Rückweg zählt.

**Aufgabe (so sehen es Lernende):**

> Die Rheinwerk Maschinen GmbH verbindet ihre Zentrale (Netz 192.168.10.0/24) mit der Filiale (192.168.20.0/24) über zwei Router. Dazwischen liegt eine Verbindung 10.0.0.0/30 (Router Zentrale 10.0.0.1, Router Filiale 10.0.0.2). Die Router kennen nur ihre direkt angeschlossenen Netze und brauchen statische Routen. Die Zentrale kommt nicht an den Filial-Server — und selbst nach der ersten Korrektur kommt keine Antwort zurück. Richte die Routen auf beiden Routern ein.

**Adressplan** — Drei Netze: Zentrale 192.168.10.0/24, Verbindung 10.0.0.0/30, Filiale 192.168.20.0/24. Die Hosts haben ihr Gateway schon eingetragen; es fehlen die Routen auf den beiden Routern.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 |  |
| PC2 | eth0 | 192.168.10.26 | /24 (255.255.255.0) | 192.168.10.1 |  |
| Server Filiale | eth0 | 192.168.20.10 | /24 (255.255.255.0) | 192.168.20.1 |  |
| Router Zentrale | eth0 (Zentrale) | 192.168.10.1 | /24 (255.255.255.0) | – |  |
| Router Zentrale | eth1 (Verbindung) | 10.0.0.1 | /30 (255.255.255.252) | – |  |
| Router Filiale | eth0 (Verbindung) | 10.0.0.2 | /30 (255.255.255.252) | – |  |
| Router Filiale | eth1 (Filiale) | 192.168.20.1 | /24 (255.255.255.0) | – |  |

**Soll: statische Routen**

| Router | Zielnetz | Maske | Nächster Hop |
| --- | --- | --- | --- |
| Router Zentrale | 192.168.20.0 | /24 | 10.0.0.2 (Router Filiale) |
| Router Filiale | 0.0.0.0 (Standardroute) | /0 | 10.0.0.1 (Router Zentrale) |

**Prüfaufträge:**

- PC1 → PC2 (gleiches Netz, Kontrolle)
- PC1 → Server Filiale
- PC2 → Server Filiale
- Server Filiale → PC1 (Gegenrichtung)

**Lösung (Schritte):**

1. Router Zentrale: Die Route zum Netz 192.168.20.0/24 hat den falschen nächsten Hop 10.0.0.3 (das ist keine Router-Adresse). Auf 10.0.0.2 ändern.
2. Router Filiale: Standardroute 0.0.0.0/0 über den nächsten Hop 10.0.0.1 eintragen — damit findet die Antwort zurück in die Zentrale.

**Tipps:**

1. Sende PC1 → Server Filiale: Das Ping-Protokoll zeigt die Routingtabelle von Router Zentrale. Passt der eingetragene nächste Hop zu einer Adresse, die es im Verbindungsnetz wirklich gibt?
2. Der nächste Hop ist die Adresse der Schnittstelle des Nachbarrouters im gemeinsamen Netz (10.0.0.0/30). Router Filiale hat dort die Adresse 10.0.0.2.
3. Wenn die Anfrage ankommt, aber keine Antwort: Der Rückweg wird getrennt berechnet. Router Filiale braucht eine Route in das Netz der Zentrale — Routen gelten nur in eine Richtung.
4. Für die Filiale genügt eine Standardroute (Zielnetz 0.0.0.0, Maske /0) über Router Zentrale: Alles, was Router Filiale nicht direkt kennt, geht dorthin.

**Erklärung nach der Lösung:**

> Ein Router leitet ohne Zusatzwissen nur in Netze weiter, an denen er direkt angeschlossen ist. Alle anderen Netze müssen ihm bekannt gemacht werden: per statischer Route mit Zielnetz, Maske und nächstem Hop. Der nächste Hop ist ein Router im gemeinsamen Netz, der das Paket weiterreicht. Eine Standardroute (0.0.0.0/0) ist die Route „für alles andere“ — ideal für Außenstellen, die nur einen Weg zurück haben. Und die wichtigste Falle: Routen gelten nur in einer Richtung. Der Hinweg zur Filiale braucht einen Eintrag auf dem Router der Zentrale, die Antwort aber einen Eintrag auf dem Router der Filiale. Fehlt der, kommt die Anfrage an und die Antwort nie zurück.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Statische Route hin **und** zurück; Standardroute am Filial-Router. „Längster Präfix gewinnt“ prüfen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N06 · Gastnetz per VLAN trennen

*id:* `gastnetz-vlan` · *Stufe:* Mittel · Sonnenhof Apotheken KG: Büro und Gäste teilen sich einen Switch, aber nicht das Netz.

**Aufgabe (so sehen es Lernende):**

> In der Apotheke der Sonnenhof Apotheken KG gibt es nur einen Switch (Switch1), aber zwei Netze: das Büro-VLAN 10 (192.168.10.0/24) und das Gast-VLAN 30 (192.168.30.0/24) für das Kundennetz. Der Router hat je VLAN eine Schnittstelle mit eigenem Kabel zu einem Port im jeweiligen VLAN. Einige Ports sind falsch zugeordnet. Stelle die VLAN-Zuordnung laut Plan ein, sodass die Büro-Geräte und das Gast-Gerät ihren Router erreichen.

**Adressplan** — Büro-VLAN 10 mit 192.168.10.0/24, Gast-VLAN 30 mit 192.168.30.0/24. Alle Adressen sind schon eingetragen — was fehlt, ist die richtige VLAN-Zuordnung der Switch-Ports (Konfiguration von Switch1). Die Verbindung beider VLANs übernimmt der Router; Trunk-Ports gibt es in dieser Übung nicht, deshalb hat der Router zwei Kabel zum Switch.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 | VLAN 10 |
| PC2 | eth0 | 192.168.10.26 | /24 (255.255.255.0) | 192.168.10.1 | VLAN 10 |
| Server1 | eth0 | 192.168.10.30 | /24 (255.255.255.0) | 192.168.10.1 | VLAN 10 |
| Gast-Laptop | eth0 | 192.168.30.50 | /24 (255.255.255.0) | 192.168.30.1 | VLAN 30 |
| Router1 | eth0 (Büro) | 192.168.10.1 | /24 (255.255.255.0) | – | VLAN 10 |
| Router1 | eth1 (Gast) | 192.168.30.1 | /24 (255.255.255.0) | – | VLAN 30 |

**Soll: VLAN je Port von Switch1**

| Port | angeschlossen | VLAN |
| --- | --- | --- |
| Port 1 | PC1 | 10 |
| Port 2 | PC2 | 10 |
| Port 3 | Server1 | 10 |
| Port 4 | Router1 eth0 | 10 |
| Port 5 | Gast-Laptop | 30 |
| Port 6 | Router1 eth1 | 30 |

**Prüfaufträge:**

- PC1 → PC2 (Büro-VLAN)
- PC1 → Server1 (Büro-VLAN)
- PC1 → Router1 eth0 (Büro-Gateway)
- Gast-Laptop → Router1 eth1 (Gast-Gateway)

**Lösung (Schritte):**

1. Switch1 · Port 3 (Server1) auf VLAN 10 stellen (stand auf VLAN 20, das gibt es im Plan nicht).
2. Switch1 · Port 5 (Gast-Laptop) auf VLAN 30 stellen (der Laptop saß im Büro-VLAN).
3. Switch1 · Port 6 (Router1 eth1) auf VLAN 30 stellen (stand noch im Standard-VLAN 1).

**Tipps:**

1. Sende PC1 → Server1. Die Meldung nennt VLAN und Port der beiden Geräte: Beide hängen am selben Switch — in welchem VLAN?
2. Ein VLAN macht aus einem Switch mehrere getrennte Switches. Geräte, die miteinander (oder mit ihrem Gateway) sprechen sollen, müssen im selben VLAN liegen.
3. Der Gast-Laptop muss in VLAN 30 liegen, denn sein Gateway (Router1 eth1) hängt dort — und der Router-Port zu eth1 muss ebenfalls VLAN 30 haben.
4. Öffne die Konfiguration von Switch1: Dort steht je Port ein VLAN-Feld. Vergleiche mit der Tabelle „Soll“ im Adressplan.

**Erklärung nach der Lösung:**

> Ein VLAN (Virtual LAN) teilt einen physischen Switch in mehrere logische Switches: Jeder Access-Port gehört zu genau einem VLAN, und Broadcasts bleiben im eigenen VLAN. Geräte in verschiedenen VLANs können sich auch am selben Switch nicht direkt sehen — als hingen sie an getrennten Geräten. So trennt man Büro und Gästenetz, ohne mehrere Switches zu kaufen. Die Verbindung zwischen VLANs übernimmt ein Router (Schicht 3): Er braucht je VLAN eine Schnittstelle in diesem VLAN. In der Praxis spart man sich die vielen Kabel mit einem Trunk-Port, der mehrere VLANs getaggt über ein Kabel führt (Router „on a stick“ mit Subinterfaces) — das wird hier bewusst nicht simuliert. Beachte: Der Router verbindet Büro und Gast grundsätzlich; wer das nicht will, braucht zusätzlich eine Firewall (nächstes Szenario).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ VLANs als reine Access-Ports; Router mit je einer Schnittstelle/einem Kabel je VLAN (kein Trunk, keine Subinterfaces) — Vereinfachung, in den Texten erwähnt.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N07 · Zugriff auf ein Partnernetz mit NAT

*id:* `nat-partnernetz` · *Stufe:* Mittel · Nordlicht Logistik AG: Der Partner kennt unser Netz nicht — der Router ersetzt die Quelladresse.

**Aufgabe (so sehen es Lernende):**

> Die Nordlicht Logistik AG (Büro-Netz 192.168.10.0/24) soll auf den Server ihres Partners zugreifen. Der Partner stellt das Netz 172.16.50.0/24 bereit; der Partner-Server hat die Adresse 172.16.50.20, kennt unser Büro-Netz nicht und darf nicht verändert werden. Richte Router1 ein: die Schnittstelle zum Partnernetz (172.16.50.1/24), das Gateway für PC2 und die Quelladressumsetzung (NAT) nach außen.

**Adressplan** — Büro-Netz 192.168.10.0/24, Partnernetz 172.16.50.0/24. Der Partner-Server (172.16.50.20, ohne Gateway) gehört dem Partner und ist gesperrt: Du kannst dort nichts ändern und musst ohne Route zurück in unser Büro auskommen.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 |  |
| PC2 | eth0 | 192.168.10.26 | /24 (255.255.255.0) | 192.168.10.1 |  |
| Router1 | eth0 (Büro) | 192.168.10.1 | /24 (255.255.255.0) | – |  |
| Router1 | eth1 (zum Partner) | 172.16.50.1 | /24 (255.255.255.0) | – | NAT nach außen |
| Partner-Server | eth0 | 172.16.50.20 | /24 (255.255.255.0) | – | gesperrt |

**Prüfaufträge:**

- PC1 → PC2 (Kontrolle im Büro)
- PC1 → Partner-Server
- PC2 → Partner-Server

**Lösung (Schritte):**

1. Router1 · eth1: IP 172.16.50.1, Maske /24 eintragen (Anschluss zum Partnernetz).
2. Router1 · eth1: NAT nach außen einschalten.
3. Gateway 192.168.10.1 bei PC2 eintragen.

**Tipps:**

1. Sende PC1 → Partner-Server und lies, an welchem Gerät der Ping abbricht. Ein Router leitet nur in Netze weiter, an denen er mit einer konfigurierten Schnittstelle hängt.
2. Wenn die Anfrage beim Partner-Server ankommt, aber keine Antwort zurückkommt: Der Partner-Server kennt das Netz 192.168.10.0/24 nicht und hat kein Gateway.
3. Mit NAT ersetzt Router1 die Quelladresse durch seine eigene Adresse im Partnernetz (172.16.50.1). Der Partner-Server antwortet dann an eine Adresse in seinem eigenen Netz.
4. Schalte NAT an der Schnittstelle ein, die nach außen zeigt (eth1). PC2 hat außerdem noch kein Gateway eingetragen.

**Erklärung nach der Lösung:**

> NAT (Network Address Translation) ersetzt auf dem Weg nach außen die Quelladresse eines Pakets durch die Adresse des Routers. Der Partner-Server sieht deshalb keinen Absender 192.168.10.25, sondern 172.16.50.1 — eine Adresse aus seinem eigenen Netz, die er ohne Gateway direkt erreichen kann. Der Router merkt sich in seiner NAT-Tabelle, wer die Anfrage gestellt hat, und übersetzt die Antwort zurück an PC1 oder PC2. So kommen interne Netze ohne Route auf der Gegenseite ans Ziel (und viele Geräte teilen sich eine öffentliche Adresse — in der Praxis zusätzlich mit Ports unterschieden, hier vereinfacht ohne Ports). NAT ersetzt keine Firewall: Von außen kommt nichts Neues herein, aber das ist ein Nebeneffekt, kein Schutzkonzept.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ NAT vereinfacht (Quelladresse wird durch Schnittstellenadresse ersetzt, ohne Ports). Erklärung der Rückweg-Falle ohne NAT prüfen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

## Schwer (2)

### N08 · Büro, Server und Gäste mit Firewall

*id:* `server-vlan-firewall` · *Stufe:* Schwer · Rheinwerk Maschinen GmbH: Drei VLANs, ein Router mit drei Schnittstellen und eine Firewall.

**Aufgabe (so sehen es Lernende):**

> Bei der Rheinwerk Maschinen GmbH hängen Büro-PCs (VLAN 10, 192.168.10.0/24), der Server (VLAN 20, 192.168.20.0/24) und das Gäste-WLAN (VLAN 30, 192.168.30.0/24) an einem Switch. Router1 verbindet die drei VLANs mit je einer Schnittstelle. Die Büro-PCs sollen auf den Server zugreifen, Gäste nur ihr Gateway erreichen — weder Server noch Büro. Ein paar Ports sind falsch zugeordnet, ein Gateway ist falsch, und eine Firewall-Regel erlaubt den Gästen den Zugriff auf den Server. Behebe alles.

**Adressplan** — Drei VLANs, drei Netze, ein Router mit drei Schnittstellen und je einem Kabel zu einem Port im passenden VLAN (keine Trunks). Die Firewall von Router1 soll nur das Nötige erlauben: Büro → Server. Alles andere, was zwischen den Netzen neu aufgebaut wird, bleibt gesperrt.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC1 | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 | VLAN 10 |
| PC2 | eth0 | 192.168.10.26 | /24 (255.255.255.0) | 192.168.10.1 | VLAN 10 |
| Server1 | eth0 | 192.168.20.10 | /24 (255.255.255.0) | 192.168.20.1 | VLAN 20 |
| Gast-Laptop | eth0 | 192.168.30.50 | /24 (255.255.255.0) | 192.168.30.1 | VLAN 30 |
| Router1 | eth0 (Büro) | 192.168.10.1 | /24 (255.255.255.0) | – | VLAN 10 |
| Router1 | eth1 (Server) | 192.168.20.1 | /24 (255.255.255.0) | – | VLAN 20 |
| Router1 | eth2 (Gäste) | 192.168.30.1 | /24 (255.255.255.0) | – | VLAN 30 |

**Soll: VLAN je Port von Switch1**

| Port | angeschlossen | VLAN |
| --- | --- | --- |
| Port 1 | PC1 | 10 |
| Port 2 | PC2 | 10 |
| Port 3 | Server1 | 20 |
| Port 4 | Gast-Laptop | 30 |
| Port 5 | Router1 eth0 | 10 |
| Port 6 | Router1 eth1 | 20 |
| Port 7 | Router1 eth2 | 30 |

**Soll: Firewall von Router1**

| Reihenfolge | Aktion | Von | Nach |
| --- | --- | --- | --- |
| 1 | erlauben | 192.168.10.0/24 (Büro) | 192.168.20.0/24 (Server) |
| Standard | blockieren | alle übrigen Anfragen | — |

**Prüfaufträge:**

- PC1 → Server1 (soll funktionieren)
- PC2 → Server1 (soll funktionieren)
- Gast-Laptop → Router1 eth2 (Gast-Gateway, soll funktionieren)
- Gast-Laptop → Server1 (soll von der Firewall blockiert werden) — **soll blockiert werden**
- Gast-Laptop → PC1 (soll von der Firewall blockiert werden) — **soll blockiert werden**

**Lösung (Schritte):**

1. Switch1 · Port 3 (Server1) auf VLAN 20 stellen (stand im Standard-VLAN 1).
2. Switch1 · Port 7 (Router1 eth2) auf VLAN 30 stellen (stand auf VLAN 10).
3. PC2: Gateway 192.168.10.1 eintragen (stand auf 192.168.10.254).
4. Router1 · Firewall: Die Regel „erlauben 192.168.30.0/24 → 192.168.20.0/24“ löschen. Es bleibt: erlauben 192.168.10.0/24 → 192.168.20.0/24, Standardaktion blockieren.

**Tipps:**

1. Gehe der Reihe nach vor: Teste jeden Prüfauftrag. Bei VLAN-Fehlern nennt die Meldung die beiden Ports und ihre VLANs — vergleiche mit der Tabelle „Soll“.
2. PC2 erreicht nicht einmal sein Gateway: Prüfe, ob die eingetragene Gateway-Adresse genau der Router-Schnittstelle in seinem Netz entspricht.
3. Regeln der Firewall werden von oben nach unten geprüft, die erste passende gilt. Welche Regel lässt Pakete aus dem Gast-Netz (192.168.30.0/24) zum Server (192.168.20.0/24) durch?
4. Mit der Standardaktion „blockieren“ ist alles gesperrt, was keine Regel erlaubt. Antworten auf erlaubte Anfragen kommen automatisch zurück — dafür brauchst du keine Gegenregel. Pakete an den Router selbst (Gateway-Ping) filtert die Firewall nicht.

**Erklärung nach der Lösung:**

> Drei Maßnahmen arbeiten zusammen: VLANs trennen die Broadcast-Domänen auf Schicht 2, ein Router mit je einer Schnittstelle pro VLAN verbindet sie wieder auf Schicht 3 — und eine Firewall am Router entscheidet, welche Verbindungen zwischen den Netzen erlaubt sind. Ihre Regeln werden von oben nach unten geprüft, die erste passende gilt, sonst greift die Standardaktion. „Standard: blockieren“ ist das sichere Prinzip: Es ist nur erlaubt, was ausdrücklich freigegeben wurde. Die Firewall arbeitet zustandsbehaftet: Antworten auf erlaubte Anfragen passieren automatisch, deshalb genügt die Regel Büro → Server. Pakete an den Router selbst (Gateway) sind hier nicht gefiltert, in der Praxis steuert man das gesondert. Eine falsche Regel („Gast → Server erlauben“) hebelt die Trennung der Netze aus, auch wenn alle VLANs stimmen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Firewall: Regelliste von oben nach unten, Standard „blockieren“, zustandsbehaftet (Antworten passieren), Pakete an den Router selbst ungefiltert. Prüfaufträge „soll blockiert sein“ (Gast → Server, Gast → PC).

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---

### N09 · Drei Standorte, drei Router

*id:* `drei-standorte-routing` · *Stufe:* Schwer · Nordlicht Logistik AG: Zentrale und zwei Lager, Routing-Schleife und fehlende Rückroute.

**Aufgabe (so sehen es Lernende):**

> Die Nordlicht Logistik AG verbindet ihre Zentrale (192.168.10.0/24) mit zwei Lagern: Süd (192.168.20.0/24) und Ost (192.168.30.0/24). Router Zentrale hat drei Schnittstellen und ist über je ein /30-Netz (10.0.1.0/30 nach Süd, 10.0.2.0/30 nach Ost) mit den Lager-Routern verbunden. Die Lager sollen auch untereinander über die Zentrale sprechen. Zurzeit kreisen Pakete im Netz, ein Kabel fehlt, und auf einem Router fehlt die Route zurück. Finde alle Fehler.

**Adressplan** — Fünf Netze: Zentrale 192.168.10.0/24, Lager Süd 192.168.20.0/24, Lager Ost 192.168.30.0/24 und die zwei Verbindungsnetze 10.0.1.0/30 und 10.0.2.0/30. Alle Adressen sind richtig eingetragen; es geht um Kabel und Routen. Die Lager-Router sollen eine Standardroute zur Zentrale bekommen, die Zentrale je eine Route in jedes Lager.

| Gerät | Schnittstelle | IP-Adresse | Subnetzmaske | Gateway | Zusatz |
| --- | --- | --- | --- | --- | --- |
| PC Zentrale | eth0 | 192.168.10.25 | /24 (255.255.255.0) | 192.168.10.1 |  |
| PC Süd | eth0 | 192.168.20.25 | /24 (255.255.255.0) | 192.168.20.1 |  |
| Server Ost | eth0 | 192.168.30.10 | /24 (255.255.255.0) | 192.168.30.1 |  |
| Router Zentrale | eth0 (Zentrale) | 192.168.10.1 | /24 (255.255.255.0) | – |  |
| Router Zentrale | eth1 (nach Süd) | 10.0.1.1 | /30 (255.255.255.252) | – |  |
| Router Zentrale | eth2 (nach Ost) | 10.0.2.1 | /30 (255.255.255.252) | – |  |
| Router Süd | eth0 (nach Zentrale) | 10.0.1.2 | /30 (255.255.255.252) | – |  |
| Router Süd | eth1 (Lager Süd) | 192.168.20.1 | /24 (255.255.255.0) | – |  |
| Router Ost | eth0 (nach Zentrale) | 10.0.2.2 | /30 (255.255.255.252) | – |  |
| Router Ost | eth1 (Lager Ost) | 192.168.30.1 | /24 (255.255.255.0) | – |  |

**Soll: statische Routen**

| Router | Zielnetz | Maske | Nächster Hop |
| --- | --- | --- | --- |
| Router Zentrale | 192.168.20.0 | /24 | 10.0.1.2 (Router Süd) |
| Router Zentrale | 192.168.30.0 | /24 | 10.0.2.2 (Router Ost) |
| Router Süd | 0.0.0.0 (Standardroute) | /0 | 10.0.1.1 (Router Zentrale) |
| Router Ost | 0.0.0.0 (Standardroute) | /0 | 10.0.2.1 (Router Zentrale) |

**Prüfaufträge:**

- PC Zentrale → PC Süd
- PC Zentrale → Server Ost
- PC Süd → Server Ost (über die Zentrale)
- Server Ost → PC Zentrale (Gegenrichtung)

**Lösung (Schritte):**

1. Router Zentrale: Die Route zu 192.168.30.0/24 zeigt auf 10.0.1.2 (Router Süd) und erzeugt mit der Standardroute von Router Süd eine Schleife. Nächsten Hop auf 10.0.2.2 (Router Ost) ändern.
2. Kabel zwischen Router Zentrale · eth2 und Router Ost · eth0 stecken (die Verbindung nach Ost war nicht gesteckt).
3. Router Ost: Standardroute 0.0.0.0/0 über den nächsten Hop 10.0.2.1 eintragen — für den Rückweg.

**Tipps:**

1. Teste „PC Zentrale → Server Ost“ und lies den Weg der Router. Taucht ein Router zweimal auf, ist das eine Routing-Schleife: Die Routen zeigen aufeinander statt zum Ziel.
2. Welcher nächste Hop gehört zum Netz 192.168.30.0/24? Das Lager Ost liegt hinter Router Ost (10.0.2.2) — nicht hinter Router Süd.
3. Nach der Korrektur meldet die Simulation vielleicht ein fehlendes Kabel an Router Zentrale (eth2). Die Verbindung nach Ost muss physisch gesteckt sein.
4. Kommt die Anfrage in Ost an, aber keine Antwort zurück, fehlt Router Ost die Route in die Netze von Zentrale und Süd. Eine Standardroute über Router Zentrale (10.0.2.1) reicht.

**Erklärung nach der Lösung:**

> In einem Sternnetz mit der Zentrale in der Mitte genügt es, wenn die Lager-Router eine Standardroute zur Zentrale haben („schick alles, was du nicht kennst, nach Hause“) und die Zentrale für jedes Lager eine eigene Route. Ein falscher nächster Hop erzeugt leicht eine Routing-Schleife: Router Zentrale schickt Pakete für Ost nach Süd, Router Süd schickt sie mit seiner Standardroute zurück — endlos, bis in einem echten Netz die TTL (Time to Live) abläuft und das Paket verworfen wird. Die Simulation erkennt die Schleife und bricht ab. Und wieder gilt: Jede Richtung braucht ihre eigenen Routen. Ein Router Ost ohne Weg zurück beantwortet jede Anfrage ins Leere.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Fehlerfolge: Routing-Schleife → fehlendes Kabel → fehlende Rückroute. Schleifenerkennung/TTL-Erklärung prüfen.

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

---
