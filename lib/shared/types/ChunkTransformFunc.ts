import { z } from "../../../deps/zod.ts";

/**
 * A pure function which gets a chunk in one type and returns it in another
 */

/**
 * Zod Schema Idea
 *
 * Has type problems currently and is very complicated.
 * Issue at Zod Library: https://github.com/colinhacks/zod/issues/2075
 */
// export const ChunkTransformFunc = z.function(
//   z.tuple(z.unknown() as any),
//   z.unknown(),
// ).args(z.tuple([z.unknown() as any] as const))
// .transform((func) => {
//     const [inputSchema, outputSchema] = z.getParsedType(func);
//     return z.function(inputSchema[0], outputSchema);
//   });

// export type ChunkTransformFunc = z.infer<typeof ChunkTransformFunc>;

/**
 * Manual TypeDef
 */
export type ChunkTransformFunc<P, R> = (chunk: P) => R;
