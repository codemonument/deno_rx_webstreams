import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
import { simpleCallbackTarget } from "@mod";

export type InputStream<T> = { name: string; readable: ReadableStream<T> };
export type MultiplexChunk<T> = { name: string; value: T };

export type MultiplexOptions = {};
const defaults: MultiplexOptions = {};

/**
 * Creates a TransformStream (Webstream) which multiplexes multiple readable streams.
 *
 * IMPORTANT: Does currently ONLY Support multiplexing ReadableStreams<T> with the same Type!
 * IMPORTANT: Does currently ONLY Support multiplexing ReadableStreams<T> when type extends Object!!
 */
export function multiplexSource<T>(
  inputStreams: InputStream<T>[],
  options?: MultiplexOptions,
) {
  const {} = sanitizeOptions(options, defaults);

  const readable = new ReadableStream<MultiplexChunk<T>>({
    start: (controller) => {
      for (const stream of inputStreams) {
        stream.readable.pipeTo(
          simpleCallbackTarget((chunk) => {
            const newChunk = { name: stream.name, value: chunk };
            controller.enqueue(newChunk);
          }),
        );
      }
    },
  });
  return readable;
}
