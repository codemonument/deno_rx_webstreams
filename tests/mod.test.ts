import { assertExists, describe, it } from "@deps/std_testing.ts";
import {
  bytesToString,
  emittableSource,
  EmittableSourceStream,
  fileSource,
  filter,
  map,
  simpleCallbackTarget,
  stringToLines,
  timerSource,
  UnderlyingSourceWithController,
  validateChunk,
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
    assertExists(filter);
    assertExists(validateChunk);

    // Targets
    assertExists(simpleCallbackTarget);

    // Utils
    assertExists(UnderlyingSourceWithController);
  });
});
