/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Expenses } from './expenses.js';
import { insertExpense, updateExpense, removeExpense } from './methods.js';

describe('Expenses methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts an expense into the Expenses collection', function () {
    insertExpense.call({
      userId: '4rio23j45o34r',
      description: 'Apple Power Mac Pro 9000',
      category: "Office Desk Rent",
      price: 4054.99,
      business: "Joey"
    });
    const getExpense = Expenses.findOne({ description: 'Apple Power Mac Pro 9000' });
    console.log(getExpense);
    assert.equal(getExpense.description, 'Apple Power Mac Pro 9000');
    assert.equal(getExpense.price, 4054.99);
    assert.equal(getExpense.category, 'Office Desk Rent');
    assert.equal(getExpense.business, 'Joey');
  });

  it('updates an expense in the Expenses collection', function () {
    const { _id } = Factory.create('expense');

    updateExpense.call({
      _id,
      update: {
        description: 'Apple Power Mac Pro Supreme OS Eleventy-Billion'
      }
    });

    const getExpense = Expenses.findOne(_id);
    assert.equal(getExpense.description, 'Apple Power Mac Pro Supreme OS Eleventy-Billion');
  });

  it('removes a expense from the Expenses collection', function () {
    const { _id } = Factory.create('expense');
    removeExpense.call({ _id });
    const getExpense = Expenses.findOne(_id);
    assert.equal(getExpense, undefined);
  });
});
