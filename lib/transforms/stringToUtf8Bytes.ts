/**
 * Creates a TransformStream (Webstream) which transforms a string to utf8 bytes as uint8 array.
 *
 * Basically the same as [TextEncoderStream](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoderStream) from Whatwg Standard
 */
export function stringToUtf8Bytes(): TextEncoderStream {
  return new TextEncoderStream();
}
