import { assert, describe, it } from "@deps/std_testing.ts";
import { simpleCallbackTarget, timerSource } from "@mod";
import { multiplexSource } from "./multiplexSource.ts";

Deno.test(
  `multiplexSource() should join multiple sources into one readable stream`,
  {
    // Deno Options
  },
  async () => {
    const timer1 = timerSource({
      intervalInMilliseconds: 25,
      maxEventCount: 6,
    });
    const timer2 = timerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 6,
    });
    const timer3 = timerSource({
      intervalInMilliseconds: 75,
      maxEventCount: 6,
    });

    const multiplexStream = multiplexSource([
      { name: "--1--", readable: timer1 },
      { name: "---2--", readable: timer2 },
      { name: "----3-", readable: timer3 },
    ]);

    const promise = multiplexStream.pipeTo(
      simpleCallbackTarget((chunk) => {
        console.log(`Chunk: `, chunk);
      }),
      {},
    );

    // NOTE: This promise will ONLY finish, when all input streams have completed!
    await promise;
  },
);
