'use strict';

var expect = require('chai').expect;

var app = require('../');

describe('app', function() {
  it('should load', function() {
    expect(app).to.be.a('function');
  });
});
