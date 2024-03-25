import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
export type TimerSourceOptions = {
  /**
   * The interval in milliseconds which is used for setInterval()
   */
  intervalInMilliseconds: number;

  /**
   * Stops the stream automatically after x events
   */
  maxEventCount?: number;

  /**
   * A signal of an abortController which can be used to abort this timer stream from the outside
   */
  abortSignal?: AbortSignal;
};

const defaults: TimerSourceOptions = {
  intervalInMilliseconds: 100,
  maxEventCount: 5,
};

/**
 * Creates a Source ReadableStream (Webstream) which generates timer events as chunks.
 * @param options
 * @emits The event count as number since the timer started
 */
export function timerSource(options?: TimerSourceOptions) {
  const { maxEventCount, intervalInMilliseconds, abortSignal } =
    sanitizeOptions(options, defaults);

  // timerId needs to be defined like this, since in node
  // the return type of setInterval is this Timeout object, not an id like in the browser
  let timerId: ReturnType<typeof setInterval> | undefined;

  const readableStream = new ReadableStream<number>({
    start(controller) {
      let eventCount = 1;

      controller.enqueue(eventCount);
      timerId = setInterval(() => {
        eventCount++;

        if (abortSignal?.aborted) {
          // cancel all activities, bc. abortSignal was aborted
          clearInterval(timerId);
          controller.close();
        }

        controller.enqueue(eventCount);

        if (eventCount === maxEventCount) {
          // cancel all activities, bc. maxEventCount was reached
          clearInterval(timerId);
          controller.close();
        }
      }, intervalInMilliseconds);
    },
    pull(_controller) {
    },
    cancel(reason) {
      console.error(`DemoReadableStream cancelled bc. of: `, reason);
      clearInterval(timerId);
    },
  });

  return readableStream;
}
