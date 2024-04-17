import type { ChunkFilterFunc } from "../types.ts";
import { sanitizeOptions } from "../utils/sanitizeOptions.ts";

export type FilterOptions = {};
const defaults: FilterOptions = {};

/**
 * Creates a TransformStream (Webstream)
 * which only emits chunks which pass the filter function with true
 *
 * This does basically the same as the filter() pipe in rxjs.
 */
export function filter<T>(
  filterFunc: ChunkFilterFunc<T>,
  options?: FilterOptions,
): TransformStream<T, T> {
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
