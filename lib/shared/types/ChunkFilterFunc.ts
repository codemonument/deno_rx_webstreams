/**
 * A pure function which gets a chunk and returns whether this chunk should be emitted further or not
 * true = keep chunk, false = drop chunk
 */
export type ChunkFilterFunc<P> = (chunk: P) => boolean;
