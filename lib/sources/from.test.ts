import { assert, assertEquals, describe, it } from "@deps/std_testing.ts";
import { simpleCallbackTarget } from "../targets/simpleCallbackTarget.ts";
import { from } from "./from.ts";

describe("from()", () => {
  it("should create a stream that emits the provided values of one type in the array and closes", async () => {
    const readable = from(["Hello", "World"]);

    let round = 0;

    await readable.pipeTo(
      simpleCallbackTarget((chunk) => {
        if (round === 0) {
          assertEquals(chunk, "Hello");
          round++;
        } else if (round === 1) {
          assertEquals(chunk, "World");
          round++;
        } else {
          throw new Error(
            "Stream should have closed after the second chunk, but sees another chunk!",
          );
        }
      }),
    );

    assert(
      "Stream arrives here (after the await) since the readable closed directly after emiting all chunks",
    );
  });

  it("should create a stream that emits the provided values of mixed types in the array and closes", async () => {
    const readable = from(["Hello", 2, "World", true]);

    let round = 0;

    await readable.pipeTo(
      simpleCallbackTarget((chunk) => {
        if (round === 0) {
          assertEquals(chunk, "Hello");
          round++;
        } else if (round === 1) {
          assertEquals(chunk, 2);
          round++;
        } else if (round === 2) {
          assertEquals(chunk, "World");
          round++;
        } else if (round === 3) {
          assertEquals(chunk, true);
          round++;
        } else {
          throw new Error(
            "Stream should have closed after the second chunk, but sees another chunk!",
          );
        }
      }),
    );

    assert(
      "Stream arrives here (after the await) since the readable closed directly after emiting all chunks",
    );
  });
});
