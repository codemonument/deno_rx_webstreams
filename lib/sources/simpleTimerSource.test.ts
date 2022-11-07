import { assert, describe, it } from "@deps/std_testing.ts";
import { simpleTimerSource } from "@mod";

describe(`simpleTimerStream`, () => {
  it(`should output 5 events, 1 each 100ms (defaults)`, async () => {
    const eventLog = [];
    for await (const event of simpleTimerSource()) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
  });

  it(`should output 5 events, 1 each 50ms`, async () => {
    const eventLog = [];

    const timer = simpleTimerSource({
      intervalInMilliseconds: 50,
      maxEventCount: 5,
    });

    for await (const event of timer) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
  });

  it(`should be abortable by an abortController`, async () => {
    const eventLog = [];
    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 450);

    const timer = simpleTimerSource({
      intervalInMilliseconds: 100,
      abortSignal: abortController.signal,
    });

    for await (const event of timer) {
      console.log(event);
      eventLog.push(event);
    }

    assert(eventLog.length === 5);
    clearTimeout(timeoutId);
  });
});
