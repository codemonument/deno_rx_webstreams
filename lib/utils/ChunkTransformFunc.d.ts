/**
 * A pure function which gets a chunk in one type and returns it in another
 */
export type ChunkTransformFunc<P, R> = (chunk: P) => R;
