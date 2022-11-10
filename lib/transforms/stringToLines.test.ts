import { assert, describe, it } from "@deps/std_testing.ts";
import {
  fileSource,
  simpleCallbackTarget,
  stringToLines,
  uint8ToUtf8,
} from "@mod";

describe(`FileSource`, () => {
  it(`Should convert string with newlines to line chunks`, async () => {
    const stream = await fileSource(`tests/testdata/fileSource.example.txt`);
    await stream
      .pipeThrough(uint8ToUtf8({}))
      .pipeThrough(stringToLines())
      .pipeTo(
        simpleCallbackTarget((chunk) => console.log(`New Chunk: `, chunk)),
      );
  });
});
