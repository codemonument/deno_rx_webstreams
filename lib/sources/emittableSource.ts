import { EmittableSourceStream } from "./emittable/EmittableSourceStream.ts";
import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
export type EmittableSourceOptions = {};
const defaults: EmittableSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export function emittableSource<T>(
  options?: EmittableSourceOptions,
): EmittableSourceStream<T> {
  const {} = sanitizeOptions(options, defaults);

  return EmittableSourceStream.create<T>();
}
