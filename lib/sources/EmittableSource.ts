import { EmittableSourceStream } from "./extended-readable-streams/EmittableSourceStream.ts";
export type EmittableSourceOptions = {};

const defaultOptions: EmittableSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export function emittableSource<T>(
  options?: EmittableSourceOptions,
): EmittableSourceStream<T> {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const {} = options;

  return EmittableSourceStream.create<T>();
}
