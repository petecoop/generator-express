'use strict';

var expect = require('chai').expect;
var express = require('express');
var configure = require('../../../config/express');

describe('configure express', function() {
  it('should load', function() {
    expect(configure).to.be.a('function');
  });

  it('should return the app', function() {
    var app = express();

    expect(configure(app, {})).to.eql(app);
  });
});
