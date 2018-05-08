'use strict';

const expect = require('chai').expect;
const express = require('express');
const configure = require('../../../config/express');

describe('configure express', () => {
  it('should load', () => {
    expect(configure).to.be.a('function');
  });

  it('should return the app', () => {
    const app = express();

    expect(configure(app, {})).to.eql(app);
  });
});
