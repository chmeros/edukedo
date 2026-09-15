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

export function Theorie({ kursId }: { kursId: string }) {
  const sections = trpc.content.theorySections.useQuery({ kursId });
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
    <>
      <div className="theory-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === active.id ? "is-active" : ""}
            onClick={() => setActiveId(item.id)}
          >
            {item.themaTitle}
          </button>
        ))}
      </div>
      <article className="theory-content">
        <span className="kicker">{active.fachgebietTitle}</span>
        <h3>{active.themaTitle}</h3>
        {renderMarkdown(active.bodyMarkdown)}
      </article>
    </>
  );
}
