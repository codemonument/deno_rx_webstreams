import { z } from "../../../deps/zod.ts";

/**
 * A function which gets a chunk in one type + the return value of the previous execution (aggregate) and returns a new aggregate
 */

/**
 * Manual TypeDef
 */
export type ChunkReduceFunc<C, A> = (chunk: C, aggregate: A) => A;
