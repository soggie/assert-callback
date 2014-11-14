# assert-callback

A simple library that allows you to use asserts inside an async function utilising callbacks

## Status

  * `assert.fail(actual, expected, message, operator)`
  * `assert(value, [message])` --> done (`test/assert.test.js`)
  * `assert.ok(value, [message])`
  * `assert.equal(actual, expected, [message])`
  * `assert.notEqual(actual, expected, [message])`
  * `assert.deepEqual(actual, expected, [message])`
  * `assert.notDeepEqual(actual, expected, [message])`
  * `assert.strictEqual(actual, expected, [message])`
  * `assert.notStrictEqual(actual, expected, [message])`
  * `assert.throws(block, [error], [message])`
  * `assert.doesNotThrow(block, [message])`
  * `assert.ifError(value)`

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