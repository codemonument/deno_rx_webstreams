import { EmittableSource } from "./extended-readable-streams/EmittableSource.ts";
export type EmittableSourceOptions = {};

const defaultOptions: EmittableSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export function emittableSource<T>(
  options?: EmittableSourceOptions,
): EmittableSource<T> {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const {} = options;

  return EmittableSource.create<T>();
}
