# assert-callback

A drop-in replacement library that allows you to use asserts inside an async function utilising callbacks to handle errors.

## API Parity

  * `[X]` ... `assert(value, [message])`
  * `[X]` ... `assert.ok(value, [message])`
  * `[X]` ... `assert.equal(actual, expected, [message])`
  * `[X]` ... `assert.notEqual(actual, expected, [message])`
  * `[X]` ... `assert.deepEqual(actual, expected, [message])`
  * `[X]` ... `assert.notDeepEqual(actual, expected, [message])`
  * `[X]` ... `assert.strictEqual(actual, expected, [message])`
  * `[X]` ... `assert.notStrictEqual(actual, expected, [message])`
  * `[ ]` ... `assert.throws(block, [error], [message])`
  * `[ ]` ... `assert.doesNotThrow(block, [message])`

## Installation

    npm install assert-callback

## Usage

Like the normal `assert()`, if the test condition (1st argument) fails, instead of throwing an exception, if you gave it a callback it will call the callback and pass the exception into it as the first argument, as per node.js' convention.

    var assert = require('assert-callback');

    var test = function (data, done) {
      assert(typeof data === 'object', 'Expecting data to be an object', done);
    };

    test(null, function (err) {
      console.log(err.message); // Expecting data to be an object
    });

If the condition passes, it acts like a normal assert:

    var assert = require('assert-callback');

    assert(true, 'Expecting no problems');
    console.log('Yeah'); // Code execution reaches here, no problem!

Here's an example of how you can use it in a real project, say, inside your MVC's model:

    // Assuming params is an object containing data to be saved into the DB
    saveToDatabase(params, callback) {
      assert(params.id, callback);
      assert(params.name, callback);

      assert.equal(params.verified, true, 'Data must be verified before saving', callback);

      // The rest of your code
      callback(null, 'Save completed!');
    }

## Caveat

Note: `assert.throws`, `assert.doesNotThrow`, `assert.isEqual` and `assert.fail` functions the same as node's assert, callback or not.

## MIT License

Copyright (c) 2014 Ruben L Z Tan (soggie)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.