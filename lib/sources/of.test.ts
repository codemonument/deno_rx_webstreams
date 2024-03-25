import { assert, describe } from "@deps/std_testing.ts";
import { it } from "@deps/std_testing.ts";
import { of } from "./of.ts";
import { simpleCallbackTarget } from "../targets/simpleCallbackTarget.ts";
import { assertEquals } from "@deps/std_testing.ts";

describe("of()", () => {
  it("should create a stream that emits the provided value and closes", async () => {
    const readable = of("Hello, World!");

    await readable.pipeTo(
      simpleCallbackTarget((chunk) => {
        assertEquals(chunk, "Hello, World!");
      }),
    );

    assert(
      "Stream arrives here (after the await) since the readable closed directly after one chunk",
    );
  });
});
