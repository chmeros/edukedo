import { useState } from "react";
import { trpc } from "./trpc";

/**
 * Kein Markdown-Rendering über eine zusätzliche Bibliothek — der Theorie-Content im
 * Zwischenformat (siehe content/README.md im Repo-Root) nutzt nur zwei Konstrukte
 * (###-Zwischenüberschriften, **fett**), die sich ohne echten Parser abdecken lassen.
 */
function renderMarkdown(bodyMarkdown: string) {
  return bodyMarkdown.split("\n\n").map((block, blockIndex) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return <h3 key={blockIndex}>{trimmed.slice(4)}</h3>;
    }

    const parts = trimmed.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={blockIndex}>
        {parts.map((part, partIndex) =>
          partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part,
        )}
      </p>
    );
  });
}

export function Theorie() {
  const sections = trpc.content.theorySections.useQuery();
  const [activeId, setActiveId] = useState<string | null>(null);

  if (sections.isLoading) {
    return <p>Lädt…</p>;
  }

  const items = sections.data ?? [];

  if (items.length === 0) {
    return <p>Keine Theorie-Inhalte verfügbar.</p>;
  }

  const active = items.find((item) => item.id === activeId) ?? items[0]!;

  return (
    <div className="theorie">
      <ul className="theorie-toc">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={item.id === active.id ? "theorie-toc-item active" : "theorie-toc-item"}
              onClick={() => setActiveId(item.id)}
            >
              {item.themaTitle}
            </button>
          </li>
        ))}
      </ul>
      <article className="theorie-content">
        <p className="theorie-fachgebiet">{active.fachgebietTitle}</p>
        <h2>{active.themaTitle}</h2>
        {renderMarkdown(active.bodyMarkdown)}
      </article>
    </div>
  );
}
