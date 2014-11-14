# assert-callback

A simple library that allows you to use asserts inside an async function utilising callbacks

## Installation

    npm install assert-callback

## Usage

    var assert = require('assert-callback');

    var test = function (data, done) {
      assert(typeof data === 'object', 'Expecting data to be an object', done);
    };