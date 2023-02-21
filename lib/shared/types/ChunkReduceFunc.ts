import { z } from "../../../deps/zod.ts";

/**
 * A function which gets a chunk in one type + the return value of the previous execution (previousState) and returns a new state
 */

/**
 * Manual TypeDef
 */
export type ChunkReduceFunc<C, A> = (chunk: C, previousState: A) => A;
