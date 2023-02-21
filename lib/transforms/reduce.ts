import { ZodSchema } from "../../deps/zod.ts";
import { ChunkReduceFunc } from "../shared/types/ChunkReduceFunc.ts";

export type ReduceOptions<C, A> = {
  initialAggregate: A;
  validator?: ZodSchema<C>;
};

/**
 * Creates a TransformStream (Webstream) which converts from one chunk format to another.
 *
 * This does basically the same as the map() pipe in rxjs.
 */
export function reduce<C, A>(
  reduceFunc: ChunkReduceFunc<C, A>,
  options: ReduceOptions<C, A>,
) {
  // We don't need to sanitize options here, since the options key is required anyway
  const { validator, initialAggregate } = options;

  let aggregate = initialAggregate;

  const transform = new TransformStream<C, A>({
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

      const newAggregate = reduceFunc(chunk, aggregate);
      aggregate = newAggregate;

      controller.enqueue(newAggregate);
    },
  });

  return transform;
}
