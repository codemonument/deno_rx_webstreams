/**
 * A utility function to create a readable stream from a single value.
 * @param data: T
 * @returns ReadableStream<T>
 */
export function of<T>(data: T): ReadableStream<T> {
  const readableStream = new ReadableStream<T>({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
    pull(_controller) {
    },
    cancel(reason) {
      console.error(
        `Readable stream originated from of() cancelled bc. of: `,
        reason,
      );
    },
  });

  return readableStream;
}
