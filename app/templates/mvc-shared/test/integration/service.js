'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../../');

describe('/', function() {
  it('should load', function() {
    expect(app).to.be.a('function');
  });

  describe('render', function() {
    it('should render index', function(done) {
      supertest(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);
          expect(res.text).to.include('doctype');
          expect(res.text).to.include('<title>Generator-Express MVC</title>');

          done();
        });
    });
  });

  describe('errors', function() {
    it('should handle pages which are not found', function(done) {
      supertest(app)
        .get('/notexistant')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(404);

          done();
        });
    });
  });
});
