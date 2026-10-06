import { describe, expect, it } from "vitest";
import {
  TERMINAL_SZENARIEN,
  terminalAusfuehren,
  terminalCronEintraege,
  terminalErreichbarkeit,
  terminalFirewallErlaubt,
  terminalFuellstand,
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

const ALLE_IDS = [
  "internet",
  "dns",
  "platte-voll",
  "apipa",
  "webseite",
  "ip-maske",
  "rechte",
  "firewall",
  "prozess-last",
  "ssh-angriff",
  "cron-job",
  "mehrstufig",
];

/** Ist das Ziel des Szenarios nach diesen Eingaben erreicht? */
const geloest = (id: string, eingaben: string[]): boolean => lauf(szenario(id), eingaben).at(-1)!.geloest;

describe("Szenarien: Aufbau", () => {
  it("gibt es zwölf Szenarien mit eindeutigen Kennungen und je drei Tipps", () => {
    const ids = TERMINAL_SZENARIEN.map((s) => s.id);
    expect(ids).toEqual(ALLE_IDS);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of TERMINAL_SZENARIEN) {
      expect(s.tipps).toHaveLength(3);
      expect(s.loesungsweg.some((schritt) => schritt.loest)).toBe(true);
      expect(s.erklaerung.length).toBeGreaterThan(50);
    }
  });

  it("verteilt die Szenarien auf vier leichte, fünf mittlere und drei schwere", () => {
    const anzahl = (stufe: string) => TERMINAL_SZENARIEN.filter((s) => s.stufe === stufe).length;
    expect(anzahl("leicht")).toBe(4);
    expect(anzahl("mittel")).toBe(5);
    expect(anzahl("schwer")).toBe(3);
    // Die Reihenfolge der Liste folgt den Stufen (leicht → mittel → schwer).
    const rang = { leicht: 0, mittel: 1, schwer: 2 } as const;
    const raenge = TERMINAL_SZENARIEN.map((s) => rang[s.stufe]);
    expect(raenge).toEqual([...raenge].sort());
  });

  it("behält die drei ursprünglichen Szenarien mit ihren Kennungen", () => {
    expect(szenario("webseite").titel).toBe("Webseite nicht erreichbar");
    expect(szenario("internet").titel).toBe("Kein Zugriff aufs Internet am Client-PC");
    expect(szenario("dns").titel).toBe("Name wird nicht aufgelöst");
  });

  it("hat zu jedem Szenario Titel, Kunde, Aufgabe, nicht leere Tipps und Lösungsschritte", () => {
    const kunden = ["Hartmann Metallbau GmbH", "Nordlicht Logistik AG", "Sonnenhof Apotheken KG", "Rheinwerk Maschinen GmbH"];
    for (const s of TERMINAL_SZENARIEN) {
      expect(s.titel.trim(), s.id).not.toBe("");
      expect(kunden, s.id).toContain(s.kunde);
      expect(s.aufgabe.length, s.id).toBeGreaterThan(100);
      for (const tipp of s.tipps) expect(tipp.trim(), s.id).not.toBe("");
      expect(s.loesungsweg.length, s.id).toBeGreaterThanOrEqual(5);
      for (const schritt of s.loesungsweg) {
        expect(schritt.befehl.trim(), s.id).not.toBe("");
        expect(schritt.erklaerung.trim(), s.id).not.toBe("");
      }
      // Genau ein Schritt löst die Störung.
      expect(s.loesungsweg.filter((schritt) => schritt.loest), s.id).toHaveLength(1);
    }
  });

  it("nennt in den Texten nur private bzw. dokumentierte Adressbereiche und die erlaubten öffentlichen Ziele", () => {
    const erlaubt = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|127\.|169\.254\.|203\.0\.113\.|8\.8\.8\.8$|93\.184\.216\.34$|255\.|0\.)/;
    for (const s of TERMINAL_SZENARIEN) {
      const text = [s.aufgabe, s.erklaerung, ...s.tipps, ...s.loesungsweg.flatMap((l) => [l.befehl, l.erklaerung]), JSON.stringify(s.startZustand)].join("\n");
      for (const treffer of text.matchAll(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g)) {
        const ip = treffer[0];
        // Versionsnummern (nginx 1.22.1.x gibt es nicht) und MAC/Hash-Reste kommen hier nicht vor; alles andere muss erlaubt sein.
        expect(erlaubt.test(ip), `${s.id}: ${ip}`).toBe(true);
      }
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
      lauf(s, s.loesungsweg.map((schritt) => schritt.befehl)).forEach((ergebnis, index) => {
        const text = ergebnis.ausgabe.join("\n");
        expect(text, `Schritt ${index + 1}`).not.toMatch(/command not found|Simulation:/);
        // Schritte, die eine Fehlermeldung bewusst vorführen (Logdatei, gescheiterter Probelauf), sind gekennzeichnet.
        if (!s.loesungsweg[index]!.zeigtFehler) expect(text, `Schritt ${index + 1}`).not.toMatch(/Permission denied|not permitted/);
      });
    });

    it(`${s.id}: der Lösungsweg hat keine Fehlermeldung ohne Kennzeichnung "zeigtFehler" und nur dort, wo wirklich eine steht`, () => {
      lauf(s, s.loesungsweg.map((schritt) => schritt.befehl)).forEach((ergebnis, index) => {
        const text = ergebnis.ausgabe.join("\n");
        if (s.loesungsweg[index]!.zeigtFehler) {
          expect(text, `Schritt ${index + 1} ist als zeigtFehler gekennzeichnet`).toMatch(/Permission denied|not permitted|No such file|command not found|\[emerg\]|failed/);
        }
      });
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
    expect(letzte(s, ["shutdown now"])).toContain("bash: shutdown: command not found");
    expect(letzte(s, ["shutdown now"])).toContain("gibt es in dieser Übungs-Kommandozeile nicht");
    expect(letzte(s, ["sudo apt install nginx"])).toContain("sudo: apt: command not found");
    expect(letzte(s, ["cp a b"])).toContain("bash: cp: command not found");
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

describe("Szenario 'Festplatte voll'", () => {
  const s = szenario("platte-voll");

  it("zeigt df -h das Dateisystem / als voll", () => {
    const text = letzte(s, ["df -h"]);
    expect(text).toContain("Filesystem      Size  Used Avail Use% Mounted on");
    expect(text).toContain("/dev/sda1        20G   20G     0 100% /");
    expect(text).toContain("tmpfs           392M  1.1M  391M   1% /run");
  });

  it("zeigt df ohne -h die 1K-Blöcke", () => {
    const text = letzte(s, ["df"]);
    expect(text).toContain("Filesystem     1K-blocks     Used Available Use% Mounted on");
    expect(text).toContain("/dev/sda1       20971520 20971520         0 100% /");
  });

  it("zeigt df mit Pfad nur das zugehörige Dateisystem und meldet unbekannte Pfade", () => {
    expect(letzte(s, ["df -h /var/log"]).split("\n")).toHaveLength(2);
    expect(letzte(s, ["df -h /var/log"])).toContain("/dev/sda1");
    expect(letzte(s, ["df /gibt/es/nicht"])).toBe("df: /gibt/es/nicht: No such file or directory");
    expect(letzte(s, ["df -q"])).toContain("df: invalid option -- 'q'");
  });

  it("zeigt du -sh den Platzverbrauch je Verzeichnis (mit Platzhalter)", () => {
    expect(letzte(s, ["du -sh /var/*"])).toBe("3.6G\t/var/lib\n16G\t/var/log");
    expect(letzte(s, ["du -h -d 0 /var/log"])).toBe("16G\t/var/log");
    expect(letzte(s, ["du -h --max-depth=1 /var/log"])).toBe("16G\t/var/log/rheinwerk\n16G\t/var/log");
    expect(letzte(s, ["du -h /var/log/syslog"])).toBe("580M\t/var/log/syslog");
    expect(letzte(s, ["du -sk /var/log/rheinwerk"])).toMatch(/^1\d{7}\t\/var\/log\/rheinwerk$/);
  });

  it("meldet bei du Fehler in Pfad und Optionen", () => {
    expect(letzte(s, ["du -sh /gibt/es/nicht"])).toBe("du: cannot access '/gibt/es/nicht': No such file or directory");
    expect(letzte(s, ["du -h -d x /var"])).toBe("du: invalid maximum depth 'x'");
    expect(letzte(s, ["du -q"])).toContain("du: invalid option -- 'q'");
  });

  it("zeigt ls -lh die Dateigrößen lesbar und ls -l in Bytes", () => {
    const lesbar = letzte(s, ["ls -lh /var/log/rheinwerk"]);
    expect(lesbar).toContain("total 16G");
    expect(lesbar).toMatch(/-rw-r--r-- 1 erp erp 9\.6G Oct {2}6 09:11 anwendung\.log\n/);
    expect(lesbar).toMatch(/ 5\.3G Sep 29 07:42 anwendung\.log\.1\n/);
    expect(lesbar).toMatch(/ 600M Oct {2}6 09:01 zugriff\.log$/);
    expect(letzte(s, ["ls -l /var/log/rheinwerk"])).toContain(" 5662310400 Sep 29 07:42 anwendung.log.1");
  });

  it("verlangt für rm sudo, weil /var/log/rheinwerk dem Konto erp gehört", () => {
    const e = lauf(s, ["rm /var/log/rheinwerk/anwendung.log.1"])[0]!;
    expect(e.ausgabe).toEqual(["rm: cannot remove '/var/log/rheinwerk/anwendung.log.1': Permission denied"]);
    expect(e.zustand.dateien["/var/log/rheinwerk/anwendung.log.1"]).toBeDefined();
  });

  it("gibt der Füllstand nach dem Löschen der rotierten Kopie 74 % an", () => {
    const text = letzte(s, ["sudo rm /var/log/rheinwerk/anwendung.log.1", "df -h"]);
    expect(text).toContain("/dev/sda1        20G   15G  5.3G  74% /");
    expect(terminalFuellstand(lauf(s, ["sudo rm /var/log/rheinwerk/anwendung.log.1"]).at(-1)!.zustand)).toBe(74);
  });

  it("gibt das Löschen der geöffneten aktiven Logdatei keinen Platz frei", () => {
    const ergebnisse = lauf(s, ["sudo rm /var/log/rheinwerk/anwendung.log", "df -h"]);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("100% /");
    expect(ergebnisse[1]!.geloest).toBe(false);
    expect(ergebnisse[0]!.zustand.dateien["/var/log/rheinwerk/anwendung.log"]).toBeUndefined();
  });

  it("genügt es nicht, nur kleine Dateien zu löschen, und das Löschen des ganzen Verzeichnisses löst es nicht", () => {
    expect(geloest("platte-voll", ["sudo rm /var/log/syslog /var/log/rheinwerk/zugriff.log"])).toBe(false);
    expect(geloest("platte-voll", ["sudo rm /var/log/rheinwerk/*.log"])).toBe(false);
    expect(geloest("platte-voll", ["sudo rm -r /var/log/rheinwerk"])).toBe(false);
  });

  it("löst es auch, wenn die aktive Datei und die Kopie zusammen mit Platzhalter gelöscht werden", () => {
    expect(geloest("platte-voll", ["sudo rm /var/log/rheinwerk/*.log.1"])).toBe(true);
    expect(geloest("platte-voll", ["sudo rm /var/log/rheinwerk/anwendung.log.1 /var/log/rheinwerk/zugriff.log"])).toBe(true);
  });

  it("scheitert das Schreiben bei voller Platte mit 'No space left on device' und klappt danach", () => {
    expect(letzte(s, ["echo x | sudo tee /var/log/test.txt"])).toContain("tee: /var/log/test.txt: No space left on device");
    expect(letzte(s, ["echo x > notiz.txt"])).toBe("bash: notiz.txt: No space left on device");
    expect(letzte(s, ["sudo rm /var/log/rheinwerk/anwendung.log.1", "echo x > notiz.txt", "cat notiz.txt"])).toBe("x");
  });

  it("zeigt das Journal des ERP-Dienstes den Fehler", () => {
    expect(letzte(s, ["journalctl -u erp -n 2"])).toContain("No space left on device");
  });
});

describe("Szenario 'Rechner hat eine 169.254-Adresse'", () => {
  const s = szenario("apipa");

  it("zeigt ip addr die Link-Local-Adresse und ip route die passende Route", () => {
    expect(letzte(s, ["ip addr"])).toContain("inet 169.254.37.12/16 brd 169.254.255.255 scope link noprefixroute enp0s3");
    expect(letzte(s, ["ip route"])).toBe("169.254.0.0/16 dev enp0s3 scope link metric 1000");
  });

  it("erreicht von dort weder Router noch Internet und löst keine Namen auf", () => {
    expect(letzte(s, ["ping -c 1 192.168.30.1"])).toBe("ping: connect: Network is unreachable");
    expect(letzte(s, ["ping -c 1 8.8.8.8"])).toBe("ping: connect: Network is unreachable");
    expect(letzte(s, ["ping -c 1 example.com"])).toBe("ping: example.com: Temporary failure in name resolution");
  });

  it("nennt das Journal des NetworkManagers die Ursache", () => {
    const text = letzte(s, ["journalctl -u NetworkManager"]);
    expect(text).toContain("dhcp4 (enp0s3): request timed out");
    expect(text).toContain("link-local fallback, address=169.254.37.12");
  });

  it("holt der Neustart des NetworkManagers Adresse, Route und DNS-Server vom DHCP-Server", () => {
    const ergebnisse = lauf(s, ["sudo systemctl restart NetworkManager", "ip addr", "ip route", "cat /etc/resolv.conf", "ping -c 1 192.168.30.1", "journalctl -u NetworkManager -n 1"]);
    expect(ergebnisse[0]!.geloest).toBe(true);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("inet 192.168.30.57/24 brd 192.168.30.255 scope global dynamic noprefixroute enp0s3");
    expect(ergebnisse[1]!.ausgabe.join("\n")).not.toContain("169.254");
    expect(ergebnisse[2]!.ausgabe).toEqual([
      "default via 192.168.30.1 dev enp0s3 proto dhcp metric 100",
      "192.168.30.0/24 dev enp0s3 proto kernel scope link src 192.168.30.57 metric 100",
    ]);
    expect(ergebnisse[3]!.ausgabe).toEqual(["# Generated by NetworkManager", "nameserver 192.168.30.1"]);
    expect(ergebnisse[4]!.ausgabe.join("\n")).toContain("1 packets transmitted, 1 received");
    expect(ergebnisse[5]!.ausgabe.join("\n")).toContain("new lease, address=192.168.30.57");
  });

  it("verlangt für den Neustart sudo und löst es weder durch Stoppen noch durch Starten ohne Neustart", () => {
    const ohne = lauf(s, ["systemctl restart NetworkManager"])[0]!;
    expect(ohne.ausgabe.join("\n")).toContain("Interactive authentication required");
    expect(ohne.geloest).toBe(false);
    expect(geloest("apipa", ["sudo systemctl stop NetworkManager"])).toBe(false);
    expect(geloest("apipa", ["sudo systemctl start NetworkManager"])).toBe(false);
  });

  it("löst es auch von Hand: falsche Adresse entfernen, richtige setzen, Route und DNS eintragen", () => {
    const befehle = [
      "sudo ip addr del 169.254.37.12/16 dev enp0s3",
      "sudo ip addr add 192.168.30.57/24 dev enp0s3",
      "sudo ip route add default via 192.168.30.1",
      'echo "nameserver 192.168.30.1" | sudo tee /etc/resolv.conf',
    ];
    expect(geloest("apipa", befehle.slice(0, 3))).toBe(false);
    expect(geloest("apipa", befehle)).toBe(true);
    // Die 169.254-Adresse darf nicht daneben stehen bleiben.
    expect(geloest("apipa", befehle.slice(1))).toBe(false);
  });

  it("meldet der Neustart ohne DHCP-Server keine neue Adresse (nur ein Eintrag im Journal)", () => {
    const start = terminalStartZustand(s);
    start.dhcp!.verfuegbar = false;
    const ergebnisse = lauf(s, ["sudo systemctl restart NetworkManager", "ip addr"], start);
    expect(ergebnisse[1]!.ausgabe.join("\n")).toContain("169.254.37.12/16");
    expect(ergebnisse[0]!.zustand.dienste.NetworkManager!.journal.at(-1)).toContain("dhcp4 (enp0s3): request timed out");
    expect(ergebnisse[0]!.geloest).toBe(false);
  });
});

describe("Szenario 'Falsche Subnetzmaske'", () => {
  const s = szenario("ip-maske");

  it("zeigt die falsche Maske in ip addr und ip route", () => {
    expect(letzte(s, ["ip addr"])).toContain("inet 192.168.20.140/26 brd 192.168.20.191 scope global enp0s3");
    expect(letzte(s, ["ip route"])).toBe("192.168.20.128/26 dev enp0s3 proto kernel scope link src 192.168.20.140");
  });

  it("erreicht weder Gateway noch Dateiserver noch Internet", () => {
    for (const ziel of ["192.168.20.1", "192.168.20.10", "8.8.8.8"]) expect(letzte(s, [`ping -c 1 ${ziel}`])).toBe("ping: connect: Network is unreachable");
  });

  it("lässt sich die Standardroute mit der falschen Maske nicht eintragen", () => {
    expect(letzte(s, ["sudo ip route add default via 192.168.20.1"])).toBe("Error: Nexthop has invalid gateway.");
  });

  it("verlangt für ip addr add und del sudo", () => {
    expect(letzte(s, ["ip addr del 192.168.20.140/26 dev enp0s3"])).toBe("RTNETLINK answers: Operation not permitted");
    expect(letzte(s, ["ip addr add 192.168.20.140/24 dev enp0s3"])).toBe("RTNETLINK answers: Operation not permitted");
  });

  it("entfernt ip addr del die Adresse samt Standardroute", () => {
    const ergebnisse = lauf(s, ["sudo ip addr del 192.168.20.140/26 dev enp0s3", "ip addr", "ip route"]);
    expect(ergebnisse[1]!.ausgabe.join("\n")).not.toContain("inet 192.168");
    expect(ergebnisse[2]!.ausgabe).toEqual([]);
  });

  it("löst erst die ganze Folge das Problem — Teilschritte nicht", () => {
    const del = "sudo ip addr del 192.168.20.140/26 dev enp0s3";
    const add = "sudo ip addr add 192.168.20.140/24 dev enp0s3";
    const route = "sudo ip route add default via 192.168.20.1";
    expect(geloest("ip-maske", [del])).toBe(false);
    expect(geloest("ip-maske", [del, add])).toBe(false);
    expect(geloest("ip-maske", [del, add, route])).toBe(true);
  });

  it("löst die Adresse mit /24 hinzuzufügen, ohne die alte zu entfernen, die Störung nicht (Reste der falschen Einstellung)", () => {
    const ergebnisse = lauf(s, ["sudo ip addr add 192.168.20.140/24 dev enp0s3", "sudo ip route add default via 192.168.20.1", "ip addr", "hostname -I"]);
    expect(ergebnisse[1]!.geloest).toBe(false);
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("inet 192.168.20.140/26");
    expect(ergebnisse[2]!.ausgabe.join("\n")).toContain("inet 192.168.20.140/24 brd 192.168.20.255 scope global enp0s3");
    expect(ergebnisse[3]!.ausgabe).toEqual(["192.168.20.140 192.168.20.140 "]);
  });

  it("löst ein falsches Gateway oder eine falsche Adresse das Problem nicht", () => {
    const del = "sudo ip addr del 192.168.20.140/26 dev enp0s3";
    expect(geloest("ip-maske", [del, "sudo ip addr add 192.168.20.140/24 dev enp0s3", "sudo ip route add default via 192.168.20.77"])).toBe(false);
    expect(geloest("ip-maske", [del, "sudo ip addr add 192.168.20.141/25 dev enp0s3", "sudo ip route add default via 192.168.20.1"])).toBe(false);
  });

  it("prüft ip addr add/del die Argumente wie iproute2", () => {
    expect(letzte(s, ["sudo ip addr add 192.168.20.5/24"])).toBe("Usage: ip address {add|change|replace} IFADDR dev IFNAME [ LIFETIME ]");
    expect(letzte(s, ["sudo ip addr add 999.1.1.1/24 dev enp0s3"])).toBe('Error: any valid prefix is expected rather than "999.1.1.1/24".');
    expect(letzte(s, ["sudo ip addr add 192.168.20.5/40 dev enp0s3"])).toBe('Error: any valid prefix is expected rather than "192.168.20.5/40".');
    expect(letzte(s, ["sudo ip addr add 192.168.20.5/24 dev eth9"])).toBe('Cannot find device "eth9"');
    expect(letzte(s, ["sudo ip addr add 192.168.20.140/26 dev enp0s3"])).toBe("RTNETLINK answers: File exists");
    expect(letzte(s, ["sudo ip addr del 192.168.20.99/24 dev enp0s3"])).toBe("RTNETLINK answers: Cannot assign requested address");
    expect(letzte(s, ["ip addr show dev xyz"])).toBe('Device "xyz" does not exist.');
    expect(letzte(s, ["ip addr flush dev enp0s3"])).toContain("nicht verfügbar");
  });

  it("zeigt ip addr zusätzliche Adressen — secondary nur im selben Netz — und /32 ohne Broadcast", () => {
    const text = letzte(s, [
      "sudo ip addr add 10.9.9.9/24 dev enp0s3",
      "sudo ip addr add 192.168.20.141/26 dev enp0s3",
      "sudo ip addr add 10.8.8.8/32 dev enp0s3",
      "ip addr show dev enp0s3",
    ]);
    expect(text).toContain("inet 10.9.9.9/24 brd 10.9.9.255 scope global enp0s3");
    expect(text).toContain("inet 192.168.20.141/26 brd 192.168.20.191 scope global secondary enp0s3");
    expect(text).toContain("inet 10.8.8.8/32 scope global enp0s3");
    expect(text).not.toContain("lo:");
  });

  it("verliert eine Standardroute, wenn das Netz ihres Gateways verschwindet", () => {
    const ergebnisse = lauf(szenario("internet"), ["sudo ip route add default via 192.168.10.1", "sudo ip addr del 192.168.10.25/24 dev enp0s3", "ip route", "ping -c 1 8.8.8.8"]);
    expect(ergebnisse[2]!.ausgabe).toEqual([]);
    expect(ergebnisse[3]!.ausgabe.join("\n")).toContain("Network is unreachable");
  });

  it("rückt beim Entfernen der Hauptadresse die nächste Adresse nach", () => {
    const e = lauf(szenario("internet"), ["sudo ip addr add 10.1.1.1/24 dev enp0s3", "sudo ip addr del 192.168.10.25/24 dev enp0s3", "hostname -I"]);
    expect(e[2]!.ausgabe).toEqual(["10.1.1.1 "]);
    expect(e[1]!.zustand.schnittstellen[0]!.ip).toBe("10.1.1.1");
  });
});

describe("Szenario 'Dienst meldet Permission denied'", () => {
  const s = szenario("rechte");

  it("zeigt systemctl status und das Journal die Ursache", () => {
    expect(letzte(s, ["systemctl status wawi"])).toContain("Active: failed (Result: exit-code)");
    expect(letzte(s, ["journalctl -u wawi"])).toContain("Permission denied: '/etc/wawi/db.conf'");
  });

  it("sperrt das Verzeichnis /etc/wawi für den Benutzer (ls, cd, cat) und zeigt es mit sudo", () => {
    expect(letzte(s, ["ls /etc/wawi"])).toBe("ls: cannot open directory '/etc/wawi': Permission denied");
    expect(letzte(s, ["cd /etc/wawi"])).toBe("bash: cd: /etc/wawi: Permission denied");
    expect(letzte(s, ["cat /etc/wawi/wawi.conf"])).toBe("cat: /etc/wawi/wawi.conf: Permission denied");
    expect(letzte(s, ["ls -l /etc/wawi/db.conf"])).toBe("ls: cannot access '/etc/wawi/db.conf': Permission denied");
    expect(letzte(s, ["sudo ls -l /etc/wawi"])).toBe(
      "total 8\n-rw------- 1 root root 138 Oct  5 18:02 db.conf\n-rw-r----- 1 root wawi  77 Sep 12 10:20 wawi.conf",
    );
  });

  it("zeigt id die Gruppen der Konten", () => {
    expect(letzte(s, ["id"])).toBe("uid=1000(techniker) gid=1000(techniker) groups=1000(techniker),27(sudo)");
    expect(letzte(s, ["id wawi"])).toBe("uid=998(wawi) gid=998(wawi) groups=998(wawi)");
    expect(letzte(s, ["sudo id"])).toBe("uid=0(root) gid=0(root) groups=0(root)");
    expect(letzte(s, ["sudo -u wawi id"])).toBe("uid=998(wawi) gid=998(wawi) groups=998(wawi)");
    expect(letzte(s, ["id niemand"])).toBe("id: ‘niemand’: no such user");
    expect(letzte(s, ["id -x"])).toContain("id: invalid option -- 'x'");
  });

  it("läuft sudo -u mit den Rechten des genannten Kontos", () => {
    expect(letzte(s, ["sudo -u wawi whoami"])).toBe("wawi");
    expect(letzte(s, ["sudo -u wawi cat /etc/wawi/db.conf"])).toBe("cat: /etc/wawi/db.conf: Permission denied");
    expect(letzte(s, ["sudo -u wawi cat /etc/wawi/wawi.conf"])).toContain("listen = 127.0.0.1:8081");
    expect(letzte(s, ["sudo -u wawi systemctl start wawi"])).toContain("Interactive authentication required");
    expect(letzte(s, ["sudo -u gibtsnicht whoami"])).toBe("sudo: unknown user gibtsnicht");
    expect(letzte(s, ["sudo -u"])).toContain("option requires an argument");
    expect(letzte(s, ["sudo -u wawi"])).toContain("usage: sudo");
  });

  it("scheitert der Start des Dienstes vor der Reparatur und protokolliert den Fehler erneut", () => {
    const e = lauf(s, ["sudo systemctl start wawi", "journalctl -u wawi -n 4"]);
    expect(e[0]!.ausgabe.join("\n")).toContain("Job for wawi.service failed");
    expect(e[0]!.geloest).toBe(false);
    expect(e[1]!.ausgabe.join("\n")).toContain("wawi-server: Datenbankzugang konnte nicht geladen werden, Abbruch.");
  });

  it("löst chown auf das Dienstkonto plus Start das Problem", () => {
    const e = lauf(s, ["sudo chown wawi:wawi /etc/wawi/db.conf", "sudo systemctl start wawi", "systemctl is-active wawi"]);
    expect(e[0]!.ausgabe).toEqual([]);
    expect(e[0]!.geloest).toBe(false);
    expect(e[1]!.geloest).toBe(true);
    expect(e[2]!.ausgabe).toEqual(["active"]);
  });

  it("löst auch Gruppe wawi plus 640 das Problem — die Gruppe allein mit 600 aber nicht", () => {
    expect(geloest("rechte", ["sudo chown root:wawi /etc/wawi/db.conf", "sudo systemctl start wawi"])).toBe(false);
    expect(geloest("rechte", ["sudo chown root:wawi /etc/wawi/db.conf", "sudo chmod 640 /etc/wawi/db.conf", "sudo systemctl start wawi"])).toBe(true);
    expect(geloest("rechte", ["sudo chown :wawi /etc/wawi/db.conf", "sudo chmod g+r /etc/wawi/db.conf", "sudo systemctl start wawi"])).toBe(true);
  });

  it("zählt weltweit lesbare oder schreibbare Rechte nicht als Lösung, obwohl der Dienst dann läuft", () => {
    for (const modus of ["777", "644", "666", "o+r", "a+r"]) {
      const e = lauf(s, [`sudo chmod ${modus} /etc/wawi/db.conf`, "sudo systemctl start wawi", "systemctl is-active wawi"]);
      expect(e[2]!.ausgabe, modus).toEqual(["active"]);
      expect(e[2]!.geloest, modus).toBe(false);
    }
  });

  it("scheitert der Start auch, wenn das Verzeichnis für das Dienstkonto gesperrt wird", () => {
    expect(geloest("rechte", ["sudo chown wawi:wawi /etc/wawi/db.conf", "sudo chmod 700 /etc/wawi", "sudo systemctl start wawi"])).toBe(false);
  });

  it("zeigt ls -l nach chown den neuen Besitzer", () => {
    expect(letzte(s, ["sudo chown wawi:wawi /etc/wawi/db.conf", "sudo ls -l /etc/wawi"])).toContain("-rw------- 1 wawi wawi 138 Oct  5 18:02 db.conf");
  });
});

describe("chmod und chown", () => {
  const s = szenario("webseite");
  const notiz = ["echo hallo > notiz.txt"];

  it("versteht oktale und symbolische Angaben", () => {
    const modus = (befehle: string[]) => letzte(s, [...notiz, ...befehle, "ls -l notiz.txt"]).split("\n").at(-1)!.slice(0, 10);
    expect(modus([])).toBe("-rw-r--r--");
    expect(modus(["chmod 600 notiz.txt"])).toBe("-rw-------");
    expect(modus(["chmod 0755 notiz.txt"])).toBe("-rwxr-xr-x");
    expect(modus(["chmod u+x notiz.txt"])).toBe("-rwxr--r--");
    expect(modus(["chmod g+w,o-r notiz.txt"])).toBe("-rw-rw----");
    expect(modus(["chmod a=r notiz.txt"])).toBe("-r--r--r--");
    expect(modus(["chmod +x notiz.txt"])).toBe("-rwxr-xr-x");
    expect(modus(["chmod go-rwx notiz.txt"])).toBe("-rw-------");
    expect(modus(["chmod u=rwx,g=rx,o= notiz.txt"])).toBe("-rwxr-x---");
    expect(modus(["chmod 1777 notiz.txt"])).toBe("-rwxrwxrwt");
  });

  it("meldet Fehler wie chmod", () => {
    expect(letzte(s, ["chmod abc notiz.txt"])).toBe("chmod: invalid mode: ‘abc’\nTry 'chmod --help' for more information.");
    expect(letzte(s, ["chmod 755 gibts-nicht.txt"])).toBe("chmod: cannot access 'gibts-nicht.txt': No such file or directory");
    expect(letzte(s, ["chmod 755"])).toContain("chmod: missing operand after ‘755’");
    expect(letzte(s, ["chmod"])).toContain("chmod: missing operand");
    expect(letzte(s, ["chmod 777 /etc/hostname"])).toBe("chmod: changing permissions of '/etc/hostname': Operation not permitted");
    expect(letzte(s, ["chmod -Q 755 x"])).toContain("chmod: invalid option -- 'Q'");
  });

  it("darf der Besitzer ohne sudo ändern, andere nur mit sudo", () => {
    expect(letzte(s, ["sudo chmod 600 /etc/hostname", "sudo ls -l /etc/hostname"])).toMatch(/^-rw------- 1 root root/);
    expect(lauf(s, [...notiz, "sudo chown root notiz.txt", "chmod 777 notiz.txt"]).at(-1)!.ausgabe.join("\n")).toBe("chmod: changing permissions of 'notiz.txt': Operation not permitted");
  });

  it("wirkt chmod -R auf alle Dateien und Verzeichnisse darunter", () => {
    const e = lauf(s, ["sudo chmod -R o-rx /var/www", "ls -l /var/www/hartmann"]);
    expect(e[1]!.ausgabe.join("\n")).toContain("ls: cannot open directory '/var/www/hartmann': Permission denied");
    expect(lauf(s, ["sudo chmod -R 700 /var/www", "sudo ls -l /var/www/hartmann"]).at(-1)!.ausgabe.join("\n")).toMatch(/-rwx------ 1 root root/);
  });

  it("setzt chown Besitzer und Gruppe und prüft Konten", () => {
    expect(letzte(s, [...notiz, "sudo chown root:root notiz.txt", "ls -l notiz.txt"])).toMatch(/^-rw-r--r-- 1 root root/);
    expect(letzte(s, [...notiz, "sudo chown :root notiz.txt", "ls -l notiz.txt"])).toMatch(/^-rw-r--r-- 1 techniker root/);
    expect(letzte(s, [...notiz, "sudo chown root: notiz.txt", "ls -l notiz.txt"])).toMatch(/^-rw-r--r-- 1 root root/);
    expect(letzte(s, [...notiz, "sudo chown nobody notiz.txt"])).toBe("chown: invalid user: ‘nobody’");
    expect(letzte(s, [...notiz, "sudo chown :nogroup notiz.txt"])).toBe("chown: invalid group: ‘:nogroup’");
    expect(letzte(s, [...notiz, "chown root notiz.txt"])).toBe("chown: changing ownership of 'notiz.txt': Operation not permitted");
    expect(letzte(s, ["sudo chown root nirgends"])).toBe("chown: cannot access 'nirgends': No such file or directory");
    expect(letzte(s, ["chown root"])).toContain("chown: missing operand after ‘root’");
  });

  it("legt neue Dateien im Heimatverzeichnis dem Benutzer und unter /etc root zu", () => {
    expect(letzte(s, [...notiz, "ls -l notiz.txt"])).toMatch(/^-rw-r--r-- 1 techniker techniker 6 /);
    expect(letzte(s, ["echo a | sudo tee /etc/neu.txt", "ls -l /etc/neu.txt"])).toMatch(/^-rw-r--r-- 1 root root 2 /);
    expect(lauf(s, [...notiz, "sudo chown root notiz.txt", "echo x >> notiz.txt"]).at(-1)!.ausgabe).toEqual(["bash: notiz.txt: Permission denied"]);
  });
});

describe("mkdir und rm", () => {
  const s = szenario("webseite");

  it("legt Verzeichnisse an — auch leere, die dann bestehen bleiben", () => {
    const e = lauf(s, ["mkdir projekt", "ls", "cd projekt", "pwd", "ls -l /home/techniker"]);
    expect(e[0]!.ausgabe).toEqual([]);
    expect(e[1]!.ausgabe).toEqual(["projekt  ticket.txt"]);
    expect(e[3]!.ausgabe).toEqual(["/home/techniker/projekt"]);
    expect(e[4]!.ausgabe.join("\n")).toMatch(/drwxr-xr-x 2 techniker techniker 4096 Oct {2}2 09:14 projekt/);
  });

  it("meldet Fehler bei mkdir", () => {
    expect(letzte(s, ["mkdir /home/techniker"])).toBe("mkdir: cannot create directory ‘/home/techniker’: File exists");
    expect(letzte(s, ["mkdir a/b"])).toBe("mkdir: cannot create directory ‘a/b’: No such file or directory");
    expect(letzte(s, ["mkdir /etc/neu"])).toBe("mkdir: cannot create directory ‘/etc/neu’: Permission denied");
    expect(letzte(s, ["mkdir /etc/hostname"])).toBe("mkdir: cannot create directory ‘/etc/hostname’: File exists");
    expect(letzte(s, ["mkdir"])).toContain("mkdir: missing operand");
    expect(letzte(s, ["mkdir -x a"])).toContain("mkdir: invalid option -- 'x'");
    expect(lauf(s, ["mkdir -p /home/techniker"])[0]!.ausgabe).toEqual([]);
  });

  it("legt mkdir -p die ganze Kette an und sudo mkdir unter /etc", () => {
    expect(letzte(s, ["mkdir -p a/b/c", "cd a/b/c", "pwd"])).toBe("/home/techniker/a/b/c");
    expect(letzte(s, ["sudo mkdir /etc/neu", "ls -l /etc"])).toContain("drwxr-xr-x 2 root root 4096 Oct  2 09:14 neu");
    expect(letzte(s, ["sudo mkdir -p /srv/a/b", "ls /srv/a"])).toBe("b");
  });

  it("löscht rm Dateien und mit -r Verzeichnisse im Heimatverzeichnis", () => {
    expect(letzte(s, ["echo a > t.txt", "rm t.txt", "ls"])).toBe("ticket.txt");
    expect(letzte(s, ["mkdir -p d/e", "echo a > d/e/x.txt", "rm -r d", "ls"])).toBe("ticket.txt");
    expect(letzte(s, ["mkdir leer", "rm -r leer", "ls"])).toBe("ticket.txt");
    expect(letzte(s, ["rm -rf nirgends"])).toBe("");
  });

  it("meldet Fehler bei rm", () => {
    expect(letzte(s, ["rm nirgends"])).toBe("rm: cannot remove 'nirgends': No such file or directory");
    expect(letzte(s, ["mkdir leer", "rm leer"])).toBe("rm: cannot remove 'leer': Is a directory");
    expect(letzte(s, ["rm"])).toContain("rm: missing operand");
    expect(lauf(s, ["rm -f"])[0]!.ausgabe).toEqual([]);
    expect(letzte(s, ["rm -x a"])).toContain("rm: invalid option -- 'x'");
    expect(letzte(s, ["rm /etc/hostname"])).toBe("rm: cannot remove '/etc/hostname': Permission denied");
    expect(letzte(s, ["rm -r /"])).toBe("rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe");
  });

  it("löscht rm in der Übung auch mit sudo nur an den erlaubten Stellen", () => {
    const hinweis = "Simulation: Aus Sicherheitsgründen löscht rm in dieser Übung nur unter /var/log, /var/backups, /var/tmp, /tmp und in deinem Heimatverzeichnis.";
    for (const befehl of ["sudo rm /etc/hostname", "sudo rm -rf /etc", "sudo rm -rf /var/log", "sudo rm -rf /home/techniker", "sudo rm -rf /var/www", "sudo rm -rf /var"]) {
      const e = lauf(s, [befehl])[0]!;
      expect(e.ausgabe, befehl).toEqual([hinweis]);
      expect(e.zustand.dateien["/etc/hostname"], befehl).toBe("web01");
      expect(e.zustand.dateien["/var/www/hartmann/index.html"], befehl).toBeDefined();
    }
    expect(letzte(s, ["sudo rm /var/log/nginx/error.log", "cat /var/log/nginx/error.log"])).toBe("cat: /var/log/nginx/error.log: No such file or directory");
  });

  it("hält die Platzhalter-Erweiterung wie die Shell: * und ? passen auf Namen, Anführungszeichen schalten sie ab, ohne Treffer bleibt das Muster stehen", () => {
    expect(letzte(s, ["echo /var/log/nginx/*"])).toBe("/var/log/nginx/error.log");
    expect(letzte(s, ["echo /var/log/nginx/err?r.log"])).toBe("/var/log/nginx/error.log");
    expect(letzte(s, ['echo "/var/log/nginx/*"'])).toBe("/var/log/nginx/*");
    expect(letzte(s, ["echo '/var/log/nginx/*'"])).toBe("/var/log/nginx/*");
    expect(letzte(s, ["echo /var/log/nginx/*.txt"])).toBe("/var/log/nginx/*.txt");
    expect(letzte(s, ["echo /nirgends/*"])).toBe("/nirgends/*");
    expect(letzte(s, ["echo /etc/*/sites-enabled"])).toBe("/etc/*/sites-enabled");
    expect(letzte(s, ["ls /etc/nginx/sites-*"])).toBe("hartmann-metallbau.conf");
    expect(letzte(s, ["mkdir x1 x2", "echo x*"])).toBe("x1 x2");
    expect(letzte(s, ["echo a > .versteckt", "echo *"])).toBe("ticket.txt");
    expect(letzte(s, ["echo a > .versteckt", "echo .v*"])).toBe(".versteckt");
  });
});

describe("head, tail und wc", () => {
  const s = szenario("webseite");
  const log = "/var/log/nginx/error.log"; // drei Zeilen

  it("zeigt head den Anfang und tail das Ende", () => {
    const zeilen = letzte(s, [`cat ${log}`]).split("\n");
    expect(zeilen).toHaveLength(3);
    expect(letzte(s, [`head -n 1 ${log}`])).toBe(zeilen[0]);
    expect(letzte(s, [`tail -n 1 ${log}`])).toBe(zeilen[2]);
    expect(letzte(s, [`tail -n 2 ${log}`])).toBe(zeilen.slice(1).join("\n"));
    expect(letzte(s, [`tail -2 ${log}`])).toBe(zeilen.slice(1).join("\n"));
    expect(letzte(s, [`head -n2 ${log}`])).toBe(zeilen.slice(0, 2).join("\n"));
    expect(letzte(s, [`tail ${log}`])).toBe(zeilen.join("\n"));
    expect(letzte(s, [`tail -n 0 ${log}`])).toBe("");
    expect(letzte(s, [`head -n 99 ${log}`])).toBe(zeilen.join("\n"));
  });

  it("arbeitet hinter einer Pipe", () => {
    expect(letzte(s, [`cat ${log} | tail -n 1 | grep -c emerg`])).toBe("1");
    expect(letzte(s, ["journalctl -u nginx | head -n 2"]).split("\n")).toHaveLength(2);
  });

  it("meldet Fehler wie GNU coreutils", () => {
    expect(letzte(s, ["tail /nirgends"])).toBe("tail: cannot open '/nirgends' for reading: No such file or directory");
    expect(letzte(s, ["head /nirgends"])).toBe("head: cannot open '/nirgends' for reading: No such file or directory");
    expect(letzte(s, ["tail /etc"])).toBe("tail: error reading '/etc': Is a directory");
    expect(letzte(s, ["tail -n x /etc/hostname"])).toBe("tail: invalid number of lines: ‘x’");
    expect(letzte(s, ["tail -f /etc/hostname"])).toContain("nicht unterstützt");
    expect(letzte(s, ["head -x /etc/hostname"])).toContain("head: invalid option -- 'x'");
    expect(letzte(s, ["tail"])).toContain("Simulation: tail braucht eine Datei");
  });

  it("zählt wc Zeilen, Wörter und Bytes", () => {
    expect(letzte(s, [`wc -l ${log}`])).toBe(`3 ${log}`);
    expect(letzte(s, [`cat ${log} | wc -l`])).toBe("3");
    expect(letzte(s, ["cat /etc/hostname | wc -w"])).toBe("1");
    expect(letzte(s, ["wc -c /etc/hostname"])).toBe("6 /etc/hostname");
    expect(letzte(s, ["wc /etc/hostname"])).toBe("      1       1       6 /etc/hostname");
    expect(letzte(s, ["wc -l /nirgends"])).toBe("wc: /nirgends: No such file or directory");
    expect(letzte(s, ["wc -x /etc/hostname"])).toContain("wc: invalid option -- 'x'");
    expect(letzte(s, ["wc -l"])).toContain("Simulation: wc braucht");
  });

  it("liest Dateien nur mit Leserecht", () => {
    const rechte = szenario("rechte");
    expect(letzte(rechte, ["tail /etc/wawi/db.conf"])).toBe("tail: cannot open '/etc/wawi/db.conf' for reading: Permission denied");
    expect(letzte(rechte, ["grep db /etc/wawi/db.conf"])).toBe("grep: /etc/wawi/db.conf: Permission denied");
    expect(letzte(rechte, ["wc -l /etc/wawi/db.conf"])).toBe("wc: /etc/wawi/db.conf: Permission denied");
    expect(letzte(rechte, ["sudo wc -l /etc/wawi/db.conf"])).toBe("5 /etc/wawi/db.conf");
  });
});

describe("Szenario 'Dienst läuft, Port nicht erreichbar'", () => {
  const s = szenario("firewall");

  it("antwortet der Dienst lokal, ist der Port von außen aber nicht erreichbar", () => {
    expect(letzte(s, ["curl -k https://localhost"])).toContain("Kundenportal — Nordlicht Logistik AG");
    expect(letzte(s, ["nc -zv 127.0.0.1 443"])).toBe("Connection to 127.0.0.1 443 port [tcp/https] succeeded!");
    expect(letzte(s, ["nc -zv 192.168.50.10 443"])).toBe("nc: connect to 192.168.50.10 port 443 (tcp) failed: Connection timed out");
    expect(letzte(s, ["curl https://192.168.50.10"])).toBe("curl: (28) Failed to connect to 192.168.50.10 port 443 after 130000 ms: Timeout was reached");
  });

  it("zeigt ufw status die Regeln — nur für root", () => {
    expect(letzte(s, ["ufw status"])).toBe("ERROR: You need to be root to run this script");
    expect(letzte(s, ["sudo ufw status"])).toBe("Status: active\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW       Anywhere");
    expect(letzte(s, ["sudo ufw status numbered"])).toContain("[ 1] 22/tcp                     ALLOW IN    Anywhere");
    expect(letzte(s, ["sudo ufw status verbose"])).toContain("Default: deny (incoming), allow (outgoing), disabled (routed)");
    expect(letzte(s, ["sudo ufw status gibtsnicht"])).toBe("ERROR: Invalid syntax");
  });

  it("öffnet ufw allow 443/tcp den Port, die Datenbank bleibt zu", () => {
    const e = lauf(s, ["sudo ufw allow 443/tcp", "nc -zv 192.168.50.10 443", "nc -zv 192.168.50.10 3306", "curl -s https://192.168.50.10", "nc -zv 127.0.0.1 3306"]);
    expect(e[0]!.ausgabe).toEqual(["Rule added"]);
    expect(e[0]!.geloest).toBe(true);
    expect(e[1]!.ausgabe).toEqual(["Connection to 192.168.50.10 443 port [tcp/https] succeeded!"]);
    expect(e[2]!.ausgabe).toEqual(["nc: connect to 192.168.50.10 port 3306 (tcp) failed: Connection timed out"]);
    expect(e[3]!.ausgabe.join("\n")).toContain("Kundenportal");
    expect(e[4]!.ausgabe).toEqual(["Connection to 127.0.0.1 3306 port [tcp/mysql] succeeded!"]);
  });

  it("nimmt ufw allow auch Portnummer ohne Protokoll und Dienstnamen an", () => {
    expect(geloest("firewall", ["sudo ufw allow 443"])).toBe(true);
    expect(geloest("firewall", ["sudo ufw allow https"])).toBe(true);
    expect(letzte(s, ["sudo ufw allow https", "sudo ufw status"])).toContain("443/tcp                    ALLOW       Anywhere");
    expect(letzte(s, ["sudo ufw allow 443", "sudo ufw status"])).toContain("443                        ALLOW       Anywhere");
  });

  it("zählt Abschalten, Alles-Erlauben oder Öffnen der Datenbank nicht als Lösung", () => {
    expect(geloest("firewall", ["sudo ufw disable"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow 443/tcp", "sudo ufw disable"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow 443/tcp", "sudo ufw allow 3306/tcp"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow 443/udp"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow from 192.168.50.0/24"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow 443/tcp", "sudo systemctl stop nginx"])).toBe(false);
    expect(geloest("firewall", ["sudo ufw allow 443/tcp", "sudo ufw delete allow 22/tcp"])).toBe(false);
  });

  it("schaltet ufw disable die Firewall ab und ufw enable wieder an", () => {
    const e = lauf(s, ["sudo ufw disable", "sudo ufw status", "nc -zv 192.168.50.10 3306", "sudo ufw enable", "sudo ufw status"]);
    expect(e[0]!.ausgabe).toEqual(["Firewall stopped and disabled on system startup"]);
    expect(e[1]!.ausgabe).toEqual(["Status: inactive"]);
    expect(e[2]!.ausgabe).toEqual(["Connection to 192.168.50.10 3306 port [tcp/mysql] succeeded!"]);
    expect(e[3]!.ausgabe).toEqual(["Firewall is active and enabled on system startup"]);
    expect(e[4]!.ausgabe[0]).toBe("Status: active");
  });

  it("verwaltet ufw Regeln: doppelte, einfügen, löschen, Fehlermeldungen", () => {
    const e = lauf(s, [
      "sudo ufw allow 22/tcp",
      "sudo ufw insert 1 deny from 192.168.50.99",
      "sudo ufw insert 5 allow 80",
      "sudo ufw insert 1 maybe 80",
      "sudo ufw status numbered",
      "sudo ufw delete 1",
      "sudo ufw delete 9",
      "sudo ufw delete allow 22/tcp",
      "sudo ufw delete allow 22/tcp",
      "sudo ufw status",
    ]);
    expect(e[0]!.ausgabe).toEqual(["Skipping adding existing rule"]);
    expect(e[1]!.ausgabe).toEqual(["Rule inserted"]);
    expect(e[2]!.ausgabe).toEqual(["ERROR: Invalid position '5'"]);
    expect(e[3]!.ausgabe).toEqual(["ERROR: Invalid syntax"]);
    expect(e[4]!.ausgabe.join("\n")).toContain("[ 1] Anywhere                   DENY IN     192.168.50.99\n[ 2] 22/tcp                     ALLOW IN    Anywhere");
    expect(e[5]!.ausgabe).toEqual(["Rule deleted"]);
    expect(e[6]!.ausgabe).toEqual(["ERROR: Could not find rule '9'"]);
    expect(e[7]!.ausgabe).toEqual(["Rule deleted"]);
    expect(e[8]!.ausgabe).toEqual(["Could not delete non-existent rule"]);
    expect(e[9]!.ausgabe).toEqual(["Status: active"]);
  });

  it("meldet ufw allow falsche Angaben wie ufw", () => {
    expect(letzte(s, ["sudo ufw allow 99999"])).toBe("ERROR: Bad port '99999'");
    expect(letzte(s, ["sudo ufw allow 22/icmp"])).toBe("ERROR: Unsupported protocol 'icmp'");
    expect(letzte(s, ["sudo ufw allow blubber"])).toBe("ERROR: Could not find a profile matching 'blubber'");
    expect(letzte(s, ["sudo ufw allow from 999.1.1.1"])).toBe("ERROR: Bad source address");
    expect(letzte(s, ["sudo ufw allow from"])).toBe("ERROR: Wrong number of arguments");
    expect(letzte(s, ["sudo ufw allow"])).toBe("ERROR: Need 'to' or 'from' clause");
    expect(letzte(s, ["sudo ufw allow from 10.0.0.1 to any port 99999"])).toBe("ERROR: Bad port '99999'");
    expect(letzte(s, ["sudo ufw allow from 10.0.0.1 to any proto gre"])).toBe("ERROR: Unsupported protocol 'gre'");
    expect(letzte(s, ["sudo ufw allow from 10.0.0.1 to 10.0.0.2"])).toContain("Simulation:");
    expect(letzte(s, ["sudo ufw"])).toContain("ERROR: not enough args");
    expect(letzte(s, ["sudo ufw logging on"])).toContain("nicht verfügbar");
  });

  it("zeigt Regeln mit Quelladresse und Zielport", () => {
    const text = letzte(s, ["sudo ufw allow from 192.168.50.31 to any port 3306 proto tcp", "sudo ufw deny from 203.0.113.0/24", "sudo ufw reject 25", "sudo ufw status"]);
    expect(text).toContain("3306/tcp                   ALLOW       192.168.50.31");
    expect(text).toContain("Anywhere                   DENY        203.0.113.0/24");
    expect(text).toContain("25                         REJECT      Anywhere");
  });

  it("meldet bei inaktiver Firewall 'Rules updated'", () => {
    expect(letzte(s, ["sudo ufw disable", "sudo ufw allow 80"])).toBe("Rules updated");
    expect(letzte(s, ["sudo ufw reload"])).toBe("Firewall reloaded");
    expect(letzte(s, ["sudo ufw disable", "sudo ufw reload"])).toBe("Firewall not enabled (skipping reload)");
  });

  it("wertet terminalFirewallErlaubt Regeln von oben nach unten aus", () => {
    const z = terminalStartZustand(s);
    expect(terminalFirewallErlaubt(z, null, 22)).toBe(true);
    expect(terminalFirewallErlaubt(z, null, 443)).toBe(false);
    z.firewall!.regeln = [
      { aktion: "deny", von: "203.0.113.0/24" },
      { aktion: "allow", von: "any", port: 22, proto: "tcp" },
      { aktion: "reject", von: "any", port: 25 },
    ];
    expect(terminalFirewallErlaubt(z, "203.0.113.77", 22)).toBe(false);
    expect(terminalFirewallErlaubt(z, "198.51.100.5", 22)).toBe(true);
    expect(terminalFirewallErlaubt(z, null, 22)).toBe(true);
    expect(terminalFirewallErlaubt(z, null, 22, "udp")).toBe(false);
    expect(terminalFirewallErlaubt(z, null, 25)).toBe(false);
    z.firewall!.standardEingehend = "allow";
    expect(terminalFirewallErlaubt(z, null, 8080)).toBe(true);
    z.firewall!.aktiv = false;
    expect(terminalFirewallErlaubt(z, "203.0.113.77", 22, "udp")).toBe(true);
  });

  it("prüft nc -zv Ziele: DNS-Server, Gateway, Internet, Fehleingaben", () => {
    expect(letzte(s, ["nc -zv 192.168.50.1 53"])).toBe("Connection to 192.168.50.1 53 port [tcp/domain] succeeded!");
    expect(letzte(s, ["nc -zv 192.168.50.1 80"])).toBe("nc: connect to 192.168.50.1 port 80 (tcp) failed: Connection refused");
    expect(letzte(s, ["nc -zv 93.184.216.34 443"])).toBe("Connection to 93.184.216.34 443 port [tcp/https] succeeded!");
    expect(letzte(s, ["nc -zv example.com 80"])).toBe("Connection to example.com 80 port [tcp/http] succeeded!");
    expect(letzte(s, ["nc -zv 8.8.8.8 80"])).toBe("nc: connect to 8.8.8.8 port 80 (tcp) failed: Connection refused");
    expect(letzte(s, ["nc -zv 203.0.113.9 80"])).toBe("nc: connect to 203.0.113.9 port 80 (tcp) failed: Connection timed out");
    expect(letzte(s, ["nc -zv 192.168.50.99 80"])).toBe("nc: connect to 192.168.50.99 port 80 (tcp) failed: No route to host");
    expect(letzte(s, ["nc -zv gibts.nicht 80"])).toBe('nc: getaddrinfo for host "gibts.nicht" port 80: Name or service not known');
    expect(letzte(s, ["nc -zv localhost 99999"])).toBe("nc: port number invalid: 99999");
    expect(letzte(s, ["nc -zv localhost"])).toBe("usage: nc -zv destination port");
    expect(letzte(s, ["nc -z 127.0.0.1 443"])).toBe("");
    expect(letzte(s, ["nc -z 127.0.0.1 5432"])).toBe("nc: connect to 127.0.0.1 port 5432 (tcp) failed: Connection refused");
    expect(letzte(s, ["nc -zv -w 2 127.0.0.1 22"])).toBe("Connection to 127.0.0.1 22 port [tcp/ssh] succeeded!");
    expect(letzte(s, ["nc localhost 80"])).toContain("nc -zv");
    expect(letzte(s, ["nc -zq localhost 80"])).toContain("nc: invalid option -- 'q'");
  });

  it("antwortet curl und nc bei fehlender Verbindung und kaputtem Namen sinnvoll", () => {
    expect(letzte(s, ["sudo ufw reject 443", "nc -zv 192.168.50.10 443"])).toBe("nc: connect to 192.168.50.10 port 443 (tcp) failed: Connection refused");
    expect(letzte(s, ["sudo ufw reject 443", "curl https://192.168.50.10"])).toBe("curl: (7) Failed to connect to 192.168.50.10 port 443 after 0 ms: Couldn't connect to server");
    const keinNetz = terminalStartZustand(s);
    keinNetz.standardroute = null;
    expect(lauf(s, ["nc -zv 8.8.8.8 443"], keinNetz).at(-1)!.ausgabe).toEqual(["nc: connect to 8.8.8.8 port 443 (tcp) failed: Network is unreachable"]);
  });
});

describe("Szenario 'Server ist extrem langsam'", () => {
  const s = szenario("prozess-last");

  it("zeigt uptime die Last", () => {
    expect(letzte(s, ["uptime"])).toMatch(/^ 09:14:\d\d up {2}1:34, {2}1 user, {2}load average: 2\.27, 1\.93, 1\.36$/);
  });

  it("zeigt ps aux alle Prozesse im Format von ps", () => {
    const zeilen = letzte(s, ["ps aux"]).split("\n");
    expect(zeilen[0]).toBe("USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND");
    expect(zeilen[1]).toMatch(/^root {11}1 {2}0\.0 {2}0\.3 {2}36126 12042 \? {8}Ss {3}07:40 {3}0:03 \/sbin\/init$/);
    expect(zeilen).toHaveLength(10);
    expect(zeilen.at(-1)).toMatch(/^erp {9}4218 97\.8 {2}6\.1 .* R {4}02:00 412:07 \/usr\/bin\/python3 \/opt\/rheinwerk\/export_stuecklisten\.py --alles$/);
    expect(zeilen.find((z) => z.includes("-bash"))).toContain("pts/0");
  });

  it("sortiert ps --sort nach CPU oder Speicher, auf- oder absteigend", () => {
    expect(letzte(s, ["ps aux --sort=-%cpu | head -2"]).split("\n")[1]).toContain("export_stuecklisten.py");
    expect(letzte(s, ["ps aux --sort=-%mem | head -2"]).split("\n")[1]).toContain("erp-server.jar");
    expect(letzte(s, ["ps aux --sort=%cpu | head -2"]).split("\n")[1]).toContain("/sbin/init");
    expect(letzte(s, ["ps aux --sort=-pid | head -2"]).split("\n")[1]).toContain("4218");
    expect(letzte(s, ["ps aux --sort=foo"])).toContain("error: unknown sort specifier");
    expect(letzte(s, ["ps -ef"])).toContain("nimm ps aux");
    expect(letzte(s, ["ps"])).toContain("Nimm ps aux");
  });

  it("zeigt top -b -n 1 die Prozesse nach CPU sortiert samt Kopfzeilen", () => {
    const zeilen = letzte(s, ["top -b -n 1"]).split("\n");
    expect(zeilen[0]).toMatch(/^top - 09:14:\d\d up {2}1:34, {2}1 user, {2}load average: 2\.27, 1\.93, 1\.36$/);
    expect(zeilen[1]).toBe("Tasks:   9 total,   1 running,   8 sleeping,   0 stopped,   0 zombie");
    expect(zeilen[2]).toMatch(/^%Cpu\(s\): {1}95\.0 us, {2}4\.0 sy, {2}0\.0 ni, {2}1\.0 id,/);
    expect(zeilen[3]).toMatch(/^MiB Mem :/);
    expect(zeilen[4]).toMatch(/^MiB Swap:/);
    expect(zeilen[6]).toBe("    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND");
    expect(zeilen[7]).toMatch(/^ {3}4218 erp {7}20 {3}0 .* R {2}97\.8 {3}6\.1 412:07\.\d\d python3$/);
    expect(zeilen[8]).toContain("java");
    expect(letzte(s, ["top"])).toContain("top -b -n 1");
  });

  it("darf ein normaler Benutzer fremde Prozesse nicht beenden", () => {
    const e = lauf(s, ["kill 4218", "kill -9 905", "sudo kill 99999", "kill 99999"]);
    expect(e[0]!.ausgabe).toEqual(["bash: kill: (4218) - Operation not permitted"]);
    expect(e[1]!.ausgabe).toEqual(["bash: kill: (905) - Operation not permitted"]);
    expect(e[2]!.ausgabe).toEqual(["kill: (99999): No such process"]);
    expect(e[3]!.ausgabe).toEqual(["bash: kill: (99999) - No such process"]);
    expect(e[1]!.zustand.prozesse!.some((p) => p.pid === 905)).toBe(true);
    expect(lauf(s, ["sudo kill 3877"]).at(-1)!.zustand.prozesse!.some((p) => p.pid === 3877)).toBe(false);
  });

  it("ignoriert Prozess 4218 SIGTERM, SIGHUP und SIGINT und beendet ihn nur mit SIGKILL", () => {
    for (const befehl of ["sudo kill 4218", "sudo kill -15 4218", "sudo kill -TERM 4218", "sudo kill -s SIGTERM 4218", "sudo kill -HUP 4218", "sudo kill -2 4218"]) {
      const e = lauf(s, [befehl])[0]!;
      expect(e.ausgabe, befehl).toEqual([]);
      expect(e.geloest, befehl).toBe(false);
    }
    for (const befehl of ["sudo kill -9 4218", "sudo kill -KILL 4218", "sudo kill -s 9 4218", "sudo kill -n 9 4218", "sudo kill -SIGKILL 4218"]) {
      expect(lauf(s, [befehl])[0]!.geloest, befehl).toBe(true);
    }
  });

  it("zählt es nicht als Lösung, den falschen Prozess oder den Dienst zu beenden", () => {
    expect(geloest("prozess-last", ["sudo kill -9 3877"])).toBe(false);
    expect(geloest("prozess-last", ["sudo kill -9 4218", "sudo kill -9 905"])).toBe(false);
    expect(geloest("prozess-last", ["sudo kill -9 4218", "sudo kill -9 742"])).toBe(false);
    expect(geloest("prozess-last", ["sudo systemctl stop erp", "sudo kill -9 4218"])).toBe(false);
    expect(geloest("prozess-last", ["sudo systemctl stop ssh", "sudo kill -9 4218"])).toBe(false);
    // Auch ein Neustart des ERP-Dienstes ist verboten (er bekäme eine neue PID).
    expect(geloest("prozess-last", ["sudo systemctl restart erp", "sudo kill -9 4218"])).toBe(false);
  });

  it("hält die Prozessliste synchron, wenn ein Dienst gestoppt wird", () => {
    const e = lauf(s, ["sudo systemctl stop mariadb", "ps aux | grep mariadbd", "sudo systemctl start mariadb", "ps aux | grep mariadbd"]);
    expect(e[1]!.ausgabe).toEqual([]);
    expect(e[3]!.ausgabe.join("\n")).toMatch(/^mysql +\d+ +0\.0 +0\.4 .* \/usr\/sbin\/mariadbd$/);
  });

  it("meldet kill Fehler in der Syntax", () => {
    expect(letzte(s, ["kill"])).toContain("kill: usage: kill [-s sigspec");
    expect(letzte(s, ["kill -x 1"])).toBe("bash: kill: -x: invalid signal specification");
    expect(letzte(s, ["kill -s FOO 1"])).toBe("bash: kill: FOO: invalid signal specification");
    expect(letzte(s, ["sudo kill -x 1"])).toBe("kill: -x: invalid signal specification");
    expect(letzte(s, ["kill abc"])).toBe("bash: kill: abc: arguments must be process or job IDs");
    expect(lauf(s, ["sudo kill 1"])[0]!.zustand.prozesse!.some((p) => p.pid === 1)).toBe(true);
  });

  it("zeigt ps in anderen Szenarien die aus den Diensten abgeleitete Liste und beendet damit den Dienst", () => {
    const web = szenario("webseite");
    const liste = letzte(web, ["ps aux"]);
    expect(liste).toContain("/usr/sbin/apache2");
    expect(liste).toContain("/usr/sbin/sshd");
    expect(liste).toContain("-bash");
    expect(liste).not.toContain("/usr/sbin/nginx");
    const e = lauf(web, ["sudo kill 812", "systemctl is-active apache2", "sudo systemctl start nginx"]);
    expect(e[1]!.ausgabe).toEqual(["inactive"]);
    expect(e[2]!.geloest).toBe(true);
  });
});

describe("Szenario 'Viele fehlgeschlagene SSH-Anmeldungen'", () => {
  const s = szenario("ssh-angriff");
  const angreifer = "203.0.113.77";

  it("liest auth.log nur mit sudo", () => {
    expect(letzte(s, ['grep -c "Failed password" /var/log/auth.log'])).toBe("grep: /var/log/auth.log: Permission denied");
    expect(letzte(s, ['sudo grep -c "Failed password" /var/log/auth.log'])).toBe("121");
    expect(letzte(s, ["ls -l /var/log/auth.log"])).toMatch(/^-rw-r----- 1 root adm /);
  });

  it("zählt die Fehlversuche nach Angreifer und Rest", () => {
    expect(letzte(s, [`sudo grep "Failed password" /var/log/auth.log | grep -c ${angreifer}`])).toBe("120");
    expect(letzte(s, ['sudo grep "Failed password" /var/log/auth.log | grep -v 192.168 | wc -l'])).toBe("120");
    expect(letzte(s, [`sudo grep -c Invalid /var/log/auth.log`])).toBe("105");
    expect(letzte(s, ["sudo grep -c Accepted /var/log/auth.log"])).toBe("2");
    expect(letzte(s, ["sudo grep neumann /var/log/auth.log | wc -l"])).toBe("2");
  });

  it("zeigt das Ende des Protokolls nur Zeilen des Angreifers", () => {
    const ende = letzte(s, ["sudo tail -n 8 /var/log/auth.log"]).split("\n");
    expect(ende).toHaveLength(8);
    for (const zeile of ende) expect(zeile).toContain(angreifer);
    expect(letzte(s, ["sudo head -n 1 /var/log/auth.log"])).toMatch(/^2026-10-06T05:58:00\.000000\+02:00 fs01 sshd\[2200\]: Failed password for root from 203\.0\.113\.77 port 40000 ssh2$/);
  });

  it("ist das Protokoll zeitlich sortiert und enthält die harmlosen Anmeldungen an der richtigen Stelle", () => {
    const zeilen = letzte(s, ["sudo cat /var/log/auth.log"]).split("\n");
    const zeiten = zeilen.map((z) => z.slice(0, 26));
    expect([...zeiten].sort()).toEqual(zeiten);
    expect(zeilen.some((z) => z.includes("Accepted publickey for techniker from 192.168.20.15"))).toBe(true);
    expect(zeilen.filter((z) => z.includes("Failed password")).length).toBe(121);
  });

  it("zeigt ufw status numbered, dass Regel 1 SSH für alle erlaubt", () => {
    const text = letzte(s, ["sudo ufw status numbered"]);
    expect(text).toContain("[ 1] 22/tcp                     ALLOW IN    Anywhere");
    expect(text).toContain("[ 2] 445/tcp                    ALLOW IN    192.168.20.0/24");
  });

  it("wirkt eine hinten angehängte Sperre nicht — die Reihenfolge der Regeln entscheidet", () => {
    const e = lauf(s, [`sudo ufw deny from ${angreifer}`, "sudo ufw status numbered"]);
    expect(e[0]!.ausgabe).toEqual(["Rule added"]);
    expect(e[0]!.geloest).toBe(false);
    expect(e[1]!.ausgabe.join("\n")).toContain("[ 3] Anywhere                   DENY IN     203.0.113.77");
    expect(terminalFirewallErlaubt(e[0]!.zustand, angreifer, 22)).toBe(true);
    expect(geloest("ssh-angriff", [`sudo ufw deny from ${angreifer}/32`, "sudo ufw deny from 203.0.113.0/24"])).toBe(false);
  });

  it("löst es ufw insert 1 mit der richtigen Adresse oder dem Netz des Angreifers", () => {
    expect(geloest("ssh-angriff", [`sudo ufw insert 1 deny from ${angreifer}`])).toBe(true);
    expect(geloest("ssh-angriff", ["sudo ufw insert 1 deny from 203.0.113.0/24"])).toBe(true);
    // reject sperrt ebenfalls (der Angreifer bekommt eine Ablehnung statt Schweigen).
    expect(geloest("ssh-angriff", [`sudo ufw insert 1 reject from ${angreifer}`])).toBe(true);
  });

  it("löst es auch, SSH nur für das Firmennetz zu erlauben", () => {
    const befehle = ["sudo ufw delete 1", "sudo ufw allow from 192.168.20.0/24 to any port 22 proto tcp"];
    expect(geloest("ssh-angriff", [befehle[0]!])).toBe(false);
    expect(geloest("ssh-angriff", befehle)).toBe(true);
  });

  it("zählt es nicht als Lösung, Unbeteiligte auszusperren, SSH abzuschalten oder die Firewall abzuschalten", () => {
    expect(geloest("ssh-angriff", ["sudo ufw insert 1 deny from 192.168.20.22"])).toBe(false);
    expect(geloest("ssh-angriff", ["sudo ufw insert 1 deny from 192.168.20.0/24"])).toBe(false);
    expect(geloest("ssh-angriff", ["sudo ufw insert 1 deny 22"])).toBe(false);
    expect(geloest("ssh-angriff", ["sudo ufw disable"])).toBe(false);
    expect(geloest("ssh-angriff", ["sudo systemctl stop ssh"])).toBe(false);
    expect(geloest("ssh-angriff", [`sudo ufw insert 1 deny from ${angreifer}`, "sudo ufw delete 1"])).toBe(false);
    expect(geloest("ssh-angriff", [`sudo ufw insert 1 deny from ${angreifer}`, "sudo ufw disable"])).toBe(false);
  });
});

describe("Szenario 'Cron-Job läuft nicht'", () => {
  const s = szenario("cron-job");
  const richtig = "echo '30 2 * * * /opt/backups/nachtsicherung.sh' | sudo crontab -";

  it("hat jedes Konto seine eigene Crontab", () => {
    expect(letzte(s, ["crontab -l"])).toBe("no crontab for techniker");
    expect(letzte(s, ["sudo crontab -l"])).toBe("# Sonnenhof Apotheken KG — Nachtsicherung\n# m h dom mon dow command\n30 2 * * * /opt/backup/nachtsicherung.sh");
    expect(letzte(s, ["crontab -u root -l"])).toBe("must be privileged to use -u");
    expect(letzte(s, ["sudo crontab -u root -l"])).toContain("30 2 * * *");
    expect(letzte(s, ["sudo crontab -u nobody -l"])).toBe("crontab: user `nobody' unknown");
    expect(letzte(s, ["cat /var/spool/cron/crontabs/root"])).toBe("cat: /var/spool/cron/crontabs/root: Permission denied");
  });

  it("liefert terminalCronEintraege die gültigen Einträge", () => {
    const z = terminalStartZustand(s);
    expect(terminalCronEintraege(z, "root")).toEqual([{ minute: "30", stunde: "2", tag: "*", monat: "*", wochentag: "*", befehl: "/opt/backup/nachtsicherung.sh" }]);
    expect(terminalCronEintraege(z, "techniker")).toEqual([]);
  });

  it("zeigt das Syslog den Start des Jobs, aber nicht den Fehler", () => {
    const text = letzte(s, ["sudo grep CRON /var/log/syslog"]);
    expect(text).toContain("(root) CMD (/opt/backup/nachtsicherung.sh)");
    expect(text).toContain("No MTA installed, discarding output");
    expect(letzte(s, ["sudo grep -c CMD /var/log/syslog"])).toBe("4");
  });

  it("startet das Skript von Hand mit den passenden Fehlern", () => {
    expect(letzte(s, ["/opt/backup/nachtsicherung.sh"])).toBe("bash: /opt/backup/nachtsicherung.sh: No such file or directory");
    expect(letzte(s, ["/opt/backups/nachtsicherung.sh"])).toBe("bash: /opt/backups/nachtsicherung.sh: Permission denied");
    expect(letzte(s, ["cd /opt/backups", "./nachtsicherung.sh"])).toBe("bash: ./nachtsicherung.sh: Permission denied");
    expect(letzte(s, ["/opt"])).toBe("bash: /opt: Is a directory");
    expect(letzte(s, ["sudo /opt/backups/nachtsicherung.sh"])).toBe("sudo: /opt/backups/nachtsicherung.sh: command not found");
    expect(letzte(s, ["sudo /opt/backup/nachtsicherung.sh"])).toBe("sudo: /opt/backup/nachtsicherung.sh: command not found");
    expect(letzte(s, ["sudo chmod +x /opt/backups/nachtsicherung.sh", "sudo /opt/backups/nachtsicherung.sh"])).toBe(
      "tar: Removing leading `/' from member names\nSicherung abgeschlossen: /var/backups/sonnenhof-2026-10-06.tar.gz",
    );
    expect(letzte(s, ["sudo chmod +x /opt/backups/nachtsicherung.sh", "cd /opt/backups", "./nachtsicherung.sh"])).toContain("Sicherung abgeschlossen");
  });

  it("startet bash <skript> auch ohne Ausführungsrecht, solange die Datei lesbar ist", () => {
    expect(letzte(s, ["bash /opt/backups/nachtsicherung.sh"])).toContain("Sicherung abgeschlossen");
    expect(letzte(s, ["bash /opt/backup/nachtsicherung.sh"])).toBe("bash: /opt/backup/nachtsicherung.sh: No such file or directory");
    expect(letzte(s, ["bash /opt"])).toBe("bash: /opt: Is a directory");
    expect(letzte(s, ["bash"])).toContain("nutze bash <skript>");
    expect(letzte(s, ["bash /etc/hostname"])).toContain("kein vorbereitetes Übungsskript");
    expect(letzte(s, ["sudo chmod +x /etc/hostname", "/etc/hostname"])).toContain("kein vorbereitetes Übungsprogramm");
  });

  it("bleibt /bin/ls der Pfad eines Systembefehls und startet kein Skript", () => {
    expect(letzte(s, ["/bin/ls /opt"])).toBe("backups");
    expect(letzte(s, ["/usr/bin/whoami"])).toBe("techniker");
  });

  it("löst es erst, wenn Pfad UND Ausführungsrecht stimmen", () => {
    expect(geloest("cron-job", [richtig])).toBe(false);
    expect(geloest("cron-job", ["sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(false);
    expect(geloest("cron-job", [richtig, "sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(true);
    expect(geloest("cron-job", ["sudo chmod 755 /opt/backups/nachtsicherung.sh", richtig])).toBe(true);
  });

  it("löst es auch mit bash <skript> als Befehl (ohne Ausführungsrecht) und mit absichtlich nur u+x", () => {
    expect(geloest("cron-job", ["echo '30 2 * * * bash /opt/backups/nachtsicherung.sh' | sudo crontab -"])).toBe(true);
    expect(geloest("cron-job", ["echo '30 2 * * * /bin/bash /opt/backups/nachtsicherung.sh' | sudo crontab -"])).toBe(true);
    expect(geloest("cron-job", [richtig, "sudo chmod u+x /opt/backups/nachtsicherung.sh"])).toBe(true);
  });

  it("verlangt den vereinbarten Zeitpunkt 02:30 und das richtige Skript", () => {
    expect(geloest("cron-job", ["echo '0 3 * * * /opt/backups/nachtsicherung.sh' | sudo crontab -", "sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(false);
    expect(geloest("cron-job", ["echo '30 2 * * * /opt/backup/nachtsicherung.sh' | sudo crontab -", "sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(false);
    expect(geloest("cron-job", ["echo '30 2 * * 1-5 /opt/backups/nachtsicherung.sh' | sudo crontab -", "sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(false);
    expect(geloest("cron-job", ["echo '30 2 * * * /opt/backups/nachtsicherung.sh' | crontab -", "sudo chmod +x /opt/backups/nachtsicherung.sh"])).toBe(false);
  });

  it("prüft crontab - die Zeitfelder und lehnt Fehler ab", () => {
    const abgelehnt = (feld: string) => `"-":1: ${feld}\nerrors in crontab file, can't install.`;
    const installiere = (zeile: string) => letzte(s, [`echo '${zeile}' | crontab -`]);
    expect(installiere("30 2 * * /opt/x")).toBe(abgelehnt("bad day-of-week"));
    expect(installiere("61 2 * * * /opt/x")).toBe(abgelehnt("bad minute"));
    expect(installiere("*/0 * * * * /opt/x")).toBe(abgelehnt("bad minute"));
    expect(installiere("1-2-3 * * * * /opt/x")).toBe(abgelehnt("bad minute"));
    expect(installiere("* 25 * * * /opt/x")).toBe(abgelehnt("bad hour"));
    expect(installiere("* * 32 * * /opt/x")).toBe(abgelehnt("bad day-of-month"));
    expect(installiere("* * 0 * * /opt/x")).toBe(abgelehnt("bad day-of-month"));
    expect(installiere("* * * 13 * /opt/x")).toBe(abgelehnt("bad month"));
    expect(installiere("* * * * 8 /opt/x")).toBe(abgelehnt("bad day-of-week"));
    expect(installiere("* * * * *")).toBe(abgelehnt("bad command"));
    expect(installiere("@weekly")).toBe(abgelehnt("bad command"));
    expect(installiere("@gibtsnicht /opt/x")).toBe(abgelehnt("bad command"));
    expect(lauf(s, ["echo '30 2 * * /opt/x' | sudo crontab -"])[0]!.zustand.dateien["/var/spool/cron/crontabs/root"]).toContain("/opt/backup/nachtsicherung.sh");
  });

  it("nimmt crontab - gültige Zeilen an, speichert sie für das eigene Konto und zeigt sie mit -l", () => {
    for (const zeile of ["*/5 * * * * /bin/true", "0,30 8-17 * * 1-5 /bin/true", "15 3 * jan mon-fri /bin/true", "0 0 1 */2 * /bin/true", "@reboot /bin/true", "# nur ein Kommentar", "MAILTO=admin"]) {
      expect(letzte(s, [`echo '${zeile}' | crontab -`])).toBe("");
    }
    const e = lauf(s, ["echo '*/5 * * * * /bin/true' | crontab -", "crontab -l", "sudo ls -l /var/spool/cron/crontabs", "sudo crontab -l", "crontab -r", "crontab -l", "crontab -r"]);
    expect(e[1]!.ausgabe).toEqual(["*/5 * * * * /bin/true"]);
    expect(e[2]!.ausgabe.join("\n")).toMatch(/-rw------- 1 root {6}crontab .* root\n-rw------- 1 techniker crontab .* techniker/);
    expect(e[3]!.ausgabe.join("\n")).toContain("/opt/backup/nachtsicherung.sh");
    expect(e[4]!.ausgabe).toEqual([]);
    expect(e[5]!.ausgabe).toEqual(["no crontab for techniker"]);
    expect(e[6]!.ausgabe).toEqual(["no crontab for techniker"]);
    expect(lauf(s, ["crontab -r"])[0]!.ausgabe).toEqual(["no crontab for techniker"]);
  });

  it("liest terminalCronEintraege Kommentare, Variablen und Aliasnamen richtig", () => {
    const z = terminalStartZustand(s);
    z.dateien["/var/spool/cron/crontabs/root"] = ["# Kommentar", "", "MAILTO=admin", "@reboot /usr/local/bin/start.sh", "0 4 * * 1 /usr/bin/tar -czf /tmp/x.tgz /etc", "kaputt"].join("\n");
    expect(terminalCronEintraege(z, "root")).toEqual([
      { minute: "@reboot", stunde: "", tag: "", monat: "", wochentag: "", befehl: "/usr/local/bin/start.sh" },
      { minute: "0", stunde: "4", tag: "*", monat: "*", wochentag: "1", befehl: "/usr/bin/tar -czf /tmp/x.tgz /etc" },
    ]);
  });

  it("verweist crontab -e auf die Eingabe per Pipe und meldet unbekannte Optionen", () => {
    expect(letzte(s, ["crontab -e"])).toContain("echo '30 2 * * * /pfad/zum/skript' | crontab -");
    expect(letzte(s, ["crontab -"])).toContain("erwartet die neue Crontab über eine Pipe");
    expect(letzte(s, ["crontab -x"])).toContain("usage:\tcrontab [-u user] file");
    expect(letzte(s, ["crontab"])).toContain("usage:");
  });
});

describe("Szenario 'Intranet-Portal: mehrere Fehler hintereinander'", () => {
  const s = szenario("mehrstufig");
  const mkdir = "sudo mkdir /var/log/portal";
  const start = "sudo systemctl start nginx";
  const chmod = "sudo chmod o+x /srv/portal";
  const ufw = "sudo ufw allow 80/tcp";

  it("startet nginx ohne Logverzeichnis nicht und nginx -t nennt die Ursache", () => {
    expect(letzte(s, ["sudo nginx -t"])).toBe(
      'nginx: [emerg] open() "/var/log/portal/access.log" failed (2: No such file or directory)\nnginx: configuration file /etc/nginx/nginx.conf test failed',
    );
    const e = lauf(s, ["sudo systemctl start nginx", "journalctl -u nginx -n 4"]);
    expect(e[0]!.ausgabe.join("\n")).toContain("Job for nginx.service failed");
    expect(e[1]!.ausgabe.join("\n")).toContain('nginx[');
    expect(e[1]!.ausgabe.join("\n")).toContain("/var/log/portal/access.log");
  });

  it("verlangt für nginx -t sudo und kennt nur -t und -v", () => {
    expect(letzte(s, ["nginx -t"])).toContain('could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)');
    expect(letzte(s, ["nginx -v"])).toBe("nginx version: nginx/1.22.1");
    expect(letzte(s, ["nginx -s reload"])).toContain("Verfügbar sind „nginx -t“");
    expect(letzte(szenario("dns"), ["nginx -t"])).toBe("bash: nginx: command not found");
    expect(letzte(szenario("webseite"), ["sudo nginx -t"])).toBe(
      "nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful",
    );
  });

  it("besteht nginx -t nach mkdir, und der Dienst startet", () => {
    const e = lauf(s, [mkdir, "sudo nginx -t", "ls /var/log", start, "systemctl is-active nginx"]);
    expect(e[1]!.ausgabe).toEqual(["nginx: the configuration file /etc/nginx/nginx.conf syntax is ok", "nginx: configuration file /etc/nginx/nginx.conf test is successful"]);
    expect(e[2]!.ausgabe.join(" ")).toContain("portal");
    expect(e[4]!.ausgabe).toEqual(["active"]);
  });

  it("liefert nginx danach 403 Forbidden und protokolliert den Grund im error.log", () => {
    const e = lauf(s, [mkdir, start, "curl -I localhost", "curl localhost", "sudo cat /var/log/nginx/error.log"]);
    expect(e[2]!.ausgabe[0]).toBe("HTTP/1.1 403 Forbidden");
    expect(e[2]!.ausgabe).toContain("Server: nginx/1.22.1");
    expect(e[3]!.ausgabe.join("\n")).toContain("<center><h1>403 Forbidden</h1></center>");
    const log = e[4]!.ausgabe;
    expect(log).toHaveLength(2);
    expect(log[0]).toMatch(/^2026\/10\/06 09:\d\d:\d\d \[error\] \d+#\d+: \*1 open\(\) "\/srv\/portal\/html\/index\.html" failed \(13: Permission denied\), client: 127\.0\.0\.1, server: _, request: "HEAD \/ HTTP\/1\.1", host: "localhost"$/);
    expect(log[1]).toContain('request: "GET / HTTP/1.1"');
  });

  it("zeigt ls -l das gesperrte Verzeichnis und liefert nach chmod o+x die Seite", () => {
    const e = lauf(s, [mkdir, start, "ls -l /srv", chmod, "ls -l /srv", "curl localhost"]);
    expect(e[2]!.ausgabe.join("\n")).toContain("drwxr-x--- 2 deploy deploy 4096 Oct  5 17:40 portal");
    expect(e[4]!.ausgabe.join("\n")).toContain("drwxr-x--x 2 deploy deploy");
    expect(e[5]!.ausgabe.join("\n")).toContain("Intranet — Rheinwerk Maschinen GmbH");
  });

  it("verwirft die Firewall Port 80 bis zur Freigabe und protokolliert das", () => {
    expect(letzte(s, ["nc -zv 192.168.60.40 80"])).toBe("nc: connect to 192.168.60.40 port 80 (tcp) failed: Connection timed out");
    expect(letzte(s, ["sudo grep BLOCK /var/log/ufw.log | wc -l"])).toBe("3");
    expect(letzte(s, ["sudo grep -c DPT=80 /var/log/ufw.log"])).toBe("3");
  });

  it("löst es nur, wenn alle drei Ursachen behoben sind", () => {
    expect(geloest("mehrstufig", [mkdir, start, chmod])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, ufw])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, chmod, ufw])).toBe(false);
    expect(geloest("mehrstufig", [chmod, ufw, start])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, chmod, ufw])).toBe(true);
    expect(geloest("mehrstufig", [ufw, chmod, mkdir, start])).toBe(true);
  });

  it("zählt Rechte mit 777, abgeschaltete Firewall oder geöffnete weitere Ports nicht als Lösung", () => {
    expect(geloest("mehrstufig", [mkdir, start, "sudo chmod 777 /srv/portal", ufw])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, "sudo chmod -R 777 /srv/portal", ufw])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, chmod, "sudo ufw disable"])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, chmod, ufw, "sudo ufw allow 3306/tcp"])).toBe(false);
    expect(geloest("mehrstufig", [mkdir, start, chmod, ufw, "sudo ufw delete allow 22/tcp"])).toBe(false);
  });

  it("löst es auch mit anderen vernünftigen Rechten: 755 oder dem Webserver als Gruppe/Besitzer", () => {
    expect(geloest("mehrstufig", [mkdir, start, "sudo chmod 755 /srv/portal", ufw])).toBe(true);
    expect(geloest("mehrstufig", [mkdir, start, "sudo chown -R www-data:www-data /srv/portal", ufw])).toBe(true);
    expect(geloest("mehrstufig", [mkdir, start, "sudo chmod -R 755 /srv/portal", ufw])).toBe(true);
    expect(geloest("mehrstufig", [mkdir, start, "sudo chown :www-data /srv/portal", "sudo chmod g+x /srv/portal", ufw])).toBe(true);
    // Das Verzeichnis hat 750: Wird der Webserver zur Gruppe, genügt das bereits (Gruppe = r-x).
    expect(geloest("mehrstufig", [mkdir, start, "sudo chown :www-data /srv/portal", ufw])).toBe(true);
  });

  it("antwortet curl mit 404, wenn die Datei fehlt", () => {
    const z = terminalStartZustand(s);
    delete z.dateien["/srv/portal/html/index.html"];
    const ohneDatei = lauf(s, [mkdir, start, chmod, "curl -I localhost", "sudo tail -n 1 /var/log/nginx/error.log"], z);
    expect(ohneDatei[3]!.ausgabe[0]).toBe("HTTP/1.1 404 Not Found");
    expect(ohneDatei[4]!.ausgabe.join("\n")).toContain("failed (2: No such file or directory)");
  });
});

describe("Allgemeine Eigenschaften der neuen Befehle", () => {
  it("verändert terminalAusfuehren den übergebenen Zustand auch bei rm, chmod, mkdir und ufw nicht", () => {
    const s = szenario("firewall");
    const start = terminalStartZustand(s);
    const vorher = JSON.stringify(start);
    for (const befehl of ["sudo ufw allow 80", "sudo chmod 600 /var/www/portal/index.html", "sudo mkdir /var/log/x", "sudo rm /var/log/ufw.log", "sudo kill 812", "sudo ip addr add 10.0.0.1/24 dev enp0s3"]) {
      terminalAusfuehren(s, start, befehl);
    }
    expect(JSON.stringify(start)).toBe(vorher);
  });

  it("verbindet neue Befehle mit Pipes, && und || wie die alten", () => {
    const s = szenario("firewall");
    expect(letzte(s, ["sudo ufw status | grep -c ALLOW"])).toBe("1");
    expect(letzte(s, ["sudo ufw allow 80 && sudo ufw status numbered | tail -n 1"])).toContain("80");
    expect(letzte(s, ["nc -zv 192.168.50.10 443 || echo gesperrt"])).toContain("gesperrt");
    expect(letzte(s, ["nc -zv 127.0.0.1 443 || echo gesperrt"])).not.toContain("gesperrt");
  });

  it("nennt help die neuen Befehle", () => {
    const text = letzte(szenario("webseite"), ["help"]);
    for (const befehl of ["df", "du", "chmod", "chown", "mkdir", "rm", "id", "tail", "wc", "ufw", "nc -zv", "ps aux", "kill", "crontab", "nginx -t", "ip addr [add|del"]) expect(text).toContain(befehl);
  });

  it("zerlegt Platzhalter außerhalb von Anführungszeichen als solche", () => {
    const ergebnis = terminalZerlegeEingabe("ls *.txt '*.md' \"*.log\" a\\*b x?y plain");
    expect(ergebnis.ok && ergebnis.woerter.map((w) => [w.text, w.glob === true])).toEqual([
      ["ls", false],
      ["*.txt", true],
      ["*.md", false],
      ["*.log", false],
      ["a*b", false],
      ["x?y", true],
      ["plain", false],
    ]);
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
