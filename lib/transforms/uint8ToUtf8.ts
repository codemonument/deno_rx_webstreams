export type Uint8ToUtf8Options = {
  label?: string;
} & TextDecoderOptions;

const defaultOptions: Uint8ToUtf8Options = {};

/**
 * Creates a Source ReadableStream (Webstream) which opens a file for reading.
 */
export function uint8ToUtf8(
  options?: Uint8ToUtf8Options,
) {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const { label } = options;

  return new TextDecoderStream(label, options);
}
