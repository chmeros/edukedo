import { createHash, createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  FLAG_AUFGABEN,
  FLAG_DATEI_MANIPULIERT,
  FLAG_DATEI_ORIGINAL,
  FLAG_PRUEFSUMME_MANIPULIERT,
  FLAG_PRUEFSUMME_ORIGINAL,
  flagBase64Dekodiere,
  flagBase64Kodiere,
  flagCaesar,
  flagHexDekodiere,
  flagNormalisiere,
  flagPruefe,
  flagUrlDekodiere,
  flagXorHex,
  type FlagAufgabe,
} from "./flag-raetsel";

function aufgabe(id: string): FlagAufgabe {
  const gefunden = FLAG_AUFGABEN.find((eintrag) => eintrag.id === id);
  if (!gefunden) throw new Error(`Aufgabe ${id} fehlt`);
  return gefunden;
}

const sha256 = (text: string) => createHash("sha256").update(text, "utf8").digest("hex");

/** Der Wert nach "FLAG{" bis zur schließenden Klammer. */
function flagInhalt(flag: string): string {
  const treffer = /^FLAG\{(.+)\}$/.exec(flag);
  if (!treffer) throw new Error(`Kein FLAG{...}-Format: ${flag}`);
  return treffer[1]!;
}

describe("Aufgabenbestand", () => {
  it("hat eindeutige IDs und vollständig ausgefüllte Felder", () => {
    const ids = FLAG_AUFGABEN.map((eintrag) => eintrag.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(FLAG_AUFGABEN).toHaveLength(14);
    for (const eintrag of FLAG_AUFGABEN) {
      expect(eintrag.titel).not.toBe("");
      expect(["leicht", "mittel", "schwer"]).toContain(eintrag.stufe);
      expect(eintrag.kategorie).not.toBe("");
      expect(eintrag.geschichte.length).toBeGreaterThan(40);
      expect(eintrag.auftrag).toContain("FLAG{");
      expect(eintrag.datenTitel).not.toBe("");
      expect(eintrag.daten.trim()).not.toBe("");
      expect(eintrag.flag).toMatch(/^FLAG\{.+\}$/);
      expect(eintrag.tipps).toHaveLength(3);
      for (const tipp of eintrag.tipps) expect(tipp.trim()).not.toBe("");
      expect(eintrag.loesungsweg.length).toBeGreaterThanOrEqual(2);
      expect(eintrag.erklaerung.length).toBeGreaterThan(80);
    }
  });

  it("ist nach Schwierigkeit aufsteigend sortiert", () => {
    const rang = { leicht: 0, mittel: 1, schwer: 2 } as const;
    const raenge = FLAG_AUFGABEN.map((eintrag) => rang[eintrag.stufe]);
    expect(raenge).toEqual([...raenge].sort((a, b) => a - b));
  });

  it("verrät die Flag weder in den Tipps noch im Auftrag", () => {
    for (const eintrag of FLAG_AUFGABEN) {
      const inhalt = flagInhalt(eintrag.flag).toLowerCase();
      for (const text of [...eintrag.tipps, eintrag.auftrag]) expect(text.toLowerCase()).not.toContain(`flag{${inhalt}}`);
    }
  });

  it("enthält nur IP-Adressen aus Dokumentations- und privaten Bereichen", () => {
    const erlaubt = /^(192\.0\.2|198\.51\.100|203\.0\.113|10)\./;
    for (const eintrag of FLAG_AUFGABEN) {
      for (const ip of eintrag.daten.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []) expect(ip).toMatch(erlaubt);
    }
  });

  it("verwendet auch in Geschichte, Tipps und Lösungsweg nur Dokumentations-/private IP-Adressen", () => {
    const erlaubt = /^(192\.0\.2|198\.51\.100|203\.0\.113|10)\./;
    for (const eintrag of FLAG_AUFGABEN) {
      const texte = [eintrag.geschichte, eintrag.auftrag, ...eintrag.tipps, ...eintrag.loesungsweg, eintrag.erklaerung, eintrag.flag].join("\n");
      for (const ip of texte.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []) expect(ip).toMatch(erlaubt);
    }
  });

  it("verwendet nur Domains aus den reservierten Bereichen (example.com/.org/.net, .example, .test)", () => {
    const echteEndungen = /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|de|eu|io|info|biz|co|app|dev|ch|at)\b/gi;
    for (const eintrag of FLAG_AUFGABEN) {
      const texte = [eintrag.daten, eintrag.geschichte, eintrag.auftrag, ...eintrag.tipps, ...eintrag.loesungsweg, eintrag.erklaerung].join("\n");
      for (const domain of texte.match(echteEndungen) ?? []) expect(domain.toLowerCase()).toMatch(/(^|\.)example\.(com|net|org)$/);
    }
  });

  it("hat 14 Aufgaben: 5 leicht, 5 mittel, 4 schwer — die fünf ersten IDs bleiben erhalten", () => {
    const anzahl = (stufe: string) => FLAG_AUFGABEN.filter((eintrag) => eintrag.stufe === stufe).length;
    expect([anzahl("leicht"), anzahl("mittel"), anzahl("schwer")]).toEqual([5, 5, 4]);
    const ids = FLAG_AUFGABEN.map((eintrag) => eintrag.id);
    for (const alt of ["flag-base64-kennwort", "flag-caesar-postfach", "flag-log-bruteforce", "flag-pruefsumme-spiegel", "flag-weblog-pfad"]) {
      expect(ids).toContain(alt);
    }
  });

  it("nennt die Flag im letzten Schritt des Lösungswegs, und alle Schritte sind gefüllt", () => {
    for (const eintrag of FLAG_AUFGABEN) {
      for (const schritt of eintrag.loesungsweg) expect(schritt.trim()).not.toBe("");
      expect(eintrag.loesungsweg[eintrag.loesungsweg.length - 1]).toContain(eintrag.flag);
    }
  });

  it("hat nur Flags im Format FLAG{...} mit Inhalt ohne Zeilenumbruch, und Hilfsmittel nur aus der bekannten Liste", () => {
    const bekannt = ["base64", "caesar", "url", "hex", "xor"];
    for (const eintrag of FLAG_AUFGABEN) {
      expect(flagInhalt(eintrag.flag)).not.toMatch(/\n/);
      for (const art of eintrag.hilfsmittel ?? []) expect(bekannt).toContain(art);
    }
  });
});

describe("Aufgabe 1: Base64-Kennwort", () => {
  it("ist lösbar: Base64 dekodieren ergibt das Kennwort aus der Flag", () => {
    const a = aufgabe("flag-base64-kennwort");
    const kodiert = /^kennwort\s*=\s*(\S+)$/m.exec(a.daten)![1]!;
    const dekodiert = flagBase64Dekodiere(kodiert);
    expect(dekodiert).toEqual({ ok: true, text: "Schlüssel2024" });
    // Gegenprobe mit Node: gleicher Wert
    expect(Buffer.from(kodiert, "base64").toString("utf8")).toBe("Schlüssel2024");
    expect(flagPruefe(a, `FLAG{${(dekodiert as { text: string }).text}}`)).toBe(true);
  });
});

describe("Aufgabe 2: Caesar im Postfach", () => {
  it("ist lösbar: Zurückschieben um die Verschiebung aus dem Betreff ergibt das Losungswort", () => {
    const a = aufgabe("flag-caesar-postfach");
    const verschiebung = Number(/Verschiebung (\d+)/.exec(a.daten)![1]);
    expect(verschiebung).toBe(5);
    const nachricht = a.daten.split("\n\n")[1]!;
    const klartext = flagCaesar(nachricht, -verschiebung);
    expect(klartext).toContain("Hallo Team");
    const losungswort = /lautet ([A-Z]+)\./.exec(klartext)![1]!;
    expect(a.flag).toBe(`FLAG{${losungswort}}`);
    expect(flagPruefe(a, `FLAG{${losungswort}}`)).toBe(true);
  });
});

describe("Aufgabe 3: Anmelde-Log", () => {
  const a = aufgabe("flag-log-bruteforce");
  const zeilen = a.daten.trim().split("\n");

  it("hat einen realistischen Umfang und gleichmäßiges auth.log-Format", () => {
    expect(zeilen.length).toBeGreaterThanOrEqual(25);
    expect(zeilen.length).toBeLessThanOrEqual(40);
    for (const zeile of zeilen) expect(zeile).toMatch(/^[A-Z][a-z]{2} [ \d]\d \d\d:\d\d:\d\d \S+ sshd\[\d+\]: (Failed|Accepted) /);
  });

  it("ist lösbar: genau eine IP hat auffällig viele Fehlversuche mit vielen Benutzernamen", () => {
    const fehlversuche = new Map<string, { anzahl: number; benutzer: Set<string> }>();
    for (const zeile of zeilen) {
      const treffer = /Failed password for (?:invalid user )?(\S+) from (\S+) port/.exec(zeile);
      if (!treffer) continue;
      const eintrag = fehlversuche.get(treffer[2]!) ?? { anzahl: 0, benutzer: new Set<string>() };
      eintrag.anzahl += 1;
      eintrag.benutzer.add(treffer[1]!);
      fehlversuche.set(treffer[2]!, eintrag);
    }
    const auffaellig = [...fehlversuche].filter(([, werte]) => werte.anzahl >= 10 && werte.benutzer.size >= 5);
    expect(auffaellig).toHaveLength(1);
    const [ip, werte] = auffaellig[0]!;
    expect(werte.anzahl).toBe(16);
    expect(werte.benutzer.size).toBe(12);
    // alle anderen bleiben unauffällig
    for (const [andere, w] of fehlversuche) if (andere !== ip) expect(w.anzahl).toBeLessThanOrEqual(3);
    expect(a.flag).toBe(`FLAG{${ip}}`);
    expect(flagPruefe(a, ip)).toBe(true);
  });

  it("hat erfolgreiche Anmeldungen und die Tipps nennen die richtigen Zahlen", () => {
    expect(zeilen.filter((zeile) => zeile.includes("Accepted")).length).toBeGreaterThanOrEqual(5);
    expect(a.tipps[2]).toContain("16 fehlgeschlagene");
  });
});

describe("Aufgabe 4: Prüfsummen der Spiegel", () => {
  const a = aufgabe("flag-pruefsumme-spiegel");

  it("hat echt berechnete SHA-256-Konstanten", () => {
    expect(sha256(FLAG_DATEI_ORIGINAL)).toBe(FLAG_PRUEFSUMME_ORIGINAL);
    expect(sha256(FLAG_DATEI_MANIPULIERT)).toBe(FLAG_PRUEFSUMME_MANIPULIERT);
    // gleiche Länge, aber ein anderes Zeichen — und völlig anderer Fingerabdruck
    expect(Buffer.byteLength(FLAG_DATEI_ORIGINAL)).toBe(Buffer.byteLength(FLAG_DATEI_MANIPULIERT));
    expect(FLAG_PRUEFSUMME_ORIGINAL).not.toBe(FLAG_PRUEFSUMME_MANIPULIERT);
  });

  it("ist lösbar: genau ein Spiegel weicht von der offiziellen Prüfsumme ab", () => {
    const abschnitte = a.daten.split(/\n\n\n/);
    expect(abschnitte).toHaveLength(4);
    const offiziell = /\b[0-9a-f]{64}\b/.exec(abschnitte[0]!)![0];
    expect(offiziell).toBe(FLAG_PRUEFSUMME_ORIGINAL);

    const sumFuer = (abschnitt: string): string => {
      const certutil = /^(?:[0-9A-F]{2} ){31}[0-9A-F]{2}$/m.exec(abschnitt);
      return (certutil ? certutil[0].replace(/ /g, "") : /\b[0-9a-f]{64}\b/.exec(abschnitt)![0]).toLowerCase();
    };
    const spiegel = new Map<string, string>();
    for (const abschnitt of abschnitte.slice(1)) {
      const name = /^Spiegel ([ABC]) —/.exec(abschnitt)![1]!;
      spiegel.set(name, sumFuer(abschnitt));
    }
    expect([...spiegel.keys()]).toEqual(["A", "B", "C"]);
    const abweichend = [...spiegel].filter(([, summe]) => summe !== offiziell).map(([name]) => name);
    expect(abweichend).toEqual(["B"]);
    expect(a.flag).toBe(`FLAG{SPIEGEL_${abweichend[0]}}`);
    // die gelieferte Summe von B gehört wirklich zur manipulierten Datei
    expect(spiegel.get("B")).toBe(sha256(FLAG_DATEI_MANIPULIERT));
    expect(spiegel.get("A")).toBe(sha256(FLAG_DATEI_ORIGINAL));
    expect(spiegel.get("C")).toBe(sha256(FLAG_DATEI_ORIGINAL));
  });

  it("nennt in allen Abschnitten die tatsächliche Dateigröße", () => {
    const groesse = Buffer.byteLength(FLAG_DATEI_ORIGINAL);
    expect(a.daten.match(new RegExp(`${groesse} Byte`, "g"))).toHaveLength(4);
  });

  it("akzeptiert die englische Schreibweise MIRROR_B ebenfalls", () => {
    expect(flagPruefe(a, "FLAG{Mirror B}")).toBe(true);
    expect(flagPruefe(a, "flag{spiegel-b}")).toBe(true);
    expect(flagPruefe(a, "FLAG{SPIEGEL_C}")).toBe(false);
  });
});

describe("Aufgabe 5: Verdächtige Webanfrage", () => {
  it("ist lösbar: genau eine Zeile enthält nach dem Dekodieren einen Pfad-Traversal-Versuch", () => {
    const a = aufgabe("flag-weblog-pfad");
    const zeilen = a.daten.trim().split("\n");
    const treffer = zeilen
      .map((zeile) => /^(\S+) - - \[[^\]]+\] "(\S+) (\S+) [^"]+" (\d{3}) \d+$/.exec(zeile))
      .map((m, index) => {
        if (!m) throw new Error(`Zeile ${index + 1} hat nicht das erwartete Format`);
        const dekodiert = flagUrlDekodiere(m[3]!);
        return { ip: m[1]!, status: m[4]!, verdaechtig: dekodiert.ok && /\.\.\/.*etc\//.test(dekodiert.text) };
      })
      .filter((eintrag) => eintrag.verdaechtig);
    expect(treffer).toHaveLength(1);
    expect(a.flag).toBe(`FLAG{${treffer[0]!.ip}_${treffer[0]!.status}}`);
    // im Rohtext ist das Muster "../" nicht zu sehen — erst die Dekodierung zeigt es
    expect(a.daten).not.toContain("../");
  });
});

/** Die Zeilen einer Datenmenge als Liste (Leerzeilen am Ende entfernt). */
const zeilenVon = (a: FlagAufgabe): string[] => a.daten.replace(/\s+$/, "").split("\n");

describe("Aufgabe 6: Hex-Notiz", () => {
  const a = aufgabe("flag-hex-notiz");

  it("ist lösbar: der Hex-Block ergibt den Klartext mit dem Kennwort", () => {
    const hexZeilen = zeilenVon(a).filter((zeile) => /^(?:[0-9a-f]{2} ?)+$/.test(zeile));
    expect(hexZeilen.length).toBeGreaterThanOrEqual(3);
    const hex = hexZeilen.join(" ");
    const dekodiert = flagHexDekodiere(hex);
    expect(dekodiert.ok).toBe(true);
    const klartext = (dekodiert as { text: string }).text;
    // Gegenprobe mit Node
    expect(Buffer.from(hex.replace(/ /g, ""), "hex").toString("utf8")).toBe(klartext);
    const kennwort = /Kennwort (\S+)$/.exec(klartext)![1]!;
    expect(a.flag).toBe(`FLAG{${kennwort}}`);
    expect(flagPruefe(a, kennwort)).toBe(true);
  });

  it("liefert ein Hilfsmittel, das die Aufgabe tatsächlich löst", () => {
    expect(a.hilfsmittel).toEqual(["hex"]);
  });
});

describe("Aufgabe 7: Basic-Authentication im Mitschnitt", () => {
  const a = aufgabe("flag-basic-auth");

  it("ist lösbar: Base64 hinter „Basic“ ergibt benutzer:kennwort", () => {
    const treffer = a.daten.match(/^Authorization: Basic (\S+)$/gm);
    expect(treffer).toHaveLength(1);
    const kodiert = /^Authorization: Basic (\S+)$/m.exec(a.daten)![1]!;
    const dekodiert = flagBase64Dekodiere(kodiert);
    expect(dekodiert.ok).toBe(true);
    const zugang = (dekodiert as { text: string }).text;
    expect(Buffer.from(kodiert, "base64").toString("utf8")).toBe(zugang);
    expect(zugang).toMatch(/^[^:]+:[^:]+$/);
    expect(a.flag).toBe(`FLAG{${zugang}}`);
    expect(flagPruefe(a, zugang)).toBe(true);
  });

  it("zeigt zuerst die 401-Rückfrage des Servers und erst danach die Anfrage mit Zugangsdaten", () => {
    expect(a.daten.indexOf("401 Unauthorized")).toBeGreaterThan(-1);
    expect(a.daten.indexOf("401 Unauthorized")).toBeLessThan(a.daten.indexOf("Authorization: Basic"));
    expect(a.daten).toContain("Port 80");
  });
});

describe("Aufgabe 8: Offene Ports", () => {
  const a = aufgabe("flag-offene-ports");
  const zeilen = zeilenVon(a);
  const ports = zeilen
    .map((zeile) => /^(\d+)\/tcp\s+(open|filtered|closed)\s+(\S+)$/.exec(zeile))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ port: Number(m[1]), zustand: m[2]!, dienst: m[3]! }));

  it("ist lösbar: offene Ports ohne Bedarf des Webshops (nur 80 und 443 sind nötig) ergeben die Flag", () => {
    const noetig = [80, 443];
    const unnoetig = ports
      .filter((eintrag) => eintrag.zustand === "open" && !noetig.includes(eintrag.port))
      .map((eintrag) => eintrag.port)
      .sort((x, y) => x - y);
    expect(unnoetig).toEqual([21, 23]);
    expect(a.flag).toBe(`FLAG{${unnoetig.join("_")}}`);
    expect(flagPruefe(a, unnoetig.join("_"))).toBe(true);
  });

  it("ist eine stimmige nmap-artige Ausgabe (1000 geprüfte Ports, Dienste passend zu den Nummern)", () => {
    const nichtGezeigt = Number(/Not shown: (\d+) closed/.exec(a.daten)![1]);
    expect(nichtGezeigt + ports.length).toBe(1000);
    const erwartet: Record<number, string> = { 21: "ftp", 22: "ssh", 23: "telnet", 80: "http", 443: "https", 3306: "mysql", 3389: "ms-wbt-server" };
    for (const eintrag of ports) expect(eintrag.dienst).toBe(erwartet[eintrag.port]);
    // gefilterte Ports (Firewall) sind kein Fund — sie sind die Ablenkung
    expect(ports.filter((eintrag) => eintrag.zustand === "filtered").map((eintrag) => eintrag.port)).toEqual([22, 3306, 3389]);
  });
});

describe("Aufgabe 9: Passwort-Hashes", () => {
  const a = aufgabe("flag-passwort-hashes");
  const zeilen = zeilenVon(a)
    .map((zeile) => /^(\S+)\s+\| (\S+)$/.exec(zeile))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ benutzer: m[1]!, hash: m[2]! }));

  const einstufen = (hash: string): "argon2id" | "bcrypt" | "md5" | "sha1" | "sha256" | "unbekannt" => {
    if (/^\$argon2id\$v=19\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]{22}\$[A-Za-z0-9+/]{43}$/.test(hash)) return "argon2id";
    if (/^\$2b\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash)) return "bcrypt";
    if (/^[0-9a-f]{32}$/.test(hash)) return "md5";
    if (/^[0-9a-f]{40}$/.test(hash)) return "sha1";
    if (/^[0-9a-f]{64}$/.test(hash)) return "sha256";
    return "unbekannt";
  };

  it("ist lösbar: die schnellen, ungesalzenen Hashes gehören genau den Konten aus der Flag", () => {
    expect(zeilen).toHaveLength(9);
    for (const zeile of zeilen) expect(einstufen(zeile.hash)).not.toBe("unbekannt");
    const schwach = zeilen
      .filter((zeile) => ["md5", "sha1", "sha256"].includes(einstufen(zeile.hash)))
      .map((zeile) => zeile.benutzer)
      .sort();
    expect(schwach).toEqual(["ckoenig", "druckdienst", "rlang", "tbrandt"]);
    expect(a.flag).toBe(`FLAG{${schwach.join("_")}}`);
    expect(flagPruefe(a, schwach.join("_"))).toBe(true);
    // die übrigen fünf sind moderne Verfahren
    const sicher = zeilen.filter((zeile) => ["argon2id", "bcrypt"].includes(einstufen(zeile.hash)));
    expect(sicher).toHaveLength(5);
  });

  it("zeigt zwei Konten mit identischem Hash (gleiches Kennwort, kein Salz) und echte Hash-Werte", () => {
    const md5 = zeilen.filter((zeile) => einstufen(zeile.hash) === "md5");
    expect(md5.map((zeile) => zeile.hash)).toEqual([md5[0]!.hash, md5[0]!.hash]);
    const hashVon = (benutzer: string) => zeilen.find((zeile) => zeile.benutzer === benutzer)!.hash;
    // erfundene Kennwörter, deren Hashes hier stehen — die Werte sind also echt berechnet
    expect(createHash("md5").update("Sommer2026").digest("hex")).toBe(hashVon("ckoenig"));
    expect(createHash("md5").update("Sommer2026").digest("hex")).toBe(hashVon("druckdienst"));
    expect(createHash("sha1").update("Nordlicht!23").digest("hex")).toBe(hashVon("tbrandt"));
    expect(createHash("sha256").update("Hartmann#2024").digest("hex")).toBe(hashVon("rlang"));
    // bcrypt-/Argon2-Zeilen sind (erfundene) Strings, aber alle verschieden — also gesalzen
    const sichereHashes = zeilen.filter((zeile) => ["argon2id", "bcrypt"].includes(einstufen(zeile.hash))).map((zeile) => zeile.hash);
    expect(new Set(sichereHashes).size).toBe(sichereHashes.length);
  });
});

describe("Aufgabe 10: Phishing-Header", () => {
  const a = aufgabe("flag-phishing-header");

  it("ist lösbar: die von mx.brevanta.example eingetragene Einlieferer-IP stimmt mit dem SPF-Ergebnis überein", () => {
    // Fortsetzungszeilen (eingerückt) an die vorige Zeile hängen
    const felder = a.daten.replace(/\n[ \t]+/g, " ").split("\n").filter((zeile) => zeile.trim() !== "");
    const empfangen = felder.filter((zeile) => zeile.startsWith("Received:"));
    expect(empfangen).toHaveLength(3);
    // eigener Server (mx.brevanta.example) hat die Zeile eingetragen: "by mx.brevanta.example" — Absender-IP in der "from"-Klammer
    const eigene = empfangen.find((zeile) => /\bby mx\.brevanta\.example\b/.test(zeile))!;
    const einlieferer = /^Received: from \S+ \(unknown \[(\d+\.\d+\.\d+\.\d+)\]\)/.exec(eigene)![1]!;
    const spf = felder.find((zeile) => zeile.startsWith("Authentication-Results:"))!;
    expect(spf).toMatch(/spf=fail/);
    expect(spf).toMatch(/dkim=none/);
    expect(spf).toMatch(/dmarc=fail/);
    expect(/does not designate (\d+\.\d+\.\d+\.\d+) as permitted sender/.exec(spf)![1]).toBe(einlieferer);
    expect(a.flag).toBe(`FLAG{${einlieferer}}`);
    expect(flagPruefe(a, einlieferer)).toBe(true);
  });

  it("enthält eine fälschbare Ablenkung (X-Originating-IP), die nicht zur Lösung führt", () => {
    const ablenkung = /^X-Originating-IP: \[([^\]]+)\]/m.exec(a.daten)![1]!;
    expect(a.flag).not.toContain(ablenkung);
    expect(flagPruefe(a, ablenkung)).toBe(false);
    // Anzeigename und Absenderdomain behaupten Rheinwerk — der Mailserver gehört aber zu einer anderen Domain
    expect(a.daten).toMatch(/^From: .*<buchhaltung@rheinwerk-maschinen\.example>/m);
    expect(a.daten).toContain("mail-out.billing-service.example");
  });
});

describe("Aufgabe 11: JWT-Token im Debug-Log", () => {
  const a = aufgabe("flag-jwt-token");
  const geheimnis = "brevanta-demo-signaturschluessel"; // erfundener Signaturschlüssel, nicht Teil der Aufgabendaten
  const tokens = [...a.daten.matchAll(/Bearer (\S+)/g)].map((m) => m[1]!);

  it("enthält zwei dreiteilige Tokens mit gültiger HS256-Signatur", () => {
    expect(tokens).toHaveLength(2);
    for (const token of tokens) {
      const teile = token.split(".");
      expect(teile).toHaveLength(3);
      const kopf = JSON.parse(Buffer.from(teile[0]!, "base64url").toString("utf8"));
      expect(kopf).toEqual({ alg: "HS256", typ: "JWT" });
      const signatur = createHmac("sha256", geheimnis).update(`${teile[0]}.${teile[1]}`).digest("base64url");
      expect(teile[2]).toBe(signatur);
      // Base64URL ohne Auffüllzeichen und ohne + oder /
      expect(token).toMatch(/^[A-Za-z0-9_.-]+$/);
    }
  });

  it("ist lösbar: genau ein Token trägt neben den Standardangaben ein zusätzliches Kennwort-Feld", () => {
    const standard = ["iss", "sub", "rolle", "iat", "exp"];
    const mitZusatz = tokens
      .map((token) => {
        const nutzdaten = token.split(".")[1]!;
        // das Hilfsmittel (Base64-Dekodierer) liest URL-sicheres Base64 genauso wie Node
        const ergebnis = flagBase64Dekodiere(nutzdaten);
        expect(ergebnis.ok).toBe(true);
        const json = JSON.parse((ergebnis as { text: string }).text) as Record<string, string | number>;
        expect(JSON.stringify(json)).toBe(Buffer.from(nutzdaten, "base64url").toString("utf8"));
        expect(json.exp as number).toBeGreaterThan(json.iat as number);
        return Object.entries(json).filter(([schluessel]) => !standard.includes(schluessel));
      })
      .filter((zusaetze) => zusaetze.length > 0);
    expect(mitZusatz).toHaveLength(1);
    expect(mitZusatz[0]).toHaveLength(1);
    const [feld, wert] = mitZusatz[0]![0]!;
    expect(feld).toBe("wartung_zugang");
    expect(a.flag).toBe(`FLAG{${wert}}`);
    expect(flagPruefe(a, String(wert))).toBe(true);
  });
});

describe("Aufgabe 12: sshd_config — der erste Wert gilt", () => {
  const a = aufgabe("flag-sshd-reihenfolge");
  const direktiven = zeilenVon(a)
    .map((zeile) => zeile.trim())
    .filter((zeile) => zeile !== "" && !zeile.startsWith("#"))
    .map((zeile) => {
      const m = /^(\S+)\s+(.+)$/.exec(zeile)!;
      return { name: m[1]!, wert: m[2]! };
    });

  /** Auswertung wie beim sshd: pro Einstellung zählt der erste Treffer; `letzte` = die (hier falsche) Gegenprobe. */
  function wirksam(erste: boolean): Map<string, string> {
    const karte = new Map<string, string>();
    for (const eintrag of direktiven) if (!erste || !karte.has(eintrag.name)) karte.set(eintrag.name, eintrag.wert);
    return karte;
  }
  const unsicher = (karte: Map<string, string>): string[] => {
    const liste: string[] = [];
    if (!["no", "prohibit-password"].includes(karte.get("PermitRootLogin") ?? "")) liste.push("PermitRootLogin");
    if (karte.get("PasswordAuthentication") !== "no") liste.push("PasswordAuthentication");
    if (karte.get("PermitEmptyPasswords") !== "no") liste.push("PermitEmptyPasswords");
    if (Number(karte.get("MaxAuthTries")) > 6) liste.push("MaxAuthTries");
    return liste.sort();
  };

  it("ist lösbar: nach der Regel „erster Wert gilt“ sind genau drei Einstellungen unsicher", () => {
    const ergebnis = unsicher(wirksam(true));
    expect(ergebnis).toEqual(["MaxAuthTries", "PasswordAuthentication", "PermitRootLogin"]);
    expect(a.flag).toBe(`FLAG{${ergebnis.join("_")}}`);
    expect(flagPruefe(a, ergebnis.join("_"))).toBe(true);
  });

  it("ist eine Falle: wertete man (fälschlich) den letzten Wert aus, wäre alles sicher", () => {
    expect(unsicher(wirksam(false))).toEqual([]);
    // auskommentierte Zeilen zählen nicht: ohne Kommentar-Filter käme das auskommentierte prohibit-password zuerst
    expect(a.daten).toContain("#PermitRootLogin prohibit-password");
    // PermitEmptyPasswords kommt nur einmal vor
    expect(direktiven.filter((eintrag) => eintrag.name === "PermitEmptyPasswords")).toHaveLength(1);
  });
});

describe("Aufgabe 13: DNS-Tunneling", () => {
  const a = aufgabe("flag-dns-tunnel");
  const anfragen = zeilenVon(a)
    .map((zeile) => /^(\d\d:\d\d:\d\d)\s+(\S+)\s+(\S+)\s+(\S+)$/.exec(zeile))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ zeit: m[1]!, client: m[2]!, typ: m[3]!, name: m[4]! }));
  const labelsVon = (name: string) => name.split(".");

  /** Gruppiert die Anfragen mit einem langen Namensteil (≥ 32 Zeichen) nach Client und Domain (letzte drei Teile). */
  function auffaellig() {
    const gruppen = new Map<string, typeof anfragen>();
    for (const anfrage of anfragen) {
      if (!labelsVon(anfrage.name).some((label) => label.length >= 32)) continue;
      const domain = labelsVon(anfrage.name).slice(-3).join(".");
      const schluessel = `${anfrage.client} ${domain}`;
      gruppen.set(schluessel, [...(gruppen.get(schluessel) ?? []), anfrage]);
    }
    return [...gruppen].filter(([, liste]) => liste.length >= 5);
  }

  it("hat einen realistischen Umfang und gültige DNS-Namen (Teile höchstens 63 Zeichen, Name höchstens 253)", () => {
    expect(anfragen.length).toBeGreaterThanOrEqual(15);
    for (const anfrage of anfragen) {
      expect(anfrage.name.length).toBeLessThanOrEqual(253);
      for (const label of labelsVon(anfrage.name)) expect(label.length).toBeLessThanOrEqual(63);
    }
    // Zeitstempel sind nicht rückwärts
    const zeiten = anfragen.map((anfrage) => anfrage.zeit);
    expect(zeiten).toEqual([...zeiten].sort());
  });

  it("ist lösbar: genau ein Client/Domain-Paar tunnelt; sortiert, ohne Wiederholungen und dekodiert ergibt es das Codewort", () => {
    const funde = auffaellig();
    expect(funde).toHaveLength(1);
    const [schluessel, liste] = funde[0]!;
    expect(schluessel).toBe("10.20.4.37 update-sync.example.net");
    expect(liste.length).toBe(6);
    expect(liste.every((anfrage) => anfrage.typ === "TXT")).toBe(true);

    // je Nummer nur ein Teil (Wiederholungen müssen identisch sein), nach Nummer sortiert
    const teile = new Map<string, string>();
    for (const anfrage of liste) {
      const [nummer, hex] = labelsVon(anfrage.name);
      expect(nummer).toMatch(/^\d\d$/);
      expect(hex).toMatch(/^(?:[0-9a-f]{2})+$/);
      if (teile.has(nummer!)) expect(teile.get(nummer!)).toBe(hex);
      teile.set(nummer!, hex!);
    }
    expect([...teile.keys()].sort()).toEqual(["01", "02", "03", "04"]);
    const hex = [...teile.keys()].sort().map((nummer) => teile.get(nummer)!).join("");
    const dekodiert = flagHexDekodiere(hex);
    expect(dekodiert.ok).toBe(true);
    const nachricht = (dekodiert as { text: string }).text;
    expect(Buffer.from(hex, "hex").toString("utf8")).toBe(nachricht);
    const codewort = /Codewort: (\w+)\./.exec(nachricht)![1]!;
    expect(a.flag).toBe(`FLAG{${codewort}}`);
    expect(flagPruefe(a, codewort)).toBe(true);
    // in der Reihenfolge des Protokolls wäre die Nachricht unlesbar
    const protokollhex = liste.map((anfrage) => labelsVon(anfrage.name)[1]!).join("");
    expect(protokollhex).not.toBe(hex);
  });

  it("enthält eine harmlose Ablenkung (kurzer Hex-Name eines Content-Delivery-Netzes) und normale Anfragen", () => {
    const cdn = anfragen.filter((anfrage) => anfrage.name.endsWith(".cdn.example.org"));
    expect(cdn).toHaveLength(1);
    expect(labelsVon(cdn[0]!.name)[0]).toMatch(/^[0-9a-f]{20}$/);
    expect(anfragen.filter((anfrage) => !anfrage.name.includes("update-sync")).length).toBeGreaterThanOrEqual(9);
  });
});

describe("Aufgabe 14: Mehrstufiger Funkspruch (Base64, dann XOR)", () => {
  const a = aufgabe("flag-mehrstufig-funkspruch");

  /** Der Base64-Block: alle Zeilen nach der ersten Leerzeile. */
  const block = a.daten.split("\n\n")[1]!.replace(/\s+/g, "");

  it("ist lösbar: Base64 liefert die Anleitung samt Hex, XOR mit dem Schlüssel aus der Absenderadresse das Codewort", () => {
    const stufe1 = flagBase64Dekodiere(block);
    expect(stufe1.ok).toBe(true);
    const text1 = (stufe1 as { text: string }).text;
    expect(Buffer.from(block, "base64").toString("utf8")).toBe(text1);
    expect(text1).toContain("XOR");
    const hex = /Hex: ([0-9a-f]+)$/.exec(text1)![1]!;

    // Schlüssel laut Anleitung: Teil der Absenderadresse hinter dem @ bis zum ersten Punkt
    const schluessel = /^Von:\s+\S+@([^.\s]+)\./m.exec(a.daten)![1]!;
    expect(schluessel).toBe("brevanta");

    // unabhängige Gegenrechnung ohne die Hilfsfunktion: byteweise XOR mit dem wiederholten Schlüssel
    const bytes = Buffer.from(hex, "hex");
    const schluesselBytes = Buffer.from(schluessel, "utf8");
    const klar = Buffer.alloc(bytes.length);
    for (let i = 0; i < bytes.length; i++) klar[i] = bytes[i]! ^ schluesselBytes[i % schluesselBytes.length]!;
    expect(klar.toString("utf8")).toBe("Codewort fuer das Wartungsfenster: Nebelhorn");

    expect(flagXorHex(hex, schluessel)).toEqual({ ok: true, text: klar.toString("utf8") });
    const codewort = /Wartungsfenster: (\w+)$/.exec(klar.toString("utf8"))![1]!;
    expect(a.flag).toBe(`FLAG{${codewort}}`);
    expect(flagPruefe(a, codewort)).toBe(true);
  });

  it("scheitert mit falschem Schlüssel (Groß-/Kleinschreibung zählt) und liefert beide benötigten Hilfsmittel", () => {
    const hex = /Hex: ([0-9a-f]+)$/.exec((flagBase64Dekodiere(block) as { text: string }).text)![1]!;
    const falsch = flagXorHex(hex, "Brevanta");
    expect(falsch.ok && falsch.text === "Codewort fuer das Wartungsfenster: Nebelhorn").toBe(false);
    expect(a.hilfsmittel).toEqual(["base64", "xor"]);
  });
});

describe("Hex und XOR", () => {
  it("dekodiert Hex in verschiedenen Schreibweisen", () => {
    expect(flagHexDekodiere("48 61 6c 6c 6f")).toEqual({ ok: true, text: "Hallo" });
    expect(flagHexDekodiere("48616C6C6F")).toEqual({ ok: true, text: "Hallo" });
    expect(flagHexDekodiere("48:61:6c:6c:6f")).toEqual({ ok: true, text: "Hallo" });
    expect(flagHexDekodiere("0x48 0x61 0x6c 0x6c 0x6f")).toEqual({ ok: true, text: "Hallo" });
    expect(flagHexDekodiere("  48 61\n6c 6c\t6f  ")).toEqual({ ok: true, text: "Hallo" });
    expect(flagHexDekodiere("c3 bc")).toEqual({ ok: true, text: "ü" });
  });

  it("meldet ungültige Eingaben verständlich", () => {
    for (const falsch of ["", "   ", "4", "abc", "zz", "48 6g", "ff fe", "c3"]) {
      const ergebnis = flagHexDekodiere(falsch);
      expect(ergebnis.ok).toBe(false);
      if (!ergebnis.ok) expect(ergebnis.fehler.length).toBeGreaterThan(10);
    }
  });

  it("XOR ist seine eigene Umkehrung (mit wiederholtem Schlüssel)", () => {
    const klartext = "Brevanta IT-Systemhaus GmbH";
    const schluessel = "kx9";
    const bytes = Buffer.from(klartext, "utf8");
    const schluesselBytes = Buffer.from(schluessel, "utf8");
    const verschluesselt = Buffer.alloc(bytes.length);
    for (let i = 0; i < bytes.length; i++) verschluesselt[i] = bytes[i]! ^ schluesselBytes[i % schluesselBytes.length]!;
    expect(flagXorHex(verschluesselt.toString("hex"), schluessel)).toEqual({ ok: true, text: klartext });
    expect(flagXorHex(verschluesselt.toString("hex"), `  ${schluessel} `)).toEqual({ ok: true, text: klartext });
  });

  it("meldet fehlenden Schlüssel, ungültiges Hex und unlesbare Ergebnisse", () => {
    expect(flagXorHex("48 61", "").ok).toBe(false);
    expect(flagXorHex("48 61", "   ").ok).toBe(false);
    expect(flagXorHex("xyz", "a").ok).toBe(false);
    expect(flagXorHex("48", "ÿ").ok).toBe(false); // 0x48 ^ 0xC3 = 0x8B ist kein gültiges UTF-8
  });
});

describe("flagNormalisiere / flagPruefe", () => {
  const a = { flag: "FLAG{Schlüssel2024}" };

  it("akzeptiert die Flag mit und ohne Rahmen", () => {
    expect(flagPruefe(a, "FLAG{Schlüssel2024}")).toBe(true);
    expect(flagPruefe(a, "Schlüssel2024")).toBe(true);
    expect(flagPruefe(a, "FLAG{Schlüssel2024")).toBe(true);
    expect(flagPruefe(a, "FLAG {Schlüssel2024}")).toBe(true);
  });

  it("ignoriert Groß-/Kleinschreibung und Leerzeichen am Rand", () => {
    expect(flagPruefe(a, "  flag{schlüssel2024}  ")).toBe(true);
    expect(flagPruefe(a, "\tSCHLÜSSEL2024\n")).toBe(true);
    expect(flagPruefe(a, " FLAG{ Schlüssel2024 } ")).toBe(true);
  });

  it("akzeptiert ue statt ü und ss statt ß", () => {
    expect(flagPruefe(a, "FLAG{Schluessel2024}")).toBe(true);
    expect(flagPruefe({ flag: "FLAG{Fuß}" }, "FLAG{Fuss}")).toBe(true);
  });

  it("weist falsche, leere und fast richtige Eingaben ab", () => {
    expect(flagPruefe(a, "")).toBe(false);
    expect(flagPruefe(a, "   ")).toBe(false);
    expect(flagPruefe(a, "FLAG{}")).toBe(false);
    expect(flagPruefe(a, "FLAG")).toBe(false);
    expect(flagPruefe(a, "FLAG{Schlüssel2025}")).toBe(false);
    expect(flagPruefe(a, "FLAG{Schlüssel2024}x")).toBe(false);
    expect(flagPruefe(a, "FLAG{Schlüssel 2024}")).toBe(false);
    expect(flagPruefe(a, "Schlüssel")).toBe(false);
  });

  it("behandelt Leerzeichen, Bindestrich und Unterstrich gleich und behält Punkte", () => {
    expect(flagNormalisiere("FLAG{Mirror B}")).toBe("mirror_b");
    expect(flagNormalisiere("FLAG{mirror-b}")).toBe("mirror_b");
    expect(flagNormalisiere("203.0.113.77")).toBe("203.0.113.77");
    expect(flagPruefe({ flag: "FLAG{203.0.113.77}" }, "FLAG{203_0_113_77}")).toBe(false);
  });

  it("jede hinterlegte Flag besteht ihre eigene Prüfung, aber nicht die der anderen Aufgaben", () => {
    for (const eintrag of FLAG_AUFGABEN) {
      expect(flagPruefe(eintrag, eintrag.flag)).toBe(true);
      for (const andere of FLAG_AUFGABEN) if (andere !== eintrag) expect(flagPruefe(andere, eintrag.flag)).toBe(false);
    }
  });
});

describe("Base64", () => {
  it("kodiert und dekodiert Standardfälle wie Node", () => {
    for (const text of ["", "f", "fo", "foo", "foob", "fooba", "foobar", "Hallo Welt!", "a?b>c~"]) {
      expect(flagBase64Kodiere(text)).toBe(Buffer.from(text, "utf8").toString("base64"));
      if (text !== "") expect(flagBase64Dekodiere(flagBase64Kodiere(text))).toEqual({ ok: true, text });
    }
  });

  it("behandelt Umlaute, ß, Euro-Zeichen und Emojis (UTF-8)", () => {
    for (const text of ["äöüÄÖÜß", "Größe: 5 € — fertig", "Prüfung 🎉 bestanden", "日本語"]) {
      const kodiert = flagBase64Kodiere(text);
      expect(kodiert).toBe(Buffer.from(text, "utf8").toString("base64"));
      expect(flagBase64Dekodiere(kodiert)).toEqual({ ok: true, text });
    }
  });

  it("toleriert Leerraum, fehlendes Auffüllen und die URL-sichere Schreibweise", () => {
    expect(flagBase64Dekodiere("  U2NobMO8\nc3NlbDIwMjQ=  ")).toEqual({ ok: true, text: "Schlüssel2024" });
    expect(flagBase64Dekodiere("U2NobMO8c3NlbDIwMjQ")).toEqual({ ok: true, text: "Schlüssel2024" });
    expect(flagBase64Dekodiere("Pz8_")).toEqual({ ok: true, text: "???" }); // "Pz8/" in URL-sicherer Schreibweise
    expect(flagBase64Dekodiere("Pj4-")).toEqual({ ok: true, text: ">>>" }); // "Pj4+"
  });

  it("meldet ungültige Eingaben verständlich", () => {
    for (const falsch of ["", "   ", "Hallo Welt!", "####", "A", "ABCDE"]) {
      const ergebnis = flagBase64Dekodiere(falsch);
      expect(ergebnis.ok).toBe(false);
      if (!ergebnis.ok) expect(ergebnis.fehler.length).toBeGreaterThan(10);
    }
  });

  it("meldet Bytefolgen, die kein UTF-8 sind", () => {
    // 0xFF 0xFE ist kein gültiges UTF-8
    const ergebnis = flagBase64Dekodiere(Buffer.from([0xff, 0xfe, 0xfd]).toString("base64"));
    expect(ergebnis.ok).toBe(false);
    // abgeschnittene Mehrbyte-Folge (nur das erste Byte von "ü")
    expect(flagBase64Dekodiere(Buffer.from([0xc3]).toString("base64")).ok).toBe(false);
    // überlange Kodierung von "/" (0xC0 0xAF) ist unzulässig
    expect(flagBase64Dekodiere(Buffer.from([0xc0, 0xaf]).toString("base64")).ok).toBe(false);
  });
});

describe("Caesar", () => {
  it("verschiebt Buchstaben und erhält Groß-/Kleinschreibung und Sonderzeichen", () => {
    expect(flagCaesar("Hallo, Welt 42!", 3)).toBe("Kdoor, Zhow 42!");
    expect(flagCaesar("xyz XYZ", 3)).toBe("abc ABC");
    expect(flagCaesar("Größe", 1)).toBe("Hsößf"); // Umlaute und ß bleiben, nur G, r, e werden verschoben
  });

  it("ist umkehrbar und modulo 26", () => {
    const text = "Brevanta IT-Systemhaus GmbH, Nordlicht Logistik AG!";
    for (let n = -30; n <= 30; n++) expect(flagCaesar(flagCaesar(text, n), -n)).toBe(text);
    expect(flagCaesar(text, 26)).toBe(text);
    expect(flagCaesar(text, 0)).toBe(text);
    expect(flagCaesar(text, 27)).toBe(flagCaesar(text, 1));
    expect(flagCaesar(text, -1)).toBe(flagCaesar(text, 25));
  });

  it("gibt den Klassiker ROT13 wieder", () => {
    expect(flagCaesar("Hello", 13)).toBe("Uryyb");
  });
});

describe("URL-Dekodierung", () => {
  it("löst %XX auf, auch UTF-8", () => {
    expect(flagUrlDekodiere("..%2F..%2Fetc%2Fpasswd")).toEqual({ ok: true, text: "../../etc/passwd" });
    expect(flagUrlDekodiere("pr%C3%BCfung%20final")).toEqual({ ok: true, text: "prüfung final" });
  });

  it("meldet ungültige Kodierungen", () => {
    expect(flagUrlDekodiere("%E0%A4%A").ok).toBe(false);
    expect(flagUrlDekodiere("100%").ok).toBe(false);
    expect(flagUrlDekodiere("  ").ok).toBe(false);
  });
});
