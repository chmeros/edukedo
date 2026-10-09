import { useMemo, useRef } from "react";

/**
 * Review LOG-09/LOG-11: Idempotenzschlüssel für Online-Antworten (Quiz-Antworten und Karteikarten-Bewertungen).
 *
 * Ein Schlüssel gehört zu einem Antwortversuch auf eine Frage. Er wird beim ersten Absenden erzeugt und bei jeder Wiederholung
 * desselben Versuchs unverändert mitgeschickt (Doppeltipp, zweite Anfrage nach einem Verbindungsabbruch, bei dem die Antwort des
 * Servers verloren ging). Der Server verbucht ein Ereignis mit demselben Schlüssel nur einmal. Erst eine bestätigte Antwort
 * gibt den Schlüssel frei; die nächste Antwort auf dieselbe Frage (z. B. in einer späteren Runde) bekommt einen neuen. Wurde der
 * Versuch nie bestätigt (Seite verlassen, Anfrage verloren), gilt der Schlüssel nach zwei Minuten nicht mehr, damit er eine spätere,
 * neue Antwort auf dieselbe Frage nicht als Wiederholung verschluckt.
 */
const KEY_LIFETIME_MS = 2 * 60 * 1000;

export interface AttemptKeys {
  keyFor: (contentItemId: string) => string;
  release: (contentItemId: string) => void;
}

export function useAttemptKeys(): AttemptKeys {
  const keys = useRef(new Map<string, { key: string; createdAt: number }>());
  return useMemo<AttemptKeys>(
    () => ({
      keyFor: (contentItemId) => {
        const existing = keys.current.get(contentItemId);
        if (existing && Date.now() - existing.createdAt < KEY_LIFETIME_MS) return existing.key;
        const key = crypto.randomUUID();
        keys.current.set(contentItemId, { key, createdAt: Date.now() });
        return key;
      },
      release: (contentItemId) => {
        keys.current.delete(contentItemId);
      },
    }),
    [],
  );
}

interface MutateOptions {
  onSuccess?: (...args: never[]) => void;
}

/**
 * Ergänzt `mutate` einer tRPC-Mutation um den `clientEventId` des laufenden Antwortversuchs (Schlüssel je `contentItemId`).
 * Alle übrigen Eigenschaften (`isPending`, `error`, `reset` …) bleiben unverändert.
 */
export function withAttemptKey<M extends { mutate: (input: never, options?: never) => void }>(mutation: M, keys: AttemptKeys): M {
  const mutate = mutation.mutate as unknown as (input: { contentItemId: string }, options?: MutateOptions) => void;
  const wrapped = (input: { contentItemId: string }, options?: MutateOptions) => {
    const { contentItemId } = input;
    mutate(
      { ...input, clientEventId: keys.keyFor(contentItemId) } as { contentItemId: string },
      {
        ...options,
        onSuccess: (...args) => {
          keys.release(contentItemId);
          (options?.onSuccess as ((...a: unknown[]) => void) | undefined)?.(...args);
        },
      },
    );
  };
  return { ...mutation, mutate: wrapped } as unknown as M;
}
