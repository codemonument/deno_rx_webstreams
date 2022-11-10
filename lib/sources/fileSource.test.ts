import { assert, describe, it } from "@deps/std_testing.ts";
import { fileSource, simpleCallbackTarget } from "@mod";

describe(`FileSource`, () => {
  it(`Should open file`, async () => {
    const stream = await fileSource(`tests/testdata/fileSource.example.txt`);
    await stream.pipeTo(simpleCallbackTarget((chunk) => console.log(chunk)));
  });
});
