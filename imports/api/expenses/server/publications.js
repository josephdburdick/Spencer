import { Meteor } from 'meteor/meteor';
import { Expenses } from '../expenses';

Meteor.publish('expenses', () => Expenses.find());
