import { createHash } from "node:crypto";
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
  flagNormalisiere,
  flagPruefe,
  flagUrlDekodiere,
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
    expect(FLAG_AUFGABEN.length).toBeGreaterThanOrEqual(4);
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
