import { describe, it } from "@deps/std_testing.ts";
import { fileSource, simpleCallbackTarget } from "@mod";

describe(`fileSource()`, () => {
  it(`Should open file`, async () => {
    const stream = await fileSource(
      `tests/testdata/fileSourceUtf8.example.txt`,
    );
    await stream.pipeTo(simpleCallbackTarget((chunk) => console.log(chunk)));
  });
});
