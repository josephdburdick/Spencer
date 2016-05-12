import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Expenses = new Mongo.Collection('Expenses');

Expenses.schema = new SimpleSchema({
  price: {
    type: Number,
    label: 'Price'
  },
  description: {
    type: String,
    label: 'Description of expense'
  },
  business: {
    type: String,
    label: 'Name of the associated business'
  },
  category: {
    type: [String],
    label: 'Category of expense'
  }
});

Expenses.attachSchema(Expenses.schema);

Factory.define('document', Expenses, {
  title: () => faker.hacker.phrase(),
});
