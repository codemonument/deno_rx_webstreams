import { assert, describe, it } from "@deps/std_testing.ts";
import { filter, simpleCallbackTarget, timerSource } from "@mod";

describe(`filter() Transform`, () => {
  it(`Should filter given readable stream`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 6,
    });

    const evenEvents: number[] = [];

    await timer
      .pipeThrough(filter((chunk) => chunk % 2 === 0))
      .pipeTo(
        simpleCallbackTarget((chunk) => {
          evenEvents.push(chunk);
          console.log(`Chunk: `, chunk);
        }),
      );

    assert(evenEvents[0] === 2);
    assert(evenEvents[1] === 4);
    assert(evenEvents[2] === 6);
  });
});
