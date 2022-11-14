import { sanitizeOptions } from "../utils/sanitizeOptions.ts";

export type FileSourceOptions = {};
const defaults: FileSourceOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export async function fileSource(
  filepath: string,
  options?: FileSourceOptions,
): Promise<ReadableStream<Uint8Array>> {
  const {} = sanitizeOptions(options, defaults);

  const file = await Deno.open(filepath, { read: true });

  return file.readable;
}
