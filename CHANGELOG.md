# Changelog rx_webstreams

## 0.9.2 - 204-03-25

- Update License to MIT (missed publishing it correctly in the last tag)

## 0.9.1 - 204-03-25

- Update License to MIT

## 0.9.0 - 204-03-25

- new of() - utility function to create a one-shot stream of one value
- new from() - utility function to create a stream from an array of values
- new stringToUtf8Bytes() - Transformer to convert string chunks to Uint8Array chunks

## 0.8.1 - 2024-03-24

- fix description for filter() transform
- upgrade dependencies

## 0.8.0 - 2023-02-21

- add new `reduce()` transformer with tests

## 0.7.2 - 2022-11-29

- fix imports of multiplexSource to not use @mod import_map

## 0.7.1 - 2022-11-20

- Add missing export for multiplexSource in mod.ts

## 0.7.0 - 2022-11-20

- Add multiplexSource() to mix multiple readable streams of same type T into one readable stream!
  (Useful for showing multiple progress bars)

## 0.6.1 - 2022-11-14

- Override cancel() function in EmittableSourceStream to close stream correctly by closing the underlying controller.
- Remove now-obsolete EmittableSourceStream::finish() method.

## 0.6.0 - 2022-11-14

- Extend map() to be able to validate input chunk via zod schema
- Add validateChunk() TransformStream
- Add filter() TransformStream

## 0.5.1 - 2022-11-14

- Fix export of emittableSource()

## 0.5.0 - 2022-11-14

- Improve internal repo structure
- Add map() TransformStream

## 0.4.3 - 2022-11-14

- Export UnderlyingSourceWithController for external users being able to write extended emittable sources.
  (Only for advanced Usecases)

## 0.4.2 - 2022-11-14

- Remove all default generic typings of 'any' and replace them with 'unknown' for better type safety

## 0.4.1 - 2022-11-11

- Rename EmittableSource class to EmittableSourceStream
- Add emittableSource() function which wraps EmittableSourceStream
- Delete version.ts since it couldn't keep up with real new versions. Source of truth for versions: git tags.

## 0.4.0 - 2022-11-11

- Add EmittableSource (builds a readable stream which allows manually emitting events from outside)

## 0.3.0 - 2022-11-10

- Add fileSource (opens a readable stream from a filepath and emits Uint8Array chunks)
- Add bytesToString Transform (transforms Uint8Array chunks to a string)
- Add stringToLines Transform (transforms string chunks to one string line per chunk)

## 0.2.0 - 2022-11-08

- Add simpleCallbackTarget() and mark it as implemented in readme

## 0.1.1 - 2022-11-08

- Mark timerSource() as implemented in readme
- Add 'Usage' note in readme

## 0.1.0 - 2022-11-08

- Implement timerSource() functions

## 0.0.1 - 2022-11-06

- Initial Version (with nothing more than the idea in the readme)
