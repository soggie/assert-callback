'use strict';

var assert = require('assert');
var cass   = null;

// value = the condition to test for
// msg   = the message to show if the test failed
// done  = the callback to call if an error happened
cass = function (value, msg, done) {
  if (typeof msg === 'function') {
    done = msg;
    msg  = null;
  }

  try {
    return assert(value, msg);
  } catch (err) {
    if (done) {
      done(err);
      return;
    }

    throw err;
  }
};

// cass.fail = 
// cass.equal = 
// cass.notEqual = 
// cass.deepEqual = 
// cass.notDeepEqual = 
// cass.strictEqual = 
// cass.notStrictEqual =
// cass.throws = 
// cass.doesNotThrow =
// cass.ifError = 

module.exports = cass;