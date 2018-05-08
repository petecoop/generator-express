'use strict';

const expect = require('chai').expect;
const supertest = require('supertest');

const app = require('../../');

describe('/', () => {
  it('should load', () => {
    expect(app).to.be.a('function');
  });

  describe('render', () => {
    it('should render index', (done) => {
      supertest(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((err, res) => {
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

  describe('errors', () => {
    it('should handle pages which are not found', (done) => {
      supertest(app)
        .get('/notexistant')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
