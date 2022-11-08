import { simpleCallbackTarget, timerSource } from "@mod";
import { assert } from "@deps/std_testing.ts";

Deno.test(`simpleStreamCallback Adapter`, async (tc) => {
  const events = [];
  await timerSource({ intervalInMilliseconds: 50, maxEventCount: 5 }).pipeTo(
    simpleCallbackTarget((chunk) => {
      events.push(chunk);
      console.log(chunk);
    }),
  );

  assert(events.length === 5);
});
