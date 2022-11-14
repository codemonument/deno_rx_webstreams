import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
import { z, ZodSchema } from "../../deps/zod.ts";
export type ValidateChunkOptions<R> = {
  validator: ZodSchema<R>;
};

/**
 * Creates a TransformStream (Webstream) validates the type of the input chunk via a zod validator
 *
 * This does basically the same as the map() pipe in rxjs.
 */
export function validateChunk<R>(
  options: ValidateChunkOptions<R>,
) {
  const defaults: ValidateChunkOptions<R> = {
    validator: z.NEVER,
  };
  const { validator } = sanitizeOptions(options, defaults);

  const transform = new TransformStream<unknown, R>({
    start: () => {},
    transform(chunk, controller) {
      const result = validator.safeParse(chunk);
      if (!result.success) {
        controller.error(result.error);
        return;
      }

      const validChunk = result.data;

      controller.enqueue(validChunk);
    },
  });

  return transform;
}
