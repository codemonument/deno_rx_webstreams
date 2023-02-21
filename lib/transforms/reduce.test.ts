import { assert } from "@deps/std_testing.ts";
import { reduce, simpleCallbackTarget, timerSource } from "@mod";
import { z } from "../../deps/zod.ts";

Deno.test(`reduce() should aggregate all timer event counts`, async () => {
  const timer = timerSource({
    intervalInMilliseconds: 50,
    maxEventCount: 3,
  });

  await timer
    .pipeThrough(
      reduce((timerCount, sum) => sum + timerCount, {
        initialAggregate: 0,
        validator: z.number(),
      }),
    )
    .pipeTo(
      simpleCallbackTarget((chunk) => {
        assert(typeof chunk === `number`);
        console.log(`Event Sum: `, chunk);
      }),
    );
});

/**
 * This test is not needed, bc. validator emits a type error when it does not match the stream types <3
 */
// Deno.test(`reduce() should throw when validator fails`, async () => {
//   const timer = timerSource({
//     intervalInMilliseconds: 50,
//     maxEventCount: 3,
//   });

//   await timer
//     .pipeThrough(
//       reduce((timerCount, sum) => sum + timerCount, {
//         initialAggregate: 0,
//         validator: z.string(),
//       }),
//     )
//     .pipeTo(
//       simpleCallbackTarget((chunk) => {
//         assert(typeof chunk === `number`);
//         console.log(`Event Sum: `, chunk);
//       }),
//     );
// });
