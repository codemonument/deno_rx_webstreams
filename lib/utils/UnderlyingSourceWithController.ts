import { IllegalAccess } from "./IllegalAccess.error.ts";
export class UnderlyingSourceWithController<R = any>
  implements UnderlyingSource<R> {
  #controller?: ReadableStreamDefaultController<R>;

  constructor() {
  }

  cancel?: ReadableStreamErrorCallback;
  pull?: ReadableStreamDefaultControllerCallback<R>;
  start?: ReadableStreamDefaultControllerCallback<R> = (controller) => {
    this.#controller = controller;
  };
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
