import { UnderlyingSourceWithController } from "../utils/UnderlyingSourceWithController.ts";

/**
 * An emittable source which tries to implement ReadableStream and pass all functions down to an internal readable Stream
 *
 * @throws IllegalAccess Exception
 */
export class EmittableSource<T> implements ReadableStream<T> {
  private controller: ReadableStreamDefaultController<T>;

  private stream: ReadableStream<T>;

  private source: UnderlyingSourceWithController<T>;

  constructor() {
    this.source = new UnderlyingSourceWithController<T>();
    this.stream = new ReadableStream<T>(this.source);
    this.controller = this.source.controller;
  }

  get locked(): boolean {
    return this.stream.locked;
  }

  cancel(reason?: unknown): Promise<void> {
    return this.stream.cancel(reason);
  }

  getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
  getReader(
    options?: { mode?: undefined } | undefined,
  ): ReadableStreamDefaultReader<T>;
  getReader(
    options?: unknown,
  ): ReadableStreamBYOBReader | ReadableStreamDefaultReader<T> {
    if (typeof options === "undefined") return this.stream.getReader();

    if (
      typeof options === "object" && options !== null &&
      Object.hasOwn(options, "mode")
    ) {
      return this.stream.getReader(options);
    }

    return this.stream.getReader(options);
  }

  pipeThrough<T>(
    transform: { writable: WritableStream<T>; readable: ReadableStream<T> },
    options?: PipeOptions | undefined,
  ): ReadableStream<T> {
    return this.stream.pipeThrough<T>(transform, options);
  }

  pipeTo(
    dest: WritableStream<T>,
    options?: PipeOptions | undefined,
  ): Promise<void> {
    return this.stream.pipeTo(dest, options);
  }

  tee(): [ReadableStream<T>, ReadableStream<T>] {
    return this.stream.tee();
  }

  [Symbol.asyncIterator](
    options?: { preventCancel?: boolean | undefined } | undefined,
  ): AsyncIterableIterator<T> {
    return this.stream[Symbol.asyncIterator];
  }

  /**
   * Enqeues chunks on demand!
   */
  public emit(chunk: T) {
    this.controller.enqueue(chunk);
  }

  /**
   * Enqueues many chunks on demand!
   */
  public emitMany(chunks: T[]) {
    for (const chunk of chunks) {
      this.controller.enqueue(chunk);
    }
  }

  /**
   * Closes the underlying controller of this EmittableSource
   */
  public finish() {
    this.controller.close();
  }
}
