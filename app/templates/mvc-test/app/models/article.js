'use strict';

const expect = require('chai').expect;

const article = require('../../../app/models/article');

describe('article', () => {
  it('should load', () => {
    expect(article).to.be.a('function');
  });
});
