import { Expenses } from './expenses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Meteor from 'meteor/meteor';

export const insertExpense = new ValidatedMethod({
  name: 'expenses.insert',
  validate: new SimpleSchema({
    userId                : { type : String },
    price                 : { type : Number, decimal: true },
    description           : { type : String },
    category              : { type : String },
    business              : { type : String },
    dateCreated           : { type : Date }
  }).validator(),
    run(expense) {
      Expenses.insert(expense);
    }
});

export const updateExpense = new ValidatedMethod({
  name: 'expenses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    "update.price"               : { type : Number, decimal: true },
    "update.description"         : { type : String },
    "update.category"            : { type : String },
    "update.business"            : { type : String }
  }).validator(),
  run({ _id, update }) {
    console.log(update);
    Expenses.update(_id, { $set: update });
  },
});

export const removeExpense = new ValidatedMethod({
  name: "expenses.remove",
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Expenses.remove(_id);
  },
});

export const expensesAggregate = new ValidatedMethod({
  name: "expenses.aggregate",
  validate: null,
  run({ pipeline }) {
    if (!this.isSimulation) {
      const expenses = Expenses.aggregate(pipeline, { allowDiskUse: true });
      return expenses;
    }
  },
});

export const expensesFind = new ValidatedMethod({
  name: "expenses.find",
  validate: null,
  run( findDetails ) {
    if (!this.isSimulation) {
      const expenses = Expenses.find({}, findDetails).fetch();
      return expenses;
    }
  },
});
