'use strict';

var expect = require('chai').expect;

var model = require('../../../app/models/index');

describe('model', function() {
  it('should load', function() {
    expect(model).to.be.a('object');
    expect(model.sequelize).to.be.a('object');
    expect(model.sequelize.models.Article).to.be.a('object');
  });
});
