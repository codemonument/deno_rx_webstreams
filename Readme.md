# Rx Webstreams

**Note: Very limited coverage right now**
Compared to rxJS, this lib has not nearly implemented enough at the time.
But, all things that are added are inteded to be unit-tested well.

The good thing: each pice of this lib can be used separately with other webstreams found in any other library.  
Because of the webstreams foundation they will likely be compatible.
In fact, I use many of these things implemented here myself,
for example the timerSource() package for generating example events for testing cli progress bars.  
See here for details in the [progress package](https://deno.land/x/progress): https://github.com/deno-library/progress/blob/master/tests/mod.test.ts

## Description

A deno package by [@codemonument](https://github.com/codemonument) with RxJS like functionality, but for webstreams.
It provides a lot of predefined sources, targets and especially transforms!

Note, that the api is inspired by RxJS, but not related in any other way.
This package is especially not based on RxJS!

## Parts Overview

First: Know the deno std stream utilities! https://deno.land/std@0.220.1/streams/mod.ts

- Sources: Predefined Readable Streams, like fileSource(), timerSource(), and more
- Transforms: Predefined Transport Streams, like map(), reduce(), and more
- Targets: Predefined Writable Streams, like fileTarget(), urlTarget(), and more

### Sources

- timerSource() - implemented ✅
- fileSource() - implemented ✅ - (with simple Uint8Array Chunks)
- emitableSource() - implemented ✅ - allows to manually emit chunks into the controller of this readable stream
- multiplexSource() - implemented ✅ - allows to mix multiple readable streams of same type T into one readable stream.
  Each chunk will therefore be wrapped into an event object which uniquely identifies the source readable of this chunk in the resulting stream
- of() - implemented ✅ - creates a readable stream and emits the parameter as the one and only chunk
- from() - implemented ✅ - creates a readable stream and emits the parameter as chunks, if it is an array

### Transforms

- bytesToString() - implemented ✅ - converts uint8Array chunk to string
- stringToLines() - implemented ✅ - converts string chunks delimited by newline into one string line per chunk
- map() - implemented ✅ - maps from one type of chunk to another
- filter() - implemented ✅ - removes chunks from a stream based on a predicate function (returns true or false)
- reduce() - implemented ✅ - allows to collect previous events into a single aggregate.
  The aggregate will be delivered to further streams at each input event.
- collect() - in consideration - collects chunks as array with options for: how long should chunks be collected? (specific time, until buffer full, specific count, etc.) and emits the resulting array as event (similar to rxjs buffer)

### Targets

- simpleCallbackTarget() - implemented ✅
- fileTarget() - planned
- urlTarget() - in consideration

## Detailed Usage Descriptions

TODO: (Look at the tests in the meantime! They give you a very good idea of how to use those!)

## timerSource()

Creates a stream of events in regular intervalls. Uses `setInterval` unter the hood.
Has two usage modis:

- "Count Mode"
- Endless Mode

Extended usage:
"Waiting for X Seconds in a function with await"

## Useful Links

- [web.dev - Guide to Webstreams](https://web.dev/streams/)
- [MDN - General Section on Webstreams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [MDN - Webstreams API Concepts](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts)
- [MDN - Using Readable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)
- [MDN - Using Readable Byte Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_byte_streams)
- [MDN - Using Writable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_writable_streams)
- [Interesting Guide to Webstreams on sitepen](https://www.sitepen.com/blog/a-guide-to-faster-web-app-io-and-data-operations-with-streams)

## Open Issues

Nothing currently (only that it's an incomplete collection of tools)

## Decision Archive

### Unified Convention for API Surface of rx_webstreams

- Find unified convetion whether my sources, transforms and targets should be classes or functions!

  - Pro: Classes can have extra methods (for example: starting/stopping a timer source, or emitting chunks manually)
  - Contra: Can't build an EmittableSource as extends ReadableStream (due to not being able to extract the controller in the constructor)
    => Must build EmittableSource as emittableSource.readble to access the underlying readable stream.
    => To have unified convention, a class-based system, all classes must then use a `.readable` and `.writable` property
    => this is more ugly than accessing the source directly, like: new Source().readable.pipeThrough().pipeTo(new Target().writable)

- Hints:
  - Deno std/streams uses classes which directly implement ReadableStream, TransformStream or WritableStream.
    - Delimiter (TransformStream): https://deno.land/std@0.163.0/streams/delimiter.ts?source
    - Buffer (complete custom, with private readable and writable)
      https://deno.land/std@0.163.0/streams/buffer.ts?source

=> Decision: Use functions, which return things that can directly be used with .pipeThrough() and .pipeTo().
This allow the implementer of these functions to reuse functionality implemented as classes by deno or custom classes from this package, by having a unified interface to the outside world.
