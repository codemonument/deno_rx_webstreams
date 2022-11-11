import { z } from "../../deps/zod.ts";

export type StringToLinesOptions = {};

const defaultOptions: StringToLinesOptions = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 *
 * This does basically the same as TextLineStream in deno std/streams/delimiter.ts
 * https://deno.land/std/streams/delimiter.ts?source
 */
export function stringToLines(
  options?: StringToLinesOptions,
) {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const {} = options;

  const transform = new TransformStream<string, string>({
    start: () => {},
    transform(chunk, controller) {
      const chunkResult = z.string().safeParse(chunk);

      if (!chunkResult.success) {
        controller.error(chunkResult.error);
        return;
      }

      const inputString = chunkResult.data;
      for (const line of inputString.split("\n")) {
        controller.enqueue(line);
      }
    },
  });

  return transform;
}
