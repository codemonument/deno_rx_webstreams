import { UnderlyingSourceWithController } from "../utils/UnderlyingSourceWithController.ts";
export class EmittableSource<T> extends ReadableStream<T> {
  private controller: ReadableStreamDefaultController;

  constructor(source: UnderlyingSourceWithController) {
    super(source);
    this.controller = source.controller;
  }

  public static create<T = any>(): EmittableSource<T> {
    const source = new UnderlyingSourceWithController<T>();
    return new EmittableSource<T>(source);
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
