import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
import { ChunkTransformFunc } from "../types.ts";
export type MapOptions = {};
const defaults: MapOptions = {};

/**
 * Creates a TransformStream (Webstream) which converts from one chunk format to another.
 *
 * This does basically the same as the map() pipe in rxjs.
 */
export function map<T, R>(
  mapFunc: ChunkTransformFunc<T, R>,
  options?: MapOptions,
) {
  const {} = sanitizeOptions(options, defaults);

  const transform = new TransformStream<T, R>({
    start: () => {},
    transform(chunk, controller) {
      controller.enqueue(mapFunc(chunk));
    },
  });

  return transform;
}
