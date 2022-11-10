export type BytesToStringOptions = {
  label?: string;
} & TextDecoderOptions;

const defaultOptions: BytesToStringOptions = {};

/**
 * Creates a TransformStream (Webstream) which transforms uint8Array chunks to a string.
 * Detects input encoding automatically!
 */
export function bytesToString(
  options?: BytesToStringOptions,
) {
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }
  const { label } = options;

  return new TextDecoderStream(label, options);
}
