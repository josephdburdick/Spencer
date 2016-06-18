import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
    type: [String],
    label: 'Categories of expense'
  },
  dateCreated: {
    type: Date,
    label: 'Date created'
  }
});

Expenses.attachSchema(Expenses.schema);