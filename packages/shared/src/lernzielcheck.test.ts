import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import { pruefeLernziel, schlageBereichVor, UEBUNGSZIELE, zieheUebungsrunde, type CheckKriterium } from "./lernzielcheck";

function status(text: string, bereich: "" | "kognitiv" | "affektiv" | "psychomotorisch" = "") {
  return Object.fromEntries(pruefeLernziel(text, bereich).map((eintrag) => [eintrag.kriterium, eintrag.erfuellt])) as Record<CheckKriterium, boolean>;
}

describe("pruefeLernziel (Heuristiken, W-AEV-02)", () => {
  it("leere Eingabe ergibt keine Hinweise", () => {
    expect(pruefeLernziel("   ", "")).toEqual([]);
  });

  it("ein vollständig formuliertes Feinziel erfüllt alle Kriterien", () => {
    const text = "Der Auszubildende bohrt mit der Ständerbohrmaschine ein Loch von 8 mm Durchmesser rechtwinklig in ein Flachstahlstück, die Abweichung beträgt höchstens 0,5 mm.";
    expect(Object.values(status(text, "psychomotorisch")).every(Boolean)).toBe(true);
  });

  it("erkennt nicht überprüfbare Verben in verschiedenen Formen", () => {
    for (const text of ["Der Auszubildende weiß, wie ein Schraubendreher benutzt wird.", "Die Auszubildende kennt die Regeln.", "Er soll die Abläufe verstehen und begreifen.", "Sie lernt sorgfältig zu arbeiten."]) {
      expect(status(text).Überprüfbarkeit, text).toBe(false);
    }
    // „erkennt“ ist kein Treffer für „kennt“, „kennzeichnet“ keiner für „kennen“.
    expect(status("Der Auszubildende erkennt am Messwert einen Fehler.").Überprüfbarkeit).toBe(true);
    expect(status("Die Auszubildende kennzeichnet die Leitungen mit Schildern.").Überprüfbarkeit).toBe(true);
  });

  it("zeigt „Überprüfbarkeit“ nicht als erfüllt, wenn kein Tätigkeitsverb erkannt wurde (UXT-B-19)", () => {
    expect(status("asdf qwer").Überprüfbarkeit).toBe(false);
    expect(status("Der Auszubildende ist ein guter Mitarbeiter im Betrieb des Unternehmens heute.").Überprüfbarkeit).toBe(false);
    expect(status("Die Auszubildende beschreibt den Ablauf.").Überprüfbarkeit).toBe(true);
  });

  it("meldet fehlendes Tätigkeitsverb, fehlende Bedingung und fehlenden Maßstab", () => {
    const ergebnis = status("Der Auszubildende ist ein guter Mitarbeiter im Betrieb des Unternehmens heute.");
    expect(ergebnis.Tätigkeitsverb).toBe(false);
    expect(ergebnis.Bedingung).toBe(false); // „Mitarbeiter“ zählt nicht als „mit“
    expect(ergebnis.Maßstab).toBe(false);
  });

  it("Bedingung und Maßstab werden an Wörtern und Zahlen erkannt", () => {
    expect(status("Die Auszubildende beschreibt anhand einer Skizze den Ablauf.").Bedingung).toBe(true);
    expect(status("Die Auszubildende beschreibt den Ablauf fehlerfrei.").Maßstab).toBe(true);
    expect(status("Die Auszubildende nennt drei Beispiele.").Maßstab).toBe(true);
  });

  it("Lernzielbereich: Vorschlag aus dem Verb, Hinweis bei Widerspruch zur Wahl", () => {
    expect(schlageBereichVor("Der Auszubildende bohrt ein Loch.")).toEqual({ bereich: "psychomotorisch", verb: "bohrt" });
    expect(schlageBereichVor("Die Auszubildende beschreibt den Ablauf.")?.bereich).toBe("kognitiv");
    expect(schlageBereichVor("Der Auszubildende beachtet die Regeln.")?.bereich).toBe("affektiv");
    expect(schlageBereichVor("Das ist ein Satz ohne passendes Verb.")).toBeNull();
    expect(status("Der Auszubildende bohrt ein Loch.", "kognitiv").Lernzielbereich).toBe(false);
    expect(status("Der Auszubildende bohrt ein Loch.", "psychomotorisch").Lernzielbereich).toBe(true);
    expect(status("Der Auszubildende bohrt ein Loch.", "").Lernzielbereich).toBe(false);
  });

  it("Umfang: mehrere Handlungen und zu kurze Ziele werden gemeldet", () => {
    expect(status("Die Auszubildende bohrt Löcher und entgratet sie und misst sie anschließend nach.").Umfang).toBe(false);
    expect(status("Die Auszubildende bohrt ein Loch.").Umfang).toBe(false);
    expect(status("Die Auszubildende begrüßt Kundinnen und Kunden freundlich mit Blickkontakt.").Umfang).toBe(true);
  });
});

describe("Übungsziele", () => {
  it("haben eindeutige Kennungen und vollständige Angaben", () => {
    expect(new Set(UEBUNGSZIELE.map((ziel) => ziel.id)).size).toBe(UEBUNGSZIELE.length);
    for (const ziel of UEBUNGSZIELE) {
      expect(ziel.erklaerung.length, ziel.id).toBeGreaterThan(20);
      if (ziel.pruefbar) expect(ziel.bereich, ziel.id).toBeDefined();
      else expect(ziel.besser, ziel.id).toBeDefined();
    }
    expect(UEBUNGSZIELE.filter((ziel) => ziel.pruefbar).length).toBeGreaterThanOrEqual(8);
    expect(UEBUNGSZIELE.filter((ziel) => !ziel.pruefbar).length).toBeGreaterThanOrEqual(6);
  });

  it("die Heuristik des Checks stimmt mit der Lösung der Übung überein (überprüfbar, Bereich)", () => {
    for (const ziel of UEBUNGSZIELE) {
      const ergebnis = status(ziel.text);
      expect(ergebnis.Überprüfbarkeit, `Überprüfbarkeit ${ziel.id}`).toBe(ziel.pruefbar);
      if (ziel.pruefbar) {
        expect(ergebnis.Tätigkeitsverb, `Verb ${ziel.id}`).toBe(true);
        expect(schlageBereichVor(ziel.text)?.bereich, `Bereich ${ziel.id}`).toBe(ziel.bereich);
      }
    }
  });

  it("die verbesserten Fassungen sind für den Check überprüfbar", () => {
    for (const ziel of UEBUNGSZIELE.filter((eintrag) => !eintrag.pruefbar)) {
      const ergebnis = status(ziel.besser!);
      expect(ergebnis.Überprüfbarkeit, `besser ${ziel.id}`).toBe(true);
      expect(ergebnis.Tätigkeitsverb, `besser ${ziel.id}`).toBe(true);
    }
  });

  it("eine Runde hat fünf verschiedene Ziele mit beiden Arten, ist mit gleichem Seed gleich und deckt über viele Runden alle Ziele ab", () => {
    const zufall = createSeededRandom(5);
    const gesehen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const runde = zieheUebungsrunde(zufall);
      expect(runde).toHaveLength(5);
      expect(new Set(runde.map((ziel) => ziel.id)).size).toBe(5);
      expect(runde.filter((ziel) => ziel.pruefbar).length).toBeGreaterThanOrEqual(2);
      expect(runde.filter((ziel) => !ziel.pruefbar).length).toBeGreaterThanOrEqual(2);
      for (const ziel of runde) gesehen.add(ziel.id);
    }
    expect(gesehen.size).toBe(UEBUNGSZIELE.length);
    expect(zieheUebungsrunde(createSeededRandom(2))).toEqual(zieheUebungsrunde(createSeededRandom(2)));
  });
});
