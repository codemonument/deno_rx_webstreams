import { assert, describe, it } from "@deps/std_testing.ts";
import { map, simpleCallbackTarget, timerSource } from "@mod";

describe(`map Transform`, () => {
  it(`Should map from number to string`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 5,
    });

    await timer
      .pipeThrough(map((timerCount) => `Event No. ${timerCount}`))
      .pipeTo(
        simpleCallbackTarget((chunk) => {
          assert(typeof chunk === `string`);
          console.log(`Chunk: `, chunk);
        }),
      );
  });
});
