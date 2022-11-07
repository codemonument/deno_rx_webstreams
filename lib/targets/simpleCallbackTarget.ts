export type ChunkCallback<T> = (
  chunk: T,
) => void;

/**
 * Creates a Target WritableStream (Webstream)
 * which gets the chunks of a stream and calls the chunkCallback function
 */
export function simpleCallbackTarget<InputType>(
  chunkCallback: ChunkCallback<InputType>,
): WritableStream<InputType> {
  return new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    write(_chunk, _controller) {
      chunkCallback(_chunk);
    },
    close() {
    },
    abort(reason) {
      console.error("Stream error:", reason);
    },
  });
}
