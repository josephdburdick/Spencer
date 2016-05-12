import { Expenses } from './expenses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertExpense = new ValidatedMethod({
  name: 'expenses.insert',
  validate: new SimpleSchema({
    'expense.price'       : { type : Number, decimal: true }, //assume String for now but might change to Number
    'expense.description' : { type : String },
    'expense.category'    : { type : String },
    'expense.business'    : { type : String },
  }).validator(),
  run(expense) {
    console.log(`expense is ${expense}`);
    Expenses.insert(expense);
  },
});

export const updateExpense = new ValidatedMethod({
  name: 'expenses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'expenseUpdate.price'       : { type : Number, decimal: true, optional: true },
    'expenseUpdate.description' : { type : String, optional : true },
    'expenseUpdate.category'    : { type : String, optional : true },
    'expenseUpdate.business'    : { type : String, optional : true },
  }).validator(),
  run({ _id, update }) {
    Expenses.update(_id, { $set: update });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'expenses.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Expenses.remove(_id);
  },
});
