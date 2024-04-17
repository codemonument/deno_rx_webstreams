export function from<T>(data: T[]): ReadableStream<T> {
  if (!Array.isArray(data)) {
    throw new Error(
      `from() expects an array as an argument but got "${typeof data}" and data: `,
      data,
    );
  }

  const readableStream = new ReadableStream<T>({
    start(controller) {
      data.forEach((chunk) => {
        controller.enqueue(chunk);
      });
      controller.close();
    },
    pull(_controller) {
    },
    cancel(reason) {
      console.error(
        `Readable stream originated from from() cancelled bc. of: `,
        reason,
      );
    },
  });

  return readableStream;
}
