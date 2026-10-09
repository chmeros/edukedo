import { vi } from "vitest";

/**
 * Testhilfe: ersetzt den tRPC-React-Client (`./trpc`) durch eine Attrappe, damit Komponenten ohne Server und ohne QueryClient
 * getestet werden können. Jede beliebige Aufrufkette funktioniert: `trpc.quiz.quizItems.useQuery(...)`, `trpc.progress.submitReview
 * .useMutation(...)` und über `trpc.useUtils()` auch `utils.auth.me.invalidate()` (ohne Wirkung).
 *
 * Die Antworten legt der Test in der Registry fest (Schlüssel: Pfad der Prozedur, z. B. "quiz.quizItems"). Abfragen liefern sofort
 * ihre Daten, Mutationen rufen synchron den hinterlegten Handler auf und danach die Erfolgs-Rückrufe (zuerst die des Hooks, dann die des
 * einzelnen Aufrufs, wie bei react-query). Alle Mutations-Eingaben werden je Pfad aufgezeichnet.
 */
export interface TrpcMockRegistry {
  queries: Record<string, unknown>;
  loading: Record<string, boolean>;
  mutations: Record<string, (input: unknown) => unknown>;
  mutationCalls: Record<string, unknown[]>;
  queryInputs: Record<string, unknown[]>;
  refetch: Record<string, ReturnType<typeof vi.fn>>;
  reset: () => void;
}

export function createTrpcRegistry(): TrpcMockRegistry {
  const registry: TrpcMockRegistry = {
    queries: {},
    loading: {},
    mutations: {},
    mutationCalls: {},
    queryInputs: {},
    refetch: {},
    reset() {
      registry.queries = {};
      registry.loading = {};
      registry.mutations = {};
      registry.mutationCalls = {};
      registry.queryInputs = {};
      registry.refetch = {};
    },
  };
  return registry;
}

type Callbacks = { onSuccess?: (result: unknown, input: unknown) => void; onError?: (error: unknown) => void };

export function createTrpcMock(registry: TrpcMockRegistry): unknown {
  function useQuery(path: string, input: unknown) {
    (registry.queryInputs[path] ??= []).push(input);
    const refetch = (registry.refetch[path] ??= vi.fn());
    return {
      data: registry.queries[path],
      isLoading: registry.loading[path] ?? false,
      isError: false,
      error: null,
      refetch,
    };
  }

  function useMutation(path: string, hookCallbacks: Callbacks | undefined) {
    return {
      isPending: false,
      error: null,
      reset: () => {},
      mutate: (input: unknown, callCallbacks?: Callbacks) => {
        (registry.mutationCalls[path] ??= []).push(input);
        const result = registry.mutations[path]?.(input);
        hookCallbacks?.onSuccess?.(result, input);
        callCallbacks?.onSuccess?.(result, input);
      },
    };
  }

  function knoten(path: string[]): unknown {
    return new Proxy(() => undefined, {
      get(_ziel, eigenschaft) {
        if (typeof eigenschaft !== "string") return undefined;
        const pfad = path.join(".");
        if (eigenschaft === "useQuery") return (input: unknown) => useQuery(pfad, input);
        if (eigenschaft === "useMutation") return (callbacks?: Callbacks) => useMutation(pfad, callbacks);
        if (eigenschaft === "useUtils") return () => knoten([]);
        return knoten([...path, eigenschaft]);
      },
      // `utils.x.y.invalidate()` und ähnliche Aufrufe der Hilfsfunktionen: ohne Wirkung.
      apply: () => undefined,
    });
  }

  return knoten([]);
}
