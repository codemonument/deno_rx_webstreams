import { assert, assertRejects, describe, it } from "@deps/std_testing.ts";
import { map, simpleCallbackTarget, timerSource } from "@mod";
import { z } from "../../deps/zod.ts";
import { validateChunk } from "./validateChunk.ts";

describe(`validateChunk Transform`, () => {
  it(`Should validate input chunk type`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 2,
    });

    await timer
      .pipeThrough(validateChunk({ validator: z.number() }))
      .pipeTo(
        simpleCallbackTarget((chunk) => {
          assert(typeof chunk === `number`);
          console.log(`Chunk: `, chunk);
        }),
      );
  });

  it(`Should throw when validator fails`, async () => {
    const timer = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 2,
    });

    const promise = timer
      // force-map to any, to be able to test the error emitted by the broken validator
      // (inputting a number into the map transformer but expecting a string via zod )
      .pipeThrough(map<number, any>((timerCount) => timerCount))
      .pipeThrough(validateChunk({ validator: z.string() }))
      .pipeTo(
        simpleCallbackTarget((chunk) => console.log(`Chunk: `, chunk)),
      );

    await assertRejects(() => promise);
  });
});
