import { EmittableSourceStream } from "./emittable/EmittableSourceStream.ts";
import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
export type EmittableSourceOptions = {};
const defaults: EmittableSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which produces a stream where events can be emitted into from the outside.
 */
export function emittableSource<T>(
  options?: EmittableSourceOptions,
): EmittableSourceStream<T> {
  const {} = sanitizeOptions(options, defaults);

  return EmittableSourceStream.create<T>();
}
