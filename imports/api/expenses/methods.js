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
    business    : { type : String }
  }).validator(),
    run(expense) {
      Expenses.insert(expense);
    }
});

export const updateExpense = new ValidatedMethod({
  name: 'expenses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.price'       : { type : Number, decimal: true },
    'update.description' : { type : String },
    'update.category'    : { type : String },
    'update.business'    : { type : String }
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
