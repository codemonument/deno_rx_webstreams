import { assertExists, describe, it } from "@deps/std_testing.ts";
import {
  bytesToString,
  emittableSource,
  EmittableSourceStream,
  fileSource,
  simpleCallbackTarget,
  stringToLines,
  timerSource,
} from "@mod";

describe(`mod.ts`, () => {
  it(`should export correct objects and types`, () => {
    // Sources
    assertExists(fileSource);
    assertExists(timerSource);
    assertExists(emittableSource);
    assertExists(EmittableSourceStream);

    // Transforms

    assertExists(bytesToString);
    assertExists(stringToLines);

    // Targets
    assertExists(simpleCallbackTarget);
  });
});
