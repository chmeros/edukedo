import { angebotSpiel } from "@edukedo/shared";
import { lazy, useEffect, useState } from "react";
import {
  BelegDetektivIllustration,
  BugHuntIllustration,
  CodeReihenfolgeIllustration,
  KennzahlenDuellIllustration,
  KreuzwortraetselIllustration,
  MemoryIllustration,
  PhishingIllustration,
  ProzessReihenfolgeIllustration,
  RechensprintIllustration,
  SubnettingIllustration,
  TroubleshootingIllustration,
  ZahlensystemeIllustration,
} from "./GameIllustrations";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

// Review WEB-22: Die Spiele werden erst beim Start eines Spiels geladen (Spiele.tsx liegt selbst in einem eigenen Chunk).
const KennzahlenDuell = lazy(() => import("./KennzahlenDuell").then((modul) => ({ default: modul.KennzahlenDuell })));
const Kreuzwortraetsel = lazy(() => import("./Kreuzwortraetsel").then((modul) => ({ default: modul.Kreuzwortraetsel })));
const PersonalkennzahlenMemory = lazy(() => import("./PersonalkennzahlenMemory").then((modul) => ({ default: modul.PersonalkennzahlenMemory })));
const BelegDetektiv = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.BelegDetektiv })));
const BugHunt = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.BugHunt })));
const CodeReihenfolge = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.CodeReihenfolge })));
const PhishingDetektiv = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.PhishingDetektiv })));
const ProzessReihenfolge = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.ProzessReihenfolge })));
const SprintSpiel = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.SprintSpiel })));
const TroubleshootingDetektiv = lazy(() => import("./WeitereSpiele").then((modul) => ({ default: modul.TroubleshootingDetektiv })));

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung
 * Abschnitt 13): Spiele-Katalog — exakt nach dem `Instrumente.tsx`-Muster (F-105): die Spieltypen
 * sind hier bewusst als STATISCHE Liste hinterlegt (feste, im Code bekannte Menge),
 * `game.available` liefert, welche Spiele (und Sets) in diesem Kurs tatsächlich Content haben.
 *
 * Nutzer-Vorgabe vom 28.09.2026: Kacheln statt Listenzeilen (siehe GameIllustrations.tsx; seit F-144
 * über die gemeinsame `Tile`-Komponente), sowie
 * `onActiveGameChange` — meldet an `App.tsx`, ob gerade ein Spiel läuft, damit der darunter
 * gerenderte Sozial-Bereich (`Sozial.tsx`) während eines laufenden Spiels ausgeblendet werden
 * kann (Fokus aufs Spiel).
 *
 * F-158 (Nutzer-Vorgabe vom 05.10.2026): sechs weitere Spieltypen und mehrere Sets je Typ — jede
 * Kachel steht für eine Zeile aus `game.available` (Typ + Set + Titel aus der Datenbank); Typen
 * ohne Spiel im Kurs stehen eingeklappt unter „Weitere Spiele".
 */
const GAME_CATALOG = [
  {
    type: "kreuzwortraetsel",
    label: "Kreuzworträtsel",
    description: "Zehn wichtige Fachbegriffe anhand kurzer Hinweise im Gitter erkennen.",
    Illustration: KreuzwortraetselIllustration,
  },
  {
    type: "kennzahlen_duell",
    label: "Duell",
    description: "In kurzen Entweder-oder-Duellen ähnliche Begriffe sicher unterscheiden.",
    Illustration: KennzahlenDuellIllustration,
  },
  {
    type: "memory",
    label: "Memory",
    description: "Begriffe und ihre Bedeutung als Karten-Paare zuordnen.",
    Illustration: MemoryIllustration,
  },
  {
    type: "phishing",
    label: "Phishing-Detektiv",
    description: "E-Mails prüfen, verdächtige Merkmale markieren und echte Mails von Phishing unterscheiden.",
    Illustration: PhishingIllustration,
  },
  {
    type: "belegdetektiv",
    label: "Beleg-Detektiv",
    description: "Belege oder Datenauszüge prüfen, Abweichungen und Fehler markieren und entscheiden: in Ordnung oder beanstanden.",
    Illustration: BelegDetektivIllustration,
  },
  {
    type: "bughunt",
    label: "Bug-Hunt",
    description: "In kurzem Code die eine fehlerhafte Zeile finden.",
    Illustration: BugHuntIllustration,
  },
  {
    type: "codereihenfolge",
    label: "Code-Reihenfolge",
    description: "Durcheinandergeratene Codezeilen in die richtige Reihenfolge bringen.",
    Illustration: CodeReihenfolgeIllustration,
  },
  {
    type: "prozessreihenfolge",
    label: "Prozess-Reihenfolge",
    description: "Die Schritte eines Ablaufs, etwa Beschaffung oder Kalkulation, in die richtige Reihenfolge bringen.",
    Illustration: ProzessReihenfolgeIllustration,
  },
  {
    type: "troubleshooting",
    label: "Troubleshooting-Detektiv",
    description: "Störungen im Netzwerk eingrenzen: erst die Schicht, dann die Ursache.",
    Illustration: TroubleshootingIllustration,
  },
  {
    type: "subnetting",
    label: "Subnetting-Sprint",
    description: "Netzadresse, Broadcast, Hostzahl und Maske berechnen — immer neue Aufgaben.",
    Illustration: SubnettingIllustration,
  },
  {
    type: "zahlensysteme",
    label: "Zahlensystem-Sprint",
    description: "Dezimal, binär und hexadezimal umrechnen — immer neue Aufgaben.",
    Illustration: ZahlensystemeIllustration,
  },
  {
    type: "rechensprint",
    label: "Rechen-Sprint",
    description: "Prozent, Kennzahlen, Datenmengen, Statistik oder Sortieren und Suchen von Hand rechnen — immer neue Aufgaben mit Lösungsweg.",
    Illustration: RechensprintIllustration,
  },
] as const;

interface AktivesSpiel {
  type: string;
  setKey: string;
  title: string;
}

export function Spiele({ kursId, onActiveGameChange }: { kursId: string; onActiveGameChange?: (active: boolean) => void }) {
  const available = trpc.game.available.useQuery({ kursId });
  // F-176: Kursprofil — welche Spiele (und Sets) der Kurs anbietet; null = keine Einschränkung (z. B. Mathematik).
  const courses = trpc.courses.list.useQuery();
  const angebot = courses.data?.find((course) => course.id === kursId)?.angebot ?? null;
  const [activeGame, setActiveGame] = useState<AktivesSpiel | null>(null);

  useEffect(() => {
    onActiveGameChange?.(activeGame !== null);
    // Beim Verlassen des Tabs (Unmount) den Fokus-Modus wieder aufheben, damit ein
    // Tab-Wechsel mitten im Spiel den Sozial-Bereich nicht dauerhaft ausgeblendet lässt.
    return () => onActiveGameChange?.(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGame]);

  if (activeGame) {
    const common = { kursId, setKey: activeGame.setKey, title: activeGame.title, onClose: () => setActiveGame(null) };
    const key = `${activeGame.type}:${activeGame.setKey}`;
    switch (activeGame.type) {
      case "kreuzwortraetsel":
        return <Kreuzwortraetsel key={key} {...common} />;
      case "kennzahlen_duell":
        return <KennzahlenDuell key={key} {...common} />;
      case "memory":
        return <PersonalkennzahlenMemory key={key} {...common} />;
      case "phishing":
        return <PhishingDetektiv key={key} {...common} />;
      case "belegdetektiv":
        return <BelegDetektiv key={key} {...common} />;
      case "bughunt":
        return <BugHunt key={key} {...common} />;
      case "codereihenfolge":
        return <CodeReihenfolge key={key} {...common} />;
      case "prozessreihenfolge":
        return <ProzessReihenfolge key={key} {...common} />;
      case "troubleshooting":
        return <TroubleshootingDetektiv key={key} {...common} />;
      case "subnetting":
      case "zahlensysteme":
      case "rechensprint":
        return <SprintSpiel key={key} {...common} gameType={activeGame.type} />;
    }
  }

  const rows = available.data ?? [];
  const catalogFor = (type: string) => GAME_CATALOG.find((entry) => entry.type === type);
  // Kacheln in Katalogreihenfolge, mehrere Sets desselben Typs hintereinander; nur, was das Kursprofil anbietet.
  const tiles = GAME_CATALOG.flatMap((entry) => rows.filter((row) => row.gameType === entry.type)).flatMap((row) => {
    const gruppe = angebotSpiel(angebot, row.gameType, row.setKey);
    return gruppe ? [{ row, gruppe }] : [];
  });
  const kern = tiles.filter((tile) => tile.gruppe === "kern").map((tile) => tile.row);
  const grundlagen = tiles.filter((tile) => tile.gruppe === "grundlagen").map((tile) => tile.row);
  const renderTile = (row: (typeof rows)[number]) => {
    const entry = catalogFor(row.gameType)!;
    return (
      <Tile
        key={`${row.gameType}:${row.setKey}`}
        title={row.title}
        description={entry.description}
        image={<entry.Illustration />}
        onClick={() => setActiveGame({ type: row.gameType, setKey: row.setKey, title: row.title })}
      />
    );
  };

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Spiele</h2>
      </div>
      <p className="field-hint">
        Fachbegriffe und Fertigkeiten spielerisch üben — die Spiele sind reine Übung und zählen nicht für Punktehamster,
        Creditstand, Lernserie oder deinen Lernfortschritt; den bekommst du im Tab „Lernen“.
      </p>
      {available.isLoading || courses.isLoading ? (
        <p>Lädt…</p>
      ) : (
        <>
          {/* F-176: nur Spiele, die zum Kurs passen — keine „noch nicht verfügbar“-Kacheln mehr. */}
          {tiles.length === 0 && <p className="field-hint">Für diesen Kurs gibt es derzeit keine Spiele.</p>}
          {kern.length > 0 && (
            <>
              {grundlagen.length > 0 && <h3 className="tile-group-title">Kernangebot</h3>}
              <div className="tile-grid">{kern.map(renderTile)}</div>
            </>
          )}
          {grundlagen.length > 0 && (
            <>
              <h3 className="tile-group-title">Grundlagen (gemeinsamer Teil 1)</h3>
              <div className="tile-grid">{grundlagen.map(renderTile)}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
