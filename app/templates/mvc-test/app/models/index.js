'use strict';

const expect = require('chai').expect;

const model = require('../../../app/models/index');

describe('model', () => {
  it('should load', () => {
    expect(model).to.be.a('object');
    expect(model.sequelize).to.be.a('object');
    expect(model.sequelize.models.Article).to.be.a('object');
  });
});
