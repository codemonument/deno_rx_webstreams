import { assert, describe, it } from "@deps/std_testing.ts";
import { fileSource, simpleCallbackTarget } from "@mod";
import { uint8ToUtf8 } from "@mod";

describe(`FileSource`, () => {
  it(`Should transcode utf8 file bytes to text`, async () => {
    const stream = await fileSource(
      `tests/testdata/fileSourceUtf8.example.txt`,
    );
    await stream.pipeThrough(uint8ToUtf8({}))
      .pipeTo(
        simpleCallbackTarget((chunk) => console.log(`Chunk: `, chunk)),
      );
  });

  it(`Should transcode windows1252 file bytes to text`, async () => {
    const stream = await fileSource(
      `tests/testdata/fileSourceWin1252.example.txt`,
    );
    await stream.pipeThrough(uint8ToUtf8({}))
      .pipeTo(
        simpleCallbackTarget((chunk) => console.log(`Chunk: `, chunk)),
      );
  });
});
