import { assert, assertRejects, describe, it } from "@deps/std_testing.ts";
import { reduce, simpleCallbackTarget, timerSource } from "@mod";
import { z } from "../../deps/zod.ts";

describe(`map Transform`, () => {
  it(`Should Aggregate all timer event counts`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 5,
    });

    await timer
      .pipeThrough(
        reduce((timerCount, sum) => sum + timerCount, {
          initialAggregate: 0,
        }),
      )
      .pipeTo(
        simpleCallbackTarget((chunk) => {
          assert(typeof chunk === `number`);
          console.log(`Chunk: `, chunk);
        }),
      );
  });
});
