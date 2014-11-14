'use strict';

var assert = require('assert');
var obj1   = { foo : { bar : 'bar' } };
var obj2   = { foo : { bar : 'bar2' } };

//  GIVEN assert is loaded as a module
//    WHEN assert.deepEqual() is called and the condition passes
//    THEN it should return with no errors
//    
//    WHEN assert.deepEqual() is called and the condition fails
//    THEN it should pass the exception to the callback
//    
//    WHEN assert.deepEqual() is called without a callback
//     AND the condition passes
//    THEN it should return with no errors
//    
//    WHEN assert.deepEqual() is called without a callback
//     AND the condition fails
//    THEN it should throw an error like normal asserts do
describe('GIVEN assert is loaded as a module', function () {
  var cass = require('../lib');

  describe('WHEN assert.deepEqual() is called and the condition passes', function () {
    it('THEN it should return with no errors', function (done) {

      cass.deepEqual(obj1, obj1, 'Should pass', function (err) {
        console.log(err);
        assert(err === null);
      });
      
      setTimeout(function () {
        done();
      }, 500);

    });
  });

  describe('WHEN assert.deepEqual() is called and the condition fails', function () {
    it('THEN it should pass the exception to the callback', function (done) {

      cass.deepEqual(obj1, obj2, 'Should fail', function (err) {
        assert(err !== null);
        console.log(err.message);
        assert(err.message === 'Should fail');
        done();
      });

    });
  });

  describe('WHEN assert.deepEqual() is called without a callback AND the condition passes', function () {
    it('THEN it should return with no errors', function (done) {

      cass.deepEqual(obj1, obj1, 'Should pass');
      
      setTimeout(function () {
        done();
      }, 500);
      
    });
  });

  describe('WHEN assert.deepEqual() is called without a callback AND the condition fails', function () {
    it('THEN it should throw an error like normal asserts do', function (done) {

      try {
        cass.deepEqual(obj1, obj2, 'Should fail');
      } catch (err) {
        assert(err !== null);
        assert(err.message === 'Should fail');
      }
      done();

    });
  });

  describe('WHEN assert.deepEqual() is called without the message parameter AND the condition fails', function () {
    it('THEN it should pass the exception to the callback', function (done) {

      cass.deepEqual(obj1, obj2, function (err) {
        assert(err !== null);
        done();
      });

    });
  });
});