import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Expenses = new Mongo.Collection('Expenses');

Expenses.schema = new SimpleSchema({
  userId: {
    type: String
  },
  price: {
    type: Number,
    label: 'Price',
    decimal: true
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
    type: String,
    label: 'Category of expense'
  }
});

Expenses.attachSchema(Expenses.schema);

Factory.define('expense', Expenses, {
  description: () => faker.lorem.words(),
  userId: () => faker.random.uuid(),
  price: () => faker.random.number(),
  business: () => faker.company.companyName(),
  category: () => faker.lorem.word()
});
