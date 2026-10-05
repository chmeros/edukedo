import { structureAnswer } from "@edukedo/shared";

/**
 * Antwortseite einer Karteikarte: gliedert den Text in Absätze und Listen (siehe
 * `structureAnswer` in packages/shared) statt ihn als eine Textwand zu zeigen. Ein einzelner
 * kurzer Satz sieht aus wie bisher (`.flip-a`). Lange Antworten scrollen innerhalb der Karte,
 * damit nichts unter dem Kartenrand verschwindet (Karte hat festes Seitenverhältnis).
 */
export function FlashcardAnswer({ text }: { text: string | null }) {
  if (!text) {
    return <p className="flip-a">Keine Zusatzerklärung vorhanden.</p>;
  }
  const blocks = structureAnswer(text);
  if (blocks.length === 1 && blocks[0]!.kind === "paragraph") {
    return <p className="flip-a">{blocks[0]!.text}</p>;
  }
  return (
    <div className="flip-answer">
      {blocks.map((block, index) => {
        if (block.kind === "paragraph") {
          return (
            <p key={index} className="flip-a">
              {block.text}
            </p>
          );
        }
        const Tag = block.kind === "bullets" ? "ul" : "ol";
        return (
          <Tag key={index} className="flip-a-list">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </Tag>
        );
      })}
    </div>
  );
}
