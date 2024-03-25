import { assertEquals, describe, it } from "@deps/std_testing.ts";
import { of, simpleCallbackTarget, stringToUtf8Bytes } from "@mod";

describe(`stringToUtf8Bytes() Transformer`, () => {
  it(`should transcode text to  utf8 bytes`, async () => {
    const stream = of("Hello World");

    await stream.pipeThrough(stringToUtf8Bytes())
      .pipeTo(
        simpleCallbackTarget((chunk) =>
          assertEquals(
            chunk,
            new Uint8Array([
              72,
              101,
              108,
              108,
              111,
              32,
              87,
              111,
              114,
              108,
              100,
            ]),
          )
        ),
      );
  });
});
