import { assert, describe, it } from "@deps/std_testing.ts";
import { simpleCallbackTarget, timerSource } from "@mod";

describe(`xxx() Transform`, () => {
  it(`Should xxx`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 6,
    });

    await timer
      //   .pipeThrough(filter((chunk) => chunk % 2 === 0))
      .pipeTo(
        simpleCallbackTarget((chunk) => {
          console.log(`Chunk: `, chunk);
        }),
      );
  });
});
