import { assertExists, describe, it } from "@deps/std_testing.ts";
import {
  bytesToString,
  emittableSource,
  EmittableSourceStream,
  fileSource,
  map,
  simpleCallbackTarget,
  stringToLines,
  timerSource,
  UnderlyingSourceWithController,
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
    assertExists(map);

    // Targets
    assertExists(simpleCallbackTarget);

    // Utils
    assertExists(UnderlyingSourceWithController);
  });
});
