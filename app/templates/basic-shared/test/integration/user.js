'use strict';

var debug = require('debug')('test:integration:user');
var expect = require('chai').expect;
var supertest = require('supertest');

var api = require('./../../');

describe('/users', function() {
  describe('GET', function() {
    it('should list users', function(done) {
      supertest(api)
        .get('/users')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.text).to.equal('respond with a resource');

          done();
        });
    });
  });
});
