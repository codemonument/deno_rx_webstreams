import { sanitizeOptions } from "../utils/sanitizeOptions.ts";
export type BytesToStringOptions = {
  label?: string;
} & TextDecoderOptions;

const defaults: BytesToStringOptions = {};

/**
 * Creates a TransformStream (Webstream) which transforms uint8Array chunks to a string.
 * Detects input encoding automatically!
 *
 * Basically the same as TextDecoderStream in deno std
 */
export function bytesToString(
  options?: BytesToStringOptions,
) {
  const { label } = sanitizeOptions(options, defaults);
  return new TextDecoderStream(label, options);
}
