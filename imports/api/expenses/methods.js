import { Expenses } from './expenses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertExpense = new ValidatedMethod({
  name: 'expenses.insert',
  validate: new SimpleSchema({
    userId                : { type : String },
    price                 : { type : Number, decimal: true },
    description           : { type : String },
    "category.$.value"    : { type : String }, //the $ indicates presence of an array i.e. react select format is [{value:"someValue", label:"someLabel"}]
    "category.$.label"    : { type : String },
    "business.value"      : { type : String }, //business is an object, not array with format value:"someValue", label:"someLabel"}
    "business.label"      : { type : String }
  }).validator(),
    run(expense) {
      expense['dateCreated'] = new Date();
      Expenses.insert(expense);
    }
});

export const updateExpense = new ValidatedMethod({
  name: 'expenses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    "update.price"               : { type : Number, decimal: true },
    "update.description"         : { type : String },
    "update.category.$.value"    : { type : String },
    "update.category.$.label"    : { type : String },
    "update.business.value"      : { type : String }, //business is an object, not array with format value:"someValue", label:"someLabel"}
    "update.business.label"      : { type : String }
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
