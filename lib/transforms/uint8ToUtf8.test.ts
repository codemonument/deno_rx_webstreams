import { assert, describe, it } from "@deps/std_testing.ts";
import { fileSource, simpleCallbackTarget } from "@mod";
import { uint8ToTextTransform } from "./uint8ToTextTransform.ts";

describe(`FileSource`, () => {
  it(`Should transcode file bytes to text`, async () => {
    const stream = await fileSource(`tests/testdata/fileSource.example.txt`);
    await stream.pipeThrough(uint8ToTextTransform({}))
      .pipeTo(simpleCallbackTarget((chunk) => console.log(chunk)));
  });
});
