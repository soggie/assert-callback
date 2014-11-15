'use strict';

var assert = require('assert');
var cass   = null;

// No idea what to call this function, but it basically adds the callback thing
// to the end of the assert
function zap(older, newer, name) {
  var olderCall = (typeof name === 'string') ? older[name] : older;
  var newerCall = (typeof name === 'string') ? newer[name] : newer;

  var zappa = function () {
    var args = Array.prototype.slice.call(arguments);
    var done = null;

    // strip the last argument and see if it is a callback
    if (typeof args[args.length - 1] === 'function') {
      done = args.pop();
    }

    try {
      olderCall.apply(older, args);
    } catch (err) {
      if (typeof done === 'function') {
        done(err);
        return;
      }

      throw err;
    }
  };

  newerCall = zappa;

  return newerCall;
};

cass                = zap(assert, cass);
cass.ok             = zap(assert, cass, 'ok');
cass.equal          = zap(assert, cass, 'equal');
cass.notEqual       = zap(assert, cass, 'notEqual');
cass.deepEqual      = zap(assert, cass, 'deepEqual');
cass.notDeepEqual   = zap(assert, cass, 'notDeepEqual');
cass.strictEqual    = zap(assert, cass, 'strictEqual');
cass.notStrictEqual = zap(assert, cass, 'notStrictEqual');

// cass.throws         = zap(assert, cass, 'throws');
// cass.doesNotThrow   = zap(assert, cass, 'doesNotThrow');

cass.throws         = assert.throws;
cass.doesNotThrow   = assert.doesNotThrow;
cass.ifError        = assert.ifError;
cass.fail           = assert.fail;

module.exports = cass;