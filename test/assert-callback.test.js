'use strict';

var assert = require('assert');

//  GIVEN assert is loaded as a module
//    WHEN assert() is called and the condition passes
//    THEN it should return with no errors
//    
//    WHEN assert() is called and the condition fails
//    THEN it should pass the exception to the callback
//    
//    WHEN assert() is called without a callback
//     AND the condition passes
//    THEN it should return with no errors
//    
//    WHEN assert() is called without a callback
//     AND the condition fails
//    THEN it should throw an error like normal asserts do
//    
//    WHEN assert() is called without the message parameter
//     AND the condition fails
//    THEN it should pass the exception to the callback
describe('GIVEN assert is loaded as a module', function () {
  var cass = require('../lib');

  describe('WHEN assert() is called and the condition passes', function () {
    it('THEN it should return with no errors', function (done) {

      cass(true, 'Should pass', function (err) {
        assert(err === null);
        done();
      });

    });
  });

  describe('WHEN assert() is called and the condition fails', function () {
    it('THEN it should pass the exception to the callback', function (done) {

      cass(false, 'Should fail', function (err) {
        assert(err !== null);
        assert(err.message === 'Should fail');
        done();
      });

    });
  });

  describe('WHEN assert() is called without a callback AND the condition passes', function () {
    it('THEN it should return with no errors', function (done) {

      cass(true, 'Should pass');

    });
  });

  describe('WHEN assert() is called without a callback AND the condition fails', function () {
    it('THEN it should throw an error like normal asserts do', function (done) {

      try {
        cass(false, 'Should fail');
      } catch (err) {
        assert(err !== null);
        assert(err.message === 'Should fail');
      }
      done();

    });
  });

  describe('WHEN assert() is called without the message parameter AND the condition fails', function () {
    it('THEN it should pass the exception to the callback', function (done) {

      cass(false, function (err) {
        assert(err !== null);
        done();
      });

    });
  });
});