import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
export type Options = {};
const defaults: Options = {};

/**
 * Creates a TransformStream (Webstream) which <does something>.
 */
export function newStream<T>(options: Options) {
  const {} = sanitizeOptions(options, defaults);

  const transform = new TransformStream<T, T>({
    start: () => {},
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });

  return transform;
}
