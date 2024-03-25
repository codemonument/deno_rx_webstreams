import { assertExists, describe, it } from "@deps/std_testing.ts";
import { stringToUtf8Bytes } from "@mod";
import { from } from "@mod";
import { of } from "@mod";
import {
  bytesToString,
  emittableSource,
  EmittableSourceStream,
  fileSource,
  filter,
  map,
  multiplexSource,
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
    assertExists(multiplexSource);
    assertExists(of);
    assertExists(from);

    // Transforms
    assertExists(bytesToString);
    assertExists(stringToLines);
    assertExists(map);
    assertExists(filter);
    assertExists(validateChunk);
    assertExists(stringToUtf8Bytes);

    // Targets
    assertExists(simpleCallbackTarget);

    // Utils
    assertExists(UnderlyingSourceWithController);
  });
});
