import { structureAnswer } from "@edukedo/shared";
import { FachbegriffText } from "./Fachbegriffe";

/**
 * Antwortseite einer Karteikarte: gliedert den Text in Absätze und Listen (siehe
 * `structureAnswer` in packages/shared) statt ihn als eine Textwand zu zeigen. Ein einzelner
 * kurzer Satz sieht aus wie bisher (`.flip-a`). `markieren` (F-165) schaltet die Fachbegriff-Markierung ein — nur, wenn die
 * Karte aufgedeckt ist, damit die Antwortseite im DOM keine anklickbaren Elemente vor dem Aufdecken enthält. Lange Antworten scrollen innerhalb der Karte,
 * damit nichts unter dem Kartenrand verschwindet (Karte hat festes Seitenverhältnis).
 */
export function FlashcardAnswer({ text, markieren = false }: { text: string | null; markieren?: boolean }) {
  if (!text) {
    return <p className="flip-a">Keine Zusatzerklärung vorhanden.</p>;
  }
  const blocks = structureAnswer(text);
  if (blocks.length === 1 && blocks[0]!.kind === "paragraph") {
    return (
      <p className="flip-a">
        <FachbegriffText text={blocks[0]!.text} aktiv={markieren} />
      </p>
    );
  }
  return (
    <div className="flip-answer">
      {blocks.map((block, index) => {
        if (block.kind === "paragraph") {
          return (
            <p key={index} className="flip-a">
              <FachbegriffText text={block.text} aktiv={markieren} />
            </p>
          );
        }
        const Tag = block.kind === "bullets" ? "ul" : "ol";
        return (
          <Tag key={index} className="flip-a-list">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <FachbegriffText text={item} aktiv={markieren} />
              </li>
            ))}
          </Tag>
        );
      })}
    </div>
  );
}
