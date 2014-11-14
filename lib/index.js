'use strict';

var assert = require('assert');
var cass   = null;

// No idea what to call this function, but it basically adds the callback thing
// to the end of the assert
function zap(ori, name, frame) {
  var zappa = function () {
    var args = Array.prototype.slice.call(arguments);
    var done = null;

    // strip the last argument and see if it is a callback
    if (typeof args[args.length - 1] === 'function') {
      done = args.pop();
    }

    try {
      ori.apply(ori, args);
    } catch (err) {
      if (done) {
        done(err);
        return;
      }

      throw err;
    }
  };

  // This is to ensure that we support both `assert` and `assert.functions`
  if (typeof name === 'object') {
    frame = zappa;
  } else {
    frame[name] = zappa;
  }

  return frame;  
}

cass                = zap(assert, cass);
cass.fail           = zap(assert, 'fail', cass);
cass.equal          = zap(assert, 'equal', cass);
cass.notEqual       = zap(assert, 'notEqual', cass);
cass.deepEqual      = zap(assert, 'deepEqual', cass);
cass.notDeepEqual   = zap(assert, 'notDeepEqual', cass);
cass.strictEqual    = zap(assert, 'strictEqual', cass);
cass.notStrictEqual = zap(assert, 'notStrictEqual', cass);
cass.throws         = zap(assert, 'throws', cass);
cass.doesNotThrow   = zap(assert, 'doesNotThrow', cass);
cass.ifError        = assert.ifError;

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