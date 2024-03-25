import { readerFromStreamReader } from "@deps/std.ts";
import { sanitizeOptions } from "../utils/sanitizeOptions.ts";

export type FileSourceOptions = {
  bufferSize?: number;
  useBufferedRead?: boolean;
};
const defaults: FileSourceOptions = {
  // This Buffer size comes from the following article about the 1 Billion row challenge,
  // since 1024 * 1024 performed best for this dataset, i'll use this as the default.
  // https://r2p.dev/b/2024-03-18-1brc-go/#:~:text=36.114680-,Scanner%20Buffer,-Scanner%20default%20configuration
  //
  // Note: this option will only be used when useBufferedRead is set to true.
  bufferSize: 1024 * 1024,
  useBufferedRead: false,
};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export async function fileSource(
  filepath: string,
  options?: FileSourceOptions,
): Promise<ReadableStream<Uint8Array>> {
  const { useBufferedRead } = sanitizeOptions(options, defaults);

  const file = await Deno.open(filepath, { read: true });
  const rawReadable = file.readable;

  if (!useBufferedRead) return rawReadable;

  throw new Error(`Buffered read not implemented yet!`);

  // const r = readerFromStreamReader(rawReadable.getReader());
}
