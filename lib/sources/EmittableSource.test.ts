import { describe, it } from "@deps/std_testing.ts";
import { emittableSource, simpleCallbackTarget } from "@mod";

describe(`EmittableSource`, () => {
  it(`Should create source object`, () => {
    const stream = emittableSource();
    stream.emit(`My first event!`);
    stream.emit(`My second event!`);
    stream.pipeTo(simpleCallbackTarget((chunk) => console.log(chunk)));

    stream.cancel();
  });

  it(`Should close emittableSource on .cancel()`, () => {
    const stream = emittableSource();
    stream.emit(`My first event!`);
    stream.emit(`My second event!`);
    stream.pipeTo(simpleCallbackTarget((chunk) => console.log(chunk)));

    stream.cancel();
  });
});
