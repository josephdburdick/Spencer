import { Expenses } from './expenses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertExpense = new ValidatedMethod({
  name: 'expenses.insert',
  validate: new SimpleSchema({
    userId      : { type: String },
    price       : { type : Number, decimal: true },
    description : { type : String },
    category    : { type : String },
    business    : { type : String },
  }).validator(),
    run(expense) {
      // Extend the payload with userId for association.
      expense = Object.assign(expense, {userId: Meteor.userId()})
      Expenses.insert(expense);
    }
});

export const updateExpense = new ValidatedMethod({
  name: 'expenses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.price'       : { type : Number, decimal: true, optional: true },
    'update.description' : { type : String, optional : true },
    'update.category'    : { type : String, optional : true },
    'update.business'    : { type : String, optional : true },
  }).validator(),
  run({ _id, update }) {
    console.log(update);
    Expenses.update(_id, { $set: update });
  },
});

export const removeExpense = new ValidatedMethod({
  name: 'expenses.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Expenses.remove(_id);
  },
});
