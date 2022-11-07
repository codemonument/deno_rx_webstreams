import { assertExists, describe, it } from "@deps/std_testing.ts";
import { timerSource } from "@mod";

describe(`mod.ts`, () => {
  it(`should export correct objects and types`, () => {
    assertExists(timerSource);
  });
});
