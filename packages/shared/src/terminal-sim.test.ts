import { describe, expect, it } from "vitest";
import {
  TERMINAL_SZENARIEN,
  terminalAusfuehren,
  terminalErreichbarkeit,
  terminalLoeseNamenAuf,
  terminalPrompt,
  terminalStartZustand,
  terminalZerlegeEingabe,
  type TerminalErgebnis,
  type TerminalSzenario,
  type TerminalZustand,
} from "./terminal-sim";

const szenario = (id: string): TerminalSzenario => TERMINAL_SZENARIEN.find((eintrag) => eintrag.id === id)!;

/** Führt Eingaben nacheinander aus und liefert alle Ergebnisse (der Zustand wird weitergereicht). */
function lauf(s: TerminalSzenario, eingaben: string[], start: TerminalZustand = terminalStartZustand(s)): TerminalErgebnis[] {
  const ergebnisse: TerminalErgebnis[] = [];
  let zustand = start;
  for (const eingabe of eingaben) {
    const ergebnis = terminalAusfuehren(s, zustand, eingabe);
    ergebnisse.push(ergebnis);
    zustand = ergebnis.zustand;
  }
  return ergebnisse;
}

/** Ausgabe der letzten Eingabe als ein Text. */
function letzte(s: TerminalSzenario, eingaben: string[]): string {
  return lauf(s, eingaben).at(-1)!.ausgabe.join("\n");
}

const woerter = (text: string) => {
  const ergebnis = terminalZerlegeEingabe(text);
  if (!ergebnis.ok) throw new Error(ergebnis.fehler);
  return ergebnis.woerter.map((w) => w.text);
};

describe("Szenarien: Aufbau", () => {
  it("gibt es drei Szenarien mit eindeutigen Kennungen und je drei Tipps", () => {
    expect(TERMINAL_SZENARIEN.map((s) => s.id)).toEqual(["webseite", "internet", "dns"]);
    for (const s of TERMINAL_SZENARIEN) {
      expect(s.tipps).toHaveLength(3);
      expect(s.loesungsweg.some((schritt) => schritt.loest)).toBe(true);
      expect(s.erklaerung.length).toBeGreaterThan(50);
    }
  });

  it("ist das Ziel zu Beginn nirgends erfüllt", () => {
    for (const s of TERMINAL_SZENARIEN) expect(s.ziel(terminalStartZustand(s))).toBe(false);
  });

  it("liefert den Startzustand als unabhängige Kopie", () => {
    const s = szenario("webseite");
    const kopie = terminalStartZustand(s);
    kopie.dienste.nginx!.status = "aktiv";
    expect(s.startZustand.dienste.nginx!.status).toBe("fehlgeschlagen");
  });
});

describe("Szenarien: Lösungswege", () => {
  for (const s of TERMINAL_SZENARIEN) {
    it(`${s.id}: der dokumentierte Lösungsweg erreicht das Ziel — erst mit dem letzten nötigen Schritt`, () => {
      const befehle = s.loesungsweg.map((schritt) => schritt.befehl);
      const ergebnisse = lauf(s, befehle);
      const loeseIndex = s.loesungsweg.findIndex((schritt) => schritt.loest);
      ergebnisse.forEach((ergebnis, index) => {
        expect(ergebnis.geloest, `Schritt ${index + 1}: ${befehle[index]}`).toBe(index >= loeseIndex);
      });
    });

    it(`${s.id}: der Lösungsweg ohne die optionalen Schritte genügt`, () => {
      const befehle = s.loesungsweg.filter((schritt) => !schritt.optional).map((schritt) => schritt.befehl);
      expect(lauf(s, befehle).at(-1)!.geloest).toBe(true);
    });

    it(`${s.id}: die Eingaben des Lösungswegs melden keine Fehler und kein "command not found"`, () => {
      for (const ergebnis of lauf(s, s.loesungsweg.map((schritt) => schritt.befehl))) {
        const text = ergebnis.ausgabe.join("\n");
        expect(text).not.toMatch(/command not found|Permission denied|not permitted|Simulation:/);
      }
    });

    it(`${s.id}: Fehlbefehle und unbekannte Befehle verändern den Zustand nicht`, () => {
      const start = terminalStartZustand(s);
      const ergebnis = lauf(s, ["blubb --xyz", "systemctl stop gibtsnicht", "cat /nicht/da", "ls /nirgends", "ip route add default via"], start);
      for (const e of ergebnis) {
        expect(e.geloest).toBe(false);
        expect({ ...e.zustand, sekunden: 0 }).toEqual({ ...start, sekunden: 0 });
      }
    });
  }

  it("ändert terminalAusfuehren den übergebenen Zustand nicht", () => {
    const s = szenario("webseite");
    const start = terminalStartZustand(s);
    const vorher = JSON.stringify(start);
    terminalAusfuehren(s, start, "sudo systemctl stop apache2");
    expect(JSON.stringify(start)).toBe(vorher);
  });

  it("ist das Zurücksetzen ein frischer Startzustand: gleiche Eingabe, gleiche Ausgabe", () => {
    const s = szenario("webseite");
    const erster = lauf(s, ["sudo systemctl stop apache2", "sudo systemctl start nginx"]);
    expect(erster.at(-1)!.geloest).toBe(true);
    const nachReset = terminalAusfuehren(s, terminalStartZustand(s), "systemctl status nginx");
    expect(nachReset.geloest).toBe(false);
    expect(nachReset.ausgabe.join("\n")).toContain("failed");
  });
});

describe("Szenario 'Webseite nicht erreichbar'", () => {
  const s = szenario("webseite");

  it("liefert curl zu Beginn die Apache-Standardseite", () => {
    expect(letzte(s, ["curl localhost"])).toContain("Apache2 Debian Default Page");
  });

  it("zeigt systemctl status nginx als failed", () => {
    const text = letzte(s, ["systemctl status nginx"]);
    expect(text).toContain("× nginx.service");
    expect(text).toContain("Active: failed (Result: exit-code)");
  });

  it("nennt im Journal die Ursache (Port belegt)", () => {
    expect(letzte(s, ["journalctl -u nginx"])).toContain("bind() to 0.0.0.0:80 failed (98: Address already in use)");
    expect(letzte(s, ["journalctl -xeu nginx"])).toContain("Address already in use");
  });

  it("zeigt ss -tlnp die Prozesse nur mit sudo", () => {
    const ohne = letzte(s, ["ss -tlnp"]);
    expect(ohne).toMatch(/State\s+Recv-Q\s+Send-Q\s+Local Address:Port\s+Peer Address:Port\s+Process/);
    expect(ohne).toContain("*:80");
    expect(ohne).not.toContain("apache2");
    const mit = letzte(s, ["sudo ss -tlnp"]);
    expect(mit).toContain('users:(("apache2",pid=812,fd=4))');
    expect(mit).toContain('users:(("sshd",pid=611');
  });

  it("scheitert das Starten von nginx, solange apache2 Port 80 belegt, und protokolliert das", () => {
    const ergebnisse = lauf(s, ["sudo systemctl start nginx", "journalctl -u nginx -n 4"]);
    expect(ergebnisse[0]!.ausgabe.join("\n")).toContain("Job for nginx.service failed");
    expect(ergebnisse[0]!.geloest).toBe(false);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("Failed to start nginx.service");
  });

  it("verlangt für verändernde Befehle sudo", () => {
    const ergebnisse = lauf(s, ["systemctl stop apache2", "systemctl start nginx", "systemctl disable apache2"]);
    expect(ergebnisse[0]!.ausgabe.join("\n")).toContain("Failed to stop apache2.service: Interactive authentication required.");
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("Interactive authentication required");
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("Failed to disable unit: Interactive authentication required.");
    expect(ergebnisse[2]!.zustand.dienste.apache2!.aktiviert).toBe(true);
    expect(ergebnisse[0]!.zustand.dienste.apache2!.status).toBe("aktiv");
  });

  it("liefert curl nach der Lösung die Firmenseite", () => {
    const ergebnisse = lauf(s, ["sudo systemctl stop apache2", "curl localhost", "sudo systemctl start nginx", "curl localhost"]);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("Couldn't connect to server");
    expect(ergebnisse[3]!.ausgabe.join("\n")).toContain("Willkommen bei Hartmann Metallbau");
  });

  it("löst auch 'restart nginx' nach dem Stoppen von apache2 das Problem", () => {
    expect(lauf(s, ["sudo systemctl stop apache2", "sudo systemctl restart nginx"]).at(-1)!.geloest).toBe(true);
    expect(lauf(s, ["sudo service apache2 stop", "sudo service nginx start"]).at(-1)!.geloest).toBe(true);
  });

  it("zählt nur das Deaktivieren von apache2 oder nur das Stoppen von nginx nicht als Lösung", () => {
    expect(lauf(s, ["sudo systemctl disable apache2"]).at(-1)!.geloest).toBe(false);
    expect(lauf(s, ["sudo systemctl stop apache2"]).at(-1)!.geloest).toBe(false);
    expect(lauf(s, ["sudo systemctl stop apache2", "sudo systemctl start nginx", "sudo systemctl stop nginx"]).at(-1)!.geloest).toBe(false);
  });

  it("meldet systemctl status nach der Lösung nginx als active (running)", () => {
    expect(letzte(s, ["sudo systemctl stop apache2", "sudo systemctl start nginx", "systemctl status nginx"])).toContain("Active: active (running)");
    expect(letzte(s, ["sudo systemctl stop apache2", "systemctl status apache2"])).toContain("Active: inactive (dead)");
  });

  it("kennt is-active, is-enabled und unbekannte Dienste", () => {
    expect(letzte(s, ["systemctl is-active nginx"])).toBe("failed");
    expect(letzte(s, ["systemctl is-enabled apache2"])).toBe("enabled");
    expect(letzte(s, ["systemctl status gibtsnicht"])).toContain("Unit gibtsnicht.service could not be found.");
    expect(letzte(s, ["sudo systemctl start gibtsnicht"])).toContain("Unit gibtsnicht.service not found.");
  });
});

describe("Szenario 'Kein Zugriff aufs Internet'", () => {
  const s = szenario("internet");

  it("zeigt ip addr die korrekte Adresse samt Broadcast", () => {
    const text = letzte(s, ["ip addr"]);
    expect(text).toContain("inet 192.168.10.25/24 brd 192.168.10.255 scope global enp0s3");
    expect(letzte(s, ["ip a"])).toBe(text);
  });

  it("erreicht das Gateway, das Internet aber nicht", () => {
    const gateway = letzte(s, ["ping -c 3 192.168.10.1"]);
    expect(gateway).toContain("64 bytes from 192.168.10.1: icmp_seq=3 ttl=64");
    expect(gateway).toContain("3 packets transmitted, 3 received, 0% packet loss");
    expect(gateway).toMatch(/rtt min\/avg\/max\/mdev = \d+\.\d{3}\/\d+\.\d{3}\/\d+\.\d{3}\/\d+\.\d{3} ms/);
    expect(letzte(s, ["ping 8.8.8.8"])).toBe("ping: connect: Network is unreachable");
  });

  it("zeigt ip route ohne Default-Route", () => {
    const text = letzte(s, ["ip route"]);
    expect(text).toBe("192.168.10.0/24 dev enp0s3 proto kernel scope link src 192.168.10.25");
    expect(letzte(s, ["ip route show"])).toBe(text);
  });

  it("verlangt für ip route add sudo", () => {
    const ergebnis = lauf(s, ["ip route add default via 192.168.10.1"])[0]!;
    expect(ergebnis.ausgabe.join("\n")).toBe("RTNETLINK answers: Operation not permitted");
    expect(ergebnis.zustand.standardroute).toBeNull();
  });

  it("zeigt nach dem Setzen die Default-Route und erreicht das Internet", () => {
    const ergebnisse = lauf(s, ["sudo ip route add default via 192.168.10.1", "ip route", "ping -c 2 8.8.8.8"]);
    expect(ergebnisse[0]!.ausgabe).toEqual([]);
    expect(ergebnisse[1]!.ausgabe[0]).toBe("default via 192.168.10.1 dev enp0s3");
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("2 packets transmitted, 2 received, 0% packet loss");
    expect(ergebnisse[2]!.geloest).toBe(true);
  });

  it("prüft die Route: falsches Gateway, doppelter Eintrag, ungültige Adresse", () => {
    expect(letzte(s, ["sudo ip route add default via 10.9.9.9"])).toBe("Error: Nexthop has invalid gateway.");
    expect(letzte(s, ["sudo ip route add default via abc"])).toBe('Error: inet address is expected rather than "abc".');
    expect(letzte(s, ["sudo ip route add default via 192.168.10.1", "sudo ip route add default via 192.168.10.1"])).toBe("RTNETLINK answers: File exists");
    expect(letzte(s, ["sudo ip route del default"])).toBe("RTNETLINK answers: No such process");
  });

  it("löst ein Gateway, das es nicht gibt, das Problem nicht", () => {
    const ergebnisse = lauf(s, ["sudo ip route add default via 192.168.10.77", "ping -c 2 8.8.8.8"]);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("From 192.168.10.25 icmp_seq=1 Destination Host Unreachable");
    expect(ergebnisse[1]!.geloest).toBe(false);
  });

  it("entfernt die Default-Route mit ip route del default wieder", () => {
    const ergebnisse = lauf(s, ["sudo ip route add default via 192.168.10.1", "sudo ip route del default", "ping -c 1 8.8.8.8"]);
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("Network is unreachable");
    expect(ergebnisse[2]!.geloest).toBe(false);
  });

  it("meldet bei einem Ziel ohne Antwort 100% packet loss", () => {
    const text = letzte(s, ["sudo ip route add default via 192.168.10.1", "ping -c 2 203.0.113.9"]);
    expect(text).toContain("2 packets transmitted, 0 received, 100% packet loss");
  });
});

describe("Szenario 'Name wird nicht aufgelöst'", () => {
  const s = szenario("dns");

  it("erreicht 8.8.8.8, aber nicht example.com", () => {
    expect(letzte(s, ["ping -c 1 8.8.8.8"])).toContain("1 packets transmitted, 1 received");
    expect(letzte(s, ["ping example.com"])).toBe("ping: example.com: Temporary failure in name resolution");
  });

  it("zeigt resolv.conf mit dem falschen Server und nslookup einen Timeout", () => {
    expect(letzte(s, ["cat /etc/resolv.conf"])).toContain("nameserver 192.168.10.254");
    const text = letzte(s, ["nslookup example.com"]);
    expect(text).toContain(";; communications error to 192.168.10.254#53: timed out");
    expect(text).toContain(";; no servers could be reached");
    expect(letzte(s, ["ping -c 1 192.168.10.254"])).toContain("Destination Host Unreachable");
  });

  it("scheitert das Schreiben nach /etc/resolv.conf ohne sudo und bei Umleitung mit sudo echo", () => {
    const ohne = lauf(s, ['echo "nameserver 192.168.10.1" | tee /etc/resolv.conf'])[0]!;
    expect(ohne.ausgabe.join("\n")).toContain("tee: /etc/resolv.conf: Permission denied");
    expect(ohne.zustand.dateien["/etc/resolv.conf"]).toContain("192.168.10.254");
    const umleitung = lauf(s, ['sudo echo "nameserver 192.168.10.1" > /etc/resolv.conf'])[0]!;
    expect(umleitung.ausgabe).toEqual(["bash: /etc/resolv.conf: Permission denied"]);
    expect(umleitung.geloest).toBe(false);
  });

  it("löst echo | sudo tee das Problem und tee zeigt den Text an", () => {
    const ergebnisse = lauf(s, ['echo "nameserver 192.168.10.1" | sudo tee /etc/resolv.conf', "cat /etc/resolv.conf", "ping -c 2 example.com", "nslookup example.com"]);
    expect(ergebnisse[0]!.ausgabe).toEqual(["nameserver 192.168.10.1"]);
    expect(ergebnisse[0]!.geloest).toBe(true);
    expect(ergebnisse[1]!.ausgabe).toEqual(["nameserver 192.168.10.1"]);
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("PING example.com (93.184.216.34)");
    expect(ergebnisse[3]!.ausgabe.join("\n")).toContain("Address: 93.184.216.34");
  });

  it("akzeptiert auch 8.8.8.8 als Nameserver und hängt mit tee -a an", () => {
    expect(lauf(s, ["echo 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf"]).at(-1)!.geloest).toBe(true);
    const angehaengt = lauf(s, ["echo 'nameserver 192.168.10.1' | sudo tee -a /etc/resolv.conf"]).at(-1)!;
    expect(angehaengt.zustand.dateien["/etc/resolv.conf"]).toContain("192.168.10.254\nnameserver 192.168.10.1");
    expect(angehaengt.geloest).toBe(true);
  });

  it("kennt unbekannte Namen bei funktionierendem DNS", () => {
    expect(letzte(s, ["echo 'nameserver 192.168.10.1' | sudo tee /etc/resolv.conf", "ping -c 1 gibtes.nicht"])).toBe("ping: gibtes.nicht: Name or service not known");
    expect(letzte(s, ["echo 'nameserver 192.168.10.1' | sudo tee /etc/resolv.conf", "nslookup gibtes.nicht"])).toContain("NXDOMAIN");
  });

  it("löst curl mit Namen erst nach der Reparatur auf", () => {
    expect(letzte(s, ["curl example.com"])).toBe("curl: (6) Could not resolve host: example.com");
    expect(letzte(s, ["echo 'nameserver 192.168.10.1' | sudo tee /etc/resolv.conf", "curl example.com"])).toContain("Example Domain");
  });

  it("zeigt terminalLoeseNamenAuf und terminalErreichbarkeit die Zwischenschritte", () => {
    const z = terminalStartZustand(s);
    expect(terminalLoeseNamenAuf(z, "example.com")).toEqual({ ok: false, grund: "dns-ausfall" });
    expect(terminalLoeseNamenAuf(z, "localhost")).toMatchObject({ ok: true, ip: "127.0.0.1" });
    expect(terminalLoeseNamenAuf(z, "pc-versand-03")).toMatchObject({ ok: true, ip: "127.0.1.1" });
    expect(terminalErreichbarkeit(z, "8.8.8.8")).toBe("internet");
    expect(terminalErreichbarkeit(z, "192.168.10.1")).toBe("lan");
    expect(terminalErreichbarkeit(z, "192.168.10.254")).toBe("host-nicht-erreichbar");
    expect(terminalErreichbarkeit(z, "192.168.10.31")).toBe("lokal");
    expect(terminalErreichbarkeit(z, "203.0.113.9")).toBe("zeitueberschreitung");
  });
});

describe("Unbekannte und nicht simulierte Befehle", () => {
  const s = szenario("webseite");

  it("meldet 'command not found' für unbekannte Befehle", () => {
    expect(letzte(s, ["blubb"])).toBe("bash: blubb: command not found");
    expect(letzte(s, ["sudo blubb"])).toBe("sudo: blubb: command not found");
    expect(letzte(s, ["rm -rf /"])).toContain("bash: rm: command not found");
  });

  it("verweist bei netstat und ifconfig auf den modernen Ersatz", () => {
    expect(letzte(s, ["netstat -tlnp"])).toContain("Moderner Ersatz: ss -tlnp");
    expect(letzte(s, ["ifconfig"])).toContain("ip addr");
  });

  it("verhindert sudo cd und unbekannte sudo-Optionen", () => {
    expect(letzte(s, ["sudo cd /etc"])).toBe("sudo: cd: command not found");
    expect(letzte(s, ["sudo -i"])).toContain("nicht unterstützt");
    expect(lauf(s, ["sudo"])[0]!.ausgabe[0]).toContain("usage: sudo");
  });

  it("ignoriert leere Eingaben und lässt die Zeit dabei stehen", () => {
    const start = terminalStartZustand(s);
    const e = terminalAusfuehren(s, start, "   ");
    expect(e.ausgabe).toEqual([]);
    expect(e.zustand.sekunden).toBe(start.sekunden);
  });

  it("meldet Syntaxfehler und nicht erlaubte Shell-Funktionen, ohne etwas auszuführen", () => {
    expect(letzte(s, ["echo 'offen"])).toContain("unexpected EOF");
    expect(letzte(s, ["| grep x"])).toBe("bash: syntax error near unexpected token `|'");
    expect(letzte(s, ["echo hallo >"])).toBe("bash: syntax error near unexpected token `newline'");
    expect(letzte(s, ["sleep 100 &"])).toContain("nicht unterstützt");
  });
});

describe("Grundbefehle", () => {
  const s = szenario("webseite");

  it("beherrscht pwd, whoami, hostname, cd und ls", () => {
    expect(letzte(s, ["pwd"])).toBe("/home/techniker");
    expect(letzte(s, ["whoami"])).toBe("techniker");
    expect(letzte(s, ["sudo whoami"])).toBe("root");
    expect(letzte(s, ["hostname"])).toBe("web01");
    expect(letzte(s, ["hostname -I"])).toBe("192.168.20.10 ");
    const ergebnisse = lauf(s, ["cd /etc/nginx", "pwd", "ls", "cd ..", "pwd", "cd", "pwd"]);
    expect(ergebnisse[1]!.ausgabe).toEqual(["/etc/nginx"]);
    expect(ergebnisse[2]!.ausgabe).toEqual(["sites-enabled"]);
    expect(ergebnisse[4]!.ausgabe).toEqual(["/etc"]);
    expect(ergebnisse[6]!.ausgabe).toEqual(["/home/techniker"]);
    expect(terminalPrompt(ergebnisse[0]!.zustand)).toBe("techniker@web01:/etc/nginx$");
    expect(terminalPrompt(terminalStartZustand(s))).toBe("techniker@web01:~$");
    expect(letzte(s, ["cd /var/www", "pwd"])).toBe("/var/www");
  });

  it("meldet Fehler bei cd, ls und cat", () => {
    expect(letzte(s, ["cd /gibts/nicht"])).toBe("bash: cd: /gibts/nicht: No such file or directory");
    expect(letzte(s, ["cd /etc/hostname"])).toBe("bash: cd: /etc/hostname: Not a directory");
    expect(letzte(s, ["ls /gibts/nicht"])).toBe("ls: cannot access '/gibts/nicht': No such file or directory");
    expect(letzte(s, ["cat /gibts/nicht"])).toBe("cat: /gibts/nicht: No such file or directory");
    expect(letzte(s, ["cat /etc"])).toBe("cat: /etc: Is a directory");
  });

  it("liest Dateien mit cat und zeigt ls -l", () => {
    expect(letzte(s, ["cat /etc/hostname"])).toBe("web01");
    expect(letzte(s, ["cat ticket.txt"])).toContain("Ticket HM-2041");
    expect(letzte(s, ["ls -l /etc/nginx/sites-enabled"])).toMatch(/total \d+\n-rw-r--r-- 1 root root\s+\d+ Oct {2}2 09:14 hartmann-metallbau\.conf/);
  });

  it("gibt echo Variablen und Anführungszeichen richtig aus", () => {
    expect(letzte(s, ["echo $USER@$HOSTNAME"])).toBe("techniker@web01");
    expect(letzte(s, ['echo "a   b"'])).toBe("a   b");
    expect(letzte(s, ["echo '$USER'"])).toBe("$USER");
  });

  it("filtert mit grep per Pipe und aus Dateien", () => {
    expect(letzte(s, ["journalctl -u nginx | grep emerg"]).split("\n")).toHaveLength(3);
    expect(letzte(s, ["cat /var/log/nginx/error.log | grep -c bind"])).toBe("3");
    expect(letzte(s, ["sudo ss -tlnp | grep :80"])).toContain("apache2");
    expect(letzte(s, ["grep -i LISTEN /etc/apache2/ports.conf"])).toBe("Listen 80");
    expect(letzte(s, ["cat /etc/hostname | grep -v web"])).toBe("");
  });

  it("schreibt Umleitungen nur im Heimatverzeichnis und verknüpft Befehle", () => {
    const ergebnisse = lauf(s, ["echo hallo > notiz.txt", "cat notiz.txt", "echo mehr >> notiz.txt", "cat notiz.txt", "echo x > /etc/test"]);
    expect(ergebnisse[1]!.ausgabe).toEqual(["hallo"]);
    expect(ergebnisse[3]!.ausgabe).toEqual(["hallo", "mehr"]);
    expect(ergebnisse[4]!.ausgabe).toEqual(["bash: /etc/test: Permission denied"]);
    expect(letzte(s, ["echo a && echo b; echo c"])).toBe("a\nb\nc");
    expect(letzte(s, ["cat /gibts/nicht && echo nie"])).toBe("cat: /gibts/nicht: No such file or directory");
    expect(letzte(s, ["cat /gibts/nicht || echo doch"])).toBe("cat: /gibts/nicht: No such file or directory\ndoch");
  });

  it("leert die Anzeige mit clear", () => {
    const ergebnis = lauf(s, ["echo vorher; clear; echo nachher"])[0]!;
    expect(ergebnis.leeren).toBe(true);
    expect(ergebnis.ausgabe).toEqual(["nachher"]);
    expect(lauf(s, ["pwd"])[0]!.leeren).toBe(false);
  });

  it("listet mit help die Befehle", () => {
    const text = letzte(s, ["help"]);
    for (const befehl of ["ping", "systemctl", "journalctl", "ss -tlnp", "curl", "sudo"]) expect(text).toContain(befehl);
  });

  it("lässt die Uhr nur bei Eingaben laufen und schreibt Zeitstempel ins Journal", () => {
    const ergebnisse = lauf(s, ["sudo systemctl stop apache2", "journalctl -u apache2 -n 2"]);
    expect(ergebnisse[1]!.ausgabe[0]).toMatch(/^Oct 06 09:14:\d\d web01 systemd\[1\]: Stopping apache2\.service/);
    expect(ergebnisse[1]!.ausgabe[1]).toMatch(/Stopped apache2\.service/);
  });
});

describe("Parser", () => {
  it("trennt Wörter an beliebig vielen Leerzeichen und Tabulatoren", () => {
    expect(woerter("  ping   -c  2\t8.8.8.8  ")).toEqual(["ping", "-c", "2", "8.8.8.8"]);
    expect(woerter("")).toEqual([]);
  });

  it("behandelt Anführungszeichen wie die Bash", () => {
    expect(woerter('echo "nameserver 192.168.10.1"')).toEqual(["echo", "nameserver 192.168.10.1"]);
    expect(woerter("echo 'a  b' \"c  d\"")).toEqual(["echo", "a  b", "c  d"]);
    expect(woerter('echo "sag \\"hi\\""')).toEqual(["echo", 'sag "hi"']);
    expect(woerter("echo ab'cd'\"ef\"")).toEqual(["echo", "abcdef"]);
    expect(woerter('echo ""')).toEqual(["echo", ""]);
    expect(woerter("echo a\\ b")).toEqual(["echo", "a b"]);
    expect(woerter("echo # Kommentar")).toEqual(["echo"]);
  });

  it("meldet nicht geschlossene Anführungszeichen", () => {
    expect(terminalZerlegeEingabe('echo "offen')).toEqual({ ok: false, fehler: "bash: unexpected EOF while looking for matching `\"'" });
    expect(terminalZerlegeEingabe("echo 'offen")).toEqual({ ok: false, fehler: "bash: unexpected EOF while looking for matching `''" });
  });

  it("behält das sudo-Präfix als erstes Wort", () => {
    expect(woerter("sudo systemctl restart nginx")).toEqual(["sudo", "systemctl", "restart", "nginx"]);
  });

  it("erkennt Operatoren nur außerhalb von Anführungszeichen", () => {
    const ergebnis = terminalZerlegeEingabe('echo "a | b" | grep a && ls >> x;pwd');
    expect(ergebnis.ok).toBe(true);
    if (!ergebnis.ok) return;
    expect(ergebnis.woerter.filter((w) => w.operator).map((w) => w.text)).toEqual(["|", "&&", ">>", ";"]);
    expect(ergebnis.woerter.find((w) => w.text === "a | b")!.operator).toBe(false);
  });

  it("ersetzt Variablen außerhalb einfacher Anführungszeichen", () => {
    const ergebnis = terminalZerlegeEingabe('echo $NAME "x$NAME" \'$NAME\' $UNBEKANNT $', { NAME: "wert" });
    expect(ergebnis.ok && ergebnis.woerter.map((w) => w.text)).toEqual(["echo", "wert", "xwert", "$NAME", "$"]);
  });
});
