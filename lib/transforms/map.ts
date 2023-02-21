import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
import { ChunkTransformFunc } from "../types.ts";
import { z, ZodSchema } from "../../deps/zod.ts";

export type MapOptions<T> = {
  validator?: ZodSchema<T>;
};

/**
 * Creates a TransformStream (Webstream) which converts from one chunk format to another.
 *
 * This does basically the same as the map() pipe in rxjs.
 */
export function map<T, R>(
  mapFunc: ChunkTransformFunc<T, R>,
  options?: MapOptions<T>,
) {
  const defaults: MapOptions<T> = {};
  const { validator } = sanitizeOptions(options, defaults);

  const transform = new TransformStream<T, R>({
    start: () => {},
    transform(chunk, controller) {
      if (validator) {
        const result = validator.safeParse(chunk);
        if (!result.success) {
          controller.error(result.error);
          return;
        }

        chunk = result.data;
      }

      controller.enqueue(mapFunc(chunk));
    },
  });

  return transform;
}
