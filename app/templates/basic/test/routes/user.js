'use strict';

var expect = require('chai').expect;

var user = require('./../../routes/user');

describe('user routes', function() {
  it('should load', function() {
    expect(user).to.be.a('function');
  });
});
