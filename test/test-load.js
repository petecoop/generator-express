'use strict';

const assert = require('assert');

describe('express generator', () => {
  it('can be imported without blowing up', () => {
    const app = require('../app');
    assert(app !== undefined);
  });
});
