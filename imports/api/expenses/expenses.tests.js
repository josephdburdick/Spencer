/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import { Expenses } from './expenses.js';

describe('Expenses collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Expenses, 'object');
  });
});
