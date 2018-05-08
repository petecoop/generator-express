'use strict';

const expect = require('chai').expect;
const app = require('../');

describe('app', () => {
  it('should load', () => {
    expect(app).to.be.a('function');
  });
});
