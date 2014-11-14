'use strict';

var assert = require('assert');
var cass   = null;

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

module.exports = cass;