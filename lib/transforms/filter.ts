import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
import { ChunkFilterFunc } from "../types.ts";

export type FilterOptions = {};
const defaults: FilterOptions = {};

/**
 * Creates a TransformStream (Webstream) which converts from one chunk format to another.
 *
 * This does basically the same as the map() pipe in rxjs.
 */
export function filter<T>(
  filterFunc: ChunkFilterFunc<T>,
  options?: FilterOptions,
) {
  const {} = sanitizeOptions(options, defaults);

  const transform = new TransformStream<T, T>({
    start: () => {},
    transform(chunk, controller) {
      if (filterFunc(chunk)) {
        controller.enqueue(chunk);
      }

      // if filterFunc returns false, drop chunk by not enqueuing it further
    },
  });

  return transform;
}
