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

## Parts 

- Sources: Predefined Readable Streams, like fileSource(), timerSource(), and more 
- Transforms: Predefined Transport Streams, like map(), reduce(), and more 
- Targets: Predefined Writable Streams, like fileTarget(), urlTarget(), and more

## Usage 

ToDo (Look at the tests in the meantime! They give you a very good idea of how to use those!)

## Sources

- timerSource() - implemented ✅
- fileSource() - planned

## Transforms

- map() - planned
- reduce() - planned

## Targets

- simpleCallbackTarget() - implemented ✅
- fileTarget() - planned
- urlTarget() - in consideration

## Useful Links 

- [web.dev - Guide to Webstreams](https://web.dev/streams/)
- [MDN - General Section on Webstreams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [MDN - Webstreams API Concepts](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts)
- [MDN - Using Readable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)
- [MDN - Using Readable Byte Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_byte_streams)
- [MDN - Using Writable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_writable_streams)