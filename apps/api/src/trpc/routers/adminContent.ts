import {
  adminContentItemInputSchema,
  adminContentItemsInputSchema,
  adminCreateContentItemInputSchema,
  adminSetContentItemActiveInputSchema,
  adminThemaTreeInputSchema,
  adminUpdateContentItemInputSchema,
  fachgespraechFragePayloadSchema,
  fallaufgabePayloadSchema,
  kurzantwortPayloadSchema,
  lueckenPayloadSchema,
  theoriePayloadSchema,
  type AdminContentItemForm,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, ilike } from "drizzle-orm";
import { parseLueckentext } from "../../db/content-parser";
import { renderLueckentextSource } from "../../db/content-serializer";
import { answerOption, contentItem, contentItemVersion, fachgebiet, thema } from "../../db/schema";
import { roleProcedure, router } from "../trpc";
import { escapeLikePattern } from "./content";

/**
 * F-11: Admin-/Redaktionsbereich, CMS-Teil (Nutzer-Entscheidung vom 19.09.2026, siehe
 * Architekturplanung Abschnitt 13) — Pflege UND Neuanlage einzelner Content-Items, unabhängig
 * vom App-Release/Bulk-Import (F-17). Eigenständiger Router statt Anhängen an `admin.ts`
 * (bereits umfangreich) oder `content.ts` (dort nur lesende, nutzerseitige Endpunkte).
 *
 * Formular → Datenbank-Umwandlung (`prepareContent`) läuft server-seitig, damit dieselbe Logik
 * wie beim Bulk-Import gilt: `lueckentextSource` nutzt exakt dieselbe inline
 * `___Stichwort___`-Syntax wie das Content-Zwischenformat (`parseLueckentext`, siehe
 * content-parser.ts) statt eines separaten, abstrakten `blanks`-Formulars; `zuordnung`-Paare
 * werden wie beim Import in zwei `answer_option`-Zeilen je Paar (gemeinsamer `groupKey`,
 * `side` links/rechts) aufgelöst.
 */

interface PreparedContent {
  prompt: string;
  explanation: string | null;
  payload: Record<string, unknown>;
  answerOptions?: { text: string; isCorrect: boolean; groupKey?: string; side?: string; sortOrder: number }[];
}

export function prepareContent(input: AdminContentItemForm): PreparedContent {
  switch (input.type) {
    case "theorie":
      return { prompt: input.prompt, explanation: null, payload: { body_markdown: input.bodyMarkdown, images: [] } };
    case "karteikarte":
      return { prompt: input.prompt, explanation: input.explanation ?? null, payload: {} };
    // F-113: wahr_falsch/entweder_oder/was_passt_nicht sind strukturell identisch zu quiz_mc
    // (answer_option-basiert, genau eine Option richtig), siehe Architekturplanung Abschnitt 13
    // — derselbe Formular-Aufbau (options-Array), daher ein gemeinsamer Case-Block.
    case "quiz_mc":
    case "wahr_falsch":
    case "entweder_oder":
    case "was_passt_nicht":
      return {
        prompt: input.prompt,
        explanation: input.explanation ?? null,
        payload: {},
        answerOptions: input.options.map((option, index) => ({
          text: option.text,
          isCorrect: option.isCorrect,
          sortOrder: index,
        })),
      };
    case "zuordnung":
      return {
        prompt: input.prompt,
        explanation: input.explanation ?? null,
        payload: {},
        answerOptions: input.pairs.flatMap((pair, index) => [
          { text: pair.left, isCorrect: false, groupKey: String(index), side: "links", sortOrder: index },
          { text: pair.right, isCorrect: false, groupKey: String(index), side: "rechts", sortOrder: index },
        ]),
      };
    // F-114: swot/bsc/ansoff sind eine visuelle Zuordnungs-Variante — dieselbe answer_option-
    // Tabelle wie "zuordnung", aber `groupKey` trägt hier den (festen) Zonen-Schlüssel des
    // Begriffs statt einer Paar-ID, und `side` bleibt ungesetzt (nur zwei Spalten kennen Seiten).
    case "swot":
    case "bsc":
    case "ansoff":
      return {
        prompt: input.prompt,
        explanation: input.explanation ?? null,
        payload: {},
        answerOptions: input.terms.map((term, index) => ({
          text: term.text,
          isCorrect: false,
          groupKey: term.zoneKey,
          sortOrder: index,
        })),
      };
    case "luecken": {
      const { textWithBlanks, blanks } = parseLueckentext(input.lueckentextSource);
      if (blanks.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Mindestens eine Lücke im Format ___Stichwort___ ist erforderlich.",
        });
      }
      // content_item.prompt entspricht bei Lückentext-Items exakt dem Quelltext mit den
      // inline-Markierungen (siehe import-content.ts) — kein separates Prompt-Feld im Formular.
      return {
        prompt: input.lueckentextSource,
        explanation: input.explanation ?? null,
        payload: { text_with_blanks: textWithBlanks, blanks },
      };
    }
    case "kurzantwort":
      return {
        prompt: input.prompt,
        explanation: input.explanation ?? null,
        payload: { accepted_answers: input.acceptedAnswers, match_mode: input.matchMode },
      };
    case "fallaufgabe":
      return { prompt: input.prompt, explanation: input.explanation ?? null, payload: { parts: input.parts } };
    case "fachgespraech_frage":
      return { prompt: input.prompt, explanation: input.explanation ?? null, payload: { themaTitel: input.themaTitel } };
  }
}

export const adminContentRouter = router({
  /** Fachgebiet → Thema-Baum eines Kurses — für die Themenauswahl in Filter/Neuanlage-Formular. */
  themaTree: roleProcedure("admin").input(adminThemaTreeInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        fachgebietId: fachgebiet.id,
        fachgebietTitle: fachgebiet.title,
        themaId: thema.id,
        themaTitle: thema.title,
      })
      .from(fachgebiet)
      .innerJoin(thema, eq(thema.fachgebietId, fachgebiet.id))
      .where(eq(fachgebiet.kursId, input.kursId))
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder));

    const byFachgebiet = new Map<string, { id: string; title: string; themen: { id: string; title: string }[] }>();
    for (const row of rows) {
      let fg = byFachgebiet.get(row.fachgebietId);
      if (!fg) {
        fg = { id: row.fachgebietId, title: row.fachgebietTitle, themen: [] };
        byFachgebiet.set(row.fachgebietId, fg);
      }
      fg.themen.push({ id: row.themaId, title: row.themaTitle });
    }
    return [...byFachgebiet.values()];
  }),

  /**
   * Liste je Kurs (optional nach Thema/Typ/Stichwort gefiltert) — bewusst OHNE
   * `isActive`-Filter (anders als `content.search`), da die Redaktion gerade auch
   * deaktivierte Items wiederfinden und reaktivieren können muss.
   */
  list: roleProcedure("admin").input(adminContentItemsInputSchema).query(async ({ ctx, input }) => {
    const conditions = [eq(fachgebiet.kursId, input.kursId)];
    if (input.themaId) conditions.push(eq(thema.id, input.themaId));
    if (input.type) conditions.push(eq(contentItem.type, input.type));
    if (input.search && input.search.trim().length > 0) {
      conditions.push(ilike(contentItem.prompt, `%${escapeLikePattern(input.search.trim())}%`));
    }

    return ctx.db
      .select({
        id: contentItem.id,
        type: contentItem.type,
        prompt: contentItem.prompt,
        isActive: contentItem.isActive,
        currentVersion: contentItem.currentVersion,
        updatedAt: contentItem.updatedAt,
        themaId: thema.id,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(and(...conditions))
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder), asc(contentItem.createdAt))
      .limit(200);
  }),

  /** Volles Detail eines Items für den Editor — payload/answer_option zurück in Formularform. */
  get: roleProcedure("admin").input(adminContentItemInputSchema).query(async ({ ctx, input }) => {
    const [item] = await ctx.db.select().from(contentItem).where(eq(contentItem.id, input.contentItemId)).limit(1);
    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Content-Item wurde nicht gefunden." });
    }

    const common = {
      contentItemId: item.id,
      themaId: item.themaId,
      difficulty: item.difficulty as "leicht" | "mittel" | "schwer",
      bloom: item.bloom as AdminContentItemForm["bloom"],
      isPremium: item.isPremium,
      isActive: item.isActive,
      currentVersion: item.currentVersion,
      updatedAt: item.updatedAt,
    };

    // F-113: wahr_falsch/entweder_oder/was_passt_nicht laden/formen genau wie quiz_mc.
    if (
      item.type === "quiz_mc" ||
      item.type === "wahr_falsch" ||
      item.type === "entweder_oder" ||
      item.type === "was_passt_nicht"
    ) {
      const options = await ctx.db
        .select()
        .from(answerOption)
        .where(eq(answerOption.contentItemId, item.id))
        .orderBy(asc(answerOption.sortOrder));
      return {
        type: item.type,
        ...common,
        prompt: item.prompt,
        explanation: item.explanation,
        options: options.map((option) => ({ text: option.text, isCorrect: option.isCorrect })),
      };
    }

    if (item.type === "zuordnung") {
      const rows = await ctx.db
        .select()
        .from(answerOption)
        .where(eq(answerOption.contentItemId, item.id))
        .orderBy(asc(answerOption.sortOrder));
      const byGroup = new Map<string, { left: string; right: string }>();
      for (const row of rows) {
        const key = row.groupKey ?? "0";
        const entry = byGroup.get(key) ?? { left: "", right: "" };
        if (row.side === "links") entry.left = row.text;
        else entry.right = row.text;
        byGroup.set(key, entry);
      }
      return { type: "zuordnung" as const, ...common, prompt: item.prompt, explanation: item.explanation, pairs: [...byGroup.values()] };
    }

    // F-114: swot/bsc/ansoff laden genau wie zuordnung, aber flach als terms (kein Paar-Konzept).
    if (item.type === "swot" || item.type === "bsc" || item.type === "ansoff") {
      const rows = await ctx.db
        .select()
        .from(answerOption)
        .where(eq(answerOption.contentItemId, item.id))
        .orderBy(asc(answerOption.sortOrder));
      return {
        type: item.type,
        ...common,
        prompt: item.prompt,
        explanation: item.explanation,
        terms: rows.map((row) => ({ text: row.text, zoneKey: row.groupKey ?? "" })),
      };
    }

    if (item.type === "theorie") {
      const payload = theoriePayloadSchema.parse(item.payload);
      return { type: "theorie" as const, ...common, prompt: item.prompt, bodyMarkdown: payload.body_markdown };
    }

    if (item.type === "luecken") {
      const payload = lueckenPayloadSchema.parse(item.payload);
      return {
        type: "luecken" as const,
        ...common,
        explanation: item.explanation,
        lueckentextSource: renderLueckentextSource(payload.text_with_blanks, payload.blanks),
      };
    }

    if (item.type === "kurzantwort") {
      const payload = kurzantwortPayloadSchema.parse(item.payload);
      return {
        type: "kurzantwort" as const,
        ...common,
        prompt: item.prompt,
        explanation: item.explanation,
        acceptedAnswers: payload.accepted_answers,
        matchMode: payload.match_mode,
      };
    }

    if (item.type === "fallaufgabe") {
      const payload = fallaufgabePayloadSchema.parse(item.payload);
      return { type: "fallaufgabe" as const, ...common, prompt: item.prompt, explanation: item.explanation, parts: payload.parts };
    }

    if (item.type === "fachgespraech_frage") {
      const payload = fachgespraechFragePayloadSchema.parse(item.payload);
      return {
        type: "fachgespraech_frage" as const,
        ...common,
        prompt: item.prompt,
        explanation: item.explanation,
        themaTitel: payload.themaTitel,
      };
    }

    // "karteikarte" — kein Extra-Payload.
    return { type: "karteikarte" as const, ...common, prompt: item.prompt, explanation: item.explanation };
  }),

  setActive: roleProcedure("admin")
    .input(adminSetContentItemActiveInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(contentItem)
        .set({ isActive: input.isActive })
        .where(eq(contentItem.id, input.contentItemId))
        .returning({ id: contentItem.id });
      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Content-Item wurde nicht gefunden." });
      }
      return { success: true };
    }),

  create: roleProcedure("admin")
    .input(adminCreateContentItemInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [themaRow] = await ctx.db.select().from(thema).where(eq(thema.id, input.themaId)).limit(1);
      if (!themaRow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Thema wurde nicht gefunden." });
      }

      const prepared = prepareContent(input);

      return ctx.db.transaction(async (tx) => {
        const [item] = await tx
          .insert(contentItem)
          .values({
            themaId: input.themaId,
            type: input.type,
            prompt: prepared.prompt,
            explanation: prepared.explanation,
            payload: prepared.payload,
            difficulty: input.difficulty,
            bloom: input.bloom ?? null,
            isPremium: input.isPremium,
            isActive: input.isActive,
            createdBy: ctx.currentUser.id,
          })
          .returning();
        if (!item) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }

        await tx.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: prepared.prompt,
          explanation: prepared.explanation,
          payload: prepared.payload,
          changedBy: ctx.currentUser.id,
        });

        if (prepared.answerOptions) {
          await tx
            .insert(answerOption)
            .values(prepared.answerOptions.map((option) => ({ contentItemId: item.id, ...option })));
        }

        return { id: item.id };
      });
    }),

  update: roleProcedure("admin")
    .input(adminUpdateContentItemInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db.select().from(contentItem).where(eq(contentItem.id, input.contentItemId)).limit(1);
      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Content-Item wurde nicht gefunden." });
      }
      if (existing.type !== input.type) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Der Content-Typ eines bestehenden Items kann nicht nachträglich geändert werden.",
        });
      }

      const prepared = prepareContent(input);
      const nextVersion = existing.currentVersion + 1;

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(contentItem)
          .set({
            themaId: input.themaId,
            prompt: prepared.prompt,
            explanation: prepared.explanation,
            payload: prepared.payload,
            difficulty: input.difficulty,
            bloom: input.bloom ?? null,
            isPremium: input.isPremium,
            isActive: input.isActive,
            currentVersion: nextVersion,
            updatedAt: new Date(),
          })
          .where(eq(contentItem.id, input.contentItemId));

        await tx.insert(contentItemVersion).values({
          contentItemId: input.contentItemId,
          versionNumber: nextVersion,
          prompt: prepared.prompt,
          explanation: prepared.explanation,
          payload: prepared.payload,
          changedBy: ctx.currentUser.id,
          changeNote: input.changeNote,
        });

        if (prepared.answerOptions) {
          await tx.delete(answerOption).where(eq(answerOption.contentItemId, input.contentItemId));
          await tx
            .insert(answerOption)
            .values(prepared.answerOptions.map((option) => ({ contentItemId: input.contentItemId, ...option })));
        }
      });

      return { success: true };
    }),
});
