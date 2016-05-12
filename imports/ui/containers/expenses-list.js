import { composeWithTracker } from 'react-komposer';
import { Expenses } from '../../api/expenses/expenses.js';
import { ExpensesList } from '../components/expenses-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('expenses');
  if (subscription.ready()) {
    const expenses = Expenses.find().fetch();
    onData(null, { expenses });
  }
};

export default composeWithTracker(composer, Loading)(ExpensesList);
