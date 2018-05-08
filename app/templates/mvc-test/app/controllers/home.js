'use strict';

const expect = require('chai').expect;

const home = require('../../../app/controllers/home');

describe('home routes', () => {
  it('should load', () => {
    expect(home).to.be.a('function');
  });
});
