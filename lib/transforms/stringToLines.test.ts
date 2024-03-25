import { describe, it } from "@deps/std_testing.ts";
import {
  bytesToString,
  fileSource,
  simpleCallbackTarget,
  stringToLines,
} from "@mod";

describe(`FileSource`, () => {
  it(`Should convert string with newlines to line chunks`, async () => {
    const stream = await fileSource(
      `tests/testdata/fileSourceUtf8.example.txt`,
    );
    await stream
      .pipeThrough(bytesToString())
      .pipeThrough(stringToLines())
      .pipeTo(
        simpleCallbackTarget((chunk) => console.log(`Chunk: `, chunk)),
      );
  });
});
