import { IllegalAccess } from "../errors.ts";

/**
 * Type R = The type which is emitted by this underlying source
 */
export class UnderlyingSourceWithController<R = unknown>
  implements UnderlyingDefaultSource<R> {
  #controller?: ReadableStreamDefaultController<R>;

  cancel(_reason?: unknown) {
    // Does not work bc. stream is mostly in use when it should be canceled!
    // this.#controller?.close();
  }

  // pull() {}

  start(controller: ReadableStreamDefaultController<R>) {
    this.#controller = controller;
  }
  type?: undefined;

  get controller() {
    if (!this.#controller) {
      throw new IllegalAccess(
        `No controller available yet. Please wait a bit longer, it should appear automatically in the next js tick`,
      );
    }

    return this.#controller;
  }
}
