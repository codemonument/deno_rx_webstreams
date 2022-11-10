export type FileSourceOptions = {};

const defaultOptions: FileSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export async function fileSource(
  filepath: string,
  options?: FileSourceOptions,
): Promise<ReadableStream<Uint8Array>> {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const {} = options;

  const file = await Deno.open(filepath, { read: true });

  return file.readable;
}
